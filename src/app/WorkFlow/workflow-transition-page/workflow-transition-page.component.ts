import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isUndefined } from 'util';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-workflow-transition-page',
  templateUrl: './workflow-transition-page.component.html',
  styleUrls: ['./workflow-transition-page.component.css']
})
export class WorkflowTransitionPageComponent implements OnInit {
  @Input() PopupParam;
  private gridApi;
  columnDef;
  MinHeightPixel;
  PixelHeight ;
  RowData: any;
  WorkflowTypeListSet = [];
  NgSelectWorkflowTypeParams = {
    Items: [],
    bindLabelProp: 'WorkflowTypeCodeName',
    bindValueProp: 'WorkflowTypeCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  RegionGroupListSet = [];
  NgSelectRegionGroupParams = {
    Items: [],
    bindLabelProp: 'RegionGroupCodeName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  btnclicked = false;
  type: string;
  private defaultColDef;
  private rowSelection;
  selectedRow: any;
  errmsg: string;
  paramObj;
  DuplicateRecordsCount: any;
  InvalidRecords: boolean;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  DuplicateRows: any[];
  HaveSave = false;
  HaveDelete = false;
  CModuleCode;
  HaveMaxBtn = false;
  BeforeCode;
  TotalRowData = [];
  selectedModulCode;
  NgSelectTWNParams = {
    bindLabelProp: 'ToWorkflowNodeIDName',
    bindValueProp: 'ToWorkflowNodeID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'to-workflow-node'
  };
  NgSelectMVTParams = {
    bindLabelProp: 'ModuleViewTypeCodeName',
    bindValueProp: 'ModuleViewTypeID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'module-view-type'
  };
  NgSelectPersonParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'UserID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'person'
  };
  UnitPatternListItem = [];
  UnitPatternParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'UnitPattern'
  };
  Is1578 = false;

