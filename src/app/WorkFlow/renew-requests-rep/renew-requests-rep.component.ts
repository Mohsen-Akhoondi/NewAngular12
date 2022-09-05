import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-renew-requests-rep',
  templateUrl: './renew-requests-rep.component.html',
  styleUrls: ['./renew-requests-rep.component.css']
})
export class RenewRequestsRepComponent implements OnInit {
  @Input() PopupParam;
  @Input() ModuleName;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  McRadioTypes: Array<RadioBoxModel> = [];
  MCSRadioTypes: Array<RadioBoxModel> = [];
  private gridApi;
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
  PersonItems: any;
  PersonReqItems: any;
  ContractorType = true;
  TypeContractor = true;
  currentContractSearchTerm;
  ContractItems;
  ContractTotalItemCount;
  ContractPageCount;
  IsShowMultipeRegion = false;
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
  IsDisableShowProductRequest = false;
  IsAdmin = false;
  ShowIsOver15 = false;
  ContractorId = null;
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
  ExternalServiceRole1253 = false;
  LetterTypeCodeList;
  IsCollective = false;
  StartLeft = 524;
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
  IsEditable = true;
  DisableRConnection = false;

  constructor(private router: Router,
    private Workflow: WorkflowService,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private route: ActivatedRoute,
    private RefreshPersonItems: RefreshServices,
    private ContractService: ContractListService,
    private User: UserSettingsService,
    private Actor: ActorService) {
    this.SubjectParameter = '';
    this.ReqPayParameter = '';
    this.LetterParameter = '';
    this.CostContractID = 0;
    this.ContractCodeParameter = null;
    this.ContractIDParameter = '';
    this.CostFactorIDParameter = '';
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

    this.IsCollective = this.ModuleCode === 2896 ? true : false;
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
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'منطقه',
        field: 'RegionCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'موضوع مناقصه',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'کد سامانه جامع معاملات',
        field: 'ProductRequestCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت مناقصه (برنده/تجدید)',
        field: 'Status',
        width: 180,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'علت تجدید',
        field: 'Commition',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ProductRequestNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تارخ درخواست مجوز(کفایت)',
        field: 'PersianLetterSequenceDate',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ صدور مجوز(کفایت)',
        field: 'LetterSequenceDate',
        width: 180,
        resizable: true
      },
      {
        headerName: 'تاریخ برگزاری مناقصه',
        field: 'PersianInquiryDate',
        width: 180,
        resizable: true
      },
      {
        headerName: 'شماره ابلاغ ماده 18',
        field: 'LetterSequenceNo18',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ ابلاغ ماده 18',
        field: 'PersianLetterSequenceDate18',
        width: 180,
        resizable: true
      },
      {
        headerName: 'َتاریخ ابلاغ قرارداد',
        field: 'LetterDatePersian',
        width: 180,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
      },
    ];
  }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetRegionList(this.ModuleCode, false),
      this.ContractService.GetContractStatusList()
    ]).subscribe(res => {
      this.ReigonListSet = res[1];
      this.NgSelectRegionParams.selectedObject = res[1][0].RegionCode;
      this.ContractStatusList = res[2];
    });
  }
  onChangeReigonObj(newObj) {
    this.NgSelectModuleParams.selectedObject = null;
    this.VWExeUnitParams.selectedObject = null;
    this.DealMethodParams.selectedObject = null;
    this.ModuleNameListSet = [];
    this.rowData = [];
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
    this.StartLeft = 545;
    if (this.type === 'global-choose-page') {
      switch (param) {
        default:
          break;
      }
    }
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
    this.ClearedToViewFlow = (this.selectedRow && this.selectedRow.data && this.selectedRow.data.WorkFlowInstanceId);
    this.IsDisableClarification = !(this.selectedRow && this.selectedRow.data && this.selectedRow.data.ContractID);
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
        width: 60,
        resizable: true
      },
      {
        headerName: 'منطقه',
        field: 'RegionCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد سامانه جامع معاملات',
        field: 'ProductRequestCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تعداد تکرار تجدید تا برنده شدن',
        field: 'Count',
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ProductRequestNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تارخ درخواست مجوز(کفایت)',
        field: 'PersianLetterSequenceDate',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ صدور مجوز(کفایت)',
        field: 'LetterSequenceDate',
        width: 200,
        resizable: true
      },
      {
        headerName: 'َتاریخ ابلاغ قرارداد',
        field: 'LetterDatePersian',
        width: 180,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
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
    this.ContractService.RenewRequestSearch(
      this.NgSelectRegionParams.selectedObject,
      this.VWExeUnitParams.selectedObject,
      this.IsCost,
      this.IsIncome,
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
      this.RequestTypeParams.selectedObject,
      this.ContractorParams.selectedObject,
      this.NgSelectPersonParams.selectedObject,
      this.CostContractID,
      this.ContractCodeParameter,
      this.RefRequestParams.selectedObject,
      this.NgSelectPersonReqParams.selectedObject,
      this.ReqPayParameter ? this.ReqPayParameter.replace(/,/g, '') : this.ReqPayParameter,
      this.ContractTypeParams.selectedObject,
      this.FromConclusionContractDate,
      this.ToConclusionContractDate,
      this.DealMethodParams.selectedObject,
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
    ).subscribe(res => {
      console.log('res2', res);
      this.rowData = res;
    });
  }

  partialSearch() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'منطقه',
        field: 'RegionCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'موضوع مناقصه',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'کد سامانه جامع معاملات',
        field: 'ProductRequestCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت مناقصه (برنده/تجدید)',
        field: 'Status',
        width: 180,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'علت تجدید',
        field: 'Commition',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ProductRequestNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تارخ درخواست مجوز(کفایت)',
        field: 'PersianLetterSequenceDate',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ صدور مجوز(کفایت)',
        field: 'LetterSequenceDate',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تاریخ برگزاری مناقصه',
        field: 'PersianInquiryDate',
        width: 180,
        resizable: true
      },
      {
        headerName: 'شماره ابلاغ ماده 18',
        field: 'LetterSequenceNo18',
        width: 180,
        resizable: true
      },
      {
        headerName: 'تاریخ ابلاغ ماده 18',
        field: 'PersianLetterSequenceDate18',
        width: 180,
        resizable: true
      },
      {
        headerName: 'َتاریخ ابلاغ قرارداد',
        field: 'LetterDatePersian',
        width: 180,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
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
    this.ContractService.PartialRenewRequestSearch(
      this.NgSelectRegionParams.selectedObject,
      this.VWExeUnitParams.selectedObject,
      this.IsCost,
      this.IsIncome,
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
      this.RequestTypeParams.selectedObject,
      this.ContractorParams.selectedObject,
      this.NgSelectPersonParams.selectedObject,
      this.CostContractID,
      this.ContractCodeParameter,
      this.RefRequestParams.selectedObject,
      this.NgSelectPersonReqParams.selectedObject,
      this.ReqPayParameter ? this.ReqPayParameter.replace(/,/g, '') : this.ReqPayParameter,
      this.ContractTypeParams.selectedObject,
      this.FromConclusionContractDate,
      this.ToConclusionContractDate,
      this.DealMethodParams.selectedObject,
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
    ).subscribe(res => {
      console.log('res', res);
      this.rowData = res;
    });
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

  MessageBoxAction(ActionResult) {
    this.Closed.emit(true);
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
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
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
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

  getAmount(Amount) {
    this.ReqPayParameter = Amount;
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

  RedioClick(IsCost) {
    this.IsCost = IsCost;
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

  getOutPutParam(param) {
  }
  ContractTypeParamsOpened() {
    this.ContractService.GetContractTypeListByIsCost(this.IsCost).subscribe(res => {
      this.ContractTypeItems = res;
    });
  }
}

