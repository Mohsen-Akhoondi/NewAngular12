import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMinutesTypeComponent } from './contract-minutes-type.component';

describe('ContractMinutesTypeComponent', () => {
  let component: ContractMinutesTypeComponent;
  let fixture: ComponentFixture<ContractMinutesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMinutesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMinutesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
