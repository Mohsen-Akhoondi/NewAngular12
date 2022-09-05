import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayWorkReportComponent } from './contract-pay-work-report.component';

describe('ContractPayWorkReportComponent', () => {
  let component: ContractPayWorkReportComponent;
  let fixture: ComponentFixture<ContractPayWorkReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayWorkReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayWorkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
