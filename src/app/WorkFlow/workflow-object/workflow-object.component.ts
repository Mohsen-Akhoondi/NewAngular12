import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-workflow-object',
  templateUrl: './workflow-object.component.html',
  styleUrls: ['./workflow-object.component.css']
})
export class WorkflowObjectComponent implements OnInit {

  @Input() PopupParam;
  private gridColumnApi;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  private gridApi;
  ModuleCode;
  WorkflowObjectRow: any;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };

  constructor(
    private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService
  ) {
    this.columnDef = [

      {
        headerName: 'کد شي  ',
        field: 'WorkflowObjectCode',
        width:100,
        resizable: true,
        maxlength: 3,
        editable: true,
      },
      {
        headerName: 'نام شي  ',
        field: 'WorkflowObjectName',
        width: 250,
        resizable: true,
        editable: true
      },

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

    this.Workflow.GetWorkflowObject().subscribe(res => {
      this.WorkflowObjectRow = res;
    
    })
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
    this.Workflow.SaveWorkflowObject(rowData).subscribe(res => {
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


