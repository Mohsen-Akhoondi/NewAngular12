import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { isUndefined } from 'util';
import { ContractMinutesService } from 'src/app/Services/ContractService/ContractMinutes/ContractMinutesService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-contract-minutes-list',
  templateUrl: './contract-minutes-list.component.html',
  styleUrls: ['./contract-minutes-list.component.css']
})
export class ContractMinutesListComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClicked: boolean;
  BtnClickedName: string;
  type: string;
  SelectedContractID: any;
  SelectedCostFactorID: any;
  ContractOperationID: any;
  columnDef;
  gridApi: any;
  rowData: any;
  DivHeight = 70;
  FinYearCode: any;
  ContractCode: any;
  ContractTypeName: any;
  LetterNo: any;
  LetterDate: any;
  ContractAmount: any;
  ContractorName: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  Subject: any;
  RegionName: any;
  HaveHeader: boolean;
  ContractMinutesCode: any;
  SelectedContractPayCostFactorID: any;
  PopUpType;
  IsDisable = true;
  PriceListPatternID;
  startLeftPosition = 59;
  startTopPosition = 20;
  SelectedContractMinutesID;
  CostListFinYearCode;
  PriceListTypeCode;
  mainBodyHeight = 500;
  gridHeight = 76;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  LetterDatePersian;
  ContractMinutesID: any;
  ContractMinutesPopupParam = {
    SelectedContractID: -1,
    ContractMinutesID: 0,
    SelectedCostFactorID: -1,
    ContractMinutesCode: 0,
    PriceListPatternID: -1,
    CostListFinYearCode: -1,
    PriceListTypeCode: -1,
    IsViewable: false,
    Mode: '',
    ContractId: -1,
    ModuleCode: -1,
    FinYearCode: -1,
    ContractCode: 0,
    RegionCode: -1,
    WorkFlowID: null,
    ReadyToConfirm: null,
    ContractorName: '',
    Subject: '',
    ContractDate: '',
    ContractNo: -1,
    LetterDatePersian: '',
    LetterNo: '',
    ContractOperationID: -1,
    AutoEntityTypeCode: -1,
    HeaderName: '',
    selectedRow: null,
    GridHeightInTab: 0,
    PanelHeightInTab: 0,
    HaveSave: false,
    IsEditable: false,
    ProductRequestID: null,
    ContractTypeName: '',
    ContractAmount: '',
    FromContractDatePersian: '',
    ToContractDatePersian: '',
    RegionName: '',
    LetterDate: '',
    ModuleViewTypeCode: null,
  };
  IsDown = false;
  IsEditable = true;
  HaveSave;
  HaveDelete;
  HaveUpdate;
  HeightPercentWithMaxBtn;
  PercentWidth;
  MainMaxwidthPixel;
  MinHeightPixel;
  ContractId;
  ContractDate;
  ContractNo;
  ContractTypeCode;
  AutoEntityTypeCode;
  OverPixelWidth: number;
  Showable = true;
  constructor(private User: UserSettingsService,
    private ConMinutesService: ContractMinutesService,
  ) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },

      {
        headerName: 'شماره صورتجلسه',
        field: 'ContractMinutesCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ صورتجلسه',
        field: 'ContractMinutesDatePersian',
        width: 150,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 520,
        resizable: true
      },
      {
        headerName: 'نوع صورتجلسه',
        field: 'AutoEntityTypeName',
        width: 180,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    if (!this.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;

          case 6:
            this.HaveDelete = true;
            break;

          case 16:
            this.HaveUpdate = true;
            break;

          default:
            break;
        }

      });
    });
    if (this.PopupParam.selectedRow.data.ContractId != null) {
      const currentData = this.PopupParam.selectedRow.data;
      this.ContractId = this.PopupParam.selectedRow.data.ContractId;
      this.SelectedContractID = currentData.ContractId;
      this.ContractMinutesPopupParam.SelectedContractID = currentData.ContractId;
      this.ContractMinutesPopupParam.SelectedCostFactorID = currentData.CostFactorID;
      this.ContractMinutesPopupParam.ContractMinutesID = currentData.ContractMinutesID;
      this.SelectedCostFactorID = currentData.CostFactorID;
      this.FinYearCode = currentData.FinYearCode;
      this.ContractDate = currentData.ContractDate;
      this.ContractNo = currentData.ContractNo;
      this.ContractCode = currentData.ContractCode;
      this.ContractTypeName = currentData.ContractTypeName;
      this.LetterNo = currentData.LetterNo;
      this.LetterDate = currentData.LetterDatePersian;
      this.LetterDatePersian = currentData.LetterDatePersian;
      this.ContractAmount = currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.ContractorName = currentData.ContractorName;
      this.FromContractDatePersian = currentData.FromContractDatePersian;
      this.ToContractDatePersian = currentData.ToContractDatePersian;
      this.Subject = currentData.Subject;
      this.RegionName = currentData.RegionName;
      this.PriceListPatternID = currentData.PriceListPatternID;
      this.CostListFinYearCode = currentData.CostListFinYearCode;
      this.PriceListTypeCode = currentData.PriceListTypeCode;
      this.rowData = of([]);
      this.ConMinutesService.GetContractMinutesList(this.SelectedContractID).subscribe(res => {
        this.rowData = res;
      });
    }
    this.IsDown = true;
    this.IsEditable =
      this.PopupParam.ModuleCode !== 2687; // پرونده قرارداد
    if (this.PopupParam && this.PopupParam.IsEditable === false) {
      this.Showable = false;
    }
    if (this.PopupParam.ModuleViewTypeCode === 5555) {
      this.IsEditable = false;
    }
  }

  popupclosed() {
    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.ConMinutesService.GetContractMinutesList(this.SelectedContractID).subscribe(res => {
      this.rowData = res;
    });
  }

  onClose() {
    this.Closed.emit(true);
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  RowClick(event) {
    let Count = 0;
    this.gridApi.forEachNode(node => {
      Count++;
    });
    this.SelectedContractMinutesID = event.data.ContractMinutesID;
    this.ContractMinutesCode = event.data.ContractMinutesCode;
    if (event.rowIndex === Count - 1) { this.IsDisable = false; } else { this.IsDisable = true; }
    this.AutoEntityTypeCode = event.data.AutoEntityTypeCode;
  }

  onInsert() {
    this.ConMinutesService.GetAutoEntityTypeList(10, this.PopupParam.RegionCode).subscribe(res => {
      if (res && res.length > 0) {
        this.startLeftPosition = 272;
        this.startTopPosition = 81;
        this.PopUpType = 'contract-minutes-type';
        this.ContractMinutesPopupParam.RegionCode = this.PopupParam.RegionCode;
        this.isClicked = true;
      } else {
        this.ShowMessageBoxWithOkBtn('برای این واحد اجرایی نوع صورتجلسه تعریف نشده است');
        return;
      }
    });
  }
  onEdit(isViewable: boolean) {
    if (this.AutoEntityTypeCode === 77) {
      this.ConMinutesService.GetRegionCode(this.AutoEntityTypeCode, this.PopupParam.RegionCode).subscribe(res => {
        if (res) {
          this.HaveMaxBtn = true;
          this.startLeftPosition = 59;
          this.startTopPosition = 20;
          this.ContractMinutesPopupParam.Mode = 'EditMode';
          this.isClicked = true;
          this.ContractMinutesPopupParam.ContractMinutesID = this.SelectedContractMinutesID;
          this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
          this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
          this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
          this.ContractMinutesPopupParam.AutoEntityTypeCode = this.AutoEntityTypeCode;
          this.ContractMinutesPopupParam.IsViewable = isViewable;
          this.PopUpType = 'contract-minutes-item-list-page';
        } else {
          this.ShowMessageBoxWithOkBtn('برای این واحد اجرایی نوع صورتجلسه تعریف نشده است');
          return;
        }
      });
    } else if (this.AutoEntityTypeCode === 78) {
      this.ConMinutesService.GetRegionCode(this.AutoEntityTypeCode, this.PopupParam.RegionCode).subscribe(res => {
        if (res) {
          this.HaveMaxBtn = true;
          this.startLeftPosition = 200;
          this.startTopPosition = 20;
          this.PercentWidth = 70;
          this.MainMaxwidthPixel = 1000;
          this.MinHeightPixel = 645;
          this.ContractMinutesPopupParam.Mode = 'EditMode';
          this.isClicked = true;
          this.ContractMinutesPopupParam.ContractMinutesID = this.SelectedContractMinutesID;
          this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
          this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
          this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
          this.ContractMinutesPopupParam.IsViewable = isViewable;
          this.ContractMinutesPopupParam.ContractId = this.ContractId;
          this.ContractMinutesPopupParam.ModuleCode = this.PopupParam.ModuleCode;
          this.ContractMinutesPopupParam.FinYearCode = this.FinYearCode;
          this.ContractMinutesPopupParam.ContractCode = this.ContractCode;
          this.ContractMinutesPopupParam.RegionCode = this.PopupParam.RegionCode;
          this.ContractMinutesPopupParam.WorkFlowID = null;
          this.ContractMinutesPopupParam.ReadyToConfirm = null;
          this.ContractMinutesPopupParam.ContractorName = this.ContractorName;
          this.ContractMinutesPopupParam.Subject = this.Subject;
          this.ContractMinutesPopupParam.ContractDate = this.ContractDate;
          this.ContractMinutesPopupParam.ContractNo = this.ContractNo;
          this.ContractMinutesPopupParam.LetterDatePersian = this.LetterDatePersian;
          this.ContractMinutesPopupParam.LetterNo = this.LetterNo;
          this.ContractMinutesPopupParam.AutoEntityTypeCode = this.AutoEntityTypeCode;
          this.PopUpType = 'ground-delivery-minutes';
        } else {
          this.ShowMessageBoxWithOkBtn('برای این واحد اجرایی نوع صورتجلسه تعریف نشده است');
          return;
        }
      });
    }
  }
  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف صورتجلسه قرارداد مطمئن هستید؟');
  }
  DoDelete() {
    this.ConMinutesService.DeleteContractMinutes(this.SelectedContractMinutesID).subscribe(
      res => {
        if (res === true) {
          this.ngOnInit();
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      });
  }
  ReturendContractOperation(event) {
    this.isClicked = false;
    const AutoEntityTypeCode = event.AutoEntityTypeCode;
    const AutoEntityTypeName = event.AutoEntityTypeName;
    if (AutoEntityTypeCode === 77 && this.PopUpType === 'contract-minutes-type') {
      this.ConMinutesService.GetRegionCode(AutoEntityTypeCode, this.PopupParam.RegionCode).subscribe(res => {
        if (res) {
          this.ContractMinutesPopupParam.AutoEntityTypeCode = AutoEntityTypeCode;
          this.startLeftPosition = 94;
          this.startTopPosition = 10;
          this.PopUpType = 'contract-minutes-item-list-page';
          this.ContractMinutesPopupParam.Mode = 'InsertMode';
          this.isClicked = true;
          this.HaveMaxBtn = true;
          this.HaveHeader = true;
          this.ContractMinutesPopupParam.ContractMinutesID = -1,
            this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
          this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
          this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
          this.ContractMinutesPopupParam.IsViewable = false;
          this.ContractMinutesPopupParam.HeaderName = AutoEntityTypeName;
          this.ContractMinutesPopupParam.ModuleCode = this.ModuleCode;
          return;
        } else {
          this.ShowMessageBoxWithOkBtn('برای این واحد اجرایی نوع صورتجلسه تعریف نشده است');
          return;
        }
      });
    }
    if (AutoEntityTypeCode === 78 && this.PopUpType === 'contract-minutes-type') {
      this.ConMinutesService.GetRegionCode(AutoEntityTypeCode, this.PopupParam.RegionCode).subscribe(res => {
        if (res) {
          this.ContractMinutesPopupParam.AutoEntityTypeCode = AutoEntityTypeCode;
          this.PopUpType = 'ground-delivery-minutes';
          this.ContractMinutesPopupParam.Mode = 'InsertMode';
          this.startLeftPosition = 94;
          this.startTopPosition = 10;
          this.isClicked = true;
          this.HaveMaxBtn = true;
          this.HaveHeader = true;
          this.HeightPercentWithMaxBtn = 70;
          this.PercentWidth = 70;
          this.MainMaxwidthPixel = 1000;
          this.MinHeightPixel = 645;
          this.ContractMinutesPopupParam.HeaderName = AutoEntityTypeName;
          this.ContractMinutesPopupParam.ContractMinutesID = -1,
            this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
          this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
          this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
          this.ContractMinutesPopupParam.IsViewable = false;
          this.ContractMinutesPopupParam.ContractId = this.ContractId;
          this.ContractMinutesPopupParam.ModuleCode = this.ModuleCode;
          this.ContractMinutesPopupParam.FinYearCode = this.FinYearCode;
          this.ContractMinutesPopupParam.ContractCode = this.ContractCode;
          this.ContractMinutesPopupParam.RegionCode = this.PopupParam.RegionCode;
          this.ContractMinutesPopupParam.WorkFlowID = null;
          this.ContractMinutesPopupParam.ReadyToConfirm = null;
          this.ContractMinutesPopupParam.ContractorName = this.ContractorName;
          this.ContractMinutesPopupParam.Subject = this.Subject;
          this.ContractMinutesPopupParam.ContractDate = this.ContractDate;
          this.ContractMinutesPopupParam.Subject = this.Subject;
          this.ContractMinutesPopupParam.ContractNo = this.ContractNo;
          this.ContractMinutesPopupParam.LetterDatePersian = this.LetterDatePersian;
          this.ContractMinutesPopupParam.LetterNo = this.LetterNo;
          this.ContractMinutesPopupParam.ContractTypeName = this.ContractTypeName;
          this.ContractMinutesPopupParam.ContractAmount = this.ContractAmount;
          this.ContractMinutesPopupParam.FromContractDatePersian = this.FromContractDatePersian;
          this.ContractMinutesPopupParam.ToContractDatePersian = this.ToContractDatePersian;
          this.ContractMinutesPopupParam.RegionName = this.RegionName;
          this.ContractMinutesPopupParam.LetterDate = this.LetterDate;
        } else {
          this.ShowMessageBoxWithOkBtn('برای این واحد اجرایی نوع صورتجلسه تعریف نشده است');
          return;
        }
      });
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = changes.PopupMaximized.currentValue ? 76 : 75;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 560 : 500;
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.PopUpType = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
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
    }
    this.PopUpType = '';
    this.BtnClickedName = '';
    this.isClicked = false;
  }

  ShowContractCase() {
    this.PopUpType = 'contract-case';
    this.isClicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverPixelWidth = 1290;
    this.startLeftPosition = 50;
    this.startTopPosition = 4;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 690;
    this.ContractMinutesPopupParam.HeaderName = 'صورت جلسات';
    this.ContractMinutesPopupParam.ModuleCode = this.ModuleCode;
    this.ContractMinutesPopupParam.selectedRow = this.PopupParam.selectedRow;
    this.ContractMinutesPopupParam.GridHeightInTab = 100;
    this.ContractMinutesPopupParam.PanelHeightInTab = 99;
    this.ContractMinutesPopupParam.HaveSave = false;
    this.ContractMinutesPopupParam.IsViewable = true;
    this.ContractMinutesPopupParam.IsEditable = false;
    this.ContractMinutesPopupParam.SelectedContractID = this.PopupParam.selectedRow.data.ContractId;
    this.ContractMinutesPopupParam.ProductRequestID = this.PopupParam.selectedRow.data.ProductRequestID;
    this.ContractMinutesPopupParam.ModuleViewTypeCode = 5555;
  }
}
