import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';

@Component({
  selector: 'app-select-contract-pay',
  templateUrl: './select-contract-pay.component.html',
  styleUrls: ['./select-contract-pay.component.css']
})
export class SelectContractPayComponent implements OnInit {
  columnDef;
  rowData;
  CpCostFactorID;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  constructor(private ContPayService: ContractPayService,
    private ContractPayDetails: ContractPayDetailsService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع صورت وضعیت',
        field: 'ContractPayTypeName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع عملیات',
        field: 'ContractOperationName',
        width: 90,
        resizable: true
      },
      {
        headerName: 'شماره صورت وضعیت',
        field: 'ContractPayTechnicalCode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ContractPayNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'CotractPayDatePersian',
        width: 90,
        resizable: true
      },
      {
        headerName: 'جمع مبلغ ناخالص',
        field: 'Amount',
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'جمع مالیات بر ارزش افزوده',
        field: 'TaxValue',
        HaveThousand: true,
        width: 140,
        resizable: true
      },
      {
        headerName: 'جمع مبلغ',
        field: 'ContractPayAmount',
        width: 100,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 100,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    this.ContPayService.GetContractPayList(this.PopupParam.CostFactorID, this.PopupParam.ContractPayNo , 0).subscribe(res => {
      this.rowData = res;
    });
  }

  onOkClick() {
    this.OutPutParam.emit(this.CpCostFactorID);
    this.Closed.emit(true);
  }
  onClose() {
    this.Closed.emit(true);
  }
  RowClick(event) {
  this.CpCostFactorID =  event.data.CostFactorID;

  }
  onRowDoubleClicked(event) {
   this.OutPutParam.emit(event.data.CostFactorID);
   this.Closed.emit(true);
  }
}
