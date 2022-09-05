import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { isUndefined } from 'util';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-financial-sheet',
  templateUrl: './financial-sheet.component.html',
  styleUrls: ['./financial-sheet.component.css']
})
export class FinancialSheetComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  gridApi;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  dataRow: any;

  PriceListTopicName: any;
  WorkUnitName: any;
  UnitAmount: any;
  SumFinalEstimateAmount = '0';
  FinYearCode;
  ContractCode;
  ContractorName;
  Subject;
  ContractPayTechnicalCode;
  ContractPayDate;
  Note;
  BoxDevHeight = 72;
  RegionCode;

  constructor(
    private ContPayService: ContractPayService,
    private Report: ReportService
    ) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: ' کد فهرست',
        field: 'PriceListTopicCode',
        width: 90,
        resizable: true
      },
      {
        headerName: 'شرح مختصر',
        field: 'PriceListTopicName',
        width: 300,
        resizable: false
      },
      {
        headerName: 'واحد کار',
        field: 'WorkUnitName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'UnitAmount',
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مقدار',
        field: 'FQty',
        HaveThousand: true,
        width: 70,
        resizable: true
      },
      {
        headerName: 'جمع به ریال',
        field: 'UnitAmountWithQty',
        HaveThousand: true,
        width: 140,
        resizable: true
      },
      {
        headerName: 'جمع ضرایب',
        field: 'SumDetailCoef',
        width: 140,
        resizable: true
      },
      {
        headerName: 'جمع کل با ضرایب',
        field: '', // TotalSumWithCoef
        width: 140,
        HaveThousand: true,
        resizable: true
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.SetSumFinalAmount();
  }
  ngOnInit() {
    this.getRowData();
    this.RegionCode = this.PopupParam.RegionCode;
    this.FinYearCode = this.PopupParam.FinYearCode;
    this.ContractCode = this.PopupParam.ContractCode;
    this.ContractorName = this.PopupParam.ContractorName;
    this.Subject = this.PopupParam.Subject;
    this.ContractPayTechnicalCode = this.PopupParam.ContractPayTechnicalCode;
    this.ContractPayDate = this.PopupParam.ContractPayDate;
    this.Note = this.PopupParam.Note;
  }

  getRowData() {
    this.ContPayService.GetFinancialSheet(this.PopupParam.CostFactorID, this.PopupParam.ContractAgentCode).subscribe(res => {
      this.dataRow = res;
    });
  }

  close() {
    this.Closed.emit(true);
  }
  onPrintClick() {
    this.Report.ContractPayListDetailReport(
      this.PopupParam.CostFactorID,
      this.PopupParam.ContractAgentCode,
      2516,
      this.RegionCode,
      'برگه مالی',
      0
    );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.BoxDevHeight = changes.PopupMaximized.currentValue ? 76 : 72;
    }
  }
  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    this.gridApi.forEachNodeAfterFilter(function (node) {
      if (node.data.UnitAmountWithQty) {
        SumFinalAmount = SumFinalAmount + node.data.UnitAmountWithQty;
      }
    });
    this.SumFinalEstimateAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  OnRowDataChanged() {
    this.SetSumFinalAmount();
  }

  OnRowDataUpdated() {
    this.SetSumFinalAmount();
  }

  OnFilterChanged() {
    this.SetSumFinalAmount();
  }
}
