import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { forkJoin, of } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ContractMinutesService } from 'src/app/Services/ContractService/ContractMinutes/ContractMinutesService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractEstimateService } from 'src/app/Services/ContractService/ContractEstimates/ContractEstimateService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contract-pay-item-hour',
  templateUrl: './contract-pay-item-hour.component.html',
  styleUrls: ['./contract-pay-item-hour.component.css']
})
export class ContractPayItemHourComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Input() ModuleCode;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  MessageBoxResult = false;
  columnDef1;
  defaultColDef1;
  ContractPayItemEstimateList: any;
  columnDef2;
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
  ContractOperationName;
  ContractPayTechnicalCode;
  IsFinYearDisable = false;
  FinYearSet = [];
  ContractPayTypeSet = [];
  Note;
  gridApi;
  dgEstiateApi;
  ContractPayItemList = [];
  type;
  HaveHeader: boolean;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  ChangeDetection = false;
  ProductIDs = [];
  SelectedProductID;
  ContractOperationId;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  Excel_Header_Param: { colDef2: any };
  paramObj;
  HaveSave = false;
  HaveDelete = false;
  EditModeInit = false;
  IsDisable = true;
  HaveWorkFlow = false;
  ArchiveBtnText;
  DetailArchiveBtnText;
  beforeProductID;
  ContractAgent;
  ContractAgentSet = [];
  IsEditable = true;
  dgCPHeight = 91;
  dgCPEHeight = 91;
  // btnConfirmName;
  // btnConfirmIcon;
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
  SelectedContractPayItemListID;
  PriceListTypeCode;
  CostListFinYearCode;
  PriceListPatternID;
  CostFactorID;
  CostContractID;
  HaveMaxBtn = false;
  selectedRow: any;
  SelectedProductName;
  SelectedContractPayItemID;
  IsDown = false;
  PersonIDs = [];
  HeightPercentWithMaxBtn: number;
  HaveID = true;
  DisplayControlls = true;
  CartableUserID: any;
  CurrWorkFlow: any;
  // RFC 52262
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
  btnConfirmAndReturnName = 'عدم تاييد و بازکشت';
  IsDisableWorkflow = true;
  btnConfirmName = 'تایید';
  btnConfirmIcon = 'ok';
  ShowWorkflowButtons = true;
  ISSendAndConfirm = true;
  ISDisabledConfirmAndReturnBtn = true;
  CheckRegionWritable = true;
  HaveAlertToFinance = false;
  IsAdmin;
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
  CanDateChange = false;
  constructor(private router: Router,
    private contractpaydetail: ContractPayDetailsService,
    private FinYear: FinYearService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private PriceList: PriceListService,
    private Cartable: CartableServices,
    private ContractList: ContractListService,
    private contractMinutes: ContractMinutesService,
    private ContractStima: ContractEstimateService,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService,
    private route: ActivatedRoute,
    private CommonService: CommonServices,
    private Report: ReportService,
    private ProductRequest: ProductRequestService,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {

    this.CheckRegionWritable = this.PopupParam.IsReadOnly; // RFC 52262
    this.onDisplay();
    this.CostFactorID = this.PopupParam.SelectedCPCostFactorID;
    this.ContractPayItemEstimateList = of([]);
    this.ContractOperationId = this.PopupParam.ContractOperationID;
    if (this.PopupParam.PriceListTypeCode) {
      this.PriceListTypeCode = this.PopupParam.PriceListTypeCode;
      this.CostListFinYearCode = this.PopupParam.CostListFinYearCode;
      this.PriceListPatternID = this.PopupParam.PriceListPatternID;
    } else {
      this.ContractList.GetBalanceFactors(this.selectedContractID).subscribe(res => {
        this.PriceListTypeCode = res[0].PriceListFineYearCode;
        this.CostListFinYearCode = res[0].PriceListTypeCode;
      });
    }
    this.User.CheckAdmin().subscribe(res => {
      this.IsAdmin = res;
    });
    if (this.PopupParam.IsViewable) {
      this.HaveSave = false;
      this.HaveDelete = false;
      this.dgCPHeight = 91;
      this.dgCPEHeight = 91;
      this.IsEditable = false;
      this.HaveConfirm = false;
      this.ArchiveBtnText = 'مشاهده مستندات فنی درخواست پرداخت';
      this.DetailArchiveBtnText = 'مشاهده مستندات فنی متره';
    } else {

      this.ArchiveList.HasArchiveAccess(2516).subscribe(res => {
        this.ArchiveBtnText = res ? 'مستندات فنی درخواست پرداخت' : 'مشاهده مستندات فنی درخواست پرداخت';
        this.DetailArchiveBtnText = res ? 'مستندات فنی متره' : 'مشاهده مستندات فنی متره';
      });
    }

    this.ColumnDefintion();
    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeNgInit();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeNgInit();
      return;
    }
  }

  onDisplay() {
    if (this.PopupParam.ModuleViewTypeCode) {
      switch (this.PopupParam.ModuleViewTypeCode) {
        case 500000: // حالت فقط خواندنی
          this.DisplayControlls = false;
          this.HaveSave = false;
          this.IsEditable = false;
          this.HaveWorkFlow = true;
          break;
        default:
          break;
      }
    }
  }

  ColumnDefintion() {
    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'نام فعالیت',
        field: 'ProductName',
        width: 250,
        resizable: true,
        editable: this.DisplayControlls,
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
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'مبلغ متره برآورد',
        field: 'Amount',
        width: 150,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'مبلغ متره با ضرایب ردیف',
        field: 'AmountCOEF',
        HaveThousand: true,
        width: 150,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'مبلغ کل',
        field: 'AmountCOEFPact',
        HaveThousand: true,
        width: 150,
        resizable: true,
        editable: this.DisplayControlls
      }
    ];

    this.columnDef2 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'نام و نام خانوادگی',
        field: 'PersonName',
        width: 140,
        resizable: true,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'PersonName',
          bindValueProp: 'PersonID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonName;

          } else {
            return '';
          }
        },
        editable: this.DisplayControlls
      },
      {
        headerName: 'تحصیل',
        field: 'EducationYear',
        width: 100,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'تجربه',
        field: 'ExperienceYear',
        resizable: true,
        width: 100,
        editable: this.DisplayControlls
      },
      {
        headerName: 'حق الزحمه ساعتی',
        field: 'Sm',
        width: 120,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'حاصل ضرب ضرایب',
        field: 'K',
        width: 120,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'W1',
        field: 'W1',
        width: 70,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'W2',
        field: 'W2',
        width: 70,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'W3',
        field: 'W3',
        width: 70,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'W4',
        field: 'W4',
        width: 70,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'عادی',
        field: 'NormalWorkHour',
        width: 70,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'اضافه کاری',
        field: 'ExtraWorkHour',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'شب کاری',
        field: 'NightWorkHour',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'تعطیل کاری',
        field: 'VacationWorkHour',
        width: 150,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls
      },
      {
        headerName: 'حق الزحمه ماهانه',
        field: 'S',
        width: 170,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls
      }
    ];
  }

  InsertModeNgInit() {

    this.CostContractID = this.PopupParam.SelectedCostFactorID;
    this.HaveConfirm = false;
    this.User.GetModulOPByUser(2516).subscribe(res => {

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
      this.contractpaydetail.GetMaxContractPayNo(this.CostContractID),
      this.contractpaydetail.GetContractAgent(),
      this.ProductRequest.GetCurrentDate()
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[2] && res[2][0]) {
        this.ContractAgentSet = res[2];
        if (!this.ContractAgentParams.selectedObject) {
          this.ContractAgentParams.selectedObject = res[2][0].ContractAgentCode;
        }
      }
      this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
      this.Note = this.ContractSubLetter;
      this.ContractPayNo = res[1];
      this.ContractPayTechnicalCode = this.ContractDetails.ContractCode * 10000 + res[1];
      this.ContractPayStartDate = this.ContractDetails.FromContractDateString;
      this.ContractPayEndDate = this.ContractDetails.ToContractDateString;
      this.CanDateChange = false ;
      this.ContractPayDate = res[3];
      // this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
      //   this.ContractPayNo,
      //   '',
      //   null,
      //   1,
      //   true)
      //   .subscribe(
      //     ress => {
      //       if (ress && ress[0]) {
      //         this.ContractPayDate = ress[0].ContractPayDate;
      //         this.ContractPayItemList = ress;
      //       }
      //     }
      //   );
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

    this.contractpaydetail.GetContractOperationName(this.ContractOperationId).subscribe(res => {
      this.ContractOperationName = res;
    });
  }

  EditModeNgInit() {
    this.EditModeInit = true;
    this.IsFinYearDisable = true;
    this.IsDisableWorkflow = !this.PopupParam.IsViewable ? false : true; // RFC 52262
    if (!this.PopupParam.IsViewable) { // مشاهده درخواست پرداخت نباشد
      this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
      this.WorkFlowID = this.PopupParam.WorkFlowID;
      this.RegionCode = this.PopupParam.RegionCode;
      this.ReadyToConfirm = this.PopupParam.ReadyToConfirm;
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
      if (this.WorkFlowID) {
        this.HaveWorkFlow = true;
        this.IsEndFlow = this.PopupParam.IsEnd === 1;
        this.WorkflowTypeName = this.PopupParam.WorkflowTypeName;
        this.WorkflowTypeCode = this.PopupParam.WorkflowTypeCode;
        this.WorkflowObjectCode = this.PopupParam.WorkflowObjectCode;
        this.ObjectNo = this.PopupParam.ObjectNo;
        this.ObjectID = this.PopupParam.ObjectID;
        this.CartableUserID = this.PopupParam.CartableUserID;
      }

      this.User.GetModulOPByUser(2516).subscribe(res => {

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
                this.HaveConfirm = true;
              }
              break;

            case 27:
              this.ConfirmStatus.push(27);
              if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
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

    forkJoin([
      this.contractpaydetail.GetContractAgent(),
      this.contractpaydetail.GetContractPayType(),
      this.FinYear.GetFinYearList()
    ]).subscribe(res => {

      if (res[0] && res[0][0]) {
        this.ContractAgentSet = res[0];
        if (!this.ContractAgentParams.selectedObject) {
          this.ContractAgentParams.selectedObject = res[0][0].ContractAgentCode;
        }
      }

      this.ContractPayTypeSet = res[1];
      this.FinYearSet = res[2];
      this.contractpaydetail.GetContractPay(this.CostFactorID, this.ContractAgentParams.selectedObject).subscribe(ress => {
        this.ContractDetails = ress;
        this.ContractPayID = this.ContractDetails.ContractPayId;
        this.CostContractID = this.ContractDetails.CostContractId;
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
        this.ContractPayItemList = this.ContractDetails.ContractPayItemViewList;
        this.contractpaydetail.GetContractOperationName(this.ContractOperationId).subscribe(rss => {
          this.ContractOperationName = rss;
        });
      });
      this.IsDown = true;
    });
    new Promise((StartedWFResolve, reject) => { this.IsDisableWorkflow = !this.PopupParam.IsViewable ? false : true; // RFC 52262
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  onChangeFinYearObj(newObj) {
    this.FinYearParams.selectedObject = newObj;
  }

  onChangeContractAgentObj(newObj) {
    this.ContractAgentParams.selectedObject = newObj;
  }

  OnContractPayDateChange(ADate) {

    if (ADate.FullDate !== '' &&  !this.EditModeInit) {
      this.ContractPayDate = ADate.MDate;
      if (this.CanDateChange) {
        this.ShowMessageBoxWithYesNoBtn(' آیا می خواهید اقلام درخواست پرداخت نیز تغییر نماید؟');
        this.BtnClickedName = 'IsDateChange';
      } else {
        this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
          this.ContractPayNo,
          ADate.MDate,
          null,
          1,
          true,
          this.ContractOperationId)
          .subscribe(
            ress => {
              ress.forEach(item => {
                item.ContractOrderEstimateList = [];
              });
              this.ContractPayItemList = ress;
            }
          );
      }
    }
    if (ADate.FullDate !== '') {
      this.EditModeInit = false;
    }
    if (this.ModuleCode === 2875) {
      this.CanDateChange = true;
    }
  }

  OnContractPayStartDateChange(Date) {
    this.ContractPayStartDate = Date.MDate;
  }
  DateChangeGetContractOrder() {
    this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
      this.ContractPayNo,
      this.ContractPayDate,
      null,
      1,
      true,
      this.ContractOperationId)
      .subscribe(
        ress => {
          ress.forEach(item => {
            item.ContractOrderEstimateList = [];
          });
          this.ContractPayItemList = ress;
        }
      );
    if (this.ContractPayDate !== '') {
      this.EditModeInit = false;
    }
  }
  OnContractPayEndDateChange(Date) {
    this.ContractPayEndDate = Date.MDate;
  }

  onChangeContractPayTypeObj(newObj) {
    this.ContractPayTypeParams.selectedObject = newObj;
  }

  onSave() {
    this.gridApi.stopEditing();
    this.dgEstiateApi.stopEditing();

    if (!this.ContractAgentParams.selectedObject || this.ContractAgentParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('  عامل قرارداد نمی تواند خالی باشد');
      return;
    }

    if (!this.FinYearParams.selectedObject || this.FinYearParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('سال مالی نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayTechnicalCode || this.ContractPayTechnicalCode == null) {
      this.ShowMessageBoxWithOkBtn('شماره صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayTypeParams.selectedObject || this.ContractPayTypeParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('نوع درخواست پرداخت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayStartDate || this.ContractPayStartDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ ابتدای دوره درخواست پرداخت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayEndDate || this.ContractPayEndDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ پایان دوره درخواست پرداخت نمی تواند خالی باشد');
      return;
    }

    if (!this.ContractPayDate || this.ContractPayDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ درخواست پرداخت نمی تواند خالی باشد');
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

  dgContractPayItemRowClick(event) {
    this.SelectedProductID = event.data.ProductID;
    this.SelectedProductName = event.data.ProductName;
    this.SelectedContractPayItemID = event.data.ContractPayItemID;
    if (this.SelectedContractPayItemID != null) { this.HaveID = false; }
    this.IsDisable = false;
    this.ProductIDs = [];
    const rowData = [];

    this.dgEstiateApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.dgEstiateApi.updateRowData({ remove: rowData });

    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) {
        this.ProductIDs.push(node.data.ProductID);
      }
    });

    this.columnDef1[1].cellEditorParams.Items = this.contractpaydetail
      .GetContractOrder(this.PopupParam.SelectedContractID,
        this.ContractPayNo,
        this.ContractPayDate,
        this.ProductIDs,
        1,
        false,
        this.ContractOperationId);


    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeRowClick(event, rowData);
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeRowClick(event, rowData);
      return;
    }

  }

  dgContractPayItemEstimateRowClick(event) {
    this.selectedRow = event;
    this.PersonIDs = [];


    this.dgEstiateApi.forEachNode(node => {
      if (node.data.PersonID) {
        this.PersonIDs.push(node.data.PersonID);
      }
    });

    this.columnDef2[1].cellEditorParams.Items = this.contractpaydetail
      .GetContractPrsonEstimate(this.PopupParam.SelectedContractID,
        this.ContractPayNo,
        this.ContractPayDate,
        this.ContractPayStartDate,
        this.SelectedProductID,
        this.PersonIDs,
        false);

    this.SelectedContractPayItemListID = event.data.ContractPayItemListID;

  }

  InsertModeRowClick(event, rowData) {
    this.SelectedContractPayItemID = event.data.ContractPayItemID;

    if (!this.beforeProductID) {
      this.ContractPayItemEstimateList = event.data.ContractPersonEstimateList;
    }

    if (this.beforeProductID && this.beforeProductID !== event.data.ProductID) {

      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          item.data.ContractPersonEstimateList = rowData;
        }

        if (item.data.ProductID === event.data.ProductID) {
          this.ContractPayItemEstimateList = item.data.ContractPersonEstimateList;
        }
      });
    }

    if (this.beforeProductID && this.beforeProductID === event.data.ProductID) {
      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          this.dgEstiateApi.updateRowData({ add: rowData });
        }
      });
    }
    this.beforeProductID = event.data.ProductID;
  }

  EditModeRowClick(event, rowData) {
    this.SelectedContractPayItemID = event.data.ContractPayItemID;

    if (!this.beforeProductID) {
      this.ContractPayItemEstimateList = event.data.ContractPersonHourList;
    }

    if (this.beforeProductID && this.beforeProductID !== event.data.ProductID) {
      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          item.data.ContractPersonHourList = rowData;
        }
        if (item.data.ProductID === event.data.ProductID) {
          this.ContractPayItemEstimateList = item.data.ContractPersonHourList;
        }
      });

    }

    if (this.beforeProductID && this.beforeProductID === event.data.ProductID) {
      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          this.dgEstiateApi.updateRowData({ add: rowData });
        }
      });
    }
    this.beforeProductID = event.data.ProductID;

  }

  onCellValueChanged(event) {
    this.ChangeDetection = true;
    const value = event.newValue;
    let itemsToUpdate = [];
    let rowData = [];
    if (event.colDef && event.colDef.field === 'ProductName') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:radix
          node.data.ProductID = event.newValue.ProductID;
          node.data.ProductName = event.newValue.ProductName;
          node.data.PersianStartDate = event.newValue.PersianStartDate;
          node.data.PersianEndDate = event.newValue.PersianEndDate;
          node.data.ShortStartDate = event.newValue.ShortStartDate;
          node.data.ShortEndDate = event.newValue.ShortEndDate;
          node.data.ContractPersonEstimateList = event.newValue.ContractPersonEstimateList;
          rowData = event.newValue.ContractPersonEstimateList;
          this.beforeProductID = event.newValue.ProductID;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      this.dgEstiateApi.updateRowData({ add: rowData });

    }
  }

  onContractPayItemEstimateCellValueChanged(event) {
    const value = event.newValue;
    this.ChangeDetection = true;
    let itemsToUpdate = [];

    // tslint:disable-next-line:max-line-length
    if (event.colDef && event.colDef.field === 'PersonName') {
      itemsToUpdate = [];
      this.dgEstiateApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:radix
          node.data.PersonID = event.newValue.PersonID;
          node.data.PersonName = event.newValue.PersonName;
          node.data.EducationYear = event.newValue.EducationYear;
          node.data.ExperienceYear = event.newValue.ExperienceYear;
          node.data.Sm = event.newValue.Sm;
          node.data.K = event.newValue.K;
          node.data.W1 = event.newValue.W1;
          node.data.W2 = event.newValue.W2;
          node.data.W3 = event.newValue.W3;
          node.data.W4 = event.newValue.W4;
          itemsToUpdate.push(node.data);
        }
      });
      this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
    }
  }

  onContractPayItemGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onContractPayItemEstimateGridReady(params: { api: any; }) {
    this.dgEstiateApi = params.api;
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

    if (this.BtnClickedName === 'BtnConfirm' && ActionResult === 'YES') {
      this.DOConfirm();
    }
    if (this.BtnClickedName === 'IsDateChange' && ActionResult === 'YES') {
      this.DateChangeGetContractOrder();
    }
    if (this.BtnClickedName === 'IsDateChange' && ActionResult === 'YES' &&
    this.CanDateChange && this.ModuleCode === 2875) {
    this.DateChangeGetContractOrder();
  }
    if (this.BtnClickedName !== 'BtnConfirm' &&
      this.BtnClickedName !== 'IsDateChange' &&
      ActionResult === 'YES') {
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
    let ContractPersonHourDataList = [];
    const DataList = [];
    const InvalidRowData = [];

    this.dgEstiateApi.forEachNode(node => {
      DataList.push(node.data);
    });

    this.gridApi.forEachNode(node => {
      if (node.data.ProductID === this.beforeProductID) {
        node.data.ContractPersonEstimateList = DataList;
      }
    });


    this.gridApi.forEachNode(node => {
      ContractPersonHourDataList = [];
      node.data.ContractPersonEstimateList.forEach(item => {
        const ListItem = {
          ContractPersonHourID: -1,
          ContractPayItemID: -1,
          PersonID: item.PersonID,
          ItemNo: item.ItemNo,
          NormalWorkHour: item.NormalWorkHour,
          ExtraWorkHour: item.ExtraWorkHour,
          NightWorkHour: item.NightWorkHour,
          VacationWorkHour: item.VacationWorkHour,
        };
        ContractPersonHourDataList.push(ListItem);
      });

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
        ContractPersonHourDataList: ContractPersonHourDataList,
      };
      ContractPayItemList.push(obj);
    });

    const ContractPayObj = {
      ContractPayId: -1,
      CostFactorId: -1,
      CostContractId: this.CostContractID,
      FinYearCode: this.FinYearParams.selectedObject,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.ContractPayTypeParams.selectedObject,
      Note: this.Note,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractOperationId: this.ContractOperationId ,
      IsConfirm: 0 ,
    };

    // if (!SumContractPayItemAmount || SumContractPayItemAmount === 0) {
    //   this.ShowMessageBoxWithOkBtn('جمع مبلغ فعلی نمی تواند صفر باشد');
    //   return;
    // }
    this.ContractStima.GetAllWithContractOrderItemID(this.PopupParam.selectedRow.LastContractOrderID).subscribe(ress => {
      if (ress) {
        this.contractpaydetail.SaveContractPay(
           ContractPayObj,
           ContractPayItemList,
           null,
           false,
           false,
           false,
           this.ModuleCode,
           null).subscribe(res => {
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
      } else {
        this.ShowMessageBoxWithOkBtn('لطفا ابتدا برآورد اولیه را وارد کنید');
        return;
      }
    });
  }

  UpdateContractPay() {
    const ContractPayItemList = [];
    let ContractPersonHourList = [];
    const DataList = [];

    this.dgEstiateApi.forEachNode(node => {
      DataList.push(node.data);
    });

    this.gridApi.forEachNode(node => {

      if (node.data.ContractPersonHourList && node.data.ProductID === this.beforeProductID) {
        node.data.ContractPersonHourList = DataList;
      }

      if (node.data.ContractPersonEstimateList && node.data.ProductID === this.beforeProductID) {
        node.data.ContractPersonEstimateList = DataList;
      }
    });

    this.gridApi.forEachNode(node => {
      ContractPersonHourList = [];
      let ContractPayItemID = -1;
      let CostFactorID = -1;

      if (node.data.ContractPayItemID) {
        ContractPayItemID = node.data.ContractPayItemID;
      }

      if (this.CostFactorID && this.CostFactorID !== -1) {
        CostFactorID = this.CostFactorID;
      }

      if (node.data.ContractPersonHourList) {

        node.data.ContractPersonHourList.forEach(item => {
          let ContractPersonHourID = -1;
          if (item.ContractPersonHourID) {
            ContractPersonHourID = item.ContractPersonHourID;
          }

          const ItemObj = {
            ContractPersonHourID: ContractPersonHourID,
            ContractPayItemID: ContractPayItemID,
            PersonID: item.PersonID,
            ItemNo: item.ItemNo,
            NormalWorkHour: item.NormalWorkHour,
            ExtraWorkHour: item.ExtraWorkHour,
            NightWorkHour: item.NightWorkHour,
            VacationWorkHour: item.VacationWorkHour,
          };
          ContractPersonHourList.push(ItemObj);
        });
      }

      if (node.data.ContractPersonEstimateList) {
        node.data.ContractPersonEstimateList.forEach(item => {
          let ContractPersonHourID = -1;
          if (item.ContractPersonHourID) {
            ContractPersonHourID = item.ContractPersonHourID;
          }
          const ItemObj = {
            ContractPersonHourID: ContractPersonHourID,
            ContractPayItemID: ContractPayItemID,
            PersonID: item.PersonID,
            ItemNo: item.ItemNo,
            NormalWorkHour: item.NormalWorkHour,
            ExtraWorkHour: item.ExtraWorkHour,
            NightWorkHour: item.NightWorkHour,
            VacationWorkHour: item.VacationWorkHour,
          };
          ContractPersonHourList.push(ItemObj);
        });
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
        ContractPersonHourDataList: ContractPersonHourList
      };
      ContractPayItemList.push(obj);
    });

    const ContractPayObj = {
      ContractPayId: this.ContractDetails.ContractPayId,
      CostFactorId: this.CostFactorID,
      CostContractId: this.CostContractID,
      FinYearCode: this.FinYearParams.selectedObject,
      ContractPayNo: this.ContractPayNo,
      ContractPayDate: this.ContractPayDate,
      StartDate: this.ContractPayStartDate,
      EndDate: this.ContractPayEndDate,
      ContractPayTypeCode: this.ContractPayTypeParams.selectedObject,
      Note: this.Note,
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractOperationId: this.ContractOperationId,
      IsConfirm: 0 ,
    };

    // if (!SumContractPayItemAmount || SumContractPayItemAmount === 0) {
    //   this.ShowMessageBoxWithOkBtn('جمع مبلغ فعلی نمی تواند صفر باشد');
    //   return;
    // }
    this.ContractStima.GetAllWithContractOrderItemID(this.PopupParam.selectedRow.LastContractOrderID).subscribe(ress => {
      if (ress) {
        this.contractpaydetail.UpdateContractPay(ContractPayObj,
          ContractPayItemList,
          this.ContractAgentParams.selectedObject,
          this.ModuleCode ? this.ModuleCode : 2516,
          false,
          false,
          null,
          false,
          null)
          .subscribe(res => {
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
      } else {
        this.ShowMessageBoxWithOkBtn('لطفا ابتدا برآورد اولیه را وارد کنید');
        return;
      }
    });
  }

  BtnArchiveClick() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.OverstartLeftPosition = 315;
    this.OverstartTopPosition = 44;
    const archiveParam = {
      EntityID: this.ContractDetails.ContractPayId,
      TypeCodeStr: '3-',
      DocTypeCode: 3,
      ModuleCode: 2516,
      IsReadOnly: this.PopupParam.IsViewable
    };
    this.paramObj = archiveParam;
  }

  BtnDetailArchiveClick() {
    if (!this.SelectedContractPayItemListID) {
      this.ShowMessageBoxWithOkBtn('ردیف متره انتخاب نشده است');
      return;
    }
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.OverstartLeftPosition = 315;
    this.OverstartTopPosition = 44;
    const archiveParam = {
      EntityID: this.SelectedContractPayItemListID,
      TypeCodeStr: '3-',
      DocTypeCode: 3,
      ModuleCode: 2516,
      IsReadOnly: this.PopupParam.IsViewable
    };
    this.paramObj = archiveParam;
  }

  getOutPutParam(event) {

    if (this.type === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }
  }

  OnImportFromExcelBtnClick() {
    this.btnclicked = true;
    this.type = 'app-excel-load-data';
    this.OverstartLeftPosition = 400;
    this.OverstartTopPosition = 200;
    this.Excel_Header_Param = {
      colDef2: this.columnDef2
    };
    this.paramObj = this.Excel_Header_Param;
  }

  loadFromExcel(data) {

    const PriceListTopicCodes = [];
    const rowData = [];
    data.forEach((x: any) => {
      if (x.PriceListNo) {
        PriceListTopicCodes.push(x.PriceListNo);
      }
    });

    this.dgEstiateApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }

    this.PriceList.GetPriceListTopicList(PriceListTopicCodes, this.PriceListTypeCode + this.CostListFinYearCode,
      // tslint:disable-next-line: max-line-length
      this.ContractPayDate, this.PopupParam.selectedContractID). // با هماهنگی با آقای آخوندی برای تغییر متد اما این متد هم ربطی به لود اکسل این فرم ندارد
      subscribe(
        res => {
          if (res) {
            const itemsToUpdate = [];
            res.forEach(element => {
              MaxProp = MaxProp + 1;
              const ExcelObj = data.filter(x => x.PriceListNo === element.PriceListTopicCode)[0];
              const newItem = {
                ItemNo: MaxProp,
                PriceListPatternID: element.PriceListPatternID,
                PriceListNo: element.PriceListTopicCode,
                PriceListName: element.PriceListTopicName,
                WorkUnitName: element.WorkUnitName,
                PriceListAmount: element.Amount,
                IsStar: element.IsStar,
                OperationNote: ExcelObj && ExcelObj.OperationNote ? ExcelObj.OperationNote : '',
                Qty: ExcelObj && ExcelObj.Qty ? ExcelObj.Qty : '',
                Lenght: ExcelObj && ExcelObj.Lenght ? ExcelObj.Lenght : '',
                Width: ExcelObj && ExcelObj.Width ? ExcelObj.Width : '',
                Height: ExcelObj && ExcelObj.Height ? ExcelObj.Height : '',
                Area: ExcelObj && ExcelObj.Area ? ExcelObj.Area : '',
                Weight: ExcelObj && ExcelObj.Weight ? ExcelObj.Weight : '',
                Subject: ExcelObj && ExcelObj.Subject ? ExcelObj.Subject : '',
              };
              itemsToUpdate.push(newItem);
            });
            this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
          }
        }
      );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });
  }

  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.CostFactorID,
          this.RegionCode,
          2516,
          0,
          this.WorkflowObjectCode,
          null,null,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
          .subscribe(res => {
            this.HaveWorkFlow = true;
            this.ShowMessageBoxWithOkBtn('عدم تایید درخواست پرداخت با موفقیت انجام شد');
            if (this.ConfirmStatus.includes(21)) {
              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            } else {
              this.HaveConfirm = false;
            }
          }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }

  // DOConfirm() {
  //   this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
  //     this.CostFactorID,
  //     this.RegionCode,
  //     2516,
  //     1,
  //     this.WorkflowObjectCode,
  //     null,null,
  //     this.CartableUserID).subscribe(res => {
  //       this.HaveWorkFlow = true;
  //       this.ShowMessageBoxWithOkBtn('تایید درخواست پرداخت با موفقیت انجام شد');
  //       this.RefreshCartable.RefreshCartable();
  //       if (this.ConfirmStatus.includes(22)) {
  //         this.ReadyToConfirm = 1;
  //         this.btnConfirmName = 'عدم تایید';
  //         this.btnConfirmIcon = 'cancel';
  //       } else {
  //         this.HaveConfirm = false;
  //       }
  //     },
  //       err => {
  //         this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
  //       }
  //     );
  // }

  // DOFinalConfirm() {
  //   this.Cartable.UserFinalConfirmWorkFlow(
  //     this.CurrWorkFlow,
  //     this.WorkFlowID,
  //     10,
  //     '',
  //     this.ObjectNo,
  //     this.WorkflowTypeName,
  //     this.ObjectID,
  //     this.WorkflowTypeCode,
  //     this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
  //     this.WorkflowObjectCode,
  //     null,
  //     this.CartableUserID,
  //   )
  //     .subscribe(res2 => {
  //       this.HaveWorkFlow = true;
  //       if (this.ConfirmStatus.includes(27) || this.ConfirmStatus.includes(28)) {
  //         if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
  //           this.ShowMessageBoxWithOkBtn('بازگشت از تایید نهایی درخواست پرداخت با موفقیت انجام شد');
  //           this.ReadyToConfirm = 0;
  //           this.btnConfirmName = 'تایید نهایی';
  //           this.btnConfirmIcon = 'ok';
  //         } else {
  //           this.ShowMessageBoxWithOkBtn('تایید نهایی درخواست پرداخت با موفقیت انجام شد');
  //           this.ReadyToConfirm = 1;
  //           this.btnConfirmName = 'بازگشت از تایید نهایی';
  //           this.btnConfirmIcon = 'cancel';
  //         }
  //       } else {
  //         this.HaveConfirm = false;
  //       }
  //     },
  //       err => {
  //         this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
  //       });
  // }
  showVehicle() {
    if (this.SelectedContractPayItemID != null) {
      this.btnclicked = true;
      this.type = 'transport';
      this.HaveHeader = true;
      this.OverstartLeftPosition = 50;
      this.OverstartTopPosition = 30;
      this.paramObj = {
        HeaderName: 'خودرو',
        ContractPayItemID: this.SelectedContractPayItemID,
        ContractPayTechnicalCode: this.ContractPayTechnicalCode,
        ContractPayDate: this.ContractPayDate,
        ContractPayStartDate: this.ContractPayStartDate,
        ContractPayEndDate: this.ContractPayEndDate,
        FinYearCode: this.PopupParam.FinYearCode,
        ContractCode: this.PopupParam.ContractCode,
        ContractorName: this.PopupParam.ContractorName,
        LetterNo: this.PopupParam.LetterNo,
        ContractAmount: this.PopupParam.ContractAmount,
        Subject: this.PopupParam.Subject
      };
    }
  }

  onPrint() {
    this.Report.ContractPayListDetailReport(
      this.PopupParam.SelectedCostFactorID,
      this.PopupParam.ContractAgentCode,
      2516,
      this.RegionCode,
      'صورت وضعیت ماهانه نظارت کارگاهی',
      0
    );
  }
  onConfirms() { // RFC 52262
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تاييد درخواست پرداخت به دليل دسترسي فقط خواندني کاربر در اين واحد اجرايي وجود ندارد');
      return;
    }
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
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
            this.ModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
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
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  onConfirmAndSend() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تاييد و ارسال درخواست به دليل دسترسي فقط خواندني کاربر در اين واحد اجرايي وجود ندارد');
      return;
    }
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'ConfirmAndSend';
      // this.IsDown = false;
      if (this.ChangeDetection) {
        this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
      }  else {
        this.DoConfirmAndSend();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  OnClickPrintFlow() {
    const FullPersonName = { FullPersonName: '' };
    this.Report.ShowReport(null,
      null,
      this.CostFactorID,
      this.PopupParam.ContractCode,
      null,
      null,
      null,
      FullPersonName ? FullPersonName.FullPersonName : '',
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
  ViewTypeChange() { // RFC 52262
    if (this.CheckRegionWritable) {
      this.IsEditable = false;
    } else {
      if (this.btnConfirmName === 'عدم تایید') {
        this.IsEditable = true;
        this.IsEditConfirm = false;
      }
      switch (this.ModuleViewTypeCode) {
        case 1:
          this.IsEditable = true;
          break;
        case 2:
          this.IsEditable = false;
          break;
        case 3: // تامين اعتبار صورت وضعيت در سيستم مالي
          this.DisplayControlls = false;
          this.HaveSave = false;
          this.IsEditable = false;
          this.HaveConfirm = false;
          this.HaveAlertToFinance = true;
          break;
          case 500000: // حالت فقط خواندنی
          this.DisplayControlls = false;
          this.HaveSave = false;
          this.IsEditable = false;
          this.HaveConfirm = false;
          break;
        default:
          break;
      }
    }
  }
  DOConfirm(HasAlert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null || this.WorkflowObjectCode === undefined) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار براي اين واحد اجرايي به درستي تعريف نشده است');
      }
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionCode,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.ModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
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
      } else {
        this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
      }
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
      this.ModuleViewTypeCode,
      this.CartableUserID
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          messageStr = 'بازگشت از تاييد نهايي با موفقيت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تاييد نهايي';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تاييد نهايي با موفقيت انجام شد';
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
  DoConfirmAndSend() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown: any) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          // this.ObjectNo = this.PersonObject.IdentityNo;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
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
                    this.PopupParam = {
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
      }
    });
  }
  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionCode,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.ModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('عدم تاييد برآورد اوليه با موفقيت انجام شد');
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
      } else {
        this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
      }
  }
  ShowUnderTakeItemClick() {
    this.contractpaydetail.GetUnderTakeItemsList(this.CostFactorID).subscribe(res => {
      if (res && res.length > 0) {
        this.type = 'app-show-under-take-items';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.OverstartLeftPosition = 160;
        this.OverstartTopPosition = 50;
        this.HeightPercentWithMaxBtn = 58;
        this.MinHeightPixel = 340;
        this.paramObj = {
          ContractPayCostFactorID: this.CostFactorID,
          undertakerowData: res
        }
      } else {
        this.ShowMessageBoxWithOkBtn('صورت وضعیت انتخابی فاقد تعهد اعتبار می باشد.');
      }
    });
  }
}
