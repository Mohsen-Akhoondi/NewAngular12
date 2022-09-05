import { Component, OnInit } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { BudgetService } from 'src/app/Services/BudgetService/BudgetService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-civil-project-page',
  templateUrl: './civil-project-page.component.html',
  styleUrls: ['./civil-project-page.component.css']
})
export class CivilProjectPageComponent implements OnInit {

  Result;

  ModuleCode;

  IsRegiondisable = false;
  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: this.IsRegiondisable
  };

  VWExeUnitItems;
  HaveClarification;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  BgtTopicCode: string;
  BgtTopicName: string;

  BgtStatusItems = [
    {
      BgtStatusName: 'همه',
      BgtStatusCode: 1
    },
    {
      BgtStatusName: 'مستمر',
      BgtStatusCode: 2
    },
    {
      BgtStatusName: 'غیر مستمر',
      BgtStatusCode: 3
    }
  ];
  BgtStatusParams = {
    bindLabelProp: 'BgtStatusName',
    bindValueProp: 'BgtStatusCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ShowBaseReportItems = [
    {
      ShowBaseReportName: 'همه',
      ShowBaseReportCode: 1
    },
    {
      ShowBaseReportName: 'بله',
      ShowBaseReportCode: 2
    },
    {
      ShowBaseReportName: 'خیر',
      ShowBaseReportCode: 3
    }
  ];
  ShowBaseReportParams = {
    bindLabelProp: 'ShowBaseReportName',
    bindValueProp: 'ShowBaseReportCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ComputingBasedOnItems = [
    {
      ComputingBasedOnName: 'تخصیص یافته',
      ComputingBasedOnCode: 1
    },
    {
      ComputingBasedOnName: 'ابلاغی',
      ComputingBasedOnCode: 2
    }
  ];
  ComputingBasedOnParams = {
    bindLabelProp: 'ComputingBasedOnName',
    bindValueProp: 'ComputingBasedOnCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  constructor(
    private router: Router,
    private Order: OrderService,
    private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private BudgetService: BudgetService,
    private route: ActivatedRoute,
    private ReportService: ReportService,
    private http: BaseHttpClient,
  ) {
    this.BgtTopicCode = '';
    this.BgtTopicName = '';
    this.route.params.subscribe(params => {
      this.ModuleCode = + params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => { // 62686
      this.RegionItems = res;
      this.RegionParams.selectedObject = 200;
    });

    this.VWExeUnitParams.selectedObject = 200;
  }

  OnOpenNgSelect(type) {
    switch (type) {
      case 'ExeUnit':
        this.ProductRequest.GetVWExeUnitByRegion(this.RegionParams.selectedObject).subscribe(res =>
          this.VWExeUnitItems = res
        );
        break;
      case 'CostCenter':
        this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, null, true).subscribe(res =>
          this.CostCenterItems = res
        );
        break;
      default:
        break;
    }
  }

  onChangeReigonObj(newObj) {
    this.VWExeUnitParams.selectedObject = null;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  report() {
    const Str =
      'ModuleCode=' + 2907 + '&' +
      'RegionCode=' + this.RegionParams.selectedObject + '&' +
      'UnitTopicID=' + this.VWExeUnitParams.selectedObject + '&' +
      'UnitTopicName=' + (this.VWExeUnitItems && this.VWExeUnitParams.selectedObject ? this.VWExeUnitItems.find(x => x.UnitPatternID === this.VWExeUnitParams.selectedObject).UnitTopicName : '') + '&' +
      'CostCenterID=' + this.CostCenterParams.selectedObject + '&' +
      'CostCenterName=' + (this.CostCenterItems && this.CostCenterParams.selectedObject ? this.CostCenterItems.find(x => x.CostCenterId === this.CostCenterParams.selectedObject).CostCenterName : '') + '&' +
      'BgtTopicCode=' + this.BgtTopicCode + '&' +
      'BgtTopicName=' + this.BgtTopicName + '&' +
      'BgtStatus=' + this.BgtStatusParams.selectedObject + '&' +
      'ShowBaseReport=' + this.ShowBaseReportParams.selectedObject;

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
}