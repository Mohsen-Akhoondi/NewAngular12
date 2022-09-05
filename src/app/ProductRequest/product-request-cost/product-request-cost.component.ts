import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { of } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-product-request-cost',
  templateUrl: './product-request-cost.component.html',
  styleUrls: ['./product-request-cost.component.css']
})
export class ProductRequestCostComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestCostClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ProductRequestCode;
  ProductRequestDate;
  CurrentSubCostCenterID;
  CostProductAssetNgSelectVSParams = {
    bindLabelProp: 'CostProductName',
    bindValueProp: 'CostProductId',
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
        [{ HeaderCaption: 'کد محصول', HeaderName: 'CostProductCode', width: 35, MinTermLenght: 3, SearchOption: 'CostProductCode' },
        { HeaderCaption: 'نام محصول', HeaderName: 'CostProductName', width: 53, MinTermLenght: 3, SearchOption: 'CostProductName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد محصول', width: 35, },
        { HeaderCaption: 'نام محصول', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  CostFactorID;
  Subject;
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

  constructor(private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private RefreshPersonItems: RefreshServices) {
    this.ProductRequestCostColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'مرکز هزینه اصلی',
        field: 'CostCenterName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'CostCenterName',
          bindValueProp: 'CostCenterId'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CostCenterName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'مرکز هزینه فرعی',
        field: 'SubCostCenterName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'SubCostCenterName',
          bindValueProp: 'SubCostCenterId'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SubCostCenterName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'محل هزینه',
        field: 'UnitTopicName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'UnitTopicName',
          bindValueProp: 'UnitPatternID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.UnitTopicName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 450,
        resizable: true
      },
      {
        headerName: 'محصول',
        field: 'CostProductName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.CostProductAssetNgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreCostProduct,
          FetchByTerm: this.FetchCostProductByTerm,
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
        editable: true,
        width: 300,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.PRCostRowData = this.ProductRequestObject.RequestCostList;
    this.Subject = this.PopupParam.Subject;
    this.ProductRequestDate = this.PopupParam.ProductRequestDate;
    this.ProductRequestCode = this.PopupParam.ProductRequestCode;
    this.SelectedRegionCode = this.PopupParam.RegionCode;
    this.CostFactorID = this.PopupParam.CostFactorID;
    this.ProductRequestCostColDef[1].cellEditorParams.Items = this.ProductRequest.GetCostCenterByRegion(this.SelectedRegionCode,
      null, null, false);
    this.ProductRequestCostColDef[3].cellEditorParams.Items = this.ProductRequest.GetUnitPatternByRegionCode(this.SelectedRegionCode
      , false);
    this.User.GetModulOPByUser(2516).subscribe(res => {
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
    if (event.newValue && event.colDef && event.colDef.field === 'CostCenterName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequestCostColDef[2].cellEditorParams.Items = this.ProductRequest.GetSubCostCenter(event.newValue.CostCenterId, null, false);

    }

    if (event.newValue && event.colDef && event.colDef.field === 'SubCostCenterName') {
      this.CurrentSubCostCenterID = event.newValue.SubCostCenterId;
      // this.ProductRequestCostColDef[4].cellEditorParams.Items = this.ProductRequest.
      //   GetCostProductBySubCostCenter(event.newValue.SubCostCenterId, this.RegionParams.selectedObject, false);
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
    this.PRCostGridApi.stopEditing();
    const ProductRequestCostList = [];
    if (!this.ProductRequestObject.ProductRequestCostID) {
      this.ProductRequestID = -1;
    } else { this.ProductRequestID = this.ProductRequestObject.ProductRequestCostID; }
    this.PRCostGridApi.forEachNode(node => {
      const ProductRequestCostObj = {

        ProductRequestCostID: node.data.ProductRequestCostID ? node.data.ProductRequestCostID : -1,
        CostFactorID: this.ProductRequestObject.CostFactorID,
        //  tslint:disable-next-line:max-line-length
        UnitPatternID: node.data.UnitTopicName && node.data.UnitTopicName.UnitPatternID ? node.data.UnitTopicName.UnitPatternID : (node.data.UnitPatternID ? node.data.UnitPatternID : null),
        //  tslint:disable-next-line:max-line-length
        CostProductID: node.data.CostProductName && node.data.CostProductName.CostProductId ? node.data.CostProductName.CostProductId : (node.data.CostProductId ? node.data.CostProductId : null),
        //  tslint:disable-next-line:max-line-length
        SubCostCenterID: node.data.SubCostCenterName && node.data.SubCostCenterName.SubCostCenterId ? node.data.SubCostCenterName.SubCostCenterId : (node.data.SubCostCenterID ? node.data.SubCostCenterID : null),
      };
      ProductRequestCostList.push(ProductRequestCostObj);
    });
    this.ProductRequest.SaveProductRequestCost(this.ProductRequestObject, this.CostFactorID, ProductRequestCostList).subscribe(res => {
      this.ProductRequestObject = res;
      this.PRCostRowData = this.ProductRequestObject.RequestCostList;
      this.PopupOutPut.emit(this.ProductRequestObject);
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد!';
      }
    );
  }
  FetchMoreCostProduct(event) {
    event.Owner.ProductRequestCostColDef[4].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetCostProductBySubCostCenter(
        event.Owner.CurrentSubCostCenterID,
        event.Owner.SelectedRegionCode,
        event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        false).subscribe(res => {
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
  FetchCostProductByTerm(event) {
    event.Owner.ProductRequestCostColDef[4].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetCostProductBySubCostCenter(
      event.Owner.CurrentSubCostCenterID,
      event.Owner.SelectedRegionCode,
      event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      false
    ).subscribe(res => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30)
      });
    });
  }
  onPRCostcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'CostProductId' && this.CurrentSubCostCenterID) {
      this.ProductRequestCostColDef[4].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetCostProductBySubCostCenter(
        this.CurrentSubCostCenterID,
        this.SelectedRegionCode,
        1,
        30,
        '',
        '',
        false).
        subscribe(res => {
          this.ProductRequestCostColDef[4].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

}