  constructor(
    private router: Router,
    private Workflow: WorkflowService,
    config: NgSelectConfig,
    private ContractList: ContractListService,
    private User: UserSettingsService,
    private Actor: ActorService,
    private route: ActivatedRoute,
    private RefreshPersonItems: RefreshServices,
    private RefreshModuleViewTypeItems: RefreshServices,
    private RefreshToWorkflowNodeItems: RefreshServices,
    private RegionList: RegionListService,
    private Product: ProductRequestService 
  ) {
    this.route.params.subscribe(params => {
      this.CModuleCode = +params['ModuleCode'];
    });
    config.notFoundText = 'موردی یافت نشد';
    this.InvalidRecords = false;
    
    this.route.params.subscribe(params => {
      this.CModuleCode = +params['ModuleCode'];
    });
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onChangeRegionGroupObj(selectedRegionGroup) {
    this.NgSelectWorkflowTypeParams.selectedObject = null;
    this.getNewData();
  }

  onChangeWorkflowTypeObj(selectedWorkflowtype) {
    this.RowData = this.WorkflowTypeListSet.find(x => x.WorkflowTypeCode
      === selectedWorkflowtype).WorkflowTransitionViewList;
  }

  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        }       
      },
      {
        headerName: 'نود مبدا',
        field: 'FromWorkflowNodeIDName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetFromWorkflowNodeList(),
          bindLabelProp: 'FromWorkflowNodeIDName',
          bindValueProp: 'FromWorkflowNodeID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value || params.value === 0) {
            return params.value.FromWorkflowNodeIDName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.FromWorkflowNodeIDName) {
            params.data.FromWorkflowNodeIDName = params.newValue.FromWorkflowNodeIDName;
            params.data.FromWorkflowNodeID = params.newValue.FromWorkflowNodeID;
            params.data.FromWorkflowNodeName = params.newValue.FromWorkflowNodeName;
            return true;
          } else {
            params.data.FromWorkflowNodeIDName = '';
            params.data.FromWorkflowNodeID = null;
            return false;
          }
        },
        width: 110,
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        }     
      },
      {
        headerName: 'نوع اقدام ',
        field: 'WorkflowOperationName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetWorkflowOperationList(),
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
        },
        width: 100,
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        }       
      },
      {
        headerName: 'گردش کار مقصد',
        field: 'ToWorkflowTypeCodeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetToWorkflowType(),
          bindLabelProp: 'ToWorkflowTypeCodeName',
          bindValueProp: 'ToWorkflowTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ToWorkflowTypeCodeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ToWorkflowTypeCodeName) {
            params.data.ToWorkflowTypeCodeName = params.newValue.ToWorkflowTypeCodeName;
            params.data.ToWorkflowTypeCode = params.newValue.ToWorkflowTypeCode;
            params.data.ToWorkflowNodeIDName = '';
            params.data.ToWorkflowNodeID = null;
            return true;
          } else {
            params.data.ToWorkflowTypeCodeName = '';
            params.data.ToWorkflowTypeCode = null;
            return false;
          }
        },
        width: 110,
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        }       
      },
      {
        headerName: 'نود مقصد',
        field: 'ToWorkflowNodeIDName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectTWNParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ToWorkflowNodeIDName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ToWorkflowNodeIDName) {
            params.data.ToWorkflowNodeIDName = params.newValue.ToWorkflowNodeIDName;
            params.data.ToWorkflowNodeID = params.newValue.ToWorkflowNodeID;
            params.data.ToWorkflowNodeName = params.newValue.ToWorkflowNodeName;
            return true;
          } else {
            params.data.ToWorkflowNodeIDName = '';
            params.data.ToWorkflowNodeID = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        }       ,
        width: 110,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionCodeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.RegionList.GetRegionList(this.CModuleCode, false, false),
          bindLabelProp: 'RegionCodeName',
          bindValueProp: 'RegionCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionCodeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RegionCodeName) {
            params.data.RegionCodeName = params.newValue.RegionCodeName;
            params.data.RegionName = params.newValue.RegionName;
            params.data.RegionCode = params.newValue.RegionCode;
            return true;
          } else {
            params.data.RegionCodeName = '';
            params.data.RegionCode = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 150,
        resizable: true
      },
      {
        headerName: 'محل هزینه',
        field: 'UnitTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Items: this.UnitPatternListItem,
          Params: this.UnitPatternParams,
          Owner: this
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
            params.data.UnitTopicName = params.newValue.UnitTopicName;
            params.data.UnitPatternID = params.newValue.UnitPatternID;
            return true;
          } else {
            params.data.UnitTopicName = '';
            params.data.UnitPatternID = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 150,
        resizable: true
      },
      {
        headerName: 'نام نقش ',
        field: 'RoleIDName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetRolesList(false),
          bindLabelProp: 'RoleIDName',
          bindValueProp: 'RoleID'
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
            params.data.RoleID = params.newValue.RoleID;
            params.data.PersonName = '';
            params.data.UserID = null;
            return true;
          } else {
            params.data.RoleIDName = '';
            params.data.RoleID = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 140,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'PersonName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectPersonParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PersonName) {
            params.data.PersonName = params.newValue.PersonName;
            params.data.UserID = params.newValue.UserID;
            return true;
          } else {
            params.data.PersonName = '';
            params.data.UserID = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 150,
        resizable: true
      },
      {
        headerName: 'نام ماژول ',
        field: 'ModuleName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetModuleList(),
          bindLabelProp: 'ModuleName',
          bindValueProp: 'ModuleCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ModuleName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ModuleName) {
            params.data.ModuleName = params.newValue.ModuleName;
            params.data.ModuleCode = params.newValue.ModuleCode;
            params.data.ModuleViewTypeCodeName = '';
            params.data.ModuleViewTypeID = null;
            return true;
          } else {
            params.data.ModuleName = '';
            params.data.ModuleCode = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع نمایش فعالیت',
        field: 'ModuleViewTypeCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectMVTParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ModuleViewTypeCodeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ModuleViewTypeCodeName) {
            params.data.ModuleViewTypeCodeName = params.newValue.ModuleViewTypeCodeName;
            params.data.ModuleViewTypeID = params.newValue.ModuleViewTypeID;
            return true;
          } else {
            params.data.ModuleViewTypeCodeName = '';
            params.data.ModuleViewTypeID = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 170,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 300,
        resizable: true
      },
      {
        headerName: 'شرط گردش',
        field: 'FlowCondition',
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 200,
        resizable: true
      },
      {
        headerName: 'حداقل تعداد ارسال',
        field: 'MinimumPosting',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 2 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
      },
      {
        headerName: 'حداقل تعداد دریافت',
        field: 'MinimumReceiving',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 2 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
      },
      {
        headerName: 'حداقل تعداد برگشت',
        field: 'MinimumReturn',
        width: 120,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 2 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        resizable: true,
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
      },
      {
        headerName: 'قبل از اجرا',
        field: 'BeforeFlow',
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 200,
        resizable: true
      },
      {
        headerName: 'بعد از اجرا',
        field: 'AfterFlow',
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 200,
        resizable: true
      },
      {
        headerName: 'بعد از اجرای برنامه',
        field: 'AfterAction',
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 200,
        resizable: true
      },
      {
        headerName: 'نوع اقدام مکانیزه',
        field: 'WorkflowActionTypeCodeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetWfActionTypeList(),
          bindLabelProp: 'WorkflowActionTypeCodeName',
          bindValueProp: 'WorkflowActionTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowActionTypeCodeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkflowActionTypeCodeName) {
            params.data.WorkflowActionTypeCodeName = params.newValue.WorkflowActionTypeCodeName;
            params.data.WorkflowActionTypeCode = params.newValue.WorkflowActionTypeCode;
            params.data.WorkflowActionTypeName = params.newValue.WorkflowActionTypeName;
            return true;
          } else {
            params.data.WorkflowActionTypeName = '';
            params.data.WorkflowActionTypeCode = null;
            return false;
          }
        },
        editable: () => {
          if(this.CModuleCode===3088){
            return false;
          }
          if(!this.Is1578)
          return true;
        },
        width: 120,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.Actor.CheckAdminRole1578().subscribe(res => {
      this.Is1578 = res;
    });
    this.RowData = [];
    this.RegionList.GetRegionGroupList().subscribe(res => {
      this.RegionGroupListSet = res;
      this.NgSelectRegionGroupParams.selectedObject = res[0].RegionGroupCode;
      this.getNewData();
    });
    this.User.GetModulOPByUser(this.CModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          default:
            break;
        }
      });

    });
  }
  getNewData(): void {
    if (this.NgSelectRegionGroupParams.selectedObject !== null && !isUndefined(this.NgSelectRegionGroupParams.selectedObject)) {
      this.Workflow.GetWorkflowList(this.NgSelectRegionGroupParams.selectedObject).subscribe(res => {
        if (res && res.length > 0) {
          this.WorkflowTypeListSet = res;
          this.NgSelectWorkflowTypeParams.selectedObject = res[0].WorkflowTypeCode;
          this.RowData = this.WorkflowTypeListSet.find(x => x.WorkflowTypeCode
            === this.NgSelectWorkflowTypeParams.selectedObject).WorkflowTransitionViewList;
        } else {
          this.NgSelectWorkflowTypeParams.selectedObject = null;
          this.WorkflowTypeListSet = [];
          this.RowData = [];
        }
      });
    } else {
      this.WorkflowTypeListSet = [];
      this.RowData = [];
    }
  }
  TransitionRowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onCellValueChanged(event) {
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ToWorkflowNodeIDName') {// For InvalidSelected When Old IsValid
      this.columnDef[4].cellEditorParams.Params.loading = true;
      if (event.data.ToWorkflowTypeCode) {
        this.Workflow.GetToWorkflowNodeByToWorkFlowType(event.data.ToWorkflowTypeCode).subscribe(res => {
          this.RefreshToWorkflowNodeItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'to-workflow-node'
          });
        });
      } else {
        this.Workflow.GetToWorkflowNodeList().subscribe(res => {
          this.RefreshToWorkflowNodeItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'to-workflow-node'
          });
        });
      }
      this.columnDef[4].cellEditorParams.Params.loading = false;
    } else if (event.colDef && event.colDef.field === 'PersonName') {// For InvalidSelected When Old IsValid
      this.columnDef[8].cellEditorParams.Params.loading = true;
      this.Workflow.GetWorkflowUserList(event.data.RoleID, false).subscribe(ress => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: ress,
          type: 'person'
        });
      });
      this.columnDef[8].cellEditorParams.Params.loading = false;
    } else if (event.colDef && event.colDef.field === 'ModuleViewTypeCodeName') {
      // For InvalidSelected When Old IsValid
      this.columnDef[10].cellEditorParams.Params.loading = true;
      this.Workflow.GetModuleViewTypeList4Transition(event.data.ModuleCode, false).subscribe(res => {

        this.RefreshModuleViewTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'module-view-type'
        });
      });
      this.columnDef[10].cellEditorParams.Params.loading = false;
    } else if (event.colDef && event.colDef.field === 'UnitTopicName') {
      if (event.data.RegionCode != null) {
        this.Product.GetUnitPatternByRegionCode(event.data.RegionCode, false).subscribe(res => {
          this.RefreshModuleViewTypeItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'UnitPattern'
          });
        });
      }
    }
  }

  Refresh(event) {
    this.getNewData();
  }

  onSave() {
    this.gridApi.stopEditing();
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    const WorkflowTransitionList = [];
    rowData.forEach(item => {
      let WorkflowTypeCode;
      let FromWorkflowNodeID;
      let WorkflowOperationCode;
      let ToWorkflowNodeID;
      let RoleID;
      let UserID;
      let ModuleViewTypeID;
      let BeforeFlow;
      let AfterFlow;
      let AfterAction;
      let FlowCondition;
      let ItemNo;
      let MinimumPosting;
      let MinimumReturn;
      let Note;
      let ToWorkflowTypeCode;
      let MinimumReceiving;
      let RegionCode;
      let UnitPatternID;
      let WorkflowActionTypeCode;

      if (item.WorkflowTypeCode) {
        WorkflowTypeCode = item.WorkflowTypeCode;
      } else { WorkflowTypeCode = this.NgSelectWorkflowTypeParams.selectedObject; }

      // tslint:disable-next-line:max-line-length
      if (item.FromWorkflowNodeIDName && !isUndefined(item.FromWorkflowNodeIDName.FromWorkflowNodeID) && item.FromWorkflowNodeIDName.FromWorkflowNodeID != null) {
        FromWorkflowNodeID = item.FromWorkflowNodeIDName.FromWorkflowNodeID;
      } else { FromWorkflowNodeID = item.FromWorkflowNodeID; }

      if (item.WorkflowOperationName && item.WorkflowOperationName.WorkflowOperationCode) {
        WorkflowOperationCode = item.WorkflowOperationName.WorkflowOperationCode;
      } else { WorkflowOperationCode = item.WorkflowOperationCode; }

      if (!item.ToWorkflowTypeCodeName) {
        ToWorkflowTypeCode = null;
      }

      if (item.ToWorkflowTypeCodeName && item.ToWorkflowTypeCodeName.ToWorkflowTypeCode) {
        ToWorkflowTypeCode = item.ToWorkflowTypeCodeName.ToWorkflowTypeCode;
      }

      if (item.ToWorkflowTypeCodeName && !item.ToWorkflowTypeCodeName.ToWorkflowTypeCode) {
        ToWorkflowTypeCode = item.ToWorkflowTypeCode;
      }

      // tslint:disable-next-line:max-line-length
      if (item.ToWorkflowNodeIDName && !isUndefined(item.ToWorkflowNodeIDName.ToWorkflowNodeID) && item.ToWorkflowNodeIDName.ToWorkflowNodeID != null) {
        ToWorkflowNodeID = item.ToWorkflowNodeIDName.ToWorkflowNodeID;
      } else { ToWorkflowNodeID = item.ToWorkflowNodeID; }

      if (item.RoleIDName && item.RoleIDName.RoleID) {
        RoleID = item.RoleIDName.RoleID;
      } else { RoleID = item.RoleID; }

      if (!item.PersonName) { UserID = null; }
      if (item.PersonName && item.PersonName.UserID) {
        UserID = item.PersonName.UserID;
      }
      if (item.PersonName && !item.PersonName.UserID) {
        UserID = item.UserID;
      }
      if (item.ModuleViewTypeCodeName && item.ModuleViewTypeCodeName.ModuleViewTypeID) {
        ModuleViewTypeID = item.ModuleViewTypeCodeName.ModuleViewTypeID;
      } else {
        ModuleViewTypeID = item.ModuleViewTypeID;
      }

      if (item.BeforeFlow) {
        BeforeFlow = item.BeforeFlow;
      } else { BeforeFlow = null; }

      if (item.AfterFlow) {
        AfterFlow = item.AfterFlow;
      } else { AfterFlow = null; }

      if (item.AfterAction) {
        AfterAction = item.AfterAction;
      } else { AfterAction = null; }

      if (item.FlowCondition) {
        FlowCondition = item.FlowCondition;
      } else { FlowCondition = null; }

      ItemNo = item.ItemNo;

      if (item.MinimumPosting) {
        MinimumPosting = item.MinimumPosting;
      } else { MinimumPosting = null; }

      if (item.MinimumReturn) {
        MinimumReturn = item.MinimumReturn;
      } else { MinimumReturn = null; }

      if (item.Note) {
        Note = item.Note;
      } else { Note = null; }

      if (item.MinimumReceiving) {
        MinimumReceiving = item.MinimumReceiving;
      } else { MinimumReceiving = null; }

      if (!item.RegionCodeName) {
        RegionCode = null;
      }

      // tslint:disable-next-line: max-line-length
      if (item.RegionCodeName && !isUndefined(item.RegionCodeName.RegionCode) && item.RegionCodeName.RegionCode != null) {
        RegionCode = item.RegionCodeName.RegionCode;
      } else { RegionCode = item.RegionCode; }

      if (item.UnitPatternID) {
        UnitPatternID = item.UnitPatternID
      } else {
        UnitPatternID = null;
      }
      if (item.WorkflowActionTypeCodeName && !isUndefined(item.WorkflowActionTypeCodeName.WorkflowActionTypeCode)
        && item.WorkflowActionTypeCodeName.WorkflowActionTypeCode != null) {
        WorkflowActionTypeCode = item.WorkflowActionTypeCodeName.WorkflowActionTypeCode;
      } else { WorkflowActionTypeCode = item.WorkflowActionTypeCode; }

      const obj = {
        WorkflowTransitionID: item.WorkflowTransitionID,
        WorkflowTypeCode: WorkflowTypeCode,
        FromWorkflowNodeID: FromWorkflowNodeID,
        WorkflowOperationCode: WorkflowOperationCode,
        ToWorkflowNodeID: ToWorkflowNodeID,
        RoleID: RoleID,
        UserID: UserID,
        ModuleViewTypeID: ModuleViewTypeID,
        BeforeFlow: BeforeFlow,
        AfterFlow: AfterFlow,
        AfterAction: AfterAction,
        FlowCondition: FlowCondition,
        ItemNo: ItemNo,
        Note: Note,
        MinimumPosting: MinimumPosting,
        MinimumReturn: MinimumReturn,
        ToWorkflowTypeCode: ToWorkflowTypeCode,
        MinimumReceiving: MinimumReceiving,
        RegionCode: RegionCode,
        UnitPatternID: UnitPatternID,
        WorkflowActionTypeCode: WorkflowActionTypeCode,
      };
      WorkflowTransitionList.push(obj);
    });
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve) => {
      resolve(this.ValidateRecords(WorkflowTransitionList));
    }).then((InvalidRecord: boolean) => {
      if (!InvalidRecord) {
        this.Workflow.SaveWorkflowTransition(this.NgSelectWorkflowTypeParams.selectedObject, WorkflowTransitionList).subscribe(res => {
          this.btnclicked = true;
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
          this.WorkflowTypeListSet.find(x => x.WorkflowTypeCode
            === this.NgSelectWorkflowTypeParams.selectedObject).WorkflowTransitionViewList = rowData;
        },
          err => {
            if (!err.error.Message.includes('|')) {
              this.btnclicked = true;
              this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
            }
          });
      } else {
        this.btnclicked = true;
        this.ShowMessageBoxWithOkBtn('لطفا مقادیر را اصلاح نمایید. ' + 'ردیف های : '
          + this.errmsg + ' دارای تداخل می باشند. امکان ثبت وجود ندارد.');
      }
    });
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

  ValidateRecords(WorkflowTransitionList: any[]): boolean {
    this.InvalidRecords = false;
    this.DuplicateRows = [];
    this.errmsg = '';
    WorkflowTransitionList.sort((one, two) => (one > two ? 1 : -1)).forEach(res => {
      this.DuplicateRecordsCount = WorkflowTransitionList.filter(x => x.FromWorkflowNodeID === res.FromWorkflowNodeID
        && x.ToWorkflowNodeID === res.ToWorkflowNodeID && x.WorkflowOperationCode === res.WorkflowOperationCode &&
        x.UnitPatternID === res.UnitPatternID && x.RegionCode === res.RegionCode && // RFC 56535
        x.ToWorkflowTypeCode === res.ToWorkflowTypeCode && x.ItemNo !== res.ItemNo && // با هماهنگی آقای نیکویی - RFC 52443
        x.FlowCondition === res.FlowCondition);
      if (this.DuplicateRecordsCount.length > 0) {
        this.errmsg += ' { ';
        this.InvalidRecords = true;
        // tslint:disable-next-line: no-shadowed-variable
        this.DuplicateRecordsCount.forEach(res2 => {
          this.DuplicateRows.push(res2);
          this.errmsg += ' ' + res2.ItemNo + ' ';
        });
        this.errmsg += ' } ';
      }
    });
    return this.InvalidRecords;
  }
  addWorkflowType() {
    this.type = 'workflow-type';
    this.btnclicked = true;
    this.OverstartLeftPosition = 150;
    this.OverstartTopPosition = 50;
    this.paramObj = {
      HeaderName: 'افزودن نوع گردش کار'
    };
  }

  popupclosed() {
    this.btnclicked = false;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  Btnclick(){
   this.gridApi.stopEditing();
    this.type = 'work-flow-transition';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverstartTopPosition =16;
    this.OverstartLeftPosition = 116;
    this.MinHeightPixel = 610;
    this.PixelHeight = 610;
    this.paramObj = {
     HeaderName: 'مشاهده مسیر گردش کار',
    workFlowTypeCodeSelected : this.NgSelectWorkflowTypeParams.selectedObject,
    };
  }

}
