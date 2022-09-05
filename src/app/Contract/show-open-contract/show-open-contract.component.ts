import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { PriceListTopicService } from 'src/app/Services/BaseService/PriceListTopicService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/lib/custom-checkbox.model';

@Component({
  selector: 'app-show-open-contract',
  templateUrl: './show-open-contract.component.html',
  styleUrls: ['./show-open-contract.component.css']
})
export class ShowOpenContractComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupParam;
  columnDef;
  rowData: any = [];
  ActorID;
  isClicked = false;
  startLeftPosition = 200;
  startTopPosition = 100;
  PopUpType;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HeightPercentWithMaxBtn;
  HaveHeader;
  PercentWidth;
  MainMaxwidthPixel;
  MinHeightPixel;
  OverMainMinwidthPixel;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RegionItems = [];
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  FinYearItems;
  RusteeParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RusteeItems;
  PriceListTopicRasteParams = {
    bindLabelProp: 'Level1Name',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'price-list-topic',
    Required: false
  };
  PriceListTopicRasteItems = [];
  RegionGroupListSet = [];
  NgSelectRegionGroupParams = {
    Items: [],
    bindLabelProp: 'RegionGroupCodeName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  }; // 64181
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  SelectArea;

  constructor(private ContractList: ContractListService,
    private RegionList: RegionListService,
    private FinYear: FinYearService,
    private Report: ReportService,
    private PriceListTopic: PriceListTopicService,
    private ProductRequest: ProductRequestService,) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'کد درخواست معامله',
        field: 'ProductRequestCode',
        width: 130,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'PersianProductRequestDate',
        width: 130,
        resizable: true
      },
      {
        headerName: 'روش انجام معامله',
        field: 'DealMethodName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'معاونت مجری',
        field: 'CostCenterName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'رسته',
        field: 'PriceListTopicName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'موضوع درخواست',
        field: 'PrSubject',
        width: 250,
        resizable: true
      },
      {
        headerName: 'سال مالی قرارداد',
        field: 'FinYearCode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Contractsubject',
        width: 250,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        width: 130,
        resizable: true
      },
      {
        headerName: 'مبلغ  برنده',
        field: 'SumPrice',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع قرارداد',
        field: 'FromContractDatePersian',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان قرارداد',
        field: 'ToContractDatePersian',
        width: 130,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    forkJoin([
      this.RegionList.GetUserRegionList(),
      this.FinYear.GetFinYearList(),
      this.PriceListTopic.GetPriceListPatternRaste("01"),
      this.RegionList.GetRegionGroupList()
    ]).subscribe(res => {
      this.RegionItems = res[0];
      this.FinYearItems = res[1];
      this.PriceListTopicRasteItems = res[2];
      this.RegionGroupListSet = res[3];
    });
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 3;
  }
  close(): void {
    this.Closed.emit(true);
  }
  onGridReady(e) {
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed(event) {
    this.isClicked = false;
  }
  OnOpenNgSelect() {
    this.RusteeItems = [];
    if (this.RegionParams.selectedObject) {
      this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, null, true).subscribe(ress => {
        this.RusteeItems = ress;
      });
    } else {
      this.ShowMessageBoxWithOkBtn('واحد اجرایی را انتخاب نمایید');
    }
  }
  Search() {
    if (this.RegionParams.selectedObject !== null) {
      let RegionItems;
      if (this.RegionParams.selectedObject) {
        this.RegionParams.selectedObject.forEach(element => {
          if (RegionItems == null) {
            RegionItems = element;
          } else {
            RegionItems = RegionItems + ',' + element;
          }
        });
      } else {
        RegionItems = '';
      }

      this.ContractList.GetOpenContractByRegion(
        RegionItems,
        this.FinYearParams.selectedObject,
        this.RusteeParams.selectedObject,
        this.PriceListTopicRasteParams.selectedObject
      ).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.rowData = [];
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('واحد اجرایی را انتخاب نمایید');
    }
  }
  print() {
    this.Report.OpenContractRep(
      this.RegionParams.selectedObject,
      this.FinYearParams.selectedObject,
      this.RusteeParams.selectedObject,
      this.PriceListTopicRasteParams.selectedObject
    );
  }
  onChangeRegionGroupObj(event) {
    this.RegionParams.selectedObject = "";
    this.SelectArea = false;
    this.RegionList.GetRegionByRegionGroup(this.NgSelectRegionGroupParams.selectedObject).subscribe(res => {
      this.RegionItems = res;
    });
  }
  OnChangeCheckBoxValue(Ischeck) {
    this.SelectArea = Ischeck;
    const RegionCodeAreaList = [];
    if (Ischeck) {
      this.RegionItems.forEach(item => {
        RegionCodeAreaList.push(item.RegionCode);
      });
      this.RegionParams.selectedObject = RegionCodeAreaList;
    }
    if (!Ischeck) {
      this.RegionParams.selectedObject = null;
    }
  }
}
