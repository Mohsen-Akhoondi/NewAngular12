import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { isUndefined } from 'util';

@Component({
  selector: 'app-global-choose-page',
  templateUrl: './global-choose-page.component.html',
  styleUrls: ['./global-choose-page.component.css']
})
export class GlobalChoosePageComponent implements OnInit {
  @Input() InputParam;
  @Output() CloseChoosePage: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() PopupOutPutParam: EventEmitter<any> =
    new EventEmitter<any>();
  type: string;
  HaveDelete = false;
  BtnOKName = 'تایید';
  ShowDateFilterBox = false;
  FromDate;
  ToDate;

  constructor() { }

  ngOnInit() { // RFC 64628
    if (this.InputParam &&
      this.InputParam.RadioItems &&
      this.InputParam.RadioItems.length > 0) {
      let keepGoing = true;
      this.InputParam.RadioItems.forEach(element => {
        if (keepGoing) {
          if (!element.IsDisable) {
            element.checked = true;
            this.type = element.type;
            keepGoing = false;
          }
        }
      });

    }
    this.HaveDelete = this.InputParam.ModuleCode === 2730
      && (this.InputParam.ModuleViewTypeCode === 47 ||
        this.InputParam.ModuleViewTypeCode === 68 ||
        this.InputParam.ModuleViewTypeCode === 72 ||
        this.InputParam.ModuleViewTypeCode === 107 ||
        this.InputParam.ModuleViewTypeCode === 162 ||
        this.InputParam.ModuleViewTypeCode === 166 ||
        this.InputParam.ModuleViewTypeCode === 169) ? true : false;
    this.BtnOKName = this.HaveDelete ? this.BtnOKName = 'امضا' : this.BtnOKName = 'تایید';
  }
  onRedioClick(event) {
    this.type = event.type;
    if (!isUndefined(event.ShowDate) && event.ShowDate !== null) {
      this.ShowDateFilterBox = event.ShowDate;
    } else {
      this.ShowDateFilterBox = false;
    }
  }
  OnDelClick() {
    const DelObj = {
      DType: this.type,
      DName: 'Del',
    };
    this.CloseChoosePage.emit(DelObj);
  }
  OnOkClick() {
    if (this.ShowDateFilterBox) {
      const FilterObj = {
        FromDate: this.FromDate,
        ToDate: this.ToDate
      };
      this.PopupOutPutParam.emit(FilterObj);
    } else {
      this.CloseChoosePage.emit(this.type);
    }
  }
  onClose() {
    this.CloseChoosePage.emit('Exit');
  }

  OnFromDateChange(ADate) {
    this.FromDate = ADate.MDate;
    this.ToDate = ADate.MDate;
  }

  OnToDateChange(ADate) {
    this.ToDate = ADate.MDate;
  }
}
