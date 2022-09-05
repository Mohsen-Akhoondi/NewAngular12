import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { isUndefined } from 'util';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-number-input-component',
  templateUrl: './number-input-component.component.html',
  styleUrls: ['./number-input-component.component.css']
})
export class NumberInputComponentComponent implements ICellEditorAngularComp, OnInit {
  @Input() id;
  @Input() MaxLength;
  @Input() FloatMaxLength;
  @Input() IsFloat = false;
  @Input() PixelWidth = null;
  @Input() PerCentWidth = null;
  @Input() PerCentHeight = null;
  @Input() PixelHeight = null;
  @Input() fontSize = null;
  @Input() Value;
  @Input() HaveThousand = true;
  @Input() ReadOnly = false;
  @Input() CheckValidate = false;
  @Input() HaveNegative = false;
  @Output() ValueChange: EventEmitter<any> = new EventEmitter<any>();
  OldIndexOfDot = 0;
  @ViewChild('inputRef') inputCellEditorElement;
  constructor() { }

  ngOnInit() {

  }
  onInputChange(event) {
    if (this.HaveThousand) {
      event = event.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    this.ValueChange.emit(event);
  }

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
          (keycode >= 48 && keycode <= 57) &&
          !(this.FloatMaxLength &&
            !isUndefined(this.Value) &&
            indexOfDot > 0 &&
            this.Value.toString().length - indexOfDot > this.FloatMaxLength))
      )
    ) {
      if (this.HaveNegative && (isUndefined(this.Value) || this.Value.toString().length === 0) && keycode === 45) {
        return;
      }
      event.preventDefault();
    }
  }
  getValue() {
    return this.Value;
  }
  isPopup?(): boolean {
    return false;
  }
  isCancelBeforeStart?(): boolean {
    return false;
  }
  isCancelAfterEnd?(): boolean {
    return false;
  }
  focusIn?(): void {
  }
  focusOut?(): void {
  }
  agInit(params): void {
    this.MaxLength = params.MaxLength;
    this.IsFloat = params.IsFloat;
    this.FloatMaxLength = params.FloatMaxLength;
    this.HaveNegative = params.HaveNegative;
    this.PerCentWidth = params.PerCentWidth;
    this.PerCentHeight = 100;
    if (params.value) {
      this.Value = params.value;
    }
  }
  afterGuiAttached?(params?): void {
    this.inputCellEditorElement.nativeElement.focus();
  }
}
