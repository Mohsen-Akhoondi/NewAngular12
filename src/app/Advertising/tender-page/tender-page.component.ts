import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { GridOptions } from 'ag-grid-community';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { AuthService } from 'src/app/Services/BaseService/Auth.Service';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
@Component({
  selector: 'app-tender-page',
  templateUrl: './tender-page.component.html',
  styleUrls: ['./tender-page.component.css']
})
export class TenderPageComponent implements OnInit {
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  @ViewChild('Details') Details: TemplateRef<any>;
  @ViewChild('Download') Download: TemplateRef<any>;
  @ViewChild('Upload') Upload: TemplateRef<any>;
  rowData = [];
  gridApi;
  TotalRecordCount;
  ShowAccordion = true;
  IsDown = false;
  selectedRow;
  RegionGroupName;
  CostCenterCodes = <any>[];
  SubCostCenterCodes = <any>[];
  RegionCodes = <any>[];
  btnclicked;
  OverStartTopPosition;
  OverPixelWidth;
  BtnClickName = '';
  overStartLeftPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverPixelHeight;
  IsDuring = true;
  IsExpired = true;
  ContractPublicSaleCount;
  DealsDetailParam;
  columnDef;
  RegionList;
  type = 'مناقصات';
  ENType = 'auction';
  PopupType;
  HoverTender = false;
  HoverAuction = false;
  HoverPublicSale = false;
  HoverLimitedTender = false;
  CurrRegionGroupCode;
  RegionGroupItems;
  RegionGroupParams = {
    bindLabelProp: 'RegionGroupName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    clearable: false,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgSelectParams = {
    Items: [],
    bindLabelProp: 'PriceListTopicCodeName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.IsExpired) {
        return { 'color': '#ccc' };
      } else {
        return { 'background-color': '#c9ffd3' };
      }
    }
  };
  gridrows;
  ContactPriceListPatternID;
  UploadHeaderName;
  ContractTenderCount = null;
  ContractLimitedTenderCount = null;
  ContractAuctionCount = null;
  HasUploadDoc = false;
  constructor(private DealsHall: DealsHallService,
    private route: ActivatedRoute,
    private AuthServices: AuthService,
    private CommonService: CommonServices,
    private ProductRequestService: ProductRequestService) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.HasUploadDoc = true;
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        sortable: false,
        resizable: true
      },
      {
        headerName: 'جزییات',
        field: '',
        width: 55,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Details
        }
      },
      {
        headerName: 'دانلود اسناد',
        field: '',
        width: 80,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Download
        }
      },
      {
        headerName: 'شرکت در مناقصه',
        field: '',
        width: 105,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Upload
        }
      },
      {
        headerName: 'کارفرما',
        field: 'RegionName',
        width: 135,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        width: 135,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'شرح آگهی',
        field: 'Note',
        width: 135,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'مدت اجرای قرارداد',
        field: 'ContractLenght',
        width: 130,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: false
      },
      {
        headerName: 'مبلغ برآورد',
        field: 'Amount',
        width: 120,
        resizable: true,
        HaveThousand: true,
        hide: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'رتبه مورد نیاز',
        field: 'RatingRequired',
        width: 85,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'شماره آگهی',
        field: 'AdvertisingNo',
        width: 95,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'تاریخ انتشار',
        field: 'PersianRegisterDate',
        colId: 'RegisterDate',
        width: 95,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'تاریخ انقضا',
        field: 'PersianExpireDate',
        colId: 'ExpireDate',
        width: 95,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: true
      },
      {
        headerName: 'مدت زمان ',
        field: 'DifferenceDate',
        width: 70,
        resizable: true,
        filter: 'agTextColumnFilter',
        sortable: false
      }
    ];
  }
  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        const SnapshotParams = this.route.snapshot.paramMap.get('type');
        this.ENType = params.get('type') ? params.get('type') : SnapshotParams ? SnapshotParams : 'tender';
      });
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    forkJoin([
      this.DealsHall.GetCountContractTender(),
      this.DealsHall.GetCountContractAuction(),
      this.DealsHall.GetCountContractPublicSale(),
      this.DealsHall.GetRegionGroupList()
    ]).subscribe(res => {
      this.ContractTenderCount = res[0];
      this.ContractAuctionCount = res[1];
      this.ContractPublicSaleCount = res[2];
      this.RegionGroupItems = res[3];
      const RegionGroupItem = this.RegionGroupItems.find(x => x.RegionGroupCode === 0);
      this.RegionGroupName = this.RegionGroupItems[0].RegionGroupName;
      this.RegionGroupParams.selectedObject = RegionGroupItem ? 0 : 1;
      this.RefreshByRegionGroup(this.RegionGroupParams.selectedObject);
      this.LoadLimitedTender();
    });
    switch (this.ENType) {
      case 'tender':
        this.type = 'مناقصات عمومی';
        break;
      case 'auction':
        this.type = 'مزایدات عمومی';
        break;
      case 'search':
        this.type = 'استعلام ها';
        break;
      case 'advertising':
        this.type = 'حراج';
        break;
      default:
        break;
    }
  }
  LoadLimitedTender() {
    this.AuthServices.CheckAuth().subscribe(res => {
      if (!res) {
        this.ContractLimitedTenderCount = '-';
      } else {
        this.DealsHall.GetCountContractLimitedTender().subscribe(CountRes => {
          this.ContractLimitedTenderCount = CountRes;
        });
      }
    });
  }
  RefreshByRegionGroup(RegionGroupCode) {
    this.RegionCodes = [];
    this.SubCostCenterCodes = [];
    this.CostCenterCodes = [];
    this.CurrRegionGroupCode = RegionGroupCode;
    const CurrRegionGroupObject = this.RegionGroupItems.find(x => x.RegionGroupCode === RegionGroupCode);
    this.RegionGroupName = CurrRegionGroupObject.RegionGroupName;
    this.DealsHall.GetSpecialRegionList(this.RegionGroupParams.selectedObject).subscribe(res => {
      this.RegionList = res;
      this.ReloadData();
    });
  }
  OnRGselectedChange(selectedObject) {
    this.RefreshByRegionGroup(selectedObject);
  }
  popupclosed(param) {
    if (this.PopupType === 'advertising-login' && param === 'IsLogin') {
      if (this.BtnClickName === 'upload-archive-click') {
        this.OverPixelWidth = 800;
        this.OverPixelHeight = 530;
        this.overStartLeftPosition = 260;
        this.OverStartTopPosition = 30;
        this.PopupType = 'deal-upload-docs';
      } else {
        this.btnclicked = false;
        this.PopupType = null;
        this.LoadLimitedTender();
        this.ReloadData();
      }
    } if (this.PopupType === 'advertising-login' && param !== 'IsLogin') {
      this.btnclicked = false;
      this.PopupType = null;
      this.IsDown = true;
    } else if (this.PopupType === 'advertising-accept-rules' && param === 'IsAccept') {
      this.btnclicked = false;
      this.PopupType = null;
      this.DealsHall.DownloadAdvertisingFiles(this.selectedRow.CostFactorID).subscribe(res => {
        this.CommonService.downloadFile(res);
      });
    } else {
      this.btnclicked = false;
    }
  }
  tree_selectedchange(event) {
  }
  GetType(params) {
    if (params === 'tender') {
      this.type = 'مناقصات عمومی';
      this.UploadHeaderName = 'شرکت در مناقصه';
    }
    if (params === 'auction') {
      this.type = 'مزایدات عمومی';
      this.UploadHeaderName = 'شرکت در مزایده';
    }
    if (params === 'search') {
      this.type = 'استعلام';
      this.UploadHeaderName = 'شرکت در استعلام';
    }
    if (params === 'advertising') {
      this.type = 'حراج';
      this.UploadHeaderName = 'شرکت در حراج';
    }
    if (params === 'limited-tender') {
      this.type = 'مناقصه محدود';
      this.UploadHeaderName = 'شرکت در مناقصه';
    }
    this.ENType = params;
    this.ReloadData();
  }
  OpenDetails(param) {
    this.OverPixelWidth = 800;
    this.OverPixelHeight = 580;
    this.overStartLeftPosition = 260;
    this.OverStartTopPosition = 30;
    this.PopupType = 'DealsDetail';
    this.DealsDetailParam = param;
    this.DealsDetailParam.selectedRow = param;
    switch (this.ENType) {
      case 'auction':
        this.DealsDetailParam.HeaderName = 'جزئیات مزایده عمومی';
        break;
      case 'tender':
        this.DealsDetailParam.HeaderName = 'جزئیات مناقصه عمومی';
        break;
      case 'search':
        this.DealsDetailParam.HeaderName = 'جزئیات استعلام';
        break;
      case 'advertising':
        this.DealsDetailParam.HeaderName = 'جزئیات حراج';
        break;
      case 'limited-tender':
        this.DealsDetailParam.HeaderName = 'جزئیات مناقصه محدود';
        break;
      default:
        break;
    }
    this.DealsDetailParam.HasUploadDoc = param.IsOnline;
    this.DealsDetailParam.ENType = this.ENType;
    this.DealsDetailParam.RegionCode = this.RegionGroupParams.selectedObject;
    this.btnclicked = true;
  }
  ReloadData(PageNumber = 1, PageSize = 30, SortModelList = null, FilterModelList = null, resolve = null) {
    this.IsDown = false;
    switch (this.ENType) {
      case 'auction':

        this.DealsHall.GetContractAuction(
          this.RegionGroupParams.selectedObject,
          this.RegionCodes,
          this.SubCostCenterCodes,
          this.CostCenterCodes,
          this.IsDuring,
          this.IsExpired,
          PageNumber,
          PageSize,
          SortModelList,
          FilterModelList).subscribe((res: any) => {
            this.rowData = res.List;
            if (PageNumber == 1) {
              if (PageNumber == 1) {
                this.TotalRecordCount = res.TotalItemCount;
              }
            }
            this.IsDown = true;
            if (resolve != null) {
              resolve();
            }
          });
        break;
      case 'tender':
        this.DealsHall.GetContractTender(
          this.RegionGroupParams.selectedObject,
          this.RegionCodes,
          this.SubCostCenterCodes,
          this.CostCenterCodes,
          this.IsDuring,
          this.IsExpired,
          PageNumber,
          PageSize,
          SortModelList,
          FilterModelList).subscribe((res: any) => {
            this.rowData = res.List;
            if (PageNumber == 1) {
              this.TotalRecordCount = res.TotalItemCount;
            }
            this.IsDown = true;
            if (resolve != null) {
              resolve();
            }
          });
        break;
      case 'search':
        this.DealsHall.GetContractInquiry(
          this.RegionGroupParams.selectedObject,
          this.RegionCodes,
          this.SubCostCenterCodes,
          this.CostCenterCodes,
          this.IsDuring,
          this.IsExpired,
          PageNumber,
          PageSize,
          SortModelList,
          FilterModelList).subscribe((res: any) => {
            this.rowData = res.List;
            if (PageNumber == 1) {
              this.TotalRecordCount = res.TotalItemCount;
            }
            this.IsDown = true;
            if (resolve != null) {
              resolve();
            }
          });
        break;
      case 'advertising':
        this.DealsHall.GetContractPublicSale(
          this.RegionGroupParams.selectedObject,
          this.RegionCodes,
          this.SubCostCenterCodes,
          this.CostCenterCodes,
          this.IsDuring,
          this.IsExpired,
          PageNumber,
          PageSize,
          SortModelList,
          FilterModelList).subscribe((res: any) => {
            this.rowData = res.List;
            if (PageNumber == 1) {
              this.TotalRecordCount = res.TotalItemCount;
            }
            this.IsDown = true;
            if (resolve != null) {
              resolve();
            }
          });
        break;
      case 'limited-tender':
        this.AuthServices.CheckAuth().subscribe(LoginRes => {
          if (LoginRes) {
            this.DealsHall.GetContractLimitedTender(
              this.RegionGroupParams.selectedObject,
              this.RegionCodes,
              this.SubCostCenterCodes,
              this.CostCenterCodes,
              this.IsDuring,
              this.IsExpired,
              PageNumber,
              PageSize,
              SortModelList,
              FilterModelList).subscribe((res: any) => {
                this.rowData = res.List;
                if (PageNumber == 1) {
                  this.TotalRecordCount = res.TotalItemCount;
                }
                this.IsDown = true;
                if (resolve != null) {
                  resolve();
                }
              });
          } else {
            this.DealsDetailParam = new Object();
            this.DealsDetailParam.HeaderName = 'فرم ورود به سامانه';
            this.overStartLeftPosition = 420;
            this.OverStartTopPosition = 130;
            this.OverPixelWidth = 500;
            this.OverPixelHeight = null;
            this.PopupType = 'advertising-login';
            this.BtnClickName = 'limited-tender-click';
            this.btnclicked = true;
          }
        });
        break;
      default:
        break;
    }
  }
  OnCheckBoxChange(params, RegionCode) {
    const index: number = this.RegionCodes.indexOf(RegionCode);
    params ? this.RegionCodes.push(RegionCode) : this.RegionCodes.splice(index, 1);
    this.ReloadData();
  }
  TreeSelectedChange(SelectedItems) {
    this.CostCenterCodes = [];
    this.SubCostCenterCodes = [];
    if (SelectedItems && SelectedItems.length > 0) {
      SelectedItems.forEach(element => {
        if (element.CostCenterCode && element.CostCenterCode !== '') {
          this.CostCenterCodes.push(element.CostCenterCode);
        }
        if (element.SubCostCenterCode && element.SubCostCenterCode !== '') {
          this.SubCostCenterCodes.push(element.SubCostCenterCode);
        }
      });
    }
    this.ReloadData();
  }
  FilterCheckBox(param, type) {
    switch (type) {
      case 'IsDuring':
        this.IsDuring = param;
        break;
      case 'IsExpired':
        this.IsExpired = param;
        break;
      default:
        break;
    }
    this.ReloadData();
  }
  onRowClick(event) {
  }
  OnArchiveDownload(row) {
    if (this.RegionGroupParams.selectedObject !== 200) {
      this.selectedRow = row;
      this.DealsDetailParam = row;
      this.DealsDetailParam.HeaderName = 'پذیرش قوانین';
      this.DealsDetailParam.ENType = this.ENType;
      this.overStartLeftPosition = 420;
      this.OverStartTopPosition = 130;
      this.OverPixelWidth = 500;
      this.OverPixelHeight = null;
      this.PopupType = 'advertising-accept-rules';
      this.btnclicked = true;
    } else {
      this.AuthServices.CheckAuth().subscribe(Loginres => {
        if (Loginres) {
          if (row.DealMethodCode === 2) {
            this.ProductRequestService.IsValidProposalByInquiryID(row.InquiryID).subscribe(res => {
              if (res && res !== undefined && res === true) {
                this.selectedRow = row;
                this.DealsDetailParam = row;
                this.DealsDetailParam.HeaderName = 'پذیرش قوانین';
                this.DealsDetailParam.ENType = this.ENType;
                this.overStartLeftPosition = 420;
                this.OverStartTopPosition = 130;
                this.OverPixelWidth = 500;
                this.OverPixelHeight = null;
                this.PopupType = 'advertising-accept-rules';
                this.btnclicked = true;
              } else {
                this.ShowMessageBoxWithOkBtn('شما مجاز به انجام این کار نیستید');
              }
            });
          } else {
            this.selectedRow = row;
            this.DealsDetailParam = row;
            this.DealsDetailParam.HeaderName = 'پذیرش قوانین';
            this.DealsDetailParam.ENType = this.ENType;
            this.overStartLeftPosition = 420;
            this.OverStartTopPosition = 130;
            this.OverPixelWidth = 500;
            this.OverPixelHeight = null;
            this.PopupType = 'advertising-accept-rules';
            this.btnclicked = true;
          }
        } else {
          this.ShowMessageBoxWithOkBtn('جهت دانلود فایل ابتدا وارد سایت شوید');
        }
      });
    }
  }
  OnUploadArchive(row) {
    this.DealsHall.CheckAdvertisingExpireDate(row.InquiryID).subscribe(CheckRes => {
      if (!CheckRes) {
        this.ShowMessageBoxWithOkBtn('زمان بارگذاری و ارسال اسناد با توجه به مهلت ارائه اسناد پایان یافته است ');
      } else {
        this.AuthServices.CheckAuth().subscribe(Loginres => {
          if (!Loginres) {
            this.DealsDetailParam = row;
            this.DealsDetailParam.HeaderName = 'فرم ورود به سامانه';
            this.overStartLeftPosition = 420;
            this.OverStartTopPosition = 130;
            this.OverPixelWidth = 500;
            this.OverPixelHeight = null;
            this.PopupType = 'advertising-login';
            this.BtnClickName = 'upload-archive-click';
            this.btnclicked = true;
          } else {
            this.DealsDetailParam = row;
            this.DealsDetailParam.HeaderName = 'بارگذاری اسناد';
            this.OverPixelWidth = 800;
            this.OverPixelHeight = 565;
            this.overStartLeftPosition = 260;
            this.OverStartTopPosition = 30;
            this.PopupType = 'deal-upload-docs';
            this.btnclicked = true;
          }
        });
      }
    });
  }
  accordionClick() {
    this.ShowAccordion = !this.ShowAccordion;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.overStartLeftPosition = 530;
    this.OverStartTopPosition = 200;
    this.OverPixelWidth = null;
    this.OverPixelHeight = null;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  OnChangePage(ChangeParam) {
    this.rowData = [];
    this.ReloadData(ChangeParam.PageNumber, ChangeParam.PageSize, ChangeParam.SortModels, ChangeParam.FilterModelList);
  }
  OnSortChange(param) {
    this.rowData = [];
    this.ReloadData(param.PageNumber, param.PageSize, param.SortModels);
  }
  OnFilterChange(param) {
    const promise = new Promise((resolve, reject) => {
      this.ReloadData(1, 30, null, param, resolve);
    }).then(() => {

      setTimeout(() => {
        param.forEach(element => {
          const countryFilterComponent = this.gridApi.getFilterInstance(element.FieldName);
          const model = {
            filter: element.FilterText,
            filterType: 'text',
            type: element.FilterType
          };
          countryFilterComponent.setModel(model);
        });
      }, 10);
    });

  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
}
