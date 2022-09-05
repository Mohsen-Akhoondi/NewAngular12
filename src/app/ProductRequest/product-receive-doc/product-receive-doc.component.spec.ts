import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReceiveDocComponent } from './product-receive-doc.component';

describe('ProductReceiveDocComponent', () => {
  let component: ProductReceiveDocComponent;
  let fixture: ComponentFixture<ProductReceiveDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReceiveDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReceiveDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
