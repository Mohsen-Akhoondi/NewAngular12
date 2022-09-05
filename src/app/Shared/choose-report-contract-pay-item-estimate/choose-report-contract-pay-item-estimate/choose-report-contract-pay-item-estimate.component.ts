import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-choose-report-contract-pay-item-estimate',
  templateUrl: './choose-report-contract-pay-item-estimate.component.html',
  styleUrls: ['./choose-report-contract-pay-item-estimate.component.css']
})
export class ChooseReportCOntractPayItemEstimateComponent implements OnInit {
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
  SumFinalAmountCOEFPact = 0;
  ContractAgentParams = {
    bindLabelProp: 'ContractAgentName',
    bindValueProp: 'ContractAgentCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    clearable: false
  };
  ContractAgentSet = [];

  constructor(private Report: ReportService,
    private contractpaydetail: ContractPayDetailsService,) { }

  ngOnInit() {
    this.contractpaydetail.GetContractAgent().subscribe(res => {
      this.ContractAgentSet = res;
      if (!this.ContractAgentParams.selectedObject) {
        this.ContractAgentParams.selectedObject = res[0].ContractAgentCode;
      }
    });
  }

  onPrint() {
    if (this.SelectedGroupCode === 2 && !this.ReportParam.SelectedContractPayItemID) {
      this.ShowMessageBoxWithOkBtn('فعالیتی انتخاب نشده است');
      return;
    }
    const CPID = this.ReportParam.SelectedContractPayID;
    const ModuleCode = this.ReportParam.ModuleCode;
    const CPItemID = this.ReportParam.SelectedContractPayItemID;
    const Grp = this.SelectedGroupCode;
    this.RegionCode = this.ReportParam.RegionCode;
    const ContractID = this.ReportParam.SelectedContractID;
    const CPCostfactorID = this.ReportParam.SelectedCostFactorID;
    const ContractAgentCode = this.ContractAgentParams.selectedObject;
    this.SumFinalAmountCOEFPact = this.ReportParam.SumFinalAmountCOEFPact;
    const HeaderName = 'متره درخواست پرداخت';


    this.Report.CPEstimateReport(CPID, CPItemID, Grp,
      ModuleCode, this.RegionCode, HeaderName, this.SelectedLevelCode,
      ContractID, CPCostfactorID, ContractAgentCode, this.SumFinalAmountCOEFPact);
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
