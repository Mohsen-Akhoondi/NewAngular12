import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-evaluate-method-page',
  templateUrl: './evaluate-method-page.component.html',
  styleUrls: ['./evaluate-method-page.component.css']
})
export class EvaluateMethodPageComponent implements OnInit {
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
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  @Input() PopupParam;
  RowData: any = [];
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
        headerName: 'کد روش ارزیابی',
        field: 'EvaluateMethodCode',
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
        headerName: 'نام روش ارزیابی ',
        field: 'EvaluateMethodName',
        width: 200,
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
    this.GetAllEvaluateMethod();
  }
  GetAllEvaluateMethod() {
    this.srv.GetAllEvaluateMethod().subscribe(res => {
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
      const EvaluateMethod = {
        EvaluateMethodCode: res.EvaluateMethodCode,
        EvaluateMethodName: res.EvaluateMethodName,
      };
      this.Dto.push(EvaluateMethod);
    });
    this.srv.SaveEvaluateMethod(this.Dto).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      this.srv.GetAllEvaluateMethod().subscribe((res2: any) => {
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
