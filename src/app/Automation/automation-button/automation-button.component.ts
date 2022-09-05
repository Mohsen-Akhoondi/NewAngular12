import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';

@Component({
  selector: 'app-automation-button',
  templateUrl: './automation-button.component.html',
  styleUrls: ['./automation-button.component.css']
})
export class AutomationButtonComponent implements OnInit {
  @Input() InputParam;
  @Input() Disabled;
  @Input() PercentWidth = 32;
  @Output() AutomationOutputParam: EventEmitter<any> = new EventEmitter<any>();
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  MinHeightPixel: number;
  PopupParam;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor( private Automatuon: AutomationService) { }

  ngOnInit() {

  }
  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
    this.MinHeightPixel = null;
  }
  onAutomationClick() {
    this.isClicked = true;
    this.PopUpType = 'app-automation';
    this.HaveHeader = true;
    this.startLeftPosition = 144;
    this.startTopPosition = 42;
    this.MinHeightPixel = 300;
    this.PopupParam = {
      CostFactorID: this.InputParam.CostFactorID,
      RegionCode: this.InputParam.RegionCode,
      LetterTypeCodeList: this.InputParam.LetterTypeCodeList,
      OrganizationCode: this.InputParam.OrganizationCode,
      ReceiveDocID: this.InputParam.ReceiveDocID ? this.InputParam.ReceiveDocID : null ,
      SaveMode : this.InputParam.SaveMode,
      ReadOnlyMode: this.InputParam.ReadOnlyMode
    };
  }

  onDeleteLetterClick() {
    const CostFactorLetter = {
      CostFactorID: this.InputParam.CostFactorID,
      RegionCode: this.InputParam.RegionCode,
      LetterTypeCode: this.InputParam.LetterTypeCodeList[0],
      OrganizationCode: this.InputParam.OrganizationCode,
      ReceiveDocID: this.InputParam.ReceiveDocID ? this.InputParam.ReceiveDocID : null ,
    };
   this.Automatuon.DeleteLetter(CostFactorLetter).subscribe(res => {
    this.ShowMessageBoxWithOkBtn('حذف نامه با موفقیت انجام شد');
   },
   err => {
    this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
   });
  }

  onShowLetterClick() {
    const CostFactorLetter = {
      CostFactorID: this.InputParam.CostFactorID,
      LetterTypeCode: this.InputParam.LetterTypeCodeList[0]
    };
    this.Automatuon.ShowLetter(CostFactorLetter);
    }

    ShowMessageBoxWithOkBtn(message) {
      this.isClicked = true;
      this.PopUpType = 'message-box';
      this.MinHeightPixel = null;
      this.HaveHeader = true;
      this.startLeftPosition = 515;
      this.startTopPosition = 115;
      this.alertMessageParams.message = message;
      this.alertMessageParams.HaveOkBtn = true;
      this.alertMessageParams.HaveYesBtn = false;
      this.alertMessageParams.HaveNoBtn = false;
    }
    getOutPutParam(event) {
      if (this.PopUpType === 'app-automation') {
        event.PopUpType = 'app-automation';
        this.AutomationOutputParam.emit(event);
      }
    }
}
