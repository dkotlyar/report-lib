import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[repPageA4]'
})
export class PageA4Directive implements OnInit{

  @Input() set repPageA4(orientation: 'portrait' | 'landscape') {
    this.el.nativeElement.classList.remove('report-landscape');
    this.el.nativeElement.classList.remove('report-portrait');

    if (orientation === 'landscape') {
      this.el.nativeElement.classList.add('report-landscape');
    } else {
      this.el.nativeElement.classList.add('report-portrait');
    }
  }

  constructor(private el: ElementRef<HTMLDivElement>) {
  }

  ngOnInit(): void {
    const printPage = document.createElement('div');
    printPage.classList.add('page-a4');

    const pageWrapper = document.createElement('div');
    pageWrapper.classList.add('page');

    while (this.el.nativeElement.hasChildNodes()) {
      pageWrapper.append(this.el.nativeElement.firstChild);
    }

    printPage.append(pageWrapper);
    this.el.nativeElement.append(printPage);
    this.el.nativeElement.classList.add('component-wrapper-a4');

    this.el.nativeElement.getAttributeNames()
        .filter(n => n.startsWith('_ngcontent'))
        .forEach(attr => {
          pageWrapper.setAttribute(attr, '');
          printPage.setAttribute(attr, '');
        });
  }



}
