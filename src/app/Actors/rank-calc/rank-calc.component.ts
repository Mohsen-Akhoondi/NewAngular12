import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';

@Component({
  selector: 'app-rank-calc',
  templateUrl: './rank-calc.component.html',
  styleUrls: ['./rank-calc.component.css']
})
export class RankCalcComponent implements OnInit {
  ModuleCode: number;
  IsHideProduct: boolean;
  IsHideRelatedGoods = true;

  constructor(
    private PriceList: PriceListService,
    private Common: CommonService,
    private RefreshEquipmentTypeItems: RefreshServices,
    private route: ActivatedRoute,
    private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private Finyearserv: FinYearService,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  PriceListTopicItems = [];
  SelectedColumnDef;
  rowData = [];
  isClicked = false;
  HaveMaxBtn;
  startLeftPosition;
  startTopPosition;
  MinHeightPixel;
  PercentWidth;
  MainMaxwidthPixel;
  HeightPercentWithMaxBtn;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  paramObj;
  HaveHeader;
  gridApi;
  PopUpType = '';

  PriceListTopicParam = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectGoodsParams = {
    bindLabelProp: 'GoodsName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'goods'
  };
  NgSelectRelatedGoodsParams = {
    bindLabelProp: 'RelatedGoodsName',
    bindValueProp: 'RelatedProductID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Relatedgoods'
  };

  EduHisGradeParams = {
    bindLabelProp: 'GradeName',
    bindValueProp: 'GradeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'edu-grade'
  };
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
    DropDownMinWidth: '100px',
    type: 'region',
    clearable: false
  };

  RankParameterItems;
  RankParameterParams = {
    bindLabelProp: 'RankParameterName',
    bindValueProp: 'RankParameterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  RegionAreaItems;
  RegionAreaParams = {
    bindLabelProp: 'RegionAreaCode',
    bindValueProp: 'RegionAreaID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'district'
  };

  DistrictDirectionParams = {
    bindLabelProp: 'DistrictDirectionName',
    bindValueProp: 'DistrictDirectionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'district-direction'
  };


  FromFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'from-fin-year'
  };

  ToFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'to-fin-year'
  };
  OwnerShipParams = {
    bindLabelProp: 'OwnerShipName',
    bindValueProp: 'OwnershipTypeID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Related'
  };
  IsShowRegion;
  IsRelatedItems = [
    { IsRelated: 1, RelatedName: 'مرتبط' },
    { IsRelated: 2, RelatedName: 'غیر مرتبط' }
  ];
  IsOwnerShipItems = [
    { OwnershipTypeID: 4, OwnerShipName: 'تملیکی' },
    { OwnershipTypeID: 1, OwnerShipName: 'استیجاری' }
  ];

  ngOnInit() {
    this.rowData = [];
    this.ColumnDefinition();
    forkJoin([
      this.PriceList.GetPasmandPriceListTopics(),
      this.Common.GetRankParameterList(this.ModuleCode),
      this.RegionList.GetRankingRegionList()
    ]
    ).subscribe(res => {
      this.PriceListTopicItems = res[0];
      this.PriceListTopicParam.selectedObject = res[0][0].PriceListTopicID;
      this.RankParameterItems = res[1];
      if (this.ModuleCode === 2946) {
        this.RegionItems = res[2];
        this.RegionParams.selectedObject = res[2][0].RegionCode;
      }
      this.onChangeRank(res[1][0].RankParameterCode);
    });

  }

  onChangeRank(event) {
    this.RankParameterParams.selectedObject = event;
    this.ColumnDefinition();
    this.FillData();
  }

  onChangeRegion(event) {
    this.RegionParams.selectedObject = event;
    this.FillData();
  }

  ColumnDefinition() {
    this.IsHideProduct = true;
    this.IsHideRelatedGoods = true;

    if (this.ModuleCode === 2938) {

      let RankHeaderName = 'رتبه';
      let ValueHeaderName = 'تعداد';
      let ScoreHeaderName = '';
      let PrivilegeHeaderName = '';
      let IsHideEdu = false;
      let IsHideScore = true;
      let IsHideFinYear = true;
      let IsHideRank = false;
      let IsHideValue = false;
      let IsHideToScore = true;
      let IsHideFromScore = true;
      let IsHidePrivilege = true;
      let IsHideRelated = true;
      let IsHideOwnerShip = true;
      if ((this.PriceListTopicParam.selectedObject === 400418 ||
        this.PriceListTopicParam.selectedObject === 402032) &&
        (this.RankParameterParams.selectedObject === 14 ||
          this.RankParameterParams.selectedObject === 15 ||
          this.RankParameterParams.selectedObject === 18)) {
        IsHideRelated = false;
        RankHeaderName = 'امتیاز مدرک تحصیلی';
        ValueHeaderName = 'امتیاز سابقه کار';
        this.IsHideProduct = true;
        this.IsHideRelatedGoods = true;
        IsHideEdu = false;
      }
      if (this.RankParameterParams.selectedObject === 3 &&
        (this.PriceListTopicParam.selectedObject === 400418 ||
          this.PriceListTopicParam.selectedObject === 402032)) {
        this.IsHideProduct = false;
        this.IsHideRelatedGoods = true;
        IsHideOwnerShip = false;
        IsHideEdu = true;
        IsHideValue = true;
      }

      if (this.RankParameterParams.selectedObject === 1) {
        RankHeaderName = 'امتیاز مدرک تحصیلی';
        ValueHeaderName = 'امتیاز سابقه کار';
        this.IsHideProduct = true;
        this.IsHideRelatedGoods = true;
        IsHideEdu = false;
      }

      if (this.RankParameterParams.selectedObject === 2) {
        ValueHeaderName = 'میانگین حساب';
        PrivilegeHeaderName = 'مانده موجودی حساب';
        this.IsHideProduct = true;
        this.IsHideRelatedGoods = true;
        IsHideScore = IsHideEdu = true;
        IsHidePrivilege = false;
      }

      if (this.RankParameterParams.selectedObject === 3 &&
        this.PriceListTopicParam.selectedObject !== 400418 &&
        this.PriceListTopicParam.selectedObject !== 402032) {
        this.IsHideProduct = false;
        this.IsHideRelatedGoods = false;
        IsHideEdu = true;
      }

      if (this.RankParameterParams.selectedObject === 10) {
        this.IsHideProduct = IsHideScore = IsHideFinYear = false;
        this.IsHideRelatedGoods = false;
        IsHideEdu = true;
        IsHideValue = IsHideRank = !IsHideFinYear;
        ScoreHeaderName = 'امتیاز';
      }

      if (this.RankParameterParams.selectedObject === 11) {
        this.IsHideProduct = IsHideValue = IsHideFinYear = true;
        this.IsHideRelatedGoods = true;
        IsHideEdu = IsHideRank = true;
        IsHideScore = IsHideFromScore = IsHideToScore = false;
        ScoreHeaderName = 'ضریب';
      }

      if (this.RankParameterParams.selectedObject === 12) {
        this.IsHideProduct = IsHideFinYear = true;
        this.IsHideRelatedGoods = true;
        IsHideFromScore = IsHideToScore = IsHideEdu = IsHideRank = true;
        IsHideScore = IsHideValue = false;
        ValueHeaderName = 'تعداد اخطار';
        ScoreHeaderName = 'امتیاز';
      }
      this.SelectedColumnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'میزان تحصیلات',
          field: 'GradeName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          hide: IsHideEdu,
          cellEditorParams: {
            Params: this.EduHisGradeParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.GradeName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.GradeName) {
              params.data.GradeName = params.newValue.GradeName;
              params.data.GradeCode = params.newValue.GradeCode;
              return true;
            } else {
              params.data.GradeName = '';
              params.data.GradeCode = null;
              return false;
            }
          },
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'مرتبط/غیر مرتبط',
          field: 'RelatedName',
          cellEditorFramework: NgSelectCellEditorComponent,
          hide: IsHideRelated,
          cellEditorParams: {
            HardCodeItems: this.IsRelatedItems,
            bindLabelProp: 'RelatedName',
            bindValueProp: 'IsRelated'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RelatedName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RelatedName) {
              params.data.RelatedName = params.newValue.RelatedName;
              params.data.IsRelated = params.newValue.IsRelated;
              return true;
            } else {
              params.data.RelatedName = '';
              params.data.IsRelated = null;
              return false;
            }
          },
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'نوع خودرو',
          field: 'GoodsName',
          width: 300,
          hide: this.IsHideProduct,
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectGoodsParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.GoodsName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.GoodsName) {
              params.data.GoodsName = params.newValue.GoodsName;
              params.data.ProductID = params.newValue.ProductID;
              return true;
            } else {
              params.data.GoodsName = '';
              params.data.ProductID = null;
              return false;
            }
          },
          resizable: true,
          sortable: true,
          editable: true
        },
        {
          headerName: 'از سال',
          field: 'FromYear',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.FromFinYearParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.FinYearCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.FinYearCode) {
              params.data.FromYear = params.newValue.FinYearCode;
              return true;
            } else {
              params.data.FromYear = '';
              params.data.FromYear = null;
              return false;
            }
          },
          hide: IsHideFinYear,
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'تا سال',
          field: 'ToYear',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.ToFinYearParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.FinYearCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.FinYearCode) {
              params.data.ToYear = params.newValue.FinYearCode;
              return true;
            } else {
              params.data.ToYear = '';
              params.data.ToYear = null;
              return false;
            }
          },
          hide: IsHideFinYear,
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'از امتیاز',
          field: 'FromScore',
          width: 350,
          hide: IsHideFromScore,
          resizable: true,
          editable: true
        },
        {
          headerName: 'نوع مالکیت',
          field: 'OwnerShipName',
          width: 100,
          hide: IsHideOwnerShip,
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.OwnerShipParams,
            Items: this.IsOwnerShipItems,
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.OwnerShipName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.OwnerShipName) {
              params.data.OwnerShipName = params.newValue.OwnerShipName;
              params.data.OwnershipTypeID = params.newValue.OwnershipTypeID;
              return true;
            } else {
              params.data.OwnerShipName = '';
              params.data.OwnershipTypeID = null;
              return false;
            }
          },
          resizable: true,
          sortable: true,
          editable: true
        },
        {
          headerName: 'تا امتیاز',
          field: 'ToScore',
          width: 350,
          hide: IsHideToScore,
          resizable: true,
          editable: true
        },
        {
          headerName: RankHeaderName,
          field: 'Rank',
          width: 300,
          hide: IsHideRank,
          resizable: true,
          sortable: true,
          editable: true
        },
        {
          headerName: ValueHeaderName,
          field: 'Value',
          width: 200,
          hide: IsHideValue,
          resizable: true,
          editable: true,
          HaveThousand: true,
        },
        {
          headerName: 'خودرو جایگزین',
          field: 'RelatedGoodsName',
          width: 200,
          hide: this.IsHideRelatedGoods,
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectRelatedGoodsParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RelatedGoodsName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RelatedGoodsName) {
              params.data.RelatedGoodsName = params.newValue.RelatedGoodsName;
              params.data.RelatedProductID = params.newValue.RelatedProductID;
              return true;
            } else {
              params.data.RelatedGoodsName = '';
              params.data.RelatedProductID = null;
              return false;
            }
          },
          resizable: true,
          sortable: true,
          editable: true
        },
        {
          headerName: ScoreHeaderName,
          field: 'Score',
          width: 200,
          hide: IsHideScore,
          resizable: true,
          editable: true,
          HaveThousand: true,
        },
        {
          headerName: PrivilegeHeaderName,
          field: 'Privilege',
          width: 200,
          hide: IsHidePrivilege,
          resizable: true,
          editable: true,
          HaveThousand: true,
        },
      ];
    }

    if (this.ModuleCode === 2945) {
      this.SelectedColumnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'از امتیاز',
          field: 'FromScore',
          width: 350,
          resizable: true,
          editable: true
        },
        {
          headerName: 'تا امتیاز',
          field: 'ToScore',
          width: 350,
          resizable: true,
          editable: true
        },
        {
          headerName: 'رتبه',
          field: 'Rank',
          width: 300,
          resizable: true,
          sortable: true,
          editable: true
        },
      ];
    }

    if (this.ModuleCode === 2946) {

      let IsHideValue = false;
      let IsHideRegionCol = false;
      let IsHideAmoutValue = true;
      let IsHideDistrictDirection = false;

      if (this.RankParameterParams.selectedObject === 5) {
        IsHideAmoutValue = true;
        if (this.PriceListTopicParam.selectedObject === 378613) { // رفت و روب
          this.IsShowRegion = IsHideRegionCol = true;
          IsHideDistrictDirection = IsHideValue = false;
        }


        if (this.PriceListTopicParam.selectedObject === 378611) { // پسماند خشک
          this.IsShowRegion = IsHideRegionCol = false;
          IsHideDistrictDirection = IsHideValue = true;
        }
      }


      if (this.PriceListTopicParam.selectedObject === 380521 || // خدمات عمومی
        this.RankParameterParams.selectedObject === 13) { // خارج شهرداری
        this.IsShowRegion = false;
        IsHideDistrictDirection = IsHideValue = true;
        IsHideRegionCol = true;
        IsHideAmoutValue = false;
      }

      this.SelectedColumnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'منطقه',
          field: 'RegionName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.RegionParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RegionCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RegionName) {
              params.data.RegionCode = params.newValue.RegionCode;
              params.data.RegionName = params.newValue.RegionName;
              return true;
            } else {
              params.data.RegionName = '';
              params.data.RegionCode = null;
              return false;
            }
          },
          hide: IsHideRegionCol,
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'ناحیه',
          field: 'Value',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.RegionAreaParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RegionAreaCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RegionAreaCode) {
              params.data.Value = params.newValue.RegionAreaCode;
              params.data.Value = params.newValue.RegionAreaID;
              return true;
            } else {
              params.data.Value = '';
              params.data.Value = null;
              return false;
            }
          },
          hide: IsHideValue,
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'شمالی / جنوبی',
          field: 'DistrictDirectionName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.DistrictDirectionParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.DistrictDirectionCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.DistrictDirectionName) {
              params.data.DistrictDirectionCode = params.newValue.DistrictDirectionCode;
              params.data.DistrictDirectionName = params.newValue.DistrictDirectionName;
              return true;
            } else {
              params.data.DistrictDirectionName = '';
              params.data.DistrictDirectionCode = null;
              return false;
            }
          },
          hide: IsHideDistrictDirection,
          editable: true,
          width: 150,
          resizable: true,
          sortable: true
        },
        {
          headerName: 'مبلغ',
          field: 'Value',
          width: 350,
          hide: IsHideAmoutValue,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'تعداد ماه',
          field: 'Rank',
          width: 350,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'امتیاز',
          field: 'Score',
          width: 350,
          resizable: true,
          editable: true,
        }
      ];
    }

  }

  FillData() {

    if (!this.IsShowRegion) {
      this.RegionParams.selectedObject = null;
    } else {
      // tslint:disable-next-line: max-line-length
      this.RegionParams.selectedObject = this.RegionParams.selectedObject !== null ? this.RegionParams.selectedObject : this.RegionItems[0].RegionCode;
    }

    this.Common.GetRankCalcListByPriceListTopicID(this.PriceListTopicParam.selectedObject, this.RankParameterParams.selectedObject,
      this.RegionParams.selectedObject).subscribe(res2 => {
        // if (res2 && res2.length > 0) {
        this.rowData = res2;
        // }
      });
  }

  onChangePriceListTopic(event) {
    this.PriceListTopicParam.selectedObject = event;
    // if (this.ModuleCode === 2946) {
    this.ColumnDefinition();
    // }
    this.FillData();
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  OnSave() {
    const RankList = [];
    const DataList = [];

    this.gridApi.stopEditing();
    this.gridApi.forEachNode(node => {
      DataList.push(node.data);
    });

    if (!this.IsShowRegion) {
      this.RegionParams.selectedObject = null;
    }

    DataList.forEach(node => {
      const RankCalcListObj = {
        RankCalcID: node.RankCalcID ? node.RankCalcID : -1,
        PriceListTopicID: this.PriceListTopicParam.selectedObject ? this.PriceListTopicParam.selectedObject : -1,
        Rank: node.Rank ? node.Rank : 0,
        GradeCode: node.GradeCode ? node.GradeCode : null,
        RankParameterCode: this.RankParameterParams.selectedObject,
        ProductID: node.ProductID ? node.ProductID : null,
        Value: node.Value ? node.Value : 0,
        FromScore: (node.FromScore || node.FromScore === 0) ? node.FromScore : null,
        ToScore: node.ToScore ? node.ToScore : null,
        RegionCode: node.RegionCode,
        Score: node.Score ? node.Score : null,
        FromYear: node.FromYear,
        ToYear: node.ToYear,
        DistrictDirectionCode: node.DistrictDirectionCode,
        Privilege: node.Privilege,
        RelatedProductID: node.RelatedProductID,
        IsRelated: (node.IsRelated !== null && node.IsRelated !== undefined) ? ((node.IsRelated === 1 || node.IsRelated === true) ? 1 : 0) : null,
        OwnershipTypeID: node.OwnershipTypeID
      };
      RankList.push(RankCalcListObj);
    });

    this.Common.SaveRankCalc(this.PriceListTopicParam.selectedObject, this.RankParameterParams.selectedObject,
      this.RegionParams.selectedObject, RankList).subscribe((res: any) => {
        this.FillData();
        this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقيت انجام شد');
      });

  }

  close() {
    this.Closed.emit(true);
  }

  popupclosed(event) {
    this.isClicked = false;
  }

  MessageBoxAction(event) {
  }

  getOutPutParam(event) {
  }

  onCellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'GoodsName') {
      this.Common.GetGoodsListRankCalc(this.PriceListTopicParam.selectedObject).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'goods'
        });
      });
    } else if (event.colDef && event.colDef.field === 'GradeName') {
      this.Common.GetEducationGradeList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'edu-grade'
        });
      });
    } else if (event.colDef && event.colDef.field === 'RankParameterName') {
      this.Common.GetAllRankParameterList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'RankParameter'
        });
      });
    } else if (this.ModuleCode === 2946 && this.RankParameterParams.selectedObject === 5 && event.colDef && event.colDef.field === 'Value') {
      this.ProductRequest.GetRegionAreaList(this.RegionParams.selectedObject).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'district'
        });
      });
    } else if (this.ModuleCode === 2946 && this.RankParameterParams.selectedObject === 5 && event.colDef && event.colDef.field === 'DistrictDirectionName') {
      this.ProductRequest.GetDistrictDirectionList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'district-direction'
        });
      });
    } else if (event.colDef && event.colDef.field === 'FromYear') {
      this.Finyearserv.GetFinYearList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'from-fin-year'
        });
      });
    } else if (event.colDef && event.colDef.field === 'ToYear') {
      this.Finyearserv.GetFinYearList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'to-fin-year'
        });
      });
    } else if (event.colDef && event.colDef.field === 'RegionName') {
      this.RegionList.GetRankingRegionList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'region'
        });
      });
    } else if (event.colDef && event.colDef.field === 'RelatedGoodsName') {
      this.Common.GetGoodsListRankCalc(this.PriceListTopicParam.selectedObject).subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Relatedgoods'
        });
      });
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
    this.paramObj = this.alertMessageParams;
  }

  onAddNewGoods(event) {
    this.isClicked = true;
    this.PopUpType = 'app-goods';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 95;
    this.paramObj = { PriceListTopicID: this.PriceListTopicParam.selectedObject };
  }

}
