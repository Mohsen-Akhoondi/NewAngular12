import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesInRegionListComponent } from './users-roles-in-region-list.component';

describe('UsersRolesInRegionListComponent', () => {
  let component: UsersRolesInRegionListComponent;
  let fixture: ComponentFixture<UsersRolesInRegionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRolesInRegionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesInRegionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
