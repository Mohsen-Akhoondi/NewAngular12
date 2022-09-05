import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { DealMethodServices } from 'src/app/Services/DealMethodService/DealMethodService'
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-deal-method',
  templateUrl: './deal-method.component.html',
  styleUrls: ['./deal-method.component.css']
})
export class DealMethodComponent implements OnInit {
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
  DealMethodTypeRow: any;
  HaveSave = true;
  HaveDelete = false;
  private gridApi;

  @ViewChild('IsCostValid') IsCostValid: TemplateRef<any>;
  constructor(private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private ProductRequest: ProductRequestService,
    private DealMethodService: DealMethodServices) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد روش انجام معامله',
        field: 'DealMethodCode',
        width: 335,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'نام روش انجام معامله',
        field: 'DealMethodName',
        width: 335,
        resizable: true,
        editable: true
      },
      {
        headerName: 'هزینه',
        field: 'IsCost',
        width: 335,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsCostValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true,
        editable: true
      },
    ];
  }

  ngOnInit() {
    this.getRowData();
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = true;
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
    this.DealMethodTypeRow = this.DealMethodService.GetDealMethodType();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onSave() {
    this.gridApi.stopEditing();
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.ProductRequest.SaveDealMethodType(rowData).subscribe(
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
}
