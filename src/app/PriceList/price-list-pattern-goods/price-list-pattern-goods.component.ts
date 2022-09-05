import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListPatternGoodsService } from 'src/app/Services/BaseService/PriceListPatternGoodsService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-price-list-pattern-goods',
  templateUrl: './price-list-pattern-goods.component.html',
  styleUrls: ['./price-list-pattern-goods.component.css']
})
export class PriceListPatternGoodsComponent implements OnInit {
  @Input() PopupParam;
  @Output() PriceListPatternIDClosed: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  gridrows;
  gridcolumns = [
    {
      headerName: 'ردیف',
      field: 'ItemNo',
      width: 70
    },
    {
      headerName: 'کد کالا',
      field: 'GoodsCode',
      width: 100
    },
    {
      headerName: 'نام کالا',
      field: 'ProductName',
      width: 300
    },
    {
      headerName: 'واحد کالا',
      field: 'ScaleName',
      width: 100
    },
    {
      headerName: 'مقدار',
      field: 'K1',
      width: 80
    },
    {
      headerName: 'پرت',
      field: 'K2',
      width: 80
    },
    {
      headerName: 'ضریب یک',
      field: 'K3',
      width: 80
    },
    {
      headerName: 'ضریب دو',
      field: 'K4',
      width: 80
    }
  ];
  HaveHeader: boolean;
  selectedRow: any;
  type: string;
  btnclicked: boolean;
  OverstartTopPosition: number;
  OverstartLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  paramObj: any;
  constructor(private PriceListPatternGoods: PriceListPatternGoodsService) { }

  ngOnInit() {
    this.gridrows = this.PriceListPatternGoods.GetPriceListPatternGoods(this.PopupParam.PriceListPatternID);
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  Btnclick(InputValue) {
    switch (InputValue) {
      case 'transfer-distance-item': {
        if (this.selectedRow == null) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.OverstartLeftPosition = 500;
          this.OverstartTopPosition = 250;
        } else {
          this.type = 'transfer-distance-item';
          this.btnclicked = true;
          this.OverstartLeftPosition = 59;
          this.OverstartTopPosition = 20;
          this.paramObj = {
            ProductID: this.selectedRow.data.ProductID,
            ProductName: this.selectedRow.data.ProductName,
            PriceListTopicCode: this.PopupParam.PriceListTopicCode,
            TopicCode: this.PopupParam.TopicCode
          };
        }
        break;
      }
      default:
        break;
    }
  }
  popupclosed() {
    this.btnclicked = false;
  }

  close() {
    this.PriceListPatternIDClosed.emit(true);
  }
}

