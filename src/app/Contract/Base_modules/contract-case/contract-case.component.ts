import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isUndefined } from 'util';

@Component({
  selector: 'app-contract-case',
  templateUrl: './contract-case.component.html',
  styleUrls: ['./contract-case.component.css']
})
export class ContractCaseComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ContractCaseClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  TabContentHeight = 90;
  T11HeightPercent = 90;
  T12HeightPercent = 90;
  T13HeightPercent = 88;
  T21HeightPercent = 95;
  OverPixelWidth: number;
  ContractPageParam;
  BeforPageTypeName;
  IsTabVisible = true;
  
  constructor() {
  }

  ngOnInit() {
    this.ContractPageParam = this.PopupParam;
    this.OverPixelWidth = this.PopupParam.OverPixelWidth;
    if (this.PopupParam && this.PopupParam.BeforPageTypeName) {
      this.BeforPageTypeName = this.PopupParam.BeforPageTypeName;
    }

    if(!isUndefined(this.PopupParam.IsTabVisible)) {
      this.IsTabVisible =this.PopupParam.IsTabVisible;
    }
  }

  onClose() {
    this.ContractCaseClosed.emit(true);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.T11HeightPercent = changes.PopupMaximized.currentValue ? 93 : 90;
      this.T12HeightPercent = changes.PopupMaximized.currentValue ? 93 : 90;
      this.T13HeightPercent = changes.PopupMaximized.currentValue ? 91 : 88;
      this.T21HeightPercent = changes.PopupMaximized.currentValue ? 100 : 95;
    }
  }
}
