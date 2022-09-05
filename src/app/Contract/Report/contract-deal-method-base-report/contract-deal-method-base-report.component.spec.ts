import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDealMethodBaseReportComponent } from './contract-deal-method-base-report.component';

describe('ContractDealMethodBaseReportComponent', () => {
  let component: ContractDealMethodBaseReportComponent;
  let fixture: ComponentFixture<ContractDealMethodBaseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDealMethodBaseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDealMethodBaseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
