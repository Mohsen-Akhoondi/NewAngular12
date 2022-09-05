import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOrderItemDeductionComponent } from './contract-order-item-deduction.component';

describe('ContractOrderItemDeductionComponent', () => {
  let component: ContractOrderItemDeductionComponent;
  let fixture: ComponentFixture<ContractOrderItemDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOrderItemDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOrderItemDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
