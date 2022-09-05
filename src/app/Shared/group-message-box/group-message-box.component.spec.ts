import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMessageBoxComponent } from './group-message-box.component';

describe('GroupMessageBoxComponent', () => {
  let component: GroupMessageBoxComponent;
  let fixture: ComponentFixture<GroupMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
