import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { forkJoin } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { isNullOrUndefined, isUndefined } from 'util';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/lib/custom-checkbox.model';
import { environment } from 'src/environments/environment';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
// tslint:disable-next-line: max-line-length
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-pay-details',
  templateUrl: './contract-pay-details.component.html',
  styleUrls: ['./contract-pay-details.component.css']
})
export class ContractPayDetailsComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  IsEditTaxValue = true;
  MessageBoxResult = false;
  ActorName = '';
  PlaceActorName = '';
  columnDef1;
  defaultColDef1;
  rowData1: any;
  columnDef2;
  defaultColDef2;
  selectedContractID = -1;
  rowData2: any;
  btnclicked = false;
  ContractDetails;
  ContractPayStartDate;
  ContractPayEndDate;
  ContractPayDate;
  ContractSubLetter;
  ContractPayNo;
  ContractOperationName;
  ContractPayTechnicalCode;
  IsDisable;
  IsFinYearDisable = false;
  FinYearSet = [];
  ContractPayTypeSet = [];
  selectedFinYearObj;
  selectedContractPayTypeObj;
  Note;
  gridApi;
  ContractPayItemList = [];
  type;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ChangeDetection = false;
  ProductIDs = [];
  ContractOperationID;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  Excel_Header_Param: { colDef2: any };
  ParamObj;
  HaveSave = false;
  DisplayControlls = true;
  HaveDelete = false;
  EditModeInit = false;
  ArchiveBtnText;
  GridBoxHeight = 62;
  HaveLoadExcel = true;
  IsEditable = true;
  dgCPHeight = 90;
  ReadyToConfirm;
  HaveConfirm = false;
  ConfirmStatus = [];
  IsEndFlow;
  BtnClickedName;
  WorkFlowID;
  WorkflowTypeName;
  WorkflowTypeCode;
  WorkflowObjectCode;
  ObjectNo;
  ObjectID;
  RegionCode;
  ContractPayID;
  CostFactorID;
  ContractTypeCode;
  IsDown = false;
  MinusCoef = 1;
  CartableUserID: any;
  CurrWorkFlow: any;
  // RFC 52262
  ShowWorkflowButtons = true;
  ISSendAndConfirm = true;
  ISDisabledConfirmAndReturnBtn = true;
  CheckRegionWritable = true;
  HaveAlertToContractPayDate = false;

  IsEditConfirm = true;
  ModuleViewTypeCode;
  IsContractRemainStartWF;
  OrginalModuleCode;
  WorkFlowTransitionID;
  PercentWidth;
  OverMainMinwidthPixel;
  MainMaxwidthPixel;
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  btnConfirmAndReturnName = 'عدم تاييد و بازکشت';
  IsDisableWorkflow = true;
  btnConfirmName = 'تایید';
  btnConfirmIcon = 'ok';
  ModuleCode;
  colspan = 2;
  Adjustment = false;
  AdjustmentTypeItems;
  ContractTotalSize = 50;
  ContractSize = 87;
  AdjustmentTypeParams = {
    bindLabelProp: 'AdjustmentTypeName',
    bindValueProp: 'AdjustmentTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'order-type',
  };
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
  CostContractID: any;
  sumFinalAmountStr = '0';
  sumFinalAmountt = '0';
  sumContractPayItemAmountStr = '0';
  ShowWfButton = true;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  IsConfirm = 0;
  ShowConfimChekBox = false;
  ContractPayPopupParam = {
    SelectedContractID: -1,
    ContractOperationID: 0,
    SelectedCostFactorID: -1,
    SelectedContractPayID: -1,
    ContractPayNo: 0,
    SelectedCPCostFactorID: -1,
    PriceListPatternID: -1,
    CostListFinYearCode: -1,
    PriceListTypeCode: -1,
    PriceListFineYearName: '',
    PriceListTypeName: '',
    IsViewable: false,
    Mode: '',
    ContractNo: '',
    ModuleViewTypeCode: null,
    FinYearCode: 0,
    ContractCode: 0,
    ContractorName: '',
    LetterDatePersian: '',
    Subject: '',
    LetterNo: '',
    ContractAmount: '',
    WorkFlowID: null,
    RegionCode: null,
    ReadyToConfirm: null,
    ContractTypeCode: -1,
    SelectedRow: null,
    ModuleCode: -1,
    HeaderName: '',
    selectedRow: null,
    GridHeightInTab: 0,
    PanelHeightInTab: 0,
    HaveSave: false,
    IsEditable: false,
    ProductRequestID: null,
    IsReadOnly: false, // RFC 52262
    ContractPayDate: '',
    ContractTypeName: '',
    WorkFlowInstanceId: -1,
    ParentModuleCode: -1,
    workflowtypeStatus: -1,
    ContractPayTechnicalCode: '',
    IsTabVisible: false,
    ContractPayCostFactorID: 0
  };
  OverPixelWidth: number;
  HaveMaxBtn = false;
  ISIRVersion = false;
  IsVolumetric = false;
  ProductTypeList = [];
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
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1, CanGrow: true },
        { HeaderCaption: 'مبلغ', HeaderName: 'Price', width: 53, }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, },
        { HeaderCaption: 'مبلغ', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 25
    }
  };
  ProdcutTypeCode: any;
  HaveAlertToFinance = false;
  MaxEndDate;
  MinStartDate;
  ContractPayItemLists = [];
  IsAdmin;
  ShowReportsSign = false;
  IsTaxValue: any;
  IsWFShow: any;
  WorkListDetailRows: any;
  CheckValidate = false;
  MiladiMaxEndDate;
  MiladiMinStartDate;
  CanDateChange = false;
  IsMultiInvoice = false;
  ///////////////// بانک /////////////////
  NgSelectBankParams = {
    bindLabelProp: 'BankName',
    bindValueProp: 'BankID',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'Bank',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'BankID', width: 65, MinTermLenght: 1, SearchOption: 'BankID' },
        { HeaderCaption: 'کد بانک', HeaderName: 'BankCode', width: 45, MinTermLenght: 1, SearchOption: 'BankCode' },
        { HeaderCaption: 'نام بانک', HeaderName: 'BankName', width: 63, MinTermLenght: 3, SearchOption: 'BankName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 65, },
        { HeaderCaption: 'کد بانک', width: 45, },
        { HeaderCaption: 'نام بانک', width: 63, }],
      HaveItemNo: true,
      ItemNoWidth: 18
    }
  };
  BankPageCount;
  BankItems: any;
  BankTotalItemCount;
  EditableBankInf = false;

  ///////////////// شعبه /////////////////
  NgSelectBranchParams = {
    bindLabelProp: 'BranchName',
    bindValueProp: 'BranchID',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'Branch',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'BranchID', width: 65, MinTermLenght: 1, SearchOption: 'BranchID' },
        { HeaderCaption: 'کد شعبه', HeaderName: 'CorporateCode', width: 45, MinTermLenght: 1, SearchOption: 'CorporateCode' },
        { HeaderCaption: 'نام شعبه', HeaderName: 'BranchName', width: 63, MinTermLenght: 3, SearchOption: 'BranchName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 65, },
        { HeaderCaption: 'کد شعبه', width: 45, },
        { HeaderCaption: 'نام شعبه', width: 63, }],
      HaveItemNo: true,
      ItemNoWidth: 18
    }
  };
  BranchPageCount;
  BranchItems: any;
  BranchTotalItemCount;
  AccNo;
  CityID;
  ShebaNo;
  ActorBankAccID;
  ContractorID: number;
  IsCumulative = false;
  IsContractorAgent = false;
  IsAdminToolsModule: boolean;
  IsEditableContractPayItemAmountCol = true;
  IsEditableProductNameCol = true;
  IsEditableProductTypeCol = true;
  HaveModuleViewTypeSave = false;
  EditItemAmount = true;
  DisableForMultiInvoice = true; // 62513
  /////////////////////////////
  CanEditPenalty = false; // اصلاح مبلغ جریمه
  hidePenalty = false;
  SumPenaltyAmount = 0; // مجموع مبلغ جریمه
  SumPenaltyAmountStr = '';
  Coeforvalue;
  DurationPenaltyDay;
  PenaltyTextLableStr = 'مبلغ کل جریمه:';
  PenaltyTextLable = 'روز مبلغ : ';
  CoefValue;
  ValValue;
  ShowPenaltyDiv = false;
  PenaltyDuration;
  NoteSize = 50;
  NoteColspan = 2;
  HasMainContractor = false;
  MainContractorName = '';
  NoteInputWidth = 87;
  IsGreenSpace = false;
  IsProgressPercentColEditable = false;
  oldContractPayStartDate = null;
  oldContractPayEndDate = null;
  DifferenceAmountStr = '';
  DifferenceAmount: number = null;
  DifferenceNote = '';
  EditableItemQty = false;
  ShowSaveBtn = false;
  SumDeductionAmount: number = 0;

  constructor(private router: Router,
    private contractpaydetail: ContractPayDetailsService,
    private FinYear: FinYearService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService,
    private route: ActivatedRoute,
    private RefreshBankItems: RefreshServices,
    private CommonServicee: CommonServices,
    private Common: CommonService,
    private ProductRequest: ProductRequestService,
    private Report: ReportService,
    private ContractList: ContractListService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });

    this.ProductTypeList = [{ ProductTypeCode: '1', ProductTypeName: 'کالا' },
    { ProductTypeCode: '2', ProductTypeName: 'خدمت' }];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;
    this.ISIRVersion = environment.IsExternal;
    if (this.PopupParam) {
      this.selectedContractID = this.PopupParam.SelectedContractID;
      this.IsWFShow = this.PopupParam.IsWFShow;
      this.WorkListDetailRows = this.PopupParam.rows;
      if (this.PopupParam.WorkFlowID) {
        this.ModuleCode = 2516;
      }
      if (this.PopupParam.ShowSendBtn === 'YES') {
        this.ShowWfButton = false;
      }
      this.DisableForMultiInvoice = this.PopupParam.ModuleViewTypeCode === 100000 ? false : true;
      if (this.PopupParam.RegionCode == 200 && this.PopupParam.Mode === 'InsertMode') {
        this.HaveAlertToContractPayDate = true;
        this.GridBoxHeight = 53;
      }
    }
    forkJoin([
      this.User.CheckAdmin(),
      this.contractpaydetail.GetcostCenterActorName(
        (this.PopupParam.SelectedCostFactorID ? this.PopupParam.SelectedCostFactorID : 0),
        (this.PopupParam.SelectedContractID ? this.PopupParam.SelectedContractID : 0)),
      this.contractpaydetail.GetSubCostCenterNameBycntractCostFactorID(
        (this.PopupParam.SelectedCostFactorID ? this.PopupParam.SelectedCostFactorID : 0),
        (this.PopupParam.SelectedContractID ? this.PopupParam.SelectedContractID : 0))
    ]).subscribe(res => {
      this.IsAdmin = res[0];
      this.ActorName = res[1];
      this.PlaceActorName = res[2];
    });

    this.CheckRegionWritable = this.PopupParam.IsReadOnly; // RFC 52262
    this.CostFactorID = this.PopupParam.SelectedCPCostFactorID;
    this.ContractTypeCode = this.PopupParam.ContractTypeCode;
    this.ContractOperationID = this.PopupParam.ContractOperationID;
    this.contractpaydetail.GetSumContractCoef(this.PopupParam.SelectedContractID).subscribe(
      res => {
        if (res) {
          this.MinusCoef = res;
        }
      }
    );

    if (this.PopupParam.IsViewable) {
      this.HaveSave = false;
      this.DisplayControlls = false;
      this.HaveDelete = false;
      this.dgCPHeight = 90;
      this.HaveLoadExcel = false;
      this.IsEditable = false;
      this.HaveConfirm = false;
      this.ArchiveBtnText = 'مشاهده مستندات فنی';

    } else {
      this.IsEditable = !(this.ContractTypeCode === 27);
      this.ArchiveList.HasArchiveAccess(2516).subscribe(res => {
        this.ArchiveBtnText = res ? 'مستندات فنی' : 'مشاهده مستندات فنی';
      });
    }
    this.ContractList.GetLastContractOrderList(this.PopupParam.SelectedContractID).subscribe(res => {
      this.MaxEndDate = res.PersianEndDate;
      this.MinStartDate = res.PersianStartDate;
      this.MiladiMaxEndDate = res.ShortEndDate;
      this.MiladiMinStartDate = res.ShortStartDate;
      this.sumFinalAmountt = res.FinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve) => {
      this.contractpaydetail.GetContractCondition(this.PopupParam.SelectedContractID, 2516).subscribe(
        res => {
          this.IsVolumetric = res.IsVolumetric;
          this.IsTaxValue = res.IsTaxValue;
          this.IsCumulative = res.IsCumulative;
          this.ColumnDefinition(res.IsMultiInvoice, res.IsCumulative);
          this.IsMultiInvoice = res.IsMultiInvoice;
          this.ContractorID = res.ContractorID;
          this.IsGreenSpace = res.IsGreenSpace;
          this.Common.GetActorBankAccList(this.ContractorID).subscribe((ress: any[]) => {
            if (ress && ress.length > 0) {
              this.OpenBank();
              this.NgSelectBankParams.selectedObject = ress[0].BankID;
              this.OpenBranch();
              this.NgSelectBranchParams.selectedObject = ress[0].BranchID;
              this.ActorBankAccID = ress[0].ActorBankAccID;
              this.AccNo = ress[0].AccNo;
              this.CityID = ress[0].CityID;
              this.ShebaNo = ress[0].ShebaNo;
            } else {
              this.NgSelectBankParams.selectedObject = null;
              this.NgSelectBranchParams.selectedObject = null;
              this.AccNo = null;
              this.ActorBankAccID = null;
              this.CityID = null;
              this.ShebaNo = null;
            }
          });
          resolve(true);
        }
      );
    }).then(() => {
      if (this.PopupParam.Mode === 'InsertMode') {
        this.InsertModeNgInit();
        return;
      }
      if (this.PopupParam.Mode === 'EditMode') {
        this.EditModeNgInit();
        return;
      }
    });
  }

  ColumnDefinition(IsMultiInvoice, IsCumulative) {
    this.columnDef1 = [
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
        editable: this.IsEditableProductTypeCol,
        width: 120,
        resizable: true
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
            params.data.ScaleName = params.newValue.ScaleName;
            params.data.PersianStartDate = params.newValue.PersianStartDate;
            params.data.PersianEndDate = params.newValue.PersianEndDate;
            params.data.ShortStartDate = params.newValue.ShortStartDate;
            params.data.ShortEndDate = params.newValue.ShortEndDate;
            params.data.Price = params.newValue.Price;
            this.EntityColumnDefinition(params.data.ProductID, params, null, true);
            return true;
          } else {
            params.data.ProductCodeName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: this.IsEditableProductNameCol,
        resizable: true,
        width: 370,
      },
      {
        headerName: 'شماره فاکتور',
        field: 'ContractPayItemTechCode',
        editable: () => {
          return (this.DisplayControlls && this.IsMultiInvoice);
        },
        hide: !IsMultiInvoice,
        HaveThousand: false,
        cellEditorFramework: NumberInputComponentComponent,
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
            params.data.ContractPayItemTechCode = params.newValue;
            return true;
          } else {
            params.data.ContractPayItemTechCode = '';
            return false;
          }
        },
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ فاکتور',
        field: 'PersianContractPayItemDate',
        editable: () => {
          return (this.DisplayControlls && this.IsMultiInvoice);
        },
        hide: !IsMultiInvoice,
        width: 100,
        resizable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianContractPayItemDate',
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
            params.data.ShortContractPayItemDate = params.newValue.MDate;
            params.data.PersianContractPayItemDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortContractPayItemDate = null;
            params.data.PersianContractPayItemDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
        editable: this.IsVolumetric,
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
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: this.IsVolumetric,
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
        headerName: 'واحد',
        field: 'ScaleName',
        width: 100,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'تعداد برآورد',
        field: 'Qty',
        width: 100,
        HaveThousand: true,
        resizable: true,
        editable: (event) => {
          return false;
        }
      },
      {
        headerName: 'مبلغ واحد برآورد',
        field: 'Amount',
        HaveThousand: true,
        width: 150,
        resizable: true,
      },
      {
        headerName: 'مبلغ برآورد',
        field: 'FinalAmount',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'تعداد قبلی',
        field: 'BeforeQty',
        width: 100,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ قبلی',
        field: 'BeforeAmount',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ پیمانکار',
        field: 'RequestedAmount',
        width: 150,
        resizable: true,
        editable: this.IsContractorAgent || this.IsAdminToolsModule,
        hide: !(this.RegionCode > 0 && this.RegionCode < 23),
        cellEditorParams: { IsFloat: true, HaveNegative: true, },
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RequestedAmount;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue !== params.oldValue) {
              params.data.RequestedAmount = params.newValue;
              params.data.ContractPayItemAmount = params.newValue;
              if (this.PopupParam.Mode === 'InsertMode') {
                params.data.ContractPayItemAmountCOEF = params.newValue;
              }  // 65355
              if (params.data.IsTaxValue) {
                // tslint:disable-next-line: radix
                params.data.TaxValue = Math.round(0.09 * (parseInt(params.data.RequestedAmount) - (params.data.Discount ? parseInt(params.data.Discount) : 0)));
              } else {
                params.data.TaxValue = 0;
              }
              return true;
            }
          } else {
            params.data.RequestedAmount = null;
            params.data.ContractPayItemAmount = null;
            params.data.IsTaxValue = null;
            return false;
          }
        },
      },
      {
        headerName: 'تعداد فعلی',
        field: 'ContractPayItemQty',
        width: 150,
        resizable: true,
        editable: (event) => {
          if (this.ModuleCode === 2875) {
            return true; // 65074
          } else if (this.EditableItemQty) {
            return true;
          }
          else if ((this.IsVolumetric ? true : event.data.Qty > 1) && this.DisplayControlls && !this.IsContractorAgent && this.EditItemAmount) {
            return true; // 64585
          } else {
            return false;
          }
        },
        cellEditorParams: { IsFloat: true, },
        HaveThousand: true,
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
        headerName: 'مبلغ واحد فعلی',
        field: 'ContractPayItemUnitAmount',
        width: 150,
        resizable: true,
        editable: this.PopupParam.ModuleViewTypeCode === 100000 ? true : false,
        HaveThousand: true,
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
        headerName: 'مبلغ فعلی',
        field: 'ContractPayItemAmount',
        width: 150,
        resizable: true,
        editable: (event) => {
          if (event.data.Qty <= 1) {
            return true;
          } else {
            return false;
          }
        },
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
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
        headerName: 'مبلغ تخفیف',
        field: 'Discount',
        width: 150,
        resizable: true,
        editable: (event) => {
          if (this.CanEditPenalty || (this.IsAdminToolsModule && this.PopupParam.Mode === 'EditMode')) {
            return true;
          } else {
            return false;
          }
        },

        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
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
        headerName: 'مبلغ فعلی با ضرایب',
        field: 'ContractPayItemAmountCOEF',
        width: 150,
        resizable: true,
        HaveThousand: true,
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
        headerName: 'ارزش افزوده',
        field: 'TaxValue',
        width: 150,
        resizable: true,
        editable: () => {
          if (this.IsEditTaxValue) {
            return true;
          } else {
            return false;
          }
        },
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          HaveNegative: true,
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
        headerName: 'مبلغ نهایی',
        field: 'ContractPayItemAmountFinal',
        width: 150,
        resizable: true,
        editable: false,
        HaveThousand: true,
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
      // {
      //   headerName: 'مبلغ تجمیعی',
      //   field: 'CumultiveAmount',
      //   width: 150,
      //   HaveThousand: true,
      //   resizable: true,
      // },
      {
        headerName: 'مبلغ قبلی با ضرایب',
        field: 'BeforeAmountCOEF',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ تجمیعی با ضرایب',
        field: 'CumultiveAmountCOEF',
        width: 150,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'درصد پیشرفت',
        field: 'ProgressPercent',
        width: 100,
        resizable: true,
        editable: this.IsProgressPercentColEditable,
        HaveThousand: false,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, MaxLength: 4, FloatMaxLength: 2 },
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
        headerName: 'مبلغ کسر کار',
        field: 'DeductionAmount',
        width: 100,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'درصد جریمه',
        field: 'PenaltyPercentage',
        width: 90,
        hide: this.hidePenalty,
        resizable: true,
        editable: this.CanEditPenalty || (this.IsAdminToolsModule && this.PopupParam.Mode === 'EditMode'),
        HaveThousand: false,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, MaxLength: 4, FloatMaxLength: 2 },
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
        headerName: 'مبلغ جریمه',
        field: 'PenaltyAmount',
        width: 150,
        hide: this.hidePenalty,
        resizable: true,
        editable: this.CanEditPenalty || (this.IsAdminToolsModule && this.PopupParam.Mode === 'EditMode'),
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
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
            params.data.PenaltyAmount = params.newValue;
            if (params.data.ContractPayItemAmountCOEF && params.data.DeductionAmount) {
              // tslint:disable-next-line: radix
              params.data.PenaltyPercentage = !isNullOrUndefined(params.data.PenaltyAmount) && parseInt(params.data.PenaltyAmount) > 0
                && !isNaN(params.data.PenaltyAmount) && params.data.PenaltyAmount !== 'NaN'
                // tslint:disable-next-line: radix
                ? (this.IsGreenSpace ?
                  // tslint:disable-next-line: radix
                  parseInt(params.data.DeductionAmount) / parseInt(params.data.PenaltyAmount)
                  // tslint:disable-next-line: radix
                  : (params.data.ContractPayItemAmountCOEF - parseInt(params.data.DeductionAmount)))
                // tslint:disable-next-line: radix
                : null;
              // tslint:disable-next-line: radix
              params.data.CumultiveAmount = (parseInt(params.data.BeforeAmount) + parseInt(params.data.ContractPayItemAmount))
                // tslint:disable-next-line: radix
                - parseInt(params.data.PenaltyAmount);
            }
            return true;

          } else {
            params.data.PenaltyAmount = null;
            return false;
          }
        },
      },
    ];

    const Item = {
      headerName: 'مبلغ تجمیعی',
      field: 'CumultiveAmount',
      width: 150,
      HaveThousand: true,
      resizable: true,
      editable: () => {
        return (this.DisplayControlls && IsCumulative);
      },
    };

    //  let Inedex = 20;
    let Index = this.columnDef1.findIndex(x => x.field === 'BeforeAmountCOEF');
    if (IsCumulative) {
      Index = this.columnDef1.findIndex(x => x.field === 'ContractPayItemQty');
    }

    this.columnDef1.splice(Index, 0, Item);

  }

  InsertModeNgInit() {
    if (this.PopupParam.ContractOperationID === 4) {
      this.Adjustment = true;
      this.colspan = 1;
      this.ContractTotalSize = 25;
      this.ContractSize = 74;
      this.contractpaydetail.GetAdjustmentType().subscribe(res => {
        this.AdjustmentTypeItems = res;

      });
    }

    this.HaveConfirm = false;
    if (this.PopupParam) {
      this.RegionCode = this.PopupParam.RegionCode;
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode; // 62257
    }
    this.User.GetModulOPByUser(2516).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
          case 16:
            this.HaveSave = true;
            break;
          case 6:
            this.HaveDelete = true;
            break;

          default:
            break;
        }
      });
    });

    forkJoin([
      this.contractpaydetail.GetContractDetails(this.PopupParam.SelectedContractID),
      this.contractpaydetail.GetMaxContractPayNo(this.PopupParam.SelectedCostFactorID),
      this.ProductRequest.GetCurrentDate()
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
      this.Note = this.ContractSubLetter;
      if (!isNullOrUndefined(this.ContractDetails.MainContractorName)) {
        this.HasMainContractor = true;
        this.NoteColspan = 1;
        this.MainContractorName = this.ContractDetails.MainContractorName;
        this.NoteInputWidth = 74;
        this.NoteSize = 25;
      }
      this.ContractPayNo = res[1];
      //  this.ContractPayTechnicalCode = this.ContractDetails.ContractCode * 10000 + res[1];
      this.ContractPayStartDate = this.ContractDetails.FromContractDateString;
      this.ContractPayEndDate = this.ContractDetails.ToContractDateString;
      this.oldContractPayStartDate = this.ContractDetails.FromContractDateString;
      this.oldContractPayEndDate = this.ContractDetails.ToContractDateString;
      this.CanDateChange = false;
      this.ContractPayDate = res[2];
      this.IsDown = true;
    });

    this.contractpaydetail.GetContractPayType().subscribe(res => {
      this.ContractPayTypeSet = res;
      this.selectedContractPayTypeObj = res[0].ContractPayTypeCode;
    });
    this.FinYear.GetFinYearList().subscribe(res => {
      this.FinYearSet = res;
      //    this.selectedFinYearObj = res[0].FinYearCode;
    });
    this.contractpaydetail.GetContractOperationName(this.ContractOperationID).subscribe(res => {
      this.ContractOperationName = res;
    });
    new Promise((StartedWFResolve, reject) => { // RFC 52262
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  EditModeNgInit() {
    this.contractpaydetail.GetSumOfDeductionAmount(this.CostFactorID).subscribe(res => {
      this.SumDeductionAmount =res;
     });
    this.EditModeInit = true;
    this.IsFinYearDisable = true;
    this.IsDisableWorkflow = !this.PopupParam.IsViewable ? false : true; // RFC 52262
    this.RegionCode = this.PopupParam.RegionCode;
    this.ShowReportsSign = this.PopupParam.ShowReportsSign ? this.PopupParam.ShowReportsSign : false;
    if (!this.PopupParam.IsViewable) {// مشاهده درخواست پرداخت نبود
      this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
      this.WorkFlowID = this.PopupParam.WorkFlowID;
      this.ReadyToConfirm = this.PopupParam.ReadyToConfirm;
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
      if (this.WorkFlowID) {
        this.IsEndFlow = this.PopupParam.IsEnd === 1;
        this.WorkflowTypeName = this.PopupParam.WorkflowTypeName;
        this.WorkflowTypeCode = this.PopupParam.WorkflowTypeCode;
        this.WorkflowObjectCode = this.PopupParam.WorkflowObjectCode;
        this.ObjectNo = this.PopupParam.ObjectNo;
        this.ObjectID = this.PopupParam.ObjectID;
        this.CartableUserID = this.PopupParam.CartableUserID;
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
        // this.HaveConfirm = true;
      }
      this.ShowConfimChekBox = this.ModuleCode === 2875 ? true : false;
      this.User.GetModulOPByUser(2516).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
            case 16:
              this.HaveSave = true;
              break;
            case 6:
              this.HaveDelete = true;
              break;

            case 21:
              this.ConfirmStatus.push(21);
              if (!this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
                this.btnConfirmName = 'تایید';
                this.btnConfirmIcon = 'ok';
                this.HaveConfirm = true;
              }
              break;

            case 22:
              this.ConfirmStatus.push(22);
              if (!this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
                this.btnConfirmName = 'عدم تایید';
                this.btnConfirmIcon = 'cancel';
                this.HaveConfirm = true;
              }
              break;

            case 28:
              this.ConfirmStatus.push(28);
              if (this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
                this.btnConfirmName = 'بازگشت از تایید نهایی';
                this.btnConfirmIcon = 'cancel';
                this.HaveConfirm = true;
              }
              break;

            case 27:
              this.ConfirmStatus.push(27);
              if (this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
                this.btnConfirmName = 'تایید نهایی';
                this.btnConfirmIcon = 'ok';
                this.HaveConfirm = true;
              }
              break;

            default:
              break;
          }
        });
      });
      if (this.btnConfirmName === 'تایید نهایی') {
        this.ShowReportsSign = true;
      }
    }
    let sumFinalAmount = 0;
    let sumContractPayItemAmount = 0;
    this.contractpaydetail.GetContractPay(this.CostFactorID, -1).subscribe(res => {
      if (res.ContractOperationId === 4) {
        this.Adjustment = true;
        this.colspan = 1;
        this.ContractTotalSize = 25;
        this.ContractSize = 74;
        this.contractpaydetail.GetAdjustmentType().subscribe(ress => {
          this.AdjustmentTypeItems = ress;

        });
        this.AdjustmentTypeParams.selectedObject = res.AdjustmentTypeCode ? res.AdjustmentTypeCode : null;
      }


      this.ContractDetails = res;
      this.ContractPayID = this.ContractDetails.ContractPayId;
      this.CostContractID = this.ContractDetails.CostContractId;
      this.ContractSubLetter = this.ContractDetails.ParentObjectStr;
      this.Note = this.ContractDetails.Note;
      if (!isNullOrUndefined(this.ContractDetails.MainContractorName)) {
        this.HasMainContractor = true;
        this.NoteColspan = 1;
        this.MainContractorName = this.ContractDetails.MainContractorName;
        this.NoteInputWidth = 74;
        this.NoteSize = 25;
      }
      this.ContractPayNo = this.ContractDetails.ContractPayNo;
      this.ContractPayTechnicalCode = this.ContractDetails.ContractPayTechnicalCode;
      this.ContractPayStartDate = this.ContractDetails.ShortStartDate;
      this.ContractPayEndDate = this.ContractDetails.ShortEndDate;
      this.oldContractPayStartDate = this.ContractDetails.ShortStartDate;
      this.oldContractPayEndDate = this.ContractDetails.ShortEndDate;
      this.ContractPayDate = this.ContractDetails.ShortContractPayDate;
      this.selectedFinYearObj = this.ContractDetails.FinYearCode;
      this.selectedContractPayTypeObj = this.ContractDetails.ContractPayTypeCode;
      this.ContractOperationID = this.ContractDetails.ContractOperationId;
      this.IsConfirm = this.ContractDetails.IsConfirm;
      this.ContractPayItemList = this.ContractDetails.ContractPayItemViewList;
      this.DurationPenaltyDay = this.ContractDetails.DurationPenaltyDay;
      let SumPenaltyAmount = 0;
      this.ContractPayItemList.forEach(item => {
        item.ProgressPercent = item.ProgressPercent ? item.ProgressPercent : 0;
        item.PenaltyPercentage = item.PenaltyPercentage ? item.PenaltyPercentage : 0;
        // tslint:disable-next-line: radix
        item.ContractPayItemAmountFinal = item.TaxValue ? parseInt(item.ContractPayItemAmountCOEF) + parseInt(item.TaxValue)
          // tslint:disable-next-line: radix
          : parseInt(item.ContractPayItemAmountCOEF);
        sumFinalAmount = sumFinalAmount + item.ContractPayItemAmountFinal;
        sumContractPayItemAmount = sumContractPayItemAmount + item.ContractPayItemAmount;

        if (!this.IsVolumetric && item.Qty < 1) {
          item.ContractPayItemQty = null;
          item.Qty = null;
        } // 64644
        // tslint:disable-next-line:radix
        item.DeductionAmount = (item.ProgressPercent && item.ProgressPercent > 0 ?
          ((100 - (item.ProgressPercent)) / 100) * item.ContractPayItemAmountCOEF : 0).toFixed(2);
        // tslint:disable-next-line:radix
        item.CumultiveAmount = parseInt(item.BeforeAmount) + parseInt(item.ContractPayItemAmount) - parseInt(item.PenaltyPercentage);
        // tslint:disable-next-line: radix
        item.CumultiveAmountCOEF = parseInt(item.BeforeAmountCOEF) + parseInt(item.ContractPayItemAmountCOEF);
        // tslint:disable-next-line: radix
        item.PenaltyAmount = this.IsGreenSpace ? ((parseInt(item.PenaltyPercentage) / 100) * (parseInt(item.DeductionAmount))).toFixed(2)
          : ((item.PenaltyPercentage / 100) * (item.ContractPayItemAmountCOEF - item.DeductionAmount)).toFixed(2);
        if (item.PenaltyAmount && !isNaN(item.PenaltyAmount) && item.PenaltyAmount !== 'NaN'
          // tslint:disable-next-line: radix
          && !isNullOrUndefined(item.PenaltyAmount) && parseInt(item.PenaltyAmount) > 0) {
          // tslint:disable-next-line: radix
          SumPenaltyAmount = SumPenaltyAmount + parseInt(item.PenaltyAmount);
        }
        if (item.IsTaxValue) { // 62898
          if (item.TaxValue || item.TaxValue === 0) { // 63220
            item.TaxValue = item.TaxValue;
          } else {
            // tslint:disable-next-line: radix
            item.TaxValue = Math.round((item.ContractPayItemAmountCOEF && (parseInt(item.ContractPayItemAmountCOEF)) > 0
              // tslint:disable-next-line: radix
              ? (parseInt(item.ContractPayItemAmountCOEF) - (item.Discount ? parseInt(item.Discount) : 0))
              // tslint:disable-next-line: radix
              : (parseInt(item.ContractPayItemAmount) - (item.Discount ? parseInt(item.Discount) : 0))
            ) * 0.09);

          }
        }
        this.EntityColumnDefinition(null, null, item.EntityList, false);
        this.SetEntityDataInDataRow(item);
      });
      this.SumPenaltyAmountStr = this.ContractDetails.PenaltyAmount &&
        !isUndefined(this.ContractDetails.PenaltyAmount) &&
        this.ContractDetails.PenaltyAmount !== 0 ?
        res.PenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : (SumPenaltyAmount > 0 ? SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0');
      this.contractpaydetail.GetContractPayType().subscribe(ress => {
        this.ContractPayTypeSet = ress;
      });

      this.contractpaydetail.GetContractOperationName(this.ContractOperationID).subscribe(res1 => {
        this.ContractOperationName = res1;
      });

      this.FinYear.GetFinYearList().subscribe(res2 => {
        this.FinYearSet = res2;
      });

      this.sumFinalAmountStr =(sumFinalAmount - this.SumDeductionAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
      this.sumContractPayItemAmountStr = sumContractPayItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.IsDown = true;
    });
    
    new Promise((StartedWFResolve, reject) => { // RFC 52262
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
    this.ShowPenaltyDiv = true;
    this.contractpaydetail.GetPenaltyContractCoef(this.PopupParam.SelectedContractID).subscribe(res => {
      if (res && res.ContractCoefTypeCode !== null && res.ContractCoefTypeCode > 0) {
        this.PenaltyDuration = true;
        if (res.ContractCoefTypeCode === 24) {
          if ((res.Coef && !isNullOrUndefined(res.Coef))
            && (res.Value && !isNullOrUndefined(res.Value)) && this.CanEditPenalty) {
            this.PenaltyTextLableStr = res.ContractCoefTypeName.toString() + ' '
              + 'با ضریب' + ' ' + (res.Coef).toString() + ' '
              + ' به ازای ';
            this.Coeforvalue = true;
            this.hidePenalty = true;
          } else if ((res.Coef && !isNullOrUndefined(res.Coef))
            && (!res.Value || isNullOrUndefined(res.Value)) && this.CanEditPenalty) {
            this.PenaltyTextLableStr = res.ContractCoefTypeName.toString() + ' '
              + 'با ضریب' + ' ' + (res.Coef).toString() + ' '
              + ' به ازای ';
            this.Coeforvalue = true;
            this.hidePenalty = true;
          } else if ((res.Value && !isNullOrUndefined(res.Value))
            && (!res.Coef || isNullOrUndefined(res.Coef)) && this.CanEditPenalty) {
            this.PenaltyTextLableStr = res.ContractCoefTypeName.toString() + ' '
              + 'با مبلغ' + ' ' + (res.Value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' '
              + ' به ازای ';
            this.hidePenalty = true;
            this.Coeforvalue = true;
          } else {
            this.PenaltyTextLableStr = 'مبلغ کل جریمه: ';
            this.PenaltyTextLable = '';
            this.Coeforvalue = false;
          }
        } else {
          this.PenaltyTextLableStr = 'مبلغ کل جریمه: ';
          this.PenaltyTextLable = '';
          this.Coeforvalue = false;
        }
      } else {
        this.PenaltyDuration = false;
      }
    });
    this.contractpaydetail.GetDifferenceDeduction(this.CostFactorID).subscribe(result => {
      if (result && result.ContractPayDeductionID && result.ContractPayDeductionID > 0) {
        this.DifferenceAmount = result.DeductionAmount;
        this.DifferenceNote = result.Note;
        this.DifferenceAmountStr = result.DeductionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        this.DifferenceAmount = null;
        this.DifferenceNote = '';
        this.DifferenceAmountStr = '';
      }
    });
  }
  onDurationDayChange(event) {
    this.DurationPenaltyDay = event;
    this.contractpaydetail.GetPenaltyContractCoef(this.PopupParam.SelectedContractID).subscribe(res => {
      if (res && res.ContractCoefTypeCode !== null && res.ContractCoefTypeCode > 0) {
        if (res.ContractCoefTypeCode === 24) {
          if ((res.Coef && !isNullOrUndefined(res.Coef))
            && (res.Value && !isNullOrUndefined(res.Value))) {
            this.PenaltyTextLableStr = res.ContractCoefTypeName.toString() + ' '
              + 'با ضریب' + ' ' + (res.Coef).toString() + ' '
              + ' به ازای ';
            this.Coeforvalue = true;
            this.hidePenalty = true;
            // tslint:disable-next-line: radix
            this.SumPenaltyAmountStr = (((parseInt((this.sumFinalAmountt.toString()).replace(/,/g, '')) / 100) * res.Coef)
              * this.DurationPenaltyDay).toString();
          } else if ((res.Coef && !isNullOrUndefined(res.Coef))
            && (!res.Value || isNullOrUndefined(res.Value))) {
            this.PenaltyTextLableStr = res.ContractCoefTypeName.toString() + ' '
              + 'با ضریب' + ' ' + (res.Coef).toString() + ' '
              + ' به ازای ';
            this.Coeforvalue = true;
            this.hidePenalty = true;
            // tslint:disable-next-line: radix
            this.SumPenaltyAmountStr = (((parseInt((this.sumFinalAmountt.toString()).replace(/,/g, '')) / 100) * res.Coef)
              * this.DurationPenaltyDay).toString();
          } else if ((res.Value && !isNullOrUndefined(res.Value))
            && (!res.Coef || isNullOrUndefined(res.Coef))) {
            this.PenaltyTextLableStr = res.ContractCoefTypeName.toString() + ' '
              + 'با مبلغ' + ' ' + (res.Value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' '
              + ' به ازای ';
            this.Coeforvalue = true;
            this.hidePenalty = true;
            this.SumPenaltyAmountStr = (res.Value * this.DurationPenaltyDay).toString();
          } else {
            this.PenaltyTextLableStr = 'مبلغ کل جریمه: ';
            this.PenaltyTextLable = '';
            this.Coeforvalue = false;
          }
        } else {
          this.PenaltyTextLableStr = 'مبلغ کل جریمه: ';
          this.PenaltyTextLable = '';
          this.Coeforvalue = false;
        }
      }
    });
  }
  close() {
    if (this.IsWFShow && this.WorkListDetailRows) {
      this.FlowService.RunAfterActionMethod(this.WorkListDetailRows).subscribe();
    }
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  onChangeFinYearObj(newObj) {
    this.selectedFinYearObj = newObj;
    this.CheckValidate = false;
  }

  OnContractPayDateChange(ADate) {
    if (ADate.FullDate !== '' && !this.EditModeInit) {
      this.ContractPayDate = ADate.MDate;
      if (this.CanDateChange) {
        this.ShowMessageBoxWithYesNoBtn(' آیا می خواهید اقلام درخواست پرداخت نیز تغییر نماید؟');
        this.BtnClickedName = 'IsDateChange';
      } else {
        this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
          this.ContractPayNo,
          ADate.MDate,
          null,
          0,
          true,
          this.ContractOperationID,
          this.IsGreenSpace,
          this.ContractPayStartDate,
          this.ContractPayEndDate).subscribe(ress => {
            this.ContractPayItemList = ress;
            let SumPenaltyAmount = 0;
            this.ContractPayItemList.forEach(item => {

              item.ContractPayItemUnitAmount = item.Amount;
              if (item.IsTaxValue) {
                // tslint:disable-next-line: radix
                item.ContractPayItemAmountFinal = parseInt(item.ContractPayItemAmountCOEF) + parseInt(item.TaxValue);
              } else {
                // tslint:disable-next-line: radix
                item.ContractPayItemAmountFinal = parseInt(item.ContractPayItemAmountCOEF);
              }
              const ProgressPercent = item.ProgressPercent ? item.ProgressPercent : 0;
              const PenaltyPercentage = item.PenaltyPercentage ? item.PenaltyPercentage : 0;
              // tslint:disable-next-line: radix
              item.DeductionAmount = parseInt(ProgressPercent) > 0 ?
                // tslint:disable-next-line:radix
                (((100 - parseInt(ProgressPercent)) / 100) * item.ContractPayItemAmountCOEF).toFixed(2) : 0;
              // tslint:disable-next-line:radix
              // tslint:disable-next-line:radix
              item.CumultiveAmount = parseInt(item.BeforeAmount);
              this.IsEditTaxValue = item.IsTaxValue;
              this.EntityColumnDefinition(null, null, item.EntityList, false);
              this.SetEntityDataInDataRow(item);
              if (item.data.DeductionAmount && parseInt(item.data.DeductionAmount) > 0 && item.ContractPayItemAmountCOEF) {
                item.PenaltyAmount = this.IsGreenSpace ? ((parseInt(PenaltyPercentage) / 100) *
                  // tslint:disable-next-line: radix
                  (parseInt(item.data.DeductionAmount))).toFixed(2) : ((parseInt(PenaltyPercentage) / 100) *
                    // tslint:disable-next-line: radix
                    (item.ContractPayItemAmountCOEF - parseInt(item.DeductionAmount))).toFixed(2);
                if (item.PenaltyAmount && !isNaN(item.PenaltyAmount) && item.PenaltyAmount !== 'NaN'
                  // tslint:disable-next-line: radix
                  && !isNullOrUndefined(item.PenaltyAmount) && parseInt(item.PenaltyAmount)) {
                  // tslint:disable-next-line: radix
                  SumPenaltyAmount = SumPenaltyAmount + parseInt(item.PenaltyAmount);
                }
              }
            });
            this.SumPenaltyAmount = SumPenaltyAmount;
            this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

          });
      }
    }
    if (ADate.FullDate !== '') {
      this.EditModeInit = false;
    }
    if (this.ModuleCode === 2875) {
      this.CanDateChange = true;
    }
  }

  OnContractPayStartDateChange(Date) {
    this.ContractPayStartDate = Date.MDate;
    if (this.oldContractPayStartDate !== Date.MDate && !isNullOrUndefined(Date.MDate) && Date.MDate !== '' && this.IsGreenSpace) {
      this.SetProgressPercentinDataRow();
      this.oldContractPayStartDate = Date.MDate;
    }
  }
  DateChangeGetContractOrder() {
    this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
      this.ContractPayNo,
      this.ContractPayDate,
      null,
      0,
      true,
      this.ContractOperationID)
      .subscribe(
        ress => {
          this.ContractPayItemList = ress;
          let SumPenaltyAmount;
          this.ContractPayItemList.forEach(item => {
            // if (item.IsVolumetric) {
            //   item.Amount = item.Price;
            // }
            item.ContractPayItemUnitAmount = item.Amount;
            if (item.IsTaxValue) {
              // tslint:disable-next-line: radix
              item.ContractPayItemAmountFinal = parseInt(item.ContractPayItemAmountCOEF) + parseInt(item.TaxValue);
            } else {
              // tslint:disable-next-line: radix
              item.ContractPayItemAmountFinal = parseInt(item.ContractPayItemAmountCOEF);
            }
            // item.ContractPayItemAmount = item.Amount * item.Qty;
            const ProgressPercent = item.ProgressPercent ? item.ProgressPercent : 0;
            const PenaltyPercentage = item.PenaltyPercentage ? item.PenaltyPercentage : 0;
            item.DeductionAmount = parseInt(ProgressPercent) > 0 ?
              // tslint:disable-next-line:radix
              (((100 - parseInt(ProgressPercent)) / 100) * item.ContractPayItemAmountCOEF).toFixed(2) : 0;
            // tslint:disable-next-line:radix
            item.PenaltyAmount = this.IsGreenSpace ? ((parseInt(PenaltyPercentage) / 100) *
              // tslint:disable-next-line: radix
              (parseInt(item.data.DeductionAmount))).toFixed(2) : ((parseInt(PenaltyPercentage) / 100) *
                // tslint:disable-next-line: radix
                (item.ContractPayItemAmountCOEF - parseInt(item.DeductionAmount))).toFixed(2);
            // tslint:disable-next-line:radix
            item.CumultiveAmount = parseInt(item.BeforeAmount);
            this.IsEditTaxValue = item.IsTaxValue;
            this.EntityColumnDefinition(null, null, item.EntityList, false);
            this.SetEntityDataInDataRow(item);
            if (item.PenaltyAmount && !isNaN(item.PenaltyAmount) && item.PenaltyAmount !== 'NaN'
              // tslint:disable-next-line: radix
              && !isNullOrUndefined(item.PenaltyAmount) && parseInt(item.PenaltyAmount) > 0) {
              // tslint:disable-next-line: radix
              SumPenaltyAmount = SumPenaltyAmount + parseInt(item.PenaltyAmount);
            }
          });
          this.SumPenaltyAmount = SumPenaltyAmount;
          this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      );
    if (this.ContractPayDate !== '') {
      this.EditModeInit = false;
    }
  }
  OnContractPayEndDateChange(Date) {
    this.ContractPayEndDate = Date.MDate;
    if (this.oldContractPayEndDate !== Date.MDate && !isNullOrUndefined(Date.MDate) && Date.MDate !== '' && this.IsGreenSpace) {
      this.SetProgressPercentinDataRow();
      this.oldContractPayEndDate = Date.MDate;
    }
  }

  onChangeContractPayTypeObj(newObj) {
    this.selectedContractPayTypeObj = newObj;
  }

  onSave() {
    this.gridApi.stopEditing();
    if (!this.selectedFinYearObj || this.selectedFinYearObj == null) {
      this.CheckValidate = true;
      this.ShowMessageBoxWithOkBtn('سال مالی نمی تواند خالی باشد');
      return;
    }

    if (!this.IsMultiInvoice && (!this.ContractPayTechnicalCode || this.ContractPayTechnicalCode == null)) {
      this.ShowMessageBoxWithOkBtn('شماره صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (this.ContractOperationID != 4 && (!this.selectedContractPayTypeObj || this.selectedContractPayTypeObj == null)) {
      this.ShowMessageBoxWithOkBtn('نوع درخواست پرداخت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayStartDate || this.ContractPayStartDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ ابتدای دوره درخواست پرداخت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayEndDate || this.ContractPayEndDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ پایان دوره درخواست پرداخت نمی تواند خالی باشد');
      return;
    }

    if (!this.IsMultiInvoice && (!this.ContractPayDate || this.ContractPayDate == null)) {
      this.ShowMessageBoxWithOkBtn('تاریخ درخواست پرداخت نمی تواند خالی باشد');
      return;
    }
    if (this.selectedContractPayTypeObj !== 3) {
      if (!(this.ContractPayStartDate >= this.MiladiMinStartDate && this.ContractPayStartDate <= this.MiladiMaxEndDate) ||
      !(this.ContractPayEndDate >= this.MiladiMinStartDate && this.ContractPayEndDate <= this.MiladiMaxEndDate)) {
      this.ShowMessageBoxWithOkBtn('تاریخ شروع و پایان دوره درخواست پرداخت باید در بازه تاریخ قرارداد باشد');
      return;
    } // RFC 60362 , 60576
    } // 65475   

    if (this.PopupParam.Mode === 'InsertMode') {
      this.SaveContractPay();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.UpdateContractPay();
      return;
    }
  }

  RowClick(event) {
    this.ProductIDs = [];
    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }
    });
    if (this.ModuleViewTypeCode == 11 && event.data.ProductID == 518163) {
      this.EditableItemQty = true;
    }
    // this.columnDef1[1].cellEditorParams.Items = this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
    //   this.ContractPayNo,
    //   this.ContractPayDate,
    //   this.ProductIDs,
    //   0,
    //   false);
  }

  onCellValueChanged(event) {
    this.ChangeDetection = true;
    const value = event.newValue;
    let itemsToUpdate = [];
    this.gridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });
    if (event.colDef && (event.colDef.field === 'Qty')) {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {

        }
      });
    }

    if (event.colDef && (event.colDef.field === 'ContractPayItemQty')) {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.ContractPayItemQty && node.data.ContractPayItemQty > 0) {
            // tslint:disable-next-line: radix
            node.data.ContractPayItemAmount = parseInt((parseFloat(node.data.ContractPayItemUnitAmount)
              * parseFloat(node.data.ContractPayItemQty)).toString());
            // tslint:disable-next-line: max-line-length
            node.data.ContractPayItemAmountCOEF = node.data.Qty ? (parseInt(node.data.AmountCOEFPact) / parseInt(node.data.Qty)) * parseFloat(node.data.ContractPayItemQty) : parseInt(node.data.AmountCOEFPact) * parseFloat(node.data.ContractPayItemQty);
            node.data.CumultiveAmountCOEF = parseInt(node.data.BeforeAmountCOEF) + parseInt(node.data.ContractPayItemAmountCOEF);
            if (node.data.IsTaxValue) {
              // tslint:disable-next-line: radix
              node.data.TaxValue = Math.round((node.data.ContractPayItemAmountCOEF && (parseInt(node.data.ContractPayItemAmountCOEF)) > 0
                // tslint:disable-next-line: radix
                ? (parseInt(node.data.ContractPayItemAmountCOEF) - (node.data.Discount ? parseInt(node.data.Discount) : 0))
                // tslint:disable-next-line: radix
                : (parseInt(node.data.ContractPayItemAmount) - (node.data.Discount ? parseInt(node.data.Discount) : 0))) * 0.09);

              // tslint:disable-next-line: radix
              // tslint:disable-next-line: max-line-length
              node.data.ContractPayItemAmountFinal = (node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                // tslint:disable-next-line: radix
                ? parseInt(node.data.ContractPayItemAmountCOEF)
                // tslint:disable-next-line: radix
                : parseInt(node.data.ContractPayItemAmount)) + parseInt(node.data.TaxValue);
            } else {
              // tslint:disable-next-line: radix
              node.data.ContractPayItemAmountFinal = node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                ? parseInt(node.data.ContractPayItemAmountCOEF) : parseInt(node.data.ContractPayItemAmount);
            }
            node.data.CumultiveAmount = parseInt(node.data.ContractPayItemAmount) + parseInt(node.data.BeforeAmount);
          }
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'ContractPayItemAmount' || event.colDef.field === 'RequestedAmount') {
      itemsToUpdate = [];
      let SumPenaltyAmount = 0;
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {

          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          node.data.DeductionAmount = parseInt(ProgressPercent) > 0 ?
            // tslint:disable-next-line:radix
            (((100 - parseInt(ProgressPercent)) / 100) * node.data.ContractPayItemAmountCOEF).toFixed(2) : 0;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = this.IsGreenSpace ? ((parseInt(PenaltyPercentage) / 100) *
            // tslint:disable-next-line: radix
            (parseInt(node.data.data.DeductionAmount))).toFixed(2) :
            // tslint:disable-next-line: radix
            ((parseInt(PenaltyPercentage) / 100) *
              // tslint:disable-next-line: radix
              (node.data.ContractPayItemAmountCOEF - parseInt(node.data.DeductionAmount))).toFixed(2);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmount = parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount);

          if (node.data.IsTaxValue) {
            // tslint:disable-next-line: radix
            node.data.TaxValue = Math.round((node.data.ContractPayItemAmountCOEF && (parseInt(node.data.ContractPayItemAmountCOEF)) > 0
              // tslint:disable-next-line: radix
              ? (parseInt(node.data.ContractPayItemAmountCOEF) - (node.data.Discount ? parseInt(node.data.Discount) : 0))
              // tslint:disable-next-line: radix
              : (parseInt(node.data.ContractPayItemAmount) - (node.data.Discount ? parseInt(node.data.Discount) : 0))) * 0.09);
            // tslint:disable-next-line: radix
            node.data.ContractPayItemAmountFinal = (node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
              // tslint:disable-next-line: radix
              ? parseInt(node.data.ContractPayItemAmountCOEF)
              // tslint:disable-next-line: radix
              : parseInt(node.data.ContractPayItemAmount)) + parseInt(node.data.TaxValue);
          } else {
            node.data.TaxValue = 0;
            // tslint:disable-next-line: radix
            node.data.ContractPayItemAmountFinal = node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
              ? parseInt(node.data.ContractPayItemAmountCOEF) : parseInt(node.data.ContractPayItemAmount);
          }

          if (node.data.Qty) { // RFC 61913
            if (node.data.ContractPayItemUnitAmount) {
              // tslint:disable-next-line: radix
              node.data.ContractPayItemQty = (parseFloat(node.data.ContractPayItemAmount) / parseFloat(node.data.ContractPayItemUnitAmount) < 1) ? null :
                parseFloat(node.data.ContractPayItemAmount) / parseFloat(node.data.ContractPayItemUnitAmount);
            } else {
              node.data.ContractPayItemQty = parseFloat(node.data.ContractPayItemQty);
            }
          } else {
            node.data.ContractPayItemQty = null;
          }
          if (node.data.PenaltyAmount && !isNaN(node.data.PenaltyAmount) && node.data.PenaltyAmount !== 'NaN'
            // tslint:disable-next-line: radix
            && !isNullOrUndefined(node.data.PenaltyAmount) && parseInt(node.data.PenaltyAmount)) {
            // tslint:disable-next-line: radix
            SumPenaltyAmount = SumPenaltyAmount + parseInt(node.data.PenaltyAmount);
          }
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      this.SumPenaltyAmount = SumPenaltyAmount;
      this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (event.colDef && event.colDef.field === 'TaxValue') {
      let TaxValue;
      let IsVolumetric;
      this.contractpaydetail.GetContractOrderByProductID(this.PopupParam.SelectedContractID, // 62417
        this.ContractPayDate,
        event.data.ProductID,
        true).subscribe(res => {
          TaxValue = res ? res.TaxValue : '';
          IsVolumetric = res ? res.IsVolumetric : '';
          itemsToUpdate = [];
          this.gridApi.forEachNode(node => {
            if (node.rowIndex === event.rowIndex) {
              if ((IsVolumetric ? true : node.data.IsTaxValue) && (TaxValue !== 0 && TaxValue !== null)) {
                node.data.TaxValue = parseInt(node.data.TaxValue);
                // tslint:disable-next-line: max-line-length
                node.data.ContractPayItemAmountFinal = node.data.TaxValue ? (node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                  // tslint:disable-next-line: radix
                  ? parseInt(node.data.ContractPayItemAmountCOEF)
                  // tslint:disable-next-line: radix
                  // tslint:disable-next-line: max-line-length
                  : parseInt(node.data.ContractPayItemAmount)) + parseInt(node.data.TaxValue) : node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                  ? parseInt(node.data.ContractPayItemAmountCOEF) : parseInt(node.data.ContractPayItemAmount);
              } else if (TaxValue === 0 || TaxValue === null) {
                node.data.TaxValue = 0;
                // tslint:disable-next-line: max-line-length
                node.data.ContractPayItemAmountFinal = node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                  // tslint:disable-next-line: radix
                  ? parseInt(node.data.ContractPayItemAmountCOEF) : parseInt(node.data.ContractPayItemAmoun);
              }
              itemsToUpdate.push(node.data);
            }
          });
          this.gridApi.updateRowData({ update: itemsToUpdate });
        });
    }

    if (event.colDef && event.colDef.field === 'PenaltyPercentage') {
      itemsToUpdate = [];
      let SumPenaltyAmount = 0;
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          // tslint:disable-next-line: radix
          node.data.DeductionAmount = parseInt(ProgressPercent) > 0 ?
            // tslint:disable-next-line:radix
            (((100 - parseInt(ProgressPercent)) / 100) * node.data.ContractPayItemAmountCOEF).toFixed(2) : 0;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = this.IsGreenSpace ? ((parseInt(PenaltyPercentage) / 100) *
            // tslint:disable-next-line: radix
            (parseInt(node.data.data.DeductionAmount))).toFixed(2) : ((parseInt(PenaltyPercentage) / 100) *
              // tslint:disable-next-line: radix
              (node.data.ContractPayItemAmountCOEF - parseInt(node.data.DeductionAmount))).toFixed(2);
          // tslint:disable-next-line:radix
          node.data.CumultiveAmount = parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount) -
            // tslint:disable-next-line:radix
            parseInt(node.data.PenaltyAmount);

          itemsToUpdate.push(node.data);
        }
        if (node.data.PenaltyAmount && !isNullOrUndefined(node.data.PenaltyAmount) &&
          !isNaN(node.data.PenaltyAmount) && node.data.PenaltyAmount !== 'NaN'
          // tslint:disable-next-line: radix
          && !isNullOrUndefined(node.data.PenaltyAmount) && parseInt(node.data.PenaltyAmount)) {
          // tslint:disable-next-line: radix
          SumPenaltyAmount = SumPenaltyAmount + parseInt(node.data.PenaltyAmount);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      // tslint: disable - next - line: radix
      this.SumPenaltyAmount = SumPenaltyAmount;
      this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (event.colDef && event.colDef.field === 'ProgressPercent') {
      itemsToUpdate = [];
      let SumPenaltyAmount = 0;
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          // tslint:disable-next-line: radix
          node.data.DeductionAmount = parseInt(ProgressPercent) > 0 ?
            // tslint:disable-next-line:radix
            (((100 - parseInt(ProgressPercent)) / 100) * node.data.ContractPayItemAmountCOEF).toFixed(2) : 0;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = this.IsGreenSpace ? ((parseInt(PenaltyPercentage) / 100) *
            // tslint:disable-next-line: radix
            (parseInt(node.data.data.DeductionAmount))).toFixed(2) : ((parseInt(PenaltyPercentage) / 100) *
              // tslint:disable-next-line: radix
              (node.data.ContractPayItemAmountCOEF - parseInt(node.data.DeductionAmount)));

          // tslint:disable-next-line:radix
          node.data.CumultiveAmount = parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount) -
            // tslint:disable-next-line:radix
            parseInt(node.data.PenaltyAmount);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmountCOEF = node.data.ContractPayItemAmountCOEF - node.data.DeductionAmount - node.data.PenaltyAmount;
          itemsToUpdate.push(node.data);
        }
        if (node.data.PenaltyAmount && !isNullOrUndefined(node.data.PenaltyAmount) &&
          !isNaN(node.data.PenaltyAmount) && node.data.PenaltyAmount !== 'NaN'
          // tslint:disable-next-line: radix
          && !isNullOrUndefined(node.data.PenaltyAmount) && parseInt(node.data.PenaltyAmount) > 0) {
          // tslint:disable-next-line: radix
          SumPenaltyAmount = SumPenaltyAmount + parseInt(node.data.PenaltyAmount);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      this.SumPenaltyAmount = SumPenaltyAmount;
      this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (event.colDef && event.colDef.field === 'CumultiveAmount') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {

          // tslint:disable-next-line:radix
          node.data.ContractPayItemAmount = parseInt(node.data.CumultiveAmount) - parseInt(node.data.BeforeAmount);

          if (node.data.IsTaxValue) {
            // tslint:disable-next-line: radix
            node.data.TaxValue = Math.round((node.data.ContractPayItemAmountCOEF && (parseInt(node.data.ContractPayItemAmountCOEF)) > 0
              // tslint:disable-next-line: radix
              ? (parseInt(node.data.ContractPayItemAmountCOEF) - (node.data.Discount ? parseInt(node.data.Discount) : 0))
              // tslint:disable-next-line: radix
              : (parseInt(node.data.ContractPayItemAmount) - (node.data.Discount ? parseInt(node.data.Discount) : 0))) * 0.09);

            // tslint:disable-next-line: radix
            node.data.ContractPayItemAmountFinal = (node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
              // tslint:disable-next-line: radix
              ? parseInt(node.data.ContractPayItemAmountCOEF)
              // tslint:disable-next-line: radix
              : parseInt(node.data.ContractPayItemAmount)) + parseInt(node.data.TaxValue);
          } else {
            node.data.TaxValue = 0;
            // tslint:disable-next-line: radix
            node.data.ContractPayItemAmountFinal = node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
              ? parseInt(node.data.ContractPayItemAmountCOEF) : parseInt(node.data.ContractPayItemAmount);
          }

          if (node.data.Qty) { // RFC 61913
            if (node.data.ContractPayItemUnitAmount) {
              // tslint:disable-next-line: radix
              // tslint:disable-next-line: max-line-length
              node.data.ContractPayItemQty = (parseFloat(node.data.ContractPayItemAmount) / parseFloat(node.data.ContractPayItemUnitAmount)) < 1 ? null :
                (parseFloat(node.data.ContractPayItemAmount) / parseFloat(node.data.ContractPayItemUnitAmount));
            } else {
              node.data.ContractPayItemQty = parseFloat(node.data.ContractPayItemQty);
            }
          } else {
            node.data.ContractPayItemQty = null;
          }
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'PenaltyAmount') {

      let SumPenaltyAmount = 0;
      this.gridApi.forEachNode(node => {
        // tslint:disable-next-line: radix
        if (node.data.PenaltyAmount && !isNullOrUndefined(node.data.PenaltyAmount) && parseInt(node.data.PenaltyAmount) > 0
          && !isNaN(node.data.PenaltyAmount) && node.data.PenaltyAmount !== 'NaN') {
          // tslint:disable-next-line: radix
          SumPenaltyAmount = SumPenaltyAmount + parseInt(node.data.PenaltyAmount);
        }
      });
      // tslint: disable - next - line: radix
      this.SumPenaltyAmount = SumPenaltyAmount;
      this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      if (this.IsVolumetric) {
        event.data.IsTaxValue = this.IsTaxValue && event.data.IsTaxValue;
        //event.data.PriceID = res.List.PriceID;
        // tslint:disable-next-line: max-line-length
        event.data.ShortStartDate = this.ContractDetails.ShortStartDate ? this.ContractDetails.ShortStartDate : this.ContractDetails.FromContractDateString;
        // tslint:disable-next-line: max-line-length
        event.data.ShortEndDate = this.ContractDetails.ShortEndDate ? this.ContractDetails.ShortEndDate : this.ContractDetails.ToContractDateString;
        // tslint:disable-next-line: max-line-length
        event.data.PersianStartDate = this.ContractDetails.ShortStartDate ? this.ContractDetails.PersianStartDate : this.ContractDetails.PersianFromContractDateString;
        // tslint:disable-next-line: max-line-length
        event.data.PersianEndDate = this.ContractDetails.ShortEndDate ? this.ContractDetails.PersianEndDate : this.ContractDetails.PersianToContractDateString;
        event.data.ContractPayItemUnitAmount = event.data.Price;
        this.contractpaydetail.GetBeforeContractPay(this.PopupParam.SelectedContractID, // RFC 65519
          this.ContractPayNo,
          this.ContractOperationID,
          event.data.ProductID).subscribe(res => {
            if (res && res.length > 0) {
              event.data.BeforeAmount = res[0].BeforeAmount;
              event.data.BeforeAmountCOEF = res[0].BeforeAmountCOEF;
              event.data.BeforeQty = res[0].BeforeQty;
            }
          });

      } else {
        this.contractpaydetail.GetContractOrderByProduct(
          0,
          this.RegionCode,
          '',
          1,
          30,
          this.PopupParam.SelectedContractID,
          this.ContractPayNo,
          this.ContractPayDate,
          event.data.ProductID,
          this.ProdcutTypeCode,
          this.IsGreenSpace,
          this.ContractPayStartDate,
          this.ContractPayEndDate
        ).subscribe(res => {
          event.data.Amount = res.Amount;
          event.data.IsTaxValue = res.IsTaxValue;
          event.data.Qty = res.Qty;
          event.data.ContractPayItemUnitAmount = event.data.Amount;
          event.data.FinalAmount = res.FinalAmount;
          event.data.AmountCOEFPact = res.AmountCOEFPact;
          event.data.BeforeAmount = res.BeforeAmount;
          event.data.BeforeAmountCOEF = res.BeforeAmountCOEF;
          event.data.BeforeQty = res.BeforeQty;
          const ProgressPercent = res.ProgressPercent ? res.ProgressPercent : 0;
          const PenaltyPercentage = res.PenaltyPercentage ? res.PenaltyPercentage : 0;
          // tslint:disable-next-line:radix
          event.data.DeductionAmount = parseInt(ProgressPercent) > 0 ? (((100 - parseInt(ProgressPercent)) / 100) *
            res.ContractPayItemAmountCOEF).toFixed(2) : 0;
          // tslint:disable-next-line:radix
          event.data.PenaltyAmount = this.IsGreenSpace ? ((parseInt(PenaltyPercentage) / 100) *
            // tslint:disable-next-line: radix
            (parseInt(event.data.DeductionAmount))).toFixed(2) :
            // tslint:disable-next-line: radix
            ((parseInt(PenaltyPercentage) / 100) *
              // tslint:disable-next-line: radix
              (res.ContractPayItemAmountCOEF - parseInt(event.data.DeductionAmount))).toFixed(2);
          if (!event.data.PenaltyAmount || event.data.PenaltyAmount === NaN || event.data.PenaltyAmount === 'NaN') {
            event.data.PenaltyAmount = 0;
          }
          // tslint:disable-next-line: radix
          event.data.CumultiveAmount = parseInt(event.data.BeforeAmount) - parseInt(event.data.PenaltyAmount);
          // tslint:disable-next-line: radix
          event.data.CumultiveAmountCOEF = parseInt(event.data.DeductionAmount) - parseInt(event.data.PenaltyAmount);
          event.data.ProgressPercent = res.ProgressPercent;
          event.data.PenaltyPercentage = res.PenaltyPercentage;
        });
      }
      if (event.data.IsTaxValue) {
        // tslint:disable-next-line: radix
        event.data.ContractPayItemAmountFinal = parseInt(event.data.ContractPayItemAmount) + parseInt(event.data.TaxValue);
      } else {
        // tslint:disable-next-line: radix
        event.data.ContractPayItemAmountFinal = parseInt(event.data.ContractPayItemAmount);
      }
    }

    if (this.PopupParam.Mode === 'InsertMode') { // 65343
      if (event.colDef && event.colDef.field === 'ContractPayItemAmount') {
        this.gridApi.forEachNode(node => {
          if (node.data.Qty <= 1) {
            node.data.ContractPayItemUnitAmount = node.data.ContractPayItemAmount;
          }
        });
      }
    }

    if (event.colDef && event.colDef.field === 'Discount') {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.IsTaxValue) {
            // tslint:disable-next-line: radix
            node.data.TaxValue = Math.round((node.data.ContractPayItemAmountCOEF && (parseInt(node.data.ContractPayItemAmountCOEF)) > 0
              // tslint:disable-next-line: radix
              ? (parseInt(node.data.ContractPayItemAmountCOEF) - (node.data.Discount ? parseInt(node.data.Discount) : 0))
              // tslint:disable-next-line: radix
              : (parseInt(node.data.ContractPayItemAmount) - (node.data.Discount ? parseInt(node.data.Discount) : 0))) * 0.09);

          }
        }
      });
    }
  }

  onContractPayItemGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
    this.ParamObj = this.alertMessageParams;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
    this.ParamObj = this.alertMessageParams;
  }

  MessageBoxAction(ActionResult) {

    if (this.BtnClickedName === 'BtnConfirm' && ActionResult === 'YES') {
      this.DOConfirm();
    }
    if (this.BtnClickedName === 'IsDateChange' && ActionResult === 'YES') {
      this.DateChangeGetContractOrder();
    }
    if (this.BtnClickedName === 'IsDateChange' && ActionResult === 'YES' &&
      this.CanDateChange && this.ModuleCode === 2875) {
      this.DateChangeGetContractOrder();
    }
    if (this.BtnClickedName !== 'BtnConfirm' && this.BtnClickedName !== 'IsDateChange' &&
      ActionResult === 'YES') {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  popupclosed(event) {
    if (event && this.type === 'global-choose-page') {
      this.PrintSelectedReport(event);
    }

    if (event && this.type === 'app-contract-pay-deduction') {
     this. EditModeNgInit() ;
    }
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.OverPixelWidth = null;
    this.HeightPercentWithMaxBtn = null;
  }

  SaveContractPay() {
    const ContractPayItemList = [];
    this.gridApi.forEachNode(node => {
      let keys = Object.keys(node.data);
      const EntityTypeItemIDList = [];
      if (node.data.EntityList) {
        node.data.EntityList.forEach(Entity => {
          const str = 'Subject' + Entity.EntityTypeID.toString();
          const ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
          let key = keys.find(x => x === str);

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
      const obj = {
        ContractPayItemID: -1,
        CostFactorID: -1,
        ItemNo: node.data.ItemNo,
        ProductID: node.data.ProductID,
        StartDate: node.data.ShortStartDate,
        EndDate: node.data.ShortEndDate,
        ContractPayItemAmount: node.data.ContractPayItemAmount,
        TaxValue: node.data.TaxValue,
        Qty: node.data.ContractPayItemQty,
        ProgressPercent: node.data.ProgressPercent,
        PenaltyPercentage: node.data.PenaltyPercentage,
        PenaltyAmount: node.data.PenaltyAmount,
        FinalAmount: node.data.FinalAmount,
        EntityTypeItemIDList: EntityTypeItemIDList,
        ContractPayItemDate: node.data.ShortContractPayItemDate,
        ContractPayItemTechCode: node.data.ContractPayItemTechCode,
        RequestedAmount: node.data.RequestedAmount,
        Discount: node.data.Discount
      };
      ContractPayItemList.push(obj);
    });

    const ContractPayObj = {
      ContractPayId: -1,
      CostFactorId: -1,
      CostContractId: this.PopupParam.SelectedCostFactorID,
      FinYearCode: this.selectedFinYearObj,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.selectedContractPayTypeObj,
      Note: this.Note,
      ContractPayTechnicalCode: (this.IsMultiInvoice) ? this.ContractPayNo : this.ContractPayTechnicalCode, // 62513
      ContractOperationId: this.ContractOperationID,
      IsConfirm: 0,
      AdjustmentTypeCode: this.AdjustmentTypeParams.selectedObject ? this.AdjustmentTypeParams.selectedObject : null,  // 64275
    };
    const BankList = [];
    const HaveBank = (this.NgSelectBankParams.selectedObject || this.NgSelectBankParams.selectedObject !== null) ? false : true;
    if (this.NgSelectBankParams.selectedObject) {
      const BankObj = {
        ActorBankAccID: this.ActorBankAccID ? this.ActorBankAccID : -1,
        ActorID: this.ContractorID,
        BankID: this.NgSelectBankParams.selectedObject,
        BranchID: this.NgSelectBranchParams.selectedObject,
        AccNo: this.AccNo,
        CityID: this.CityID,
        ShebaNo: this.ShebaNo,
      };
      BankList.push(BankObj);
    }

    this.contractpaydetail.SaveContractPay(
      ContractPayObj,
      ContractPayItemList,
      BankList,
      HaveBank,
      false,
      true,
      this.ModuleCode,
      this.ModuleViewTypeCode).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ChangeDetection = false;
        this.PopupParam.Mode = 'EditMode';
        this.PopupParam.SelectedCPCostFactorID = res;
        this.ngOnInit();
      },
        err => {
          this.ChangeDetection = true;
        }
      );
  }

  UpdateContractPay() {
    const ContractPayItemList = [];
    let SumContractPayItemAmount = 0;

    this.gridApi.forEachNode(node => {

      let ContractPayItemID;
      let CostFactorID;

      if (node.data.ContractPayItemID) {
        ContractPayItemID = node.data.ContractPayItemID;
      }

      if (this.CostFactorID && this.CostFactorID !== -1) {
        CostFactorID = this.CostFactorID;
      }

      let keys = Object.keys(node.data);
      const EntityTypeItemIDList = [];
      if (node.data.EntityList) {
        node.data.EntityList.forEach(Entity => {
          const str = 'Subject' + Entity.EntityTypeID.toString();
          const ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
          let key = keys.find(x => x === str);

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

      const obj = {
        ContractPayItemID: ContractPayItemID,
        CostFactorID: CostFactorID,
        ItemNo: node.data.ItemNo,
        ProductID: node.data.ProductID,
        StartDate: node.data.ShortStartDate,
        EndDate: node.data.ShortEndDate,
        ContractPayItemAmount: node.data.ContractPayItemAmount,
        TaxValue: node.data.TaxValue,
        Qty: node.data.ContractPayItemQty,
        ProgressPercent: node.data.ProgressPercent,
        PenaltyPercentage: node.data.PenaltyPercentage,
        PenaltyAmount: node.data.PenaltyAmount,
        FinalAmount: node.data.FinalAmount,
        EntityTypeItemIDList: EntityTypeItemIDList,
        ContractPayItemDate: node.data.ShortContractPayItemDate,
        ContractPayItemTechCode: node.data.ContractPayItemTechCode,
        RequestedAmount: node.data.RequestedAmount,
        Discount: node.data.Discount
      };
      // tslint:disable-next-line:radix
      SumContractPayItemAmount += parseInt(node.data.ContractPayItemAmount);
      ContractPayItemList.push(obj);
    });

    const ContractPayObj = {
      ContractPayId: this.ContractDetails.ContractPayId,
      CostFactorId: this.CostFactorID,
      CostContractId: this.CostContractID,
      FinYearCode: this.selectedFinYearObj,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.selectedContractPayTypeObj,
      Note: this.Note,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractOperationId: this.ContractOperationID,
      IsConfirm: this.IsConfirm, // هماهنگی با مهندس حسینی
      AdjustmentTypeCode: this.AdjustmentTypeParams.selectedObject ? this.AdjustmentTypeParams.selectedObject : null,  // 64275
      PenaltyAmount: this.SumPenaltyAmount,
      DurationPenaltyDay: this.DurationPenaltyDay
    };
    const BankList = [];
    const HaveBank = (this.NgSelectBankParams.selectedObject || this.NgSelectBankParams.selectedObject !== null) ? false : true;
    if (this.NgSelectBankParams.selectedObject) {
      const BankObj = {
        ActorBankAccID: this.ActorBankAccID ? this.ActorBankAccID : -1,
        ActorID: this.ContractorID,
        BankID: this.NgSelectBankParams.selectedObject,
        BranchID: this.NgSelectBranchParams.selectedObject,
        AccNo: this.AccNo,
        CityID: this.CityID,
        ShebaNo: this.ShebaNo,
      };
      BankList.push(BankObj);
    }

    this.contractpaydetail.UpdateContractPay(
      ContractPayObj,
      ContractPayItemList,
      -1,
      this.ModuleCode,
      null,
      true,
      BankList,
      HaveBank,
      this.ModuleViewTypeCode,
      this.DifferenceAmount, // مبلغ ما به التفاوت اجاره تجهیز
      this.DifferenceNote // توضیحات ما به التفاوت
    ).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
      this.ngOnInit();
    },
      err => {
        this.ChangeDetection = true;
      }
    );
  }

  BtnArchiveClick() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 295;
    this.startTopPosition = 12;
    const archiveParam = {
      EntityID: this.ContractDetails.ContractPayId,
      TypeCodeStr: '3-',
      DocTypeCode: 3,
      ModuleCode: 2516,
      IsReadOnly: this.PopupParam.ShowSendBtn === 'YES' ? true : this.PopupParam.IsViewable,
      DocumentTypeCodeList: [7, 8]
    };
    this.ParamObj = archiveParam;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {

    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.GridBoxHeight = changes.PopupMaximized.currentValue ? 69 : 62;
    }
  }

  onConfirms() { // RFC 52262
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'BtnConfirm';
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          if (this.ChangeDetection) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت  تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
          } else {
            this.DOConfirm();
          }
        } else {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.CostFactorID,
            this.RegionCode,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            this.ModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تاييد درخواست انجام معامله با موفقيت انجام شد');
              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تاييد';
              this.btnConfirmIcon = 'ok';
              this.IsEditConfirm = true;
            }
            );
        }
      } else {
        this.DOFinalConfirm();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  onConfirmAndSend() { // RFC 52262
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'ConfirmAndSend';
      // this.IsDown = false;
      if (this.ChangeDetection) {
        this.ShowMessageBoxWithYesNoBtn('اطلاعات تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
      } else {
        this.DoConfirmAndSend();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  OnClickPrintFlow() { // RFC 52262
    const ContractCode = this.CurrWorkFlow ? this.CurrWorkFlow.ObjectCode : -1;
    const FullPersonName = { FullPersonName: '' };
    this.Report.ShowReport(null,
      null,
      this.CostFactorID,
      ContractCode,
      null,
      null,
      null,
      FullPersonName ? FullPersonName.FullPersonName : '',
      null,
      null,
      2516,
      this.RegionCode
    );
  }

  SetStartedWFInfo(Resolve) { // RFC 52262
    this.FlowService.GetStartModuleViewTypeCode(this.RegionCode,
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
  ViewTypeChange() { // RFC 52262
    if (this.btnConfirmName === 'عدم تایید') {
      this.IsEditable = true;
      this.IsEditConfirm = false;
    }

    console.log('🚀 / کد نوع نمایش فعالیت: ', this.ModuleViewTypeCode);
    switch (this.ModuleViewTypeCode) {
      case 1:
        this.IsFinYearDisable = false; //RFC 65397
        this.IsEditable = true;
        this.IsContractorAgent = (this.RegionCode > 0 && this.RegionCode < 23) ? true : false;
        break;
      case 2:
        this.IsEditableContractPayItemAmountCol = false;
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = false;
        this.IsEditTaxValue = this.IsEditable = false;
        this.DisplayControlls = false;
        this.ShowReportsSign = false; // RFC 57083
        break;
      case 3: // تامين اعتبار صورت وضعيت در سيستم مالي
        this.DisplayControlls = false;
        this.HaveSave = false;
        this.IsEditable = false;
        this.HaveConfirm = false;
        this.HaveAlertToFinance = true;
        this.GridBoxHeight = 57;
        if (this.HaveAlertToContractPayDate) {
          this.GridBoxHeight = 53;
        }
        break;
      case 5:
        this.IsEditableContractPayItemAmountCol = false;
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = false;
        this.IsEditable = false;
        this.EditableBankInf = true; // 61719
        this.DisplayControlls = false;
        this.ShowReportsSign = true; // RFC 57083
        this.IsEditTaxValue = this.RegionCode === 200 ? true : false;  // 62417
        break;
      case 6:
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = false;
        this.IsEditable = false;
        this.DisplayControlls = false;
        this.ShowReportsSign = false; // RFC 57083
        this.HaveModuleViewTypeSave = true;
        break;
      case 7: // RFC 62332 اصلاح ارزش افزوده
        this.IsEditableContractPayItemAmountCol = false;
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = this.IsEditable = false;
        this.IsEditTaxValue = this.HaveModuleViewTypeSave = true;
        this.DisplayControlls = this.ShowReportsSign = false;
        break;
      case 8:
        this.IsEditable = true;
        this.EditItemAmount = (this.RegionCode === 220 && this.PopupParam.Mode === 'EditMode') ? false : true; // 61809
        break;
      case 9: // درج جریمه
        this.IsEditableContractPayItemAmountCol = false;
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = false;
        this.IsEditTaxValue = this.IsEditable = false;
        this.DisplayControlls = false;
        this.ShowReportsSign = false; // RFC 57083
        this.CanEditPenalty = this.RegionCode === 200 ? true : false;
        this.HaveModuleViewTypeSave = true;
        break;
      case 10: // ناظر صورت وضعیت (فضای سبز)
        this.IsEditableContractPayItemAmountCol = false;
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = false;
        this.IsEditTaxValue = this.IsEditable = false;
        this.DisplayControlls = false;
        this.ShowReportsSign = false; // RFC 57083
        this.CanEditPenalty = true;
        this.IsProgressPercentColEditable = true;
        this.HaveModuleViewTypeSave = true;
        break;
      case 500000: // حالت فقط خواندنی
        this.DisplayControlls = false;
        this.HaveSave = false;
        this.IsEditable = false;
        this.HaveDelete = false;
        this.HaveLoadExcel = false;
        this.HaveConfirm = false;
        break;
      case 100000:
        this.IsFinYearDisable = false;
        this.IsAdminToolsModule = true;
        this.IsEditTaxValue = true;  // 62417, 62641
        this.GridBoxHeight = 58;
        if (this.HaveAlertToContractPayDate) {
          this.GridBoxHeight = 53;
        }
        break;
      case 11:
        this.IsEditableContractPayItemAmountCol = false;
        this.IsEditableProductNameCol = false;
        this.IsEditableProductTypeCol = false;
        this.IsEditTaxValue = this.IsEditable = false;
        this.DisplayControlls = false;
        this.ShowReportsSign = false;
        this.ShowSaveBtn = true;
        this.GridBoxHeight = 56;
        break;
      default:
        break;
    }

    this.ColumnDefinition(this.IsMultiInvoice, this.IsCumulative);
    // }
  }
  DOConfirm(HasAlert = true, resolve = null) { // RFC 52262
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null || this.WorkflowObjectCode === undefined) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار براي اين واحد اجرايي به درستي تعريف نشده است');
        return;
      }
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionCode,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.ModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn('تاييد درخواست پرداخت با موفقيت انجام شد');
          }
          this.RefreshCartable.RefreshCartable();
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تاييد';
          this.btnConfirmIcon = 'cancel';
          this.IsEditConfirm = false;
          resolve(res);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطاي پيش بيني نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  DOFinalConfirm() { // RFC 52262
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
          messageStr = 'بازگشت از تاييد نهايي با موفقيت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تاييد نهايي';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تاييد نهايي با موفقيت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تاييد نهايي';
          this.btnConfirmIcon = 'cancel';
        }
        this.RefreshCartable.RefreshCartable();
        this.ShowMessageBoxWithOkBtn(messageStr);
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطاي پيش بيني نشده');
          }
        });
  }
  DoConfirmAndSend() { // RFC 52262
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown: any) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('باتوجه به اينکه نقش شما در اين گردش آخرين فعاليت مي باشدارسال شما به عنوان پايان کار در نظر گرفته مي شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonServicee._arrayBufferToBase64(element.UserImage);
                    });
                    this.type = 'work-flow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    this.PercentWidth = null;
                    this.OverMainMinwidthPixel = null;
                    this.MainMaxwidthPixel = null;
                    this.HeightPercentWithMaxBtn = null;
                    this.MinHeightPixel = null;
                    this.ParamObj = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      ObjectID: this.ObjectID,
                      ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      MinimumPosting: this.PopupParam.WorkFlowID ? this.PopupParam.MinimumPosting : IsDown.MinimumPosting,
                      OrginalModuleCode: this.ModuleCode,
                      CartableUserID: this.CartableUserID
                    };
                    this.btnclicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصي جهت ارسال وجود ندارد');
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });
  }
  DoUnConfirm(alert = true, resolve = null) { // RFC 52262
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionCode,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.ModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('عدم تاييد برآورد اوليه با موفقيت انجام شد');
          }
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تاييد';
          this.btnConfirmIcon = 'ok';
          this.IsEditable = true;
          this.IsEditConfirm = true;
          resolve(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطاي پيش بيني نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  EntityColumnDefinition(ProductID, node, EntityList, hasApiCall) {

    // if (ProductID && hasApiCall) {

    //   this.ProductRequest.GetProductRequestEntityList(null, ProductID, null).subscribe(
    //     res => {

    //       let columnDef22 = [];
    //       this.columnDef1.forEach(element => {
    //         columnDef22.push(element);
    //       });
    //       this.columnDef1 = [];

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
    //       this.columnDef1 = columnDef22;
    //     });
    // }

    // if (!hasApiCall && EntityList) {

    //   let columnDef22 = [];
    //   this.columnDef1.forEach(element => {
    //     columnDef22.push(element);
    //   });
    //   this.columnDef1 = [];

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
    //   this.columnDef1 = columnDef22;
    // }
  }

  oncellEditingStarted(event) {
    this.ProductIDs = [];
    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }

      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });


    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, event.data.ProductID, null, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });
    }

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      if (this.IsVolumetric) {
        this.ProductRequest.GetIsVolumetricProductList(0,
          this.RegionCode,
          '',
          1,
          30,
          this.ProdcutTypeCode,
          true,
          this.ContractPayDate,
          event.data.ProductID,
          this.selectedContractID).
          subscribe(res => {
            this.RefreshCartable.RefreshItemsVirtualNgSelect({
              List: res.List,
              TotalItemCount: res.TotalItemCount,
              PageCount: Math.ceil(res.TotalItemCount / 30)
            });
          });
      } else {
        this.contractpaydetail.GetContractOrderListByPagination(
          0,
          this.RegionCode,
          '',
          1,
          30,
          this.PopupParam.SelectedContractID,
          this.ContractPayNo,
          this.ContractPayDate,
          this.ProductIDs,
          this.ProdcutTypeCode,
          this.IsGreenSpace,
          this.ContractPayStartDate,
          this.ContractPayEndDate).subscribe(res => {
            this.RefreshCartable.RefreshItemsVirtualNgSelect({
              List: res.List,
              TotalItemCount: res.TotalItemCount,
              PageCount: Math.ceil(res.TotalItemCount / 30)
            });
          });
      }
    }


  }

  SetEntityDataInDataRow(element) {

    if (element.ContractPayEntityItemList) {
      element.ContractPayEntityItemList.forEach(
        EntityItem => {
          let Name = 'Subject' + EntityItem.EntityTypeID.toString();
          let ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();
          element[Name] = EntityItem.Subject;
          element[ID] = EntityItem.EntityTypeItemID;
        });
    }

    if (element.OrderEstimateEntityItemList) {
      element.OrderEstimateEntityItemList.forEach(
        EntityItem => {
          let Name = 'Subject' + EntityItem.EntityTypeID.toString();
          let ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();
          element[Name] = EntityItem.Subject;
          element[ID] = EntityItem.EntityTypeItemID;
        });
    }
  }

  onUnConfirmAndReturn() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.IsDown = false;
      const promise = new Promise((resolve, reject) => {
        this.DoUnConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.ObjectNo;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  res.forEach(element => {
                    element.UserImage = this.CommonServicee._arrayBufferToBase64(element.UserImage);
                  });
                  this.type = 'work-flow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.PercentWidth = null;
                  this.OverMainMinwidthPixel = null;
                  this.MainMaxwidthPixel = null;
                  this.HeightPercentWithMaxBtn = null;
                  this.MinHeightPixel = null;
                  this.ParamObj = {
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
                    ObjectID: this.ObjectID,
                    CartableUserID: this.CartableUserID
                  };
                  this.btnclicked = true;
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
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  getOutPutParam(event) {
    if (event && this.type === 'work-flow-send') {
      this.close();
    }

    if (this.type === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }
  }

  OnPrinContractPayClick() {
    this.type = 'global-choose-page';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 520;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.MinHeightPixel = null;
    this.btnclicked = true;
    this.ParamObj = {
      HeaderName: 'انتخاب گزارش',
      RadioItems: [
        {
          title: 'درخواست پرداخت',
          type: 1,
          IsDisable: false,
        },
        {
          title: 'خلاصه مالی کل',
          type: 2,
          IsDisable: false,
        }
      ]
    };
  }

  OnChangeCheckBoxValue(Ischeck) {
    this.IsConfirm = Ischeck;
  }
  ShowContractCase() {

    this.type = 'contract-case';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverPixelWidth = 1290;
    this.startLeftPosition = 31;
    this.startTopPosition = 15;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 690;
    this.ContractPayPopupParam.HeaderName = 'مشاهده پرونده قرارداد';
    this.ContractPayPopupParam.ModuleCode = 2516;
    this.ContractPayPopupParam.GridHeightInTab = 100;
    this.ContractPayPopupParam.PanelHeightInTab = 99;
    this.ContractPayPopupParam.HaveSave = false;
    this.ContractPayPopupParam.IsViewable = true;
    this.ContractPayPopupParam.IsEditable = false;
    this.ContractPayPopupParam.SelectedContractID = this.PopupParam.SelectedContractID;
    this.ContractPayPopupParam.IsTabVisible = false;
    this.ParamObj = this.ContractPayPopupParam;
    this.btnclicked = true;
    this.ContractPayPopupParam.ModuleViewTypeCode = 5555;
  }
  OnImportFromExcelBtnClick() {
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.type = 'app-excel-load-data';
    this.startLeftPosition = 400;
    this.startTopPosition = 200;
    const colDef = [];
    this.columnDef1.forEach(element => {
      if (element.field !== 'ProductTypeName' && element.field !== 'ProductTypeName') {
        colDef.push(element);
      }
    });
    this.Excel_Header_Param = {
      colDef2: colDef
    };

    this.ParamObj = this.Excel_Header_Param;
  }

  loadFromExcel(data) {
    const Alist = [];
    this.ProductIDs = [];
    this.gridApi.forEachNode(nodee => {
      if (nodee.data.ProductID) { this.ProductIDs.push(nodee.data.ProductID); }

      data.forEach(node => {
        if (parseInt(node.ProductCodeName) === nodee.data.ProductCode) {
          nodee.data.ContractPayItemQty = node.ContractPayItemQty;
          nodee.data.PenaltyAmount = node.PenaltyAmount;
          nodee.data.PenaltyPercentage = node.PenaltyPercentage;
          nodee.data.ProgressPercent = node.ProgressPercent;
          nodee.data.TaxValue = node.TaxValue;
          nodee.data.ContractPayItemAmount = nodee.data.ContractPayItemQty * nodee.data.ContractPayItemUnitAmount;
          // tslint:disable-next-line: max-line-length
          if (nodee.data.TaxValue) {
            nodee.data.ContractPayItemAmountFinal = nodee.data.ContractPayItemAmountFinal = (nodee.data.ContractPayItemAmountCOEF && parseInt(nodee.data.ContractPayItemAmountCOEF) > 0
              // tslint:disable-next-line: radix
              ? parseInt(nodee.data.ContractPayItemAmountCOEF)
              // tslint:disable-next-line: radix
              : parseInt(nodee.data.ContractPayItemAmount)) + parseInt(nodee.data.TaxValue);
          } else {
            nodee.data.ContractPayItemAmountFinal = nodee.data.ContractPayItemAmountCOEF && parseInt(nodee.data.ContractPayItemAmountCOEF) > 0
              ? parseInt(nodee.data.ContractPayItemAmountCOEF) : parseInt(nodee.data.ContractPayItemAmount);
          }
          // tslint:disable-next-line: radix
          nodee.data.CumultiveAmount = parseInt(nodee.data.BeforeAmount) + parseInt(nodee.data.ContractPayItemAmount);
        }
      });
    });

    this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
      this.ContractPayNo,
      this.ContractPayDate,
      this.ProductIDs,
      0,
      false,
      this.ContractOperationID).subscribe(res => {
        res.forEach(element => {
          // if (element.IsVolumetric) {
          //   element.Amount = element.Price;
          // }

          data.forEach(node => {
            if (parseInt(node.ProductCodeName) === element.ProductCode) {
              element.ContractPayItemUnitAmount = element.Amount;
              element.ContractPayItemQty = node.ContractPayItemQty;
              element.PenaltyAmount = node.PenaltyAmount;
              element.PenaltyPercentage = node.PenaltyPercentage;
              element.ProgressPercent = node.ProgressPercent;
              element.TaxValue = node.TaxValue;
              element.ContractPayItemAmount = element.ContractPayItemQty * element.ContractPayItemUnitAmount;
              // tslint:disable-next-line: max-line-length
              if (node.data.TaxValue) {
                node.data.ContractPayItemAmountFinal = node.data.ContractPayItemAmountFinal = (node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                  // tslint:disable-next-line: radix
                  ? parseInt(node.data.ContractPayItemAmountCOEF)
                  // tslint:disable-next-line: radix
                  : parseInt(node.data.ContractPayItemAmount)) + parseInt(node.data.TaxValue);
              } else {
                node.data.ContractPayItemAmountFinal = node.data.ContractPayItemAmountCOEF && parseInt(node.data.ContractPayItemAmountCOEF) > 0
                  ? parseInt(node.data.ContractPayItemAmountCOEF) : parseInt(node.data.ContractPayItemAmount);
              }
              // tslint:disable-next-line: radix
              element.CumultiveAmount = parseInt(element.BeforeAmount) + parseInt(element.ContractPayItemAmount);
              Alist.push(element);
            }
          });
        });
        this.gridApi.updateRowData({ add: Alist });
      });

  }

  FetchMoreProduct(event) {
    const ResultList = [];
    if (event.Owner.IsVolumetric) {
      const promise = new Promise((resolve, reject) => {
        event.Owner.ProductRequest.GetIsVolumetricProductList(event.SearchOption,
          event.Owner.RegionCode,
          event.term,
          event.PageNumber,
          event.PageSize,
          event.Owner.ProdcutTypeCode,
          true,
          event.Owner.ContractPayDate,
          null,
          event.Owner.selectedContractID).
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
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: ResultList,
          term: event.term,
          TotalItemCount: TotalItemCount,
          PageCount: Math.ceil(TotalItemCount / 30)
        });
      });
    } else {
      const promise = new Promise((resolve, reject) => {
        event.Owner.contractpaydetail.GetContractOrderListByPagination(
          event.SearchOption,
          event.Owner.RegionCode,
          event.term,
          event.PageNumber,
          event.PageSize,
          event.Owner.PopupParam.SelectedContractID,
          event.Owner.ContractPayNo,
          event.Owner.ContractPayDate,
          event.Owner.ProductIDs,
          event.Owner.ProdcutTypeCode).subscribe(res => {
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
  }

  FetchProductByTerm(event) {
    if (event.Owner.IsVolumetric) {
      event.Owner.ProductRequest.GetIsVolumetricProductList(event.SearchOption,
        event.Owner.RegionCode,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        true,
        event.Owner.ContractPayDate,
        null,
        event.Owner.selectedContractID).
        subscribe(res => {
          event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    } else {
      event.Owner.contractpaydetail.GetContractOrderListByPagination(
        event.SearchOption,
        event.Owner.RegionCode,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.PopupParam.SelectedContractID,
        event.Owner.ContractPayNo,
        event.Owner.ContractPayDate,
        event.Owner.ProductIDs,
        event.Owner.ProdcutTypeCode).subscribe(res => {
          event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  RedioSelectedChange(event) {
    if (event.Owner.IsVolumetric) {
      event.Owner.ProductRequest.GetIsVolumetricProductList(event.SearchOption,
        event.Owner.RegionCode,
        '',
        1,
        30,
        event.Owner.ProdcutTypeCode,
        true,
        event.Owner.ContractPayDate,
        null,
        event.Owner.selectedContractID).
        subscribe(res => {
          event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    } else {
      event.Owner.contractpaydetail.GetContractOrderListByPagination(
        event.SearchOption,
        event.Owner.RegionCode,
        '',
        1,
        30,
        event.Owner.PopupParam.SelectedContractID,
        event.Owner.ContractPayNo,
        event.Owner.ContractPayDate,
        event.Owner.ProductIDs,
        event.Owner.ProdcutTypeCode).subscribe(res => {
          event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }
  ShowUnderTakeItemClick() {
    this.contractpaydetail.GetUnderTakeItemsList(this.CostFactorID).subscribe(res => {
      if (res && res.length > 0) {
        this.type = 'app-show-under-take-items';
        this.btnclicked = true;
        this.OverPixelWidth = 1500;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = 160;
        this.startTopPosition = 50;
        this.HeightPercentWithMaxBtn = 58;
        this.MinHeightPixel = 340;
        this.ParamObj = {
          ContractPayCostFactorID: this.CostFactorID,
          undertakerowData: res
        };
      } else {
        this.ShowMessageBoxWithOkBtn('درخواست پرداخت انتخابی فاقد تعهد اعتبار می باشد.');
      }
    });
  }


  PrintSelectedReport(RepType) {
    switch (RepType) {
      case 1:
        this.Report.ContractPayRep(
          this.PopupParam.SelectedContractID,
          this.CostFactorID,
          this.PopupParam.RegionCode,
          2516,
          this.ShowReportsSign,
          'گزارش صورت وضعیت'
        );
        break;
      case 2:
        this.Report.ContractPayDetailsFirstLevelReport(
          2516,
          this.CostFactorID,
          this.PopupParam.SelectedContractID,
          false,
          'گزارش خلاصه مالی کل',
          this.ContractPayNo,
          this.PopupParam.RegionCode,
          this.ShowReportsSign
        );
        break;
      default:
        break;
    }
  }
  OnRowDataChanged() {
    this.SetSumStr();
  }

  OnRowDataUpdated() {
    this.SetSumStr();
  }

  OnFilterChanged() {
    this.SetSumStr();
  }

  SetSumStr() { // RFC 58888
    let sumContractPayItemAmount = 0;
    let sumFinalAmount = 0;
    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.ContractPayItemAmount) {
          // tslint:disable-next-line: radix
          sumContractPayItemAmount = sumContractPayItemAmount + parseInt(node.data.ContractPayItemAmount);
        }
        if (node.data.ContractPayItemAmountFinal) {
          // tslint:disable-next-line: radix
          sumFinalAmount = sumFinalAmount + parseInt(node.data.ContractPayItemAmountFinal);
        }
      });
    }
    this.sumContractPayItemAmountStr = sumContractPayItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.sumFinalAmountStr =(sumFinalAmount - this.SumDeductionAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
    //this.sumFinalAmountStr = sumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  OpenBank() {
    const ResultList = [];
    this.Common.GetBankPaging('',
      '',
      1,
      30,
      this.ContractorID ? this.ContractorID : null).subscribe(res => {
        this.BankItems = res.List;
        this.BankTotalItemCount = res.TotalItemCount;
        this.BankPageCount = Math.ceil(res.TotalItemCount / 30);
      });
  }
  FetchMoreBank(event) {
    const ResultList = [];
    this.NgSelectBankParams.loading = true;
    this.Common.GetBankPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.ContractorID ? this.ContractorID : null).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.BankItems = ResultList;
        this.NgSelectBankParams.loading = false;
      }
      );
  }
  doBankSearch(event) {
    this.NgSelectBankParams.loading = true;
    this.Common.GetBankPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.ContractorID ? this.ContractorID : null).subscribe(res => {
        this.BankItems = res.List,
          this.RefreshBankItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'Bank'
          });
      });
  }
  onBankSelectedchanged(ActorID) {
    this.NgSelectBranchParams.selectedObject = null;
    this.OpenBranch();
  }
  FetchMoreBranch(event) {
    const ResultList = [];
    this.NgSelectBranchParams.loading = true;
    this.Common.GetBranchPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectBankParams.selectedObject,
      this.ContractorID ? this.ContractorID : null
    ).subscribe(res => {
      event.CurrentItems.forEach(el => {
        ResultList.push(el);
      });
      res.List.forEach(element => {
        ResultList.push(element);
      });
      this.BranchItems = ResultList;
      this.NgSelectBranchParams.loading = false;
    }
    );
  }
  OpenBranch() {
    const ResultList = [];
    this.Common.GetBranchPaging('',
      '',
      1,
      30,
      this.NgSelectBankParams.selectedObject,
      this.ContractorID ? this.ContractorID : null
    ).subscribe(res => {
      this.BranchItems = res.List;
      this.BranchTotalItemCount = res.TotalItemCount;
      this.BranchPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }
  doBranchSearch(event) {
    this.NgSelectBranchParams.loading = true;
    this.Common.GetBranchPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectBankParams.selectedObject,
      this.ContractorID ? this.ContractorID : null
    ).subscribe(res => {
      this.BranchItems = res.List;
      this.BranchTotalItemCount = res.TotalItemCount;
      this.BranchPageCount = Math.ceil(res.TotalItemCount / 30);
      this.NgSelectBranchParams.loading = false;
    });
  }

  getSumPenaltyAmount(SumPenaltyAmount) {
    if (SumPenaltyAmount) {
      this.SumPenaltyAmountStr = SumPenaltyAmount;
      // tslint:disable-next-line: radix
      this.SumPenaltyAmount = parseInt((SumPenaltyAmount.toString()).replace(/,/g, ''));
    } else {
      this.SumPenaltyAmount = 0;
      this.SumPenaltyAmountStr = '0';
    }
  }

  // --- بدست آوردن میانگین وزنی کار با توجه به تاریخ دوره ---
  SetProgressPercentinDataRow() {
    if (this.DisplayControlls) {
      const ProductIDList = [];
      if (this.gridApi) {
        this.gridApi.forEachNode(node => {
          if (node.data.ProductID) {
            ProductIDList.push(node.data.ProductID);
          }
        });
        this.ContractList.GetProgressPercent(this.selectedContractID,
          this.ContractPayStartDate,
          this.ContractPayEndDate,
          ProductIDList).subscribe(
            res => {
              if (res && res.length > 0) {
                let SumPenaltyAmount = 0;
                this.gridApi.forEachNode(nodee => {
                  res.forEach(item => {
                    if (nodee.data.ProductID === item.ProductID) {
                      nodee.data.ProgressPercent = item.ProgressPercent;
                      nodee.data.PenaltyPercentage = item.PenaltyPercentage;
                      if (nodee.data.ContractPayItemAmountCOEF && !isNullOrUndefined(nodee.data.ContractPayItemAmountCOEF)) {
                        if (nodee.data.ProgressPercent && nodee.data.ProgressPercent > 0) {
                          // tslint:disable-next-line: radix
                          nodee.data.DeductionAmount = parseInt(nodee.data.ProgressPercent) && parseInt(nodee.data.ProgressPercent) > 0 ?
                            (((100 - parseInt(nodee.data.ProgressPercent)) / 100) *
                              nodee.data.ContractPayItemAmountCOEF.toFixed(2)) : 0;
                        }
                        if (nodee.data.PenaltyPercentage && nodee.data.PenaltyPercentage > 0) {
                          // tslint:disable-next-line: radix
                          nodee.data.PenaltyAmount = this.IsGreenSpace ? ((parseInt(nodee.data.PenaltyPercentage) / 100) *
                            // tslint:disable-next-line: radix
                            (parseInt(nodee.data.data.DeductionAmount))).toFixed(2) : ((parseInt(nodee.data.PenaltyPercentage) / 100) *
                              // tslint:disable-next-line: radix
                              (nodee.data.ContractPayItemAmountCOEF - parseInt(nodee.data.DeductionAmount))).toFixed(2);
                        }
                        if (nodee.data.PenaltyAmount && !isNaN(nodee.data.PenaltyAmount) && nodee.data.PenaltyAmount !== 'NaN'
                          // tslint:disable-next-line: radix
                          && !isNullOrUndefined(nodee.data.PenaltyAmount) && parseInt(nodee.data.PenaltyAmount) > 0) {
                          // tslint:disable-next-line: radix
                          SumPenaltyAmount = SumPenaltyAmount + parseInt(nodee.data.PenaltyAmount);
                        }
                      }
                    }
                  });
                });
                this.SumPenaltyAmount = SumPenaltyAmount;
                this.SumPenaltyAmountStr = SumPenaltyAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }
            });
      } else {
      }
    }
  }

  onDifferenceAmountChange(event) {
    if (event && !isNullOrUndefined(event)) {
      this.DifferenceAmountStr = event;
      // tslint:disable-next-line: radix
      this.DifferenceAmount = parseInt((event.toString()).replace(/,/g, ''));
    } else {
      this.DifferenceAmountStr = '';
      this.DifferenceAmount = null;
    }
  }
  onContractPayCoef() {
    if (this.ContractPayID > 0) {
      this.type = 'contract-pay-coef';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 74;
      this.startTopPosition = 19;
      this.ParamObj = {
        HeaderName: 'ضرایب پرداخت قرارداد',
        ContractID: this.PopupParam.SelectedContractID,
        ContractPayID: this.ContractPayID,
        ContractPayNo: this.ContractPayNo,
        ContractAmount: this.PopupParam.ContractAmount,
        SumContractPay: this.sumFinalAmountStr,
        IsViewable: this.ModuleViewTypeCode !== 1 && this.ModuleViewTypeCode !== 100000,
      };
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا درخواست پرداخت قراردادی را ثبت نمایید.');
    }
  }

  UpdateContractPayItems() {
    const ContractPayItemobj = {
      ProductID: null,
      ContractPayItemID: null,
      ContractPayItemAmount: null,
      Qty: null,
    };
    this.gridApi.forEachNode(node => {
      if (node.data.ProductID === 518163) {
        ContractPayItemobj.ContractPayItemID = node.data.ContractPayItemID;
        ContractPayItemobj.ContractPayItemAmount = node.data.ContractPayItemAmount;
        ContractPayItemobj.Qty = node.data.ContractPayItemQty;
      }
    });
    this.contractpaydetail.UpdateContractPayItems(this.ModuleCode, ContractPayItemobj).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
    });


  }


  BtnDeductionInsert() {
    if (this.ContractPayID > 0) {
      this.type = 'app-contract-pay-deduction';
      this.btnclicked = true;
      this.OverPixelWidth = 1500;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 260;
      this.startTopPosition = 50;
      this.HeightPercentWithMaxBtn = 58;
      this.MinHeightPixel = 340;
      this.ParamObj = {
        HeaderName: ' درج کسورات ',
        CostFactorID: this.CostFactorID,
      };
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا درخواست پرداخت قراردادی را ثبت نمایید.');
    }

  }
}
