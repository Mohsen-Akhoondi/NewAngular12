import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPatternEntryComponent } from './product-pattern-entry.component';

describe('ProductPatternEntryComponent', () => {
  let component: ProductPatternEntryComponent;
  let fixture: ComponentFixture<ProductPatternEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPatternEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPatternEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
