import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowActionComponent } from './workflow-action.component';

describe('WorkflowActionComponent', () => {
  let component: WorkflowActionComponent;
  let fixture: ComponentFixture<WorkflowActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
