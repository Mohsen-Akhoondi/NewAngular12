import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { isUndefined } from 'util';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-summary-quantity-surveying',
  templateUrl: './summary-quantity-surveying.component.html',
  styleUrls: ['./summary-quantity-surveying.component.css']
})
export class SummaryQuantitySurveyingComponent implements OnInit {

  @Input() PopupParam;
  @Input() ModuleCode;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  private gridApi;
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
  gridHeightPercent = 90;
  RegionCode;

  constructor(
    private ContPayService: ContractPayService,
    private Report: ReportService,
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
        headerName: 'نوع ردیف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'جمع جزیی',
        field: 'DetailSum',
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'ضریب',
        field: 'COEF123',
        width: 70,
        resizable: true
      },
      {
        headerName: 'جمع جزیی با ضریب',
        field: 'DetailSumWithCOEF123',
        HaveThousand: true,
        width: 140,
        resizable: true
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.SetSumFinalAmount();
  }
  ngOnInit() {
    if (this.PopupParam && this.PopupParam.RegionCode) {
      this.RegionCode = this.PopupParam.RegionCode;
    }
    this.getRowData();
    this.FinYearCode = this.PopupParam.FinYearCode;
    this.ContractCode = this.PopupParam.ContractCode;
    this.ContractorName = this.PopupParam.ContractorName;
    this.Subject = this.PopupParam.Subject;
    this.ContractPayTechnicalCode = this.PopupParam.ContractPayTechnicalCode;
    this.ContractPayDate = this.PopupParam.ContractPayDate;
    this.Note = this.PopupParam.Note;
  }

  getRowData() {
    this.ContPayService.GetSummaryQuantitySurveying(this.PopupParam.CostFactorID, this.PopupParam.ContractAgentCode).subscribe(res => {
      this.dataRow = res;
    });
  }

  RowClick(event) {
    this.selectedRow = event;
    if (event.data.PriceListTopicCode) {
      this.PriceListTopicName = event.data.PriceListTopicName;
      this.WorkUnitName = event.data.WorkUnitName;
      this.UnitAmount = event.data.UnitAmount;
    } else {
      this.PriceListTopicName = '';
      this.WorkUnitName = '';
      this.UnitAmount = '';
    }
  }
  onPrintClick() {
    this.Report.ContractPayListDetailReport(
      this.PopupParam.CostFactorID,
      this.PopupParam.ContractAgentCode,
      2516,
      this.RegionCode,
      'خلاصه متره',
      0
    );
  }
  close() {
    this.Closed.emit(true);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeightPercent = changes.PopupMaximized.currentValue ? 90 : 90;
    }
  }
  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    this.gridApi.forEachNodeAfterFilter(function (node) {
      if (node.data.DetailSumWithCOEF123) {
        SumFinalAmount = SumFinalAmount + node.data.DetailSumWithCOEF123;
      }
    });
    this.SumFinalEstimateAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

