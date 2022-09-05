import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { of } from 'rxjs';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { OverPopUpCellEditorComponent } from '../OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { LoadingService } from 'src/app/Load/loading/LoadingService';
import { isUndefined } from 'util';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { NgSelectVirtualScrollComponent } from '../ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { GridOptions } from 'ag-grid-community';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

declare var $: any;

@Component({
  selector: 'app-contract-estimate-page',
  templateUrl: './contract-estimate-page.component.html',
  styleUrls: ['./contract-estimate-page.component.css']
})
export class ContractEstimatePageComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  IsRelated;
  SumAmount = '0';
  WasSaveInfo = false;
  MessageBoxResult = false;
  gridHeight;
  OverPopUpPixelHeight;
  gridEstimateHeight = 89;
  mainBodyHeight = 87;
  WorkFlowTransitionID;
  ChangeDetection = false;
  CorrectionRequired = false;
  private gridApi;
  private COIgridApi;
  DisabledComponents = false;
  ObjectNo;
  ObjectID;
  WorkflowTypeName;
  WorkflowTypeCode;
  WorkflowObjectCode;
  columnDef1;
  defaultColDef1;
  rowData1: any;
  columnDef2;
  columnDef22;
  ExceleColDef = [];
  defaultColDef2;
  rowData2: any;
  btnclicked = false;
  Note;
  OrderNo;
  selectedContractID;
  SelectedContractOrderID;
  PersianOrderDate;
  WorkFlowID;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  Subject;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverPopUpParams = {}; // For All Params
  CostListFinYearCode;
  ContractPriceListPatternID;
  PriceListTypeCode;
  IsDisable = true;
  selectedContractOrderItemID;
  ContractOrderItemList = [];
  beforeID;
  ReadyToConfirm;
  btnConfirmName;
  btnConfirmIcon;
  SumFinalEstimateAmount = '0';
  SumEstimateAmount = 0;
  SumContractOrderItemAmount = 0;
  CoefLevelCode;
  IsEndFlow = false;
  CoefParam;
  ProductName;
  ProductCode;
  Amount;
  ReportParam: any;
  ModuleCode;
  HaveSave = false;
  HaveDelete = false;
  HaveConfirm = false;
  ConfirmCode = -1;
  CancelCode = -1;
  FinalConfirmCode;
  FinalCancelCode;
  ArchiveBtnTextOrderItem = 'مستندات فعالیت';
  ArchiveBtnTextEstimate = 'مستندات متره';
  BtnClickedName = '';
  IsNotFound = false;
  defaultSelectedRowIndex;
  RegionCode;
  selectedRow: any;
  OverstartLeftPosition;
  OverstartTopPosition;
  paramObj;
  PlcParams;
  selectedPriceListTopicCode;
  selectedPriceListTypeCode;
  selectedPriceListTypeName;
  PriceListTypeCodeName;
  PriceListTopicCodeName;
  ActorControl = false;
  colDef2: any;
  @Output() ContractEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  Excel_Header_Param;
  ArchiveParam;
  IsDeActive = true;
  CalcFunction;
  ModuleViewTypeCode: any;
  IsEditable = true;
  SeasonListItems: any;
  SeasonListParams = {
    bindLabelProp: 'SeasonName',
    bindValueProp: 'SeasonCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  HaveMaxBtn = false;
  OverPixelWidth: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  Showable = true;
  SumFinalEstimateFAmount = '0';
  SumFinalEstimateSAmount = '0';
  SumFinalEstimateMAmount = '0';
  SumFinalItemAmount = '0';
  PriceListCorrectionList = [];
  CartableUserID: any;
  CurrWorkFlow: any;
  PercentWidth;
  OverMainMinwidthPixel;
  MainMaxwidthPixel;
  EntityList = [];
  SelectedProductID: any;
  NgSelectContractEntityItemParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'EntityTypeItemID',
    placeholder: '',
    MinWidth: '200px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'entity-item',
  };
  InProgressGridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.IsDifferentAmount) {
        return { 'background-color': '#fac5c9' };
      }
    }
  };
  SumFinalItemAmount1 = '0';
  SumFinalItemAmountCOEF = '0';
  HasCOIEntity = false;
  constructor(private router: Router,
    private ContractList: ContractListService,
    private Cartable: CartableServices,
    private PriceList: PriceListService,
    private Loading: LoadingService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private RefreshCartable: RefreshServices,
    private CommonService: CommonServices,
    private FlowService: WorkflowService,
    private contractpaydetail: ContractPayDetailsService,
    private ProductRequest: ProductRequestService,
  ) {
    this.SeasonListItems =
      [
        { SeasonCode: 1, SeasonName: 'فصل اول' },
        { SeasonCode: 2, SeasonName: 'فصل دوم' },
        { SeasonCode: 3, SeasonName: 'فصل سوم' },
        { SeasonCode: 4, SeasonName: 'فصل جهارم' },
      ];
    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'وزن دهی',
        children: [
          {
            headerName: 'حجمی',
            field: 'Weight',
            width: 55,
            resizable: true,
            editable: () => {
              return this.IsEditable; // true/false based on params (or some other criteria) value
            },
            valueParser: numberValueParser
          },
          {
            headerName: 'ریالی',
            field: 'Ratio',
            width: 80,
            resizable: true,
            editable: false,
          },
        ]
      },
      {
        headerName: '',
        children: [
          {
            headerName: 'کد فعالیت',
            field: 'ProductCode',
            width: 100,
            resizable: true
          },
          {
            headerName: 'نام فعالیت',
            field: 'ProductName',
            width: 230,
            resizable: true
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
            headerName: 'مبلغ متره',
            field: 'Amount',
            width: 150,
            HaveThousand: true,
            resizable: true
          },
          {
            headerName: 'مبلغ متره با ضرایب ردیف',
            field: 'AmountCOEF',
            HaveThousand: true,
            width: 150,
            resizable: true
          },
          {
            headerName: 'مبلغ کل',
            field: 'AmountCOEFPact',
            HaveThousand: true,
            width: 150,
            resizable: true
          }
        ],
      },
    ];
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.ColumnDefinition();
    if (this.PopupParam) {
      this.gridHeight = !this.PopupParam.IsWFShow ? 58 : 57;
    } else {
      this.gridHeight = 58;
    }
    if (this.PopupParam && this.PopupParam.IsEditable === false) {
      this.Showable = false;
      this.IsEditable = false;
    }

    this.getNewData();
    this.rowData2 = of([]);
  }

  getNewData(): void {
    this.WorkFlowID = this.PopupParam.WorkFlowID;
    this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
    this.ReadyToConfirm = this.PopupParam.ReadyToConfirm;
    this.ModuleCode = this.PopupParam.ModuleCode;
    if (this.PopupParam.selectedRow.data.ContractOrderId) {
      this.SelectedContractOrderID = this.PopupParam.selectedRow.data.ContractOrderId;
    } else if (this.PopupParam.selectedRow.data.LastContractOrderID) {
      this.SelectedContractOrderID = this.PopupParam.selectedRow.data.LastContractOrderID;
    }
    if (this.PopupParam.selectedRow.data.WorkflowTypeName) {
      this.IsEndFlow = this.PopupParam.selectedRow.data.IsEnd === 1;
      this.WorkflowTypeName = this.PopupParam.selectedRow.data.WorkflowTypeName;
      this.WorkflowTypeCode = this.PopupParam.selectedRow.data.WorkflowTypeCode;
      this.WorkflowObjectCode = this.PopupParam.selectedRow.data.WorkflowObjectCode;
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
      this.ObjectNo = this.PopupParam.selectedRow.data.ObjectNo;
      this.ObjectID = this.PopupParam.selectedRow.data.ObjectID;
      this.CartableUserID = this.PopupParam.selectedRow.data.CartableUserID;
    }

    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
            this.HaveSave = true;
            break;

          case 21:
            this.ConfirmCode = 21;
            if (!this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
              this.HaveConfirm = true;

            }
            break;

          case 22:
            this.CancelCode = 22;
            if (!this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
              this.btnConfirmName = 'عدم تایید';
              this.btnConfirmIcon = 'cancel';
              this.HaveConfirm = true;
            }
            break;
          case 28:
            this.FinalCancelCode = 28;
            if (this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
              this.btnConfirmName = 'بازگشت از تایید نهایی';
              this.btnConfirmIcon = 'cancel';
              this.HaveConfirm = true;
            }
            break;
          case 27:
            this.FinalConfirmCode = 27;
            if (this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
              this.btnConfirmName = 'تایید نهایی';
              this.btnConfirmIcon = 'ok';
              this.HaveConfirm = true;
            }
            break;
          case 6:
            this.HaveDelete = true;
            break;
          default:
            break;

        }
      });

      this.SetVWOrderItemData();

      if (!this.PopupParam.selectedRow.data.ContractCode) {
        this.ContractList.GetContract(null, this.SelectedContractOrderID).subscribe(
          res => {
            if (!res[0].SeasonCode) {
              this.ContractList.GetContractDataByID(res[0].ContractId).subscribe(x => {
                res[0].SeasonCode = x.SeasonCode;
              });
            }
            this.RegionCode = res[0].RegionCode;
            this.FinYearCode = res[0].FinYearCode;
            this.ContractCode = res[0].ContractCode;
            this.ContractorName = res[0].ContractorName;
            this.LetterNo = res[0].LetterNo;
            this.ContractAmount = res[0].ContractAmount;
            this.Subject = res[0].Subject;
            this.CostListFinYearCode = res[0].CostListFinYearCode;
            this.ContractPriceListPatternID = res[0].PriceListPatternID;
            this.PriceListTypeCode = res[0].PriceListTypeCode;
            this.CoefLevelCode = res[0].CoefLevelCode;
            this.selectedContractID = res[0].ContractId;
            this.SeasonListParams.selectedObject = res[0].SeasonCode;
            this.IsDeActive = !this.ContractPriceListPatternID;
            if (this.columnDef2) {
              this.columnDef2[1].cellEditorParams.PopupParam = {
                CostListFinYearCode: this.CostListFinYearCode,
                PriceListPatternID: this.ContractPriceListPatternID
              };
            }
            if (this.selectedContractID) {
              // tslint:disable-next-line:no-shadowed-variable
              this.ContractList.GetBalanceFactors(this.selectedContractID).subscribe(res => {
                if (res && res[0]) {
                  this.PriceListTypeCodeName = res[0].PriceListTypeCode + ' - ' + res[0].PriceListTypeName;
                  this.PriceListTopicCodeName = res[0].PriceListFineYearCode + ' - ' + res[0].PriceListFineYearName;
                }
              });
            }
            if (this.HaveSave && !this.ContractPriceListPatternID) {
              this.type = 'set-contract-price-list-pattern';
              this.OverstartLeftPosition = 400;
              this.OverstartTopPosition = 200;
              this.HaveHeader = true;
              this.OverPopUpParams['HeaderName'] = 'لطفا جهت ورود برآورد اولیه سال و نوع فهرست بهای قرارداد خود را مشخص نمایید',
                this.OverPopUpParams['selectedContractID'] = this.selectedContractID;
              this.OverPopUpParams['HaveSave'] = this.HaveSave;
              this.btnclicked = true;
            }

            if (!this.WorkFlowID) {
              this.FlowService.GetStartModuleViewTypeCode(this.RegionCode,
                this.ModuleCode,
                null,
                this.SelectedContractOrderID).subscribe((rees: any) => {
                  this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : rees.ModuleViewTypeCode;
                  this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : rees.WorkflowObjectCode;
                  this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : rees.WorkFlowLogID;
                  this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : rees.WorkFlowTypeName;
                  this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : rees.WorkFlowTypeCode;
                  this.ViewTypeChange();
                });
            }
          }
        );
      } else {
        this.RegionCode = this.PopupParam.selectedRow.data.RegionCode;
        this.FinYearCode = this.PopupParam.selectedRow.data.FinYearCode;
        this.ContractCode = this.PopupParam.selectedRow.data.ContractCode;
        this.ContractorName = this.PopupParam.selectedRow.data.ContractorName;
        this.LetterNo = this.PopupParam.selectedRow.data.LetterNo;
        this.ContractAmount = this.PopupParam.selectedRow.data.ContractAmount ? this.PopupParam.selectedRow.data.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
        this.Subject = this.PopupParam.selectedRow.data.Subject;
        this.CostListFinYearCode = this.PopupParam.selectedRow.data.CostListFinYearCode;
        this.ContractPriceListPatternID = this.PopupParam.selectedRow.data.PriceListPatternID;
        this.IsDeActive = !this.ContractPriceListPatternID;
        this.PriceListTypeCode = this.PopupParam.selectedRow.data.PriceListTypeCode;
        this.CoefLevelCode = this.PopupParam.selectedRow.data.CoefLevelCode;

        //بررسی با RFC 52169 
        // به دلیل اینکه این فرم از دو مسیر مختلف باز میگردد و در هر مسیر فیلد آی دی قرارداد متفاوت ست شده است
        // به اجبار اینجا دو حالت هندل شده است .چون امکان اصلاح آی دی با حرف بزرگ در ماژول براورد اولیه به دلیل استفاده زیاد
        // در مسیرهای دیگر وجود نداشت 

        if (this.PopupParam.selectedRow.data.ContractId) { this.selectedContractID = this.PopupParam.selectedRow.data.ContractId; } // از منوی برآورد اولیه 
        else if (this.PopupParam.selectedRow.data.ContractID) { this.selectedContractID = this.PopupParam.selectedRow.data.ContractID; } // از مسیر ابزارراهبری / اصلاح براورد اولیه
        else if (this.PopupParam.CurrWorkFlow && this.PopupParam.CurrWorkFlow.ContractID) { this.selectedContractID = this.PopupParam.CurrWorkFlow.ContractID; } //         کارتابل

        if (this.columnDef2) {
          this.columnDef2[1].cellEditorParams.PopupParam = {
            CostListFinYearCode: this.CostListFinYearCode,
            PriceListPatternID: this.ContractPriceListPatternID
          };
        }

        if (this.selectedContractID) {
          this.ContractList.GetBalanceFactors(this.selectedContractID).subscribe(res => {
            if (res && res[0]) {
              this.PriceListTypeCodeName = res[0].PriceListTypeCode + ' - ' + res[0].PriceListTypeName;
              this.PriceListTopicCodeName = res[0].PriceListFineYearCode + ' - ' + res[0].PriceListFineYearName;
            }
          });
        }

        this.SeasonListParams.selectedObject = this.PopupParam.selectedRow.data.SeasonCode;
        if (this.HaveSave && !this.ContractPriceListPatternID) { //RFC 52099
          this.type = 'set-contract-price-list-pattern';
          this.OverstartLeftPosition = 400;
          this.OverstartTopPosition = 200;
          this.HaveHeader = true;
          this.OverPopUpParams['HeaderName'] = 'لطفا جهت ورود برآورد اولیه سال و نوع فهرست بهای قرارداد خود را مشخص نمایید',
            this.OverPopUpParams['selectedContractID'] = this.selectedContractID;
          this.OverPopUpParams['HaveSave'] = this.HaveSave;
          this.OverPopUpParams['ModuleCode'] = this.ModuleCode;
          this.btnclicked = true;
        }
        if (!this.WorkFlowID) {
          this.FlowService.GetStartModuleViewTypeCode(this.RegionCode,
            this.ModuleCode,
            null,
            this.SelectedContractOrderID).subscribe((rees: any) => {
              this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : rees.ModuleViewTypeCode;
              this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : rees.WorkflowObjectCode;
              this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : rees.WorkFlowLogID;
              this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : rees.WorkFlowTypeName;
              this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : rees.WorkFlowTypeCode;
              this.ViewTypeChange();
            });
        }
      }

    });

    this.RefreshCartable.ContractOrderItemList.subscribe(res => {
      this.SetVWOrderItemData();
    });
  }

  SetVWOrderItemData() {
    this.ActorControl = true;
    this.ContractList.GetContractOrderItemListVW(this.SelectedContractOrderID, this.ActorControl)
      .subscribe(res => {
        this.ContractOrderItemList = [];
        let SumAmount = 0;
        let SumAmountCOEF = 0;
        this.rowData1 = res;
        if (res != null && res.length > 0) {
          this.Note = res[0].Note;
          this.OrderNo = res[0].OrderNo;
          this.SelectedContractOrderID = res[0].ContractOrderID;
          this.PersianOrderDate = res[0].PersianOrderDate;
        }
        res.forEach((item) => {
          this.SumContractOrderItemAmount += item.Amount;
          item.ContractOrderEstimateList.forEach((i) => {
            i.OrderEstimateEntityItemList.forEach(
              EntityItem => {
                let Name = 'Subject' + EntityItem.EntityTypeID.toString();
                let ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();
                i[Name] = EntityItem.Subject;
                i[ID] = EntityItem.EntityTypeItemID;
              });
            this.SumEstimateAmount += i.FinalAmount;
          });
          const obj = {
            ContractOrderItemID: item.ContractOrderItemID,
            ContractOrderItemAmount: item.Amount,
            ContractOrderEstimateList: item.ContractOrderEstimateList,
            ProductID: item.ProductID,
          };
          this.ContractOrderItemList.push(obj);
          if (item.AmountCOEFPact) {
            SumAmount = SumAmount + item.AmountCOEFPact;
          }
          if (item.AmountCOEF) {
            SumAmountCOEF = SumAmountCOEF + item.AmountCOEF;
          }
        });
        this.defaultSelectedRowIndex = 0;
        this.SumFinalItemAmount1 = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalItemAmountCOEF = SumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // RFC 60259

        if (this.selectedContractOrderItemID) { // RFC 52059
          this.ContractOrderItemList.forEach((item) => {
            if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
              this.rowData2 = item.ContractOrderEstimateList;
            }
          });
        }
      });
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.ContractEstimateClosed.emit(true);
    }
  }

  btnClick(InputValue: any) {
    let AmountCOEFPact = 0;
    this.COIgridApi.forEachNode(node => {
      AmountCOEFPact = node.data.AmountCOEFPact;
    });
    this.btnclicked = true;
    switch (InputValue) {
      case 'app-excel-load-data':
        this.type = 'app-excel-load-data';
        this.OverstartLeftPosition = 400;
        this.OverstartTopPosition = 200;
        this.Excel_Header_Param = {
          colDef2: this.colDef2,
          ModuleCode: this.ModuleCode
        }
        break;
      case 'choose-report':
        this.type = 'choose-report';
        this.OverstartLeftPosition = 400;
        this.OverstartTopPosition = 200;
        this.ReportParam = {
          SelectedContractID: this.selectedContractID,
          SelectedContractOrderItemID: this.selectedContractOrderItemID,
          RegionCode: this.RegionCode,
          ModuleCode: this.ModuleCode,
          AmountCOEFPact: AmountCOEFPact
        };
        break;
      case 'archive-order-item': {
        this.type = 'archive-details';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.OverstartLeftPosition = 420;
        this.OverstartTopPosition = 150;
        const archiveOrderParam = {
          EntityID: this.selectedContractOrderItemID,
          TypeCodeStr: '2-', //  برآورد اولیه
          DocTypeCode: 2,
          ModuleCode: this.ModuleCode,
        };
        this.ArchiveParam = archiveOrderParam;
      }
        break;
      case 'archive-contract-estimate': {
        this.type = 'archive-details';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.OverstartLeftPosition = 420;
        this.OverstartTopPosition = 150;
        const archiveEstimateParam = {
          EntityID: this.selectedRow.data.ContractOrderEstimateID,
          TypeCodeStr: '2-', //  برآورد اولیه
          DocTypeCode: 2,
          ModuleCode: this.ModuleCode
        };
        this.ArchiveParam = archiveEstimateParam;
      }
        break;
      case 'Related':
        if (this.selectedRow == null) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.OverstartLeftPosition = 500;
          this.OverstartTopPosition = 250;
        } else {
          this.type = 'related-price-list';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.OverstartLeftPosition = 240;
          this.OverstartTopPosition = 10;
          this.paramObj = {
            HeaderName: 'ردیف مرتبط',
            RowSelected: this.selectedRow.data,
            ModuleCode: this.ModuleCode,
            Mode: 'ContractOrderEstimateMode',
          };
        }
        break;
      case 'contract-coef-by-contract-order': // RFC 54229
        if (!this.selectedContractOrderItemID) {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
          return;
        }
        this.type = 'contract-coef';
        this.OverstartLeftPosition = 140;
        this.OverstartTopPosition = 37;
        this.CoefParam = {
          HeaderName: 'ضرایب فعالیت',
          ContractID: this.selectedContractID,
          CoefLevelCode: this.CoefLevelCode,
          ContractCode: this.ContractCode,
          ContractorName: this.ContractorName,
          Subject: this.Subject,
          ModuleCode: this.ModuleCode,
          ReigonCode: this.PopupParam.ReigonCode,
          ContractOrderItemID: this.selectedContractOrderItemID
        };
        break;
      default:
        break;
    }
  }

  popupclosed() {
    if (this.type === 'set-contract-price-list-pattern') {
      this.PriceList.GetContractPriceListPattern(this.selectedContractID).subscribe(res => {
        if (res) {
          this.columnDef2[1].cellEditorParams.PopupParam = {
            CostListFinYearCode: res.CostListFinYearCode,
            PriceListPatternID: res.PriceListPatternID
          };
          this.CostListFinYearCode = res.CostListFinYearCode;
          this.PriceListTypeCode = res.PriceListTypeCode;
          this.ContractPriceListPatternID = res.PriceListPatternID;
          this.IsDeActive = !this.ContractPriceListPatternID;
          this.PriceListTopicCodeName = res.CostListFinYearCode + ' - ' + res.PriceListTopicCodeName;
          this.PriceListTypeCodeName = res.PriceListTypeCode + ' - ' + res.PriceListTypeCodeName;
        }
      });
    }
    if (this.type === 'contract-orderitem-coef' || this.type === 'contract-coef') {
      if (this.WasSaveInfo === true) {
        this.ngOnInit();
      }
    }
    // if (this.type === 'related-price-list') {
    //   this.beforeID = null;
    //   this.CalcFunction = '';
    // if (this.WasSaveInfo === true) {
    //   this.ngOnInit();
    //   }
    // }

    this.btnclicked = this.IsNotFound;
    this.IsNotFound = false;
    this.MinHeightPixel = null;
    this.OverPopUpPixelHeight = null;
  }

  onAddPopUpBtnClick() {
    this.type = 'price-list-topic-dataentry-page';
    this.btnclicked = true;
    this.OverstartLeftPosition = 450;
    this.OverstartTopPosition = 51;
    this.paramObj = {
      HeaderName: 'افزودن فهرست بها',
      Mode: 'AddNewPopUpMode',
      PriceListTypeCode: this.PriceListTypeCode,
      CostListFinYearCode: this.CostListFinYearCode,
    };
  }

  AddPopUpBtnClick(element) {
    if (element.ItemNo > -1) {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.data.ItemNo === element.ItemNo) {
          node.data.PriceListPatternID = element.PriceListPatternID;
          node.data.PriceListNo = element.PriceListTopicCode;
          node.data.PriceListName = element.PriceListTopicName;
          node.data.WorkUnitName = element.WorkUnitName;
          node.data.Amount = element.Amount;
          node.data.IsStar = element.IsStar;
          node.data.IsStarCode = element.IsStarCode;
          node.data.ContractTopicMapCode = element.ContractTopicMapCode ? element.ContractTopicMapCode : null;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    } else {
      const ItemList = [];
      const obj = {
        PriceListPatternID: element.PriceListPatternID,
        PriceListNo: element.PriceListTopicCode,
        PriceListName: element.PriceListTopicName,
        WorkUnitName: element.WorkUnitName,
        Amount: element.Amount,
        IsStar: element.IsStar,
        IsStarCode: element.IsStarCode,
        ContractTopicMapCode: element.ContractTopicMapCode ? element.ContractTopicMapCode : null,
      };
      ItemList.push(obj);
      this.gridApi.updateRowData({ add: ItemList });
      this.RefreshItemNo();
    }
  }

  loadFromExcel(data) {
    const TempData = [];
    this.PriceListCorrectionList = [];
    const priceListIDs = [];
    data.forEach((x: any) => {
      if (x.PriceListNo !== undefined) {
        priceListIDs.push(x.PriceListNo);
        TempData.push(x);
      }
    });

    data = TempData;

    this.PriceList.GetPriceListTopicList(priceListIDs, this.PriceListTypeCode + this.CostListFinYearCode, null, null)
      .subscribe(res => {
        (res as any[]).forEach(item => {
          data.filter(x => x.PriceListNo === item.PriceListTopicCode).forEach(i => {
            // VerifiedData.filter(x => x.PriceListNo === item.PriceListTopicCode).forEach(i => {
            const ExcelName = i.PriceListName.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
            const DbName = item.PriceListTopicName.replace(/ي/g, 'ی').replace(/ك/g, 'ک');
            if (ExcelName !== DbName && (item.IsStar === '*')) {
              this.CorrectionRequired = true;
              i.IsInvalid = true;
              i.PriceListTopicCode = i.PriceListNo;
              i.ExcelPriceListTopicName = i.PriceListName;
              i.PriceListTopicName = item.PriceListTopicName;
              i.ExcelAmount = i.Amount;
              i.Amount = item.Amount;
              i.IsStar = item.IsStar;
              i.PriceListPatternID = item.PriceListPatternID;
              i.WorkUnitName = item.WorkUnitName;
              i.WorkUnitCode = item.WorkUnitCode;
              i.IsWork = item.IsWork;
              i.IsWorkCode = item.IsWorkCode;
              i.IsWorkCodeParam = item.IsWorkCode ? { WorkCode: 1, WorkName: 'کارکرد' } : { WorkCode: 0, WorkName: 'پایکار ' };
              i.Qty = i.Qty;
              i.FinalAmount = i.Qty * item.Amount;
              this.PriceListCorrectionList.push(i);
            } else {
              i.PriceListName = item.PriceListTopicName;
              i.PriceListPatternID = item.PriceListPatternID;
              i.ContractOrderItemID = this.selectedContractOrderItemID;
              i.ItemNo = 1;
              i.WorkUnitName = item.WorkUnitName;
              i.WorkUnitCode = item.WorkUnitCode;
              i.IsDifferentAmount = i.Amount ? item.Amount !== i.Amount : false;
              i.Amount = item.IsStar === '*' ? i.Amount : item.Amount;
              i.IsStar = item.IsStar;
              i.Qty = i.Qty;
              i.FinalAmount = i.Qty * i.Amount;
            }
          });
        });

        data.forEach((x: any, i) => {
          if (!x.IsInvalid) {
            x['ItemNo'] = -1;
            this.gridApi.updateRowData({ add: [x] });
          }
        });

        this.RefreshItemNo();
        this.ContractOrderItemList.forEach(item => {
          data.forEach(d => {
            // VerifiedData.forEach(d => {
            if ((item.ContractOrderItemID === d.ContractOrderItemID) && (!d.IsInvalid)) {
              item.ContractOrderEstimateList.push(d);
            }
          });
        });

        if (this.CorrectionRequired) {
          this.type = 'price-list-correction';
          this.btnclicked = true;
          this.OverstartLeftPosition = 160;
          this.OverPopUpPixelHeight = null;
          this.OverstartTopPosition = 50;
          this.HaveHeader = true;
          this.PlcParams = {
            HeaderName: 'اصلاح فهرست بها',
            PriceListCorrectionList: this.PriceListCorrectionList,
            CostListFinYearCode: this.CostListFinYearCode,
            PriceListTypeCode: this.PriceListTypeCode,
            ModuleCode: this.ModuleCode
          };
        }
      });
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onContractOrderItemGridReady(params: { api: any; }) {
    this.COIgridApi = params.api;
  }

  RowClick(InputValue) {
    this.SelectedProductID = InputValue.data.ProductID;
    this.ProductName = InputValue.data.ProductName;
    this.ProductCode = InputValue.data.ProductCode;
    this.Amount = InputValue.data.Amount;
    this.SumFinalItemAmount = InputValue.data.AmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.ColumnDefinition();
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.gridApi.updateRowData({ remove: rowData });
    this.selectedContractOrderItemID = InputValue.data.ContractOrderItemID;
    this.IsDisable = false;

    if (!this.beforeID) {
      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === InputValue.data.ContractOrderItemID) {
          this.rowData2 = item.ContractOrderEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID !== InputValue.data.ContractOrderItemID) {
      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === this.beforeID) {
          item.ContractOrderEstimateList = rowData;
        }
        if (item.ContractOrderItemID === InputValue.data.ContractOrderItemID) {
          this.rowData2 = item.ContractOrderEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID === InputValue.data.ContractOrderItemID) {
      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === this.beforeID) {
          this.gridApi.updateRowData({ add: rowData });
        }
      });
    }

    this.beforeID = InputValue.data.ContractOrderItemID;
  }

  rowClick(InputValue) {
    this.CalcFunction = '';
    this.selectedRow = InputValue;
    if (InputValue.data.RelatedPriceListPatternID) {
      this.PriceList.GetRelatedPriceListPattern(InputValue.data.RelatedPriceListPatternID,
        InputValue.data.PriceListPatternID)
        .subscribe(
          res => {
            const rowDataList = [];
            this.gridApi.forEachNode(function (node) {
              rowDataList.push(node.data);
            });
            const rowData = rowDataList.filter(x => x.PriceListPatternID === InputValue.data.RelatedPriceListPatternID)[0];
            this.CalcFunction = res[0].CalcFunction;
            const XValue = res[0].XValue;
            const IsEfectToPrice = res[0].IsEfectToPrice;

            if (this.CalcFunction) {
              const index = this.CalcFunction.indexOf('x');
              if (index && index !== -1) {
                this.CalcFunction = this.CalcFunction.replace('x', XValue);
                if (IsEfectToPrice) {
                  this.CalcFunction = this.CalcFunction.replace('pos', rowData.Amount);
                } else {
                  this.CalcFunction = this.CalcFunction.replace('pos', rowData.Qty);
                }
              } else {
                if (IsEfectToPrice) {
                  this.CalcFunction = this.CalcFunction + ' * ' + rowData.Amount;

                } else {
                  this.CalcFunction = this.CalcFunction + ' * ' + rowData.Qty;
                }
              }
            }
          });
    }
  }

  onSave() {
    this.gridApi.stopEditing();
    this.COIgridApi.stopEditing();

    const beforeSumContractOrderItemAmount = this.SumContractOrderItemAmount;
    const beforeSumEstimateAmount = this.SumEstimateAmount;
    const rowData = [];
    const InvalidRowData = [];
    const ContractEstimateList = [];
    const ContractOrderItemIDList = [];
    const ContractOrderItemWeightValueList = [];
    this.SumContractOrderItemAmount = 0;
    this.SumEstimateAmount = 0;

    let PriceItems = null;
    let Messagee = null;
    let ErrorMessage;

    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    let InvalidObj;
    this.ContractOrderItemList.forEach((item) => {
      if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
        rowData.forEach(element => {
          if ((!element.PriceListPatternID ||
            !element.Amount) &&
            element.PriceListNo &&
            element.PriceListNo.length > 0) {
            InvalidObj = element;
            InvalidObj.ContractOrderItemID = item.ContractOrderItemID;
            InvalidRowData.push(InvalidObj);
          }
        });
      } else {
        item.ContractOrderEstimateList.forEach(element => {
          if ((!element.PriceListPatternID ||
            !element.Amount) &&
            element.PriceListNo &&
            element.PriceListNo.length > 0) {
            InvalidObj = element;
            InvalidObj.ContractOrderItemID = item.ContractOrderItemID;
            InvalidRowData.push(InvalidObj);
          }
        });
      }
    });
    if (InvalidRowData.length > 0) {
      this.type = 'set-invalid-contract-estimate';
      this.btnclicked = true;
      this.OverstartLeftPosition = 266;
      this.OverstartTopPosition = 140;
      this.OverPopUpParams = {
        // tslint:disable-next-line:max-line-length
        HeaderName: 'ردیف های زیر در فهرست بها یافت نشد یا دارای مبلغ پایه معتبر نمی باشد. خواهشمند است ابتدا نسبت به تکمیل اطلاعات ردیف های مربوطه اقدام فرمایید',
        InvalidEstimateRows: InvalidRowData,
        HaveSave: this.HaveSave,
        PriceListTypeCode: this.PriceListTypeCode,
        CostListFinYearCode: this.CostListFinYearCode
      };
    } else {
      if (rowData) { // RFC 52087
        rowData.forEach(item => {
          try { // این قسمت برای این است که چک کند آیا تعداد به صورت عددی وارد شده است یا خیر
            // tslint:disable-next-line: radix
            const n = Number.parseInt(item.Qty);
            if (n === null || n.toString() === 'NaN') {
              ErrorMessage = 'تعداد باید به صورت عددی وارد شود';
            }
          } catch {
            ErrorMessage = 'تعداد باید به صورت عددی وارد شود';
          }

          if (!item.Qty || item.Qty === 'undefined' || item.Qty === 0 || item.Qty === '0') {
            if (PriceItems === null) {
              PriceItems = item.PriceListNo;
            } else {
              PriceItems = PriceItems + ' و ' + item.PriceListNo;
            }
          }
        });

        // tslint:disable-next-line: max-line-length
        Messagee = ' تعداد، برای ردیف فهرست بها : ' + PriceItems + ' .نمی تواند خالی و یا صفر باشد ' + 'لطفا اصلاح و فایل را مجددا بارگزاری نمایید ';
        if (PriceItems !== null) {
          this.ShowMessageBoxWithOkBtn(Messagee);
          return;
        }
        if (ErrorMessage) {
          this.ShowMessageBoxWithOkBtn(ErrorMessage);
          return;
        }
      }

      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
          item.ContractOrderEstimateList = rowData;
        }
      });

      this.ContractOrderItemList.forEach((item) => {
        this.SumContractOrderItemAmount += item.ContractOrderItemAmount;
        const obj = {
          ContractOrderItemID: item.ContractOrderItemID,
        };
        ContractOrderItemIDList.push(obj);
        let ItemNo = 0;
        item.ContractOrderEstimateList.forEach((Estimate) => {

          const keys = Object.keys(Estimate);
          const EntityTypeItemIDList = [];
          this.EntityList.forEach(Entity => {

            if (Entity.ProductID === item.ProductID) {
              let str = 'Subject' + Entity.EntityTypeID.toString();
              let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
              var key = keys.find(x => x === str);

              if (key && Estimate[key]) {
                if (Estimate[key].EntityTypeItemID) {
                  EntityTypeItemIDList.push(Estimate[key].EntityTypeItemID);
                } else {
                  key = keys.find(x => x === ID);
                  if (key && Estimate[key]) {
                    EntityTypeItemIDList.push(Estimate[key]);
                  }
                }
              }
            }
          });

          ItemNo++;
          this.SumEstimateAmount += Estimate.FinalAmount;
          if (Estimate.ContractOrderEstimateID) {
            const obj1 = {
              ContractOrderEstimateID: Estimate.ContractOrderEstimateID,
              ItemNo: ItemNo,
              PriceListPatternID: Estimate.PriceListPatternID,
              ContractOrderItemID: Estimate.ContractOrderItemID,
              Amount: Estimate.Amount,
              Coef: Estimate.Coef,
              CoefPhrase: Estimate.CoefPhrase,
              Qty: Estimate.Qty,
              RelatedPriceListPatternID: Estimate.RelatedPriceListPatternID ? Estimate.RelatedPriceListPatternID : null,
              EntityTypeItemIDList: EntityTypeItemIDList,
            };
            ContractEstimateList.push(obj1);
          } else {
            const obj1 = {
              ContractOrderEstimateID: 0,
              ItemNo: ItemNo,
              PriceListPatternID: Estimate.PriceListPatternID,
              ContractOrderItemID: item.ContractOrderItemID,
              Amount: Estimate.Amount,
              Coef: Estimate.Coef,
              CoefPhrase: Estimate.CoefPhrase,
              Qty: Estimate.Qty,
              ContractTopicMapCode: Estimate.ContractTopicMapCode ? Estimate.ContractTopicMapCode : null,
              RelatedPriceListPatternID: Estimate.RelatedPriceListPatternID ? Estimate.RelatedPriceListPatternID : null,
              EntityTypeItemIDList: EntityTypeItemIDList,
            };
            ContractEstimateList.push(obj1);
          }
        });
      }
      );
      this.COIgridApi.forEachNode(node => {
        const Obj = {
          ContractOrderItemID: node.data.ContractOrderItemID,
          Weight: node.data.Weight,
        };
        ContractOrderItemWeightValueList.push(Obj);
      });

      this.Cartable.SaveContractOrderEstimate(this.selectedContractID,
        ContractOrderItemIDList,
        ContractEstimateList,
        this.SeasonListParams.selectedObject,
        ContractOrderItemWeightValueList)
        .subscribe(res => {
          this.WasSaveInfo = true;
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          this.ChangeDetection = false;
          this.SetVWOrderItemData();
        },
          err => {
            this.WasSaveInfo = false;
            this.SumContractOrderItemAmount = beforeSumContractOrderItemAmount;
            this.SumEstimateAmount = beforeSumEstimateAmount;
            const str = err.error.split('|');
            if (str[1]) {
              this.ShowMessageBoxWithOkBtn(str[1]);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    }
  }

  SetPriceListTopicList(Param) {
    const rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.PriceList.GetPriceListTopicList(Param, this.PriceListTypeCode + this.CostListFinYearCode, null, null).subscribe( //RFC 52302
      res => {
        if (res) {
          const itemsToUpdate = [];
          res.forEach(element => {
            MaxProp = MaxProp + 1;
            const newItem = {
              ItemNo: MaxProp,
              PriceListPatternID: element.PriceListPatternID,
              ContractOrderItemID: element.selectedContractOrderItemID,
              PriceListNo: element.PriceListTopicCode,
              PriceListName: element.PriceListTopicName,
              WorkUnitName: element.WorkUnitName,
              WorkUnitCode: res[0].WorkUnitCode,
              Amount: element.Amount,
              IsStar: element.IsStar,
              Qty: 1,
              FinalAmount: 1 * element.Amount
            };
            itemsToUpdate.push(newItem);
          });
          this.gridApi.updateRowData({ add: itemsToUpdate });
        }
      }
    );
  }

  onCellValueChanged(event) {
    const value = event.newValue;
    let itemsToUpdate = [];
    this.ChangeDetection = true;
    // if (event.newValue) {value = event.newValue; } else {value = event.oldValue; }
    if (event.colDef && event.colDef.field === 'PriceListNo') {
      const PriceListNovalue = (typeof (value) === 'object') ? value[0] : value;
      const TemprowData = [];
      this.gridApi.forEachNode(res => {
        TemprowData.push(res);
      });
      const IsDuplicate = TemprowData.filter(x => x.rowIndex !== event.rowIndex && x.data.PriceListNo === PriceListNovalue).length > 0;
      if (IsDuplicate && !this.HasCOIEntity) { // RFC 61094-Item3
        this.ShowMessageBoxWithOkBtn('امکان درج ردیف تکراری وجود ندارد.');
      }
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PriceListPatternID = '';
          node.data.PriceListNo = value;
          node.data.PriceListNo = IsDuplicate && !this.HasCOIEntity ? '' : PriceListNovalue;
          node.data.PriceListName = '';
          node.data.WorkUnitName = '';
          node.data.Amount = '';
          node.data.IsStar = '';
          node.data.IsStarCode = '';
          node.data.Qty = '';
          node.data.FinalAmount = '';
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      if (IsDuplicate && !this.HasCOIEntity) {
        return;
      }
      const Values = [];
      if (value != null && value !== '') {
        Values.push(value);
        // if (PriceListNovalue != null && PriceListNovalue !== '') {
        //   Values.push(PriceListNovalue);
        this.PriceList.GetPriceListTopicList(Values, this.PriceListTypeCode + this.CostListFinYearCode, null, null).subscribe(
          res => {
            if (res[0]) {
              itemsToUpdate = [];
              this.gridApi.forEachNode(node => {
                if (node.rowIndex === event.rowIndex) {
                  node.data.PriceListPatternID = res[0].PriceListPatternID;
                  node.data.ContractOrderItemID = this.selectedContractOrderItemID;
                  node.data.PriceListNo = res[0].PriceListTopicCode;
                  node.data.PriceListName = res[0].PriceListTopicName;
                  node.data.WorkUnitName = res[0].WorkUnitName;
                  node.data.WorkUnitCode = res[0].WorkUnitCode;
                  node.data.Amount = res[0].Amount;
                  node.data.IsStar = res[0].IsStar;
                  node.data.IsStarCode = res[0].IsStarCode;
                  node.data.Qty = '';
                  node.data.FinalAmount = node.data.Qty * node.data.Amount;
                  node.data.IsRelated = res[0].IsRelated;
                  itemsToUpdate.push(node.data);
                  if (node.data.IsRelated) {
                    this.ShowMessageBoxWithYesNoBtn('فهرست بهای انتخاب شده دارای ردیف مرتبط است آیا مایل به درج می باشید؟');
                    this.BtnClickedName = 'IsRelatedShow';
                    this.IsNotFound = true;
                  }
                }
              });
              this.gridApi.updateRowData({ update: itemsToUpdate });
              // tslint:disable-next-line:max-line-length
            } else {
              this.ShowMessageBoxWithYesNoBtn(' ردیف وارد شده موجود نیست. آیا مایل به افزودن اطلاعات این ردیف فهرست بها می باشید؟');
              this.BtnClickedName = 'PriceListTopicNotFound';
              this.IsNotFound = true;
            }
          }
        );
      }
    }

    if (event.colDef && event.colDef.field === 'Qty') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount) {
          if (node.data.WorkUnitCode && node.data.WorkUnitCode === 106) // درصد
          {
            node.data.FinalAmount = parseFloat((value / 100).toFixed(2)) * node.data.Amount;
          } else {
            node.data.FinalAmount = value * node.data.Amount;
          }

          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'FinalAmount') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount && node.data.Amount > 0) {
          if (node.data.WorkUnitCode && node.data.WorkUnitCode === 106) // درصد
          {
            node.data.Qty = ((value / node.data.Amount) * 100).toFixed(2);
          } else {
            node.data.Qty = (value / node.data.Amount).toFixed(2);
          }
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.ContractOrderItemList.forEach((item) => {
      if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
        item.ContractOrderEstimateList = rowData;
      }
    });

  }

  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.DoUnConfirm();
      }
    } else {
      this.DOFinalConfirm();
    }
  }
  onConfirmAndSend() {
    this.BtnClickedName = 'BtnConfirm';
    this.IsDeActive = true;
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
    } else {
      const promise = new Promise((resolve, reject) => {
        this.DOConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.LetterNo;
          this.ObjectID = this.SelectedContractOrderID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDeActive = false;
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
                    this.OverstartLeftPosition = 350;
                    this.OverstartTopPosition = 105;
                    this.PercentWidth = null;
                    this.OverMainMinwidthPixel = null;
                    this.MainMaxwidthPixel = null;
                    this.HeightPercentWithMaxBtn = null;
                    this.MinHeightPixel = null;
                    this.OverPopUpParams = {
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
                      CartableUserID: this.CartableUserID,
                    };
                    this.btnclicked = true;
                  }
                }
              }
            );
        } else {
          this.IsDeActive = false;
          this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
        }
      });
    }
  }
  onUnConfirmAndReturn() {
    this.IsDeActive = true;
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.LetterNo;
        this.ObjectID = this.SelectedContractOrderID;
        this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
          .subscribe(
            res => {
              this.IsDeActive = false;
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
                this.OverPopUpParams = {
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
        this.IsDeActive = false;
        this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
      }
    });
  }
  MessageBoxAction(ActionResult) {
    this.btnclicked = false;
    this.type = '';
    if (this.BtnClickedName === 'IsRelatedShow' && ActionResult === 'YES') {
      this.btnClick('Related');
    }

    if (this.BtnClickedName === 'BtnConfirm' && ActionResult === 'YES') {
      this.DOConfirm();
    }

    // tslint:disable-next-line:max-line-length
    if (this.BtnClickedName !== 'IsRelatedShow' && this.BtnClickedName !== 'BtnConfirm' && this.BtnClickedName !== 'PriceListTopicNotFound' && ActionResult === 'YES') {
      this.ContractEstimateClosed.emit(true);
    }

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'YES') {
      if (this.selectedRow !== null) {
        this.type = 'price-list-topic-dataentry-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.OverstartLeftPosition = 455;
        this.OverstartTopPosition = 165;
        this.paramObj = {
          HeaderName: 'افزودن فهرست بها',
          Mode: 'AddBatchTopicInEstimate',
          PriceListTypeCode: this.PriceListTypeCode,
          CostListFinYearCode: this.CostListFinYearCode,
          PriceListTopicCode: this.selectedRow.data.PriceListNo,
          ItemNo: this.selectedRow.data.ItemNo
        };
      }
    }

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'NO') {
      this.IsNotFound = false;
    }

    this.BtnClickedName = '';
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 526;
    this.OverstartTopPosition = 213;
    this.OverPopUpPixelHeight = null;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 157;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
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

  onRowDataChanged(event) {
  }

  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApi.forEachNode(function (node) {
      CurrItemNo++;
      node.data['ItemNo'] = CurrItemNo;
      itemsToUpdate.push(node.data);
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }


  onCoefClick() {
    this.CoefParam = {
      HeaderName: 'ضرایب قرارداد',
      ContractID: this.selectedContractID,
      CoefLevelCode: this.CoefLevelCode,
      ContractCode: this.ContractCode,
      ContractorName: this.ContractorName,
      Subject: this.Subject,
      WasSaveInfo: this.WasSaveInfo
    };
    this.btnclicked = true;
    this.type = 'contract-coef';
    this.OverstartLeftPosition = 74;
    this.OverstartTopPosition = 19;
  }

  onContractOrderItemCoefClick() {
    if (!this.selectedContractOrderItemID) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
      return;
    }
    this.CoefParam = {
      HeaderName: 'ضرایب ردیف قرارداد',
      ContractID: this.selectedContractID,
      ContractOrderItemID: this.selectedContractOrderItemID,
      CoefLevelCode: this.CoefLevelCode,
      ProductName: this.ProductName,
      ProductCode: this.ProductCode,
      Amount: this.Amount,
      RegionCode: this.RegionCode,
      ProductID: this.SelectedProductID,
      WasSaveInfo: this.WasSaveInfo
    };
    this.btnclicked = true;
    this.type = 'contract-orderitem-coef';
    this.OverstartLeftPosition = 74;
    this.OverstartTopPosition = 19;
  }

  ReturendCoefLevelCode(CoefLevelCode) {
    if (CoefLevelCode) {
      this.CoefLevelCode = CoefLevelCode;
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      if (!this.PopupParam || !this.PopupParam.IsWFShow) {// FromCartable
        this.gridHeight = changes.PopupMaximized.currentValue ? 59 : 58;
      } else {
        this.gridHeight = changes.PopupMaximized.currentValue ? 59 : 57;
      }
      this.gridEstimateHeight = changes.PopupMaximized.currentValue ? 90 : 89;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 87.6 : 87;
    }
  }

  OnGroupBtnClick(event) {
    this.OverstartLeftPosition = 60;
    this.OverstartTopPosition = 10;
    this.OverPopUpParams = {
      CostListFinYearCode: this.CostListFinYearCode,
      PriceListPatternID: this.ContractPriceListPatternID,
      GroupSelected: true
    };
    this.type = 'editor-select-price-list';
    this.btnclicked = true;
  }
  OnRowBtnClick(event) {
    if (event === 'ContractOrder') {
      this.AddContractOrder();
      return;
    }
  }
  AddContractOrder() {
    this.type = 'user-work-log-Contract-Order';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.OverstartLeftPosition = 17;
    this.OverstartTopPosition = 10;
    this.OverPopUpPixelHeight = 645;
    this.MainMaxwidthPixel = null;
    this.OverPopUpParams = {
      IsEstimate: true,
      ModuleCode: this.ModuleCode
    };
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
        if (this.FinalConfirmCode || this.FinalCancelCode) {
          if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
            this.ShowMessageBoxWithOkBtn('بازگشت از تایید نهایی برآورد اولیه با موفقیت انجام شد');
            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تایید نهایی';
            this.btnConfirmIcon = 'ok';
          } else {
            this.ShowMessageBoxWithOkBtn('تایید نهایی برآورد اولیه با موفقیت انجام شد');
            this.ReadyToConfirm = 1;
            this.btnConfirmName = 'بازگشت از تایید نهایی';
            this.btnConfirmIcon = 'cancel';
          }
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
        });
  }

  DOConfirm(alert = true, resolve = null) {
    let RowData = [];
    this.gridApi.forEachNode(node => {
      RowData.push(node);
    });
    if (RowData === null || RowData.length === 0) {
      this.ShowMessageBoxWithOkBtn('امکان تایید، بدون وارد کردن برآورد وجود ندارد');
    } else {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.SelectedContractOrderID,
        this.RegionCode,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        null,
        null,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('تایید برآورد اولیه با موفقیت انجام شد');
          }
          this.RefreshCartable.RefreshCartable();
          if (this.CancelCode === 22) {
            this.ReadyToConfirm = 1;
            this.btnConfirmName = 'عدم تایید';
            this.btnConfirmIcon = 'cancel';
          } else {
            this.HaveConfirm = false;
          }
          resolve(true);
        },
          err => {
            resolve(false);
            const str = err.error.split('|');
            if (str[1]) {
              this.ShowMessageBoxWithOkBtn(str[1]);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    }
  }
  DoUnConfirm(alert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.SelectedContractOrderID,
      this.RegionCode,
      this.ModuleCode,
      0,
      this.WorkflowObjectCode,
      null,
      null,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        if (alert) {
          this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
        }
        if (this.ConfirmCode === 21) {
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';
        } else {
          this.HaveConfirm = false;
        }
        resolve(true);
      },
        err => {
          resolve(false);
          const str = err.error.split('|');
          if (str[1]) {
            this.ShowMessageBoxWithOkBtn(str[1]);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }
  GetAllPupUpOutPutParam(params) {
    switch (this.type) {
      case 'set-invalid-contract-estimate':
        if (params && params.length > 0) {
          const itemsToUpdate = [];
          this.ContractOrderItemList.forEach((item) => {
            if (item.ContractOrderItemID !== this.selectedContractOrderItemID) {
              item.ContractOrderEstimateList.forEach(element => {
                const CurrObj = params.filter(x =>
                  x.ItemNo === element.ItemNo &&
                  x.ContractOrderItemID === item.ContractOrderItemID)[0];
                if (CurrObj && CurrObj.PriceListPatternID) {
                  delete CurrObj.ContractOrderItemID;
                  element = CurrObj;
                }
              });
            }
          });
          this.gridApi.forEachNode(function (node) {
            const CurrObj = params.filter(x => x.ItemNo === node.ItemNo && x.ContractOrderItemID === this.selectedContractOrderItemID)[0];
            if (CurrObj && CurrObj.PriceListPatternID) {
              delete CurrObj.ContractOrderItemID;
              node.data = CurrObj;
              itemsToUpdate.push(node.data);
            }
          });
          this.gridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      case 'related-price-list':
        const rowData = [params];
        this.gridApi.updateRowData({ add: rowData });
        this.RefreshItemNo();
        break;
      default:
        break;
    }
  }

  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    let SumFinalFAmount = 0;
    let SumFinalSAmount = 0;
    let SumFinalMAmount = 0;
    let SumFinallAmount = 0;
    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.FinalAmount) {
          SumFinalAmount = SumFinalAmount + node.data.FinalAmount;
        }
        if (node.data.IsStarCode != null && !isUndefined(node.data.IsStarCode) && node.data.IsStarCode === 0 && node.data.FinalAmount) {
          SumFinalFAmount = SumFinalFAmount + node.data.FinalAmount;
        }
        if (node.data.IsStarCode && (node.data.IsStarCode === 1 || node.data.IsStarCode === 3) && node.data.FinalAmount) {
          SumFinalSAmount = SumFinalSAmount + node.data.FinalAmount;
        }
        if (node.data.IsStarCode && node.data.IsStarCode === 2 && node.data.FinalAmount) {
          SumFinalMAmount = SumFinalMAmount + node.data.FinalAmount;
        }
        if (node.data.Amount) {
          SumFinallAmount = SumFinallAmount + Number(node.data.Amount);
        }
      });
    }
    this.SumFinalEstimateAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalEstimateFAmount = SumFinalFAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalEstimateSAmount = SumFinalSAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalEstimateMAmount = SumFinalMAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumAmount = SumFinallAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  OnRowDataChanged() {
    this.SetSumFinalAmount();
  }

  OnRowDataUpdated() {
    this.SetSumFinalAmount();
  }

  OnFilterChanged() {
    this.SetSumFinalAmount();
  }
  PlcOutPutOperation(event) {
    if (event.data) {
      const DataToAdd = [];
      event.data.forEach(r => {
        r.IsDifferentAmount = r.ExcelAmount ? r.ExcelAmount !== r.Amount : false;
        r.Amount = r.IsStar === '*' ? r.ExcelAmount : r.ExcelAmount ? r.ExcelAmount : r.Amount;
        r.FinalAmount = r.Qty * r.Amount;
        DataToAdd.push(r);
      });
      this.gridApi.updateRowData({ add: DataToAdd });
      this.RefreshItemNo();
    }
  }
  AddContractOrderList(ContractId) {

    this.contractpaydetail.GetLastContractOrder(ContractId, true).subscribe(res => {
      if (res) {
        const itemsToUpdate = [];
        this.COIgridApi.forEachNode(node => {
          const ContractOrderObj = res.find(x => x.ProductID === node.data.ProductID);
          if (ContractOrderObj) {
            ContractOrderObj.ContractOrderEstimateList.forEach(element => {

              const newItem = {
                PriceListPatternID: element.PriceListPatternID,
                PriceListNo: element.PriceListNo,
                PriceListName: element.PriceListName,
                WorkUnitName: element.WorkUnitName,
                PriceListAmount: element.PriceListAmount,
                IsStar: element.IsStar,
                Qty: element.Qty,
                Lenght: element.Lenght,
                Width: element.Width,
                Height: element.Height,
                Area: element.Area,
                Weight: element.Weight,
                Subject: element.Subject,
                OperationNote: element.OperationNote,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable,
                ContractOrderEstimateID: -1,
                RelatedPriceListPatternID: element.PriceListPatternID,
                ContractOrderItemID: node.data.ContractOrderItemID,
                XValue: element.XValue,
                ItemNo: 1
              };

              itemsToUpdate.push(newItem);
              node.data.ContractOrderEstimateList.push(newItem);
            });

            this.gridApi.updateRowData({ add: itemsToUpdate });
            this.RefreshItemNo();
          }
        });
      }
    });
  }

  getOutPutParam(event) {
    switch (this.type) {
      case 'editor-select-price-list':
        this.SetPriceListTopicList(event);
        break;
      case 'app-excel-load-data':
        this.loadFromExcel(event);
        break;
      case 'price-list-topic-dataentry-page':
        this.AddPopUpBtnClick(event);
        break;
      case 'price-list-correction':
        this.PlcOutPutOperation(event);
        break;
      case 'user-work-log-Contract-Order':
        this.AddContractOrderList(event);
        break;
      case 'set-invalid-contract-estimate':
        if (event && event.length > 0) {
          const itemsToUpdate = [];
          this.ContractOrderItemList.forEach((item) => {
            if (item.ContractOrderItemID !== this.selectedContractOrderItemID) {
              item.ContractOrderEstimateList.forEach(element => {
                const CurrObj = event.filter(x =>
                  x.ItemNo === element.ItemNo &&
                  x.ContractOrderItemID === item.ContractOrderItemID)[0];
                if (CurrObj && CurrObj.PriceListPatternID) {
                  delete CurrObj.ContractOrderItemID;
                  element = CurrObj;
                }
              });
            }
          });
          this.gridApi.forEachNode(function (node) {
            const CurrObj = event.filter(x => x.ItemNo === node.ItemNo && x.ContractOrderItemID === this.selectedContractOrderItemID)[0];
            if (CurrObj && CurrObj.PriceListPatternID) {
              delete CurrObj.ContractOrderItemID;
              node.data = CurrObj;
              itemsToUpdate.push(node.data);
            }
          });
          this.gridApi.updateRowData({ update: itemsToUpdate });
        }
        break;
      case 'contract-orderitem-coef':
        this.ReturendCoefLevelCode(event);
        break;
      case 'message-box':
        if (this.IsEndFlow) {
          this.Cartable.UserConfirmWorkFlow(
            this.CurrWorkFlow,
            this.selectedRow.data.WorkflowID,
            this.WorkFlowTransitionID,
            null,
            '',
            this.selectedRow.data.ObjectNo,
            this.selectedRow.data.WorkflowTypeCode,
            this.selectedRow.data.WorkflowTypeName,
            this.selectedRow.data.ObjectID,
            this.selectedRow.data.CartableUserID,
          )
            .subscribe(res => {
              this.RefreshCartable.RefreshCartable();
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
        break;
      case 'related-price-list':
        const rowData = [event];
        this.gridApi.updateRowData({ add: rowData });
        this.RefreshItemNo();
        break;
      default:
        break;
    }
  }

  ViewTypeChange() {
    switch (Number(this.ModuleViewTypeCode)) {
      case 1:
        this.IsEditable = true;
        break;
      case 2:
        this.IsEditable = false;
        break;
      default:
        this.IsEditable = true;
        break;
    }
  }

  ShowContractCase() {
    this.type = 'contract-case';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverPixelWidth = 1290;
    this.OverstartLeftPosition = 50;
    this.OverstartTopPosition = 4;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 630;
    this.OverPopUpPixelHeight = 630;
    this.paramObj = {
      HeaderName: this.PopupParam.HeaderName,
      ModuleCode: this.PopupParam.ModuleCode ? this.PopupParam.ModuleCode : this.PopupParam.selectedRow.data.ModuleCode,
      selectedRow: this.PopupParam.selectedRow,
      GridHeightInTab: 100,
      PanelHeightInTab: 99,
      HaveSave: false,
      IsViewable: true,
      IsEditable: false,
      SelectedContractID: this.selectedContractID,
      ModuleViewTypeCode: 5555,
      ProductRequestID: this.PopupParam.selectedRow.data.ProductRequestID,
    };
    this.btnclicked = true;
  }

  ColumnDefinition() {
    this.columnDef22 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ردیف فهرست بها',
        field: 'PriceListNo',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از فهرست بها',
        cellEditorParams: {
          SearchPopupType: 'editor-select-price-list',
          PopupParam: { CostListFinYearCode: this.CostListFinYearCode, PriceListPatternID: this.ContractPriceListPatternID }
        },
        cellRenderer: 'SeRender',
        valueFormatter: (params) => {
          if (params.value) {
            return params.value[0].PriceListTopicCode;
          } else {
            return '';
          }
        },
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        width: 140,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListName',
        width: 230,
        resizable: true,
      },
      {
        headerName: 'نوع ردیف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'WorkUnitName',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        HaveThousand: true,
        width: 80,
        resizable: true,
        editable: (params) => {
          return (params.data.IsStarCode === 3 || params.data.IsStarCode === 1) && this.IsEditable;
        }
      },
      {
        headerName: 'مقدار',
        field: 'Qty',
        width: 80,
        HaveThousand: true,
        resizable: true,
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ با احتساب ضریب ردیف',
        field: 'FinalAmountCoef',
        HaveThousand: true,
        width: 170,
        resizable: true,
        valueParser: numberValueParser
      },
      {
        headerName: 'ضریب ردیف',
        field: 'Coef',
        HaveThousand: true,
        width: 100,
        resizable: true,
        editable: false,
        valueParser: numberValueParser
      },
    ];

    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }

    if (this.EntityList.length === 0 && this.selectedContractID) {
      this.ProductRequest.GetProductRequestEntityList(this.selectedContractID, null, null).subscribe(
        res => {
          if (res && res.length > 0) { // RFC 61094-item3
            this.HasCOIEntity = true;
          } else if (res && res.length === 0) {
            this.HasCOIEntity = false;
          } else {
            this.HasCOIEntity = false;
          }
          this.EntityList = res;
          this.EntityList.forEach(i => {
            if (i.ProductID === this.SelectedProductID) {
              const obj = {
                index: i.EntityTypeID,
                headerName: i.Subject,
                field: 'Subject' + i.EntityTypeID.toString(),
                width: 200,
                editable: true,
                resizable: true,
                cellEditorFramework: NgSelectVirtualScrollComponent,
                cellEditorParams: {
                  Params: this.NgSelectContractEntityItemParams,
                  Items: [],
                  Owner: this
                },
                cellRenderer: 'SeRender',
                valueFormatter: function currencyFormatter(params) {
                  if (params.value) {
                    return params.value.Subject;
                  } else {
                    return '';
                  }
                },
              };
              this.columnDef22.push(obj);
            }
          });
          this.columnDef2 = this.columnDef22;
          this.setExcelHeader();
        }
      );
    }

    if (this.EntityList.length > 0) {
      this.HasCOIEntity = true;
      this.EntityList.forEach(i => {
        if (i.ProductID === this.SelectedProductID) {
          this.columnDef2 = [];
          const obj = {
            index: i.EntityTypeID,
            headerName: i.Subject,
            field: 'Subject' + i.EntityTypeID.toString(),
            width: 200,
            editable: true,
            resizable: true,
            cellEditorFramework: NgSelectVirtualScrollComponent,
            cellEditorParams: {
              Params: this.NgSelectContractEntityItemParams,
              Items: [],
              Owner: this
            },
            cellRenderer: 'SeRender',
            valueFormatter: function currencyFormatter(params) {
              if (params.value) {
                return params.value.Subject;
              } else {
                return '';
              }
            },
          };
          this.columnDef22.push(obj);
        }
      });
      this.columnDef2 = this.columnDef22;
      this.setExcelHeader();
    }
  }

  setExcelHeader() {
    const ExceleHeader = this.columnDef2;

    this.ExceleColDef = this.columnDef2;
    this.ExceleColDef[2].editable = true;
    this.ExceleColDef[7].editable = false;
    this.Excel_Header_Param = {
      colDef2: this.ExceleColDef
    };
    this.colDef2 = this.ExceleColDef;

    if (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 2 && this.PopupParam.PrivateType === 'Cartable') {
      this.DisabledComponents = true;
      this.ExceleColDef[0].editable =
        this.ExceleColDef[1].editable =
        this.ExceleColDef[2].editable =
        this.ExceleColDef[3].editable =
        this.ExceleColDef[4].editable =
        this.ExceleColDef[5].editable =
        this.ExceleColDef[6].editable = false;
    }
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, null, this.selectedContractID, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });

    }
  }
}
