import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-advertising-search',
  templateUrl: './advertising-search.component.html',
  styleUrls: ['./advertising-search.component.css']
})
export class AdvertisingSearchComponent implements OnInit {

  columnDef;
  rowData;
  SelectedAdvertising;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  constructor(private ProductRequest: ProductRequestService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      // {
      //   headerName: 'واحد اجرایی',
      //   field: 'RegionCode',
      //   width: 150,
      //   resizable: true
      // },
      {
        headerName: 'کد آگهی',
        field: 'AdvertisingCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره آگهی',
        field: 'AdvertisingNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ ثبت',
        field: 'PersianRegisterDate',
        width: 150,
        resizable: true
      },
      {
        headerName: 'متن',
        field: 'TextAbove',
        width: 250,
        resizable: true
      },
      {
        headerName: 'محل تحویل',
        field: 'DeliveryPlace',
        width: 250,
        resizable: true
      },

    ];
  }

  ngOnInit() {
    this.ProductRequest.GetAdvertisingListByRegionCode(this.PopupParam.RegionCode).subscribe(res => {
      this.rowData = res;
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
  this.SelectedAdvertising =  event.data;

  }

  onRowDoubleClicked(event) {
   this.OutPutParam.emit(event.data);
   this.Closed.emit(true);
  }
}
