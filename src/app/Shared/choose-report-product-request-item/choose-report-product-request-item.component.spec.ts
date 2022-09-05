import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseReportProductRequestItemComponent } from './choose-report-product-request-item.component';

describe('ChooseReportProductRequestItemComponent', () => {
  let component: ChooseReportProductRequestItemComponent;
  let fixture: ComponentFixture<ChooseReportProductRequestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseReportProductRequestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseReportProductRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
