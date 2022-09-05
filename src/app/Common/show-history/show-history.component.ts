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

  CheckValidate = false;
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
    IsDisabled: false,
    Required: true
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
  IsCorporate = false;
  btnclicked = false;
  HaveMaxBtn = false;
  type = '';
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader = false;
  startLeftPosition;
  startTopPosition;

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
        headerName: 'نام جدول',
        field: 'TableName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نام فیلد',
        field: 'ColumnName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مقدار قدیم',
        field: 'OldValue',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مقدار جدید',
        field: 'NewValue',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'PersianAuditDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شناسه شی',
        field: 'ObjectID',
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
    if (!this.TablesParams.selectedObject) {
      this.CheckValidate = true;
      this.ShowMessageBoxWithOkBtn('جدول را انتخاب کنید');
      return;
    }
    this.Actor.GetLogHistoryList(
      this.IsUpdate,
      this.FromDate,
      this.ToDate,
      this.IsCorporate,
      this.NgSelectPersonReqParams.selectedObject,
      this.TablesParams.selectedObject,
      this.ObjectCode
    ).subscribe(res => {
      this.rowData = [];
      this.rowData = res;
    })

  }

  popupclosed(event) {
    this.btnclicked = false;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  RadioIsCorporateClick(event) {
    this.IsPerson = event;
    this.IsCorporate = event;
  }

  RedioClick(event) {
    this.TablesParams.selectedObject = null;
    this.rowData = [];
    this.IsUpdate = event;
    if (event === true) {
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'نام جدول',
          field: 'TableName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'نام فیلد',
          field: 'ColumnName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مقدار قدیم',
          field: 'OldValue',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مقدار جدید',
          field: 'NewValue',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ',
          field: 'PersianAuditDate',
          width: 120,
          resizable: true
        },
        {
          headerName: 'نام شخص',
          field: 'ActorName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'شناسه شی',
          field: 'ObjectID',
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
          headerName: 'نام جدول',
          field: 'TableName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مقدار',
          field: 'OldValue',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ',
          field: 'PersianAuditDate',
          width: 120,
          resizable: true
        },
        {
          headerName: 'نام شخص',
          field: 'ActorName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'شناسه شی',
          field: 'ObjectID',
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
    this.FromDate = event.MDate;
  }
  OnToDateChange(event) {
    this.ToDate = event.MDate;
  }
}
