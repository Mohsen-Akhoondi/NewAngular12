import { Component, OnInit, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CustomerOrderService } from 'src/app/Services/CRM/CustomerOrderService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
@Component({
  selector: 'app-customer-order-search',
  templateUrl: './customer-order-search.component.html',
  styleUrls: ['./customer-order-search.component.css']
})
export class CustomerOrderSearchComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ModuleCode;
  @ViewChild('HasWorkFlow') HasWorkFlow: TemplateRef<any>;
  @ViewChild('RequestRevoction') RequestRevoction: TemplateRef<any>;
  @ViewChild('OrderRevoction') OrderRevoction: TemplateRef<any>;
  ProductRequestList = [];
  FromRequestPageCount;
  FromRequestTotalItemCount;
  ToRequestPageCount;
  ToRequestTotalItemCount;
  currentRequestSearchTerm;
  WorkFlowDisable = false;
  HaveMaxBtn = false;
  MinHeightPixel: number;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: number;
  paramObj;
  PersonReqItems: any;
  selectedRow: any;
  rowData = [];
  AgridApi: any;
  BtnClickedName: string;
  FromOrderRequestCode: number;
  ToOrderRequestCode: number;
  FromOrderRequestDate;
  ToOrderRequestDate;
  CustomerID: number;
  columnDef;
  type: string;
  HaveHeader: boolean;
  btnclicked = false;
  startLeftPosition: number;
  startTopPosition: number;
  private sub: any;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };

  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestNo',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '350px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-from-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 30, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'موضوع', CanGrow: true, HeaderName: 'Subject', width: 35, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 30, },
        { HeaderCaption: 'موضوع', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  ToRequestItems = [];
  ToRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestNo',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-to-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectPersonReqParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'user-person-Req-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  ContractorType = true;
  btnViewOrder = ' اصلاح سفارش مشتری';
  btnReqViewOrder = 'اصلاح ریز درخواست';
  ToProductRequestNO: any;
  FromProductRequestNO: any;
  FromCostFactorID: any;
  ToCostFactorID: any;
  IsCustomer: boolean = false;
  IsDeleted: boolean = false;
  constructor(private ActorList: ActorService,
    private RefreshPersonItems: RefreshServices,
    private CustomerOrder: CustomerOrderService,
    private ProductRequest: ProductRequestService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

  }

  ngOnInit() {
    this.ModuleCode === 3017 ? this.btnViewOrder = 'مشاهده سفارش مشتری' : this.btnViewOrder = 'اصلاح سفارش مشتری';
    this.ModuleCode === 3017 ? this.btnReqViewOrder = 'مشاهده ریز درخواست' : this.btnReqViewOrder = 'اصلاح ریز درخواست';
  }
  FillcolumnDef(IsPartial) {
    if (IsPartial) {
      this.columnDef = [
        {
          headerName: ' اطلاعات سفارش',
          children: [
            {
              headerName: 'ردیف ',
              field: 'ItemNo',
              width: 50,
              resizable: true
            },
            {
              headerName: 'نام مشتری',
              field: 'FullCustomerName',
              width: 250,
              resizable: true
            },
            {
              headerName: 'شماره سفارش مشتری',
              field: 'CustomerOrderCode',
              width: 150,
              resizable: true
            },
            {
              headerName: ' تاریخ سفارش ',
              field: 'PersianCustomerOrderDate',
              width: 100,
              resizable: true
            },

            {
              headerName: ' موضوع ',
              field: 'Subject',
              width: 600,
              resizable: true
            },
            {
              headerName: 'ابطال سفارش',
              field: '',
              width: 100,
              sortable: false,
              resizable: false,
              hide: this.ModuleCode === 3017,
              cellStyle: function (params) {
                return { 'text-align': 'center' };
              },
              cellRendererFramework: TemplateRendererComponent,
              cellRendererParams: {
                ngTemplate: this.OrderRevoction,
              }
            },
          ]
        },
        {
          headerName: 'اطلاعات ریز درخواست',
          children: [
            {
              headerName: 'شماره درخواست',
              field: 'ProductRequestNo',
              width: 150,
              resizable: true
            },
            {
              headerName: 'تاریخ درخواست',
              field: 'PersianProductRequestDates',
              width: 100,
              resizable: true
            },
            {
              headerName: 'وضعیت گردش درخواست',
              field: 'HasWorkFlow',
              width: 150,
              cellEditorFramework: CheckboxFieldEditableComponent,
              cellEditorParams: { MaxLength: 3 },
              cellRendererFramework: TemplateRendererComponent,
              cellRendererParams: {
                ngTemplate: this.HasWorkFlow
              },
              cellStyle: function (params) {
                return { 'text-align': 'center' };
              },
              valueSetter: (params) => {
                if (params.newValue) {
                  params.data.HasWorkFlow = true;
                  return true;
                } else {
                  params.data.HasWorkFlow = false;
                  return false;
                }
              },
              resizable: true,
              editable: false
            },
            {
              headerName: 'ابطال درخواست',
              field: '',
              width: 100,
              sortable: false,
              resizable: false,
              hide: this.ModuleCode === 3017,
              cellStyle: function (params) {
                return { 'text-align': 'center' };
              },
              cellRendererFramework: TemplateRendererComponent,
              cellRendererParams: {
                ngTemplate: this.RequestRevoction,
              }
            },
          ]
        },

      ];
    }
    else {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'نام مشتری',
          field: 'FullCustomerName',
          width: 250,
          resizable: true
        },
        {
          headerName: 'شماره سفارش مشتری',
          field: 'CustomerOrderCode',
          width: 150,
          resizable: true
        },
        {
          headerName: ' تاریخ سفارش ',
          field: 'PersianCustomerOrderDate',
          width: 100,
          resizable: true
        },
        {
          headerName: ' موضوع ',
          field: 'Subject',
          width: 500,
          resizable: true
        },
        {
          headerName: 'وضعیت گردش',
          field: 'HasWorkFlow',
          width: 100,
          cellEditorFramework: CheckboxFieldEditableComponent,
          cellEditorParams: { MaxLength: 3 },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.HasWorkFlow
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.HasWorkFlow = true;
              return true;
            } else {
              params.data.HasWorkFlow = false;
              return false;
            }
          },
          resizable: true,
          editable: false
        },
        {
          headerName: 'ابطال سفارش',
          field: '',
          width: 100,
          sortable: false,
          resizable: false,
          hide: this.ModuleCode === 3017,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.OrderRevoction,
          }
        },
      ];
    }

  }
  ngAfterViewInit(): void {

    this.FillcolumnDef(false);

  }

  OnFromOrderRequestDateChange(ADate) {
    this.FromOrderRequestDate = ADate.MDate;
  }
  OnToOrderRequestDateChange(ADate) {
    this.ToOrderRequestDate = ADate.MDate;
  }

  OnFromOrderRequestCodeChange(ADate) {
    this.FromOrderRequestCode = ADate.MDate;
  }
  OnToOrderRequestCodeChange(ADate) {
    this.ToOrderRequestCode = ADate.MDate;
  }

  PersonReq_FetchMore(event) {
    this.NgSelectPersonReqParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.ActorList.GetActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        this.ContractorType,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonReqItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonReqItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }

  PersonReqOpened(ActorID = null) {
    this.ActorList.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false, ActorID).subscribe(res => {
      this.PersonReqItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }

  Person_Req_DoSearch(event) {
    this.NgSelectPersonReqParams.loading = true;
    this.ActorList.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        this.PersonReqItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-Req-search'
          });
      });
    this.NgSelectPersonReqParams.loading = false;
  }
  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  RowClick(InputValue) {
    this.WorkFlowDisable = false;
    this.selectedRow = InputValue.data;
    if (!InputValue.data.WorkFlowInstanceID) {
      this.WorkFlowDisable = true;
    }
  }

  Search() {
    this.IsCustomer = true;
    this.FillcolumnDef(false);
    this.DoSearch();
    this.CustomerOrder.GetCustomerOrders(
      this.FromOrderRequestCode,
      this.ToOrderRequestCode,
      this.FromOrderRequestDate,
      this.ToOrderRequestDate,
      this.CustomerID).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'رکوردی جهت نمایش یافت نشد';
          this.btnclicked = true;
          this.startLeftPosition = 500;
          this.startTopPosition = 100;
        }
      });
  }

  partialSearch() {
    this.IsCustomer = false;
    this.FillcolumnDef(true);
    this.DoSearch();

    this.CustomerOrder.GetPartialCustomerOrders(
      this.FromOrderRequestCode,
      this.ToOrderRequestCode,
      this.FromOrderRequestDate,
      this.ToOrderRequestDate,
      this.FromCostFactorID,
      this.ToCostFactorID,
      this.CustomerID).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'رکوردی جهت نمایش یافت نشد';
          this.btnclicked = true;
          this.startLeftPosition = 500;
          this.startTopPosition = 100;
        }
      });
  }
  DoSearch() {
    this.CustomerID = this.NgSelectPersonReqParams.selectedObject;
    if (!this.ToOrderRequestCode && this.FromOrderRequestCode) {
      this.ToOrderRequestCode = this.FromOrderRequestCode;
    }

    if (!this.FromOrderRequestCode && this.ToOrderRequestCode) {
      this.FromOrderRequestCode = this.ToOrderRequestCode;
    }

    if (!this.ToCostFactorID && this.FromCostFactorID) {
      this.ToCostFactorID = this.FromCostFactorID;
    }

    if (!this.FromCostFactorID && this.ToCostFactorID) {
      this.FromCostFactorID = this.ToCostFactorID;
    }

    if (!this.ToOrderRequestDate && this.FromOrderRequestDate) {
      this.ToOrderRequestDate = this.FromOrderRequestDate;
    }

    if (!this.FromOrderRequestDate && this.ToOrderRequestDate) {
      this.FromOrderRequestDate = this.ToOrderRequestDate;
    }
  }

  Updateclick() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'سفارشی جهت مشاهده انتخاب نشده است';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      this.MinHeightPixel = null;
      return;
    }
    else {
      this.type = 'customer-order';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 66;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        CustomerOrderID: this.selectedRow.CustomerOrderID,
        Mode: 'EditMode',
        BTNs: true,
        ModuleViewTypeCode: 5000,
        WorkFlowInstanceId: this.selectedRow.WorkFlowInstanceID,
      };
      return;
    }
  }

  ReqUpdateclick() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'درخواستی جهت مشاهده انتخاب نشده است';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      this.MinHeightPixel = null;
      return;
    }
    else {
      this.type = 'customer-product-request-page';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 66;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        CustomerOrderID: this.selectedRow.CustomerOrderID,
        Mode: 'EditMode',
        BTNs: true,
        ModuleViewTypeCode: 5000,
        WorkFlowInstanceId: this.selectedRow.WorkFlowInstanceID,
        ProductRequestNo: this.selectedRow.ProductRequestNo,
        CostFactorID: this.selectedRow.CostFactorID,
        Subject: this.selectedRow.Subject,
      };
      return;
    }
  }

  popupclosed() {
    this.HaveMaxBtn = false;
    this.btnclicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.type = '';
    this.HeightPercentWithMaxBtn = 95;
    if (this.IsDeleted && this.IsCustomer) {
      this.CustomerOrder.GetCustomerOrders(
        this.FromOrderRequestCode,
        this.ToOrderRequestCode,
        this.FromOrderRequestDate,
        this.ToOrderRequestDate,
        this.CustomerID).subscribe(res => {
          if (res && res.length > 0) {
            this.rowData = res;
          } else {
            this.rowData = []
          }
        });

    }
    if (this.IsDeleted && !this.IsCustomer) {
      this.CustomerOrder.GetPartialCustomerOrders(
        this.FromOrderRequestCode,
        this.ToOrderRequestCode,
        this.FromOrderRequestDate,
        this.ToOrderRequestDate,
        this.FromCostFactorID,
        this.ToCostFactorID,
        this.CustomerID).subscribe(res => {
          if (res && res.length > 0) {
            this.rowData = res;
          } else {
            this.rowData = []
          }
        });

    }
  }
  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    if (this.IsCustomer) {
      this.ShowMessageBoxWithYesNoBtn('آیا از حذف سفارش مطمئن هستید؟');
    }
    else {
      this.ShowMessageBoxWithYesNoBtn('آیا از حذف درخواست مطمئن هستید؟');
    }
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 550;
    this.startTopPosition = 182;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {

    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
     
    }
    else if (this.BtnClickedName === 'BtnReqRevoke' && ActionResult === 'YES') {
      this.RevokeProductRequest(this.selectedRow.CostFactorID);
    }
    else if (this.BtnClickedName === 'BtnOrdRevoke' && ActionResult === 'YES') {
      this.RevokeCustomerOrder(this.selectedRow.CustomerOrderID);
    }
    else {
      this.Closed.emit(true);
    }

    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
  DoDelete() {
    if (this.IsCustomer) {
      this.CustomerOrder.DeleteCustomerOrder(this.selectedRow.CustomerOrderID, this.ModuleCode).subscribe(
        res => {
          if (res === true) {
            this.CustomerOrder.GetCustomerOrders(
              this.FromOrderRequestCode,
              this.ToOrderRequestCode,
              this.FromOrderRequestDate,
              this.ToOrderRequestDate,
              this.CustomerID).subscribe(res1 => { this.rowData = res1 });
            this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
            this.IsDeleted = true;
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
    }
    if (!this.IsCustomer) {
      // if (this.selectedRow.HasWorkFlow) {
      //   this.ShowMessageBoxWithOkBtn('درخواست مورد نظر دارای گردش است،امکان حذف وجود ندارد.');

      // }
      // else {
        this.ProductRequest.DeleteProductRequest(this.selectedRow.CostFactorID, this.ModuleCode).subscribe(
          res => {
            this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
            this.IsDeleted = true;
          });
      // }
    }

  }

  RevokeProductRequest(ObjectID) {

    this.ProductRequest.RevokeProductRequest(ObjectID,
      this.ModuleCode).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('درخواست با موفقیت ابطال شد');
      });

  }
  RevokeCustomerOrder(ObjectID) {
    this.CustomerOrder.RevokeCustomerOrder(ObjectID,
      this.ModuleCode).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('سفارش با موفقیت ابطال شد');
      });
    if (this.ProductRequestList.length != 0) {
      this.ProductRequestList.forEach(element => {
        this.ProductRequest.RevokeProductRequest(element.CostFactorID, this.ModuleCode).subscribe(res => {
        });
      });
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;

  }


  // close() {

  //   this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  // }
  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.NgSelectPersonReqParams.selectedObject = null;
    if (this.ContractorType) {
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
    } else {
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
    }
  }

  BtnVeiwclick() {
    this.btnclicked = true;
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
      this.startLeftPosition = 175;
      this.startTopPosition = 250;
    }
    else {
      this.type = 'user-work-log-details';
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      // this.OverPixelWidth = 1290;
      this.startLeftPosition = 40;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 640;

      this.paramObj = {
        HeaderName: 'جزئیات گردش',
        LetterNo: this.selectedRow.CustomerOrderCode,
        // Subject: this.selectedRow.data.Subject,
        FinYearCode: this.selectedRow.CustomerOrderCode,
        ContractNo: this.selectedRow.CustomerOrderCode,
        OrderNo: this.selectedRow.CustomerOrderCode,
        ContractCode: this.selectedRow.CustomerOrderCode,
        ContractId: this.selectedRow.CustomerOrderID,
        ContractorName: this.selectedRow.FullCustomerName,
        ContractTypeName: this.selectedRow.ContractTypeName,
        ContractAmount: 0,
        LetterDatePersian: this.selectedRow.PersianCustomerOrderDate,
        OrderDate: this.selectedRow.PersianCustomerOrderDate,
        // workflowtypeStatus: this.WorkflowObjectCode[0],
        WorkFlowInstanceId: this.selectedRow.WorkFlowInstanceID,
        ParentModuleCode: this.ModuleCode,
        ProductRequestCode: this.selectedRow.CustomerOrderCode,
        PersianProductRequestDate: this.selectedRow.PersianCustomerOrderDate,
        Subject: this.selectedRow.Subject,
        CostFactorID: this.selectedRow.CustomerOrderID,
        ProductRequestID: this.selectedRow.CustomerOrderID
      };
    }
  }

  OnOpenNgSelect(type) {
    switch (type) {
      case 'FromRequest':
        this.FromRequestParams.loading = true;
        this.ProductRequest.GetCRMProductRequestPaging(1, 30, '',
          '', 200).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
              }
            });
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          });
        break;
      case 'ToRequest':
        this.ToRequestItems = [];
        this.ToRequestParams.loading = true;
        this.ProductRequest.GetCRMProductRequestPaging(1, 30, '',
          '', 200).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
              }
            });
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          });
        break;
      default:
        break;
    }
  }



  FetchMoreRequest(event, type) {
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    const ResultList = [];
    this.ProductRequest.GetCRMProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, 200).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          if (element.ProductRequestNo) {
            element.ProductRequestCodeSub = element.ProductRequestNo;
          }
          if (element.search) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
          }
          if (element.ProductRequestCode) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
          }
          ResultList.push(element);
        });
        if (type === 'From') {
          this.FromRequestItems = ResultList;
          this.FromRequestParams.loading = false;
        } else {
          this.ToRequestItems = ResultList;
          this.ToRequestParams.loading = false;
        }
      });
  }

  doRequestSearch(event, type) {
    this.currentRequestSearchTerm = event.term;
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ProductRequestNo';
    }
    this.ProductRequest.GetCRMProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, 200).subscribe((res: any) => {
        if (this.currentRequestSearchTerm === event.term) {
          res.List.forEach(element => {
            if (element.ProductRequestNo) {
              element.ProductRequestCodeSub = element.ProductRequestNo;
            }
            if (element.search) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
            }
            if (element.ProductRequestCode) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
            }
          });
          if (type === 'From') {
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          } else {
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          }
        }
      });
  }

  onChangeNgSelect(event, type) {
    switch (type) {
      case 'FromRequest':
        this.FromCostFactorID = this.FromRequestParams.selectedObject;
        break;
      case 'To':
        this.ToCostFactorID = this.ToRequestParams.selectedObject;
        break;
      default:
        break;
    }
  }

  onClickRequestRevoke(row) { 
    if (row == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انتخاب نمایید');
    } else {
      this.BtnClickedName = 'BtnReqRevoke';
      this.ShowMessageBoxWithYesNoBtn('آیا مایل به ابطال درخواست انتخاب شده می باشید؟');
    }
  }

  onClickOrderRevoke(row) {
    if (row == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انتخاب نمایید');
    } else {

      this.CustomerOrder.GetProductRequestByCustomer(row.CustomerOrderID).subscribe(res => {
        this.ProductRequestList = res;

      });
      if (this.ProductRequestList.length == 0) {
        this.BtnClickedName = 'BtnOrdRevoke';
        this.ShowMessageBoxWithYesNoBtn('آیا مایل به ابطال سفارش انتخاب شده می باشید؟');
      }
      else {
        this.BtnClickedName = 'BtnOrdRevoke';
        this.ShowMessageBoxWithYesNoBtn('این سفارش دارای ریزدرخواست است،آیا از ابطال آن اطمینان دارید؟');


      }

    }
  }
  getOutPutParam(event){}

}
