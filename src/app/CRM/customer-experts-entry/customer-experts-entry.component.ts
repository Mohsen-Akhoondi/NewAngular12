import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { CustomerOrderService } from 'src/app/Services/CRM/CustomerOrderService';

@Component({
  selector: 'app-customer-experts-entry',
  templateUrl: './customer-experts-entry.component.html',
  styleUrls: ['./customer-experts-entry.component.css']
})
export class CustomerExpertsEntryComponent implements OnInit {
  CheckValidate = false;
  NgSelectActorCSMParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'Actor-MCP',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' },
        { HeaderCaption: 'نام کاربری', HeaderName: 'LoginName', width: 35, MinTermLenght: 3, SearchOption: 'LoginName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, },
        { HeaderCaption: 'نام کاربری', width: 35, },],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectCustomerReqParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'user-Customer-Req-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام شخص', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه ملي', width: 35, },
        { HeaderCaption: 'نام شخص', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  CustomerReqItems = [];
  gridApi: any;
  columnDef;
  rowData = [];
  IsInternal = true;
  ModuleCode: number;
  OrginalModuleCode: number;
  btnclicked: boolean;
  type: string;
  startTopPosition: number;
  startLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CustomerExpertObject: any;
  CustomerExpertID: any;
  HaveMaxBtn: boolean;
  MinHeightPixel: any;
  PercentWidth: any;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: any;
  ActorID: any;

  constructor(private router: Router,
    private RefreshPersonItems: RefreshServices,
    private ActorList: ActorService,
    private CustomerOrder: CustomerOrderService,
    private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'کارشناس امور مشتریان',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectActorCSMParams,
          Items: [],
          MoreFunc: this.FetchMoreActorMCP,
          FetchByTerm: this.FetchActorByTermMCP,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ActorId) {
            params.data.ActorID = params.newValue.ActorId;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: true,
        width: 450,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 130,
        resizable: true,
        editable: () => {
          return true;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortStartDate = params.newValue.MDate;
            params.data.PersianStartDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortStartDate = null;
            params.data.PersianStartDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 130,
        resizable: true,
        editable: () => {
          return true;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortEndDate = params.newValue.MDate;
            params.data.PersianEndDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortEndDate = null;
            params.data.PersianEndDate = '';
            return false;
          }
        }
      },
    ];
  }

  ngOnInit() {
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  OnSave() {
    if (!this.NgSelectCustomerReqParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد مشتری را تکمیل فرمایید');
    }
    else {
      this.gridApi.stopEditing();
      const CustomerExpertList = [];
      this.gridApi.forEachNode(node => {
        var keys = Object.keys(node.data);
        const ActorIdList = [];
        if (node.data.EntityList) {
          node.data.EntityList.forEach(Entity => {
            let str = 'ActorName' + Entity.EntityTypeID.toString()
            let ID = 'ActorId' + Entity.EntityTypeID.toString();
            var key = keys.find(x => x === str);

            if (key && node.data[key]) {
              if (node.data[key].ActorID) {
                ActorIdList.push(node.data[key].ActorID);
              } else {
                key = keys.find(x => x === ID);
                if (key && node.data[key]) {
                  ActorIdList.push(node.data[key]);
                }
              }
            }
          });
        }
        const CustomerExpertObj = {
          CustomerExpertID: node.data.CustomerExpertID,
          ActorID: this.NgSelectCustomerReqParams.selectedObject,
          CustomerExpertActorID: node.data.CustomerExpertActorID ? node.data.CustomerExpertActorID : node.data.ActorID,
          CustomerExpertActorName: node.data.CustomerExpertActorName ? node.data.CustomerExpertActorName : node.data.ActorName,
          StartDate: node.data.ShortStartDate,
          EndDate: node.data.ShortEndDate,
        };
        CustomerExpertList.push(CustomerExpertObj);
      });
      this.CustomerOrder.SaveCustomerExperts(this.NgSelectCustomerReqParams.selectedObject, CustomerExpertList, this.ModuleCode).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
    }
  }

  onChangeCustomer(event) {
    if (event) {
      this.CustomerOrder.GetExpertsList(event).subscribe(res => {
        this.rowData = res;
        this.rowData.forEach(element => {
          element.ActorId = element.CustomerExpertActorID;
          element.ActorName = element.CustomerExpertActorName;

        });
      });
    }
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  FetchMoreActorMCP(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ActorList.GetpersonPagingWithLoginName(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, true, false, true).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Actor-MCP'
      });
    });
  }

  FetchActorByTermMCP(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    event.Owner.ActorList.GetpersonPagingWithLoginName(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      true, false, true).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor-MCP'
        });
      });
  }

  rdoCorporateTypeClick(Type) {
    this.IsInternal = Type;
  }

  CustomerReq_FetchMore(event) {
    this.NgSelectCustomerReqParams.loading = true;
    const ResultList = [];
      // tslint:disable-next-line: no-shadowed-variable
      const promise = new Promise((resolve, reject) => {
        this.ActorList.GetCustomerActorPaging(
          event.PageNumber,
          event.PageSize,
          event.term,
          event.SearchOption,
          false,
          false,
          false,
          null,
          null,
          null,
          false,
          null,
          false,
          null,
          this.IsInternal).subscribe(res => {
            event.CurrentItems.forEach(el => {
              ResultList.push(el);
              this.CustomerReqItems.push(el);
            });
            res.List.forEach(element => {
              ResultList.push(element);
              this.CustomerReqItems.push(element);
            });
            resolve(res.TotalItemCount);
          }
          );
      }).then((TotalItemCount: number) => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: ResultList,
          term: event.term,
          TotalItemCount: TotalItemCount,
          PageCount: Math.ceil(TotalItemCount / 30),
          type: 'user-Customer-Req-search'
        });
      });
  }

  CustomerReqOpened(ActorID = null) {
      this.ActorList.GetCustomerActorPaging(
        1,
        30, 
        '', 
        '', 
        false, 
        false, 
        false, 
        ActorID,
        null,
        null,
        false,
        null,
        false,
        null,
        this.IsInternal
        ).subscribe(res => {
        this.CustomerReqItems = res.List;
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'user-Customer-Req-search'
        });
      });
  
  }

  Customer_Req_DoSearch(event) {
    this.NgSelectCustomerReqParams.loading = true;
      this.ActorList.GetCustomerActorPaging(
        event.PageNumber, 
        event.PageSize, 
        event.term, 
        event.SearchOption,
        false, 
        false, 
        false,
        null,
        null,
        null,
        false,
        null,
        false,
        null,
        this.IsInternal).subscribe(res => {
          this.CustomerReqItems = res.List,
            this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
              List: res.List,
              term: event.term,
              TotalItemCount: res.TotalItemCount,
              PageCount: Math.ceil(res.TotalItemCount / 30),
              type: 'user-Customer-Req-search'
            });
        });
    this.NgSelectCustomerReqParams.loading = false;
  }

  onCellEditingStartedMCP(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.columnDef[1].cellEditorParams.Params.loading = true;
      this.ActorList.GetpersonPagingWithLoginName(1, 30, '', '', true, false, true, event.data.CustomerExpertActorID).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Actor-MCP'
        });
      });
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveMaxBtn = false;
    this.startTopPosition = 182;
    this.startLeftPosition = 557;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed(event) {
    this.btnclicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.HaveMaxBtn = false;

  }


}
