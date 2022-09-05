import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-estate-search',
  templateUrl: './estate-search.component.html',
  styleUrls: ['./estate-search.component.css']
})
export class EstateSearchComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPutParam: EventEmitter<any> = new EventEmitter<any>();
  isClicked: boolean;
  EstateID = 0;
  BlockNo;
  LandNo;
  ApartmentNo;
  BusinessNo;
  ZoneNo;
  RegionNo;
  OldRegNo;
  NewPostCode;
  DistrictNo;
  OwnerNo;
  FirstName;
  LastName;
  PAddress;
  EstateGridApi: any;
  EstateColDef: any;
  EstateRowData: any;
  selectedRow: any;


  constructor(private ProductRequest: ProductRequestService) {
    this.EstateColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'بلوک',
        field: 'BlockNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ملک',
        field: 'LandNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'آپارتمان',
        field: 'ApartmentNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیشه ور',
        field: 'BusinessNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'منطقه',
        field: 'ZoneNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ناحیه',
        field: 'RegionNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک ثبتی ترکیبی',
        field: 'OldRegNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'کد پستی',
        field: 'NewPostCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'محدوده',
        field: 'DistrictNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ردیف مالک',
        field: 'OwnerNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مالک',
        field: 'OwnerFullName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'آدرس',
        field: 'PAddress',
        width: 400,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.EstateRowData = [];
  }

  onEstateGridReady(params) {
    this.EstateGridApi = params.api;
  }


  onEstateRowClick(event) {
    this.selectedRow = event.data;
    this.EstateID = this.selectedRow.EstateID;

  }

  onSearch() {
    if (!this.ZoneNo) {
      this.ZoneNo = this.PopupParam.ProductRequestObject.RegionCode;
    }
    this.ProductRequest.SearchEstate(this.BlockNo, this.LandNo, this.ApartmentNo, this.BusinessNo,
      this.ZoneNo, this.RegionNo, this.OldRegNo, this.NewPostCode,
      this.DistrictNo, this.OwnerNo, this.FirstName, this.LastName, this.PAddress
    ).subscribe(res => {
      this.EstateRowData = res;
    });
  }

  onClose() {
    this.isClicked = false;
    this.Closed.emit(true);
  }

  onAdd() {
    if (this.selectedRow) {
    this.isClicked = false;
    this.PopupOutPutParam.emit(this.selectedRow);
    this.Closed.emit(true);
    }
  }
  popupclosed() {
    this.isClicked = false;
  }

  getOutPutParam(event) {
}

}
