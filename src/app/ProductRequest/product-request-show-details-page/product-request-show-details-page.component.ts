import { Component, OnInit, Output, EventEmitter, Input, TemplateRef, ViewChild } from '@angular/core';
import { of, forkJoin } from 'rxjs';
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
import { ActivatedRoute } from '@angular/router';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { isUndefined } from 'util';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-product-request-show-details-page',
  templateUrl: './product-request-show-details-page.component.html',
  styleUrls: ['./product-request-show-details-page.component.css']
})
export class ProductRequestShowDetailsPageComponent implements OnInit {
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  @ViewChild('IsValidity') IsValidity: TemplateRef<any>;
  @Output() ProductRequestShowDetailsPageClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupParam;
  ReceiveDocEnable;
  MultiQuestionLabel;
  MultiQuestion = false;
  HasProposalItem = false;
  HaveReceiveDoc = false;
  WarrantyDocGridHeight;
  ReceiveDocRowData = <any>[];
  SelectedReceiveDocID;
  Editable = true;
  ReceiveDocGridApi;
  tabpanelWarrantyDocHeight = 83;
  DisableAll: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  DurationDay;
  MCSRadioTypes: Array<RadioBoxModel> = [];
  ScRadioTypes: Array<RadioBoxModel> = [];
  McRadioTypes: Array<RadioBoxModel> = [];
  Article31subject;
  CheckRegionWritable;
  RegionItems;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  DurationMonth;
  DurationYear;
  HaveHeader;
  HasBtnAutomationLetter = true;
  AutomationLetterBtnText = 'اتصال نامه';
  currentRegionObject;
  CostFactorID;
  ShowMutualContractDetails = false;
  MutualContractQuestion = '';
  TabContentHeight = 63;
  SupplierGridHeight = 88;
  PrdReqRelGridHeight = 88;
  RelationTabPanelHeight = 100;
  consultationTabPanelHeight = 100;
  consultationPrdReqItemHeight = 90;
  consulationProdReqPersonColDef = 88;
  TabPanelChildHeight = 100;
  PrdReqItemBoxDevHeight = 87;
  PrdReqItemGridHeight = 85;
  PrdReqEstGridHeight = 85;
  EstimateTabPanelHeight = 90;
  SupplierTabPanelHeight = 100;
  isClicked = false;
  CheckBoxStatus = true;
  SelectedPersonTypeCode: number;
  IsEditable = false;
  ContractTypeItems;
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
  DealMethodItems;
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
  IsArticle31Selected = false;
  Article31Items;
  Article31Params = {
    bindLabelProp: 'Article31Name',
    bindValueProp: 'Article31ID',
    placeholder: '',
    selectedObject: null,
    loading: false,
    MinWidth: '155px',
    IsVirtualScroll: false,
    Required: this.IsArticle31Selected
  };
  PriceListTopicItems;
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicCode',
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
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: !this.CheckBoxStatus
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
  IsRegiondisable = false;
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
  SelectedSupplier;
  JobCategoryTitle = null;
  ContractorCapacity = null;
  JobCategoryGroup;
  RequestSupplierColDef;
  ProdReqRelColDef;
  ProdReqPersonColDef;
  ProdReqRelList = [];
  ProdReqItemrowData;
  ProdReqEstList = [];
  ProdReqPersonrowData = [];
  ProdReqItemColDef;
  ProdReqEstColDef;
  RequestSupplierList = [];
  ProductRequestObject;
  PopUpType;
  startLeftPosition;
  startTopPosition;
  NgSelectVSParams = {
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
    type: 'supplier',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
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
  DealTypeCode;
  DealTypeName;
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
  HaveMaxBtn;
  SelectedProductRequestItemID: any;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  IsDisable = false;
  IsCost: any;
  PersonTypeList: any;
  CheckValidate = false;
  WorkStartDate;
  StartType = 1;
  AmountType = false;
  ModuleCode;
  RequiredComponents = [this.DealMethodParams, this.Article31Params, this.ContractTypeParams];
  IsSupplierEditable = false;
  HasSupplierSave = false;
  MinHeightPixel = null;
  HaveSupplier = false;
  HaveConsultation = false;
  HaveEstiamte = false;
  ShowProvisionRep = false;
  SumFinalEstimateAmount = '0';
  CostCenterCode: any;
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

  IsDevelopment = false;
  IntModuleCode: number;
  SumFinalItemAmount = '0';
  ActorControl;
  ShowContractorDetails = false;
  ProductRequestItemList = [];
  IsBalancing;
  SeasonListItems: any;
  SeasonListParams = {
    bindLabelProp: 'SeasonName',
    bindValueProp: 'SeasonCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  PageModuleCode; // RFC 50600
  BeneficiaryList = [];
  BeneficiaryGridHeight = 80;
  HasBeneficiary = false;
  BeneficiaryApi;
  BeneficiaryColDef;
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
        [{ HeaderCaption: 'شناسه ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام شرکت', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه ملی', width: 35, },
        { HeaderCaption: 'نام شرکت', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  IsBaselineScrolling = false;
  IsContractType19 = false;
  ISErrorBilldingSetting = false;
  HalWayThrough;
  HalfWayBack;
  RateperKilometerEstimate;
  TicketRates;
  AverageNumberTransactions;
  NumberPassengersMonthly;
  TotalMonthlyPassenger;
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
        { HeaderCaption: 'شناسه ملی', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 1, SearchOption: 'IdentityNo' }, // RFC 51361
        { HeaderCaption: 'نام', HeaderName: 'CorporateName', width: 53, MinTermLenght: 3, SearchOption: 'CorporateName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 30, },
        { HeaderCaption: 'شناسه ملی', width: 35, }, // RFC 51361
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
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
  HeightPercentWithMaxBtn = 95;
  OverMainMinwidthPixel;
  ReceiveDocColDef = [];
  TabRahbari = false;
  QuestionLabel;
  WinnerQuestion = null;
  ReNewQuestion;
  IsLawful;
  IsWarrantyValidity;
  IsYes = true;
  IsRenewal = false;
  IsShowContractContent = false;
  IsContractContent = false;
  ContractContentNote;
  PRProvisionRepBtnText = 'چاپ پیشنهاد تامین اعتبار';
  ProposalBtnText = 'سوابق کمیسون';
  ProvisionBtnText = 'پیشنهاد بودجه';
  ContractorDetailsBtnText = 'مشاهده اطلاعات پیمانکار';
  ParentDocType = 38;
  ModuleViewTypeCode;
  ArchiveBtnText = 'مستندات';
  FilterDocumentTypeCodeList = [];
  ContractParams = {
    bindLabelProp: 'SelectedSubject',
    bindValueProp: 'ContractId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: false,
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
  BoardDecisionsDec = '';
  OtherInfo = false;
  HasTripleReport = false;

  constructor(private ProductRequest: ProductRequestService,
    private ArchiveList: ArchiveDetailService,
    private ContractList: ContractListService,
    private RegionList: RegionListService,
    private Actor: ActorService,
    private PriceList: PriceListService,
    private route: ActivatedRoute,
    private RefreshCartable: RefreshServices,
    private RefreshPersonItems: RefreshServices,
    private Report: ReportService,
    private Automation: AutomationService) {
    this.route.params.subscribe(params => { // RFC 50600
      this.PageModuleCode = +params['ModuleCode'];
    });
    this.PersonTypeList = [{ PersonTypeName: 'حقیقی', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقی', PersonTypeCode: 2 }];
    this.CalculationMethodItems =
      [
        { CalculationMethodName: 'روش A پیمایشی', CalculationMethodCode: 1 },
        { CalculationMethodName: 'روش AA پیمایشی', CalculationMethodCode: 2 },
        { CalculationMethodName: 'روش AAA پیمایشی', CalculationMethodCode: 3 },
        { CalculationMethodName: 'روش B پیمایشی مبنا', CalculationMethodCode: 4 }
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
    this.RequestSupplierColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
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
        editable: () => {
          return !this.DisableAll;
        },
        width: 110,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
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
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        editable: () => {
          return !this.DisableAll;
        },
        width: 300,
        resizable: true
      },
    ];
    this.ProdReqRelColDef = [
      {
        headerName: 'ردیف',
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
        editable: () => {
          return !this.DisableAll;
        },
        width: 300,
        resizable: true
      },
      { // RFC 52241
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        editable: () => {
          return !this.DisableAll;
        },
        width: 100,
        resizable: true
      },
      {
        headerName: 'کد قرارداد',
        field: 'ContractCode',
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
        editable: () => {
          return !this.DisableAll;
        },
        width: 300,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: () => {
          return !this.DisableAll;
        },
        width: 300,
        resizable: true
      },
    ];
    this.ProdReqItemColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductName',
        editable: () => {
          return !this.DisableAll;
        },
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
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: () => {
          return !this.DisableAll;
        },
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        editable: () => {
          return !this.DisableAll;
        },
        HaveThousand: true,
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: () => {
          return !this.DisableAll;
        },
        width: 450,
        resizable: true
      },
      {
        headerName: 'مبلغ متره',
        field: 'Amount',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ متره با ضرایب ردیف',
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
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ردیف فهرست بها',
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
        editable: () => {
          return !this.DisableAll;
        },
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
        headerName: 'نوع ردیف',
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
        resizable: true
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: () => {
          return !this.DisableAll;
        },
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
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: () => {
          return !this.DisableAll;
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      }
    ];
    this.ProdReqPersonColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' کسب وکار ',
        field: 'BusinessPatternName',
        editable: () => {
          return !this.DisableAll;
        },
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
        headerName: 'سال تحصیل',
        field: 'EducationYear',
        width: 250,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'سال تجربه',
        field: 'ExperienceYear',
        width: 100,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'حقوق ماهانه',
        field: 'Amount',
        width: 150,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'ضریب سرپرستی',
        field: 'ManagementCOEF',
        width: 100,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'ضریب فارغ التحصيل ممتاز',
        field: 'TopGraduated',
        width: 160,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'مدت (ماه)',
        field: 'Qty',
        width: 90,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'حاصلضرب ضرایب',
        field: 'MultiplyTheCoefficients',
        width: 150,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      },
      {
        headerName: 'حق الزحمه کل',
        field: 'S',
        width: 200,
        HaveThousand: true,
        editable: () => {
          return !this.DisableAll;
        },
        resizable: true
      }
    ];
    this.WeightProdReqItemColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductName',
        editable: () => {
          return !this.DisableAll;
        },
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
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: () => {
          return !this.DisableAll;
        },
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        editable: true,
        HaveThousand: true,
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: () => {
          return !this.DisableAll;
        },
        width: 450,
        resizable: true
      },
      {
        headerName: 'مبلغ متره',
        field: 'Amount',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ متره با ضرایب ردیف',
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
    this.BeneficiaryColDef = [
      {
        headerName: 'ردیف',
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
  FormMode(DisableAll: boolean) {
    this.DisableAll = DisableAll;
  }
  ngOnInit() {
    // Lock Or Unlock Everything Thats Editable, Including (inputs,datepickers, ngVirtuals ,grids[editable,IsDisable] and etc).
    this.FormMode(true);
    // true for Lock, false for Unlock

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.ModuleCode = this.PopupParam.ModuleCode;
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.CheckRegionWritable = this.PopupParam && this.PopupParam.IsRegionReadOnly;
    this.BoardDecisionsDec = this.ProductRequestObject.BoardDecisions;
    this.OtherInfo = this.PopupParam.ProductRequestObject.RegionObject.RegionGroupCode == 3 ? true : false; //RFC 59274
    switch (this.ProductRequestObject.RegionCode) {
      case 200:
        this.MCSRadioTypes.push(new RadioBoxModel('منعقد شده', 1, false, 'rdomcs1_ShowDetail'));
        this.MCSRadioTypes.push(new RadioBoxModel('در دست انعقاد', 2, false, 'rdomcs2_ShowDetail'));
        this.MCSRadioTypes.push(new RadioBoxModel('درخواست فرجه تا انتقاد', 3, false, 'rdomcs3_ShowDetail'));
        this.ScRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoSc1_ShowDetail'));
        this.ScRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoSc2_ShowDetail'));
        this.McRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoMc1_ShowDetail'));
        this.McRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoMc2_ShowDetail'));
        this.ShowMutualContractDetails = true;
        this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد درآمدی متقابل دارد؟';
        this.PrdReqItemBoxDevHeight = 79;
        this.TabContentHeight = 39;
        this.PrdReqRelGridHeight = 60;
        this.PrdReqItemGridHeight = 65;
        this.PrdReqEstGridHeight = 65;
        this.EstimateTabPanelHeight = 82;
        this.RelationTabPanelHeight = 100;
        this.consultationTabPanelHeight = 100;
        this.consultationPrdReqItemHeight = 75;
        this.consulationProdReqPersonColDef = 75;
        this.SupplierTabPanelHeight = 100;
        this.SupplierGridHeight = 70;
        this.HasBeneficiary = true;
        this.BeneficiaryList = this.ProductRequestObject.BeneficiaryList;
        break;
      case 222:
        this.PrdReqItemBoxDevHeight = 85;
        this.TabContentHeight = 52;
        this.IsShowContractContent = true;
        this.ParentDocType = 46;
        this.ProposalBtnText = 'کمیسیون';
        this.ProvisionBtnText = 'بودجه';
        this.AutomationLetterBtnText = 'نامه';
        this.ContractorDetailsBtnText = 'پیمانکار';
        this.PRProvisionRepBtnText = 'چاپ پیشنهاد تامین';
        // tslint:disable-next-line:no-shadowed-variable
        new Promise((resolve, reject) => {
          this.GetADocType(46, resolve);
        }).then((DocType: any) => {
          this.ArchiveBtnText = 'متن قرارداد';
        });
        break;
      case 210:
      case 211:
      case 212:
      case 213:
      case 214:
      case 215:
      case 216:
      case 217:
      case 218:
        this.MultiQuestion = true;
        this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
        this.SetPRWarrantyReciveDocList();
        this.HaveReceiveDoc = true;
        this.WarrantyDocGridHeight = 88;
        this.IsWarrantyValidity = this.ProductRequestObject.IsWarrantyValidity;
        break;
      default:
        break;
    }
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    // this.ProdReqItemrowData = this.ProductRequestObject.ProductRequestItemList;
    this.RequestSupplierList = this.ProductRequestObject.RequestSupplierList;
    this.ProdReqRelList = this.ProductRequestObject.ProductRequestRelationList;
    this.DurationDay = this.ProductRequestObject.DurationDay;
    this.DurationMonth = this.ProductRequestObject.DurationMonth;
    this.DurationYear = this.ProductRequestObject.DurationYear;
    this.Article31subject = this.ProductRequestObject.Article31subject;
    this.CheckBoxStatus = true;
    this.SumFinalAmount = this.PopupParam.SumFinalAmount;
    this.DealTypeCode = this.PopupParam.DealTypeCode;
    this.DealTypeName = this.PopupParam.DealTypeName;
    this.PriceListPatternID = this.PopupParam.PriceListPatternID;
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.IsCost = this.ProductRequestObject.IsCost;
    this.ContractorCapacity = this.ProductRequestObject.GradeID;
    this.WorkStartDate = this.ProductRequestObject.ActualStartDateString;
    this.IsBalancing = this.ProductRequestObject.IsBalancing;
    this.SeasonListParams.selectedObject = this.ProductRequestObject.SeasonCode;
    this.IsContractContent = this.ProductRequestObject.IsContractContent;
    this.ContractContentNote = this.ProductRequestObject.ContractContentNote;

    if (this.ProductRequestObject.PRLineSet !== null) {
      this.OnOpenNgSelect(null);
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
    }

    if (this.ProductRequestObject.StartTypeCode != null) {
      this.StartType = this.ProductRequestObject.StartTypeCode;
    }
    if (this.ProductRequestObject.IsFindCost != null) {
      this.AmountType = this.ProductRequestObject.IsFindCost;
    }
    if (this.RequestSupplierList) {
      this.HaveSupplier = true;
    }
    if (this.ProductRequestObject.SubCostCenterObject.CostCenterObject
      && this.ProductRequestObject.ProductRequestTypeCode != null) {
      this.CostCenterCode = this.ProductRequestObject.ProductRequestTypeCode;
      if (1 <= this.ProductRequestObject.RegionCode && this.ProductRequestObject.RegionCode <= 22 && this.CostCenterCode === 1) {
        this.IsDevelopment = true;
      }
    }
    this.SetVWProductRequestItemData();
    this.RefreshCartable.ProductRequestItemList.subscribe(res => {
      this.SetVWProductRequestItemData();
    });
    this.CoulumnsDefinition(this.ProductRequestObject.ContractTypeCode);
    this.ProdReqPersonColDef[1].cellEditorParams.Items = this.ProductRequest.GetBusinessPattern(),
      forkJoin(
        [
          this.ContractList.GetContractTypeListByType(this.IsCost, this.ModuleCode, this.ProductRequestObject.RegionCode),
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetDealMethodListByReionGroupCode(
            this.IsCost,
            this.DealTypeCode,
            this.ProductRequestObject.RegionCode,
            this.ModuleCode,
            this.ProductRequestObject.DealMethodCode,
            null,
            null),
          this.ProductRequest.GetArticle31List(this.ProductRequestObject.RegionCode),
          this.PriceList.GetPriceListTopics(true),
          this.ProductRequest.GetPRBalanceFactors(this.ProductRequestObject.CostFactorID),
          this.ProductRequest.getAllPRType(),
          this.ProductRequest.GetConsultantSelectTypeList(),
          this.ProductRequest.GetConsultantSelectWayList(),
        ]
      ).subscribe(res => {
        this.ContractTypeItems = res[0];
        this.DealMethodItems = res[1];
        this.Article31Items = res[2];
        this.PriceListTopicItems = res[3];
        this.PRTypeItems = res[5];
        this.PriceListTopicItems.forEach(item => {
          item.PriceListTopicName = item.PriceListTopicCode + ' - ' + item.PriceListTopicName;
        });
        this.ContractTypeParams.selectedObject = this.ProductRequestObject.ContractTypeCode;
        this.DealMethodParams.selectedObject = this.ProductRequestObject.DealMethodCode;
        this.Article31Params.selectedObject = this.ProductRequestObject.Article31ID;
        this.PRTypeParams.selectedObject = this.ProductRequestObject.ProductRequestTypeCode;
        if (this.PRTypeParams.selectedObject === 3) {
          // tslint:disable-next-line: no-shadowed-variable
          this.Actor.GetPriceListTopicByBusinesPatternID(4924, false).subscribe(res => {
            this.PriceListTopicRasteItems = res;
            this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
            this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
          });
        } else {
          this.PriceList.GetPLTListbyPRType(this.PRTypeParams.selectedObject).subscribe(ress => {
            this.PriceListTopicRasteItems = ress;
            this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
            this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
          });
        }
        if (this.DealMethodParams.selectedObject === 4) {
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
        }
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
        this.ConsultantSelectTypeItems = res[6];
        this.ConsultantSelectWayItems = res[7];
        this.ConsultantSelectTypeParams.selectedObject = this.ProductRequestObject.ConsultantSelectTypeCode;
        this.ConsultantSelectedWayParams.selectedObject = this.ProductRequestObject.ConsultantSelectedWayCode;
      });
    if (this.PopupParam.ModuleViewTypeCode === 118) {
      this.ShowContractorDetails = true;
    }
    if (this.PopupParam.ModuleViewTypeCode === 69) {
      this.IsDisable = true;
      this.IsEditable = false;
      this.IsSupplierEditable = true;
      this.HasSupplierSave = true;
    }
    if (this.PopupParam.ModuleViewTypeCode !== 146
      && this.PopupParam.ModuleViewTypeCode !== 150) {
      this.ShowProvisionRep = true;
    }
    this.ProductRequestObject.ProductRequestItemList.forEach(element => {
      if (element.ProductRequestEstimateList) {
        this.HaveEstiamte = true;
      }
      if (element.RequestPersonEstimateList) {
        this.HaveConsultation = true;
      }
    });
    if (this.ProductRequestObject.IsBaselineScrolling != null) {
      this.IsBaselineScrolling = this.ProductRequestObject.IsBaselineScrolling;
    }
    if (this.ProductRequestObject.ContractTypeCode === 19) { // RFC 51439
      this.IsEditable = false;
      this.SupplierTabPanelHeight = 90;
      this.IsContractType19 = true;
      this.ISErrorBilldingSetting = true;
    }

    if (this.PopupParam.ModuleViewTypeCode === 400000 ||
      this.PopupParam.ModuleViewTypeCode === 500000) {
      this.TabRahbari = true;
      this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
      this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
      this.ReNewQuestion = 'درخواست تجدید شود؟';
      if (this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
        this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
      } else {
        this.IsLawful = true;
      }
      // tslint:disable-next-line: max-line-length
      this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
      if (this.ProductRequestObject.IsRenewal != null) {
        this.IsRenewal = this.ProductRequestObject.IsRenewal;
      } else {
        this.IsRenewal = true;
      }
      if (this.ProductRequestObject && this.ProductRequestObject.ProductRequestTypeCode
        && this.ProductRequestObject.ProductRequestTypeCode !== 3) { // RFC 62290
        this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(res => {
          if (res) {
            this.HasTripleReport = true;
          }
        });
      }
    }
  }
  OnCheckBoxChange(event) {

  }
  onChangeDealMethod(event) {

  }
  onChangePriceListTopic(event) {

  }
  onChangePriceListType(event) {

  }
  onChangeArticle31() {

  }
  ReqSuppRowClick() {

  }
  onGridReadyRequestSupplier(params: { api: any; }) {
    this.RequestSupplierApi = params.api;
  }
  onReceiveDocGridReady(params: { api: any; }) {
    this.ReceiveDocGridApi = params.api;
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
  onProdReqEstCellValueChanged(event) {

  }
  getDurationDay(DurationDay) {

  }
  getDurationMonth(DurationMonth) {

  }
  getDurationYear(DurationYear) {

  }
  onCoefClick() {

  }
  onClose() {
    this.ProductRequestShowDetailsPageClosed.emit(true);
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 157;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  onProdReqEstRowClick(event) {
    this.selectedEstimateRow = event;
  }
  onProdReqItemRowClick(event) {
    this.ProdReqEstList = event.data.ProductRequestEstimateList;
    this.SelectedProductRequestItemID = event.data.ProductRequestItemID;

  }
  MessageBoxAction(ActionResult) {

  }
  getOutPutParam(event) {

  }
  AddPopUpBtnClick(element) {

  }
  popupclosed() {
    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }
  FetchMoreSupplerPerson(event) {

  }

  FetchSupplerPersonByTerm(event) {

  }
  onSupplercellEditingStarted(event) {

  }

  onSupplercellvaluechanged(event) {

  }

  oncellEditingStarted(event) {

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
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
    this.ReceiveDocColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 80,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      },
      {
        headerName: 'قبول / رد',
        field: 'IsValidity',
        width: 100,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsValidity
        },
      },
      {
        headerName: 'نام شخص پیشنهاد دهنده',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectProposalParams,
          Items: [],
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
          if (params.newValue && params.newValue.ActorName) {
            params.data.ProposalID = params.newValue.ProposalID;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ProposalID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'نوع سند',
        field: 'ReceiveDocTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetWarrantyReceiveDocType(),
          bindLabelProp: 'ReceiveDocTypeName',
          bindValueProp: 'ReceiveDocTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ReceiveDocTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ReceiveDocTypeName) {
            params.data.ReceiveDocTypeCode = params.newValue.ReceiveDocTypeCode;
            params.data.ReceiveDocTypeName = params.newValue.ReceiveDocTypeName;

            if (params.data.ReceiveDocTypeCode === 11) {
              this.Editable = true;
            } else {
              this.Editable = false;
              params.data.SapamNo = null;
              params.data.EstateValue = null;
              params.data.Area = null;
              params.data.EstateAddress = null;
              params.data.EstateTypeCode = null;
              params.data.EstateTypeName = null;
              params.data.RegRegion = null;
            }
            return true;
          } else {
            params.data.ProposalID = null;
            params.data.ReceiveDocTypeName = null;
            return false;
          }
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'شماره ضمانت نامه',
        field: 'ReferenceNo',
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ ضمانت نامه',
        field: 'PersianReferenceDate',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianReferenceDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 120,
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
      },
      {
        headerName: 'مبلغ',
        field: 'ReceiveDocAmount',
        width: 120,
        HaveThousand: true,
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
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: true,
        width: 440,
        resizable: true
      },
      {
        headerName: 'شماره سپام',
        field: 'SapamNo',
        editable: () => {
          return this.Editable;
        },
        width: 80,
        resizable: true
      },
      {
        headerName: 'نوع ملک',
        field: 'EstateTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectEstateTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.EstateTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.EstateTypeName) {
            params.data.EstateTypeCode = params.newValue.EstateTypeCode;
            params.data.EstateTypeName = params.newValue.EstateTypeName;
            return true;
          } else {
            params.data.EstateTypeCode = null;
            params.data.EstateTypeName = null;
            return false;
          }
        },
        editable: () => {
          return this.Editable;
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'ارزش ملک',
        field: 'EstateValue',
        editable: () => {
          return this.Editable;
        },
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک ثبتی',
        field: 'RegRegion',
        editable: () => {
          return this.Editable;
        },
        width: 80,
        resizable: true
      },
      {
        headerName: 'متراژ',
        field: 'Area',
        editable: () => {
          return this.Editable;
        },
        width: 80,
        resizable: true
      },
      {
        headerName: 'آدرس ملک',
        field: 'EstateAddress',
        editable: () => {
          return this.Editable;
        },
        width: 440,
        resizable: true
      },
    ];
  }
  onChangeContractType(TypeCode) {
    this.CoulumnsDefinition(TypeCode);
  }
  CoulumnsDefinition(ContractTypeCode) {
    if (!ContractTypeCode || ContractTypeCode === 26 || ContractTypeCode === 29) {
      this.IsShowTwoGrid = true;
      this.GWidth = 200;
      this.GMaxWidth = 1000;
      this.WeightProdReqItemColDef = [
        {
          headerName: 'ردیف',
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
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تعداد',
          field: 'QTY',
          editable: true,
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد',
          field: 'Amount',
          editable: true,
          HaveThousand: true,
          width: 120,
          resizable: true,
        },
        {
          headerName: 'مبلغ',
          field: 'FinalAmount',
          HaveThousand: true,
          width: 120,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          editable: true,
          width: 450,
          resizable: true
        },
        {
          headerName: 'مبلغ متره',
          field: 'Amount',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ متره با ضرایب ردیف',
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
    }
    if (ContractTypeCode && (ContractTypeCode === 27 || ContractTypeCode === 28)) {
      this.IsShowTwoGrid = false;
      this.GWidth = 1190;
      this.GMaxWidth = 1190;
      this.WeightProdReqItemColDef = [
        {
          headerName: 'ردیف',
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
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'حق الزحمه',
          field: 'FinalAmount',
          HaveThousand: true,
          width: 120,
          resizable: true
        },
        {
          headerName: 'اهمیت وزنی',
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
    this.ProdReqPersonrowData = event.data.RequestPersonEstimateList;

  }
  onAddPopUpBtnClick() {

  }
  btnClick(InputValue: any) {
    this.PopUpType = 'choose-report-product-request-item';
    this.isClicked = true;
    this.startLeftPosition = 400;
    this.startTopPosition = 200;
    this.PopupParam = {
      ModuleCode: this.ModuleCode,
      SelectedCostFactorID: this.CostFactorID,
      SelectedProductRequestItemID: this.SelectedProductRequestItemID ? this.SelectedProductRequestItemID : 0,
      RegionCode: this.ProductRequestObject.RegionCode,
    };
  }
  loadFromExcel(data) {

  }

  FetchMoreContract(event) {

  }
  FetchContractByTerm(event) {

  }
  onContractcellEditingStarted(event) {

  }
  rdoStartTypeClick(Type) {
  }
  rdoAmountClick(Type) {
  }
  OnWorkStartDateChange(ADate) {
    this.WorkStartDate = ADate.MDate;
  }
  onProvisionClick(Str) {
    if (Str === 'Suggestion') {
      this.PopUpType = 'product-request-provision';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 35;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.PercentWidth = 95;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.ProductRequestObject.Subject,
        RegionCode: this.ProductRequestObject.RegionCode,
        ProductRequestCode: this.ProductRequestObject.ProductRequestNo,
        ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
        ModuleCode: this.ModuleCode,
        ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
        IsRequestProvision: this.PopupParam.IsRequestProvision,
        ShowOnly: true,
      };
    }

    if (Str === 'Show') {
      this.PopUpType = 'app-provision';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 67;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.ProductRequestObject.Subject,
        RegionCode: this.ProductRequestObject.RegionCode,
        ProductRequestCode: this.ProductRequestObject.ProductRequestNo,
        ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
      };
    }
  }
  onProposalClick() {
    this.PopUpType = 'app-inquiry-list';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 350;
    this.startTopPosition = 130;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      Subject: this.ProductRequestObject.Subject,
      RegionCode: this.ProductRequestObject.RegionCode,
      ProductRequestCode: this.ProductRequestObject.ProductRequestNo,
      ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
      CostFactorID: this.ProductRequestObject.CostFactorID,
      IsReadOnly: true,
      HeaderName: 'مشاهده لیست متقاضیان',
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      PRRegionObject: this.PopupParam.CurrentRegionObject,
      ShowOnly: true,
      ModuleCode: this.ModuleCode,
      IsInProgressCartable: this.PopupParam.IsInProgressCartable // 59699
    };
  }
  BtnArchiveClick() {
    this.PopupParam = {
      CostFactorID: this.CostFactorID,
      HaveSaveArchive: (this.PopupParam.ModuleViewTypeCode === 115) ? true : false, // RFC 51274
      LastInquiryID: (this.ProductRequestObject && this.ProductRequestObject.LastInquiryObject)
        ? this.ProductRequestObject.LastInquiryObject.InquiryID : null,
      OrderCommitionID: (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject)
        ? this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID : null,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      // tslint:disable-next-line: max-line-length
      RealOnlyPage: (this.PageModuleCode === 2824 || (this.PopupParam.ModuleViewTypeCode === 115)) ? false : this.DisableAll, // RFC 50600 & 51274
    };
    this.PopUpType = 'product-request-archive-detail';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 255;
    this.startTopPosition = 40;
  }
  RequestPersonItem() {
    this.PopUpType = 'product-request-person-item';
    this.isClicked = true;
    this.HaveHeader = true;
    this.PercentWidth = 70;
    this.startLeftPosition = 185;
    this.startTopPosition = 45;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      ModuleCode: this.ModuleCode,
      CheckRegionWritable: false,
      Subject: this.ProductRequestObject.Subject,
      RegionCode: this.ProductRequestObject.RegionCode,
      ProductRequestCode: this.ProductRequestObject.ProductRequestNo,
      ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
      CostFactorID: this.ProductRequestObject.CostFactorID,
      ModuleViewTypeCode: 100000,
      PopUpType: 'product-request-person-item'
    };
  }
  PRProvisionRepShow() {
    this.Report.PRProvisionRep(this.ProductRequestObject.RegionCode, this.CostFactorID,
      this.ModuleCode,
      'پیشنهاد تامین اعتبار');
  }
  ProvisionRepShow() {
    this.ProductRequest.GetProvision(this.ProductRequestObject.CostFactorID).subscribe(res => {
      if (res) {
        this.Report.ProvisionRep(this.CostFactorID,
          this.ModuleCode,
          'تامین اعتبار', this.ProductRequestObject.RegionCode);
      } else {
        this.ShowMessageBoxWithOkBtn('تامین اعتبار ندارد');
        return;
      }
    });
  } // 64058
  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    this.ProdReqEstApi.forEachNodeAfterFilter(function (node) {
      if (node.data.FinalAmount) {
        SumFinalAmount = SumFinalAmount + node.data.FinalAmount;
      }
    });
    this.SumFinalEstimateAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
        this.ProdReqItemrowData = res;
        let SumAmount = 0;
        res.forEach((item) => {
          const obj = {
            ProductRequestItemID: item.ProductRequestItemID,
            ProductRequestItemAmount: item.ProductRequestItemAmount,
            ProductRequestEstimateList: item.ProductRequestEstimateList,
          };
          this.ProductRequestItemList.push(obj);
          if (item.AmountCOEFPact) {
            SumAmount = SumAmount + item.AmountCOEFPact;
          }
        });
        this.SumFinalItemAmount = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      });
  }
  rdoIsBalancingClick(IsBalancing) {
    this.IsBalancing = IsBalancing;
    if (!IsBalancing) {
      this.SeasonListParams.selectedObject = null;
    }
  }

  onGridBeneficiary(params: { api: any; }) {
    this.BeneficiaryApi = params.api;
  }
  onBeneficiarycellEditingStarted(event) {

    // if (event.colDef && event.colDef.field === 'ActorName') {
    //   this.BeneficiaryColDef[1].cellEditorParams.Params.loading = true;
    //   this.Actor.GetActorPaging(1, 30, '', '', false, false, true, event.data.ActorID).subscribe(res => {
    //     this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
    //       List: res.List,
    //       TotalItemCount: res.TotalItemCount,
    //       PageCount: Math.ceil(res.TotalItemCount / 30),
    //       type: 'Beneficiary'
    //     });
    //   });
    // }
  }
  onBeneficiarycellvaluechanged(event) {
    // if (event.colDef && event.colDef.field === 'ActorName') {
    //   if (event.newValue && event.newValue.ActorId) {
    //     const itemsToUpdate = [];
    //     this.BeneficiaryApi.forEachNode(node => {
    //       if (node.rowIndex === event.rowIndex) {
    //         node.data.CorporateID = event.newValue.ActorId;
    //         itemsToUpdate.push(node.data);
    //       }
    //     });
    //     this.BeneficiaryApi.updateRowData({ update: itemsToUpdate });
    //   }
    // }
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
  RowClick(event) {
    this.SelectedSupplier = event.data;
  }
  onShowContractorDetailsClick() {
    if (!this.SelectedSupplier.ActorID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }
    if (this.SelectedSupplier.PersonTypeCode === 1) {
      this.PopUpType = 'person2';
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 15;
      this.PercentWidth = 97;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.PopupParam = {
        ActorId: this.SelectedSupplier.ActorID,
        ObjectID: this.SelectedSupplier.ActorID,
        ModuleViewTypeCode: 300000, // RFC 54203
        HeaderName: 'تامین کننده حقیقی',
      };
    } else {
      this.PopUpType = 'corporate2';
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 20;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.PercentWidth = 97;
      this.OverMainMinwidthPixel = 1300;

      this.PopupParam = {
        CorporateID: this.ProductRequestObject.RequestSupplierList[0].ActorID,
        ObjectID: this.ProductRequestObject.RequestSupplierList[0].ActorID,
        ModuleViewTypeCode: 300000, // RFC 54203
        HeaderName: 'تامین کننده حقوقی',
      };
    }
    //tslint:disable-next-line: max-line-length
    // this.ProductRequest.FindContractorGUIDByActorID(this.SelectedSupplier.ActorID).subscribe(res => {
    //   window.open('http://contracts.tehran.iri/DesktopModules/Contract/Controls/Contractors/ContractorInfo/?Param=' + res, '_blank');
    // });
  }
  IsBaselineScrollingClick(param) {
    this.IsBaselineScrolling = param;
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
  OnOpenNgSelect(event) {
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
  onClickValidationNewCar(event) {
    this.IsValidationNewCar = event;
  }
  onShowContractorClick() { // LocalProvider
    if (!this.SelectedSupplier.ActorID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }

    if (this.SelectedSupplier.PersonaActorType === 1) {
      this.PopUpType = 'person2'
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      // this.HeightPercentWithMaxBtn = 100;
      // this.OverMainMinwidthPixel = 1300;

    } else {
      this.PopUpType = 'corporate2'
      this.startLeftPosition = 30;
      this.startTopPosition = 10;
      // this.HeightPercentWithMaxBtn = 100; //  مقذار دهی در html
      // this.OverMainMinwidthPixel = 1297;//  مقذار دهی در html
    }
    this.isClicked = true;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 645;
    this.PopupParam = {
      IdentityNo: this.SelectedSupplier.IdentityNo,// مقداردهی شناسه ملی در بک اند انجام شود
      ModuleViewTypeCode: 100000
    };
  }

  onCreateContract() {
    this.PopUpType = 'create-contract-on-flow';
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
      IsCost: this.IsCost,
      ModuleViewTypeCode: 222,
      CostFactorID: this.CostFactorID,
      OrginalModuleCode: this.PageModuleCode,
    };
  }
  ArchiveClick() {
    let DealMethodCode = -1;
    let DealTypeCode = -1;
    let ContractTypeCode = -1;
    let RegionCode = -1;
    let FinYearCode = -1;
    let Article31ID = -1;
    if (this.ProductRequestObject) {
      DealMethodCode = this.ProductRequestObject.DealMethodCode;
      DealTypeCode = this.ProductRequestObject.DealTypeCode;
      ContractTypeCode = this.ProductRequestObject.ContractTypeCode;
      RegionCode = this.ProductRequestObject.RegionCode;
      Article31ID = this.ProductRequestObject.Article31ID;
    }
    this.ProductRequest.GetDocTypeMadatory(
      DealMethodCode ? DealMethodCode : -1,
      this.ProductRequestObject.DealTypeCode,
      ContractTypeCode ? ContractTypeCode : -1,
      RegionCode,
      FinYearCode,
      Article31ID,
      this.ModuleViewTypeCode,
      this.ModuleCode,
      this.ContractParams.selectedObject ? false : true)
      .subscribe(
        ress => {
          this.ShowArchiveDialog(ress, this.FilterDocumentTypeCodeList);
        }
      );
  }
  GetADocType(DocTypeCode, resolve) {
    this.ArchiveList.GetADocumentType(DocTypeCode).subscribe(res => {
      resolve(res);
    });
  }
  ShowArchiveDialog(MandatoryDocTypeList, FilterDocumentTypeCodeList) {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 282;
    this.startTopPosition = 11;
    const archiveParam = {
      EntityID: this.CostFactorID,
      TypeCodeStr: this.ParentDocType + '-',
      DocTypeCode: this.ParentDocType,
      ModuleCode: this.ModuleCode,
      HasCheck: true,
      IsReadOnly: true,
      MandatoryDocTypeList: MandatoryDocTypeList,
      DocumentTypeCodeList: FilterDocumentTypeCodeList,
      OrginalModuleCode: this.PageModuleCode,
      RegionCode: this.ProductRequestObject.RegionCode
    };
    this.PopupParam = archiveParam;
  }

  onAutomationClick() {
    if (!isUndefined(this.ProductRequestObject.RegionCode) && this.CostFactorID) {
      this.RegionList.GetRegionList(this.ModuleCode, this.ModuleCode === 2773 ?
        true :
        // tslint:disable-next-line: max-line-length
        this.PopupParam.ModuleCode === 2730 && (this.PopupParam.ModuleViewTypeCode === 400000 || this.PopupParam.ModuleViewTypeCode === 500000) ?
          false :
          !this.CheckRegionWritable).subscribe(res => {
            this.RegionItems = res;
          });
      let LetterTypeCodeList = [];
      if (this.ProductRequestObject.RegionCode === 222) {
        LetterTypeCodeList.push(3);
        LetterTypeCodeList.push(21);
        LetterTypeCodeList.push(29);
        if (this.PopupParam.ModuleViewTypeCode === 172) { // 62476
          LetterTypeCodeList.push(33);
        }
        if (this.ProductRequestObject.DealMethodCode === 11 && this.ProductRequestObject.ConsultantSelectTypeCode
          && this.ProductRequestObject.ConsultantSelectTypeCode === 3) {  // RFC 58762
          LetterTypeCodeList.push(30);
        }
      } else {
        LetterTypeCodeList.push(2);
        LetterTypeCodeList.push(6);
        LetterTypeCodeList.push(25);
      }
      this.currentRegionObject =
        this.ProductRequestObject && this.ProductRequestObject.RegionObject ?
          this.ProductRequestObject.RegionObject :
          this.RegionItems.find(x => x.RegionCode === this.PopupParam.RegionCode);
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
        ReadOnlyMode: this.PopupParam.ModuleViewTypeCode === 172 ? false : true, // 62476
        OrginalModuleCode: this.PageModuleCode,
        SaveMode: this.PopupParam.ModuleViewTypeCode === 172 ? true : false, // 62476
      };
    }
  }
  onReceiveDocRowClick(event) {
    this.SelectedReceiveDocID = event.data.ReceiveDocID;
    if (event.data.ReceiveDocID) {
      this.ReceiveDocEnable = true;
    } else {
      this.ReceiveDocEnable = false;
    }
  }
  onReceiveDocEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetProposalWinnerList(this.CostFactorID, true).subscribe(res => { // RFC = 50195
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Proposal'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'EstateTypeName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetEstateTypeList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'EstateType'
        });
      });
    }
  }
  onReceiveDocArchiveClick(row) {
    if (row.ReceiveDocID) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ReceiveDocID,
        TypeCodeStr: '11-',
        DocTypeCode: 11,
        ModuleCode: this.ModuleCode,
        RegionCode: this.ProductRequestObject.RegionCode
      };
    }
  }
  SetPRWarrantyReciveDocList() {
    this.ProductRequest.GetPRCostWarrantyList(this.ProductRequestObject.CostFactorID).subscribe(res => this.ReceiveDocRowData = res);
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
      ProductRequestObject: this.ProductRequestObject
    };
  }
}
