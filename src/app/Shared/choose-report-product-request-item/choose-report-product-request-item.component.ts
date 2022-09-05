import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';


@Component({
  selector: 'app-choose-report-product-request-item',
  templateUrl: './choose-report-product-request-item.component.html',
  styleUrls: ['./choose-report-product-request-item.component.css']
})
export class ChooseReportProductRequestItemComponent implements OnInit {
  @Input() ReportParam;
  @Output() CloseChooseReport: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  btnclicked = false;
  SelectedLevelCode = 1;
  SelectedGroupCode = 1;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ChooseReportClosed: any;
  RegionCode: number;

  constructor(
    private ProductRequest: ProductRequestService,
    private Report: ReportService
  ) { }

  ngOnInit() {
  }

  onPrint() {
    if (this.SelectedGroupCode === 2 && !this.ReportParam.SelectedProductRequestItemID) {
      this.ShowMessageBoxWithOkBtn('فعالیتی انتخاب نشده است');
      return;
    }
    const PRID = this.ReportParam.SelectedCostFactorID;
    const ModuleCode = this.ReportParam.ModuleCode;
    const PRItemID = this.ReportParam.SelectedProductRequestItemID;
    const Grp = this.SelectedGroupCode;
    this.RegionCode = this.ReportParam.RegionCode;
    const HeaderName = 'متره درخواست معامله';

    // if (this.SelectedLevelCode === 1) {
    this.Report.PREstimateFirstLevelReport(PRID, PRItemID, Grp, ModuleCode, this.RegionCode, HeaderName, this.SelectedLevelCode);
    // }
    // if (this.SelectedLevelCode === 2) {
    //   this.ProductRequest.PREstimateSecondLevelReport(PRID , PRItemID, Grp, ModuleCode, this.RegionCode, HeaderName);
    // }
    // if (this.SelectedLevelCode === 3) {
    //   this.ProductRequest.PREstimateThirdLevelReport(PRID , PRItemID, Grp, ModuleCode, this.RegionCode, HeaderName);
    // }
    // if (this.SelectedLevelCode === 4) {
    //   this.ProductRequest.PREstimateFourthLevelReport(PRID , PRItemID, Grp, ModuleCode, this.RegionCode, HeaderName);
    // }
  }
  onRedioClick(LevelCode: number) {
    if (LevelCode === 1) {
      this.SelectedLevelCode = 1;
    }
    if (LevelCode === 2) {
      this.SelectedLevelCode = 2;
    }
    if (LevelCode === 3) {
      this.SelectedLevelCode = 3;
    }
    if (LevelCode === 4) {
      this.SelectedLevelCode = 4;
    }
    if (LevelCode === 5) {
      this.SelectedGroupCode = 1;
    }
    if (LevelCode === 6) {
      this.SelectedGroupCode = 2;
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.startLeftPosition = 200;
    this.startTopPosition = 50;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed() {
    this.btnclicked = false;
  }

  onClose() {
    this.btnclicked = false;
    this.CloseChooseReport.emit(true);
  }

}
