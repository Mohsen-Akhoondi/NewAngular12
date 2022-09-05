import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NgSelectConfig } from '../../../Shared/ng-select/public-api';
import { ProductPatternService } from 'src/app/Services/CRM/ProductPatternService';
import { ArticlePatternService } from '../../../Services/CRM/ArticlePatternService';
import { Router } from '@angular/router';
import { ServicePatternService } from 'src/app/Services/CRM/ServicePatternService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ProductService } from 'src/app/Services/BaseService/ProductService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-maintenance-volume-green-space',
  templateUrl: './maintenance-volume-green-space.component.html',
  styleUrls: ['./maintenance-volume-green-space.component.css']
})
export class MaintenanceVolumeGreenSpaceComponent implements OnInit {
  @ViewChild('IsInsertBtn') IsInsertBtn: TemplateRef<any>;
  @ViewChild('IsSelectedValid') IsSelectedValid: TemplateRef<any>;
  @ViewChild('HasNoItem') HasNoItem: TemplateRef<any>;
  PREgridApi;
  EntityTitle = 'موجودیت قلم';
  EntityItemTitle = 'مقدار موجودیت قلم';
  PEIgridApi;
  PREntityrowData = [];
  PEntityItemcolumnDef;
  PREntitycolumnDef;
  PEntityItemrowData: any = [];
  defaultSelectedRowIndex = 0;
  SelectedPREntityRow: any;
  EntityTypeParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'EntityTypeID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'entity-type'
  };
  gridHeader = "مبلغ پایه";
  ShowGrid = true;
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: number;
  btnclicked = false;
  gridApi;
  gridPriceApi;
  BtnClickedName: string;
  NgSelectSearchTerm = '';
  NgSelectItems;
  RegionGroupItems;
  NewChildDisable = false;
  NgSelectParams = {
    Items: [],
    bindLabelProp: 'RegionGroupName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  public scrollbarOptions = {
    axis: 'x',
    theme: 'inset-2-dark',
    scrollButtons: { enable: true }
  };
  type: string;
  OverstartLeftPosition;
  OverstartTopPosition;
  //selectedPriceListTopicCode;
  selectedPriceListID;
  PricelistTopicCode;
  PricelistTopicSearch;
  CostListFinYearCode;
  @Input() MainContentHeight = 94.5;
  @Input() treeHeight = 85;
  @Input() NeedSelected = false;
  @Input() PopUpParam;
  @Input() ModuleCode = -1;
  @Output() RowSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  gridrows: any = [];
  gridPriceRows: any = [];
  SelectedID;
  selectedRow: any;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  paramObj;
  IsDisable = false;
  hasChildren: any;
  hasCreate: any;
  ProductPatternID;
  ProductPatternProductsID: any;
  InputParam: any;
  ProductPatternName: any;
  ProductPatternCode: any;
  PID: any;
  ModuleViewTypeCode: any;
  SelectedProductPattern: any;
  IsProduct = true;
  TreeInputParam = {
    Owner: this,
    GetChildren: this.GetChildren,
    GetRoots: this.GetRoots
  };
  gridcolumns;
  gridPriceColumns;
  NgSelectVSParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    type: 'Product-item',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, MinTermLenght: 1, SearchOption: 'ProductCode' },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 'ProductName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  PatternID;
  IsAdmin = false;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  AllEIsChecked = false;
  AllIIsChecked = false;

  constructor(private router: Router,
    private ProductPattern: ProductPatternService,
    config: NgSelectConfig,
    private APService: ArticlePatternService,
    private RefreshCartable: RefreshServices,
    private SPService: ServicePatternService,
    // tslint:disable-next-line: no-shadowed-variable
    private ProductService: ProductService,
    private ProductRequest: ProductRequestService,
    private User: UserSettingsService
  ) {
    config.notFoundText = 'موردی یافت نشد';
  }
  gridOptions: GridOptions = {
    onRowDoubleClicked: this.doSomething
  };
  doSomething(row) {

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    selectedRows.forEach(function (selectedRow, index) {
    });
  }
  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 14.5;

    this.PEntityItemrowData = [];
    this.PREntityrowData = [];
    this.ShowGrid = this.PopUpParam ? this.PopUpParam.ShowGrid : true;
    this.RegionGroupItems = [{ RegionGroupCode: 4, RegionGroupName: 'سازمان بوستانها و فضاي سبز' }];
    this.NgSelectParams.IsDisabled = this.NeedSelected;
    this.NgSelectParams.selectedObject = 4;
    this.PID = this.PopUpParam && this.PopUpParam.ProductPatternID ? this.PopUpParam.ProductPatternID : null;
    this.gridrows = [];
    this.User.CheckAdmin().subscribe(res => {
      this.IsAdmin = res;
    });
  }
  // tslint:disable-next-line:no-shadowed-variable
  popupclosed(event) {
    this.btnclicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
  }
  tree_selectedchange(event) {
    this.SelectedProductPattern = '';
    this.hasChildren = event.hasChildren;
    this.SelectedID = event.id;
    if (!this.hasChildren) {
      this.SelectedProductPattern = this.SelectedID;
      this.FillGridData(this.SelectedID);
    } else {
      this.SelectedProductPattern = '';
      this.gridrows = [];
      this.gridPriceRows = [];
      this.hasCreate = false;
    }
  }
  onChangeRegionGroup(event) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.PREntitycolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: ' موضوع',
        field: 'Subject',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.EntityTypeParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Subject = params.newValue.Subject;
            params.data.EntityTypeID = params.newValue.EntityTypeID;

            this.ProductRequest.GetAllEntityTypeItem(params.data.EntityTypeID, this.selectedRow.ProductID).subscribe(res => {
              this.PEntityItemrowData = res;
              params.data.ProductEntityItemList = this.PEntityItemrowData;
              if (this.PEntityItemrowData.find(x => x.IsSelected !== true)) {
                this.AllIIsChecked = false;
              } else {
                this.AllIIsChecked = true;
              }
            });
            return true;
          } else {
            params.data.Subject = '';
            return false;
          }
        },
        editable: true,
        width: 300,
        resizable: true,
      },
      {
        headerName: 'اهميت وزني',
        field: 'Value',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Value = params.newValue;
          }
        },
      },
      {
        headerName: 'بدون اقلام',
        field: 'HasNoItem',
        width: 100,
        resizable: true,
        editable: true,
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
          ngTemplate: this.HasNoItem
        },
      },
    ];
    this.PEntityItemcolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'انتخاب',
        field: 'IsSelected',
        width: 70,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsSelectedValid
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsSelected = params.newValue;
            return true;
          } else {
            params.data.IsSelected = false;
            return false;
          }
        },
      },
      {
        headerName: ' موضوع',
        field: 'Subject',
        editable: false,
        width: 220,
        resizable: true,
      },
    ];
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onPriceGridReady(params) {
    this.gridPriceApi = params.api;
  }
  onDeletedRow(event) {
    this.gridPriceRows = [];
  }
  ongridCellValueChanged(event) {
    this.gridPriceRows = [];
    // if (event.oldValue === event.newValue) {
    if ((event.data.GoodPriceList && this.IsProduct === true) ||
      (event.data.ServicePriceList && this.IsProduct === false)) {
      if (this.IsProduct === true) {
        this.gridPriceRows = event.data.GoodPriceList;
      } else {
        this.gridPriceRows = event.data.ServicePriceList;
      }
    } else {
      this.gridPriceRows = [];
    }
    this.selectedRow = event.data;
  }
  RowClick(InputValue) {
    this.PEntityItemrowData = [];
    this.PREntityrowData = [];
    this.gridPriceRows = [];
    if ((this.IsProduct && InputValue.data.GoodPriceList) ||
      (!this.IsProduct && InputValue.data.ServicePriceList)) {
      if (this.IsProduct === true) {
        this.gridPriceRows = InputValue.data.GoodPriceList;
      } else {
        this.gridPriceRows = InputValue.data.ServicePriceList;
      }
    } else {
      this.gridPriceRows = [];
    }
    if (InputValue.data.ProductRequestEntityList && InputValue.data.ProductRequestEntityList.length > 0) {
      this.PREntityrowData = InputValue.data.ProductRequestEntityList;
      if (InputValue.data.ProductRequestEntityList[0].ProductEntityItemList &&
        InputValue.data.ProductRequestEntityList[0].ProductEntityItemList.length > 0) {
        this.PEntityItemrowData = InputValue.data.ProductRequestEntityList[0].ProductEntityItemList;
        if (this.PEntityItemrowData.find(x => x.IsSelected !== true)) {
          this.AllIIsChecked = false;
        } else {
          this.AllIIsChecked = true;
        }
      }
      if (this.PREntityrowData.find(x => x.HasNoItem !== true)) {
        this.AllEIsChecked = false;
      } else {
        this.AllEIsChecked = true;
      }
    }
    this.selectedRow = InputValue.data;
  }
  PriceRowClick(event) {

  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  FillGridData(ID, PricelistTopicSearch = null) {
    this.PatternID = ID;
    if (this.ShowGrid) {
      if (this.IsProduct === true) {
        this.APService.GetArticlePatternGoodsList(ID, PricelistTopicSearch).subscribe(res => {
          this.gridrows = res;
          if (this.gridrows && this.gridrows.length > 0) {
            this.hasCreate = true;
          } else {
            this.hasCreate = false;
          }
        });
      } else {
        this.SPService.GetServicePatternItemList(ID, PricelistTopicSearch).subscribe(res => {
          this.gridrows = res;
          if (this.gridrows && this.gridrows.length > 0) {
            this.hasCreate = true;
          } else {
            this.hasCreate = false;
          }
        });
      }
    }
  }
  GetChildren(event) {
    this.PREntityrowData = [];
    this.PEntityItemrowData = [];
    this.gridPriceRows = [];
    return new Promise((resolve, reject) => {
      if (event.Owner.IsProduct === true) {
        event.Owner.APService.GetArticlePatternChildren(event.ParentID).subscribe(data => {
          const children = [];
          data.forEach(item => {
            children.push({
              name: item.ArticlePatternName,
              id: item.ArticlePatternID,
              hasChildren: !item.IsLeaf,
            });
          });
          resolve(children);
        });
      } else {
        event.Owner.SPService.GetServicePatternChildren(event.ParentID).subscribe(data => {
          const children = [];
          data.forEach(item => {
            children.push({
              name: item.ServicePatternName,
              id: item.ServicePatternID,
              hasChildren: !item.IsLeaf,
            });
          });
          resolve(children);
        });
      }
    });
  }
  GetRoots(event) {
    let nodes = [];
    return new Promise((resolve, reject) => {
      // if (event.Owner.NgSelectParams.selectedObject > 0) {
      if (event.Owner.IsProduct === true) {
        event.Owner.APService.GetArticlePatternRoots(4).subscribe(res => {
          nodes = [];
          res.forEach(item => {
            nodes.push({
              name: item.ArticlePatternName,
              id: item.ArticlePatternID,
              hasChildren: !item.IsLeaf,
            });
          });
          resolve(nodes);
        });
      } else {
        event.Owner.SPService.GetServicePatternRoots(4).subscribe(res => {
          nodes = [];
          res.forEach(item => {
            nodes.push({
              name: item.ServicePatternName,
              id: item.ServicePatternID,
              hasChildren: !item.IsLeaf,
            });
          });
          resolve(nodes);
        });
      }
      // }
    });
  }
  OnCreatePriceListTopic() {
    this.type = 'product-pattern-product-entry';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 30;
    this.PercentWidth = 40;
    this.paramObj = {
      ProductPatternID: this.SelectedID,
      IsProduct: this.IsProduct,
      ProductID: this.selectedRow.ProductID
    };
  }
  OnCreateProductPatternEntry() {
    // this.type = 'app-pattern-entiry';
    // this.HaveHeader = true;
    // this.btnclicked = true;
    // this.startLeftPosition = 449;
    // this.startTopPosition = 87;
    // this.HaveMaxBtn = true;
    // this.HeightPercentWithMaxBtn = 40;
    // this.PercentWidth = 40;
    // this.paramObj = {
    //   PatternID: this.PatternID,
    //   RegionGroupCode: this.NgSelectParams.selectedObject,
    //   IsProduct :this.IsProduct
    // };
  }
  Btnclick(BtnName) {
    if (BtnName === 'update') {
      this.type = 'product-pattern-entry';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 40;
      this.PercentWidth = 40;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        ProductPatternID: this.SelectedID,
        RegionGroupCode: 4,
        hasChildren: this.hasChildren,
        Mode: 'EditMode',
      };
      return;
    }

  }
  OnDeleteProductPatternEntry() {
    this.BtnClickedName = 'BtnDelete2';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
  }
  OnDeletePriceListTopic() {
    if (this.selectedRow && this.selectedRow.data) {
      this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
      this.BtnClickedName = 'BtnDelete';
    } else {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت حذف انتخاب نشده است');
      return;
    }
  }
  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    }
    if (this.BtnClickedName === 'BtnDelete2' && ActionResult === 'YES') {
      this.DoDelete2();
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
  DoDelete2() {
    this.ProductPatternID = this.SelectedID;
    this.ProductPattern.DeleteProductPatternEntry(this.ProductPatternID, this.ModuleCode).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد.');
      });

  }
  DoDelete() {
    this.ProductPatternProductsID = this.selectedRow.data.ProductPatternProductsID;
    this.ProductPattern.DeleteProductPatternProductsList(this.ProductPatternProductsID, this.ModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد.');
      this.FillGridData(this.SelectedID);
    });
  }
  ShowMessageBoxWithYesNoBtn(message) {
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
  getOutPutParam(event) {
    if (event && this.type === 'product-pattern-product-entry') {
      this.FillGridData(this.SelectedID);
    }
    if (event && this.type === 'product-pattern-entry') {
      this.ngOnInit();
      // this.ngAfterViewInit();
    }
  }
  onOkClick() {
    const selectedRows = this.gridApi.getSelectedRows();
    const Result = [];
    if (this.PopUpParam && this.PopUpParam.GroupSelected) {
      if (selectedRows && selectedRows.length) {
        selectedRows.forEach(element => {
          Result.push(element);
          //Result.push(element.ProductPatternName);
        });
        this.RowSelected.emit(Result);
        this.Closed.emit(true);
      } else {
        // if (this.SelectedID) {
        //   this.PriceList.GetPriceListTopicChildren(
        //     this.SelectedID
        //   ).subscribe(res => {
        //     res.forEach(element => {
        //       Result.push(element);
        //     });
        //     this.RowSelected.emit(Result);
        //     this.Closed.emit(true);
        //   });
        // }
      }
    } else {
      if (selectedRows && selectedRows.length) {

        Result.push(selectedRows[0]);
        this.RowSelected.emit(Result);
        this.Closed.emit(true);
      }
    }
  }
  OnSearchPriceListCodeClick() {
    if (this.PricelistTopicSearch !== '' && this.PatternID > 0) {
      this.FillGridData(this.PatternID, this.PricelistTopicSearch);
    }
  }
  Close() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  TreeOkClick() {
    this.RowSelected.emit(this.SelectedProductPattern);
    this.Closed.emit(true);
  }
  IsProductRadioClick(event) {
    this.IsProduct = event;
    this.gridrows = [];
    this.gridPriceRows = [];
    this.PREntityrowData = [];
    this.PEntityItemrowData = [];
    if (this.IsProduct) {
      this.gridcolumns = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          sortable: true,
          filter: true,
          width: 60,
          resizable: true
        },
        {
          headerName: 'کد قلم',
          field: 'GoodsCode',
          sortable: true,
          filter: true,
          width: 85,
          resizable: true,
          editable: false,
        },
        {
          headerName: 'نام قلم',
          field: 'ProductName',
          sortable: true,
          filter: true,
          width: 354,
          resizable: true,
          editable: (event) => {
            if (event.data.ArticlePatternGoodsID > 0)
              return false;
            else
              return true;
          },
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectVSParams,
            Items: [],
            MoreFunc: this.FetchMoreProduct,
            FetchByTerm: this.FetchProductByTerm,
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
              params.data.ProductID = params.newValue.ProductID;
              params.data.ProductName = params.newValue.ProductName;
              params.data.ProductCode = params.newValue.ProductCode;
              params.data.GoodsCode = params.newValue.ProductCode;
              this.gridPriceRows = [];
              return true;
            } else {
              params.data.ProductID = null;
              params.data.ProductName = null;
              params.data.ProductCode = null;
              return false;
            }
          },
        },
      ];
      this.gridPriceColumns = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          sortable: true,
          filter: true,
          width: 60,
          resizable: true
        },
        {
          headerName: 'مبلغ',
          field: 'Price',
          sortable: true,
          filter: true,
          width: 85,
          resizable: true,
          // tslint:disable-next-line: no-shadowed-variable
          editable: (event) => {
            if (this.IsProduct) {
              if (event.data.GoodPriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            } else {
              if (event.data.ServicePriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            }
          },
        },
        {
          headerName: 'تاریخ',
          field: 'PersianGoodPriceDate',
          sortable: true,
          filter: true,
          width: 120,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianGoodPriceDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.SDate;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.MDate) {
              params.data.ShortGoodPriceDate = params.newValue.MDate;
              params.data.PersianGoodPriceDate = params.newValue.SDate;
              return true;
            } else {
              params.data.ShortGoodPriceDate = null;
              params.data.PersianGoodPriceDate = '';
              return false;
            }
          },
          resizable: true,
          // tslint:disable-next-line: no-shadowed-variable
          editable: (event) => {
            if (this.IsProduct) {
              if (event.data.GoodPriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            } else {
              if (event.data.ServicePriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            }
          },
        },
      ];
      this.PREntitycolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 60,
          resizable: true
        },
        {
          headerName: ' موضوع',
          field: 'Subject',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.EntityTypeParams,
            Items: [],
          },
          cellRenderer: 'SeRender',
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.Subject = params.newValue.Subject;
              params.data.EntityTypeID = params.newValue.EntityTypeID;
              this.ProductRequest.GetAllEntityTypeItem(params.data.EntityTypeID, this.selectedRow.ProductID).subscribe(res => {
                this.PEntityItemrowData = res;
                params.data.ProductEntityItemList = this.PEntityItemrowData;
                if (this.PEntityItemrowData.find(x => x.IsSelected !== true)) {
                  this.AllIIsChecked = false;
                } else {
                  this.AllIIsChecked = true;
                }
              });
              return true;
            } else {
              params.data.Subject = '';
              return false;
            }
          },
          editable: true,
          width: 300,
          resizable: true,
        },
        {
          headerName: 'اهميت وزني',
          field: 'Value',
          HaveThousand: true,
          width: 100,
          resizable: true,
          editable: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.Value = params.newValue;
            }
          },
        },
      ];
    } else {
      this.gridcolumns = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          sortable: true,
          filter: true,
          width: 60,
          resizable: true
        },
        {
          headerName: 'کد قلم',
          field: 'ServiceCode',
          sortable: true,
          filter: true,
          width: 85,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام قلم',
          field: 'ProductName',
          sortable: true,
          filter: true,
          width: 354,
          resizable: true,
          editable: (event) => {
            if (event.data.ServicePatternItemID > 0) {
              return false;
            } else {
              return true;
            }
          },
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectVSParams,
            Items: [],
            MoreFunc: this.FetchMoreProduct,
            FetchByTerm: this.FetchProductByTerm,
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
              params.data.ProductID = params.newValue.ProductID;
              params.data.ProductName = params.newValue.ProductName;
              params.data.ProductCode = params.newValue.ProductCode;
              params.data.ServiceCode = params.newValue.ProductCode;
              return true;
            } else {
              params.data.ProductID = null;
              params.data.ProductName = null;
              params.data.ProductCode = null;
              return false;
            }
          },
        },
      ];
      this.gridPriceColumns = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          sortable: true,
          filter: true,
          width: 60,
          resizable: true
        },
        {
          headerName: 'مبلغ',
          field: 'Price',
          sortable: true,
          filter: true,
          width: 85,
          resizable: true,
          // tslint:disable-next-line: no-shadowed-variable
          editable: (event) => {
            if (this.IsProduct) {
              if (event.data.GoodPriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            } else {
              if (event.data.ServicePriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            }
          },
        },
        {
          headerName: 'تاریخ',
          field: 'PersianServicePriceDate',
          sortable: true,
          filter: true,
          width: 120,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianServicePriceDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.SDate;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.MDate) {
              params.data.ShortServicePriceDate = params.newValue.MDate;
              params.data.PersianServicePriceDate = params.newValue.SDate;
              return true;
            } else {
              params.data.ShortServicePriceDate = null;
              params.data.PersianServicePriceDate = '';
              return false;
            }
          },
          resizable: true,
          // tslint:disable-next-line: no-shadowed-variable
          editable: (event) => {
            if (this.IsProduct) {
              if (event.data.GoodPriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            } else {
              if (event.data.ServicePriceID > 0 && !this.IsAdmin) {
                return false;
              } else {
                return true;
              }
            }
          },
        },
      ];
      this.PREntitycolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 60,
          resizable: true
        },
        {
          headerName: ' موضوع',
          field: 'Subject',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.EntityTypeParams,
            Items: [],
          },
          cellRenderer: 'SeRender',
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.Subject = params.newValue.Subject;
              params.data.EntityTypeID = params.newValue.EntityTypeID;

              this.ProductRequest.GetAllEntityTypeItem(params.data.EntityTypeID, this.selectedRow.ProductID).subscribe(res => {
                this.PEntityItemrowData = res;
                params.data.ProductEntityItemList = this.PEntityItemrowData;
                if (this.PEntityItemrowData.find(x => x.IsSelected !== true)) {
                  this.AllIIsChecked = false;
                } else {
                  this.AllIIsChecked = true;
                }
              });
              return true;
            } else {
              params.data.Subject = '';
              return false;
            }
          },
          editable: true,
          width: 300,
          resizable: true,
        },
        {
          headerName: 'اهميت وزني',
          field: 'Value',
          HaveThousand: true,
          width: 100,
          resizable: true,
          editable: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.Value = params.newValue;
            }
          },
        },
        {
          headerName: 'بدون اقلام',
          field: 'HasNoItem',
          width: 100,
          resizable: true,
          editable: true,
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
            ngTemplate: this.HasNoItem
          },
        },
      ];
    }
  }
  OnInsertEntiry(row) {
    this.type = 'entiry-page';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 125;
    this.startTopPosition = 10;
    this.HaveMaxBtn = true;
    this.paramObj = {
      RegionCode: 4,
      ProductID: row.ProductID,
      ProductTypeCode: this.IsProduct ? 1 : 2,
      ProductTypeName: this.IsProduct ? 'کالا' : 'خدمت',
      ProductName: row.ProductName
    };
  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ProductName') {
      const ResultList = [];
      const promise = new Promise((resolve, reject) => {
        this.ProductService.GetProductListPaging(
          this.IsProduct,
          4,
          1,
          30,
          '',
          '')
          .subscribe(res => {
            res.List.forEach(element => {
              ResultList.push(element);
            });
            resolve(res.TotalItemCount);
            // this.RefreshCartable.RefreshItemsVirtualNgSelect({
            //   List: res,
            //   type: 'Product-item'
            // });
          });
      }).then((TotalItemCount: number) => {
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: ResultList,
          term: event.term,
          type: 'Product-item',
          TotalItemCount: TotalItemCount,
          PageCount: Math.ceil(TotalItemCount / 30)
        });
      });
    }
  }
  FetchMoreProduct(event) {
    // event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductService.GetProductListPaging(
        event.Owner.IsProduct,
        4,
        event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption).
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
      event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        type: 'Product-item',
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }
  FetchProductByTerm(event) {
    // event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductService.GetProductListPaging(
      event.Owner.IsProduct,
      4,
      event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption
    ).subscribe(res => {
      event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        type: 'Product-item',
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30)
      });
    });
  }
  onSave() {
    this.PREgridApi.stopEditing();
    this.gridApi.stopEditing();
    this.PEIgridApi.stopEditing();

    const ProductRequestEntityList = [];
    const PEntityItemList = [];
    const GridRows = [];

    this.gridApi.forEachNode(function (node) {
      if (node.data.ServicePriceList.length > 0) {
        node.data.ServicePriceList.forEach(el => {
          el.ServicePriceDate = el.ShortServicePriceDate ? el.ShortServicePriceDate : null;
        });
      }
      GridRows.push(node.data);
      node.data.ProductRequestEntityList.forEach(node2 => {
        ProductRequestEntityList.push(node2);
      });
    });

    if (this.IsProduct) {
      this.APService.SaveArticlePatterGoods(this.PatternID, GridRows, ProductRequestEntityList
      ).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        }
      });
    } else {
      this.SPService.SaveServicePatterItems(this.PatternID, GridRows, ProductRequestEntityList
      ).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        }
      });
    }
  }
  onPREGridReady(Param) {
    this.PREgridApi = Param.api;
  }
  PREntityRowClick(event) {
    if (!event.data.ProductEntityItemList || event.data.ProductEntityItemList.length === 0) {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetAllEntityTypeItem(event.data.EntityTypeID ? event.data.EntityTypeID : -1, this.selectedRow.ProductID).subscribe(res => {
        event.data.ProductEntityItemList = res;
        this.PEntityItemrowData = event.data.ProductEntityItemList;
        if (this.PEntityItemrowData.find(x => x.IsSelected !== true)) {
          this.AllIIsChecked = false;
        } else {
          this.AllIIsChecked = true;
        }
      });
    } else {
      this.PEntityItemrowData = event.data.ProductEntityItemList;
      if (this.PEntityItemrowData.find(x => x.IsSelected !== true)) {
        this.AllIIsChecked = false;
      } else {
        this.AllIIsChecked = true;
      }
    }
  }
  PREntityCellValueChanged(event) {
    this.SelectedPREntityRow = event.data;
    const ProductRequestEntityList = [];

    this.PREgridApi.forEachNode(Node => {
      Node.data.ProductID = this.selectedRow.ProductID;
      ProductRequestEntityList.push(Node.data);
    });
    this.gridApi.forEachNode(Node => {
      if (Node.data.ItemNo === this.selectedRow.ItemNo) {
        Node.data.ProductRequestEntityList = ProductRequestEntityList;
      }
    });
  }
  PREntityonDeletedRow(event) {
    if (event) {
      this.PREntityrowData = [];
      this.PEntityItemrowData = [];
      const items = [];
      this.PREgridApi.forEachNode(node => {
        items.push(node.data);
      });
      this.PREntityrowData = items;
      if (this.PREntityrowData.find(x => x.HasNoItem !== true)) {
        this.AllEIsChecked = false;
      } else {
        this.AllEIsChecked = true;
      }
      this.gridApi.forEachNode(Node => {
        if (Node.data.ItemNo === this.selectedRow.ItemNo) {
          Node.data.ProductRequestEntityList = items;
        }
      });
    }
  }
  onPREntitycellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'Subject') {
      this.ProductRequest.GetAllEntityType().subscribe(res => {
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'entity-type'
        });
      });
    }
  }
  onPEIGridReady(Param) {
    this.PEIgridApi = Param.api;
  }
  PEntityCellValueChanged(event) {
    const EntityItemListrowDataobj = [];
    this.PEIgridApi.forEachNode(Node => {
      EntityItemListrowDataobj.push(Node.data);
    });
    this.gridApi.forEachNode(node => {
      const ProductEntityrowDataobj = [];
      node.data.ProductRequestEntityList.forEachNode(Node2 => {
        if (Node2.data.ItemNo === this.SelectedPREntityRow.ItemNo) {
          Node2.data.ProductEntityItemList = EntityItemListrowDataobj;
        }
        ProductEntityrowDataobj.push(Node2.data);
      });
      if (node.data.ItemNo === this.selectedRow.ItemNo) {
        node.data.ProductRequestEntityList = ProductEntityrowDataobj;
      }
    });
  }
  ongridPriceCellValueChanged(event) {
    this.onChangedPriceGrid(event);
  }
  PriceDeletedRow(event) {
    this.onChangedPriceGrid(event);
  }
  onChangedPriceGrid(event) {
    const ParentItemNo = this.selectedRow.ItemNo;

    this.gridApi.stopEditing();
    this.gridPriceApi.stopEditing();
    const Res = [];
    const itemsToUpdate = [];
    if (this.IsProduct) {
      this.gridPriceApi.forEachNode(function (node) {
        node.data.ParentItemNo = ParentItemNo;
        node.data.GoodPriceDate = node.data.ShortGoodPriceDate ? node.data.ShortGoodPriceDate : null;
        Res.push(node.data);
      });
      this.gridApi.forEachNode(function (node) {
        if (node.data.ItemNo === ParentItemNo) {
          node.data.GoodPriceList = Res;
        } else {
          if (node.data.GoodPriceList && node.data.GoodPriceList.length > 0) {
            node.data.GoodPriceList.forEach((gpi) => {
              gpi.GoodPriceDate = gpi.ShortGoodPriceDate;
            });
          }
        }
        itemsToUpdate.push(node.data);
      });
    } else {
      this.gridPriceApi.forEachNode(function (node) {
        node.data.ParentItemNo = ParentItemNo;
        node.data.ServicePriceDate = node.data.ShortServicePriceDate ? node.data.ShortServicePriceDate : null;
        Res.push(node.data);
      });
      this.gridApi.forEachNode(function (node) {
        if (node.data.ItemNo === ParentItemNo) {
          node.data.ServicePriceList = Res;
        } else {
          if (node.data.ServicePriceList && node.data.ServicePriceList.length > 0) {
            node.data.ServicePriceList.forEach((spi) => {
              spi.ServicePriceDate = spi.ShortServicePriceDate;
            });
          }
        }
        itemsToUpdate.push(node.data);
      });
    }
    this.gridApi.updateRowData({ update: itemsToUpdate });

  }
  OnPRECheckBoxChanged(event) {
    this.AllEIsChecked = event;
    this.PREgridApi.forEachNode(node => {
      node.data.HasNoItem = event;
    });
  }
  OnEICheckBoxChanged(event) {
    this.AllIIsChecked = event;
    this.PEIgridApi.forEachNode(node => {
      node.data.IsSelected = event;
    });
  }
}
