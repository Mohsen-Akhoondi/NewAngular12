import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayItemHourComponent } from './contract-pay-item-hour.component';

describe('ContractPayItemHourComponent', () => {
  let component: ContractPayItemHourComponent;
  let fixture: ComponentFixture<ContractPayItemHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayItemHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayItemHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
