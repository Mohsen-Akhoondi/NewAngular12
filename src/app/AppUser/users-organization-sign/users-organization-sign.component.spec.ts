import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOrganizationSignComponent } from './users-organization-sign.component';

describe('UsersOrganizationSignComponent', () => {
  let component: UsersOrganizationSignComponent;
  let fixture: ComponentFixture<UsersOrganizationSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOrganizationSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOrganizationSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
