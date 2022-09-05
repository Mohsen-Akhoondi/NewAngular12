import { Component, OnInit, Input } from '@angular/core';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
@Component({
  selector: 'app-workglow-type-module',
  templateUrl: './workglow-type-module.component.html',
  styleUrls: ['./workglow-type-module.component.css']
})
export class WorkglowTypeModuleComponent implements OnInit {

  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApi;
  columnDef;
  private rowSelection;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  IsWeb;
  RegionGroupCode;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  WorkflowTypeModuleRow: any;
  HaveSave = false;
  HaveDelete = false;
  selectedRegionCode;
  NgSelectVSParams = {
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


  constructor(private Cartable: CartableServices,
    private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private RegionGroup: RegionListService,
    private ModuleList: ModuleService,
    private RefreshItems: RefreshServices,
    ) {
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
    this.columnDef = [
      {
        headerName: ' ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: ' واحد اجرایی',
        field: 'RegionName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.RegionGroup.GetRegionList(this.ModuleCode, false , false),
          bindLabelProp: 'RegionName',
          bindValueProp: 'RegionCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionName;

          } else {
            return '';
          }
        },
        editable: true,
        width: 230,
        resizable: true
      },
      {
        headerName: 'نام ماژول',
        field: 'ModuleName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ModuleList.GetModule4WorkFlowTypeModule(),
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
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'نوع نمایش فعالیت',
        field: 'ModuleViewTypeCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
         Params: this.NgSelectVSParams,
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
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetWorkflowType(),
          bindLabelProp: 'WorkflowTypeName',
          bindValueProp: 'WorkflowTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowTypeName;

          } else {
            return '';
          }
        },
        editable: true,
        width: 200,
        resizable: true
      }
    ];
   
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  ngOnInit() {
    this.getRowData();
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
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
  getRowData() {
    this.Cartable.GetWorkflowTypeModule().subscribe(res => {
     this.WorkflowTypeModuleRow = res;
    });

  }
  RowClick(InputValue) {
    // this.selectedRow = InputValue;
    // if (InputValue.data.ModuleName.ModuleCode) {
    //   this.columnDef[3].cellEditorParams.Items = this.Workflow.GetModuleViewTypeList4Transition(InputValue.data.ModuleName.ModuleCode,
    //                                                                                             false);
    // } else {
    //   this.columnDef[3].cellEditorParams.Items = this.Workflow.GetModuleViewTypeList4Transition(InputValue.data.ModuleCode, false);
    // }
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    this.gridApi.forEachNode(function(node) {
      const obj = {
        WorkflowTypeModuleID: node.data.WorkflowTypeModuleID > 0 ? node.data.WorkflowTypeModuleID : -1 ,
        RegionCode: node.data.RegionName.RegionCode ? node.data.RegionName.RegionCode : node.data.RegionCode,
        // tslint:disable-next-line:max-line-length
        ModuleViewTypeID: node.data.ModuleViewTypeCodeName.ModuleViewTypeID ? node.data.ModuleViewTypeCodeName.ModuleViewTypeID : node.data.ModuleViewTypeID,
       // tslint:disable-next-line:max-line-length
        WorkflowTypeCode: node.data.WorkflowTypeName.WorkflowTypeCode ? node.data.WorkflowTypeName.WorkflowTypeCode : node.data.WorkflowTypeCode,
      };
      rowData.push(obj);
    });
    this.Cartable.SaveWorkflowTypeModule(rowData).subscribe(
      res => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      }
    );
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }

  onCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'RegionName') {
      this.selectedRegionCode = event.newValue.RegionCode;
    } else if (event.newValue && event.colDef && event.colDef.field === 'ModuleName') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.ModuleViewTypeName = '';
          node.data.ModuleName = event.newValue;
          node.data.ModuleCode = event.newValue.ModuleCode ? event.newValue.ModuleCode : event.newValue.ModuleName.ModuleCode;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
     }
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ModuleViewTypeCodeName') {// For InvalidSelected When Old IsValid
      this.columnDef[3].cellEditorParams.Params.loading = true;
      this.Workflow.GetModuleViewTypeList4Transition(event.data.ModuleCode, false).subscribe(res => {
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'module-view-type'
        });
      });

    const itemsToUpdate = [];
    this.gridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        node.data.ModuleViewTypeCodeName = event.newValue;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
    this.columnDef[3].cellEditorParams.Params.loading = false;
  }
  }

}
