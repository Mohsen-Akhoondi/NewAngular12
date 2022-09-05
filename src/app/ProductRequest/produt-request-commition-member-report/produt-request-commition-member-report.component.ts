import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-produt-request-commition-member-report',
  templateUrl: './produt-request-commition-member-report.component.html',
  styleUrls: ['./produt-request-commition-member-report.component.css']
})
export class ProdutRequestCommitionMemberReportComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('HaveSign') HaveSign: TemplateRef<any>;
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
  ReigonListSet = [];
  ModuleCode;
  FromRequestTotalItemCount;
  FromRequestPageCount;
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
  FromRequestItems;
  ToRequestTotalItemCount;
  ToRequestPageCount;
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
  ToRequestItems = [];
  currentRequestSearchTerm;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  CostCenterItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubCostCenterItems;
  FromCommitionDate;
  ToCommitionDate;
  columnDef;
  rowData = [];
  CommitionParams = {
    bindLabelProp: 'CommitionName',
    bindValueProp: 'CommitionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CommitionItems;
  CommitionMemberParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CommitionMemberItems;
  Select22Area;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  CustomCheckBoxConfig2: CustomCheckBoxModel = new CustomCheckBoxModel();
  SelectAll;

  constructor(
    private Region: RegionListService,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 23;
    this.CustomCheckBoxConfig2.color = 'state p-primary';
    this.CustomCheckBoxConfig2.icon = 'fa fa-check';
    this.CustomCheckBoxConfig2.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig2.AriaWidth = 0;
    forkJoin([
      this.Region.GetRegionList(this.ModuleCode, false),
      this.ProductRequest.GetCommitionList()
    ]).subscribe(res => {
      this.ReigonListSet = res[0];
      this.NgSelectRegionParams.selectedObject = res[0][0].RegionCode;
      this.CommitionItems = res[1];
    });
  }
  ngAfterViewInit(): void {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'PersianProductRequestDates',
        width: 120,
        resizable: true
      },
      {
        headerName: 'معاونت متولی',
        field: 'PRStackHolderName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'اداره متولی',
        field: 'PRsubStackHolderName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'معاونت مجری',
        field: 'CostCenterName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'اداره مجری',
        field: 'SubCostCenterName',
        width: 150,
        resizable: true
      },
      // {
      //   headerName: 'شماره قرارداد',
      //   field: 'LetterNo',
      //   width: 120,
      //   resizable: true
      // },
      // {
      //   headerName: 'تاریخ قرارداد',
      //   field: 'PersianLetterDate',
      //   width: 120,
      //   resizable: true
      // },
      {
        headerName: 'تاریخ کمیسیون',
        field: 'PersianOrderCommitionDate',
        width: 100,
        resizable: true
      },
      {
        headerName: 'عضو کمیسیون',
        field: 'PersonName',
        width: 180,
        resizable: true
      },
      { // RFC 65376
        headerName: 'سمت',
        field: 'SignerPositionName',
        width: 180,
        resizable: true
      },
      {
        headerName: 'تاریخ امضاء الکترونیک',
        field: 'PersianSignDate',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاخیر در امضاء',
        field: 'DurationDay',
        width: 100,
        resizable: true
      },
      {
        headerName: 'امضاء الکترونیک',
        field: '',
        width: 120,
        resizable: true,
        editable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.HaveSign
        },
      },
    ];
  }
  onChangeReigonObj(event) {
    this.CostCenterParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
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
      case 'CostCenter':
        this.ProductRequest.GetByRegionCodeUserWorkLog(this.NgSelectRegionParams.selectedObject, null, true).subscribe(res =>
          this.CostCenterItems = res
        );
        break;
      case 'SubCostCenter':
        this.ProductRequest.GetSubCostCenterList(this.CostCenterParams.selectedObject).subscribe(Res => {
          this.SubCostCenterItems = Res;
        });
        break;
      case 'CommitionMember':
        if (this.CommitionParams.selectedObject > 0) {
          this.ProductRequest.GetCommitionMemberList(this.CommitionParams.selectedObject, this.NgSelectRegionParams.selectedObject).subscribe(res => {
            this.CommitionMemberItems = res;
          });
        }
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
      case 'CostCenter':
        this.SubCostCenterParams.selectedObject = null;
        break;
      default:
        break;
    }
  }
  OnFromCommitionDateChange(Date) {
    this.FromCommitionDate = Date.MDate;
  }
  OnToCommitionDateChange(Date) {
    this.ToCommitionDate = Date.MDate;
  }
  onChangeCommition(CommitionCode) {
    this.CommitionMemberParams.selectedObject = null;
    if (this.CommitionParams.selectedObject > 0) {
      this.ProductRequest.GetCommitionMemberList(CommitionCode, this.NgSelectRegionParams.selectedObject, null).subscribe(res => {
        this.CommitionMemberItems = res;
      });
    }
  }
  Search() {
    this.ProductRequest.RequestCommitionMemberReport(
      this.NgSelectRegionParams.selectedObject,
      this.FromRequestParams.selectedObject,
      this.ToRequestParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.FromCommitionDate,
      this.ToCommitionDate,
      this.CommitionParams.selectedObject
    ).subscribe(res => {
      this.rowData = res;
    });
  }
  closeModal() {
    this.Closed.emit(true);
  }
  OnChangeCheckBoxValue(Ischeck, type) {
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
      default:
        break;
    }
  }
}
