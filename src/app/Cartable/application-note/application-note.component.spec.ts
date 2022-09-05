import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNoteComponent } from './application-note.component';

describe('ApplicationNoteComponent', () => {
  let component: ApplicationNoteComponent;
  let fixture: ComponentFixture<ApplicationNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
