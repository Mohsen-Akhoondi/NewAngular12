import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayVoucherDetailsComponent } from './contract-pay-voucher-details.component';

describe('ContractPayVoucherDetailsComponent', () => {
  let component: ContractPayVoucherDetailsComponent;
  let fixture: ComponentFixture<ContractPayVoucherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayVoucherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayVoucherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
