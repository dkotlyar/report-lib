import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLibComponent } from './report-lib.component';

describe('ReportLibComponent', () => {
  let component: ReportLibComponent;
  let fixture: ComponentFixture<ReportLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
