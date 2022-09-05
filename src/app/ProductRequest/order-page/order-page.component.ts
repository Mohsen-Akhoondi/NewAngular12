import { Component, OnInit, Input } from '@angular/core';
import { isUndefined } from 'util';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { forkJoin } from 'rxjs';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  @Input() PopupMaximized;
  OrderDate;
  OrderCode;
  DealTypeName;
  IsDown = false;
  HaveSave;
  RegionItems;
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
  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RegionBuyerItems;
  RegionBuyerParams = {
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
  VWExeUnitItems;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitPatternID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProductRequestItems;
  ProductRequestParams = {
    bindLabelProp: 'ProductRequestCodeSubject',
    bindValueProp: 'CostFactorID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  OrderPersonItems;
  OrderPersonParams = {
    bindLabelProp: 'FullPersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '115px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CheckValidate = false;
  ModuleCode;
  constructor(
    private FinYear: FinYearService,
    private RegionList: RegionListService,
    private OrderPageService: OrderService,
    private ProductRequest: ProductRequestService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    forkJoin([
      this.RegionList.GetRegionList(this.ModuleCode, true),
      this.FinYear.GetFinYearList()
    ]).subscribe(res => {
      this.RegionItems = res[0];
      this.RegionParams.selectedObject = res[0][0];
      this.FinYearItems = res[1];
      this.FinYearParams.selectedObject = res[1][0].FinYearCode;
      this.IsDown = true;
    });
  }
  onChangeRegion(ARegionCode) {
    this.VWExeUnitParams.selectedObject = null;
    this.RegionBuyerParams.selectedObject = null;
    if (!isUndefined(ARegionCode) && ARegionCode !== null) {
      this.RefreshPageByRegion(ARegionCode);
    }
  }
  RefreshPageByRegion(ARegionCode) {
    this.IsDown = false;
    forkJoin([
      this.OrderPageService.GetOrdersRegionBuyerRequest(ARegionCode),
      this.ProductRequest.GetVWExeUnitByRegion(ARegionCode),
      this.ProductRequest.GetProductRequestForOrders(ARegionCode)
    ]).subscribe(res => {
      this.RegionBuyerItems = res[0];
      this.VWExeUnitItems = res[1];
      this.RegionBuyerParams.selectedObject = ARegionCode;
      this.RefreshPageByRegionBuyer(ARegionCode);
      res[2].forEach(element => {
        element.ProductRequestCodeSubject = element.ProductRequestCode + ' - ' + element.Subject;
      });
      this.ProductRequestItems = res[2];
      this.IsDown = true;
    });
  }
  OnOrderDateChange(ADate) {
    this.OrderDate = ADate.MDate;
    this.RefreshOrderPerson();
  }
  onChangeRegionBuyer(ARegionCode) {
    this.ProductRequestParams.selectedObject = null;
    if (!isUndefined(ARegionCode) && ARegionCode !== null) {
      this.RefreshPageByRegionBuyer(ARegionCode);
    }
  }
  RefreshPageByRegionBuyer(ARegionCode) {
    this.IsDown = false;
    forkJoin([
      this.ProductRequest.GetProductRequestForOrders(ARegionCode)
    ]).subscribe(res => {
      res[0].forEach(element => {
        element.ProductRequestCodeSubject = element.ProductRequestCode + ' - ' + element.Subject;
      });
      this.ProductRequestItems = res[0];
      this.RefreshOrderPerson();
      this.IsDown = true;
    });
  }
  RefreshOrderPerson() {
    if (!isUndefined(this.RegionBuyerParams.selectedObject) && this.RegionBuyerParams.selectedObject != null && this.OrderDate) {
      this.OrderPageService.GetPersonInOrders(this.RegionBuyerParams.selectedObject, this.OrderDate).subscribe(res => {
        this.OrderPersonItems = res;
      });
    }
  }
  Close() {
  }
}
