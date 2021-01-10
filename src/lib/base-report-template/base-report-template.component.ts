import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Page} from '../classes/pojo/page';
import {PagesFactory} from '../classes/pages-factory';

@Component({
  selector: 'rep-base-report-template',
  templateUrl: './base-report-template.component.html',
  styleUrls: ['./base-report-template.component.css']
})
export class BaseReportTemplateComponent implements OnInit {

  @Input() page: Page;
  @Input() pf: PagesFactory;
  @Input() index: number;

  @ViewChild('pagediv')
  set pagediv(page: ElementRef) {
    this.page.page = page;
  }
  @ViewChild('header')
  set header(header: ElementRef) {
    this.page.header = header;
  }
  @ViewChild('footer')
  set footer(footer: ElementRef) {
    this.page.footer = footer;
  }
  @ViewChildren('content')
  set content(components: QueryList<ElementRef>) {
    this.page.components = components;
    this.page.componentsUpdated.emit();
  }

  constructor() { }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 10;
  }

}
