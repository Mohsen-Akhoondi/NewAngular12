import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css']
})
export class RelationTypeComponent implements OnInit {

  @Input() PopupParam;
  private gridColumnApi;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  private gridApi;
  ModuleCode;
  RelationTypeRow: any;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };


  constructor(
    private Common:CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService
  )
  
  {
    this.columnDef = [

      {
        headerName: 'کد نوع ارتباط',
        field: 'RelationTypeCode',
        width:100,
        resizable: true,
        maxlength: 3,
        editable: true,
      },
      {
        headerName: 'نام نوع ارتباط',
        field: 'RelationTypeName',
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

    this.Common.GetRelationTypeList().subscribe(res => {
      this.RelationTypeRow = res;
    
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
    this.Common.SaveRelationTypeList(rowData).subscribe(res => {
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
