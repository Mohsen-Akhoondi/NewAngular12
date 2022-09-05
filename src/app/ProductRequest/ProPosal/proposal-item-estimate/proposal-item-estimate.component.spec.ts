import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalItemEstimateComponent } from './proposal-item-estimate.component';

describe('ProposalItemEstimateComponent', () => {
  let component: ProposalItemEstimateComponent;
  let fixture: ComponentFixture<ProposalItemEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalItemEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalItemEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
