import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-evaluate-type-page',
  templateUrl: './evaluate-type-page.component.html',
  styleUrls: ['./evaluate-type-page.component.css']
})
export class EvaluateTypePageComponent implements OnInit {
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
  HaveHeader: boolean;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  @Input() PopupParam;
  RowData: any = [];
  CostTypeList = [
    { IsCost: 1, CostTypeName: 'هزینه ای' },
    { IsCost: 0, CostTypeName: 'درآمدی' }
  ];
  CostTypeParams = {
    bindLabelProp: 'CostTypeName',
    bindValueProp: 'IsCost',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Cost-Type',
  };

  constructor(private route: ActivatedRoute,
    private User: UserSettingsService,
    private router: Router,
    private srv: ProductRequestService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ماهیت',
        field: 'CostTypeName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.CostTypeParams,
            Items: this.CostTypeList,
            Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CostTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.CostTypeName !== params.oldValue) {
              params.data.CostTypeName = params.newValue.CostTypeName;
              params.data.IsCost = params.newValue.IsCost;
              return true;
            }
          } else {
            params.data.CostTypeName = null;
            params.data.IsCost = null;
           return false;
          }
        },
        editable: true,
        width: 120,
        resizable: true,
      },
      {
        headerName: 'کد نوع ارزیابی',
        field: 'EvaluateTypeCode',
        width: 120,
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
        headerName: 'نام نوع ارزیابی ',
        field: 'EvaluateTypeName',
        width: 248,
        resizable: true,
        editable: true
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
    this.GetAllEvaluateType();
  }
  GetAllEvaluateType() {
    this.srv.GetAllEvaluateType().subscribe(res => {
      this.RowData = res;
    });
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
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
      const EvaluateType = {
        EvaluateTypeCode: res.EvaluateTypeCode,
        EvaluateTypeName: res.EvaluateTypeName,
        IsCost: res.IsCost
      };
      this.Dto.push(EvaluateType);
    });
    this.srv.SaveEvaluateType(this.Dto).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      this.srv.GetAllEvaluateType().subscribe((res2: any) => {
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
