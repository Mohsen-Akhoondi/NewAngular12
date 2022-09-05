import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
@Component({
  selector: 'app-inventory-qty-page',
  templateUrl: './inventory-qty-page.component.html',
  styleUrls: ['./inventory-qty-page.component.css']
})
export class InventoryQtyPageComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @Input() InputParam;
  @Input() ModuleCode;
  columnDef;
  inventoryRow = [];
  rowData = [];
  isClicked: boolean;
  private gridApi;
  selectedRow: any;
  HeightPercentWithMaxBtn: number;
  PercentWidth: number;
  MinHeightPixel: number;
  btnclicked = false;
  MainMaxwidthPixel;
  IsCustomerOrder;
  ItemNo;
  ProductName;
  CostumerOrderQty: any;
  constructor(private ContractList: ContractListService,) {

  }

  ngOnInit() {
    this.IsCustomerOrder = this.InputParam.IsCustomerOrder;
    this.columnDefinition(this.InputParam.IsCustomerOrder);

  }

  columnDefinition(IsCustomerOrder = false) {
    if (IsCustomerOrder) {
      this.inventoryRow = this.InputParam.ProductList;
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 60,
          resizable: true,
        },
        {
          headerName: 'کد کالا',
          field: 'ProductCode',
          width: 200,
          resizable: true,
          editable: false,
          suppressSizeToFit: true
        },
        {
          headerName: 'نام کالا',
          field: 'ProductName',
          width: 400,
          resizable: true,
          editable: false,
          suppressSizeToFit: true
        },
      ];
    }
    else {
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 60,
          resizable: true,
        },
        {
          headerName: 'نام کالا',
          field: 'ProductName',
          width: 250,
          resizable: true,
          editable: false,
          suppressSizeToFit: true
        },
        {
          headerName: 'موجودی انبار ',
          field: 'QTY',
          width: 100,
          resizable: true,
          editable: false,
          suppressSizeToFit: true
        }
      ];
      this.ContractList.GetCostumerOrderQty(200, null, this.InputParam.ProductPatternID).subscribe(res3 => {
        this.CostumerOrderQty = res3.Qty;
        this.inventoryRow = res3.ProductList;
      });
    }

  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  RowClick(event) {
    this.selectedRow = event.data;
  }


  
  popupclosed(event) {
    // this.btnclicked = true;
    this.isClicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }

  Close() {

    //this.btnclicked = false;
    this.Closed.emit(true);
  }

  BtnOkClick() {
    this.OutPutParam.emit(this.selectedRow);
    this.Close();
  }

}
