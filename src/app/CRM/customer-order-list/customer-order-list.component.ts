import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { CustomerOrderService } from 'src/app/Services/CRM/CustomerOrderService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements OnInit {
  @Input() InputParam;
  ActorID;
  private gridApi;
  columnDef;
  SelectedRegionObject;
  rowData = [];
  selectedRegion = 205;
  RegionListSet = [];
  btnclicked = false;
  type: string;
  selectedRow: any;
  paramObj;
  HaveHeader: boolean;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 84;
  private sub: any;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName: string;
  EnableDelete = false;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ModuleCode: number;
  AddItems = true;

  constructor(private router: Router,
    private User: UserSettingsService,
    private RegionList: RegionListService,
    config: NgSelectConfig,
    private route: ActivatedRoute,
    private CustomerOrder: CustomerOrderService
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
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
        field: 'CustomerOrderCode',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'تاریخ',
        field: 'PersianCustomerOrderDate',
        width: 120,
        resizable: true
      },

      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 350,
        resizable: true
      }

    ];
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  popupclosed() {

    this.HaveMaxBtn = false;
    this.btnclicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.type = '';
    this.HeightPercentWithMaxBtn = 95;
  }

  onChangeRegionObj(newObj) {
    this.RegionParams.selectedObject = newObj;
    this.getCustomerOrderListData(this.RegionParams.selectedObject);
    this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
    this.selectedRow = null;
  }

  ngOnInit() {
    this.getNewData();

    if (this.InputParam && this.InputParam.Mode) {
      if (this.InputParam.Mode === 'AddNewPopUp') {
        this.AddItems = false;
      }
    }
  }

  getNewData(): void {

    // this.RegionList.GetSpecialRegionList(this.ModuleCode, true).subscribe(res => {
    //   if (res && res.length > 0) {
    //   this.RegionListSet = res;
    //  this.RegionParams.selectedObject = res[0].RegionCode;
    this.getCustomerOrderListData(200);
    //   this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
    // }
    // });
  }

  getCustomerOrderListData(region): void {
    this.rowData = [];
   this.CustomerOrder.GetCustomerOrderList(region).subscribe(res=>{

      this.rowData =res;
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue.data;
  }

  close(): void {

    if (this.InputParam) {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
    else {
      this.btnclicked = false;
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }

  }

  onDeleteclick() {
    if (!this.selectedRow) {
      this.ShowMessageBoxWithOkBtn('سفارشی جهت حذف انتخاب نشده است');
    } else {
      this.BtnClickedName = 'BtnDelete';
      this.ShowMessageBoxWithYesNoBtn('آیا از حذف  سفارش مشتری مطمئن هستید؟');
    }
  }

  DoDelete() {
    this.CustomerOrder.DeleteCustomerOrder(this.selectedRow.CustomerOrderID, this.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.getCustomerOrderListData(200);
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد')        
        } else {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      });
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

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  Btnclick(BtnName) {
    if (BtnName === 'insert') {
      this.type = 'customer-order'
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 68;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        CustomerOrderID: -1,
        Mode: 'InsertMode',
      };
      return;
    }
    if (BtnName === 'insert') {
      this.type = 'app-customer-order-product-request'

    }
    if (BtnName === 'ok') {
      if (!this.selectedRow) {
        this.ShowMessageBoxWithOkBtn('سفارشی جهت تایید انتخاب نشده است');
      }
      else {
        this.OutPutParam.emit(this.selectedRow.CustomerOrderID);
        this.close();

      }

    }

    if (BtnName === 'update') {
      if (!this.selectedRow) {
        this.ShowMessageBoxWithOkBtn('سفارشی جهت اصلاح انتخاب نشده است');
      }
      else {
        this.type = 'customer-order';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.startLeftPosition = 15;
        this.startTopPosition = 5;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.PercentWidth = 90;
        this.MainMaxwidthPixel = 2000;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CustomerOrderID: this.selectedRow.CustomerOrderID,
          Mode: 'EditMode',
        };
      }
    }
  }


  getOutPutParam(event) {

    this.getCustomerOrderListData(200);
  }
}
