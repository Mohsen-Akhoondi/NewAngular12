import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-contract-status-summary-search-page',
  templateUrl: './contract-status-summary-search-page.component.html',
  styleUrls: ['./contract-status-summary-search-page.component.css']
})
export class ContractStatusSummarySearchPageComponent implements OnInit {
  private sub: any;
  private gridApi;
  ReigonListSet = [];
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: true
  };
  rowData = [];
  MaincolumnDef;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  btnclicked = false;
  PopupType: string;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '' };
  startLeftPosition: number;
  startTopPosition: number;
  ModuleCode;
  SumFinalAmountStr = '0';
  SumFinalAmount = 0;
  SumFinalCountStr = '0';
  SumFinalCount = 0;
  SelectAll;
  HaveHeader: boolean;
  RegionCode;

  ExeUnitItems;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '100px',
    DropDownMinWidth: '300px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'ExeUnit'
  };

  BusinessPatternParams = {
    Items: [],
    bindLabelProp: 'BusinessPatternName',
    bindValueProp: 'BusinessPatternID',
    placeholder: '',
    MinWidth: '100px',
    DropDownMinWidth: '300px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  BusinessPatternItems = [];

  PriceListTopicParams = {
    Items: [],
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '100px',
    DropDownMinWidth: '300px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  PriceListTopicItems = [];
  Grade;

  constructor(private ContractService: ContractListService,
    private route: ActivatedRoute,
    private router: Router,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private Actor: ActorService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.MaincolumnDef = [
      {
        headerName: '',
        children: [
          {
            headerName: 'رديف',
            field: 'ItemNo',
            width: 50,
            resizable: true
          },
          {
            headerName: 'واحد اجرایی',
            field: 'RegionName',
            width: 150,
            resizable: true
          },
          {
            headerName: 'رشته',
            field: 'PriceListTopicName',
            width: 120,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'رتبه',
            field: 'ContractorRank',
            width: 50,
            resizable: true,
            sortable: true,
          },
        ]
      },
      {
        headerName: 'مجموع قرارداد',
        children: [
          {
            headerName: 'تعداد',
            field: 'SumContractCount',
            width: 80,
            resizable: true
          },
          {
            headerName: 'مبلغ',
            field: 'SumContractAmount',
            width: 220,
            resizable: true
          }
        ]
      },
    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 0;
    this.getNewData();
  }

  getNewData(): void {
    forkJoin([
      this.Region.GetRegionList(this.ModuleCode, false),
    ]).subscribe(res => {
      this.ReigonListSet = res[0];
    });
  }

  onChangeReigonObj(newObj) {
    this.rowData = [];
  }

  OnOpen(Type) {
    switch (Type) {
      case 'ExeUnit':
        this.ProductRequest.GetVWExeUnit().subscribe(res => {
          this.ExeUnitItems = res;
        });
        break;
      case 'BusinessPattern':
        if (isNullOrUndefined(this.VWExeUnitParams.selectedObject)) {
          this.ShowMessageBoxWithOkBtn('محل هزینه را انتخاب کنید.');
        } else {
          this.Actor.GetBusinessPatternListByUnitPatternID(this.VWExeUnitParams.selectedObject, false).subscribe(res => {
            this.BusinessPatternItems = res;
          });
        }
        break;
      case 'PriceListTopic':
        if (isNullOrUndefined(this.BusinessPatternParams.selectedObject)) {
          this.ShowMessageBoxWithOkBtn('کسب و کار را انتخاب کنید.');
        } else {
          this.Actor.GetPriceListTopicByBusinesPatternID(this.BusinessPatternParams.selectedObject, false).subscribe(res => {
            this.PriceListTopicItems = res;
          });
        }
        break;
      default:
        break;
    }
  }

  onGridReady(Param) {
    this.gridApi = Param.api;
  }

  OnFilterChanged() {
    this.SetSumFinal();
  }
  OnRowDataChanged() {
    this.SetSumFinal();
  }
  OnRowDataUpdated() {
    this.SetSumFinal();
  }

  SetSumFinal() {
    let SumFinalCount = 0;
    let SumFinalAmount = 0;

    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.SumContractAmount) {
          // tslint:disable-next-line:radix
          SumFinalAmount = SumFinalAmount + parseInt((node.data.SumContractAmount.toString()).replace(/,/g, ''));
        }
        if (node.data.SumContractCount) {
          // tslint:disable-next-line: radix
          SumFinalCount = SumFinalCount + parseInt((node.data.SumContractCount.toString()).replace(/,/g, ''));
        }
      });
      this.SumFinalAmount = SumFinalAmount;
      this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      this.SumFinalCount = SumFinalCount;
      this.SumFinalAmount = SumFinalAmount;

      this.SumFinalCountStr = SumFinalCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.SumFinalAmountStr = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 545;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }
  popupclosed() {
    this.btnclicked = false;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onChangeExeUnit(event) {
    this.RegionCode = this.ExeUnitItems.find(x => x.UnitPatternID === event).RegionCode;
    this.PriceListTopicParams.selectedObject = null;
    this.BusinessPatternParams.selectedObject = null;
  }

  onChangeBusinessPattern(event) {
    this.PriceListTopicParams.selectedObject = null;
  }

  OnChangeCheckBoxValue(Ischeck) {
    this.SelectAll = Ischeck;
    const RegionCodeList = [];
    if (Ischeck) {
      this.ReigonListSet.forEach(item => {
        RegionCodeList.push(item.RegionCode);
      });
      this.NgSelectRegionParams.selectedObject = RegionCodeList;
    } else {
      this.NgSelectRegionParams.selectedObject = null;
    }
  }

  Search(type) {
    let InDetail = false;
    switch (type) {
      case 'InDetail':
        InDetail = true;
        this.MaincolumnDef = [
          {
            headerName: '',
            children: [
              {
                headerName: 'رديف',
                field: 'ItemNo',
                width: 50,
                resizable: true
              },
              {
                headerName: 'واحد اجرایی',
                field: 'RegionName',
                width: 150,
                resizable: true
              },
              {
                headerName: 'رشته',
                field: 'PriceListTopicName',
                width: 120,
                resizable: true,
                sortable: true,
              },
              {
                headerName: 'طرف قرارداد',
                field: 'ContractorIdentityName',
                width: 200,
                resizable: true,
                sortable: true,
              },
              {
                headerName: 'رتبه',
                field: 'ContractorRank',
                width: 50,
                resizable: true,
                sortable: true,
              },
            ]
          },
          {
            headerName: 'مجموع قرارداد',
            children: [
              {
                headerName: 'تعداد',
                field: 'SumContractCount',
                width: 80,
                resizable: true
              },
              {
                headerName: 'مبلغ',
                field: 'SumContractAmount',
                width: 220,
                resizable: true
              }
            ]
          },
        ];
        this.ContractService.SearchContractStatusSummaryList(this.NgSelectRegionParams.selectedObject, this.VWExeUnitParams.selectedObject,
          this.BusinessPatternParams.selectedObject, this.PriceListTopicParams.selectedObject, this.Grade, InDetail).subscribe(res => {
            if (res) {
              this.rowData = res;
            }
          });
        break;
      case 'InGeneral':
        this.MaincolumnDef = [
          {
            headerName: '',
            children: [
              {
                headerName: 'رديف',
                field: 'ItemNo',
                width: 50,
                resizable: true
              },
              {
                headerName: 'واحد اجرایی',
                field: 'RegionName',
                width: 150,
                resizable: true
              },
              {
                headerName: 'رشته',
                field: 'PriceListTopicName',
                width: 120,
                resizable: true,
                sortable: true,
              },
              {
                headerName: 'رتبه',
                field: 'ContractorRank',
                width: 50,
                resizable: true,
                sortable: true,
              },
            ]
          },
          {
            headerName: 'مجموع قرارداد',
            children: [
              {
                headerName: 'تعداد',
                field: 'SumContractCount',
                width: 80,
                resizable: true
              },
              {
                headerName: 'مبلغ',
                field: 'SumContractAmount',
                width: 220,
                resizable: true
              }
            ]
          },
        ];
        this.ContractService.SearchContractStatusSummaryList(this.NgSelectRegionParams.selectedObject, this.VWExeUnitParams.selectedObject,
          this.BusinessPatternParams.selectedObject, this.PriceListTopicParams.selectedObject, this.Grade, InDetail).subscribe(res => {
            if (res) {
              this.rowData = res;
            }
          });
        break;
      default:
        break;
    }
  }

}
