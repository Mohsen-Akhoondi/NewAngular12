import { Component, OnInit } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-page-search',
  templateUrl: './asset-page-search.component.html',
  styleUrls: ['./asset-page-search.component.css']
})
export class AssetPageSearchComponent implements OnInit {
  columnDef;
  rowData = [];
  AgridApi: any;
  selectedRow: any;
  AssetTag;
  AssetCode;
  paramObj;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: number;
  HaveMaxBtn = false;
  isClicked: boolean;

  constructor(private ProductRequest: ProductRequestService,
    private router: Router,) { }

  ngOnInit() {
  }

  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد اموال',
        field: 'AssetCode',
        width: 150,
        resizable: true
      },
      {
        headerName: ' کالا ',
        field: 'ProductName',
        width: 150,
        resizable: true
      },

      {
        headerName: 'برچسب اموال ',
        field: 'AssetTag',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شناسه دسترسی',
        field: 'RefrenceNO',
        width: 150,
        resizable: true
      },
      {
        headerName: 'توضيحات ',
        field: 'Note',
        width: 170,
        resizable: true
      },
    ];

  }

  Search() {
    this.ProductRequest.GetAssetList(this.AssetTag, this.AssetCode).subscribe(res => {

      if (res && res.length > 0) {
        this.rowData = res;
      }
    });
  }


  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }


  Show() {

    this.type = 'app-asset';
    this.HaveHeader = true;
    this.startLeftPosition = 15;
    this.startTopPosition = 5;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 97;
    this.PercentWidth = 97;
    this.MainMaxwidthPixel = 2000;
    this.MinHeightPixel = 645;
    this.isClicked = true ;
    this.paramObj = {
      //CostFactorID: this.selectedRow.data.CostFactorID,
      selectedRow: this.selectedRow.data,
      Mode: 'EditMode',
      
    };
    return;

  }

  
  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);

  }

  
  popupclosed() {
    this.HaveMaxBtn = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.type = '';
    this.HeightPercentWithMaxBtn = 95;
    this.isClicked = false ;

  }

}
