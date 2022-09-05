import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-responsibility-type-page',
  templateUrl: './responsibility-type-page.component.html',
  styleUrls: ['./responsibility-type-page.component.css']
})
export class ResponsibilityTypePageComponent implements OnInit {
   HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition: number;
  startTopPosition: number;
  isClicked: boolean;
  PopUpType: string;
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
   @Input() PopupParam;
    RowData: any = [];
   ResponsibilityTypeRow: any;
   ManagementTypeParams = {
    bindLabelProp: 'ManagementTypeName',
    bindValueProp: 'ManagementTypeCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'management-type'
  };
  constructor(private route: ActivatedRoute,
              private User: UserSettingsService,
              private router: Router,
              private RefreshItems: RefreshServices,
              private Common: CommonService ) {
    this.columnDef = [
       {
         headerName: 'ردیف',
         field: 'ItemNo',
         width: 80,
         resizable: true
       },
      {
        headerName: 'کد نوع مسئولیت',
        field: 'ResponsibilityTypeCode',
        width: 150,
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
        headerName: 'نام نوع مسئولیت ',
        field: 'ResponsibilityTypeName',
        width: 200,
        resizable: true,
        editable: true
      },
      {
        headerName: ' نوع مدیریت',
        field: 'ManagementTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.ManagementTypeParams,
          Items: [],
        },
         cellRenderer: 'SeRender',
         valueFormatter: function currencyFormatter(params) {
           if (params.value) {
               // return params.value.ManagementTypeCode;
              return params.value.ManagementTypeName;
           } else {
             return '';
           }
         },
         valueSetter: (params) => {
           if (params.newValue && params.newValue.ManagementTypeName) {
             params.data.ManagementTypeName = params.newValue.ManagementTypeName;
             params.data.ManagementTypeCode = params.newValue.ManagementTypeCode;
              return true;
           } else {
             params.data.ManagementTypeCode = null;
             params.data.ManagementTypeName = '';
             return false;
           }
         },
        editable: true,
        width: 200,
        resizable: true,
        sortable: true
      },
    ];
   }
onGridReady(params: { api: any; }) {
  this.gridApi = params.api;
}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.ModuleCode = +params['ModuleCode'];
  });
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
  this.GetAllResponsibilityType();
}
GetAllResponsibilityType() {
   this.Common.GetAllResponsibilityType().subscribe (res => {
    this.RowData = res;
  });
 }
closeModal() {
  this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
}
popupclosed() {
  this.btnclicked = false;
}
oncellEditingStarted(event) {
   if (event.colDef && event.colDef.field === 'ManagementTypeName') {// For InvalidSelected When Old IsValid
      this.Common.GetAllManagementType().subscribe(res => {
      this.RefreshItems.RefreshItemsVirtualNgSelect({
        List: res,
        type: 'management-type'
      });
    });
  }
}
RowClick(InputValue) {
  this.selectedRow = InputValue;
 }
onSave() {
  this.gridApi.stopEditing();
  this.Dto = [];
  this.RowData = [];
  this.gridApi.forEachNode(res => {
    this.RowData.push(res.data);
  });
  this.RowData.forEach(res => {
    const ResponsibilityType = {
      ResponsibilityTypeCode : res.ResponsibilityTypeCode,
      ResponsibilityTypeName : res.ResponsibilityTypeName,
       ManagementTypeCode : res.ManagementTypeCode,
         };
        this.Dto.push(ResponsibilityType);
  });
    this.Common.SaveResponsibilityType(this.Dto).subscribe(res => {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    this.Common.GetAllResponsibilityType().subscribe((res2: any) => {
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


