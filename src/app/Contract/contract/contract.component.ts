import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { isUndefined } from 'util';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ShowMapField') ShowMapField: TemplateRef<any>;
  @Input() PopupMaximized;
  @Input() InputParam;
  Required: true;
  StartType = 1;
  ContractorWidth = 76;
  IsEditable = true;
  Contractsubject;
  IsRequire = false;
  LetterDate;
  PRIsTaxValue = true;
  CheckValidate = false;
  ArchiveParam;
  WorkStartDate;
  WarrantyDate;
  IsTaxValue = true;
  ContractObject: any;
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
  ContractStatusItems;
  ContractStatusParams = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
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
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ModuleCode;
  StartDate;
  EndDate;
  IsDown = false;
  IsCost = true;
  CustomerOrderItems;
  ContractTotalItemCount;
  ContractPageCount;
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
  isClicked: boolean;
  PopUpType: string;
  AmountType = true;
  HaveHeader;
  HaveMaxBtn;
  columnDef;
  ContractCode: any;
  HeightPercentWithMaxBtn = 95;
  gridApi: any;
  rowsData: any = [];
  IsInitS: boolean;
  IsInitE: boolean;
  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false, IsMultiLine: false };
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
  ProductRequestCode;
  ProductRequestNo;
  ActLocationItems;
  startLeftPosition;
  startTopPosition;
  ContractAmount;
  contractRelList = [];
  ArchiveBtnText = 'مستندات';
  NgSelectContractorParams = {
    bindLabelProp: 'ActorIdentityName', // RFC 51984
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
  NgSelectSecondObserverParams = {
    bindLabelProp: 'ActorIdentityName', // RFC 51984
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
    type: 'product-request-actor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  NgSelectActorParams = {
    bindLabelProp: 'ActorIdentityName', // RFC 51984
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
    type: 'product-request-actor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  RelFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false,
    type: 'rel-fin-year',
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
  CostFactorID = -1;
  ContractReceiveFactorID = -1;
  ProductRequestObject;
  IsDisable = true;
  SumFinalAmount = 0;
  SumFinalAmountStr = '0';
  PercentWidth = null;
  MainMaxwidthPixel = null;
  MinHeightPixel = null;
  IsInit: boolean;
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
  PersianProductRequestDate;
  ContractListSetFrom;
  ProdcutTypeCode: any;
  btnRevocationName;
  MainMinwidthPixel: number;
  RelatedProductRequestObject;
  RelatedProductRequestID: any;
  IsContractSelect: boolean;
  IsInsert = false;
  tabpanelDiv = 85;
  ContractorItems;
  ActorItems;
  SecondObserverItems;
  ContractorTotalItemCount;
  ActorTotalItemCount;
  SecondObserverTotalItemCount;
  ContractorPageCount;
  ActorPageCount;
  SecondObserverPageCount;
  TechCoef;
  HasAssetEstaeBtn = false;
  HasPrintBtn = true;
  ISProvisionRemain: any;
  IsFinalConfirm = false;
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

  selectedrow: any;
  VirtualGroupModuleTypeName = '';
  VirtualModuleTypeCode: number;
  UserRegionCode;
  SumAmountCOEFStr = '0';
  SumAmountCOEFPactStr = '0';
  ResearcherID;
  Show = true;
  ContractorType = true;
  HasAsset = false;
  ShowFinalControlBtn = false; // RFC 57024
  IsRelated = false;
  HaveAlertToFinance = false;
  ShowInvest = false;
  DocTypeMadatory;
  ContractRelationList;
  DurationDay: any;
  DurationMonth: any;
  DurationYear: any;
  ProdReqRelApi: any;
  contractRelColDef: any;
  LetterNo: any;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  RequiredComponents = [this.RegionParams, this.FinYearParams, this.NgSelectContractorParams];
  ContractId = -1;
  paramObj;
  ArchiveEnabled = false;
  constructor(
    private FinYear: FinYearService,
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



  }
  ngAfterViewInit(): void {
    this.contractRelColDef = [
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
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ContractRelationTypeName) {
            params.data.ContractRelationTypeCode = params.newValue.ContractRelationTypeCode;
            params.data.ContractRelationTypeName = params.newValue.ContractRelationTypeName;
            return true;
          } else {
            params.data.ContractRelationTypeCode = null;
            params.data.ContractRelationTypeName = '';
            return false;
          }
        },
        //editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        editable: false ,
        width: 150,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.RelFinYearParams,
          Items: []
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
        //editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        editable: false ,
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
        //editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        editable: false ,
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
        //editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        editable: false ,
        width: 300,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 6;

    if (this.InputParam.Mode === 'EditMode') {
      if (!this.ModuleCode || this.ModuleCode == null || this.ModuleCode == undefined) {
        this.ModuleCode = this.InputParam.ModuleCode;
      }
      this.ArchiveEnabled = true;
      this.CostFactorID = this.InputParam.CostFactorID;
      this.ContractReceiveFactorID = this.InputParam.ContractReceiveFactorID;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.CartableUserID = this.InputParam.CartableUserID;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.ReadyToConfirm = this.InputParam.ReadyToConfirm;
      this.WorkflowObjectCode = this.InputParam.WorkflowObjectCode;
      this.ContractId = this.InputParam.ContractID ? this.InputParam.ContractID : this.InputParam.ObjectID;
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

    forkJoin([
      this.FinYear.GetFinYearList(),
      this.ContractList.GetContractStatusList(),
      this.ProductRequest.GetSubCostCenterPerson(),

    ]).subscribe(res => {
      this.FinYearItems = res[0];
      this.ContractStatusItems = res[1];
      this.CurrentUserSubCostCenter = res[2];

      if (this.ContractId != null && this.ContractId != -1) {
        this.contractpaydetail.GetContractDetails(this.ContractId).subscribe
          (res => {
            this.ContractObject = res;
            if (this.ContractObject) {
              //this.VWExeUnitParams.selectedObject = this.InputParam.UnitPatternID;
              this.ContractCode = this.ContractObject.ContractCode;
              this.RegionParams.selectedObject = this.ContractObject.RegionCode;
              this.FinYearParams.selectedObject = this.ContractObject.FinYearCode;
              this.StartDate = this.ContractObject.FromContractDateString;
              this.EndDate = this.ContractObject.ToContractDateString;
              this.ContractAmount = this.ContractObject.ContractAmount;
              this.ContractStatusParams.selectedObject = this.ContractObject.ContractSatusCode;
              this.StartType = this.ContractObject.StartTypeCode;
              this.AmountType = this.ContractObject.IsFindCost
              this.IsTaxValue = this.ContractObject.IsTaxValue;
              this.WorkStartDate = this.ContractObject.ActualStartDateString;
              this.WarrantyDate = this.ContractObject.WarrantyDate;
              this.NgSelectContractorParams.selectedObject = this.ContractObject.ContractorId;
              this.NgSelectActorParams.selectedObject = this.ContractObject.ActorID;
              this.NgSelectSecondObserverParams.selectedObject = this.ContractObject.SecondObserverID;
              this.Contractsubject = this.ContractObject.Subject;
              this.LetterNo = this.ContractObject.LetterNo;
              this.LetterDate = this.ContractObject.LetterDateString;
              this.Actor.GetActorPaging(1, 30, '', 'IdentityNo', this.ContractorType, false, false, this.ContractObject.ContractorId).subscribe(ress => {
                this.ContractorItems = ress.List;
                this.ContractorTotalItemCount = ress.TotalItemCount;
                this.ContractorPageCount = Math.ceil(ress.TotalItemCount / 30);
              });
              this.OpenActor(this.ContractObject.ActorID);
              this.OpenSecondObserver(this.ContractObject.SecondObserverID)
              this.ProductRequest.GetVWExeUnitByRegion(this.ContractObject.RegionCode).subscribe(res => {
                this.VWExeUnitItems = res;
              });
              this.SetStartedWFInfo(true);
              this.ContractList.GetPRRelation(this.ContractObject.ContractId).subscribe(res => {
                this.contractRelList = res;
              });
            }
          });
      }    
      this.OnOpenNgSelect('Region');   
    });
  }

  OnOpenNgSelect(type, IsFill = true, FillResolve = null) {
    switch (type) {
      case 'Region':
        this.RegionList.GetRegionList(this.ModuleCode, !this.CheckRegionWritable).subscribe(res => {
          this.RegionItems = res;
          if (IsFill && (this.InputParam.Mode === "InsertMode")) {
            this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
            this.OnOpenNgSelect('VWExeUnit');
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
      default:
        break;
    }
  }

  onChangeRegion(RegionCode) {
    this.OnOpenNgSelect('VWExeUnit');
  }

  popupclosed(event) {
    this.isClicked = false;
    this.HaveMaxBtn = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.MainMinwidthPixel = null;
    if (this.ContractCode && this.PopUpType == 'archive-details') {
      this.ArchiveEnabled = true;
    }

  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
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

  onSave() {
    this.CheckValidate = true;
    let ValidateForm = true;
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
      ValidateForm = ValidateForm && this.Contractsubject && this.StartDate && this.EndDate && this.ContractAmount
      if (ValidateForm) {
        const ContractObj = {
          ContractId: this.ContractObject ? this.ContractObject.ContractId : -1,
          CostFactorId: -1,
          RegionCode: this.RegionParams.selectedObject,
          FinYearCode: this.FinYearParams.selectedObject ? this.FinYearParams.selectedObject : -1,
          FromContractDate: this.StartDate,
          ToContractDate: this.EndDate,
          ContractTypeCode: 20,
          ContractAmount: this.ContractAmount,
          ContractSatusCode: 1,
          ContractorType: this.ContractorType,
          ContractorId: this.NgSelectContractorParams.selectedObject,
          ActorID: this.NgSelectActorParams.selectedObject,
          SecondObserverID: this.NgSelectSecondObserverParams.selectedObject,
          Subject: this.Contractsubject,
          LetterNo: this.LetterNo,
          LetterDate: this.LetterDate,
          ProductRequestID: this.InputParam.ProductRequestID,
          ReceiveFactorID: this.ContractReceiveFactorID,
        };

        const ProductReqObj = {
          RegionCode: this.RegionParams.selectedObject,
          UnitPatternID: this.VWExeUnitParams.selectedObject ? this.VWExeUnitParams.selectedObject : this.VWExeUnitItems[0].UnitPatternID,
          ContractStackHolderID: this.CurrentUserSubCostCenter.SubCostCenterID,
          SubCostCenterID: this.CurrentUserSubCostCenter.SubCostCenterID,
          ActorID: this.CurrentUserSubCostCenter.ActorID,
          IsCost: 0,
          Subject: this.Contractsubject,
          ProductRequestStatusCode: 1,
          HasLicence: 0,
          IsWeb: 1,
          IsConfirm: 0,
          InvVoucherGroupCode: 1,
          IsBalancing: 0,
          RequestObjectTypeCode: 13
        };

        this.ProdReqRelApi.stopEditing();
        this.ProductRequest.SaveIncomeContract(ProductReqObj, ContractObj, this.ModuleCode).subscribe(
          (res: any) => {
            this.ContractCode = res.ContractCode;
            this.ContractObject = res;
            this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
          }
        );
      }
      else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });
  }

  Close() {
    this.Closed.emit(true);
  }

  MessageBoxAction(event) {

  }

  getOutPutParam(event) {

  }

  rdoAmountClick(Type) {
    this.AmountType = Type;

  }

  OnStartDateChange(ADate) {
    this.StartDate = ADate.MDate;
    if (!(this.IsInitS && this.ContractObject) && this.StartDate && this.EndDate) {
      this.ProductRequest.GetContractLength(this.StartDate, this.EndDate).subscribe(res => {
        this.DurationDay = res.Day;
        this.DurationMonth = res.Month;
        this.DurationYear = res.Year;
      });
    }
    this.IsInitS = false;

  }

  OnEndDateChange(ADate) {
    this.EndDate = ADate.MDate;
    if (!(this.IsInitE && this.ContractObject) && this.StartDate && this.EndDate) {
      this.ProductRequest.GetContractLength(this.StartDate, this.EndDate).subscribe(res => {
        this.DurationDay = res.Day;
        this.DurationMonth = res.Month;
        this.DurationYear = res.Year;
      });
    }
    this.IsInitE = false;
  }

  rdoStartTypeClick(Type) {
    this.StartType = Type;
  }

  OnWorkStartDateChange(ADate) {
    this.WorkStartDate = ADate.MDate;

  }

  OnWarrantyDateChange(ADate) {
    this.WarrantyDate = ADate.MDate;

  }

  OnChTaxvalueChange(event) {
    this.IsTaxValue = event;

  }

  OnChPRTaxvalueChange(event) {
    this.PRIsTaxValue = event;
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
      res.List.forEach(el => {
        el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
      });
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }

  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          element.IdentityNo = element.IdentityNo ? element.IdentityNo : element.ParentIdentityNo;
          ResultList.push(element);
        });
        this.ContractorItems = ResultList;
        this.NgSelectContractorParams.loading = false;
      }
      );
  }

  OpenContractor(event) {
    const ResultList = [];
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false, this.NgSelectContractorParams.selectedObject,
      null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo === null ? el.ParentIdentityNo : el.IdentityNo;
        });
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
      this.ContractorType,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
        });
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }

  onAddActorClick() {
    this.PopUpType = 'app-actor-inquiry';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.MainMinwidthPixel = 700;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = {
      HeaderName: 'جستجوي شخص',
      ModuleCode: this.ModuleCode,
    };
  }

  OnLetterDateChange(ADate) {
    this.LetterDate = ADate.MDate;
  }

  onGridReadyProdReqRel(params: { api: any; }) {
    this.ProdReqRelApi = params.api;

  }

  FetchMoreContract(event) {
    event.Owner.contractRelColDef[3].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ContractList.GetRelatedContractpaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        event.Owner.RegionParams.selectedObject, event.Owner.FinYearCode, null).subscribe((res: any) => {
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
    event.Owner.contractRelColDef[3].cellEditorParams.Params.loading = true;
    event.Owner.ContractList.GetRelatedContractpaging(event.PageNumber, 30, event.term,
      event.SearchOption, event.Owner.RegionParams.selectedObject, event.Owner.FinyearCode, null).
      subscribe((res: any) => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'related-contract'
        });
      });
    event.Owner.contractRelColDef[3].cellEditorParams.Params.loading = false;
  }

  FetchMoreActor(event) {
    const ResultList = [];
    this.NgSelectActorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          element.IdentityNo = element.IdentityNo ? element.IdentityNo : element.ParentIdentityNo;
          ResultList.push(element);
        });
        this.ActorItems = ResultList;
        this.NgSelectActorParams.loading = false;
      }
      );
  }

  OpenActor(event) {
    const ResultList = [];
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', true, false, false, this.NgSelectActorParams.selectedObject,
      null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo === null ? el.ParentIdentityNo : el.IdentityNo;
        });
        this.ActorItems = res.List;
        this.ActorTotalItemCount = res.TotalItemCount;
        this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
      });
  }

  doActorSearch(event) {
    this.NgSelectActorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
        });
        this.ActorItems = res.List;
        this.ActorTotalItemCount = res.TotalItemCount;
        this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectActorParams.loading = false;
      });
  }

  FetchMoreSecondObserver(event) {
    const ResultList = [];
    this.NgSelectSecondObserverParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          element.IdentityNo = element.IdentityNo ? element.IdentityNo : element.ParentIdentityNo;
          ResultList.push(element);
        });
        this.SecondObserverItems = ResultList;
        this.NgSelectSecondObserverParams.loading = false;
      }
      );
  }

  OpenSecondObserver(event) {
    const ResultList = [];
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', true, false, false, this.NgSelectSecondObserverParams.selectedObject,
      null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo === null ? el.ParentIdentityNo : el.IdentityNo;
        });
        this.SecondObserverItems = res.List;
        this.SecondObserverTotalItemCount = res.TotalItemCount;
        this.SecondObserverPageCount = Math.ceil(res.TotalItemCount / 30);
      });
  }

  doSecondObserverSearch(event) {
    this.NgSelectSecondObserverParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false, false, null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo ? el.IdentityNo : el.ParentIdentityNo;
        });
        this.SecondObserverItems = res.List;
        this.SecondObserverTotalItemCount = res.TotalItemCount;
        this.SecondObserverPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectSecondObserverParams.loading = false;
      });
  }

  onConfirm() {
    // if (this.CheckRegionWritable) {
    //   this.ShowMessageBoxWithOkBtn('امکان تایید درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
    //   return;
    // }
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        // if (this.ChangeDetection) {
        //   this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست انجام معامله تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        // } else if (this.IsExpertSelected) {
        //   this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
        // } else {
        this.DOConfirm();
        // }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.ContractId,
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
          }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }

  DOConfirm(HasAlert = true, resolve = null) {
    // if (this.WorkflowObjectCode === null) {
    //   this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
    // }
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.ContractId,
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
        resolve(true);
      });
  }

  DoUnConfirm(alert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.ContractId,
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
        resolve(true);
      });
  }

  DOFinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ContractId,
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
      });
  }

  onUnConfirmAndReturn() {
    // if (this.CheckRegionWritable) {
    //   this.ShowMessageBoxWithOkBtn('امکان عدم تایید و بازگشت درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
    //   return;
    // }
    this.IsDown = false;
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.ProductRequestCode;
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
                  ObjectID: this.ContractId,
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
  }

  onConfirmAndSend() {
    // if (this.CheckRegionWritable) {
    //   this.ShowMessageBoxWithOkBtn('امکان تایید و ارسال درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
    //   return;
    // }
    this.BtnClickedName = 'ConfirmAndSend';
    this.DoConfirmAndSend();
  }

  DoConfirmAndSend() {
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.ProductRequestCode;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
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
                      ObjectID: this.ContractId,
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

  SetStartedWFInfo(Resolve) {
    this.FlowService.GetStartModuleViewTypeCode(
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.WorkflowTypeCode,
      this.ContractId).subscribe(res => {
        if (res) {
          this.IsDisable = false;
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
        } else {
          this.IsDisable = true;
        }
        Resolve();
      });
  }

  OnClickPrintFlow() {
    let FullPersonName = { FullPersonName: '' };

    this.Report.ShowReport(null,
      null,
      this.ContractId,
      this.ContractCode,
      this.ContractObject.ContractNo,
      this.ContractObject.LetterDatePersian,
      this.Subject,
      FullPersonName ? FullPersonName.FullPersonName : '',
      null,
      null,
      this.ModuleCode,
      this.RegionParams.selectedObject
    );
  }

  BtnArchiveClick() {
    if (this.ContractObject.ContractId) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 250;
      this.startTopPosition = 10;
      const archiveParam = {
        EntityID: this.ContractObject.ContractId,
        TypeCodeStr: '1447-',
        DocTypeCode: 1447,
        ModuleCode: 3037,
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        IsReadOnly: false,
      };
      this.ArchiveParam = archiveParam;
    }
    else {
      this.ShowMessageBoxWithOkBtn('مقادیر به درستی وارد نشده است، لطفا با راهبر سیستم تماس بگیرید');
    }
  }

}
