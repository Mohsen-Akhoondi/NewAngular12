import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPatternComponent } from './product-pattern.component';

describe('ProductPatternComponent', () => {
  let component: ProductPatternComponent;
  let fixture: ComponentFixture<ProductPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
