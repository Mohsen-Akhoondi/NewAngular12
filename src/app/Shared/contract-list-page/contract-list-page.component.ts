import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { GridOptions } from 'ag-grid-community';
import { NgSelectConfig } from '../ng-select/public-api';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { environment } from 'src/environments/environment';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { NgSelectVirtualScrollComponent } from '../ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';

@Component({
  selector: 'app-contract-list-page',
  templateUrl: './contract-list-page.component.html',
  styleUrls: ['./contract-list-page.component.css']
})
export class ContractListPageComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  private gridColumnApi;
  columnDef;
  ISIRVersion = false;
  private defaultColDef;
  private rowSelection;
  rowData = [];
  selectedRegion = -1;
  RegionListSet = [];
  btnclicked = false;
  type: string;
  selectedRow: any;
  @Input() InputParam;
  @Input() ModuleCode;
  @Input() ModuleName;
  paramObj;
  HaveHeader: boolean;
  Enabled: boolean;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startLeftPosition: number;
  OverPixelWidth: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 90;
  private sub: any;
  HasRegion: boolean;
  CanViewContractCase: boolean;
  PixelWidth;
  PixelHeight;
  PercentWidth;
  IsCost = true;
  ContractorItems;
  SubjectParameter: string;
  ContractorPageCount;
  ContractorTotalItemCount;
  ContractorType = true;
  NgSelectContractorParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'product-request-contract-contractor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 30, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 30, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  FromFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '99px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  ToFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '99px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  FinYearItems = [];
  ReigonListSet = [];
  RegionParams = {
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
  LetterNo: string;
  Subject: string;
  FromContractTotalItemCount;
  ToContractTotalItemCount;
  FromContractPageCount;
  ToContractPageCount;
  NgSelectContractParamsFrom = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    DropDownMinWidth: '320px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره قرارداد', HeaderName: 'LetterNo', width: 35, MinTermLenght: 1, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 },
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, },
        { HeaderCaption: 'کد قرارداد', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }

  };
  NgSelectContractParamsTo = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    DropDownMinWidth: '320px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره قرارداد', HeaderName: 'LetterNo', MinTermLenght: 1, width: 35, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, MinTermLenght: 3, SearchOption: 'Subject' },
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, },
        { HeaderCaption: 'کد قرارداد', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractListSetFrom = [];
  ContractListSetTo = [];
  currentContractSearchTerm;
  FromContractDate;
  ToContractDate;
  gridHeight = 87;
  ActorID;
  NgWorkPalceParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'work-place'
  };
  RegionAreaParams = {
    bindLabelProp: 'RegionAreaCode',
    bindValueProp: 'RegionAreaID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'district-code'
  };

  DistrictDirectionParams = {
    bindLabelProp: 'DistrictDirectionName',
    bindValueProp: 'DistrictDirectionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'district-direction'
  };
  AgridApi: any;
  PriceListTopicParam = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'priceListTopic'
  };
  PriceListTopicItems = [];
  IsEstimate: any;

  constructor(
    private router: Router,
    private RegionList: RegionListService,
    private ContractList: ContractListService,
    config: NgSelectConfig,
    private RefreshCartable: RefreshServices,
    private route: ActivatedRoute,
    private Workflow: WorkflowService,
    private Report: ReportService,
    private Actor: ActorService,
    private ProductRequest: ProductRequestService,
    private PriceList: PriceListService) {
    this.LetterNo = '';
    this.Subject = '';
    this.Enabled = true;
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    if (this.ModuleCode === 2645) {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'کد واحد اجرایی ',
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
          headerName: ' نوع قرارداد',
          field: 'ContractTypeName',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'شماره قرارداد',
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
          width: 500,
          resizable: true
        }
      ];
    } else {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'واحد اجرایی',
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
          headerName: ' نوع قرارداد',
          field: 'ContractTypeName',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'شماره قرارداد',
          field: 'LetterNo',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ شروع',
          field: 'FromContractDatePersian',
          width: 100,
          resizable: true,
          hide: this.ModuleCode !== 2785 && this.ModuleCode !== 2872,
        },
        {
          headerName: 'تاریخ پایان',
          field: 'ToContractDatePersian',
          width: 100,
          resizable: true,
          hide: this.ModuleCode !== 2785 && this.ModuleCode !== 2872,
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
          width: 300,
          resizable: true
        },
        {
          headerName: 'پیمانکار اصلی',
          field: 'MainContractorName',
          width: 120,
          resizable: true,
          hide: this.ModuleCode === 2516 ? false : true,
        },
        {
          headerName: 'رسته',
          field: 'PriceListTopicName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.PriceListTopicParam,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.PriceListTopicName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue) {
              params.data.PriceListTopicID = params.newValue.PriceListTopicID;
              params.data.PriceListTopicName = params.newValue.PriceListTopicName;
              return true;
            } else {
              params.data.PriceListTopicID = null;
              params.data.PriceListTopicName = null;
              return false;
            }
          },
          width: 200,
          hide: this.ModuleCode !== 2785 && this.ModuleCode !== 2872,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'منطقه',
          field: 'WorkPlaceName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgWorkPalceParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.WorkPlaceName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue) {
              params.data.WorkPlaceCode = params.newValue.RegionCode;
              params.data.WorkPlaceName = params.newValue.RegionName;
              return true;
            } else {
              params.data.WorkPlaceCode = null;
              params.data.WorkPlaceName = null;
              return false;
            }
          },
          width: 170,
          hide: this.ModuleCode !== 2785 && this.ModuleCode !== 2872,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'ناحیه',
          field: 'RegionAreaCode',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.RegionAreaParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RegionAreaCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RegionAreaCode) {
              params.data.RegionAreaCode = params.newValue.RegionAreaCode;
              params.data.RegionAreaID = params.newValue.RegionAreaID;
              return true;
            } else {
              params.data.RegionAreaCode = null;
              params.data.RegionAreaID = null;
              return false;
            }
          },
          width: 170,
          hide: this.ModuleCode !== 2785 && this.ModuleCode !== 2872,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'شمالی / جنوبی',
          field: 'DistrictDirectionName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.DistrictDirectionParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.DistrictDirectionCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.DistrictDirectionName) {
              params.data.DistrictDirectionCode = params.newValue.DistrictDirectionCode;
              params.data.DistrictDirectionName = params.newValue.DistrictDirectionName;
              return true;
            } else {
              params.data.DistrictDirectionName = '';
              params.data.DistrictDirectionCode = null;
              return false;
            }
          },
          hide: this.ModuleCode !== 2785 && this.ModuleCode !== 2872,
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'وضعیت قرارداد',
          field: 'ContractStatusName',
          width: 100,
          resizable: true
        }, // RFC 60311
      ];
    }

    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
    switch (this.ModuleCode) {
      case 2516:
      case 2645: // برآورد اولیه
      case 2647:
      case 2648:
      case 2654: // گزارش نظارت (بازدید روزانه)
      case 2921: // سایر اسناد مستندات
      case 3071: // ابزار راهبری گزارش نظارت
        this.CanViewContractCase = true;
        break;
      default:
        this.CanViewContractCase = false;
        break;
    }
  }
  gridOptions: GridOptions = {
    onRowDoubleClicked: this.doSomething
  };

  report() {
    const HeaderName = 'لیست قراردادها';
    this.Report.ShowContractListReport(this.selectedRegion, this.ModuleCode, HeaderName);
  }
  doSomething(row) {
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
  }

  onChangeRegionObj(newObj) {
    this.selectedRegion = newObj;
    this.selectedRow = null;
  }
  ngOnInit() {
    if (this.ModuleCode === 2516) {
      this.ModuleName = 'درخواست پرداخت های قرارداد';
    } else if (this.ModuleCode === 3096) {
      this.ModuleName = 'صورتجلسه اعتباری';
      this.IsCost = false;
    }
    this.ISIRVersion = environment.IsExternal;
    this.getNewData();
    this.RefreshCartable.CantractListChange.subscribe(IsChange => {
      this.getContractListData(this.selectedRegion);
    });
  }

  getNewData(): void {
    if (this.InputParam && this.InputParam.IsProviderContractList) {
      this.ActorID = this.InputParam.ActorID;
      this.gridHeight = 92.7;
      this.BoxDevHeight = 100;
      this.ModuleCode = this.InputParam.ModuleCode; // RFC 63952
      this.ContractList.GetProviderContractList(this.ActorID).subscribe(res =>
        this.rowData = res);
    } else {
      this.Workflow.GetFinYearList().subscribe(res => {
        this.FinYearItems = res;
        this.FromFinYearParams.selectedObject = this.FinYearItems[0].UserFinYearCode;
        this.ToFinYearParams.selectedObject = this.FinYearItems[0].UserFinYearCode;
      });

      if (this.InputParam && this.InputParam.RegionList && this.InputParam.RegionList.length > 0) {
        this.HasRegion = true;
        this.ReigonListSet = this.InputParam.RegionList;
        this.RegionParams.selectedObject = this.InputParam.RegionList[0].RegionCode;
        this.selectedRegion = this.InputParam.RegionList[0].RegionCode;
      } else {
        this.HasRegion = false;
      }

      if (this.HasRegion) {
        if (!this.ISIRVersion && this.ModuleCode === 2645 || this.ModuleCode === 2516) {
          this.BoxDevHeight = 55;
          this.gridHeight = 87;
        } else {
          this.BoxDevHeight = this.ModuleCode === 2875 ? 60 : 66;
          this.gridHeight = 90;
        }
      } else if (this.ModuleCode === 2785 || this.ModuleCode === 2872) {
        if (this.InputParam && this.InputParam.ActorID) {
          this.ActorID = this.InputParam.ActorID;
        }
        this.gridHeight = 92.7;
        this.BoxDevHeight = 100;
        this.getContractListData(null);
      } else {
        this.gridHeight = 92.7;
        this.BoxDevHeight = 90;
        this.getContractListData(-1);
      }
    }

  }

  getContractListData(region): void {
    this.ContractList.GetContractList(region, this.ModuleCode, false, false, false, this.IsCost,
      null, null, null, null, null, null, null, this.ActorID).subscribe(res =>
        this.rowData = res);
  }
  Btnclick() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 100;
    } else {
      if (this.ModuleCode === 2687) {
        this.btnclicked = true;
        this.type = 'contract-case';
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.PixelWidth = 1290;
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
          selectedRegion: this.selectedRow.data.RegionCode,
          RegionCode: this.selectedRow.data.RegionCode
        };
      } else {
        this.type =
          ((this.selectedRow.data.ContractTypeCode === 26 ||
            this.selectedRow.data.ContractTypeCode === 29) && this.ModuleCode === 2645) ?
            'contract_person_estimate' :
            ((this.selectedRow.data.ContractTypeCode === 27 ||
              this.selectedRow.data.ContractTypeCode === 28) && this.ModuleCode === 2645) ?
              'view-no-estimate' :
              this.ModuleCode === 3096 ?
                'contract' :
                'PriceList_contract_estimate';
        this.HaveMaxBtn =
          this.type === 'contract_person_estimate' ||
          this.type === 'view-no-estimate' ||
          this.type === 'contract' ||
          this.type === 'PriceList_contract_estimate' &&
          (this.ModuleCode === 2501 ||
            this.ModuleCode === 2645 ||
            this.ModuleCode === 2300 ||
            this.ModuleCode === 2755 ||
            this.ModuleCode === 2516 ||
            this.ModuleCode === 2769 ||
            this.ModuleCode === 2875 ||
            this.ModuleCode === 3096 ||
            this.ModuleCode === 2876
          ); // rfc 52104
        this.PixelHeight = this.type === 'PriceList_contract_estimate' ? 590 :
                           this.type === 'contract' ? 630 : 530;
        this.HeightPercentWithMaxBtn =
          (this.type === 'PriceList_contract_estimate' &&
            (this.ModuleCode === 2501 || this.ModuleCode === 3096)) ? 98 :
            this.type === 'PriceList_contract_estimate' && (this.ModuleCode === 2516 || this.ModuleCode === 2769 || this.ModuleCode === 2875 || this.ModuleCode === 2876 || this.ModuleCode === 2755) ? 90 :
              this.type === 'contract_person_estimate' ? 98 : 98;

        this.PixelWidth = 
        (this.type === 'PriceList_contract_estimate' && this.ModuleCode === 2645) ? 1360 :
        this.ModuleCode === 3096 ? 1300 :'';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.startLeftPosition = (this.type === 'PriceList_contract_estimate' && this.ModuleCode === 2645) ? 2 : 
        this.ModuleCode === 3096 ? 30 : 94;
        this.startTopPosition =  (this.type === 'PriceList_contract_estimate' && this.ModuleCode === 2645) ? 2 :
        this.ModuleCode === 3096 ? 5 : 10;
        this.MinHeightPixel = this.ModuleCode === 2648 || this.ModuleCode === 2921 ? 545 : 550; // 2648 صورت جلسات /sayer 2921 سایر اسناد

        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: this.ModuleCode,
          WorkFlowID: null,
          ReadyToConfirm: null,
          selectedRow: this.selectedRow,
          selectedRegion: this.selectedRegion,
          ContractTypeCode: this.selectedRow.data.ContractTypeCode,
          ContractID: this.selectedRow.data.ContractId,
          ReceiveFactorID: this.selectedRow.data.ReceiveFactorID,
          OrderNo: this.selectedRow.data.OrderNo,
          PersianOrderDate: this.selectedRow.data.PersianOrderDate,
          Note: this.selectedRow.data.OrderNote,
          ContractOrderID: this.selectedRow.data.ContractOrderID,
          GridHeightInTab: 100,
          PanelHeightInTab: 99,
          RegionCode: this.selectedRow.data.RegionCode,
          RegionName: this.selectedRow.data.RegionName,
          SeasonCode: this.selectedRow.data.SeasonCode,
          // tslint:disable-next-line:max-line-length
          ModuleViewTypeCode: (this.ModuleCode === 2875 || this.ModuleCode === 2876 || this.ModuleCode === 2755 || this.ModuleCode === 3071) ? 100000 : null, // rfc 52104
          BeforPageTypeName: 'contract-list-page',
          Mode: 'EditMode'
        };
      }
    }
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  close(): void {
    this.btnclicked = false;
    if (this.ModuleCode === 2785 || this.ModuleCode === 2872) {
      this.Closed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }

  BtnOpenPopup(input: string) {
    if (!this.selectedRow) {
      return;
    }

    switch (input) {
      case 'contract-case':
        this.type = 'contract-case';
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.PixelWidth = 1290;
        this.PixelHeight = 630;
        this.startLeftPosition = 50;
        this.startTopPosition = 4;
        this.HeightPercentWithMaxBtn = 98;
        this.MinHeightPixel = 630;
        this.paramObj = {
          HeaderName:
            this.ModuleCode === 2645 ? 'برآورد اولیه - پرونده فنی قرارداد' :
              this.ModuleCode === 2501 ? 'شناسنامه قرارداد - پرونده فنی قرارداد' :
                this.ModuleCode === 2516 ? 'درخواست پرداخت - پرونده فنی قرارداد' :
                  this.ModuleCode === 2648 ? 'صورت جلسات - پرونده فنی قرارداد' :
                    this.ModuleCode === 2921 ? ' سایر اسناد پیمان - پرونده فنی قرارداد' :
                      this.ModuleCode === 3096 ? 'مشاهده صورتجلسه اعتباری' :
                        this.ModuleName,
          ModuleCode: this.ModuleCode,
          selectedRow: this.selectedRow,
          GridHeightInTab: 100,
          PanelHeightInTab: 99,
          HaveSave: false,
          IsViewable: true,
          IsEditable: false,
          SelectedContractID: this.selectedRow.data.ContractId,
          ProductRequestID: this.selectedRow.data.ProductRequestID,
          ModuleViewTypeCode: 5555,
          BeforPageTypeName: 'contract-list-page'
        };
        this.btnclicked = true;
        break;
      default:
        break;
    }
  }


  RedioClick(IsCost) {
    this.IsCost = IsCost;
  }
  Search() {
    this.ContractList.GetContractList(
      this.RegionParams.selectedObject,
      this.ModuleCode, false, false, false,
      this.IsCost,
      this.FromFinYearParams.selectedObject,
      this.ToFinYearParams.selectedObject,
      this.Subject,
      this.NgSelectContractParamsFrom.selectedObject,
      this.NgSelectContractParamsTo.selectedObject,
      this.FromContractDate,
      this.ToContractDate,
      this.NgSelectContractorParams.selectedObject).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'رکوردی جهت نمایش یافت نشد';
          this.btnclicked = true;
          this.startLeftPosition = 500;
          this.startTopPosition = 100;
        }
      });
  }

  FetchMoreToContract(event) {
    this.NgSelectContractParamsTo.loading = true;
    const ResultList = [];
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractListSetTo = ResultList;
      });

    this.NgSelectContractParamsTo.loading = false;
  }
  FetchMoreFromContract(event) {
    this.NgSelectContractParamsFrom.loading = true;
    const ResultList = [];
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractListSetFrom = ResultList;
      });

    this.NgSelectContractParamsFrom.loading = false;
  }
  doFromContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.NgSelectContractParamsFrom.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractCode';
    }
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetFrom = res.List;
          this.FromContractTotalItemCount = res.TotalItemCount;
          this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsFrom.loading = false;
        }
      });

  }
  doToContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.NgSelectContractParamsTo.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractCode';
    }
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.ToFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetTo = res.List;
          this.ToContractTotalItemCount = res.TotalItemCount;
          this.ToContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsTo.loading = false;

        }
      });
  }

  FromContractChanged(event) {
    const ToItems = [];
    // this.ToFinYearParams.selectedObject = this.FromFinYearParams.selectedObject;
    ToItems.push(this.ContractListSetFrom.find(x => x.LetterNo === event));
    this.ContractListSetTo = ToItems;
    this.NgSelectContractParamsTo.selectedObject = this.NgSelectContractParamsFrom.selectedObject;
  }
  FromContractOpened() {
    this.NgSelectContractParamsFrom.loading = true;
    this.ContractList.GetContractPaging(1, 30, '', '',
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetFrom = res.List;
        this.FromContractTotalItemCount = res.TotalItemCount;
        this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsFrom.loading = false;
  }

  ToContractOpened() {
    this.NgSelectContractParamsTo.loading = true;
    this.ContractList.GetContractPaging(1, 30, '', '',
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetTo = res.List;
        this.ToContractTotalItemCount = res.TotalItemCount;
        this.ToContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsTo.loading = false;
  }

  OnFromContractDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
  }
  OnToContractDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractorItems = ResultList;
        this.NgSelectContractorParams.loading = false;
      }
      );
  }
  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  OpenContractor(event) {
    const ResultList = [];
    //  this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
    // this.NgSelectContractorParams.loading = false;
  }
  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.NgSelectContractorParams.selectedObject = null;
    if (this.ContractorType) {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      // this.NgSelectContractorParams.bindLabelProp = 'PersonName';
    } else {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      // this.NgSelectContractorParams.bindLabelProp = 'CorporateName';
    }
  }

  onellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'WorkPlaceName') {
      this.ProductRequest.GetOnfilterRegion().subscribe(res => {
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'work-place'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'RegionAreaCode') {

      this.ProductRequest.GetRegionAreaList(event.data.WorkPlaceCode).subscribe(res => {
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'district-code'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'DistrictDirectionName') {
      this.ProductRequest.GetDistrictDirectionList().subscribe(res => {
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'district-direction'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'PriceListTopicName') {
      this.PriceList.GetPasmandPriceListTopics().subscribe(res => {
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'priceListTopic'
        });
      });
    }
  }

  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  OnSave() {
    const Alsit = [];
    this.AgridApi.stopEditing();
    this.AgridApi.forEachNode(node => {
      const obj = {
        CostFactorID: node.data.ProductRequestID,
        WorkPlaceCode: node.data.WorkPlaceCode,
        RegionAreaID: node.data.RegionAreaID,
        DistrictDirectionCode: node.data.DistrictDirectionCode,
        PriceListTopicID: node.data.PriceListTopicID
      };
      Alsit.push(obj);
    });

    this.ProductRequest.UpdateProductRequestWorkPlace(Alsit).subscribe(
      res => {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
        this.btnclicked = true;
        this.startLeftPosition = 500;
        this.startTopPosition = 100;
      }
    );
  }

  onChangeFromFinYearObj(event) {
    this.ToFinYearParams.selectedObject = event;
  }
}
