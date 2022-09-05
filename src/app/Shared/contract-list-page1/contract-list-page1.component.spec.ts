import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractListPage1Component } from './contract-list-page1.component';

describe('ContractListPage1Component', () => {
  let component: ContractListPage1Component;
  let fixture: ComponentFixture<ContractListPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractListPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
