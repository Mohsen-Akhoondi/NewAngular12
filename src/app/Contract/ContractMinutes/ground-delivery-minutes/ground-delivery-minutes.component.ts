import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ContractMinutesService } from 'src/app/Services/ContractService/ContractMinutes/ContractMinutesService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
@Component({
  selector: 'app-ground-delivery-minutes',
  templateUrl: './ground-delivery-minutes.component.html',
  styleUrls: ['./ground-delivery-minutes.component.css']
})
export class GroundDeliveryMinutesComponent implements OnInit {
  @Input() InputParam;
  selectedContractID = -1;
  btnclicked = false;
  ContractDetails;
  ContractMinutesDate;
  ContractSubLetter;
  ContractMinutesCode;
  Note;
  ContractAgentParams = {
    bindLabelProp: 'ContractAgentName',
    bindValueProp: 'ContractAgentCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractAgentSet = [];
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false }
  EditModeInit = false;
  TextMinutes = '';
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  BtnClickedName;
  type;
  ParamObj;
  ContractMinutesID;
  HaveMaxBtn = false;
  IsDown = false;
  ChangeDetection = false;
  FinYearCode;
  ContractCode;
  ContractNo;
  ContractDate;
  Subject;
  RegionName;
  LetterDate;
  ContractorName;
  Isdisblabe = true ;
  ShowWorkflowButtons = true;
  WorkflowButtonsWidth = 50;
  btnConfirmName;
  IsEndFlow: any;
  ReadyToConfirm = null;
  btnConfirmIcon;
  WorkFlowID = null;
  WorkflowObjectCode;
  WorkflowTypeCode;
  ModuleViewTypeCode;
  WorkflowTypeName;
  ObjectNo: string;
  ObjectID: any;
  WorkFlowTransitionID;
  MinimumPosting: any;
  IsDisable = true;
  LetterNo;
  LetterDatePersian;
  ContractTypeName;
  ContractAmount;
  FromContractDatePersian;
  ToContractDatePersian;
  ModuleCode;
  DisplayControlls = true;
  CartableUserID;
  CurrWorkFlow: any;
  PercentWidth;
  OverMainMinwidthPixel;
  MainMaxwidthPixel;
  HeightPercentWithMaxBtn;
  MinHeightPixel;
  constructor(private contractMinutes: ContractMinutesService,
    private contractpaydetail: ContractPayDetailsService,
    private Cartable: CartableServices,
    private FlowService: WorkflowService,
    private RefreshCartable: RefreshServices,
    private CommonService: CommonServices,
    private Report: ReportService
  ) {
  }

  ngOnInit() {
    if (this.InputParam) {
      this.onDisplay();
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.ContractMinutesID = this.InputParam.ContractMinutesID;
      this.ContractCode = this.InputParam.ContractCode;
      this.FinYearCode = this.InputParam.FinYearCode;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.ReadyToConfirm = this.InputParam.ReadyToConfirm;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      this.WorkflowTypeName = this.InputParam.WorkflowTypeName;
      this.WorkflowTypeCode = this.InputParam.WorkflowTypeCode;
      this.WorkflowObjectCode = this.InputParam.WorkflowObjectCode;
      this.ObjectNo = this.InputParam.ObjectNo;
      this.CartableUserID = this.InputParam.CartableUserID;
      this.ObjectID = this.InputParam.ObjectID;
      this.LetterNo = this.InputParam.LetterNo ? this.InputParam.LetterNo : '';
      this.ContractTypeName = this.InputParam.ContractTypeName ? this.InputParam.ContractTypeName : '';
      this.ContractAmount = this.InputParam.ContractAmount ? this.InputParam.ContractAmount : '';
      // this.ContractNo = this.InputParam.ContractNo ? this.InputParam.ContractNo : '';
      this.LetterDatePersian = this.InputParam.LetterDatePersian ? this.InputParam.LetterDatePersian : '';
      this.Subject = this.InputParam.Subject ? this.InputParam.Subject : '';
      this.ContractorName = this.InputParam.ContractorName ? this.InputParam.ContractorName : '';
      this.MinimumPosting = this.InputParam.MinimumPosting ? this.InputParam.MinimumPosting : '';
      this.RegionName = this.InputParam.RegionName ? this.InputParam.RegionName : '';
      this.LetterDate = this.InputParam.LetterDate ? this.InputParam.LetterDate : '';
      this.FromContractDatePersian = this.InputParam.FromContractDatePersian ? this.InputParam.FromContractDatePersian : '';
      this.ToContractDatePersian = this.InputParam.ToContractDatePersian ? this.InputParam.ToContractDatePersian : '';
      this.ModuleCode = this.InputParam.ModuleCode ? this.InputParam.ModuleCode : '';
      if (this.ContractMinutesID > 0) {
        this.IsDisable = false;
      }
    }
    if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید';
      this.btnConfirmIcon = 'ok';
    }

