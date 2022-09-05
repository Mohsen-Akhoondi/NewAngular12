import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { forkJoin } from 'rxjs';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-asset-page',
  templateUrl: './asset-page.component.html',
  styleUrls: ['./asset-page.component.css']
})
export class AssetPageComponent implements OnInit {
  @Input() ModuleCode;
  @Input() InputParam;
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  HeightPercentWithMaxBtn: number;

  IsEndFlow: any;
  IsAdmin;
  ObjectNo: any;
  ObjectID: any;
  OrderCode = '';
  WorkflowTypeCode: any;
  PercentWidth: number;
  MinimumPosting: any;
  WorkFlowTransitionID: any;
  WorkflowTypeName: any;
  HaveAlertToFinance: any;
  ReadyToConfirm: any;
  WorkflowObjectCode: any;
  BtnClickedName: string;
  ModuleViewTypeCode = null;
  MinHeightPixel: number;
  HaveHeader: boolean;
  private sub: any;
  PopUpType: string;
  isClicked: boolean;
  ChangeDetection: any;
  btnclicked = false;
  IdentityNo: string;
  btnRevocationName = 'ابطال';
  btnConfirmAndReturnName = 'عدم تایید و بازگشت';
  columnDef;
  PopupParam;
  ArticlePatternID;
  rowData = [];
  BaseAssetGroupListSet = [];
  BaseAssetGroupID: any;
  RegionCode: any;
  SubCostCenterAsset;
  startLeftPosition: number;
  startTopPosition: number;
  CurrWorkFlow: any;
  WorkFlowID: any;
  CartableUserID: any;
  MainMaxwidthPixel: number;
  IsEditable = true;
  IsDown: boolean;
  BTNsShow: false;
  btnConfirmIcon;
  btnConfirmName;
  OrginalModuleCode;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  AssetID;
  AssetCode;
  AssetGroupCode;
  GoodsCode;
  UnitPatternID;
  AssetTypeCode;
  ScrapAmount;
  RefrenceNo;
  AssetTag;
  Barcode;
  Note;
  ExeUnitID;
  ActorID;
  BaseAssetGroupId;
  Depreciation;
  SupportNo;
  AssetGroup;
  RelatedAsset;
  GoodObject;
  UnitPatternObject;
  GrantParentGood;
  GrantParentGoodCode;
  VoucherCode;
  DepreciationMethodName;
  AssetObject;

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


