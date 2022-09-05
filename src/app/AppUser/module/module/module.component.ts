import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { of } from 'rxjs';
import { ModuleService } from 'src/app/Services/ModuleService/ModuleService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  NgSelectEStParams = {
    bindLabelProp: 'ApplicationName',
    bindValueProp: 'ApplicationCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Estate-ngsv',
  };
  @ViewChild('IsMenuCustomized') IsMenuCustomized: TemplateRef<any>;
  @ViewChild('IsWindows') IsWindows: TemplateRef<any>;

  ModuleName;
  ModuleCode;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  ModuleRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(
    private AddModule: ModuleService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private RefreshServiceObj: RefreshServices
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'کدماژول',
        field: 'ModuleCode',
        width: 105,
        resizable: true,
        editable: false,
        suppressSizeToFit: true,
      },
      {
        headerName: 'نام ماژول',
        field: 'ModuleName',
        width: 150,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'زیر سیستم',
        field: 'ApplicationName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectEStParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ApplicationName;
          } else {
            return '';
          }
        },


        valueSetter: (params) => {
          if (params.newValue && params.newValue.ApplicationCode) {
            params.data.ApplicationCode = params.newValue.ApplicationCode;
            params.data.ApplicationName = params.newValue.ApplicationName;
            return true;
          } else {
            params.data.ApplicationCode = null;
            params.data.ApplicationName = null;
            return false;
          }

        },
        width: 120,
        resizable: true,
        editable: true
      },
      {
        headerName: 'منو سفارشی',
        field: 'IsMenuCustomized',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsMenuCustomized
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'نشانگر ویندوز',
        field: 'IsWindows',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsWindows
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 335,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      }
    ];
  }

  ngOnInit() {
    this.ModuleRow = of([]);
    this.getRowData();
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
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
  }


  getRowData() {
    this.ModuleRow = this.AddModule.GetWebModules();
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  onSave() {

    this.gridApi.stopEditing();
    const rowData = [];

    this.gridApi.forEachNode(res => {  
      rowData.push(res.data);
    });

      this.AddModule.SaveModule(rowData).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ngOnInit();
      });
    
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }

  onellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'ApplicationName') {
      this.AddModule.GetAllApplication().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Estate-ngsv'
        });
      });
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
}
