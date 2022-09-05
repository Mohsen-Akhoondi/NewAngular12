import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { GridOptions } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';

@Component({
  selector: 'app-request-period-report',
  templateUrl: './request-period-report.component.html',
  styleUrls: ['./request-period-report.component.css']
})
export class RequestPeriodReportComponent implements OnInit {
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    clearable: false,
    IsDisabled: false,
  }
  ReigonListSet = [];
  FromProductRequestDate: any;
  ToProductRequestDate: any;

  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  columnDef;
  rowData = [];
  NgSelectTimesParams = {
    Items: [],
    bindLabelProp: 'NoTimesName',
    bindValueProp: 'NoTimesCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: false,
    clearable: true,
    IsDisabled: false,
  };
  TimesListSet = [];
  ModuleCode;
  SelectedRegion;
  // CostCenterItems;
  // CostCenterParams = {
  //   bindLabelProp: 'CostCenterName',
  //   bindValueProp: 'CostCenterId',
  //   placeholder: '',
  //   MinWidth: '155px',
  //   selectedObject: null,
  //   loading: false,
  //   IsVirtualScroll: false,
  //   IsDisabled: false,
  //   Required: true
  // };
  NgSelectNodeParams = {
    bindLabelProp: 'WorkflowNodeName',
    bindValueProp: 'WorkflowNodeID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'node'
  };
  // DealMethodItems;
  // DealMethodParams = {
  //   bindLabelProp: 'DealMethodName',
  //   bindValueProp: 'DealMethodCode',
  //   placeholder: '',
  //   selectedObject: null,
  //   loading: false,
  //   IsVirtualScroll: false,
  //   IsDisabled: false,
  //   Required: true
  // };
  // DealMethodCode;
  DealMethodName;
  ProductRequestNo;
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.TotalDaysOfRequest > 3) {
        return { 'background-color': '#FFC0CB' };
      }
    }
  };
  constructor(private router: Router,
    private ProductRequest: ProductRequestService,
    private RegionService: RegionListService,
    private route: ActivatedRoute
  ) {
    this.columnDef = [];
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.getNewData();
    this.ColumnsDefinition();
    // this.SetDealMethodItems();
  }
  getNewData(): void {
    this.RegionService.GetRegionList(this.ModuleCode).subscribe(res => {
      this.ReigonListSet = res;
    });
  }
  onChangeReigonObj(param) {
    this.SelectedRegion = param;
  }
  popupclosed() {
    this.btnclicked = false;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  ColumnsDefinition() {
    this.columnDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'معاونت مجری',
        field: 'CostCenterName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ پیشنهادی',
        field: 'SumFinalAmount',
        HaveThousand: true,
        width: 150,
        resizable: true,
      },
      {
        headerName: 'روش انجام معامله',
        field: 'DealMethodName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ ثبت درخواست',
        field: 'PersianProductRequestDate',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نام آخرین گردش درخواست(نود آخر)',
        field: 'WorkflowNodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectNodeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowNodeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkflowNodeName) {
            params.data.WorkflowNodeName = params.newValue.WorkflowNodeName;
            params.data.WorkflowNodeID = params.newValue.WorkflowNodeID;
            return true;
          } else {
            params.data.WorkflowNodeName = '';
            params.data.WorkflowNodeID = null;
            return false;
          }
        },
        width: 220,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'طول مدت زمان آخرین گردش (روز)',
        field: 'TotalDaysOfWorkflow',
        width: 220,
        resizable: true,
        editable: true
      },
      {
        headerName: 'طول مدت کل درخواست (روز)',
        field: 'TotalDaysOfRequest',
        width: 220,
        resizable: true,
        editable: true
      },
    ];
  }
  Search() {
    if (this.NgSelectRegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
      return;
    }
    this.ProductRequest.GetRequestDurationRep(
      this.NgSelectRegionParams.selectedObject,
      this.ProductRequestNo).subscribe(res => {
        this.rowData = res;
      });
  }

  // onChangeDealMethod(event) {
  //   this.DealMethodCode = event;
  //   this.ProductRequest.GetDealMwthodByID(event).subscribe(res => {
  //     this.DealMethodName = res.DealMethodName;
  //   });
  // }

  // SetDealMethodItems(resolve = null) {
  //   this.DealMethodParams.selectedObject = null;
  //   this.DealMethodItems = [];
  //   this.ProductRequest.GetDealMethodListforPRSearch().subscribe(res => {
  //     this.DealMethodItems = res;
  //     this.DealMethodItems.forEach((item) => {
  //       if (item.IsCost) {
  //         item.DealMethodName = item.DealMethodName + ' - ' + 'هزينه اي';
  //       } else {
  //         item.DealMethodName = item.DealMethodName + ' - ' + 'درآمدي';
  //       }
  //     });
  //   });
  // }
  // OnOpenNgSelect() {
  //       this.ProductRequest.GetCostCenterByRegion(this.NgSelectRegionParams.selectedObject, null, null, true).subscribe(res =>
  //         this.CostCenterItems = res
  //       );
  // }
}
