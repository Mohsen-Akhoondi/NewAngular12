import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOrderitemCoefComponent } from './contract-orderitem-coef.component';

describe('ContractOrderitemCoefComponent', () => {
  let component: ContractOrderitemCoefComponent;
  let fixture: ComponentFixture<ContractOrderitemCoefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOrderitemCoefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOrderitemCoefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
