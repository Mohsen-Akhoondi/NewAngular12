import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { forkJoin } from 'rxjs';
import { AccountingService } from 'src/app/Services/AccountingService/AccountingService';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-account-turnover',
  templateUrl: './account-turnover.component.html',
  styleUrls: ['./account-turnover.component.css']
})
export class AccountTurnoverComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  RegionParams = {
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
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  LedgerAccParams = {
    bindLabelProp: 'LedgerAccCodeName',
    bindValueProp: 'LedgerAccID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  SubLedgerAccParams = {
    bindLabelProp: 'SubLedgerAccCodeName',
    bindValueProp: 'SubLedgerAccID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  DetailAccGroupParams = {
    bindLabelProp: 'DetailAccGroupCodeName',
    bindValueProp: 'DetailAccGroupID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  DetailAccParams = {
    bindLabelProp: 'DetailAccCodeName',
    bindValueProp: 'DetailAccCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  LedgerAccSet = [];
  SubLedgerAccSet = [];
  DetailAccSet ;
  DetailAccGroupListSet = [];
  columnDef;
  FinYearItems = [];
  ReigonListSet = [];
  MonthsParams = {
    bindLabelProp: 'MonthName',
    bindValueProp: 'MonthCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  currentSubLedgerAccSearchTerm;
  currentLedgerAccSearchTerm;
  MonthsItems = [
  {MonthName: 'فروردین' , MonthCode: 1},
  {MonthName: 'اردیبهشت' , MonthCode: 2},
  {MonthName: 'خرداد' , MonthCode: 3},
  {MonthName: 'تیر' , MonthCode: 4},
  {MonthName: 'مرداد' , MonthCode: 5},
  {MonthName: 'شهریور' , MonthCode: 6},
  {MonthName: 'مهر' , MonthCode: 7},
  {MonthName: 'آبان' , MonthCode: 8},
  {MonthName: 'آذر' , MonthCode: 9},
  {MonthName: 'دی' , MonthCode: 10},
  {MonthName: 'بهمن' , MonthCode: 11},
  {MonthName: 'اسفند' , MonthCode: 12},
  {MonthName: 'دوره_مالی' , MonthCode: 13}
  ];
  gridApi;
  rowsData: any =[];
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  HaveMaxBtn = false;
  TotalItemCount;
  PageCount;
  currentDetailAccGroupSearchTerm;
  currentDetailAccSearchTerm;
  LedgerAccCode;
  SubLedgerAccCode;
  DetailAccGroupCode;
  ModuleCode;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor(private Workflow: WorkflowService,
    private Region: RegionListService,
    private AccountingServ: AccountingService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'FlowNo',
        width: 80,
        resizable: true
      },
      {
        headerName: '',
        field: 'FlowPrompt',
        width: 180,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'بدهکار',
        field: 'CreditAmount',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'بستانکار',
        field: 'DebitAmount',
        width: 120,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.getNewData();
  }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetRegionList(this.ModuleCode, false)
    ]).subscribe(res => {
      this.FinYearItems = res[0];
      this.ReigonListSet = res[1];
      this.RegionParams.selectedObject = res[1][0].RegionCode;
    });
  }
  report() {
    this.LedgerAccCode = this.LedgerAccSet.find(x => x.LedgerAccID === this.LedgerAccParams.selectedObject).LedgerAccCode;
    this.SubLedgerAccCode = this.SubLedgerAccSet.find(x => x.SubLedgerAccID === this.SubLedgerAccParams.selectedObject).SubLedgerAccCode;
    // tslint:disable-next-line:max-line-length
    this.DetailAccGroupCode = this.DetailAccGroupListSet.find(x => x.DetailAccGroupID === this.DetailAccGroupParams.selectedObject).DetailAccGroupCode;
    // tslint:disable-next-line:max-line-length
    this.AccountingServ.FlowAccountRep(this.RegionParams.selectedObject, this.FinYearParams.selectedObject, this.MonthsParams.selectedObject, this.LedgerAccCode, this.SubLedgerAccCode, this.DetailAccGroupCode, this.DetailAccParams.selectedObject).subscribe(res => {
      this.rowsData = res;
    });
  }
  onClose() {
    this.Closed.emit(true);
  }
  onGridReady (params) {
    this.gridApi = params.api;
  }
  onChangeRegionObj(param) {
    this.FinYearParams.selectedObject = null;
    this.LedgerAccParams.selectedObject = null;
    this.SubLedgerAccParams.selectedObject = null;
    this.DetailAccGroupParams.selectedObject = null;
    this.DetailAccParams.selectedObject = null;
  }
  onChangeFinYear(param) {
    this.LedgerAccParams.selectedObject = null;
    this.SubLedgerAccParams.selectedObject = null;
    this.DetailAccGroupParams.selectedObject = null;
    this.DetailAccParams.selectedObject = null;
  }
  OnOpenNgSelectLedger() {
    if (this.RegionParams.selectedObject === null || this.FinYearParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('ابتدا سال مالی را پر نمایید');
    } else {
  this.AccountingServ.GetLedgerAcc(this.RegionParams.selectedObject, this.FinYearParams.selectedObject)
    .subscribe(res => {
      this.LedgerAccSet = res;
    });
  }
  }

  onChangeLedgerAcc(event) {
    this.SubLedgerAccParams.selectedObject = null;
    this.DetailAccGroupParams.selectedObject = null;
    this.DetailAccParams.selectedObject = null;
  }
  onChangeSubLedgerAcc(event) {
    this.DetailAccGroupParams.selectedObject = null;
    this.DetailAccParams.selectedObject = null;
  }
  OnOpenNgSelectSubLedger() {
    if (!this.LedgerAccParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('ابتدا حساب کل را پر نمایید');
    } else {
    this.AccountingServ.GetSubLedgerByLedger(this.LedgerAccParams.selectedObject, null)
    .subscribe(res => {
      this.SubLedgerAccSet = res;
    });
  }
  }
  OnOpenNgSelectDetailAccGroup() {
    if (!this.SubLedgerAccParams.selectedObject ) {
      this.ShowMessageBoxWithOkBtn('ابتدا حساب معین را پر نمایید');
    } else {
      this.AccountingServ.GetDetailAccGroupBySubLedger(this.SubLedgerAccParams.selectedObject, null).subscribe(res => {
       this.DetailAccGroupListSet = res;
       });
  }
  }
  onChangeDetailAccGroupObj(event) {
    this.DetailAccParams.selectedObject = null;
  }
  OnOpenNgSelectDetailAcc() {
    if (!this.DetailAccGroupParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('ابتدا گروه تفصیلی را پر نمایید');
    } else {
      // tslint:disable-next-line:max-line-length
      this.AccountingServ.GetDetailAccByGroupSearch(this.DetailAccGroupParams.selectedObject, this.RegionParams.selectedObject).subscribe(
        res => {
        this.DetailAccSet = res;
      });
  }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 580;
    this.startTopPosition = 300;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed(event) {
    this.isClicked = false;
    this.HaveMaxBtn = false;
  }
}

