import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowSendComponent } from './workflow-send.component';

describe('WorkflowSendComponent', () => {
  let component: WorkflowSendComponent;
  let fixture: ComponentFixture<WorkflowSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
