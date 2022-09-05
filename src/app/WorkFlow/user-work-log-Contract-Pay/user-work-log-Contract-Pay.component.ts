import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-user-work-log-Contract-Pay',
  templateUrl: './user-work-log-Contract-Pay.component.html',
  styleUrls: ['./user-work-log-Contract-Pay.component.css']
})
export class UserWorkLogContractPayComponent implements OnInit {
  @Input() PopupParam;
  IsByDetail;
  private gridApi;
  ContractPayColumnDef;
  @Input() ModuleName;
  IsRowClick = false;
  PriceListItem = [];
  ContractTypeName: any;
  SelectedContractID: any;
  ContractNo;
  ContractPayNo: any;
  FromContractDatePersian: any;
  ToContractDatePersian: any;
  ModuleViewTypeCode: number;
  IsDown = false;
  SelectedCostFactorID: any;
  SelectedCPCostFactorID;
  SelectedContractPayID;
  PriceListPatternID;
  CostListFinYearCode;
  PriceListTypeCode;
  PriceListFineYearName;
  PriceListTypeName;
  FinYearCode: any;
  ContractCode: any;
  ContractorName: any;
  LetterNo: any;
  LetterDatePersian;
  ContractAmount: any;
  Subject: any;
  ContractTypeCode: any;
  ContractPayPopupParam = {
    SelectedContractID: -1,
    ContractOperationID: 0,
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
    ProductRequestID: null,
    IsReadOnly: false, // RFC 52262
    ContractPayDate: '',
    ContractTypeName: '',
    WorkFlowInstanceId: -1,
    ParentModuleCode: -1,
    workflowtypeStatus: -1,
    ContractPayTechnicalCode: '',
    NgSelectRegionCode: null
  };
  selectedRegion = 20
  PixelWidth;
  HeightPercentWithMaxBtn = 95;
  HaveMaxBtn = false;
  NgSelectSearchTerm = '';
  NgSelectItems;
  startLeftPosition: number;
  startTopPosition: number;
  WorkflowObjectCode = [2];
  MinHeightPixel;
  SearchOption: string;
  SubjectParameter: string;
  LetterParameter: string;
  ContractPayTechnicalCode : any ;

