import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkflowStatusComponent } from './update-workflow-status.component';

describe('UpdateWorkflowStatusComponent', () => {
  let component: UpdateWorkflowStatusComponent;
  let fixture: ComponentFixture<UpdateWorkflowStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWorkflowStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWorkflowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
