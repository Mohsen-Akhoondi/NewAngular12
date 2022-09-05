import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSendSMSComponent } from './contractor-send-sms.component';

describe('ContractorSendSMSComponent', () => {
  let component: ContractorSendSMSComponent;
  let fixture: ComponentFixture<ContractorSendSMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSendSMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSendSMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
