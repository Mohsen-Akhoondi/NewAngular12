import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListPatternGoodsComponent } from './price-list-pattern-goods.component';

describe('PriceListPatternGoodsComponent', () => {
  let component: PriceListPatternGoodsComponent;
  let fixture: ComponentFixture<PriceListPatternGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListPatternGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListPatternGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
