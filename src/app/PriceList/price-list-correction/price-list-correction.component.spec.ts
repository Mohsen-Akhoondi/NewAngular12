import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListCorrectionComponent } from './price-list-correction.component';

describe('PriceListCorrectionComponent', () => {
  let component: PriceListCorrectionComponent;
  let fixture: ComponentFixture<PriceListCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
