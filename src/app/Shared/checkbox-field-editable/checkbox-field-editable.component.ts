import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-checkbox-field-editable',
  templateUrl: './checkbox-field-editable.component.html',
  styleUrls: ['./checkbox-field-editable.component.css']
})
export class CheckboxFieldEditableComponent implements ICellEditorAngularComp, OnInit {

  Value: any;
  constructor() { }

  getValue() { if (this.Value) { return this.Value; } else { return false; } }
  isPopup?(): boolean { return false; }
  isCancelBeforeStart?(): boolean { return false; }
  isCancelAfterEnd?(): boolean { return false; }
  focusIn?(): void { }
  focusOut?(): void { }
  agInit(params): void {
    if (params.column && params.column.colId && params.column.colId === 'AccessType') {
      if (params.value === 2) {
        this.Value = true;
      } else if (params.value === 1) {
        this.Value = false;
      }
    } else {
      this.Value = !params.value;
    }
  }
  afterGuiAttached?(params): void { }
  ngOnInit() { }
}
