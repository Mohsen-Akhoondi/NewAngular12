import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionContractEstimateComponent } from './correction-contract-estimate.component';

describe('CorrectionContractEstimateComponent', () => {
  let component: CorrectionContractEstimateComponent;
  let fixture: ComponentFixture<CorrectionContractEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionContractEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionContractEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
