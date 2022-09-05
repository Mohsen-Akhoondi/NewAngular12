import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeContractPayItemEstimateComponent } from './cumulative-contract-pay-item-estimate.component';

describe('CumulativeContractPayItemEstimateComponent', () => {
  let component: CumulativeContractPayItemEstimateComponent;
  let fixture: ComponentFixture<CumulativeContractPayItemEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeContractPayItemEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeContractPayItemEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
