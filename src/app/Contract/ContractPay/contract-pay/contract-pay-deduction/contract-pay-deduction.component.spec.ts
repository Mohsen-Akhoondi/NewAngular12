import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayDeductionComponent } from './contract-pay-deduction.component';

describe('ContractPayDeductionComponent', () => {
  let component: ContractPayDeductionComponent;
  let fixture: ComponentFixture<ContractPayDeductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayDeductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
