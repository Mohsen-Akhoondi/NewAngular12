import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeContractStatusComponent } from './change-contract-status.component';

describe('ChangeContractStatusComponent', () => {
  let component: ChangeContractStatusComponent;
  let fixture: ComponentFixture<ChangeContractStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeContractStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeContractStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
