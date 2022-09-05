import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-product-request-coef-type',
  templateUrl: './product-request-coef-type.component.html',
  styleUrls: ['./product-request-coef-type.component.css']
})
export class ProductRequestCoefTypeComponent implements OnInit {
  ModuleCode;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  PRCoefTypeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(
    private ProductRequest: ProductRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService) {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 70,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'کد ضرایب درخواست ',
        field: 'ProductRequestCoefTypeCode',
        width: 125,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'نام ضرایب درخواست ',
        field: 'ProductRequestCoefTypeName',
        width: 230,
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
    this.PRCoefTypeRow = this.ProductRequest.GetProductRequestCoefType();
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
    this.ProductRequest.SaveProductRequestCoefType(rowData).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    },
      // err => {
      //   this.btnclicked = true;
      //   this.type = 'message-box';
      //   this.HaveHeader = true;
      //   this.alertMessageParams.message = 'ثبت با مشکل مواجه شد!';
      // }
    );
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }

}
