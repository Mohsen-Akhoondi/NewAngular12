import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestContractWithoutFlowComponent } from './request-contract-without-flow.component';

describe('RequestContractWithoutFlowComponent', () => {
  let component: RequestContractWithoutFlowComponent;
  let fixture: ComponentFixture<RequestContractWithoutFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestContractWithoutFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestContractWithoutFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
