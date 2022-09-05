import { Component, OnInit, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-over-pop-up-cell-editor',
  templateUrl: './over-pop-up-cell-editor.component.html',
  styleUrls: ['./over-pop-up-cell-editor.component.css']
})
export class OverPopUpCellEditorComponent implements ICellEditorAngularComp, OnInit {
  InputValue;
  BeginSearch;
  PopupParam;
  SearchPopupType;
  MainMinwidthPixel = 1240;
  MainMaxwidthPixel = 1240;
  startLeftPosition = 60;
  startTopPosition = 10;
  constructor() { }
  @ViewChild('inputRef') inputRefElement;
  ngOnInit() {
  }
  getValue() {
    if (this.InputValue) {
      return this.InputValue;
    } else { return ''; }
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
  agInit(params) {
    this.InputValue = params.value;
    this.SearchPopupType = params.SearchPopupType;
    if (params.PopupParam) {
      this.PopupParam = params.PopupParam;
    }

  }
  dosearch() {
    if (this.SearchPopupType === 'product-pattern' && !this.PopupParam.ShowGrid) {
      this.PopupParam.SearchSTR = this.InputValue
      this.MainMinwidthPixel = null;
      this.MainMaxwidthPixel = null;
      this.startLeftPosition = 440;
    }
    this.BeginSearch = true;
  }
  getOutPutParam(event) {
    this.InputValue = event;
  }
  popupclosed($event) {
    this.BeginSearch = false;
  }
  afterGuiAttached?(params?): void {
    this.inputRefElement.nativeElement.focus();
  }
}
