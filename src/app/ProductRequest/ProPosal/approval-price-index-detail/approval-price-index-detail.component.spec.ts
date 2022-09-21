import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalPriceIndexDetailComponent } from './approval-price-index-detail.component';

describe('ApprovalPriceIndexDetailComponent', () => {
  let component: ApprovalPriceIndexDetailComponent;
  let fixture: ComponentFixture<ApprovalPriceIndexDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalPriceIndexDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalPriceIndexDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
