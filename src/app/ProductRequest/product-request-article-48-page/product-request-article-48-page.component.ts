import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { isUndefined } from 'util';

@Component({
  selector: 'app-product-request-article-48-page',
  templateUrl: './product-request-article-48-page.component.html',
  styleUrls: ['./product-request-article-48-page.component.css']
})
export class ProductRequestArticle48PageComponent implements OnInit {
  btnclicked = false;
  type: string;
  OverPercentWidth;
  OverMainMaxwidthPixel;
  paramObj;
  IsReOpen;
  ProductRequestObject;
  HaveHeader: boolean;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startLeftPosition: number;
  columnDef;
  rowData = [];
  startTopPosition: number;
  HeightPercentWithMaxBtn: number;
  @Input() ModuleCode;
  @Input() ModuleName;
  IsDown = false;
  RegionItems;
  RegionParams = {
    Items: [],
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  IsUpdateable;
  constructor(
    private router: Router,
    private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'اطلاعات درخواست',
        children: [
          {
            headerName: 'ردیف ',
            field: 'ItemNo',
            width: 80,
            resizable: true
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
            field: 'PersianProductRequestDates',
            width: 120,
            resizable: true
          },
          {
            headerName: 'درخواست کننده',
            field: 'PersonName',
            width: 150,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'موضوع',
            field: 'ProductRequestSubject',
            width: 350,
            resizable: true
          },
        ]
      },
      {
        headerName: 'اطلاعات قرارداد',
        children: [
          {
            headerName: 'کد واحد اجرایی',
            field: 'RegionCode',
            width: 100,
            resizable: true
          },
          {
            headerName: 'سال مالی ',
            field: 'FinYearCode',
            width: 90,
            resizable: true,
            sortable: true,
          },
          {
            headerName: ' کد قرارداد',
            field: 'ContractCode',
            width: 100,
            resizable: true,
            sortable: true,
          },
          {
            headerName: ' نوع قرارداد',
            field: 'ContractTypeName',
            width: 100,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'شماره نامه',
            field: 'LetterNo',
            width: 120,
            resizable: true
          },
          {
            headerName: 'پیمانکار',
            field: 'ContractorName',
            width: 120,
            resizable: true
          },
          {
            headerName: 'مبلغ',
            field: 'ContractAmount',
            HaveThousand: true,
            width: 150,
            resizable: true
          },
          {
            headerName: 'موضوع',
            field: 'Subject',
            width: 600,
            resizable: true
          }
        ]
      }
    ];
  }

  ngOnInit() {
    this.FillRegion();
  }
  onChangeRegion(RegionCode) {
    this.FillMainGrid();
  }
  FillRegion() {
    this.RegionList.GetRegionList(this.ModuleCode, true).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = res[0].RegionCode;
      this.FillMainGrid();
    });
  }
  FillMainGrid() {
    this.IsDown = false;
    if (!isUndefined(this.RegionParams.selectedObject)) {
      this.ProductRequest.GetProductRequestArticle48Provision(this.RegionParams.selectedObject).subscribe(res => {
        this.rowData = res;
        this.IsDown = true;
      });
    } else {
      this.rowData = [];
    }
  }
  RowClick(InputValue) {
    this.ProductRequestObject = InputValue.data;
    this.ProductRequest.CanReOpen(this.ProductRequestObject.CostFactorID, false).subscribe(res => {
      this.IsUpdateable = res;
    });
  }
  OpenPRPage(ModuleViewTypeCode) {
    if (this.ProductRequestObject && this.ProductRequestObject.ProductRequestID) {
      this.type = 'product-request-page';
      this.HaveMaxBtn = true;
      this.btnclicked = true;
      this.startLeftPosition = 10;
      this.startTopPosition = 5;
      this.HeightPercentWithMaxBtn = 97;
      this.paramObj = {
        CostFactorID: this.ProductRequestObject.ProductRequestID,
        ISArticle48: true,
        ModuleViewTypeCode: ModuleViewTypeCode
      };
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  Btnclick(type) {
    switch (type) {
      case 'close':
        this.btnclicked = false;
        this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
        break;
      case 'update':
        if (this.ProductRequestObject) {
          this.OpenPRPage(null);
        } else {
          this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انخاب فرمایید');
        }
        break;
      case 'view':
        if (this.ProductRequestObject) {
          this.OpenPRPage(60000);
        } else {
          this.ShowMessageBoxWithOkBtn('ابتدا ردیف مورد نظر را انخاب فرمایید');
        }
        break;
      case 'insert':
        this.type = 'user-work-log-Contract-Order';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.IsReOpen = true;
        this.startLeftPosition = 35;
        this.startTopPosition = 9;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.OverPercentWidth = 95;
        this.OverMainMaxwidthPixel = 1295;
        this.paramObj = {
          IsArticle48: true
        };
        break;
      default:
        break;
    }
  }
  popupclosed(Param) {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.IsReOpen = false;
    if (this.type === 'user-work-log-Contract-Order' && Param && Param.ProductRequestID) {
      this.ProductRequestObject = Param;
      this.OpenPRPage(null);
    }
    if (this.type === 'product-request-page') {
      this.ProductRequestObject = null;
    }
  }
}
