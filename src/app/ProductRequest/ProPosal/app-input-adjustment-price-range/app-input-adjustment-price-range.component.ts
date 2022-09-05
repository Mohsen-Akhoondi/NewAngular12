import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-input-adjustment-price-range',
  templateUrl: './app-input-adjustment-price-range.component.html',
  styleUrls: ['./app-input-adjustment-price-range.component.css']
})
export class AppInputAdjustmentPriceRangeComponent implements OnInit {
  @Input() PopupParam;
  @Output() AdjustmentInputClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  DeadLineDate: any;
  CommitionDate: any;
  startLeftPosition: number;
  startTopPosition: number;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  isClicked = false;
  PopUpType: string;
  ParamObj;
  MinHeightPixel;
  MainMaxwidthPixel;
  HaveMaxBtn: boolean;
  ProductRequestObject;
  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
  }

  OnDateChange(ADate, Type) {
    switch (Type) {
      case 'DeadLine':
        this.DeadLineDate = ADate.MDate;
        break;
      case 'Commition':
        this.CommitionDate = ADate.MDate;
        break;
      default:
        break;
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 524;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  popupclosed(param) {
    this.isClicked = false;
    this.PopUpType = '';
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }

  onClose() {
    this.AdjustmentInputClosed.emit(true);
  }

  onShowFormulaValuesPage() {
    if (this.DeadLineDate === null || this.CommitionDate === null) {
      this.ShowMessageBoxWithOkBtn('تمام فیلدها را پر کنید.');
      return;
    } else {
      this.PopUpType = 'adjustment-price-range-formulas-page';
      this.HaveHeader = true;
      this.isClicked = true;
      this.startLeftPosition = 135;
      this.startTopPosition = 50;
      this.HaveMaxBtn = false;
      this.MainMaxwidthPixel = 1200;
      this.MinHeightPixel = 200;
      this.ParamObj = {
        HeaderName: 'جزییات متغیرهای صورتجلسه بر مبنای تاریخ وارد شده',
        DeadLineDate: this.DeadLineDate,
        CommitionDate: this.CommitionDate,
        OrderCommitionID: this.PopupParam.OrderCommitionID ? this.PopupParam.OrderCommitionID : null,
        ProductRequestObject: this.ProductRequestObject
      };
    }
  }
}
