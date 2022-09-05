import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArchiveComponent } from './modal-archive.component';

describe('ModalArchiveComponent', () => {
  let component: ModalArchiveComponent;
  let fixture: ComponentFixture<ModalArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
