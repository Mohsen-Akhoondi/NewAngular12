import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestSuggestionComponent } from './product-request-suggestion.component';

describe('ProductRequestSuggestionComponent', () => {
  let component: ProductRequestSuggestionComponent;
  let fixture: ComponentFixture<ProductRequestSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
