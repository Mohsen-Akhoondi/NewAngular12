import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { GridOptions } from 'ag-grid-community';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-contract-case-list',
  templateUrl: './contract-case-list.component.html',
  styleUrls: ['./contract-case-list.component.css']
})
export class ContractCaseListComponent implements OnInit {
  @Input() ModuleCode;
  @Input() ModuleName;
  columnDef;
  TotalRecordCount;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  HaveEstimate = false;
  HavePayEstimate = false;
  HavePay = false;
  defaultColDef: { resizable: boolean; };
  rowSelection: string;
  sub: any;
  rowData: any;
  OverPixelWidth;
  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  btnclicked = false;
  type: string;
  selectedRow: any;
  paramObj;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  private gridApi;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startLeftPosition: number;
  startTopPosition: number;
  selectedPriceListPatternID = -1;
  HasRegion: boolean;
  BoxDevHeight = 88;
  gridHeight = 86;
  MinHeightPixel: number;
  constructor(
    private router: Router,
    private RegionList: RegionListService,
    private ContractList: ContractListService,
    config: NgSelectConfig,
    private route: ActivatedRoute
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد واحد اجرایی',
        field: 'RegionCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نام واحد اجرایی',
        field: 'RegionName',
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
        width: 150,
        resizable: true,
        HaveThousand: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 600,
        resizable: true
      }
    ];
    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
  }

  gridOptions: GridOptions = {

  };

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onSelectionChanged() {
    this.selectedRow = this.gridApi.getSelectedRow();
  }
  popupclosed() {
    this.btnclicked = false;
  }

  onChangeRegion(newObj) {
    this.getContractListData(newObj);
    this.selectedRow = null;
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.getNewData();
  }

  getNewData(): void {
    this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionItems = res;
        if (this.ModuleCode !== 2645) { this.RegionParams.selectedObject = res[0].RegionCode; }
        this.getContractListData(this.RegionParams.selectedObject);
      } else {
        this.BoxDevHeight = 100;
        this.gridHeight = 89;
        this.getContractListData(-1);
      }
    });
  }

  getContractListData(region): void {
    this.rowData = [];
    this.ContractList.GetContractListPaging(
      1,
      30,
      null,
      null,
      region,
      this.ModuleCode,
      this.HaveEstimate,
      this.HavePayEstimate,
      this.HavePay).subscribe(
        (res: any) => {
          this.rowData = res.List;
          this.TotalRecordCount = res.TotalItemCount;
        });
  }

  Btnclick(InputValue) {
    if (this.selectedRow == null) {
      this.showMessageBox('قراردادی جهت مشاهده انتخاب نشده است');
    } else {
      switch (InputValue) {
        case 'contract-case':
          this.type = 'contract-case';
          this.HaveHeader = true;
          this.HaveMaxBtn = true;
          this.OverPixelWidth = 1290;
          this.startLeftPosition = 50;
          this.startTopPosition = 4;
          this.HeightPercentWithMaxBtn = 97;
          this.MinHeightPixel = 645;
          this.paramObj = {
            HeaderName: this.ModuleName,
            ModuleCode: this.ModuleCode,
            selectedRow: this.selectedRow,
            GridHeightInTab: 97,
            PanelHeightInTab: 95,
            HaveSave: false,
            IsViewable: true,
            IsEditable: false,
            SelectedContractID: this.selectedRow.data.ContractId,
            ProductRequestID: this.selectedRow.data.ProductRequestID,
            selectedRegion: this.RegionParams.selectedObject,
            RegionCode: this.RegionParams.selectedObject
          };
          this.btnclicked = true;
          break;
        default:
          break;
      }
    }
  }
  showMessageBox(message) {
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.alertMessageParams.message = message;
    this.btnclicked = true;
    this.startLeftPosition = 500;
    this.startTopPosition = 200;
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  OnCheckBoxChange(event, type) {
    this.HaveEstimate = type === 'HaveEstimate' ? event : this.HaveEstimate;
    this.HavePayEstimate = type === 'HavePayEstimate' ? event : this.HavePayEstimate;
    this.HavePay = type === 'HavePay' ? event : this.HavePay;
    this.getContractListData(this.RegionParams.selectedObject);
  }
  OnChangePage(ChangeParam) {
    this.rowData = [];
    this.ContractList.GetContractListPaging(
      ChangeParam.PageNumber,
      ChangeParam.PageSize,
      null,
      null,
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.HaveEstimate,
      this.HavePayEstimate,
      this.HavePay).subscribe(
        (res: any) => {
          this.rowData = res.List;
        });
  }
  OnSortChange(param) {
    console.log(param);
    this.rowData = [];
    this.ContractList.GetContractListPaging(
      param.PageNumber,
      param.PageSize,
      param.SortModels,
      null,
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.HaveEstimate,
      this.HavePayEstimate,
      this.HavePay).subscribe(
        (res: any) => {
          this.rowData = res.List;
        });
  }
  OnFilterChange(param) {
    this.ContractList.GetContractListPaging(
      1,
      30,
      null,
      param,
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.HaveEstimate,
      this.HavePayEstimate,
      this.HavePay).subscribe(
        (res: any) => {
          this.rowData = res.List;
          this.TotalRecordCount = res.TotalItemCount;
          setTimeout(() => {
            param.forEach(element => {
              const countryFilterComponent = this.gridApi.getFilterInstance(element.FieldName);
              const model = {
                filter: element.FilterText,
                filterType: 'text',
                type: element.FilterType
              };
              countryFilterComponent.setModel(model);
            });
          }, 10);
        });
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
}
