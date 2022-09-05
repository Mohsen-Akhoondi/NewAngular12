import { Component, OnInit, Output, EventEmitter, Input, ViewChild, TemplateRef } from '@angular/core';
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
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { isNullOrUndefined, isUndefined } from 'util';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
// tslint:disable-next-line: max-line-length
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-request-contract-without-flow',
  templateUrl: './request-contract-without-flow.component.html',
  styleUrls: ['./request-contract-without-flow.component.css']
})
export class RequestContractWithoutFlowComponent implements OnInit {
  @ViewChild('IsCheck') IsCheck: TemplateRef<any>;
  @ViewChild('IsSelected') IsSelected: TemplateRef<any>;
  @ViewChild('ShowReceiveDocProperty') ShowReceiveDocProperty: TemplateRef<any>;
  @Output() ProductRequestSuggestionClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupParam;

  adContractPersoncol = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  DurationDay;
  private gridApi;
  gridHeight = 55;
  SumFinalEstimateFAmount = '0';
  SumFinalEstimateSAmount = '0';
  SumFinalEstimateMAmount = '0';
  ArchiveParam;
  ContractorWidth = 76;
  IsRequire = false;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  DurationMonth;
  DisablePriceListType = false;
  DisplayLetter = false;
  ProdReqItemApi;
  ProdReqEstApi;
  DurationYear;
  HaveHeader;
  CheckRegionWritable;
  isClicked = false;
  IsBalancing;
  ActorControl;
  CostFactorID;
  ProductRequestItemList = [];
  ProdReqItemrowData;
  SumFinalItemAmount = '0';
  SumFinalEstimateAmount = '0';
  SumFinalItemAmountCOEF = '0';
  ProductName;
  ProductCode;
  Amount;
  ContractPersonListData = [];
  btnRequestSuggestionName = 'مناقصه';
  IsEstimateEditable = false;
  // RequestSupplierApi;
  RegionCode;
  SumFinalAmount = 0;
  SumAmountCOEFPact = 0;
  ReceiveDocEnable = true;
  DealTypeCode;
  RegionGroupCode: any;
  DealTypeName;
  ProdReqRelApi;
  ProductRequestDate;
  PriceListPatternID;
  selectedEstimateRow;
  BtnClickedName;
  ProdReqItemColDef;
  ProdReqEstColDef;
  ExcelColDef;
  IsNotFound = false;
  selectedPRItemRow;
  beforeID;
  BeforePersonID;
  IsShowTwoGrid = true;
  GWidth = 200;
  GMaxWidth = 1000;
  CoefParam: {};
  btnclicked: boolean;
  startToptPosition: number;
  selectedItemRow;
  HaveMaxBtn;
  SelectedProductRequestItemID: any;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  IsDisable = true;
  ReceiveDoccolumnDef;
  ReceiveDocrowsData = [];
  ContractTypeItems;
  PersonTypeList: any;
  CommitionListSet = [];
  ContractId;
  IsForce = false;
  ShowActLocation = true;
  ContractorName = 'طرف قرارداد';
  CommitionParams = {
    bindLabelProp: 'CommitionName',
    bindValueProp: 'CommitionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true
  };
  ContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    MinWidth: '79px',
    DropDownMinWidth: '200px'

