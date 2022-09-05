import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-inuiry-search-list',
  templateUrl: './inuiry-search-list.component.html',
  styleUrls: ['./inuiry-search-list.component.css']
})
export class InuirySearchListComponent implements OnInit {

  columnDef;
  rowData;
  SelectedAdvertising;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  IsCost = false;
  IsAuctionStr = 'مناقصه';
  btnclicked = false;
  type = '';
  HaveHeader = false;
  HaveMaxBtn = true;
  startLeftPosition;
  startTopPosition;
  MinHeightPixel;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ParamObj;
  DealMethodCode;

  constructor(private ProductRequest: ProductRequestService) {
  }

  ngOnInit() {
    if (this.PopupParam.IsCost !== null) {
      this.IsCost = this.PopupParam.IsCost;
    }
    if (this.PopupParam.DealMethodName != null) {
      this.IsAuctionStr = this.PopupParam.DealMethodName;
    }
    if (this.PopupParam.DealMethodCode != null) {
      this.DealMethodCode = this.PopupParam.DealMethodCode;
    }

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' شماره ' + this.IsAuctionStr,
        field: 'InquiryNo',
        width: 150,
        resizable: true
      },
      {
        headerName: ' تاریخ ' + this.IsAuctionStr,
        field: 'PersianInquiryDate',
        width: 150,
        resizable: true
      },
      {
        headerName: ' عنوان ',
        field: 'InquiryNote',
        width: 250,
        resizable: true
      },
    ];
    forkJoin([
      this.ProductRequest.GetInquiryListByAdvertising(
        this.PopupParam.AdvertisingID,
        this.PopupParam.RegionCode,
        this.IsCost,
        this.DealMethodCode)
    ]).subscribe((res: any) => {
      this.rowData = res[0];
    });
  }

  onOkClick() {
    this.OutPutParam.emit(this.SelectedAdvertising);
    this.Closed.emit(true);
  }

  onClose() {
    this.Closed.emit(true);
  }

  RowClick(event) {
    this.SelectedAdvertising = event.data;

  }

  onRowDoubleClicked(event) {
    this.OutPutParam.emit(event.data);
    this.Closed.emit(true);
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed(event) {

  }

  getOutPutParam(event) {

  }
}
