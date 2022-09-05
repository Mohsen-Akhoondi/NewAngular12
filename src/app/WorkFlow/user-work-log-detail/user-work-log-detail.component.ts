import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { Observable } from 'rxjs';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-user-work-log-detail',
  templateUrl: './user-work-log-detail.component.html',
  styleUrls: ['./user-work-log.detail.component.css']
})

export class UserWorkLogDetailComponent implements OnInit {
  @Output() UserWorkLogDetailViewClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupParam;
  HasSave: boolean;
  Subject: any;
  MinHeightPixel;
  PixelHeight;
  paramObj;
  HeightPercentWithMaxBtn;
  LetterNo: any;
  DisableRevoke = false;
  FinYearCode: any;
  ContractNo: any;
  gridApiHistory: any;
  gridApiLog: any;
  ParentModuleCode: number;
  ContractCode: any;
  ContractPayTypeName: any;
  ContractPayDate: any;
  ContractPayTechnicalCode: any;
  ContractId: any;
  btnclicked: boolean;
  ContractorName: any;
  rowData: any;
  rowDataHistory: any;
  SelectedRow: any;
  SelectedRowHistory: any;
  OrderDate: any;
  OrderNo: any;
  ContractTypeName: any;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: true, HaveNoBtn: true };
  HaveHeader: boolean;
  type: string;
  WorkLogColDef: any;
  DefaultSelectedRow: any;
  WorkLogHistoryColDef: any;
  ContractAmount: any;
  BoxDevHeight: number;
  WorkFlowHistoryStatus: Observable<any>;
  WorkflowOperationList: Observable<any>;
  BoxDevWidth: number;
  LetterDatePersian: any;
  WorkflowType: any;
  WorkFlowInstanceId: any;
  ChangeDetection: boolean;
  gridHeight: number;
  appgridheight: number;
  WorkLogUserColDef: any;
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
    type: 'supplier',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 40, MinTermLenght: 1, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 45, MinTermLenght: 3, SearchOption: 'ActorName' },
        { HeaderCaption: 'نام کاربری', HeaderName: 'UserName', width: 45, MinTermLenght: 3, SearchOption: 'UserName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 40, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 45, },
        { HeaderCaption: 'نام کاربری', width: 45, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  WorkLogUserApi: any;
  rowDataWorkflowLogUser: any;
  DomainItems = [
    { DomainName: 'IR', DomainCode: true },
    { DomainName: 'IRI', DomainCode: false }
  ];
  startLeftPosition;
  startTopPosition;
  isExternall: any;

  // Workflow Type 3 Vriables
  ProductRequestCode: any;
  PersianProductRequestDate: any;
  CostFactorID: any;
  ProductRequestID: any;

  // --------------------------------------------------

  // Workflow Type 17 Vriables
  RegisterInvoiceCode: any;
  PersianRegisterInvoiceDate: any;

  // --------------------------------------------------

  NgSelectRoleItems;
  NgSelectRoleParams = {
    bindLabelProp: 'RoleIDName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'role'
  };

  NgSelectLoginParams = {
    bindLabelProp: 'LoginName',
    bindValueProp: 'UserID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'login-name'
  };

  NgSelectTransitionParams = {
    bindLabelProp: 'TransitionIDTypeName',
    bindValueProp: 'WorkflowTransitionID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'transition'
  };

  NgSelectNodeParams = {
    bindLabelProp: 'WorkflowNodeName',
    bindValueProp: 'WorkflowNodeID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'node'
  };

  NgSelectRelatedParams = {
    bindLabelProp: 'WorkflowLogIDStatusName',
    bindValueProp: 'WorkflowLogID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'related'
  };

  NgSelectWorkflowTypeParams = {
    bindLabelProp: 'WorkflowTypeName',
    bindValueProp: 'WorkflowTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'type'
  };
  Name: string;
  ProviderName: string;
  ProviderIdentityNo: string;
  IdentityNo: string;
  RegisterNo: string;
  ProviderRegNo: string;
  Date: string;
  ProviderDate: string;
  HaveDelete = false;
  OverPixelWidth: number;
  HaveMaxBtn: boolean;
  BtnClickedName: string;

  // ----------------------------------------------------

  @ViewChild('ReadyToConfirm') ReadyToConfirm: TemplateRef<any>;
  @ViewChild('isExternal') isExternal: TemplateRef<any>;
  constructor(private router: Router,
    private Workflow: WorkflowService,
    config: NgSelectConfig,
    private Actor: ActorService,
    private route: ActivatedRoute,
    private RegionGroup: RegionListService,
    private ModuleList: ModuleService,
    private ContractList: ContractListService,
    private RefreshPersonItems: RefreshServices,
    private Users: UserSettingsService,
    private CommonService: CommonServices,
    private ProductService: ProductRequestService,
    private Report: ReportService,) {
    this.gridHeight = 90;
    this.appgridheight = 92;
    this.DefaultSelectedRow = 0;
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });

    this.WorkLogHistoryColDef = [
      {
        headerName: ' ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نوع گردش',
        field: 'WorkFlowStatusName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.WorkFlowHistoryStatus,
          bindLabelProp: 'WorkFlowStatusName',
          bindValueProp: 'WorkFlowStatusCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkFlowStatusName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkFlowStatusName) {
            params.data.WorkFlowStatusName = params.newValue.WorkFlowStatusName;
            params.data.WorkFlowStatusCode = params.newValue.WorkFlowStatusCode;
            return true;
          } else {
            params.data.WorkFlowStatusName = '';
            params.data.WorkFlowStatusCode = null;
            return false;
          }
        },
        editable: this.HasSave,
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'LongPersianWorkFlowHistoryDate',
        width: 200,
        resizable: true,
        editable: this.HasSave,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'LongPersianWorkFlowHistoryDate',
          DateFormat: 'YYYY/MM/DD HH:mm:ss',
          ShowMode: 'daytime',
          WidthPC: 100,
          AppendTo: '.worklog-for-append-date'
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
            params.data.WorkFlowHistoryDate = params.newValue.MDate;
            params.data.LongPersianWorkFlowHistoryDate = params.newValue.SDate;
            return true;
          } else {
            params.data.WorkFlowHistoryDate = null;
            params.data.LongPersianWorkFlowHistoryDate = null;
            return false;
          }
        }
      },
    ];
    this.WorkLogColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نوع گردش',
        field: 'WorkFlowStatusName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.WorkFlowHistoryStatus,
          bindLabelProp: 'WorkFlowStatusName',
          bindValueProp: 'WorkFlowStatusCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkFlowStatusName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkFlowStatusName) {
            params.data.WorkFlowStatusName = params.newValue.WorkFlowStatusName;
            params.data.WorkFlowStatusCode = params.newValue.WorkFlowStatusCode;
            return true;
          } else {
            params.data.WorkFlowStatusName = '';
            params.data.WorkFlowStatusCode = null;
            return false;
          }
        },
        editable: this.HasSave,
        width: 70,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleIDName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRoleParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RoleIDName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RoleIDName) {
            params.data.RoleIDName = params.newValue.RoleIDName;
            params.data.RoleID = params.newValue.RoleID ? params.newValue.RoleID : params.newValue.RoleIDName.RoleID;
            return true;
          } else {
            params.data.RoleIDName = '';
            params.data.RoleID = null;
            return false;
          }
        },
        width: 180,
        resizable: true,
        editable: this.HasSave,
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        width: 200,
        editable: false,
      },
      {
        headerName: 'نام کاربری',
        field: 'LoginName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectLoginParams,
          Items: [],
          Owner: this
        },
        width: 110,
        resizable: true,
        editable: this.HasSave,

        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.LoginName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.LoginName) {
            params.data.LoginName = params.newValue.LoginName;
            params.data.UserID = params.newValue.UserID;
            this.Users.GetUser(params.newValue.UserID).subscribe(res => {
              params.data.isExternal = res.IsExternal;
              params.data.ActorName = res.ActorFullName;
            });
            return true;
          } else {
            params.data.LoginName = '';
            params.data.UserID = null;
            return false;
          }
        },
      },
      {
        headerName: 'دامنه',
        field: 'DomainName',
        width: 45,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectWorkflowTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkflowTypeName) {
            params.data.WorkflowTypeName = params.newValue.WorkflowTypeName;
            params.data.ToWorkflowTypeCode = params.newValue.WorkflowTypeCode;
            return true;
          } else {
            params.data.WorkflowTypeName = '';
            params.data.ToWorkflowTypeCode = null;
            return false;
          }
        },
        width: 180,
        resizable: true,
        editable: this.HasSave,
      },
      {
        headerName: 'مسیر گردش کار',
        field: 'TransitionIDTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectTransitionParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.TransitionIDTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.TransitionIDTypeName) {
            params.data.TransitionIDTypeName = params.newValue.TransitionIDTypeName;
            params.data.WorkflowTransitionID = params.newValue.WorkflowTransitionID;
            return true;
          } else {
            params.data.TransitionIDTypeName = '';
            params.data.WorkflowTransitionID = null;
            return false;
          }
        },
        width: 180,
        resizable: true,
        editable: this.HasSave,
      },
      {
        headerName: 'نود گردش کار',
        field: 'WorkflowNodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectNodeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowNodeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkflowNodeName) {
            params.data.WorkflowNodeName = params.newValue.WorkflowNodeName;
            params.data.WorkflowNodeID = params.newValue.WorkflowNodeID;
            return true;
          } else {
            params.data.WorkflowNodeName = '';
            params.data.WorkflowNodeID = null;
            return false;
          }
        },
        width: 180,
        resizable: true,
        editable: this.HasSave,
      },
      {
        headerName: 'مرتبط',
        field: 'WorkflowLogIDStatusName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRelatedParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowLogIDStatusName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkflowLogIDStatusName) {
            params.data.WorkflowLogIDStatusName = params.newValue.WorkflowLogIDStatusName;
            params.data.RelatedWorkflowLogID = params.newValue.WorkflowLogID;
            return true;
          } else {
            params.data.WorkflowLogIDStatusName = '';
            params.data.RelatedWorkflowLogID = null;
            return false;
          }
        },
        width: 180,
        resizable: true,
        editable: this.HasSave,
      },
      {
        headerName: 'تاریخ',
        field: 'LongPersianWorkFlowDate',
        width: 155,
        resizable: true,
        editable: this.HasSave,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'LongPersianWorkFlowDate',
          DateFormat: 'YYYY/MM/DD HH:mm:ss',
          ShowMode: 'daytime',
          WidthPC: 100,
          AppendTo: '.worklog-for-append-date'
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
            params.data.WorkFlowDate = params.newValue.MDate;
            params.data.LongPersianWorkFlowDate = params.newValue.SDate;
            return true;
          } else {
            params.data.WorkFlowDate = null;
            params.data.LongPersianWorkFlowDate = null;
            return false;
          }
        }
      },
      {
        headerName: 'عملیات',
        field: 'WorkflowOperationName',
        width: 60,
        resizable: true,
        editable: this.HasSave,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.WorkflowOperationList,
          bindLabelProp: 'WorkflowOperationName',
          bindValueProp: 'WorkflowOperationCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowOperationName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkflowOperationName) {
            params.data.WorkflowOperationName = params.newValue.WorkflowOperationName;
            params.data.WorkflowOperationCode = params.newValue.WorkflowOperationCode;
            return true;
          } else {
            params.data.WorkflowOperationName = '';
            params.data.WorkflowOperationCode = null;
            return false;
          }
        }
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: this.HasSave,
        width: 350,
        resizable: true,
        valueSetter: (params) => {
          params.data.Note = params.newValue;
        },
      },
      {
        headerName: 'آماده ارسال',
        field: 'ReadyToConfirm',
        width: 80,
        resizable: true,
        editable: this.HasSave,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererParams: {
          ngTemplate: this.ReadyToConfirm
        },
      }
    ];
    this.WorkLogUserColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'دامنه',
        field: 'DomainName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.DomainItems,
          bindLabelProp: 'DomainName',
          bindValueProp: 'DomainCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.DomainName;
          } else {
            return '';
          }
        },
        valueSetter: (param) => {
          if (param.newValue) {
            param.data.DomainCode = param.newValue.DomainCode;
            param.data.DomainName = param.newValue.DomainName;
            param.data.isExternal = param.newValue.DomainCode;
            return true;
          } else {
            param.data.DomainCode = null;
            param.data.DomainName = null;
            return false;
          }

        },
        editable: this.HasSave,
        width: 60,
        resizable: true
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreWorkflowLogUserPerson,
          FetchByTerm: this.FetchWorkflowLogUserPersonByTerm,
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
        valueSetter: (param) => {
          if (param.newValue && param.newValue.ActorName) {
            param.data.ActorName = param.newValue.ActorName;
            param.data.ActorID = param.newValue.ActorID;
            param.data.UserID = param.newValue.UserID;
            param.data.LoginName = param.newValue.UserName;
            return true;
          } else {
            param.data.ActorName = null;
            param.data.ActorID = null;
            return false;
          }
        },
        editable: this.HasSave,
        width: 360,
        resizable: true
      },
      {
        headerName: 'نام کاربری',
        field: 'LoginName',
        editable: false,
        width: 120,
        resizable: true
      }
    ];
  }

  sizeToFit() {
    this.gridApiHistory.sizeColumnsToFit();
    this.gridApiLog.sizeColumnsToFit();
  }
  ngOnInit(): void {
    this.rowDataHistory = this.rowDataWorkflowLogUser = this.rowData = [];
    this.WorkFlowHistoryStatus = this.Workflow.GetWorkflowStatusListForNg();
    this.WorkflowOperationList = this.Workflow.GetWorkflowOperation();
    this.SetFormData();
    this.FillWorkLog();
    this.HasSave = this.ParentModuleCode === 2793 || this.ParentModuleCode === 2842 || this.ParentModuleCode === 2875 || this.ParentModuleCode === 3029
    || this.ParentModuleCode === 3071 || this.ParentModuleCode === 2948; // ابزار // RFC 52223
    if (this.ParentModuleCode === 2793 || this.ParentModuleCode === 2948) {
      this.DisableRevoke = true;
    }
    if (this.ParentModuleCode === 2785 || this.ParentModuleCode === 2784) {
      this.HasSave = this.PopupParam.IsAdmin;
    }
    if ((this.ParentModuleCode === 2785 || this.ParentModuleCode === 2784 || this.ParentModuleCode === 3029) && this.PopupParam.IsAdmin) {
      this.HaveDelete = true;
    }
  }
  FillWorkLog() {
    this.Workflow.GetWorkLogByInstance2(this.WorkFlowInstanceId).subscribe(res => {
      this.rowData = res;
    });
  }
  RowClickHistory(input) {
    this.SelectedRowHistory = input;
  }
  RowClick(input) {
    this.SelectedRow = input.data;
    if (!input.data.UserID) {
      this.rowDataWorkflowLogUser = []; // ردیف جدید - گرید سمت چپ پایین خالی
      this.rowDataWorkflowLogUser = input.data.WorkflowLogUserList;
      this.rowDataHistory = input.data.WorkFlowHistoryList;
    } else {
      this.rowDataHistory = input.data.WorkFlowHistoryList;
      this.rowDataWorkflowLogUser = [];
    }
  }

  SetFormData() {
    const ParentFormSelectedRow = this.PopupParam;
    this.Subject = ParentFormSelectedRow.Subject;
    this.LetterDatePersian = ParentFormSelectedRow.LetterDatePersian;
    this.LetterNo = ParentFormSelectedRow.LetterNo;
    this.FinYearCode = ParentFormSelectedRow.FinYearCode;
    this.ContractNo = ParentFormSelectedRow.ContractNo;
    this.ContractCode = ParentFormSelectedRow.ContractCode;
    this.ContractorName = ParentFormSelectedRow.ContractorName;
    this.ContractId = ParentFormSelectedRow.ContractId;
    this.ContractTypeName = ParentFormSelectedRow.ContractTypeName;
    this.ContractAmount = ParentFormSelectedRow.ContractAmount;
    this.WorkflowType = ParentFormSelectedRow.workflowtypeStatus;
    this.OrderNo = ParentFormSelectedRow.OrderNo;
    this.WorkFlowInstanceId = ParentFormSelectedRow.WorkFlowInstanceId;
    this.OrderDate = ParentFormSelectedRow.OrderDate;
    this.ContractPayDate = ParentFormSelectedRow.ContractPayDate;
    this.ParentModuleCode = ParentFormSelectedRow.ParentModuleCode;
    this.ContractPayTechnicalCode = ParentFormSelectedRow.ContractPayTechnicalCode;
    this.ProductRequestCode = ParentFormSelectedRow.ProductRequestCode,
      this.PersianProductRequestDate = ParentFormSelectedRow.PersianProductRequestDate;
    this.CostFactorID = ParentFormSelectedRow.CostFactorID;
    this.ProductRequestID = ParentFormSelectedRow.ProductRequestID;
    this.RegisterInvoiceCode = ParentFormSelectedRow.RegisterInvoiceCode;
    this.PersianRegisterInvoiceDate = ParentFormSelectedRow.PersianRegisterInvoiceDate;
    this.BoxDevHeight = 70;
    this.BoxDevWidth = 100;
    this.gridHeight = this.WorkflowType === 3 || this.WorkflowType === 11 || this.WorkflowType === 17 ? 90 : 80; // 98 : 90 // RFC 52223
    this.Name = this.ParentModuleCode === 2784 ? 'نام شخص' : 'نام شرکت'; // RFC 52927
    this.ProviderName = ParentFormSelectedRow.Name; // RFC 52927
    this.IdentityNo = this.ParentModuleCode === 2784 ? 'کد ملی' : 'شناسه ملی'; // RFC 52927
    this.ProviderIdentityNo = ParentFormSelectedRow.IdentityNo; // RFC 52927
    this.RegisterNo = this.ParentModuleCode === 2784 ? 'کد اقتصادی' : 'شماره ثبت'; // RFC 52927
    this.ProviderRegNo = ParentFormSelectedRow.RegisterNo; // RFC 52927
    this.Date = this.ParentModuleCode === 2784 ? 'تاریخ تولد' : 'تاریخ ثبت'; // RFC 52927
    this.ProviderDate = ParentFormSelectedRow.Date; // RFC 52927
  }

  HistoryCellValueChanged(event) {
    this.ChangeDetection = true;
    const items = [];
    this.gridApiHistory.forEachNode(node => {
      items.push(node.data);
    });
    this.SelectedRow.WorkFlowHistoryList = items;
  }
  onHistoryGridReady(params) {
    this.gridApiHistory = params.api;
  }
  onLogGridReady(params) {
    this.gridApiLog = params.api;
  }
  onWorkLogUserGridReady(params) {
    this.WorkLogUserApi = params.api;
  }
  onWorkLogUserValueChanged(event) {
    const items = [];
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.WorkLogUserApi.forEachNode(node => {
        node.data.UserID = node.data.UserID;
        items.push(node.data);
      });
      this.SelectedRow.WorkflowLogUserList = items;
    }
  }

  // -----------------------------
  SaveWorkLogHistory() {

    if (this.ParentModuleCode !== 2824) {
      const WorkLogList = [];
      const WorkLogUserList = [];
      this.gridApiHistory.stopEditing();
      this.gridApiLog.stopEditing();
      this.WorkLogUserApi.stopEditing();
      if (this.gridApiLog) {
        this.gridApiLog.forEachNode(worklog => {
          worklog.data.WorkFlowDate = this.CommonService.ConvertToASPDateTime(worklog.data.WorkFlowDate);
          if (worklog.data && worklog.data.WorkFlowHistoryList) {
            worklog.data.WorkFlowHistoryList.forEach(h => {
              h.WorkFlowHistoryDate = this.CommonService.ConvertToASPDateTime(h.WorkFlowHistoryDate);
            });
          }
          WorkLogList.push(worklog.data);
        });
      }

      if (this.WorkLogUserApi) {
        this.WorkLogUserApi.forEachNode(worklog => {
          WorkLogUserList.push(worklog.data);
        });
      }
      this.Workflow.SaveWorkLogHistory(WorkLogList, this.WorkFlowInstanceId,
        this.ParentModuleCode).subscribe((res: any) => {
          this.rowData = res;
          this.ShowMessageBoxWithOkBtn('عملیات موفقیت آمیز بود');
          this.FillWorkLog();
        },
          (err: any) => {
            this.FillWorkLog();
          });
    }
  }
  // ----------------------------------
  closeModal() {
    this.UserWorkLogDetailViewClosed.emit(true);
  }

  // ------------------------
  FetchWorkflowLogUserPersonByTerm(event) {
    if (event.Owner.isExternall !== null) {
      event.Owner.WorkLogUserColDef[2].cellEditorParams.Params.loading = true;
      event.Owner.Actor.GetPersonsWidthUsersPaging(event.PageNumber, event.PageSize,
        event.term, event.SearchOption,
        event.Owner.isExternall).subscribe(res => {
          event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'supplier'
          });
        });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا ابتدا دامنه را انتخاب نمایید');
    }
  }
  FetchMoreWorkflowLogUserPerson(event) {
    event.Owner.WorkLogUserColDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    if (event.Owner.isExternall !== null) {
      const promise = new Promise((resolve, reject) => {
        event.Owner.Actor.GetPersonsWidthUsersPaging(event.PageNumber, event.PageSize,
          event.term, event.SearchOption,
          event.Owner.isExternall).subscribe(res => {
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
          type: 'supplier'
        });
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا ابتدا دامنه را انتخاب نمایید');
    }
  }
  onWorkflowLogUsercellEditingStarted(event) {
    this.WorkLogUserApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.isExternall = node.data.isExternal;
        event.data.isExternal = this.isExternall;
      }
    });

    if (event.colDef && event.colDef.field === 'ActorName') {
      if (event.data.isExternal !== null) {
        this.WorkLogUserColDef[2].cellEditorParams.Params.loading = true;
        // tslint:disable-next-line: max-line-length
        this.Actor.GetPersonsWidthUsersPaging(1, 30, '', 'IdentityNo', event.data.isExternal).subscribe(res => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'supplier'
          });
        });
      } else {
        this.ShowMessageBoxWithOkBtn('لطفا ابتدا دامنه را انتخاب نمایید');
      }
    }
  }
  WorkLog_onCellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'LoginName') {
      this.Users.GetUserList(event.data.RoleID).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'login-name'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'RoleIDName') {
      this.ContractList.GetRolesList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'role'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'TransitionIDTypeName') {
      this.Workflow.ListAllTransition(event.data.ToWorkflowTypeCode).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'transition'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'WorkflowNodeName') {
      this.Workflow.GetWorkflowNode().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'node'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'WorkflowLogIDStatusName') {
      const WorkflowLogList = [];
      if (this.gridApiLog) {
        this.gridApiLog.forEachNode(worklog => {
          if (worklog.data && worklog.data.WorkflowLogID) {
            WorkflowLogList.push(worklog.data.WorkflowLogID);
          }
        });
      }
      this.Workflow.ListAllWorkLog(this.WorkFlowInstanceId, WorkflowLogList).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'related'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'WorkflowTypeName') {
      this.Workflow.GetWorkflowType().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'type'
        });
      });
    }
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
  }
  // ------------------------

  Log_onDeletedRow(event) {
    this.rowDataHistory = [];
    this.rowDataWorkflowLogUser = [];
  }
  History_onDeletedRow(event) {
    if (event) {
      const items = [];
      this.gridApiHistory.forEachNode(node => {
        items.push(node.data);
      });
      this.gridApiHistory.updateRowData({ update: items });
      this.SelectedRow.WorkFlowHistoryList = items;
    }
  }
  WorkflowLogUser_onDeletedRow(event) {
    if (event) {
      const items = [];
      this.WorkLogUserApi.forEachNode(node => {
        items.push(node.data);
      });
      this.WorkLogUserApi.updateRowData({ update: items });
      this.SelectedRow.WorkflowLogUserList = items;
    }
  }
  popupclosed(event) {
    this.btnclicked = false;
  }
  onShowReport() {
    if (this.rowData && this.rowData.length) {
      if (this.rowData[this.rowData.length - 1].WorkFlowStatusCode !== 6) {
        this.Workflow.GetVWWorkListByInstanceID(this.WorkFlowInstanceId).subscribe(res => {
          this.Report.ShowReport(this.rowData[this.rowData.length - 1].WorkflowLogID,
            res.WorkflowInstanceID,
            res.ObjectID,
            res.ObjectCode,
            res.ObjectNo,
            res.ObjectPersianDate,
            res.ObjectSubject,
            res.ObjectActorName,
            res.WorkflowTypeCode,
            res.WorkflowTypeName,
            99999,
            res.RegionCode,
            this.HasSave); // RFC 51581
        });
      } else {
        this.Workflow.GetVWWorkCompletedByInstanceID(this.WorkFlowInstanceId).subscribe(res => {
          this.Report.ShowReport(this.rowData[this.rowData.length - 1].WorkflowLogID,
            res.WorkflowInstanceID,
            res.ObjectID,
            res.ObjectCode,
            res.ObjectNo,
            res.ObjectPersianDate,
            res.ObjectSubject,
            res.ObjectActorName,
            res.WorkflowTypeCode,
            res.WorkflowTypeName,
            99999,
            res.RegionCode,
            this.HasSave); // RFC 51581
        });
      }
    }
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverPixelWidth = null;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 540;
    this.startTopPosition = 240;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.onDeleteclick();
    }
  }

  DoDeleteWorkFlowInstance() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا مایل به حذف گردش می باشید؟');
  }

  onDeleteclick() {
    this.ProductService.DeleteWorkFlowInstance(this.WorkFlowInstanceId, this.PopupParam.ParentModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف گردش انجام شد.');
      this.closeModal();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('عملیات با شکست مواجه شد.');
      });
  }
  onClickRevoke() {
    const ObjectID = this.ParentModuleCode === 2948 ? this.PopupParam.InvoiceID :
      this.ParentModuleCode === 2793 ? this.ProductRequestID : null;
    this.ProductService.RevokeProductRequest(
      ObjectID, 
      this.PopupParam.ParentModuleCode,
      null,
      null,
      this.WorkFlowInstanceId).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('درخواست با موفقیت ابطال شد');
      this.ngOnInit();
    });
  }
  BtnVeiwclick(){
    this.gridApiHistory.stopEditing();
     this.type = 'user-work-log-detail-graph';
     this.btnclicked = true;
     this.HaveHeader = true;
     this.HaveMaxBtn = true;
     this.startTopPosition =10;
    this.startLeftPosition = 110;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 625;
    this.PixelHeight = 650;
    this.paramObj = {
      HeaderName: 'مشاهده گراف جزئیات گردش کار',
      WorkFlowInstanceIdSelected :  this.WorkFlowInstanceId
     };
   }
}

