import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { of } from 'rxjs';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';


@Component({
  selector: 'app-advertising-list',
  templateUrl: './advertising-list.component.html',
  styleUrls: ['./advertising-list.component.css']
})
export class AdvertisingListComponent implements OnInit {

  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApi;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  rowData: any;
  RegionListSet = [];
  btnclicked = false;
  DisableDelete = false;
  type: string;
  selectedRow: any;
  paramObj;
  HaveHeader: boolean;
  IsNotWorkFlow = true;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 84;
  private sub: any;
  HasRegion = true;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName: string;
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

  constructor(private router: Router,
    private RegionList: RegionListService,
    config: NgSelectConfig,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private ContPayService: ContractPayService
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
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
        headerName: 'واحد اجرایی',
        field: 'RegionCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'کد آگهی',
        field: 'AdvertisingCode',
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره آگهی',
        field: 'AdvertisingNo',
        width: 200,
        resizable: true
      },
      {
        headerName: 'نوع',
        field: 'TypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'متن بالا',
        field: 'TextAbove',
        width: 300,
        resizable: true
      },
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
    this.GetAdvertisingData(this.RegionParams.selectedObject);
    this.selectedRow = null;
  }

  ngOnInit() {
    this.getNewData();
  }

  getNewData(): void {
    this.RegionList.GetRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionListSet = res;
        this.RegionParams.selectedObject = res[2].RegionCode;
        this.GetAdvertisingData(this.RegionParams.selectedObject);
      }
    });
  }

  GetAdvertisingData(region): void {
    this.rowData = of([]);
    this.rowData = this.ProductRequest.GetAdvertisingListByRegionCode(region);
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  Btnclick(BtnName) {

    if (BtnName === 'insert') {
      this.type = 'app-advertising';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 108;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        AdvertisingID: -1,
      };
      return;
    }

    if (BtnName === 'update') {
      if (this.selectedRow == null) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = ' ردیفی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }

      this.type = 'app-advertising';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 108;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        AdvertisingID: this.selectedRow.data.AdvertisingID,
      };

      return;
    }
  }

  getOutPutParam(event) {
    if (event && this.type === 'app-advertising') {
      this.rowData = this.ProductRequest.GetAdvertisingListByRegionCode(this.RegionParams.selectedObject);
    }
  }

  onDeleteclick() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = ' ردیفی جهت مشاهده انتخاب نشده است';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    } else {
      this.ProductRequest.DeleteAdvertising(this.selectedRow.data.AdvertisingID, this.ModuleCode).subscribe(
        res => {
          if (res === true) {
            this.rowData = this.ProductRequest.GetAdvertisingListByRegionCode(this.RegionParams.selectedObject);
            this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
            this.selectedRow = null;
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
    }
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
  MessageBoxAction(ActionResult) {

    if (ActionResult === 'YES') {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
}
