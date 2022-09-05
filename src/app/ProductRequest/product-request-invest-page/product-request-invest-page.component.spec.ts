import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestInvestPageComponent } from './product-request-invest-page.component';

describe('ProductRequestInvestPageComponent', () => {
  let component: ProductRequestInvestPageComponent;
  let fixture: ComponentFixture<ProductRequestInvestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestInvestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestInvestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