  BoxDevHeight: number;
  selectedRow;
  paramObj;
  NgSelectRegionParams = { // ok
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    clearable: false,
    IsDisabled: false,
  };
  NgSelectFromFinYearParams = { // ok
    Items: [],
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectToFinYearParams = { // ok
    Items: [],
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  NgSelectModuleParams = { // ok
    Items: [],
    bindLabelProp: 'ModuleName',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  NgSelectContractPayParamsFrom = {
    Items: [],
    bindLabelProp: 'ContractPayTechnicalCode',
    bindValueProp: 'ContractPayTechnicalCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    type: 'Contract-Pay-From',
    DropDownMinWidth: '320px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        // tslint:disable-next-line:max-line-length
        [{ HeaderCaption: 'شماره صورت وضعیت', HeaderName: 'ContractPayTechnicalCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractPayTechnicalCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Note', width: 53, SearchOption: 'Note', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره صورت وضعیت', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  NgSelectContractPayParamsTo = {
    Items: [],
    bindLabelProp: 'ContractPayTechnicalCode',
    bindValueProp: 'ContractPayTechnicalCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    type: 'Contract-Pay-To',
    DropDownMinWidth: '320px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        // tslint:disable-next-line:max-line-length
        [{ HeaderCaption: 'شماره صورت وضعیت', HeaderName: 'ContractPayTechnicalCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractPayTechnicalCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Note', width: 53, SearchOption: 'Note', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره صورت وضعیت', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  ReigonListSet = [];
  ModuleNameListSet = [];
  ContractPayListSetFrom = [];
  ContractPayListSetTo = [];

  btnclicked = false;
  type: string;
  private defaultColDef;
  private rowSelection;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  loading = false;
  HaveSave = false;
  HaveDelete = false;
  RegionCode;
  ModuleCode;

  HasRegion;
  rowData: any = [];
  FromFinYearList: any;
  ToFinYearList: any;

  private sub: any;
  workflowtypeStatus: any;
  FromContractPayDate: any;
  ToContractPayDate: any;
  Note: any = '';
  WorkflowInstanceID = 0;


  NgCostCenterParams = {
    bindLabelProp: 'CostCenterTitle',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  CostCenterItems;
  NgSubCostCenterParams = {
    bindLabelProp: 'SubCostCenterTitle',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubCostCenterItems;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  HaveWF;
  IsEndWF;
  FromStimateDate = '';
  ToEstimateDate = '';
  FromStartEstimateDate;
  ToStartEstimateDate;
  FromEndEstimateDate;
  ToEndEstimateDate;

  FromContractTotalItemCount;
  FromContractPageCount;
  NgSelectContractParamsFrom = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'CostFactorId',
    MinWidth: '150px',
    DropDownMinWidth: '320px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره قرارداد', HeaderName: 'LetterNo', width: 35, MinTermLenght: 1, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 },
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, },
        { HeaderCaption: 'کد قرارداد', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractListSetFrom = [];
  currentContractSearchTerm;

  EndWFParams = {
    bindLabelProp: 'EndWFName',
    bindValueProp: 'EndWFCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  EndWFItems = [
    {
      EndWFName: 'خاتمه یافته',
      EndWFCode: 1
    },
    {
      EndWFName: 'در گردش',
      EndWFCode: 2
    }
  ];
  HaveWFParams = {
    bindLabelProp: 'HaveWFName',
    bindValueProp: 'HaveWFCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  HaveWFItems = [
    {
      HaveWFName: 'می باشد',
      HaveWFCode: 1
    },
    {
      HaveWFName: 'نمی باشد',
      HaveWFCode: 2
    }
  ];
  ContractorType = true;
  ContractorPageCount;
  ContractorTotalItemCount;
  ContractorItems;
  NgSelectContractorParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'product-request-contract-contractor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 30, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 30, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractOperation;
  ContractOperationParams = {
    bindLabelProp: 'ContractOperationName',
    bindValueProp: 'ContractOperationID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractOperationItems = [
    {
      ContractOperationName: 'پیش پرداخت',
      ContractOperationID: 1
    },
    {
      ContractOperationName: 'علی الحساب',
      ContractOperationID: 2
    },
    {
      ContractOperationName: 'کارکرد',
      ContractOperationID: 3
    },
    {
      ContractOperationName: 'تعدیل',
      ContractOperationID: 4
    },
  ];

  ContractorTypeRadioParam: Array<RadioBoxModel> = [];

  constructor(private router: Router,
    private ContPayService: ContractPayService,
    private Workflow: WorkflowService,
    private ContractService: ContractListService,
    config: NgSelectConfig,
    private Actor: ActorService,
    private ContractPayDetails: ContractPayDetailsService,
    private route: ActivatedRoute,
    private RegionGroup: RegionListService,
    private ModuleList: ModuleService,
    private Report: ReportService,
    private RefreshPersonItems: RefreshServices) {
    this.rowData = [];
    this.SubjectParameter = '';
    this.LetterParameter = '';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    config.notFoundText = 'موردی یافت نشد';

    this.ContractPayColumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد واحد اجرایی',
        field: 'RegionCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نام واحد اجرایی',
        field: 'RegionName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'سال مالی ',
        field: 'FinYearCode',
        width: 90,
        resizable: true,
        sortable: true,
      },
      {
        headerName: ' کد قرارداد',
        field: 'ContractCode',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: ' نوع قرارداد',
        field: 'ContractType',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 120,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'پیمانکار اصلی',
        field: 'MainContractorName',
        width: 120,
        resizable: true,
        hide: this.ModuleCode === 2875 ? false : true
      },
      {
        headerName: 'مبلغ',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 600,
        resizable: true
      }
    ];
    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
  }


  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  ngOnInit() {
    this.ContractorTypeRadioParam = [];
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقیقی', true, false, 'rdoContractorType1_uwlpr'));
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقوقی', false, false, 'rdoContractorType2_uwlpr'));
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.BoxDevHeight = 59;
    this.Workflow.GetFinYearList().subscribe(x => {
      this.FromFinYearList = x;
      this.ToFinYearList = x;
    });

    this.getNewData();
  }
  getNewData(): void {
    this.RegionGroup.GetUserRegionList().subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.ReigonListSet = res;
        this.NgSelectRegionParams.selectedObject = res[0].RegionCode;
      }
      this.FillCostCenter(this.NgSelectRegionParams.selectedObject);
    });
  }
  FillCostCenter(RegionCode) {
    this.NgCostCenterParams.selectedObject = null;
    this.Actor.GetCostCenterByRegion(RegionCode).subscribe(res => {
      this.CostCenterItems = res;
    });
  }
  onChangeCostCenterobject(CostCenterId) {
    this.NgSubCostCenterParams.selectedObject = null;
    this.Actor.GetSubCostCenterByCostCenter(CostCenterId).subscribe(res => {
      this.SubCostCenterItems = res;
    });
  }

  FromContractPayOpened() {
    this.NgSelectContractPayParamsFrom.loading = true;
    const ResultList = [];
    this.ContractPayListSetFrom = [];
    const promise = new Promise((resolve_res3, reject_res3) => {
      this.ContractService.GetContractPayPaging(1, 30, '', '',
        this.NgSelectContractParamsFrom.selectedObject).subscribe((res: any) => {
          this.ContractPayListSetFrom = res.List;
          resolve_res3(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: '',
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Contract-Pay-From'
      });
    });
    this.NgSelectContractPayParamsFrom.loading = false;
  }

  ToContractPayOpened() {
    this.NgSelectContractPayParamsTo.loading = true;
    const ResultList = [];
    this.ContractPayListSetTo = [];
    const promise = new Promise((resolve_res3, reject_res3) => {
      this.ContractService.GetContractPayPaging(1, 30, '', '',
        this.NgSelectContractParamsFrom.selectedObject).subscribe((res: any) => {
          this.ContractPayListSetTo = res.List;
          resolve_res3(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: '',
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Contract-Pay-To'
      });
    });
    this.NgSelectContractPayParamsTo.loading = false;
  }



  doSearchFromContractPay(event) {
    this.NgSelectContractPayParamsFrom.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractPayTechnicalCode';
    }
    this.NgSelectContractPayParamsFrom.loading = true;
    this.ContractService.GetContractPayPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectContractParamsFrom.selectedObject).subscribe((res: any) => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Contract-Pay-From'
        });
      });
    this.NgSelectContractPayParamsFrom.loading = false;
  }

  doSearchToContractPay(event) {
    this.NgSelectContractPayParamsTo.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractPayTechnicalCode';
    }
    this.NgSelectContractPayParamsTo.loading = true;
    this.ContractService.GetContractPayPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectContractParamsFrom.selectedObject).subscribe((res: any) => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Contract-Pay-To'
        });
      });
    this.NgSelectContractPayParamsTo.loading = false;
  }

  FetchMoreFromContractPay(event) {
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractPayTechnicalCode';
    }

    this.NgSelectContractPayParamsFrom.loading = true;
    const ResultList2 = [];
    const promise = new Promise((resolve_res, reject_res) => {
      this.ContractService.GetContractPayPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, this.NgSelectContractParamsFrom.selectedObject).subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList2.push(el);
          });
          res.List.forEach(element => {
            ResultList2.push(element);
          });
          resolve_res(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList2,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Contract-Pay-From'
      });
    });
    this.NgSelectContractPayParamsFrom.loading = false;
  }

  FetchMoreToContractPay(event) {
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractPayTechnicalCode';
    }

    this.NgSelectContractPayParamsTo.loading = true;
    const ResultList2 = [];
    const promise = new Promise((resolve_res, reject_res) => {
      this.ContractService.GetContractPayPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, this.NgSelectContractParamsFrom.selectedObject).subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList2.push(el);
          });
          res.List.forEach(element => {
            ResultList2.push(element);
          });
          resolve_res(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList2,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Contract-Pay-To'
      });
    });
    this.NgSelectContractPayParamsTo.loading = false;
  }

  onChangeReigonObj(newObj) { // ok
    this.NgSelectModuleParams.selectedObject = null;
    this.ModuleNameListSet = [];
    this.rowData = [];
    this.ModuleList.GetModuleListByRegionCode(this.NgSelectRegionParams.selectedObject,
      this.WorkflowObjectCode).subscribe(res => {
        this.ModuleNameListSet = res;
      });
    this.NgCostCenterParams.selectedObject = null;
    this.NgSubCostCenterParams.selectedObject = null;
    this.FillCostCenter(this.NgSelectRegionParams.selectedObject);
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  popupclosed() {
    this.IsRowClick = false;
    this.btnclicked = false;
    this.MinHeightPixel = '';
    this.PixelWidth = '';
    this.HeightPercentWithMaxBtn = null;
    this.startLeftPosition = null;
    this.startTopPosition = null;
    this.HaveMaxBtn = false;
  }
  RowClick(InputValue) {
    this.IsRowClick = true;
    this.selectedRow = InputValue;
    this.WorkflowInstanceID = InputValue.data.WorkflowInstanceID === null ? 0 : InputValue.data.WorkflowInstanceID;
    this.SelectedCPCostFactorID = InputValue.data.CostFactorID;
    this.SelectedContractPayID = InputValue.data.ContractPayID;
    this.GetContractList();
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  BtnClick() {
    this.btnclicked = true;
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'صورت وضعیتی جهت مشاهده انتخاب نشده است';
      this.startLeftPosition = 475;
      this.startTopPosition = 180;
    } else {
      if (!this.selectedRow.data.WorkflowInstanceID) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'این قرارداد فاقد گردش کار می باشد';
        this.startLeftPosition = 475;
        this.startTopPosition = 180;
      } else {
        this.type = 'user-work-log-details';
        this.HaveHeader = true;
        this.startLeftPosition = 115;
        this.startTopPosition = 10;
        this.MinHeightPixel = 550;
        this.paramObj = {
          HeaderName: 'جزئیات گردش',
          ContractCode: this.selectedRow.data.ContractCode,
          ContractPayDate: this.selectedRow.data.ContractPayDatePersian,
          ContractPayID: this.selectedRow.data.ContractPayID,
          ContractPayTypeName: this.selectedRow.data.ContractPayTypeName,
          ContractPayTechnicalCode: this.selectedRow.data.ContractPayTechnicalCode,
          ContractorName: this.selectedRow.data.ContractorName,
          CotractPayDatePersian: this.selectedRow.data.CotractPayDatePersian,
          FinYearCodeCPay: this.selectedRow.data.FinYearCodeCPay,
          FinYearCodeContract: this.selectedRow.data.FinYearCodeContract,
          WorkFlowInstanceId: this.selectedRow.data.WorkflowInstanceID,
          ContractAmount: this.selectedRow.data.ContractAmount,
          LetterNo: this.selectedRow.data.LetterNo,
          LetterDatePersian: this.selectedRow.data.LetterDatePersian,
          Subject: this.selectedRow.data.Subject,
          Note: this.selectedRow.data.Note,
          ContractTypeName: this.selectedRow.data.ContractType,
          ParentModuleCode: this.ModuleCode,
          workflowtypeStatus: 2
        };
      }
    }
  }

  FetchMoreFromContract(event) {
    this.NgSelectContractParamsFrom.loading = true;
    const ResultList = [];
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.NgSelectFromFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject,
      true, this.NgSelectToFinYearParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractListSetFrom = ResultList;
      });

    this.NgSelectContractParamsFrom.loading = false;
  }

  doFromContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.NgSelectContractParamsFrom.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractCode';
    }
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectFromFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject,
      true, this.NgSelectToFinYearParams.selectedObject).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetFrom = res.List;
          this.FromContractTotalItemCount = res.TotalItemCount;
          this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsFrom.loading = false;
        }
      });

  }

  FromContractOpened() {
    this.NgSelectContractParamsFrom.loading = true;
    this.ContractService.GetContractPaging(1, 30, '', '',
      this.NgSelectFromFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject,
      true, this.NgSelectToFinYearParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetFrom = res.List;
        this.FromContractTotalItemCount = res.TotalItemCount;
        this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsFrom.loading = false;
  }

  OnFromContractPayDateChange(ADate) {
    this.FromContractPayDate = ADate.MDate;
  }

  OnToContractPayDateChange(ADate) {
    this.ToContractPayDate = ADate.MDate;
  }
  Search(ByDetail) {
    this.IsByDetail = ByDetail;
    if (ByDetail) {
      this.ContractPayColumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'سال مالی قرارداد',
          field: 'FinYearCodeContract',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد قرارداد',
          field: 'ContractCode',
          width: 100,
          resizable: true
        },
        {
          headerName: 'شماره قرارداد',
          field: 'LetterNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'مبلغ قرارداد',
          field: 'ContractAmount',
          width: 100,
          resizable: true
        },
        {
          headerName: 'شماره پرداخت',
          field: 'ContractPayNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'نام پیمانکار',
          field: 'ContractorName',
          width: 250,
          resizable: true
        },
        {
          headerName: 'پیمانکار اصلی',
          field: 'MainContractorName',
          width: 120,
          resizable: true,
          hide: this.ModuleCode === 2875 ? false : true
        },
        {
          headerName: 'سال مالی صورت وضعیت',
          field: 'FinYearCodeCPay',
          width: 150,
          resizable: true
        },
        {
          headerName: 'شماره صورت وضعیت',
          field: 'ContractPayTechnicalCode',
          width: 200,
          resizable: true
        },
        {
          headerName: 'تاریخ صورت وضعیت',
          field: 'CotractPayDatePersian',
          width: 150,
          resizable: true
        },
        {
          headerName: 'تاریخ شروع صورت وضعیت',
          field: 'StartDatePersian',
          width: 150,
          resizable: true
        },
        {
          headerName: 'تاریخ پایان صورت وضعیت',
          field: 'EndDatePersian',
          width: 150,
          resizable: true
        },
        {
          headerName: 'نوع صورت وضعیت',
          field: 'ContractPayTypeName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مبلغ صورت وضعیت',
          field: 'ContractPayAmount',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مرکز هزینه',
          field: 'CostCenterName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'مرکز هزینه فرعی',
          field: 'SubCostCenterName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'نقش گردش کار',
          field: 'RoleName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'نام شخص گردش کار',
          field: 'WFUserName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'نوع صورت وضعیت',
          field: 'ContractOperationName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'موضوع قرارداد',
          field: 'Subject',
          width: 400,
          resizable: true
        },
        {
          headerName: 'موضوع صورت وضعیت',
          field: 'Note',
          width: 400,
          resizable: true
        },
      ];
    } else {
      this.ContractPayColumnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'کد واحد اجرایی',
          field: 'RegionCode',
          width: 100,
          resizable: true
        },
        {
          headerName: 'نام واحد اجرایی',
          field: 'RegionName',
          width: 100,
          resizable: true
        },
        {
          headerName: 'سال مالی ',
          field: 'FinYearCodeContract',
          width: 90,
          resizable: true,
          sortable: true,
        },
        {
          headerName: ' کد قرارداد',
          field: 'ContractCode',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: ' نوع قرارداد',
          field: 'ContractType',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'شماره قرارداد',
          field: 'LetterNo',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ قرارداد',
          field: 'LetterDatePersian',
          width: 120,
          resizable: true
        },
        {
          headerName: 'پیمانکار',
          field: 'ContractorName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'پیمانکار اصلی',
          field: 'MainContractorName',
          width: 120,
          resizable: true,
          hide: this.ModuleCode === 2875 ? false : true
        },
        {
          headerName: 'مبلغ',
          field: 'ContractAmount',
          HaveThousand: true,
          width: 150,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 600,
          resizable: true
        }
      ];
    }
    if (this.NgSelectRegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرایی انتخاب نشده است');
    } else {
      this.ContractService.ContractPaySearch(
        this.NgSelectRegionParams.selectedObject,
        this.NgSelectFromFinYearParams.selectedObject, // از سال مالی
        this.NgSelectContractParamsFrom.selectedObject,
        null, //this.NgSelectContractPayParamsFrom.selectedObject, //به درخواست خانم احمدی برداشته شد
        null, //this.NgSelectContractPayParamsTo.selectedObject,  //به درخواست خانم احمدی برداشته شد
        this.NgSelectModuleParams.selectedObject,
        this.FromContractPayDate,
        this.ToContractPayDate,
        this.Note,
        this.NgCostCenterParams.selectedObject,       // مرکز هزینه
        this.NgSubCostCenterParams.selectedObject,    // مرکز هزینه فرعی
        this.IsEndWF,                                 // خاتمه یافته
        this.HaveWF,                                  // دارای گردش کار
        this.FromStartEstimateDate.MDate,             // از تاریخ شروع صورت وضعیت
        this.ToStartEstimateDate.MDate,               //  تا تاریخ شروع صورت وضعیت
        this.FromEndEstimateDate.MDate,               //  از تاریخ پایان صورت وشعیت
        this.ToEndEstimateDate.MDate,                 //  تا تاریخ پایان صورت وضعیت
        this.NgSelectToFinYearParams.selectedObject,  //  تا سال مالی
        ByDetail,                                     //  دکمه به ریز یا به سرجمع
        this.NgSelectContractorParams.selectedObject,  //  پیمانکار
        this.ContractOperation,
        this.ContractPayTechnicalCode                        // نوع صورت وضعیت  60460
      ).subscribe(res => {
        this.rowData = res;
      });   
    }
  }

  GetContractList() {
    this.ContractService.GetContractList(this.NgSelectRegionParams.selectedObject,
      this.ModuleCode, false, false, false, true,
      this.selectedRow.data.FinYearCodeContract, null,
      this.selectedRow.data.Subject,
      this.selectedRow.data.LetterNo, null,
      null, null).subscribe(res => {
        this.PriceListItem = res;
        this.PriceListPatternID = this.PriceListItem[0].PriceListPatternID;
        this.PriceListFineYearName = this.PriceListItem[0].PriceListFineYearName;
        this.PriceListTypeName = this.PriceListItem[0].PriceListTypeName;
        this.ContractPayNo = this.PriceListItem[0].ContractPayNo;
        this.ContractTypeCode = this.PriceListItem[0].ContractTypeCode;
        this.SelectedContractID = this.PriceListItem[0].ContractId;
        this.ContractNo = this.PriceListItem[0].ContractNo;
        this.RegionCode = this.PriceListItem[0].RegionCode;
      });
  }
  onEdit(isViewable: boolean) {
    this.btnclicked = true;
    if (!this.IsRowClick) {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت مشاهده انتخاب نشده است');
      return;
    }
    this.HeightPercentWithMaxBtn = 95;
    if (this.IsByDetail) {
      this.HaveHeader = true;
      this.startLeftPosition = 100;
      this.startTopPosition = 10;
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'EditMode';
      this.ContractPayPopupParam.HeaderName = 'مشاهده صورت وضعیت';
      this.ContractPayPopupParam.SelectedCostFactorID = this.selectedRow.data.CostFactorID ? this.selectedRow.data.CostFactorID : -1;
      this.ContractPayPopupParam.SelectedContractID = this.SelectedContractID;
      this.ContractPayPopupParam.SelectedCPCostFactorID = this.SelectedCPCostFactorID;
      this.ContractPayPopupParam.SelectedContractPayID = this.SelectedContractPayID;
      this.ContractPayPopupParam.PriceListPatternID = this.PriceListPatternID;
      this.ContractPayPopupParam.CostListFinYearCode = this.selectedRow.data.CostListFinYearCode;
      this.ContractPayPopupParam.PriceListTypeCode = this.selectedRow.data.PriceListTypeCode;
      this.ContractPayPopupParam.PriceListFineYearName = this.PriceListItem[0].PriceListFineYearName;
      this.ContractPayPopupParam.PriceListTypeName = this.PriceListTypeName;
      this.ContractPayPopupParam.RegionCode = this.RegionCode;
      this.ContractPayPopupParam.IsViewable = isViewable;
      this.ContractPayPopupParam.FinYearCode = this.selectedRow.data.FinYearCode;
      this.ContractPayPopupParam.ContractNo = this.selectedRow.data.ContractNo;
      this.ContractPayPopupParam.ContractCode = this.selectedRow.data.ContractCode;
      this.ContractPayPopupParam.ContractorName = this.selectedRow.data.ContractorName;
      this.ContractPayPopupParam.LetterNo = this.selectedRow.data.LetterNo;
      this.ContractPayPopupParam.LetterDatePersian = this.selectedRow.data.LetterDatePersian;
      this.ContractPayPopupParam.ContractAmount = this.selectedRow.data.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.ContractPayPopupParam.Subject = this.selectedRow.data.Subject;
      this.ContractPayPopupParam.IsReadOnly = this.selectedRow.data.IsReadOnly; // RFC 52262
      this.ContractPayPopupParam.selectedRow = this.selectedRow.data;
      this.ContractPayPopupParam.ModuleViewTypeCode = this.selectedRow.data.ModuleViewTypeCode;
      this.ContractPayPopupParam.ContractTypeName = this.selectedRow.data.ContractType;
      this.ContractPayPopupParam.NgSelectRegionCode = this.NgSelectRegionParams.selectedObject;
      this.paramObj = this.ContractPayPopupParam;
      if (this.selectedRow.data.ContractOperationID === 3) {
        if (this.selectedRow.data.IsEstimate) {
          this.OnOpenContractEstimate();
          return;
        }
        if (this.ContractTypeCode === 26 || this.ContractTypeCode === 29) {
          this.type = 'contract-pay-details'; // 'contract-pay-item-hour';
          return;
        }
        if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
          this.type = 'contract-pay-details';
          return;
        }
        if (!this.PriceListPatternID) {
          this.type = 'contract-pay-details';
          return;
        }
        if (this.PriceListPatternID &&
          this.ContractTypeCode !== 26 &&
          this.ContractTypeCode !== 29) {
          // this.type = 'contract-pay-item-estimate-page';
          this.type = 'contract-pay-details';
          return;
        }
      } else {
        this.startLeftPosition = 300;
        this.startTopPosition = 50;
        this.PixelWidth = 700;
        this.HeightPercentWithMaxBtn = 50;
        this.HaveMaxBtn = false;
        this.type = 'pre-pay';
      }
    } else {
      this.OnOpenContractEstimate();
    }
  }

  OnChangeWF(event, Value) {
    switch (Value) {
      case 'HaveWF':
        {
          this.HaveWF = event;
        }
        break;
      case 'IsEndWF':
        {
          this.IsEndWF = event;
        }
        break;
      default:
        break;
    }
  }
  OnFromProductRequestDateChange(event, Value) {
    switch (Value) {
      case 'FromStartEstimateDate':
        this.FromStartEstimateDate = event;
        break;
      case 'ToStartEstimateDate':
        this.ToStartEstimateDate = event;
        break;
      case 'FromEndEstimateDate':
        this.FromEndEstimateDate = event;
        break;
      case 'ToEndEstimateDate':
        this.ToEndEstimateDate = event;
        break;
      default:
        break;
    }
  }
  ReturendContractOperation(ContractOperationID) {
    if (ContractOperationID && this.type === 'contract-pay-types' && ContractOperationID === '3' &&
      (this.ContractTypeCode === 26 || this.ContractTypeCode === 29)) {
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.ContractPayPopupParam.PriceListPatternID = this.PriceListPatternID;
      this.ContractPayPopupParam.CostListFinYearCode = this.CostListFinYearCode;
      this.ContractPayPopupParam.PriceListTypeCode = this.PriceListTypeCode;
      this.ContractPayPopupParam.PriceListFineYearName = this.PriceListFineYearName;
      this.ContractPayPopupParam.PriceListTypeName = this.PriceListTypeName;
      this.ContractPayPopupParam.SelectedCPCostFactorID = -1;
      this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
      this.ContractPayPopupParam.RegionCode = this.NgSelectRegionParams.selectedObject
      this.type = 'contract-pay-details'; // 'contract-pay-item-hour';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;
    }
    if (ContractOperationID && this.type === 'contract-pay-types' && ContractOperationID === '3' &&
      (this.ContractTypeCode === 27 || this.ContractTypeCode === 28)) {
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
      this.type = 'contract-pay-details';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;
    }
    if (!this.PriceListPatternID && ContractOperationID && ContractOperationID === '3' &&
      this.type === 'contract-pay-types') {
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
      this.type = 'contract-pay-details';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;
    }
    if (this.PriceListPatternID && ContractOperationID && ContractOperationID === '3' &&
      this.type === 'contract-pay-types' &&
      this.ContractTypeCode !== 26 &&
      this.ContractTypeCode !== 29) {
      // this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      // this.ContractPayPopupParam.PriceListPatternID = this.PriceListPatternID;
      // this.ContractPayPopupParam.CostListFinYearCode = this.CostListFinYearCode;
      // this.ContractPayPopupParam.PriceListTypeCode = this.PriceListTypeCode;
      // this.ContractPayPopupParam.PriceListFineYearName = this.PriceListFineYearName;
      // this.ContractPayPopupParam.PriceListTypeName = this.PriceListTypeName;
      // this.ContractPayPopupParam.SelectedCPCostFactorID = -1;
      // this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
      // this.type = 'contract-pay-item-estimate-page';
      // this.HaveMaxBtn = true;
      // this.ContractPayPopupParam.Mode = 'InsertMode';
      this.ContractPayPopupParam.ContractOperationID = ContractOperationID;
      this.ContractPayPopupParam.selectedRow = this.PopupParam.selectedRow.data;
      this.type = 'contract-pay-details';
      this.HaveMaxBtn = true;
      this.ContractPayPopupParam.Mode = 'InsertMode';
      return;

    }
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractorItems = ResultList;
        this.NgSelectContractorParams.loading = false;
      }
      );
  }
  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  OpenContractor(event) {
    const ResultList = [];
    //  this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
    // this.NgSelectContractorParams.loading = false;
  }
  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.NgSelectContractorParams.selectedObject = null;
    if (this.ContractorType) {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      // this.NgSelectContractorParams.bindLabelProp = 'PersonName';
    } else {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      // this.NgSelectContractorParams.bindLabelProp = 'CorporateName';
    }
  }
  OnChangeContractOperation(event) {
    this.ContractOperation = event;
  }
  OnOpenContractEstimate() {
    this.type = 'PriceList_contract_estimate';
      this.HaveMaxBtn = true;
      this.PixelWidth = '';
      this.HaveHeader = true;
      this.startLeftPosition = 94;
      this.startTopPosition = 10;
      this.MinHeightPixel = 550;
      this.selectedRow.data.CostFactorID = this.selectedRow.data.CostContractID;
      this.paramObj = {
        HeaderName: this.ModuleName,
        ModuleCode: this.ModuleCode,
        WorkFlowID: null,
        ReadyToConfirm: null,
        selectedRow: this.selectedRow,
        selectedRegion: this.selectedRegion,
        ContractTypeCode: this.selectedRow.data.ContractTypeCode,
        ContractID: this.selectedRow.data.ContractId,
        ReceiveFactorID: this.selectedRow.data.ReceiveFactorID,
        OrderNo: this.selectedRow.data.OrderNo,
        PersianOrderDate: this.selectedRow.data.PersianOrderDate,
        Note: this.selectedRow.data.OrderNote,
        ContractOrderID: this.selectedRow.data.ContractOrderID,
        GridHeightInTab: 100,
        PanelHeightInTab: 99,
        RegionCode: this.selectedRow.data.RegionCode,
        RegionName: this.selectedRow.data.RegionName,
        SeasonCode: this.selectedRow.data.SeasonCode,
        ModuleViewTypeCode: 100000,
        BeforPageTypeName: 'contract-list-page'
      };
  }
}
