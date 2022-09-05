import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { isNullOrUndefined, isUndefined } from 'util';
import { ContractSupervisionService } from 'src/app/Services/ContractService/ContractSupervision/ContractSupervisionService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';

@Component({
  selector: 'app-contract-supervision-list',
  templateUrl: './contract-supervision-list.component.html',
  styleUrls: ['./contract-supervision-list.component.css']
})

export class ContractSupervisionListComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClicked: boolean;
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
  ContractAmount: any;
  ContractorName: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  Subject: any;
  CnrtSupervisionCode: any;
  SelectedContractPayCostFactorID: any;
  PopUpType;
  IsDisable = true;
  PriceListPatternID;
  startLeftPosition = 59;
  startTopPosition = 20;
  HeightPercentWithMaxBtn = 95;
  SelectedCnrtSupervisionID;
  CostListFinYearCode;
  PriceListTypeCode;
  mainBodyHeight = 500;
  gridHeight = 76.5;
  HaveMaxBtn = false;
  ContractMinutesID: any;
  ContractMinutesPopupParam = {
    SelectedContractID: -1,
    SelectedCnrtSupervisionID: 0,
    SelectedCostFactorID: -1,
    CnrtSupervisionCode: 0,
    PriceListPatternID: -1,
    CostListFinYearCode: -1,
    PriceListTypeCode: -1,
    IsViewable: false,
    Mode: '',
    HeaderName: '',
    selectedRow: null,
    GridHeightInTab: 0,
    PanelHeightInTab: 0,
    HaveSave: false,
    IsEditable: false,
    ProductRequestID: null,
    ModuleCode: -1,
    ModuleViewTypeCode: null,
    BTNs: false,
    WorkflowTypeCode: 0,
    RegionCode: null
  };
  IsEditable = true;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  OverPixelWidth: number;
  MinHeightPixel: number;
  HaveHeader: boolean;
  Showable = true;
  ContractSupervisionPopupParam = {
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
    ModuleCode: -1,
    HeaderName: '',
    selectedRow: null,
    GridHeightInTab: 0,
    PanelHeightInTab: 0,
    HaveSave: false,
    IsEditable: false,
    IsEditable1: false,
    ProductRequestID: null,
    IsReadOnly: false,
    WorkFlowInstanceId: -1,
    ParentModuleCode: -1,
    workflowtypeStatus: -1,
    ShowReportsSign: false,
  };
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  PixelWidth;
  WorkFlowInstanceId;
  SelectedRow: any;
  currentRowIndex = -1;
  currentRowCount = -1;
  ContractNo;
  ContractorID: any;
  LetterDatePersian;
  HasWorkflow = false;

  constructor(
    private User: UserSettingsService,
    private ConSupervisionService: ContractSupervisionService,
    private WorkFlow: WorkflowService,
    private ContPayService: ContractPayService,
  ) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },

      {
        headerName: 'شماره نظارت',
        field: 'CnrtSupervisionCode',
        width: 150,
        resizable: true
      },
      {
        headerName: 'تاریخ نظارت',
        field: 'ContractSupervisionDatePersian',
        width: 150,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 600,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    this.User.GetModulOPByUser(this.PopupParam.ModuleCode).subscribe(res => {
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
      this.ContractMinutesPopupParam.SelectedContractID = currentData.ContractId;
      this.ContractMinutesPopupParam.SelectedCostFactorID = currentData.CostFactorID;
      this.ContractMinutesPopupParam.SelectedCnrtSupervisionID = currentData.SelectedCnrtSupervisionID;
      this.SelectedCostFactorID = currentData.CostFactorID;
      this.FinYearCode = currentData.FinYearCode;
      this.ContractCode = currentData.ContractCode;
      this.ContractTypeName = currentData.ContractTypeName;
      this.LetterNo = currentData.LetterNo;
      this.ContractAmount = currentData.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.ContractorName = currentData.ContractorName;
      this.FromContractDatePersian = currentData.FromContractDatePersian;
      this.ToContractDatePersian = currentData.ToContractDatePersian;
      this.Subject = currentData.Subject;
      this.PriceListPatternID = currentData.PriceListPatternID;
      this.CostListFinYearCode = currentData.CostListFinYearCode;
      this.PriceListTypeCode = currentData.PriceListTypeCode;
      this.ContractNo = currentData.ContractNo;
      this.ContractorID = currentData.ContractorID;
      this.LetterDatePersian = currentData.LetterDatePersian;
      this.rowData = of([]);
      this.ConSupervisionService.GetContractSupervisionList(this.SelectedContractID).subscribe(res => {
        this.rowData = res;
      });
    }
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
    this.ConSupervisionService.GetContractSupervisionList(this.SelectedContractID).subscribe(res => {
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
    this.SelectedCnrtSupervisionID = event.data.CnrtSupervisionID;
    this.CnrtSupervisionCode = event.data.CnrtSupervisionCode;
    
    if (this.PopupParam.ModuleCode === 3071) {
      this.IsDisable = false;
    } else {
      if (event.rowIndex === Count - 1) {
        this.IsDisable = false;
      } else {
        this.IsDisable = true;
      }
    }

    this.currentRowIndex = event.rowIndex;
    this.currentRowCount = Count;
    this.ContractOperationID = event.data.ContractOperationID;
    this.SelectedRow = event.data;
    this.ContPayService.HaveWorkFlowInstance(this.SelectedCnrtSupervisionID, 28).subscribe(res => {
      this.HasWorkflow = res;
    });
  }

  onInsert() {
    this.startLeftPosition = 59;
    this.startTopPosition = 20;
    this.PopUpType = 'contract-supervision';
    this.ContractMinutesPopupParam.Mode = 'InsertMode';
    this.isClicked = true;
    this.HaveMaxBtn = true;
    this.ContractMinutesPopupParam.SelectedCnrtSupervisionID = -1,
      this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
    this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
    this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
    this.ContractMinutesPopupParam.IsViewable = false;
    this.ContractMinutesPopupParam.BTNs = true;
  }

  onEdit(isViewable: boolean) {
    if (isNullOrUndefined(this.SelectedCnrtSupervisionID) || this.SelectedCnrtSupervisionID <= 0) {
      this.ShowMessageBoxWithOkBtn('ردیفی را انتخاب نمایید.');
    } else {
      if (isViewable) { // مشاهده
        this.HaveMaxBtn = true;
        this.startLeftPosition = 59;
        this.startTopPosition = 20;
        this.ContractMinutesPopupParam.Mode = 'EditMode';
        this.isClicked = true;
        this.ContractMinutesPopupParam.SelectedCnrtSupervisionID = this.SelectedCnrtSupervisionID;
        this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
        this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
        this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
        this.ContractMinutesPopupParam.IsViewable = isViewable;
        this.ContractMinutesPopupParam.BTNs = false;
        this.ContractMinutesPopupParam.RegionCode = this.SelectedRow.RegionCode;
        this.PopUpType = 'contract-supervision';
      } else { // اصلاح
        if (this.HasWorkflow && this.PopupParam.ModuleCode !== 3071) {
          this.ShowMessageBoxWithOkBtn('نظارت انتخابی دارای گردش می باشد. لذا امکان اصلاح وجود ندارد.');
        } else {
          this.HaveMaxBtn = true;
          this.startLeftPosition = 59;
          this.startTopPosition = 20;
          this.ContractMinutesPopupParam.Mode = 'EditMode';
          this.isClicked = true;
          this.ContractMinutesPopupParam.SelectedCnrtSupervisionID = this.SelectedCnrtSupervisionID;
          this.ContractMinutesPopupParam.PriceListPatternID = this.PriceListPatternID;
          this.ContractMinutesPopupParam.CostListFinYearCode = this.CostListFinYearCode;
          this.ContractMinutesPopupParam.PriceListTypeCode = this.PriceListTypeCode;
          this.ContractMinutesPopupParam.IsViewable = isViewable;
          this.ContractMinutesPopupParam.BTNs = false;
          this.ContractMinutesPopupParam.RegionCode = this.SelectedRow.RegionCode;
          this.PopUpType = 'contract-supervision';
        }
      }
    }
  }

  onDelete() {
    if (isNullOrUndefined(this.SelectedCnrtSupervisionID) || this.SelectedCnrtSupervisionID <= 0) {
      this.ShowMessageBoxWithOkBtn('ردیفی را انتخاب نمایید.');
    } else {
      if (this.HasWorkflow && this.PopupParam.ModuleCode !== 3071) {
        this.ShowMessageBoxWithOkBtn('نظارت انتخابی دارای گردش می باشد. لذا امکان حذف وجود ندارد.');
      } else {
        this.ConSupervisionService.DeleteContractSupervision(this.SelectedCnrtSupervisionID).subscribe(
          res => {
            this.ngOnInit();
          }
        );
      }
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = changes.PopupMaximized.currentValue ? 76.5 : 75;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 560 : 500;
    }
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
    this.ContractMinutesPopupParam.ModuleCode = this.PopupParam.ModuleCode;
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
  OnClickWorkFlowDetail() {
    if (this.SelectedRow) {
      // tslint:disable-next-line:max-line-length
      this.WorkFlow.GetWfInstanceIDByObjIDAndRegionCode(this.SelectedCnrtSupervisionID, this.PopupParam.RegionCode).subscribe(res => {
        this.PixelWidth = null;
        this.WorkFlowInstanceId = res;
        if (res === null) {
          this.ShowMessageBoxWithOkBtn('این قرارداد فاقد گردش کار می باشد');
          return;
        }
        this.PopUpType = 'user-work-log-details';
        this.isClicked = true;
        this.OverPixelWidth = 1290;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = 100;
        this.startTopPosition = 8;
        this.HeightPercentWithMaxBtn = 99;
        this.MinHeightPixel = 640;
        this.ContractSupervisionPopupParam.HeaderName = 'جزئیات گردش';
        this.ContractSupervisionPopupParam.LetterNo = this.LetterNo;
        this.ContractSupervisionPopupParam.Subject = this.Subject;
        this.ContractSupervisionPopupParam.FinYearCode = this.FinYearCode;
        this.ContractSupervisionPopupParam.ContractNo = this.ContractNo;
        this.ContractSupervisionPopupParam.ContractCode = this.ContractCode;
        this.ContractSupervisionPopupParam.SelectedContractID = this.SelectedContractID;
        this.ContractSupervisionPopupParam.ContractorName = this.ContractorName;
        this.ContractSupervisionPopupParam.ContractorID = this.ContractorID;
        this.ContractSupervisionPopupParam.ContractAmount = this.ContractAmount;
        this.ContractSupervisionPopupParam.LetterDatePersian = this.LetterDatePersian;
        this.ContractSupervisionPopupParam.workflowtypeStatus = 2;
        this.ContractSupervisionPopupParam.WorkFlowInstanceId = this.WorkFlowInstanceId;
        // this.ContractSupervisionPopupParam.ContractPayNo = this.ContractPayNo;
        this.ContractSupervisionPopupParam.ParentModuleCode = this.PopupParam.ModuleCode;
        // this.ContractSupervisionPopupParam.ContractPayTechnicalCode = this.SelectedRow.ContractPayTechnicalCode;
      });
    } else {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت مشاهده انتخاب نشده است');
    }
  }
}
