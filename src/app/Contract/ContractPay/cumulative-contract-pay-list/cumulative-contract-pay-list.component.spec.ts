import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeContractPayListComponent } from './cumulative-contract-pay-list.component';

describe('CumulativeContractPayListComponent', () => {
  let component: CumulativeContractPayListComponent;
  let fixture: ComponentFixture<CumulativeContractPayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeContractPayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeContractPayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
