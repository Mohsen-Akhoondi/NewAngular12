import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-estate-recognition-search',
  templateUrl: './estate-recognition-search.component.html',
  styleUrls: ['./estate-recognition-search.component.css']
})
export class EstateRecognitionSearchComponent implements OnInit {

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
  RegRegion;
  MajorRegNo;
  MinorRegNo;
  DivisionSeq;
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
        headerName: 'منطقه ثبتی',
        field: 'RegRegion',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک اصلی',
        field: 'MajorRegNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک فرعی',
        field: 'MinorRegNo',
        width: 150,
        resizable: true
      },
      {
        headerName: 'قطعه',
        field: 'DivisionSeq',
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
        headerName: 'نوع ملک',
        field: 'MelkType',
        width: 400,
        resizable: true
      },
      {
        headerName: 'موضوع ملک',
        field: 'Title',
        width: 400,
        resizable: true
      },
      {
        headerName: 'عرصه',
        field: 'RealtyArea',
        width: 200,
        resizable: true
      },
      {
        headerName: 'عیان',
        field: 'BuildingArea',
        width: 200,
        resizable: true
      },
      {
        headerName: 'مساحت',
        field: 'Area',
        width: 200,
        resizable: true
      },
      {
        headerName: 'اطلاعات گذر',
        field: 'GozarType',
        width: 300,
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
    this.ProductRequest.SearchRecognitionEstate(this.ZoneNo,
      this.BlockNo,
      this.LandNo,
      this.ApartmentNo,
      this.BusinessNo,
      this.RegRegion,
      this.MajorRegNo,
      this.MinorRegNo,
      this.DivisionSeq
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
