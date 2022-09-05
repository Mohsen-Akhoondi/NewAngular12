import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  GoodsName;
  GoodsCode;
  ScaleItems;
  ScaleParams = {
    bindLabelProp: 'ScaleName',
    bindValueProp: 'ScaleCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  IsConsumer;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  isClicked: boolean;
  PopUpType: string;
  startLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };

  constructor(private ProductRequest: ProductRequestService) { }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    forkJoin([
      this.ProductRequest.GetScaleList(),
      this.ProductRequest.GetMaxGoodsCode()
    ]).subscribe(res => {
      this.ScaleItems = res[0];
      this.GoodsCode = res[1];
    });
  }

  onChangeScale(event) {

  }

  OnCheckBoxChange(IsConsumer) {
    this.IsConsumer = IsConsumer;
  }

  onSave() {
    const goods = {
      GoodsCode: this.GoodsCode,
      ProductName: this.GoodsName,
      IsConsumer: this.IsConsumer,
    }

    this.ProductRequest.SvaeEquipment(goods,null,this.ScaleParams.selectedObject , this.InputParam.PriceListTopicID).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');

    });

  }
  onClose() {
    this.Closed.emit(true);
  }
  
  popupclosed(event) {
    this.isClicked = false;
  }


  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.startLeftPosition = 530;
    this.startLeftPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

}
