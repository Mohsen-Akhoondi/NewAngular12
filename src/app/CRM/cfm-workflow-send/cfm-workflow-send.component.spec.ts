import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfmWorkflowSendComponent } from './cfm-workflow-send.component';

describe('CfmWorkflowSendComponent', () => {
  let component: CfmWorkflowSendComponent;
  let fixture: ComponentFixture<CfmWorkflowSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfmWorkflowSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfmWorkflowSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
