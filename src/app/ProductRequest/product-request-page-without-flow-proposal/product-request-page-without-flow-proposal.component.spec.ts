import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRequestPageWithoutFlowProposalComponent } from './product-request-page-without-flow-proposal.component';

describe('ProductRequestPageWithoutFlowProposalComponent', () => {
  let component: ProductRequestPageWithoutFlowProposalComponent;
  let fixture: ComponentFixture<ProductRequestPageWithoutFlowProposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRequestPageWithoutFlowProposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRequestPageWithoutFlowProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
