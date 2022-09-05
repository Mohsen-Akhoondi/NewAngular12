import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/lib/custom-checkbox.model';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-send-to-clarification-rep',
  templateUrl: './send-to-clarification-rep.component.html',
  styleUrls: ['./send-to-clarification-rep.component.css']
})
export class SendToClarificationRepComponent implements OnInit {
  @ViewChild('HasVAT') HasVAT: TemplateRef<any>;
  private gridApi;
  private gridColumnApi;
  columnDef;
  rowData = [];
  RegionListSet = [];
  IsCost = true;
  FromFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '99px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: true,
  };
  ToFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '99px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: true,
  };
  FinYearItems = [];
  ReigonListSet = [];
  RegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  Subject = '';
  FromContractTotalItemCount;
  ToContractTotalItemCount;
  FromContractPageCount;
  ToContractPageCount;
  NgSelectContractParamsFrom = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'LetterNo',
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
  FromContractDate;
  ToContractDate;
  SelectAll = false;
  FromContractAmount;
  ToContractAmount;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ModuleCode;
  private sub: any;
  FromContractAmountStr = '';
  ToContractAmountStr = '';

  constructor(private router: Router,
    private Region: RegionListService,
    private route: ActivatedRoute,
    private ContractService: ContractListService,
    private RefreshCartable: RefreshServices,
    private Workflow: WorkflowService,
    private ProductRequest: ProductRequestService,
    private ContractList: ContractListService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 20;

    forkJoin([
      this.Workflow.GetFinYearList(),
      this.ProductRequest.GetSpecialRegionListforUrbanService(),
    ]).subscribe(res => {
      this.FinYearItems = res[0];
      this.ReigonListSet = res[1];
    });
  }

  onChangeRegionObj(event) {
    this.rowData = [];
  }
  onGridReady(Param) {
    this.gridApi = Param.api;
  }

  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  RedioClick(IsCost) {
    this.IsCost = IsCost;
    this.rowData = [];
    this.ngAfterViewInit();
  }
  onChangeFromFinYearObj(event) {
    this.ToFinYearParams.selectedObject = event;
  }

  FetchMoreToContract(event) {
    this.NgSelectContractParamsTo.loading = true;
    const ResultList = [];
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
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
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
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
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
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
    this.ContractList.GetContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.ToFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
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
    // this.ToFinYearParams.selectedObject = this.FromFinYearParams.selectedObject;
    ToItems.push(this.ContractListSetFrom.find(x => x.LetterNo === event));
    this.ContractListSetTo = ToItems;
    this.NgSelectContractParamsTo.selectedObject = this.NgSelectContractParamsFrom.selectedObject;
  }
  FromContractOpened() {
    this.NgSelectContractParamsFrom.loading = true;
    this.ContractList.GetContractPaging(1, 30, '', '',
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetFrom = res.List;
        this.FromContractTotalItemCount = res.TotalItemCount;
        this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsFrom.loading = false;
  }

  ToContractOpened() {
    this.NgSelectContractParamsTo.loading = true;
    this.ContractList.GetContractPaging(1, 30, '', '',
      this.FromFinYearParams.selectedObject, this.RegionParams.selectedObject,
      this.IsCost, this.ToFinYearParams.selectedObject).subscribe((res: any) => {
        this.ContractListSetTo = res.List;
        this.ToContractTotalItemCount = res.TotalItemCount;
        this.ToContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsTo.loading = false;
  }

  OnFromContractDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
  }
  OnToContractDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
  }

  OnChangeCheckBoxValue(Ischeck) {
    this.SelectAll = Ischeck;
    const RegionCodeList = [];
    if (Ischeck) {
      this.ReigonListSet.forEach(item => {
        RegionCodeList.push(item.RegionCode);
      });
      this.RegionParams.selectedObject = RegionCodeList;
    }
    if (!Ischeck) {
      this.RegionParams.selectedObject = null;
    }
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    if (this.IsCost) {
      this.columnDef = [
        {
          headerName: 'رديف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 250,
          resizable: true
        },
        {
          headerName: 'نام پیمانکار',
          field: 'ContractorName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'نام کارفرما',
          field: 'EmployerName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'مبلغ نهایی قرارداد',
          field: 'ContractAmount',
          width: 150,
          resizable: true,
          HaveThousand: true,
        },
        {
          headerName: 'تاریخ انعقاد قرارداد',
          field: 'PersianContractDate',
          width: 110,
          resizable: true
        },
        {
          headerName: 'مدیرعامل',
          field: 'CEOName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'مبلغ نقد',
          field: 'CashAmount',
          width: 120,
          resizable: true,
          HaveThousand: true,
        },
        {
          headerName: 'مبلغ غیر نقد',
          field: 'NonCashAmount',
          width: 110,
          resizable: true,
          HaveThousand: true,
        },
        {
          headerName: 'اطلاعات الحاقیه',
          field: 'ContractAttachmentDes',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'مدت قرارداد',
          field: 'Duration',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'روش انتخاب پیمانکار',
          field: 'DealMethodName',
          width: 120,
          resizable: true,
        },
        {
          headerName: 'شناسه ملی پیمانکار',
          field: 'IdentityNo',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'کد اقتصادی پیمانکار',
          field: 'EconomicCode',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'مالیات بر ارزش افزوده',
          field: 'HasVAT',
          width: 130,
          resizable: true,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.HasVAT
          },
        },
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 110,
          resizable: true,
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 110,
          resizable: true,
        },
        {
          headerName: 'معاون ناظر',
          field: 'SupervisorName',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'اعضای کمیسیون',
          field: 'CommitionMember',
          width: 300,
          resizable: true,
        },
        {
          headerName: 'امضا کننده قرارداد از طرف کارفرما',
          field: 'ContractSigner',
          width: 230,
          resizable: true,
        },
        {
          headerName: 'آدرس',
          field: 'Address',
          width: 200,
          resizable: true,
        },
        {
          headerName: 'شناسه یکتای قرارداد',
          field: 'ContractID',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'شناسه یکتای درخواست',
          field: 'ProductRequestID',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'تاریخ ارسال به شفاف',
          field: 'PersianSentDate',
          width: 120,
          resizable: true,
        },

      ];

    } else {
      this.columnDef = [
        {
          headerName: 'رديف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 250,
          resizable: true
        },
        {
          headerName: 'نام بهره بردار',
          field: 'BeneficiaryName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'نام کارفرما',
          field: 'EmployerName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'مبلغ نهایی قرارداد',
          field: 'ContractAmount',
          width: 150,
          resizable: true,
          HaveThousand: true,
        },

        {
          headerName: 'تاریخ انعقاد قرارداد',
          field: 'PersianContractDate',
          width: 110,
          resizable: true
        },
        {
          headerName: 'تاریخ فسخ قرارداد',
          field: '',
          width: 150,
          resizable: true
        },
        {
          headerName: 'مدیرعامل',
          field: 'CEOName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'اطلاعات الحاقیه',
          field: 'ContractAttachmentDes',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'مدت قرارداد',
          field: 'Duration',
          width: 120,
          resizable: true,
        },
        {
          headerName: 'روش انتخاب طرف قرارداد',
          field: 'DealMethodName',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'شناسه ملی بهره بردار',
          field: 'IdentityNo',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'کد اقتصادی بهره بردار',
          field: 'EconomicCode',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'مالیات بر ارزش افزوده',
          field: 'HasVAT',
          width: 130,
          resizable: true,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.HasVAT
          },
        },
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 110,
          resizable: true,
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 110,
          resizable: true,
        },
        {
          headerName: 'معاون ناظر',
          field: 'SupervisorName',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'اعضای کمیسیون',
          field: 'CommitionMember',
          width: 300,
          resizable: true,
        },
        {
          headerName: 'امضا کننده قرارداد از طرف کارفرما',
          field: 'ContractSigner',
          width: 230,
          resizable: true,
        },
        {
          headerName: 'امضا کننده قرارداد از طرف بهره بردار',
          field: '',
          width: 230,
          resizable: true,
        },
        {
          headerName: 'روش تعین برنده',
          field: '',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'آدرس',
          field: 'Address',
          width: 200,
          resizable: true,
        },
        {
          headerName: 'شناسه یکتای قرارداد',
          field: 'ContractID',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'شناسه یکتای درخواست',
          field: 'ProductRequestID',
          width: 150,
          resizable: true,
        },
        {
          headerName: 'تاریخ ارسال به شفاف',
          field: 'PersianSentDate',
          width: 120,
          resizable: true,
        },
      ];
    }
  }

  getFromAmount(event) {
    if (event) {
      this.FromContractAmountStr = event;
      this.FromContractAmount = parseFloat((this.FromContractAmountStr).replace(/,/g, ''));
    } else {
      this.FromContractAmountStr = '';
      this.FromContractAmount = null;
    }
  }
  getToAmount(event) {
    if (event) {
      this.ToContractAmountStr = event;
      this.ToContractAmount = parseFloat((this.ToContractAmountStr).replace(/,/g, ''));
    } else {
      this.ToContractAmountStr = '';
      this.ToContractAmount = null;
    }
  }

  Search() {
    this.ContractList.GetSentToClarificationList(this.RegionParams.selectedObject, this.IsCost,
      this.FromFinYearParams.selectedObject, this.ToFinYearParams.selectedObject, this.Subject,
      this.NgSelectContractParamsFrom.selectedObject, this.NgSelectContractParamsTo.selectedObject,
      this.FromContractDate, this.ToContractDate, this.FromContractAmount, this.ToContractAmount).subscribe(res => {
        this.rowData = res;
      });
  }

}
