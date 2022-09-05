import { Component, OnInit, Input, EventEmitter, Output, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-goods-request',
  templateUrl: './goods-request.component.html',
  styleUrls: ['./goods-request.component.css']
})
export class GoodsRequestComponent implements OnInit {
  @Input() InputParam;
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  ProductName;
  TextAbove;
  GoodsCode: number;
  TechnicalCode;
  RelatedProductItems = [];
  ModuleCode;
  Note: string;
  IsCost = true;
  ScaleItems;
  isClicked: boolean;
  PopUpType: string;
  startLeftPosition: number;
  btnclicked = false;
  IsValid = false;
  columnDef: any;
  gridApi: any;
  IsEditable: true;
  rowsData: any = [];
  selectedrow: any;
  SumFinalAmount = 0;
  SumFinalAmountStr = '0';
  SumAmountCOEFStr = '0';
  SumAmountCOEFPactStr = '0';
  SumFinalAmountRelatedContract = 0;
  PercentageOfChanges = 0;
  PercentageOfChangesStr = '0';
  BaseAssetGroupID: any;
  ArticlePatternID;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ScaleParams = {
    bindLabelProp: 'ScaleName',
    bindValueProp: 'ScaleCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProductTypeParams = {
    bindLabelProp: 'ProductTypeName',
    bindValueProp: 'ProductTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgSelectRelatedProductParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'related-goods',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد کالا', HeaderName: 'GoodsCode', width: 35, MinTermLenght: 1, SearchOption: 0 },
        { HeaderCaption: 'نام ', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1 }
        ],
      SearchItemHeader:
        [{ HeaderCaption: 'کد کالا', width: 35, },
        { HeaderCaption: 'نام ', width: 53, }
        ],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  NgSelectBaseAssetGroupParams = {
    bindLabelProp: 'BaseAssetGroupName',
    bindValueProp: 'BaseAssetGroupID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'Asset',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'نام', HeaderName: 'BaseAssetGroupName', width: 53, MinTermLenght: 3, SearchOption: 0 }],
      SearchItemHeader:
        [{ HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectRelArticlePatternParams= {
    bindLabelProp: 'ProductName',
    bindValueProp: 'ArticlePatternGoodsID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'rel',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 0 }],
        
      SearchItemHeader:
        [{ HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  RequiredComponents = [this.ScaleParams, this.ProductTypeParams];
  ProductTypeItems = [
    {
      ProductTypeName: '-',
      ProductTypeCode: 0
    },
    {
      ProductTypeName: 'مصرفی',
      ProductTypeCode: 1
    },
    {
      ProductTypeName: 'غیر مصرفی',
      ProductTypeCode: 2
    },
    {
      ProductTypeName: ' اموال در حکم مصرفی',
      ProductTypeCode: 3
    }

  ];
  GoodsObject = {
    ProductName: '',
    TechnicalCode: '',
    ProductID: -1,
    RelatedProductID: -1,
    IsConsumer: 0,
    Note: '',
    GoodsCode: -1,
    IsValid: false
  };

  CheckValidate = false;
  startTopPosition: number;
  @ViewChild('IsTaxValue') IsTaxValue: TemplateRef<any>;
  @ViewChild('IsDedicate') IsDedicate: TemplateRef<any>;
  @ViewChild('IsNeedOfSN') IsNeedOfSN: TemplateRef<any>;
  @ViewChild('ValidRegionGroup') ValidRegionGroup: TemplateRef<any>;
  
  NgSelectShareTypeParams = {
    bindLabelProp: 'AssetGroupName',
    bindValueProp: 'AssetGroupCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'share-type'
  };

  NgSelectParentsArticlePatternParams={
    bindLabelProp: 'ParentArticlePatternName',
    bindValueProp: 'ArticlePatternID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'parent-type'

  }

  NgSelectArticlePatternParams={
    bindLabelProp: 'ChildArticlePatternName',
    bindValueProp: 'ArticlePatternID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'article-type'
  }

  constructor(private ProductList: ProductRequestService,
    private Common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private RefreshProductItems: RefreshServices,
    private http: BaseHttpClient,
    private RefreshPersonItems: RefreshServices,) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });


    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 100,
        resizable: true
      },

      {
        headerName: 'مالیات ارزش افزوده',
        field: 'IsTaxValue',
        width: 150,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsTaxValue
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsTaxValue = params.newValue;
            return true;
          } else {
            params.data.IsTaxValue = false;
            return false;
          }
        },
        resizable: true,
        editable: true,
      },
      {
        headerName: 'گروه واحد اجرایی',
        field: 'RegionGroupName',
        width: 200,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.Common.GetAllRegionGroup(false),
          bindLabelProp: 'RegionGroupName',
          bindValueProp: 'RegionGroupCode',
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RegionGroupName) {
            params.data.RegionGroupName = params.newValue.RegionGroupName;
            params.data.RegionGroupCode = params.newValue.RegionGroupCode;
            params.data.Rank = '';
            return true;
          }
        },
        cellRenderer: 'SeRender',
        editable: true,
        resizable: true,
      },
      {
        headerName: 'گروه اصلی کالا',
        field: 'ParentArticlePatternName',
        width: 200,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectParentsArticlePatternParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ParentArticlePatternName) {
            params.data.ParentArticlePatternName = params.newValue.ParentArticlePatternName;
            params.data.ArticlePatternID = params.newValue.ArticlePatternID;
            params.data.Rank = '';
            return true;
          }
        },
        editable: true,
        resizable: true,
      },
      {
        headerName: 'گروه کالا',
        field: 'ChildArticlePatternName',
        width: 200,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectArticlePatternParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ChildArticlePatternName) {
            params.data.ChildArticlePatternName = params.newValue.ChildArticlePatternName;
            params.data.ArticlePatternID = params.newValue.ArticlePatternID;
            params.data.Rank = '';
            return true;
          }
        },
        editable: true,
        resizable: true,
      },
      {
        headerName: 'گروه دارایی پایه',
        field: 'BaseAssetGroupName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectBaseAssetGroupParams,
          Items: [],
          MoreFunc: this.FetchMoreBaseAssetGroup,
          FetchByTerm: this.FetchBaseAssetGroupByTerm,
          RedioChangeFunc: this.RedioSelectedChangeBaseAssetGroup,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BaseAssetGroupName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.BaseAssetGroupID = params.newValue.BaseAssetGroupID;
            params.data.BaseAssetGroupName = params.newValue.BaseAssetGroupName;
            return true;
          } else {
            params.data.BaseAssetGroupName = '';
            params.data.BaseAssetGroupID = null;
            return false;
          }
        },
        editable: true,
        //  () => {
        //   return this.IsEditable;
        // },
        width: 350,
        resizable: true
      },
      {
        headerName: 'گروه دارایی',
        field: 'AssetGroupName',
        width: 200,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectShareTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueSetter: (params) => {
          if (params.newValue && params.newValue.AssetGroupName) {
            params.data.AssetGroupName = params.newValue.AssetGroupName;
            params.data.AssetGroupCode = params.newValue.AssetGroupCode;
            params.data.Rank = '';
            return true;
          }
        },
        editable: true,
        resizable: true,
      },

      {
        headerName: 'کالا مرتبط',
        field: 'ProductName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRelArticlePatternParams,
          Items: [],
          MoreFunc: this.FetchMoreRelArticlePattern,
          FetchByTerm: this.FetchRelArticlePatternByTerm,
          RedioChangeFunc: this.RedioSelectedChangeRelArticlePattern,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.RelArticlePatternID = params.newValue.ArticlePatternGoodsID;
            params.data.RelArticlePatternName = params.newValue.ProductName;
            return true;
          } else {
            params.data.RelArticlePatternName = '';
            params.data.RelArticlePattern = null;
            return false;
          }
        },
        editable: true,
        //  () => {
        //   return this.IsEditable;
        // },
        width: 350,
        resizable: true
      },
      {
        headerName: 'شماره شناسایی کالا',
        field: 'GoodNo',
        editable: true,
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: ' تخصصی ',
        field: 'IsDedicate',
        width: 90,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsDedicate
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsDedicate = params.newValue;
            return true;
          } else {
            params.data.IsDedicate = false;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: ' نیاز کالا به شماره سریال ',
        field: 'IsNeedOfSN',
        width: 150,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsNeedOfSN
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsNeedOfSN = params.newValue;
            return true;
          } else {
            params.data.IsNeedOfSN = false;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: ' فعال در گروه واحد اجرایی ',
        field: 'ValidRegionGroup',
        width: 150,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ValidRegionGroup
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.ValidRegionGroup = params.newValue;
            return true;
          } else {
            params.data.ValidRegionGroup = false;
            return false;
          }
        },
        resizable: true,
        editable: true
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: true,
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ شامل',
        field: 'ConsistValue',
        editable: true,
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'درصد ضایعات',
        field: 'WastePercent',
        width: 100,
        resizable: true,
        editable: true,
        HaveThousand: false,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, MaxLength: 4, FloatMaxLength: 2 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },

    ];
  }


  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 6;

    this.ProductList.GetScaleList().subscribe((res: any) => {
      this.ScaleItems = res;
    });

    if (this.InputParam && this.InputParam.selectedRow) {
      this.ProductName = this.InputParam.selectedRow.ProductName;
      this.GoodsObject.GoodsCode = this.GoodsCode = this.InputParam.selectedRow.GoodsCode;
      this.TextAbove = this.InputParam.selectedRow.Note;
      this.TechnicalCode = this.InputParam.selectedRow.TechnicalCode;
      this.GoodsObject.ProductID = this.InputParam.selectedRow.ProductID;

      this.ProductList.GetProductList(0,
        null,
        '',
        1,
        30,
        1,
        this.IsCost,
        this.InputParam.selectedRow.RelatedProductId).subscribe(res => {
          this.RelatedProductItems = res.List;
          this.NgSelectRelatedProductParams.selectedObject = this.InputParam.selectedRow.RelatedProductId;

        });

      this.ProductTypeParams.selectedObject = this.InputParam.selectedRow.IsConsumer;
      this.ScaleParams.selectedObject = this.InputParam.selectedRow.ProductScaleCode;

    }
  }
  FetchMoreBaseAssetGroup(event) {
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductList.GetBaseAssetGroup(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize,
        null).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Asset'
      });
    });
  }
  FetchBaseAssetGroupByTerm(event) {
    event.Owner.columnDef[3].cellEditorParams.Params.loading = true;
    event.Owner.ProductList.GetBaseAssetGroup(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Asset'
        });
      });
  }

  RedioSelectedChangeBaseAssetGroup(event) {
    event.Owner.ProductList.GetBaseAssetGroup(event.SearchOption,
      '',
      1,
      30,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Asset'
        });
      });
  }

  FetchMoreRelArticlePattern(event) {
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductList.GetRelArticlePattern(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize,
        null).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'rel'
      });
    });
  }
  FetchRelArticlePatternByTerm(event) {
    event.Owner.columnDef[8].cellEditorParams.Params.loading = true;
    event.Owner.ProductList.GetRelArticlePattern(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'rel'
        });
      });
  }

  RedioSelectedChangeRelArticlePattern(event) {
    event.Owner.ProductList.GetRelArticlePattern(event.SearchOption,
      '',
      1,
      30,
      null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'rel'
        });
      });
  }

  RelatedProduct_FetchMore(event) {
    this.NgSelectRelatedProductParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.ProductList.GetProductList(event.SearchOption,
        null,
        event.term,
        event.PageNumber,
        event.PageSize,
        1,
        this.IsCost,
        null).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.RelatedProductItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.RelatedProductItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshProductItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'related-goods'

      });
    });
  }

  RelatedProductReqOpened() {
    this.ProductList.GetProductList(0, null, '', 1, 30, 1, this.IsCost, null).subscribe(res => {
      this.RelatedProductItems = res.List;
      this.RefreshProductItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'related-goods'
      });
    });
  }

  RelatedProduct_Req_DoSearch(event) {
    this.NgSelectRelatedProductParams.loading = true;
    this.ProductList.GetProductList(event.SearchOption,
      null,
      event.term,
      event.PageNumber,
      event.PageSize,
      1,
      this.IsCost,
      null).subscribe(res => {
        this.RelatedProductItems = res.List,
          this.RefreshProductItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'related-goods'
          });
      });
    this.NgSelectRelatedProductParams.loading = false;
  }

  onSave() {
    this.CheckValidate = true;
    let ValidateForm = true;
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {
      ValidateForm = ValidateForm && this.ProductName

      if (ValidateForm) {
        const ArticlePatterGoodsList = [];

        this.GoodsObject.ProductName = this.ProductName;
        this.GoodsObject.TechnicalCode = this.TechnicalCode;
        this.GoodsObject.RelatedProductID = this.NgSelectRelatedProductParams.selectedObject;
        this.GoodsObject.IsConsumer = this.ProductTypeParams.selectedObject;
        this.GoodsObject.Note = this.TextAbove;
        this.GoodsObject.IsValid = this.IsValid;

        
        this.gridApi.forEachNode(node => {
          const ArticlePatterGoodObj = {
            ArticlePatternID: node.data.ArticlePatternID,
            ProductID: this.GoodsObject.ProductID,
            GoodNo:node.data.GoodNo,
            IsDedicate: node.data.IsDedicate ? node.data.IsDedicate : false,
            //IsDedicate: node.data.IsDedicate,
            AssetGroupCode: node.data.AssetGroupCode,
            IsTaxValue: node.data.IsTaxValue ? node.data.IsTaxValue : false,
            //IsTaxValue:node.data.IsTaxValue,
            IsNeedOfSN: node.data.IsNeedOfSN ? node.data.IsNeedOfSN : false,
            //IsNeedOfSN :node.data.IsNeedOfSN,
            RelArticlePatternGoodsID:node.data.RelArticlePatternID,
            Note:node.data.Note,
          };
          ArticlePatterGoodsList.push(ArticlePatterGoodObj);
          
        });

        this.ProductList.SvaeEquipment(this.GoodsObject, ArticlePatterGoodsList, this.ScaleParams.selectedObject, null,).subscribe((res: any) => {
          this.GoodsObject.GoodsCode = this.GoodsCode = res.GoodsCode;
          this.GoodsObject.ProductID = res.ProductID;

        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });

      }
      else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });
  }

  OnChangeCheckBoxValue(Ischeck) {
    this.IsValid = Ischeck;

  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.startTopPosition = 182;
    this.startLeftPosition = 557;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed(event) {
    this.isClicked = false;
  }

  FetchRelatedProductByTerm(event) {
    event.Owner.ProductList.GetIsVolumetricProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      true,
      event.Owner.ContractPayDate,
      null).
      subscribe(res => {
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  Close() {
    this.btnclicked = false;
    this.Closed.emit(true);
  }


  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ParentArticlePatternName') {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {   

            this.ProductList.GetArticlePatternParentList(node.data.RegionGroupCode).
          subscribe(res => { 
            this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
              List: res,
              type: 'parent-type'
            });
          });
          //this.ArticlePatternID = node.data.ArticlePatternID;
          
        }
      });
      //this.columnDef[4].cellEditorParams.Params.loading = true;

    }

