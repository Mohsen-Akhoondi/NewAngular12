import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { GridOptions } from 'ag-grid-community';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';


@Component({
  selector: 'app-proxy-contract-list',
  templateUrl: './proxy-contract-list.component.html',
  styleUrls: ['./proxy-contract-list.component.css']
})
export class ProxyContractListComponent implements OnInit {
  @Output() Close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPutParam: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  columnDef;
  rowData: any = [];
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
  @Input() InputParam;
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
  BoxDevHeight = 100;
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
  ProxyContract = false;
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

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
  }

  ngOnInit() {
    this.ShowInsert = this.ModuleCode === 3034;
    this.EnableDelete = this.ModuleCode === 3034;
    if (this.InputParam && this.InputParam.ProxyContract) {
      this.ProxyContract = true;
      this.HasRegion = false;
      this.ModuleCode = this.InputParam.OrginalModuleCode;
    }
    this.rowData = [];
    // this.ModuleCode
    this.ProductRequest.GetContractWithoutFlowList(this.InputParam.RegionCode, 2739).subscribe(res => {
      this.rowData = res;
    });
  }

  Btnclick() {
    if (this.selectedRow) {
      this.PopupOutPutParam.emit(this.selectedRow);
      this.Close.emit(true);
    } else {
      this.ShowMessageBoxWithOkBtn('رکوردی انتخاب نشده است');
      return;
    }
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  close(): void {
    this.Close.emit(true);
  }

  getOutPutParam(event) {

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
