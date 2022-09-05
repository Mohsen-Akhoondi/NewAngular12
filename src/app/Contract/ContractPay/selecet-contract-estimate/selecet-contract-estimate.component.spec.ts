import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecetContractEstimateComponent } from './selecet-contract-estimate.component';

describe('SelecetContractEstimateComponent', () => {
  let component: SelecetContractEstimateComponent;
  let fixture: ComponentFixture<SelecetContractEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecetContractEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecetContractEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
