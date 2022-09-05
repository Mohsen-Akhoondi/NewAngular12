import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractAgentService } from 'src/app/Services/ContractService/BasemodulesService/ContractAgent/ContractAgentService';

@Component({
  selector: 'app-select-contract-agent',
  templateUrl: './select-contract-agent.component.html',
  styleUrls: ['./select-contract-agent.component.css']
})
export class SelectContractAgentComponent implements OnInit {
  columnDef;
  rowData;
  ContractAgentCode;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  constructor(private ContractAgent: ContractAgentService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد عامل',
        field: 'ContractAgentCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام عامل',
        field: 'ContractAgentName',
        width: 170,
        resizable: true
      },

    ];
  }

  ngOnInit() {
    this.ContractAgent.GetContractAgents(this.PopupParam.ContractAgentCode).subscribe(res => {
      this.rowData = res;
    });
  }

  onOkClick() {
    this.OutPutParam.emit(this.ContractAgentCode);
    this.Closed.emit(true);
  }

  onClose() {
    this.Closed.emit(true);
  }

  RowClick(event) {
  this.ContractAgentCode =  event.data.ContractAgentCode;

  }

  onRowDoubleClicked(event) {
   this.OutPutParam.emit(event.data.ContractAgentCode);
   this.Closed.emit(true);
  }
}
