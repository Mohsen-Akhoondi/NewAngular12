import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransferDistanceItemService } from 'src/app/Services/BaseService/TransferDistanceItemService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { of } from 'rxjs';
@Component({
  selector: 'app-transfer-distance-item',
  templateUrl: './transfer-distance-item.component.html',
  styleUrls: ['./transfer-distance-item.component.css']
})
export class TransferDistanceItemComponent implements OnInit {
  @Input() PopupParam;
  @Output() TransferDistanceItemClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ModuleCode;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  btnclicked = false;
  selectedRow: any;
  type: string;
  private gridApi;
  ContactPriceListPatternID;
  selectedPriceListTopicID;
  selectedPriceListTopicCode;
  TransferDistanceItemRow: any;
  PriceListTopicsSet;
  ProductListSet;
  selectedProductID: any;
  ProductName: any;
  rowData: any;
  PriceListTopicSet: any;
  IsEditable = true;
  PriceListTopicCode: any;
  ProductID: any;
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicCodeName',
    bindValueProp: 'PriceListTopicCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProductParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private TransferDistanceItem: TransferDistanceItemService,
    private PriceList: PriceListService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'Item',
        width: 80,
        resizable: true,
      },
      {
        headerName: 'ردیف',
        field: 'PriceListTopicCode',
        width: 110,
        resizable: true,
      },
      {
        headerName: 'نام ',
        field: 'PriceListTopicName',
        width: 400,
        resizable: true,
      },
      {
        headerName: 'واحد کالا',
        field: 'ScaleName',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'از مسافت',
        field: 'FromDistance',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تا مسافت',
        field: 'ToDistance',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 200,
        resizable: true,
      },
    ];
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (this.PopupParam) {
      this.PriceListTopicParams.selectedObject = this.PopupParam.PriceListTopicCode;
      this.ProductParams.selectedObject = this.PopupParam.ProductID;
    }
    this.IsEditable = this.ModuleCode === 2704;
    this.getFinYearData();
    this.rowData = of([]);
  }
  onChangePriceListTopicObj(newObj) {
    this.PriceListTopicParams.selectedObject = newObj;
    this.TransferDistanceItem.GetProductList(this.PriceListTopicParams.selectedObject).subscribe(res => {
      this.ProductListSet = res;
      this.GetTransferDistanceItemData();
    });
  }
  onChangeProductObj(newObj) {
    this.ProductParams.selectedObject = newObj;
    this.GetTransferDistanceItemData();
  }


  getFinYearData(): void {
    this.PriceList.GetPriceListTopics(true).subscribe(res => {
      this.PriceListTopicSet = res;
      for (const i of res) {
        i.PriceListTopicCodeName = i.PriceListTopicCode + ' - ' + i.PriceListTopicName;
      } if (this.PopupParam) {
        this.PriceListTopicParams.selectedObject = this.PopupParam.PriceListTopicCode;
        this.ProductParams.selectedObject = this.PopupParam.ProductID;
        this.rowData = this.TransferDistanceItem.GetTransferDistanceItem(
          this.PriceListTopicParams.selectedObject,
          this.ProductParams.selectedObject,
          this.PopupParam.TopicCode
        );
      } else { this.PriceListTopicParams.selectedObject = res[0].PriceListTopicCode; }
      this.TransferDistanceItem.GetProductList(this.PriceListTopicParams.selectedObject).subscribe(ress => {
        this.ProductListSet = ress;
      });
    });
  }

  GetTransferDistanceItemData(): void {
    if (this.ProductParams.selectedObject == null) {
      this.ProductParams.selectedObject = 0;
    }
    if (this.PriceListTopicParams.selectedObject == null) {
      this.PriceListTopicParams.selectedObject = 0;
    }

    this.rowData = this.TransferDistanceItem.GetTransferDistanceItem(
      this.PriceListTopicParams.selectedObject,
      this.ProductParams.selectedObject,
      this.PopupParam.TopicCode
    );
  }
  popupclosed() {
    this.btnclicked = false;
  }
  closeModal() {
    if (this.PopupParam) {
      this.TransferDistanceItemClosed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }

}
