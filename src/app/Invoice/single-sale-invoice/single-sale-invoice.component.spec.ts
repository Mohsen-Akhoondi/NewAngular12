import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSaleInvoiceComponent } from './single-sale-invoice.component';

describe('SingleSaleInvoiceComponent', () => {
  let component: SingleSaleInvoiceComponent;
  let fixture: ComponentFixture<SingleSaleInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSaleInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSaleInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
