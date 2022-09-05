import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-commition-type',
  templateUrl: './commition-type.component.html',
  styleUrls: ['./commition-type.component.css']
})
export class CommitionTypeComponent implements OnInit {
  @Output() CommitionTypeComponentClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  btnclicked = false;
  rowData;
  gridApi;
  PopUpType;
  HaveHeader;
  HaveMaxBtn;
  startLeftPosition;
  startTopPosition;
  ModuleCode;
  HaveSave;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor(private router: Router,
    private Order: OrderService,
    private User: UserSettingsService,
    private route: ActivatedRoute) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد کميسيون',
        field: 'CommitionCode',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: NumberInputComponentComponent
      },
      {
        headerName: 'نام کميسيون',
        field: 'CommitionName',
        width: 250,
        resizable: true,
        editable: true
      },
      {
        headerName: 'حداقل تعداد اعضا',
        field: 'MinMember',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: NumberInputComponentComponent
      }
    ];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
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
    this.rowData = this.Order.GetCommitionList();
  }
  onSave() {
    const CommitionList = [];
    this.gridApi.stopEditing();
    this.gridApi.forEachNode(node => {
      const CommitionObj = {
        CommitionCode: node.data.CommitionCode,
        CommitionName: node.data.CommitionName,
        MinMember: node.data.MinMember,
      };
      CommitionList.push(CommitionObj);
    });

    this.Order.SaveCommission(CommitionList, this.ModuleCode).subscribe((res: any) => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }
  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
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
  popupclosed() {
    this.HaveMaxBtn = false;
    this.btnclicked = false;
  }
}
