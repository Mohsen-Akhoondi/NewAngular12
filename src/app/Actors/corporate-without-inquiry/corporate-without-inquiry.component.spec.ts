import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateWithoutInquiryComponent } from './corporate-without-inquiry.component';

describe('CorporateWithoutInquiryComponent', () => {
  let component: CorporateWithoutInquiryComponent;
  let fixture: ComponentFixture<CorporateWithoutInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateWithoutInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateWithoutInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
