import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTurnoverComponent } from './account-turnover.component';

describe('AccountTurnoverComponent', () => {
  let component: AccountTurnoverComponent;
  let fixture: ComponentFixture<AccountTurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
