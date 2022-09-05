import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestCoefTypeComponent } from './product-request-coef-type.component';

describe('ProductRequestCoefTypeComponent', () => {
  let component: ProductRequestCoefTypeComponent;
  let fixture: ComponentFixture<ProductRequestCoefTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestCoefTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestCoefTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
