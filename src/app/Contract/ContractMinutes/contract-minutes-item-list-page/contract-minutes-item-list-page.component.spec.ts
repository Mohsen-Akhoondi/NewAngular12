import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMinutesItemListPageComponent } from './contract-minutes-item-list-page.component';

describe('ContractMinutesItemListPageComponent', () => {
  let component: ContractMinutesItemListPageComponent;
  let fixture: ComponentFixture<ContractMinutesItemListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMinutesItemListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMinutesItemListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
