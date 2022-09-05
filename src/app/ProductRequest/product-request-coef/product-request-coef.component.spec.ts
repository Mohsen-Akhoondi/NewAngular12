import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestCoefComponent } from './product-request-coef.component';

describe('ProductRequestCoefComponent', () => {
  let component: ProductRequestCoefComponent;
  let fixture: ComponentFixture<ProductRequestCoefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestCoefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestCoefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
