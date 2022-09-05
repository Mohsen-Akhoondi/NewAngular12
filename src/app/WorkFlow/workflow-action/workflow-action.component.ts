import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-workflow-action',
  templateUrl: './workflow-action.component.html',
  styleUrls: ['./workflow-action.component.css']
})


export class WorkflowActionComponent implements OnInit {
  ModuleCode;
  columnDef;
  private rowSelection;
  btnclicked = false;
  selectedRow: any;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  HaveSave = false;
  HaveDelete = false;
  WorkflowActionTypeRow: any;
  private gridApi;

  constructor(

    private Workflow: WorkflowService,
    private ProductRequest: ProductRequestService,
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
        headerName: 'کد نوع اقدام مکانیزه ',
        field: 'WorkflowActionTypeCode',
        width: 130,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'نام نوع اقدام مکانیزه ',
        field: 'WorkflowActionTypeName',
        width: 370,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
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
  }

  getRowData() {
    this.Workflow.GetWorkflowActionType().subscribe(res => {
      this.WorkflowActionTypeRow = res;
    });
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
    this.Workflow.SaveWorkflowActionType(rowData).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد!';
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
