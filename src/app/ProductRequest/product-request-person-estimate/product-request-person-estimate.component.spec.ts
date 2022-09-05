import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestPersonEstimateComponent } from './product-request-person-estimate.component';

describe('ProductRequestPersonEstimateComponent', () => {
  let component: ProductRequestPersonEstimateComponent;
  let fixture: ComponentFixture<ProductRequestPersonEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestPersonEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestPersonEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