  NgSelectBaseAssetGroupParams = {
    bindLabelProp: 'BaseAssetGroupIDName',
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
        [
          { HeaderCaption: 'شناسه گروه دارایی پایه', HeaderName: 'BaseAssetGroupID', width: 35, MinTermLenght: 1, SearchOption: 0 },
          { HeaderCaption: 'نام', HeaderName: 'BaseAssetGroupName', width: 53, MinTermLenght: 3, SearchOption: 0 }

        ],
      SearchItemHeader:
        [
          { HeaderCaption: 'شناسه گروه دارایی پایه', width: 35, },
          { HeaderCaption: 'نام', width: 53, }
        ],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ShareTypeItems;
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
  ParentsArticlePatternItems;
  NgSelectParentsArticlePatternParams = {
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
  AssetTypeItems;
  NgSelectAssetTypeParams = {
    bindLabelProp: 'AssetTypeName',
    bindValueProp: 'AssetTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Asset_Type'
  }

  ArticlePatternItems;
  NgSelectArticlePatternParams = {
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
  RelatedAssetItems;
   // NgSelectelRelatedAssetParams = {
  //   bindLabelProp: 'ProductName',
  //   bindValueProp: 'AssetCode',
  //   placeholder: '',
  //   MinWidth: '150px',
  //   PageSize: 30,
  //   PageCount: 0,
  //   TotalItemCount: 0,
  //   selectedObject: null,
  //   loading: false,
  //   IsVirtualScroll: true,
  //   IsDisabled: false,
  //   DropDownMinWidth: '300px',
  //   type: 'Related_Asset',
  //   AdvanceSearch: {
  //     SearchLabel: 'جستجو براساس :',
  //     SearchItemDetails:
  //       [
  //         { HeaderCaption: 'کد اموال', HeaderName: 'AssetCode', width: 45, MinTermLenght: 1, SearchOption: 0 },
  //         { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 45, MinTermLenght: 3, SearchOption: 0 }

  //       ],
  //     SearchItemHeader:
  //       [
  //         { HeaderCaption: 'کد اموال', width: 45, },
  //         { HeaderCaption: 'نام', width: 45, }
  //       ],
  //     HaveItemNo: true,
  //     ItemNoWidth: 16
  //   }
  // }
  ExeUnitItems;
  VWExeUnitParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitTopicCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'ExeUnit'
  };
  ExeUnitPersonItems;
  NgSelectExeUnitPersonParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
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
    type: 'user-person-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }

  }
  type: string;
  ProductID: any;

  constructor(private RegionList: RegionListService,
    private ProductList: ProductRequestService,
    private ProductRequest: ProductRequestService,
    private RefreshEquipmentTypeItems: RefreshServices,
    private router: Router,
    private route: ActivatedRoute,
    private Actor: ActorService,
    private Common: CommonService,
    private Cartable: CartableServices,
    private FlowService: WorkflowService,
    private CommonService: CommonServices,
    private RefreshPersonItems: RefreshServices,
    private Report: ReportService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.columnDef = [

      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 90,
        resizable: true,
      },
      {
        headerName: 'نوع فرآیند',
        field: 'AssetTransitionName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'وضعیت اموال',
        field: 'AssetStateName',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'تاریخ ثبت',
        field: 'PersianAssetHistoryDate',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'وضعیت فیزیکی اموال',
        field: 'AssetStatusName',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'محل استقرار',
        field: 'AssetLocationName',
        width: 250,
        resizable: true,
      },
      {
        headerName: 'واحد اجرایی ',
        field: 'RegionName',
        width: 190,
        resizable: true,
      },
      {
        headerName: 'مرکز هزینه',
        field: 'CostCenterName',
        width: 200,
        resizable: true,
      },
      {
        headerName: 'مرکز هزینه فرعی',
        field: 'SubCostCenterName',
        width: 220,
        resizable: true,
      },
      {
        headerName: 'شناسه محصول',
        field: 'CostProductName',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'تحویل گیرنده ',
        field: 'ActorName',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'تاریخ نامه',
        field: 'LetterDate',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 150,
        resizable: true,
      },
    ]

  }

