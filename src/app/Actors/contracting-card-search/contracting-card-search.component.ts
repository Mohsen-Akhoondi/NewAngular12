import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-contracting-card-search',
  templateUrl: './contracting-card-search.component.html',
  styleUrls: ['./contracting-card-search.component.css']
})
export class ContractingCardSearchComponent implements OnInit {
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  @ViewChild('Print') Print: TemplateRef<any>;
  @ViewChild('ShowRank') ShowRank: TemplateRef<any>;
  @ViewChild('ShowContractorwinercommition') ShowContractorwinercommition: TemplateRef<any>;
  @ViewChild('ShowHistoryList') ShowHistoryList: TemplateRef<any>;
  @ViewChild('SendText') SendText: TemplateRef<any>;
  @ViewChild('ShowInformations') ShowInformations: TemplateRef<any>;
  @ViewChild('ShowRunningContracts') ShowRunningContracts: TemplateRef<any>;
  ModuleCode = 2872;
  RegionParams = { // ok
    Items: [],
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  RegionItems = [];
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  paramObj;
  BusinessPatternParams = { // ok
    Items: [],
    bindLabelProp: 'BusinessPatternName',
    bindValueProp: 'BusinessPatternID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  }
  BusinessPatternItems = [];

  PriceListTopicParams = { // ok
    Items: [],
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };

  PriceListTopicItems = [];
  PixelHeight;
  minWidthPixel;
  PixelWidth;
  PercentWidth;
  MainMaxwidthPixel;
  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  columnDef;
  rowData = [];
  State;
  ContractorType = true;
  Contractorname = '';
  IdentityNo = '';
  RegisterNo = '';
  PriceListTopicID;
  GradeID;
  selectedRow: any;
  IsCheck = false;
  ActorBusinessAllowStateParams = {
    bindLabelProp: 'AllowStateName',
    bindValueProp: 'AllowStateCode',
    selectedObject: null,
    IsDisabled: false,
    loading: false,
    AllowParentSelection: true,
    MinWidth: '90px',
    DropDownMinWidth: '200px'
  };
  ActorBusinessAllowStateList;
  ExeUnitItems;
  RegionCode;
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
  UnitPatternID;
  MaincolumnDef = [];
  MainrowData = [];
  private gridApi;
  private gridMainApi;
  selectedCRow: any;

  constructor(private router: Router,
    private ProductRequest: ProductRequestService,
    private Region: RegionListService,
    private Report: ReportService,
    private Actor: ActorService) {
    this.columnDef = [];

  }

  ngOnInit() {
    this.ActorBusinessAllowStateList = [
      { AllowStateCode: 1, AllowStateName: 'ایجاد شده' },
      { AllowStateCode: 2, AllowStateName: 'منتظر بررسی' },
      { AllowStateCode: 3, AllowStateName: 'تایید اولیه' },
      { AllowStateCode: 4, AllowStateName: 'عدم تایید - نقص مدارک' },
      { AllowStateCode: 5, AllowStateName: 'در انتظار تایید نهایی' },
      { AllowStateCode: 6, AllowStateName: 'در انتظار تایید تغییرات و تایید نهایی' },
      { AllowStateCode: 7, AllowStateName: 'مجاز' },
      { AllowStateCode: 8, AllowStateName: 'غیر مجاز' },
      { AllowStateCode: 9, AllowStateName: 'تایید خوداظهاری مالی' },
      { AllowStateCode: 10, AllowStateName: 'تایید خوداظهاری فنی' },
      { AllowStateCode: 11, AllowStateName: 'تاييد مستندات برای انتشار' },
      { AllowStateCode: 12, AllowStateName: 'تاييد کننده کار گروه' },
      { AllowStateCode: 13, AllowStateName: 'تاييد کاربر دبیرخانه' },
      { AllowStateCode: 14, AllowStateName: 'عدم تاييد مستندات برای انتشار' },
      { AllowStateCode: 15, AllowStateName: 'عدم تاييد کار گروه' },
    ];
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 60;

    this.getNewData();
    this.ColumnsDefinition();
  }
  getNewData(): void {
    this.Region.GetRegionListforBusinessPattern().subscribe(res => {
      this.RegionItems = res;
    });
  }

  onChangeRegion(event) {
    this.BusinessPatternParams.selectedObject = null;
  }

  popupclosed(param) {
    if (this.type === 'select-actor-for-sms') {
      if (param) {
        this.type = 'send-sms';
        this.btnclicked = true;
        this.startLeftPosition = 400;
        this.startTopPosition = 100;
        this.MinHeightPixel = 300;
        this.PixelHeight = 300;
        this.minWidthPixel = 600;
        this.PixelWidth = 600;
        this.MainMaxwidthPixel = 1250;
        this.paramObj = {
          ActorID: this.selectedRow.data.ActorID,
          RegionCode: this.selectedRow.data.RegionCode,
          Cell: param,
        };
      } else {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'شخص فاقد شماره جهت ارسال پیامک است';
        this.btnclicked = true;
        this.startLeftPosition = 500;
        this.startTopPosition = 150;
        return;
      }
    } else {
      this.btnclicked = false;
      this.startLeftPosition = null;
      this.startTopPosition = null;
      this.MinHeightPixel = null;
      this.PixelHeight = null;
      this.minWidthPixel = null;
      this.PixelWidth = null;
      this.MainMaxwidthPixel = null;
      this.type = '';
    }
  }
  onGridReady (params) {
    this.gridApi = params.api;
  }
  onMainGridReady (params) {
    this.gridMainApi = params.api;
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  MainRowClick(InputValue) {
    this.selectedCRow = InputValue;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }


  ColumnsDefinition() {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'جزئیات',
        field: '',
        width: 80,
        resizable: true,
        tooltip: (params) => 'مشاهده جزییات',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowInformations,
        }
      },
      {
        headerName: 'شناسه / شماره ملی',
        field: 'IdentityNO',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        width: 250,
        resizable: true
      },
      {
        headerName: 'شماره تماس',
        field: 'Tel',
        width: 150,
        resizable: true
      },
      {
        headerName: 'محل هزینه',
        field: 'RegionName',
        width: 160,
        resizable: true
      },
      {
        headerName: 'کسب و کار',
        field: 'BusinessPatternName',
        width: 160,
        resizable: true
      },
      {
        headerName: 'رسته/ تخصص',
        field: 'PriceListTopicName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'رتبه',
        field: 'Rank',
        width: 60,
        resizable: true
      },
      {
        headerName: 'ظرفیت آزاد ریالی',
        field: 'Amount',
        width: 130,
        resizable: true
      },
      {
        headerName: 'ظرفیت آزاد تعدادی',
        field: 'Qty',
        width: 130,
        resizable: true
      },
      // {
      //   headerName: 'ظرفیت مازاد ریالی',
      //   field: 'ExtraAmount',
      //   width: 130,
      //   resizable: true
      // },
      // {
      //   headerName: 'ظرفیت مازاد تعدادی',
      //   field: 'ExtraCount',
      //   width: 130,
      //   resizable: true
      // },
      {
        headerName: 'آدرس',
        field: 'Address',
        width: 250,
        resizable: true
      },
      {
        headerName: 'ارسال پیامک',
        field: '',
        width: 100,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.SendText,
        }
      },
      {
        headerName: 'کارت الکترونیک',
        field: '',
        width: 120,
        resizable: false,
        tooltip: (params) => 'چاپ کارت الکترونیک',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Print,
        }
      },
      {
        headerName: 'رتبه',
        field: '',
        width: 60,
        resizable: false,
        tooltip: (params) => 'مشاهده رتبه',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowRank,
        }
      },
      {
        headerName: 'کمیسیون برنده',
        field: '',
        width: 100,
        resizable: false,
        tooltip: (params) => 'تاریخچه کمیسیون برنده',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowContractorwinercommition,
        }
      },
      {
        headerName: 'تاریخچه',
        field: '',
        width: 80,
        resizable: false,
        tooltip: (params) => 'لیست تاریخچه',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowHistoryList,
        }
      }
    ];
    this.MaincolumnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'جزئیات',
        field: '',
        width: 80,
        resizable: true,
        tooltip: (params) => 'مشاهده جزییات',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowInformations,
        }
      },
      {
        headerName: 'شناسه / شماره ملی',
        field: 'IdentityNO',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        width: 250,
        resizable: true
      },
      {
        headerName: 'شماره تماس',
        field: 'Tel',
        width: 150,
        resizable: true
      },
      {
        headerName: 'ظرفیت آزاد ریالی  کل در تمام رشته ها',
        field: 'TotalRemainedRial',
        width: 220,
        resizable: true
      },
      {
        headerName: 'ظرفیت آزاد تعدادی  کل در تمام رشته ها',
        field: 'TotalRemainedCount',
        width: 220,
        resizable: true
      },
      {
        headerName: 'ظرفیت استفاده شده ریالی  کل در تمام رشته ها',
        field: 'TotalUsedRial',
        width: 220,
        resizable: true
      },
      {
        headerName: 'ظرفیت استفاده شده تعدادی  کل در تمام رشته ها',
        field: 'TotalUsedCount',
        width: 220,
        resizable: true
      },
      {
        headerName: 'آدرس',
        field: 'Address',
        width: 250,
        resizable: true
      },
      {
        headerName: 'لیست موارد موثر در کسر ظرفیت کل',
        field: '',
        width: 200,
        resizable: true,
        tooltip: (params) => 'مشاهده لیست قراردادهای جاری و درخواست های موثر در کسر ظرفیت کل',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowRunningContracts,
        }
      },
      {
        headerName: 'کارت الکترونیک',
        field: '',
        width: 120,
        resizable: false,
        tooltip: (params) => 'چاپ کارت الکترونیک',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Print,
        }
      },
      {
        headerName: 'تاریخچه',
        field: '',
        width: 80,
        resizable: false,
        tooltip: (params) => 'لیست تاریخچه',
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowHistoryList,
        }
      }
    ];
  }

  Search() {
    this.Actor.GetContractingCardSearch(
      this.ContractorType,
      this.Contractorname,
      this.IdentityNo,
      this.RegisterNo,
      this.PriceListTopicParams.selectedObject,
      this.GradeID,
      this.VWExeUnitParams.selectedObject,
      this.BusinessPatternParams.selectedObject,
      this.IsCheck,
      this.ActorBusinessAllowStateParams.selectedObject
    ).subscribe(res => {
      this.rowData = res;
    });
  }

  SearchCumulative() {
    this.Actor.GetTotalCapacityContractorCardSearch(
      this.ContractorType,
      this.Contractorname,
      this.IdentityNo,
      this.RegisterNo,
    ).subscribe(res => {
      this.MainrowData = res;
    });
  }

  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
  }

  onChangeBusinessPattern(event) {
    this.PriceListTopicParams.selectedObject = null;
  }
  OnOpenBusinessPattern() {
    this.Actor.GetBusinessPatternListByUnitPatternID(this.UnitPatternID, false).subscribe(res => {
      this.BusinessPatternItems = res;
    });
  }

  OnOpenPriceListTopic() {
    this.Actor.GetPriceListTopicByBusinesPatternID(this.BusinessPatternParams.selectedObject, false).subscribe(res => {
      this.PriceListTopicItems = res;
    });
  }
  onChangeExeUnit(event) {
    this.UnitPatternID = event;
    this.RegionCode = this.ExeUnitItems.find(x => x.UnitPatternID === event).RegionCode;
    this.PriceListTopicParams.selectedObject = null;
    this.BusinessPatternParams.selectedObject = null;
  }
  OnOpenExeUnit() {
    this.ProductRequest.GetVWExeUnit().subscribe(res => {
      this.ExeUnitItems = res;
    });
  }

  OnChangeCheckBoxValue(Ischeck) {
    this.IsCheck = Ischeck;
  }
  onPrintClick(event) {
    this.Report.CorporateRep(
      this.ModuleCode,
      event.ActorID,
      'چاپ کارت پیمانکاری'
    );
  }
  onSendTextClick() {
    if (this.selectedRow) {
      let PersonObject;
      let ManagerCell;
      const promise = new Promise<void>((resolve, reject) => {
        this.Actor.GetActorByActorID(this.selectedRow.data.ActorID, this.ContractorType).subscribe(res => {
          PersonObject = res;
          resolve();
        });
      }).then(() => {
        const CellList = [];
        if (PersonObject.Cell) {
          CellList.push({ title: 'پیمانکار', type: PersonObject.Cell });
        }
        if (PersonObject.CompanyAgentTel) {
          CellList.push({ title: 'نماینده شرکت', type: PersonObject.CompanyAgentTel });
        }
        if (PersonObject.CorporatePositionManagerList) {
          PersonObject.CorporatePositionManagerList.forEach(element => {
            if (element.PositionTypeCode === 2) {
              this.Actor.GetActorByActorID(element.ActorID, false).subscribe(ress => {
                ManagerCell = ress.CellNo;
                if (ManagerCell) {
                  CellList.push({ title: 'مدیرعامل', type: ManagerCell });
                }
              });
            }
          });
        }
        if (CellList.length > 0) {
          this.type = 'select-actor-for-sms';
          this.btnclicked = true;
          this.HaveHeader = true;
          this.PixelWidth = null;
          this.startLeftPosition = 520;
          this.startTopPosition = 220;
          this.HeightPercentWithMaxBtn = null;
          this.MinHeightPixel = null;
          this.paramObj = {
            HeaderName: 'انتخاب شخص جهت ارسال پیامک',
            RadioItems: CellList,
          };
        } else {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'شخص فاقد شماره جهت ارسال پیامک است';
          this.btnclicked = true;
          this.startLeftPosition = 500;
          this.startTopPosition = 150;
          return;
        }
      });
    } else {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'هیچ رکوردی انتخاب نشده است';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 150;
      return;
    }
  }

  onShowInformationsClick(row) {
    let IsCorporate = null;
    if (row.ActorID && row.ActorID != null) {
      const promise = new Promise((resolve, reject) => {
        this.Actor.GetActorDetailsByActorID(row.ActorID).subscribe(res => {
          IsCorporate = res.IsCorporate;
          resolve(IsCorporate);
        });
      }).then((IsCorporate: any) => {
        if (!IsCorporate) {
          this.type = 'person2';
          this.btnclicked = true;
          this.startLeftPosition = 40;
          this.startTopPosition = 10;
          this.PixelHeight = 650;
          this.MinHeightPixel = 650;
          this.PixelWidth = 1280;
          this.MainMaxwidthPixel = 1280;
          // this.OverMainMinwidthPixel = 1280;
          this.PercentWidth = 96;
          this.paramObj = {
            ActorId: row.ActorID,
            ObjectID: row.ActorID,
            HaveWF: false, // 53445
            ModuleViewTypeCode: 500000, // هماهنگی با آفای آخوندی
            HeaderName: 'تامین کننده حقیقی',
          };
        } else if (IsCorporate) {
          this.type = 'corporate2';
          this.btnclicked = true;
          this.startLeftPosition = 40;
          this.startTopPosition = 10;
          this.PixelHeight = 650;
          this.MinHeightPixel = 650;
          this.PixelWidth = 1280;
          this.MainMaxwidthPixel = 1280;
          // this.OverMainMinwidthPixel = 1280;
          this.PercentWidth = 96;
          this.paramObj = {
            CorporateID: row.ActorID,
            ObjectID: row.ActorID,
            ModuleViewTypeCode: 500000, // هماهنگی با آقای آخوندی
            HeaderName: 'تامین کنده حقوقی',
          };
        }
      });
    }
  }

  onShowRankClick(row) {
    if (row) {

      if (!row.PriceListTopicID) {
        this.ShowMessageBoxWithOkBtn('در تب حوزه تخصص رشته مورد نظر را انتخاب نمایید');
        return;
      }
      this.type = 'view-actor-rank';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 117;
      this.startTopPosition = 35;
      this.MinHeightPixel = 400;
      this.PixelHeight = 300;
      this.PixelWidth = 1100;
      this.minWidthPixel = 1100;
      this.paramObj = {
        ActorID: row.ActorID,
        PriceListTopicID: row.PriceListTopicID,
      }
    }
  }
  onShowContractorwinercommitionClick(row) {
    if (row) {
      if (!row.ActorID || !row.PriceListTopicID || !row.RegionCode) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }

      this.type = 'contractor-card-list';
      this.btnclicked = true;
      this.startLeftPosition = 74;
      this.startTopPosition = 5;
      this.MinHeightPixel = 500;
      this.PixelHeight = 600;
      this.minWidthPixel = 1250;
      this.PixelWidth = 1250;
      this.MainMaxwidthPixel = 1250;

      this.paramObj = {
        ActorID: row.ActorID,
        PriceListTopicID: row.PriceListTopicID,
        RegionCode: row.RegionCode,
        UnitPatternID: row.UnitPatternID,
      };
    }
  }
  onShowHistoryListClick(row) {
    if (row) {
      if (!row.ActorID) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }
      this.type = 'contractor-card-list';
      this.btnclicked = true;
      this.startLeftPosition = 74;
      this.startTopPosition = 5;
      this.MinHeightPixel = 500;
      this.PixelHeight = 600;
      this.minWidthPixel = 1250;
      this.PixelWidth = 1250;
      this.MainMaxwidthPixel = 1250;

      this.paramObj = {
        ActorID: row.ActorID,
        PriceListTopicID: null,
        RegionCode: null,
        UnitPatternID: null,
      };
    }
  }
  onShowRunningContractsClick(row) {
    if (row) {
      if (!row.ActorID) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }
      this.type = 'current-suppliers-contract';
      this.btnclicked = true;
      this.startLeftPosition = 74;
      this.startTopPosition = 5;
      this.minWidthPixel = 1250;
      this.PixelWidth = 1250;
      this.MainMaxwidthPixel = 1250;
      this.PixelHeight = 650;
      this.MinHeightPixel = 650;

      this.paramObj = {
        ActorID: row.ActorID,
      };
    }
  }
}
