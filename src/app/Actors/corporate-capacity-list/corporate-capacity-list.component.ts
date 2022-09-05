import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { of } from 'rxjs';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
@Component({
  selector: 'app-corporate-capacity-list',
  templateUrl: './corporate-capacity-list.component.html',
  styleUrls: ['./corporate-capacity-list.component.css']
})
export class CorporateCapacityListComponent implements OnInit {
  columnDef;
  gridApi;
  selectedRow;
  btnclicked;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 85;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  type: string;
  selectedPriceListTopic = 12297;
  SelectedPriceListTopicObject;
  PriceListTopicSet = [];
  rowData;
  paramObj;
  HaveHeader: boolean;
  BtnClickedName: string;
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
  PriceListTopicItems;
  ModuleCode;
  constructor(private router: Router,
    private Actor: ActorService,
    private PriceList: PriceListService,
    private Router: ActivatedRoute ) {
      this.Router.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
    this.columnDef = [
          {
            headerName: 'ردیف ',
            field: 'ItemNo',
            width: 50,
            resizable: true
          },
          {
            headerName: 'تاریخ شروع',
            field: 'PersianStartDate',
            width: 130,
            resizable: true
          },
          {
            headerName: 'تاریخ پایان',
            field: 'PersianEndDate',
            width: 140,
            resizable: true
          },
          {
            headerName: 'توضیحات',
            field: 'Note',
            width: 560,
            resizable: true
          }
        ];
  }

  ngOnInit() {
    this.PriceList.GetPriceListTopic().subscribe(res => {
      this.PriceListTopicItems = res;
       this.NgSelectParams.selectedObject = res[0].PriceListTopicID;
      this.getCorporateCapacityListData(this.NgSelectParams.selectedObject);
    });

  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
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

  onChangePriceListTopic(newObj) {
    this.selectedPriceListTopic = newObj;
    this.getCorporateCapacityListData(this.selectedPriceListTopic);
  }
  getCorporateCapacityListData(PriceListTopic): void {
    this.rowData = of([]);
    this.rowData = this.Actor.GetCorporateCapacityList(PriceListTopic);
  }

  Btnclick(BtnName) {
    this.gridApi.stopEditing();
    if (BtnName === 'insert') {
      this.type = 'corporate-capacity';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 108;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 90;
      this.PercentWidth = 65;
      this.MainMaxwidthPixel = 900;
      this.MinHeightPixel = 600;
      this.paramObj = {
        Mode: 'InsertMode',
        ModuleCode: this.ModuleCode
      };
      return;
    }

    if (BtnName === 'update') {
      if (this.selectedRow == null) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }

      this.type = 'corporate-capacity';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 108;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 90;
      this.PercentWidth = 65;
      this.MainMaxwidthPixel = 900;
      this.MinHeightPixel = 600;
      this.paramObj = {
        CorporateCapacityID: this.selectedRow.data.CorporateCapacityID,
        Mode: 'EditMode',
        ModuleCode: this.ModuleCode
      };

      return;
    }
  }
  onDeleteclick() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ردیفی جهت حذف انتخاب نشده است';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }

    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
  }
  DoDelete() {
    this.Actor.DeleteCorporateCapacity(this.selectedRow.data.CorporateCapacityID, this.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.rowData = this.Actor.GetCorporateCapacityList(this.NgSelectParams.selectedObject);
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
    if (event && this.type === 'corporate-capacity') {
      this.rowData = this.Actor.GetCorporateCapacityList(this.NgSelectParams.selectedObject);
    }
  }
}
