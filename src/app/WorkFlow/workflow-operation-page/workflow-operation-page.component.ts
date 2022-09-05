import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-workflow-operation-page',
  templateUrl: './workflow-operation-page.component.html',
  styleUrls: ['./workflow-operation-page.component.css']
})
export class WorkflowOperationPageComponent implements OnInit {
  @Input() PopupParam;
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
  WorkflowOpertationRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  ModuleCode;

  constructor(
    private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService
  ) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true,
      },
      {
        headerName: 'کد عملیات گردش کار ',
        field: 'WorkflowOperationCode',
        width: 120,
        resizable: true,
        maxlength: 3,
        editable: true,
      },
      {
        headerName: 'نام عملیات گردش کار ',
        field: 'WorkflowOperationName',
        width: 210,
        resizable: true,
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
    this.WorkflowOpertationRow = this.Workflow.GetWorkflowOperation();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.Workflow.SaveWorkflowOperation(rowData).subscribe(res => {
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
      });
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }

}
