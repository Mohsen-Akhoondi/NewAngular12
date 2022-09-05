import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.css']
})
export class InquiryListComponent implements OnInit {
  @ViewChild('IsWin') IsWin: TemplateRef<any>;
  columnDef;
  rowData;
  SelectedInquiry;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  OutPutParam;
  PopUpType: string;
  isClicked: boolean;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  HaveMaxBtn: boolean;
  GridHeader = 'مناقصه';
  ModuleViewTypeCode;
  ShowOnly = false;
  PercentWidth;
  MainMaxwidthPixel;
  ShowBtnConmmition = false;
  ProductRequestObject;
  Subject;
  RegionCode;
  ProductRequestCode;
  ProductRequestDate;
  CostFactorID;
  CheckRegionWritable;
  currentRegionObject;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  IsReturn = false;

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
        headerName: ' شماره ' + this.GridHeader,
        field: 'InquiryNo',
        width: 150,
        resizable: true
      },
      {
        headerName: ' تاریخ ' + this.GridHeader,
        field: 'PersianInquiryDate',
        width: 150,
        resizable: true
      },
      {
        headerName: ' عنوان ' + this.GridHeader,
        field: 'Note',
        width: 250,
        resizable: true
      },
      // {
      //   headerName: 'برنده',
      //   field: 'IsWin',
      //   width: 100,
      //   resizable: true,
      //   cellStyle: function (params) {
      //     return { 'text-align': 'center' };
      //   },
      //   cellEditorFramework: CheckboxFieldEditableComponent,
      //   valueFormatter: function isValidFormer(params) {
      //     if (params.value) {
      //       return 'معتبر';
      //     } else {
      //       return 'نامعتبر';
      //     }
      //   },
      //   cellRendererFramework: TemplateRendererComponent,
      //   cellRendererParams: {
      //     ngTemplate: this.IsWin
      //   },
      // },
    ];
  }
  ngOnInit() {
    if (this.PopupParam.ShowOnly) {
      this.GridHeader = ' ';
      this.ShowOnly = true;
    }
    this.ShowBtnConmmition = true;

    if (this.PopupParam.ModuleViewTypeCode) {
      switch (this.PopupParam.ModuleViewTypeCode) {
        case 29:
        case 30:
        case 35:
        case 43:
        case 64:
        case 133:
        case 82:
          this.GridHeader = ' مزایده ';
          break;
        case 27:
          this.GridHeader = 'حراج';
          break;
        case 23:
        case 24:
        case 83:
          this.GridHeader = ' استعلام قیمت ';
          break;
        case 128: // RFC 54244
          this.GridHeader = 'استعلام بها';
          break;
        default:
          break;
      }
    }

    if (this.PopupParam && this.PopupParam.OriginModuleViewTypeCode) {
      if (this.PopupParam.OriginModuleViewTypeCode === 500000) {
        this.ShowOnly = true;
      }
    }

    this.ProductRequest.GetInquiryList(this.PopupParam.CostFactorID).subscribe((res: any) => {
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
    this.SelectedInquiry = null; // RFC 53805
  }

  onClose() {
    this.Closed.emit(true);
  }

  RowClick(event) {
    this.SelectedInquiry = event.data;
    this.ProductRequest.GetProductRequestForItems(this.SelectedInquiry.CostFactorID).subscribe(res => {
      this.ProductRequestObject = res;
    });
  }

  onShowClick() {
    if (!this.SelectedInquiry) { // RFC 53805
      this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده انتخاب نشده.');
      return;
    }
    const TopPos = this.PopupParam.ModuleViewTypeCode && this.PopupParam.ModuleViewTypeCode === 23 ? 160 : 4;
    this.PopUpType = 'general-tender-read-only';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 115;
    this.startTopPosition = 4;
    this.HaveMaxBtn = false;
    this.MainMaxwidthPixel = 1135;
    this.OutPutParam = {
      ProductRequestObject: this.PopupParam.ProductRequestObject,
      Subject: this.PopupParam.Subject,
      RegionCode: this.PopupParam.RegionCode,
      ProductRequestCode: this.PopupParam.ProductRequestCode,
      ProductRequestDate: this.PopupParam.ProductRequestDate,
      CostFactorID: this.PopupParam.CostFactorID,
      InquiryObject: this.SelectedInquiry,
      IsReadOnly: true,
      HeaderName: 'لیست متقاضیان',
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      PRRegionObject: this.PopupParam.PRRegionObject,
      SumFinalAmount: this.PopupParam.SumFinalAmount,
      CurrWorkFlow: this.PopupParam.CurrWorkFlow,
      IsAdmin: this.PopupParam.IsAdmin
    };
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
  }

  onShowConmmitionClick() {
    if (this.SelectedInquiry) {

      if (this.SelectedInquiry.OrderCommitionObject &&
        this.SelectedInquiry.OrderCommitionObject.OrderCommitionID > 0) {
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          Subject: this.ProductRequestObject.Subject,
          RegionCode: this.ProductRequestObject.RegionCode,
          ProductRequestNo: this.ProductRequestObject.ProductRequestNo,
          ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          IsReadOnly: false,
          HeaderName: 'کمیسیون',
          ModuleViewTypeCode: 100001,
          CheckRegionWritable: this.ProductRequestObject.CheckRegionWritable,
          currentRegionObject: this.ProductRequestObject.currentRegionObject,
          IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
          InquiryObject: this.SelectedInquiry,
          IsAdmin: this.PopupParam.IsAdmin,
          IsInProgressCartable: this.PopupParam.IsInProgressCartable, // 59699
        };
        if (this.PopupParam) {
          this.PopUpType = 'app-commition';
          this.isClicked = true;
          this.HaveHeader = true;
          this.startLeftPosition = 9;
          this.startTopPosition = 33;
          this.MainMaxwidthPixel = 1340;
          this.HaveMaxBtn = false;
        }
      } else {
        this.ShowMessageBoxWithOkBtn('ردیف انتخاب شده فاقد کمیسیون می باشد.');
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا یک رکورد را انتخاب کنید');
    }
  }

  onEditClick() {
    if (!this.SelectedInquiry) { // RFC 53805
      this.ShowMessageBoxWithOkBtn('ردیفی جهت اصلاح انتخاب نشده.');
      return;
    }
    const TopPos = this.PopupParam.ModuleViewTypeCode && this.PopupParam.ModuleViewTypeCode === 23 ? 160 : 60;
    this.PopUpType = 'general-tender';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 150;
    this.startTopPosition = TopPos;
    this.HaveMaxBtn = false;
    this.PercentWidth = 80;
    this.OutPutParam = {
      ProductRequestObject: this.PopupParam.ProductRequestObject,
      Subject: this.PopupParam.Subject,
      RegionCode: this.PopupParam.RegionCode,
      ProductRequestCode: this.PopupParam.ProductRequestCode,
      ProductRequestDate: this.PopupParam.ProductRequestDate,
      CostFactorID: this.PopupParam.CostFactorID,
      InquiryObject: this.SelectedInquiry,
      IsReadOnly: false,
      HeaderName: this.GridHeader,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      PRRegionObject: this.PopupParam.PRRegionObject,
      SumFinalAmount: this.PopupParam.SumFinalAmount,
      CheckRegionWritable: this.PopupParam.CheckRegionWritable,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleCode: this.PopupParam.ModuleCode,
      UserRegionCode: this.PopupParam.UserRegionCode,
      IsAdmin: this.PopupParam.IsAdmin,
      OriginModuleViewTypeCode: this.PopupParam.OriginModuleViewTypeCode
    };
  }

  onAddClick() {

    if (this.rowData && this.rowData.length !== 0 && !this.rowData[this.rowData.length - 1].IsReturn) {
      this.ShowMessageBoxWithOkBtn(' آخرین ' + this.GridHeader + ' تجدید نشده است .امکان ایجاد وجود ندارد ');
      return;
    }

    const TopPos = this.PopupParam.ModuleViewTypeCode && this.PopupParam.ModuleViewTypeCode === 23 ? 160 : 50;
    this.PopUpType = 'general-tender';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 150;
    this.startTopPosition = TopPos;
    this.PercentWidth = 80;
    this.HaveMaxBtn = false;
    this.OutPutParam = {
      ProductRequestObject: this.PopupParam.ProductRequestObject,
      Subject: this.PopupParam.Subject,
      RegionCode: this.PopupParam.RegionCode,
      ProductRequestCode: this.PopupParam.ProductRequestCode,
      ProductRequestDate: this.PopupParam.ProductRequestDate,
      CostFactorID: this.PopupParam.CostFactorID,
      InquiryObject: null,
      IsReadOnly: false,
      HeaderName: this.GridHeader,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      PRRegionObject: this.PopupParam.PRRegionObject,
      SumFinalAmount: this.PopupParam.SumFinalAmount,
      CheckRegionWritable: this.PopupParam.CheckRegionWritable,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleCode: this.PopupParam.ModuleCode,
      UserRegionCode: this.PopupParam.UserRegionCode,
      IsAdmin: this.PopupParam.IsAdmin
    };
  }

}
