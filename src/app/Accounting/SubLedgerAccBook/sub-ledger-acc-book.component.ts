import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountingService } from 'src/app/Services/AccountingService/AccountingService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { forkJoin, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-ledger-acc-book',
  templateUrl: './sub-ledger-acc-book.component.html',
  styleUrls: ['./sub-ledger-acc-book.component.css']
})
export class SubLedgerAccBookComponent implements OnInit {
  @Output() SubLedgerAccBookClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  VoucherStatusParams = {
    bindLabelProp: 'VoucherStatusName',
    bindValueProp: 'VoucherStatusCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ReportTypeParams = {
    bindLabelProp: 'ReportTypeName',
    bindValueProp: 'ReportTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SortTypeParams = {
    bindLabelProp: 'SortTypeName',
    bindValueProp: 'SortTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SelectedReportType;
  SelectedRegion;
  SelectedFinYear;
  FinYearListSet = [];
  RegionListSet = [];
  VoucherStatusListSet =
  [
    {
      VoucherStatusName : 'ثبت شده',
      VoucherStatusCode: 1,
    },
    {
      VoucherStatusName : 'ثبت نشده',
      VoucherStatusCode: 2,
    },
    {
      VoucherStatusName : 'کلیه اسناد',
      VoucherStatusCode: 3,
    },
  ];
  ReportTypeListSet =
  [
    {
      ReportTypeName: 'به سر جمع',
      ReportTypeCode : 1,
    },
    {
      ReportTypeName: 'به ریز',
      ReportTypeCode : 2,
    },
  ];
  SortTypeListSet =
  [
    {
      SortTypeName: 'شماره سند',
      SortTypeCode: 1,
    },
    {
      SortTypeName: 'تاریخ سند',
      SortTypeCode: 2,
    }
  ];
  SelectedSortType;
  LedgerAccFromPageCount;
  LedgerAccFromParams = {
    Items: [],
    bindLabelProp: 'LedgerAccCodeName',
    bindValueProp: 'LedgerAccID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  LedgerAccToParams = {
    Items: [],
    bindLabelProp: 'LedgerAccCodeName',
    bindValueProp: 'LedgerAccID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  SubLedgerAccFromParams = {
    Items: [],
    bindLabelProp: 'SubLedgerAccCodeName',
    bindValueProp: 'SubLedgerAccID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  SubLedgerAccToParams = {
    Items: [],
    bindLabelProp: 'SubLedgerAccCodeName',
    bindValueProp: 'SubLedgerAccID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };

  SubLedgerAccFromPageCount;
  LedgerAccFromSet = [];
  SubLedgerAccFromSet = [];
  SubLedgerAccToPageCount;
  SubLedgerAccToSet = [];
  LedgerAccFromTotalItems;
  SubLedgerAccFromTotalItems;
  SubLedgerAccToTotalItems;
  LedgerAccToSet = [];
  LedgerAccToTotalItems;
  currentFromLegerAccSearchTerm;
  currentFromSubLegerAccSearchTerm;
  currentToSubLegerAccSearchTerm;
  LedgerAccToPageCount;
  currentToLegerAccSearchTerm;
  FromDate;
  ToDate;
  FromVoucherCode;
  ToVoucherCode;
  FromToVoucherCodeDisabled = false;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  cb1Selected;
  cb1Disabled = false;
  FromLedgerID;
  ToLedgerID;
  ToSubLedgerID;
  FromSubLedgerID;
  VoucherStatusCode;
  gridcoldef;
  SubLedgerAccRows: any = [];
  ModuleCode;
  constructor(private RegionService: RegionListService,
    private Finyearserv: FinYearService,
    private AccountingServ: AccountingService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
    }

  ngOnInit() {
    this.SubLedgerAccRows = of([]);
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 7;
    forkJoin([
      this.RegionService.GetRegionList(this.ModuleCode),
      this.Finyearserv.GetFinYearList(),
    ]).subscribe(res => {
      this.RegionListSet = res[0];
      this.FinYearListSet = res[1];
    });
  }
  onChangeRegionObj(param) {
    this.SelectedRegion = param;
    this.ResetForm();
  }
  onChangeReportType(param) {
    this.SelectedReportType = param;
  }
  onChangeFinYear(param) {
    this.SelectedFinYear = param;
    this.ResetForm();
  }
  onChangeVoucherStatus(param) {
    this.VoucherStatusCode = param;
    if (this.VoucherStatusCode === 1) {
      this.FromToVoucherCodeDisabled = false;
    } else {
      this.FromToVoucherCodeDisabled = true;
      this.FromVoucherCode = null;
      this.ToVoucherCode = null;
    }
  }
  OnChangeSortType(param) {
    this.SelectedSortType = param;
  }
  onChangeLedgerAcc(event, el) {
    switch (el) {
      case 'From':
        this.FromLedgerID = event;
      break;
      case 'To':
        this.ToLedgerID = event;
      break;
      default:
      break;
    }
    this.SubLedgerAccToParams.selectedObject = null;
    this.ToSubLedgerID = null;
    this.SubLedgerAccFromParams.selectedObject = null;
    this.FromSubLedgerID = null;
  }


  onChangeSubLedgerAcc(event, el) {
    switch (el) {
      case 'From':
        this.FromSubLedgerID = event;
      break;
      case 'To':
        this.ToSubLedgerID = event;
      break;
      default:
      break;
    }
  }

  ResetForm() {
    this.ToLedgerID = null;
    this.FromLedgerID = null;
    this.ToSubLedgerID = null;
    this.FromSubLedgerID = null;
    this.LedgerAccFromParams.selectedObject = null;
    this.LedgerAccToParams.selectedObject = null;
    this.SubLedgerAccFromParams.selectedObject = null;
    this.SubLedgerAccToParams.selectedObject = null;
  }

  OnChangeCheckBoxValue(param, element) {
    switch (element) {
      case 1:
        this.cb1Selected = param;
        break;
      default:
      break;
    }
  }

  OnOpenNgSelectSubLedger() {
    if (!this.SelectedFinYear || !this.SelectedRegion || !this.FromLedgerID || !this.ToLedgerID) {
      return;
    }
    this.AccountingServ.GetSubLedgerByLedger(this.FromLedgerID,
    this.ToLedgerID).subscribe(res => {
      this.SubLedgerAccFromSet = res;
      this.SubLedgerAccToSet = res;
    });
  }


  OnOpenNgSelectLedger() {
    if (!this.SelectedRegion || !this.SelectedFinYear) {
      return;
    }
    this.AccountingServ.GetLedgerAcc(this.SelectedRegion, this.SelectedFinYear).subscribe(res => {
      this.LedgerAccFromSet = res;
      this.LedgerAccToSet = res;
    });
  }
  OnDateChange(param, el) {
    switch (el) {
      case 'From':
        this.FromDate = param ? param.MDate : null;
        break;
        case 'To':
          this.ToDate = param ? param.MDate : null;
          break;
        default:
          break;
    }
  }

  getVoucherCode(param, el) {
    switch (el) {
      case 'From':
        this.FromVoucherCode = param ? param : null;
        break;
        case 'To':
          this.ToVoucherCode = param ? param : null;
          break;
        default:
          break;
    }
  }
  onShowReport() {
    if (this.SelectedReportType === 1) {
      this.SubLedgerColdef();
      this.SubLedgerAccRows = this.AccountingServ.SubLedgerAccBookRep(this.SelectedRegion, this.SelectedFinYear, this.FromDate, this.ToDate,
        this.VoucherStatusCode, this.FromVoucherCode, this.ToVoucherCode, this.FromLedgerID, this.ToLedgerID,
        this.FromSubLedgerID, this.ToSubLedgerID, this.SelectedSortType, this.cb1Selected ? 1 : 0 );
    } else if (this.SelectedReportType === 2) {
      this.SubLedgerDetailcoldef();
      this.SubLedgerAccRows = this.AccountingServ.SubLedgerAccBookDetailRep(this.SelectedRegion, this.SelectedFinYear, this.FromDate,
        this.ToDate, this.VoucherStatusCode, this.FromVoucherCode, this.ToVoucherCode, this.FromLedgerID, this.ToLedgerID,
         this.FromSubLedgerID, this.ToSubLedgerID, this.SelectedSortType, this.cb1Selected ? 1 : 0 );
    }


  }
  closeModal() {
    this.SubLedgerAccBookClosed.emit(true);
  }
  SubLedgerColdef() {
    this.gridcoldef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: false
      },
      {
        headerName: 'کد حساب کل',
        field: 'LedgerAccCode',
        width: 120,
        resizable: true,
        editable: false

      },
      {
        headerName: 'نام حساب کل',
        field: 'LedgerAccName',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
      },
      {
        headerName: 'نام حساب معین',
        field: 'SubLedgerAccName',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
      },
      {
        headerName: 'کد حساب معین',
        field: 'SubLedgerAccName',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
      },
      {
        headerName: 'مبلغ بستانکار',
        field: 'CreditAmount',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره ثبت سند',
        field: 'RegisterCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ ثبت سند',
        field: 'RegisterDate',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره تنظیم سند',
        field: 'VoucherCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره تنظیم سند',
        field: 'VoucherDate',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'مبلغ بدهکار',
        field: 'DebitAmount',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 120,
        resizable: true,
        editable: false
      },
    ];
  }

  SubLedgerDetailcoldef() {
    this.gridcoldef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: false
      },
      {
        headerName: 'کد حساب کل',
        field: 'LedgerAccCode',
        width: 120,
        resizable: true,
        editable: false

      },
      {
        headerName: 'نام حساب کل',
        field: 'LedgerAccName',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
      },
      {
        headerName: 'نام حساب معین',
        field: 'SubLedgerAccName',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
      },
      {
        headerName: 'کد حساب معین',
        field: 'SubLedgerAccName',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
      },
      {
        headerName: 'مبلغ بستانکار',
        field: 'CreditAmount',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره ثبت سند',
        field: 'RegisterCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ ثبت سند',
        field: 'RegisterDate',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره چک',
        field: 'ReferenceNo',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ چک',
        field: 'ReferenceDate',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره تنظیم سند',
        field: 'VoucherCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره تنظیم سند',
        field: 'VoucherDate',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'مبلغ بدهکار',
        field: 'DebitAmount',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 120,
        resizable: true,
        editable: false
      },
    ];
  }

}
