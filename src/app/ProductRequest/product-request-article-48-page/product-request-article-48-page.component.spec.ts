import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestArticle48PageComponent } from './product-request-article-48-page.component';

describe('ProductRequestArticle48PageComponent', () => {
  let component: ProductRequestArticle48PageComponent;
  let fixture: ComponentFixture<ProductRequestArticle48PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductRequestArticle48PageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestArticle48PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
