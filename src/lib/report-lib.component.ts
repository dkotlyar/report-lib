import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rep-report-lib',
  templateUrl: './report.lib.component.html',
  styles: [
  ]
})
export class ReportLibComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  print(): void {
    window.print();
  }

}