if (event.colDef && event.colDef.field === 'ChildArticlePatternName') {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {   
            this.ProductList.GetArticlePatterntList(node.data.ArticlePatternID).
          subscribe(res => {
            this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
              List: res,
              type: 'article-type'
            });
          });
         // this.ArticlePatternID = node.data.ArticlePatternID;         
        }
      });
      //this.columnDef[4].cellEditorParams.Params.loading = true;

    }

    if (event.colDef && event.colDef.field === 'BaseAssetGroupName') {
      this.columnDef[5].cellEditorParams.Params.loading = true;
      this.ProductList.GetBaseAssetGroup(0,
        '',
        1,
        30,
        event.data.BaseAssetGroupID).
        subscribe(res => {
          this.columnDef[5].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'Asset'
          });
        });
    }



    if (event.colDef && event.colDef.field === 'AssetGroupName') {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          this.BaseAssetGroupID = node.data.BaseAssetGroupID;         
        }
      });
      //this.columnDef[4].cellEditorParams.Params.loading = true;
      this.ProductList.GetAssetGroupsByBase(this.BaseAssetGroupID).
        subscribe(res => { 
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'share-type'
          });
        });
    }
    if (event.colDef && event.colDef.field === 'ProductName') {
      
      //this.columnDef[8].cellEditorParams.Params.loading = true;
      this.ProductList.GetRelArticlePattern(0,
        '',
        1,
        30,
        event.data.RegionGroupCode).
        subscribe(res => {
          
          //this.columnDef[8].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'rel'
          });
        });
    }

    // if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
    //   this.ProductRequest.GetEntityTypeItemList(event.colDef.index, event.data.ProductID, null, null)
    //     .subscribe(res => {
    //       this.RefreshCartable.RefreshItemsVirtualNgSelect({
    //         List: res,
    //         type: 'entity-item'
    //       });
    //     });
    // }
  }

  RowClick(event) {
    this.selectedrow = event;
  }

}
