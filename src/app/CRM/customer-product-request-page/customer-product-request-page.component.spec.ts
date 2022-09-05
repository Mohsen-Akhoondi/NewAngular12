import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductRequestPageComponent } from './customer-product-request-page.component';

describe('CustomerProductRequestPageComponent', () => {
  let component: CustomerProductRequestPageComponent;
  let fixture: ComponentFixture<CustomerProductRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProductRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
