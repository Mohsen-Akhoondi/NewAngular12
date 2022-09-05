import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-workflow-node-page',
  templateUrl: './workflow-node-page.component.html',
  styleUrls: ['./workflow-node-page.component.css']
})
export class WorkflowNodePageComponent implements OnInit {
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
  WorkflowNodeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  @ViewChild('PriceListTopicIsValid') NodeType: TemplateRef<any>;
  ModuleCode;

  constructor(
    private Workflow: WorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'شناسه نود گردش کار ',
        field: 'WorkflowNodeID',
        width: 120,
        resizable: true,
        editable: true
      },
      {
        headerName: 'نام نود گردش کار ',
        field: 'WorkflowNodeName',
        width: 250,
        resizable: true,
        editable: true
      },
      {
        headerName: 'توضیحات ',
        field: 'Note',
        width: 280,
        resizable: true,
        editable: true
      },
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
    this.WorkflowNodeRow = this.Workflow.GetWorkflowNode();
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
    this.Workflow.SaveWorkflowNode(rowData).subscribe(res => {
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
