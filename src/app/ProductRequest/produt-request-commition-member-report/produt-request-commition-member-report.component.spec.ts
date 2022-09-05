import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutRequestCommitionMemberReportComponent } from './produt-request-commition-member-report.component';

describe('ProdutRequestCommitionMemberReportComponent', () => {
  let component: ProdutRequestCommitionMemberReportComponent;
  let fixture: ComponentFixture<ProdutRequestCommitionMemberReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutRequestCommitionMemberReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutRequestCommitionMemberReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
