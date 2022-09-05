import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { isNumber } from 'util';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';

@Component({
  selector: 'app-module-view-type-document',
  templateUrl: './module-view-type-document.component.html',
  styleUrls: ['./module-view-type-document.component.css']
})
export class ModuleViewTypeDocumentComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('ReadOnlyType') ReadOnlyType: TemplateRef<any>;
  columnDef;
  RowData: any = [];
  gridApi;
  btnclicked;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ModuleViewTypeList = [];
  ModuleList = [];
  ModuleViewTypeParams = {
    bindLabelProp: 'ModuleViewTypeName',
    bindValueProp: 'ModuleViewTypeID',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '250px',
    type: 'ModuleViewType'
  };
  ModulesParams = {
    bindLabelProp: 'ModuleName',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '250px',
    type: 'Module'
  };
  DocumentTypeParams = {
    bindLabelProp: 'DocumentTypeName',
    bindValueProp: 'DocumentTypeCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '250px',
    type: 'DocumentType'
  };
  DocumentTypeList = [];
  isClicked = false;
  PopUpType = '';
  HaveHeader = true;
  HaveMaxBtn = false;
  startLeftPosition = 0;
  startTopPosition = 0;
  constructor(
    private ModuleServices: ModuleService,
    private CommonServices: CommonService,
    private RefreshServiceObj: RefreshServices,
    private WorkflowServices: WorkflowService) {
  }

  ngOnInit() {

  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ماژول',
        field: 'ModuleName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.ModulesParams,
          Items: [],
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
          if (params.newValue) {
            if (params.newValue.ModuleName !== params.oldValue) {
              params.data.ModuleName = params.newValue.ModuleName;
              params.data.ModuleCode = params.newValue.ModuleCode;
              return true;
            }
          } else {
            params.data.ModuleName = null;
            params.data.ModuleCode = null;
            return false;
          }
        },
        editable: true,
        width: 220,
        resizable: true
      },
      {
        headerName: 'نوع نمایش فعالیت',
        field: 'ModuleViewTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.ModuleViewTypeParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ModuleViewTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.ModuleViewTypeName !== params.oldValue) {
              params.data.ModuleViewTypeName = params.newValue.ModuleViewTypeName;
              params.data.ModuleViewTypeID = params.newValue.ModuleViewTypeID;
              return true;
            }
          } else {
            params.data.ModuleViewTypeName = null;
            params.data.ModuleViewTypeID = null;
            return false;
          }
        },
        editable: true,
        width: 220,
        resizable: true
      },
      {
        headerName: 'گروه مستندات',
        field: 'DocumentTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.DocumentTypeParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.DocumentTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.DocumentTypeName !== params.oldValue) {
              params.data.DocumentTypeName = params.newValue.DocumentTypeName;
              params.data.DocumentTypeCode = params.newValue.DocumentTypeCode;
              return true;
            }
          } else {
            params.data.DocumentTypeName = null;
            params.data.DocumentTypeCode = null;
            return false;
          }
        },
        editable: true,
        width: 220,
        resizable: true
      },
      {
        headerName: 'فقط خواندنی',
        field: 'ReadOnly',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ReadOnlyType
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.ReadOnly = true;
            return true;
          } else {
            params.data.ReadOnly = false;
            return false;
          }
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true,
        editable: true
      },
    ];
    forkJoin([
      this.CommonServices.GetModuleViewTypeDocumentList()
    ]).subscribe(res => {
      this.RowData = res[0];
    });
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  onSave() {
    this.gridApi.stopEditing();
    const GridData = [];
    this.gridApi.forEachNode(res => {
      GridData.push(res.data);
    });
    this.CommonServices.SaveModuleViewTypeDocument(GridData).subscribe(res => {
      if (res) {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
      } else {
        this.ShowMessageBoxWithOkBtn('ثبت با مشکل مواجه شده است.');
      }
    });
  }
  closeModal() {
    this.Closed.emit(true);
  }
  popupclosed() {
    this.isClicked = false;
    this.PopUpType = '';
  }
  onellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ModuleViewTypeName') {
      this.ModuleServices.GetListByModuleCode(event.data.ModuleCode, false).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ModuleViewType'
        });
      });
    } else if (event.colDef && event.colDef.field === 'ModuleName') {
      this.WorkflowServices.GetModuleList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Module'
        });
      });
    } else if (event.colDef && event.colDef.field === 'DocumentTypeName') {
      this.CommonServices.GetMasterDocumentList().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'DocumentType'
        });
      });
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
}
