import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'app-car-tag',
  templateUrl: './car-tag.component.html',
  styleUrls: ['./car-tag.component.css']
})
export class CarTagComponent implements ICellEditorAngularComp, OnInit {

  FirstPlaqueCode = '';
  SecondPlaqueCode = '';
  IranPlaqueCode = '';
  startLeftPosition = 530;
  startTopPosition = 200;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  LettersItems = [
    'الف'
    , 'ب'
    , 'پ'
    , 'ت'
    , 'ث'
    , 'ج'
    , 'چ'
    , 'ح'
    , 'خ'
    , 'د'
    , 'ذ'
    , 'ر'
    , 'ز'
    , 'ژ'
    , 'س'
    , 'ش'
    , 'ص'
    , 'ض'
    , 'ط'
    , 'ظ'
    , 'ع'
    , 'غ'
    , 'ف'
    , 'ق'
    , 'ک'
    , 'گ'
    , 'ل'
    , 'م'
    , 'ن'
    , 'و'
    , 'ی'
    , 'ه'
  ];
  RetObj = { FirstPlaqueCode: '', SecondPlaqueCode: '', IranPlaqueCode: '', LetterPlaqueNo: '', CarTag: '' };
  KeyCodeLst = [];
  isClicked = false;
  HaveHeader = true;
  HaveMaxBtn = false;
  PopUpType = 'message-box';
  NgSelectLettersParams = {
    Items: this.LettersItems,
    bindLabelProp: '',
    bindValueProp: '',
    placeholder: '',
    MinWidth: '100%',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  @Output() Change: EventEmitter<any> = new EventEmitter<any>();
  getValue() {
    if (this.RetObj) {
      this.RetObj.IranPlaqueCode = this.IranPlaqueCode ? this.IranPlaqueCode : "";
      this.RetObj.LetterPlaqueNo = this.NgSelectLettersParams.selectedObject ? this.NgSelectLettersParams.selectedObject : "";
      this.RetObj.SecondPlaqueCode = this.SecondPlaqueCode ? this.SecondPlaqueCode : "";
      this.RetObj.FirstPlaqueCode = this.FirstPlaqueCode ? this.FirstPlaqueCode : "";
      this.RetObj.CarTag = ' ایران ' +
        (this.IranPlaqueCode ? this.IranPlaqueCode : "") + ' - ' +
        (this.SecondPlaqueCode ? this.SecondPlaqueCode : "") + ' ' +
        (this.NgSelectLettersParams.selectedObject ? this.NgSelectLettersParams.selectedObject : "") + ' ' +
        (this.FirstPlaqueCode ? this.FirstPlaqueCode : "");
      return this.RetObj;
    } else {
      return '';
    }
  }

  constructor() { }

  ngOnInit() {
  }
  agInit(params): void {
    this.IranPlaqueCode = params.node.data.IranPlaqueCode;
    this.FirstPlaqueCode = params.node.data.FirstPlaqueCode;
    this.SecondPlaqueCode = params.node.data.SecondPlaqueCode;
    this.NgSelectLettersParams.selectedObject = params.node.data.LetterPlaqueNo;
  }
  IranNumChange(event) {
    this.IranPlaqueCode = event;
  }
  SecondNumChange(event) {
    this.SecondPlaqueCode = event;
  }
  firstNumChange(event) {
    this.FirstPlaqueCode = event;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}
