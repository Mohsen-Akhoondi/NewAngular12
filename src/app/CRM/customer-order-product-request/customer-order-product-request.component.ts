import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { CustomerOrderService } from 'src/app/Services/CRM/CustomerOrderService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';

@Component({
  selector: 'app-customer-order-product-request',
  templateUrl: './customer-order-product-request.component.html',
  styleUrls: ['./customer-order-product-request.component.css']
})
export class CustomerOrderProductRequestComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('TextBtn') TextBtn: TemplateRef<any>;
  @ViewChild('DeleteBtn') DeleteBtn: TemplateRef<any>;
  @ViewChild('WorkFlowBtn') WorkFlowBtn: TemplateRef<any>;
  IsEditable = true;
  gridApi: any;
  gridApiMenu: any;
  SubGridApiMenu: any;
  gridApiFastMenu: any;
  rowData: any = [];
  SubrowData: any = [];
  rowsData = [];
  SelectedColumnDef;
  SubSelectedColumnDef;
  columnDef;
  CustomerOrderID;
  CustomerOrderDate;
  Subject;
  CustomerName;
  CustomerOrderCode;
  selectedMenuID = -1;
  selectedFastMenuID = -1;
  selectedMenuItem: any;
  selectedFastMenuItem: any;
  btnclicked = false;
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: number;
  HaveMaxBtn = false;
  type: string;
  HaveHeader: boolean;
  BtnShowDelete = false;
  paramObj;
  PopUpType: string;
  ProdcutTypeCode: any;
  IsEndFlow: any;
  ReadyToConfirm: any;
  btnConfirmName;
  btnConfirmIcon;
  BTNsShow: false;
  HaveAlertToFinance: any;
  IsAdmin;
  BtnClickedName: string;
  ChangeDetection;
  isClicked: boolean;
  WorkFlowID: any;
  WorkflowObjectCode: any;
  ModuleCode;
  ModuleViewTypeCode = null;
  OrginalModuleCode;
  CartableUserID: any;
  CurrWorkFlow: any;
  ObjectNo: any;
  WorkflowTypeName: any;
  ObjectID: any;
  WorkflowTypeCode: any;
  selectedReq = [];


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
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @ViewChild('IsChosen') IsChosen: TemplateRef<any>;
  @ViewChild('HasWorkFlow') HasWorkFlow: TemplateRef<any>;
  PopupParam: { CustomerOrder: any; };
  selectedSubMenuID: any;
  CostFactorID: number;
  MainMinwidthPixel: number;
  GroupNumber: any;
  constructor(private CustomerOrder: CustomerOrderService,
    private ProductRequest: ProductRequestService,
    private RefreshPersonItems: RefreshServices,
    private Cartable: CartableServices) { }

  ngOnInit() { 
    // if (this.InputParam) {   
    this.CustomerOrderID = this.InputParam.ObjectID;
    this.BTNsShow = this.InputParam.BTNs;
    //this.CustomerOrderID = this.InputParam.CustomerOrderID;
    this.CustomerOrder.GetCustomerOrder(this.CustomerOrderID).subscribe(res => {
      this.CustomerOrderDate = res.PersianCustomerOrderDate;
      this.Subject = res.Subject;
      this.CustomerName = res.FullCustomerName;
      this.CustomerOrderCode = res.CustomerOrderCode;
      this.rowData = res.CustomerOrderItemList;
    });
    this.CustomerOrder.GetProductRequestByCustomer(this.CustomerOrderID).subscribe(res => {
      this.SubrowData = res;
    });


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

    // }

  }
  ngAfterViewInit(): void {

    this.SelectedColumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 45,
        resizable: true,
      },
      {
        headerName: 'انتخاب',
        field: 'IsChosen',
        width: 60,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsChosen
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsChosen = true;
            return true;
          } else {
            params.data.IsChosen = false;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'محصول',
        field: 'ProductPatternName',
        width: 200,
        resizable: true,
      },
      {
        headerName: 'معاونت تخصصی',
        field: 'CostCenterName',
        width: 200,
        resizable: true,
      },
      {
        headerName: 'اداره تخصصی',
        field: 'SubCostCenterName',
        width: 250,
        resizable: true,
      },
      // {
      //   headerName: 'محصول',
      //   field: 'ProductName',
      //   width: 300,
      //   resizable: true
      // },

      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        resizable: true
      },
      {
        headerName: 'تعداد باقیمانده',
        field: 'RemainQty',
        width: 100,
        resizable: true
      },

    ]

    this.SubSelectedColumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true,
      },
      {
        headerName: 'انتخاب',
        field: 'IsChosen',
        width: 80,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsChosen
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsChosen = true;
            return true;
          } else {
            params.data.IsChosen = false;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'مشاهده',
        field: '',
        width: 60,
        sortable: false,
        resizable: false,
        editable: () => { false },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.TextBtn,
        }
      },

      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        editable: false,
        width: 150,
        resizable: true,
      },
      {
        headerName: 'تاریخ',
        field: 'PersianProductRequestDate',
        editable: false,
        width: 150,
        resizable: true,
      },
      {
        headerName: 'شماره گروه',
        field: 'GroupNO',
        editable: false,
        width: 150,
        resizable: true,
      },
      {
        headerName: 'وضعیت گردش',
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
        headerName: 'جزییات گردش',
        field: '',
        width: 150,
        sortable: false,
        resizable: false,
        editable: () => { false },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.WorkFlowBtn,
        }
      },

      {
        headerName: 'حذف درخواست',
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
          ngTemplate: this.DeleteBtn,
        }
      },

    ]

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'گروه محصول',
        field: 'ProductPatternName',
        editable: false,
        width: 300,
        resizable: true,
      },
      {
        headerName: 'نوع درخواست',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductTypeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.ProductTypeName !== params.oldValue) {
              params.data.ProductTypeName = params.newValue.ProductTypeName;
              params.data.ProductTypeCode = params.newValue.ProductTypeCode;
              //params.data.ScaleName = null;
              //params.data.ProductID = null;
              //params.data.ProductName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            //params.data.ScaleName = null;
            //params.data.ProductID = null;
            //params.data.ProductName = null;
            return false;
          }
        },
        // editable: () => {
        //   return this.IsEditable;
        // },
        editable: false,
        width: 120,
        resizable: true,
      },

      {
        headerName: 'کالا/خدمت',
        field: 'ProductName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreProduct,
          FetchByTerm: this.FetchProductByTerm,
          RedioChangeFunc: this.RedioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductName) {
            params.data.ProductName = params.newValue.ProductName;
            params.data.ProductID = params.newValue.ProductID;
            this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
              params.data.ScaleName = res;
            });
            return true;
          } else {
            params.data.ProductName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        // editable: () => {
        //   return this.IsEditable;
        // },
        editable: false,
        width: 350,
        resizable: true
      },
      {
        headerName: 'تعداد درخواست',
        field: 'QTY',
        width: 100,
        resizable: true,
        editable: false,
      },
      // {
      //   headerName: 'تعداد باقیمانده',
      //   field: 'RemainQty',
      //   width: 200,
      //   resizable: true,
      //   editable: false
      // },
      {
        headerName: 'تعداد سفارش',
        field: 'CustomerQty',
        width: 100,
        resizable: true,
        editable: false,
      },

    ]
  }

  MenuRowClick(InputValue: number) {
    this.selectedMenuID = InputValue;
  }
  SubMenuRowClick(InputValue: number) {
    this.selectedSubMenuID = InputValue;
  }

  onGridReadyMenu(params: { api: any; }) {
    this.gridApiMenu = params.api;
  }
  onSubGridReadyMenu(params: { api: any; }) {
    this.SubGridApiMenu = params.api;
  }


  FastMenuRowClick(InputValue: number) {
    this.selectedFastMenuID = InputValue;
  }


  onGridReadyFastMenu(params: { api: any; }) {
    this.gridApiFastMenu = params.api;
  }


  addSelectedToMenu() {
    this.selectedFastMenuItem = this.gridApiFastMenu.getSelectedRows();
    if (this.selectedFastMenuItem != null) {
      this.gridApiFastMenu.updateRowData({ remove: this.selectedFastMenuItem });
      // this.selectedFastMenuItem.forEach((item) => {
      //   this.gridApiMenu.updateRowData({ add: [item] });
      // });
    }
    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }
  addSelectedToFastMenu() {
    this.selectedMenuItem = [];
    this.selectedMenuItem = this.gridApiMenu.getSelectedRows();
    if (this.selectedMenuItem != null) {
      const fastMenuCount = this.gridApiFastMenu.getDisplayedRowCount();
      //this.gridApiMenu.updateRowData({ remove: this.selectedMenuItem });
      if (fastMenuCount === 0) {
        this.selectedMenuItem.forEach((item) => {
          const obj = {
            ItemNo: item.ItemNo,
            ProductPatternName: item.ProductPatternName,
            ProductPatternID: item.ProductPatternID,
            ProductName: item.ProductName,
            ProductID: item.ProductID,
            CustomerOrderItemID: item.CustomerOrderItemID,
            CustomerQty: item.Qty,
            QTY: item.RemainQty,
            RemainQty: item.RemainQty,
            ProductTypeName: item.ProductTypeName

          };

          this.gridApiFastMenu.updateRowData({ add: [obj] });
        });
      } else {

        const lastIndex = this.gridApiFastMenu.getLastDisplayedRow();
        const tempData = [];
        this.gridApiFastMenu.forEachNode(
          node => tempData.push(node.data));
        let abc: number;
        abc = lastIndex + 1;
        const xx = tempData.filter(x => x.ItemNo === abc)[0];

        this.selectedMenuItem.forEach((item) => {

          const obj = {
            ItemNo: item.ItemNo,
            ProductPatternName: item.ProductPatternName,
            ProductName: item.ProductName,
            CustomerQty: item.Qty,
            QTY: item.RemainQty,
            RemainQty: item.RemainQty,
            CustomerOrderItemID: item.CustomerOrderItemID
          };
          this.gridApiFastMenu.updateRowData({ add: [obj] });
        });
      }
    }

    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }


  addAllToFastMenu() {
    const rowData = [];
    this.gridApiMenu.forEachNode(node => rowData.push(node.data));
    this.gridApiMenu.updateRowData({ remove: rowData });

    const fastMenuCount = this.gridApiFastMenu.getDisplayedRowCount();
    this.gridApiMenu.updateRowData({ remove: this.selectedMenuItem });
    if (fastMenuCount === 0) {
      rowData.forEach((item) => {
        this.gridApiFastMenu.updateRowData({ add: [item] });
      });
    } else {
      const lastIndex = this.gridApiFastMenu.getLastDisplayedRow();
      const tempData = [];
      this.gridApiFastMenu.forEachNode(node => tempData.push(node.data));
      let abc: number;
      abc = lastIndex + 1;
      const xx = tempData.filter(x => x.ItemNo === abc)[0];
      let maxOrderNo = xx.OrderNo + 1;
      rowData.forEach((item) => {
        this.gridApiFastMenu.updateRowData({ add: [item] });
        maxOrderNo++;
      });
      this.RefreshItemNoFastMenu();
      this.RefreshItemNoMenu();
    }
  }

  RefreshItemNoFastMenu() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApiFastMenu.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApiFastMenu.updateRowData({ update: itemsToUpdate });
  }
  RefreshItemNoMenu() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApiMenu.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApiMenu.updateRowData({ update: itemsToUpdate });
  }

  addAllToMenu() {
    const rowData = [];
    this.gridApiFastMenu.forEachNode(node => rowData.push(node.data));
    this.gridApiFastMenu.updateRowData({ remove: rowData });
    rowData.forEach((item) => {
      this.gridApiMenu.updateRowData({ add: [item] });
    });

    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }

  oncellEditingStarted(event) {
    this.gridApiFastMenu.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });

    if (event.colDef && event.colDef.field === 'ProductName') {
      this.columnDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(0,
        null,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        true,
        event.data.ProductID).
        subscribe(res => {
          this.columnDef[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        null,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        true,
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
      null,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      true,
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
      null,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      true,
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

  BtnRequestClick() {
    this.gridApiMenu.stopEditing();

    const CustomerOrderItemList = [];

    this.gridApiMenu.forEachNode(node => {
      if (node.data.IsChosen) {
        node.data.QTY = node.data.RemainQty;
        node.data.RemainQty = node.data.RemainQty;
        node.data.Subject = node.data.Note;
        node.data.CustomerOrderItemID = node.data.CustomerOrderItemID;
        node.data.ProductID = node.data.ProductID;
        node.data.ProductPatternID = node.data.ProductPatternID;
        CustomerOrderItemList.push(node.data);
      }
    });

    //if (this.IsMore == false) {

    if (CustomerOrderItemList && CustomerOrderItemList.length > 0) {
      this.type = 'customer-product-request-page';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 50;
      this.startTopPosition = 10;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;

      this.paramObj = {
        CustomerOrderID: this.CustomerOrderID,
        ProductRequestItemList: CustomerOrderItemList,
        CostFactorID: -1,
        WorkFlowID: null,
        ReadyToConfirm: null,
        IsRegionReadOnly: false,
        DisableCustomerOrder: true,
        CustomerOrderCode: this.CustomerOrderCode,
      };

      return;
    }
    else
    {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب نشده است.');

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

  onAddItemsClick() {
    this.type = 'customer-order-list';
    this.btnclicked = true;
    this.HaveMaxBtn = true;
    this.startLeftPosition = 350;
    this.startTopPosition = 51;
    this.paramObj = {
      Mode: 'AddNewPopUp',
    };
  }

  getOutPutParam(event) {
    // if (this.type === 'message-box') {
    //   this.IsMore = false;
    // }
    if (this.CustomerOrderID) {
      this.CustomerOrder.GetProductRequestByCustomer(this.CustomerOrderID).subscribe(res => {
        this.SubrowData = res;
      });
    }

    if (this.type == 'add-to-group' && event) {
      this.GroupNumber = event;
      const selectedReqestList = [];
      this.SubGridApiMenu.forEachNode(node => {
        if (node.data.IsChosen) {
          selectedReqestList.push(node.data.CostFactorID);
        }
      });

      this.ProductRequest.SaveToCurrentGroupRequests(selectedReqestList,this.GroupNumber, 1646).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('درخواست مورد نظر به گروه انتخاب شده اضافه گردید.');
        this.CustomerOrder.GetProductRequestByCustomer(this.CustomerOrderID).subscribe(res => {
          this.SubrowData = res;
        });
      });



    }
    if (this.type == 'customer-order-list') {
      this.CustomerOrder.GetCustomerOrder(event).subscribe(res => {
        if (res.CustomerOrderItemList && res.CustomerOrderItemList.length) {
          res.CustomerOrderItemList.forEach(element => {
            this.gridApiFastMenu.updateRowData({ add: [element] });
          });
        }
      });
    }

    if (this.type === 'customer-product-request-page') {
      this.ngOnInit();
      this.rowsData = [];
    }
  }

  popupclosed() {
    this.btnclicked = false;
    this.HaveHeader = null;
    this.HaveMaxBtn = null;
    this.startLeftPosition = null;
    this.startTopPosition = null;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }

  Close() {
    this.btnclicked = false;
    this.Closed.emit(true);
  }


  BtnProductReqShowClick(row) {
    this.type = 'customer-product-request-page';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 50;
    this.startTopPosition = 10;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 97
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.MinHeightPixel = 645;
    this.paramObj = {
      CostFactorID: row.CostFactorID,
      CustomerOrderCode: this.CustomerOrderCode,
      CustomerName: this.CustomerName,
      Subject: this.Subject,
      ProductRequestDate: row.ShortProductRequestDate,
      SubCostCenterID: row.SubCostCenterID,
      HasWorkFlow: row.HasWorkFlow,
      BtnShowDelete: this.BtnShowDelete = true,
      HeaderName: 'ریز درخواست'
    };
  }

  AddGroup() {
    const selectedReqestList = [];
    this.SubGridApiMenu.forEachNode(node => {
      if (node.data.IsChosen) {
        selectedReqestList.push(node.data.CostFactorID);
      }
    });

    if (selectedReqestList != null && selectedReqestList.length > 1) {
      this.ProductRequest.SaveRelatedProductRequests(selectedReqestList, 1646).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('گروه بندی ریز درخواست های انتخاب شده با موفقیت انجام شد.');
        this.CustomerOrder.GetProductRequestByCustomer(this.CustomerOrderID).subscribe(res => {
          this.SubrowData = res;
        });
      });
    }
  }

  AddToCurrentGroup() {
    const selectedReqestList = [];
    this.SubGridApiMenu.forEachNode(node => {
      if (node.data.IsChosen) {
        selectedReqestList.push(node.data.CostFactorID);
      }
    });

    if (selectedReqestList != null && selectedReqestList.length > 0) {
      this.type = 'add-to-group';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.PercentWidth = 33;
      this.MinHeightPixel = 145;
      //this.MainMaxwidthPixel = 545;
      this.MainMinwidthPixel = 30;
      this.HeightPercentWithMaxBtn = 31;
      this.startLeftPosition = 419;
      this.startTopPosition = 116;
    }
  }

  DeleteFromGroup() {
    const selectedReqestList = [];
    this.SubGridApiMenu.forEachNode(node => {
      if (node.data.IsChosen) {
        selectedReqestList.push(node.data.CostFactorID);
      }
    });
    if (selectedReqestList != null && selectedReqestList.length > 0) {
      this.ProductRequest.DeleteFromRelatedGroup(selectedReqestList, 1646).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('حذف از گروه با موفقیت انجام شد.');
        this.CustomerOrder.GetProductRequestByCustomer(this.CustomerOrderID).subscribe(res => {
          this.SubrowData = res;
        });
      });
    }

  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.btnclicked = true;
    this.type = 'message-box';
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
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
      }
      this.SubGridApiMenu.forEachNode(node => {
        if (node.data.IsChosen) {
          // this.selectedReq.push(node.data.CostFactorID);

          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.CostFactorID,
            200,
            this.ModuleCode,
            1,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            this.OrginalModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
            subscribe(res => {
              if (HasAlert) {
                this.ShowMessageBoxWithOkBtn('تایید درخواست  انجام معامله  با موفقیت انجام شد');
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
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }

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
          messageStr = 'بازگشت از تایید نهایی سفارش مشتری با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی سفارش مشتری با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      });
  }
  onConfirm() {

    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'BtnConfirm';
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          if (this.ChangeDetection) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات  سفارش مشتری تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
          } else {
            this.DOConfirm();
          }
        } else {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.CostFactorID,
            200,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            this.OrginalModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید سفارش مشتری با موفقیت انجام شد');

              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            }
            );
        }
      } else {
        this.DOFinalConfirm();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  DoDelete() {
    this.ProductRequest.DeleteProductRequest(this.selectedSubMenuID.data.CostFactorID, 3039).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
        this.CustomerOrder.GetProductRequestByCustomer(this.CustomerOrderID).subscribe(res => {
          this.SubrowData = res;
        });
      });
  }


  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  onDeleteclick(row) {
    if (row.HasWorkFlow) {
      this.ShowMessageBoxWithOkBtn('درخواست دارای گردش می‌باشد امکان حذف وجود ندارد');
      return;
    }
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف درخواست مطمئن هستید؟');
  }

  OnCinfirmCustomerOrder() {
    this.SubGridApiMenu.forEachNode(node => {
      if (node.data.IsChosen) {
        this.selectedReq.push(node.data.CostFactorID);
      }
    });
  }
  BtnWorkFlowShowClick(row){
    if (row.WorkFlowInstanceId) { 
      
      this.type = 'user-work-log-details';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      // this.OverPixelWidth = 1290;
      this.startLeftPosition = 40;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 640;
  
      this.paramObj = {
        HeaderName: 'جزئیات گردش',
        // LetterNo: row.CustomerOrderCode,
        // // Subject: this.selectedRow.data.Subject,
        // FinYearCode: row.CustomerOrderCode,
        // ContractNo: row.CustomerOrderCode,
        // OrderNo: row.CustomerOrderCode,
        // ContractCode: row.CustomerOrderCode,
        // ContractId: row.CustomerOrderID,
        // ContractorName: row.FullCustomerName,
        // ContractTypeName: row.ContractTypeName,
        // ContractAmount: 0,
        // LetterDatePersian: row.PersianCustomerOrderDate,
        // OrderDate: row.PersianCustomerOrderDate,
        // // workflowtypeStatus: this.WorkflowObjectCode[0],
        // ParentModuleCode: this.ModuleCode,
        // ProductRequestCode: row.CustomerOrderCode,
        // PersianProductRequestDate: row.PersianCustomerOrderDate,
        // Subject: row.Subject,
        // CostFactorID: row.CustomerOrderID,
        // ProductRequestID: row.CustomerOrderID,
        WorkFlowInstanceId :row.WorkFlowInstanceId
      };
    }
  }

}
