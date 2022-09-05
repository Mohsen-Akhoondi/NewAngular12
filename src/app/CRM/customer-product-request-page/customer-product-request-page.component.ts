import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomerOrderService } from 'src/app/Services/CRM/CustomerOrderService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { OverPopUpCellEditorComponent } from 'src/app/Shared/OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-customer-product-request-page',
  templateUrl: './customer-product-request-page.component.html',
  styleUrls: ['./customer-product-request-page.component.css']
})
export class CustomerProductRequestPageComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('CostumerOrderBtn') CostumerOrderBtn: TemplateRef<any>;
  @ViewChild('UploadArchive4') UploadArchive4: TemplateRef<any>;
  ProductRequestObject;
  HaveRevocation = false;
  MoreThanRemain: boolean = false;
  PercentWidth: number;
  gridApiFastMenu: any;
  selectedrow: any;
  ProductRequestDate;
  PersianProductRequestDate;
  DeadLineDate;
  columnDef;
  PopupParam;
  HeightPercentWithMaxBtn = 95;
  ModuleCode;
  OrginalModuleCode;
  startLeftPosition;
  startTopPosition;
  MainMaxwidthPixel = null;
  MinHeightPixel = null;
  gridApi: any;
  rowsData: any = [];
  IsEditable = true;
  gridHeight = 77;
  PRIgridHeight = 94;
  tabpanelHeight = 100;
  isClicked: boolean;
  PopUpType: string;
  HaveAlertToFinance: any;
  BtnClickedName: string;
  CartableUserID: any;
  IsEndFlow: any;
  ReadyToConfirm: any;
  WorkflowObjectCode: any;
  WorkFlowID: any;
  CurrWorkFlow: any;
  ObjectNo: any;
  WorkflowTypeName: any;
  ObjectID: any;
  WorkflowTypeCode: any;
  BTNsShow: false;
  btnConfirmIcon;
  IsDown: boolean;
  WorkFlowTransitionID: any;
  MinimumPosting: any;
  btnConfirmName;
  ModuleViewTypeCode = null;
  IsAdmin;
  HaveHeader;
  HaveMaxBtn;
  CurrCostCenterID;
  CostCenterItems;
  CostCenterParams;
  OrderCode = '';
  CustomerOrderDate;
  btnRevocationName = 'ابطال';
  btnRevocationIcon = 'revocation';
  btnConfirmAndReturnName = 'عدم تایید و بازگشت';
  BtnShowDelete = false;
  type: string;
  SaleTypeItems;
  RadioShow = false;

  SaleTypeParams = {
    bindLabelProp: 'SaleTypeName',
    bindValueProp: 'SaleTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'order-type',
  };


  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CheckValidate = false;
  NgSelectVSParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'ProductID',
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
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, TermLenght: 3, SearchOption: 0 },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1 }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  CostFactorID = -1;
  OnFilterRegionItems;
  OnFilterRegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  SubCostCenterItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CustomerName: any;
  CustomerOrderID: any;
  CustomerOrderCode: any;
  Subject: any;
  ProductRequestNo: any;
  ProductRequestCode: any;
  IsDisable: boolean;
  CurrentUserSubCostCenter: any;
  Products: any;
  CostumerOrderQty: any;
  HasWorkFlow = false;
  ProductPatternID: any;
  WorkFlowInstanceID: any;
  IsSaleType = true;
  RegionParams: any;
  constructor(
    private ProductRequest: ProductRequestService,
    private CustomerOrder: CustomerOrderService,
    private Cartable: CartableServices,
    private RefreshPersonItems: RefreshServices,
    private Common: CommonService,
    private CommonService: CommonServices,
    private FlowService: WorkflowService,
    private ContractList: ContractListService,
    private Report: ReportService,
  ) { }

  ngOnInit() {
    this.FillGrid();
    if (this.InputParam) {
      this.WorkFlowInstanceID = this.InputParam.WorkFlowInstanceId ? this.InputParam.WorkFlowInstanceId : null;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      // this.IsContractRemainStartWF = this.InputParam.IsStartWF;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.CostFactorID = this.InputParam.CostFactorID;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.CustomerOrderID = this.InputParam.CustomerOrderID;
      this.CustomerOrderCode = this.InputParam.CustomerOrderCode;
      this.ModuleCode = this.ModuleCode ? this.ModuleCode : 1646;
      this.rowsData = this.InputParam.ProductRequestItemList ? this.InputParam.ProductRequestItemList : [];
      this.BTNsShow = this.InputParam.BTNs;
      this.Subject = this.InputParam.Subject ? this.InputParam.Subject : "";
      this.CustomerName = this.InputParam.CustomerName ? this.InputParam.CustomerName : "";
      this.ProductRequestDate = this.InputParam.ProductRequestDate;
      this.HasWorkFlow = this.InputParam.HasWorkFlow ? this.InputParam.HasWorkFlow : false;
      this.BtnShowDelete = this.InputParam.BtnShowDelete;
      if (this.CurrWorkFlow) {
        this.ReadyToConfirm = this.CurrWorkFlow.ReadyToConfirm;
        this.WorkflowTypeName = this.CurrWorkFlow.WorkflowTypeName;
        this.WorkflowTypeCode = this.CurrWorkFlow.WorkflowTypeCode;
        this.WorkflowObjectCode = this.CurrWorkFlow.WorkflowObjectCode;
        this.ObjectNo = this.CurrWorkFlow.ObjectNo;
        this.ObjectID = this.CostFactorID = this.CurrWorkFlow.ObjectID;
        this.WorkFlowID = this.CurrWorkFlow.WorkflowID;
        this.CartableUserID = this.CurrWorkFlow.CartableUserID;
        this.MinimumPosting = this.CurrWorkFlow.MinimumPosting;
      }
    }

    if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید';
      this.btnConfirmIcon = 'ok';
    }

    if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'عدم تایید';
      this.btnConfirmIcon = 'cancel';
    }

    if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'بازگشت از تایید نهایی';
      this.btnConfirmIcon = 'cancel';

    }

    if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید نهایی';
      this.btnConfirmIcon = 'ok';
    }

    this.FillForm(this.CostFactorID, this.CustomerOrderID);

  }

  FillForm(CostFactorID, CustomerOrderID) {
    forkJoin([
      this.ProductRequest.GetSaleType(),
      this.ProductRequest.GetCurrentDate()

    ]).subscribe((res: any) => {
      this.SaleTypeItems = res[0];
      this.ProductRequestDate = res[1];

    });
    if (CostFactorID && CostFactorID > 0) {
      this.ProductRequest.GetCRMProductRequest(CostFactorID).subscribe(res => {     
        this.ProductRequestObject = res;
        this.rowsData = this.ProductRequestObject.ProductRequestItemList;
        this.ProductRequestNo = this.ProductRequestObject.ProductRequestNo;
        this.SaleTypeParams.selectedObject = this.ProductRequestObject.SaleTypeCode;
        this.CustomerOrderID = this.ProductRequestObject.CustomerOrderID;
        this.CustomerOrder.GetCustomerOrder(this.CustomerOrderID).subscribe(res => {
          this.CustomerOrderCode = res.CustomerOrderCode;
          this.Subject = res.Subject;
          this.CustomerName = res.FullCustomerName;

        });
      });
      this.ProductRequest.GetSubCostCenterPerson().subscribe(res => {
        this.CurrentUserSubCostCenter = res;

        if (this.ProductRequestObject && this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterId) {
          this.CostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.CostCenterId;
        }
        this.ProductRequest.GetListByCostCenterId(
          this.CurrentUserSubCostCenter.CostCenterID,
          null,
          true,
          200
        ).subscribe(res => {
          this.SubCostCenterItems = res;
          this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
        });
      });
      this.SubCostCenterParams.selectedObject = this.InputParam.SubCostCenterID;

    } else {

      this.CustomerOrder.GetCustomerOrder(CustomerOrderID).subscribe(res => {
        this.Subject = res.Subject;
        this.CustomerName = res.FullCustomerName;
      });
      this.ProductRequest.GetSubCostCenterPerson().subscribe(res => {
        this.CurrentUserSubCostCenter = res;

        if (this.ProductRequestObject && this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterId) {
          this.CostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.CostCenterId;
        }
        this.ProductRequest.GetListByCostCenterId(
          this.CurrentUserSubCostCenter.CostCenterID,
          null,
          true,
          200
        ).subscribe(res => {
          this.SubCostCenterItems = res;
          this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
        });
      });

      if (this.ProductRequestObject && this.ProductRequestObject.CustomerOrderID) {
        this.CustomerName.selectedObject = this.ProductRequestObject.CustomerOrderID;
      }
    }

    this.onChangeRegion(200);
  }


  OnProductRequestDateChange(ADate) {
    this.ProductRequestDate = ADate.MDate;
    this.PersianProductRequestDate = ADate.SDate;
  }

  OnDeadLineDateChange(ADate) {
    this.DeadLineDate = ADate.MDate;
  }

  FillGrid() {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 45,
        resizable: true
      },
      // {
      //   headerName: 'نوع درخواستی',
      //   field: 'ProductTypeName',
      //   cellEditorFramework: NgSelectCellEditorComponent,
      //   cellEditorParams: {
      //     HardCodeItems: this.ProductTypeList,
      //     bindLabelProp: 'ProductTypeName',
      //     bindValueProp: 'ProductTypeCode'
      //   },
      //   cellRenderer: 'SeRender',
      //   valueFormatter: function currencyFormatter(params) {
      //     if (params.value) {
      //       return params.value.ProductTypeName;

      //     } else {
      //       return '';
      //     }
      //   },
      //   valueSetter: (params) => {
      //     if (params.newValue) {
      //       if (params.newValue.ProductTypeName !== params.oldValue) {
      //         params.data.ProductTypeName = params.newValue.ProductTypeName;
      //         params.data.ProductTypeCode = params.newValue.ProductTypeCode;
      //         params.data.ScaleName = null;
      //         params.data.ProductID = null;
      //         params.data.ProductName = null;
      //         return true;
      //       }
      //     } else {
      //       params.data.ProductTypeName = null;
      //       params.data.ProductTypeCode = null;
      //       params.data.ScaleName = null;
      //       params.data.ProductID = null;
      //       params.data.ProductName = null;
      //       return false;
      //     }
      //   },
      //   width: 70,
      //   resizable: true
      // },
      {
        headerName: 'گروه محصول',
        field: 'ProductPatternName',
        editable: () => {
          false
        },
        HaveThousand: true,
        width: 100,
        resizable: true
      },
      {
        headerName: 'محصول',
        field: 'ProductName',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از کالای فروش',

        cellEditorParams: {
          SearchPopupType: 'product-pattern',
          PopupParam: { RegionGroupCode: 2, MainContentHeight: 92, ProductPatternID: this.ProductPatternID, ShowGrid: true },
        },
        cellRenderer: 'SeRender',
        valueSetter: (params) => {
          if (params.newValue && params.newValue[0] && params.newValue[0].ProductPatternProductsID) {
            params.data.ProductCode = params.newValue[0].ProductCode;
            params.data.ProductID = params.newValue[0].ProductID;
            params.data.ProductName = params.newValue[0].ProductName;
            params.data.ProductPatternID = params.newValue[0].ProductPatternID;
            params.data.ProductPatternProductsID = params.newValue[0].ProductPatternProductsID;
            this.ProductRequest.GetProduct(params.data.ProductID, null, params.data.ProductPatternID).subscribe(res => {
              params.data.ScaleName = res.ScaleName;
              params.data.ProductTypeName = res.ProductTypeName;
            });
          }

        },

        valueGetter: (params) => {
          if (params.data.ProductName) {
            return params.data.ProductCode + params.data.ProductName;
          }
        },

        editable: () => {
          if (this.ModuleViewTypeCode == 6 ) {
            return true;
          } else {
            return false;
          }
        },
        width: 250,
        resizable: true
      },

      // {
      //   headerName: 'کالا/خدمت',
      //   field: 'ProductName',
      //   cellEditorFramework: NgSelectVirtualScrollComponent,
      //   cellEditorParams: {
      //     Params: this.NgSelectVSParams,
      //     Items: [],
      //     MoreFunc: this.FetchMoreProduct,
      //     FetchByTerm: this.FetchProductByTerm,
      //     RedioChangeFunc: this.RedioSelectedChange,
      //     Owner: this
      //   },
      //   cellRenderer: 'SeRender',
      //   valueFormatter: function currencyFormatter(params) {
      //     if (params.value) {
      //       return params.value.ProductName;
      //     } else {
      //       return '';
      //     }
      //   },
      //   valueSetter: (params) => {
      //     if (params.newValue && params.newValue.ProductName) {
      //       params.data.ProductName = params.newValue.ProductName;
      //       params.data.ProductID = params.newValue.ProductID;
      //       this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
      //         params.data.ScaleName = res;
      //       });
      //       return true;
      //     } else {
      //       params.data.ProductName = '';
      //       params.data.ProductID = null;
      //       params.data.ScaleName = '';
      //       return false;
      //     }
      //   },
      //   editable: false,
      //   width: 150,
      //   resizable: true
      // },

      {
        headerName: 'واحد',
        field: 'ScaleName',
        width: 80,
        resizable: true
      },
      {
        headerName: 'موجودی انبار',
        field: '',
        width: 100,
        sortable: false,
        resizable: false,
        editable: () => { false },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.CostumerOrderBtn,
        }
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: () => {
          return this.IsEditable;
        },
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        width: 80,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Subject',
        editable: () => {
          return false;
        },
        width: 450,
        resizable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        editable: false,
        width: 100,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive4,
        }
      },
    ];
  }

  onChangeRegion(RegionCode) {
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  ViewTypeChange() { 
    switch (this.ModuleViewTypeCode) {
      case 5:
        this.HaveRevocation = true;       
      break;
      case 10:
      this.gridHeight = 70;
      this.RadioShow =true;
      default:
        break;

    }
  }

  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.RegionParams.selectedObject,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        event.Owner.IsCost,
        null).
        subscribe(res => {
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
    });
  }

  FetchProductByTerm(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }


  RedioSelectedChange(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.columnDef[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  onSave() {
    if(this.ModuleViewTypeCode == 10 && this.ProductRequestObject.CostFactorID )
    {
      this.ProductRequest.UpdateIsSaleType(
      this.ProductRequestObject.CostFactorID,this.IsSaleType).subscribe((res: any) => {
      });   
    }
    else
    {
      let canSave = true;
    let ItemNo = 0;
    this.gridApi.stopEditing();
    const ProductRequestList = [];
    const ProductRequestObj = {
      ContractTypeCode: null,
      CostFactorID: this.ProductRequestObject && this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : -1,
      RegionCode: 200,
      ProductRequestDate: this.ProductRequestDate,
      DeadlineDate: this.DeadLineDate,
      UnitPatternID: 4492,
      CustomerOrderID: this.CustomerOrderID,
      Subject: this.Subject,
      ProductRequestStatusCode: 1,
      HasLicence: 0,
      RelatedContractID: null,
      ProvisionContractID: null,
      SubCostCenterID: this.SubCostCenterParams.selectedObject,
      IsWeb: 1,
      ActLocationID: null,
      PriceListPatternID: null,
      InvVoucherGroupCode: 1,
      PriceListTopicID: null,
      GradeID: null,
      IsConfirm: 0,
      IsCost: 0,
      RequestObjectTypeCode: 11,
      SaleTypeCode: this.SaleTypeParams.selectedObject ? this.SaleTypeParams.selectedObject : null,    
    };


    this.gridApi.forEachNode(node => {
      if (node.data.RemainQty == 0 || node.data.QTY == 0 || node.data.QTY > node.data.RemainQty) {
        this.MoreThanRemain = true;
        this.ShowMessageBoxWithOkBtn('تعداد اقلام انتخابی بیشتر از میزان مجاز است');
        canSave = false;
      }
      else {
        //this.gridApi.forEachNode(node => {
        const ProductRequestItemObj = {
          ProductRequestItemID: node.data.ProductRequestItemID ? node.data.ProductRequestItemID : -1,
          CustomerOrderItemID: node.data.CustomerOrderItemID ? node.data.CustomerOrderItemID : null,
          CostFactorID: ProductRequestObj.CostFactorID,
          ItemNo: ++ItemNo,
          QTY: parseFloat(node.data.QTY),
          Subject: node.data.Subject,
          // tslint:disable-next-line:max-line-length
          ProductID: node.data.ProductName && node.data.ProductName.ProductID ? node.data.ProductName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
          StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
          EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
        };
        ProductRequestList.push(ProductRequestItemObj);
      }
    });

    if (canSave) {
      this.ProductRequest.SaveCrmProductRequest(
        1646,
        ProductRequestObj,
        ProductRequestList,
        '1646'
      ).subscribe((res: any) => {
        this.ProductRequestCode = res.ProductRequestCode;
        this.ProductRequestNo = res.ProductRequestNo;
        this.rowsData = res.ProductRequestItemList;
        this.CostFactorID = res.CostFactorID;
        this.ProductRequestObject = res;
        this.IsDisable = false;
        this.OutPutParam.emit(true);
        this.onChangeRegion(200);
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
    }
    }
    
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = undefined;
    this.MainMaxwidthPixel = undefined;
    this.MinHeightPixel = undefined;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }


  // Close() {
  //   this.Closed.emit(true);
  // }
  Close() {
    this.isClicked = false;
    this.Closed.emit(true);
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }


  onDocArchiveClick4(row) {
    if (row.ProductRequestItemID && row.ProductRequestItemID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ProductRequestItemID,
        TypeCodeStr: '1267-',
        DocTypeCode: 1267,
        ModuleCode: this.ModuleCode,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  DOConfirm(HasAlert = true, resolve = null) {
    //   if (!this.HaveAlertToFinance || this.IsAdmin === true) {
    if (this.WorkflowObjectCode === null) {
      this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
    }
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CostFactorID,
      200,
      3039,  // this.ModuleCode,
      1,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.OrginalModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
      subscribe(res => {
        if (HasAlert) {
          this.ShowMessageBoxWithOkBtn('تایید درخواست  با موفقیت انجام شد');
        }
        this.RefreshPersonItems.RefreshCartable();
        this.ReadyToConfirm = 1;
        this.btnConfirmName = 'عدم تایید';
        this.btnConfirmIcon = 'cancel';
        this.IsEditable = false;
        resolve(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
    // } else {
    //   this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    // }
  }

  DOFinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.CartableUserID
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          messageStr = 'بازگشت از تایید نهایی ریز درخواست با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی ریز درخواست با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      });
  }

  onConfirm() {

    // if (!this.HaveAlertToFinance || this.IsAdmin === true) {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        this.DOConfirm();
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.CostFactorID,
          200,
          3039,  // this.ModuleCode,
          0,
          this.WorkflowObjectCode,
          this.ModuleViewTypeCode,
          this.OrginalModuleCode,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
          .subscribe(res => {
            this.ShowMessageBoxWithOkBtn('عدم تایید ریز درخواست با موفقیت انجام شد');

            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تایید';
            this.btnConfirmIcon = 'ok';
          }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
    // } else {
    //   this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    // }
  }

  onConfirmAndSend() {

    // if (!this.HaveAlertToFinance || this.IsAdmin === true) {
    this.BtnClickedName = 'ConfirmAndSend';
    this.ConfirmAndSend();
    // } else {
    //   this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    // }
  }

  DoConfirmAndSend() {
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.OrderCode;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                    });
                    this.PopUpType = 'cfm-workflow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    this.PopupParam = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      ObjectID: this.ObjectID,
                      MinimumPosting: this.MinimumPosting,
                      OrginalModuleCode: this.OrginalModuleCode,
                      CartableUserID: this.CartableUserID
                    };
                    this.isClicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });

  }

  SetStartedWFInfo(Resolve) {
    this.FlowService.GetStartModuleViewTypeCode(200,
      3039,  // this.ModuleCode,
      this.WorkflowTypeCode,
      this.CostFactorID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
          this.MinimumPosting = this.MinimumPosting ? this.MinimumPosting : this.CurrWorkFlow ? this.CurrWorkFlow.MinimumPosting : null;
        }
        Resolve();
      });
  }

  onUnConfirmAndReturn() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.IsDown = false;
      const promise = new Promise((resolve, reject) => {
        this.DoUnConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.OrderCode;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  res.forEach(element => {
                    element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                  });
                  this.PopUpType = 'cfm-workflow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.PopupParam = {
                    Message: 'بازگشت',
                    OperationCode: 2,
                    rows: res,
                    CurrWorkFlow: this.CurrWorkFlow,
                    WorkFlowID: this.WorkFlowID,
                    IsEnd: this.IsEndFlow,
                    ObjectNo: this.ObjectNo,
                    WorkflowTypeName: this.WorkflowTypeName,
                    WorkflowTypeCode: this.WorkflowTypeCode,
                    WorkflowObjectCode: this.WorkflowObjectCode,
                    MinimumPosting: this.MinimumPosting,
                    ObjectID: this.ObjectID,
                    OrginalModuleCode: this.OrginalModuleCode,
                    CartableUserID: this.CartableUserID
                  };
                  this.isClicked = true;
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
                }
              }
            );
        } else {
          this.IsDown = true;
          this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        200,
        3039,  // this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';
          this.IsEditable = false;
          resolve(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  OnClickPrintFlow() {
    this.Report.ShowReportCustomerProduct(
      this.CostFactorID, // ObjID
      3039, // ModuleCode
    //  this.RegionParams.selectedObject, // RegCode
      null // HaveSave
    );
  }
  ConfirmAndSend() {
    this.DoConfirmAndSend();
  }

  popupclosed(event) {

    this.isClicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.HaveMaxBtn = false;

  }


  RowClick(event) {
    this.selectedrow = event;
    this.ProductPatternID = this.selectedrow.data.ProductPatternID;
    this.columnDef[2].cellEditorParams.PopupParam.ProductPatternID = this.ProductPatternID;

  }
  CostumerOrderColumnBtn(row) {
    this.isClicked = true;
    this.PopUpType = 'inventory-qty-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.PercentWidth = 55;
    this.MinHeightPixel = 345;
    this.MainMaxwidthPixel = 745;
    this.HeightPercentWithMaxBtn = 72;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;

    this.PopupParam = {
      ProductPatternID: row.ProductPatternID
    };

  }

  DoDelete() {
    this.ProductRequest.DeleteProductRequest(this.CostFactorID, this.ModuleCode).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
      });
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    }
    this.PopUpType = '';
    this.BtnClickedName = '';
    this.isClicked = false;

  }

  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف درخواست مطمئن هستید؟');
  }
  getOutPutParam(event) {
    if (event && this.PopUpType === 'cfm-workflow-send') {
      this.Close();
    }

  }
  BtnVeiwclick() {
    this.isClicked = true;
    this.PopUpType = 'user-work-log-details';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    // this.OverPixelWidth = 1290;
    this.startLeftPosition = 40;
    this.startTopPosition = 8;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 640;

    this.PopupParam = {
      HeaderName: 'جزئیات گردش',
      WorkFlowInstanceId: this.WorkFlowInstanceID,
      ProductRequestID: this.CustomerOrderID
    };

  }

  onRevocation() {
    this.ProductRequest.RevokeProductRequest(this.CostFactorID, this.ModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('درخواست با موفقیت ابطال شد');
    });
  }

  IsSaleTypeRedioClick(IsSaleType) {
    this.IsSaleType = IsSaleType;
  }

  CustomerOrderVeiwclick() {
    this.PopUpType = 'customer-order';
    this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 55;
    this.startTopPosition = 5;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 97;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.MinHeightPixel = 645;
    this.PopupParam = {
      CustomerOrderID: this.CustomerOrderID,
      Mode: 'EditMode',
      BTNs :true,
      ModuleViewTypeCode :200000,
    };

  }

}
