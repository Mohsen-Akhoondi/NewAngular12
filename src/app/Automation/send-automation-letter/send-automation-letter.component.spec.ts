import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAutomationLetterComponent } from './send-automation-letter.component';

describe('SendAutomationLetterComponent', () => {
  let component: SendAutomationLetterComponent;
  let fixture: ComponentFixture<SendAutomationLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendAutomationLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendAutomationLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
