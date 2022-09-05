import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfirmPhoneNumberComponent } from './user-confirm-phone-number.component';

describe('UserConfirmPhoneNumberComponent', () => {
  let component: UserConfirmPhoneNumberComponent;
  let fixture: ComponentFixture<UserConfirmPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfirmPhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfirmPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
