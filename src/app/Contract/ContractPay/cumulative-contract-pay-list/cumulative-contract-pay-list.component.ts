import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { isUndefined } from 'util';
import { ContractPayShipmentService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayShipmentService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-cumulative-contract-pay-list',
  templateUrl: './cumulative-contract-pay-list.component.html',
  styleUrls: ['./cumulative-contract-pay-list.component.css']
})
export class CumulativeContractPayListComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() ContractEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClicked: boolean;
  type: string;
  SelectedContractID: any;
  SelectedCostFactorID: any;
  ContractOperationID: any;
  columnDef;
  gridApi: any;
  currentRowIndex = -1;
  currentRowCount = -1;
  rowData: any;
  DivHeight = 70;
  FinYearCode: any;
  ContractCode: any;
  ContractTypeName: any;
  ContractTypeCode: any;
  HaveHeader = true;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  LetterNo: any;
  LetterDatePersian;
  ContractAmount: any;
  ContractorName: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  Subject: any;
  ContractPayNo: any;
  SelectedContractPayCostFactorID: any;
  PopUpType;
  IsNotWorkFlow = true;
  PriceListPatternID;
  startLeftPosition = 59;
  startTopPosition = 20;
  SelectedCPCostFactorID;
  CostListFinYearCode;
  PriceListTypeCode;
  mainBodyHeight = 500;
  gridHeight = 75;
  HaveMaxBtn = false;
  HaveSave = false;
  HaveUpdate = false;
  HaveDelete = false;
  IsRowClick = false;
  SelectedContractPayID;
  ContractPayPopupParam = {
    SelectedContractID: -1,
    ContractOperationID: 0,
    SelectedCostFactorID: -1,
    SelectedContractPayID: -1,
    ContractPayNo: 0,
    SelectedCPCostFactorID: -1,
    PriceListPatternID: -1,
    CostListFinYearCode: -1,
    PriceListFineYearName: '',
    PriceListTypeName: '',
    LetterDatePersian: '',
    PriceListTypeCode: -1,
    IsViewable: false,
    Mode: '',
    FinYearCode: 0,
    ContractCode: 0,
    ContractorName: '',
    Subject: '',
    LetterNo: '',
    ContractAmount: '',
    WorkFlowID: null,
    RegionCode: null,
    ReadyToConfirm: null,
    ContractTypeCode: -1,
    SelectedRow: null,
    ModuleCode: -1,
    HeaderName: '',
    selectedRow: null,
    GridHeightInTab: 0,
    PanelHeightInTab: 0,
    HaveSave: false,
    IsEditable: false,
    ProductRequestID: null,
    ModuleViewTypeCode: null,
  };
  IsEditable = true;
  IsDown = false;
  SelectedRow: any;
  IsConfirm: 0;
  OverPixelWidth: number;
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  Showable = true;
  ModuleViewTypeCode: number;
  PriceListFineYearName;
  PriceListTypeName;
  constructor(private User: UserSettingsService,
    private ShipmentService: ContractPayShipmentService,
    private ContPayService: ContractPayService,
    private ContractPayDetails: ContractPayDetailsService,
    private Cartable: CartableServices,
    private Report: ReportService) {

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع صورت وضعیت',
        field: 'ContractPayTypeName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع عملیات',
        field: 'ContractOperationName',
        width: 90,
        resizable: true
      },
      {
        headerName: 'شماره صورت وضعیت',
        field: 'ContractPayTechnicalCode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ContractPayNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'CotractPayDatePersian',
        width: 90,
        resizable: true
      },
      {
        headerName: 'جمع مبلغ ناخالص',
        field: 'Amount',
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'جمع مالیات بر ارزش افزوده',
        field: 'TaxValue',
        HaveThousand: true,
        width: 140,
        resizable: true
      },
      {
        headerName: 'جمع مبلغ',
        field: 'ContractPayAmount',
        width: 100,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 400,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    if (this.PopupParam.ModuleViewTypeCode) {
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
      switch (this.ModuleViewTypeCode) {
        case 100000:   /* abzar rahbar 52104 */
          break;
        default:
          break;
      }
    }
    if (!this.PopupParam.ModuleCode || this.PopupParam.ModuleCode === 2516) {
      this.IsConfirm = 0;
    }

    if (this.PopupParam.ModuleCode && this.PopupParam.ModuleCode === 2687) {
      this.IsConfirm = null;
    }
    if (this.PopupParam && this.PopupParam.IsEditable === false) {
      this.Showable = false;
    }

    this.User.GetModulOPByUser(2769).subscribe(res => {
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
      this.SelectedContractID = currentData.ContractId;
      this.ContractPayPopupParam.SelectedContractID = currentData.ContractId;
      this.ContractPayPopupParam.RegionCode = currentData.RegionCode;
      this.ContractPayPopupParam.SelectedCostFactorID = currentData.CostFactorID;
      this.ContractPayPopupParam.ContractTypeCode = currentData.ContractTypeCode;
      this.SelectedCostFactorID = currentData.CostFactorID;
      this.FinYearCode = currentData.FinYearCode;
      this.ContractCode = currentData.ContractCode;
      this.ContractTypeName = currentData.ContractTypeName;
      this.ContractTypeCode = currentData.ContractTypeCode;
      this.LetterNo = currentData.LetterNo;
      this.LetterDatePersian = currentData.LetterDatePersian;
      this.ContractAmount = currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.ContractorName = currentData.ContractorName;
      this.FromContractDatePersian = currentData.FromContractDatePersian;
      this.ToContractDatePersian = currentData.ToContractDatePersian;
      this.Subject = currentData.Subject;
      this.PriceListPatternID = currentData.PriceListPatternID;
      this.CostListFinYearCode = currentData.CostListFinYearCode;
      this.PriceListTypeCode = currentData.PriceListTypeCode;
      this.PriceListFineYearName = currentData.PriceListFineYearName;
      this.PriceListTypeName = currentData.PriceListTypeName;
      this.rowData = of([]);
      this.ContPayService.GetContractPayList(this.SelectedCostFactorID, null, 2).subscribe(res => {
        this.rowData = res;
      });
      this.IsDown = true;
    }
  }

  popupclosed() {
    this.IsRowClick = false;
    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.ContPayService.GetContractPayList(this.SelectedCostFactorID, null, 2).subscribe(res => {
      this.rowData = res;
    });
  }

  onClose() {
    this.ContractEstimateClosed.emit(true);
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  RowClick(event) {
    this.IsRowClick = true;
    this.currentRowIndex = event.rowIndex;
    let Count = 0;
    this.gridApi.forEachNode(node => {
      Count++;
    });
    this.currentRowCount = Count;
    this.SelectedCPCostFactorID = event.data.CostFactorID;
    this.SelectedContractPayID = event.data.ContractPayID;
    this.ContractPayNo = event.data.ContractPayNo;
    // if (event.rowIndex === Count - 1) {

    //   this.ContPayService.HaveWorkFlowInstance(event.data.CostFactorID, 2).subscribe(res => {
    //     this.IsNotWorkFlow = !res;
    //     this.gridHeight = (!this.IsNotWorkFlow &&
    //       this.currentRowIndex === this.currentRowCount - 1) ?
    //       this.PopupMaximized ? 75 : 72 :
    //       this.gridHeight;
    //   });

    // } else {
    //   this.IsNotWorkFlow = false;
    // }

    this.SelectedRow = event.data;

  }

  // onInsert() {
  //   this.startLeftPosition = 272;
  //   this.startTopPosition = 81;
  //   this.PopUpType = 'contract-pay-types';
  //   this.isClicked = true;
  //   this.type = 'contract-pay-types';
  //   this.ContractPayPopupParam.IsViewable = false;
  //   this.ContractPayPopupParam.FinYearCode = this.FinYearCode;
  //   this.ContractPayPopupParam.ContractCode = this.ContractCode;
  //   this.ContractPayPopupParam.ContractorName = this.ContractorName;
  //   this.ContractPayPopupParam.LetterNo = this.LetterNo;
  //   this.ContractPayPopupParam.ContractAmount = this.ContractAmount;
  //   this.ContractPayPopupParam.Subject = this.Subject;
  // }

  onEdit(isViewable: boolean) {

    if (!this.IsRowClick) {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت انتخاب نشده است');
      return;
    }

    this.HaveMaxBtn = true;
    this.startLeftPosition = 92;
    this.startTopPosition = 3;
    this.ContractPayPopupParam.Mode = 'EditMode';
    this.isClicked = true;
    this.ContractPayPopupParam.SelectedCPCostFactorID = this.SelectedCPCostFactorID;
    this.ContractPayPopupParam.SelectedContractPayID = this.SelectedContractPayID;
    this.ContractPayPopupParam.PriceListPatternID = this.PriceListPatternID;
    this.ContractPayPopupParam.CostListFinYearCode = this.CostListFinYearCode;
    this.ContractPayPopupParam.PriceListTypeCode = this.PriceListTypeCode;
    this.ContractPayPopupParam.PriceListFineYearName = this.PriceListFineYearName;
    this.ContractPayPopupParam.PriceListTypeName = this.PriceListTypeName;
    this.ContractPayPopupParam.IsViewable = isViewable;
    this.ContractPayPopupParam.FinYearCode = this.FinYearCode;
    this.ContractPayPopupParam.ContractCode = this.ContractCode;
    this.ContractPayPopupParam.ContractorName = this.ContractorName;
    this.ContractPayPopupParam.LetterNo = this.LetterNo;
    this.ContractPayPopupParam.LetterDatePersian = this.LetterDatePersian;
    this.ContractPayPopupParam.ContractAmount = this.ContractAmount;
    this.ContractPayPopupParam.Subject = this.Subject;
    if (this.ContractTypeCode === 26 || this.ContractTypeCode === 29) {
      this.PopUpType = 'contract-pay-item-hour';
      return;
    }
    if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
      this.PopUpType = 'cumulative-contract-pay-details';
      return;
    }
    if (!this.PriceListPatternID) {
      this.PopUpType = 'cumulative-contract-pay-details';
      return;
    }

    if (this.PriceListPatternID &&
      this.ContractTypeCode !== 26 &&
      this.ContractTypeCode !== 29) {
      this.PopUpType = 'cumulative-contract-pay-item-estimate';
      return;
    }
  }

  onDelete() {
    this.ContractPayDetails.DeleteContractPay(this.SelectedCPCostFactorID,null).subscribe(
      res => {
        this.ngOnInit();
      }
    );
  }

  onPrint() {
    this.startLeftPosition = 400;
    this.startTopPosition = 120;
    this.ContractPayPopupParam.SelectedCostFactorID = this.SelectedCostFactorID;
    this.ContractPayPopupParam.SelectedCPCostFactorID = this.SelectedCPCostFactorID;
    this.ContractPayPopupParam.SelectedContractID = this.SelectedContractID;
    this.ContractPayPopupParam.ContractPayNo = this.ContractPayNo;
    this.ContractPayPopupParam.ContractCode = this.ContractCode;
    this.ContractPayPopupParam.ContractorName = this.ContractorName;
    this.ContractPayPopupParam.Subject = this.Subject;
    this.ContractPayPopupParam.SelectedRow = this.SelectedRow;
    this.ContractPayPopupParam.ModuleCode = this.PopupParam.ModuleCode;
    this.isClicked = true;
    this.PopUpType = 'choosen-contract-pay-rep';
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = (!this.IsNotWorkFlow &&
        this.currentRowIndex === this.currentRowCount - 1) ?
        changes.PopupMaximized.currentValue ? 75 : 72 :
        changes.PopupMaximized.currentValue ? 78 : 75;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 560 : 500;
    }
  }

  ReturendContractOperation(ContractOperationID) {

    this.startLeftPosition = 59;
    this.startTopPosition = 20;
    this.isClicked = true;
    if (ContractOperationID &&
      this.PopUpType === 'contract-pay-types' &&
      (this.ContractTypeCode === 26 || this.ContractTypeCode === 29)) {

      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.ContractPayPopupParam.PriceListPatternID = this.PriceListPatternID;
      this.ContractPayPopupParam.CostListFinYearCode = this.CostListFinYearCode;
      this.ContractPayPopupParam.PriceListTypeCode = this.PriceListTypeCode;
      this.ContractPayPopupParam.SelectedCPCostFactorID = -1;
      this.PopUpType = 'contract-pay-item-hour';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;
    }
    if (ContractOperationID &&
      this.PopUpType === 'contract-pay-types' &&
      (this.ContractTypeCode === 27 || this.ContractTypeCode === 28)) {
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.PopUpType = 'contract-pay-details';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;
    }
    if (!this.PriceListPatternID &&
      ContractOperationID &&
      this.PopUpType === 'contract-pay-types') {
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.PopUpType = 'contract-pay-details';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;
    }

    if (this.PriceListPatternID &&
      ContractOperationID &&
      this.PopUpType === 'contract-pay-types' &&
      this.ContractTypeCode !== 26 &&
      this.ContractTypeCode !== 29) {
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.PopUpType = 'contract-pay-details';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      // this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      // this.ContractPayPopupParam.PriceListPatternID = this.PriceListPatternID;
      // this.ContractPayPopupParam.CostListFinYearCode = this.CostListFinYearCode;
      // this.ContractPayPopupParam.PriceListTypeCode = this.PriceListTypeCode;
      // this.ContractPayPopupParam.SelectedCPCostFactorID = -1;
      // this.PopUpType = 'contract-pay-item-estimate-page';
      // this.HaveMaxBtn = true;
      // this.ContractPayPopupParam.Mode = 'InsertMode';
      return;

    }
  }

  OnClickPrintFlow() {
    if (!this.IsRowClick) {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت مشاهده گردش انتخاب نشده است');
    } else {
      this.Report.ShowReport(null,
        null,
        this.SelectedCostFactorID,
        this.ContractCode,
        this.LetterNo,
        this.LetterDatePersian,
        this.Subject,
        this.ContractorName,
        null,
        null,
        2769,
        this.ContractPayPopupParam.RegionCode);
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
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
    this.ContractPayPopupParam.HeaderName = 'صورت جلسات';
    this.ContractPayPopupParam.ModuleCode = this.ModuleCode;
    this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow;
    this.ContractPayPopupParam.GridHeightInTab = 100;
    this.ContractPayPopupParam.PanelHeightInTab = 99;
    this.ContractPayPopupParam.HaveSave = false;
    this.ContractPayPopupParam.IsViewable = true;
    this.ContractPayPopupParam.IsEditable = false;
    this.ContractPayPopupParam.SelectedContractID = this.PopupParam.selectedRow.data.ContractId;
    this.ContractPayPopupParam.ProductRequestID = this.PopupParam.selectedRow.data.ProductRequestID;
    this.ContractPayPopupParam.ModuleViewTypeCode = 5555;
  }
}
