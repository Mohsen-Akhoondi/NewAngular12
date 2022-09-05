
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { isUndefined } from 'util';
@Component({
  selector: 'app-choosen-contract-estimate-rep',
  templateUrl: './choosen-contract-estimate-rep.component.html',
  styleUrls: ['./choosen-contract-estimate-rep.component.css']
})
export class ChoosenContractEstimateRepComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ChoosenContractPayClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  SelectAmounts = false;
  SelectFinancialSummarySeasons = false;
  SelectFinancialSheet = false;
  SelectSummaryQuantitySurveying = false;
  SelectShipment = false;
  SelectQuantitySurveyingDetails = false;
  selectedContractID;
  type;
  btnclicked = false;
  NotebookAmounts;
  FinancialSummarySeasons;
  FinancialSheet;
  SummaryQuantitySurveying;
  QuantitySurveyingDetails;
  Shipment;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ChangeDetection = false;
  Select = false;
  closee;
  ModuleCode;
  RegionCode;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  PrintCoef = true;
  constructor(
    private ContPayService: ContractPayService,
    private contractpaydetail: ContractPayDetailsService,
    private Report: ReportService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (this.PopupParam && this.PopupParam.RegionCode) {
      this.RegionCode = this.PopupParam.RegionCode;
    }
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
  }

  onPrintClick() {
    if (this.SelectAmounts || this.SelectFinancialSummarySeasons || this.SelectFinancialSheet ||
      this.SelectSummaryQuantitySurveying || this.SelectQuantitySurveyingDetails || this.SelectShipment) {
      if (this.SelectAmounts) {
        if (this.PopupParam && this.PopupParam.IsConfirm && !isUndefined(this.PopupParam.IsConfirm) && this.PopupParam.IsConfirm > 0) {

            this.Report.ContractPayListDetailReport(
              this.PopupParam.CostFactorID,
              this.PopupParam.ContractAgentCode,
              2516,
              this.RegionCode,
              'مبالغ دفترچه ها',
              0
            );
          } else {
            this.ShowMessageBoxWithOkBtn('به علت تایید نهایی نشدن این درخواست پرداخت، امکان مشاهده چاپ وجود ندارد.');
            return;
          }
      }
      if (this.SelectFinancialSummarySeasons) {
        if (this.PopupParam && this.PopupParam.IsConfirm && !isUndefined(this.PopupParam.IsConfirm) && this.PopupParam.IsConfirm > 0) {

            this.Report.ContractPayListDetailReport(
              this.PopupParam.CostFactorID,
              this.PopupParam.ContractAgentCode,
              2516,
              this.RegionCode,
              'خلاصه مالی فصول',
              0
            );
        } else {
          this.ShowMessageBoxWithOkBtn('به علت تایید نهایی نشدن این درخواست پرداخت، امکان مشاهده چاپ وجود ندارد.');
          return;
        }
      }
      if (this.SelectFinancialSheet) {
        this.Report.ContractPayListDetailReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.ContractAgentCode,
          2516,
          this.RegionCode,
          'برگه مالی',
          0,
          this.PrintCoef
        );
      }
      if (this.SelectSummaryQuantitySurveying) {
        this.Report.ContractPayListDetailReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.ContractAgentCode,
          2516,
          this.RegionCode,
          'خلاصه متره',
          0
        );
      }
      if (this.SelectQuantitySurveyingDetails) {
        this.Report.ContractPayListDetailReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.ContractAgentCode,
          2516,
          this.RegionCode,
          'خلاصه وضعیت قرارداد',
          0
        );
      }
      if (this.SelectShipment) {
        this.Report.ContractPayListDetailReport(
          this.PopupParam.CostFactorID,
          this.PopupParam.ContractAgentCode,
          2516,
          this.RegionCode,
          'حمل',
          this.PopupParam.ContractPayItemID
        );
      }
    } else {
      this.Select = true;
      this.ShowMessageBoxWithOkBtn('لطفا یک گزینه را برای چاپ انتخاب کنید!');
    }
  }
  PrintAmounts() {
    this.SelectAmounts = !this.SelectAmounts;
  }
  PrintFinancialSummarySeasons() {
    this.SelectFinancialSummarySeasons = !this.SelectFinancialSummarySeasons;
  }
  PrintFinancialSheet() {
    this.SelectFinancialSheet = !this.SelectFinancialSheet;
  }
  PrintSummaryQuantitySurveying() {
    this.SelectSummaryQuantitySurveying = !this.SelectSummaryQuantitySurveying;
  }
  PrintShipment() {
    this.SelectShipment = !this.SelectShipment;
  }
  PrintQuantitySurveyingDetails() {
    this.SelectQuantitySurveyingDetails = !this.SelectQuantitySurveyingDetails;
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
      case 'Notebook':
        this.SelectAmounts = checked;
        break;
      case 'FinancialSummarySeasons':
        this.SelectFinancialSummarySeasons = checked;
        break;
      case 'FinancialSheet':
        this.SelectFinancialSheet = checked;
        break;
      case 'QuantitySurveying':
        this.SelectSummaryQuantitySurveying = checked;
        break;
      case 'QuantitySurveyingDetails':
        this.SelectQuantitySurveyingDetails = checked;
        break;
      case 'Shipment':
        this.SelectShipment = checked;
        break;
      case 'PrintCoef':
        this.PrintCoef = checked;
        break;
      default:
        break;
    }

  }
}

