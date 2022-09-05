import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseReportCOntractPayItemEstimateComponent } from './choose-report-contract-pay-item-estimate.component';

describe('ChooseReportCOntractPayItemEstimateComponent', () => {
  let component: ChooseReportCOntractPayItemEstimateComponent;
  let fixture: ComponentFixture<ChooseReportCOntractPayItemEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseReportCOntractPayItemEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseReportCOntractPayItemEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
