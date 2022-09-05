import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestCostComponent } from './product-request-cost.component';

describe('ProductRequestCostComponent', () => {
  let component: ProductRequestCostComponent;
  let fixture: ComponentFixture<ProductRequestCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
