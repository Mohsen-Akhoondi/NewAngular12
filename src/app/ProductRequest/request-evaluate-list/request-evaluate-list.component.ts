import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-request-evaluate-list',
  templateUrl: './request-evaluate-list.component.html',
  styleUrls: ['./request-evaluate-list.component.css']
})
export class RequestEvaluateListComponent implements OnInit {

  @ViewChild('IsWin') IsWin: TemplateRef<any>;
  columnDef;
  rowData;
  SelectedRequestEvaluate;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  ParamObject;
  PopUpType: string;
  isClicked: boolean;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  HaveMaxBtn: boolean;
  ModuleViewTypeCode;
  ShowOnly = false;
  PercentWidth;
  MainMaxwidthPixel;
  ProductRequestObject;
  Subject;
  RegionCode;
  ProductRequestCode;
  ProductRequestDate;
  CostFactorID;
  CheckRegionWritable;
  currentRegionObject;
  alertMessageParams = { HaveOkBtn: true, message: '',  HaveYesBtn: false, HaveNoBtn: false };
  IsReturn = false;
  BtnClickedName: string;

  constructor(private ProductRequest: ProductRequestService) {

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تاریخ ارزیابی',
        field: 'PersianRequestEvaluateDate',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره ارزیابی',
        field: 'RequestEvaluateNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'عنوان',
        field: 'Note',
        width: 250,
        resizable: true
      },
      {
        headerName: 'نوع ارزیابی',
        field: 'EvaluateTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نحوه ارزیابی',
        field: 'EvaluateMethodName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ ارزیابی',
        field: 'Amount',
        width: 150,
        resizable: true
      },
    ];
  }
  ngOnInit() {
    if (this.PopupParam.ShowOnly) {
      this.ShowOnly = true;
    }

    this.ProductRequest.GetRequestEvaluateList(this.PopupParam.ProductRequestObject.CostFactorID).subscribe((res: any) => {
      this.rowData = res;
      if (this.rowData && this.rowData.length !== 0 && this.rowData[this.rowData.length - 1].IsReturn) {
        this.IsReturn = this.rowData[this.rowData.length - 1].IsReturn;
      }
    });
  }
  popupclosed(event) {
    this.PopUpType = '';
    this.isClicked = false;
    this.ngOnInit();
    this.SelectedRequestEvaluate = null;
  }

  onClose() {
    this.Closed.emit(true);
  }

  RowClick(event) {
    this.SelectedRequestEvaluate = event.data;

    this.ProductRequest.GetProductRequestForItems(this.SelectedRequestEvaluate.CostFactorID).subscribe(res => {
      this.ProductRequestObject = res;
    });
  }

  onShowClick() {
    if (!this.SelectedRequestEvaluate) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت اصلاح انتخاب نشده.');
      return;
    }
    this.PopUpType = 'request-evaluate';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 130;
    this.startTopPosition = 10;
    this.ParamObject = {
      RequestEvaluateID: this.SelectedRequestEvaluate.RequestEvaluateID,
      ProductRequestObject: this.PopupParam.ProductRequestObject,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      ModuleCode: this.PopupParam.ModuleCode,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      IsReadOnly: true
    };
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 500;
    this.startTopPosition = 230;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 500;
    this.startTopPosition = 230;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  onEditClick() {
    if (!this.SelectedRequestEvaluate) { // RFC 53805
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت اصلاح انتخاب نشده است.');
      return;
    }

    this.PopUpType = 'request-evaluate';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 130;
    this.startTopPosition = 10;
    this.ParamObject = {
      RequestEvaluateID: this.SelectedRequestEvaluate.RequestEvaluateID,
      ProductRequestObject: this.PopupParam.ProductRequestObject,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      ModuleCode: this.PopupParam.ModuleCode,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
    };
  }

  onAddClick() {

    if (this.rowData && this.rowData.length !== 0 && !this.rowData[this.rowData.length - 1].IsReturn) {
      this.ShowMessageBoxWithOkBtn('آخرین ارزیابی تجدید نشده است .امکان ایجاد ارزیابی جدید وجود ندارد');
      return;
    }

    this.PopUpType = 'request-evaluate';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 124;
    this.startTopPosition = 20;
    this.ParamObject = {
      RequestEvaluateID: -1 ,
      ProductRequestObject: this.PopupParam.ProductRequestObject,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      ModuleCode: this.PopupParam.ModuleCode,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,

    };
  }
  onDeleteclick() {
    if (this.SelectedRequestEvaluate == null) {
      this.PopUpType = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ردیفی جهت حذف انتخاب نشده است';
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }

    this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
    this.BtnClickedName = 'BtnDelete';
  }
  DoDelete() {
    this.ProductRequest.DeleteRequestEvaluate(this.SelectedRequestEvaluate.RequestEvaluateID,
       this.PopupParam.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.rowData =  this.ProductRequest.GetRequestEvaluateList(this.PopupParam.ProductRequestObject.CostFactorID);
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      });
  }

  getOutPutParam(event) {
    if (event && this.PopUpType === 'request-evaluate-list') {
      this.rowData = this.ProductRequest.GetRequestEvaluateList(this.SelectedRequestEvaluate.CostFactorID);
    }
  }
  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } else {
      this.ngOnInit();
    }
    this.PopUpType = '';
    this.BtnClickedName = '';
    this.isClicked = false;
  }
}
