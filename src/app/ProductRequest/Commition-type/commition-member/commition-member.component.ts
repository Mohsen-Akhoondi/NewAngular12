import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { forkJoin } from 'rxjs';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-commition-member',
  templateUrl: './commition-member.component.html',
  styleUrls: ['./commition-member.component.css']
})
export class CommitionMemberComponent implements OnInit {
  @Output() CommitionMemberComponentClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  rowData;
  RegionListSet = [];
  CommitionListSet = [];
  selectedRow: any;
  SelectedPersonTypeCode: number;
  gridApi;
  btnclicked = false;
  PopUpType;
  ModuleCode;
  HaveSave = false;
  HaveHeader;
  HaveMaxBtn;
  startLeftPosition;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true
  };
  CommitionParams = {
    bindLabelProp: 'CommitionName',
    bindValueProp: 'CommitionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true
  };
  NgSelectVSParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'supplier',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectUTParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitTopicID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'commission-member-unit-topic',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد عنوان واحد', HeaderName: 'UnitTopicCode', width: 35, MinTermLenght: 3, SearchOption: 'UnitTopicCode' },
        { HeaderCaption: 'نام عنوان واحد', HeaderName: 'UnitTopicName', width: 53, MinTermLenght: 3, SearchOption: 'UnitTopicName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد عنوان واحد', width: 35, },
        { HeaderCaption: 'نام عنوان واحد', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  constructor(private ProductRequest: ProductRequestService,
    private RegionList: RegionListService,
    private Order: OrderService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private RefreshUnitTopicItems: RefreshServices,
    private router: Router,
    private User: UserSettingsService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreSupplerPerson,
          FetchByTerm: this.FetchSupplerPersonByTerm,
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
        editable: true,
        width: 180,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع اعتبار',
        field: 'PersianStartDate',
        width: 120,
        resizable: true,
        editable: true,
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
      },
      {
        headerName: 'تاریخ پایان اعتبار',
        field: 'PersianEndDate',
        width: 120,
        resizable: true,
        editable: true,
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
      },
      {
        headerName: 'شماره نامه ابلاغ',
        field: 'AttachLetterCode',
        editable: true,
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ نامه ابلاغ',
        field: 'PersianAttachLetterDate',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianAttachLetterDate',
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
      },
      {
        headerName: 'شماره نامه انفصال',
        field: 'DetachLetterCode',
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاريخ نامه انفصال',
        field: 'PersianDetachLetterDate',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianDetachLetterDate',
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
      },
      {
        headerName: 'اولويت مرتب سازي اعضاي کميسيون',
        field: 'SortLevel',
        editable: true,
        width: 170,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent
      },
      {
        headerName: 'کد عنوان واحد',
        field: 'UnitTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectUTParams,
          Items: [],
          MoreFunc: this.FetchMoreUnitTopic,
          FetchByTerm: this.FetchUnitTopicByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.UnitTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.UnitTopicName) {
            params.data.UnitTopicName = params.newValue.UnitTopicName;
            params.data.UnitTopicID = params.newValue.UnitTopicID;
            return true;
          } else {
            params.data.UnitTopicName = '';
            params.data.UnitTopicID = null;
            return false;
          }
        },
        editable: true,
        width: 150,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    forkJoin([
      this.RegionList.GetSpecialRegionList(this.ModuleCode, true),
      this.Order.GetCommitionList()
    ]).subscribe(res => {
      if (res[0]) {
        this.RegionListSet = res[0];
        this.RegionParams.selectedObject = res[0][0].RegionCode;
      }
      if (res[1]) {
        this.CommitionListSet = res[1];
        this.CommitionParams.selectedObject = res[1][0].CommitionCode;
      }
      this.onLoadGrid();
    });
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          default:
            break;
        }

      });
    });

  }
  FetchMoreSupplerPerson(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term,
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
        type: 'supplier'
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchSupplerPersonByTerm(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      true, false, true).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'supplier'
        });
      });
  }
  FetchMoreUnitTopic(event) {
    event.Owner.columnDef[9].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Order.GetUnitTopicPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        resolve(res.TotalItemCount);
      });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshUnitTopicItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'commission-member-unit-topic'
      });
    });
  }
  FetchUnitTopicByTerm(event) {
    event.Owner.columnDef[9].cellEditorParams.Params.loading = true;
    event.Owner.Order.GetUnitTopicPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      event.Owner.RefreshUnitTopicItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'commission-member-unit-topic'
      });
    });
  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.columnDef[1].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', true, false, true, event.data.ActorID).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'supplier'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'UnitTopicName') {
      this.columnDef[9].cellEditorParams.Params.loading = true;
      this.Order.GetUnitTopicPaging(1, 30, '', '').subscribe(res => {
        this.RefreshUnitTopicItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'commission-member-unit-topic'
        });
      });
    }
  }
  onChangeRegionObj(region: number) {
    this.onLoadGrid();
  }
  onChangeCommitionObj(commitioncode: number) {
    this.onLoadGrid();
  }
  onLoadGrid() {
    this.rowData = this.ProductRequest.GetCommitionMemberList(this.CommitionParams.selectedObject, this.RegionParams.selectedObject);
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed() {
    this.HaveMaxBtn = false;
    this.btnclicked = false;
  }
  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  onSave() {
    const CommitionMemberList = [];
    this.gridApi.stopEditing();
    this.gridApi.forEachNode(node => {
      const CommitionMemberObj = {
        CommitionMemberID: node.data.CommitionMemberID ? node.data.CommitionMemberID : -1,
        RegionCode: this.RegionParams.selectedObject,
        CommitionCode: this.CommitionParams.selectedObject,
        ActorID: node.data.ActorID ? node.data.ActorID : null,
        ActorName: node.data.ActorName && node.data.ActorName.ActorName ? node.data.ActorName.ActorName : null,
        StartDate: node.data.PersianStartDate && node.data.PersianStartDate.MDate ?
          node.data.PersianStartDate.MDate : (node.data.ShortStartDate ? node.data.ShortStartDate : null),
        EndDate: node.data.PersianEndDate && node.data.PersianEndDate.MDate ?
          node.data.PersianEndDate.MDate : (node.data.ShortEndDate ? node.data.ShortEndDate : null),
        AttachLetterCode: node.data.AttachLetterCode,
        AttachLetterDate: node.data.PersianAttachLetterDate && node.data.PersianAttachLetterDate.MDate ?
          node.data.PersianAttachLetterDate.MDate : (node.data.ShortAttachLetterDate ? node.data.ShortAttachLetterDate : null),
        DetachLetterCode: node.data.DetachLetterCode,
        DetachLetterDate: node.data.PersianDetachLetterDate && node.data.PersianDetachLetterDate.MDate ?
          node.data.PersianDetachLetterDate.MDate : (node.data.ShortDetachLetterDate ? node.data.ShortDetachLetterDate : null),
        SortLevel: node.data.SortLevel,
        UnitTopicID: node.data.UnitTopicID ? node.data.UnitTopicID : null,
        ItemNo: node.data.ItemNo
      };
      CommitionMemberList.push(CommitionMemberObj);
    });
    this.Order.SaveCommissionMemberFilterd(CommitionMemberList, this.RegionParams.selectedObject, this.CommitionParams.selectedObject,
      this.ModuleCode).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          }
        });
  }
  oncellvaluechanged(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      if (event.newValue && event.newValue.ActorId) {
        const itemsToUpdate = [];
        this.gridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = event.newValue.ActorId;
            itemsToUpdate.push(node.data);
          }
        });
        this.gridApi.updateRowData({ update: itemsToUpdate });
      }
    }
    if (event.colDef && event.colDef.field === 'UnitTopicName') {
      if (event.newValue && event.newValue.UnitTopicID) {
        const itemsToUpdate2 = [];
        this.gridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.UnitTopicID = event.newValue.UnitTopicID;
            itemsToUpdate2.push(node.data);
          }
        });
        this.gridApi.updateRowData({ update: itemsToUpdate2 });
      }
    }
  }

}
