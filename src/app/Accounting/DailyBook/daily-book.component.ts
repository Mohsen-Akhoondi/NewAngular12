import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { AccountingService } from 'src/app/Services/AccountingService/AccountingService';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-daily-book',
  templateUrl: './daily-book.component.html',
  styleUrls: ['./daily-book.component.css']
})
export class DailyBookComponent implements OnInit {
  @Output() DailyBookClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  gridcoldef;
  DailyBookRepRows: any;
  BoxDevHeight = 84;
  ModuleCode;
  constructor(private RegionService: RegionListService,
              private Finyearserv: FinYearService,
              private AccService: AccountingService,
              private route: ActivatedRoute
              ) {
                this.route.params.subscribe(params => {
                  this.ModuleCode = +params['ModuleCode'];
                });
               }

  ngOnInit() {
    this.DailyBookRepRows = [];
    this.MakeColDef();
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

  OnFromDateChange(param) {
    this.FromDate = param.MDate;
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
    this.DailyBookRepRows = [];
    if (this.SelectedRbVoucherStatus === 1) {
      this.AccService.GetDailyBookRep(this.SelectedRegion, this.SelectedFinYear, this.FromDate, this.ToDate,
        this.VoucherStatusCode, this.FromVoucherCode, this.ToVoucherCode)
       .subscribe(res => {
         this.DailyBookRepRows = res;
       });
    }
    if (this.SelectedRbVoucherStatus === 2) {
      this.AccService.GetMonthlyBookRep (this.SelectedRegion, this.SelectedFinYear, this.FromDate, this.ToDate,
        this.VoucherStatusCode, this.FromVoucherCode, this.ToVoucherCode).subscribe(res => {
          this.DailyBookRepRows = res;
        });
    }

    if (this.SelectedRbVoucherStatus === 3) {

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
        this.cb2Selected = param;
      break;
      case 3:
        this.cb3Selected = param;
      break;
      default:
      break;
    }
  }
  MakeVoucherStatusRadio(): void {
    this.VoucherStatusRadioTypes = [];
    this.VoucherStatusRadioTypes.push(new RadioBoxModel('به روز', 1, false, 'rdoVoucherDate_dailybook'));
    this.VoucherStatusRadioTypes.push(new RadioBoxModel('ماهانه - تجمیعی', 2, false, 'rdoVoucherMonth_dailybook'));
    this.VoucherStatusRadioTypes.push(new RadioBoxModel('ماهانه - خطی', 3, false, 'rdoVoucherMonthLine_dailybook'));
  }
  VoucherStatusRadioClick(param) {
    this.cb1Disabled = false;
    this.cb2Disabled = false;
    this.cb3Disabled = false;
    this.SelectedRbVoucherStatus = param;
    switch (this.SelectedRbVoucherStatus) {
      case 2:
        this.cb1Disabled = true;
        this.cb1Selected = false;
        break;
        case 3:
          this.cb1Selected = false;
          this.cb1Disabled = true;
          this.cb2Selected = false;
          this.cb2Disabled = true;
          this.cb3Selected = false;
          this.cb3Disabled = true;
          break;
    }
  }
  getToVoucherCode(param) {
    if (param) {
      this.ToVoucherCode = param;
    }
  }
  getFromVoucherCode(param) {
    if (param) {
      this.FromVoucherCode = param;
    }
  }
  closeModal() {
    this.DailyBookClosed.emit(true);
  }
  RowClick(event) {

  }
  onGridReady(event) {

  }
  onellEditingStarted(event) {

  }
  MakeColDef() {

    this.gridcoldef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
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
        headerName: 'تاریخ تنظیم سند',
        field: 'VoucherDate',
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        }
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
        headerName: 'موضوع',
        field: 'Subject',
        width: 120,
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
        headerName: 'نام حساب کل ',
        field: 'LedgerAccName',
        width: 120,
        resizable: true,
        editable: false
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
    ];
  }
}
