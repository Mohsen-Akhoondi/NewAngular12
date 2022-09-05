import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
@Component({
  selector: 'app-commition-proceed-variable',
  templateUrl: './commition-proceed-variable.component.html',
  styleUrls: ['./commition-proceed-variable.component.css']
})
export class CommitionProceedVariableComponent implements OnInit {
  ProductRequestDate;
  PersianProductRequestDate;
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
  VariableTypeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  @Input() PopupParam;
  RowData: any = [];
  CommitionProceedVariableRow: any;
  VariableTypeParams = {
    bindLabelProp: 'VariableTypeName',
    bindValueProp: 'VariableTypeCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'variable-type'
  };
  constructor(private route: ActivatedRoute,
    private User: UserSettingsService,
    private router: Router,
    private RefreshItems: RefreshServices,
    private VariableService: ProductRequestService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: ' نوع متغیر',
        field: 'VariableTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.VariableTypeParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.VariableTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.VariableTypeName) {
            params.data.VariableTypeName = params.newValue.VariableTypeName;
            params.data.VariableTypeCode = params.newValue.VariableTypeCode;
            return true;
          } else {
            params.data.VariableTypeCode = null;
            params.data.VariableTypeName = '';
            return false;
          }
        },
        editable: true,
        width: 210,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'مقدار متغیر',
        field: 'VariableValue',
        editable: true,
        width: 110,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'از تاریخ',
        field: 'PersianStartDate',
        width: 150,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortStartDate = params.newValue.MDate;
            params.data.PersianStartDate = params.newValue.SDate;
            this.gridApi.forEachNode(node => {
            });
            return true;
          } else {
            params.data.ShortStartDate = null;
            params.data.PersianStartDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'تا تاریخ',
        field: 'PersianEndDate',
        width: 150,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortEndDate = params.newValue.MDate;
            params.data.PersianEndDate = params.newValue.SDate;
            this.gridApi.forEachNode(node => {
            });
            return true;
          } else {
            params.data.ShortEndDate = null;
            params.data.PersianEndDate = '';
            return false;
          }
        }
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
    this.GetAllCommitionProceedVariable();
  }
  GetAllCommitionProceedVariable() {
    this.VariableService.GetAllCommitionProceedVariable().subscribe(res => {
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
    if (event.colDef && event.colDef.field === 'VariableTypeName') {// For InvalidSelected When Old IsValid
      this.VariableService.GetAllVariableType().subscribe(res => {
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'variable-type'
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
      const CommitionProceedVariable = {
        VariableTypeName: res.VariableTypeName,
        VariableTypeCode: res.VariableTypeCode,
        FromDate: (res.PersianStartDate && res.PersianStartDate.MDate) ? res.PersianStartDate.MDate : res.ShortStartDate,
        ToDate: (res.PersianEndDate && res.PersianEndDate.MDate) ? res.PersianEndDate.MDate : res.ShortEndDate,
        VariableValue: res.VariableValue,
      };
      this.Dto.push(CommitionProceedVariable);
    });
    this.VariableService.SaveCommitionProceedVariable(this.Dto).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      this.VariableService.GetAllCommitionProceedVariable().subscribe((res2: any) => {
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
