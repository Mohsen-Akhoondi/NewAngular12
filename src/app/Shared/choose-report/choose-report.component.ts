import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-choose-report',
  templateUrl: './choose-report.component.html',
  styleUrls: ['./choose-report.component.css']
})
export class ChooseReportComponent implements OnInit {
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
  AmountCOEFPact = 0;

  constructor(
    private PriceList: PriceListService,
    private Report: ReportService) { }

  ngOnInit() {

  }


  onPrint() {
    if (this.SelectedGroupCode === 2 && !this.ReportParam.SelectedContractOrderItemID) {
      this.ShowMessageBoxWithOkBtn('فعالیتی انتخاب نشده است');
      return;
    }
    this.AmountCOEFPact = this.ReportParam.AmountCOEFPact;
    const CID = this.ReportParam.SelectedContractID;
    const ModuleCode = this.ReportParam.ModuleCode;
    const COrderItemID = this.ReportParam.SelectedContractOrderItemID;
    const Grp = this.SelectedGroupCode;
    this.RegionCode = this.ReportParam.RegionCode;
    const HeaderName = 'فهرست بها';
    this.Report.PriceListFirstLevelReport(
      CID, COrderItemID, Grp, ModuleCode, this.RegionCode, HeaderName,
      this.SelectedLevelCode, this.AmountCOEFPact
    );
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
