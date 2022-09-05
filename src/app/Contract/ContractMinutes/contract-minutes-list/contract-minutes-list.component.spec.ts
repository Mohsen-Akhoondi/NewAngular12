import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMinutesListComponent } from './contract-minutes-list.component';

describe('ContractMinutesListComponent', () => {
  let component: ContractMinutesListComponent;
  let fixture: ComponentFixture<ContractMinutesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMinutesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMinutesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
