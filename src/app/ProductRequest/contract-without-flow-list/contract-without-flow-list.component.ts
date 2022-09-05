import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { GridOptions } from 'ag-grid-community';
import { of } from 'rxjs';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';

@Component({
  selector: 'app-contract-without-flow-list',
  templateUrl: './contract-without-flow-list.component.html',
  styleUrls: ['./contract-without-flow-list.component.css']
})
export class ContractWithoutFlowListComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  rowData: any;
  SelectedRegionObject;
  RegionListSet = [];
  btnclicked = false;
  type: string;
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (!params.data.ContractCode) {
        return { 'background-color': '#fffec2' };
      }
    }
  };
  selectedRow: any;
  @Input() ModuleCode;
  @Input() ModuleName;
  paramObj;
  HaveHeader: boolean;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel = 645;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 84;
  private sub: any;
  HasRegion = true;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  EnableDelete = false;
  ShowInsert = false;
  WorkflowObjectCode;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  constructor(private router: Router,
    private RegionList: RegionListService,
    private ContractList: ContractListService,
    config: NgSelectConfig,
    private RefreshCartable: RefreshServices,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private ContPayService: ContractPayService) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    if (this.ModuleCode && this.ModuleCode === 3037) {
      this.columnDef = [
        {
          headerName: 'رديف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'کد واحد اجرایی',
          field: 'RegionCode',
          width: 100,
          resizable: true
        },
        {
          headerName: 'سال مالی ',
          field: 'FinYearCode',
          width: 90,
          resizable: true,
          sortable: true,
        },
        {
          headerName: ' کد صورتجلسه',
          field: 'ContractCode',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: ' نوع قرارداد',
          field: 'ContractTypeName',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'شماره نامه',
          field: 'LetterNo',
          width: 120,
          resizable: true
        },
        {
          headerName: 'پیمانکار',
          field: 'ContractorName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مبلغ',
          field: 'ContractAmount',
          HaveThousand: true,
          width: 150,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 600,
          resizable: true
        }
      ];
    }
    else {
      this.columnDef = [
        {
          headerName: 'اطلاعات درخواست',
          children: [
            {
              headerName: 'ردیف ',
              field: 'ItemNo',
              width: 80,
              resizable: true
            },
            {
              headerName: 'وضعیت',
              field: 'WithOutFlowStatus',
              width: 90,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'شماره',
              field: 'ProductRequestNo',
              width: 100,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'تاریخ',
              field: 'PersianProductRequestDates',
              width: 120,
              resizable: true
            },
            {
              headerName: 'درخواست کننده',
              field: 'PersonName',
              width: 150,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'موضوع',
              field: 'ProductRequestSubject',
              width: 350,
              resizable: true
            },
          ]
        },
        {
          headerName: 'اطلاعات قرارداد',
          children: [
            {
              headerName: 'کد واحد اجرایی',
              field: 'RegionCode',
              width: 100,
              resizable: true
            },
            {
              headerName: 'سال مالی ',
              field: 'FinYearCode',
              width: 90,
              resizable: true,
              sortable: true,
            },
            {
              headerName: ' کد قرارداد',
              field: 'ContractCode',
              width: 100,
              resizable: true,
              sortable: true,
            },
            {
              headerName: ' نوع قرارداد',
              field: 'ContractTypeName',
              width: 100,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'شماره نامه',
              field: 'LetterNo',
              width: 120,
              resizable: true
            },
            {
              headerName: 'پیمانکار',
              field: 'ContractorName',
              width: 120,
              resizable: true
            },
            {
              headerName: 'مبلغ',
              field: 'ContractAmount',
              HaveThousand: true,
              width: 150,
              resizable: true
            },
            {
              headerName: 'موضوع',
              field: 'Subject',
              width: 600,
              resizable: true
            }
          ]
        }
      ];
    }

    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
  }
  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.GetContractWithoutFlowListData(this.RegionParams.selectedObject);
  }

  onChangeRegionObj(newObj) {
    this.RegionParams.selectedObject = newObj;
    this.GetContractWithoutFlowListData(this.RegionParams.selectedObject);
    this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
    this.selectedRow = null;
  }

  ngOnInit() {
    this.getNewData();
    this.ShowInsert = this.ModuleCode === 3034;
    this.EnableDelete = this.ModuleCode === 3034;

  }

  getNewData(): void {
    this.RegionList.GetSpecialRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionListSet = res;
        this.RegionParams.selectedObject = res[0].RegionCode;
        this.GetContractWithoutFlowListData(this.RegionParams.selectedObject);
        this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
      }
    });
  }

  GetContractWithoutFlowListData(region): void {
    this.rowData = of([]);
    this.rowData = this.ProductRequest.GetContractWithoutFlowListData(region, this.ModuleCode);
  }

  Btnclick(BtnName) {
    if (BtnName === 'insert') {
      this.type = (this.ModuleCode === 2934) ? 'researcher-product-request-list' : ((this.ModuleCode === 3037) ? 'contract' : 'product-request-page-without-flow');
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = (this.ModuleCode === 2934) ? 68 : 15;
      this.startTopPosition = 10;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 95;
      this.MainMaxwidthPixel = 1285;
      this.MinHeightPixel = 645;
      this.paramObj = {
        CostFactorID: -1,
        Mode: 'InsertMode',
        WorkFlowID: null,
        ReadyToConfirm: null,
        IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
      };
      return;
    }

    if (BtnName === 'update') {
      if (this.selectedRow == null) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        this.MinHeightPixel = null;
        return;
      }

      this.type = (this.ModuleCode === 3037) ? 'contract' : 'product-request-page-without-flow';
      this.btnclicked = true;
      this.PercentWidth = 90;
      this.MinHeightPixel = 645;
      this.MainMaxwidthPixel = 1285;
      this.HeightPercentWithMaxBtn = 97;
      this.HaveHeader = true;
      this.startLeftPosition = 50;
      this.startTopPosition = 10;
      this.HaveMaxBtn = true;
      this.paramObj = {
        UnitPatternID: this.selectedRow.data.UnitPatternID,
        CostFactorID: this.selectedRow.data.CostFactorID,
        ContractReceiveFactorID: this.selectedRow.data.ReceiveFactorID,
        ContractID: this.selectedRow.data.ContractId,
        Mode: 'EditMode',
        IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly,
        ProductRequestID: this.selectedRow.data.ProductRequestID,
      };
    }
  }

  RowClick(InputValue) {
    switch (this.ModuleCode) {
      case 2739:
        this.WorkflowObjectCode = 4;
        break;
      case 3037:
        this.WorkflowObjectCode = 29;
        break;
      case 2776:
        this.WorkflowObjectCode = 6;
        break;
      case 2840:
      case 3034:
        this.WorkflowObjectCode = 9;
      default:
        break;
    }
    this.selectedRow = InputValue;
    const ContractId = this.selectedRow.data.ContractId ? this.selectedRow.data.ContractId : null;
    const ReadOnlyRegion = this.SelectedRegionObject.IsReadOnly;
    // tslint:disable-next-line:max-line-length
    this.ContPayService.HasPermissionToDeleteContract(this.selectedRow.data.CostFactorID, this.WorkflowObjectCode, ReadOnlyRegion, this.ModuleCode, ContractId
    ).subscribe(res => {
      this.EnableDelete = res;
    });
    // this.ContPayService.HaveWorkFlowInstanceForProductRequest(this.selectedRow.data.CostFactorID, 5).subscribe(res => {
    //   this.DisableDelete = this.SelectedRegionObject.IsReadOnly ? false : !res;
    // });
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  getOutPutParam(event) {
    if (event && this.type === 'product-request-page-without-flow') {
      this.rowData = this.ProductRequest.GetContractWithoutFlowListData(this.RegionParams.selectedObject, this.ModuleCode);
    }
    if (event && this.type === 'researcher-product-request-list') {
      this.rowData = this.ProductRequest.GetContractWithoutFlowListData(this.RegionParams.selectedObject, this.ModuleCode);
    }
  }

  onDeleteclick() {
    this.ProductRequest.DeleteIncomeContract(this.selectedRow.data.CostFactorID, 3037).subscribe(
      res => {
        if (res === true) {
          this.rowData = this.ProductRequest.GetContractWithoutFlowListData(this.RegionParams.selectedObject, this.ModuleCode);
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.PercentWidth = null;
    this.MinHeightPixel = null;
    this.MainMaxwidthPixel = null;
    this.HeightPercentWithMaxBtn = null;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

}
