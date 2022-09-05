import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isUndefined } from 'util';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-workflow-type-form',
  templateUrl: './workflow-type-form.component.html',
  styleUrls: ['./workflow-type-form.component.css']
})
export class WorkflowTypeFormComponent implements OnInit {
  @Input() PopupParam;
  @Output() WorkflowTypeOutPutPram: EventEmitter<any> = new EventEmitter<any>();
  @Output() WorkflowTypeClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ModuleCode;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  WorkflowTypeRow = [];
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  HaveMaxBtn: boolean;
  NgSelectVSParams = {
    bindLabelProp: 'RegionGroupCodeName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'region-group'
  };

  constructor(private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private RegionList: RegionListService,
    private RefreshPersonItems: RefreshServices) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true,
      },
      {
        headerName: 'گروه واحد اجرایی',
        field: 'RegionGroupCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionGroupCodeName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'کد گردش کار ',
        field: 'WorkflowTypeCode',
        width: 90,
        resizable: true,
        editable: true
      },
      {
        headerName: 'نام گردش کار ',
        field: 'WorkflowTypeName',
        width: 120,
        resizable: true,
        editable: true
      },
      {
        headerName: ' شی گردش کار ',
        field: 'WorkflowObjectName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Workflow.GetWorkflowObjectList(0 , false),
          bindLabelProp: 'WorkflowObjectName',
          bindValueProp: 'WorkflowObjectCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkflowObjectName;

          } else {
            return '';
          }
        },
        width: 150,
        resizable: true,
        sortable: true,
        editable: true
      }
    ];
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
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
    this.Workflow.GetWorkflowType().subscribe(res=>{
      this.WorkflowTypeRow = res;
      });
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    const WorkflowTypeList = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    rowData.forEach((item) => {
      let WorkflowTypeCode;
      let WorkflowTypeName;
      let WorkflowObjectCode;
      let RegionGroupCode;
      // tslint:disable-next-line:max-line-length
      if (item.RegionGroupCodeName && !isUndefined(item.RegionGroupCodeName.RegionGroupCode) && item.RegionGroupCodeName.RegionGroupCode != null) {
        RegionGroupCode = item.RegionGroupCodeName.RegionGroupCode;
      } else {
        RegionGroupCode = item.RegionGroupCode;
      }
      WorkflowTypeCode = item.WorkflowTypeCode;
      WorkflowTypeName = item.WorkflowTypeName;
      if (!item.WorkflowObjectName) {
        WorkflowObjectCode = null;
      }

      if (item.WorkflowObjectName && item.WorkflowObjectName.WorkflowObjectCode) {
        WorkflowObjectCode = item.WorkflowObjectName.WorkflowObjectCode;
      }

      if (item.WorkflowObjectName && !item.WorkflowObjectName.WorkflowObjectCode) {
        WorkflowObjectCode = item.WorkflowObjectCode;
      }

      const obj = {
        RegionGroupCode: RegionGroupCode,
        WorkflowTypeCode: WorkflowTypeCode,
        WorkflowTypeName: WorkflowTypeName,
        WorkflowObjectCode: WorkflowObjectCode
      };
      WorkflowTypeList.push(obj);

    });

    this.Workflow.SaveWorkflowType(WorkflowTypeList).subscribe(
      res => {
        if (this.PopupParam) {
          this.btnclicked = true;
          this.type = 'message-box';
          this.HaveHeader = true;
          this.HaveMaxBtn = false;
          this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
          this.WorkflowTypeOutPutPram.emit(true);
          this.WorkflowTypeClosed.emit(true);
        } else {
          this.btnclicked = true;
          this.type = 'message-box';
          this.HaveHeader = true;
          this.HaveMaxBtn = false;
          this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
        }

      },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      }
    );
  }


  closeModal() {
    if (this.PopupParam) {
      this.WorkflowTypeClosed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }
  popupclosed() {
    this.btnclicked = false;
  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'RegionGroupCodeName') {// For InvalidSelected When Old IsValid
      this.RegionList.GetRegionGroupList().subscribe(ress => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: ress,
          type: 'region-group'
        });
      });
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.RegionGroupCodeName = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }
}
