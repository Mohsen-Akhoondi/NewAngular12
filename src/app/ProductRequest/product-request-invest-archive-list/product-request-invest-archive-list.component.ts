import { of, forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-request-invest-archive-list',
  templateUrl: './product-request-invest-archive-list.component.html',
  styleUrls: ['./product-request-invest-archive-list.component.css']
})
export class ProductRequestInvestArchiveListComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ModuleCode: number;
  OrginalModuleCode: number;
  ReigonListSet = [];
  RegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };

  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '350px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-from-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 30, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 20, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', CanGrow: true, HeaderName: 'Subject', width: 35, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 30, },
        { HeaderCaption: 'کد', width: 20, },
        { HeaderCaption: 'موضوع', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  ToRequestItems = [];
  ToRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-to-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'کد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  FromRequestPageCount;
  FromRequestTotalItemCount;
  ToRequestPageCount;
  ToRequestTotalItemCount;
  currentRequestSearchTerm;
  selectedRow: any;
  rowData = [];
  AgridApi: any;
  columnDef;
  selectedRegion = -1;
  type: string;
  HaveHeader: boolean;
  btnclicked: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HaveMaxBtn = false;
  BtnClickedName: string;
  OverPixelWidth: any;
  IsDeleted: boolean = false;
  HeightPercentWithMaxBtn: number;
  PercentWidth: number;

  constructor(private route: ActivatedRoute,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });

    this.columnDef = [
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
        field: 'Subject',
        width: 350,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    forkJoin([
      this.Region.GetRegionList(this.ModuleCode, false),
    ]).subscribe(res => {
      this.ReigonListSet = res[0];
    });
  }

  onChangeReigonObj(newObj) {
    // this.NgSelectModuleParams.selectedObject = null;
    // this.VWExeUnitParams.selectedObject = null;
    // this.DealMethodParams.selectedObject = null;
    // this.ModuleNameListSet = [];
    // this.rowData = [];
    // this.NgSelectWFNodeList.selectedObject = null;
    // this.Workflow.GetWorkflowNodeByRegionCode(newObj).subscribe(ress => {
    //   this.NgSelectWFNodeItems = ress;
    // });
    // this.RolesParams.selectedObject = null;
    // this.Roles_Open();
  }


  OnOpenNgSelect(type) {
    switch (type) {
      case 'FromRequest':
        this.FromRequestParams.loading = true;
        this.ProductRequest.GetProductRequestInvestPaging(1, 30, '',
          '', this.RegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
              }
            });
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          });
        break;
      case 'ToRequest':
        this.ToRequestItems = [];
        this.ToRequestParams.loading = true;
        this.ProductRequest.GetProductRequestInvestPaging(1, 30, '',
          '', this.RegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
              }
            });
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          });
        break;
      default:
        break;
    }
  }


  onChangeNgSelect(event, type) {
    switch (type) {
      case 'FromRequest':
        const ToItems = [];
        ToItems.push(this.FromRequestItems.find(x => x.CostFactorID === event));
        this.ToRequestItems = ToItems;
        this.ToRequestParams.selectedObject = this.FromRequestParams.selectedObject;
        break;
      default:
        break;
    }
  }

  FetchMoreRequest(event, type) {
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    const ResultList = [];
    this.ProductRequest.GetProductRequestInvestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.RegionParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          if (element.ProductRequestNo) {
            element.ProductRequestCodeSub = element.ProductRequestNo;
          }
          if (element.search) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
          }
          if (element.ProductRequestCode) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
          }
          ResultList.push(element);
        });
        if (type === 'From') {
          this.FromRequestItems = ResultList;
          this.FromRequestParams.loading = false;
        } else {
          this.ToRequestItems = ResultList;
          this.ToRequestParams.loading = false;
        }
      });
  }

  doRequestSearch(event, type) {
    this.currentRequestSearchTerm = event.term;
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ProductRequestNo';
    }
    this.ProductRequest.GetProductRequestInvestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.RegionParams.selectedObject).subscribe((res: any) => {
        if (this.currentRequestSearchTerm === event.term) {
          res.List.forEach(element => {
            if (element.ProductRequestNo) {
              element.ProductRequestCodeSub = element.ProductRequestNo;
            }
            if (element.search) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
            }
            if (element.ProductRequestCode) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
            }
          });
          if (type === 'From') {
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          } else {
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          }
        }
      });
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  onChangeRegionObj(newObj) {
    this.selectedRegion = newObj;
    this.selectedRow = null;
  }

  Search() {
    this.ProductRequest.GetProductRequestInvestList(
      this.RegionParams.selectedObject,
      this.FromRequestParams.selectedObject,
      this.ToRequestParams.selectedObject).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'رکوردی جهت نمایش یافت نشد';
          this.btnclicked = true;
          this.startLeftPosition = 500;
          this.startTopPosition = 100;
        }
      });
  }

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    if (this.IsDeleted) {
      this.ProductRequest.GetProductRequestInvestList(
        this.RegionParams.selectedObject,
        this.FromRequestParams.selectedObject,
        this.ToRequestParams.selectedObject).subscribe(res => {
          if (res && res.length > 0) {
            this.rowData = res;
          } else {
            this.rowData = []
          }
        });

    }
  }

  FullDeleteProdReq() {
    if (this.selectedRow.data && this.selectedRow.data.CostFactorID) {
      this.BtnClickedName = 'FullDelProdReq';
      this.ShowMessageBoxWithYesNoBtn('آیا مایل به حذف درخواست انتخاب شده به همراه اسناد مربوطه میباشید؟');
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا یک ردیف را برای حذف انتخاب نمایید.');
    }
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'FullDelProdReq' && ActionResult === 'YES') {
      const CostFactorID = this.selectedRow.data.CostFactorID;
      this.FullDeleteProductRequest(CostFactorID, this.ModuleCode);
    }
    else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }


  FullDeleteProductRequest(CostFactorID: number, ModuleCode: number) {
    this.ProductRequest.DeleteProductRequestWithFlowAndArchives(CostFactorID, ModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف موفقیت آمیز بود');
      this.IsDeleted = true;
    },
      err => {
        this.ShowMessageBoxWithOkBtn('حذف با شکست مواجه شد.');
      });
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverPixelWidth = null;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.OverPixelWidth = null;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  close(): void {
    this.btnclicked = false;
    if (this.ModuleCode === 2785 || this.ModuleCode === 2872) {
      this.Closed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }

}
