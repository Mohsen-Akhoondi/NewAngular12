import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-contract-status-summary-rep-page',
  templateUrl: './contract-status-summary-rep-page.component.html',
  styleUrls: ['./contract-status-summary-rep-page.component.css']
})
export class ContractStatusSummaryRepPageComponent implements OnInit {
  ReigonListSet = [];
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false,
    MinWidth: '100px',
    DropDownMinWidth: '300px',
  };
  FromRequestPageCount;
  FromRequestTotalItemCount;
  ToRequestPageCount;
  ToRequestTotalItemCount;
  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    MinWidth: '100px',
    DropDownMinWidth: '250px',
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
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    MinWidth: '100px',
    DropDownMinWidth: '250px',
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
  currentRequestSearchTerm;
  FromAdvrtisingtDate: any;
  ToAdvrtisingtDate: any;
  startLeftPosition: number;
  startTopPosition: number;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  btnclicked = false;
  ModuleCode;
  private sub: any;
  AdvertisingNo = '';
  MainMinwidthPixel: number;
  ParamObj;
  SelectedAdvertising: any;

  constructor(
    private ProductRequest: ProductRequestService,
    private router: Router,
    private Region: RegionListService,
    private route: ActivatedRoute,
    private Report: ReportService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.Region.GetRegionList(this.ModuleCode, false).subscribe(res => {
      if (res) {
        this.ReigonListSet = res;
        this.NgSelectRegionParams.selectedObject = res[0].RegionCode;
      }
    });
  }

  onChangeReigonObj(newObj) {
    this.FromRequestParams.selectedObject = this.ToRequestParams.selectedObject = null;
    this.AdvertisingNo = '';
  }

  OnOpenNgSelect(type) {
    switch (type) {
      case 'FromRequest':
        this.FromRequestParams.loading = true;
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
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
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
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

  FetchMoreRequest(event, type) {
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    const ResultList = [];
    this.ProductRequest.GetProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
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
    this.ProductRequest.GetProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
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

  OnAdvertisingDateChange(ADate, Type) {
    switch (Type) {
      case 'From':
        this.FromAdvrtisingtDate = ADate.MDate;
        this.ToAdvrtisingtDate = ADate.MDate;
        break;
      case 'To':
        this.ToAdvrtisingtDate = ADate.MDate;
        break;
      default:
        break;
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 524;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  popupclosed(param) {
    this.btnclicked = false;
    this.type = '';
    this.MainMinwidthPixel = null;
  }

  report() {
    let FromRequestNo = '';
    let ToRequestNo = '';
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    this.Report.PrintContStatusSummRep(this.NgSelectRegionParams.selectedObject, this.AdvertisingNo,
      FromRequestNo, ToRequestNo,
      this.FromAdvrtisingtDate, this.ToAdvrtisingtDate, this.ModuleCode);
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onAdvertisingSearchClick() {
    this.type = 'advertising-search';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.MainMinwidthPixel = 500;
    this.startLeftPosition = 175;
    this.startTopPosition = 48;
    this.ParamObj = {
      RegionCode: this.NgSelectRegionParams.selectedObject,
      HeaderName: 'جستجوی آگهی'
    };
  }
  getOutPutParam(event) {
    if (this.type === 'advertising-search') {
      this.SelectedAdvertising = event;
      this.AdvertisingNo = this.SelectedAdvertising.AdvertisingNo;
    }
  }
  onClearAdvertisingClick() {
    this.AdvertisingNo = '';
  }
}
