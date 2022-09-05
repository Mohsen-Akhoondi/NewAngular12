import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNoteListComponent } from './application-note-list.component';

describe('ApplicationNoteListComponent', () => {
  let component: ApplicationNoteListComponent;
  let fixture: ComponentFixture<ApplicationNoteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationNoteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
