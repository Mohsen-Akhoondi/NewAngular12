import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-price-list-business-pattern',
  templateUrl: './price-list-business-pattern.component.html',
  styleUrls: ['./price-list-business-pattern.component.css']
})
export class PriceListBusinessPatternComponent implements OnInit {
  @Input() PopupParam;
  ModuleCode;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  HaveMaxBtn: boolean;
  PBrowsData: any = [];
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'region'
  };
  BusinessPatternParams = {
    bindLabelProp: 'BusinessPatternName',
    bindValueProp: 'BusinessPatternID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'business-pattern'
  };
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'price-list-topic'
  };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
    private RegionList: RegionListService,
    private RefreshItems: RefreshServices,
    private Actor: ActorService,
    private Common: CommonService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.RegionParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RegionName) {
            params.data.RegionName = params.newValue.RegionName;
            params.data.RegionCode = params.newValue.RegionCode;
            params.data.BusinessPatternID = null;
            params.data.BusinessPatternName = '';
            return true;
          } else {
            params.data.RegionName = '';
            params.data.RegionCode = null;
            return false;
          }
        },
        editable: true,
        width: 200,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'کسب و کار',
        field: 'BusinessPatternName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.BusinessPatternParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BusinessPatternName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.BusinessPatternName) {
            params.data.BusinessPatternName = params.newValue.BusinessPatternName;
            params.data.BusinessPatternID = params.newValue.BusinessPatternID;
            return true;
          } else {
            params.data.BusinessPatternID = null;
            params.data.BusinessPatternName = '';
            return false;
          }
        },
        editable: true,
        width: 200,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'رشته/تخصص',
        field: 'PriceListTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.PriceListTopicParams,
          Items: [],
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PriceListTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PriceListTopicName) {
            params.data.PriceListTopicName = params.newValue.PriceListTopicName;
            params.data.PriceListTopicID = params.newValue.PriceListTopicID;
            return true;
          } else {
            params.data.PriceListTopicID = null;
            params.data.PriceListTopicName = '';
            return false;
          }
        },
        editable: true,
        width: 200,
        resizable: true,
        sortable: true
      },
    ];
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          default:
            break;
        }
      });

    });
    this.Common.GetPriceListBusinessPatternList().subscribe(res => {
      this.PBrowsData = res;
    });
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'RegionName') {
      this.RegionList.GetRegionListforBusinessPattern().subscribe(res => {
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'region'
        });
      });
    } else if (event.colDef && event.colDef.field === 'BusinessPatternName') {// For InvalidSelected When Old IsValid
      this.Actor.GetBusinessPatternListByRegionCode(this.RegionParams.selectedObject, false).subscribe(res => {
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'business-pattern'
        });
      });
    } else if (event.colDef && event.colDef.field === 'PriceListTopicName') {// For InvalidSelected When Old IsValid
      this.Common.PriceListTopicListLevel3().subscribe(res => {
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'price-list-topic'
        });
      });
    }
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    const PriceListBusinessPatternList = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.gridApi.forEachNode(node => {
      const obj = {
        // tslint:disable-next-line: max-line-length
        RegionCode: node.data.RegionName && node.data.RegionName.RegionCode ? node.data.RegionName.RegionCode : (node.data.RegionCode ? node.data.RegionCode : 0),
        // tslint:disable-next-line: max-line-length
        BusinessPatternID: node.data.BusinessPatternName && node.data.BusinessPatternName.BusinessPatternID ? node.data.BusinessPatternName.BusinessPatternID : (node.data.BusinessPatternID ? node.data.BusinessPatternID : null),
        // tslint:disable-next-line: max-line-length
        PriceListTopicID: node.data.PriceListTopicName && node.data.PriceListTopicName.PriceListTopicID ? node.data.PriceListTopicName.PriceListTopicID : (node.data.PriceListTopicID ? node.data.PriceListTopicID : null),
      };
      PriceListBusinessPatternList.push(obj);
    });

    this.Common.SavePriceListBusinessPattern(PriceListBusinessPatternList).subscribe(
      res => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';

      },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      }
    );
  }
}
