import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-workflow-status',
  templateUrl: './workflow-status.component.html',
  styleUrls: ['./workflow-status.component.css']
})
export class WorkflowStatusComponent implements OnInit {
  columnDef;
  ModuleCode;
  private gridApi;
  WorkflowStatusRow: any;
  selectedRow: any;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };

  constructor(private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService) 
    {
      this.columnDef = [
        {
          headerName: 'کد وضعیت گردش کار',
          field: 'WorkflowStatusCode',
          width: 130,
          resizable: true,
          editable: true
        },
        {
          headerName: ' نام وضعیت گردش کار',
          field: 'WorkflowStatusName',
          width: 130,
          resizable: true,
          editable: true

        },
        {
          headerName: 'توضیحات',
          field: 'Note',
          width: 200,
          resizable: true,
          editable: true

        }

      ] ;
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });

      
    }

    onGridReady(params) {
      this.gridApi = params.api;
    }
  ngOnInit() {
    this.getRowData();
  }

  getRowData() 
  {
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
    this.Workflow.SaveNewWorkflowStatus(rowData).subscribe(res => {
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
