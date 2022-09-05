import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListaAnalayseService } from 'src/app/Services/BaseService/PriceListaAnalayseService';


@Component({
  selector: 'app-price-list-analayse',
  templateUrl: './price-list-analayse.component.html',
  styleUrls: ['./price-list-analayse.component.css']
})
export class PriceListAnalayseComponent implements OnInit {
  @Input() PopupParam;  // PopupParam.PriceListTopicID
  @Output() PriceListAnalayseClosed: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  gridrows_1;
  gridrows_2;
  gridrows_3;
  gridrows_4;

  sum_1 = 0;
  sum_2 = 0;
  sum_3 = 0;
  sum_4 = 0;
  sum_all = 0;

  gridcolumns = [
    {
      headerName: 'کد عامل',
      field: 'AnalayzePriceCode',
      width: 100
    },
    {
      headerName: 'شرح عامل',
      field: 'AnalayzePriceName',
      width: 300
    },
    {
      headerName: 'واحد عامل',
      field: 'WorkUnitName',
      width: 100
    },
    {
      headerName: 'مقدار',
      field: 'Qty',
      HaveThousand: true,
      width: 80
    },
    {
      headerName: 'بهای واحد',
      field: 'Price',
      HaveThousand: true,
      width: 120
    },
    {
      headerName: 'ضریب',
      field: 'Coef',
      HaveThousand: true,
      width: 80
    },
    {
      headerName: 'حاصل',
      field: 'FinalPrice',
      HaveThousand: true,
      width: 150,
      minWidth: 50,
      maxWidth: 150
    },
    {
      headerName: ' وزن',
      field: 'Weight',
      width: 100,
      suppressSizeToFit: true,
      resizable: true
    },
  ];
  gridApi1: any;
  gridApi2: any;
  gridApi3: any;
  gridApi4: any;
  manpowersum = '0';
  machineryssum = '0';
  materialssum = '0';
  transportsum = '0';
  constructor(private PriceListaAnalayse: PriceListaAnalayseService) { }
  onGridReady1(params) {
    this.gridApi1 = params.api;
  }

  onGridReady2(params) {
    this.gridApi2 = params.api;
  }

  onGridReady3(params) {
    this.gridApi3 = params.api;
  }

  onGridReady4(params) {
    this.gridApi4 = params.api;
  }
  ngOnInit() {
    this.PriceListaAnalayse.GetPriceListAnalayse(this.PopupParam.PriceListTopicID, 1).subscribe(res => {
      this.gridrows_1 = res;
      res.forEach(element => {
        this.sum_1 = this.sum_1 + element.FinalPrice;
      });

      if (this.sum_1 !== 0) {
          this.manpowersum = this.sum_1.toLocaleString(); // toFixed(6).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
          this.manpowersum = '0';
      }

      this.sum_all  = this.sum_all + this.sum_1;
  });

  this.PriceListaAnalayse.GetPriceListAnalayse(this.PopupParam.PriceListTopicID, 2).subscribe(res => {
    this.gridrows_2 = res;
    res.forEach(element => {
      this.sum_2 = this.sum_2 + element.FinalPrice;
    });
    if (this.sum_2 !== 0) {
        this.machineryssum = this.sum_2.toLocaleString(); // toFixed(6).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      this.machineryssum = '0';
    }

    this.sum_all  = this.sum_all + this.sum_2;
});


this.PriceListaAnalayse.GetPriceListAnalayse(this.PopupParam.PriceListTopicID, 3).subscribe(res => {
  this.gridrows_3 = res;
  res.forEach(element => {
    this.sum_3 = this.sum_3 + element.FinalPrice;
  });
  if (this.sum_3 !== 0) {
      this.materialssum = this.sum_3.toLocaleString(); // toFixed(6).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    this.materialssum = '0';
  }
  this.sum_all  = this.sum_all + this.sum_3;
});

this.PriceListaAnalayse.GetPriceListAnalayse(this.PopupParam.PriceListTopicID, 4).subscribe(res => {
  this.gridrows_4 = res;
  res.forEach(element => {
    this.sum_4 = this.sum_4 + element.FinalPrice;
  });
  if (this.sum_4 !== 0) {
      this.transportsum = this.sum_4.toLocaleString(); // toFixed(6).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    this.transportsum = '0';
  }
  this.sum_all  = this.sum_all + this.sum_4;
});
  }

  close() {
    this.PriceListAnalayseClosed.emit(true);
  }
}
