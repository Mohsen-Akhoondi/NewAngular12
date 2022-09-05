import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderProductRequestComponent } from './customer-order-product-request.component';

describe('CustomerOrderProductRequestComponent', () => {
  let component: CustomerOrderProductRequestComponent;
  let fixture: ComponentFixture<CustomerOrderProductRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderProductRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderProductRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
