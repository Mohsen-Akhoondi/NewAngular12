import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentPriceRangeFormulasComponent } from './adjustment-price-range-formulas.component';

describe('AdjustmentPriceRangeFormulasComponent', () => {
  let component: AdjustmentPriceRangeFormulasComponent;
  let fixture: ComponentFixture<AdjustmentPriceRangeFormulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdjustmentPriceRangeFormulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentPriceRangeFormulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
