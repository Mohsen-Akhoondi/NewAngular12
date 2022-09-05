import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStatusSummarySearchPageComponent } from './contract-status-summary-search-page.component';

describe('ContractStatusSummarySearchPageComponent', () => {
  let component: ContractStatusSummarySearchPageComponent;
  let fixture: ComponentFixture<ContractStatusSummarySearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractStatusSummarySearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractStatusSummarySearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
