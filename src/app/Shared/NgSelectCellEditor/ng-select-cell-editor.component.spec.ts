import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgSelectCellEditorComponent } from './ng-select-cell-editor.component';

describe('NgSelectCellEditorComponent', () => {
  let component: NgSelectCellEditorComponent;
  let fixture: ComponentFixture<NgSelectCellEditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSelectCellEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSelectCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
