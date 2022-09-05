import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPayItemEstimatePageComponent } from './contract-pay-item-estimate-page.component';

describe('ContractPayItemEstimatePageComponent', () => {
  let component: ContractPayItemEstimatePageComponent;
  let fixture: ComponentFixture<ContractPayItemEstimatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayItemEstimatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayItemEstimatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
