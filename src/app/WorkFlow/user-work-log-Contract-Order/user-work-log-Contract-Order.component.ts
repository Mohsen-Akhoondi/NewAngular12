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
  // tslint:disable-next-line: component-selector
  selector: 'app-user-work-log-Contract-Order',
  templateUrl: './user-work-log-Contract-Order.component.html',
  styleUrls: ['./user-work-log-Contract-Order.component.css']
})
export class UserWorkLogContractOrderComponent implements OnInit {
  @ViewChild('IsPostedToClean') IsPostedToClean: TemplateRef<any>;
  @Input() PopupParam;
  @Output() UserWorkLogContractOrderClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  private gridApi;
  ContractPayColumnDef;
  @Input() ModuleName;
  FromRequestPageCount;
  FromRequestTotalItemCount;
  FromContractTotalItemCount;
  ToContractTotalItemCount;
  ToRequestPageCount;
  ToRequestTotalItemCount;
  MaincolumnDef;
  IsArticle48;
  ISTavafoghNameh;
  IsEstimate;
  ISProvisionRemain;
  NgSelectSearchTerm = '';
  NgSelectItems;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  startLeftPosition: number;
  startTopPosition: number;
  OverPixelWidth;
  WorkflowObjectCode = [1];
  MinHeightPixel: number;
  SearchOption: string;
  SubjectParameter: string;
  LetterParameter: string;
  ContractListSetFrom = [];
  ContractListSetTo = [];
  PriceListTopicItems;
  selectedRow;
  IsCost;
  IsIncome;
  IsNew;
  IsExtended;
  FromProductRequestDate;
  ToProductRequestDate;
  FromLetterDate;
  ToLetterDate;
  paramObj;
  VWExeUnitItems;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
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
  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-from-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ToRequestItems;
  ToRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-to-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  RusteeItems;
  RusteeParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  SubRusteeItems;
  SubRusteeParams = {
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
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  SubCostCenterItems;
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
  NgSelectLetterParamsFrom = {
    Items: [],
    bindLabelProp: 'LetterNo',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectLetterParamsTo = {
    Items: [],
    bindLabelProp: 'LetterNo',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  NgSelectContractParamsFrom = {
    Items: [],
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
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }

  };
  NgSelectContractParamsTo = {
    Items: [],
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
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, MinTermLenght: 3, SearchOption: 'Subject' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  LetterListSet = [];
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
  HaveDelete = false;
  HaveClarification;
  // IsDisableClarification = true;
  RegionCode;
  ModuleCode;
  selectedWorkflowtype;
  HasRegion;
  rowData = [];
  FinYearList: any;
  workflowtype;
  private sub: any;
  WorkflowObject: any;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  FromContractPageCount;
  ToContractPageCount;
  currentContractSearchTerm;
  currentRequestSearchTerm: any;
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
    this.LetterParameter = '';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.ISProvisionRemain = this.PopupParam ? this.PopupParam.ISProvisionRemain : false;
    this.IsArticle48 = this.PopupParam ? this.PopupParam.IsArticle48 : false;
    this.ISTavafoghNameh = this.PopupParam ? this.PopupParam.ISTavafoghNameh : false;
    this.IsEstimate = this.PopupParam ? this.PopupParam.IsEstimate : false;  
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;
    this.WorkflowObjectCode = (this.ModuleCode === 2727 || this.ModuleCode === 2645) ? [1] : [3];
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
        headerName: 'اطلاعات قرارداد',
        children: [
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
            headerName: 'تاریخ انعقاد',
            field: 'LetterDatePersian',
            width: 140,
            resizable: true
          },
          {
            headerName: 'َشناسه ملی / کد ملی',
            field: 'IdentityNo',
            width: 250,
            resizable: true
          },
          {
            headerName: 'َماهیت',
            field: 'CostType',
            width: 150,
            resizable: true
          },
          {
            headerName: 'نوع قرارداد',
            field: 'ContractTypeName',
            width: 150,
            resizable: true
          },
          {
            headerName: 'نحوه اجرای کار',
            field: 'DealMethodName',
            width: 150,
            resizable: true
          },
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
        ]
      },
      {
        headerName: 'اطلاعات درخواست',
        children: [
          {
            headerName: 'نوع درخواست',
            field: 'ProductRequestType',
            width: 90,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'شماره',
            field: 'ProductRequestNo',
            width: 100,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'تاریخ',
            field: 'PersianProductRequestDates',
            width: 120,
            resizable: true
          },
          {
            headerName: 'معاونت مجری',
            field: 'PRCostCenterName',
            width: 120,
            resizable: true
          },
          {
            headerName: 'معاونت متولی',
            field: 'PRStackHolderName',
            width: 120,
            resizable: true
          },
          {
            headerName: 'درخواست کننده',
            field: 'PersonNameSet',
            width: 150,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'موضوع',
            field: 'ProductRequestSubject',
            width: 350,
            resizable: true
          },
          {
            headerName: 'نوع گردش کار',
            field: 'WorkflowTypeName',
            width: 150,
            resizable: true
          },
          {
            headerName: 'وضعیت درخواست',
            field: 'RoleName',
            width: 350,
            resizable: true
          },
        ]
      },
    ];
  }

  onChangeReigonObj(newObj) {
    this.NgSelectModuleParams.selectedObject = null;
    this.VWExeUnitParams.selectedObject = null;
    this.ModuleNameListSet = [];
    this.rowData = [];
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'ExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.NgSelectRegionParams.selectedObject).subscribe(res =>
          this.VWExeUnitItems = res
        );
        break;
      case 'Module':
        this.ModuleList.GetModuleListByRegionCode(this.NgSelectRegionParams.selectedObject, this.WorkflowObjectCode).subscribe(res =>
          this.ModuleNameListSet = res
        );
        break;
      case 'Rustee':
        this.ProductRequest.GetCostCenterByRegion(this.NgSelectRegionParams.selectedObject, null, null, true).subscribe(res =>
          this.RusteeItems = res
        );
        break;
      case 'SubRustee':
        this.ProductRequest.GetSubCostCenter(this.RusteeParams.selectedObject, null, true).subscribe(Res => {
          this.SubRusteeItems = Res;
        });
        break;
      case 'CostCenter':
        this.ProductRequest.GetCostCenterByRegion(this.NgSelectRegionParams.selectedObject, null, null, true).subscribe(res =>
          this.CostCenterItems = res
        );
        break;
      case 'SubCostCenter':
        this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, null, true).subscribe(Res => {
          this.SubCostCenterItems = Res;
        });
        break;
      case 'FromRequest':
        this.FromRequestParams.loading = true;
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else {
                element.ProductRequestCodeSub = element.Subject;
              }
            });
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          });
        break;
      case 'ToRequest':
        this.ToRequestItems = [];
        this.ToRequestParams.loading = true;
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else {
                element.ProductRequestCodeSub = element.Subject;
              }
            });
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          });
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
    // this.IsDisableClarification = !(this.selectedRow && this.selectedRow.data && this.selectedRow.data.ContractId);
  }
  closeModal() {
    if (this.ISProvisionRemain || this.IsArticle48 || this.IsEstimate || this.ISTavafoghNameh) {
      this.UserWorkLogContractOrderClosed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }
  UploadContractInClarification() {
    // const selectedRows = this.gridApi.getSelectedRows();
    // const ContractIDs = [];
    // if (selectedRows && selectedRows.length > 0) {
    //   selectedRows.forEach(element => {
    //     if (element && element.ContractId) {
    //       ContractIDs.push(element.ContractId);
    //     }
    //   });
    //   if (ContractIDs && ContractIDs.length) {
    //     this.ContractService.UploadContractInClarification(ContractIDs).subscribe(res => {
    //       this.ShowMessageBoxWithOkBtn('ارسال به سامانه شفاف با موفقیت انجام شد');
    //     });
    //   }
    // } else {
    //   this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    // }
  }
  Search() {
    let FromRequestNo = null;
    let ToRequestNo = null;
    this.ContractorId = this.NgSelectContractorParams.selectedObject ? this.NgSelectContractorParams.selectedObject : this.ContractorId;
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    this.ContractService.ContractRequestSearch(
      this.NgSelectRegionParams.selectedObject,
      this.VWExeUnitParams.selectedObject,
      this.IsCost,
      this.IsIncome,
      this.NgSelectModuleParams.selectedObject,
      FromRequestNo,
      ToRequestNo,
      this.NgSelectContractParamsFrom.selectedObject,
      this.NgSelectContractParamsTo.selectedObject,
      this.IsNew,
      this.IsExtended,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.FromLetterDate,
      this.ToLetterDate,
      null,
      this.RusteeParams.selectedObject,
      this.SubRusteeParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.SubjectParameter,
      this.ModuleCode,
      this.ContractorId,
      this.NgSelectContractStatusList.selectedObject).subscribe(res => {
        this.rowData = res;
      });
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
  FetchMoreRequest(event, type) {
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    const ResultList = [];
    this.ProductRequest.GetProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          if (element.ProductRequestNo) {
            element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
          } else {
            element.ProductRequestCodeSub = element.Subject;
          }
          ResultList.push(element);
        });
        if (type === 'From') {
          this.FromRequestItems = ResultList;
          this.FromRequestParams.loading = false;
        } else {
          this.ToRequestItems = ResultList;
          this.ToRequestParams.loading = false;
        }
      });
  }
  doRequestSearch(event, type) {
    this.currentRequestSearchTerm = event.term;
    if (type === 'From') {
      this.FromRequestParams.loading = true;
    } else if (type === 'TO') {
      this.ToRequestParams.loading = true;
    }
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ProductRequestNo';
    }
    this.ProductRequest.GetProductRequestPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
        if (this.currentRequestSearchTerm === event.term) {
          res.List.forEach(element => {
            if (element.ProductRequestNo) {
              element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
            } else {
              element.ProductRequestCodeSub = element.Subject;
            }
          });
          if (type === 'From') {
            this.FromRequestItems = res.List;
            this.FromRequestTotalItemCount = res.TotalItemCount;
            this.FromRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.FromRequestParams.loading = false;
          } else {
            this.ToRequestItems = res.List;
            this.ToRequestTotalItemCount = res.TotalItemCount;
            this.ToRequestPageCount = Math.ceil(res.TotalItemCount / 30);
            this.ToRequestParams.loading = false;
          }
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
  OnChangeCheckBoxValue(Ischeck, type) {
    switch (type) {
      case 'IsCost':
        this.IsCost = Ischeck;
        break;
      case 'IsIncome':
        this.IsIncome = Ischeck;
        break;
      case 'IsNew':
        this.IsNew = Ischeck;
        break;
      case 'IsExtended':
        this.IsExtended = Ischeck;
        break;
      default:
        break;
    }
  }
  onChangeNgSelect(event, type) {
    switch (type) {
      case 'FromRequest':
        const ToItems = [];
        ToItems.push(this.FromRequestItems.find(x => x.CostFactorID === event));
        this.ToRequestItems = ToItems;
        this.ToRequestParams.selectedObject = this.FromRequestParams.selectedObject;
        break;
      case 'Rustee':
        this.SubRusteeParams.selectedObject = null;
        break;
      case 'CostCenter':
        this.SubCostCenterParams.selectedObject = null;
        break;
      default:
        break;
    }
  }
  OnFromProductRequestDateChange(ADate) {
    this.FromProductRequestDate = ADate.MDate;
  }
  OnToProductRequestDateChange(ADate) {
    this.ToProductRequestDate = ADate.MDate;
  }
  OnFromLetterDateChange(ADate) {
    this.FromLetterDate = ADate.MDate;
  }
  OnToLetterDateChange(ADate) {
    this.ToLetterDate = ADate.MDate;
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
      HeaderName: this.ModuleCode === 2727 ? 'پرونده قرارداد' : this.ModuleName,
      ModuleCode: this.ModuleCode,
      selectedRow: this.selectedRow,
      GridHeightInTab: 100,
      PanelHeightInTab: 99,
      HaveSave: false,
      OverPixelWidth: this.OverPixelWidth,
      IsViewable: true,
      IsEditable: false,
      ModuleViewTypeCode : 5555,
      SelectedContractID: this.selectedRow.data.ContractId
    };
  }
  OnConfirmSelectedRow() {
    if (this.selectedRow) {
      if (this.selectedRow.data.ProductRequestID) {
        this.UserWorkLogContractOrderClosed.emit(this.selectedRow.data);
      } else {
        this.ShowMessageBoxWithOkBtn('امکان انتخاب قراداد های بدون درخواست وجود ندارد');
      }
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد مورد نظر را انتخاب نمایید');
    }
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
  onOkClick() {
    this.OutPutParam.emit(this.selectedRow.data.ContractId);
   this.UserWorkLogContractOrderClosed.emit(true);
    return;
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
  onSetMainContractorClick() {
    this.type = 'set-main-contractor';
    this.btnclicked = true;
    this.OverPixelWidth = 400;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 515;
    this.startTopPosition = 220;
    this.HeightPercentWithMaxBtn = null;
    this.paramObj = {
      HeaderName: 'درج پیمانکار اصلی',
      ModuleCode: this.ModuleCode,
      SelectedContractID: this.selectedRow.data.ContractId
    };
  }
}
