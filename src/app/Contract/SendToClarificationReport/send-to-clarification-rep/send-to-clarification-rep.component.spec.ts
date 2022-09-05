import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToClarificationRepComponent } from './send-to-clarification-rep.component';

describe('SendToClarificationRepComponent', () => {
  let component: SendToClarificationRepComponent;
  let fixture: ComponentFixture<SendToClarificationRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToClarificationRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToClarificationRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
