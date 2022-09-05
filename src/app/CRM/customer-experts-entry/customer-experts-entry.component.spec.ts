import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerExpertsEntryComponent } from './customer-experts-entry.component';

describe('CustomerExpertsEntryComponent', () => {
  let component: CustomerExpertsEntryComponent;
  let fixture: ComponentFixture<CustomerExpertsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerExpertsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerExpertsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
