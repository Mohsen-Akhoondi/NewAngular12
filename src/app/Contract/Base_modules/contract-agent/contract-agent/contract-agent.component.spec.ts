import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAgentComponent } from './contract-agent.component';

describe('ContractAgentComponent', () => {
  let component: ContractAgentComponent;
  let fixture: ComponentFixture<ContractAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
