import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestInvestArchiveListComponent } from './product-request-invest-archive-list.component';

describe('ProductRequestInvestArchiveListComponent', () => {
  let component: ProductRequestInvestArchiveListComponent;
  let fixture: ComponentFixture<ProductRequestInvestArchiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestInvestArchiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestInvestArchiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
