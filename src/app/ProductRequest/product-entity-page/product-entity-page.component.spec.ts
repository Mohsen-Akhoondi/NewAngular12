import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntityPageComponent } from './product-entity-page.component';

describe('ProductEntityPageComponent', () => {
  let component: ProductEntityPageComponent;
  let fixture: ComponentFixture<ProductEntityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
