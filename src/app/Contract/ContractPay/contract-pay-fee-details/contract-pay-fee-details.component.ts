import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { isUndefined } from 'util';

@Component({
  selector: 'app-contract-pay-fee-details',
  templateUrl: './contract-pay-fee-details.component.html',
  styleUrls: ['./contract-pay-fee-details.component.css']
})
export class ContractPayFeeDetailsComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClicked: boolean;
  type: string;
  columnDef;
  gridApi: any;
  rowData: any;
  DivHeight = 70;
  FinYearCode: any;
  ContractCode: any;
  ContractTypeName: any;
  ContractTypeCode: any;
  HaveHeader = true;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  LetterNo: any;
  LetterDatePersian;
  ContractAmount: any;
  ContractorName: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  Subject: any;
  ContractPayNo: any;
  PopUpType;
  startLeftPosition = 59;
  startTopPosition = 20;
  mainBodyHeight = 500;
  gridHeight = 76;
  HaveMaxBtn = false;
  IsDown = false;
  ContractID;
  constructor(private contractpay: ContractPayService) {

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره صورت وضعیت',
        field: 'ContractPayNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'درخواست وجه',
        children: [
          {
            headerName: 'شماره',
            field: 'FeeCode',
            width: 120,
            resizable: true
          },
          {
            headerName: 'تاریخ',
            field: 'PersianFeeDate',
            width: 120,
            resizable: true
          },
          {
            headerName: 'وضعیت',
            field: 'FeeStatusName',
            width: 120,
            resizable: true
          },
        ]
      },
      {
        headerName: 'حواله / چک',
        children: [
          {
            headerName: 'شماره',
            field: 'ChequeNo',
            width: 120,
            resizable: true
          },
          {
            headerName: 'تاریخ',
            field: 'PersianChequeDate',
            width: 120,
            resizable: true
          },
          {
            headerName: 'وضعیت',
            field: 'ChequeStatusName',
            width: 120,
            resizable: true
          },
        ]
      },
      {
        headerName: 'مبلغ',
        field: 'DeductionAmount',
        width: 200,
        HaveThousand: true,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.rowData = [];
    const currentData =  this.PopupParam.selectedRow.data;
    this.FinYearCode = currentData.FinYearCode;
    this.ContractCode = currentData.ContractCode;
    this.ContractTypeName = currentData.ContractTypeName;
    this.ContractTypeCode = currentData.ContractTypeCode;
    this.LetterNo = currentData.LetterNo;
    this.LetterDatePersian = currentData.LetterDatePersian;
    this.ContractAmount = currentData.ContractAmount ? currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
    this.ContractorName = currentData.ContractorName;
    this.FromContractDatePersian = currentData.FromContractDatePersian;
    this.ToContractDatePersian = currentData.ToContractDatePersian;
    this.Subject = currentData.Subject;

      let ContractID = this.PopupParam.SelectedContractID ?
                       this.PopupParam.SelectedContractID : 
                            this.PopupParam.selectedRow.data.ContractId ?
                            this.PopupParam.selectedRow.data.ContractId :
                             this.PopupParam.selectedRow.data.ContractID ; 

    this.contractpay.GetContractFeeList(ContractID).subscribe( // RFC 51561
      res => {
        this.rowData = res;
      }
    );
  }

  popupclosed() {
    this.HaveMaxBtn = false;
    this.isClicked = false;
  }

  onClose() {
    this.Closed.emit(true);
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = changes.PopupMaximized.currentValue ? 78 : 77;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 560 : 500;
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}
