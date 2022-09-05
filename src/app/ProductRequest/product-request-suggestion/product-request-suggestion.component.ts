import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { OverPopUpCellEditorComponent } from 'src/app/Shared/OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { TreeSelectComponent } from 'src/app/Shared/tree-select/tree-select.component';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { isUndefined } from 'util';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';


declare var $: any;

@Component({
  selector: 'app-product-request-suggestion',
  templateUrl: './product-request-suggestion.component.html',
  styleUrls: ['./product-request-suggestion.component.css']
})
export class ProductRequestSuggestionComponent implements OnInit {
  @Output() ProductRequestSuggestionClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupParam;
  // IsTransferedContract = false;
  IsRelatedContract = false;
  IsContractContent = false;
  ContractContentNote;
  TabRahbari = false;
  LastInquiryObject: any;
  HaveRevocation;
  ReNewQuestion;
  ContractContent = true;
  WfWinnerHeight = 166;
  ExpertParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  ExpertItems;
  HasMaterialsDifference: boolean;
  HaveExpertPerson = false;
  HasWarrantyItem = false;
  tabpanelHeight = 87;
  EditableColumns = false;
  gridHeight = 49;
  btnProposalName = 'تعیین برنده';
  QuestionLabel;
  WfDetailsShow = false;
  WfDetailsShowHeight = 60;
  HaveInquiry;
  HaveCompleteInfo = false;
  WfSaveDetailsShow = false;
  // WinnerQuestion;
  WinnerQuestion = null;
  HaveMultiContract: boolean;
  IsWFDisable = false;
  IsYes = true;
  IsLawful;
  HasReturnItem = false;
  IsRenewal = false;
  Renewal;
  supplierGridHeight = 100;
  CheckRegionWritable;
  ItemDisable = false;
  ConsultantSelectTypeLable = 'نوع انتخاب مشاور';
  ConsultantSelectWayLable = 'روش انتخاب مشاور';
  // DisableConsultantSelectWayLable = true;
  ChangeDetection = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  MinHeightPixel = null;
  DurationDay;
  Article31subject;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  DurationMonth;
  priceListIDsFinals;
  DurationYear;
  LetterTypeCode = 15;
  LetterPopupParam: {};
  RLPopupParam: {};
  HaveHeader;
  GeneralTermHeight = 62;
  isClicked = false;
  SelectedDocument: any;
  CostFactorLetter: any;
  IsGeneralTerm = false;
  CheckBoxStatus = true;
  IsNotNew = false;
  SelectedPersonTypeCode: number;
  IsEditable = false;
  IsSupplierFinalEditable = false;
  ContractTypeItems;
  CoefLevelCode;
  ContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus,
    Required: true
  };
  CostFactorID;
  DealMethodItems;
  // DealMethodSelectedCode;
  DealMethodParams = {
    bindLabelProp: 'DealMethodName',
    bindValueProp: 'DealMethodCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus,
    Required: true
  };
  SelectedPRType = -1;
  PRTypeItems;
  PRTypeParams = {
    bindLabelProp: 'ProductRequestTypeName',
    bindValueProp: 'ProductRequestTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus,
    Required: true
  };
  IsArticle31Selected = false;
  Article31Items;
  Article31Params = {
    bindLabelProp: 'Article31Name',
    bindValueProp: 'Article31ID',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    MinWidth: '155px',
    IsDisabled: !this.IsArticle31Selected,
    Required: this.IsArticle31Selected
  };
  PriceListTopicItems;
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicCode',
    MinWidth: '20px',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus
  };
  PriceListTypeItems;
  PriceListTypeParams = {
    bindLabelProp: 'PriceListTypeName',
    bindValueProp: 'PriceListTypeCode',
    MinWidth: '20px',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus
  };
  SeasonListItems: any;
  SeasonListParams = {
    bindLabelProp: 'SeasonName',
    bindValueProp: 'SeasonCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  BusinessPatternParams =
    {
      bindLable: 'BusinessPatternName',
      bindValue: 'BusinessPatternID',
      ObjectID: 'BusinessPatternID',
      ParentObjectID: 'ParentBusinessPatternID',
      SelectedValue: null,
      Disabled: false,
      AllowParentSelection: true,
      TextSpanWidth: 150,

    };
  RequestSupplierColDef;
  BeneficiaryColDef;
  ProdReqRelColDef;
  ProdReqPersonColDef;
  ProdReqRelList = [];
  ProdReqItemrowData;
  ProdReqEstList = [];
  ProdReqPersonrowData = [];
  ProdReqItemColDef;
  ExcelColDef = [];
  ProdReqEstColDef = [];
  TempProdReqEstColDef = [];
  RequestSupplierList = [];
  ProductRequestObject;
  PopUpType;
  startLeftPosition;
  startTopPosition;
  NgSelectVSParams = {
    bindLabelProp: 'ActorIdentityName',
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
    DropDownMinWidth: '300px',
    type: 'supplier',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectVCParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'ContractId',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    DropDownMinWidth: '300px',
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
  RequestSupplierApi;
  SumFinalAmount;
  SumAmount;
  DealTypeCode;
  DealTypeName;
  SupplierGridHeight = 85;
  ProdReqItemColHeight = 65;
  ProdColHeight = 85;
  SumFinalItemAmountCOEF = '0';
  ProdReqItemHeight = 85;
  ProdReqEstApi;
  ProdReqRelApi;
  PriceListPatternID;
  selectedEstimateRow;
  BtnClickedName;
  IsNotFound = false;
  selectedPRItemRow;
  IsEstimateEditable = false;
  beforeID;
  BeforePersonID;
  ProdReqItemApi;
  WeightProdReqItemColDef;
  IsShowTwoGrid = true;
  GWidth = 200;
  GMaxWidth = 1000;
  btnclicked: boolean;
  startToptPosition: number;
  selectedItemRow;
  IsPersonEditable = false;
  ProdReqPersonApi;
  PRItemApi;
  BeneficiaryApi;
  HaveMaxBtn;
  SelectedProductRequestItemID: any;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  IsDisable = false;
  SpecialIsEditable;
  IsRadioEditable;
  IsCost: any;
  PersonTypeList: any;
  CheckValidate = false;
  IsNewCheckValidate = false;
  WorkStartDate;
  StartType = 1;
  ProductName;
  ProductCode;
  SelectedProductID;
  Amount;
  AmountType = false;
  IsSupplierEditable = false;
  HasSupplierSave = false;
  RequiredComponents = [this.DealMethodParams, this.Article31Params, this.ContractTypeParams];
  ModuleCode;
  CostCenterCode: any;
  IsDisplay = false;
  DisableJobCategory = false;
  IsDevelopment = false;
  SumFinalEstimateAmount = '0';
  HaveEstimate = false;
  ActorControl;
  ProductRequestItemList = [];
  IsBalancing;
  SumFinalItemAmount = '0';
  IsMVtype88 = true;
  ShowBusDrivingArchive = false;
  DealMethodChanged = false;

  HalWayThrough;
  HalfWayBack;
  RateperKilometerEstimate;
  TicketRates;
  AverageNumberTransactions;
  NumberPassengersMonthly;
  TotalMonthlyPassenger;
  IsValidationNewCar;
  PercentageGoodWork;
  DoublePercentageValidated;
  InsurancePercentage;
  PercentageOfDeduction;
  VATPercentage;
  MaximumViolationPercentage;
  BusNumber;
  CalculationMethodItems;
  CalculationMethodParams = {
    bindLabelProp: 'CalculationMethodName',
    bindValueProp: 'CalculationMethodCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  LineOperatorItems;
  LineOperatorParams = {
    bindLabelProp: 'CorporateName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    DropDownMinWidth: '330px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    type: 'Line-Operator',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'CorporateCode', width: 30, MinTermLenght: 1, SearchOption: 'CorporateCode' },
        { HeaderCaption: 'شناسه ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 1, SearchOption: 'IdentityNo' }, // RFC 51361
        { HeaderCaption: 'نام', HeaderName: 'CorporateName', width: 53, MinTermLenght: 3, SearchOption: 'CorporateName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 30, },
        { HeaderCaption: 'شناسه ملي', width: 35, }, // RFC 51361
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ISErrorBilldingSetting = false;
  IsMaterialsDifference;
  HaveEstimateTab = true;
  HaveAdviceTab: boolean;

  NgSelectBeneficiaryParams = {
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
    DropDownMinWidth: '300px',
    type: 'Beneficiary',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه ملي', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام شرکت', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه ملي', width: 35, },
        { HeaderCaption: 'نام شرکت', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  BeneficiaryList = [];
  HasBeneficiary = false;
  DisabledWorkStartDate = false;
  IsBaselineScrolling = false;
  IsBuyService = false;
  IsShowType95 = false;
  IsCostCenter10 = false;
  IsLeavingFormality: boolean;
  ProdReqItemrowData2;
  IsRelatedCorporate = false;
  EstimateTabHeight = 100;
  ContractTypeList = [{ ContractTypeCode: 1, ContractTypeName: 'هزينه اي' },
  { ContractTypeCode: 0, ContractTypeName: 'درآمدي' },];
  ContractType;
  IsType114AndNotLeavingFormality = false;
  IsConsultant = false;
  ConsultantSelectTypeItems = [];
  ConsultantSelectTypeParams = {
    bindLabelProp: 'ConsultantSelectTypeName',
    bindValueProp: 'ConsultantSelectTypeCode',
    placeholder: '',
    MinWidth: '92px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  ConsultantSelectWayItems = [];
  ConsultantSelectedWayParams = {
    bindLabelProp: 'ConsultantSelectWayName',
    bindValueProp: 'ConsultantSelectWayCode',
    placeholder: '',
    MinWidth: '92px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  PriceListTopicRasteParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus,
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
    IsDisabled: !this.CheckBoxStatus,
    Required: false
  };
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
  HaveMaterials;
  IsException = false;
  ModuleViewTypeCode: number;
  OrginalModuleCode: any;
  IsAllowed = false; // مجوز ثبت مدت روز 3 رقمی
  SumFinalEstimateFAmount = '0';
  SumFinalEstimateSAmount = '0';
  SumFinalEstimateMAmount = '0';
  IsReturn = false;
  CalcFunction;
  ArchiveParam;
  IsRelated;
  FinYearItems;

  IndexPriceListPatternItems;
  IndexPriceListPatternParams = {
    bindLabelProp: 'IndexPriceListTopicName',
    bindValueProp: 'IndexPriceListPatternID',
    MinWidth: '80px',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'index-price'
  };
  ReviewMethodParams = {
    bindLabelProp: 'ReviewMethodName',
    bindValueProp: 'ReviewMethodCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  ReviewMethodItems = [];
  DisplayReviewMethod = false;
  ShowLetterBtn = false;
  BoardDecisionsDec = '';
  HasPRIEntity = false;
  IsForcePriceList = false;
  HasTripleReport = false;
  ISSign = false;
  RelFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false,
    type: 'rel-fin-year',
  };
  SupplierTabName = 'طرف قرارداد';
  Disable = false;

  constructor(private ProductRequest: ProductRequestService,
    private ContractList: ContractListService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private PriceList: PriceListService,
    private route: ActivatedRoute,
    private Automation: AutomationService,
    private RefreshCartable: RefreshServices,
    private contractpaydetail: ContractPayDetailsService,
    private User: UserSettingsService,
    private CommonService: CommonServices,
    private FinYear: FinYearService,
    private ArchiveList: ArchiveDetailService,) {
    this.PersonTypeList = [{ PersonTypeName: 'حقيقي', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقي', PersonTypeCode: 2 }];
    this.CalculationMethodItems =
      [
        { CalculationMethodName: 'روش A پيمايشي', CalculationMethodCode: 1 },
        { CalculationMethodName: 'روش AA پيمايشي', CalculationMethodCode: 2 },
        { CalculationMethodName: 'روش AAA پيمايشي', CalculationMethodCode: 3 },
        { CalculationMethodName: 'روش B پيمايشي مبنا', CalculationMethodCode: 4 }
      ];
    this.SeasonListItems =
      [
        { SeasonCode: 1, SeasonName: 'فصل اول' },
        { SeasonCode: 2, SeasonName: 'فصل دوم' },
        { SeasonCode: 3, SeasonName: 'فصل سوم' },
        { SeasonCode: 4, SeasonName: 'فصل جهارم' },
      ];
    this.RankItems =
      [
        { GradeID: 1 },
        { GradeID: 2 },
        { GradeID: 3 },
        { GradeID: 4 },
        { GradeID: 5 },
      ];
    this.ReviewMethodItems =
      [
        { ReviewMethodCode: 1, ReviewMethodName: 'تک مرحله ای' },
        { ReviewMethodCode: 2, ReviewMethodName: 'دو مرحله ای' }
      ];
    this.ProdReqRelColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نوع ارتباط  ',
        field: 'ContractRelationTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetContractRelationTypeList(),
          bindLabelProp: 'ContractRelationTypeName',
          bindValueProp: 'ContractRelationTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ContractRelationTypeName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.RelFinYearParams,
          Items: this.FinYearItems
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.FinYearCode;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.FinYearCode) {
            params.data.FinYearCode = params.newValue.FinYearCode;
            params.data.ContractId = null;
            params.data.Subject = '';
            params.data.Contract = '';
            params.data.ContractAmountStr = '';
            params.data.ContractorFullName = '';
            params.data.LetterNo = '';
            params.data.ContractCode = '';
            params.data.PersianFromContractDateString = '';
            params.data.Note = '';
            return true;
          } else {
            params.data.FinYearCode = null;
            params.data.ContractId = null;
            params.data.Subject = '';
            params.data.Contract = '';
            params.data.ContractAmountStr = '';
            params.data.ContractorFullName = '';
            params.data.LetterNo = '';
            params.data.ContractCode = '';
            params.data.PersianFromContractDateString = '';
            params.data.Note = '';
            return false;
          }
        },
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'موضوع قرارداد ',
        field: 'Subject',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVCParams,
          Items: [],
          MoreFunc: this.FetchMoreContract,
          FetchByTerm: this.FetchContractByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.Subject;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.Subject) {
            params.data.FinYearCode = params.data.FinYearCode === null || isUndefined(params.data.FinYearCode) ?
              params.newValue.FinYearCode : params.newValue.FinYearCode;
            params.data.RelatedContractID = params.newValue.ContractId;
            params.data.Subject = params.newValue.Subject;
            params.data.ContractAmountStr = params.newValue.ContractAmountStr;
            params.data.ContractorFullName = params.newValue.ContractorFullName;
            params.data.LetterNo = params.newValue.LetterNo;
            params.data.ContractCode = params.newValue.ContractCode;
            params.data.PersianFromContractDateString = params.newValue.PersianFromContractDateString;
            params.data.Note = '';
            params.data.ContractTypeCode = params.newValue.ContractTypeCode;
            params.data.IsMuncipalityRegionContractor = params.newValue.IsMuncipalityRegionContractor;
            params.data.ProxyContractorRegionCode = params.newValue.ProxyContractorRegionCode;
            params.data.ContractIsCost = params.newValue.ContractIsCost;
            return true;
          } else {
            params.data.RelatedContractID = null;
            params.data.Subject = '';
            params.data.FinYearCode = null;
            params.data.ContractAmountStr = '';
            params.data.ContractorFullName = '';
            params.data.LetterNo = '';
            params.data.ContractCode = '';
            params.data.PersianFromContractDateString = '';
            params.data.Note = '';
            params.data.ContractTypeCode = null;
            return false;
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'شماره قراداد',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'کد قراداد',
        field: 'ContractCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorFullName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmountStr',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'PersianFromContractDateString',
        width: 150,
        resizable: true
      },
      {
        headerName: 'توضيحات',
        field: 'Note',
        editable: true,
        width: 300,
        resizable: true
      },
    ];
    this.ProdReqItemColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductName',
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'ScaleName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاريخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تاريخ پايان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
      },
      // { RFC = 49855
      //   headerName: 'تعداد',
      //   field: 'QTY',
      //   editable: true,
      //   HaveThousand: true,
      //   width: 90,
      //   resizable: true
      // },
      // {
      //   headerName: 'مبلغ واحد',
      //   field: 'ProductReuestItemAmount',
      //   editable: true,
      //   HaveThousand: true,
      //   width: 120,
      //   resizable: true,
      // },
      // {
      //   headerName: 'مبلغ',
      //   field: 'FinalAmount',
      //   HaveThousand: true,
      //   width: 120,
      //   resizable: true
      // },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: true,
        width: 450,
        resizable: true
      },
      {
        headerName: 'مبلغ متره',
        field: 'VWAmount',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ متره با ضرايب رديف',
        field: 'AmountCOEF',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ کل',
        field: 'AmountCOEFPact',
        HaveThousand: true,
        width: 150,
        resizable: true
      }
    ];
    this.ProdReqEstColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'رديف فهرست بها',
        field: 'PriceListNo',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از فهرست بها',
        cellEditorParams: {
          SearchPopupType: 'editor-select-price-list',
          PopupParam: { CostListFinYearCode: this.PriceListTopicParams.selectedObject, PriceListPatternID: this.PriceListPatternID }
        },
        cellRenderer: 'SeRender',
        valueFormatter: (params) => {
          if (params.value) {
            return params.value[0].PriceListTopicCode;
          } else {
            return '';
          }
        },
        editable: true,
        width: 170,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'رشته',
        field: 'IndexPriceListTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.IndexPriceListPatternParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.IndexPriceListTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.IndexPriceListTopicName) {
            params.data.IndexPriceListTopicName = params.newValue.IndexPriceListTopicName;
            params.data.IndexPriceListPatternID = params.newValue.IndexPriceListPatternID;
            return true;
          } else {
            params.data.IndexPriceListTopicName = '';
            params.data.IndexPriceListPatternID = null;
            return false;
          }
        },
        width: 120,
        resizable: true,
        editable: true,
        hide: true,
      },
      {
        headerName: 'نوع رديف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'WorkUnitName',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        HaveThousand: true,
        width: 80,
        resizable: true,
        editable: (params) => {
          return (params.data.IsStarCode === 1 || params.data.IsStarCode === 3 ||
            // tslint:disable-next-line: max-line-length
            (!isUndefined(params.data.IsStarCode) && params.data.IsStarCode != null && params.data.IsStarCode === 0 && (params.data.IsStar === 'ف*' || params.data.IsStar === '*ف')));
        }
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: true,
        // cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
          HaveThousand: true
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: false,
        // cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
          HaveThousand: true
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ با احتساب ضریب ردیف',
        field: 'FinalAmountCoef',
        HaveThousand: true,
        width: 170,
        resizable: true,
        valueParser: numberValueParser
      },
      {
        headerName: 'ضریب ردیف',
        field: 'Coef',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: false,
        valueParser: numberValueParser
      },
    ];
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }

    //  this.ProdReqEstColDef = this.TempProdReqEstColDef;

    this.ProdReqPersonColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' کسب وکار ',
        field: 'BusinessPatternName',
        editable: true,
        width: 300,
        resizable: true,
        cellEditorFramework: TreeSelectComponent,
        cellEditorParams: {
          Params: this.BusinessPatternParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BusinessPatternName;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'سال تحصيل',
        field: 'EducationYear',
        width: 250,
        editable: true,
        resizable: true
      },
      {
        headerName: 'سال تجربه',
        field: 'ExperienceYear',
        width: 100,
        editable: true,
        resizable: true
      },
      {
        headerName: 'حقوق ماهانه',
        field: 'Amount',
        width: 150,
        editable: true,
        resizable: true
      },
      {
        headerName: 'ضريب سرپرستي',
        field: 'ManagementCOEF',
        width: 100,
        editable: true,
        resizable: true
      },
      {
        headerName: 'ضريب فارغ التحصيل ممتاز',
        field: 'TopGraduated',
        width: 160,
        editable: true,
        resizable: true
      },
      {
        headerName: 'مدت (ماه)',
        field: 'Qty',
        width: 90,
        editable: true,
        resizable: true
      },
      {
        headerName: 'حاصلضرب ضرايب',
        field: 'MultiplyTheCoefficients',
        width: 150,
        editable: false,
        resizable: true
      },
      {
        headerName: 'حق الزحمه کل',
        field: 'S',
        width: 200,
        HaveThousand: true,
        editable: false,
        resizable: true
      }
    ];
    // this.WeightProdReqItemColDef = [
    //   {
    //     headerName: 'رديف',
    //     field: 'ItemNo',
    //     width: 70,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'کالا/خدمت',
    //     field: 'ProductName',
    //     editable: true,
    //     width: 300,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'واحد',
    //     field: 'ScaleName',
    //     width: 120,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'تاريخ شروع',
    //     field: 'PersianStartDate',
    //     width: 100,
    //     resizable: true,
    //   },
    //   {
    //     headerName: 'تاريخ پايان',
    //     field: 'PersianEndDate',
    //     width: 100,
    //     resizable: true,
    //   },
    //   {
    //     headerName: 'تعداد',
    //     field: 'QTY',
    //     editable: true,
    //     HaveThousand: true,
    //     width: 90,
    //     resizable: true
    //   },

    //   {
    //     headerName: 'مبلغ',
    //     field: 'FinalAmount',
    //     HaveThousand: true,
    //     width: 120,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'موضوع',
    //     field: 'Subject',
    //     editable: true,
    //     width: 450,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'مبلغ متره',
    //     field: 'Amount',
    //     width: 150,
    //     HaveThousand: true,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'مبلغ متره با ضرايب رديف',
    //     field: 'AmountCOEF',
    //     HaveThousand: true,
    //     width: 150,
    //     resizable: true
    //   },
    //   {
    //     headerName: 'مبلغ کل',
    //     field: 'AmountCOEFPact',
    //     HaveThousand: true,
    //     width: 150,
    //     resizable: true
    //   }
    // ];
    this.BeneficiaryColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectBeneficiaryParams,
          Items: [],
          MoreFunc: this.FetchMoreBeneficiaryPerson,
          FetchByTerm: this.FetchBeneficiaryPersonByTerm,
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
        editable: true,
        width: 300,
        resizable: true
      },
    ];
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    if (!this.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }
    this.SupplierTabName = this.PopupParam.IsAgreement ? 'طرف توافق نامه' : 'طرف قرارداد';
    this.Disable = this.PopupParam.IsAgreement ? true : false; // 65775
    if (this.PopupParam.ModuleViewTypeCode) {
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    }
    if (this.PopupParam.OrginalModuleCode) {
      this.OrginalModuleCode = this.PopupParam.OrginalModuleCode;
    }
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CheckRegionWritable = this.PopupParam.CheckRegionWritable;
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    // if (this.PopupParam && this.PopupParam.IsTransferedContract) {
    //   this.IsTransferedContract = this.PopupParam.IsTransferedContract;
    // }
    //  this.ProdReqItemrowData = this.ProductRequestObject.ProductRequestItemList;
    this.RequestSupplierList = this.ProductRequestObject.RequestSupplierList;
    this.BeneficiaryList = this.ProductRequestObject.BeneficiaryList;
    this.ProdReqRelList = this.ProductRequestObject.ProductRequestRelationList;
    this.DurationDay = this.ProductRequestObject.DurationDay;
    this.DurationMonth = this.ProductRequestObject.DurationMonth;
    this.DurationYear = this.ProductRequestObject.DurationYear;
    this.BoardDecisionsDec = this.ProductRequestObject.BoardDecisions;
    this.ShowLetterBtn = this.PopupParam.ProductRequestObject.RegionObject.RegionGroupCode === 3 ? true : false;
    if (this.ProductRequestObject.RelatedContractID !== null) {
      this.IsRelatedContract = true;
    }
    let StartDate = '';
    let EndDate = '';

    if (this.ProductRequestObject.RegionCode === 200) {
      this.DisabledWorkStartDate = true;
    }

    this.Article31subject = this.ProductRequestObject.Article31subject;
    this.CheckBoxStatus = true;
    this.SumFinalAmount = this.PopupParam.SumFinalAmount;
    this.SumAmount = this.PopupParam.SumAmount;
    this.DealTypeCode = this.PopupParam.DealTypeCode;
    this.DealTypeName = this.PopupParam.DealTypeName;
    // this.PriceListPatternID = this.PopupParam.PriceListPatternID; مشخص نيست از کجا چنين پارامي ارسال شده و احتمال باگ خالي شدن
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.IsCost = this.ProductRequestObject.IsCost;
    this.IsBalancing = this.ProductRequestObject.IsBalancing;
    this.IsMaterialsDifference = this.ProductRequestObject.IsMaterialsDifference;
    this.HaveMaterials = this.ProductRequestObject.HaveMaterials;
    this.WorkStartDate = this.ProductRequestObject.ActualStartDateString;

    if (this.PopupParam.ModuleViewTypeCode === 99 &&
      (this.ProductRequestObject.RegionCode === 210 ||
        this.ProductRequestObject.RegionCode === 211 ||
        this.ProductRequestObject.RegionCode === 212 ||
        this.ProductRequestObject.RegionCode === 213 ||
        this.ProductRequestObject.RegionCode === 214 ||
        this.ProductRequestObject.RegionCode === 215 ||
        this.ProductRequestObject.RegionCode === 216 ||
        this.ProductRequestObject.RegionCode === 217)) {
      this.ISErrorBilldingSetting = true;
    }
    if (this.ProductRequestObject.PRLineSet !== null) { // RFC 51098
      this.OnOpenNgSelect('LineOperator');
      this.HalWayThrough = this.ProductRequestObject.PRLineSet.HalWayThrough;
      this.HalfWayBack = this.ProductRequestObject.PRLineSet.HalWayBack;
      this.RateperKilometerEstimate = this.ProductRequestObject.PRLineSet.RatePerKilometerEstimate;
      this.TicketRates = this.ProductRequestObject.PRLineSet.TicketRates;
      this.AverageNumberTransactions = this.ProductRequestObject.PRLineSet.AverageNumberTransactions;
      this.NumberPassengersMonthly = this.ProductRequestObject.PRLineSet.NumberPassengersMonthly;
      this.TotalMonthlyPassenger = this.ProductRequestObject.PRLineSet.TotalMonthlyPassenger;
      this.IsValidationNewCar = this.ProductRequestObject.PRLineSet.IsActiveValidationNewCar;
      this.PercentageGoodWork = this.ProductRequestObject.PRLineSet.PersentageGoodWork;
      this.DoublePercentageValidated = this.ProductRequestObject.PRLineSet.DoublePersentageValidated;
      this.InsurancePercentage = this.ProductRequestObject.PRLineSet.InsurancePercentage;
      this.PercentageOfDeduction = this.ProductRequestObject.PRLineSet.PersentageOfDeduction;
      this.VATPercentage = this.ProductRequestObject.PRLineSet.VATPercentage;
      this.MaximumViolationPercentage = this.ProductRequestObject.PRLineSet.MaxViolationPercentage;
      this.BusNumber = this.ProductRequestObject.PRLineSet.BusCount;
      this.CalculationMethodParams.selectedObject = this.ProductRequestObject.PRLineSet.CalculationMethod;
      this.LineOperatorParams.selectedObject = this.ProductRequestObject.PRLineSet.ActorID;
      if (this.ProductRequestObject.ReviewMethodCode !== null) {
        this.ReviewMethodParams.selectedObject = this.ProductRequestObject.ReviewMethodCode;
      }
    }
    if (this.ProductRequestObject.IsGeneralTerm != null) {
      this.IsGeneralTerm = this.ProductRequestObject.IsGeneralTerm;
    }
    if (this.ProductRequestObject.StartTypeCode != null) {
      this.StartType = this.ProductRequestObject.StartTypeCode;
    }
    if (this.ProductRequestObject.IsFindCost != null) {
      this.AmountType = this.ProductRequestObject.IsFindCost;
    }
    if (this.ProductRequestObject.IsBaselineScrolling != null) {
      this.IsBaselineScrolling = this.ProductRequestObject.IsBaselineScrolling;
    }

    this.SetVWProductRequestItemData();
    this.RefreshCartable.ProductRequestItemList.subscribe(res => {
      this.SetVWProductRequestItemData();
    });
    this.CoulumnsDefinition(this.ProductRequestObject.ContractTypeCode);
    // this.ProdReqRelColDef[2].cellEditorParams.Items = this.ContractList.GetRelatedContractList(this.ProductRequestObject.RegionCode);
    this.OnCheckBoxChange(this.CheckBoxStatus);

    this.ProdReqPersonColDef[1].cellEditorParams.Items = this.ProductRequest.GetBusinessPattern(),
      forkJoin([
        this.ContractList.GetContractTypeListByType(this.IsCost, this.ModuleCode, this.ProductRequestObject.RegionCode),
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetDealMethodListByReionGroupCode(
          this.IsCost,
          this.DealTypeCode,
          this.ProductRequestObject.RegionCode,
          this.ModuleCode,
          this.ProductRequestObject.DealMethodCode,
          this.ProductRequestObject.ContractTypeCode,
          this.ProductRequestObject.CostFactorID),
        this.ProductRequest.GetArticle31List(this.ProductRequestObject.RegionCode),
        this.PriceList.GetPriceListTopics(true),
        this.ProductRequest.GetPRBalanceFactors(this.ProductRequestObject.CostFactorID),
        this.ProductRequest.getAllPRType(),
        this.ProductRequest.GetConsultantSelectTypeList(),
        this.ProductRequest.GetConsultantSelectWayList(),
        this.ProductRequest.GetAllFinYear()
      ]
      ).subscribe(res => {
        this.ContractTypeItems = res[0];
        this.DealMethodItems = [];
        if (this.ModuleViewTypeCode === 200000 || this.ModuleViewTypeCode === 300000) { //RFC 56539
          if (!this.ProductRequestObject.IsCost) {
            if (res[1].find(x => x.DealMethodCode === 6)) {
              this.DealMethodItems.push(res[1].find(x => x.DealMethodCode === 6));
            }
            if (res[1].find(x => x.DealMethodCode === 5)) {
              this.DealMethodItems.push(res[1].find(x => x.DealMethodCode === 5));
            }
          } else {
            this.DealMethodItems = res[1];
          }
        } else {
          this.DealMethodItems = res[1];
        }
        // this.Article31Items = res[2];
        this.PRTypeItems = res[5];
        this.FinYearItems = res[8];
        this.FinYearParams.selectedObject = this.ProductRequestObject.AdjustmentFiYearCode;
        this.PriceListTopicItems = res[3];
        this.PriceListTopicItems.forEach(item => {
          item.PriceListTopicName = item.PriceListTopicCode + ' - ' + item.PriceListTopicName;
        });
        this.ContractTypeParams.selectedObject = this.PopupParam.IsAgreement ? 8 : this.ProductRequestObject.ContractTypeCode;
        // tslint:disable-next-line: max-line-length
        if ((this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22) && this.ProductRequestObject.SubCostCenterObject.ProductRequestTypeCode === 1 && !this.ProductRequestObject.RelatedContractID) { // Rfc50393
          this.PRTypeParams.selectedObject = 1;
          this.IsCostCenter10 = true;
        } else {
          this.PRTypeParams.selectedObject = this.ProductRequestObject.ProductRequestTypeCode;
        }
        this.OnOpenNgSelect('PriceListTopicRaste', true);
        if (this.ProductRequestObject.SubCostCenterObject.CostCenterObject
          && this.ProductRequestObject.ProductRequestTypeCode != null) {
          this.CostCenterCode = this.ProductRequestObject.ProductRequestTypeCode;
          this.onChangeContractType(this.ContractTypeParams.selectedObject);

          if (this.ProductRequestObject.RegionCode !== 200 &&
            this.ProductRequestObject.ContractTypeCode === 26 ||
            this.ProductRequestObject.ContractTypeCode === 27 ||
            this.ProductRequestObject.ContractTypeCode === 28 ||
            this.ProductRequestObject.ContractTypeCode === 29) {
            this.HaveAdviceTab = true;
          }

          if (this.ProductRequestObject.RegionCode === 200) {
            this.HaveEstimateTab = false;
            this.HaveAdviceTab = false;
            this.HasBeneficiary = true;
          }
        }

        if (this.ProductRequestObject.DealMethodCode === 2) {
          if (this.PopupParam.ModuleViewTypeCode === 89) {
            this.GeneralTermHeight = 62;
            this.ProdReqItemColHeight = 65;
            this.ProdReqItemHeight = 85;
          } else {
            this.GeneralTermHeight = 51;
            this.ProdReqItemColHeight = 56;
            this.ProdColHeight = 77;
            this.ProdReqItemHeight = 79;
          }
        }

        if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 8) {
          this.IsArticle31Selected = this.Article31Params.Required = true;
        }

        if (res[4]) {
          this.PriceListTopicParams.selectedObject = res[4].PriceListFineYearCode;
          this.PriceList.GetPriceListType(this.PriceListTopicParams.selectedObject).subscribe(
            ress => {
              this.PriceListTypeItems = ress;
              this.PriceListTypeItems.forEach(item => {
                item.PriceListTypeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
              });
            }
          );
          this.PriceListTypeParams.selectedObject = res[4].PriceListTypeCode;
          if (this.PriceListTypeParams.selectedObject === '02') {
            this.SetProdReqEstimateCol(true);
          } else {
            this.SetProdReqEstimateCol(false);
          }

          this.SeasonListParams.selectedObject = this.ProductRequestObject.SeasonCode;

        }
        this.ConsultantSelectTypeItems = res[6];
        this.ConsultantSelectWayItems = res[7];
        this.ConsultantSelectTypeParams.selectedObject = this.ProductRequestObject.ConsultantSelectTypeCode;
        this.ConsultantSelectedWayParams.selectedObject = this.ProductRequestObject.ConsultantSelectedWayCode;

        this.PriceList.GetPriceListPatternID(this.PriceListTopicParams.selectedObject, this.PriceListTypeParams.selectedObject).subscribe(
          ress => {
            this.PriceListPatternID = ress;
            if (this.ProdReqEstColDef) {
              this.ProdReqEstColDef[1].cellEditorParams.PopupParam = {
                CostListFinYearCode: this.PriceListTopicParams.selectedObject,
                PriceListPatternID: this.PriceListPatternID
              };
            }
          }
        );
        if ( // this.PopupParam.ModuleViewTypeCode === 1 && RFC: 55046
          this.PRTypeParams.selectedObject === 1 || this.PRTypeParams.selectedObject === 4) { // RFC 54283         
          this.IsDisplay = true;
          this.DisableJobCategory = true;
          this.GeneralTermHeight = 57;
          this.EstimateTabHeight = 97;
        } else if (this.PRTypeParams.selectedObject === 3) {
          this.DisableJobCategory = true;
        }
        if (this.DealMethodParams.selectedObject === 2 && this.PopupParam.ModuleViewTypeCode !== 89
          && (this.PopupParam.ModuleViewTypeCode === 1 || this.PopupParam.ModuleViewTypeCode === 165) &&
          this.PRTypeParams.selectedObject === 4) { // RFC 54283
          this.GeneralTermHeight = 48;
          this.EstimateTabHeight = 97;
        }
      });
    if (this.ProductRequestObject.RelatedContractID) { // RFC 53783 , 50352, 50757
      this.IsDisable = true;
      this.DisabledWorkStartDate = true;
    }
    if (this.ModuleCode === 2793 || this.ModuleCode === 2824) {
      this.DisplayReviewMethod = true;
    }
    switch (this.PopupParam.ModuleViewTypeCode) {
      case 1: // RFC 50352
      case 165:
        if (this.ProductRequestObject.RelatedContractID) {
          this.IsRadioEditable = true; // RFC 53159
        }
        this.HasBeneficiary = true;
        break;
      case 89: // RFC 50757
        this.HasBeneficiary = true;
        this.DisplayReviewMethod = true;
        this.ISSign = true; //RFC 63549
        break;
      case 17:
        this.ISSign = true; //RFC 63859
        break;
      case 69:
        this.IsDisable = true;
        this.IsEditable = false;
        this.IsSupplierFinalEditable = this.IsSupplierEditable = true;
        this.HasSupplierSave = true;
        break;
      case 88:
        this.IsDisable = true;
        this.IsEditable = false;
        this.IsSupplierFinalEditable = this.IsSupplierEditable = true;
        this.IsMVtype88 = false;
        this.HasSupplierSave = false;
        this.Article31Params.IsDisabled = false;
        break;
      case 95:
        if (this.ProductRequestObject.RegionCode === 200) {
          this.IsShowType95 = true;
          this.IsSupplierFinalEditable = this.IsEditable = false;
        }
        break;
      case 21:
      case 52:
        if (this.ProductRequestObject.RegionCode === 200) {
          this.IsShowType95 = this.IsDisable = this.SpecialIsEditable = true;
          this.IsSupplierFinalEditable = this.IsEditable = false;
        }
        break;
      case 99:
        this.ContractContent = false;
        this.StartType = 2; // RFC 54105
        this.IsDisable = false;
        this.IsEditable = true;
        this.IsSupplierFinalEditable = this.IsSupplierEditable = true;
        this.HasSupplierSave = false;
        this.HasBeneficiary = true;
        this.onChangeContractType(this.ProductRequestObject.ContractTypeCode);
        if (this.ProductRequestObject.RelatedContractID) {
          this.IsRadioEditable = true; // RFC 53159
        }
        break;
      case 120: // RFC 52874
      case 106:
        this.SpecialIsEditable = this.IsDisable = true;
        this.IsSupplierFinalEditable = this.IsSupplierEditable = this.IsEditable = false;
        this.ISSign = this.PopupParam.ModuleViewTypeCode === 120 ? true : false; //RFC 64665
        break;
      case 300000:
        this.ContractContent = false;
        this.IsSupplierFinalEditable = true;
        this.ItemDisable = true;
        this.TabRahbari = true;
        this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
        this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
        this.ReNewQuestion = 'درخواست تجدید شود؟';
        if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
          this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
          this.IsReturn = this.ProductRequestObject.LastInquiryObject.IsReturn;  // RFC 56880
        } else {
          this.IsLawful = true;
          this.IsReturn = false;  // RFC 56880
        }
        // tslint:disable-next-line: max-line-length
        this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
        if (this.ProductRequestObject.IsRenewal != null) {
          this.IsRenewal = this.ProductRequestObject.IsRenewal;
        } else {
          this.IsRenewal = true;
        }
        if (this.ModuleCode === 2824 && this.ProductRequestObject.LastInquiryObject
          && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject) { // RFC 56277
          this.IsRadioEditable = true;
        }
        break;
      case 200000:
        this.ContractContent = false;
        this.ItemDisable = true;
        this.TabRahbari = true;
        this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
        this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
        this.ReNewQuestion = 'درخواست تجدید شود؟';
        if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
          this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
          this.IsReturn = this.ProductRequestObject.LastInquiryObject.IsReturn;  // RFC 56880
        } else {
          this.IsLawful = true;
          this.IsReturn = false;  // RFC 56880
        }
        // tslint:disable-next-line: max-line-length
        this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
        if (this.ProductRequestObject.IsRenewal != null) {
          this.IsRenewal = this.ProductRequestObject.IsRenewal;
        } else {
          this.IsRenewal = true;
        }
        break;
      case 100000:
        this.ISSign = true; //RFC 63549
        this.ContractContent = false;
        this.TabRahbari = true;
        this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
        this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
        this.ReNewQuestion = 'درخواست تجدید شود؟';
        if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
          this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
          this.IsReturn = this.ProductRequestObject.LastInquiryObject.IsReturn;  // RFC 56880
        } else {
          this.IsLawful = true;
          this.IsReturn = false;  // RFC 56880
        }
        // tslint:disable-next-line: max-line-length
        this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
        if (this.ProductRequestObject.IsRenewal != null) {
          this.IsRenewal = this.ProductRequestObject.IsRenewal;
        } else {
          this.IsRenewal = true;
        }
        if (this.ModuleCode === 2793 && this.ProductRequestObject.ContractObject &&
          this.ProductRequestObject.ContractObject.ContractSatusCode === 2) { // RFC 56277
          this.IsRadioEditable = true;
        }
        break;
      case 114:
        this.ConsultantSelectTypeLable = 'نوع انتخاب مشاور';
        this.ConsultantSelectWayLable = 'روش انتخاب مشاور';
        break;
      case 96: // RFC 56965 - و اوتلوک خ احمدی به تقی پور 18/11/2020 28/08/99
      case 110:
      case 112:
        if (this.ModuleCode === 2730 && this.ProductRequestObject.RegionCode === 200 /*|| this.ProductRequestObject.RegionCode === 0*/) {
          this.IsAllowed = true;
        }
        this.ISSign = true;
        break;
      default:
        break;

    }

    if (this.ProductRequestObject.RelatedContractID || this.ProductRequestObject.ProvisionContractID) {
      this.IsSupplierFinalEditable = false;
    }

    if (this.ProductRequestObject.IsCost && // RFC 51715 - 52012
      (this.ProductRequestObject.DealMethodCode === 4 ||
        (
          (this.ProductRequestObject.RegionCode > 0 &&
            this.ProductRequestObject.RegionCode < 23) &&
          this.ProductRequestObject.DealMethodCode === 7 &&
          this.ProductRequestObject.Article31ID !== 722
        ) ||
        ( // RFC 53775
          (this.ProductRequestObject.RegionCode >= 210 &&
            this.ProductRequestObject.RegionCode <= 219) &&
          this.ProductRequestObject.DealMethodCode !== 7
        )
      )) {
      this.IsLeavingFormality = true;
    } else {
      this.IsLeavingFormality = false;
    }



    // tslint:disable-next-line: max-line-length
    if ((this.ProductRequestObject.DealMethodCode === 7 && this.ProductRequestObject.Article31ID !== 722) ||
      (this.ProductRequestObject.DealMethodCode === 7 && this.ProductRequestObject.Article31ID !== 849)
    ) {
      this.IsDevelopment = false;
    }

    if (this.ProductRequestObject.DealMethodCode === 7 && this.ProductRequestObject.Article31ID === 722) {  // RFC 50812
      this.IsRelatedCorporate = true;
    } else {
      this.IsRelatedCorporate = false;
    }
    this.DealMethodParams.selectedObject = this.ProductRequestObject.DealMethodCode;
    this.Article31Params.selectedObject = this.ProductRequestObject.Article31ID;
    this.onChangeDealMethod(this.ProductRequestObject.DealMethodCode);
    if (this.ProductRequestObject.RegionCode === 222 && this.PopupParam.ModuleViewTypeCode === 114) {
      this.RankParams.Required = true;
      this.PriceListTopicRasteParams.Required = true;
      this.RequiredComponents =
        [this.DealMethodParams,
        this.Article31Params,
        this.ContractTypeParams,
        this.RankParams,
        this.PriceListTopicRasteParams
        ];
    }
    this.ContractContentNote = this.ProductRequestObject.ContractContentNote;
    this.IsContractContent = this.ProductRequestObject.IsContractContent;
    if (this.ProductRequestObject && this.ProductRequestObject.ProductRequestTypeCode
      && this.ProductRequestObject.ProductRequestTypeCode !== 3) { // RFC 62290
      this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(res => {
        if (res) {
          this.HasTripleReport = true;
        }
      });
    }
  }

  OnCheckBoxChange(event) {
    this.IsContractContent = event;
    this.CheckBoxStatus = event;
    this.ContractTypeParams.IsDisabled = this.DealMethodParams.IsDisabled
      = this.PriceListTopicParams.IsDisabled
      = this.PriceListTypeParams.IsDisabled
      // = this.Article31Params.IsDisabled
      = !event;
    this.IsEditable = event;
    this.IsSupplierFinalEditable = this.IsEditable || this.IsSupplierEditable;

    // this.SupplierGridHeight = event ? 88 : 88;
  }
  onChangeArticle31(Article31ID) {
    if (this.ProductRequestObject.IsCost && // RFC 51715 // RFC 52012
      (this.DealMethodParams.selectedObject === 4 ||
        (this.DealMethodParams.selectedObject === 7 &&
          Article31ID !== 722 &&
          (this.ProductRequestObject.RegionCode > 0 &&
            this.ProductRequestObject.RegionCode < 23)
        ) ||
        ( // RFC 53775
          (this.ProductRequestObject.RegionCode >= 210 &&
            this.ProductRequestObject.RegionCode <= 219) &&
          this.DealMethodParams.selectedObject !== 7
        )
      )) {
      // this.NgSelectVSParams.bindValueProp = 'IdentityNo';
      this.IsLeavingFormality = true;
    } else {
      //  this.NgSelectVSParams.bindValueProp = 'ActorId';
      this.IsLeavingFormality = false;
    }
    if ((this.DealMethodParams.selectedObject === 7 && (Article31ID === 849 || Article31ID === 722 || Article31ID === 584))
      || (this.DealMethodParams.selectedObject === 8 && Article31ID === 810)) {
      this.IsDevelopment = false;
      this.GeneralTermHeight = 62;
      this.EstimateTabHeight = 100;
      // tslint:disable-next-line:max-line-length
    } else if ((this.PRTypeParams.selectedObject === 1 || (this.PRTypeParams.selectedObject === 4 && this.ProductRequestObject.RegionCode === 22)) && Article31ID !== 894 && Article31ID !== 722 && Article31ID !== 584
      && Article31ID !== 810) {
      this.IsDevelopment = true;
      this.GeneralTermHeight = 62;
      this.EstimateTabHeight = 97;
    } // RFC 50806 item3

    if (this.DealMethodParams.selectedObject === 7 && Article31ID === 722) {// RFC 50812
      this.IsRelatedCorporate = true;
    } else {
      this.IsRelatedCorporate = false;
    }

  }

  onChangeDealMethod(DealMethodCode) {
    const CurrentIsLeavingFormality = this.IsLeavingFormality;
    if (DealMethodCode) {

      if (this.ProductRequestObject.IsCost && //RFC 51715 // RFC 52012
        (DealMethodCode === 4 ||

          (DealMethodCode === 7 &&
            this.Article31Params.selectedObject !== 722 &&
            (this.ProductRequestObject.RegionCode > 0 &&
              this.ProductRequestObject.RegionCode < 23)
          ) ||
          ( // RFC 53775
            (this.ProductRequestObject.RegionCode >= 210 &&
              this.ProductRequestObject.RegionCode <= 219) &&
            DealMethodCode !== 7
          )
        )) {
        //  this.NgSelectVSParams.bindValueProp = 'IdentityNo';
        this.IsLeavingFormality = true;
      } else {
        // this.NgSelectVSParams.bindValueProp = 'ActorId';
        this.IsLeavingFormality = false;
      }

      if (DealMethodCode === 7 && this.Article31Params.selectedObject === 722) { // RFC 50812
        this.IsRelatedCorporate = true;
      } else {
        this.IsRelatedCorporate = false;
      }

      if (!this.ProductRequestObject.RelatedContractID && !this.ProductRequestObject.ProvisionContractID) {
        if (CurrentIsLeavingFormality !== this.IsLeavingFormality) {
          // tslint:disable-next-line: no-unused-expression
          this.ProductRequestObject.ProvisionContractID;

          this.RequestSupplierList = [];
          this.ShowMessageBoxWithOkBtn('به دلیل تغییر روش انجام معامله از/به ترک تشریفات، طرف قرارداد را مجددا وارد فرمایید');
        }
      }

      this.PriceList.GetAticle31ListByDealMethodCode(DealMethodCode, this.ProductRequestObject.RegionCode).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.Article31Items = res;
          this.Article31Params.IsDisabled = false;
          this.IsArticle31Selected = true;
          this.Article31Params.Required = this.IsArticle31Selected;
        } else {
          this.Article31Params.IsDisabled = true;
          this.IsArticle31Selected = false;
          this.Article31Params.Required = this.IsArticle31Selected;
          this.Article31Params.selectedObject = null;
        }
      });
    }

    if (DealMethodCode === 2) {
      if (this.PopupParam.ModuleViewTypeCode === 89) {
        this.GeneralTermHeight = 62;
      } else {
        this.GeneralTermHeight = 45;
      }
      this.ProdReqItemColHeight = 56;
      this.ProdColHeight = 77;
      this.SupplierGridHeight = 85;
      this.ProdReqItemHeight = 79;
    } else {
      this.CostFactorLetter = null;
      this.SelectedDocument = null;
      this.IsGeneralTerm = false;
      this.GeneralTermHeight = 62;
      this.SupplierGridHeight = 95;
      this.ProdReqItemColHeight = 65;
      this.ProdReqItemHeight = 79;
      this.EstimateTabHeight = 97;
    }
    this.DealMethodParams.selectedObject = DealMethodCode;
    // this.DealMethodSelectedCode = DealMethodCode;
    // if ((this.DealMethodSelectedCode == null || this.DealMethodSelectedCode != 11) ||
    //   (this.ConsultantSelectCode == null || this.ConsultantSelectCode != 3)) {
    //   this.DisableConsultantSelectWayLable = true;
    // } else {
    //   this.DisableConsultantSelectWayLable = false;
    // }
    // if (this.DealMethodParams.selectedObject === 1 || this.DealMethodParams.selectedObject === 2) {
    //   const FinalRes = [];
    //   this.ConsultantSelectWayItems.forEach(node => {
    //     if (node.ConsultantSelectWayCode === 1 ||
    //       node.ConsultantSelectWayCode === 2 ||
    //       node.ConsultantSelectWayCode === 4 ||
    //       node.ConsultantSelectWayCode === 8) {
    //       FinalRes.push(node);
    //     }
    //   });
    //   this.ConsultantSelectWayItems = FinalRes;
    // }
    // RFC 51334
    if ((this.DealMethodParams.selectedObject === 4
      || this.DealMethodParams.selectedObject === 9) && this.PopupParam.ModuleViewTypeCode === 114) {
      this.IsType114AndNotLeavingFormality = false;
    } else if ((this.DealMethodParams.selectedObject !== 4
      || this.DealMethodParams.selectedObject !== 9) && this.PopupParam.ModuleViewTypeCode === 114) {
      this.IsType114AndNotLeavingFormality = true;
    }
    if ((((this.ModuleCode === 2793 && this.PopupParam && this.PopupParam.ModuleViewTypeCode === 100000)
      || (this.ModuleCode === 2824 && this.PopupParam && this.PopupParam.ModuleViewTypeCode === 300000)) &&
      (DealMethodCode === 11 || this.ContractTypeParams.selectedObject === 2))
      || (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 114 && DealMethodCode === 11)) { // RFC 58009
      this.IsConsultant = true;
    } else {
      this.IsConsultant = false;
      // this.ConsultantSelectCode = null;
      // if ((this.DealMethodSelectedCode == null || this.DealMethodSelectedCode != 11) ||
      //   (this.ConsultantSelectCode == null || this.ConsultantSelectCode != 3)) {
      //   this.DisableConsultantSelectWayLable = true;
      // } else {
      //   this.DisableConsultantSelectWayLable = false;
      // }
      this.ConsultantSelectTypeParams.selectedObject = null;
      this.ConsultantSelectedWayParams.selectedObject = null;
    }
  }

  onChangePriceListTopic(event) {
    this.PriceListTypeParams.selectedObject = null;
    this.ProdReqEstList = [];
    this.PriceList.GetPriceListType(event).subscribe(
      res => {
        this.PriceListTypeItems = res;
        this.PriceListTypeItems.forEach(item => {
          item.PriceListTypeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
        });
      }
    );
  }

  onChangePriceListType(event) {
    this.ProdReqEstList = [];
    this.PriceList.GetPriceListPatternID(this.PriceListTopicParams.selectedObject, this.PriceListTypeParams.selectedObject).subscribe(
      res => {
        this.PriceListPatternID = res;
        if (this.ProdReqEstColDef) {
          this.ProdReqEstColDef[1].cellEditorParams.PopupParam = {
            CostListFinYearCode: this.PriceListTopicParams.selectedObject,
            PriceListPatternID: this.PriceListPatternID
          };
        }
      }
    );

    if (this.PriceListTypeParams.selectedObject === '02') { // تجمیعی شهرداری
      this.SetProdReqEstimateCol(true);
    } else {
      this.SetProdReqEstimateCol(false);
    }

  }

  ReqSuppRowClick() { }

  onGridReadyRequestSupplier(params: { api: any; }) {
    this.RequestSupplierApi = params.api;
  }

  ProdReqRelRowClick() {

  }

  onGridReadyProdReqRel(params: { api: any; }) {
    this.ProdReqRelApi = params.api;

  }

  ProdReqItemGridready(params: { api: any; }) {
    this.ProdReqItemApi = params.api;
  }

  onProdReqEstGridReady(params: { api: any; }) {
    this.ProdReqEstApi = params.api;
  }

  onProdReqPersonGridReady(params: { api: any; }) {
    this.ProdReqPersonApi = params.api;
  }
  onPRItemGridready(params: { api: any; }) {
    this.PRItemApi = params.api;
  }

  onGridBeneficiary(params: { api: any; }) {
    this.BeneficiaryApi = params.api;
  }

  onProdReqEstCellValueChanged(event) {
    const value = event.newValue;
    let itemsToUpdate = [];
    // if (event.newValue) {value = event.newValue; } else {value = event.oldValue; }
    if (event.colDef && event.colDef.field === 'PriceListNo') {
      const PriceListNovalue = (typeof (value) === 'object') ? value[0] : value;
      const TemprowData = [];
      this.ProdReqEstApi.forEachNode(res => {
        TemprowData.push(res);
      });
      const IsDuplicate = TemprowData.filter(x => x.rowIndex !== event.rowIndex && x.data.PriceListNo === PriceListNovalue).length > 0;
      if (IsDuplicate && !this.HasPRIEntity) { // RFC 61094-Item3
        this.ShowMessageBoxWithOkBtn('امکان درج ردیف تکراری وجود ندارد.');
      }

      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PriceListPatternID = '';
          node.data.PriceListNo = IsDuplicate && !this.HasPRIEntity ? '' : PriceListNovalue;
          node.data.PriceListName = '';
          node.data.WorkUnitName = '';
          node.data.Amount = '';
          node.data.IsStar = '';
          node.data.IsStarCode = '';
          node.data.Qty = '';
          node.data.FinalAmount = '';
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
      if (IsDuplicate && !this.HasPRIEntity) {
        return;
      }
      const Values = [];
      if (value != null && value !== '') {
        Values.push(value);
        // if (PriceListNovalue != null && PriceListNovalue !== '') {
        //   Values.push(PriceListNovalue);
        this.PriceList.GetPriceListTopicList(Values, '' +
          this.PriceListTypeParams.selectedObject +
          this.PriceListTopicParams.selectedObject, null, null
        ).subscribe(
          res => {
            if (res[0]) {
              itemsToUpdate = [];
              this.ProdReqEstApi.forEachNode(node => {
                if (node.rowIndex === event.rowIndex) {
                  node.data.PriceListPatternID = res[0].PriceListPatternID;
                  node.data.ProductRequestItemID = this.SelectedProductRequestItemID;
                  node.data.PriceListNo = res[0].PriceListTopicCode;
                  node.data.PriceListName = res[0].PriceListTopicName;
                  node.data.WorkUnitName = res[0].WorkUnitName;
                  node.data.WorkUnitCode = res[0].WorkUnitCode;
                  node.data.Amount = res[0].Amount;
                  node.data.IsStar = res[0].IsStar;
                  node.data.IsStarCode = res[0].IsStarCode;
                  node.data.IsRelated = res[0].IsRelated;
                  node.data.Qty = '';
                  node.data.FinalAmount = res[0].WorkUnitCode === 106 ? (node.data.Qty * node.data.Amount) / 100 : node.data.Qty * node.data.Amount; // 60248
                  itemsToUpdate.push(node.data);
                  if (node.data.IsRelated) {
                    this.ShowMessageBoxWithYesNoBtn('فهرست بهای انتخاب شده دارای ردیف مرتبط است آیا مایل به درج می باشید؟');
                    this.BtnClickedName = 'IsRelatedShow';
                    this.IsNotFound = true;
                  }
                }
              });
              this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
              // tslint:disable-next-line:max-line-length
            } else {
              this.ShowMessageBoxWithYesNoBtn(' رديف وارد شده موجود نيست. آيا مايل به افزودن اطلاعات اين رديف فهرست بها مي باشيد؟');
              this.BtnClickedName = 'PriceListTopicNotFound';
              this.IsNotFound = true;
            }
          }
        );
      }
    }
    if (event.colDef && event.colDef.field === 'Qty') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount) {
          node.data.FinalAmount = (node.data.WorkUnitCode === 106) ? (value * node.data.Amount) / 100 : value * node.data.Amount; // 60248
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'FinalAmount') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount && node.data.Amount > 0) {
          node.data.Qty = (node.data.WorkUnitCode === 106) ? ((value * 100) / node.data.Amount).toFixed(2) : (value / node.data.Amount).toFixed(2);  // 60248
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'Amount') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Qty) {
          node.data.FinalAmount = (node.data.WorkUnitCode === 106) ? (value * node.data.Qty) / 100 : value * node.data.Qty;    // 60248
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }
  }

  getDurationDay(DurationDay) {
    if (DurationDay && DurationDay > 0) {
      this.DurationDay = DurationDay;
      this.DurationDay = parseFloat(this.DurationDay);
    } else {
      this.DurationDay = '';
    }
  }

  getDurationMonth(DurationMonth) {
    if (DurationMonth && DurationMonth > 0) {
      this.DurationMonth = DurationMonth;
      this.DurationMonth = parseFloat(this.DurationMonth);
    } else {
      this.DurationMonth = '';
    }
  }

  getDurationYear(DurationYear) {
    if (DurationYear && DurationYear > 0) {
      this.DurationYear = DurationYear;
      this.DurationYear = parseFloat(this.DurationYear);
    } else {
      this.DurationYear = '';
    }
  }

  onCoefClick() {
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      CheckRegionWritable: this.CheckRegionWritable,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
    };
    this.isClicked = true;
    this.PopUpType = 'product-request-coef';
    this.startLeftPosition = 110;
    this.startTopPosition = 60;
  }
  onSaveQuestion() {
    this.SaveRenewalIsReturnHaveWinner();
  }
  onClose() {
    this.ProductRequestSuggestionClosed.emit(true);
  }
  onSave(IsCheckException = false) {
    // tslint:disable-next-line:max-line-length
    let CheckExceptions = (this.PopupParam.OrginalModuleCode === 2793 || this.PopupParam.OrginalModuleCode === 2824) && this.PopupParam.IsAdmin && !IsCheckException;
    let StrExceptions = '';
    if (this.PopupParam && !this.PopupParam.IsNew) { // در صورتي که درخواست تمديد باشد // RFC = 53824
      this.IsNewCheckValidate = false;
    } else {
      this.IsNewCheckValidate = true;
    }
    this.CheckValidate = (this.ModuleCode !== 2793 && this.PopupParam.ModuleViewTypeCode !== 106) ? true : false;

    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دليل دسترسي فقط خواندني کاربر در اين واحد اجرايي وجود ندارد');
      return;
    }
    let PriceItems = null;
    let Messagee = null;
    let ErrorMessage;

    if (!this.PRTypeParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('لطفا نوع درخواست معامله را انتخاب نماييد');
      return;
    }

    if (this.DealMethodParams.selectedObject !== this.ProductRequestObject.DealMethodCode) {
      this.DealMethodChanged = true;
    }
    const DataList = [];
    const PersonEstimateList = [];
    const InvalidRowData = [];
    const rowData = [];
    let ValidateForm = true;
    this.RequestSupplierApi.stopEditing();
    this.ProdReqRelApi.stopEditing();
    this.ProdReqEstApi.stopEditing();
    this.ProdReqItemApi.stopEditing();
    setTimeout(() => {
      this.ProdReqEstApi.forEachNode(function (node) {
        rowData.push(node.data);
      });

      if (this.HaveAdviceTab && this.IsShowTwoGrid) {
        this.ProdReqPersonApi.stopEditing();
      }

      if (this.HaveAdviceTab) {
        this.PRItemApi.stopEditing();
      }

      if (this.HasBeneficiary) {
        this.BeneficiaryApi.stopEditing();
      }

      let InvalidObj;
      this.ProductRequestItemList.forEach((item) => {
        if (item.ProductRequestItemID === this.SelectedProductRequestItemID) {
          rowData.forEach(element => {
            // 51811 mablaghe manfi sahih ast
            if ((!element.PriceListPatternID ||
              !element.Amount) &&
              element.PriceListNo &&
              element.PriceListNo.length > 0) {
              InvalidObj = element;
              InvalidObj.ContractOrderItemID = item.ProductRequestItemID;
              InvalidRowData.push(InvalidObj);
            }
          });
        } else {
          item.ProductRequestEstimateList.forEach(element => {
            if ((!element.PriceListPatternID ||
              !element.Amount) &&
              element.PriceListNo &&
              element.PriceListNo.length > 0) {
              InvalidObj = element;
              InvalidObj.ContractOrderItemID = item.ProductRequestItemID;
              InvalidRowData.push(InvalidObj);
            }
          });
        }
      });
      if (InvalidRowData.length > 0) {
        this.isClicked = true;
        this.PopUpType = 'set-invalid-contract-estimate';
        this.startLeftPosition = 266;
        this.startTopPosition = 140;
        this.PopupParam = {
          // tslint:disable-next-line:max-line-length
          HeaderName: 'رديف هاي زير در فهرست بها يافت نشد يا داراي مبلغ پايه معتبر نمي باشد. خواهشمند است ابتدا نسبت به تکميل اطلاعات رديف هاي مربوطه اقدام فرماييد',
          InvalidEstimateRows: InvalidRowData,
          HaveSave: true,
          PriceListTypeCode: this.PriceListTypeParams.selectedObject,
          CostListFinYearCode: this.PriceListTopicParams.selectedObject
        };
      } else {
        if (rowData) {
          rowData.forEach(item => {
            try { // اين قسمت براي اين است که چک کند آيا تعداد به صورت عددي وارد شده است يا خير
              // tslint:disable-next-line: radix
              const n = Number.parseInt(item.Qty);
              if (n === null || n.toString() === 'NaN') {
                ErrorMessage = 'تعداد بايد به صورت عددي وارد شود';
              }
            } catch {
              ErrorMessage = 'تعداد بايد به صورت عددي وارد شود';
            }

            if (!item.Qty || item.Qty === 'undefined' || item.Qty === 0 || item.Qty === '0') {
              if (PriceItems === null) {
                PriceItems = item.PriceListNo;
              } else {
                PriceItems = PriceItems + ' و ' + item.PriceListNo;
              }
            }
          });

          // tslint:disable-next-line: max-line-length
          Messagee = ' تعداد، براي رديف فهرست بها : ' + PriceItems + ' .نمي تواند خالي و يا صفر باشد ' + 'لطفا اصلاح و فايل را مجددا بارگزاري نماييد ';
          if (PriceItems !== null) {
            this.ShowMessageBoxWithOkBtn(Messagee);
            return;
          }
          if (ErrorMessage) {
            this.ShowMessageBoxWithOkBtn(Messagee);
            return;
          }
        }
        const promise = new Promise<void>((resolve, reject) => {
          this.RequiredComponents.forEach((element, index, array) => {
            if (element.Required && !element.selectedObject && element.selectedObject !== 0 && this.ModuleCode !== 2793) {
              ValidateForm = false;
            }
            if (index === (array.length - 1)) {
              resolve();
            }
          });
        }).then(() => {
          if (this.IsArticle31Selected) {
            ValidateForm = (this.ModuleCode !== 2793 && this.PopupParam.ModuleViewTypeCode !== 106) ?
              ValidateForm &&
                // tslint:disable-next-line: max-line-length
                (this.DealTypeCode === 1 && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)) ? true :
                this.Article31Params.selectedObject
              : true;
          } else {
            ValidateForm = (this.ModuleCode !== 2793 && this.PopupParam.ModuleViewTypeCode !== 106) ?
              ValidateForm : true;
          }
          if (this.IsForcePriceList && this.PopupParam.OrginalModuleCode !== 2793) { // RFC 61902 // RFC 62200
            ValidateForm = ValidateForm && this.PriceListTopicRasteParams.selectedObject && this.RankParams.selectedObject;
          }
          if (this.ModuleCode === 2730 && this.PopupParam.ModuleViewTypeCode !== 106) { // RFC 52217
            ValidateForm =
              ValidateForm &&
              ((this.PopupParam.ModuleViewTypeCode !== 89 || this.DurationYear) ||
                (this.PopupParam.ModuleViewTypeCode !== 89 || this.DurationMonth) ||
                (this.PopupParam.ModuleViewTypeCode !== 89 || this.DurationDay));
          }
          if (this.ProductRequestObject.RegionCode === 222 && this.PopupParam.ModuleViewTypeCode === 114) {
            ValidateForm =
              ValidateForm
              && this.PriceListTopicRasteParams.selectedObject
              && this.RankParams.selectedObject;
          }

          if(this.IsForcePriceList && (!this.PriceListTopicRasteParams.selectedObject || !this.RankParams.selectedObject) ) {
            ValidateForm = false;
            this.CheckValidate = true;
          }
          
          if (ValidateForm) {
            this.ProdReqEstApi.forEachNode(node => {
              DataList.push(node.data);
            });

            this.ProdReqItemApi.forEachNode(node => {
              if (node.data.ProductRequestItemID === this.beforeID) {
                node.data.ProductRequestEstimateList = DataList;
              }
            });
            this.ProdReqItemApi.forEachNode(node => {
              if (node.data.ProductRequestEstimateList && node.data.ProductRequestEstimateList.length > 0) {
                this.HaveEstimate = true;
              }
            });
            // tslint:disable-next-line: max-line-length
            if (this.IsDevelopment &&
              !this.HaveEstimate &&
              this.ProductRequestObject.RelatedContractID === null &&
              this.IsCost &&
              // tslint:disable-next-line: max-line-length
              (this.ContractTypeParams.selectedObject !== 4 && this.ContractTypeParams.selectedObject !== 2 && this.ContractTypeParams.selectedObject !== 26 // 62828
                // tslint:disable-next-line: max-line-length
                && this.ContractTypeParams.selectedObject !== 27 && this.ContractTypeParams.selectedObject !== 28 && this.ContractTypeParams.selectedObject !== 29) &&
              this.ProductRequestObject.RegionCode >= 1 &&
              this.ProductRequestObject.RegionCode < 22 &&
              this.OrginalModuleCode !== 2793 // 62348
              && this.ProductRequestObject.DealMethodCode !== 3
            ) {
              this.ShowMessageBoxWithOkBtn('پر کردن متره براي درخواست معامله عمراني اجباري مي باشد');
              return;
            }
            const RequestSupplierList = [];
            const ProductRequestRelationList = [];
            this.ProductRequestObject.Article31ID = this.Article31Params.selectedObject ? this.Article31Params.selectedObject : null;
            this.ProductRequestObject.SeasonCode = this.SeasonListParams.selectedObject ? this.SeasonListParams.selectedObject : null;
            // tslint:disable-next-line:max-line-length
            this.ProductRequestObject.ContractTypeCode = this.ContractTypeParams.selectedObject ? this.ContractTypeParams.selectedObject : null;
            this.ProductRequestObject.DurationDay = this.DurationDay;
            this.ProductRequestObject.DurationMonth = this.DurationMonth;
            this.ProductRequestObject.DurationYear = this.DurationYear;
            this.ProductRequestObject.ContractContentNote = this.ContractContentNote;
            this.ProductRequestObject.IsContractContent = this.IsContractContent;
            this.ProductRequestObject.IsPact = this.CheckBoxStatus;
            this.ProductRequestObject.PriceListPatternID = this.PriceListPatternID;
            this.ProductRequestObject.Article31subject = this.Article31subject;
            this.ProductRequestObject.StartTypeCode = this.StartType;
            this.ProductRequestObject.ActualStartDate = this.WorkStartDate;
            this.ProductRequestObject.IsFindCost = this.AmountType;
            this.ProductRequestObject.IsGeneralTerm = this.IsGeneralTerm;
            this.ProductRequestObject.IsBalancing = this.IsBalancing;
            this.ProductRequestObject.AdjustmentFiYearCode = this.FinYearParams.selectedObject;
            this.ProductRequestObject.ProductRequestTypeCode = this.PRTypeParams.selectedObject;
            this.ProductRequestObject.IsMaterialsDifference = this.IsMaterialsDifference;
            this.ProductRequestObject.HaveMaterials = this.HaveMaterials;
            // tslint:disable-next-line:max-line-length
            this.ProductRequestObject.GradeID = this.RankParams.selectedObject ? this.RankParams.selectedObject : null;
            this.ProductRequestObject.IsBaselineScrolling = this.IsBaselineScrolling;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.ConsultantSelectTypeCode = this.ConsultantSelectTypeParams.selectedObject ? this.ConsultantSelectTypeParams.selectedObject : null;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.ConsultantSelectedWayCode = this.ConsultantSelectedWayParams.selectedObject ? this.ConsultantSelectedWayParams.selectedObject : null;
            this.ProductRequestObject.DealTypeCode = this.DealTypeCode;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.PriceListTopicID = this.PriceListTopicRasteParams.selectedObject ? this.PriceListTopicRasteParams.selectedObject : null;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.ReviewMethodCode = this.ReviewMethodParams.selectedObject ? this.ReviewMethodParams.selectedObject : null;
            this.RequestSupplierApi.forEachNode(node => {
              if (node.data.ActorID || node.data.IdentityNo) {
                const RequestSupplierObj = {
                  RequestSupplierID: node.data.RequestSupplierID ? node.data.RequestSupplierID : -1,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  ActorID: node.data.ActorID,
                  IdentityNo: node.data.IdentityNo,
                  PersonIdentityNo: node.data.PersonIdentityNo,
                  CorporateIdentityNo: node.data.CorporateIdentityNo,
                  BirthDate: node.data.BirthDate,
                  CorporateTypeCode: node.data.CorporateTypeCode,
                };
                RequestSupplierList.push(RequestSupplierObj);
              }
            });
            this.ProdReqRelApi.forEachNode(node => {
              const ProdReqRelationObj = {
                ProductRequestRelationID: node.data.ProductRequestRelationID ? node.data.ProductRequestRelationID : -1,
                // tslint:disable-next-line:max-line-length
                RelatedContractID: (node.data.Subject.ContractId) ? node.data.Subject.ContractId : (node.data.RelatedContractID ? node.data.RelatedContractID : null),
                // tslint:disable-next-line:max-line-length
                ContractRelationTypeCode: (node.data.ContractRelationTypeName && node.data.ContractRelationTypeName.ContractRelationTypeCode) ? node.data.ContractRelationTypeName.ContractRelationTypeCode : (node.data.ContractRelationTypeCode ? node.data.ContractRelationTypeCode : null),
                CostFactorID: this.ProductRequestObject.CostFactorID,
                Note: node.data.Note,
                IsIncreament: 0,
                ItemNo: node.data.ItemNo,
                ContractTypeCode: node.data.ContractTypeCode,
                IsMuncipalityRegionContractor: node.data.IsMuncipalityRegionContractor,
                ContractIsCost: node.data.ContractIsCost,
                ProxyContractorRegionCode: node.data.ProxyContractorRegionCode
              };
              ProductRequestRelationList.push(ProdReqRelationObj);
            });

            const ProdReqItemList = [];
            // if (this.PopupParam.IsTransferedContract === true) {
            //   this.PopupParam.ProductRequestObject.ProductRequestItemList.forEach(node => {
            //     ProdReqItemList.push(node);
            //   });

            //   const ProdReqRelationObj = {
            //     ProductRequestRelationID: -1,
            //     // tslint:disable-next-line:max-line-length
            //     RelatedContractID: this.ProductRequestObject.ContractObject.ContractId,
            //     // tslint:disable-next-line:max-line-length
            //     ContractRelationTypeCode: 2,
            //     CostFactorID: this.ProductRequestObject.CostFactorID,
            //     Note: '',
            //     IsIncreament: 0
            //   };
            //   ProductRequestRelationList.push(ProdReqRelationObj);
            // } else {
            this.ProdReqItemApi.forEachNode(node => {
              let ItemNo = 0;
              node.data.ProductRequestEstimateDataList = [];
              node.data.ProductRequestEstimateList.forEach(item => {
                var keys = Object.keys(item);
                const EntityTypeItemIDList = [];
                if (node.data.PRIEntityList) {
                  node.data.PRIEntityList.forEach(Entity => {
                    let str = 'Subject' + Entity.EntityTypeID.toString();
                    let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
                    var key = keys.find(x => x === str);

                    if (key && item[key]) {
                      if (item[key].EntityTypeItemID) {
                        EntityTypeItemIDList.push(item[key].EntityTypeItemID);
                      } else {
                        key = keys.find(x => x === ID);
                        if (key && item[key]) {
                          EntityTypeItemIDList.push(item[key]);
                        }
                      }
                    }
                  });
                }

                const EstimateObj = {
                  ProductRequestEstimateID: item.ProductRequestEstimateID ? item.ProductRequestEstimateID : -1,
                  ProductRequestItemID: node.data.ProductRequestItemID,
                  ItemNo: ++ItemNo,
                  PriceListPatternID: item.PriceListPatternID,
                  Qty: item.Qty,
                  Coef: item.Coef,
                  Amount: item.Amount,
                  RelatedPriceListPatternID: item.RelatedPriceListPatternID ? item.RelatedPriceListPatternID : null,
                  EntityTypeItemIDList: EntityTypeItemIDList,
                  IndexPriceListPatternID: item.IndexPriceListPatternID ? item.IndexPriceListPatternID : null,
                };
                node.data.ProductRequestEstimateDataList.push(EstimateObj);
              });
              ProdReqItemList.push(node.data);
            });
            // }
            const SaveListSetting = {
              CostFactorID: this.ProductRequestObject.CostFactorID,
              HalWayThrough: this.HalWayThrough,
              HalWayBack: this.HalfWayBack,
              RatePerKilometerEstimate: this.RateperKilometerEstimate,
              TicketRates: this.TicketRates,
              AverageNumberTransactions: this.AverageNumberTransactions,
              NumberPassengersMonthly: this.NumberPassengersMonthly,
              TotalMonthlyPassenger: this.TotalMonthlyPassenger,
              ActorID: this.LineOperatorParams.selectedObject ? this.LineOperatorParams.selectedObject : null,
              IsActiveValidationNewCar: this.IsValidationNewCar,
              PersentageGoodWork: this.PercentageGoodWork,
              DoublePersentageValidated: this.DoublePercentageValidated,
              InsurancePercentage: this.InsurancePercentage,
              PersentageOfDeduction: this.PercentageOfDeduction,
              VATPercentage: this.VATPercentage,
              MaxViolationPercentage: this.MaximumViolationPercentage,
              CalculationMethod: this.CalculationMethodParams.selectedObject,
              BusCount: this.BusNumber,
              LineOperatorItems: this.LineOperatorItems
            };
            if (this.HaveAdviceTab) {
              this.PRItemApi.forEachNode(node => {
                ProdReqItemList.forEach(item => {
                  if (item.ProductRequestItemID === node.data.ProductRequestItemID) {
                    item.Weight = node.data.Weight;
                    //  item.Amount = node.data.Amount;
                  }
                });
              });
            }
            if (this.HaveAdviceTab && this.IsShowTwoGrid) {
              this.ProdReqPersonApi.forEachNode(node => {
                PersonEstimateList.push(node.data);
              });

              this.PRItemApi.forEachNode(node => {
                if (node.data.ProductRequestItemID === this.BeforePersonID) {
                  node.data.RequestPersonEstimateList = PersonEstimateList;
                }
              });

              this.PRItemApi.forEachNode(node => {
                let ItemNo = 0;
                node.data.RequestPersonEstimateDataList = [];
                node.data.RequestPersonEstimateList.forEach(item => {
                  const RequestPersonEstimateObj = {
                    RequestPersonEstimateID: item.RequestPersonEstimateID ? item.RequestPersonEstimateID : -1,
                    ProductRequestItemID: node.data.ProductRequestItemID,
                    ItemNo: ++ItemNo,
                    // tslint:disable-next-line:max-line-length
                    BusinessPatternID: (item.BusinessPatternName && item.BusinessPatternName.BusinessPatternID) ? item.BusinessPatternName.BusinessPatternID : (item.BusinessPatternID ? item.BusinessPatternID : null),
                    EducationYear: item.EducationYear,
                    ExperienceYear: item.ExperienceYear,
                    ManagementCOEF: item.ManagementCOEF,
                    TopGraduated: item.TopGraduated,
                    Qty: item.Qty,
                    Amount: item.Amount,
                  };
                  node.data.RequestPersonEstimateDataList.push(RequestPersonEstimateObj);
                });
                // tslint:disable-next-line:max-line-length
                this.HaveEstimateTab ? ProdReqItemList.filter(x => x.ProductRequestItemID === node.data.ProductRequestItemID)[0].RequestPersonEstimateDataList = node.data.RequestPersonEstimateDataList : ProdReqItemList.push(node.data);
              });
            }

            const BeneficiaryList = [];

            if (this.HasBeneficiary) {
              this.BeneficiaryApi.forEachNode(node => {
                const BeneficiaryObj = {
                  RequestBeneficiaryID: node.data.RequestBeneficiaryID ? node.data.RequestBeneficiaryID : -1,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  CorporateID: node.data.CorporateID,
                };
                BeneficiaryList.push(BeneficiaryObj);
              });
            }
            // tslint:disable-next-line:max-line-length
            if (((this.PopupParam.ModuleViewTypeCode === 99 && this.DealMethodParams.selectedObject !== 3) ||
              this.PopupParam.ModuleViewTypeCode === 104) &&
              this.ProductRequestObject.RegionCode === 210 &&
              (this.DealMethodParams.selectedObject === 2 || this.DealMethodParams.selectedObject === 3) &&
              RequestSupplierList.length < 3) {
              this.ShowMessageBoxWithOkBtn('حداقل بايد سه طرف قرارداد را وارد کنيد');  // RFc 53803 & 50289
              return;
            }
            if ((this.DealMethodParams.selectedObject === 4 || this.DealMethodParams.selectedObject === 7
              || this.DealMethodParams.selectedObject === 8 || this.DealMethodParams.selectedObject === 9)
              && RequestSupplierList.length !== 1) {
              this.ShowMessageBoxWithOkBtn(' یک طرف قرارداد را باید انتخاب کنید.');
              return;
            }
            if (this.IsArticle31Selected && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)
              // tslint:disable-next-line: max-line-length
              && (this.DealTypeCode === 3 || this.DealTypeCode === 4) && this.Article31Params.selectedObject === 722
              // tslint:disable-next-line: max-line-length
              && (RequestSupplierList[0].CorporateTypeCode == null || isUndefined(RequestSupplierList[0].CorporateTypeCode) || RequestSupplierList[0].CorporateTypeCode === 5)) {
              // tslint:disable-next-line: max-line-length
              this.ShowMessageBoxWithOkBtn(' طرف قرارداد بايد حقوقي باشد. و با اين حد معامله و روش انجام امکان انتخاب طرف قرارداد از ساير اشخاص حقوقي نيز وجود ندارد.');
              return;
            }
            if (this.IsArticle31Selected && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)
              && (this.DealTypeCode === 1 || this.DealTypeCode === 2) && this.Article31Params.selectedObject === 750
              && this.ProductRequestObject.RegionCode >= 210 && this.ProductRequestObject.RegionCode <= 218
              // tslint:disable-next-line: max-line-length
              && (RequestSupplierList[0].CorporateTypeCode == null || isUndefined(RequestSupplierList[0].CorporateTypeCode) || RequestSupplierList[0].CorporateTypeCode === 5)) { // RFC 5186
              // tslint:disable-next-line: max-line-length
              this.ShowMessageBoxWithOkBtn(' طرف قرارداد بايد حقوقي باشد. و با اين حد معامله و روش انجام امکان انتخاب طرف قرارداد از ساير اشخاص حقوقي نيز وجود ندارد.');
              return;
            }
            if (this.IsArticle31Selected && (this.DealMethodParams.selectedObject === 7 // RFC 57019-Item 2-الف
               /*|| this.DealMethodParams.selectedObject === 8*/)
              && (this.DealTypeCode === 2) && this.Article31Params.selectedObject === 722
              && this.ProductRequestObject.RegionCode >= 0 && this.ProductRequestObject.RegionCode <= 22
              // tslint:disable-next-line: max-line-length
              && (RequestSupplierList[0].CorporateTypeCode == null || isUndefined(RequestSupplierList[0].CorporateTypeCode) || RequestSupplierList[0].CorporateTypeCode === 5)) { // RFC 5186
              // tslint:disable-next-line: max-line-length
              this.ShowMessageBoxWithOkBtn(' طرف قرارداد بايد حقوقي باشد. و با اين حد معامله و روش انجام امکان انتخاب طرف قرارداد از ساير اشخاص حقوقي نيز وجود ندارد.');
              return;
            }
            if (this.ProductRequestObject.HaveMutualContract && this.HasBeneficiary
              && BeneficiaryList.length === 0) {
              this.ShowMessageBoxWithOkBtn('بايد بهره بردار وارد شود.');
              return;
            }
            this.ProductRequestObject.DealMethodCode = this.DealMethodParams.selectedObject ? this.DealMethodParams.selectedObject : null; // 63811
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.ProductRequestDate = this.CommonService.ConvertToASPDateTime(this.ProductRequestObject.ProductRequestDate);
            if (CheckExceptions) {
              this.ProductRequest.GetSaveExceptions(2,
                this.ModuleCode,
                this.ProductRequestObject,
                ProdReqItemList,
                RequestSupplierList,
                this.PopupParam.OrginalModuleCode
              ).subscribe((res: any) => {
                if (res !== '') {
                  this.IsException = true;
                  StrExceptions = res;
                  StrExceptions = StrExceptions + ' ' + 'آيا مي خواهيد ادامه دهيد؟';
                  this.ShowMessageBoxWithYesNoBtn(StrExceptions);
                } else {
                  this.ProductRequest.UpdateProductRequest(this.ProductRequestObject,
                    ProdReqItemList,
                    RequestSupplierList,
                    ProductRequestRelationList,
                    BeneficiaryList,
                    false,
                    // this.IsTransferedContract,
                    this.CostFactorLetter ? this.CostFactorLetter : null,
                    this.SelectedDocument ? this.SelectedDocument : null,
                    SaveListSetting,
                    this.ModuleCode,
                    this.PopupParam.OrginalModuleCode,
                    this.PriceListTypeParams.selectedObject)
                    .subscribe(
                      (res: any) => {
                        this.PopupOutPut.emit(res);
                        this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
                        this.SetVWProductRequestItemData();
                        this.ProdReqRelList = res.ProductRequestRelationList;
                        if (this.PopupParam.ModuleViewTypeCode === 88 && this.DealMethodChanged) {
                          this.ShowBusDrivingArchive = true;
                        }
                        if (this.ProductRequestObject.ProductRequestTypeCode !== 3) {
                          this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(result => {
                            if (result) {
                              this.HasTripleReport = true;
                            } else {
                              this.HasTripleReport = false;
                            }
                          });
                        } else {
                          this.HasTripleReport = false;
                        }
                      },
                      err => {
                        if (!err.error.Message.includes('|')) {
                          this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
                        }
                      }
                    );
                }
              });
            } else {
              this.ProductRequest.UpdateProductRequest(this.ProductRequestObject,
                ProdReqItemList,
                RequestSupplierList,
                ProductRequestRelationList,
                BeneficiaryList,
                !IsCheckException,
                // this.IsTransferedContract,
                this.CostFactorLetter ? this.CostFactorLetter : null,
                this.SelectedDocument ? this.SelectedDocument : null,
                SaveListSetting,
                this.ModuleCode,
                this.PopupParam.OrginalModuleCode,
                this.PriceListTypeParams.selectedObject)
                .subscribe(
                  (res: any) => {
                    this.PopupOutPut.emit(res);
                    this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
                    this.SetVWProductRequestItemData();
                    this.ProdReqRelList = res.ProductRequestRelationList;
                    if (this.PopupParam.ModuleViewTypeCode === 88 && this.DealMethodChanged) {
                      this.ShowBusDrivingArchive = true;
                    }
                  },
                  err => {
                    if (!err.error.Message.includes('|')) {
                      this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
                    }
                  }
                );
            }
          } else {
            this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فيلد هاي مشخص شده را تکميل فرماييد');
            return;
          }
        });
      }
    }, 2);
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 515;
    this.startTopPosition = 230;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 515;
    this.startTopPosition = 230;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  onProdReqEstRowClick(event) {
    this.selectedEstimateRow = event;
    // this.SelectedProdReqEstID = event.data.ProductRequestEstimateID;

    this.CalcFunction = '';
    if (event.data.RelatedPriceListPatternID) {
      this.PriceList.GetRelatedPriceListPattern(event.data.RelatedPriceListPatternID,
        event.data.PriceListPatternID)
        .subscribe(
          res => {
            const rowDataList = [];
            this.ProdReqEstApi.forEachNode(function (node) {
              rowDataList.push(node.data);
            });
            const rowData = rowDataList.filter(x => x.PriceListPatternID === event.data.RelatedPriceListPatternID)[0];
            this.CalcFunction = res[0].CalcFunction;
            const XValue = res[0].XValue;
            const IsEfectToPrice = res[0].IsEfectToPrice;

            if (this.CalcFunction) {
              const index = this.CalcFunction.indexOf('x');
              if (index && index !== -1) {
                this.CalcFunction = this.CalcFunction.replace('x', XValue);
                if (IsEfectToPrice) {
                  this.CalcFunction = this.CalcFunction.replace('pos', rowData.Amount);
                } else {
                  this.CalcFunction = this.CalcFunction.replace('pos', rowData.Qty);
                }
              } else {
                if (IsEfectToPrice) {
                  this.CalcFunction = this.CalcFunction + ' * ' + rowData.Amount;

                } else {
                  this.CalcFunction = this.CalcFunction + ' * ' + rowData.Qty;
                }
              }
            }
          });
    }
  }

  onProdReqItemRowClick(event) {
    this.selectedPRItemRow = event.data;
    this.ProductName = event.data.ProductName;
    this.ProductCode = event.data.ProductCode;
    this.SelectedProductID = event.data.ProductID;
    this.Amount = event.data.Amount;
    this.SelectedProductRequestItemID = event.data.ProductRequestItemID;
    this.IsEstimateEditable = true;
    const rowData = [];
    this.ProdReqEstApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.ProdReqEstApi.updateRowData({ remove: rowData });
    // this.selectedContractOrderItemID = event.data.ContractOrderItemID;
    if (!this.beforeID) {
      this.ProdReqEstList = event.data.ProductRequestEstimateList;
    }

    if (this.beforeID && this.beforeID !== event.data.ProductRequestItemID) {

      this.ProdReqItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.beforeID) {
          item.data.ProductRequestEstimateList = rowData;
        }

        if (item.data.ProductRequestItemID === event.data.ProductRequestItemID) {
          this.ProdReqEstList = item.data.ProductRequestEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID === event.data.ProductRequestItemID) {
      this.ProdReqItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.beforeID) {
          this.ProdReqEstApi.updateRowData({ add: rowData });
        }
      });
    }

    this.beforeID = event.data.ProductRequestItemID;

    if (!event.data.PRIEntityList) {
      this.ProductRequest.GetProductRequestEntityList(null, null, event.data.ProductRequestItemID).subscribe(res => {
        if (res && res.length > 0) { // RFC 61094-item3
          event.data.PRIEntityList = res;
          this.EntityColumnDefinition(event.data);
          this.HasPRIEntity = true;
        } else if (res && res.length === 0) {
          event.data.PRIEntityList = res;
          this.HasPRIEntity = false;
        } else {
          this.HasPRIEntity = false;
        }
      });
    } else {
      this.EntityColumnDefinition(event.data);
      this.HasPRIEntity = true;
    }
  }

  MessageBoxAction(ActionResult) {
    this.isClicked = false;
    this.PopUpType = '';
    if (ActionResult === 'YES') {
      if (this.BtnClickedName === 'PriceListTopicNotFound' && this.selectedEstimateRow !== null) {
        this.PopUpType = 'price-list-topic-dataentry-page';
        this.isClicked = true;
        this.HaveHeader = true;
        this.startLeftPosition = 455;
        this.startTopPosition = 165;
        this.PopupParam = {
          HeaderName: 'افزودن فهرست بها',
          Mode: 'AddBatchTopicInEstimate',
          PriceListTypeCode: this.PriceListTypeParams.selectedObject,
          CostListFinYearCode: this.PriceListTopicParams.selectedObject,
          PriceListTopicCode: this.selectedEstimateRow.data.PriceListNo,
          ItemNo: this.selectedEstimateRow.data.ItemNo
        };
      }
    }
    if (this.IsException && ActionResult === 'YES') {
      this.onSave(true);
      return;
    }
    if (this.BtnClickedName === 'IsRelatedShow' && ActionResult === 'YES') {
      this.btnClick('Related');
    }
    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'NO') {
      this.IsNotFound = false;
    }
    this.BtnClickedName = '';
  }

  PlcOutPutOperation(event) {
    if (event.data) {
      const DataToAdd = [];
      event.data.forEach(r => {
        if (r && (!r.FinalAmount || r.FinalAmount == null)) {
          r.FinalAmount = r.Qty * r.Amount;
        }
        DataToAdd.push(r);
      });
      this.ProdReqEstApi.updateRowData({ add: DataToAdd });
      this.RefreshItemNo();
    }
  }

  getOutPutParam(event) {
    if (this.PopUpType === 'related-price-list') {
      this.AddRelatedList(event);
      return;
    }
    if (this.PopUpType === 'product-request-item-coef') {
      this.ReturendCoefLevelCode(event);
      return;
    }
    if (this.PopUpType === 'price-list-topic-dataentry-page') {
      this.AddPopUpBtnClick(event);
      return;
    }

    if (this.PopUpType === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }
    if (this.PopUpType === 'price-list-correction') {
      this.PlcOutPutOperation(event);
      return;
    }
    if (this.PopUpType === 'editor-select-price-list') {
      this.SetPriceListTopicList(event);
      return;
    }
    if (this.PopUpType === 'app-automation') {
      this.SelectedDocument = {
        DocumentId: event.DocumentId,
        DocumentLetterDate: event.DocumentLetterDate,
        DocumentLetterNo: event.DocumentLetterNo,
        DocumentSubject: event.DocumentSubject,
        FolID: event.FolID,
        OrgID: event.OrgID,
        PersonelID: event.PersonelID,
        RegisterLetterDate: event.RegisterLetterDate,
        RegisterLetterNo: event.RegisterLetterNo,
        SenID: event.SenID,
      };
      this.CostFactorLetter = {
        CostFactorID: this.ProductRequestObject.CostFactorID,
        LetterTypeCode: this.LetterTypeCode,
        OrganizationCode: this.ProductRequestObject.OrganizationCode,
        RegionCode: this.ProductRequestObject.RegionCode
      };

    }
    if (this.PopUpType === 'set-invalid-contract-estimate') {
      if (event && event.length > 0) {
        const itemsToUpdate = [];
        this.ProductRequestItemList.forEach((item) => {
          if (item.ProductRequestItemID !== this.SelectedProductRequestItemID) {
            item.ProductRequestEstimateList.forEach(element => {
              const CurrObj = event.filter(x =>
                x.ItemNo === element.ItemNo &&
                x.ContractOrderItemID === item.ProductRequestItemID)[0];
              if (CurrObj && CurrObj.PriceListPatternID) {
                delete CurrObj.ContractOrderItemID;
                element = CurrObj;
              }
            });
          }
        });
        this.ProdReqEstApi.forEachNode(function (node) {
          const CurrObj = event.filter(x => x.ItemNo === node.ItemNo && x.ContractOrderItemID === this.ProductRequestItemID)[0];
          if (CurrObj && CurrObj.PriceListPatternID) {
            delete CurrObj.ContractOrderItemID;
            node.data = CurrObj;
            itemsToUpdate.push(node.data);
          }
        });
        this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
      }
    }

  }
  AddPopUpBtnClick(element) {
    if (element.ItemNo > -1) {
      const itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.data.ItemNo === element.ItemNo) {
          node.data.PriceListPatternID = element.PriceListPatternID;
          node.data.PriceListNo = element.PriceListTopicCode;
          node.data.PriceListName = element.PriceListTopicName;
          node.data.WorkUnitName = element.WorkUnitName;
          node.data.Amount = element.Amount;
          node.data.IsStar = element.IsStar;
          node.data.IsStarCode = element.IsStarCode;
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    } else {
      const ItemList = [];
      const obj = {
        PriceListPatternID: element.PriceListPatternID,
        PriceListNo: element.PriceListTopicCode,
        PriceListName: element.PriceListTopicName,
        WorkUnitName: element.WorkUnitName,
        Amount: element.Amount,
        IsStar: element.IsStar,
        IsStarCode: element.IsStarCode,
      };
      ItemList.push(obj);
      this.ProdReqEstApi.updateRowData({ add: ItemList });
      this.RefreshItemNo();
    }
  }

  popupclosed() {
    if (this.PopUpType === 'product-request-coef') {
      this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
        if (res) {
          this.PopupParam.ProductRequestObject = res;
          this.PopupParam.DealTypeCode = res.DealTypeCode;
          this.PopupParam.DealTypeName = res.DealTypeName;
          this.PopupParam.IsCost = res.IsCost;
          this.PopupParam.ModuleCode = this.ModuleCode;
          this.PopupParam.ModuleViewTypeCode = this.ModuleViewTypeCode;
          this.PopupParam.RequestedPerson = res.ActorID;
          let SumFinalAmount = 0;
          res.ProductRequestItemList.forEach(element => {
            SumFinalAmount = SumFinalAmount + element.AmountCOEFPact;
          });
          this.PopupParam.SumFinalAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.PopupParam.SumAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.PopupParam.CheckRegionWritable = this.CheckRegionWritable;
          this.User.CheckAdmin().subscribe(ress => {
            this.PopupParam.IsAdmin = ress;
          });
          this.PopupParam.IsNew = true;
          if (this.ModuleCode === 2773) {
            this.PopupParam.IsNew = false;
          }
          if (res.RelatedContractID) {
            this.PopupParam.IsNew = false;
          }
          if (this.ModuleCode === 2787 && this.ModuleViewTypeCode === 500000) {
            this.PopupParam.IsNew = false;
          }
          this.PopupParam.OrginalModuleCode = this.OrginalModuleCode;
          this.ngOnInit();
        }
      });
    }
    // this.PopUpType = '';
    this.isClicked = this.IsNotFound;
    this.IsNotFound = false;
    this.HaveMaxBtn = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
  }

  FetchMoreSupplerPerson(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      event.Owner.ProdReqPersonColDef[1].cellEditorParams.Params.loading = true;
      const ResultList = [];
      if (event.Owner.PRTypeParams.selectedObject) { //  RFC 50794
        let RegionCode = null;  // RFC 56993
        if (RegionCode > 210 && RegionCode < 219) {
          RegionCode = 210;
        }
        event.Owner.ProductRequest.GetRegionCodeByPRTypeCode(event.Owner.PRTypeParams.selectedObject).subscribe(res => {
          if (res) {
            RegionCode = res;
          }
        });
        const promise = new Promise((resolve, reject) => {
          event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
            event.SearchOption, event.Owner.SelectedPersonTypeCode === 1 ?
            true : event.Owner.SelectedPersonTypeCode === 2 ? false : null, event.Owner.IsLeavingFormality,
            true, null, null, RegionCode, event.Owner.IsRelatedCorporate,
            event.Owner.ProductRequestObject.CostFactorID, true, true).subscribe(res => {
              event.CurrentItems.forEach(el => {
                ResultList.push(el);
              });
              res.List.forEach(element => {
                element.IdentityNo = element.IdentityNo ? element.IdentityNo : element.ParentIdentityNo;
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
            type: 'supplier'
          });
        });
      } else {
        let RegionCode = event.Owner.ProductRequestObject.RegionCode;
        if (RegionCode > 210 && RegionCode < 219) {
          RegionCode = 210;
        }
        const promise = new Promise((resolve, reject) => {
          event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
            event.SearchOption, event.Owner.SelectedPersonTypeCode === 1 ?
            true : event.Owner.SelectedPersonTypeCode === 2 ? false : null, event.Owner.IsLeavingFormality,
            true, null, null, RegionCode, event.Owner.IsRelatedCorporate,
            event.Owner.ProductRequestObject.CostFactorID, true, true).subscribe(res => {
              event.CurrentItems.forEach(el => {
                ResultList.push(el);
              });
              res.List.forEach(element => {
                element.IdentityNo = element.IdentityNo ? element.IdentityNo : element.ParentIdentityNo;
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
            type: 'supplier'
          });
        });
      }
      // AllowState = true RFC 53455
    }

  }

  FetchSupplerPersonByTerm(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      event.Owner.ProdReqPersonColDef[1].cellEditorParams.Params.loading = true;
      if (event.Owner.PRTypeParams.selectedObject) {
        let RegionCode = null;  // RFC 56993
        if (RegionCode > 210 && RegionCode < 219) {
          RegionCode = 210;
        }
        event.Owner.ProductRequest.GetRegionCodeByPRTypeCode(event.Owner.PRTypeParams.selectedObject).subscribe(ress => {
          if (ress) {
            RegionCode = ress;
          }
          // AllowState = true RFC 53455
          event.Owner.Actor.GetActorPaging(
            event.PageNumber,
            event.PageSize,
            event.term,
            event.SearchOption,
            event.Owner.SelectedPersonTypeCode === 1,
            event.Owner.IsLeavingFormality,
            true,
            null,
            null,
            RegionCode,
            event.Owner.IsRelatedCorporate,
            event.Owner.ProductRequestObject.CostFactorID,
            true,
            true).subscribe(res => {
              res.List.forEach(el => {
                el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
              });
              event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
                List: res.List,
                term: event.term,
                TotalItemCount: res.TotalItemCount,
                PageCount: Math.ceil(res.TotalItemCount / 30),
                type: 'supplier'
              });
            });
        });
      } else {
        let RegionCode = event.Owner.ProductRequestObject.RegionCode;
        if (RegionCode > 210 && RegionCode < 219) {
          RegionCode = 210;
        }
        // AllowState = true RFC 53455
        event.Owner.Actor.GetActorPaging(
          event.PageNumber,
          event.PageSize,
          event.term,
          event.SearchOption,
          event.Owner.SelectedPersonTypeCode === 1,
          event.Owner.IsLeavingFormality,
          true,
          null,
          null,
          RegionCode,
          event.Owner.IsRelatedCorporate,
          event.Owner.ProductRequestObject.CostFactorID,
          true,
          true).subscribe(res => {
            res.List.forEach(el => {
              el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
            });
            event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
              List: res.List,
              term: event.term,
              TotalItemCount: res.TotalItemCount,
              PageCount: Math.ceil(res.TotalItemCount / 30),
              type: 'supplier'
            });
          });
      }
    }

  }

  onSupplercellEditingStarted(event) {
    this.RequestSupplierApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.SelectedPersonTypeCode = node.data.PersonTypeCode;
      }
    });
    if (event.colDef && event.colDef.field === 'ActorIdentityName') {
      if (this.PRTypeParams.selectedObject) {
        let RegionCode = null;  // RFC 56993
        if (RegionCode > 210 && RegionCode < 219) {
          RegionCode = 210;
        } //  RFC 50794
        this.ProductRequest.GetRegionCodeByPRTypeCode(this.PRTypeParams.selectedObject).subscribe(ress => {
          if (ress) {
            RegionCode = ress;
          }
          // AllowState = true RFC 53455
          this.RequestSupplierColDef[2].cellEditorParams.Params.loading = true;
          this.Actor.GetActorPaging(1, 30, '', '', event.data.PersonTypeCode === 1, this.IsLeavingFormality, true,
            event.data.ActorID, null, RegionCode, this.IsRelatedCorporate,
            this.ProductRequestObject.CostFactorID, true, true).subscribe(res => {
              res.List.forEach(el => {
                el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
              });
              this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
                List: res.List,
                TotalItemCount: res.TotalItemCount,
                PageCount: Math.ceil(res.TotalItemCount / 30),
                type: 'supplier'
              });
            });
        });
      } else {
        let RegionCode = this.ProductRequestObject.RegionCode;
        if (RegionCode > 210 && RegionCode < 219) {
          RegionCode = 210;
        }
        this.RequestSupplierColDef[2].cellEditorParams.Params.loading = true;
        this.Actor.GetActorPaging(1, 30, '', '', event.data.PersonTypeCode === 1, this.IsLeavingFormality, true,
          event.data.ActorID, null, RegionCode, this.IsRelatedCorporate,
          this.ProductRequestObject.CostFactorID, true, true).subscribe(res => {
            res.List.forEach(el => {
              el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
            });
            this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
              List: res.List,
              TotalItemCount: res.TotalItemCount,
              PageCount: Math.ceil(res.TotalItemCount / 30),
              type: 'supplier'
            });
          });
      }
    }
  }

  onSupplercellvaluechanged(event) {
    if (event.colDef && event.colDef.field === 'PersonTypeName') {
      if (event.newValue && event.newValue.PersonTypeCode) {
        const itemsToUpdate = [];
        this.RequestSupplierApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.PersonTypeCode = event.newValue.PersonTypeCode;
            node.data.ActorID = null;
            node.data.ActorName = '';
            node.data.ActorIdentityName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierApi.updateRowData({ update: itemsToUpdate });
      } else {
        const itemsToUpdate = [];
        this.RequestSupplierApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = null;
            node.data.ActorName = '';
            node.data.ActorIdentityName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierApi.updateRowData({ update: itemsToUpdate });
      }
    }
    if (event.colDef && event.colDef.field === 'ActorIdentityName') {
      if (event.newValue && (event.newValue.ActorId || event.newValue.IdentityNo)) {
        const itemsToUpdate = [];
        this.RequestSupplierApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = event.newValue.ActorId;
            node.data.IdentityNo = event.newValue.IdentityNo;
            node.data.PersonIdentityNo = event.newValue.PersonIdentityNo;
            node.data.CorporateIdentityNo = event.newValue.CorporateIdentityNo;
            node.data.BirthDate = event.newValue.BirthDate;
            node.data.CorporateTypeCode = event.newValue.CorporateTypeCode;
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierApi.updateRowData({ update: itemsToUpdate });
      }
    }
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'PersonName') {
      // tslint:disable-next-line:max-line-length
      // this.ProdReqPersonColDef[1].cellEditorParams.Items =   this.ProductRequest.GetUnitPatternByRegion(this.ProductRequestObject.RegionCode);
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.RequestSupplierColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'حقيقي / حقوقي',
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
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'کد ملي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام و نام خانوادگي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'کد ملي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام و نام خانوادگي';
            } else {
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 11;
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام';
            }
            return true;
          } else {
            params.data.PersonTypeName = null;
            params.data.PersonTypeCode = null;
            return false;
          }
        },
        editable: () => {
          return this.IsSupplierFinalEditable;
        },
        width: 110,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorIdentityName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreSupplerPerson,
          FetchByTerm: this.FetchSupplerPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorIdentityName;
          } else {
            return '';
          }
        },
        editable: () => {
          return this.IsSupplierFinalEditable;
        },
        width: 350,
        resizable: true
      },
    ];



    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });

    $('#div3').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });
  }
  onChangeContractType(TypeCode) {

    this.CoulumnsDefinition(TypeCode);
    if (((this.ModuleCode === 2793 && this.PopupParam && this.PopupParam.ModuleViewTypeCode === 100000)
      || (this.ModuleCode === 2824 && this.PopupParam && this.PopupParam.ModuleViewTypeCode === 300000))
      && (TypeCode === 2 || this.DealMethodParams.selectedObject === 11)) { // RFC 58009
      this.IsConsultant = true;
    } else {
      this.IsConsultant = false;
      // this.ConsultantSelectCode = null;
      // if ((this.DealMethodSelectedCode == null || this.DealMethodSelectedCode != 11) ||
      //   (this.ConsultantSelectCode == null || this.ConsultantSelectCode != 3)) {
      //   this.DisableConsultantSelectWayLable = true;
      // } else {
      //   this.DisableConsultantSelectWayLable = false;
      // }
      this.ConsultantSelectTypeParams.selectedObject = null;
      this.ConsultantSelectedWayParams.selectedObject = null;
    }
    if (TypeCode === 2 || TypeCode === 26 || TypeCode === 27 || TypeCode === 28 || TypeCode === 29) { // 62341
      if ((this.ModuleCode === 2730 && this.PopupParam
        && (this.PopupParam.ModuleViewTypeCode === 1 || this.PopupParam.ModuleViewTypeCode === 89)) // RFC 65724
        || (this.ModuleCode === 2793 && this.PopupParam && this.PopupParam.ModuleViewTypeCode === 100000)) {
        this.IsConsultant = true;
      } else {
        this.IsConsultant = true;
        this.ItemDisable = true;
      }
    }
    if (this.ProductRequestObject.RegionCode !== 200 &&
      // (this.ProductRequestObject.RegionCode === 0 ||
      (TypeCode === 26 ||
        TypeCode === 27 || TypeCode === 28 ||
        TypeCode === 29)) {
      this.ProductRequest.GetProductRequestItemList(this.CostFactorID)
        .subscribe(res => {
          this.ProductRequestItemList = [];
          this.ProdReqItemrowData2 = res;
          if (TypeCode !== this.ProductRequestObject.ContractTypeCode) {
            this.ProdReqItemrowData2.forEach(element => {
              element.Weight = null;
              element.RequestPersonEstimateList = [];
            });
            const rowData = [];
            this.ProdReqPersonApi.forEachNode(function (node) {
              rowData.push(node.data);
            });
            this.ProdReqPersonApi.updateRowData({ remove: rowData });
          }
          res.forEach((item) => {
            const obj = {
              ProductRequestItemID: item.ProductRequestItemID,
              ProductRequestItemAmount: item.ProductRequestItemAmount,
              ProductRequestEstimateList: item.ProductRequestEstimateList,
            };
            this.ProductRequestItemList.push(obj);
          });
        });
      this.HaveAdviceTab = true;
    } else {
      this.HaveAdviceTab = false;
    }
    // tslint:disable-next-line: max-line-length
    if ((this.PRTypeParams.selectedObject === 1 || (this.PRTypeParams.selectedObject === 4 && this.ProductRequestObject.RegionCode === 22))
      && (TypeCode === 2 || TypeCode === 26 || TypeCode === 27
        || TypeCode === 28 || TypeCode === 29 || TypeCode === 4)) {
      // TypeCode === 4 RFC 50187
      this.IsDevelopment = false;
      // tslint:disable-next-line: max-line-length
    } else if (this.PRTypeParams.selectedObject === 1 || (this.PRTypeParams.selectedObject === 4 && this.ProductRequestObject.RegionCode === 22)) {
      this.IsDevelopment = true;
    }

    // tslint:disable-next-line: max-line-length
    if ((this.PRTypeParams.selectedObject === 1 || (this.PRTypeParams.selectedObject === 4 && this.ProductRequestObject.RegionCode === 22)) && ((this.ProductRequestObject.DealMethodCode === 7 && this.Article31Params.selectedObject === 722)
      || (this.ProductRequestObject.DealMethodCode === 7 && this.Article31Params.selectedObject !== 849))) {
      this.IsDevelopment = false;
    }
    if (this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22) { // مناطق 22 گانه
      if (TypeCode === 4) { // 61902
        if (this.PRTypeParams.selectedObject === 1 && this.ProductRequestObject.IsCost) {
          this.IsForcePriceList = false;
          this.RankParams.Required = false;
          this.PriceListTopicRasteParams.Required = false;
          this.PriceListTopicRasteParams.selectedObject = null;
          this.RankParams.selectedObject = null;
        }
      } else { // اگر نوع قرارداد خرید نباشد
        if (this.PRTypeParams.selectedObject === 1) { // عمرانی
          if (this.ProductRequestObject.IsCost) {
            this.IsDevelopment = true; // اجبار متره
          }
          this.IsForcePriceList = true; // اجبار رسته و رتبه
          this.RankParams.Required = true;
          this.PriceListTopicRasteParams.Required = true;
          this.RequiredComponents =
            [
              this.RankParams,
              this.PriceListTopicRasteParams
            ];
        }
        if (this.PRTypeParams.selectedObject === 4) { // حمل و نقل و ترافیک
          this.IsForcePriceList = true;
          this.RankParams.Required = true;
          this.PriceListTopicRasteParams.Required = true;
          this.RequiredComponents =
            [
              this.RankParams,
              this.PriceListTopicRasteParams
            ];
        }
      }
    } else { // 62768
      if ((this.PopupParam.ModuleViewTypeCode === 1 || this.PopupParam.ModuleViewTypeCode === 89 ||
        this.PopupParam.ModuleViewTypeCode === 99 || this.PopupParam.ModuleViewTypeCode === 114 ||
        this.PopupParam.ModuleViewTypeCode === 165) && this.ProductRequestObject.IsCost) {
        this.PRTypeParams.Required = true;
        if (this.PRTypeParams.selectedObject === 4 || this.PRTypeParams.selectedObject === 1) {
          this.IsForcePriceList = true; // اجبار رسته و رتبه
          this.RankParams.Required = true;
          this.PriceListTopicRasteParams.Required = true;
          this.RequiredComponents =
            [
              this.RankParams,
              this.PriceListTopicRasteParams
            ];
        }
      }
    }
    if (TypeCode === 19 && (this.PopupParam.ModuleViewTypeCode === 99)) {
      this.IsBuyService = true;
      this.supplierGridHeight = 90;
    } else if (TypeCode === 19
      && (this.PopupParam.ModuleViewTypeCode === 100000
        || this.PopupParam.ModuleViewTypeCode === 200000
        || this.PopupParam.ModuleViewTypeCode === 300000
        || this.PopupParam.ModuleViewTypeCode === 400000
        || this.PopupParam.ModuleViewTypeCode === 500000)) { // RFC = 50452
      this.IsBuyService = true;
      this.ISErrorBilldingSetting = true;
      this.supplierGridHeight = 90;
    } else {
      this.IsBuyService = false;
    }
    this.CoulumnsDefinition(TypeCode);

    // RFC 60364
    if (!this.ProductRequestObject.IsCost && TypeCode === 22 &&
      this.ProductRequestObject.ProductRequestItemList.length > 0) {
      let SumAmountCOEFPact = 0;
      this.ProductRequestObject.ProductRequestItemList.forEach(res => {
        if (res) {
          SumAmountCOEFPact = SumAmountCOEFPact + res.AmountCOEFPact;
        }
      });
      if (SumAmountCOEFPact === 1) {
        this.ProductRequest.GetDealMethodListByReionGroupCode(
          this.ProductRequestObject.IsCost,
          this.DealTypeCode,
          this.ProductRequestObject.RegionCode,
          this.ModuleCode,
          this.ProductRequestObject.DealMethodCode,
          TypeCode,
          this.ProductRequestObject.CostFactorID).forEach(ress => {
            if (ress) {
              this.DealMethodItems = ress;
            }
          });
      }
    }
  }

  CoulumnsDefinition(ContractTypeCode) {
    if (!ContractTypeCode || ContractTypeCode === 26 || ContractTypeCode === 29) {
      this.IsShowTwoGrid = true;
      this.GWidth = 200;
      this.GMaxWidth = 1000;
      this.WeightProdReqItemColDef = [
        {
          headerName: 'رديف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'کالا/خدمت',
          field: 'ProductName',
          editable: true,
          width: 300,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاريخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تاريخ پايان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'مبلغ',
          field: 'Amount',
          HaveThousand: true,
          width: 120,
          resizable: true
        }
      ];
    }

    if (ContractTypeCode && (ContractTypeCode === 27 || ContractTypeCode === 28)) {
      this.IsShowTwoGrid = false;
      this.GWidth = 1190;
      this.GMaxWidth = 1190;
      this.WeightProdReqItemColDef = [
        {
          headerName: 'رديف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'کالا/خدمت',
          field: 'ProductName',
          width: 300,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاريخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تاريخ پايان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'حق الزحمه',
          field: 'Amount',
          HaveThousand: true,
          width: 120,
          resizable: true,
        },
        {
          headerName: 'اهميت وزني',
          field: 'Weight',
          HaveThousand: true,
          width: 120,
          resizable: true,
          editable: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
      ];
    }
  }

  onPRItemRowClick(event) {
    this.selectedItemRow = event;
    this.IsPersonEditable = true;

    const rowData = [];
    this.ProdReqPersonApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.ProdReqPersonApi.updateRowData({ remove: rowData });

    if (!this.BeforePersonID) {
      this.ProdReqPersonrowData = event.data.RequestPersonEstimateList;
    }

    if (this.BeforePersonID && this.BeforePersonID !== event.data.ProductRequestItemID) {

      this.PRItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.BeforePersonID) {
          item.data.RequestPersonEstimateList = rowData;
        }

        if (item.data.ProductRequestItemID === event.data.ProductRequestItemID) {
          this.ProdReqPersonrowData = item.data.RequestPersonEstimateList;
        }
      });
    }

    if (this.BeforePersonID && this.BeforePersonID === event.data.ProductRequestItemID) {
      this.PRItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.BeforePersonID) {
          this.ProdReqPersonApi.updateRowData({ add: rowData });
        }
      });
    }

    this.BeforePersonID = event.data.ProductRequestItemID;

  }

  onAddPopUpBtnClick() {
    this.PopUpType = 'price-list-topic-dataentry-page';
    this.isClicked = true;
    this.startLeftPosition = 450;
    this.startTopPosition = 51;
    this.PopupParam = {
      Mode: 'AddNewPopUpMode',
      PriceListTypeCode: this.PriceListTypeParams.selectedObject,
      CostListFinYearCode: this.PriceListTopicParams.selectedObject,
      ModuleCode: this.ModuleCode
    };
  }

  btnClick(InputValue: any) {
    this.isClicked = true;
    switch (InputValue) {
      case 'app-excel-load-data':
        if (!this.PriceListTypeParams.selectedObject ||
          !this.PriceListTopicParams.selectedObject) {
          this.ShowMessageBoxWithOkBtn('ابتدا سال مبنا و نوع فهرست بها را مشخص نماييد.');
          return;
        }
        this.ExcelColDef = this.ProdReqEstColDef;
        this.ExcelColDef[2].editable = true;
        this.ExcelColDef[7].editable = false;
        this.PopupParam = {
          colDef2: this.ExcelColDef
        };
        this.PopUpType = 'app-excel-load-data';
        this.startLeftPosition = 400;
        this.startTopPosition = 200;
        break;
      case 'choose-report':
        this.PopUpType = 'choose-report-product-request-item';
        this.startLeftPosition = 400;
        this.startTopPosition = 200;
        this.PopupParam = {
          SelectedCostFactorID: this.CostFactorID,
          SelectedProductRequestItemID: this.SelectedProductRequestItemID ? this.SelectedProductRequestItemID : 0,
          RegionCode: this.ProductRequestObject.RegionCode,
          ModuleCode: this.ModuleCode
        };
        break;
      case 'Related':
        if (this.selectedEstimateRow == null) {
          this.PopUpType = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.startLeftPosition = 500;
          this.startTopPosition = 250;
        } else {
          this.PopUpType = 'related-price-list';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.startLeftPosition = 240;
          this.startTopPosition = 10;
          this.RLPopupParam = {
            HeaderName: 'ردیف مرتبط',
            RowSelected: this.selectedEstimateRow.data,
            ModuleCode: this.ModuleCode,
            Mode: 'ProductRequestEstimateMode',
          };
        }
        break;
      case 'archive-order-item': {
        this.PopUpType = 'archive-details';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.startLeftPosition = 240;
        this.startTopPosition = 10;
        const doctypee = 721;
        const archiveOrderParam = {
          EntityID: this.SelectedProductRequestItemID ? this.SelectedProductRequestItemID : 0,
          TypeCodeStr: doctypee.toString() + '-',
          DocTypeCode: doctypee,
          ModuleCode: this.ModuleCode,
        };
        this.ArchiveParam = archiveOrderParam;
      }
        break;
      case 'archive-contract-estimate': {
        this.PopUpType = 'archive-details';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.startLeftPosition = 240;
        this.startTopPosition = 10;
        const doctype = 721;
        const archiveEstimateParam = {
          EntityID: this.selectedEstimateRow.data.ProductRequestEstimateID,
          TypeCodeStr: doctype.toString() + '-',
          DocTypeCode: doctype,
          ModuleCode: this.ModuleCode
        };
        this.ArchiveParam = archiveEstimateParam;
      }
        break;
      default:
        break;
    }
  }

  loadFromExcel(data) {// عدم رعايت بيزنس مربوط به بارگذاري فايل آقاي مجيديد برگشت به قبل طي درخواست 53401
    const VerifiedData: Array<any> = [];
    const PriceListCorrectionList: Array<any> = [];
    const priceListIDs = [];
    const priceListItemsss = [];
    data.forEach((item) => {
      // item.PriceListNo.length === 8 : اين شرط رديف هايي که کدشون کمتر از 8 رقم باشد رو نمايش نميده
      if (item.PriceListNo.length === 8) {
        VerifiedData.push(item);
      }
    });
    VerifiedData.forEach((x: any) => {
      if (!x.PriceListName) {
        x.PriceListName = '';
      }
      if (x.PriceListNo !== undefined) {
        priceListIDs.push(x.PriceListNo);
        priceListItemsss.push(x);
      }
    });
    this.priceListIDsFinals = priceListItemsss;
    this.PriceList.GetPriceListTopicList(priceListIDs, this.PriceListTypeParams.selectedObject +
      this.PriceListTopicParams.selectedObject, null, null)
      .subscribe(res => {
        (res as any[]).forEach(item => {
          VerifiedData.filter(x => x.PriceListNo === item.PriceListTopicCode).forEach(i => {
            const ExcelName = i.PriceListName.replace(/ي/g, 'ي').replace(/ك/g, 'ک').trim();
            const DbName = item.PriceListTopicName.replace(/ي/g, 'ي').replace(/ك/g, 'ک').trim();
            if (ExcelName && ExcelName !== DbName && (item.IsStar === '*')) {
              i.IsInvalid = true;
              i.PriceListTopicCode = i.PriceListNo;
              i.ExcelPriceListTopicName = i.PriceListName;
              i.PriceListTopicName = item.PriceListTopicName;
              i.ExcelAmount = i.Amount;
              i.Amount = item.ProductReuestItemAmount;
              i.IsStar = item.IsStar;
              i.PriceListPatternID = item.PriceListPatternID;
              i.WorkUnitName = item.WorkUnitName;
              i.WorkUnitCode = item.WorkUnitCode;
              i.IsWork = item.IsWork;
              i.IsWorkCode = item.IsWorkCode;
              i.IsWorkCodeParam = item.IsWorkCode ? { WorkCode: 1, WorkName: 'کارکرد' } : { WorkCode: 0, WorkName: 'پايکار ' };
              i.Qty = i.Qty ? i.Qty : null;
              i.FinalAmount = i.WorkUnitCode === 106 ? (i.Qty * item.ProductReuestItemAmount) / 100 : i.Qty * item.ProductReuestItemAmount; // 60248
              PriceListCorrectionList.push(i);
            } else if (item.IsStar === '*' || item.IsStar === 'ف*') {
              i.PriceListName = item.PriceListTopicName;
              i.PriceListPatternID = item.PriceListPatternID;
              i.ProductRequestItemID = this.SelectedProductRequestItemID;
              i.ItemNo = 1;
              i.WorkUnitName = item.WorkUnitName;
              i.WorkUnitCode = item.WorkUnitCode;
              i.ProductReuestItemAmount = item.ProductReuestItemAmount;
              i.IsStar = item.IsStar;
              // i.Amount = item.Amount;
              i.Qty = i.Qty ? i.Qty : null;
              i.FinalAmount = i.WorkUnitCode === 106 ? (i.Qty * i.Amount) / 100 : i.Qty * i.Amount; // 60248
            } else {
              i.PriceListName = item.PriceListTopicName;
              i.PriceListPatternID = item.PriceListPatternID;
              i.ProductRequestItemID = this.SelectedProductRequestItemID;
              i.ItemNo = 1;
              i.WorkUnitName = item.WorkUnitName;
              i.WorkUnitCode = item.WorkUnitCode;
              i.ProductReuestItemAmount = item.ProductReuestItemAmount;
              i.IsStar = item.IsStar;
              i.Amount = item.Amount;
              i.Qty = i.Qty ? i.Qty : null;
              i.FinalAmount = i.WorkUnitCode === 106 ? (i.Qty * i.Amount) / 100 : i.Qty * i.Amount; // 60248
            }
          });
        });
        const DataToRemove = [];
        // tslint:disable-next-line:no-shadowed-variable
        this.ProdReqEstApi.forEachNode((res: any) => {
          const IsExists = VerifiedData.filter(x => x.PriceListNo === res.data.PriceListNo).length > 0;
          if (IsExists) {
            DataToRemove.push(res.data);
          }
        });
        this.ProdReqEstApi.updateRowData({ remove: DataToRemove });
        VerifiedData.forEach((x: any, i) => {
          if (!x.IsInvalid) {
            x['ItemNo'] = -1;
            this.ProdReqEstApi.updateRowData({ add: [x] });
          }
        });
        this.RefreshItemNo();
        if (PriceListCorrectionList.length > 0) {
          this.PopUpType = 'price-list-correction';
          this.isClicked = true;
          this.startLeftPosition = 100;
          this.startTopPosition = 10;
          this.PercentWidth = null;
          this.HaveHeader = true;
          this.PopupParam = {
            HeaderName: 'اصلاح فهرست بها',
            PriceListTypeCode: this.PriceListTypeParams.selectedObject,
            CostListFinYearCode: this.PriceListTopicParams.selectedObject,
            PriceListCorrectionList: PriceListCorrectionList,
            ModuleCode: this.ModuleCode
          };
        }
      });
  }

  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.ProdReqEstApi.forEachNode(function (node) {
      CurrItemNo++;
      node.data['ItemNo'] = CurrItemNo;
      itemsToUpdate.push(node.data);
    });
    this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
  }

  OnGroupBtnClick(event) {
    this.startLeftPosition = 60;
    this.startTopPosition = 10;
    this.PopupParam = {
      CostListFinYearCode: this.PriceListTopicParams.selectedObject,
      PriceListPatternID: this.PriceListPatternID,
      GroupSelected: true
    };
    this.PopUpType = 'editor-select-price-list';
    this.HaveMaxBtn = true;
    this.isClicked = true;
  }

  SetPriceListTopicList(Param) {
    const rowData = [];
    this.ProdReqEstApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.PriceList.GetPriceListTopicList(Param, this.PriceListTypeParams.selectedObject +
      this.PriceListTopicParams.selectedObject, null, null).subscribe(
        res => {
          if (res) {
            const itemsToUpdate = [];
            res.forEach(element => {
              MaxProp = MaxProp + 1;
              const newItem = {
                ItemNo: MaxProp,
                PriceListPatternID: element.PriceListPatternID,
                ProductRequestItemID: this.SelectedProductRequestItemID,
                PriceListNo: element.PriceListTopicCode,
                PriceListName: element.PriceListTopicName,
                WorkUnitName: element.WorkUnitName,
                WorkUnitCode: res[0].WorkUnitCode,
                Amount: element.Amount,
                IsStar: element.IsStar,
                IsStarCode: element.IsStarCode,
                Qty: 1,
                FinalAmount: res[0].WorkUnitCode === 106 ? (1 * element.Amount) / 100 : 1 * element.Amount // 60248
              };
              itemsToUpdate.push(newItem);
            });
            this.ProdReqEstApi.updateRowData({ add: itemsToUpdate });
          }
        }
      );
  }

  onContractClick() {
    this.PopUpType = 'product-request-contract';
    this.isClicked = true;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.HaveHeader = true;
    this.startLeftPosition = 65;
    this.startTopPosition = 10;
    this.HaveMaxBtn = true;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject
    };

  }
  FetchMoreContract(event) {
    event.Owner.ProdReqRelColDef[3].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ContractList.GetRelatedContractpaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        event.Owner.ProductRequestObject.RegionCode, event.Owner.FinYearCode, null).subscribe((res: any) => {
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
        type: 'related-contract'
      });
    });
  }

  FetchContractByTerm(event) {
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'LetterNo';
    }
    event.Owner.ProdReqRelColDef[3].cellEditorParams.Params.loading = true;
    event.Owner.ContractList.GetRelatedContractpaging(event.PageNumber, 30, event.term,
      event.SearchOption, event.Owner.ProductRequestObject.RegionCode, event.Owner.FinyearCode, null).
      subscribe((res: any) => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'related-contract'
        });
      });
    event.Owner.ProdReqRelColDef[3].cellEditorParams.Params.loading = false;
  }
  onContractcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'Subject') {
      this.ContractList.
        GetRelatedContractpaging(1, 30, '', null,
          this.ProductRequestObject.RegionCode,
          event.data.FinYearCode,
          event.data.RelatedContractID)
        .subscribe((res: any) => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'related-contract'
          });
        });
    } else if (event.colDef && event.colDef.field === 'FinYearCode') {
      this.FinYear.GetFinYearList()
        .subscribe((res: any) => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'rel-fin-year'
          });
        });
    }
  }
  rdoStartTypeClick(Type) {
    this.StartType = Type;
  }
  rdoAmountClick(Type) {
    this.AmountType = Type;
  }
  OnWorkStartDateChange(ADate) {
    this.WorkStartDate = ADate.MDate;
  }
  onSupplierSave() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دليل دسترسي فقط خواندني کاربر در اين واحد اجرايي وجود ندارد');
      return;
    }
    const RequestSupplierList = [];
    this.RequestSupplierApi.forEachNode(node => {
      const RequestSupplierObj = {
        RequestSupplierID: node.data.RequestSupplierID ? node.data.RequestSupplierID : -1,
        CostFactorID: this.ProductRequestObject.CostFactorID,
        ActorID: node.data.ActorID,
        CorporateTypeCode: node.data.CorporateTypeCode
      };
      RequestSupplierList.push(RequestSupplierObj);
    });

    if (this.IsArticle31Selected && RequestSupplierList.length !== 1) {
      this.ShowMessageBoxWithOkBtn(' يک طرف قرارداد را بايد انتخاب کنيد.');
      return;
    }

    this.ProductRequest.SaveRequestSupplier(this.ProductRequestObject.CostFactorID,
      RequestSupplierList)
      .subscribe(
        (res: any) => {
          this.PopupOutPut.emit(res);
          this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
        },
        err => {
          console.log(err);
          this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
        }
      );
  }

  onAutomationClick() {
    const LetterTypeCodeList = [];
    if (this.ShowLetterBtn && !(this.DealMethodParams.selectedObject === 2 && this.PopupParam.ModuleViewTypeCode !== 89)) { // RFC 59274
      LetterTypeCodeList.push(6);
      LetterTypeCodeList.push(25);
    } else {
      LetterTypeCodeList.push(this.LetterTypeCode);
    }
    this.isClicked = true;
    this.PopUpType = 'app-automation';
    this.HaveHeader = true;
    this.startLeftPosition = 107;
    this.startTopPosition = 9;
    this.MinHeightPixel = 300;
    this.LetterPopupParam = {
      CostFactorID: this.ProductRequestObject.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      LetterTypeCodeList: LetterTypeCodeList,
      OrganizationCode: this.ProductRequestObject.OrganizationCode,
      AutoClose: true,
      SaveMode: false,
      ReadOnlyMode: (this.ShowLetterBtn && !(this.DealMethodParams.selectedObject === 2 && this.PopupParam.ModuleViewTypeCode !== 89)) ? true : false,
    };
  }
  // onDeleteLetterClick(InputLetterTypeCode = null) {
  //   const CostFactorLetter = {
  //     CostFactorID: this.ProductRequestObject.CostFactorID,
  //     RegionCode: this.ProductRequestObject.RegionCode,
  //     LetterTypeCode: this.LetterTypeCode,
  //     OrganizationCode: this.ProductRequestObject.OrganizationCode,
  //   };
  //   this.Automation.DeleteLetter(CostFactorLetter).subscribe(res => {
  //     this.ShowMessageBoxWithOkBtn('حذف نامه با موفقيت انجام شد');
  //   },
  //     err => {
  //       this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
  //     });
  // }
  // onShowLetterClick(InputLetterTypeCode = null) {
  //   const CostFactorLetter = {
  //     CostFactorID: this.ProductRequestObject.CostFactorID,
  //     LetterTypeCode: this.LetterTypeCode,
  //   };
  //   this.Automation.ShowLetter(CostFactorLetter);
  // }
  // onCreateNewLetter(InputLetterTypeCode = null) {
  //   this.isClicked = true;
  //   this.PopUpType = 'send-letter-page';
  //   this.HaveHeader = true;
  //   this.startLeftPosition = 500;
  //   this.startTopPosition = 80;
  //   this.MinHeightPixel = 300;
  //   this.LetterPopupParam = {
  //     CostFactorID: this.ProductRequestObject.CostFactorID,
  //     RegionCode: this.ProductRequestObject.RegionCode,
  //     LetterTypeCode: this.LetterTypeCode,
  //     OrganizationCode: this.ProductRequestObject.OrganizationCode,
  //     AutoClose: true
  //   };
  // }

  onArchiveClick(type) {
    if (type) {
      switch (type) {
        case 'HeadquarterLicense':
          this.PopUpType = 'archive-details';
          this.HaveHeader = true;
          this.isClicked = true;
          this.HaveMaxBtn = false;
          this.startLeftPosition = 307;
          this.startTopPosition = 10;
          const doctype = 141;
          this.PopupParam = {
            EntityID: this.ProductRequestObject.CostFactorID,
            TypeCodeStr: doctype.toString() + '-',
            DocTypeCode: doctype,
            ModuleCode: this.ModuleCode,
            IsReadOnly: this.CheckRegionWritable,
            RegionCode: this.ProductRequestObject.RegionCode,
          };
          break;
        case 'BusDriving':
          this.PopUpType = 'archive-details';
          this.HaveHeader = true;
          this.isClicked = true;
          this.HaveMaxBtn = false;
          this.startLeftPosition = 307;
          this.startTopPosition = 10;
          const docType = 261;
          this.PopupParam = {
            EntityID: this.ProductRequestObject.CostFactorID,
            TypeCodeStr: docType.toString() + '-',
            DocTypeCode: docType,
            ModuleCode: this.ModuleCode,
            IsReadOnly: this.CheckRegionWritable,
            RegionCode: this.ProductRequestObject.RegionCode,
          };
          break;
        default:
          break;
      }
    }
  }
  IsGeneralTermClick(param) {
    this.IsGeneralTerm = param;
  }
  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    let SumFinalFAmount = 0;
    let SumFinalSAmount = 0;
    let SumFinalMAmount = 0;
    if (this.ProdReqEstApi) {
      this.ProdReqEstApi.forEachNodeAfterFilter(function (node) {
        if (node.data.FinalAmount) {
          SumFinalAmount = SumFinalAmount + node.data.FinalAmount;
        }
        if (node.data.IsStarCode != null && !isUndefined(node.data.IsStarCode) && node.data.IsStarCode === 0 && node.data.FinalAmount) {
          SumFinalFAmount = SumFinalFAmount + node.data.FinalAmount;
        }
        if (node.data.IsStarCode && (node.data.IsStarCode === 1 || node.data.IsStarCode === 3) && node.data.FinalAmount) {
          SumFinalSAmount = SumFinalSAmount + node.data.FinalAmount;
        }
        if (node.data.IsStarCode && node.data.IsStarCode === 2 && node.data.FinalAmount) {
          SumFinalMAmount = SumFinalMAmount + node.data.FinalAmount;
        }
      });
    }
    this.SumFinalEstimateAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalEstimateFAmount = SumFinalFAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalEstimateSAmount = SumFinalSAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalEstimateMAmount = SumFinalMAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  SetVWProductRequestItemData() {
    this.ActorControl = true;
    this.ProductRequest.GetProductRequestItemListVW(this.CostFactorID, this.ActorControl)
      .subscribe(res => {
        this.ProductRequestItemList = [];
        let SumAmount = 0;
        let SumAmountCOEF = 0;
        res.forEach((item) => {
          item.ProductRequestEstimateList.forEach((i) => {
            if (i.ProductRequestEstimateEntityItemList) {
              i.ProductRequestEstimateEntityItemList.forEach(
                EntityItem => {
                  let Name = 'Subject' + EntityItem.EntityTypeID.toString();
                  let ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();

                  i[Name] = EntityItem.Subject;
                  i[ID] = EntityItem.EntityTypeItemID;
                });
            }
          });

          const obj = {
            ProductRequestItemID: item.ProductRequestItemID,
            ProductRequestItemAmount: item.ProductRequestItemAmount,
            ProductRequestEstimateList: item.ProductRequestEstimateList,
          };
          this.ProductRequestItemList.push(obj);
          if (item.AmountCOEFPact) {
            SumAmount = SumAmount + item.AmountCOEFPact;
          }
          if (item.AmountCOEF) {
            SumAmountCOEF = SumAmountCOEF + item.AmountCOEF;
          }
        });
        this.ProdReqItemrowData = res;
        this.SumFinalItemAmount = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalItemAmountCOEF = SumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // this.ProdReqItemrowData.forEach(element => {
        //   this.EntityColumnDefinition(element);
        // });
      });
  }
  rdoIsBalancingClick(IsBalancing) {
    this.IsBalancing = IsBalancing;
    if (!IsBalancing) {
      this.SeasonListParams.selectedObject = null;
    }
  }
  onClickValidationNewCar(event) {
    this.IsValidationNewCar = event;
  }
  OnOpenNgSelect(Type, IsFill = true) {

    switch (Type) {

      case 'LineOperator':
        const LineOperatorID = this.ProductRequestObject && this.ProductRequestObject.PRLineSet
          && this.ProductRequestObject.PRLineSet.ActorID ? this.ProductRequestObject.PRLineSet.ActorID : null; // RFC 51364 & 51361
        this.LineOperatorParams.loading = true;
        const ResList = [];
        const promised = new Promise((resolve_res3, reject_res3) => {
          this.Actor.GetAllActorsPaging(1, 30, '', 'IdentityNo', false, false, false, LineOperatorID)
            .subscribe((res: any) => {
              this.LineOperatorItems = res.List;
              resolve_res3(res.TotalItemCount);
            });
        }).then((TotalItemCount: number) => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: this.LineOperatorItems,
            term: '',
            TotalItemCount: TotalItemCount,
            PageCount: Math.ceil(TotalItemCount / 30),
            type: 'Line-Operator',
          });
        });
        this.LineOperatorParams.loading = false;
        break;

      case 'PriceListTopicRaste':
        {
          if (this.PRTypeParams && this.PRTypeParams.selectedObject > 0) {
            if (this.PRTypeParams.selectedObject === 3) {
              this.Actor.GetPriceListTopicByBusinesPatternID(4924, false).subscribe(res => {
                this.PriceListTopicRasteItems = res;
                if (IsFill) {
                  this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
                  this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
                }
              });
            } else {
              this.PriceList.GetPLTListbyPRType(this.PRTypeParams.selectedObject).subscribe(ress => {
                this.PriceListTopicRasteItems = ress;
                if (IsFill) {
                  this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
                  this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
                }
              });
            }
          }
        }
        break;
      default:
        break;
    }
  }
  FetchMoreLineOperator(event) {
    this.LineOperatorParams.loading = true;
    const ResultList = [];

    const promised = new Promise((resolve, reject) => {
      this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
        , false, false, false, null).subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: '',
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Line-Operator',
      });
    });
  }

  doLineOperatorSearch(event) {
    this.LineOperatorParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'CustomerOrderID';
    }
    this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
      , false, false, false, null).subscribe((res: any) => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Line-Operator'
        });
      });
    this.LineOperatorParams.loading = false;
  }

  onContractOrderItemCoefClick() {
    if (!this.selectedPRItemRow.ProductRequestItemID) {
      this.ShowMessageBoxWithOkBtn('رديفي جهت مشاهده ضرايب انتخاب نشده است');
      return;
    }
    this.PopupParam = {
      CostFactorID: this.selectedPRItemRow.CostFactorID,
      ProductRequestItemID: this.selectedPRItemRow.ProductRequestItemID,
      ProductRequestObject: this.ProductRequestObject,
      CheckRegionWritable: this.CheckRegionWritable,
      ProductName: this.ProductName,
      ProductCode: this.ProductCode,
      Amount: this.Amount,
    };
    this.isClicked = true;
    this.PopUpType = 'product-request-item-coef';
    this.startLeftPosition = 74;
    this.startTopPosition = 19;
  }
  onCoefByProdreqItemClick() {
    if (!this.SelectedProductRequestItemID) {
      this.ShowMessageBoxWithOkBtn('رديفي جهت مشاهده ضرايب انتخاب نشده است');
      return;
    }
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      CheckRegionWritable: this.CheckRegionWritable,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      ProductRequestItemID: this.SelectedProductRequestItemID
    };
    this.isClicked = true;
    this.PopUpType = 'product-request-coef';
    this.startLeftPosition = 110;
    this.startTopPosition = 60;
  }

  ReturendCoefLevelCode(CoefLevelCode) {
    if (CoefLevelCode) {
      this.CoefLevelCode = CoefLevelCode;
      this.ProductRequestObject.CoefLevelCode = CoefLevelCode; // RFC 61094
    }
  }
  AddRelatedList(Param) {
    const rowData = [Param];
    this.ProdReqEstApi.updateRowData({ add: rowData });
  }
  rdoIsMaterialsDifferenceClick(IsMaterialsDifference) {
    this.IsMaterialsDifference = IsMaterialsDifference;
  }
  rdoHaveMaterialsClick(HaveMaterials) {
    this.HaveMaterials = HaveMaterials;
  }

  FetchMoreBeneficiaryPerson(event) {
    event.Owner.BeneficiaryColDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, false, false, true).subscribe(res => {
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
        type: 'Beneficiary'
      });
    });
  }

  FetchBeneficiaryPersonByTerm(event) {

    event.Owner.BeneficiaryColDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      false, false, true).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Beneficiary'
        });
      });
  }
  onBeneficiarycellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'ActorName') {
      this.BeneficiaryColDef[1].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', false, false, true, event.data.ActorID).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Beneficiary'
        });
      });
    }
  }
  onBeneficiarycellvaluechanged(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      if (event.newValue && event.newValue.ActorId) {
        const itemsToUpdate = [];
        this.BeneficiaryApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.CorporateID = event.newValue.ActorId;
            itemsToUpdate.push(node.data);
          }
        });
        this.BeneficiaryApi.updateRowData({ update: itemsToUpdate });
      }
    }
  }

  IsBaselineScrollingClick(param) {
    this.IsBaselineScrolling = param;
  }

  onChangePRType(TypeCode) {

    if (TypeCode === 1 || (TypeCode === 4 && this.ProductRequestObject.RegionCode === 22)) {
      this.IsDevelopment = true;
    } else {
      this.IsDevelopment = false;
    }

    if (TypeCode === 1) { // عمرانی
      if (this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22) { // مناطق 22 گانه
        if (this.ContractTypeParams.selectedObject !== 4 && this.ProductRequestObject.IsCost) { // خرید نباشد
          this.IsForcePriceList = true;
          this.IsDevelopment = true;
          this.RankParams.Required = true;
          this.PriceListTopicRasteParams.Required = true;
          this.RequiredComponents =
            [
              this.RankParams,
              this.PriceListTopicRasteParams
            ];
        } else if (this.ContractTypeParams.selectedObject === 4 && this.ProductRequestObject.IsCost) { // خرید باشد
          this.PriceListTopicRasteParams.selectedObject = null;
          this.RankParams.selectedObject = null;
          this.IsForcePriceList = false;
          this.RankParams.Required = false;
          this.PriceListTopicRasteParams.Required = false;
        }
      } else { // سایر مناطق
        this.IsForcePriceList = true;
        this.RankParams.Required = true;
        this.PriceListTopicRasteParams.Required = true;
        this.RequiredComponents =
          [
            this.RankParams,
            this.PriceListTopicRasteParams
          ];
      }
    } else if (TypeCode === 4) { // حمل و نقل و ترافیک
      this.IsForcePriceList = true;
      this.RankParams.Required = true;
      this.PriceListTopicRasteParams.Required = true;
      this.RequiredComponents =
        [
          this.RankParams,
          this.PriceListTopicRasteParams
        ];
    } else { // سایر انواع درخواست معامله
      this.PriceListTopicRasteParams.selectedObject = null;
      this.RankParams.selectedObject = null;
      this.IsForcePriceList = false;
      this.RankParams.Required = false;
      this.PriceListTopicRasteParams.Required = false;
    } // RFC 61902

    if ((TypeCode === 1 || TypeCode === 4) &&
      (this.PopupParam.ModuleViewTypeCode === 1 ||  // شهرداری
        this.PopupParam.ModuleViewTypeCode === 114 || this.PopupParam.ModuleViewTypeCode === 165 || this.PopupParam.ModuleViewTypeCode == 100000)  // سازمان حمل و نقل ترافیک
    ) {
      this.IsDisplay = true;
      this.DisableJobCategory = true;
      this.GeneralTermHeight = 58;
      this.EstimateTabHeight = 97;
    } else if (TypeCode === 3) {
      this.IsDisplay = false;
      this.DisableJobCategory = true;
      this.GeneralTermHeight = 58;
      this.EstimateTabHeight = 97;
    } else {
      this.IsDisplay = false;
      this.DisableJobCategory = false;
      this.GeneralTermHeight = 62;
      this.EstimateTabHeight = 100;
    }

    if (this.ProductRequestObject.RegionCode > 22 && (TypeCode === 1 || TypeCode === 4) &&
      this.IsCost && this.ProductRequestObject.RelatedContractID === null) {
      this.DisableJobCategory = true;
      this.IsDisplay = true;
    }


    // tslint:disable-next-line: max-line-length
    if ((this.DealMethodParams.selectedObject === 7 && (this.Article31Params.selectedObject === 849 || this.Article31Params.selectedObject === 722 || this.Article31Params.selectedObject === 584))
      || (this.DealMethodParams.selectedObject === 8 && this.Article31Params.selectedObject === 810)) {
      this.IsDevelopment = false;
    }

    if (this.DealMethodParams.selectedObject === 2 && this.PopupParam.ModuleViewTypeCode !== 89
      && (this.PopupParam.ModuleViewTypeCode === 1 || this.PopupParam.ModuleViewTypeCode === 165) &&
      this.PRTypeParams.selectedObject === 4) { // RFC 54283
      this.GeneralTermHeight = 48;
      this.EstimateTabHeight = 97;
    }
    if (this.PRTypeParams.selectedObject === 4 ||
      this.PRTypeParams.selectedObject === 1 ||
      this.PRTypeParams.selectedObject === 3) {
      this.PriceListTopicRasteParams.selectedObject = null;
      this.RankParams.selectedObject = null;
    }
  }

  oncellEstimateEditingStarted(event) {
    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, null, null, this.selectedPRItemRow.ProductRequestItemID)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });
    }
    if (event.colDef && event.colDef.field === 'IndexPriceListTopicName') {
      if (this.PriceListTypeParams.selectedObject === null || this.PriceListTypeParams.selectedObject === '01') {
        this.ShowMessageBoxWithOkBtn('نوع فهرست بهای نظام اجرایی فنی و عمرانی باید انتخاب شود.');
        return;
      } else {
        this.ProductRequest.GetIndexPriceList(this.PriceListTopicParams.selectedObject).subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'index-price'
          });
        });
      }
    }
  }

  EntityColumnDefinition(selectedPRItemRow) {
    // if (selectedPRItemRow && selectedPRItemRow.PRIEntityList && selectedPRItemRow.PRIEntityList.length > 0) {
    //   var columnDef22 = [];
    //   this.ProdReqEstColDef.forEach(element => {
    //     columnDef22.push(element);
    //   });
    //   this.ProdReqEstColDef = [];

    //   selectedPRItemRow.PRIEntityList.forEach(i => {
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

    //   this.ProdReqEstColDef = columnDef22;
    // }
  }
  IsLawfulRedioClick(IsLawful) {
    this.IsLawful = IsLawful;
  }
  IsRenewalRadioClick(IsRenewal) {
    this.IsRenewal = IsRenewal;
  }
  IsYesRedioClick(Type) {
    this.IsYes = Type;
  }
  IsReturnRedioClick(IsReturn) {
    this.IsReturn = IsReturn;
  }
  SaveRenewalIsReturnHaveWinner() {
    let InquiryID = 0;
    if (this.ProductRequestObject.LastInquiryObject &&
      this.ProductRequestObject.LastInquiryObject.InquiryID > 0) {
      InquiryID = this.ProductRequestObject.LastInquiryObject.InquiryID;
    }
    this.ProductRequest.SaveRenewalIsReturnHaveWinner(
      this.CostFactorID,
      this.IsRenewal,
      InquiryID,
      this.IsReturn, // RFCS 56880
      this.IsYes,
      this.ModuleCode,
      this.PopupParam.OrginalModuleCode
    ).subscribe(res => {
      this.ProductRequestObject.LastInquiryObject.IsReturn = this.IsReturn; // RFCS 56880
      this.ShowMessageBoxWithOkBtn('پاسخ سوالات با موفقیت ثبت شد');
    });
  }

  SetProdReqEstimateCol(ShowIndex) {
    this.ProdReqEstColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'رديف فهرست بها',
        field: 'PriceListNo',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از فهرست بها',
        cellEditorParams: {
          SearchPopupType: 'editor-select-price-list',
          PopupParam: { CostListFinYearCode: this.PriceListTopicParams.selectedObject, PriceListPatternID: this.PriceListPatternID }
        },
        cellRenderer: 'SeRender',
        valueFormatter: (params) => {
          if (params.value) {
            return params.value[0].PriceListTopicCode;
          } else {
            return '';
          }
        },
        editable: true,
        width: 170,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'رشته',
        field: 'IndexPriceListTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.IndexPriceListPatternParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.IndexPriceListTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.IndexPriceListTopicName) {
            params.data.IndexPriceListTopicName = params.newValue.IndexPriceListTopicName;
            params.data.IndexPriceListPatternID = params.newValue.IndexPriceListPatternID;
            return true;
          } else {
            params.data.IndexPriceListTopicName = '';
            params.data.IndexPriceListPatternID = null;
            return false;
          }
        },
        width: 120,
        resizable: true,
        editable: true,
        hide: !ShowIndex,
      },
      {
        headerName: 'نوع رديف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'WorkUnitName',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        HaveThousand: true,
        width: 80,
        resizable: true,
        editable: (params) => {
          return (params.data.IsStarCode === 1 || params.data.IsStarCode === 3 ||
            // tslint:disable-next-line: max-line-length
            (!isUndefined(params.data.IsStarCode) && params.data.IsStarCode != null && params.data.IsStarCode === 0 && (params.data.IsStar === 'ف*' || params.data.IsStar === '*ف')));
        }
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: true,
        // cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
          HaveThousand: true
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: false,
        // cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
          HaveThousand: true
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ با احتساب ضریب ردیف',
        field: 'FinalAmountCoef',
        HaveThousand: true,
        width: 170,
        resizable: true,
        valueParser: numberValueParser
      },
      {
        headerName: 'ضریب ردیف',
        field: 'Coef',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: false,
        valueParser: numberValueParser
      },
    ];
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
  }

  onShowInputFormulaPage() {
    this.PopUpType = 'adjustment-price-range-formulas-input';
    this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 300;
    this.startTopPosition = 150;
    this.HaveMaxBtn = false;
    this.MainMaxwidthPixel = 600;
    this.MinHeightPixel = 200;
    this.PopupParam = {
      HeaderName: 'ورود اطلاعات پایه پیش نویس کمیسیون',
      ProductRequestObject: this.ProductRequestObject,
      OrderCommitionID: this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject
        && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID > 0
        ? this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID : null,
    };
  }

  btnSignReturnClick() {
    if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject
      && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID > 0
      //&& this.ProductRequestObject.LastInquiryObject.IsReturn == false
    ) {
      this.ArchiveList.ReturnArchiveDetailToLast(this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('بازگشت امضای صورتجلسه با موفقیت انجام شد');
      });
    }
  }

  onProxyContractClick() {
    this.PopUpType = 'proxy-contract-list';
    this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 20;
    this.startTopPosition = 20;
    this.HaveMaxBtn = false;
    this.MainMaxwidthPixel = 600;
    this.MinHeightPixel = 600;
    this.PopupParam = {
      ProxyContract: true,
      RegionCode: this.ProductRequestObject.RegionCode,
      OrginalModuleCode: this.OrginalModuleCode ? this.OrginalModuleCode : this.ModuleCode
    };
  }
}
