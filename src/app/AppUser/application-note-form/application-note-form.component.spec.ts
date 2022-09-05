import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNoteFormComponent } from './application-note-form.component';

describe('ApplicationNoteFormComponent', () => {
  let component: ApplicationNoteFormComponent;
  let fixture: ComponentFixture<ApplicationNoteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationNoteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
