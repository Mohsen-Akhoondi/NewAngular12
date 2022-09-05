import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-data-dictionary-page',
  templateUrl: './data-dictionary-page.component.html',
  styleUrls: ['./data-dictionary-page.component.css']
})
export class DataDictionaryPageComponent implements OnInit {

  ModuleCode;
  columnDef;
  DataDictionaryRow: any;
  selectedRow: any;
  private gridApi;
  btnclicked = false;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  HaveHeader;
  type: string;
  HaveSave = true;
  HaveDelete = false;

  constructor(
    private User: UserSettingsService,
    private DataDictionary: CommonService,
    private router: Router,
  ) { }

  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد قلم داده',
        field: 'DataDictionaryCode',
        width: 100,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'نام قلم داده',
        field: 'DataDictionaryName',
        width: 300,
        resizable: true,
        editable: true
      },
      {
        headerName: 'شرح قلم داده',
        field: 'Note',
        width: 300,
        resizable: true,
        editable: true
      },
    ]
  }

  ngOnInit() {
    this.DataDictionaryRow = of([]);
    this.getRowData();
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = true;
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
    this.DataDictionaryRow = this.DataDictionary.GetDataDictionary();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  onSave() {
    this.gridApi.stopEditing();
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.DataDictionary.SaveDataDictionary(rowData).subscribe(
      res => {
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
