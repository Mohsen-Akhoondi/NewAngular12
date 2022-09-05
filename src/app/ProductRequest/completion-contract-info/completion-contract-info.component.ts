import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { forkJoin } from 'rxjs';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { ActivatedRoute } from '@angular/router';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
@Component({
  selector: 'app-completion-contract-info',
  templateUrl: './completion-contract-info.component.html',
  styleUrls: ['./completion-contract-info.component.css']
})
export class CompletionContractInfoComponent implements OnInit {
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  @ViewChild('IsSelected') IsSelected: TemplateRef<any>;
  @ViewChild('IsCheck') IsCheck: TemplateRef<any>;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() PopupOutPut: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  ContractParams = {
    bindLabelProp: 'SelectedSubject',
    bindValueProp: 'ContractId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: false,
    DropDownMinWidth: '320px',
    type: 'related-contract',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره نامه', HeaderName: 'LetterNo', width: 35, MinTermLenght: 1, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 },
        { HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره نامه', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, },
        { HeaderCaption: 'کد قرارداد', width: 35, }],
      HaveItemNo: true,
      ItemNoWidth: 15
    }
  };
  Article31Disabled = false;
  ContractStatusItems;
  ContractStatusParams = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  LetterDate;
  DealMethodItems;
  DealMethodParams = {
    bindLabelProp: 'DealMethodName',
    bindValueProp: 'DealMethodCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    MinWidth: '210px',
  };
  Address;
  ContractSubject;
  IsTaxValue = true;
  Article31Items;
  Article31Params = {
    bindLabelProp: 'Article31Name',
    bindValueProp: 'Article31ID',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    MinWidth: '510px',
    IsDisabled: false,
    Required: true
  };
  DurationYear;
  DurationMonth;
  DurationDay;
  RegionAreaItems;
  RegionAreaParams = {
    bindLabelProp: 'RegionAreaCode',
    bindValueProp: 'RegionAreaID',
    placeholder: '',
    MinWidth: '50px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RegionAreaDistrictItems;
  RegionAreaDistrictParams = {
    bindLabelProp: 'RegionAreaDistrictName',
    bindValueProp: 'RegionAreaDistrictID',
    placeholder: '',
    MinWidth: '50px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    MinWidth: '190px',
    Required: true
  };
  ContractTypeItems;
  IsCost;
  ModuleCode;
  ProductRequestObject;
  DealTypeCode;
  OnFilterRegionItems;
  OnFilterRegionParams = {
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
  SuperVisor1TotalItemCount;
  SuperVisor2TotalItemCount;
  SuperVisor2PageCount;
  SuperVisor1PageCount;
  SuperVisor2Items;
  SuperVisor1Items;
  NgSelectSuperVisor1Params = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '210px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'Requester-Person',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  BeforeSelectedProductID: any;
  // NgSelectSuperVisor2Params = {
  //   bindLabelProp: 'ActorName',
  //   bindValueProp: 'ActorId',
  //   placeholder: '',
  //   MinWidth: '130px',
  //   PageSize: 30,
  //   PageCount: 0,
  //   TotalItemCount: 0,
  //   selectedObject: null,
  //   loading: false,
  //   IsVirtualScroll: true,
  //   IsDisabled: false,
  //   Required: true,
  //   type: 'Requester-Person',
  //   DropDownMinWidth: '300px',
  //   AdvanceSearch: {
  //     SearchLabel: 'جستجو:',
  //     SearchItemDetails:
  //       [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
  //       { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
  //       // tslint:disable-next-line:max-line-length
  //       { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
  //     SearchItemHeader:
  //       [{ HeaderCaption: 'شناسه', width: 35, },
  //       { HeaderCaption: 'کد ملي', width: 35, },
  //       { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
  //     HaveItemNo: true,
  //     ItemNoWidth: 16
  //   }
  // };
  ProductRequestSubject;
  selectedProductID: any;
  NgSelectCMParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
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
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'PersonName', width: 53, MinTermLenght: 3, SearchOption: 'PersonName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectVSParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
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
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    },
    type: 'ContractSign'
  };
  gridApi: any;
  selectedrow;
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  NgSelectContractEntityItemParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'EntityTypeItemID',
    placeholder: '',
    MinWidth: '200px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'entity-item',
  };
  ProdcutTypeCode: any;
  isClicked: boolean;
  HaveMaxBtn;
  type;
  startLeftPosition;
  startTopPosition;
  Excel_Header_Param: { colDef2: any };
  PopupParam;
  HaveHeader;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ContractsignColDef;
  ContractsignRowsData;
  NewItemTemp = { ItemNo: 1, IsSelected: 1 };
  ContractsignApi;
  ContractObject: any;
  ContractId;
  CommitionListSet = [];
  ContractObj;
  OrdersObject: any;
  OrderCommitionObject;
  ProductRequestItemID = -1;
  CommitionCode;
  OrderCommitionID = null;
  InquiryID = null;
  ReviewMethodItems;
  ReviewMethodParams = {
    bindLabelProp: 'ReviewMethodName',
    bindValueProp: 'ReviewMethodCode',
    placeholder: '',
    MinWidth: '190px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProductRequestObj;
  ModuleViewTypeCode;
  FilterDocumentTypeCodeList = [];
  DocTypeItems;
  ParentDocumentTypeParam = {
    bindLabelProp: 'DocumentTypeName',
    bindValueProp: 'DocumentTypeCode',
    placeholder: '',
    MinWidth: '155px',
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    selectedObject: null,
  };
  FromContractDate;
  ToContractDate;
  OrginalModuleCode;
  OrderObj;
  IsEditable = false;
  btnConfirmName;
  btnConfirmIcon;
  StartdateString;
  EndDateString;
  OverMainMinwidthPixel;
  HasAssetEstaeBtn = false;
  CheckValidate = false;


  constructor(private Actor: ActorService,
    private ContractList: ContractListService,
    private ProductRequest: ProductRequestService,
    private PriceList: PriceListService,
    private RefreshCartable: RefreshServices,
    private ArchiveList: ArchiveDetailService,
    private RefreshPersonItems: RefreshServices,
    private route: ActivatedRoute,
    private Order: OrderService,
    private Common: CommonService) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }
  ngOnInit() {
    this.IsEditable = this.InputParam.IsEditable;
    this.ProductRequestObject = this.InputParam.row;
    this.HasAssetEstaeBtn = this.ProductRequestObject.IsEstate;
    this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
    this.ModuleCode = this.InputParam.ModuleCode;
    this.IsCost = this.ProductRequestObject.IsCost;
    this.DealTypeCode = this.ProductRequestObject.DealTypeCode;
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 30;
    this.ContractsignRowsData = [];
    this.ProductRequestSubject = this.ProductRequestObject.Subject;
    this.Address = this.ProductRequestObject.Address;
    this.DurationDay = this.ProductRequestObject.DurationDay;
    this.DurationMonth = this.ProductRequestObject.DurationMonth;
    this.DurationYear = this.ProductRequestObject.DurationYear;
    this.ProductRequest.GetProductRequestItemList(this.ProductRequestObject.CostFactorID).subscribe(ress => {
      // tslint:disable-next-line:max-line-length
      this.ProductRequestItemID = ress && ress.length > 0 ? ress[0].ProductRequestItemID : -1;
    });
    this.ProductRequest.GetOrderCompletion(this.ProductRequestObject.CostFactorID, true).subscribe((res: any) => {
      this.OrderObj = res;
      this.InquiryID = this.OrderObj && this.OrderObj.LastInquiryObject ? this.OrderObj.LastInquiryObject.InquiryID : null;
      this.ProductRequest.ReviewMethodList().subscribe((ress: any) => {
        if (ress && ress.length > 0) {
          this.ReviewMethodItems = ress;
          this.ReviewMethodParams.selectedObject = this.OrderObj.LastInquiryObject.ReviewMethodCode;
        }
      });
    });

    if (this.ProductRequestObject.DealMethodCode) {
      // tslint:disable-next-line: max-line-length
      this.PriceList.GetAticle31ListByDealMethodCode(this.ProductRequestObject.DealMethodCode, this.ProductRequestObject.RegionCode).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.Article31Items = res;
          this.Article31Params.selectedObject = this.ProductRequestObject.Article31ID;
        }
      });
    }

    if (this.ProductRequestObject.WorkPlaceCode) {

      this.ProductRequest.GetRegionAreaList(this.ProductRequestObject.WorkPlaceCode).subscribe(res => {
        this.RegionAreaItems = res;

        this.RegionAreaParams.selectedObject = this.ProductRequestObject.RegionAreaID;
        if (this.RegionAreaParams.selectedObject) {
          this.ProductRequest.GetRegionAreaDistrictList(this.ProductRequestObject.RegionAreaID).subscribe(ress => {
            this.RegionAreaDistrictItems = ress;
            this.RegionAreaDistrictParams.selectedObject = this.ProductRequestObject.RegionAreaDistrictID;
          });
        }
      });
    }

    forkJoin([
      this.ContractList.GetContractTypeListByType(this.IsCost, this.InputParam.ModuleCode, this.ProductRequestObject.RegionCode),
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetDealMethodListByReionGroupCode(
        this.IsCost,
        this.DealTypeCode,
        this.ProductRequestObject.RegionCode,
        this.InputParam.ModuleCode,
        this.ProductRequestObject.DealMethodCode,
        null,
        null),
      this.ContractList.GetContractStatusList(),
      this.ProductRequest.GetOnfilterRegion(),
      this.ProductRequest.GetContractSignerList(this.ProductRequestObject.RegionCode,
        this.ProductRequestObject.ShortProductRequestDate, this.ProductRequestObject.CostFactorID, this.ProductRequestObject.ContractID),
      // tslint:disable-next-line:max-line-length
      this.ProductRequest.GetContractForProductRequest(this.ProductRequestObject.RelatedContractID, this.ProductRequestObject.ProvisionContractID, this.ProductRequestObject.CostFactorID)
    ]
    ).subscribe(res => {
      this.ContractTypeItems = res[0];
      this.ContractTypeParams.selectedObject = this.ProductRequestObject.ContractTypeCode;
      this.DealMethodItems = res[1];
      this.DealMethodParams.selectedObject = this.ProductRequestObject.DealMethodCode;
      if (this.DealMethodParams.selectedObject !== 4 &&
        this.DealMethodParams.selectedObject !== 7 &&
        this.DealMethodParams.selectedObject !== 8 &&
        this.DealMethodParams.selectedObject !== 9) {
        this.Article31Disabled = false;
      } else {
        this.Article31Disabled = true;
      }
      this.ContractStatusItems = res[2];
      this.ContractObj = res[5];
      this.IsTaxValue = this.ContractObj.IsTaxValue;
      this.OnFilterRegionItems = res[3];
      this.OnFilterRegionParams.selectedObject = this.ProductRequestObject.WorkPlaceCode;
      this.ContractsignRowsData = res[4];
      this.ContractStatusParams.selectedObject = this.ContractObj.ContractSatusCode;
      this.ContractSubject = this.ContractObj.Subject;
      this.LetterDate = this.ContractObj.ShortLetterDate;
      this.NgSelectSuperVisor1Params.selectedObject = this.ContractObj.CosContractActorID;

      // this.NgSelectSuperVisor2Params.selectedObject = this.ContractObj.SecondObserverID;
      this.OpenSuperVisor1(null);
      // this.OpenSuperVisor2(null);
      if (this.ContractObj.LastContractOrderObject && this.ContractObj.LastContractOrderObject.ContractOrderItemList
        && this.ContractObj.LastContractOrderObject.ContractOrderItemList.length > 0) {
        this.StartdateString = this.ContractObj.LastContractOrderObject.ContractOrderItemList.reduce(function (a, b) {
          return a.PersianStartDateString < b.PersianStartDateString ?
            a : b;
        }).PersianStartDateString;
        this.EndDateString = this.ContractObj.LastContractOrderObject.ContractOrderItemList.reduce(function (a, b) {
          return a.PersianEndDateString > b.PersianEndDateString ?
            a : b;
        }).PersianEndDateString;
      }
      this.FromContractDate = this.ProductRequestObject.RelatedContractID ? this.StartdateString :
        this.ContractObj.FromContractDateString;
      this.ToContractDate = this.ProductRequestObject.RelatedContractID ? this.EndDateString :
        this.ContractObj.ToContractDateString;
    });
    this.btnConfirmName = this.IsEditable ? 'ارسال برای تایید' : 'بازگشت';
    this.btnConfirmIcon = this.IsEditable ? 'ok' : 'cancel';
    this.getDocumentTypeList();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.ContractsignColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'انتخاب',
        field: 'IsSelected',
        width: 80,
        editable: true,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsSelected
        },
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreContractSignPerson,
          FetchByTerm: this.FetchContractSignPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
    ];
  }
  OnLetterDateChange(ADate) {
    this.LetterDate = ADate.MDate;
  }
  OnStartDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
  }
  OnEndDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
  }
  OnChTaxValueChange(event) {
    this.IsTaxValue = event;
  }
  getDurationYear(DurationYear) {
    if (DurationYear && DurationYear > 0) {
      this.DurationYear = DurationYear;
      this.DurationYear = parseFloat(this.DurationYear);
    } else {
      this.DurationYear = '';
    }
  }
  getDurationMonth(DurationMonth) {
    if (DurationMonth && DurationMonth > 0) {
      this.DurationMonth = DurationMonth;
      this.DurationMonth = parseFloat(this.DurationMonth);
    } else {
      this.DurationMonth = '';
    }
  }
  getDurationDay(DurationDay) {
    if (DurationDay && DurationDay > 0) {
      this.DurationDay = DurationDay;
      this.DurationDay = parseFloat(this.DurationDay);
    } else {
      this.DurationDay = '';
    }
  }
  onChangeFilterRegion(ARegionCode) {
    this.RegionAreaParams.selectedObject = null;
    this.RegionAreaDistrictParams.selectedObject = null;
    this.ProductRequest.GetRegionAreaList(ARegionCode).subscribe(res => {
      this.RegionAreaItems = res;
    });
  }
  onChangeRegionArea(RegionAreaDistrictID) {
    this.ProductRequest.GetRegionAreaDistrictList(this.RegionAreaParams.selectedObject).subscribe(res => {
      this.RegionAreaDistrictItems = res;
    });
  }
  onChangeContractType(TypeCode) {
  }
  Close() {
    this.Closed.emit(true);
  }
  onSave() {
    this.CheckValidate = true;
    if (this.OrginalModuleCode === 2939 &&
      (!this.ProductRequestSubject || this.ProductRequestSubject === '' ||
        !this.ContractSubject || this.ContractSubject === '' ||
        !this.ContractTypeParams.selectedObject || this.ContractTypeParams.selectedObject === null ||
        !this.ReviewMethodParams.selectedObject || this.ReviewMethodParams.selectedObject === null ||
        !this.NgSelectSuperVisor1Params.selectedObject || this.NgSelectSuperVisor1Params.selectedObject === null ||
        ((this.DealMethodParams.selectedObject === 4 || this.DealMethodParams.selectedObject === 7 ||
          this.DealMethodParams.selectedObject === 8 || this.DealMethodParams.selectedObject === 9) &&
          (!this.Article31Params.selectedObject || this.Article31Params.selectedObject === null))
      )
    ) {
      this.ShowMessageBoxWithOkBtn('.لطفا فیلد های ستاره دار را پر نمایید');
      return;
    }
    if (this.OrginalModuleCode === 2939 &&
      (!this.ProductRequestSubject || this.ProductRequestSubject === '' ||
        !this.ContractSubject || this.ContractSubject === '')) {
      this.ShowMessageBoxWithOkBtn('.لطفا فیلد های ستاره دار را پر نمایید');
      return;
    }
    if (this.OrginalModuleCode === 2951 &&
      ((!this.ProductRequestSubject || this.ProductRequestSubject === '') ||
        (!this.ContractSubject || this.ContractSubject === '') ||
        (!this.ContractTypeParams.selectedObject || this.ContractTypeParams.selectedObject === null) ||
        (!this.ReviewMethodParams.selectedObject || this.ReviewMethodParams.selectedObject === null) ||
        (!this.NgSelectSuperVisor1Params.selectedObject || this.NgSelectSuperVisor1Params.selectedObject === null)
      )
    ) {
      this.ShowMessageBoxWithOkBtn('.لطفا فیلد های ستاره دار را پر نمایید');
      return;
    }
    const ProductRequestObj = {
      ContractTypeCode: this.ContractTypeParams.selectedObject,
      CostFactorID: this.ProductRequestObject.CostFactorID,
      DealMethodCode: this.DealMethodParams.selectedObject,
      Subject: this.ProductRequestSubject,
      Article31ID: this.Article31Params.selectedObject,
      Address: this.Address,
      DurationYear: this.DurationYear,
      DurationMonth: this.DurationMonth,
      DurationDay: this.DurationDay,
      RegionAreaID: this.RegionAreaParams.selectedObject, // ناحیه
      RegionAreaDistrictID: this.RegionAreaDistrictParams.selectedObject, // محله
      WorkPlaceCode: this.OnFilterRegionParams.selectedObject, // واحد اجرایی محل انجام کار
      IsConfirm: 0,
    };
    const ContractObj = {
      ContractId: this.ProductRequestObject.ContractID,
      ContractTypeCode: this.ContractTypeParams.selectedObject,
      ContractSatusCode: this.ContractStatusParams.selectedObject,
      ActorID: this.NgSelectSuperVisor1Params.selectedObject,
      // SecondObserverID: this.NgSelectSuperVisor2Params.selectedObject,
      Subject: this.ContractSubject,
      IsTaxValue: this.IsTaxValue,
    };
    this.ContractsignApi.stopEditing();
    const ContractSignList = [];
    this.ContractsignApi.forEachNode(node => {
      if (node.data.IsSelected) {
        const ContractSignObj = {
          ContractSignID: node.data.ContractSignID ? node.data.ContractSignID : -1,
          ContractID: -1,
          ActorID: node.data.ActorName.ActorID ? node.data.ActorName.ActorID : (node.data.ActorID ? node.data.ActorID : null),
          UnitPersonID: -1
        };
        ContractSignList.push(ContractSignObj);
      }
    });
    this.ProductRequest.SaveCompletionContractInfo(
      this.ProductRequestObject.CostFactorID,
      this.ModuleCode,
      ProductRequestObj,
      ContractObj,
      ContractSignList,
      this.InquiryID,
      this.ReviewMethodParams.selectedObject,
      this.FromContractDate,
      this.ToContractDate
    ).subscribe((res: any) => {
      this.PopupOutPut.emit(true);
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }
  onChangeDealMethod(DealMethodCode) {
    if (DealMethodCode !== 4 && DealMethodCode !== 7 && DealMethodCode !== 8 && DealMethodCode !== 9) {
      this.Article31Disabled = false;
    } else {
      this.Article31Disabled = true;
    }
    if (DealMethodCode) {
      this.PriceList.GetAticle31ListByDealMethodCode(DealMethodCode, this.ProductRequestObject.RegionCode).subscribe((res: any) => {
        if (res && res.length > 0) {
          this.Article31Items = res;
          this.Article31Params.IsDisabled = false;
        } else {
          this.Article31Params.IsDisabled = true;
          this.Article31Params.selectedObject = null;
        }
      });
    }
  }
  FetchMoreSuperVisor1(event) {
    const ResultList = [];
    // this.NgSelectSuperVisor2Params.loading = true;
    this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
      , true, false, false, null).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.SuperVisor1Items = ResultList;
        this.NgSelectSuperVisor1Params.loading = false;
      }
      );
  }
  // FetchMoreSuperVisor2(event) {
  //   const ResultList = [];
  //   // this.NgSelectSuperVisor2Params.loading = true;
  //   this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
  //     , true, false, false, null).subscribe(res => {
  //       event.CurrentItems.forEach(el => {
  //         ResultList.push(el);
  //       });
  //       res.List.forEach(element => {
  //         ResultList.push(element);
  //       });
  //       this.SuperVisor2Items = ResultList;
  //       // this.NgSelectSuperVisor2Params.loading = false;
  //     }
  //   );
  // }
  OpenSuperVisor1(event) {
    const ResultList = [];
    // tslint:disable-next-line: max-line-length
    this.Actor.GetAllActorsPaging(1, 30, '', 'IdentityNo', true, false, false, this.NgSelectSuperVisor1Params.selectedObject).subscribe(res => {
      this.SuperVisor1Items = res.List;
      this.SuperVisor1TotalItemCount = res.TotalItemCount;
      this.SuperVisor1PageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }
  // OpenSuperVisor2(event) {
  //   const ResultList = [];
  //   // tslint:disable-next-line: max-line-length
  //   this.Actor.GetAllActorsPaging(1, 30, '', 'IdentityNo', true, false, false, null).subscribe(res => {
  //     this.SuperVisor2Items = res.List;
  //     this.SuperVisor2TotalItemCount = res.TotalItemCount;
  //     this.SuperVisor2PageCount = Math.ceil(res.TotalItemCount / 30);
  //   });
  // }
  doSuperVisor1Search(event) {
    // this.NgSelectSuperVisor2Params.loading = true;
    this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
      , true, false, false, null).subscribe(res => {
        if (event.term === res.SearchTerm) {
          this.SuperVisor1Items = res.List;
          this.SuperVisor1TotalItemCount = res.TotalItemCount;
          this.SuperVisor1PageCount = Math.ceil(res.TotalItemCount / 30);
          this.NgSelectSuperVisor1Params.loading = false;
        }
      });
  }
  doSuperVisor2Search(event) {
    // this.NgSelectSuperVisor2Params.loading = true;
    this.Actor.GetAllActorsPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption
      , true, false, false, null).subscribe(res => {
        if (event.term === res.SearchTerm) {
          this.SuperVisor2Items = res.List;
          this.SuperVisor2TotalItemCount = res.TotalItemCount;
          this.SuperVisor2PageCount = Math.ceil(res.TotalItemCount / 30);
          // this.NgSelectSuperVisor2Params.loading = false;
        }
      });
  }
  SuperVisor1Changed(event) {
    if (!event) {
      this.NgSelectSuperVisor1Params.selectedObject = null;
    } else {
      this.NgSelectSuperVisor1Params.selectedObject = event;
    }
  }
  // SuperVisor2Changed(event) {
  //   if (!event) {
  //     this.NgSelectSuperVisor2Params.selectedObject = null;
  //   } else {
  //     this.NgSelectSuperVisor2Params.selectedObject = event;
  //   }
  // }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onGridReadyRequestContractsign(params: { api: any; }) {
    this.ContractsignApi = params.api;
  }
  onContractSigncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Actor.GetAllPersonsPaging(1, 30, '', null, event.data.ActorID, this.ProductRequestObject.RegionCode).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractSign'
        });
      });
    }
  }
  FetchMoreContractSignPerson(event) {
    event.Owner.ContractsignColDef[2].cellEditorParams.Params.loading = true; // RFC 50671
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetAllPersonsPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, null, event.Owner.ProductRequestObject.RegionCode).subscribe(res => {
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
        type: 'ContractSign'
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }
  FetchContractSignPersonByTerm(event) {
    event.Owner.ContractsignColDef[2].cellEditorParams.Params.loading = true; // RFC 50671
    // tslint:disable-next-line: max-line-length
    event.Owner.Actor.GetAllPersonsPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, null, event.Owner.ProductRequestObject.RegionCode).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'ContractSign'
        });
      });
  }

  popupclosed(Param) {
    this.HaveMaxBtn = false;
    this.isClicked = false;
    this.getDocumentTypeList();
    if (this.type === 'app-commition') {
      this.ProductRequest.GetOrderCompletion(this.ProductRequestObject.CostFactorID).subscribe((res: any) => {
        this.OrderObj = res;
      });
    }
  }
  BtnArchiveClick() {
    if (this.ParentDocumentTypeParam.selectedObject) {
      const promise = new Promise((resolve) => {
        switch (this.ParentDocumentTypeParam.selectedObject) {
          case 10:
            this.FilterDocumentTypeCodeList = [12, 13, 16, 18, 22];
            resolve(this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : 0);
            break;
          case 38:
          case 139:
            this.FilterDocumentTypeCodeList = [82, 83, 90];
            resolve(this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : 0);
            break;
          case 44:
            this.FilterDocumentTypeCodeList = [48, 56, 281, 282, 283];
            resolve(this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : 0);
            break;
          case 46:
            this.FilterDocumentTypeCodeList = [66];
            resolve(this.ProductRequestObject.CostFactorID ? this.ProductRequestObject.CostFactorID : 0);
            break;
          default:
            resolve(0);
            break;
        }
      }).then((EntityID: number) => {
        if (EntityID > 0) {
          this.type = 'archive-details';
          this.HaveHeader = true;
          this.isClicked = true;
          this.startLeftPosition = 300;
          this.startTopPosition = 5;
          this.PopupParam = {
            EntityID: EntityID,
            DocTypeCode: this.ParentDocumentTypeParam.selectedObject,
            DocumentTypeCodeList: this.FilterDocumentTypeCodeList,
            ModuleCode: 2939,
            OrginalModuleCode: 2939,
            // ModuleCode: this.ModuleCode,
            // HasCheck: true,
            IsReadOnly: !this.IsEditable,
          };
        } else if (EntityID === 0) {
          this.ShowMessageBoxWithOkBtn('شناسه این گروه مستندات مشخص نشده است، خواهشمند است با پشتیبانی تماس بگیرید.');
        }
      });
    } else {
      this.startLeftPosition = 535;
      this.startTopPosition = 210;
      this.isClicked = true;
      this.type = 'message-box';
      this.alertMessageParams.message = 'لطفا گروه مستند را انتخاب نمایید.';
    }
  }
  getDocumentTypeList(): void {
    const DocTypeList = [10, 38, 44, 46, 46];
    this.ArchiveList.GetADocTypeList(DocTypeList).subscribe((res: any) => {
      this.DocTypeItems = res;
    });
  }

  onCellValueChanged(event) {
    const itemsToUpdate = [];
    if (event.newValue && event.newValue.ActorId) {
      this.ContractsignApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.ActorID = event.newValue.ActorId;
          itemsToUpdate.push(node.data);
        }
      });
      this.ContractsignApi.updateRowData({ update: itemsToUpdate });
    }
  }
  onCommitionClick() {
    this.type = 'app-commition';
    this.isClicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 9;
    this.startTopPosition = 10;
    this.OverMainMinwidthPixel = 1340;
    this.HaveMaxBtn = false;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      Subject: this.ProductRequestObject.Subject,
      RegionCode: this.ProductRequestObject.RegionCode,
      ProductRequestNo: this.ProductRequestObject.ProductRequestNo,
      ProductRequestDate: this.ProductRequestObject.ProductRequestDate,
      CostFactorID: this.ProductRequestObject.CostFactorID,
      IsReadOnly: false,
      HeaderName: 'کمیسیون',
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      CheckRegionWritable: this.InputParam.IsRegionReadOnly,
      currentRegionObject: this.ProductRequestObject.RegionObject,
      IsMultiContract: this.ProductRequestObject.IsMultiContract ? true : false,
      OrginalModuleCode: this.OrginalModuleCode,
      ModuleCode: this.ModuleCode,
      OrderObj: this.OrderObj ? this.OrderObj : null,
      InquiryObject: this.OrderObj && this.OrderObj.LastInquiryObject ? this.OrderObj.LastInquiryObject : null,
      IsAdmin: true,
      ProductRequestItemID: this.ProductRequestItemID,
    };
  }
  getOutPutParam(event) {
    if (event && this.type === 'app-commition') {
      this.ProductRequest.GetOrderCompletion(this.ProductRequestObject.CostFactorID).subscribe((res: any) => {
        this.OrderObj = res;
      });
    }
  }
  onEstateClick() {
    let ActorObject;
    if (this.ProductRequestObject.CorporateID) {
      this.Common.GetCorporateObject(this.ProductRequestObject.CorporateID).subscribe(res => {
        ActorObject = res;
      });
    }
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.type = 'product-request-estate';
    this.HaveHeader = true;
    this.startLeftPosition = 135;
    this.startTopPosition = 40;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      ModuleViewTypeCode: this.ModuleViewTypeCode,
      ModuleCode: this.ModuleCode,
      ActorObject: ActorObject,
      OrginalModuleCode: this.OrginalModuleCode,
      IsCost: this.IsCost
    };
  }
}

