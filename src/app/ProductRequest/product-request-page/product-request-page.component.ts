import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { of, forkJoin } from 'rxjs';
import { isNullOrUndefined, isUndefined } from 'util';
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
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import * as moment from 'jalali-moment';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { ArticlePatternService } from 'src/app/Services/CRM/ArticlePatternService';
import { ServicePatternService } from 'src/app/Services/CRM/ServicePatternService';

@Component({
  selector: 'app-product-request-page',
  templateUrl: './product-request-page.component.html',
  styleUrls: ['./product-request-page.component.css']
})
export class ProductRequestPageComponent implements OnInit {
  @ViewChild('IsValidity') IsValidity: TemplateRef<any>;
  @ViewChild('IsReturn') IsReturnInquiry: TemplateRef<any>;
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  @ViewChild('DelRecDoc') DelRecDoc: TemplateRef<any>;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupMaximized;
  @Input() InputParam;
  IsAdmin;
  CallMainapi = false;
  PopUpName = '';
  PixelHeight;
  PriceListTopicRasteDisable = true;
  btnshowcontractlist = false;
  IsTransferedContract = false;
  VirtualGroupModuleTypeName = '';
  VirtualGroupModuleTypeDisplay = false;
  NotIsNewHeaderName = 'تمدید';
  CurentUser;
  BoardDecisionsDec = '';
  BoardDecisions = false;
  IsdisablebleAdmin = true;
  RequestedPersonDisable = false;
  DisableControlles = false;
  MCSRadioTypes: Array<RadioBoxModel> = [];
  McRadioTypes: Array<RadioBoxModel> = [];
  ScRadioTypes: Array<RadioBoxModel> = [];
  IcRadioTypes: Array<RadioBoxModel> = [];
  TDRadioTypes: Array<RadioBoxModel> = [];
  HasSecretQuestion = false;
  ISActLocation = false;
  HasMutualContractQuestion = true;
  HaseEstimate;
  RequestedPersonID;
  SubCostCenterID;
  StartAndEndDateIsEditable = false;
  CostCenterID;
  SubRusteeID;
  RequestPersonObject;
  RusteeID;
  ShowSendBtn = true;
  ShowReturnBtn = true;
  ShowConfermBtn = true;
  HasBtnShowContractors;
  PopupParam;
  MutualContractStatus: number;
  ShowMCSPanel = false;
  IsContractDisable: boolean;
  ArchiveIsReadOnly = false;
  PRContractObject;
  FilterDocumentTypeCodeList = [];
  ParentDocType = 38;
  ParentDocTypeList = [];
  RegisterLetterDate;
  DocumentLetterNo;
  currentContractSearchTerm;
  RegisterLetterNo;
  CheckRegionWritable = true;
  ConfirmCode;
  OfficialExpertPrice = null;
  currentRegionObject;
  HaveAcceptArchive = false;
  HaveDigitalSign;
  HaveArchive = false;
  ConfirmArchiveBtnText = 'تایید مستندات آگهی';
  HaveProvision;
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
  HaveExpertPerson;
  ContractLetterDate;
  ContractLetterNo;
  HaveContractStyle;
  btnRevocationName;
  btnProvisionName = 'پیشنهاد تامین اعتبار';
  AutomationLetterBtnText = 'اتصال نامه';
  RequestSuggestionBtnText = 'تکمیل اطلاعات';
  btnProposalName = 'تعیین برنده';
  IsRequestProvision = false;
  QuestionLabel;
  MultiQuestionLabel;
  TopQuestionLabel;
  WfDetailsShow = false;
  MultiWfDetailsShow = false;
  MultiWfDetailsShowHeight;
  WfDetailsShowHeight = 60;
  SelectedReceiveDocID;
  tabpanelHeight = 87;
  tabpanelWarrantyDocHeight = 87;
  ReceiveDocEnable;
  WfSaveDetailsShow = false;
  OrderCommitionObject;
  IsEditable;
  ISSendAndConfirm = false;
  IsArticle48Editable = false;
  IsRadioEditabled: boolean;
  IsLawful;
  btnRevocationIcon;
  CurrentUserSubCostCenter;
  IsNew = true;
  WorkFlowTransitionID;
  ReadyToConfirm;
  IsLastCommition = false;
  HaveRevocation;
  btnConfirmName;
  btnConfirmIcon;
  IsEntryPercentageOfChanges = false;
  IsEntryPercentageLevelOfChanges = false;
  ExpertPersonRoleID = 972;
  ExpertPersonLabel = 'کارشناس امور قرارداد ها';
  WorkflowButtonsWidth = 34.8;
  Excel_Header_Param: { colDef2: any };
  ContractListSetFrom: any;
  ContractSignItems;
  ISDisabledConfirmAndReturnBtn = false;
  PercentageLevelOfChanges = 0;
  HaveConfirmArchive = false;
  HaveSaveArchive = false;
  ContractSignParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    DropDownMinWidth: null,
    type: 'PR-contract-sign',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'PersonName', width: 53, MinTermLenght: 3, SearchOption: 'PersonName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
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
  ContractTotalItemCount;
  ContractPageCount;
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
  DisableContractStyle = false;
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
  ExpertCheckValidate = false;
  CheckValidateCostCenterParams = false;
  CheckValidatePRType = false;
  CheckValidateTopic = false;
  complexForm: FormGroup;
  PRCostRowData = [];
  IncrementTypeItems;
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
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  ExpertItems;
  ExpertParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    Required: true,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  SupervisorItems;
  SupervisorParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  ContractStyleItems;
  ContractStyleParams = {
    bindLabelProp: 'none',
    bindValueProp: 'noneID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
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
    IsDisabled: false
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
    IsDisabled: false
  };
  DistrictDirectionItems;
  DistrictDirectionParams = {
    bindLabelProp: 'DistrictDirectionName',
    bindValueProp: 'DistrictDirectionCode',
    placeholder: '',
    MinWidth: '50px',
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
  LetterTypeCodeList = [];
  WFFieldSetLegend = '';
  WFLegendWidth = 0;
  FirstWFLegendWidth = 0;
  FirstWFFieldSetLegend = '';
  SecondWFLegendWidth = 0;
  SecondWFFieldSetLegend = '';
  HaveMaxBtn;
  columnDef = [];
  gridApi: any;
  rowsData: any = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  gridHeight = 49;
  PRIgridHeight = 85;
  WarrantyDocGridHeight = 82;
  HaveSave = false;
  HaveDelete = true;
  IsRowClick = false;
  ShowContractInfo = false;
  RegionListSet;
  selectedRegion;
  selectCostCenter;
  UnitPatternSet;
  selectedUnitPattern;
  ProductRequestDate;
  PersianProductRequestDate;
  ProductRequestCostColDef;
  AssetColDef = [];
  ReceiveDocGridApi;
  ReceiveDocColDef = [];
  HaveReceiveDoc;
  HaveArticle48;
  Article48RowsData = <any>[];
  Article48ColumnDef;
  Article48GridApi;
  ReceiveDocRowData = <any>[];
  DeadLineDate;
  ProductRequestPersoncolDef = [];
  ProductRequestRowData = [];
  ProductRequestCostRowData = [];
  PRPersonGridApi;
  PRCostGridApi;
  AssetGridApi;
  Subject = '';
  IsEditeSearch = true;
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
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ActLocationItems;
  startLeftPosition;
  startTopPosition;
  OverMainMinwidthPixel;
  ArchiveBtnText = 'مستندات';
  HasCreateContractBtnText = 'انعقاد قرارداد';
  HasCompleteInfoBtnText = 'مشاهده اطلاعات تکمیلی';
  CostFactorID = -1;
  ProductRequestObject;
  IsDisable = true;
  SumFinalAmount = 0;
  SumAmount = 0;
  SumFinalItemAmount = '0';
  SumFinalItemAmountWithDuration = '0';
  PercentageOfChanges = 0;
  SumFinalAmountStr = '0';
  PercentWidth = null;
  MainMaxwidthPixel = null;
  MinHeightPixel = null;
  IsRenewal = false;
  Renewal = false;
  RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.ContractParams,
  this.SubRusteeParams, this.RusteeParams];
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
  ButtonsPlaceWidthPercent = 65;
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
  IsDisableResearch = false;
  LastInquiryObject: any;
  OrdersObject: any;
  IsShow = false;
  HasProposalItem = false;
  HasReturnItem = false;
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
  SumFinalBeforeLastAmountRelatedContract = 0;
  PerecentageChangesLabel = false;
  HasProvisionContractID;
  ContractIDForArticle48;
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
  ShowSave106 = false;
  btnConfirmAndReturnName = 'عدم تایید و بازگشت';
  CartableUserID;
  IsShowType108 = false;
  CurrWorkFlow: any;
  IsType114 = false;
  TimeExtensionDay = 0;
  TimeExtensionMonth = 0;
  TimeExtensionYear = 0;
  IsHoldOnline = false;
  ProductRequestIsOnline: boolean = null;
  IsContractContent = false;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ContractContentNote;
  IsShowContractContent = false;
  CommitionSubjectChange = false; // RFC 52131
  CommitionSubjectChangeBtnText = 'اصلاح موضوع صورتجلسه'; // RFC 52131
  IsWFShow: any;
  WorkListDetailRows: any;
  ResearcherID;
  EntityList = [];
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
  BeforeSelectedProductID: any;
  selectedProductID: any;
  selectedrow: any;
  QtyIsEditable: boolean;
  IsException = false;
  currentModuleCode;
  HasPrintBtn = true;
  HaveAsset = true;
  HasThreeInquiries = false; // RFC 57253 - 3 inquiries whith 2 returned inquiries
  IsReturn = false; // RFC 57253
  Is3InquiriesMode = false;
  IsShowContractContentfor222 = false;
  ShowTrafficSign = false;
  IsType147 = false;
  ProductIDs = [];
  ContractPayDate;
  RelatedProductRowData = [];
  gridApiRelatedProduct;
  RequestRelatedProductColDef;
  RelatedProductNgSelectVSParams = {
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
  ExpertIsEditable = true;
  IsShowComitionHistoryBtn = false;
  IsInProgressCartable = false;
  HaveArticle18DigitalSign = false;
  IsSumEditableType107 = false;
  HasSingDate = false;
  ExistsFile = false;
  OrderCommitionID: number = null;
  IsUpdateBefore = false;
  IsUpdateBeforeAdevertising = null;
  gridApiReceiveDocProduct;
  ReceiveDocProductRowData = [];
  ReceiveDocProductColDef;
  HavePRReceiveDoc = true;
  HavePDFSignersInfo = false;
  HasAdequacyDoc = false;
  IsClickedPopUp = false;
  IsArticle18Choosen = false;
  HasEditContractInfoBtn = false;
  DisabledEditContractInfoBtn = true;
  HaveUpdateTenderDoc = false;
  IsUpdateTenderDoc = null;
  PRTypeItems;
  PRTypeParams = {
    bindLabelProp: 'ProductRequestTypeName',
    bindValueProp: 'ProductRequestTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'product-request-type',
  };
  PriceListTopicRasteParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: this.PriceListTopicRasteDisable,
    DropDownMinWidth: '100px',
    type: 'price-list-topic',
    Required: true
  };
  PriceListTopicRasteItems = [];
  RoleID: number;
  IsAdministrationManager: boolean;
  ExistsArticle18File = false;
  ExistsDisApprArticle18File = false;
  IsNotGreenSpace = true;
  oldProductRequestTypeCode = null;
  ProductRequestPersonID = -1;
  OldRegionCode: any;
  CustomCheckBoxConfig1: CustomCheckBoxModel = new CustomCheckBoxModel();
  IsChecked = false;
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
    private RefreshContractItems: RefreshServices,
    private route: ActivatedRoute,
    private FlowService: WorkflowService,
    private Automation: AutomationService,
    private APService: ArticlePatternService,
    private SPService: ServicePatternService,
    private Report: ReportService,
    private ComonService: CommonService,
    private UserDetails: UserSettingsService,) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
      this.currentModuleCode = +params['ModuleCode'];
    });
    this.Article48ColumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'PersianArticle48Date',
        width: 100,
        resizable: true,
        editable: () => {
          return this.IsArticle48Editable;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianArticle48Date',
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
            params.data.ProductRequestArticle48Date = params.newValue.MDate;
            params.data.PersianArticle48Date = params.newValue.SDate;
            return true;
          } else {
            params.data.ProductRequestArticle48Date = null;
            params.data.PersianArticle48Date = '';
            return false;
          }
        }
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestArticle48No',
        editable: () => {
          return this.IsArticle48Editable;
        },
        width: 100,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: () => {
          return this.IsArticle48Editable;
        },
        width: 450,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: () => {
          return this.IsArticle48Editable;
        },
        width: 450,
        resizable: true
      }];
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
        // valueSetter: (params) => {
        //   if (params.newValue) {
        //     this.ProductRequest.GetAssetByAssetID(params.newValue.AssetID).subscribe(
        //       res => {
        //         params.data.AssetID = res[0].AssetID;
        //         params.data.AssetCode = res[0].AssetCode;
        //         params.data.ProductName = res[0].ProductName;
        //         params.data.AssetNote = res[0].Note;
        //         params.data.AssetTag = res[0].AssetTag;
        //         params.data.RefrenceNo = res[0].RefrenceNo;
        //       });

        //   }
        // },
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
    this.RequestRelatedProductColDef = [
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
        field: 'ProductName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.RelatedProductNgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreRelatedProduct,
          FetchByTerm: this.FetchRelatedProductByTerm,
          RedioChangeFunc: this.RedioSelectedChangeRelatedProduct,
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
          if (params.newValue && params.newValue.ProductName) {
            params.data.ProductName = params.newValue.ProductName;
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
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    let RegionCode = -1;
    let CostCenterCode = '';
    if (this.ProductRequestObject) {
      RegionCode = this.ProductRequestObject.RegionCode;
      if (this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterObject) {
        CostCenterCode = this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode;
      }
    } else {
      RegionCode = this.RegionParams.selectedObject;
      // tslint:disable-next-line: max-line-length
      CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
    }

    if (this.IsNew) {
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
          headerName: 'اسناد فعال',
          field: 'IsReturn',
          width: 100,
          resizable: true,
          editable: (params) => {
            return false;
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            if (params.value) {
              return 'قبول شده';
            } else {
              return 'رد شده';
            }
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsReturnInquiry
          },
        },
        {
          headerName: 'شماره استعلام',
          field: 'InquiryNo',
          width: 120,
          resizable: false
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
          editable: true,
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
    } else {
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
          },
        },
        {
          headerName: 'قبول / رد',
          field: 'IsValidity',
          width: 100,
          resizable: true,
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
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
          headerName: 'اسناد فعال',
          field: 'IsReturn',
          width: 100,
          resizable: true,
          editable: (params) => {
            return false;
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            if (params.value) {
              return 'قبول شده';
            } else {
              return 'رد شده';
            }
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsReturnInquiry
          },
        },
        {
          headerName: 'شماره استعلام',
          field: 'InquiryNo',
          width: 120,
          resizable: false
        },
        {
          headerName: 'شماره ضمانت نامه',
          field: 'ReferenceNo',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ ضمانت نامه',
          field: 'PersianReferenceDate',
          width: 120,
          resizable: true,
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
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
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
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
          headerName: 'توضیحات',
          field: 'Note',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 440,
          resizable: true
        },
        {
          headerName: 'شماره سپام',
          field: 'SapamNo',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
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
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 120,
          resizable: true
        },
        {
          headerName: 'ارزش ملک',
          field: 'EstateValue',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 80,
          resizable: true
        },
        {
          headerName: 'پلاک ثبتی',
          field: 'RegRegion',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 80,
          resizable: true
        },
        {
          headerName: 'متراژ',
          field: 'Area',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 80,
          resizable: true
        },
        {
          headerName: 'آدرس ملک',
          field: 'EstateAddress',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 440,
          resizable: true
        },
        {
          headerName: 'حذف',
          field: '',
          width: 80,
          sortable: false,
          resizable: false,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.DelRecDoc,
          }
        }
      ];
    }

    this.ReceiveDocProductColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره سند',
        field: 'ReferenceNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع سند',
        field: 'ReceiveDocTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'PersianReferenceDate',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'ReceiveDocAmount',
        width: 150,
        resizable: true
      },
      {
        headerName: 'بانک',
        field: 'BankName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شعبه',
        field: 'BranchName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره حساب',
        field: 'AccNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مهلت پرداخت',
        field: 'PersianDeadLine',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع متعهد',
        field: 'PersonTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'متعهد',
        field: 'ActorName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'نام بانک متعهد',
        field: 'PayerBankName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'حساب جاری متعهد',
        field: 'PayerBankAcc',
        width: 150,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 200,
        resizable: true
      },
    ];
  }

  FillGrid(HasEstimate) {
    if (HasEstimate) {
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
          editable: () => {
            return this.IsEditable;
          },
          width: 120,
          resizable: true,
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
              this.BeforeSelectedProductID = this.selectedProductID = params.data.ProductID;
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
          headerName: 'تاریخ شروع پیشنهادی',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: (Params) => {
            return (!(this.IsNew) && this.ContractParams.selectedObject && Params.data._SelectedContractItem_ng) ? false :
              this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
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
              params.data.ShortStartDate = params.newValue.MDate;
              params.data.PersianStartDate = params.newValue.SDate;
              return true;
            } else {
              params.data.ShortStartDate = null;
              params.data.PersianStartDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'تاریخ پایان پیشنهادی',
          field: 'PersianEndDate',
          width: 130,
          resizable: true,
          editable: () => {
            return this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
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
              params.data.ShortEndDate = params.newValue.MDate;
              params.data.PersianEndDate = params.newValue.SDate;
              this.gridApi.forEachNode(node => {
              });
              return true;
            } else {
              params.data.ShortEndDate = null;
              params.data.PersianEndDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'مبلغ متره',
          field: 'VWAmount',
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
    } else {
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
          editable: () => {
            return this.IsEditable;
          },
          width: 120,
          resizable: true,
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
              this.BeforeSelectedProductID = this.selectedProductID = params.data.ProductID;
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
          headerName: 'تاریخ شروع پیشنهادی',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: (Params) => {
            return (!(this.IsNew) && this.ContractParams.selectedObject && Params.data._SelectedContractItem_ng) ? false :
              this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
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
              params.data.ShortStartDate = params.newValue.MDate;
              params.data.PersianStartDate = params.newValue.SDate;
              return true;
            } else {
              params.data.ShortStartDate = null;
              params.data.PersianStartDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'تاریخ پایان پیشنهادی',
          field: 'PersianEndDate',
          width: 130,
          resizable: true,
          editable: () => {
            return this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
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
              params.data.ShortEndDate = params.newValue.MDate;
              params.data.PersianEndDate = params.newValue.SDate;
              return true;
            } else {
              params.data.ShortEndDate = null;
              params.data.PersianEndDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'تعداد',
          field: 'QTY',
          editable: (params) => {
            return (params.data.ProductTypeCode === 2 && this.currentRegionObject.RegionGroupCode === 3 &&
              this.OrginalModuleCode !== 2939 && this.OrginalModuleCode !== 2793) // RFC 52896 && برداشتن در ابزار rfc 55993
              || (params.data.ProductTypeCode === 2 && this.currentRegionObject.RegionGroupCode === 20
                && this.OrginalModuleCode !== 2939 && this.OrginalModuleCode !== 2793 && this.OrginalModuleCode !== 2824)
              || (params.data.ProductTypeCode === 2 && this.ModuleViewTypeCode === 165) ? false :
              this.IsSumEditableType107 ? true : this.IsEditable;
          },
          valueSetter: (params) => {
            if (params.newValue) {
              // tslint:disable-next-line: radix
              params.data.QTY = params.newValue;
              // tslint:disable-next-line: radix
              params.data.FinalAmount = Math.round(parseFloat((!params.newValue || params.newValue == 0) ? 1 : params.newValue) * (params.data.Amount)); // RFC 54950
            }
          },
          valueFormatter: function currencyFormatter(params) {
            if (params.value && !isUndefined(params.value) && params.value != null) {
              return params.value;
            } else {
              return '';
            }
          },
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد پیشنهادی',
          field: 'Amount',
          HaveThousand: true,
          width: 120,
          resizable: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellEditorParams: { IsFloat: true, FloatMaxLength: 4 },
          editable: () => {
            if (this.IsSumEditableType107) {
              return true;
            } else {
              return this.IsEditable;
            }
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.Amount = params.newValue;
              if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
                params.data.FinalAmount = params.data.Amount;
              } else {
                params.data.FinalAmount = Math.round(parseFloat(params.data.QTY) * params.newValue);
              }
            }
          },
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'FinalAmount',
          HaveThousand: true,
          width: 120,
          resizable: true,
          editable: () => {
            if (this.IsSumEditableType107) {
              return true;
            } else {
              return this.IsEditable;
            }
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.FinalAmount = params.newValue;
              if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
                params.data.Amount = params.data.FinalAmount;
              } else {
                params.data.FinalAmount = params.newValue;
                // tslint:disable-next-line: radix
                params.data.Amount = (parseInt(params.newValue) / parseFloat(params.data.QTY)).toFixed(4);
              }
            }
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
          headerName: 'مبلغ پیشنهادی با اعمال ضرایب',
          field: 'AmountCOEFPact',
          HaveThousand: true,
          width: 200,
          resizable: true
        },
        {
          headerName: 'مبلغ کل ماهانه',
          field: 'AmountCOEFPactWithDuration',
          HaveThousand: true,
          hide: this.PRTypeParams.selectedObject !== 2 || (this.PRTypeParams.selectedObject === 2 && this.PriceListTopicRasteParams.selectedObject !== 402374),
          width: 200,
          resizable: true
        }
      ];
    }
  }

  GetRadioBoxSelectedItem(event) {
    this.MutualContractStatus = event;
  }
  ngOnInit() {
    this.CustomCheckBoxConfig1.color = 'state p-primary';
    this.CustomCheckBoxConfig1.icon = 'fa fa-check';
    this.CustomCheckBoxConfig1.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig1.AriaWidth = 14.5;
    this.SumFinalBeforeLastAmountRelatedContract = this.SumFinalAmountRelatedContract = 0;

    if (this.ModuleCode === 2895) {
      this.IsDisableResearch = true;
    }
    forkJoin([
      this.User.CheckAdmin(),
      this.UserDetails.CheckAdminForConfirmArchive()
    ]).subscribe(res => {
      this.IsAdmin = res[0];
      this.HaveConfirmArchive = res[1];
    });

    this.RefreshCartable.ProductRequestObjectChange.subscribe(res => {
      if (res && !isUndefined(res.HaveWinner)) {
        this.ProductRequestObject.HaveWinner = res.HaveWinner;
      }
      if (res && !isUndefined(res.HaveMaterials)) {
        this.ProductRequestObject.HaveMaterials = res.HaveMaterials;
      }
      if (res && !isUndefined(res.IsMaterialsDifference)) {
        this.ProductRequestObject.IsMaterialsDifference = res.IsMaterialsDifference;
      }
    });

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';

    if (this.InputParam.ShowSendBtn === 'YES') {
      this.ShowConfermBtn = this.ShowReturnBtn = this.ShowSendBtn = false;
    }
    this.IsSumEditableType107 = false;
    this.CheckRegionWritable = this.InputParam && this.InputParam.IsRegionReadOnly;
    this.WorkflowButtonsWidth = this.CheckRegionWritable ? 17 : this.WorkflowButtonsWidth;
    this.ButtonsPlaceWidthPercent = this.CheckRegionWritable ? 82.8 : this.ButtonsPlaceWidthPercent;
    this.IsInit = true;
    if (this.InputParam) {

      // tslint:disable-next-line: max-line-length
      this.UserRegionCode = this.InputParam.UserRegionCode ? this.InputParam.UserRegionCode : this.ProductRequestObject ? this.ProductRequestObject.RegionCode : null;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsWFShow = this.InputParam.IsWFShow;
      this.WorkListDetailRows = this.InputParam.rows;
      this.IsContractRemainStartWF = this.InputParam.IsStartWF;
      if (this.InputParam.ModuleViewTypeCode) {
        this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      }
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
      this.IsInProgressCartable = this.InputParam.IsInProgressCartable;
      // tslint:disable-next-line: max-line-length
      this.ModuleCode = this.InputParam.ISProvisionRemain ? 2773 : this.InputParam.ISArticle48 ? 2787 : this.InputParam.ISTavafoghNameh ? 3095 : this.InputParam.ModuleCode ? this.InputParam.ModuleCode : this.ModuleCode ? this.ModuleCode : 2730;
      if (this.ModuleCode === 2895) {
        this.Subject = this.InputParam.Subject;
        this.ResearcherID = this.InputParam.ResearcherID;
        this.ModuleCode = 2730;
      }
      if (this.ModuleCode === 2910) {
        this.ModuleCode = 2730;
      }
    }
    if (this.ModuleCode === 2773) {
      this.IsNew = false;
      this.ContractParams.IsDisabled = false;
    }
    if (this.ModuleCode === 2787) {
      this.ProductRequest.GetContractID(this.CostFactorID).subscribe((res) => { // 60415
        this.ContractIDForArticle48 = res;
      });
      this.IsNew = false;
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
    }

    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise<void>((resolve, reject) => {
      this.User.GetModulOPByUser(this.OrginalModuleCode === 2910 ? 2910 : this.ModuleCode).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
            case 16:
              this.HaveSave = true;
              break;
            default:
              break;
          }
        });
        resolve();
      });
    }).then(() => {
      forkJoin([
        // this.ArchiveList.HasArchiveAccess(this.ModuleCode),
        this.ProductRequest.GetSubCostCenterPerson(),
        this.ProductRequest.GetProductRequestForPRPage(this.CostFactorID),
        this.ProductRequest.HasProductRequestEstimate(this.CostFactorID),
        this.ProductRequest.HasProductRequestThreeInquiries(this.CostFactorID),
        this.ProductRequest.getAllPRType(),
      ]).subscribe(res => {
        this.CurrentUserSubCostCenter = res[0];
        if (res[1]) {
          this.IsDisable = false;
          this.ProductRequestObject = res[1];
          this.HasProvisionContractID = this.ProductRequestObject.ProvisionContractID ? true : false;
          if (this.ProductRequestObject.RelatedContractID) {
            this.IsNew = false;
            this.PerecentageChangesLabel = true;
          }
          if (!this.IsNew) {
            this.HaveDelete = false;
          }
          this.DisplayColDef();
          this.FillAllNgSelectByProductRequest(this.ProductRequestObject);
          if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
            this.IsInsert = true;
            this.IsChecked = this.ProductRequestObject.ContractTypeCode == 8 ? true : false;
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

          this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
          this.PRTypeParams.selectedObject = this.ProductRequestObject.ProductRequestTypeCode;
          this.IsCost = this.ProductRequestObject.IsCost;
          if (this.ModuleViewTypeCode === 89 && this.IsCost === false) {
            this.ISActLocation = true;
          } else {
            this.ISActLocation = false;
          }
          if (this.ProductRequestObject.ModuleViewTypeCode === 89 || this.ProductRequestObject.ModuleViewTypeCode === 95) {
            this.HasMutualContractQuestion = false;
          }
          this.SetColumnDef();
          this.ResearcherID = this.ProductRequestObject.ResearcherID;
          this.BoardDecisionsDec = this.ProductRequestObject.BoardDecisions;
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
          this.ContractContentNote = this.ProductRequestObject.ContractContentNote;
          this.IsContractContent = this.ProductRequestObject.IsContractContent;
          this.RelatedProductRowData = this.ProductRequestObject.RequestRelatedProductList;
          if (this.ModuleCode === 2773 || this.ModuleCode === 2787) {
            if (this.ProductRequestObject.ProductRequestItemList.length <= 0) { // RFC 53404
              this.ProductRequest.GetLastContractOrderitemByProductRequest(this.CostFactorID).subscribe(ress => {
                this.rowsData = ress;
                // اگر اقلام درخواست از دیتابیس خالی بود، از اطلاعات قرارداد پر شود
              });
            } else {
              this.rowsData = this.ProductRequestObject.ProductRequestItemList;
            }
          } else {
            if (this.ProductRequestObject
              && this.ProductRequestObject.ProductRequestTypeCode === 2
              && this.ProductRequestObject.PriceListTopicID === 402374) {
              this.ProductRequestObject.ProductRequestItemList.forEach(el => {
                if (isNullOrUndefined(el.QTY) || el.QTY === 0) {
                  el.FinalAmount = 0;
                }
              });
              this.rowsData = this.ProductRequestObject.ProductRequestItemList;
            } else {
              this.rowsData = this.ProductRequestObject.ProductRequestItemList;
            }
          }


          if (this.ProductRequestObject.RegionCode === 220 &&
            this.ProductRequestObject.RelatedContractID &&
            this.ProductRequestObject.ContractObject.ContractId > 0) {

            this.contractpaydetail.GetLastContractOrder(this.ProductRequestObject.ContractObject.ContractId, true).subscribe(res => {
              const ProductRequestList = res;
              ProductRequestList.forEach(node1 => {
                this.rowsData.forEach(node2 => {
                  if (node1.ProductID === node2.ProductID) {
                    node2['_SelectedContractItem_ng'] = true;
                  }
                });
              });
            });
          }

          this.SetEntityDataInDataRow(this.rowsData);
          this.AssetRowData = this.ProductRequestObject.AssetList;
          this.RedioClick(this.IsCost);
          if (this.ProductRequestObject && this.ProductRequestObject.RelatedContractID) {
            this.contractpaydetail.GetFirstContractOrder(this.ProductRequestObject.RelatedContractID).subscribe(ress => {
              ress.forEach(item => {
                item.FinalAmount = item.Amount;
                this.SumFinalAmountRelatedContract = this.SumFinalAmountRelatedContract + parseFloat(item.FinalAmount);
              });
            });
            this.contractpaydetail.GetBeforeLastContractOrder(this.ProductRequestObject.RelatedContractID).subscribe(resss => {
              resss.forEach(item => {
                item.FinalAmount = item.Amount;
                this.SumFinalBeforeLastAmountRelatedContract = this.SumFinalBeforeLastAmountRelatedContract + parseFloat(item.FinalAmount);
              });
            });
            if (this.ProductRequestObject.ProductRequestItemList && this.ProductRequestObject.ProductRequestItemList.length > 0) { }
          }
          if (this.ProductRequestObject && this.ProductRequestObject.ContractTimeExtension) { // RFC 51373
            // tslint:disable-next-line: max-line-length
            this.TimeExtensionDay = this.ProductRequestObject.ContractTimeExtension.Day ? this.ProductRequestObject.ContractTimeExtension.Day : 0;
            // tslint:disable-next-line: max-line-length
            this.TimeExtensionMonth = this.ProductRequestObject.ContractTimeExtension.Month ? this.ProductRequestObject.ContractTimeExtension.Month : 0;
            // tslint:disable-next-line: max-line-length
            this.TimeExtensionYear = this.ProductRequestObject.ContractTimeExtension.Year ? this.ProductRequestObject.ContractTimeExtension.Year : 0;
          }
          this.ProductRequestIsOnline = this.ProductRequestObject.IsOnline ? this.ProductRequestObject.IsOnline : false;
          if (this.ProductRequestObject && this.ProductRequestObject.RegionCode === 79 && this.btnConfirmName === 'تایید نهایی') {
            this.HasEditContractInfoBtn = true;
            this.CheckContractStatusForUpdate();
          }
        } else {
          this.RedioClick(this.IsCost);
          this.OnOpenNgSelect('Region');
          this.IsDown = true;
          // this.User.GetCurrentUserDetails()
          //   // tslint:disable-next-line:no-shadowed-variable
          //   .subscribe(res => {
          //     // this.ProductRequestDate = res.MCurrentDate;
          //   });
        }
        this.PRTypeItems = res[4];
        if (!this.ProductRequestObject || this.ProductRequestObject.CostFactorID <= 0) {
          this.btnshowcontractlist = true;
        }
        let RegionCode = -1;
        let CostCenterCode = '';
        if (this.ProductRequestObject) {
          RegionCode = this.ProductRequestObject.RegionCode;
          if (this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterObject) {
            CostCenterCode = this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode;
          }
        } else {
          RegionCode = this.RegionParams.selectedObject;
          // tslint:disable-next-line: max-line-length
          CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
        }
        this.HaseEstimate = res[2];
        if (this.ProductRequestObject &&
          this.ProductRequestObject.ProductRequestTypeCode) {
          this.onChangePRType(this.ProductRequestObject.ProductRequestTypeCode);
        } else {
          this.FillGrid(this.HaseEstimate);
        }
        this.rowsData.forEach(element => {
          this.EntityColumnDefinition(null, null, element.EntityList, false);
        });
        this.HasThreeInquiries = res[3];
        this.ShowModuleTypeName();
      });
    });
    this.ProductRequest.GetCurrentDate().subscribe(res => { this.ContractPayDate = res; });
  }

  MakeMCSRadioTypes(): void {
    this.MCSRadioTypes = [];
    this.MCSRadioTypes.push(new RadioBoxModel('منعقد شده', 1, false, 'rdomcs1'));
    this.MCSRadioTypes.push(new RadioBoxModel('در دست انعقاد', 2, false, 'rdomcs2'));
    this.MCSRadioTypes.push(new RadioBoxModel('درخواست فرجه تا انتقاد', 3, false, 'rdomcs3'));
  }
  MakeScRadioTypes(): void {
    this.ScRadioTypes = [];
    this.ScRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoSc1'));
    this.ScRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoSc2'));
  }
  MakeMCRadioTypes(): void {
    this.McRadioTypes = [];
    this.McRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoMc1'));
    this.McRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoMc2'));
  }
  MakeIcRadioTypes(): void {
    this.IcRadioTypes = [];
    this.IcRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoIc1'));
    this.IcRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoIc2'));
  }
  MakeTDRadioTypes(): void {
    this.TDRadioTypes = [];
    this.TDRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoIc1'));
    this.TDRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoIc2'));
  }
  FillAllNgSelectByProductRequest(ProdReqObj) {
    const ContractID = ProdReqObj && ProdReqObj.RelatedContractID ?
      ProdReqObj.RelatedContractID : ProdReqObj && ProdReqObj.ProvisionContractID ?
        ProdReqObj.ProvisionContractID : (this.ModuleCode == 2787) ? this.ContractIDForArticle48 : null; // 60415
    // tslint:disable-next-line: no-shadowed-variable
    const promise0 = new Promise<void>((resolve) => {
      if (ContractID) {
        this.ContractList.GetRelatedContractpagingForExtended(1, 30, '', '',
          ProdReqObj.RegionCode, ProdReqObj.IsCost, true, ContractID, this.ModuleCode === 2773)
          .subscribe((res: any) => {
            this.ContractItems = res.List;
            this.ContractTotalItemCount = res.TotalItemCount;
            this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ContractParams.selectedObject = ContractID;
            resolve();
          });
      } else {
        resolve();
      }
    });


    // tslint:disable-next-line: no-shadowed-variable
    const promise1 = new Promise<void>((resolve) => {
      if (ProdReqObj.ContractStackHolderObject &&
        ProdReqObj.ContractStackHolderObject.SubCostCenterId &&
        ProdReqObj.ContractStackHolderObject.CostCenterId) {
        forkJoin([
          this.ProductRequest.GetSubCostCenter(ProdReqObj.ContractStackHolderObject.CostCenterId, this.ModuleCode, true),
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterPriPerson(ProdReqObj.SubCostCenterObject.CostCenterId, ProdReqObj.SubCostCenterObject.SubCostCenterId, ProdReqObj && ProdReqObj.ActorID ? ProdReqObj.ActorID : null, this.ModuleCode),
        ]).subscribe(res => {

          this.SubRusteeItems = res[0];
          this.SubRusteeParams.selectedObject = ProdReqObj.ContractStackHolderObject.SubCostCenterId;
          res[0].forEach(element => {
            element.FullPersonName = element.FirstName + ' ' + element.LastName;
          });

          if (this.ModuleCode !== 2773 || this.ModuleViewTypeCode !== 7) { // RFC 51513
            this.RequestedPersonItems = res[0];
            this.SubCostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.SubCostCenterId;
          }

          if (this.ModuleCode !== 2773 || this.ModuleViewTypeCode !== 7) { // RFC 51513
            res[1].forEach(element => {
              element.FullPersonName = element.FirstName + ' ' + element.LastName;
            });

            this.RequestedPersonItems = res[1];
            this.RequestedPersonParams.selectedObject = ProdReqObj.ActorID;
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
    // tslint:disable-next-line: no-shadowed-variable
    const promise2 = new Promise<void>((resolve) => {
      if (ProdReqObj.WorkPlaceCode && ProdReqObj.RegionAreaID) {
        forkJoin([
          this.ProductRequest.GetRegionAreaList(ProdReqObj.WorkPlaceCode),
          this.ProductRequest.GetRegionAreaDistrictList(ProdReqObj.RegionAreaID),
          this.ProductRequest.GetDistrictDirectionList(),
        ]).subscribe(res => {
          this.RegionAreaItems = res[0];
          this.RegionAreaParams.selectedObject = ProdReqObj.RegionAreaID;
          this.RegionAreaDistrictItems = res[1];
          this.RegionAreaDistrictParams.selectedObject = ProdReqObj.RegionAreaDistrictID;
          this.DistrictDirectionItems = res[2];
          this.DistrictDirectionParams.selectedObject = ProdReqObj.DistrictDirectionCode;
          resolve();
        });
      } else {
        resolve();
      }
    });
    // tslint:disable-next-line: no-shadowed-variable
    const promise3 = new Promise<void>((resolve) => {
      forkJoin([
        // tslint:disable-next-line: max-line-length
        this.RegionList.GetRegionList(this.ModuleCode, this.ModuleCode === 2773 ? true : this.InputParam.ModuleCode === 2730 && (this.ModuleViewTypeCode === 400000 || this.ModuleViewTypeCode === 500000 || this.ModuleViewTypeCode === 800000) ? false : !this.CheckRegionWritable),
        this.ProductRequest.GetVWExeUnitByRegion(ProdReqObj.RegionCode),
        this.ProductRequest.GetCustomerOrderByRegionPaging(1, 30, '', '', ProdReqObj.RegionCode,
          ProdReqObj.CustomerOrderID),
        this.ProductRequest.GetOnfilterRegion(),
        this.ProductRequest.GetActLocationByRegionCode(ProdReqObj.RegionCode),
        this.ProductRequest.GetCostCenterByRegionAndRequestOwner(ProdReqObj.RegionCode,
          ProdReqObj.SubCostCenterObject ? ProdReqObj.SubCostCenterObject.CostCenterId : null, this.ModuleCode, false),
        this.ProductRequest.GetListByCostCenterId(ProdReqObj.SubCostCenterObject.CostCenterId, this.ModuleCode, true,
          ProdReqObj.SubCostCenterObject.CostCenterObject? ProdReqObj.SubCostCenterObject.CostCenterObject.RegionCode:ProdReqObj.RegionCode),
        this.ProductRequest.GetCostCenterByRegion(ProdReqObj.RegionCode,
          ProdReqObj.ContractStackHolderObject ? ProdReqObj.ContractStackHolderObject.CostCenterId : null, this.ModuleCode, false)
      ]).subscribe((res: any) => {
        this.RegionItems = res[0]; // case region
        this.RegionParams.selectedObject = ProdReqObj.RegionCode;
        this.OldRegionCode = this.RegionParams.selectedObject;
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
        if (ProdReqObj.WorkPlaceCode) {
          this.OnFilterRegionParams.selectedObject = ProdReqObj.WorkPlaceCode;
        }
        this.ActLocationItems = res[4];
        if (ProdReqObj.ActLocationID) {
          this.ActLocationParams.selectedObject = ProdReqObj.ActLocationID;
        }
        this.RusteeItems = res[5];
        if (ProdReqObj.ContractStackHolderObject && ProdReqObj.ContractStackHolderObject.CostCenterId) {
          this.RusteeParams.selectedObject = ProdReqObj.ContractStackHolderObject.CostCenterId;
        }

        if (this.ModuleCode !== 2773 || this.ModuleViewTypeCode !== 7) { // RFC 51513
          this.CostCenterItems = res[5];
          this.SubCostCenterItems = res[6];
          if (ProdReqObj.SubCostCenterObject && ProdReqObj.SubCostCenterObject.CostCenterId) {
            this.CostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.CostCenterId;
            this.SubCostCenterParams.selectedObject = ProdReqObj.SubCostCenterObject.SubCostCenterId;
          }
        }
        this.IsDown = true;
        resolve();
      });
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
    this.ProductRequestCostColDef[1].cellEditorParams.Items = this.ProductRequest.GetCostCenterByRegion(ARegionCode, null, null, false);
    this.ProductRequestCostColDef[3].cellEditorParams.Items = this.ProductRequest.GetUnitPatternByRegionCode(ARegionCode, false);
    this.OnOpenNgSelect('Rustee'); // RFC 51893
    this.OnOpenNgSelect('CostCenter'); // RFC 51893
    this.OnOpenNgSelect('PriceListTopicRaste');
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
      this.ViewTypeChange(99999);
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
          if (this.IsContractRemainStartWF) {
            this.WorkFlowID = null;
          }
        }
        Resolve();
      });
  }
  ViewTypeChange(MyModuleViewTypeCode = null) {
    if (!this.ModuleViewTypeCode) { // RFC 53826
      this.ShowMessageBoxWithOkBtn('نوع نمایش فعالیت شروع گردش برای این واحد اجرایی تعریف نشده است. لطفا با راهبر تماس بگیرید.');
      return;
    }
    console.log(' /🚀 نوع نمایش فعالیت:', this.ModuleViewTypeCode);
    if (this.CheckRegionWritable) {
      this.IsEditable = true;
      this.ArchiveIsReadOnly = true;
      this.WfSaveDetailsShow = this.WfDetailsShow = false;
      this.HaveCompleteInfo = false;
    } else {
      if (this.btnConfirmName === 'عدم تایید') {
        this.IsEditable = false;
        this.IsEditConfirm = false;
      }
      this.FilterDocumentTypeCodeList = [];
      if (this.ModuleCode === 2730) {
        if (this.RegionParams.selectedObject === 222) { this.ShowTrafficSign = false; } // RFC 58310
        switch (this.ModuleViewTypeCode) {
          case 1:
            this.HaveRevocation = false; // 51753
            this.IsEditable = true;
            this.HaveSave = true;
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(26);
            this.HasBtnAutomationLetter = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; // 51689
            this.WfDetailsShow = this.Is3InquiriesMode = this.HasThreeInquiries ? true : false;
            this.gridHeight = this.HasThreeInquiries || this.CostFactorID === -1 ? 42 : 49;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = this.HasThreeInquiries ? 35 : 60;
            this.IsReturn = this.ProductRequestObject && this.ProductRequestObject.LastInquiryObject
              && this.HasThreeInquiries ? this.ProductRequestObject.LastInquiryObject.IsReturn : false;
            this.NotIsNewHeaderName = this.RegionParams.selectedObject === 220 ? this.NotIsNewHeaderName = 'الحاقیه/ابلاغ' :
              this.NotIsNewHeaderName = 'تمدید'; // RFC 61532
            break;
          case 165:
            if (this.RegionParams.selectedObject == 220) {
              this.ParentDocTypeList = [38, 40];
            }  // 65316  
            this.HaveRevocation = false; // 51753
            this.IsEditable = true;
            this.HaveSave = true;
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(26);
            this.HasBtnAutomationLetter = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; // 51689
            this.WfDetailsShow = this.Is3InquiriesMode = this.HasThreeInquiries ? true : false;
            this.gridHeight = this.HasThreeInquiries || this.CostFactorID === -1 ? 42 : 49;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = this.HasThreeInquiries ? 35 : 60;
            this.IsReturn = this.ProductRequestObject && this.ProductRequestObject.LastInquiryObject
              && this.HasThreeInquiries ? this.ProductRequestObject.LastInquiryObject.IsReturn : false;
            break;
          case 2:
            this.HaveProvision = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 222222: // ReadOnly Without Send
            this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            break;
          case 146:
            this.HaveProvision = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 3:
          case 167:
          case 172:
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            if (this.ModuleViewTypeCode === 167) {
              this.HaveAcceptArchive = true;
              this.ArchiveIsReadOnly = false;
              this.ParentDocType = 39;
              // tslint:disable-next-line:no-shadowed-variable
              new Promise((resolve, reject) => {
                this.GetADocType(39, resolve);
              }).then((DocType: any) => {
                this.ArchiveBtnText = DocType.DocumentTypeName;
              });
            }
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 85;
                this.PRIgridHeight = 83;
                this.IsShowContractContentfor222 = true;
              } // RFC 56864 & 58194
            }
            break;
          case 109:
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveSeenProvision = this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            break;
          case 135: // RFC 57175 - شبیه 3
            this.IsEditable = false;
            this.ArchiveIsReadOnly = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            this.ParentDocType = 701;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(701, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            break;
          case 4:
            this.HaveRevocation = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 85;
                this.PRIgridHeight = 83;
                this.IsShowContractContentfor222 = true;
              }// RFC 56864  & 58194
            }
            break;
          case 5:
            this.IsEditable = false;
            this.WfDetailsShow = true;
            this.HaveAlertToFinance = this.HaveCompleteInfo = true;
            this.gridHeight = 43;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 30;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 34;
                this.tabpanelHeight = 81;
                this.PRIgridHeight = 85;
                this.IsShowContractContentfor222 = true;
              }// RFC 56864  & 58194
            }
            break;
          case 6:
            this.HaveSeenProvision = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 7:
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onExpertOpen(1);
            this.IsEditable = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 33;
                this.tabpanelHeight = 80;
                this.PRIgridHeight = 84;
                this.IsShowContractContentfor222 = true;
              }// RFC 56864  & 58194
            }
            break;
          case 189:
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onExpertOpen(1);
            this.IsEditable = false;
            this.ExpertPersonLabel = 'کارشناس حقوقی';
            this.ExpertPersonRoleID = 1133;
            break;
          case 176: //RFC 63114
            this.IsUpdateBefore = true;
            this.IsUpdateBeforeAdevertising = this.ProductRequestObject.IsUpdateBeforeAdevertising;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onExpertOpen(1);
            this.IsEditable = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 33;
                this.tabpanelHeight = 80;
                this.PRIgridHeight = 84;
                this.IsShowContractContentfor222 = true;
              }
            }
            break;
          case 170: // 62132
            this.ExpertPersonRoleID = 1002;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارپرداز تدارکات';
            this.onExpertOpen(1);
            this.IsEditable = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 33;
                this.tabpanelHeight = 80;
                this.PRIgridHeight = 84;
                this.IsShowContractContentfor222 = true;
              } // RFC 56864  & 58194
            }
            break;
          case 85:
            this.ExpertPersonRoleID = 1101;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارشناس سفارشات';
            this.IsEditable = false;
            this.onExpertOpen(1);
            break;
          case 125:
            this.ExpertPersonRoleID = 1278;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارشناس سفارشات';
            this.IsEditable = false;
            this.onExpertOpen(1);
            break;
          case 86:
            this.ExpertPersonRoleID = 1119;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارشناس بودجه';
            this.IsEditable = false;
            this.onExpertOpen(1);
            break;
          case 126:
            this.ExpertPersonRoleID = 1277;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارشناس بودجه';
            this.IsEditable = false;
            this.onExpertOpen(1);
            break;
          case 87:
            this.ExpertPersonRoleID = 1043;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارشناس بازرگانی';
            this.IsEditable = false;
            this.onExpertOpen(1);
            break;
          case 124:
            this.ExpertPersonRoleID = 1275;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.ExpertPersonLabel = 'کارشناس بازرگانی';
            this.IsEditable = false;
            this.onExpertOpen(1);
            break;
          case 8:
            this.QuestionLabel = 'ایا این درخواست منطبق با قوانین است ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsLawful;
            break;
          case 9:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(16);
            this.WFFieldSetLegend = 'کارشناس رسمی دادگستری';
            this.WFLegendWidth = 11;
            this.SetLetterDetails();
            this.OfficialExpertPrice = this.ProductRequestObject ?
              this.ProductRequestObject.OfficialExpertPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
            break;
          case 10:
          case 71:
          case 173:
            this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(2);
            this.HasBtnAutomationLetter = true;
            break;
          case 11:
          case 160:
          case 72:
          case 123: // RFC 53953
          case 162: // RFC 60447
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.SecondWFLegendWidth = 15;
            this.HaveExpertPerson = false;
            this.HaveCompleteInfo = true;
            this.HaveCommition = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = false;
            break;
          case 155:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.SecondWFLegendWidth = 15;
            this.HaveExpertPerson = false;
            this.HaveCompleteInfo = true;
            this.HaveCommition = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = false;
            this.InsertSupplierIntoPropsal222();
            break;
          case 110: // RFC 50951
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.SecondWFLegendWidth = 15;
            this.HaveExpertPerson = false;
            this.HaveCompleteInfo = true;
            this.HaveCommition = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = true;
            this.HaveSave = true;
            this.CommitionSubjectChange = true; // RFC 52131
            this.CommitionSubjectChangeBtnText = 'اصلاح موضوع';
            break;
          case 12:
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveContractStyle = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onContractStyleOpen(1);
            this.AutomationLetterBtnText = 'اتصال نامه';
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HasBtnAutomationLetter = true;
            this.IsEditable = false;
            break;
          case 152:
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveContractStyle = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = false;
            this.onContractStyleOpen(1);
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.HaveSave = false;
            this.DisableContractStyle = true;
            break;
          case 148:
            this.AutomationLetterBtnText = 'اتصال نامه';
            this.LetterTypeCodeList.push(3);
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HasBtnAutomationLetter = true;
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveContractStyle = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onContractStyleOpen(1);
            this.IsEditable = false;
            break;
          case 13:
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.AutomationLetterBtnText = 'اتصال نامه';
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HasBtnAutomationLetter = true;
            break;
          case 137:
            this.ParentDocType = 784;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(784, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.AutomationLetterBtnText = 'اتصال نامه';
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HasBtnAutomationLetter = true;
            break;
          case 14:
            this.ParentDocType = 46;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(46, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            break;
          case 15:
          case 76:
            this.ParentDocType = 47;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(47, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            break;
          case 16:
            this.gridHeight = 48;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.WfDetailsShow = false;
            this.LetterTypeCodeList.push(3);
            this.HaveOnlyLetter = false;
            this.WFFieldSetLegend = 'ثبت اطلاعات نامه ابلاغیه';
            this.WFLegendWidth = 10;
            // this.SetLetterDetails();
            this.HasBtnAutomationLetter = true;
            this.WfSaveDetailsShow = false; // RFC 50053 - با هماهنگی با آقای آخوندی، برای همه مناطق
            if (this.RegionParams.selectedObject === 201) { // 61533
              // tslint:disable-next-line: no-shadowed-variable
              new Promise((resolve, reject) => {
                this.GetADocType(38, resolve);
              }).then((DocType: any) => {
                this.ArchiveBtnText = DocType.DocumentTypeName;
              });
              this.HaveAcceptArchive = true;
            }
            break;

          case 171:
            this.gridHeight = 48;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.WfDetailsShow = false;
            this.LetterTypeCodeList.push(3);
            this.HaveOnlyLetter = false;
            this.WFFieldSetLegend = 'ثبت اطلاعات نامه قرارداد';
            this.WFLegendWidth = 10;
            // this.SetLetterDetails();
            this.HasBtnAutomationLetter = true;
            this.WfSaveDetailsShow = false; // RFC 50053 - با هماهنگی با آقای آخوندی، برای همه مناطق
            this.ParentDocTypeList = [38, 40];
            // new Promise((resolve, reject) => {
            //   this.GetADocType(40, resolve);
            // }).then((DocType: any) => {
            //   this.ArchiveBtnText = DocType.DocumentTypeName;
            // });
            this.ArchiveBtnText = 'مستندات';   // RFC 62410
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 175:

            this.ParentDocType = 47;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(47, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });

            this.ShowSendBtn = false;
            this.ShowConfermBtn = false;
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            break;

          case 79:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(3);
            this.HaveOnlyLetter = true;
            this.WFFieldSetLegend = 'ثبت اطلاعات نامه ابلاغیه';
            this.WFLegendWidth = 10;
            this.SetLetterDetails();
            break;
          case 17:
            this.gridHeight = 48;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 45;
            this.SecondWFFieldSetLegend = 'نامه دعوت به جلسه';
            this.FirstWFLegendWidth = 0;
            this.SecondWFLegendWidth = 16;
            this.LetterTypeCodeList.push(2);
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false; // به درخواست خانم قربانزاده
            this.IsEditable = true; // RFC 52131
            this.HaveSave = true;
            this.HaveOnlyLetter = false;
            this.HasBtnAutomationLetter = true;
            this.CommitionSubjectChange = true; // RFC 52131
            this.AutomationLetterBtnText = 'نامه';
            this.CommitionSubjectChangeBtnText = 'اصلاح موضوع';
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.RequestSuggestionBtnText = 'اطلاعات';
            break;
          case 18:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 50;
            this.HaveOnlyLetter = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = true;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(2);
            this.WFFieldSetLegend = 'نامه دعوت به جلسه';
            this.WFLegendWidth = 8;
            this.SetLetterDetails();
            break;
          case 19:
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.LetterTypeCodeList.push(4);
            this.HasBtnAutomationLetter = true;
            break;
          case 20:
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.gridHeight = 32;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = this.HaveCompleteInfo = true;
            this.WarrantyDocGridHeight = 100;
            this.tabpanelWarrantyDocHeight = 81;
            this.MultiWfDetailsShowHeight = 90;
            this.FirstWFLegendWidth = 0;
            // this.LetterTypeCodeList.push(7);
            this.SecondLetterTypeCode = 7;
            this.SecondWFFieldSetLegend = 'نامه استعلام اعتبار ضمانت نامه';
            this.SecondWFLegendWidth = 13;
            this.MultiWfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            this.SetSecondLetterDetails();
            this.IsEditable = false;
            this.HaveMultiOnlyLetter = true;
            break;
          case 21:
            this.HasCreateContractBtn = true;
            this.ParentDocType = 46;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(46, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HaveAcceptArchive = true;
            this.HaveCommition = false;
            this.LetterTypeCodeList.push(3);
            this.HasBtnAutomationLetter = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.IsEditable = false;
            // RFC 52153
            if (this.ProductRequestObject.RegionCode === 200 && this.ProductRequestObject.IsCost) {
              this.ShowRequestSuggestion = true;
              this.HaveCompleteInfo = false;
            } else {
              this.ShowRequestSuggestion = false;
              this.HaveCompleteInfo = true;
            }
            this.WorkflowButtonsWidth = 40.8;
            this.ButtonsPlaceWidthPercent = 59;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
            } else {
              this.HasSecretQuestion = true;
              this.ShowSave106 = true;
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 48;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
            }
            if (this.ProductRequestObject.RegionCode === 220) {
              this.HasSecretQuestion = false; // RFC 54420
              this.ShowMCSPanel = false;
              this.gridHeight = 48;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
            }
            if (this.ProductRequestObject.RegionCode === 79 || this.ProductRequestObject.RegionCode === 0) {
              this.HasEditContractInfoBtn = true;
              this.CheckContractStatusForUpdate();
            }
            break;
          case 75:
            // this.gridHeight = 31;
            // this.PRIgridHeight = 76;
            this.HasCreateContractBtn = this.HaveCompleteInfo = true;
            this.ParentDocType = 46;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(46, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.HaveCommition = false;
            this.LetterTypeCodeList.push(3);
            this.HasBtnAutomationLetter = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            // this.MultiWfDetailsShowHeight = 90;
            //  this.FirstWFFieldSetLegend = 'اطلاعات قرارداد';
            // this.FirstWFLegendWidth = 6;
            //  this.SecondWFLegendWidth = 0;
            // this.MultiWfDetailsShow = true;
            // this.WfSaveDetailsShow = true;
            // new Promise((resolve, reject) => {
            //   this.SetContractObject(resolve);
            // }).then(() => {
            //   this.onSignersOpen(1);
            // });
            this.IsEditable = false;
            break;
          case 22:
            this.QuestionLabel = 'مالیات بر ارزش افزوده اضافه شود ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.ContractObject.IsTaxValue;
            break;
          case 23:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'تنظیم فرم استعلام';
            break;
          case 27:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج جزئیات آگهی';
            break;
          case 35:
          case 29:
          case 24:
          case 84:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج لیست متقاضیان';
            break;
          case 38:
          case 139:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج جزییات آگهی';
            if (this.RegionParams.selectedObject === 222 && this.btnConfirmName === 'عدم تایید'
              && this.ModuleViewTypeCode === 38) { // RFC 58310
              this.ShowTrafficSign = true;
            }
            break;
          case 131:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'تنظیم فرم مناقصه';
            this.HaveArchive = true; // RFC 57759
            break;
          case 132:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج جزییات آگهی';
            this.HaveArchive = true; // RFC 57760
            break;
          case 39:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج تاریخ انتشار';
            break;
          case 105:
          case 42:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج لیست متقاضیان';
            break;
          case 43: // RFC 52060
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = true;
            this.IsEditable = false;
            this.btnProposalName = 'دریافت پاکات';
            this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
            break;
          case 58:
          case 70:
          case 82:
          case 164:
          case 188:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = true;
            this.IsEditable = false;
            this.btnProposalName = 'دریافت پاکات';
            this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
            break;
          case 153:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'دریافت پاکات';
            this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
            this.ArchiveIsReadOnly = true;
            this.HaveSave = false;
            this.DisableContractStyle = true;
            this.HasCompleteSave = false;
            break;
          case 142:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = true;
            this.IsEditable = false;
            this.btnProposalName = 'دریافت پاکات';
            this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsLawful = !this.ProductRequestObject.LastInquiryObject.IsReturn;
            break;
          case 83:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            break;
          case 57:
          case 104:
          case 158: // RFC 59100
            this.btnProposalName = 'درج لیست متقاضیان'; // پیرو درخواست 49746 نام دکمه تغییر کرد
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            break;
          case 25:
            this.gridHeight = 39;
            this.tabpanelHeight = 83;
            this.PRIgridHeight = 81;
            this.WfDetailsShowHeight = 50;
            this.WFLegendWidth = 12;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.WFFieldSetLegend = 'قیمت کارشناسی رسمی';
            break;
          case 30:
          case 40:
            this.btnProposalName = 'بارگذاری آگهی';
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onExpertOpen(1);
            this.HaveInquiry = true;
            this.IsEditable = false;
            break;
          case 32:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.HaveOnlyLetter = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(6);
            this.WFFieldSetLegend = 'دعوت نامه از اعضای کمیسیون';
            this.WFLegendWidth = 13;
            this.SetLetterDetails();
            break;
          case 26:
          case 49:
          case 113:
          case 182:
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            break;
          case 143:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = true;
            this.IsEditable = false;
            this.btnProposalName = 'دریافت پاکات';
            this.QuestionLabel = '';
            break;
          case 28:
          case 73:
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.HasBtnAutomationLetter = true;
            this.LetterTypeCodeList = [4, 5];
            break;
          case 31:
            this.QuestionLabel = 'آیا اسناد ضمانت نامه در مهلت قانون دریافت گردید ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyMoratorium;
            break;
          case 33:
            this.gridHeight = 30;
            this.tabpanelHeight = 78;
            this.PRIgridHeight = 76;
            this.MultiWfDetailsShowHeight = 90;
            this.FirstWFFieldSetLegend = 'نامه ضبط سپرده';
            this.FirstWFLegendWidth = 9;
            this.LetterTypeCodeList.push(12);
            this.SecondLetterTypeCode = 8;
            this.SecondWFFieldSetLegend = 'نامه اخطاريه';
            this.SecondWFLegendWidth = 12;
            this.WfSaveDetailsShow = this.MultiWfDetailsShow = true;
            this.WfDetailsShow = false;
            this.IsEditable = false;
            this.TopQuestionLabel = 'آیا ضمانت نامه توسط پیمانکار ارائه گردید؟';
            this.IsLawful = this.ProductRequestObject.IsWarrantyProvided;
            this.SetLetterDetails();
            this.SetSecondLetterDetails();
            break;
          case 34:
          case 136:
          case 78:
          case 186:
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = this.HaveCompleteInfo = true;
            this.WarrantyDocGridHeight = 100;
            this.MultiWfDetailsShowHeight = 40;
            this.FirstWFLegendWidth = 0;
            this.MultiWfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(7);
            this.HasBtnAutomationLetter = true;
            this.HaveSecondFieldSet = false;
            this.InsertSupplierIntoPropsal();
            break;
          case 100:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 46;
            this.HaveOnlyLetter = this.HaveCompleteInfo = true;
            this.IsEditable = this.WfSaveDetailsShow = false;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(22);
            this.WFFieldSetLegend = 'نامه تاییدیه اطلاعات پیوست 4';
            this.WFLegendWidth = 13;
            this.SetLetterDetails();
            break;
          case 36:
          case 77:
            this.ParentDocType = 58;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(58, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            break;
          case 37:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.HaveReceiveDoc = false;
            this.HaveCompleteInfo = true;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.MultiWfDetailsShow = false;
            this.WfSaveDetailsShow = true;
            this.HaveCommition = true;
            this.IsEditable = false;
            this.TopQuestionLabel = null; // RFC 50573 & 50728
            this.IsLawful = this.ProductRequestObject.HaveWinner;
            this.HaveMultiOnlyLetter = false;
            break;
          case 107:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.HaveReceiveDoc = false;
            this.HaveCompleteInfo = true;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.MultiWfDetailsShow = false;
            this.WfSaveDetailsShow = true;
            this.HaveCommition = true;
            this.IsEditable = false;
            this.TopQuestionLabel = null; // RFC 50573 & 50728
            this.IsLawful = this.ProductRequestObject.HaveWinner;
            this.HaveMultiOnlyLetter = false;
            if (!this.ProductRequestObject.IsCost &&
              this.ProductRequestObject.ContractTypeCode === 22 &&
              this.ProductRequestObject.DealMethodCode === 6 &&
              this.SumFinalAmountStr === '1') {
              this.IsSumEditableType107 = true;  // RFC 60364
            }
            break;
          case 45:
            this.gridHeight = 31;
            this.tabpanelHeight = 79;
            this.PRIgridHeight = 76;
            this.MultiWfDetailsShowHeight = 100;
            this.FirstWFFieldSetLegend = 'نامه لغو کمیسیون';
            this.FirstWFLegendWidth = 8;
            this.LetterTypeCodeList.push(9);
            this.SecondLetterTypeCode = 2;
            this.SecondWFFieldSetLegend = 'نامه دعوت به جلسه';
            this.SecondWFLegendWidth = 9;
            this.MultiWfDetailsShow = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = true;
            this.HaveCommition = false;
            this.HaveLetterWithCommitionDate = true;
            this.SetLetterDetails();
            this.SetSecondLetterDetails();
            this.SetOrderCommition();
            this.IsEditable = false;
            this.HaveMultiOnlyLetter = true;
            break;
          case 46:
            this.gridHeight = 40;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 82;
            this.MultiWfDetailsShowHeight = 50;
            this.FirstWFFieldSetLegend = 'نامه دعوت به جلسه';
            this.FirstWFLegendWidth = 8;
            this.LetterTypeCodeList.push(2);
            this.MultiWfDetailsShow = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = true;
            this.HaveCommition = true;
            this.HaveLetterWithCommitionDate = true;
            this.SetLetterDetails();
            this.SetOrderCommition();
            this.IsEditable = false;
            this.HaveMultiOnlyLetter = false;
            this.HaveSecondFieldSet = false;
            break;
          case 47:
          case 166:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.SecondWFFieldSetLegend = 'نامه استعلام اعتبار ضمانت نامه';
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = false;
            this.HaveOnlyLetter = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            this.HaveReceiveDoc = false;
            break;
          case 149: // RFC 58875
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.SecondWFFieldSetLegend = 'نامه استعلام اعتبار ضمانت نامه';
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = false;
            this.HaveOnlyLetter = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            this.HaveReceiveDoc = false;
            break;
          case 112:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.SecondWFFieldSetLegend = 'نامه استعلام اعتبار ضمانت نامه';
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = true; // RFC 52131
            this.HaveSave = true;
            this.HaveOnlyLetter = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            this.HaveReceiveDoc = false;
            this.CommitionSubjectChange = true; // RFC 52131
            this.CommitionSubjectChangeBtnText = 'اصلاح موضوع';
            break;
          case 48:
            this.QuestionLabel = 'آیا نیاز به اصلاح اعتبار دارد ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsNeedCreditModification;
            break;
          case 50:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.HaveOnlyLetter = this.HaveCompleteInfo = true;
            this.IsEditable =
              this.WfSaveDetailsShow = false;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(10);
            this.WFFieldSetLegend = 'نامه ارسال به ماده 18';
            this.WFLegendWidth = 10;
            this.SetLetterDetails();
            break;
          case 51: //RFC 51957
            this.gridHeight = 41;
            this.tabpanelHeight = 78;
            this.PRIgridHeight = 76;
            this.WfSaveDetailsShow = true;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.IsLawful = this.ProductRequestObject.HaveWinner;
            this.SetLetterDetails();
            this.SetSecondLetterDetails();
            this.HasBtnAutomationLetter = true;
            this.LetterTypeCodeList = [10, 11];
            this.QuestionLabel = 'آیا مناقصه برنده دارد؟';
            this.WfDetailsShowHeight = 35;
            this.WfDetailsShow = true;
            break;
          case 53:
            this.HaveOnlyLetter = this.HaveCompleteInfo = true;
            this.HaveCommition = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = true;
            this.LetterTypeCodeList.push(6);
            this.HasBtnAutomationLetter = true;
            break;
          case 54:
            this.gridHeight = 48.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.HaveOnlyLetter = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = true;
            this.SetPRWarrantyReciveDocList();
            this.WarrantyDocGridHeight = 100;
            this.tabpanelWarrantyDocHeight = 87;
            this.HaveReceiveDoc = true;
            this.WfSaveDetailsShow = true;
            this.HasBtnAutomationLetter = true; // 65470
            this.LetterTypeCodeList.push(7);
            this.WFLegendWidth = 12;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            break;
          case 41:
            this.MultiWfDetailsShow = this.HaveCompleteInfo = true;
            this.gridHeight = 32;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiWfDetailsShowHeight = 90;
            this.MultiQuestionLabel = true;
            this.MultiQuestionLabel = 'آیا ضمانت نامه پیمانکار ارائه گردید؟';
            this.SecondWFFieldSetLegend = 'نامه اخطاریه';
            this.SecondWFLegendWidth = 7;
            this.HaveMultiOnlyLetter = true;
            this.WfSaveDetailsShow = true;
            this.SecondLetterTypeCode = 8;
            this.IsLawful = this.ProductRequestObject.IsWarrantyProvided;
            this.SetSecondLetterDetails();
            break;
          case 44:
            //  this.gridHeight = 33;
            //  this.tabpanelHeight = 75;
            //  this.PRIgridHeight = 74;
            this.HasCreateContractBtn = this.HaveCompleteInfo = true;
            this.ParentDocType = 45;
            this.HaveCommition = false;
            //   this.MultiWfDetailsShowHeight = 80;
            //  this.FirstWFLegendWidth = 0;
            //   this.SecondWFLegendWidth = 0;
            //  this.MultiWfDetailsShow = true;
            //  this.WfSaveDetailsShow = true;
            // new Promise((resolve, reject) => {
            //   this.SetContractObject(resolve);
            // }).then(() => {
            //   this.onSignersOpen(1);
            // });
            this.IsEditable = false;
            break;
          case 52:
            this.ParentDocType = 46;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(46, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(3);
            this.HasBtnAutomationLetter = true;
            // RFC 52153
            this.HasCreateContractBtn = true;
            if (this.ProductRequestObject.RegionCode === 200 && this.ProductRequestObject.IsCost) {
              this.ShowRequestSuggestion = true;
              this.HaveCompleteInfo = false;
            } else {
              this.ShowRequestSuggestion = false;
              this.HaveCompleteInfo = true;
              this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            }
            this.WorkflowButtonsWidth = 40.8;
            this.ButtonsPlaceWidthPercent = 59;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
            } else {
              this.HasSecretQuestion = true;
              this.ShowSave106 = true;
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 48;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
            }
            break;
          case 174: // RFC 62866
            this.ParentDocType = 46;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(46, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(3);
            this.LetterTypeCodeList.push(33);
            this.HasBtnAutomationLetter = true;
            // RFC 52153
            this.HasCreateContractBtn = true;
            if (this.ProductRequestObject.RegionCode === 200 && this.ProductRequestObject.IsCost) {
              this.ShowRequestSuggestion = true;
              this.HaveCompleteInfo = false;
            } else {
              this.ShowRequestSuggestion = false;
              this.HaveCompleteInfo = true;
              this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            }
            this.WorkflowButtonsWidth = 40.8;
            this.ButtonsPlaceWidthPercent = 59;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
            } else {
              this.HasSecretQuestion = true;
              this.ShowSave106 = true;
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 48;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
            }
            break;
          case 55:
            this.QuestionLabel = 'آیا ضمانت نامه اعتبار دارد ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            break;
          case 56:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.HaveOnlyLetter = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = true;
            this.WfDetailsShow = true;
            this.LetterTypeCodeList.push(13);
            this.WFFieldSetLegend = 'نامه پیمانکار';
            this.WFLegendWidth = 5.5;
            this.SetLetterDetails();
            break;
          case 59:
            this.QuestionLabel = 'آیا تعداد پیشنهاد دهندگان به حد نصاب تعیین شده در مجوز رسیده است ؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.HaveQuotaOfSuggestions;
            break;
          case 60:
            this.gridHeight = 40;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 82;
            this.MultiWfDetailsShowHeight = 50;
            this.FirstWFFieldSetLegend = 'نامه دعوت به جلسه';
            this.FirstWFLegendWidth = 8;
            this.LetterTypeCodeList.push(2);
            this.MultiWfDetailsShow = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = true;
            this.HaveLetterWithCommitionDate = true;
            this.SetLetterDetails();
            this.SetOrderCommition();
            this.IsEditable = false;
            this.HaveCommition = this.HaveMultiOnlyLetter = false;
            this.HaveSecondFieldSet = false;
            break;
          case 61:
            this.QuestionLabel = 'آیا مناقصه برنده دارد؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.HaveWinner;
            break;
          case 62:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 86;
            this.LetterTypeCodeList.push(10);
            this.LetterTypeCodeList.push(11);
            this.SecondWFLegendWidth = 13;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveArticle18 = this.HaveAcceptArticle18 = true;
            this.HaveTopExpertPerson = true;
            this.onExpertOpen(1);
            this.HasBtnAutomationLetter = true;
            break;
          case 63:
            this.LetterTypeCodeList.push(10);
            this.LetterTypeCodeList.push(11);
            this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveArticle18 = this.HaveAcceptArticle18 = true;
            this.HasBtnAutomationLetter = true;
            break;
          case 65:
            this.gridHeight = 30;
            this.tabpanelHeight = 73;
            this.PRIgridHeight = 69;
            this.MultiWfDetailsShowHeight = 90;
            this.FirstWFFieldSetLegend = 'نامه ارسال به ماده 18';
            this.FirstWFLegendWidth = 9;
            this.LetterTypeCodeList.push(10);
            this.SecondLetterTypeCode = 11;
            this.SecondWFFieldSetLegend = 'نامه تاييد يا عدم تاييد ماده 18';
            this.SecondWFLegendWidth = 13;
            this.WfSaveDetailsShow = this.MultiWfDetailsShow = true;
            this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveArticle18 = this.HaveAcceptArticle18 = this.HaveCompleteInfo = true;
            this.TopQuestionLabel = 'آیا مناقصه برنده دارد؟';
            this.IsLawful = this.ProductRequestObject.HaveWinner;
            this.SetLetterDetails();
            this.SetSecondLetterDetails();
            break;
          case 66:
            this.HasBtnAutomationLetter = true;
            this.HasCreateContractBtnText = 'ایجاد قرارداد';
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.HasCreateContractBtn = this.HaveCompleteInfo = true;
            this.LetterTypeCodeList = [3, 21, 29, 20, 34];
            //this.SetLetterDetails();
            this.ParentDocType = 59;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(59, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.HaveCommition = false;
            this.gridHeight = 48.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            //  this.WfDetailsShowHeight = 50;
            this.IsEditable = false;
            this.WfDetailsShow = false;
            //  this.HaveOnlyLetter = true;
            //  this.WFFieldSetLegend = 'ثبت اطلاعات نامه ابلاغیه';
            //  this.WFLegendWidth = 10;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 84;
                this.PRIgridHeight = 82;
                this.IsShowContractContentfor222 = true;
              }// RFC 56864  & 58194
            }
            break;
          case 67:
            this.HaveAcceptArchive = this.IsEditable = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 68:
          case 169: // RFC 61935
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.HaveReceiveDoc = false;
            this.HaveCompleteInfo = true;
            this.SecondWFFieldSetLegend = 'نامه استعلام اعتبار ضمانت نامه';
            this.WfDetailsShow = false;
            this.HaveCommition = true;
            this.WfSaveDetailsShow = false;
            this.IsEditable = false;
            this.HaveOnlyLetter = false;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            break;
          case 69:
            this.IsEditable = false;
            this.IsDisableBtnContract = false;
            this.HaveCompleteInfo = true;
            this.ShowRequestSuggestion = true;
            break;
          case 74:
            this.HaveArchive = true;
            this.ArchiveIsReadOnly = false;
            this.HaveProvision =
              this.HaveSeenProvision =
              this.HaveRevocation =
              this.IsEditable =
              this.WfSaveDetailsShow =
              this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            break;
          case 115: // RFC 51274
            this.ArchiveIsReadOnly = false;
            this.HaveProvision =
              this.HaveSeenProvision =
              this.HaveRevocation =
              this.IsEditable =
              this.WfSaveDetailsShow =
              this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            break;
          case 80:
          case 138:  // RFC 57761
            this.HaveArchive = true;
            this.IsEditable = false;
            this.btnProposalName = 'بارگذاری آگهی';
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onExpertOpen(1);
            this.HaveInquiry = true;
            break;
          case 184:
            this.HaveArchive = true;
            this.IsEditable = false;
            this.btnProposalName = 'بارگذاری آگهی';
            this.gridHeight = 48;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = true;
            this.HaveInquiry = true;
            break;
          case 81:
          case 147:
          case 187:
            this.HaveRevocation = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = true;
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            if (this.ProductRequestObject.IsRenewal != null) {
              this.IsRenewal = this.ProductRequestObject.IsRenewal;
            }
            this.Renewal = true;
            this.IsType147 = this.ModuleViewTypeCode === 147 ? true : false;
            break;
          case 64:
            this.ParentDocType = 40; // 63829
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(40, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج جزییات آگهی';
            break;
          case 133:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'تنظیم فرم مزایده';
            break;
          case 134:
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'درج جزییات آگهی';
            break;
          case 88:
            this.ParentDocType = 261; //RFC 52273
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(261, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.ExpertPersonRoleID = 1043;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            if (this.ProductRequestObject.DealMethodCode === 3 && this.ProductRequestObject.RegionCode === 217) {
              this.HaveExpertPerson = this.WfDetailsShow = true;  // RFC 52224
              this.WfSaveDetailsShow = true;
            }
            this.HaveCompleteInfo = false;
            this.WfDetailsShowHeight = 40;
            this.ExpertPersonLabel = 'کارشناس بازرگانی';
            this.IsEditable = false;
            this.ShowRequestSuggestion = true;

            this.onExpertOpen(1);
            break;
          case 89:
            this.ContractContentView();
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.IsEditable = true;
            this.HaveSave = true;
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.HaveCompleteInfo = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.IsSecretQuestion = true;
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
              this.ExpertPersonRoleID = 1442;
              this.HaveExpertPerson = true;
              this.WfDetailsShowHeight = 36;
              this.WfDetailsShow = true;
              this.ExpertPersonLabel = ' رئیس امور';
              this.onExpertOpen(1);
            } else {
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 40;
              this.tabpanelHeight = 76;
            }
            if (this.IsCost === false) {
              this.ISActLocation = true;
            } else {
              this.ISActLocation = false;
            }
            this.HasSecretQuestion = true;
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; // RFC 51689 - 63989
            this.gridHeight = 33;
            this.PRIgridHeight = 80;
            break;
          case 106:
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.IsDisabledType106 = this.IsEditable = false;
            this.HaveRequestPerson = true;
            this.StartAndEndDateIsEditable = this.ShowRequestSuggestion = this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = this.HaveCompleteInfo = false;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.IsSecretQuestion = true;
            this.btnConfirmAndReturnName = 'بازگشت';
            this.ShowReturnBtn = true;
            this.ShowConfermBtn = this.ShowSendBtn = false;
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
            } else {
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 40;
              this.tabpanelHeight = 76;
            }
            if (this.IsCost === false) {
              this.ISActLocation = true;
            } else {
              this.ISActLocation = false;
            }
            this.HasSecretQuestion = true;
            this.ShowSave106 = true;
            break;
          case 90:
          case 141: // RFC 57662
            this.HaveOnlyLetter = true;
            this.SecondWFLegendWidth = 9;
            this.HaveInquiry = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.HaveCompleteInfo = true;
            this.IsDisable = false;
            this.IsEditable = false; // RFC 50990
            this.LetterTypeCodeList.push(18);
            this.gridHeight = 47;
            this.tabpanelHeight = 82;
            break;
          case 129:
            this.SecondWFLegendWidth = 9;
            this.HaveInquiry = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.HaveCompleteInfo = true;
            this.IsDisable = false;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(18);
            this.gridHeight = 47;
            this.tabpanelHeight = 82;
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            }); // RFC 54418
            this.HaveAcceptArchive = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveContractStyle = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onContractStyleOpen(1);
            this.IsEditable = false;
            break;
          case 185:
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.SecondWFLegendWidth = 9;
            this.FirstWFLegendWidth = 0;
            this.HaveInquiry = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.HaveCompleteInfo = true;
            this.IsDisable = false;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(18);
            this.gridHeight = 47;
            this.tabpanelHeight = 82;
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveContractStyle = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onContractStyleOpen(1);
            this.HaveExpertPerson = false;
            this.HaveCommition = true;
            this.IsEditable = false;
            break;
          case 91:
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveSupervisorPerson = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.onFirstSupervisorOpen(1);
            this.onSecondSupervisorOpen(1);
            break;
          case 92:
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.HasCompleteSave = true;
            this.MakeScRadioTypes();
            this.HaveHsePlanQuestion = true;
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            break;
          case 94:
            this.btnProposalName = 'تکمیل اطلاعات مناقصه';
            this.HaveInquiry = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            break;
          case 95:
            this.IsEditable = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.PRIgridHeight = 75;
            this.gridHeight = 29;
            this.tabpanelHeight = 73;
            this.WorkflowButtonsWidth = 40.8;
            this.ButtonsPlaceWidthPercent = 59;
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.ISDisabledConfirmAndReturnBtn = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.IsSecretQuestion = true;
            this.MakeScRadioTypes();
            if (this.ProductRequestObject.RegionCode === 200) {
              this.ShowRequestSuggestion = true;
              this.IsEditable = false;
              this.ShowQuestion = true;
            }
            if (!this.IsCost) {
              this.gridHeight = 40;
              this.tabpanelHeight = 76;
              this.ShowMCSPanel = false;
              this.HasMutualContractQuestion = false;
            } else {
              this.gridHeight = 29;
              this.tabpanelHeight = 73;
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.IsCost === false) {
              this.ISActLocation = true;
            } else {
              this.ISActLocation = false;
            }
            this.HasSecretQuestion = true;
            break;
          case 96:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.WfDetailsShowHeight = 0;
            this.FirstWFLegendWidth = 0;
            this.LetterTypeCodeList.push(7);
            this.SecondWFLegendWidth = 15;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.SecondWFFieldSetLegend = 'نامه استعلام اعتبار ضمانت نامه';
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = true;
            this.HaveSave = true;
            this.HaveOnlyLetter = true;
            this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
            this.HaveReceiveDoc = false;
            this.CommitionSubjectChange = true; // RFC 52131
            this.CommitionSubjectChangeBtnText = 'اصلاح موضوع';
            break;
          case 97:
            this.QuestionLabel = 'آیا پیش نویس الحاقیه مورد تایید است؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsConfirmOrderDraft;
            break;
          case 98:
            this.HaveSeenProvision = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.ShowReturnBtn = true;
            this.ShowConfermBtn = false;
            this.ShowSendBtn = false;
            break;
          case 99:
            this.NotIsNewHeaderName = 'تمدید و الحاقیه'; // RFC 56855
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.IsEditable = true;
            this.HaveSave = true;
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HasBtnAutomationLetter = true;
            break;
          case 101:
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.ParentDocType = 44;
            this.HaveAcceptArchive = true;
            break;
          case 102:
            this.QuestionLabel = 'آیا پیمانکار مورد تایید است؟';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.WfDetailsShowHeight = 35;
            this.IsEditable = false;
            this.HasBtnShowContractors = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = true;
            this.HaveCompleteInfo = true;
            this.IsLawful = this.ProductRequestObject.IsConfirmContractor;
            break;
          case 103:
            this.ExpertPersonRoleID = 1052;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShow = this.HaveExpertPerson = false;
            this.ExpertPersonLabel = 'معاونت تخصصی ستاد';
            if (this.ProductRequestObject.RelatedContractID &&
              this.currentRegionObject.RegionGroupCode === 3) {
              this.WfDetailsShow = this.HaveExpertPerson = this.WfSaveDetailsShow = true;
            } else if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9 ||
              this.ProductRequestObject.DealMethodCode === 1 || this.ProductRequestObject.DealMethodCode === 2) {
              this.WfDetailsShow = this.HaveExpertPerson = true;
            } else if (this.ProductRequestObject.DealMethodCode === 7 || this.ProductRequestObject.DealMethodCode === 8) {
              this.WfDetailsShow = this.HaveExpertPerson = this.ProductRequestObject.IsBaselineScrolling; // RFC 52147  52380
            }
            this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfSaveDetailsShow = true;
            this.onExpertOpen(1);
            this.IsEditable = false;
            break;
          case 108:
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            this.HaveCompleteInfo = true;
            this.IsShowType108 = true;
            this.WarrantyDocGridHeight = 100;
            this.MultiWfDetailsShowHeight = 40;
            this.FirstWFLegendWidth = 0;
            this.MultiWfDetailsShow = true;
            this.IsEditable = false;
            this.LetterTypeCodeList.push(7);
            this.HaveSecondFieldSet = false;
            this.HasBtnAutomationLetter = true;
            break;
          case 111:
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveArchive = this.HaveCompleteInfo = true;
            this.ConfirmArchiveBtnText = 'مستندات';
            this.DisableControlles = true;
            this.IsDisable = false;
            if (this.ProductRequestObject.RegionCode === 200 && this.ProductRequestObject.IsRenewal) {
              this.gridHeight = 41;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
              this.HaveUpdateTenderDoc = true;
              this.WfSaveDetailsShow = true;
              this.IsUpdateTenderDoc = this.ProductRequestObject.IsUpdateTenderDoc;
              this.MakeTDRadioTypes();
            }
            break;
          case 114: // RFC 51209
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.IsEditable = true;
            this.HaveSave = true;
            if (!this.IsCost) { // RFC 56442
              this.HaveProvision = false;
            } else {
              this.HaveProvision = true;
            }
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.HaveCompleteInfo = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            if (this.ContractParams.selectedObject && this.RegionParams.selectedObject === 222) {
              this.LetterTypeCodeList = [23, 20, 26, 28]; // RFC 54497
            } else {
              this.LetterTypeCodeList = [23, 20, 26]; // RFC 51334 && 54221
            }
            this.HasBtnAutomationLetter = true;
            this.btnProvisionName = 'پیشنهاد تامین';
            this.AutomationLetterBtnText = 'نامه';
            this.RequestSuggestionBtnText = 'اطلاعات';
            this.RequestedPersonDisable = true; // RFC 51334
            this.IsType114 = true; // RFC 51334
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; // RFC 51689
            // RFC 51591
            this.ContractContentView();
            if (this.ProductRequestObject.RegionCode === 222 &&
              this.ProductRequestObject.ConsultantSelectTypeCode === 1 &&
              this.ProductRequestObject.DealMethodCode === 11
            ) {
              this.HaveInquiry = true;
              this.btnProposalName = 'متقاضیان';
              this.btnProvisionName = 'تامین';
            }
            break;
          case 116: // RFC 51328
            this.gridHeight = 48;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 45;
            this.SecondWFFieldSetLegend = 'نامه دعوت به جلسه';
            this.FirstWFLegendWidth = 0;
            this.SecondWFLegendWidth = 16;
            this.LetterTypeCodeList.push(2);
            this.WfDetailsShow = false;
            this.WfSaveDetailsShow = false;
            this.IsEditable = true;
            this.HaveSave = true;
            this.HaveOnlyLetter = false;
            this.HasBtnAutomationLetter = true;
            this.AutomationLetterBtnText = 'نامه';
            this.RequestSuggestionBtnText = 'اطلاعات';
            break;
          case 145:
          case 117: // RFC 51354
            this.HaveArchive = true;
            this.IsEditable = false;
            this.btnProposalName = 'بارگذاری آگهی';
            this.gridHeight = 49;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveCompleteInfo = true;
            this.HaveInquiry = true;
            break;
          case 118:
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            break;
          case 100000: // اصلاح درخواست
            this.HaveRequestPerson = true;
            this.IsUpdateBefore = true;
            this.IsUpdateBeforeAdevertising = this.ProductRequestObject.IsUpdateBeforeAdevertising;
            this.MakeIcRadioTypes();
            this.ShowWorkflowButtons = false; // دکمه های ورک فلو نمایش داده نشود
            this.ButtonsPlaceWidthPercent = 100; // عرض دیو دکمه ها کامل شود
            this.HaveSave = true;
            this.IsEditable = true;
            this.HaveArchive = true;
            this.HaveProvision = true;
            this.HaveSeenProvision = true;
            this.HaveRevocation = false;
            this.HaveCommition = true;
            this.HasCreateContractBtn = true;
            this.IsDisable = false;
            this.HaveInquiry = true;
            this.IsShow = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.LetterTypeCodeList.push(6);
            this.LetterTypeCodeList.push(2);
            this.HasBtnAutomationLetter = true;
            // RFC 51573
            this.HasSecretQuestion = true;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.HasMutualContractQuestion = true;
            this.IsSecretQuestion = true;
            this.gridHeight = 42; // RFC 57522
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
              this.ShowMCSPanel = false;
              this.gridHeight = 40;
              this.tabpanelHeight = 76;
            } else {
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            }
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            break;
          case 110000:
            this.HasPrintBtn = false;
            this.HaveAsset = false;
            this.HasBtnAutomationLetter = this.HasMutualContractQuestion = this.HasSecretQuestion = false;
            this.IsSecretQuestion = this.HaveProvision = this.HaveSeenProvision = false;
            this.HaveRequestPerson = false;
            this.ShowWorkflowButtons = false; // دکمه های ورک فلو نمایش داده نشود
            this.ButtonsPlaceWidthPercent = 100; // عرض دیو دکمه ها کامل شود
            this.HaveSave = true;
            this.IsEditable = true;
            this.HaveArchive = true;
            this.HaveRevocation = false;
            this.HaveCommition = true;
            this.HasCreateContractBtn = true;
            this.IsDisable = false;
            this.HaveInquiry = true;
            this.IsShow = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            break;
          case 200000: // اصلاح درخواست - ابزار
            this.IsEditable = true;
            this.HaveSave = true;
            this.IsDisable = false;
            this.IsContractDisable = false;
            this.HaveCompleteInfo = true;
            this.HaveRevocation = false;
            this.IsShow = true;
            this.RequestedPersonDisable = true;
            this.HaveInquiry = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.HasCreateContractBtn = true; // RFC 55024
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.gridHeight = 42; //RFC 57522
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            break;
          case 300000: // اصلاح درخواست - ابزار
            this.IsUpdateBefore = true;
            this.IsUpdateBeforeAdevertising = this.ProductRequestObject.IsUpdateBeforeAdevertising;
            this.HasSecretQuestion = true;
            this.MakeIcRadioTypes();
            this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.HaveArchive = true;
            this.IsContractDisable = false;
            this.HaveSave = true;
            this.IsEditable = true;
            this.HaveAcceptArchive = false;
            this.HaveProvision = true;
            this.HaveSeenProvision = true;
            this.HaveRevocation = false;
            this.HaveCommition = true;
            this.IsDisable = false;
            this.IsShow = true;
            this.HaveInquiry = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.HasCreateContractBtn = true; // RFC 55024
            this.gridHeight = 42; //RFC 57522
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            this.ShowTrafficSign = true;
            break;
          case 400000: // جستجو
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.ConfirmArchiveBtnText = 'مستندات';
            this.HaveCompleteInfo = true;
            this.HaveArchive = true; // RFC 52600
            this.HaveAcceptArchive = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.IsShow = true;
            this.HaveProvision = this.HaveSeenProvision = true; // RFC 51895
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.HaveCommition = this.HaveInquiry = true; // RFC 52811
            this.btnProposalName = 'درج لیست متقاضیان'; // RFC 52811
            this.gridHeight = 42; // RFC 57522
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            this.IsEditeSearch = false;
            break;
          case 800000: // جستجو خدمات شهری
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.ConfirmArchiveBtnText = 'مستندات';
            this.HaveCompleteInfo = true;
            this.HaveArchive = true;
            this.HaveAcceptArchive = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.HaveSeenProvision = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            break;
          case 500000: // جستجو
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = false;
            this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.HaveArchive = true;
            this.ConfirmArchiveBtnText = 'مستندات';
            this.HaveAcceptArchive = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.WfSaveDetailsShow = false;
            this.onExpertOpen(1);
            this.IsEditable = false;
            this.IsShow = true;
            this.HaveCommition = true;
            this.HaveInquiry = false;
            this.btnProposalName = '';
            this.gridHeight = 42;
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            this.IsEditeSearch = false;
            this.HaveSave = false;
            this.HaveTopExpertPerson = false;
            this.CheckRegionWritable = false;
            this.ExpertIsEditable = false;
            break;
          case 600000: // جستجو
            this.IsEditable = false;
            this.HaveCompleteInfo = true;
            this.HaveRevocation = false;
            this.IsShow = true;
            break;
          case 119: // RFC 51374
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 40;
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.HaveCompleteInfo = this.WfSaveDetailsShow = true;
            this.DisableControlles = this.WfDetailsShow = true;
            this.IsDisable = false;
            this.IsHoldOnline = true;
            break;
          case 120: // RFC 51878
            this.HaveRevocation = this.ProductRequestObject ? true : false;
            this.IsDisabledType106 = this.IsEditable = false;
            this.HaveRequestPerson = true;
            this.StartAndEndDateIsEditable = this.ShowRequestSuggestion = this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = this.HaveCompleteInfo = false;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.IsSecretQuestion = true;
            this.btnConfirmAndReturnName = 'بازگشت';
            this.ShowReturnBtn = true;
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
            } else {
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 40;
              this.tabpanelHeight = 76;
            }
            if (this.IsCost === false) {
              this.ISActLocation = true;
            } else {
              this.ISActLocation = false;
            }
            this.HasSecretQuestion = true;
            this.ShowSave106 = true;
            break;
          case 127: // RFC 54162
            this.ParentDocType = 45;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveContractStyle = this.HaveCompleteInfo = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.onContractStyleOpen(1);
            this.IsEditable = false;
            this.HaveRevocation = true;
            break;
          case 128: // RFC 54244
            this.btnProposalName = 'درج لیست متقاضیان'; // پیرو درخواست 49746 نام دکمه تغییر کرد
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            break;
          case 121:
            this.AutomationLetterBtnText = 'اتصال نامه';
            this.LetterTypeCodeList.push(25);
            this.SecondWFFieldSetLegend = 'نامه دعوت از اعضاء هیئت مدیره';
            // this.HaveSecondFieldSet = true;
            this.HasBtnAutomationLetter = true;
            this.HaveSave = true;
            this.HasCompleteSave = true;
            this.gridHeight = 36;
            this.tabpanelHeight = 81;
            this.PRIgridHeight = 80;
            this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.BoardDecisions = true;
            break;
          case 122: // RFC 53422
            this.HaveInquiry = this.HaveCompleteInfo = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsEditable = false;
            this.btnProposalName = 'بارگذاری آگهی';
            this.HaveInquiry = true;
            break;
          case 130:
            this.HaveOnlyLetter = true;
            this.SecondWFLegendWidth = 9;
            this.HaveInquiry = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.HaveCompleteInfo = true;
            this.IsDisable = false;
            this.IsEditable = false; // RFC 50990
            this.LetterTypeCodeList.push(18);
            this.gridHeight = 47;
            this.tabpanelHeight = 82;
            this.ParentDocType = 45;
            new Promise((resolve, reject) => {
              this.GetADocType(45, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            this.HaveArchive = true; // RFC 57759
            break;
          case 140:
            this.WfSaveDetailsShow = this.WfDetailsShow = this.IsEditable = false;
            this.HaveCompleteInfo = this.HaveCommition = this.HaveDigitalSign = true;
            break;
          case 144:
            this.WfSaveDetailsShow = this.WfDetailsShow = this.IsEditable = false;
            this.HaveCompleteInfo =
              this.HaveCommition =
              this.HaveDigitalSign =
              this.HaveArticle18DigitalSign = true;
            break;
          case 179:
            this.WfSaveDetailsShow = this.WfDetailsShow = this.IsEditable = false;
            this.HaveCompleteInfo =
              this.HaveCommition =
              this.HaveDigitalSign = true;
            if (this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22 &&
                (this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode !== '09' ||
                (this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode == '09'
                   && this.ProductRequestObject.ContractTypeCode && this.ProductRequestObject.ContractTypeCode == 4))
            ) { // خدمات شهری نباشد
              this.HaveArticle18DigitalSign = true;
            }
            this.CheckPDFSignersInfo();
            break;
          case 150: // RFC 58866
          case 154: // RFC 59115
            this.IsEditable = false;
            this.ArchiveIsReadOnly = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            this.LetterTypeCodeList.push(this.ModuleViewTypeCode === 150 ? 30 : 32);
            this.HasBtnAutomationLetter = true;
            this.ParentDocType = this.ModuleViewTypeCode === 150 ? 867 : 909;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(this.ParentDocType, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 85;
                this.PRIgridHeight = 83;
                this.IsShowContractContentfor222 = true;
              }
            }
            break;
          case 151: // RFC 58964 برای واحد حمل و نقل
            this.IsEditable = false;
            this.ArchiveIsReadOnly = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            this.LetterTypeCodeList.push(31);
            this.HasBtnAutomationLetter = true;
            this.ParentDocType = 907;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(907, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.HaveAcceptArchive = true;
            break;
          case 156:
          case 163:
            this.gridHeight = 49;
            this.tabpanelHeight = 87;
            this.PRIgridHeight = 85;
            this.WarrantyDocGridHeight = 75;
            this.tabpanelWarrantyDocHeight = 82;
            this.HaveCommition = this.HaveCompleteInfo = true;
            this.WfDetailsShow = this.WfSaveDetailsShow = this.IsEditable = this.HaveReceiveDoc = false;
            break;
          case 157: // حمل و نقل
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 85;
                this.PRIgridHeight = 83;
                this.IsShowContractContentfor222 = true;
              } // RFC 56864 & 58194
            }
            this.HaveInquiry = true;
            this.btnProposalName = 'درج جزئیات آگهی';
            break;
          case 159: // مدیریت پسماند
            this.HaveCompleteInfo = true;
            this.IsEditable = this.WfSaveDetailsShow = false;
            this.WfDetailsShow = true;
            break;
          case 168: // RFC 61821
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 85;
                this.PRIgridHeight = 83;
                this.IsShowContractContentfor222 = true;
              } // RFC 56864 & 58194
            }
            this.ParentDocType = 38;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(38, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = 'مستندات ';
            });
            this.HaveAcceptArchive = true;
            this.ArchiveIsReadOnly = false;
            break;
          case 177: // like case 3
            this.HasAdequacyDoc = true; // 63153
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.DisableControlles = true;
            this.IsDisable = false;
            if (this.RegionParams.selectedObject === 222) {
              if (!this.IsNew) {
                this.gridHeight = 41;
                this.tabpanelHeight = 85;
                this.PRIgridHeight = 83;
                this.IsShowContractContentfor222 = true;
              } // RFC 56864 & 58194
            }
            break;
          case 190:
            this.HasCreateContractBtn = true;
            this.ParentDocType = 46;
            // tslint:disable-next-line:no-shadowed-variable
            new Promise((resolve, reject) => {
              this.GetADocType(46, resolve);
            }).then((DocType: any) => {
              this.ArchiveBtnText = DocType.DocumentTypeName;
            });
            this.LetterTypeCodeList.push(20);
            this.LetterTypeCodeList.push(34);
            this.HaveAcceptArchive = true;
            this.HaveCommition = false;
            this.LetterTypeCodeList.push(3);
            this.HasBtnAutomationLetter = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            this.IsEditable = false;
            // RFC 52153
            if (this.ProductRequestObject.RegionCode === 200 && this.ProductRequestObject.IsCost) {
              this.ShowRequestSuggestion = true;
              this.HaveCompleteInfo = false;
            } else {
              this.ShowRequestSuggestion = false;
              this.HaveCompleteInfo = true;
            }
            this.WorkflowButtonsWidth = 40.8;
            this.ButtonsPlaceWidthPercent = 59;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.MakeScRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
            } else {
              this.HasSecretQuestion = true;
              this.ShowSave106 = true;
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
            }
            if (this.HaveMutualContract && this.HasMutualContractQuestion) {
              this.ShowMCSPanel = true;
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            } else {
              this.ShowMCSPanel = false;
              this.gridHeight = 48;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
            }
            if (this.ProductRequestObject.RegionCode === 220) {
              this.HasSecretQuestion = false; // RFC 54420
              this.ShowMCSPanel = false;
              this.gridHeight = 48;
              this.tabpanelHeight = 84;
              this.PRIgridHeight = 83;
            }
            if (this.ProductRequestObject.RegionCode === 79 || this.ProductRequestObject.RegionCode === 0) {
              this.HasEditContractInfoBtn = true;
              this.CheckContractStatusForUpdate();
            }
            this.InsertSupplierIntoPropsalExtension();

            break;
          default:
            this.IsEditable = false;
            this.HaveCommition = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
        }
      } else if (this.ModuleCode === 2773) {
        this.ShowContractInfo = true;
        this.tabpanelHeight = 82;
        this.gridHeight = 37;
        this.PRIgridHeight = 80;
        // this.ModuleViewTypeCode = 6;
        switch (this.ModuleViewTypeCode) {
          case 1:
            this.HaveProvision = true;
            this.HaveAcceptArchive = true;
            this.IsEditable = false;
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            // this.ISDisabledConfirmAndReturnBtn = true;
            break;
          case 2:
            this.HaveProvision = this.HaveSeenProvision = this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 3:
            this.HaveProvision = this.HaveSeenProvision = true;
            this.HaveRevocation = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 4:
            this.HaveProvision = true;
            this.IsEditable = false;
            this.WfDetailsShow = true;
            this.HaveAlertToFinance = true;
            this.gridHeight = 32;
            this.tabpanelHeight = 80;
            this.WfDetailsShowHeight = 30;
            break;
          case 5:
            this.HaveProvision = true;
            this.QuestionLabel = 'آیا در جریان اعتبار عمل شود ؟';
            this.gridHeight = 32;
            this.tabpanelHeight = 79;
            this.WfDetailsShowHeight = 30;
            this.IsEditable = false;
            this.WfSaveDetailsShow = true;
            this.WfDetailsShow = true;
            this.IsLawful = this.ProductRequestObject.IsProvisionDuring;
            break;
          case 6:
            this.HaveProvision = this.HaveSeenProvision = true;
            this.IsEditable = false;
            this.IsProvideCredit = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.btnProvisionName = 'درخواست تامین اعتبار';
            this.IsRequestProvision = true;
            this.HasCompleteSave = true;
            this.IsNew = false;
            break;
          case 7:  // RFC 51302
            this.HaveProvision = true;
            this.HaveSeenProvision = false;  // RFC 51302
            // this.IsEditable = false;
            this.IsProvideCredit = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.IsRequestProvision = true;
            this.HasCompleteSave = true;
            this.IsNew = false;
            this.IsType114 = true; // RFC 51513
            // this.RequestedPersonDisable = true; // RFC 51513
            this.IsdisablebleAdmin = this.IsAdmin ? false : true; // RFC 51689
            if (this.HaseEstimate) {
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
                  editable: () => {
                    return this.IsEditable;
                  },
                  width: 120,
                  resizable: true,
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
                      return true;
                    } else {
                      params.data.ProductCodeName = '';
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
                  headerName: 'تاریخ شروع', // RFC 51302
                  field: 'PersianStartDate',
                  width: 130,
                  resizable: true,
                  editable: (Params) => {
                    return (!(this.IsNew) && this.ContractParams.selectedObject && Params.data._SelectedContractItem_ng) ? false :
                      this.StartAndEndDateIsEditable ? true : this.IsEditable;
                  },
                  cellEditorFramework: JalaliDatepickerComponent,
                  cellEditorParams: {
                    CurrShamsiDateValue: 'PersianStartDate',
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
                      params.data.ShortStartDate = params.newValue.MDate;
                      params.data.PersianStartDate = params.newValue.SDate;
                      return true;
                    } else {
                      params.data.ShortStartDate = null;
                      params.data.PersianStartDate = '';
                      return false;
                    }
                  }
                },
                {
                  headerName: 'تاریخ پایان',  // RFC 51302
                  field: 'PersianEndDate',
                  width: 130,
                  resizable: true,
                  editable: () => {
                    return this.StartAndEndDateIsEditable ? true : this.IsEditable;
                  },
                  cellEditorFramework: JalaliDatepickerComponent,
                  cellEditorParams: {
                    CurrShamsiDateValue: 'PersianEndDate',
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
                      params.data.ShortEndDate = params.newValue.MDate;
                      params.data.PersianEndDate = params.newValue.SDate;
                      this.gridApi.forEachNode(node => {
                      });
                      return true;
                    } else {
                      params.data.ShortEndDate = null;
                      params.data.PersianEndDate = '';
                      return false;
                    }
                  }
                },
                {
                  headerName: 'مبلغ متره',
                  field: 'VWAmount',
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
            } else {
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
                  editable: () => {
                    return this.IsEditable;
                  },
                  width: 120,
                  resizable: true,
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
                      return true;
                    } else {
                      params.data.ProductCodeName = '';
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
                  headerName: 'تاریخ شروع',  // RFC 51302
                  field: 'PersianStartDate',
                  width: 130,
                  resizable: true,
                  editable: (Params) => {
                    return (!(this.IsNew) && this.ContractParams.selectedObject && Params.data._SelectedContractItem_ng) ? false :
                      this.StartAndEndDateIsEditable ? true : this.IsEditable;
                  },
                  cellEditorFramework: JalaliDatepickerComponent,
                  cellEditorParams: {
                    CurrShamsiDateValue: 'PersianStartDate',
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
                      params.data.ShortStartDate = params.newValue.MDate;
                      params.data.PersianStartDate = params.newValue.SDate;
                      return true;
                    } else {
                      params.data.ShortStartDate = null;
                      params.data.PersianStartDate = '';
                      return false;
                    }
                  }
                },
                {
                  headerName: 'تاریخ پایان',  // RFC 51302
                  field: 'PersianEndDate',
                  width: 130,
                  resizable: true,
                  editable: () => {
                    return this.StartAndEndDateIsEditable ? true : this.IsEditable;
                  },
                  cellEditorFramework: JalaliDatepickerComponent,
                  cellEditorParams: {
                    CurrShamsiDateValue: 'PersianEndDate',
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
                      params.data.ShortEndDate = params.newValue.MDate;
                      params.data.PersianEndDate = params.newValue.SDate;
                      this.gridApi.forEachNode(node => {
                      });
                      return true;
                    } else {
                      params.data.ShortEndDate = null;
                      params.data.PersianEndDate = '';
                      return false;
                    }
                  }
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
                      params.data.FinalAmount = Math.round(parseFloat((!params.newValue || params.newValue == 0) ? 1 : params.newValue) * (params.data.Amount)); // RFC 54950
                    }
                  },
                  valueFormatter: function currencyFormatter(params) {
                    if (params.value && !isUndefined(params.value) && params.value != null) {
                      return params.value;
                    } else {
                      return '';
                    }
                  },
                  HaveThousand: true,
                  width: 90,
                  resizable: true
                },
                {
                  headerName: 'مبلغ واحد پیشنهادی',
                  field: 'Amount',
                  HaveThousand: true,
                  width: 120,
                  resizable: true,
                  cellEditorFramework: NumberInputComponentComponent,
                  cellEditorParams: { IsFloat: true, FloatMaxLength: 4 },
                  editable: () => {
                    return this.IsEditable;
                  },
                  valueSetter: (params) => {
                    if (params.newValue) {
                      params.data.Amount = params.newValue;
                      // tslint:disable-next-line: max-line-length
                      if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
                        params.data.Amount = params.data.FinalAmount;
                      } else {
                        params.data.FinalAmount = Math.round(parseFloat(params.data.QTY) * params.newValue);
                      }
                    }
                  },
                },
                {
                  headerName: 'مبلغ پیشنهادی',
                  field: 'FinalAmount',
                  HaveThousand: true,
                  width: 120,
                  resizable: true,
                  editable: () => {
                    return this.IsEditable;
                  },
                  valueSetter: (params) => {
                    if (params.newValue) {
                      params.data.FinalAmount = params.newValue;
                      if (parseFloat(params.data.QTY) === 0 && this.RegionParams.selectedObject === 201) {
                        params.data.FinalAmount = 0;
                        // tslint:disable-next-line: max-line-length
                      } else if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
                        params.data.Amount = params.data.FinalAmount;
                      } else {
                        params.data.FinalAmount = params.newValue;
                        // tslint:disable-next-line: radix
                        params.data.Amount = (parseInt(params.newValue) / parseFloat(params.data.QTY)).toFixed(4);
                      }
                    }
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
              ];
            }
            break;
          case 60000: // this type is hardCode and is not in database and for view mode
            this.HaveProvision = this.HaveSeenProvision = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
          case 800000: // جستجو خدمات شهری
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.ConfirmArchiveBtnText = 'مستندات';
            this.HaveCompleteInfo = true;
            this.HaveArchive = true;
            this.HaveAcceptArchive = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.HaveSeenProvision = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            break;
          case 100000: // اصلاح درخواست - ابزار
            this.HaveRequestPerson = true;
            this.ShowWorkflowButtons = this.HaveHsePlanQuestion = false; // دکمه های ورک فلو نمایش داده نشود
            this.ButtonsPlaceWidthPercent = 100; // عرض دیو دکمه ها کامل شود
            this.HaveSave = true;
            this.IsEditable = true;
            this.HaveArchive = true;
            this.HaveProvision = true;
            this.HaveSeenProvision = true;
            this.HaveRevocation = false;
            this.HaveCommition = true;
            this.HasCreateContractBtn = true;
            this.IsDisable = false;
            this.HaveInquiry = true;
            this.IsShow = true;
            this.btnProposalName = 'درج لیست متقاضیان';
            this.LetterTypeCodeList.push(6);
            this.LetterTypeCodeList.push(2);
            this.HasBtnAutomationLetter = true;
            this.HasSecretQuestion = false;
            this.MutualContractQuestion = 'آیا نیاز به عقد قرارداد متقابل دارد؟';
            this.HasMutualContractQuestion = true;
            this.IsSecretQuestion = true;
            this.ShowMCSPanel = false;
            this.MakeScRadioTypes();
            this.MakeIcRadioTypes();
            if (!this.IsCost) {
              this.HasMutualContractQuestion = false;
              this.gridHeight = 40;
              this.tabpanelHeight = 76;
            } else {
              this.HasMutualContractQuestion = true;
              this.MakeMCRadioTypes();
              this.MakeMCSRadioTypes();
              this.PRIgridHeight = 76;
              this.gridHeight = 30;
              this.tabpanelHeight = 76;
            }
            this.gridHeight = 38;
            this.tabpanelHeight = 84;
            this.tabpanelHeight = 80;
            this.PRIgridHeight = 76;
            this.MultiQuestionLabel = 'ایا ضمانت نامه اعتبار دارد ؟';
            this.SetPRWarrantyReciveDocList();
            this.HaveReceiveDoc = true;
            break;
          case 500000: // حالت فقط خواندنی
            this.IsEditConfirm = true;
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.IsContractDisable = true;
            this.DisableControlles = true;
            this.IsNew = false;
            this.IsInsert = false;
            this.CheckRegionWritable = true;
            this.IsDisable = false;
            break;
          default:
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
        }
      } else if (this.ModuleCode === 2844) {
        switch (this.ModuleViewTypeCode) {
          case 800000: // جستجو خدمات شهری
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.ConfirmArchiveBtnText = 'مستندات';
            this.HaveCompleteInfo = true;
            this.HaveArchive = true;
            this.HaveAcceptArchive = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.HaveSeenProvision = true;
            this.HasCompleteInfoBtnText = 'اطلاعات تکمیلی';
            break;
          default:
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
        }
      } else if (this.ModuleCode === 2787) {
        this.gridHeight = 48;
        //  this.ModuleViewTypeCode = 1;
        switch (this.ModuleViewTypeCode) {
          case 1:
            this.HaveRequestPerson = true;
            this.HaveAcceptArchive = true;
            this.IsArticle48Editable = this.WfSaveDetailsShow = this.HaveArticle48 = true;
            this.SetPRArticle48List();
            this.IsEditable = false;
            this.WfDetailsShow = false;
            this.ISDisabledConfirmAndReturnBtn = true;
            break;
          case 2:
            this.HaveSeenProvision = this.HaveArticle48 = true;
            this.IsArticle48Editable = this.WfSaveDetailsShow = this.IsEditable = this.WfDetailsShow = false;
            this.SetPRArticle48List();
            break;
          case 3:
            this.HaveSeenProvision = this.HaveArticle48 = this.IsArticle48Editable = true;
            this.gridHeight = 41;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.HaveExpertPerson = true;
            this.WfDetailsShowHeight = 40;
            this.WfDetailsShow = true;
            this.WfSaveDetailsShow = true;
            this.SetPRArticle48List();
            this.onExpertOpen(1);
            this.IsArticle48Editable = this.IsEditable = false;
            break;
          case 4:
            this.gridHeight = 39.5;
            this.tabpanelHeight = 84;
            this.PRIgridHeight = 83;
            this.WfDetailsShowHeight = 50;
            this.HaveOnlyLetter = true;
            this.WfSaveDetailsShow = this.IsEditable = false;
            this.WfDetailsShow = this.HaveArticle48 = this.IsArticle48Editable = true;
            this.LetterTypeCodeList.push(13);
            this.HaveSeenProvision = true;
            this.WFFieldSetLegend = 'نامه پیمانکار';
            this.WFLegendWidth = 5.5;
            this.SetLetterDetails();
            this.SetPRArticle48List();
            break;
          case 5:
            this.HaveRevocation = this.HaveCompleteInfo = this.HaveArticle48 = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveSeenProvision = true;
            this.SetPRArticle48List();
            break;
          case 5000000: // حالت فقط خواندنی
          case 800000: // جستجوی خدمات شهری
            this.IsEditable = false;
            this.ArchiveIsReadOnly = true;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.HaveCompleteInfo = true;
            this.IsContractDisable = true;
            this.DisableControlles = true;
            this.IsNew = false;
            this.IsInsert = false;
            this.CheckRegionWritable = false;
            this.HaveArticle48 = true;
            break;
          default:
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            break;
        }
      } else if (this.ModuleCode === 2996) { // RFC 61879
        switch (this.ModuleViewTypeCode) {
          case 88888:
            this.HaveCompleteInfo = true;
            this.IsEditable = this.ShowWorkflowButtons = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = false;
            this.ButtonsPlaceWidthPercent = 100;
            break;
          default:
            break;
        }
      } else if (this.ModuleCode === 3090) { // امضای الکترونیک
        switch (this.ModuleViewTypeCode) {
          case 900009:
            this.HaveCompleteInfo = true;
            this.IsEditable = false;
            this.WfSaveDetailsShow = this.WfDetailsShow = this.ShowWorkflowButtons = false;
            this.ButtonsPlaceWidthPercent = 100;
            this.HaveDigitalSign = true;
            break;
          default:
            break;
        }
      }
    }
    this.ShowModuleTypeName();

    if (this.OrginalModuleCode !== 2793 && this.ProductRequestObject && MyModuleViewTypeCode) {
      switch (MyModuleViewTypeCode) {
        case 99999:
          if (this.ProductRequestObject.OrdersObject && this.ProductRequestObject.OrdersObject.CostFactorID > 0 &&
            this.ProductRequestObject.OrdersObject.LastInquiryObject && this.ProductRequestObject.OrdersObject.LastInquiryObject.InquiryID > 0 &&
            this.ProductRequestObject.OrdersObject.LastInquiryObject.OrderCommitionObject && this.ProductRequestObject.OrdersObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID > 0 &&
            this.ProductRequestObject.OrdersObject.LastInquiryObject.OrderCommitionObject.OrderCommitionMemberList && this.ProductRequestObject.OrdersObject.LastInquiryObject.OrderCommitionObject.OrderCommitionMemberList.length > 0 &&
            !this.ProductRequestObject.OrdersObject.LastInquiryObject.IsReturn) {
            this.ProductRequestObject.OrdersObject.LastInquiryObject.OrderCommitionObject.OrderCommitionMemberList.forEach(element => {
              if (element.FinalSignDate) { // RFC 62551
                this.HasSingDate = true;
              }
            });
          }
          break;
        default:
          break;
      }
    }

  }
  SetPRWarrantyReciveDocList() {
    this.DisplayColDef();
    if (this.IsNew) {
      this.ProductRequest.GetPRCostWarrantyList(
        this.CostFactorID,
        null,
        this.ModuleViewTypeCode
      ).subscribe(res => // RFC 57620
        this.ReceiveDocRowData = res
      );
    } else {
      this.ProductRequest.GetContractWarrantyList(
        this.ProductRequestObject.ContractObject.CostFactorId ?
          this.ProductRequestObject.ContractObject.CostFactorId :
          this.ProductRequestObject.ContractObject.ReceiveFactorID,
        this.ProductRequestObject.ContractObject.CostFactorId ? true : false).subscribe(res =>
          this.ReceiveDocRowData = res
        );
    }
  }
  CheckPDFSignersInfo() {
    if (this.ProductRequestObject.LastInquiryObject &&
      this.ProductRequestObject.LastInquiryObject.OrderCommitionObject &&
      this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID > 0) {
      this.OrderCommitionID = this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID;
      this.ProductRequest.CheckPDFSignersInfo(this.OrderCommitionID, this.ModuleViewTypeCode).subscribe(res => {
        this.HavePDFSignersInfo = res;
        if (this.HavePDFSignersInfo) {
          this.gridHeight = 40;
          this.tabpanelHeight = 82;
        }
      });
    }
  }
  SetPRArticle48List() {
    this.ProductRequest.GetRequestArticle48List(this.CostFactorID).subscribe(res => this.Article48RowsData = res);
  }
  // tslint:disable-next-line:no-shadowed-variable
  GetADocType(DocTypeCode, resolve) {
    this.ArchiveList.GetADocumentType(DocTypeCode).subscribe(res => {
      resolve(res);
    });
  }
  SetLetterDetails() {
    if (this.CostFactorID && this.LetterTypeCodeList[0] && this.currentRegionObject) {
      this.Automation.GetAutomationLetter(this.CostFactorID, this.LetterTypeCodeList[0], this.currentRegionObject.OrganizationCode)
        .subscribe(res => {
          this.RegisterLetterDate = res.RegisterLetterDate;
          this.DocumentLetterNo = res.DocumentLetterNo;
          this.RegisterLetterNo = res.RegisterLetterNo;
        });
    }
  }
  SetSecondLetterDetails() {
    if (this.CostFactorID && this.SecondLetterTypeCode && this.currentRegionObject) {
      this.Automation.GetAutomationLetter(this.CostFactorID, this.SecondLetterTypeCode, this.currentRegionObject.OrganizationCode)
        .subscribe(res => {
          this.SecondRegisterLetterDate = res.RegisterLetterDate;
          this.SecondDocumentLetterNo = res.DocumentLetterNo;
          this.SecondRegisterLetterNo = res.RegisterLetterNo;
        });
    }
  }
  SetOrderCommition() {
    this.ProductRequestItemID = this.ProductRequestObject.ProductRequestItemList &&
      this.ProductRequestObject.ProductRequestItemList.length > 0 ?
      this.ProductRequestObject.ProductRequestItemList[0].ProductRequestItemID : -1;
    this.ProductRequest.GetOrdersWithProductRequest(this.ProductRequestItemID).subscribe(res => {
      this.OrdersObject = res;
      if (this.OrdersObject.LastInquiryObject &&
        this.OrdersObject.LastInquiryObject.OrderCommitionObject &&
        this.OrdersObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID > 0) {
        this.OrderCommitionObject = this.OrdersObject.LastInquiryObject.OrderCommitionObject;
        this.CommitionDate = this.OrderCommitionObject.ShortCommitionDate;
      }
    });
  }
  UpdateCommitionDateByID() {
    if (this.OrderCommitionObject && this.OrderCommitionObject.OrderCommitionID) {
      this.ProductRequest.UpdateCommitionDateByID(this.OrderCommitionObject.OrderCommitionID, this.CommitionDate).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت تاریخ کمیسیون با موفقیت انجام شد');
      });
    } else {
      this.ShowMessageBoxWithOkBtn('برای این درخواست کمیسیون ایجاد نشده است');
    }
  }
  // tslint:disable-next-line: no-shadowed-variable
  SetContractObject(resolve) {
    this.ProductRequest.GetContractByProductRequest(this.CostFactorID).subscribe(res => {
      this.PRContractObject = res;
      this.ContractLetterDate = res.ShortLetterDate;
      this.ContractLetterNo = res.LetterNo;
      resolve();
    });
  }
  popupclosed(Param) {
    this.HaveMaxBtn = false;
    this.isClicked = this.IsClickedPopUp;
    this.IsClickedPopUp = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.HeightPercentWithMaxBtn = 95;

    if (this.ModuleViewTypeCode === 88 &&
      this.ProductRequestObject.RegionCode === 217 &&
      this.PopUpType === 'product-request-suggestion') { // RFC 52350
      this.ngOnInit();
    }
    if (this.ModuleViewTypeCode === 43 && this.PopUpType === 'general-tender') { // RFC 52060
      this.ngOnInit();
    }
    if (this.PopUpType === 'product-request-suggestion') {
      this.ngOnInit();
      this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(
        HaseEstimate => {
          this.HaseEstimate = HaseEstimate;
          this.FillGrid(this.HaseEstimate);
          if (this.ProductRequestObject &&
            this.ProductRequestObject.ProductRequestTypeCode &&
            this.ProductRequestObject.ProductRequestTypeCode === 2) {
            this.PriceListTopicRasteParams.IsDisabled = false;
            this.FillGreenSpacePRItemGrid(this.HaseEstimate);
          }
          if (this.HaseEstimate) {
            this.ProductRequest.GetProductRequestItemListVW(this.ProductRequestObject.CostFactorID, true).subscribe(
              res => {
                this.rowsData = res;
                this.rowsData.forEach(element => {
                  this.EntityColumnDefinition(null, null, element.EntityList, false);
                });
                this.SetEntityDataInDataRow(this.rowsData);
              }
            );
          }
        }
      );
    }
    if (this.PopUpType === 'general-tender' && Param && Param.CostFactorID) {
      this.ProductRequestObject = Param;
    }
    if (Param && this.PopUpType === 'global-choose-page' && this.PopUpName === '') {
      if (this.IsArticle18Choosen) {
        this.OpenSelectedArticle18(Param);
      } else {
        this.OpenSelectedForm(Param);
      }
    }
    if (Param && this.PopUpType === 'global-choose-page' && this.PopUpName === 'global-choose-page') {
      if (Param === 2) {
        this.PrintPR();
      } else if (Param === 3) {
        this.PrintPRAndProvision();
      }
    }
    if (this.PopUpType === 'product-receive-doc') {
      this.SetPRReciveDocList();
    }
    this.PopUpName = '';
    this.IsArticle18Choosen = false;
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
    this.AssetColDef[1].cellEditorParams.Items = [];
    this.CustomerOrderParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.CostCenterParams.selectedObject = null;
    this.RusteeParams.selectedObject = null;
    this.SubRusteeParams.selectedObject = null;
    this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
      this.VWExeUnitItems = res;
      if (res.length === 1) {
        this.VWExeUnitParams.selectedObject = this.VWExeUnitItems[0].UnitPatternID;
      } else {
        this.VWExeUnitParams.selectedObject = null;
      }
    });
    this.ContractParams.selectedObject = null;
    this.WorkflowTypeCode = null;
    this.ModuleViewTypeCode = null;
    if (!isUndefined(ARegionCode) && ARegionCode !== null) {
      this.RefreshPageByRegion(ARegionCode);
    }

    let CostCenterCode = '';
    // tslint:disable-next-line: max-line-length
    CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
    if (this.OldRegionCode === 201 &&
      this.OldRegionCode !== this.RegionParams.selectedObject &&
      this.PRTypeParams.selectedObject === 2 &&
      !isNullOrUndefined(this.PriceListTopicRasteParams.selectedObject)) {
      this.rowsData = [];
      this.PRTypeParams.selectedObject = null;
      this.PriceListTopicRasteParams.selectedObject = null;
    }
    this.OldRegionCode = this.RegionParams.selectedObject;
    if (this.PRTypeParams.selectedObject === 2) {
      this.PriceListTopicRasteDisable = false;
      this.PriceListTopicRasteParams.IsDisabled = false;
    } else {
      this.PriceListTopicRasteDisable = true;
      this.PriceListTopicRasteParams.IsDisabled = true;
    }
  }
  onChangeFilterRegion(ARegionCode) {
    this.RegionAreaParams.selectedObject = null;
    this.RegionAreaDistrictParams.selectedObject = null;
  }
  onChangeRegionArea(RegionAreaDistrictID) {
    this.RegionAreaDistrictParams.selectedObject = null;
  }
  onChangeRegionAreaDistrict(RegionAreaID) {
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

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
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
    // tslint:disable-next-line:no-shadowed-variable
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
      // event.Owner.AssetColDef[1].cellEditorParams.Items  = ResultList;
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
    // tslint:disable-next-line:no-shadowed-variable
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
  onSave(IsCheckException = false) {
    // tslint:disable-next-line:max-line-length
    let CheckExceptions = (this.OrginalModuleCode === 2793 || this.OrginalModuleCode === 2939 || this.OrginalModuleCode === 2824) && this.IsAdmin && !IsCheckException;
    let StrExceptions = '';
    if ((this.ModuleViewTypeCode === 114 || this.ModuleViewTypeCode === 89) && !this.ContractContentNote && !this.IsNew && this.IsContractContent) {
      this.ShowMessageBoxWithOkBtn('عنوان مفاد قرارداد نمی تواند خالی باشد');
      return;
    }
    // tslint:disable-next-line: max-line-length
    if ((this.ProductRequestObject &&
      this.ProductRequestObject.CostFactorID > 0 &&
      this.ProductRequestObject.RegionCode === 200) || this.RegionParams.selectedObject === 200) {
      this.RusteeParams.selectedObject = this.CostCenterParams.selectedObject;
      this.SubRusteeParams.selectedObject = this.SubCostCenterParams.selectedObject;
    }

    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    this.CheckValidate = true;
    if (this.ModuleViewTypeCode === 89 && !this.IsCost) {
      this.ExpertCheckValidate = true;
    }
    let ValidateForm = true;
    if (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.OrginalModuleCode === 2939)) {
      this.RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.ContractParams,
      this.SubRusteeParams, this.RusteeParams];
      this.CheckValidateCostCenterParams = false;
    } else {
      this.RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.ContractParams,
      this.SubRusteeParams, this.RequestedPersonParams, this.RusteeParams,
      this.CostCenterParams, this.SubCostCenterParams];
      this.CheckValidateCostCenterParams = true;
    }
    if (this.CostCenterParams.selectedObject === 1243) {
      this.CheckValidatePRType = true;
    } else {
      this.CheckValidatePRType = false;
    }

    if (this.PRTypeParams.selectedObject === 2 && this.IsNew) {
      this.CheckValidateTopic = true;
    } else {
      this.CheckValidateTopic = false;
    }
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
      if (this.IsCost) {
        ValidateForm =
          ValidateForm &&
          this.Subject &&
          (this.CostCenterParams.selectedObject === 1243 ? (this.PRTypeParams.selectedObject !== null && this.PRTypeParams.selectedObject !== undefined) ? true : false : true) &&
          (this.IsNew && this.PRTypeParams.selectedObject === 2 ? (this.PriceListTopicRasteParams.selectedObject !== null && this.PriceListTopicRasteParams.selectedObject !== undefined) ? true : false : true) &&
          // (this.ModuleViewTypeCode === 89 && this.ExpertParams.selectedObject) &&
          (this.ModuleViewTypeCode !== 89 || this.BriefingReport) && // RFC 52217
          // tslint:disable-next-line: max-line-length
          (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
            (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.CostCenterParams.selectedObject) &&
          // tslint:disable-next-line: max-line-length
          (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
            (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.SubCostCenterParams.selectedObject) &&
          // tslint:disable-next-line:max-line-length
          (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
            (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.RequestedPersonParams.selectedObject) &&
          this.RusteeParams.selectedObject &&
          this.SubRusteeParams.selectedObject &&
          this.VWExeUnitParams.selectedObject &&
          // tslint:disable-next-line:max-line-length
          this.ProductRequestDate && ((this.IsType114 && this.ModuleCode === 2730) ? (this.Address !== null && this.BriefingReport !== null) : true); // RFC 53783
      } else {
        ValidateForm =
          ValidateForm &&
          this.Subject &&
          (this.CostCenterParams.selectedObject === 1243 ? (this.PRTypeParams.selectedObject !== null && this.PRTypeParams.selectedObject !== undefined) ? true : false : true) &&
          (this.PRTypeParams.selectedObject === 2 ? (this.PriceListTopicRasteParams.selectedObject !== null && this.PriceListTopicRasteParams.selectedObject !== undefined) ? true : false : true) &&
          (this.ModuleViewTypeCode === 89 ? ((this.ExpertParams.selectedObject === null || this.ExpertParams.selectedObject === undefined) ? false : true) : true) &&
          (this.ModuleViewTypeCode !== 89 || this.BriefingReport) && // RFC 52217
          // tslint:disable-next-line: max-line-length
          (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
            (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.CostCenterParams.selectedObject) &&
          // tslint:disable-next-line: max-line-length
          (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
            (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.SubCostCenterParams.selectedObject) &&
          // tslint:disable-next-line: max-line-length
          (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
            (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.RequestedPersonParams.selectedObject) &&
          this.RusteeParams.selectedObject &&
          this.SubRusteeParams.selectedObject &&
          this.VWExeUnitParams.selectedObject &&
          // tslint:disable-next-line:max-line-length
          this.ProductRequestDate && ((this.IsType114 && this.ModuleCode === 2730) ? (this.Address !== null && this.BriefingReport !== null) : true); // RFC 53783
      }
      if (ValidateForm) {
        const ReceiveDocList = [];
        // tslint:disable-next-line:max-line-length
        if (this.ModuleViewTypeCode === 100000 || this.ModuleViewTypeCode === 200000 || this.ModuleViewTypeCode === 300000) { //RFC 57522
          this.ReceiveDocGridApi.stopEditing();
          this.ReceiveDocGridApi.forEachNode(node => {
            const ReceiveDocObj = {
              ReceiveDocID: node.data.ReceiveDocID ? node.data.ReceiveDocID : -1,
              CostFactorID: -1,
              // tslint:disable-next-line:max-line-length
              ReceiveDocTypeCode: (node.data.ReceiveDocTypeName && node.data.ReceiveDocTypeName.ReceiveDocTypeCode) ? node.data.ReceiveDocTypeName.ReceiveDocTypeCode : (node.data.ReceiveDocTypeCode ? node.data.ReceiveDocTypeCode : null),
              // tslint:disable-next-line:max-line-length
              ReferenceDate: node.data.PersianReferenceDate && node.data.PersianReferenceDate.MDate ? node.data.PersianReferenceDate.MDate : (node.data.ShortReferenceDate ? node.data.ShortReferenceDate : null),
              ReferenceNo: node.data.ReferenceNo ? node.data.ReferenceNo : null,
              ItemNo: node.data.ItemNo,
              ReceiveDocAmount: node.data.ReceiveDocAmount,
              Note: node.data.Note,
              IsWarranty: 1,
              ProposalID: node.data.ProposalID,
              IsValidity: node.data.IsValidity ? true : false,
              EstateValue: node.data.EstateValue,
              Area: node.data.Area,
              EstateAddress: node.data.EstateAddress,
              EstateTypeCode: node.data.EstateTypeCode,
              SapamNo: node.data.SapamNo,
              RegRegion: node.data.RegRegion,
            };
            ReceiveDocList.push(ReceiveDocObj);
          });
        }
        let ContractId;
        const ProductRequestRelationList = [];
        if (this.IsTransferedContract === true) {
          ContractId = this.ProductRequestObject.ContractObject.ContractId;
          const ProdReqRelationObj = {
            ProductRequestRelationID: -1,
            RelatedContractID: this.ProductRequestObject.ContractObject.ContractId,
            ContractRelationTypeCode: 2,
            CostFactorID: this.ProductRequestObject.CostFactorID,
            Note: '',
            IsIncreament: 0
          };
          ProductRequestRelationList.push(ProdReqRelationObj);
        }

        let ItemNo = 0;
        const ProductRequestList = [];
        const ProductRequestEstateList = [];
        this.gridApi.stopEditing();
        this.AssetGridApi.stopEditing();
        const ProductRequestObj = {
          // tslint:disable-next-line:max-line-length
          IsUpdateBeforeAdevertising: this.IsUpdateBeforeAdevertising,//RFC: 63114
          ContractTypeCode: (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) ? this.ProductRequestObject.ContractTypeCode : this.IsChecked === true ? 8 : null,
          CostFactorID: (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? this.ProductRequestObject.CostFactorID : -1,
          RegionCode: this.RegionParams.selectedObject,
          IsCost: this.IsCost,
          ProductRequestCode: -1,
          ProductRequestDate: this.ProductRequestDate,
          DeadlineDate: this.DeadLineDate,
          UnitPatternID: this.VWExeUnitParams.selectedObject,
          CustomerOrderID: this.CustomerOrderParams.selectedObject,
          ActorID: this.RequestedPersonParams.selectedObject,
          RegionAreaID: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.RegionAreaID : this.RegionAreaParams.selectedObject, // ناحیه
          RegionAreaDistrictID: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.RegionAreaDistrictID : this.RegionAreaDistrictParams.selectedObject, // محله
          DistrictDirectionCode: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.DistrictDirectionCode : this.DistrictDirectionParams.selectedObject, // محله
          WorkPlaceCode: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.WorkPlaceCode : this.OnFilterRegionParams.selectedObject, // واحد اجرایی محل انجام کار
          Subject: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.Subject : this.Subject,
          Address: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.Address : this.Address,
          ResearcherID: this.ResearcherID,
          ProductRequestStatusCode: 1,
          InvVoucherGroupCode: this.RegionParams.selectedObject === 200 && !this.IsCost && this.ModuleViewTypeCode == 89 ? 10 : 1,  // 65085
          HasLicence: 0,
          RelatedContractID: null,
          ProvisionContractID: null,
          ProductRequestTypeCode: (this.IsTransferedContract && this.ProductRequestObject) ? this.ProductRequestObject.ProductRequestTypeCode : this.PRTypeParams.selectedObject,
          PriceListTopicID: this.PriceListTopicRasteParams.selectedObject,
          // tslint:disable-next-line:max-line-length
          PersonUnitPatternID: this.UnitPatternParams.selectedObject && this.UnitPatternParams.selectedObject.UnitPatternID ? this.UnitPatternParams.selectedObject.UnitPatternID : null,
          SubCostCenterID: this.SubCostCenterParams.selectedObject,
          ContractStackHolderID: this.SubRusteeParams.selectedObject,
          BriefingReport: this.BriefingReport,
          BoardDecisions: this.ModuleViewTypeCode === 121 ? this.BoardDecisionsDec : null,
          IsWeb: 1,
          ActLocationID: this.ActLocationParams.selectedObject,
          HaveMutualContract: this.IsCost ? this.HaveMutualContract : false,
          MutualContractStatus: this.HaveMutualContract ? this.MutualContractStatus : null,
          IsSecret: this.IsSecret,
          DealTypeCode: (this.ProductRequestObject && this.ProductRequestObject.DealTypeCode) ? this.ProductRequestObject.DealTypeCode : null,
          HaveHsePlan: this.HaveHsePlan,
          PriceListPatternID: this.ContractParams.selectedObject &&
            this.ProductRequestObject === null &&
            this.ProductRequestObject.PriceListPatternID === null ? this.PriceListPatternID : null,

          ContractContentNote: (this.ModuleViewTypeCode === 114 || this.ModuleViewTypeCode === 89) && this.ContractParams.selectedObject ?
            this.ContractContentNote : null,
          IsContractContent: (this.ModuleViewTypeCode === 114 || this.ModuleViewTypeCode === 89) && this.ContractParams.selectedObject ?
            this.IsContractContent : false,
          IsTaxValue: (this.ProductRequestObject && this.ProductRequestObject.CostFactorID > 0) ? this.ProductRequestObject.IsTaxValue : true,
          GradeID: (this.ProductRequestObject && this.ProductRequestObject.CostFactorID > 0) ? this.ProductRequestObject.GradeID : null,
          IsConfirm: 0,
          ProductRequestRelationList: this.IsTransferedContract ? ProductRequestRelationList : (this.ProductRequestObject ? this.ProductRequestObject.ProductRequestRelationList : null),
          DealMethodCode: this.ProductRequestObject ? this.ProductRequestObject.DealMethodCode : null,
          RequestObjectTypeCode:
            this.OrginalModuleCode === 2730 ? 1 : // درخواست معامله
              this.OrginalModuleCode === 2773 ? 3 : // تامین مانده اعتبار
                this.OrginalModuleCode === 2895 ? 8 : // درخواست مهامله پژوهشی
                  this.OrginalModuleCode === 2910 ? 10 : // درخواست معامله با گردش
                    this.OrginalModuleCode === 3095 ? 14 : // توافق نامه
                      null
        };
        if (this.ModuleCode && this.ModuleCode === 2773) {
          ProductRequestObj.ProvisionContractID = this.ContractParams.selectedObject;
        } else {
          ProductRequestObj.RelatedContractID = this.ContractParams.selectedObject;
        }
        let CheckStartDate = false;
        let CheckEndDate = false;
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
          if (this.ProductRequestObject && this.ProductRequestObject.CostFactorID === -1 && this.IsTransferedContract === true &&
            (!node.data.ShortStartDate || node.data.ShortStartDate === null)) {
            CheckStartDate = true;
          }
          if (this.ProductRequestObject && this.ProductRequestObject.CostFactorID === -1 && this.IsTransferedContract === true &&
            (!node.data.ShortStartDate || node.data.ShortEndDate === null)) {
            CheckEndDate = true;
          }

          const ProductRequestItemObj = {
            ProductRequestItemID: node.data.ProductRequestItemID ? node.data.ProductRequestItemID : -1,
            CostFactorID: ProductRequestObj.CostFactorID,
            ItemNo: ++ItemNo,
            QTY: parseFloat(node.data.QTY),
            Subject: node.data.Subject,
            // tslint:disable-next-line:radix
            Amount: parseFloat(node.data.Amount),
            // tslint:disable-next-line:max-line-length
            ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
            // tslint:disable-next-line:max-line-length
            StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
            // tslint:disable-next-line:max-line-length
            EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
            EntityTypeItemIDList: EntityTypeItemIDList,
            ProductRequestRegionCode: this.RegionParams.selectedObject,
          };
          ProductRequestList.push(ProductRequestItemObj);
        });
        if (CheckStartDate) {
          this.ShowMessageBoxWithOkBtn('تاریخ شروع اقلام درخواست نمیتواند خالی باشد');
          return;
        }
        if (CheckEndDate) {
          this.ShowMessageBoxWithOkBtn('تاریخ پایان اقلام درخواست نمیتواند خالی باشد');
          return;
        }
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
            ProductRequestRegionCode: this.RegionParams.selectedObject,
          };
          ContractOrderObj.ContractOrderItemDataList.push(ContractOrderItemObj);
        });
        const RelatedProductList = [];
        this.gridApiRelatedProduct.forEachNode(node => {
          const RelatedProductObj = {
            RequestRelatedProductID: node.data.RequestRelatedProductID,
            ProductID: node.data.ProductID,
            CostFactorID: this.CostFactorID,
          };
          RelatedProductList.push(RelatedProductObj);
        });
        // if (this.ProductRequestObject && this.ProductRequestObject.CostFactorID === -1 && this.IsTransferedContract === true) {
        //   this.ShowMessageBoxWithOkBtn('جهت ذخیره اطلاعات لطفا از بخش تکمیل اطلاعات استفاده نمایید');
        //   return;
        // }

        const ProductRequestPerson = {
          ProductRequestPersonID: this.ProductRequestPersonID,
          ActorID: this.ExpertParams.selectedObject,
          RoleID: this.ExpertPersonRoleID,
          CostFactorID: this.ProductRequestObject && this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : -1,
        }

        if (CheckExceptions) {
          this.ProductRequest.GetSaveExceptions(1,
            this.ModuleCode,
            ProductRequestObj,
            ProductRequestList,
            ContractOrderObj,
            this.OrginalModuleCode
          ).subscribe((res: any) => {
            if (res !== '') {
              this.IsException = true;
              StrExceptions = res;
              StrExceptions = StrExceptions + ' ' + 'آیا می خواهید ادامه دهید؟';
              this.ShowMessageBoxWithYesNoBtn(StrExceptions);
            } else {
              this.IsDown = false;
              this.ProductRequest.SaveProductRequest(this.ModuleCode,
                ProductRequestObj,
                ProductRequestList,
                ContractOrderObj,
                false,
                this.PercentageOfChanges,
                this.OrginalModuleCode,
                AssetPRList,
                ReceiveDocList,
                this.ModuleViewTypeCode, // RFC 52370
                RelatedProductList,
                this.ExpertParams.selectedObject,
                null,
                ContractId
              ).subscribe((res: any) => {
                this.ProductRequestCode = res.ProductRequestCode;
                this.ProductRequestNo = res.ProductRequestNo;
                if (res
                  && res.ProductRequestTypeCode === 2
                  && res.PriceListTopicID === 402374) {
                  res.ProductRequestItemList.forEach(el => {
                    if (isNullOrUndefined(el.QTY) || el.QTY === 0) {
                      el.FinalAmount = 0;
                    }
                  });
                  this.rowsData = res.ProductRequestItemList;
                } else {
                  this.rowsData = res.ProductRequestItemList;
                }
                this.SetEntityDataInDataRow(this.rowsData);
                this.CostFactorID = res.CostFactorID;
                this.ProductRequestObject = res;
                if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
                  this.IsInsert = true;
                }
                this.IsDisable = false;
                this.IsDown = true;
                this.Output.emit(true);
                this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
              },
                err => {
                  this.IsDown = true;
                  // if (!err.error.Message.includes('|')) {
                  //   this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
                  // }
                });
            }
          });
        } else {
          this.IsDown = false;
          this.ProductRequest.SaveProductRequest(this.OrginalModuleCode === 2910 ? 2910 : this.ModuleCode,
            ProductRequestObj,
            ProductRequestList,
            ContractOrderObj,
            !IsCheckException,
            this.PercentageOfChanges,
            this.OrginalModuleCode,
            AssetPRList,
            ReceiveDocList,
            this.ModuleViewTypeCode, // RFC 52370
            RelatedProductList,
            this.Is3InquiriesMode ? this.IsReturn : null,
            ProductRequestPerson,
            ContractId
          ).subscribe((res: any) => {
            this.ProductRequestCode = res.ProductRequestCode;
            this.ProductRequestNo = res.ProductRequestNo;
            if (res
              && res.ProductRequestTypeCode === 2
              && res.PriceListTopicID === 402374) {
              res.ProductRequestItemList.forEach(el => {
                if (isNullOrUndefined(el.QTY) || el.QTY === 0) {
                  el.FinalAmount = 0;
                }
              });
              this.rowsData = res.ProductRequestItemList;
            } else {
              this.rowsData = res.ProductRequestItemList;
            }
            this.SetEntityDataInDataRow(this.rowsData);
            this.CostFactorID = res.CostFactorID;
            this.ProductRequestObject = res;
            if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
              this.IsInsert = true;
            }
            this.IsDisable = false;
            this.Output.emit(true);
            this.IsDown = true;

            const SelectedExpertPerson = this.ProductRequestObject.RequestPersonList.filter(x => x.RoleID === this.ExpertPersonRoleID);
            if (SelectedExpertPerson.length > 0) {
              this.ProductRequestPersonID = SelectedExpertPerson[0].ProductRequestPersonID;
            }
            this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          },
            err => {
              this.IsDown = true;
              // if (!err.error.Message.includes('|')) {
              //   this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
              // }
            });
        }
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
  onPRCostGridReady(params) {
    this.PRCostGridApi = params.api;
  }
  onAssetGridReady(params) {
    this.AssetGridApi = params.api;
  }
  onPRCostCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'CostCenterName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequestCostColDef[2].cellEditorParams.Items = this.ProductRequest.GetSubCostCenter(event.newValue.CostCenterId, this.ModuleCode, false);

    }

    if (event.newValue && event.colDef && event.colDef.field === 'SubCostCenterName') {
      this.CurrentSubCostCenterID = event.newValue.SubCostCenterId;
      // this.ProductRequestCostColDef[4].cellEditorParams.Items = this.ProductRequest.
      //   GetCostProductBySubCostCenter(event.newValue.SubCostCenterId, this.RegionParams.selectedObject, false);
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
  Close() {
    if (this.IsWFShow && this.WorkListDetailRows) {
      this.FlowService.RunAfterActionMethod(this.WorkListDetailRows).subscribe();
    }

    if (this.ModuleCode && this.ModuleCode === 2773 && !this.InputParam) {
      this.isClicked = false;
      this.Closed.emit(true);
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    } else {
      this.Closed.emit(true);
    }
  }
  RedioClick(IsCost) {
    const IsDisabled = (!this.IsEditable) || (this.IsInsert);
    if (!IsDisabled) {
      this.IsCost = IsCost;
      if (this.ModuleViewTypeCode === 89) {
        if (!this.IsCost) {
          this.ExpertPersonRoleID = 1442;
          this.HaveExpertPerson = true;
          this.WfDetailsShowHeight = 36;
          this.WfDetailsShow = true;
          this.ExpertPersonLabel = ' رئیس امور';
          this.onExpertOpen(1);
          this.ISActLocation = true;
          this.HasMutualContractQuestion = false;
          this.ShowMCSPanel = false;
          this.gridHeight = 33;
          this.tabpanelHeight = 76;
        } else {
          this.WfDetailsShow = false;
          this.HaveExpertPerson = false;
          this.ISActLocation = false;
          this.HasMutualContractQuestion = true;
          this.MakeMCRadioTypes();
          this.ShowMCSPanel = true;
          this.MakeMCSRadioTypes();
          this.PRIgridHeight = 76;
          this.gridHeight = 30;
          this.tabpanelHeight = 76;
        }
      }
      this.ContractParams.selectedObject = null;
      if (IsCost) {
        this.HasMutualContractQuestion = true;
        // const index = this.RequiredComponents.indexOf(this.ActLocationParams);
        // if (index === -1) {
        // this.RequiredComponents.push(this.ActLocationParams);
        // }
      } else {
        // if (this.ProductRequestObject.ModuleViewTypeCode === 89 || this.ProductRequestObject.ModuleViewTypeCode === 95) {
        this.HasMutualContractQuestion = false;
        this.ShowMCSPanel = false; // RFC 51573
        // }
        if (this.ModuleViewTypeCode === 65) {
          this.gridHeight = 35;
          this.tabpanelHeight = 68;
          this.PRIgridHeight = 66;
          this.MultiWfDetailsShowHeight = 90;
          this.FirstWFFieldSetLegend = 'نامه ارسال به ماده 18';
          this.FirstWFLegendWidth = 9;
          this.LetterTypeCodeList.push(10);
          this.SecondLetterTypeCode = 11;
          this.SecondWFFieldSetLegend = 'نامه تاييد يا عدم تاييد ماده 18';
          this.SecondWFLegendWidth = 13;
          this.WfSaveDetailsShow = this.MultiWfDetailsShow = true;
          this.WfDetailsShow = false;
          this.IsEditable = false;
          this.HaveArticle18 = this.HaveAcceptArticle18 = this.HaveCompleteInfo = true;
          this.TopQuestionLabel = 'آیا مناقصه برنده دارد؟';
          this.IsLawful = this.ProductRequestObject.HaveWinner;
          this.SetLetterDetails();
          this.SetSecondLetterDetails();
        }
        if (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2939)) {
          this.RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.ContractParams,
          this.SubRusteeParams, this.RusteeParams];
          this.CheckValidateCostCenterParams = false;
        } else {
          this.RequiredComponents = [this.RegionParams, this.VWExeUnitParams, this.ContractParams,
          this.SubRusteeParams, this.RequestedPersonParams, this.RusteeParams,
          this.CostCenterParams, this.SubCostCenterParams];
          this.CheckValidateCostCenterParams = true;
        }
        const index = this.RequiredComponents.indexOf(this.ActLocationParams);
        if (index >= 0) {
          this.RequiredComponents.splice(index, 1);
        }
      }
    }
  }
  HaveMutualContractRedioClick(HaveMutualContract) {
    this.HaveMutualContract = HaveMutualContract;
    if (!HaveMutualContract) {
      this.ShowMCSPanel = false;
      this.gridHeight = (this.ModuleViewTypeCode === 89 && (!this.IsNew)) ? 33 : 40;
      this.tabpanelHeight = 76;
    } else {
      this.ShowMCSPanel = true;
      this.MakeMCSRadioTypes();
      this.PRIgridHeight = 76;
      this.gridHeight = 30;
      this.tabpanelHeight = 76;
    }
  }
  IsSecretRedioClick(IsSecret) {
    this.IsSecret = IsSecret;
  }
  HaveHsePlanRedioClick(HaveHsePlan) {
    this.HaveHsePlan = HaveHsePlan;
  }
  IsLawfulRedioClick(IsLawful) {
    this.IsLawful = IsLawful;
  }
  IsNewRedioClick(IsNew) {
    if (this.IsEditable) {
      this.IsNew = IsNew;
      this.ShowModuleTypeName();
      this.ContractParams.IsDisabled = this.IsNew;
      this.ContractParams.Required = this.PerecentageChangesLabel = !this.IsNew;
      if (this.IsNew) {
        this.ContractParams.selectedObject = null;
        this.IsContractSelect = false;
      }
      this.ContractContentView();
    }
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
    this.ShowSuggestionDialong(this.ProductRequestObject.DealTypeCode);
  }
  ShowSuggestionDialong(DealTypeCode) {
    if (this.IsTransferedContract === true) {
      let CheckStartDate = false;
      let CheckEndDate = false;
      const ProductRequesrItemList = [];
      this.gridApi.forEachNode(node => {
        if (this.ProductRequestObject.CostFactorID === -1 && this.IsTransferedContract === true &&
          (!node.data.ShortStartDate || node.data.ShortStartDate === null)) {
          CheckStartDate = true;
        } else {
          node.data.StartDate = node.data.ShortStartDate;
        }
        if (this.ProductRequestObject.CostFactorID === -1 && this.IsTransferedContract === true &&
          (!node.data.ShortEndDate || node.data.ShortEndDate === null)) {
          CheckEndDate = true;
        } else {
          node.data.EndDate = node.data.ShortEndDate;
        }
        ProductRequesrItemList.push(node.data);
      });
      this.ProductRequestObject.ProductRequestItemList = ProductRequesrItemList;
      if (this.ProductRequestDate) {
        this.ProductRequestObject.ProductRequestDate = this.ProductRequestDate;
      }
      if (!this.ProductRequestObject.ProductRequestDate) {
        this.ShowMessageBoxWithOkBtn('تاریخ درخواست نمی تواند خالی باشد');
        return;
      }
      if (CheckStartDate) {
        this.ShowMessageBoxWithOkBtn('تاریخ شروع اقلام درخواست نمی تواند خالی باشد');
        return;
      }
      if (CheckEndDate) {
        this.ShowMessageBoxWithOkBtn('تاریخ پایان اقلام درخواست نمی تواند خالی باشد');
        return;
      }
    }

    if ((this.ProductRequestObject.RegionCode > 0 && this.ProductRequestObject.RegionCode < 22) &&
      (this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterObject &&
        this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode === '05') &&
      (DealTypeCode === 3 || DealTypeCode === 4 || DealTypeCode === 1)) {
      this.ShowMessageBoxWithOkBtn('جمع مبلغ اقلام درخواستی در حد متوسط نیست');
      return;
    }
    if (this.CallMainapi === false && this.CostFactorID !== -1 && this.CostFactorID !== null) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        this.PopUpType = 'product-request-suggestion';
        this.isClicked = true;
        this.PercentWidth = 98;
        this.MainMaxwidthPixel = 2000;
        this.MinHeightPixel = 600;
        this.HaveHeader = true;
        this.startLeftPosition = 15;
        this.startTopPosition = 10;
        this.HaveMaxBtn = true;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          SumFinalAmount: this.SumFinalAmountStr,
          SumAmount: this.SumFinalItemAmount,
          DealTypeCode: DealTypeCode,
          DealTypeName: this.ProductRequestObject.DealTypeName,
          IsCost: this.IsCost,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          CheckRegionWritable: this.CheckRegionWritable,
          ModuleCode: this.ModuleCode,
          OrginalModuleCode: this.OrginalModuleCode,
          Amount: this.ProductRequestObject.Amount,
          IsNew: this.IsNew,
          IsAdmin: this.IsAdmin,
          IsTransferedContract: this.IsTransferedContract,
          IsAgreement: this.IsChecked,
        };
      });
    } else {
      this.PopUpType = 'product-request-suggestion';
      this.isClicked = true;
      this.PercentWidth = 98;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 600;
      this.HaveHeader = true;
      this.startLeftPosition = 15;
      this.startTopPosition = 10;
      this.HaveMaxBtn = true;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        SumFinalAmount: this.SumFinalAmountStr,
        SumAmount: this.SumFinalItemAmount,
        DealTypeCode: DealTypeCode,
        DealTypeName: this.ProductRequestObject.DealTypeName,
        IsCost: this.IsCost,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        CheckRegionWritable: this.CheckRegionWritable,
        ModuleCode: this.ModuleCode,
        OrginalModuleCode: this.OrginalModuleCode,
        Amount: this.ProductRequestObject.Amount,
        IsNew: this.IsNew,
        IsAdmin: this.IsAdmin,
        IsTransferedContract: this.IsTransferedContract,
        IsAgreement: this.IsChecked,
      };
    }
  }
  btnShowReqDetailsClick() {
    this.ShowRequestDetailsDialog(this.ProductRequestObject.DealTypeCode);
  }
  ShowRequestDetailsDialog(DealTypeCode) {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
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
          DealTypeCode: DealTypeCode,
          DealTypeName: this.ProductRequestObject.DealTypeName,
          IsCost: this.IsCost,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          IsRequestProvision: this.IsRequestProvision,
          CurrentRegionObject: this.currentRegionObject,
          ModuleCode: this.ModuleCode,
          OrginalModuleCode: this.OrginalModuleCode,
          IsInProgressCartable: this.IsInProgressCartable // 59699
        };
      });
    } else {
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
        DealTypeCode: DealTypeCode,
        DealTypeName: this.ProductRequestObject.DealTypeName,
        IsCost: this.IsCost,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        IsRequestProvision: this.IsRequestProvision,
        CurrentRegionObject: this.currentRegionObject,
        ModuleCode: this.ModuleCode,
        OrginalModuleCode: this.OrginalModuleCode,
        IsInProgressCartable: this.IsInProgressCartable // 59699
      };
    }
  }
  RequestCost() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
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
      });
    } else {
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
  }
  RequestPersonItem() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        this.PopUpType = 'product-request-person-item';
        this.isClicked = true;
        this.HaveHeader = true;
        this.PercentWidth = 70;
        this.startLeftPosition = 210;
        this.startTopPosition = 20;
        this.HaveMaxBtn = false;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          Subject: this.Subject,
          RegionCode: this.RegionParams.selectedObject,
          ProductRequestCode: this.ProductRequestNo,
          ProductRequestDate: this.ProductRequestDate,
          CostFactorID: this.CostFactorID,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          ModuleCode: this.ModuleCode,
          CheckRegionWritable: this.CheckRegionWritable,
          RequestedPersonItems: this.RequestedPersonItems,
          OrginalModuleCode: this.OrginalModuleCode
        };
      });
    } else {
      this.PopUpType = 'product-request-person-item';
      this.isClicked = true;
      this.HaveHeader = true;
      this.PercentWidth = 70;
      this.startLeftPosition = 210;
      this.startTopPosition = 20;
      this.HaveMaxBtn = false;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.Subject,
        RegionCode: this.RegionParams.selectedObject,
        ProductRequestCode: this.ProductRequestNo,
        ProductRequestDate: this.ProductRequestDate,
        CostFactorID: this.CostFactorID,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        ModuleCode: this.ModuleCode,
        CheckRegionWritable: this.CheckRegionWritable,
        RequestedPersonItems: this.RequestedPersonItems,
        OrginalModuleCode: this.OrginalModuleCode
      };
    }
  }
  BtnArchiveClick() {
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
    if (this.PRContractObject) {
      FinYearCode = this.PRContractObject.FinYearCode;
    }
    //  this.ProductRequest.GetProductRequestDealType(this.ProductRequestObject.RegionCode,
    //    this.ProductRequestDate,
    // tslint:disable-next-line:radix
    //   this.SumFinalAmount
    // ).subscribe(res => {
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
    //  });

  }
  BtnArchiveClick2() {
    this.PopUpType = 'product-request-archive-detail';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 277;
    this.startTopPosition = 10;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.OverMainMinwidthPixel = null;

    // tslint:disable-next-line: max-line-length
    let HaveSaveArchive = (this.ModuleViewTypeCode !== 400000 && this.ModuleViewTypeCode !== 500000 && this.ModuleViewTypeCode !== 74 && this.ModuleViewTypeCode !== 800000);
    HaveSaveArchive = (this.OrginalModuleCode && this.OrginalModuleCode === 2756 && this.ModuleViewTypeCode === 500000) ? this.HaveConfirmArchive : HaveSaveArchive;
    let RealOnlyPage = (this.ModuleViewTypeCode === 400000 || this.ModuleViewTypeCode === 500000 || this.ModuleViewTypeCode === 800000);
    RealOnlyPage = (this.OrginalModuleCode && this.OrginalModuleCode === 2756 && this.ModuleViewTypeCode === 500000) ? !this.HaveConfirmArchive : RealOnlyPage;
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        this.PopupParam = {
          RegionCode: this.ProductRequestObject.RegionCode,
          IsOnline: this.ProductRequestObject.IsOnline,
          CostFactorID: this.CostFactorID,
          ProductRequestObject: this.ProductRequestObject,
          currentRegionObject: this.currentRegionObject,
          LastInquiryID: (this.ProductRequestObject && this.ProductRequestObject.LastInquiryObject)
            ? this.ProductRequestObject.LastInquiryObject.InquiryID : null,
          OrderCommitionID: (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject)
            ? this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID : null,
          ContractID: (this.ProductRequestObject && this.ProductRequestObject.ContractObject && this.ProductRequestObject.ContractObject.ContractId)
            ? this.ProductRequestObject.ContractObject.ContractId : null,
          HaveSaveArchive: HaveSaveArchive,
          HasDeleteAccess: this.ModuleViewTypeCode !== 400000 && this.ModuleViewTypeCode !== 500000 && this.ModuleViewTypeCode !== 800000,
          OrginalModuleCode: this.OrginalModuleCode,
          RealOnlyPage: RealOnlyPage,
          PRArchiveWithOutAdvertising: this.ModuleViewTypeCode === 111 ||
            this.ModuleViewTypeCode === 400000 ||
            this.ModuleViewTypeCode === 500000 ||
            this.ModuleViewTypeCode === 800000,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
        };
        this.isClicked = true;
      });
    } else {
      this.PopupParam = {
        RegionCode: this.ProductRequestObject.RegionCode,
        IsOnline: this.ProductRequestObject.IsOnline,
        CostFactorID: this.CostFactorID,
        ProductRequestObject: this.ProductRequestObject,
        currentRegionObject: this.currentRegionObject,
        LastInquiryID: (this.ProductRequestObject && this.ProductRequestObject.LastInquiryObject)
          ? this.ProductRequestObject.LastInquiryObject.InquiryID : null,
        OrderCommitionID: (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.OrderCommitionObject)
          ? this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID : null,
        ContractID: (this.ProductRequestObject && this.ProductRequestObject.ContractObject && this.ProductRequestObject.ContractObject.ContractId)
          ? this.ProductRequestObject.ContractObject.ContractId : null,
        HaveSaveArchive: HaveSaveArchive,
        HasDeleteAccess: this.ModuleViewTypeCode !== 400000 && this.ModuleViewTypeCode !== 500000 && this.ModuleViewTypeCode !== 800000,
        OrginalModuleCode: this.OrginalModuleCode,
        RealOnlyPage: RealOnlyPage,
        PRArchiveWithOutAdvertising: this.ModuleViewTypeCode === 111 ||
          this.ModuleViewTypeCode === 400000 ||
          this.ModuleViewTypeCode === 500000 ||
          this.ModuleViewTypeCode === 800000,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
      };
      this.isClicked = true;
    }
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
      DocTypeCode: this.ParentDocTypeList && this.ParentDocTypeList.length > 0 ? this.ParentDocTypeList : this.ParentDocType,
      ModuleCode: this.ModuleCode,
      HasCheck: true,
      IsReadOnly: this.ArchiveIsReadOnly,
      MandatoryDocTypeList: MandatoryDocTypeList,
      DocumentTypeCodeList: FilterDocumentTypeCodeList,
      OrginalModuleCode: this.OrginalModuleCode,
      RegionCode: this.ProductRequestObject.RegionCode
    };
    this.PopupParam = archiveParam;
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
    if (this.IsException && event === 'YES') {
      this.onSave(true);
      return;
    }
    if (this.ExistsFile) {
      if (this.BtnClickedName === 'Article18') {
        if (event === 'YES') {
          this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, 1047, true).subscribe(res => {
            this.PopUpType = 'pdf-viewer';
            this.HaveHeader = true;
            this.isClicked = true;
            this.startLeftPosition = 40;
            this.startTopPosition = 0;
            this.HaveMaxBtn = false;
            this.OverMainMinwidthPixel = 1295;
            this.MainMaxwidthPixel = 1300;
            this.PopupParam = {
              HeaderName: 'ابلاغ ماده 18',
              PDFSrc: res ? res.FileBase64 : undefined,
              FileName: res ? res.FileName : null,
              OrderCommitionID: this.OrderCommitionID,
              HaveEstimate: false,
              HaveSign: true,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              RegionCode: this.ProductRequestObject.RegionCode,
              PDFSignersInfo: res ? res.PDFSignersInfo : null,
              HasTripleReport: this.HaseEstimate,
              IsFinal: false,
              HaveUpload: !res || !res.PDFSignersInfo || res.PDFSignersInfo.length <= 0,
              SignByFile: false,
              IsArticle18: true,
              HasDelBtn: true,
              IsAdequacy: false,
              IsDisArticle18: false
            };
          });
          return;
        } else if (event === 'NO') {
          this.ProductRequest.GetMinutesReportPDFContent(
            this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID,
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.RegionCode,
            1047,
            this.HaseEstimate,
            true,
            this.ModuleViewTypeCode).subscribe(PDFRes => {
              if (PDFRes) {
                this.IsDown = true;
                this.PopUpType = 'pdf-viewer';
                this.HaveHeader = true;
                this.isClicked = true;
                this.startLeftPosition = 40;
                this.startTopPosition = 0;
                this.HaveMaxBtn = false;
                this.OverMainMinwidthPixel = 1295;
                this.MainMaxwidthPixel = 1300;
                this.PopupParam = {
                  HeaderName: 'ابلاغ ماده 18',
                  PDFSrc: PDFRes.FileBase64,
                  FileName: PDFRes.FileName,
                  OrderCommitionID: this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID,
                  HaveEstimate: false,
                  HaveSign: true,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  RegionCode: this.ProductRequestObject.RegionCode,
                  PDFSignersInfo: PDFRes.PDFSignersInfo,
                  HasTripleReport: this.HaseEstimate,
                  IsFinal: false,
                  IsArticle18: true,
                  HasDelBtn: true,
                  IsAdequacy: false,
                  IsDisArticle18: false
                };
              } else {
                this.IsDown = true;
                this.ShowMessageBoxWithOkBtn('فایل صورتجلسه بارگزاری نشده است.');
              }
            });
        }
      } else if (this.BtnClickedName === 'TrafficRep') { // RFC 61879
        if (event === 'YES') {
          this.ComonService.GetAllArchiveDetailList(this.CostFactorID, 1107, true).subscribe(res => {
            this.PopUpType = 'pdf-viewer';
            this.HaveHeader = true;
            this.isClicked = true;
            this.startLeftPosition = 40;
            this.startTopPosition = 0;
            this.HaveMaxBtn = false;
            this.OverMainMinwidthPixel = 1295;
            this.MainMaxwidthPixel = 1300;
            this.PopupParam = {
              HeaderName: 'چاپ درخواست معامله',
              PDFSrc: res ? res.FileBase64 : undefined,
              FileName: res ? res.FileName : null,
              OrderCommitionID: -1,
              HaveEstimate: false,
              HaveSign: false,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              RegionCode: this.ProductRequestObject.RegionCode,
              PDFSignersInfo: res ? res.PDFSignersInfo : null,
              HasTripleReport: this.HaseEstimate,
              IsFinal: false,
              HaveUpload: false,
              SignByFile: false,
              IsArticle18: false,
              HasDelBtn: false,
              IsTrafficRep: true,
              IsAdequacy: false,
              IsDisArticle18: false
            };
          });
          return;
        } else if (event === 'NO') {
          this.ProductRequest.GetMinutesReportPDFContent(
            -1,
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.RegionCode,
            1107,
            this.HaseEstimate,
            true,
            this.ModuleViewTypeCode,
            this.ModuleCode).subscribe(PDFRes => {
              if (PDFRes) {
                this.IsDown = true;
                this.PopUpType = 'pdf-viewer';
                this.HaveHeader = true;
                this.isClicked = true;
                this.startLeftPosition = 40;
                this.startTopPosition = 0;
                this.HaveMaxBtn = false;
                this.OverMainMinwidthPixel = 1295;
                this.MainMaxwidthPixel = 1300;
                this.PopupParam = {
                  HeaderName: 'چاپ درخواست معامله',
                  PDFSrc: PDFRes.FileBase64,
                  FileName: PDFRes.FileName,
                  OrderCommitionID: -1,
                  HaveEstimate: false,
                  HaveSign: false,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  RegionCode: this.ProductRequestObject.RegionCode,
                  PDFSignersInfo: PDFRes.PDFSignersInfo,
                  HasTripleReport: this.HaseEstimate,
                  IsFinal: false,
                  IsArticle18: false,
                  HasDelBtn: false,
                  IsTrafficRep: true,
                  IsAdequacy: false,
                  IsDisArticle18: false
                };
              } else {
                this.IsDown = true;
                this.ShowMessageBoxWithOkBtn('فایل صورتجلسه بارگزاری نشده است.');
              }
            });
        }
      } else if (this.BtnClickedName === 'AdecuacyDoc') {
        if (event === 'YES') {
          this.ComonService.GetAllArchiveDetailList(this.CostFactorID, 1167, true).subscribe(res => {
            this.PopUpType = 'pdf-viewer';
            this.HaveHeader = true;
            this.isClicked = true;
            this.startLeftPosition = 40;
            this.startTopPosition = 0;
            this.HaveMaxBtn = false;
            this.OverMainMinwidthPixel = 1295;
            this.MainMaxwidthPixel = 1300;
            this.PopupParam = {
              HeaderName: 'نامه کفایت اسناد',
              PDFSrc: res ? res.FileBase64 : undefined,
              FileName: res ? res.FileName : null,
              OrderCommitionID: null,
              HaveEstimate: false,
              HaveSign: true,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              RegionCode: this.ProductRequestObject.RegionCode,
              PDFSignersInfo: res ? res.PDFSignersInfo : null,
              HasTripleReport: false,
              IsFinal: false,
              HaveUpload: !res || !res.PDFSignersInfo || res.PDFSignersInfo.length <= 0,
              SignByFile: false,
              IsArticle18: false,
              HasDelBtn: this.IsAdmin,
              IsAdequacy: true,
              IsDisArticle18: false
            };
          });
          return;
        } else if (event === 'NO') {
          this.ProductRequest.GetMinutesReportPDFContent(
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.RegionCode,
            1167,
            false,
            true,
            this.ModuleViewTypeCode).subscribe(PDFRes => {
              if (PDFRes) {
                this.IsDown = true;
                this.PopUpType = 'pdf-viewer';
                this.HaveHeader = true;
                this.isClicked = true;
                this.startLeftPosition = 40;
                this.startTopPosition = 0;
                this.HaveMaxBtn = false;
                this.OverMainMinwidthPixel = 1295;
                this.MainMaxwidthPixel = 1300;
                this.PopupParam = {
                  HeaderName: 'نامه کفایت اسناد',
                  PDFSrc: PDFRes.FileBase64,
                  FileName: PDFRes.FileName,
                  OrderCommitionID: null,
                  HaveEstimate: false,
                  HaveSign: true,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  RegionCode: this.ProductRequestObject.RegionCode,
                  PDFSignersInfo: PDFRes.PDFSignersInfo,
                  HasTripleReport: false,
                  IsFinal: false,
                  IsArticle18: false,
                  HasDelBtn: this.IsAdmin,
                  IsAdequacy: true,
                  IsDisArticle18: false
                };
              } else {
                this.IsDown = true;
                this.ShowMessageBoxWithOkBtn('فایل صورتجلسه بارگزاری نشده است.');
              }
            });
        }
      } else if (this.BtnClickedName === 'DisArticle18') {
        if (event === 'YES') {
          this.isClicked = true;
          this.PopUpType = 'rich-text-box-input';
          this.startLeftPosition = 70;
          this.startTopPosition = 100;
          this.HaveMaxBtn = false;
          this.PixelHeight = 290;
          this.OverMainMinwidthPixel = 950;
          this.MainMaxwidthPixel = 1000;
          this.HaveHeader = true;
          this.MinHeightPixel = 270;
          this.PopupParam = {
            HeaderName: 'دلایل عدم تصویب',
            OrderCommitionID: this.OrderCommitionID,
            CostFactorID: this.ProductRequestObject.CostFactorID,
            RegionCode: this.ProductRequestObject.RegionCode,
            IsDisableInput: true,
            IsAdmin: this.IsAdmin
          };
          this.IsClickedPopUp = true;
          return;
        } else if (event === 'NO') {
          this.isClicked = true;
          this.PopUpType = 'rich-text-box-input';
          this.startLeftPosition = 70;
          this.startTopPosition = 100;
          this.HaveMaxBtn = false;
          this.PixelHeight = 290;
          this.OverMainMinwidthPixel = 950;
          this.MainMaxwidthPixel = 1000;
          this.HaveHeader = true;
          this.MinHeightPixel = 270;
          this.PopupParam = {
            HeaderName: 'دلایل عدم تصویب',
            OrderCommitionID: this.OrderCommitionID,
            CostFactorID: this.ProductRequestObject.CostFactorID,
            RegionCode: this.ProductRequestObject.RegionCode,
            IsDisableInput: false,
            IsAdmin: this.IsAdmin
          };
          this.IsClickedPopUp = true;
          return;
        }
      } else {
        return;
      }
    }
    this.isClicked = false;
    this.PopUpType = '';
    this.BtnClickedName = '';
    this.ExistsFile = false;
    this.ExistsArticle18File = false;
    this.ExistsDisApprArticle18File = false;
    this.PixelHeight = null;
  }
  getOutPutParam(event) {
    if (this.PopUpType === 'product-request-suggestion' ||
      this.PopUpType === 'product-request-cost' ||
      this.PopUpType === 'product-request-person-item' ||
      this.PopUpType === 'request-contract-without-flow' ||
      this.PopUpType === 'product-request-provision' ||
      this.PopUpType === 'app-provision' ||
      this.PopUpType === 'create-contract-on-flow' ||
      this.PopUpType === 'general-tender' ||
      this.PopUpType === 'app-commition') {
      this.ProductRequestObject = event;
      if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
        this.IsInsert = true;
      }
    }
    this.ShowModuleTypeName();
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
      // this.IsEditable = false;
      // this.ISSendAndConfirm = true;
      this.Close();
      // return;
    }
    if (this.PopUpType === 'product-request-suggestion') {
      if (this.ProductRequestObject.ProductRequestItemList && !this.IsTransferedContract) { // 65605
        this.rowsData = this.ProductRequestObject.ProductRequestItemList;
        this.SetEntityDataInDataRow(this.rowsData);
      }
    }
    if (this.PopUpType === 'show-contract-list') {
      this.SetLastContractData(event);
    }
    if (this.PopUpType === 'create-contract-on-flow') {
      this.rowsData = this.ProductRequestObject.ProductRequestItemList;
    }
  }
  ConfirmAndSend() {
    let PRWCount = 0;
    this.ReceiveDocGridApi.forEachNode(element => {
      PRWCount = 1;
    });
    if (this.ModuleViewTypeCode === 78 && PRWCount === 0 && this.ProductRequestObject.RegionCode !== 241) { // RFC 58163
      this.ShowMessageBoxWithOkBtn('بدون وارد کردن اقلام ضمانت نامه امکان ارسال وجود ندارد');
      this.IsDown = true;
      return;
    }
    if ((this.ModuleViewTypeCode === 7 && this.ModuleCode === 2730) || (this.ModuleViewTypeCode === 3 && this.ModuleCode === 2787)) {
      this.ProductRequest.GetCommitionExpertPerson(this.ProductRequestObject.CostFactorID).subscribe(res => {
        if (res) {
          this.DoConfirmAndSend();
        } else {
          this.ShowMessageBoxWithOkBtn('کارشناس امور قراردادها باید انتخاب گردد');
          this.IsDown = true;
        }
      });
    } else {
      this.DoConfirmAndSend();
    }
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
    if (!this.IsEntryPercentageOfChanges) {
      this.SetPercentageOfChanges();
    }
    if (!this.IsEntryPercentageLevelOfChanges) {
      this.SetPercentageLevelOfChanges();
    }
  }
  OnRowDataUpdated() {
    this.SetSumFinalAmount();
    if (!this.IsEntryPercentageOfChanges) {
      this.SetPercentageOfChanges();
    }
    if (!this.IsEntryPercentageLevelOfChanges) {
      this.SetPercentageLevelOfChanges();
    }
    this.SetSumFinalAmount();
  }
  OnFilterChanged() {
    this.SetSumFinalAmount();
  }
  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    let SumAmount = 0;
    let SumFinalItemAmountWithDurations = 0;
    let SumEstimateAmount = 0;
    let SumEstimateAmountCoef = 0;
    let RegionCode = -1;
    let CostCenterCode = '';
    if (this.ProductRequestObject) {
      RegionCode = this.ProductRequestObject.RegionCode;
      if (this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterObject) {
        CostCenterCode = this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode;
      }
    } else {
      RegionCode = this.RegionParams.selectedObject;
      // tslint:disable-next-line: max-line-length
      CostCenterCode = this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterCode : '';
    }
    if (this.HaseEstimate) {
      if (this.gridApi) {
        this.gridApi.forEachNodeAfterFilter(function (node) {
          if (node.data.AmountCOEFPact) {
            // tslint:disable-next-line:radix
            SumFinalAmount = SumFinalAmount + parseFloat(node.data.AmountCOEFPact);
            SumAmount = SumAmount + parseFloat(node.data.AmountCOEFPact);
          }
          if (node.data.AmountCOEFPactWithDuration) {
            SumFinalItemAmountWithDurations = SumFinalItemAmountWithDurations + parseFloat(node.data.AmountCOEFPactWithDuration);
          }
          if (node.data.VWAmount) {
            // tslint:disable-next-line:radix
            SumEstimateAmount = SumEstimateAmount + parseFloat(node.data.VWAmount);
          }
          if (node.data.AmountCOEF) {
            // tslint:disable-next-line:radix
            SumEstimateAmountCoef = SumEstimateAmountCoef + parseFloat(node.data.AmountCOEF);
          }
        });
        this.SumFinalAmount = SumFinalAmount;
        this.SumAmount = SumAmount;
        this.SumFinalItemAmount = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalItemAmountWithDuration = SumFinalItemAmountWithDurations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumEstimateAmountStr = SumEstimateAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumEstimateAmountCoefStr = SumEstimateAmountCoef.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } else {
      if (this.gridApi) {
        this.gridApi.forEachNodeAfterFilter(function (node) {
          // if (node.data.FinalAmount) {
          //   // tslint:disable-next-line:radix
          //   SumFinalAmount = SumFinalAmount + parseFloat(node.data.FinalAmount);
          // }
          if (node.data.AmountCOEFPact) {
            // tslint:disable-next-line:radix
            SumAmount = SumAmount + parseFloat(node.data.AmountCOEFPact);
            SumFinalAmount = SumFinalAmount + parseFloat(node.data.AmountCOEFPact); // 62186
          }
          if (node.data.AmountCOEFPactWithDuration) {
            SumFinalItemAmountWithDurations = SumFinalItemAmountWithDurations + parseFloat(node.data.AmountCOEFPactWithDuration);
          }
        });
        this.SumFinalAmount = SumFinalAmount;
        this.SumAmount = SumAmount;
        this.SumFinalItemAmount = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalItemAmountWithDuration = SumFinalItemAmountWithDurations.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  }
  SetPercentageOfChanges() {
    if (this.ContractParams.selectedObject) {
      let SumFinalAmount = 0;
      if (this.gridApi) {
        this.gridApi.forEachNode(function (node) {
          if (node.data.FinalAmount) {
            // tslint:disable-next-line:radix
            SumFinalAmount = SumFinalAmount + parseFloat(node.data.FinalAmount);
          }
        });
      }
      if (this.SumFinalAmountRelatedContract !== 0) {
        // tslint:disable-next-line:max-line-length
        this.PercentageOfChanges = Math.round(((SumFinalAmount - this.SumFinalAmountRelatedContract) / this.SumFinalAmountRelatedContract * 100) * 10000.0) / 10000.0;
      } else {
        this.PercentageOfChanges = 0;
      }
    }
  }
  SetPercentageLevelOfChanges() {
    if (this.ContractParams.selectedObject) {
      let SumFinalAmount = 0;
      if (this.gridApi) {
        this.gridApi.forEachNode(function (node) {
          if (node.data.FinalAmount) {
            // tslint:disable-next-line:radix
            SumFinalAmount = SumFinalAmount + parseFloat(node.data.FinalAmount);
          }
        });
      }
      if (this.SumFinalBeforeLastAmountRelatedContract !== 0) {
        // tslint:disable-next-line:max-line-length
        this.PercentageLevelOfChanges = Math.round(((SumFinalAmount - this.SumFinalBeforeLastAmountRelatedContract) / this.SumFinalBeforeLastAmountRelatedContract * 100) * 10000.0) / 10000.0;
      } else {
        this.PercentageLevelOfChanges = 0;
      }
    }
  }
  onContractViewClick() {
    if ((this.ModuleCode === 2773 || this.ModuleCode === 2787) && this.ModuleViewTypeCode === 500000) {
    } else {
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
  }
  onChangeContract(ContractId) {
    this.RelatedProductRequestID = this.ContractItems.find(x => x.ContractId === ContractId).ProductRequestID;
    this.PriceListPatternID = this.ContractItems.find(x => x.ContractId === ContractId).PriceListPatternID;
    if (ContractId) {
      this.contractpaydetail.GetFirstContractOrder(ContractId).subscribe(ress => {
        ress.forEach(item => {
          item.FinalAmount = item.Amount;
          this.SumFinalAmountRelatedContract = this.SumFinalAmountRelatedContract + parseFloat(item.FinalAmount);
        });
        this.SetPercentageOfChanges();
      });
      this.contractpaydetail.GetBeforeLastContractOrder(ContractId).subscribe(resss => {
        resss.forEach(item => {
          item.FinalAmount = item.Amount;
          this.SumFinalBeforeLastAmountRelatedContract = this.SumFinalBeforeLastAmountRelatedContract + parseFloat(item.FinalAmount);
        });
        this.SetPercentageLevelOfChanges();
      });
    }
    if (this.ModuleCode && this.ModuleCode === 2773) {
      if (this.RelatedProductRequestID) {
        this.ProductRequest.GetProductRequest(this.RelatedProductRequestID).subscribe(res => {
          if (res) {
            this.ProductRequestObject = res;
            this.ProductRequestObject.CostFactorID = -1;
            this.FillAllNgSelectByProductRequest(this.ProductRequestObject);
            if (
              this.ProductRequestObject.ProductRequestStatusCode &&
              this.ProductRequestObject.ProductRequestStatusCode !== 3) {
              this.btnRevocationName = 'ابطال';
              this.btnRevocationIcon = 'revocation';
            }
            if (
              this.ProductRequestObject.ProductRequestStatusCode &&
              this.ProductRequestObject.ProductRequestStatusCode === 3) {
              this.btnRevocationName = 'بازگشت از ابطال';
              this.btnRevocationIcon = 'cancel';
            }
            this.IsCost = this.ProductRequestObject.IsCost;
            if (this.ModuleViewTypeCode === 89 && this.IsCost === false) {
              this.ISActLocation = true;
            } else {
              this.ISActLocation = false;
            }
            // this.ProductRequestDate = this.ProductRequestObject.ShortProductRequestDate;
            // پر نکردن تاریخ درخواست توسط قراداد اصلی تامین مانده اعتبار خانوم احمدی
            this.DeadLineDate = this.ProductRequestObject.ShortDeadlineDate;
            this.Subject = this.ProductRequestObject.Subject;
            this.Address = this.ProductRequestObject.Address;

            if (this.ProductRequestObject && this.ProductRequestObject.ContractObject) {
              this.ContractSubject = this.ProductRequestObject.ContractObject.Subject;
              this.ContractCode = this.ProductRequestObject.ContractObject.LetterNo;
            }

            this.BriefingReport = this.ProductRequestObject.BriefingReport;
            this.IsDisable = this.ModuleCode === 2773 ? true : false; // RFC 52222

            this.ProductRequestObject.ProductRequestItemList.forEach(element => {
              element.ProductRequestItemID = -1;
            });

            // this.rowsData = this.ProductRequestObject.ProductRequestItemList;

            // tslint:disable-next-line:no-shadowed-variable
            this.contractpaydetail.GetLastContractOrder(ContractId, false).subscribe(res => { // RFC 53624 و هماهنگی آقای آخوندی
              this.rowsData = res;
              this.rowsData.forEach(item => {
                item.ScaleName = item.ScaleName;
                item.QTY = item.Qty;
                item.Subject = item.Note + ' - ' + item.ContractCode;
                if (item.Qty === null || item.Qty === 0) {
                  item.Amount = item.Amount;
                } else {
                  item.FinalAmount = item.Amount;
                  item.Amount = item.FinalAmount / item.Qty;
                }
              });
            });
          }
        });
      }
    } else {
      this.PercentageOfChanges = 0;
      this.contractpaydetail.GetLastContractOrder(ContractId, true).subscribe(res => {
        this.rowsData = res;
        this.rowsData.forEach(item => {
          item['_SelectedContractItem_ng'] = true;
          item.ScaleName = item.ScaleName;
          item.QTY = item.Qty;
          item.Subject = (this.ModuleViewTypeCode === 1 || this.ModuleViewTypeCode === 89
            || this.ModuleViewTypeCode === 165) ? '' :
            (item.Note ? item.Note + ' - ' + item.ContractCode : '');
          if (item.QTY === null || item.QTY === 0) {
            item.FinalAmount = item.Amount;
            item.AmountCOEFPact = !this.IsNew ? null : item.AmountCOEFPact;
            item.AmountCOEF = !this.IsNew ? null : item.AmountCOEF;
          } else {
            item.FinalAmount = item.Amount;
            item.Amount = item.FinalAmount / ((!item.QTY || item.QTY === 0) ? 1 : item.QTY);
            item.AmountCOEFPact = !this.IsNew ? null : item.AmountCOEFPact;
            item.AmountCOEF = !this.IsNew ? null : item.AmountCOEF;
          }
        });
      });
      if (this.RelatedProductRequestID) {
        this.ProductRequest.GetProductRequest(this.RelatedProductRequestID).subscribe(res => {
          this.RelatedProductRequestObject = res;
          this.Address = this.RelatedProductRequestObject.Address;
          this.IsContractSelect = true;
          if (this.ModuleViewTypeCode === 114 && this.RegionParams.selectedObject === 222) { // RFC 51513
            this.OnOpenNgSelect('Rustee');
            this.OnOpenNgSelect('FilterRegion');
            // با تغییر قرارداد، اطلاعات کاربر جاری در معاونت و اداره مجری و درخواست کننده تغییر نکند
          } else { // RFC 51513
            this.RequestedPersonParams.selectedObject = null;
            this.OnOpenNgSelect('Rustee');
            this.OnOpenNgSelect('CostCenter');
            this.OnOpenNgSelect('FilterRegion');
          }
        });
      }
      this.TimeExtensionDay = 0; // RFC 51373
      this.TimeExtensionMonth = 0; // RFC 51373
      this.TimeExtensionYear = 0; // RFC 51373

      // this.ContractList.HasContractOrderEstimate(ContractId).subscribe(HasCOE => {
      //   this.FillGrid(HasCOE);
      // });

    }
  }
  onChangeRustee(ACostCenterID) {
    this.SubRusteeParams.selectedObject = null;
  }
  onChangeSubRustee(ASubCostCenterID) {
  }
  onChangeCostCenter(ACostCenterID) {
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;

    let RegionCode = -1;
    let CostCenterCode = '';
    RegionCode = this.RegionParams.selectedObject;
    // tslint:disable-next-line: max-line-length
    CostCenterCode = this.CostCenterItems ? this.CostCenterItems.find(x => x.CostCenterId === ACostCenterID).CostCenterCode : '';

  }
  onSubCostCenterSelectedChange(SubCostCenterID) {
    this.RequestedPersonParams.selectedObject = null;
    this.OnOpenNgSelect('RequestedPerson');
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
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید درخواست انجام معامله با موفقیت انجام شد');

              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
              this.IsEditConfirm = true;
              // if (this.ConfirmStatus.includes(21)) {
              //   this.ReadyToConfirm = 0;
              //   this.btnConfirmName = 'تایید';
              //   this.btnConfirmIcon = 'ok';
              // } else {
              //    this.HaveConfirm = false;
              // }
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
  onRevocation() {
    // tslint:disable-next-line:max-line-length
    if (this.ModuleCode === 2730 && (this.ModuleViewTypeCode === 200000 || this.ModuleViewTypeCode === 300000 || this.ModuleViewTypeCode === 100000)) {
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
        OrginalModuleCode: this.OrginalModuleCode
      };
    } else {
      // tslint:disable-next-line:max-line-length
      this.ProductRequest.RequestRevocation(this.CurrWorkFlow, this.WorkFlowID, this.CostFactorID, this.WorkflowTypeCode, this.ModuleCode, this.OrginalModuleCode).subscribe(res => {
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
  onConfirmAndSend() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تایید و ارسال درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if ((!this.ExpertParams.selectedObject && this.ProductRequestObject.DealMethodCode === 7 &&
      this.ProductRequestObject.IsBaselineScrolling &&
      this.ModuleViewTypeCode === 103 && this.ProductRequestObject.RegionCode === 213) ||
      (!this.ExpertParams.selectedObject &&
        this.ModuleViewTypeCode === 103 &&
        this.ProductRequestObject.RelatedContractID &&
        this.currentRegionObject.RegionGroupCode === 3)) {
      this.ShowMessageBoxWithOkBtn('معاونت تخصصی ستاد را انتخاب نمایید');
      return;
    } // RFC 57059
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
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
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
          // if (this.ConfirmStatus.includes(22)) {
          //   this.ReadyToConfirm = 1;
          //   this.btnConfirmName = 'عدم تایید';
          //   this.btnConfirmIcon = 'cancel';
          // } else {
          //    this.HaveConfirm = false;
          // }
          if (this.RegionParams.selectedObject === 222 && this.btnConfirmName === 'عدم تایید'
            && this.ModuleViewTypeCode === 38) { // RFC 58310
            this.ShowTrafficSign = true;
          }
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
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
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
          if (this.ProductRequestObject.RegionCode === 79) {
            this.HasEditContractInfoBtn = true;
            this.CheckContractStatusForUpdate();
          }

        } else {
          messageStr = 'تایید نهایی درخواست انجام معامله با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
          if (this.ProductRequestObject.RegionCode === 222) { // RFC 55522
            this.ISDisabledConfirmAndReturnBtn = true;
          }
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
  OpengeneraltenderPage() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        if (this.OrginalModuleCode === 2793 || this.OrginalModuleCode === 2939
          || this.ModuleViewTypeCode === 38 || this.ModuleViewTypeCode === 64
          || this.ModuleViewTypeCode === 57 || this.ModuleViewTypeCode === 23
          || this.ModuleViewTypeCode === 27 || this.ModuleViewTypeCode === 104
          || this.ModuleViewTypeCode === 128 || this.ModuleViewTypeCode === 131
          || this.ModuleViewTypeCode === 132 || this.ModuleViewTypeCode === 133
          || this.ModuleViewTypeCode === 134 || this.ModuleViewTypeCode === 139
          || this.ModuleViewTypeCode === 157 || this.ModuleViewTypeCode === 158) { // RFC 49473 akharin taghirat && RFC 54244
          this.PercentWidth = 55;
          this.MinHeightPixel = null;
          this.MainMaxwidthPixel = null;
          this.PopUpType = 'app-inquiry-list';
          this.isClicked = true;
          this.HaveHeader = true;
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
            ModuleViewTypeCode: this.ModuleViewTypeCode,
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
        } else {
          // tslint:disable-next-line: max-line-length
          this.LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ? this.ProductRequestObject.LastInquiryObject : null;
          if ((!this.LastInquiryObject ||
            (this.LastInquiryObject && !this.LastInquiryObject.IsWin && !this.LastInquiryObject.IsReturn)) ||
            this.ModuleViewTypeCode === 129 ||// 58382
            this.ModuleViewTypeCode === 185
          ) {
            this.PercentWidth = 81;
            this.PopUpType = 'general-tender';
            this.isClicked = true;
            this.HaveHeader = true;
            this.OverMainMinwidthPixel = null;
            this.startLeftPosition = 140;
            this.startTopPosition = 14;
            this.HaveMaxBtn = false;
            //  this.MainMaxwidthPixel = 1500;
            // this.OverMainMinwidthPixel = 1085;
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
              OrginalModuleCode: this.OrginalModuleCode,
              ModuleCode: this.ModuleCode,
              UserRegionCode: this.UserRegionCode,
              IsAdmin: this.IsAdmin,
              OriginModuleViewTypeCode: this.ModuleViewTypeCode
            };
          } else {
            this.ShowMessageBoxWithOkBtn('مناقصه یا مزایده مورد نظر تعیین تکلیف شده است .');
          }
        }
      });
    } else {
      if (this.OrginalModuleCode === 2793 || this.OrginalModuleCode === 2939
        || this.ModuleViewTypeCode === 38 || this.ModuleViewTypeCode === 64
        || this.ModuleViewTypeCode === 57 || this.ModuleViewTypeCode === 23
        || this.ModuleViewTypeCode === 27 || this.ModuleViewTypeCode === 104
        || this.ModuleViewTypeCode === 128 || this.ModuleViewTypeCode === 131
        || this.ModuleViewTypeCode === 132 || this.ModuleViewTypeCode === 133
        || this.ModuleViewTypeCode === 134 || this.ModuleViewTypeCode === 139
        || this.ModuleViewTypeCode === 157 || this.ModuleViewTypeCode === 158) { // RFC 49473 akharin taghirat && RFC 54244
        this.PercentWidth = 55;
        this.MinHeightPixel = null;
        this.MainMaxwidthPixel = null;
        this.PopUpType = 'app-inquiry-list';
        this.isClicked = true;
        this.HaveHeader = true;
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
          ModuleViewTypeCode: this.ModuleViewTypeCode,
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
      } else {
        // tslint:disable-next-line: max-line-length
        this.LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ? this.ProductRequestObject.LastInquiryObject : null;
        if ((!this.LastInquiryObject ||
          (this.LastInquiryObject && !this.LastInquiryObject.IsWin && !this.LastInquiryObject.IsReturn)) ||
          this.ModuleViewTypeCode === 129 ||// 58382
          this.ModuleViewTypeCode === 185
        ) {
          this.PercentWidth = 81;
          this.PopUpType = 'general-tender';
          this.isClicked = true;
          this.HaveHeader = true;
          this.OverMainMinwidthPixel = null;
          this.startLeftPosition = 140;
          this.startTopPosition = 14;
          this.HaveMaxBtn = false;
          //  this.MainMaxwidthPixel = 1500;
          // this.OverMainMinwidthPixel = 1085;
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
            OrginalModuleCode: this.OrginalModuleCode,
            ModuleCode: this.ModuleCode,
            UserRegionCode: this.UserRegionCode,
            IsAdmin: this.IsAdmin,
            OriginModuleViewTypeCode: this.ModuleViewTypeCode
          };
        } else {
          this.ShowMessageBoxWithOkBtn('مناقصه یا مزایده مورد نظر تعیین تکلیف شده است .');
        }
      }
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
      case 82:
        HeaderName = 'حراج';
        break;
      case 139:
      case 38:
      case 131:
      case 39:
      case 40:
      case 70:
      case 142:
      case 105:
      case 42:
      case 122: // RFC 53422
      case 157:
      case 164:
      case 188:
        HeaderName = 'مناقصه عمومی';
        break;
      case 57:
      case 58:
      case 158: // RFC 59100
        HeaderName = 'مناقصه محدود';
        break;
      case 104:
        HeaderName = 'مناقصه محدود اتوبوسرانی';
        break;
      case 128: // RFC 54244
        HeaderName = 'استعلام بها';
        break;
      case 64:
      case 133:
      case 29:
      case 35:
      case 43:
        HeaderName = 'مزایده';
        break;
      default:
        HeaderName = 'مناقصه عمومی';
        break;
    }

    if (this.ModuleCode === 2730 && (this.ModuleViewTypeCode === 100000 || this.ModuleViewTypeCode === 110000 ||
      this.ModuleViewTypeCode === 200000 || this.ModuleViewTypeCode === 300000)) {
      this.PopUpType = 'app-product-request-page-proposal';
      this.isClicked = true;
      this.HaveHeader = false;
      this.startLeftPosition = 560;
      this.startTopPosition = 200;
      this.HaveMaxBtn = false;
      this.OverMainMinwidthPixel = null;
      this.PercentWidth = 30;
      this.MinHeightPixel = 210;
      this.MainMaxwidthPixel = 1500;
    } else {
      this.OpengeneraltenderPage();
    }
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
  onProvisionClick(Str) {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
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
      });
    } else {
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
    this.ContractParams.loading = true;
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
  onDelete() {

  }
  onLawfulSave() {
    this.ProductRequest.ChangeProductRequestLawful(this.CostFactorID, this.IsLawful, this.OrginalModuleCode).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('تایید/عدم تایید انطباق درخواست با قوانین با موفقیت انجام شد');
    });
  }
  onSaveIsProvisionDuring() {
    this.ProductRequest.SetPRIsProvisionDuring(this.CostFactorID, this.IsLawful, this.OrginalModuleCode).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('برسی در جریان اعتبار درخواست با موفقیت انجام شد');
    });
  }
  onSaveRequestArticle48() {
    const ProductRequest = {
      ContractStackHolderID: this.SubRusteeParams.selectedObject,
      SubCostCenterID: this.SubCostCenterParams.selectedObject,
      ActorID: this.RequestedPersonParams.selectedObject,
      CostFactorID: this.CostFactorID
    };
    const RequestArticle48List = [];
    this.Article48GridApi.stopEditing();
    this.Article48GridApi.forEachNode(node => {
      node.data.ProductRequestArticle48Date = this.CommonService.ConvertToASPDateTime(node.data.ProductRequestArticle48Date);
      RequestArticle48List.push(node.data);
    });
    // tslint:disable-next-line:max-line-length
    this.ProductRequest.SaveProductRequestArticle48(RequestArticle48List, ProductRequest, this.ModuleCode, this.OrginalModuleCode).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت اقلام مانده تامین اعتبار ماده 48 با موفقیت انجام شد');
    });

  }
  onSavePRWarrantyAndValidity() {
    const ReceiveDocList = [];
    this.ReceiveDocGridApi.stopEditing();
    this.ReceiveDocGridApi.forEachNode(node => {
      const ReceiveDocObj = {
        ReceiveDocID: node.data.ReceiveDocID ? node.data.ReceiveDocID : -1,
        CostFactorID: -1,
        // tslint:disable-next-line:max-line-length
        ReceiveDocTypeCode: (node.data.ReceiveDocTypeName && node.data.ReceiveDocTypeName.ReceiveDocTypeCode) ? node.data.ReceiveDocTypeName.ReceiveDocTypeCode : (node.data.ReceiveDocTypeCode ? node.data.ReceiveDocTypeCode : null),
        // tslint:disable-next-line:max-line-length
        ReferenceDate: node.data.PersianReferenceDate && node.data.PersianReferenceDate.MDate ? node.data.PersianReferenceDate.MDate : (node.data.ShortReferenceDate ? node.data.ShortReferenceDate : null),
        ReferenceNo: node.data.ReferenceNo ? node.data.ReferenceNo : null,
        ItemNo: node.data.ItemNo,
        ReceiveDocAmount: node.data.ReceiveDocAmount,
        Note: node.data.Note,
        IsWarranty: 1,
        ProposalID: node.data.ProposalID,
        IsValidity: node.data.IsValidity ? true : false,
        EstateValue: node.data.EstateValue,
        Area: node.data.Area,
        EstateAddress: node.data.EstateAddress,
        EstateTypeCode: node.data.EstateTypeCode,
        SapamNo: node.data.SapamNo,
        RegRegion: node.data.RegRegion,
      };
      ReceiveDocList.push(ReceiveDocObj);
    });
    this.ProductRequest.SavePRWarrantyAndValidity(this.CostFactorID, this.IsLawful, ReceiveDocList, this.OrginalModuleCode).subscribe(x => {
      if (this.ModuleViewTypeCode === 78) {
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات ضمانت نامه با موفقیت انجام شد');
      } else if (this.ModuleViewTypeCode === 136) {
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
      }
      this.SetPRWarrantyReciveDocList();
    });
  }
  SetWarrantyValidity() {
    this.ProductRequest.SetWarrantyValidity(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت اعتبار سنجی ضمانت نامه ها با موفقیت انجام شد');
    });
  }
  onUpdatePRWarrantyMoratorium() {
    this.ProductRequest.UpdatePRWarrantyMoratorium(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت تحویل به موقع اسناد ضمانت نامه با موفقیت انجام شد');
    });
  }
  UpdatePRIsWarrantyProvided() {
    this.ProductRequest.UpdatePRIsWarrantyProvided(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    });
  }
  UpdateTenderDoc() {
    this.ProductRequest.UpdateTenderDoc(this.CostFactorID, this.IsUpdateTenderDoc).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    });
  }
  SetPRIsNeedCreditModification() {
    this.ProductRequest.SetPRIsNeedCreditModification(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت نیاز به اصلاح اعتبار با موفقیت انجام شد');
    });
  }
  SetPRHaveWinner() {
    this.ProductRequest.SetPRHaveWinner(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    });
  }
  SetPRHaveQuotaOfSuggestions() {
    this.ProductRequest.SetPRHaveQuotaOfSuggestions(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت برسی تعداد پیشنهاد دهندگان با موفقیت انجام شد');
    });
  }
  SetContractIsTaxValue() {
    if (this.ProductRequestObject && this.ProductRequestObject.ContractObject && this.ProductRequestObject.ContractObject.ContractId) {
      this.ProductRequest.SetContractIsTaxValue(this.ProductRequestObject.ContractObject.ContractId, this.IsLawful).subscribe(x => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
    } else {
      this.ShowMessageBoxWithOkBtn('برای این درخواست قراردادی ایجاد نشده است');
    }
  }
  onUpdateProductRequestOfficialExpertPrice() {
    // tslint:disable-next-line:max-line-length
    this.ProductRequest.UpdateProductRequestOfficialExpertPrice(this.CostFactorID, this.OfficialExpertPrice, this.OrginalModuleCode).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('قیمت کارشناس رسمی دادگستری با موفقیت ثبت شد');
    });
  }
  onSaveExpertPerson(RoleID = 972, SaveMessage = null) {
    if (this.ExpertParams.selectedObject && this.CostFactorID) {
      const PrPersonObj = {
        ActorID: this.ExpertParams.selectedObject,
        CostFactorID: this.CostFactorID,
        RoleID: RoleID
      };
      if (this.IsUpdateBefore) {
        this.IsUpdateBeforeAdevertising = this.IsUpdateBeforeAdevertising
      }
      SaveMessage = SaveMessage ? SaveMessage : 'کارشناس امور قرارداد ها';
      this.ProductRequest.SaveExpertProductRequestPerson(PrPersonObj, this.IsUpdateBeforeAdevertising, this.ModuleCode, this.OrginalModuleCode).subscribe(x => {
        this.IsExpertSelected = false;
        this.ShowMessageBoxWithOkBtn('ذخیره ' + SaveMessage + ' با موفقیت انجام شد');
      });
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا ' + SaveMessage + ' را انتخاب نمایید');
    }
  }
  onExpertOpen(type = 0) {
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    if (this.ProductRequestObject) {
      this.UserRegionCode = (this.InputParam && this.InputParam.UserRegionCode) ? this.InputParam.UserRegionCode : this.ProductRequestObject.RegionCode;
    }
    else {
      this.UserRegionCode = (this.InputParam && this.InputParam.UserRegionCode) ? this.InputParam.UserRegionCode : this.RegionParams.selectedObject;
    }

    this.Actor.GetPersonList(this.ExpertPersonRoleID, this.SubCostCenterParams.selectedObject, this.UserRegionCode, true).subscribe(res => {
      this.ExpertItems = res;
      if (type === 1 && this.ProductRequestObject && this.ProductRequestObject.RequestPersonList) {
        const SelectedExpertPerson = this.ProductRequestObject.RequestPersonList.filter(x => x.RoleID === this.ExpertPersonRoleID);
        if (SelectedExpertPerson.length > 0) {
          this.ExpertParams.selectedObject = SelectedExpertPerson[0].ActorID;
          this.ProductRequestPersonID = SelectedExpertPerson[0].ProductRequestPersonID;
        }
      }
    });

  }
  onContractStyleOpen(type = 0) {

  }
  onSignersOpen(type = 0) {
    this.Actor.GetPersonPaging(1, 30, null, null).subscribe(res => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'PR-contract-sign'
      });
      if (type === 1 &&
        this.PRContractObject &&
        this.PRContractObject.ContractSignList &&
        this.PRContractObject.ContractSignList.length > 0) {
        let ActorIDs = null;
        this.PRContractObject.ContractSignList.forEach(item => {
          ActorIDs = [];
          ActorIDs.push(item.ActorID);
        });
        this.ContractSignParams.selectedObject = ActorIDs;
      }
    });
  }
  FetchMoreSigners(event) {
    this.ContractSignParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
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
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'PR-contract-sign'
      });
    });
  }
  doSignersSearch(event) {
    this.ContractSignParams.loading = true;
    this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'PR-contract-sign'
      });
    });
  }
  onWFSave() {
    let ValidateForm = true;
    if (this.IsCost) {
      ValidateForm =
        ValidateForm &&
        this.Subject &&
        (this.ModuleViewTypeCode !== 89 || this.BriefingReport) && // RFC 52217
        // tslint:disable-next-line: max-line-length
        (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
          (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.CostCenterParams.selectedObject) &&
        // tslint:disable-next-line: max-line-length
        (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
          (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.SubCostCenterParams.selectedObject) &&
        // tslint:disable-next-line: max-line-length
        (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
          (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.RequestedPersonParams.selectedObject) &&
        this.RusteeParams.selectedObject &&
        this.SubRusteeParams.selectedObject &&
        this.VWExeUnitParams.selectedObject &&
        this.ProductRequestDate;
    } else {
      ValidateForm =
        ValidateForm &&
        this.Subject &&
        (this.ModuleViewTypeCode !== 89 || this.BriefingReport) && // RFC 52217
        // tslint:disable-next-line: max-line-length
        (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
          (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.CostCenterParams.selectedObject) &&
        // tslint:disable-next-line: max-line-length
        (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
          (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.SubCostCenterParams.selectedObject) &&
        // tslint:disable-next-line: max-line-length
        (this.currentModuleCode && (this.currentModuleCode === 2824 || this.currentModuleCode === 2793 || this.currentModuleCode === 2939) ? true :
          (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? true : this.RequestedPersonParams.selectedObject) &&
        this.RusteeParams.selectedObject &&
        this.SubRusteeParams.selectedObject &&
        this.VWExeUnitParams.selectedObject &&
        this.ProductRequestDate;
    }
    if (this.ISActLocation) {
      ValidateForm = ValidateForm && this.ActLocationParams.selectedObject;
    }
    if (!ValidateForm) {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      return;
    }

    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if (this.ModuleCode === 2730) {
      switch (this.ModuleViewTypeCode) {
        case 7:
        case 176:
        case 11:
        case 160:
        case 155:
        case 17:
        case 30:
        case 40:
        case 62:
        case 80:
        case 138:  // RFC 57761
        case 116:
        case 162:
          this.onSaveExpertPerson();
          break;
        case 170:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارپرداز تدارکات');
          break;
        case 189:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس حقوقی');
          break;
        case 85:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس سفارشات');
          break;
        case 86:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس بودجه');
          break;
        case 87:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس بازرگاني');
          break;
        case 125:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس سفارشات');
          break;
        case 126:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس بودجه');
          break;
        case 124:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'کارشناس بازرگاني');
          break;
        case 89:
          this.onSaveExpertPerson(this.ExpertPersonRoleID, 'رئیس امور');
          break;
        case 88: // RFC 52350
          if (this.ProductRequestObject.DealMethodCode === 3 && this.ProductRequestObject.RegionCode === 217) {
            this.onSaveExpertPerson(this.ExpertPersonRoleID, 'مدير بازرگاني');
          }
          break;
        case 8:
          this.onLawfulSave();
          break;
        case 9:
        case 25:
          this.onUpdateProductRequestOfficialExpertPrice();
          break;
        case 12:
        case 127:
        case 129:
        case 185:
        case 148:
          break;
        case 20:
        case 34:
        case 186:
        case 54:
        case 136:
        case 78: // RFC 49672
          this.onSavePRWarrantyAndValidity();
          break;
        case 37:
          this.SetPRHaveWinner();
          break;
        case 107:
          this.UpdatePRType107();
          break;
        case 22:
          this.SetContractIsTaxValue();
          break;
        case 31:
          this.onUpdatePRWarrantyMoratorium();
          break;
        case 33:
        case 41:
          this.UpdatePRIsWarrantyProvided();
          break;
        case 47:
        case 68:
        case 96:
        case 112:
        case 149:
        case 166:
        case 169:
          this.onSaveExpertPerson();
          this.onSavePRWarrantyAndValidity();
          break;
        case 48:
          this.SetPRIsNeedCreditModification();
          break;
        case 51:
        case 61:
          this.SetPRHaveWinner();
          break;
        case 55:
          this.SetWarrantyValidity();
          break;
        case 59:
          this.SetPRHaveQuotaOfSuggestions();
          break;
        case 45:
        case 46:
        case 60:
          this.UpdateCommitionDateByID();
          break;
        case 65:
          this.onSaveExpertPerson();
          this.SetPRHaveWinner();
          break;
        case 81:
        case 147:
          this.SetProductRequestRenewal();
          break;
        case 187: //RFC 65068
          this.SetProductRequestRenewal187();
          break;
        case 43:
        case 58:
        case 70:
        case 142:
        case 82:
        case 164:
        case 188:
          this.SetInquiryIsReturn();
          break;
        case 91:
          this.onSaveSupervisorPerson();
          break;
        case 103:
          this.onSaveDepSpeciall();
          break;
        case 97:
          this.UpdatePRIsConfirmOrderDraft();
          break;
        case 102:
          this.UpdatePRIsConfirmContractor();
          break;
        case 119: // RFC 51374
          this.onSaveProdReqIsOnline();
          break;
        case 111:
          this.UpdateTenderDoc();
          break;
        default:
          break;
      }
    } else if (this.ModuleCode === 2773) {
      switch (this.ModuleViewTypeCode) {
        case 5:
          this.onSaveIsProvisionDuring();
          break;
        case 6:
          this.SaveProductRequestFromContractProvisionRemainPage();
          break;
        default:
          break;
      }
    } else if (this.ModuleCode === 2787) {
      switch (this.ModuleViewTypeCode) {
        case 1:
          this.onSaveRequestArticle48();
          break;
        case 3:
          this.onSaveExpertPerson();
          break;
        default:
          break;
      }
    }
  }
  onCommitionClick() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        if (this.ModuleViewTypeCode === 185) {
          if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList
            && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0) {
            this.PopUpType = 'app-commition';
            this.isClicked = true;
            this.HaveHeader = true;
            this.startLeftPosition = 9;
            this.startTopPosition = 10;
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
              ModuleViewTypeCode: this.ModuleViewTypeCode,
              CheckRegionWritable: this.CheckRegionWritable,
              currentRegionObject: this.currentRegionObject,
              IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
              OrginalModuleCode: this.OrginalModuleCode,
              ModuleCode: this.ModuleCode,
              IsAdmin: this.IsAdmin,
            };
          } else {
            this.ShowMessageBoxWithOkBtn('لطفا به درج متقاضیان اقدام نمایید.');
          }
        } else {
          this.PopUpType = 'app-commition';
          this.isClicked = true;
          this.HaveHeader = true;
          this.startLeftPosition = 9;
          this.startTopPosition = 10;
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
            ModuleViewTypeCode: this.ModuleViewTypeCode,
            CheckRegionWritable: this.CheckRegionWritable,
            currentRegionObject: this.currentRegionObject,
            IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
            OrginalModuleCode: this.OrginalModuleCode,
            ModuleCode: this.ModuleCode,
            IsAdmin: this.IsAdmin,
          };
        }
      });
    } else {
      if (this.ModuleViewTypeCode === 185) {
        if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList
          && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0) {
          this.PopUpType = 'app-commition';
          this.isClicked = true;
          this.HaveHeader = true;
          this.startLeftPosition = 9;
          this.startTopPosition = 10;
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
            ModuleViewTypeCode: this.ModuleViewTypeCode,
            CheckRegionWritable: this.CheckRegionWritable,
            currentRegionObject: this.currentRegionObject,
            IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
            OrginalModuleCode: this.OrginalModuleCode,
            ModuleCode: this.ModuleCode,
            IsAdmin: this.IsAdmin,
          };
        } else {
          this.ShowMessageBoxWithOkBtn('لطفا به درج متقاضیان اقدام نمایید.');
        }
      } else {
        this.PopUpType = 'app-commition';
        this.isClicked = true;
        this.HaveHeader = true;
        this.startLeftPosition = 9;
        this.startTopPosition = 10;
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
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          CheckRegionWritable: this.CheckRegionWritable,
          currentRegionObject: this.currentRegionObject,
          IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
          OrginalModuleCode: this.OrginalModuleCode,
          ModuleCode: this.ModuleCode,
          IsAdmin: this.IsAdmin,
        };
      }
    }
  }
  onShowLetterClick(InputLetterTypeCode = null) {
    if (this.CostFactorID && (this.LetterTypeCodeList[0] || InputLetterTypeCode)) {
      const CostFactorLetter = {
        CostFactorID: this.CostFactorID,
        LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCodeList[0]
      };
      this.Automation.ShowLetter(CostFactorLetter);
    }
  }
  onCreateNewLetter(InputLetterTypeCode = null) {
    this.isClicked = true;
    this.PopUpType = 'send-letter-page';
    this.HaveHeader = true;
    this.startLeftPosition = 500;
    this.startTopPosition = 80;
    this.MinHeightPixel = 300;
    this.PopupParam = {
      CostFactorID: this.CostFactorID,
      RegionCode: this.currentRegionObject.RegionCode,
      LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCodeList[0],
      OrganizationCode: this.currentRegionObject.OrganizationCode,
      AutoClose: true
    };
  }
  onDeleteLetterClick(InputLetterTypeCode = null) {
    const CostFactorLetter = {
      CostFactorID: this.CostFactorID,
      RegionCode: this.currentRegionObject.RegionCode,
      LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCodeList[0],
      OrganizationCode: this.currentRegionObject.OrganizationCode,
    };
    this.Automation.DeleteLetter(CostFactorLetter).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف نامه با موفقیت انجام شد');
      this.RegisterLetterNo = null;
      this.DocumentLetterNo = null;
      this.RegisterLetterDate = null;
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
        }
      });
  }
  onReceiveDocGridReady(params: { api: any; }) {
    this.ReceiveDocGridApi = params.api;
  }
  onArticle48GridReady(params: { api: any; }) {
    this.Article48GridApi = params.api;
  }
  onReceiveDocRowClick(event) {
    this.SelectedReceiveDocID = event.data.ReceiveDocID;
    if (event.data.ReceiveDocID) {
      this.ReceiveDocEnable = true;
    } else {
      this.ReceiveDocEnable = false;
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
        ModuleCode: this.OrginalModuleCode === 2824 && this.ModuleViewTypeCode === 500000 ? 2824 : this.ModuleCode,
        RegionCode: this.ProductRequestObject.RegionCode,
        OriginModuleViewTypeCode: this.ModuleViewTypeCode
      };
    }
  }
  onAutomationClick(InputLetterTypeCode = null) {
    if (!isUndefined(this.RegionParams.selectedObject) && this.CostFactorID) {
      let LetterTypeCodeList = [];
      InputLetterTypeCode ? LetterTypeCodeList.push(InputLetterTypeCode) : LetterTypeCodeList = this.LetterTypeCodeList;
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
        OrginalModuleCode: this.OrginalModuleCode,
        ReadOnlyMode: (this.ModuleViewTypeCode === 100000 ? true : false),
        SaveMode: (this.ModuleViewTypeCode === 100000 ? false : true),
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        ProductRequestDate: this.ProductRequestDate
      };
    }
  }
  OnContractLetterDateChange(ADate) {
    this.ContractLetterDate = ADate.MDate;
  }
  onbtnDocumentUpload() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    const archiveParam = {
      EntityID: this.CostFactorID,
      TypeCodeStr: this.ParentDocType + '-',
      DocTypeCode: this.ParentDocType,
      ModuleCode: this.ModuleCode,
      DocumentTypeCodeList: this.FilterDocumentTypeCodeList,
      OrginalModuleCode: this.OrginalModuleCode,
      RegionCode: this.ProductRequestObject.RegionCode
    };
    this.PopupParam = archiveParam;
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

        if (x.ProductTypeName === 'کالا') {
          x.ProductTypeName = 1;
        } else if (x.ProductTypeName === 'خدمت') {
          x.ProductTypeName = 2;
        }

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
            EntityList: element.EntityList,
          };
          // this.EntityColumnDefinition(null, null, element.EntityList, false);
          // let keys = Object.keys(ExcelObj);

          // if (element.EntityTypeItemList) {
          //   element.EntityTypeItemList.forEach(Entity => {
          //     let Name = 'Subject' + Entity.EntityTypeID.toString();
          //     let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
          //     let key = keys.find(x => x === Name);
          //     if (key) {
          //       // var Name = 'Subject' + EntityItem.EntityTypeID.toString();
          //       newItem[Name] = ExcelObj[Name];
          //       // newItem[ID] = ExcelObj[key] === Entity.Subject ? ;
          //       //  element[ID] = EntityItem.EntityTypeItemID;

          //       if (Entity.EISubject === ExcelObj[Name]) {
          //         newItem[ID] = Entity.EntityTypeItemID;
          //       }
          //     }
          //   });

          // }
          // data.splice(data.indexOf(ExcelObj), 1);
          // itemsToUpdate.push(newItem);
        });
        data.forEach(element => {
          MaxProp = MaxProp + 1;
          const newItem = {
            ItemNo: MaxProp,
            ProductTypeName: element.ProductTypeName,
            ProductCodeName: element.ProductCodeName,
            ProductID: element.ProductID,
            ScaleName: element.ScaleName,
            PersianStartDate: element.PersianStartDate.MDate,
            PersianEndDate: element.PersianEndDate.MDate,
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
  OnOpenNgSelect(type, IsFill = true, FillResolve = null) {
    switch (type) {
      case 'Region':
        // tslint:disable-next-line: max-line-length
        this.RegionList.GetRegionList(this.ModuleCode, this.ModuleCode === 2773 ? true : this.InputParam.ModuleCode === 2730 && (this.ModuleViewTypeCode === 400000 || this.ModuleViewTypeCode === 500000 || this.ModuleViewTypeCode === 800000) ? false : !this.CheckRegionWritable).subscribe(res => {
          this.RegionItems = res;
          if (IsFill) {
            this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
            this.OnOpenNgSelect('CostCenter');
            this.OnOpenNgSelect('VWExeUnit'); // RFC 51513
            this.RefreshPageByRegion(this.RegionParams.selectedObject);
          }
        });
        break;
      case 'VWExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
          this.VWExeUnitItems = res;
          if (res.length === 1) {
            this.VWExeUnitParams.selectedObject = this.VWExeUnitItems[0].UnitPatternID;
          } else {
            this.VWExeUnitParams.selectedObject = null;
          }
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'Contract':
        const CurrentRelatedContractID = this.ProductRequestObject && this.ProductRequestObject.RelatedContractID ?
          this.ProductRequestObject.RelatedContractID :
          this.ProductRequestObject && this.ProductRequestObject.ProvisionContractID ?
            this.ProductRequestObject.ProvisionContractID : null;
        this.ContractParams.loading = true;
        const ResultList = [];
        this.ContractList.GetRelatedContractpagingForExtended(1, 30, '', '', this.RegionParams.selectedObject,
          this.IsCost, true, CurrentRelatedContractID, this.ModuleCode === 2773)
          .subscribe((res: any) => {
            this.ContractItems = res.List;
            this.ContractTotalItemCount = res.TotalItemCount;
            this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ContractParams.loading = false;
            if (IsFill && FillResolve) {
              FillResolve();
            }
            if (IsFill && CurrentRelatedContractID) {
              this.ContractParams.selectedObject = CurrentRelatedContractID;
            }
          });
        break;
      case 'Rustee':
        const CurrRusteeCostCenterID = this.ProductRequestObject &&
          this.ProductRequestObject.ContractStackHolderObject &&
          this.ProductRequestObject.ContractStackHolderObject.CostCenterId ?
          this.ProductRequestObject.ContractStackHolderObject.CostCenterId : null;
        this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, CurrRusteeCostCenterID, null, false).subscribe(res => {
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
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'SubRustee':
        this.ProductRequest.GetSubCostCenter(this.RusteeParams.selectedObject, this.ModuleCode, true).subscribe(res => {
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
          this.ProductRequest.GetSubCostCenterPriPerson(this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject, this.ProductRequestObject && this.ProductRequestObject.ActorID && IsFill ? this.ProductRequestObject.ActorID :
            // tslint:disable-next-line: max-line-length
            (this.RelatedProductRequestObject && this.RelatedProductRequestObject.ActorID && IsFill ? this.RelatedProductRequestObject.ActorID : null), this.ModuleCode).subscribe(res => { // RFC 51513
              res.forEach(element => {
                element.FullPersonName = element.FirstName + ' ' + element.LastName;
              });
              this.RequestedPersonItems = res;
              if (IsFill && this.ProductRequestObject && this.ProductRequestObject.ActorID) { // RFC 52079
                this.RequestedPersonParams.selectedObject = this.ProductRequestObject.ActorID;
              } else if (IsFill && this.RelatedProductRequestObject && this.RelatedProductRequestObject.ActorID) { // RFC 51513
                this.RequestedPersonParams.selectedObject = this.CurentUser; // RFC = 53824
              } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.ActorID) {
                // tslint:disable-next-line: max-line-length
                if (this.currentModuleCode && (this.currentModuleCode !== 2824 && this.currentModuleCode !== 2793 && this.currentModuleCode !== 2939)) {
                  if (!this.ProductRequestObject || (this.ProductRequestObject && !this.ProductRequestObject.CostFactorID)) {
                    this.RequestedPersonParams.selectedObject = this.CurrentUserSubCostCenter.ActorID;
                  }
                }
                this.CurentUser = this.CurrentUserSubCostCenter.ActorID;
                //this.CurrentUserSubCostCenter = null; // RFC 63989 - باعث پر نشدن متولی می شد
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
          if (IsFill && CurrentCustomerOrderID) {
            this.CustomerOrderParams.selectedObject = this.ProductRequestObject.CustomerOrderID;
          }
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        this.CustomerOrderParams.loading = false;
        break;
      case 'CostCenter':
        const CurrCostCenterID = this.ProductRequestObject &&
          this.ProductRequestObject.SubCostCenterObject &&
          this.ProductRequestObject.SubCostCenterObject.CostCenterId ?
          this.ProductRequestObject.SubCostCenterObject.CostCenterId : null;
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetCostCenterByRegionAndRequestOwner(this.RegionParams.selectedObject, CurrCostCenterID, this.ModuleCode, false).subscribe(res => {
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
            // tslint:disable-next-line: max-line-length
            if (this.currentModuleCode && (this.currentModuleCode !== 2824 && this.currentModuleCode !== 2793 && this.currentModuleCode !== 2939)) {
              if (!this.ProductRequestObject || (this.ProductRequestObject && !this.ProductRequestObject.CostFactorID)) {
                this.CostCenterParams.selectedObject = this.CurrentUserSubCostCenter.CostCenterID;
              }
            }
            this.OnOpenNgSelect('SubCostCenter');
          }
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'SubCostCenter':
        if (this.CostCenterParams.selectedObject) {
          this.ProductRequest.GetListByCostCenterId(this.CostCenterParams.selectedObject, this.ModuleCode, true, this.RegionParams.selectedObject).subscribe(res => {
            this.SubCostCenterItems = res;
            if (IsFill &&
              this.ProductRequestObject &&
              this.ProductRequestObject.SubCostCenterObject &&
              this.ProductRequestObject.SubCostCenterObject.SubCostCenterId) {
              this.SubCostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.SubCostCenterId;
            } else if (IsFill &&
              this.RelatedProductRequestObject &&
              this.RelatedProductRequestObject.SubCostCenterObject &&
              this.RelatedProductRequestObject.SubCostCenterObject.SubCostCenterId) {
              this.SubCostCenterParams.selectedObject = this.RelatedProductRequestObject.SubCostCenterObject.SubCostCenterId;
            } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.SubCostCenterID) {
              // tslint:disable-next-line: max-line-length
              if (this.currentModuleCode && (this.currentModuleCode !== 2824 && this.currentModuleCode !== 2793 && this.currentModuleCode !== 2939)) {
                if (!this.ProductRequestObject || (this.ProductRequestObject && !this.ProductRequestObject.CostFactorID)) {
                  this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
                }
              }
            }
            if (IsFill && this.RequestPersonObject && this.RequestPersonObject.SubCostCenterID) {
              this.SubCostCenterParams.selectedObject = this.RequestPersonObject.SubCostCenterID;
            } else {
              this.OnOpenNgSelect('RequestedPerson');
            }
          });
        }
        break;
      case 'FilterRegion':
        this.ProductRequest.GetOnfilterRegion().subscribe(res => {
          this.OnFilterRegionItems = res;
          // if (IsFill &&
          //   this.ProductRequestObject &&
          //   !isUndefined(this.ProductRequestObject.WorkPlaceCode)) {
          //   if (this.ProductRequestObject.WorkPlaceCode || this.ProductRequestObject.WorkPlaceCode === 0) {
          //     this.OnFilterRegionParams.selectedObject = this.ProductRequestObject.WorkPlaceCode;
          //     this.OnOpenNgSelect('District');
          //   }
          // }
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
        break;
      case 'DistrictDirection':
        if (this.OnFilterRegionParams.selectedObject && this.RegionAreaParams.selectedObject) {
          this.ProductRequest.GetDistrictDirectionList().subscribe(
            res => {
              this.DistrictDirectionItems = res;
              if (IsFill && this.RelatedProductRequestObject && this.RelatedProductRequestObject.DistrictDirectionCode) {
                this.DistrictDirectionParams.selectedObject = this.RelatedProductRequestObject.DistrictDirectionCode;
              }
            }
          );
        }
        break;
      case 'ActLocation':
        this.ProductRequest.GetActLocationByRegionCode(this.RegionParams.selectedObject).subscribe(
          res => {
            this.ActLocationItems = res;
            // if (IsFill && this.ProductRequestObject && this.ProductRequestObject.ActLocationID) {
            //   this.ActLocationParams.selectedObject = this.ProductRequestObject.ActLocationID;
            // }
            if (IsFill && FillResolve) {
              FillResolve();
            }
          }
        );
        break;
      case 'RegionArea':
        if (this.OnFilterRegionParams.selectedObject) {
          this.ProductRequest.GetRegionAreaList(this.OnFilterRegionParams.selectedObject).subscribe(res => {
            this.RegionAreaItems = res;
            if (IsFill &&
              this.RelatedProductRequestObject &&
              this.RelatedProductRequestObject.RegionAreaID) {
              this.RegionAreaParams.selectedObject = this.RelatedProductRequestObject.RegionAreaID;
              this.OnOpenNgSelect('RegionAreaDistrict');
            }
          }
          );
        }
        break;
      case 'RegionAreaDistrict':
        if (this.OnFilterRegionParams.selectedObject && this.RegionAreaParams.selectedObject) {
          this.ProductRequest.GetRegionAreaDistrictList(this.RegionAreaParams.selectedObject).subscribe(res => {
            this.RegionAreaDistrictItems = res;
            if (IsFill && this.RelatedProductRequestObject && this.RelatedProductRequestObject.RegionAreaDistrictID) {
              this.RegionAreaDistrictParams.selectedObject = this.RelatedProductRequestObject.RegionAreaDistrictID;
            }
          }
          );
        }
        break;
      case 'PriceListTopicRaste':
        {
          if (this.PRTypeParams && this.PRTypeParams.selectedObject > 0) {
            if (this.PRTypeParams.selectedObject === 2) {
              this.Actor.GetPriceListTopicByBusinesPatternID(5183, false).subscribe(res => {
                this.PriceListTopicRasteItems = res;
                if (IsFill) {
                  this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
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
  onCreateContract() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
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
          Subject: this.Subject,
          RequestPerson: this.RequestedPersonParams.selectedObject,
          ProductRequestCode: this.ProductRequestNo,
          IsCost: this.IsCost,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          OrginalModuleCode: this.OrginalModuleCode,
          IsAdmin: this.IsAdmin,
          RegionCode: this.RegionParams.selectedObject,
          IsNew: this.IsNew,
          SumFinalAmountStr: this.SumFinalAmountStr
        };
      });
    } else {
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
        Subject: this.Subject,
        RequestPerson: this.RequestedPersonParams.selectedObject,
        ProductRequestCode: this.ProductRequestNo,
        IsCost: this.IsCost,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        OrginalModuleCode: this.OrginalModuleCode,
        IsAdmin: this.IsAdmin,
        RegionCode: this.RegionParams.selectedObject,
        IsNew: this.IsNew,
        SumFinalAmountStr: this.SumFinalAmountStr
      };
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
  IsRenewalRadioClick(IsRenewal) {
    this.IsRenewal = IsRenewal;
  }
  SetProductRequestRenewal() {
    this.ProductRequest.SetProductRequestRenewal(this.CostFactorID, this.IsRenewal,).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت وضعیت تجدید درخواست با موفقیت انجام شد');
      // RFC  52790
      // if (this.IsRenewal) {
      //  // this.onUnConfirmAndReturn(); // به درخواست خانم قربانزاده
      // }
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت وضعیت تجدید درخواست با خطا مواجه شد');
        }
      });
  }
  SetProductRequestRenewal187() {
    this.ProductRequest.SetProductRequestRenewal187(this.CostFactorID, this.IsRenewal).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت وضعیت تجدید درخواست با موفقیت انجام شد');

    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت وضعیت تجدید درخواست با خطا مواجه شد');
        }
      });
  }
  SaveProductRequestFromContractProvisionRemainPage() {
    const ProductRequest = {
      ContractStackHolderID: this.SubRusteeParams.selectedObject,
      SubCostCenterID: this.SubCostCenterParams.selectedObject,
      ActorID: this.RequestedPersonParams.selectedObject,
      CostFactorID: this.CostFactorID
    };

    this.ProductRequest.SaveProductRequestFromContractProvisionRemainPage(ProductRequest, this.ModuleCode)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
  }
  SetInquiryIsReturn() {
    this.ProductRequest.SetInquiryIsReturn(this.ProductRequestObject.LastInquiryObject.InquiryID, !this.IsLawful, this.ModuleCode)
      .subscribe(res => {
        this.ProductRequestObject.LastInquiryObject.IsReturn = !this.IsLawful;
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
  }
  onChangePercentage(event) {
    this.IsEntryPercentageOfChanges = true;
    event = event ? event : 0;
    this.PercentageOfChanges = parseFloat(event);
    this.SetAmountByPercentage();
  }
  onChangePercentageLevel(event) {
    this.IsEntryPercentageLevelOfChanges = true;
    event = event ? event : 0;
    this.PercentageLevelOfChanges = parseFloat(event);
    this.SetAmountByPercentageLevel();
  }
  SetAmountByPercentage() {
    const FirstContractOrderList = [];
    this.contractpaydetail.GetFirstContractOrder(this.ContractParams.selectedObject).subscribe(res => {
      res.forEach(item => {
        const FirstContractOrderObj = {
          Amount: (item.Amount * this.PercentageOfChanges) / 100 + item.Amount,
          ProductID: item.ProductID,
          Qty: (item.Qty * this.PercentageOfChanges) / 100 + item.Qty,
        };
        FirstContractOrderList.push(FirstContractOrderObj);
      });
      if (this.gridApi) {
        const itemsToUpdate = [];
        FirstContractOrderList.forEach(item => {
          this.gridApi.forEachNode(node => {
            if (node.data.ProductID === item.ProductID) {
              if (item.Qty === null || item.Qty === 0) {
                node.data.Amount = item.Amount;
                node.data.FinalAmount = item.Amount;
              } else {
                node.data.Qty = item.Qty;
                node.data.FinalAmount = node.data.Amount * item.Qty;
              }
              itemsToUpdate.push(node.data);
            }
          });
          // this.gridApi.updateRowData({ update: itemsToUpdate });
          this.rowsData = itemsToUpdate;
        });
      }
    });
  }
  SetAmountByPercentageLevel() {
    const BeforeLastContractOrderList = [];
    this.contractpaydetail.GetBeforeLastContractOrder(this.ContractParams.selectedObject).subscribe(res => {
      res.forEach(item => {
        const BeforeLastContractOrderObj = {
          Amount: (item.Amount * this.PercentageLevelOfChanges) / 100 + item.Amount,
          ProductID: item.ProductID,
          Qty: (item.Qty * this.PercentageLevelOfChanges) / 100 + item.Qty,
        };
        BeforeLastContractOrderList.push(BeforeLastContractOrderObj);
      });
      if (this.gridApi) {
        const itemsToUpdate = [];
        BeforeLastContractOrderList.forEach(item => {
          this.gridApi.forEachNode(node => {
            if (node.data.ProductID === item.ProductID) {
              if (item.Qty === null || item.Qty === 0) {
                node.data.Amount = item.Amount;
                node.data.FinalAmount = item.Amount;
              } else {
                node.data.Qty = item.Qty;
                node.data.FinalAmount = node.data.Amount * item.Qty;
              }
              itemsToUpdate.push(node.data);
            }
          });
          // this.gridApi.updateRowData({ update: itemsToUpdate });
          this.rowsData = itemsToUpdate;
        });
      }
    });
  }
  onCellValueChanged(event) {
    this.IsEntryPercentageOfChanges = false;
    this.IsEntryPercentageLevelOfChanges = false;
    if (event.colDef && event.colDef.field === 'PersianEndDate' && (event.newValue !== event.oldValue)) { // RFC 51373
      if (this.ContractParams.selectedObject && !this.IsNew) {
        let ItemNo = 0;
        const CurrProductRequestItemList = [];
        this.gridApi.stopEditing();
        this.gridApi.forEachNode(node => {
          const ProductRequestItemObj = {
            ProductRequestItemID: node.data.ProductRequestItemID ? node.data.ProductRequestItemID : -1,
            CostFactorID: -1,
            ItemNo: ++ItemNo,
            QTY: parseFloat(node.data.QTY),
            Subject: node.data.Subject,
            //         // tslint:disable-next-line:radix
            Amount: parseFloat(node.data.Amount),
            // tslint:disable-next-line:max-line-length
            ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
            //         // tslint:disable-next-line:max-line-length
            StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
            //         // tslint:disable-next-line:max-line-length
            EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
          };
          CurrProductRequestItemList.push(ProductRequestItemObj);
        });
        // tslint:disable-next-line: max-line-length
        this.contractpaydetail.GetContractTimeExtension(this.ContractParams.selectedObject, CurrProductRequestItemList, this.CostFactorID ? this.CostFactorID : null).subscribe((res: any) => {
          this.TimeExtensionYear = res.Year;
          this.TimeExtensionMonth = res.Month;
          this.TimeExtensionDay = res.Day;
        });
      }
    }

  }
  onChangeExpert(event) {
    if (this.btnConfirmName !== 'عدم تایید') { }
    this.IsExpertSelected = true;
  }
  onFirstSupervisorOpen(type = 0) {
    this.ExpertItems = this.RequestedPersonItems;
    if (type === 1 && this.ProductRequestObject && this.ProductRequestObject.RequestPersonList) {
      const FirstPerson = this.ProductRequestObject.RequestPersonList.filter(x => x.RoleID === 974);
      if (FirstPerson.length > 0) {
        this.ExpertParams.selectedObject = FirstPerson[0].ActorID;
      }
    }

  }
  onSecondSupervisorOpen(type = 0) {
    this.SupervisorItems = this.RequestedPersonItems;
    if (type === 1 && this.ProductRequestObject && this.ProductRequestObject.RequestPersonList) {
      const SecondPerson = this.ProductRequestObject.RequestPersonList.filter(x => x.RoleID === 975);
      if (SecondPerson.length > 0) {
        this.SupervisorParams.selectedObject = SecondPerson[0].ActorID;
      }
    }
  }
  onSaveDepSpeciall() {
    const SupervisorList = [];
    if (this.CostFactorID) {
      if (this.ExpertParams.selectedObject) {
        const FirstSupervisorObj = {
          ActorID: this.ExpertParams.selectedObject,
          CostFactorID: this.CostFactorID,
          RoleID: 1052
        };
        SupervisorList.push(FirstSupervisorObj);
        this.ProductRequest.SaveSupervisorPerson(SupervisorList, this.ModuleCode).subscribe(x => {
          this.IsExpertSelected = false;
          this.ShowMessageBoxWithOkBtn('ذخیره معاونت تخصصی ستاد با موفقیت انجام شد');
        });
      } else {
        this.ShowMessageBoxWithOkBtn('ابتدا معاونت تخصصی ستاد را انتخاب نمایید');
      }
    }
  }
  onSaveSupervisorPerson() {
    const SupervisorList = [];
    if (this.CostFactorID) {

      if (this.ExpertParams.selectedObject) {
        const FirstSupervisorObj = {
          ActorID: this.ExpertParams.selectedObject,
          CostFactorID: this.CostFactorID,
          RoleID: 974
        };
        SupervisorList.push(FirstSupervisorObj);
      } else {
        const FirstSupervisorObj = {
          ActorID: 0,
          CostFactorID: this.CostFactorID,
          RoleID: 974
        };
        SupervisorList.push(FirstSupervisorObj);
      }

      if (this.SupervisorParams.selectedObject) {
        const SecondSupervisorObj = {
          ActorID: this.SupervisorParams.selectedObject,
          CostFactorID: this.CostFactorID,
          RoleID: 975
        };
        SupervisorList.push(SecondSupervisorObj);
      } else {
        const SecondSupervisorObj = {
          ActorID: 0,
          CostFactorID: this.CostFactorID,
          RoleID: 975
        };
        SupervisorList.push(SecondSupervisorObj);
      }

      if (SupervisorList && SupervisorList.length > 0) {
        this.ProductRequest.SaveSupervisorPerson(SupervisorList, this.ModuleCode).subscribe(x => {
          this.IsExpertSelected = false;
          this.ShowMessageBoxWithOkBtn('ذخیره ناظر ها با موفقیت انجام شد');
        });
      } else {
        this.ShowMessageBoxWithOkBtn('ابتدا  ناظر ها را انتخاب نمایید');
      }
    }
  }
  UpdatePRIsConfirmOrderDraft() {
    this.ProductRequest.UpdatePRIsConfirmOrderDraft(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    });
  }
  UpdatePRIsConfirmContractor() {
    this.ProductRequest.UpdatePRIsConfirmContractor(this.CostFactorID, this.IsLawful).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('تایید اعتبار پیمانکار با موفقیت انجام شد');
    });
  }
  onShowContractorDetailsClick() {
    if (this.ProductRequestObject
      && this.ProductRequestObject.RequestSupplierList
      && this.ProductRequestObject.RequestSupplierList.length > 0) {
      if (this.ProductRequestObject.RequestSupplierList[0].PersonTypeCode === 1) {
        this.PopUpType = 'person2';
        this.isClicked = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = 15;
        this.PercentWidth = 97;
        this.startTopPosition = 5;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.PopupParam = {
          ActorId: this.ProductRequestObject.RequestSupplierList[0].ActorID,
          ObjectID: this.ProductRequestObject.RequestSupplierList[0].ActorID,
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
          ModuleViewTypeCode: 300000,
          HeaderName: 'تامین کننده حقوقی',
        };
      }
      // tslint:disable-next-line: max-line-length
      // this.ProductRequest.FindContractorGUIDBySupplierID(this.ProductRequestObject.RequestSupplierList[0].RequestSupplierID).subscribe(res => {
      //   window.open('http://contracts.tehran.iri/DesktopModules/Contract/Controls/Contractors/ContractorInfo/?Param=' + res, '_blank');
      // });
    } else {
      this.ShowMessageBoxWithOkBtn('طرف قرارداد درج نشده است');
    }
  }
  onSave106() {
    const ProductRequest = {
      CostFactorID: this.ProductRequestObject.CostFactorID,
      Subject: this.Subject,
      BriefingReport: this.BriefingReport,
      HaveMutualContract: this.HaveMutualContract,
      IsSecret: this.IsSecret,
      MutualContractStatus: this.MutualContractStatus
    };
    const ProductRequestItemList = [];
    this.gridApi.stopEditing();
    this.gridApi.forEachNode(node => {
      const ProductRequestItemObj = {
        ProductRequestItemID: node.data.ProductRequestItemID,
        CostFactorID: this.CostFactorID,
        ItemNo: node.data.ItemNo,
        // tslint:disable-next-line:max-line-length
        StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
        // tslint:disable-next-line:max-line-length
        EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
      };
      ProductRequestItemList.push(ProductRequestItemObj);
    });
    // tslint:disable-next-line:max-line-length
    this.ProductRequest.UpdateProductRequestType106(ProductRequest, ProductRequestItemList, this.ModuleCode, this.ModuleViewTypeCode).subscribe(x => { // RFC 52370
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    });
  }
  UpdatePRType107() {
    const ProductRequestItemList = [];
    this.gridApi.stopEditing();
    this.gridApi.forEachNode(node => {
      const ProductRequestItemObj = {
        ProductRequestItemID: node.data.ProductRequestItemID,
        CostFactorID: this.CostFactorID,
        ItemNo: node.data.ItemNo,
        Amount: parseFloat(node.data.Amount),
        QTY: parseFloat(node.data.QTY),
      };
      ProductRequestItemList.push(ProductRequestItemObj);
    });
    // tslint:disable-next-line:max-line-length
    this.ProductRequest.UpdatePRType107(this.CostFactorID, ProductRequestItemList,
      this.ModuleCode, this.IsLawful, this.IsSumEditableType107).subscribe(x => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
    this.ngOnInit();
  }
  PRProvisionRepShow() {
    this.PopUpType = 'global-choose-page';
    this.PopUpName = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.MainMaxwidthPixel = null;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.OverMainMinwidthPixel = null;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.isClicked = true;
    this.PopupParam = {
      HeaderName: 'انتخاب نوع فایل',
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      ModuleCode: this.ModuleCode,
      RadioItems: [
        {
          title: 'چاپ درخواست معامله',
          type: 2
        },
        {
          title: 'چاپ درخواست معامله - تامین اعتبار',
          type: 3
        },
      ]
    };
  }
  PrintPR() {
    if ((this.ModuleCode === 2730 && (this.ModuleViewTypeCode === 38 || this.ModuleViewTypeCode === 300000))
      || (this.ModuleCode === 2996 && this.ModuleViewTypeCode === 88888)) { // RFC 61879
      this.ComonService.GetAllArchiveDetailList(this.CostFactorID, 1107, true, false).subscribe(res => {
        if (res) {
          this.ExistsFile = true;
          this.BtnClickedName = 'TrafficRep';
          this.ShowMessageBoxWithYesNoBtn('فایل قبلا ذخیره شده است. آیا مایل به مشاهده آن هستید؟');
        } else {
          this.ExistsFile = false;
          this.IsDown = false;
          this.ProductRequest.GetMinutesReportPDFContent(
            -1,
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.RegionCode,
            1107,
            this.HaseEstimate,
            false,
            this.ModuleViewTypeCode,
            this.ModuleCode).subscribe(PDFRes => {
              if (PDFRes) {
                this.IsDown = true;
                this.PopUpType = 'pdf-viewer';
                this.HaveHeader = true;
                this.isClicked = true;
                this.startLeftPosition = 40;
                this.startTopPosition = 0;
                this.HaveMaxBtn = false;
                this.OverMainMinwidthPixel = 1295;
                this.MainMaxwidthPixel = 1300;
                this.PopupParam = {
                  HeaderName: 'چاپ درخواست معامله',
                  PDFSrc: PDFRes.FileBase64,
                  FileName: PDFRes.FileName,
                  OrderCommitionID: -1,
                  HaveEstimate: false,
                  HaveSign: false,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  RegionCode: this.ProductRequestObject.RegionCode,
                  PDFSignersInfo: PDFRes.PDFSignersInfo,
                  HasTripleReport: this.HaseEstimate,
                  IsFinal: false,
                  IsArticle18: false,
                  HasDelBtn: false,
                  IsTrafficRep: true,
                  IsAdequacy: false,
                  IsDisArticle18: false
                };
              } else {
                this.IsDown = true;
                this.ShowMessageBoxWithOkBtn('فایل بارگزاری نشده است.');
              }
            });
        }
      });
    } else {
      this.Report.PRProvisionRep(this.ProductRequestObject.RegionCode, this.CostFactorID,
        this.ModuleCode,
        'پیشنهاد تامین اعتبار', this.ShowTrafficSign
      );
    }
  }
  PrintPRAndProvision() {
    this.ComonService.GetAllArchiveDetailList(this.CostFactorID, 1249, true, false).subscribe(res => {
      if (res) {
        this.IsDown = true;
        this.PopUpType = 'pdf-viewer';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 0;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = 1295;
        this.MainMaxwidthPixel = 1300;
        this.PopupParam = {
          HeaderName: 'چاپ درخواست معامله',
          PDFSrc: res.FileBase64,
          FileName: res.FileName,
          OrderCommitionID: -1,
          HaveEstimate: false,
          HaveSign: false,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RegionCode: this.ProductRequestObject.RegionCode,
          PDFSignersInfo: res.PDFSignersInfo,
          HasTripleReport: this.HaseEstimate,
          IsFinal: false,
          IsArticle18: false,
          HasDelBtn: false,
          IsTrafficRep: true,
          IsAdequacy: false
        };
      } else {
        this.Report.ProductRequestProvisionReport(
          this.CostFactorID,
          this.ModuleViewTypeCode,
          this.ModuleCode,
          (this.btnConfirmIcon === 'cancel' ? 0 : 1),
          this.ProductRequestObject.RegionCode,
          'چاپ درخواست معامله - تامین اعتبار',
        );
      }
    });
  }

  HoldOnlineClick(param) {
    this.ProductRequestIsOnline = param;
  }
  onSaveProdReqIsOnline() {
    this.ProductRequest.SaveProdReqIsOnline(this.CostFactorID, this.ProductRequestIsOnline).subscribe((res: any) => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }
  OnCheckBoxChange(event) {
    this.IsContractContent = event;
  }
  ContractContentView() {
    if ((this.ModuleViewTypeCode === 114 || this.ModuleViewTypeCode === 89) && !this.CheckRegionWritable) {
      if (!this.IsNew) {
        this.gridHeight = (this.ModuleViewTypeCode === 89) ? 33 : 41;
        this.tabpanelHeight = 84;
        this.PRIgridHeight = 83;
        this.WfDetailsShowHeight = 40;
        this.WfDetailsShow = (this.ModuleViewTypeCode === 114) ? false : true;
        this.IsShowContractContent = true;
      } else {
        if (this.ModuleViewTypeCode === 114) {
          this.gridHeight = 41;
          this.tabpanelHeight = 87;
          this.PRIgridHeight = 85;
        } else {
          this.gridHeight = 33;
        }
        this.WfDetailsShowHeight = 60;
        this.WfDetailsShow = false;
        this.IsShowContractContent = false;
        this.IsContractContent = null;
        this.ContractContentNote = null;


      }
    }
  }
  SaveCommitionSubject() { // RFC 52131
    // tslint:disable-next-line: max-line-length
    this.ProductRequestItemID = this.ProductRequestObject.ProductRequestItemList && this.ProductRequestObject.ProductRequestItemList.length > 0 ? this.ProductRequestObject.ProductRequestItemList[0].ProductRequestItemID : -1;
    this.ProductRequest.SaveCommitionSubject(this.CostFactorID,
      this.ProductRequestItemID).subscribe(x => {
        this.ShowMessageBoxWithOkBtn('اصلاح موضوع  صورت جلسه کمیسیون با موفقیت انجام شد');
      });
  }
  onShowContractorClick() { // LocalProvider
    if (!this.ProductRequestObject
      || !this.ProductRequestObject.RequestSupplierList
      || !(this.ProductRequestObject.RequestSupplierList.length > 0)) {
      return;
    }

    if (this.ProductRequestObject.RequestSupplierList[0].PersonaActorType === 1) {
      this.PopUpType = 'person2'
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 100;
      this.OverMainMinwidthPixel = 1300;

    } else {
      this.PopUpType = 'corporate2'
      this.startLeftPosition = 30;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 100; //  مقذار دهی در html
      this.OverMainMinwidthPixel = 1297; //  مقذار دهی در html
    }
    this.isClicked = true;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 645;
    this.PopupParam = {
      IdentityNo: this.ProductRequestObject.RequestSupplierList[0].IdentityNo, // مقدار شناسه ملی در بک اند ست گردد
      ModuleViewTypeCode: 100000
    };
  }
  InsertSupplierIntoPropsal() {
    if ((this.ProductRequestObject.DealMethodCode === 4 ||
      this.ProductRequestObject.DealMethodCode === 9 ||
      this.ProductRequestObject.DealMethodCode === 7 ||
      this.ProductRequestObject.DealMethodCode === 8) &&
      (!this.ProductRequestObject.OrdersObject ||
        this.ProductRequestObject.OrdersObject.CostFactorID <= 0)) {
      this.ProductRequest.InsertSupplierIntoPropsal(this.ProductRequestObject.CostFactorID).subscribe();
    }
  }
  InsertSupplierIntoPropsal222() {
    if ((this.ProductRequestObject.RegionCode === 222 &&
      this.ProductRequestObject.DealMethodCode === 11 &&
      this.ProductRequestObject.ConsultantSelectTypeCode === 3) &&
      (!this.ProductRequestObject.OrdersObject ||
        this.ProductRequestObject.OrdersObject.CostFactorID <= 0)) {
      this.ProductRequest.InsertSupplierIntoPropsal222(this.ProductRequestObject.CostFactorID).subscribe();
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
  RowClick(event) {
    this.selectedrow = event;
    this.selectedProductID = event.data.ProductID;

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
  IsReturnRadioClick(event) {
    this.IsReturn = event;
  }
  ShowModuleTypeName() {
    if (this.ProductRequestObject && this.ProductRequestObject.DealMethodCode
      && (this.ModuleViewTypeCode === 100000 ||
        this.ModuleViewTypeCode === 200000 ||
        this.ModuleViewTypeCode === 300000 ||
        this.ModuleViewTypeCode === 400000 ||
        this.ModuleViewTypeCode === 500000)) {
      switch (this.ProductRequestObject.DealMethodCode) {
        case 1:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'مناقصه عمومی';
              this.VirtualGroupModuleTypeDisplay = true;
              this.HaveCommition = false;
              this.HaveInquiry = false;
            }
          }
          break;
        case 2:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'مناقصه محدود';
              this.VirtualGroupModuleTypeDisplay = true;
              this.HaveCommition = false;
            }
          }
          break;
        case 3:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'استعلام';
              this.VirtualGroupModuleTypeDisplay = true;
              this.HaveCommition = false;
            }
          }
          break;
        case 4:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'ترک تشریفات';
              this.VirtualGroupModuleTypeDisplay = true;
              this.HaveCommition = false;
            }
          }
          break;
        case 5:
          {
            this.VirtualGroupModuleTypeName = 'مزایده';
            this.VirtualGroupModuleTypeDisplay = true;
            this.HaveInquiry = false;
          }
          break;
        case 6:
          {
            this.VirtualGroupModuleTypeName = 'حراج';
            this.VirtualGroupModuleTypeDisplay = true;
            this.HaveInquiry = false;
            this.HaveCommition = false;
          }
          break;
        case 7:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'بدون تشریفات';
              this.VirtualGroupModuleTypeDisplay = true;
              this.HaveCommition = false;
            }
          }
          break;
        case 18:
          {
            if (this.IsNew) {
              this.VirtualGroupModuleTypeName = 'متمم';
              this.VirtualGroupModuleTypeDisplay = true;
              this.HaveCommition = false;
            }
          }
          break;
        default:
          this.VirtualGroupModuleTypeName = '';
          this.VirtualGroupModuleTypeDisplay = false;
          break;
      }
    }
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
            {
              this.PopUpType = 'global-choose-page';
              this.HaveHeader = true;
              this.HaveMaxBtn = false;
              this.startLeftPosition = 520;
              this.startTopPosition = 220;
              this.OverMainMinwidthPixel = null;
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
            }
            break;
          case 2:
            {
              this.PopUpType = 'global-choose-page';
              this.HaveHeader = true;
              this.HaveMaxBtn = false;
              this.startLeftPosition = 520;
              this.startTopPosition = 220;
              this.OverMainMinwidthPixel = null;
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
            }
            break;
          case 3:
            {
              this.PopUpType = 'global-choose-page';
              this.HaveHeader = true;
              this.HaveMaxBtn = false;
              this.startLeftPosition = 520;
              this.startTopPosition = 220;
              this.OverMainMinwidthPixel = null;
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
            }
            break;
          case 4:
          case 7:
          case 18:
            {
              this.PopUpType = 'global-choose-page';
              this.HaveHeader = true;
              this.HaveMaxBtn = false;
              this.startLeftPosition = 520;
              this.startTopPosition = 220;
              this.OverMainMinwidthPixel = null;
              this.HeightPercentWithMaxBtn = null;
              this.MinHeightPixel = null;
              this.isClicked = true;
              this.PopupParam = {
                HeaderName: DealMethodCode === 4 ? 'ترک تشریفات' : (DealMethodCode === 7 ? 'بدون تشریفات' : 'متمم'),
                RadioItems: [
                  {
                    title: 'برگزاري کميسيون و تنظيم پيش نويس صورتجلسه و انتخاب کارشناس قرارداد ها',
                    type: 11,
                    IsDisable: false,
                  }
                ]
              };
            }
            break;
          case 5:
            {
              this.PopUpType = 'global-choose-page';
              this.HaveHeader = true;
              this.HaveMaxBtn = false;
              this.startLeftPosition = 520;
              this.startTopPosition = 220;
              this.OverMainMinwidthPixel = null;
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
            }
            break;
          case 6:
            {
              this.PopUpType = 'global-choose-page';
              this.HaveHeader = true;
              this.HaveMaxBtn = false;
              this.startLeftPosition = 520;
              this.startTopPosition = 220;
              this.OverMainMinwidthPixel = null;
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
            }
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
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        switch (VirtualModuleViewType) {
          // کمیسیون
          case 11:
          case 155:
          case 47:
          case 68:
          case 107:
          case 113:
          case 185:
          case 149:
          case 160:
          case 162:
          case 166:
          case 169:
          case 182:
            this.PopUpType = 'app-commition';
            this.isClicked = true;
            this.HaveHeader = true;
            this.startLeftPosition = 9;
            this.startTopPosition = 10;
            this.OverMainMinwidthPixel = 1340;
            this.HaveMaxBtn = false;
            this.PopupParam = {
              ProductRequestObject: this.ProductRequestObject,
              Subject: this.Subject,
              RegionCode: this.RegionParams.selectedObject,
              ProductRequestNo: this.ProductRequestNo,
              ProductRequestDate: this.ProductRequestDate,
              CostFactorID: this.CostFactorID,
              IsReadOnly: !this.IsEditable,
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
          case 142:
          case 82:
          case 164:
          case 188:
            if ((this.OrginalModuleCode == 2793 || this.OrginalModuleCode == 2824 || this.OrginalModuleCode == 2838 || this.OrginalModuleCode == 2756) &&
              (VirtualModuleViewType == 70 || VirtualModuleViewType == 42)) {
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
                IsReadOnly: !this.IsEditable,
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
            } else {
              this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => { // RFC 55833
                this.ProductRequestObject = res;
                // tslint:disable-next-line: max-line-length
                const LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                  this.ProductRequestObject.LastInquiryObject : null;
                if ((!LastInquiryObject || (LastInquiryObject && !LastInquiryObject.IsWin && !LastInquiryObject.IsReturn)) ||
                  (this.OrginalModuleCode === 2793 || this.OrginalModuleCode === 2756 ||
                    this.OrginalModuleCode === 2838 || this.OrginalModuleCode === 2824)) {
                  this.PopUpType = 'general-tender';
                  this.isClicked = true;
                  this.OverMainMinwidthPixel = null;
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
                    IsReadOnly: !this.IsEditable,
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
            }
            break;
          case 23:
          case 27:
          case 38:
          case 57:
          case 158: // RFC 59100
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
              IsReadOnly: !this.IsEditable,
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
          default:
            break;
        }
      });
    } else {
      switch (VirtualModuleViewType) {
        // کمیسیون
        case 11:
        case 155:
        case 47:
        case 68:
        case 107:
        case 113:
        case 185:
        case 149:
        case 160:
        case 162:
        case 166:
        case 169:
        case 182:
          this.PopUpType = 'app-commition';
          this.isClicked = true;
          this.HaveHeader = true;
          this.startLeftPosition = 9;
          this.startTopPosition = 10;
          this.OverMainMinwidthPixel = 1340;
          this.HaveMaxBtn = false;
          this.PopupParam = {
            ProductRequestObject: this.ProductRequestObject,
            Subject: this.Subject,
            RegionCode: this.RegionParams.selectedObject,
            ProductRequestNo: this.ProductRequestNo,
            ProductRequestDate: this.ProductRequestDate,
            CostFactorID: this.CostFactorID,
            IsReadOnly: !this.IsEditable,
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
        case 142:
        case 82:
        case 164:
        case 188:
          if ((this.OrginalModuleCode == 2793 || this.OrginalModuleCode == 2824 || this.OrginalModuleCode == 2838 || this.OrginalModuleCode == 2756) &&
            (VirtualModuleViewType == 70 || VirtualModuleViewType == 42)) {
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
              IsReadOnly: !this.IsEditable,
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
          } else {
            this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => { // RFC 55833
              this.ProductRequestObject = res;
              // tslint:disable-next-line: max-line-length
              const LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
                this.ProductRequestObject.LastInquiryObject : null;
              if ((!LastInquiryObject || (LastInquiryObject && !LastInquiryObject.IsWin && !LastInquiryObject.IsReturn)) ||
                (this.OrginalModuleCode === 2793 || this.OrginalModuleCode === 2756 ||
                  this.OrginalModuleCode === 2838 || this.OrginalModuleCode === 2824)) {
                this.PopUpType = 'general-tender';
                this.isClicked = true;
                this.OverMainMinwidthPixel = null;
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
                  IsReadOnly: !this.IsEditable,
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
          }
          break;
        case 23:
        case 27:
        case 38:
        case 57:
        case 158: // RFC 59100
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
            IsReadOnly: !this.IsEditable,
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
        default:
          break;
      }
    }
  }
  onSendLetter() {
    this.PopUpType = 'send-automation-letter';
    this.isClicked = true;
    this.HaveHeader = true;
    this.PercentWidth = 70;
    this.startLeftPosition = 210;
    this.startTopPosition = 20;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      CostFactorID: this.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      LetterTypeCode: 2 // Temporary Type
    };
  }
  FinalMinuteDigitalSign() {
    if (this.ProductRequestObject &&
      this.ProductRequestObject.LastInquiryObject &&
      this.ProductRequestObject.LastInquiryObject.OrderCommitionObject) {
      this.IsDown = false;
      this.ProductRequest.GetMinutesReportPDFContent(
        this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID,
        this.ProductRequestObject.CostFactorID,
        this.ProductRequestObject.RegionCode,
        661,
        this.HaseEstimate,
        false,
        this.ModuleViewTypeCode).subscribe(PDFRes => {
          if (PDFRes) {
            this.IsDown = true;
            this.PopUpType = 'pdf-viewer';
            this.HaveHeader = true;
            this.isClicked = true;
            this.startLeftPosition = 40;
            this.startTopPosition = 0;
            this.HaveMaxBtn = false;
            this.OverMainMinwidthPixel = 1295;
            this.MainMaxwidthPixel = 1300;
            this.MinHeightPixel = 650;
            this.PopupParam = {
              HeaderName: 'فایل صورتجلسه کمیسیون',
              PDFSrc: PDFRes.FileBase64,
              FileName: PDFRes.FileName,
              OrderCommitionID: this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID,
              HaveEstimate: false,
              HaveSign: true,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              RegionCode: this.ProductRequestObject.RegionCode,
              PDFSignersInfo: PDFRes.PDFSignersInfo,
              HasTripleReport: this.HaseEstimate,
              IsFinal: true, // نهایی
              HasDelBtn: false,
              IsArticle18: false,
              IsAdequacy: false,
              IsDisArticle18: false
            };
          } else {
            this.IsDown = true;
            this.ShowMessageBoxWithOkBtn('فایل صورتجلسه بارگزاری نشده است.');
          }

        });
    } else {
      this.ShowMessageBoxWithOkBtn('این درخواست فاقد کمیسیون می باشد');
    }
  }
  onRelatedProductGridReady(params) {
    this.gridApiRelatedProduct = params.api;
  }
  RelatedProductRowClick(event) {
    this.ProductIDs = [];
    this.gridApiRelatedProduct.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }
    });
  }
  onRelatedProductcellEditingStarted(event) {
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
    if (event.colDef && event.colDef.field === 'ProductName') {
      this.ProductRequest.GetIsVolumetricProductList(0,
        this.RegionParams.selectedObject,
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
  FetchMoreRelatedProduct(event) {
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetIsVolumetricProductList(event.SearchOption,
        event.Owner.RegionParams.selectedObject,
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
  FetchRelatedProductByTerm(event) {
    event.Owner.ProductRequest.GetIsVolumetricProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
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
  RedioSelectedChangeRelatedProduct(event) {
    event.Owner.ProductRequest.GetIsVolumetricProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
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
  Article18DigitalSign() {
    if (this.ProductRequestObject &&
      this.ProductRequestObject.LastInquiryObject &&
      this.ProductRequestObject.LastInquiryObject.OrderCommitionObject) {
      this.OrderCommitionID = this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID;
      if (this.ExistsArticle18File) {
        this.ExistsFile = true;
        this.BtnClickedName = 'Article18';
        this.ShowMessageBoxWithYesNoBtn('فایل قبلا ذخیره شده است. آیا مایل به مشاهده آن هستید؟');
      } else {
        this.ExistsFile = false;
        this.IsDown = false;
        this.ProductRequest.GetMinutesReportPDFContent(
          this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID,
          this.ProductRequestObject.CostFactorID,
          this.ProductRequestObject.RegionCode,
          1047,
          this.HaseEstimate,
          false,
          this.ModuleViewTypeCode).subscribe(PDFRes => {
            if (PDFRes) {
              this.IsDown = true;
              this.PopUpType = 'pdf-viewer';
              this.HaveHeader = true;
              this.isClicked = true;
              this.startLeftPosition = 40;
              this.startTopPosition = 0;
              this.HaveMaxBtn = false;
              this.OverMainMinwidthPixel = 1295;
              this.MainMaxwidthPixel = 1300;
              this.PopupParam = {
                HeaderName: 'ابلاغ ماده 18',
                PDFSrc: PDFRes.FileBase64,
                FileName: PDFRes.FileName,
                OrderCommitionID: this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID,
                HaveEstimate: false,
                HaveSign: true,
                CostFactorID: this.ProductRequestObject.CostFactorID,
                RegionCode: this.ProductRequestObject.RegionCode,
                PDFSignersInfo: PDFRes.PDFSignersInfo,
                HasTripleReport: this.HaseEstimate,
                IsFinal: false,
                IsArticle18: true,
                HasDelBtn: true,
                IsAdequacy: false,
                IsDisArticle18: false
              };
            } else {
              this.IsDown = true;
              this.ShowMessageBoxWithOkBtn('فایل صورتجلسه بارگزاری نشده است.');
            }
          });
      }

    } else {
      this.ShowMessageBoxWithOkBtn('این درخواست فاقد کمیسیون می باشد');
    }
  }
  showcontractlistclick() {
    this.PopUpType = 'show-contract-list';
    this.isClicked = true;
    this.PercentWidth = 98;
    this.MainMaxwidthPixel = 2000;
    this.MinHeightPixel = 600;
    this.HaveHeader = true;
    this.startLeftPosition = 15;
    this.startTopPosition = 10;
    this.HaveMaxBtn = true;
    this.PopupParam = {
      RegionCode: this.RegionParams.selectedObject,
      IsCost: this.IsCost

    };
  }

  IsUpdateBeforeAdevertisingRedioClick(IsUpdateBeforeAdevertising) {
    this.IsUpdateBeforeAdevertising = IsUpdateBeforeAdevertising;
  }

  IsUpdateTenderDocRedioClick(IsUpdateTenderDoc) {
    this.IsUpdateTenderDoc = IsUpdateTenderDoc;
  }

  ReceiveDocProductRowClick(event) {
    this.SelectedReceiveDocID = event.data.ReceiveDocID;
  }
  onReceiveDocProductGridReady(params) {
    this.gridApiReceiveDocProduct = params.api;
  }
  onReceiveDocProductcellEditingStarted(event) {
  }
  onAddReceiveDocClick() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        this.PopUpType = 'product-receive-doc';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 278;
        this.startTopPosition = 70;
        this.PercentWidth = 60;
        this.OverMainMinwidthPixel = null;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          Subject: this.Subject,
          RegionCode: this.RegionParams.selectedObject,
          ModuleCode: this.ModuleCode,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          OrginalModuleCode: this.OrginalModuleCode,
          ReceiveDocID: -1,
        };
      });
    } else {
      this.PopUpType = 'product-receive-doc';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 278;
      this.startTopPosition = 70;
      this.PercentWidth = 60;
      this.OverMainMinwidthPixel = null;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.Subject,
        RegionCode: this.RegionParams.selectedObject,
        ModuleCode: this.ModuleCode,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        OrginalModuleCode: this.OrginalModuleCode,
        ReceiveDocID: -1,
      };
    }
  }
  onEditReceiveDocClick() {
    if (this.CallMainapi === false) {
      const promise = new Promise((resolve, reject) => {
        this.ProductRequest.GetProductRequest(this.CostFactorID).subscribe(res => {
          if (res) {
            this.CallMainapi = true;
            this.ProductRequestObject = res;
            resolve(true);
          }
        })
      }).then(() => {
        this.PopUpType = 'product-receive-doc';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 278;
        this.startTopPosition = 70;
        this.PercentWidth = 60;
        this.OverMainMinwidthPixel = null;
        this.PopupParam = {
          ProductRequestObject: this.ProductRequestObject,
          Subject: this.Subject,
          RegionCode: this.RegionParams.selectedObject,
          ModuleCode: this.ModuleCode,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          OrginalModuleCode: this.OrginalModuleCode,
          ReceiveDocID: this.SelectedReceiveDocID
        };
      });
    } else {
      this.PopUpType = 'product-receive-doc';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 278;
      this.startTopPosition = 70;
      this.PercentWidth = 60;
      this.OverMainMinwidthPixel = null;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.Subject,
        RegionCode: this.RegionParams.selectedObject,
        ModuleCode: this.ModuleCode,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        OrginalModuleCode: this.OrginalModuleCode,
        ReceiveDocID: this.SelectedReceiveDocID
      };
    }
  }
  onDeleteReceiveDocclick() {
    this.ProductRequest.DeletePRReceiveDoc(this.SelectedReceiveDocID).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
      this.SetPRReciveDocList();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
      });
  }
  SetPRReciveDocList() {
    this.ProductRequest.GetPRReceiveDocList(this.CostFactorID, null, this.ModuleViewTypeCode).subscribe(res => {
      this.ReceiveDocProductRowData = res;
    });
  }

  SetLastContractData(ContractId) {
    this.IsTransferedContract = true;
    this.ProductRequest.getProductRequestByContractId(ContractId).subscribe(res => {
      if (res) {
        // this.IsDisable = false;
        this.ProductRequestObject = res;
        this.HasProvisionContractID = this.ProductRequestObject.ProvisionContractID ? true : false;
        if (this.ProductRequestObject.RelatedContractID) {
          this.IsNew = false;
          this.PerecentageChangesLabel = true;
        }
        this.FillAllNgSelectByProductRequest(this.ProductRequestObject);
        if (this.ProductRequestObject && this.ProductRequestObject.ContractTypeCode) {
          this.IsInsert = true;
        }
        if (
          this.ProductRequestObject.ProductRequestStatusCode &&
          this.ProductRequestObject.ProductRequestStatusCode !== 3) {
          this.btnRevocationName = 'ابطال';
          this.btnRevocationIcon = 'revocation';
        }
        if (
          this.ProductRequestObject.ProductRequestStatusCode &&
          this.ProductRequestObject.ProductRequestStatusCode === 3) {
          this.btnRevocationName = 'بازگشت از ابطال';
          this.btnRevocationIcon = 'cancel';
        }
        this.IsCost = this.ProductRequestObject.IsCost;
        this.ISActLocation = false;
        this.ResearcherID = this.ProductRequestObject.ResearcherID;
        this.BoardDecisionsDec = this.ProductRequestObject.BoardDecisions;
        this.ProductRequestCode = null;
        this.ProductRequestNo = null;
        this.ProductRequestObject.ProductRequestCode = null;
        this.ProductRequestObject.ProductRequestNo = null;
        this.ProductRequestObject.ProductRequestDate = null;
        // this.ProductRequestDate = undefined;
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
        this.ContractContentNote = this.ProductRequestObject.ContractContentNote;
        this.IsContractContent = this.ProductRequestObject.IsContractContent;
        this.RelatedProductRowData = this.ProductRequestObject.RequestRelatedProductList;
        this.rowsData = this.ProductRequestObject.ProductRequestItemList;
        this.SetEntityDataInDataRow(this.rowsData);
        this.rowsData.forEach(element => {
          element.StartDate = null;
          element.PersianStartDate = null;
          element.EndDate = null;
          element.PersianEndDate = null;
          element.ShortEndDate = null;
          element.ShortStartDate = null;
        });
        this.ProductRequestObject.ProductRequestItemList.forEach(element => {
          element.StartDate = null;
          element.PersianStartDate = null;
          element.EndDate = null;
          element.PersianEndDate = null;
          element.ShortEndDate = null;
          element.ShortStartDate = null;
        });
        this.AssetRowData = this.ProductRequestObject.AssetList;
        this.RedioClick(this.IsCost);
        if (this.ProductRequestObject && this.ProductRequestObject.RelatedContractID) {
          this.contractpaydetail.GetFirstContractOrder(this.ProductRequestObject.RelatedContractID).subscribe(ress => {
            ress.forEach(item => {
              item.FinalAmount = item.Amount;
              this.SumFinalAmountRelatedContract = this.SumFinalAmountRelatedContract + parseFloat(item.FinalAmount);
            });
          });
          this.contractpaydetail.GetBeforeLastContractOrder(this.ProductRequestObject.RelatedContractID).subscribe(resss => {
            resss.forEach(item => {
              item.FinalAmount = item.Amount;
              this.SumFinalBeforeLastAmountRelatedContract = this.SumFinalBeforeLastAmountRelatedContract + parseFloat(item.FinalAmount);
            });
          });
          if (this.ProductRequestObject.ProductRequestItemList && this.ProductRequestObject.ProductRequestItemList.length > 0) { }
        }
        if (this.ProductRequestObject && this.ProductRequestObject.ContractTimeExtension) { // RFC 51373
          // tslint:disable-next-line: max-line-length
          this.TimeExtensionDay = this.ProductRequestObject.ContractTimeExtension.Day ? this.ProductRequestObject.ContractTimeExtension.Day : 0;
          // tslint:disable-next-line: max-line-length
          this.TimeExtensionMonth = this.ProductRequestObject.ContractTimeExtension.Month ? this.ProductRequestObject.ContractTimeExtension.Month : 0;
          // tslint:disable-next-line: max-line-length
          this.TimeExtensionYear = this.ProductRequestObject.ContractTimeExtension.Year ? this.ProductRequestObject.ContractTimeExtension.Year : 0;
        }
        this.ProductRequestIsOnline = this.ProductRequestObject.IsOnline ? this.ProductRequestObject.IsOnline : false;
        this.ProductRequestObject.CostFactorID = -1;
      }
    });

  }
  AdequacyDocDigitalSign() {
    if (this.ProductRequestObject &&
      this.ProductRequestObject.CostFactorID &&
      this.ProductRequestObject.CostFactorID > 0) {
      const CostFactorID = this.ProductRequestObject.CostFactorID;
      this.ComonService.GetAllArchiveDetailList(CostFactorID, 1167, true, false).subscribe(res => {
        if (res) {
          this.ExistsFile = true;
          this.BtnClickedName = 'AdecuacyDoc';
          this.ShowMessageBoxWithYesNoBtn('فایل قبلا ذخیره شده است. آیا مایل به مشاهده آن هستید؟');
        } else {
          this.ExistsFile = false;
          this.IsDown = false;
          this.ProductRequest.GetMinutesReportPDFContent(
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.CostFactorID,
            this.ProductRequestObject.RegionCode,
            1167,
            false,
            false,
            this.ModuleViewTypeCode).subscribe(PDFRes => {
              if (PDFRes) {
                this.IsDown = true;
                this.PopUpType = 'pdf-viewer';
                this.HaveHeader = true;
                this.isClicked = true;
                this.startLeftPosition = 40;
                this.startTopPosition = 0;
                this.HaveMaxBtn = false;
                this.OverMainMinwidthPixel = 1295;
                this.MainMaxwidthPixel = 1300;
                this.PopupParam = {
                  HeaderName: 'نامه کفایت اسناد',
                  PDFSrc: PDFRes.FileBase64,
                  FileName: PDFRes.FileName,
                  OrderCommitionID: null,
                  HaveEstimate: false,
                  HaveSign: true,
                  CostFactorID: this.ProductRequestObject.CostFactorID,
                  RegionCode: this.ProductRequestObject.RegionCode,
                  PDFSignersInfo: PDFRes.PDFSignersInfo,
                  HasTripleReport: false,
                  IsFinal: false,
                  IsArticle18: false,
                  HasDelBtn: this.IsAdmin,
                  IsAdequacy: true,
                  IsDisArticle18: false
                };
              } else {
                this.IsDown = true;
                this.ShowMessageBoxWithOkBtn('فایل نامه بارگزاری نشده است.');
              }
            });
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('این یک درخواست صحیح نمی باشد');
    }
  }
  SetColumnDef() {

  }
  onDelRecDocClick(row) {

    let GridList = [];
    this.ReceiveDocGridApi.forEachNode(element => {
      if (element.data.ItemNo !== row.ItemNo) {
        GridList.push(element.data);
      }
    });
    this.ReceiveDocRowData = GridList;

  }
  DisplayColDef() {
    if (this.IsNew) {
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
          headerName: 'اسناد فعال',
          field: 'IsReturn',
          width: 100,
          resizable: true,
          editable: (params) => {
            return false;
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            if (params.value) {
              return 'قبول شده';
            } else {
              return 'رد شده';
            }
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsReturnInquiry
          },
        },
        {
          headerName: 'شماره استعلام',
          field: 'InquiryNo',
          width: 120,
          resizable: false
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
          editable: true,
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
    } else {
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
          },
        },
        {
          headerName: 'قبول / رد',
          field: 'IsValidity',
          width: 100,
          resizable: true,
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
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
          headerName: 'اسناد فعال',
          field: 'IsReturn',
          width: 100,
          resizable: true,
          editable: (params) => {
            return false;
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            if (params.value) {
              return 'قبول شده';
            } else {
              return 'رد شده';
            }
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsReturnInquiry
          },
        },
        {
          headerName: 'شماره استعلام',
          field: 'InquiryNo',
          width: 120,
          resizable: false
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
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 250,
          resizable: true
        },
        {
          headerName: 'شماره ضمانت نامه',
          field: 'ReferenceNo',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ ضمانت نامه',
          field: 'PersianReferenceDate',
          width: 120,
          resizable: true,
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
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
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
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
          headerName: 'توضیحات',
          field: 'Note',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 440,
          resizable: true
        },
        {
          headerName: 'شماره سپام',
          field: 'SapamNo',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
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
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 120,
          resizable: true
        },
        {
          headerName: 'ارزش ملک',
          field: 'EstateValue',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 80,
          resizable: true
        },
        {
          headerName: 'پلاک ثبتی',
          field: 'RegRegion',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 80,
          resizable: true
        },
        {
          headerName: 'متراژ',
          field: 'Area',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 80,
          resizable: true
        },
        {
          headerName: 'آدرس ملک',
          field: 'EstateAddress',
          editable: (params) => {
            if (params.data.ReceiveDocID > 0) {
              return false;
            } else {
              return true;
            }
          },
          width: 440,
          resizable: true
        },
        {
          headerName: 'حذف',
          field: '',
          width: 80,
          sortable: false,
          resizable: false,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.DelRecDoc,
          }
        }
      ];
    }
  }
  DisAppArticle18DigitalSign() {
    if (this.ProductRequestObject &&
      this.ProductRequestObject.LastInquiryObject &&
      this.ProductRequestObject.LastInquiryObject.OrderCommitionObject) {
      this.OrderCommitionID = this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID;
      this.ComonService.CheckPDFHasSigned(this.OrderCommitionID, 1228).subscribe(result => {
        if (result) { // امضای الکترونیکی شده
          this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, 1228, true).subscribe(res => {
            this.PopUpType = 'pdf-viewer';
            this.HaveHeader = true;
            this.isClicked = true;
            this.startLeftPosition = 40;
            this.startTopPosition = 0;
            this.HaveMaxBtn = false;
            this.OverMainMinwidthPixel = 1295;
            this.MainMaxwidthPixel = 1300;
            this.PopupParam = {
              HeaderName: 'عدم تصویب ماده 18',
              PDFSrc: res ? res.FileBase64 : undefined,
              FileName: res ? res.FileName : null,
              OrderCommitionID: this.OrderCommitionID,
              HaveEstimate: false,
              HaveSign: true,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              RegionCode: this.ProductRequestObject.RegionCode,
              PDFSignersInfo: res ? res.PDFSignersInfo : null,
              HasTripleReport: this.HaseEstimate,
              IsFinal: false,
              HaveUpload: !res || !res.PDFSignersInfo || res.PDFSignersInfo.length <= 0,
              SignByFile: false,
              IsArticle18: false,
              HasDelBtn: this.IsAdmin,
              IsAdequacy: false,
              IsDisArticle18: true,
            };
          });
          return;
        } else { // امضای الکترونیکی نشده
          if (this.ExistsDisApprArticle18File) {
            this.ExistsFile = true;
            this.BtnClickedName = 'DisArticle18';
            this.ShowMessageBoxWithYesNoBtn('فایل قبلا ذخیره شده است. آیا مایل به مشاهده آن هستید؟');
          } else {
            this.ExistsFile = false;
            this.IsDown = true;
            this.isClicked = true;
            this.PopUpType = 'rich-text-box-input';
            this.startLeftPosition = 70;
            this.startTopPosition = 100;
            this.PixelHeight = 290;
            this.HaveMaxBtn = false;
            this.OverMainMinwidthPixel = 950;
            this.MainMaxwidthPixel = 1000;
            this.HaveHeader = true;
            this.MinHeightPixel = 290;
            this.PopupParam = {
              HeaderName: 'دلایل عدم تصویب',
              OrderCommitionID: this.OrderCommitionID,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              RegionCode: this.ProductRequestObject.RegionCode,
              IsDisableInput: false,
              IsAdmin: this.IsAdmin
            };
          }
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('این درخواست فاقد کمیسیون می باشد');
    }
  }
  ChooseArticle18Type() {
    if (this.ProductRequestObject &&
      this.ProductRequestObject.LastInquiryObject &&
      this.ProductRequestObject.LastInquiryObject.OrderCommitionObject) {

      this.OrderCommitionID = this.ProductRequestObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID;

      // tslint:disable-next-line: no-shadowed-variable
      const promise = new Promise<void>((resolve) => {
        forkJoin([this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, 1047, true, false),
        this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, 1228, true, false)
        ]).subscribe(res => {
          if (res[0] && res[0] !== false) {
            this.ExistsArticle18File = true;
          }
          if (res[1] && res[1] !== false) {
            this.ExistsDisApprArticle18File = true;
          }
          resolve();
        });
      }).then(() => {
        this.PopUpType = 'global-choose-page';
        this.HaveHeader = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 520;
        this.startTopPosition = 220;
        this.OverMainMinwidthPixel = null;
        this.HeightPercentWithMaxBtn = null;
        this.MinHeightPixel = null;
        this.isClicked = true;
        this.IsArticle18Choosen = true;
        this.PopupParam = {
          HeaderName: 'ماده 18',
          RadioItems: [
            {
              title: 'ابلاغ ماده 18',
              type: 1,
              IsDisable: this.ExistsDisApprArticle18File,
            },
            {
              title: 'عدم تصویب ماده 18',
              type: 2,
              IsDisable: this.ExistsArticle18File
            }
          ]
        };
      });
    } else {
      this.ShowMessageBoxWithOkBtn('این درخواست فاقد کمیسیون می باشد');
      return;
    }
  }
  OpenSelectedArticle18(Type) {
    switch (Type) {
      case 1:
        this.Article18DigitalSign();
        break;
      case 2:
        this.DisAppArticle18DigitalSign();
        break;
      default:
        break;
    }
  }

  onOpenUpdateContractLimited() {
    this.PopUpType = 'contract-info-limited-change-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.startLeftPosition = 30;
    this.startTopPosition = 30;
    this.OverMainMinwidthPixel = 1200;
    this.HeightPercentWithMaxBtn = 85;
    this.PercentWidth = 95;
    this.MainMaxwidthPixel = 1350;
    this.MinHeightPixel = 600;
    this.isClicked = true;
    this.PopupParam = {
      HeaderName: 'اصلاح محدود اطلاعات قرارداد',
      ProductrequestID: this.ProductRequestObject.CostFactorID
    };
  }
  CheckContractStatusForUpdate() {
    this.ContractList.CheckContractStatusForUpdate(this.ProductRequestObject.CostFactorID).subscribe(res => {
      this.DisabledEditContractInfoBtn = !res;
    });
  }
  onChangePRType(TypeCode) {
    if (this.oldProductRequestTypeCode &&
      this.oldProductRequestTypeCode === 2 &&
      this.oldProductRequestTypeCode !== TypeCode &&
      !isNullOrUndefined(this.PriceListTopicRasteParams.selectedObject)) {
      this.rowsData = [];
      this.PriceListTopicRasteParams.selectedObject = null;
    }
    if (TypeCode === 2) {
      this.PriceListTopicRasteDisable = false;
      this.PriceListTopicRasteParams.IsDisabled = false;
      if (this.PriceListTopicRasteParams.selectedObject && this.PriceListTopicRasteParams.selectedObject === 402374) {
        this.IsNotGreenSpace = false;
      }
    } else {
      this.PriceListTopicRasteDisable = true;
      this.PriceListTopicRasteParams.IsDisabled = true;
      this.PriceListTopicRasteParams.selectedObject = null;
      this.FillGrid(this.HaseEstimate);
      this.IsNotGreenSpace = true;
    }
    this.FillGreenSpacePRItemGrid(this.HaseEstimate);
    this.oldProductRequestTypeCode = TypeCode;
  }
  onChangePriceListTopicRaste(event) {
    this.FillGreenSpacePRItemGrid(this.HaseEstimate);
    if (event === 402374) {
      this.IsNotGreenSpace = false;
      this.rowsData = [];
      let datList = [];
      this.gridApi.forEachNode(element => {
        this.EntityColumnDefinition(element.data.ProductID, null, element.data.ProductRequestEntityList, false);
        datList.push(element.data);
      });
      this.SPService.GetServicePatternItemList(482, null).subscribe(res => {
        if (res) {
          res.forEach(element => {
            let anyy = null;
            anyy = datList.filter(x => x.ProductID === element.ProductID);
            if (anyy === null || anyy.length === 0) {
              this.EntityColumnDefinition(element.ProductID, null, element.ProductRequestEntityList, false);
              datList.push(element);
            }
          });
          this.rowsData = datList;
        }
      });
    }
  }
  OnshowhistorydetailClick() {
    if (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) {
      this.PopUpType = 'show-history-detail';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 80;
      this.startTopPosition = 20;

      this.OverMainMinwidthPixel = 1200;
      this.MainMaxwidthPixel = 1200;

      this.PixelHeight = 600;
      this.MinHeightPixel = 600;
      let ObjectIDList = [];

      this.PopupParam = {
        ActorId: this.ProductRequestObject.CostFactorID,
        HeaderName: 'مشاهده ریز اصلاحات',
        ModuleCode: 2730
      };
    }
  }
  FillGreenSpacePRItemGrid(HasEstimate) { // RFC 64631 - 64632
    if (HasEstimate) {
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
          editable: () => {
            return this.IsEditable;
          },
          width: 120,
          resizable: true,
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
              this.BeforeSelectedProductID = this.selectedProductID = params.data.ProductID;
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
            return this.IsEditable;
          },
          width: 350,
          resizable: true
        },
        {
          headerName: 'توضیحات',
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
          headerName: 'تاریخ شروع پیشنهادی',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: (Params) => {
            return (!(this.IsNew) && this.ContractParams.selectedObject && Params.data._SelectedContractItem_ng) ? false :
              this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
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
              params.data.ShortStartDate = params.newValue.MDate;
              params.data.PersianStartDate = params.newValue.SDate;
              if (this.gridApi &&
                this.PRTypeParams.selectedObject === 2 &&
                this.PriceListTopicRasteParams.selectedObject === 402374) {
                const itemsToUpdate = [];
                this.gridApi.forEachNode(node => {
                  if (isNullOrUndefined(node.data.ShortStartDate)) {
                    node.data.ShortStartDate = params.data.ShortStartDate;
                    node.data.PersianStartDate = params.newValue.SDate;
                  }
                  itemsToUpdate.push(node.data);
                });
                this.gridApi.updateRowData({ update: itemsToUpdate });
              }
              return true;
            } else {
              params.data.ShortStartDate = null;
              params.data.PersianStartDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'تاریخ پایان پیشنهادی',
          field: 'PersianEndDate',
          width: 130,
          resizable: true,
          editable: () => {
            return this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
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
              params.data.ShortEndDate = params.newValue.MDate;
              params.data.PersianEndDate = params.newValue.SDate;
              if (this.gridApi &&
                this.PRTypeParams.selectedObject === 2 &&
                this.PriceListTopicRasteParams.selectedObject === 402374) {
                const itemsToUpdate = [];
                this.gridApi.forEachNode(node => {
                  if (isNullOrUndefined(node.data.ShortEndDate)) {
                    node.data.ShortEndDate = params.data.ShortEndDate;
                    node.data.PersianEndDate = params.data.PersianEndDate;
                  }
                  itemsToUpdate.push(node.data);
                });
                this.gridApi.updateRowData({ update: itemsToUpdate });
              }
              return true;
            } else {
              params.data.ShortEndDate = null;
              params.data.PersianEndDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'مبلغ متره',
          field: 'VWAmount',
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
    } else {
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
          editable: () => {
            return this.IsEditable;
          },
          width: 120,
          resizable: true,
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
              this.BeforeSelectedProductID = this.selectedProductID = params.data.ProductID;
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
            return this.IsEditable;
          },
          width: 350,
          resizable: true
        },
        {
          headerName: 'توضیحات',
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
          headerName: 'تاریخ شروع پیشنهادی',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: (Params) => {
            return (!(this.IsNew) && this.ContractParams.selectedObject && Params.data._SelectedContractItem_ng) ? false :
              this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
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
              params.data.ShortStartDate = params.newValue.MDate;
              params.data.PersianStartDate = params.newValue.SDate;
              if (this.gridApi &&
                this.PRTypeParams.selectedObject === 2 &&
                this.PriceListTopicRasteParams.selectedObject === 402374) {
                const itemsToUpdate = [];
                this.gridApi.forEachNode(node => {
                  if (isNullOrUndefined(node.data.ShortStartDate)) {
                    node.data.ShortStartDate = params.data.ShortStartDate;
                    node.data.PersianStartDate = params.newValue.SDate;
                  }
                  itemsToUpdate.push(node.data);
                });
                this.gridApi.updateRowData({ update: itemsToUpdate });
              }
              return true;
            } else {
              params.data.ShortStartDate = null;
              params.data.PersianStartDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'تاریخ پایان پیشنهادی',
          field: 'PersianEndDate',
          width: 130,
          resizable: true,
          editable: () => {
            return this.StartAndEndDateIsEditable ? true : this.IsEditable;
          },
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
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
              params.data.ShortEndDate = params.newValue.MDate;
              params.data.PersianEndDate = params.newValue.SDate;
              if (this.gridApi &&
                this.PRTypeParams.selectedObject === 2 &&
                this.PriceListTopicRasteParams.selectedObject === 402374) {
                const itemsToUpdate = [];
                this.gridApi.forEachNode(node => {
                  if (isNullOrUndefined(node.data.ShortEndDate)) {
                    node.data.ShortEndDate = params.data.ShortEndDate;
                    node.data.PersianEndDate = params.data.PersianEndDate;
                  }
                  itemsToUpdate.push(node.data);
                });
                this.gridApi.updateRowData({ update: itemsToUpdate });
              }
              this.gridApi.forEachNode(node => {
              });
              return true;
            } else {
              params.data.ShortEndDate = null;
              params.data.PersianEndDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'تعداد',
          field: 'QTY',
          editable: (params) => {
            return (params.data.ProductTypeCode === 2 && this.currentRegionObject.RegionGroupCode === 3 &&
              this.OrginalModuleCode !== 2939 && this.OrginalModuleCode !== 2793) // RFC 52896 && برداشتن در ابزار rfc 55993
              || (params.data.ProductTypeCode === 2 && this.currentRegionObject.RegionGroupCode === 20
                && this.OrginalModuleCode !== 2939 && this.OrginalModuleCode !== 2793 && this.OrginalModuleCode !== 2824)
              || (params.data.ProductTypeCode === 2 && this.ModuleViewTypeCode === 165) ? false :
              this.IsSumEditableType107 ? true : this.IsEditable;
          },
          valueSetter: (params) => {
            if (params.newValue) {
              // tslint:disable-next-line: radix
              params.data.QTY = params.newValue;
              // tslint:disable-next-line: radix
              params.data.FinalAmount = Math.round(parseFloat((!params.newValue || params.newValue == 0) ? 1 : params.newValue) * (params.data.Amount)); // RFC 54950
            }
          },
          valueFormatter: function currencyFormatter(params) {
            if (params.value && !isUndefined(params.value) && params.value != null) {
              return params.value;
            } else {
              return '';
            }
          },
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد پیشنهادی',
          field: 'Amount',
          HaveThousand: true,
          width: 120,
          resizable: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellEditorParams: { IsFloat: true, FloatMaxLength: 4 },
          editable: (params) => {
            if (this.IsSumEditableType107) {
              return true;
            } else {
              return (this.ModuleViewTypeCode === 100000 && this.IsAdmin) || (this.IsEditable &&
                ((this.PRTypeParams.selectedObject !== 2 && // فضای سبز نباشد
                  this.PriceListTopicRasteParams.selectedObject !== 402374) // نگهداشت نباشد
                  ||
                  (this.PRTypeParams.selectedObject === 2 && // فضای سبز است
                    this.PriceListTopicRasteParams.selectedObject === 402374 // نگهداشت است
                    && isNullOrUndefined(params.data.Amount)) // مبلغ دریافتی از احجام توسعه و نگهداشت خالی است
                ));
            }
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.Amount = params.newValue;
              if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
                params.data.FinalAmount = params.data.Amount;
              } else {
                params.data.FinalAmount = Math.round(parseFloat(params.data.QTY) * params.newValue);
              }
            }
          },
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'FinalAmount',
          HaveThousand: true,
          width: 120,
          resizable: true,
          editable: () => {
            if (this.IsSumEditableType107) {
              return true;
            } else {
              return this.IsEditable || (this.ModuleViewTypeCode === 100000 && this.IsAdmin);
            }
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.FinalAmount = params.newValue;
              if (params.data.Amount) {
                params.data.QTY = (parseInt(params.data.FinalAmount) / parseFloat(params.data.Amount)).toFixed(4);
              } else {
                if (params.data.QTY){
                  params.data.Amount = (parseInt(params.data.FinalAmount) / parseInt(params.data.QTY));
                } else {
                  params.data.Amount = parseInt(params.data.FinalAmount);
                }
              }
            }
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
          headerName: 'مبلغ پیشنهادی با اعمال ضرایب',
          field: 'AmountCOEFPact',
          HaveThousand: true,
          width: 200,
          resizable: true
        },
        {
          headerName: 'مبلغ کل ماهانه',
          field: 'AmountCOEFPactWithDuration',
          HaveThousand: true,
          hide: this.PRTypeParams.selectedObject !== 2 || (this.PRTypeParams.selectedObject === 2 && this.PriceListTopicRasteParams.selectedObject !== 402374),
          width: 200,
          resizable: true
        }
      ];
    }
  }

  InsertSupplierIntoPropsalExtension() {
    if ((!this.ProductRequestObject.OrdersObject || this.ProductRequestObject.OrdersObject.CostFactorID <= 0)) {
      this.ProductRequest.InsertSupplierIntoPropsalExtension(this.ProductRequestObject.CostFactorID).subscribe();
    }
  }
  OnCheckBoxChanged(event) {
    this.IsChecked = event;
    if (!this.IsChecked) {
      this.ProductRequestObject.ContractTypeCode = null;
    }
  }
}
