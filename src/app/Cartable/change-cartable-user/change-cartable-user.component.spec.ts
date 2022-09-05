import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCartableUserComponent } from './change-cartable-user.component';

describe('ChangeCartableUserComponent', () => {
  let component: ChangeCartableUserComponent;
  let fixture: ComponentFixture<ChangeCartableUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCartableUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCartableUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
