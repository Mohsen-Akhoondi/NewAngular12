import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkLogDetailGraphComponent } from './user-work-log-detail-graph.component';

describe('UserWorkLogDetailGraphComponent', () => {
  let component: UserWorkLogDetailGraphComponent;
  let fixture: ComponentFixture<UserWorkLogDetailGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkLogDetailGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkLogDetailGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
