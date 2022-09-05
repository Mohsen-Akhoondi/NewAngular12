import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestWFDetailComponent } from './product-request-wf-detail.component';

describe('ProductRequestWFDetailComponent', () => {
  let component: ProductRequestWFDetailComponent;
  let fixture: ComponentFixture<ProductRequestWFDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestWFDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestWFDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
