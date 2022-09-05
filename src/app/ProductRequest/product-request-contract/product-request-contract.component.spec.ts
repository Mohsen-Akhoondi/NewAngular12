import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestContractComponent } from './product-request-contract.component';

describe('ProductRequestContractComponent', () => {
  let component: ProductRequestContractComponent;
  let fixture: ComponentFixture<ProductRequestContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
