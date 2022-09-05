import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSuppliersContractComponent } from './current-suppliers-contract.component';

describe('CurrentSuppliersContractComponent', () => {
  let component: CurrentSuppliersContractComponent;
  let fixture: ComponentFixture<CurrentSuppliersContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSuppliersContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSuppliersContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
