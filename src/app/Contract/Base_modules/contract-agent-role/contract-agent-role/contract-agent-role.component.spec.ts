import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAgentRoleComponent } from './contract-agent-role.component';

describe('ContractAgentRoleComponent', () => {
  let component: ContractAgentRoleComponent;
  let fixture: ComponentFixture<ContractAgentRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractAgentRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAgentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
