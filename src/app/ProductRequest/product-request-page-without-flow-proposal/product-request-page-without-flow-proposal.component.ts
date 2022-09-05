
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-request-page-without-flow-proposal',
  templateUrl: './product-request-page-without-flow-proposal.component.html',
  styleUrls: ['./product-request-page-without-flow-proposal.component.css']
})
export class ProductRequestPageWithoutFlowProposalComponent implements OnInit {

  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();

  ModulViewTypeCode;
  IsChecked;
  RadioTypes =
    [
      { Name: 'لیست متقاضیان', Value: 42, Checked: true }, // Default Selection
      { Name: 'دریافت پاکات', Value: 70, Checked: false },
      { Name: 'تهیه متن آگهی روزنامه - مناقصه عمومی', Value: 38, Checked: false },
      { Name: 'تهیه متن آگهی روزنامه - حراج', Value: 27, Checked: false },
      { Name: 'تهیه متن آگهی روزنامه - مزایده', Value: 64, Checked: false },
      { Name: 'تایید مستندات آگهی', Value: 10001, Checked: false }
    ];
  constructor() { }

  ngOnInit() {
  }
  IsNewRedioClick(event) {
    const item = this.RadioTypes.filter(x => x.Value === event);
    if (item.length === 1) {
      item[0].Checked = true;
      const DeselectList = this.RadioTypes.filter(x => x.Value !== event && x.Checked);
      DeselectList.forEach(res => {
        res.Checked = false;
      });
      this.ModulViewTypeCode = event;
    }
  }
  Save() {
    this.PopupOutPut.emit(this.ModulViewTypeCode ? this.ModulViewTypeCode : 42);
  }
  closeModal() {
    this.Closed.emit(true);
    this.PopupOutPut.emit(-1);
  }

}
