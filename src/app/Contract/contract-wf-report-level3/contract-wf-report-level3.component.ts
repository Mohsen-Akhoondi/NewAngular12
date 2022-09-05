import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-contract-wf-report-level3',
  templateUrl: './contract-wf-report-level3.component.html',
  styleUrls: ['./contract-wf-report-level3.component.css']
})
export class ContractWfReportLevel3Component implements OnInit {
  BoxDevHeight;
  columnDef;
  rowData;
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  IsCost: any;

  constructor(private ContractService: ContractListService,) {
    this.rowData = [];
  }

  ngOnInit() {
    this.IsCost = this.InputParam.IsCost;
    this.ColumnsDefinition();
    this.ContractService.ContractWfReportLevel3(this.InputParam.RegionCode, this.InputParam.CostCenterID, this.InputParam.ContractID, this.IsCost).subscribe(res => {
      this.rowData = res;
    });

  }

  close() {
    this.Closed.emit(true);
  }

  ColumnsDefinition() {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'شماره صورت وضعیت ',
        field: 'ContractPayNoStr',
        width: 100,
        resizable: true
      },

      {
        headerName: 'صورت وضعیت در جریان',
        children: [
          {
            headerName: 'مبلغ',
            field: 'WorkflowContractPayAmount',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
          {
            headerName: 'ارزش افزوده',
            field: 'WorkflowTaxValue',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
          {
            headerName: 'مبلغ کل',
            field: 'WorkflowFinalAmount',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
        ]
      },
      {
        headerName: 'صورت وضعیت تایید نهایی',
        children: [
          {
            headerName: 'مبلغ',
            field: 'TreminateContractPayAmount',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
          {
            headerName: 'ارزش افزوده',
            field: 'TreminateTaxValue',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
          {
            headerName: 'مبلغ کل',
            field: 'TreminateFinalAmount',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
        ]
      },
      {
        headerName: 'حسابداری',
        children: [
          {
            headerName: this.IsCost ? 'بستانکاری ثبت شده'
              : 'بدهکاری ثبت شده',
            field: this.IsCost ? 'CreditAmount' : 'DebitAmount',
            width: 120,
            resizable: true,
            HaveThousand: true,
          },
          {
            headerName: this.IsCost ? 'خالص پرداختی'
              : 'مبلغ دریافت شده',
            field: this.IsCost ? 'DebitAmount' : 'ReceiveDocAmount',
            HaveThousand: true,
            width: 120,
            resizable: true
          },
          {
            headerName: this.IsCost ? 'سایر کسور پرداختی'
              : 'سایر',
            field: this.IsCost ? 'OtherCreditAmount' : '',
            HaveThousand: true,
            width: 120,
            resizable: true,
            hide : !this.IsCost
          },
          {
            headerName: this.IsCost ? 'جمع پرداختی'
              : 'جمع دریافتی',
            field: this.IsCost ? 'TotalAmount' : '',
            HaveThousand: true,
            width: 120,
            resizable: true,
            hide : !this.IsCost
          },
        ]
      }
    ];
  }
}
