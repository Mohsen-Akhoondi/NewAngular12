import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { isUndefined } from 'util';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { GridOptions } from 'ag-grid-community';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-corporate2',
  templateUrl: './corporate2.component.html',
  styleUrls: ['./corporate2.component.css']
})
export class Corporate2Component implements OnInit {
  @Input() InputParam;
  @ViewChild('IsScorer') IsScorer: TemplateRef<any>;
  @ViewChild('HaveGPS') HaveGPS: TemplateRef<any>;
  @ViewChild('ShowInformations') ShowInformations: TemplateRef<any>;
  @ViewChild('UploadImage') UploadImage: TemplateRef<any>;
  @ViewChild('IsCashValid') IsCashValid: TemplateRef<any>;
  @ViewChild('IsCountValid') IsCountValid: TemplateRef<any>;
  @ViewChild('IsSignRightValid') IsSignRightValid: TemplateRef<any>;
  @ViewChild('IsManagementChange') IsManagementChange: TemplateRef<any>;
  @ViewChild('IsShareHolderChange') IsShareHolderChange: TemplateRef<any>;
  @ViewChild('IsSignOwnerChange') IsSignOwnerChange: TemplateRef<any>;
  @ViewChild('IsAddressChange') IsAddressChange: TemplateRef<any>;
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  @ViewChild('UploadArchive2') UploadArchive2: TemplateRef<any>;
  @ViewChild('UploadArchive3') UploadArchive3: TemplateRef<any>;
  @ViewChild('IsForeignNationalsValid') IsForeignNationalsValid: TemplateRef<any>;
  @ViewChild('HaveHseValid') HaveHseValid: TemplateRef<any>;
  @ViewChild('HaveBailValid') HaveBailValid: TemplateRef<any>;
  @ViewChild('HaveCertificateValid') HaveCertificateValid: TemplateRef<any>;
  @ViewChild('MovableProperty') MovableProperty: TemplateRef<any>;
  @ViewChild('WorkLogDetail') WorkLogDetail: TemplateRef<any>;
  @ViewChild('PrintFlow') PrintFlow: TemplateRef<any>;
  @ViewChild('AllowStateCodeUpdate') AllowStateCodeUpdate: TemplateRef<any>;
  @Output() Corporate2Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('HasOpenWF') HasOpenWF: TemplateRef<any>;
  @ViewChild('ShowRank') ShowRank: TemplateRef<any>;
  @ViewChild('ShowContractorwinercommition') ShowContractorwinercommition: TemplateRef<any>;
  @ViewChild('ShowHistoryList') ShowHistoryList: TemplateRef<any>;
  @ViewChild('RevokeProcess') RevokeProcess: TemplateRef<any>;
  @ViewChild('EquipmentDocuments') EquipmentDocuments: TemplateRef<any>;
  IsCheckException = false;
  VirtualModuleTypeCode: number;
  RegionCode;
  IsPerson = true;
  btnConfirmName;
  HaveAlertToFinance;
  CheckValidate = false;
  DisplayBtns = false;
  ShowWorkflowButtons = true;
  WorkflowButtonsWidth = 48;
  IsShow = true;
  PopupParam;
  ShowSendBtn = true;
  IsEndFlow;
  ShowConfermBtn = true;
  ObjectNo: string;
  CartableUserID;
  ObjectID: any;
  ShowReturnBtn = true;
  CurrWorkFlow: any;
  btnConfirmAndReturnName = 'عدم تایید و بازکشت';
  IsDisable = false;
  ReadyToConfirm = null;
  IsEditable = true;
  btnConfirmIcon;
  IsContractRemainStartWF;
  BtnClickedName: string;
  ChangeDetection: any;
  IsExpertSelected = false;
  WorkFlowID: number = null;
  FromWorkListCartable = false;
  MinimumPosting: any;
  WorkflowTypeCode;
  WorkflowObjectCode = 11;
  WorkflowTypeName;
  CorporateID;
  ModuleViewTypeCode = 3;
  IsDisplay = false;
  HaveSupplementary = false;
  HaveBankInfo = true;
  // ModuleCode = 2785;
  HaveMaxBtn = false;
  PercentWidth;
  MinHeightPixel;
  HaveCompleteInfo;
  IsShowCompleteInfo;
  PixelHeight;
  MainMaxwidthPixel;
  OverMainMinwidthPixel;
  PixelWidth;
  IsLimitedRisponsibility = false;
  LocationItems;
  CorporateRegistertypeItem;
  RequestDate;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  WorkFlowTransitionID;
  OldName: any;
  CellNo: any;
  equipmentandmachineryColumnDef;
  affordabilityColumnDef;
  equipmentandmachineryrowsData: any = [];
  affordabilityrowsData: any = [];
  affordabilityApi;
  equipmentandmachineryApi;
  GradeReq;
  ManagersMinutesDate;
  ManagersCount;
  SignedRightHolders;
  IsLimitedManagersEndDate;
  ManagersEndDate;
  IsContractor;
  IsConsult;
  IsProducer;
  IsSupplier;
  IsInternalBuilders;
  IsExternalBuilders;
  MainMinwidthPixel;
  ActorBusinessAllowStateList: any[];
  OrginalModuleCode;

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

  NgSelectCTContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    MinWidth: '200px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'city-ngsv',
  };
  NgSelectLocationParams = {
    Items: [],
    bindLabelProp: 'CityName',
    bindValueProp: 'CityID',
    placeholder: '',
    MinWidth: '195px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    DropDownMinWidth: '320px',
    type: 'city',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد شهر', HeaderName: 'CityCode', width: 35, MinTermLenght: 1, SearchOption: 'CityCode' },
        { HeaderCaption: 'نام شهر', HeaderName: 'CityName', width: 53, MinTermLenght: 2, SearchOption: 'CityName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد شهر', width: 35, },
        { HeaderCaption: 'نام شهر', width: 53, },],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  NgSelectCorporateRegistertypeParams = {
    Items: [],
    bindLabelProp: 'CorporateRegisterTypeName',
    bindValueProp: 'CorporateRegisterTypeCode',
    placeholder: '',
    MinWidth: '195px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  ActivityFieldItems = [];
  ContractTypeItems = [
    {
      ContractTypeName: 'جمع آوری پسماند خشک خارج از شهرداری تهران',
      ContractTypeCode: 1
    }, {
      ContractTypeName: 'خدمات عمومی خارج از شهرداری تهران',
      ContractTypeCode: 2
    }, {
      ContractTypeName: 'خدمات عمومی شهرداری تهران',
      ContractTypeCode: 3
    }, {
      // 'خدمات شهری خارج از شهرداری',
      ContractTypeName: 'رفت و روب پسماند تر خارج از شهرداری',
      ContractTypeCode: 4
    },
    //  {
    //   ContractTypeName: 'قرارداد اعضا در شرکت قبلی (شهرداری)',
    //   ContractTypeCode: 5
    // }, 
    // {
    //   ContractTypeName: 'جمع آوری پسماند خشک شهرداری تهران',
    //   ContractTypeCode: 6
    // }, 
    // {
    //   ContractTypeName: 'قرارداد پسماند خشک اعضا در شرکت قبلی (شهرداری تهران)',
    //   ContractTypeCode: 7
    // }
  ];
  YearFieldItems = [
    { HistoryYear: '0', HistoryYearcode: 0 }, { HistoryYear: '1', HistoryYearcode: 1 },
    { HistoryYear: '2', HistoryYearcode: 2 }, { HistoryYear: '3', HistoryYearcode: 3 },
    { HistoryYear: '4', HistoryYearcode: 4 }, { HistoryYear: '5', HistoryYearcode: 5 },
    { HistoryYear: '6', HistoryYearcode: 6 }, { HistoryYear: '7', HistoryYearcode: 7 },
    { HistoryYear: '8', HistoryYearcode: 8 }, { HistoryYear: '9', HistoryYearcode: 9 },
    { HistoryYear: '10', HistoryYearcode: 10 }, { HistoryYear: '11', HistoryYearcode: 11 },
    { HistoryYear: '12', HistoryYearcode: 12 }, { HistoryYear: '13', HistoryYearcode: 13 },
    { HistoryYear: '14', HistoryYearcode: 14 }, { HistoryYear: '15', HistoryYearcode: 15 },
    { HistoryYear: '16', HistoryYearcode: 16 }, { HistoryYear: '17', HistoryYearcode: 17 },
    { HistoryYear: '18', HistoryYearcode: 18 }, { HistoryYear: '19', HistoryYearcode: 19 },
    { HistoryYear: '20', HistoryYearcode: 20 }, { HistoryYear: '21', HistoryYearcode: 21 },
    { HistoryYear: '22', HistoryYearcode: 22 }, { HistoryYear: '23', HistoryYearcode: 23 },
    { HistoryYear: '24', HistoryYearcode: 24 }, { HistoryYear: '25', HistoryYearcode: 25 },
    { HistoryYear: '26', HistoryYearcode: 26 }, { HistoryYear: '27', HistoryYearcode: 27 },
    { HistoryYear: '28', HistoryYearcode: 28 }, { HistoryYear: '29', HistoryYearcode: 29 },
    { HistoryYear: '30', HistoryYearcode: 30 }
  ];
  NgSelectYearParams = {
    bindLabelProp: 'HistoryYear',
    bindValueProp: 'HistoryYearcode',
    placeholder: '',
    MinWidth: '100%',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  mounthFieldItems = [
    { HistoryMonth: '0', HistoryMonthCode: 0 },
    { HistoryMonth: '1', HistoryMonthCode: 1 },
    { HistoryMonth: '2', HistoryMonthCode: 2 },
    { HistoryMonth: '3', HistoryMonthCode: 3 },
    { HistoryMonth: '4', HistoryMonthCode: 4 },
    { HistoryMonth: '5', HistoryMonthCode: 5 },
    { HistoryMonth: '6', HistoryMonthCode: 6 },
    { HistoryMonth: '7', HistoryMonthCode: 7 },
    { HistoryMonth: '8', HistoryMonthCode: 8 },
    { HistoryMonth: '9', HistoryMonthCode: 9 },
    { HistoryMonth: '10', HistoryMonthCode: 10 },
    { HistoryMonth: '11', HistoryMonthCode: 11 },
    { HistoryMonth: '12', HistoryMonthCode: 12 },
  ];
  NgSelectmounthParams = {
    bindLabelProp: 'HistoryMonth',
    bindValueProp: 'HistoryMonthCode',
    placeholder: '',
    MinWidth: '100%',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'mounthField'
  };
  NgSelectActivityFieldParams = {
    Items: [],
    bindLabelProp: 'CorporateUrbanActivityName',
    bindValueProp: 'CorporateUrbanActivityCode',
    placeholder: '',
    MinWidth: '195px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectUserTypeParams = {
    bindLabelProp: 'AcountTypeName',
    bindValueProp: 'AcountTypeID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'User-type'
  };
  NgSelectActivityFieldsParams = {
    bindLabelProp: 'CorporateUrbanActivityName',
    bindValueProp: 'CorporateUrbanActivityCode',
    placeholder: '',
    MinWidth: '195px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Activity-Field'
  };
  NgSelectAssetTypeParams = {
    bindLabelProp: 'ProviderAssetTypeName',
    bindValueProp: 'ProviderAssetTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Provider-Asset-type'
  };
  NgSelectownerShipTypeParams = {
    bindLabelProp: 'OwnershipTypeName',
    bindValueProp: 'OwnershipTypeID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Ownership-type'
  };
  columnDef_Person;
  colDef;
  gridApi_Person: any;
  gridApi: any;
  gridApiEH: any;
  TecnicalPersGridApi: any;
  gridApiIP: any;
  gridApiCS: any;
  gridApiMCP: any;
  gridApiPT: any;
  rowData = [];
  ActivityField = [];
  // OFFICIAL GAZETTE
  OfficialGazetteRows = [];
  OfficialGazetteColDef;
  OfficialGazetteSelectedRow;
  NgSelectAdTypeParams = {
    bindLabelProp: 'AdvertisingTypeName',
    bindValueProp: 'AdvertisingTypeCode',
    placeholder: '',
    MinWidth: '140px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'advertising-type'
  };
  NgResponsibilityTypeParams = {
    bindLabelProp: 'ResponsibilityTypeName',
    bindValueProp: 'ResponsibilityTypeCode',
    placeholder: '',
    MinWidth: '140px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'TechnicalResponsibilityType'
  };
  OfficialGazetteList: any;
  gridApiOG: any;

  // Corporate Shares
  CorporateSharesSelectedRow: any;
  CorporateSharesColDef;
  CorporateSharesRows = [];
  CorporateSharesList: any;

  // Manager Corporate Position
  SelectedMCPRow;
  ManagerCorporatePositionSelectedRow;
  ManagerCorporatePositionColDef;
  ManagerCorporatePositionRows = [];
  ManagerCorporatePositionList: any;

  // TechnicalPersonnel Property:
  TechnicalPersonnelCorporatePositionList = [];
  TechnicalPersonnelPropertyColDef;
  TechnicalPersonnelCorporatePositionSelectedRow;
  PersonTypeList: any;
  SelectedPersonTypeCode: number;
  NgSelectVSParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: true,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'TechnicalPerson',
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
  // Immovable Property
  ImmovablePropertyColDef;
  ImmovablePropertySelectedRow;
  ImmovablePropertyRows = [];
  ImmovablePropertyList: any;


  // Execution History
  ExecutionHistoryList: any;
  ExecutionHistoryRows = [];
  ExecutionHistoryColDef;
  ExecutionHistorySelectedRow;
  ActorCetificateSelectedRow;
  DisableAll: boolean;
  NgSelectCsParams = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'contract-status-ngsv'
  };
  NgSelectCTParams = {
    bindLabelProp: 'CityName',
    bindValueProp: 'CityID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'city-ngsv',
  };
  NgSelectStParams = {
    bindLabelProp: 'StateName',
    bindValueProp: 'StateCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'State-ngsv',
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
  // NewItemTemp = { ManagementTypeName: 'هيئت مديره و مدير عامل' , ManagementTypeCode:2};
  NgSelectResponsibilityTypeParams = {
    bindLabelProp: 'ResponsibilityTypeName',
    bindValueProp: 'ResponsibilityTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'ResponsibilityType',
  };
  NgSelectIsLimitedEndDateParams = {
    bindLabelProp: 'IsLimitedEndDateName',
    bindValueProp: 'IsLimitedEndDate',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: '',
  };

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
  NgSelectShareTypeParams = {
    bindLabelProp: 'ShareTypeName',
    bindValueProp: 'ShareTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'share-type'
  };
  BoxDevHeight = 85;
  selectedRow: any;
  IdentityNo: string;
  IdentityNoSearch: any;
  PostCodeSearch: any;
  Validate: any;
  ActorId: any;
  RegisterReferenceNameItems;
  EconomicCode: any;
  AllowStateName: any;
  CompanyAgentEmail;
  CompanyAgentTel;
  CompanyAgentName;
  RegisterReferenceName: any;
  RegisterPersianDate: any;
  RegisterNo: any;
  ActorName: any;
  CorporateObject;
  CorporateTypeName: any;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  Address: any = '';
  ActorNote: any = '';
  Tel: any;
  Cell: any;
  Email: any;
  Web: any;
  PostCod: any;
  Fax: any;
  PostCode: any = '';
  IsArchive = false;
  ActivityStartDate: any;
  EmployeCount: any;
  Note: any;
  // Corporate Object Image var's
  Image: any;
  UserLocalImage;
  ImgLoadMsgSize;
  ImgLoadMsgType;
  ImgLoadMsgDimensions;
  fileListlength;
  selectedFile;
  ImageMsgLoded;
  IsUncorrect;
  img;
  CorporateParam;
  ManagementTypeCode;

  // csm image var's
  // ImgLoadMsgSizeCSM;
  // ImgLoadMsgTypeCSM;
  // ImgLoadMsgDimensionsCSM;
  // fileListlengthCSM;
  selectedFileCSM;
  ImageMsgLodedCSM;
  IsUncorrectCSM;
  imgCSM;

  NgSelectRegisterReferenceNameParams = {
    Items: [],
    bindLabelProp: 'RegisterReferenceName',
    bindValueProp: 'RegisterReferenceId',
    placeholder: '',
    MinWidth: '157px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  // MovableColumnDef;
  // CorporateMovableAssetSelectedRow;
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
  NgSelectActorParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'Actor',
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

  NgSelectActorCSMParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'Actor-MCP',
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

  // MovablegridApi: any;
  // MovablerowsData: any = [];

  RankColumnDef;
  RankrowsData: any = [];
  RankgridApi: any;
  EvaluatorList: any = [];
  CertificationEvaluatorList: any[];
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
  // MovableBusinessPatternParams =
  //   {
  //     bindLabelProp: 'BusinessPatternName',
  //     bindValueProp: 'BusinessPatternID',
  //     selectedObject: null,
  //     IsDisabled: false,
  //     loading: false,
  //     MinWidth: '100px',
  //     DropDownMinWidth: '200px',
  //     IsVirtualScroll: false,
  //     type: 'business-pattern'
  //   };
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
  RankSelectedRow;
  IsLimitedEndDateListParams;

  // RFC 52043-Item2
  ActorBankColDef: any;
  ActorPropertyColDef: any;
  BankrowData = [];
  ActorPropertyRowData = [];
  BankgridApi;
  ActorPropertyApi;
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
  HeightPercentWithMaxBtn;

  OwnershipTypeData: any[] = [
    {
      OwnershipTypeName: 'استیجاری',
      OwnershipTypeCode: 1
    },
    {
      OwnershipTypeName: 'مالکیت قطعی',
      OwnershipTypeCode: 2
    }];
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
  PropertyTypeData: any[] = [
    {
      PropertyTypeName: 'شخصی',
      PropertyTypeCode: 1
    },
    {
      PropertyTypeName: 'شرکتی',
      PropertyTypeCode: 2
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
  ActorPropertySelectedRow;
  WorkflowInstanceID: number;
  // RFC 52837-Item2
  ProviderSurvey: string = window.location.origin + '/Templates/پرسشنامه فني تامين كنندگان.doc';
  ExternalBuilderSurvey: string = window.location.origin + '/Templates/پرسشنامه سازندگان خارجی.doc';
  InternalBuilderSurvey: string = window.location.origin + '/Templates/پرسشنامه فني سازندگان داخلی.doc';
  OtherInfo: string = window.location.origin + '/Templates/سایر اطلاعات.doc';
  FinancialSurvey: string = window.location.origin + '/Templates/پرسشنامه مالی.doc';

  MovablerowsDataPopupParam = [];

  CompanyAgentActorItems;
  NgSelectCompanyAgentActorParams = {
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
    type: 'Company-Agent-Actor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader: [{ HeaderCaption: 'کد ملي', width: 35, }, { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  TabsContentHeight = 58;
  RolefielsetMarginTop = 0;
  RolefielsetMarginBottom = 1;
  IsAdmin = false;
  IsAdminTraffic = false;
  Subject;
  HaveHSE;
  HaveBail;
  HaveCertificate;
  ActorPropertyID;
  ActorPropertyList = [];
  DisplaySearchBox = true;
  private sub: any;
  ModuleCode;
  IsFromSearch = false;
  ButtonsBoxWidth = 65;
  currentCitySearchTerm;
  IsExtraMode = false;
  IsEditableForType3 = false;
  IsEditableForAdminType3 = false;
  HaveNotAllowEditFirstInf = true;
  HaveNotAllowEditSecondInf = true;
  RegisterDate: any;
  NgSelectGoodsParams = {
    bindLabelProp: 'GoodsName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'goods'
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
    Required: true,
    type: 'ExeUnitParams'
  };
  ButtonName = 'ثبت ظرفیت مازاد';
  CanEdite = false;
  CanSave = false;

  DisableSelectFileWindow = true; // RFC 56709
  ARankrowsDataList;
  HasAlert = false;
  EditableRank = true;
  ChangeRowsData = [];

  CpGridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.IsChanged === true && this.needShowColor === true) {
        return { 'background-color': '#ffe600' };
      }
    }
  };
  OGGridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.IsChanged === true && this.needShowColor === true) {
        return { 'background-color': '#ffe600' };
      }
    }
  };
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.IsChanged === true && this.needShowColor === true) {
        return { 'background-color': '#ffe600' };
      }
      if (params.data.AllowStateCode === 7) {
        return { 'background-color': '#d1f0d1', };
      }
    }
  };
  needShowColor = false;
  BackGroundColor: any = '#ffe600';
  CorporateNameChangeFlag = false;
  IdentityNoChangeFlag = false;
  RegisterReferenceIdChangeFlag = false;
  RegisterNoChangeFlag = false;
  EconomicCodeChangeFlag = false;
  ActivityStartDateChangeFlag = false;
  EmployeCountChangeFlag = false;
  NoteChangeFlag = false;
  AddressChangeFlag = false;
  PostCodeChangeFlag = false;
  FaxChangeFlag = false;
  GradeRequestChangeFlag = false;
  WebChangeFlag = false;
  EmailChangeFlag = false;
  OldNameChangeFlag = false;
  ActivityFieldChangeFlag = false;
  CorporateCityIDChangeFlag = false;
  RequestDateChangeFlag = false;
  IsLimitedRisponsibilityChangeFlag = false;
  IsContractorChangeFlag = false;
  IsConsultChangeFlag = false;
  IsProducerChangeFlag = false;
  IsSupplierChangeFlag = false;
  IsInternalBuildersChangeFlag = false;
  IsExternalBuildersChangeFlag = false;
  CompanyAgentNameChangeFlag = false;
  CompanyAgentTelChangeFlag = false;
  ManagersCountChangeFlag = false;
  SignedRightHoldersChangeFlag = false;
  ManagersMinutesDateChangeFlag = false;
  IsLimitedManagersEndDateChangeFlag = false;
  ManagersEndDateChangeFlag = false;
  CompanyAgentEmailChangeFlag = false;
  CompanyAgentActorIDChangeFlag = false;
  SubjectChangeFlag = false;
  HaveHSEChangeFlag = false;
  HaveBailChangeFlag = false;
  HaveCertificateChangeFlag = false;
  CellNoChangeFlag = false;
  ActorNoteChangeFlag = false;

  constructor(private Actor: ActorService,
    private ProductRequest: ProductRequestService,
    private router: Router,
    private User: UserSettingsService,
    private Cartable: CartableServices,
    private CommonServic: CommonServices,
    private RefreshEquipmentTypeItems: RefreshServices,
    private RefreshServiceObj: RefreshServices,
    private ContractStatusService: ContractListService,
    private Region: RegionListService,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService,
    private RefreshPersonItems: RefreshServices,
    private ContractPayDetails: ContractPayDetailsService,
    private Common: CommonService,
    private Report: ReportService,
    private route: ActivatedRoute) {
    this.EvaluatorList = [
      { EvaluatorID: '734', EvaluatorName: 'شهرداری تهران' },
      { EvaluatorID: '6978079', EvaluatorName: 'سازمان مدیریت' },
      { EvaluatorID: '7060739', EvaluatorName: 'شورای عالی انفورماتیک' },
      { EvaluatorID: '7056530', EvaluatorName: 'وزارت تعاون، کار و رفاه اجتماعی' }];
    this.PersonTypeList = [{ PersonTypeName: 'حقیقی', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقی', PersonTypeCode: 2 }];
    this.IsLimitedEndDateListParams = [{ IsLimitedEndDate: 1, IsLimitedEndDateName: 'محدود' },
    { IsLimitedEndDate: 0, IsLimitedEndDateName: 'نامحدود' }];
    this.CertificationEvaluatorList = [
      { CertificationEvaluatorID: 734, CertificationEvaluatorName: 'شهرداری تهران' },
      { CertificationEvaluatorID: 6978079, CertificationEvaluatorName: 'سازمان مدیریت' },
      { CertificationEvaluatorID: 7060739, CertificationEvaluatorName: 'شورای عالی انفورماتیک' },
      { CertificationEvaluatorID: 7056530, CertificationEvaluatorName: 'وزارت تعاون، کار و رفاه اجتماعی' },
      { CertificationEvaluatorID: 6476300, CertificationEvaluatorName: 'سایر' }
    ];

    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }

  doCompanyAgentActorSearch(event) {
    this.NgSelectCompanyAgentActorParams.loading = true;
    this.Actor.GetAllActorsPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false, false).subscribe(res => {
        this.CompanyAgentActorItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'Company-Agent-Actor'
          });
      });
    this.NgSelectCompanyAgentActorParams.loading = false;
  }
  OpenCompanyAgentActor(CAgentActorID) {
    this.Actor.GetAllActorsPaging(1, 30, '', 'IdentityNo', true, false, false, CAgentActorID).subscribe(res => {
      this.CompanyAgentActorItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'Company-Agent-Actor'
      });
      this.NgSelectCompanyAgentActorParams.selectedObject = CAgentActorID;
    });
  }
  FetchMoreCompanyAgentActor(event) {
    this.NgSelectCompanyAgentActorParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetAllActorsPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        true,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.CompanyAgentActorItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.CompanyAgentActorItems.push(element);
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
        type: 'Company-Agent-Actor'
      });
    });
  }
  onTechnicalPersonnelcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.TechnicalPersonnelPropertyColDef[1].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', true, false, true, event.data.ActorID).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'TechnicalPerson'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ResponsibilityTypeName') {
      this.Common.GetAllResponsibilityTypeByManagementTypeCode(3).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'TechnicalResponsibilityType'
        });
      });
    }
  }
  FetchMoreTechnicalPerson(event) {
    event.Owner.ManagerCorporatePositionColDef[4].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, true, false, true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'TechnicalPerson'
      });
    });
  }
  FetchSupplerPersonByTerm(event) {
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'LetterNo';
    }
    if (event.Owner) {
      event.Owner.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        true, false, true).subscribe(res => {
          event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'TechnicalPerson'
          });
        });
    }
  }
  ngOnInit() {
    const promise = new Promise((resolve, reject) => {
      this.User.CheckAdminRole1255().subscribe(res => {
        if (res === 1) {
          this.IsAdmin = true;
        } else if (res === 2) {
          this.IsAdminTraffic = true;
        } else {
          this.IsAdmin = false;
        }
        resolve(true);
      });
    }).then(() => {

      if (this.IsAdmin) {
        this.BtnClickedName = 'AdminMode';
        this.ShowMessageBoxWithYesNoBtn('آیا تمایل به نمایش فرم در حالت ادمین دارید؟');
      }

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
      this.ViewTypeChange();
      this.RankColumn(this.IsAdmin, this.IsAdminTraffic);
    });

    this.IsFromSearch = this.ModuleCode === 2885 || this.ModuleCode === 2893 ? true : false; // RFC 53349
    this.ShowWorkflowButtons = this.ModuleCode === 2885 || this.ModuleCode === 2893 || this.ModuleCode === 2872 ? false : true; // RFC 54203
    this.ButtonsBoxWidth = this.ModuleCode === 2885 || this.ModuleCode === 2893 ? 100 : 65;
    if (this.InputParam) {
      this.IsShowCompleteInfo = this.InputParam.IsShowCompleteInfo;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsContractRemainStartWF = this.InputParam.IsStartWF;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.ReadyToConfirm = this.InputParam.ReadyToConfirm;
      this.CorporateID = this.InputParam.CorporateID;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.WorkflowTypeName = this.InputParam.WorkflowTypeName;
      this.WorkflowTypeCode = this.InputParam.WorkflowTypeCode;
      this.ObjectNo = this.InputParam.ObjectNo;
      this.ObjectID = this.InputParam.ObjectID;
      this.CartableUserID = this.InputParam.CartableUserID;
      this.MinimumPosting = this.InputParam.MinimumPosting;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
    }
    if (this.WorkFlowID) {
      this.ModuleCode = 2785;
      this.FromWorkListCartable = true;
      this.onSearch(this.ObjectID, this.CurrWorkFlow.RegionCode);
    } else if (this.CorporateID) {
      this.onSearch(this.CorporateID, null);
    } else {
      this.Common.ISExternalUser(true).subscribe(res => {
        if (res !== null) {
          this.FindActor(res);
          this.DisplayBtns = false;
          this.IdentityNoSearch = res.IdentityNo;
        } else {
          this.DisplayBtns = true;
        }
      });
    }

    this.Actor.GetRegisterRefrence().subscribe(ress => {
      if (ress) {
        this.RegisterReferenceNameItems = ress;
      }
    });
    this.Common.GetAllCorporateRegistertype().subscribe(res => {
      this.CorporateRegistertypeItem = res;
    });
    this.Common.GetAllCorporateActivity().subscribe(resss => {
      this.ActivityFieldItems = resss;
    });

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 32.5;

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
      // this.HaveConfirm = true;
    }

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.CorporateSharesColDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
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
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PersonTypeName) {
            params.data.PersonTypeName = params.newValue.PersonTypeName;
            params.data.PersonTypeCode = params.newValue.PersonTypeCode;
            if (params.data.PersonTypeCode === 1) {
              this.IsPerson = true;
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'کد ملي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام و نام خانوادگي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].TermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'کد ملي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام و نام خانوادگي';
            } else {
              this.IsPerson = false;
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
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 110,
        resizable: true
      },
      {
        headerName: 'سهام دار',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectActorParams,
          Items: [],
          MoreFunc: this.FetchMoreActor,
          FetchByTerm: this.FetchActorByTerm,
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
          if (params.newValue && params.newValue.ActorId) {
            params.data.ActorID = params.newValue.ActorId;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = null;
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
        width: 300,
        resizable: true
      },
      {
        headerName: 'نوع سهام',
        field: 'ShareTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectShareTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ShareTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ShareTypeCode) {
            params.data.ShareTypeCode = params.newValue.ShareTypeCode;
            params.data.ShareTypeName = params.newValue.ShareTypeName;
            return true;
          } else {
            params.data.ShareTypeCode = null;
            params.data.ShareTypeName = null;
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
        width: 170,
        resizable: true
      },
      {
        headerName: 'نقدی / غیرنقدی',
        field: 'IsCash',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsCashValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsCash = params.newValue;
            return true;
          } else {
            params.data.IsCash = false;
            return false;
          }
        },
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
        headerName: 'میزان مالکیت سهام',
        field: 'Value',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, MaxLength: 6, FloatMaxLength: 3 },
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
        headerName: 'تعدادی',
        field: 'IsCount',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsCountValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsCount = params.newValue;
            return true;
          } else {
            params.data.IsCount = false;
            return false;
          }
        },
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
        headerName: 'ارزش اسمی سهم',
        field: 'NominalValue',
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
        headerName: 'ارزش واقعی سهم',
        field: 'RealValue',
        width: 130,
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
        headerName: 'تاریخ عضویت در سهام',
        field: 'ShamsiMembershipDate',
        width: 140,
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
          CurrShamsiDateValue: 'ShamsiMembershipDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 130,
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
    ];
    this.ManagerCorporatePositionColDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'حق امضاء',
        field: 'SignRight',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsSignRightValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.SignRight = params.newValue;
            return true;
          } else {
            params.data.SignRight = false;
            return false;
          }
        },
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
      },
      {
        headerName: 'بارگذاری امضاء',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadImage,
        },
      },
      {
        headerName: 'اتباع خارجه است؟',
        field: 'IsForeignNationals',
        width: 120,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererParams: {
          ngTemplate: this.IsForeignNationalsValid
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsForeignNationals = params.newValue;
            return true;
          } else {
            params.data.IsForeignNationals = false;
            return false;
          }
        },
      },
      {
        headerName: 'نام و نام خانوادگی',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectActorCSMParams,
          Items: [],
          MoreFunc: this.FetchMoreActorMCP,
          FetchByTerm: this.FetchActorByTermMCP,
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
          if (params.newValue && params.newValue.ActorId) {
            params.data.ActorID = params.newValue.ActorId;
            params.data.ActorName = params.newValue.ActorName;
            this.Common.GetPersonByActorID(params.newValue.ActorId).subscribe(res => {
              if (res.Nationality === 'IR' || res.Nationality === null) {
                params.data.IsForeignNationals = false;
              } else {
                params.data.IsForeignNationals = true;
              }
            });
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 300,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 120,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
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
            this.ManagementTypeCode = params.newValue.ManagementTypeCode;
            params.data.ResponsibilityTypeName = null;
            params.data.ResponsibilityTypeCode = null;
            return true;
          } else {
            params.data.ManagementTypeCode = null;
            params.data.ManagementTypeName = null;
            params.data.ResponsibilityTypeName = null;
            params.data.ResponsibilityTypeCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
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
            params.data.ResponsibilityTypeName = null;
            params.data.ResponsibilityTypeCode = null;
            return false;
          }
        },
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان مسئولیت',
        field: 'IsLimitedEndDateName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectIsLimitedEndDateParams,
          Items: this.IsLimitedEndDateListParams,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.IsLimitedEndDateName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && (params.newValue.IsLimitedEndDate === 0 || params.newValue.IsLimitedEndDate === 1)) {
            params.data.IsLimitedEndDateName = params.newValue.IsLimitedEndDateName;
            params.data.IsLimitedEndDate = params.newValue.IsLimitedEndDate;
            return true;
          } else {
            params.data.IsLimitedEndDateName = null;
            params.data.IsLimitedEndDate = null;
            return false;
          }
        },
        editable: (params) => {
          if (!this.IsEditable || params.data.ManagementTypeCode === 1) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع مسئولیت بر اساس روزنامه رسمی',
        field: 'ShamsiStartDate',
        width: 140,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiStartDate',
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
      },
      {
        headerName: 'تاریخ پایان مسئولیت بر اساس روزنامه رسمی',
        field: 'ShamsiEndDate',
        width: 140,
        resizable: true,
        editable: (params) => {
          if (!this.IsEditable || params.data.ManagementTypeCode === 1 || params.data.IsLimitedEndDate === 0) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiEndDate',
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
      },
      {
        headerName: 'مشاهده مشخصات مدیر',
        field: '',
        width: 140,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowInformations,
        },
        editable: (params) => {
          if (this.HaveNotAllowEditFirstInf) {
            return false;
          } else {
            return true;
          }
        },
      }
    ];
    this.OfficialGazetteColDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'تاریخ صدور آگهی ثبت شرکت ها',
        field: 'ShamsiAdvertisingDate',
        width: 180,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiAdvertisingDate',
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
      },
      {
        headerName: 'نوع آگهی',
        field: 'AdvertisingTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectAdTypeParams,
          Items: [],
          Owner: this
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.AdvertisingTypeName) {
            params.data.AdvertisingTypeCode = params.newValue.AdvertisingTypeCode;
            params.data.AdvertisingTypeName = params.newValue.AdvertisingTypeName;
            return true;
          } else {
            params.data.AdvertisingTypeName = '';
            params.data.AdvertisingTypeCode = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.AdvertisingTypeName;
          } else {
            return '';
          }
        },
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ امضاء صورت جلسه',
        field: 'ShamsiMinutesSignDate',
        width: 180,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiMinutesSignDate',
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
      },
      {
        headerName: 'تاریخ انتشار روزنامه رسمی',
        field: 'ShamsiNewspaperRegisterDate',
        width: 180,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'ShamsiNewspaperRegisterDate',
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
      },
      {
        headerName: 'توضیحات ',
        field: 'Note',
        width: 300,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          }
        },
      },
      {
        headerName: 'بارگزاری تصاویر روزنامه رسمی',
        field: '',
        editable: !this.HaveNotAllowEditFirstInf ? false : this.OfficialGazetteSelectedRow ? !this.OfficialGazetteSelectedRow : false,
        width: 180,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      }
    ];
    this.TechnicalPersonnelPropertyColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreTechnicalPerson,
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
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ActorId) {
            params.data.ActorID = params.newValue.ActorId;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = null;
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
        width: 300,
        resizable: true
      },
      {
        headerName: 'سال سابقه',
        field: 'HistoryYear',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectYearParams,
          Items: this.YearFieldItems,
          Owner: this
        },
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.HistoryYear;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.HistoryYear) {
            params.data.HistoryYearcode = params.newValue.HistoryYearcode;
            params.data.HistoryYear = params.newValue.HistoryYear;
            return true;
          } else {
            params.data.HistoryYearcode = null;
            params.data.HistoryYear = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 160,
        resizable: true
      },
      {
        headerName: 'ماه سابقه',
        field: 'HistoryMonth',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectmounthParams,
          Items: this.mounthFieldItems,
          Owner: this
        },
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.HistoryMonth;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.HistoryMonth) {
            params.data.HistoryMonthCode = params.newValue.HistoryMonthCode;
            params.data.HistoryMonth = params.newValue.HistoryMonth;
            return true;
          } else {
            params.data.HistoryMonthCode = null;
            params.data.HistoryMonth = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 160,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع مسئولیت',
        field: 'ShamsiStartDate',
        width: 140,
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
          CurrShamsiDateValue: 'ShamsiStartDate',
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
      },
      {
        headerName: 'تاریخ پایان مسئولیت',
        field: 'ShamsiEndDate',
        width: 140,
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
          CurrShamsiDateValue: 'ShamsiEndDate',
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
      },
      {
        headerName: 'تاریخ استخدام',
        field: 'ShamsiEmploymentDate',
        width: 140,
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
          CurrShamsiDateValue: 'ShamsiEmploymentDate',
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
      },
      {
        headerName: 'سمت',
        field: 'ResponsibilityTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgResponsibilityTypeParams,
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
            params.data.ResponsibilityTypeCode = params.newValue.ResponsibilityTypeCode;
            params.data.ResponsibilityTypeName = params.newValue.ResponsibilityTypeName;
            return true;
          } else {
            params.data.ResponsibilityTypeCode = null;
            params.data.ResponsibilityTypeName = null;
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
        width: 160,
        resizable: true
      },
      { // RFC 52469
        headerName: 'بارگزاری مستند پرسنل ',
        field: '',
        editable: this.TechnicalPersonnelCorporatePositionSelectedRow ? !this.TechnicalPersonnelCorporatePositionSelectedRow : false,
        width: 180,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      }
    ];
    this.equipmentandmachineryColumnDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نوع خودرو',
        field: 'CarType',
        width: 120,
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
        headerName: 'نوع کاربری',
        field: 'GoodsName',
        width: 200,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectGoodsParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.GoodsName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.GoodsName) {
            params.data.GoodsName = params.newValue.GoodsName;
            params.data.ProductID = params.newValue.ProductID;
            return true;
          } else {
            params.data.GoodsName = '';
            params.data.ProductID = null;
            return false;
          }
        },
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
        headerName: 'سال ساخت',
        field: 'ProductYear',
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
            params.data.ProductYear = params.newValue;
          }
        },
      },
      {
        headerName: 'شماره انتظامی',
        field: 'DisciplinaryNO',
        width: 130,
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
        headerName: 'شماره موتور',
        field: 'EngineNumber',
        width: 130,
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
        headerName: 'شماره شاسی',
        field: 'ChassisNumber',
        width: 120,
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
        headerName: 'نوع مالکیت',
        field: 'OwnershipTypeName',
        width: 120,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectownerShipTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.OwnershipTypeID;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.OwnershipTypeName) {
            params.data.OwnershipTypeName = params.newValue.OwnershipTypeName;
            params.data.OwnershipTypeCode = params.newValue.OwnershipTypeID;
            return true;
          } else {
            params.data.OwnershipTypeName = '';
            params.data.OwnershipTypeCode = null;
            return false;
          }
        },
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
        headerName: 'شماره معاینه فنی',
        field: 'TechnicalInspectionNO',
        width: 120,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      }, {
        headerName: 'تاریخ اعتبار معاینه فنی',
        field: 'PersianTIValidityDate',
        width: 140,
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
          CurrShamsiDateValue: 'PersianTIValidityDate',
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
      }, {
        headerName: 'توضیحات',
        field: 'Dec',
        width: 120,
        resizable: true,
        sortable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      }, {
        headerName: 'امتیاز آور',
        field: 'IsScorer',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsScorer
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsScorer = params.newValue;
            return true;
          } else {
            params.data.IsScorer = false;
            return false;
          }
        },
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
        headerName: 'GPS',
        field: 'HaveGPS',
        width: 100,
        resizable: true,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.HaveGPS
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.HaveGPS = params.newValue;
            return true;
          } else {
            params.data.HaveGPS = false;
            return false;
          }
        },
      },
      {
        headerName: 'بارگزاری مدارک',
        field: '',
        editable: false,
        width: 120,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.EquipmentDocuments,
        }
      },
      {
        headerName: 'شرکت نصب کننده GPS',
        field: 'GPSInstallerCompany',
        width: 120,
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
    ];
    this.colDef = [
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
        editable: (event) => {
          if (this.IsEditable || event.data.CertificationEvaluatorID === 6476300) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'گواهینامه',
        field: 'CertificateName',
        editable: (event) => {
          if (this.IsEditable || event.data.CertificationEvaluatorID === 6476300) {
            return true;
          } else {
            return false;
          }
        },
        width: 120,
        resizable: true
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
        headerName: 'توضيحات',
        field: 'Note',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        width: 440,
        resizable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        editable: this.ActorCetificateSelectedRow ? !this.ActorCetificateSelectedRow : false,
        width: 120,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      }
    ];
    this.ExecutionHistoryColDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'کارفرما',
        field: 'EmployerName',
        width: 120,
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
        headerName: 'شماره قرارداد',
        field: 'ContractCode',
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
        headerName: 'تاريخ قرارداد',
        field: 'ShamsiContractDate',
        width: 120,
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
          CurrShamsiDateValue: 'ShamsiContractDate',
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
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'Amount',
        width: 120,
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
        headerName: 'عنوان قرارداد',
        field: 'Subject',
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
        headerName: 'استان',
        field: 'StateName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectStParams,
          Items: [],
          Owner: this
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
          if (params.newValue && params.newValue.StateCode) {
            params.data.StateCode = params.newValue.StateCode;
            params.data.StateName = params.newValue.StateName;
            params.data.CityName = null;
            params.data.CityID = null;
            return true;
          } else {
            params.data.StateCode = null;
            params.data.StateName = null;
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
        width: 120,
        resizable: true
      },
      {
        headerName: 'شهر',
        field: 'CityName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectCTParams,
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
          if (params.newValue && params.newValue.CityID) {
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
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectCTContractTypeParams,
          Items: this.ContractTypeItems,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ContractTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ContractTypeName) {
            params.data.ContractTypeName = params.newValue.ContractTypeName;
            params.data.ContractTypeCode = params.newValue.ContractTypeCode;
            return true;
          } else {
            params.data.ContractTypeName = null;
            params.data.ContractTypeCode = null;
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
        width: 220,
        resizable: true
      },
      {
        headerName: 'وضعيت قرارداد',
        field: 'ContractStatusName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectCsParams,
          Items: [],
          Owner: this
        },
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
            return params.value.ContractStatusName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ContractStatusCode) {
            params.data.ContractStatusCode = params.newValue.ContractStatusCode;
            params.data.ContractStatusName = params.newValue.ContractStatusName;
            return true;
          } else {
            params.data.ContractStatusCode = null;
            params.data.ContractStatusName = null;
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'مدت قرارداد به ماه',
        field: 'ContractDurationNumberMonth',
        width: 120,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
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
        headerName: 'زمان پايان',
        field: 'ShamsiEndDate',
        width: 120,
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
          CurrShamsiDateValue: 'ShamsiEndDate',
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
      },
      {
        headerName: 'درصد پيشرفت',
        field: 'ProgressPercent',
        width: 100,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 3 },
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
        headerName: 'جمع مبلغ تعديل',
        field: 'AdjustmentAmount',
        width: 100,
        cellEditorFramework: NumberInputComponentComponent,
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
        headerName: 'جمع مبلغ مابه تفاوت',
        field: 'DifferenceAmount',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'بارگزاری تصویر اسناد سوابق اجرایی',
        field: '',
        editable: this.ExecutionHistorySelectedRow ? !this.ExecutionHistorySelectedRow : false,
        width: 220,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      }
    ];
    this.ImmovablePropertyColDef = [
      {
        headerName: 'ردیف ',
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
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع کاربری',
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
        width: 120,
        resizable: true
      },
      {
        headerName: 'نشانی',
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
        headerName: 'کدپستی ده رقمی',
        field: 'PostCode',
        width: 200,
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
        headerName: 'توضیحات',
        field: 'Note',
        width: 250,
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
        headerName: 'بارگزاری تصویر اسناد اموال غیر منقول ',
        field: '',
        editable: this.ImmovablePropertySelectedRow ? !this.ImmovablePropertySelectedRow : false,
        width: 180,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      }
    ];
    this.affordabilityColumnDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نوع دارایی',
        field: 'ProviderAssetTypeName',
        width: 120,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectAssetTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProviderAssetTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProviderAssetTypeName) {
            params.data.ProviderAssetTypeName = params.newValue.ProviderAssetTypeName;
            params.data.AssetTypeCode = params.newValue.ProviderAssetTypeCode;
            return true;
          } else {
            params.data.ProviderAssetTypeName = '';
            params.data.AssetTypeCode = null;
            return false;
          }
        },
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
        headerName: 'شماره حساب',
        field: 'AccountNO',
        width: 120,
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
        headerName: 'موجودی حساب',
        field: 'AccountBalance',
        width: 120,
        resizable: true,
        sortable: true,
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        editable: () => {
          if (this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'گردش حساب',
        field: 'Turnover',
        width: 120,
        resizable: true,
        sortable: true,
        HaveThousand: true,
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
        editable: false,
        width: 120,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive3,
        }
      }

      // {
      //   headerName: 'رشته فعالیت',
      //   field: 'CorporateUrbanActivityName',
      //   width: 200,
      //   cellEditorFramework: NgSelectVirtualScrollComponent,
      //   cellEditorParams: {
      //     Params: this.NgSelectActivityFieldsParams,
      //     Items: [],
      //     Owner: this
      //   },
      //   cellRenderer: 'SeRender',
      //   valueFormatter: function currencyFormatter(params) {
      //     if (params.value) {
      //       return params.value.CorporateUrbanActivityName;
      //     } else {
      //       return '';
      //     }
      //   },
      //   valueSetter: (params) => {
      //     if (params.newValue && params.newValue.CorporateUrbanActivityName) {
      //       params.data.CorporateUrbanActivityName = params.newValue.CorporateUrbanActivityName;
      //       params.data.CorporateUrbanActivityCode = params.newValue.CorporateUrbanActivityCode;
      //       return true;
      //     } else {
      //       params.data.CorporateUrbanActivityName = '';
      //       params.data.CorporateUrbanActivityCode = null;
      //       return false;
      //     }
      //   },
      //   resizable: true,
      //   sortable: true,
      //   editable: () => {
      //     if (this.IsEditable) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   },
      // }

    ];
    // ستون هاي اطلاعات حساب بانکي
    this.ActorBankColDef = [ // RFC 52043-Item2
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
        headerName: 'انصراف از درخواست',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.RevokeProcess,
        },
        hide: this.WorkFlowID
      },
      {
        headerName: 'وضعیت',
        field: 'AllowStateName',
        width: 120,
        resizable: true,
        editable: (event) => {
          if ((this.IsAdmin || this.IsAdminTraffic) && this.IsEditable) {
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
        hide: IsAdmin ? false : (IsAdminTraffic ? false : true),
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.AllowStateCodeUpdate,
        },
        editable: (event) => {
          return false;
        },
      },
      {
        headerName: 'توضیحات تغییر وضعیت',
        field: 'AllowStateCodeUpdateDec',
        width: 200,
        resizable: true,
        hide: IsAdmin ? false : (IsAdminTraffic ? false : true),
        editable: (event) => {
          if ((this.IsAdmin || (this.IsAdminTraffic && event.data.AllowStateCode === 8)) && this.IsEditable) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'ظرفیت تعدادی اضافی ',
        field: 'ExtraQtyCapacity',
        width: 130,
        resizable: true,
        hide: this.ModuleCode === 2893 ? false : true,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        editable: () => {
          if (this.HaveNotAllowEditFirstInf) {
            return true;
          } else {
            return false;
          }
        },
      },
      {
        headerName: 'ظرفیت ریالی اضافی ',
        field: 'ExtraAmountCapacity',
        width: 120,
        resizable: true,
        editable: () => {
          if (this.HaveNotAllowEditFirstInf) {
            return true;
          } else {
            return false;
          }
        },
        hide: this.ModuleCode === 2893 ? false : true,
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
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRegionParams,
          Items: [],
        },
        hide: true,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionName;
          } else {
            return '';
          }
        },
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
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
          } else {
            if (this.HaveNotAllowEditFirstInf) {
              return true;
            } else {
              return false;
            }
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
          if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return false;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
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
            // if (params.data.UnitPatternID === 2371 &&
            //   params.data.BusinessPatternID === 4924 &&
            //   ((isUndefined(params.data.ActorBusinessID) ||
            //     params.data.ActorBusinessID === null ||
            //     params.data.ActorBusinessID <= 0) || !params.data.IsOlder)  &&
            //   !this.IsAdmin) {
            //   this.EditableRank = false;
            // } else {
            //   this.EditableRank = true;
            // }
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
          if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return false;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
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
            // if (params.data.UnitPatternID === 2371 &&
            //   params.data.BusinessPatternID === 4924 &&
            //   ((isUndefined(params.data.ActorBusinessID) ||
            //     params.data.ActorBusinessID === null ||
            //     params.data.ActorBusinessID <= 0) || !params.data.IsOlder) &&
            //   !this.IsAdmin) {
            //   this.EditableRank = false;
            // } else {
            //   this.EditableRank = true;
            // }
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
          if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return false;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        width: 200,
        resizable: true,
        //  hide: this.ModuleViewTypeCode === 3,
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
            // if (params.data.PriceListTopicID === 378611 || params.data.PriceListTopicID === 378613) {
            // this.Actor.CalculateRank(this.ActorId, params.data.PriceListTopicID).subscribe(res => {
            //   params.data.Rank = res;
            // });
            // } else {
            //   params.data.Rank = '';
            // }
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
        editable: (params) => {
          if (params.data.UnitPatternID === 2371 &&
            params.data.BusinessPatternID === 4924 &&
            ((isUndefined(params.data.ActorBusinessID) ||
              params.data.ActorBusinessID === null ||
              params.data.ActorBusinessID <= 0) || !params.data.IsOlder)) {
            return false;
          } else if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return false;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        //  hide: this.ModuleViewTypeCode === 3,
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
        headerName: 'جزییات رتبه',
        field: '',
        width: 80,
        resizable: false,
        tooltip: (params) => 'مشاهده رتبه',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowRank,
        }
      },
      {
        headerName: 'مرجع صادرکننده گواهینامه',
        field: 'EvaluatorName',
        editable: () => {
          if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return false;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        width: 150,
        resizable: true,
        //  hide: this.ModuleViewTypeCode === 3,
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
        width: 130,
        resizable: true,
        editable: (params) => {
          if (params.data.UnitPatternID === 2371 &&
            params.data.BusinessPatternID === 4924 &&
            ((isUndefined(params.data.ActorBusinessID) ||
              params.data.ActorBusinessID === null ||
              params.data.ActorBusinessID <= 0) || !params.data.IsOlder)
            && this.ModuleViewTypeCode !== 6) {
            return false;
          } else if (this.ModuleViewTypeCode === 2) {
            return false;
          } else if (this.ModuleViewTypeCode === 6) {
            return true;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        //  hide: this.ModuleViewTypeCode === 3,
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
      },
      {
        headerName: 'تاریخ  انقضا',
        field: 'PersianEndDate',
        width: 130,
        resizable: true,
        editable: (params) => {
          if (params.data.UnitPatternID === 2371 &&
            params.data.BusinessPatternID === 4924 &&
            ((isUndefined(params.data.ActorBusinessID) ||
              params.data.ActorBusinessID === null ||
              params.data.ActorBusinessID <= 0) || !params.data.IsOlder)
            && this.ModuleViewTypeCode !== 6) {
            return false;
          } else if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return true;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
        //  hide: this.ModuleViewTypeCode === 3,
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
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 250,
        //  hide: this.ModuleViewTypeCode === 3,
        resizable: true,
        editable: () => {
          if (this.ModuleViewTypeCode === 2 || this.ModuleViewTypeCode === 6) {
            return false;
          } else {
            if (this.IsEditable) {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            } else {
              if (this.HaveNotAllowEditFirstInf) {
                return true;
              } else {
                return false;
              }
            }
          }
        },
      },
      {
        headerName: ' بارگزاری مدارک رتبه',
        field: '',
        editable: !this.HaveNotAllowEditFirstInf ? false : this.RankSelectedRow ? !this.RankSelectedRow : false,
        width: 120,
        //  hide: this.ModuleViewTypeCode === 3,
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
        headerName: ' بارگزاری امول منقول',
        field: '',
        editable: !this.HaveNotAllowEditFirstInf ? false : this.RankSelectedRow ? !this.RankSelectedRow : false,
        width: 120,
        //  hide: this.ModuleViewTypeCode === 3,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive2,
        }
      },
      { // RFC 52469
        headerName: 'اموال منقول',
        field: '',
        width: 120,
        //  hide: this.ModuleViewTypeCode === 3,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.MovableProperty,
        },
        editable: () => {
          if (this.HaveNotAllowEditFirstInf) {
            return true;
          } else {
            return false;
          }
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
        },
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


  onSearch(CorporateID = null, RegionCode = null) {
    this.CorporateObject = null;
    this.IdentityNo = '';
    this.ActorName = '';
    this.EconomicCode = '';
    this.AllowStateName = '';
    this.CompanyAgentEmail = '';
    this.CompanyAgentTel = '';
    this.CompanyAgentName = '';
    this.IsContractor = false;
    this.IsConsult = false;
    this.IsProducer = false;
    this.IsSupplier = false;
    this.IsInternalBuilders = false;
    this.IsExternalBuilders = false;
    this.NgSelectRegisterReferenceNameParams.selectedObject = '';
    this.RegisterPersianDate = '';
    this.RegisterDate = null;
    this.RegisterNo = '';
    this.Address = '';
    this.ActorNote = '';
    this.Tel = '';
    this.Email = '';
    this.Web = '';
    this.PostCode = '';
    this.Fax = '';
    this.ActivityStartDate = '';
    this.Note = '';
    this.EmployeCount = '';
    this.ActorId = null;
    this.rowData = [];
    // this.MovablerowsData = [];
    this.OfficialGazetteRows = [];
    this.equipmentandmachineryrowsData = [];
    this.OldName = '';
    this.CellNo = '';
    this.IsLimitedRisponsibility = false;
    this.NgSelectLocationParams.selectedObject = null;
    this.NgSelectCorporateRegistertypeParams.selectedObject = null;
    this.RequestDate = null;
    this.NgSelectActivityFieldParams.selectedObject = null;
    this.GradeReq = null;
    this.ManagersCount = null;
    this.SignedRightHolders = null;
    this.ManagersMinutesDate = null;
    this.IsLimitedManagersEndDate = null;
    this.ManagersEndDate = null;

    this.Actor.GetCorporateSupplierByIdentityNo(this.IdentityNoSearch, CorporateID, RegionCode).subscribe(res => {
      if (res) {
        this.CorporateObject = res; // کل آبجکت شخص حقوقي و اکتور
        this.DisplaySearchBox = false;
        this.TabsContentHeight = 72;
        this.RolefielsetMarginTop = this.RolefielsetMarginBottom = 2;
        this.Validate = res.Validate;
        this.IdentityNo = res.IdentityNo;
        this.ActorId = res.ActorId;
        this.ActorName = res.ActorName;
        this.EconomicCode = res.EconomicCode ? res.EconomicCode : '';
        this.AllowStateName = res.AllowStateName ? res.AllowStateName : '';
        this.CompanyAgentEmail = res.CompanyAgentEmail ? res.CompanyAgentEmail : '';
        this.CompanyAgentTel = res.CompanyAgentTel ? res.CompanyAgentTel : '';
        this.CompanyAgentName = res.CompanyAgentName ? res.CompanyAgentName : '';
        this.IsContractor = res.IsContractor ? res.IsContractor : false;
        this.IsConsult = res.IsConsult ? res.IsConsult : false;
        this.IsProducer = res.IsProducer ? res.IsProducer : false;
        this.IsSupplier = res.IsSupplier ? res.IsSupplier : false;
        this.IsInternalBuilders = res.IsInternalBuilders ? res.IsInternalBuilders : false;
        this.IsExternalBuilders = res.IsExternalBuilders ? res.IsExternalBuilders : false;
        this.RegisterReferenceName = res.RegisterReferenceName;
        this.RegisterPersianDate = res.RegisterPersianDate;
        this.RegisterDate = res.ShortRegisterDate;
        this.RegisterNo = res.RegisterNo;
        this.Address = res.Address ? res.Address : '';
        this.ActorNote = res.ActorNote ? res.ActorNote : '';
        this.Tel = res.Tel ? res.Tel : '';
        this.Email = res.Email ? res.Email : '';
        this.Web = res.Web ? res.Web : '';
        this.PostCode = res.PostCode ? res.PostCode : '';
        this.Fax = res.Fax ? res.Fax : '';
        this.ActivityStartDate = res.ShortActivityStartDate ? res.ShortActivityStartDate : '';
        this.Note = res.Note ? res.Note : '';
        this.EmployeCount = res.EmployeCount ? res.EmployeCount : '';
        this.TechnicalPersonnelCorporatePositionList = res.TechnicalCorporatePositionList;
        this.ExecutionHistoryRows = res.ExecutionHistoryList;
        this.ManagerCorporatePositionRows = res.CorporatePositionManagerList;
        // this.MovablerowsData = res.MovableAssetList;
        this.OfficialGazetteRows = res.OfficialGazetteList;
        this.UserLocalImage = res.DecImage;
        this.equipmentandmachineryrowsData = res.EquipmentAndMachineryList;
        this.affordabilityrowsData = res.CompanyAffordabilityList;
        this.NgSelectRegisterReferenceNameParams.selectedObject = res.RegisterReferenceId;
        this.rowData = res.ActorCertificateList;
        this.ImmovablePropertyRows = res.ImmovablePropertyList;
        this.CorporateSharesRows = res.CorporateSharesList;
        this.RankrowsData = res.ActorBusinessList;
        this.IsArchive = true;
        this.OldName = res.OldName ? res.OldName : '';
        this.CellNo = res.CellNo ? res.CellNo : '';
        this.IsLimitedRisponsibility = res.IsLimitedRisponsibility ? res.IsLimitedRisponsibility : false;
        this.OnOpenCityNgSelect();
        this.NgSelectLocationParams.selectedObject = res.CorporateCityID ? res.CorporateCityID : null;
        this.NgSelectCorporateRegistertypeParams.selectedObject = res.CorporateRegisterTypeCode ? res.CorporateRegisterTypeCode : null;
        this.RequestDate = res.RequestDate ? res.RequestDate : null;
        this.GradeReq = res.GradeRequest ? res.GradeRequest : null;
        this.ManagersCount = res.ManagersCount ? res.ManagersCount : null;
        this.SignedRightHolders = res.SignedRightHolders ? res.SignedRightHolders : null;
        this.ManagersMinutesDate = res.ShortManagersMinutesDate ? res.ShortManagersMinutesDate : null;
        this.IsLimitedManagersEndDate = res.IsLimitedManagersEndDate ? res.IsLimitedManagersEndDate : null;
        this.ManagersEndDate = res.ShortManagersEndDate ? res.ShortManagersEndDate : null;
        const Codes = [];
        res.SupplierActivityList.forEach(item => {
          Codes.push(item.CorporateUrbanActivityCode);
        });
        this.NgSelectActivityFieldParams.selectedObject = Codes;
        this.OpenCompanyAgentActor(res.CompanyAgentActorID);

        this.BankrowData = res.ActorBankAccList; // RFC 52043-Item2
        //   this.ActorPropertyRowData = res.ActorPropertyList;

        this.Subject = res.Subject ? res.Subject : '';
        this.HaveHSE = res.HaveHSE ? res.HaveHSE : false;
        this.HaveBail = res.HaveBail ? res.HaveBail : false;
        this.HaveCertificate = res.HaveCertificate ? res.HaveCertificate : false;
        this.ActorPropertyID = res.ActorPropertyID;

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
              if (this.ModuleCode === 2785) {
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
  FindActor(res: any) {
    this.CorporateObject = null;
    this.IdentityNo = '';
    this.ActorName = '';
    this.EconomicCode = '';
    this.AllowStateName = '';
    this.CompanyAgentEmail = '';
    this.CompanyAgentTel = '';
    this.CompanyAgentName = '';
    this.IsContractor = false;
    this.IsConsult = false;
    this.IsProducer = false;
    this.IsSupplier = false;
    this.IsInternalBuilders = false;
    this.IsExternalBuilders = false;
    this.NgSelectRegisterReferenceNameParams.selectedObject = '';
    this.RegisterPersianDate = '';
    this.RegisterNo = '';
    this.Address = '';
    this.ActorNote = '';
    this.Tel = '';
    this.Email = '';
    this.Web = '';
    this.PostCode = '';
    this.Fax = '';
    this.ActivityStartDate = '';
    this.Note = '';
    this.EmployeCount = '';
    this.ActorId = null;
    this.rowData = [];
    // this.MovablerowsData = [];
    this.OfficialGazetteRows = [];
    this.equipmentandmachineryrowsData = [];
    this.OldName = '';
    this.CellNo = '';
    this.IsLimitedRisponsibility = false;
    this.NgSelectLocationParams.selectedObject = null;
    this.NgSelectCorporateRegistertypeParams.selectedObject = null;
    this.RequestDate = null;
    this.NgSelectActivityFieldParams.selectedObject = null;
    this.GradeReq = null;
    this.ManagersCount = null;
    this.SignedRightHolders = null;
    this.ManagersMinutesDate = null;
    this.IsLimitedManagersEndDate = null;
    this.ManagersEndDate = null;
    this.BankrowData = [];

    if (res) {
      this.CorporateObject = res; // کل آبجکت شخص حقوقي و اکتور
      this.DisplaySearchBox = false;
      this.TabsContentHeight = 72;
      this.RolefielsetMarginTop = this.RolefielsetMarginBottom = 2;
      this.Validate = res.Validate;
      this.IdentityNo = res.IdentityNo;
      this.ActorId = res.ActorId;
      this.ActorName = res.ActorName;
      this.EconomicCode = res.EconomicCode ? res.EconomicCode : '';
      this.AllowStateName = res.AllowStateName ? res.AllowStateName : '';
      this.CompanyAgentEmail = res.CompanyAgentEmail ? res.CompanyAgentEmail : '';
      this.CompanyAgentTel = res.CompanyAgentTel ? res.CompanyAgentTel : '';
      this.CompanyAgentName = res.CompanyAgentName ? res.CompanyAgentName : '';
      this.IsContractor = res.IsContractor ? res.IsContractor : false;
      this.IsConsult = res.IsConsult ? res.IsConsult : false;
      this.IsProducer = res.IsProducer ? res.IsProducer : false;
      this.IsSupplier = res.IsSupplier ? res.IsSupplier : false;
      this.IsInternalBuilders = res.IsInternalBuilders ? res.IsInternalBuilders : false;
      this.IsExternalBuilders = res.IsExternalBuilders ? res.IsExternalBuilders : false;
      this.RegisterReferenceName = res.RegisterReferenceName;
      this.RegisterPersianDate = res.RegisterPersianDate;
      this.RegisterDate = res.ShortRegisterDate;
      this.RegisterNo = res.RegisterNo;
      this.Address = res.Address ? res.Address : '';
      this.ActorNote = res.ActorNote ? res.ActorNote : '';
      this.Tel = res.Tel ? res.Tel : '';
      this.Email = res.Email ? res.Email : '';
      this.Web = res.Web ? res.Web : '';
      this.PostCode = res.PostCode ? res.PostCode : '';
      this.Fax = res.Fax ? res.Fax : '';
      this.ActivityStartDate = res.ShortActivityStartDate ? res.ShortActivityStartDate : '';
      this.Note = res.Note ? res.Note : '';
      this.EmployeCount = res.EmployeCount ? res.EmployeCount : '';
      this.TechnicalPersonnelCorporatePositionList = res.TechnicalCorporatePositionList;
      this.ExecutionHistoryRows = res.ExecutionHistoryList;
      this.ManagerCorporatePositionRows = res.CorporatePositionManagerList;
      // this.MovablerowsData = res.MovableAssetList;
      this.OfficialGazetteRows = res.OfficialGazetteList;
      this.UserLocalImage = res.DecImage;
      this.equipmentandmachineryrowsData = res.EquipmentAndMachineryList;
      this.NgSelectRegisterReferenceNameParams.selectedObject = res.RegisterReferenceId;
      this.affordabilityrowsData = res.CompanyAffordabilityList;
      this.rowData = res.ActorCertificateList;
      this.ImmovablePropertyRows = res.ImmovablePropertyList;
      this.CorporateSharesRows = res.CorporateSharesList;
      this.RankrowsData = res.ActorBusinessList;
      this.IsArchive = true;
      this.OldName = res.OldName ? res.OldName : '';
      this.CellNo = res.CellNo ? res.CellNo : '';
      this.IsLimitedRisponsibility = res.IsLimitedRisponsibility ? res.IsLimitedRisponsibility : false;
      this.OnOpenCityNgSelect();
      this.NgSelectLocationParams.selectedObject = res.CorporateCityID ? res.CorporateCityID : null;
      this.NgSelectCorporateRegistertypeParams.selectedObject = res.CorporateRegisterTypeCode ? res.CorporateRegisterTypeCode : null;
      this.RequestDate = res.RequestDate ? res.RequestDate : null;
      const Codes = [];
      res.SupplierActivityList.forEach(item => {
        Codes.push(item.CorporateUrbanActivityCode);
      });
      this.NgSelectActivityFieldParams.selectedObject = Codes;
      this.GradeReq = res.GradeRequest ? res.GradeRequest : null;
      this.ManagersCount = res.ManagersCount ? res.ManagersCount : null;
      this.SignedRightHolders = res.SignedRightHolders ? res.SignedRightHolders : null;
      this.ManagersMinutesDate = res.ShortManagersMinutesDate ? res.ShortManagersMinutesDate : null;
      this.IsLimitedManagersEndDate = res.IsLimitedManagersEndDate ? res.IsLimitedManagersEndDate : null;
      this.ManagersEndDate = res.ShortManagersEndDate ? res.ShortManagersEndDate : null;
      this.OpenCompanyAgentActor(res.CompanyAgentActorID);

      this.Subject = res.Subject ? res.Subject : '';
      this.HaveHSE = res.HaveHSE ? res.HaveHSE : false;
      this.HaveBail = res.HaveBail ? res.HaveBail : false;
      this.HaveCertificate = res.HaveCertificate ? res.HaveCertificate : false;
      this.ActorPropertyID = res.ActorPropertyID;

      this.BankrowData = res.ActorBankAccList; // RFC 52043-Item2
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
            if (this.ModuleCode === 2785) {
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
  onSearchInquiry() {
    if (!this.IdentityNoSearch) {
      this.ShowMessageBoxWithOkBtn('شناسه ملی نمی تواند خالی باشد');
      return;
    }
    if (!this.PostCodeSearch) {
      this.ShowMessageBoxWithOkBtn('کد پستی نمی تواند خالی باشد');
      return;
    }
    this.CorporateObject = null;
    this.IdentityNo = '';
    this.ActorName = '';
    this.EconomicCode = '';
    this.AllowStateName = '';
    this.CompanyAgentEmail = '';
    this.CompanyAgentTel = '';
    this.CompanyAgentName = '';
    this.IsContractor = false;
    this.IsConsult = false;
    this.IsProducer = false;
    this.IsSupplier = false;
    this.IsInternalBuilders = false;
    this.IsExternalBuilders = false;
    this.NgSelectRegisterReferenceNameParams.selectedObject = '';
    this.RegisterPersianDate = '';
    this.RegisterNo = '';
    this.Address = '';
    this.ActorNote = '';
    this.Tel = '';
    this.Email = '';
    this.Web = '';
    this.PostCode = '';
    this.Fax = '';
    this.ActivityStartDate = null;
    this.Note = '';
    this.EmployeCount = '';
    this.ActorId = null;
    this.rowData = [];
    this.OldName = '';
    this.CellNo = '';
    this.IsLimitedRisponsibility = false;
    this.NgSelectLocationParams.selectedObject = null;
    this.NgSelectCorporateRegistertypeParams.selectedObject = null;
    this.RequestDate = null;
    this.NgSelectActivityFieldParams.selectedObject = null;
    this.GradeReq = null;
    this.ManagersCount = null;
    this.SignedRightHolders = null;
    this.ManagersMinutesDate = null;
    this.IsLimitedManagersEndDate = null;
    this.ManagersEndDate = null;

    this.Actor.GetCorporateByInquiry(this.IdentityNoSearch, this.PostCodeSearch).subscribe(res => {
      if (res) {
        this.CorporateObject = res; // کل آبجکت شخص حقوقي و اکتور
        this.DisplaySearchBox = false;
        this.TabsContentHeight = 72;
        this.RolefielsetMarginTop = this.RolefielsetMarginBottom = 2;
        this.Validate = res.Validate;
        this.IdentityNo = res.IdentityNo;
        this.EconomicCode = res.EconomicCode;
        this.AllowStateName = res.AllowStateName;
        this.CompanyAgentEmail = res.CompanyAgentEmail;
        this.CompanyAgentTel = res.CompanyAgentTel;
        this.CompanyAgentName = res.CompanyAgentName;
        this.IsContractor = res.IsContractor ? res.IsContractor : false;
        this.IsConsult = res.IsConsult ? res.IsConsult : false;
        this.IsProducer = res.IsProducer ? res.IsProducer : false;
        this.IsSupplier = res.IsSupplier ? res.IsSupplier : false;
        this.IsInternalBuilders = res.IsInternalBuilders ? res.IsInternalBuilders : false;
        this.IsExternalBuilders = res.IsExternalBuilders ? res.IsExternalBuilders : false;
        this.ActorName = res.ActorName;
        this.RegisterReferenceName = res.RegisterReferenceName;
        this.RegisterPersianDate = res.RegisterPersianDate;
        this.RegisterDate = res.ShortRegisterDate;
        this.Address = res.Address;
        this.ActorNote = res.ActorNote;
        this.PostCode = res.PostCode;
        this.RegisterNo = res.RegisterNo;
        this.OldName = res.OldName ? res.OldName : '';
        this.CellNo = res.CellNo ? res.CellNo : '';
        this.IsLimitedRisponsibility = res.IsLimitedRisponsibility ? res.IsLimitedRisponsibility : false;
        this.OnOpenCityNgSelect();
        this.NgSelectLocationParams.selectedObject = res.CorporateCityID ? res.CorporateCityID : null;
        this.NgSelectCorporateRegistertypeParams.selectedObject = res.CorporateRegisterTypeCode ? res.CorporateRegisterTypeCode : null;
        this.RequestDate = res.RequestDate ? res.RequestDate : null;
        this.NgSelectActivityFieldParams.selectedObject = res.ActivityField ? res.ActivityField : null;
        this.GradeReq = res.GradeRequest ? res.GradeRequest : null;
        this.ManagersCount = res.ManagersCount ? res.ManagersCount : null;
        this.SignedRightHolders = res.SignedRightHolders ? res.SignedRightHolders : null;
        this.ManagersMinutesDate = res.ShortManagersMinutesDate ? res.ShortManagersMinutesDate : null;
        this.IsLimitedManagersEndDate = res.IsLimitedManagersEndDate ? res.IsLimitedManagersEndDate : null;
        this.ManagersEndDate = res.ShortManagersEndDate ? res.ShortManagersEndDate : null;
        this.OpenCompanyAgentActor(res.CompanyAgentActorID);
        this.Subject = res.Subject ? res.Subject : '';
        this.HaveHSE = res.HaveHSE ? res.HaveHSE : false;
        this.HaveBail = res.HaveBail ? res.HaveBail : false;
        this.HaveCertificate = res.HaveCertificate ? res.HaveCertificate : false;
        this.ActorPropertyID = res.ActorPropertyID;
        this.NgSelectActivityFieldParams.selectedObject = res.SupplierActivityList ? res.SupplierActivityList : null;
      } else {
        this.ShowMessageBoxWithOkBtn('اطلاعات شخص در سيستم يافت نشد');
      }
    });
  }
  onClose() {
    this.Corporate2Closed.emit(true);
  }
  popupclosed(event) {
    if (event && this.PopUpType === 'global-choose-page') {
      this.VirtualModuleTypeCode = event;
      this.OpenSelectedForm(this.VirtualModuleTypeCode);
    } else {
      if (this.PopUpType === 'person2') { // RFC 55889
        this.CorporateID = this.CorporateObject.ActorId;
        this.ngOnInit();
      }
      if (this.BtnClickedName === 'BtnDelete') {
        this.ngOnInit();
      }
      if (this.PopUpType === 'supplier-work-flow') {
        this.Actor.GetActorBussinessList(this.CorporateObject.ActorId,
          (this.CurrWorkFlow && this.CurrWorkFlow.RegionCode ? this.CurrWorkFlow.RegionCode : null)
        ).subscribe(res => {
          this.RankrowsData = res;
        });
      }

      this.isClicked = false;
      this.PopUpType = '';
      this.HaveMaxBtn = false;
      this.PixelHeight = null;
      this.MainMaxwidthPixel = null;
      this.PercentWidth = null;
      this.MinHeightPixel = null;
      this.OverMainMinwidthPixel = null;
      this.PixelWidth = null;
      this.BtnClickedName = '';
    }

  }

  OpenSelectedForm(VirtualModuleViewType) {
    switch (VirtualModuleViewType) {
      // کمیسیون
      case 1:
        this.OnshowhistorydetailClick();
        break;
      case 2:
        this.btnWorkFlowClick();
        break;
      case 3:
        this.onShowRunningContractsClick();
        break;
      case 4:
        this.isClicked = false;
        this.PopUpType = '';
        this.HaveMaxBtn = false;
        this.PixelHeight = null;
        this.MainMaxwidthPixel = null;
        this.PercentWidth = null;
        this.MinHeightPixel = null;
        this.OverMainMinwidthPixel = null;
        this.PixelWidth = null;
        this.BtnClickedName = '';
        this.Report.CorporateRep(
          this.ModuleCode,
          this.ActorId,
          'چاپ اطلاعات تامین کننده حقوقی'
        );
        break;
      case 5:
        this.isClicked = false;
        this.PopUpType = '';
        this.HaveMaxBtn = false;
        this.PixelHeight = null;
        this.MainMaxwidthPixel = null;
        this.PercentWidth = null;
        this.MinHeightPixel = null;
        this.OverMainMinwidthPixel = null;
        this.PixelWidth = null;
        this.BtnClickedName = '';
        if (this.ActorId) {
          this.Report.CorporateRep(
            this.ModuleCode,
            this.ActorId,
            'چاپ کارت پیمانکاری'
          );
        } else {
          this.ShowMessageBoxWithOkBtn('ابتدا شخص را انتخاب نمایید');
          return;
        }
        break;
      default:
        this.PopUpType = '';
        this.isClicked = false;
        break;
    }
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
  onbtnDocumentUpload() {
  }
  onCSMFileclick(event) {
    if (this.DisableSelectFileWindow) { // RFC 56709
      event.preventDefault();
      event.stopPropagation();
    }
  }
  fileChangeEvent(e: File[]) {
    if (e.length > 0) {
      this.selectedFileCSM = e[0];
      if (this.selectedFileCSM.size > 100000) {
        this.ShowMessageBoxWithOkBtn('حجم فايل بيش از حد مجاز است');
        return;
      }
      if (this.selectedFileCSM.type.split('/')[1] !== 'png' && this.selectedFileCSM.type.split('/')[1] !== 'jpeg'
        && this.selectedFileCSM.type.split('/')[1] !== 'bmp' && this.selectedFileCSM.type.split('/')[1] !== 'jpg') {
        this.ShowMessageBoxWithOkBtn('نوع فايل معتبر نيست');
        return;
      }
      const readerCSM = new FileReader();
      readerCSM.onload = e => {
        this.imgCSM = new Image();
        this.imgCSM.onload = () => {
          if (this.imgCSM.width > 1024 || this.imgCSM.height > 1024) {
            this.ShowMessageBoxWithOkBtn('اندازه عکس معتبر نيست');
            return;
          } else {
            this.gridApiMCP.forEachNode(res => {
              if (res.rowIndex === this.SelectedMCPRow) {
                if (res.data.CorporatePositionID != null &&
                  res.data.CorporatePositionID != -1 &&
                  res.data.CorporatePositionID != 0) {
                  this.Actor.UpdateSignImageActorCorporate(
                    res.data.CorporatePositionID,
                    this.imgCSM.src
                  ).subscribe(
                    ress => {
                      res.data.SignImageBase64String = this.imgCSM.src;
                      this.ShowMessageBoxWithOkBtn('بارگذاری امضا با موفقیت انجام شد');
                      return;
                    });
                } else {
                  this.ShowMessageBoxWithOkBtn('ابتدا اطلاعات جدول را ثبت کرده سپس اقدام به ذخیره امضا کنید');
                  return;
                }
                // res.data.SignImageBase64StringSave = this.imgCSM.src;
                // res.data.SignImageBase64String = this.imgCSM.src;
              }
            });
          }
        };
        this.imgCSM.src = readerCSM.result.toString();
      };
      readerCSM.readAsDataURL(this.selectedFileCSM);
    }
    this.DisableSelectFileWindow = true;
  }
  onCorporateDocArchiveClick(MandatoryDocTypeList) {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = { // RFC 52469-item1
      EntityID: this.ActorId,
      TypeCodeStr: '163-',
      DocTypeCode: 163,
      ModuleCode: 2785,
      IsReadOnly: !this.IsEditable,
      MandatoryDocTypeList: MandatoryDocTypeList
    };
  }
  onFileChanged(event) {
    this.UserLocalImage = '';
    this.ImgLoadMsgSize = [];
    const fileList: FileList = event.target.files;
    this.fileListlength = fileList.length;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];

      if (this.selectedFile.size > 100000) {
        this.ImgLoadMsgSize.push({ msg: '*حجم فايل بيش از حد مجاز است' });
        this.ImageMsgLoded = true;
        this.IsUncorrect = true;
        return;
      } else { this.IsUncorrect = false; }

      if (this.selectedFile.type.split('/')[1] !== 'png' && this.selectedFile.type.split('/')[1] !== 'jpeg'
        && this.selectedFile.type.split('/')[1] !== 'bmp' && this.selectedFile.type.split('/')[1] !== 'jpg') {
        this.ImgLoadMsgSize.push({ msg: '*نوع فايل معتبر نيست' });
        this.ImageMsgLoded = true;
        this.IsUncorrect = true;
        return;
      } else { this.IsUncorrect = false; }

      const reader = new FileReader();
      reader.onload = e => {
        this.img = new Image();
        this.img.onload = () => {
          if (this.img.width > 1024 || this.img.height > 1024) {
            this.ImgLoadMsgSize.push({ msg: '*اندازه عکس معتبر نيست' });
            this.ImageMsgLoded = true;
            this.IsUncorrect = true;
            return;
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
  onGridReadyOG(event) {
    this.gridApiOG = event.api;
  }
  oncellEditingStartedOG(event) {
    if (event.colDef && event.colDef.field === 'AdvertisingTypeName') {
      this.Common.GetAdvertisingTypeList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'advertising-type'
        });
      });
    }
  }
  RowClickOG(event) {
    if (event.data && event.data.OfficialGazetteID) {
      this.OfficialGazetteSelectedRow = event.data;
    } else {
      this.OfficialGazetteSelectedRow = (undefined);
    }
  }
  OnActivityStartDateChange(ADate) {
    this.ActivityStartDate = ADate.MDate;
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  // onMovableGridReady(params: { api: any; }) {
  //   this.MovablegridApi = params.api;
  // }
  // onMovablecellEditingStarted(event) {
  //   if (event.colDef && event.colDef.field === 'EquipmentTypeName') {// For InvalidSelected When Old IsValid
  //     this.Actor.GetEquipmentTypeList().subscribe(res => {
  //       this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
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
    if (event.colDef && event.colDef.field === 'EstateTypeName') {
      this.Common.GetAllEstateType().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Estate-ngsv'
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
  }
  onellEditingStartedEH(event) {
    if (event.colDef && event.colDef.field === 'StateName') {
      // this.SelectedColumnDef[2].cellEditorParams.Params.loading = false;
      this.Common.GetStateList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'State-ngsv'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'CityName') {
      // this.RequestSupplierColDef[2].cellEditorParams.Params.loading = true;
      const stateCode = (event.data.StateName && event.data.StateName.StateCode) ?
        event.data.StateName.StateCode : event.data.StateCode;
      this.Common.GetCityByStateCode(stateCode).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'city-ngsv'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ContractStatusName') {
      // this.RequestSupplierColDef[2].cellEditorParams.Params.loading = true;
      this.ContractStatusService.GetContractStatusList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'contract-status-ngsv'
        });
      });
    }
  }
  RowClickAC(event) {
    if (event.data && event.data.CertificateID > 0) {
      this.ActorCetificateSelectedRow = event.data;
    } else {
      this.ActorCetificateSelectedRow = (undefined);
    }
  }
  RowClickEH(event) {
    if (event.data && event.data.ExecutionHistoryID) {
      this.ExecutionHistorySelectedRow = event.data;
    } else {
      this.ExecutionHistorySelectedRow = (undefined);
    }
  }
  RowClickIP(event) {
    if (event.data && event.data.ImmovablePropertyID) {
      this.ImmovablePropertySelectedRow = event.data;
    } else {
      this.ImmovablePropertySelectedRow = (undefined);
    }
  }
  onGridReadyEH(event) {
    this.gridApiEH = event.api;
  }
  onGridReadyIP(event) {
    this.gridApiIP = event.api;
  }
  onTechnicalPersonnelGridReady(event) {
    this.TecnicalPersGridApi = event.api;
  }
  BtnArchiveEhclick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    const doctype = 161;
    this.InputParam = {
      EntityID: this.ExecutionHistorySelectedRow.ExecutionHistoryID,
      TypeCodeStr: doctype.toString() + '-',
      DocTypeCode: doctype,
      ModuleCode: 2785,
      IsReadOnly: !this.IsEditable
    };
  }
  RowClickCS(event) {
    this.CorporateSharesSelectedRow = event.data;
  }
  RowClickMCP(event) {
    this.SelectedMCPRow = event.rowIndex;
  }
  onGridReadyCS(event) {
    this.gridApiCS = event.api;
  }
  onGridReadyMCP(event) {
    this.gridApiMCP = event.api;
  }
  onellEditingStartedCS(event) {
    this.IsPerson = event.data.PersonTypeCode === 1 ? true : false;
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.CorporateSharesColDef[2].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', this.IsPerson, false, true).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ShareTypeName') {
      this.Common.GetAllShareTypes().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'share-type'
        });
      });
    }
  }
  FetchMoreActor(event) {
    this.IsPerson = event.Owner.CorporateSharesSelectedRow.PersonTypeCode === 1 ? true : false;
    event.Owner.CorporateSharesColDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, this.IsPerson, false, true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Actor'
      });
    });
  }
  FetchActorByTerm(event) {
    this.IsPerson = event.Owner.CorporateSharesSelectedRow.PersonTypeCode === 1 ? true : false;
    event.Owner.CorporateSharesColDef[2].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.IsPerson, false, true).subscribe(res => {
        event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor'
        });
      });
  }
  onRankGridReady(params: { api: any; }) {
    this.RankgridApi = params.api;
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

  RankRowClick(event) {
    if (event.data && event.data.ActorBusinessID) {
      this.RankSelectedRow = event.data;
    } else {
      this.RankSelectedRow = (undefined);
    }
  }

  onMovablePropertyClick(row) {
    // RFC 53015
    if (row.ActorBusinessID) {
      // this.CorporateObject.MovableAssetList.filter(x => x.EquipmentTypeCode === row.EquipmentTypeCode);
      this.Actor.GetMovableAssetListByActorBusinessID(row.ActorId).subscribe(res => {
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
        ModuleCode: 2785,
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
        EntityID: this.ActorId,
        TypeCodeStr: '486-', // RFC 52469-item4
        DocTypeCode: 486, // RFC 52469-item4
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.ExecutionHistoryID && row.ExecutionHistoryID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ExecutionHistoryID,
        TypeCodeStr: '488-', // RFC 52469-item6
        DocTypeCode: 488, // RFC 52469-item6
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.OfficialGazetteID && row.OfficialGazetteID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.OfficialGazetteID,
        TypeCodeStr: '472-', // RFC 52469-item2
        DocTypeCode: 472, // RFC 52469-item2
        ModuleCode: 2785,
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
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    if (row.CorporatePositionID && row.CorporatePositionID > 0
      && (row.PositionTypeCode && row.PositionTypeCode === 10)) { // RFC 52469-item5
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.CorporatePositionID,
        TypeCodeStr: '487-', // RFC 52469-item5
        DocTypeCode: 487, // RFC 52469-item5
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
    // if (row.MovableAssetID && row.MovableAssetID > 0) {
    //   this.PopUpType = 'archive-details';
    //   this.HaveHeader = true;
    //   this.isClicked = true;
    //   this.HaveMaxBtn = false;
    //   this.startLeftPosition = 307;
    //   this.startTopPosition = 10;
    //   this.PopupParam = {
    //     EntityID: row.MovableAssetID,
    //     TypeCodeStr: '490-', // RFC 52469-item8
    //     DocTypeCode: 490, // RFC 52469-item8
    //     ModuleCode: 2785,
    //   };
    //   return;
    // }
    // if (row.ActorPropertyID && row.ActorPropertyID > 0) {
    //   this.PopUpType = 'archive-details';
    //   this.HaveHeader = true;
    //   this.isClicked = true;
    //   this.HaveMaxBtn = false;
    //   this.startLeftPosition = 307;
    //   this.startTopPosition = 10;
    //   this.PopupParam = {
    //     EntityID: row.ActorPropertyID,
    //     TypeCodeStr: '491-', // RFC 52469-item9
    //     DocTypeCode: 491, // RFC 52469-item9
    //     ModuleCode: 2785,
    //     IsReadOnly: !this.IsEditable
    //   };
    //   return;
    // }
  }
  onCellEditingStartedMCP(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.ManagerCorporatePositionColDef[4].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', true, false, true, event.data.ActorID).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor-MCP'
        });
      });
    }
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
  }
  onCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'ManagementTypeName') {
      if (event.data.ManagementTypeCode === 1) {
        event.data.IsLimitedEndDate = null;
        event.data.IsLimitedEndDateName = '';
      } else {
        event.data.IsLimitedEndDate = 1;
        event.data.IsLimitedEndDateName = 'محدود';
      }
    }
  }
  FetchActorByTermMCP(event) {
    event.Owner.ManagerCorporatePositionColDef[4].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      true, false, true).subscribe(res => {
        event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor-MCP'
        });
      });
  }
  FetchMoreActorMCP(event) {
    event.Owner.ManagerCorporatePositionColDef[4].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, true, false, true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Actor-MCP'
      });
    });
  }
  uploadimgCSMClicked() {
    this.DisableSelectFileWindow = false; // RFC 56709
    $('#imguploadcsm').click();
  }
  OnChangeLimitedRisponsibility(event) {
    this.IsLimitedRisponsibility = event;
  }
  onequipmentandmachineryGridReady(event) {
    this.equipmentandmachineryApi = event.api;
  }
  onCellEditingStartedequipmentandmachinery(event) {
    if (event.colDef && event.colDef.field === 'AcountTypeName') {
      this.Common.GetAllACountType().subscribe(res => {  // هماهنگی با خ احمدی
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'User-type'
        });
      });
    } else if (event.colDef && event.colDef.field === 'OwnershipTypeName') {
      this.Common.GetAllownerShipType().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Ownership-type'
        });
      });
    } else if (event.colDef && event.colDef.field === 'GoodsName') {
      this.Common.GetGoodsList(this.CorporateObject.ActorId).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'goods'
        });
      });
    }
  }
  OnaffordabilityGridReady(event) {
    this.affordabilityApi = event.api;
  }
  onCellEditingStartedaffordability(event) {
    if (event.colDef && event.colDef.field === 'ProviderAssetTypeName') {
      this.Common.GetAllProviderAssetType().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Provider-Asset-type'
        });
      });
    }
    let ActivityFieldList = [];
    this.NgSelectActivityFieldParams.selectedObject.forEach(y => {
      ActivityFieldList.push(this.ActivityFieldItems.find(x => x.CorporateUrbanActivityCode === y));
    });
    if (event.colDef && event.colDef.field === 'CorporateUrbanActivityName') {
      this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
        List: ActivityFieldList,
        type: 'Activity-Field'
      });
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
            this.CorporateObject.ActorId,
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
      this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
    } else if (this.IsExpertSelected) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
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
        this.ObjectID = this.CorporateObject.ActorId;
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

    if (row.AllowStateCode !== 7) {
      this.Report.ShowReport(null,
        null,
        this.CorporateObject.ActorId,
        null,
        this.IdentityNo,
        this.RequestDate,
        null,
        null,
        null,
        null,
        this.ModuleCode,
        row.RegionCode
      );
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
  DOConfirm(HasAlert = true, resolve = null) {
    if (this.WorkflowObjectCode === null || this.WorkflowObjectCode === undefined) {
      this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
    }
    if (this.WorkFlowID) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CorporateObject.ActorId,
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
            this.ShowMessageBoxWithOkBtn('عملیات تایید با موفقیت انجام شد');
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
    } else {
      if (!this.RankrowsData || this.RankrowsData.length === 0) { // RFC 53751
        this.ShowMessageBoxWithOkBtn('حوزه تخصصی تکمیل نگردیده است امکان تایید وجود ندارد.');
      } else {
        this.ARankrowsDataList = this.RankrowsData.filter(x => x.AllowStateCode === 1 && !x.HasOpenWF);
        if (this.ARankrowsDataList && this.ARankrowsDataList.length > 0) {
          this.ARankrowsDataList = this.CommonServic.GroupBy(this.ARankrowsDataList, 'RegionCode');
          this.BtnClickedName = 'RevokeConfirm';
          this.HasAlert = HasAlert;
          // tslint:disable-next-line: max-line-length
          this.ShowMessageBoxWithYesNoBtn('کاربر محترم توجه فرمایید با تایید اطلاعات برای تمامی حوزه های تخصصی گردش کار جدیدی با وضعیت ایجاد شده، ایجاد خواهد شد، آیا اطمینان دارید؟');
        } else {
          this.ARankrowsDataList = this.RankrowsData.filter(x => x.AllowStateCode === 1 && x.HasOpenWF);
          if (this.ARankrowsDataList && this.ARankrowsDataList.length > 0) {
            this.ShowMessageBoxWithOkBtn('این شخص دارای گردش کار جاری می باشد لذا امکان ایجاد گردش مجدد وجود ندارد');
          } else {
            // tslint:disable-next-line: max-line-length
            this.ShowMessageBoxWithOkBtn('تامین کننده گرامی اطلاعات شما در حوزه تخصص تایید شده است و تغییر جدیدی جهت گرفتن تایید از معاونت مربوطه وجود ندارد.');
          }
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
          messageStr = ' عملیات بازگشت از تایید نهایی با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'عملیات تایید نهایی با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
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
        this.ObjectID = this.CorporateObject.ActorId;
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
  DoUnConfirm(alert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CorporateObject.ActorId,
      this.CurrWorkFlow.RegionCode,
      this.ModuleCode,
      0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.ModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        if (alert) {
          this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
        }
        this.ReadyToConfirm = 0;
        this.btnConfirmName = 'تایید';
        this.btnConfirmIcon = 'ok';
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
  ViewTypeChange() {
    if (this.btnConfirmName === 'عدم تایید') {
      this.ModuleViewTypeCode = 2;
    }
    console.log('🚀 نوع نمایش فعالیت: ' , this.ModuleViewTypeCode);
    switch (this.ModuleViewTypeCode) {
      case 1:
        this.IsEditable = true;
        this.IsDisplay = false;
        this.HaveBankInfo = true; // RFC 53208
        break;
      case 2:
        this.IsEditable = false;
        this.IsDisplay = false;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true; // RFC 53208
        break;
      case 3: // RFC 52500
        this.IsDisplay = false; // RFC 59867
        this.HaveCompleteInfo = true;
        //  this.HaveBankInfo = false; // RFC 53208
        this.HaveBankInfo = true;  // RFC 59867
        this.IsEditableForType3 = true;
        if (this.IsAdmin) {
          this.IsEditableForAdminType3 = true; // RFC 54342
        }
        break;
      case 4: // RFC 52890
        this.IsDisplay = true;
        this.HaveCompleteInfo = true;
        this.HaveSupplementary = true;
        this.HaveBankInfo = false; // RFC 53208
        if (this.ModuleCode === 256) {
          this.HaveNotAllowEditFirstInf = false; // RFC = 53306
        }
        break;
      case 5: // RFC 52890
        this.IsDisplay = true;
        this.HaveCompleteInfo = true;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true;
        if (this.ModuleCode === 256) {
          this.HaveNotAllowEditFirstInf = false; // RFC = 53306
          this.HaveNotAllowEditSecondInf = false;
        }
        break;
      case 6:
        this.IsEditable = false;
        this.IsDisplay = false;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true;
        break;
      case 100000: // LocalProvider
        this.IsEditable = false;
        this.IsDisplay = false;
        this.IdentityNoSearch = this.InputParam.IdentityNo ? this.InputParam.IdentityNo : '';
        if (this.IdentityNoSearch) {
          this.onSearch();
        }
        break;
      case 200000: // اعمال ظرفیت مازاد
        this.IsEditable = false;
        this.IsDisplay = false;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true; // RFC 53208
        this.IsExtraMode = true;
        break;
      case 300000: // RFC 54203
        this.IsEditable = false;
        this.IsDisplay = false;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true;
        this.ShowWorkflowButtons = false;
        this.ButtonsBoxWidth = 100;
        this.ModuleCode = 2785;
        break;
      case 400000:
        this.CanEdite = true;
        this.ButtonName = 'ثبت و حذف حوزه تخصصی';
        this.IsEditable = false;
        this.IsDisplay = false;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true;
        this.IsExtraMode = true;
        break;
      case 500000:
        this.IsEditable = false;
        this.IsDisplay = false;
        this.HaveSupplementary = true;
        this.HaveBankInfo = true;
        this.HaveNotAllowEditFirstInf = false;
        break;
      default:
        this.IsEditable = true;
        this.IsExtraMode = false;
        break;
    }
  }
  getOutPutParam(event) {
    if (this.PopUpType === 'message-box' && this.IsEndFlow === 1 && this.BtnClickedName === 'ConfirmAndSend') {
      this.OnFinalConfirm();
    }

    if (this.PopUpType == 'actor-note') {
      this.ActorNote = event.ActorNote;
      this.Note = event.Note;

    }

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
      this.DoConfirmAndSend();
    }
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
      this.IsAdmin = false; // RFC 62111
      this.RankColumn(this.IsAdmin, this.IsAdminTraffic);
    }
    if (this.BtnClickedName === 'RevokeConfirm' && event === 'YES') {
      const APIList = [];
      this.ARankrowsDataList.forEach(element => {
        APIList.push(this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.CorporateObject.ActorId,
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
            if (this.HasAlert) {
              this.ShowMessageBoxWithOkBtn('تایید اطلاعات با موفقیت انجام شد');
            }
            this.RefreshCartable.RefreshCartable();
            this.ReadyToConfirm = 1;
            this.btnConfirmName = 'عدم تایید';
            this.btnConfirmIcon = 'cancel';
            this.ViewTypeChange();
          },
            err => {
              if (err.error.Message.includes('|')) {
              } else {
                this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
              }
            }
          );
      }
    }
    if (this.BtnClickedName === 'BtnDelete' && event === 'YES') { // RFC 62144
      this.Actor.RevokeProcess(this.WorkflowInstanceID, this.ModuleCode, this.ActorId, this.RegionCode).subscribe(res => {
        if (res) {
          this.BtnClickedName = '';
          this.ShowMessageBoxWithOkBtn('ابطال فرآیند با موفقیت انجام شد');
        }
      });
    }
    if (this.BtnClickedName === 'BtnSavecheckException' && event === 'YES') {
      this.IsCheckException = true;
      this.onSave();
    } else if (this.BtnClickedName === 'BtnSavecheckException' && event === 'NO') {
      this.IsCheckException = false;
    }

    this.isClicked = false;
    this.PopUpType = '';
    this.BtnClickedName = '';
  }
  onShowInformationsClick(event) {
    if (event.ActorID && event.ActorID != null) {
      this.PopUpType = 'person2';
      this.isClicked = true;
      this.startLeftPosition = 40;
      this.startTopPosition = 10;
      this.PixelHeight = 650;
      this.MinHeightPixel = 650;
      this.PixelWidth = 1280;
      this.MainMaxwidthPixel = 1280;
      // this.OverMainMinwidthPixel = 1280;
      this.PercentWidth = 96;
      this.PopupParam = {
        ActorId: event.ActorID,
        HasConfirmBtn: false, // RFC 54065
        ObjectID: event.ActorID,
        ModuleViewTypeCode: this.IsAdmin ? 1 : (this.IsEditable ? 1 : 2), // RFC 53293
        HeaderName: 'مدیر',
        IsManagerInfo: true, // RFC 55889
        CorporateID: this.CorporateObject.ActorId // RFC 55889
      };

    } else {
      this.ShowMessageBoxWithOkBtn('لطفا ابتدا مدیر را انتخاب نمایید');
    }
  }
  OnManagersMinutesDateChange(event) {
    this.ManagersMinutesDate = event.MDate;
  }
  RedioIsLimitedManagersEndDateClick(event) {
    this.IsLimitedManagersEndDate = event;
  }
  OnManagersEndDateChange(event) {
    this.ManagersEndDate = event.MDate;
  }

  onBankgridApiReady(event) {
    this.BankgridApi = event.api;
  }
  // onActorPropertyReady(event) {
  //   this.ActorPropertyApi = event.api;
  // }
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
      case 'HaveHSE':
        this.HaveHSE = Ischeck;
        break;
      case 'HaveBail':
        this.HaveBail = Ischeck;
        break;
      case 'HaveCertificate':
        this.HaveCertificate = Ischeck;
        break;
      default:
        break;
    }
  }
  onAddActorClick() {
    this.PopUpType = 'app-actor-inquiry';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.OverMainMinwidthPixel = 700;
    this.MainMaxwidthPixel = 700;
    this.startLeftPosition = 307;
    this.startTopPosition = 15;
    // this.PercentWidth = 60;
    this.PopupParam = {
      HeaderName: 'جستجوي شخص',
      ModuleCode: 2785
    };
  }
  ManagersCountChange(event) {
    this.ManagersCount = event;
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
  OnActorPropertyDocArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = {
      EntityID: this.ActorPropertyID,
      TypeCodeStr: '491-', // RFC 52469-item9
      DocTypeCode: 491, // RFC 52469-item9
      ModuleCode: 2785,
    };
  }
  RowClickCoTP(event) {
    if (event.data && event.data.CorporatePositionID) {
      this.TechnicalPersonnelCorporatePositionSelectedRow = event.data;
    } else {
      this.TechnicalPersonnelCorporatePositionSelectedRow = (undefined);
    }
  }

  OnAddCorporateManagerClick() {
    this.onAddActorClick();
  }

  onWorkLogDetailClick(row) { // RFC 52927
    if (row.ActorId && row.ActorId > 0
      && row.RegionCode && !isUndefined(row.RegionCode)
      && row.ActorBusinessID && row.ActorBusinessID > 0
      && row.AllowStateCode !== 7) {
      this.FlowService.GetWfInstanceIDByObjIDAndRegionCode(row.ActorId, row.RegionCode, true).subscribe(res => {
        if (res) {
          this.PopUpType = 'user-work-log-details';
          this.HaveHeader = true;
          this.isClicked = true;
          this.HaveMaxBtn = true;
          // this.PixelWidth = 1290;
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
            Name: this.ActorName,
            RegisterNo: this.RegisterNo,
            Date: this.RegisterPersianDate,
            IsAdmin: this.IsAdmin
          };
        } else {
          this.ShowMessageBoxWithOkBtn('یرای این حوزه گردش کاری ایجاد نشده است');
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
  onPrinctCart() {
    if (this.ActorId) {
      this.Report.CorporateRep(
        this.ModuleCode,
        this.ActorId,
        'چاپ کارت پیمانکاری'
      );
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا شخص را انتخاب نمایید');
      return;
    }
  }

  OnOpenCityNgSelect() {
    const currCorporateCityID = this.CorporateObject && this.CorporateObject.CorporateCityID ? this.CorporateObject.CorporateCityID : null;
    this.NgSelectLocationParams.loading = true;
    this.Common.GetCityPaging(1, 30, '', '',
      currCorporateCityID).subscribe((res: any) => {
        this.LocationItems = res.List;
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'city'
        });
        this.NgSelectLocationParams.loading = false;
      });
  }

  FetchMoreCity(event) {
    this.NgSelectLocationParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Common.GetCityPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, null)
        .subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.LocationItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.LocationItems.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'city'
      });
    });
    this.NgSelectLocationParams.loading = false;
  }
  AllowStateUpdate(row) {
    if ((row.AllowStateCode === 8 && this.IsAdminTraffic) || this.IsAdmin) {
      if (row.ActorId && row.ActorId > 0 &&
        row.BusinessPatternID && row.BusinessPatternID > 0 &&
        row.ActorBusinessID && row.ActorBusinessID > 0 &&
        row.AllowStateCode && row.AllowStateCode > 0) {
        this.Actor.AllowStateUpdate(row.ActorId,
          row.ActorBusinessID,
          row.AllowStateCode,
          2785,
          row.AllowStateCodeUpdateDec).subscribe(res => {
            if (res) {
              this.ShowMessageBoxWithOkBtn('تغییر وضعیت تامین کننده با موفقیت انجام شد');
            }
          });
      }
    }
  }
  doCitySearch(event) {
    this.currentCitySearchTerm = event.term;
    this.NgSelectLocationParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'CityCode';
    }
    this.Common.GetCityPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, null).subscribe((res: any) => {
        if (this.currentCitySearchTerm === event.term) {
          this.LocationItems = res.List;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'city'
          });
          this.NgSelectLocationParams.loading = false;
        }
      });
  }

  onSaveRank() {
    this.RankgridApi.stopEditing();
    const RankList = [];
    this.RankgridApi.forEachNode(node => {
      RankList.push(node.data);
    });
    this.Actor.onSaveRank(RankList, this.CorporateObject.ActorId, true, this.ModuleViewTypeCode, this.ModuleCode).subscribe(res => {
      this.CorporateObject = res;
      this.FindActor(res);
      this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }
  btnShowDetailsClick() {
    if (this.CorporateObject && this.CorporateObject.ActorId) {
      this.PopUpType = 'corporate2';
      this.isClicked = true;
      this.startLeftPosition = 40;
      this.startTopPosition = 10;
      this.PixelHeight = 650;
      this.MinHeightPixel = 650;
      this.PixelWidth = 1280;
      this.MainMaxwidthPixel = 1280;
      // this.OverMainMinwidthPixel = 1280;
      this.PercentWidth = 96;
      this.PopupParam = {
        CorporateID: this.CorporateObject.ActorId,
        ObjectID: this.CorporateObject.ActorId,
        ModuleViewTypeCode: 2,
        IsShowCompleteInfo: true,
        HeaderName: 'تامین کننده حقوقی',
      };
    }
  }
  btnPrintClick() {
    this.PopUpType = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.isClicked = true;
    this.PopupParam = {
      HeaderName: 'چاپ',
      RadioItems: [
        {
          title: 'چاپ اطلاعات تامین کننده',
          type: 4,
        },
        {
          title: 'چاپ کارت پیمانکاری',
          type: 5,
        },

      ]
    };
  }
  onDocArchiveClick2(row) {
    if (row.ActorBusinessID && row.ActorBusinessID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ActorBusinessID,
        TypeCodeStr: '181-',
        DocTypeCode: 181,
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
  }

  OnRegisterDateChange(ADate) {
    this.RegisterDate = ADate.MDate;
    this.RegisterPersianDate = ADate.SDate;
  }
  onSave() {
    if (this.IsLimitedManagersEndDate && this.ManagersEndDate === null) {
      this.CheckValidate = true;
      this.CanSave = false;
      this.ShowMessageBoxWithOkBtn('لطفا فیلد تا تاریخ را در تب مدیران وارد نمایید');
      return;
    }
    this.BtnClickedName = 'BtnSave';
    if (!this.CanSave) {
      this.ShowMessageBoxWithYesNoBtn('با ثبت اطلاعات  ممکن است وضعیت حوزه تخصصی تغییر نمایید . آیا مایل به ادامه هستید؟');
      return;
    }
    this.OfficialGazetteList = [];
    this.gridApiOG.stopEditing();
    this.gridApiOG.forEachNode(res => {
      const tempobj = {
        OfficialGazetteID: res.data.OfficialGazetteID ? res.data.OfficialGazetteID : -1,
        ActorID: res.data.ActorID,
        AdvertisingDate: (res.data.ShamsiAdvertisingDate && res.data.ShamsiAdvertisingDate.MDate) ? res.data.ShamsiAdvertisingDate.MDate
          : res.data.ShortAdvertisingDate ? res.data.ShortAdvertisingDate : null,
        MinutesSignDate: (res.data.ShamsiMinutesSignDate && res.data.ShamsiMinutesSignDate.MDate) ? res.data.ShamsiMinutesSignDate.MDate
          : res.data.ShortMinutesSignDate ? res.data.ShortMinutesSignDate : null,
        NewspaperRegisterDate: (res.data.ShamsiNewspaperRegisterDate && res.data.ShamsiNewspaperRegisterDate.MDate) ?
          res.data.ShamsiNewspaperRegisterDate.MDate
          : res.data.ShortNewspaperRegisterDate ? res.data.ShortNewspaperRegisterDate : null,
        AdvertisingTypeCode: res.data.AdvertisingTypeCode,
        IsManagementChange: res.data.IsManagementChange ? res.data.IsManagementChange : false,
        IsShareHolderChange: res.data.IsShareHolderChange ? res.data.IsShareHolderChange : false,
        IsSignOwnerChange: res.data.IsSignOwnerChange ? res.data.IsSignOwnerChange : false,
        IsAddressChange: res.data.IsAddressChange ? res.data.IsAddressChange : false,
        Note: res.data.Note,
      };
      this.OfficialGazetteList.push(tempobj);
    });
    this.TecnicalPersGridApi.stopEditing();
    this.TechnicalPersonnelCorporatePositionList = [];
    this.TecnicalPersGridApi.forEachNode(res => {
      const Result = {
        CorporatePositionID: res.data.CorporatePositionID ? res.data.CorporatePositionID : -1,
        ActorID: res.data.ActorID,
        EmploymentDate: (res.data.ShamsiEmploymentDate && res.data.ShamsiEmploymentDate.MDate)
          ? res.data.ShamsiEmploymentDate.MDate : res.data.ShortEmploymentDate,
        HistoryMonth: res.data.HistoryMonth,
        HistoryYear: res.data.HistoryYear,
        StartDate: (res.data.ShamsiStartDate && res.data.ShamsiStartDate.MDate)
          ? res.data.ShamsiStartDate.MDate : res.data.ShortStartDate,
        EndDate: (res.data.ShamsiEndDate && res.data.ShamsiEndDate.MDate)
          ? res.data.ShamsiEndDate.MDate : res.data.ShortEndDate,
        ResponsibilityTypeCode: res.data.ResponsibilityTypeCode ? res.data.ResponsibilityTypeCode : null
      };
      this.TechnicalPersonnelCorporatePositionList.push(Result);
    });
    this.ManagerCorporatePositionList = [];
    this.CorporateSharesList = [];
    this.ExecutionHistoryList = [];
    this.ImmovablePropertyList = [];
    this.gridApiMCP.stopEditing();
    this.RankgridApi.stopEditing();
    const ActorBusinessList = [];
    this.gridApiMCP.forEachNode(res => {
      const Manager = {
        CorporatePositionID: res.data.CorporatePositionID ? res.data.CorporatePositionID : -1,
        // SignImageBase64StringSave: res.data.SignImageBase64StringSave ?
        //   res.data.SignImageBase64StringSave : res.data.SignImageBase64String,
        ActorID: res.data.ActorID,
        Note: res.data.Note,
        StartDate: (res.data.ShamsiStartDate && res.data.ShamsiStartDate.MDate)
          ? res.data.ShamsiStartDate.MDate : res.data.ShortStartDate,
        EndDate: (res.data.ShamsiEndDate && res.data.ShamsiEndDate.MDate)
          ? res.data.ShamsiEndDate.MDate : res.data.ShortEndDate,
        PositionTypeCode: 2,
        SignRight: res.data.SignRight,
        ItemNo: res.data.ItemNo,
        ManagementTypeCode: res.data.ManagementTypeCode, // نوع
        ResponsibilityTypeCode: res.data.ResponsibilityTypeCode, // نوع مسئولیت
        IsLimitedEndDate: res.data.IsLimitedEndDate // تاریخ پایان مسئولیت
      };
      this.ManagerCorporatePositionList.push(Manager);
    });
    this.gridApiCS.stopEditing();
    this.gridApiCS.forEachNode(res => {
      const temp = {
        CorporateSharesID: res.data.CorporateSharesID ? res.data.CorporateSharesID : -1,
        ShareTypeCode: res.data.ShareTypeCode,
        IsCash: res.data.IsCash ? res.data.IsCash : false,
        IsCount: res.data.IsCount ? res.data.IsCount : false,
        ActorID: res.data.ActorID,
        Value: res.data.Value,
        NominalValue: res.data.NominalValue,
        RealValue: res.data.RealValue,
        MembershipDate: (res.data.ShamsiMembershipDate && res.data.ShamsiMembershipDate.MDate)
          ? res.data.ShamsiMembershipDate.MDate : res.data.ShortMembershipDate,
      };
      this.CorporateSharesList.push(temp);
    });
    this.gridApiEH.stopEditing();
    this.gridApiEH.forEachNode(res => {
      const tempobj = {
        ExecutionHistoryID: res.data.ExecutionHistoryID ? res.data.ExecutionHistoryID : -1,
        EmployerName: res.data.EmployerName,
        ContractCode: res.data.ContractCode,
        ContractDate: (res.data.ShamsiContractDate && res.data.ShamsiContractDate.MDate) ? res.data.ShamsiContractDate.MDate
          : res.data.ShortContractDate ? res.data.ShortContractDate : null,
        Amount: res.data.Amount,
        Subject: res.data.Subject,
        ContractStatusCode: res.data.ContractStatusCode,
        ContractDurationNumberMonth: res.data.ContractDurationNumberMonth,
        ProgressPercent: res.data.ProgressPercent,
        AdjustmentAmount: res.data.AdjustmentAmount,
        CityID: res.data.CityID,
        DifferenceAmount: res.data.DifferenceAmount,
        EndDate: (res.data.ShamsiEndDate && res.data.ShamsiEndDate.MDate) ? res.data.ShamsiEndDate.MDate
          : res.data.ShortEndDate ? res.data.ShortEndDate : null,
        ContractTypeCode: res.data.ContractTypeCode
      };
      this.ExecutionHistoryList.push(tempobj);
    });
    this.gridApiIP.stopEditing();
    this.gridApiIP.forEachNode(res => {
      const tempobj = {
        ImmovablePropertyID: res.data.ImmovablePropertyID ? res.data.ImmovablePropertyID : -1,
        EstateTypeCode: res.data.EstateTypeCode,
        InvestUsageTypeCode: res.data.InvestUsageTypeCode,
        Address: res.data.Address,
        PostCode: res.data.PostCode,
        Area: res.data.Area,
        Note: res.data.Note,
        PropertyTypeCode: res.data.PropertyTypeCode,
        OwnershipTypeCode: res.data.OwnershipTypeCode
      };
      this.ImmovablePropertyList.push(tempobj);
    });

    this.equipmentandmachineryApi.stopEditing();
    const equipmentandmachineryList = [];
    this.equipmentandmachineryApi.forEachNode(node => {
      const equipmentRow = {
        CorporateID: this.CorporateObject.ActorId,
        CarType: node.data.CarType,
        // tslint:disable-next-line: max-line-length
        AcountTypeCode: (node.data.AcountTypeID !== null && !isUndefined(node.data.AcountTypeID) && node.data.AcountTypeID !== 0) ? node.data.AcountTypeID :
          // tslint:disable-next-line: max-line-length
          ((node.data.AcountTypeCode !== null && !isUndefined(node.data.AcountTypeCode) && node.data.AcountTypeCode !== 0) ? node.data.AcountTypeCode : null),
        SystemName: node.data.SystemName,
        ProductYear: node.data.ProductYear,
        DisciplinaryNO: node.data.DisciplinaryNO,
        EngineNumber: node.data.EngineNumber,
        ChassisNumber: node.data.ChassisNumber,
        OwnershipTypeCode: (node.data.OwnershipTypeCode !== null && node.data.OwnershipTypeCode !== 0) ? node.data.OwnershipTypeCode : null,
        TechnicalInspectionNO: node.data.TechnicalInspectionNO,
        TIValidityDate: (node.data.PersianTIValidityDate && node.data.PersianTIValidityDate.MDate) ?
          node.data.PersianTIValidityDate.MDate : node.data.ShortValidityDate ? node.data.ShortValidityDate : null,
        Dec: node.data.Dec,
        IsScorer: node.data.IsScorer,
        HaveGPS: node.data.HaveGPS,
        GPSInstallerCompany: node.data.GPSInstallerCompany,
        EquipmentAndMachineryID: node.data.EquipmentAndMachineryID ? node.data.EquipmentAndMachineryID : -1,
        ProductID: (node.data.ProductID !== null && node.data.ProductID !== 0) ? node.data.ProductID : null,
      };
      equipmentandmachineryList.push(equipmentRow);
    });

    // this.ActorPropertyApi.stopEditing();
    // const ActorPropertyList = [];
    // this.ActorPropertyApi.forEachNode(node => {
    //   const ActorPropertyRows = {
    //     ActorPropertyID: node.data.ActorPropertyID,
    //     Subject: node.data.Subject,
    //     HaveHSE: node.data.HaveHSE ? true : false,
    //     HaveBail: node.data.HaveBail ? true : false,
    //     HaveCertificate: node.data.HaveCertificate ? true : false,
    //   };
    //   ActorPropertyList.push(ActorPropertyRows);
    // });

    this.affordabilityApi.stopEditing();
    const affordabilityList = [];
    this.affordabilityApi.forEachNode(node => {
      const affordabilityRow = {
        CorporateID: node.data.CorporateID,
        ProviderAssetTypeName: node.data.ProviderAssetTypeName,
        // tslint:disable-next-line:max-line-length
        AssetTypeCode: (node.data.AssetTypeCode !== null && node.data.AssetTypeCode !== 0) ? node.data.AssetTypeCode : null,
        AccountNO: node.data.AccountNO,
        AccountBalance: node.data.AccountBalance,
        Turnover: node.data.Turnover,
        CorporateUrbanActivityCode: node.data.CorporateUrbanActivityCode,
        CompanyAffordabilityID: node.data.CompanyAffordabilityID ? node.data.CompanyAffordabilityID : -1
      };
      affordabilityList.push(affordabilityRow);
    });

    if (this.CorporateObject) {
      const CertificateList = [];
      this.gridApi.stopEditing();
      this.gridApi.forEachNode(item => {
        const obj = {
          CertificateID: item.data.CertificateID ? item.data.CertificateID : -1,
          CertificationCode: item.data.CertificationCode,
          CertificateDate: (item.data.CertificatePersianDate && item.data.CertificatePersianDate.MDate)
            ? item.data.CertificatePersianDate.MDate : (item.data.ShortCertificateDate ? item.data.ShortCertificateDate : null),
          CertificateEndDate: (item.data.CertificatePersianEndDate && item.data.CertificatePersianEndDate.MDate)
            ? item.data.CertificatePersianEndDate.MDate : (item.data.ShortCertificateEndDate ? item.data.ShortCertificateEndDate : null),
          CertificateRefrence: item.data.CertificateRefrence,
          Note: item.data.Note,
          ActorId: this.ActorId ? this.ActorId : -1,
          CertificateName: item.data.CertificateName,
          ItemNo: item.data.ItemNo
        };
        CertificateList.push(obj);
      });
      this.RankgridApi.forEachNode(node => {
        const Rankobj = {
          ActorBusinessID: node.data.ActorBusinessID ? node.data.ActorBusinessID : -1,
          ActorId: node.data.ActorId,
          // tslint:disable-next-line: max-line-length
          RegionCode: node.data.RegionName && node.data.RegionName.RegionCode && !isUndefined(node.data.RegionName.RegionCode) ? node.data.RegionName.RegionCode : (node.data.RegionCode !== null ? node.data.RegionCode : null),
          // tslint:disable-next-line: max-line-length
          BusinessPatternID: node.data.BusinessPatternNoName && node.data.BusinessPatternNoName.BusinessPatternID ? node.data.BusinessPatternNoName.BusinessPatternID : (node.data.BusinessPatternID ? node.data.BusinessPatternID : null),
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
          UnitPatternID: node.data.UnitPatternID,
          ItemNo: node.data.ItemNo
        };
        ActorBusinessList.push(Rankobj);
      });
      // RFC 52043-Item2
      this.BankgridApi.stopEditing();
      this.BankrowData = [];
      this.BankgridApi.forEachNode(res => {
        this.BankrowData.push(res.data);
      });
      this.CorporateObject.Web = this.Web;
      this.CorporateObject.PostCode = this.PostCode;
      this.CorporateObject.Tel = this.Tel;
      this.CorporateObject.RegisterReferenceId = this.NgSelectRegisterReferenceNameParams.selectedObject;
      this.CorporateObject.Email = this.Email;
      this.CorporateObject.Address = this.Address;
      this.CorporateObject.ActorNote = this.ActorNote;
      this.CorporateObject.EconomicCode = this.EconomicCode;
      this.CorporateObject.CompanyAgentEmail = this.CompanyAgentEmail;
      this.CorporateObject.CompanyAgentTel = this.CompanyAgentTel;
      this.CorporateObject.CompanyAgentName = this.CompanyAgentName;
      this.CorporateObject.Fax = this.Fax;
      this.CorporateObject.ActivityStartDate = this.ActivityStartDate;
      this.CorporateObject.EmployeCount = this.EmployeCount;
      this.CorporateObject.Note = this.Note;
      this.CorporateObject.ActorCertificateList = CertificateList;
      this.CorporateObject.ActorId = this.ActorId ? this.ActorId : -1;
      this.CorporateObject.OldName = this.OldName;
      this.CorporateObject.CellNo = this.CellNo;
      this.CorporateObject.IsLimitedRisponsibility = this.IsLimitedRisponsibility;
      this.CorporateObject.CorporateCityID = this.NgSelectLocationParams.selectedObject;
      this.CorporateObject.CorporateRegisterTypeCode = this.NgSelectCorporateRegistertypeParams.selectedObject;
      this.CorporateObject.RequestDate = this.RequestDate;
      // this.CorporateObject.ActivityField = this.NgSelectActivityFieldParams.selectedObject;
      this.CorporateObject.GradeRequest = this.GradeReq;
      this.CorporateObject.ManagersCount = this.ManagersCount;
      this.CorporateObject.SignedRightHolders = this.SignedRightHolders;
      this.CorporateObject.ManagersMinutesDate = this.ManagersMinutesDate;
      this.CorporateObject.IsLimitedManagersEndDate = this.IsLimitedManagersEndDate;
      this.CorporateObject.ManagersEndDate = this.ManagersEndDate;
      this.CorporateObject.IsContractor = this.IsContractor;
      this.CorporateObject.IsConsult = this.IsConsult;
      this.CorporateObject.IsProducer = this.IsProducer;
      this.CorporateObject.IsSupplier = this.IsSupplier;
      this.CorporateObject.IsInternalBuilders = this.IsInternalBuilders;
      this.CorporateObject.IsExternalBuilders = this.IsExternalBuilders;
      this.CorporateObject.CompanyAgentActorID = this.NgSelectCompanyAgentActorParams.selectedObject;
      this.CorporateObject.Subject = this.Subject;
      this.CorporateObject.HaveHSE = this.HaveHSE;
      this.CorporateObject.HaveBail = this.HaveBail;
      this.CorporateObject.HaveCertificate = this.HaveCertificate;
      this.CorporateObject.ActorPropertyID = this.ActorPropertyID ? this.ActorPropertyID : -1;
      this.CorporateObject.RegisterNo = this.RegisterNo;
      this.CorporateObject.RegisterDate = this.RegisterDate;
      this.CorporateObject.CellNo = this.CellNo;

      if (this.fileListlength > 0 &&
        !(this.selectedFile.size < 100000
          && (this.selectedFile.type.split('/')[1] === 'png'
            || this.selectedFile.type.split('/')[1] === 'jpeg'
            || this.selectedFile.type.split('/')[1] === 'jpg'
            || this.selectedFile.type.split('/')[1] === 'bmp')
          && (this.img.width < 1024 || this.img.height < 1024))) {
        this.ShowMessageBoxWithOkBtn('امکان ذخيره سازي تصوير انتخاب شده وجود ندارد.');
        this.CanSave = false;
        return;
      }
      if (!this.IsCheckException) {
        let StrExceptions = '';
        this.Actor.CheckExceptionActorBusiness(ActorBusinessList, this.ActorId).subscribe((res: any) => {
          if (res !== '') {
            this.IsCheckException = true;
            this.BtnClickedName = 'BtnSavecheckException';
            StrExceptions = res;
            StrExceptions = StrExceptions + ' ' + 'آیا می خواهید ادامه دهید؟';
            this.ShowMessageBoxWithYesNoBtn(StrExceptions);
          } else {
            this.IsCheckException = false;
            this.Actor.UpdateActorCorporatee(
              this.ExecutionHistoryList,
              // MovableAssetList,
              this.ImmovablePropertyList,
              this.CorporateSharesList,
              this.ManagerCorporatePositionList,
              ActorBusinessList,
              this.OfficialGazetteList,
              this.TechnicalPersonnelCorporatePositionList,
              this.CorporateObject,
              this.UserLocalImage,
              equipmentandmachineryList,
              affordabilityList,
              this.BankrowData,
              this.NgSelectActivityFieldParams.selectedObject,
              //   ActorPropertyList,
              this.FromWorkListCartable
            ).subscribe(res => {
              this.CorporateObject = res;
              this.DisplaySearchBox = false;
              this.TabsContentHeight = 72;
              this.RolefielsetMarginTop = this.RolefielsetMarginBottom = 2;
              this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
              this.FindActor(this.CorporateObject);
              this.CanSave = false;
            },
              err => {
                this.CanSave = false;
              });
          }
        });
      } else {
        this.IsCheckException = false;
        this.Actor.UpdateActorCorporatee(
          this.ExecutionHistoryList,
          // MovableAssetList,
          this.ImmovablePropertyList,
          this.CorporateSharesList,
          this.ManagerCorporatePositionList,
          ActorBusinessList,
          this.OfficialGazetteList,
          this.TechnicalPersonnelCorporatePositionList,
          this.CorporateObject,
          this.UserLocalImage,
          equipmentandmachineryList,
          affordabilityList,
          this.BankrowData,
          this.NgSelectActivityFieldParams.selectedObject,
          //   ActorPropertyList,
          this.FromWorkListCartable
        ).subscribe(res => {
          this.CorporateObject = res;
          this.DisplaySearchBox = false;
          this.TabsContentHeight = 72;
          this.RolefielsetMarginTop = this.RolefielsetMarginBottom = 2;
          this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
          this.FindActor(this.CorporateObject);
          this.CanSave = false;
        },
          err => {
            this.CanSave = false;
          });
      }
    } else {
      this.CheckValidate = true;
      this.CanSave = false;
      this.ShowMessageBoxWithOkBtn('ابتدا شخص را انتحاب نمایید');
      return;
    }
  }
  onWFSave() {
    if (this.CorporateObject) {
      this.DisplaySearchBox = false;
      if (this.WorkFlowID) {
        this.ModuleCode = 2785;
        this.FromWorkListCartable = true;
      }
      const ActorBusinessList = [];
      this.RankgridApi.stopEditing();
      this.RankgridApi.forEachNode(node => {
        const Rankobj = {
          ActorBusinessID: node.data.ActorBusinessID ? node.data.ActorBusinessID : -1,
          ActorId: node.data.ActorId,
          // tslint:disable-next-line: max-line-length
          RegionCode: node.data.RegionName && node.data.RegionName.RegionCode && !isUndefined(node.data.RegionName.RegionCode) ? node.data.RegionName.RegionCode : (node.data.RegionCode !== null ? node.data.RegionCode : null),
          // tslint:disable-next-line: max-line-length
          BusinessPatternID: node.data.BusinessPatternNoName && node.data.BusinessPatternNoName.BusinessPatternID ? node.data.BusinessPatternNoName.BusinessPatternID : (node.data.BusinessPatternID ? node.data.BusinessPatternID : null),
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
          UnitPatternID: node.data.UnitPatternID,
          ItemNo: node.data.ItemNo,
        };
        ActorBusinessList.push(Rankobj);
      });

      this.Actor.UpdateCorporateOnWFSave(
        this.CorporateObject,
        ActorBusinessList,
        this.FromWorkListCartable
      ).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
      });
    } else {
      this.CheckValidate = true;
      this.ShowMessageBoxWithOkBtn('ابتدا شخص را انتحاب نمایید');
      return;
    }
  }
  btnWorkFlowClick() {
    if (this.CorporateObject && this.CorporateObject.ActorId) {
      this.PopUpType = 'supplier-work-flow';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.MinHeightPixel = 450;
      this.PopupParam = {
        ActorID: this.CorporateObject.ActorId,
        IdentityNo: this.IdentityNo,
        FirstName: this.ActorName,
        LastName: '',
        EconomicCode: this.EconomicCode,
        PersianBirthDate: this.RegisterPersianDate,
        IsAdmin: this.IsAdmin,
        RequestDate: this.RequestDate,
        HeaderName: 'تاریخچه گردش تامین کننده حقیقی',
        HasWorkFlowID: this.WorkFlowID
      };
    }
  }
  BtnArchiveClick() {
    this.ProductRequest.GetDocTypeMadatory(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null).subscribe(ress => { this.onCorporateDocArchiveClick(ress); });
  }
  onRevocationClick() {
    this.BtnClickedName = 'Revoke';
    this.ShowMessageBoxWithYesNoBtn('آیا از ابطال و غیر مجاز نمودن اطمینان دارید؟');
  }

  Revoke() {
    this.Actor.ProviderRevocation(this.CurrWorkFlow, this.WorkFlowID,
      this.CorporateObject.ActorId, this.WorkflowTypeCode,
      this.ModuleCode, this.OrginalModuleCode).subscribe(res => {
        if (res && res === 1) {
          this.ShowMessageBoxWithOkBtn('ابطال با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('ابطال انجام نشد');
        }
      });
  }
  btnShowContractClick() {
    if (this.CorporateObject && this.CorporateObject.ActorId) {
      this.PopUpType = 'contract-list-page';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 110;
      this.startTopPosition = 50;
      this.MinHeightPixel = 550;
      this.PixelHeight = 550;
      this.PopupParam = {
        IsProviderContractList: true,
        ActorID: this.CorporateObject.ActorId,
        IdentityNo: this.IdentityNo,
        FirstName: this.ActorName,
        LastName: '',
        EconomicCode: this.EconomicCode,
        PersianBirthDate: this.RegisterPersianDate,
        IsAdmin: this.IsAdmin,
        RequestDate: this.RequestDate,
        HeaderName: 'مشاهده قراردادهای شهرداری',
      };
    }
  }



  onShowRankClick(row) {
    if (row) {
      if (row.BusinessPatternID === 4924) {
        if (!row.PriceListTopicID) {
          this.ShowMessageBoxWithOkBtn('در تب حوزه تخصص رشته مورد نظر را انتخاب نمایید');
          return;
        }
        this.PopUpType = 'view-actor-rank';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 74;
        this.startTopPosition = 5;
        this.MinHeightPixel = 400;
        this.PixelHeight = 300;
        this.PixelWidth = 1100;
        this.MainMaxwidthPixel = 1100;
        this.PopupParam = {
          ActorID: row.ActorId,
          PriceListTopicID: row.PriceListTopicID,
        };
      } else {
        this.ShowMessageBoxWithOkBtn('امکان مشاهده رتبه در تخصص های غیر از خدمات شهری امکان پذیر نیست.');
      }
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
      this.PixelWidth = 1250;
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
      this.PixelWidth = 1250;
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
  onRevokeProcessClick(row) {
    if (row.RegionCode && row.RegionCode != null) {
      this.RegionCode = row.RegionCode;
    }
    this.WorkflowInstanceID = row.WorkflowInstanceID;
    if (row.HasOpenWF === null || row.HasOpenWF <= 0 ||
      this.WorkflowInstanceID === null || this.WorkflowInstanceID <= 0) {
      this.ShowMessageBoxWithOkBtn('گردش کار در جریانی برای این حوزه ایجاد نشده است.');
      return;
    }
    this.BtnClickedName = 'BtnDelete';
    // tslint:disable-next-line: no-unused-expression
    this.ShowMessageBoxWithYesNoBtn(' با انجام این عملیات برای گردش کار سازمان ' +
      row.RegionName +
      ' انصراف از درخواست ثبت  خواهد شد،') +
      ' (برای به جریان انداختن گردش کار در این واحد باید درخواست جدیدی در سیستم ثبت گردد)،' +
      'آیا مطمعن هستید؟';
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
    this.PixelWidth = 1250;
    this.MainMaxwidthPixel = 1250;

    this.PopupParam = {
      ActorID: this.ActorId,
    };
  }
  onTechnicalArchiveClick(row) {
    if (row && row.EquipmentAndMachineryID && row.EquipmentAndMachineryID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.EquipmentAndMachineryID,
        TypeCodeStr: '1127-',
        DocTypeCode: 1127,
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    } else {
      this.PopUpType = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }
  }
  onDocArchiveClick3(row) {
    if (row.CompanyAffordabilityID && row.CompanyAffordabilityID > 0) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.CompanyAffordabilityID,
        TypeCodeStr: '1187-',
        DocTypeCode: 1187,
        ModuleCode: 2785,
        IsReadOnly: !this.IsEditable
      };
      return;
    }
  }
  OnshowhistorydetailClick() {
    if (this.CorporateObject && this.CorporateObject.ActorId) {
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
        ActorId: this.CorporateObject.ActorId,
        HeaderName: 'مشاهده ریز اصلاحات',
        ModuleCode: 2785
      };
    }
  }
  SetChangeFlag() {
    this.CorporateNameChangeFlag = false;
    this.IdentityNoChangeFlag = false;
    this.RegisterReferenceIdChangeFlag = false;
    this.RegisterNoChangeFlag = false;
    this.EconomicCodeChangeFlag = false;
    this.ActivityStartDateChangeFlag = false;
    this.EmployeCountChangeFlag = false;
    this.NoteChangeFlag = false;
    this.AddressChangeFlag = false;
    this.PostCodeChangeFlag = false;
    this.FaxChangeFlag = false;
    this.GradeRequestChangeFlag = false;
    this.WebChangeFlag = false;
    this.EmailChangeFlag = false;
    this.OldNameChangeFlag = false;
    this.ActivityFieldChangeFlag = false;
    this.CorporateCityIDChangeFlag = false;
    this.RequestDateChangeFlag = false;
    this.IsLimitedRisponsibilityChangeFlag = false;
    this.IsContractorChangeFlag = false;
    this.IsConsultChangeFlag = false;
    this.IsProducerChangeFlag = false;
    this.IsSupplierChangeFlag = false;
    this.IsInternalBuildersChangeFlag = false;
    this.IsExternalBuildersChangeFlag = false;
    this.CompanyAgentNameChangeFlag = false;
    this.CompanyAgentTelChangeFlag = false;
    this.ManagersCountChangeFlag = false;
    this.SignedRightHoldersChangeFlag = false;
    this.ManagersMinutesDateChangeFlag = false;
    this.IsLimitedManagersEndDateChangeFlag = false;
    this.ManagersEndDateChangeFlag = false;
    this.CompanyAgentEmailChangeFlag = false;
    this.CompanyAgentActorIDChangeFlag = false;
    this.SubjectChangeFlag = false;
    this.HaveHSEChangeFlag = false;
    this.HaveBailChangeFlag = false;
    this.HaveCertificateChangeFlag = false;
    this.CellNoChangeFlag = false;
    this.ActorNoteChangeFlag = false;
    forkJoin([
      this.Common.GetLastAuditByObjectID(this.ActorId),
      this.Common.CheckAllowState(this.ActorId),
    ]).subscribe(res => {
      if (res[1] === true) {
        this.needShowColor = true;
        let ChangeActoBusinessObj = res[0].filter(x => x.TableName === 'ACTOR_BUSINESS');
        let ActoBusinessObjList = [];
        ChangeActoBusinessObj.forEach(element => {
          this.RankrowsData.forEach(element2 => {
            if (element.ObjectID === element2.data.ActorBusinessID) {
              element2.data.IsChanged = true;
            }
            ActoBusinessObjList.push(element2.data);
          });
          this.RankrowsData = ActoBusinessObjList;
        });

        let OfficialGazettObjList = [];
        let ChangeOfficialGazettObj = res[0].filter(x => x.TableName === 'OFFICIAL_GAZETTE');
        ChangeOfficialGazettObj.forEach(element => {
          this.OfficialGazetteRows.forEach(element2 => {
            if (element.ObjectID === element2.data.OfficialGazetteID) {
              element2.data.IsChanged = true;
            }
            OfficialGazettObjList.push(element2.data);
          });
          this.OfficialGazetteRows = OfficialGazettObjList;
        });

        let CorporatePositionObjList = [];
        let ChangeCorporatePositionObj = res[0].filter(x => x.TableName === 'CORPORATE_POSITION');
        ChangeCorporatePositionObj.forEach(element => {
          this.ManagerCorporatePositionRows.forEach(element2 => {
            if (element.ObjectID === element2.data.CorporatePositionID) {
              element2.data.IsChanged = true;
            }
            CorporatePositionObjList.push(element2.data);
          });
          this.ManagerCorporatePositionRows = CorporatePositionObjList;
        });
        let ChangeCorporateObj = res[0].filter(x => x.TableName === 'CORPORATE');
        ChangeCorporateObj.forEach(element => {
          if (element.ColumnName == 'CORPORATE_NAME') {
            this.CorporateNameChangeFlag = true;
          } else if (element.ColumnName == 'IDENTITY_NO') {
            this.IdentityNoChangeFlag = true;
          } else if (element.ColumnName == 'REGISTER_REFERENCE_ID') {
            this.RegisterReferenceIdChangeFlag = true;
          } else if (element.ColumnName == 'REGISTER_NO') {
            this.RegisterNoChangeFlag = true;
          } else if (element.ColumnName == 'ACTIVITY_START_DATE') {
            this.ActivityStartDateChangeFlag = true;
          } else if (element.ColumnName == 'EMPLOYE_COUNT') {
            this.EmployeCountChangeFlag = true;
          } else if (element.ColumnName == 'NOTE') {
            this.NoteChangeFlag = true;
          } else if (element.ColumnName == 'GRADE_REQUEST') {
            this.GradeRequestChangeFlag = true;
          } else if (element.ColumnName == 'OLD_NAME') {
            this.OldNameChangeFlag = true;
          } else if (element.ColumnName == 'ACTIVITY_FIELD') {
            this.ActivityFieldChangeFlag = true;
          } else if (element.ColumnName == 'CITY_ID') {
            this.CorporateCityIDChangeFlag = true;
          } else if (element.ColumnName == 'REQUEST_DATE') {
            this.RequestDateChangeFlag = true;
          } else if (element.ColumnName == 'IS_LIMITED_RISPONSIBILITY') {
            this.IsLimitedRisponsibilityChangeFlag = true;
          } else if (element.ColumnName == 'COMPANY_AGENT_NAME') {
            this.CompanyAgentNameChangeFlag = true;
          } else if (element.ColumnName == 'COMPANY_AGENT_TEL') {
            this.CompanyAgentTelChangeFlag = true;
          } else if (element.ColumnName == 'MANAGERS_COUNT') {
            this.ManagersCountChangeFlag = true;
          } else if (element.ColumnName == 'SIGNED_RIGHT_HOLDERS') {
            this.SignedRightHoldersChangeFlag = true;
          } else if (element.ColumnName == 'MANAGERS_MINUTES_DATE') {
            this.ManagersMinutesDateChangeFlag = true;
          } else if (element.ColumnName == 'IS_LIMITED_MANAGERS_END_DATE') {
            this.IsLimitedManagersEndDateChangeFlag = true;
          } else if (element.ColumnName == 'MANAGERS_END_DATE') {
            this.ManagersEndDateChangeFlag = true;
          } else if (element.ColumnName == 'COMPANY_AGENT_EMAIL') {
            this.CompanyAgentEmailChangeFlag = true;
          } else if (element.ColumnName == 'COMPANY_AGENT_ACTOR_ID') {
            this.CompanyAgentActorIDChangeFlag = true;
          }
        });
        let ChangeActorObj = res[0].filter(x => x.TableName === 'ACTOR');
        ChangeActorObj.forEach(element => {
          if (element.ColumnName == 'ECONOMIC_CODE') {
            this.EconomicCodeChangeFlag = true;
          } else if (element.ColumnName == 'ADDRESS') {
            this.AddressChangeFlag = true;
          } else if (element.ColumnName == 'POST_CODE') {
            this.PostCodeChangeFlag = true;
          } else if (element.ColumnName == 'FAX') {
            this.FaxChangeFlag = true;
          } else if (element.ColumnName == 'WEB') {
            this.WebChangeFlag = true;
          } else if (element.ColumnName == 'EMAIL') {
            this.EmailChangeFlag = true;
          } else if (element.ColumnName == 'CELL') {
            this.CellNoChangeFlag = true;
          } else if (element.ColumnName == 'NOTE') {
            this.ActorNoteChangeFlag = true;
          }
        });
        let ChangeActorRoleObj = res[0].filter(x => x.TableName === 'ACTOR_ROLE');
        ChangeActorRoleObj.forEach(element => {
          if (element.ColumnName == 'IS_CONTRACTOR') {
            this.IsContractorChangeFlag = true;
          } else if (element.ColumnName == 'IS_CONSULT') {
            this.IsConsultChangeFlag = true;
          } else if (element.ColumnName == 'IS_PRODUCER') {
            this.IsProducerChangeFlag = true;
          } else if (element.ColumnName == 'IS_SUPPLIER') {
            this.IsSupplierChangeFlag = true;
          } else if (element.ColumnName == 'IS_INTERNAL_BUILDERS') {
            this.IsInternalBuildersChangeFlag = true;
          } else if (element.ColumnName == 'IS_EXTERNAL_BUILDERS') {
            this.IsExternalBuildersChangeFlag = true;
          }
        });
        let ChangeActorPropertyObj = res[0].filter(x => x.TableName === 'ACTOR_PROPERTY');
        ChangeActorPropertyObj.forEach(element => {
          if (element.ColumnName == 'SUBJECT') {
            this.SubjectChangeFlag = true;
          } else if (element.ColumnName == 'HAVE_HSE') {
            this.HaveHSEChangeFlag = true;
          } else if (element.ColumnName == 'HAVE_BAIL') {
            this.HaveBailChangeFlag = true;
          } else if (element.ColumnName == 'HAVE_CERTIFICATE') {
            this.HaveCertificateChangeFlag = true;
          }
        });
      } else {
        this.needShowColor = false;
      }
    });
  }

  ShowActor() {
    this.isClicked = true;
    this.PopUpType = 'actor-note';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.PercentWidth = 72;
    this.MinHeightPixel = 500;
    this.MainMaxwidthPixel = 2000;
    this.HeightPercentWithMaxBtn = 72;
    this.startLeftPosition = 210;
    this.startTopPosition = 10;
    this.PopupParam =
    {
      ActorNote: this.ActorNote,
      Note: this.Note,
      IsEditable: this.IsEditable,
      IsDisplay: this.IsDisplay,
      IsEditableForType3: this.IsEditableForType3


    }

  }

  OnshowClick() {
    this.PopUpType = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.isClicked = true;
    if (this.ActorId) {
      this.PopupParam = {
        HeaderName: 'مشاهده',
        RadioItems: [
          {
            title: 'مشاهده ریز اصطلاحات',
            type: 1,
            checked: true,
          },
          {
            title: 'تاریخچه گردش',
            type: 2,
          },
          {
            title: 'موارد موثر در کسر ظرفیت کل',
            type: 3,
          }
        ]
      };
    }
    if (!this.ActorId) {
      this.PopupParam = {
        HeaderName: 'مشاهده',
        RadioItems: [
          {
            title: 'مشاهده ریز اصطلاحات',
            type: 1,
            checked: true,
          },
          {
            title: 'موارد موثر در کسر ظرفیت کل',
            type: 3,
          }
        ]
      };
    }


  }

  onCellClickedd(event) {
  }
}

