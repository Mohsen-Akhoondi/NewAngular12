import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { isUndefined } from 'util';

@Component({
  selector: 'app-filter-document-type',
  templateUrl: './filter-document-type.component.html',
  styleUrls: ['./filter-document-type.component.css']
})
export class FilterDocumentTypeComponent implements OnInit {
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
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  RegionListSet = [];
  ChildDocumentTypeItems;
  ChildDocumentTypeParams = {
    bindLabelProp: 'DocumentTypeName',
    bindValueProp: 'DocumentTypeCode',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: 200,
    type: 'child-doc-type',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد مستند', HeaderName: 'DocumentTypeCode', width: 35, MinTermLenght: 1, SearchOption: 'DocumentTypeCode' },
        { HeaderCaption: 'نام مستند', HeaderName: 'DocumentTypeName', width: 58, MinTermLenght: 2, SearchOption: 'DocumentTypeName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد مستند', width: 35, },
        { HeaderCaption: 'نام مستند', width: 58, }],
      HaveItemNo: true,
      ItemNoWidth: 20
    }
  };

  constructor(private router: Router,
    private User: UserSettingsService,
    private route: ActivatedRoute,
    private RegionList: RegionListService,
    private RefreshItems: RefreshServices,
    private Common: CommonService) {
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 80,
          resizable: false,
          editable: false,
        },
        {
          headerName: 'نوع مستند',
          field: 'DocumentTypeName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.ChildDocumentTypeParams,
            Items: [],
            MoreFunc: this.FetchMoreChildDocumentType,
            FetchByTerm: this.FetchChildDocumentTypeByTerm,
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.DocumentTypeName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.DocumentTypeCode) {
              params.data.DocumentTypeCode = params.newValue.DocumentTypeCode;
              params.data.DocumentTypeName = params.newValue.DocumentTypeName;
              return true;
            } else {
              params.data.DocumentTypeCode = null;
              params.data.DocumentTypeName = '';
              return false;
            }
          },
          editable: true,
          width: 400,
          resizable: true
        },

,

     ];
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
    this.RegionList.GetRegionList(this.ModuleCode).subscribe(res => {
      this.RegionListSet = res;
      this.RegionParams.selectedObject = res[0].RegionCode;
      this.getNewData();
    });
  }

  onChangeRegionObj(event) {
    this.getNewData();
  }

  getNewData() {
    this.Common.GetFilterDocTypeList(this.RegionParams.selectedObject).subscribe(res => {
      this.rowData = res;
    });
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  oncellEditingStarted(event) {
    this.columnDef[1].cellEditorParams.Params.loading = true;
    if (event.colDef && event.colDef.field === 'DocumentTypeName') {
      this.Common.GetChildDocTypePaging(1, 30, '', '', event.data.DocumentTypeCode).subscribe(res => {
        this.ChildDocumentTypeItems = res.List;
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'child-doc-type'
        });
      });
    }
  }
  FetchMoreChildDocumentType(event) {
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Common.GetChildDocTypePaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption).subscribe(res => {
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
        type: 'child-doc-type'
      });
    });
  }
  FetchChildDocumentTypeByTerm(event) {
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'DocumentTypeCode';
    }
    if (event.Owner) {
      event.Owner.Common.GetChildDocTypePaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
          event.Owner.RefreshItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'child-doc-type'
          });
        });
    }
  }
  onSave() {
    this.gridApi.stopEditing();
    const RowData = [];
    const FilterDocTypeList = [];
    this.gridApi.forEachNode(function (node) {
      RowData.push(node.data);
    });
    RowData.forEach(item => {
      const FilterDocTypeObj = {
        FilterDocumentTypeID: item.FilterDocumentTypeID ? item.FilterDocumentTypeID : -1,
        // tslint:disable-next-line: max-line-length
        RegionCode: item.ReRegionCode ? item.RegionCode : (this.RegionParams.selectedObject && this.RegionParams.selectedObject != null && !isUndefined(this.RegionParams.selectedObject) ? this.RegionParams.selectedObject : null),
        IsCost: item.IsCost ? item.IsCost : false,
        // tslint:disable-next-line: max-line-length
        DocumentTypeCode: item.DocumentTypeName && item.DocumentTypeName.DocumentTypeCode ? item.DocumentTypeName.DocumentTypeCode : (item.DocumentTypeCode ? item.DocumentTypeCode : null),
        ItemNo: item.ItemNo
      };
      FilterDocTypeList.push(FilterDocTypeObj);
    });

      this.Common.SaveFilterDocType(FilterDocTypeList, this.ModuleCode, this.RegionParams.selectedObject).subscribe(res => {
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
