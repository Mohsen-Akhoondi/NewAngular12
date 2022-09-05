import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { GridOptions } from 'ag-grid-community';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isNullOrUndefined, isUndefined } from 'util';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { ActivatedRoute } from '@angular/router';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
declare var $: any;

@Component({
  selector: 'app-commition',
  templateUrl: './commition.component.html',
  styleUrls: ['./commition.component.css']
})
export class CommitionComponent implements OnInit {
  @ViewChild('IsReceivedValid') IsReceivedValid: TemplateRef<any>;
  @ViewChild('IsPresentValid') IsPresentValid: TemplateRef<any>;
  @ViewChild('Print') Print: TemplateRef<any>;

  @ViewChild('IsWin') IsWin: TemplateRef<any>;
  @ViewChild('TechnicalStatus') TechnicalStatus: TemplateRef<any>;
  @ViewChild('Lock') Lock: TemplateRef<any>;
  @ViewChild('IsAccept') IsPropsalAccept: TemplateRef<any>;
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestCostClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ProductRequestObjectChange: EventEmitter<any> = new EventEmitter<any>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  HaveDigitalSign: boolean = true;
  OnPrintEvent = false;
  ShowFormulaBtn = false;
  BtnElectronicFilse = 'بازگشایی مهر و موم';
  OnSignPrintEvent = false;
  ExistsFile = false;
  DraftOrFinallType = 0;
  DisplayBtnElectronicFilse = false;
  FirstPrintAction = false;
  SaveNewData = false;
  HaveSign = true;
  HaveShowSign = false;
  BtnSignName = 'بارگذاری صورتجسله کمیسیون';
  DisplayCompletionContractInfo = true;
  SecondPrintAction = false;
  FinalPrintAction = false;
  IsMultiContract: boolean;
  IsMultiYear: boolean;
  HaveMultiContract: boolean;
  CheckRegionWritable;
  ProductRequestNo;
  WfQuestionLabel;
  WFQuestionRes;
  IsWFDisable = false;
  HaveExpertPerson = false;
  HaveSetWinner = true;
  WfWinnerHeight = 166;
  ProductRequestDate;
  UnlockTechnicalArchive = true;
  CostFactorID;
  CostFactorMultiContract;
  selectedObject: any;
  HaveMaxBtn: boolean;
  HaveSave = true; //  RFC 58471
  // WinnerQuestion = 'آیا بند 1 ماده 31 برنده دارد ؟';
  WinnerQuestion = null;
  MultiContractQuestion: any;
  HaveDelete = false;
  HaveUpdate = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ProductRequestObject;
  ProductRequestID: number;
  DealTypeCode;
  CommitionNo;
  CommitionDate;
  Subject;
  startLeftPosition: number;
  startTopPosition: number;
  OverMainMinwidthPixel: number;
  HeightPercentWithMaxBtn: number;
  PercentWidth;
  MinHeightPixel;
  MainMaxwidthPixel;
  PixelWidth: number;
  PixelHeight: number;
  ProductRequestItemID = -1;
  OrdersObject: any;
  InquiryNo: any;
  ParamObj;
  IsEnable = true;
  SelectedProposal: any;
  isClicked: boolean;
  ClickedName: any;
  SelectedAdvertising: any;
  AdvertisingCode: any;
  MainMinwidthPixel: number;
  Result;
  IsYes = true;
  SecurityPermissionNo;
  SecurityPermissionDate;
  CommitionMemberItems;
  CommitionMemberParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
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
  CommitionItems;
  CommitionParams = {
    bindLabelProp: 'CommitionName',
    bindValueProp: 'CommitionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ColDef;
  RowData;
  GridApi: any;
  ChooseContractor;
  CommitionSubject;
  InquiryObject: any;
  OrderCommitionObject;
  FilterDocumentTypeCodeList = [];
  OrderCommitionID;
  DocUploadEnabled = false;
  IsAccept = true;
  HaveWinner = null;
  IsDisable = true;
  IsShowReport = true; // RFC 52811
  ExpertItems;
  AProductRequestPeopleList = [];
  HasWarrantyItem = false;
  CheckValidate = false;
  HaveSecurityDetails: boolean;
  ExpertCoef;
  ExpertAmount;
  IsPriceExtended: boolean;
  AProposalList;
  IsDisplayJobCategory = false;
  IsDisableJobCategory = false;
  IsExpertCoef = true;
  IsType11 = false;
  HasChooseContractor = true;
  IsDisableRaste = false;
  IsDisableRank = false;
  IsDisablerdoIsMaterials = false;
  IsDisablerdoHaveMaterials = false;
  IsDisableIsMultiYear = false;
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (!params.data.HasCapacity) {
        return { 'background-color': '#fc9aa5' };
      }
    }
  };

  IsnotActiveBtnSave = true;
  IsType49 = false;
  WorkDoneQuestionLabel;
  IsAcceptWorkDone = true;
  Contractor;
  IsRegion200 = false;
  HasnotOrder = false;
  IsMaterialsDifference;
  HasMaterialsDifference: boolean;
  BtnPropsalItemName = 'بازگشایی اسناد فنی (پاکت ب)';
  // IsNoOrderCommition = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
  DateFormat = 'YYYY/MM/DD HH:mm:ss';
  ShowMode = 'daytime';
  // DisabledCommitionType;  RFC: 58690 همراه با اوتلوک 2021/01/27
  HasTripleReport = false;
  HasEstimate = false;
  HasWinner = true;
  WfWinnerQuestionLabel;
  EditableColumns = false;
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
    Required: true,
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
    Required: true,
  };
  ShowProposalDetails = false;  // RFC 53953
  HaveMaterials;
  IsException = false;
  IsChabokContractModuleViewType11: boolean;
  IsCompletionContractInfo = false;
  IsSearch = true;
  IsInquriyID = false;
  ContractId;
  OriginModuleCode;
  PriceInNewsPaper;
  IsUrbanGreen = false;
  PrintTypeItems = [
    { PrintTypeName: 'سه نسخه ای', PrintTypeCode: 1 },
    { PrintTypeName: 'تک نسخه ای', PrintTypeCode: 0 }
  ];
  PrintTypeParams = {
    bindLabelProp: 'PrintTypeName',
    bindValueProp: 'PrintTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  IsShowPrintType: boolean;
  IsType113 = false;
  DisplayGBtn = false;
  DigitalSignShow = false;
  IsDeactiveBtns = true;
  IsForcePriceList = false;
  IsReadOnly = false;
  HaveAgent = false;
  AgentParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  AgentItems;
  ShowAgentSaveBtn = false;
  IsAgentDisable = false;
  HasSign = true;
  HasContractorBtn = true;
  HasMultiContract: boolean = true;
  IsGreenSpace = false;
  constructor(private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private Actor: ActorService,
    private RefreshService: RefreshServices,
    private CommonService: CommonServices,
    private PriceList: PriceListService,
    private Report: ReportService,
    private ComonService: CommonService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.OriginModuleCode = +params['ModuleCode'];
    });

    this.RankItems =
      [
        { GradeID: 1 },
        { GradeID: 2 },
        { GradeID: 3 },
        { GradeID: 4 },
        { GradeID: 5 },
      ];
  }
  ActorID;
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    if ((this.ProductRequestObject.RegionCode === 200 && this.PopupParam.ModuleViewTypeCode === 72 && this.PopupParam.ModuleViewTypeCode === 185) ||
      (this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22 &&
        (this.ProductRequestObject.ProductRequestTypeCode === 1 || this.ProductRequestObject.ProductRequestTypeCode === 4))) {
      if (this.ProductRequestObject.IsOnline) {
        this.ColDef = [

          {
            headerName: 'ردیف',
            field: 'ItemNo',
            width: 70,
            resizable: true
          },
          {
            headerName: 'چاپ کارت الکترونیک',
            field: '',
            width: 170,
            resizable: false,
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.Print,
            }
          },
          {
            headerName: 'وضعیت اسناد',
            field: '',
            width: 90,
            sortable: false,
            resizable: false,
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.Lock
            }
          },
          {
            headerName: 'دریافت اسناد',
            field: 'IsReceived',
            width: 100,
            hide:
              this.PopupParam.ModuleViewTypeCode === 11  // RFC 51696
              ||
              this.PopupParam.ModuleViewTypeCode === 155,  // RFC 59119
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsReceivedValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsReceived = params.newValue;
                return true;
              } else {
                params.data.IsReceived = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.PopupParam.ModuleViewTypeCode === 113 // RFC 50917
                || this.PopupParam.ModuleViewTypeCode === 182;
            },
          },
          {
            headerName: 'حضور',
            field: 'IsPresent',
            width: 100,
            hide: this.PopupParam.ModuleViewTypeCode === 72  // RFC 50886
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140, // RFC 65851
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsPresentValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsPresent = params.newValue;
                return true;
              } else {
                params.data.IsPresent = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.EditableColumns;
            },
          },
          {
            headerName: 'وضعیت فنی',
            field: 'TechnicalStatus',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            valueFormatter: function isValidFormer(params) {
              if (params.value) {
                return 'قبول';
              } else {
                return 'رد';
              }
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.TechnicalStatus
            },
          },
          {
            headerName: 'نتیجه نهایی ارزیابی',
            field: 'IsAccept',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
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
              ngTemplate: this.IsPropsalAccept
            },
          },
          {
            headerName: 'برنده',
            field: 'IsWin',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 72 // RFC 50702
              || this.PopupParam.ModuleViewTypeCode === 155,  // RFC 59119 //RFC 65086
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 155) {
                return true;
              } else {
                return this.IsYes;
              }
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
              ngTemplate: this.IsWin
            },
          },
          {
            headerName: 'اولویت برنده',
            field: 'WinnerOrderNo',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode !== 166,  // RFC 59119
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 166 && this.IsWin) {
                return true;
              } else {
                return false;
              }
            },
            HaveThousand: false,
            cellEditorFramework: NumberInputComponentComponent,
            cellEditorParams: { IsFloat: false, MaxLength: 1, FloatMaxLength: 0 },
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
                // tslint:disable-next-line: radix
                params.data.WinnerOrderNo = params.newValue;
              } else {
                params.data.WinnerOrderNo = null;
              }
            },
          },
          {
            headerName: 'کد ملی/شناسه ملی',
            field: 'IdentityNo',
            width: 160,
            resizable: true
          },
          {
            headerName: 'نام شخص',
            field: 'ActorName',
            width: 300,
            resizable: true
          },
          {
            headerName: 'مبلغ پیشنهادی',
            field: 'SumProposalItemPrice',
            HaveThousand: true,
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ پیشنهاد',
            field: 'PersianProposalDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'ظرفیت آزاد تعدادی در رسته',
            field: 'FreeCount',
            width: 155,
            resizable: true
          },
          {
            headerName: 'ظرفیت آزاد ریالی در رسته',
            HaveThousand: true,
            field: 'FreeAmount',
            width: 155,
            resizable: true
          },
          // { // KH - RFC 64016
          //   headerName: 'ظرفیت آزاد تعدادی در کل حوزه تخصص ها',
          //   field: 'TotalRemainedCountCapacity',
          //   width: 250,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت آزاد ریالی در  کل حوزه تخصص ها',
          //   HaveThousand: true,
          //   field: 'TotalRemainedRialCapacity',
          //   width: 250,
          //   resizable: true
          // },
          {
            headerName: 'شماره نامه',
            field: 'LetterNo',
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ نامه',
            field: 'PersianLetterDate',
            width: 100,
            resizable: true
          },
          {
            headerName: 'تاریخ اعتبار',
            field: 'PersianExpireDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'توضیحات دریافت پاکت',
            field: 'Note',
            width: 378,
            resizable: true,
          },
          {
            headerName: 'توضیحات دلایل رد پیشنهاد',
            field: 'SuggestionNote',
            width: 378,
            resizable: true,
          },
          // { // KH - RFC 64016
          //   headerName: 'ظرفیت مازاد تعدادی در رسته',
          //   field: 'ExtraCount',
          //   width: 155,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت مازاد ریالی در رسته',
          //   HaveThousand: true,
          //   field: 'ExtraAmount',
          //   width: 155,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت مازاد تعدادی در کل حوزه تخصص ها',
          //   field: 'TotalExtraCount',
          //   width: 250,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت مازاد ریالی در  کل حوزه تخصص ها',
          //   HaveThousand: true,
          //   field: 'TotalExtraAmount',
          //   width: 250,
          //   resizable: true
          // }
        ];
      } else {
        this.ColDef = [
          {
            headerName: 'ردیف',
            field: 'ItemNo',
            width: 70,
            resizable: true
          },
          {
            headerName: 'چاپ کارت الکترونیک',
            field: '',
            width: 170,
            resizable: false,
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.Print,
            }
          },
          {
            headerName: 'دریافت اسناد',
            field: 'IsReceived',
            width: 100,
            hide: this.PopupParam.ModuleViewTypeCode === 11    // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 155,  // RFC 59119
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsReceivedValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsReceived = params.newValue;
                return true;
              } else {
                params.data.IsReceived = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.PopupParam.ModuleViewTypeCode === 113 // RFC 50917
                || this.PopupParam.ModuleViewTypeCode === 182;
            },
          },
          {
            headerName: 'حضور',
            field: 'IsPresent',
            width: 100,
            hide: this.PopupParam.ModuleViewTypeCode === 72  // RFC 50886
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 110  // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsPresentValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsPresent = params.newValue;
                return true;
              } else {
                params.data.IsPresent = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.EditableColumns;
            },
          },
          {
            headerName: 'وضعیت فنی',
            field: 'TechnicalStatus',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            valueFormatter: function isValidFormer(params) {
              if (params.value) {
                return 'قبول';
              } else {
                return 'رد';
              }
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.TechnicalStatus
            },
          },
          {
            headerName: 'نتیجه نهایی ارزیابی',
            field: 'IsAccept',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
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
              ngTemplate: this.IsPropsalAccept
            },
          },
          {
            headerName: 'برنده',
            field: 'IsWin',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode === 72 // RFC 50702
              || this.PopupParam.ModuleViewTypeCode === 11,  // RFC 51696 //RFC 65086
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 155) {
                return true;
              } else {
                return this.IsYes;
              }
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
              ngTemplate: this.IsWin
            },
          },
          {
            headerName: 'اولویت برنده',
            field: 'WinnerOrderNo',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode !== 166,  // RFC 59119
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 166 && this.IsWin) {
                return true;
              } else {
                return false;
              }
            },
            HaveThousand: false,
            cellEditorFramework: NumberInputComponentComponent,
            cellEditorParams: { IsFloat: false, MaxLength: 1, FloatMaxLength: 0 },
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
                // tslint:disable-next-line: radix
                params.data.WinnerOrderNo = params.newValue;
              } else {
                params.data.WinnerOrderNo = null;
              }
            },
          },
          {
            headerName: 'کد ملی/شناسه ملی',
            field: 'IdentityNo',
            width: 160,
            resizable: true
          },
          {
            headerName: 'نام شخص',
            field: 'ActorName',
            width: 300,
            resizable: true
          },
          {
            headerName: 'مبلغ پیشنهادی',
            field: 'SumProposalItemPrice',
            HaveThousand: true,
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ پیشنهاد',
            field: 'PersianProposalDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'ظرفیت آزاد تعدادی در رسته',
            field: 'FreeCount',
            width: 155,
            resizable: true
          },
          {
            headerName: 'ظرفیت آزاد ریالی در رسته',
            HaveThousand: true,
            field: 'FreeAmount',
            width: 155,
            resizable: true
          },
          // { // KH - RFC 64016
          //   headerName: 'ظرفیت آزاد تعدادی در کل حوزه تخصص ها',
          //   field: 'TotalRemainedCountCapacity',
          //   width: 250,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت آزاد ریالی در  کل حوزه تخصص ها',
          //   HaveThousand: true,
          //   field: 'TotalRemainedRialCapacity',
          //   width: 250,
          //   resizable: true
          // },
          {
            headerName: 'شماره نامه',
            field: 'LetterNo',
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ نامه',
            field: 'PersianLetterDate',
            width: 100,
            resizable: true
          },
          {
            headerName: 'تاریخ اعتبار',
            field: 'PersianExpireDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'توضیحات دریافت پاکت',
            field: 'Note',
            width: 378,
            resizable: true,
          },
          {
            headerName: 'توضیحات دلایل رد پیشنهاد',
            field: 'SuggestionNote',
            width: 378,
            resizable: true,
          },
          // { // KH - RFC 64016
          //   headerName: 'ظرفیت مازاد تعدادی در رسته',
          //   field: 'ExtraCount',
          //   width: 155,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت مازاد ریالی در رسته',
          //   HaveThousand: true,
          //   field: 'ExtraAmount',
          //   width: 155,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت مازاد تعدادی در کل حوزه تخصص ها',
          //   field: 'TotalExtraCount',
          //   width: 250,
          //   resizable: true
          // },
          // {
          //   headerName: 'ظرفیت مازاد ریالی در  کل حوزه تخصص ها',
          //   HaveThousand: true,
          //   field: 'TotalExtraAmount',
          //   width: 250,
          //   resizable: true
          // }
        ];
      }
    } else {
      if (this.ProductRequestObject.IsOnline) {
        this.ColDef = [
          {
            headerName: 'ردیف',
            field: 'ItemNo',
            width: 70,
            resizable: true
          },
          {
            headerName: 'چاپ کارت الکترونیک',
            field: '',
            width: 170,
            resizable: false,
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.Print,
            }
          },
          {
            headerName: 'وضعیت اسناد',
            field: '',
            width: 90,
            sortable: false,
            resizable: false,
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.Lock
            }
          },
          {
            headerName: 'دریافت اسناد',
            field: 'IsReceived',
            width: 100,
            hide: this.PopupParam.ModuleViewTypeCode === 11  // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 155,  // RFC 59119
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsReceivedValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsReceived = params.newValue;
                return true;
              } else {
                params.data.IsReceived = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.PopupParam.ModuleViewTypeCode === 113 // RFC 50917
                || this.PopupParam.ModuleViewTypeCode === 182;
            },
          },
          {
            headerName: 'حضور',
            field: 'IsPresent',
            width: 100,
            hide: this.PopupParam.ModuleViewTypeCode === 72 // RFC 50886
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsPresentValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsPresent = params.newValue;
                return true;
              } else {
                params.data.IsPresent = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.EditableColumns;
            },
          },
          {
            headerName: 'وضعیت فنی',
            field: 'TechnicalStatus',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            valueFormatter: function isValidFormer(params) {
              if (params.value) {
                return 'قبول';
              } else {
                return 'رد';
              }
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.TechnicalStatus
            },
          },
          {
            headerName: 'نتیجه نهایی ارزیابی',
            field: 'IsAccept',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
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
              ngTemplate: this.IsPropsalAccept
            },
          },
          {
            headerName: 'برنده',
            field: 'IsWin',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode === 72 // RFC 50702
              || this.PopupParam.ModuleViewTypeCode === 11,   // RFC 51696 //RFC 65086
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 155) {
                return true;
              } else {
                return this.IsYes;
              }
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
              ngTemplate: this.IsWin
            },
          },
          {
            headerName: 'اولویت برنده',
            field: 'WinnerOrderNo',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode !== 166,  // RFC 59119
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 166 && this.IsWin) {
                return true;
              } else {
                return false;
              }
            },
            HaveThousand: false,
            cellEditorFramework: NumberInputComponentComponent,
            cellEditorParams: { IsFloat: false, MaxLength: 1, FloatMaxLength: 0 },
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
                // tslint:disable-next-line: radix
                params.data.WinnerOrderNo = params.newValue;
              } else {
                params.data.WinnerOrderNo = null;
              }
            },
          },
          {
            headerName: 'کد ملی/شناسه ملی',
            field: 'IdentityNo',
            width: 160,
            resizable: true
          },
          {
            headerName: 'نام شخص',
            field: 'ActorName',
            width: 300,
            resizable: true
          },
          {
            headerName: 'مبلغ پیشنهادی',
            field: 'SumProposalItemPrice',
            HaveThousand: true,
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ پیشنهاد',
            field: 'PersianProposalDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'شماره نامه',
            field: 'LetterNo',
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ نامه',
            field: 'PersianLetterDate',
            width: 100,
            resizable: true
          },
          {
            headerName: 'تاریخ اعتبار',
            field: 'PersianExpireDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'توضیحات دریافت پاکت',
            field: 'Note',
            width: 378,
            resizable: true,
          },
          {
            headerName: 'توضیحات دلایل رد پیشنهاد',
            field: 'SuggestionNote',
            width: 378,
            resizable: true,
          },
        ];
      } else {
        this.ColDef = [
          {
            headerName: 'ردیف',
            field: 'ItemNo',
            width: 70,
            resizable: true
          },
          {
            headerName: 'چاپ کارت الکترونیک',
            field: '',
            width: 170,
            resizable: false,
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.Print,
            }
          },
          {
            headerName: 'دریافت اسناد',
            field: 'IsReceived',
            width: 100,
            hide: (this.PopupParam.ModuleViewTypeCode === 11  // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 155) && !(this.ProductRequestObject.DealMethodCode === 12),  // RFC 59119
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsReceivedValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsReceived = params.newValue;
                return true;
              } else {
                params.data.IsReceived = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.PopupParam.ModuleViewTypeCode === 113 || this.ProductRequestObject.DealMethodCode === 12 // RFC 50917
                || this.PopupParam.ModuleViewTypeCode === 182;
            },
          },
          {
            headerName: 'حضور',
            field: 'IsPresent',
            width: 100,
            hide: this.PopupParam.ModuleViewTypeCode === 72 // RFC 50886
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.IsPresentValid,
            },
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            valueSetter: (params) => {
              if (params.newValue) {
                params.data.IsPresent = params.newValue;
                return true;
              } else {
                params.data.IsPresent = false;
                return false;
              }
            },
            resizable: true,
            editable: (param) => {
              return this.EditableColumns;
            },
          },
          {
            headerName: 'وضعیت فنی',
            field: 'TechnicalStatus',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
            cellEditorFramework: CheckboxFieldEditableComponent,
            valueFormatter: function isValidFormer(params) {
              if (params.value) {
                return 'قبول';
              } else {
                return 'رد';
              }
            },
            cellRendererFramework: TemplateRendererComponent,
            cellRendererParams: {
              ngTemplate: this.TechnicalStatus
            },
          },
          {
            headerName: 'نتیجه نهایی ارزیابی',
            field: 'IsAccept',
            width: 100,
            resizable: true,
            editable: false,
            hide: this.PopupParam.ModuleViewTypeCode === 113
              || this.PopupParam.ModuleViewTypeCode === 72
              || this.PopupParam.ModuleViewTypeCode === 11   // RFC 51696
              || this.PopupParam.ModuleViewTypeCode === 100000
              || this.PopupParam.ModuleViewTypeCode === 110 // RFC 51117
              || this.PopupParam.ModuleViewTypeCode === 155  // RFC 59119
              || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
              || this.PopupParam.ModuleViewTypeCode === 182
              || this.PopupParam.ModuleViewTypeCode === 185
              || this.PopupParam.ModuleViewTypeCode === 140,
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
              ngTemplate: this.IsPropsalAccept
            },
          },
          {
            headerName: 'برنده',
            field: 'IsWin',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode === 72 // RFC 50702
              || this.PopupParam.ModuleViewTypeCode === 11,  // RFC 51696 //RFC 65086
            cellStyle: function (params) {
              return { 'text-align': 'center' };
            },
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 155) {
                return true;
              } else {
                return this.IsYes;
              }
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
              ngTemplate: this.IsWin
            },
          },
          {
            headerName: 'اولویت برنده',
            field: 'WinnerOrderNo',
            width: 100,
            resizable: true,
            hide: this.PopupParam.ModuleViewTypeCode !== 166,  // RFC 59119
            editable: () => {
              if (this.PopupParam.ModuleViewTypeCode === 166 && this.IsWin) {
                return true;
              } else {
                return false;
              }
            },
            HaveThousand: false,
            cellEditorFramework: NumberInputComponentComponent,
            cellEditorParams: { IsFloat: false, MaxLength: 1, FloatMaxLength: 0 },
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
                // tslint:disable-next-line: radix
                params.data.WinnerOrderNo = params.newValue;
              } else {
                params.data.WinnerOrderNo = null;
              }
            },
          },
          {
            headerName: 'کد ملی/شناسه ملی',
            field: 'IdentityNo',
            width: 160,
            resizable: true
          },
          {
            headerName: 'نام شخص',
            field: 'ActorName',
            width: 300,
            resizable: true
          },
          {
            headerName: 'مبلغ پیشنهادی',
            field: 'SumProposalItemPrice',
            HaveThousand: true,
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ پیشنهاد',
            field: 'PersianProposalDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'شماره نامه',
            field: 'LetterNo',
            width: 120,
            resizable: true,
          },
          {
            headerName: 'تاریخ نامه',
            field: 'PersianLetterDate',
            width: 100,
            resizable: true
          },
          {
            headerName: 'تاریخ اعتبار',
            field: 'PersianExpireDate',
            width: 100,
            resizable: true,
          },
          {
            headerName: 'توضیحات دریافت پاکت',
            field: 'Note',
            width: 378,
            resizable: true,
          },
          {
            headerName: 'توضیحات دلایل رد پیشنهاد',
            field: 'SuggestionNote',
            width: 378,
            resizable: true,
          },
        ];
      }
    }

    if (this.PopupParam.ModuleViewTypeCode === 96) {
      this.ColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'چاپ کارت الکترونیک',
          field: '',
          width: 170,
          resizable: false,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.Print,
          }
        },
        {
          headerName: 'برنده',
          field: 'IsWin',
          width: 100,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode === 72,
          // RFC 50702 //RFC 65086
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          editable: () => {
            if (this.PopupParam.ModuleViewTypeCode === 155) {
              return true;
            } else {
              return this.IsYes;
            }
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
            ngTemplate: this.IsWin
          },
        },
        {
          headerName: 'اولویت برنده',
          field: 'WinnerOrderNo',
          width: 100,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 166,  // RFC 59119
          editable: () => {
            if (this.PopupParam.ModuleViewTypeCode === 166 && this.IsWin) {
              return true;
            } else {
              return false;
            }
          },
          HaveThousand: false,
          cellEditorFramework: NumberInputComponentComponent,
          cellEditorParams: { IsFloat: false, MaxLength: 1, FloatMaxLength: 0 },
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
              // tslint:disable-next-line: radix
              params.data.WinnerOrderNo = params.newValue;
            } else {
              params.data.WinnerOrderNo = null;
            }
          },
        },
        {
          headerName: 'کد ملی/شناسه ملی',
          field: 'IdentityNo',
          width: 160,
          resizable: true
        },
        {
          headerName: 'نام شخص',
          field: 'ActorName',
          width: 300,
          resizable: true
        },
      ];
    }
    if (this.PopupParam.ModuleViewTypeCode === 107) {
      this.ColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'چاپ کارت الکترونیک',
          field: '',
          width: 170,
          resizable: false,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.Print,
          }
        },
        {
          headerName: 'دریافت اسناد',
          field: 'IsReceived',
          width: 100,
          cellEditorFramework: CheckboxFieldEditableComponent,
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsReceivedValid,
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.IsReceived = params.newValue;
              return true;
            } else {
              params.data.IsReceived = false;
              return false;
            }
          },
          resizable: true,
          editable: (param) => {
            return this.PopupParam.ModuleViewTypeCode === 113; // RFC 50917
          },
        },
        {
          headerName: 'وضعیت فنی',
          field: 'TechnicalStatus',
          width: 100,
          resizable: true,
          editable: false,
          hide: this.PopupParam.ModuleViewTypeCode === 113
            || this.PopupParam.ModuleViewTypeCode === 72
            || this.PopupParam.ModuleViewTypeCode === 100000
            || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
            || this.PopupParam.ModuleViewTypeCode === 185
            || this.PopupParam.ModuleViewTypeCode === 140,
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            if (params.value) {
              return 'قبول';
            } else {
              return 'رد';
            }
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.TechnicalStatus
          },
        },
        {
          headerName: 'نتیجه نهایی ارزیابی',
          field: 'IsAccept',
          width: 100,
          resizable: true,
          editable: false,
          hide: this.PopupParam.ModuleViewTypeCode === 113
            || this.PopupParam.ModuleViewTypeCode === 72
            || this.PopupParam.ModuleViewTypeCode === 100000
            || this.PopupParam.ModuleViewTypeCode === 123 // RFC 53953
            || this.PopupParam.ModuleViewTypeCode === 185
            || this.PopupParam.ModuleViewTypeCode === 140,
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
            ngTemplate: this.IsPropsalAccept
          },
        },
        {
          headerName: 'برنده',
          field: 'IsWin',
          width: 100,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode === 72, // RFC 50702 //RFC 65086
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          editable: () => {
            if (this.PopupParam.ModuleViewTypeCode === 155) {
              return true;
            } else {
              return this.IsYes;
            }
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
            ngTemplate: this.IsWin
          },
        },
        {
          headerName: 'اولویت برنده',
          field: 'WinnerOrderNo',
          width: 100,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 166,  // RFC 59119
          editable: () => {
            if (this.PopupParam.ModuleViewTypeCode === 166 && this.IsWin) {
              return true;
            } else {
              return false;
            }
          },
          HaveThousand: false,
          cellEditorFramework: NumberInputComponentComponent,
          cellEditorParams: { IsFloat: false, MaxLength: 1, FloatMaxLength: 0 },
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
              // tslint:disable-next-line: radix
              params.data.WinnerOrderNo = params.newValue;
            } else {
              params.data.WinnerOrderNo = null;
            }
          },
        },
        { // 60926
          headerName: 'کد ملی/شناسه ملی',
          field: 'IdentityNo',
          width: 160,
          resizable: true
        },
        {
          headerName: 'نام شخص',
          field: 'ActorName',
          width: 300,
          resizable: true
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'SumProposalItemPrice',
          HaveThousand: true,
          width: 120,
          resizable: true,
        },
        {
          headerName: 'تاریخ پیشنهاد',
          field: 'PersianProposalDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'شماره نامه',
          field: 'LetterNo',
          width: 120,
          resizable: true,
        },
        {
          headerName: 'تاریخ نامه',
          field: 'PersianLetterDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'تاریخ اعتبار',
          field: 'PersianExpireDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'توضیحات دریافت پاکت',
          field: 'Note',
          width: 378,
          resizable: true,
        },
        {
          headerName: 'توضیحات دلایل رد پیشنهاد',
          field: 'SuggestionNote',
          width: 378,
          resizable: true,
        },
      ];
    }
    if (this.ProductRequestObject.IsOnline) {
      this.DisplayBtnElectronicFilse = true;
    } else {
      this.DisplayBtnElectronicFilse = false;
    }
  }

  ngOnInit() {
    this.HaveSecurityDetails = true;
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.IsMultiContract = null;
    this.IsMultiYear = null;
    this.CostFactorMultiContract = null;
    this.HaveMultiContract = false;
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.CheckRegionWritable = this.PopupParam.CheckRegionWritable;
    this.IsDeactiveBtns = !this.PopupParam.IsInProgressCartable; // 59699
    // tslint:disable-next-line:max-line-length
    this.ProductRequestItemID = this.ProductRequestObject.ProductRequestItemList && this.ProductRequestObject.ProductRequestItemList.length > 0 ? this.ProductRequestObject.ProductRequestItemList[0].ProductRequestItemID : -1;
    // this.Contractor = this.ProductRequestObject.RequestSupplierList && this.ProductRequestObject.RequestSupplierList.length >= 1 ?
    //                   this.ProductRequestObject.RequestSupplierList[0].ActorName : null;
    this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(res => {
      if (res) {
        this.HasEstimate = true;
      }
    });
    this.User.GetActiveActorID().subscribe(res => {
      if (res) {
        this.ActorID = res.ActorID;
      }
    });


    if (this.ProductRequestObject.DealMethodCode === 4 ||
      this.ProductRequestObject.DealMethodCode === 9 ||
      this.ProductRequestObject.DealMethodCode === 7 ||
      this.ProductRequestObject.DealMethodCode === 8 ||
      this.ProductRequestObject.DealMethodCode === 17 ||
      this.ProductRequestObject.DealMethodCode === 12 ||
      this.ProductRequestObject.DealMethodCode === 13 ||
      this.ProductRequestObject.DealMethodCode === 18) { // 62555 - 63886
      this.HasnotOrder = true;
    }

    if (this.ProductRequestObject.ProductRequestTypeCode === 2 ||
      this.ProductRequestObject.ProductRequestTypeCode === 3 ||
      this.ProductRequestObject.ProductRequestTypeCode === 7) {
      this.IsShowPrintType = true;
      this.PrintTypeParams.selectedObject = 1;
    }

    if (this.PopupParam.OrginalModuleCode === 2793 || this.PopupParam.OrginalModuleCode === 2824) {
      this.HasnotOrder = false;
    }

    this.RowData = [];
    this.Subject = this.ProductRequestObject.Subject;
    this.ProductRequestDate = this.ProductRequestObject.ShortProductRequestDate;
    this.ProductRequestNo = this.ProductRequestObject.ProductRequestNo;
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    this.IsMaterialsDifference = this.ProductRequestObject.IsMaterialsDifference;
    this.HaveMaterials = this.ProductRequestObject.HaveMaterials;
    if (this.ProductRequestObject && this.ProductRequestObject.ProductRequestTypeCode === 1) {
      this.DisplayCompletionContractInfo = false;
    }
    if (this.ProductRequestObject && this.ProductRequestObject.RegionCode === 200) {
      this.DateFormat = 'YYYY/MM/DD';
      this.ShowMode = 'day';
      this.HasChooseContractor = false;
      // this.DisabledCommitionType = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
    }

    this.onChangeViewTypeChange();

    if (!this.OrderCommitionObject) {
      forkJoin([
        // tslint:disable-next-line:max-line-length
        this.ProductRequest.GetOrdersWithProductRequest(this.ProductRequestItemID, this.HasnotOrder, this.CostFactorID, this.IsChabokContractModuleViewType11, this.IsInquriyID,
          (this.PopupParam && this.PopupParam.ModuleViewTypeCode ? this.PopupParam.ModuleViewTypeCode : null), this.PopupParam.ModuleCode),
        this.ProductRequest.GetCommitionList()
        // this.ProductRequest.GetCommitionMemberList(1, this.ProductRequestObject.RegionCode)
      ]).subscribe(res => {
        if (res[0]) {
          this.OrdersObject = res[0];
          if (this.OrdersObject.LastInquiryObject &&
            this.OrdersObject.LastInquiryObject.OrderCommitionObject &&
            this.OrdersObject.LastInquiryObject.OrderCommitionObject.OrderCommitionID > 0) {
            this.OrderCommitionObject = this.OrdersObject.LastInquiryObject.OrderCommitionObject;
            this.onChangeCommition(this.OrderCommitionObject.CommitionCode);
            this.onChangeViewTypeChange(99999);
            this.CommitionParams.selectedObject = this.OrderCommitionObject.CommitionCode;
            this.InquiryObject = this.OrdersObject.LastInquiryObject;
            // tslint:disable-next-line:max-line-length
            this.AProposalList = (this.PopupParam.ModuleViewTypeCode === 47 || this.PopupParam.ModuleViewTypeCode === 37 || this.PopupParam.ModuleViewTypeCode === 112
              || this.PopupParam.ModuleViewTypeCode === 166) ? this.InquiryObject.ProposalReceivedList :
              this.InquiryObject.ProposalList;

            this.CommitionDate = this.OrderCommitionObject.ShortCommitionDate;
            this.CommitionNo = this.OrderCommitionObject.CommitionNo;
            this.CommitionSubject = this.OrderCommitionObject.Subject;
            this.ChooseContractor = this.OrderCommitionObject.ChooseContractor;
            this.OrderCommitionID = this.OrderCommitionObject.OrderCommitionID;
            this.SecurityPermissionNo = this.OrderCommitionObject.SecurityPermissionNo;
            this.SecurityPermissionDate = this.OrderCommitionObject.ShortSecurityPermissionDate;
            this.ExpertCoef = this.OrderCommitionObject.ExpertCoef;
            this.ExpertAmount = this.OrderCommitionObject.ExpertAmount;
            this.IsPriceExtended = this.OrderCommitionObject.IsPriceExtended;
            this.IsAcceptWorkDone = this.OrderCommitionObject.IsAcceptWorkDone;
            if ((this.PopupParam.ModuleViewTypeCode === 37 || this.PopupParam.ModuleViewTypeCode === 68
              || this.PopupParam.ModuleViewTypeCode === 169) &&
              this.OrderCommitionObject.IsAccept != null) {
              this.IsAccept = this.OrderCommitionObject.IsAccept;
            }
            this.HaveDigitalSign = this.OrderCommitionObject.HaveDigitalSign;

            if ((this.PopupParam.ModuleViewTypeCode === 17 || this.PopupParam.ModuleViewTypeCode === 18) &&
              this.OrderCommitionObject.HaveWinner != null) {
              this.HaveWinner = this.OrderCommitionObject.HaveWinner;
            }

            this.Result = this.OrderCommitionObject.Result;
            this.PriceInNewsPaper = this.OrderCommitionObject.PriceInNewsPaper;
            this.DocUploadEnabled = true;
            this.ContractId = this.ProductRequestObject.ContractObject && this.ProductRequestObject.ContractObject.ContractId ?
              this.ProductRequestObject.ContractObject.ContractId : null;
            if (this.ContractId && this.PopupParam.ModuleViewTypeCode === 110000) {
              this.ProductRequest.GetContractCommitionMemberList(this.ContractId).subscribe(res => {
                const Codes = [];
                res.forEach(item => {
                  Codes.push(item.ActorID);
                });
                this.CommitionMemberParams.selectedObject = Codes;
              });
            }
            // tslint:disable-next-line:max-line-length
            if (this.OrderCommitionObject.HaveWinner && this.PopupParam.ModuleViewTypeCode !== 100000 && this.PopupParam.ModuleViewTypeCode !== 100002) {
              this.IsDisableJobCategory = true;
            }
          } else if (this.OrdersObject.LastInquiryObject) {
            // tslint:disable-next-line: max-line-length
            // this.IsNoOrderCommition = (this.PopupParam.ModuleViewTypeCode === 11 || this.PopupParam.ModuleViewTypeCode === 100000 || this.PopupParam.ModuleViewTypeCode === 17) ? false : true; RFC: 58690 همراه با اوتلوک 2021/01/27
            // tslint:disable-next-line:max-line-length
            this.AProposalList = (this.PopupParam.ModuleViewTypeCode === 47 || this.PopupParam.ModuleViewTypeCode === 37 || this.PopupParam.ModuleViewTypeCode === 112
              || this.PopupParam.ModuleViewTypeCode === 166) ? this.OrdersObject.LastInquiryObject.ProposalReceivedList :
              this.OrdersObject.LastInquiryObject.ProposalList;
            this.InquiryObject = this.OrdersObject.LastInquiryObject;
          }

          if (this.OrderCommitionID) {
            this.IsDisable = false;
          }
        }
        this.CommitionItems = res[1];
        if (this.ProductRequestObject.RegionCode === 200) {
          this.CommitionParams.selectedObject = 1;
        }
        if (this.PopupParam.ModuleViewTypeCode === 110 && this.ProductRequestObject.RegionCode === 200) { // RFC 55099
          const IsReceivedList = [];
          this.AProposalList.forEach(item => {
            if (item.IsReceived) {
              IsReceivedList.push(item);
            }
          });
          this.RowData = IsReceivedList;
        } else {
          this.RowData = this.AProposalList;
        }

      });
    } else {
      this.InitOrderCommitionObject();
    }

    if (this.ProductRequestObject && this.ProductRequestObject.ProductRequestTypeCode != null) {
      // tslint:disable-next-line: max-line-length
      if (this.ProductRequestObject.ProductRequestTypeCode === 1 ||
        this.ProductRequestObject.ProductRequestTypeCode === 4) {
        this.IsDisplayJobCategory = true;
        this.OnOpenNgSelect('PriceListTopicRaste', true);
      }
      if (this.ProductRequestObject.ProductRequestTypeCode === 3 ||
        this.ProductRequestObject.ProductRequestTypeCode === 2) {
        this.IsUrbanGreen = true;
        this.ShowFormulaBtn = true;
        if (this.ProductRequestObject.ProductRequestTypeCode === 2
          && this.ProductRequestObject.PriceListTopicID === 402374) { // فضای سبز - نگهداشت
          this.IsGreenSpace = true;
          this.IsDisableJobCategory = true;
          this.OnOpenNgSelect('PriceListTopicRaste', true);
        }
      } else if (this.ProductRequestObject.ProductRequestTypeCode !== 3) {
        this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(res => {
          if (res) {
            this.HasTripleReport = true;
          }
        });
      }
    }

    if (this.PopupParam.ModuleViewTypeCode === 113 && this.ProductRequestObject.DealMethodCode === 3 &&
      this.PopupParam.ModuleCode === 2739) { // RFC 58754
      this.HasWarrantyItem = false;
      this.IsType113 = true;
    }

    if (this.ProductRequestObject.ProductRequestTypeCode === 1) { // عمرانی
      if (this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22) {
        if (this.ProductRequestObject.ContractTypeCode !== 4 && this.ProductRequestObject.IsCost) {
          this.IsForcePriceList = true;
        }
      } else {
        this.IsForcePriceList = true;
      }
    } else if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // حمل و نقل و ترافیک
      this.IsForcePriceList = true;
    } // RFC 61902

    if (this.PopupParam.OriginModuleViewTypeCode === 500000) {
      this.IsDisableJobCategory = this.IsDisplayJobCategory = true;
      this.IsnotActiveBtnSave = this.CheckRegionWritable = this.HaveSign = this.IsSearch = this.HaveShowSign = false;
      this.HasWarrantyItem = this.IsWFDisable = this.IsType49 = true;
    }

  }

  Close() {
    this.ProductRequestCostClosed.emit(true);
  }
  onSave(IsCheckException = false) {
    let HasWinner = false;
    this.RowData.forEach(element => {
      if (element.IsWin === true) {
        HasWinner = true;
      }
    });

    // tslint:disable-next-line:max-line-length
    let CheckExceptions = (this.PopupParam.OrginalModuleCode === 2793 || this.PopupParam.OrginalModuleCode === 2824) && this.PopupParam.IsAdmin && !IsCheckException;
    let StrExceptions = '';
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if (HasWinner && this.PopupParam.OrginalModuleCode === 2793) {
    } else {
      if (!this.OrdersObject || this.OrdersObject === null || isUndefined(this.OrdersObject)) {
        // tslint:disable-next-line: max-line-length
        this.ShowMessageBoxWithOkBtn('به علت عدم دریافت پاکات و عدم درج لیست متقاضیان، امکان ثبت کمیسیون وجود ندارد. در صورت نیاز با راهبر تماس بگیرید.');
      }
    }

    if (this.ExpertAmount && this.ExpertCoef) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت همزمان ضریب کارشناسی و مبلغ کارشناسی وجود ندارد.');
      return;
    }
    if (HasWinner && this.PopupParam.OrginalModuleCode === 2793) {
    } else {
      if ((this.ProductRequestObject.RegionCode >= 1 && this.ProductRequestObject.RegionCode <= 22) &&
        (!this.CommitionMemberParams.selectedObject || this.CommitionMemberParams.selectedObject === null
          || (this.CommitionMemberParams.selectedObject).length === 0)) {
        this.ShowMessageBoxWithOkBtn('امکان ثبت بدون درج اعضای کمیسیون وجود ندارد'); // RFC 60827
        return;
      }
    }

    this.CheckValidate = true;
    let ValidateForm = true;
    // tslint:disable-next-line: max-line-length
    ValidateForm = ValidateForm && this.CommitionDate && this.CommitionParams.selectedObject;

    if (this.IsForcePriceList) {
      ValidateForm = ValidateForm && this.PriceListTopicRasteParams.selectedObject && this.RankParams.selectedObject;
    }

    if (ValidateForm) {
      
      var SumFinalAmount = 0 ; 
      if (!this.ExpertCoef && this.ExpertAmount && this.ExpertAmount > 0) {
        this.ProductRequestObject.ProductRequestItemList.forEach(element =>  {
            SumFinalAmount = SumFinalAmount + parseFloat(element.AmountCOEFPact)     
        });
        this.ExpertCoef = (this.ExpertAmount / SumFinalAmount) ;
      }

      const OrderCommitionObj = {
        OrderCommitionID: this.OrderCommitionID ? this.OrderCommitionID : -1,
        CostFactorID: this.OrdersObject.CostFactorID,
        InquiryID: this.InquiryObject.InquiryID,
        CommitionCode: this.CommitionParams.selectedObject,
        CommitionDate: this.CommitionDate,
        Result: this.Result,
        CommitionNo: this.CommitionNo,
        Subject: this.CommitionSubject,
        ChooseContractor: this.ChooseContractor,
        IsAccept: this.IsAccept,
        HaveWinner: this.HaveWinner,
        SecurityPermissionNo: this.SecurityPermissionNo,
        SecurityPermissionDate: this.SecurityPermissionDate,
        ExpertCoef: this.ExpertCoef,
        ExpertAmount: this.ExpertAmount,
        IsPriceExtended: this.IsPriceExtended,
        IsAcceptWorkDone: this.IsAcceptWorkDone,
        HaveDigitalSign: this.HaveDigitalSign,
        PriceInNewsPaper: this.PriceInNewsPaper !== null && !isUndefined(this.PriceInNewsPaper) && this.PriceInNewsPaper !== '' ?
          // tslint:disable-next-line: radix
          parseInt((this.PriceInNewsPaper.toString()).replace(/,/g, '')) : null,
        IsMultiYear: this.IsMultiYear
      };
      // this.GridApi.stopEditing();
      let ProposalList = [];
      if (this.HaveSetWinner) {
        this.GridApi.stopEditing();
        this.GridApi.forEachNode(node => {
          node.data.IsWin = this.PopupParam.ModuleViewTypeCode === 11 ? true : node.data.IsWin ? true : false; // RFC 51696
          node.data.IsAccept = node.data.IsAccept ? true : false;
          node.data.TechnicalStatus = node.data.TechnicalStatus ? true : false;
          node.data.IsPresent = node.data.IsPresent ? true : false;
          node.data.IsReceived = node.data.IsReceived ? true : this.ProductRequestObject.DealMethodCode === 17 ? true : false; // 62663
          node.data.WinnerOrderNo = node.data.WinnerOrderNo;
          ProposalList.push(node.data);
        });
      } else {
        ProposalList = this.AProposalList;

      }
      if (this.HaveExpertPerson) {

        const ExpertPersonObj = {
          ActorID: this.ExpertParams.selectedObject,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RoleID: 972
        };
        this.AProductRequestPeopleList.push(ExpertPersonObj);
      }
      if (this.HaveAgent) {
        const AgentPersonObj = {
          ActorID: this.AgentParams.selectedObject,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RoleID: 1520
        };
        this.AProductRequestPeopleList.push(AgentPersonObj);
      }
      if (this.PopupParam.ModuleViewTypeCode === 37 || this.PopupParam.ModuleViewTypeCode === 47
        || this.PopupParam.ModuleViewTypeCode === 72 || this.PopupParam.ModuleViewTypeCode === 110
        || this.PopupParam.ModuleViewTypeCode === 185
        || this.PopupParam.ModuleViewTypeCode === 11 || this.PopupParam.ModuleViewTypeCode === 107
        || this.PopupParam.ModuleViewTypeCode === 53 || this.PopupParam.ModuleViewTypeCode === 100000
        // tslint:disable-next-line: max-line-length
        || this.PopupParam.ModuleViewTypeCode === 112 || this.PopupParam.ModuleViewTypeCode === 123
        || this.PopupParam.ModuleViewTypeCode === 149 || this.PopupParam.ModuleViewTypeCode === 166) { // RFC 50573 & 50702 & 50728 & 50851(47 --> 112) // RFC 53953 (123)
        this.IsYes = this.IsYes;
      } else if (this.PopupParam.ModuleViewTypeCode === 68 || this.PopupParam.ModuleViewTypeCode === 169) { // RFC 50573 - 61935
        this.IsYes = this.HasWinner; // بررسی انتخاب برنده در گرید طبق درخواست 50573 در هنگام تایید بررسی می گردد
      } else { // RFC 50573
        this.IsYes = null;
      }
      if (CheckExceptions) {
        this.ProductRequest.GetSaveCommitionMemberExceptions(this.InquiryObject.InquiryID,
          ProposalList,
          (this.RankParams.selectedObject ? this.RankParams.selectedObject : null),
          this.ProductRequestObject.CostFactorID,
          this.PopupParam.ModuleViewTypeCode,
          this.PriceListTopicRasteParams.selectedObject).subscribe((res: any) => {
            if (res !== '') {
              this.IsException = true;
              StrExceptions = res;
              StrExceptions = StrExceptions + ' ' + 'آیا می خواهید ادامه دهید؟';
              this.ShowMessageBoxWithYesNoBtn(StrExceptions);
            } else {
              // tslint:disable-next-line:max-line-length
              this.ProductRequest.SaveCommitionMember(
                OrderCommitionObj,
                this.CommitionMemberParams.selectedObject,
                this.InquiryObject.InquiryID,
                ProposalList,
                false,
                this.PopupParam.OrginalModuleCode,
                this.AProductRequestPeopleList,
                this.IsMultiContract,
                this.CostFactorMultiContract,
                // tslint:disable-next-line: max-line-length
                (this.RankParams.selectedObject ? this.RankParams.selectedObject : null),
                this.ProductRequestObject.CostFactorID,
                this.IsMaterialsDifference,
                this.HaveMaterials,
                this.IsYes,
                this.PopupParam.ModuleViewTypeCode,
                this.PriceListTopicRasteParams.selectedObject,
                this.PopupParam.ModuleCode,
                this.ProductRequestObject.RegionCode).subscribe( // RFC 50573
                  (res: any) => {
                    this.OrderCommitionID = res.OrderCommitionID;
                    this.DocUploadEnabled = this.OrderCommitionID ? true : false;
                    this.IsDisable = false;
                    if (!isUndefined(this.IsYes) && this.IsYes != null) {
                      this.ProductRequestObject.HaveWinner = this.IsYes;
                      this.RefreshService.RefreshProductRequestPage(this.ProductRequestObject);
                    }
                    if (!isUndefined(this.HaveMaterials) && this.HaveMaterials != null) {
                      this.ProductRequestObject.HaveMaterials = this.HaveMaterials;
                      this.RefreshService.RefreshProductRequestPage(this.ProductRequestObject);
                    }
                    if (!isUndefined(this.IsMaterialsDifference) && this.IsMaterialsDifference != null) {
                      this.ProductRequestObject.IsMaterialsDifference = this.IsMaterialsDifference;
                      this.RefreshService.RefreshProductRequestPage(this.ProductRequestObject);
                    }

                    this.ProductRequestObject.PriceListTopicID = this.PriceListTopicRasteParams.selectedObject;
                    this.ProductRequestObject.GradeID = this.RankParams.selectedObject;
                    this.ProductRequestObjectChange.emit(this.ProductRequestObject);


                    this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
                    const itemsToUpdate = [];
                    const promise = new Promise<void>((resolve, reject) => {
                      if (this.HaveSetWinner && ProposalList && ProposalList.length > 0) {
                        const WinList = ProposalList.find(x => x.IsWin);
                      }
                      ProposalList.forEach((element, index) => {

                        if (element.IsWin) {
                          // tslint:disable-next-line: max-line-length
                          this.ProductRequest.GetCapacity(element.ActorID, this.ProductRequestObject.CostFactorID).subscribe((ress: any) => {
                            if (ress) {
                              element.FreeAmount = ress.FreeRialCapacity;
                              element.FreeCount = ress.FreeCountCapacity;
                              element.HasCapacity = ress.HasCapacity;
                              // element.TotalRemainedRialCapacity = ress.TotalRemainedRialCapacity; // KH - RFC 64016
                              // element.TotalRemainedCountCapacity = ress.TotalRemainedCountCapacity;
                              // element.ExtraCount = ress.ExtraCount;
                              // element.ExtraAmount = ress.ExtraAmount;
                              // element.TotalExtraAmount = ress.TotalExtraAmount;
                              // element.TotalExtraCount = ress.TotalExtraCount;
                              itemsToUpdate.push(element);
                              resolve();
                            }
                          });
                        }
                      });

                    }).then(() => {
                      if (this.HaveSetWinner) {
                        this.GridApi.updateRowData({ update: itemsToUpdate });
                      }
                    });

                  }
                );
            }
          });
      } else {
        this.ProductRequest.SaveCommitionMember(
          OrderCommitionObj,
          this.CommitionMemberParams.selectedObject,
          this.InquiryObject.InquiryID,
          ProposalList,
          true,
          this.PopupParam.OrginalModuleCode,
          this.AProductRequestPeopleList,
          this.IsMultiContract,
          this.CostFactorMultiContract,
          (this.RankParams.selectedObject ? this.RankParams.selectedObject : null),
          this.ProductRequestObject.CostFactorID,
          this.IsMaterialsDifference,
          this.HaveMaterials,
          this.IsYes,
          this.PopupParam.ModuleViewTypeCode,
          this.PriceListTopicRasteParams.selectedObject,
          this.PopupParam.ModuleCode,
          this.ProductRequestObject.RegionCode).subscribe( // RFC 50573
            (res: any) => {
              this.OrderCommitionID = res.OrderCommitionID;
              this.DocUploadEnabled = this.OrderCommitionID ? true : false;
              this.IsDisable = false;
              if (!isUndefined(this.IsYes) && this.IsYes != null) {
                this.ProductRequestObject.HaveWinner = this.IsYes;
                this.RefreshService.RefreshProductRequestPage(this.ProductRequestObject);
              }
              if (!isUndefined(this.HaveMaterials) && this.HaveMaterials != null) {
                this.ProductRequestObject.HaveMaterials = this.HaveMaterials;
                this.RefreshService.RefreshProductRequestPage(this.ProductRequestObject);
              }
              if (!isUndefined(this.IsMaterialsDifference) && this.IsMaterialsDifference != null) {
                this.ProductRequestObject.IsMaterialsDifference = this.IsMaterialsDifference;
                this.RefreshService.RefreshProductRequestPage(this.ProductRequestObject);
              }

              this.ProductRequestObject.PriceListTopicID = this.PriceListTopicRasteParams.selectedObject;
              this.ProductRequestObject.GradeID = this.RankParams.selectedObject;
              this.ProductRequestObjectChange.emit(this.ProductRequestObject);

              this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
              const itemsToUpdate = [];
              const promise = new Promise<void>((resolve, reject) => {
                if (this.HaveSetWinner && ProposalList && ProposalList.length > 0) {
                  const WinList = ProposalList.find(x => x.IsWin);
                }


                ProposalList.forEach((element, index) => {

                  if (element.IsWin) {
                    // tslint:disable-next-line: max-line-length
                    this.ProductRequest.GetCapacity(element.ActorID, this.ProductRequestObject.CostFactorID).subscribe((ress: any) => {
                      if (ress) {
                        element.FreeAmount = ress.FreeRialCapacity;
                        element.FreeCount = ress.FreeCountCapacity;
                        element.HasCapacity = ress.HasCapacity;
                        // element.TotalRemainedRialCapacity = ress.TotalRemainedRialCapacity; // KH - RFC 64016
                        // element.TotalRemainedCountCapacity = ress.TotalRemainedCountCapacity;
                        // element.ExtraCount = ress.ExtraCount;
                        // element.ExtraAmount = ress.ExtraAmount;
                        // element.TotalExtraAmount = ress.TotalExtraAmount;
                        // element.TotalExtraCount = ress.TotalExtraCount;
                        itemsToUpdate.push(element);
                        resolve();
                      }
                    });
                  }
                });

              }).then(() => {
                if (this.HaveSetWinner) {
                  this.GridApi.updateRowData({ update: itemsToUpdate });
                }
              });

            });
      }
    } else {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
    }
  }

  OnCommitionDateChange(ADate) {
    this.CommitionDate = ADate.MDate;
  }
  OnSecurityPermissionDateChange(ADate) {
    this.SecurityPermissionDate = ADate.MDate;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.HaveMaxBtn = false;
    this.isClicked = true;
    this.type = 'message-box';
    this.MainMaxwidthPixel = null;
    this.OverMainMinwidthPixel = null;
    this.HaveHeader = true;
    this.startLeftPosition = 500;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 500;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  onShowArchiveDetail(DocTypeCode: number, ModuleCode: number, DocumentTypeCodeList: any) {
    this.type = 'archive-details';

    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.ParamObj = {
      EntityID: this.OrderCommitionID,
      TypeCodeStr: DocTypeCode + '-',
      DocTypeCode: DocTypeCode,
      ModuleCode: ModuleCode,
      IsReadOnly: this.PopupParam.IsInProgressCartable ? true : false, // 59699
      DocumentTypeCodeList: DocumentTypeCodeList
    };
    this.isClicked = true;
    return;
  }
  MessageBoxAction(ActionResult) {
    this.isClicked = false;
    this.type = '';
    if (this.IsException && ActionResult === 'YES') {
      this.onSave(true);
      return;
    }
  }
  onPropsalItemClick(Type) {
    if (!this.SelectedProposal) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب نشده است');
      return;
    }

    if (!this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }

    this.type = 'proposal-item-estimate';
    this.isClicked = true;
    this.HaveHeader = true;
    this.MainMaxwidthPixel = null;
    this.OverMainMinwidthPixel = null;
    this.startLeftPosition = 105;
    this.startTopPosition = 5;
    this.HaveMaxBtn = true;
    this.ParamObj = {
      Proposal: this.SelectedProposal,
      ProductRequestObject: this.ProductRequestObject,
      ContractTypeCode: this.ProductRequestObject.ContractTypeCode,
      ReadOnly: this.IsReadOnly,
      HasWarrantyItem: ((this.PopupParam.ModuleViewTypeCode === 100001) ||
        (this.PopupParam.OriginModuleViewTypeCode === 500000)) ? true : false,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleCode: this.PopupParam.ModuleCode,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      BtnType: Type
    };
  }

  onbtnDocumentUpload() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.OverMainMinwidthPixel = null;
    this.MainMaxwidthPixel = null;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.ParamObj = {
      EntityID: this.OrderCommitionID ? this.OrderCommitionID : -1,
      TypeCodeStr: '44-',
      DocTypeCode: 44,
      ModuleCode: 2730,
      DocumentTypeCodeList: this.FilterDocumentTypeCodeList,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      RegionCode: this.ProductRequestObject.RegionCode,
      IsReadOnly: this.IsReadOnly
    };
  }

  getOutPutParam(event) {
    if (this.type === 'advertising-search') {
      this.SelectedAdvertising = event;
      this.AdvertisingCode = this.SelectedAdvertising.AdvertisingCode;
    }
  }
  IsYesRedioClick(Type) {
    this.IsYes = Type;
    if (!this.IsYes) {
      const itemsToUpdate = [];
      this.GridApi.forEachNode(node => {
        if (node.data.IsWin) { // هماهنگی با آقای عباسی
          this.ShowMessageBoxWithOkBtn('در لیست پیشنهاددهندگان برنده انتخاب شده است. پاسخ به این سوال نمی تواند خیر باشد.');
          this.IsYes = true;
          return;
        }
        node.data.IsWin = false;
        itemsToUpdate.push(node.data);
      });

      this.GridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  onGridReady(params) {
    this.GridApi = params.api;
  }

  onCellValueChanged(event) {
    let itemsToUpdate = [];
    if (event.newValue && event.columnDefPriceList &&
      event.columnDefPriceList.field === 'IsWin') {
      itemsToUpdate = [];
      this.GridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.IsWin = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.GridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  RowClick(event) {
    this.SelectedProposal = event.data;
    this.BtnElectronicFilse = this.SelectedProposal.HaveEncrypt ? 'بازگشایی مهر و موم' : 'مشاهده پاکات';
  }
  WFRedioClick(checked) {

    switch (this.PopupParam.ModuleViewTypeCode) {

      case 17:
      case 18:
      case 116:
        this.HaveWinner = checked;
        break;
      case 26:
        this.IsAcceptWorkDone = checked;
        break;
      case 37:
      // case 68: // RFC 50573 و هماهنگی با آقای عباسی
      case 107:
        this.IsAccept = checked;
        break;
      case 68:
      case 169: // RFC 61935
        this.HasWinner = checked; // RFC 50573
        break;
    }
  }

  onTenderRepClick(Type) {
    this.OnPrintEvent = true;
    this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, 56, false).subscribe(res => {
      if (res && res.length > 0) {
        this.ExistsFile = true;
        this.FirstPrintAction = true;
        this.ShowMessageBoxWithYesNoBtn('فایل گزارش قبلا ذخیره شده است، آیا مایل به مشاهده آن هستید');
      } else {
        this.ExistsFile = false;
        this.popupclosed(false);
      }
    })
    // }
  }
  print() {
    let UranTriplePrint = this.PrintTypeParams.selectedObject ? this.PrintTypeParams.selectedObject : 0;
    this.Report.TenderProceedingsReport(
      this.ProductRequestObject.CostFactorID,
      this.OrderCommitionID,
      2730,
      this.ProductRequestObject.RegionCode,
      'صورتجلسه کمیسیون معاملات',
      this.HasEstimate,
      UranTriplePrint,
      this.PopupParam.ModuleViewTypeCode);
    this.FirstPrintAction = false;
    this.SecondPrintAction = false;

  }
  popupclosed(ActionResult) {
    if (this.type === 'reopening-tender-envekopes') {
      this.ProductRequest.CheckTenderEnvekopesIsLock(this.SelectedProposal.ProposalID).subscribe(res => {
        const itemsToUpdate = [];
        this.GridApi.forEachNode(node => {
          if (node.data.ProposalID === this.SelectedProposal.ProposalID) {
            node.data.HaveEncrypt = res !== null && res.filter(x => x.IsLock).length > 0;
            itemsToUpdate.push(node.data);
          }
        });
        this.GridApi.updateRowData({ update: itemsToUpdate });
      });
      this.isClicked = false;
      this.type = '';
    } else if (this.type === 'proposal-item-estimate') {
      if (this.HaveSetWinner) {
        this.ProductRequest.GetOrdersWithProductRequest(this.ProductRequestItemID).subscribe(ress => {
          // tslint:disable-next-line: max-line-length
          this.AProposalList = (this.PopupParam.ModuleViewTypeCode === 47 || this.PopupParam.ModuleViewTypeCode === 112
            || this.PopupParam.ModuleViewTypeCode === 166) ? ress.LastInquiryObject.ProposalReceivedList
            : ress.LastInquiryObject.ProposalList;
          const itemsToUpdate = [];
          this.GridApi.forEachNode(node => {
            const item = this.AProposalList.find(x => x.ProposalID === node.data.ProposalID);
            if (item) {
              node.data.IsReceived = item.IsReceived;
              node.data.TechnicalStatus = item.TechnicalStatus;
              node.data.SuggestionNote = item.SuggestionNote;
              node.data.IsAccept = item.IsAccept;
              node.data.IsAcceptJobCategory = item.IsAcceptJobCategory;
              node.data.IsAcceptGrade = item.IsAcceptGrade;
              node.data.SumProposalItemPrice = item.SumProposalItemPrice; // RFC 58808
            }
            itemsToUpdate.push(item);
          });
          this.GridApi.updateRowData({ update: itemsToUpdate });
        });
      }
      this.isClicked = false;
      this.type = '';
    } else if (this.type === 'global-choose-page' && ActionResult !== 'Exit') {
      if (this.ClickedName === 'load-file-digital-sign' && ActionResult.DName !== 'Del') {
        this.ClickedName = null;
        this.LoadFileForSign(ActionResult);
      } else {
        if (ActionResult.DName === 'Del') {
          this.ComonService.DeleteArchiveDetailDocuments(this.OrderCommitionID,
            661,
            this.PopupParam.ModuleCode).subscribe(res => {
              this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
            });
        } else {
          this.ComonService.GetAllArchiveDetailList(
            this.OrderCommitionID, ActionResult === 3 ? 1047 : 661, true).subscribe(res => {
              if (res && res.PDFSignersInfo && res.PDFSignersInfo.length > 0) {
                this.type = '';
                ActionResult === 3 ? this.SignArticle18(false) : this.SignFinal(false);
              } else if (res) {
                if (ActionResult === 3) {
                  this.DraftOrFinallType = 3;
                } else {
                  this.DraftOrFinallType = 2;
                }
                this.OnSignPrintEvent = true;
                this.ShowMessageBoxWithYesNoBtn(' فایل مناقصه قبلا ذخیره شده است، آیا مایل به مشاهده آن هستید');
              } else {
                ActionResult === 3 ? this.SignArticle18(false) : this.SignFinal(false);
              }
            });
        }
      }
    } else if (this.OnSignPrintEvent) {
      if (ActionResult === 'NO') {
        this.DraftOrFinallType === 3 ? this.SignArticle18(true) : this.SignFinal(true);
      } else {
        this.DraftOrFinallType === 3 ? this.SignArticle18(false) : this.SignFinal(false);
      }
      this.isClicked = false;
      this.type = '';
    } else if (this.OnPrintEvent) {
      if (this.ExistsFile) {
        if (this.FirstPrintAction) {
          this.onFirstPrintAction(ActionResult);
        } else if (this.SecondPrintAction) {
          this.onSecondPrintAction(ActionResult);
        }
      } else {
        this.ExistsFile = true;
        this.SecondPrintAction = true;
        this.ShowMessageBoxWithYesNoBtn('آیا مایل به ذخیره اطلاعات جدید هستید');
        return;
      }
    } else {
      this.isClicked = false;
      this.type = '';
      this.FinalPrintAction = false;
    }
    this.HaveMaxBtn = false;
    this.MainMinwidthPixel = null;
    this.OverMainMinwidthPixel = null;
    if (this.type === 'archive-details') {
      this.FinalPrintAction = false;
      this.type = '';
    }
    if (this.FinalPrintAction) {
      this.onShowArchiveDetail(44, 2793, 56);
      this.OnPrintEvent = false;
    }
  }
  onFirstPrintAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.isClicked = false;
      this.FinalPrintAction = true;
      this.FirstPrintAction = false;
    } else {
      this.type = '';
      this.isClicked = false;
      this.FirstPrintAction = false;
      this.SecondPrintAction = true;
      this.ShowMessageBoxWithYesNoBtn('آیا مایل به ذخیره اطلاعات جدید هستید');
    }
  }
  onSecondPrintAction(ActionResult) {
    let SaveMode = true;
    if (ActionResult === 'YES') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetMinutesReportPDFContent(
        this.OrderCommitionID,
        this.ProductRequestObject.CostFactorID,
        this.ProductRequestObject.RegionCode,
        56,
        this.HasTripleReport,
        SaveMode,
        null,
        null,
        null,
        !isNullOrUndefined(this.PrintTypeParams.selectedObject) ? this.PrintTypeParams.selectedObject : null
      ).subscribe(res => { });
    }
    this.print();
    this.OnPrintEvent = false;
  }
  onChangeCommition(CommitionCode) {
    this.CommitionMemberParams.selectedObject = null;
    const Codes = [];
    this.OrderCommitionObject.OrderCommitionMemberList.forEach(item => {
      Codes.push(item.ActorID);
    });
    this.ProductRequest.GetCommitionMemberList(CommitionCode, this.ProductRequestObject.RegionCode, Codes).subscribe(res => {
      this.CommitionMemberItems = res;
      if (Codes != null) {
        this.CommitionMemberParams.selectedObject = Codes;
      }
    });
  }
  OnOpenNgCommitionMember() {
    this.ProductRequest.GetCommitionMemberList(this.CommitionParams.selectedObject, this.ProductRequestObject.RegionCode).subscribe(res => {
      this.CommitionMemberItems = res;
    });
  }
  onExpertOpen(type = 0) {
    this.Actor.GetPersonList(972, null, this.ProductRequestObject.RegionCode, true).subscribe(res => {
      this.ExpertItems = res;
      if (type === 1 && this.ProductRequestObject) {
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetCommitionExpertPerson(this.ProductRequestObject.CostFactorID).subscribe(ress => {
          if (ress) {
            this.ExpertParams.selectedObject = ress;
          } else if (res && !ress && this.PopupParam.ModuleViewTypeCode === 96) {
            const person = res.find(x => x.IsCurrentUser);
            if (person) {
              this.ExpertParams.selectedObject = person.ActorId;
            }

          }
        });
      }
    }); // 972 کارشناس امور قرارداد ها
  }
  onExpertpersonChanged(param) {
    if (!param) {
      this.ExpertParams.selectedObject = (undefined);
    } else {
      this.ExpertParams.selectedObject = param;
    }
  }
  IsMultiContractRadioClick(IsMultiContract) {
    this.IsMultiContract = IsMultiContract;
  }
  onWarrantyItemClick() {
    this.type = 'warranty-item';
    this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 108;
    this.startTopPosition = 45;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = 60;
    // this.PercentWidth = 94;
    this.PixelWidth = 1140;
    this.OverMainMinwidthPixel = null;
    this.MainMaxwidthPixel = 2000;
    this.MinHeightPixel = 200;
    this.PixelHeight = 590;
    this.ParamObj = {
      HeaderName: 'اقلام تضمین',
      CostFactorID: this.ProductRequestObject.CostFactorID,
      OrderCommitionID: this.OrderCommitionID,
      ProductRequestObject: this.ProductRequestObject,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      currentRegionObject: this.PopupParam.currentRegionObject,
      HasWarrantyItem: this.IsReadOnly || (this.PopupParam.ModuleViewTypeCode === 100001 ||
        this.PopupParam.OriginModuleViewTypeCode === 500000) ? true : false,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
    };
  }
  onCoefClick() {
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      CheckRegionWritable: this.CheckRegionWritable
    };
    this.isClicked = true;
    this.type = 'product-request-coef';
    this.OverMainMinwidthPixel = null;
    this.MainMaxwidthPixel = null;
    this.startLeftPosition = 74;
    this.startTopPosition = 19;
  }
  OnCheckBoxChange(event) {
    this.IsPriceExtended = event;
  }
  OnDecryptFiles() {
    if (!this.SelectedProposal || !this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('شرکت کننده مورد نظر را انخاب نمایید');
      return;
    }
    this.ParamObj = {
      ProposalID: this.SelectedProposal.ProposalID,
      OrderCommitionID: this.OrderCommitionID,
      ProductRequestObject: this.ProductRequestObject
    };
    this.isClicked = true;
    this.type = 'reopening-tender-envekopes';
    this.OverMainMinwidthPixel = null;
    this.MainMaxwidthPixel = null;
    this.startLeftPosition = 280;
    this.startTopPosition = 100;
  }
  OnDownloadDoc(HaveEncrypt, ProposalID) {
    if (!HaveEncrypt) {
      this.type = 'archive-details';
      this.HaveHeader = true;
      this.OverMainMinwidthPixel = null;
      this.MainMaxwidthPixel = null;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.ParamObj = {
        EntityID: ProposalID,
        TypeCodeStr: '170-',
        DocTypeCode: 170,
        ModuleCode: 2730,
        DocumentTypeCodeList: [],
        RegionCode: this.ProductRequestObject.RegionCode,
      };
    }
  }
  onDigitalSingClick() {
    if ((this.OrdersObject.LastInquiryObject == null || isNullOrUndefined(this.OrdersObject.LastInquiryObject.DocumentDeadline))
      && this.HasTripleReport) {
      this.ShowMessageBoxWithOkBtn('به علت مشخص نشدن تاریخ مهلت دریافت اسناد، امکان امضا وجود ندارد.');
    } else {
      this.type = 'global-choose-page';
      this.HaveHeader = true;
      this.HaveMaxBtn = false;
      this.PixelWidth = null;
      this.startLeftPosition = 520;
      this.startTopPosition = 220;
      this.HeightPercentWithMaxBtn = null;
      this.MinHeightPixel = null;
      this.isClicked = true;
      this.ParamObj = {
        HeaderName: 'انتخاب نوع فایل',
        ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
        ModuleCode: this.PopupParam.ModuleCode,
        RadioItems: [
          {
            title: 'نسخه نهایی',
            type: 2
          },
        ]
      };
    }
  }

  getExpertCoef(ExpertCoef) {
    this.ExpertCoef = ExpertCoef;
  }
  rdoIsMaterialsDifferenceClick(IsMaterialsDifference) {
    this.IsMaterialsDifference = IsMaterialsDifference;
  }
  rdoHaveMaterialsClick(HaveMaterials) {
    this.HaveMaterials = HaveMaterials;
  }
  InitOrderCommitionObject() {
    this.RowData = this.InquiryObject.ProposalList;
    this.ProductRequest.GetCommitionList().subscribe(res => {
      this.CommitionItems = res;
      this.CommitionParams.selectedObject = this.OrderCommitionObject.CommitionCode;
    });
    this.onChangeCommition(this.OrderCommitionObject.CommitionCode);
    this.onChangeViewTypeChange(99999);
    this.CommitionDate = this.OrderCommitionObject.ShortCommitionDate;
    this.CommitionNo = this.OrderCommitionObject.CommitionNo;
    this.HaveDigitalSign = this.OrderCommitionObject.HaveDigitalSign;
    this.CommitionSubject = this.OrderCommitionObject.Subject;
    this.ChooseContractor = this.OrderCommitionObject.ChooseContractor;
    this.OrderCommitionID = this.OrderCommitionObject.OrderCommitionID;
    this.SecurityPermissionNo = this.OrderCommitionObject.SecurityPermissionNo;
    this.SecurityPermissionDate = this.OrderCommitionObject.ShortSecurityPermissionDate;
    this.ExpertCoef = this.OrderCommitionObject.ExpertCoef;
    this.ExpertAmount = this.OrderCommitionObject.ExpertAmount;
    this.IsPriceExtended = this.OrderCommitionObject.IsPriceExtended;
    this.IsAcceptWorkDone = this.OrderCommitionObject.IsAcceptWorkDone;
    this.Result = this.OrderCommitionObject.Result;
    this.DocUploadEnabled = false;
    this.IsDisableJobCategory = true;
    this.PriceInNewsPaper = this.OrderCommitionObject.PriceInNewsPaper;
    if (this.OrderCommitionID) { // RFC 60055
      this.IsDisable = false;
    }
  }
  onShowContractorDetailsClick() {
    if (!this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }
    if (this.SelectedProposal.PersonTypeCode === 1) { //RFC 53456
      this.type = 'person2';
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 15;
      this.PercentWidth = 98;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 645;
      this.ParamObj = {
        ActorId: this.SelectedProposal.ActorID,
        ObjectID: this.SelectedProposal.ActorID,
        ModuleViewTypeCode: 300000, // RFC 54203
        HeaderName: 'تامین کننده حقیقی',
      };
    } else {
      this.type = 'corporate2';
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 20;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 645;
      this.PercentWidth = 98;
      this.OverMainMinwidthPixel = 1300;

      this.ParamObj = {
        CorporateID: this.SelectedProposal.ActorID,
        ObjectID: this.SelectedProposal.ActorID,
        ModuleViewTypeCode: 300000, // RFC 54203
        HeaderName: 'تامین کننده حقوقی',
      };
    }
    // tslint:disable-next-line: max-line-length
    // this.ProductRequest.FindContractorGUIDByActorID(this.SelectedProposal.ActorID).subscribe(res => {
    //   window.open('http://contracts.tehran.iri/DesktopModules/Contract/Controls/Contractors/ContractorInfo/?Param=' + res, '_blank');
    // });
  }
  onShowContractorClick() { // LocalProvider
    if (!this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }

    if (this.SelectedProposal.PersonaActorType === 1) {
      this.type = 'person2';
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 100;
      this.OverMainMinwidthPixel = 1300;

    } else {
      this.type = 'corporate2';
      this.startLeftPosition = 30;
      this.startTopPosition = 10;
      this.HeightPercentWithMaxBtn = 100; //  مقذار دهی در html
      this.OverMainMinwidthPixel = 1297; //  مقذار دهی در html
    }
    this.isClicked = true;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 645;
    this.ParamObj = {
      IdentityNo: this.SelectedProposal.IdentityNo,
      ModuleViewTypeCode: 100000
    };
  }
  onShowFormulaValuesPage() {
    if ((this.OrdersObject.LastInquiryObject == null || isNullOrUndefined(this.OrdersObject.LastInquiryObject.DocumentDeadline))
      && this.HasTripleReport) {
      this.ShowMessageBoxWithOkBtn('به علت مشخص نشدن تاریخ مهلت دریافت اسناد، امکان مشاهده جزییات چاپ وجود ندارد.');
    } else {
      this.type = 'adjustment-price-range-formulas-page';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 135;
      this.startTopPosition = 50;
      this.HaveMaxBtn = false;
      this.HeightPercentWithMaxBtn = 60;
      // this.PercentWidth = 94;
      this.PixelWidth = 1140;
      this.OverMainMinwidthPixel = 1140;
      this.MainMaxwidthPixel = 1200;
      this.MinHeightPixel = 200;
      this.PixelHeight = 800;
      this.ParamObj = {
        HeaderName: 'جزییات متغیرهای صورتجلسه',
        ProductRequestObject: this.ProductRequestObject,
        OrderCommitionID: this.OrderCommitionID,
      };
    }
  }
  onShowFormulaValues() {
    this.type = 'adjustment-price-range-formulas';
    this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 360;
    this.startTopPosition = 100;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = 60;
    // this.PercentWidth = 94;
    this.PixelWidth = 600;
    this.OverMainMinwidthPixel = 600;
    this.MainMaxwidthPixel = 600;
    this.MinHeightPixel = 200;
    this.PixelHeight = 400;
    this.ParamObj = {
      HeaderName: 'جزییات متغیرهای صورتجلسه',
      ProductRequestObject: this.ProductRequestObject,
      OrderCommitionID: this.OrderCommitionID,
    };
  }
  onPrintCartClick(event) {
    if (!this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }
    this.Report.CorporateRep(
      this.SelectedProposal.PersonaActorType === 1 ? 2784 : 2785, // RFC 53584
      event.ActorID,
      'چاپ کارت پیمانکاری'
    );
  }
  onTenderInfoSummRepClick() { // RFC 54208 / 53654

    if (this.HasTripleReport) {
      // tslint:disable-next-line:max-line-length
      this.Report.TenderInfoSummReport(this.ProductRequestObject.CostFactorID, this.OrderCommitionID, 2730, this.ProductRequestObject.RegionCode, 'خلاصه اطلاعات مناقصه');
    } else {
      this.ShowMessageBoxWithOkBtn('نمایش این گزارش برای این واحد امکان پذیر نمی باشد.');
    }
  }
  SignFinal(ReSaveArchive) {
    const UrbanRepType = this.PrintTypeParams.selectedObject ? this.PrintTypeParams.selectedObject : 0; // RFC 65707
    this.ProductRequest.GetMinutesReportPDFContent(
      this.OrderCommitionID,
      this.ProductRequestObject.CostFactorID,
      this.ProductRequestObject.RegionCode,
      661,
      this.HasTripleReport,
      ReSaveArchive,
      null,
      null,
      null,
      UrbanRepType).subscribe(PDFRes => {
        this.type = 'pdf-viewer';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 0;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = 1295;
        this.MainMaxwidthPixel = 1300;
        this.ParamObj = {
          HeaderName: 'چاپ نهایی صورتجلسه',
          PDFSrc: PDFRes.FileBase64,
          FileName: PDFRes.FileName,
          OrderCommitionID: this.OrderCommitionID,
          HaveEstimate: false,
          HaveSign: true,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RegionCode: this.ProductRequestObject.RegionCode,
          PDFSignersInfo: PDFRes.PDFSignersInfo,
          HasTripleReport: this.HasTripleReport,
          IsFinal: true, // نهایی
          HasDelBtn: false,
          IsArticle18: false,
        };
      });
    this.OnSignPrintEvent = false;
  }
  SignDraft(ReSaveArchive) {
    this.ProductRequest.GetMinutesReportPDFContent(
      this.OrderCommitionID,
      this.ProductRequestObject.CostFactorID,
      this.ProductRequestObject.RegionCode,
      601,
      this.HasTripleReport,
      ReSaveArchive).subscribe(PDFRes => {
        this.type = 'pdf-viewer';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 0;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = 1295;
        this.MainMaxwidthPixel = 1300;
        this.ParamObj = {
          HeaderName: 'چاپ پیش نویس صورتجلسه',
          PDFSrc: PDFRes.FileBase64,
          FileName: PDFRes.FileName,
          OrderCommitionID: this.OrderCommitionID,
          HaveEstimate: false,
          HaveSign: true,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RegionCode: this.ProductRequestObject.RegionCode,
          PDFSignersInfo: PDFRes.PDFSignersInfo,
          HasTripleReport: this.HasTripleReport,
          IsFinal: false, // پیش نویس
          HasDelBtn: false,
          IsArticle18: false,
        };
      });
    this.OnSignPrintEvent = false;
  }
  LoadFileForSign(Type) {
    this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, Type === 3 ? 1047 : 661, true).subscribe(res => {
      // if (res) {
      this.type = 'pdf-viewer';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 40;
      this.startTopPosition = 0;
      this.HaveMaxBtn = false;
      this.OverMainMinwidthPixel = 1295;
      this.MainMaxwidthPixel = 1300;
      this.ParamObj = {
        HeaderName: Type === 3 ? 'چاپ ابلاغ ماده 18' : 'چاپ صورتجلسه',
        PDFSrc: res ? res.FileBase64 : undefined,
        FileName: res ? res.FileName : null,
        OrderCommitionID: this.OrderCommitionID,
        HaveEstimate: false,
        HaveSign: !this.HaveShowSign,
        CostFactorID: this.ProductRequestObject.CostFactorID,
        RegionCode: this.ProductRequestObject.RegionCode,
        PDFSignersInfo: res ? res.PDFSignersInfo : null,
        HasTripleReport: this.HasTripleReport,
        IsFinal: Type === 2,
        HaveUpload: !res || !res.PDFSignersInfo || res.PDFSignersInfo.length <= 0 && (!this.HaveShowSign),
        SignByFile: false,
        HasDelBtn: false,
        IsArticle18: false,
      };
      // } else {
      //   this.ShowMessageBoxWithOkBtn('فایل بارگزاری نشده است.');
      // }
    });
  }
  onLoadRepForSingClick() {
    this.type = 'global-choose-page';
    this.ClickedName = 'load-file-digital-sign';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.PixelWidth = null;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.isClicked = true;
    this.ParamObj = {
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      ModuleCode: this.PopupParam.ModuleCode,
      HeaderName: 'انتخاب نوع فایل',
      RadioItems: this.BtnSignName === 'مشاهده نسخ الکترونیک صورتجلسه' ?
        [
          {
            title: this.HaveShowSign ? 'مشاهده نسخه نهایی' : 'امضای نسخه نهایی',
            type: 2
          },
          {
            title: this.HaveShowSign ? 'مشاهده ابلاغ ماده 18' : 'امضای ابلاغ ماده 18',
            type: 3
          }
        ]
        :
        [
          {
            title: this.HaveShowSign ? 'مشاهده نسخه نهایی' : 'امضای نسخه نهایی',
            type: 2
          },
        ]
    };
  }
  HaveDigitalSignClick(event) {
    this.HaveDigitalSign = event;
  }
  onChangeViewTypeChange(ModuleViewTypeCode = null) {
    if (this.PopupParam && this.PopupParam.ModuleViewTypeCode) {
      if (this.PopupParam.OrginalModuleCode === 2824) {
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 11:
          case 160:
          case 162:
            this.onExpertOpen(1);
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            this.IsType11 = true;
            // this.DisabledCommitionType = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
            this.HaveExpertPerson = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50728
            this.BtnPropsalItemName = 'پیشنهاد طرف قرارداد'; // RFC 58808
            break;
          case 155:
            this.onExpertOpen(1);
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            this.IsType11 = true;
            this.HaveExpertPerson = true;
            // tslint:disable-next-line: max-line-length
            this.IsYes = true;
            this.BtnPropsalItemName = 'پیشنهاد طرف قرارداد'; // RFC 58808
            this.EditableColumns = true;
            break;
          case 17:
          case 116:
            this.onExpertOpen(1);
            this.HaveExpertPerson = true;
            this.FilterDocumentTypeCodeList.push(48);
            this.HaveSetWinner = false;
            this.WfWinnerHeight = 175;
            if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9) {
              this.WfQuestionLabel = 'آیا ترک تشریفات برنده دارد؟';
            }
            // tslint:disable-next-line: triple-equals
            if (this.ProductRequestObject.RegionCode == 200 || this.ProductRequestObject.RegionCode == 0) { // RFc 49788
              this.WinnerQuestion = null;
              this.HasWarrantyItem = true;
              this.HaveSetWinner = true;
            }
            break;
          case 47:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // RFC 54283
              this.IsDisplayJobCategory = true;
            }
            if (this.PopupParam && this.PopupParam.OriginModuleViewTypeCode === 300000) {
              this.HaveAgent = true; // RFC 61802
              this.onAgentOpen(1);
              this.IsAgentDisable = true;
            }
            break;
          case 149:
            if (this.ProductRequestObject.RegionCode === 222) {
              this.BtnPropsalItemName = 'ب - بازگشایی مشخصات شرکت';
            }
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // RFC 54283
              this.IsDisplayJobCategory = true;
            }
            if (this.ProductRequestObject.RegionCode === 222) {
              this.DisplayGBtn = true;
            }
            break;
          case 112:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            break;
          case 18:
            this.WinnerQuestion = null;
            if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9) {
              this.WfQuestionLabel = 'آیا ترک تشریفات برنده دارد؟';
            }
            break;
          case 26:
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = false;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.WfQuestionLabel = undefined;
            this.HaveSecurityDetails = false;
            this.WorkDoneQuestionLabel = 'آیا انجام کار توسط کمیسیون تایید گردید؟';
            this.WinnerQuestion = null;
            this.IsEnable = false;
            this.IsExpertCoef = false;
            break;
          case 37: // RFC 50573
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 200;
            this.WfQuestionLabel = undefined;
            this.WinnerQuestion = 'آیا برنده دارد؟';
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
            break;
          case 107:
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 200;
            this.WfQuestionLabel = undefined;
            this.WinnerQuestion = 'آیا برنده دارد؟';
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50728
            break;
          case 49:
            this.HaveSetWinner = false;
            this.IsEnable = false;
            this.WinnerQuestion = null;
            this.IsWFDisable = true; // به درخواست خانم قربانزاده
            this.IsType49 = true; // به درخواست خانم قربانزاده
            this.IsnotActiveBtnSave = false; // به درخواست خانم قربانزاده
            // this.DocUploadEnabled = true; // به درخواست خانم قربانزاده
            break;
          case 53:
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50728
            break;
          case 68:
            this.EditableColumns = true; // RFC 61165
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.HaveSetWinner = true;
            this.HaveExpertPerson = true;
            this.WfQuestionLabel = null; // RFC 50573
            this.WfWinnerQuestionLabel = 'آیا مزایده برنده دارد؟'; // RFC 50573
            this.WfWinnerHeight = 175;
            this.onExpertOpen(1);
            this.HasWarrantyItem = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50573
            break;
          case 72:
          case 185:
          case 110: // RFC 50951
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.UnlockTechnicalArchive = false;
            this.onExpertOpen(1);
            this.WinnerQuestion = 'آیا استعلام برنده دارد؟';
            this.HaveSetWinner = true; // به درخواست خانم قربانزاده
            this.WfWinnerHeight = 155;
            this.IsExpertCoef = false;
            // this.IsYes = false;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            break;
          case 96: //
            this.WinnerQuestion = null;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.HasWarrantyItem = this.IsExpertCoef = false;
            this.BtnPropsalItemName = 'پیشنهاد';
            //  this.HasMaterialsDifference = true; // RFC 49812
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.HasnotOrder = true;
            break;
          case 120: // RFC 52874
          case 106:
            this.IsYes = this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = false;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.WfQuestionLabel = undefined;
            this.HaveSecurityDetails = false;
            this.WorkDoneQuestionLabel = 'آیا انجام کار توسط کمیسیون تایید گردید؟';
            this.WinnerQuestion = null;
            this.IsEnable = false;
            this.IsExpertCoef = false;
            break;
          case 113:
            this.EditableColumns = true;
            break;
          case 100000:
            this.HasWarrantyItem = true;
            this.IsDisplayJobCategory = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50728
            break;
          case 100001: // مشاهده کمیسیون در ماژول اصلاح درخواست معامله
            this.IsnotActiveBtnSave = false;
            this.CheckRegionWritable = false;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.IsWFDisable = this.IsType49 = true;
            this.InquiryObject = this.PopupParam.InquiryObject;
            this.OrderCommitionObject = this.InquiryObject.OrderCommitionObject;
            this.IsDisplayJobCategory = true;
            break;
          case 100002: // gharardade chabok;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.WinnerQuestion = null;
            break;
          case 300000:
            this.IsnotActiveBtnSave = true; // RFC = 53690
            this.CheckRegionWritable = false;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.IsDisplayJobCategory = true;
            break;
          case 400000: // جستجو پیشرفته
            this.IsShowReport = false;
            this.IsnotActiveBtnSave = false;
            this.IsWFDisable = true;
            this.IsType49 = true;
            this.IsDisplayJobCategory = true;
            break; // RFC 52811
          case 500000: //  حالت فقط خواندنی
            this.IsShowReport = false;
            this.IsnotActiveBtnSave = false;
            this.IsWFDisable = true;
            this.IsType49 = true;
            this.IsDisplayJobCategory = true;
            this.HaveSave = false;
            break; // RFC 52811
          case 140:
          case 144:
          case 161:
          case 178:
          case 179:
            this.IsShowReport =
              this.HaveSave =
              this.IsnotActiveBtnSave =
              this.IsWFDisable =
              this.HasWarrantyItem =
              this.HaveSign =
              this.DisplayCompletionContractInfo =
              this.IsType49 = false;
            this.IsDisplayJobCategory = true;
            break;
          case 123: // RFC 53953
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.UnlockTechnicalArchive = true;
            this.onExpertOpen(1);
            this.WinnerQuestion = 'آیا استعلام برنده دارد؟';
            this.HaveSetWinner = true; // به درخواست خانم قربانزاده
            this.WfWinnerHeight = 155;
            this.IsExpertCoef = false;
            // this.IsYes = false;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            this.BtnPropsalItemName = 'جزئیات مبلغ پیشنهادی پیمانکار';
            break;
          case 110000:
            // tslint:disable-next-line:max-line-length
            this.InquiryObject = this.PopupParam.InquiryObject && this.PopupParam.InquiryObject.InquiryID > 0 ? this.PopupParam.InquiryObject : null;
            this.IsInquriyID = this.PopupParam.InquiryObject && this.PopupParam.InquiryObject.InquiryID > 0 ? false : true;
            this.OrdersObject = this.PopupParam.OrderObj;
            this.HasnotOrder = this.OrdersObject ? false : true;
            // tslint:disable-next-line:max-line-length
            this.OrderCommitionObject = this.InquiryObject && this.InquiryObject.OrderCommitionObject ? this.InquiryObject.OrderCommitionObject : null;
            this.ProductRequestItemID = this.PopupParam.ProductRequestItemID;
            this.IsCompletionContractInfo = this.OrderCommitionObject ? true : false;
            break;
          default:
            break;
        }
        if (this.PopupParam && this.PopupParam.OriginModuleViewTypeCode) {
          if (this.PopupParam.OriginModuleViewTypeCode === 500000) {
            this.HaveSave = false;
            this.DisplayBtnElectronicFilse = false;
            this.IsWFDisable = true;
            this.HasWarrantyItem = false;
            this.IsCompletionContractInfo = true;
          }
        }
      } else if (this.PopupParam.ModuleCode === 2739) {
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 1:
          case 113:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            break;
          case 11:
          case 160:
          case 162:
            this.onExpertOpen(1);
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            this.IsType11 = true;
            // this.DisabledCommitionType = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
            this.HaveExpertPerson = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50728
            this.IsChabokContractModuleViewType11 = true;
            break;
          case 155:
            this.onExpertOpen(1);
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            this.IsType11 = true;
            // this.DisabledCommitionType = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
            this.HaveExpertPerson = true;
            // tslint:disable-next-line: max-line-length
            this.IsYes = true;
            this.IsChabokContractModuleViewType11 = true;
            this.EditableColumns = true;
            break;
          case 17:
          case 116:
            this.onExpertOpen(1);
            this.HaveExpertPerson = true;
            this.FilterDocumentTypeCodeList.push(48);
            this.HaveSetWinner = false;
            this.WfWinnerHeight = 175;
            if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9) {
              this.WfQuestionLabel = 'آیا ترک تشریفات برنده دارد؟';
            }
            // tslint:disable-next-line: triple-equals
            if (this.ProductRequestObject.RegionCode == 200 || this.ProductRequestObject.RegionCode == 0) { // RFc 49788
              this.WinnerQuestion = null;
              this.HasWarrantyItem = true;
              this.HaveSetWinner = true;
            }
            break;
          case 47:
          case 112:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            break;
          case 149:
            if (this.ProductRequestObject.RegionCode === 222) {
              this.BtnPropsalItemName = 'ب - بازگشایی مشخصات شرکت';
            }
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            if (this.ProductRequestObject.RegionCode === 222) {
              this.DisplayGBtn = true;
            }
            break;
          case 18:
            this.WinnerQuestion = null;
            if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9) {
              this.WfQuestionLabel = 'آیا ترک تشریفات برنده دارد؟';
            }
            break;
          case 26:
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = false;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.WfQuestionLabel = undefined;
            this.HaveSecurityDetails = false;
            this.WorkDoneQuestionLabel = 'آیا انجام کار توسط کمیسیون تایید گردید؟';
            this.WinnerQuestion = null;
            this.IsEnable = false;
            this.IsExpertCoef = false;
            break;
          case 37: // RFC 50573
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 200;
            this.WfQuestionLabel = undefined;
            this.WinnerQuestion = 'آیا برنده دارد؟';
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
            break;
          case 107:
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 200;
            this.WfQuestionLabel = undefined;
            this.WinnerQuestion = 'آیا برنده دارد؟';
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50728
            break;
          case 49:
            this.HaveSetWinner = false;
            this.IsEnable = false;
            this.WinnerQuestion = null;
            this.IsWFDisable = true; // به درخواست خانم قربانزاده
            this.IsType49 = true; // به درخواست خانم قربانزاده
            this.IsnotActiveBtnSave = false; // به درخواست خانم قربانزاده
            // this.DocUploadEnabled = true; // به درخواست خانم قربانزاده
            break;
          case 53:
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50728
            break;
          case 68:
            this.EditableColumns = true; // RFC 61165
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.HaveSetWinner = true;
            this.HaveExpertPerson = true;
            this.WfQuestionLabel = null; // RFC 50573
            this.WfWinnerQuestionLabel = 'آیا مزایده برنده دارد؟'; // RFC 50573
            this.WfWinnerHeight = 175;
            this.onExpertOpen(1);
            this.HasWarrantyItem = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50573
            break;
          case 72:
          case 185:
          case 110: // RFC 50951
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.UnlockTechnicalArchive = false;
            this.onExpertOpen(1);
            this.WinnerQuestion = 'آیا استعلام برنده دارد؟';
            this.HaveSetWinner = true; // به درخواست خانم قربانزاده
            this.WfWinnerHeight = 155;
            this.IsExpertCoef = false;
            // this.IsYes = false;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            break;
          case 96: //
            this.WinnerQuestion = null;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.HasWarrantyItem = this.IsExpertCoef = false;
            this.BtnPropsalItemName = 'پیشنهاد';
            //  this.HasMaterialsDifference = true; // RFC 49812
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.HasnotOrder = true;
            break;
          case 120: // RFC 52874
          case 106:
            this.IsYes = this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = false;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.WfQuestionLabel = undefined;
            this.HaveSecurityDetails = false;
            this.WorkDoneQuestionLabel = 'آیا انجام کار توسط کمیسیون تایید گردید؟';
            this.WinnerQuestion = null;
            this.IsEnable = false;
            this.IsExpertCoef = false;
            break;
          case 100000:
            this.HasWarrantyItem = true;
            this.IsDisplayJobCategory = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50728
            break;
          case 100001: // مشاهده کمیسیون در ماژول اصلاح درخواست معامله
            this.IsnotActiveBtnSave = false;
            this.CheckRegionWritable = false;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.IsWFDisable = this.IsType49 = true;
            this.InquiryObject = this.PopupParam.InquiryObject;
            this.OrderCommitionObject = this.InquiryObject.OrderCommitionObject;
            break;
          case 100002: // gharardade chabok;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.WinnerQuestion = null;
            break;
          case 300000:
            this.IsnotActiveBtnSave = false;
            this.CheckRegionWritable = false;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.IsDisplayJobCategory = true;
            break;
          case 400000: // جستجو پیشرفته
            this.IsShowReport = false;
            this.IsnotActiveBtnSave = false;
            this.IsWFDisable = true;
            this.IsType49 = true;
            this.HasWarrantyItem = true; // RFC 53678
            this.IsDisplayJobCategory = true;
            break; // RFC 52811
          case 500000: //  جستجو محدود
            this.IsShowReport = false;
            this.IsnotActiveBtnSave = false;
            this.IsWFDisable = true;
            this.IsType49 = true;
            this.HasWarrantyItem = true; // RFC 53678
            this.IsDisplayJobCategory = true;
            break; // RFC 52811
          case 110000:
            // tslint:disable-next-line:max-line-length
            this.InquiryObject = this.PopupParam.InquiryObject && this.PopupParam.InquiryObject.InquiryID > 0 ? this.PopupParam.InquiryObject : null;
            this.IsInquriyID = this.PopupParam.InquiryObject && this.PopupParam.InquiryObject.InquiryID > 0 ? false : true;
            this.OrdersObject = this.PopupParam.OrderObj;
            this.HasnotOrder = this.OrdersObject ? false : true;
            // tslint:disable-next-line:max-line-length
            this.OrderCommitionObject = this.InquiryObject && this.InquiryObject.OrderCommitionObject ? this.InquiryObject.OrderCommitionObject : null;
            this.ProductRequestItemID = this.PopupParam.ProductRequestItemID;
            this.IsCompletionContractInfo = this.OrderCommitionObject ? true : false;
            break;
          default:
            break;
        }
      } else if (this.PopupParam.ModuleCode === 3094) {

        switch (this.PopupParam.ModuleViewTypeCode) {
          case 7:
            this.IsExpertCoef = this.HaveSign = false;
            this.WorkDoneQuestionLabel = null;
            this.HaveMultiContract = this.WinnerQuestion = false;
            this.HasSign = false;
            this.HaveAgent = this.HasMultiContract = false;
            this.HaveSecurityDetails = this.HaveExpertPerson = this.HasChooseContractor = false;
            this.HasContractorBtn = false;
            this.WfWinnerHeight = 300;
            break;
          default:
            break;
        }

      } else {
        switch (this.PopupParam.ModuleViewTypeCode) {
          case 11:
          case 160:
          case 162:
            this.onExpertOpen(1);
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            this.IsType11 = true;
            // this.DisabledCommitionType = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
            this.HaveExpertPerson = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50728
            this.BtnPropsalItemName = 'پیشنهاد طرف قرارداد'; // RFC 58808
            break;
          case 155:
            this.onExpertOpen(1);
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            this.IsType11 = true;
            // this.DisabledCommitionType = true;  RFC: 58690 همراه با اوتلوک 2021/01/27
            this.HaveExpertPerson = true;
            // tslint:disable-next-line: max-line-length
            this.IsYes = true;
            this.BtnPropsalItemName = 'پیشنهاد طرف قرارداد'; // RFC 58808
            this.EditableColumns = true;
            this.HasnotOrder = this.IsInquriyID = this.ProductRequestObject.ConsultantSelectTypeCode === 3 && // RFC 59920
              this.ProductRequestObject.RegionCode === 222 && this.ProductRequestObject.DealMethodCode === 11 ? true : false;
            break;
          case 17:
          case 116:
            this.onExpertOpen(1);
            this.HaveExpertPerson = true;
            this.FilterDocumentTypeCodeList.push(48);
            this.HaveSetWinner = false;
            this.WfWinnerHeight = 175;
            if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9) {
              this.WfQuestionLabel = 'آیا ترک تشریفات برنده دارد؟';
            }
            // tslint:disable-next-line: triple-equals
            if (this.ProductRequestObject.RegionCode == 200 || this.ProductRequestObject.RegionCode == 0) { // RFc 49788
              this.WinnerQuestion = null;
              this.HasWarrantyItem = true;
              this.HaveSetWinner = true;
            }
            break;
          case 47:
          case 183:
          case 166:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // RFC 54283
              this.IsDisplayJobCategory = true;
            }
            if ((this.PopupParam && this.PopupParam.ModuleViewTypeCode === 166) || (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 47
              && this.PopupParam.OrginalModuleCode === 2793 && this.PopupParam.OriginModuleViewTypeCode === 100000) || (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 183)) {
              this.HaveAgent = true; // RFC 61662 & 61802
              this.onAgentOpen(1);
              this.ShowAgentSaveBtn = true;
            }
            break;
          case 149:
            if (this.ProductRequestObject.RegionCode === 222) {
              this.BtnPropsalItemName = 'ب - بازگشایی مشخصات شرکت';
            }
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // RFC 54283
              this.IsDisplayJobCategory = true;
            }
            if (this.ProductRequestObject.RegionCode === 222) {
              this.DisplayGBtn = true;
            }
            break;
          case 112:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            // RFC 49812 پیرو همین درخواست گفته شده بود اگر عمرانی است نمایش درحالی که کلا نمایش داده میشد و باعث ایجاد درخواست های دیگر شد
            this.onExpertOpen(1);
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟'; // RFC 50573
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            break;
          case 18:
            this.WinnerQuestion = null;
            if (this.ProductRequestObject.DealMethodCode === 4 || this.ProductRequestObject.DealMethodCode === 9) {
              this.WfQuestionLabel = 'آیا ترک تشریفات برنده دارد؟';
            }
            break;
          case 26:
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = false;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.WfQuestionLabel = undefined;
            this.HaveSecurityDetails = false;
            this.WorkDoneQuestionLabel = 'آیا انجام کار توسط کمیسیون تایید گردید؟';
            this.WinnerQuestion = null;
            this.IsEnable = false;
            this.IsExpertCoef = false;
            break;
          case 37: // RFC 50573
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 200;
            this.WfQuestionLabel = undefined;
            this.WinnerQuestion = 'آیا برنده دارد؟';
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
            break;
          case 107:
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 200;
            this.WfQuestionLabel = undefined;
            this.WinnerQuestion = 'آیا برنده دارد؟';
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50728
            break;
          case 49:
            this.HaveSetWinner = false;
            this.IsEnable = false;
            this.WinnerQuestion = null;
            this.IsWFDisable = true; // به درخواست خانم قربانزاده
            this.IsType49 = true; // به درخواست خانم قربانزاده
            this.IsnotActiveBtnSave = false; // به درخواست خانم قربانزاده
            // this.DocUploadEnabled = true; // به درخواست خانم قربانزاده
            break;
          case 53:
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveSetWinner = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50728
            break;
          case 68:
          case 169: // RFC 61935
            this.EditableColumns = true; // RFC 61165 , اوتلوک خانم احمدی
            this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.HaveSetWinner = true;
            this.HaveExpertPerson = true;
            this.WfQuestionLabel = null; // RFC 50573
            this.WfWinnerQuestionLabel = 'آیا مزایده برنده دارد؟'; // RFC 50573
            this.WfWinnerHeight = 175;
            this.onExpertOpen(1);
            this.HasWarrantyItem = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50573
            if (this.PopupParam.ModuleViewTypeCode === 169 ||
              (this.PopupParam.ModuleViewTypeCode === 68 && this.PopupParam.OriginModuleViewTypeCode === 100000)) { // RFC 62063
              this.HaveAgent = true;
              this.onAgentOpen(1);
              this.ShowAgentSaveBtn = true;
            }
            break;
          case 72:
          case 185:
          case 110: // RFC 50951
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.UnlockTechnicalArchive = false;
            this.onExpertOpen(1);
            this.WinnerQuestion = 'آیا استعلام برنده دارد؟';
            this.HaveSetWinner = true; // به درخواست خانم قربانزاده
            this.WfWinnerHeight = 155;
            this.IsExpertCoef = false;
            // this.IsYes = false;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            break;
          case 96: //
            this.WinnerQuestion = null;
            this.IsWFDisable = false;
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.HasWarrantyItem = this.IsExpertCoef = false;
            this.BtnPropsalItemName = 'پیشنهاد';
            //  this.HasMaterialsDifference = true; // RFC 49812
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.HasnotOrder = true;
            break;
          case 120: // RFC 52874
          case 106:
            this.IsYes = this.HaveMultiContract = true;
            this.MultiContractQuestion = 'بیش از یک قرارداد تنظیم گردد؟';
            this.IsMultiContract = this.PopupParam.IsMultiContract;
            this.CostFactorMultiContract = this.PopupParam.CostFactorID;
            this.IsWFDisable = false;
            this.HasWarrantyItem = false;
            this.HaveExpertPerson = true;
            this.HaveSave = true;
            this.onExpertOpen(1);
            this.WfWinnerHeight = 175;
            this.WfQuestionLabel = undefined;
            this.HaveSecurityDetails = false;
            this.WorkDoneQuestionLabel = 'آیا انجام کار توسط کمیسیون تایید گردید؟';
            this.WinnerQuestion = null;
            this.IsEnable = false;
            this.IsExpertCoef = false;
            break;
          case 113:
          case 182:
            this.EditableColumns = true;
            break;
          case 100000:
            this.HasWarrantyItem = true;
            this.IsDisplayJobCategory = true;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.HasWinner = this.ProductRequestObject.HaveWinner : this.HasWinner = true; // RFC 50728
            this.HaveAgent = true; // 62063
            this.onAgentOpen(1);
            this.ShowAgentSaveBtn = true;
            break;
          case 100001: // مشاهده کمیسیون در ماژول اصلاح درخواست معامله
            this.IsnotActiveBtnSave = false;
            this.CheckRegionWritable = false;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.IsWFDisable = this.IsType49 = true;
            this.InquiryObject = this.PopupParam.InquiryObject;
            this.OrderCommitionObject = this.InquiryObject.OrderCommitionObject;
            this.IsDisplayJobCategory = true;
            // RFC 60055
            this.HaveSign = false;
            this.HaveShowSign = true;
            this.BtnSignName = 'مشاهده نسخ الکترونیک صورتجلسه';
            break;
          case 100002: // gharardade chabok;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.WinnerQuestion = null;
            break;
          case 300000:
            this.IsnotActiveBtnSave = true; // RFC = 53690
            this.CheckRegionWritable = false;
            this.HaveSave = true;
            this.HasWarrantyItem = true;
            this.IsDisplayJobCategory = true;
            break;
          case 400000: // جستجو پیشرفته
            this.IsShowReport = false;
            this.IsnotActiveBtnSave = false;
            this.IsWFDisable = true;
            this.IsType49 = true;
            this.IsDisplayJobCategory = true;
            break; // RFC 52811
          case 500000: //  جستجو محدود
            this.IsShowReport = false;
            this.IsnotActiveBtnSave = false;
            this.IsWFDisable = true;
            this.IsType49 = true;
            this.IsDisplayJobCategory = true;
            break; // RFC 52811
          case 140:
          case 144:
          case 161:
          case 178:
          case 179:
            this.IsShowReport =
              this.HaveSave =
              this.IsnotActiveBtnSave =
              this.IsWFDisable =
              this.HasWarrantyItem =
              this.HaveSign =
              this.DisplayCompletionContractInfo =
              this.IsType49 = false;
            this.IsDisplayJobCategory = true;
            break;
          case 123: // RFC 53953
            this.FilterDocumentTypeCodeList.push(48);
            this.FilterDocumentTypeCodeList.push(56);
            this.HaveExpertPerson = true;
            this.HaveSecurityDetails = false;
            this.UnlockTechnicalArchive = true;
            this.onExpertOpen(1);
            this.WinnerQuestion = 'آیا استعلام برنده دارد؟';
            this.HaveSetWinner = true; // به درخواست خانم قربانزاده
            this.WfWinnerHeight = 155;
            this.IsExpertCoef = false;
            // this.IsYes = false;
            // tslint:disable-next-line: max-line-length
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true; // RFC 50573
            this.BtnPropsalItemName = 'جزئیات مبلغ پیشنهادی پیمانکار';
            break;
          case 110000:
            // tslint:disable-next-line:max-line-length
            this.InquiryObject = this.PopupParam.InquiryObject && this.PopupParam.InquiryObject.InquiryID > 0 ? this.PopupParam.InquiryObject : null;
            this.IsInquriyID = this.PopupParam.InquiryObject && this.PopupParam.InquiryObject.InquiryID > 0 ? false : true;
            this.OrdersObject = this.PopupParam.OrderObj;
            this.HasnotOrder = this.OrdersObject ? false : true;
            // tslint:disable-next-line:max-line-length
            this.OrderCommitionObject = this.InquiryObject && this.InquiryObject.OrderCommitionObject ? this.InquiryObject.OrderCommitionObject : null;
            this.ProductRequestItemID = this.PopupParam.ProductRequestItemID;
            this.IsCompletionContractInfo = this.OrderCommitionObject ? true : false;
            break;
          case 156:
            this.EditableColumns = true;
            this.HasWarrantyItem = true;
            this.HaveExpertPerson = true;
            this.IsDisableRaste = true;
            this.IsDisableRank = true;
            this.IsDisablerdoIsMaterials = true
            this.IsDisablerdoHaveMaterials = true;
            this.IsDisableIsMultiYear = true;
            this.HaveSign = this.EditableColumns = this.IsShowReport = this.IsnotActiveBtnSave = false;
            this.HaveShowSign = this.HasWarrantyItem = this.HaveExpertPerson = this.IsWFDisable = this.IsType49 = this.DigitalSignShow = true;
            this.BtnSignName = 'مشاهده نسخ الکترونیک صورتجلسه';
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
            this.ProductRequestObject.HaveWinner !== null ? this.IsYes = this.ProductRequestObject.HaveWinner : this.IsYes = true;
            if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // RFC 54283
              this.IsDisplayJobCategory = true;
            }
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            break;
          case 163:
            this.HaveSign = this.EditableColumns = this.IsShowReport = this.IsnotActiveBtnSave = false;
            this.HaveShowSign = this.HasWarrantyItem = this.HaveExpertPerson = this.IsWFDisable = this.IsType49 = this.DigitalSignShow = true;
            this.BtnSignName = 'مشاهده نسخ الکترونیک صورتجلسه';
            this.WfWinnerHeight = 170;
            this.WinnerQuestion = 'آیا مناقصه عمومی برنده دارد؟';
            if (this.ProductRequestObject.ProductRequestTypeCode === 4) { // RFC 54283
              this.IsDisplayJobCategory = true;
            }
            this.HasMaterialsDifference = this.ProductRequestObject.ProductRequestTypeCode === 1 ? true : false;
            break;
          case 114:
            if (this.ProductRequestObject.DealMethodCode === 11 && this.PopupParam.RegionCode === 222) {
              this.HasnotOrder = true;
            }
            break;
          default:
            break;
        }
      }
    }

    if (this.PopupParam.OrginalModuleCode !== 2793 && ModuleViewTypeCode) {
      switch (ModuleViewTypeCode) {
        case 99999:
          if (this.OrderCommitionObject.OrderCommitionMemberList &&
            this.OrderCommitionObject.OrderCommitionMemberList.length > 0 &&
            this.ProductRequestObject.RegionCode !== 200) {   // 61131 - و اوتلوک در تاریخ 1400/03/08
            this.OrderCommitionObject.OrderCommitionMemberList.forEach(element => {
              if (element.FinalSignDate) {
                this.IsWFDisable = true;
                this.IsnotActiveBtnSave = this.DocUploadEnabled = false;
                this.IsDisableJobCategory = this.IsType49 = true;
                this.IsReadOnly = this.PopupParam.ModuleViewTypeCode === 49 ? false : true; // RFC 61447
              }
            });
          }
          break;
        default:
          break;
      }
    }

  }
  getPriceInNewsPaper(PriceInNewsPaper) {
    this.PriceInNewsPaper = PriceInNewsPaper;
  }

  OnOpenNgSelect(Type, IsFill = true) {
    switch (Type) {
      case 'PriceListTopicRaste':
        if (this.ProductRequestObject.ProductRequestTypeCode === 3) {
          this.Actor.GetPriceListTopicByBusinesPatternID(4924, false).subscribe(res => {
            this.PriceListTopicRasteItems = res;
            if (IsFill) {
              this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
              this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
            }
          });
        } else if (this.ProductRequestObject.ProductRequestTypeCode === 2) {
          this.Actor.GetPriceListTopicByBusinesPatternID(5183, false).subscribe(res => {
            this.PriceListTopicRasteItems = res;
            if (IsFill) {
              this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
            }
          });
        } else {
          this.PriceList.GetPLTListbyPRType(this.ProductRequestObject.ProductRequestTypeCode).subscribe(ress => {
            this.PriceListTopicRasteItems = ress;
            if (IsFill) {
              this.PriceListTopicRasteParams.selectedObject = this.ProductRequestObject.PriceListTopicID;
              this.RankParams.selectedObject = this.ProductRequestObject.GradeID;
            }
          });
        }
        break;
      default:
        break;
    }
  }
  SignArticle18(ReSaveArchive) {
    this.ProductRequest.GetMinutesReportPDFContent(
      this.OrderCommitionID,
      this.ProductRequestObject.CostFactorID,
      this.ProductRequestObject.RegionCode,
      1047,
      this.HasTripleReport,
      ReSaveArchive).subscribe(PDFRes => {
        this.type = 'pdf-viewer';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 0;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = 1295;
        this.MainMaxwidthPixel = 1300;
        this.ParamObj = {
          HeaderName: 'چاپ ابلاغ ماده 18',
          PDFSrc: PDFRes.FileBase64,
          FileName: PDFRes.FileName,
          OrderCommitionID: this.OrderCommitionID,
          HaveEstimate: false,
          HaveSign: true,
          CostFactorID: this.ProductRequestObject.CostFactorID,
          RegionCode: this.ProductRequestObject.RegionCode,
          PDFSignersInfo: PDFRes.PDFSignersInfo,
          HasTripleReport: this.HasTripleReport,
          IsFinal: false,
          IsArticle18: true,
          HasDelBtn: false,
        };
      });
    this.OnSignPrintEvent = false;
  }

  onAgentPersonChanged(event) {
    if (!event) {
      this.AgentParams.selectedObject = (undefined);
    } else {
      this.AgentParams.selectedObject = event;
    }
  }

  onAgentOpen(type = 0) {
    this.Actor.GetPersonList(1520, null, this.ProductRequestObject.RegionCode, true).subscribe(res => {
      this.AgentItems = res;
      if (type === 1 && this.ProductRequestObject) {
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetCommitionAgentPerson(this.ProductRequestObject.CostFactorID).subscribe(ress => {
          if (ress) {
            this.AgentParams.selectedObject = ress;
          }
        });
      }
    });
  }

  onSaveAgentPerson() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }

    if (!this.OrdersObject || this.OrdersObject === null || isUndefined(this.OrdersObject)) {
      // tslint:disable-next-line: max-line-length
      this.ShowMessageBoxWithOkBtn('به علت عدم دریافت پاکات و عدم درج لیست متقاضیان، امکان ثبت وجود ندارد. در صورت نیاز با راهبر تماس بگیرید.');
    }

    if (this.AgentParams.selectedObject && this.CostFactorID) {
      const AgentPersonObj = {
        ActorID: this.AgentParams.selectedObject,
        CostFactorID: this.ProductRequestObject.CostFactorID,
        RoleID: 1520
      };
      this.ProductRequest.SaveAgentProductRequestPerson(AgentPersonObj, this.PopupParam.ModuleCode,
        this.PopupParam.OrginalModuleCode).subscribe(x => {
          this.ShowMessageBoxWithOkBtn('ذخیره نماینده معاون شهردار با موفقیت انجام شد');
        });
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا نماینده معاون شهردار را انتخاب نمایید');
    }
  }

  IsMultiYearRadioClick(IsMultiYear) {
    this.IsMultiYear = IsMultiYear;
  }
}
