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
import { OverPopUpCellEditorComponent } from 'src/app/Shared/OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { isUndefined } from 'util';
import { ContractEstimateService } from 'src/app/Services/ContractService/ContractEstimates/ContractEstimateService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ContractOrderService } from 'src/app/Services/ContractService/ContractOrderServices/ContractOrderService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { GridOptions } from 'ag-grid-community';
declare var jquery: any;
declare var $: any;
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-pay-item-estimate-page',
  templateUrl: './contract-pay-item-estimate-page.component.html',
  styleUrls: ['./contract-pay-item-estimate-page.component.css']
})
export class ContractPayItemEstimatePageComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  MessageBoxResult = false;
  columnDef1;
  defaultColDef1;
  ContractPayItemEstimateList: any;
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
  IsEditable = true;
  ISEstimateGridEditable = true;
  dgCPHeight = 91;
  dgCPEHeight = 90;
  // btnConfirmName;
  // btnConfirmIcon;
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
  CostListFinYearCode;
  PriceListPatternID;
  CostFactorID;
  CostContractID;
  HaveMaxBtn = false;
  selectedRow: any;
  ModuleCode: any;
  SelectedProductName;
  SelectedContractPayItemID;
  ContractOrderID;
  IsDown = false;
  Subject;
  IsNotFound = false;
  value: any;
  PriceListAmount;
  CalcFunction;
  StarCodeList;
  StarCodeParams = {
    bindLabelProp: 'StarCodeName',
    bindValueProp: 'StarCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  IsStarCodeNameEditable: boolean;
  IsAmountEditable: boolean;
  ContractID;
  SumFinalEstimateFAmount = '0';
  SumFinalEstimateSAmount = '0';
  SumFinalEstimateMAmount = '0';
  SumFinalItemAmount = '0';
  SumFinalAmountCOEFPact = '0';
  SumFinalEstimateAmount = '0';
  DisplayControlls = true;
  CartableUserID: any;
  CurrWorkFlow: any;
  EstimateList = [];
  beforeDetail = 0;
  SumTotalAmount;
  // RFC 52262
  ShowWorkflowButtons = true;
  ISSendAndConfirm = true;
  ISDisabledConfirmAndReturnBtn = true;
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
  EntityList = [];
  PriceListTopicCodeName;
  PriceListTypeCodeName;
  PriceListFineYearName;
  PriceListTypeName;
  ExcelData;
  PlcParams;
  ButtonsPlaceWidthPercent = 61.5;
  LetterNo;
  LetterDatePersian;
  ContractNo;
  ContractOrderId;
  HaveAlertToFinance = false;
  IsAdmin;
  IsConfirm: number;
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

  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.HasNotCapacity) {
        return { 'background-color': '#fc9aa5' };
      }
    }
  };
  CanDateChange = false;
  ContractProposalCoef = 0;
  Percent25PriceListPatterns;
  constructor(private router: Router,
    private contractpaydetail: ContractPayDetailsService,
    private FinYear: FinYearService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private PriceList: PriceListService,
    private Cartable: CartableServices,
    private ContractList: ContractListService,
    private contractMinutes: ContractMinutesService,
    private RefreshCartable: RefreshServices,
    private ContractStima: ContractEstimateService,
    private ContractOrder: ContractOrderService,
    private FlowService: WorkflowService,
    private route: ActivatedRoute,
    private CommonService: CommonServices,
    private ProductRequest: ProductRequestService,
    private Report: ReportService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
    this.StarCodeList = [{ StarCode: '0', StarCodeName: 'جدید' },
    { StarCode: '1', StarCodeName: 'فاکتوری' }];
  }

  ngOnInit() {
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.ContractID = this.PopupParam.SelectedContractID;
    this.CostFactorID = this.PopupParam.SelectedCPCostFactorID;
    this.ContractPayID = this.PopupParam.SelectedContractPayID;
    this.ContractCode = this.PopupParam.ContractCode;
    this.Subject = this.PopupParam.Subject;
    this.ContractorName = this.PopupParam.ContractorName;
    this.ContractOperationId = this.PopupParam.ContractOperationID;
    forkJoin(
      [
        this.User.CheckAdmin(),
        this.ContractList.GetContractPrposalCoef(this.ContractID),
      ]
    ).subscribe(res => {
      this.IsAdmin = res[0];
      this.ContractProposalCoef = res[1];
    });

    // tslint:disable-next-line: max-line-length
    this.ModuleCode = this.ModuleCode ? this.ModuleCode : 2516;
    this.ContractPayItemEstimateList = of([]);
    if (this.PopupParam.PriceListTypeCode) {
      this.PriceListTypeCode = this.PopupParam.PriceListTypeCode;
      this.PriceListTypeName = this.PopupParam.PriceListTypeName;
      this.PriceListTypeCodeName = this.PriceListTypeCode + ' - ' + this.PriceListTypeName;
      this.CostListFinYearCode = this.PopupParam.CostListFinYearCode;
      this.PriceListFineYearName = this.PopupParam.PriceListFineYearName;
      this.PriceListPatternID = this.PopupParam.PriceListPatternID;
      // this.PriceListTopicCodeName = this.CostListFinYearCode + ' - ' + this.PriceListFineYearName;
    } else {
      this.ContractList.GetBalanceFactors(this.ContractID).subscribe(res => {
        this.PriceListTypeCode = res[0].PriceListTypeCode;
        this.CostListFinYearCode = res[0].CostListFinYearCode;
        this.PriceListFineYearName = res[0].PriceListFineYearName;
        this.PriceListTypeCodeName = res[0].PriceListTypeCode + ' - ' + res[0].PriceListTypeName;
        // this.PriceListTopicCodeName = res[0].PriceListFineYearCode + ' - ' + res[0].PriceListFineYearName;
      });
    }
    if (this.PopupParam.IsViewable) {
      this.HaveSave = false;
      this.dgCPHeight = 91;
      this.dgCPEHeight = 90;
      this.IsEditable = false;
      this.ISEstimateGridEditable = false;
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
  ColumnDefintion() {
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
        resizable: true
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true
      },
      {
        headerName: 'مبلغ متره برآورد',
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
    ];

    this.columnDef22 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'شرح عملیات',
        field: 'OperationNote',
        width: 90,
        resizable: true,
        editable: this.DisplayControlls,
      },
      {
        headerName: 'صورتجلسه',
        field: 'ContractMinutes',
        width: 140,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'ContractMinutes',
          bindValueProp: 'ContractMinutesID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ContractMinutes;

          } else {
            return '';
          }
        }
      },
      {
        headerName: 'کد فهرست بها',
        field: 'PriceListNo',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از فهرست بها',
        cellEditorParams: {
          SearchPopupType: 'editor-select-price-list',
          PopupParam: { CostListFinYearCode: this.CostListFinYearCode, PriceListPatternID: this.PriceListPatternID }
        },
        cellRenderer: 'SeRender',
        valueFormatter: (params) => {
          if (params.value) {
            return params.value[0].PriceListTopicCode;
          } else {
            return '';
          }
        },
        editable: this.DisplayControlls,
        width: 140,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListName',
        width: 330,
        editable: this.DisplayControlls,
        resizable: true
      },
      {
        headerName: 'نوع ردیف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'ج/فا',
        field: 'StarCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.StarCodeParams,
          Items: this.StarCodeList,
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value || params.value === 0) {
            return params.value.StarCodeName;
          } else {
            return '';
          }
        },
        editable: (params) => {
          if (this.DisplayControlls !== true) {
            return this.DisplayControlls;
          } else {
            //return params.data.IsStarCodeNameEditable;
            return true;
          }
        },
        width: 90,
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
        editable: (params) => {
          if (this.DisplayControlls !== true) {
            return this.DisplayControlls;
          } else {
            return params.data.IsAmountEditable;
          }
        },
        HaveThousand: true,
        width: 80,
        resizable: true,
      },
      {
        headerName: 'مقدار',
        field: 'Qty',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'طول',
        field: 'Lenght',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'عرض',
        field: 'Width',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'ارتفاع',
        field: 'Height',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'سطح',
        field: 'Area',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'وزن',
        field: 'Weight',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'جمع جزیی',
        field: 'SumDetailAmount',
        width: 70,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'جمع کل',
        field: 'SumTotalAmount',
        width: 70,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'ضریب',
        field: 'Coef',
        width: 55,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: {
          IsFloat: true,
        },
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
        headerName: 'جمع بدون احتساب ضریب',
        field: 'SumTAmount', // ضرب مقدار در مبلغ واحد  RFC 60017
        width: 170,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'جمع با احتساب ضریب',
        field: 'SumTAmountCoef',  // ضرب مقدار در  ضریب در مبلغ واحد  RFC 60017
        width: 170,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'توضیحات',
        field: 'Subject',
        width: 150,
        HaveThousand: true,
        resizable: true,
        editable: this.DisplayControlls,
      }];

    if (this.EntityList.length === 0) {
      this.ProductRequest.GetProductRequestEntityList(this.ContractID, null, null).subscribe(
        res => {
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
        }
      );
    }

    if (this.EntityList.length > 0) {
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
    }

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
      this.ContractPayStartDate = this.ContractDetails.FromContractDateString;
      this.ContractPayEndDate = this.ContractDetails.ToContractDateString;
      this.CanDateChange = false;
      this.ContractPayDate = res[3];
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
    this.RegionCode = this.PopupParam.RegionCode;
    if (!this.PopupParam.IsViewable) { // مشاهده درخواست پرداخت نباشد
      this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
      this.WorkFlowID = this.PopupParam.WorkFlowID;
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
        this.IsConfirm = this.ContractDetails.IsConfirm;
        this.ContractDetails.ContractPayItemViewList.forEach(
          item => {
            if (item.ContractPayItemLists && item.ContractPayItemLists.length > 0) {
              item.ContractPayItemLists.forEach(itemobj => {
                itemobj.ContractPayEntityItemList.forEach(
                  i => {
                    let Name = 'Subject' + i.EntityTypeID.toString();
                    let ID = 'EntityTypeItemID' + i.EntityTypeID.toString();
                    itemobj[Name] = i.Subject;
                    itemobj[ID] = i.EntityTypeItemID;

                  });
              });
            }
          });
        this.ContractPayItemList = this.ContractDetails.ContractPayItemViewList;
        this.ContractOperationName = this.ContractDetails.ContractOperationName;
        this.IsDown = true;
        let SumFinalItemAmount = 0;
        let SumFinalAmountCOEFPact = 0;
        this.ContractPayItemList.forEach(node => {
          SumFinalItemAmount = SumFinalItemAmount + node.AmountCOEF;
          SumFinalAmountCOEFPact = SumFinalAmountCOEFPact + node.AmountCOEFPact;
        });
        this.SumFinalItemAmount = SumFinalItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalAmountCOEFPact = SumFinalAmountCOEFPact.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  onChangeFinYearObj(newObj) {
    this.FinYearParams.selectedObject = newObj;
  }

  onChangeContractAgentObj(newObj) {
    this.type = '';
    this.btnclicked = false;
    this.ContractAgentParams.selectedObject = newObj;
    if (this.PopupParam.Mode === 'EditMode') {
      this.ContractPayItemList = [];
      this.beforeProductID = null;
      this.ngOnInit();
    }
  }

  OnContractPayDateChange(ADate) {
    if (ADate.FullDate !== '' && !this.EditModeInit) {
      this.ContractPayDate = ADate.MDate;
      if (this.CanDateChange) {
        this.ShowMessageBoxWithYesNoBtn(' آیا می خواهید اقلام درخواست پرداخت نیز تغییر نماید؟');
        this.BtnClickedName = 'IsDateChange';
      } else {
        this.contractpaydetail.GetContractOrder(this.PopupParam.SelectedContractID,
          this.ContractPayNo, ADate.MDate, null, 1, true,this.ContractOperationId).subscribe(
            ress => {
              ress.forEach(item => {
                item.ContractOrderEstimateList = [];
              });
              this.ContractPayItemList = ress;
              let SumFinalItemAmount = 0;
              let SumFinalAmountCOEFPact = 0;
              this.ContractPayItemList.forEach(node => {
                SumFinalItemAmount = SumFinalItemAmount + node.AmountCOEF;
                SumFinalAmountCOEFPact = SumFinalAmountCOEFPact + node.AmountCOEFPact;
              });
              this.SumFinalItemAmount = SumFinalItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              this.SumFinalAmountCOEFPact = SumFinalAmountCOEFPact.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      this.ContractPayNo, this.ContractPayDate, null, 1, true,this.ContractOperationId).subscribe(
        ress => {
          ress.forEach(item => {
            item.ContractOrderEstimateList = [];
          });
          this.ContractPayItemList = ress;
          let SumFinalItemAmount = 0;
          let SumFinalAmountCOEFPact = 0;
          this.ContractPayItemList.forEach(node => {
            SumFinalItemAmount = SumFinalItemAmount + node.AmountCOEF;
            SumFinalAmountCOEFPact = SumFinalAmountCOEFPact + node.AmountCOEFPact;
          });
          this.SumFinalItemAmount = SumFinalItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.SumFinalAmountCOEFPact = SumFinalAmountCOEFPact.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      if (this.PopupParam.selectedRow.LastContractOrderID) {
        this.ContractOrderID = this.PopupParam.selectedRow.LastContractOrderID;
        this.UpdateContractPay();
      } else {
        this.ContractStima.GetContractOrderIDByContractPay(this.ContractPayDate, this.ContractDetails.ContractPayId).subscribe(res => {
          this.ContractOrderID = res;
          this.UpdateContractPay();
        });
      }
      return;
    }
  }

  dgContractPayItemRowClick(event) {
    this.PriceListTopicName = '';
    this.PriceListTopicUnit = '';
    this.PriceListTopicUnitAmount = '';
    this.SelectedProductID = event.data.ProductID;
    this.SelectedProductName = event.data.ProductName;
    this.IsDisable = false;
    this.ProductIDs = [];
    const rowData = [];

    this.ColumnDefintion();

    if (this.dgEstiateApi) {
      this.dgEstiateApi.forEachNode(function (node) {
        rowData.push(node.data);
      });

      this.dgEstiateApi.updateRowData({ remove: rowData });
    }

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
        false,this.ContractOperationId);


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
    this.CalcFunction = '';
    this.selectedRow = event;
    // tslint:disable-next-line:max-line-length
    this.columnDef2[2].cellEditorParams.Items = this.contractMinutes.
      GetContractMinutesList(this.PopupParam.SelectedContractID,
        null,
        false);

    this.SelectedContractPayItemListID = event.data.ContractPayItemListID;

    if (event.data.PriceListNo) {

      this.PriceListTopicName = event.data.PriceListName;
      this.PriceListTopicUnit = event.data.WorkUnitName;
      this.PriceListTopicUnitAmount = event.data.PriceListAmount;
    } else {
      this.PriceListTopicName = '';
      this.PriceListTopicUnit = '';
      this.PriceListTopicUnitAmount = '';
    }

    if (this.SelectedContractPayItemListID > 0) {

      if (this.selectedRow.data.RelatedPriceListPatternID) {
        this.PriceList.GetRelatedPriceListPattern(this.selectedRow.data.RelatedPriceListPatternID,
          this.selectedRow.data.PriceListPatternID)
          .subscribe(
            res => {
              const rowDataList = [];
              this.dgEstiateApi.forEachNode(function (node) {
                rowDataList.push(node.data);
              });
              const rowData = rowDataList.filter(x => x.PriceListPatternID === this.selectedRow.data.RelatedPriceListPatternID)[0];
              this.CalcFunction = res[0].CalcFunction;
              const XValue = this.selectedRow.data.XValue;
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
    } else {
      this.CalcFunction = this.selectedRow.data.CalcFunction;
    }
  }

  InsertModeRowClick(event, rowData) {

    if (!this.beforeProductID) {
      this.ContractPayItemEstimateList = event.data.ContractOrderEstimateList;
    }

    if (this.beforeProductID && this.beforeProductID !== event.data.ProductID) {

      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          item.data.ContractOrderEstimateList = rowData;
        }
        if (item.data.ProductID === event.data.ProductID) {
          this.ContractPayItemEstimateList = item.data.ContractOrderEstimateList;
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


    this.CalculatePercentCapacity(event.data.ContractOrderEstimateList, event.data.ProductID);



    this.beforeProductID = event.data.ProductID;
  }

  EditModeRowClick(event, rowData) {


    this.SelectedContractPayItemID = event.data.ContractPayItemID;
    if (!this.beforeProductID) {
      this.ContractPayItemEstimateList = event.data.ContractPayItemLists;
    }
    if (this.beforeProductID && this.beforeProductID !== event.data.ProductID) {
      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          item.data.ContractPayItemLists = rowData;
        }
        if (item.data.ProductID === event.data.ProductID) {
          this.ContractPayItemEstimateList = item.data.ContractPayItemLists;
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

    this.CalculatePercentCapacity(event.data.ContractPayItemLists, event.data.ProductID);
    this.beforeProductID = event.data.ProductID;

  }

  CalculatePercentCapacity(EstimateList, ProductID) {

    const itemsToUpdate = [];
    const PriceListPatternIDs = [];

    EstimateList.forEach(element => {
      if (!element.IsCheck25Percent) {
        element.IsCheck25Percent = true;
        PriceListPatternIDs.push(element.PriceListPatternID);
      }
    });

    if (PriceListPatternIDs.length > 0) {
      this.contractpaydetail.CheckIsOver25Percent(this.ContractID, ProductID, this.ContractPayNo, this.ContractPayDate, PriceListPatternIDs).subscribe(
        res => {
          if (res) {
            res.forEach(element => {
              const filterList = EstimateList.filter(x => x.PriceListPatternID === element.PriceListPatternID);
              if (filterList) {
                filterList.forEach(filteritem => {
                  filteritem.HasNotCapacity = element.HasNotCapacity;
                  itemsToUpdate.push(filteritem);
                });
              }
            });

            this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
          }
        }
      );
    }
  }

  onCellValueChanged(event) {
    this.ChangeDetection = true;
    let itemsToUpdate = [];

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
          node.data.ContractOrderEstimateList = [];
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  onContractPayItemEstimateCellValueChanged(event) {
    const value = event.newValue;
    this.ChangeDetection = true;
    let itemsToUpdate = [];
    if (event.colDef && event.colDef.field === 'PriceListNo') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PriceListPatternID = '';
          node.data.PriceListNo = value;
          node.data.PriceListName = '';
          node.data.WorkUnitName = '';
          node.data.StarCodeName = '';
          node.data.Amount = '';
          node.data.IsStar = '';
          node.data.Qty = '';
          node.data.FinalAmount = '';
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      const Values = [];
      if (value != null) {
        Values.push(value);
        this.PriceList.GetPriceListTopicList(Values, this.PriceListTypeCode + this.CostListFinYearCode,
          this.ContractPayDate, this.ContractID).subscribe(
            res => {
              if (res[0]) {
                itemsToUpdate = [];
                let index = -1;
                if (res[0].CalcFunction) {
                  index = res[0].CalcFunction.indexOf('x');
                }
                this.dgEstiateApi.forEachNode(node => {
                  if (node.rowIndex === event.rowIndex) {
                    node.data.PriceListPatternID = res[0].PriceListPatternID;
                    node.data.PriceListNo = res[0].PriceListTopicCode;
                    node.data.PriceListName = res[0].PriceListTopicName;
                    node.data.WorkUnitName = res[0].WorkUnitName;
                    node.data.WorkUnitCode = res[0].WorkUnitCode;
                    // node.data.PriceListAmount = res[0].Amount;
                    node.data.IsStar = res[0].IsStar;
                    node.data.Amount = res[0].CalcFunction ? (res[0].CalcFunction * res[0].Amount) : res[0].Amount;
                    node.data.Amount = (index && index !== -1) ?
                      (res[0].CalcFunction ?
                        (res[0].IsEfectToPrice ? res[0].CalcFunction : res[0].Amount)
                        : res[0].Amount) :
                      (res[0].CalcFunction ?
                        (res[0].IsEfectToPrice ? (res[0].CalcFunction * res[0].Amount) : res[0].Amount)
                        : res[0].Amount);
                    node.data.IsAmountEditable = res[0].IsAmountEditable;
                    node.data.IsStarCodeNameEditable = res[0].IsStarCodeNameEditable;
                    node.data.Coef = res[0].Coef;
                    node.data.Qty = res[0].Qty;
                    itemsToUpdate.push(node.data);
                  }
                });
                this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
              } else {
                this.ShowMessageBoxWithYesNoBtn(' ردیف وارد شده موجود نیست. آیا مایل به افزودن اطلاعات این ردیف فهرست بها می باشید؟');
                this.BtnClickedName = 'PriceListTopicNotFound';
                this.IsNotFound = true;
              }
            }
          );
      }
    }
    // tslint:disable-next-line:max-line-length
    if (event.colDef && event.newValue && (event.colDef.field === 'Qty' ||
      event.colDef.field === 'Lenght' ||
      event.colDef.field === 'Width' ||
      event.colDef.field === 'Height' ||
      event.colDef.field === 'Area' ||
      event.colDef.field === 'Weight')) {
      itemsToUpdate = [];
      let i = 0;
      this.beforeDetail = 0;
      this.dgEstiateApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:radix
          if (event.colDef.field === 'Qty') {
            // node.data.Qty = parseFloat(event.newValue);
          }
          if (event.colDef.field === 'Lenght') {
            // tslint:disable-next-line:radix
            node.data.Lenght = parseFloat(event.newValue);
          }
          if (event.colDef.field === 'Width') {
            // tslint:disable-next-line:radix
            node.data.Width = parseFloat(event.newValue);

          }
          if (event.colDef.field === 'Height') {
            // tslint:disable-next-line:radix
            node.data.Height = parseFloat(event.newValue);
          }
          if (event.colDef.field === 'Area') {
            // tslint:disable-next-line:radix
            node.data.Area = parseFloat(event.newValue);
          }
          if (event.colDef.field === 'Weight') {
            // tslint:disable-next-line:radix
            node.data.Weight = parseFloat(event.newValue);
          }
          let Qty = 0;
          let Lenght = 1;
          let Width = 1;
          let Height = 1;
          let Area = 1;
          let Weight = 1;
          if (node.data.Qty && node.data.Qty !== 0) {
            Qty = node.data.Qty;
          }

          if (node.data.Lenght && node.data.Lenght !== 0) {
            Lenght = node.data.Lenght;
          }

          if (node.data.Width && node.data.Width !== 0) {
            Width = node.data.Width;
          }

          if (node.data.Height && node.data.Height !== 0) {
            Height = node.data.Height;
          }

          if (node.data.Area && node.data.Area !== 0) {
            Area = node.data.Area;
          }

          if (node.data.Weight && node.data.Weight !== 0) {
            Weight = node.data.Weight;
          }

          node.data.SumDetailAmount = Weight * Qty * Lenght * Width * Height * Area;
          this.dgEstiateApi.forEachNode(nodee => { //RFC 52302
            if (node.data.PriceListNo === nodee.data.PriceListNo) {
              if (i === 0) {
                this.beforeDetail = nodee.data.SumDetailAmount;
                nodee.data.SumTotalAmount = this.beforeDetail;
              } else {
                this.beforeDetail = this.beforeDetail + nodee.data.SumDetailAmount;
                nodee.data.SumTotalAmount = this.beforeDetail;
              }
            }
            i = i + 1;
          });
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
    this.type = '';
    this.btnclicked = false;

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
    if (this.BtnClickedName !== 'BtnConfirm' && this.BtnClickedName !== 'PriceListTopicNotFound' &&
      this.BtnClickedName !== 'IsDateChange' && this.BtnClickedName !== 'SaveBtnWithMessage' && ActionResult === 'YES') {
      this.Closed.emit(true);
    }

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'YES') {
      if (this.selectedRow.data.PriceListNo !== null && this.selectedRow.data.PriceListNo !== '') {
        this.type = 'price-list-topic-dataentry-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.OverstartLeftPosition = 455;
        this.OverstartTopPosition = 110;
        this.paramObj = {
          HeaderName: 'افزودن فهرست بها',
          Mode: 'AddBatchTopicInEstimate',
          PriceListTypeCode: this.PriceListTypeCode,
          CostListFinYearCode: this.CostListFinYearCode,
          PriceListTopicCode: this.selectedRow.data.PriceListNo
        };
      }
    }

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'NO') {
      this.IsNotFound = false;
      this.selectedRow.data.PriceListNo = null;
    }

    if (this.BtnClickedName === 'SaveBtnWithMessage' && ActionResult === 'YES') {

      if (this.PopupParam.Mode === 'InsertMode') {
        this.SaveContractPay(true);
      } else {
        this.UpdateContractPay(true);
      }
    }

    this.BtnClickedName = '';
  }

  popupclosed() {

    this.btnclicked = false;
    this.IsNotFound = false;
    if (this.type === 'price-list-topic-dataentry-page') {
      this.selectedRow.data.PriceListNo = null;
    }
    if (this.type === 'contract-pay-coef') {
      this.contractpaydetail.GetContractPay(this.CostFactorID, this.ContractAgentParams.selectedObject).subscribe(ress => {
        this.ContractDetails = ress;
        this.ContractDetails.ContractPayItemViewList.forEach(
          item => {
            if (item.ContractPayItemLists && item.ContractPayItemLists.length > 0) {
              item.ContractPayItemLists.forEach(itemobj => {
                itemobj.ContractPayEntityItemList.forEach(
                  i => {
                    let Name = 'Subject' + i.EntityTypeID.toString();
                    let ID = 'EntityTypeItemID' + i.EntityTypeID.toString();
                    itemobj[Name] = i.Subject;
                    itemobj[ID] = i.EntityTypeItemID;

                  });
              });
            }
          });
        this.ContractPayItemList = this.ContractDetails.ContractPayItemViewList;
        let SumFinalItemAmount = 0;
        let SumFinalAmountCOEFPact = 0;
        this.ContractPayItemList.forEach(node => {
          SumFinalItemAmount = SumFinalItemAmount + node.AmountCOEF;
          SumFinalAmountCOEFPact = SumFinalAmountCOEFPact + node.AmountCOEFPact;
        });
        this.SumFinalItemAmount = SumFinalItemAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.SumFinalAmountCOEFPact = SumFinalAmountCOEFPact.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      });
    }
  }

  SaveContractPay(IsCheck = false) {

    const ContractPayItemList = [];
    let ContractPayItemListDataList = [];
    const DataList = [];
    const InvalidRowData = [];

    this.dgEstiateApi.forEachNode(node => {
      DataList.push(node.data);
    });

    this.gridApi.forEachNode(node => {
      if (node.data.ProductID === this.beforeProductID) {
        node.data.ContractOrderEstimateList = DataList;
      }
    });


    let InvalidObj;
    this.gridApi.forEachNode((node) => {
      node.data.ContractOrderEstimateList.forEach(element => {
        if ((!element.PriceListPatternID || !element.Amount) &&
          element.PriceListNo && element.PriceListNo.length > 0) {
          InvalidObj = element;
          InvalidObj.ContractOrderItemID = node.data.ProductID;
          InvalidRowData.push(InvalidObj);
        }
      });
    });

    if (InvalidRowData.length > 0) {
      this.type = 'set-invalid-contract-estimate';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.OverstartLeftPosition = 266;
      this.OverstartTopPosition = 140;
      this.paramObj = {
        // tslint:disable-next-line:max-line-length
        HeaderName: 'ردیف های زیر در فهرست بها یافت نشد یا دارای مبلغ پایه معتبر نمی باشد . خواهشمند است ابتدا نسبت به تکمیل اطلاعات ردیف های مربوطه اقدام فرمایید',
        InvalidEstimateRows: InvalidRowData,
        HaveSave: this.HaveSave,
        PriceListTypeCode: this.PriceListTypeCode,
        CostListFinYearCode: this.CostListFinYearCode
      };
    } else {
      this.gridApi.forEachNode(node => {
        ContractPayItemListDataList = [];
        let ItemNo = 0;
        node.data.ContractOrderEstimateList.sort(function (obj1, obj2) {
          return obj1.PriceListNo - obj2.PriceListNo;
        });

        node.data.ContractOrderEstimateList.forEach(item => {
          let ContractMinutesID = null;
          let StarCode;
          ItemNo++;
          if (item.ContractMinutes && item.ContractMinutes.ContractMinutesID) {
            ContractMinutesID = item.ContractMinutes.ContractMinutesID;
          }

          if (item.ContractMinutesID) {
            ContractMinutesID = item.ContractMinutesID;
          }

          if (item.StarCodeName && item.StarCodeName.StarCode) {
            StarCode = item.StarCodeName.StarCode;
          } else { StarCode = null; }

          var keys = Object.keys(item);
          const EntityTypeItemIDList = [];
          this.EntityList.forEach(Entity => {
            if (Entity.ProductID === node.data.ProductID) {
              let str = 'Subject' + Entity.EntityTypeID.toString();
              let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();

              var key = keys.find(x => x === str);

              if (key && item[key]) {
                if (item[key].EntityTypeItemID) {
                  EntityTypeItemIDList.push(item[key].EntityTypeItemID);
                } else {
                  key = keys.find(x => x === ID);
                  if (key && item[key]) {
                    EntityTypeItemIDList.push(item[key]);
                  }
                }
              }
            }
          });

          const ListItem = {
            ContractPayItemListID: -1,
            ContractPayItemID: -1,
            ContractMinutesID: ContractMinutesID,
            PriceListPatternID: item.PriceListPatternID,
            IsStarCodeNameEditable: item.IsStarCodeNameEditable,
            PriceListTopicCode: item.PriceListNo,
            OperationNote: item.OperationNote,
            ItemNO: ItemNo,
            Amount: item.Amount,
            StarCode: StarCode,
            IsTransfer: 0,
            RelatedPriceListPatternID: item.RelatedPriceListPatternID ? item.RelatedPriceListPatternID : null,
            XValue: item.XValue ? item.XValue : null,
            FContractPayListDetailObject: {
              ContractPayListDetailID: -1,
              ContractPayItemListID: -1,
              ContractAgentCode: this.ContractAgentParams.selectedObject,
              Qty: parseFloat(item.Qty),
              Lenght: parseFloat(item.Lenght),
              Width: parseFloat(item.Width),
              Height: parseFloat(item.Height),
              Area: parseFloat(item.Area),
              Weight: parseFloat(item.Weight),
              Subject: item.Subject,
              Coef: parseFloat(item.Coef),
            },
            EntityTypeItemIDList: EntityTypeItemIDList,

          };
          ContractPayItemListDataList.push(ListItem);
        });


        if (IsCheck && this.Percent25PriceListPatterns) {
          ContractPayItemListDataList.forEach(item => {
            let Obj = this.Percent25PriceListPatterns.find(x => x.PriceListPatternID === item.PriceListPatternID && x.ProductID === node.data.ProductID);
            if (Obj) {
              //  let Coef = item.FContractPayListDetailObject.Coef ? item.FContractPayListDetailObject.Coef : 1;
              item.FContractPayListDetailObject.Coef = item.FContractPayListDetailObject.Coef &&
                (this.ContractProposalCoef > item.FContractPayListDetailObject.Coef) ? this.ContractProposalCoef : item.FContractPayListDetailObject.Coef;
            }
          });
        }

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
          ContractPayItemListDataList: ContractPayItemListDataList,
         
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
        ContractOperationId: this.ContractOperationId,
        IsConfirm: 0,
      };

      // if (!SumContractPayItemAmount || SumContractPayItemAmount === 0) {
      //   this.ShowMessageBoxWithOkBtn('جمع مبلغ فعلی نمی تواند صفر باشد');
      //   return;
      // }

      // tslint:disable-next-line:max-line-length
      this.ContractStima.GetAllWithContractOrderItemID(this.PopupParam.selectedRow.LastContractOrderID).subscribe(ress => {
        if (ress) {
          this.contractpaydetail.SaveContractPay(
             ContractPayObj,
             ContractPayItemList,
             null,
             false, 
             !IsCheck, 
             false,
             this.ModuleCode,
             null).subscribe((res: any) => {
            if (res.HasNotCapacity) {
              let Str = '';
              this.BtnClickedName = 'SaveBtnWithMessage';
              this.Percent25PriceListPatterns = res.PriceListPatterns;
              res.PriceListPatterns.forEach(element => {
                Str += ' - ' + element.PriceListTopicCode;
              });
              // tslint:disable-next-line: max-line-length
              this.ShowMessageBoxWithYesNoBtn('مبلغ فهارس بهای' + '  ' + Str + ' بیشتر از  25 درصد مبلغ برآورد می باشد . آیا مایل به ادامه هستید ؟ ');
            } else {
              this.BtnClickedName = '';
              this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
              this.ChangeDetection = false;
              this.PopupParam.Mode = 'EditMode';
              this.PopupParam.SelectedCPCostFactorID = res;
              this.beforeProductID = null;
              this.ngOnInit();
            }
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
  }

  UpdateContractPay(IsCheck = false) {
    const ContractPayItemList = [];
    let ContractPayItemLists = [];
    const DataList = [];
    const InvalidRowData = [];

    this.dgEstiateApi.forEachNode(node => {
      DataList.push(node.data);
    });
    this.gridApi.forEachNode(node => {

      if (node.data.ContractPayItemLists && node.data.ProductID === this.beforeProductID) {
        node.data.ContractPayItemLists = DataList;
      }

      if (node.data.ContractOrderEstimateList && node.data.ProductID === this.beforeProductID) {
        node.data.ContractOrderEstimateList = DataList;
      }
    });
    let InvalidObj;
    this.gridApi.forEachNode((node) => {
      if (node.data.ProductID === this.SelectedProductID) {
        DataList.forEach(element => {
          this.PriceListAmount = null;
          if (element.PriceListAmount) {
            this.PriceListAmount = element.PriceListAmount;
          } else if (element.Amount) {
            this.PriceListAmount = element.Amount;
          }
          if ((!element.PriceListPatternID ||
            !this.PriceListAmount) &&
            element.PriceListNo &&
            element.PriceListNo.length > 0) {
            InvalidObj = element;
            InvalidObj.ContractOrderItemID = node.data.ProductID;
            InvalidRowData.push(InvalidObj);
          }
        });
      } else {
        if (node.data.ContractOrderEstimateList) {
          node.data.ContractOrderEstimateList.forEach(element => {
            if (element.PriceListAmount) {
              this.PriceListAmount = element.PriceListAmount;
            } else if (element.Amount) {
              this.PriceListAmount = element.Amount;
            }
            if ((!element.PriceListPatternID ||
              !this.PriceListAmount) &&
              element.PriceListNo &&
              element.PriceListNo.length > 0) {
              InvalidObj = element;
              InvalidObj.ContractOrderItemID = node.data.ProductID;
              InvalidRowData.push(InvalidObj);
            }
          });
        }
        if (node.data.ContractPayItemLists) {
          node.data.ContractPayItemLists.forEach(element => {
            if (element.PriceListAmount) {
              this.PriceListAmount = element.PriceListAmount;
            } else if (element.Amount) {
              this.PriceListAmount = element.Amount;
            }
            if ((!element.PriceListPatternID ||
              !this.PriceListAmount) &&
              element.PriceListNo &&
              element.PriceListNo.length > 0) {
              InvalidObj = element;
              InvalidObj.ContractOrderItemID = node.data.ProductID;
              InvalidRowData.push(InvalidObj);
            }
          });
        }
      }
    });

    if (InvalidRowData.length > 0) {
      this.type = 'set-invalid-contract-estimate';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.OverstartLeftPosition = 266;
      this.OverstartTopPosition = 140;
      this.paramObj = {
        // tslint:disable-next-line:max-line-length
        HeaderName: 'ردیف های زیر در فهرست بها یافت نشد یا دارای مبلغ پایه معتبر نمی باشد . خواهشمند است ابتدا نسبت به تکمیل اطلاعات ردیف های مربوطه اقدام فرمایید',
        InvalidEstimateRows: InvalidRowData,
        HaveSave: this.HaveSave,
        PriceListTypeCode: this.PriceListTypeCode,
        CostListFinYearCode: this.CostListFinYearCode
      };
    } else {

      this.gridApi.forEachNode(node => {
        ContractPayItemLists = [];
        let ContractPayItemID = -1;
        let CostFactorID = -1;
        let ItemNo = 0;
        if (node.data.ContractPayItemID) {
          ContractPayItemID = node.data.ContractPayItemID;
        }

        if (this.CostFactorID && this.CostFactorID !== -1) {
          CostFactorID = this.CostFactorID;
        }

        if (node.data.ContractPayItemLists) {

          node.data.ContractPayItemLists.sort(function (obj1, obj2) {
            return obj1.PriceListNo - obj2.PriceListNo;
          });

          node.data.ContractPayItemLists.forEach(item => {
            var keys = Object.keys(item);

            const EntityTypeItemIDList = [];
            this.EntityList.forEach(Entity => {
              if (Entity.ProductID === node.data.ProductID) {
                let str = 'Subject' + Entity.EntityTypeID.toString();
                let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
                var key = keys.find(x => x === str);

                if (key && item[key]) {
                  if (item[key].EntityTypeItemID) {
                    EntityTypeItemIDList.push(item[key].EntityTypeItemID);
                  } else {
                    key = keys.find(x => x === ID);
                    if (key && item[key]) {
                      EntityTypeItemIDList.push(item[key]);
                    }
                  }
                }
              }
            });

            let ContractPayItemListID = -1;
            let ContractPayListDetailID = -1;
            let ContractMinutesID = null;
            ItemNo++;

            if (item.ContractMinutes && item.ContractMinutes.ContractMinutesID) {
              ContractMinutesID = item.ContractMinutes.ContractMinutesID;
            } else {
              ContractMinutesID = item.ContractMinutesID;
            }

            if (item.ContractPayItemListID) {
              ContractPayItemID = ContractPayItemID;
              ContractPayItemListID = item.ContractPayItemListID;
              ContractPayListDetailID = item.ContractPayListDetailID;
            } else {
              ContractPayItemListID = -1;
              ContractPayListDetailID = -1;
            }

            let Amount = 0;
            let StarCode;
            if (item.Amount) {
              Amount = item.Amount;
            }

            if (!item.Amount) {
              Amount = item.PriceListAmount;
            }

            // if (item.Amount && item.Amount !== item.PriceListAmount && !item.RelatedPriceListPatternID) {
            //   Amount = item.PriceListAmount;
            // }
            if (item.StarCodeName && item.StarCodeName.StarCode) {
              StarCode = item.StarCodeName.StarCode;
            } else { StarCode = item.StarCode; }
            const ItemObj = {
              ContractPayItemListID: ContractPayItemListID,
              ContractPayItemID: ContractPayItemID,
              PriceListPatternID: item.PriceListPatternID,
              IsStarCodeNameEditable: item.IsStarCodeNameEditable,
              PriceListTopicCode: item.PriceListNo,
              ContractMinutesID: ContractMinutesID,
              Amount: Amount,
              ItemNO: ItemNo,
              StarCode: StarCode,
              RelatedPriceListPatternID: item.RelatedPriceListPatternID ? item.RelatedPriceListPatternID : null,
              XValue: item.XValue ? item.XValue : null,
              IsTransfer: (!item.IsTransfer || item.IsTransfer === 0) ? 0 : 1,
              OperationNote: item.OperationNote,
              FContractPayListDetailObject: {
                ContractPayListDetailID: ContractPayListDetailID,
                ContractPayItemListID: ContractPayItemListID,
                ContractAgentCode: this.ContractAgentParams.selectedObject,
                Qty: parseFloat(item.Qty),
                Lenght: parseFloat(item.Lenght),
                Width: parseFloat(item.Width),
                Height: parseFloat(item.Height),
                Area: parseFloat(item.Area),
                Weight: parseFloat(item.Weight),
                Subject: item.Subject,
                Coef: parseFloat(item.Coef),
              },
              EntityTypeItemIDList: EntityTypeItemIDList,
            };
            ContractPayItemLists.push(ItemObj);
          });
        }

        if (node.data.ContractOrderEstimateList) {
          node.data.ContractOrderEstimateList.sort(function (obj1, obj2) {
            return obj1.PriceListNo - obj2.PriceListNo;
          });
          node.data.ContractOrderEstimateList.forEach(item => {
            let ContractPayItemListID = -1;
            let ContractPayListDetailID = -1;
            let ContractMinutesID = null;
            ItemNo++;
            let StarCode;
            var keys = Object.keys(item);
            const EntityTypeItemIDList = [];

            this.EntityList.forEach(Entity => {
              if (Entity.ProductID === node.data.ProductID) {
                let str = 'Subject' + Entity.EntityTypeID.toString();
                var key = keys.find(x => x === str);
                if (key && item[key]) {
                  EntityTypeItemIDList.push(item[key].EntityTypeItemID);
                }
              }
            });

            if (item.ContractMinutes && item.ContractMinutes.ContractMinutesID) {
              ContractMinutesID = item.ContractMinutes.ContractMinutesID;
            }

            if (item.ContractMinutesID) {
              ContractMinutesID = item.ContractMinutesID;
            }

            if (item.ContractPayItemListID) {
              ContractPayItemID = ContractPayItemID;
              ContractPayItemListID = item.ContractPayItemListID;
              ContractPayListDetailID = item.ContractPayListDetailID;
            } else {
              ContractPayItemID = -1;
              ContractPayItemListID = -1;
              ContractPayListDetailID = -1;
            }
            if (item.StarCodeName && item.StarCodeName.StarCode) {
              StarCode = item.StarCodeName.StarCode;
            } else { StarCode = item.StarCode; }

            const ItemObj = {
              ContractPayItemListID: ContractPayItemListID,
              ContractPayItemID: ContractPayItemID,
              PriceListPatternID: item.PriceListPatternID,
              PriceListTopicCode: item.PriceListNo,
              IsStarCodeNameEditable: item.IsStarCodeNameEditable,
              ContractMinutesID: ContractMinutesID,
              ItemNO: ItemNo,
              Amount: item.PriceListAmount,
              StarCode: StarCode,
              OperationNote: item.OperationNote,
              RelatedPriceListPatternID: item.RelatedPriceListPatternID ? item.RelatedPriceListPatternID : null,
              XValue: item.XValue ? item.XValue : null,
              IsTransfer: (!item.IsTransfer || item.IsTransfer === 0) ? 0 : 1,
              FContractPayListDetailObject: {
                ContractPayListDetailID: ContractPayListDetailID,
                ContractPayItemListID: ContractPayItemListID,
                ContractAgentCode: this.ContractAgentParams.selectedObject,
                Qty: parseFloat(item.Qty),
                Lenght: parseFloat(item.Lenght),
                Width: parseFloat(item.Width),
                Height: parseFloat(item.Height),
                Area: parseFloat(item.Area),
                Weight: parseFloat(item.Weight),
                Subject: item.Subject,
                Coef: parseFloat(item.Coef),
              },
              EntityTypeItemIDList: EntityTypeItemIDList,
            };
            ContractPayItemLists.push(ItemObj);
          });
        }

        if (IsCheck && this.Percent25PriceListPatterns) {
          ContractPayItemLists.forEach(item => {
            let Obj = this.Percent25PriceListPatterns.find(x => x.PriceListPatternID === item.PriceListPatternID && x.ProductID === node.data.ProductID);
            if (Obj) {
              //  let Coef = item.FContractPayListDetailObject.Coef ? item.FContractPayListDetailObject.Coef : 1;
              item.FContractPayListDetailObject.Coef = item.FContractPayListDetailObject.Coef &&
                (this.ContractProposalCoef > item.FContractPayListDetailObject.Coef) ? this.ContractProposalCoef : item.FContractPayListDetailObject.Coef;
            }
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
          ContractPayItemListDataList: ContractPayItemLists,
      
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
        IsConfirm: 0,
      };
      // if (!SumContractPayItemAmount || SumContractPayItemAmount === 0) {
      //   this.ShowMessageBoxWithOkBtn('جمع مبلغ فعلی نمی تواند صفر باشد');
      //   return;
      // }
      // tslint:disable-next-line:max-line-length
      this.ContractStima.GetAllWithContractOrderItemID(this.ContractOrderID).subscribe(ress => {
        if (ress) {
          this.contractpaydetail.UpdateContractPay(ContractPayObj,
            ContractPayItemList,
            this.ContractAgentParams.selectedObject,
            this.ModuleCode,
            !IsCheck,
            false,
            null,
            false,
            null
          ).subscribe((res: any) => {
            if (res.HasNotCapacity) {
              let Str = '';
              this.BtnClickedName = 'SaveBtnWithMessage';
              this.Percent25PriceListPatterns = res.PriceListPatterns;
              res.PriceListPatterns.forEach(element => {
                Str += ' - ' + element.PriceListTopicCode;
              });
              this.ShowMessageBoxWithYesNoBtn('مبلغ فهارس بهای' + '  ' + Str + ' بیشتر از  25 درصد مبلغ برآورد می باشد . آیا مایل به ادامه هستید ؟ ');

            } else {
              this.BtnClickedName = '';
              this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
              this.ChangeDetection = false;
              this.beforeProductID = null;
              this.ngOnInit();
            }
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
  }

  BtnArchiveClick() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.OverstartLeftPosition = 285;
    this.OverstartTopPosition = 20;
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
    this.HaveMaxBtn = false;
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

  OnGroupBtnClick(event) {
    this.OverstartLeftPosition = 60;
    this.OverstartTopPosition = 10;
    this.paramObj = {
      CostListFinYearCode: this.CostListFinYearCode,
      PriceListPatternID: this.PopupParam.PriceListPatternID,
      GroupSelected: true
    };
    this.type = 'editor-select-price-list';
    this.btnclicked = true;
    this.HaveMaxBtn = true;
  }

  OnRowBtnClick(event) {

    if (event === 'RowItems') {
      this.AddRowItems();
      return;
    }

    if (event === 'ContractPay') {
      this.AddContractPay();
      return;
    }

    if (event === 'ContractMinutes') {
      this.AddContractMinutes();
      return;
    }

    if (event === 'ContractAgent') {
      this.AddContractPayWithAgent();
      return;
    }
  }

  AddRowItems() {

    if (!this.SelectedProductID) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت انجام این عملیات انتخاب نشده است.');
      return;
    }

    this.OverstartLeftPosition = 100;
    this.OverstartTopPosition = 55;
    this.type = 'selecet-contract-estimate';
    this.btnclicked = true;
    this.HaveMaxBtn = false;

    const PriceListPatternIDs = [-1];
    this.dgEstiateApi.forEachNode(node => {
      PriceListPatternIDs.push(node.data.PriceListPatternID);
    });


    this.paramObj = {
      ContractID: this.PopupParam.SelectedContractID,
      ProductID: this.SelectedProductID,
      PriceListPatternIDs: PriceListPatternIDs,
      ContractPayNo: this.ContractPayNo
    };
  }

  AddContractPay() {

    this.OverstartLeftPosition = 115;
    this.OverstartTopPosition = 70;
    this.type = 'select-contract-pay';
    this.btnclicked = true;
    this.HaveMaxBtn = false;

    this.paramObj = {
      CostFactorID: this.PopupParam.SelectedCostFactorID,
      ContractPayNo: this.ContractPayNo
    };
  }

  AddContractMinutes() {
    this.OverstartLeftPosition = 175;
    this.OverstartTopPosition = 70;
    this.type = 'select-contract-minutes';
    this.btnclicked = true;
    this.HaveMaxBtn = false;

    this.paramObj = {
      ContractID: this.PopupParam.SelectedContractID,
    };
  }

  AddContractPayWithAgent() {
    this.OverstartLeftPosition = 515;
    this.OverstartTopPosition = 95;
    this.type = 'select-contract-agent';
    this.btnclicked = true;
    this.HaveMaxBtn = false;

    this.paramObj = {
      ContractAgentCode: this.ContractAgentParams.selectedObject,
    };
  }
  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.dgEstiateApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
  }
  getOutPutParam(event) {

    if (this.type === 'related-price-list') {
      const rowData = [event];
      this.dgEstiateApi.updateRowData({ add: rowData });
      this.RefreshItemNo();
    }
    if (this.type === 'editor-select-price-list') {
      this.SetPriceListTopicList(event);
      return;
    }

    if (this.type === 'selecet-contract-estimate') {
      let EstimateObj;
      let RowDatas = [];
      const rowData = [];
      this.dgEstiateApi.forEachNode(node => rowData.push(node.data));
      let MaxProp = 0;
      if (rowData.length > 0) {
        MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
      }
      event.forEach(res => {
        MaxProp = MaxProp + 1;
        EstimateObj = {
          PriceListPatternID: res.PriceListPatternID,
          Qty: res.Qty,
        };
        this.EstimateList.push(EstimateObj);
        res.ItemNo = MaxProp;
        // res.Qty = 0;
        RowDatas.push(res);
      });
      this.SetEstimateList(RowDatas);
      return;
    }

    if (this.type === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }

    if (this.type === 'price-list-topic-dataentry-page') {
      this.AddPopUpBtnClick(event);
      return;
    }

    if (this.type === 'select-contract-pay') {
      this.GetContractPay(event);
      return;
    }

    if (this.type === 'select-contract-minutes') {
      this.GetContractMinutes(event);
      return;
    }

    if (this.type === 'set-invalid-contract-estimate') {
      this.SetInvalidContractEstimate(event);
      return;
    }

    if (this.type === 'select-contract-agent') {
      this.GetContractPayWithAgent(event);
      return;
    }
    if (event && this.type === 'work-flow-send') { // RFC 52262
      //  this.IsEditable = false;
      // this.ISSendAndConfirm = true;
      // return;
      this.close();
    }
    if (this.type === 'price-list-correction') {
      this.PlcOutPutOperation(event);
      return;
    }
  }
  PlcOutPutOperation(event) {
    const rowData = [];
    this.beforeDetail = 0;
    this.dgEstiateApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    if (event.data) {
      const DataToAdd = [];
      this.ExcelData.forEach(x => {
        event.data.forEach(r => {
          if (r.ExcelPriceListTopicCode === x.PriceListNo) {
            let Qty = 0;
            let Lenght = 1;
            let Width = 1;
            let Height = 1;
            let Area = 1;
            let Weight = 1;
            if (x.Qty && x.Qty !== 0) {
              Qty = x.Qty;
            }
            if (x.Lenght && x.Lenght !== 0) {
              Lenght = x.Lenght;
            }
            if (x.Width && x.Width !== 0) {
              Width = x.Width;
            }
            if (x.Height && x.Height !== 0) {
              Height = x.Height;
            }
            if (x.Area && x.Area !== 0) {
              Area = x.Area;
            }
            if (x.Weight && x.Weight !== 0) {
              Weight = x.Weight;
            }
            const newItem = {
              ItemNo: MaxProp + 1,
              PriceListPatternID: r.PriceListPatternID,
              PriceListNo: r.PriceListNo,
              PriceListName: r.PriceListName,
              IsStar: r.IsStar,
              WorkUnitName: r.WorkUnitName,
              Amount: r.Amount,
              PriceListAmount: r.Amount,
              IsAmountEditable: r.IsAmountEditable,
              StarCodeName: r.StarCodeName,
              OperationNote: x && x.OperationNote ? x.OperationNote : '',
              Qty: x && x.Qty ? x.Qty : '',
              Lenght: x && x.Lenght ? x.Lenght : '',
              Width: x && x.Width ? x.Width : '',
              Height: x && x.Height ? x.Height : '',
              Area: x && x.Area ? x.Area : '',
              Weight: x && x.Weight ? x.Weight : '',
              Subject: x && x.Subject ? x.Subject : '',
              Coef: x && x.Coef ? x.Coef : '',
              SumDetailAmount: Weight * Qty * Lenght * Width * Height * Area,
            };
            DataToAdd.push(newItem);
          }
        });
      });
      this.dgEstiateApi.updateRowData({ add: DataToAdd });
      this.RefreshItemNo();
    }
  }

  SetInvalidContractEstimate(params) {
    if (params && params.length > 0) {
      const itemsToUpdate = [];

      this.gridApi.forEachNode((node) => {
        if (node.data.ProductID !== this.SelectedProductID) {
          node.data.ContractOrderEstimateList.forEach(element => {
            const CurrObj = params.filter(x =>
              x.ItemNo === element.ItemNo &&
              x.ContractOrderItemID === node.data.ProductID)[0];
            if (CurrObj && CurrObj.PriceListPatternID) {
              delete CurrObj.ContractOrderItemID;
              element = CurrObj;
            }
          });
        }
      });

      this.dgEstiateApi.forEachNode(function (node) {
        const CurrObj = params.filter(x => x.ItemNo === node.ItemNo &&
          x.ContractOrderItemID === this.SelectedProductID)[0];
        if (CurrObj && CurrObj.PriceListPatternID) {
          delete CurrObj.ContractOrderItemID;
          node.data = CurrObj;
          itemsToUpdate.push(node.data);
        }
      });
      this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
    }
  }

  SetEstimateList(event) {
    this.dgEstiateApi.updateRowData({ add: event });
  }

  SetPriceListTopicList(event) {
    const rowData = [];
    this.dgEstiateApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.PriceList.GetPriceListTopicList(event, this.PriceListTypeCode + this.CostListFinYearCode,
      this.ContractPayDate, this.ContractID).subscribe(
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
                PriceListAmount: element.Amount,
                IsStar: element.IsStar,
                Amount: element.Amount,
                StarCodeName: element.StarCodeName,
                FinalAmount: 1 * element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };
              itemsToUpdate.push(newItem);
            });
            this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
          }
        }
      );
  }

  OnImportFromExcelBtnClick() {
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.type = 'app-excel-load-data';
    this.OverstartLeftPosition = 500;
    this.OverstartTopPosition = 140;
    this.Excel_Header_Param = {
      colDef2: this.columnDef2
    };
    this.paramObj = this.Excel_Header_Param;
  }

  loadFromExcel(data) {
    this.ExcelData = data;
    const PriceListCorrectionList = [];
    const priceListIDs = [];
    let CorrectionRequired = false;
    const rowData = [];
    data.forEach((x: any) => {
      if (x.PriceListNo !== undefined) {
        priceListIDs.push(x.PriceListNo);
      }
    });
    this.dgEstiateApi.forEachNode(node => {
      rowData.push(node.data);
    });
    let MaxProp = 1;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
      if (MaxProp === 1)
        MaxProp = MaxProp + 1;
    }
    let RepeatPriceListNo = [];
    // tslint:disable-next-line:max-line-length
    this.PriceList.GetPriceListTopicList(priceListIDs, this.PriceListTypeCode + this.CostListFinYearCode, this.ContractPayDate, this.ContractID)
      .subscribe(
        res => {
          if (res) {
            const itemsToUpdate = [];
            res.forEach(element => {
              let ExcelObjList = [];
              ExcelObjList = data.filter(x => x.PriceListNo === element.PriceListTopicCode);
              ExcelObjList.forEach(item => {
                const ExcelName = item.PriceListName ? item.PriceListName.replace(/ي/g, 'ي').replace(/ك/g, 'ک') : null;
                const DbName = element.PriceListTopicName.replace(/ي/g, 'ي').replace(/ك/g, 'ک');
                RepeatPriceListNo = PriceListCorrectionList.filter(y => y.PriceListTopicCode === item.PriceListNo);
                if (item.PriceListName && ExcelName !== DbName && (element.IsStar === '*')) {
                  CorrectionRequired = true;
                  item.IsInvalid = true;
                  let index = -1;
                  if (element.CalcFunction) {
                    index = element.CalcFunction.indexOf('x');
                  }
                  const newItem = {
                    PriceListTopicCode: item.PriceListNo,
                    ExcelPriceListTopicCode: item.PriceListNo,
                    ExcelPriceListTopicName: item.PriceListName,
                    PriceListTopicName: element.PriceListTopicName,
                    ExcelAmount: item.Amount,
                    Amount: (index && index !== -1) ?
                      (element.CalcFunction ?
                        (element.IsEfectToPrice ? element.CalcFunction : element.Amount)
                        : element.Amount) :
                      (element.CalcFunction ?
                        (element.IsEfectToPrice ? (element.CalcFunction * element.Amount) : element.Amount)
                        : element.Amount),
                    IsStar: element.IsStar,
                    StarCodeName: element.StarCodeName,
                    PriceListPatternID: element.PriceListPatternID,
                    WorkUnitName: element.WorkUnitName,
                    IsWorkCode: element.IsWorkCode,
                    IsWorkCodeParam: element.IsWorkCode ? { WorkCode: 1, WorkName: 'کارکرد' } : { WorkCode: 0, WorkName: 'پايکار ' }
                  };
                  if (RepeatPriceListNo.length < 1) {
                    PriceListCorrectionList.push(newItem);
                  }
                } else {
                  let ExcelObj = item;
                  let Qty = 0;
                  let Lenght = 1;
                  let Width = 1;
                  let Height = 1;
                  let Area = 1;
                  let Weight = 1;
                  if (item.Qty && item.Qty !== 0) {
                    Qty = item.Qty;
                  }
                  if (item.Lenght && item.Lenght !== 0) {
                    Lenght = item.Lenght;
                  }
                  if (item.Width && item.Width !== 0) {
                    Width = item.Width;
                  }
                  if (item.Height && item.Height !== 0) {
                    Height = item.Height;
                  }
                  if (item.Area && item.Area !== 0) {
                    Area = item.Area;
                  }
                  if (item.Weight && item.Weight !== 0) {
                    Weight = item.Weight;
                  }
                  const index = element.CalcFunction ? element.CalcFunction.indexOf('x') : -1;
                  const newItem = {
                    ItemNo: MaxProp,
                    PriceListPatternID: element.PriceListPatternID,
                    PriceListNo: element.PriceListTopicCode,
                    PriceListName: element.PriceListTopicName,
                    WorkUnitName: element.WorkUnitName,
                    PriceListAmount: element.Amount,
                    Amount: (index && index !== -1) ?
                      (element.CalcFunction ?
                        (element.IsEfectToPrice ? element.CalcFunction : element.Amount)
                        : element.Amount) :
                      (element.CalcFunction ?
                        (element.IsEfectToPrice ? (element.CalcFunction * element.Amount) : element.Amount)
                        : element.Amount),
                    IsStar: element.IsStar,
                    IsStarCodeNameEditable: element.IsStarCodeNameEditable,
                    IsAmountEditable: element.IsAmountEditable,
                    StarCodeName: element.StarCodeName,
                    OperationNote: item && item.OperationNote ? item.OperationNote : '',
                    Qty: item && item.Qty ? item.Qty : '',
                    Lenght: item && item.Lenght ? item.Lenght : '',
                    Width: item && item.Width ? item.Width : '',
                    Height: item && item.Height ? item.Height : '',
                    Area: item && item.Area ? item.Area : '',
                    Weight: item && item.Weight ? item.Weight : '',
                    SumDetailAmount: Weight * Qty * Lenght * Width * Height * Area,
                    Subject: item && item.Subject ? item.Subject : '',
                    Coef: item && item.Coef ? item.Coef : '',
                  };
                  data.splice(data.indexOf(ExcelObj), 1);
                  itemsToUpdate.push(newItem);
                  MaxProp = MaxProp + 1;
                }
              });
            });
            data.forEach((x: any, i) => {
              x['ItemNo'] = MaxProp;
              if (!x.IsInvalid) {
                let Qty = 0;
                let Lenght = 1;
                let Width = 1;
                let Height = 1;
                let Area = 1;
                let Weight = 1;
                if (x.Qty && x.Qty !== 0) {
                  Qty = x.Qty;
                }
                if (x.Lenght && x.Lenght !== 0) {
                  Lenght = x.Lenght;
                }
                if (x.Width && x.Width !== 0) {
                  Width = x.Width;
                }
                if (x.Height && x.Height !== 0) {
                  Height = x.Height;
                }
                if (x.Area && x.Area !== 0) {
                  Area = x.Area;
                }
                if (x.Weight && x.Weight !== 0) {
                  Weight = x.Weight;
                }
                x.SumDetailAmount = Weight * Qty * Lenght * Width * Height * Area;
                x.IsAmountEditable = true;
                itemsToUpdate.push(x);
                MaxProp = MaxProp + 1;
              }
            });
            this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
          }
          if (CorrectionRequired) {
            this.type = 'price-list-correction';
            this.btnclicked = true;
            this.OverstartLeftPosition = 160;
            this.OverstartTopPosition = 50;
            this.HaveHeader = true;
            this.PlcParams = {
              HeaderName: 'اصلاح فهرست بها',
              PriceListCorrectionList: PriceListCorrectionList,
              CostListFinYearCode: this.CostListFinYearCode,
              PriceListTypeCode: this.PriceListTypeCode,
              ModuleCode: this.ModuleCode
            };
          }
        });
  }

  onAddPopUpBtnClick() {
    this.type = 'price-list-topic-dataentry-page';
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.OverstartLeftPosition = 450;
    this.OverstartTopPosition = 51;
    this.paramObj = {
      Mode: 'AddNewPopUpMode',
      PriceListTypeCode: this.PriceListTypeCode,
      CostListFinYearCode: this.CostListFinYearCode,
    };
  }

  AddPopUpBtnClick(element) {
    const ItemList = [];
    const obj = {
      PriceListPatternID: element.PriceListPatternID,
      PriceListNo: element.PriceListTopicCode,
      PriceListName: element.PriceListTopicName,
      WorkUnitName: element.WorkUnitName,
      Amount: element.Amount,
      IsStar: element.IsStar,
      StarCodeName: 'جدید',
      IsAmountEditable: element.IsAmountEditable,
      IsStarCodeNameEditable: element.IsStarCodeNameEditable
    };
    ItemList.push(obj);
    this.dgEstiateApi.updateRowData({ add: ItemList });
    this.RefreshItemNo();
  }

  GetContractPay(CostFactorID) {
    this.contractpaydetail.GetContractPay(CostFactorID, this.ContractAgentParams.selectedObject).subscribe(res => {
      if (res) {
        this.gridApi.forEachNode(node => {

          const ContractPayItemObj = res.ContractPayItemViewList.filter(x => x.ProductID === node.data.ProductID)[0];

          if (ContractPayItemObj && node.data.ContractPayItemLists) {
            const itemsToUpdate = [];
            ContractPayItemObj.ContractPayItemLists.forEach(element => {
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
                ContractMinutes: element.ContractMinutes,
                ContractMinutesID: element.ContractMinutesID,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };

              element.ContractPayEntityItemList.forEach(
                i => {

                  let Name = 'Subject' + i.EntityTypeID.toString();
                  let ID = 'EntityTypeItemID' + i.EntityTypeID.toString();
                  newItem[Name] = i.Subject;
                  newItem[ID] = i.EntityTypeItemID;

                });

              itemsToUpdate.push(newItem);
              node.data.ContractPayItemLists.push(newItem);
            });

            if (node.data.ProductID === this.beforeProductID) {
              this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
            }
          }

          if (ContractPayItemObj && node.data.ContractOrderEstimateList) {
            const itemsToUpdate = [];
            ContractPayItemObj.ContractPayItemLists.forEach(element => {
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
                ContractMinutes: element.ContractMinutes,
                ContractMinutesID: element.ContractMinutesID,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };

              element.ContractPayEntityItemList.forEach(
                i => {
                  let Name = 'Subject' + i.EntityTypeID.toString();
                  let ID = 'EntityTypeItemID' + i.EntityTypeID.toString();
                  newItem[Name] = i.Subject;
                  newItem[ID] = i.EntityTypeItemID;

                });

              itemsToUpdate.push(newItem);
              node.data.ContractOrderEstimateList.push(newItem);
            });

            if (node.data.ProductID === this.beforeProductID) {
              this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
            }
          }

        });
      }
    });
  }

  GetContractMinutes(ContractMinutesID) {

    this.contractMinutes.GetContractMinutes(ContractMinutesID).subscribe(res => {
      if (res) {
        this.gridApi.forEachNode(node => {
          const ContractMinutesItemObj = res.ContractMinutesItemViewList.filter(x => x.ProductID === node.data.ProductID)[0];

          if (ContractMinutesItemObj && node.data.ContractPayItemLists) {
            const itemsToUpdate = [];
            ContractMinutesItemObj.ContractMinutesItemLists.forEach(element => {
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
                ContractMinutes: res.ContractMinutesID ? res.ContractMinutesCode + ' - ' + res.Note : '',
                ContractMinutesID: res.ContractMinutesID,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };
              itemsToUpdate.push(newItem);
              node.data.ContractPayItemLists.push(newItem);
            });

            if (node.data.ProductID === this.beforeProductID) {
              this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
            }
          }

          if (ContractMinutesItemObj && node.data.ContractOrderEstimateList) {
            const itemsToUpdate = [];
            ContractMinutesItemObj.ContractMinutesItemLists.forEach(element => {
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
                ContractMinutes: res.ContractMinutesID ? res.ContractMinutesCode + ' - ' + res.Note : '',
                ContractMinutesID: res.ContractMinutesID,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };
              itemsToUpdate.push(newItem);
              node.data.ContractOrderEstimateList.push(newItem);
            });

            if (node.data.ProductID === this.beforeProductID) {
              this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
            }
          }
        });
      }
    });
  }

  GetContractPayWithAgent(ContractAgentCode) {
    this.contractpaydetail.GetContractPay(this.CostFactorID, ContractAgentCode).subscribe(res => {
      if (res) {
        this.gridApi.forEachNode(node => {

          const ContractPayItemObj = res.ContractPayItemViewList.filter(x => x.ProductID === node.data.ProductID)[0];

          if (ContractPayItemObj && node.data.ContractPayItemLists) {
            const itemsToUpdate = [];
            ContractPayItemObj.ContractPayItemLists.forEach(element => {
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
                ContractMinutes: element.ContractMinutes,
                ContractMinutesID: element.ContractMinutesID,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };
              itemsToUpdate.push(newItem);
              node.data.ContractPayItemLists.push(newItem);
            });

            if (node.data.ProductID === this.beforeProductID) {
              this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
            }
          }

          if (ContractPayItemObj && node.data.ContractOrderEstimateList) {
            const itemsToUpdate = [];
            ContractPayItemObj.ContractPayItemLists.forEach(element => {
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
                ContractMinutes: element.ContractMinutes,
                ContractMinutesID: element.ContractMinutesID,
                Amount: element.Amount,
                IsAmountEditable: element.IsAmountEditable,
                IsStarCodeNameEditable: element.IsStarCodeNameEditable
              };
              itemsToUpdate.push(newItem);
              node.data.ContractOrderEstimateList.push(newItem);
            });

            if (node.data.ProductID === this.beforeProductID) {
              this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
            }
          }

        });
      }
    });
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

  onPrint(type) {
    switch (type) {
      case 'choose-report':
        this.type = 'choosen-contract-estimate-rep';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.OverstartLeftPosition = 400;
        this.OverstartTopPosition = 200;
        this.paramObj = {
          CostFactorID: this.PopupParam.SelectedCPCostFactorID,
          ContractID: this.PopupParam.SelectedContractID,
          ContractAgentCode: this.ContractAgentParams.selectedObject,
          ContractPayID: this.ContractPayID,
          PriceListTopicCode: this.CostListFinYearCode,
          ContractPayItemID: this.SelectedContractPayItemID,
          ProductName: this.SelectedProductName,
          RegionCode: this.RegionCode,
          IsConfirm: this.IsConfirm
        };
        break;
      case 'choose-estimate-report':
        this.type = 'choose-report-contract-pay-item-estimate';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.OverstartLeftPosition = 400;
        this.OverstartTopPosition = 200;
        this.paramObj = {
          SelectedContractPayID: this.ContractPayID,
          SelectedContractPayItemID: this.SelectedContractPayItemID,
          RegionCode: this.RegionCode,
          ModuleCode: this.ModuleCode,
          SelectedContractID: this.PopupParam.SelectedContractID,
          SelectedCostFactorID: this.PopupParam.SelectedCPCostFactorID,
          ContractAgentCode: this.ContractAgentParams.selectedObject,
          SumFinalAmountCOEFPact: (this.SumFinalAmountCOEFPact.replace(/,/g, ''))
        };
        break;
    }
  }

  // onConfirm() {
  //   this.BtnClickedName = 'BtnConfirm';
  //   if (!this.IsEndFlow) {
  //     if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
  //       if (this.ChangeDetection) {
  //         this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
  //       } else {
  //         this.DOConfirm();
  //       }
  //     } else {
  //       this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
  //         this.CostFactorID,
  //         this.RegionCode,
  //         2516,
  //         0,
  //         this.WorkflowObjectCode,
  //         null,null,
  //         this.CartableUserID)
  //         .subscribe(res => {
  //           this.HaveWorkFlow = true;
  //           this.ShowMessageBoxWithOkBtn('عدم تایید درخواست پرداخت با موفقیت انجام شد');
  //           if (this.ConfirmStatus.includes(21)) {
  //             this.ReadyToConfirm = 0;
  //             this.btnConfirmName = 'تایید';
  //             this.btnConfirmIcon = 'ok';
  //           } else {
  //             this.HaveConfirm = false;
  //           }
  //         }
  //         );
  //     }
  //   } else {
  //     this.DOFinalConfirm();
  //   }
  // }

  // DOConfirm() {
  //   this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
  //     this.CostFactorID,
  //     this.RegionCode,
  //     2516,
  //     1,
  //     2,
  //     null,null,
  //     this.CartableUserID).
  //     subscribe(res => {
  //       this.HaveWorkFlow = true;
  //       this.ShowMessageBoxWithOkBtn('تایید درخواست پرداخت  با موفقیت انجام شد');
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
  //     this.CartableUserID
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

  onSummary() {
    this.type = 'summary-quantity';
    this.btnclicked = true;
    this.OverstartLeftPosition = 100;
    this.OverstartTopPosition = 55;
    this.HaveMaxBtn = true;
    this.paramObj = {
      CostFactorID: this.PopupParam.SelectedCPCostFactorID,
      FinYearCode: this.PopupParam.FinYearCode,
      ContractCode: this.PopupParam.ContractCode,
      ContractorName: this.PopupParam.ContractorName,
      Subject: this.PopupParam.Subject,
      ContractAgentCode: this.ContractAgentParams.selectedObject,
      HeaderName: 'خلاصه متره',
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractPayDate: this.ContractPayDate,
      Note: this.Note,
      ContractID: this.PopupParam.SelectedContractID,
      RegionCode: this.RegionCode
    };
  }

  onFinSheet() {
    this.type = 'fin-sheet';
    this.btnclicked = true;
    this.OverstartLeftPosition = 100;
    this.OverstartTopPosition = 58;
    this.HaveMaxBtn = true;
    this.paramObj = {
      CostFactorID: this.PopupParam.SelectedCPCostFactorID,
      FinYearCode: this.PopupParam.FinYearCode,
      ContractCode: this.PopupParam.ContractCode,
      ContractorName: this.PopupParam.ContractorName,
      Subject: this.PopupParam.Subject,
      ContractAgentCode: this.ContractAgentParams.selectedObject,
      HeaderName: 'برگه مالی',
      ContractPayTechnicalCode: this.ContractPayTechnicalCode,
      ContractPayDate: this.ContractPayDate,
      Note: this.Note,
      ContractID: this.PopupParam.SelectedContractID,
      RegionCode: this.RegionCode
    };
  }
  Btnclick(InputValue) {
    switch (InputValue) {
      case 'Related':
        if (this.selectedRow == null) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.HaveMaxBtn = false;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.OverstartLeftPosition = 500;
          this.OverstartTopPosition = 250;
        } else {
          this.type = 'related-price-list';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.HaveMaxBtn = false;
          this.OverstartLeftPosition = 225;
          this.OverstartTopPosition = 20;
          this.paramObj = {
            RowSelected: this.selectedRow.data,
            ModuleCode: this.ModuleCode,
            ContractAgentCode: this.ContractAgentParams.selectedObject,
            ContractID: this.ContractID,
            ContractPayDate: this.ContractPayDate,
            Mode: 'ContractPayMode'
          };
        }
        break;
    }
  }
  onContractPayShipment() {
    this.type = 'contract-pay-shipment';
    this.btnclicked = true;
    this.OverstartLeftPosition = 175;
    this.OverstartTopPosition = 35;
    this.HaveMaxBtn = false;
    this.paramObj = {
      CostFactorID: this.CostFactorID,
      ContractPayID: this.ContractPayID,
      ContractAgentCode: this.ContractAgentParams.selectedObject,
      PriceListTopicCode: this.CostListFinYearCode,
      ContractPayItemID: this.SelectedContractPayItemID,
      HaveSave: !this.PopupParam.IsViewable,
      HeaderName: 'حمل',
    };
  }
  onContractPayCoef() {
    this.SumContractPay = 0;

    // this.gridApi.forEachNode(node => {
    //   node.data.ContractPayItemLists.forEach(item => {
    //     this.SumContractPay = this.SumContractPay + item.SumDetailAmount;
    //   });
    // }); // RFC 58857
    if (this.ContractPayID > 0) {
      this.type = 'contract-pay-coef';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.OverstartLeftPosition = 74;
      this.OverstartTopPosition = 19;
      this.paramObj = {
        HeaderName: 'ضرایب پرداخت قرارداد',
        ContractID: this.PopupParam.SelectedContractID,
        ContractPayID: this.ContractPayID,
        ContractPayNo: this.ContractPayNo,
        ContractAmount: this.PopupParam.ContractAmount,
        SumContractPay: this.SumFinalItemAmount,
        IsViewable: this.PopupParam.IsViewable,
      };
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا درخواست پرداخت قراردادی را ثبت نمایید.');
    }
  }

  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    let SumFinalFAmount = 0;
    let SumFinalSAmount = 0;
    let SumFinalMAmount = 0;
    if (this.ContractPayItemList) {
      this.ContractPayItemList.forEach(function (element) {
        if (element.ContractPayItemLists) {
          element.ContractPayItemLists.forEach(node => {
            if (node.SumDetailAmount && node.Amount) {
              SumFinalAmount = Math.round(SumFinalAmount + (node.SumDetailAmount * node.Amount));
            }
            if (node.IsStarCode != null && !isUndefined(node.IsStarCode) && node.IsStarCode === 0
              && (!isUndefined(node.SumDetailAmount) && node.SumDetailAmount != null)
              && (!isUndefined(node.Amount) && node.Amount != null)) {
              SumFinalFAmount = Math.round(SumFinalFAmount + (node.SumDetailAmount * node.Amount));
            }
            if (node.IsStarCode && (node.IsStarCode === 1 || node.IsStarCode === 3)
              && (!isUndefined(node.SumDetailAmount) && node.SumDetailAmount != null)
              && (!isUndefined(node.Amount) && node.Amount != null)) {
              SumFinalSAmount = Math.round(SumFinalSAmount + (node.SumDetailAmount * node.Amount));
            }
            if (node.IsStarCode && node.IsStarCode === 2
              && (!isUndefined(node.SumDetailAmount) && node.SumDetailAmount != null)
              && (!isUndefined(node.Amount) && node.Amount != null)) {
              SumFinalMAmount = Math.round(SumFinalMAmount + (node.SumDetailAmount * node.Amount));
            }
          });
        }
      });
      this.SumFinalEstimateAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.SumFinalEstimateFAmount = SumFinalFAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.SumFinalEstimateSAmount = SumFinalSAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.SumFinalEstimateMAmount = SumFinalMAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
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
  onConfirms() { // RFC 52262
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
            this.OrginalModuleCode,
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

  onConfirmAndSend() { // RFC 52262
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'ConfirmAndSend';
      // this.IsDown = false;
      if (this.ChangeDetection) {
        this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست پرداخت تغيير کرده است آيا مي خواهيد بدون ثبت اطلاعات تاييد کنيد ؟');
      } else {
        this.DoConfirmAndSend();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تعهد اعتبار به سیستم جامع مالی مراجعه نمایید');
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
      case 100000:
        this.ShowWorkflowButtons = false;
        this.ButtonsPlaceWidthPercent = 100;
        break;
      default:
        break;
    }
  }
  DOConfirm(HasAlert = true, resolve = null) { // RFC 52262
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
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
  DOFinalConfirm() { // RFC 52262
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
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionCode,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('عدم تاييد درخواس�� پرداخت با موفقيت انجام شد');
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

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, null, this.ContractID, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });

    }
  }
  onUnConfirmAndReturn() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
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
