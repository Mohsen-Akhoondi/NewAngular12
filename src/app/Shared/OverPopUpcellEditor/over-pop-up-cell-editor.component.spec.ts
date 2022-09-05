import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverPopUpCellEditorComponent } from './over-pop-up-cell-editor.component';

describe('OverPopUpCellEditorComponent', () => {
  let component: OverPopUpCellEditorComponent;
  let fixture: ComponentFixture<OverPopUpCellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverPopUpCellEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverPopUpCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
