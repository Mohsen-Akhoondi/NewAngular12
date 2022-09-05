import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { isUndefined } from 'util';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { FormGroup } from '@angular/forms';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import * as moment from 'jalali-moment';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-product-request-page-without-flow',
  templateUrl: './product-request-page-without-flow.component.html',
  styleUrls: ['./product-request-page-without-flow.component.css']
})
export class ProductRequestPageWithoutFlowComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ShowMapField') ShowMapField: TemplateRef<any>;
  @Input() PopupMaximized;
  @Input() InputParam;
  IsAdmin;
  ArchiveParam;
  IsdisablebleAdmin = true;
  PopupParam;
  LastInquiryObject;
  currentRegionObject;
  OrginalModuleCode;
  ModuleViewTypeCode_Cache;
  HaveInquiry = false;
  HasShow = true;
  CheckRegionWritable = true;
  CurrentUserSubCostCenter;
  IsNew = true;
  ActLocation;
  IsProvisionCentralized = 0;
  MainBodyHeight = 87;
  VWExeUnitItems;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ShowArchiveBtn = false;
  ModuleCode;
  ContractItems;
  ContractParams = {
    bindLabelProp: 'SelectedSubject',
    bindValueProp: 'ContractId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: this.IsNew,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: false,
    DropDownMinWidth: '320px',
    type: 'related-contract',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره قرارداد', HeaderName: 'LetterNo', width: 35, MinTermLenght: 1, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };

  UnitPatternItems;
  UnitPatternParams =
    {
      bindLable: 'UnitTopicName',
      bindValue: 'UnitPatternID',
      selectedObject: null,
      Disabled: false,
      AllowParentSelection: true,
      TextSpanWidth: 130,
      Required: false
    };
  IsDown = false;
  IsCost = true;
  i;
  CurrentSubCostCenterID;
  CheckValidate = false;
  complexForm: FormGroup;
  PRCostRowData = [];
  IncrementTypeItems;
  EstateAssetRowData = [];
  AssetRowData = [];
  CustomerOrderItems;
  ContractTotalItemCount;
  ContractPageCount;
  CustomerOrderParams = {
    bindLabelProp: 'FullCustomerName',
    bindValueProp: 'CustomerOrderID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    Required: false,
    DropDownMinWidth: '300px',
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    type: 'customer-order',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'CustomerOrderCode', width: 30, TermLenght: 3, SearchOption: 'CustomerOrderCode' },
        { HeaderCaption: 'نام', HeaderName: 'FullCustomerName', width: 53, MinTermLenght: 3, SearchOption: 'FullCustomerName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 30, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  OnFilterRegionItems;
  OnFilterRegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  RegionAreaItems;
  RegionAreaParams = {
    bindLabelProp: 'RegionAreaCode',
    bindValueProp: 'RegionAreaID',
    placeholder: '',
    MinWidth: '50px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  RegionAreaDistrictItems;
  RegionAreaDistrictParams = {
    bindLabelProp: 'RegionAreaDistrictName',
    bindValueProp: 'RegionAreaDistrictID',
    placeholder: '',
    MinWidth: '50px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  RequestedPersonItems;
  RequestedPersonParams = {
    bindLabelProp: 'FullPersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  MyRegionGroup;
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

  PreRegionItems = [];
  PreRegionParams = {
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

  RusteeItems;
  RusteeParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubRusteeItems;
  SubRusteeParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader;
  HaveMaxBtn;
  columnDef;
  HeightPercentWithMaxBtn = 95;
  gridApi: any;
  rowsData: any = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false, IsMultiLine: false };
  Excel_Header_Param: { colDef2: any };
  gridHeightDiv = 42;
  GridHeight = 82;
  IsAssetEstate = false;
  GetCurrentDate;
  HaveSave = false;
  HaveUpdate = false;
  HaveDelete = false;
  IsRowClick = false;
  RegionListSet;
  selectedRegion;
  selectCostCenter;
  UnitPatternSet;
  currentContractSearchTerm;
  selectedUnitPattern;
  ProductRequestDate;
  ProductRequestCostColDef;
  EstateAssetColDef = [];
  AssetColDef = [];
  DeadLineDate;
  RequestPersonObject;
  ProductRequestPersoncolDef = [];
  ProductRequestRowData = [];
  ProductRequestCostRowData = [];
  PRPersonGridApi;
  PRCostGridApi;
  AssetGridApi;
  IsInCome;
  EstateAssetGridApi;
  Subject = '';
  BriefingReport = '';
  Address = '';
  CostCenterItems;
  ShowActLocation = true;
  ShowRequestType = true;
  ShowContract = true;
  ShowISCost = true;
  widthcode = 68;
  WidthProduct = 60;
  WidthDeadLine = 66;


  ContractSubject = '';
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubCostCenterItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ProductRequestCode;
  ProductRequestNo;
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
    Required: false,
    type: 'PRI-product',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, TermLenght: 3, SearchOption: 0 },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1, CanGrow: true }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
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
    Required: false,
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
  AssetNgSelectVSParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'AssetID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: false,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد کالا', HeaderName: 'AssetCode', width: 35, MinTermLenght: 3, SearchOption: 'AssetCode' },
        { HeaderCaption: 'نام کالا', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 'ProductName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد کالا', width: 35, },
        { HeaderCaption: 'نام کالا', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ActLocationParams = {
    bindLabelProp: 'ActLocationName',
    bindValueProp: 'ActLocationID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ActLocationItems;
  startLeftPosition;
  startTopPosition;
  ArchiveBtnText = 'مستندات';
  CostFactorID;
  ProductRequestObject;
  IsDisable = true;
  SumFinalAmount = 0;
  SumFinalAmountStr = '0';
  PercentWidth = null;
  MainMaxwidthPixel = null;
  MinHeightPixel = null;
  RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.ContractParams,
  this.SubRusteeParams, this.RequestedPersonParams, this.ActLocationParams, this.RusteeParams,
  this.CostCenterParams, this.SubCostCenterParams];
  IsInit: boolean;
  // HaveConfirm = false;
  btnConfirmName;
  btnConfirmIcon;
  WorkFlowID: number;
  ObjectNo: string;
  WorkflowTypeName: string;
  ObjectID: any;
  WorkflowTypeCode;
  WorkflowObjectCode;
  ModuleViewTypeCode;
  BtnClickedName: string;
  IsEndFlow: any;
  ChangeDetection: any;
  WorkFlowTransitionID;
  ReadyToConfirm;
  // ConfirmStatus = [];
  IsEditable;
  PersianProductRequestDate;
  ContractListSetFrom;
  btnContractName = 'تکمیل اطلاعات قرارداد';
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];

  ProdcutTypeCode: any;
  btnRevocationName;
  MainMinwidthPixel: number;
  RelatedProductRequestObject;
  RelatedProductRequestID: any;
  IsContractSelect: boolean;
  IsInsert = false;
  tabpanelDiv = 85;
  ContractorItems;
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
        [{ HeaderCaption: 'شناسه ملی', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام شخص', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه ملی', width: 35, },
        { HeaderCaption: 'نام شخص', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractorTotalItemCount;
  ContractorPageCount;
  TechCoef;
  HasAssetEstaeBtn = false;
  HasPrintBtn = true;
  ISProvisionRemain: any;
  IsFinalConfirm = false;
  btnRevocationIcon: string;
  // AccessRevocation: boolean;
  HaveRevocation: boolean;
  IsWFDisable: boolean;
  MinimumPosting: any;
  IsShow = false;
  SumFinalAmountRelatedContract = 0;
  PerecentageChangesLabel = false;
  PercentageOfChanges = 0;
  PercentageOfChangesStr = '0';
  IsCommitionMember = false;
  SumProductRequestItem = 0;
  PriceListPatternID = null;
  DisabledControls = true;
  CartableUserID;
  CurrWorkFlow: any;
  OverMainMinwidthPixel;
  QtyIsEditable: boolean;
  HasRequestEvalateBtn = false;
  HasArchive = false;
  HasBtnAutomationLetter = false;
  IsShowPreRegion = false
  AmlakRegionObject = { RegionCode: 80, RegionName: 'سازمان املاک و مستغلات' };

  NgSelectContractEntityItemParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'EntityTypeItemID',
    placeholder: '',
    MinWidth: '200px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'entity-item',
  };
  selectedrow: any;
  VirtualGroupModuleTypeName = '';
  VirtualModuleTypeCode: number;
  UserRegionCode;
  SumAmountCOEFStr = '0';
  SumAmountCOEFPactStr = '0';
  ResearcherID;
  Show = true;
  HasAsset = false;
  ShowFinalControlBtn = false; // RFC 57024
  IsRelated = false;
  PriceListTopicRasteParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    DropDownMinWidth: '100px',
    type: 'price-list-topic',
    Required: false
  };
  PriceListTopicRasteItems = [];
  RankItems = [];
  RankParams = {
    bindLabelProp: 'GradeID',
    bindValueProp: 'GradeID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: false
  };
  PRTypeItems; // RFC 59678
  PRTypeParams = {
    bindLabelProp: 'ProductRequestTypeName',
    bindValueProp: 'ProductRequestTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true
  };
  HaveAlertToFinance = false;
  ShowInvest = false;
  DocTypeMadatory;
  ContractRelationList;
  constructor(
    private ContractList: ContractListService,
    private Actor: ActorService,
    private User: UserSettingsService,
    private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private router: Router,
    private RefreshPersonItems: RefreshServices,
    private CommonService: CommonServices,
    private ArchiveList: ArchiveDetailService,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private route: ActivatedRoute,
    private RefreshCustomerOrder: RefreshServices,
    private contractpaydetail: ContractPayDetailsService,
    private FlowService: WorkflowService,
    private Report: ReportService,
    private PriceList: PriceListService,) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });

    this.RankItems =
      [
        { GradeID: 1 },
        { GradeID: 2 },
        { GradeID: 3 },
        { GradeID: 4 },
        { GradeID: 5 },
      ];

    this.ProductRequestPersoncolDef = [
      {
        headerName: 'ردیف ',
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
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'PersonName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'PersonName',
          multiField: 'PersonName',
          firsField: 'FirstName',
          nextField: 'LastName',
          bindValueProp: 'ActorId'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      }];
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع',
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
          params.data.ScaleName = null;
          params.data.ProductID = null;
          params.data.ProductName = null;
          if (params.newValue && params.newValue.ProductTypeName) {
            params.data.ProductTypeName = params.newValue.ProductTypeName;
            params.data.ProductTypeCode = params.newValue.ProductTypeCode;
            return true;
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            return false;
          }
        },
        editable: true,
        width: 70,
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
            this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
              params.data.ScaleName = res;
            });
            this.EntityColumnDefinition(params.data.ProductID, this.selectedrow, null, true);
            return true;
          } else {
            params.data.ProductCodeName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        width: 350,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: () => {
          return this.IsEditable;
        },
        width: 250,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'ScaleName',
        width: 90,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
        editable: (Params) => {
          // return this.IsEditable; // true/false based on params (or some other criteria) value
          return ((!this.IsNew) && Params.data.ProductRequestItemID > 0) ? false : this.IsEditable;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-pr-wf'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-pr-wf'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: (params) => {
          if (params.data.ProductTypeCode === 2 && this.currentRegionObject.RegionGroupCode === 3) {  // RFC 52896
            return false;
          } else {
            return this.IsEditable;
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            // tslint:disable-next-line: radix
            params.data.QTY = params.newValue;
            // tslint:disable-next-line: radix
            // tslint:disable-next-line: max-line-length
            params.data.FinalAmount = Math.round(parseFloat((!params.newValue || params.newValue == 0) ? 1 : params.newValue) * (params.data.Amount)); // RFC 54950
          }
        },
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        HaveThousand: true,
        width: 120,
        resizable: true,
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
            params.data.Amount = params.newValue;
            // tslint:disable-next-line: max-line-length
            if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
              params.data.FinalAmount = params.data.Amount;
            } else {
              params.data.FinalAmount = Math.round(parseFloat(params.data.QTY) * params.newValue);
            }
          }
        },
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      // {
      //   headerName: 'مبلغ با احتساب ضرایب ردیف',
      //   field: 'AmountCOEF',
      //   HaveThousand: true,
      //   width: 200,
      //   resizable: true
      // },
      {
        headerName: 'مبلغ کل بااحتساب ضرایب',
        field: 'AmountCOEFPact',
        HaveThousand: true,
        width: 150,
        resizable: true
      }
    ];
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
        field: 'CostProductId',
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
    this.AssetColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'اموال',
        field: 'AssetID',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.AssetNgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreAsset,
          FetchByTerm: this.FetchAssetByTerm,
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
        editable: () => {
          return this.IsEditable;
        },
        width: 300,
        resizable: true
      },
      {
        headerName: 'کد اموال',
        field: 'AssetCode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'برچسب',
        field: 'AssetTag',
        width: 200,
        resizable: true
      },
      {
        headerName: 'شناسه دسترسی',
        field: 'RefrenceNo',
        width: 200,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'AssetNote',
        width: 378,
        resizable: true
      }
    ];
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.EstateAssetColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'ملک',
        field: 'AssetRefrenceNo',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'AssetRefrenceNo',
          bindValueProp: 'AssetID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.AssetRefrenceNo;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.AssetID) {
            params.data.AssetRefrenceNo = params.newValue.AssetRefrenceNo;
            params.data.AssetID = params.newValue.AssetID;
            this.ProductRequest.GetAssetEstateDetailsByAssetID(params.newValue.AssetID).subscribe(res => {
              params.data.BlockNo = res.BlockNo;
              params.data.LandNo = res.LandNo;
              params.data.ApartmentNo = res.ApartmentNo;
              params.data.BusinessNo = res.BusinessNo;
              params.data.Address = res.Address;
            });
          }
        },
        editable: true,
        width: 100,
        resizable: true
      },
      {
        headerName: 'بلوک',
        field: 'BlockNo',
        width: 160,
        resizable: true
      },
      {
        headerName: 'ملک',
        field: 'LandNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'آپارتمان',
        field: 'ApartmentNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیشه ور',
        field: 'BusinessNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'آدرس',
        field: 'Address',
        width: 400,
        resizable: true
      },
      {
        headerName: 'جانمایی',
        width: 80,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowMapField
        }
      }
    ];
  }

  ngOnInit() {
    this.User.CheckAdmin().subscribe(res => {
      this.IsAdmin = res;
    });
    if (this.InputParam && this.InputParam.DisabledControls === 'YES'
      && this.InputParam.ModuleViewTypeCode === 500000) {
      this.DisabledControls = false;
      this.IsEditable = false;
    }

    this.CheckRegionWritable = this.InputParam && this.InputParam.IsRegionReadOnly;
    this.ProductRequest.GetCurrentDate().subscribe(resss => {
      this.ProductRequestDate = resss;
    });
    if (this.InputParam) {
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.WorkflowTypeName = this.InputParam.WorkflowTypeName;
      this.WorkflowTypeCode = this.InputParam.WorkflowTypeCode;
      this.WorkflowObjectCode = this.InputParam.WorkflowObjectCode;
      this.ObjectNo = this.InputParam.ObjectNo;
      this.ObjectID = this.InputParam.ObjectID;
      this.CartableUserID = this.InputParam.CartableUserID;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.ReadyToConfirm = this.InputParam.ReadyToConfirm;
      this.ISProvisionRemain = this.InputParam.ISProvisionRemain;
      this.MinimumPosting = this.InputParam.MinimumPosting;
      // tslint:disable-next-line: max-line-length
      this.ModuleCode = this.ISProvisionRemain ? 2739 : this.InputParam.ModuleCode ? this.InputParam.ModuleCode :
        this.InputParam.ISEstateRequest ? 2776 : this.InputParam.ISTahator ? 2901 : this.ModuleCode ? this.ModuleCode :
          this.InputParam.CurrWorkFlow && this.InputParam.CurrWorkFlow.WorkflowObjectCode === 29 ? 3037 : 2840;
      this.ChangeViewType();
      // tslint:disable-next-line: max-line-length
      this.UserRegionCode = this.InputParam.UserRegionCode ? this.InputParam.UserRegionCode : this.ProductRequestObject ? this.ProductRequestObject.RegionCode : null;
    }
    if (this.ModuleCode === 2776 || this.ModuleCode === 2901) {
      this.HasAssetEstaeBtn = true;
      this.HasRequestEvalateBtn = true;
      this.HasPrintBtn = false;
    }

    if (this.ModuleCode === 2901) {
      this.HasArchive = true;
      this.HasBtnAutomationLetter = true;
      this.IsShowPreRegion = true;
      this.PreRegionItems.push(this.AmlakRegionObject);
    }

    if (this.ModuleCode === 2739) {
      this.HaveInquiry = false; // RFC 56935
    }
    if (this.OrginalModuleCode === 2739) {
      this.HaveInquiry = false;
      this.HasAsset = true;
    }
    if (this.ModuleCode === 2934) {
      this.Subject = this.InputParam.Subject;
      this.ResearcherID = this.InputParam.ResearcherID;
      this.ModuleCode = 2739;
    }
    this.ModuleViewTypeCode_Cache = this.ModuleViewTypeCode;

    this.IsInit = true;
    this.CostFactorID = -1;
    if (this.InputParam.CostFactorID) {
      this.CostFactorID = this.InputParam.CostFactorID;
    }
    if (this.ModuleCode === 3037) {
      this.ShowRequestType = false;
      this.ShowContract = false;
      this.ShowActLocation = false;
      this.ShowISCost = false;
      this.widthcode = 60; // rfc 64947
      this.WidthProduct = 68;
      this.WidthDeadLine = 60;
    }

    if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید';
      this.btnConfirmIcon = 'ok';
      // this.HaveConfirm = true;
    }

    if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'عدم تایید';
      this.btnConfirmIcon = 'cancel';
      // this.HaveConfirm = true;
    }

    if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'بازگشت از تایید نهایی';
      this.btnConfirmIcon = 'cancel';
      // this.HaveConfirm = true;
    }

    if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید نهایی';
      this.btnConfirmIcon = 'ok';
      // this.HaveConfirm = true;
      this.IsFinalConfirm = true;
    }

    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise<void>((resolve, reject) => {
      this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
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
        resolve();
      });
    }).then(() => {
      forkJoin([
        this.ProductRequest.GetSubCostCenterPerson(),
        this.ProductRequest.GetProductRequest(this.CostFactorID),
        this.ProductRequest.getAllPRType(),
      ]).subscribe(res => {
        this.CurrentUserSubCostCenter = res[0];
        this.PRTypeItems = res[2]; // RFC 59678
        if (res[1]) {
          this.FillAllNgSelectByProductRequest(res[1]);
          this.ProductRequestObject = res[1];
          this.ResearcherID = this.ProductRequestObject.ResearcherID;
          this.IsCost = this.ProductRequestObject.IsCost;
          this.IsProvisionCentralized = this.ProductRequestObject.IsProvisionCentralized;
          this.ProductRequestCode = this.ProductRequestObject.ProductRequestCode;
          this.ProductRequestNo = this.ProductRequestObject.ProductRequestNo;
          this.ProductRequestDate = this.ProductRequestObject.ShortProductRequestDate;
          this.DeadLineDate = this.ProductRequestObject.ShortDeadlineDate;
          this.Subject = this.ProductRequestObject.Subject;
          this.Address = this.ProductRequestObject.Address;
          this.TechCoef = this.ProductRequestObject.TechCoef;
          this.NgSelectContractorParams.selectedObject = this.ProductRequestObject.CorporateID;
          this.BriefingReport = this.ProductRequestObject.BriefingReport;
          this.IsDisable = false;
          this.rowsData = this.ProductRequestObject.ProductRequestItemList;
          this.SetEntityDataInDataRow(this.rowsData);
          this.ProductRequestObject.ProductRequestItemList.forEach(element => {
            this.SumProductRequestItem += element.FinalAmount;
          });
          this.EstateAssetRowData = this.ProductRequestObject.AssetEstateList; // this List Is not set and is Null
          this.AssetRowData = this.ProductRequestObject.AssetList;
          if (this.ProductRequestObject && this.ProductRequestObject.ContractObject) {
            this.IsInsert = true;
            this.ContractList.GetContractRelationList(this.ProductRequestObject.ContractObject.ContractId, this.CostFactorID).subscribe(res => {
              this.ContractRelationList = res;
            });
          }
          if (this.ProductRequestObject.RelatedContractID) {
            this.IsNew = false;
            this.IsRelated = true;
            this.btnContractName = 'تکمیل اطلاعات الحاقیه';
            this.PerecentageChangesLabel = true;
          }
          if (this.ProductRequestObject && this.ProductRequestObject.RelatedContractID) {
            this.contractpaydetail.GetFirstContractOrder(this.ProductRequestObject.RelatedContractID).subscribe(ress => {
              ress.forEach(item => {
                item.FinalAmount = item.Amount;
                this.SumFinalAmountRelatedContract = this.SumFinalAmountRelatedContract + parseFloat(item.FinalAmount);
              });
            });
          }
        } else {
          this.OnOpenNgSelect('Region');
        }
        if (this.ProductRequestObject &&
          this.ProductRequestObject.ProductRequestStatusCode &&
          this.ProductRequestObject.ProductRequestStatusCode !== 3) {
          this.btnRevocationName = 'ابطال';
          this.btnRevocationIcon = 'revocation';
          //  this.AccessRevocation = true;

        }
        if (this.ProductRequestObject &&
          this.ProductRequestObject.ProductRequestStatusCode &&
          this.ProductRequestObject.ProductRequestStatusCode === 3) {
          this.btnRevocationName = 'بازگشت از ابطال';
          this.btnRevocationIcon = 'cancel';
          // this.AccessRevocation = true;
        }
        // tslint:disable-next-line:max-line-length
        this.Actor.GetActorPaging(1, 30, '', 'IdentityNo', false, false, false, this.NgSelectContractorParams.selectedObject).subscribe(ress => {
          this.ContractorItems = ress.List;
          this.ContractorTotalItemCount = ress.TotalItemCount;
          this.ContractorPageCount = Math.ceil(ress.TotalItemCount / 30);
        });


        // if (this.ModuleCode === 2776 && this.IsCost) {
        //   this.IsAssetEstate = true;
        //   this.GridHeight = 79;
        //   this.gridHeightDiv = 33.5;
        //   this.tabpanelDiv = 83;
        // } else {
        //   this.IsAssetEstate = false;
        //   this.GridHeight = 82;
        //   this.gridHeightDiv = 43;
        //   this.tabpanelDiv = 83;
        // }
        this.rowsData.forEach(element => {
          this.EntityColumnDefinition(null, null, element.EntityList, false);
        });

        this.ShowModuleTypeName();
      });
    });
  }

  RefreshPageByRegion(ARegionCode) {
    this.IsDown = false;
    // tslint:disable-next-line: max-line-length
    this.currentRegionObject = this.ProductRequestObject && this.ProductRequestObject.RegionObject ? this.ProductRequestObject.RegionObject : this.RegionItems.find(x => x.RegionCode === ARegionCode);
    this.EstateAssetColDef[1].cellEditorParams.Items = this.ProductRequest.GetEstateAssetsByRegion(this.RegionParams.selectedObject, false);
    this.ProductRequestCostColDef[1].cellEditorParams.Items = this.ProductRequest.GetCostCenterByRegion(ARegionCode, null, null, false);
    this.ProductRequestCostColDef[3].cellEditorParams.Items = this.ProductRequest.GetUnitPatternByRegionCode(ARegionCode, false);
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ChangeViewType();
      this.IsDown = true;
    });
  }
  SetStartedWFInfo(Resolve) {
    this.FlowService.GetStartModuleViewTypeCode(this.RegionParams.selectedObject,
      this.ModuleCode,
      this.WorkflowTypeCode,
      this.CostFactorID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          // tslint:disable-next-line:max-line-length
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
        }
        Resolve();
      });
  }
  ChangeViewType() {
    if (this.CheckRegionWritable) {
      this.IsEditable = false;
    } else {
      if (this.ModuleCode === 2739) {
        switch (Number(this.ModuleViewTypeCode)) {
          case 1:
          case 4:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true;
            this.ShowFinalControlBtn = this.ModuleViewTypeCode === 4 ? true : false; // RFC 57024
            break;
          case 2:
            this.IsEditable = false;
            this.Show = false;
            break;
          case 3:
            this.HaveRevocation = true;
            this.IsEditable = false;
            break;
          case 100000: // اصلاح درخواست
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsShow = true;
            this.HaveRevocation = false;
            this.ShowFinalControlBtn = true;
            this.HaveInquiry = true;
            break;
          case 110000:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsShow = true;
            this.HasShow = this.HasPrintBtn = false;
            this.HaveRevocation = false;
            break;
          case 200000:
            this.IsEditable = false;
            this.IsShow = true;
            this.HaveRevocation = false;
            break;
          case 300000: // ابزار راهبری
            this.HaveSave = true;
            this.HaveUpdate = true;
            this.IsWFDisable = true;
            this.IsEditable = true;
            this.IsShow = true;
            this.HaveRevocation = false;
            this.ShowFinalControlBtn = true;
            break;
          case 400000: // جستجو پیشرفته
            this.IsShow = true;
            this.ShowFinalControlBtn = true;
            break;
          case 800000: // جستجو خدمات شهری
            this.IsShow = true;
            this.HaveInquiry = false;
            this.HasShow = false;
            break;
          case 500000: // حالت فقط خواندنی
            this.IsEditable = false;
            this.IsShow = true;  // 60680 // RFC 61645
            break;
          case 7: //  جسنجو دسترسی محدود
            this.IsEditable = false;
            this.ShowFinalControlBtn = true;
            break;
          default:
            this.IsEditable = false;
            break;
        }
      } else if (this.ModuleCode === 3037) {
        this.ShowInvest = true;
        this.IsEditable = true;
        this.IsCost = false;
      } else if (this.ModuleCode === 2776) {
        switch (Number(this.ModuleViewTypeCode)) {
          case 1:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; //RFC 51689
            break;
          case 2:
            this.IsEditable = false;
            break;
          case 3:
            this.IsEditable = false;
            this.HaveSave = false;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true;
            this.HaveAlertToFinance = true; // RFC 61605
            this.GridHeight = 79;
            this.gridHeightDiv = 38;
            this.tabpanelDiv = 83;
            this.btnContractName = 'مشاهده اطلاعات قرارداد';
            break;
          case 100000:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsShow = true;
            this.HaveRevocation = false;
            this.HaveInquiry = true;
            break;
          case 200000:
            this.IsEditable = false;
            this.IsShow = true;
            this.HaveRevocation = false;
            break;
          case 300000:
            this.HaveSave = true;
            this.HaveUpdate = true;
            this.IsWFDisable = true;
            this.IsEditable = true;
            this.IsShow = true;
            this.HaveRevocation = false;
            break;
          case 400000:
            this.IsShow = true;
            break;
          case 500000: // حالت فقط خواندنی
            this.IsEditable = false;
            this.IsShow = true;  // RFC 61645
            break;
          case 800000: // جستجو خدمات شهری
            this.IsShow = true;
            this.HaveInquiry = false;
            this.HasShow = false;
            break;
          default:
            this.IsEditable = false;
            break;
        }
      } else if ((this.ModuleCode === 2840)) {
        switch (Number(this.ModuleViewTypeCode)) {
          case 1:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; //RFC 51698
            break;
          case 2:
            this.IsEditable = false;
            break;
          case 3:
            this.HaveRevocation = true;
            this.IsEditable = false;
            break;
          case 100000:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsShow = true;
            this.HaveRevocation = true;
            this.HaveInquiry = true;
            break;
          case 200000:
            this.IsEditable = false;
            this.IsShow = true;
            this.HaveRevocation = false;
            break;
          case 300000:
            this.HaveSave = true;
            this.HaveUpdate = true;
            this.IsWFDisable = true;
            this.IsEditable = true;
            this.IsShow = true;
            this.HaveRevocation = true;
            break;
          case 400000:
            this.IsShow = true;
            break;
          case 500000: // حالت فقط خواندنی
            this.IsEditable = false;
            this.IsShow = true;  // RFC 61645
            break;
          default:
            this.IsEditable = false;
            break;
        }
      } else if (this.ModuleCode === 3034) {
        switch (this.ModuleViewTypeCode) {
          case 50000: // نمایش و عدم نمایش دکمه
            this.IsEditable = false;
            this.HasAssetEstaeBtn = false;
            this.HasRequestEvalateBtn = false;
            this.HasPrintBtn = false;
            this.HasArchive = true;
            this.HasShow = false;
            this.DisabledControls = false
            break;
        }
      }
      else if (this.ModuleCode === 2844) {
        switch (Number(this.ModuleViewTypeCode)) {
          case 800000: // جستجو خدمات شهری
            this.IsShow = true;
            this.HaveInquiry = false;
            this.HasShow = false;
            break;
          default:
            this.IsEditable = false;
            break;
        }
      } else if (this.ModuleCode === 2901) {
        switch (this.ModuleViewTypeCode) {
          case 1:
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true;
            break;
          case 2:
            this.IsEditable = false;
            this.HaveSave = false;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true;
            this.HaveAlertToFinance = true; // RFC 61416
            this.GridHeight = 79;
            this.gridHeightDiv = 38;
            this.tabpanelDiv = 83;
            this.btnContractName = 'مشاهده اطلاعات قرارداد';
            break;
          default:
            this.IsEditable = false;
            break;
        }
      }

      if (this.btnConfirmName === 'عدم تایید') {
        this.IsEditable = false;
      }
    }
  }
  onCellValueChanged(event) {
    // if (event.colDef && event.colDef.field === 'ProductName') {
    //   // if (event.newValue && event.newValue.ProductID) {
    //   //   this.ProductRequest.GetProductScaleName(event.newValue.ProductID).subscribe(res => {
    //   //     const itemsToUpdate = [];
    //   //     this.gridApi.forEachNode(node => {
    //   //       if (node.rowIndex === event.rowIndex) {
    //   //         node.data.ScaleName = res;
    //   //         node.data.ProductID = event.newValue.ProductID;
    //   //         itemsToUpdate.push(node.data);
    //   //       }
    //   //     });
    //   //     this.gridApi.updateRowData({ update: itemsToUpdate });
    //   //   });
    //   // } Done!
    // } else if (event.colDef && event.colDef.field === 'ProductTypeName') {
    //   // if (event.newValue && event.newValue.ProductTypeCode) {
    //   //   const itemsToUpdate = [];
    //   //   this.gridApi.forEachNode(node => {
    //   //     if (node.rowIndex === event.rowIndex) {
    //   //       node.data.ProductTypeCode = event.newValue.ProductTypeCode;
    //   //       node.data.ScaleName = null;
    //   //       node.data.ProductID = null;
    //   //       itemsToUpdate.push(node.data);
    //   //     }
    //   //   });
    //   //   this.gridApi.updateRowData({ update: itemsToUpdate });
    //   // } //Done!
    // } else if (event.colDef && event.colDef.field === 'QTY') {
    //   // const itemsToUpdate = [];
    //   // this.gridApi.forEachNode(node => {
    //   //   if (node.rowIndex === event.rowIndex) {
    //   //     // tslint:disable-next-line:radix
    //   //     node.data.FinalAmount = parseFloat(event.newValue) * parseInt(node.data.Amount);
    //   //     itemsToUpdate.push(node.data);
    //   //   }
    //   // });
    //   // this.gridApi.updateRowData({ update: itemsToUpdate });
    //   // Done!
    // } else if (event.colDef && event.colDef.field === 'Amount') {
    //   // const itemsToUpdate = [];
    //   // this.gridApi.forEachNode(node => {
    //   //   if (node.rowIndex === event.rowIndex) {
    //   //     node.data.Amount = event.newValue;
    //   //     if (node.data.QTY && node.data.QTY !== 0 && node.data.QTY !== '0') {
    //   //       // tslint:disable-next-line:radix
    //   //       node.data.FinalAmount = parseInt(event.newValue) * parseFloat(node.data.QTY);
    //   //     } else {
    //   //       // tslint:disable-next-line:radix
    //   //       node.data.FinalAmount = parseInt(event.newValue);
    //   //     }
    //   //     itemsToUpdate.push(node.data);
    //   //   }
    //   // });
    //   // this.gridApi.updateRowData({ update: itemsToUpdate });
    // }
    // Done!
  }

  popupclosed(event) {

    if (event && this.PopUpType === 'request-contract-without-flow') {
      this.ProductRequest.GetProductRequestItemListVW(this.CostFactorID, true).subscribe(res => {
        this.rowsData = res;
      });
    }

    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.MainMinwidthPixel = null;
    this.alertMessageParams.IsMultiLine = false;
    if (event && this.PopUpType === 'global-choose-page') {
      this.VirtualModuleTypeCode = event;
      this.OpenSelectedForm(this.VirtualModuleTypeCode);
    }
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    // if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
    //   if (this.ModuleCode === 2776 && this.IsCost) {
    //     this.gridHeightDiv = changes.PopupMaximized.currentValue ? 34.5 : 33.5;
    //   } else {
    //     this.gridHeightDiv = changes.PopupMaximized.currentValue ? 44 : 43;
    //   }
    // }
  }

  onChangeRegion(ARegionCode) {
    this.RegionParams.selectedObject = ARegionCode;
    this.AssetRowData = [];
    this.EstateAssetRowData = [];
    this.AssetColDef[1].cellEditorParams.Items = [];
    this.EstateAssetColDef[1].cellEditorParams.Items = [];
    this.CustomerOrderParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.CostCenterParams.selectedObject = null;
    this.RusteeParams.selectedObject = null;
    this.SubRusteeParams.selectedObject = null;
    this.VWExeUnitParams.selectedObject = null;
    this.ContractParams.selectedObject = null;
    this.WorkflowTypeCode = null;
    this.ModuleViewTypeCode = null;
    this.PreRegionParams.selectedObject = null;
    this.OnFilterRegionParams.selectedObject = this.RegionParams.selectedObject;
    if (!isUndefined(ARegionCode) && ARegionCode !== null) {
      this.RefreshPageByRegion(ARegionCode);
    }
  }

  onChangeFilterRegion(ARegionCode) {
    this.RegionAreaParams.selectedObject = null;
    this.RegionAreaDistrictParams.selectedObject = null;
  }

  onChangeRegionArea(RegionAreaDistrictID) {
    this.RegionAreaDistrictParams.selectedObject = null;
  }

  onChangeAreaDistrict(RegionAreaID) {

  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = this.alertMessageParams.IsMultiLine ? 106 : 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.RegionParams.selectedObject,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        event.Owner.IsCost,
        null).
        subscribe(res => {
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
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'PRI-product'
      });
    });
  }

  FetchProductByTerm(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'PRI-product'
        });
      });
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:max-line-length
          this.ProdcutTypeCode = node.data.ProductTypeCode;
        }
      });
      this.columnDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(0,
        this.RegionParams.selectedObject,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        this.IsCost,
        event.data.ProductID).
        subscribe(res => {
          this.columnDef[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'PRI-product'
          });
        });
    }

    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, event.data.ProductID, null, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });
    }
  }
  onAssetcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'AssetID') {
      this.AssetColDef[1].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetAssetsByRegion(this.RegionParams.selectedObject, 1, 30, '', null, true).
        subscribe(res => {
          this.AssetColDef[1].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  FetchMoreAsset(event) {
    event.Owner.AssetColDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetAssetsByRegion(event.Owner.RegionParams.selectedObject,
        event.PageNumber,
        event.PageSize,
        event.term,
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
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }

  FetchAssetByTerm(event) {
    event.Owner.AssetColDef[1].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetAssetsByRegion(event.Owner.RegionParams.selectedObject,
      event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
        event.Owner.AssetColDef[1].cellEditorParams.Params.loading = false;
      });
  }

  FetchMoreCostProduct(event) {
    event.Owner.ProductRequestCostColDef[4].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetCostProductBySubCostCenter(
        event.Owner.CurrentSubCostCenterID,
        event.Owner.RegionParams.selectedObject,
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
      event.Owner.RegionParams.selectedObject,
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
        this.RegionParams.selectedObject,
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

  onSave() {
    if (this.RegionParams.selectedObject > 22 && this.IsNew && this.IsCost) { // 62768
      if (!this.PRTypeParams.selectedObject || this.PRTypeParams.selectedObject <= 0) {
        this.ShowMessageBoxWithOkBtn('نوع درخواست معامله را انتخاب نمایید');
        return;
      }
      if (this.PRTypeParams.selectedObject && !this.PriceListTopicRasteParams.selectedObject
        && (this.PRTypeParams.selectedObject === 1 || this.PRTypeParams.selectedObject === 4)) {
        this.ShowMessageBoxWithOkBtn('رسته را وارد نمایید');
        return;
      }
      if (this.PRTypeParams.selectedObject && !this.RankParams.selectedObject
        && (this.PRTypeParams.selectedObject === 1 || this.PRTypeParams.selectedObject === 4)) {
        this.ShowMessageBoxWithOkBtn('رتبه را وارد نمایید');
        return;
      }
    }
    this.CheckValidate = true;
    let ValidateForm = true;
    if (this.ModuleCode === 3037) {
      this.RequiredComponents = [
        this.RegionParams,
        this.VWExeUnitParams,
        this.SubRusteeParams,
        this.RequestedPersonParams,
        this.RusteeParams,
        this.CostCenterParams,
        this.SubCostCenterParams
      ];
    }
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {
      ValidateForm =
        ValidateForm &&
        this.Subject && ((this.ModuleCode === 2840 || this.ModuleCode === 3034) ? this.Address : true) &&
        this.ProductRequestDate;
      if (ValidateForm) {
        let ItemNo = 0;
        const ProductRequestList = [];
        const ProductRequestEstateList = [];
        this.gridApi.stopEditing();
        this.AssetGridApi.stopEditing();
        this.EstateAssetGridApi.stopEditing();

        const ProductRequestObj = {
          CostFactorID: this.ProductRequestObject && this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : -1,
          RegionCode: this.RegionParams.selectedObject,
          IsCost: this.IsCost,
          ProductRequestCode: -1,
          ProductRequestDate: this.ProductRequestDate,
          DeadlineDate: this.DeadLineDate,
          UnitPatternID: this.VWExeUnitParams.selectedObject,
          CustomerOrderID: this.CustomerOrderParams.selectedObject,
          ActorID: this.RequestedPersonParams.selectedObject,
          WorkPlaceCode: this.OnFilterRegionParams.selectedObject, // واحد اجرایی محل انجام کار
          RegionAreaID: this.RegionAreaParams.selectedObject, // ناحیه
          RegionAreaDistrictID: this.RegionAreaDistrictParams.selectedObject, // محله
          Subject: this.Subject,
          Address: this.Address,
          ProductRequestStatusCode: 1,
          InvVoucherGroupCode: this.RegionParams.selectedObject === 200 && !this.IsCost ? 10 : 1,  // 65085
          HasLicence: 0,
          ResearcherID: this.ResearcherID,
          RelatedContractID: this.ContractParams.selectedObject,
          // tslint:disable-next-line:max-line-length
          PersonUnitPatternID: this.UnitPatternParams.selectedObject && this.UnitPatternParams.selectedObject.UnitPatternID ? this.UnitPatternParams.selectedObject.UnitPatternID : null,
          SubCostCenterID: this.SubCostCenterParams.selectedObject,
          ContractStackHolderID: this.SubRusteeParams.selectedObject,
          BriefingReport: this.BriefingReport,
          IsWeb: 1,
          CorporateID: this.NgSelectContractorParams.selectedObject,
          TechCoef: this.TechCoef,
          ActLocationID: this.ActLocationParams.selectedObject,
          IsProvisionCentralized: this.IsProvisionCentralized,
          PriceListTopicID: this.PriceListTopicRasteParams.selectedObject ? this.PriceListTopicRasteParams.selectedObject : null,
          ProductRequestTypeCode: this.PRTypeParams.selectedObject ? this.PRTypeParams.selectedObject : null, // RFC 59678
          GradeID: this.RankParams.selectedObject ? this.RankParams.selectedObject : null,
          PriceListPatternID: this.ContractParams.selectedObject && this.ProductRequestObject === null
            && this.ProductRequestObject.PriceListPatternID === null ? this.PriceListPatternID : null,
          // tslint:disable-next-line:max-line-length
          IsTaxValue: this.ProductRequestObject && this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.IsTaxValue : true, // RFC 55234 - درخواست خ احمدی
          IsConfirm: 0,
          RequestObjectTypeCode:
            this.OrginalModuleCode === 2739 ? 2 : // درخواست چابک
              this.OrginalModuleCode === 2840 ? 5 : // قرارداد مشارکتی
                this.OrginalModuleCode === 2934 ? 6 : // قرارداد چابک پژوهشی
                  this.OrginalModuleCode === 2776 ? 7 : // درخواست معامله ملکی
                    this.OrginalModuleCode === 2901 ? 9 : // درخواست تهاتر ملکی
                      this.OrginalModuleCode === 3034 ? 5 : // قرارداد مشارکتی
                        this.OrginalModuleCode === 3037 ? 12 : // درخواست معامله نیابتی
                          null
        };
        this.gridApi.forEachNode(node => {
          var keys = Object.keys(node.data);
          const EntityTypeItemIDList = [];
          if (node.data.EntityList) {
            node.data.EntityList.forEach(Entity => {
              let str = 'Subject' + Entity.EntityTypeID.toString()
              let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
              var key = keys.find(x => x === str);

              if (key && node.data[key]) {
                if (node.data[key].EntityTypeItemID) {
                  EntityTypeItemIDList.push(node.data[key].EntityTypeItemID);
                } else {
                  key = keys.find(x => x === ID);
                  if (key && node.data[key]) {
                    EntityTypeItemIDList.push(node.data[key]);
                  }
                }
              }

            });
          }
          const ProductRequestItemObj = {
            ProductRequestItemID: node.data.ProductRequestItemID ? node.data.ProductRequestItemID : -1,
            CostFactorID: ProductRequestObj.CostFactorID,
            ItemNo: ++ItemNo,
            // tslint:disable-next-line:radix
            QTY: parseFloat(node.data.QTY),
            Subject: node.data.Subject,
            // tslint:disable-next-line:radix
            Amount: parseInt(node.data.Amount),
            // tslint:disable-next-line:radix
            //  AmountToCheck: node.data.Amount,
            // tslint:disable-next-line:max-line-length
            ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
            // tslint:disable-next-line:max-line-length
            StartDate: node.data.PersianStartDate && node.data.PersianStartDate.MDate ? node.data.PersianStartDate.MDate : (node.data.ShortStartDate ? node.data.ShortStartDate : null),
            // tslint:disable-next-line:max-line-length
            EndDate: node.data.PersianEndDate && node.data.PersianEndDate.MDate ? node.data.PersianEndDate.MDate : (node.data.ShortEndDate ? node.data.ShortEndDate : null),
            EntityTypeItemIDList: EntityTypeItemIDList,
            ProductRequestRegionCode: this.RegionParams.selectedObject,
          };
          ProductRequestList.push(ProductRequestItemObj);
        });
        const ContractOrderObj = {
          ContractOrderID: -1,
          CostCostFactorID: -1,
          OrderNo: -1,
          OrderDate: ProductRequestObj.ProductRequestDate,
          Note: ProductRequestObj.Subject,
          ContractOrderItemDataList: [],
        };

        const AssetPRList = [];
        this.AssetGridApi.forEachNode(node => {
          const AssetObj = {
            CostFactorID: this.CostFactorID,
            ProductRequestEstateID: node.data.ProductRequestEstateID ? node.data.ProductRequestEstateID : null,
            AssetID: node.data.AssetID ? node.data.AssetID : null,
          };
          AssetPRList.push(AssetObj);
        });
        ProductRequestList.forEach(node => {
          const ContractOrderItemObj = {
            ContractOrderItemID: -1,
            ContractOrderID: -1,
            ItemNo: node.ItemNo,
            Qty: node.QTY,
            Note: node.Subject,
            Amount: node.QTY && (node.QTY !== 0 && node.QTY !== '0') ? node.Amount * node.QTY : node.Amount,
            ProductID: node.ProductID,
            StartDate: node.StartDate,
            EndDate: node.EndDate,
          };
          ContractOrderObj.ContractOrderItemDataList.push(ContractOrderItemObj);
        });

        this.ProductRequest.SaveProductRequest(this.ModuleCode,
          ProductRequestObj,
          ProductRequestList,
          ContractOrderObj,
          true, // RFC 54838
          this.PercentageOfChanges,
          this.OrginalModuleCode,
          AssetPRList
        ).subscribe((res: any) => {
          this.SumProductRequestItem = 0;
          this.ProductRequestCode = res.ProductRequestCode;
          this.ProductRequestNo = res.ProductRequestNo;
          this.rowsData = res.ProductRequestItemList;
          this.CostFactorID = res.CostFactorID;
          this.ProductRequestObject = res;
          this.ActLocation = res.ActLocationID;
          this.rowsData = this.ProductRequestObject.ProductRequestItemList;
          this.SetEntityDataInDataRow(this.rowsData);
          this.ProductRequestObject.ProductRequestItemList.forEach(element => {
            this.SumProductRequestItem += element.FinalAmount;
          });
          this.IsDisable = false;
          if (this.ProductRequestObject && this.ProductRequestObject.ContractObject) {
            this.IsInsert = true;
          }
          this.Output.emit(true);
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        },
          err => {
            if (!err.error.Message.includes('|')) {
              this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
            }
          });
      } else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });
    // });
  }

  RedioSelectedChange(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.columnDef[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'PRI-product'
        });
      });
  }

  onPRPersonCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'RoleName') {
      this.ProductRequestPersoncolDef[2].cellEditorParams.Items = this.Actor.GetPersonList(event.newValue.RoleID, null, null, false);
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PersonName = '';
          node.data.RoleName = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    } else if (event.newValue && event.colDef && event.colDef.field === 'PersonName') {// For InvalidSelected When Old IsValid
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PersonName = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  onPRCostGridReady(params) {
    this.PRCostGridApi = params.api;
  }

  onEstateAssetGridReady(params) {
    this.EstateAssetGridApi = params.api;
  }

  onAssetGridReady(params) {
    this.AssetGridApi = params.api;
  }

  onPRCostCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'CostCenterName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequestCostColDef[2].cellEditorParams.Items = this.ProductRequest.GetSubCostCenter(event.newValue.CostCenterId, null, false);

    }

    if (event.newValue && event.colDef && event.colDef.field === 'SubCostCenterName') {
      this.CurrentSubCostCenterID = event.newValue.SubCostCenterId;
    }
  }

  onAssetValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'AssetID') {
      this.ProductRequest.GetAssetByAssetID(event.newValue.AssetID).subscribe(
        res => {
          const itemsToUpdate = [];
          this.AssetGridApi.forEachNode(node => {
            if (node.rowIndex === event.rowIndex) {
              node.data.AssetID = res[0].AssetID;
              node.data.AssetCode = res[0].AssetCode;
              node.data.ProductName = res[0].ProductName;
              node.data.AssetNote = res[0].Note;
              node.data.AssetTag = res[0].AssetTag;
              node.data.RefrenceNo = res[0].RefrenceNo;
              itemsToUpdate.push(node.data);
            }
          });
          this.AssetGridApi.updateRowData({ update: itemsToUpdate });
        });
    }
  }

  onEstateAssetValueChanged(event) {
    // if (event.newValue && event.colDef && event.colDef.field === 'AssetID') {
    //   this.ProductRequest.GetAssetEstateDetailsByAssetID(event.newValue.AssetID).subscribe(
    //     res => {
    //       const itemsToUpdate = [];
    //       this.EstateAssetGridApi.forEachNode(node => {
    //         if (node.rowIndex === event.rowIndex) {
    //           node.data.AssetID = event.newValue;
    //           node.data.BlockNo = res[0].BlockNo;
    //           node.data.LandNo = res[0].LandNo;
    //           node.data.ApartmentNo = res[0].ApartmentNo;
    //           node.data.BusinessNo = res[0].BusinessNo;
    //           node.data.Address = res[0].Address;
    //           itemsToUpdate.push(node.data);
    //         }
    //       });
    //       this.EstateAssetGridApi.updateRowData({ update: itemsToUpdate });
    //     });
    // }
  }

  Close() {
    this.Closed.emit(true);
  }

  RedioClick(IsCost) {
    const IsDisabled = (!this.IsEditable) || (this.IsInsert);
    if (!IsDisabled) {
      this.IsCost = IsCost;
      this.ContractParams.selectedObject = null;
      // if (this.ModuleCode === 2776 && this.IsCost) {
      //   this.IsAssetEstate = true;
      //   this.GridHeight = 79;
      //   this.gridHeightDiv = 33.5;
      //   this.tabpanelDiv = 83;
      // } else {
      //   this.IsAssetEstate = false;
      //   this.GridHeight = 82;
      //   this.gridHeightDiv = 43;
      //   this.tabpanelDiv = 85;
      //   this.TechCoef = null;
      //   this.NgSelectContractorParams.selectedObject = null;
      // }
    }
  }

  IsNewRedioClick(IsNew) {
    this.IsNew = IsNew;
    this.ShowModuleTypeName();
    this.ContractParams.IsDisabled = this.IsNew;
    this.ContractParams.Required = this.PerecentageChangesLabel = !this.IsNew;
    if (this.IsNew) {
      this.ContractParams.selectedObject = null;
      this.btnContractName = 'تکمیل اطلاعات قرارداد';
      this.IsContractSelect = false;
    } else {
      this.btnContractName = 'تکمیل اطلاعات الحاقیه';
    }
  }

  OnProductRequestDateChange(ADate) {
    this.ProductRequestDate = ADate.MDate;
    this.PersianProductRequestDate = ADate.SDate;
  }

  OnDeadLineDateChange(ADate) {
    this.DeadLineDate = ADate.MDate;
  }

  onUnitPatternChange(event) {
    this.RequestedPersonParams.selectedObject = null;
    this.ProductRequest.GetUnitPersonByUnitPattern(event.UnitPatternID).subscribe(res => {
      this.RequestedPersonItems = res;
    });

  }

  RequestCost() {
    this.PopUpType = 'product-request-cost';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 110;
    this.startTopPosition = 20;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      Subject: this.Subject,
      RegionCode: this.RegionParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      ProductRequestDate: this.ProductRequestDate,
      CostFactorID: this.CostFactorID

    };
  }

  RequestEstimate() {
    this.PopUpType = 'request-estimate';
    this.isClicked = true;
    this.HaveHeader = true;
    this.PercentWidth = 80;
    this.startLeftPosition = 170;
    this.startTopPosition = 20;
    this.HaveMaxBtn = true;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      Subject: this.Subject,
      RegionCode: this.RegionParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      ProductRequestDate: this.ProductRequestDate,
      CostFactorID: this.CostFactorID

    };
  }

  RequestPerson() {
    this.PopUpType = 'request-person';
    this.isClicked = true;
    this.HaveHeader = true;
    this.PercentWidth = 80;
    this.startLeftPosition = 170;
    this.startTopPosition = 20;
    this.HaveMaxBtn = true;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      Subject: this.Subject,
      RegionCode: this.RegionParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      ProductRequestDate: this.ProductRequestDate,
      CostFactorID: this.CostFactorID

    };
  }

  RequestPersonItem() {
    this.PopUpType = 'product-request-person-item';
    this.isClicked = true;
    this.HaveHeader = true;
    this.PercentWidth = 70;
    this.startLeftPosition = 170;
    this.startTopPosition = 20;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      Subject: this.Subject,
      RegionCode: this.RegionParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      ProductRequestDate: this.ProductRequestDate,
      CostFactorID: this.CostFactorID,
      ModuleCode: this.ModuleCode,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      OrginalModuleCode: this.OrginalModuleCode,
    };
  }
  MessageBoxAction(event) {
    if (this.BtnClickedName === 'BtnConfirm' && event === 'YES') {
      this.DOConfirm();
    }
    if (this.BtnClickedName === 'DOFinalConfirmWithCleanSys' && event === 'YES') {
      this.FinalConfirm();
    }
    if (this.BtnClickedName === 'ConfirmAndSend' && event === 'YES') {
      this.OnFinalConfirm();
    }

    if (event && this.PopUpType === 'work-flow-send') {
      this.IsEditable = false;
      return;
    }

  }


  getOutPutParam(event) {
    if (this.PopUpType === 'product-request-suggestion' ||
      this.PopUpType === 'product-request-cost' ||
      this.PopUpType === 'product-request-person-item' ||
      this.PopUpType === 'request-contract-without-flow' ||
      this.PopUpType === 'product-request-estate' ||
      this.PopUpType === 'contract-order-on-without-flow' ||
      this.PopUpType === 'general-tender' ||
      this.PopUpType === 'app-commition') {
      this.ProductRequestObject = event;
      if (this.ProductRequestObject && this.ProductRequestObject.ContractObject) {
        this.IsInsert = true;
      }

      this.ShowModuleTypeName();
    }
    if (this.PopUpType === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }

    if (event && this.PopUpType === 'work-flow-send') {
      this.Close();
    }
  }
  ConfirmAndSend() {
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.ProductRequestCode;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithYesNoBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                    });
                    this.PopUpType = 'work-flow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    this.PercentWidth = null;
                    this.OverMainMinwidthPixel = null;
                    this.MainMaxwidthPixel = null;
                    this.HeightPercentWithMaxBtn = null;
                    this.MinHeightPixel = null;
                    this.PopupParam = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      ObjectID: this.ObjectID,
                      MinimumPosting: this.InputParam.MinimumPosting,
                      CartableUserID: this.CartableUserID,
                    };
                    this.isClicked = true;
                  }
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });
  }
  OnFinalConfirm() {
    this.Cartable.UserConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      this.WorkFlowTransitionID,
      null,
      '',
      this.ObjectNo,
      this.WorkflowTypeCode,
      this.WorkflowTypeName,
      this.ObjectID,
      this.CartableUserID,
    )
      .subscribe(res => {
        this.RefreshCartable.RefreshCartable();
        this.IsEditable = false;
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }
  OnShowMapClick(row) {
    if (row.BlockNo && row.LandNo) {
      const MapUrl = 'http://detailplan.tehran.iri/mapview/view.asp?w=1350&h=600&p='
        + this.CommonService.PadLeft(row.BlockNo, 5)
        + this.CommonService.PadLeft(row.LandNo, 3)
        + '&mode=view';
      window.open(MapUrl);
    }
  }

  OnRowDataChanged() {
    this.SetSumFinalAmount();
  }

  OnRowDataUpdated() {
    this.SetSumFinalAmount();
  }

  OnFilterChanged() {
    this.SetSumFinalAmount();
  }

  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    let SumAmountCOEF = 0;
    let SumAmountCOEFPact = 0;

    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.FinalAmount) {
          // tslint:disable-next-line:radix
          SumFinalAmount = SumFinalAmount + parseFloat(node.data.FinalAmount);
        }
        if (node.data.AmountCOEF) {
          // tslint:disable-next-line:radix
          SumAmountCOEF = SumAmountCOEF + parseFloat(node.data.AmountCOEF);
        }
        if (node.data.AmountCOEFPact) {
          // tslint:disable-next-line:radix
          SumAmountCOEFPact = SumAmountCOEFPact + parseFloat(node.data.AmountCOEFPact);
        }
      });

      this.SumFinalAmount = SumFinalAmount;
      this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.SumAmountCOEFStr = SumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.SumAmountCOEFPactStr = SumAmountCOEFPact.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      if (this.SumFinalAmountRelatedContract) {
        // tslint:disable-next-line:max-line-length
        this.PercentageOfChanges = Math.round(((this.SumFinalAmount - this.SumFinalAmountRelatedContract) / this.SumFinalAmountRelatedContract * 100.0) * 100.0) / 100.0;
      }
      this.PercentageOfChangesStr = this.PercentageOfChanges.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '%';
    }
  }

  onContractViewClick() {
    if (this.ContractParams.selectedObject) {
      this.PopUpType = 'contract-page';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.MinHeightPixel = 550;
      this.startLeftPosition = 100;
      this.startTopPosition = 10;
      this.PopupParam = {
        ModuleCode: this.ModuleCode,
        PanelHeightInTab: 99,
        selectedRow: {
          data: {
            ContractId: this.ContractParams.selectedObject,
          }
        }
      };
    }
  }

  onChangeContract(ContractId) {
    this.RelatedProductRequestID = this.ContractListSetFrom.find(x => x.ContractId === ContractId).ProductRequestID;
    this.PriceListPatternID = this.ContractListSetFrom.find(x => x.ContractId === ContractId).PriceListPatternID;
    if (ContractId) {
      this.contractpaydetail.GetFirstContractOrder(ContractId).subscribe(ress => {
        ress.forEach(item => {
          item.FinalAmount = item.Amount;
          this.SumFinalAmountRelatedContract = this.SumFinalAmountRelatedContract + parseFloat(item.FinalAmount);
        });
      });
    }
    this.contractpaydetail.GetLastContractOrder(ContractId, true).subscribe(res => {
      this.rowsData = res;
      this.rowsData.forEach(item => {
        item.ScaleName = item.ScaleName;
        item.Subject = item.Note + ' - ' + item.ContractCode;
        item.QTY = item.Qty;
        if (item.Qty === null || item.Qty === 0) {
          item.Amount = item.Amount;
          item.AmountCOEFPact = !this.IsNew ? null : item.AmountCOEFPact;
          item.AmountCOEF = !this.IsNew ? null : item.AmountCOEF;
        } else {
          item.FinalAmount = item.Amount;
          item.Amount = item.FinalAmount / item.Qty;
          item.AmountCOEFPact = !this.IsNew ? null : item.AmountCOEFPact;
          item.AmountCOEF = !this.IsNew ? null : item.AmountCOEF;
        }
      });
    });

    if (this.RelatedProductRequestID) {
      this.ProductRequest.GetProductRequest(this.RelatedProductRequestID).subscribe(res => {
        this.RelatedProductRequestObject = res;
        this.Address = this.RelatedProductRequestObject.Address;
        this.ContractSubject = this.RelatedProductRequestObject.Subject;
        this.IsContractSelect = true;
        this.OnOpenNgSelect('Rustee');
        this.OnOpenNgSelect('CostCenter');
        this.OnOpenNgSelect('FilterRegion');
      });
    }
  }
  onChangeRustee(ACostCenterID) {
    this.SubRusteeParams.selectedObject = null;
  }
  onChangeCostCenter(ACostCenterID) {
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
  }
  onChangeSubCostCenter(ASubCostCenterID) {
    this.RequestedPersonParams.selectedObject = null;
  }
  onRequestedPersonSelectedchanged(RequestedPersonID) {
    if (this.RequestedPersonItems && this.RequestedPersonItems.length > 0 && !this.SubCostCenterParams.selectedObject) {
      this.RequestPersonObject = this.RequestedPersonItems.find(x => x.ActorId === RequestedPersonID);
      this.OnOpenNgSelect('SubCostCenter');
    }
  }
  onConfirm() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تایید درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }

    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'BtnConfirm';
      // tslint:disable-next-line:max-line-length
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          if (this.ChangeDetection) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات قرارداد بدون گردش تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
          } else {
            this.DOConfirm();
          }
        } else {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.CostFactorID,
            this.RegionParams.selectedObject,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            null,
            this.CartableUserID
            , this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید درخواست معامله با موفقیت انجام شد');
              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            }
            );
        }
      } else {
        if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
          // tslint:disable-next-line:max-line-length
          if (this.ProductRequestObject.ContractObject && (!this.ProductRequestObject.ContractObject.LetterNo || !this.ProductRequestObject.ContractObject.LetterDate)) {
            this.ShowMessageBoxWithOkBtn('شماره نامه یا تاریخ نامه قرارداد را ثبت کنید');
            return;
          }
        }
        this.DOFinalConfirm();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }

  }
  onConfirmAndSend() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تایید و ارسال درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }

    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'ConfirmAndSend';
      this.IsDown = false;
      if (this.ChangeDetection) {
        this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
      } else {
        this.ConfirmAndSend();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  onUnConfirmAndReturn() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان عدم تایید و بازگشت درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }

    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.IsDown = false;
      // tslint:disable-next-line: no-shadowed-variable
      const promise = new Promise((resolve, reject) => {
        this.DoUnConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.ProductRequestCode;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  res.forEach(element => {
                    element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                  });
                  this.PopUpType = 'work-flow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.PercentWidth = null;
                  this.OverMainMinwidthPixel = null;
                  this.MainMaxwidthPixel = null;
                  this.HeightPercentWithMaxBtn = null;
                  this.MinHeightPixel = null;
                  this.PopupParam = {
                    Message: 'بازگشت',
                    OperationCode: 2,
                    rows: res,
                    CurrWorkFlow: this.CurrWorkFlow,
                    WorkFlowID: this.WorkFlowID,
                    IsEnd: this.IsEndFlow,
                    ObjectNo: this.ObjectNo,
                    WorkflowTypeName: this.WorkflowTypeName,
                    WorkflowTypeCode: this.WorkflowTypeCode,
                    WorkflowObjectCode: this.WorkflowObjectCode,
                    ObjectID: this.ObjectID,
                    MinimumPosting: this.InputParam.MinimumPosting,
                    CartableUserID: this.CartableUserID,
                  };
                  this.isClicked = true;
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
                }
              }
            );
        } else {
          this.IsDown = true;
          // this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line: no-shadowed-variable
  DOConfirm(HasAlert = true, resolve = null) { // RFC 55826
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
        return;
      }
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        null,
        this.CartableUserID
        , this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn('تایید قرارداد بدون گردش  با موفقیت انجام شد');
          }
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
          this.RefreshCartable.RefreshCartable();
          this.IsEditable = false;
          if (resolve) {
            resolve(true);
          }
        },
          err => {
            if (resolve) {
              resolve(false);
            }
            if (!err.error.Message.includes('|')) {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line: no-shadowed-variable
  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        null,
        this.CartableUserID
        , this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
          }

          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';

          resolve(true);
        },
          err => {
            resolve(false);
            if (!err.error.Message.includes('|')) {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line: no-shadowed-variable
  DOFinalConfirm(alert = true, resolve = null) {
    if (this.WorkflowObjectCode !== 6) {
      this.ProductRequest.IsNeedCallCleanSys(this.CostFactorID).subscribe(res => {
        if (res) {
          this.BtnClickedName = 'DOFinalConfirmWithCleanSys';
          if (this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
            this.ShowMessageBoxWithYesNoBtn('با تایید نهایی قرارداد مورد نظر به سایت شفاف منتقل خواهد شد ، آیا مایل به ادامه کار هستید ؟');
          } else {
            // tslint:disable-next-line:max-line-length
            this.ShowMessageBoxWithYesNoBtn('با بازگشت از تایید نهایی قرارداد مورد نظر از سایت شفاف حذف خواهد شد ، آیا مایل به ادامه کار هستید ؟');
          }
        } else {
          this.FinalConfirm();
        }
      });
    } else {
      this.FinalConfirm();
    }
  }

  FinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.CartableUserID,
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          if (alert) {
            messageStr = 'بازگشت از تایید نهایی درخواست معامله با موفقیت انجام شد';
          }
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';
          this.IsFinalConfirm = true;
        } else {
          if (alert) {
            messageStr = 'تایید نهایی درخواست معامله با موفقیت انجام شد';
          }
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
          this.IsFinalConfirm = true;
        }

        this.ShowMessageBoxWithOkBtn(messageStr);

        // if (this.ConfirmStatus.includes(27) || this.ConfirmStatus.includes(28)) {
        //   if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
        //     if (alert) {
        //       messageStr = 'بازگشت از تایید نهایی درخواست معامله با موفقیت انجام شد';
        //     }
        //     this.ReadyToConfirm = 0;
        //     this.btnConfirmName = 'تایید نهایی';
        //     this.btnConfirmIcon = 'ok';
        //     this.IsFinalConfirm = true;
        //   } else {
        //     if (alert) {
        //       messageStr = 'تایید نهایی درخواست معامله با موفقیت انجام شد';
        //     }
        //     this.ReadyToConfirm = 1;
        //     this.btnConfirmName = 'بازگشت از تایید نهایی';
        //     this.btnConfirmIcon = 'cancel';
        //     this.IsFinalConfirm = true;
        //   }
        // } else {
        //   this.HaveConfirm = false;
        // }

        // if (this.ProductRequestObject.RegionCode !== 0) {
        //   this.ProductRequest.IsSendToProject(this.ProductRequestObject.ContractObject.ContractId).subscribe(res => {
        //     if (!res) {
        //       // tslint:disable-next-line:max-line-length
        //       this.ShowMessageBoxWithOkBtn(messageStr + '  ' + ' اما درج قرارداد در سامانه کنترل پروژه با مشکل مواجه گردید .خواهشمند است با راهبر سیستم تماس بگیرید.');
        //     } else {
        //       this.ShowMessageBoxWithOkBtn(messageStr);
        //     }

        //   });
        // }
      },
        err => {
          if (!err.error.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }
  onCOntractClick() {
    let check = 0;
    if (this.ProductRequestObject && this.ProductRequestObject.RequestPersonList &&
      this.ProductRequestObject.RequestPersonList !== null) {
      this.ProductRequestObject.RequestPersonList.forEach(item => {
        if (item.RoleID === 974 || item.RoleID === 975) {
          check = check + 1;
        }
      });
    }
    if (check > 0) {
      this.PopUpType = 'request-contract-without-flow';
      this.isClicked = true;
      this.PercentWidth = 98;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 640;
      this.HaveHeader = true;
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        SumFinalAmount: this.SumAmountCOEFStr,
        SumAmountCOEFPact: this.SumAmountCOEFPactStr,
        DealTypeCode: this.ProductRequestObject.DealTypeCode,
        DealTypeName: this.ProductRequestObject.DealTypeName,
        Subject: this.Subject,
        RequestPerson: this.RequestedPersonParams.selectedObject,
        ProductRequestCode: this.ProductRequestNo,
        IsCost: this.IsCost,
        ModuleCode: this.InputParam.ModuleCode ? this.InputParam.ModuleCode : this.ModuleCode,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        ContractSubject: this.ContractSubject,
        OrginalModuleCode: this.OrginalModuleCode,
        ProductRequestTypeCode: this.PRTypeParams.selectedObject, // RFC 59678,
        IsAdmin: this.IsAdmin,
        ContractRelationList: this.ContractRelationList
      };
    } else {
      this.ShowMessageBoxWithOkBtn('لطفاً ناظر اول یا دوم را مشخص نمایید');
    }
  }

  FetchMoreContract(event) {
    this.ContractParams.loading = true;
    const ResultList = [];
    this.ContractList.GetRelatedContractpagingForExtended(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.RegionParams.selectedObject, this.IsCost, true, null).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractListSetFrom = ResultList;
      });
  }
  doContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.ContractParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'LetterNo';
    }
    this.ContractParams.loading = true;
    this.ContractList.GetRelatedContractpagingForExtended(event.PageNumber, 30, event.term,
      event.SearchOption, this.RegionParams.selectedObject, this.IsCost, true, null).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetFrom = res.List;
          this.ContractTotalItemCount = res.TotalItemCount;
          this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.ContractParams.loading = false;
        }
      });
    this.ContractParams.loading = false;
  }
  OnClickPrintFlow() {
    let FullPersonName = { FullPersonName: '' };
    if (this.RequestedPersonItems && this.RequestedPersonParams.selectedObject) {
      FullPersonName = this.RequestedPersonItems.find(
        s => s.ActorId === this.RequestedPersonParams.selectedObject
      );
    }
    this.Report.ShowReport(null,
      null,
      this.CostFactorID,
      this.ProductRequestCode,
      null,
      this.PersianProductRequestDate,
      this.Subject,
      FullPersonName ? FullPersonName.FullPersonName : '',
      null,
      null,
      this.ModuleCode,
      this.RegionParams.selectedObject);
  }





  FillAllNgSelectByProductRequest(ProdReqObj) {

    // tslint:disable-next-line: no-shadowed-variable
    const promise0 = new Promise((resolve) => {
      if (ProdReqObj.RelatedContractID) {
        this.ContractList.GetRelatedContractpagingForExtended(1, 30, '', '',
          ProdReqObj.RegionCode, ProdReqObj.IsCost, true, ProdReqObj.RelatedContractID).
          subscribe((res: any) => {
            this.ContractListSetFrom = res.List;
            this.ContractTotalItemCount = res.TotalItemCount;
            this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ContractParams.selectedObject = ProdReqObj.RelatedContractID;
            resolve(0);
          });
      } else {
        resolve(0);
      }
    });

    // tslint:disable-next-line: no-shadowed-variable
    const promise1 = new Promise((resolve) => {
      if (ProdReqObj.ContractStackHolderObject &&
        ProdReqObj.SubCostCenterObject.SubCostCenterId &&
        ProdReqObj.ContractStackHolderObject.CostCenterId) {
        forkJoin([
          this.ProductRequest.GetSubCostCenter(ProdReqObj.ContractStackHolderObject.CostCenterId, null, true),
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterPriPerson(ProdReqObj.SubCostCenterObject.CostCenterId, ProdReqObj.SubCostCenterObject.SubCostCenterId, ProdReqObj && ProdReqObj.ActorId ? ProdReqObj.ActorId : null, null),
        ]).subscribe(res => {

          this.SubRusteeItems = res[0];
          this.SubRusteeParams.selectedObject = ProdReqObj.ContractStackHolderObject.SubCostCenterId;
          res[0].forEach(element => {
            element.FullPersonName = element.FirstName + ' ' + element.LastName;
          });

          // this.RequestedPersonItems = res[0];
          this.SubCostCenterParams.selectedObject = ProdReqObj.SubCostCenterID;

          res[1].forEach(element => {
            element.FullPersonName = element.FirstName + ' ' + element.LastName;
          });
          this.RequestedPersonItems = res[1];
          this.RequestedPersonParams.selectedObject = ProdReqObj.ActorID;
          resolve(1);
        });
      } else {
        resolve(1);
      }
    });

    // tslint:disable-next-line: no-shadowed-variable
    const promise2 = new Promise((resolve) => {
      if (ProdReqObj.WorkPlaceCode && ProdReqObj.RegionAreaID) {
        forkJoin([
          this.ProductRequest.GetRegionAreaList(ProdReqObj.WorkPlaceCode),
          this.ProductRequest.GetRegionAreaDistrictList(ProdReqObj.RegionAreaID),
        ]).subscribe(res => {
          this.RegionAreaItems = res[0];
          this.RegionAreaParams.selectedObject = ProdReqObj.RegionAreaID;
          this.RegionAreaDistrictItems = res[1];
          this.RegionAreaDistrictParams.selectedObject = ProdReqObj.RegionAreaDistrictID;
          resolve(1);
        });
      } else {
        resolve(1);
      }
    });

    // tslint:disable-next-line: no-shadowed-variable
    const promise3 = new Promise((resolve) => {
      forkJoin([
        this.RegionList.GetRegionList(this.ModuleCode, !this.CheckRegionWritable),
        this.ProductRequest.GetVWExeUnitByRegion(ProdReqObj.RegionCode),
        this.ProductRequest.GetCustomerOrderByRegionPaging(1, 30, '', '', ProdReqObj.RegionCode,
          ProdReqObj.CustomerOrderID),
        this.ProductRequest.GetOnfilterRegion(),
        this.ProductRequest.GetActLocationByRegionCode(ProdReqObj.ProxyContractorRegionCode !== null ? ProdReqObj.ProxyContractorRegionCode
          : ProdReqObj.RegionCode),
        this.ProductRequest.GetCostCenterByRegion(ProdReqObj.RegionCode,
          ProdReqObj.SubCostCenterObject ? ProdReqObj.SubCostCenterObject.CostCenterId : null, null,
          false
        ),
        this.ProductRequest.GetSubCostCenter(ProdReqObj.SubCostCenterObject.CostCenterId, null, true),
        this.PriceList.GetPLTListbyPRType(1),
        this.ProductRequest.GetCostCenterByRegion(ProdReqObj.RegionCode,
          ProdReqObj.ContractStackHolderObject ? ProdReqObj.ContractStackHolderObject.CostCenterId : null, null,
          false)
      ]).subscribe((res: any) => {
        this.RegionItems = res[0]; // case region
        this.RegionParams.selectedObject = ProdReqObj.RegionCode;
        this.RefreshPageByRegion(this.RegionParams.selectedObject);
        this.VWExeUnitItems = res[1]; // case 'VWExeUnit':
        this.VWExeUnitParams.selectedObject = ProdReqObj.UnitPatternID;
        this.PriceListTopicRasteItems = res[7];
        this.PriceListTopicRasteParams.selectedObject = ProdReqObj.PriceListTopicID;
        this.PRTypeParams.selectedObject = ProdReqObj.ProductRequestTypeCode; // RFC 59678
        this.RankParams.selectedObject = ProdReqObj.GradeID;
        this.CustomerOrderItems = res[2].List;
        this.RefreshCustomerOrder.RefreshItemsVirtualNgSelect({
          List: res[2].List,
          term: '',
          TotalItemCount: res[2].TotalItemCount,
          PageCount: Math.ceil(res[2].TotalItemCount / 30),
          type: 'customer-order',
        });

        if (ProdReqObj.CustomerOrderID) {
          this.CustomerOrderParams.selectedObject = ProdReqObj.CustomerOrderID;
        }
        this.OnFilterRegionItems = res[3];
        if (ProdReqObj.WorkPlaceCode) {
          this.OnFilterRegionParams.selectedObject = ProdReqObj.WorkPlaceCode;
        }
        this.ActLocationItems = res[4];
        if (ProdReqObj.ActLocationID) {
          this.ActLocationParams.selectedObject = ProdReqObj.ActLocationID;
        }
        this.RusteeItems = res[8];
        this.CostCenterItems = res[5];
        if (ProdReqObj.ContractStackHolderObject && ProdReqObj.ContractStackHolderObject.CostCenterId) {
          this.RusteeParams.selectedObject = ProdReqObj.ContractStackHolderObject.CostCenterId;
        }

        this.SubCostCenterItems = res[6];
        if (ProdReqObj.SubCostCenterObject && ProdReqObj.SubCostCenterObject.CostCenterId) {
          this.CostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.CostCenterId;
          this.SubCostCenterParams.selectedObject = ProdReqObj.SubCostCenterID;
        }

        if (this.IsShowPreRegion) {
          let RegionObj = this.RegionItems.find(x => x.RegionCode === this.RegionParams.selectedObject);
          this.PreRegionItems = [];
          this.PreRegionItems.push(RegionObj);
          this.PreRegionItems.push(this.AmlakRegionObject);

          if (ProdReqObj.SubCostCenterObject) {
            this.PreRegionParams.selectedObject = ProdReqObj.SubCostCenterObject.CostCenterObject.RegionCode;
          }

        }

        this.IsDown = true;
        resolve(1);
      });
    });
  }

  OnOpenNgSelect(type, IsFill = true) {
    switch (type) {
      case 'Region':
        this.RegionList.GetRegionList(this.ModuleCode, !this.CheckRegionWritable).subscribe(res => {
          this.RegionItems = res;
          if (IsFill) {
            this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
            !this.IsShowPreRegion ? this.OnOpenNgSelect('CostCenter') : this.OnOpenNgSelect('PreRegion');;
            this.RefreshPageByRegion(this.RegionParams.selectedObject);
          }
        });
        break;
      case 'VWExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
          this.VWExeUnitItems = res;
        });
        break;
      case 'Contract':
        const CurrentRelatedContractID = this.ProductRequestObject
          && this.ProductRequestObject.RelatedContractID ? this.ProductRequestObject.RelatedContractID : null;
        this.ContractParams.loading = true;
        const ResultList = [];
        this.ContractList.GetRelatedContractpagingForExtended(1, 30, '', '', this.RegionParams.selectedObject,
          this.IsCost, true, CurrentRelatedContractID)
          .subscribe((res: any) => {
            this.ContractListSetFrom = res.List;
            this.ContractTotalItemCount = res.TotalItemCount;
            this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ContractParams.loading = false;
          });
        if (IsFill && CurrentRelatedContractID) {
          this.ContractParams.selectedObject = this.ProductRequestObject.RelatedContractID;
        }
        this.ContractParams.loading = false;
        break;
      case 'Rustee':
        const CurrRusteeCostCenterID = this.ProductRequestObject &&
          this.ProductRequestObject.ContractStackHolderObject &&
          this.ProductRequestObject.ContractStackHolderObject.CostCenterId ?
          this.ProductRequestObject.ContractStackHolderObject.CostCenterId : null;
        this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, CurrRusteeCostCenterID, null, false)
          .subscribe(res => {
            this.RusteeItems = res;
            if (IsFill &&
              this.ProductRequestObject &&
              this.ProductRequestObject.ContractStackHolderObject &&
              this.ProductRequestObject.ContractStackHolderObject.CostCenterId) {
              this.RusteeParams.selectedObject = this.ProductRequestObject.ContractStackHolderObject.CostCenterId;
              this.OnOpenNgSelect('SubRustee');
            } else if (IsFill &&
              this.RelatedProductRequestObject &&
              this.RelatedProductRequestObject.ContractStackHolderObject &&
              this.RelatedProductRequestObject.ContractStackHolderObject.CostCenterId) {
              this.RusteeParams.selectedObject = this.RelatedProductRequestObject.ContractStackHolderObject.CostCenterId;
              this.OnOpenNgSelect('SubRustee');
            } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.CostCenterID) {
              this.RusteeParams.selectedObject = this.CurrentUserSubCostCenter.CostCenterID;
              this.OnOpenNgSelect('SubRustee');
            }
          });
        break;
      case 'SubRustee':
        this.ProductRequest.GetSubCostCenter(this.RusteeParams.selectedObject, null, true).subscribe(res => {
          this.SubRusteeItems = res;
          if (IsFill &&
            this.ProductRequestObject &&
            this.ProductRequestObject.ContractStackHolderObject &&
            this.ProductRequestObject.ContractStackHolderObject.SubCostCenterId) {
            this.SubRusteeParams.selectedObject = this.ProductRequestObject.ContractStackHolderObject.SubCostCenterId;
          } else if (IsFill &&
            this.RelatedProductRequestObject &&
            this.RelatedProductRequestObject.ContractStackHolderObject &&
            this.RelatedProductRequestObject.ContractStackHolderObject.SubCostCenterId) {
            this.SubRusteeParams.selectedObject = this.RelatedProductRequestObject.ContractStackHolderObject.SubCostCenterId;
          } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.SubCostCenterID) {
            this.SubRusteeParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
          }
        });
        break;
      case 'RequestedPerson':
        if (this.CostCenterParams.selectedObject) {
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterPriPerson(this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject, this.ProductRequestObject && this.ProductRequestObject.ActorId ? this.ProductRequestObject.ActorId : null, null).subscribe(res => {
            res.forEach(element => {
              element.FullPersonName = element.FirstName + ' ' + element.LastName;
            });
            this.RequestedPersonItems = res;
            if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.ActorID) {
              this.RequestedPersonParams.selectedObject = this.CurrentUserSubCostCenter.ActorID;
              this.CurrentUserSubCostCenter = null;
            }
          });
        }
        break;
      case 'CustomerOrder':
        const CurrentCustomerOrderID = this.ProductRequestObject
          && this.ProductRequestObject.CustomerOrderID ? this.ProductRequestObject.CustomerOrderID : null;
        this.CustomerOrderParams.loading = true;
        const ResList = [];
        const promised = new Promise((resolve_res3, reject_res3) => {
          this.ProductRequest.GetCustomerOrderByRegionPaging(1, 30, '', '', this.RegionParams.selectedObject,
            CurrentCustomerOrderID)
            .subscribe((res: any) => {
              this.CustomerOrderItems = res.List;
              resolve_res3(res.TotalItemCount);
            });
        }).then((TotalItemCount: number) => {
          this.RefreshCustomerOrder.RefreshItemsVirtualNgSelect({
            List: this.CustomerOrderItems,
            term: '',
            TotalItemCount: TotalItemCount,
            PageCount: Math.ceil(TotalItemCount / 30),
            type: 'customer-order',
          });
        });
        this.CustomerOrderParams.loading = false;
        break;
      case 'CostCenter':
        const CurrCostCenterID = this.ProductRequestObject &&
          this.ProductRequestObject.SubCostCenterObject &&
          this.ProductRequestObject.SubCostCenterObject.CostCenterId ?
          this.ProductRequestObject.SubCostCenterObject.CostCenterId : null;

        this.ProductRequest.GetCostCenterByRegion(!this.IsShowPreRegion ? this.RegionParams.selectedObject : this.PreRegionParams.selectedObject, CurrCostCenterID, null, false).subscribe(res => {
          this.CostCenterItems = res;
          if (IsFill &&
            this.ProductRequestObject &&
            this.ProductRequestObject.SubCostCenterObject &&
            this.ProductRequestObject.SubCostCenterObject.CostCenterId) {
            this.CostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.CostCenterId;
            this.OnOpenNgSelect('SubCostCenter');
          } else if (IsFill &&
            this.RelatedProductRequestObject &&
            this.RelatedProductRequestObject.SubCostCenterObject &&
            this.RelatedProductRequestObject.SubCostCenterObject.CostCenterId) {
            this.CostCenterParams.selectedObject = this.RelatedProductRequestObject.SubCostCenterObject.CostCenterId;
            this.OnOpenNgSelect('SubCostCenter');
          } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.CostCenterID) {
            this.CostCenterParams.selectedObject = this.CurrentUserSubCostCenter.CostCenterID;
            this.OnOpenNgSelect('SubCostCenter');
          }
        });
        break;
      case 'SubCostCenter':
        this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, null, true).subscribe(res => {
          this.SubCostCenterItems = res;
          if (IsFill &&
            this.ProductRequestObject &&
            this.ProductRequestObject.SubCostCenterObject &&
            this.ProductRequestObject.SubCostCenterObject.SubCostCenterId) {
            this.SubCostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.SubCostCenterId;
            this.OnOpenNgSelect('RequestedPerson');
          } else if (IsFill &&
            this.RelatedProductRequestObject &&
            this.RelatedProductRequestObject.SubCostCenterObject &&
            this.RelatedProductRequestObject.SubCostCenterObject.SubCostCenterId) {
            this.SubCostCenterParams.selectedObject = this.RelatedProductRequestObject.SubCostCenterObject.SubCostCenterId;
            this.OnOpenNgSelect('RequestedPerson');
          } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.SubCostCenterID) {
            this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
            this.OnOpenNgSelect('RequestedPerson');
          }
          if (IsFill && this.RequestPersonObject && this.RequestPersonObject.SubCostCenterID) {
            this.SubCostCenterParams.selectedObject = this.RequestPersonObject.SubCostCenterID;
          }
        });
        break;
      case 'FilterRegion':
        this.ProductRequest.GetOnfilterRegion().subscribe(res => {
          this.OnFilterRegionItems = res;
        });
        break;
      case 'RegionArea':
        this.ProductRequest.GetRegionAreaList(this.OnFilterRegionParams.selectedObject).subscribe(res => {
          this.RegionAreaItems = res;
          if (IsFill &&
            this.RelatedProductRequestObject &&
            this.RelatedProductRequestObject.RegionAreaID) {
            this.RegionAreaParams.selectedObject = this.RelatedProductRequestObject.RegionAreaID;
            this.OnOpenNgSelect('RegionAreaDistrict');
          }
        });
        break;
      case 'RegionAreaDistrict':
        this.ProductRequest.GetRegionAreaDistrictList(this.RegionAreaParams.selectedObject).subscribe(res => {
          this.RegionAreaDistrictItems = res;
          if (IsFill && this.RelatedProductRequestObject && this.RelatedProductRequestObject.RegionAreaDistrictID) {
            this.RegionAreaDistrictParams.selectedObject = this.RelatedProductRequestObject.RegionAreaDistrictID;
          }
        });
        break;
      case 'ActLocation':
        this.ProductRequest.GetActLocationByRegionCode(this.RegionParams.selectedObject).subscribe(
          res => {
            this.ActLocationItems = res;
          }
        );
        break;
      case 'PriceListTopicRaste':
        // if (this.PRTypeParams.selectedObject === 3) {
        //   this.Actor.GetPriceListTopicByBusinesPatternID(4924, false).subscribe(res => {
        //     this.PriceListTopicRasteItems = res;
        //     if (IsFill) {
        //       this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
        //       this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
        //     }
        //   });
        // } else {
        this.PriceList.GetPLTListbyPRType(1).subscribe(ress => {
          this.PriceListTopicRasteItems = ress;
          if (IsFill) {
            this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
            this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
          }
        });
        //}
        break;
      case 'PreRegion':
        if (this.IsShowPreRegion) {
          let AObj = this.RegionItems.find(x => x.RegionCode === this.RegionParams.selectedObject);
          this.PreRegionItems = [];
          this.PreRegionItems.push(AObj);
          this.PreRegionItems.push(this.AmlakRegionObject);

          if (IsFill) {
            this.PreRegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.PreRegionItems[0].RegionCode;
            this.OnOpenNgSelect('CostCenter');
          }
        }
        break;
      default:
        break;
    }
  }
  PRProvisionRepShow() {
    this.Report.PRProvisionRep(this.RegionParams.selectedObject, this.ProductRequestObject.CostFactorID,
      this.ModuleCode,
      'پیشنهاد تامین اعتبار');
  }
  OnImportFromExcelBtnClick() {
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.PopUpType = 'app-excel-load-data';
    this.startLeftPosition = 400;
    this.startTopPosition = 200;
    this.Excel_Header_Param = {
      colDef2: this.columnDef
    };
    this.PopupParam = this.Excel_Header_Param;
  }
  loadFromExcel(data) {
    const ProductCodeList = [];
    const rowData = [];
    data.forEach((x: any) => {
      if (x.ProductCodeName && x.ProductTypeName) {
        const object = {
          ProductCode: x.ProductCodeName,
          ProductTypeCode: x.ProductTypeName
        };
        ProductCodeList.push(object);
      }
    });
    this.gridApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.ProductRequest.GetProductByCode(ProductCodeList).subscribe((res: any) => {
      if (res) {
        const itemsToUpdate = [];
        res.forEach(element => {
          MaxProp = MaxProp + 1;
          const ExcelObj = data.filter(x => x.ProductCodeName === element.ProductCode.toString())[0];
          const newItem = {
            ItemNo: MaxProp,
            ScaleName: element.ScaleName,
            ProductCodeName: element.ProductCodeName,
            ProductTypeName: element.ProductTypeName,
            ProductID: element.ProductID,
            PersianStartDate: ExcelObj && ExcelObj.PersianStartDate ? ExcelObj.PersianStartDate : '',
            PersianEndDate: ExcelObj && ExcelObj.PersianEndDate ? ExcelObj.PersianEndDate : '',
            ShortStartDate: ExcelObj && ExcelObj.PersianStartDate ? moment.from(ExcelObj.PersianStartDate, 'fa',
              'YYYY/MM/DD').format('YYYY/MM/DD') : '',
            ShortEndDate: ExcelObj && ExcelObj.PersianEndDate ? moment.from(ExcelObj.PersianEndDate, 'fa',
              'YYYY/MM/DD').format('YYYY/MM/DD') : '',
            QTY: ExcelObj && ExcelObj.QTY ? ExcelObj.QTY : '',
            Amount: ExcelObj && ExcelObj.Amount ? ExcelObj.Amount : '',
            Subject: ExcelObj && ExcelObj.Subject ? ExcelObj.Subject : '',
            // tslint:disable-next-line:radix
            FinalAmount: ExcelObj && ExcelObj.QTY && ExcelObj.Amount ? parseFloat(ExcelObj.QTY) * parseInt(ExcelObj.Amount) : '',
          };
          // data.remove(ExcelObj);
          data.splice(data.indexOf(ExcelObj), 1);
          itemsToUpdate.push(newItem);
        });
        data.forEach(element => {
          MaxProp = MaxProp + 1;
          const newItem = {
            ItemNo: MaxProp,
            ProductTypeName: element.ProductTypeName,
            ProductCodeName: element.ProductCodeName,
            ScaleName: element.ScaleName,
            PersianStartDate: element.PersianStartDate,
            PersianEndDate: element.PersianEndDate,
            ShortStartDate: element.ShortStartDate,
            ShortEndDate: element.ShortEndDate,
            QTY: parseFloat(element.QTY),
            // tslint:disable-next-line:radix
            Amount: parseInt(element.Amount),
            Subject: element.Subject,
            // tslint:disable-next-line:radix
            FinalAmount: parseFloat(element.QTY) * parseInt(element.Amount),
          };
          itemsToUpdate.push(newItem);
        });
        this.gridApi.updateRowData({ add: itemsToUpdate });
      }
    }
    );
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      false,
      false,
      false).subscribe(res => {
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
      false,
      false,
      false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  onEstateClick() {
    let ActorObject;
    if (this.ContractorItems) {
      ActorObject = this.ContractorItems.find(x => x.ActorId === this.NgSelectContractorParams.selectedObject);
    }

    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.PopUpType = 'product-request-estate';
    this.HaveHeader = true;
    this.startLeftPosition = 135;
    this.startTopPosition = 40;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      ModuleCode: this.ModuleCode,
      ActorObject: ActorObject,
      OrginalModuleCode: this.OrginalModuleCode,
      IsCost: this.IsCost
    };
  }
  FetchMoreCustomerOrder(event) {
    this.CustomerOrderParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.ProductRequest.GetCustomerOrderByRegionPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        this.RegionParams.selectedObject, null).subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshCustomerOrder.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'customer-order'
      });
    });
  }
  doCustomerOrderSearch(event) {
    this.CustomerOrderParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'CustomerOrderID';
    }
    this.CustomerOrderParams.loading = true;
    this.ProductRequest.GetCustomerOrderByRegionPaging(event.PageNumber, 30, event.term,
      event.SearchOption, this.RegionParams.selectedObject, null).subscribe((res: any) => {
        this.RefreshCustomerOrder.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'customer-order'
        });
      });
    this.CustomerOrderParams.loading = false;
  }
  ProvisionRadioRedioClick(IsProvisionCentralized) {
    this.IsProvisionCentralized = IsProvisionCentralized;
  }
  onRevocation() {
    if (this.ModuleViewTypeCode === 100000 || this.ModuleViewTypeCode === 200000 || this.ModuleViewTypeCode === 300000) {
      this.startLeftPosition = 50;
      this.startTopPosition = 20;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 1500;
      this.MinHeightPixel = 545;
      this.isClicked = true;
      this.PopUpType = 'choosen-request-revocation';
      this.PopupParam = {
        ObjectID: this.CostFactorID,
        RegionCode: this.ProductRequestObject.RegionCode,
        OrganizationCode: this.RegionItems.find(x => x.RegionCode === this.ProductRequestObject.RegionCode).OrganizationCode,
        OrginalModuleCode: this.OrginalModuleCode,
        CartableUserID: this.CartableUserID,
      };
    } else {
      // tslint:disable-next-line:max-line-length
      this.ProductRequest.RequestRevocation(this.CurrWorkFlow, this.WorkFlowID, this.CostFactorID, this.WorkflowTypeCode, this.ModuleCode, this.OrginalModuleCode)
        .subscribe(res => {
          this.ProductRequestObject.ProductRequestStatusCode = res;
          if (res === 3) {
            this.btnRevocationName = 'بازگشت از ابطال';
            this.btnRevocationIcon = 'ok';
            this.ShowMessageBoxWithOkBtn('ابطال درخواست انجام معامله با موفقیت انجام شد');
          } else if (res === 2) {
            this.btnRevocationName = 'ابطال';
            this.btnRevocationIcon = 'revocation';
            this.ShowMessageBoxWithOkBtn('بازگشت از ابطال درخواست انجام معامله با موفقیت انجام شد');
          } else if (res === -1) {
            this.ShowMessageBoxWithOkBtn('مسیر ' + ' ' + this.btnRevocationName + ' ' + ' به درستی تعریف نشده است با راهبر تماس بگیرید');
          } else {
            this.ShowMessageBoxWithOkBtn(' امکان' + ' ' + this.btnRevocationName + ' ' + 'وجود ندارد ');
          }
        });
    }
  }

  onProposalClick() {
    let HeaderName = '';
    switch (this.ModuleViewTypeCode) {
      case 23:
      case 24:
      case 83:
        HeaderName = 'استعلام قیمت';
        break;
      case 27:
      case 30:
      case 84:
        HeaderName = 'حراج';
        break;
      case 38:
      case 39:
      case 40:
      case 70:
      case 42:
      case 139:
      case 164:
        HeaderName = 'مناقصه عمومی';
        break;
      case 57:
      case 58:
        HeaderName = 'مناقصه محدود';
        break;
      case 64:
      case 29:
      case 35:
      case 43:
      case 82:
        HeaderName = 'مزایده';
        break;
      default:
        HeaderName = 'مناقصه عمومی';
        break;
    }

    this.PopUpType = 'app-product-request-page-without-flow-proposal';
    this.isClicked = true;
    this.HaveHeader = false;
    this.startLeftPosition = 560;
    this.startTopPosition = 200;
    this.HaveMaxBtn = false;
    this.PercentWidth = 30;
    this.MinHeightPixel = 210;
    this.MainMaxwidthPixel = 1500;
  }
  popupProposalClosed(event) {
    if (event > 0) {
      this.ModuleViewTypeCode = event;
      this.OpengeneraltenderPage();
    }
    if (this.ModuleViewTypeCode !== this.ModuleViewTypeCode_Cache && (this.ModuleViewTypeCode_Cache === 100000)) {
      this.ModuleViewTypeCode = this.ModuleViewTypeCode_Cache;
    }
  }
  OpengeneraltenderPage() {
    this.currentRegionObject = this.RegionItems.find(x => x.RegionCode === this.RegionParams.selectedObject);
    if (this.ModuleViewTypeCode === 10001) {
      this.showproductrequestarchivedetail();
    } else if (this.OrginalModuleCode === 2793
      || this.ModuleViewTypeCode === 38 || this.ModuleViewTypeCode === 64
      || this.ModuleViewTypeCode === 57 || this.ModuleViewTypeCode === 23
      || this.ModuleViewTypeCode === 27) { // RFC 49473 akharin taghirat
      this.PercentWidth = 55;
      this.MinHeightPixel = null;
      this.MainMaxwidthPixel = null;
      this.PopUpType = 'app-inquiry-list';
      this.isClicked = true;
      this.HaveHeader = true;
      this.startLeftPosition = 350;
      this.startTopPosition = 130;
      this.HaveMaxBtn = false;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.Subject,
        RegionCode: this.RegionParams.selectedObject,
        ProductRequestCode: this.ProductRequestNo,
        ProductRequestDate: this.ProductRequestDate,
        CostFactorID: this.CostFactorID,
        IsReadOnly: false,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        PRRegionObject: this.currentRegionObject,
        SumFinalAmount: this.SumFinalAmountStr,
        CheckRegionWritable: this.CheckRegionWritable,
        ModuleCode: this.ModuleCode,
        FirstModuleCode: this.InputParam.FirstModuleCode
      };
    } else {
      // tslint:disable-next-line: max-line-length
      this.LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ? this.ProductRequestObject.LastInquiryObject : null;

      if (!this.LastInquiryObject || (this.LastInquiryObject && !this.LastInquiryObject.IsWin && !this.LastInquiryObject.IsReturn)) {
        this.PopUpType = 'general-tender';
        this.isClicked = true;
        this.HaveHeader = true;
        this.startLeftPosition = 95;
        this.startTopPosition = 4;
        this.HaveMaxBtn = false;
        this.PercentWidth = 80;
        this.MainMaxwidthPixel = 1500;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          InquiryObject: this.LastInquiryObject,
          Subject: this.Subject,
          RegionCode: this.RegionParams.selectedObject,
          ProductRequestCode: this.ProductRequestNo,
          ProductRequestDate: this.ProductRequestDate,
          CostFactorID: this.CostFactorID,
          IsReadOnly: false,
          PRRegionObject: this.currentRegionObject,
          SumFinalAmount: this.SumFinalAmountStr,
          CheckRegionWritable: this.CheckRegionWritable,
          ModuleCode: this.ModuleCode
        };
      } else {
        this.ShowMessageBoxWithOkBtn('مناقصه یا مزایده مورد نظر تعیین تکلبف شده است .');
      }
    }
  }

  showproductrequestarchivedetail() {
    this.PopUpType = 'product-request-archive-detail';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PercentWidth = 60;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.PopupParam = {
      RegionCode: this.ProductRequestObject.RegionCode,
      IsOnline: this.ProductRequestObject.IsOnline,
      CostFactorID: this.CostFactorID,
      LastInquiryID: (this.ProductRequestObject && this.ProductRequestObject.LastInquiryObject)
        ? this.ProductRequestObject.LastInquiryObject.InquiryID : null,
      OrderCommitionID: (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject)
        ? this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID : null,
      HaveSaveArchive: true,
      HasDeleteAccess: true,
    };
  }

  onRequestEvaluateClick() {
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.PopUpType = 'request-evaluate-list';
    this.HaveHeader = true;
    this.startLeftPosition = 150;
    this.startTopPosition = 40;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      ModuleCode: this.ModuleCode,
      ShowOnly: !this.IsEditable,
    };
  }

  BtnArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 282;
    this.startTopPosition = 11;
    const archiveParam = {
      EntityID: this.CostFactorID,
      TypeCodeStr: 561 + '-',
      DocTypeCode: 561,
      ModuleCode: 2901,
      HasCheck: true,
      OrginalModuleCode: 2901,
      RegionCode: this.ProductRequestObject.RegionCode,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      IsReadOnly: !this.IsEditable,
    };
    this.PopupParam = archiveParam;
  }

  onAutomationClick() {
    if (!isUndefined(this.RegionParams.selectedObject) && this.CostFactorID) {
      let LetterTypeCodeList = [];
      LetterTypeCodeList.push(27);
      this.isClicked = true;
      this.PopUpType = 'app-automation';
      this.HaveHeader = true;
      this.startLeftPosition = 110;
      this.startTopPosition = 5;
      this.MinHeightPixel = 300;
      this.PopupParam = {
        CostFactorID: this.CostFactorID,
        RegionCode: this.currentRegionObject.RegionCode,
        LetterTypeCodeList: LetterTypeCodeList,
        OrganizationCode: this.currentRegionObject.OrganizationCode,
        AutoClose: true,
        SaveMode: this.IsEditable,
        OrginalModuleCode: 2901,
        ReadOnlyMode: !this.IsEditable
      };
    }
  }

  onChangePreRegion(ARegionCode) {
    this.PreRegionParams.selectedObject = ARegionCode;

    if (this.IsShowPreRegion) {
      this.CostCenterParams.selectedObject = null;
      this.SubCostCenterParams.selectedObject = null;
      this.RequestedPersonParams.selectedObject = null;
    }
  }

  EntityColumnDefinition(ProductID, node, EntityList, hasApiCall) {

    // if (ProductID && hasApiCall) {

    //   this.ProductRequest.GetProductRequestEntityList(null, ProductID, null).subscribe(
    //     res => {

    //       var columnDef22 = [];
    //       this.columnDef.forEach(element => {
    //         columnDef22.push(element);
    //       });
    //       this.columnDef = [];

    //       node.data.EntityList = res;
    //       res.forEach(i => {
    //         const obItem = columnDef22.find(x => x.index && x.index === i.EntityTypeID);
    //         if (!obItem) {
    //           const obj = {
    //             index: i.EntityTypeID,
    //             headerName: i.Subject,
    //             field: 'Subject' + i.EntityTypeID.toString(),
    //             width: 200,
    //             editable: true,
    //             resizable: true,
    //             cellEditorFramework: NgSelectVirtualScrollComponent,
    //             cellEditorParams: {
    //               Params: this.NgSelectContractEntityItemParams,
    //               Items: [],
    //               Owner: this
    //             },
    //             cellRenderer: 'SeRender',
    //             valueFormatter: function currencyFormatter(params) {
    //               if (params.value) {
    //                 return params.value.Subject;
    //               } else {
    //                 return '';
    //               }
    //             },
    //           };
    //           columnDef22.push(obj);
    //         }
    //       });
    //       this.columnDef = columnDef22;
    //     });
    // }

    // if (!hasApiCall && EntityList) {

    //   var columnDef22 = [];
    //   this.columnDef.forEach(element => {
    //     columnDef22.push(element);
    //   });
    //   this.columnDef = [];

    //   EntityList.forEach(i => {
    //     const obItem = columnDef22.find(x => x.index && x.index === i.EntityTypeID);
    //     if (!obItem) {
    //       const obj = {
    //         index: i.EntityTypeID,
    //         headerName: i.Subject,
    //         field: 'Subject' + i.EntityTypeID.toString(),
    //         width: 200,
    //         editable: true,
    //         resizable: true,
    //         cellEditorFramework: NgSelectVirtualScrollComponent,
    //         cellEditorParams: {
    //           Params: this.NgSelectContractEntityItemParams,
    //           Items: [],
    //           Owner: this
    //         },
    //         cellRenderer: 'SeRender',
    //         valueFormatter: function currencyFormatter(params) {
    //           if (params.value) {
    //             return params.value.Subject;
    //           } else {
    //             return '';
    //           }
    //         },
    //       };
    //       columnDef22.push(obj);
    //     }
    //   });
    //   this.columnDef = columnDef22;
    // }
  }

  SetEntityDataInDataRow(rowsData) {
    rowsData.forEach(element => {
      if (element.RequestEstimateEntityItemList) {
        element.RequestEstimateEntityItemList.forEach(
          EntityItem => {
            var Name = 'Subject' + EntityItem.EntityTypeID.toString();
            var ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();
            element[Name] = EntityItem.Subject;
            element[ID] = EntityItem.EntityTypeItemID;
          });
      }
    });
  }

  RowClick(event) {
    this.selectedrow = event;
  }

  onVirtualModuleTypeClick() {
    let Disable = true;
    if (!this.ProductRequestObject.DealMethodCode) {
      this.ShowMessageBoxWithOkBtn('روش انجام معامله مشخص نشده.');
      return;
    } else {
      const DealMethodCode = this.ProductRequestObject.DealMethodCode;
      this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
        this.ProductRequestObject = res;
        if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList) {
          this.ProductRequestObject.LastInquiryObject.ProposalList.forEach(element => {
            if (element.IsReceived) {
              Disable = false;
            }
          });
        }
        switch (DealMethodCode) {
          case 1:
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: 'مناقصه عمومی',
              RadioItems: [
                {
                  title: 'تهيه متن آگهي روزنامه',
                  type: 38,
                  IsDisable: false,
                },
                {
                  title: 'فروش اسناد و ثبت ليست متقاضيان',
                  type: 42,
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                    false : true,
                },
                {
                  title: 'دريافت پاکات ، ارائه رسيد و تکميل فرم دبير خانه',
                  type: 70,
                  // tslint:disable-next-line:max-line-length
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList !== null && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0 ?
                    false : true,
                },
                {
                  title: 'برگزاري کميسيون و تنظيم پيش نويس صورتجلسه و انتخاب کارشناس امور قرارداد ها',
                  type: 47,
                  IsDisable: Disable,
                }
              ]
            };
            break;
          case 2:
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: 'مناقصه محدود',
              RadioItems: [
                {
                  title: 'تنظيم دعوت نامه ها در سامانه قرارداد ها',
                  type: 57,
                  IsDisable: false,
                },
                {
                  title: 'دريافت پاکات ، ارائه رسيد و تکميل فرم دبير خانه',
                  type: 58,
                  // tslint:disable-next-line:max-line-length
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList !== null && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0 ?
                    false : true,
                },
                {
                  title: 'برگزاري کميسيون و تنظيم پيش نويس صورتجلسه و انتخاب کارشناس امور قرارداد ها',
                  type: 47,
                  IsDisable: Disable,
                },
              ]
            };
            break;
          case 3:
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: 'استعلام',
              RadioItems: [
                {
                  title: 'تنظيم فرم استعلام و چاپ از طريق سامانه',
                  type: 23,
                  IsDisable: false,
                },
                {
                  title: 'بارگذاري فرم استعلام بها ممهور به امضاي رييس تدارکات',
                  type: 24,
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                    false : true,
                },
                {
                  title: 'بارگذاري کليه مستندات کميسيون در سامانه',
                  type: 113,
                  // tslint:disable-next-line:max-line-length
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList !== null && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0 ?
                    false : true,
                }
              ]
            };
            break;
          case 4:
          case 7:
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: DealMethodCode === 4 ? 'بدون تشربفات' : 'ترک تشریفات',
              RadioItems: [
                {
                  title: 'برگزاري کميسيون و تنظيم پيش نويس صورتجلسه و انتخاب کارشناس قرارداد ها',
                  type: 11,
                  IsDisable: false,
                }
              ]
            };
            break;
          case 8: // RFC 58761
          case 10:
          case 15: // RFC 59876
          case 9: // درخواست خانم احمدی - RFC 61811
          case 17: // RFC 62196
          case 13: // RFC 62654
          case 12: // 63145
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: DealMethodCode === 13 ? 'مشارکتی' :
                DealMethodCode === 12 ? 'مشارکتی' :
                  DealMethodCode === 17 ? 'تهاتر' :
                    DealMethodCode === 8 ? 'بدون تشریفات' :
                      DealMethodCode === 9 ? 'ترک تشریفات' :
                        DealMethodCode === 10 ? 'ماده 28' :
                          'ماده 2',
              RadioItems: [
                {
                  title: 'برگزاري کميسيون و تنظيم پيش نويس صورتجلسه و انتخاب کارشناس قرارداد ها',
                  type: 11,
                  IsDisable: false,
                }
              ]
            };
            break;
          case 5:
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: 'مزایده',
              RadioItems: [
                {
                  title: 'تهيه متن آگهي روزنامه',
                  type: 64,
                  IsDisable: false,
                },
                {
                  title: 'فروش اسناد و ثبت ليست متقاضيان',
                  type: 35,
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                    false : true,
                },
                {
                  title: 'دريافت پاکات ، ارائه رسيد و تکميل فرم دبير خانه',
                  type: 43,
                  // tslint:disable-next-line:max-line-length
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList !== null && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0 ?
                    false : true,
                },
                {
                  title: 'تعيين برنده',
                  type: 68,
                  IsDisable: Disable,
                }
              ]
            };
            break;
          case 6:
            this.PopUpType = 'global-choose-page';
            this.HaveHeader = true;
            this.HaveMaxBtn = false;
            this.startLeftPosition = 520;
            this.startTopPosition = 220;
            this.HeightPercentWithMaxBtn = null;
            this.MinHeightPixel = null;
            this.isClicked = true;
            this.PopupParam = {
              HeaderName: 'حراج',
              RadioItems: [
                {
                  title: 'تهيه متن آگهي روزنامه',
                  type: 27,
                  IsDisable: false,
                },
                {
                  title: 'فروش اسناد و ثبت ليست متقاضيان',
                  type: 84,
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                    false : true,
                },
                {
                  title: 'دريافت پاکات ، ارائه رسيد و تکميل فرم دبير خانه',
                  type: 82,
                  // tslint:disable-next-line:max-line-length
                  IsDisable: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList !== null && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0 ?
                    false : true,
                },
                {
                  title: 'تعيين برنده بدون حضورغياب اعضاي کميسيون',
                  type: 107,
                  IsDisable: Disable,
                }
              ]
            };
            break;
          default:
            this.PopUpType = '';
            this.isClicked = false;
            break;
        }
      });
    }
  }

  OpenSelectedForm(VirtualModuleViewType) {
    switch (VirtualModuleViewType) {
      // کمیسیون
      case 11:
      case 47:
      case 68:
      case 107:
      case 113:
      case 149:
      case 162:
        this.PopUpType = 'app-commition';
        this.isClicked = true;
        this.HaveHeader = true;
        this.startLeftPosition = 110;
        this.startTopPosition = 1;
        this.OverMainMinwidthPixel = 1340;
        this.HaveMaxBtn = false;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          Subject: this.Subject,
          RegionCode: this.RegionParams.selectedObject,
          ProductRequestNo: this.ProductRequestNo,
          ProductRequestDate: this.ProductRequestDate,
          CostFactorID: this.CostFactorID,
          IsReadOnly: false,
          HeaderName: 'کمیسیون',
          ModuleViewTypeCode: VirtualModuleViewType,
          CheckRegionWritable: this.CheckRegionWritable,
          currentRegionObject: this.currentRegionObject,
          IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
          OrginalModuleCode: this.OrginalModuleCode,
          ModuleCode: this.ModuleCode,
          IsAdmin: this.IsAdmin,
          OriginModuleViewTypeCode: this.ModuleViewTypeCode
        };
        break;
      // لیست متقاضیان
      case 24:
      case 35:
      case 84:
      case 42:
      case 43:
      case 58:
      case 70:
      case 82:
      case 164:
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => { // RFC 55833
          this.ProductRequestObject = res;

          // tslint:disable-next-line: max-line-length
          const LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
            this.ProductRequestObject.LastInquiryObject : null;
          if (!LastInquiryObject || (LastInquiryObject && !LastInquiryObject.IsWin && !LastInquiryObject.IsReturn)) {
            this.PopUpType = 'general-tender';
            this.isClicked = true;
            this.HaveHeader = true;
            this.PercentWidth = 81;
            this.startLeftPosition = 140;
            this.startTopPosition = 14;
            this.HaveMaxBtn = false;
            this.PopupParam = {
              ProductRequestObject: this.ProductRequestObject,
              ModuleViewTypeCode: VirtualModuleViewType,
              InquiryObject: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                this.ProductRequestObject.LastInquiryObject : null,
              Subject: this.Subject,
              RegionCode: this.RegionParams.selectedObject,
              ProductRequestCode: this.ProductRequestNo,
              ProductRequestDate: this.ProductRequestDate,
              CostFactorID: this.CostFactorID,
              IsReadOnly: false,
              PRRegionObject: this.currentRegionObject,
              SumFinalAmount: this.SumFinalAmountStr,
              CheckRegionWritable: this.CheckRegionWritable,
              OrginalModuleCode: this.OrginalModuleCode,
              ModuleCode: this.ModuleCode,
              UserRegionCode: this.UserRegionCode,
              IsAdmin: this.IsAdmin,
              OriginModuleViewTypeCode: this.ModuleViewTypeCode
            };
          } else {
            this.ShowMessageBoxWithOkBtn('مناقصه یا مزایده مورد نظر تعیین تکلبف شده است .');
          }
        });
        break;
      case 23:
      case 27:
      case 38:
      case 57:
      case 64:
      case 139:
        this.PopUpType = 'app-inquiry-list';
        this.isClicked = true;
        this.HaveHeader = true;
        this.PercentWidth = 55;
        this.MinHeightPixel = null;
        this.MainMaxwidthPixel = null;
        this.startLeftPosition = 315;
        this.startTopPosition = 130;
        this.HaveMaxBtn = false;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          Subject: this.Subject,
          RegionCode: this.RegionParams.selectedObject,
          ProductRequestCode: this.ProductRequestNo,
          ProductRequestDate: this.ProductRequestDate,
          CostFactorID: this.CostFactorID,
          IsReadOnly: false,
          ModuleViewTypeCode: VirtualModuleViewType,
          PRRegionObject: this.currentRegionObject,
          SumFinalAmount: this.SumFinalAmountStr,
          CheckRegionWritable: this.CheckRegionWritable,
          ModuleCode: this.ModuleCode,
          FirstModuleCode: this.InputParam.FirstModuleCode,
          OrginalModuleCode: this.OrginalModuleCode,
          UserRegionCode: this.UserRegionCode,
          IsAdmin: this.IsAdmin,
          OriginModuleViewTypeCode: this.ModuleViewTypeCode
        };
        break;
      case 5:
      case 6:
      case 7:
        this.ShowArchiveDialog(this.DocTypeMadatory, VirtualModuleViewType); // 62739
        break;
      default:
        break;
    }
  }

  // کنترل نهایی
  onCheckFinalControl() {
    this.ProductRequest.CheckFinalControl(this.CostFactorID, this.WorkflowObjectCode).subscribe(res => {
      if (res === '') {
        this.ShowMessageBoxWithOkBtn('تمامی کنترل های مربوطه با موفقیت بررسی شد.');
      } else {
        this.alertMessageParams.IsMultiLine = true;
        this.ShowMessageBoxWithOkBtn(res);
      }
    });
  }
  onCreateContract() {
    this.PopUpType = 'contract-order-on-without-flow';
    this.isClicked = true;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.HaveHeader = true;
    this.startLeftPosition = 65;
    this.startTopPosition = 210;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      SumFinalAmount: this.SumFinalAmount,
      Subject: this.Subject,
      RequestPerson: this.RequestedPersonParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      IsCost: this.IsCost,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      OrginalModuleCode: this.OrginalModuleCode,
      IsAdmin: this.IsAdmin,
      RegionCode: this.RegionParams.selectedObject,
      ModuleCode: this.ModuleCode
    };
  }
  ShowModuleTypeName() {
    if (this.ProductRequestObject && this.ProductRequestObject.DealMethodCode
      && (this.ModuleCode === 2739 || this.ModuleCode === 2776 || (this.ModuleCode === 2840))) { // درخواست خ احمدی
      switch (this.ProductRequestObject.DealMethodCode) {
        case 1:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'مناقصه عمومی';
            }
          }
          break;
        case 2:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'مناقصه محدود';
            }
          }
          break;
        case 3:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'استعلام';
            }
          }
          break;
        case 4:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'ترک تشریفات';
            }
          }
          break;
        case 5:
          this.VirtualGroupModuleTypeName = 'مزایده';
          break;
        case 6:
          this.VirtualGroupModuleTypeName = 'حراج';
          break;
        case 7:
        case 8: // RFC 58761
          {
            if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
              this.VirtualGroupModuleTypeName = 'بدون تشریفات';
            }
          }
          break;
        case 9: // درخواست خانم احمدی - RFC 61811
          {
            if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
              this.VirtualGroupModuleTypeName = 'ترک تشریفات';
            }
          }
          break;
        case 10: // RFC 58761
          {
            if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
              this.VirtualGroupModuleTypeName = 'ماده 28';
            }
          }
          break;
        case 15: // RFC 59876
          {
            if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
              this.VirtualGroupModuleTypeName = 'ماده 2';
            }
          }
          break;
        case 17: // RFC 62196
          {
            if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
              this.VirtualGroupModuleTypeName = 'تهاتر ';
            }
          }
          break;
        case 12:
          if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
            this.VirtualGroupModuleTypeName = 'مشارکتی';
          }
          break;
        case 13:
          if (this.IsNew && this.ProductRequestObject.DealTypeCode !== 1) {
            this.VirtualGroupModuleTypeName = 'مشارکتی';
          }
          break;
        default:
          this.VirtualGroupModuleTypeName = '';
          break;
      }
    }
  }
  onInvestClick() {
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject
    };
    this.isClicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.PopUpType = 'product-request-invest-page';
    this.startLeftPosition = 304;
    this.startTopPosition = 15;
    this.PercentWidth = 70;
    this.MainMaxwidthPixel = 1046;
  }
  ArchiveBtnClick() {
    let DealMethodCode = -1;
    let DealTypeCode = -1;
    let ContractTypeCode = -1;
    let RegionCode = -1;
    let FinYearCode = -1;
    let Article31ID = -1;
    let Amount = 0;
    if (this.ProductRequestObject) {
      DealMethodCode = this.ProductRequestObject.DealMethodCode;
      DealTypeCode = this.ProductRequestObject.DealTypeCode;
      ContractTypeCode = this.ProductRequestObject.ContractTypeCode;
      RegionCode = this.ProductRequestObject.RegionCode;
      Article31ID = this.ProductRequestObject.Article31ID;
    }
    if (this.ProductRequestObject.ContractObject) {
      FinYearCode = this.ProductRequestObject.ContractObject.FinYearCode;
    }
    this.ProductRequestObject.ProductRequestItemList.forEach(element => {
      Amount += element.FinalAmount;
    });
    this.ProductRequest.GetDocTypeMadatory(
      DealMethodCode ? DealMethodCode : -1,
      this.ProductRequestObject.DealTypeCode,
      ContractTypeCode ? ContractTypeCode : -1,
      RegionCode,
      FinYearCode,
      Article31ID).subscribe(ress => {
        this.DocTypeMadatory = ress;
      }
      );
    if (this.ModuleCode === 2776 || this.ModuleCode === 2840) {
      this.PopUpType = 'global-choose-page';
      this.HaveHeader = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 520;
      this.startTopPosition = 220;
      this.HeightPercentWithMaxBtn = null;
      this.MinHeightPixel = null;
      this.isClicked = true;
      this.PopupParam = {
        HeaderName: 'انتخاب نوع مستند',
        RadioItems: [
          {
            title: 'مستندات',
            type: 5,
            madatory: this.DocTypeMadatory
          },
          {
            title: this.ModuleCode === 2776 ? 'مستندات ملکی' : 'مستندات مشارکتی',
            type: 6,
            madatory: this.DocTypeMadatory
          },
          {
            title: 'مستندات ارزیابی',
            type: 7,
            madatory: this.DocTypeMadatory
          }
        ]
      };
    } else {
      this.ShowArchiveDialog(this.DocTypeMadatory, 1);
    }
  }
  ShowArchiveDialog(MandatoryDocTypeList, type) {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    const archiveParam = {
      EntityID: this.ProductRequestObject ? this.ProductRequestObject.CostFactorID : -1,
      TypeCodeStr: '10-', // 10 = قرارداد بدون گردش /
      DocTypeCode: type === 5 ? 10 : type === 6 ? 60 : type === 7 ? 241 : 10, // 62739
      ModuleCode: this.ModuleCode,
      HasCheck: true,
      MandatoryDocTypeList: MandatoryDocTypeList,
      OrginalModuleCode: this.OrginalModuleCode,
      CostFactorID: this.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      IsReadOnly: this.ModuleViewTypeCode === 500000 ? true : false
    };
    this.ArchiveParam = archiveParam;
  }

}
