import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { isUndefined } from 'util';

@Component({
  selector: 'app-adjustment-price-range-formulas-page', // فرمول های تعیین دامنه قیمت عادله
  templateUrl: './adjustment-price-range-formulas-page.component.html',
  styleUrls: ['./adjustment-price-range-formulas-page.component.css']
})
export class AdjustmentPriceRangeFormulasPageComponent implements OnInit {
  @Input() PopupParam;
  @Output() AdjustmentPriceRangeFormulaClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  rowData = [];
  ColDef;
  SbsApi;
  HasCPInGrid = true;
  PriceListTypeName: string;
  PriceListTypeCode: any;
  DeadLineDate: any;
  CommitionDate: any;
  HaveHeader: boolean;
  PercentWidth: number;
  PixelWidth: number;
  MinHeightPixel: number;
  PixelHeight: number;
  paramObj;
  HeightPercentWithMaxBtn: number;

  constructor(private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private Actor: ActorService) {
  }

  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.CommitionDate = this.PopupParam.CommitionDate && !isUndefined(this.PopupParam.CommitionDate) ? this.PopupParam.CommitionDate : null;
    this.DeadLineDate = this.PopupParam.DeadLineDate && !isUndefined(this.PopupParam.DeadLineDate) ? this.PopupParam.DeadLineDate : null;
    // tslint:disable-next-line: max-line-length
    this.ProductRequest.GetAdjustmentPriceRangeFormulaValues(this.ProductRequestObject.CostFactorID, this.PopupParam.OrderCommitionID,
      this.DeadLineDate, this.CommitionDate).subscribe(ress => {
      if (ress) {
        this.PriceListTypeName = ress[0].PriceListTypeName;
        this.PriceListTypeCode = ress[0].PriceListTypeCode;
        this.b = ress[0].b;
        this.P1 = ress[0].P1;
        this.P2 = ress[0].P2;
        this.CP = ress[0].CP;
        this.EquipmentCost = ress[0].EquipmentCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.Pb = ress[0].BaseAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.alpha = ress[0].ExpertCoef;
        this.PE = ress[0].ExpertAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.Pm = ress[0].Pm.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.lpp = ress[0].IndexAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.k = ress[0].k;
        this.c = ress[0].C.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.HasCPInGrid = ress[0].HasCPInGrid;
        this.rowData = ress[0].AdjustmentPriceRangeSPsList;

        this.ColDefine();
      }
    });
  }

  ColDefine(): void {

    this.ColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true,
      },
      {
        headerName: 'رشته',
        field: 'Level2Name',
        width: 150,
        resizable: true
      },
      {
        headerName: 'فصل',
        field: 'Level3Name',
        width: 200,
        resizable: true,
        hide: this.PriceListTypeCode !== '02',
      },
      {
        headerName: 'ردیف',
        field: 'Level4Name',
        width: 250,
        resizable: true,
        hide: this.PriceListTypeCode !== '02',
      },
      {
        headerName: 'مبلغ',
        field: 'AmountCoef',
        width: 250,
        resizable: true,
        hide: this.PriceListTypeCode !== '02',
      },
      {
        headerName: 'سال فهرست بها SPl',
        field: 'MaxFinYearSPl',
        editable: false,
        width: 150,
        resizable: true
      },
      {
        headerName: 'دوره SPl',
        field: 'DurationSPl',
        editable: false,
        width: 100,
        resizable: true
      },
      {
        headerName: 'SPl',
        field: 'SPl',
        editable: false,
        width: 100,
        resizable: true
      },
      {
        headerName: 'سال فهرست بها SPb ',
        field: 'MaxFinYearSPb',
        editable: false,
        width: 150,
        resizable: true
      },
      {
        headerName: 'دوره SPb',
        field: 'DurationSPb',
        editable: false,
        width: 100,
        resizable: true
      },
      {
        headerName: 'SPb',
        field: 'SPb',
        editable: false,
        width: 100,
        resizable: true
      },
      {
        headerName: 'CP',
        field: 'CP',
        editable: false,
        width: 100,
        resizable: true
      },
    ];
  }

  popupclosed() { 
    this.btnclicked = false;
    this.type = '';
    this.OverstartLeftPosition = null;
    this.OverstartTopPosition = null;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.PixelWidth = null;
    this.MinHeightPixel = null;
    this.PixelHeight = null;
  }

  onGridReady(params: { api: any; }) {
    this.SbsApi = params.api;
  }

  onClose() {
    this.AdjustmentPriceRangeFormulaClosed.emit(true);
  }
  onclick() {
    this.type = 'approval-price-index-detail';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.OverstartLeftPosition = 108;
    this.OverstartTopPosition = 45;
    this.HeightPercentWithMaxBtn = 60;
    this.PixelWidth = 1140;
    this.MinHeightPixel = 200;
    this.PixelHeight = 590;
    this.paramObj = {
      HeaderName: 'ریز ردیف های تطبیق یافته تجمیعی',
      CostFactorID: this.ProductRequestObject.CostFactorID,
      OrderCommitionID: this.PopupParam.OrderCommitionID,
      DeadLineDate: this.DeadLineDate,
      CommitionDate: this.CommitionDate,
    };
  }
}
