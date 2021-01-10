import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseReportTemplateComponent } from './base-report-template.component';

describe('BaseReportTemplateComponent', () => {
  let component: BaseReportTemplateComponent;
  let fixture: ComponentFixture<BaseReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseReportTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
