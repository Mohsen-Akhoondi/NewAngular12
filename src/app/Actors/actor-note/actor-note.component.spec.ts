import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorNoteComponent } from './actor-note.component';

describe('ActorNoteComponent', () => {
  let component: ActorNoteComponent;
  let fixture: ComponentFixture<ActorNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
