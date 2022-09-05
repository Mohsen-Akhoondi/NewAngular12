import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';

@Component({
  selector: 'app-price-list-topic-select',
  templateUrl: './price-list-topic-select.component.html',
  styleUrls: ['./price-list-topic-select.component.css']
})
export class PriceListTopicSelectComponent implements OnInit {
  @Input() PopupParam;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutputParam: EventEmitter<any> = new EventEmitter<any>();
  constructor(private PriceList: PriceListService) { }
  gridcolumns = [];
  rowData;
  CostListFinYearCode: number;
  PriceListTypeCode: number;
  gridApi;
  WorkUnitItems: Observable<any>;
  SelectedRow;
  SelectedList: Array<any> = [];
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.gridcolumns = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true,
      },
      {
        headerName: 'ردیف فهرست بها',
        field: 'PriceListTopicCode',
        sortable: true,
        filter: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'WorkUnitName',
        cellRenderer: 'SeRender',
        editable: false,
        width: 170,
        resizable: true
      },
      {
        headerName: 'فهرست بها',
        field: 'PriceListTopicName',
        sortable: true,
        filter: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        sortable: true,
        filter: true,
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
       headerName: 'نوع ردیف',
       field: 'IsStar',
       width: 90,
       resizable: true,
      },
    ];
  }
  ngOnInit() {
    this.PriceList.GetPriceListTopicbyLevel(this.PopupParam.PriceListTopicLevel, this.PopupParam.CostListFinYearCode).subscribe(res => {
      this.rowData = res;
    });
  }
  GridReady(event) {
    this.gridApi = event.api;
  }
  RowClick(event) {
    this.SelectedRow = event;
  }
  onClose() {
    this.closeModal.emit(true);
  }
  onConfirm() {
    const obj = {
      SourcePriceListPatternID : this.PopupParam.SourcePriceListPatternID,
      SelectedRow: this.SelectedRow.data,
    };
    this.PopupOutputParam.emit(obj);
    this.closeModal.emit(true);
  }
}
