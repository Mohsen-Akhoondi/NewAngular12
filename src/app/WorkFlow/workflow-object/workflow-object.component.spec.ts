import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowObjectComponent } from './workflow-object.component';

describe('WorkflowObjectComponent', () => {
  let component: WorkflowObjectComponent;
  let fixture: ComponentFixture<WorkflowObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
