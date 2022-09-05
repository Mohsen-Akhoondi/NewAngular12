import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSupervisionItemListComponent } from './contract-supervision-item-list.component';

describe('ContractSupervisionItemListComponent', () => {
  let component: ContractSupervisionItemListComponent;
  let fixture: ComponentFixture<ContractSupervisionItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSupervisionItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSupervisionItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
