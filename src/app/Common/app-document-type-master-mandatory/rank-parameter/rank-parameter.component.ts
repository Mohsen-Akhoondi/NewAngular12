import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  CommonService } from 'src/app/Services/CommonService/CommonService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
@Component({
  selector: 'app-rank-parameter',
  templateUrl: './rank-parameter.component.html',
  styleUrls: ['./rank-parameter.component.css']
})
export class RankParameterComponent implements OnInit {
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
  alertMessageParams = {HaveOkBtn: true, message: ''};
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  RankParameterRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(
    private RankParameter: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService
  ) {
    this.columnDef = [
      {
        headerName: 'کد مشخصات رتبه ',
        field: 'RankParameterCode',
        width: 120,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'نام مشخصات رتبه ',
        field: 'RankParameterName',
        width: 335,
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
    this.RankParameterRow = this.RankParameter.GetRankParameterList();
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
      this.RankParameter.SaveRankParameter(rowData, this.ModuleCode).subscribe(res => {
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


