import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { ContractCoefTypeServices } from 'src/app/Services/ContractService/BasemodulesService/ContractCoefTypeService/ContractCoefTypeServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-contract-coef-type',
  templateUrl: './contract-coef-type.component.html',
  styleUrls: ['./contract-coef-type.component.css']
})
export class ContractCoefTypeComponent implements OnInit {
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
  ContractCoefTypeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(
    private ContractCoef: ContractCoefTypeServices,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService
  ) {
    this.columnDef = [
      {
        headerName: 'کد ضرایب قرارداد ',
        field: 'ContractCoefTypeCode',
        width: 105,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'نام ضرایب قرارداد ',
        field: 'ContractCoefTypeName',
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
    this.ContractCoefTypeRow = this.ContractCoef.GetContractCoefType();
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
      this.ContractCoef.SaveContractCoefType(rowData).subscribe(res => {
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

