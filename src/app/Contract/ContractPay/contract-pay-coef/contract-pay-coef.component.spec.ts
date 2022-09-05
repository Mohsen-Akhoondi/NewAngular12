import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayCoefComponent } from './contract-pay-coef.component';

describe('ContractPayCoefComponent', () => {
  let component: ContractPayCoefComponent;
  let fixture: ComponentFixture<ContractPayCoefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayCoefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayCoefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
