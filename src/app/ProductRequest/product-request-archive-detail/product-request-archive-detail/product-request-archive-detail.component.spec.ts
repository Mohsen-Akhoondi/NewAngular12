import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestArchiveDetailComponent } from './product-request-archive-detail.component';

describe('ProductRequestArchiveDetailComponent', () => {
  let component: ProductRequestArchiveDetailComponent;
  let fixture: ComponentFixture<ProductRequestArchiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestArchiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestArchiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
