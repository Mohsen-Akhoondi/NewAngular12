import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionRegionReportComponent } from './condition-region-report.component';

describe('ConditionRegionReportComponent', () => {
  let component: ConditionRegionReportComponent;
  let fixture: ComponentFixture<ConditionRegionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionRegionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionRegionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
