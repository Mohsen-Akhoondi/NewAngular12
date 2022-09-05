import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { Router } from '@angular/router';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
@Component({
  selector: 'app-corporate-capacity',
  templateUrl: './corporate-capacity.component.html',
  styleUrls: ['./corporate-capacity.component.css']
})
export class CorporateCapacityComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  columnDef;
  rowsData = [];
  gridApi;
  PriceListTopicID;
  Note;
  StartDate;
  EndDate;
  isClicked: boolean;
  PopUpType: string;
  HaveHeader;
  HaveMaxBtn;
  startLeftPosition;
  startTopPosition;
  CheckValidate = false;
  CorporateCapacity;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  // RequiredComponents = [this.StartDate, this.PriceListTopicID];
  NgSelectParams = {
    Items: [],
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectPriceListTopicParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'price-list-topic'
  };
  PriceListTopicItems;
  BusinessPatternParams = {
    bindLabelProp: 'BusinessPatternNoName', // 62056
    bindValueProp: 'BusinessPatternID',
    placeholder: '',
    MinWidth: '300px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'business-pattern',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        // tslint:disable-next-line: max-line-length
        [{ HeaderCaption: 'نام تخصص', HeaderName: 'BusinessPatternName', width: 55, MinTermLenght: 1, SearchOption: 'BusinessPatternName' },
        // tslint:disable-next-line: max-line-length
        { HeaderCaption: 'کد تجهیز', HeaderName: 'BusinessPatternNo', width: 53, MinTermLenght: 3, SearchOption: 'BusinessPatternNo' }],
      SearchItemHeader:
        [{ HeaderCaption: 'نام تخصص', width: 55, },
        { HeaderCaption: 'کد تجهیز', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  constructor(private PriceList: PriceListService,
    private Actor: ActorService,
    private Common: CommonService,
    private RefreshEquipmentTypeItems: RefreshServices,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (this.InputParam.CorporateCapacityID) {
      this.Actor.GetCorporateCapacityByID(this.InputParam.CorporateCapacityID).subscribe(ress => {
        this.CorporateCapacity = ress;
        this.StartDate = this.CorporateCapacity.ShortStartDate;
        this.EndDate = this.CorporateCapacity.ShortEndDate;
        this.Note = this.CorporateCapacity.Note;
        this.PriceListTopicID = this.CorporateCapacity.PriceListTopicID;
        this.rowsData = this.CorporateCapacity.CorporateCapacityDetailList;
      });
    }
  }
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تخصص',
        field: 'BusinessPatternNoName',
        editable: true,
        width: 330,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.BusinessPatternParams,
          Items: [],
          MoreFunc: this.FetchMoreBusinessPattern,
          FetchByTerm: this.FetchBusinessPatternByTerm,
          RedioChangeFunc: this.RedioSelectedChangeBusinessPattern,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BusinessPatternNoName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.BusinessPatternNoName) {
            params.data.BusinessPatternNoName = params.newValue.BusinessPatternNoName;
            params.data.BusinessPatternID = params.newValue.BusinessPatternID;
            params.data.PriceListTopicID = null;
            params.data.PriceListTopicName = '';
            params.data.Rank = '';
            return true;
          } else {
            params.data.BusinessPatternNoName = '';
            params.data.BusinessPatternID = null;
            return false;
          }
        },
      },
      {
        headerName: 'رسته',
        field: 'PriceListTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectPriceListTopicParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PriceListTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PriceListTopicName) {
            params.data.PriceListTopicID = params.newValue.PriceListTopicID;
            params.data.PriceListTopicName = params.newValue.PriceListTopicName;
            return true;
          } else {
            params.data.PriceListTopicID = null;
            params.data.PriceListTopicName = null;
            return false;
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'رتبه',
        field: 'Grade',
        editable: true,
        width: 100,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'ظرفیت تعدادی',
        field: 'Qty',
        width: 150,
        resizable: true,
        editable: true,
        HaveThousand: false,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, MaxLength: 8, FloatMaxLength: 4 },
        cellRenderer: 'SeRender',
        valueSetter: (params) => {
          if (params.newValue) {
            // tslint:disable-next-line: radix
            params.data.Qty = params.newValue;
          }
        },
      },
      {
        headerName: 'ظرفیت ریالی',
        field: 'Amount',
        width: 150,
        resizable: true,
        editable: true,
        HaveThousand: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      }
    ];
  }
  OnEndDateChange(ADate) {
    this.EndDate = ADate.MDate;
  }
  OnStartDateChange(ADate) {
    this.StartDate = ADate.MDate;
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  onSave() {
    if (this.StartDate && this.PriceListTopicID) {
      const CorateCapacityDetailList = [];
      this.gridApi.stopEditing();
      const CorporateCapacityObj = {
        // tslint:disable-next-line:max-line-length
        CorporateCapacityID: this.CorporateCapacity && this.CorporateCapacity.CorporateCapacityID ? this.CorporateCapacity.CorporateCapacityID : -1,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        Note: this.Note,
        PriceListTopicID: this.PriceListTopicID,
      };

      this.gridApi.forEachNode(node => {
        const CorateCapacityDetailObj = {
          CorporateCapacityDetailID: node.data.CorporateCapacityDetailID ? node.data.CorporateCapacityDetailID : -1,
          CorporateCapacityID: CorporateCapacityObj.CorporateCapacityID,
          Qty: parseFloat(node.data.Qty),
          Amount: parseFloat(node.data.Amount),
          Grade: parseFloat(node.data.Grade),
          PriceListTopicID: node.data.PriceListTopicID,
        };
        CorateCapacityDetailList.push(CorateCapacityDetailObj);
      });
      this.Actor.SaveCorateCapacity(this.InputParam.ModuleCode,
        CorporateCapacityObj,
        CorateCapacityDetailList,
      ).subscribe((res: any) => {
        this.Output.emit(true);
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا موارد ضروری را تکمیل نمایید');
    }

  }
  onClose() {
    this.Closed.emit(true);
  }
  onChangePriceListTopic(event) {
    this.PriceListTopicID = event;
  }

  onContractcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'PriceListTopicName') {
      if (event.data.BusinessPatternID && event.data.BusinessPatternID > 0) {
        this.Actor.GetPriceListTopicByBusinesPatternID(event.data.BusinessPatternID, false).subscribe(res => {
          this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'price-list-topic'
          });
        });
      }
    } else if (event.colDef && event.colDef.field === 'BusinessPatternNoName') {
      this.columnDef[1].cellEditorParams.Params.loading = true;
      this.Common.GetBusinessPatternPaging('',
        '',
        1,
        30,
        null,
        event.data.BusinessPatternID).
        subscribe(res => {
          this.columnDef[1].cellEditorParams.Params.loading = false;
          this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'business-pattern'
          });
        });
    }

  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
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
  popupclosed(event) {
    this.isClicked = false;
    this.HaveMaxBtn = false;
  }
  FetchMoreBusinessPattern(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.Common.GetBusinessPatternPaging(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize,
        null,
        event.Owner.BusinessPatternParams.selectedObject).
        subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.columnDef[1].cellEditorParams.Params.loading = false;
      event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'business-pattern'
      });
    });
  }
  FetchBusinessPatternByTerm(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetBusinessPatternPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      null,
      event.Owner.BusinessPatternParams.selectedObject).
      subscribe(res => {
        event.Owner.columnDef[1].cellEditorParams.Params.loading = false;
        event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'business-pattern'
        });
      });
  }
  RedioSelectedChangeBusinessPattern(event) {
    event.Owner.columnDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Common.GetBusinessPatternPaging(event.SearchOption,
      '',
      1,
      30,
      null,
      event.Owner.BusinessPatternParams.selectedObject).
      subscribe(res => {
        event.Owner.columnDef[1].cellEditorParams.Params.loading = false;
        event.Owner.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'business-pattern'
        });
      });
  }
}
