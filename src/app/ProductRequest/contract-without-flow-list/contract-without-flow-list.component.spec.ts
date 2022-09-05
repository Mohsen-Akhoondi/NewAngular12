import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractWithoutFlowListComponent } from './contract-without-flow-list.component';

describe('ContractWithoutFlowListComponent', () => {
  let component: ContractWithoutFlowListComponent;
  let fixture: ComponentFixture<ContractWithoutFlowListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractWithoutFlowListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractWithoutFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
