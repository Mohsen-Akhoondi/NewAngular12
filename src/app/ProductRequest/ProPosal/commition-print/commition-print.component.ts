import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-commition-print',
  templateUrl: './commition-print.component.html',
  styleUrls: ['./commition-print.component.css']
})
export class CommitionPrintComponent implements OnInit {
  @Input() PopupParam;
  @Input() ModuleCode;
  @Input() PopupMaximized;
  @Output() ChoosenContractPayClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  type;
  btnclicked = false;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ChangeDetection = false;
  Select = false;
  closee;
  SelectTender = false;
  SelectFirstAttach = false;
  SelectSecondAttach = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor(
    private ProductRequest: ProductRequestService,
    private report: ReportService) { }

  ngOnInit() {

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
  }

  onPrintClick() {
    if (this.SelectTender || this.SelectFirstAttach || this.SelectSecondAttach) {
      if (this.SelectTender) {
        this.report.TenderProceedingsReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.OrderCommitionID,
          this.PopupParam.ModuleCode,
          this.PopupParam.RegionCode,
          'صورتجلسه مناقصه',
          false, 1,
          this.PopupParam.ModuleViewTypeCode ? this.PopupParam.ModuleViewTypeCode : 0);
      }
      if (this.SelectFirstAttach) {
        this.report.TenderProceedingsReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.OrderCommitionID,
          this.PopupParam.ModuleCode,
          this.PopupParam.RegionCode,
          'ضمیمه شماره یک',
          false, 1,
          this.PopupParam.ModuleViewTypeCode ? this.PopupParam.ModuleViewTypeCode : 0);
      }
      if (this.SelectSecondAttach) {
        this.report.TenderProceedingsReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.OrderCommitionID,
          this.PopupParam.ModuleCode,
          this.PopupParam.RegionCode,
          'ضمیمه شماره دو',
          false, 1,
          this.PopupParam.ModuleViewTypeCode ? this.PopupParam.ModuleViewTypeCode : 0);
      }
    } else {
      this.Select = true;
      this.ShowMessageBoxWithOkBtn('لطفا یک گزینه را برای چاپ انتخاب کنید!');
    }
  }
  PrintAmounts() {
    this.SelectTender = !this.SelectTender;
  }
  PrintFinancialSummarySeasons() {
    this.SelectFirstAttach = !this.SelectFirstAttach;
  }
  PrintFinancialSheet() {
    this.SelectSecondAttach = !this.SelectSecondAttach;
  }
  ShowMessageBoxWithOkBtn(message) {
    if (this.Select === true) {
      this.closee = 'message-box-select';
    } else {
      this.closee = 'message-box';
    }
    this.type = 'message-box';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed() {
    this.btnclicked = false;
    this.ChoosenContractPayClosed.emit(true);
  }
  popupclosedwithoutexit() {
    this.btnclicked = false;
  }
  OnCheckBoxChange(checked, type) {
    switch (type) {
      case 'Tender':
        this.SelectTender = checked;
        break;
      case 'FirstAttach':
        this.SelectFirstAttach = checked;
        break;
      case 'SecondAttach':
        this.SelectSecondAttach = checked;
        break;
      default:
        break;
    }

  }
}
