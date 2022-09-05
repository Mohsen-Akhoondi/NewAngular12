import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';

@Component({
  selector: 'app-contract-deal-method-base-report',
  templateUrl: './contract-deal-method-base-report.component.html',
  styleUrls: ['./contract-deal-method-base-report.component.css']
})
export class ContractDealMethodBaseReportComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ReigonListSet;
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  MaincolumnDef;
  rowData = [];
  btnclicked = false;
  PopupType = '';
  overStartLeftPosition;
  OverStartTopPosition;
  OverPixelWidth;
  OverPixelHeight;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveMaxBtn = false;
  HaveHeader = false;

  constructor(
    private Region: RegionListService,
    private Workflow: WorkflowService,
    private contract: ContractListService
  ) {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد واحد اجرایی',
        field: 'Regioncode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نام واحد اجرایی',
        field: 'RegionName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تعداد هزینه ای ترک تشریفات',
        field: 'CostArticle31Count',
        width: 160,
        resizable: true
      },
      {
        headerName: 'مبلغ هزینه ای ترک تشریفات',
        field: 'CostArticle31Amount',
        width: 160,
        resizable: true
      },
      {
        headerName: 'تعداد درآمدی ترک تشریفات',
        field: 'IncomeArticle31Count',
        width: 160,
        resizable: true
      },
      {
        headerName: 'مبلغ درآمدی ترک تشریفات ',
        field: 'IncomeArticle31Amount',
        width: 160,
        resizable: true
      },
      {
        headerName: 'تعداد کل مناقصات عمومی',
        field: 'GeneralTenderCount',
        width: 160,
        resizable: true
      },
      {
        headerName: 'مبلغ کل مناقصات عمومی',
        field: 'GeneralTenderAmount',
        width: 160,
        resizable: true
      },
      {
        headerName: 'تعداد کارهای ارجاع شده(عمده و کلان)',
        field: 'AllTenderCount',
        width: 170,
        resizable: true
      },
      {
        headerName: 'مبلغ کارهای ارجاع شده(عمده و کلان)',
        field: 'AllTenderAmount',
        width: 170,
        resizable: true
      },
      {
        headerName: 'تعداد کارهای ارجاع شده(غیر عمده و کلان)',
        field: 'AllNotTenderCount',
        width: 180,
        resizable: true
      },
      {
        headerName: 'مبلغ کارهای ارجاع شده(غیر عمده و کلان)',
        field: 'AllNotTenderamount',
        width: 180,
        resizable: true
      },
      {
        headerName: 'تعداد کل مزایدات',
        field: 'AuctionTenderCount',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مبلغ کل مزایدات',
        field: 'AuctionTenderAmount',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تعداد قراداد های بهساز نگهدار',
        field: 'BehsazNegahdarCount',
        width: 160,
        resizable: true
      },
      {
        headerName: 'مبلغ قراداد های بهساز نگهدار',
        field: 'BehsazNegahdarAmount',
        width: 160,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetUserRegionList(false)
    ]).subscribe(res => {
      this.FinYearItems = res[0];
      this.ReigonListSet = res[1];
    });
  }

  Search() {
    let RegionCodeList = [];
    let FinYearCodeList = [];
    if (!this.NgSelectRegionParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('واحد اجرایی را انتخاب نمایید');
      return;
    }
    RegionCodeList = this.NgSelectRegionParams.selectedObject;
    FinYearCodeList = this.FinYearParams.selectedObject;
    this.rowData = [];
    this.contract.GetInspectionReport(
      RegionCodeList,
      FinYearCodeList
    ).subscribe(res => {
      if (res) {
        this.rowData = res;
      }
    });
  }

  closeModal() {
    this.Closed.emit(true);
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.overStartLeftPosition = 530;
    this.OverStartTopPosition = 200;
    this.OverPixelWidth = null;
    this.OverPixelHeight = null;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}
