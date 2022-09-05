import { Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-product-request-related-items',
  templateUrl: './product-request-related-items.component.html',
  styleUrls: ['./product-request-related-items.component.css']
})
export class ProductRequestRelatedItemsComponent implements OnInit {
  @Input() PopupParam;
  @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  MaincolumnDef;
  gridApi;
  rowData: any;
  constructor(
    private ProductService: ProductRequestService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rowData = [];
    if (this.PopupParam) {
      this.ProductService.getPRByContractId(this.PopupParam.ContractID).subscribe(res => {
        this.rowData = res;
      });
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نوع درخواست',
        field: 'ProductRequestType',
        width: 90,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'شماره',
        field: 'ProductRequestNo',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'تاریخ',
        field: 'PersianProductRequestDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت مجری',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت متولی',
        field: 'PRStackHolderName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'درخواست کننده',
        field: 'PersonNameSet',
        width: 150,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'موضوع درخواست',
        field: 'ProductRequestSubject',
        width: 350,
        resizable: true
      },
      {
        headerName: 'حالت درخواست',
        field: 'ProductRequestStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع گردش کار',
        field: 'WorkflowTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت درخواست',
        field: 'RoleName',
        width: 350,
        resizable: true
      },
    ];
  }

  onGridReady(Param) {
    this.gridApi = Param.api;
  }

  closeModal() {
    this.closed.emit(true);
  }

}
