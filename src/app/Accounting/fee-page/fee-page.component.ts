import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { AccountingService } from 'src/app/Services/AccountingService/AccountingService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
import { ActivatedRoute } from '@angular/router';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-fee-page',
  templateUrl: './fee-page.component.html',
  styleUrls: ['./fee-page.component.css']
})
export class FeePageComponent implements OnInit {
  @ViewChild('IsReadyToConfirm') IsReadyToConfirm: TemplateRef<any>;
  ModuleCode;
  SumDeductionAmount = 0;
  SumPaymentAmount = 0;
  FeePaymentColDef;
  FeeDeductionColDef;
  rowDataP: any = [];
  rowDataD: any = [];
  FeeID = -1;
  RegionCode = 0;
  FinYearCode;
  FeeCode;
  FeeDate;
  PersianFeeDate;
  ActorName;
  Note;
  Subject;
  @Input() InputParam;

  HaveHeader: boolean;
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };

  BtnClickedName;
  IsDown = false;
  WorkFlowID = null;
  WorkflowObjectCode;
  ModuleViewTypeCode;
  WorkflowTypeCode;
  WorkflowTypeName;
  CartableUserID;
  type;
  ParamObj;

  ObjectNo: string;
  ObjectID: any;
  IsEndFlow: any;
  WorkFlowTransitionID;

  PercentWidth;
  OverMainMinwidthPixel;
  MainMaxwidthPixel;
  HeightPercentWithMaxBtn;
  MinHeightPixel;

  ReadyToConfirm = null;
  btnConfirmIcon;
  btnConfirmName;
  DisplayControlls = true;
  IsRegiondisable = false;
  CurrWorkFlow: any;
  MinimumPosting: any;
  PixelWidth: number;
  isClicked: boolean;

  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: this.IsRegiondisable
  };
  constructor(private MyAccountingService: AccountingService,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService,
    private RegionList: RegionListService,
    private route: ActivatedRoute,
    private CommonService: CommonServices,
    private http: BaseHttpClient,
    private Report: ReportService) {

    this.route.params.subscribe(params => {
      this.ModuleCode = + params['ModuleCode'];
    });
    this.FeePaymentColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'تعهد بودجه',
        field: 'UnderTakeStr',
        width: 130,
        resizable: true
      },
      {
        headerName: 'محله هزینه',
        field: 'UnitTopicStr',
        width: 110,
        resizable: true
      },
      {
        headerName: 'ردیف تعهد بودجه',
        field: 'BgtTopicStr',
        width: 140,
        resizable: true
      },
      {
        headerName: 'نقد/غیر نقد',
        field: 'IsCash',
        width: 90,
        resizable: true
      },
      {
        headerName: 'نوع پرداخت',
        field: 'PaymentTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'PaymentAmount',
        width: 110,
        resizable: true
      },
      {
        headerName: 'شرح پرداخت',
        field: 'Note',
        width: 240,
        resizable: true
      },
    ];
  }
  ngOnInit() {
    if (this.InputParam) {
      this.onDisplay();
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsEndFlow = this.CurrWorkFlow.IsEnd === 1;
      this.FeeID = this.InputParam.CurrWorkFlow.ObjectID;
      this.MinimumPosting = this.CurrWorkFlow.MinimumPosting ? this.CurrWorkFlow.MinimumPosting : '';
      this.ReadyToConfirm = this.CurrWorkFlow.ReadyToConfirm;
      this.ObjectNo = this.CurrWorkFlow.ObjectNo;
      this.ObjectID = this.CurrWorkFlow.ObjectID;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.ModuleCode = 39;
    }
    this.RegionList.GetRegionList(this.ModuleCode, true).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = this.CurrWorkFlow.RegionCode;
    });

    // this.FeeID = this.InputParam.FeeID;
    this.MyAccountingService.GetFeePaymentByFee(this.FeeID).subscribe(res => {
      this.rowDataP = res;
      this.rowDataP.forEach(element => {
        this.SumPaymentAmount += element.PaymentAmount;
      });
      console.log(res);
      console.log(this.SumPaymentAmount);
    });

    this.MyAccountingService.GetFeeDeductionByFee(this.FeeID).subscribe(res => {
      this.rowDataD = res;
      this.rowDataD.forEach(element => {
        this.SumDeductionAmount += element.DeductionAmount;
      });
      console.log(this.SumDeductionAmount);
    });

    this.MyAccountingService.GetFeeByFeeId(this.FeeID).subscribe(res => {
      this.RegionCode = res[0].RegionCode;
      this.FinYearCode = res[0].FinYearCode;
      this.FeeCode = res[0].FeeCode;
      this.FeeDate = res[0].ShortFeeDate;
      this.PersianFeeDate = res[0].PersianFeeDate;
      this.ActorName = res[0].ActorName;
      this.Note = res[0].Note;
      this.Subject = res[0].Subject;
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.FeeDeductionColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'چاپ چک',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsReadyToConfirm
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
      },
      {
        headerName: 'نوع کسر',
        field: 'DeductionTypeName',
        width: 90,
        resizable: true
      },
      {
        headerName: 'گیرنده',
        field: 'ActorName',
        width: 110,
        resizable: true
      },
      {
        headerName: 'بانک گیرنده',
        field: 'CorporateName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'شماره حساب',
        field: 'ActorAccNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره شبا',
        field: 'ShebaNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره چک',
        field: 'ChequeNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ چک',
        field: 'PersianChequeDate',
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'DeductionAmount',
        width: 110,
        resizable: true
      },
      {
        headerName: 'نحوه پرداخت',
        field: 'PayType',
        width: 100,
        resizable: true
      },
      {
        headerName: 'بابت',
        field: 'Subject',
        width: 220,
        resizable: true
      },
      {
        headerName: 'تاریخ تحویل چک',
        field: 'PersianChequeDeliverDate',
        width: 110,
        resizable: true
      },
      {
        headerName: 'تاریخ صدور چک',
        field: 'PersianChequeIssueDate',
        width: 110,
        resizable: true
      },

    ];
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

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
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
  ///////////////////////////////////////////////////////////////////
  onDigitalSingClick() {
    this.onConfirmAndSend();
  }
  onConfirmAndSend() {
    this.BtnClickedName = 'ConfirmAndSend';
    this.IsDown = false;
    this.ConfirmAndSend();
  }
  ConfirmAndSend() {
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.FeeCode;
        this.ObjectID = this.FeeID;
        this.Cartable.GetUserWorkFlow(this.CurrWorkFlow.WorkflowID, 1)
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
                  this.ParamObj = {
                    Message: 'ارسال',
                    OperationCode: 1,
                    rows: res,
                    CurrWorkFlow: this.CurrWorkFlow,
                    WorkFlowID: this.CurrWorkFlow.WorkflowID,
                    IsEnd: this.IsEndFlow,
                    ObjectNo: this.ObjectNo,
                    ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                    WorkflowTypeName: this.CurrWorkFlow.WorkflowTypeName,
                    WorkflowTypeCode: this.CurrWorkFlow.WorkflowTypeCode,
                    WorkflowObjectCode: this.CurrWorkFlow.WorkflowObjectCode,
                    ObjectID: this.ObjectID,
                    MinimumPosting: this.MinimumPosting,
                    CartableUserID: this.CurrWorkFlow.CartableUserID
                  };
                  this.isClicked = true;
                }
              } else {
                this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
              }
            }
          );
      } else {
        this.IsDown = true;
      }
    });
  }
  DOConfirm(HasAlert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.CurrWorkFlow.WorkflowID,
      this.FeeID,
      this.RegionParams.selectedObject,
      this.ModuleCode,
      1,
      this.CurrWorkFlow.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      null,
      this.CurrWorkFlow.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
      subscribe(res => {
        if (HasAlert) {
          this.ShowMessageBoxWithOkBtn('تایید چک الکترونیک با موفقیت انجام شد');
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
  ///////////////////////////////////////////////////////////////////
  onUnConfirmAndReturn() {
    this.IsDown = false;
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.FeeCode;
        this.ObjectID = this.FeeID;
        this.Cartable.GetUserWorkFlow(this.CurrWorkFlow.WorkflowID, 2)
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
                this.ParamObj = {
                  Message: 'بازگشت',
                  OperationCode: 2,
                  rows: res,
                  CurrWorkFlow: this.CurrWorkFlow,
                  WorkFlowID: this.CurrWorkFlow.WorkflowID,
                  IsEnd: this.IsEndFlow,
                  ObjectNo: this.ObjectNo,
                  WorkflowTypeName: this.CurrWorkFlow.WorkflowTypeName,
                  WorkflowTypeCode: this.CurrWorkFlow.WorkflowTypeCode,
                  WorkflowObjectCode: this.CurrWorkFlow.WorkflowObjectCode,
                  MinimumPosting: this.MinimumPosting,
                  ObjectID: this.ObjectID,
                  CartableUserID: this.CurrWorkFlow.CartableUserID
                };
                this.isClicked = true;
              } else {
                this.OverMainMinwidthPixel = null;
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
    this.Cartable.UserUpdateWorkFlow(this.CurrWorkFlow.WorkflowID,
      this.FeeID,
      this.RegionParams.selectedObject,
      this.ModuleCode,
      0,
      this.CurrWorkFlow.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      null,
      this.CurrWorkFlow.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        if (alert) {
          this.ShowMessageBoxWithOkBtn('عدم تایید چک الکترونیک موفقیت انجام شد');
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
  OnClickPrintFlow() {
    this.Report.ShowReport(null,
      null,
      this.FeeID,
      this.FeeCode,
      null,
      this.FeeDate,
      this.Subject,
      this.ActorName,
      null,
      null,
      this.ModuleCode,
      this.RegionCode,
    );
  }
  ///////////////////////////////////////////////////////////////////
  popupclosed(ActionResult) {
    this.type = null;
    this.isClicked = false;
  }
  RowClick(row) {
    this.IsDown = false;
    this.MyAccountingService.GetElChequeInfo(
      this.FeeID,
      row.ChequeNo
      ).subscribe(PDFRes => {
        this.IsDown = true;
        this.type = 'pdf-viewer';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 0;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = 1295;
        this.MainMaxwidthPixel = 1300;
        this.ParamObj = {
          HeaderName: 'چک',
          PDFSrc: PDFRes.FileBase64,
          FileName: PDFRes.FileName,
          ChequeNo: row.ChequeNo,
          // HaveEstimate: this.HasEstimate,
          HaveSign: true,
          RegionCode: this.RegionCode,
          PDFSignersInfo: PDFRes.PDFSignersInfo,
          IsFinal: true, // نهایی
          HasDelBtn: false,
          IsArticle18: false
        };
      });
  }
}
