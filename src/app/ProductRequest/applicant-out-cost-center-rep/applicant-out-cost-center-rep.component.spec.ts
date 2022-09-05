import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantOutCostCenterRepComponent } from './applicant-out-cost-center-rep.component';

describe('ApplicantOutCostCenterRepComponent', () => {
  let component: ApplicantOutCostCenterRepComponent;
  let fixture: ComponentFixture<ApplicantOutCostCenterRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantOutCostCenterRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantOutCostCenterRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
