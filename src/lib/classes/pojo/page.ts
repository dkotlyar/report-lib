import {PageItem} from './page-item';
import {ElementRef, EventEmitter, QueryList, ViewChild, ViewChildren} from '@angular/core';

export class Page {
  // Поле content содержит произвольный объект, переданный в качестве параметра CONTENT в конструктор PagesFactory.
  content: any;

  // Поле items содержит массив PageItem, хранящийся для данной страницы
  items: Array<PageItem> = [];

  // Поле freeHeight содержит высоту свободного места на странице.
  // Может быть использовано в шаблоне для заполнения свободного пространства.
  freeHeight: number;

  // Поле определяет доступную высоту страницы для генерирования отчёта. Вычисляется автоматически для элемента page
  contentHeight: number;
  // Поле содержит высоту элементов header, footer, а также требуемое свободное место на странице
  headerAndFooterHeight: number;
  // Требуемое свободное место на странице. Задается в пикселях.
  // Read-Write.
  minimumFreeHeight: number;

  page: ElementRef;
  header: ElementRef;
  footer: ElementRef;
  components: QueryList<ElementRef>;

  componentsUpdated: EventEmitter<null> = new EventEmitter<null>();
}
