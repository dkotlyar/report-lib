import { NgModule } from '@angular/core';
import { ReportLibComponent } from './report-lib.component';
import {BaseReportTemplateComponent} from './base-report-template/base-report-template.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PageA4Directive } from './directives/page-a4.directive';
import { MultirowDirective } from './directives/multirow.directive';



@NgModule({
  declarations: [
    ReportLibComponent,
    BaseReportTemplateComponent,
    ErrorPageComponent,
    PageA4Directive,
    MultirowDirective
  ],
  imports: [
  ],
  exports: [
    ReportLibComponent,
    BaseReportTemplateComponent,
    ErrorPageComponent,
    PageA4Directive,
    MultirowDirective
  ]
})
export class ReportLibModule { }