    // IsDisabled: !this.CheckBoxStatus
  };
  DealMethodItems;
  DealMethodParams = {
    bindLabelProp: 'DealMethodName',
    bindValueProp: 'DealMethodCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    // IsDisabled: !this.CheckBoxStatus
  };
  ProdReqEstList = [];

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
    Required: true
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
  ProdReqRelColDef;
  ProdReqRelList = [];
  RequestSupplierList = [];
  RequestSupplierApi;
  RSupplierList = [];
  ProductRequestObject;
  PopUpType;
  startLeftPosition;
  startTopPosition;
  NgSelectVSParams = {
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
    },
    type: 'ContractSign'
  };
  NgSelectComitionMemberParams = {
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
    type: 'ComitionMember',
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
    Required: false
  };
  // ContractTypeItems;
  // ContractTypeParams = {
  //   bindLabelProp: 'ContractTypeName',
  //   bindValueProp: 'ContractTypeCode',
  //   placeholder: '',
  //   MinWidth: '155px',
  //   selectedObject: null,
  //   loading: false,
  //   IsVirtualScroll: false,
  //   IsDisabled: false,
  //   Required: true
  // };
  ContractStatusItems;
  PriceListTopicItems;
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    // IsDisabled: !this.CheckBoxStatus
  };
  PriceListTypeItems;
  PriceListTypeParams = {
    bindLabelProp: 'PriceListTypeName',
    bindValueProp: 'PriceListTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    // IsDisabled: !this.CheckBoxStatus
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
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
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
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  ContractorItems;
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
  NgSelectContractPersonParams = {
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
  ActLocationItems;
  MinHeightPixel;
  columnDef;
  ContractsignRowsData;
  rowsData;
  StartDate;
  EndDate;
  WorkStartDate;
  WarrantyDate;
  RegionName;
  ContractsignColDef;
  ComitionMemberColDef;
  StartType = 1;
  AmountType = true;
  IsSecret = false;
  IsTaxValue = true; // RFC 55234 -  درخواست خ احمدی
  ContractsignApi: any;
  ComitionMemberRowsData;
  ComitionMemberApi;
  ContractorTotalItemCount;
  ContractorPageCount;
  Contractsubject;
  ContractObject: any;
  ContractCode: any;
  ReceiveDocApi: any;
  CheckValidate = false;
  ContractorType = true;
  RequiredComponents = [this.ContractTypeParams, this.DealMethodParams,
  this.Article31Params];
  SelectedReceiveDocID: any;
  IsUseProviders = false;
  IsDown = false;
  LetterNo;
  LetterDate;
  IsValidContract = false;
  LetterParam = {
    CostFactorID: -1,
    RegionCode: -1,
    LetterTypeCodeList: [],
    OrganizationCode: -1,
    ReceiveDocID: null,
    SaveMode: false,
    ReadOnlyMode: true,
  };
  MainMinwidthPixel: number;
  HaveSave: boolean;
  HaveUpdate: boolean;
  IsInitS: boolean;
  IsInitE: boolean;
  ModuleCode;
  IsEditable = true;
  SelectedDocument: any;
  CostFactorLetter: any;
  RegisterLetterDate;
  RegisterLetterNo;
  DocumentLetterNo;
  IdentityNo: any;
  HaveSaveEditable = true;
  IsNotNew = false;
  SelectedPersonTypeCode: number;
  IsMaterialsDifference;
  IsShow = false;
  PRItemApi;
  ProdReqPersonrowData = [];
  IsPersonEditable = false;
  ProdReqPersonApi;
  HaveEstimateTab = true;
  HasRelContract = false;
  HaveAdviceTab: boolean;
  WeightProdReqItemColDef;
  ProdReqPersonColDef;
  NewItemTemp = { ItemNo: 1, IsSelected: 1 }; // RFC 
  IsConsultant = false; // RFC 51021
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
  ConsultantSelectTypeItems = [];
  ShowDiv = false;
  IsDisplay = true;
  ProposalShow = true;
  RDDivGridHeight = 99;
  RDGridheight = 88;
  IsConInfoDisable = false;
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
  PRIsTaxValue = true;
  TabRahbari = false;
  QuestionLabel;
  WinnerQuestion = null;
  ReNewQuestion;
  IsLawful;
  IsYes = true;
  IsRenewal = false;
  RahbariShow = false;
  VirtualModuleViewTypeCode: number;
  IsDisableCommition = true;
  ModuleViewTypeCode: number;
  originModuleCode: number;

  NgSelectRSParams = {
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
        [{ HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ProductRequestTypeCode; // RFC 59678
  HasPRIEntity = false;
  IsOverReadOnly = false;
  ConsultantSelectWayItems = []; // 62341
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
  ProductRequestItemID;

  constructor(private ProductRequest: ProductRequestService,
    private ContractList: ContractListService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private PriceList: PriceListService,
    private ArchiveList: ArchiveDetailService,
    private FinYear: FinYearService,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private Automation: AutomationService,
    private Order: OrderService,
    private CommonService: CommonServices,
    private Report: ReportService) {

    this.PersonTypeList = [{ PersonTypeCode: 1, PersonTypeName: 'حقیقی' },
    { PersonTypeCode: 2, PersonTypeName: 'حقوقی' }];
    this.SeasonListItems =
      [
        { SeasonCode: 1, SeasonName: 'فصل اول' },
        { SeasonCode: 2, SeasonName: 'فصل دوم' },
        { SeasonCode: 3, SeasonName: 'فصل سوم' },
        { SeasonCode: 4, SeasonName: 'فصل جهارم' },
      ];
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
          Items: this.ContractList.GetRolesList(false, 2840),
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
      }];
  }

  ngOnInit() {
    if (this.ModuleCode === 2840) {
      this.btnRequestSuggestionName = 'فراخوان';
    }
    this.IsInitS = true;
    this.IsInitE = true;
    if (this.PopupParam.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }
    if (this.PopupParam.ModuleViewTypeCode) {
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    }
    if (this.PopupParam.ModuleCode === 3037) {
      this.ShowActLocation = false;
      this.ContractorName = "به نیابت از";
    }
    const promise = new Promise<void>((resolve, reject) => {
      this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
              this.HaveSave = true;
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
      this.CustomCheckBoxConfig.color = 'state p-primary';
      this.CustomCheckBoxConfig.icon = 'fa fa-check';
      this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
      this.ContractsignRowsData = [];
      this.ComitionMemberRowsData = [];
      this.ProductRequestObject = this.PopupParam.ProductRequestObject;
      if (this.ProductRequestObject.RegionCode === 205) {
        this.IsRequire = true;
      }
      if (this.ProductRequestObject.IsCost === false) {
        this.DealMethodParams.Required = false;
      }
      if (this.ProductRequestObject.SubCostCenterObject.CostCenterObject
        && this.ProductRequestObject.SubCostCenterObject.CostCenterObject.CostCenterCode != null) {
        if (this.ProductRequestObject.RegionCode !== 200 &&
          (this.ProductRequestObject.RegionCode === 0 ||
            this.ProductRequestObject.ContractTypeCode === 2 ||
            this.ProductRequestObject.ContractTypeCode === 26 ||
            this.ProductRequestObject.ContractTypeCode === 27 ||
            this.ProductRequestObject.ContractTypeCode === 28 ||
            this.ProductRequestObject.ContractTypeCode === 29)) {
          this.HaveAdviceTab = true;
        }
        if (this.ProductRequestObject.RegionCode === 200) {
          this.HaveAdviceTab = false;
          this.HaveEstimateTab = false;
        }
      }
      this.CheckRegionWritable = this.PopupParam.CheckRegionWritable;
      this.RegionCode = this.ProductRequestObject.RegionCode;
      this.RegionName = this.ProductRequestObject.RegionName;
      this.rowsData = [];
      this.ContractObject = this.ProductRequestObject.ContractObject;
      this.RSupplierList = this.ProductRequestObject.RequestSupplierList;
      // if (this.ModuleCode == 2739 || this.ModuleCode == 2776) {
      //   this.ProdReqRelList = this.PopupParam.ContractRelationList;
      // } else {
      this.ProdReqRelList = this.ProductRequestObject.ProductRequestRelationList;
      // } // 64494   
      this.DurationDay = this.ProductRequestObject.DurationDay;
      this.DurationMonth = this.ProductRequestObject.DurationMonth;
      this.DurationYear = this.ProductRequestObject.DurationYear;
      this.IsDisable = !this.ProductRequestObject.IsPact;
      this.SumFinalAmount = this.PopupParam.SumFinalAmount;
      this.SumAmountCOEFPact = this.PopupParam.SumAmountCOEFPact;
      this.DealTypeCode = this.PopupParam.DealTypeCode;
      this.DealTypeName = this.PopupParam.DealTypeName;
      this.PriceListPatternID = this.PopupParam.PriceListPatternID;
      this.Contractsubject = this.ContractObject ? this.ContractObject.Subject : this.ProductRequestObject.Subject;
      this.RegionGroupCode = this.PopupParam.RegionGroupCode;
      this.CustomCheckBoxConfig.AriaWidth = 50;
      this.CostFactorID = this.ProductRequestObject.CostFactorID;
      this.ContractId = this.ContractObject && this.ContractObject.ContractId ? this.ContractObject.ContractId : null;
      this.PRIsTaxValue = this.ProductRequestObject.IsTaxValue;
      this.ProductRequestTypeCode = this.ProductRequestObject.ProductRequestTypeCode; // RFC 59678
      // this.IsUseProviders = this.ProductRequestObject.IsUseProviders;

      // if (this.IsUseProviders) {
      //   this.NgSelectContractorParams.bindValueProp = 'IdentityNo';
      // }
      this.ProductRequestItemID = this.ProductRequestObject.ProductRequestItemList && this.ProductRequestObject.ProductRequestItemList.length > 0 ? this.ProductRequestObject.ProductRequestItemList[0].ProductRequestItemID : -1;
      this.CoulumnsDefinition(this.ProductRequestObject.ContractTypeCode);
      this.ProdReqPersonColDef[1].cellEditorParams.Items = this.ProductRequest.GetBusinessPattern();
      forkJoin([
        // tslint:disable-next-line: max-line-length
        this.ContractList.GetContractTypeListByType(this.ProductRequestObject.IsCost, this.ModuleCode, this.ProductRequestObject.RegionCode),
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetDealMethodListByReionGroupCode(
          this.ProductRequestObject.IsCost,
          this.DealTypeCode,
          this.ProductRequestObject.RegionCode,
          this.ModuleCode,
          this.ProductRequestObject.DealMethodCode,
          null,
          null),
        this.ProductRequest.GetArticle31List(this.ProductRequestObject.RegionCode),
        this.FinYear.GetFinYearList(),
        this.ContractList.GetContractStatusList(),
        this.ProductRequest.GetCostCenterByRegion(0, null, null, true),
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetActLocationByRegionCode(this.ProductRequestObject.ProxyContractorRegionCode !== null ? this.ProductRequestObject.ProxyContractorRegionCode :
          this.ProductRequestObject.RegionCode),
        this.Order.GetCommitionList(),
        this.PriceList.GetPriceListTopics(true),
        this.ProductRequest.GetPRBalanceFactors(this.ProductRequestObject.CostFactorID),
        this.ProductRequest.GetContractSignerList(this.ProductRequestObject.RegionCode,
          this.ProductRequestObject.ShortProductRequestDate, this.ProductRequestObject.CostFactorID, this.ContractId),
        this.ProductRequest.GetConsultantSelectTypeList(), // RFC 50806
        this.ProductRequest.GetConsultantSelectWayList(),
        this.ContractList.GetContractPersonList(this.ContractId ? this.ContractId : -1, false),
        this.ProductRequest.GetOrdersWithProductRequest(this.ProductRequestItemID, false, this.CostFactorID, false, null,
          (this.PopupParam && this.PopupParam.ModuleViewTypeCode ? this.PopupParam.ModuleViewTypeCode : null), this.PopupParam.ModuleCode),
      ]
      ).subscribe(res => {
        this.IsDown = true;
        this.ContractTypeItems = res[0];
        if (this.ModuleCode === 3037) {
          this.ContractTypeParams.selectedObject = res[0][0].ContractTypeCode;
        } else {
          this.ContractTypeParams.selectedObject = this.ProductRequestObject.ContractTypeCode;
        }
        this.DealMethodItems = res[1];
        // this.Article31Items = res[2];
        this.ContractStatusParams.selectedObject = 1;
        this.ContractTypeParams.selectedObject = this.ProductRequestObject.ContractTypeCode;
        if (this.ContractTypeParams.selectedObject === 2 || this.ContractTypeParams.selectedObject === 26
          || this.ContractTypeParams.selectedObject === 27 || this.ContractTypeParams.selectedObject === 28
          || this.ContractTypeParams.selectedObject === 29) {
          this.IsConsultant = true;
        } else {
          this.IsConsultant = false;
        }
        if (this.ProductRequestObject.DealMethodCode) {
          this.DealMethodParams.selectedObject = this.ProductRequestObject.DealMethodCode;
          this.onChangeDealMethod(this.DealMethodParams.selectedObject);
        }
        this.Article31Params.selectedObject = this.ProductRequestObject.Article31ID;

        this.FinYearItems = res[3];
        this.ContractStatusItems = res[4];
        this.CostCenterItems = res[5];

        if (this.DealTypeCode === 1 && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)) {
          this.Article31Params.selectedObject = null;
          this.IsNotNew = true;
        }

        // if (res[7]) {
        //   this.CommitionListSet = res[7];
        //   this.CommitionParams.selectedObject = res[7][0].CommitionCode;
        //   this.ProductRequest.GetContractCommitionMemberList(this.ContractId).subscribe(res => {
        //     this.ComitionMemberRowsData = res;
        //   });
        // }
        if (res[14] && res[14].LastInquiryObject &&
          res[14].LastInquiryObject.OrderCommitionObject &&
          res[14].LastInquiryObject.OrderCommitionObject.OrderCommitionMemberList) {
          const ActorIDs = [];
          res[14].LastInquiryObject.OrderCommitionObject.OrderCommitionMemberList.forEach(item => {
            ActorIDs.push(item.ActorID);
          });
          this.ProductRequest.GetByActorIDs(
            res[14].LastInquiryObject.OrderCommitionObject.CommitionCode,
            this.ProductRequestObject.RegionCode,
            ActorIDs).subscribe(resss => {
              this.ComitionMemberRowsData = resss;
            });
        }

        this.ActLocationItems = res[6];
        if (!this.ContractObject) {
          this.ActLocationParams.selectedObject = this.ProductRequestObject.ActLocationID;
        } else if (this.ContractObject && this.ContractObject.ActLocationId) {
          this.ActLocationParams.selectedObject = this.ContractObject.ActLocationId;
        }
        if (res[8]) {
          this.PriceListTopicItems = res[8];
        }

        if (res[9]) {
          this.PriceListTopicParams.selectedObject = res[9].PriceListFineYearCode;
          this.PriceList.GetPriceListType(this.PriceListTopicParams.selectedObject).subscribe(
            ress => {
              this.PriceListTypeItems = ress;
              this.PriceListTypeItems.forEach(item => {
                item.PriceListTypeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
              });
            }
          );
          this.PriceListTypeParams.selectedObject = res[9].PriceListTypeCode;
          if (this.PriceListTypeParams.selectedObject === '02' || !this.IsBalancing) {
            this.SeasonListParams.selectedObject = null;
          } else {
            this.SeasonListParams.selectedObject = this.ProductRequestObject.SeasonCode;
          }
        }
        this.ContractsignRowsData = res[10];
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
        this.ConsultantSelectTypeItems = res[11];
        this.ConsultantSelectWayItems = res[12];
        this.ContractPersonListData = res[13];
        this.ConsultantSelectTypeParams.selectedObject = this.ProductRequestObject.ConsultantSelectTypeCode;
        this.ConsultantSelectedWayParams.selectedObject = this.ProductRequestObject.ConsultantSelectedWayCode;
        if (this.ContractObject) {
          this.FinYearParams.selectedObject = this.ContractObject.FinYearCode;
          this.ContractTypeParams.selectedObject = this.ContractObject.ContractTypeCode;
          this.ContractStatusParams.selectedObject = this.ContractObject.ContractSatusCode;
          this.Article31Params.selectedObject = this.ContractObject.ProdReqObject.Article31ID;
          this.ConsultantSelectTypeParams.selectedObject = this.ContractObject.ProdReqObject.ConsultantSelectTypeCode;
          this.ConsultantSelectedWayParams.selectedObject = this.ContractObject.ProdReqObject.ConsultantSelectedWayCode;
          if (this.IsUseProviders) {
            if (this.ContractObject.IsPersonContractor && this.ContractObject.PersonContractorObject) {
              this.NgSelectContractorParams.selectedObject = this.ContractObject.PersonContractorObject.ActorId;
            }
            if (!this.ContractObject.IsPersonContractor && this.ContractObject.CorporateContractorObject) {
              this.NgSelectContractorParams.selectedObject = this.ContractObject.CorporateContractorObject.ActorId;
            }
          } else {
            this.NgSelectContractorParams.selectedObject = this.ContractObject.ContractorId;
          }
          this.OpenContractor(null);
        }
      });
      if (this.ModuleCode === 2776 && this.PopupParam.ModuleViewTypeCode) {
        switch (Number(this.PopupParam.ModuleViewTypeCode)) {
          case 2:
            this.HaveSaveEditable = true;
            this.IsEditable = false;
            this.IsValidContract = false;
            this.DisplayLetter = true;
            break;
          case 3: // تامین اعتبار در مالی61605
            this.IsEditable =
              this.IsEstimateEditable =
              this.HaveSave =
              this.HaveUpdate =
              this.HaveSaveEditable =
              this.IsValidContract = false;
            this.RahbariShow =
              this.IsConInfoDisable =
              this.DisablePriceListType =
              this.DisablePriceListType =
              this.IsUseProviders =
              this.IsOverReadOnly = true;
            break;
          case 800000: // جستجو خدمات شهری
            this.IsConInfoDisable = true; // RFC 53678
            this.HaveSaveEditable = false;
            this.IsEditable = false;
            this.IsValidContract = false;
            this.IsDisplay = false;
            this.DisplayLetter = true;
            break;
          case 500000: // فقط خواندنی
            {
              this.RahbariShow = true;
              this.IsConInfoDisable = true;
              this.TabRahbari = true;
              this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
              this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
              this.ReNewQuestion = 'درخواست تجدید شود؟';
              if (this.ProductRequestObject.LastInquiryObject &&
                this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
              this.IsEditable = false;
              this.HaveSave = false;
              this.HaveUpdate = false;
              this.HaveSaveEditable = true;
              this.DisplayLetter = false;
              this.IsUseProviders = true;
              this.ContractorWidth = 80.1;
              this.IsEstimateEditable = false;
              this.DisablePriceListType = true;
            }
            break;
          default:
            break;
        }
      } else if (this.PopupParam.ModuleCode === 2739 && this.PopupParam.ModuleViewTypeCode) {
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 100000:
          case 300000:
            this.TabRahbari = true;
            this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
            this.ReNewQuestion = 'درخواست تجدید شود؟';
            if (this.ProductRequestObject.LastInquiryObject &&
              this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
            this.DisplayLetter = true;
            break;
          case 200000:
            {
              this.IsShow = true;
              this.TabRahbari = true;
              this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
              this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
              this.ReNewQuestion = 'درخواست تجدید شود؟';
              if (this.ProductRequestObject.LastInquiryObject &&
                this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
              this.DisplayLetter = true;
            }
            break;
          case 400000: // جستجو پیشرفته
          case 7:
            {
              this.RahbariShow = true;
              this.IsConInfoDisable = true; // RFC 53678
              this.TabRahbari = true;
              this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
              this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
              this.ReNewQuestion = 'درخواست تجدید شود؟';
              if (this.ProductRequestObject.LastInquiryObject &&
                this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
              this.DisplayLetter = true;
            }
            break;
          case 500000: // فقط خواندنی
            {
              this.RahbariShow = true;
              this.IsConInfoDisable = true;
              this.TabRahbari = true;
              this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
              this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
              this.ReNewQuestion = 'درخواست تجدید شود؟';
              if (this.ProductRequestObject.LastInquiryObject &&
                this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
              this.IsEditable = false;
              this.HaveSave = false;
              this.HaveUpdate = false;
              this.HaveSaveEditable = true;
              this.DisplayLetter = false;
              this.IsValidContract = true; // 60680
              this.IsUseProviders = true;
              this.ContractorWidth = 80.1;
              this.IsEstimateEditable = false;
              this.DisablePriceListType = true;
            }
            break;
          case 800000: // جستجو خدمات شهری
            this.IsConInfoDisable = true; // RFC 53678
            this.HaveSaveEditable = false;
            this.IsEditable = false;
            this.IsValidContract = false;
            this.IsDisplay = false;
            this.DisplayLetter = true;
            break;
          default:
            break;
        }
      } else if (this.PopupParam.ModuleCode === 2844 && this.PopupParam.ModuleViewTypeCode) {
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 800000: // جستجو خدمات شهری
            this.IsConInfoDisable = true; // RFC 53678
            this.HaveSaveEditable = false;
            this.IsEditable = false;
            this.IsValidContract = false;
            this.IsDisplay = false;
            this.DisplayLetter = true;
            break;
          case 500000: // فقط خواندنی
            {
              this.RahbariShow = true;
              this.IsConInfoDisable = true;
              this.TabRahbari = true;
              this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
              this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
              this.ReNewQuestion = 'درخواست تجدید شود؟';
              if (this.ProductRequestObject.LastInquiryObject &&
                this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
              this.IsEditable = false;
              this.HaveSave = false;
              this.HaveUpdate = false;
              this.HaveSaveEditable = true;
              this.DisplayLetter = false;
              this.IsUseProviders = true;
              this.ContractorWidth = 80.1;
              this.IsEstimateEditable = false;
              this.DisablePriceListType = true;
            }
            break;
          default:
            break;
        }
      } else if (this.PopupParam.ModuleCode === 2840 && this.PopupParam.ModuleViewTypeCode) { // RFC 56713 - شبیه ماژول 2739
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 400000: // جستجو پیشرفته
          case 300000: // اصلاح درخواست- راهبری
            this.RahbariShow = true;
            this.IsConInfoDisable = true; // RFC 53678
            this.TabRahbari = true;
            this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
            this.ReNewQuestion = 'درخواست تجدید شود؟';
            if (this.ProductRequestObject.LastInquiryObject &&
              this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
            this.DisplayLetter = true;
            break;
          case 500000: // فقط خواندنی
            {
              this.RahbariShow = true;
              this.IsConInfoDisable = true;
              this.TabRahbari = true;
              this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
              this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
              this.ReNewQuestion = 'درخواست تجدید شود؟';
              if (this.ProductRequestObject.LastInquiryObject &&
                this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
              this.IsEditable = false;
              this.HaveSave = false;
              this.HaveUpdate = false;
              this.HaveSaveEditable = true;
              this.DisplayLetter = false;
              this.IsValidContract = false;
              this.IsUseProviders = true;
              this.ContractorWidth = 80.1;
              this.IsEstimateEditable = false;
              this.DisablePriceListType = true;
            }
            break;
          default:
            break;
        }
      } else if (this.PopupParam.ModuleCode === 2901 && this.PopupParam.ModuleViewTypeCode) { // تهاتر ملک
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 2: // تامین اعتبار در مالی
            this.IsEditable =
              this.IsEstimateEditable =
              this.HaveSave =
              this.HaveUpdate =
              this.HaveSaveEditable =
              this.IsValidContract = false;
            this.RahbariShow =
              this.IsConInfoDisable =
              this.DisablePriceListType =
              this.DisablePriceListType =
              this.IsUseProviders =
              this.IsOverReadOnly = true;
            break;
          default:
            break;
        }
      }

      // If There Is No Contract
      this.SetVWProductRequestItemData();
      // else convert contract items to prodreq items;
      if (this.ModuleCode === 2776) {
        this.ShowDiv = true;
        this.RDDivGridHeight = 83;
        this.RDGridheight = 84;
      }
      if (this.PopupParam.OrginalModuleCode === 2739) {
        this.IsDisableCommition = false;
        this.ProposalShow = false; // RFC 55308
        this.TabRahbari = true;
        this.QuestionLabel = 'آیا شرکت کننده ای وجود دارد ؟';
        this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
        this.ReNewQuestion = 'درخواست تجدید شود؟';
        if (this.ProductRequestObject.LastInquiryObject &&
          this.ProductRequestObject.LastInquiryObject.IsReturn != null) {
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
      }
      if (this.PopupParam.ModuleCode === 2739) {
        this.ProposalShow = false; // RFC 56935
      }
      let ContractorId = null;
      if (this.ContractObject) {
        ContractorId = this.ContractObject.ContractorId;
        const LetterTypeCodeList = [];
        LetterTypeCodeList.push(1);
        this.IsValidContract = this.PopupParam.ModuleCode === 2776 && this.PopupParam.ModuleViewTypeCode === 3 ? false : true; // 61605
        this.LetterParam = {
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RegionCode: this.ProductRequestObject.RegionCode,
          LetterTypeCodeList: LetterTypeCodeList,
          OrganizationCode: this.ProductRequestObject.OrganizationCode,
          ReceiveDocID: null,
          SaveMode: this.IsEditable,
          ReadOnlyMode: !this.IsEditable
        };
        this.ContractCode = this.ContractObject.ContractCode;
        this.ReceiveDocrowsData = this.ContractObject.ContractWarrantyList;
        // this.ComitionMemberRowsData = this.ContractObject.GetContractCommitionMemberList;
        this.StartDate = this.ContractObject.FromContractDateString;
        this.EndDate = this.ContractObject.ToContractDateString;
        this.StartType = this.ContractObject.StartTypeCode;
        this.AmountType = this.ContractObject.IsFindCost;
        this.IsTaxValue = this.ContractObject.IsTaxValue;
        this.IsSecret = this.ContractObject.IsSecret;
        this.WorkStartDate = this.ContractObject.ActualStartDateString;
        this.WarrantyDate = this.ContractObject.WarrantyDateString;
        this.ContractorType = this.ContractObject.ContractorType;
        this.LetterNo = this.ContractObject.LetterNo;
        this.LetterDate = this.ContractObject.ShortLetterDate;
        this.DealMethodParams.selectedObject = this.ContractObject.ProdReqObject.DealMethodCode;
        this.RegionCode = this.ContractObject.ProdReqObject.RegionCode;
        this.IsBalancing = this.ProductRequestObject.IsBalancing;
        this.IsMaterialsDifference = this.ProductRequestObject.IsMaterialsDifference;
        this.onChangeDealMethod(this.DealMethodParams.selectedObject);

        if (this.ContractObject.ContractSatusCode === 2) {
          this.IsEditable = false;
        }

        if (this.ProductRequestObject.RelatedContractID && this.PopupParam.ModuleViewTypeCode !== 1) {
          this.IsNotNew = true;
        }
        if (this.ProductRequestObject.RelatedContractID) { // RFC 49755
          this.HasRelContract = true;
        }
      } else { // RFC = 50480
        this.StartDate = this.ProductRequestObject.ProductRequestItemList.reduce(function (a, b) {
          return a.ShortStartDate < b.ShortStartDate ?
            a : b;
        }).ShortStartDate;
        this.EndDate = this.ProductRequestObject.ProductRequestItemList.reduce(function (a, b) {
          return a.ShortEndDate > b.ShortEndDate ?
            a : b;
        }).ShortEndDate;
      }
    });
    if (this.PopupParam.ModuleViewTypeCode === 600000) {
      this.HaveUpdate = this.DisplayLetter = this.HaveSaveEditable = this.IsEditable = false;
      this.IsValidContract = this.IsEstimateEditable = this.ProposalShow = this.HaveSave = false;
      this.DisablePriceListType = this.RahbariShow = this.IsConInfoDisable = this.IsUseProviders = true;
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.ComitionMemberColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'حاضر',
        field: 'IsCheck',
        width: 100,
        editable: false,
        resizable: true,
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
          ngTemplate: this.IsCheck
        },
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        width: 300,
        resizable: true,
        editable: false
      },
      {
        headerName: ' نام عنوان واحد  ',
        field: 'UnitTopicName',
        width: 300,
        resizable: true,
        editable: false,
        hide: this.PopupParam.ProductRequestObject.RegionCode === 205 ? false : true
      }
    ];
    this.ContractsignColDef = [ // RFC 50671
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'انتخاب',
        field: 'IsSelected',
        width: 80,
        editable: true,
        resizable: false,
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
          ngTemplate: this.IsSelected
        },
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreContractSignPerson,
          FetchByTerm: this.FetchContractSignPersonByTerm,
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
    this.ReceiveDoccolumnDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'بارکذاری اسناد ضمانت نامه',
        field: '',
        width: 180,
        resizable: false,
        editable: this.ReceiveDocEnable ? !this.ReceiveDocEnable : false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowReceiveDocProperty,
        }
      },
      {
        headerName: 'نوع سند',
        field: 'ReceiveDocTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
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
        headerName: 'تاريخ ضمانت نامه',
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
        headerName: 'توضيحات',
        field: 'Note',
        editable: true,
        width: 440,
        resizable: true
      }
    ];

    this.ReceiveDoccolumnDef[2].cellEditorParams.Items = this.ContractList.GetWarrantyReceiveDocType();

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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'ProductReuestItemAmount',
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        resizable: true,
        editable: (params) => {
          if (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000) {
            return false;
          } else {
            return (params.data.IsStarCode === 1 ||
              // tslint:disable-next-line: max-line-length
              (!isUndefined(params.data.IsStarCode) && params.data.IsStarCode != null && params.data.IsStarCode === 0 && params.data.IsStar === 'ف*'));
          }
        }
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'ProductReuestItemAmount',
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
            if (params.data.ContractRelationTypeCode === 5 &&
              (!isNullOrUndefined(params.data.IsMuncipalityRegionContractor) && params.data.IsMuncipalityRegionContractor === true) &&
              params.data.ContractTypeCode === 20 &&
              (!isNullOrUndefined(params.data.ContractIsCost) && params.data.ContractIsCost === false) &&
              (!isNullOrUndefined(this.ProductRequestObject.IsCost) && this.ProductRequestObject.IsCost === true) &&
              this.ProductRequestObject.RelatedContractID === null) { // شرایط نیابتی

              this.ActLocationParams.selectedObject = null;
              this.ProductRequest.GetActLocationByRegionCode(params.data.ProxyContractorRegionCode).subscribe(res => {
                this.ActLocationItems = res;
              });
            }
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        width: 300,
        resizable: true
      },
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
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
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        resizable: true
      },
      {
        headerName: 'سال تجربه',
        field: 'ExperienceYear',
        width: 100,
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        resizable: true
      },
      {
        headerName: 'حقوق ماهانه',
        field: 'Amount',
        width: 150,
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        resizable: true
      },
      {
        headerName: 'ضریب سرپرستی',
        field: 'ManagementCOEF',
        width: 100,
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        resizable: true
      },
      {
        headerName: 'ضریب فارغ التحصيل ممتاز',
        field: 'TopGraduated',
        width: 160,
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        resizable: true
      },
      {
        headerName: 'مدت (ماه)',
        field: 'Qty',
        width: 90,
        editable: this.PopupParam && this.PopupParam.ModuleViewTypeCode === 500000 ? false : true,
        resizable: true
      },
      {
        headerName: 'حاصلضرب ضرایب',
        field: 'MultiplyTheCoefficients',
        width: 150,
        resizable: true
      },
      {
        headerName: 'حق الزحمه کل',
        field: 'S',
        width: 200,
        HaveThousand: true,
        resizable: true
      }
    ];

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
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'کد ملي';
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام و نام خانوادگي';
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 10;
              this.NgSelectRSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'کد ملي';
              this.NgSelectRSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام و نام خانوادگي';
            } else {
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام';
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectRSParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 11;
              this.NgSelectRSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectRSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام';
            }
            return true;
          } else {
            params.data.PersonTypeName = null;
            params.data.PersonTypeCode = null;
            return false;
          }
        },
        editable: true,
        width: 110,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRSParams,
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
        editable: true,
        width: 350,
        resizable: true
      },
    ];

  }

  SetVWProductRequestItemData() {
    this.ActorControl = true;
    this.ProductRequest.GetProductRequestItemListVW(this.CostFactorID, this.ActorControl)
      .subscribe(res => {
        this.ProductRequestItemList = [];
        this.ProdReqItemrowData = res;
        let SumAmount = 0;
        let SumAmountCOEF = 0;
        res.forEach((item) => {
          if (item.ProductRequestEstimateList != null) {
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
          }
        });
        this.SumFinalItemAmount = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalItemAmountCOEF = SumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // this.ProdReqItemrowData.forEach(element => {
        //   this.EntityColumnDefinition(element);
        // });
      });
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

    if (this.PriceListTypeParams.selectedObject === '02') {
      this.SeasonListParams.selectedObject = null;
      this.IsBalancing = false;
    }

  }

  rdoIsBalancingClick(IsBalancing) {
    this.IsBalancing = IsBalancing;
    if (!IsBalancing) {
      this.SeasonListParams.selectedObject = null;
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

  onChangeDealMethod(DealMethodCode) {
    if (DealMethodCode) {
      this.IsForce = false;
      this.PriceList.GetAticle31ListByDealMethodCode(DealMethodCode, this.RegionCode).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.Article31Items = res;
          this.Article31Params.IsDisabled = false;
          this.IsArticle31Selected = true;
          // tslint:disable-next-line:max-line-length
          this.Article31Params.Required = (this.DealTypeCode === 1 && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)) ? false : true;
        } else {
          this.Article31Params.IsDisabled = true;
          this.IsArticle31Selected = false;
          this.Article31Params.Required = this.IsArticle31Selected;
          this.Article31Params.selectedObject = null;
        }
      });
    }
    this.DealMethodParams.selectedObject = DealMethodCode;
    if (DealMethodCode == 4 || DealMethodCode == 7) //RFC 63863
    {
      this.IsForce = true;
    }
  }

  onChangeArticle31() { }

  ReqSuppRowClick() { }

  ProdReqRelRowClick() {

  }

  onGridReadyProdReqRel(params: { api: any; }) {
    this.ProdReqRelApi = params.api;

  }

  getDurationDay(DurationDay) {
    if (DurationDay) {
      this.DurationDay = DurationDay;
      this.DurationDay = parseFloat(this.DurationDay);
    } else {
      this.DurationDay = '';
    }
  }

  getDurationMonth(DurationMonth) {
    if (DurationMonth) {
      this.DurationMonth = DurationMonth;
      this.DurationMonth = parseFloat(this.DurationMonth);
    } else {
      this.DurationMonth = '';
    }
  }

  getDurationYear(DurationYear) {
    if (DurationYear) {
      this.DurationYear = DurationYear;
      this.DurationYear = parseFloat(this.DurationYear);
    } else {
      this.DurationYear = '';
    }
  }

  onCoefClick() {
    this.isClicked = true;
    this.PopUpType = 'product-request-coef';
    this.startLeftPosition = 94;
    this.startToptPosition = 79;
    this.PopupParam = {
      HeaderName: 'ضرايب درخواست',
      Subject: this.PopupParam.Subject,
      ContractCode: this.ContractCode,
      ProductRequestObject: this.ProductRequestObject,
      ProductRequestCode: this.PopupParam.ProductRequestCode,
      CostFactorID: this.ProductRequestObject.CostFactorID,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleViewTypeCode: this.ModuleViewTypeCode
    };
  }

  onClose() {
    this.ProductRequestSuggestionClosed.emit(true);
  }

  onSave() {
    if ((this.ModuleCode === 2739 || this.ModuleCode === 2776 || this.ModuleCode === 2840) &&
      (this.StartDate < this.LetterDate)) { // RFC 58012
      this.ShowMessageBoxWithOkBtn('تاريخ انعقاد قرارداد بايد کوچکتر يا مساوي تاريخ شروع قرارداد باشد');
      return;
    }
    const DataList = [];
    const PersonEstimateList = [];
    const InvalidRowData = [];
    const rowData = [];
    const RSupplierList = [];

    this.ProdReqEstApi.stopEditing();
    this.ProdReqItemApi.stopEditing();

    this.ProdReqEstApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    if (this.HaveAdviceTab && this.IsShowTwoGrid) {
      this.ProdReqPersonApi.stopEditing();
    }

    if (this.HaveAdviceTab) {
      this.PRItemApi.stopEditing();
    }
    let InvalidObj;
    this.ProductRequestItemList.forEach((item) => {
      if (item.ProductRequestItemID === this.SelectedProductRequestItemID) {
        rowData.forEach(element => {
          if ((!element.PriceListPatternID ||
            !element.Amount ||
            element.Amount <= 0) &&
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
            !element.Amount ||
            element.Amount <= 0) &&
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
        HeaderName: 'ردیف های زیر در فهرست بها یافت نشد یا دارای مبلغ پایه معتبر نمی باشد. خواهشمند است ابتدا نسبت به تکمیل اطلاعات ردیف های مربوطه اقدام فرمایید',
        InvalidEstimateRows: InvalidRowData,
        HaveSave: true,
        PriceListTypeCode: this.PriceListTypeParams.selectedObject,
        CostListFinYearCode: this.PriceListTopicParams.selectedObject
      };
    } else {
      let CorporateTypeCode = null;
      if (!this.ContractorType) {
        CorporateTypeCode = this.ContractorItems.find(x => x.ActorId === this.NgSelectContractorParams.selectedObject).CorporateTypeCode;
      }
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
        if (this.IsArticle31Selected) {
          ValidateForm =
            ValidateForm &&
              // tslint:disable-next-line:max-line-length
              (this.DealTypeCode === 1 && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)) ? true :
              this.Article31Params.selectedObject &&
              this.EndDate &&
              this.DealMethodParams.selectedObject &&
              this.ContractTypeParams.selectedObject &&
              this.StartDate &&
              (this.ProductRequestObject.RegionCode === 205 ? this.LetterNo : true) &&
              (this.ProductRequestObject.RegionCode === 205 ? this.LetterDate : true);
        } else {
          ValidateForm =
            ValidateForm &&
            this.DealMethodParams.selectedObject &&
            this.ContractTypeParams.selectedObject &&
            this.EndDate &&
            this.StartDate &&
            (this.ProductRequestObject.RegionCode === 205 ? this.LetterNo : true) &&
            (this.ProductRequestObject.RegionCode === 205 ? this.LetterDate : true);
        }
        // tslint:disable-next-line:max-line-length
        // if (this.Article31Params.selectedObject === null && this.DealTypeCode !== 1 && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8 || this.DealMethodParams.selectedObject === 4 || this.DealMethodParams.selectedObject === 9)) {
        //   this.ShowMessageBoxWithOkBtn('با توجه به روش انجام معامله علت ترک تشریفات باید انتخاب شود.');
        //   return;
        // }
        if (ValidateForm) {
          this.ProdReqEstApi.stopEditing();
          this.ProdReqItemApi.stopEditing();
          this.ProdReqRelApi.stopEditing();
          this.ReceiveDocApi.stopEditing();
          this.ContractsignApi.stopEditing();
          // this.ComitionMemberApi.stopEditing();
          const ProductRequestRelationList = [];
          const ProductRequestItemList = [];
          this.ProductRequestObject.Article31ID = this.Article31Params.selectedObject ? this.Article31Params.selectedObject : null;
          // tslint:disable-next-line:max-line-length
          this.ProductRequestObject.ContractTypeCode = this.ContractTypeParams.selectedObject ? this.ContractTypeParams.selectedObject : null;
          this.ProductRequestObject.DealMethodCode = this.DealMethodParams.selectedObject ? this.DealMethodParams.selectedObject : null;
          this.ProductRequestObject.DurationDay = this.DurationDay;
          this.ProductRequestObject.DurationMonth = this.DurationMonth;
          this.ProductRequestObject.DurationYear = this.DurationYear;
          this.ProductRequestObject.IsPact = 1;
          this.ProductRequestObject.PriceListPatternID = this.PriceListPatternID;
          this.ProductRequestObject.IsBalancing = this.IsBalancing;
          this.ProductRequestObject.IsMaterialsDifference = this.IsMaterialsDifference;
          this.ProductRequestObject.SeasonCode = this.SeasonListParams.selectedObject ? this.SeasonListParams.selectedObject : null;
          // tslint:disable-next-line: max-line-length
          this.ProductRequestObject.ConsultantSelectTypeCode = this.ConsultantSelectTypeParams.selectedObject ? this.ConsultantSelectTypeParams.selectedObject : null; // RFC 51021
          this.ProductRequestObject.ConsultantSelectedWayCode = this.ConsultantSelectedWayParams.selectedObject ? this.ConsultantSelectedWayParams.selectedObject : null;
          this.ProductRequestObject.IsTaxValue = this.PRIsTaxValue;

          this.ProdReqEstApi.forEachNode(node => {
            DataList.push(node.data);
          });
          this.ProdReqItemApi.forEachNode(node => {
            if (node.data.ProductRequestItemID === this.beforeID) {
              node.data.ProductRequestEstimateList = DataList;
            }
          });
          const ProdReqItemList = [];
          this.ProdReqItemApi.forEachNode(node => {
            let ItemNo = 0;
            node.data.ProductRequestEstimateDataList = [];
            if (node.data.ProductRequestEstimateList != null) {
              node.data.ProductRequestEstimateList.forEach(item => {
                var keys = Object.keys(item);
                const EntityTypeItemIDList = [];
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
                const EstimateObj = {
                  ProductRequestEstimateID: item.ProductRequestEstimateID ? item.ProductRequestEstimateID : -1,
                  ProductRequestItemID: node.data.ProductRequestItemID,
                  ItemNo: ++ItemNo,
                  PriceListPatternID: item.PriceListPatternID,
                  Qty: item.Qty,
                  Amount: item.Amount,
                  EntityTypeItemIDList: EntityTypeItemIDList,
                };
                node.data.ProductRequestEstimateDataList.push(EstimateObj);
              });
            }
            ProdReqItemList.push(node.data);
          });
          this.ProdReqRelApi.forEachNode(node => {
            if (!node.data.ContractRelationTypeCode || node.data.ContractRelationTypeCode === null || node.data.ContractRelationTypeCode < 1) {
              this.ShowMessageBoxWithOkBtn(' در تب قرارداد های مرتبط نوع ارتباط را انتخاب نمایید');
              return;
            }
            const ProdReqRelationObj = {
              ProductRequestRelationID: node.data.ProductRequestRelationID ? node.data.ProductRequestRelationID : -1,
              // tslint:disable-next-line:max-line-length
              RelatedContractID: node.data.Subject.ContractId ? node.data.Subject.ContractId : (node.data.RelatedContractID ? node.data.RelatedContractID : null),
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


          this.RequestSupplierApi.forEachNode(node => {
            const RequestSupplierObj = {
              RequestSupplierID: node.data.RequestSupplierID ? node.data.RequestSupplierID : -1,
              CostFactorID: this.ProductRequestObject.CostFactorID,
              ActorID: node.data.ActorID,
              CorporateTypeCode: node.data.CorporateTypeCode
            };
            RSupplierList.push(RequestSupplierObj);
          });

          let WinnerProposalAmount = 0;
          if (this.ProductRequestObject.WinnerProposalObject && this.ProductRequestObject.WinnerProposalObject.ProposalID > 0) {

            this.ProductRequestObject.WinnerProposalObject.ProposalItemList.forEach((node) => {
              if (node.FinalAmount) {
                WinnerProposalAmount = WinnerProposalAmount + parseFloat(node.FinalAmount);
              }
            });
          }

          const ContractObj = {
            ContractId: this.ContractObject ? this.ContractObject.ContractId : -1,
            CostFactorId: -1,
            ProductRequestID: this.ProductRequestObject.CostFactorID,
            RegionCode: this.ProductRequestObject.RegionCode,
            FinYearCode: this.FinYearParams.selectedObject ? this.FinYearParams.selectedObject : -1,
            FromContractDate: this.StartDate,
            ToContractDate: this.EndDate,
            ContractTypeCode: this.ContractTypeParams.selectedObject,
            ContractSatusCode: this.ContractStatusParams.selectedObject,
            StartTypeCode: this.StartType,
            EstimationDay: this.DurationDay,
            EstimationMonth: this.DurationMonth,
            EstimationYear: this.DurationYear,
            SubCostCenterId: this.ProductRequestObject.ContractStackHolderID,
            IsFindCost: this.AmountType,
            IsTaxValue: this.IsTaxValue,
            IsSecret: this.IsSecret,
            ActualStartDate: this.WorkStartDate,
            WarrantyDate: this.WarrantyDate,
            ContractorId: -1,
            Subject: this.Contractsubject,
            // tslint:disable-next-line: max-line-length
            ContractAmount: this.ProductRequestObject.WinnerProposalObject && this.ProductRequestObject.WinnerProposalObject.ProposalID > 0 ?
              WinnerProposalAmount :
              // tslint:disable-next-line: radix
              parseInt(this.SumFinalAmount.toString().replace(/,/g, '')),
            LetterNo: this.LetterNo,
            LetterDate: this.LetterDate,
            ActLocationId: this.ActLocationParams.selectedObject
          };
          if (!this.IsUseProviders && this.NgSelectContractorParams.selectedObject) {
            ContractObj.ContractorId = this.NgSelectContractorParams.selectedObject;
          }
          let Contractor;
          if (this.IsUseProviders && this.NgSelectContractorParams.selectedObject) {
            Contractor = this.ContractorItems.filter(x => x.ActorID === this.NgSelectContractorParams.selectedObject)[0];
          }
          const ContractSignList = [];
          // const CommiitionMemberList = [];
          this.ContractsignApi.forEachNode(node => {
            if (node.data.IsSelected) { // 50655
              const ContractSignObj = {
                ContractSignID: node.data.ContractSignID ? node.data.ContractSignID : -1,
                ContractID: -1,
                ActorID: node.data.ActorName.ActorID ? node.data.ActorName.ActorID : (node.data.ActorID ? node.data.ActorID : null)
              };
              ContractSignList.push(ContractSignObj);
            }
          });

          const ReceiveDocList = [];
          this.ReceiveDocApi.forEachNode(node => {
            const ReceiveDocObj = {
              ReceiveDocID: node.data.ReceiveDocID ? node.data.ReceiveDocID : -1,
              CostFactorID: -1,
              // tslint:disable-next-line:max-line-length
              ReceiveDocTypeCode: node.data.ReceiveDocTypeName.ReceiveDocTypeCode ? node.data.ReceiveDocTypeName.ReceiveDocTypeCode : (node.data.ReceiveDocTypeCode ? node.data.ReceiveDocTypeCode : null),
              // tslint:disable-next-line:max-line-length
              ReferenceDate: node.data.PersianReferenceDate && node.data.PersianReferenceDate.MDate ? node.data.PersianReferenceDate.MDate : (node.data.ShortReferenceDate ? node.data.ShortReferenceDate : null),
              ReferenceNo: node.data.ReferenceNo ? node.data.ReferenceNo : null,
              ReceiveDocAmount: node.data.ReceiveDocAmount,
              Note: node.data.Note,
              IsWarranty: 1
            };
            ReceiveDocList.push(ReceiveDocObj);
          });
          const ContractOrderObj = {
            ContractOrderID: -1,
            CostCostFactorID: -1,
            OrderNo: -1,
            OrderDate: this.ProductRequestObject.ShortProductRequestDate,
            Note: this.ProductRequestObject.Subject,
            ProductRequestID: this.ProductRequestObject.CostFactorID,
            ContractOrderItemDataList: [],
          };
          this.ProductRequestObject.ProductRequestItemList.forEach(node => {
            const ContractOrderItemObj = {
              ContractOrderItemID: -1,
              ContractOrderID: -1,
              ItemNo: node.ItemNo,
              Qty: node.QTY,
              Note: node.Subject,
              Amount: node.QTY && (node.QTY !== 0 && node.QTY !== '0') ? node.Amount * node.QTY : node.Amount,
              ProductID: node.ProductID,
              StartDate: node.ShortStartDate,
              EndDate: node.ShortEndDate
            };
            ContractOrderObj.ContractOrderItemDataList.push(ContractOrderItemObj);
          });
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
              if (node.data.RequestPersonEstimateList !== null) {
                node.data.RequestPersonEstimateList.forEach(item => {
                  const RequestPersonEstimateObj = {
                    RequestPersonEstimateID: item.RequestPersonEstimateID ? item.RequestPersonEstimateID : -1,
                    ProductRequestItemID: node.data.ProductRequestItemID,
                    ItemNo: ++ItemNo,
                    // tslint:disable-next-line:max-line-length
                    BusinessPatternID: item.BusinessPatternName.BusinessPatternID ? item.BusinessPatternName.BusinessPatternID : (item.BusinessPatternID ? item.BusinessPatternID : null),
                    EducationYear: item.EducationYear,
                    ExperienceYear: item.ExperienceYear,
                    ManagementCOEF: item.ManagementCOEF,
                    TopGraduated: item.TopGraduated,
                    Qty: item.Qty,
                    Amount: item.Amount,
                  };
                  node.data.RequestPersonEstimateDataList.push(RequestPersonEstimateObj);
                });
              }
              // tslint:disable-next-line:max-line-length
              this.HaveEstimateTab ? ProdReqItemList.filter(x => x.ProductRequestItemID === node.data.ProductRequestItemID)[0].RequestPersonEstimateDataList = node.data.RequestPersonEstimateDataList : ProdReqItemList.push(node.data);
            });
          }

          if (this.IsArticle31Selected && (this.DealMethodParams.selectedObject === 7 || this.DealMethodParams.selectedObject === 8)
            && (this.DealTypeCode === 3 || this.DealTypeCode === 4) && this.Article31Params.selectedObject === 722
            // tslint:disable-next-line: max-line-length
            && (CorporateTypeCode == null || isUndefined(CorporateTypeCode) || CorporateTypeCode === 5)) {
            // tslint:disable-next-line: max-line-length
            this.ShowMessageBoxWithOkBtn(' طرف قرارداد باید از نوع حقوقی باشد. و با توجه به حد معامله و روش انجام، انتخاب از سایر اشخاص حقوقی نیز وجود ندارد.');
            return;
          }
          // tslint:disable-next-line: max-line-length
          // if ((this.DealTypeCode === 4 || this.DealTypeCode === 7) && this.NgSelectContractorParams.selectedObject === null) { // درخواست شده
          //   this.ShowMessageBoxWithOkBtn('با توجه به روش انجام معامله طرف قراداد باید انتخاب شود.');
          //   return;
          // }
          // tslint:disable-next-line: max-line-length
          const ContractpersonList = [];
          this.gridApi.forEachNode((item) => {
            const obj = {
              ContractPersonID: item.data.ContractPersonID ? item.data.ContractPersonID : -1,
              ActorID: item.data.ActorID,
              RoleID: item.data.RoleID,
              ContractOrderItemID: null
            };
            ContractpersonList.push(obj);
          });

          this.ProductRequestObject.ProductRequestDate = this.CommonService.ConvertToASPDateTime(this.ProductRequestObject.ProductRequestDate);
          if (this.ProductRequestObject.IsCost === true) {
            this.ProductRequest.UpdateProductRequestContract(this.ProductRequestObject,
              ProdReqItemList,
              RSupplierList,
              ProductRequestRelationList,
              ContractObj,
              ContractSignList,
              ReceiveDocList,
              ContractOrderObj,
              Contractor,
              this.ModuleCode,
              this.CostFactorLetter ? this.CostFactorLetter : null,
              this.SelectedDocument ? this.SelectedDocument : null,
              this.PopupParam.OrginalModuleCode,
              ContractpersonList
            )
              .subscribe(
                (res: any) => {
                  this.IsValidContract = true;
                  if (res.ContractObject) {
                    this.ContractObject = res.ContractObject;
                    this.ContractCode = res.ContractObject.ContractCode;
                    this.LetterNo = this.ContractObject.LetterNo;
                    this.LetterDate = this.ContractObject.ShortLetterDate;
                  }
                  this.PopupOutPut.emit(res);
                  const LetterTypeCodeList = [];
                  LetterTypeCodeList.push(1);
                  this.LetterParam = {
                    CostFactorID: res.CostFactorID,
                    RegionCode: res.RegionCode,
                    LetterTypeCodeList: LetterTypeCodeList,
                    OrganizationCode: this.ProductRequestObject.OrganizationCode,
                    ReceiveDocID: null,
                    SaveMode: this.IsEditable,
                    ReadOnlyMode: !this.IsEditable
                  };
                  this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(ress => {
                    this.ProductRequestObject = ress;
                    this.ReceiveDocrowsData =
                      this.ProductRequestObject.ContractObject ? this.ProductRequestObject.ContractObject.ContractWarrantyList : null;
                    this.RSupplierList = this.ProductRequestObject.RequestSupplierList;
                  });
                  this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
                },
                err => {
                  if (!err.error.Message.includes('|')) {
                    this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
                    this.IsValidContract = false;
                  }
                }
              );
          } else {
            this.ProductRequest.UpdateInComeProductRequestContract(this.ProductRequestObject,
              ProdReqItemList,
              RSupplierList,
              ProductRequestRelationList,
              ContractObj,
              ContractSignList,
              ReceiveDocList,
              ContractOrderObj,
              Contractor,
              this.ModuleCode,
              this.CostFactorLetter ? this.CostFactorLetter : null,
              this.SelectedDocument ? this.SelectedDocument : null,
              this.PopupParam.OrginalModuleCode,
              this.PopupParam.ModuleViewTypeCode
            )
              .subscribe(
                (res: any) => {
                  this.IsValidContract = true;
                  if (res.ContractObject) {
                    this.ContractObject = res.ContractObject;
                    this.ContractCode = res.ContractObject.ContractCode;
                  }
                  this.PopupOutPut.emit(res);
                  const LetterTypeCodeList = [];
                  LetterTypeCodeList.push(1);
                  this.LetterParam = {
                    CostFactorID: res.CostFactorID,
                    RegionCode: res.RegionCode,
                    LetterTypeCodeList: LetterTypeCodeList,
                    OrganizationCode: this.ProductRequestObject.OrganizationCode,
                    ReceiveDocID: null,
                    SaveMode: this.IsEditable,
                    ReadOnlyMode: !this.IsEditable
                  };

                  this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(ress => {
                    this.ProductRequestObject = ress;
                    this.ReceiveDocrowsData =
                      this.ProductRequestObject.ContractObject ? this.ProductRequestObject.ContractObject.ContractWarrantyList : null;
                    this.RSupplierList = this.ProductRequestObject.RequestSupplierList;
                  });
                  this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
                },
                err => {
                  if (!err.error.Message.includes('|')) {
                    this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
                    this.IsValidContract = false;
                  }
                }
              );
          }
        } else {
          this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فيلد هاي مشخص شده را تکميل فرماييد');
        }
      });

    }
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
  MessageBoxAction(ActionResult) {
    this.isClicked = false;
    this.PopUpType = '';

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'NO') {
      this.IsNotFound = false;
    }
    this.BtnClickedName = '';
  }

  AddPopUpBtnClick(element) {
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
  }
  loadFromExcel(data) {
    const VerifiedData: Array<any> = [];
    const PriceListCorrectionList: Array<any> = [];
    const priceListIDs = [];
    data.forEach((item) => {
      if (VerifiedData.findIndex(i => i.PriceListNo === item.PriceListNo) === -1) {
        VerifiedData.push(item);
      }
    });
    VerifiedData.forEach((x: any) => {
      if (!x.PriceListName) {
        x.PriceListName = '';
      }
      if (x.PriceListNo !== undefined) {
        priceListIDs.push(x.PriceListNo);
      }
    });
    this.PriceList.GetPriceListTopicList(priceListIDs, this.PriceListTypeParams.selectedObject +
      this.PriceListTopicParams.selectedObject, null, null)
      .subscribe(res => {
        (res as any[]).forEach(item => {
          VerifiedData.filter(x => x.PriceListNo === item.PriceListTopicCode).forEach(i => {
            const ExcelName = i.PriceListName.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
            const DbName = item.PriceListTopicName.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
            if (ExcelName !== DbName && (item.IsStar === '*')) {
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
              i.IsWorkCodeParam = item.IsWorkCode ? { WorkCode: 1, WorkName: 'کارکرد' } : { WorkCode: 0, WorkName: 'پایکار ' };
              i.Qty = i.Qty ? i.Qty : 1;
              i.FinalAmount = i.Qty * item.ProductReuestItemAmount;
              PriceListCorrectionList.push(i);
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
              i.Qty = i.Qty ? i.Qty : 1;
              i.FinalAmount = i.Qty * item.ProductReuestItemAmount;
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
  PlcOutPutOperation(event) {
    if (event.data) {
      const DataToAdd = [];
      event.data.forEach(r => {
        DataToAdd.push(r);
      });
      this.ProdReqEstApi.updateRowData({ add: DataToAdd });
      this.RefreshItemNo();
    }
  }
  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.ProdReqEstApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
  }
  getOutPutParam(event) {
    if (this.PopUpType === 'price-list-topic-dataentry-page') {
      this.AddPopUpBtnClick(event);
      return;
    }

    if (this.PopUpType === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }
    if (this.PopUpType === 'editor-select-price-list') {
      this.SetPriceListTopicList(event);
      return;
    }
    if (this.PopUpType === 'price-list-correction') {
      this.PlcOutPutOperation(event);
      return;
    }
    if (this.PopUpType === 'product-request-coef') {
      this.ProductRequestObject = event;
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
        LetterTypeCode: 1,
        OrganizationCode: this.ProductRequestObject.OrganizationCode,
        RegionCode: this.ProductRequestObject.RegionCode
      };
    }
    if (this.PopUpType === 'product-request-item-coef') { // RFC 61094-Item 1
      this.ProductRequestObject.CoefLevelCode = event;
    }
    if (this.PopUpType === 'proxy-contract-list') {
      let ProdReqRelGridData = [];
      let ProdReqRelrow;
      this.ProdReqRelApi.forEachNode(node => {
        ProdReqRelGridData.push(node.data);
      })
      ProdReqRelrow = {
        FinYearCode: event.data.FinYearCode,
        Subject: event.data.Subject,
        LetterNo: event.data.LetterNo,
        ContractCode: event.data.ContractCode,
        ContractorFullName: event.data.ContractorName,
        CostFactorID: event.data.CostFactorID,
        ContractAmountStr: event.data.ContractAmount,
        Note: event.data.Note,
        PersianFromContractDateString: event.data.FromContractDatePersian,
        Validate: true,
        RelatedContractID: event.data.PRRelatedContractID
      }
      ProdReqRelGridData.push(ProdReqRelrow);
      this.ProdReqRelList = ProdReqRelGridData;
      this.ProdReqRelApi.updateRowData({ add: ProdReqRelGridData });
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
            SumFinalAmount = SumFinalAmount + element.FinalAmount;
          });
          this.PopupParam.SumFinalAmount = SumFinalAmount;
          if (!isUndefined(this.CheckRegionWritable)) {
            this.PopupParam.CheckRegionWritable = this.CheckRegionWritable;
          }
          if (this.PriceListPatternID) {
            this.PopupParam.PriceListPatternID = this.PriceListPatternID;
          }
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
    this.MinHeightPixel = null;
    this.MainMinwidthPixel = null;

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
                FinalAmount: 1 * element.Amount
              };
              itemsToUpdate.push(newItem);
            });
            this.ProdReqEstApi.updateRowData({ add: itemsToUpdate });
          }
        }
      );
  }
  // FetchMoreSupplerPerson(event) {
  //   event.Owner.RequestSupplierColDef[1].cellEditorParams.Params.loading = true;
  //   const ResultList = [];
  //   const promise = new Promise((resolve, reject) => {
  //     event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
  //       event.CurrentItems.forEach(el => {
  //         ResultList.push(el);
  //       });
  //       res.List.forEach(element => {
  //         ResultList.push(element);
  //       });
  //       resolve(res.TotalItemCount);
  //     });
  //   }).then((TotalItemCount: number) => {
  //     event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
  //       List: ResultList,
  //       term: event.term,
  //       TotalItemCount: TotalItemCount,
  //       PageCount: Math.ceil(TotalItemCount / 30)
  //     });
  //     // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
  //   });
  // }
  // FetchSupplerPersonByTerm(event) {
  //   event.Owner.RequestSupplierColDef[1].cellEditorParams.Params.loading = true;
  //   event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
  //     event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
  //       List: res.List,
  //       term: event.term,
  //       TotalItemCount: res.TotalItemCount,
  //       PageCount: Math.ceil(res.TotalItemCount / 30)
  //     });
  //   });
  // }

  onSupplercellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Actor.GetAllPersonsPaging(1, 30, '', null, event.data.ActorId).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
    }
  }

  onChangeContractType(TypeCode) {
    this.CoulumnsDefinition(TypeCode);
    if (TypeCode === 2 || TypeCode === 26 || TypeCode === 27 || TypeCode === 28 || TypeCode === 29) { // RFC 51021
      this.IsConsultant = true;
    } else {
      this.IsConsultant = false;
      this.ConsultantSelectTypeParams.selectedObject = null;
      this.ConsultantSelectedWayParams.selectedObject = null;
    }
  }

  CoulumnsDefinition(ContractTypeCode) {
    if (!ContractTypeCode || ContractTypeCode === 26 || ContractTypeCode === 29) {
      this.IsShowTwoGrid = true;
      this.GWidth = 200;
      this.GMaxWidth = 1000;
    }

    if (ContractTypeCode && (ContractTypeCode === 27 || ContractTypeCode === 28)) {
      this.IsShowTwoGrid = false;
      this.GWidth = 1190;
      this.GMaxWidth = 1190;
    }
  }

  onReceiveDocArchiveClick() {
    if (!this.SelectedReceiveDocID || isUndefined(this.SelectedReceiveDocID)) {
      this.ShowMessageBoxWithOkBtn('ابتدا اطلاعات را ذخیره و سپس اقدام به بارکذاری نمایید.');
      return;
    }

    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.ArchiveParam = {
      EntityID: this.SelectedReceiveDocID,
      TypeCodeStr: '11-',
      DocTypeCode: 11,
      ModuleCode: this.ModuleCode,
      RegionCode: this.ProductRequestObject.RegionCode,
    };
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

  rdoAmountClick(Type) {
    this.AmountType = Type;

  }

  onCostCenterChange(ACostCenterID) {
    if (ACostCenterID) {
      this.ProductRequest.GetSubCostCenter(ACostCenterID, null, true).subscribe(Res => {
        this.SubCostCenterItems = Res;
      });
    } else {
      this.SubCostCenterItems = [];
    }
  }

  OnWorkStartDateChange(ADate) {
    this.WorkStartDate = ADate.MDate;

  }

  OnWarrantyDateChange(ADate) {
    this.WarrantyDate = ADate.MDate;

  }
  rdoStartTypeClick(Type) {
    this.StartType = Type;
  }

  FetchMoreContractSignPerson(event) {
    event.Owner.ContractsignColDef[2].cellEditorParams.Params.loading = true; // RFC 50671
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetAllPersonsPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, null, event.Owner.ProductRequestObject.RegionCode).subscribe(res => {
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
        type: 'ContractSign'
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchContractSignPersonByTerm(event) {
    event.Owner.ContractsignColDef[2].cellEditorParams.Params.loading = true; // RFC 50671
    // tslint:disable-next-line: max-line-length
    event.Owner.Actor.GetAllPersonsPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, null, event.Owner.ProductRequestObject.RegionCode).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractSign'
        });
      });
  }

  onContractSigncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Actor.GetAllPersonsPaging(1, 30, '', null, event.data.ActorID, this.ProductRequestObject.RegionCode).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractSign'
        });
      });
    }
  }
  OnChSecretChange(event) {
    this.IsSecret = event;
  }

  OnChTaxvalueChange(event) {
    this.IsTaxValue = event;

  }
  onCellValueChanged(event, type) {
    const itemsToUpdate = [];
    switch (type) {
      // case 'related-contract':
      //   if (event.newValue && event.newValue.ContractId) {
      //     this.ProdReqRelApi.forEachNode(node => {
      //       if (node.rowIndex === event.rowIndex) {
      //         node.data.RelatedContractID = event.newValue.ContractId;
      //         itemsToUpdate.push(node.data);
      //       }
      //     });
      //     this.ProdReqRelApi.updateRowData({ update: itemsToUpdate });
      //   }
      //   break;
      // case 'Comition-Member':
      //   const items = [];
      //   if (event.newValue && event.columnDefPriceList &&
      //     event.columnDefPriceList.field === 'IsCheck') {
      //     this.ComitionMemberApi.forEachNode(node => {
      //       if (node.rowIndex === event.rowIndex) {
      //         node.data.IsCheck = event.newValue;
      //         itemsToUpdate.push(node.data);
      //       }
      //     });
      //     this.ComitionMemberApi.updateRowData({ update: itemsToUpdate });
      //   }
      //   if (event.colDef && event.colDef.field === 'ActorName') {
      //     if (event.newValue && event.newValue.ActorId) {
      //       // tslint:disable-next-line:no-shadowed-variable
      //       const itemsToUpdate = [];
      //       this.ComitionMemberApi.forEachNode(node => {
      //         if (node.rowIndex === event.rowIndex) {
      //           node.data.ActorID = event.newValue.ActorId;
      //           itemsToUpdate.push(node.data);
      //         }
      //       });
      //       this.ComitionMemberApi.updateRowData({ update: itemsToUpdate });
      //     }
      //   }
      //   break;
      case 'contract-sign':
        if (event.newValue && event.newValue.ActorId) {
          this.ContractsignApi.forEachNode(node => {
            if (node.rowIndex === event.rowIndex) {
              node.data.ActorID = event.newValue.ActorId;
              itemsToUpdate.push(node.data);
            }
          });
          this.ContractsignApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      default:
        break;
    }
  }
  onGridReadyRequestContractsign(params: { api: any; }) {
    this.ContractsignApi = params.api;
  }

  onGridReadyComitionMember(params: { api: any; }) {
    this.ComitionMemberApi = params.api;
  }
  onGridReadyReceiveDoc(params: { api: any; }) {
    this.ReceiveDocApi = params.api;
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
    //  this.NgSelectContractorParams.loading = true;
    // tslint:disable-next-line: max-line-length
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false, this.NgSelectContractorParams.selectedObject,
      null, null, false, null, false, true, this.ModuleCode).subscribe(res => {
        res.List.forEach(el => {
          el.IdentityNo = el.IdentityNo === null ? el.ParentIdentityNo : el.IdentityNo;
        });
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

  onReceiveDocRowClick(event) {
    this.SelectedReceiveDocID = event.data.ReceiveDocID;
    if (event.data.ReceiveDocID) {
      this.ReceiveDocEnable = false;
      this.SetLetterDetails();
    } else {
      this.ReceiveDocEnable = true;
    }
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

  OnLetterDateChange(ADate) {
    this.LetterDate = ADate.MDate;
  }

  BtnArchiveClick() {
    let DealMethodCode = -1;
    let DealTypeCode = -1;
    let ContractTypeCode = -1;
    let RegionCode = -1;
    let FinYearCode = -1;
    let Article31ID = -1;
    let Amount = 0;
    if (this.ProductRequestObject) {
      DealMethodCode = this.ProductRequestObject.DealMethodCode;
      // DealMethodCode = this.DealMethodParams.selectedObject ? this.DealMethodParams.selectedObject : -1;
      DealTypeCode = this.ProductRequestObject.DealTypeCode;
      // ContractTypeCode = this.ContractTypeParams.selectedObject;
      ContractTypeCode = this.ProductRequestObject.ContractTypeCode;
      RegionCode = this.ProductRequestObject.RegionCode;
      Article31ID = this.ProductRequestObject.Article31ID;
    }
    if (this.ContractObject) {
      FinYearCode = this.ContractObject.FinYearCode;
    }

    this.ProductRequestObject.ProductRequestItemList.forEach(element => {
      Amount += element.FinalAmount;
    });
    // this.ProductRequest.GetProductRequestDealType(this.ProductRequestObject.RegionCode,
    //   this.ProductRequestObject.ShortProductRequestDate,
    //   Amount
    // ).subscribe(res => {
    this.ProductRequest.GetDocTypeMadatory(DealMethodCode ? DealMethodCode : -1,
      this.ProductRequestObject.DealTypeCode,
      ContractTypeCode ? ContractTypeCode : -1,
      RegionCode,
      FinYearCode,
      Article31ID)

      .subscribe(
        ress => {
          this.ShowArchiveDialog(ress);
        }
      );
    // });
  }
  ShowArchiveDialog(MandatoryDocTypeList) {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    const archiveParam = {
      EntityID: this.ProductRequestObject ? this.ProductRequestObject.CostFactorID : -1,
      TypeCodeStr: this.ModuleCode === 2739 ? '10-' : '60-',  // 10 = قرارداد بدون گردش  /
      DocTypeCode: this.ModuleCode === 2739 ? 10 : 60,        // 60 = درخواست معامله ملکي
      ModuleCode: this.ModuleCode,
      HasCheck: true,
      MandatoryDocTypeList: MandatoryDocTypeList,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      CostFactorID: this.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      IsReadOnly: (this.ModuleCode === 2739 && this.ModuleViewTypeCode === 500000) ? true : false
    };
    this.ArchiveParam = archiveParam;


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
    };
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
  PRProvisionRepShow() {
    this.Report.PRProvisionRep(this.ProductRequestObject.RegionCode, this.ProductRequestObject.CostFactorID,
      this.ModuleCode,
      'پيشنهاد تامين اعتبار');
  }

  OnRegiserLetterDateChange(ADate) {
    this.RegisterLetterDate = ADate.MDate;
  }

  onAutomationClick() {
    if (this.SelectedReceiveDocID) {
      const LetterTypeCodeList = [];
      LetterTypeCodeList.push(14);
      this.isClicked = true;
      this.PopUpType = 'app-automation';
      this.HaveHeader = true;
      this.startLeftPosition = 144;
      this.startTopPosition = 5;
      this.MinHeightPixel = 300;
      this.PopupParam = {
        CostFactorID: this.ProductRequestObject.CostFactorID,
        RegionCode: this.ProductRequestObject.RegionCode,
        LetterTypeCodeList: LetterTypeCodeList,
        OrganizationCode: this.ProductRequestObject.OrganizationCode,
        AutoClose: true,
        ReceiveDocID: this.SelectedReceiveDocID
      };
    }
  }

  onDeleteLetterClick() {
    const CostFactorLetter = {
      CostFactorID: this.ProductRequestObject.CostFactorID,
      LetterTypeCode: 2,
      OrganizationCode: this.ProductRequestObject.OrganizationCode,
      RegionCode: this.ProductRequestObject.RegionCode,
      ReceiveDocID: this.SelectedReceiveDocID
    };
    this.Automation.DeleteLetter(CostFactorLetter).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف نامه با موفقيت انجام شد');
    },
      err => {
        this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
      });
  }

  onShowLetterClick() {
    if (this.SelectedReceiveDocID) {
      const CostFactorLetter = {
        CostFactorID: this.ProductRequestObject.CostFactorID,
        LetterTypeCode: 2,
        OrganizationCode: this.ProductRequestObject.OrganizationCode,
        RegionCode: this.ProductRequestObject.RegionCode,
        ReceiveDocID: this.SelectedReceiveDocID
      };
      this.Automation.ShowLetter(CostFactorLetter);
    }
  }

  onCreateNewLetter() {
    this.isClicked = true;
    this.PopUpType = 'send-letter-page';
    this.HaveHeader = true;
    this.startLeftPosition = 500;
    this.startTopPosition = 80;
    this.MinHeightPixel = 300;
    this.PopupParam = {
      CostFactorID: this.ProductRequestObject.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      LetterTypeCode: 14,
      OrganizationCode: this.ProductRequestObject.OrganizationCode,
      AutoClose: true,
      ReceiveDocID: this.SelectedReceiveDocID
    };
  }

  SetLetterDetails() {
    if (this.ModuleCode === 2776 && this.SelectedReceiveDocID) {
      // tslint:disable-next-line:max-line-length
      this.Automation.GetAutomationLetter(this.ProductRequestObject.CostFactorID, 14, this.ProductRequestObject.OrganizationCode, this.SelectedReceiveDocID)
        .subscribe(res => {
          this.RegisterLetterDate = res.RegisterLetterDate;
          this.DocumentLetterNo = res.DocumentLetterNo;
          this.RegisterLetterNo = res.RegisterLetterNo;
        });
    }
  }

  onCommitionClick() {
    if (this.ProductRequestObject.DealMethodCode) { // RFC 55630 - هماهنگی با آقای آخوندی و همانندسازی طبق RFC 55215
      switch (this.ProductRequestObject.DealMethodCode) {
        case 1:
        case 2:
          this.VirtualModuleViewTypeCode = 47;
          break;
        case 3:
          this.VirtualModuleViewTypeCode = 113;
          break;
        case 4:
        case 7:
          this.VirtualModuleViewTypeCode = 11;
          break;
        case 5:
          this.VirtualModuleViewTypeCode = 68;
          break;
        case 6:
          this.VirtualModuleViewTypeCode = 107;
          break;
        default:
          break;
      }

      this.PopUpType = 'app-commition';
      this.isClicked = true;
      this.HaveHeader = true;
      this.startLeftPosition = 9;
      this.startTopPosition = 5;
      this.MainMinwidthPixel = 1340;
      this.HaveMaxBtn = false;
      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        IsReadOnly: this.IsOverReadOnly,
        HeaderName: 'کمیسیون',
        ModuleViewTypeCode: this.IsOverReadOnly ? 500000 : this.VirtualModuleViewTypeCode,
        CheckRegionWritable: false,
        ModuleCode: this.ModuleCode,
        // currentRegionObject: this.currentRegionObject,
        IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
        OrginalModuleCode: this.PopupParam.OrginalModuleCode
      };
    } else {
      this.ShowMessageBoxWithOkBtn('روش انجام معامله مشخص نشده است.');
    }
  }

  onProposalClick() {
    this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(res => {
      this.ProductRequestObject = res;
      const LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ?
        this.ProductRequestObject.LastInquiryObject : null;
      if (!LastInquiryObject || (LastInquiryObject && !LastInquiryObject.IsWin && !LastInquiryObject.IsReturn)) {
        if (this.IsOverReadOnly) {
          this.PopUpType = 'general-tender-read-only';
          this.isClicked = true;
          this.HaveHeader = true;
          this.startLeftPosition = 150;
          this.startTopPosition = 4;
          this.HaveMaxBtn = false;
          this.PercentWidth = 84;
          this.MainMaxwidthPixel = 1500;
          this.PopupParam = {
            ProductRequestObject: this.ProductRequestObject,
            Subject: this.ProductRequestObject.Subject,
            RegionCode: this.ProductRequestObject.RegionCode,
            ProductRequestCode: this.ProductRequestObject.ProductRequestCode,
            ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
            CostFactorID: this.ProductRequestObject.CostFactorID,
            InquiryObject: LastInquiryObject,
            IsReadOnly: true,
            HeaderName: 'لیست متقاضیان',
            ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
            PRRegionObject: this.PopupParam.PRRegionObject,
            SumFinalAmount: this.PopupParam.SumFinalAmount,
            CurrWorkFlow: this.PopupParam.CurrWorkFlow,
            IsAdmin: this.PopupParam.IsAdmin
          };
        } else {
          this.PopUpType = 'general-tender';
          this.isClicked = true;
          this.HaveHeader = true;
          this.startLeftPosition = 150;
          this.startTopPosition = 4;
          this.HaveMaxBtn = false;
          this.PercentWidth = 80;
          this.MainMaxwidthPixel = 1500;
          this.PopupParam = {
            ProductRequestObject: this.ProductRequestObject,
            ModuleViewTypeCode: 200000,
            InquiryObject: LastInquiryObject,
            SumFinalAmount: 0,
            IsReadOnly: false,
            CheckRegionWritable: false,
            OrginalModuleCode: this.PopupParam.OrginalModuleCode,
            ModuleCode: this.ModuleCode
          };
        }
      } else {
        this.ShowMessageBoxWithOkBtn('مناقصه یا مزایده مورد نظر تعیین تکلبف شده است .');
      }

    });
  }
  rdoIsMaterialsDifferenceClick(IsMaterialsDifference) {
    this.IsMaterialsDifference = IsMaterialsDifference;
  }
  onContractOrderItemCoefClick() {
    if (!this.selectedPRItemRow.ProductRequestItemID) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
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
      ModuleViewTypeCode: this.IsOverReadOnly ? 500000 : this.ModuleViewTypeCode
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
      ModuleViewTypeCode: this.IsOverReadOnly ? 500000 : this.PopupParam.ModuleViewTypeCode,
      ProductRequestItemID: this.SelectedProductRequestItemID
    };
    this.isClicked = true;
    this.PopUpType = 'product-request-coef';
    this.startLeftPosition = 110;
    this.startTopPosition = 60;
  }
  ProdReqItemGridready(params: { api: any; }) {
    this.ProdReqItemApi = params.api;
  }
  onProdReqItemRowClick(event) {
    this.selectedPRItemRow = event.data;
    this.ProductName = event.data.ProductName;
    this.ProductCode = event.data.ProductCode;
    this.Amount = event.data.Amount;
    this.SelectedProductRequestItemID = event.data.ProductRequestItemID;
    if (this.PopupParam.ModuleViewTypeCode !== 500000
      && !(this.PopupParam.ModuleCode === 2901 && this.PopupParam.ModuleViewTypeCode === 2)) {
      this.IsEstimateEditable = true;
    }

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

  btnClick(InputValue: any) {
    this.isClicked = true;
    switch (InputValue) {
      case 'app-excel-load-data':
        if (!this.PriceListTypeParams.selectedObject ||
          !this.PriceListTopicParams.selectedObject) {
          this.ShowMessageBoxWithOkBtn('ابتدا سال مبنا و نوع فهرست بها را مشخص نمایید.');
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
          this.PopupParam = {
            HeaderName: 'ردیف مرتبط',
            RowSelected: this.selectedEstimateRow.data,
            ModuleCode: this.ModuleCode,
            Mode: 'ProductRequestEstimateMode',
          };
        }
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
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          IsReadOnly: this.IsOverReadOnly,
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
          ModuleCode: this.ModuleCode,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          IsReadOnly: this.IsOverReadOnly,
        };
        this.ArchiveParam = archiveEstimateParam;
      }
        break;

    }
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
  onProdReqEstGridReady(params: { api: any; }) {
    this.ProdReqEstApi = params.api;
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
      if (PriceListNovalue != null && PriceListNovalue !== '') {
        Values.push(PriceListNovalue);
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
                  node.data.Qty = '';
                  node.data.FinalAmount = node.data.Qty * node.data.Amount;
                  itemsToUpdate.push(node.data);
                }
              });
              this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
              // tslint:disable-next-line:max-line-length
            } else {
              this.ShowMessageBoxWithYesNoBtn(' ردیف وارد شده موجود نیست. آیا مایل به افزودن اطلاعات این ردیف فهرست بها می باشید؟');
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
          node.data.FinalAmount = value * node.data.Amount;
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'FinalAmount') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount && node.data.Amount > 0) {
          node.data.Qty = (value / node.data.Amount).toFixed(2);
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'Amount') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Qty) {
          node.data.FinalAmount = value * node.data.Qty;
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }
  }
  OnFilterChanged() {
    this.SetSumFinalAmount();
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
  onPRItemGridready(params: { api: any; }) {
    this.PRItemApi = params.api;
  }
  onProdReqPersonGridReady(params: { api: any; }) {
    this.ProdReqPersonApi = params.api;
  }
  oncellEstimateEditingStarted(event) {
    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, null, null, this.selectedPRItemRow.ProductRequestItemID)
        .subscribe(res => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });

    }
  }

  EntityColumnDefinition(selectedPRItemRow) {


    // if (selectedPRItemRow.PRIEntityList) {

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

  OnChPRTaxvalueChange(event) {
    this.PRIsTaxValue = event;
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
      !this.IsLawful,
      this.IsYes,
      this.ModuleCode,
      this.PopupParam.OrginalModuleCode
    ).subscribe(res => {
      this.ProductRequestObject.LastInquiryObject.IsReturn = !this.IsLawful;
      this.ShowMessageBoxWithOkBtn('پاسخ سوالات با موفقیت ثبت شد');
    });
  }

  onGridReadyRequestSupplier(params: { api: any; }) {
    this.RequestSupplierApi = params.api;
  }
  onSupplierCellvaluechanged(event) {
    if (event.colDef && event.colDef.field === 'PersonTypeName') {
      if (event.newValue && event.newValue.PersonTypeCode) {
        const itemsToUpdate = [];
        this.RequestSupplierApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.PersonTypeCode = event.newValue.PersonTypeCode;
            node.data.ActorID = null;
            node.data.ActorName = '';
            node.data.ActorName = '';
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
            node.data.ActorName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierApi.updateRowData({ update: itemsToUpdate });
      }
    }
    if (event.colDef && event.colDef.field === 'ActorName') {
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
  onSupplierCellEditingStarted(event) {
    this.RequestSupplierApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.SelectedPersonTypeCode = node.data.PersonTypeCode;
      }
    });
    if (event.colDef && event.colDef.field === 'ActorName') {
      let RegionCode = this.ProductRequestObject.RegionCode;
      if (RegionCode > 210 && RegionCode < 219) {
        RegionCode = 210;
      }
      this.RequestSupplierColDef[2].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', event.data.PersonTypeCode === 1, false, true,
        event.data.ActorID, null, RegionCode, false, this.ProductRequestObject.CostFactorID, true, true).subscribe(res => {
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
  FetchMoreSupplerPerson(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      const ResultList = [];
      const promise = new Promise((resolve, reject) => {
        event.Owner.Actor.GetActorPaging(event.PageNumber,
          event.PageSize,
          event.term,
          event.SearchOption,
          event.Owner.SelectedPersonTypeCode === 1,
          false,
          true,
          null, null, null, false, null, false, true).subscribe(res => {
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
  }
  FetchSupplerPersonByTerm(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        event.Owner.SelectedPersonTypeCode === 1, false, true,
        null, null, null, false, null, false, true).subscribe(res => {
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

  FetchMoreContractPerson(event) {
    event.Owner.adContractPersoncol[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetCustomerActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        false,
        false, false).subscribe(res => {
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
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'ContractPerson'
      });
    });
  }

  FetchContractPersonByTerm(event) {

    this.adContractPersoncol[2].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetCustomerActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      false, false, false).subscribe(res => {
        res.List.forEach(el => {
          el.ActorID = el.ActorId;
        });
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractPerson'
        });
      });
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  onContractPersoncellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'ActorName') {
      this.adContractPersoncol[2].cellEditorParams.Params.loading = true;
      this.Actor.GetCustomerActorPaging(1, 30, '', '', false, false, false).subscribe(res => {
        res.List.forEach(el => {
          el.ActorID = el.ActorId;
        });
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractPerson'
        });
      });
    }
  }

  onSaveProductRequest() {
    let ValidateForm = true;
    ValidateForm =
      ValidateForm &&
      this.DealMethodParams.selectedObject &&
      this.ContractTypeParams.selectedObject;
    if (ValidateForm) {
      this.ProductRequestObject.ContractTypeCode = this.ContractTypeParams.selectedObject ? this.ContractTypeParams.selectedObject : null;
      this.ProductRequestObject.ConsultantSelectTypeCode = this.ConsultantSelectTypeParams.selectedObject ? this.ConsultantSelectTypeParams.selectedObject : null; // RFC 51021
      this.ProductRequestObject.DealMethodCode = this.DealMethodParams.selectedObject ? this.DealMethodParams.selectedObject : null;
      this.ProductRequestObject.ConsultantSelectedWayCode = this.ConsultantSelectedWayParams.selectedObject ? this.ConsultantSelectedWayParams.selectedObject : null;
      this.ProductRequestObject.Article31ID = this.Article31Params.selectedObject ? this.Article31Params.selectedObject : null;
      this.ProductRequestObject.DurationDay = this.DurationDay;
      this.ProductRequestObject.DurationMonth = this.DurationMonth;
      this.ProductRequestObject.DurationYear = this.DurationYear;
      /////
      this.ProductRequestObject.IsPact = 1;
      this.ProductRequestObject.PriceListPatternID = this.PriceListPatternID;
      this.ProductRequestObject.IsBalancing = this.IsBalancing;
      this.ProductRequestObject.IsMaterialsDifference = this.IsMaterialsDifference;
      this.ProductRequestObject.SeasonCode = this.SeasonListParams.selectedObject ? this.SeasonListParams.selectedObject : null;
      this.ProductRequestObject.IsTaxValue = this.PRIsTaxValue;
      /////
      this.ProductRequest.UpdateProductRequestInfo(
        this.ProductRequestObject,
        this.PopupParam.OrginalModuleCode,
        this.ModuleCode
      ).subscribe(
        (res: any) => {
          this.PopupOutPut.emit(res);
          const LetterTypeCodeList = [];
          LetterTypeCodeList.push(1);
          this.LetterParam = {
            CostFactorID: res.CostFactorID,
            RegionCode: res.RegionCode,
            LetterTypeCodeList: LetterTypeCodeList,
            OrganizationCode: this.ProductRequestObject.OrganizationCode,
            ReceiveDocID: null,
            SaveMode: this.IsEditable,
            ReadOnlyMode: !this.IsEditable
          };
          this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
        },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
            this.IsValidContract = false;
          }
        }
      );
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
      OrginalModuleCode: this.PopupParam.OrginalModuleCode ? this.PopupParam.OrginalModuleCode : this.ModuleCode
    };
  }

  onShowContractRelationClick() {
    this.PopUpType = 'show-contract-relation';
    this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 200;
    this.startTopPosition = 20;
    this.HaveMaxBtn = false;
    this.MainMaxwidthPixel = 600;
    this.MinHeightPixel = 600;
    this.PopupParam = {
      CostFactorID: this.ProductRequestObject.ContractObject.CostFactorId,
      IsCost: this.ProductRequestObject.IsCost
    };
  }
}
