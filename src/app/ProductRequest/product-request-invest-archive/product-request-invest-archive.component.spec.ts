import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestInvestArchiveComponent } from './product-request-invest-archive.component';

describe('ProductRequestInvestArchiveComponent', () => {
  let component: ProductRequestInvestArchiveComponent;
  let fixture: ComponentFixture<ProductRequestInvestArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestInvestArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestInvestArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
