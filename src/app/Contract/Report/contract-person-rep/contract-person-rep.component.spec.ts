import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPersonRepComponent } from './contract-person-rep.component';

describe('ContractPersonRepComponent', () => {
  let component: ContractPersonRepComponent;
  let fixture: ComponentFixture<ContractPersonRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPersonRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPersonRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
