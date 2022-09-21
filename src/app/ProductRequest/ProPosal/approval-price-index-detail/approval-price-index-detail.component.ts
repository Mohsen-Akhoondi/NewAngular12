import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { isUndefined } from 'util';
@Component({
  selector: 'app-approval-price-index-detail',
  templateUrl: './approval-price-index-detail.component.html',
  styleUrls: ['./approval-price-index-detail.component.css']
})
export class ApprovalPriceIndexDetailComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  columnDef;
  gridApi: any;
  btnclicked: boolean;
  OrderCommitionID: any;
  CostFactorID: any;
  DeadLineDate: any;
  CommitionDate: any;
  rowData = [];


  constructor(
    private router: Router,
    private ProductRequest: ProductRequestService,
  ) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'کد ردیف فهرست بها ',
        field: 'PriceListTopicCode',
        width: 130,
        resizable: true,
      },
      {
        headerName: 'مبلغ برآورد ردیف ',
        field: 'Amount',
        width: 130,
        resizable: true,
      },
      {
        headerName: 'درصد تطابق راهداری',
        field: 'TollPercent',
        width: 130,
        resizable: true,
      },
      {
        headerName: 'برآورد تطبیق یافته راهداری',
        field: 'TollAmount',
        width: 165,
        resizable: true,
      },
      {
        headerName: 'درصد تطابق انبیه',
        field: 'BuldingPercent',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'براورد تطبیق یافته انبیه',
        field: 'BuldingAmount',
        width: 135,
        resizable: true,
      },
      {
        headerName: 'درصد تطابق راه و باند',
        field: 'RoadPercent',
        width: 130,
        resizable: true,
      },
      {
        headerName: 'براورد تطبیق یافته راه و باند',
        field: 'RoadAmount',
        width: 180,
        resizable: true,
      },
    ];
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  ngOnInit() {
    this.OrderCommitionID = this.InputParam.OrderCommitionID && !isUndefined(this.InputParam.OrderCommitionID) ? this.InputParam.OrderCommitionID : null;
    this.CostFactorID = this.InputParam.CostFactorID && !isUndefined(this.InputParam.CostFactorID) ? this.InputParam.CostFactorID : null;
    this.DeadLineDate = this.InputParam.DeadLineDate && !isUndefined(this.InputParam.DeadLineDate) ? this.InputParam.DeadLineDate : null;
    this.CommitionDate = this.InputParam.CommitionDate && !isUndefined(this.InputParam.CommitionDate) ? this.InputParam.CommitionDate : null;
    this.ProductRequest.GetApprovalPriceIndexDetail(this.CostFactorID, this.OrderCommitionID,
      this.DeadLineDate, this.CommitionDate).subscribe(ress => {
        this.rowData = ress;
      });
  }

  closeModal() {
    this.Closed.emit(true);
  }
  popupclosed() {
    this.btnclicked = false;
  }

}
