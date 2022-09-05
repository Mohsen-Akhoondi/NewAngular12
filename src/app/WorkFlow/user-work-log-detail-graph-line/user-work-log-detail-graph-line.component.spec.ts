import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkLogDetailGraphLineComponent } from './user-work-log-detail-graph-line.component';

describe('UserWorkLogDetailGraphLineComponent', () => {
  let component: UserWorkLogDetailGraphLineComponent;
  let fixture: ComponentFixture<UserWorkLogDetailGraphLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkLogDetailGraphLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkLogDetailGraphLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
