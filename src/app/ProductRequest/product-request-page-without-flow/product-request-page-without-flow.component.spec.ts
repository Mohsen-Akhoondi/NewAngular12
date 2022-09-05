import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestPageWithoutFlowComponent } from './product-request-page-without-flow.component';

describe('ProductRequestPageWithoutFlowComponent', () => {
  let component: ProductRequestPageWithoutFlowComponent;
  let fixture: ComponentFixture<ProductRequestPageWithoutFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestPageWithoutFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestPageWithoutFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
