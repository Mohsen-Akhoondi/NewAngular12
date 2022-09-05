import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ContractMinutesService } from 'src/app/Services/ContractService/ContractMinutes/ContractMinutesService';

@Component({
  selector: 'app-select-contract-minutes',
  templateUrl: './select-contract-minutes.component.html',
  styleUrls: ['./select-contract-minutes.component.css']
})
export class SelectContractMinutesComponent implements OnInit {
  columnDef;
  rowData;
  ContractMinutesID;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  constructor(private ContMinutesService: ContractMinutesService,
    private ContractPayDetails: ContractPayDetailsService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },

      {
        headerName: 'شماره صورتجلسه',
        field: 'ContractMinutesCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ صورتجلسه',
        field: 'ContractMinutesDatePersian',
        width: 150,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 600,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    this.ContMinutesService.GetContractMinutesList(this.PopupParam.ContractID).subscribe(res => {
      this.rowData = res;
    });
  }

  onOkClick() {
    this.OutPutParam.emit(this.ContractMinutesID);
    this.Closed.emit(true);
  }
  onClose() {
    this.Closed.emit(true);
  }
  RowClick(event) {
  this.ContractMinutesID =  event.data.ContractMinutesID;

  }
  onRowDoubleClicked(event) {
   this.OutPutParam.emit(event.data.ContractMinutesID);
   this.Closed.emit(true);
  }
}
