import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { forkJoin, of } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { isUndefined } from 'util';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-cumulative-contract-pay-details',
  templateUrl: './cumulative-contract-pay-details.component.html',
  styleUrls: ['./cumulative-contract-pay-details.component.css']
})
export class CumulativeContractPayDetailsComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  MessageBoxResult = false;
  columnDef1;
  defaultColDef1;
  rowData1: any;
  columnDef2;
  defaultColDef2;
  selectedContractID = -1;
  rowData2: any;
  btnclicked = false;
  ContractDetails;
  ContractPayStartDate;
  ContractPayEndDate;
  ContractPayDate;
  ContractSubLetter;
  ContractPayNo;
  ContractOperationName;
  ContractPayTechnicalCode;
  IsDisable;
  IsFinYearDisable = false;
  FinYearSet = [];
  ContractPayTypeSet = [];
  Note;
  gridApi;
  ContractPayItemList = [];
  type;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ChangeDetection = false;
  ProductIDs = [];
  ContractOperationId;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  Excel_Header_Param: { colDef2: any };
  ParamObj;
  HaveSave = false;
  HaveDelete = false;
  EditModeInit = false;
  ArchiveBtnText;
  GridBoxHeight = 77;
  HaveLoadExcel = true;
  IsEditable = true;
  dgCPHeight = 92;
  btnConfirmName;
  btnConfirmIcon;
  ReadyToConfirm;
  HaveConfirm = false;
  ConfirmStatus = [];
  IsEndFlow;
  BtnClickedName;
  WorkFlowID;
  WorkflowTypeName;
  WorkflowTypeCode;
  WorkflowObjectCode;
  ObjectNo;
  ObjectID;
  RegionCode;
  ContractPayID;
  CostFactorID;
  ContractTypeCode;
  IsDown = false;
  MinusCoef = 1;
  ContractPayAmount = 0;
  ContractPayTaxValue = 0;
  CartableUserID: any;
  CurrWorkFlow: any;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractPayTypeParams = {
    bindLabelProp: 'ContractPayTypeName',
    bindValueProp: 'ContractPayTypeCode',
    placeholder: '',
    MinWidth: '120px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  constructor(private router: Router,
    private contractpaydetail: ContractPayDetailsService,
    private FinYear: FinYearService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private Cartable: CartableServices,
    private p: JalaliDatepickerComponent,
    private RefreshCartable: RefreshServices
  ) {
  }

  ngOnInit() {
    this.CostFactorID = this.PopupParam.SelectedCPCostFactorID;
    this.ContractTypeCode = this.PopupParam.ContractTypeCode;
    this.contractpaydetail.GetSumContractCoef(this.PopupParam.SelectedContractID).subscribe(
      res => {
        if (res) {
          this.MinusCoef = res;
        }
      }
    );

    if (this.PopupParam.IsViewable) {
      this.HaveSave = false;
      this.HaveDelete = false;
      this.dgCPHeight = 92;
      this.HaveLoadExcel = false;
      this.IsEditable = false;
      this.HaveConfirm = false;
      this.ArchiveBtnText = 'مشاهده مستندات فنی';

    } else {
      this.IsEditable = !(this.ContractTypeCode === 27);
      this.ArchiveList.HasArchiveAccess(2516).subscribe(res => {
        this.ArchiveBtnText = res ? 'مستندات فنی' : 'مشاهده مستندات فنی';
      });
    }

    this.ColumnDefinition();

    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeNgInit();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeNgInit();
      return;
    }
  }

  ColumnDefinition() {

    if (this.ContractTypeCode !== 27 && this.ContractTypeCode !== 28) {
      this.columnDef1 = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'نام فعالیت',
          field: 'ProductName',
          width: 250,
          resizable: true,
          editable: true,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: of([]),
            bindLabelProp: 'ProductName',
            bindValueProp: 'ProductID'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ProductName;

            } else {
              return '';
            }
          },
        },
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 100,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'تعداد برآورد',
          field: 'Qty',
          width: 100,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد ',
          field: 'Amount',
          HaveThousand: true,
          width: 150,
          resizable: true,
        },
        {
          headerName: 'مبلغ ناخالص',
          field: 'FinalAmount',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ برآورد',
          field: 'AmountCOEF',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'تعداد قبلی',
          field: 'BeforeQty',
          width: 100,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ قبلی ناخالص',
          field: 'BeforeAmount',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ قبلی با ضرایب',
          field: 'BeforeAmountCOEF',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'تعداد فعلی',
          field: 'ContractPayItemQty',
          width: 150,
          resizable: true,
          editable: true,
          HaveThousand: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'مبلغ فعلی  ناخالص',
          field: 'ContractPayItemAmount',
          width: 150,
          resizable: true,
          editable: true,
          HaveThousand: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'مبلغ فعلی با ضرایب',
          field: 'ContractPayItemAmountCOEF',
          width: 150,
          resizable: true,
          HaveThousand: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'ارزش افزوده',
          field: 'TaxValue',
          width: 150,
          resizable: true,
          editable: true,
          HaveThousand: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'درصد پیشرفت',
          field: 'ProgressPercent',
          width: 100,
          resizable: true,
          editable: true,
          HaveThousand: false,
          cellEditorFramework: NumberInputComponentComponent,
          cellEditorParams: { IsFloat: true, MaxLength: 4, FloatMaxLength: 2 },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'مبلغ کسر کار',
          field: 'DeductionAmount',
          width: 100,
          resizable: true,
          HaveThousand: true,
        },
        {
          headerName: 'درصد جریمه',
          field: 'PenaltyPercentage',
          width: 90,
          resizable: true,
          editable: true,
          HaveThousand: false,
          cellEditorFramework: NumberInputComponentComponent,
          cellEditorParams: { IsFloat: true, MaxLength: 4, FloatMaxLength: 2 },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'مبلغ جریمه',
          field: 'PenaltyAmount',
          width: 150,
          resizable: true,
          editable: false,
          HaveThousand: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'مبلغ تجمیعی نا خالص',
          field: 'CumultiveAmount',
          width: 150,
          HaveThousand: true,
          resizable: true,
        },
        {
          headerName: 'مبلغ تجمیعی با ضرایب',
          field: 'CumultiveAmountCOEF',
          width: 150,
          HaveThousand: true,
          resizable: true,
        }
      ];
    }

    if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
      this.columnDef1 = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'نام فعالیت',
          field: 'ProductName',
          width: 250,
          resizable: true,
          editable: true,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: of([]),
            bindLabelProp: 'ProductName',
            bindValueProp: 'ProductID'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ProductName;

            } else {
              return '';
            }
          },
        },
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 100,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'وزن',
          field: 'Weight',
          width: 100,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ برآورد',
          field: 'FinalAmount',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'درصد پیشرفت',
          field: 'ProgressPercent',
          width: 150,
          resizable: true,
          editable: true,
          HaveThousand: true,
          cellEditorFramework: NumberInputComponentComponent,
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value;
            } else {
              return '';
            }
          },
        },
      ];
    }
  }

  InsertModeNgInit() {
    this.HaveConfirm = false;

    this.User.GetModulOPByUser(2769).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
          case 16:
            this.HaveSave = true;
            break;
          case 6:
            this.HaveDelete = true;
            break;

          default:
            break;
        }

      });
    });

    forkJoin([
      this.contractpaydetail.GetContractDetails(this.PopupParam.SelectedContractID),
      this.contractpaydetail.GetMaxContractPayNo(this.PopupParam.SelectedCostFactorID),
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
      this.Note = this.ContractSubLetter;
      this.ContractPayNo = res[1];
      this.ContractPayTechnicalCode = this.ContractDetails.ContractCode * 10000 + res[1];
      this.ContractPayStartDate = this.ContractDetails.FromContractDateString;
      this.ContractPayEndDate = this.ContractDetails.ToContractDateString;

      this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
        this.ContractPayNo,
        '',
        null,
        0,
        true,
        this.ContractOperationId)
        .subscribe(
          ress => {
            this.ContractPayDate = ress[0].ContractPayDate;
            ress.forEach(item => {
              item.ContractPayItemAmount = item.Amount * item.Qty;
              item.ContractPayItemAmountCOEF = item.Amount * item.Qty * this.MinusCoef;

              const ProgressPercent = item.ProgressPercent ? item.ProgressPercent : 0;
              const PenaltyPercentage = item.PenaltyPercentage ? item.PenaltyPercentage : 0;
              // tslint:disable-next-line:radix
              item.DeductionAmount = (1 - parseInt(ProgressPercent) / 100) * item.ContractPayItemAmount;
              // tslint:disable-next-line:radix
              item.PenaltyAmount = item.DeductionAmount * (parseInt(PenaltyPercentage) / 100);
              // tslint:disable-next-line:radix
              item.CumultiveAmount = parseInt(item.ContractPayItemAmount)
                // tslint:disable-next-line:radix
                + parseInt(item.BeforeAmount)
                // tslint:disable-next-line:radix
                - parseInt(item.PenaltyAmount);

              item.CumultiveAmountCOEF = item.CumultiveAmount * this.MinusCoef;

            });
            this.ContractPayItemList = ress;
          }
        );
      this.IsDown = true;
    });
    this.contractpaydetail.GetContractPayType().subscribe(res => {
      this.ContractPayTypeSet = res;
      this.ContractPayTypeParams.selectedObject = res[0].ContractPayTypeCode;
    });
    this.FinYear.GetFinYearList().subscribe(res => {
      this.FinYearSet = res;
      this.FinYearParams.selectedObject = res[0].FinYearCode;
    });
    this.contractpaydetail.GetContractOperationName(this.PopupParam.ContractOperationID).subscribe(res => {
      this.ContractOperationName = res;
    });
  }

  EditModeNgInit() {
    this.EditModeInit = true;
    this.IsFinYearDisable = true;

    if (!this.PopupParam.IsViewable) {// مشاهده صورت وضعیت نبود
      this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
      this.WorkFlowID = this.PopupParam.WorkFlowID;
      this.RegionCode = this.PopupParam.RegionCode;
      this.ReadyToConfirm = this.PopupParam.ReadyToConfirm;
      if (this.WorkFlowID) {
        this.IsEndFlow = this.PopupParam.IsEnd === 1;
        this.WorkflowTypeName = this.PopupParam.WorkflowTypeName;
        this.WorkflowTypeCode = this.PopupParam.WorkflowTypeCode;
        this.WorkflowObjectCode = this.PopupParam.WorkflowObjectCode;
        this.ObjectNo = this.PopupParam.ObjectNo;
        this.ObjectID = this.PopupParam.ObjectID;
        this.CartableUserID = this.PopupParam.CartableUserID;
      }

      this.User.GetModulOPByUser(2769).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
            case 16:
              this.HaveSave = true;
              break;
            case 6:
              this.HaveDelete = true;
              break;

            case 21:
              this.ConfirmStatus.push(21);
              if (!this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
                this.btnConfirmName = 'تایید';
                this.btnConfirmIcon = 'ok';
                this.HaveConfirm = true;
              }
              break;

            case 22:
              this.ConfirmStatus.push(22);
              if (!this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
                this.btnConfirmName = 'عدم تایید';
                this.btnConfirmIcon = 'cancel';
                this.HaveConfirm = true;
              }
              break;

            case 28:
              this.ConfirmStatus.push(28);
              if (this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
                this.btnConfirmName = 'بازگشت از تایید نهایی';
                this.btnConfirmIcon = 'cancel';
                this.HaveConfirm = true;
              }
              break;

            case 27:
              this.ConfirmStatus.push(27);
              if (this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
                this.btnConfirmName = 'تایید نهایی';
                this.btnConfirmIcon = 'ok';
                this.HaveConfirm = true;
              }
              break;

            default:
              break;
          }
        });
      });
    }

    this.contractpaydetail.GetContractPay(this.CostFactorID, -1).subscribe(res => {
      this.ContractDetails = res;
      this.ContractPayID = this.ContractDetails.ContractPayId;
      this.ContractSubLetter = this.ContractDetails.ParentObjectStr;
      this.Note = this.ContractDetails.Note;
      this.ContractPayNo = this.ContractDetails.ContractPayNo;
      this.ContractPayTechnicalCode = this.ContractDetails.ContractPayTechnicalCode;
      this.ContractPayStartDate = this.ContractDetails.ShortStartDate;
      this.ContractPayEndDate = this.ContractDetails.ShortEndDate;
      this.ContractPayDate = this.ContractDetails.ShortContractPayDate;
      this.FinYearParams.selectedObject = this.ContractDetails.FinYearCode;
      this.ContractPayTypeParams.selectedObject = this.ContractDetails.ContractPayTypeCode;
      this.ContractOperationId = this.ContractDetails.ContractOperationId;
      this.ContractPayItemList = res.ContractPayItemViewList;
      this.ContractPayItemList.forEach(item => {
        // tslint:disable-next-line:radix
        item.DeductionAmount = (1 - (parseInt(item.ProgressPercent) / 100)) * item.ContractPayItemAmount;
        // tslint:disable-next-line:radix
        item.CumultiveAmount = parseInt(item.BeforeAmount) + parseInt(item.ContractPayItemAmount) - parseInt(item.PenaltyAmount);
        // tslint:disable-next-line:max-line-length
        item.CumultiveAmountCOEF = (item.BeforeAmount + item.ContractPayItemAmount - item.PenaltyAmount) * this.MinusCoef;

        this.ContractPayAmount += item.ContractPayItemAmount;
        this.ContractPayTaxValue += item.TaxValue;
      });


      this.IsDown = true;

      this.contractpaydetail.GetContractPayType().subscribe(ress => {
        this.ContractPayTypeSet = ress;
      });

      this.contractpaydetail.GetContractOperationName(this.ContractOperationId).subscribe(res1 => {
        this.ContractOperationName = res1;
      });

      this.FinYear.GetFinYearList().subscribe(res2 => {
        this.FinYearSet = res2;
      });
    });
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات صورت وضعیت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  onChangeFinYearObj(newObj) {
    this.FinYearParams.selectedObject = newObj;
  }

  OnContractPayDateChange(ADate) {

    if (!this.EditModeInit) {
      this.ContractPayDate = ADate.MDate;
      this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
        this.ContractPayNo,
        ADate.MDate,
        null,
        0,
        true,
        this.ContractOperationId)
        .subscribe(
          ress => {
            this.ContractPayItemList = ress;
            this.ContractPayItemList.forEach(item => {
              item.ContractPayItemAmount = item.Amount * item.Qty;
              item.ContractPayItemAmountCOEF = item.Amount * item.Qty * this.MinusCoef;

              const ProgressPercent = item.ProgressPercent ? item.ProgressPercent : 0;
              const PenaltyPercentage = item.PenaltyPercentage ? item.PenaltyPercentage : 0;
              // tslint:disable-next-line:radix
              item.DeductionAmount = (1 - parseInt(ProgressPercent) / 100) * item.ContractPayItemAmount;
              // tslint:disable-next-line:radix
              item.PenaltyAmount = item.DeductionAmount * (parseInt(PenaltyPercentage) / 100);
              // tslint:disable-next-line:radix
              item.CumultiveAmount = item.ContractPayItemAmount
                + item.BeforeAmount
                - item.PenaltyAmount;

              item.CumultiveAmountCOEF = item.CumultiveAmount * this.MinusCoef;
            });
          }
        );
    }

    this.EditModeInit = false;
  }

  OnContractPayStartDateChange(Date) {
    this.ContractPayStartDate = Date.MDate;
  }

  OnContractPayEndDateChange(Date) {
    this.ContractPayEndDate = Date.MDate;
  }

  onChangeContractPayTypeObj(newObj) {
    this.ContractPayTypeParams.selectedObject = newObj;
  }

  onSave() {
    this.gridApi.stopEditing();
    if (!this.FinYearParams.selectedObject || this.FinYearParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('سال مالی نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayTechnicalCode || this.ContractPayTechnicalCode == null) {
      this.ShowMessageBoxWithOkBtn('شماره صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayTypeParams.selectedObject || this.ContractPayTypeParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('نوع صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayStartDate || this.ContractPayStartDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ ابتدای دوره صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayEndDate || this.ContractPayEndDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ پایان دوره صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayDate || this.ContractPayDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ صورت وضعیت نمی تواند خالی باشد');
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

  RowClick(event) {

    this.ProductIDs = [];
    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }
    });

    this.columnDef1[1].cellEditorParams.Items = this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
      this.ContractPayNo,
      this.ContractPayDate,
      this.ProductIDs,
      0,
      false,
      this.ContractOperationId);
  }

  onCellValueChanged(event) {
    this.ChangeDetection = true;
    const value = event.newValue;
    let itemsToUpdate = [];

    if (event.colDef && event.colDef.field === 'ContractPayItemAmount') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:radix
          node.data.ContractPayItemAmountCOEF = parseInt(node.data.ContractPayItemAmount) * this.MinusCoef;
          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          // tslint:disable-next-line:radix
          node.data.DeductionAmount = (1 - parseInt(ProgressPercent) / 100) * node.data.ContractPayItemAmount;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = node.data.DeductionAmount * (parseInt(PenaltyPercentage) / 100);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmount = parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount) -
            // tslint:disable-next-line:radix
            parseInt(node.data.PenaltyAmount);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmountCOEF = (parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount) -
            // tslint:disable-next-line:radix
            parseInt(node.data.PenaltyAmount)) * this.MinusCoef;

          if (node.data.IsTaxValue) {
            node.data.TaxValue = node.data.ContractPayItemAmount * 0.09;
          } else {
            node.data.TaxValue = 0;
          }

          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'ProductName') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.ProductID = event.newValue.ProductID;
          node.data.ProductName = event.newValue.ProductName;
          node.data.ScaleName = event.newValue.ScaleName;
          node.data.PersianStartDate = event.newValue.PersianStartDate;
          node.data.PersianEndDate = event.newValue.PersianEndDate;
          node.data.ShortStartDate = event.newValue.ShortStartDate;
          node.data.ShortEndDate = event.newValue.ShortEndDate;
          node.data.Qty = event.newValue.Qty;
          node.data.BeforeQty = event.newValue.BeforeQty;
          node.data.Amount = event.newValue.Amount;
          node.data.FinalAmount = event.newValue.FinalAmount;
          node.data.AmountCOEF = node.data.FinalAmount * this.MinusCoef;
          node.data.BeforeAmount = event.newValue.BeforeAmount;
          node.data.BeforeAmountCOEF = node.data.BeforeAmount * this.MinusCoef;
          node.data.IsTaxValue = event.newValue.IsTaxValue;
          // node.data.CumultiveAmount = event.newValue.BeforeAmount;
          node.data.ContractPayItemAmount = node.data.FinalAmount;
          node.data.ContractPayItemAmountCOEF = node.data.FinalAmount * this.MinusCoef;

          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          // tslint:disable-next-line:radix
          node.data.DeductionAmount = (1 - parseInt(ProgressPercent) / 100) * node.data.ContractPayItemAmount;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = node.data.DeductionAmount * (parseInt(PenaltyPercentage) / 100);
          node.data.CumultiveAmount = node.data.ContractPayItemAmount + node.data.BeforeAmount - node.data.PenaltyAmount;
          node.data.CumultiveAmountCOEF = node.data.CumultiveAmount * this.MinusCoef;




          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'PenaltyPercentage') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          // tslint:disable-next-line:radix
          node.data.DeductionAmount = (1 - parseInt(ProgressPercent) / 100) * node.data.ContractPayItemAmount;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = (parseInt(PenaltyPercentage) / 100) * parseInt(node.data.DeductionAmount);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmount = parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount) -
            // tslint:disable-next-line:radix
            parseInt(node.data.PenaltyAmount);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmountCOEF = parseInt(node.data.CumultiveAmount) * this.MinusCoef;

          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'ProgressPercent') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          const ProgressPercent = node.data.ProgressPercent ? node.data.ProgressPercent : 0;
          const PenaltyPercentage = node.data.PenaltyPercentage ? node.data.PenaltyPercentage : 0;
          // tslint:disable-next-line:radix
          node.data.DeductionAmount = (1 - parseInt(ProgressPercent) / 100) * node.data.ContractPayItemAmount;
          // tslint:disable-next-line:radix
          node.data.PenaltyAmount = (parseInt(PenaltyPercentage) / 100) * parseInt(node.data.DeductionAmount);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmount = parseInt(node.data.BeforeAmount) +
            // tslint:disable-next-line:radix
            parseInt(node.data.ContractPayItemAmount) -
            // tslint:disable-next-line:radix
            parseInt(node.data.PenaltyAmount);

          // tslint:disable-next-line:radix
          node.data.CumultiveAmountCOEF = parseInt(node.data.CumultiveAmount) * this.MinusCoef;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  onContractPayItemGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {

    if (this.BtnClickedName === 'BtnConfirm' && ActionResult === 'YES') {
      this.DOConfirm();
    }

    if (this.BtnClickedName !== 'BtnConfirm' && ActionResult === 'YES') {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  popupclosed() {
    this.btnclicked = false;
  }

  SaveContractPay() {
    const ContractPayItemList = [];
    let SumContractPayItemAmount = 0;
    this.gridApi.forEachNode(node => {
      const obj = {
        ContractPayItemID: -1,
        CostFactorID: -1,
        ItemNo: node.data.ItemNo,
        ProductID: node.data.ProductID,
        StartDate: node.data.ShortStartDate,
        EndDate: node.data.ShortEndDate,
        ContractPayItemAmount: node.data.ContractPayItemAmount,
        TaxValue: node.data.TaxValue,
        Qty: node.data.ContractPayItemQty,
        ProgressPercent: node.data.ProgressPercent,
        PenaltyPercentage: node.data.PenaltyPercentage,
        PenaltyAmount: node.data.PenaltyAmount
      };
      // tslint:disable-next-line:radix
      SumContractPayItemAmount += parseInt(node.data.ContractPayItemAmount);
      ContractPayItemList.push(obj);
    });

    const ContractPayObj = {
      ContractPayId: -1,
      CostFactorId: -1,
      CostContractId: this.PopupParam.SelectedCostFactorID,
      FinYearCode: this.FinYearParams.selectedObject,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.ContractPayTypeParams.selectedObject,
      Note: this.Note,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractOperationId: 3,
      IsConfirm: 2,
    };

    if (this.ContractTypeCode !== 27 && this.ContractTypeCode !== 28 && !SumContractPayItemAmount || SumContractPayItemAmount === 0) {
      this.ShowMessageBoxWithOkBtn('جمع مبلغ فعلی نمی تواند صفر باشد');
      return;
    }

    this.contractpaydetail.SaveContractPay(
      ContractPayObj,
      ContractPayItemList,
      null,
      false,
      false,
      false,
      2769,
      null
    ).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
      this.PopupParam.Mode = 'EditMode';
      this.PopupParam.SelectedCPCostFactorID = res;
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        this.ChangeDetection = true;
      }
    );
  }

  UpdateContractPay() {
    const ContractPayItemList = [];
    let SumContractPayItemAmount = 0;

    this.gridApi.forEachNode(node => {

      let ContractPayItemID;
      let CostFactorID;

      if (node.data.ContractPayItemID) {
        ContractPayItemID = node.data.ContractPayItemID;
      }

      if (this.CostFactorID && this.CostFactorID !== -1) {
        CostFactorID = this.CostFactorID;
      }

      const obj = {
        ContractPayItemID: ContractPayItemID,
        CostFactorID: CostFactorID,
        ItemNo: node.data.ItemNo,
        ProductID: node.data.ProductID,
        StartDate: node.data.ShortStartDate,
        EndDate: node.data.ShortEndDate,
        ContractPayItemAmount: node.data.ContractPayItemAmount,
        TaxValue: node.data.TaxValue,
        Qty: node.data.ContractPayItemQty,
        ProgressPercent: node.data.ProgressPercent,
        PenaltyPercentage: node.data.PenaltyPercentage,
        PenaltyAmount: node.data.PenaltyAmount
      };
      // tslint:disable-next-line:radix
      SumContractPayItemAmount += parseInt(node.data.ContractPayItemAmount);
      ContractPayItemList.push(obj);
    });

    const ContractPayObj = {
      ContractPayId: this.ContractDetails.ContractPayId,
      CostFactorId: this.CostFactorID,
      CostContractId: this.PopupParam.SelectedCostFactorID,
      FinYearCode: this.FinYearParams.selectedObject,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.ContractPayTypeParams.selectedObject,
      Note: this.Note,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractOperationId: 3,
      IsConfirm: 2,
    };

    if (this.ContractTypeCode !== 27 && this.ContractTypeCode !== 28 && !SumContractPayItemAmount || SumContractPayItemAmount === 0) {
      this.ShowMessageBoxWithOkBtn('جمع مبلغ فعلی نمی تواند صفر باشد');
      return;
    }

    this.contractpaydetail.UpdateContractPay(
      ContractPayObj,
      ContractPayItemList,
      -1,
      2769,
      false,
      false,
      null,
      false, 
      null
    ).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        this.ChangeDetection = true;
      }
    );
  }

  BtnArchiveClick() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 315;
    this.startTopPosition = 44;
    const archiveParam = {
      EntityID: this.ContractDetails.ContractPayId,
      TypeCodeStr: '3-',
      DocTypeCode: 3,
      ModuleCode: 2769,
      IsReadOnly: this.PopupParam.IsViewable
    };
    this.ParamObj = archiveParam;
  }

  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات صورت وضعیت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.CostFactorID,
          this.RegionCode,
          2769,
          0,
          this.WorkflowObjectCode,
          null,
          null,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
          .subscribe(res => {
            this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
            if (this.ConfirmStatus.includes(21)) {
              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            } else {
              this.HaveConfirm = false;
            }
          },
            err => {
              const str = err.error.split('|');
              if (str[1]) {
                this.ShowMessageBoxWithOkBtn(str[1]);
              } else {
                this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
              }
            }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }

  DOConfirm() {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CostFactorID,
      this.RegionCode,
      2769,
      1,
      this.WorkflowObjectCode,
      null,
      null,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.RefreshCartable.RefreshCartable();
        if (this.ConfirmStatus.includes(22)) {
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
        } else {
          this.HaveConfirm = false;
        }
      },
        err => {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
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
        if (this.ConfirmStatus.includes(27) || this.ConfirmStatus.includes(28)) {
          if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تایید نهایی';
            this.btnConfirmIcon = 'ok';
          } else {
            this.ReadyToConfirm = 1;
            this.btnConfirmName = 'بازگشت از تایید نهایی';
            this.btnConfirmIcon = 'cancel';
          }
        } else {
          this.HaveConfirm = false;
        }
      },
        err => {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  // ngOnChanges(changes: SimpleChanges): void {
  // }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {

    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.GridBoxHeight = changes.PopupMaximized.currentValue ? 79 : 77;
    }
  }
}
