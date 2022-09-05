import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-user-work-log-Product-Request',
  templateUrl: './user-work-log-Product-Request.component.html',
  styleUrls: ['./user-work-log-Product-Request.component.css']
})
export class UserWorkLogProductRequestComponent implements OnInit {
  @ViewChild('IsPostedToClean') IsPostedToClean: TemplateRef<any>;
  @ViewChild('ProductRequestBtn') ProductRequestBtn: TemplateRef<any>;
  @ViewChild('ProductRequestRevoction') ProductRequestRevoction: TemplateRef<any>;
  @Input() PopupParam;
  @Input() ModuleName;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  McRadioTypes: Array<RadioBoxModel> = [];
  MCSRadioTypes: Array<RadioBoxModel> = [];
  private gridApi;
  UnderTakeTypeCheck;
  UnderTakeTypeValue;
  HasContract = false;
  ContractPayColumnDef;
  FromRequestPageCount;
  FromRequestTotalItemCount;
  ToRequestPageCount;
  ToRequestTotalItemCount;
  MaincolumnDef;
  ProductRequestObject = null;
  IsDisableClarification = true;
  ClearedToViewFlow: boolean;
  NgSelectSearchTerm = '';
  NgSelectItems;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  UnderTakeTypeCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  startLeftPosition: number;
  startTopPosition: number;
  WorkflowObjectCode = [3, 4, 5];
  MinHeightPixel: number;
  SearchOption: string;
  SubjectParameter: string;
  ReqPayParameter: string;
  LetterParameter: string;
  ContractCodeParameter: number;
  PriceListTopicItems;
  selectedRow;
  IsCost = true;
  IsIncome: boolean;
  HasOpenWF;
  HasCloseWF;
  IsNew = false;
  IsExtended = false;
  FromProductRequestDate;
  ToProductRequestDate;
  FromStartContractDate;
  ToStartContractDate;
  FromEndContractDate;
  ToEndContractDate;
  FromConclusionContractDate;
  ToConclusionContractDate;
  FromCommitionDate;
  ToCommitionDate;
  FromDocumentDeadlineDate;
  ToDocumentDeadlineDate;
  PersonItems: any;
  PersonReqItems: any;
  WinnerItems: any;
  ContractorType = true;
  TypeContractor = true;
  currentContractSearchTerm;
  ContractItems;
  ContractTotalItemCount;
  ContractPageCount;
  IsShowMultipeRegion = false;
  MainMaxwidthPixel;
  RequestTypes = [
    {
      RequestTypesName: 'درخواست معامله',
      RequestTypesCode: 2730
    },
    {
      RequestTypesName: 'درخواست معامله ملکی',
      RequestTypesCode: 2776
    },
    {
      RequestTypesName: 'قرارداد بدون گردش',
      RequestTypesCode: 2739
    },
    {
      RequestTypesName: 'قرارداد  مشارکتی',
      RequestTypesCode: 2840
    },
    { // RFC 64185
      RequestTypesName: 'درخواست معامله پژوهشي',
      RequestTypesCode: 2895
    }
  ];
  IsNewItems = [
    {
      RequestTypesName: 'جدید',
      RequestTypesCode: 1
    },
    {
      RequestTypesName: 'تمدید',
      RequestTypesCode: 2
    },
    {
      RequestTypesName: 'تامین مانده اعتبار',
      RequestTypesCode: 3
    },
    {
      RequestTypesName: 'همه',
      RequestTypesCode: 4
    }
  ];
  RequestedPersonItems;
  RequestedPersonParams = {
    bindLabelProp: 'FullPersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RequestTypesParams = {
    bindLabelProp: 'RequestTypesName',
    bindValueProp: 'RequestTypesCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  IsNewParams = {
    bindLabelProp: 'RequestTypesName',
    bindValueProp: 'RequestTypesCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    clearable: false,
  };
  BtnClickedName: any;
  NgSelectPersonParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'user-person-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectPersonReqParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'user-person-Req-search',
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
  NgSelectWinnerParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'user-Winner-search',
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
  paramObj;
  AmountTypeItems = [
    {
      AmountTypeName: 'قطعی',
      AmountTypeCode: 1
    },
    {
      AmountTypeName: 'تا سقف مبلغ',
      AmountTypeCode: 2
    }
  ];
  AmountTypeParams = {
    bindLabelProp: 'AmountTypeName',
    bindValueProp: 'AmountTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  DealTypeItems = [];
  DealTypeParams = {
    bindLabelProp: 'DealTypeName',
    bindValueProp: 'DealTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  StartDateTypeItems = [
    {
      StartDateName: 'از تاریخ شروع',
      StartDateCode: 1
    },
    {
      StartDateName: 'از تاریخ انعقاد',
      StartDateCode: 2
    }
  ];
  StartDateParams = {
    bindLabelProp: 'StartDateName',
    bindValueProp: 'StartDateCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProvisionTypeItems = [
    {
      ProvisionTypeName: 'عمرانی',
      ProvisionTypeCode: 1
    },
    {
      ProvisionTypeName: 'جاری',
      ProvisionTypeCode: 2
    }
  ];
  ProvisionTypeParams = {
    bindLabelProp: 'ProvisionTypeName',
    bindValueProp: 'ProvisionTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  UnderTakeTypeItems = [
    {
      UnderTakeTypeName: 'دارد',
      UnderTakeTypeCode: 1
    },
    {
      UnderTakeTypeName: 'ندارد',
      UnderTakeTypeCode: 2
    }
  ];
  UnderTakeParams = {
    bindLabelProp: 'UnderTakeTypeName',
    bindValueProp: 'UnderTakeTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RefRequestItems = [
    {
      RefRequestName: 'سامانه قرارداد ها',
      RefRequestCode: 1
    },
    {
      RefRequestName: 'سامانه جامع معاملات',
      RefRequestCode: 2
    }
  ];
  ContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    MinWidth: '130px',
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractTypeItems;
  RefRequestParams = {
    bindLabelProp: 'RefRequestName',
    bindValueProp: 'RefRequestCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProvisionCenteralTypeItems = [
    {
      ProvisionCenteralName: 'خودش(سازمان/منطقه)',
      ProvisionCenteralCode: 1
    },
    {
      ProvisionCenteralName: 'متمرکز',
      ProvisionCenteralCode: 2
    }
  ];
  ProvisionCenteralParams = {
    bindLabelProp: 'ProvisionCenteralName',
    bindValueProp: 'ProvisionCenteralCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RequestTypeItems = [
    {
      RequestTypeName: 'باطل شده',
      RequestTypeCode: 1
    },
    {
      RequestTypeName: 'باطل نشده',
      RequestTypeCode: 2
    }
  ];
  RequestTypeParams = {
    bindLabelProp: 'RequestTypeName',
    bindValueProp: 'RequestTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CommitionTypeItems = [
    {
      CommitionTypeName: 'دارد',
      CommitionTypeCode: 1
    },
    {
      CommitionTypeName: 'ندارد',
      CommitionTypeCode: 2
    },
    {
      CommitionTypeName: 'امضای دیجیتال دارد',
      CommitionTypeCode: 3
    }
  ];
  CommitionTypeParams = {
    bindLabelProp: 'CommitionTypeName',
    bindValueProp: 'CommitionTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RolesItems;
  RolesParams = {
    bindLabelProp: 'RoleName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractorTypeItems = [
    {
      ContractorTypeName: 'حقیقی',
      ContractorTypeCode: 1
    },
    {
      ContractorTypeName: 'حقوقی',
      ContractorTypeCode: 2
    }
  ];
  ContractorParams = {
    bindLabelProp: 'ContractorTypeName',
    bindValueProp: 'ContractorTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  VWExeUnitItems;
  HaveClarification;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgSelectRegionParams = {
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
  NgSelectFromFinYearParams = {
    Items: [],
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectToFinYearParams = {
    Items: [],
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectModuleParams = {
    Items: [],
    bindLabelProp: 'WorkflowTypeName',
    bindValueProp: 'WorkflowTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '350px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-from-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 30, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 20, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', CanGrow: true, HeaderName: 'Subject', width: 35, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 30, },
        { HeaderCaption: 'کد', width: 20, },
        { HeaderCaption: 'موضوع', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  ToRequestItems = [];
  ToRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-to-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'کد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  RusteeItems;
  RusteeParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  SubRusteeItems;
  SubRusteeParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  SubCostCenterItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgSelectLetterParamsFrom = {
    Items: [],
    bindLabelProp: 'LetterNo',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectLetterParamsTo = {
    Items: [],
    bindLabelProp: 'LetterNo',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  NgSelectContractStatusList = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectWFNodeItems;
  NgSelectWFNodeList = {
    bindLabelProp: 'WorkflowNodeName',
    bindValueProp: 'WorkflowNodeID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  LetterListSet = [];
  ReigonListSet = [];
  ContractStatusList = [];
  ModuleNameListSet = [];
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  loading = false;
  HaveSave = false;
  HaveDelete = false;
  RegionCode;
  ModuleCode;
  selectedWorkflowtype;
  HasRegion;
  rowData: any;
  FinYearList: any;
  workflowtype;
  OverPixelWidth: number;
  private sub: any;
  WorkflowObject: any;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  currentRequestSearchTerm;
  currentFromRequestObject: any;
  currentToRequestObject: any;
  ShowProductRequest = false;
  ShowProductRequestBtn = false;
  ShowDeleteButton = false;
  IsDisableShowProductRequest = false;
  IsAdmin = false;
  ShowIsOver15 = false;
  ShowRecentAll = false;
  ContractorId = null;
  ShowIsCleared = false;
  ShowIsContact = false;
  ShowIsHasContact = false;
  ShowIsShowLetters = false;
  ShowIsreport = false;
  ContractorItems;
  SupplierItems;
  NgSelectSupplierParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'product-request-contract-supplier',
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
  NgSelectContractorParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
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
  ContractorTotalItemCount;
  ContractorPageCount;
  SupplierPageCount;
  SupplierTotalItemCount;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];
  DealMethodItems = [];
  DealMethodParams = {
    bindLabelProp: 'DealMethodName',
    bindValueProp: 'DealMethodCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  RequesterTotalItemCount;
  RequesterPageCount;
  RequesterItems;
  NgRequesterParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'Requester-Person',
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
  ContractParams = {
    bindLabelProp: 'SelectedSubject',
    bindValueProp: 'ContractId',
    placeholder: '',
    MinWidth: '147px',
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
  HaveMutualContract = null;
  MutualContractStatus;
  IsHaveMutualContract = true;
  CostFactorIDParameter: string;
  ContractIDParameter: string;
  ResearcherID;
  ShowExternalService = false;
  ExternalServiceRole1253 = false;
  LetterTypeCodeList;
  IsCollective = false;
  StartLeft = 524;
  IsCash;
  IsNonCash;
  BgtTopicCode: string;
  Renewedtender: boolean = false;
  RenewedtenderParams = {
    bindLabelProp: 'RenewedtenderCode',
    bindValueProp: 'RenewedtenderCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RenewedtenderItems = [
    {
      RenewedtenderCode: '1'
    },
    {
      RenewedtenderCode: '2'
    },
    {
      RenewedtenderCode: '3'
    }
  ];
  IsEstateSearch = false;
  Select22Area;
  FromContractTotalItemCount;
  FromContractPageCount;
  NgSelectContractParamsFrom = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'ContractId',
    MinWidth: '130px',
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
  ContractListSetFrom = [];
  CostContractID;
  CommitionMemberItems;
  CommitionMemberParams = {
    Items: [],
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
    MinWidth: '130px',
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
        [{ HeaderCaption: 'عنوان کمیسیون', HeaderName: 'CommitionName', width: 35, MinTermLenght: 3, SearchOption: 'CommitionName' },
        { HeaderCaption: 'نام', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'عنوان کمیسیون', width: 35, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ProvisionCode;
  ProvisionFinYearItems;
  ProvisionFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  IsRepSearch = false;
  IsEditable = true;
  DisableRConnection = false;
  PercentWidth: number;
  PixelHeight: number;
  CostFactorID: number;
  ActorId;
  IsOrderCommition: boolean;
  Ckeckexceptions: boolean;
  OrginalModuleCode: string;
  IsCompleteContractInfoForSendClarification: boolean;
  SetWinner: Boolean;

  constructor(private router: Router,
    private Workflow: WorkflowService,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private ModuleList: ModuleService,
    private route: ActivatedRoute,
    private RefreshPersonItems: RefreshServices,
    private ContractService: ContractListService,
    private User: UserSettingsService,
    private Actor: ActorService,
    private Automation: AutomationService,
    private rprt: ReportService) {
    this.SubjectParameter = '';
    this.ReqPayParameter = '';
    this.LetterParameter = '';
    this.CostContractID = 0;
    this.ContractCodeParameter = null;
    this.ContractIDParameter = '';
    this.CostFactorIDParameter = '';
    this.BgtTopicCode = '';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      if (this.ModuleCode === 2980 || this.ModuleCode === 2896) { this.IsShowMultipeRegion = true }
    });

  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onGridReady(Param) {
    this.gridApi = Param.api;
  }
  ngOnInit() {
    this.TypeContractor = true;
    this.ContractorTypeRadioParam = [];
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقیقی', true, false, 'rdoContractorType1_uwlpr'));
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقوقی', false, false, 'rdoContractorType2_uwlpr'));
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 6;

    this.UnderTakeTypeCheckBoxConfig.color = 'state p-primary';
    this.UnderTakeTypeCheckBoxConfig.icon = 'fa fa-check';
    this.UnderTakeTypeCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.UnderTakeTypeCheckBoxConfig.AriaWidth = 5;
    this.IsCollective = this.ModuleCode === 2896 ? true : false;
    // this.ShowProductRequest = this.ModuleCode === 2793 || this.ModuleCode === 2824 || this.ModuleCode === 2756;
    this.ShowExternalService = this.ModuleCode === 2793 || this.ModuleCode === 2824 || this.ModuleCode === 3033;
    //  this.ShowProductRequestBtn = this.ModuleCode === 2838;
    this.ShowDeleteButton = (this.ModuleCode === 2793 || this.ModuleCode === 2824) ? true : false;
    this.ShowRecentAll = this.ShowIsOver15 = this.ModuleCode === 2793;
    this.ShowIsCleared = this.ModuleCode === 3033;
    this.ShowIsContact = this.ModuleCode === 3033;
    this.ShowIsHasContact = this.ModuleCode === 3033;
    this.ShowIsShowLetters = this.ModuleCode === 3033;
    this.ShowIsreport = this.ModuleCode === 3033;
    this.rowData = [];
    this.getNewData();
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {
          case 30:
            this.HaveClarification = true;
            break;
          default:
            break;
        }
      });
    });

    this.User.ViewSpecialPermission().subscribe(res => {
      this.IsAdmin = res;
    });
    this.MakeMCRadioTypes();
    this.MakeMCSRadioTypes();

    this.User.CheckAdminRole1253().subscribe(res => { // RFC 52551
      if (res) {
        this.ExternalServiceRole1253 = this.ModuleCode === 2756;
      }
    });
    if (this.ModuleCode === 2980) { // RFC 60260
      this.RequestTypesParams.selectedObject = 2776;
      this.IsEstateSearch = true;
    }
    if (this.ModuleCode === 2980 || this.ModuleCode === 2896) {
      this.NgSelectRegionParams.MinWidth = '112px';
    }

    if (this.ModuleCode === 2996) { // RFC 62697
      this.RequestTypesParams.selectedObject = 2730;
      // this.IsRepSearch = true; // RFC 64185
    }
  }
  FullDeleteProdReq() {
    if (this.ModuleCode === 2824 && this.selectedRow.data) {
      if ((!this.selectedRow.data.CostFactorID || this.selectedRow.data.CostFactorID === null) ||
        (this.selectedRow.data.ContractSatusCode === 1) ||
        ((this.selectedRow.data.CostFactorID || this.selectedRow.data.CostFactorID !== null)
          && this.selectedRow.data.ContractSatusCode === 1)) {
      } else {
        this.ShowMessageBoxWithOkBtn('این درخواست شرایط لازم برای حذف شدن ندارد');
        return;
      }
    }
    if (this.selectedRow.data && this.selectedRow.data.ProductRequestID) {
      this.BtnClickedName = 'FullDelProdReq';
      this.ShowMessageBoxWithYesNoBtn('آیا مایل به حذف درخواست انتخاب شده به همراه اسناد مربوطه میباشید؟');
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا یک ردیف را برای حذف انتخاب نمایید.');
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'درخواست معامله',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        hide: (this.ModuleCode === 3033) ? true : false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestBtn,
        }
      },
      {
        headerName: 'ابطال',
        field: '',
        width: 50,
        sortable: false,
        resizable: false,
        hide: (this.ModuleCode === 2793 || this.ModuleCode === 2824) ? false : true, // 62923
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestRevoction,
        }
      },
      {
        headerName: 'نوع درخواست',
        field: 'ProductRequestType',
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
        headerName: 'کد درخواست',
        field: 'ProductRequestCode',
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
        headerName: 'معاونت مجری',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت متولی',
        field: 'PRStackHolderName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'درخواست کننده',
        field: 'PersonNameSet',
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'کد پژوهش',
        field: 'ResearcherID',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'مبلغ درخواست',
        field: 'SumAmount',
        width: 100,
        HaveThousand: true,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'موضوع درخواست',
        field: 'ProductRequestSubject',
        width: 350,
        resizable: true
      },
      {
        headerName: 'حالت درخواست',
        field: 'ProductRequestStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت درخواست',
        field: 'RoleName',
        width: 350,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'َشناسه ملی / کد ملی',
        field: 'IdentityNo',
        width: 250,
        resizable: true
      },
      {
        headerName: 'َماهیت',
        field: 'CostType',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نحوه اجرای کار',
        field: 'DealMethodName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'ناظر',
        field: 'ObserverName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ صورتحساب',
        field: 'InvoiceAmount',
        hide: !(this.NgSelectRegionParams.selectedObject == 200 && !this.IsCost && this.ModuleCode == 2756),
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'کد سامانه مالی',
        field: 'ContractCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نود گردش کار',
        field: 'WorkFlowNodeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'ارسال به سامانه شفاف',
        field: 'IsPostedToClean',
        width: 130,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsPostedToClean
        },
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'شناسه درخواست',
        field: 'ProductRequestID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه قرارداد',
        field: 'ContractID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع پیمانکار',
        field: 'StatusContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره تامین',
        field: 'ProvisionCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'سال مالی تامین',
        field: 'ProvisionFinYearCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
    ];
  }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetRegionList(this.ModuleCode, false),
      this.ContractService.GetContractStatusList()
      // this.Actor.GetAllActorsPaging(1, 30, '', 'IdentityNo', this.TypeContractor, false, false, this.ContractorId)
    ]).subscribe(res => {
      this.ProvisionFinYearItems = this.FinYearItems = res[0];
      this.ReigonListSet = res[1];
      this.NgSelectRegionParams.selectedObject = res[1][0].RegionCode;
      this.ContractStatusList = res[2];
      // this.Workflow.GetWorkflowList(res[1][0].RegionCode).subscribe(ress => {
      //   this.NgSelectWFNodeItems = ress.WorkflowTransitionViewList;
      // })
      this.Workflow.GetWorkflowNodeByRegionCode(res[1][0].RegionCode).subscribe(ress => {
        this.NgSelectWFNodeItems = ress;
      });
    });
  }
  onChangeReigonObj(newObj) {
    this.NgSelectModuleParams.selectedObject = null;
    this.VWExeUnitParams.selectedObject = null;
    this.DealMethodParams.selectedObject = null;
    this.ModuleNameListSet = [];
    this.rowData = [];
    this.NgSelectWFNodeList.selectedObject = null;
    this.Workflow.GetWorkflowNodeByRegionCode(newObj).subscribe(ress => {
      this.NgSelectWFNodeItems = ress;
    });
    this.RolesParams.selectedObject = null;
    this.Roles_Open();
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'ExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.NgSelectRegionParams.selectedObject).subscribe(res =>
          this.VWExeUnitItems = res
        );
        break;
      case 'Module':
        this.Workflow.GetWorkflowListByRegionCode(this.NgSelectRegionParams.selectedObject).subscribe(res =>
          this.ModuleNameListSet = res
        );
        break;
      case 'Rustee':
        this.ProductRequest.GetByRegionCodeUserWorkLog(this.NgSelectRegionParams.selectedObject, null, true).subscribe(res =>
          this.RusteeItems = res
        );
        break;
      case 'SubRustee':
        this.ProductRequest.GetSubCostCenterList(this.RusteeParams.selectedObject).subscribe(Res => {
          this.SubRusteeItems = Res;
        });
        break;
      case 'CostCenter':
        this.ProductRequest.GetByRegionCodeUserWorkLog(this.NgSelectRegionParams.selectedObject, null, true).subscribe(res =>
          this.CostCenterItems = res
        );
        break;
      case 'SubCostCenter':
        this.ProductRequest.GetSubCostCenterList(this.CostCenterParams.selectedObject).subscribe(Res => {
          this.SubCostCenterItems = Res;
        });
        break;
      case 'FromRequest':
        this.FromRequestParams.loading = true;
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
              }
            });
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          });
        break;
      case 'ToRequest':
        this.ToRequestItems = [];
        this.ToRequestParams.loading = true;
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
              }
            });
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          });
        break;
      case 'DealMethod':
        this.ProductRequest.GetDealMethodListforPRSearch().subscribe(res => {
          this.DealMethodItems = res;
          this.DealMethodItems.forEach((item) => {
            if (item.IsCost) {
              item.DealMethodName = item.DealMethodName + ' - ' + 'هزينه اي';
            } else {
              item.DealMethodName = item.DealMethodName + ' - ' + 'درآمدي';
            }
          });
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
          });
        }
        break;
      case 'Contract':
        this.ContractParams.loading = true;
        const ResultList = [];
        this.ContractService.GetRelatedContractpagingForExtended(1, 30, '', '', this.NgSelectRegionParams.selectedObject,
          this.IsCost ? this.IsCost : false, false, null)
          .subscribe((res: any) => {
            this.ContractItems = res.List;
            this.ContractTotalItemCount = res.TotalItemCount;
            this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ContractParams.loading = false;
          });
        break;
      case 'CommitionMember':
        this.ProductRequest.GetCommitionMemberListByRegionCode(
          null, null,
          this.NgSelectRegionParams.selectedObject
        ).subscribe(res => {
          if (res) {
            this.CommitionMemberItems = res;
          }
        });
        break;
      case 'DealType':
        this.ProductRequest.GetDealTypeList().subscribe(res =>
          this.DealTypeItems = res

        );
        break;

      default:
        break;
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = this.StartLeft;
    this.OverPixelWidth = null;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  popupclosed(param) {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = null;
    this.alertMessageParams.IsMultiLine = false;
    this.PixelHeight = null;
    this.StartLeft = 545;
    if (this.type === 'global-choose-page') {
      switch (param) {
        case 1:
          this.UploadContractInClarification();
          break;
        // case 2:
        //   this.UploadInRecentAllClarification();
        //   break;
        case 3:
          this.UploadContractInProjectControl();
          break;
        case 4:
          this.OnCallContractStatmentService();
          break;
        case 5: // RFC 52381
          this.BtnIsOver25();
          break;
        case 6: // RFC 52381
          this.BtnIsOutsideAmendment();
          break;
        case 7: // RFC 57606
          this.BtnIsStarOver30();
          break;
        case 8: // RFC 65570
          this.SendToBgt();
          break;
        case 9:
          this.OnCallExternal();
          break;
        case 10:
          this.onChangeContract();
          break;
        case 11:
          this.onReturnCancel();
          break;
        case 12:
          this.Mechanized();
          break;
        default:
          break;
      }
    }
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
    this.ClearedToViewFlow = (this.selectedRow && this.selectedRow.data && this.selectedRow.data.WorkFlowInstanceId);
    this.IsDisableClarification = !(this.selectedRow && this.selectedRow.data && this.selectedRow.data.ContractID);
    // this.IsDisableShowProductRequest = this.selectedRow.data.ContractSatusCode === 2;
    this.DisableRConnection = (this.selectedRow && this.selectedRow.data && this.selectedRow.data.ResearcherID);
    if (InputValue.data.IdentityNo && InputValue.data.LetterNo) {
      this.HasContract = true;
    } else {
      this.HasContract = false;
    }
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  Search() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'درخواست معامله',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestBtn,
        }
      },
      {
        headerName: 'ابطال',
        field: '',
        width: 50,
        sortable: false,
        resizable: false,
        hide: (this.ModuleCode === 2793 || this.ModuleCode === 2824) ? false : true, // 62923
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestRevoction,
        }
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 130,
        resizable: true,
        sortable: true,
        hide: !this.IsCollective
      },
      {
        headerName: 'نوع درخواست',
        field: 'ProductRequestType',
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
        headerName: 'کد درخواست',
        field: 'ProductRequestCode',
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
        headerName: 'معاونت مجری',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت متولی',
        field: 'PRStackHolderName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'درخواست کننده',
        field: 'PersonNameSet',
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'کد پژوهش',
        field: 'ResearcherID',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'مبلغ درخواست',
        field: 'SumAmount',
        width: 100,
        HaveThousand: true,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'موضوع درخواست',
        field: 'ProductRequestSubject',
        width: 350,
        resizable: true
      },
      {
        headerName: 'حالت درخواست',
        field: 'ProductRequestStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت درخواست',
        field: 'RoleName',
        width: 350,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'َشناسه ملی / کد ملی',
        field: 'IdentityNo',
        width: 250,
        resizable: true
      },
      {
        headerName: 'َماهیت',
        field: 'CostType',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نحوه اجرای کار',
        field: 'DealMethodName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'ناظر',
        field: 'ObserverName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ صورتحساب',
        field: 'InvoiceAmount',
        hide: !(this.NgSelectRegionParams.selectedObject == 200 && !this.IsCost && this.ModuleCode == 2756),
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'کد سامانه مالی',
        field: 'ContractCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'ارسال به سامانه شفاف',
        field: 'IsPostedToClean',
        width: 130,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsPostedToClean
        },
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'قرارداد متقابل درآمدی',
        field: 'HaveMutualContractName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد منعقده',
        field: 'MutualContractStatusName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه درخواست',
        field: 'ProductRequestID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه قرارداد',
        field: 'ContractID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع پیمانکار',
        field: 'StatusContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره تامین',
        field: 'ProvisionCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'سال مالی تامین',
        field: 'ProvisionFinYearCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'ضریب پیشنهادی',
        field: 'ContractCoef',
        width: 120,
        resizable: true,
        hide: (this.ModuleCode === 2756 || this.ModuleCode === 2896) ? false : true,
      }
    ];

    this.selectedRow = null;
    let FromRequestNo = null;
    let ToRequestNo = null;
    this.ContractorId = this.NgSelectContractorParams.selectedObject ? this.NgSelectContractorParams.selectedObject : null;
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    const SupplierId = this.NgSelectSupplierParams.selectedObject ? this.NgSelectSupplierParams.selectedObject : null;
    this.ContractService.ContractRequestSearch(
      this.NgSelectRegionParams.selectedObject,
      this.VWExeUnitParams.selectedObject,
      this.IsCost,
      this.IsIncome,
      this.NgSelectModuleParams.selectedObject,
      FromRequestNo,
      ToRequestNo,
      null,
      null,
      this.IsNew,
      this.IsExtended,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      null,
      null,
      this.RequestTypesParams.selectedObject,
      this.RusteeParams.selectedObject,
      this.SubRusteeParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.SubjectParameter,
      this.ModuleCode,
      this.ResearcherID,
      this.ContractorId,
      this.NgSelectContractStatusList.selectedObject,
      this.FinYearParams.selectedObject,
      this.AmountTypeParams.selectedObject,
      this.StartDateParams.selectedObject,
      null,
      this.ProvisionCenteralParams.selectedObject,
      this.RequestTypeParams.selectedObject,
      this.CommitionTypeParams.selectedObject,
      this.UnderTakeTypeCheck,
      this.ContractorParams.selectedObject,
      this.NgSelectPersonParams.selectedObject,
      this.CostContractID,
      this.ContractCodeParameter,
      this.HasOpenWF,
      this.HasCloseWF,
      this.RolesParams.selectedObject,
      this.RefRequestParams.selectedObject,
      this.NgSelectPersonReqParams.selectedObject,
      this.ReqPayParameter ? this.ReqPayParameter.replace(/,/g, '') : this.ReqPayParameter,
      this.NgSelectWinnerParams.selectedObject,
      this.ContractTypeParams.selectedObject,
      this.FromConclusionContractDate,
      this.ToConclusionContractDate,
      this.DealMethodParams.selectedObject,
      this.NgSelectWFNodeList.selectedObject,
      this.NgRequesterParams.selectedObject,
      this.HaveMutualContract,
      this.MutualContractStatus,
      SupplierId,
      this.ContractIDParameter,
      this.CostFactorIDParameter,
      this.FromStartContractDate,
      this.ToStartContractDate,
      this.FromEndContractDate,
      this.ToEndContractDate,
      this.UnderTakeTypeValue,
      this.IsCash,
      this.IsNonCash,
      this.BgtTopicCode ? this.BgtTopicCode.replace(/,/g, '') : this.BgtTopicCode,
      this.Renewedtender,
      this.RenewedtenderParams.selectedObject,
      this.FromCommitionDate,
      this.ToCommitionDate,
      this.FromDocumentDeadlineDate,
      this.ToDocumentDeadlineDate,
      this.CommitionMemberParams.selectedObject,
      this.DealTypeParams.selectedObject,
      this.ProvisionCode,
      this.ProvisionFinYearParams.selectedObject,
    ).subscribe(res => {
      this.rowData = res;
    });
  }

  partialSearch() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'درخواست معامله',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestBtn,
        }
      },
      {
        headerName: 'ابطال',
        field: '',
        width: 50,
        sortable: false,
        resizable: false,
        hide: (this.ModuleCode === 2793 || this.ModuleCode === 2824) ? false : true, // 62923
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestRevoction,
        }
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 130,
        resizable: true,
        sortable: true,
        hide: !this.IsCollective
      },
      {
        headerName: 'نوع درخواست',
        field: 'ProductRequestType',
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
        headerName: 'کد درخواست',
        field: 'ProductRequestCode',
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
        headerName: 'معاونت مجری',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت متولی',
        field: 'PRStackHolderName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'درخواست کننده',
        field: 'PersonNameSet',
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'کد پژوهش',
        field: 'ResearcherID',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'مبلغ درخواست',
        field: 'SumAmount',
        width: 100,
        HaveThousand: true,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'موضوع درخواست',
        field: 'ProductRequestSubject',
        width: 350,
        resizable: true
      },
      {
        headerName: 'حالت درخواست',
        field: 'ProductRequestStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت درخواست',
        field: 'RoleName',
        width: 350,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'َشناسه ملی / کد ملی',
        field: 'IdentityNo',
        width: 250,
        resizable: true
      },
      {
        headerName: 'َماهیت',
        field: 'CostType',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نحوه اجرای کار',
        field: 'DealMethodName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'ناظر',
        field: 'ObserverName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ صورتحساب',
        field: 'InvoiceAmount',
        hide: !(this.NgSelectRegionParams.selectedObject == 200 && !this.IsCost && this.ModuleCode == 2756),
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'کد سامانه مالی',
        field: 'ContractCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'ارسال به سامانه شفاف',
        field: 'IsPostedToClean',
        width: 130,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsPostedToClean
        },
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'قرارداد متقابل درآمدی',
        field: 'HaveMutualContractName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد منعقده',
        field: 'MutualContractStatusName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه درخواست',
        field: 'ProductRequestID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه قرارداد',
        field: 'ContractID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع پیمانکار',
        field: 'StatusContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره تامین',
        field: 'ProvisionCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'سال مالی تامین',
        field: 'ProvisionFinYearCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
    ];

    this.selectedRow = null;
    let FromRequestNo = null;
    let ToRequestNo = null;
    this.ContractorId = this.NgSelectContractorParams.selectedObject ? this.NgSelectContractorParams.selectedObject : null;
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    const SupplierId = this.NgSelectSupplierParams.selectedObject ? this.NgSelectSupplierParams.selectedObject : null;
    this.ContractService.ContractRequestpartialSearch(
      this.NgSelectRegionParams.selectedObject,
      this.VWExeUnitParams.selectedObject,
      this.IsCost,
      this.IsIncome,
      this.NgSelectModuleParams.selectedObject,
      FromRequestNo,
      ToRequestNo,
      null,
      null,
      this.IsNew,
      this.IsExtended,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      null,
      null,
      this.RequestTypesParams.selectedObject,
      this.RusteeParams.selectedObject,
      this.SubRusteeParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.SubjectParameter,
      this.ModuleCode,
      this.ResearcherID,
      this.ContractorId,
      this.NgSelectContractStatusList.selectedObject,
      this.FinYearParams.selectedObject,
      this.AmountTypeParams.selectedObject,
      this.StartDateParams.selectedObject,
      null,
      this.ProvisionCenteralParams.selectedObject,
      this.RequestTypeParams.selectedObject,
      this.CommitionTypeParams.selectedObject,
      this.UnderTakeTypeCheck,
      this.ContractorParams.selectedObject,
      this.NgSelectPersonParams.selectedObject,
      this.CostContractID,
      this.ContractCodeParameter,
      this.HasOpenWF,
      this.HasCloseWF,
      this.RolesParams.selectedObject,
      this.RefRequestParams.selectedObject,
      this.NgSelectPersonReqParams.selectedObject,
      this.ReqPayParameter ? this.ReqPayParameter.replace(/,/g, '') : this.ReqPayParameter,
      this.NgSelectWinnerParams.selectedObject,
      this.ContractTypeParams.selectedObject,
      this.FromConclusionContractDate,
      this.ToConclusionContractDate,
      this.DealMethodParams.selectedObject,
      this.NgSelectWFNodeList.selectedObject,
      this.NgRequesterParams.selectedObject,
      this.HaveMutualContract,
      this.MutualContractStatus,
      SupplierId,
      this.ContractIDParameter,
      this.CostFactorIDParameter,
      this.FromStartContractDate,
      this.ToStartContractDate,
      this.FromEndContractDate,
      this.ToEndContractDate,
      this.UnderTakeTypeValue,
      this.IsCash,
      this.IsNonCash,
      this.BgtTopicCode ? this.BgtTopicCode.replace(/,/g, '') : this.BgtTopicCode,
      this.Renewedtender,
      this.RenewedtenderParams.selectedObject,
      this.FromCommitionDate,
      this.ToCommitionDate,
      this.FromDocumentDeadlineDate,
      this.ToDocumentDeadlineDate,
      this.CommitionMemberParams.selectedObject,
      this.DealTypeParams.selectedObject,
      this.ProvisionCode,
      this.ProvisionFinYearParams.selectedObject,
    ).subscribe(res => {
      this.rowData = res;
    });
  }


  SearchMoreInfo() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'درخواست معامله',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestBtn,
        }
      },
      {
        headerName: 'ابطال',
        field: '',
        width: 50,
        sortable: false,
        resizable: false,
        hide: (this.ModuleCode === 2793 || this.ModuleCode === 2824) ? false : true, // 62923
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestRevoction,
        }
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 130,
        resizable: true,
        sortable: true,
        hide: !this.IsCollective
      },
      {
        headerName: 'نوع درخواست',
        field: 'ProductRequestType',
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
        headerName: 'کد درخواست',
        field: 'ProductRequestCode',
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
        headerName: 'معاونت مجری',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت متولی',
        field: 'PRStackHolderName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'درخواست کننده',
        field: 'PersonNameSet',
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'کد پژوهش',
        field: 'ResearcherID',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'مبلغ درخواست',
        field: 'SumAmount',
        width: 100,
        HaveThousand: true,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'موضوع درخواست',
        field: 'ProductRequestSubject',
        width: 350,
        resizable: true
      },
      {
        headerName: 'حالت درخواست',
        field: 'ProductRequestStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت درخواست',
        field: 'RoleName',
        width: 350,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'َشناسه ملی / کد ملی',
        field: 'IdentityNo',
        width: 250,
        resizable: true
      },
      {
        headerName: 'َماهیت',
        field: 'CostType',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نحوه اجرای کار',
        field: 'DealMethodName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'ناظر',
        field: 'ObserverName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ صورتحساب',
        field: 'InvoiceAmount',
        hide: !(this.NgSelectRegionParams.selectedObject == 200 && !this.IsCost && this.ModuleCode == 2756),
        HaveThousand: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'کد سامانه مالی',
        field: 'ContractCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نود گردش کار',
        field: 'WorkFlowNodeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'ارسال به سامانه شفاف',
        field: 'IsPostedToClean',
        width: 130,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsPostedToClean
        },
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'قرارداد متقابل درآمدی',
        field: 'HaveMutualContractName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد منعقده',
        field: 'MutualContractStatusName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد متقابل درآمدی',
        field: 'PRRContractID',
        width: 130,
        resizable: true
      },
      {
        headerName: 'شناسه درخواست',
        field: 'ProductRequestID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه قرارداد',
        field: 'ContractID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نوع پیمانکار',
        field: 'StatusContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره تامین',
        field: 'ProvisionCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'سال مالی تامین',
        field: 'ProvisionFinYearCode',
        hide: this.ModuleCode === 2756 ? false : true,
        width: 100,
        resizable: true,
        sortable: true,
      },
    ];

    this.selectedRow = null;
    let FromRequestNo = null;
    let ToRequestNo = null;
    this.ContractorId = this.NgSelectContractorParams.selectedObject ? this.NgSelectContractorParams.selectedObject : null;
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    const SupplierId = this.NgSelectSupplierParams.selectedObject ? this.NgSelectSupplierParams.selectedObject : null;
    this.ContractService.ContractRequestSearchMoreInfo(
      this.NgSelectRegionParams.selectedObject,
      this.VWExeUnitParams.selectedObject,
      this.IsCost,
      this.IsIncome,
      this.NgSelectModuleParams.selectedObject,
      FromRequestNo,
      ToRequestNo,
      null,
      null,
      this.IsNew,
      this.IsExtended,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      null,
      null,
      this.RequestTypesParams.selectedObject,
      this.RusteeParams.selectedObject,
      this.SubRusteeParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.SubjectParameter,
      this.ModuleCode,
      this.ResearcherID,
      this.ContractorId,
      this.NgSelectContractStatusList.selectedObject,
      this.FinYearParams.selectedObject,
      this.AmountTypeParams.selectedObject,
      this.StartDateParams.selectedObject,
      null,
      this.ProvisionCenteralParams.selectedObject,
      this.RequestTypeParams.selectedObject,
      this.CommitionTypeParams.selectedObject,
      this.UnderTakeTypeCheck,
      this.ContractorParams.selectedObject,
      this.NgSelectPersonParams.selectedObject,
      this.CostContractID,
      this.ContractCodeParameter,
      this.HasOpenWF,
      this.HasCloseWF,
      this.RolesParams.selectedObject,
      this.RefRequestParams.selectedObject,
      this.NgSelectPersonReqParams.selectedObject,
      this.ReqPayParameter ? this.ReqPayParameter.replace(/,/g, '') : this.ReqPayParameter,
      this.NgSelectWinnerParams.selectedObject,
      this.ContractTypeParams.selectedObject,
      this.FromConclusionContractDate,
      this.ToConclusionContractDate,
      this.DealMethodParams.selectedObject,
      this.NgSelectWFNodeList.selectedObject,
      this.NgRequesterParams.selectedObject,
      SupplierId,
      this.HaveMutualContract,
      this.MutualContractStatus,
      this.ContractParams.selectedObject,
      this.ContractIDParameter,
      this.CostFactorIDParameter,
      this.FromStartContractDate,
      this.ToStartContractDate,
      this.FromEndContractDate,
      this.ToEndContractDate,
      this.UnderTakeTypeValue,
      this.IsCash,
      this.IsNonCash,
      this.BgtTopicCode ? this.BgtTopicCode.replace(/,/g, '') : this.BgtTopicCode,
      this.Renewedtender,
      this.RenewedtenderParams.selectedObject,
      this.FromCommitionDate,
      this.ToCommitionDate,
      this.FromDocumentDeadlineDate,
      this.ToDocumentDeadlineDate,
      this.CommitionMemberParams.selectedObject,
      this.DealTypeParams.selectedObject,
      this.ProvisionCode,
      this.ProvisionFinYearParams.selectedObject,
    ).subscribe(res => {
      this.rowData = res;
    });
  }

  BtnClick() {
    this.btnclicked = true;
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
      this.startLeftPosition = 175;
      this.startTopPosition = 250;
    } else {
      this.type = 'user-work-log-details';
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.OverPixelWidth = 1290;
      this.startLeftPosition = 40;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 640;

      this.paramObj = {
        HeaderName: 'جزئیات گردش',
        LetterNo: this.selectedRow.data.LetterNo,
        // Subject: this.selectedRow.data.Subject,
        FinYearCode: this.selectedRow.data.FinYearCode,
        ContractNo: this.selectedRow.data.ContractNo,
        OrderNo: this.selectedRow.data.OrderNo,
        ContractCode: this.selectedRow.data.ContractCode,
        ContractId: this.selectedRow.data.ContractID,
        ContractorName: this.selectedRow.data.ContractorName,
        ContractTypeName: this.selectedRow.data.ContractTypeName,
        ContractAmount: this.selectedRow.data.ContractAmount,
        LetterDatePersian: this.selectedRow.data.LetterDatePersian,
        OrderDate: this.selectedRow.data.OrderDatePersian,
        workflowtypeStatus: this.WorkflowObjectCode[0],
        WorkFlowInstanceId: this.selectedRow.data.WorkFlowInstanceId,
        ParentModuleCode: this.ModuleCode,
        ProductRequestCode: this.selectedRow.data.ProductRequestNo,
        PersianProductRequestDate: this.selectedRow.data.PersianProductRequestDates,
        Subject: this.selectedRow.data.ProductRequestSubject,
        CostFactorID: this.selectedRow.data.CostFactorID,
        ProductRequestID: this.selectedRow.data.ProductRequestID
      };
    }
  }

  FetchMoreRequest(event, type) {
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    const ResultList = [];
    this.ProductRequest.GetProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          if (element.ProductRequestNo) {
            element.ProductRequestCodeSub = element.ProductRequestNo;
          }
          if (element.search) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
          }
          if (element.ProductRequestCode) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
          }
          ResultList.push(element);
        });
        if (type === 'From') {
          this.FromRequestItems = ResultList;
          this.FromRequestParams.loading = false;
        } else {
          this.ToRequestItems = ResultList;
          this.ToRequestParams.loading = false;
        }
      });
  }

  doRequestSearch(event, type) {
    this.currentRequestSearchTerm = event.term;
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ProductRequestNo';
    }
    this.ProductRequest.GetProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        if (this.currentRequestSearchTerm === event.term) {
          res.List.forEach(element => {
            if (element.ProductRequestNo) {
              element.ProductRequestCodeSub = element.ProductRequestNo;
            }
            if (element.search) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
            }
            if (element.ProductRequestCode) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
            }
          });
          if (type === 'From') {
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          } else {
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          }
        }
      });
  }

  OnChangeCheckBoxValue(Ischeck, type) {
    switch (type) {
      case 'IsNew':
        this.IsNew = Ischeck;
        break;
      case 'IsExtended':
        this.IsExtended = Ischeck;
        break;
      case 'HasCloseWF':
        this.HasCloseWF = Ischeck;
        break;
      case 'HasOpenWF':
        this.HasOpenWF = Ischeck;
        break;
      case 'UnderTakeType':
        this.UnderTakeTypeCheck = Ischeck;
        break;
      case 'IsCash':
        this.IsCash = Ischeck;
        break;
      case 'IsNonCash':
        this.IsNonCash = Ischeck;
        break;
      case 'Renewedtender':
        {
          if (!Ischeck) {
            this.RenewedtenderParams.selectedObject = null;
          }
          this.Renewedtender = Ischeck;
        }
        break;
      case 'Select22َArea':
        this.Select22Area = Ischeck;
        const RegionCodeAreaList = [];
        if (Ischeck) {
          this.ReigonListSet.forEach(item => {
            if (item.RegionCode > 0 && item.RegionCode <= 22) {
              RegionCodeAreaList.push(item.RegionCode);
            }
          });
          this.NgSelectRegionParams.selectedObject = RegionCodeAreaList;
        }
        if (!Ischeck) {
          this.NgSelectRegionParams.selectedObject = null;
        }
        break;
      default:
        break;
    }
  }

  onChangeNgSelect(event, type) {
    switch (type) {
      case 'FromRequest':
        const ToItems = [];
        ToItems.push(this.FromRequestItems.find(x => x.CostFactorID === event));
        this.ToRequestItems = ToItems;
        this.ToRequestParams.selectedObject = this.FromRequestParams.selectedObject;
        break;
      case 'Rustee':
        this.SubRusteeParams.selectedObject = null;
        break;
      case 'CostCenter':
        this.SubCostCenterParams.selectedObject = null;
        break;
      case 'Module':
        this.RolesParams.selectedObject = null;
        break;
      default:
        break;
    }
  }

  OnFromProductRequestDateChange(ADate) {
    this.FromProductRequestDate = ADate.MDate;
  }

  OnToProductRequestDateChange(ADate) {
    this.ToProductRequestDate = ADate.MDate;
  }

  OnFromConclusionContractDateChange(ADate) {
    this.FromConclusionContractDate = ADate.MDate;
  }

  OnToConclusionContractDateChange(ADate) {
    this.ToConclusionContractDate = ADate.MDate;
  }

  BtnShowContactClick() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    } else {
      if (!this.selectedRow.data.ContractID) {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ردیف انتخاب شده فاقد قرارداد است.';
        this.startLeftPosition = 525;
        this.startTopPosition = 250;
        this.OverPixelWidth = null;
        return;
      }
      this.type = 'contract-case';
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.OverPixelWidth = 1290;
      this.startLeftPosition = 40;
      this.startTopPosition = 4;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 690;
      this.paramObj = {
        HeaderName: this.ModuleName,
        ModuleCode: this.ModuleCode,
        selectedRow: this.selectedRow,
        GridHeightInTab: 100,
        PanelHeightInTab: 99,
        HaveSave: false,
        IsViewable: true,
        IsEditable: false,
        ModuleViewTypeCode: 5555,
        SelectedContractID: this.selectedRow.data.ContractID,
        ProductRequestID: this.selectedRow.data.ProductRequestID
      };
      this.btnclicked = true;
    }
  }

  UploadContractInClarification() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      this.BtnClickedName = 'BtnClarification';
      // tslint:disable-next-line: max-line-length
      this.ShowMessageBoxWithYesNoBtn('این قرارداد در وب سایت شفاف نمایش داده می شود.لطفا از صحت و کامل بودن اطلاعات اطمینان حاصل کنید. آیامایل به ارسال هستید؟');
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
      this.BtnClickedName = '';
    }
  }

  UploadContract() {
    const selectedRows = this.gridApi.getSelectedRows();
    const ContractIDs = [];
    if (selectedRows && selectedRows.length > 0) {
      selectedRows.forEach(element => {
        if (element && element.ContractID) {
          ContractIDs.push(element.ContractID);
        }
      });
      if (ContractIDs && ContractIDs.length) { // RFC 54353
        this.ContractService.UploadContractInClarification(ContractIDs).subscribe(res => {
          if (res === '') {
            this.ShowMessageBoxWithOkBtn('ارسال به سامانه شفاف با موفقیت انجام شد.');
          } else {
            this.StartLeft = 106;
            this.ShowMessageBoxWithOkBtn(res);
            this.alertMessageParams.IsMultiLine = true;
          }
        });
      }
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    }
  }

  report() {
    let FromRequestNo = null;
    let ToRequestNo = null;
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    const HeaderName = 'درخواست معامله';

    let RusteeItems;
    if (this.RusteeParams.selectedObject) {
      this.RusteeParams.selectedObject.forEach(element => {
        if (RusteeItems) {
          RusteeItems = RusteeItems + ',' + element;
        } else {
          RusteeItems = element;
        }
      });
    } else {
      RusteeItems = '';
    }
    let SubRusteeItems;
    if (this.SubRusteeParams.selectedObject) {
      this.SubRusteeParams.selectedObject.forEach(element => {
        if (SubRusteeItems) {
          SubRusteeItems = SubRusteeItems + ',' + element;
        } else {
          SubRusteeItems = element;
        }
      });
    } else {
      SubRusteeItems = '';
    }
    let CostCenterItems = '';
    if (this.CostCenterParams.selectedObject) {
      this.CostCenterParams.selectedObject.forEach(element => {
        if (CostCenterItems) {
          CostCenterItems = CostCenterItems + ',' + element;
        } else {
          CostCenterItems = element;
        }
      });
    } else {
      CostCenterItems = '';
    }
    let SubCostCenter;
    if (this.SubCostCenterParams.selectedObject) {
      this.SubCostCenterParams.selectedObject.forEach(element => {
        if (SubCostCenter) {
          SubCostCenter = SubCostCenter + ',' + element;
        } else {
          SubCostCenter = element;
        }
      });
    } else {
      SubCostCenter = '';
    }
    let NgSelectContractStatusListItems;
    if (this.NgSelectContractStatusList.selectedObject) {
      this.NgSelectContractStatusList.selectedObject.forEach(element => {
        if (NgSelectContractStatusListItems) {
          NgSelectContractStatusListItems = NgSelectContractStatusListItems + ',' + element;
        } else {
          NgSelectContractStatusListItems = element;
        }
      });
    } else {
      NgSelectContractStatusListItems = '';
    }
    let FinYearItems;
    if (this.FinYearParams.selectedObject) {
      this.FinYearParams.selectedObject.forEach(element => {
        if (FinYearItems) {
          FinYearItems = FinYearItems + ',' + element;
        } else {
          FinYearItems = element;
        }
      });
    } else {
      FinYearItems = '';
    }
    let RolesParamsItems;
    if (this.RolesParams.selectedObject) {
      this.RolesParams.selectedObject.forEach(element => {
        if (RolesParamsItems) {
          RolesParamsItems = RolesParamsItems + ',' + element;
        } else {
          RolesParamsItems = element;
        }
      });
    } else {
      RolesParamsItems = '';
    }
    let VWExeUnitItem;
    if (this.VWExeUnitParams.selectedObject) {
      VWExeUnitItem = this.VWExeUnitParams.selectedObject;
    } else {
      VWExeUnitItem = null;
    }
    if (this.IsCost) {
    } else {
      this.IsCost = null;
    }
    if (this.IsIncome) {
    } else {
      this.IsIncome = null;
    }
    let NgSelectModuleItem;
    if (this.NgSelectModuleParams.selectedObject) {
      NgSelectModuleItem = this.NgSelectModuleParams.selectedObject;
    } else {
      NgSelectModuleItem = null;
    }
    let WorkFlowNodeCodeitems;
    if (this.NgSelectWFNodeList.selectedObject) {
      this.NgSelectWFNodeList.selectedObject.forEach(element => {
        if (WorkFlowNodeCodeitems) {
          WorkFlowNodeCodeitems = WorkFlowNodeCodeitems + ',' + element;
        } else {
          WorkFlowNodeCodeitems = element;
        }
      });
    } else {
      WorkFlowNodeCodeitems = '';
    }
    if (this.IsNew) {
    } else {
      this.IsNew = null;
    }
    if (this.IsExtended) {
    } else {
      this.IsExtended = null;
    }

    let CommitionMemberItemsStr;
    if (this.CommitionMemberParams.selectedObject) {
      this.CommitionMemberParams.selectedObject.forEach(element => {
        if (CommitionMemberItemsStr) {
          CommitionMemberItemsStr = CommitionMemberItemsStr + ',' + element;
        } else {
          CommitionMemberItemsStr = element;
        }
      });
    } else {
      CommitionMemberItemsStr = null;
    }

    const ContractorId = this.NgSelectContractorParams.selectedObject;
    this.rprt.ShowContractRequestListReport(
      this.NgSelectRegionParams.selectedObject,
      this.ModuleCode,
      HeaderName,
      VWExeUnitItem,
      this.IsCost,
      this.IsIncome,
      NgSelectModuleItem,
      FromRequestNo,
      ToRequestNo,
      null,
      null,
      this.IsNew,
      this.IsExtended,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.RequestTypesParams.selectedObject,
      RusteeItems,
      SubRusteeItems,
      CostCenterItems,
      SubCostCenter,
      this.SubjectParameter,
      NgSelectContractStatusListItems,
      FinYearItems,
      this.AmountTypeParams.selectedObject,
      this.StartDateParams.selectedObject,
      this.ProvisionTypeParams.selectedObject,
      this.ProvisionCenteralParams.selectedObject,
      this.RequestTypeParams.selectedObject,
      this.CommitionTypeParams.selectedObject,
      this.UnderTakeTypeCheck,
      this.ContractorParams.selectedObject,
      this.NgSelectPersonParams.selectedObject,
      this.CostContractID,
      this.ContractCodeParameter,
      this.HasOpenWF,
      this.HasCloseWF,
      RolesParamsItems,
      this.RefRequestParams.selectedObject,
      null,
      this.NgSelectPersonReqParams.selectedObject,
      this.ReqPayParameter,
      this.NgSelectWinnerParams.selectedObject,
      this.ContractTypeParams.selectedObject,
      this.FromConclusionContractDate,
      this.ToConclusionContractDate,
      this.DealMethodParams.selectedObject,
      WorkFlowNodeCodeitems,
      this.NgRequesterParams.selectedObject,
      this.NgSelectSupplierParams.selectedObject,
      this.rowData,
      this.HaveMutualContract,
      this.MutualContractStatus,
      this.ContractIDParameter,
      this.CostFactorIDParameter,
      this.FromStartContractDate,
      this.ToStartContractDate,
      this.FromEndContractDate,
      this.ToEndContractDate,
      this.UnderTakeTypeValue,
      ContractorId,
      this.FromCommitionDate,
      this.ToCommitionDate,
      this.FromDocumentDeadlineDate,
      this.ToDocumentDeadlineDate,
      CommitionMemberItemsStr,
      this.DealTypeParams.selectedObject
    );
  }

  // BtnShowProductRequest() {
  //   if (this.selectedRow == null) {
  //     this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
  //   } else {
  //     if (this.selectedRow.data.ModuleCode === 2730 ||
  //       this.selectedRow.data.ModuleCode === 2773 ||
  //       !this.selectedRow.data.ModuleCode) {
  //       this.type = 'product-request-page';
  //       this.btnclicked = true;
  //       this.HaveHeader = true;
  //       this.HaveMaxBtn = true;
  //       this.HeightPercentWithMaxBtn = 97;
  //       this.MinHeightPixel = 645;
  //       this.startLeftPosition = 10;
  //       this.startTopPosition = 0;
  //       this.OverPixelWidth = null;
  //       this.paramObj = {
  //         HeaderName: this.ModuleName,
  //         ModuleCode: this.selectedRow.data.ModuleCode ? this.selectedRow.data.ModuleCode : 2730,
  //         selectedRow: this.selectedRow,
  //         CostFactorID: this.selectedRow.data.ProductRequestID,
  //         HaveSave: true,
  //         IsViewable: true,
  //         IsEditable: true,
  //         IsShow: true,
  //         SelectedContractID: this.selectedRow.data.ContractID,
  //         FirstModuleCode: this.ModuleCode,
  //         // tslint:disable-next-line: max-line-length
  //         ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
  //           : (this.ModuleCode === 2824 && this.selectedRow.data.ContractSatusCode === 2) ? 200000 :
  //             (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756) ? 400000 : 500000,
  //       };
  //     }
  //     if (this.selectedRow.data.ModuleCode === 2776) {
  //       this.type = 'product-request-page-without-flow';
  //       this.btnclicked = true;
  //       this.HaveHeader = true;
  //       this.HaveMaxBtn = true;
  //       this.HeightPercentWithMaxBtn = 97;
  //       this.MinHeightPixel = 645;
  //       this.startLeftPosition = 110;
  //       this.startTopPosition = 5;
  //       this.paramObj = {
  //         HeaderName: this.ModuleName,
  //         ModuleCode: this.selectedRow.data.ModuleCode,
  //         selectedRow: this.selectedRow,
  //         CostFactorID: this.selectedRow.data.ProductRequestID,
  //         HaveSave: true,
  //         IsViewable: true,
  //         IsEditable: true,
  //         IsShow: false,
  //         SelectedContractID: this.selectedRow.data.ContractID,
  //         // tslint:disable-next-line: max-line-length
  //         ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
  //           : (this.ModuleCode === 2824 && this.selectedRow.data.ContractSatusCode === 2) ? 200000 :
  //             (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756) ? 400000 : 7,
  //       };
  //     }
  //     if (this.selectedRow.data.ModuleCode === 2739) {
  //       this.type = 'product-request-page-without-flow';
  //       this.btnclicked = true;
  //       this.HaveHeader = true;
  //       this.HaveMaxBtn = true;
  //       this.HeightPercentWithMaxBtn = 97;
  //       this.MinHeightPixel = 645;
  //       this.startLeftPosition = 110;
  //       this.startTopPosition = 5;
  //       this.paramObj = {
  //         HeaderName: this.ModuleName,
  //         ModuleCode: this.selectedRow.data.ModuleCode,
  //         selectedRow: this.selectedRow,
  //         CostFactorID: this.selectedRow.data.ProductRequestID,
  //         HaveSave: true,
  //         IsViewable: true,
  //         IsEditable: true,
  //         IsShow: false,
  //         SelectedContractID: this.selectedRow.data.ContractID,
  //         // tslint:disable-next-line: max-line-length
  //         ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
  //           : (this.ModuleCode === 2824 && this.selectedRow.data.ContractSatusCode === 2) ? 200000 :
  //             (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756) ? 400000 : 7,
  //       };
  //     }
  //   }
  // }

  UploadContractInProjectControl() {
    const selectedRows = this.gridApi.getSelectedRows();
    const IDs = [];
    if (selectedRows && selectedRows.length > 0) {
      selectedRows.forEach(element => {
        if (element && element.ProductRequestID) {
          IDs.push(element.ProductRequestID);
        }
      });
      if (IDs && IDs.length) {
        this.ContractService.UploadInProjectControl(IDs).subscribe(res => {
          this.ShowMessageBoxWithOkBtn('ارسال به سامانه کنترل پروژه با موفقیت انجام شد');
        });
      } else {
        this.ShowMessageBoxWithOkBtn('ارسال با خطا مواجه شد، لطفا با راهبر سیستم تماس بگیرید');
      }
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    }
  }

  Person_FetchMore(event) {
    this.NgSelectPersonParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        true,
        false,
        true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-person-search'
      });
    });
  }

  Person_DoSearch(event) {
    this.NgSelectPersonParams.loading = true;
    this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false,
      true).subscribe(res => {
        this.PersonItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-search'
          });
      });
    this.NgSelectPersonParams.loading = false;
  }

  PersonOpened() {
    this.Actor.GetActorPagingBasedOnRegion(1, 30, '', '', true, false, true).subscribe(res => {
      this.PersonItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-search'
      });
    });
  }

  PersonReq_FetchMore(event) {
    this.NgSelectPersonReqParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        this.TypeContractor,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonReqItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonReqItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }

  Person_Req_DoSearch(event) {
    this.NgSelectPersonReqParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        this.PersonReqItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-Req-search'
          });
      });
    this.NgSelectPersonReqParams.loading = false;
  }

  PersonReqOpened() {
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
      this.PersonReqItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }

  Winner_FetchMore(event) {
    this.NgSelectWinnerParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        this.TypeContractor,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.WinnerItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.WinnerItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-Winner-search'
      });
    });
  }

  Winner_DoSearch(event) {
    this.NgSelectWinnerParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        this.WinnerItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-Winner-search'
          });
      });
    this.NgSelectWinnerParams.loading = false;
  }

  WinnerOpened() {
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
      this.WinnerItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-Winner-search'
      });
    });
  }

  Roles_Open() {
    this.Workflow.GetRolesWithworkFlowCode(this.NgSelectModuleParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe(res => {
      this.RolesItems = res;
    });
  }

  // onDeleteclick() {
  //   // this.ProductRequest.DeleteProductRequestWithFlow(this.selectedRow.data.ProductRequestID, this.ModuleCode).subscribe(res => {
  //   //   this.ShowMessageBoxWithOkBtn('عملیات بصورت موفقیت آمیز انجام شد.');
  //   // },
  //   // err => {
  //   //   this.ShowMessageBoxWithOkBtn('عملیات با شکست مواجه شد.');
  //   // });
  //   this.BtnClickedName = 'BtnDelete';
  //   this.ShowMessageBoxWithYesNoBtn('آیا از حذف درخواست معامله مطمئن هستید؟');

  //  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } else if (this.BtnClickedName === 'BtnClarification' && ActionResult === 'YES') {
      this.UploadContract();
    } else if (this.BtnClickedName === 'FullDelProdReq' && ActionResult === 'YES') {
      const CostFactorID = this.selectedRow.data.ProductRequestID;
      this.FullDeleteProductRequest(CostFactorID, this.ModuleCode);
    } else if (this.BtnClickedName === 'BtnRevoke' && ActionResult === 'YES') {
      const ProductRequestID = this.selectedRow.data.ProductRequestID;
      this.RevokeProductRequest(ProductRequestID);
    } else if (this.BtnClickedName === 'BtnReturnCancel' && ActionResult === 'YES') {
      const ProductRequestID = this.selectedRow.data.ProductRequestID;
      this.ReturnFromCancelProductRequest(ProductRequestID);
    } else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  DoDelete() {
    this.ProductRequest.DeleteProductRequestWithFlow(this.selectedRow.data.ProductRequestID, this.ModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('عملیات بصورت موفقیت آمیز انجام شد.');
    },
      err => {
        this.ShowMessageBoxWithOkBtn('عملیات با شکست مواجه شد.');
      });
  }

  FullDeleteProductRequest(CostFactorID: number, ModuleCode: number) {
    this.ProductRequest.DeleteProductRequestWithFlowAndArchives(CostFactorID, ModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف موفقیت آمیز بود');
    },
      err => {
        this.ShowMessageBoxWithOkBtn('حذف با شکست مواجه شد.');
      });
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverPixelWidth = null;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  // ShowProductRequestForm() {
  //   this.type = 'product-request-page';
  //   this.btnclicked = true;
  //   this.HaveHeader = true;
  //   this.HaveMaxBtn = true;
  //   this.HeightPercentWithMaxBtn = 97;
  //   this.MinHeightPixel = 645;
  //   this.startLeftPosition = 110;
  //   this.startTopPosition = 5;
  //   this.paramObj = {
  //     HeaderName: this.ModuleName,
  //     ModuleCode: this.ModuleCode,
  //     selectedRow: this.selectedRow,
  //     CostFactorID: this.selectedRow.data.ProductRequestID,
  //     HaveSave: false,
  //     IsViewable: true,
  //     IsEditable: false,
  //     SelectedContractID: this.selectedRow.data.ContractID,
  //     ModuleViewTypeCode: 3
  //   };
  // }

  BtnIsOver25() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    } else {
      if (this.selectedRow.data.ContractID) {
        this.ProductRequest.UpdateIsOver25(this.selectedRow.data.ContractID, true, 2793).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('مجوز الحاقیه بیش از حد مجاز تایید شد');
          } else {
            this.ShowMessageBoxWithOkBtn('تایید مجوز الحاقیه بیش از حد مجاز با خطا مواجه شد');
          }
        });
      } else {
        this.ShowMessageBoxWithOkBtn('برای درخواست انتخاب شده قراردادی ایجاد نشده است');
      }
    }
  }

  BtnIsOutsideAmendment() { // RFC 52381
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    } else {
      if (this.selectedRow.data.ContractID) {
        this.ProductRequest.UpdateIsOutsideAmendment(this.selectedRow.data.ContractID, true, 2793).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('مجوز الحاقیه خارج از بازه زمانی قرارداد تایید شد');
          } else {
            this.ShowMessageBoxWithOkBtn('تایید مجوز الحاقیه خارج از بازه زمانی قرارداد با خطا مواجه شد');
          }
        });
      } else {
        this.ShowMessageBoxWithOkBtn('برای درخواست انتخاب شده قراردادی ایجاد نشده است');
      }
    }
  }

  rdoContractorTypeClick(Type) {
    this.TypeContractor = Type;
    if (this.TypeContractor) {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      // this.NgSelectContractorParams.bindLabelProp = 'PersonName';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      //
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      //
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      //
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgRequesterParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgRequesterParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgRequesterParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
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
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectWinnerParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      //
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      //
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectSupplierParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      //
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgRequesterParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgRequesterParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgRequesterParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgRequesterParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
    }
  }

  OpenContractor(event) {
    const ResultList = [];
    //  this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
    // this.NgSelectContractorParams.loading = false;
  }

  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }

  ContractorChanged(event) {
    if (!event) {
      this.NgSelectContractorParams.selectedObject = null;
    } else {
      this.NgSelectContractorParams.selectedObject = event;
    }
  }

  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
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

  OpenRequester(event) {
    const ResultList = [];
    this.Actor.GetAllActorsPaging(1, 30, '', 'IdentityNo', this.TypeContractor, false, false, null).subscribe(res => {
      this.RequesterItems = res.List;
      this.RequesterTotalItemCount = res.TotalItemCount;
      this.RequesterPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }

  doRequesterSearch(event) {
    this.NgRequesterParams.loading = true;
    this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
      , this.TypeContractor, false, false, null).subscribe(res => {
        if (event.term === res.SearchTerm) {
          this.RequesterItems = res.List;
          this.RequesterTotalItemCount = res.TotalItemCount;
          this.RequesterPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgRequesterParams.loading = false;
        }
      });
  }

  RequesterChanged(event) {
    if (!event) {
      this.NgRequesterParams.selectedObject = null;
    } else {
      this.NgRequesterParams.selectedObject = event;
    }
  }

  FetchMoreRequester(event) {
    const ResultList = [];
    this.NgRequesterParams.loading = true;
    this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
      , this.TypeContractor, false, false, null).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.RequesterItems = ResultList;
        this.NgRequesterParams.loading = false;
      }
      );
  }

  OpenSupplier(event) {
    const ResultList = [];
    //  this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
      this.SupplierItems = res.List;
      this.SupplierTotalItemCount = res.TotalItemCount;
      this.SupplierPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }

  doSupplierSearch(event) {
    this.NgSelectSupplierParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        this.SupplierItems = res.List;
        this.SupplierTotalItemCount = res.TotalItemCount;
        this.SupplierPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectSupplierParams.loading = false;
      });
  }

  SupplierChanged(event) {
    if (!event) {
      this.NgSelectSupplierParams.selectedObject = null;
    } else {
      this.NgSelectSupplierParams.selectedObject = event;
    }
  }

  FetchMoreSupplier(event) {
    const ResultList = [];
    this.NgSelectSupplierParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.SupplierItems = ResultList;
        this.NgSelectSupplierParams.loading = false;
      }
      );
  }

  UploadInRecentAllClarification(event) {
    let FromAuditDate = null;
    let ToAuditDate = null;
    if (event && event.FromDate) {
      FromAuditDate = event.FromDate;
    }
    if (event && event.ToDate) {
      ToAuditDate = event.ToDate;
    }
    this.ContractService.UploadInRecentAllClarification(this.NgSelectRegionParams.selectedObject,
      this.ModuleCode,
      FromAuditDate,
      ToAuditDate).subscribe(res => {
        if (res === '') {
          this.ShowMessageBoxWithOkBtn('ارسال به سامانه شفاف برای این واحد اجرایی با موفقیت انجام شد.');
        } else {
          this.StartLeft = 106;
          this.ShowMessageBoxWithOkBtn(res);
          this.alertMessageParams.IsMultiLine = true;
        }
      });
  }

  BtnShowHasContract() {
    this.type = 'app-product-request-related-items';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 70;
    this.MinHeightPixel = 400;
    this.startLeftPosition = 200;
    this.startTopPosition = 80;
    this.OverPixelWidth = 950;

    this.paramObj = {
      ModuleCode: this.ModuleCode,
      ModuleViewTypeCode: 3,
      LetterNo: this.selectedRow.data.LetterNo,
      FinYearCode: this.selectedRow.data.FinYearCode,
      ContractID: this.selectedRow.data.ContractID
    };
  }

  ContractTypeParamsOpened() {
    this.ContractService.GetContractTypeListByIsCost(this.IsCost).subscribe(res => {
      this.ContractTypeItems = res;
    });
  }

  getAmount(Amount) {
    this.ReqPayParameter = Amount;
  }

  HaveMutualContractRedioClick(HaveMutualContract) {
    this.HaveMutualContract = HaveMutualContract;
    if (!HaveMutualContract) {
      this.MutualContractStatus = null;
      this.ContractParams.selectedObject = null;
      this.IsHaveMutualContract = true;
    } else {
      this.IsHaveMutualContract = false;
    }
  }

  MakeMCSRadioTypes(): void {
    this.MCSRadioTypes = [];
    this.MCSRadioTypes.push(new RadioBoxModel('منعقد شده', 1, false, 'rdomcs1_uwlpr'));
    this.MCSRadioTypes.push(new RadioBoxModel('در دست انعقاد', 2, false, 'rdomcs2_uwlpr'));
    this.MCSRadioTypes.push(new RadioBoxModel('درخواست فرجه تا انعقاد', 3, false, 'rdomcs3_uwlpr'));
  }

  MakeMCRadioTypes(): void {
    this.McRadioTypes = [];
    this.McRadioTypes.push(new RadioBoxModel('دارد', true, false, 'rdoMc1_uwlpr'));
    this.McRadioTypes.push(new RadioBoxModel('ندارد', false, false, 'rdoMc2_uwlpr'));
  }

  GetRadioBoxSelectedItem(event) {
    this.MutualContractStatus = event;
  }

  doContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.ContractParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'LetterNo';
    }
    this.ContractParams.loading = true;
    this.ContractService.GetRelatedContractpagingForExtended(event.PageNumber, 30, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject, this.IsCost ? this.IsCost : false,
      false, null).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractItems = res.List;
          this.ContractTotalItemCount = res.TotalItemCount;
          this.ContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.ContractParams.loading = false;
        }
      });
  }

  FetchMoreContract(event) {
    this.ContractParams.loading = true;
    const ResultList = [];
    this.ContractService.GetRelatedContractpagingForExtended(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.NgSelectRegionParams.selectedObject, this.IsCost ? this.IsCost : false, false, null).subscribe((res: any) => {
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

  onContractViewClick() {
    if (this.ContractParams.selectedObject) {
      this.type = 'contract-page';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.HaveMaxBtn = true;
      this.MinHeightPixel = 650;
      this.startLeftPosition = 100;
      this.startTopPosition = 10;
      this.paramObj = {
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
  OnCallContractStatmentService() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    } else {
      if (this.selectedRow.data.ContractID) {
        this.ContractService.CallContractStatementService(this.selectedRow.data.ContractID).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('ارسال به سامانه صورت وضعیت با موفقیت انجام شد');
          }
        });
      } else {
        this.ShowMessageBoxWithOkBtn('برای درخواست انتخاب شده قراردادی ایجاد نشده است');
      }
    }
  }
  OnEditeClick() {
    this.type = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.OverPixelWidth = null;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.btnclicked = true;
    this.paramObj = {
      HeaderName: 'اصلاح اطلاعات',
      RadioItems: [
        {
          title: ' تایید مجوز اصلاحیه',
          type: 9
        },
        {
          title: 'تغییر وضعیت قرارداد',
          type: 10
        },
        {
          title: 'بازگشت از ابطال درخواست',
          type: 11
        },
        {
          title: 'اجرای مکانیزه تشریفات',
          type: 12
        }
      ]
    };
  }

  OnCallExternal() { // RFC 52381
    this.type = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.OverPixelWidth = null;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.btnclicked = true;
    this.paramObj = {
      HeaderName: 'تایید مجوز الحاقیه',
      RadioItems: [
        {
          title: 'مجوز درج الحاقیه بیش از 25 درصد',
          type: 5
        },
        {
          title: 'مجوز درج الحاقیه خارج از بازه زمانی قرارداد',
          type: 6
        },
        {
          title: 'مجوز درج ردیف ستاره دار بیش از 30 درصد',
          type: 7
        }
      ]
    };
  }
  OnCallExternalServiceClick() {
    this.type = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.OverPixelWidth = null;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.btnclicked = true;
    if (this.ModuleCode === 3033) {
      this.paramObj = {
        HeaderName: 'انتخاب سامانه',
        RadioItems: [

          {
            title: 'ارسال به کنترل پروژه',
            type: 3,
            ShowDate: false,
          },

        ]
      };
    } else {
      this.paramObj = {
        HeaderName: 'انتخاب سامانه',
        RadioItems: [
          {
            title: 'ارسال به سامانه شفاف',
            type: 1,
            ShowDate: false
          },
          {
            title: 'ارسال تمامی درخواست ها به شفاف برای واحد اجرایی انتخابی', // RFC 61284
            type: 2,
            ShowDate: true
          },
          {
            title: 'ارسال به کنترل پروژه',
            type: 3,
            ShowDate: false
          },
          {
            title: 'ارسال به سامانه صورت وضعیت',
            type: 4,
            ShowDate: false
          },
          {
            title: 'ارسال به کارتابل بودجه مالی',
            type: 8,
            ShowDate: false
          }
        ]
      };
    }
  }
  OnFromStartContractDateChange(ADate) {
    this.FromStartContractDate = ADate.MDate;
  }
  OnToStartContractDateChange(ADate) {
    this.ToStartContractDate = ADate.MDate;
  }
  OnFromEndContractDateChange(ADate) {
    this.FromEndContractDate = ADate.MDate;
  }
  OnToEndContractDateChange(ADate) {
    this.ToEndContractDate = ADate.MDate;
  }
  OnFromCommitionDateChange(Date) {
    this.FromCommitionDate = Date.MDate;
  }
  OnToCommitionDateChange(Date) {
    this.ToCommitionDate = Date.MDate;
  }
  OnFromDocumentDeadlineDateChange(Date) {
    this.FromDocumentDeadlineDate = Date.MDate;
  }
  OnToDocumentDeadlineDateChange(Date) {
    this.ToDocumentDeadlineDate = Date.MDate;
  }
  ProductRequestColumnBtn(row) {
    if (row == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    } else {
      if (row.RequestObjectTypeCode === 1 || !row.RequestObjectTypeCode) {
        this.type = 'product-request-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.OverPixelWidth = null;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: this.ModuleCode === 2996 ? 2996 : 2730,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: row.ContractID,
          FirstModuleCode: this.ModuleCode,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: ((this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2996) ? 88888 : 500000),
        };
      }
      if (row.RequestObjectTypeCode === 3 || row.RequestObjectTypeCode === 8) {
        var currentModuleCode = 2773;

        if (row.RequestObjectTypeCode === 3) {
          currentModuleCode = 2773;
        }

        if (row.RequestObjectTypeCode === 8) {
          currentModuleCode = 2895;
        }

        this.type = 'product-request-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.OverPixelWidth = null;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: currentModuleCode,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: row.ContractID,
          FirstModuleCode: this.ModuleCode,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: ((this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              (this.ModuleCode === 2824) ? 300000 : 500000),
        };
      }
      if (row.RequestObjectTypeCode === 7) {
        this.type = 'product-request-page-without-flow';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: 2776,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: row.ContractID,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              // tslint:disable-next-line: max-line-length
              (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756 || this.ModuleCode === 2838 || this.ModuleCode === 2980) ? 500000 : 7,
        };
      }
      if (row.RequestObjectTypeCode === 2 || row.RequestObjectTypeCode === 5 || row.RequestObjectTypeCode === 12) {
        this.type = 'product-request-page-without-flow';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: row.RequestObjectTypeCode === 2 ? 2739 : row.RequestObjectTypeCode === 12 ? 3037 : 2840,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: row.ContractID,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756 || this.ModuleCode === 2838) ? 500000 : 7,
        };
      }
    }
  }
  RedioClick(IsCost) {
    this.IsCost = IsCost;
  }
  BtnShowLetters() { // RFC 53579
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('لطفا یک ردیف را انتخاب نمایید');
    } else {
      this.Automation.GetCostFactorLetterByCostFacorID(this.selectedRow.data.ProductRequestID).subscribe(res => {
        this.LetterTypeCodeList = res;
        this.LetterTypeCodeList.push(7); // RFC 57522
        this.LetterTypeCodeList.push(3); // RFC 57827
        if (this.ModuleCode === 2756 || this.ModuleCode === 2838) { // RFC 63151
          this.LetterTypeCodeList.push(20);
          this.LetterTypeCodeList.push(34);
        }
        this.btnclicked = true;
        this.type = 'app-automation';
        this.HaveHeader = true;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.MinHeightPixel = 300;
        this.paramObj = {
          CostFactorID: this.selectedRow.data.ProductRequestID,
          LetterTypeCodeList: this.LetterTypeCodeList,
          AutoClose: true,
          SaveMode: true, // RFC 55678
          RegionCode: this.NgSelectRegionParams.selectedObject
        };
      });
    }
  }
  BtnIsStarOver30() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا درخواست مورد نظر را انتخاب نمایید');
    } else {
      this.ProductRequest.UpdateIsStarOver30(this.selectedRow.data.ProductRequestID, true, 2793).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('مجوز درج ردیف ستاره دار بیش از 30 درصد تایید شد');
        } else {
          this.ShowMessageBoxWithOkBtn('تایید مجوز درج ردیف ستاره دار بیش از 30 درصد با خطا مواجه شد');
        }
      });
    }
  }
  onClickRevoke(row) {
    if (row == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انتخاب نمایید');
    } else {
      this.BtnClickedName = 'BtnRevoke';
      this.ShowMessageBoxWithYesNoBtn('آیا مایل به ابطال درخواست انتخاب شده می باشید؟');
    }
  }

  RevokeProductRequest(ProductRequestID) {
    this.ProductRequest.RevokeProductRequest(ProductRequestID,
      this.ModuleCode,
      this.selectedRow.data.ContractID,
      this.selectedRow.data.ContractSatusCode,
      this.selectedRow.data.WorkFlowInstanceId).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('درخواست با موفقیت ابطال شد');
      });
  }

  FetchMoreFromContract(event) {
    this.NgSelectContractParamsFrom.loading = true;
    const ResultList = [];
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      null, this.NgSelectRegionParams.selectedObject, this.IsCost, null).subscribe((res: any) => {
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
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, null, this.NgSelectRegionParams.selectedObject,
      this.IsCost, null).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetFrom = res.List;
          this.FromContractTotalItemCount = res.TotalItemCount;
          this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsFrom.loading = false;
        }
      });
  }
  FromContractChanged(event) {
    this.CostContractID = event;
  }
  FromContractOpened() {
    this.NgSelectContractParamsFrom.loading = true;
    this.ContractService.GetContractPaging(1, 30, '', '',
      null, this.NgSelectRegionParams.selectedObject, this.IsCost, null).subscribe((res: any) => {
        this.ContractListSetFrom = res.List;
        this.FromContractTotalItemCount = res.TotalItemCount;
        this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsFrom.loading = false;
  }
  CommitionMemberSearch(event) {
    this.ProductRequest.GetCommitionMemberListByRegionCode(
      event.term,
      event.SearchOption,
      this.NgSelectRegionParams.selectedObject
    ).subscribe(res => {
      if (res) {
        this.CommitionMemberItems = res;
      }
    });
  }

  getOutPutParam(param) {
    if (this.type === 'global-choose-page') {
      this.UploadInRecentAllClarification(param);
    }
  }
  ResearcherDisconnect() {
    if (this.selectedRow.data && this.selectedRow.data.ProductRequestID && this.selectedRow.data.ResearcherID) {
      this.ProductRequest.ResearcherDisconnect(this.selectedRow.data.ProductRequestID,
        this.selectedRow.data.ResearcherID,
        this.ModuleCode).subscribe(res => {
          this.ShowMessageBoxWithOkBtn('قطع ارتباط درخواست پژوهشی موفقیت آمیز بود');
        },
          err => {
            this.ShowMessageBoxWithOkBtn('قطع ارتباط درخواست پژوهشی با شکست مواجه شد.');
          });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا یک ردیف را برای قطع ارتباط درخواست پژوهشی انتخاب نمایید.');
    }
  }
  onReturnCancel() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انتخاب نمایید');
    } else {
      if (this.selectedRow.data.ProductRequestStatusCode == 3) {
        this.BtnClickedName = 'BtnReturnCancel';
        this.ShowMessageBoxWithYesNoBtn('آیا مایل به بازگشت از ابطال درخواست انتخاب شده می باشید؟');
      } else {
        this.ShowMessageBoxWithOkBtn('درخواست انتخاب شده از نوع باطل شده نمی باشد');
        return;
      }
    }
  }
  ReturnFromCancelProductRequest(ProductRequestID) {
    this.ProductRequest.ReturnFromCancelProductRequest(ProductRequestID,
      this.ModuleCode,
      this.selectedRow.data.ContractID,
      this.selectedRow.data.ContractSatusCode,
      this.selectedRow.data.WorkFlowInstanceId).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('بازگشت از ابطال درخواست با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('بازگشت از ابطال درخواست با خطا مواجه شد');
        }
      });
  } // 63531
  onChangeContract() {
    this.IsAdmin = true;
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انتخاب نمایید');
    }
    this.btnclicked = true;
    if (this.selectedRow.data.ContractID == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'برای این درخواست قراردادی ثبت نشده است';
      this.startLeftPosition = 175;
      this.startTopPosition = 250;
    } else {
      this.type = 'change-contract-status';
      this.HaveHeader = true;
      this.HaveMaxBtn = false;
      this.OverPixelWidth = 400;
      this.startLeftPosition = 520;
      this.startTopPosition = 220;
      this.HeightPercentWithMaxBtn = 27;
      this.PercentWidth = 90;
      this.MinHeightPixel = null;
      this.btnclicked = true;
      this.PixelHeight = 160;

      this.paramObj = {
        ContractId: this.selectedRow.data.ContractID,
        ContractStatusName: this.selectedRow.data.ContractStatusName,
        ParentModuleCode: this.ModuleCode,
        ContractStatusCode: this.selectedRow.data.ContractStatusCode
      };
    }
  }
  SendToBgt() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا درخواست مورد نظر را انتخاب نمایید');
    } else {
      this.ProductRequest.UpdateBgtRequest(this.selectedRow.data.ProductRequestID, true, 2793).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('ارسال به کارتابل بودجه مالی با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('ارسال به کارتابل بودجه مالی با خطا مواجه شد');
        }
      });
    }
  }
  Mechanized() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا درخواست مورد نظر را انتخاب نمایید');
    } else {
      this.ProductRequest.CallAllMethod(
        this.selectedRow.data.ProductRequestID,
        true,
        true,
        null,
        false,
        true,
        null).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('با موفقیت انجام شد');
          } else {
            this.ShowMessageBoxWithOkBtn('با خطا مواجه شد');
          }
        });
    }

  }

}
