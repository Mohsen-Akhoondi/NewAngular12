import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AnalayzePriceTypeService } from 'src/app/Services/BaseService/AnalayzePriceTypeService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { AnalayzePriceListService } from 'src/app/Services/BaseService/AnalayzePriceListService';
import { of } from 'rxjs';
import { NgSelectConfig } from '../ng-select/public-api';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';


@Component({
  selector: 'app-analayze-price',
  templateUrl: './analayze-price.component.html',
  styleUrls: ['./analayze-price.component.css']
})
export class AnalayzePriceComponent implements OnInit {
  @Output() AnalayzePriceClosed: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  AnalayzePriceTypeSet = [];
  FinYearSet = [];
  AnalayzePriceSet = [];

  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicCodeName',
    bindValueProp: 'PriceListTopicCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'price-list-topic'
  };
  AnalayzePriceTypeParams = {
    bindLabelProp: 'AnalayzePriceTypeName',
    bindValueProp: 'AnalayzePriceTypeCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'price-list-topic'
  };
  columnDefs = [
    {
      headerName: 'کد فهرست بها',
      field: 'AnalayzePriceCode',
      sortable: true,
      filter: true
    },
    {
      headerName: 'نام فهرست بها',
      field: 'AnalayzePriceName',
      sortable: true,
      filter: true
    },
    {
      headerName: 'نوع عامل فهرست بها',
      field: 'AnalayzePriceTypeCode',
      sortable: true,
      filter: true
    },
    { headerName: 'واحد', field: 'WorkUnitCode', sortable: true, filter: true },

    { headerName: ' مبلغ', field: 'Price', HaveThousand: true, sortable: true, filter: true },
  ];

  rowData: any;

  onChangeFinYearObj(newObj) {
    this.PriceListTopicParams.selectedObject = newObj;
    this.getAnalayzePriceData();
  }
  onChangeAnalayzePriceTypeObj(newObj) {
    this.AnalayzePriceTypeParams.selectedObject = newObj;
    this.getAnalayzePriceData();
  }

  constructor(
    private router: Router,
    private AnalayzePriceType: AnalayzePriceTypeService,
    private FinYear: FinYearService,
    private PriceList: PriceListService,
    private AnalayzePrice: AnalayzePriceListService,
    config: NgSelectConfig
  ) {
    config.notFoundText = 'موردی یافت نشد';
  }

  ngOnInit() {
    this.getNewData();
    this.getFinYearData();
    this.rowData = of([]);
  }
  getNewData(): void {
    this.AnalayzePriceType.GetAnalayzePricTypeList().subscribe(res => {
      this.AnalayzePriceTypeSet = res;
    });
  }
  getFinYearData(): void {
    this.PriceList.GetPriceListTopics(true).subscribe(res => {
      this.FinYearSet = res;
      for (const i of res) {
        i.PriceListTopicCodeName = i.PriceListTopicCode + ' - ' + i.PriceListTopicName;
      }
      this.PriceListTopicParams.selectedObject = res[0].PriceListTopicCode;
    });
  }

  getAnalayzePriceData(): void {
    if (this.AnalayzePriceTypeParams.selectedObject == null) {
      this.AnalayzePriceTypeParams.selectedObject = 0;
    }
    if (this.PriceListTopicParams.selectedObject == null) {
      this.PriceListTopicParams.selectedObject = 0;
    }
    this.rowData = this.AnalayzePrice.GetAnalayzePriceList(
      this.PriceListTopicParams.selectedObject,
      this.AnalayzePriceTypeParams.selectedObject
    );
  }
  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
}
