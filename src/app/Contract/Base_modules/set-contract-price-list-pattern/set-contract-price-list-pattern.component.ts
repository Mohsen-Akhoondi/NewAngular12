import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-set-contract-price-list-pattern',
  templateUrl: './set-contract-price-list-pattern.component.html',
  styleUrls: ['./set-contract-price-list-pattern.component.css']
})
export class SetContractPriceListPatternComponent implements OnInit {
  @Input() PopupParam;
  @Output() SetContractPriceListPatternClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  PriceListTopicsSet;
  HaveHeader = true;
  IsDone;
  ModuleCode;
  isClicked = false;
  type: string;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  PriceListTypeSet;
  selectedPriceListTopicCode;
  selectedPriceListTypeCode;
  constructor(private PriceList: PriceListService,
    private ContractService: ContractListService,
    private RefreshContract: RefreshServices) { }

  ngOnInit() {
    this.ModuleCode = this.PopupParam.ModuleCode;
    this.PriceList.GetPriceListTopics(true).subscribe(res => {
      res.forEach(item => {
        item.PriceListTopicCodeName = item.PriceListTopicCode + ' - ' + item.PriceListTopicName;
      });
      this.PriceListTopicsSet = res;
    });
  }
  onChangePriceListTopicObj(event) {
    this.selectedPriceListTopicCode = event;
    this.PriceList.GetPriceListType(this.selectedPriceListTopicCode).subscribe(res => {
      this.PriceListTypeSet = res;
      this.PriceListTypeSet.forEach(item => {
        item.PriceListTypeCodeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
        this.selectedPriceListTypeCode = item.PriceListTypeCode;
      });
    });
  }
  showMessageBox(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = message;
  }
  popupclosed() {
    this.isClicked = false;
    this.SetContractPriceListPatternClosed.emit(this.IsDone);
  }
  onClose() {
    this.SetContractPriceListPatternClosed.emit(false);
  }
  onSave() {
    this.ContractService.SetContractPriceListPattern(this.PopupParam.selectedContractID,
      this.selectedPriceListTopicCode,
      this.selectedPriceListTypeCode).
      subscribe(res => {
        this.showMessageBox('ثبت با موفقیت انجام شد');
        this.RefreshContract.RefreshCantractList();
        this.IsDone = true;
      },
        err => {
          this.showMessageBox('ثبت با مشکل مواجه شد');
          this.IsDone = false;
        });
  }
}
