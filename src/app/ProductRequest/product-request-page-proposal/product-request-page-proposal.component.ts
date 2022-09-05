import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';

@Component({
  selector: 'app-product-request-page-proposal',
  templateUrl: './product-request-page-proposal.component.html',
  styleUrls: ['./product-request-page-proposal.component.css']
})
export class ProductRequestPageProposalComponent implements OnInit {
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  RadioTypes: Array<RadioBoxModel> = [];
  RadioTypeDisplay: string;
  ModulViewTypeCode;
  IsChecked;
  constructor() {

  }

  ngOnInit() {
    this.RadioTypes.push(new RadioBoxModel('لیست متقاضیان', 42, true, 'rdopropsal1'));
    this.RadioTypes.push(new RadioBoxModel('دریافت پاکات', 70, false, 'rdopropsal2'));
    this.RadioTypes.push(new RadioBoxModel('تهیه متن آگهی روزنامه - مناقصه عمومی', 38, false, 'rdopropsal3'));
    this.RadioTypes.push(new RadioBoxModel('تهیه متن آگهی روزنامه - حراج', 27, false, 'rdopropsal4'));
    this.RadioTypes.push(new RadioBoxModel('تهیه متن آگهی روزنامه - مزایده', 64, false, 'rdopropsal5'));
    this.RadioTypes.push(new RadioBoxModel('تایید مستندات آگهی', 10001, false, 'rdopropsal6'));
    this.RadioTypeDisplay = 'Block';
  }
  GetSelectedOption(event) {
    this.ModulViewTypeCode = event;
  }
  Save() {
    this.PopupOutPut.emit(this.ModulViewTypeCode ? this.ModulViewTypeCode : 42);
  }
  closeModal() {
    this.Closed.emit(true);
    this.PopupOutPut.emit(-1);
  }
}
