import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-deadline-contract-list',
  templateUrl: './deadline-contract-list.component.html',
  styleUrls: ['./deadline-contract-list.component.css']
})
export class DeadlineContractListComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  ReigonListSet = [];
  Date: any;
  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  columnDef;
  rowData = [];
  ModuleCode;
  ProductRequestTypeCode;
  constructor(private router: Router,
    private Region: RegionListService,
    private route: ActivatedRoute,
    private Contract: ContractListService) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 250,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    if (this.InputParam && !isNullOrUndefined(this.InputParam)
      && this.InputParam.ModuleCode) {
      this.ModuleCode = this.InputParam.ModuleCode;
    }
    switch (this.ModuleCode) {
      case 3031:
        this.ProductRequestTypeCode = 1;
        break;
      case 3042:
        this.ProductRequestTypeCode = 3;
        break;
      case 3043:
        this.ProductRequestTypeCode = 4;
        break;
      case 3044:
        this.ProductRequestTypeCode = 5;
        break;
      case 3052:
        this.ProductRequestTypeCode = null;
        break;
      default:
        break;
    } // 64146
    this.Region.GetRegionList(this.ModuleCode, true).subscribe(res => {
      this.ReigonListSet = res;
      this.RegionParams.selectedObject = this.ReigonListSet[0].RegionCode;
    });
    if (this.InputParam && !isNullOrUndefined(this.InputParam)) {
      this.Date = this.InputParam.ShortDate;
      this.RegionParams.selectedObject = this.InputParam.DefaultRegionCode;
      this.OnSearch();
    }
  }
  popupclosed() {
    this.btnclicked = false;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  closeModal() {
    if (this.InputParam && !isNullOrUndefined(this.InputParam)) {
      this.Closed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }
  OnDateChange(ADate) {
    this.Date = ADate.MDate;
    this.rowData = [];
  }
  OnSearch() {
    if (this.RegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
      return;
    }
    if (this.Date === null) {
      this.ShowMessageBoxWithOkBtn('تاريخ انتخاب نشده است');
      return;
    }
    this.Contract.GetDeadlineContractList(this.RegionParams.selectedObject, this.Date, this.ProductRequestTypeCode).subscribe(res => {
      this.rowData = res;
    });
  }
}