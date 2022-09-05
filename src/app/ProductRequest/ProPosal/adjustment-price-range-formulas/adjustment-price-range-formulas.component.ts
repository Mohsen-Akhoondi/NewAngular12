import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
@Component({
  selector: 'app-adjustment-price-range-formulas',
  templateUrl: './adjustment-price-range-formulas.component.html',
  styleUrls: ['./adjustment-price-range-formulas.component.css']
})
export class AdjustmentPriceRangeFormulasComponent implements OnInit {
  @Input() PopupParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  SPb;
  SPl;
  b;
  P1;
  P2;
  CP;
  EquipmentCost;
  Pb;
  alpha;
  PE;
  Pm;
  lpp;
  k;
  c;
  l;
  btnclicked = false;
  type;
  OverstartLeftPosition;
  OverstartTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  ProductRequestObject;
  OrderCommitionID;
  OrderCommitionObject;
  ProductRequestItemID = -1;
  OrdersObject: any;
  HasCPInGrid = true;
  PriceListTypeName: string;
  PriceListTypeCode: any;
  constructor(
    private ProductRequest: ProductRequestService
  ) {
  }
  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.ProductRequest.GetAdjustmentPriceRangeFormula(
      this.ProductRequestObject.CostFactorID,
      this.PopupParam.OrderCommitionID
    ).subscribe(ress => {
      if (ress) {
        this.alpha = ress[0].ExpertCoef;
        this.Pb = ress[0].BaseAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.PE = ress[0].ExpertAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.lpp = ress[0].IndexAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.Pm = ress[0].Pm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.k = ress[0].k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    });
  }
  onClose() {
    this.Closed.emit(true);
  }

}