  ngOnInit() {

    forkJoin([
      this.RegionList.GetRegionList(1618, false),
      this.ProductRequest.GetExeUnitPersonByAsset(this.InputParam.selectedRow.AssetID),
      this.Common.GetAllAssetType(),
      this.ProductRequest.GetVWExeUnitByRegion(this.RegionCode),

    ]).subscribe(res => {
      this.RegionItems = res[0];
      this.ActorID = res[1];
      this.AssetTypeItems = res[2];
      this.ExeUnitItems = res[3];
      this.onChangeRegion(200);
    });

    if (this.InputParam) {

      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.AssetID = this.InputParam.selectedRow ? this.InputParam.selectedRow.AssetID : null;
      this.IsEndFlow = this.InputParam.IsEnd === 1;
      if (this.CurrWorkFlow) {
        this.ReadyToConfirm = this.CurrWorkFlow.ReadyToConfirm;
        this.WorkflowTypeName = this.CurrWorkFlow.WorkflowTypeName;
        this.WorkflowTypeCode = this.CurrWorkFlow.WorkflowTypeCode;
        this.WorkflowObjectCode = this.CurrWorkFlow.WorkflowObjectCode;
        this.ObjectNo = this.CurrWorkFlow.ObjectNo;
        this.AssetID = this.ObjectID = this.CurrWorkFlow.ObjectID;
        this.WorkFlowID = this.CurrWorkFlow.WorkflowID;
        this.CartableUserID = this.CurrWorkFlow.CartableUserID;
        this.MinimumPosting = this.CurrWorkFlow.MinimumPosting;
        this.ModuleCode = 1618;
      }

      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.BTNsShow = this.InputParam.BTNs;

      this.ProductRequest.GetAssetID(this.InputParam.selectedRow.AssetID).subscribe(res => {
        this.AssetObject = res;


        this.RegionParams.selectedObject = this.AssetObject.RegionCode;
        this.AssetID = this.AssetObject.AssetID;
        this.AssetGroup = this.AssetObject.AssetGroupCodeName;
        this.GoodObject = this.AssetObject.ProductName;
        this.UnitPatternObject = this.AssetObject.UnitTopicCodeName;
        this.NgSelectParentsArticlePatternParams.selectedObject = this.AssetObject.ArticlePatternID;
        this.NgSelectAssetTypeParams.selectedObject = this.AssetObject.AssetTypeCode;
        this.ScrapAmount = this.AssetObject.ScrapAmount;
        this.RefrenceNo = this.AssetObject.RefrenceNo;
        this.AssetTag = this.AssetObject.AssetTag;
        this.Barcode = this.AssetObject.Barcode;
        this.Note = this.AssetObject.Note;
        this.AssetCode = this.AssetObject.AssetCode;
        this.Depreciation = this.AssetObject.Depreciation;
        this.GrantParentGood = this.AssetObject.ArticlePatternName;
        this.BTNsShow = this.AssetObject.BTNs;
        this.NgSelectBaseAssetGroupParams.selectedObject = this.AssetObject.BaseAssetGroupID;


        this.FillNgSelectedParams(this.AssetObject);
      });      

      if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
        this.btnConfirmName = 'تایید';
        this.btnConfirmIcon = 'ok';
      }

      if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
        this.btnConfirmName = 'عدم تایید';
        this.btnConfirmIcon = 'cancel';
      }

