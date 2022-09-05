import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContractAgentComponent } from './select-contract-agent.component';

describe('SelectContractAgentComponent', () => {
  let component: SelectContractAgentComponent;
  let fixture: ComponentFixture<SelectContractAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContractAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContractAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
