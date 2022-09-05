import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOrderOnWithoutFlowComponent } from './contract-order-on-without-flow.component';

describe('ContractOrderOnWithoutFlowComponent', () => {
  let component: ContractOrderOnWithoutFlowComponent;
  let fixture: ComponentFixture<ContractOrderOnWithoutFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOrderOnWithoutFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOrderOnWithoutFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
