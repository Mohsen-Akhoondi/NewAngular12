import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractOverPopupComponent } from './contract-over-popup.component';

describe('ContractOverPopupComponent', () => {
  let component: ContractOverPopupComponent;
  let fixture: ComponentFixture<ContractOverPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractOverPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractOverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
