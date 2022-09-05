import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContractMinutesService } from 'src/app/Services/ContractService/ContractMinutes/ContractMinutesService';

@Component({
  selector: 'app-contract-minutes-type',
  templateUrl: './contract-minutes-type.component.html',
  styleUrls: ['./contract-minutes-type.component.css']
})
export class ContractMinutesTypeComponent implements OnInit {
  @Input() PopupParam;
  @Output() ContractMinuteTypesClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ContractMinuteTypesOutPutPram: EventEmitter<any> = new EventEmitter<any>();
  SelectedContractID = 0;
  AutoEntityTypeList = [];
  rep = [];
  constructor( private ConMinutesService: ContractMinutesService) { }

  ngOnInit() {
    if (this.PopupParam != null) {
      this.SelectedContractID = this.PopupParam;
  }
  this.ConMinutesService.GetAutoEntityTypeList(10, this.PopupParam.RegionCode).subscribe(res => {
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
