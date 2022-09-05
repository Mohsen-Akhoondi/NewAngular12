import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { isUndefined } from 'util';

@Component({
  selector: 'app-number-field-editable',
  templateUrl: './number-field-editable.component.html',
  styleUrls: ['./number-field-editable.component.css']
})
export class NumberFieldEditableComponent
  implements ICellEditorAngularComp, OnInit {
  MaxLength;
  FloatMaxLength;
  IsFloat = false;
  Value;
  OldIndexOfDot = 0;
  GetMinusNumber = false;
  constructor() { }
  @ViewChild('inputRef') inputCellEditorElement;
  ngOnInit() { }
  OnKeyPress(event) {
    const keycode = event.which;
    const indexOfDot = this.Value ? this.Value.toString().indexOf('.') : -1;
    if (keycode === 46
      && indexOfDot <= 0
      && !isUndefined(this.Value)
      && this.Value.toString().length > 0
      && this.Value.toString().length < this.MaxLength) {
      this.MaxLength = this.MaxLength + 1;
    } else if (indexOfDot <= 0 && this.OldIndexOfDot > 0) {
      this.MaxLength = this.MaxLength - 1;
    }
    this.OldIndexOfDot = indexOfDot;
    if (
      !(
        ((this.Value && this.Value.toString().length > 0) || keycode !== 48 || (this.IsFloat && this.Value.toString().length === 0)) &&
        event.shiftKey === false &&
        ((this.IsFloat
          && !isUndefined(this.Value)
          && this.Value.toString().length > 0
          && indexOfDot <= 0
          && (!this.MaxLength || this.Value.toString().length < this.MaxLength)
          && keycode === 46) ||
          keycode === 8 ||
          keycode === 37 ||
          keycode === 39 ||
          (this.GetMinusNumber === true ? keycode === 45 : false) ||
          (keycode >= 48 && keycode <= 57) &&
          !(this.FloatMaxLength &&
            !isUndefined(this.Value) &&
            indexOfDot > 0 &&
            this.Value.toString().length - indexOfDot > this.FloatMaxLength))
      )
    ) {
      event.preventDefault();
    }
  }
  Onkeyup(event) {

  }
  getValue() {
    return this.Value;
  }
  isCancelBeforeStart?(): boolean {
    return false;
  }
  isCancelAfterEnd?(): boolean {
    return false;
  }
  isPopup?(): boolean {
    return false;
  }
  focusIn?(): void {
  }
  focusOut?(): void { }
  agInit(params): void {
    this.MaxLength = params.MaxLength;
    this.IsFloat = params.IsFloat;
    this.FloatMaxLength = params.FloatMaxLength;
    this.GetMinusNumber = params.GetMinusNumber;
    if (params.value) {
      this.Value = params.value;
    }
  }
  afterGuiAttached?(params?): void {
    this.inputCellEditorElement.nativeElement.focus();
  }
}
