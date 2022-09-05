import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestItemCoefComponent } from './product-request-item-coef.component';

describe('ProductRequestItemCoefComponent', () => {
  let component: ProductRequestItemCoefComponent;
  let fixture: ComponentFixture<ProductRequestItemCoefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestItemCoefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestItemCoefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
