import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { of, forkJoin, Observable } from 'rxjs';
import { isUndefined } from 'util';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { INVVoucherGroupService } from 'src/app/Services/InventoryService/BasemodulesService/INVVoucherGroupService';
import { VWIncrementTypeService } from 'src/app/Services/InventoryService/BasemodulesService/VWIncrementTypeService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
@Component({
  selector: 'app-pure-product-request-page',
  templateUrl: './pure-product-request-page.component.html',
  styleUrls: ['./pure-product-request-page.component.css']
})
export class PureProductRequestPageComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupMaximized;
  @Input() InputParam;
  IsAdmin;
  RequestedPersonDisable = false;
  DisableControlles = false;
  HasSecretQuestion = false;
  ISActLocation = false;
  HasMutualContractQuestion = true;
  //HaseEstimate;
  RequestedPersonID;
  SubCostCenterID;
  DisableFilterRegion = false;
  DisableContractor = false;
  DisableCustomerOrder = false;
  DisableWarehouse = false;
  DisableRequestedPerson = false;
  DisableCostCenter = false;
  StartAndEndDateIsEditable = false;
  CostCenterID;
  SubRusteeID;
  RequestPersonObject;
  RusteeID;
  HasBtnShowContractors;
  PopupParam;
  MutualContractStatus: number;
  ShowMCSPanel = false;
  IsContractDisable: boolean;
  ArchiveIsReadOnly = false;
  PRContractObject;
  FilterDocumentTypeCodeList = [];
  ParentDocType = 38;
  RegisterLetterDate;
  DocumentLetterNo;
  currentContractSearchTerm;
  RegisterLetterNo;
  CheckRegionWritable = true;
  ConfirmCode;
  OfficialExpertPrice = null;
  currentRegionObject;
  HaveAcceptArchive = false;
  HaveArchive = false;
  ConfirmArchiveBtnText = 'تایید مستندات آگهی';
  HaveProvision = false;
  HaveAlertToFinance;
  HaveOnlyLetter = false;
  HaveMultiOnlyLetter = false;
  HaveSeenProvision;
  HaveCommition;
  HaveTopExpertPerson;
  HaveArticle18;
  HaveAcceptArticle18;
  HaveLetterAndExpertPerson;
  HaveLetterWithCommitionDate;
  HaveSecondFieldSet = true;
  CommitionDate;
  HaveInquiry;
  ContractorType = true;
  HaveExpertPerson;
  ContractLetterDate;
  ContractLetterNo;
  HaveContractStyle;
  btnRevocationName;
  btnProvisionName = 'پیشنهاد تامین اعتبار';
  AutomationLetterBtnText = 'اتصال نامه';
  HasCompleteInfoBtnText = 'مشاهده اطلاعات تکمیلی';
  IsRequestProvision = false;
  QuestionLabel;
  MultiQuestionLabel;
  TopQuestionLabel;
  WfDetailsShow = false;
  MultiWfDetailsShow = false;
  MultiWfDetailsShowHeight;
  WfDetailsShowHeight = 60;
  SelectedReceiveDocID;
  tabpanelHeight = 100;
  tabpanelWarrantyDocHeight = 87;
  ReceiveDocEnable;
  WfSaveDetailsShow = false;
  OrderCommitionObject;
  IsEditable = true;
  ISSendAndConfirm = false;
  IsArticle48Editable = false;
  IsRadioEditabled: boolean;
  IsLawful;
  btnRevocationIcon;
  CurrentUserSubCostCenter;
  IsNew = true;
  WorkFlowTransitionID;
  ReadyToConfirm;
  // AccessRevocation;
  HaveRevocation;
  btnConfirmName;
  btnConfirmIcon;
  IsEntryPercentageOfChanges = false;
  ExpertPersonRoleID = 972;
  ExpertPersonLabel = 'کارشناس امور قرارداد ها';
  WorkflowButtonsWidth = 44.8;
  Excel_Header_Param: { colDef2: any };
  ContractListSetFrom: any;
  ContractSignItems;
  ISDisabledConfirmAndReturnBtn = false;
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

  CostProductItems;
  CostProductParams = {
    bindLabelProp: 'CostProductName',
    bindValueProp: 'CostProductId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    type: 'cost-product',
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

  UnitPatternItems;
  UnitPatternParams =
    {
      bindLable: 'UnitTopicName',
      bindValue: 'UnitPatternID',
      selectedObject: null,
      IsDisabled: false,
      AllowParentSelection: true,
      TextSpanWidth: 130
    };
  IsDown = false;
  IsCost = true;
  i;
  CurrentSubCostCenterID;
  CheckValidate = false;
  complexForm: FormGroup;
  PRCostRowData = [];
  AssetRowData = [];
  CustomerOrderItems;
  CustomerOrderParams = {
    bindLabelProp: 'FullCustomerName',
    bindValueProp: 'CustomerOrderID',
    placeholder: '',
    MinWidth: '155px',
    DropDownMinWidth: '300px',
    selectedObject: null,
    loading: false,
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
    IsDisabled: false
  };

  RequestedPersonItems = <any>[];
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
  IsRegiondisable = false;
  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: this.IsRegiondisable,
    Required: true
  };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader;
  LetterTypeCodeList = [];
  WFFieldSetLegend = '';
  WFLegendWidth = 0;
  FirstWFLegendWidth = 0;
  FirstWFFieldSetLegend = '';
  SecondWFLegendWidth = 0;
  SecondWFFieldSetLegend = '';
  HaveMaxBtn;
  columnDef;
  gridApi: any;
  rowsData: any = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  gridHeight = 56;
  PRIgridHeight = 90;
  WarrantyDocGridHeight = 82;
  HaveSave = false;
  HaveUpdate = false;
  HaveDelete = false;
  IsRowClick = false;
  ShowContractInfo = false;
  RegionListSet;
  selectedRegion;
  selectCostCenter;
  UnitPatternSet;
  selectedUnitPattern;
  ProductRequestDate;
  PersianProductRequestDate;

  DeadLineDate;
  ProductRequestPersoncolDef = [];
  ProductRequestRowData = [];
  ProductRequestCostRowData = [];
  //PRPersonGridApi;
  //PRCostGridApi;
  //AssetGridApi;
  Subject = '';
  BriefingReport = '';
  Address = '';
  ContractCode = '';
  ContractSubject = '';
  ProductRequestItemID;
  CostCenterItems;
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
    bindLabelProp: 'ProductName',
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
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1 }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  startLeftPosition;
  startTopPosition;
  OverMainMinwidthPixel;
  ArchiveBtnText = 'مستندات';
  HasCreateContractBtnText = 'انعقاد قرارداد';
  CostFactorID = -1;
  ProductRequestObject;
  IsDisable = true;
  SumFinalAmount = 0;
  PercentageOfChanges = 0;
  SumFinalAmountStr = '0';
  PercentWidth = null;
  MainMaxwidthPixel = null;
  MinHeightPixel = null;
  IsRenewal = false;
  Renewal = false;
  RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.RequestedPersonParams,
  this.CostCenterParams, this.SubCostCenterParams];
  IsInit: boolean;
  // HaveConfirm = false;
  // ConfirmStatus = [];
  IsEndFlow: any;
  BtnClickedName: string;
  ChangeDetection: any;
  WorkFlowID: number;
  ObjectNo: string;
  WorkflowTypeName: string;
  ObjectID: any;
  WorkflowTypeCode;
  WorkflowObjectCode;
  ModuleViewTypeCode;
  ModuleViewTypeCode_Cache;
  public scrollbarOptions = { axis: 'x', theme: 'inset-2-dark', scrollButtons: { enable: true } };
  HeightPercentWithMaxBtn = 95;
  ModuleCode;
  OrginalModuleCode;
  IsContractRemainStartWF;
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  ProdcutTypeCode: any;
  IsContractSelect: boolean;
  RelatedProductRequestID: any;
  RelatedProductRequestObject;
  HasCreateContractBtn: boolean;
  IsInsert = false;
  MinimumPosting: any;
  IsDisableBtnContract = true;
  HaveCompleteInfo = false;
  ShowWorkflowButtons = true;
  ButtonsPlaceWidthPercent = 55;
  UserRegionCode;
  NgSelectProposalParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ProposalID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Proposal'
  };
  NgSelectEstateTypeParams = {
    bindLabelProp: 'EstateTypeName',
    bindValueProp: 'EstateTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'EstateType'
  };
  Editable = true;
  HaveRequestPerson = false;
  IsDisabledType106 = true;
  LastInquiryObject: any;
  OrdersObject: any;
  IsShow = false;
  HasProposalItem = false;
  HasCompleteSave: boolean;
  IsProvideCredit = false;
  SecondLetterTypeCode;
  SecondRegisterLetterNo;
  SecondRegisterLetterDate;
  SecondDocumentLetterNo;
  FirstRegisterLetterNo;
  FirstRegisterLetterDate;
  FirstDocumentLetterNo;
  SumFinalAmountRelatedContract = 0;
  PerecentageChangesLabel = false;
  HasProvisionContractID;
  SumEstimateAmountStr = '0';
  SumEstimateAmountCoefStr = '0';
  IsEditConfirm = true;
  IsExpertSelected = false;
  IsSecret = false;
  HaveMutualContract = false;
  MutualContractQuestion;
  IsSecretQuestion = false;
  HaveHsePlan = false;
  HaveHsePlanQuestion = false;
  HasBtnAutomationLetter;
  IsTMIRegion;
  HaveSupervisorPerson: boolean;
  PriceListPatternID = null;
  ShowRequestSuggestion = false;
  ShowQuestion = false;
  //ShowSave106 = false;
  btnConfirmAndReturnName = 'عدم تایید و بازکشت';
  CartableUserID;
  IsShowType108 = false;
  CurrWorkFlow: any;
  IsType114 = false;

  INVVoucherGroupItems;
  INVVoucherGroupParams = {
    bindLabelProp: 'INVVoucherGroupName',
    bindValueProp: 'INVVoucherGroupCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  IncrementTypeItems = [
    { IncrementTypeCode: 2, IncrementTypeName: 'حواله' },
    { IncrementTypeCode: 1, IncrementTypeName: 'رسید' }
  ];

  IncrementTypeParams = {
    bindLabelProp: 'IncrementTypeName',
    bindValueProp: 'IncrementTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  WarehouseItems;
  WarehouseParams = {
    bindLabelProp: 'WarehouseName',
    bindValueProp: 'WarehouseID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  ContractorTotalItemCount;
  ContractorPageCount;
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
    type: 'product-request-contract-contractor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractItems;
  ContractParams = {
    bindLabelProp: 'SelectedSubject',
    bindValueProp: 'ContractId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    DropDownMinWidth: '320px',
    type: 'related-contract',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره نامه', HeaderName: 'LetterNo', width: 35, MinTermLenght: 1, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 },
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره نامه', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, },
        { HeaderCaption: 'کد قرارداد', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  ContractTotalItemCount;
  ContractPageCount;

  ContractWorkOrderParams = {
    bindLabelProp: 'Title',
    bindValueProp: 'CnrtWorkOrderID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    DropDownMinWidth: '320px',
    type: 'CnrtWorkOrder',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد دستور کار', HeaderName: 'CnrtWorkOrderCode', width: 35, MinTermLenght: 1, SearchOption: 'CnrtWorkOrderCode' },
        { HeaderCaption: 'تاریخ دستور کار', HeaderName: 'CnrtWorkOrderDate', width: 53, SearchOption: 'CnrtWorkOrderDate', MinTermLenght: 3 },
        { HeaderCaption: 'موضوع', HeaderName: 'Note', width: 35, MinTermLenght: 1, SearchOption: 'Note' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد دستور کار', width: 35, },
        { HeaderCaption: 'تاریخ دستور کار', width: 53, },
        { HeaderCaption: 'موضوع', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  ContractWorkOrderItems;
  ProductRequestStatusName;
  IncrementTypeDisable = false;

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
    private contractpaydetail: ContractPayDetailsService,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private RefreshCustomerOrder: RefreshServices,
    private RefreshCostProductItems: RefreshServices,
    private route: ActivatedRoute,
    private FlowService: WorkflowService,
    private Automation: AutomationService,
    private Report: ReportService,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    let RegionCode = -1;
    let CostCenterCode = '';
    if (this.ProductRequestObject) {
      RegionCode = this.ProductRequestObject.RegionCode;
      CostCenterCode = this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode;
    } else {
      RegionCode = this.RegionParams.selectedObject;
      // tslint:disable-next-line: max-line-length
      CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
    }
    // this.FillGrid(RegionCode, CostCenterCode);
  }

  FillGrid(HasEstimate) {
    this.columnDef = [
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
              params.data.ProductName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductName = null;
            return false;
          }
        },
        editable: () => {
          return this.IsEditable;
        },
        width: 120,
        resizable: true,
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductName',
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
            return params.value.ProductName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductName) {
            params.data.ProductName = params.newValue.ProductName;
            params.data.ProductID = params.newValue.ProductID;
            this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
              params.data.ScaleName = res;
            });
            return true;
          } else {
            params.data.ProductName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: () => {
          return this.IsEditable;
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
        width: 120,
        resizable: true
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: () => {
          return this.IsEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            // tslint:disable-next-line: radix
            params.data.QTY = params.newValue;
          }
        },
        HaveThousand: true,
        width: 90,
        resizable: true
      },
    ];
  }
  GetRadioBoxSelectedItem(event) {
    this.MutualContractStatus = event;
  }
  ngOnInit() {
    this.User.CheckAdmin().subscribe(res => {
      this.IsAdmin = res;
    });

    this.CheckRegionWritable = this.InputParam && this.InputParam.IsRegionReadOnly;
    this.WorkflowButtonsWidth = this.CheckRegionWritable ? 17 : this.WorkflowButtonsWidth;
    this.ButtonsPlaceWidthPercent = this.CheckRegionWritable ? 82.8 : this.ButtonsPlaceWidthPercent;
    this.IsInit = true;
    if (this.InputParam) {
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsContractRemainStartWF = this.InputParam.IsStartWF;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.ModuleViewTypeCode_Cache = this.ModuleViewTypeCode;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.ReadyToConfirm = this.InputParam.ReadyToConfirm;
      this.CostFactorID = this.InputParam.CostFactorID;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.WorkflowTypeName = this.InputParam.WorkflowTypeName;
      this.WorkflowTypeCode = this.InputParam.WorkflowTypeCode;
      this.WorkflowObjectCode = this.InputParam.WorkflowObjectCode;
      this.ObjectNo = this.InputParam.ObjectNo;
      this.ObjectID = this.InputParam.ObjectID;
      this.CartableUserID = this.InputParam.CartableUserID;
      this.MinimumPosting = this.InputParam.MinimumPosting;
      // tslint:disable-next-line: max-line-length
      this.ModuleCode = this.ModuleCode ? this.ModuleCode : 2862;
      this.rowsData = this.InputParam.ProductRequestItemList ? this.InputParam.ProductRequestItemList : [];
      this.DisableCustomerOrder = this.InputParam.DisableCustomerOrder ? this.InputParam.DisableCustomerOrder : false;
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
    }

    // tslint:disable-next-line:no-shadowed-variable
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
        this.ArchiveList.HasArchiveAccess(this.ModuleCode),
        this.ProductRequest.GetSubCostCenterPerson(),
        this.ProductRequest.GetProductRequest(this.CostFactorID),
        // this.ProductRequest.HasProductRequestEstimate(this.CostFactorID)
      ]).subscribe(res => {
        this.CurrentUserSubCostCenter = res[1];
        if (res[2]) {
          this.IsDisable = false;
          this.ProductRequestObject = res[2];
          this.HasProvisionContractID = this.ProductRequestObject.ProvisionContractID ? true : false;
          this.FillAllNgSelectByProductRequest(this.ProductRequestObject);
          if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
            this.IsInsert = true;
          }
          if (
            this.ProductRequestObject.ProductRequestStatusCode &&
            this.ProductRequestObject.ProductRequestStatusCode !== 3) {
            this.btnRevocationName = 'ابطال';
            this.btnRevocationIcon = 'revocation';
            // this.AccessRevocation = true;

          }
          if (
            this.ProductRequestObject.ProductRequestStatusCode &&
            this.ProductRequestObject.ProductRequestStatusCode === 3) {
            this.btnRevocationName = 'بازگشت از ابطال';
            this.btnRevocationIcon = 'cancel';
            // this.AccessRevocation = true;
          }
          // this.IsCost = this.ProductRequestObject.IsCost;
          // if (this.ModuleViewTypeCode === 89 && this.IsCost === false) {
          //   this.ISActLocation = true;
          // } else {
          //   this.ISActLocation = false;
          // }
          if (this.ProductRequestObject.ModuleViewTypeCode === 89 || this.ProductRequestObject.ModuleViewTypeCode === 95) {
            this.HasMutualContractQuestion = false;
          }
          this.ProductRequestCode = this.ProductRequestObject.ProductRequestCode;
          this.ProductRequestNo = this.ProductRequestObject.ProductRequestNo;
          this.ProductRequestDate = this.ProductRequestObject.ShortProductRequestDate;
          this.DeadLineDate = this.ProductRequestObject.ShortDeadlineDate;
          this.Subject = this.ProductRequestObject.Subject;
          this.Address = this.ProductRequestObject.Address;
          this.HaveMutualContract = this.ProductRequestObject.HaveMutualContract;
          this.IsSecret = this.ProductRequestObject.IsSecret;
          this.HaveHsePlan = this.ProductRequestObject.HaveHsePlan;
          this.MutualContractStatus = this.ProductRequestObject.MutualContractStatus;
          if (this.ProductRequestObject && this.ProductRequestObject.ContractObject) {
            this.ContractSubject = this.ProductRequestObject.ContractObject.Subject;
            this.ContractCode = this.ProductRequestObject.ContractObject.LetterNo;
          }
          this.BriefingReport = this.ProductRequestObject.BriefingReport;
          this.IncrementTypeParams.selectedObject = this.ProductRequestObject.IsIncrement ? 1 : 0;
          this.ContractorType = this.ProductRequestObject.ConsumerType;
          this.rowsData = this.ProductRequestObject.ProductRequestItemList;
          this.ProductRequestStatusName = this.ProductRequestObject.ProductRequestStatusName;
        } else {
          // this.RedioClick(this.IsCost);
          this.OnOpenNgSelect('Region');
          this.IsDown = true;
          this.User.GetCurrentUserDetails()
            // tslint:disable-next-line:no-shadowed-variable
            .subscribe(res => {
              this.ProductRequestDate = res.MCurrentDate;
            });
        }

        let RegionCode = -1;
        let CostCenterCode = '';
        if (this.ProductRequestObject) {
          RegionCode = this.ProductRequestObject.RegionCode;
          CostCenterCode = this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode;
        } else {
          RegionCode = this.RegionParams.selectedObject;
          // tslint:disable-next-line: max-line-length
          CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
        }
        // this.HaseEstimate = res[3];
        this.FillGrid(false);
      });
    });
  }

  FillAllNgSelectByProductRequest(ProdReqObj) {
    // tslint:disable-next-line: no-shadowed-variable
    const promise1 = new Promise<void>((resolve) => {
      if (ProdReqObj.SubCostCenterObject &&
        ProdReqObj.SubCostCenterObject.SubCostCenterId &&
        ProdReqObj.SubCostCenterObject.CostCenterId) {
        forkJoin([
          // this.ProductRequest.GetSubCostCenter(ProdReqObj.ContractStackHolderObject.CostCenterId, true),
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterPriPerson(ProdReqObj.SubCostCenterObject.CostCenterId, ProdReqObj.SubCostCenterObject.SubCostCenterId, ProdReqObj && ProdReqObj.ActorID ? ProdReqObj.ActorID : null, null),
        ]).subscribe(res => {
          this.SubCostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.SubCostCenterId;

          res[0].forEach(element => {
            element.FullPersonName = element.FirstName + ' ' + element.LastName;
          });

          this.RequestedPersonItems = res[0];
          this.RequestedPersonParams.selectedObject = ProdReqObj.ActorID;
          resolve();
        });
      } else {
        resolve();
      }
    });

    const promise3 = new Promise<void>((resolve) => {
      forkJoin([
        // tslint:disable-next-line: max-line-length
        this.RegionList.GetRegionList(this.ModuleCode, !this.CheckRegionWritable),
        this.ProductRequest.GetVWExeUnitByRegion(ProdReqObj.RegionCode),
        this.ProductRequest.GetCustomerOrderByRegionPaging(1, 30, '', '', ProdReqObj.RegionCode,
          ProdReqObj.CustomerOrderID),
        this.ProductRequest.GetOnfilterRegionByRegionCode(ProdReqObj.RegionCode, ProdReqObj.InvVoucherGroupCode),
        this.ProductRequest.GetActLocationByRegionCode(ProdReqObj.RegionCode),
        this.ProductRequest.GetCostCenterByRegion(ProdReqObj.RegionCode,
          ProdReqObj.ContractStackHolderObject ? ProdReqObj.ContractStackHolderObject.CostCenterId : null, null, false),
        this.ProductRequest.GetInvVoucherGroupList(ProdReqObj.RegionCode, ProdReqObj.CostProductID),
        this.ProductRequest.GetCostProductBySubCostCenter(ProdReqObj.SubCostCenterObject.CostCenterId,
          ProdReqObj.RegionCode, 1, 30, '', '', false, ProdReqObj.CostProductID),
        this.ProductRequest.GetValidWarehouseByRegion(ProdReqObj.RegionCode),
        this.Actor.GetActorPaging(1, 30, '', 'ActorID', ProdReqObj.ConsumerType, false, false, ProdReqObj.ConsumerID),
        this.ContractList.GetRelatedContractpagingForExtended(1, 30, '', '', this.RegionParams.selectedObject,
          this.IsCost, true, ProdReqObj.ContractID, false),
        this.ProductRequest.GetCostCenterByRegionAndRequestOwner(
          ProdReqObj.SubCostCenterObject.CostCenterObject.RegionCode,
          ProdReqObj.SubCostCenterObject ? ProdReqObj.SubCostCenterObject.CostCenterId : null,
          null,
          false
        ),
        this.ProductRequest.GetListByCostCenterId(
          ProdReqObj.SubCostCenterObject.CostCenterObject.CostCenterId,
          null,
          true,
          ProdReqObj.SubCostCenterObject.CostCenterObject.RegionCode,
        )
      ]).subscribe((res: any) => {
        this.RegionItems = res[0]; // case region
        this.RegionParams.selectedObject = ProdReqObj.RegionCode;
        this.RefreshPageByRegion(this.RegionParams.selectedObject);
        this.VWExeUnitItems = res[1]; // case 'VWExeUnit':
        this.VWExeUnitParams.selectedObject = ProdReqObj.UnitPatternID;

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
        if (ProdReqObj.SubCostCenterObject) {
          this.OnFilterRegionParams.selectedObject = ProdReqObj.SubCostCenterObject.CostCenterObject.RegionCode;
        }

        this.CostCenterItems = res[11];
        this.SubCostCenterItems = res[12];
        if (ProdReqObj.SubCostCenterObject && ProdReqObj.SubCostCenterObject.CostCenterId) {
          this.CostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.CostCenterId;
          this.SubCostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.SubCostCenterId;
        }
        if (ProdReqObj.CostFactorID) {
          this.INVVoucherGroupItems = res[6];
          this.INVVoucherGroupParams.selectedObject = ProdReqObj.InvVoucherGroupCode;
          this.INVVoucherGroupChange(ProdReqObj.InvVoucherGroupCode);
        }
        this.IsDown = true;


        this.CostProductItems = res[7].List;
        this.RefreshCostProductItems.RefreshItemsVirtualNgSelect({
          List: res[7].List,
          term: '',
          TotalItemCount: res[7].TotalItemCount,
          PageCount: Math.ceil(res[7].TotalItemCount / 30),
          type: 'cost-product',
        });
        this.CostProductParams.selectedObject = ProdReqObj.CostProductID;
        this.WarehouseItems = res[8];
        this.WarehouseParams.selectedObject = ProdReqObj.WarehouseID;
        this.ContractorItems = res[9].List;
        this.ContractorTotalItemCount = res[9].TotalItemCount;
        this.ContractorPageCount = Math.ceil(res[9].TotalItemCount / 30);
        this.ContractPageCount
        this.NgSelectContractorParams.selectedObject = ProdReqObj.ConsumerID;
        this.ContractItems = res[10].List;
        this.ContractParams.selectedObject = ProdReqObj.ContractID;
        this.onChangeContract(ProdReqObj.CnrtWorkOrderID);
        resolve();
      });
    }).then(() => {
      this.ContractWorkOrderParams.selectedObject = ProdReqObj.CnrtWorkOrderID;
    });
  }

  RefreshPageByRegion(ARegionCode) {

    this.IsTMIRegion = false;
    if (ARegionCode && ARegionCode === 200) {
      this.IsTMIRegion = true;
      this.HaveRequestPerson = false;
    }

    // tslint:disable-next-line:max-line-length
    this.currentRegionObject = this.ProductRequestObject && this.ProductRequestObject.RegionObject ? this.ProductRequestObject.RegionObject : this.RegionItems.find(x => x.RegionCode === ARegionCode);
    //this.ProductRequestCostColDef[1].cellEditorParams.Items = this.ProductRequest.GetCostCenterByRegion(ARegionCode, null, false);
    //this.ProductRequestCostColDef[3].cellEditorParams.Items = this.ProductRequest.GetUnitPatternByRegionCode(ARegionCode, false);
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
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
          if (this.IsContractRemainStartWF) {
            this.WorkFlowID = null;
          }
        }
        Resolve();
      });
  }
  ViewTypeChange() {
    if (this.CheckRegionWritable) {
      this.IsEditable = true;
      this.WfSaveDetailsShow = false;
    } else {
      if (this.btnConfirmName === 'عدم تایید') {
        this.IsEditable = false;
        this.IsEditConfirm = false;
      }
      if (this.ModuleCode === 2862) {
        switch (this.ModuleViewTypeCode) {
          case 1:
            // this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.IsEditable = true;
            this.HaveSave = true;
            // this.HaveRequestPerson = true;
            // this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            this.LetterTypeCodeList.push(24);
            this.HasBtnAutomationLetter = true;
            break;
          case 2:
            this.IsEditable = false;
            this.WfSaveDetailsShow = false;
            this.DisableControlles = true;
            this.IsDisable = false;
            break;
          case 3: // RFC 56688
            this.IsEditable = false;
            this.WfSaveDetailsShow = false;
            this.DisableControlles = true;
            this.IsDisable = false;
            this.HaveAlertToFinance = true;
            this.gridHeight = 60;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 30;
            break;
          case 4:
            {
              this.HaveProvision = true;
              this.IsEditable = false;
              this.WfSaveDetailsShow = false;
              // this.WfDetailsShow = false;
              this.HaveCompleteInfo = true;
            }
            break;
          default:
            this.IsEditable = true;
            this.WfSaveDetailsShow = false;
            break;
        }
      }

    }
  }

  // tslint:disable-next-line:no-shadowed-variable
  GetADocType(DocTypeCode, resolve) {
    this.ArchiveList.GetADocumentType(DocTypeCode).subscribe(res => {
      resolve(res);
    });
  }

  popupclosed(Param) {
    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.HeightPercentWithMaxBtn = 95;
  }



  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = changes.PopupMaximized.currentValue ? this.gridHeight + 1 : this.gridHeight - 1;
    }
  }

  onChangeRegion(ARegionCode) {
    this.RegionParams.selectedObject = ARegionCode;
    this.AssetRowData = [];
    this.CustomerOrderParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.CostCenterParams.selectedObject = null;
    this.CostProductParams.selectedObject = null;
    this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
      if (res.length === 1) {
        this.VWExeUnitItems = res;
        this.VWExeUnitParams.selectedObject = this.VWExeUnitItems[0].UnitPatternID;
      } else {
        this.VWExeUnitParams.selectedObject = null;
      }
    });
    this.WorkflowTypeCode = null;
    this.ModuleViewTypeCode = null;
    if (!isUndefined(ARegionCode) && ARegionCode !== null) {
      this.RefreshPageByRegion(ARegionCode);
    }

    let CostCenterCode = '';
    // tslint:disable-next-line: max-line-length
    CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
    // this.FillGrid(ARegionCode, CostCenterCode);
  }

  onChangeFilterRegion(ARegionCode) {
    this.CostCenterParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;

  }

  onChangeRegionArea(AreaCode) {
  }

  onChangeAreaDistrict(DistrictCode) {

  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = undefined;
    this.MainMaxwidthPixel = undefined;
    this.MinHeightPixel = undefined;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
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
        PageCount: Math.ceil(TotalItemCount / 30)
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
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  oncellEditingStarted(event) {
    this.gridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });

    if (event.colDef && event.colDef.field === 'ProductName') {
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
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  FetchMoreCostProduct(event) {
    this.CustomerOrderParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.ProductRequest.GetCostProductBySubCostCenter(
        this.SubCostCenterParams.selectedObject,
        this.RegionParams.selectedObject,
        event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        false,
        null).subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshCostProductItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'cost-product'
      });
    });
  }

  doCostProductSearch(event) {
    this.CostProductParams.loading = true;
    this.ProductRequest.GetCostProductBySubCostCenter(
      this.SubCostCenterParams.selectedObject,
      this.RegionParams.selectedObject,
      event.PageNumber,
      30,
      event.term,
      event.SearchOption,
      false,
      null).subscribe((res: any) => {
        this.RefreshCostProductItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'cost-product'
        });
      });
    this.CostProductParams.loading = false;
  }


  onSave() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    this.CheckValidate = true;
    let ValidateForm = true;

    // tslint:disable-next-line:no-shadowed-variable
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
        this.Subject &&
        this.CostCenterParams.selectedObject &&
        this.SubCostCenterParams.selectedObject &&
        this.RequestedPersonParams.selectedObject &&
        this.VWExeUnitParams.selectedObject &&
        this.ProductRequestDate &&
        this.RegionParams.selectedObject != null &&
        this.INVVoucherGroupParams.selectedObject;

      if (ValidateForm) {
        let ItemNo = 0;
        const ProductRequestList = [];
        const ProductRequestEstateList = [];
        this.gridApi.stopEditing();
        //this.AssetGridApi.stopEditing();
        const ProductRequestObj = {
          // tslint:disable-next-line:max-line-length
          ContractTypeCode: this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode ? this.ProductRequestObject.ContractTypeCode : null,
          CostFactorID: this.ProductRequestObject && this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : -1,
          RegionCode: this.RegionParams.selectedObject,
          IsCost: this.IsCost,
          ProductRequestCode: this.ProductRequestCode ? this.ProductRequestCode : -1,
          ProductRequestDate: this.ProductRequestDate,
          DeadlineDate: this.DeadLineDate,
          UnitPatternID: this.VWExeUnitParams.selectedObject,
          CustomerOrderID: this.CustomerOrderParams.selectedObject,
          ActorID: this.RequestedPersonParams.selectedObject,
          // RegionAreaDistrictCode: this.DistrictParams.selectedObject, // ناحیه
          // RegionAreaCode: this.DistrictAreaParams.selectedObject, // محله
          // WorkPlaceCode: this.OnFilterRegionParams.selectedObject, // واحد اجرایی محل انجام کار
          Subject: this.Subject,
          // Address: this.Address,
          ProductRequestStatusCode: 1,
          HasLicence: 0,
          RelatedContractID: null,
          ProvisionContractID: null,
          // tslint:disable-next-line:max-line-length
          PersonUnitPatternID: this.UnitPatternParams.selectedObject && this.UnitPatternParams.selectedObject.UnitPatternID ? this.UnitPatternParams.selectedObject.UnitPatternID : null,
          SubCostCenterID: this.SubCostCenterParams.selectedObject,
          // BriefingReport: this.BriefingReport,
          IsWeb: 1,
          ActLocationID: null,
          HaveMutualContract: this.IsCost ? this.HaveMutualContract : false,
          MutualContractStatus: this.HaveMutualContract ? this.MutualContractStatus : null,
          IsSecret: this.IsSecret,
          HaveHsePlan: this.HaveHsePlan,
          PriceListPatternID: null,
          InvVoucherGroupCode: this.INVVoucherGroupParams.selectedObject,
          IsIncrement: this.IncrementTypeParams.selectedObject ? 1 : 0,
          CostProductID: this.CostProductParams.selectedObject,
          WarehouseID: this.WarehouseParams.selectedObject,
          ConsumerID: this.NgSelectContractorParams.selectedObject,
          PriceListTopicID: this.ProductRequestObject ? this.ProductRequestObject.PriceListTopicID : null,
          GradeID: this.ProductRequestObject ? this.ProductRequestObject.GradeID : null,
          IsConfirm: 0,
          ContractID: this.ContractParams.selectedObject ? this.ContractParams.selectedObject : null,
          CnrtWorkOrderID: this.ContractWorkOrderParams.selectedObject ? this.ContractWorkOrderParams.selectedObject : null,
          RequestObjectTypeCode: 4
        };

        this.gridApi.forEachNode(node => {
          const ProductRequestItemObj = {
            ProductRequestItemID: node.data.ProductRequestItemID ? node.data.ProductRequestItemID : -1,
            CustomerOrderItemID: node.data.CustomerOrderItemID ? node.data.CustomerOrderItemID : null,
            CostFactorID: ProductRequestObj.CostFactorID,
            ItemNo: ++ItemNo,
            QTY: parseFloat(node.data.QTY),
            Subject: node.data.Subject,
            // tslint:disable-next-line:max-line-length
            ProductID: node.data.ProductName && node.data.ProductName.ProductID ? node.data.ProductName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
            StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
            EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
          };
          ProductRequestList.push(ProductRequestItemObj);
        });

        const ContractOrderObj = [];
        const AssetPRList = [];
        this.ProductRequest.SavePurProductRequest(
          this.ModuleCode,
          ProductRequestObj,
          ProductRequestList,
          this.OrginalModuleCode
        ).subscribe((res: any) => {
          this.ProductRequestCode = res.ProductRequestCode;
          this.ProductRequestNo = res.ProductRequestNo;
          this.rowsData = res.ProductRequestItemList;
          this.CostFactorID = res.CostFactorID;
          this.ProductRequestObject = res;
          if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
            this.IsInsert = true;
          }
          this.IsDisable = false;
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
          PageCount: Math.ceil(res.TotalItemCount / 30)
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

  Close() {
    // if (this.ModuleCode && this.ModuleCode === 2773 && !this.InputParam) {
    //   this.isClicked = false;
    //   this.Closed.emit(true);
    //   this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    // } else {
    this.Closed.emit(true);
    //}
  }






  OnProductRequestDateChange(ADate) {
    this.ProductRequestDate = ADate.MDate;
    this.PersianProductRequestDate = ADate.SDate;
  }
  GetOfficialExpertPrice(Price) {
    this.OfficialExpertPrice = Price;
  }
  OnRegiserLetterDateChange(ADate) {
    this.RegisterLetterDate = ADate.MDate;
  }
  OnCommitionDateChange(ADate) {
    this.CommitionDate = ADate.MDate;
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

  RequestSuggestion() {
    // this.ProductRequest.GetProductRequestDealType(this.ProductRequestObject.RegionCode,
    //   this.ProductRequestDate,
    //   // tslint:disable-next-line:radix
    //   this.SumFinalAmount
    // ).
    //   subscribe(res => {
    //     this.ShowSuggestionDialong();
    //   });

    this.ShowSuggestionDialong();
  }

  ShowSuggestionDialong() {
    if ((this.ProductRequestObject.RegionCode > 0 && this.ProductRequestObject.RegionCode < 22) &&
      (this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode === '05') &&
      (this.ProductRequestObject.DealTypeCode === 3 || this.ProductRequestObject.DealTypeCode === 4 || this.ProductRequestObject.DealTypeCode === 1)) {
      this.ShowMessageBoxWithOkBtn('جمع مبلغ اقلام درخواستی در حد متوسط نیست');
      return;
    }
    this.PopUpType = 'product-request-suggestion';
    this.isClicked = true;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.HaveHeader = true;
    this.startLeftPosition = 65;
    this.startTopPosition = 10;
    this.HaveMaxBtn = true;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      SumFinalAmount: this.SumFinalAmountStr,
      DealTypeCode: this.ProductRequestObject.DealTypeCode,
      DealTypeName: this.ProductRequestObject.DealTypeName,
      IsCost: this.IsCost,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      CheckRegionWritable: this.CheckRegionWritable,
      ModuleCode: this.ModuleCode,
      OrginalModuleCode: this.OrginalModuleCode
    };
  }
  MessageBoxAction(event) {
    if ((this.BtnClickedName === 'BtnConfirm' || this.BtnClickedName === 'ConfirmAndSend') && event === 'YES') {
      this.DOConfirm();
    }
    if (this.BtnClickedName === 'BtnConfirm' && this.IsExpertSelected && event === 'YES') {
      this.IsExpertSelected = false;
      this.DOConfirm();
    }
    if (this.BtnClickedName === 'ConfirmAndSend' && this.IsExpertSelected && event === 'YES') {
      this.IsExpertSelected = false;
      this.ConfirmAndSend();
    }
    this.isClicked = false;
    this.PopUpType = '';
    this.BtnClickedName = '';
  }

  getOutPutParam(event) {
    if (this.PopUpType === 'message-box' && this.IsEndFlow === 1 && this.BtnClickedName === 'ConfirmAndSend') {
      this.OnFinalConfirm();
    }
    if (this.PopUpType === 'app-automation') {
      if (this.ModuleViewTypeCode === 33) {
        if (event.LetterTypeCode === 8) {
          this.SecondRegisterLetterNo = event.SelectedDocument.RegisterLetterNo;
          this.SecondDocumentLetterNo = event.SelectedDocument.DocumentLetterNo;
          this.SecondRegisterLetterDate = event.SelectedDocument.RegisterLetterDate;
        } else if (event.LetterTypeCode === 12) {
          this.FirstRegisterLetterNo = event.SelectedDocument.RegisterLetterNo;
          this.FirstDocumentLetterNo = event.SelectedDocument.DocumentLetterNo;
          this.FirstRegisterLetterDate = event.SelectedDocument.RegisterLetterDate;
        }
      } else {
        this.RegisterLetterNo = event.RegisterLetterNo;
        this.DocumentLetterNo = event.DocumentLetterNo;
        this.RegisterLetterDate = event.RegisterLetterDate;
      }
    }
    if (this.PopUpType === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }
    if (event && this.PopUpType === 'work-flow-send') {
      this.IsEditable = false;
      this.ISSendAndConfirm = true;
      return;
    }
  }

  ConfirmAndSend() {
    this.DoConfirmAndSend();
    //}
  }
  DoConfirmAndSend() {
    // tslint:disable-next-line:no-shadowed-variable
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
                  // const minPostingObject = res.reduce((a, b) => Math.max(a.MinimumPosting, b.MinimumPosting));
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
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
                      OrginalModuleCode: this.OrginalModuleCode,
                      CartableUserID: this.CartableUserID
                    };
                    this.isClicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
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
      this.CartableUserID
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
    let SumEstimateAmount = 0;
    let SumEstimateAmountCoef = 0;
    let RegionCode = -1;
    let CostCenterCode = '';
    if (this.ProductRequestObject) {
      RegionCode = this.ProductRequestObject.RegionCode;
      CostCenterCode = this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode;
    } else {
      RegionCode = this.RegionParams.selectedObject;
      // tslint:disable-next-line: max-line-length
      CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
    }

    if (this.gridApi) {
      this.SumFinalAmount = SumFinalAmount;
      this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    //}
  }

  onChangeCostCenter(ACostCenterID) {
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
    this.CostProductParams.selectedObject = null;

    let RegionCode = -1;
    let CostCenterCode = '';
    RegionCode = this.RegionParams.selectedObject;
    // tslint:disable-next-line: max-line-length
    CostCenterCode = this.CostCenterItems ? this.CostCenterItems.find(x => x.CostCenterId === ACostCenterID).CostCenterCode : '';

    // this.FillGrid(RegionCode, CostCenterCode);

  }

  onSubCostCenterSelectedChange(SubCostCenterID) {
    this.RequestedPersonParams.selectedObject = null;
    this.CostProductParams.selectedObject = null;
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
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          if (this.ChangeDetection) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست انجام معامله تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
          } else if (this.IsExpertSelected) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
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
            this.OrginalModuleCode,
            this.CartableUserID
            , this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید درخواست انجام معامله با موفقیت انجام شد');

              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
              this.IsEditConfirm = true;
            }
            );
        }
      } else {
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
      // this.IsDown = false;
      if (this.ChangeDetection) {
        this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
      } else if (this.IsExpertSelected) {
        this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
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
      // tslint:disable-next-line:no-shadowed-variable
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
                  // const minPostingObject = res.reduce((a, b) => Math.max(a.MinimumPosting, b.MinimumPosting));
                  res.forEach(element => {
                    element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                  });
                  this.PopUpType = 'work-flow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.PercentWidth = undefined;
                  this.OverMainMinwidthPixel = undefined;
                  this.MainMaxwidthPixel = undefined;
                  this.HeightPercentWithMaxBtn = undefined;
                  this.MinHeightPixel = undefined;
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
                    MinimumPosting: this.MinimumPosting,
                    ObjectID: this.ObjectID,
                    OrginalModuleCode: this.OrginalModuleCode,
                    CartableUserID: this.CartableUserID
                  };
                  this.isClicked = true;
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
                }
              }
            );
        } else {
          this.IsDown = true;
          this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  DOConfirm(HasAlert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
      }
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID
        , this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn('تایید درخواست  انجام معامله  با موفقیت انجام شد');
          }
          this.RefreshCartable.RefreshCartable();
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
          this.IsEditable = false;
          this.IsEditConfirm = false;
          resolve(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID
        , this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
          }
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';
          this.IsEditable = false;
          this.IsEditConfirm = true;
          // if (this.ConfirmStatus.includes(21)) {
          //   this.ReadyToConfirm = 0;
          //   this.btnConfirmName = 'تایید';
          //   this.btnConfirmIcon = 'ok';
          // } else {
          //    this.HaveConfirm = false;
          // }

          resolve(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  DOFinalConfirm() {
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
      this.CartableUserID
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          messageStr = 'بازگشت از تایید نهایی درخواست انجام معامله با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی درخواست انجام معامله با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
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
      this.RegionParams.selectedObject
    );
  }

  FetchMoreCustomerOrder(event) {
    this.CustomerOrderParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
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
  onWFSave() {
  }
  onAutomationClick() {
    if (!isUndefined(this.RegionParams.selectedObject) && this.CostFactorID) {
      let LetterTypeCodeList = [];
      this.isClicked = true;
      this.PopUpType = 'app-automation';
      this.HaveHeader = true;
      this.startLeftPosition = 110;
      this.startTopPosition = 5;
      this.MinHeightPixel = 300;
      this.PopupParam = {
        CostFactorID: this.CostFactorID,
        RegionCode: this.currentRegionObject.RegionCode,
        LetterTypeCodeList: this.LetterTypeCodeList,
        OrganizationCode: this.currentRegionObject.OrganizationCode,
        AutoClose: true,
        SaveMode: true,
        OrginalModuleCode: this.OrginalModuleCode,
      };
    }
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
      if (x.ProductName && x.ProductTypeName) {
        const object = {
          ProductCode: x.ProductName,
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
          const ExcelObj = data.filter(x => x.ProductName === element.ProductCode.toString())[0];
          const newItem = {
            ItemNo: MaxProp,
            ScaleName: element.ScaleName,
            ProductName: element.ProductName,
            ProductTypeName: element.ProductTypeName,
            ProductID: element.ProductID,
            QTY: ExcelObj && ExcelObj.QTY ? ExcelObj.QTY : '',
            Subject: ExcelObj && ExcelObj.Subject ? ExcelObj.Subject : '',
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
            ProductName: element.ProductName,
            ProductID: element.ProductID,
            ScaleName: element.ScaleName,
            ShortStartDate: element.ShortStartDate,
            ShortEndDate: element.ShortEndDate,
            QTY: parseFloat(element.QTY),
            Subject: element.Subject,
          };
          itemsToUpdate.push(newItem);
        });
        this.gridApi.updateRowData({ add: itemsToUpdate });
      }
    }
    );
  }
  OnOpenNgSelect(type, IsFill = true, FillResolve = null) {
    switch (type) {
      case 'Region':
        // tslint:disable-next-line: max-line-length
        this.RegionList.GetRegionList(this.ModuleCode, !this.CheckRegionWritable).subscribe(res => {
          this.RegionItems = res;
          if (IsFill) {
            this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
            this.OnOpenNgSelect('FilterRegion');
            this.OnOpenNgSelect('CustomerOrder');
            this.RefreshPageByRegion(this.RegionParams.selectedObject);
          }
        });
        break;
      case 'VWExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
          this.VWExeUnitItems = res;
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'RequestedPerson':
        if (this.CostCenterParams.selectedObject) {
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterPriPerson(this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject, this.ProductRequestObject && this.ProductRequestObject.ActorID ? this.ProductRequestObject.ActorID : null, null).subscribe(res => {
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
          && this.ProductRequestObject.CustomerOrderID ? this.ProductRequestObject.CustomerOrderID :
          this.InputParam.CustomerOrderID ? this.InputParam.CustomerOrderID : null;
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

          if (IsFill && CurrentCustomerOrderID) {
            this.CustomerOrderParams.selectedObject = CurrentCustomerOrderID;
          }

          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        this.CustomerOrderParams.loading = false;
        break;
      case 'CostCenter':
        if (this.OnFilterRegionParams.selectedObject !== null) {
          const CurrCostCenterID = this.ProductRequestObject &&
            this.ProductRequestObject.SubCostCenterObject &&
            this.ProductRequestObject.SubCostCenterObject.CostCenterId ?
            this.ProductRequestObject.SubCostCenterObject.CostCenterId : null;
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetCostCenterByRegionAndRequestOwner(
            this.OnFilterRegionParams.selectedObject,
            CurrCostCenterID,
            null,
            false
          ).subscribe(res => {
            this.CostCenterItems = res;
            if (IsFill &&
              this.ProductRequestObject &&
              this.ProductRequestObject.SubCostCenterObject &&
              this.ProductRequestObject.SubCostCenterObject.CostCenterId) {
              this.CostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.CostCenterId;
              this.OnOpenNgSelect('SubCostCenter');
            } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.CostCenterID) {
              this.CostCenterParams.selectedObject = this.CurrentUserSubCostCenter.CostCenterID;
              this.OnOpenNgSelect('SubCostCenter');
            }
            if (IsFill && FillResolve) {
              FillResolve();
            }
          });
        } else {
          this.ShowMessageBoxWithOkBtn('ابتدا واحد تحویل گیرنده را مشخص نمایید');
          return;
        }
        break;
      case 'SubCostCenter':
        this.ProductRequest.GetListByCostCenterId(
          this.CostCenterParams.selectedObject,
          null,
          true,
          this.OnFilterRegionParams.selectedObject
        ).subscribe(res => {
          this.SubCostCenterItems = res;
          if (IsFill &&
            this.ProductRequestObject &&
            this.ProductRequestObject.SubCostCenterObject &&
            this.ProductRequestObject.SubCostCenterObject.SubCostCenterId) {
            this.SubCostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.SubCostCenterId;
          } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.SubCostCenterID) {
            this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
          }
          if (IsFill && this.RequestPersonObject && this.RequestPersonObject.SubCostCenterID) {
            this.SubCostCenterParams.selectedObject = this.RequestPersonObject.SubCostCenterID;
          } else {
            this.OnOpenNgSelect('RequestedPerson');
          }
        });
        break;
      case 'FilterRegion':
        this.ProductRequest.GetOnfilterRegionByRegionCode(
          this.RegionParams.selectedObject,
          this.INVVoucherGroupParams.selectedObject
        ).subscribe(res => {
          this.OnFilterRegionItems = res;
          if (IsFill) {
            this.OnFilterRegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.OnFilterRegionItems[0].RegionCode;
            this.OnOpenNgSelect('CostCenter');
          }
        });
        break;
      case 'INVVoucherGroup':
        if (this.RegionParams.selectedObject == null) {
          this.ShowMessageBoxWithOkBtn('ابتدا واحد اجرایی را وارد کنید');
          return;
        }
        this.ProductRequest.GetInvVoucherGroupList(
          this.RegionParams.selectedObject,
          this.CostProductParams.selectedObject
        ).subscribe(res => {
          this.INVVoucherGroupItems = res;
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'CostProduct':
        this.CostProductParams.loading = true;
        const CurrentCostProductID = this.ProductRequestObject
          && this.ProductRequestObject.CostProductID ? this.ProductRequestObject.CostProductID : null;

        const Promised = new Promise((resolve_res3, reject_res3) => {
          this.ProductRequest.GetCostProductBySubCostCenter(
            this.SubCostCenterParams.selectedObject,
            this.RegionParams.selectedObject,
            1,
            30,
            '',
            '',
            false,
            CurrentCostProductID).subscribe((res: any) => {
              this.CostProductItems = res.List;
              resolve_res3(res.TotalItemCount);
            });
        }).then((TotalItemCount: number) => {
          this.RefreshCostProductItems.RefreshItemsVirtualNgSelect({
            List: this.CostProductItems,
            term: '',
            TotalItemCount: TotalItemCount,
            PageCount: Math.ceil(TotalItemCount / 30),
            type: 'cost-product',
          });
          if (IsFill) {
            this.CostProductParams.selectedObject = this.ProductRequestObject.CostProductID;
          }
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        this.CostProductParams.loading = false;
        break;
      case 'Warehouse':
        this.ProductRequest.GetValidWarehouseByRegion(this.RegionParams.selectedObject).subscribe(res => {
          this.WarehouseItems = res;
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'Contractor':
        // tslint:disable-next-line: max-line-length
        this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false, this.NgSelectContractorParams.selectedObject).subscribe(res => {
          this.ContractorItems = res.List;
          this.ContractorTotalItemCount = res.TotalItemCount;
          this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        });
        if (IsFill && FillResolve) {
          FillResolve();
        }
        break;
      case 'Contract':
        {
          this.ContractParams.loading = true;
          const ResultList = [];
          this.ContractList.GetRelatedContractpagingForExtended(1, 30, '', '', this.RegionParams.selectedObject,
            this.IsCost, true, null, false)
            .subscribe((res: any) => {
              this.ContractItems = res.List;
              this.ContractTotalItemCount = res.TotalItemCount;
              this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
              this.ContractParams.loading = false;
              if (IsFill && FillResolve) {
                FillResolve();
              }
            });
        }
        break;
      default:
        break;
    }
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
  onCellValueChanged(event) {
    this.IsEntryPercentageOfChanges = false;
  }
  onChangeExpert(event) {
    if (this.btnConfirmName !== 'عدم تایید') { }
    this.IsExpertSelected = true;
  }
  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.ContractorItems = [];
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

    this.Actor.GetActorPaging(1, 30, '', 'IdentityNo', this.ContractorType, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }
  onProvisionClick(Str) {
    if (Str === 'Suggestion') {
      this.gridApi.forEachNode(node => {
        if (!node.data.ProductRequestItemID
          || node.data.ProductRequestItemID <= 0) {
          this.ShowMessageBoxWithOkBtn('با توجه به تغییر اقلام درخواست قرارداد اصلی، ابتدا نسبت به ثبت درخواست اقدام کنید.');
          return;
        } else {
          if (this.ModuleViewTypeCode === 6) {
            this.HeightPercentWithMaxBtn = 50;
            this.MinHeightPixel = 323;
          } else {
            this.HeightPercentWithMaxBtn = 97;
            this.MinHeightPixel = 645;
          }
          this.PopUpType = 'product-request-provision';
          this.HaveHeader = true;
          this.isClicked = true;
          this.startLeftPosition = 34;
          this.startTopPosition = 5;
          this.HaveMaxBtn = true;
          this.PercentWidth = 95;
          this.MainMaxwidthPixel = 2000;
          this.PopupParam = {
            ProductRequestObject: this.ProductRequestObject,
            Subject: this.Subject,
            RegionCode: this.RegionParams.selectedObject,
            ProductRequestCode: this.ProductRequestNo,
            ProductRequestDate: this.ProductRequestDate,
            ModuleCode: this.ModuleCode,
            ModuleViewTypeCode: this.ModuleViewTypeCode,
            IsRequestProvision: this.IsRequestProvision,
            IsEditable: this.IsEditConfirm,
            OrginalModuleCode: this.OrginalModuleCode,
          };
        }
      });
    }
    if (Str === 'Show') {
      this.gridApi.forEachNode(node => { // RFC 53404
        if (!node.data.ProductRequestItemID
          || node.data.ProductRequestItemID <= 0) {
          this.ShowMessageBoxWithOkBtn('با توجه به تغییر اقلام درخواست قرارداد اصلی، ابتدا نسبت به ثبت درخواست اقدام کنید.');
          return;
        } else {
          this.PopUpType = 'app-provision';
          this.HaveHeader = true;
          this.isClicked = true;
          this.startLeftPosition = 78;
          this.startTopPosition = 5;
          this.HaveMaxBtn = true;
          this.HeightPercentWithMaxBtn = 97;
          this.PercentWidth = 90;
          this.MainMaxwidthPixel = 2000;
          this.MinHeightPixel = 645;
          this.PopupParam = {
            ProductRequestObject: this.ProductRequestObject,
            Subject: this.Subject,
            RegionCode: this.RegionParams.selectedObject,
            ProductRequestCode: this.ProductRequestNo,
            ProductRequestDate: this.ProductRequestDate,
          };
        }
      });
    }
  }
  ShowRequestDetailsDialog() {
    this.PopUpType = 'product-request-show-details-page';
    this.isClicked = true;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.HaveHeader = true;
    this.startLeftPosition = 65;
    this.MinHeightPixel = 652;
    this.startTopPosition = 10;
    this.OverMainMinwidthPixel = null;
    this.HaveMaxBtn = true;
    this.PopupParam = {
      HeaderName: 'اطلاعات تکمیلی',
      ProductRequestObject: this.ProductRequestObject,
      SumFinalAmount: this.SumFinalAmountStr,
      DealTypeCode: this.ProductRequestObject.DealTypeCode,
      DealTypeName: this.ProductRequestObject.DealTypeName,
      IsCost: this.IsCost,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      IsRequestProvision: this.IsRequestProvision,
      CurrentRegionObject: this.currentRegionObject,
      ModuleCode: this.ModuleCode,
      OrginalModuleCode: this.OrginalModuleCode
    };
  }
  onChangeContract(event) {
    if (event) {
      this.ContractList.GetByContractID(event).subscribe(res => {
        this.ContractWorkOrderItems = res;
      });
    }
    else {

    }
  }
  FetchMoreContract(event) {
    this.ContractParams.loading = true;
    const ResultList = [];
    this.ContractList.GetRelatedContractpagingForExtended(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.RegionParams.selectedObject, this.IsCost, true, null, this.ModuleCode === 2773).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractItems = ResultList;
        this.ContractParams.loading = false;
      });
  }
  doContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.ContractParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'LetterNo';
    }
    this.ContractList.GetRelatedContractpagingForExtended(event.PageNumber, 30, event.term,
      event.SearchOption, this.RegionParams.selectedObject, this.IsCost, true, null, this.ModuleCode === 2773).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractItems = res.List;
          this.ContractTotalItemCount = res.TotalItemCount;
          this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.ContractParams.loading = false;
        }
      });
  }
  INVVoucherGroupChange(event) {
    forkJoin([
      this.ProductRequest.GetInvVoucherGroupByID(event),
      this.ProductRequest.CheckRequestOwner(this.RegionParams.selectedObject),
      this.ProductRequest.CheckRegionRequestByCurrentUser()
    ]).subscribe(res => {
      if (res[0]) {
        if (res[0].UsedInDraft === true && res[0].UsedInReceipt === false) {
          this.IncrementTypeParams.selectedObject = 1;
          this.IncrementTypeDisable = true;
        } else if (res[0].UsedInReceipt === true && res[0].UsedInDraft === false) {
          this.IncrementTypeParams.selectedObject = 2;
          this.IncrementTypeDisable = true;
        } else {
          this.IncrementTypeParams.selectedObject = null;
          this.IncrementTypeDisable = false;
        }
      }
      if (res[1]) {
        if (event === 4) {
          this.DisableRequestedPerson = false;
          this.DisableCostCenter = false;
        } else {
          if (res[2]) {
            this.DisableRequestedPerson = true;
            this.DisableCostCenter = true;
            this.DisableFilterRegion = true;
          }
        }
      } else {
        this.DisableRequestedPerson = false;
        this.DisableCostCenter = false;
      }
    });




    if (event === 6 || event === 14 || event === 19) {
      this.DisableContractor = false;
    } else {
      this.DisableContractor = true;
    }
    if (event === 9 || event === 17) {
      this.DisableWarehouse = false;
    } else {
      this.DisableWarehouse = true;
      this.WarehouseParams.selectedObject = null;
    }
    if (event === 4) {
      this.DisableFilterRegion = false;
    } else {
      this.DisableFilterRegion = true;
    }
    if (event === 10 || event === 16 || event === 19 || event === 20) {
      this.DisableCustomerOrder = false;
    } else {
      this.DisableCustomerOrder = true;
    }
    if (event == null) {
      this.DisableContractor = true;
      this.DisableWarehouse = true;
    }

  }
}
