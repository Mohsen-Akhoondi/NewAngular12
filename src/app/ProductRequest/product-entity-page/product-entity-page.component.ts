import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { isUndefined } from 'util';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-product-entity-page',
  templateUrl: './product-entity-page.component.html',
  styleUrls: ['./product-entity-page.component.css']
})
export class ProductEntityPageComponent implements OnInit {

  private PRIgridApi;
  PRItemcolumnDef;
  PRItemrowData: any = [];

  private PREgridApi;
  PREntitycolumnDef;
  PREntityrowData = [];

  private PEIgridApi;
  PEntityItemcolumnDef;
  PEntityItemrowData: any;

  IsCost = true;
  ReigonListSet = [];
  NgSelectRegionParams = {
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
  ModuleCode;
  btnclicked = false;
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  PopupType;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader = false;
  defaultSelectedRowIndex = 0;
  SelectedPRItemRow: any;
  SelectedPREntityRow: any;
  SelectedPEntityItemRow: any;
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
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
    },
    type: 'ProductType'
  };
  ProdcutTypeCode: any;
  ResResult: any;
  ProductList: any;

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
  ProductTypeParams = {
    bindLabelProp: 'ProductTypeName',
    bindValueProp: 'ProductTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Product-Type',
  };

  @ViewChild('IsSelectedValid') IsSelectedValid: TemplateRef<any>;
  constructor(private RegionService: RegionListService,
    private ProductRequest: ProductRequestService,
    private Module: ModuleService,
    private route: ActivatedRoute,
    private RefreshItems: RefreshServices,
    private ContractService: ContractListService,
    private router: Router,
    private CommonServic: CommonServices,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.PRItemcolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.ProductTypeParams,
          Items: this.ProductTypeList,
          Owner: this
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
              params.data.ScaleName = null;
              params.data.ProductID = null;
              params.data.ProductName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductName = null;
            return false;
          }
        },
        editable: true,
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
            if (this.SelectedPRItemRow) {
              this.SelectedPRItemRow.ProductID = params.newValue.ProductID;
              this.SelectedPRItemRow.ProductRequestEntityList.forEach(element => {
                element.ProductID = params.newValue.ProductID;
              });
            }

            return true;
          } else {
            params.data.ProductName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: true,
        width: 350,
        resizable: true
      },
    ];

    this.PREntitycolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
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
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.Subject;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Subject = params.newValue.Subject;
            params.data.EntityTypeID = params.newValue.EntityTypeID;
            const items = [];
            this.PREgridApi.forEachNode(node => {
              node.data.EntityTypeID = node.data.EntityTypeID && node.data.EntityTypeID > 0
                && !isUndefined(node.data.EntityTypeID)
                ? node.data.EntityTypeID : -1;
              node.data.ProductRequestEntityID = node.data.ProductRequestEntityID && node.data.ProductRequestEntityID > 0
                && !isUndefined(node.data.ProductRequestEntityID) ? node.data.ProductRequestEntityID
                : this.SelectedPRItemRow.ProductRequestEntityID;
              node.data.ProductID = node.data.ProductID && node.data.ProductID > 0
                && !isUndefined(node.data.ProductID) ? node.data.ProductID
                : this.SelectedPRItemRow.ProductID;
              items.push(node.data);
            });
            this.SelectedPRItemRow.ProductRequestEntityList = items;
            this.ProductRequest.GetAllEntityTypeItem(params.data.EntityTypeID, this.SelectedPRItemRow.ProductID).subscribe(res => {
              this.PEntityItemrowData = res;
              params.data.EntityItemList = this.PEntityItemrowData;
            });
            return true;
          } else {
            params.data.Subject = '';
            return false;
          }
        },
        editable: true,
        width: 470,
        resizable: true,
      },
    ];
  }

  ngOnInit() {
    this.RegionService.GetRegionList(this.ModuleCode, false).subscribe(res => {
      this.ReigonListSet = res;
      this.NgSelectRegionParams.selectedObject = res[0].RegionCode;
      this.onChangeReigonObj(this.NgSelectRegionParams.selectedObject);
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.PEntityItemcolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'انتخاب',
        field: 'IsSelected',
        width: 90,
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
        width: 380,
        resizable: true,
      },
    ];
  }

  onPRItemGridReady(Param) {
    this.PRIgridApi = Param.api;
  }

  onPREGridReady(Param) {
    this.PREgridApi = Param.api;
  }

  onPEIGridReady(Param) {
    this.PEIgridApi = Param.api;
  }
  onChangeReigonObj(event) {
    this.PRItemrowData = [];
    this.PREntityrowData = [];
    this.PEntityItemrowData = [];
    this.ResResult = [];
    this.ProductList = [];
    this.ProductRequest.GetProductRequestEntityByRegionList(event).subscribe(res => {
      if (res) {
        this.PRItemrowData = res;
      }
    });
  }

  PRItemRowClick(event) {
    this.PREgridApi.stopEditing();
    if (event.data.ProductRequestEntityList) {
      this.PREntityrowData = event.data.ProductRequestEntityList;
    } else {
      this.PREntityrowData = [];
      this.PEntityItemrowData = [];
    }
    this.SelectedPRItemRow = event.data;
  }

  PREntityRowClick(event) {
    this.SelectedPREntityRow = event.data;
    if (!event.data.EntityItemList) {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetAllEntityTypeItem(event.data.EntityTypeID ? event.data.EntityTypeID : -1, this.SelectedPRItemRow.ProductID).subscribe(res => {
        event.data.EntityItemList = res;
        this.PEntityItemrowData = event.data.EntityItemList;
      });
    } else {
      this.PEntityItemrowData = event.data.EntityItemList;
    }

  }

  PEntityItemRowClick(event) {
    this.SelectedPEntityItemRow = event.data;
  }


  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onSave() {

    this.PREgridApi.stopEditing();
    this.PRIgridApi.stopEditing();
    this.PEIgridApi.stopEditing();

    const ProductRequestEntityList = [];
    const PEntityItemList = [];
    this.PRIgridApi.forEachNode(function (node) {
      if (node.data.ProductRequestEntityList) {
        node.data.ProductRequestEntityList.forEach(element => {
          ProductRequestEntityList.push(element);

          if (element.EntityItemList) {
            element.EntityItemList.forEach(elementt => {
              if (elementt.IsSelected) {
                const Obj = {
                  ProductID: element.ProductID,
                  EntityTypeID: elementt.EntityTypeID,
                  EntityTypeItemID: elementt.EntityTypeItemID,
                };
                PEntityItemList.push(Obj);
              }
            });
          }
        });
      }
    });

    // tslint:disable-next-line: max-line-length
    this.ProductRequest.SavePREntityList(ProductRequestEntityList, this.NgSelectRegionParams.selectedObject, PEntityItemList).subscribe(res => {
      if (res) {
        this.onChangeReigonObj(this.NgSelectRegionParams.selectedObject);
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
      }
    }
    );
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 545;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.PopupType = '';
  }

  PREntityCellValueChanged(event) {
    const items = [];
    this.PREgridApi.forEachNode(node => {
      node.data.EntityTypeID = node.data.EntityTypeID && node.data.EntityTypeID > 0
        && !isUndefined(node.data.EntityTypeID)
        ? node.data.EntityTypeID : -1;
      node.data.ProductRequestEntityID = node.data.ProductRequestEntityID && node.data.ProductRequestEntityID > 0
        && !isUndefined(node.data.ProductRequestEntityID) ? node.data.ProductRequestEntityID
        : this.SelectedPRItemRow.ProductRequestEntityID;
      node.data.ProductID = node.data.ProductID && node.data.ProductID > 0
        && !isUndefined(node.data.ProductID) ? node.data.ProductID
        : this.SelectedPRItemRow.ProductID;
      items.push(node.data);
    });
    this.SelectedPRItemRow.ProductRequestEntityList = items;
  }

  PREntityonDeletedRow(event) {
    if (event) {
      this.PREntityrowData = [];
      const items = [];
      this.PREgridApi.forEachNode(node => {
        items.push(node.data);
      });
      this.SelectedPRItemRow.ProductRequestEntityList = items;
    }
  }

  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.NgSelectRegionParams.selectedObject,
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
      event.Owner.RefreshItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'ProductType'
      });
    });
  }

  FetchProductByTerm(event) {

    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.NgSelectRegionParams.selectedObject,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ProductType'
        });
      });
  }

  RedioSelectedChange(event) {
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.NgSelectRegionParams.selectedObject,
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ProductType'
        });
      });
  }

  onPREntitycellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'Subject') {
      this.ProductRequest.GetAllEntityType().subscribe(res => {
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'entity-type'
        });
      });
    }
  }

  oncellEditingStarted(event) {
    this.PRIgridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });

    if (event.colDef && event.colDef.field === 'ProductName') {
      this.ProductRequest.GetProductList(0,
        this.NgSelectRegionParams.selectedObject,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        this.IsCost,
        event.data.ProductID).
        subscribe(res => {
          this.RefreshItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'ProductType'
          });
        });
    }
  }
}
