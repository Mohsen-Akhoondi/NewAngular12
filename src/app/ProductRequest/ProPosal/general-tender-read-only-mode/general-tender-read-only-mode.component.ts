import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
@Component({
  selector: 'app-general-tender-read-only-mode',
  templateUrl: './general-tender-read-only-mode.component.html',
  styleUrls: ['./general-tender-read-only-mode.component.css']
})
export class GeneralTenderReadOnlyModeComponent implements OnInit {
  @ViewChild('IsWin') IsWin: TemplateRef<any>;
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestCostClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ProductRequestCode;
  InquiryNoLableName;
  RegisterLetterDate;
  DocumentLetterNo;
  RegisterLetterNo;
  MinHeightPixel;
  IsDisable = true;
  IsWFDisable = true;
  ProductRequestDate;
  CostFactorID;
  PRCostRowData = [];
  ProductRequestCostColDef;
  PRCostGridApi: any;
  selectedObject: any;
  HaveMaxBtn: boolean;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  SelectedRegionCode;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  ProductRequestObject;
  ProductRequestID: number;
  DeliveryLocation;
  DealTypeCode;
  InquiryCode;
  InquiryDate;
  NewsPaperItems;
  InquiryID;
  NewsPaperParams = {
    bindLabelProp: 'NewsPaperName',
    bindValueProp: 'NewsPaperCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  DeadLineDate;
  Subject;

  NgSelectVSParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'supplier',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  Note: any;
  startLeftPosition: number;
  startTopPosition: number;
  InquiryNo: any;
  ParamObj;
  SelectedProposal: any;
  DepositAmount: any;
  DocumentDeadlineDate: any;
  AdvertisingDate: any;
  isClicked: boolean;
  SelectedAdvertising: any;
  AdvertisingCode: any;
  MainMinwidthPixel: number;
  PrepaymentAmount: any;
  ActorCondition;
  InquiryObject: any;
  PrepaymentAmountLableName: string;
  ModuleViewTypeCode: any;
  gridHeightPxel = 110;
  Tel: any;
  Cell: any;
  Address: any;
  SelectedActorID;
  PersonTypeList: any;
  SelectedPersonTypeCode: number;
  IsSelectedAdvertising = false;
  SumFinalAmount;

  ReviewMethodItems;
  ReviewMethodParams = {
    bindLabelProp: 'ReviewMethodName',
    bindValueProp: 'ReviewMethodCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  constructor(private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private RefreshPersonItems: RefreshServices,
    private Actor: ActorService,
    private Report: ReportService,
    private Automation: AutomationService) {
    this.PersonTypeList = [{ PersonTypeName: 'حقیقی', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقی', PersonTypeCode: 2 }];
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.ProductRequestCostColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'برنده',
        field: 'IsWin',
        width: 50,
        resizable: true,
        editable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsWin
        },
      },
      {
        headerName: 'حقیقی / حقوقی',
        field: 'PersonTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.PersonTypeList,
          bindLabelProp: 'PersonTypeName',
          bindValueProp: 'PersonTypeCode',
          Params: {
            loading: false
          }
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonTypeName;
          } else {
            return '';
          }
        },
        editable: false,
        width: 110,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreSupplerPerson,
          FetchByTerm: this.FetchSupplerPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        editable: false,
        width: 300,
        resizable: true
      },
      {
        headerName: 'تاریخ دریافت اسناد',
        field: 'PersianProposalDate',
        width: 120,
        resizable: true,
        editable: false,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianProposalDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.ag-theme-balham'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'مبلغ پیشنهادی',
        field: 'SumProposalItemPrice',
        HaveThousand: true,
        width: 120,
        resizable: true,
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 120,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'تاریخ نامه',
        field: 'PersianLetterDate',
        width: 100,
        resizable: true,
        editable: false,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianLetterDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.ag-theme-balham'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'تاریخ اعتبار',
        field: 'PersianExpireDate',
        width: 100,
        resizable: true,
        editable: false,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianExpireDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.ag-theme-balham'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'شماره دعوتنامه',
        field: 'InvitationNo',
        width: 120,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'تاریخ دعوتنامه',
        field: 'PersianInvitationDate',
        width: 100,
        resizable: true,
        editable: false,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianInvitationDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.ag-theme-balham'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 378,
        resizable: true,
        editable: false,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.Note;
          } else {
            return '';
          }
        },
      },
    ];
  }
  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.InquiryObject = this.PopupParam.InquiryObject;
    this.Subject = this.ProductRequestObject.Subject;
    this.ProductRequestDate = this.PopupParam.ProductRequestDate;
    this.ProductRequestCode = this.PopupParam.ProductRequestCode;
    this.SelectedRegionCode = this.PopupParam.RegionCode;
    this.CostFactorID = this.PopupParam.CostFactorID;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.SumFinalAmount = this.PopupParam.SumFinalAmount;

    if (this.InquiryObject) {
      this.InquiryID = this.InquiryObject.InquiryID;
      this.DeadLineDate = this.InquiryObject.ShortDeadLineTime;
      this.DocumentDeadlineDate = this.InquiryObject.ShortDocumentDeadline;
      this.AdvertisingDate = this.InquiryObject.ShortAdvertisingDate;
      this.InquiryDate = this.InquiryObject.ShortInquiryDate;
      this.Note = this.InquiryObject.Note;
      this.PRCostRowData = this.InquiryObject.ProposalList;
      this.InquiryNo = this.InquiryObject.InquiryNo;
      this.AdvertisingDate = this.InquiryObject.ShortAdvertisingDate;
      this.ActorCondition = this.InquiryObject.ActorCondition;
      this.DeliveryLocation = this.InquiryObject.DeliveryLocation;
      this.ReviewMethodParams.selectedObject = this.InquiryObject.ReviewMethodCode;
      this.IsDisable = false;
      if (this.InquiryObject.AdvertisingObject) {
        this.SelectedAdvertising = this.InquiryObject.AdvertisingObject;
        this.AdvertisingCode = this.InquiryObject.AdvertisingObject.AdvertisingCode;
        if (this.InquiryObject.AdvertisingObject.AdvertisingCode) {
          this.IsSelectedAdvertising = true;
        }
      }
      const Codes = [];
      this.InquiryObject.NewsPaperList.forEach(item => {
        Codes.push(item.NewsPaperCode);
      });
      this.NewsPaperParams.selectedObject = Codes;

      if (this.InquiryObject.DepositAmount && this.InquiryObject.DepositAmount > 0) {
        this.DepositAmount = this.InquiryObject.DepositAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }

      if (this.InquiryObject.PrepaymentAmount && this.InquiryObject.PrepaymentAmount > 0) {
        this.PrepaymentAmount = this.InquiryObject.PrepaymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }

    forkJoin([
      this.ProductRequest.GetNewsPaperList(),
      this.ProductRequest.ReviewMethodList()
    ]).subscribe(res => {
      this.NewsPaperItems = res[0];
      this.ReviewMethodItems = res[1];
    });

    this.User.GetModulOPByUser(2730).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
            this.HaveSave = true;
            break;

          case 6:
            this.HaveDelete = true;
            break;

          case 16:
            this.HaveUpdate = true;
            break;

          default:
            break;
        }

      });
    });
  }


  onPRCostGridReady(params) {
    this.PRCostGridApi = params.api;
  }

  popupclosed() {

    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.MainMinwidthPixel = null;
  }
  Close() {
    this.ProductRequestCostClosed.emit(true);
  }
  FetchMoreSupplerPerson(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      event.Owner.ProductRequestCostColDef[1].cellEditorParams.Params.loading = true;
      const ResultList = [];
      const promise = new Promise((resolve, reject) => {
        event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
          event.SearchOption, event.Owner.SelectedPersonTypeCode === 1 ?
          true : event.Owner.SelectedPersonTypeCode === 2 ? false : null, false, true).subscribe(res => {
            event.CurrentItems.forEach(el => {
              ResultList.push(el);
            });
            res.List.forEach(element => {
              ResultList.push(element);
            });
            resolve(res.TotalItemCount);
          });
      }).then((TotalItemCount: number) => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: ResultList,
          term: event.term,
          TotalItemCount: TotalItemCount,
          PageCount: Math.ceil(TotalItemCount / 30),
          type: 'supplier'
        });
        // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
      });
    }
  }

  FetchSupplerPersonByTerm(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      event.Owner.ProductRequestCostColDef[1].cellEditorParams.Params.loading = true;
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        event.Owner.SelectedPersonTypeCode === 1 ?
          true : event.Owner.SelectedPersonTypeCode === 2 ? false : null, false, true).subscribe(res => {
            event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
              List: res.List,
              term: event.term,
              TotalItemCount: res.TotalItemCount,
              PageCount: Math.ceil(res.TotalItemCount / 30),
              type: 'supplier'
            });
          });
    }
  }

  OnInquiryDateChange(ADate) {
    this.InquiryDate = ADate.MDate;
  }

  OnDeadLineDateChange(ADate) {
    this.DeadLineDate = ADate.MDate;
  }
  OnDocumentDeadlineDateChange(ADate) {
    this.DocumentDeadlineDate = ADate.MDate;
  }
  OnAdvertisingDateChange(ADate) {
    this.AdvertisingDate = ADate.MDate;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 530;
    this.startTopPosition = 215;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

  RowClick(event) {
    this.SelectedProposal = event.data;

    this.Tel = event.data.TelNo ? event.data.TelNo : null;
    this.Cell = event.data.CellNo ? event.data.CellNo : null;
    this.Address = event.data.PersonAddress ? event.data.PersonAddress : null;
    this.SelectedActorID = event.data.ActorID ? event.data.ActorID : null;
  }

  getDepositAmount(Amount) {
    this.DepositAmount = Amount;
  }

  getPrepaymentAmount(Amount) {
    this.PrepaymentAmount = Amount;
  }


  onbtnAdvertiseShow() {
    this.type = 'app-advertising',
      this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 108;
    this.startTopPosition = 5;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 645;
    this.ParamObj = {
      // tslint:disable-next-line:max-line-length
      AdvertisingID: this.SelectedAdvertising.AdvertisingID ? this.SelectedAdvertising.AdvertisingID : this.InquiryObject.AdvertisingObject.AdvertisingID,
      HeaderName: 'مشاهده آگهی',
      ModuleCode: 2730,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      ShowOnly: true
    };
  }

  getOutPutParam(event) {
    if (this.type === 'advertising-search') {
      this.SelectedAdvertising = event;
      this.AdvertisingCode = this.SelectedAdvertising.AdvertisingCode;
      this.IsSelectedAdvertising = true;
    }
  }


  onPrintClick() {
    this.Report.GeneralTenderReport(this.ProductRequestObject.CostFactorID, 2730, 'مناقصه عمومی',
      this.SelectedRegionCode, this.InquiryID);
  }

  OnInfoChanged(event, type) {
    switch (type) {
      case 'Tel':
        if (this.SelectedActorID) {
          const itemsToUpdate = [];
          this.PRCostGridApi.forEachNode(node => {
            if (node.data.ActorID === this.SelectedActorID) {
              node.data.TelNo = event;
              itemsToUpdate.push(node.data);
            }
          });
          this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      case 'Cell':
        if (this.SelectedActorID) {
          const itemsToUpdate = [];
          this.PRCostGridApi.forEachNode(node => {
            if (node.data.ActorID === this.SelectedActorID) {
              node.data.CellNo = event;
              itemsToUpdate.push(node.data);
            }
          });
          this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      case 'Address':
        if (this.SelectedActorID) {
          const itemsToUpdate = [];
          this.PRCostGridApi.forEachNode(node => {
            if (node.data.ActorID === this.SelectedActorID) {
              node.data.PersonAddress = event;
              itemsToUpdate.push(node.data);
            }
          });
          this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      default:
        break;
    }
  }
  onPrintClick2() {
    // tslint:disable-next-line:max-line-length
    this.Report.GeneralTenderReport2(this.InquiryID, 2730, 'ارزیابی اسناد پیشنهادی شرکت کنندگان در مناقصه', this.SelectedRegionCode);
  }
}

