import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitionMemberComponent } from './commition-member.component';

describe('CommitionMemberComponent', () => {
  let component: CommitionMemberComponent;
  let fixture: ComponentFixture<CommitionMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitionMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitionMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
