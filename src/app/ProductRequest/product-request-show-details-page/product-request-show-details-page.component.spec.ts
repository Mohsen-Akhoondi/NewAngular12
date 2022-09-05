import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestShowDetailsPageComponent } from './product-request-show-details-page.component';

describe('ProductRequestShowDetailsPageComponent', () => {
  let component: ProductRequestShowDetailsPageComponent;
  let fixture: ComponentFixture<ProductRequestShowDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestShowDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestShowDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
