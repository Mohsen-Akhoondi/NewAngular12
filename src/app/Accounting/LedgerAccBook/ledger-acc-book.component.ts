import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { AccountingService } from 'src/app/Services/AccountingService/AccountingService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ledger-acc-book',
  templateUrl: './ledger-acc-book.component.html',
  styleUrls: ['./ledger-acc-book.component.css']
})
export class LedgerAccBookComponent implements OnInit {

  @Output() LedgerAccBookClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  VoucherStatusRadioTypes: Array<RadioBoxModel> = [];
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };


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
  SelectedRegion;
  SelectedFinYear;
  FromVoucherCode;
  ToVoucherCode;
  FromDate;
  ToDate;
  VoucherStatusCode;
  SelectedRbVoucherStatus;
  cb1Selected;
  cb2Selected;
  cb3Selected;
  cb1Disabled = false;
  cb2Disabled = false;
  cb3Disabled = false;
  FromToVoucherCodeDisabled = false;
  LedgerAccToPageCount;
  LedgerAccToTotalItems;
  LedgerAccFromPageCount;
  LedgerAccFromTotalItems;
  currentFromLegerAccSearchTerm;
  currentToLegerAccSearchTerm;
  PopupType;
  FromLedgerAccID;
  ToLedgerAccID;
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
  FinYearListSet = [];
  RegionListSet = [];
  LedgerAccFromSet = [];
  LedgerAccToSet = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ShowMessage = false;
  gridcoldef = [];
  LedgerAccRows: any = [];
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
    this.LedgerAccRows = of([]);
    this.MakeVoucherStatusRadio();
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
  onChangeFinYear(param) {
    this.SelectedFinYear = param;
  }
  OnToDateChange(param) {
    this.ToDate = param.MDate;
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
  onShowReport() {
    if (this.cb2Selected) {
      this.MonthlyColDef();
      this.LedgerAccRows = this.AccountingServ.LedgerAccBookByMonthRep(this.SelectedRegion, this.SelectedFinYear, this.FromDate,
        this.ToDate, this.VoucherStatusCode, this.FromVoucherCode, this.ToVoucherCode,
        this.FromLedgerAccID, this.ToLedgerAccID, this.cb1Selected ? 1 : 0);
    } else {
      this.DailyColDef();
      this.LedgerAccRows = this.AccountingServ.LedgerAccBookRep(this.SelectedRegion, this.SelectedFinYear, this.FromDate,
        this.ToDate, this.VoucherStatusCode, this.FromVoucherCode, this.ToVoucherCode,
        this.FromLedgerAccID, this.ToLedgerAccID, this.cb1Selected ? 1 : 0);
    }
  }
  onChangeReigonObj(param) {
    this.SelectedRegion = param;
  }

  OnChangeCheckBoxValue(param, element) {
    switch (element) {
      case 1:
        this.cb1Selected = param;
        break;
      case 2:
        if (!this.cb2Selected) {
          this.alertMessageParams.message =
          'چنانچه در تاریخ, ابتدا و انتهای ماه های موردنظر انتخاب نشود ارقام نمایش داده شده دارای مغایرت خواهند بود.';
          this.ShowMessage = true;
          this.PopupType = 'message-box';
        }
        this.cb2Selected = param;
      break;
      default:
      break;
    }
  }
  MakeVoucherStatusRadio(): void {
    this.VoucherStatusRadioTypes = [];
    this.VoucherStatusRadioTypes.push(new RadioBoxModel('نمایش مانده خطی', 1, false, 'rdoLinear_ledgeracc'));
    this.VoucherStatusRadioTypes.push(new RadioBoxModel('نمایش مانده تجمیعی', 2, false, 'rdototalsum_ledgeracc'));
  }
  VoucherStatusRadioClick(param) {
    this.cb1Disabled = false;
    this.cb2Disabled = false;
    this.cb3Disabled = false;
    this.SelectedRbVoucherStatus = param;
  }
  popupclosed(event) {
    if (this.PopupType === 'message-box') {
      this.ShowMessage = false;
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

  closeModal() {
    this.ShowMessage = false;
    this.LedgerAccBookClosed.emit(true);
  }
  OnOpenNgSelectLedger() {
    if (!this.SelectedRegion || !this.SelectedFinYear) {
      return;
    }
    this.LedgerAccFromParams.loading = true;
    this.AccountingServ.GetLedgerAcc(this.SelectedRegion, this.SelectedFinYear).subscribe(res => {
      this.LedgerAccFromSet = res;
      this.LedgerAccToSet = res;
    });
    this.LedgerAccFromParams.loading = false;
  }
  onChangeLedgerAcc(event, el) {
    switch (el) {
      case 'From':
        this.FromLedgerAccID = event;
      break;
      case 'To':
        this.ToLedgerAccID = event;
      break;
      default:
      break;
    }
  }
  DailyColDef() {
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
  MonthlyColDef() {
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
        headerName: 'مبلغ بستانکار',
        field: 'CreditAmount',
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
        headerName: 'ماه',
        field: 'MonthCodeStr',
        width: 120,
        resizable: true,
        editable: false
      },
    ];
  }
}
