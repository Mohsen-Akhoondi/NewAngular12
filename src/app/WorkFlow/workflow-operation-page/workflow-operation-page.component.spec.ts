import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowOperationPageComponent } from './workflow-operation-page.component';

describe('WorkflowOperationPageComponent', () => {
  let component: WorkflowOperationPageComponent;
  let fixture: ComponentFixture<WorkflowOperationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowOperationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowOperationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
