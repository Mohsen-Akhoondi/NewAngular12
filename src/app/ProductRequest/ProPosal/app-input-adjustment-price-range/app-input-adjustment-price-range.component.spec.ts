import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputAdjustmentPriceRangeComponent } from './app-input-adjustment-price-range.component';

describe('AppInputAdjustmentPriceRangeComponent', () => {
  let component: AppInputAdjustmentPriceRangeComponent;
  let fixture: ComponentFixture<AppInputAdjustmentPriceRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppInputAdjustmentPriceRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppInputAdjustmentPriceRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
