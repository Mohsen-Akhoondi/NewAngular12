import { Component, OnInit, ViewChild, TemplateRef,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/lib/custom-checkbox.model';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-general-search-contract-request',
  templateUrl: './general-search-contract-request.component.html',
  styleUrls: ['./general-search-contract-request.component.css']
})
export class GeneralSearchContractRequestComponent implements OnInit {
  @ViewChild('ProductRequestBtn') ProductRequestBtn: TemplateRef<any>;
  @Input() ModuleName;
  private gridApi;
  ReigonListSet = [];
  NgSelectRegionParams = {
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
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  Select22Area;
  FinYearItems = [];
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  FromConclusionContractDate;
  ToConclusionContractDate;
  rowData = [];
  MaincolumnDef;
  btnclicked = false;
  type: string;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  startLeftPosition: number;
  startTopPosition: number;
  HaveHeader: boolean;
  ModuleCode;
  private sub: any;
  IsCost = true;
  FromRequestPageCount;
  FromRequestTotalItemCount;
  ToRequestTotalItemCount;
  ToRequestPageCount;
  FromContractTotalItemCount;
  FromContractPageCount;
  ContractListSetFrom = [];
  currentContractSearchTerm;
  CostContractID;
  currentRequestSearchTerm;
  FromRequestNo;
  ToRequestNo;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  MinHeightPixel: number;
  OverPixelWidth: number;
  paramObj;
  PixelHeight: number;




  FromRequestItems;
  FromRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '350px',
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log-from-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 30, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 20, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', CanGrow: true, HeaderName: 'Subject', width: 35, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 30, },
        { HeaderCaption: 'کد', width: 20, },
        { HeaderCaption: 'موضوع', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };

  ToRequestItems = [];
  ToRequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
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

  NgSelectContractParamsFrom = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'ContractId',
    MinWidth: '130px',
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

  constructor(private Workflow: WorkflowService,
    private Region: RegionListService,
    private route: ActivatedRoute,
    private router: Router,
    private ProductRequest: ProductRequestService,
    private ContractService: ContractListService) {
      this.sub = this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
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
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'درخواست معامله',
        field: '',
        width: 100,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ProductRequestBtn,
        }
      },
      {
        headerName: 'َماهیت',
        field: 'CostType',
        width: 90,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        width: 110,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'شناسه درخواست',
        field: 'ProductRequestID',
        width: 110,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'PersianProductRequestDates',
        width: 100,
        resizable: true
      },
      {
        headerName: 'مبلغ درخواست',
        field: 'SumAmount',
        width: 150,
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
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 110,
        resizable: true
      },
      {
        headerName: 'نحوه اجرای کار',
        field: 'DealMethodName',
        width: 110,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
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
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 110,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 110,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 200,
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
        headerName: 'موضوع قرارداد',
        field: 'Subject',
        width: 300,
        resizable: true
      },
      {
        headerName: 'شناسه قرارداد',
        field: 'ContractID',
        width: 100,
        resizable: true
      }
    ];
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 6;
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.Region.GetRegionList(this.ModuleCode, false),

    ]).subscribe(res => {
      this.FinYearItems = res[0];
      this.ReigonListSet = res[1];
      this.NgSelectRegionParams.selectedObject = res[1][0].RegionCode;
    });
  }
  onChangeReigonObj(newObj) {
    this.rowData = [];
  }
  OnChangeCheckBoxValue(Ischeck, type) {
    switch (type) {
      case 'Select22َArea':
        this.Select22Area = Ischeck;
        const RegionCodeAreaList = [];
        if (Ischeck) {
          this.ReigonListSet.forEach(item => {
            if (item.RegionCode >= 1 && item.RegionCode <= 22) {
              RegionCodeAreaList.push(item.RegionCode);
            }
          });
          this.NgSelectRegionParams.selectedObject = RegionCodeAreaList;
        }
        if (!Ischeck) {
          this.NgSelectRegionParams.selectedObject = null;
        }
        break;
      default:
        break;
    }
  }
  OnFromConclusionContractDateChange(ADate) {
    this.FromConclusionContractDate = ADate.MDate;
    this.ToConclusionContractDate = ADate.MDate;
  }

  OnToConclusionContractDateChange(ADate) {
    this.ToConclusionContractDate = ADate.MDate;
  }
  onGridReady(Param) {
    this.gridApi = Param.api;
  }
  popupclosed(param) {
    this.btnclicked = false;
    this.alertMessageParams.IsMultiLine = false;
    this.startLeftPosition = 545;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  Search() {

    if (this.FromRequestParams.selectedObject && this.ToRequestParams.selectedObject) {
      this.FromRequestNo = this.FromRequestItems.find(x => x.CostFactorID === this.FromRequestParams.selectedObject).ProductRequestNo;
      this.ToRequestNo = this.ToRequestItems.find(x => x.CostFactorID === this.ToRequestParams.selectedObject).ProductRequestNo;
    }
    else{
      this.FromRequestNo = null;
      this.ToRequestNo = null;
    }
    if (this.NgSelectRegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرایی را انتخاب کنید.');
    } else {
      this.ContractService.ContractRequestGeneralSearch(
        this.NgSelectRegionParams.selectedObject,
        this.FromRequestNo,
        this.ToRequestNo,
        this.FinYearParams.selectedObject,
        this.NgSelectContractParamsFrom.selectedObject,
        this.FromConclusionContractDate,
        this.ToConclusionContractDate,
        this.IsCost

      ).subscribe(res => {
        this.rowData = res;
        
      });
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 200;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }
  RedioClick(IsCost) {
    this.IsCost = IsCost;
  }
  OnOpenNgSelect(type) {
    switch (type) {
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


  FetchMoreFromContract(event) {
    this.NgSelectContractParamsFrom.loading = true;
    const ResultList = [];
    this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      null, this.NgSelectRegionParams.selectedObject, this.IsCost, null).subscribe((res: any) => {
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
      event.SearchOption, null, this.NgSelectRegionParams.selectedObject,
      this.IsCost, null).subscribe((res: any) => {
        if (this.currentContractSearchTerm === event.term) {
          this.ContractListSetFrom = res.List;
          this.FromContractTotalItemCount = res.TotalItemCount;
          this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectContractParamsFrom.loading = false;
        }
      });
  }

  FromContractChanged(event) {
    this.CostContractID = event;
  }

  FromContractOpened() {
    this.NgSelectContractParamsFrom.loading = true;
    this.ContractService.GetContractPaging(1, 30, '', '',
      null, this.NgSelectRegionParams.selectedObject, this.IsCost, null).subscribe((res: any) => {
        this.ContractListSetFrom = res.List;
        this.FromContractTotalItemCount = res.TotalItemCount;
        this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    this.NgSelectContractParamsFrom.loading = false;
  }
  ProductRequestColumnBtn(row) {
    if (row == null) {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    } else {
      if (row.RequestObjectTypeCode === 1 || !row.RequestObjectTypeCode) {
        this.type = 'product-request-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 650;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.OverPixelWidth = null;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: this.ModuleCode === 2996 ? 2996 : 2730,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: row.ContractID,
          FirstModuleCode: this.ModuleCode,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: ((this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2996) ? 88888 : 500000),
        };
      }
      if (row.RequestObjectTypeCode === 3) {
        this.type = 'product-request-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 10;
        this.startTopPosition = 0;
        this.OverPixelWidth = null;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: 2773,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: true,
          SelectedContractID: row.ContractID,
          FirstModuleCode: this.ModuleCode,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: ((this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              (this.ModuleCode === 2824) ? 300000 : 500000),
        };
      }
      if (row.RequestObjectTypeCode === 7) {
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
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: row.ContractID,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              // tslint:disable-next-line: max-line-length
              (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756 || this.ModuleCode === 2838 || this.ModuleCode === 2980) ? 500000 : 7,
        };
      }
      if (row.RequestObjectTypeCode === 2 || row.RequestObjectTypeCode === 5 || row.RequestObjectTypeCode === 12) {
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
          ModuleCode: row.RequestObjectTypeCode === 2 ? 2739 : row.RequestObjectTypeCode === 12 ? 3037 : 2840,
          row: row,
          CostFactorID: row.ProductRequestID,
          HaveSave: true,
          IsViewable: true,
          IsEditable: true,
          IsShow: false,
          SelectedContractID: row.ContractID,
          // tslint:disable-next-line: max-line-length
          ModuleViewTypeCode: (this.ModuleCode === 2793) ? 100000
            : (this.ModuleCode === 2824 && row.ContractSatusCode === 2 && !row.PRRelatedContractID) ? 500000 :
              (this.ModuleCode === 2824) ? 300000 : (this.ModuleCode === 2756 || this.ModuleCode === 2838) ? 500000 : 7,
        };
      }
      
    }
  }
}
