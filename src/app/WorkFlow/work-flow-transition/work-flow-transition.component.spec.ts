import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowTransitionComponent } from './work-flow-transition.component';

describe('WorkFlowTransitionComponent', () => {
  let component: WorkFlowTransitionComponent;
  let fixture: ComponentFixture<WorkFlowTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
