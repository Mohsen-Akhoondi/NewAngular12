import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEstimatePageComponent } from './contract-estimate-page.component';

describe('ContractEstimatePageComponent', () => {
  let component: ContractEstimatePageComponent;
  let fixture: ComponentFixture<ContractEstimatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractEstimatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractEstimatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
