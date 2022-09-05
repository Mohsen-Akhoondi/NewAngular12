import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprehensiveStatusReportComponent } from './comprehensive-status-report.component';

describe('ComprehensiveStatusReportComponent', () => {
  let component: ComprehensiveStatusReportComponent;
  let fixture: ComponentFixture<ComprehensiveStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprehensiveStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprehensiveStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
