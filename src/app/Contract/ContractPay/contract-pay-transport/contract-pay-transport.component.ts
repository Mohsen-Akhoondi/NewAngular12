import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';

@Component({
  selector: 'app-contract-pay-transport',
  templateUrl: './contract-pay-transport.component.html',
  styleUrls: ['./contract-pay-transport.component.css']
})
export class ContractPayTransportComponent implements OnInit {
  @Input() PopupParam;
  @Output() ContractPayTransportClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  IsDisable;
  HaveSave = true;
  HaveConfirm;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  Subject: any;
  ContractAmount;
  ContractPayItemID = 0;
  btnclicked: boolean;
  columnDef_Transport: any;
  rowData;
  gridApi;
  SelectedRowPay: number;
  ContractPayTechnicalCode;
  ContractPayDate;
  ContractPayStartDate;
  ContractPayEndDate;

  @ViewChild('Is4WDValid') Is4WDValid: TemplateRef<any>;
  @ViewChild('WithDriverValid') WithDriverValid: TemplateRef<any>;

  constructor(private PayService: ContractPayService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDef_Transport = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'دو ديفرانسيل',
        field: 'Is4wd',
        width: 120,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Is4WDValid
        },
      },
      {
        headerName: 'با راننده',
        field: 'WithDriver',
        width: 120,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.WithDriverValid
        },
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 100,
        resizable: true,
        editable: true
      },
      {
        headerName: 'مقدار',
        field: 'Amount',
        width: 100,
        resizable: true,
        editable: true
      }
    ];
  }

  ngOnInit() {
    this.ContractPayItemID = this.PopupParam.ContractPayItemID;
    this.ContractPayTechnicalCode = this.PopupParam.ContractPayTechnicalCode;
    this.ContractPayDate = this.PopupParam.ContractPayDate;
    this.ContractPayStartDate = this.PopupParam.ContractPayStartDate;
    this.ContractPayEndDate = this.PopupParam.ContractPayEndDate;

    this.FinYearCode = this.PopupParam.FinYearCode;
    this.ContractCode = this.PopupParam.ContractCode;
    this.ContractorName = this.PopupParam.ContractorName;
    this.LetterNo = this.PopupParam.LetterNo;
    this.ContractAmount = this.PopupParam.ContractAmount;
    this.Subject = this.PopupParam.Subject;

    if (this.ContractPayItemID > 0) {
      this.PayService.GetContractPayTransportList(this.ContractPayItemID)
        .subscribe(res => {
          this.rowData = res;
          this.SelectedRowPay = 0;
        });
    }
  }

  close() {

    this.btnclicked = false;
    this.ContractPayTransportClosed.emit(true);
  }

  GridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }


  onSave() {
    const rowData = [];
    const ContractPayTransportList = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    let ItemNo = 0;
    rowData.forEach((Transport) => {
      ItemNo++;
      if (Transport.ContractPayTransportID) {
        const obj = {
          ContractPayTransportID: Transport.ContractPayTransportID,
          ContractPayItemID: this.ContractPayItemID,
          ItemNo: ItemNo,
          Is4wd: Transport.Is4wd,
          WithDriver: Transport.WithDriver,
          Qty: Transport.Qty,
          Amount: Transport.Amount
        };
        ContractPayTransportList.push(obj);
      } else {
        const obj = {
          ContractPayTransportID: -1,
          ContractPayItemID: this.ContractPayItemID,
          ItemNo: ItemNo,
          Is4wd: Transport.Is4wd,
          WithDriver: Transport.WithDriver,
          Qty: Transport.Qty,
          Amount: Transport.Amount
        };
        ContractPayTransportList.push(obj);
      }
    });
    this.PayService.SaveContractPayTransport(ContractPayTransportList)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.PayService.GetContractPayTransportList(this.ContractPayItemID)
          .subscribe(res_refresh => {
            this.rowData = res_refresh;
            this.SelectedRowPay = 0;
          });
      },
        err => {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      );
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  onCellValueChanged(event) {
    let itemsToUpdate = [];
    if (event.newValue && event.columnDef_Transport &&
      event.columnDef_Transport.field === 'Is4wd') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.Is4wd = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.newValue && event.columnDef_Transport &&
      event.columnDef_Transport.field === 'WithDriver') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.WithDriver = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  popupclosed() {
    this.btnclicked = false;
  }

}
