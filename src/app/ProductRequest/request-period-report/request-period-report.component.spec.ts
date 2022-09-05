import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPeriodReportComponent } from './request-period-report.component';

describe('RequestPeriodReportComponent', () => {
  let component: RequestPeriodReportComponent;
  let fixture: ComponentFixture<RequestPeriodReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPeriodReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPeriodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
