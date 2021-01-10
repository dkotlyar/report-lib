import {ElementRef} from '@angular/core';

export class PageItem {
  // Содержит элемент массива DATA, переданный в качестве параметра в конструктор PagesFactory.
  content: any;

  // Содержит вычисленную высоту элемента при генерировании отчёта
  height: number;

  // Содержит индекс страницы, на которой данный объект располагается.
  pageNum: number;

  constructor(content: any) {
    this.content = content;
  }
}
