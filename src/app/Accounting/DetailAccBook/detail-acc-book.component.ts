import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { AccountingService } from 'src/app/Services/AccountingService/AccountingService';
import { forkJoin, of } from 'rxjs';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail-acc-book',
  templateUrl: './detail-acc-book.component.html',
  styleUrls: ['./detail-acc-book.component.css']
})
export class DetailAccBookComponent implements OnInit {
  @Output() DetailAccBookClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();

  SelectedRegion;
  FinYearListSet = [];
  RegionListSet = [];
  SelectedFinYear;
  LedgerAccFromSet = [];
  LedgerAccToSet = [];
  DetailAccToSet = [];
  DetailAccToTotalItems;
  DetailAccFromTotalItems;
  DetailAccFromSet = [];
  SubLedgerAccFromSet = [];
  SubLedgerAccToSet = [];
  DetailAccGroupFromSet = [];
  DetailAccGroupToSet = [];
  FromSubLedgerId;
  ToSubLedgerId;
  FromDetailAccGroupCode;
  ToDetailAccGroupCode;
  FromLedgerId;
  ToLedgerId;
  FromDetailAccID;
  ToDetailAccID;
  currentFromDetailAccSearchTerm;
  currentToDetailAccSearchTerm;
  DetailAccFromParam = {
    bindLabelProp: 'DetailAccCodeName',
    bindValueProp: 'DetailAccID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'detail-acc-from-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        // tslint:disable-next-line:max-line-length
        [{ HeaderCaption: 'نام حساب', HeaderName: 'DetailAccName', width: 35, MinTermLenght: 3, SearchOption: 'DetailAccName' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'شماره حساب', HeaderName: 'DetailAccCode', width: 53, MinTermLenght: 3, SearchOption: 'DetailAccCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'نام حساب', width: 35, },
        { HeaderCaption: 'شماره حساب', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  DetailAccToPageCount;
  DetailAccFromPageCount;
  DetailAccToParam = {
    bindLabelProp: 'DetailAccCodeName',
    bindValueProp: 'DetailAccID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'detail-acc-to-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        // tslint:disable-next-line:max-line-length
        [{ HeaderCaption: 'نام حساب', HeaderName: 'DetailAccName', width: 35, MinTermLenght: 3, SearchOption: 'DetailAccName' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'شماره حساب', HeaderName: 'DetailAccCode', width: 53, MinTermLenght: 3, SearchOption: 'DetailAccCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'نام حساب', width: 35, },
        { HeaderCaption: 'شماره حساب', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

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
  DetailAccGroupFromParams = {
    bindLabelProp: 'DetailAccGroupCodeName',
    bindValueProp: 'DetailAccGroupCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  DetailAccGroupToParams = {
    bindLabelProp: 'DetailAccGroupCodeName',
    bindValueProp: 'DetailAccGroupCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  FromDate;
  ToDate;
  VoucherStatusCode;
  NgPrintParams = {
    bindLabelProp: 'PrintTypeName',
    bindValueProp: 'PrintTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgPrintListSet = [
    {PrintTypeName : '_', PrintTypeCode: 0},
    {PrintTypeName : 'به ریز', PrintTypeCode: 1},
    {PrintTypeName : 'به سرجمع', PrintTypeCode: 2}
  ];
  SelectedPrintType;
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

  NgSortParams = {
    bindLabelProp: 'SortName',
    bindValueProp: 'SortCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  RegisterVoucherRadioTypes: Array<RadioBoxModel> = [];
  RegisterVoucherDisabled = true;

  VoucherStatusListSet =
  [
    {
      VoucherStatusName : 'ثبت نشده',
      VoucherStatusCode: 0,
    },
    {
      VoucherStatusName : 'ثبت شده',
      VoucherStatusCode: 1,
    },
    {
      VoucherStatusName : 'کلیه اسناد',
      VoucherStatusCode: 2,
    },
  ];
  NgSortListSet = [
    {
      SortCode: 1 , SortName : 'شماره سند'
    },
    {
      SortCode: 2 , SortName : 'تاریخ سند'
    }
  ];
  FromVoucherCode;
  FromDebitAmount = 0;
  ToDebitAmount = 99999999999999999;
  FromCreditAmount = 0;
  ToCreditAmount = 99999999999999999;
  FromToVoucherCodeDisabled;
  ToVoucherCode;
  cb1Selected;
  cb2Selected;
  SelectedSort;
  SelectedRbRegisterVoucher;
  IsCash = false;
  NotCash = false;
  DetailAccRows: any = [];
  gridcoldef;
  ModuleCode;
  constructor(private RegionService: RegionListService, private Finyearserv: FinYearService,
    private AccountingServ: AccountingService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
    }

  OnChangePrintType(event) {
    this.SelectedPrintType = event;
  }

  ngOnInit() {
    this.DetailAccRows = of([]);
    this.VoucherStatusParams.selectedObject = 0;
    this.NgPrintParams.selectedObject = 0;
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 7;
    this.MakeRegisterVoucherRadio();
    forkJoin([
      this.RegionService.GetRegionList(this.ModuleCode),
      this.Finyearserv.GetFinYearList(),
    ]).subscribe(res => {
      this.RegionListSet = res[0];
      this.FinYearListSet = res[1];
    });
  }
  onChangeVoucherStatus(param) {
    this.VoucherStatusCode = param;
    if (this.VoucherStatusCode === 2 ) {
      this.RegisterVoucherDisabled = false;
    } else {
      this.RegisterVoucherDisabled = true;
    }
  }
  onChangeNgSort(param) {
    this.SelectedSort = param;
  }
  VoucherStatusRadioClick(event) {
    this.SelectedRbRegisterVoucher = event;
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

  GetDebitAmount(param, el) {
    switch (el) {
      case 'From':
        this.FromDebitAmount = param ? param : null;
        break;
        case 'To':
          this.ToDebitAmount = param ? param : null;
          break;
        default:
          break;
    }
  }
  GetCreditAmount(param, el) {
    switch (el) {
      case 'From':
        this.FromCreditAmount = param ? param : null;
        break;
        case 'To':
          this.ToCreditAmount = param ? param : null;
          break;
        default:
          break;
    }
  }
  onShowReport() {
    let RegisterCheck;
    let check1;
    let check2;
    let iscash;
    let Check2031 = 0;
    if (this.SelectedRbRegisterVoucher === 1) {
      RegisterCheck = 1;
    } else if (this.SelectedRbRegisterVoucher === 2) {
      RegisterCheck = 2;
    }
    if (this.SelectedPrintType === 1) {
      check1 = 1;
    } else if (this.SelectedPrintType === 2) {
      check1 = 2;
    }
    if (this.cb1Selected) {
      check2 = 1;
    }
    if (this.IsCash && this.NotCash) {
      iscash = 2;
    } else if (this.IsCash && (!this.NotCash)) {
      iscash = 1;
    } else if ((!this.IsCash) && this.NotCash) {
      iscash = 0;
    } else if ((!this.IsCash) && (!this.NotCash)) {
      iscash = null;
    }
    this.DetailAccBookColDef();
    if (this.SelectedPrintType === 1 || this.SelectedPrintType === 0) {
      this.DetailAccRows = this.AccountingServ.DetailAccBookRep(this.SelectedRegion, this.SelectedFinYear, this.FromLedgerId,
        this.FromSubLedgerId, this.FromDetailAccGroupCode, this.FromDetailAccID, this.ToLedgerId,
        this.ToSubLedgerId, this.ToDetailAccGroupCode, this.ToDetailAccID, this.FromDate, this.ToDate, this.VoucherStatusCode,
        this.FromVoucherCode, this.ToVoucherCode, this.FromDebitAmount, this.ToDebitAmount, this.FromCreditAmount, this.ToCreditAmount,
        check1, check2, this.SelectedSort, RegisterCheck, Check2031, iscash);
    } else if (this.SelectedPrintType === 2) {
      this.DetailAccRows = this.AccountingServ.DetailAccBookRepTotal(this.SelectedRegion, this.SelectedFinYear, this.FromLedgerId,
        this.FromSubLedgerId, this.FromDetailAccGroupCode, this.FromDetailAccID, this.ToLedgerId,
        this.ToSubLedgerId, this.ToDetailAccGroupCode, this.ToDetailAccID, this.FromDate, this.ToDate, this.VoucherStatusCode,
        this.FromVoucherCode, this.ToVoucherCode, this.FromDebitAmount, this.ToDebitAmount, this.FromCreditAmount, this.ToCreditAmount,
        check1, check2, this.SelectedSort, RegisterCheck, Check2031, iscash);
    }
  }
  DetailAccBookColDef() {
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
      {
        headerName: 'شماره',
        field: 'ChequeNo',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ عطف',
        field: 'ReferenceDate',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'کد حساب تفیلی',
        field: 'DetailAccCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'نام حساب تفیلی',
        field: 'DetailAccName',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'کد گروه حساب تفیلی',
        field: 'DetailAccGroupCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'نام گروه حساب تفیلی',
        field: 'DetailAccGroupCode',
        width: 120,
        resizable: true,
        editable: false
      },
      {
        headerName: 'کد درخواست وجه',
        field: 'FeeCode',
        width: 120,
        resizable: true,
        editable: false
      },
    ];
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
  OnChangeCheckBox1Value(param) {
    if (param) {
      this.cb1Selected = param;
    } else {
      this.cb1Selected = false;
    }
  }
  OnChangeCheckBoxCash(param, el) {
    switch (el) {
      case 'IsCash':
        this.IsCash = param;
        break;
      case 'NotCash':
        this.NotCash = param;
        break;
      default:
        break;
    }
  }

  MakeRegisterVoucherRadio(): void {
    this.RegisterVoucherRadioTypes = [];
    this.RegisterVoucherRadioTypes.push(new RadioBoxModel('ثبت - تنظیمی', 1, false, 'rdoRegisterVoucher_DetailAcc'));
    this.RegisterVoucherRadioTypes.push(new RadioBoxModel('تنظیمی - ثبت', 2, false, 'rdoVoucherRegister_DetailAcc'));
  }
  onChangeSubLedgerAcc(event, el) {
    switch (el) {
      case 'From':
        this.FromSubLedgerId = event;
      break;
      case 'To':
        this.ToSubLedgerId = event;
      break;
      default:
      break;
    }
  }
  onChangeDetailAccGroup(event, el) {
    switch (el) {
      case 'From':
        this.FromDetailAccGroupCode = event;
      break;
      case 'To':
        this.ToDetailAccGroupCode = event;
      break;
      default:
      break;
    }
  }
  OnOpenNgSelectSubLedger() {
    if (!this.SelectedFinYear || !this.SelectedRegion || !this.FromLedgerId || !this.ToLedgerId) {
      return;
    }
    this.AccountingServ.GetSubLedgerByLedger(this.FromLedgerId,
    this.ToLedgerId).subscribe(res => {
      this.SubLedgerAccFromSet = res;
      this.SubLedgerAccToSet = res;
    });
  }
  OnOpenNgSelectDetailAccGroup() {
    if (!this.SelectedFinYear || !this.SelectedRegion || !this.FromSubLedgerId || !this.ToSubLedgerId) {
      return;
    }
    this.AccountingServ.GetDetailAccGroupBySubLedger(this.FromSubLedgerId,
    this.ToSubLedgerId).subscribe(res => {
      this.DetailAccGroupFromSet = res;
      this.DetailAccGroupToSet = res;
    });
  }
  onChangeRegionObj(param) {
    this.SelectedRegion = param;
  }
  onChangeFinYear(param) {
    this.SelectedFinYear = param;
  }
  closeModal() {
    this.DetailAccBookClosed.emit(true);
  }
  onChangeLedgerAcc(event, el) {
    switch (el) {
      case 'From':
        this.FromLedgerId = event;
        this.FromSubLedgerId = null;
        this.ToSubLedgerId = null;
      break;
      case 'To':
        this.ToLedgerId = event;
      break;
      default:
      break;
    }
  }
  onChangeDetailAcc(event, el) {
    switch (el) {
      case 'From':
        this.FromDetailAccID = event;
      break;
      case 'To':
        this.ToDetailAccID = event;
      break;
      default:
      break;
    }
  }
  FetchMoreDetailAcc(event, el) {
    if (!this.FromDetailAccGroupCode || !this.ToDetailAccGroupCode) {
      return;
    }
    const ResultList = [];
    switch (el) {
      case 'From':
        this.DetailAccFromParam.loading = true;
        this.AccountingServ.GetDetailAccByGroup(event.PageNumber, event.PageSize,
          event.term, event.SearchOption, this.FromDetailAccGroupCode, this.ToDetailAccGroupCode, this.SelectedRegion).subscribe(res => {
          event.CurrentItems.forEach(el2 => {
            ResultList.push(el2);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          this.DetailAccFromSet = ResultList;
        });
        this.DetailAccFromParam.loading = false;
        break;
        case 'To':
          this.DetailAccToParam.loading = true;
          this.AccountingServ.GetDetailAccByGroup(event.PageNumber, event.PageSize,
            event.term, event.SearchOption, this.FromDetailAccGroupCode, this.ToDetailAccGroupCode,this.SelectedRegion).subscribe(res => {
            event.CurrentItems.forEach(el2 => {
              ResultList.push(el2);
            });
            res.List.forEach(element => {
              ResultList.push(element);
            });
            this.DetailAccToSet = ResultList;
          });
          this.DetailAccToParam.loading = false;
          break;
        default:
          break;
    }
  }
  SearchDetailAcc(event, el) {
    if (!this.FromDetailAccGroupCode || !this.ToDetailAccGroupCode) {
      return;
    }
    switch (el) {
      case 'From':
        this.currentFromDetailAccSearchTerm = event.term;
        this.DetailAccFromParam.loading = true;
        if (event.SearchOption === 'null' || event.SearchOption == null) {
          event.SearchOption = 'DetailAccCode';
        }
        this.AccountingServ.GetDetailAccByGroup(event.PageNumber, event.PageSize, event.term,
          event.SearchOption, this.FromDetailAccGroupCode, this.ToDetailAccGroupCode,this.SelectedRegion).subscribe((res: any) => {
            if (this.currentFromDetailAccSearchTerm === event.term) {
              this.DetailAccFromSet = res.List;
              this.DetailAccFromTotalItems = res.TotalItemCount;
              this.DetailAccFromPageCount = Math.ceil(res.TotalItemCount / 30);
              this.DetailAccFromParam.loading = false;
            }
          });
        break;
        case 'To':
        this.currentToDetailAccSearchTerm = event.term;
        this.DetailAccToParam.loading = true;
        if (event.SearchOption === 'null' || event.SearchOption == null) {
          event.SearchOption = 'DetailAccCode';
        }
        this.AccountingServ.GetDetailAccByGroup(event.PageNumber, event.PageSize, event.term,
          event.SearchOption, this.FromDetailAccGroupCode, this.ToDetailAccGroupCode, this.SelectedRegion).subscribe((res: any) => {
            if (this.currentToDetailAccSearchTerm === event.term) {
              this.DetailAccToSet = res.List;
              this.DetailAccToTotalItems = res.TotalItemCount;
              this.DetailAccToPageCount = Math.ceil(res.TotalItemCount / 30);
              this.DetailAccToParam.loading = false;
            }
          });
          break;
        default:
          break;
    }
  }

  OnOpenNgSelectDetailAcc(el) {
    if (!this.FromDetailAccGroupCode || !this.ToDetailAccGroupCode) {
      return;
    }
    switch (el) {
      case 'From':
        this.DetailAccFromParam.loading = true;
        this.AccountingServ.GetDetailAccByGroup(1, 30, '', '', this.FromDetailAccGroupCode, this.ToDetailAccGroupCode, this.SelectedRegion).
        subscribe(res => {
          this.DetailAccFromSet = res.List;
          this.DetailAccFromTotalItems = res.TotalItemCount;
          this.DetailAccFromPageCount = Math.ceil(res.TotalItemCount / 30);
        });
        this.DetailAccFromParam.loading = false;
      break;
      case 'To':
        this.DetailAccToParam.loading = true;
        this.AccountingServ.GetDetailAccByGroup(1, 30, '', '', this.FromDetailAccGroupCode, this.ToDetailAccGroupCode, this.SelectedRegion).
        subscribe(res => {
          this.DetailAccToSet = res.List;
          this.DetailAccToTotalItems = res.TotalItemCount;
          this.DetailAccToPageCount = Math.ceil(res.TotalItemCount / 30);
        });
        this.DetailAccToParam.loading = false;
      break;
      default:
      break;
    }
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

}
