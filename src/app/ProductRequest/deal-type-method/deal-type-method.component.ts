import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { DealTypeService } from 'src/app/Services/DealTypeService/DealTypeService';
import { DealMethodServices } from 'src/app/Services/DealMethodService/DealMethodService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-deal-type-method',
  templateUrl: './deal-type-method.component.html',
  styleUrls: ['./deal-type-method.component.css']
})
export class DealTypeMethodComponent implements OnInit {

  gridApi: any;
  DealTypeMethodColDef: any;
  rowData;
  ResultList: any[];
  IsArchive = false;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };

  constructor(
    private router: Router,
    private Common: CommonService,
    private DealTypeServices: DealTypeService,
    private DealMethodService: DealMethodServices,
    private ProductRequest: ProductRequestService
  ) {
  }

  ngOnInit() {
    this.DealTypeMethodColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'گروه واحد اجرایی',
        field: 'RegionGroupName',
        width: 200,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Common.GetAllRegionGroup(false),
          bindLabelProp: 'RegionGroupName',
          bindValueProp: 'RegionGroupCode',
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RegionGroupName) {
            params.data.RegionGroupName = params.newValue.RegionGroupName;
            params.data.RegionGroupCode = params.newValue.RegionGroupCode;
            params.data.Rank = '';
            return true;
          }
        },
        cellRenderer: 'SeRender',
        editable: true,
        resizable: true,
      },
      {
        headerName: 'معامله',
        field: 'DealTypeName',
        width: 200,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.DealTypeServices.GetDealTypeList(),
          bindLabelProp: 'DealTypeName',
          bindValueProp: 'DealTypeCode',
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.DealTypeName) {
            params.data.DealTypeName = params.newValue.DealTypeName;
            params.data.DealTypeCode = params.newValue.DealTypeCode;
            params.data.Rank = '';
            return true;
          }
        },
        cellRenderer: 'SeRender',
        editable: true,
        resizable: true,
      },
      {
        headerName: 'روش انجام معامله',
        field: 'DealMethodName',
        width: 200,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.DealMethodService.GetDealMethodType(),
          bindLabelProp: 'DealMethodName',
          bindValueProp: 'DealMethodCode',
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.DealMethodName) {
            params.data.DealMethodName = params.newValue.DealMethodName;
            params.data.DealMethodCode = params.newValue.DealMethodCode;
            params.data.Rank = '';
            return true;
          }
        },
        cellRenderer: 'SeRender',
        editable: true,
        resizable: true,
      }
    ];

    this.ProductRequest.GetAllDealTypeMethodList().subscribe((res: any) => {
      this.rowData = res;
    });
  }

  Save() {
    this.gridApi.stopEditing();
    this.ResultList = [];
    this.gridApi.forEachNode(items => {
      const DealList = {
        RegionGroupName: items.data.RegionGroupName,
        RegionGroupCode: items.data.RegionGroupCode,
        DealTypeName: items.data.DealTypeName,
        DealTypeCode: items.data.DealTypeCode,
        DealMethodName: items.data.DealMethodName,
        DealMethodCode: items.data.DealMethodCode,
        DealTypeMethodID: items.data.DealTypeMethodID
      };
      this.ResultList.push(DealList);
    });
    this.ProductRequest.SaveDealTypeMethodList(this.ResultList).subscribe(res => {
      this.rowData = res;
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = false;
      this.HaveMaxBtn = false;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    });
  }

  GridReady(event) {
    this.gridApi = event.api;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed() {
    this.btnclicked = false;
  }
}
