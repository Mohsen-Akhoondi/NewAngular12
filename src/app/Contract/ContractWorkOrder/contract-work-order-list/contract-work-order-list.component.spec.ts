import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractWorkOrderListComponent } from './contract-work-order-list.component';

describe('ContractWorkOrderListComponent', () => {
  let component: ContractWorkOrderListComponent;
  let fixture: ComponentFixture<ContractWorkOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractWorkOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractWorkOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
