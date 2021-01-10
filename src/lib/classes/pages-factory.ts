import {Page} from './pojo/page';
import {PageItem} from './pojo/page-item';
import {ComputedStyles} from './computed-styles';

export class PagesFactory {
  private pagesArr: Array<Page> = [];
  private complitedFlag = false;
  private styles: ComputedStyles;

  // Текущее количество итераций построения отчёта
  private splitIteration = 0;

  // Задает максимальное количество итераций построения отчёта.
  public maximumSplitIterations = 5;

  // В качестве объекта DATA задайте произвольный массив. Данный массив в последующем будет делиться на страницы.
  // Данные массива DATA будут записаны в поле items объекта Page.
  // Также необязательно можно передать объект CONTENT. Данный объект будет записан в поле content объекта Page.
  constructor(DATA: any, CONTENT: any = {}) {
    this.styles = new ComputedStyles();

    const page = new Page();
    page.content = CONTENT;
    for (const content of DATA) {
      const pageItem = new PageItem(content);
      page.items.push(pageItem);
    }
    this.pagesArr.push(page);
  }

  // Возвращает все страницы отчёта. Read-only.
  get pages(): Array<Page> {
    return this.pagesArr;
  }

  // Возвращает количество страниц отчёта. Read-only.
  get numPages(): number {
    return this.pages.length;
  }

  // Возвращает массив DATA обернутый в объект PageItem. Read-only.
  get items(): Array<PageItem> {
    const items = [];
    this.pages.forEach((page) => {
      items.push(...page.items);
    });
    return items;
  }

  // Возвращает true когда построение отчёта завершено, в противном случае false. Read-only.
  get complited(): boolean {
    return this.complitedFlag;
  }

  // Вызывает цепочку функций для разделения исходного массива DATA на страницы.
  public splitPages(): void {
    setTimeout(() => {
      this.splitPage(0);
    });
  }

  // Сбрасывает счётчик итераций построения отчёта и повторно вызывает метод splitPages() для имеющихся данных.
  public reset(): void {
    this.splitIteration = 0;
    this.complitedFlag = false;
    this.splitPage(0, true);
  }

  private getHeaderAndFooterHeights(page: Page): Array<number> {
    const heights = [0, 0, 0];

    if (page.header !== undefined) {
      heights[0] = this.styles.getOuterHeight(page.header.nativeElement);
    }

    if (page.footer !== undefined) {
      heights[1] = this.styles.getOuterHeight(page.footer.nativeElement);
    }

    heights[2] = page.minimumFreeHeight;

    return heights;
  }

  private splitPage(pageNumber: number, force = false): void {
    const page = this.pages[pageNumber];

    if (!force) {
      const subscription = page.componentsUpdated.subscribe(() => {
        this.splitPage(pageNumber, true);
        subscription.unsubscribe();
        clearTimeout(timeout);
      });
      const timeout = setTimeout(() => {
        this.splitPage(pageNumber, true);
        subscription.unsubscribe();
      }, 100);
      return;
    }

    if (pageNumber === 0) {
      this.splitIteration++;
    }

    let summarySize = this.getHeaderAndFooterHeights(page).reduce((a, b) => a + b);
    let splitNumber = -1;
    let normalized = true;
    let freeHeight = 0;
    const pageHeight = this.getPageHeight(page);
    page.contentHeight = pageHeight;
    page.headerAndFooterHeight = summarySize;

    page.components.map((item, index) => {
      const itemHeight = this.styles.getOuterHeight(item.nativeElement);

      page.items[index].height = itemHeight;
      page.items[index].pageNum = pageNumber;

      if ((summarySize + itemHeight) < pageHeight) {
        splitNumber = index;
        freeHeight = pageHeight - (summarySize + itemHeight);
      } else {
        normalized = false;
      }

      summarySize += itemHeight;
    });

    if (!normalized && splitNumber >= 0 || pageNumber < this.pagesArr.length - 1) {
      setTimeout(() => {
        const splc = this.pagesArr[pageNumber].items.splice(splitNumber + 1).map(item => {
          item.pageNum = pageNumber + 1;
          return item;
        });

        if (pageNumber < this.pagesArr.length - 1) {
          this.pagesArr[pageNumber + 1].items.unshift(...splc);
        } else {
          const newPage = new Page();
          newPage.content = page.content;
          newPage.items.push(...splc);
          this.pagesArr.splice(pageNumber + 1, 0, newPage);
        }

        if (splc.length > 0) {
          this.splitPage(pageNumber + 1);
        } else {
          this.splitPage(pageNumber + 1, true);
        }
      });
    }
    else {
      if (this.splitIteration > this.maximumSplitIterations) {
        this.complite();
      } else {
        this.mergePages();
      }
    }
  }

  private mergePages(): void {
    setTimeout(() => {
      let shuffleItems = 0;

      this.pages.forEach((page, pageNum) => {
        const pageItems = this.items.filter(item => item.pageNum === pageNum);

        if (pageItems.length > 0) {
          const items = this.items.filter((item) => item.pageNum > pageNum);

          let pageFreeHeight = this.calculateFreeHeight(page, pageNum);
          let mergeNumber = 0;

          items.some(item => {
            if (pageFreeHeight > item.height) {
              mergeNumber++;
              pageFreeHeight -= item.height;
              return false;
            }
            return true;
          });

          const mergeItems = items.splice(0, mergeNumber).map(item => {
            item.pageNum = pageNum;
            return item;
          });

          shuffleItems += mergeItems.length;
          pageItems.push(...mergeItems);
          page.items = pageItems;
        } else {
          page.items = [];
        }
      });

      this.pagesArr = this.pagesArr.filter(page => page.items.length > 0);

      if (shuffleItems > 0) {
        this.splitPage(0);
      } else {
        this.complite();
      }
    });
  }

  private complite(): void {
    setTimeout(() => {
      this.pages.forEach((page, pageNum) => {
          page.freeHeight = this.calculateFreeHeight(page, pageNum) + page.minimumFreeHeight;
      });

      this.complitedFlag = true;
    });
  }

  private calculateFreeHeight(page: Page, pageNum: number): number {
    let summarySize = this.getHeaderAndFooterHeights(page).reduce((a, b) => a + b);

    this.items.filter(item => item.pageNum === pageNum).forEach((item, index) => {
      summarySize += item.height;
    });

    return this.getPageHeight(page) - summarySize;
  }

  private getPageHeight(page: Page): number {
    return this.styles.getInnerHeight(page.page.nativeElement);
  }
}
