import { Component, OnInit, Input, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { isNullOrUndefined, isUndefined } from 'util';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';


@Component({
  selector: 'app-general-tender',
  templateUrl: './general-tender.component.html',
  styleUrls: ['./general-tender.component.css']
})
export class GeneralTenderComponent implements OnInit {
  @ViewChild('IsWin') IsWin: TemplateRef<any>;
  @ViewChild('IsReceivedValid') IsReceivedValid: TemplateRef<any>;
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  @ViewChild('Print') Print: TemplateRef<any>;
  @ViewChild('CancelReceiveElectronicDocs') CancelReceiveElectronicDocs: TemplateRef<any>;
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestCostClosed: EventEmitter<any> = new EventEmitter<any>();
  IsRelatedCorporate = false;
  ProductRequestCode;
  CheckRegionWritable;
  UserRegionCode;
  InquiryNoLableName;
  RegisterLetterDate;
  DocumentLetterNo;
  WarrantyDuration;
  RegisterLetterNo;
  ISPropsalItemActive = false;
  MinHeightPixel;
  LetterTypeCode = 18;
  IsDisable = true;
  IsWFDisable = false;
  InquiryHeaderName;
  InquiryDateLableName;
  DepositAmountLableName;
  InquiryNoteLableName;
  HaveAdvertising;
  HaveSupplers;
  HaveProposaletter;
  ProductRequestDate;
  CostFactorID;
  PRCostRowData = [];
  ProductRequestCostColDef;
  PRCostGridApi: any;
  selectedObject: any;
  HaveMaxBtn: boolean;
  SelectedRegionCode;
  type: string;
  HaveHeader: boolean;
  FilterDocumentTypeCodeList = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ProductRequestObject;
  ProductRequestID: number;
  DeliveryLocation;
  ActorConditionLableName;
  DealTypeCode;
  InquiryCode;
  InquiryDate;
  NewsPaperItems;
  InquiryID;
  IsAdvertisingDateDisable = false;
  ISStarInquiryDateLableName = true;
  ISStarDocumentDeadlineDate = false;
  NewsPaperParams = {
    bindLabelProp: 'NewsPaperName',
    bindValueProp: 'NewsPaperCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  DeadLineDate;
  Subject;

  NgSelectVSParams = {
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
  Note: any;
  startLeftPosition: number;
  startTopPosition: number;
  InquiryNo: any;
  ParamObj;
  SelectedProposal: any;
  DepositAmount: any;
  DocumentAmount: any;
  DocumentDeadlineDate: any;
  SuggestionDeadlineDate: any;
  AdvertisingDate: any;
  isClicked: boolean;
  SelectedAdvertising: any;
  AdvertisingCode: any;
  MainMinwidthPixel: number;
  PrepaymentAmount: any;
  ActorCondition;
  InquiryObject: any;
  PrepaymentAmountLableName: string;
  ModuleViewTypeCode: any;
  HaveNewsPaper = true;
  HaveAdvertisingDate = true;
  gridHeightPxel = 160;
  HaveReviewMethod = false;
  HaveAdvertiseUpload = true;
  HaveAdvertisingShow = false;
  HaveDetails = true;
  HasPrepaymentAmount = true;
  HasActorCondition = true;
  HasDepositAmount = true;
  HaveSupplersInfo = false;
  HasRecDocAndPock = true;
  Tel: any;
  Cell: any;
  Address: any;
  SelectedActorID;
  PersonTypeList: any;
  SelectedPersonTypeCode: number;
  IsSelectedAdvertising = false;
  DeadLineDateName = 'مهلت پاسخ استعلام';
  HaveAdvertisePrint = false;
  HavePersonReceiveDoc = false;
  IsType24 = false;
  SumFinalAmount;
  WarrantyReceiveDocTypeItems;
  HasWarrantyReceiveDocType = false;
  WarrantyReceiveDocTypeParams = {
    bindLabelProp: 'ReceiveDocTypeName',
    bindValueProp: 'ReceiveDocTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  Disabled = false;

  ReviewMethodItems;
  ReviewMethodParams = {
    bindLabelProp: 'ReviewMethodName',
    bindValueProp: 'ReviewMethodCode',
    placeholder: '',
    MinWidth: '120px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  HasDeadLineDate = true;
  CheckValidate: boolean;
  beforeID: any;
  HaveRatingRequired = false;
  RatingRequired;
  HasWFSave = false;
  AdvertisingRegDate: any;
  AdvertisingExpDate: any;
  ActualRegisterDate: any;
  ValidityDuration;
  AdvertisingObject;
  HaveAdvertisingDates = false;
  HaveInquiryNote = true;
  DepositAmountWidth = 71;
  SumFinalAmountWidth = 71;
  ShowContractordetails = false;
  OverMainMinwidthPixel: number;
  IsException = false;
  IsEditable = true;
  CheckValidateDepositAmount = false;
  ProductRequestItemID = -1;
  DateFormat = 'YYYY/MM/DD HH:mm:ss';
  ShowMode = 'daytime';
  ProposalReadingDate;
  HaveProposalReadingDate = false;
  constructor(private ProductRequest: ProductRequestService,
    private ContractList: ContractListService,
    private User: UserSettingsService,
    private RefreshPersonItems: RefreshServices,
    private Actor: ActorService,
    private Report: ReportService,
    private Automation: AutomationService,
    private DealsHall: DealsHallService) {
    this.PersonTypeList = [{ PersonTypeName: 'حقیقی', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقی', PersonTypeCode: 2 }];
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    if (this.ModuleViewTypeCode === 42) {
      this.ProductRequestCostColDef = [
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
          headerName: 'حقیقی / حقوقی',
          field: 'PersonTypeName',
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            HardCodeItems: this.PersonTypeList,
            bindLabelProp: 'PersonTypeName',
            bindValueProp: 'PersonTypeCode',
            Params: {
              loading: false
            }
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
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 110,
          resizable: true
        },
        {
          headerName: ' نام شخص  ',
          field: 'ActorIdentityName', // RFC 51984
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
              return params.value.ActorIdentityName; // RFC 51984
            } else {
              return '';
            }
          },
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 300,
          resizable: true
        },
        {
          headerName: 'شماره نامه درخواست',
          field: 'LetterNo',
          width: 130,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
        },
        {
          headerName: 'تاریخ نامه درخواست',
          field: 'PersianLetterDate',
          width: 130,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianLetterDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'توضیحات',
          field: 'Note',
          width: 378,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.Note;
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
    } else if (this.ModuleViewTypeCode === 90 || this.ModuleViewTypeCode === 129 || this.ModuleViewTypeCode === 130
      || this.ModuleViewTypeCode === 141 || this.ModuleViewTypeCode === 185) {
      this.ProductRequestCostColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
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
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
        },
        {
          headerName: 'حقیقی / حقوقی',
          field: 'PersonTypeName',
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            HardCodeItems: this.PersonTypeList,
            bindLabelProp: 'PersonTypeName',
            bindValueProp: 'PersonTypeCode',
            Params: {
              loading: false
            }
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
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 110,
          resizable: true
        },
        {
          headerName: 'برنده',
          field: 'IsWin',
          width: 100,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 129,  // RFC 54418 //RFC 65086
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
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
          headerName: ' نام شخص  ',
          field: 'ActorIdentityName', // RFC 51984
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
              return params.value.ActorIdentityName; // RFC 51984
            } else {
              return '';
            }
          },
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 300,
          resizable: true
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'SumProposalItemPrice',
          width: 100,
          HaveThousand: true,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
        },
        {
          headerName: this.ProductRequestObject.DealMethodCode == 3 ? 'تاریخ ارائه استعلام' : 'تاریخ دریافت اسناد',
          field: 'PersianProposalDate',
          width: 120,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianProposalDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'تاریخ نامه درخواست',
          field: 'PersianLetterDate',
          width: 130,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianLetterDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'تاریخ اعتبار',
          field: 'PersianExpireDate',
          width: 100,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianExpireDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'شماره دعوتنامه',
          field: 'InvitationNo',
          width: 120,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
        },
        {
          headerName: 'تاریخ دعوتنامه',
          field: 'PersianInvitationDate',
          width: 100,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianInvitationDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPx: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'توضیحات',
          field: 'Note',
          width: 378,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.Note;
            } else {
              return '';
            }
          },
        },
      ];
    } else if (this.ModuleViewTypeCode === 24 || this.ModuleViewTypeCode === 57 || this.ModuleViewTypeCode === 158) { // RFC 51993
      this.ProductRequestCostColDef = [
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
          editable: (params) => {
            // tslint:disable-next-line: max-line-length
            if (this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000) {
              return false;
            } else {
              return (this.ModuleViewTypeCode === 24);
            }
          }
        },
        {
          headerName: 'حقیقی / حقوقی',
          field: 'PersonTypeName',
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            HardCodeItems: this.PersonTypeList,
            bindLabelProp: 'PersonTypeName',
            bindValueProp: 'PersonTypeCode',
            Params: {
              loading: false
            }
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
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
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
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 300,
          resizable: true
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'SumProposalItemPrice',
          width: 100,
          HaveThousand: true,
          resizable: true,
          editable: false,
        },
        {
          headerName: this.ProductRequestObject.DealMethodCode == 3 ? 'تاریخ ارائه استعلام' : 'تاریخ دریافت اسناد',
          field: 'PersianProposalDate',
          width: 120,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianProposalDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'تاریخ نامه درخواست',
          field: 'PersianLetterDate',
          width: 130,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianLetterDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'تاریخ اعتبار',
          field: 'PersianExpireDate',
          width: 100,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianExpireDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'شماره دعوتنامه',
          field: 'InvitationNo',
          width: 120,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
        },
        {
          headerName: 'تاریخ دعوتنامه',
          field: 'PersianInvitationDate',
          width: 100,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianInvitationDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPx: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'توضیحات',
          field: 'Note',
          width: 378,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.Note;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'مدت اعتبار پیشنهاد',
          field: 'ProposalValidateTime',
          width: 120,
          resizable: true,
          editable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 24,
        },
        {
          headerName: 'دوره تضمین',
          field: 'WarrantyTime',
          width: 120,
          resizable: true,
          editable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 24,
        }, // 65592
      ];
    } else {
      this.ProductRequestCostColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
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
          editable: (params) => {
            // tslint:disable-next-line: max-line-length
            if (this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000) {
              return false;
            } else {
              return ((this.ModuleViewTypeCode === 70
                || this.ModuleViewTypeCode === 58
                || this.ModuleViewTypeCode === 82
                || this.ModuleViewTypeCode === 94
                || this.ModuleViewTypeCode === 24
                || this.ModuleViewTypeCode === 43
                || this.ModuleViewTypeCode === 83  // RFC: 54535
                || this.ModuleViewTypeCode === 104
                || this.ModuleViewTypeCode === 128 // RFC: 54244
                || this.ModuleViewTypeCode === 105
                || this.ModuleViewTypeCode === 143
                || this.ModuleViewTypeCode === 188 // RFC: 65242
                || this.ModuleViewTypeCode === 142) // RFC 51969 && 53793 && 52657 && 53949
                || ((this.PopupParam.OrginalModuleCode === 2776
                  || this.PopupParam.ModuleCode === 2776) && this.ModuleViewTypeCode === 200000)); // RFC 55630 - درخواست ملکی
            }
          }
        },
        {
          headerName: 'لغو دریافت الکترونیک اسناد',
          field: '',
          width: 165,
          sortable: false,
          resizable: false,
          hide: this.PopupParam.OriginModuleViewTypeCode !== 100000,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.CancelReceiveElectronicDocs,
          }
        },
        {
          headerName: 'حقیقی / حقوقی',
          field: 'PersonTypeName',
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            HardCodeItems: this.PersonTypeList,
            bindLabelProp: 'PersonTypeName',
            bindValueProp: 'PersonTypeCode',
            Params: {
              loading: false
            }
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
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 110,
          resizable: true
        },
        {
          headerName: ' نام شخص  ',
          field: 'ActorIdentityName', // RFC 51984
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
              return params.value.ActorIdentityName; // RFC 51984
            } else {
              return '';
            }
          },
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          width: 300,
          resizable: true
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'SumProposalItemPrice',
          width: 100,
          HaveThousand: true,
          resizable: true,
          editable: false,
        },
        {
          headerName: this.ProductRequestObject.DealMethodCode == 3 ? 'تاریخ ارائه استعلام' : 'تاریخ دریافت اسناد',
          field: 'PersianProposalDate',
          width: 120,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianProposalDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'تاریخ نامه درخواست',
          field: 'PersianLetterDate',
          width: 130,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianLetterDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'تاریخ اعتبار',
          field: 'PersianExpireDate',
          width: 100,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianExpireDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'شماره دعوتنامه',
          field: 'InvitationNo',
          width: 120,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
        },
        {
          headerName: 'تاریخ دعوتنامه',
          field: 'PersianInvitationDate',
          width: 100,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianInvitationDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPx: 100,
            AppendTo: '.for-append-date-2'
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
          headerName: 'توضیحات',
          field: 'Note',
          width: 378,
          resizable: true,
          // tslint:disable-next-line: max-line-length
          editable: this.PopupParam && this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? false : true,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.Note;
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
          hide: this.ModuleViewTypeCode !== 104
            || this.ModuleViewTypeCode !== 128, // RFC 52669 &&  RFC 54244
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.UploadArchive,
          }
        },
      ];
    }

  }
  ngOnInit() {
    this.UserRegionCode = this.PopupParam.UserRegionCode;
    this.CheckRegionWritable = this.PopupParam.CheckRegionWritable;
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.InquiryObject = this.PopupParam.InquiryObject;
    this.Subject = this.ProductRequestObject.Subject;
    this.ProductRequestDate = this.ProductRequestObject.ShortProductRequestDate;
    this.ProductRequestCode = this.ProductRequestObject.ProductRequestCode;
    this.SelectedRegionCode = this.ProductRequestObject.RegionCode;
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.SumFinalAmount = this.PopupParam.SumFinalAmount;
    if (this.PopupParam.OrginalModuleCode === 2824 || // RFC: 57845
      this.PopupParam.OrginalModuleCode === 2756 ||
      this.PopupParam.OrginalModuleCode === 2838) {
      this.IsEditable = false;
    }
    if (this.InquiryObject) {
      this.InquiryID = this.InquiryObject.InquiryID;
      this.DeadLineDate = this.InquiryObject.ShortDeadLineTime;
      this.DocumentDeadlineDate = this.InquiryObject.ShortDocumentDeadline;
      this.SuggestionDeadlineDate = this.InquiryObject.ShortSuggestionDeadline;
      this.AdvertisingDate = this.InquiryObject.ShortAdvertisingDate;
      this.InquiryDate = this.InquiryObject.ShortInquiryDate;
      this.ProposalReadingDate = this.InquiryObject.ShortProposalReadingDate;
      this.Note = this.InquiryObject.Note;
      this.WarrantyReceiveDocTypeParams.selectedObject = this.InquiryObject.RequestDocTypeCode;
      this.PRCostRowData = this.InquiryObject.ProposalList;
      this.InquiryNo = this.InquiryObject.InquiryNo;
      this.ActorCondition = this.InquiryObject.ActorCondition;
      this.DeliveryLocation = this.InquiryObject.DeliveryLocation;
      this.IsDisable = false;
      this.WarrantyDuration = this.InquiryObject.WarrantyDuration;
      if (this.InquiryObject.AdvertisingObject) {
        this.RatingRequired = this.InquiryObject.AdvertisingObject.RatingRequired;
        this.SelectedAdvertising = this.InquiryObject.AdvertisingObject;
        this.AdvertisingCode = this.InquiryObject.AdvertisingObject.AdvertisingCode;
        if (this.InquiryObject.AdvertisingObject.AdvertisingCode) {
          this.IsSelectedAdvertising = true;
        }
        this.AdvertisingExpDate = this.InquiryObject.AdvertisingObject.ShortExpireDate;
        this.AdvertisingRegDate = this.InquiryObject.AdvertisingObject.ShortRegisterDate;
        this.ActualRegisterDate = this.InquiryObject.AdvertisingObject.ShortActualRegisterDate;
        this.ValidityDuration = this.InquiryObject.AdvertisingObject.AdValidityDuration;
      }
      const Codes = [];
      this.InquiryObject.NewsPaperList.forEach(item => {
        Codes.push(item.NewsPaperCode);
      });
      this.NewsPaperParams.selectedObject = Codes;

      if (this.InquiryObject.WarrantyDuration && this.InquiryObject.WarrantyDuration > 0) { // RFC 51870
        this.WarrantyDuration = this.InquiryObject.WarrantyDuration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      if (this.InquiryObject.DepositAmount && this.InquiryObject.DepositAmount > 0) {
        this.DepositAmount = this.InquiryObject.DepositAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      if (this.InquiryObject.DocAmount && this.InquiryObject.DocAmount > 0) {
        this.DocumentAmount = this.InquiryObject.DocAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
      if (this.InquiryObject.PrepaymentAmount && this.InquiryObject.PrepaymentAmount > 0) {
        this.PrepaymentAmount = this.InquiryObject.PrepaymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } else {
      if (this.ModuleViewTypeCode === 114) { // RFC 58521
        this.ProductRequestItemID = this.ProductRequestObject.ProductRequestItemList &&
          this.ProductRequestObject.ProductRequestItemList.length > 0
          ? this.ProductRequestObject.ProductRequestItemList[0].ProductRequestItemID : -1;
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.SetOrderAndInquiry(this.ProductRequestItemID, this.CostFactorID).subscribe(res => {
          if (res) {
            this.InquiryObject = res;
            this.SetInquiry(this.InquiryObject);
          }
        });
      } else {
        this.ProductRequest.GetNewInquiryNo(this.ProductRequestObject.CostFactorID).subscribe(res => {
          this.InquiryNo = res;
        });
      }
    }
    forkJoin([
      this.ProductRequest.GetNewsPaperList(),
      this.ProductRequest.GetReviewMethodBasedOnDealMethod(this.ProductRequestObject.CostFactorID)
    ]).subscribe(res => {
      this.NewsPaperItems = res[0];
      this.ReviewMethodItems = [
        { ReviewMethodCode: 1, ReviewMethodName: 'تک مرحله ای' },
        { ReviewMethodCode: 2, ReviewMethodName: 'دو مرحله ای' }
      ];
      // tslint:disable-next-line: max-line-length
      this.ReviewMethodParams.selectedObject = this.InquiryObject && this.InquiryObject.ReviewMethodCode ? this.InquiryObject.ReviewMethodCode :
        this.ProductRequestObject.ReviewMethodCode !== null ? this.ProductRequestObject.ReviewMethodCode :
          res[1][0].ReviewMethodCode;
    });



    if (this.PopupParam && this.PopupParam.ModuleViewTypeCode) {
      switch (this.PopupParam.ModuleViewTypeCode) {
        case 23:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveReviewMethod = false;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.HasDeadLineDate = false;
          this.HasRecDocAndPock = false;
          // tslint:disable-next-line:max-line-length
          this.HaveAdvertiseUpload = this.HaveAdvertisingDate = this.HaveNewsPaper = this.HaveSupplers = this.HaveAdvertising = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'استعلام قیمت';
          this.gridHeightPxel = 160;
          this.HaveDetails = true;
          this.FilterDocumentTypeCodeList.push(51);
          this.ISStarInquiryDateLableName = true;
          this.CheckValidate = true;
          this.DepositAmountWidth = 50;
          break;
        case 24:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HasDepositAmount = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasRecDocAndPock = false;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HavePersonReceiveDoc = this.HaveSupplersInfo = true;
          this.InquiryHeaderName = 'استعلام قیمت';
          this.gridHeightPxel = 110;
          this.HaveDetails = this.IsType24 = true;
          this.HaveReviewMethod = false;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          this.ISPropsalItemActive = true;
          this.DepositAmountWidth = 50;
          //  this.NgSelectVSParams.bindValueProp = 'IdentityNo';
          break;
        case 27:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.HaveRatingRequired = true;
          this.HaveAdvertising = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveNewsPaper = true; // RFC 53925
          this.HaveSupplers = false;
          this.IsWFDisable = false;
          this.HaveAdvertiseUpload = true;
          this.HaveProposaletter = this.HaveSupplersInfo = false;
          this.HaveReviewMethod = true;
          this.HaveDetails = true;
          this.HaveAdvertisingDates = true; // RFC 50325
          this.HaveAdvertisingDate = false; // RFC 50325
          this.HaveAdvertisingShow = true; // RFC 50325
          // this.InquiryHeaderName = 'حراج';
          this.InquiryHeaderName = this.PopupParam.HeaderName;
          this.gridHeightPxel = 120;
          this.FilterDocumentTypeCodeList.push(57);
          this.ISStarInquiryDateLableName = true;
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.HaveProposalReadingDate = this.ProductRequestObject.DealMethodCode === 6 ? true : false;
          break;
        case 29:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveAdvertising = true;
          this.HaveNewsPaper = true;
          this.IsWFDisable = true;
          this.HaveProposaletter = this.HaveSupplersInfo = false;
          this.HaveReviewMethod = true;
          this.HaveAdvertiseUpload = false;
          this.InquiryHeaderName = 'مزایده';
          this.HaveDetails = true;
          this.HaveAdvertisePrint = true;
          this.gridHeightPxel = 100;
          this.IsAdvertisingDateDisable = true;
          this.FilterDocumentTypeCodeList.push(57);
          this.HaveAdvertisingDates = true; // RFC 50325
          this.HaveAdvertisingDate = false; // RFC 50325
          this.HaveAdvertisingShow = true; // RFC 50325
          break;
        case 30:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveAdvertising = true;
          this.HaveNewsPaper = true;
          this.IsWFDisable = true;
          this.HaveProposaletter = this.HaveSupplersInfo = false;
          this.HaveReviewMethod = true;
          this.HaveAdvertiseUpload = true;
          this.HaveDetails = true;
          this.InquiryHeaderName = 'حراج';
          this.gridHeightPxel = 100;
          this.FilterDocumentTypeCodeList.push(57);
          this.HaveAdvertisingDates = true; // RFC 50325
          this.HaveAdvertisingDate = false; // RFC 50325
          this.HaveAdvertisingShow = true; // RFC 50325
          break;
        case 35:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پایه';
          this.ActorConditionLableName = 'شرایط متاقضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.IsWFDisable = this.HavePersonReceiveDoc = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = this.HaveSupplersInfo = true;
          this.HaveProposaletter = false;
          this.InquiryHeaderName = 'مزایده';
          this.HaveDetails = true;
          this.gridHeightPxel = 115;
          this.HaveReviewMethod = true;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          break;
        case 38:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = true;
          this.HasDepositAmount = this.HaveAdvertisingShow = true;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.ISStarInquiryDateLableName = true;
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.HasWFSave = true;
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false; // به درخواست خانم قربانزاده
          this.DepositAmountWidth = 50;
          this.HaveProposalReadingDate = this.ProductRequestObject.DealMethodCode === 1 ? true : false;
          break;
        case 139:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = true;
          this.HasDepositAmount = this.HaveAdvertisingShow = true;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.ISStarInquiryDateLableName = true;
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.HasWFSave = true;
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false; // به درخواست خانم قربانزاده
          this.DepositAmountWidth = 50;
          break;
        case 131:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HaveAdvertising = true; // RFC 57759
          this.HasDepositAmount = this.HaveAdvertisingShow = true;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.ISStarInquiryDateLableName = true;
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.HasWFSave = true;
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false;
          this.DepositAmountWidth = 50;
          this.HasDeadLineDate = this.HaveNewsPaper = this.HaveRatingRequired = false; // RFC 57759
          this.CheckValidateDepositAmount = true; // RFC 57759
          break;
        case 132:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = false;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = true;
          this.HasDepositAmount = this.HaveAdvertisingShow = true;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.ISStarInquiryDateLableName = true;
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.HasWFSave = true;
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false;
          this.DepositAmountWidth = 50;
          break;
        case 70:
        case 143:
        case 164:
        case 188:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HaveAdvertising = false;
          this.IsDisable = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HasDepositAmount = this.IsWFDisable = true;
          this.HaveSupplers = this.HaveProposaletter = this.HaveSupplersInfo = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.DepositAmountWidth = 50;
          break;
        case 153:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HaveAdvertising = false;
          this.IsDisable = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HasDepositAmount = this.IsWFDisable = true;
          this.HaveSupplers = this.HaveProposaletter = this.HaveSupplersInfo = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.DepositAmountWidth = 50;
          this.IsEditable = false;
          this.Disabled = true;
          break;
        case 142:
          this.IsEditable = false;
          this.Disabled = true;
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HaveAdvertising = false;
          this.IsDisable = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HasDepositAmount = this.IsWFDisable = true;
          this.HaveSupplers = this.HaveProposaletter = this.HaveSupplersInfo = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.DepositAmountWidth = 50;
          break;
        case 122: // RFC 53422
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveAdvertising = true;
          this.IsAdvertisingDateDisable = true;
          this.HaveDetails = false;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = this.HaveAdvertisingShow = true;
          this.HaveAdvertiseUpload = true;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false; // به درخواست خانم قربانزاده
          break;
        case 39:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveAdvertising = true;
          this.IsAdvertisingDateDisable = true;
          this.HaveDetails = false;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = this.HaveAdvertisingShow = true;
          this.HaveAdvertiseUpload = this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false; // به درخواست خانم قربانزاده
          break;
        case 40:
        case 80:
        case 138:  // RFC 57761
        case 117:
        case 145:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HaveAdvertising = true;
          this.HaveNewsPaper = true;
          this.HaveSupplers = false;
          this.HaveSupplersInfo = false;
          this.IsWFDisable = false;
          this.HaveProposaletter = false;
          this.HaveReviewMethod = false;
          this.HaveAdvertisingShow = this.HasDepositAmount = true;
          this.HaveDetails = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.gridHeightPxel = 100;
          this.HaveAdvertisingDates = true;
          this.HaveAdvertisingDate = false; // به درخواست خانم قربانزاده
          this.DepositAmountWidth = 50;
          break;
        case 42:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.IsWFDisable = this.HaveSupplersInfo = this.HavePersonReceiveDoc = true;
          this.HaveProposaletter = false;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.HaveDetails = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = false;
          // tslint:disable-next-line: max-line-length
          if (this.PopupParam.OrginalModuleCode && (this.PopupParam.OrginalModuleCode === 2824 || this.PopupParam.OrginalModuleCode === 2793)) {
            this.HaveInquiryNote = false;
          } // RFC 49588
          this.DepositAmountWidth = 50;
          //  this.NgSelectVSParams.bindValueProp = 'IdentityNo';
          break;
        case 43:
        case 82:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = true;
          this.InquiryHeaderName = 'حراج';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveDetails = true;
          this.gridHeightPxel = 98;
          this.HaveReviewMethod = true;
          break;
        case 57:
          // this.NgSelectVSParams.bindValueProp = 'IdentityNo';
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = true;
          this.InquiryHeaderName = 'مناقصه محدود';
          this.HaveDetails = this.HaveSupplersInfo = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = this.HaveAdvertisingDate = this.HasDeadLineDate = false;
          this.FilterDocumentTypeCodeList.push(51);
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.DepositAmountWidth = 50;
          break;
        case 104:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = true;
          this.InquiryHeaderName = 'مناقصه محدود';
          this.HaveDetails = this.HaveSupplersInfo = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = this.HaveAdvertisingDate = this.HasDeadLineDate = false;
          this.FilterDocumentTypeCodeList.push(51);
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.DepositAmountWidth = 50;
          this.ShowContractordetails = true; // RFC 52669
          // tslint:disable-next-line: max-line-length
          if (this.ProductRequestObject.RegionCode === 210 && (this.ProductRequestObject.DealMethodCode === 2 || this.ProductRequestObject.DealMethodCode === 3) && this.PRCostRowData.length === 0) { // RFC 53803
            this.PRCostRowData = this.ProductRequestObject.RequestSupplierList;
          }
          break;
        case 58:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = this.HaveSupplersInfo = false;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = true;
          this.InquiryHeaderName = 'مناقصه محدود';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveDetails = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = false;
          break;
        case 64:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = true;
          this.HaveNewsPaper = true;  // RFC 51870
          this.IsWFDisable = false;
          this.HaveAdvertiseUpload = false;
          this.HaveProposaletter = this.HaveSupplersInfo = false;
          this.HaveReviewMethod = true;
          this.HaveDetails = true;
          this.InquiryHeaderName = 'مزایده';
          this.gridHeightPxel = 120;
          this.FilterDocumentTypeCodeList.push(57);
          this.ISStarInquiryDateLableName = true;
          this.CheckValidate = true;
          this.ISStarDocumentDeadlineDate = true;
          this.HaveAdvertisingDates = true; // RFC 50325
          this.HaveAdvertisingDate = false; // RFC 50325
          this.HaveAdvertisingShow = true; // RFC 50325
          this.HaveProposalReadingDate = this.ProductRequestObject.DealMethodCode === 5 ? true : false;
          break;
        case 133:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = false;
          this.HaveNewsPaper = true;  // RFC 51870
          this.IsWFDisable = false;
          this.HaveAdvertiseUpload = false;
          this.HaveProposaletter = this.HaveSupplersInfo = false;
          this.HaveReviewMethod = true;
          this.HaveDetails = true;
          this.InquiryHeaderName = 'مزایده';
          this.gridHeightPxel = 120;
          this.FilterDocumentTypeCodeList.push(57);
          this.ISStarInquiryDateLableName = true;
          this.CheckValidate = true;
          this.ISStarDocumentDeadlineDate = true;
          this.HaveAdvertisingDates = true; // RFC 50325
          this.HaveAdvertisingDate = false; // RFC 50325
          this.HaveAdvertisingShow = true; // RFC 50325
          break;
        case 134:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ  پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = true;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = true;
          this.HaveNewsPaper = true;  // RFC 51870
          this.IsWFDisable = false;
          this.HaveAdvertiseUpload = false;
          this.HaveProposaletter = this.HaveSupplersInfo = false;
          this.HaveReviewMethod = true;
          this.HaveDetails = false;
          this.InquiryHeaderName = 'مزایده';
          this.gridHeightPxel = 120;
          this.FilterDocumentTypeCodeList.push(57);
          this.ISStarInquiryDateLableName = true;
          this.CheckValidate = true;
          this.ISStarDocumentDeadlineDate = true;
          this.HaveAdvertisingDates = true; // RFC 50325
          this.HaveAdvertisingDate = false; // RFC 50325
          this.HaveAdvertisingShow = true; // RFC 50325
          break;
        case 83:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HasDepositAmount = true;
          // tslint:disable-next-line: max-line-length
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HavePersonReceiveDoc = this.HaveSupplersInfo = true;
          this.InquiryHeaderName = 'استعلام قیمت';
          this.gridHeightPxel = 110;
          this.HaveDetails = this.IsType24 = true;
          this.HaveReviewMethod = this.HasDeadLineDate = this.IsWFDisable = false;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          this.DepositAmountWidth = 50;
          this.SumFinalAmountWidth = 50;
          break;
        case 84:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پایه';
          this.ActorConditionLableName = 'شرایط متاقضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.IsWFDisable = this.HavePersonReceiveDoc = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = this.HaveSupplersInfo = true;
          this.HaveProposaletter = false;
          this.InquiryHeaderName = 'حراج';
          this.HaveDetails = true;
          this.gridHeightPxel = 115;
          this.HaveReviewMethod = true;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          break;
        case 100000:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HaveAdvertiseUpload = this.HaveAdvertisingDate = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.HaveSupplersInfo = this.HavePersonReceiveDoc = true;
          this.HaveProposaletter = false;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.HaveDetails = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = false;
          this.DepositAmountWidth = 50;
          break;
        case 200000: // قرارداد چابک و درخواست معامله ملکی
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پایه';
          this.ActorConditionLableName = 'شرایط متقاضی';
          this.DeadLineDateName = ' تاریخ بازگشایی پاکت';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.HavePersonReceiveDoc = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HasDepositAmount = this.HaveSupplersInfo = true;
          this.HaveProposaletter = false;
          this.InquiryHeaderName = '';
          this.HaveDetails = true;
          this.gridHeightPxel = 115;
          this.IsWFDisable = false;
          break;
        case 90:
        case 130:
        case 141: // RFC 57662
          this.HasWarrantyReceiveDocType = true;
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.HasDepositAmount = true;
          this.HasPrepaymentAmount = this.HasRecDocAndPock = false;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.HaveProposaletter = this.HavePersonReceiveDoc = this.HaveSupplersInfo = true;
          this.IsWFDisable = false;
          this.InquiryHeaderName = 'استعلام قیمت';
          this.gridHeightPxel = 110;
          this.IsType24 = true;
          this.HaveDetails = false;
          this.HaveReviewMethod = false;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          this.ISPropsalItemActive = true;
          this.ContractList.GetWarrantyReceiveDocType().subscribe(res => {
            this.WarrantyReceiveDocTypeItems = res;
          });
          this.CheckValidate = false;
          this.HaveAdvertisePrint = false;
          this.HasActorCondition = true;
          this.WarrantyReceiveDocTypeParams.MinWidth = '100px';

          if (this.ProductRequestObject.RegionCode === 200 && this.PRCostRowData.length === 0) { // RFC 50976
            this.PRCostRowData = this.ProductRequestObject.RequestSupplierList;
          }
          break;
        case 129:
        case 185:
          this.HasWarrantyReceiveDocType = true;
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.HasDepositAmount = true;
          this.HasPrepaymentAmount = this.HasRecDocAndPock = false;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.HaveProposaletter = this.HavePersonReceiveDoc = this.HaveSupplersInfo = true;
          this.IsWFDisable = false;
          this.InquiryHeaderName = 'استعلام قیمت';
          this.gridHeightPxel = 110;
          this.IsType24 = true;
          this.HaveDetails = false;
          this.HaveReviewMethod = false;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          this.ISPropsalItemActive = true;
          this.ContractList.GetWarrantyReceiveDocType().subscribe(res => {
            this.WarrantyReceiveDocTypeItems = res;
          });
          this.CheckValidate = false;
          this.HaveAdvertisePrint = false;
          this.HasActorCondition = true;
          this.WarrantyReceiveDocTypeParams.MinWidth = '100px';

          if (this.ProductRequestObject.RegionCode === 220 && this.PRCostRowData.length === 0) { // RFC 54789
            this.PRCostRowData = this.ProductRequestObject.RequestSupplierList;
          }
          break;
        case 94:
          this.HasWarrantyReceiveDocType = this.HasDepositAmount =
            this.HasRecDocAndPock = this.IsType24 = this.CheckValidate =
            this.HasActorCondition = this.HaveSupplers = this.HaveProposaletter =
            this.HavePersonReceiveDoc = this.HaveSupplersInfo = true;

          this.ISPropsalItemActive = this.HaveDetails =
            this.HaveReviewMethod = this.IsWFDisable = this.HasPrepaymentAmount =
            this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising =
            this.HaveAdvertisePrint = false;

          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.InquiryHeaderName = 'مناقصه'; // RFC 52310
          this.gridHeightPxel = 110;
          this.FilterDocumentTypeCodeList.push(52);
          this.FilterDocumentTypeCodeList.push(53);
          this.FilterDocumentTypeCodeList.push(54);
          this.FilterDocumentTypeCodeList.push(55);
          this.ContractList.GetWarrantyReceiveDocType().subscribe(res => {
            this.WarrantyReceiveDocTypeItems = res;
          });
          this.WarrantyReceiveDocTypeParams.MinWidth = '100px';
          break;
        case 128: // RFC 54244
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = true;
          this.InquiryHeaderName = 'استعلام بها';
          this.HaveDetails = this.HaveSupplersInfo = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = this.HaveAdvertisingDate = this.HasDeadLineDate = false;
          this.FilterDocumentTypeCodeList.push(51);
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.DepositAmountWidth = 50;
          this.ShowContractordetails = true; // RFC 52669
          // tslint:disable-next-line: max-line-length
          if (this.ProductRequestObject.RegionCode === 210 && (this.ProductRequestObject.DealMethodCode === 2 || this.ProductRequestObject.DealMethodCode === 3) && this.PRCostRowData.length === 0) { // RFC 53803
            this.PRCostRowData = this.ProductRequestObject.RequestSupplierList;
          }
          if (this.PopupParam.PRRegionObject.RegionGroupCode === 3) {
            this.ISPropsalItemActive = true;
          }
          break;
        case 105:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = this.IsWFDisable = this.HaveSupplersInfo = this.HavePersonReceiveDoc = true;
          this.HaveProposaletter = false;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.HaveDetails = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = false;
          // tslint:disable-next-line: max-line-length
          if (this.PopupParam.OrginalModuleCode && (this.PopupParam.OrginalModuleCode === 2824 || this.PopupParam.OrginalModuleCode === 2793)) {
            this.HaveInquiryNote = false;
          } // RFC 49588
          // tslint:disable-next-line:max-line-length
          if (this.ProductRequestObject.RegionCode === 210 && (this.ProductRequestObject.DealMethodCode === 2 || this.ProductRequestObject.DealMethodCode === 3) && this.PRCostRowData.length === 0) {
            this.PRCostRowData = this.ProductRequestObject.RequestSupplierList;
          }
          break;
        case 114:
          this.HaveAdvertiseUpload = this.HaveAdvertisingDate = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = true;
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = false;
          this.HaveDetails = this.HasRecDocAndPock = false;
          this.gridHeightPxel = 190;
          this.HaveReviewMethod = false;
          this.CheckValidate = false;
          break;
        case 157:
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.HaveDetails = true;
          this.HasPrepaymentAmount = this.HasActorCondition = this.HaveAdvertiseUpload = false;
          this.HaveRatingRequired = true;
          this.HaveAdvertising = false;
          this.HasDepositAmount = true;
          this.HaveSupplers = this.HaveProposaletter = this.IsWFDisable = this.HaveSupplersInfo = false;
          this.InquiryHeaderName = 'مناقصه عمومی';
          this.FilterDocumentTypeCodeList.push(143);
          this.FilterDocumentTypeCodeList.push(144);
          this.FilterDocumentTypeCodeList.push(145);
          this.FilterDocumentTypeCodeList.push(146);
          this.ISStarInquiryDateLableName = true;
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.HasWFSave = true;
          this.HaveAdvertisingDates = false;
          this.HaveAdvertisingDate = false; // به درخواست خانم قربانزاده
          this.DepositAmountWidth = 50;
          this.HaveNewsPaper = this.HaveAdvertisingShow = false;
          break;
        case 158: // RFC 59100
          this.InquiryNoLableName = 'شماره';
          this.InquiryDateLableName = 'تاریخ';
          this.DepositAmountLableName = 'مبلغ سپرده';
          this.InquiryNoteLableName = 'عنوان';
          this.PrepaymentAmountLableName = 'مبلغ پیش پرداخت';
          this.ActorConditionLableName = 'شرایط طرف قرارداد';
          this.HasPrepaymentAmount = this.HasActorCondition = false;
          this.HasDepositAmount = true;
          this.HaveAdvertiseUpload = this.HaveNewsPaper = this.HaveAdvertising = false;
          this.HaveSupplers = true;
          this.InquiryHeaderName = 'مناقصه محدود';
          this.HaveDetails = this.HaveSupplersInfo = true;
          this.gridHeightPxel = 160;
          this.HaveReviewMethod = this.HaveAdvertisingDate = this.HasDeadLineDate = false;
          this.FilterDocumentTypeCodeList.push(51);
          this.ISStarDocumentDeadlineDate = true;
          this.CheckValidate = true;
          this.DepositAmountWidth = 50;
          if (!this.InquiryObject && this.ProductRequestObject.RegionCode === 200 &&
            this.ProductRequestObject.DealMethodCode === 2 && this.ProductRequestObject.LastInquiryObject &&
            this.ProductRequestObject.LastInquiryObject.IsReturn) {
            this.PRCostRowData = this.ProductRequestObject.LastInquiryObject.ProposalList;
          }
          break;
        default:
          break;
      }
    }
    if (this.PopupParam && this.PopupParam.OriginModuleViewTypeCode === 500000) {
      if (this.PopupParam.OrginalModuleCode === 2824) {
        this.Disabled = true;
        this.IsWFDisable = true;
      } else if (
        this.PopupParam.OrginalModuleCode === 2756 ||
        this.PopupParam.OrginalModuleCode === 2838) {
        this.IsEditable = false;
        this.Disabled = true;
        this.IsWFDisable = true;
      } else if (this.PopupParam && this.PopupParam.OriginModuleViewTypeCode === 300000) {
        this.IsEditable = true;
      }
    }
  }
  onPRCostGridReady(params) {
    this.PRCostGridApi = params.api;
  }

  SetInquiry(InquiryObject) {
    this.InquiryID = this.InquiryObject.InquiryID;
    this.DeadLineDate = this.InquiryObject.ShortDeadLineTime;
    this.DocumentDeadlineDate = this.InquiryObject.ShortDocumentDeadline;
    this.SuggestionDeadlineDate = this.InquiryObject.ShortSuggestionDeadline;
    this.AdvertisingDate = this.InquiryObject.ShortAdvertisingDate;
    this.InquiryDate = this.InquiryObject.ShortInquiryDate;
    this.ProposalReadingDate = this.InquiryObject.ShortProposalReadingDate;
    this.Note = this.InquiryObject.Note;
    this.WarrantyReceiveDocTypeParams.selectedObject = this.InquiryObject.RequestDocTypeCode;
    this.PRCostRowData = this.InquiryObject.ProposalList;
    this.InquiryNo = this.InquiryObject.InquiryNo;
    this.ActorCondition = this.InquiryObject.ActorCondition;
    this.DeliveryLocation = this.InquiryObject.DeliveryLocation;
    this.IsDisable = false;
    this.WarrantyDuration = this.InquiryObject.WarrantyDuration;
    if (this.InquiryObject.AdvertisingObject) {
      this.RatingRequired = this.InquiryObject.AdvertisingObject.RatingRequired;
      this.SelectedAdvertising = this.InquiryObject.AdvertisingObject;
      this.AdvertisingCode = this.InquiryObject.AdvertisingObject.AdvertisingCode;
      if (this.InquiryObject.AdvertisingObject.AdvertisingCode) {
        this.IsSelectedAdvertising = true;
      }
      this.AdvertisingExpDate = this.InquiryObject.AdvertisingObject.ShortExpireDate;
      this.AdvertisingRegDate = this.InquiryObject.AdvertisingObject.ShortRegisterDate;
      this.ActualRegisterDate = this.InquiryObject.AdvertisingObject.ShortActualRegisterDate;
      this.ValidityDuration = this.InquiryObject.AdvertisingObject.AdValidityDuration;
    }
    const Codes = [];
    this.InquiryObject.NewsPaperList.forEach(item => {
      Codes.push(item.NewsPaperCode);
    });
    this.NewsPaperParams.selectedObject = Codes;
    if (this.InquiryObject.WarrantyDuration && this.InquiryObject.WarrantyDuration > 0) { // RFC 51870
      this.WarrantyDuration = this.InquiryObject.WarrantyDuration.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (this.InquiryObject.DepositAmount && this.InquiryObject.DepositAmount > 0) {
      this.DepositAmount = this.InquiryObject.DepositAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (this.InquiryObject.DocAmount && this.InquiryObject.DocAmount > 0) {
      this.DocumentAmount = this.InquiryObject.DocAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (this.InquiryObject.PrepaymentAmount && this.InquiryObject.PrepaymentAmount > 0) {
      this.PrepaymentAmount = this.InquiryObject.PrepaymentAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  onPRCostCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'PersonTypeName') {
      if (event.newValue && event.newValue.PersonTypeCode) {
        const itemsToUpdate = [];
        this.PRCostGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.PersonTypeCode = event.newValue.PersonTypeCode;
            node.data.ActorID = null;
            node.data.ActorName = '';
            node.data.ActorIdentityName = ''; // RFC 51984
            itemsToUpdate.push(node.data);
          }
        });
        this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
      } else {
        const itemsToUpdate = [];
        this.PRCostGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = null;
            node.data.ActorName = '';
            node.data.ActorIdentityName = ''; // RFC 51984
            itemsToUpdate.push(node.data);
          }
        });
        this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
      }
    }
    if (event.colDef && event.colDef.field === 'ActorIdentityName') {  // RFC 51984
      if (event.newValue && (event.newValue.ActorId || event.newValue.IdentityNo)) {
        const itemsToUpdate = [];
        this.PRCostGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.TelNo = event.newValue.TelNo;
            node.data.CellNo = event.newValue.CellNo;
            node.data.PersonAddress = event.newValue.PersonAddress;
            node.data.ActorID = event.newValue.ActorId;
            node.data.IdentityNo = event.newValue.IdentityNo;
            node.data.PersonIdentityNo = event.newValue.PersonIdentityNo;
            node.data.CorporateIdentityNo = event.newValue.CorporateIdentityNo;
            itemsToUpdate.push(node.data);
          }
        });
        this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
      }
    }
  }

  popupclosed() {

    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.MainMinwidthPixel = null;
    this.OverMainMinwidthPixel = null;
  }
  Close() {
    this.ProductRequestCostClosed.emit(this.ProductRequestObject);
  }
  onSave(IsCheckException = false) {

    // tslint:disable-next-line:max-line-length
    let CheckExceptions = (this.PopupParam.OrginalModuleCode === 2793 || this.PopupParam.OrginalModuleCode === 2824) && this.PopupParam.IsAdmin && !IsCheckException;
    let StrExceptions = '';
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if (this.PrepaymentAmount && this.PrepaymentAmount !== 0) {
      this.PrepaymentAmount = this.PrepaymentAmount.replace(/,/g, '');
    }
    if (this.DepositAmount && this.DepositAmount !== 0) {
      this.DepositAmount = this.DepositAmount.replace(/,/g, '');
    }
    if (this.DocumentAmount && this.DocumentAmount !== 0) {
      this.DocumentAmount = this.DocumentAmount.replace(/,/g, '');
    }
    if (this.WarrantyDuration && this.WarrantyDuration !== 0) {
      this.WarrantyDuration = this.WarrantyDuration.replace(/,/g, '');
    }

    let SelectedAdvertisingID;
    SelectedAdvertisingID = this.SelectedAdvertising ? this.SelectedAdvertising.AdvertisingID : null;
    if (this.PopupParam.ModuleViewTypeCode === 29 && (this.NewsPaperParams.selectedObject === null ||
      SelectedAdvertisingID === null)) {
      this.ShowMessageBoxWithOkBtn('اطلاعات آگهی را وارد کنید');
      return;
    }

    if ((this.HasRecDocAndPock ||
      (this.PopupParam.ModuleViewTypeCode === 90
        || this.PopupParam.ModuleViewTypeCode === 94 || this.PopupParam.ModuleViewTypeCode === 129
        || this.PopupParam.ModuleViewTypeCode === 130 || this.PopupParam.ModuleViewTypeCode === 141
        || this.PopupParam.ModuleViewTypeCode === 185))
      && isNullOrUndefined(this.DocumentDeadlineDate)) {
      this.ShowMessageBoxWithOkBtn('مهلت دریافت اسناد را وارد نمایید.');
      return;
    }

    let ValidateForm = true;
    ValidateForm = ValidateForm && this.InquiryNo &&
      (this.ISStarInquiryDateLableName === false ? true : this.InquiryDate) &&
      (!this.ISStarDocumentDeadlineDate ? true : this.DocumentDeadlineDate) &&
      (!this.HaveProposalReadingDate ? true : this.ProposalReadingDate) && this.Note;
    if (ValidateForm) {
      const Inquery = {
        InquiryID: this.InquiryObject ? this.InquiryObject.InquiryID : -1,
        CostFactorID: -1,
        InquiryNo: this.InquiryNo,
        InquiryDate: this.InquiryDate,
        InquiryTypeCode: 1,
        DeadLineTime: this.DeadLineDate,
        ArticleID: null,
        Note: this.Note,
        DepositAmount: this.DepositAmount,
        DocAmount: this.DocumentAmount,
        DocumentDeadline: this.DocumentDeadlineDate,
        SuggestionDeadline: this.SuggestionDeadlineDate,
        AdvertisingDate: this.AdvertisingDate,
        PrepaymentAmount: this.PrepaymentAmount,
        ActorCondition: this.ActorCondition,
        DeliveryLocation: this.DeliveryLocation,
        ReviewMethodCode: this.ReviewMethodParams.selectedObject ? this.ReviewMethodParams.selectedObject : null,
        RequestDocTypeCode: this.WarrantyReceiveDocTypeParams.selectedObject,
        WarrantyDuration: this.WarrantyDuration,
        ProposalReadingDate: this.ProposalReadingDate,
      };
      let ItemNo = 0;
      const ProposalList = [];
      const ProposalPersonContactInfoList = [];
      if (this.HaveSupplers) {
        this.PRCostGridApi.stopEditing();
        this.PRCostGridApi.forEachNode(node => {
          // tslint:disable-next-line: max-line-length
          const ActorID = node.data.ActorName && node.data.ActorId ? node.data.ActorId : (node.data.ActorID ? node.data.ActorID : -1);
          if ((ActorID && ActorID !== -1) || node.data.IdentityNo) {
            const Proposal = {
              ProposalID: node.data.ProposalID ? node.data.ProposalID : -1,
              InquiryID: node.data.InquiryID ? node.data.InquiryID : -1,
              ItemNo: ++ItemNo,
              // tslint:disable-next-line:max-line-length
              ActorID: ActorID,
              IsWin: node.data.IsWin ? true : false,
              // tslint:disable-next-line:max-line-length
              ProposalDate: node.data.PersianProposalDate && node.data.PersianProposalDate.MDate ? node.data.PersianProposalDate.MDate : (node.data.ShortProposalDate ? node.data.ShortProposalDate : null),
              LetterNo: node.data.LetterNo ? node.data.LetterNo : '',
              // tslint:disable-next-line:max-line-length
              LetterDate: node.data.PersianLetterDate && node.data.PersianLetterDate.MDate ? node.data.PersianLetterDate.MDate : (node.data.ShortLetterDate ? node.data.ShortLetterDate : null),
              // tslint:disable-next-line:max-line-length
              ExpireDate: node.data.PersianExpireDate && node.data.PersianExpireDate.MDate ? node.data.PersianExpireDate.MDate : (node.data.ShortExpireDate ? node.data.ShortExpireDate : null),
              Note: node.data.Note,
              InvitationNo: node.data.InvitationNo,
              // tslint:disable-next-line:max-line-length
              InvitationDate: node.data.PersianInvitationDate && node.data.PersianInvitationDate.MDate ? node.data.PersianInvitationDate.MDate : (node.data.ShortInvitationDate ? node.data.ShortInvitationDate : null),
              IsReceived: node.data.IsReceived ? true : false,
              IdentityNo: node.data.IdentityNo,
              PersonIdentityNo: node.data.PersonIdentityNo,
              CorporateIdentityNo: node.data.CorporateIdentityNo,
              BirthDate: node.data.BirthDate,
              CorporateTypeCode: node.data.CorporateTypeCode,
              TechnicalStatus: node.data.TechnicalStatus,
              WarrantyTime: node.data.WarrantyTime,
              ProposalValidateTime: node.data.ProposalValidateTime,
            };
            ProposalList.push(Proposal);
          }
        });
        this.PRCostGridApi.forEachNode(node => {
          const PersonContactInfo = {
            // tslint:disable-next-line:max-line-length
            ActorId: node.data.ActorID ? node.data.ActorID : -1,
            // tslint:disable-next-line:max-line-length
            Tel: node.data.TelNo ? node.data.TelNo : null,
            // tslint:disable-next-line:max-line-length
            Cell: node.data.CellNo ? node.data.CellNo : null,
            // tslint:disable-next-line:max-line-length
            Address: node.data.PersonAddress ? node.data.PersonAddress : null,
            RegionCode: this.ProductRequestObject.RegionCode
          };
          ProposalPersonContactInfoList.push(PersonContactInfo);
        });
      }

      // tslint:disable-next-line:max-line-length
      if (
        this.ProductRequestObject.RegionCode !== 200 &&
        (this.ProductRequestObject.RegionCode <= 22 || this.ProductRequestObject.DealMethodCode !== 3 || this.ProductRequestObject.DealMethodCode !== 1) && //RFC 58395
        this.PopupParam.ModuleViewTypeCode !== 35 &&
        this.PopupParam.ModuleViewTypeCode !== 42 &&
        this.PopupParam.ModuleViewTypeCode !== 57 &&
        this.PopupParam.ModuleViewTypeCode !== 158 && // RFC 59100
        this.PopupParam.ModuleViewTypeCode !== 104 &&
        this.PopupParam.ModuleViewTypeCode !== 128 && // RFC 54244
        this.PopupParam.ModuleViewTypeCode !== 70 &&
        this.PopupParam.ModuleViewTypeCode !== 94 &&
        this.PopupParam.ModuleViewTypeCode !== 43 && // RFC = 54022
        this.PopupParam.ModuleViewTypeCode !== 84 &&
        this.PopupParam.ModuleViewTypeCode !== 105 && // RFC 54355
        this.PopupParam.ModuleViewTypeCode !== 141 && // RFC 57662
        this.PopupParam.ModuleViewTypeCode !== 143 &&
        this.PopupParam.ModuleViewTypeCode !== 58 && this.HaveSupplers &&
        ((this.ProductRequestObject.IsCost && ProposalList.length < 3) ||
          (!this.ProductRequestObject.IsCost && ProposalList.length < 1))
        // این شرط برای قرارداد های درآمدی با حداقل یک شرکت کننده ثبت میشود
        // و برای قرارداد های هزینه ای با حداقل سه شرکت کننده
      ) {
        this.ShowMessageBoxWithOkBtn('حداقل سه شرکت کننده را برای استعلام وارد کنید');
        return;
      }
      if (CheckExceptions) {
        this.ProductRequest.GetSaveAdvertisingInquiryExceptions(this.ProductRequestObject.CostFactorID).subscribe((res: any) => {
          if (res !== '') {
            this.IsException = true;
            StrExceptions = res;
            StrExceptions = StrExceptions + ' ' + 'آیا می خواهید ادامه دهید؟';
            this.ShowMessageBoxWithYesNoBtn(StrExceptions);
          } else {
            this.ProductRequest.SaveAdvertisingInquiry(this.ProductRequestObject.CostFactorID,
              Inquery,
              this.NewsPaperParams.selectedObject,
              false,
              SelectedAdvertisingID,
              ProposalList,
              ProposalPersonContactInfoList,
              this.RatingRequired,
              this.PopupParam.OrginalModuleCode,
              this.PopupParam.ModuleViewTypeCode,
              this.HaveSupplers)
              .subscribe(res => {
                this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
                this.InquiryObject = res;
                this.IsDisable = false;
                this.PRCostRowData = this.InquiryObject.ProposalList;
                this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(ress => {
                  this.ProductRequestObject = ress;
                  this.PopupOutPut.emit(this.ProductRequestObject);
                });
                // this.ngOnInit();
              },
                err => {
                  if (!err.error.Message.includes('|')) {
                    this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
                  }
                });
          }
        });
      } else {
        this.ProductRequest.SaveAdvertisingInquiry(this.ProductRequestObject.CostFactorID,
          Inquery,
          this.NewsPaperParams.selectedObject,
          true,
          SelectedAdvertisingID,
          ProposalList,
          ProposalPersonContactInfoList,
          this.RatingRequired,
          this.PopupParam.OrginalModuleCode,
          this.PopupParam.ModuleViewTypeCode,
          this.HaveSupplers)
          .subscribe(res => {
            this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
            this.InquiryObject = res;
            this.IsDisable = false;
            this.PRCostRowData = this.InquiryObject.ProposalList;
            this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(ress => {
              this.ProductRequestObject = ress;
              this.PopupOutPut.emit(this.ProductRequestObject);
            });
            // this.ngOnInit();
          },
            err => {
              if (!err.error.Message.includes('|')) {
                this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
              }
            });
      }
    } else {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
    }

  }
  FetchMoreSupplerPerson(event) {
    // tslint:disable-next-line: max-line-length
    if (event.Owner && (event.Owner.ModuleViewTypeCode === 42 || event.Owner.ModuleViewTypeCode === 24 || event.Owner.ModuleViewTypeCode === 57 || event.Owner.ModuleViewTypeCode === 158)) { // RFC 51993
      if (event.Owner && event.Owner.SelectedPersonTypeCode) {
        const ResultList = [];
        if (event.Owner.ProductRequestObject.ProductRequestTypeCode) { //  RFC 50794
          let RegionCode = null;  // RFC 56993
          if (RegionCode > 210 && RegionCode < 219) {
            RegionCode = 210;
          }
          event.Owner.ProductRequest.GetRegionCodeByPRTypeCode(event.Owner.ProductRequestObject.ProductRequestTypeCode).subscribe(res => {
            if (res) {
              RegionCode = res;
            }
          });
          const promise = new Promise((resolve, reject) => {
            event.Owner.Actor.GetActorPaging(
              event.PageNumber,
              event.PageSize,
              event.term,
              event.SearchOption,
              event.Owner.SelectedPersonTypeCode === 1 ?
                true : event.Owner.SelectedPersonTypeCode === 2 ? false : null,
              false,
              true,
              null,
              null,
              RegionCode,
              false,
              event.Owner.ProductRequestObject.CostFactorID,
              true,
              true).subscribe(res => {
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
            event.Owner.Actor.GetActorPaging(
              event.PageNumber,
              event.PageSize,
              event.term,
              event.SearchOption,
              event.Owner.SelectedPersonTypeCode === 1 ?
                true : event.Owner.SelectedPersonTypeCode === 2 ? false : null,
              false,
              true,
              null,
              null,
              RegionCode,
              false,
              event.Owner.ProductRequestObject.CostFactorID,
              false,
              true).subscribe(res => {
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
    } else {
      if (event.Owner && event.Owner.SelectedPersonTypeCode) {
        const ResultList = [];
        const promise = new Promise((resolve, reject) => {
          event.Owner.Actor.GetActorPaging(
            event.PageNumber,
            event.PageSize,
            event.term,
            event.SearchOption,
            event.Owner.SelectedPersonTypeCode === 1 ?
              true : event.Owner.SelectedPersonTypeCode === 2 ? false : null,
            false,
            true).subscribe(res => {
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
  }

  FetchSupplerPersonByTerm(event) {

    // tslint:disable-next-line: max-line-length
    if (event.Owner && (event.Owner.ModuleViewTypeCode === 42 || event.Owner.ModuleViewTypeCode === 24 || event.Owner.ModuleViewTypeCode === 57 || event.Owner.ModuleViewTypeCode === 158)) { // RFC 51993
      if (event.Owner && event.Owner.SelectedPersonTypeCode) {
        if (event.Owner.ProductRequestObject.ProductRequestTypeCode) {
          let RegionCode = null;  // RFC 56993
          if (RegionCode > 210 && RegionCode < 219) {
            RegionCode = 210;
          }
          event.Owner.ProductRequest.GetRegionCodeByPRTypeCode(event.Owner.ProductRequestObject.ProductRequestTypeCode).subscribe(ress => {
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
              false,
              true,
              null,
              null,
              RegionCode,
              false,
              event.Owner.ProductRequestObject.CostFactorID,
              false,
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
            false,
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
    } else {
      if (event.Owner && event.Owner.SelectedPersonTypeCode) {
        event.Owner.Actor.GetActorPaging(
          event.PageNumber,
          event.PageSize,
          event.term,
          event.SearchOption,
          event.Owner.SelectedPersonTypeCode === 1 ?
            true : event.Owner.SelectedPersonTypeCode === 2 ? false : null,
          false,
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
    if (this.ModuleViewTypeCode === 42 || this.ModuleViewTypeCode === 24 || this.ModuleViewTypeCode === 57
      || this.ModuleViewTypeCode === 158) { // RFC 51993
      this.PRCostGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:max-line-length
          this.SelectedPersonTypeCode = node.data.PersonTypeCode;
        }
      });
      if (event.colDef && event.colDef.field === 'ActorIdentityName') {
        if (this.ProductRequestObject.ProductRequestTypeCode) {
          let RegionCode = null;  // RFC 56993
          if (RegionCode > 210 && RegionCode < 219) {
            RegionCode = 210;
          } //  RFC 50794
          this.ProductRequest.GetRegionCodeByPRTypeCode(this.ProductRequestObject.ProductRequestTypeCode).subscribe(ress => {
            if (ress) {
              RegionCode = ress;
            }
            // AllowState = true RFC 53455
            this.Actor.GetActorPaging(
              1,
              30,
              '',
              '',
              event.data.PersonTypeCode === 1,
              false,
              true,
              event.data.ActorID, null,
              RegionCode,
              false,
              this.ProductRequestObject.CostFactorID,
              false,
              true).subscribe(res => {
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
          this.Actor.GetActorPaging(
            1,
            30,
            '',
            '',
            event.data.PersonTypeCode === 1,
            false,
            true,
            event.data.ActorID,
            null,
            RegionCode,
            false,
            this.ProductRequestObject.CostFactorID,
            false,
            true).subscribe(res => {
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
    } else {
      this.PRCostGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:max-line-length
          this.SelectedPersonTypeCode = node.data.PersonTypeCode;
        }
      });
      if (event.colDef && event.colDef.field === 'ActorIdentityName') { // RFC 51984
        this.Actor.GetActorPaging(
          1,
          30,
          '',
          '',
          event.data.PersonTypeCode === 1,
          false,
          true,
          event.data.ActorID).subscribe(res => {
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
  OnInquiryDateChange(ADate) {
    this.InquiryDate = ADate.MDate;
  }

  OnDeadLineDateChange(ADate) {
    this.DeadLineDate = ADate.MDate;
  }
  OnDocumentDeadlineDateChange(ADate) {
    this.DocumentDeadlineDate = ADate.MDate;
  }
  OnSuggestionDeadlineDateChange(ADate) {
    this.SuggestionDeadlineDate = ADate.MDate;
  }
  OnAdvertisingDateChange(ADate) {
    this.AdvertisingDate = ADate.MDate;
  }
  OnProposalReadingDateChange(ADate) {
    this.ProposalReadingDate = ADate.MDate;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 530;
    this.startTopPosition = 215;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
    this.OverMainMinwidthPixel = null;
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
  MessageBoxAction(ActionResult) {
    this.isClicked = false;
    this.type = '';
    if (this.IsException && ActionResult === 'YES') {
      this.onSave(true);
      return;
    }
  }

  RowClick(event) {
    if (this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000) {
      this.SelectedProposal = false;
    } else {
      this.SelectedProposal = event.data;
    }
    this.Tel = event.data.TelNo ? event.data.TelNo : null;
    this.Cell = event.data.CellNo ? event.data.CellNo : null;
    this.Address = event.data.PersonAddress ? event.data.PersonAddress : null;
    this.SelectedActorID = event.data.ActorID ? event.data.ActorID : null;

    if (event.data.ProposalID && this.beforeID !== event.data.ProposalID) {
      this.SetLetterDetails();
      this.beforeID = event.data.ProposalID;
    } else if (!event.data.ProposalID) {
      this.RegisterLetterDate = null;
      this.DocumentLetterNo = null;
      this.RegisterLetterNo = null;
      this.beforeID = null;
      this.SelectedProposal = undefined;
    }
  }

  getDepositAmount(Amount) {
    this.DepositAmount = Amount;
  }
  getDocumentAmount(Amount) {
    this.DocumentAmount = Amount;
  }

  getPrepaymentAmount(Amount) {
    this.PrepaymentAmount = Amount;
  }

  WarrantyDurationChange(event) {
    this.WarrantyDuration = event;
  }

  onbtnDocumentUpload() {
    let EntityID = -1;
    EntityID = this.InquiryObject.InquiryID;
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 5;
    this.OverMainMinwidthPixel = null;
    this.ParamObj = {
      EntityID: EntityID,
      TypeCodeStr: '39-',
      DocTypeCode: 39,
      ModuleCode: this.PopupParam.OrginalModuleCode === 2824 && this.PopupParam.OriginModuleViewTypeCode === 500000 ? 2824 : 2730,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      DocumentTypeCodeList: this.FilterDocumentTypeCodeList,
      RegionCode: this.ProductRequestObject.RegionCode,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      IsReadOnly: !this.IsEditable
    };
  }

  onPersonReceiveDocArchiveClick(row) {
    if (!row.ProposalID || row.ProposalID < 0) {
      this.ShowMessageBoxWithOkBtn('متقاضی جهت بارگذاری اسناد انتخاب نشده است');
      return;
    }
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.OverMainMinwidthPixel = null;
    this.ParamObj = {
      EntityID: row.ProposalID,
      TypeCodeStr: '121-',
      DocTypeCode: 121,
      ModuleCode: 2730,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      DocumentTypeCodeList: [],
      RegionCode: this.ProductRequestObject.RegionCode,
    };
  }

  onbtnAdvertiseUpload() {
    if (!this.InquiryObject) {
      this.ShowMessageBoxWithOkBtn('ابتدا اطلاعات را ثبت نموده و سپس به بارگذاری اقدام نمایید.');
      return;
    }
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.OverMainMinwidthPixel = null;
    this.ParamObj = {
      EntityID: this.InquiryObject.InquiryID,
      TypeCodeStr: '40-',
      DocTypeCode: 40,
      ModuleCode: 2730,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      RegionCode: this.ProductRequestObject.RegionCode,
    };
  }

  onAdvertisingSearchClick() {
    this.type = 'advertising-search';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.MainMinwidthPixel = 500;
    this.startLeftPosition = 175;
    this.startTopPosition = 48;
    this.OverMainMinwidthPixel = null;
    this.ParamObj = {
      RegionCode: this.UserRegionCode ? this.UserRegionCode : this.ProductRequestObject.RegionCode,
      HeaderName: 'جستجوی آگهی'
    };
  }
  onbtnAdvertiseShow() {
    this.type = 'app-advertising',
      this.HaveHeader = true;
    this.isClicked = true;
    this.startLeftPosition = 108;
    this.startTopPosition = 5;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 645;
    this.OverMainMinwidthPixel = null;
    this.ParamObj = {
      // tslint:disable-next-line:max-line-length
      AdvertisingID: this.SelectedAdvertising.AdvertisingID ? this.SelectedAdvertising.AdvertisingID : this.InquiryObject.AdvertisingObject.AdvertisingID,
      HeaderName: 'مشاهده آگهی',
      ModuleCode: 2730,
      ModuleViewTypeCode: this.ModuleViewTypeCode
    };
  }

  getOutPutParam(event) {
    if (this.type === 'advertising-search') {
      this.SelectedAdvertising = event;
      this.AdvertisingCode = this.SelectedAdvertising.AdvertisingCode;
      this.IsSelectedAdvertising = true;
    } else if (this.type === 'proposal-item-estimate') {
      this.ProductRequest.RefreshProposalList(this.InquiryObject.InquiryID).subscribe(res => {
        this.PRCostRowData = res;
      });
    } else if (this.type === 'app-automation') {
      this.RegisterLetterDate = event.RegisterLetterDate;
      this.DocumentLetterNo = event.DocumentLetterNo;
      this.RegisterLetterNo = event.RegisterLetterNo;
    } else if (this.type === 'app-advertising') {
      let AdvertisingID;
      // tslint:disable-next-line: max-line-length
      AdvertisingID = this.SelectedAdvertising.AdvertisingID ? this.SelectedAdvertising.AdvertisingID : this.InquiryObject.AdvertisingObject.AdvertisingID;
      this.ProductRequest.GetAdvertising(AdvertisingID).subscribe(res => {
        this.AdvertisingObject = res;
        this.AdvertisingExpDate = this.AdvertisingObject.ShortExpireDate;
        this.AdvertisingRegDate = this.AdvertisingObject.ShortRegisterDate;
        this.ActualRegisterDate = this.InquiryObject.AdvertisingObject.ShortActualRegisterDate;
        this.ValidityDuration = this.AdvertisingObject.AdValidityDuration;
        this.ProductRequestObject.LastInquiryObject.AdvertisingObject.ShortExpireDate = this.AdvertisingObject.ShortExpireDate;
        this.ProductRequestObject.LastInquiryObject.AdvertisingObject.ShortRegisterDate = this.AdvertisingObject.ShortRegisterDate;
        this.ProductRequestObject.LastInquiryObject.AdvertisingObject.AdValidityDuration = this.AdvertisingObject.AdValidityDuration;
      });
    }

  }
  onAutomationClick() {
    const LetterTypeCodeList = [];
    LetterTypeCodeList.push(this.LetterTypeCode);
    if (!isUndefined(this.ProductRequestObject.RegionCode) &&
      this.LetterTypeCode &&
      this.SelectedProposal &&
      this.SelectedProposal.ProposalID) {
      this.isClicked = true;
      this.type = 'app-automation';
      this.HaveHeader = true;
      this.startLeftPosition = 144;
      this.startTopPosition = 42;
      this.MinHeightPixel = 300;
      this.OverMainMinwidthPixel = null;
      this.ParamObj = {
        CostFactorID: this.CostFactorID,
        RegionCode: this.ProductRequestObject.RegionCode,
        LetterTypeCodeList: LetterTypeCodeList,
        ProposalID: (this.SelectedProposal && this.SelectedProposal.ProposalID) ? this.SelectedProposal.ProposalID : null,
        SaveMode: true,
        AutoClose: true
      };
    }
  }
  onDeleteLetterClick() {
    if (this.LetterTypeCode &&
      this.SelectedProposal &&
      this.SelectedProposal.ProposalID) {
      const CostFactorLetter = {
        CostFactorID: this.CostFactorID,
        RegionCode: this.ProductRequestObject.RegionCode,
        LetterTypeCode: this.LetterTypeCode,
        ProposalID: (this.SelectedProposal && this.SelectedProposal.ProposalID) ? this.SelectedProposal.ProposalID : null,
      };
      this.Automation.DeleteLetter(CostFactorLetter).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('حذف نامه با موفقیت انجام شد');
      },
        err => {
          this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
        });
    }
  }
  onShowLetterClick() {
    if (this.LetterTypeCode &&
      this.SelectedProposal &&
      this.SelectedProposal.ProposalID) {
      const CostFactorLetter = {
        CostFactorID: this.CostFactorID,
        ProposalID: this.SelectedProposal.ProposalID,
        LetterTypeCode: this.LetterTypeCode
      };
      this.Automation.ShowLetter(CostFactorLetter);
    }
  }
  onCreateNewLetter() {
    if (this.LetterTypeCode &&
      this.SelectedProposal &&
      this.SelectedProposal.ProposalID) {
      this.isClicked = true;
      this.type = 'send-letter-page';
      this.HaveHeader = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 80;
      this.MinHeightPixel = 300;
      this.OverMainMinwidthPixel = null;
      this.ParamObj = {
        CostFactorID: this.SelectedProposal.ProposalID,
        RegionCode: this.ProductRequestObject.RegionCode,
        LetterTypeCode: this.LetterTypeCode,
        OrganizationCode: this.PopupParam.PRRegionObject.OrganizationCode,
        AutoClose: true
      };
    }
  }
  onPrintClick() {
    this.Report.GeneralTenderReport(this.ProductRequestObject.CostFactorID, 2730, 'مناقصه عمومی',
      this.SelectedRegionCode, this.InquiryID);
  }
  onPrintClick2() {
    // tslint:disable-next-line:max-line-length
    this.Report.GeneralTenderReport2(this.InquiryID, 2730, 'ارزیابی اسناد پیشنهادی شرکت کنندگان در مناقصه', this.SelectedRegionCode);
  }

  OnInfoChanged(event, type) {
    switch (type) {
      case 'Tel':
        if (this.SelectedActorID) {
          const itemsToUpdate = [];
          this.PRCostGridApi.forEachNode(node => {
            if (node.data.ActorID === this.SelectedActorID) {
              node.data.TelNo = event;
              itemsToUpdate.push(node.data);
            }
          });
          this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      case 'Cell':
        if (this.SelectedActorID) {
          const itemsToUpdate = [];
          this.PRCostGridApi.forEachNode(node => {
            if (node.data.ActorID === this.SelectedActorID) {
              node.data.CellNo = event;
              itemsToUpdate.push(node.data);
            }
          });
          this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      case 'Address':
        if (this.SelectedActorID) {
          const itemsToUpdate = [];
          this.PRCostGridApi.forEachNode(node => {
            if (node.data.ActorID === this.SelectedActorID) {
              node.data.PersonAddress = event;
              itemsToUpdate.push(node.data);
            }
          });
          this.PRCostGridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      default:
        break;
    }
  }
  OnRegiserLetterDateChange(event) { }


  SetLetterDetails() {
    if (this.SelectedProposal && this.SelectedProposal.ProposalID) {
      this.Automation.GetAutomationLetter(this.CostFactorID,
        this.LetterTypeCode,
        null,
        null,
        this.SelectedProposal.ProposalID)
        .subscribe(res => {
          this.RegisterLetterDate = res.RegisterLetterDate;
          this.DocumentLetterNo = res.DocumentLetterNo;
          this.RegisterLetterNo = res.RegisterLetterNo;
        });
    }
  }

  onPropsalItemClick() {
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
    this.startLeftPosition = 105;
    this.startTopPosition = 5;
    this.HaveMaxBtn = true;
    this.OverMainMinwidthPixel = null;
    this.ParamObj = {
      Proposal: this.SelectedProposal,
      ProductRequestObject: this.ProductRequestObject,
      ContractTypeCode: this.ProductRequestObject.ContractTypeCode,
      ReadOnly: false,
      ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
      OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      ModuleCode: this.PopupParam.ModuleCode,
      OriginModuleViewTypeCode: this.PopupParam.OriginModuleViewTypeCode
    };
  }
  getRatingRequired(RatingRequired) {
    if (RatingRequired) {
      this.RatingRequired = RatingRequired;
      this.RatingRequired = parseFloat(this.RatingRequired);
    } else {
      this.RatingRequired = '';
    }
  }

  onWFSave() {
    if (this.HaveSupplers) {
      this.PRCostGridApi.stopEditing();
    }
    switch (this.ModuleViewTypeCode) {
      case 38:
      case 131:
      case 132:
      case 139:
      case 157:
        this.SaveWFInauiry();
        break;
      default:
        break;

    }
  }

  SaveWFInauiry(IsCheckException = false) {
    // tslint:disable-next-line:max-line-length
    let CheckExceptions = (this.PopupParam.OrginalModuleCode === 2793 || this.PopupParam.OrginalModuleCode === 2824) && this.PopupParam.IsAdmin && !IsCheckException;
    let StrExceptions = '';
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if (this.DepositAmount && this.DepositAmount !== 0) {
      this.DepositAmount = this.DepositAmount.replace(/,/g, '');
    }

    let SelectedAdvertisingID;
    SelectedAdvertisingID = this.SelectedAdvertising ? this.SelectedAdvertising.AdvertisingID : null;
    this.CheckValidate = false;

    let ValidateForm = true;
    ValidateForm = ValidateForm && this.InquiryNo && (this.ISStarInquiryDateLableName === false ? true : this.InquiryDate) &&
      (!this.ISStarDocumentDeadlineDate || this.ModuleViewTypeCode === 131 ? true : this.DocumentDeadlineDate) && this.Note
      && (!this.HaveProposalReadingDate ? true : this.ProposalReadingDate)
      && (this.ModuleViewTypeCode !== 131 ? true : this.DepositAmount); // RFC 57759
    if (ValidateForm) {
      const Inquery = {
        InquiryID: this.InquiryObject ? this.InquiryObject.InquiryID : -1,
        CostFactorID: -1,
        InquiryNo: this.InquiryNo,
        InquiryDate: this.InquiryDate,
        Note: this.Note,
        InquiryTypeCode: 1,
        DeadLineTime: this.DeadLineDate,
        DepositAmount: this.DepositAmount,
        DocumentDeadline: this.DocumentDeadlineDate,
        AdvertisingDate: this.AdvertisingDate,
        RequestDocTypeCode: this.WarrantyReceiveDocTypeParams.selectedObject,
        ProposalReadingDate: this.ProposalReadingDate,
      };
      if (CheckExceptions) {
        this.ProductRequest.GetSaveAdvertisingInquiryExceptions(this.ProductRequestObject.CostFactorID).subscribe((res: any) => {
          if (res !== '') {
            this.IsException = true;
            StrExceptions = res;
            StrExceptions = StrExceptions + ' ' + 'آیا می خواهید ادامه دهید؟';
            this.ShowMessageBoxWithYesNoBtn(StrExceptions);
          } else {
            this.ProductRequest.SaveWFInquiry(this.ProductRequestObject.CostFactorID,
              Inquery,
              this.NewsPaperParams.selectedObject,
              false,
              SelectedAdvertisingID,
              this.RatingRequired,
              this.PopupParam.OrginalModuleCode)
              .subscribe(res => {
                this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
                this.InquiryObject = res;
                this.IsDisable = false;
                this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(ress => {
                  this.ProductRequestObject = ress;
                  this.PopupOutPut.emit(this.ProductRequestObject);
                });
              },
                err => {
                  console.log(err);
                });
          }
        });
      } else {
        this.ProductRequest.SaveWFInquiry(this.ProductRequestObject.CostFactorID,
          Inquery,
          this.NewsPaperParams.selectedObject,
          true,
          SelectedAdvertisingID,
          this.RatingRequired,
          this.PopupParam.OrginalModuleCode)
          .subscribe(res => {
            this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
            this.InquiryObject = res;
            this.IsDisable = false;
            this.ProductRequest.GetProductRequest(this.ProductRequestObject.CostFactorID).subscribe(ress => {
              this.ProductRequestObject = ress;
              this.PopupOutPut.emit(this.ProductRequestObject);
            });
          },
            err => {
              console.log(err);
            });
      }
    } else {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
    }
  }
  onPrintCartClick(event) {
    if (event.PersonTypeCode === 2) {
      if (event.ActorID) {
        this.Report.CorporateRep(
          this.PopupParam.ModuleCode,
          event.ActorID,
          'چاپ کارت پیمانکاری'
        );
      } else {
        this.ShowMessageBoxWithOkBtn('ابتدا شخص را انتخاب نمایید');
        return;
      }
    }
  }
  // OnAdvertisingExpDateChange(ADate) {
  //   this.AdvertisingExpDate = ADate.MDate;
  // }

  onShowContractorDetailsClick() { // RFC 52669
    if (!this.SelectedProposal.ProposalID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب شده ثبت نشده است');
      return;
    }
    if (this.SelectedProposal.PersonTypeCode === 1) {
      this.type = 'person2';
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.MinHeightPixel = 645;
      this.OverMainMinwidthPixel = 1300;
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
      this.MinHeightPixel = 645;
      this.OverMainMinwidthPixel = 1300;

      this.ParamObj = {
        CorporateID: this.SelectedProposal.ActorID,
        ObjectID: this.SelectedProposal.ActorID,
        ModuleViewTypeCode: 300000, // RFC 54203
        HeaderName: 'تامین کننده حقوقی',
      };
    }
  }
  onCancelReceiveElectronicDocs(row) { // RFC 61965
    if (!row.ProposalID || row.ProposalID < 0) {
      this.ShowMessageBoxWithOkBtn('متقاضی جهت لغو دریافت الکترونیک اسناد انتخاب نشده است');
      return;
    }
    if (row.ProposalID) {
      this.DealsHall.CancelReceiveElectronicDocs(row.ProposalID).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('حذف تایید نهایی ارسال الکترونیک اسناد با موفقیت انجام شد');
        }
      });
    }
  }
}
