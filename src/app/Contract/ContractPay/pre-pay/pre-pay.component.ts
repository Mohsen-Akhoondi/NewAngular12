import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/lib/custom-checkbox.model';

@Component({
  selector: 'app-pre-pay',
  templateUrl: './pre-pay.component.html',
  styleUrls: ['./pre-pay.component.css']
})
export class PrePayComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  MessageBoxResult = false;
  DisplayControlls = true;
  ContractPayAmount;
  SumFinalItemAmount = '0';
  IsWFShow;
  WorkListDetailRows;
  columnDef1;
  defaultColDef1;
  columnDef2;
  columnDef22;
  defaultColDef2;
  selectedContractID = -1;
  btnclicked = false;
  ContractDetails;
  ContractPayStartDate;
  ContractPayStartMDate; // میلادی
  ContractPayEndDate;
  ContractPayEndMDate; // میلادی
  ContractPayDate;
  ContractSubLetter;
  ContractPayNo;
  ContractCode;
  ContractOperationName;
  ContractPayTechnicalCode;
  IsFinYearDisable = false;
  FinYearSet = [];
  ContractPayTypeSet = [];
  selectedFinYearObj;
  selectedContractPayTypeObj;
  Note;
  ContractPayItemList = [];
  type;
  HaveHeader: boolean;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  ChangeDetection = false;
  ProductIDs = [];
  SumContractPay = 0;
  SelectedProductID;
  ContractOperationId;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  Excel_Header_Param: { colDef2: any };
  paramObj;
  HaveSave = false;
  EditModeInit = false;
  IsDisable = true;
  HaveWorkFlow = false;
  selectedContractPayID;
  ArchiveBtnText;
  DetailArchiveBtnText;
  beforeProductID;
  PriceListTopicName = '';
  PriceListTopicUnit = '';
  PriceListTopicUnitAmount = '';
  ContractAgent;
  ContractAgentSet = [];
  selectedContractAgentObj;
  IsEditable = true;
  dgCPHeight = 91;
  dgCPEHeight = 90;
  ReadyToConfirm;
  HaveConfirm = false;
  ConfirmStatus = [];
  IsEndFlow;
  ContractorName;
  BtnClickedName;
  WorkFlowID;
  WorkflowTypeName;
  WorkflowTypeCode;
  WorkflowObjectCode;
  ObjectNo;
  ObjectID;
  CoefParam;
  RegionCode;
  ContractPayID;
  SelectedContractPayItemListID;
  PriceListTypeCode;
  CostFactorID;
  CostContractID;
  HaveMaxBtn = false;
  selectedRow: any;
  ModuleCode: any;
  SelectedProductName;
  SelectedContractPayItemID;
  IsDown = false;
  Subject;
  IsNotFound = false;
  value: any;
  PriceListAmount;
  CalcFunction;
  StarCodeList;
  IsStarCodeNameEditable: boolean;
  IsAmountEditable: boolean;
  ContractID;
  CartableUserID: any;
  CurrWorkFlow: any;
  EstimateList = [];
  beforeDetail = 0;
  SumTotalAmount;
  ShowWorkflowButtons = true;
  ISSendAndConfirm = true;
  ISDisabledConfirmAndReturnBtn = false;
  CheckRegionWritable = true;
  IsEditConfirm = true;
  ModuleViewTypeCode;
  IsContractRemainStartWF;
  OrginalModuleCode;
  WorkFlowTransitionID;
  startLeftPosition: number;
  startTopPosition: number;
  PercentWidth;
  OverMainMinwidthPixel;
  MainMaxwidthPixel;
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  btnConfirmAndReturnName = 'عدم تاييد و بازکشت';
  IsDisableWorkflow = true;
  btnConfirmName = 'تایید';
  btnConfirmIcon = 'ok';
  EntityList = [];
  PriceListTopicCodeName;
  ExcelData;
  PlcParams;
  ButtonsPlaceWidthPercent = 61;
  LetterNo;
  LetterDatePersian;
  ContractNo;
  DisplayWorkflow = true;
  ShowSendBtn = false;
  CheckValidate = false;
  IsConfirm = 0;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ShowConfimChekBox = false;
  ContractorAmount; // 62433 sh
  IsContractorAgent: boolean = false;
  IsAdminToolsModule: boolean;
  ShowContractorAmount = false;
  ShowReportsSign = false;

  constructor(
    private contractpaydetail: ContractPayDetailsService,
    private FinYear: FinYearService,
    private User: UserSettingsService,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService,
    private CommonService: CommonServices,
    private ProductRequest: ProductRequestService,
    private Report: ReportService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.ContractID = this.PopupParam.SelectedContractID;
    this.CostFactorID = this.PopupParam.SelectedCPCostFactorID;
    this.ContractPayID = this.PopupParam.SelectedContractPayID;
    this.ContractCode = this.PopupParam.ContractCode;
    this.Subject = this.PopupParam.Subject;
    this.ContractorName = this.PopupParam.ContractorName;
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;
    // tslint:disable-next-line: max-line-length
    this.ModuleCode = this.ModuleCode ? this.ModuleCode : 2516;
    this.RegionCode = this.PopupParam.RegionCode;
    this.ShowContractorAmount = (this.RegionCode >= 0 && this.RegionCode < 23) ? true : false;

    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeNgInit();
      return;
    }
    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeNgInit();
      return;
    }
  }
  InsertModeNgInit() {
    this.IsDisableWorkflow = !this.PopupParam.IsViewable ? false : true;
    this.CostContractID = this.PopupParam.SelectedCostFactorID;
    this.HaveConfirm = false;
    this.User.GetModulOPByUser(2516).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
          case 16:
            this.HaveSave = true;
            break;
          default:
            break;
        }
      });
    });

    forkJoin([
      this.contractpaydetail.GetContractDetails(this.PopupParam.SelectedContractID),
      this.contractpaydetail.GetMaxContractPayNo(this.CostContractID),
      this.contractpaydetail.GetContractAgent(),
      this.ProductRequest.GetCurrentDate()
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[2] && res[2][0]) {
        this.ContractAgentSet = res[2];
        if (!this.selectedContractAgentObj) {
          this.selectedContractAgentObj = res[2][0].ContractAgentCode;
        }
      }
      this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
      this.Note = this.ContractSubLetter;
      this.ContractPayNo = res[1];
      this.ContractPayTechnicalCode = this.ContractDetails.ContractCode * 10000 + res[1];
      this.ContractPayDate = res[3];
      this.IsDown = true;
    });

    this.contractpaydetail.GetContractPayType().subscribe(res => {
      this.ContractPayTypeSet = res;
      this.selectedContractPayTypeObj = res[0].ContractPayTypeCode;
    });

    this.FinYear.GetFinYearList().subscribe(res => {
      this.FinYearSet = res;
    });

    this.contractpaydetail.GetContractOperationName(this.PopupParam.ContractOperationID).subscribe(res => {
      this.ContractOperationName = res;
    });
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  EditModeNgInit() {
    this.EditModeInit = true;
    this.IsFinYearDisable = true;
    this.IsDisableWorkflow = !this.PopupParam.IsViewable ? false : true; // RFC 52262
    this.contractpaydetail.HasEndedWorkflow(this.CostFactorID).subscribe(res => {
      this.ShowReportsSign = res;
    });
    if (!this.PopupParam.IsViewable) { // مشاهده درخواست پرداخت نباشد
      this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
      this.WorkFlowID = this.PopupParam.WorkFlowID;
      this.RegionCode = this.PopupParam.RegionCode;
      this.IsWFShow = this.PopupParam.IsWFShow;
      this.WorkListDetailRows = this.PopupParam.rows;
      this.ReadyToConfirm = this.PopupParam.ReadyToConfirm;
      if (this.WorkFlowID) {
        this.HaveWorkFlow = true;
        this.IsEndFlow = this.PopupParam.IsEnd === 1;
        this.WorkflowTypeName = this.PopupParam.WorkflowTypeName;
        this.WorkflowTypeCode = this.PopupParam.WorkflowTypeCode;
        this.WorkflowObjectCode = this.PopupParam.WorkflowObjectCode;
        this.ObjectNo = this.PopupParam.ObjectNo;
        this.ContractCode = this.PopupParam.CurrWorkFlow.ObjectCode;
        this.Subject = this.PopupParam.CurrWorkFlow.ObjectSubject;
        this.ObjectID = this.PopupParam.ObjectID;
        this.ContractorName = this.PopupParam.CurrWorkFlow.ObjectActorName;
        this.CartableUserID = this.PopupParam.CartableUserID;
      }
      this.ShowConfimChekBox = this.ModuleCode === 2875 ? true : false;
      this.User.GetModulOPByUser(2516).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
            case 16:
              this.HaveSave = true;
              break;
            case 21:
              this.ConfirmStatus.push(21);
              if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
                this.btnConfirmName = 'تایید';
                this.btnConfirmIcon = 'ok';
                this.HaveConfirm = true;
              }
              break;
            case 22:
              this.ConfirmStatus.push(22);
              if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
                this.btnConfirmName = 'عدم تایید';
                this.btnConfirmIcon = 'cancel';
                this.HaveConfirm = true;
              }
              break;
            case 28:
              this.ConfirmStatus.push(28);
              if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
                this.btnConfirmName = 'بازگشت از تایید نهایی';
                this.btnConfirmIcon = 'cancel';
                this.ISDisabledConfirmAndReturnBtn = true;
                this.HaveConfirm = true;
                this.ShowSendBtn = true;
              }
              break;
            case 27:
              this.ConfirmStatus.push(27);
              if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
                this.btnConfirmName = 'تایید نهایی';
                this.btnConfirmIcon = 'ok';
                this.ShowSendBtn = true;
                this.HaveConfirm = true;
              }
              break;
            default:
              break;
          }
        });
      });
    } else {
      this.DisplayControlls = this.PopupParam.IsEditable1;
    }

    forkJoin([
      this.contractpaydetail.GetContractAgents(),
      this.contractpaydetail.GetContractPayType(),
      this.FinYear.GetFinYearList()
    ]).subscribe(res => {
      if (res[0] && res[0][0]) {
        this.ContractAgentSet = res[0];
        if (!this.selectedContractAgentObj) {
          this.selectedContractAgentObj = res[0][0].ContractAgentCode;
        }
      }
      this.ContractPayTypeSet = res[1];
      this.FinYearSet = res[2];
      this.contractpaydetail.GetContractPay(this.CostFactorID, -1).subscribe(ress => {
        this.ContractDetails = ress;
        this.ContractPayID = this.ContractDetails.ContractPayId;
        this.CostContractID = this.ContractDetails.CostContractId;
        this.ContractPayAmount = this.ContractDetails.ContractPayAmount;
        this.ContractSubLetter = this.ContractDetails.ParentObjectStr;
        this.Note = this.ContractDetails.Note;
        this.ContractPayNo = this.ContractDetails.ContractPayNo;
        this.ContractPayTechnicalCode = this.ContractDetails.ContractPayTechnicalCode;
        this.ContractPayDate = this.ContractDetails.ShortContractPayDate;
        this.selectedFinYearObj = this.ContractDetails.FinYearCode;
        this.selectedContractPayTypeObj = this.ContractDetails.ContractPayTypeCode;
        this.ContractOperationId = this.ContractDetails.ContractOperationId;
        this.ContractOperationName = this.ContractDetails.ContractOperationName;
        this.IsConfirm = this.ContractDetails.IsConfirm;
        this.ContractorAmount = this.ContractDetails.ContractorAmount;
        if (this.ContractDetails.ContractOperationId === 2 && this.PopupParam.ShowSendBtn === 'YES') {
          this.DisplayWorkflow = false;
        }
        this.IsDown = true;
      },
        err => {
          this.ShowMessageBoxWithOkBtn('خواندن اطلاعات درخواست پرداخت با خطا مواجه شد. لطفا دوباره تلاش نمایید.');
          return;
        });
    });
    new Promise((StartedWFResolve, reject) => { // RFC 52262
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      if (this.IsWFShow && this.WorkListDetailRows) {
        this.FlowService.RunAfterActionMethod(this.WorkListDetailRows).subscribe();
      }
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  onChangeFinYearObj(newObj) {
    this.selectedFinYearObj = newObj;
    this.CheckValidate = false;
  }

  OnContractPayDateChange(ADate) {
    if (ADate.FullDate !== '' && !this.EditModeInit) {
      this.ContractPayDate = ADate.MDate;
      this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
        this.ContractPayNo, ADate.MDate, null, 1, true, this.ContractOperationId).subscribe(
          ress => {
            ress.forEach(item => {
              item.ContractOrderEstimateList = [];
            });
            this.ContractPayItemList = ress;
            let SumFinalItemAmount = 0;
            this.ContractPayItemList.forEach(node => {
              SumFinalItemAmount = SumFinalItemAmount + node.AmountCOEF;
            });
            this.SumFinalItemAmount = SumFinalItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
        );
    }

    if (ADate.FullDate !== '') {
      this.EditModeInit = false;
    }
  }

  onSave() {

    if (!this.selectedFinYearObj || this.selectedFinYearObj == null) { // RFC 59538
      this.CheckValidate = true;
      this.ShowMessageBoxWithOkBtn('سال مالی نمی تواند خالی باشد');
      return;
    }

    if ((!this.ContractPayAmount || this.ContractPayAmount == null) && !this.IsContractorAgent) {
      this.ShowMessageBoxWithOkBtn('مبلغ پرداخت نمی تواند خالی باشد');
      return;
    }

    if (this.ContractPayAmount <= 0) { // RFC 58767
      this.ShowMessageBoxWithOkBtn('مبلغ پرداخت معتبر نمی باشد');
      return;
    }

    if (this.PopupParam.Mode === 'InsertMode') {
      this.SaveContractPay();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.UpdateContractPay();
      return;
    }
  }

  UpdateContractPay() {
    const ContractPayItemList = [];
    const ContractPayObj = {
      ContractPayId: this.ContractDetails.ContractPayId,
      CostFactorId: this.CostFactorID,
      CostContractId: this.CostContractID,
      FinYearCode: this.selectedFinYearObj,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.selectedContractPayTypeObj,
      Note: this.Note,
      ContractPayAmount: (this.IsContractorAgent) ? this.ContractorAmount : this.ContractPayAmount,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractOperationId: this.ContractOperationId ? this.ContractOperationId : this.PopupParam.ContractOperationID,
      IsConfirm: this.IsConfirm,
      ContractorAmount: this.ContractorAmount,
    };
    this.contractpaydetail.UpdateContractPay(ContractPayObj,
      ContractPayItemList,
      this.selectedContractAgentObj,
      this.ModuleCode,
      false,
      false,
      null,
      false,
      null
    ).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
      this.beforeProductID = null;
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        this.ChangeDetection = true;
      }
    );
  }

  ShowMessageBoxWithOkBtn(message) {

    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 87;
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
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {
    this.type = '';
    this.btnclicked = false;

    if (this.BtnClickedName === 'BtnConfirm' && ActionResult === 'YES') {
      this.DOConfirm();
    }

    if (this.BtnClickedName !== 'BtnConfirm' && this.BtnClickedName !== 'PriceListTopicNotFound' && ActionResult === 'YES') {
      this.Closed.emit(true);
    }

    if (ActionResult === 'OK' && this.IsEndFlow && this.BtnClickedName === 'ConfirmAndSend') {
      // ورودی برای این متد گرفته شد با مقدار 
      // true
      // در حالتی که تایید و  ارسال نود آخر می باشد و تایید و ارسال انجام می شود.
      // و  چون در تایید مقدار
      // ReadyToConfirm = 1
      // می شود. به اشتباه عدم تایید نهایی کال می شد.
      // به همین دلیل مقدار اولیه جهت تایید نهایی از اینجا پاس داده شد.
      this.DOFinalConfirm(true);
    }
    this.BtnClickedName = '';
  }
  popupclosed() {
    this.BtnClickedName = '';
    this.btnclicked = false;
    this.IsNotFound = false;
  }

  SaveContractPay() {
    const ContractPayObj = {
      ContractPayId: -1,
      CostFactorId: -1,
      CostContractId: this.CostContractID,
      FinYearCode: this.selectedFinYearObj,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      ContractPayTypeCode: this.selectedContractPayTypeObj,
      Note: this.Note,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractPayAmount: (this.IsContractorAgent) ? this.ContractorAmount : this.ContractPayAmount,
      ContractOperationId: this.PopupParam.ContractOperationID,
      IsConfirm: 0,
      ContractorAmount: this.ContractorAmount,
    };
    this.contractpaydetail.SaveContractPayAmount(ContractPayObj).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
      this.PopupParam.Mode = 'EditMode';
      this.PopupParam.SelectedCPCostFactorID = res;
      this.beforeProductID = null;
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        this.ChangeDetection = true;
      }
    );
  }

  getOutPutParam(event) {
    if (event && this.type === 'work-flow-send') { // RFC 52262
      this.close();
    }
  }
  onConfirms() { // RFC 52262
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت  تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.CostFactorID,
          this.RegionCode,
          this.ModuleCode,
          0,
          this.WorkflowObjectCode,
          this.ModuleViewTypeCode,
          this.OrginalModuleCode,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null,
          null,
          this.IsEndFlow)
          .subscribe(res => {
            this.ShowMessageBoxWithOkBtn('عدم تاييد درخواست انجام معامله با موفقيت انجام شد');
            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تاييد';
            this.btnConfirmIcon = 'ok';
            this.IsEditConfirm = true;
          }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }

  onConfirmAndSend() { // RFC 52262
    this.BtnClickedName = 'ConfirmAndSend';
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
    } else {
      this.DoConfirmAndSend();
    }

  }

  OnClickPrintFlow() { // RFC 52262
    this.Report.ShowReport(null,
      null,
      this.CostFactorID,
      this.ContractCode,
      null,
      null,
      null,
      null,
      null,
      null,
      this.ModuleCode,
      this.RegionCode
    );
  }

  SetStartedWFInfo(Resolve) { // RFC 52262
    this.FlowService.GetStartModuleViewTypeCode(this.RegionCode,
      this.ModuleCode,
      this.WorkflowTypeCode,
      this.CostFactorID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          if (this.IsContractRemainStartWF) {
            this.WorkFlowID = null;
          }
        }
        Resolve();
      });
  }
  ViewTypeChange() {
    if (this.btnConfirmName === 'عدم تایید') {
      this.IsEditable = true;
      this.IsEditConfirm = false;
    }
    switch (this.ModuleViewTypeCode) {
      case 1:
        this.IsEditable = true;
        this.IsContractorAgent = (this.RegionCode >= 0 && this.RegionCode < 23) ? true : false;
        break;
      case 2:
        this.IsEditable = false;
        break;
      case 500000: // حالت فقط خواندنی
        this.DisplayControlls = false;
        this.HaveSave = false;
        this.IsEditable = false;
        this.HaveConfirm = false;
        break;
      case 100000:
        this.IsAdminToolsModule = true;
        break;
      default:
        break;
    }
  }
  DOConfirm(HasAlert = true, resolve = null) { // RFC 52262
    if (this.WorkflowObjectCode === null || this.WorkflowObjectCode === undefined) {
      this.ShowMessageBoxWithOkBtn('ماژول گردش کار براي اين واحد اجرايي به درستي تعريف نشده است');
      return;
    }
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CostFactorID,
      this.RegionCode,
      this.ModuleCode,
      1,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.OrginalModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null,
      null,
      this.IsEndFlow).
      subscribe(res => {
        if (HasAlert) {
          this.ShowMessageBoxWithOkBtn('تاييد درخواست پرداخت با موفقيت انجام شد');
        }
        this.RefreshCartable.RefreshCartable();
        this.ReadyToConfirm = 1;
        this.btnConfirmName = 'عدم تاييد';
        this.btnConfirmIcon = 'cancel';
        this.IsEditConfirm = false;
        resolve(res);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطاي پيش بيني نشده');
          }
        }
      );

  }
  DOFinalConfirm(ReadyToConfirm = null) { // RFC 52262
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      ReadyToConfirm  ? ReadyToConfirm : (this.ReadyToConfirm === null || this.ReadyToConfirm === 0),
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.CartableUserID
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          messageStr = 'بازگشت از تاييد نهايي درخواست پرداخت با موفقيت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تاييد نهايي';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تاييد نهايي درخواست پرداخت با موفقيت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تاييد نهايي';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطاي پيش بيني نشده');
          }
        });
  }
  DoConfirmAndSend() { // RFC 52262
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown: any) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('باتوجه به اينکه نقش شما در اين گردش آخرين فعاليت مي باشدارسال شما به عنوان پايان کار در نظر گرفته مي شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                    });
                    this.type = 'work-flow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    this.PercentWidth = null;
                    this.OverMainMinwidthPixel = null;
                    this.MainMaxwidthPixel = null;
                    this.HeightPercentWithMaxBtn = null;
                    this.MinHeightPixel = null;
                    this.paramObj = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      ObjectID: this.ObjectID,
                      ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      MinimumPosting: this.PopupParam.WorkFlowID ? this.PopupParam.MinimumPosting : IsDown.MinimumPosting,
                      OrginalModuleCode: this.ModuleCode,
                      CartableUserID: this.CartableUserID
                    };
                    this.btnclicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصي جهت ارسال وجود ندارد');
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });
  }
  DoUnConfirm(alert = true, resolve = null) { // RFC 52262
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CostFactorID,
      this.RegionCode,
      this.ModuleCode,
      0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.OrginalModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null,
      null,
      this.IsEndFlow).subscribe(res => {
        if (alert) {
          this.ShowMessageBoxWithOkBtn('عدم تاييد درخواست پرداخت با موفقيت انجام شد');
        }
        this.ReadyToConfirm = 0;
        this.btnConfirmName = 'تاييد';
        this.btnConfirmIcon = 'ok';
        this.IsEditable = true;
        this.IsEditConfirm = true;
        resolve(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطاي پيش بيني نشده');
          }
        }
      );

  }

  onUnConfirmAndReturn() {
    this.IsDown = false;
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.ObjectNo;
        this.ObjectID = this.CostFactorID;
        this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
          .subscribe(
            res => {
              this.IsDown = true;
              if (res != null && res.length > 0) {
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.type = 'work-flow-send';
                this.OverstartLeftPosition = 350;
                this.OverstartTopPosition = 105;
                this.PercentWidth = null;
                this.OverMainMinwidthPixel = null;
                this.MainMaxwidthPixel = null;
                this.HeightPercentWithMaxBtn = null;
                this.MinHeightPixel = null;
                this.paramObj = {
                  Message: 'بازگشت',
                  OperationCode: 2,
                  rows: res,
                  CurrWorkFlow: this.CurrWorkFlow,
                  WorkFlowID: this.WorkFlowID,
                  IsEnd: this.IsEndFlow,
                  ObjectNo: this.ObjectNo,
                  WorkflowTypeName: this.WorkflowTypeName,
                  WorkflowTypeCode: this.WorkflowTypeCode,
                  WorkflowObjectCode: this.WorkflowObjectCode,
                  ObjectID: this.ObjectID,
                  CartableUserID: this.CartableUserID
                };
                this.btnclicked = true;
              } else {
                this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
              }
            }
          );
      } else {
        this.IsDown = true;
        this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
      }
    });
  }

  BtnArchiveClick() {
    if (this.ContractPayID) {
      this.type = 'archive-details';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.OverstartLeftPosition = 285;
      this.OverstartTopPosition = 20;
      const archiveParam = {
        EntityID: this.ContractPayID,
        TypeCodeStr: '3-',
        DocTypeCode: 3,
        ModuleCode: 2516,
        IsReadOnly: this.PopupParam.ShowSendBtn === 'YES' ? true : this.PopupParam.IsViewable,
        DocumentTypeCodeList: this.ContractOperationId !== 1 ? [7, 8] : null,
      };
      this.paramObj = archiveParam;
    } else {
      this.ShowMessageBoxWithOkBtn('مقادیر به درستی وارد نشده است، لطفا با راهبر سیستم تماس بگیرید');
    }
  }
  print() {
    this.ContractID = this.PopupParam.SelectedContractID;
    this.Report.ContractPayRep(
      this.ContractID,
      this.CostFactorID,
      this.PopupParam.RegionCode,
      this.ModuleCode,
      this.ShowReportsSign,
      'گزارش پیش نویس صورت وضعیت');
  }
  OnChangeCheckBoxValue(Ischeck) {
    this.IsConfirm = Ischeck;

  }
}


