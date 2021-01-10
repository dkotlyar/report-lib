import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'rep-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  @Input() error: HttpErrorResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
