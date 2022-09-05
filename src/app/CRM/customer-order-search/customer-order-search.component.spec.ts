import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderSearchComponent } from './customer-order-search.component';

describe('CustomerOrderSearchComponent', () => {
  let component: CustomerOrderSearchComponent;
  let fixture: ComponentFixture<CustomerOrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
