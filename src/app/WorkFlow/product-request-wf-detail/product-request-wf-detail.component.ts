import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';

@Component({
  selector: 'app-product-request-wf-detail',
  templateUrl: './product-request-wf-detail.component.html',
  styleUrls: ['./product-request-wf-detail.component.css']
})
export class ProductRequestWFDetailComponent implements OnInit {

  @ViewChild('IsPostedToClean') IsPostedToClean: TemplateRef<any>;
  @Input() PopupParam;
  @Input() ModuleName;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  ContractPayColumnDef;
  FromRequestPageCount;
  FromRequestTotalItemCount;
  ToRequestPageCount;
  ToRequestTotalItemCount;
  MaincolumnDef;
  ProductRequestObject = null;
  IsDisableClarification = true;
  NgSelectSearchTerm = '';
  NgSelectItems;
  startLeftPosition: number;
  startTopPosition: number;
  WorkflowObjectCode = [3, 4];
  MinHeightPixel: number;
  SearchOption: string;
  LetterParameter: string;
  PriceListTopicItems;
  IsNew;
  IsExtended;
  FromProductRequestDate;
  ToProductRequestDate;
  PersonRoleItems: any;
  BtnClickedName: any;
  PersonRoleSelectedID;
  NgSelectPersonRoleParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'UserID',
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
    type: 'user-person-Role-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 45, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' },
        { HeaderCaption: 'نام کاربری', HeaderName: 'UserName', width: 53, MinTermLenght: 3, SearchOption: 'UserName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 45, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, },
        { HeaderCaption: 'نام کاربری', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  paramObj;
  VWExeUnitItems;
  HaveClarification;
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
  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
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
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'کد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ToRequestItems = [];
  ToRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
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
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'کد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
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
  LetterListSet = [];
  ReigonListSet = [];
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '' };
  loading = false;
  HaveSave = false;
  HaveDelete = false;
  RegionCode;
  ModuleCode;
  selectedWorkflowtype;
  HasRegion;
  rowData: any;
  FinYearList: any;
  workflowtype;
  OverPixelWidth: number;
  private sub: any;
  WorkflowObject: any;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  currentRequestSearchTerm;
  currentFromRequestObject: any;
  currentToRequestObject: any;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  IsAdmin = false;
  ShowIsOver15 = false;
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
    this.LetterParameter = '';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  onGridReady(Param) {
    this.gridApi = Param.api;
  }
  ngOnInit() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
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
            headerName: 'موضوع درخواست',
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
            headerName: 'موضوع قرارداد',
            field: 'Subject',
            width: 400,
            resizable: true
          }
        ]
      },
    ];
    this.rowData = [];
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;
    this.ShowIsOver15 = this.ModuleCode === 2793;
    this.getNewData();
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
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

    this.User.ViewSpecialPermission().subscribe(res => {
      this.IsAdmin = res;
    });
  }
  // ngAfterViewInit(): void {

  // }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetRegionList(this.ModuleCode, false)
    ]).subscribe(res => {
      this.ReigonListSet = res[1];
      this.NgSelectRegionParams.selectedObject = res[1][0].RegionCode;
    });
  }
  onChangeReigonObj(newObj) {
    this.VWExeUnitParams.selectedObject = null;
    this.rowData = [];
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'ExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.NgSelectRegionParams.selectedObject).subscribe(res =>
          this.VWExeUnitItems = res
        );
        break;
      case 'FromRequest':
        this.FromRequestParams.loading = true;
        this.ProductRequest.GetProductRequestPaging(1, 30, '',
          '', this.NgSelectRegionParams.selectedObject).subscribe((res: any) => {
            res.List.forEach(element => {
              if (element.ProductRequestNo) {
                element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
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
              } else if (element.Subject) {
                element.ProductRequestCodeSub = element.Subject;
              } else if (element.ProductRequestCode) {
                element.ProductRequestCodeSub = element.ProductRequestCode;
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
    this.HaveMaxBtn = false;
    this.startLeftPosition = 545;
    this.OverPixelWidth = null;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }
  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = null;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  Search() {
    let FromRequestNo = null;
    let ToRequestNo = null;
    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }

    this.ContractService.productRequestwfdetailSearch(
      this.NgSelectRegionParams.selectedObject, // واحد
      this.VWExeUnitParams.selectedObject, // محل هزینه
      FromRequestNo, // از درخواست
      ToRequestNo, // تا درخواست
      this.IsNew, // درخواست جدید
      this.IsExtended, // درخواست تمدید
      this.FromProductRequestDate, // از تاریخ
      this.ToProductRequestDate, // تا تاریخ
      this.ModuleCode, // ماژول کد
      this.NgSelectPersonRoleParams.selectedObject // کاربر گردش کار
    ).subscribe(res => {
      this.rowData = res;
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
            element.ProductRequestCodeSub = element.ProductRequestNo;
          }
          if (element.search) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
          }
          if (element.ProductRequestCode) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
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
              element.ProductRequestCodeSub = element.ProductRequestNo;
            }
            if (element.search) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
            }
            if (element.ProductRequestCode) {
              element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
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
  OnChangeCheckBoxValue(Ischeck, type) {
    switch (type) {
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
  Person_Role_FetchMore(event) {
    this.NgSelectPersonRoleParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetAllPersonsPagingByRoleID(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        true,
        false,
        true,
        null,
      ).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
          this.PersonRoleItems.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
          this.PersonRoleItems.push(element);
        });
        resolve(res.TotalItemCount);
      }
      );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-person-Role-search'
      });
    });
  }
  Person_Role_DoSearch(event) {
    this.NgSelectPersonRoleParams.loading = true;
    this.Actor.GetAllPersonsPagingByRoleID(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false,
      true,
      null,
    ).subscribe(res => {
      this.PersonRoleItems = res.List,
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'user-person-Role-search'
        });
    });
    this.NgSelectPersonRoleParams.loading = false;
  }
  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
    } else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverPixelWidth = null;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  PersonRoleOpened() {
    this.Actor.GetAllPersonsPagingByRoleID(1, 30, '', '', true, false, true, null).subscribe(res => {
      this.PersonRoleItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-Role-search'
      });
    });
  }
  PersonRoleSelectedChange(event) {
    this.PersonRoleSelectedID = event;
  }
}