      if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
        this.btnConfirmName = 'بازگشت از تایید نهایی';
        this.btnConfirmIcon = 'cancel';
      }

      if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
        this.btnConfirmName = 'تایید نهایی';
        this.btnConfirmIcon = 'ok';

      }
    }
  }

  FillNgSelectedParams(AssetObject) {

    forkJoin([
      this.ProductRequest.GetExeUnitPersonByAsset(this.AssetID),
      this.ProductList.GetBaseAssetsGroup(0, '', 1, 30, this.AssetObject.BaseAssetGroupID),
      this.ProductRequest.GetArticlePatternByProduct(this.AssetObject.ProductID),
      this.ProductRequest.GetInvVoucherCode(this.AssetObject.RegionCode, this.AssetObject.AssetID),
      this.ProductRequest.GetDepreciationRate(this.AssetID),
      this.ProductRequest.GetRelatedAsset(this.AssetID),
      this.ProductRequest.GetAssetHistoryDataGrid(this.AssetID),

    ]).subscribe(res => {
      this.NgSelectExeUnitPersonParams.selectedObject = res[0];
      this.ActorID = res[0];
      this.OnOpenNgSelectExeUnitPerson();
      this.BaseAssetGroupListSet = res[1].List;
      this.GrantParentGood = res[2];
      this.VoucherCode = res[3];
      if(res[4]){
        this.DepreciationMethodName = res[4].DepreciationMethodName;
      }
      else{
        this.DepreciationMethodName = null;
      }
      this.SupportNo = res[5].SupportNo;
      this.RelatedAsset = res[5].AssetCode;
      if (res[6] && res[6].length > 0) {
        this.rowData = res[6];
      } else {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.alertMessageParams.message = 'رکوردی جهت نمایش یافت نشد';
        this.startLeftPosition = 500;
        this.startTopPosition = 100;
      }
    });
    
  }

  onChangeRegion(ARegionCode) {

    this.RegionParams.selectedObject = ARegionCode;
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
    });

  }
  OnOpenNgSelectParentsArticlePattern() {
    this.RegionCode = this.RegionParams.selectedObject;
    this.ProductList.GetArticlePatternParentList(this.RegionCode).
      subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'parent-type'
        });
      });
  }
  OnOpenNgSelectChildArticlePattern() {
  }


  BaseAssetGroupOpened() {
    this.ProductList.GetBaseAssetsGroup(0, '', 1, 30, this.BaseAssetGroupId ? this.BaseAssetGroupId : null).subscribe(res => {
      this.BaseAssetGroupListSet = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'Asset'
      });
    });
  }

  FetchMoreBaseAssetGroup(event) {
    this.NgSelectBaseAssetGroupParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.ProductList.GetBaseAssetsGroup(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize,
        null).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.BaseAssetGroupListSet.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'Asset'
      });
    });
  }


  FetchBaseAssetGroupByTerm(event) {
    this.NgSelectBaseAssetGroupParams.loading = true;
    this.ProductList.GetBaseAssetsGroup(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      null).
      subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Asset'
        });
      });
    this.NgSelectBaseAssetGroupParams.loading = false;
  }

  OnOpenNgSelectShareType() {
    this.ProductList.GetAssetGroupsByBase(this.BaseAssetGroupID).
      subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'share-type'
        });
      });
  }

  // OnOpenNgSelectRelatedAsset() {
  //   this.ProductRequest.GetRelatedAssetsByRegion(this.RegionParams.selectedObject).
  //     subscribe(res => {
  //       this.RelatedAssetItems = res.List;
  //       this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
  //         List: res.List,
  //         TotalItemCount: res.TotalItemCount,
  //         PageCount: Math.ceil(res.TotalItemCount / 30),
  //         type: 'Related_Asset'
  //       });
  //     });
  // }
  // FetchMoreRelatedAsset(event) {
  //   this.NgSelectelRelatedAssetParams.loading = true;
  //   const ResultList = [];
  //   const promise = new Promise((resolve, reject) => {
  //     event.Owner.ProductRequest.GetRelatedAssetsByRegion(this.RegionParams.selectedObject,
  //       event.PageNumber,
  //       event.PageSize,
  //       event.term,
  //       event.SearchOption).subscribe(res => {
  //         event.CurrentItems.forEach(el => {
  //           ResultList.push(el);
  //         });
  //         res.List.forEach(element => {
  //           ResultList.push(element);
  //         });
  //         resolve(res.TotalItemCount);
  //       });
  //   }).then((TotalItemCount: number) => {
  //     event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
  //       List: ResultList,
  //       term: event.term,
  //       TotalItemCount: TotalItemCount,
  //       PageCount: Math.ceil(TotalItemCount / 30),
  //       type: 'Related_Asset'
  //     });
  //   });
  // }
  // FetchRelatedAssetByTerm(event) {
  //   this.NgSelectelRelatedAssetParams.loading = true;
  //   event.Owner.ProductRequest.GetRelatedAssetsByRegion(this.RegionParams.selectedObject,
  //     event.PageNumber,
  //     event.PageSize,
  //     event.term,
  //     event.SearchOption).subscribe(res => {
  //       event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
  //         List: res.List,
  //         term: event.term,
  //         TotalItemCount: res.TotalItemCount,
  //         PageCount: Math.ceil(res.TotalItemCount / 30),
  //         type: 'Related_Asset'
  //       });
  //       this.NgSelectelRelatedAssetParams.loading = false;
  //     });
  // }
  OnOpenNgSelectAssetType() {

  }
  OnOpenNgSelectExeUnitPerson() {
    this.Actor.GetActorPagingBasedOnRegion(1, 30, '', '', true, false, true, this.ActorID ? this.ActorID : null).subscribe(res => {
      this.ExeUnitPersonItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-search'
      });
    });

  }
  FetchMoreExeUnitPerson(event) {
    this.NgSelectExeUnitPersonParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        true,
        false,
        true,
        this.ActorID).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.ExeUnitPersonItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.ExeUnitPersonItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-person-search'
      });
    });
  }
  SearchExeUnitPerson(event) {
    this.NgSelectExeUnitPersonParams.loading = true;
    this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false,
      true,
      this.ActorID).subscribe(res => {
        this.ExeUnitPersonItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-search'
          });
      });
    this.NgSelectExeUnitPersonParams.loading = false;
  }

  onChangeBaseAssetGroup() {

  }

  onChangeExeUnit() {

  }
  OnOpenExeUnit() {

  }


  RowClick(InputValue) { }

  onCellEditingStarted(event) { }

  onGridReady(params: { api: any; }) { }


  SetStartedWFInfo(Resolve) {
    this.FlowService.GetStartModuleViewTypeCode(200,
      1618,
      this.WorkflowTypeCode,
      this.AssetID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
        }
        Resolve();
      });
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
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

  DOFinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.CartableUserID
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          messageStr = 'بازگشت از تایید نهایی سفارش مشتری با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی سفارش مشتری با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      });
  }

  ConfirmAndSend() {
    this.DoConfirmAndSend();
  }

  onConfirmAndSend() {

    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'ConfirmAndSend';
      this.ConfirmAndSend();
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  DOConfirm(HasAlert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      if (this.WorkflowObjectCode === null) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
      }
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.AssetID,
        200,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn('تایید درخواست  انجام معامله  با موفقیت انجام شد');
          }
          this.RefreshPersonItems.RefreshCartable();
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
          this.IsEditable = false;
          resolve(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  DoConfirmAndSend() {
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.OrderCode;
          this.ObjectID = this.AssetID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                    });
                    this.PopUpType = 'work-flow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    this.PopupParam = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      ObjectID: this.ObjectID,
                      MinimumPosting: this.InputParam.MinimumPosting,
                      OrginalModuleCode: this.OrginalModuleCode,
                      CartableUserID: this.CartableUserID
                    };
                    this.isClicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });

  }

  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.AssetID,
        200,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';
          this.IsEditable = false;
          resolve(true);
        },
          err => {
            if (err.error.Message.includes('|')) {
              resolve(false);
            } else {
              this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
            }
          }
        );
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  onUnConfirmAndReturn() {
    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.IsDown = false;
      const promise = new Promise((resolve, reject) => {
        this.DoUnConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.OrderCode;
          this.ObjectID = this.AssetID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  res.forEach(element => {
                    element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                  });
                  this.PopUpType = 'work-flow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.PopupParam = {
                    Message: 'بازگشت',
                    OperationCode: 2,
                    rows: res,
                    CurrWorkFlow: this.CurrWorkFlow,
                    WorkFlowID: this.WorkFlowID,
                    IsEnd: this.IsEndFlow,
                    ObjectNo: this.ObjectNo,
                    WorkflowTypeName: this.WorkflowTypeName,
                    WorkflowTypeCode: this.WorkflowTypeCode,
                    WorkflowObjectCode: this.WorkflowObjectCode,
                    MinimumPosting: this.MinimumPosting,
                    ObjectID: this.ObjectID,
                    OrginalModuleCode: this.OrginalModuleCode,
                    CartableUserID: this.CartableUserID
                  };
                  this.isClicked = true;
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
                }
              }
            );
        } else {
          this.IsDown = true;
          this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  onConfirm() {

    if (!this.HaveAlertToFinance || this.IsAdmin === true) {
      this.BtnClickedName = 'BtnConfirm';
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          if (this.ChangeDetection) {
            this.ShowMessageBoxWithYesNoBtn('اطلاعات  سفارش مشتری تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
          } else {
            this.DOConfirm();
          }
        } else {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.AssetID,
            200,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            this.OrginalModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید اموال با موفقیت انجام شد');

              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            }
            );
        }
      } else {
        this.DOFinalConfirm();
      }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }

  OnClickAssetPrintFlow(){
    this.Report.ShowReportAssetPage(
      this.AssetID, // ObjID
      this.ModuleCode, // ModuleCode
      this.RegionParams.selectedObject, // RegCode
      null // HaveSave
    );
  }

  popupclosed(event) {
    this.isClicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }

  Close() {
    this.isClicked = false;
    this.Closed.emit(true);
  }

}


