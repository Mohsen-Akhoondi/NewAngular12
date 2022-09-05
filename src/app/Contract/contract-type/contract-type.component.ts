import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';



@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.css']
})
export class ContractTypeComponent implements OnInit {
  ModuleCode;
  columnDef;
  ContractTypeRow: any;
  HaveSave = true;
  HaveDelete = false;
  selectedRow: any;
  paramObj;
  private gridApi;
  btnclicked = false;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  HaveHeader;
  type: string;


  @ViewChild('IsValid') IsValid: TemplateRef<any>;
  @ViewChild('IsIncome') IsIncome: TemplateRef<any>;
  constructor(
    private User: UserSettingsService,
    private ProductRequest: ProductRequestService,
    private router: Router,
    private route: ActivatedRoute,
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
        headerName: 'کد نوع قرارداد',
        field: 'ContractTypeCode',
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
        headerName: 'نام نوع قرارداد',
        field: 'ContractTypeName',
        width: 300,
        resizable: true,
        editable: true
      },
      {
        headerName: ' نشانگر اعتبار',
        field: 'IsValid',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'درآمدی',
        field: 'IsIncome',
        width: 100,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsIncome
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        resizable: true,
        editable: true
      },
    ]
  }


  ngOnInit() {
    this.ContractTypeRow = of([]);
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
    this.ContractTypeRow = this.ProductRequest.GetContractType();
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
    this.ProductRequest.SaveContractType(rowData).subscribe(
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

