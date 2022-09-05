import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonWithoutInquiryComponent } from './person-without-inquiry.component';

describe('PersonWithoutInquiryComponent', () => {
  let component: PersonWithoutInquiryComponent;
  let fixture: ComponentFixture<PersonWithoutInquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonWithoutInquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonWithoutInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
