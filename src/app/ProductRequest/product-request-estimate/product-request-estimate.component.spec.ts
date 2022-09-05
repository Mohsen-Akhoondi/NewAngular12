import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestEstimateComponent } from './product-request-estimate.component';

describe('ProductRequestEstimateComponent', () => {
  let component: ProductRequestEstimateComponent;
  let fixture: ComponentFixture<ProductRequestEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
