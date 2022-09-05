import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import {  CommonService } from 'src/app/Services/CommonService/CommonService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';


@Component({
  selector: 'app-management-type-page',
  templateUrl: './management-type-page.component.html',
  styleUrls: ['./management-type-page.component.css']
})
export class ManagementTypePageComponent implements OnInit {
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition: number;
  startTopPosition: number;
  isClicked: boolean;
  PopUpType: string;
  RowData: any;
  Dto: any;
  ModuleCode;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  HaveHeader: boolean;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  ManagementTypeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(private route: ActivatedRoute,
    private User: UserSettingsService,
    private ManagementType: CommonService,
    private router: Router, ) {
    this.columnDef = [
       {
         headerName: 'ردیف',
         field: 'ItemNo',
         width: 80,
         resizable: true
       },
      {
        headerName: 'کد نوع مدیریت ',
        field: 'ManagementTypeCode',
        width: 100,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 3},
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
        headerName: 'نام نوع مدیریت ',
        field: 'ManagementTypeName',
        width: 200,
        resizable: true,
        editable: true
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
    this.GetAllManagementType();
  }

GetAllManagementType() {
  this.RowData = [];
  this.ManagementType.GetAllManagementType().subscribe (res => {
    this.RowData = res;
  });
 }

   RowClick(InputValue) {
  this.selectedRow = InputValue;
 }
  ManagementTypeGridReady(event) {
    this.gridApi = event.api;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  RefreshItemNo () {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }
  onSave() {
    this.gridApi.stopEditing();
    this.Dto = [];
    this.RowData = [];
    this.gridApi.forEachNode(res => {
      this.RowData.push(res.data);
    });
    this.RowData.forEach(res => {
      const ManagementType = {
        ManagementTypeCode : res.ManagementTypeCode,
        ManagementTypeName : res.ManagementTypeName,
      };
      this.Dto.push(ManagementType);
    });
    this.ManagementType.SaveManagementType(this.Dto, this.ModuleCode).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      this.ManagementType.GetAllManagementType().subscribe((res2: any) => {
        this.RowData = [];
        this.RowData = res2;
    });
    },
    err => {
      if (!err.error.Message.includes('|')) {
        this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
      }
    });
  }
  popupclosed() {
    this.btnclicked = false;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}

