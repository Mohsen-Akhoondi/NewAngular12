import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contract-pay-voucher-details',
  templateUrl: './contract-pay-voucher-details.component.html',
  styleUrls: ['./contract-pay-voucher-details.component.css']
})
export class ContractPayVoucherDetailsComponent implements OnInit {
  @Input() PopupParam;
  @Output() ContractPayVoucherDetailstClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  Subject;
  ContractTypeName;
  FromContractDatePersian;
  ToContractDatePersian;
  ContractAmount;
  rowData_Voucher;
  gridApi;
  SelectedRow: number;
  columnDef_Voucher;
  btnclicked: boolean;

  constructor() {
    this.columnDef_Voucher = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'شماره صورت وضعیت',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'سال مالی',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره تنظیم',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ تنظیم',
        field: 'ContractAgentName',
        width: 150,
        resizable: true,
        editable: false
      },
      {
        headerName: 'شماره ثبت',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ ثبت',
        field: 'ContractAgentName',
        width: 150,
        resizable: true,
        editable: false
      },
      {
        headerName: 'ردیف سند',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'حساب کل',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'معین',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تفصیلی',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'بدهکار',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'بستانکار',
        field: 'ContractAgentName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'موضوع',
        field: 'ContractAgentName',
        width: 300,
        resizable: true,
        editable: false
      }
    ];
  }

  ngOnInit() {
    this.rowData_Voucher = [];
    const currentData =  this.PopupParam.selectedRow.data;
    this.FinYearCode = currentData.FinYearCode;
    this.ContractCode = currentData.ContractCode;
    this.LetterNo = currentData.LetterNo;
    this.ContractAmount = currentData.ContractAmount ? currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','): null;
    this.ContractorName = currentData.ContractorName;
    this.ContractTypeName = currentData.ContractTypeName;
    this.FromContractDatePersian = currentData.FromContractDatePersian;
    this.ToContractDatePersian = currentData.ToContractDatePersian;
    this.Subject = currentData.Subject;
  }

  close() {

    this.btnclicked = false;
    this.ContractPayVoucherDetailstClosed.emit(true);
  }

  GridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  popupclosed() {
    this.btnclicked = false;
  }

}
