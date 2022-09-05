import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, TemplateRef } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { of, forkJoin } from 'rxjs';
import { NgSelectConfig } from '../ng-select/public-api';
import { promise } from 'protractor';
import { NgSelectCellEditorComponent } from '../NgSelectCellEditor/ng-select-cell-editor.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { map } from 'rxjs/operators';
import { LoadingService } from 'src/app/Load/loading/LoadingService';
import { isUndefined } from 'util';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActivatedRoute } from '@angular/router';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { TemplateRendererComponent } from '../grid-component/template-renderer/template-renderer.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { max } from 'jalali-moment';

@Component({
  selector: 'app-contract-page',
  templateUrl: './contract-page.component.html',
  styleUrls: ['./contract-page.component.css']
})
export class ContractPageComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ContractEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ShowRequest') ShowRequest: TemplateRef<any>;
  @ViewChild('PrintFlow') PrintFlow: TemplateRef<any>;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  CustomCheckBoxConfig1: CustomCheckBoxModel = new CustomCheckBoxModel();
  CustomCheckBoxConfig2: CustomCheckBoxModel = new CustomCheckBoxModel();
  CustomCheckBoxConfig5: CustomCheckBoxModel = new CustomCheckBoxModel();
  sumFinalAmountStr = '0';
  BtnClickedName: string;
  MaxNo;
  MaxEndDate;
  MinStartDate;
  ContractTypeCode;
  ContractID;
  IsVolumetric = false;
  IsEstimate = false;
  IsCumulative = false;
  HaveSave = false;
  HaveDelete = false;
  selectedContractID;
  selectedContractOrderID;
  selectedPriceListPatternID = -1;
  SelectedContractOrderID;
  agContrcatOrderCol;
  ContractOrderListData: any;
  adContractPersoncol = [];
  ContractPersonListData: any;
  PriceListTopicsSet;
  PriceListTypeSet;
  isClicked = false;
  PersonSet;
  RolesSet;
  ReigonCode;
  HaveHeader = true;
  HasExpiredSupervision = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isAdd = true;
  type: string;
  OutPutParam;
  messageBoxResult = '';
  private gridApi;
  private gridApi_Contract_Order;
  private gridApi_ContractAssetIncome;
  private gridApiRelatedProduct;
  selectedContractPersonRow: any;
  itemNo = 0;
  DivHeight = 77;
  TabContentHeight = 89;
  private getRowNodeId;
  SeasonListItems: any;
  SeasonListParams = {
    bindLabelProp: 'SeasonName',
    bindValueProp: 'SeasonCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  LevelSet = [{ value: '4', name: ' رشته اي' }, { value: '5', name: 'فصل ' }];
  LevelParams = {
    bindLabelProp: 'name',
    bindValueProp: 'value',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  PriceListTypeCodeName: string;
  PriceListTopicCodeName: string;
  PriceListTypeCode: any;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  Subject;
  gridHeight = 55;
  gridEstimateHeight = 88;
  mainBodyHeight = 95;
  T11HeightPercent = 100;
  T12HeightPercent = 100;
  T13HeightPercent = 100;
  GridHeightInTab;
  GridHeight;
  PanelHeightInTab;
  IsEditable = true;
  ViewEstimateParam;
  SelectedOrderNo;
  SelectedOrderID;
  PersianOrderDate: any;
  Note: any;
  startTopPosition: number;
  startLeftPosition: number;
  ContractNo: any;
  LetterDatePersian: any;
  PrePayAmount: any;
  PrePayPercent: any;
  DepreciationPercent: any;
  DepreciationStartDatePersian: any;
  IncPercent: any;
  CostListFinYearCode: any;
  ContractSatus: any;
  ActLocationName: any;
  FirstObserver: any;
  SecondObserver: any;
  SocialSecurityBranchName: any;
  WorkshopCode: any;
  TaxUnitName: any;
  ContractVoucherTypeP: any;
  ContractVoucherTypeN: any;
  SubCostCenterName: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  ContractType: any;
  CurrentContractObj: any;
  ContractOrderID: any;
  ProductList: any;
  CoefParam;
  btnclicked: boolean;
  CoefLevelCode: any;
  IsDown = false;
  IsLastOrderNo: boolean;
  OuterDivPanelHeight = 57;
  ArchiveParam;
  MinHeightPixel: number;
  PercentWidth: number;
  HaveMaxBtn = false;
  OverPixelWidth: number;
  HeightPercentWithMaxBtn: number;
  paramObj;
  Showable = true;
  ProductRequestID: any;
  HasProductRequest = false;
  IsDisplay = true;
  ModuleCode;
  BeforPageTypeName;
  ContractAssetIncomecol;
  IsInCome = false;
  NgSelectAssetInComeParams = {
    Items: [],
    bindLabelProp: 'AssetIncomeName',
    bindValueProp: 'AssetIncomeID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  AssetIncomeItems: any = [];
  ContractAssetIncomeListData = [];
  DifferenceMonth = 0;
  DifferenceRatioDay = 0;
  DifferenceDay = 0;
  CalculateAmount = 0;
  ReceiveFactorID;
  RelatedProductCol;
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  NgSelectVSParams = {
    bindLabelProp: 'ProductCodeName',
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
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1 },
        { HeaderCaption: 'مبلغ', HeaderName: 'Price', width: 53, SearchOption: 2 }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, },
        { HeaderCaption: 'مبلغ', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractPayDate;
  RegionCode;
  ProdcutTypeCode: any;
  ProductIDs = [];
  RelatedProductList: any;
  RelatedProductRowData = [];
  PanelHeightInTabRelated;
  GridHeightRelated;
  PriceListTypeParams = {
    bindLabelProp: 'PriceListTypeCodeName',
    bindValueProp: 'PriceListTypeCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicCodeName',
    bindValueProp: 'PriceListTopicCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgSelectContractPersonParams = { // 62280
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
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
    type: 'ContractPerson',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کدملی/شناسه', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کدملی/شناسه', width: 35, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  SelectedRoleId;
  NotControllingPayDatePeriod = false;
  IsMultiInvoice = false;
  PersonTypeList: any;
  IsPerson = true;
  ContractPersonSelectedRow: any;
  HaveEstimate = false;
  ShowDelete: any = false;

  constructor(private ContractList: ContractListService,
    private route: ActivatedRoute,
    private Actor: ActorService,
    private PriceList: PriceListService,
    private Loading: LoadingService,
    private User: UserSettingsService,
    private Report: ReportService,
    private ProductRequestServices: ProductRequestService,
    private contractpaydetail: ContractPayDetailsService,
    private RefreshCartable: RefreshServices) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.SeasonListItems =
      [
        { SeasonCode: 1, SeasonName: 'فصل اول' },
        { SeasonCode: 2, SeasonName: 'فصل دوم' },
        { SeasonCode: 3, SeasonName: 'فصل سوم' },
        { SeasonCode: 4, SeasonName: 'فصل جهارم' },
      ];
    this.PersonTypeList = [{ PersonTypeName: 'حقیقی', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقی', PersonTypeCode: 2 }];

    this.adContractPersoncol = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام نقش ',
        field: 'RoleName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetRolesList(false),
          bindLabelProp: 'RoleName',
          bindValueProp: 'RoleID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RoleName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.RoleName = params.newValue.RoleName;
            params.data.RoleID = params.newValue.RoleID;
            params.data.ActorID = null;
            params.data.ActorName = null;
            return true;
          } else {
            params.data.RoleName = '';
            params.data.RoleID = null;
            params.data.ActorID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: this.IsEditable,
        width: 200,
        resizable: true
      },
      {
        headerName: 'حقیقی / حقوقی',
        field: 'PersonTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.PersonTypeList,
          bindLabelProp: 'PersonTypeName',
          bindValueProp: 'PersonTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PersonTypeName) {
            params.data.PersonTypeName = params.newValue.PersonTypeName;
            params.data.PersonTypeCode = params.newValue.PersonTypeCode;
            if (params.data.PersonTypeCode === 1) {
              this.IsPerson = true;
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'کد ملي';
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام و نام خانوادگي';
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 10;
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'کد ملي';
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام و نام خانوادگي';
            } else {
              this.IsPerson = false;
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام';
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 11;
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectContractPersonParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام';
            }
            return true;
          } else {
            params.data.PersonTypeName = null;
            params.data.PersonTypeCode = null;
            return false;
          }
        },
        editable: this.IsEditable,
        width: 100,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectContractPersonParams,
          Items: [],
          MoreFunc: this.FetchMoreContractPerson,
          FetchByTerm: this.FetchContractPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.ActorID = params.newValue.ActorID;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: this.IsEditable,
        width: 400,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت ',
        field: 'ProductName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ProductList,
          bindLabelProp: 'ProductName',
          bindValueProp: 'ContractOrderItemID'
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
            params.data.ContractOrderItemID = params.newValue.ContractOrderItemID;
            return true;
          } else {
            params.data.ProductName = '';
            params.data.ContractOrderItemID = null;
            return false;
          }
        },
        editable: this.IsEditable,
        width: 400,
        resizable: true
      }];
    this.ContractAssetIncomecol = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'منبع درآمدي',
        field: 'AssetIncomeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'AssetIncomeName',
          bindValueProp: 'AssetIncomeID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.AssetIncomeName;
          } else {
            return '';
          }
        },
        editable: this.IsEditable,
        width: 200,
        resizable: true
      },
      {
        headerName: ' نام پايانه  ',
        field: 'AssetLocationName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'از تاريخ  ',
        field: 'FromDatePersian',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'FromDatePersian',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortFromDate = params.newValue.MDate;
            params.data.FromDatePersian = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortFromDate = null;
            params.data.FromDatePersian = '';
            return false;
          }
        }
      },
      {
        headerName: 'تا تاريخ',
        field: 'ToDatePersian',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ToDatePersian',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortToDate = params.newValue.MDate;
            params.data.ToDatePersian = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortToDate = null;
            params.data.ToDatePersian = '';
            return false;
          }
        }
      },
      {
        headerName: '  مبلغ ماهانه ',
        field: 'MonthlyAmount',
        width: 130,
        resizable: true,
        editable: true
      },
      {
        headerName: ' مبلغ کل طي دوره قرارداد ',
        field: 'Amount',
        width: 130,
        resizable: true,
        editable: true
      },
      {
        headerName: ' مبلغ قابل پرداخت ',
        field: 'PayAbleAmount',
        width: 130,
        resizable: true,
        editable: true
      },
    ];
    this.getRowNodeId = function (data) {
      return data.ActorID;
    };
  }

  ngOnInit() {
    if (this.PopupParam) {
      this.RegionCode = this.PopupParam.RegionCode;
    }
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 27;
    this.CustomCheckBoxConfig1.color = 'state p-primary';
    this.CustomCheckBoxConfig1.icon = 'fa fa-check';
    this.CustomCheckBoxConfig1.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig1.AriaWidth = 14.5;
    this.CustomCheckBoxConfig2.color = 'state p-primary';
    this.CustomCheckBoxConfig2.icon = 'fa fa-check';
    this.CustomCheckBoxConfig2.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig2.AriaWidth = 5.5;
    this.CustomCheckBoxConfig5.color = 'state p-primary';
    this.CustomCheckBoxConfig5.icon = 'fa fa-check';
    this.CustomCheckBoxConfig5.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig5.AriaWidth = 5;
    if (this.PopupParam && this.PopupParam.BeforPageTypeName) {
      this.BeforPageTypeName = this.PopupParam.BeforPageTypeName;
    }
    this.User.GetModulOPByUser(this.PopupParam.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      // this.IsEditable = this.PopupParam.ModuleCode !== 2687;
      if (this.PopupParam && this.PopupParam.IsEditable === false) {
        this.Showable = false;
      }

      if (!isUndefined(this.PopupParam.IsEditable)) {
        this.IsDisplay = this.IsEditable = this.PopupParam.IsEditable;
      }

      if (this.ModuleCode === 2730 ||
        this.ModuleCode === 2776 ||
        this.ModuleCode === 2739 ||
        this.ModuleCode === 2793 ||
        this.ModuleCode === 2872 ||
        this.ModuleCode === 2687 // پرونده قرارداد
      ) {
        this.IsEditable = false;
        this.IsDisplay = false;
      }

      if (this.PopupParam.ModuleViewTypeCode === 5555) {
        this.IsEditable = this.IsDisplay = false;
      }
      this.OuterDivPanelHeight = 55;
      this.GridHeight = this.PopupParam.ModuleCode === 2687 ? 80 : 82;
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

    if (this.PopupParam.SelectedContractID) { // مشاهده پرونده در فرم صورت وضعیت
      this.selectedContractID = this.PopupParam.SelectedContractID;
    } else if (this.PopupParam.selectedRow && this.PopupParam.selectedRow.data) {
      if (this.PopupParam.selectedRow.data.ContractId) {
        this.selectedContractID = this.PopupParam.selectedRow.data.ContractId;
        this.adContractPersoncol[4].cellEditorParams.Items = this.ContractList.GetContractOrderProduct(this.selectedContractID, false);
        this.ProductList = this.adContractPersoncol[4].cellEditorParams.Items;
      } else if (this.PopupParam.selectedRow.data.ContractID) {
        this.selectedContractID = this.PopupParam.selectedRow.data.ContractID;
        this.adContractPersoncol[4].cellEditorParams.Items = this.ContractList.GetContractOrderProduct(this.selectedContractID, false);
        this.ProductList = this.adContractPersoncol[4].cellEditorParams.Items;
      }
      if (this.PopupParam.selectedRow.data.ContractID != null) { // RFC 51561
        this.selectedContractID = this.PopupParam.selectedRow.data.ContractID;
        this.adContractPersoncol[4].cellEditorParams.Items = this.ContractList.GetContractOrderProduct(this.selectedContractID, false);
        this.ProductList = this.adContractPersoncol[4].cellEditorParams.Items;
      }
    }

    this.ContractList.GetContractDataByID(this.selectedContractID).subscribe(res => {
      this.FinYearCode = res[0].FinYearCode;
      this.ContractCode = res[0].ContractCode;
      this.ContractorName = res[0].ContractorName;
      this.LetterNo = res[0].LetterNo;
      this.ContractAmount = res[0].ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.Subject = res[0].Subject;
      this.ContractNo = res[0].LetterNo;
      this.LetterDatePersian = res[0].LetterDatePersian;
      this.PrePayAmount = res[0].PrePayAmount;
      this.PrePayPercent = res[0].PrePayPercent;
      this.DepreciationPercent = res[0].DepreciationPercent;
      this.DepreciationStartDatePersian = res[0].DepreciationStartDatePersian;
      this.IncPercent = res[0].IncPercent;
      this.CostListFinYearCode = res[0].CostListFinYearCode;
      this.ContractSatus = res[0].ContractSatus;
      this.ActLocationName = res[0].ActLocationName;
      this.FirstObserver = res[0].FirstObserver;
      this.SecondObserver = res[0].SecondObserver;
      this.SocialSecurityBranchName = res[0].SocialSecurityBranchName;
      this.WorkshopCode = res[0].WorkshopCode;
      this.TaxUnitName = res[0].TaxUnitName;
      this.ContractVoucherTypeP = res[0].ContractVoucherTypeP;
      this.ContractVoucherTypeN = res[0].ContractVoucherTypeN;
      this.SubCostCenterName = res[0].SubCostCenterName;
      this.Note = res[0].Note;
      this.FromContractDatePersian = res[0].FromContractDatePersian;
      this.ToContractDatePersian = res[0].ToContractDatePersian;
      this.ContractType = res[0].ContractType;
      this.ContractTypeCode = res[0].ContractTypeCode;
      this.SeasonListParams.selectedObject = res[0].SeasonCode;
      this.IsDown = true;
      this.IsVolumetric = res[0].IsVolumetric;
      this.IsCumulative = res[0].IsCumulative;
      this.IsEstimate = res[0].IsEstimate;
      this.NotControllingPayDatePeriod = res[0].NotControllingPayDatePeriod;
      this.IsMultiInvoice = res[0].IsMultiInvoice;
      this.ProductRequestID = res[0].ProductRequestID;
      this.RelatedProductRowData = res[0].RequestRelatedProductList;
      this.HasExpiredSupervision = res[0].HasExpiredSupervision;
      if (this.ProductRequestID && this.ProductRequestID != null) {
        this.HasProductRequest = true;
      }
    });
    // tslint:disable-next-line:max-line-length
    this.ReceiveFactorID = this.PopupParam.selectedRow && this.PopupParam.selectedRow.data ? this.PopupParam.selectedRow.data.ReceiveFactorID : null;
    if (this.ReceiveFactorID) {
      this.IsInCome = true;
      this.AssetIncomeItems = this.ContractList.GetContractAssetIncome(this.ReceiveFactorID, false);
      this.ContractAssetIncomecol[1].cellEditorParams.Items = this.AssetIncomeItems;
      this.ContractList.GetContractAssetIncomeList(this.ReceiveFactorID).subscribe(ress => {
        this.ContractAssetIncomeListData = ress;
        this.CalculateTotalContractAmountOnYears();
      });
    }
    this.GridHeightInTab = this.PopupParam.GridHeightInTab;
    this.PanelHeightInTab = this.PopupParam.PanelHeightInTab;

    this.ContractList.GetLastContractOrderList(this.selectedContractID).subscribe(res => {
      this.MinStartDate = res.PersianStartDate;
      this.MaxEndDate = res.PersianEndDate;
      this.sumFinalAmountStr = res.FinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    });
    this.ProductRequestServices.GetCurrentDate().subscribe(res => { this.ContractPayDate = res });
    this.RelatedProductCol = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
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
              params.data.ProductCodeName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductCodeName = null;
            return false;
          }
        },
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
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
            return params.value.ProductCodeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductCodeName) {
            params.data.ProductCodeName = params.newValue.ProductCodeName;
            params.data.ProductID = params.newValue.ProductID;
            params.data.ScaleName = params.newValue.ScaleName;
            return true;
          } else {
            params.data.ProductCodeName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: true,
        width: 420,
        resizable: true
      },
    ];
    this.PanelHeightInTabRelated = this.PopupParam.ModuleCode === 2687 ? 77 : 100;
    this.GridHeightRelated = this.PopupParam.ModuleCode === 2687 ? 85 : 88;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.agContrcatOrderCol = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مشاهده درخواست',
        field: '',
        width: 110,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowRequest,
        }
      },
      {
        headerName: 'چاپ گردش',
        field: '',
        width: 80,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.PrintFlow,
        }
      },
      {
        headerName: ' شماره مرحله ',
        field: 'OrderNo',
        width: 150,
        resizable: true
      },
      {
        headerName: ' تاريخ  ',
        field: 'PersianOrderDate',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره نامه ',
        field: 'LetterCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'مبلغ نهایی ',
        field: 'FinalOrderItemAmount',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ الحاقی ',
        field: 'DiffrentOrderItemAmount',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: '  توضيحات',
        field: 'Note',
        width: 1000,
        resizable: true
      },
    ];
    forkJoin([
      this.ContractList.GetBalanceFactors(this.selectedContractID),
      this.ContractList.GetContractOrderList(this.selectedContractID),
      this.ContractList.GetContractPersonList(this.selectedContractID, false),
      this.PriceList.GetPriceListTopics(true)
    ]).subscribe(res => {
      if (res[0] && res[0][0]) {
        this.selectedPriceListPatternID = res[0][0].PriceListPatternID;
        this.HaveEstimate = this.selectedPriceListPatternID > 0 ? true : false;
        this.PriceListTopicParams.selectedObject = res[0][0].PriceListFineYearCode;
        this.PriceListTypeParams.selectedObject = res[0][0].PriceListTypeCode;
        this.PriceList.GetPriceListType(this.PriceListTopicParams.selectedObject).subscribe(ress => {
          this.PriceListTypeSet = ress;
          this.PriceListTypeSet.forEach(item => {
            item.PriceListTypeCodeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
          });
        });
      }
      this.ContractOrderListData = res[1];
      if (this.PopupParam.RegionCode === 222 && this.ContractTypeCode === 2) { // RFC 57340
        this.ContractPersonListData = [{ RoleID: 1301, RoleName: 'درخواست کننده معامله ـ حمل و نقل' }];
      } else {
        this.ContractPersonListData = res[2];
      }
      this.PriceListTopicsSet = res[3];
      this.PriceListTopicsSet.forEach(item => {
        item.PriceListTopicCodeName = item.PriceListTopicCode + ' - ' + item.PriceListTopicName;
      });
    });
  }
  BtnAddclick(InputValue) {
    this.onAddRow();
  }

  popupclosed() {
    this.isClicked = false;
  }

  getOutPutParam(event) {
    switch (this.type) {
      case 'contract-person':
        this.OutPutParam = event;
        if (this.isAdd === true) {
          this.onAddRow();
        } else {
          this.updateItems();
        }
        return this.OutPutParam;
        break;
      default:
        break;
    }
  }

  onAddRow() {
    this.itemNo++;
    const newItem = {
      ItemNo: this.itemNo
    };
    this.gridApi.updateRowData({ add: [newItem] });
  }

  updateItems() {
    const selectedData = this.gridApi.getSelectedRows();
    selectedData[0].ActorID = this.OutPutParam.ActorID;
    selectedData[0].ActorNameType = this.OutPutParam.ActorNameType;
    selectedData[0].RoleID = this.OutPutParam.RoleID;
    selectedData[0].RoleName = this.OutPutParam.RoleName;
    selectedData[0].ContractOrderItemID = this.OutPutParam.ContractOrderItemID;
    selectedData[0].ProductName = this.OutPutParam.ProductName;
    this.gridApi.updateRowData({ update: selectedData });
  }
  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData != null) {
      this.gridApi.updateRowData({ remove: selectedData });
      this.itemNo--;
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onGridReadyContractOrder(params) {
    this.gridApi_Contract_Order = params.api;
  }
  onRelatedProductGridReady(params) {
    this.gridApiRelatedProduct = params.api;
  }

  ContractPersonRowClick(InputValue) {

    if (InputValue.data.RoleName.RoleID) {
      this.SelectedRoleId = InputValue.data.RoleName.RoleID;
    } else {
      this.SelectedRoleId = InputValue.data.RoleID;
    }
    this.ContractPersonSelectedRow = InputValue.data;

  }

  onSave() {
    this.ReigonCode = this.PopupParam.selectedRegion;

    this.gridApi.stopEditing();
    this.gridApi_Contract_Order.stopEditing();
    this.gridApiRelatedProduct.stopEditing();

    const rowData = [];
    const ContractpersonList = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    rowData.forEach((item) => {
      if (item.ContractPersonID) {
        let ActorID;
        let RoleID;
        let ContractOrderItemID;


        if (item.RoleName && item.RoleName.RoleID) {
          RoleID = item.RoleName.RoleID;
        } else {
          RoleID = item.RoleID;
        }

        if (!item.ProductName) {
          ContractOrderItemID = null;
        }

        if (item.ProductName && item.ProductName.ContractOrderItemID) {
          ContractOrderItemID = item.ProductName.ContractOrderItemID;
        }

        if (item.ProductName && !item.ProductName.ContractOrderItemID) {
          ContractOrderItemID = item.ContractOrderItemID;
        }

        const obj = {
          ContractPersonID: item.ContractPersonID,
          ActorID: item.ActorID,
          RoleID: RoleID,
          ContractOrderItemID: ContractOrderItemID
        };
        ContractpersonList.push(obj);
      } else {
        let ContractOrderItemID;

        if (!item.ProductName) {
          ContractOrderItemID = null;
        }

        if (item.ProductName && item.ProductName.ContractOrderItemID) {
          ContractOrderItemID = item.ProductName.ContractOrderItemID;
        }

        if (item.ProductName && !item.ProductName.ContractOrderItemID) {
          ContractOrderItemID = item.ContractOrderItemID;
        }

        const obj = {
          ContractPersonID: 0,
          ActorID: item.ActorID,
          RoleID: item.RoleID,
          ContractOrderItemID: ContractOrderItemID
        };
        ContractpersonList.push(obj);
      }
    });
    this.RelatedProductList = [];
    this.RelatedProductRowData = [];
    this.gridApiRelatedProduct.forEachNode(res => {
      this.RelatedProductRowData.push(res.data);
    });
    this.RelatedProductRowData.forEach(res => {
      const RelatedProduct = {
        RequestRelatedProductID: res.RequestRelatedProductID,
        CostFactorID: this.ProductRequestID,
        ProductID: res.ProductID,
      };
      this.RelatedProductList.push(RelatedProduct);
    });
    if (!this.IsInCome) {
      this.ContractList.SaveContractPerson(
        this.selectedContractID,
        this.PriceListTopicParams.selectedObject,
        this.PriceListTypeParams.selectedObject,
        this.SeasonListParams.selectedObject,
        this.IsVolumetric,
        this.IsCumulative,
        ContractpersonList,
        this.ReigonCode,
        this.RelatedProductList,
        this.ProductRequestID,
        this.ModuleCode,
        this.NotControllingPayDatePeriod,
        this.IsMultiInvoice,
        this.IsEstimate,
        this.HasExpiredSupervision)
        .subscribe(res => {
          this.showMessageBox('ثبت با موفقيت انجام شد');
          //  this.ContractPersonListData = this.ContractList.GetContractPersonList(this.selectedContractID, false);
        },
          err => {
            this.showMessageBox('ثبت با مشکل مواجه شد');
          });
    } else {
      const ContractAssetIncomeList = [];
      this.gridApi_ContractAssetIncome.stopEditing();
      this.gridApi_ContractAssetIncome.forEachNode(node => {
        const ContractAssetIncomeObj = {
          ContractAssetIncomeID: node.data.ContractAssetIncomeID ? node.data.ContractAssetIncomeID : -1,
          AssetIncomeID: node.data.AssetIncomeID ? node.data.AssetIncomeID : node.data.AssetIncomeName.AssetIncomeID,
          ContractID: this.PopupParam.selectedRow.data.ReceiveFactorID,
          Amount: node.data.Amount,
          PayAbleAmount: node.data.PayAbleAmount,
          FromDate: node.data.ShortFromDate ? node.data.ShortFromDate : null,
          ToDate: node.data.ShortToDate ? node.data.ShortToDate : null
        };
        ContractAssetIncomeList.push(ContractAssetIncomeObj);
      });
      // tslint:disable-next-line:max-line-length
      this.ContractList.SaveIncomeContractPerson(
        this.selectedContractID,
        this.PriceListTopicParams.selectedObject,
        this.PriceListTypeParams.selectedObject,
        this.SeasonListParams.selectedObject,
        this.IsVolumetric,
        this.IsCumulative,
        ContractpersonList,
        this.ReigonCode,
        ContractAssetIncomeList,
        this.ModuleCode,
        this.ReceiveFactorID,
        this.RelatedProductList,
        this.ProductRequestID,
        this.NotControllingPayDatePeriod,
        this.IsMultiInvoice,
        this.IsEstimate,
        this.HasExpiredSupervision)
        .subscribe(res => {
          this.showMessageBox('ثبت با موفقيت انجام شد');
        },
          err => {
            this.showMessageBox('ثبت با مشکل مواجه شد');
          });
    }
  }

  showMessageBox(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
    this.HaveMaxBtn = false;
    // this.startLeftPosition = 530;
    // this.startTopPosition = 200;
  }

  onClose() {
    this.ContractEstimateClosed.emit(true);
  }

  onChangePriceListTopicObj(event) {
    this.PriceListTopicParams.selectedObject = event;
    this.PriceList.GetPriceListType(this.PriceListTopicParams.selectedObject).subscribe(res => {
      this.PriceListTypeSet = res;
      this.PriceListTypeSet.forEach(item => {
        item.PriceListTypeCodeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
        this.PriceListTypeParams.selectedObject = item.PriceListTypeCode;
      });
    });
  }
  onChangePriceListTypeObj(event) {
    this.PriceListTypeParams.selectedObject = event;
  }
  // onCellValueChanged(event) {

  //   if (event.newValue && event.colDef && event.colDef.field === 'RoleName') {
  //     this.Actor.GetActorWithRoleID(event.newValue.RoleID, false).subscribe( res => {
  //       this.adContractPersoncol[2].cellEditorParams.Items = res;
  //     });
  //     const itemsToUpdate = [];
  //     this.gridApi.forEachNode(node => {
  //       if (node.rowIndex === event.rowIndex) {
  //         node.data.ActorNameType = '';
  //         node.data.RoleName = event.newValue;
  //         itemsToUpdate.push(node.data);
  //       }
  //     });
  //     this.gridApi.updateRowData({ update: itemsToUpdate });
  //   } else if (event.newValue && event.colDef && event.colDef.field === 'ActorNameType') {// For InvalidSelected When Old IsValid
  //     const itemsToUpdate = [];
  //     this.gridApi.forEachNode(node => {
  //       if (node.rowIndex === event.rowIndex) {
  //         node.data.ActorNameType = event.newValue;
  //         itemsToUpdate.push(node.data);
  //       }
  //     });
  //     this.gridApi.updateRowData({ update: itemsToUpdate });
  //   } else if (event.newValue && event.colDef && event.colDef.field === 'ProductName') {// For InvalidSelected When Old IsValid
  //     const itemsToUpdate = [];
  //     this.gridApi.forEachNode(node => {
  //       if (node.rowIndex === event.rowIndex) {
  //         node.data.ProductName = event.newValue;
  //         itemsToUpdate.push(node.data);
  //       }
  //     });
  //     this.gridApi.updateRowData({ update: itemsToUpdate });
  //   }
  // }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.DivHeight = changes.PopupMaximized.currentValue ? 80 : 77;
      this.TabContentHeight = changes.PopupMaximized.currentValue ? 91 : 89;

      this.T11HeightPercent = changes.PopupMaximized.currentValue ? 100 : 100;
      this.T12HeightPercent = changes.PopupMaximized.currentValue ? 100 : 100;
      this.T13HeightPercent = changes.PopupMaximized.currentValue ? 100 : 100;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 97 : 95;

      this.GridHeightInTab = changes.PopupMaximized.currentValue ? 100 : 100;
      this.PanelHeightInTab = changes.PopupMaximized.currentValue ? 100 : 98;

    }
  }

  RowClick(InputValue) {
    this.ShowDelete = false;
    this.SelectedOrderNo = InputValue.data.OrderNo;
    this.SelectedOrderID = InputValue.data.ContractOrderID;
    this.PersianOrderDate = InputValue.data.PersianOrderDate;
    // this.Note = InputValue.data.Note;
    this.ContractOrderID = InputValue.data.ContractOrderID;
    this.IsLastOrderNo = true;
    this.ContractOrderListData.forEach(element => {
      this.MaxNo = element.OrderNo;
    });
    if (InputValue.data.OrderNo == this.MaxNo && this.ModuleCode == 3008) {
      this.ShowDelete = true;
    }

    // this.IsLastOrderNo = false;
    // let Count = 0;
    // this.gridApi_Contract_Order.forEachNode(node => {
    //   Count++;
    // });

    // if (InputValue.rowIndex === (Count - 1)) {
    //   this.IsLastOrderNo = true;
    // }
  }


  OnClickPrintFlow() {
    if (!this.SelectedOrderID) {
      this.showMessageBox(' رديفي جهت مشاهده گردش انتخاب نشده است');
    } else {
      this.Report.ShowReport(null,
        null,
        this.SelectedOrderID,
        this.ContractCode,
        this.ContractNo,
        this.LetterDatePersian,
        this.Subject,
        this.ContractorName,
        null,
        null,
        2645,
        this.PopupParam.selectedRegion);
    }
  }
  btnClick(data) {
    switch (data) {
      case 'view-no-estimate': {
        this.type = 'view-no-estimate';
        this.startLeftPosition = 74;
        this.startTopPosition = 15;
        this.HaveHeader = true;
        this.isClicked = true;
        this.MinHeightPixel = 630;
        this.ViewEstimateParam = {
          HeaderName: 'اطلاعات مرحله',
          OrderNo: this.SelectedOrderNo,
          ContractOrderID: this.ContractOrderID,
          ContractID: this.selectedContractID,
          PersianOrderDate: this.PersianOrderDate,
          Note: this.Note,
          RegionCode: this.PopupParam.selectedRegion,
          ModuleCode: this.PopupParam.ModuleCode,
          HaveSave: this.HaveSave && this.IsLastOrderNo && this.IsEditable,
          ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
          selectedRegion: this.PopupParam.selectedRegion,
        };
      }
        break;
      case 'view-estimate': {
        this.type = 'view-estimate';
        this.startLeftPosition = 74;
        this.startTopPosition = 15;
        this.MinHeightPixel = 630;
        this.HaveHeader = true;
        this.isClicked = true;
        this.ViewEstimateParam = {
          HeaderName: 'اطلاعات برآورد',
          OrderNo: this.SelectedOrderNo,
          ContractOrderID: this.ContractOrderID,
          ContractID: this.selectedContractID,
          PersianOrderDate: this.PersianOrderDate,
          Note: this.Note,
          RegionCode: this.PopupParam.selectedRegion,
          ModuleCode: this.PopupParam.ModuleCode,
          HaveSave: this.HaveSave && this.IsLastOrderNo && this.IsEditable,
          ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
          selectedRegion: this.PopupParam.selectedRegion,
        };
      }
        break;
      case 'archive': {
        this.type = 'archive-details';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 420;
        this.startTopPosition = 150;
        const archiveParam = {
          EntityID: this.selectedContractID,
          TypeCodeStr: '2-', //  برآورد اوليه
          DocTypeCode: 2,
          ModuleCode: this.PopupParam.ModuleCode
        };
        this.ArchiveParam = archiveParam;
      }
        break;
      case 'contract-case':
        this.type = 'contract-case';
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.OverPixelWidth = 1290;
        this.startLeftPosition = 50;
        this.startTopPosition = 4;
        this.HeightPercentWithMaxBtn = 98;
        this.MinHeightPixel = 690;
        this.paramObj = {
          HeaderName: 'پرونده قراداد',
          ModuleCode: this.PopupParam.ModuleCode,
          selectedRow: this.PopupParam.selectedRow,
          GridHeightInTab: 100,
          PanelHeightInTab: 99,
          HaveSave: false,
          IsViewable: true,
          IsEditable: false,
          SelectedContractID: this.PopupParam.selectedRow.data.ContractId,
          ProductRequestID: this.PopupParam.selectedRow.data.ProductRequestID,
          ModuleViewTypeCode: 5555,
          BeforPageTypeName: 'contract-page'
        };
        this.isClicked = true;
        break;

      default:
        break;
    }
  }
  onCoefClick() {
    this.CoefParam = {
      HeaderName: 'ضرايب قرارداد',
      ContractID: this.selectedContractID,
      CoefLevelCode: this.CoefLevelCode,
      ContractCode: this.ContractCode,
      ContractorName: this.ContractorName,
      Subject: this.Subject,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      ReigonCode: this.PopupParam.selectedRegion
    };
    this.isClicked = true;
    this.type = 'contract-coef';
    this.startLeftPosition = 120;
    this.startTopPosition = 47;
  }

  onContractPersonPrint() {
    const HeaderName = 'عوامل اجرايی قرارداد';
    this.Report.ShowContractPersonReport(
      this.PopupParam.RegionCode,
      this.PopupParam.selectedRow.data.CostFactorID,
      this.PopupParam.ModuleCode,
      HeaderName
    );
  }
  onShowProductRequestClick(row) {
    if (row.ProductRequestID) {
      if (row.RequestObjectTypeCode === 1 || !row.RequestObjectTypeCode) {
        this.type = 'product-request-page';
        this.isClicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.OverPixelWidth = 1280;
        this.paramObj = {
          ModuleCode: 2730,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: this.selectedContractID,
          FirstModuleCode: this.ModuleCode,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 500000,
        };
      }
      if (row.RequestObjectTypeCode === 3) {
        this.type = 'product-request-page';
        this.isClicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.OverPixelWidth = null;
        this.paramObj = {
          ModuleCode: 2773,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: this.selectedContractID,
          FirstModuleCode: this.ModuleCode,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 500000,
        };
      }
      if (row.RequestObjectTypeCode === 7) {
        this.type = 'product-request-page-without-flow';
        this.isClicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.paramObj = {
          ModuleCode: 2776,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: this.selectedContractID,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 500000,
        };
      }
      if (row.RequestObjectTypeCode === 2 || row.RequestObjectTypeCode === 5) {
        this.type = 'product-request-page-without-flow';
        this.isClicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.paramObj = {
          ModuleCode: row.RequestObjectTypeCode === 2 ? 2739 : 2840,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: this.selectedContractID,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 500000,
        };
      }
    } else {
      this.showMessageBox('درخواست این مرحله قراداد مشخص نمی باشد');
    }
  }
  onContractAssetIncomeGridReady(params) {
    this.gridApi_ContractAssetIncome = params.api;
  }
  onContractAssetIncomeCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'AssetIncomeName') {
      const itemsToUpdate = [];
      this.gridApi_ContractAssetIncome.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          this.ContractList.GetAssetLocationNameByAssetIncomeID(event.newValue.AssetIncomeID).subscribe(res => {
            node.data.AssetLocationName = res;
          });
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi_ContractAssetIncome.updateRowData({ update: itemsToUpdate });
    }
    if (event.newValue && event.colDef && event.colDef.field === 'ToDatePersian') {
      this.gridApi_ContractAssetIncome.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.FromDatePersian !== null || node.data.MonthlyAmount !== null) {
            this.CalculateTime(node.data.FromDatePersian, node.data.ToDatePersian);
            // جهت محاسبه ي مبلغ ماهانه
            if (node.data.MonthlyAmount > 0) {
              if (this.DifferenceMonth !== 0) {
                // tslint:disable-next-line:radix
                // tslint:disable-next-line:max-line-length
                this.CalculateAmount = (Math.floor(this.DifferenceRatioDay * node.data.MonthlyAmount)) + (this.DifferenceMonth * node.data.MonthlyAmount);
                if (this.CalculateAmount.toString().length > 3) {
                  node.data.PayAbleAmount = Math.ceil(this.CalculateAmount / 1000) * 1000;
                } else {
                  node.data.PayAbleAmount = this.CalculateAmount;
                }
                node.data.Amount = this.CalculateAmount;
              } else {
                this.CalculateAmount = (this.DifferenceDay * node.data.MonthlyAmount);
                node.data.Amount = this.CalculateAmount;
                if (this.CalculateAmount.toString().length > 3) {
                  node.data.PayAbleAmount = (this.CalculateAmount / 1000) * 1000;
                } else {
                  node.data.PayAbleAmount = this.CalculateAmount;
                }
              }
            } else {
              node.data.Amount = 0;
              node.data.PayAbleAmount = 0;
            }
          }
        }
      });
    }
    if (event.newValue && event.colDef && event.colDef.field === 'MonthlyAmount') {
      this.gridApi_ContractAssetIncome.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.ToDatePersian !== null || node.data.FromDatePersian !== null) {
            this.CalculateTime(node.data.FromDatePersian, node.data.ToDatePersian);
            // جهت محاسبه ي مبلغ ماهانه
            if (node.data.MonthlyAmount > 0) {
              if (this.DifferenceMonth !== 0) {
                // tslint:disable-next-line:radix
                // tslint:disable-next-line:max-line-length
                this.CalculateAmount = (Math.floor(this.DifferenceRatioDay * node.data.MonthlyAmount)) + (this.DifferenceMonth * node.data.MonthlyAmount);
                if (this.CalculateAmount.toString().length > 3) {
                  node.data.PayAbleAmount = Math.ceil(this.CalculateAmount / 1000) * 1000;
                } else {
                  node.data.PayAbleAmount = this.CalculateAmount;
                }
                node.data.Amount = this.CalculateAmount;
              } else {
                this.CalculateAmount = (this.DifferenceDay * node.data.MonthlyAmount);
                node.data.Amount = this.CalculateAmount;
                if (this.CalculateAmount.toString().length > 3) {
                  node.data.PayAbleAmount = (this.CalculateAmount / 1000) * 1000;
                } else {
                  node.data.PayAbleAmount = this.CalculateAmount;
                }
              }
            } else {
              node.data.Amount = 0;
              node.data.PayAbleAmount = 0;
            }
          }
        }
      });
    }
  }
  CalculateTotalContractAmountOnYears() {
    if (this.ContractAssetIncomeListData != null) {
      this.ContractAssetIncomeListData.forEach(item => {
        this.CalculateTime(item.FromDatePersian, item.ToDatePersian);
        if (this.DifferenceMonth !== 0) {
          item.MonthlyAmount = (Math.round(item.Amount / (this.DifferenceMonth + this.DifferenceRatioDay)));
        } else {
          item.MonthlyAmount = item.Amount / this.DifferenceDay;
        }
      });
    }
  }
  CalculateTime(FromDate, ToDate) {
    // tslint:disable-next-line:radix
    const CurrentYearFrom = parseInt(FromDate.split('/')[0]);
    // tslint:disable-next-line:radix
    const CurrentYearTo = parseInt(ToDate.split('/')[0]);
    // tslint:disable-next-line:radix
    const CurrentMonthFrom = parseInt(FromDate.split('/')[1]);
    // tslint:disable-next-line:radix
    const CurrentMonthTo = parseInt(ToDate.split('/')[1]);
    // tslint:disable-next-line:radix
    let CurrentDayFrom = parseInt(FromDate.split('/')[2]);
    // tslint:disable-next-line:radix
    let CurrentDayTo = parseInt(ToDate.split('/')[2]);
    if (CurrentDayFrom === 31 || CurrentDayFrom === 29) {
      CurrentDayFrom = 30;
    }
    if (CurrentDayTo === 31 || CurrentDayTo === 29) {
      CurrentDayTo = 30;
    }
    // tslint:disable-next-line: prefer-const
    this.DifferenceDay = CurrentDayTo - CurrentDayFrom + 1;
    this.DifferenceRatioDay = this.DifferenceDay / 30;
    let DifferenceYear = CurrentYearTo - CurrentYearFrom;
    if (DifferenceYear === 0) {
      this.DifferenceMonth = CurrentMonthTo - CurrentMonthFrom;
    } else {
      this.DifferenceMonth = CurrentMonthTo - CurrentMonthFrom + (12 * DifferenceYear);
    }
  }
  ContractAssetIncomeSave() {
    const ContractAssetIncomeList = [];
    this.gridApi_ContractAssetIncome.stopEditing();
    this.gridApi_ContractAssetIncome.forEachNode(node => {
      const ContractAssetIncomeObj = {
        ContractAssetIncomeID: node.data.ContractAssetIncomeID ? node.data.ContractAssetIncomeID : -1,
        AssetIncomeID: node.data.AssetIncomeID,
        ContractID: this.selectedContractID,
        Amount: node.data.Amount,
        PayAbleAmount: node.data.PayAbleAmount,
        FromDate: node.data.ShortFromDate ? node.data.ShortFromDate : null,
        ToDate: node.data.ShortToDate ? node.data.ShortToDate : null
      };
      ContractAssetIncomeList.push(ContractAssetIncomeObj);
    });
    this.ContractList.SaveContractAssetIncomeList(ContractAssetIncomeList, this.selectedContractID, this.ModuleCode)
      .subscribe(res => {
        this.showMessageBox('ثبت با موفقيت انجام شد');
      },
        err => {
          this.showMessageBox('ثبت با مشکل مواجه شد');
        });
  }
  OnChIsVolumetricChange(event) {
    this.IsVolumetric = event;
  }
  OnIsEstimateChange(event) {
    this.IsEstimate = event;
  }
  OnChIsCumulativeChange(event) {
    this.IsCumulative = event;
  }
  OnChIsNotContollingPayDatePeriodChange(event) {
    this.NotControllingPayDatePeriod = event;
  }
  OnChIsMultiInvoiceChange(event) {
    this.IsMultiInvoice = event;
  }

  OnHasExpiredSupervisionChange(event) {
    this.HasExpiredSupervision = event;
  }

  onPrintFlowClick(row) {
    if (row.ProductRequestID) {
      this.ProductRequestServices.GetProductRequest(row.ProductRequestID).subscribe(res => {
        this.Report.ShowReport(null,
          null,
          row.ProductRequestID,
          res.ProductRequestCode,
          null,
          res.PersianProductRequestDate,
          this.Subject,
          null,
          null,
          null,
          this.ModuleCode,
          res.RegionCode
        );
      });
    } else {
      this.showMessageBox('درخواست این مرحله قراداد مشخص نمی باشد');
    }
  }
  RelatedProductRowClick(event) {
    this.ProductIDs = [];
    this.gridApiRelatedProduct.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }
    });
  }
  onSaveRelatedProduct() {
    this.gridApiRelatedProduct.stopEditing();
    this.RelatedProductList = [];
    this.RelatedProductRowData = [];
    this.gridApiRelatedProduct.forEachNode(res => {
      this.RelatedProductRowData.push(res.data);
    });
    this.RelatedProductRowData.forEach(res => {
      const RelatedProduct = {
        RequestRelatedProductID: res.RequestRelatedProductID,
        CostFactorID: this.ProductRequestID,
        ProductID: res.ProductID,
      };
      this.RelatedProductList.push(RelatedProduct);
    });
    this.ContractList.SaveRequestRelatedProduct(this.RelatedProductList, this.ProductRequestID).subscribe(res => {
      this.showMessageBox('ثبت با موفقيت انجام شد');
    },
      err => {
        this.showMessageBox('ثبت با مشکل مواجه شد');
      });
  }
  oncellEditingStarted(event) {
    this.ProductIDs = [];
    this.gridApiRelatedProduct.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }

      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });
    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      this.ProductRequestServices.GetIsVolumetricProductList(0,
        this.RegionCode,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        true,
        this.ContractPayDate,
        null).
        subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }
  FetchMoreProduct(event) {
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequestServices.GetIsVolumetricProductList(event.SearchOption,
        event.Owner.RegionCode,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        true,
        event.Owner.ContractPayDate,
        null).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }
  FetchProductByTerm(event) {
    event.Owner.ProductRequestServices.GetIsVolumetricProductList(event.SearchOption,
      event.Owner.RegionCode,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      true,
      event.Owner.ContractPayDate,
      null).
      subscribe(res => {
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }
  RedioSelectedChange(event) {
    event.Owner.ProductRequestServices.GetIsVolumetricProductList(event.SearchOption,
      event.Owner.RegionCode,
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode, true, event.Owner.ContractPayDate, null).
      subscribe(res => {
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }
  FetchMoreContractPerson(event) { // 62280
    this.IsPerson = event.Owner.ContractPersonSelectedRow.PersonTypeCode === 1 ? true : false;
    event.Owner.adContractPersoncol[3].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, this.IsPerson, false, true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            element.ActorID = element.ActorId;
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'ContractPerson'
      });
    });
  }
  FetchContractPersonByTerm(event) { // 62280
    this.IsPerson = event.Owner.ContractPersonSelectedRow.PersonTypeCode === 1 ? true : false;
    event.Owner.adContractPersoncol[3].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.IsPerson, false, true).subscribe(res => {
        res.List.forEach(el => {
          el.ActorID = el.ActorId;
        });
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractPerson'
        });
      });
  }
  onContractPersoncellEditingStarted(event) { // 62280
    this.IsPerson = event.data.PersonTypeCode === 1 ? true : false;
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.adContractPersoncol[3].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', this.IsPerson, false, true).subscribe(res => {
        res.List.forEach(el => {
          el.ActorID = el.ActorId;
        });
        this.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractPerson'
        });
      });
    }
  }

  DeleteContractOrder() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } 
    
  }
  
  DoDelete(){
    this.ContractList.DeleteContractOrder(this.SelectedOrderID).subscribe(res => {
      this.ContractList.GetContractOrderList(this.selectedContractID).subscribe(res2 => {
        this.ContractOrderListData = res2;
      });
      this.showMessageBox('حذف با موفقيت انجام شد');
    })
  }
}