    if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'عدم تایید';
      this.btnConfirmIcon = 'cancel';
    }

    if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'بازگشت از تایید نهایی';
      this.btnConfirmIcon = 'cancel';
    }

    if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید نهایی';
      this.btnConfirmIcon = 'ok';
    }
    this.SetStartedWFInfo();
    if (this.InputParam.Mode === 'InsertMode') {
      this.InsertModeNgInit();
      return;
    }

    if (this.InputParam.Mode === 'EditMode') {
      this.IsDisable = false;
      this.EditModeNgInit();
      return;
    }
  }

  onDisplay() {
    if (this.InputParam.ModuleViewTypeCode) {
      switch (this.InputParam.ModuleViewTypeCode) {
        case 500000: // حالت فقط خواندنی
          this.DisplayControlls = false;
          break;
        default:
          break;
      }
    }
  }

  InsertModeNgInit() {
    forkJoin([
      this.contractpaydetail.GetContractDetails(this.InputParam.SelectedContractID),
      this.contractMinutes.GetMaxContractMinutesCode(this.InputParam.SelectedContractID),
      this.contractpaydetail.GetContractAgent()
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[2] && res[2][0]) {
        this.ContractAgentSet = res[2];
        this.ContractAgentParams.selectedObject = res[2][0].ContractAgentCode;
      }
      this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
      this.Note = this.ContractSubLetter;
      this.ContractMinutesCode = res[1];
      if (this.InputParam.AutoEntityTypeCode) {
        this.contractMinutes.GetTextTemplate(this.InputParam.RegionCode, this.InputParam.AutoEntityTypeCode).subscribe(resss => {
          this.TextMinutes = resss;
          this.CheckTextMinutes();
        });
      }
      this.contractMinutes.GetMinutesContractOrder(this.InputParam.SelectedContractID,
        this.ContractMinutesCode,
        '',
        null,
        true)
        .subscribe(
          ress => {
            if (ress && ress[0]) {
              this.ContractMinutesDate = ress[0].ContractMinutesDate;
            }
          }
        );
      this.IsDown = true;
    });
  }
  EditModeNgInit() {
    this.EditModeInit = true;
    forkJoin([
      this.contractMinutes.GetContractMinutes(this.ContractMinutesID),
      this.contractpaydetail.GetContractAgent(),
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[1] && res[1][0]) {
        this.ContractAgentSet = res[1];
        this.ContractAgentParams.selectedObject = res[1][0].ContractAgentCode;
      }
      this.ContractMinutesID = this.ContractDetails.ContractMinutesID;
      this.ContractSubLetter = this.ContractDetails.ParentObjectStr;
      this.Note = this.ContractDetails.Note;
      this.ContractMinutesCode = this.ContractDetails.ContractMinutesCode;
      this.ContractMinutesDate = this.ContractDetails.ShortContractMinutesDate;
      this.TextMinutes = this.ContractDetails.TextMinutes;
      this.IsDown = true;
    });
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات صورتجلسه تحویل زمین تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات از فرم خارج شويد ؟');
    } else {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  OnContractMinutesDateChange(ADate) {
    if (!this.EditModeInit) {
      this.ContractMinutesDate = ADate.MDate;
    }
    this.EditModeInit = false;
  }
  onChangeContractAgentObj(newObj) {
    this.ContractAgentParams.selectedObject = newObj;
  }
  onSave() {
    if (!this.ContractMinutesDate || this.ContractMinutesDate == null) {
      this.ShowMessageBoxWithOkBtn('تاريخ صورت وضعيت نمي تواند خالي باشد');
      return;
    }

    if (this.InputParam.Mode === 'InsertMode') {
      this.SaveContractMinutes();
      return;
    }

    if (this.InputParam.Mode === 'EditMode') {
      this.UpdateContractMinutes();
      return;
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.type = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.type = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {

    if (ActionResult === 'YES') {
      this.Closed.emit(true);
    }

    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
  popupclosed() {
    this.btnclicked = false;
  }
  SaveContractMinutes() {
    const ContractMinutesObj = {
      ContractMinutesID: -1,
      ContractID: this.InputParam.SelectedContractID,
      ContractMinutesCode: this.ContractMinutesCode,
      ContractMinutesDate: this.ContractMinutesDate,
      Note: this.Note,
      TextMinutes: this.TextMinutes,
      AutoEntityTypeCode: this.InputParam.AutoEntityTypeCode,
    };
    this.contractMinutes.SaveContractMinutes(ContractMinutesObj, null).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
      this.ContractMinutesID = res;
      this.ChangeDetection = false;
      this.IsDisable = false;
      this.CheckTextMinutes();
      // this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        this.ChangeDetection = true;
      }
    );
  }

  UpdateContractMinutes() {
    const ContractMinutesObj = {
      ContractMinutesID: this.ContractMinutesID,
      ContractID: this.InputParam.SelectedContractID,
      ContractMinutesCode: this.ContractMinutesCode,
      ContractMinutesDate: this.ContractMinutesDate,
      Note: this.Note,
      TextMinutes: this.TextMinutes,
      AutoEntityTypeCode: this.InputParam.AutoEntityTypeCode,
    };
    this.contractMinutes.UpdateContractMinutes(ContractMinutesObj,
      null
    )
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
        this.ChangeDetection = false;
        this.IsDisable = false;
        this.CheckTextMinutes();
        // this.ngOnInit();
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          this.ChangeDetection = true;
        }
      );
  }
  onUploadDocClick() {
    if (this.ContractMinutesID > 0) {
      this.btnclicked = true;
      this.startLeftPosition = 94;
      this.startTopPosition = 10;
      this.type = 'archive-details';
      this.ParamObj = {
        EntityID: this.ContractMinutesID,
        DocTypeCode: 243,
        ModuleCode: this.ModuleCode,
      };
    }
  }
  onPrint() {
    if (this.ContractMinutesID > 0 && this.TextMinutes) {
      this.TextMinutes = this.TextMinutes.replace('\n', '');
      this.Report.GDMinutesRep(this.ContractMinutesID, this.InputParam.ContractId, this.TextMinutes,
        this.InputParam.ModuleCode, 'صورتجلسه تحويل زمين');
    }
  }
  CheckTextMinutes() {
    if (this.ContractMinutesID > 0 && this.TextMinutes !== '') {
      this.Isdisblabe = false;
    }
  }
  OnClickPrintFlow() {
    this.Report.ShowReport(null,
      null,
      this.ContractMinutesID,
      this.ContractCode,
      this.LetterNo,
      this.LetterDatePersian,
      this.Subject,
      this.ContractorName,
      null,
      null,
      this.InputParam.ModuleCode,
      this.InputParam.RegionCode,
    );
  }

  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات صورتجلسه تحويل زمين تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.ContractMinutesID,
          this.InputParam.RegionCode,
          this.InputParam.ModuleCode,
          0,
          this.WorkflowObjectCode,
          null, null,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
            this.ShowMessageBoxWithOkBtn('عدم تاييد درخواست صورتجلسه تحویل زمین با موفقيت انجام شد');

            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تاييد';
            this.btnConfirmIcon = 'ok';
          }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }
  DOConfirm(HasAlert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.ContractMinutesID,
      this.InputParam.RegionCode,
      this.InputParam.ModuleCode,
      1,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      null,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
      subscribe(res => {
        if (HasAlert) {
          this.ShowMessageBoxWithOkBtn('تایید درخواست صورتجلسه تحویل زمین با موفقیت انجام شد');
        }
        this.RefreshCartable.RefreshCartable();
        this.ReadyToConfirm = 1;
        this.btnConfirmName = 'عدم تایید';
        this.btnConfirmIcon = 'cancel';
        resolve(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }
  DOFinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
      this.WorkflowObjectCode,
      null,
      this.CartableUserID
    )
      .subscribe(res2 => {
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          this.ShowMessageBoxWithOkBtn('بازگشت از تایید نهایی صورتجلسه تحویل زمین با موفقیت انجام شد');
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';
        } else {
          this.ShowMessageBoxWithOkBtn('تایید نهایی صورتجلسه تحویل زمین با موفقیت انجام شد');
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
      },
        err => {
          const str = err.error.split('|');
          if (str[1]) {
            this.ShowMessageBoxWithOkBtn(str[1]);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }
  SetStartedWFInfo() {
    this.FlowService.GetStartModuleViewTypeCode(this.InputParam.RegionCode,
      this.InputParam.ModuleCode,
      null,
      this.ContractMinutesID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
        }
      });
  }
  onConfirmAndSend() {
    this.BtnClickedName = 'ConfirmAndSend';
    this.IsDown = false;
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات صورتجلسه تحویل زمین تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
    } else {
      this.ConfirmAndSend();
    }
  }
  ConfirmAndSend() {
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo();
        }).then(() => {
          this.ObjectNo = this.ContractMinutesCode;
          this.ObjectID = this.ContractMinutesID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
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
                    this.InputParam = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      ObjectID: this.ObjectID,
                      MinimumPosting: this.MinimumPosting,
                      CartableUserID: this.CartableUserID
                    };
                    this.btnclicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });
  }
  onUnConfirmAndReturn() {
    this.IsDown = false;
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.ContractMinutesCode;
        this.ObjectID = this.ContractMinutesID;
        this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
          .subscribe(
            res => {
              this.IsDown = true;
              if (res != null && res.length > 0) {
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
                this.InputParam = {
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
                  MinimumPosting: this.MinimumPosting,
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
  DoUnConfirm(alert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.ContractMinutesID,
      this.InputParam.RegionCode,
      this.InputParam.ModuleCode,
      0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      null,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        if (alert) {
          this.ShowMessageBoxWithOkBtn('عدم تایید صورتجلسه تحویل زمین با موفقیت انجام شد');
        }
        this.ReadyToConfirm = 0;
        this.btnConfirmName = 'تایید';
        this.btnConfirmIcon = 'ok';
        resolve(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }
}
