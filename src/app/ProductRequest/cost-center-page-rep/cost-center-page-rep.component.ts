import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-cost-center-page-rep',
  templateUrl: './cost-center-page-rep.component.html',
  styleUrls: ['./cost-center-page-rep.component.css']
})
export class CostCenterPageRepComponent implements OnInit {

  @Input() ModuleCode;
  CurrentUserSubCostCenter;
  RegionListSet;
  private sub: any;
  FromCostCenterCode;
  ToCostCenterCode;


  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    clearable: false
  };


  FromCostCenterItems;
  FromCostCenterParams = {
    bindLabelProp: 'CostCenterTitle',
    bindValueProp: 'CostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ToCostCenterItems;
  ToCostCenterParams = {
    bindLabelProp: 'CostCenterTitle',
    bindValueProp: 'CostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };


  FromSubCostCenterItems;
  FromSubCostCenterParams = {
    bindLabelProp: 'SubCostCenterTitle',
    bindValueProp: 'SubCostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ToSubCostCenterItems;
  ToSubCostCenterParams = {
    bindLabelProp: 'SubCostCenterTitle',
    bindValueProp: 'SubCostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  constructor(
    private ProductRequest: ProductRequestService,
    private RegionList: RegionListService,
    private router: Router,
    private route: ActivatedRoute,
    private http: BaseHttpClient,
    private rprt: ReportService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }


  ngOnInit() {

    this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = res[0].RegionCode;
    });


  }

  onChangeRegion(ARegionCode) {
    this.RegionParams.selectedObject = ARegionCode;
    this.FromSubCostCenterParams.selectedObject = null;
    this.ToSubCostCenterParams.selectedObject = null;
    this.FromCostCenterParams.selectedObject = null;
    this.ToCostCenterParams.selectedObject = null;

  }


  onChangeCostCenter(event, type) {

    switch (type) {

      case 'From':
        this.ToCostCenterParams.selectedObject = event;
        this.FromSubCostCenterParams.selectedObject = null;
        this.ToSubCostCenterParams.selectedObject = null;
        break;

      case 'To':
        this.FromSubCostCenterParams.selectedObject = null;
        this.ToSubCostCenterParams.selectedObject = null;
        break;

      default:
        break;
    }
  }

  onSubCostCenterSelectedChange(event) {
    this.ToSubCostCenterParams.selectedObject = event;
  }


  OnOpenNgSelect(type, IsFill = true, FillResolve = null) {

    switch (type) {
      case 'CostCenter':
        this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, this.ModuleCode, false).subscribe(res => {
          this.FromCostCenterItems = res
          this.ToCostCenterItems = res
          if (IsFill) {
            this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
          }
        });
        break;

      case 'SubCostCenter':
        this.ProductRequest.GetSubCostCenterCode(this.RegionParams.selectedObject, this.FromCostCenterParams.selectedObject, this.ToCostCenterParams.selectedObject).subscribe(res => {
          this.FromSubCostCenterItems = res
          this.ToSubCostCenterItems = res
        });
        break;
      default:
        break;


    }


  }

  report() {
    this.rprt.CostCenterListreport(this.RegionParams.selectedObject,
      this.ModuleCode,
      this.FromCostCenterParams.selectedObject,
      this.ToCostCenterParams.selectedObject,
      this.FromSubCostCenterParams.selectedObject,
      this.ToSubCostCenterParams.selectedObject,
    );

  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
}

