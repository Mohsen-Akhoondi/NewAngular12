import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPatternProductEntryComponent } from './product-pattern-product-entry.component';

describe('ProductPatternProductEntryComponent', () => {
  let component: ProductPatternProductEntryComponent;
  let fixture: ComponentFixture<ProductPatternProductEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPatternProductEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPatternProductEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
