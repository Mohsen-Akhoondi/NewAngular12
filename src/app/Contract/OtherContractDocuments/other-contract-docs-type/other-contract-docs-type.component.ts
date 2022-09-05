import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractMinutesService } from 'src/app/Services/ContractService/ContractMinutes/ContractMinutesService';

@Component({
  selector: 'app-other-contract-docs-type',
  templateUrl: './other-contract-docs-type.component.html',
  styleUrls: ['./other-contract-docs-type.component.css']
})
export class OtherContractDocsTypeComponent implements OnInit {

  @Input() PopupParam;
  @Output() ContractMinuteTypesClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ContractMinuteTypesOutPutPram: EventEmitter<any> = new EventEmitter<any>();
  SelectedContractID = 0;
  AutoEntityTypeList = [];
  rep = [];

  constructor(private ConMinutesService: ContractMinutesService) { }

  ngOnInit() {
    if (this.PopupParam != null) {
      this.SelectedContractID = this.PopupParam;
    }
    this.ConMinutesService.GetAutoEntityTypeList(11, this.PopupParam.RegionCode).subscribe(res => {
      this.AutoEntityTypeList = res;
    });
  }

  onClose() {
    this.ContractMinuteTypesClosed.emit(true);
  }
  SetPayTypes(event) {
    this.ContractMinuteTypesOutPutPram.emit(event);
  }

}
