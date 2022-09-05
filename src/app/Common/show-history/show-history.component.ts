import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-show-history',
  templateUrl: './show-history.component.html',
  styleUrls: ['./show-history.component.css']
})
export class ShowHistoryComponent implements OnInit {

  columnDef;
  rowData = [];
  IsUpdate = true;
  TablesParams = {
    bindLabelProp: 'PersianTableName',
    bindValueProp: 'TableName',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  TablesDataList;
  ObjectCode;
  IsPerson = false;
  NgSelectPersonReqParams = {
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
    type: 'user-person-Req-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  PersonReqItems: any;
  FromDate;
  ToDate;
  IsCorporate;
  constructor(
    private common: CommonService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices
  ) { }

  ngOnInit() {
    this.rowData = [];
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام فیلد',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مقدار قدیم',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مقدار جدید',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'PRCostCenterName',
        width: 120,
        resizable: true
      }
    ];
    forkJoin([
      this.common.GetAllTable(this.IsUpdate ? 16 : 6),
    ]).subscribe(res => {
      this.TablesDataList = res[0];
    });
  }

  Btnclick() {
    this.rowData = [];
  }

  RadioIsCorporateClick(event) {
    this.IsPerson = event;
  }

  RedioClick(event) {
    this.IsUpdate = event;
    if(event === true) {
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'نام فیلد',
          field: 'PRCostCenterName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مقدار قدیم',
          field: 'PRCostCenterName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مقدار جدید',
          field: 'PRCostCenterName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ',
          field: 'PRCostCenterName',
          width: 120,
          resizable: true
        }
      ];
    } else {
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'مقدار',
          field: 'PRCostCenterName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ',
          field: 'PRCostCenterName',
          width: 120,
          resizable: true
        }
      ];
    }
    this.common.GetAllTable(this.IsUpdate ? 16 : 6).subscribe(res => {
      this.TablesDataList = res;
    });
  }
  PersonReq_FetchMore(event) {
    this.NgSelectPersonReqParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        !this.IsPerson,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonReqItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonReqItems.push(element);
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
        type: 'user-person-Req-search'
      });
    });
  }

  Person_Req_DoSearch(event) {
    this.NgSelectPersonReqParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      !this.IsPerson,
      false,
      false).subscribe(res => {
        this.PersonReqItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-Req-search'
          });
      });
    this.NgSelectPersonReqParams.loading = false;
  }

  PersonReqOpened() {
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', !this.IsPerson, false, false).subscribe(res => {
      this.PersonReqItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }
  OnFromDateChange(event) {
    this.FromDate = event;
  }
  OnToDateChange(event) {
    this.ToDate = event;
  }
}
