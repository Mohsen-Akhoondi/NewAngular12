import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { of } from 'rxjs';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-asset-income-list',
  templateUrl: './asset-income-list.component.html',
  styleUrls: ['./asset-income-list.component.css']
})
export class AssetIncomeListComponent implements OnInit {
  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApi;
  private gridColumnApi;
  columnDef;
  rowData: any;
  selectedRegion = 205;
  btnclicked = false;
  DisableDelete = false;
  type: string;
  selectedRow: any;
  paramObj;
  HaveHeader: boolean;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 84;
  HasRegion = true;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName: string;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RegionItems = [];
  constructor(private router: Router,
    private RegionList: RegionListService,
    config: NgSelectConfig,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.columnDef = [
          {
            headerName: 'ردیف ',
            field: 'ItemNo',
            width: 60,
            resizable: true
          },
          {
            headerName: 'کد اموال',
            field: 'AssetCodeName',
            width: 100,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'نوع منبع درآمد',
            field: 'AssetIncomeTypeName',
            width: 100,
            resizable: true
          },
          {
            headerName: 'مساحت',
            field: 'Area',
            width: 80,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'موقعیت',
            field: 'Position',
            width: 270,
            resizable: true
          },
          {
            headerName: 'توضیحات',
            field: 'Note',
            width: 270,
            resizable: true
          },
          {
            headerName: 'شماره پلاک',
            field: 'PlateNo',
            width: 80,
            resizable: true
          },
          {
            headerName: 'نام منبع درآمدی',
            field: 'AssetIncomeName',
            width: 130,
            resizable: true
          },
    ];

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
    this.selectedRegion = newObj;
    this.getAssetInComeListData(this.selectedRegion);
    this.selectedRow = null;
  }

  ngOnInit() {
    this.getNewData();
  }

  getNewData(): void {
    this.RegionList.GetSpecialRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionItems = res;
        this.RegionParams.selectedObject = res[0].RegionCode;
        this.rowData = this.ProductRequest.GetAssetIncomeListByRegionCode(this.RegionParams.selectedObject);
      }
    });
  }
  getAssetInComeListData(region): void {
    this.rowData = of([]);
    this.rowData = this.ProductRequest.GetAssetIncomeListByRegionCode(region);
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
    this.DisableDelete = true;
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  Btnclick(BtnName) {
    this.gridApi.stopEditing();
    if (BtnName === 'insert') {
      this.type = 'asset-income';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 200;
      this.startTopPosition = 95;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 34;
      this.PercentWidth = 70;
      this.MainMaxwidthPixel = 1200;
      this.MinHeightPixel = 230;
      this.paramObj = {
        AssetIncomeID: -1,
        RegionCode: null,
        Mode: 'InsertMode',
      };
      return;
    }

    if (BtnName === 'update') {
      if (this.selectedRow == null) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'منبع درآمدی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }

      this.type = 'asset-income' ;
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 200;
      this.startTopPosition = 95;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 34;
      this.PercentWidth = 70;
      this.MainMaxwidthPixel = 1200;
      this.MinHeightPixel = 230;
      this.paramObj = {
        AssetIncomeID: this.selectedRow.data.AssetIncomeID,
        RegionCode: this.RegionParams.selectedObject,
        Mode: 'EditMode',
      };
      return;
    }
  }

  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف منبع درآمدی مطمئن هستید؟');
  }
  DoDelete() {
    this.ProductRequest.DeleteAssetIncome(this.selectedRow.data.AssetIncomeID, this.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.rowData = this.ProductRequest.GetAssetIncomeListByRegionCode(this.RegionParams.selectedObject);
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
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
  getOutPutParam(event) {
    if (event && this.type === 'asset-income') {
      this.rowData = this.ProductRequest.GetAssetIncomeListByRegionCode(this.RegionParams.selectedObject);
    }
  }
}
