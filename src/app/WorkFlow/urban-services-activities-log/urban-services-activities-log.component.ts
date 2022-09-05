import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-urban-services-activities-log',
  templateUrl: './urban-services-activities-log.component.html',
  styleUrls: ['./urban-services-activities-log.component.css']
})
export class UrbanServicesActivitiesLogComponent implements OnInit {
  @ViewChild('IsPostedToClean') IsPostedToClean: TemplateRef<any>;
  @Input() ModuleName;
  private gridApi;
  ReigonListSet = [];
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
  rowData: any;
  MaincolumnDef;
  FinYearList = [];
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
  ContractStatusList = [];
  NgSelectContractStatusParams = {
    Items: [],
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
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
  ServicesList = [];
  NgSelecServicesParams = {
    Items: [],
    bindLabelProp: 'ProductCodeName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '530px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  selectedRow;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '' };
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  MinHeightPixel: number;
  startLeftPosition: number;
  startTopPosition: number;
  OverPixelWidth: number;
  paramObj;
  private sub: any;
  ModuleCode;
  IsPartial = false;
  IsDisableShowProductRequest = true;
  FromContractTotalItemCount;
  ToContractTotalItemCount;
  FromContractPageCount;
  ToContractPageCount;
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
  ContractListSetFrom = [];
  ContractListSetTo = [];
  currentContractSearchTerm;
  FromProductRequestDate;
  ToProductRequestDate;
  FromContractDate;
  ToContractDate;
  SumFinalAmountStr = '0';
  SumFinalAmount = 0;
  SumFinalContractAmountStr = '0';
  SumFinalReceiptAmountStr = '0';
  SumFinalContractAmoun = 0;
  SelectAll;
  Select22Area;
  SelectOrder = false;
  IsCost = true;
  IsPrint = false;
  constructor(private router: Router,
    private Workflow: WorkflowService,
    private Region: RegionListService,
    private DealsHall: DealsHallService,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private ContractService: ContractListService,
    private Report: ReportService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 0;
    this.rowData = [];
    this.getNewData();
  }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.ProductRequest.GetSpecialRegionListforUrbanService(),
      this.ProductRequest.GetUrbanServiceServices(),
      this.ContractService.GetContractStatusList()
    ]).subscribe(res => {
      this.FinYearList = res[0];
      this.ReigonListSet = res[1];
      this.ServicesList = res[2];
      this.ContractStatusList = res[3];
    }, err => {
      console.log('err');
    });
  }
  onChangeReigonObj(newObj) {
    this.rowData = [];
  }
  onGridReady(Param) {
    this.gridApi = Param.api;
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.MaincolumnDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'اطلاعات درخواست',
        children: [
          {
            headerName: 'واحد اجرايي',
            field: 'RegionName',
            width: 120,
            resizable: true,
            sortable: true,
          },
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
            headerName: 'تاريخ',
            field: 'PersianProductRequestDates',
            width: 120,
            resizable: true
          },
          {
            headerName: 'معاونت مجري',
            field: 'PRCostCenterName',
            width: 120,
            resizable: true
          },
          {
            headerName: 'معاونت متولي',
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
            headerName: 'مبلغ درخواست',
            field: 'SumAmount',
            width: 100,
            HaveThousand: true,
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
            headerName: 'حالت درخواست',
            field: 'ProductRequestStatusName',
            width: 100,
            resizable: true
          },
          {
            headerName: 'نوع گردش کار',
            field: 'WorkflowTypeName',
            width: 150,
            resizable: true
          },
          {
            headerName: 'وضعيت درخواست',
            field: 'RoleName',
            width: 200,
            resizable: true
          },
          {
            headerName: 'فعاليت',
            field: 'ProductCodeName',
            width: 250,
            resizable: true
          }
        ]
      },
      {
        headerName: 'اطلاعات قرارداد',
        children: [
          {
            headerName: 'سال مالي',
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
            headerName: 'تاريخ شروع',
            field: 'FromContractDatePersian',
            width: 100,
            resizable: true
          },
          {
            headerName: 'تاريخ پايان',
            field: 'ToContractDatePersian',
            width: 100,
            resizable: true
          },
          {
            headerName: 'نام پيمانکار',
            field: 'ContractorName',
            width: 300,
            resizable: true
          },
          {
            headerName: 'َشناسه ملي / کد ملي',
            field: 'IdentityNo',
            width: 250,
            resizable: true
          },
          {
            headerName: 'َماهيت',
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
            headerName: 'نحوه اجراي کار',
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
            resizable: true,
            HaveThousand: true, // RFC 53108
          },
          {
            headerName: 'مبلغ وصولي',
            field: 'ReceiptAmount',
            width: 200,
            resizable: true,
            HaveThousand: true,
          },
          {
            headerName: 'شماره مرحله',
            field: 'OrderNo',
            width: 90,
            resizable: true
          },
          {
            headerName: 'کد سامانه مالي',
            field: 'ContractCode',
            width: 100,
            resizable: true
          },
          {
            headerName: 'وضعيت قرارداد',
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
  FromFinYearChanged(event) {
    this.NgSelectToFinYearParams.selectedObject = this.NgSelectFromFinYearParams.selectedObject;
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
  OnFromProductRequestDateChange(ADate) {
    this.FromProductRequestDate = ADate.MDate;
  }
  OnToProductRequestDateChange(ADate) {
    this.ToProductRequestDate = ADate.MDate;
  }
  OnFromContractDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
  }
  OnToContractDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
  }
  OnFilterChanged() {
    this.SetSumFinalAmount();
  }
  OnRowDataChanged() {
    this.SetSumFinalAmount();
  }
  OnRowDataUpdated() {
    this.SetSumFinalAmount();
  }
  SetSumFinalAmount() {
    let SumFinalAmount = 0;
    let SumFinalContractAmount = 0;
    let SumFReceiptAmount = 0;

    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.SumAmount) {
          // tslint:disable-next-line:radix
          SumFinalAmount = SumFinalAmount + parseFloat(node.data.SumAmount);
        }
        if (node.data.ContractAmount) { // RFC 53108
          SumFinalContractAmount = SumFinalContractAmount + parseFloat(node.data.ContractAmount);
        }
        if (node.data.ReceiptAmount) {
          SumFReceiptAmount = SumFReceiptAmount + parseFloat(node.data.ReceiptAmount);
        }
      });
      this.SumFinalAmount = SumFinalAmount;
      this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      this.SumFinalContractAmoun = SumFinalContractAmount;
      this.SumFinalContractAmountStr = SumFinalContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // RRFC 53108
      this.SumFinalReceiptAmountStr = SumFReceiptAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  Search() {
    this.IsPrint = true;
    if (!this.NgSelectRegionParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي نمي تواند خالي باشد');
      return;
    }
    // tslint:disable-next-line:max-line-length
    // } else if (!this.NgSelecServicesParams.selectedObject && !(this.NgSelectRegionParams.selectedObject > 0 && this.NgSelectRegionParams.selectedObject < 23)) {
    //   this.ShowMessageBoxWithOkBtn(' فعاليت نمي تواند خالي باشد');
    //   return;
    // }

    this.ContractService.ContractRequestUrbanServiceSearch(
      this.NgSelectRegionParams.selectedObject,
      this.IsCost,
      this.SelectOrder,
      this.NgSelectFromFinYearParams.selectedObject,
      this.NgSelectToFinYearParams.selectedObject,
      this.NgSelecServicesParams.selectedObject,
      this.NgSelectContractParamsFrom.selectedObject,
      this.NgSelectContractParamsTo.selectedObject,
      this.FromContractDate,
      this.ToContractDate,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.NgSelectContractStatusParams.selectedObject
    ).subscribe((res: any) => {
      this.rowData = res;
      this.IsPrint = res.length > 0 ? true : false;
    });
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
    if (this.selectedRow) {
      this.IsDisableShowProductRequest = false;
    }
  }
  BtnShowProductRequest() {
    if (this.selectedRow == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد هاي مورد نظر را انتخاب نماييد');
    } else {
      if (this.selectedRow.data.RequestObjectTypeCode === 1 ||
        this.selectedRow.data.RequestObjectTypeCode === 3 ||
        !this.selectedRow.data.RequestObjectTypeCode) {
        this.type = 'product-request-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 10;
        this.startTopPosition = 5;
        this.OverPixelWidth = 1280;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: this.selectedRow.data.RequestObjectTypeCode === 1 ? 2730 :
          this.selectedRow.data.RequestObjectTypeCode === 3 ? 2773 : 2730,
          selectedRow: this.selectedRow,
          CostFactorID: this.selectedRow.data.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: this.selectedRow.data.ContractId,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 800000,
        };
      }
      if (this.selectedRow.data.RequestObjectTypeCode === 7) {
        this.type = 'product-request-page-without-flow';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: 2776,
          selectedRow: this.selectedRow,
          CostFactorID: this.selectedRow.data.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: this.selectedRow.data.ContractId,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 800000,
        };
      }
      if (this.selectedRow.data.RequestObjectTypeCode === 2) {
        this.type = 'product-request-page-without-flow';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 110;
        this.startTopPosition = 5;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: 2739,
          selectedRow: this.selectedRow,
          CostFactorID: this.selectedRow.data.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: this.selectedRow.data.ContractId,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: 800000,
        };
      }
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
  Print() {
    const HeaderName = 'درخواست معاونت خدمات شهری';
    if (this.IsCost) {
    } else {
      this.IsCost = null;
    }
    let RegionItems;
    if (this.NgSelectRegionParams.selectedObject) {
      this.NgSelectRegionParams.selectedObject.forEach(element => {
        if (RegionItems) {
          RegionItems = RegionItems + ',' + element;
        } else {
          RegionItems = element;
        }
      });
    } else {
      RegionItems = '';
    }
    let ServicesItems;
    if (this.NgSelecServicesParams.selectedObject) {
      this.NgSelecServicesParams.selectedObject.forEach(element => {
        if (ServicesItems) {
          ServicesItems = ServicesItems + ',' + element;
        } else {
          ServicesItems = element;
        }
      });
    } else {
      ServicesItems = '';
    }
    this.Report.PUrbanActivityListReport(RegionItems,
      this.ModuleCode,
      HeaderName,
      this.IsCost,
      this.SelectOrder,
      this.IsPartial,
      ServicesItems,
      this.NgSelectContractParamsFrom.selectedObject,
      this.NgSelectContractParamsTo.selectedObject,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.FromContractDate,
      this.ToContractDate,
      this.NgSelectFromFinYearParams.selectedObject,
      this.NgSelectToFinYearParams.selectedObject,
      this.SumFinalAmountStr,
      this.SumFinalContractAmountStr,
      this.SumFinalReceiptAmountStr,
      this.NgSelectContractStatusParams.selectedObject
    );
  }
  OnChangeCheckBoxValue(Ischeck, type) { // RFC 52080 - درخواست خانم احمدي
    switch (type) {
      case 'SelectAll':
        this.SelectAll = Ischeck;
        const RegionCodeList = [];
        if (Ischeck) {
          this.ReigonListSet.forEach(item => {
            RegionCodeList.push(item.RegionCode);
          });
          this.NgSelectRegionParams.selectedObject = RegionCodeList;
        }
        if (!Ischeck) {
          if (!this.Select22Area) {
            this.NgSelectRegionParams.selectedObject = null;
          } else {
            this.OnChangeCheckBoxValue(true, 'Select22َArea');
          }
        }
        break;
      case 'Select22َArea':
        this.Select22Area = Ischeck;
        const RegionCodeAreaList = [];
        if (Ischeck) {
          this.ReigonListSet.forEach(item => {
            if (!this.SelectAll) {
              if (item.RegionCode > 0 && item.RegionCode <= 22)
                RegionCodeAreaList.push(item.RegionCode);
            } else {
              RegionCodeAreaList.push(item.RegionCode);
            }
          });
          this.NgSelectRegionParams.selectedObject = RegionCodeAreaList;
        }
        if (!Ischeck) {
          if (!this.SelectAll) {
            this.NgSelectRegionParams.selectedObject = null;
          } else {
            this.OnChangeCheckBoxValue(true, 'SelectAll');
          }
        }
        break;
      case 'SelectOrder':
        this.SelectOrder = Ischeck;
        break;
      default:
        break;
    }
  }
  RedioClick(IsCost) {
    this.IsCost = IsCost;
  }
  partialSearch() {
    this.IsPrint = true;
    if (!this.NgSelectRegionParams.selectedObject) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي نمي تواند خالي باشد');
      return;
    }
    // tslint:disable-next-line:max-line-length
    // } else if (!this.NgSelecServicesParams.selectedObject && !(this.NgSelectRegionParams.selectedObject > 0 && this.NgSelectRegionParams.selectedObject < 23)) {
    //   this.ShowMessageBoxWithOkBtn(' فعاليت نمي تواند خالي باشد');
    //   return;
    // }

    this.ContractService.ContractRequestUrbanServicepartialSearch(
      this.NgSelectRegionParams.selectedObject,
      this.IsCost,
      this.SelectOrder,
      this.NgSelectFromFinYearParams.selectedObject,
      this.NgSelectToFinYearParams.selectedObject,
      this.NgSelecServicesParams.selectedObject,
      this.NgSelectContractParamsFrom.selectedObject,
      this.NgSelectContractParamsTo.selectedObject,
      this.FromContractDate,
      this.ToContractDate,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.NgSelectContractStatusParams.selectedObject
    ).subscribe((res: any) => {
      this.rowData = res;
      this.IsPartial = true;
      this.IsPrint = res.length > 0 ? true : false;
    });
  }
}
