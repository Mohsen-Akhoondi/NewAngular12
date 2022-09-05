import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { isUndefined } from 'util';
import { ContractPayShipmentService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayShipmentService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { environment } from 'src/environments/environment';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-pay-list',
  templateUrl: './contract-pay-list.component.html',
  styleUrls: ['./contract-pay-list.component.css']
})
export class ContractPayListComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() ContractEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClicked: boolean;
  ShowBtn: boolean = true;
  type: string;
  SelectedContractID: any;
  SelectedCostFactorID: any;
  ContractOperationID: any;
  ContractOperationName;
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
  ContractorID: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  Subject: any;
  ContractPayNo: any;
  PopUpType;
  IsNotWorkFlow = true;
  IsEndRow = true;
  PriceListPatternID;
  startLeftPosition = 59;
  startTopPosition = 20;
  PixelWidth;
  PixelHeight;
  SelectedCPCostFactorID;
  CostListFinYearCode;
  PriceListTypeCode;
  PriceListFineYearName;
  mainBodyHeight = 500;
  gridHeight = 70;
  HaveMaxBtn = false;
  HaveSave = false;
  HaveUpdate = false;
  HaveDelete = false;
  IsRowClick = false;
  SelectedContractPayID;
  ContractNo;
  OrderNo;
  ContractPayDatePersian;
  ContractPayTechnicalCode;
  ContractPayPopupParam = {
    SelectedContractID: -1,
    ContractOperationID: 0,
    ContractOperationName: '',
    SelectedCostFactorID: -1,
    SelectedContractPayID: -1,
    ContractPayNo: 0,
    SelectedCPCostFactorID: -1,
    PriceListPatternID: -1,
    CostListFinYearCode: -1,
    PriceListTypeCode: -1,
    PriceListFineYearName: '',
    PriceListTypeName: '',
    IsViewable: false,
    Mode: '',
    ContractNo: '',
    ModuleViewTypeCode: null,
    FinYearCode: 0,
    ContractCode: 0,
    ContractorName: '',
    ContractorID: -1,
    LetterDatePersian: '',
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
    IsEditable1: false,
    ProductRequestID: null,
    IsReadOnly: false, // RFC 52262
    ContractPayDate: '',
    ContractTypeName: '',
    WorkFlowInstanceId: -1,
    ParentModuleCode: -1,
    workflowtypeStatus: -1,
    ContractPayTechnicalCode: '',
    ShowReportsSign: false,
  };
  IsEditable = true;
  IsEditable1 = true;
  IsDown = false;
  ISIRVersion = false;
  SelectedRow: any;
  IsConfirm;
  OverPixelWidth: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  Showable = true;
  ModuleViewTypeCode: number;
  PriceListTypeName;
  WorkFlowInstanceId;
  IsAdmin = false;
  BtnClickedName: any;
  tableHeight = 87;
  SumSA = '0';
  SumSCPA = '0';
  IsEstimate: boolean;
  IsOnContract: boolean;

  constructor(private User: UserSettingsService,
    private ShipmentService: ContractPayShipmentService,
    private ContPayService: ContractPayService,
    private ContractPayDetails: ContractPayDetailsService,
    private Cartable: CartableServices,
    private WorkFlow: WorkflowService,
    private Report: ReportService,
    private ContractList: ContractListService,
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
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواست پرداخت',
        field: 'ContractPayTypeName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نوع عملیات',
        field: 'ContractOperationName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'شماره صورت وضعیت',
        field: 'ContractPayTechnicalCode',
        width: 130,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ContractPayNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع',
        field: 'StartDatePersian',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان',
        field: 'EndDatePersian',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'CotractPayDatePersian',
        width: 150,
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
        width: 160,
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
      },

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
    this.ISIRVersion = environment.IsExternal;
    if (!this.PopupParam.ModuleCode || this.PopupParam.ModuleCode === 2516) {
      this.IsConfirm = null;
    }

    if (this.PopupParam.ModuleCode && this.PopupParam.ModuleCode === 2687) {
      this.IsConfirm = null;
    }

    if (this.PopupParam.ModuleCode && this.PopupParam.ModuleCode === 2755) {
      this.HaveSave = false;
      this.HaveDelete = false;
      this.HaveUpdate = false;
      this.IsEditable = false;
    }

    this.User.GetModulOPByUser(2516).subscribe(res => {
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

    if (this.PopupParam.selectedRow && this.PopupParam.selectedRow.data && this.PopupParam.selectedRow.data.ContractId != null) {
      const currentData = this.PopupParam.selectedRow.data;
      this.SelectedContractID = currentData.ContractId;
      this.ContractPayPopupParam.SelectedContractID = currentData.ContractId;
      this.ContractPayPopupParam.RegionCode = currentData.RegionCode;
      this.ContractPayPopupParam.SelectedCostFactorID = currentData.CostFactorID ? currentData.CostFactorID : -1;
      this.ContractPayPopupParam.ContractTypeCode = currentData.ContractTypeCode;
      this.SelectedCostFactorID = currentData.CostFactorID ? currentData.CostFactorID : -1;
      this.FinYearCode = currentData.FinYearCode;
      this.ContractNo = currentData.ContractNo;
      this.ContractCode = currentData.ContractCode;
      this.ContractTypeName = currentData.ContractTypeName;
      this.ContractTypeCode = currentData.ContractTypeCode;
      this.LetterNo = currentData.LetterNo;
      this.LetterDatePersian = currentData.LetterDatePersian;
      this.ContractAmount = currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.ContractorName = currentData.ContractorName;
      this.ContractorID = currentData.ContractorID;
      this.FromContractDatePersian = currentData.FromContractDatePersian;
      this.ToContractDatePersian = currentData.ToContractDatePersian;
      this.Subject = currentData.Subject;
      this.PriceListPatternID = currentData.PriceListPatternID;
      this.CostListFinYearCode = currentData.CostListFinYearCode;
      this.PriceListTypeCode = currentData.PriceListTypeCode;
      this.PriceListFineYearName = currentData.PriceListFineYearName;
      this.PriceListTypeName = currentData.PriceListTypeName;
      this.ContractPayNo = currentData.ContractPayNo;
      this.IsEstimate = currentData.IsEstimate;
      this.rowData = of([]);
      this.ContPayService.GetContractPayList(this.SelectedCostFactorID, null, null).subscribe(res => {
        this.rowData = res;
        this.SetSumAmount(this.rowData);
      });
      this.IsDown = true;
    } else if (this.PopupParam.SelectedContractID) {// مشاهده پرونده در فرم درخواست پرداخت
      this.ContractList.GetContractDataByID(this.PopupParam.SelectedContractID).subscribe(res => {
        const currentData = res[0];
        this.SelectedContractID = this.PopupParam.SelectedContractID;
        this.ContractPayPopupParam.SelectedContractID = currentData.ContractId;
        this.ContractPayPopupParam.RegionCode = currentData.RegionCode;
        this.ContractPayPopupParam.SelectedCostFactorID = currentData.CostFactorID ? currentData.CostFactorID : -1;
        this.ContractPayPopupParam.ContractTypeCode = currentData.ContractTypeCode;
        this.SelectedCostFactorID = currentData.CostFactorID ? currentData.CostFactorID : -1;
        this.FinYearCode = currentData.FinYearCode;
        this.ContractNo = currentData.ContractNo;
        this.ContractCode = currentData.ContractCode;
        this.ContractTypeName = currentData.ContractTypeName;
        this.ContractTypeCode = currentData.ContractTypeCode;
        this.LetterNo = currentData.LetterNo;
        this.LetterDatePersian = currentData.LetterDatePersian;
        this.ContractAmount = currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.ContractorName = currentData.ContractorName;
        this.ContractorID = currentData.ContractorID;
        this.FromContractDatePersian = currentData.FromContractDatePersian;
        this.ToContractDatePersian = currentData.ToContractDatePersian;
        this.Subject = currentData.Subject;
        this.PriceListPatternID = currentData.PriceListPatternID;
        this.CostListFinYearCode = currentData.CostListFinYearCode;
        this.PriceListTypeCode = currentData.PriceListTypeCode;
        this.PriceListFineYearName = currentData.PriceListFineYearName;
        this.PriceListTypeName = currentData.PriceListTypeName;
        this.ContractPayNo = currentData.ContractPayNo;
        this.rowData = of([]);
        this.ContPayService.GetContractPayList(this.SelectedCostFactorID, null, null).subscribe(res => {
          this.rowData = res;
        });
        this.IsDown = true;
      });
    }
    // this.IsEditable =
    //   this.PopupParam.ModuleCode !== 2687; // پرونده قرارداد
    if (this.PopupParam && this.PopupParam.IsEditable === false) {
      this.Showable = false;
    }

    if (!isUndefined(this.PopupParam.IsEditable)) {
      this.IsEditable = this.PopupParam.IsEditable;
    }

  }

  ngAfterViewInit(): void {
    this.SetSumAmount(this.rowData)
  }
  popupclosed() {
    this.PopUpType = '';
    this.PixelWidth = null;
    this.PixelHeight = null;
    this.IsRowClick = false;
    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.ContPayService.GetContractPayList(this.SelectedCostFactorID, null, null).subscribe(res => {
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
    if (event.data.ContractOperationID == 1 || event.data.ContractOperationID == 2 || event.data.ContractOperationID == 3 ||
      event.data.ContractOperationID == 4 || event.data.ContractOperationID == 5 || event.data.ContractOperationID == 7 ||
      event.data.ContractOperationID == 8 || event.data.ContractOperationID == 20 || event.data.ContractOperationID == 21) {
      this.ShowBtn = true;
    }
    else {
      this.ShowBtn = false;
    }
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
    this.ContractOperationID = event.data.ContractOperationID;
    this.ContractOperationName = event.data.ContractOperationName;
    if (event.data.IsConfirm === 0 && !event.data.IsConvert) {
      this.ContPayService.HaveOneWorkFlowInstanceRow(event.data.CostFactorID, 2).subscribe(res => {
        this.IsEndRow = !res;
        this.IsNotWorkFlow = !res;
        this.gridHeight = (!this.IsNotWorkFlow &&
          this.currentRowIndex === this.currentRowCount - 1) ?
          this.PopupMaximized ? 75 : 70 :
          this.gridHeight;
      });
    } else {
      this.IsEndRow = false;
    }
    this.User.CheckIsAdmin().subscribe(res => { // RFC 54198
      if (res && this.PopupParam.ModuleCode === 2875) { // ابزار راهبری
        this.IsAdmin = res;
      }
    });
    this.SelectedRow = event.data;
    this.ContPayService.GetIsOnContract(this.ContractOperationID).subscribe(res => {this.IsOnContract = res});
  }

  onInsert() {
    this.startLeftPosition = 416;
    this.startTopPosition = 89;
    this.PopUpType = 'contract-pay-types';
    this.isClicked = true;

  }


  onEdit(isViewable: boolean) {
    if (!this.IsRowClick) {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت انتخاب نشده است');
      return;
    }

    this.HaveMaxBtn = true;
    this.startLeftPosition = 5;
    this.startTopPosition = 10;
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
    this.ContractPayPopupParam.ContractorID = this.ContractorID;
    this.ContractPayPopupParam.LetterNo = this.LetterNo;
    this.ContractPayPopupParam.LetterDatePersian = this.LetterDatePersian;
    this.ContractPayPopupParam.ContractAmount = this.ContractAmount;
    this.ContractPayPopupParam.Subject = this.Subject;
    this.ContractPayPopupParam.ContractOperationID = this.ContractOperationID;
    this.ContractPayPopupParam.ContractOperationName = this.ContractOperationName;
    this.ContractPayPopupParam.IsReadOnly = this.PopupParam.selectedRow.data.IsReadOnly; // RFC 52262
    this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
    this.ContractPayPopupParam.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.ContractPayPopupParam.SelectedCostFactorID = this.SelectedCostFactorID;

    if (this.IsOnContract) {
      this.startLeftPosition = 280;
      this.startTopPosition = 90;
      this.PixelWidth = 900;
      this.PixelHeight = (this.PopupParam.ModuleViewTypeCode === 100000 && (this.ContractPayPopupParam.RegionCode >= 0 && this.ContractPayPopupParam.RegionCode < 23)) ? 370 :
        (this.ContractPayPopupParam.RegionCode >= 0 && this.ContractPayPopupParam.RegionCode < 23) ? 342 : 338;
      this.ContractPayPopupParam.IsEditable1 = false;
      this.PopUpType = 'pre-pay';
      return;

    }
    else if (!this.IsOnContract) {

      if (this.IsEstimate) {
        this.PopUpType = 'contract-pay-item-estimate-page';
        return;
      }

      if (this.ContractTypeCode === 26 || this.ContractTypeCode === 29) {
        this.PopUpType = 'contract-pay-details'  // 'contract-pay-item-hour';
        return;
      }

      if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
        this.PopUpType = 'contract-pay-details';
        this.ContractPayPopupParam.ShowReportsSign = true;
        return;
      }

      if (!this.PriceListPatternID) {
        this.PopUpType = 'contract-pay-details';
        this.ContractPayPopupParam.ShowReportsSign = true;
        return;
      }

      if (this.PriceListPatternID &&
        this.ContractTypeCode !== 26 && this.ContractTypeCode !== 29) {
        // this.PopUpType = 'contract-pay-item-estimate-page';
        this.PopUpType = 'contract-pay-details';
        this.ContractPayPopupParam.ShowReportsSign = true;
        return;
      }
    }
  }

  onDeleteContractPay() {
    if (this.IsRowClick) {
      this.BtnClickedName = 'DelContract';
      this.ShowMessageBoxWithYesNoBtn('آیا مایل به حذف درخواست انتخاب شده می باشید؟');
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا یک ردیف را برای حذف انتخاب نمایید.');
    }
  }

  onDelete() {
    this.ContractPayDetails.DeleteContractPay(this.SelectedCPCostFactorID,this.ModuleViewTypeCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف موفقیت آمیز بود');
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
    this.ContractPayPopupParam.ContractorID = this.ContractorID;
    this.ContractPayPopupParam.Subject = this.Subject;
    this.ContractPayPopupParam.SelectedRow = this.SelectedRow;
    this.ContractPayPopupParam.ModuleCode = this.PopupParam.ModuleCode;
    this.ContractPayPopupParam.RegionCode = this.PopupParam.RegionCode;
    this.isClicked = true;
    this.PixelWidth = null;
    this.PopUpType = 'choosen-contract-pay-rep';
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = (!this.IsNotWorkFlow &&
        this.currentRowIndex === this.currentRowCount - 1) ?
        changes.PopupMaximized.currentValue ? 75 : 70 :
        changes.PopupMaximized.currentValue ? 78 : 75;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 560 : 500;
    }
  }

  ReturendContractOperation(type) {
    this.startLeftPosition = 100;
    this.startTopPosition = 10;
    this.PixelWidth = null;
    this.PixelHeight = null;
    this.isClicked = true;
    if (type.ContractOperationID && this.PopUpType === 'contract-pay-types') {
      if (!type.IsOnContract) { // RFC 62307
        this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;

        this.PopUpType = this.IsEstimate ? 'contract-pay-item-estimate-page' : 'contract-pay-details';
        this.HaveMaxBtn = true;
        this.startLeftPosition = 5;
        this.isClicked = true;
        this.ContractPayPopupParam.ContractOperationID = parseInt(type.ContractOperationID);
        this.ContractPayPopupParam.Mode = 'InsertMode';
        this.ContractPayPopupParam.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
        return;
      }

      else if (type.IsOnContract) {
        this.startLeftPosition = 280;
        this.startTopPosition = 90;
        this.PixelWidth = 900;
        this.PixelHeight = (this.PopupParam.ModuleViewTypeCode === 100000 && (this.ContractPayPopupParam.RegionCode >= 0 && this.ContractPayPopupParam.RegionCode < 23)) ? 370 :
          (this.ContractPayPopupParam.RegionCode >= 0 && this.ContractPayPopupParam.RegionCode < 23) ? 342 : 320;
        this.ContractPayPopupParam.ContractOperationID = parseInt(type.ContractOperationID);
        this.ContractPayPopupParam.CostListFinYearCode = this.CostListFinYearCode;
        this.ContractPayPopupParam.PriceListTypeCode = this.PriceListTypeCode;
        this.ContractPayPopupParam.PriceListFineYearName = this.PriceListFineYearName;
        this.ContractPayPopupParam.PriceListTypeName = this.PriceListTypeName;
        this.ContractPayPopupParam.SelectedCPCostFactorID = -1;
        this.ContractPayPopupParam.SelectedContractPayID = this.SelectedContractPayID;
        this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
        this.ContractPayPopupParam.IsViewable = false;
        this.PopUpType = 'pre-pay';
        this.HaveMaxBtn = false;
        this.ContractPayPopupParam.Mode = 'InsertMode';
        return;
      }
    }
  }

  OnClickPrintFlow() {
    if (!this.IsRowClick) {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت مشاهده گردش انتخاب نشده است');
    } else {
      this.Report.ShowReport(null,
        null,
        this.SelectedCPCostFactorID,
        this.ContractCode,
        this.LetterNo,
        this.LetterDatePersian,
        this.Subject,
        this.ContractorName,
        null,
        null,
        2516,
        this.ContractPayPopupParam.RegionCode
      );
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.PixelWidth = null;
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
    this.PixelWidth = null;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverPixelWidth = 1290;
    this.startLeftPosition = 35;
    this.startTopPosition = 15;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 630;
    this.PixelWidth = 1290;
    this.PixelHeight = 630;
    this.ContractPayPopupParam.HeaderName = this.PopupParam.HeaderName;
    this.ContractPayPopupParam.ModuleCode = this.PopupParam.ModuleCode;
    this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow;
    this.ContractPayPopupParam.GridHeightInTab = 100;
    this.ContractPayPopupParam.PanelHeightInTab = 99;
    this.ContractPayPopupParam.HaveSave = false;
    this.ContractPayPopupParam.IsViewable = true;
    this.ContractPayPopupParam.IsEditable = false;
    this.ContractPayPopupParam.SelectedContractID = this.PopupParam.selectedRow.data.ContractId;
    this.ContractPayPopupParam.ProductRequestID = this.PopupParam.selectedRow.data.ProductRequestID;
    this.isClicked = true;
    this.ContractPayPopupParam.ModuleViewTypeCode = 5555;
  }

  OnClickWorkFlowDetail() {
    if (this.SelectedRow) {
      // tslint:disable-next-line:max-line-length
      this.WorkFlow.GetWfInstanceIDByObjIDAndRegionCode(this.SelectedCPCostFactorID, this.PopupParam.RegionCode).subscribe(res => {
        this.PixelWidth = null;
        this.WorkFlowInstanceId = res;
        if (res === null) {
          this.ShowMessageBoxWithOkBtn('این قرارداد فاقد گردش کار می باشد');
          return;
        } // 63958
        this.PopUpType = 'user-work-log-details';
        this.isClicked = true;
        this.OverPixelWidth = 1290;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 8;
        this.HeightPercentWithMaxBtn = 98;
        this.MinHeightPixel = 640;
        this.ContractPayPopupParam.HeaderName = 'جزئیات گردش';
        this.ContractPayPopupParam.LetterNo = this.LetterNo;
        this.ContractPayPopupParam.Subject = this.Subject;
        this.ContractPayPopupParam.FinYearCode = this.FinYearCode;
        this.ContractPayPopupParam.ContractNo = this.ContractNo;
        this.ContractPayPopupParam.ContractPayDate = this.SelectedRow.ContractPayDatePersian;
        this.ContractPayPopupParam.ContractCode = this.ContractCode;
        this.ContractPayPopupParam.SelectedContractID = this.SelectedContractID;
        this.ContractPayPopupParam.ContractorName = this.ContractorName;
        this.ContractPayPopupParam.ContractorID = this.ContractorID;
        this.ContractPayPopupParam.ContractTypeName = this.ContractTypeName;
        this.ContractPayPopupParam.ContractAmount = this.ContractAmount;
        this.ContractPayPopupParam.LetterDatePersian = this.LetterDatePersian;
        this.ContractPayPopupParam.workflowtypeStatus = 2;
        this.ContractPayPopupParam.WorkFlowInstanceId = this.WorkFlowInstanceId;
        this.ContractPayPopupParam.ContractPayNo = this.ContractPayNo;
        this.ContractPayPopupParam.ParentModuleCode = this.PopupParam.ModuleCode;
        this.ContractPayPopupParam.ContractPayTechnicalCode = this.SelectedRow.ContractPayTechnicalCode;
      });
    } else {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت مشاهده انتخاب نشده است');
    }
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'DelContract' && ActionResult === 'YES') {
      this.onDelete();
    } else {
      this.Closed.emit(true);
    }
    this.PopUpType = '';
    this.BtnClickedName = '';
    this.isClicked = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.PixelWidth = null;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 505;
    this.startTopPosition = 195;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  SetSumAmount(event) {
    let SumAmount = 0;
    let SumContractPayAmount = 0;

    if (this.rowData) {
      this.rowData.forEach(item => {
        if (item.ContractPayAmount) {
          SumContractPayAmount = SumContractPayAmount + item.ContractPayAmount

        }
        if (item.Amount) {

          SumAmount = SumAmount + item.Amount
        }

      });
    }
    this.SumSA = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumSCPA = SumContractPayAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  }
}
