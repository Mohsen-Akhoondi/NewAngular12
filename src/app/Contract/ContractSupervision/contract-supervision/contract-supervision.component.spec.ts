import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSupervisionComponent } from './contract-supervision.component';

describe('ContractSupervisionComponent', () => {
  let component: ContractSupervisionComponent;
  let fixture: ComponentFixture<ContractSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
