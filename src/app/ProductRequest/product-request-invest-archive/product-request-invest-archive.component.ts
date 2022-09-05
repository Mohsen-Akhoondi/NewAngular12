import { Component, OnInit, TemplateRef, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { isUndefined } from 'util';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';

@Component({
  selector: 'app-product-request-invest-archive',
  templateUrl: './product-request-invest-archive.component.html',
  styleUrls: ['./product-request-invest-archive.component.css']
})
export class ProductRequestInvestArchiveComponent implements OnInit {
  @Output() ProductArchiveDetailClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ArchiveType') ArchiveType: TemplateRef<any>;
  @ViewChild('fileExtCell') fileExtCell: TemplateRef<any>;
  @Input() InputParam;
  @ViewChild('DownloadBtn') DownloadBtn: TemplateRef<any>;

  //@Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ParentDocumentTypeList = [];
  rowsData: any = [];
  LetterTypeCodeList = [];
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'ExeUnit'
  };
  NgSelectVSParams = {
    bindLabelProp: 'ProductCodeName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, TermLenght: 3, SearchOption: 0 },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1, CanGrow: true }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    },
    type: 'product-name'
  };
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RequestedPersonParams = {
    bindLabelProp: 'FullPersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  InvestTypeParams = {
    bindLabelProp: 'InvestTypeName',
    bindValueProp: 'InvestTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RequiredComponents = [this.RegionParams, this.CostCenterParams, this.SubCostCenterParams, this.RequestedPersonParams];
  InvestTypeItems;
  SubCostCenterItems;
  RequestedPersonItems = <any>[];
  ProductRequestObject;
  CostCenterItems;
  IsEntryPercentageOfChanges = false;
  IsEntryPercentageLevelOfChanges = false;
  ProdcutTypeCode: any;
  BeforeSelectedProductID: any;
  selectedProductID: any;
  selectedrow: any;
  InsertMode = true;
  UpLoadEnable = true;
  WorkFlowTransitionID: any;
  IsDown: boolean;
  ChangeDetection: any;
  BtnClickedName: string;
  HaveAlertToFinance: any;
  btnConfirmName;
  btnConfirmAndReturnName = 'عدم تایید و بازگشت';
  Subject;
  ProductRequestNo;
  RegionItems;
  PersianProductRequestDate: any;
  gridApi: any;
  gridApiItem: any;
  SelectedColumnDef;
  rowData: any = [];
  ArchiverowData: any = [];
  SubGridApiMenu: any;
  selectedMenuID = -1;
  WorkFlowInstanceID: any;
  CurrWorkFlow: any;
  CostFactorID = -1;
  IsEndFlow: any;
  ReadyToConfirm: any;
  WorkflowTypeCode: any;
  WorkflowTypeName: any;
  WorkflowObjectCode: any;
  ObjectNo: any;
  ObjectID: any;
  WorkFlowID: number;
  ModuleViewTypeCode = null;
  MinimumPosting: any;
  CartableUserID: any;
  ModuleCode: number;
  OrginalModuleCode: number;
  BTNsShow = false;
  IsEditable = true;
  btnConfirmIcon;
  selectedDocumentID: number;
  selectedData: { DOCUMENT_ID: number; };
  ArchiveColumnDef;
  startLeftPosition: number;
  startTopPosition: number;
  btnclicked: boolean;
  HaveMaxBtn: boolean;
  OverHeightPercent: any;
  OverMainMinwidthPixel: any;
  type: string;
  ParentDocumentTypeCode;
  paramObj;
  HaveHeader = true;
  ProductRequestDate: any;
  CurrentUserSubCostCenter: any;
  ExeUnitItems: any;
  IsAdmin: any;
  ProductRequestCode: any;
  columnDef = [];
  IsCost = true;
  MinHeightPixel = null;
  PercentWidth = null;
  gridHeight = 49;
  tabpanelHeight = 87;
  MainMaxwidthPixel = null;
  LastInquiryObject: any;
  InsertModeBtn = true;
  btnProposal = false;
  McRadioTypes: Array<RadioBoxModel> = [];
  IsMunicipalityEstate = false;
  IsMunicipalityEstateQuestion = 'ملک از شهرداری';
  TabHeight = 69;
  MunicipalityEstate = false;
  FileMode = false;
  HasCommition: boolean = false;
  BaseShareValue;
  CopartnerShareValue;
  EconomicProfitAmount;
  ExtraModeBtn = false;
  ExtraMode = false;
  ProductRequestInvestID: any;
  HasReturnQuestion = false;
  ReturnQuestion: string;
  IsReturn: any;
  HasExtraSaveBtn: boolean;
  ProfitEntry = false;
  InvestTypeEntry = false;
  ShareValueEntry = false;
  Less = true;
  CheckValidate = false;
  EditableProfit = true;
  DisabledInvest = true;
  DisabledShareValue = true;
  HasCreateContractBtn = false;
  HaveAcceptArchive = false;
  FilterDocumentTypeCodeList = [];
  SumFinalAmountStr = '0';
  HaveAutomation = false;
  currentRegionObject;
  IsArchiveActive = true;

  constructor(private router: Router,
    private RegionList: RegionListService,
    private ArchiveList: ArchiveDetailService,
    private route: ActivatedRoute,
    private FlowService: WorkflowService,
    private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private Cartable: CartableServices,
    private CommonService: CommonServices,
    private RefreshItems: RefreshServices,
    private RefreshCartable: RefreshServices,
    private RefreshPersonItems: RefreshServices,
    private Report: ReportService,

  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.MakeMCRadioTypes();

    if (this.InputParam) {
      this.WorkFlowInstanceID = this.InputParam.WorkFlowInstanceId ? this.InputParam.WorkFlowInstanceId : null;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.CostFactorID = this.InputParam.CostFactorID;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      if (this.CurrWorkFlow) {
        this.ReadyToConfirm = this.CurrWorkFlow.ReadyToConfirm;
        this.WorkflowTypeName = this.CurrWorkFlow.WorkflowTypeName;
        this.WorkflowTypeCode = this.CurrWorkFlow.WorkflowTypeCode;
        this.WorkflowObjectCode = this.CurrWorkFlow.WorkflowObjectCode;
        this.ObjectNo = this.CurrWorkFlow.ObjectNo;
        this.ObjectID = this.CurrWorkFlow.ObjectID;
        this.WorkFlowID = this.CurrWorkFlow.WorkflowID;
        this.CartableUserID = this.CurrWorkFlow.CartableUserID;
        this.MinimumPosting = this.CurrWorkFlow.MinimumPosting;
        this.ModuleCode = 3094;
      }

      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      if (!this.ModuleCode) {
        this.ModuleCode = 3094;
      }
      this.BTNsShow = this.InputParam.BTNs;
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

    forkJoin([
      this.ProductRequest.GetSubCostCenterPerson(),
      this.RegionList.GetRegionList(3094, false),
      this.User.CheckAdmin(),
      this.ProductRequest.GetProductRequest(this.CostFactorID),
    ]).subscribe(res => {
      this.CurrentUserSubCostCenter = res[0];
      this.RegionItems = res[1];
      this.IsAdmin = res[2];
      if (res[3]) {
        if (res[3].ProductRequestItemList[0].Amount > 700000000000) {
          this.Less = false;
        }
        this.ProductRequestObject = res[3];
        this.rowsData = res[3].ProductRequestItemList;
        this.ProductRequestCode = res[3].ProductRequestCode;
        this.Subject = res[3].Subject;
        this.RegionParams.selectedObject = res[3].RegionCode;

        this.ProductRequestDate = res[3].ShortProductRequestDate;
        this.ProductRequestNo = res[3].ProductRequestNo;
      } else {
        this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
          this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
      }
      this.onChangeRegion(this.RegionParams.selectedObject, true);
    });

  }
  MakeMCRadioTypes(): void {
    this.McRadioTypes = [];
    this.McRadioTypes.push(new RadioBoxModel('بلی', true, false, 'rdoMc1'));
    this.McRadioTypes.push(new RadioBoxModel('خیر', false, false, 'rdoMc2'));
  }

  OnOpenNgSelect(event) {
    this.RegionList.GetRegionList(3094, false).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
        this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
    });
  }

  onChangeRegion(ARegionCode, IsFill = false) {

    this.SubCostCenterItems = [];
    this.RegionParams.selectedObject = ARegionCode;
    this.RequestedPersonParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.CostCenterParams.selectedObject = null;

    this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
      this.ExeUnitItems = res;
      if (this.ProductRequestObject && this.ProductRequestObject.UnitPatternID) {
        this.VWExeUnitParams.selectedObject = this.ProductRequestObject.UnitPatternID;
      }
      else {
        if (res.length === 1) {
          this.VWExeUnitParams.selectedObject = this.ExeUnitItems[0].UnitPatternID;
        } else {
          this.VWExeUnitParams.selectedObject = null;
        }
      }
    });

    if (IsFill) {
      this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, null, false).subscribe(res => {
        this.CostCenterItems = res;
        if (this.ProductRequestObject && this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.CostCenterId) {
          this.CostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.CostCenterId;

        } else {
          this.CostCenterParams.selectedObject = this.CurrentUserSubCostCenter.CostCenterID;
        }

        this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, null, true).subscribe(res => {
          this.SubCostCenterItems = res;
          if (this.ProductRequestObject && this.ProductRequestObject.SubCostCenterObject && this.ProductRequestObject.SubCostCenterObject.SubCostCenterId) {
            this.SubCostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.SubCostCenterId;
          } else {
            this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
          }

          if (this.CostCenterParams.selectedObject) {
            this.ProductRequest.GetSubCostCenterPriPerson(this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject,
              this.ProductRequestObject && this.ProductRequestObject.ActorID ? this.ProductRequestObject.ActorID : null, this.ModuleCode).subscribe(res => {
                res.forEach(element => {
                  element.FullPersonName = element.FirstName + ' ' + element.LastName;
                });
                this.RequestedPersonItems = res;


                if (this.ProductRequestObject && this.ProductRequestObject.ActorID) {
                  this.RequestedPersonParams.selectedObject = this.ProductRequestObject.ActorID;

                } else {
                  this.RequestedPersonParams.selectedObject = this.CurrentUserSubCostCenter.ActorID;
                }

              });
          }
        });
      });
    }

    if (!isUndefined(ARegionCode) && ARegionCode !== null) {
      this.RefreshPageByRegion(ARegionCode);
    }

  }

  OnProductRequestDateChange(ADate) {
    this.ProductRequestDate = ADate.MDate;
    this.PersianProductRequestDate = ADate.SDate;
  }

  onGridReadyMenu(params) {
    this.gridApi = params.api;
  }

  ngAfterViewInit(): void {
    this.SelectedColumnDef = [
      {
        headerName: '  دانلود',
        field: '',
        width: 70,
        sortable: false,
        resizable: false,
        hide: false,
        editable: () => { true },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.DownloadBtn,
        }
      },
      {
        headerName: 'نام فایل',
        width: 195,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.fileExtCell
        }
      },
      {
        headerName: 'نوع',
        field: 'DOCUMENT_TYPE_NAME',
        width: 450,
        resizable: true
      },
    ];

    this.ArchiveColumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },

      {
        headerName: 'نام فایل',
        width: 200,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ArchiveType,
          resizable: true
        }
      },

      {
        headerName: 'نوع',
        field: 'DOCUMENT_TYPE_NAME',
        width: 200,
        resizable: true
      },
      {
        headerName: 'گروه',
        field: 'ParentDocumentTypeName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'توضیحات',
        field: 'NOTE',
        width: 300,
        resizable: true
      },
    ];

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductTypeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.ProductTypeName !== params.oldValue) {
              params.data.ProductTypeName = params.newValue.ProductTypeName;
              params.data.ProductTypeCode = params.newValue.ProductTypeCode;
              params.data.ScaleName = null;
              params.data.ProductID = null;
              params.data.ProductCodeName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductCodeName = null;
            return false;
          }
        },
        editable: () => {
          this.IsEditable = this.ModuleViewTypeCode == 5 ? false : true;
          return this.IsEditable;
        },
        width: 120,
        resizable: true,
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreProduct,
          FetchByTerm: this.FetchProductByTerm,
          RedioChangeFunc: this.RedioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductCodeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductCodeName) {
            params.data.ProductCodeName = params.newValue.ProductCodeName;
            params.data.ProductID = params.newValue.ProductID;
            this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
              params.data.ScaleName = res;
            });
            this.BeforeSelectedProductID = this.selectedProductID = params.data.ProductID;
            return true;
          } else {
            params.data.ProductCodeName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: () => {
          return this.IsEditable;
        },
        width: 350,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: () => {
          return this.IsEditable;
        },
        width: 250,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'ScaleName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع پیشنهادی',
        field: 'PersianStartDate',
        width: 130,
        resizable: true,
        editable: () => {
          return this.IsEditable;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortStartDate = params.newValue.MDate;
            params.data.PersianStartDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortStartDate = null;
            params.data.PersianStartDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'تاریخ پایان پیشنهادی',
        field: 'PersianEndDate',
        width: 130,
        resizable: true,
        editable: () => {
          return this.IsEditable;
        },
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortEndDate = params.newValue.MDate;
            params.data.PersianEndDate = params.newValue.SDate;
            this.gridApiItem.forEachNode(node => {
            });
            return true;
          } else {
            params.data.ShortEndDate = null;
            params.data.PersianEndDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: (params) => {
          return this.IsEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            // tslint:disable-next-line: radix
            params.data.QTY = params.newValue;
            // tslint:disable-next-line: radix
            params.data.FinalAmount = Math.round(parseFloat((!params.newValue || params.newValue == 0) ? 1 : params.newValue) * (params.data.Amount)); // RFC 54950
          }
        },
        valueFormatter: function currencyFormatter(params) {
          if (params.value && !isUndefined(params.value) && params.value != null) {
            return params.value;
          } else {
            return '';
          }
        },
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد پیشنهادی',
        field: 'Amount',
        HaveThousand: true,
        width: 120,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, FloatMaxLength: 4 },
        editable: () => {
          return this.IsEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Amount = params.newValue;
            if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
              params.data.FinalAmount = params.data.Amount;
            } else {
              params.data.FinalAmount = Math.round(parseFloat(params.data.QTY) * params.newValue);
            }
          }
        },
      },
      {
        headerName: 'مبلغ پیشنهادی',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: () => {
          return false;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.FinalAmount = params.newValue;
            if (parseFloat(params.data.QTY) === null || parseFloat(params.data.QTY) === 0 || isUndefined(params.data.QTY)) {
              params.data.Amount = params.data.FinalAmount;
            } else {
              params.data.FinalAmount = params.newValue;
              // tslint:disable-next-line: radix
              params.data.Amount = (parseInt(params.newValue) / parseFloat(params.data.QTY)).toFixed(4);
            }
          }
        },
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

  onSubGridReadyMenu(params: { api: any; }) {
    this.SubGridApiMenu = params.api;
  }

  MenuRowClick(InputValue: { data: { DOCUMENT_ID: number; }; }) {

  }

  ArchiveRowClick(event) {
    this.ArchiveList.DisplayFileFromServer(event.data).subscribe(res => {
      this.ArchiveList.downloadFile(res);
    });

  }

  onSave() {
    this.CheckValidate = true;
    let ValidateForm = true;
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {
      ValidateForm = ValidateForm && this.ProductRequestDate && this.Subject

      if (ValidateForm) {
        const ProductReqObj = {
          CostFactorID: (this.ProductRequestObject && this.ProductRequestObject.CostFactorID) ? this.ProductRequestObject.CostFactorID : -1,
          RegionCode: this.RegionParams.selectedObject,
          ContractStackHolderID: this.SubCostCenterParams.selectedObject,
          ProductRequestDate: this.ProductRequestDate,
          UnitPatternID: this.VWExeUnitParams.selectedObject ? this.VWExeUnitParams.selectedObject : this.ExeUnitItems[0].UnitPatternID,
          SubCostCenterID: this.SubCostCenterParams.selectedObject,
          ActorID: this.RequestedPersonParams.selectedObject,
          IsMunicipalityEstate: this.IsMunicipalityEstate,
          IsCost: 0,
          Subject: this.Subject,
          ProductRequestStatusCode: 1,
          HasLicence: 0,
          IsWeb: 1,
          IsConfirm: 0,
          InvVoucherGroupCode: 1,
          IsBalancing: 0,
          RequestObjectTypeCode: 15,
        };
        let ItemNo = 0;
        const ProductRequestList = [];
        const ProductRequestItemObj = {
          ProductRequestItemID: this.rowsData.length != 0 ? this.rowsData[0].ProductRequestItemID : -1,
          CostFactorID: this.CostFactorID,
          ItemNo: ++ItemNo,
          QTY: 1,
          Subject: this.Subject,
          IsWeb: 1,
          Amount: this.Less ? 25 : 770000000000,
          ProductID: 344914,
          //StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
          // EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
          //EntityTypeItemIDList: EntityTypeItemIDList,
          ProductRequestRegionCode: this.RegionParams.selectedObject,
        };
        ProductRequestList.push(ProductRequestItemObj);



        // this.gridApiItem.stopEditing();
        // this.gridApiItem.forEachNode(node => {
        //   var keys = Object.keys(node.data);
        //   const EntityTypeItemIDList = [];
        //   if (node.data.EntityList) {
        //     node.data.EntityList.forEach(Entity => {
        //       let str = 'Subject' + Entity.EntityTypeID.toString()
        //       let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
        //       var key = keys.find(x => x === str);

        //       if (key && node.data[key]) {
        //         if (node.data[key].EntityTypeItemID) {
        //           EntityTypeItemIDList.push(node.data[key].EntityTypeItemID);
        //         } else {
        //           key = keys.find(x => x === ID);
        //           if (key && node.data[key]) {
        //             EntityTypeItemIDList.push(node.data[key]);
        //           }
        //         }
        //       }

        //     });
        //   }
        //   const ProductRequestItemObj = {
        //     ProductRequestItemID: node.data.ProductRequestItemID ? node.data.ProductRequestItemID : -1,
        //     CostFactorID: this.CostFactorID,
        //     ItemNo: ++ItemNo,
        //     QTY: parseFloat(node.data.QTY),
        //     Subject: node.data.Subject,
        //     IsWeb: 1,
        //     // tslint:disable-next-line:radix
        //     Amount: parseFloat(node.data.Amount),
        //     // tslint:disable-next-line:max-line-length
        //     ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
        //     // tslint:disable-next-line:max-line-length
        //     StartDate: node.data.ShortStartDate ? node.data.ShortStartDate : null,
        //     // tslint:disable-next-line:max-line-length
        //     EndDate: node.data.ShortEndDate ? node.data.ShortEndDate : null,
        //     EntityTypeItemIDList: EntityTypeItemIDList,
        //     ProductRequestRegionCode: this.RegionParams.selectedObject,
        //   };
        //   ProductRequestList.push(ProductRequestItemObj);
        // });

        this.ProductRequest.SaveInvestProductRequest(ProductReqObj, ProductRequestList, this.ModuleCode).subscribe(
          (res: any) => {
            this.ProductRequestObject = res;
            this.ProductRequestNo = res.ProductRequestNo;
            this.ProductRequestCode = res.ProductRequestCode;
            this.CostFactorID = res.CostFactorID;
            this.rowsData = res.ProductRequestItemList;
            this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
          }
        );
      }
      else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });

  }


  onUpload() {
    const promise = new Promise((resolve) => {
      switch (this.ModuleViewTypeCode) {
        case 2:
          this.ParentDocumentTypeCode = 1427;

          //resolve(6102326)
          resolve(this.CostFactorID); // CostFactorID
          break;
        default:
          resolve(0);
          break;
      }
    }).then((EntityID: number) => {
      if (this.CostFactorID > 0) {
        this.type = 'archive-details';
        this.OverMainMinwidthPixel = null;
        this.HaveMaxBtn = false;
        this.OverHeightPercent = null;
        this.HaveHeader = true;
        this.btnclicked = true;
        this.startLeftPosition = 269;
        this.startTopPosition = 11;
        const archiveParam = {
          EntityID: this.CostFactorID,
          DocTypeCode: this.ParentDocumentTypeCode,
          ModuleCode: 2730,
          ModuleViewTypeCode: this.ModuleViewTypeCode,
          IsReadOnly: false, // 65337

        };
        this.paramObj = archiveParam;
      } else if (this.CostFactorID === 0) {
        this.ShowMessageBoxWithOkBtn('شناسه این گروه مستندات مشخص نشده است، خواهشمند است با پشتیبانی تماس بگیرید.');
      }
    });
  }


  SetStartedWFInfo(Resolve) {
    this.FlowService.GetStartModuleViewTypeCode(
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.WorkflowTypeCode,
      this.CostFactorID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          // tslint:disable-next-line:max-line-length
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
        }
        Resolve();
      });
  }

  Show() {
    this.OpenInvestTypeParam(true);
    forkJoin([
      this.ArchiveList.GetArchiveDetailByParentDocType(this.ParentDocumentTypeCode),
      this.ArchiveList.ProductRequestInvestArchiveDetailList(this.CostFactorID, this.ParentDocumentTypeList),
    ]).subscribe(res => {

      this.rowData = res[0];
      this.ArchiverowData = res[1];
    });
  }

  OpenInvestTypeParam(event) {
    this.ProductRequest.GetInvestType(true, this.ModuleCode).subscribe(res => {
      this.InvestTypeItems = res;
    });
  }

  ViewTypeChange() {
    switch (this.ModuleViewTypeCode) {
      case 1: //ثبت
        this.ExtraModeBtn = true;
        this.InsertModeBtn = true;
        this.InsertMode = true;
        this.FileMode = false;
        this.ParentDocumentTypeCode = 1467;
        this.ParentDocumentTypeList = [1467];
        this.Show();
        break;

      case 2: // صورتجلسه اجرایی
        this.InsertModeBtn = false;
        this.FileMode = true;
        this.IsArchiveActive = false;
        this.InsertMode = false;
        this.ParentDocumentTypeCode = 1427;
        this.ParentDocumentTypeList = [1427];
        this.Show();
        break;

      case 3: // مطالعات امکان سنجی
        this.InsertModeBtn = false;
        this.FileMode = true;
        this.IsArchiveActive = false;
        this.InsertMode = false;
        this.ParentDocumentTypeCode = 1448;
        this.ParentDocumentTypeList = [1448];
        this.Show();
        //this.ExtraMode = true;
        //this.ProfitEntry = true;
        // this.HasExtraSaveBtn = true;
        break;

      case 12: // درج سود اقتصادی
        this.InsertModeBtn = false;
        this.FileMode = false;
        this.InsertMode = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.Show();
        this.ExtraMode = true;
        this.UpLoadEnable = false;
        this.ProfitEntry = true;
        this.HasExtraSaveBtn = true;
        this.FillExtraPart();
        this.EditableProfit = false;
        break;

      case 4: //برگزاری فراخوان
        //this.TabHeight = 61;
        this.InsertModeBtn = false;
        this.InsertMode = false;
        this.FileMode = true;
        this.IsArchiveActive = false;
        this.ParentDocumentTypeCode = 1450;
        this.ParentDocumentTypeList = [1450];
        this.btnProposal = true;
        //this.ReturnQuestion = 'آیا فراخوان تجدید شود';
        //this.HasReturnQuestion = this.HasExtraSaveBtn = true;
        //this.IsReturn = this.ProductRequestObject.IsRenewal;
        this.MakeMCRadioTypes();
        this.Show();
        this.ExtraMode = true;
        this.ProfitEntry = true;
        this.InvestTypeEntry = true;
        this.ShareValueEntry = true;
        this.FillExtraPart();
        break;

      case 14: // تجدید
        this.TabHeight = 61;
        this.InsertModeBtn = false;
        this.InsertMode = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.btnProposal = false;
        this.ReturnQuestion = 'آیا فراخوان تجدید شود';
        this.HasReturnQuestion = this.HasExtraSaveBtn = true;
        this.IsReturn = this.ProductRequestObject.IsRenewal;
        this.UpLoadEnable = false;
        this.MakeMCRadioTypes();
        this.Show();
        this.ExtraMode = true;
        this.ProfitEntry = true;
        this.InvestTypeEntry = true;
        this.ShareValueEntry = true;
        this.FillExtraPart();
        break;

      case 5: //خواندنی 
        this.InsertModeBtn = false;
        this.FileMode = false;
        this.InsertMode = false;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.Show();
        break;

      case 13: // خواندنی بعد از ثبت سایر اطلاعات  
        this.InsertModeBtn = false;
        this.FileMode = false;
        this.InsertMode = false;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.Show();
        this.ExtraMode = true;
        this.InvestTypeEntry = true;
        this.ProfitEntry = true;
        this.HasExtraSaveBtn = false;
        this.FillExtraPart();
        break;

      case 8: // انعقاد قرارداد
        this.HaveAcceptArchive = true;
        this.ShareValueEntry = true;
        this.HasCreateContractBtn = true;
        this.InsertModeBtn = false;
        this.FileMode = false;
        this.InsertMode = false;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 46;
        this.ParentDocumentTypeList = [46];
        this.Show();
        this.ExtraMode = true;
        this.InvestTypeEntry = true;
        this.ProfitEntry = true;
        this.HasExtraSaveBtn = false;
        this.FillExtraPart(); this.ParentDocumentTypeCode = 46;
        this.ParentDocumentTypeList = [46];
        break;

      case 9://ابلاغ قرارداد
        this.HaveAutomation = true;
        this.ShareValueEntry = true;
        this.InsertModeBtn = false;
        this.FileMode = false;
        this.InsertMode = false;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 46;
        this.ParentDocumentTypeList = [46];
        this.Show();
        this.ExtraMode = true;
        this.InvestTypeEntry = true;
        this.ProfitEntry = true;
        this.HasExtraSaveBtn = false;
        this.FillExtraPart();
        break;

      case 6: //خواندنی و ملک از شهرداری 
        this.TabHeight = 61;
        this.FileMode = false;
        this.InsertMode = false;
        this.MunicipalityEstate = true;
        this.IsMunicipalityEstateQuestion = 'ملک از شهرداری';
        this.InsertModeBtn = true;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.MakeMCRadioTypes();
        this.Show();
        this.ExtraMode = false;
        this.ProfitEntry = false;
        break;

      case 7: //دریافت پاکات
        this.TabHeight = 61;
        //this.btnProposal = true;
        this.FileMode = false;
        this.InsertMode = false;
        this.MunicipalityEstate = this.HasCommition = true;
        this.IsMunicipalityEstateQuestion = 'ملک از شهرداری';
        this.InsertModeBtn = true;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.MakeMCRadioTypes();
        this.ExtraMode = true;
        this.ProfitEntry = false;
        break;

      case 10: //خواندنی و وارد کردن روش مشارکت 
        this.TabHeight = 69;
        this.FileMode = false;
        this.InsertMode = false;
        this.InsertModeBtn = false;
        this.UpLoadEnable = false;
        this.ExtraModeBtn = true;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.Show();
        this.FillExtraPart();
        this.ExtraMode = true;
        this.ProfitEntry = true;
        this.InvestTypeEntry = true;
        this.HasExtraSaveBtn = true;
        this.DisabledInvest = false;
        break;

      case 11: //خواندنی و وارد کردن نظر کارشناسی 
        this.TabHeight = 61;
        this.FileMode = false;
        this.InsertMode = false;
        this.InsertModeBtn = false;
        this.ExtraModeBtn = true;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.Show();
        this.ExtraMode = true;
        this.ProfitEntry = true;
        this.InvestTypeEntry = true;
        this.ShareValueEntry = true;
        this.DisabledShareValue = false;
        this.HasExtraSaveBtn = true;
        this.FillExtraPart();
        break;

      case 200000:
        this.BTNsShow = true;
        this.InsertModeBtn = false;
        this.InsertMode = false;
        this.UpLoadEnable = false;
        this.ParentDocumentTypeCode = 0;
        this.ParentDocumentTypeList = [1427, 1448, 1450];
        this.Show();
        break;

      default:
        break;

    }
  }

  FillExtraPart() {
    this.ProductRequest.GetInvestType(true, this.ModuleCode).subscribe(res => {
      this.InvestTypeItems = res;
    });
    this.ProductRequest.GetProductRequestInvest(this.CostFactorID).subscribe(res => {
      if (res) {
       
        this.EconomicProfitAmount = res.EconomicProfit;
        this.BaseShareValue = res.BaseShareValue;
        this.ProductRequestInvestID = res.ProductRequestInvestID;
        if (this.ModuleViewTypeCode != 10) {
          this.InvestTypeParams.selectedObject = res.InvestTypeCode;
        }

      }
    });

  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.OverHeightPercent = null;
    this.OverMainMinwidthPixel = null;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    // this.HaveHeader = true;
    // this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(event) {
    if ((this.BtnClickedName === 'BtnConfirm') && event === 'YES') {
      this.DOConfirm();
    }

    if (this.BtnClickedName === 'ConfirmAndSend' && event === 'YES') {
      this.ConfirmAndSend();
    }

    if (this.type === 'message-box' && this.IsEndFlow === 1 && this.BtnClickedName === 'ConfirmAndSend') {
      this.OnFinalConfirm();
    }

  }


  OnOpenExeUnit(event) {
    this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res => {
      this.ExeUnitItems = res;
      if (res.length === 1) {
        this.VWExeUnitParams.selectedObject = this.ExeUnitItems[0].UnitPatternID;
      } else {
        this.VWExeUnitParams.selectedObject = null;
      }

    });
  }

  OnOpenNgSelectCostCenter(event) {
    const CurrCostCenterID = this.ProductRequestObject &&
      this.ProductRequestObject.SubCostCenterObject &&
      this.ProductRequestObject.SubCostCenterObject.CostCenterId ?
      this.ProductRequestObject.SubCostCenterObject.CostCenterId : null;
    // tslint:disable-next-line: max-line-length
    this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, this.CostCenterParams.selectedObject, this.ModuleCode, false).subscribe(res => {
      this.CostCenterItems = res;
      if (
        this.ProductRequestObject &&
        this.ProductRequestObject.SubCostCenterObject &&
        this.ProductRequestObject.SubCostCenterObject.CostCenterId) {
        this.CostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.CostCenterId;


        this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, this.ModuleCode, true).subscribe(res => {
          this.SubCostCenterItems = res;

          if (
            this.ProductRequestObject &&
            this.ProductRequestObject.SubCostCenterObject &&
            this.ProductRequestObject.SubCostCenterObject.SubCostCenterId) {
            this.SubCostCenterParams.selectedObject = this.ProductRequestObject.SubCostCenterObject.SubCostCenterId;
          }
        });

      }
    });

  }


  OnOpenNgSelectSubCostCenter(event) {
    if (this.CostCenterParams.selectedObject) {
      this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, this.ModuleCode, true).subscribe(res => {
        this.SubCostCenterItems = res;
      });
    }
  }

  OnOpenNgSelectRequestedPerson(event) {
    if (this.CostCenterParams.selectedObject) {


      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetSubCostCenterPriPerson(this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject,
        this.ProductRequestObject && this.ProductRequestObject.ActorID ? this.ProductRequestObject.ActorID : null, this.ModuleCode).subscribe(res => { // RFC 51513
          res.forEach(element => {
            element.FullPersonName = element.FirstName + ' ' + element.LastName;
          });
          this.RequestedPersonItems = res;
        });
    }
  }


  onConfirm() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'BtnConfirm';
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          if (this.ChangeDetection) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست معامله مشارکتی تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
          } else {
            this.DOConfirm();
          }
        } else {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.CostFactorID,
            this.RegionParams.selectedObject,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            this.OrginalModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید درخواست معامله مشارکتی با موفقیت انجام شد');

              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
              // this.IsEditConfirm = true;
            }
            );
        }
      } else {
        this.DOFinalConfirm();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }


  onConfirmAndSend() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'ConfirmAndSend';
      // this.IsDown = false;
      this.ConfirmAndSend();
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  onUnConfirmAndReturn() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.IsDown = false;
      // tslint:disable-next-line:no-shadowed-variable
      const promise = new Promise((resolve, reject) => {
        this.DoUnConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.ProductRequestCode;
          this.ObjectID = this.CostFactorID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  // const minPostingObject = res.reduce((a, b) => Math.max(a.MinimumPosting, b.MinimumPosting));
                  res.forEach(element => {
                    element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                  });
                  this.type = 'work-flow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.PercentWidth = undefined;
                  this.OverMainMinwidthPixel = undefined;
                  this.MainMaxwidthPixel = undefined;
                  this.MinHeightPixel = undefined;
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
                    MinimumPosting: this.MinimumPosting,
                    ObjectID: this.ObjectID,
                    OrginalModuleCode: this.OrginalModuleCode,
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
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  DOConfirm(HasAlert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
      }

      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn('تایید درخواست  انجام معامله  با موفقیت انجام شد');
          }
          this.RefreshItems.RefreshCartable();
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
          this.IsEditable = false;
          //  this.IsEditConfirm = false;
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
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.CostFactorID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          // if (alert) {
          //   this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
          // }
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';
          this.IsEditable = false;
          //this.IsEditConfirm = true;
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
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
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
          messageStr = 'بازگشت از تایید نهایی درخواست معامله مشارکتی با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی درخواست معامله مشارکتی با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      });
  }

  ConfirmAndSend() {
    this.DoConfirmAndSend();
  }

  DoConfirmAndSend() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.ProductRequestCode;
          this.ObjectID = this.CostFactorID;
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
                    this.startLeftPosition = 230;
                    this.startTopPosition = 105;
                    this.PercentWidth = null;
                    this.OverMainMinwidthPixel = null;
                    this.MainMaxwidthPixel = null;
                    this.MinHeightPixel = null;
                    this.paramObj = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      //   ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      ObjectID: this.ObjectID,
                      MinimumPosting: this.MinimumPosting,
                      OrginalModuleCode: this.OrginalModuleCode,
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

  OnFinalConfirm() {
    this.Cartable.UserConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      this.WorkFlowTransitionID,
      null,
      '',
      this.ObjectNo,
      this.WorkflowTypeCode,
      this.WorkflowTypeName,
      this.ObjectID,
      this.CartableUserID
    )
      .subscribe(res => {
        this.RefreshItems.RefreshCartable();
        this.IsEditable = false;
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }

  OnClickPrintFlow() {
    this.Report.ShowReportCustomerOrder(
      this.CostFactorID, // ObjID
      this.ModuleCode, // ModuleCode
      this.RegionParams.selectedObject, // RegCode
      null // HaveSave
    );
  }


  popupclosed() {
    this.btnclicked = false;
    this.ArchiveList.ProductRequestInvestArchiveDetailList(this.CostFactorID, this.ParentDocumentTypeList).subscribe(res => {
      this.ArchiverowData = res;
    });


  }

  close() {
    this.btnclicked = false;
    this.ProductArchiveDetailClosed.emit(true);

  }

  Download(row) {
    this.selectedDocumentID = row.DOCUMENT_ID;
    this.ArchiveList.DisplayFileFromServer(row).subscribe(res => {
      this.ArchiveList.downloadFile(res);
    });
  }

  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.RegionParams.selectedObject,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        event.Owner.IsCost,
        null).
        subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'product-name',
      });
    });
  }

  FetchProductByTerm(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'product-name',
        });
      });
  }

  RedioSelectedChange(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
      subscribe(res => {
        event.Owner.columnDef[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'product-name',
        });
      });
  }

  onGridReady(params) {
    this.gridApiItem = params.api;
  }

  oncellEditingStarted(event) {
    this.gridApiItem.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      this.columnDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(0,
        this.RegionParams.selectedObject,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        this.IsCost,
        event.data.ProductID).
        subscribe(res => {
          this.columnDef[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'product-name',
          });
        });
    }

    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, event.data.ProductID, null, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });

    }
  }

  onCellValueChanged(event) {
  }


  RowClick(row) {

  }
  onSubCostCenterSelectedChange(event) { }

  onChangeCostCenter(ACostCenterID) {
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;

    let RegionCode = -1;
    let CostCenterCode = '';
    RegionCode = this.RegionParams.selectedObject;
    // tslint:disable-next-line: max-line-length
    CostCenterCode = this.CostCenterItems ? this.CostCenterItems.find(x => x.CostCenterId === ACostCenterID).CostCenterCode : '';

  }
  onProposalClick() {
    this.LastInquiryObject = this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.InquiryID > 0 ? this.ProductRequestObject.LastInquiryObject : null;
    this.PercentWidth = 81;
    this.type = 'general-tender';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.OverMainMinwidthPixel = null;
    this.startLeftPosition = 140;
    this.startTopPosition = 14;
    this.HaveMaxBtn = false;
    this.paramObj = {
      ProductRequestObject: this.ProductRequestObject,
      InquiryObject: this.LastInquiryObject,
      ModuleViewTypeCode: 90,
      Subject: this.Subject,
      RegionCode: this.RegionParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      ProductRequestDate: this.ProductRequestDate,
      CostFactorID: this.CostFactorID,
      IsReadOnly: false,
      ModuleCode: this.ModuleCode,
      IsAdmin: true,

    };
  }


  RefreshPageByRegion(ARegionCode) {
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
    this.currentRegionObject = this.ProductRequestObject && this.ProductRequestObject.RegionObject ? this.ProductRequestObject.RegionObject : this.RegionItems.find(x => x.RegionCode === ARegionCode);
  }


  IsMunicipalityEstateRedioClick(IsMunicipalityEstate) {
    this.IsMunicipalityEstate = IsMunicipalityEstate;
  }

  onCommitionClick() {
    if (this.ProductRequestObject.LastInquiryObject && this.ProductRequestObject.LastInquiryObject.ProposalList
      && this.ProductRequestObject.LastInquiryObject.ProposalList.length > 0) {
      this.type = 'app-commition';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.startLeftPosition = 9;
      this.startTopPosition = 10;
      this.OverMainMinwidthPixel = 1340;
      this.HaveMaxBtn = false;
      this.paramObj = {
        ProductRequestObject: this.ProductRequestObject,
        Subject: this.Subject,
        RegionCode: this.RegionParams.selectedObject,
        ProductRequestNo: this.ProductRequestNo,
        ProductRequestDate: this.ProductRequestDate,
        CostFactorID: this.CostFactorID,
        IsReadOnly: false,
        HeaderName: 'کمیسیون',
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        IsMultiContract: false,
        OrginalModuleCode: this.OrginalModuleCode,
        ModuleCode: this.ModuleCode,
        IsAdmin: this.IsAdmin,
      };
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا به درج متقاضیان اقدام نمایید.');
    }
  }
  BaseShareValueChange(event) {
    this.BaseShareValue = event;
    this.CopartnerShareValue = 100 - this.BaseShareValue;

  }

  onSaveExtra() {
    switch (this.ModuleViewTypeCode) {
      case 10:
      case 11:
      case 12:
      case 3:
        this.SaveExtraInfo();
        break;
      case 14:
        this.SetProductRequestRenewal();
        break;
      default:
        break;
    }
  }

  SaveExtraInfo() {
    const ProductRequestInvestObj = {
      ProductRequestInvestID: this.ProductRequestInvestID ? this.ProductRequestInvestID : -1,
      CostFactorID: this.CostFactorID,
      InvestTypeCode: this.InvestTypeParams.selectedObject ? this.InvestTypeParams.selectedObject : 3,
      EconomicProfit: this.EconomicProfitAmount ? this.EconomicProfitAmount : null,
      BaseShareValue: this.BaseShareValue,
    };
    const RequestInvestUsageTypeList = [];
    this.ProductRequest.SaveProductRequestInvest(ProductRequestInvestObj, RequestInvestUsageTypeList).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقيت انجام شد');
      });
  }

  ReturnQuestionRedioClick(IsReturn) {
    this.IsReturn = IsReturn;
  }

  SetProductRequestRenewal() {
    this.ProductRequest.SetProductRequestRenewal(this.CostFactorID, this.IsReturn).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت وضعیت تجدید فراخوان با موفقیت انجام شد');
    });
  }

  EconomicProfitAmountChange(event) {
    this.EconomicProfitAmount = event;
  }


  rdoValueClick(Type) {
    this.Less = Type;
  }

  BtnArchiveClick() {
    let DealMethodCode = -1;
    let DealTypeCode = -1;
    let ContractTypeCode = -1;
    let RegionCode = -1;
    let FinYearCode = -1;
    let Article31ID = -1;
    if (this.ProductRequestObject) {
      DealMethodCode = this.ProductRequestObject.DealMethodCode;
      DealTypeCode = this.ProductRequestObject.DealTypeCode;
      ContractTypeCode = this.ProductRequestObject.ContractTypeCode;
      RegionCode = this.ProductRequestObject.RegionCode;
      Article31ID = this.ProductRequestObject.Article31ID;
    }
    this.ProductRequest.GetDocTypeMadatory(
      DealMethodCode ? DealMethodCode : -1,
      this.ProductRequestObject.DealTypeCode,
      ContractTypeCode ? ContractTypeCode : -1,
      RegionCode,
      FinYearCode,
      Article31ID,
      this.ModuleViewTypeCode,
      this.ModuleCode,
      true)
      .subscribe(
        ress => {
          this.ShowArchiveDialog(ress, this.FilterDocumentTypeCodeList);
        }
      );
  }

  ShowArchiveDialog(MandatoryDocTypeList, FilterDocumentTypeCodeList) {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.PercentWidth = null;
    this.startLeftPosition = 282;
    this.startTopPosition = 11;
    const archiveParam = {
      EntityID: this.CostFactorID,
      TypeCodeStr: this.ParentDocumentTypeCode + '-',
      DocTypeCode: this.ParentDocumentTypeList && this.ParentDocumentTypeList.length > 0 ? this.ParentDocumentTypeList : this.ParentDocumentTypeCode,
      ModuleCode: this.ModuleCode,
      HasCheck: true,
      IsReadOnly: false,
      MandatoryDocTypeList: MandatoryDocTypeList,
      DocumentTypeCodeList: FilterDocumentTypeCodeList,
      OrginalModuleCode: this.OrginalModuleCode,
      RegionCode: this.ProductRequestObject.RegionCode
    };
    this.paramObj = archiveParam;
  }

  onCreateContract() {
    this.type = 'create-contract-on-flow';
    this.btnclicked = true;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.HaveHeader = true;
    this.startLeftPosition = 65;
    this.startTopPosition = 210;
    this.HaveMaxBtn = false;
    this.paramObj = {
      ProductRequestObject: this.ProductRequestObject,
      SumFinalAmount: this.ProductRequestObject.ProductRequestItemList[0].Amount,
      Subject: this.Subject,
      RequestPerson: this.RequestedPersonParams.selectedObject,
      ProductRequestCode: this.ProductRequestNo,
      IsCost: this.IsCost,
      ModuleViewTypeCode: 800,
      OrginalModuleCode: this.OrginalModuleCode,
      IsAdmin: this.IsAdmin,
      RegionCode: this.RegionParams.selectedObject,
      IsNew: true,
      SumFinalAmountStr: ((this.ProductRequestObject.ProductRequestItemList[0].Amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')),
    };
  }


  onInvestClick() {
    this.paramObj = {
      IsInvestArchive: true,
      ProductRequestObject: this.ProductRequestObject
    };
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.type = 'product-request-invest-page';
    this.startLeftPosition = 180;
    this.startTopPosition = 15;
    this.PercentWidth = 70;
    this.MainMaxwidthPixel = 1046;
  }

  onAutomationClick(InputLetterTypeCode = null) {
    this.LetterTypeCodeList.push(3);
    if (!isUndefined(this.RegionParams.selectedObject) && this.CostFactorID) {
      let LetterTypeCodeList = [];
      InputLetterTypeCode ? LetterTypeCodeList.push(InputLetterTypeCode) : LetterTypeCodeList = this.LetterTypeCodeList;
      this.btnclicked = true;
      this.type = 'app-automation';
      this.HaveHeader = true;
      this.startLeftPosition = 110;
      this.startTopPosition = 5;
      this.MinHeightPixel = 300;
      this.paramObj = {
        CostFactorID: this.CostFactorID,
        RegionCode: this.currentRegionObject.RegionCode,
        LetterTypeCodeList: LetterTypeCodeList,
        OrganizationCode: this.currentRegionObject.OrganizationCode,
        AutoClose: true,
        OrginalModuleCode: this.OrginalModuleCode,
        ReadOnlyMode: (this.ModuleViewTypeCode === 100000 ? true : false),
        SaveMode: (this.ModuleViewTypeCode === 100000 ? false : true),
        ModuleViewTypeCode: this.ModuleViewTypeCode,
        ProductRequestDate: this.ProductRequestDate
      };
    }
  }
}
