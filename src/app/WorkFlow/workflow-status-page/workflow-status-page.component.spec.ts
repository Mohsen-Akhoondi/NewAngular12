import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStatusPageComponent } from './workflow-status-page.component';

describe('WorkflowStatusPageComponent', () => {
  let component: WorkflowStatusPageComponent;
  let fixture: ComponentFixture<WorkflowStatusPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStatusPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStatusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
