import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isUndefined } from 'util';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-article31-page',
  templateUrl: './article31-page.component.html',
  styleUrls: ['./article31-page.component.css']
})
export class Article31PageComponent implements OnInit {
  ModuleCode;
  columnDef: any;
  rowData: any;
  gridApi: any;
  gridHeight = 91;
  mainBodyHeight = 95;
  btnclicked: boolean;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  // itemNo = 0;
  @ViewChild('Article31IsCost') Article31IsCost: TemplateRef<any>;
  RegionGroupListSet = [];
  NgSelectRegionGroupParams = {
    Items: [],
    bindLabelProp: 'RegionGroupCodeName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  NgSelectDMParams = {
    bindLabelProp: 'DealMethodName',
    bindValueProp: 'DealMethodCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'deal-method'
  };

  constructor(private router: Router,
    private User: UserSettingsService,
    private route: ActivatedRoute,
    private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private RefreshPersonItems: RefreshServices) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.rowData = [];
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      this.HaveUpdate = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          case 6:
            this.HaveDelete = true;
            break;
          default:
            break;
        }
      });
    });
    this.RegionList.GetRegionGroupList().subscribe(res => {
      this.RegionGroupListSet = res;
      this.NgSelectRegionGroupParams.selectedObject = res[0].RegionGroupCode;
      this.getNewData();
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef = [

      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'هزینه ای',
        field: 'IsCost',
        width: 80,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Article31IsCost
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsCost = params.newValue;
            params.data.DealMethodName = '';
            params.data.DealMethodCode = null;
            return true;
          } else {
            params.data.IsCost = false;
            params.data.DealMethodName = '';
            params.data.DealMethodCode = null;
            return false;
          }
        },
        editable: true
      },
      {
        headerName: 'روش انجام معامله',
        field: 'DealMethodName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectDMParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.DealMethodName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.DealMethodName) {
            params.data.DealMethodName = params.newValue.DealMethodName;
            params.data.DealMethodCode = params.newValue.DealMethodCode;
            return true;
          } else {
            params.data.DealMethodName = '';
            params.data.DealMethodCode = null;
            return false;
          }
        },
        editable: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'کد ماده 31',
        field: 'Article31Code',
        HaveThousand: false,
        width: 90,
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
            params.data.Article31Code = params.newValue;
          }
        },
      },
      {
        headerName: 'نام ماده 31',
        field: 'Article31Name',
        editable: true,
        width: 500,
        resizable: true
      },
    ];
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onChangeRegionGroupObj(selectedRegionGroup) {
    this.getNewData();
  }
  getNewData(): any {
    this.ProductRequest.GetArticle31DataList(this.NgSelectRegionGroupParams.selectedObject).subscribe(res => {
      this.rowData = res;
    });
  }

  onCellValueChanged(event) {
    let itemsToUpdate = [];
    if (event.columnDef && event.columnDef.field === 'IsCost') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.IsCost = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'DealMethodName') {
      this.columnDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetDealMethodListforArticle31(event.data.IsCost ? event.data.IsCost : false).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'deal-method'
        });
      });
      this.columnDef[2].cellEditorParams.Params.loading = false;
    }
  }

  onSave() {
    this.gridApi.stopEditing();
    const RowData = [];
    const Article31List = [];
    this.gridApi.forEachNode(function (node) {
      RowData.push(node.data);
    });
    RowData.forEach(item => {
      const Article31Obj = {
        Article31ID: item.Article31ID ? item.Article31ID : -1,
        // tslint:disable-next-line: max-line-length
        RegionGroupCode: item.ReRegionGroupCode ? item.RegionGroupCode : (this.NgSelectRegionGroupParams.selectedObject && this.NgSelectRegionGroupParams.selectedObject != null && !isUndefined(this.NgSelectRegionGroupParams.selectedObject) ? this.NgSelectRegionGroupParams.selectedObject : null),
        IsCost: item.IsCost ? item.IsCost : false,
        // tslint:disable-next-line: max-line-length
        DealMethodCode: item.DealMethodName && item.DealMethodName.DealMethodCode ? item.DealMethodName.DealMethodCode : (item.DealMethodCode ? item.DealMethodCode : null),
        Article31Code: item.Article31Code ? item.Article31Code : null,
        Article31Name: item.Article31Name ? item.Article31Name : null,
        ItemNo: item.ItemNo
      };
      Article31List.push(Article31Obj);
    });

    this.ProductRequest.SaveArticle31(Article31List, this.ModuleCode, this.NgSelectRegionGroupParams.selectedObject).subscribe(res => {
      this.btnclicked = true;
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.btnclicked = true;
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }

  close() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed() {
    this.btnclicked = false;
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

}
