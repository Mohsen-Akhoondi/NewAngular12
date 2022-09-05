import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-workflow-status-page',
  templateUrl: './workflow-status-page.component.html',
  styleUrls: ['./workflow-status-page.component.css']
})
export class WorkflowStatusPageComponent implements OnInit {
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
  WorkflowStatusRow: any;
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
        width: 90,
        resizable: true,
      },
      {
        headerName: 'کد وضعیت گردش کار ',
        field: 'WorkflowStatusCode',
        width: 125,
        resizable: true,
        maxlength: 3,
        editable: true,
      },
      {
        headerName: 'نام وضعیت گردش کار ',
        field: 'WorkflowStatusName',
        width: 130,
        resizable: true,
        editable: true
      },
      {
        headerName: 'توضیحات ',
        field: 'Note',
        width: 350,
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
    this.WorkflowStatusRow = this.Workflow.GetWorkflowStatus();
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
    this.Workflow.SaveWorkflowStatus(rowData).subscribe(res => {
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
