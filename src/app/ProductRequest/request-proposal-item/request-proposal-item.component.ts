import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
@Component({
  selector: 'app-request-proposal-item',
  templateUrl: './request-proposal-item.component.html',
  styleUrls: ['./request-proposal-item.component.css']
})
export class RequestProposalItemComponent implements OnInit {
  @ViewChild('IsWin') IsWin: TemplateRef<any>;
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestCostClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ProductRequestCode;
  ProductRequestDate;
  CostFactorID;
  PRCostRowData = [];
  ProductRequestCostColDef;
  PRCostGridApi: any;
  selectedObject: any;
  HaveMaxBtn: boolean;
  isClicked: boolean;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  SelectedRegionCode;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  ProductRequestObject;
  ProductRequestID: number;


  DealTypeCode;
  InquiryCode;
  InquiryDate;
  InquiryTypeItems;
  InquiryTypeParams = {
    bindLabelProp: 'InquiryTypeName',
    bindValueProp: 'InquiryTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  DeadLineDate;
  ArticleItems;
  ArticleParams = {
    bindLabelProp: 'Article31Name',
    bindValueProp: 'Article31ID',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  Subject;

  NgSelectVSParams = {
    bindLabelProp: 'PersonName',
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
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'PersonName', width: 53, MinTermLenght: 3, SearchOption: 'PersonName' }],
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
  ProductRequestItemID = -1;
  OrdersObject: any;
  InquiryNo: any;
  ParamObj;
  SelectedProposal: any;
  constructor(private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private RefreshPersonItems: RefreshServices,
    private Actor: ActorService) {
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
        width: 100,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        editable: true,
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
            return params.value.PersonName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'تاریخ پیشنهاد',
        field: 'PersianProposalDate',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianProposalDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
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
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 120,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'تاریخ نامه',
        field: 'PersianLetterDate',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianLetterDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
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
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianExpireDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
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
        editable: true,
      },
    ];
  }
  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    // tslint:disable-next-line:max-line-length
    this.ProductRequestItemID = this.ProductRequestObject.ProductRequestItemList && this.ProductRequestObject.ProductRequestItemList.length > 0 ? this.ProductRequestObject.ProductRequestItemList[0].ProductRequestItemID : -1;
    this.PRCostRowData = this.ProductRequestObject.RequestCostList;
    this.Subject = this.ProductRequestObject.Subject;
    this.ProductRequestDate = this.PopupParam.ProductRequestDate;
    this.ProductRequestCode = this.PopupParam.ProductRequestCode;
    this.SelectedRegionCode = this.PopupParam.RegionCode;
    this.CostFactorID = this.PopupParam.CostFactorID;
    forkJoin([
      this.ProductRequest.GetArticle31List(this.ProductRequestObject.RegionCode),
      this.ProductRequest.GetInquiryTypeList(),
      this.ProductRequest.GetOrdersWithProductRequest(this.ProductRequestItemID)
    ]).subscribe(res => {
      this.ArticleItems = res[0];
      this.InquiryTypeItems = res[1];

      if (res[2]) {
        this.OrdersObject = res[2];
        this.DeadLineDate = this.OrdersObject.InquiryObject.ShortDeadLineTime;
        this.InquiryDate = this.OrdersObject.InquiryObject.ShortInquiryDate;
        this.Note = this.OrdersObject.InquiryObject.Note;
        this.InquiryTypeParams.selectedObject = this.OrdersObject.InquiryObject.InquiryTypeCode;
        this.ArticleParams.selectedObject = this.OrdersObject.InquiryObject.ArticleID;
        this.PRCostRowData = this.OrdersObject.InquiryObject.ProposalList;
        this.InquiryNo = this.OrdersObject.InquiryObject.InquiryNo;
      }

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

  onPRCostCellValueChanged(event) {
    let itemsToUpdate = [];
    if (event.newValue && event.columnDefPriceList &&
      event.columnDefPriceList.field === 'IsWin') {
      itemsToUpdate = [];
      this.PRCostGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.IsWin = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.isClicked = false;
  }
  Close() {
    this.btnclicked = false;
    this.ProductRequestCostClosed.emit(true);
  }
  onSave() {
    const Inquery = {
      InquiryID: -1,
      CostFactorID: -1,
      InquiryNo: -1,
      InquiryDate: this.InquiryDate,
      InquiryTypeCode: this.InquiryTypeParams.selectedObject,
      DeadLineTime: this.DeadLineDate,
      ArticleID: this.ArticleParams.selectedObject,
      Note: this.Note,
    };


    let ItemNo = 0;
    const ProposalList = [];
    this.PRCostGridApi.forEachNode(node => {
      const Proposal = {
        ProposalID: node.data.ProposalID ? node.data.ProposalID : -1,
        InquiryID: node.data.InquiryID ? node.data.InquiryID : -1,
        ItemNo: ++ItemNo,
        // tslint:disable-next-line:max-line-length
        ActorID: node.data.ActorName && node.data.ActorName.ActorId ? node.data.ActorName.ActorId : (node.data.ActorID ? node.data.ActorID : -1),
        IsWin: node.data.IsWin ? true : false,
        // tslint:disable-next-line:max-line-length
        ProposalDate: node.data.PersianProposalDate && node.data.PersianProposalDate.MDate ? node.data.PersianProposalDate.MDate : (node.data.ShortProposalDate ? node.data.ShortProposalDate : null),
        LetterNo: node.data.LetterNo,
        // tslint:disable-next-line:max-line-length
        LetterDate: node.data.PersianLetterDate && node.data.PersianLetterDate.MDate ? node.data.PersianLetterDate.MDate : (node.data.ShortLetterDate ? node.data.ShortLetterDate : null),
        // tslint:disable-next-line:max-line-length
        ExpireDate: node.data.PersianExpireDate && node.data.PersianExpireDate.MDate ? node.data.PersianExpireDate.MDate : (node.data.ShortExpireDate ? node.data.ShortExpireDate : null),
        Note: node.data.Note,
      };
      ProposalList.push(Proposal);
    });

    this.ProductRequest.SaveInquiry(this.ProductRequestObject.CostFactorID,
      Inquery,
      ProposalList)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ngOnInit();
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
        });
  }
  FetchMoreSupplerPerson(event) {
    event.Owner.ProductRequestCostColDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
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
        PageCount: Math.ceil(TotalItemCount / 30)
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchSupplerPersonByTerm(event) {
    event.Owner.ProductRequestCostColDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30)
      });
    });
  }

  onSupplercellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Actor.GetPersonPaging(1, 30, '', null).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
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

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  onPropsalItemClick() {
    if (!this.SelectedProposal) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب نشده است');
      return;
    }

    if (!this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }


    if (this.ProductRequestObject.ContractTypeCode === 26 || this.ProductRequestObject.ContractTypeCode === 29) {
      this.type = 'proposal-person-estimate';
    } else if (this.ProductRequestObject.ContractTypeCode === 27 || this.ProductRequestObject.ContractTypeCode === 28) {
      this.type = 'proposal-person-estimate';
    } else {
      this.type = 'proposal-item-estimate';
    }

    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 110;
    this.startTopPosition = 20;
    this.HaveMaxBtn = true;
    this.ParamObj = {
      Proposal: this.SelectedProposal,
      ProductRequestObject: this.ProductRequestObject,
      ContractTypeCode: this.ProductRequestObject.ContractTypeCode
    };
  }
  RowClick(event) {
    this.SelectedProposal = event.data;
  }

}
