import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { TreeSelectComponent } from 'src/app/Shared/tree-select/tree-select.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ItemPipe } from 'src/app/Shared/ngx-tree-select/src';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { of, forkJoin, Observable } from 'rxjs';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CarTagComponent } from 'src/app/Shared/car-tag/car-tag.component';
import { resolve } from 'q';
import { isUndefined } from 'util';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { GridOptions } from 'ag-grid-community';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-person2',
  templateUrl: './person2.component.html',
  styleUrls: ['./person2.component.css']
})
export class Person2Component implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  editableCetificate = true;
  @ViewChild('MovableProperty') MovableProperty: TemplateRef<any>;
  @ViewChild('WorkLogDetail') WorkLogDetail: TemplateRef<any>;
  @ViewChild('PrintFlow') PrintFlow: TemplateRef<any>;
  @ViewChild('AllowStateCodeUpdate') AllowStateCodeUpdate: TemplateRef<any>;
  @ViewChild('HasOpenWF') HasOpenWF: TemplateRef<any>;
  @ViewChild('ShowContractorwinercommition') ShowContractorwinercommition: TemplateRef<any>;
  @ViewChild('ShowHistoryList') ShowHistoryList: TemplateRef<any>;
  AllowStateName;
  btnConfirmName;
  btnConfirmIcon;
  WorkFlowTransitionID;
  PercentWidth;
  IsEndFlow;
  IsAdminTraffic = false;
  DisplayBtns = false;
  btnConfirmAndReturnName = 'عدم تاييد و بازکشت';
  OverMainMinwidthPixel;
  MainMaxwidthPixel;
  MinHeightPixel;
  IsEditConfirm = true;
  CheckRegionWritable = true;
  BtnClickedName: string;
  ModuleCode;
  WorkflowObjectCode = 11;
  ChangeDetection: any;
  IsExpertSelected = false;
  BirthDateSearch: any;
  PostCodeSearch;
  ShowWorkflowButtons = true;
  WorkflowButtonsWidth = 44.8;
  ISSendAndConfirm = false;
  IdentityNoSearch: string;
  Validate = true;
  ActorId = 0;
  FirstName: any;
  LastName: any;
  PersonObject: any;
  Nationality: any;
  PassportNo: any;
  PersonelCode: any;
  Gender: any;
  Address: any;
  Tel: any;
  Cell: any;
  Cell2: any;
  Email: any;
  WorkPostCode: any;
  WorkTel: any;
  WorkAddress: any;
  FatherName: any;
  BirthCertificateNo: any;
  BirthCertificateSerial: any;
  BirthPlace: any;
  IssuancePlace: any;
  EconomicCode: any;
  Web: any;
  PopupParam: any;
  CurrWorkFlow: any;
  IsContractRemainStartWF;
  WorkFlowID: number = null;
  ReadyToConfirm = null;
  WorkflowTypeName;
  WorkflowTypeCode;
  ObjectNo: string;
  ObjectID: any;
  CartableUserID;
  MinimumPosting: any;
  ModuleViewTypeCode = 3;
  PostCode: any;
  RegionName: any;
  IsMale: boolean;
  IsFemale: boolean;
  IsEditable = true;
  IsContractor: boolean;
  IsConsult: boolean;
  IsProducer: boolean;
  IsSupplier;
  IsInternalBuilders;
  IsExternalBuilders;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  IdentityNo: any;
  BirthDate: any;
  IsArchive = false;
  UserImage: string;
  UserLocalImage = 'assets/images/user-img-not-found.png';
  ImgLoadMsg = [];
  ImgLoadMsgSize = [];
  ImgLoadMsgType = [];
  ImgLoadMsgDimensions = [];
  ImageMsgLoded;
  img;
  selectedFiles;
  IsUncorrect = false;
  fileListlength;
  selectedFile: File;
  ParamObj;
  type: string;
  colDef;
  rowData = [];
  FilterDocumentTypeCodeList = [];
  InquiryObject: any;
  RankColumnDef;
  RankrowsData: any = [];
  RankgridApi: any;
  EvaluatorList: any = [];
  ActorNote: any = '';

  NgSelectRegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '250px',
    type: 'region'
  };
  BusinessPatternParams = {
    bindLabelProp: 'BusinessPatternNoName', // 62056
    bindValueProp: 'BusinessPatternID',
    placeholder: '',
    MinWidth: '300px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'business-pattern',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        // tslint:disable-next-line: max-line-length
        [{ HeaderCaption: 'نام تخصص', HeaderName: 'BusinessPatternName', width: 55, MinTermLenght: 1, SearchOption: 'BusinessPatternName' },
        // tslint:disable-next-line: max-line-length
        { HeaderCaption: 'کد تجهیز', HeaderName: 'BusinessPatternNo', width: 53, MinTermLenght: 3, SearchOption: 'BusinessPatternNo' }],
      SearchItemHeader:
        [{ HeaderCaption: 'نام تخصص', width: 55, },
        { HeaderCaption: 'کد تجهیز', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  GradeParams =
    {
      bindLabelProp: 'PriceListTopicName',
      bindValueProp: 'PriceListTopicID',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      MinWidth: '90px',
      DropDownMinWidth: '200px',
      type: 'price-list-topic'
    };
  EvaluatorParams =
    {
      bindLabelProp: 'EvaluatorName',
      bindValueProp: 'EvaluatorID',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '200px',
      type: 'evaluator'
    };
  ProposalQualityParams =
    {
      bindLabelProp: 'ProposalQualityName',
      bindValueProp: 'ProposalQualityCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'proposal-quality'
    };
  ProposalQualityItems = [];
  SimilarWorkExperienceParams =
    {
      bindLabelProp: 'SimilarWorkExperienceName',
      bindValueProp: 'SimilarWorkExperienceCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'similar-work-experience'
    };
  SimilarWorkExperienceItems = [];
  CooperationHistoryParams =
    {
      bindLabelProp: 'CooperationHistoryName',
      bindValueProp: 'CooperationHistoryCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'cooperation-history'
    };
  CooperationHistoryItems = [];
  DegreeScoreParams =
    {
      bindLabelProp: 'DegreeScoreName',
      bindValueProp: 'DegreeScoreCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '200px',
      type: 'degree-score'
    };
  DegreeScoreItems = [];
  ExperienceScoreParams =
    {
      bindLabelProp: 'WorkExperienceScoreName',
      bindValueProp: 'WorkExperienceScoreCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '200px',
      type: 'experience-score'
    };
  ExperienceScoreItems = [];
  CriterionScoreParams =
    {
      bindLabelProp: 'CriterionScoreName',
      bindValueProp: 'CriterionScoreCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '200px',
      type: 'criterion-score'
    };
  CriterionScoreItems = [];
  CompanyGradeParams =
    {
      bindLabelProp: 'CompanyGradeName',
      bindValueProp: 'CompanyGradeCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'company-grade'
    };
  CompanyGradeItems = [];
  NativenessCopmanyParams =
    {
      bindLabelProp: 'NativenessOfCompanyName',
      bindValueProp: 'NativenessOfCompanyCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'nativeness-company'
    };
  NativenessCopmanyItems = [];
  EmployerReceiptParams =
    {
      bindLabelProp: 'PreviousEmployerReceiptName',
      bindValueProp: 'PreviousEmployerReceiptCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'employer-receipt'
    };
  EmployerReceiptItems = [];
  CommitionViewParams =
    {
      bindLabelProp: 'TechnicalCommitionViewName',
      bindValueProp: 'TechnicalCommitionViewCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'commition-view'
    };
  CommitionViewItems = [];
  ApprovalCertificateParams =
    {
      bindLabelProp: 'HaveApprovalCertificateName',
      bindValueProp: 'HaveApprovalCertificateCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '400px',
      type: 'approval-certificate'
    };
  OwnershipTypeParams = {
    bindLabelProp: 'OwnershipTypeName',
    bindValueProp: 'OwnershipTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'OwnershipType',
  };
  OwnershipTypeData: any[] = [
    {
      OwnershipTypeName: 'استیجاری',
      OwnershipTypeCode: 1
    },
    {
      OwnershipTypeName: 'مالکیت قطعی',
      OwnershipTypeCode: 2
    }];
  PropertyTypeParams = {
    bindLabelProp: 'PropertyTypeName',
    bindValueProp: 'PropertyTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'PropertyType',
  };
  PropertyTypeData: any[] = [
    {
      PropertyTypeName: 'شخصی',
      PropertyTypeCode: 1
    },
    {
      PropertyTypeName: 'شرکتی',
      PropertyTypeCode: 2
    }];
  MovableBusinessPatternParams =
    {
      bindLabelProp: 'BusinessPatternName',
      bindValueProp: 'BusinessPatternID',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      MinWidth: '100px',
      DropDownMinWidth: '200px',
      IsVirtualScroll: false,
      type: 'business-pattern'
    };
  CertificationParams = {
    bindLabelProp: 'CertificationName',
    bindValueProp: 'CertificationCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '250px',
    type: 'Certification'
  };
  ApprovalCertificateItems = [];
  RankSelectedRow;
  EduHisColumnDef;
  EduHisrowsData: any = [];
  EduHisgridApi: any;
  EduHisSelectedRow;
  EduHisGradeParams = {
    bindLabelProp: 'GradeName',
    bindValueProp: 'GradeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'edu-grade'
  };
  FieldParams = {
    bindLabelProp: 'FieldName',
    bindValueProp: 'FieldCode',
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
    type: 'edu-field',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'FieldCode', width: 40, MinTermLenght: 1, SearchOption: 'FieldCode' },
        { HeaderCaption: 'نام', HeaderName: 'FieldName', width: 53, MinTermLenght: 3, SearchOption: 'FieldName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  UniversityParams = {
    bindLabelProp: 'UniversityName',
    bindValueProp: 'UniversityCode',
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
    type: 'edu-uni',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'UniversityCode', width: 40, MinTermLenght: 1, SearchOption: 'UniversityCode' },
        { HeaderCaption: 'نام', HeaderName: 'UniversityName', width: 53, MinTermLenght: 3, SearchOption: 'UniversityName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  gridApi;
  WorkExecutionSelectedRow;
  // MovableColumnDef;
  // MovablegridApi: any;
  MovablerowsData: any = [];
  NgSelectEqTypeParams = {
    bindLabelProp: 'EquipmentTypeName',
    bindValueProp: 'EquipmentTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'equipment-type'
  };
  ImmovablePropertyColDef;
  ImmovablePropertySelectedRow;
  ImmovablePropertyRows = [];
  ImmovablePropertyList: any;
  gridApiIP: any;
  NgSelectEStParams = {
    bindLabelProp: 'EstateTypeName',
    bindValueProp: 'EstateTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Estate-ngsv',
  };
  NgSelectIUTParams = {
    bindLabelProp: 'InvestUsageTypeName',
    bindValueProp: 'InvestUsageTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'InvestUsage-ngsv',
  };
  CercolDef;
  CerrowData: any = [];
  CergridApi;
  ActorCetificateSelectedRow;
  MovAssetSelectedRow;
  ActorBankColDef: any;
  NgSelectPersonParams = {
    bindLabelProp: 'BranchName',
    bindValueProp: 'BranchID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Branch',
  };
  NgSelectCityParams = {
    bindLabelProp: 'CityName',
    bindValueProp: 'CityID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'City',
  };
  BankrowData = [];
  BankgridApi;
  // Training Course
  TrainingCourseRows = [];
  TrainingCourseColDef;
  TrainingCourseSelectedRow;
  TrainingCourseList: any;
  gridApiTC: any;
  gridHeight = 46;
  HeightPercentWithMaxBtn;
  DegreeScoreValue;
  ExperienceScoreValue;
  CriterionScoreValue;
  ApprovalCertificateValue;
  CompanyGradeValue;
  ProposalQualityValue;
  SimilarWorkExperienceValue;
  CommitionViewValue;
  EmployerReceiptValue;
  CooperationHistoryValue;
  NativenessCopmanyValue;
  CertificationEvaluatorParams = {
    bindLabelProp: 'CertificationEvaluatorName',
    bindValueProp: 'CertificationEvaluatorID',
    selectedObject: null,
    IsDisabled: false,
    loading: false,
    AllowParentSelection: true,
    MinWidth: '90px',
    DropDownMinWidth: '200px'
  };
  CertificationEvaluatorList;
  FromWorkListCartable = false;
  ActorPropertySelectedRow: any;
  WorkflowInstanceID: number;
  PersianBirthDate: string;
  // RFC 52837-Item2
  ProviderSurvey: string = window.location.origin + '/Templates/پرسشنامه تامین کننده.doc';
  ExternalBuilderSurvey: string = window.location.origin + '/Templates/پرسشنامه سازندگان خارجی.doc';
  InternalBuilderSurvey: string = window.location.origin + '/Templates/پرسشنامه سازندگان داخلی.doc';
  OtherInfo: string = window.location.origin + '/Templates/سایر اطلاعات.doc';
  MovablerowsDataPopupParam = [];
  ContentHeight = 87;
  IsAdmin = false;
  IsDisplay = false;
  HaveSupplementary = false;
  HaveBankInfo = true;
  TabContentHeight = 49;
  DisplaySearchBox = true;
  IsFromSearch = false;
  ButtonsBoxWidth = 50;
  ActorBusinessAllowStateList: any[];
  ActorBusinessAllowStateParams = {
    bindLabelProp: 'AllowStateName',
    bindValueProp: 'AllowStateCode',
    selectedObject: null,
    IsDisabled: false,
    loading: false,
    AllowParentSelection: true,
    MinWidth: '90px',
    DropDownMinWidth: '200px'
  };
  IsExtraMode = false;
  HaveTrainingCourse = true;
  HaveEvaluationInfo = true;
  IsSupplementaryInfo = true;
  HaveEducation = true;
  Haveshenasnameh = true;
  HaveActorBusiness = true;
  IsActiveshenasnameh = false;
  IsActiveSupplementaryInfo = false;
  IsActiveBankInfo = false;
  OverPixelWidth;
  PixelHeight;
  IsShowCompleteInfo;
  HaveCompleteInfo;
  IsEditableForType3 = false;
  HaveEvaluationRole = false;

  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'ExeUnitParams'
  };
  ButtonName = 'ثبت ظرفیت مازاد';
  CanEdite = false;
  OrginalModuleCode;
  CanSave = false;
  IsManagerInfo = false; // RFC 55889
  CorporateID: number;
  VeteranPercent: any;
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.IsChanged === true && params.data.needShowColor === true) {
        return { 'background-color': '#ffe600' };
      }
      if (params.data.AllowStateCode === 7) {
        return { 'background-color': '#d1f0d1', };
      }
    }
  };

  NgSelectManagementTypeParams = {
    bindLabelProp: 'ManagementTypeName',
    bindValueProp: 'ManagementTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'ManagementType',
  };
  NgSelectResponsibilityTypeParams = {
    bindLabelProp: 'ResponsibilityTypeName',
    bindValueProp: 'ResponsibilityTypeCode',
    placeholder: '',
    MinWidth: '110px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '150px',
    type: 'ResponsibilityType',
  };
  NgSelectExperienceCoefParams = {
    bindLabelProp: 'ExperienceCoefName',
    bindValueProp: 'ExperienceCoefCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '150px',
    type: 'ExperienceCoef',
  }

  BackGroundColor: any = '#ffe600';
  IdentityNoSearchChangeFlag = false;
  LastNameChangeFlag = false;
  BirthCertificateSerialChangeFlag = false;
  EconomicCodeChangeFlag = false;
  VeteranPercentChangeFlag = false;
  BirthDateSearchChangeFlag = false;
  FatherNameChangeFlag = false;
  BirthPlaceChangeFlag = false;
  ActorNoteChangeFlag = false;
  FirstNameChangeFlag = false;
  BirthCertificateNoChangeFlag = false;
  IssuancePlaceChangeFlag = false;
  AllowStateNameChangeFlag = false;

  AddressChangeFlag = false;
  PostCodeChangeFlag = false;
  FaxChangeFlag = false;
  WebChangeFlag = false;
  EmailChangeFlag = false;
  CellNoChangeFlag = false;

  IsContractorChangeFlag = false;
  IsConsultChangeFlag = false;
  IsProducerChangeFlag = false;
  IsSupplierChangeFlag = false;
  IsInternalBuildersChangeFlag = false;
  IsExternalBuildersChangeFlag = false;
  IsRelatedItems = [
    { IsRelated: 1, RelatedName: 'مرتبط' },
    { IsRelated: 2, RelatedName: 'غیر مرتبط' }]
    ;

  constructor(private Actor: ActorService,
    private Common: CommonService,
    private router: Router,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private RefreshServiceObj: RefreshServices,
    private ComonServices: CommonServices,
    private User: UserSettingsService,
    private Cartable: CartableServices,
    private CommonServic: CommonServices,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService,
    private route: ActivatedRoute,
    private Report: ReportService,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
    this.EvaluatorList = [{ EvaluatorID: '734', EvaluatorName: 'شهرداري تهران' },
    { EvaluatorID: '6978079', EvaluatorName: 'سازمان مديريت' }, { EvaluatorID: '7060739', EvaluatorName: 'شوراي عالي انفورماتيک' },
    { EvaluatorID: '7056530', EvaluatorName: 'وزارت تعاون، کار و رفاه اجتماعی' }];
    this.CertificationEvaluatorList = [
      { CertificationEvaluatorID: 734, CertificationEvaluatorName: 'شهرداری تهران' },
      { CertificationEvaluatorID: 6978079, CertificationEvaluatorName: 'سازمان مدیریت' },
      { CertificationEvaluatorID: 7060739, CertificationEvaluatorName: 'شورای عالی انفورماتیک' },
      { CertificationEvaluatorID: 7056530, CertificationEvaluatorName: 'وزارت تعاون، کار و رفاه اجتماعی' },
      { CertificationEvaluatorID: 6476300, CertificationEvaluatorName: 'سایر' }];
  }
  ngOnInit() {

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;
    this.CheckRegionWritable = this.InputParam && this.InputParam.IsRegionReadOnly;
    this.ButtonsBoxWidth = this.ModuleCode === 2885 || this.ModuleCode === 2893 ? 100 : 50;

    const promise = new Promise((resolve, reject) => {
      this.User.CheckAdminRole1255().subscribe(res => {
        if (res === 1) {
          this.IsAdmin = true;
          resolve(true);
        } else if (res === 2) {
          this.IsAdminTraffic = true;
          resolve(true);
        } else {
          this.IsAdmin = false;
          resolve(true);
        }
        this.User.CheckAdminRole1264().subscribe(ress => {
          this.HaveEvaluationRole = ress;  // RFC 53350
        });
        if (this.IsAdmin) {
          this.BtnClickedName = 'AdminMode';
          this.ShowMessageBoxWithYesNoBtn('آیا تمایل به نمایش فرم در حالت ادمین دارید؟');
        }
        this.ViewTypeChange();
      });
    }).then(() => {
      if (this.IsAdminTraffic === true) {
        this.ActorBusinessAllowStateList = [
          { AllowStateCode: 7, AllowStateName: 'مجاز' },
          { AllowStateCode: 8, AllowStateName: 'غیر مجاز' },
        ];
      } else {
        this.ActorBusinessAllowStateList = [
          { AllowStateCode: 1, AllowStateName: 'ایجاد شده' },
          { AllowStateCode: 2, AllowStateName: 'منتظر بررسی' },
          { AllowStateCode: 3, AllowStateName: 'تایید اولیه' },
          { AllowStateCode: 4, AllowStateName: 'عدم تایید - نقص مدارک' },
          { AllowStateCode: 5, AllowStateName: 'در انتظار تایید نهایی' },
          { AllowStateCode: 6, AllowStateName: 'در انتظار تایید تغییرات و تایید نهایی' },
          { AllowStateCode: 7, AllowStateName: 'مجاز' },
          { AllowStateCode: 8, AllowStateName: 'غیر مجاز' },
          { AllowStateCode: 9, AllowStateName: 'تایید خوداظهاری مالی' },
          { AllowStateCode: 10, AllowStateName: 'تایید خوداظهاری فنی' },
          { AllowStateCode: 11, AllowStateName: 'تاييد مستندات برای انتشار' },
          { AllowStateCode: 12, AllowStateName: 'تاييد کننده کار گروه' },
          { AllowStateCode: 13, AllowStateName: 'تاييد کاربر دبیرخانه' },
          { AllowStateCode: 14, AllowStateName: 'عدم تاييد مستندات برای انتشار' },
          { AllowStateCode: 15, AllowStateName: 'عدم تاييد کار گروه' },
        ];
      }
      this.RankColumn(this.IsAdmin, this.IsAdminTraffic);
    });

    if (this.InputParam) {
      // if (this.InputParam.HaveWF === false) { // 53445
      //   this.IsFromSearch = true;
      // } else {
      //   this.IsFromSearch = false;
      // }
      this.IsFromSearch = this.ModuleCode === 2885 || this.ModuleCode === 2893 ? true : false; // RFC 53349
      this.ShowWorkflowButtons = this.ModuleCode === 2885 || this.ModuleCode === 2893 || this.ModuleCode === 2872
        || (this.InputParam.HasConfirmBtn === false) ? false : true; // RFC 53349 - 54065
      this.ButtonsBoxWidth = this.ModuleCode === 2885 || this.ModuleCode === 2893
        || (this.InputParam.HasConfirmBtn === false) ? 100 : 50; // RFC 54065
      this.IsShowCompleteInfo = this.InputParam.IsShowCompleteInfo;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsContractRemainStartWF = this.InputParam.IsStartWF;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.ReadyToConfirm = this.InputParam.ReadyToConfirm;
      this.ActorId = this.InputParam.ActorId;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.WorkflowTypeName = this.InputParam.WorkflowTypeName;
      this.WorkflowTypeCode = this.InputParam.WorkflowTypeCode;
      this.ObjectNo = this.InputParam.ObjectNo;
      this.ObjectID = this.InputParam.ObjectID;
      this.CartableUserID = this.InputParam.CartableUserID;
      this.MinimumPosting = this.InputParam.MinimumPosting;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.IsManagerInfo = !isUndefined(this.InputParam.IsManagerInfo)
        && this.InputParam.IsManagerInfo ? this.InputParam.IsManagerInfo : false;
      this.CorporateID = !isUndefined(this.InputParam.CorporateID) && this.InputParam.CorporateID ? this.InputParam.CorporateID : null;
    }
    if (this.WorkFlowID) {
      this.ModuleCode = 2784;
      this.FromWorkListCartable = true;
      this.onSearch(this.ObjectID, this.CurrWorkFlow.RegionCode);
    } else if (this.ActorId) {
      this.onSearch(this.ActorId, null);
    } else {
      this.Common.ISExternalUser(false).subscribe(ress => {
        if (ress !== null) {
          this.FindActor(ress);
          this.DisplayBtns = false;
          this.IdentityNoSearch = ress.IdentityNo;
          this.gridHeight = 56;
        } else {
          this.DisplayBtns = true;
          this.gridHeight = 46;
        }
      });
    }

    if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تاييد';
      this.btnConfirmIcon = 'ok';
      // this.HaveConfirm = true;
    }

    if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'عدم تایید';
      this.btnConfirmIcon = 'cancel';
      // this.HaveConfirm = true;
    }

    if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'بازگشت از تاييد نهايي';
      this.btnConfirmIcon = 'cancel';
      // this.HaveConfirm = true;
    }

    if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تاييد نهايي';
      this.btnConfirmIcon = 'ok';
      // this.HaveConfirm = true;
    }
    // forkJoin([
    //   this.Region.GetRegionListforBusinessPattern(),
    //   this.Common.GetPriceListBusinessPatternList(),
    //   this.Common.GetEducationGradeList(),
    // ]).subscribe(res => {
    //   this.RankColumnDef[2].cellEditorParams.Items = res[0];
    //   this.RankColumnDef[4].cellEditorParams.Items = res[1];
    //   this.EduHisColumnDef[1].cellEditorParams.Items = res[2];
    //   // this.MovableColumnDef[1].cellEditorParams.Items = res[0];
    // });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    // ستون هاي گواهينامه
    this.CercolDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'مرجع صادر کننده گواهینامه',
        field: 'CertificationEvaluatorName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 180,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.CertificationEvaluatorParams,
          Items: this.CertificationEvaluatorList,
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CertificationEvaluatorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.CertificationEvaluatorName) {
            params.data.CertificationEvaluatorName = params.newValue.CertificationEvaluatorName;
            params.data.CertificationEvaluatorID = params.newValue.CertificationEvaluatorID;
            if (params.data.CertificationEvaluatorID === 6476300) {
              params.data.CertificationName = 'سایر';
              params.data.CertificationCode = 2;
            } else {
              params.data.CertificationName = '';
              params.data.CertificationCode = null;
              params.data.CertificateRefrence = '';
              params.data.CertificateName = '';
            }
            return true;
          } else {
            params.data.CertificationEvaluatorName = '';
            params.data.CertificationEvaluatorID = null;
            return false;
          }
        },
      },
      {
        headerName: 'گواهینامه',
        field: 'CertificationName',
        editable: (event) => {
          if (!this.IsEditable || event.data.CertificationEvaluatorID === 6476300) {
            return false;
          } else {
            return true;
          }
        },
        width: 180,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.CertificationParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CertificationName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.CertificationName) {
            params.data.CertificationName = params.newValue.CertificationName;
            params.data.CertificationCode = params.newValue.CertificationCode;
            return true;
          } else {
            params.data.CertificationName = '';
            params.data.CertificationCode = null;
            return false;
          }
        },
      },
      {
        headerName: 'مرجع صادرکننده',
        field: 'CertificateRefrence',
        width: 120,
        resizable: true,
        editable: (event) => {
          if (this.IsEditable || event.data.CertificationEvaluatorID === 6476300) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'گواهینامه',
        field: 'CertificateName',
        width: 120,
        resizable: true,
        editable: (event) => {
          if (this.IsEditable || event.data.CertificationEvaluatorID === 6476300) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'تاريخ شروع',
        field: 'CertificatePersianDate',
        width: 130,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'CertificatePersianDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'تاريخ انقضا',
        field: 'CertificatePersianEndDate',
        width: 130,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'CertificatePersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'توضيحات',
        field: 'Note',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 380,
        resizable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 100,
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
    ];
    // ستون هاي جدول سوابق تحصیلی
    this.EduHisColumnDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مقطع',
        field: 'GradeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.EduHisGradeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.GradeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.GradeName) {
            params.data.GradeName = params.newValue.GradeName;
            params.data.GradeCode = params.newValue.GradeCode;
            return true;
          } else {
            params.data.GradeName = '';
            params.data.GradeCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 150,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'رشته',
        field: 'FieldName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 300,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.FieldParams,
          Items: [],
          MoreFunc: this.FetchMoreField,
          FetchByTerm: this.FetchFieldByTerm,
          RedioChangeFunc: this.RedioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.FieldName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.FieldName) {
            params.data.FieldName = params.newValue.FieldName;
            params.data.FieldCode = params.newValue.FieldCode;
            return true;
          } else {
            params.data.FieldName = '';
            params.data.FieldCode = null;
            return false;
          }
        },
      },
      {
        headerName: 'دانشگاه',
        field: 'UniversityName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 300,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.UniversityParams,
          Items: [],
          MoreFunc: this.FetchMoreUniversity,
          FetchByTerm: this.FetchUniversityByTerm,
          RedioChangeFunc: this.RadioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.UniversityName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.UniversityName) {
            params.data.UniversityName = params.newValue.UniversityName;
            params.data.UniversityCode = params.newValue.UniversityCode;
            return true;
          } else {
            params.data.UniversityName = '';
            params.data.UniversityCode = null;
            return false;
          }
        },
      },
      {
        headerName: 'از سال',
        field: 'FromYear',
        HaveThousand: false,
        width: 90,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 4 },
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
            params.data.FromYear = params.newValue;
          }
        },
      },
      {
        headerName: 'تا سال',
        field: 'ToYear',
        HaveThousand: false,
        width: 90,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 4 },
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
            params.data.ToYear = params.newValue;
          }
        },
      },
      {
        headerName: 'تاریخ اخذ مدرک',
        field: 'PersianEducationDate',
        width: 100,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEducationDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.for-append-dates'
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
            params.data.ShortEducationDate = params.newValue.MDate;
            params.data.PersianEducationDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortEducationDate = null;
            params.data.PersianEducationDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'مرتبط/غیر مرتبط',
        field: 'RelatedName',
        cellEditorFramework: NgSelectCellEditorComponent,
        hide: false,
        cellEditorParams: {
          HardCodeItems: this.IsRelatedItems,
          bindLabelProp: 'RelatedName',
          bindValueProp: 'IsRelated'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RelatedName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RelatedName) {
            params.data.RelatedName = params.newValue.RelatedName;
            params.data.IsRelated = params.newValue.IsRelated;
            return true;
          } else {
            params.data.RelatedName = '';
            params.data.IsRelated = null;
            return false;
          }
        },
        editable: true,
        width: 150,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 100,
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
    ];
    // ستون هاي سوابق شغلي
    this.colDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام موسسه/شرکت/دانشگاه',
        field: 'EmployerName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 200,
        resizable: true
      },
      {
        headerName: 'تلفن محل خدمت',
        field: 'EmployerTel',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'سمت',
        field: 'Position',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 130,
        resizable: true
      },
      {
        headerName: 'رسته کاري',
        field: 'Category',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع',
        field: 'ManagementTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectManagementTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ManagementTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ManagementTypeCode) {
            params.data.ManagementTypeCode = params.newValue.ManagementTypeCode;
            params.data.ManagementTypeName = params.newValue.ManagementTypeName;
            params.data.ResponsibilityTypeName = '';
            params.data.ResponsibilityTypeCode = null;
            return true;
          } else {
            params.data.ManagementTypeCode = null;
            params.data.ManagementTypeName = '';
            params.data.ResponsibilityTypeName = '';
            params.data.ResponsibilityTypeCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع مسئولیت',
        field: 'ResponsibilityTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectResponsibilityTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ResponsibilityTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ResponsibilityTypeCode) {
            params.data.ResponsibilityTypeName = params.newValue.ResponsibilityTypeName;
            params.data.ResponsibilityTypeCode = params.newValue.ResponsibilityTypeCode;
            return true;
          } else {
            params.data.ResponsibilityTypeName = '';
            params.data.ResponsibilityTypeCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 150,
        resizable: true
      },
      {
        headerName: 'رسته مرتبط',
        field: 'ExperienceCoefName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectExperienceCoefParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ExperienceCoefName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ExperienceCoefCode) {
            params.data.ExperienceCoefName = params.newValue.ExperienceCoefName;
            params.data.ExperienceCoefCode = params.newValue.ExperienceCoefCode;
            return true;
          } else {
            params.data.ExperienceCoefName = '';
            params.data.ExperienceCoefCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 150,
        resizable: true
      },
      {
        headerName: 'مرتبط/غیر مرتبط',
        field: 'RelatedName',
        cellEditorFramework: NgSelectCellEditorComponent,
        hide: false,
        cellEditorParams: {
          HardCodeItems: this.IsRelatedItems,
          bindLabelProp: 'RelatedName',
          bindValueProp: 'IsRelated'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RelatedName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RelatedName) {
            params.data.RelatedName = params.newValue.RelatedName;
            params.data.IsRelated = params.newValue.IsRelated;
            return true;
          } else {
            params.data.RelatedName = '';
            params.data.IsRelated = null;
            return false;
          }
        },
        editable: true,
        width: 150,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'نشاني',
        field: 'Address',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 380,
        resizable: true
      },
      {
        headerName: 'از تاريخ',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'تا تاريخ',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'مستندات',
        field: '',
        width: 100,
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
    ];
    // ستون هاي اموال غير منقول
    this.ImmovablePropertyColDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'نوع ملک',
        field: 'EstateTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectEStParams,
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
          if (params.newValue && params.newValue.EstateTypeCode) {
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
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع کاربري',
        field: 'InvestUsageTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectIUTParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.InvestUsageTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.InvestUsageTypeCode) {
            params.data.InvestUsageTypeCode = params.newValue.InvestUsageTypeCode;
            params.data.InvestUsageTypeName = params.newValue.InvestUsageTypeName;
            return true;
          } else {
            params.data.InvestUsageTypeCode = null;
            params.data.InvestUsageTypeName = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 100,
        resizable: true
      },
      {
        headerName: 'نشاني',
        field: 'Address',
        width: 300,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },

      {
        headerName: 'توضیحات تایید کننده',
        field: 'ActorNote',
        width: 300,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },


      {
        headerName: 'کدپستي ده رقمي',
        field: 'PostCode',
        width: 150,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 10 },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
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
        headerName: 'مساحت به متر مربع',
        field: 'Area',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 10 },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
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
        headerName: 'نوع تملک',
        field: 'OwnershipTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.OwnershipTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.OwnershipTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.OwnershipTypeCode) {
            params.data.OwnershipTypeCode = params.newValue.OwnershipTypeCode;
            params.data.OwnershipTypeName = params.newValue.OwnershipTypeName;
            return true;
          } else {
            params.data.OwnershipTypeCode = null;
            params.data.OwnershipTypeName = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'به نام؟',
        field: 'PropertyTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.PropertyTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PropertyTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PropertyTypeCode) {
            params.data.PropertyTypeCode = params.newValue.PropertyTypeCode;
            params.data.PropertyTypeName = params.newValue.PropertyTypeName;
            return true;
          } else {
            params.data.PropertyTypeCode = null;
            params.data.PropertyTypeName = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'توضيحات',
        field: 'Note',
        width: 300,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 100,
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
    ];
    // ستون هاي اطلاعات حساب بانکي
    this.ActorBankColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'بانک ',
        field: 'BankName',
        width: 200,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Common.GetAllBank(),
          bindLabelProp: 'BankName',
          bindValueProp: 'BankID',
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BankName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          params.data.BranchID = null;
          params.data.BranchName = null;
          if (params.newValue && params.newValue.BankName) {
            params.data.BankName = params.newValue.BankName;
            params.data.BankID = params.newValue.BankID;
            return true;
          } else {
            params.data.BankName = null;
            params.data.BankID = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        resizable: true,
      },
      {
        headerName: 'شعبه ',
        field: 'BranchName',
        width: 200,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectPersonParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BranchName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.BranchName) {
            params.data.BranchName = params.newValue.BranchName;
            params.data.BranchID = params.newValue.BranchID;
            return true;
          } else {
            params.data.BranchName = null;
            params.data.BranchID = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        resizable: true
      },
      {
        headerName: 'شماره حساب',
        field: 'AccNo',
        width: 250,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        resizable: true
      },
      {
        headerName: 'استان',
        field: 'StateName',
        width: 200,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Common.GetAllState(),
          bindLabelProp: 'StateName',
          bindValueProp: 'StateCode',
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.StateName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          params.data.CityID = null;
          params.data.CityName = null;
          if (params.newValue && params.newValue.StateName) {
            params.data.StateName = params.newValue.StateName;
            params.data.StateCode = params.newValue.StateCode;
            return true;
          } else {
            params.data.StateName = null;
            params.data.StateCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        resizable: true
      },
      {
        headerName: 'شهر',
        field: 'CityName',
        width: 200,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectCityParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CityName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.CityName) {
            params.data.CityName = params.newValue.CityName;
            params.data.CityID = params.newValue.CityID;
            return true;
          } else {
            params.data.CityName = null;
            params.data.CityID = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        resizable: true
      },
    ];
    this.TrainingCourseColDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'نام دوره',
        field: 'TrainingCourseName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 90,
        resizable: true
      },
      {
        headerName: 'مدت دوره به ساعت',
        field: 'TrainingCourseDuration',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'تاريخ شروع دوره',
        field: 'PersianStartDate',
        width: 110,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'تاريخ پايان دوره',
        field: 'PersianEndDate',
        width: 110,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'برگزارکننده ',
        field: 'Institute',
        width: 100,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'توضيحات ',
        field: 'Note',
        width: 400,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 100,
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
    ];
    this.RankColumn(this.IsAdmin, this.IsAdminTraffic);
  }
  RankColumn(IsAdmin, IsAdminTraffic) {
    this.RankColumnDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'وضعیت ',
        field: 'AllowStateName',
        width: 120,
        resizable: true,
        editable: () => {
          if (((this.IsAdmin && !this.IsFromSearch) || this.IsAdminTraffic) && this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.ActorBusinessAllowStateParams,
          Items: this.ActorBusinessAllowStateList,
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.AllowStateName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.AllowStateName) {
            params.data.AllowStateName = params.newValue.AllowStateName;
            params.data.AllowStateCode = params.newValue.AllowStateCode;
            return true;
          } else {
            params.data.AllowStateName = '';
            params.data.AllowStateCode = null;
            return false;
          }
        },
      },
      {
        headerName: 'تغییر وضعیت',
        field: '',
        width: 100,
        sortable: false,
        resizable: false,
        hide: IsAdmin ? false : this.IsAdminTraffic ? false : true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.AllowStateCodeUpdate,
        }
      },
      {
        headerName: 'توضیحات تغییر وضعیت',
        field: 'AllowStateCodeUpdateDec',
        width: 200,
        resizable: true,
        hide: IsAdmin ? false : this.IsAdminTraffic ? false : true,
        // editable: (event) => {
        //   if (((this.IsAdmin && !this.IsFromSearch) || (this.IsAdminTraffic && event.data.AllowStateCode === 7)) && this.IsEditable) {
        //     if (this.HaveNotAllowEditFirstInf) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   } else {
        //     return false;
        //   }
        // }
      },
      {
        headerName: 'ظرفیت تعدادی اضافی ',
        field: 'ExtraQtyCapacity',
        width: 130,
        resizable: true,
        editable: true,
        hide: this.ModuleCode === 2893 ? false : true,
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
        headerName: 'ظرفیت ریالی اضافی ',
        field: 'ExtraAmountCapacity',
        width: 120,
        resizable: true,
        editable: true,
        hide: this.ModuleCode === 2893 ? false : true,
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
        headerName: 'واحد اجرايي',
        field: 'RegionName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRegionParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionName;
          } else {
            return '';
          }
        },
        hide: true,
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RegionName) {
            params.data.RegionName = params.newValue.RegionName;
            params.data.RegionCode = params.newValue.RegionCode;
            params.data.BusinessPatternID = null;
            params.data.BusinessPatternNoName = '';
            params.data.PriceListTopicID = null;
            params.data.PriceListTopicName = '';
            params.data.Rank = '';
            return true;
          } else {
            params.data.RegionName = '';
            params.data.RegionCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 200,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'محل هزینه',
        field: 'UnitTopicName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            if (this.CanEdite) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 200,
        resizable: true,
        //  hide: this.ModuleViewTypeCode === 3,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.VWExeUnitParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.UnitTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.UnitTopicName) {
            if (params.data.UnitPatternID !== params.newValue.UnitPatternID) {
              params.data.BusinessPatternNoName = '';
              params.data.PriceListTopicName = '';
              params.data.BusinessPatternID = null;
              params.data.PriceListTopicID = null;
            }
            params.data.UnitTopicName = params.newValue.UnitTopicName;
            params.data.UnitPatternID = params.newValue.UnitPatternID;
            params.data.RegionCode = params.newValue.RegionCode;
            return true;
          } else {
            params.data.UnitTopicName = '';
            params.data.UnitPatternID = null;
            params.data.RegionCode = null;
            return false;
          }
        },
      },
      {
        headerName: 'تخصص',
        field: 'BusinessPatternNoName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            if (this.CanEdite) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 330,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.BusinessPatternParams,
          Items: [],
          MoreFunc: this.FetchMoreBusinessPattern,
          FetchByTerm: this.FetchBusinessPatternByTerm,
          RedioChangeFunc: this.RedioSelectedChangeBusinessPattern,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BusinessPatternNoName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.BusinessPatternNoName) {
            params.data.BusinessPatternNoName = params.newValue.BusinessPatternNoName;
            params.data.BusinessPatternID = params.newValue.BusinessPatternID;
            params.data.PriceListTopicID = null;
            params.data.PriceListTopicName = '';
            params.data.Rank = '';
            return true;
          } else {
            params.data.BusinessPatternNoName = '';
            params.data.BusinessPatternID = null;
            return false;
          }
        },
      },
      {
        headerName: 'رشته',
        field: 'PriceListTopicName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            if (this.CanEdite) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 200,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.GradeParams,
          Items: [],
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
          if (params.newValue && params.newValue.PriceListTopicName) {
            params.data.PriceListTopicName = params.newValue.PriceListTopicName;
            params.data.PriceListTopicID = params.newValue.PriceListTopicID;
            params.data.Rank = '';
            return true;
          } else {
            params.data.PriceListTopicName = '';
            params.data.PriceListTopicID = null;
            return false;
          }
        },
      },
      {
        headerName: 'رتبه ',
        field: 'Rank',
        HaveThousand: false,
        width: 60,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            if (this.CanEdite) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 1 },
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
            params.data.Rank = params.newValue;
          }
        },
      },
      {
        headerName: 'مرجع صادرکننده گواهينامه',
        field: 'EvaluatorName',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            if (this.CanEdite) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 150,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.EvaluatorParams,
          Items: this.EvaluatorList,
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.EvaluatorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.EvaluatorName) {
            params.data.EvaluatorName = params.newValue.EvaluatorName;
            params.data.EvaluatorID = params.newValue.EvaluatorID;
            return true;
          } else {
            params.data.EvaluatorName = '';
            params.data.EvaluatorID = null;
            return false;
          }
        },
      },
      {
        headerName: ' شروع اعتبار',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
        editable: (params) => {
          if (params.data.UnitPatternID === 2371 &&
            params.data.BusinessPatternID === 4924 &&
            ((isUndefined(params.data.ActorBusinessID) ||
              params.data.ActorBusinessID === null ||
              params.data.ActorBusinessID <= 0) || !params.data.IsOlder)
            && this.ModuleViewTypeCode !== 7) {
            return false;
          } else if (this.ModuleViewTypeCode === 7) {
            return true;
          } else {
            if (this.IsEditable) {
              return true;
            } else {
              if (this.CanEdite) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'تاريخ  انقضا',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: (params) => {
          if (params.data.UnitPatternID === 2371 &&
            params.data.BusinessPatternID === 4924 &&
            ((isUndefined(params.data.ActorBusinessID) ||
              params.data.ActorBusinessID === null ||
              params.data.ActorBusinessID <= 0) || !params.data.IsOlder)
            && this.ModuleViewTypeCode !== 7) {
            return false;
          } else if (this.ModuleViewTypeCode === 7) {
            return true;
          } else {
            if (this.IsEditable) {
              return true;
            } else {
              if (this.CanEdite) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-dates'
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
        headerName: 'توضيحات',
        field: 'Note',
        width: 250,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            if (this.CanEdite) {
              return true;
            } else {
              return false;
            }
          }
        },
      },
      {
        headerName: ' بارگذاری مدارک رتبه',
        field: '',
        width: 100,
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
      { // RFC 52469
        headerName: 'اموال منقول',
        field: '',
        width: 120,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.MovableProperty,
        }
      },
      { // RFC 52927
        headerName: 'جزئیات گردش',
        field: '',
        width: 100,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.WorkLogDetail,
        }
      },
      {
        headerName: 'چاپ گردش',
        field: '',
        width: 100,
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
        headerName: 'گردش کار جاری',
        field: 'HasOpenWF',
        width: 100,
        resizable: false,
        editable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.HasOpenWF
        },
      },
      {
        headerName: 'کمیسیون برنده',
        field: '',
        width: 100,
        resizable: false,
        tooltip: (params) => 'تاریخچه کمیسیون برنده',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowContractorwinercommition,
        }
      },
      {
        headerName: 'تاریخچه',
        field: '',
        width: 80,
        resizable: false,
        tooltip: (params) => 'لیست تاریخچه',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowHistoryList,
        }
      }
    ];
  }
  onellEditingStartedAC(event) {
    if (event.colDef && event.colDef.field === 'CertificationName') {
      this.Common.GetAllCertification(event.data.CertificationEvaluatorID).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Certification'
        });
      });
    }
  }
  FindActor(res: any) {
    this.PersonObject = null;
    this.FirstName = '';
    this.LastName = '';
    this.IdentityNo = '';
    this.BirthDate = '';
    this.BirthDateSearch = '';
    this.Address = '';
    this.Tel = '';
    this.Cell = '';
    this.Email = '';
    this.Web = '';
    this.PostCode = '';
    this.UserImage = '';
    this.IsContractor = false;
    this.IsConsult = false;
    this.IsProducer = false;
    this.IsProducer = false;
    this.EconomicCode = '';
    this.Validate = true;
    this.rowData = [];
    this.MovablerowsData = [];
    this.EduHisrowsData = [];
    this.RankrowsData = [];
    this.ImmovablePropertyRows = [];
    this.TrainingCourseRows = [];
    this.CerrowData = [];
    this.PersianBirthDate = '';
    this.BirthCertificateNo = '';
    this.BirthCertificateSerial = '';
    this.BirthPlace = '';
    this.IssuancePlace = '';
    this.WorkAddress = '';
    this.WorkTel = '';
    this.WorkPostCode = '';
    this.Cell2 = '';
    this.VeteranPercent = '';
    this.ActorNote = '';

    if (res) {
      this.PersonObject = res; // کل آبجکت شخص و اکتور
      this.Validate = res.Validate;
      this.ActorId = res.ActorId;
      this.FirstName = res.FirstName;
      this.LastName = res.LastName;
      this.IdentityNo = res.IdentityNo;
      this.BirthDate = res.ShortBirthDate;
      this.EconomicCode = res.EconomicCode;
      this.Address = res.Address;
      this.Tel = res.Tel;
      this.Cell = res.Cell;
      this.Email = res.Email;
      this.Web = res.Web;
      this.PostCode = res.PostCode;
      this.IsContractor = res.IsContractor;
      this.IsConsult = res.IsConsult;
      this.IsProducer = res.IsProducer;
      this.IsSupplier = res.IsSupplier ? res.IsSupplier : false;
      this.IsInternalBuilders = res.IsInternalBuilders ? res.IsInternalBuilders : false;
      this.IsExternalBuilders = res.IsExternalBuilders ? res.IsExternalBuilders : false;
      this.IsSupplier = false;
      this.IsInternalBuilders = false;
      this.IsExternalBuilders = false;
      this.UserImage = this.ComonServices._arrayBufferToBase64(res.Image);
      this.rowData = res.WorkExperienceList;
      this.RankrowsData = res.ActorBusinessList;
      this.EduHisrowsData = res.EducationHistoryList;
      this.ImmovablePropertyRows = res.ImmovablePropertyList;
      this.MovablerowsData = res.MovableAssetList;
      this.CerrowData = res.ActorCertificateList;
      this.IsArchive = true;
      this.BankrowData = res.ActorBankAccList;
      this.TrainingCourseRows = res.TrainingCourseList;
      this.UserLocalImage = res.DecImage;
      this.PersianBirthDate = res.PersianBirthDate;
      this.FatherName = res.FatherName;
      this.BirthCertificateNo = res.BirthCertificateNo;
      this.BirthCertificateSerial = res.BirthCertificateSerial;
      this.BirthPlace = res.BirthPlace;
      this.IssuancePlace = res.IssuancePlace;
      this.WorkAddress = res.WorkAddress;
      this.WorkTel = res.WorkTel;
      this.WorkPostCode = res.WorkPostCode;
      this.Cell2 = res.Cell2;
      this.VeteranPercent = res.VeteranPercent;
      this.ActorNote = res.ActorNote;

      if (!this.WorkFlowID && res.ActorBusinessList.length > 0) { // RFC 53083 و هماهنگی با آقای آخوندی
        if (this.IsAdmin && this.ModuleCode !== 2893 && this.ModuleCode !== 2885
          && (!this.InputParam || this.InputParam.ModuleViewTypeCode !== 300000)) {
          this.ModuleViewTypeCode = 1;
          this.ViewTypeChange();
        } else {
          let HasOpenWF = false;
          res.ActorBusinessList.forEach(element => {
            if (element.HasOpenWF) {
              HasOpenWF = true;

            }
          });
          if (HasOpenWF && this.ModuleCode !== 2893 && this.ModuleCode !== 2885
            && (!this.InputParam || this.InputParam.ModuleViewTypeCode !== 300000)) {
            if (this.ModuleCode === 2784) {
              this.ModuleViewTypeCode = 400000;
            } else {
              this.ModuleViewTypeCode = 2;
            }
            this.ViewTypeChange();
          }
        }
      }
      this.SetChangeFlag();
    }
  }
  OnBirthDateChange(ADate) {
    this.BirthDateSearch = ADate.MDate;
  }
  onSearch(PersonID = null, RegionCode = null) {
    this.PersonObject = null;
    this.FirstName = '';
    this.LastName = '';
    this.IdentityNo = '';
    this.BirthDate = '';
    this.BirthDateSearch = '';
    this.Address = '';
    this.Tel = '';
    this.Cell = '';
    this.AllowStateName = '';
    this.Email = '';
    this.Web = '';
    this.PostCode = '';
    this.UserImage = '';
    this.IsContractor = false;
    this.IsConsult = false;
    this.IsProducer = false;
    this.IsSupplier = false;
    this.IsInternalBuilders = false;
    this.IsExternalBuilders = false;
    this.EconomicCode = '';
    this.Validate = true;
    this.rowData = [];
    this.MovablerowsData = [];
    this.EduHisrowsData = [];
    this.RankrowsData = [];
    this.ImmovablePropertyRows = [];
    this.TrainingCourseRows = [];
    this.CerrowData = [];
    this.PersianBirthDate = '';
    this.BirthCertificateNo = '';
    this.BirthCertificateSerial = '';
    this.BirthPlace = '';
    this.IssuancePlace = '';
    this.WorkAddress = '';
    this.WorkTel = '';
    this.WorkPostCode = '';
    this.Cell2 = '';
    this.VeteranPercent = '';
    this.ActorNote = '';

    this.Actor.GetPersonByIdentityNo(this.IdentityNoSearch, PersonID, RegionCode).subscribe(res2 => {
      if (res2) {
        this.DisplaySearchBox = false;
        this.ContentHeight = 97;
        this.PersonObject = res2; // کل آبجکت شخص و اکتور
        this.Validate = res2.Validate;
        this.ActorId = res2.ActorId;
        this.FirstName = res2.FirstName;
        this.LastName = res2.LastName;
        this.FatherName = res2.FatherName;
        this.IdentityNo = res2.IdentityNo;
        this.BirthDate = res2.ShortBirthDate;
        this.BirthCertificateNo = res2.BirthCertificateNo;
        this.BirthCertificateSerial = res2.BirthCertificateSerial;
        this.BirthPlace = res2.BirthPlace;
        this.IssuancePlace = res2.IssuancePlace;
        this.EconomicCode = res2.EconomicCode;
        this.WorkAddress = res2.WorkAddress;
        this.WorkTel = res2.WorkTel;
        this.WorkPostCode = res2.WorkPostCode;
        this.Cell2 = res2.Cell2;
        this.Address = res2.Address;
        this.AllowStateName = res2.AllowStateName;
        this.Tel = res2.Tel;
        this.Cell = res2.Cell;
        this.Email = res2.Email;
        this.Web = res2.Web;
        this.PostCode = res2.PostCode;
        this.IsContractor = res2.IsContractor;
        this.IsConsult = res2.IsConsult;
        this.IsProducer = res2.IsProducer;
        this.IsSupplier = res2.IsSupplier ? res2.IsSupplier : false;
        this.IsInternalBuilders = res2.IsInternalBuilders ? res2.IsInternalBuilders : false;
        this.IsExternalBuilders = res2.IsExternalBuilders ? res2.IsExternalBuilders : false;
        this.UserImage = this.ComonServices._arrayBufferToBase64(res2.Image);
        this.rowData = res2.WorkExperienceList;
        this.RankrowsData = res2.ActorBusinessList;
        this.EduHisrowsData = res2.EducationHistoryList;
        this.ImmovablePropertyRows = res2.ImmovablePropertyList;
        this.MovablerowsData = res2.MovableAssetList;
        this.CerrowData = res2.ActorCertificateList;
        this.IsArchive = true;
        this.BankrowData = res2.ActorBankAccList;
        this.TrainingCourseRows = res2.TrainingCourseList;
        this.UserLocalImage = res2.DecImage;
        this.PersianBirthDate = res2.PersianBirthDate;
        this.VeteranPercent = res2.VeteranPercent;
        this.ActorNote = res2.ActorNote;


        if (res2.CompanyGradeCode) {
          this.OnOpenNgSelect('CompanyGrade', res2.CompanyGradeCode);
        }
        if (res2.DegreeScoreCode) {
          this.OnOpenNgSelect('DegreeScore', res2.DegreeScoreCode);
        }
        if (res2.CriterionScoreCode) {
          this.OnOpenNgSelect('CriterionScore', res2.CriterionScoreCode);
        }
        if (res2.HaveApprovalCertificateCode) {
          this.OnOpenNgSelect('ApprovalCertificate', res2.HaveApprovalCertificateCode);
        }
        if (res2.NativenessOfCompanyCode) {
          this.OnOpenNgSelect('NativenessCopmany', res2.NativenessOfCompanyCode);
        }
        if (res2.TechnicalCommitionViewCode) {
          this.OnOpenNgSelect('CommitionView', res2.TechnicalCommitionViewCode);
        }
        if (res2.ProposalQualityCode) {
          this.OnOpenNgSelect('ProposalQuality', res2.ProposalQualityCode);
        }
        if (res2.PreviousEmployerReceiptCode) {
          this.OnOpenNgSelect('EmployerReceipt', res2.PreviousEmployerReceiptCode);
        }
        if (res2.SimilarWorkExperienceCode) {
          this.OnOpenNgSelect('ExperienceScore', res2.SimilarWorkExperienceCode);
        }
        if (res2.CooperationHistoryCode) {
          this.OnOpenNgSelect('CooperationHistory', res2.CooperationHistoryCode);
        }
        if (res2.WorkExperienceScoreCode) {
          this.OnOpenNgSelect('ExperienceScore', res2.WorkExperienceScoreCode);
        }

        if (!this.WorkFlowID && res2.ActorBusinessList.length > 0) { // RFC 53083 و هماهنگی با آقای آخوندی
          if (this.IsAdmin && this.ModuleCode !== 2893 && this.ModuleCode !== 2885
            && (!this.InputParam || this.InputParam.ModuleViewTypeCode !== 300000)) {
            this.ModuleViewTypeCode = 1;
            this.ViewTypeChange();
          } else {
            let HasOpenWF = false;
            res2.ActorBusinessList.forEach(element => {
              if (element.HasOpenWF) {
                HasOpenWF = true;

              }
            });
            if (HasOpenWF && this.ModuleCode !== 2893 && this.ModuleCode !== 2885
              && (!this.InputParam || this.InputParam.ModuleViewTypeCode !== 300000)) {
              if (this.ModuleCode === 2784) {
                this.ModuleViewTypeCode = 400000;
              } else {
                this.ModuleViewTypeCode = 2;
              }
              this.ViewTypeChange();
            }
          }
        }
        this.SetChangeFlag();
      } else {
        this.ShowMessageBoxWithOkBtn('اطلاعات شخص در سيستم يافت نشد لطفا استعلام بگيريد');
      }
    });
  }
  onSearchInquiry() {
    if (!this.IdentityNoSearch) {
      this.ShowMessageBoxWithOkBtn('شناسه ملی نمی تواند خالی باشد');
    }
    if (!this.PostCodeSearch) {
      this.ShowMessageBoxWithOkBtn('کد پستی نمی تواند خالی باشد');
    }
    if (!this.BirthDateSearch) {
      this.ShowMessageBoxWithOkBtn('تاریخ تولد نمی تواند خالی باشد');
    }
    this.Validate = true;
    this.PersonObject = null; // کل آبجکت شخص و اکتور
    this.FirstName = '';
    this.LastName = '';
    this.IdentityNo = '';
    this.BirthDate = '';
    this.Address = '';
    this.Tel = '';
    this.Cell = '';
    this.Email = '';
    this.AllowStateName = '';
    this.Web = '';
    this.PostCode = '';
    this.IsContractor = false;
    this.IsConsult = false;
    this.IsProducer = false;
    this.IsSupplier = false;
    this.IsInternalBuilders = false;
    this.IsExternalBuilders = false;
    this.FatherName = '';
    this.BirthCertificateNo = '';
    this.BirthCertificateSerial = '';
    this.IssuancePlace = '';
    this.BirthPlace = '';
    this.WorkAddress = '';
    this.WorkTel = '';
    this.WorkPostCode = '';
    this.Cell2 = '';
    this.VeteranPercent = '';
    this.UserImage = null;
    this.rowData = [];
    this.ActorNote = [];

    this.Actor.GetActorByIdentityNo(this.IdentityNoSearch, this.BirthDateSearch, true, this.PostCodeSearch).subscribe(res => {
      if (res) {
        this.PersonObject = res; // کل آبجکت شخص و اکتور
        this.DisplaySearchBox = false;
        this.ContentHeight = 97;
        this.FindActor(this.PersonObject);
      }
    });
  }
  RedioClick(data) {

  }
  onWFSave() {
    if (this.PersonObject) {
      this.DisplaySearchBox = false;
      if (this.WorkFlowID) {
        this.ModuleCode = 2784;
        this.FromWorkListCartable = true;
      }
      const ActorBusinessList = [];
      this.RankgridApi.stopEditing();
      this.RankgridApi.forEachNode(node => {
        const Rankobj = {
          ActorBusinessID: node.data.ActorBusinessID ? node.data.ActorBusinessID : -1,
          ActorId: node.data.ActorId,
          // tslint:disable-next-line: max-line-length
          StartDate: node.data.PersianStartDate && node.data.PersianStartDate.MDate ? node.data.PersianStartDate.MDate : (node.data.ShortStartDate ? node.data.ShortStartDate : null),
          // tslint:disable-next-line: max-line-length
          EndDate: node.data.PersianEndDate && node.data.PersianEndDate.MDate ? node.data.PersianEndDate.MDate : (node.data.ShortEndDate ? node.data.ShortEndDate : null),
        };
        ActorBusinessList.push(Rankobj);
      });

      this.Actor.UpdatePersonOnWFSave(
        this.PersonObject,
        ActorBusinessList,
        this.FromWorkListCartable
      ).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
      });
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا شخص را انتحاب نمایید');
      return;
    }
  }
  onSave() {
    this.BtnClickedName = 'BtnSave';
    if (!this.CanSave) {
      this.ShowMessageBoxWithYesNoBtn('با ثبت اطلاعات  ممکن است وضعیت حوزه تخصصی تغییر نمایید . آیا مایل به ادامه هستید؟');
      return;
    }

    this.BankgridApi.stopEditing();
    this.BankrowData = [];
    this.BankgridApi.forEachNode(res => {
      this.BankrowData.push(res.data);
    });
    this.RankgridApi.stopEditing();
    this.EduHisgridApi.stopEditing();
    // this.MovablegridApi.stopEditing();
    this.gridApiIP.stopEditing();
    this.CergridApi.stopEditing();
    const MovableAssetList = [];
    const ActorBusinessList = [];
    const EducationHistoryList = [];
    const ImmovablePropertyList = [];
    const CertificateList = [];
    if (this.PersonObject) {
      // this.PersonObject.IdentityNo = this.IdentityNoSearch;
      this.PersonObject.BirthDate = this.BirthDate;
      // this.PersonObject.FirstName = this.FirstName;
      // this.PersonObject.LastName = this.LastName;
      // this.PersonObject.web = this.Web;
      this.PersonObject.PostCode = this.PostCode;
      this.PersonObject.Tel = this.Tel;
      this.PersonObject.Cell = this.Cell;
      this.PersonObject.Email = this.Email;
      this.PersonObject.Address = this.Address;
      this.PersonObject.IsContractor = this.IsContractor ? true : false;
      this.PersonObject.IsConsult = this.IsConsult ? true : false;
      this.PersonObject.IsProducer = this.IsProducer ? true : false;
      this.PersonObject.IsSupplier = this.IsSupplier;
      this.PersonObject.IsInternalBuilders = this.IsInternalBuilders;
      this.PersonObject.IsExternalBuilders = this.IsExternalBuilders;
      this.PersonObject.ActorBankAccList = this.BankrowData;
      this.PersonObject.CompanyGradeCode = this.CompanyGradeParams.selectedObject;
      this.PersonObject.DegreeScoreCode = this.DegreeScoreParams.selectedObject;
      this.PersonObject.CriterionScoreCode = this.CriterionScoreParams.selectedObject;
      this.PersonObject.HaveApprovalCertificateCode = this.ApprovalCertificateParams.selectedObject;
      this.PersonObject.NativenessOfCompanyCode = this.NativenessCopmanyParams.selectedObject;
      this.PersonObject.TechnicalCommitionViewCode = this.CommitionViewParams.selectedObject;
      this.PersonObject.ProposalQualityCode = this.ProposalQualityParams.selectedObject;
      this.PersonObject.PreviousEmployerReceiptCode = this.EmployerReceiptParams.selectedObject;
      this.PersonObject.SimilarWorkExperienceCode = this.ExperienceScoreParams.selectedObject;
      this.PersonObject.CooperationHistoryCode = this.CooperationHistoryParams.selectedObject;
      this.PersonObject.BirthCertificateNo = this.BirthCertificateNo;
      this.PersonObject.FatherName = this.FatherName;
      this.PersonObject.BirthCertificateSerial = this.BirthCertificateSerial;
      this.PersonObject.BirthPlace = this.BirthPlace;
      this.PersonObject.IssuancePlace = this.IssuancePlace;
      this.PersonObject.WorkAddress = this.WorkAddress;
      this.PersonObject.WorkTel = this.WorkTel;
      this.PersonObject.WorkPostCode = this.WorkPostCode;
      this.PersonObject.Cell2 = this.Cell2;
      this.PersonObject.VeteranPercent = this.VeteranPercent;
      this.PersonObject.ActorNote = this.ActorNote;


      this.CergridApi.forEachNode(item => {
        const obj = {
          CertificateID: item.data.CertificateID ? item.data.CertificateID : -1,
          CertificateDate: (item.data.CertificatePersianDate && item.data.CertificatePersianDate.MDate)
            ? item.data.CertificatePersianDate.MDate : (item.data.ShortCertificateDate ? item.data.ShortCertificateDate : null),
          CertificateEndDate: (item.data.CertificatePersianEndDate && item.data.CertificatePersianEndDate.MDate)
            ? item.data.CertificatePersianEndDate.MDate : (item.data.ShortCertificateEndDate ? item.data.ShortCertificateEndDate : null),
          CertificateRefrence: item.data.CertificateRefrence,
          Note: item.data.Note,
          ActorId: this.ActorId ? this.ActorId : -1,
          CertificationCode: item.data.CertificationCode,
          CertificateName: item.data.CertificateName,
          ItemNo: item.data.ItemNo
        };
        CertificateList.push(obj);
      });
      const WorkExperienceList = [];
      this.gridApi.stopEditing();
      this.gridApi.forEachNode(item => {
        const tempobj = {
          WorkExperienceID: item.data.WorkExperienceID ? item.data.WorkExperienceID : -1,
          ActorID: item.data.ActorID ? item.data.ActorID : -1,
          EmployerName: item.data.EmployerName,
          EmployerTel: item.data.EmployerTel,
          Position: item.data.Position,
          Category: item.data.Category,
          Address: item.data.Address,
          StartDate: (item.data.PersianStartDate && item.data.PersianStartDate.MDate)
            ? item.data.PersianStartDate.MDate : (item.data.ShortStartDate ? item.data.ShortStartDate : null),
          EndDate: (item.data.PersianEndDate && item.data.PersianEndDate.MDate)
            ? item.data.PersianEndDate.MDate : (item.data.ShortEndDate ? item.data.ShortEndDate : null),
          // tslint:disable-next-line: max-line-length
          ResponsibilityTypeCode: (item.data.ResponsibilityTypeName && item.data.ResponsibilityTypeName.ResponsibilityTypeCode) ? item.data.ResponsibilityTypeName.ResponsibilityTypeCode
            : (item.data.ResponsibilityTypeCode ? item.data.ResponsibilityTypeCode : null),
          // tslint:disable-next-line: max-line-length
          ExperienceCoefCode: (item.data.ExperienceCoefName && item.data.ExperienceCoefName.ExperienceCoefCode) ? item.data.ResponsibilityTypeName.ExperienceCoefCode
            : (item.data.ExperienceCoefCode ? item.data.ExperienceCoefCode : null),
            IsRelated: (item.data.IsRelated !== null && item.data.IsRelated !== undefined) ? ((item.data.IsRelated === 1 || item.data.IsRelated === true) ? 1 : 0) : null,
        };
        WorkExperienceList.push(tempobj);
      });
      this.PersonObject.WorkExperienceList = WorkExperienceList;
      if (this.fileListlength > 0 &&
        !(this.selectedFile.size < 100000
          && (this.selectedFile.type.split('/')[1] === 'png'
            || this.selectedFile.type.split('/')[1] === 'jpeg'
            || this.selectedFile.type.split('/')[1] === 'jpg'
            || this.selectedFile.type.split('/')[1] === 'bmp')
          && (this.img.width < 1024 || this.img.height < 1024))) {
        this.CanSave = false;
        this.ShowMessageBoxWithOkBtn('امکان ذخيره سازي تصوير انتخاب شده وجود ندارد');
        return;
      }
      this.RankgridApi.forEachNode(node => {
        const Rankobj = {
          ActorBusinessID: node.data.ActorBusinessID ? node.data.ActorBusinessID : -1,
          ActorId: node.data.ActorId ? node.data.ActorId : -1,
          // tslint:disable-next-line: max-line-length
          RegionCode: node.data.RegionName && node.data.RegionName.RegionCode && !isUndefined(node.data.RegionName.RegionCode) ? node.data.RegionName.RegionCode : (node.data.RegionCode !== null ? node.data.RegionCode : null),
          // tslint:disable-next-line: max-line-length
          BusinessPatternID: node.data.BusinessPatternNoName && node.data.BusinessPatternNoName.BusinessPatternID ? node.data.BusinessPatternNoName.BusinessPatternID : (node.data.BusinessPatternID ? node.data.BusinessPatternID : -1),
          // tslint:disable-next-line: max-line-length
          PriceListTopicID: node.data.PriceListTopicName && node.data.PriceListTopicName.PriceListTopicID ? node.data.PriceListTopicName.PriceListTopicID : (node.data.PriceListTopicID ? node.data.PriceListTopicID : null),
          Rank: node.data.Rank ? node.data.Rank : null,
          // tslint:disable-next-line: max-line-length
          EvaluatorID: node.data.EvaluatorName && node.data.EvaluatorName.EvaluatorID ? node.data.EvaluatorName.EvaluatorID : (node.data.EvaluatorID ? node.data.EvaluatorID : null),
          // tslint:disable-next-line: max-line-length
          StartDate: node.data.PersianStartDate && node.data.PersianStartDate.MDate ? node.data.PersianStartDate.MDate : (node.data.ShortStartDate ? node.data.ShortStartDate : null),
          // tslint:disable-next-line: max-line-length
          EndDate: node.data.PersianEndDate && node.data.PersianEndDate.MDate ? node.data.PersianEndDate.MDate : (node.data.ShortEndDate ? node.data.ShortEndDate : null),
          Note: node.data.Note ? node.data.Note : null,
          AllowStateCode: node.data.AllowStateCode,
          UnitPatternID: node.data.UnitPatternID
        };
        ActorBusinessList.push(Rankobj);
      });
      this.EduHisgridApi.forEachNode(node => {
        const EduHisobj = {
          ItemNo: node.data.ItemNo,
          EducationHistoryID: node.data.EducationHistoryID ? node.data.EducationHistoryID : -1,
          ActorId: node.data.ActorID ? node.data.ActorID : -1,
          // tslint:disable-next-line: max-line-length
          GradeCode: node.data.GradeName && node.data.GradeName.GradeCode ? node.data.GradeName.GradeCode : (node.data.GradeCode ? node.data.GradeCode : null),
          // tslint:disable-next-line: max-line-length
          FieldCode: node.data.FieldName && node.data.FieldName.FieldCode ? node.data.FieldName.FieldCode : (node.data.FieldCode ? node.data.FieldCode : null),
          // tslint:disable-next-line: max-line-length
          UniversityCode: node.data.UniversityName && node.data.UniversityName.UniversityCode ? node.data.UniversityName.UniversityCode : (node.data.UniversityCode ? node.data.UniversityCode : null),
          FromYear: node.data.FromYear ? node.data.FromYear : null,
          ToYear: node.data.ToYear ? node.data.ToYear : null,
          EducationDate: node.data.ShortEducationDate ? node.data.ShortEducationDate : null,
          IsRelated: (node.data.IsRelated !== null && node.data.IsRelated !== undefined) ? ((node.data.IsRelated === 1 || node.data.IsRelated === true) ? 1 : 0) : null,
        };
        EducationHistoryList.push(EduHisobj);
      });
      // this.MovablegridApi.forEachNode(node => {
      //   const Movableobj = {
      //     MovableAssetID: node.data.MovableAssetID ? node.data.MovableAssetID : -1,
      //     ActorID: node.data.ActorID,
      //     // tslint:disable-next-line: max-line-length
      //     EquipmentTypeCode: node.data.EquipmentTypeName &&
      //     node.data.EquipmentTypeName.EquipmentTypeCode ? node.data.EquipmentTypeName.EquipmentTypeCode
      //     : (node.data.EquipmentTypeCode ? node.data.EquipmentTypeCode : null),
      //     Model: node.data.Model ? node.data.Model : null,
      //     ProductYear: node.data.ProductYear ? node.data.ProductYear : null,
      //     Qty: node.data.Qty ? node.data.Qty : null,
      //     Amount: node.data.Amount ? node.data.Amount : null,
      //     Note: node.data.Note ? node.data.Note : null,
      //     BusinessPatternID: node.data.BusinessPatternID ? node.data.BusinessPatternID : null,
      //     EngineNo: node.data.EngineNo ? node.data.EngineNo : null,
      //     ChassisNo: node.data.ChassisNo ? node.data.ChassisNo : null,
      //     VinNo: node.data.VinNo ? node.data.VinNo : null,
      //     IranPlaqueCode: node.data.IranPlaqueCode ? node.data.IranPlaqueCode : null,
      //     FirstPlaqueCode: node.data.FirstPlaqueCode ? node.data.FirstPlaqueCode : null,
      //     SecondPlaqueCode: node.data.SecondPlaqueCode ? node.data.SecondPlaqueCode : null,
      //     LetterPlaqueNo: node.data.LetterPlaqueNo ? node.data.LetterPlaqueNo : null,
      //   };
      //   MovableAssetList.push(Movableobj);
      // });
      this.gridApiIP.forEachNode(res => {
        const tempobj = {
          ImmovablePropertyID: res.data.ImmovablePropertyID ? res.data.ImmovablePropertyID : -1,
          ActorID: res.data.ActorID ? res.data.ActorID : -1,
          EstateTypeCode: res.data.EstateTypeCode,
          InvestUsageTypeCode: res.data.InvestUsageTypeCode,
          Address: res.data.Address,
          PostCode: res.data.PostCode,
          Area: res.data.Area,
          Note: res.data.Note,
          PropertyTypeCode: res.data.PropertyTypeCode,
          OwnershipTypeCode: res.data.OwnershipTypeCode
        };
        ImmovablePropertyList.push(tempobj);
      });
      this.gridApiTC.stopEditing();
      const TrainingCourseList = [];
      this.gridApiTC.forEachNode(res => {
        const tempobj = {
          TrainingCourseID: res.data.TrainingCourseID ? res.data.TrainingCourseID : -1,
          ActorID: res.data.ActorID,
          StartDate: (res.data.PersianStartDate && res.data.PersianStartDate.MDate) ? res.data.PersianStartDate.MDate
            : res.data.ShortStartDate ? res.data.ShortStartDate : null,
          EndDate: (res.data.PersianEndDate && res.data.PersianEndDate.MDate) ? res.data.PersianEndDate.MDate
            : res.data.ShortEndDate ? res.data.ShortEndDate : null,
          Note: res.data.Note,
          Institute: res.data.Institute,
          TrainingCourseName: res.data.TrainingCourseName,
          TrainingCourseDuration: res.data.TrainingCourseDuration,
        };
        TrainingCourseList.push(tempobj);
      });
      this.Actor.UpdateActorPerson2(
        ActorBusinessList,
        EducationHistoryList,
        ImmovablePropertyList,
        CertificateList,
        TrainingCourseList,
        this.PersonObject,
        this.UserLocalImage,
        this.FromWorkListCartable,
        this.IsManagerInfo,
        this.CorporateID
      ).subscribe(res => {
        this.PersonObject = res;
        this.DisplaySearchBox = false;
        this.ContentHeight = 97;
        // this.Validate = this.PersonObject.Validate;
        // this.IsArchive = this.Validate;
        // this.BankrowData = this.PersonObject.ActorBankAccList;
        // this.rowData = this.PersonObject.WorkExperienceList;
        // this.RankrowsData = this.PersonObject.ActorBusinessList;
        // this.EduHisrowsData = this.PersonObject.EducationHistoryList;
        // this.ImmovablePropertyRows = this.PersonObject.ImmovablePropertyList;
        // this.MovablerowsData = this.PersonObject.MovableAssetList;
        // this.CerrowData = this.PersonObject.ActorCertificateList;
        // this.TrainingCourseRows = this.PersonObject.TrainingCourseList;
        this.FindActor(this.PersonObject);
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
        this.CanSave = false;
      },
        err => {
          this.CanSave = false;
        });
    }

  }
  onClose() {
    this.Closed.emit(true);
  }
  popupclosed(event) {
    if (this.PopUpType === 'supplier-work-flow') {
      this.Actor.GetActorBussinessList(this.PersonObject.ActorId,
        (this.CurrWorkFlow && this.CurrWorkFlow.RegionCode ? this.CurrWorkFlow.RegionCode : null)
      ).subscribe(res => {
        this.RankrowsData = res;
      });
    }

    this.isClicked = false;
    this.PopUpType = '';
    this.PixelHeight = '';
    this.MinHeightPixel = '';
    this.OverPixelWidth = '';
    this.MainMaxwidthPixel = '';
    this.PercentWidth = '';
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  OnChangeCheckBoxValue(Ischeck, type) {
    switch (type) {
      case 'IsContractor':
        this.IsContractor = Ischeck;
        break;
      case 'IsConsult':
        this.IsConsult = Ischeck;
        break;
      case 'IsProducer':
        this.IsProducer = Ischeck;
        break;
      case 'IsSupplier':
        this.IsSupplier = Ischeck;
        break;
      case 'IsInternalBuilders':
        this.IsInternalBuilders = Ischeck;
        break;
      case 'IsExternalBuilders':
        this.IsExternalBuilders = Ischeck;
        break;
      default:
        break;
    }
  }
  onPersonDocArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = {
      EntityID: this.ActorId,
      TypeCodeStr: '476-', // RFC 52469
      DocTypeCode: 476, // RFC 52469
      ModuleCode: 2784,
      IsReadOnly: !this.IsEditable
    };
  }
  onFileChanged(event) {
    this.UserImage = '';
    this.UserLocalImage = '';
    this.ImgLoadMsgSize = [];
    this.ImgLoadMsgType = [];
    this.ImgLoadMsgDimensions = [];
    const fileList: FileList = event.target.files;
    this.fileListlength = fileList.length;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
      if (this.selectedFile.size > 100000) {
        this.ImgLoadMsgSize.push({ msg: '*حجم فايل بيش از حد مجاز است' });
        this.ImageMsgLoded = true;
        this.IsUncorrect = true;
      } else if (this.selectedFile.type.split('/')[1] !== 'png' && this.selectedFile.type.split('/')[1] !== 'jpeg'
        && this.selectedFile.type.split('/')[1] !== 'bmp' && this.selectedFile.type.split('/')[1] !== 'jpg') {
        this.ImgLoadMsgSize.push({ msg: '*نوع فايل معتبر نيست' });
        this.ImageMsgLoded = true;
        this.IsUncorrect = true;
      } else {
        const reader = new FileReader();
        reader.onload = e => {
          this.img = new Image();
          this.img.onload = () => {
            if (this.img.width > 1024 || this.img.height > 1024) {
              this.ImgLoadMsgSize.push({ msg: '*اندازه عکس معتبر نيست' });
              this.ImageMsgLoded = true;
              this.IsUncorrect = false;
            } else {
              this.UserLocalImage = this.img.src;
              this.IsUncorrect = false;
            }
          };
          this.img.src = reader.result.toString();
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }
  onRankcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'RegionName') {
      this.Region.GetRegionListforBusinessPatternCorporate().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'region'
        });
      });
    } else if (event.colDef && event.colDef.field === 'BusinessPatternNoName') {
      this.RankColumnDef[8].cellEditorParams.Params.loading = true;
      this.Common.GetBusinessPatternPaging('',
        '',
        1,
        30,
        event.data.UnitPatternID,
        event.data.BusinessPatternID).
        subscribe(res => {
          this.RankColumnDef[8].cellEditorParams.Params.loading = false;
          this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'business-pattern'
          });
        });
    } else if (event.colDef && event.colDef.field === 'PriceListTopicName') {
      // tslint:disable-next-line: max-line-length
      this.Actor.GetPriceListTopicByBusinesPatternID(event.data.BusinessPatternID, false).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'price-list-topic'
        });
      });
    } else if (event.colDef && event.colDef.field === 'UnitTopicName') {
      this.ProductRequest.GetVWExeUnit().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ExeUnitParams'
        });
      });
    }
  }
  onRankGridReady(params: { api: any; }) {
    this.RankgridApi = params.api;
  }
  RankRowClick(event) {
    if (event.data && event.data.ActorBusinessID) {
      this.RankSelectedRow = event.data;
    } else {
      this.RankSelectedRow = (undefined);
    }
  }
  onDocArchiveClick(row) {
    if (row.ActorBusinessID && row.ActorBusinessID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ActorBusinessID,
        TypeCodeStr: '492-', // RFC 52469-item10
        DocTypeCode: 492, // RFC 52469-item10
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.EducationHistoryID && row.EducationHistoryID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.EducationHistoryID,
        TypeCodeStr: '483-', // RFC 52469-item3
        DocTypeCode: 483, // RFC 52469-item3
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.WorkExperienceID && row.WorkExperienceID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.WorkExperienceID,
        TypeCodeStr: '484-', // RFC 52469-item3
        DocTypeCode: 484, // RFC 52469-item3
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.TrainingCourseID && row.TrainingCourseID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.TrainingCourseID,
        TypeCodeStr: '485-', // RFC 52469-item3
        DocTypeCode: 485, // RFC 52469-item3
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.ImmovablePropertyID && row.ImmovablePropertyID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ImmovablePropertyID,
        TypeCodeStr: '489-', // RFC 52469-item7
        DocTypeCode: 489, // RFC 52469-item7
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.CertificateID && row.CertificateID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.CertificateID,
        TypeCodeStr: '486-', // RFC 52469-item4
        DocTypeCode: 486, // RFC 52469-item4
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.MovableAssetID && row.MovableAssetID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.MovableAssetID,
        TypeCodeStr: '490-', // RFC 52469-item8
        DocTypeCode: 490, // RFC 52469-item8
        ModuleCode: 2784,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
  }
  onEduHisGridReady(params: { api: any; }) {
    this.EduHisgridApi = params.api;
  }
  EduHisRowClick(event) {
    if (event.data && event.data.EducationHistoryID) {
      this.EduHisSelectedRow = event.data;
    } else {
      this.EduHisSelectedRow = (undefined);
    }
  }
  onEduHiscellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'GradeName') {
      this.Common.GetEducationGradeList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'edu-grade'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'FieldName') {
      this.EduHisColumnDef[2].cellEditorParams.Params.loading = true;
      this.Common.GetFieldList('',
        '',
        1,
        30,
        event.data.FieldCode).
        subscribe(res => {
          this.EduHisColumnDef[2].cellEditorParams.Params.loading = false;
          this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'edu-field'
          });
        });
    } else if (event.colDef && event.colDef.field === 'UniversityName') {
      this.EduHisColumnDef[3].cellEditorParams.Params.loading = true;
      this.Common.GetUniversityList('',
        '',
        1,
        30,
        event.data.UniversityCode).
        subscribe(res => {
          this.EduHisColumnDef[3].cellEditorParams.Params.loading = false;
          this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'edu-uni'
          });
        });
    }
  }
  FetchMoreField(event) {
    event.Owner.EduHisColumnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.Common.GetFieldList(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize, null).
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
      event.Owner.EduHisColumnDef[2].cellEditorParams.Params.loading = false;
      event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'edu-field'
      });
    });
  }
  FetchFieldByTerm(event) {
    event.Owner.EduHisColumnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetFieldList(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize, null).
      subscribe(res => {
        event.Owner.EduHisColumnDef[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'edu-field'
        });
      });
  }
  RedioSelectedChange(event) {
    event.Owner.EduHisColumnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetFieldList(event.SearchOption,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30, null).
      subscribe(res => {
        event.Owner.EduHisColumnDef[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'edu-field'
        });
      });
  }
  FetchMoreUniversity(event) {
    event.Owner.EduHisColumnDef[3].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.Common.GetUniversityList(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize, null).
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
      event.Owner.EduHisColumnDef[3].cellEditorParams.Params.loading = false;
      event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'edu-uni'
      });
    });
  }
  FetchUniversityByTerm(event) {
    event.Owner.EduHisColumnDef[3].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetUniversityList(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize, null).
      subscribe(res => {
        event.Owner.EduHisColumnDef[3].cellEditorParams.Params.loading = false;
        event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'edu-uni'
        });
      });
  }
  RadioSelectedChange(event) {
    event.Owner.EduHisColumnDef[3].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetUniversityList(event.SearchOption,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30, null).
      subscribe(res => {
        event.Owner.EduHisColumnDef[3].cellEditorParams.Params.loading = false;
        event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'edu-uni'
        });
      });
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  RowClickWE(event) {
    if (event.data && event.data.WorkExperienceID > 0) {
      this.WorkExecutionSelectedRow = event.data;
    } else {
      this.WorkExecutionSelectedRow = (undefined);
    }
  }
  // onMovableGridReady(params: { api: any; }) {
  //   this.MovablegridApi = params.api;
  // }
  // onMovablecellEditingStarted(event) {
  //   if (event.colDef && event.colDef.field === 'EquipmentTypeName') {// For InvalidSelected When Old IsValid

  //     this.Actor.GetEquipmentTypeList().subscribe(res => {
  //       this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
  //         List: res,
  //         type: 'equipment-type'
  //       });
  //     });
  //   }
  //   if (event.colDef && event.colDef.field === 'BusinessPatternName') {// For InvalidSelected When Old IsValid
  //     this.Actor.GetBusinessPatternListByRegionCode(this.NgSelectRegionParams.selectedObject, false).subscribe(res => {
  //       this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
  //         List: res,
  //         type: 'business-pattern'
  //       });
  //     });
  //   }
  // }
  onGridReadyIP(event) {
    this.gridApiIP = event.api;
  }
  RowClickIP(event) {
    if (event.data && event.data.ImmovablePropertyID) {
      this.ImmovablePropertySelectedRow = event.data;
    } else {
      this.ImmovablePropertySelectedRow = (undefined);
    }
  }
  onellEditingStartedIP(event) {
    if (event.colDef && event.colDef.field === 'InvestUsageTypeName') {
      // this.SelectedColumnDef[2].cellEditorParams.Params.loading = false;
      this.ProductRequest.GetInvestUsageType().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'InvestUsage-ngsv'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'OwnershipTypeName') {
      this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
        List: this.OwnershipTypeData,
        type: 'OwnershipType'
      });
    }
    if (event.colDef && event.colDef.field === 'PropertyTypeName') {
      this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
        List: this.PropertyTypeData,
        type: 'PropertyType'
      });
    }
    if (event.colDef && event.colDef.field === 'EstateTypeName') {
      this.Common.GetAllEstateType().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Estate-ngsv'
        });
      });
    }
  }
  onCerGridReady(params: { api: any; }) {
    this.CergridApi = params.api;
  }
  RowClick(event) {

  }

  RowClickAC(event) {
    // if (event.data && event.data.CertificateID > 0) {
    //   this.ActorCetificateSelectedRow = event.data;
    // } else {
    //   this.ActorCetificateSelectedRow = (undefined);
    // }
  }
  // MovAssetRowClick(event) {
  //   if (event.data && event.data.ImmovablePropertyID) {
  //     this.MovAssetSelectedRow = event.data;
  //   } else {
  //     this.MovAssetSelectedRow = (undefined);
  //   }
  // }
  onBankgridApiReady(event) {
    this.BankgridApi = event.api;
  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'BranchName') {
      this.Common.GetAllBranchByBankId(event.data.BankID).subscribe(ress => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: ress,
          type: 'Branch'
        });
      });
    } else if (event.colDef && event.colDef.field === 'CityName') {
      this.Common.GetAllcityByStateId(event.data.StateCode).subscribe(ress => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: ress,
          type: 'City'
        });
      });
    }
  }
  onPRPersonCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'BankName') {
      const itemsToUpdate = [];
      this.BankgridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.BranchName = '';
        }
      });
      this.BankgridApi.updateRowData({ update: itemsToUpdate });
    } else if (event.colDef && event.colDef.field === 'StateName') {
      const itemsToUpdate = [];
      this.BankgridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.CityName = '';
        }
      });
      this.BankgridApi.updateRowData({ update: itemsToUpdate });
    }
  }
  onGridReadyTC(event) {
    this.gridApiTC = event.api;
  }
  RowClickTC(event) {
    if (event.data && event.data.TrainingCourseID) {
      this.TrainingCourseSelectedRow = event.data;
    } else {
      this.TrainingCourseSelectedRow = (undefined);
    }
  }

  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات تامین کننده تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        } else if (this.IsExpertSelected) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
        } else {
          this.DOConfirm();
        }
      } else {
        if (this.WorkFlowID) {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.PersonObject.ActorId,
            this.CurrWorkFlow.RegionCode,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            null,
            this.ModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn(' عملیات عدم تایید با موفقیت انجام شد');

              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            }
            );
        } else {
          this.ShowMessageBoxWithOkBtn('برای عدم تایید از کارتابل جاری اقدام فرمایید');
        }
      }
    } else {
      this.DOFinalConfirm();
    }
  }
  onConfirmAndSend() {
    this.BtnClickedName = 'ConfirmAndSend';
    // this.IsDown = false;
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات تامین کننده حقیقی تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
    } else if (this.IsExpertSelected) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات تامین کننده حقیقی تغيير کرده است، آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد؟');
    } else {
      this.DoConfirmAndSend();
    }
  }
  onUnConfirmAndReturn() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectID = this.PersonObject.ActorId;
        this.ObjectNo = this.IdentityNo;
        this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
          .subscribe(
            res => {
              if (res != null && res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonServic._arrayBufferToBase64(element.UserImage);
                });
                this.PopUpType = 'work-flow-send';
                this.startLeftPosition = 350;
                this.startTopPosition = 105;
                this.PercentWidth = undefined;
                this.OverMainMinwidthPixel = undefined;
                this.MainMaxwidthPixel = undefined;
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
                  OrginalModuleCode: this.ModuleCode,
                  CartableUserID: this.CartableUserID
                };
                this.isClicked = true;
              } else {
                this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
              }
            }
          );
      } else {
        this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
      }
    });
  }
  onPrintFlowClick(row) {
    const FullPersonNam = { FullPersonName: '' };
    // if (this.RequestedPersonItems && this.RequestedPersonParams.selectedObject) {
    //   FullPersonName = this.RequestedPersonItems.find(
    //     s => s.ActorId === this.RequestedPersonParams.selectedObject
    //   );
    // }
    if (row.AllowStateCode !== 7) {
      this.Report.ShowReport(null,
        null,
        this.PersonObject.ActorId,
        this.PersonObject.IdentityNo,
        null,
        null,
        null,
        FullPersonNam ? FullPersonNam.FullPersonName : '',
        null,
        null,
        this.ModuleCode,
        row.RegionCode
      );
    }
  }

  DOConfirm(HasAlert = true, resolvee = null) {
    if (this.WorkflowObjectCode === null || this.WorkflowObjectCode === undefined) {
      this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
    }
    if (this.WorkFlowID) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.PersonObject.ActorId,
        this.CurrWorkFlow.RegionCode,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.ModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn(' عملیات تایید با موفقیت انجام شد');
          }
          this.RefreshCartable.RefreshCartable();
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
          this.ViewTypeChange();
          resolvee(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolvee(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {

      if (!this.RankrowsData || this.RankrowsData.length === 0) { // RFC 53751
        this.ShowMessageBoxWithOkBtn('حوزه تخصصی تکمیل نگردیده است امکان تایید وجود ندارد.');
      } else {

        const APIList = [];
        let ARankrowsDataList = this.RankrowsData.filter(x => x.AllowStateCode === 1 && !x.HasOpenWF);
        if (ARankrowsDataList && ARankrowsDataList.length > 0) {
          ARankrowsDataList = this.CommonServic.GroupBy(ARankrowsDataList, 'RegionCode');

          ARankrowsDataList.forEach(element => {
            APIList.push(this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
              this.PersonObject.ActorId,
              element.key,
              this.ModuleCode,
              1,
              this.WorkflowObjectCode,
              this.ModuleViewTypeCode,
              this.ModuleCode,
              this.CartableUserID,
              this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null));
          });
          if (APIList.length > 0) {
            forkJoin(APIList).
              subscribe(res => {
                if (HasAlert) {
                  this.ShowMessageBoxWithOkBtn('عملیات تایید اطلاعات با موفقیت انجام شد');
                }
                this.RefreshCartable.RefreshCartable();
                this.ReadyToConfirm = 1;
                this.btnConfirmName = 'عدم تایید';
                this.btnConfirmIcon = 'cancel';
                this.ViewTypeChange();
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
          }
        } else {
          this.ShowMessageBoxWithOkBtn('این شخص دارای گردش کار جاری می باشد لذا امکان ایجاد گردش مجدد وجود ندارد');
        }
      }
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
          messageStr = 'بازگشت از تاييد نهايي تامین کننده حقیقی با موفقيت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تاييد نهايي';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تاييد نهايي تامین کننده حقیقی با موفقيت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تاييد نهايي';
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
  DoConfirmAndSend() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.IdentityNo;
        this.ObjectID = this.PersonObject.ActorId;
        this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
          .subscribe(
            res => {
              if (res != null && res.length > 0) {
                if (this.IsEndFlow) {
                  this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                  // tslint:disable-next-line:max-line-length
                  this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
                } else {
                  res.forEach(element => {
                    element.UserImage = this.CommonServic._arrayBufferToBase64(element.UserImage);
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
                    OrginalModuleCode: this.ModuleCode,
                    CartableUserID: this.CartableUserID
                  };
                  this.isClicked = true;
                }
              } else {
                this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
              }
            }
          );
      }
    });
  }
  DoUnConfirm(alert = true, resolv = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.PersonObject.ActorId,
      this.CurrWorkFlow.RegionCode,
      this.ModuleCode,
      0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.ModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        if (alert) {
          this.ShowMessageBoxWithOkBtn('عملیات عدم تایید با موفقیت انجام شد');
        }
        this.ReadyToConfirm = 0;
        this.btnConfirmName = 'تایید';
        this.btnConfirmIcon = 'ok';
        resolv(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolv(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }

  ViewTypeChange() {
    if (this.btnConfirmName === 'عدم تایید') {
      this.ModuleViewTypeCode = 2;
    }
    switch (this.ModuleViewTypeCode) { // RFC 53177
      case 1:
        this.IsEditable = true;
        this.IsActiveshenasnameh = true;
        this.IsDisplay = false;
        this.HaveBankInfo = true;
        this.HaveTrainingCourse = true;
        this.IsSupplementaryInfo = false;
        this.HaveEvaluationInfo = false;
        this.HaveEducation = true;
        this.Haveshenasnameh = true;
        this.HaveActorBusiness = true;

        break;
      case 2:
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveEvaluationInfo = false; // RFC 53350
        break;
      case 3:
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveBankInfo = false;
        this.HaveTrainingCourse = true;
        this.IsSupplementaryInfo = false;
        this.HaveEvaluationInfo = false;
        this.HaveEducation = true;
        this.Haveshenasnameh = true;
        this.HaveActorBusiness = true;
        this.HaveCompleteInfo = true;
        this.IsEditableForType3 = true;
        break;
      case 4:
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveBankInfo = false;
        this.HaveTrainingCourse = true;
        this.HaveSupplementary = this.IsSupplementaryInfo = true;
        this.HaveEvaluationInfo = false;
        this.HaveEducation = true;
        this.Haveshenasnameh = true;
        this.HaveActorBusiness = true;
        this.HaveCompleteInfo = true;
        break;
      case 5:
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveBankInfo = true;
        this.HaveTrainingCourse = true;
        this.HaveSupplementary = this.IsSupplementaryInfo = true;
        this.HaveEvaluationInfo = false;
        this.HaveEducation = true;
        this.Haveshenasnameh = true;
        this.HaveActorBusiness = true;
        this.HaveCompleteInfo = true;
        break;
      case 6:
        this.IsDisplay = true;
        this.HaveBankInfo = false;
        this.HaveTrainingCourse = false;
        this.HaveEvaluationInfo = false;
        this.IsSupplementaryInfo = false;
        this.HaveEducation = false;
        this.IsActiveshenasnameh = true;
        break;
      case 7:
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveEvaluationInfo = false;
        break;
      case 100000: // LocalProvider  مشاهده اطلاعات پیمانکار
        this.IsActiveshenasnameh = true;
        this.IdentityNoSearch = this.InputParam.IdentityNo ? this.InputParam.IdentityNo : '';
        if (this.IdentityNoSearch) {
          this.onSearch();
        }
        break;
      case 200000: // اعمال ظرفیت مازاد
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IsExtraMode = true;
        break;
      case 300000: // RFC 54203
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveEvaluationInfo = false;
        this.ShowWorkflowButtons = false;
        this.ButtonsBoxWidth = 100;
        break;
      case 400000:
        this.CanEdite = true;
        this.ButtonName = 'ثبت حوزه تخصصی';
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IsExtraMode = true;
        this.HaveEvaluationInfo = false;
        break;
      case 500000:
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IsActiveshenasnameh = true;
        this.HaveEvaluationInfo = false;
        break;
      default:
        //  this.IsEditable = true;
        this.IsExtraMode = false;
        break;
    }
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
  getOutPutParam(event) {
    if (event && this.PopUpType === 'work-flow-send') {
      this.IsEditable = false;
      this.ISSendAndConfirm = true;
      return;
    }
  }
  onChangeDegreeScore(event) {
    this.DegreeScoreValue = this.DegreeScoreItems.find(x => x.DegreeScoreCode === this.DegreeScoreParams.selectedObject).Value;
  }
  onChangeExperienceScore(event) {
    // tslint:disable-next-line:max-line-length
    this.ExperienceScoreValue = this.ExperienceScoreItems.find(x => x.WorkExperienceScoreCode === this.ExperienceScoreParams.selectedObject).Value;
  }
  onChangeCriterionScore(event) {
    this.CriterionScoreValue = this.CriterionScoreItems.find(x => x.CriterionScoreCode === this.CriterionScoreParams.selectedObject).Value;
  }
  onChangeApprovalCertificate(event) {
    // tslint:disable-next-line:max-line-length
    this.ApprovalCertificateValue = this.ApprovalCertificateItems.find(x => x.HaveApprovalCertificateCode === this.ApprovalCertificateParams.selectedObject).Value;
  }
  onChangeCompanyGrade(event) {
    this.CompanyGradeValue = this.CompanyGradeItems.find(x => x.CompanyGradeCode === this.CompanyGradeParams.selectedObject).Value;
  }
  onChangeProposalQuality(event) {
    // tslint:disable-next-line:max-line-length
    this.ProposalQualityValue = this.ProposalQualityItems.find(x => x.ProposalQualityCode === this.ProposalQualityParams.selectedObject).Value;
  }
  onChangeSimilarWorkExperience(event) {
    // tslint:disable-next-line:max-line-length
    this.SimilarWorkExperienceValue = this.SimilarWorkExperienceItems.find(x => x.SimilarWorkExperienceCode === this.SimilarWorkExperienceParams.selectedObject).Value;
  }
  onChangeCommitionView(event) {
    // tslint:disable-next-line:max-line-length
    this.CommitionViewValue = this.CommitionViewItems.find(x => x.TechnicalCommitionViewCode === this.CommitionViewParams.selectedObject).Value;
  }
  onChangeEmployerReceipt(event) {
    // tslint:disable-next-line:max-line-length
    this.EmployerReceiptValue = this.EmployerReceiptItems.find(x => x.PreviousEmployerReceiptCode === this.EmployerReceiptParams.selectedObject).Value;
  }
  onChangeCooperationHistory(event) {
    // tslint:disable-next-line:max-line-length
    this.CooperationHistoryValue = this.CooperationHistoryItems.find(x => x.CooperationHistoryCode === this.CooperationHistoryParams.selectedObject).Value;
  }
  onChangeNativenessCopmany(event) {
    // tslint:disable-next-line:max-line-length
    this.NativenessCopmanyValue = this.NativenessCopmanyItems.find(x => x.NativenessOfCompanyCode === this.NativenessCopmanyParams.selectedObject).Value;
  }
  OnOpenNgSelect(type, Selected) {
    switch (type) {
      case 'DegreeScore':
        this.Common.GetAllDegreeScore().subscribe(res => {
          this.DegreeScoreItems = res;
          if (Selected) {
            this.DegreeScoreParams.selectedObject = Selected;
            this.onChangeDegreeScore(this.DegreeScoreParams.selectedObject);
          }
        });
        break;
      case 'ExperienceScore':
        this.Common.GetAllWorkExperienceScore().subscribe(res => {
          this.ExperienceScoreItems = res;
          if (Selected) {
            this.ExperienceScoreParams.selectedObject = Selected;
            this.onChangeExperienceScore(this.ExperienceScoreParams.selectedObject);
          }
        });
        break;
      case 'CriterionScore':
        this.Common.GetAllCriterionScore().subscribe((res: any) => {
          this.CriterionScoreItems = res.List;
          if (Selected) {
            this.CriterionScoreParams.selectedObject = Selected;
            this.onChangeCriterionScore(this.CriterionScoreParams.selectedObject);
          }
        });
        break;
      case 'ApprovalCertificate':
        this.Common.GetAllHaveApprovalCertificate().subscribe(res => {
          this.ApprovalCertificateItems = res;
          if (Selected) {
            this.ApprovalCertificateParams.selectedObject = Selected;
            this.onChangeApprovalCertificate(this.ApprovalCertificateParams.selectedObject);
          }
        });
        break;
      case 'CompanyGrade':
        this.Common.GetAllDegreeScore().subscribe(res => {
          this.CompanyGradeItems = res;
          if (Selected) {
            this.CompanyGradeParams.selectedObject = Selected;
            this.onChangeCompanyGrade(this.CompanyGradeParams.selectedObject);
          }
        });
        break;
      case 'ProposalQuality':
        this.Common.GetAllProposalQuality().subscribe(res => {
          this.ProposalQualityItems = res;
          if (Selected) {
            this.ProposalQualityParams.selectedObject = Selected;
            this.onChangeProposalQuality(this.ProposalQualityParams.selectedObject);
          }
        });
        break;
      case 'SimilarWorkExperience':
        this.Common.GetAllSimilarWorkExperience().subscribe(res => {
          this.SimilarWorkExperienceItems = res.List;
          if (Selected) {
            this.SimilarWorkExperienceParams.selectedObject = Selected;
            this.onChangeSimilarWorkExperience(this.SimilarWorkExperienceParams.selectedObject);
          }
        });
        break;
      case 'CommitionView':
        this.Common.GetAllTechnicalCommitionView().subscribe(res => {
          this.CommitionViewItems = res;
          if (Selected) {
            this.CommitionViewParams.selectedObject = Selected;
            this.onChangeCommitionView(this.CommitionViewParams.selectedObject);
          }
        });
        break;
      case 'EmployerReceipt':
        this.Common.GetAllPreviousEmployerReceipt().subscribe(res => {
          this.EmployerReceiptItems = res;
          if (Selected) {
            this.EmployerReceiptParams.selectedObject = Selected;
            this.onChangeEmployerReceipt(this.EmployerReceiptParams.selectedObject);
          }
        });
        break;
      case 'CooperationHistory':
        this.Common.GetAllCooperationHistory().subscribe(res => {
          this.CooperationHistoryItems = res;
          if (Selected) {
            this.CooperationHistoryParams.selectedObject = Selected;
            this.onChangeCooperationHistory(this.CooperationHistoryParams.selectedObject);
          }
        });
        break;
      case 'NativenessCopmany':
        this.Common.GetAllNativenessOfCompany().subscribe(res => {
          this.NativenessCopmanyItems = res;
          if (Selected) {
            this.NativenessCopmanyParams.selectedObject = Selected;
            this.onChangeNativenessCopmany(this.NativenessCopmanyParams.selectedObject);
          }
        });
        break;
      default:
        break;
    }
  }

  onMovablePropertyClick(row) { // RFC 53015
    if (row.ActorBusinessID) {
      // this.CorporateObject.MovableAssetList.filter(x => x.EquipmentTypeCode === row.EquipmentTypeCode);
      this.Actor.GetMovableAssetListByActorBusinessID(row.ActorBusinessID).subscribe(res => {
        if (res && res.length > 0) {
          this.MovablerowsDataPopupParam = res;
          this.PopUpType = 'app-movable-property-page';
          this.HaveHeader = true;
          this.isClicked = true;
          this.HaveMaxBtn = false;
          this.startLeftPosition = 110;
          this.startTopPosition = 20;
          this.OverMainMinwidthPixel = 1200;
          this.MainMaxwidthPixel = 1200;
          // this.PixelHeight = 620;
          this.PopupParam = {
            MovablerowsData: this.MovablerowsDataPopupParam,
            HeaderName: 'اموال منقول'
          };
        } else {
          this.ShowMessageBoxWithOkBtn('برای این ردیف اموال منقولی وجود ندارد.');
        }
      });
    }
  }

  onWorkLogDetailClick(row) { // RFC 52927
    if (row.ActorId && row.ActorId > 0
      && row.RegionCode && !isUndefined(row.RegionCode)
      && row.ActorBusinessID && row.ActorBusinessID > 0
      && row.AllowStateCode !== 7) {
      this.FlowService.GetWfInstanceIDByObjIDAndRegionCode(row.ActorId, row.RegionCode, true).subscribe(res => {
        if (res) {
          this.WorkflowInstanceID = res;
          this.PopUpType = 'user-work-log-details';
          this.HaveHeader = true;
          this.isClicked = true;
          this.HaveMaxBtn = true;
          // this.OverPixelWidth = 1290;
          this.startLeftPosition = 125;
          this.startTopPosition = 8;
          this.HeightPercentWithMaxBtn = 98;
          this.MinHeightPixel = 640;

          this.PopupParam = {
            HeaderName: 'جزئیات گردش',

            workflowtypeStatus: this.WorkflowObjectCode,
            WorkFlowInstanceId: res,
            ParentModuleCode: this.ModuleCode,
            IdentityNo: this.IdentityNo,
            Name: this.FirstName + ' ' + this.LastName,
            RegisterNo: this.EconomicCode,
            Date: this.PersianBirthDate,
            IsAdmin: this.IsAdmin
          };
        } else {
          this.ShowMessageBoxWithOkBtn('یرای این حوزه گردش کاری ایجاد نشده است');
        }
      });
    }
  }
  AllowStateUpdate(row) {
    if (row.ActorId && row.ActorId > 0 &&
      row.BusinessPatternID && row.BusinessPatternID > 0 &&
      row.ActorBusinessID && row.ActorBusinessID > 0 &&
      row.AllowStateCode && row.AllowStateCode > 0) {
      this.Actor.AllowStateUpdate(
        row.ActorId,
        row.ActorBusinessID,
        row.AllowStateCode,
        2784,
        row.AllowStateCodeUpdateDec).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('تغییر وضعیت تامین کننده با موفقیت انجام شد');
          }
        });
    }
  }
  onSupplementaryInfoArchiveClick() {  // RFC 52837-Item2
    if (this.ActorId) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = { // RFC 52469-item1
        EntityID: this.ActorId,
        TypeCodeStr: '505-',
        DocTypeCode: 505,
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا تامین کننده را انتحاب نمایید');
      return;
    }
  }

  onSaveRank() {
    this.RankgridApi.stopEditing();
    const RankList = [];
    this.RankgridApi.forEachNode(node => {
      RankList.push(node.data);
    });
    this.Actor.onSaveRank(RankList, this.PersonObject.ActorId, false, this.ModuleViewTypeCode, this.ModuleCode).subscribe(res => {
      this.PersonObject = res;
      this.FindActor(res);
      this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }
  btnPrintClick() {
    this.Report.CorporateRep(
      this.ModuleCode,
      this.ActorId,
      'چاپ اطلاعات تامین کننده حقیقی'
    );
  }
  btnShowDetailsClick() {
    if (this.PersonObject && this.PersonObject.ActorId) {
      this.PopUpType = 'person2';
      this.isClicked = true;
      this.startLeftPosition = 40;
      this.startTopPosition = 10;
      this.PixelHeight = 650;
      this.MinHeightPixel = 650;
      this.OverPixelWidth = 1280;
      this.MainMaxwidthPixel = 1280;
      // this.OverMainMinwidthPixel = 1280;
      this.PercentWidth = 96;
      this.PopupParam = {
        CorporateID: this.PersonObject.ActorId,
        ObjectID: this.PersonObject.ActorId,
        ModuleViewTypeCode: 2,
        IsShowCompleteInfo: true,
        HeaderName: 'تامین کننده حقیقی',
      };
    }
  }
  btnWorkFlowClick() {
    if (this.PersonObject && this.PersonObject.ActorId) {
      this.PopUpType = 'supplier-work-flow';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.MinHeightPixel = 450;
      this.PopupParam = {
        ActorID: this.PersonObject.ActorId,
        IdentityNo: this.IdentityNo,
        FirstName: this.FirstName,
        LastName: this.LastName,
        EconomicCode: this.EconomicCode,
        PersianBirthDate: this.PersianBirthDate,
        IsAdmin: this.IsAdmin,
        HeaderName: 'تاریخچه گردش تامین کننده حقیقی',
      };
    }
  }

  onRevocationClick() {
    this.BtnClickedName = 'Revoke';
    this.ShowMessageBoxWithYesNoBtn('آیا از ابطال و غیر مجاز نمودن اطمینان دارید؟');
  }

  Revoke() {
    this.Actor.ProviderRevocation(this.CurrWorkFlow, this.WorkFlowID,
      this.PersonObject.ActorId, this.WorkflowTypeCode,
      this.ModuleCode, this.OrginalModuleCode).subscribe(res => {
        if (res && res === 1) {
          this.ShowMessageBoxWithOkBtn('ابطال با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('ابطال انجام نشد');
        }
      });
  }

  MessageBoxAction(event) {
    // if ((this.BtnClickedName === 'BtnConfirm' || this.BtnClickedName === 'ConfirmAndSend') && event === 'YES') {
    //   this.DOConfirm();
    // }
    // if (this.BtnClickedName === 'BtnConfirm' && this.IsExpertSelected && event === 'YES') {
    //   this.IsExpertSelected = false;
    //   this.DOConfirm();
    // }
    // if (this.BtnClickedName === 'ConfirmAndSend' && this.IsExpertSelected && event === 'YES') {
    //   this.IsExpertSelected = false;
    //   this.DoConfirmAndSend();
    // }
    if (this.BtnClickedName === 'Revoke' && event === 'YES') {
      this.Revoke();
    }

    if (this.BtnClickedName === 'BtnSave' && event === 'YES') {
      this.CanSave = true;
      this.onSave();
    }

    if (this.BtnClickedName === 'AdminMode' && event === 'YES') { // درخواست خ احمدی
      this.RankColumn(this.IsAdmin, this.IsAdminTraffic);
      if (this.IsAdmin && !this.WorkFlowID && this.ModuleCode !== 2893 && this.ModuleCode !== 2885
        && (!this.InputParam || this.InputParam.ModuleViewTypeCode !== 300000)) {
        this.ModuleViewTypeCode = 1;
      }
      this.ViewTypeChange();
    }
    if (this.BtnClickedName === 'AdminMode' && event === 'NO') {
      this.IsAdmin = false;
      this.RankColumn(this.IsAdmin, this.IsAdminTraffic);
    }

    this.isClicked = false;
    this.PopUpType = '';
    this.BtnClickedName = '';
  }

  onWorkExpcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ManagementTypeName') {
      this.Common.GetAllManagementTypeForManagementTab().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ManagementType'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ResponsibilityTypeName') {
      this.Common.GetAllResponsibilityTypeByManagementTypeCode(event.data.ManagementTypeCode).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ResponsibilityType'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ExperienceCoefName') {
      this.Common.GetExperienceCoefList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ExperienceCoef'
        });
      });
    }
  }

  onShowContractorwinercommitionClick(row) {
    if (row) {
      this.PopUpType = 'contractor-card-list';
      this.isClicked = true;
      this.startLeftPosition = 74;
      this.startTopPosition = 5;
      this.MinHeightPixel = 500;
      this.PixelHeight = 600;
      this.MainMaxwidthPixel = 1250;
      this.OverPixelWidth = 1250;
      this.MainMaxwidthPixel = 1250;

      this.PopupParam = {
        ActorID: this.ActorId,
        PriceListTopicID: row.PriceListTopicID,
        RegionCode: row.RegionCode,
        UnitPatternID: row.UnitPatternID,
      };
    }
  }
  onShowHistoryListClick(row) {
    if (row) {
      this.PopUpType = 'contractor-card-list';
      this.isClicked = true;
      this.startLeftPosition = 74;
      this.startTopPosition = 5;
      this.MinHeightPixel = 500;
      this.PixelHeight = 600;
      this.MainMaxwidthPixel = 1250;
      this.OverPixelWidth = 1250;
      this.MainMaxwidthPixel = 1250;

      this.PopupParam = {
        ActorID: this.ActorId,
        PriceListTopicID: null,
        RegionCode: null,
        UnitPatternID: null,
      };
    }
  }

  FetchMoreBusinessPattern(event) {
    event.Owner.RankColumnDef[8].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.Common.GetBusinessPatternPaging(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.VWExeUnitParams.selectedObject,
        event.Owner.BusinessPatternParams.selectedObject).
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
      event.Owner.RankColumnDef[8].cellEditorParams.Params.loading = false;
      event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'business-pattern'
      });
    });
  }
  FetchBusinessPatternByTerm(event) {
    event.Owner.RankColumnDef[8].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetBusinessPatternPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.VWExeUnitParams.selectedObject,
      event.Owner.BusinessPatternParams.selectedObject).
      subscribe(res => {
        event.Owner.RankColumnDef[8].cellEditorParams.Params.loading = false;
        event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'business-pattern'
        });
      });
  }
  RedioSelectedChangeBusinessPattern(event) {
    event.Owner.RankColumnDef[8].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetBusinessPatternPaging(event.SearchOption,
      '',
      1,
      30,
      event.Owner.VWExeUnitParams.selectedObject,
      event.Owner.BusinessPatternParams.selectedObject).
      subscribe(res => {
        event.Owner.RankColumnDef[8].cellEditorParams.Params.loading = false;
        event.Owner.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'business-pattern'
        });
      });
  }
  onShowRunningContractsClick() {
    if (!this.ActorId) {
      this.PopUpType = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }
    this.PopUpType = 'current-suppliers-contract';
    this.isClicked = true;
    this.startLeftPosition = 74;
    this.startTopPosition = 5;
    this.MinHeightPixel = 500;
    this.PixelHeight = 600;
    // this.minWidthPixel = 1250;
    this.OverPixelWidth = 1250;
    this.MainMaxwidthPixel = 1250;

    this.PopupParam = {
      ActorID: this.ActorId,
    };
  }
  OnshowhistorydetailClick() {
    if (this.PersonObject && this.PersonObject.ActorId) {
      this.PopUpType = 'show-history-detail';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 80;
      this.startTopPosition = 20;

      this.OverMainMinwidthPixel = 1200;
      this.MainMaxwidthPixel = 1200;

      this.PixelHeight = 600;
      this.MinHeightPixel = 600;
      let ObjectIDList = [];

      this.PopupParam = {
        ActorId: this.PersonObject.ActorId,
        HeaderName: 'مشاهده ریز اصلاحات',
        ModuleCode: 2784
      };
    }
  }
  SetChangeFlag() {
    this.IdentityNoSearchChangeFlag = false;
    this.LastNameChangeFlag = false;
    this.BirthCertificateSerialChangeFlag = false;
    this.EconomicCodeChangeFlag = false;
    this.VeteranPercentChangeFlag = false;
    this.BirthDateSearchChangeFlag = false;
    this.FatherNameChangeFlag = false;
    this.BirthPlaceChangeFlag = false;
    this.ActorNoteChangeFlag = false;
    this.FirstNameChangeFlag = false;
    this.BirthCertificateNoChangeFlag = false;
    this.IssuancePlaceChangeFlag = false;
    this.AllowStateNameChangeFlag = false;
    this.AddressChangeFlag = false;
    this.PostCodeChangeFlag = false;
    this.FaxChangeFlag = false;
    this.WebChangeFlag = false;
    this.EmailChangeFlag = false;
    this.CellNoChangeFlag = false;
    this.IsContractorChangeFlag = false;
    this.IsConsultChangeFlag = false;
    this.IsProducerChangeFlag = false;
    this.IsSupplierChangeFlag = false;
    this.IsInternalBuildersChangeFlag = false;
    this.IsExternalBuildersChangeFlag = false;
    forkJoin([
      this.Common.GetLastAuditByObjectID(this.ActorId),
      this.Common.CheckAllowState(this.ActorId),
    ]).subscribe(res => {
      if (res[1] === true) {
        // let ChangeActoBusinessObj = res[0].filter(x => x.TableName === 'ACTOR_BUSINESS');
        // let ActoBusinessObjList = [];
        // this.RankgridApi.stopEditing();
        // ChangeActoBusinessObj.forEach(element => {
        //   this.RankrowsData.forEach(element2 => {
        //     if (element.ObjectID === element2.ActorBusinessID) {
        //       element2.IsChanged = true;
        //     }
        //     ActoBusinessObjList.push(element2);
        //   });
        //   this.RankrowsData = ActoBusinessObjList;
        // });

        let ChangePersonObj = res[0].filter(x => x.TableName === 'PERSON');
        ChangePersonObj.forEach(element => {
          if (element.ColumnName === 'IDENTITY_NO') {
            this.IdentityNoSearchChangeFlag = true;
          } else if (element.ColumnName === 'LAST_NAME') {
            this.LastNameChangeFlag = true;
          } else if (element.ColumnName === 'BIRTH_CERTIFICATE_SERIAL') {
            this.BirthCertificateSerialChangeFlag = true;
          } else if (element.ColumnName === 'VETERAN_PERCENT') {
            this.VeteranPercentChangeFlag = true;
          } else if (element.ColumnName === 'BIRTH_DATE') {
            this.BirthDateSearchChangeFlag = true;
          } else if (element.ColumnName === 'FATHER_NAME') {
            this.FatherNameChangeFlag = true;
          } else if (element.ColumnName === 'BIRTH_PLACE') {
            this.BirthPlaceChangeFlag = true;
          } else if (element.ColumnName === 'FIRST_NAME') {
            this.FirstNameChangeFlag = true;
          } else if (element.ColumnName === 'BIRTH_CERTIFICATE_NO') {
            this.BirthCertificateNoChangeFlag = true;
          } else if (element.ColumnName === 'ISSUANCE_PLACE') {
            this.IssuancePlaceChangeFlag = true;
          }
        });
        let ChangeActorObj = res[0].filter(x => x.TableName === 'ACTOR');
        ChangeActorObj.forEach(element => {
          if (element.ColumnName === 'ECONOMIC_CODE') {
            this.EconomicCodeChangeFlag = true;
          } else if (element.ColumnName === 'ADDRESS') {
            this.AddressChangeFlag = true;
          } else if (element.ColumnName === 'POST_CODE') {
            this.PostCodeChangeFlag = true;
          } else if (element.ColumnName === 'WEB') {
            this.WebChangeFlag = true;
          } else if (element.ColumnName === 'EMAIL') {
            this.EmailChangeFlag = true;
          } else if (element.ColumnName === 'CELL') {
            this.CellNoChangeFlag = true;
          } else if (element.ColumnName === 'ALLOW_STATE_CODE') {
            this.AllowStateNameChangeFlag = true;
          }
        });
        let ChangeActorRoleObj = res[0].filter(x => x.TableName === 'ACTOR_ROLE');
        ChangeActorRoleObj.forEach(element => {
          if (element.ColumnName === 'IS_CONTRACTOR') {
            this.IsContractorChangeFlag = true;
          } else if (element.ColumnName === 'IS_CONSULT') {
            this.IsConsultChangeFlag = true;
          } else if (element.ColumnName === 'IS_PRODUCER') {
            this.IsProducerChangeFlag = true;
          } else if (element.ColumnName === 'IS_SUPPLIER') {
            this.IsSupplierChangeFlag = true;
          } else if (element.ColumnName === 'IS_INTERNAL_BUILDERS') {
            this.IsInternalBuildersChangeFlag = true;
          } else if (element.ColumnName === 'IS_EXTERNAL_BUILDERS') {
            this.IsExternalBuildersChangeFlag = true;
          }
        });
      }
    });
  }
}

