import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-variable-type',
  templateUrl: './variable-type.component.html',
  styleUrls: ['./variable-type.component.css']
})
export class VariableTypeComponent implements OnInit {
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
  VariableTypeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(private route: ActivatedRoute,
    private User: UserSettingsService,
    private VariableType: ProductRequestService,
    private router: Router, ) {
    this.columnDef = [
       {
         headerName: 'ردیف',
         field: 'ItemNo',
         width: 80,
         resizable: true
       },
      {
        headerName: 'کد نوع متغیر ',
        field: 'VariableTypeCode',
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
        headerName: 'نام نوع متغیر ',
        field: 'VariableTypeName',
        width: 220,
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
    this.GetAllVariableType();
  }

GetAllVariableType() {
  this.RowData = [];
  this.VariableType.GetAllVariableType().subscribe (res => {
    this.RowData = res;
  });
 }

   RowClick(InputValue) {
  this.selectedRow = InputValue;
 }
 VariableTypeGridReady(event) {
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
      const VariableType = {
        VariableTypeCode : res.VariableTypeCode,
        VariableTypeName : res.VariableTypeName,
      };
      this.Dto.push(VariableType);
    });
    this.VariableType.SaveVariableType(this.Dto).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      this.VariableType.GetAllVariableType().subscribe((res2: any) => {
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
