import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';

@Component({
  selector: 'app-correction-contract-estimate',
  templateUrl: './correction-contract-estimate.component.html',
  styleUrls: ['./correction-contract-estimate.component.css']
})

export class CorrectionContractEstimateComponent implements OnInit {
  @ViewChild('IsPostedToClean') IsPostedToClean: TemplateRef<any>;
  @Input() PopupParam;
  @Output() UserWorkLogContractOrderClosed: EventEmitter<any> = new EventEmitter<any>();
  private gridApi;
  ContractPayColumnDef;
  @Input() ModuleName;
  FromContractTotalItemCount;
  ToContractTotalItemCount;
  MaincolumnDef;
  startLeftPosition: number;
  startTopPosition: number;
  OverPixelWidth;
  WorkflowObjectCode = [1];
  MinHeightPixel: number;
  SearchOption: string;
  SubjectParameter: string;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ContractListSetFrom = [];
  ContractListSetTo = [];
  selectedRow;
  paramObj;
  PixelHeight;
  IsContractPay = true;
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  NgSelectFromFinYearParams = {
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
  NgSelectToFinYearParams = {
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
  NgSelectModuleParams = {
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
  NgSelectContractStatusList = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectContractParamsFrom = {
    bindLabelProp: 'Subject',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
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
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', MinTermLenght: 1, width: 35, SearchOption: 'ContractCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'کد قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }

  };
  NgSelectContractParamsTo = {
    bindLabelProp: 'Subject',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
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
        [{ HeaderCaption: 'شماره قرارداد', HeaderName: 'LetterNo', MinTermLenght: 1, width: 35, SearchOption: 'LetterNo' },
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', MinTermLenght: 1, width: 35, SearchOption: 'ContractCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, MinTermLenght: 3, SearchOption: 'Subject' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'کد قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractListSet = [];
  ReigonListSet = [];
  ContractStatusList = [];
  ModuleNameListSet = [];
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  loading = false;
  HaveSave = false;
  HaveClarification;
  RegionCode;
  ModuleCode;
  rowData = [];
  FinYearList: any;
  private sub: any;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  FromContractPageCount;
  ToContractPageCount;
  currentContractSearchTerm;
  ContractorType = true;
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
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractorTotalItemCount;
  ContractorPageCount;
  ContractorId = null;
  constructor(private router: Router,
    private Workflow: WorkflowService,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private ModuleList: ModuleService,
    private route: ActivatedRoute,
    private RefreshPersonItems: RefreshServices,
    private ContractService: ContractListService,
    private User: UserSettingsService,
    private Actor: ActorService) {
    this.SubjectParameter = '';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;
    if (this.ModuleCode === 2842) {
      this.WorkflowObjectCode = [1, 2];
    } else {
      this.WorkflowObjectCode = this.ModuleCode === 2727 ? [1] : [3];
    }
    this.Workflow.GetFinYearList().subscribe(x => {
      this.FinYearList = x;
    });
    this.getNewData();
    this.User.GetModulOPByUser(2727).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {
          case 30:
            this.HaveClarification = true;
            break;
          default:
            break;
        }
      });
    });
  }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetRegionList(this.ModuleCode, false),
      this.ContractService.GetContractStatusList()
    ]).subscribe(res => {
      this.FinYearList = res[0];
      this.ReigonListSet = res[1];
      this.ContractStatusList = res[2];
      this.NgSelectRegionParams.selectedObject = res[1][0].RegionCode;
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع',
        field: 'FromContractDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان',
        field: 'ToContractDatePersian',
        width: 100,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'َشناسه ملی / کد ملی',
        field: 'IdentityNo',
        width: 250,
        resizable: true
      },
      // {
      //   headerName: 'ماهیت',
      //   field: 'CostType',
      //   width: 150,
      //   resizable: true
      // },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 150,
        resizable: true
      },
      // {
      //   headerName: 'نحوه اجرای کار',
      //   field: 'DealMethodName',
      //   width: 150,
      //   resizable: true
      // },
      {
        headerName: 'ناظر',
        field: 'ObserverName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        width: 200,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'کد سامانه مالی',
        field: 'ContractCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 100,
        resizable: true
      },
      {
        headerName: 'وضعیت',
        field: 'RoleName',
        width: 350,
        resizable: true
      },
      {
        headerName: 'کاربر',
        field: 'ReferenceUserName',
        width: 350,
        resizable: true
      },
      {
        headerName: 'ارسال به سامانه شفاف',
        field: 'IsPostedToClean',
        width: 130,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsPostedToClean
        },
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 400,
        resizable: true
      }
    ];
  }

  onChangeReigonObj(newObj) {
    this.NgSelectModuleParams.selectedObject = null;
    this.ModuleNameListSet = [];
    this.rowData = [];
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'Module':
        this.ModuleList.GetModuleListByRegionCode(this.NgSelectRegionParams.selectedObject, this.WorkflowObjectCode).subscribe(res =>
          this.ModuleNameListSet = res
        );
        break;
      default:
        break;
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = null;
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  closeModal() {
    this.UserWorkLogContractOrderClosed.emit(true);
  }
  Search() {
    this.ContractService.ContractEstimateSearch(
      this.NgSelectRegionParams.selectedObject,
      this.NgSelectModuleParams.selectedObject,
      this.NgSelectContractParamsFrom.selectedObject,
      this.NgSelectContractParamsTo.selectedObject,
      this.NgSelectContractStatusList.selectedObject,
      this.ContractorType,
      this.NgSelectContractorParams.selectedObject,
      this.SubjectParameter,
      this.IsContractPay
    ).subscribe(res => {
      this.rowData = res;
    });
  }

  rdoContractPayTypeClick(event) {
    this.IsContractPay = event;
  }

  BtnClick() {

    this.btnclicked = true;
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
      this.startLeftPosition = 175;
      this.startTopPosition = 250;
    } else {
      this.type = 'user-work-log-details';
      this.btnclicked = true;
      this.OverPixelWidth = 1290;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 40;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 640;
      this.paramObj = {
        HeaderName: 'جزئیات گردش',
        LetterNo: this.selectedRow.data.LetterNo,
        Subject: this.selectedRow.data.Subject,
        FinYearCode: this.selectedRow.data.FinYearCode,
        ContractNo: this.selectedRow.data.ContractNo,
        OrderNo: this.selectedRow.data.OrderNo,
        ContractCode: this.selectedRow.data.ContractCode,
        ContractId: this.selectedRow.data.ContractId,
        ContractorName: this.selectedRow.data.ContractorName,
        ContractTypeName: this.selectedRow.data.ContractTypeName,
        ContractAmount: this.selectedRow.data.ContractAmount,
        LetterDatePersian: this.selectedRow.data.LetterDatePersian,
        OrderDate: this.selectedRow.data.OrderDatePersian,
        workflowtypeStatus: this.WorkflowObjectCode[0],
        WorkFlowInstanceId: this.selectedRow.data.WorkFlowInstanceId,
        ParentModuleCode: this.ModuleCode,
      };
    }
  }
  FetchMoreToContract(event) {
    this.NgSelectContractParamsTo.loading = true;
    const ResultList = [];
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.NgSelectToFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractListSetTo = ResultList;
      });

    this.NgSelectContractParamsTo.loading = false;
  }
  FetchMoreFromContract(event) {
    this.NgSelectContractParamsFrom.loading = true;
    const ResultList = [];
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.NgSelectFromFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
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
      event.SearchOption, this.NgSelectFromFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetFrom = res.List;
          this.FromContractTotalItemCount = res.TotalItemCount;
          this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsFrom.loading = false;
        }
      });

  }
  doToContractSearch(event) {
    this.currentContractSearchTerm = event.term;
    this.NgSelectContractParamsTo.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractCode';
    }
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectToFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetTo = res.List;
          this.ToContractTotalItemCount = res.TotalItemCount;
          this.ToContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsTo.loading = false;

        }
      });
  }
  FromContractChanged(event) {
    const ToItems = [];
    this.NgSelectToFinYearParams.selectedObject = this.NgSelectFromFinYearParams.selectedObject;
    ToItems.push(this.ContractListSetFrom.find(x => x.LetterNo === event));
    this.ContractListSetTo = ToItems;
    this.NgSelectContractParamsTo.selectedObject = this.NgSelectContractParamsFrom.selectedObject;
  }
  FromContractOpened() {
    this.NgSelectContractParamsFrom.loading = true;
    this.ContractService.GetContractPaging(1, 30, '', '',
      this.NgSelectFromFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetFrom = res.List;
        this.FromContractTotalItemCount = res.TotalItemCount;
        this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsFrom.loading = false;
  }

  ToContractOpened() {
    this.NgSelectContractParamsTo.loading = true;
    this.ContractService.GetContractPaging(1, 30, '', '',
      this.NgSelectToFinYearParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetTo = res.List;
        this.ToContractTotalItemCount = res.TotalItemCount;
        this.ToContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsTo.loading = false;
  }
  BtnShowContactClick() {
    this.type = 'contract-case';
    this.btnclicked = true;
    this.OverPixelWidth = 1290;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.startLeftPosition = 40;
    this.startTopPosition = 8;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 640;
    this.paramObj = {
      HeaderName: this.ModuleName,
      ModuleCode: this.ModuleCode,
      selectedRow: this.selectedRow,
      GridHeightInTab: 100,
      PanelHeightInTab: 99,
      HaveSave: false,
      OverPixelWidth: this.OverPixelWidth,
      IsViewable: true,
      IsEditable: false,
      ModuleViewTypeCode: 5555,
      SelectedContractID: this.selectedRow.data.ContractId
    };
  }
  onGridReady(Param) {
    this.gridApi = Param.api;
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

  BtnShowEstimateContract() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
    } else {
      this.type = 'PriceList_contract_estimate';
      this.HaveMaxBtn = false;
      this.HeightPercentWithMaxBtn = 98;
      this.OverPixelWidth = 1300;
      this.PixelHeight = 600;
      this.btnclicked = true;
      this.HaveHeader = true;
      this.startLeftPosition = 30;
      this.startTopPosition = 30;
      this.MinHeightPixel = 600;
      this.paramObj = {
        HeaderName: this.ModuleName,
        ModuleCode: 2645,
        WorkFlowID: this.selectedRow.data.WorkFlowID,
        ReadyToConfirm: null,
        selectedRow: this.selectedRow,
        selectedRegion: this.RegionCode,
        ContractTypeCode: this.selectedRow.data.ContractTypeCode,
        ContractID: this.selectedRow.data.ContractId,
        OrderNo: this.selectedRow.data.OrderNo,
        PersianOrderDate: this.selectedRow.data.PersianOrderDate,
        Note: this.selectedRow.data.OrderNote,
        ContractOrderID: this.selectedRow.data.ContractOrderID,
        GridHeightInTab: 190,
        PanelHeightInTab: 190,
        RegionCode: this.selectedRow.data.RegionCode,
        RegionName: this.selectedRow.data.RegionName,
        SeasonCode: this.selectedRow.data.SeasonCode,
        ModuleViewTypeCode: 1
      };
    }
  }

}

