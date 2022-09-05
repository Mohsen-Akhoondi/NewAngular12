import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { InvoiceService } from 'src/app/Services/Invoice/InvoiceService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { isUndefined } from 'util';
import { InvoiceDataModel } from './InvoiceDataModel';
import { InvoiceFooterDataModel } from './InvoiceFooterDataModel';
import { InvoiceItemDataModel } from './InvoiceItemDataModel';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-single-sale-invoice',
  templateUrl: './single-sale-invoice.component.html',
  styleUrls: ['./single-sale-invoice.component.css']
})
export class SingleSaleInvoiceComponent implements OnInit {
  InvoiceObject: InvoiceDataModel = new InvoiceDataModel();
  @Input() InputParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CheckValidate = false;
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
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubCostCenterItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CheckValidateCostCenterParams;
  RequestedPersonItems = <any>[];
  RequestedPersonParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ActorType = true;
  Subject;
  ActorPageCount;
  ActorTotalItemCount;
  ActorItems;
  NgSelectActorParams = {
    bindLabelProp: 'ActorIdentityName',
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
    Required: true,
    type: 'product-request-contract-contractor',
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
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  InvoiceCode;
  RegisterInvoiceCode;
  ShortRegisterInvoiceDate;
  RegisterInvoiceDate;
  InvocieItemcolumnDef;
  InvoiceFootercolumnDef;
  InvoiceItemList: InvoiceItemDataModel[] = [];
  InvoiceFooterList: InvoiceFooterDataModel[] = [];
  GridHeight = 88;
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  NgSelectVSParams = {
    bindLabelProp: 'ProductCodeName',
    bindValueProp: 'ProductID',
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
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, TermLenght: 3, SearchOption: 0 },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1, CanGrow: true }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  CurrentUserSubCostCenter: any;
  ModuleCode = 2942;
  CurentUser: any;
  RequestPersonObject: any;
  currentRegionObject: any;
  gridApi: any;
  ProdcutTypeCode: any;
  InvoiceFootergridApi: any;
  NgSelectIFooterTypetems;
  NgSelectFooterTypeParams = {
    bindLabelProp: 'InvoiceFooterTypeName',
    bindValueProp: 'InvoiceFooterTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'invoice-footer-type'
  };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ModuleViewTypeCode;
  WorkflowObjectCode: any;
  WorkFlowID: any;
  WorkflowTypeName: any;
  WorkflowTypeCode: any;
  CurrWorkFlow: any;
  CartableUserID: any;
  IsContractRemainStartWF: any;
  IsWFShow: any;
  WorkListDetailRows: any;
  ModuleViewTypeCode_Cache: any;
  ReadyToConfirm: any;
  IsEndFlow;
  ObjectNo: any;
  ObjectID: any;
  MinimumPosting: any;
  UserRegionCode: any;
  btnConfirmName: string;
  btnConfirmIcon: string;
  CheckRegionWritable: any;
  BtnClickedName: string;
  OrginalModuleCode = 2942;
  PopupParam;
  WorkFlowTransitionID: any;
  IsDown: boolean;
  IsGridEditable = true;
  IsEditable = true;
  HaveAlertToFinance = false;
  IsAdmin: boolean;
  FooterGridDevHeight = 38;
  FooterGridHeight = 70;
  SumUnitPrice = '0';
  SumPrice = '0';
  SumDiscount = '0';
  SumTaxValue = '0';
  SumFinalPrice = '0';
  SumAmount = '0';
  SumTotal = '0';
  HeightPercentWithMaxBtn;
  IsNotShowConfirmBtn = false;
  CurrentModuleCode;
  IsDisplay = true;
  AdministratorActorItems = [];
  AdministratorActorParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  IsMandatory = false;
  CurrentYear;
  btnRevocationName;
  btnRevocationIcon;

  ///////////////// بانک /////////////////
  NgSelectBankParams = {
    bindLabelProp: 'BankName',
    bindValueProp: 'BankID',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'Bank',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'BankID', width: 65, MinTermLenght: 1, SearchOption: 'BankID' },
        { HeaderCaption: 'کد بانک', HeaderName: 'BankCode', width: 45, MinTermLenght: 1, SearchOption: 'BankCode' },
        { HeaderCaption: 'نام بانک', HeaderName: 'BankName', width: 63, MinTermLenght: 3, SearchOption: 'BankName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 65, },
        { HeaderCaption: 'کد بانک', width: 45, },
        { HeaderCaption: 'نام بانک', width: 63, }],
      HaveItemNo: true,
      ItemNoWidth: 18
    }
  };
  BankPageCount;
  BankItems: any;
  BankTotalItemCount;

  ///////////////// شعبه /////////////////
  NgSelectBranchParams = {
    bindLabelProp: 'BranchName',
    bindValueProp: 'BranchID',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'Branch',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'BranchID', width: 65, MinTermLenght: 1, SearchOption: 'BranchID' },
        { HeaderCaption: 'کد شعبه', HeaderName: 'CorporateCode', width: 45, MinTermLenght: 1, SearchOption: 'CorporateCode' },
        { HeaderCaption: 'نام شعبه', HeaderName: 'BranchName', width: 63, MinTermLenght: 3, SearchOption: 'BranchName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 65, },
        { HeaderCaption: 'کد شعبه', width: 45, },
        { HeaderCaption: 'نام شعبه', width: 63, }],
      HaveItemNo: true,
      ItemNoWidth: 18
    }
  };
  BranchPageCount;
  BranchItems: any;
  BranchTotalItemCount;
  ActorBankAccID;
  AccNo;
  CityID;
  ShebaNo;
  HaveBank = true;
  IsForcedBankInfo = true;
  IsDisableRefisterField = false;
  IsInFinishedCartable = false; // RFC 61296
  ShowBtn = true;

  constructor(private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private router: Router,
    private RefreshPersonItems: RefreshServices,
    private Workflow: WorkflowService,
    private Actor: ActorService,
    private Invoice: InvoiceService,
    private CommonService: CommonServices,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private Report: ReportService,
    private User: UserSettingsService,
    private RefreshBankItems: RefreshServices,
    private Common: CommonService,
    private contractpaydetail: ContractPayDetailsService) {
    this.InvoiceObject.Init();

    this.InvoiceFootercolumnDef = [

      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },

      {
        headerName: 'زیر نویس فاکتور',
        field: 'InvoiceFooterTypeName',
        resizable: true,
        editable: () => {
          return this.IsGridEditable;
        },
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectFooterTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.InvoiceFooterTypeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.InvoiceFooterTypeName !== params.oldValue) {
              params.data.InvoiceFooterTypeName = params.newValue.InvoiceFooterTypeName;
              params.data.InvoiceFooterTypeCode = params.newValue.InvoiceFooterTypeCode;
              params.data.IsIncrement = params.newValue.IsIncrement;
              return true;
            }
          } else {
            params.data.InvoiceFooterTypeName = null;
            params.data.InvoiceFooterTypeCode = null;
            return false;
          }
        },
        width: 350,
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Amount = params.newValue;
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
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

  CalculateFinalPrice(node) {
    let Price = node.data.Price;
    let TaxValue = node.data.TaxValue;
    let Discount = node.data.Discount;


    if (!Price) {
      Price = 0;
    }
    if (!TaxValue) {
      TaxValue = 0;
    }
    if (!Discount) {
      Discount = 0;
    }

    node.data.FinalPrice = parseInt(Price) + parseInt(TaxValue) - parseInt(Discount);

  }

  CalculateTaxValue(node) {
    const Price = node.data.Price;
    if (Price && Price > 0 && node.data.IsTaxValue) {
      // tslint:disable-next-line: radix
      node.data.TaxValue = parseInt((Price * 0.09).toString());
    }
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    if (this.InputParam) {
      // tslint:disable-next-line: max-line-length
      this.UserRegionCode = this.InputParam.UserRegionCode ? this.InputParam.UserRegionCode : this.InvoiceObject ? this.InvoiceObject.RegionCode : null;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.IsWFShow = this.InputParam.IsWFShow;
      this.WorkListDetailRows = this.InputParam.rows;
      this.IsContractRemainStartWF = this.InputParam.IsStartWF;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.CurrentModuleCode = this.InputParam.CurrentModuleCode;
      this.ModuleViewTypeCode_Cache = this.ModuleViewTypeCode;
      this.ObjectID = this.InputParam.InvoiceID;
      this.IsInFinishedCartable = this.InputParam.IsInFinishedCartable; // RFC 61296
      this.ShowBtn = this.IsInFinishedCartable ? false : true;
      if (this.CurrWorkFlow) {
        this.WorkFlowID = this.CurrWorkFlow.WorkflowID;
        this.ReadyToConfirm = this.CurrWorkFlow.ReadyToConfirm;
        this.IsEndFlow = this.CurrWorkFlow.IsEnd === 1;
        this.WorkflowTypeName = this.CurrWorkFlow.WorkflowTypeName;
        this.WorkflowTypeCode = this.CurrWorkFlow.WorkflowTypeCode;
        this.WorkflowObjectCode = this.CurrWorkFlow.WorkflowObjectCode;
        this.ObjectNo = this.CurrWorkFlow.ObjectNo;
        this.ObjectID = this.CurrWorkFlow.ObjectID;
        this.CartableUserID = this.CurrWorkFlow.CartableUserID;
        this.MinimumPosting = this.CurrWorkFlow.MinimumPosting;
      }
      if (this.WorkflowTypeCode === 383 && this.WorkflowObjectCode === 17 && this.InputParam.ModuleViewTypeCode === 200000) {
        this.IsNotShowConfirmBtn = true;
      }
    }

    if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید';
      this.btnConfirmIcon = 'ok';
      // this.HaveConfirm = true;
    }

    if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'عدم تایید';
      this.btnConfirmIcon = 'cancel';
      // this.HaveConfirm = true;
    }

    if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'بازگشت از تایید نهایی';
      this.btnConfirmIcon = 'cancel';
      // this.HaveConfirm = true;
    }

    if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید نهایی';
      this.btnConfirmIcon = 'ok';
      // this.HaveConfirm = true;
    }
    this.User.CheckAdmin().subscribe(res => {
      this.IsAdmin = res;
    });
    this.ProductRequest.GetSubCostCenterPerson().subscribe(res => {
      this.CurrentUserSubCostCenter = res;
    });
    this.Invoice.GetInvoice(this.ObjectID).subscribe(InvoiceObject => {

      if (InvoiceObject && InvoiceObject.InvoiceID > 0) {
        this.InvoiceObject = InvoiceObject;
        this.InvoiceItemList = this.InvoiceObject.InvoiceItemList;
        this.InvoiceFooterList = this.InvoiceObject.InvoiceFooterList;
        this.IsDisableRefisterField = this.InvoiceObject.IsMultiInvoice;
        this.FillAllNgSelectByInvoiceObject(InvoiceObject);

        if (InvoiceObject.ActorID > 0) {
          this.Common.GetActorBankAccList(this.InvoiceObject.ActorID).subscribe((res: any[]) => {
            if (res && res.length > 0) {
              this.OpenBank();
              this.NgSelectBankParams.selectedObject = res[0].BankID;
              this.OpenBranch();
              this.NgSelectBranchParams.selectedObject = res[0].BranchID;
              this.ActorBankAccID = res[0].ActorBankAccID;
              this.AccNo = res[0].AccNo;
              this.CityID = res[0].CityID;
              this.ShebaNo = res[0].ShebaNo;
            } else {
              this.NgSelectBankParams.selectedObject = null;
              this.NgSelectBranchParams.selectedObject = null;
              this.AccNo = null;
              this.ActorBankAccID = null;
              this.CityID = null;
              this.ShebaNo = null;
            }
          });
        }
      } else {
        this.OnOpenNgSelect('Region');
        this.OnOpenNgSelect('FinYear');
      }
      this.SetColumnDef(this.IsDisableRefisterField);

      if (!this.InvoiceObject.IsValid) {
        this.btnRevocationName = 'بازگشت از ابطال';
        this.btnRevocationIcon = 'ok';
      } else {
        this.btnRevocationName = 'ابطال';
        this.btnRevocationIcon = 'revocation';
      }

    });
  }

  FillAllNgSelectByInvoiceObject(InvoiceObject) {
    this.NgSelectActorParams.selectedObject = this.InvoiceObject.ActorID;
    this.OpenActor();
    this.OpenBank();
    const promise3 = new Promise<void>((resolve) => {
      forkJoin([
        // tslint:disable-next-line: max-line-length
        this.RegionList.GetRegionList(this.ModuleCode),
        this.ProductRequest.GetCostCenterByRegionAndRequestOwner(InvoiceObject.RegionCode,
          InvoiceObject.SubCostCenterObject ? InvoiceObject.SubCostCenterObject.CostCenterId : null, this.ModuleCode, false),
        this.ProductRequest.GetListByCostCenterId(InvoiceObject.SubCostCenterObject.CostCenterId, this.ModuleCode, true,InvoiceObject.SubCostCenterObject.CostCenterObject.RegionCode),
        this.Workflow.GetFinYearList(),
        this.ProductRequest.GetSubCostCenterPriPerson(
          InvoiceObject.SubCostCenterObject.CostCenterId,
          InvoiceObject.SubCostCenterID,
          (this.InvoiceObject && this.InvoiceObject.RequestedPersonID ? this.InvoiceObject.RequestedPersonID : null),
          this.ModuleCode)

      ]).subscribe((res: any) => {
        this.RegionItems = res[0];
        this.RegionParams.selectedObject = InvoiceObject.RegionCode;
        this.RefreshPageByRegion(this.RegionParams.selectedObject);
        this.CostCenterItems = res[1];
        this.SubCostCenterItems = res[2];
        this.FinYearItems = res[3];
        this.RequestedPersonItems = res[4];
        this.FinYearParams.selectedObject = InvoiceObject.FinYearCode;
        if (InvoiceObject.SubCostCenterObject && InvoiceObject.SubCostCenterObject.CostCenterId) {
          this.CostCenterParams.selectedObject = InvoiceObject.SubCostCenterObject.CostCenterId;
          this.SubCostCenterParams.selectedObject = InvoiceObject.SubCostCenterObject.SubCostCenterId;
          this.RequestedPersonParams.selectedObject = InvoiceObject.RequestedPersonID;

        }

        resolve();
      });
    });
  }

  OnOpenNgSelect(Type, IsFill = true, FillResolve = null) {
    switch (Type) {
      case 'Region':
        // tslint:disable-next-line: max-line-length
        this.RegionList.GetRegionList(this.ModuleCode).subscribe(res => {
          this.RegionItems = res;
          if (IsFill) {
            if (this.InvoiceObject && this.InvoiceObject.RegionCode) {
              this.RegionParams.selectedObject = this.InvoiceObject.RegionCode;
              this.OnOpenNgSelect('CostCenter');
              this.RefreshPageByRegion(this.RegionParams.selectedObject);
            } else {
              this.RegionParams.selectedObject = this.InvoiceObject.RegionCode = this.CurrentUserSubCostCenter ?
                this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
              this.OnOpenNgSelect('CostCenter');
              this.RefreshPageByRegion(this.RegionParams.selectedObject);
            }
          }
        });
        break;
      case 'CostCenter':
        const CurrCostCenterID = this.InvoiceObject &&
          this.InvoiceObject.SubCostCenterObject &&
          this.InvoiceObject.SubCostCenterObject.CostCenterId ?
          this.InvoiceObject.SubCostCenterObject.CostCenterId : null;
        // tslint:disable-next-line: max-line-length
        this.ProductRequest.GetCostCenterByRegionAndRequestOwner(this.RegionParams.selectedObject, CurrCostCenterID, this.ModuleCode, false).subscribe(res => {
          this.CostCenterItems = res;
          if (IsFill &&
            this.InvoiceObject &&
            this.InvoiceObject.SubCostCenterObject &&
            this.InvoiceObject.SubCostCenterObject.CostCenterId) {          
            this.CostCenterParams.selectedObject = this.InvoiceObject.SubCostCenterObject.CostCenterId;
            this.OnOpenNgSelect('SubCostCenter');
          } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.CostCenterID) {
            if (!this.InvoiceObject || (this.InvoiceObject && (!this.InvoiceObject.InvoiceID || this.InvoiceObject.InvoiceID <= 0))) {
              this.CostCenterParams.selectedObject = this.CurrentUserSubCostCenter.CostCenterID;
            }
            this.OnOpenNgSelect('SubCostCenter');
          }
          if (IsFill && FillResolve) {
            FillResolve();
          }
        });
       break;
      case 'SubCostCenter':
        if (this.CostCenterParams.selectedObject) {
          this.ProductRequest.GetListByCostCenterId(this.CostCenterParams.selectedObject, this.ModuleCode, true, this.RegionParams.selectedObject,).subscribe(res => {
            this.SubCostCenterItems = res;
            if (IsFill &&
              this.InvoiceObject &&
              this.InvoiceObject.SubCostCenterObject &&
              this.InvoiceObject.SubCostCenterObject.SubCostCenterId) {
              this.SubCostCenterParams.selectedObject = this.InvoiceObject.SubCostCenterObject.SubCostCenterId;
            } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.SubCostCenterID) {
              if (!this.InvoiceObject || (this.InvoiceObject && (!this.InvoiceObject.InvoiceID || this.InvoiceObject.InvoiceID <= 0))) {
                // tslint:disable-next-line: max-line-length
                this.SubCostCenterParams.selectedObject = this.InvoiceObject.SubCostCenterID = this.CurrentUserSubCostCenter.SubCostCenterID;
              }

            }
            if (IsFill && this.RequestPersonObject && this.RequestPersonObject.SubCostCenterID) {
              this.SubCostCenterParams.selectedObject = this.RequestPersonObject.SubCostCenterID;
            }
          });
          this.OnOpenNgSelect('RequestedPerson');
          this.OnOpenNgSelect('AdministratorActor');
        }

        break;
      case 'RequestedPerson':
        this.RequestedPersonParams.selectedObject = null;
        this.RequestedPersonItems = [];
        if (this.CostCenterParams.selectedObject) {
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterPriPerson(
            this.CostCenterParams.selectedObject,
            this.SubCostCenterParams.selectedObject,
            (this.InvoiceObject && this.InvoiceObject.RequestedPersonID && IsFill ? this.InvoiceObject.RequestedPersonID : null),
            this.ModuleCode).subscribe(res => {
              res.forEach(element => {
                element.FullPersonName = element.FirstName + ' ' + element.LastName;
              });
              this.RequestedPersonItems = res;
              if (IsFill && this.InvoiceObject && this.InvoiceObject.RequestedPersonID
                && this.InvoiceObject.RequestedPersonID !== null && !isUndefined(this.InvoiceObject.RequestedPersonID)) {
                this.RequestedPersonParams.selectedObject = this.InvoiceObject.RequestedPersonID;
              } else if (IsFill && this.CurrentUserSubCostCenter && this.CurrentUserSubCostCenter.ActorID) {
                if (!this.InvoiceObject || (this.InvoiceObject && (!this.InvoiceObject.InvoiceID || this.InvoiceObject.InvoiceID <= 0))) {
                  this.RequestedPersonParams.selectedObject = this.InvoiceObject.RequestedPersonID = this.CurrentUserSubCostCenter.ActorID;
                }

                this.CurentUser = this.CurrentUserSubCostCenter.ActorID;
                this.CurrentUserSubCostCenter = null;
              }
            });
        }
        break;
      case 'FinYear':
        this.ProductRequest.GetCurrentYear().subscribe(res => { this.CurrentYear = res });
        // tslint:disable-next-line: max-line-length
        this.Workflow.GetFinYearList().subscribe(res => {
          this.FinYearItems = res;
          if (IsFill) {
            if (this.InvoiceObject && this.InvoiceObject.FinYearCode) {
              this.FinYearParams.selectedObject = this.InvoiceObject.FinYearCode;
            } else {
              this.FinYearParams.selectedObject = this.CurrentYear;
              this.onChangeFinYear(this.FinYearParams.selectedObject);
            }
          }
        });
        break;
      case 'AdministratorActor':
        if (this.CostCenterParams.selectedObject) {
          // tslint:disable-next-line: max-line-length
          this.ProductRequest.GetSubCostCenterAdministratorActorlist(
            this.CostCenterParams.selectedObject,
            this.SubCostCenterParams.selectedObject,
            (this.InvoiceObject && this.InvoiceObject.AdministratorActorID && IsFill ? this.InvoiceObject.AdministratorActorID : null)
          ).subscribe(res => {
            this.AdministratorActorItems = res;
            if (IsFill && this.InvoiceObject && this.InvoiceObject.AdministratorActorID) {
              this.AdministratorActorParams.selectedObject = this.InvoiceObject.AdministratorActorID;
            }
          });
        }
        break;
      default:
        break;
    }
  }

  onChangeRegion(RegionCode) {
    this.InvoiceObject.RegionCode = RegionCode;
    this.CostCenterParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
    this.AdministratorActorParams.selectedObject = null;
    if (this.RegionParams.selectedObject === 200) {
      this.IsMandatory = true;
    } else {
      this.IsMandatory = false;
    }
  }

  onChangeFinYear(FinYearCode) {
    this.InvoiceObject.FinYearCode = FinYearCode;
  }

  onChangeCostCenter(ACostCenterID) {
    this.SubCostCenterParams.selectedObject = null;
    this.RequestedPersonParams.selectedObject = null;
    this.AdministratorActorParams.selectedObject = null;
    let RegionCode = -1;
    let CostCenterCode = '';
    RegionCode = this.RegionParams.selectedObject;
    // tslint:disable-next-line: max-line-length
    CostCenterCode = this.CostCenterItems ? this.CostCenterItems.find(x => x.CostCenterId === ACostCenterID).CostCenterCode : '';

  }

  onSubCostCenterSelectedChange(SubCostCenterID) {
    this.RequestedPersonParams.selectedObject = null;
    this.AdministratorActorParams.selectedObject = null;
    this.InvoiceObject.SubCostCenterID = SubCostCenterID;
    this.OnOpenNgSelect('RequestedPerson' , false);
  }

  onRequestedPersonSelectedchanged(RequestedPersonID) {
    this.InvoiceObject.RequestedPersonID = RequestedPersonID;
    if (this.RequestedPersonItems && this.RequestedPersonItems.length > 0 && !this.SubCostCenterParams.selectedObject) {
      this.RequestPersonObject = this.RequestedPersonItems.find(x => x.ActorId === RequestedPersonID);
      this.OnOpenNgSelect('SubCostCenter');
    }
  }
  onActorSelectedchanged(ActorID) {
    this.InvoiceObject.ActorID = ActorID;
    this.NgSelectBankParams.selectedObject = null;
    this.NgSelectBranchParams.selectedObject = null;
    this.AccNo = '';
    if (ActorID > 0) {
    this.Common.GetActorBankAccList(ActorID).subscribe((res: any[]) => {
      if (res && res.length > 0) {
        this.OpenBank();
        this.NgSelectBankParams.selectedObject = res[0].BankID;
        this.OpenBranch();
        this.NgSelectBranchParams.selectedObject = res[0].BranchID;
        this.ActorBankAccID = res[0].ActorBankAccID;
        this.AccNo = res[0].AccNo;
        this.CityID = res[0].CityID;
        this.ShebaNo = res[0].ShebaNo;
      } else {
        this.NgSelectBankParams.selectedObject = null;
        this.NgSelectBranchParams.selectedObject = null;
        this.AccNo = null;
        this.ActorBankAccID = null;
        this.CityID = null;
        this.ShebaNo = null;
     }
    });
  }
  }

  rdoActorTypeClick(AType) {
    this.NgSelectActorParams.selectedObject = null;
    this.NgSelectBankParams.selectedObject = null;
    this.NgSelectBranchParams.selectedObject = null;
    this.AccNo = '';
    this.InvoiceObject.ActorType = AType;
    if (AType) {
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
    } else {
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
    }
  }

  FetchMoreActor(event) {
    const ResultList = [];
    this.NgSelectActorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.InvoiceObject.ActorType,
      false, false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ActorItems = ResultList;
        this.NgSelectActorParams.loading = false;
      }
      );
  }

  OpenActor() {
    const ResultList = [];
    // tslint:disable-next-line: max-line-length
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.InvoiceObject.ActorType, false, false, this.NgSelectActorParams.selectedObject).subscribe(res => {
      this.ActorItems = res.List;
      this.ActorTotalItemCount = res.TotalItemCount;
      this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }

  doActorSearch(event) {
    this.NgSelectActorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.InvoiceObject.ActorType,
      false, false).subscribe(res => {
        this.ActorItems = res.List;
        this.ActorTotalItemCount = res.TotalItemCount;
        this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectActorParams.loading = false;
      });
  }

  OnCheckBoxChange(IsContractorFill) {
    this.InvoiceObject.IsContractorFill = IsContractorFill;
  }

  OnRegisterInvoiceDateChange(ADate) {
    this.InvoiceObject.RegisterInvoiceDate = ADate.MDate;
    this.InvoiceObject.InvoiceDate = ADate.MDate;
  }

  onCellValueChanged(event) { }
  OnImportFromExcelBtnClick() { }
  RowClick(event) { }
  onSave() {
    this.CheckValidate = true;
    if ((this.RegionParams.selectedObject === 0 ? false : !this.RegionParams.selectedObject || this.RegionParams.selectedObject === null) ||
      (!this.FinYearParams.selectedObject || this.FinYearParams.selectedObject === null) ||
      (!this.CostCenterParams.selectedObject || this.CostCenterParams.selectedObject === null) ||
      (!this.SubCostCenterParams.selectedObject || this.SubCostCenterParams.selectedObject === null) ||
      (!this.RequestedPersonParams.selectedObject || this.RequestedPersonParams.selectedObject === null) ||
      (!this.InvoiceObject.Subject || this.InvoiceObject.Subject === '') ||
      (!this.NgSelectActorParams.selectedObject || this.NgSelectActorParams.selectedObject === null) ||
      // tslint:disable-next-line: max-line-length
      (!this.IsDisableRefisterField ? (!this.InvoiceObject.RegisterInvoiceCode || this.InvoiceObject.RegisterInvoiceCode === null) || (this.InvoiceObject.RegisterInvoiceDate === null) : false)
      // tslint:disable-next-line: max-line-length
      || (this.IsMandatory ? (!this.AdministratorActorParams.selectedObject || this.AdministratorActorParams.selectedObject === null) : false)
      || ((!this.NgSelectBankParams.selectedObject || this.NgSelectBankParams.selectedObject === null)
          && (this.ModuleViewTypeCode === 1 && this.IsForcedBankInfo))
      || ((!this.NgSelectBranchParams.selectedObject || this.NgSelectBranchParams.selectedObject === null)
          && (this.ModuleViewTypeCode === 1 && this.IsForcedBankInfo))
      || ((!this.AccNo || this.AccNo === null) && (this.ModuleViewTypeCode === 1 && this.IsForcedBankInfo))) {
      this.ShowMessageBoxWithOkBtn('.لطفا فیلد های ستاره دار را پر نمایید');
      return;
    }
    this.gridApi.stopEditing();
    this.InvoiceFootergridApi.stopEditing();

    const InvoiceItemList = [];
    const InvoiceFooterList = [];
    this.gridApi.forEachNode(node => {
      const InvoiceItemObj = {
        InvoiceItemID: node.data.InvoiceItemID ? node.data.InvoiceItemID : -1,
        ItemNo: node.data.ItemNo,
        QTY: parseFloat(node.data.Qty),
        // tslint:disable-next-line:radix
        TaxValue: parseFloat(node.data.TaxValue),
        // tslint:disable-next-line:max-line-length
        ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
        // tslint:disable-next-line:max-line-length
        RegisterInvoiceItemDate: node.data.ShortRegisterInvoiceItemDate ? node.data.ShortRegisterInvoiceItemDate : null,
        Price: parseFloat(node.data.Price),
        Discount: parseFloat(node.data.Discount),
        RegisterInvoiceItemCode: node.data.RegisterInvoiceItemCode ? node.data.RegisterInvoiceItemCode : null,
      };
      InvoiceItemList.push(InvoiceItemObj);
    });

    this.InvoiceFootergridApi.forEachNode(node => {
      InvoiceFooterList.push(node.data);
    });

    this.InvoiceObject.InvoiceItemList = InvoiceItemList;
    this.InvoiceObject.InvoiceFooterList = InvoiceFooterList;

    this.InvoiceObject.RegisterInvoiceDate = this.InvoiceObject.RegisterInvoiceDate ?
                                             this.CommonService.ConvertToASPDateTime(this.InvoiceObject.RegisterInvoiceDate) : null;

    const BankList = [];
    this.HaveBank = (this.NgSelectBankParams.selectedObject || this.NgSelectBankParams.selectedObject !== null)  ? false : true;
    if (this.NgSelectBankParams.selectedObject) {
      const BankObj = {
        ActorBankAccID: this.ActorBankAccID ? this.ActorBankAccID : -1,
        ActorID: this.NgSelectActorParams.selectedObject,
        BankID: this.NgSelectBankParams.selectedObject,
        BranchID: this.NgSelectBranchParams.selectedObject,
        AccNo: this.AccNo,
        CityID: this.CityID,
        ShebaNo: this.ShebaNo,
      };
      BankList.push(BankObj);
    }

    this.Invoice.SaveInvoice(this.InvoiceObject, BankList,  this.HaveBank).subscribe((InvoiceObj: InvoiceDataModel) => {
      // this.ngOnInit();
      this.InvoiceObject = InvoiceObj;
      this.InvoiceItemList = InvoiceObj.InvoiceItemList;
      this.InvoiceFooterList = InvoiceObj.InvoiceFooterList;
      this.IsDisableRefisterField = this.InvoiceObject.IsMultiInvoice;
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    });
  }

  Close() {
    if (this.IsWFShow && this.WorkListDetailRows) {
      this.Workflow.RunAfterActionMethod(this.WorkListDetailRows).subscribe();
    }
    this.Closed.emit(true);
  }

  RedioSelectedChange(event) {
    event.Owner.InvocieItemcolumnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      true,
      null).
      subscribe(res => {
        event.Owner.InvocieItemcolumnDef[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  RefreshPageByRegion(ARegionCode) {
    // tslint:disable-next-line:max-line-length
    this.currentRegionObject = this.InvoiceObject && this.InvoiceObject.RegionCode ? this.InvoiceObject.RegionCode : this.RegionItems.find(x => x.RegionCode === ARegionCode);
    if (ARegionCode === 200) {
      this.IsMandatory = true;
    } else {
      this.IsMandatory = false;
    }
    this.OnOpenNgSelect('CostCenter');
    new Promise((StartedWFResolve, reject) => {
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  SetStartedWFInfo(Resolve) {
    this.Workflow.GetStartModuleViewTypeCode(
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.WorkflowTypeCode,
      this.InvoiceObject.InvoiceID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          // tslint:disable-next-line:max-line-length
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
          if (this.IsContractRemainStartWF) {
            this.WorkFlowID = null;
          }
        }
        Resolve();
      });
  }

  FetchMoreProduct(event) {
    // event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.RegionParams.selectedObject,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        true,
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
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }

 
  FetchProductByTerm(event) {
    event.Owner.InvocieItemcolumnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionParams.selectedObject,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      true,
      null).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
      
      
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  onInvocieFooterGridReady(params: { api: any; }) {
    this.InvoiceFootergridApi = params.api;
  }

  oncellEditingStarted(event) {
    this.gridApi.forEachNode(node => {

      if (node.rowIndex === event.rowIndex) {

        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });
   

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      this.InvocieItemcolumnDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(
        0,
        this.RegionParams.selectedObject,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        true,
        event.data.ProductID).
        subscribe(res => {
          this.InvocieItemcolumnDef[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  onInvoiceFootercellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'InvoiceFooterTypeName') {
      this.Invoice.GetInvoiceFooterTypeList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'invoice-footer-type'
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
  }

  popupclosed(event) {
    this.isClicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PopUpType = '';
  }

  ViewTypeChange() {
    if (!this.ModuleViewTypeCode) { // RFC 53826
      this.ShowMessageBoxWithOkBtn('نوع نمایش فعالیت شروع گردش برای این واحد اجرایی تعریف نشده است. لطفا با راهبر تماس بگیرید.');
      return;
    }
    // if (this.CheckRegionWritable) {
    //   this.IsEditable = true;
    //   this.ArchiveIsReadOnly = true;
    //   this.WfSaveDetailsShow = this.WfDetailsShow = false;
    //   this.HaveCompleteInfo = false;
    // } else {
    //   if (this.btnConfirmName === 'عدم تایید') {
    //     this.IsEditable = false;
    //     this.IsEditConfirm = false;
    //   }
    // }

    if (this.ModuleCode === 2942) {
      switch (this.ModuleViewTypeCode) {
        case 1:
          break;

        case 2:
          this.IsGridEditable = false;
          break;

        case 3:
        case 5: // مشاهده تعهد اعتبار
          this.IsGridEditable = false;
          this.IsEditable = false;
          break;

        case 4:
          this.IsGridEditable = false;
          this.IsEditable = false;
          this.HaveAlertToFinance = true;
          this.FooterGridDevHeight = 33;
          this.FooterGridHeight = 69;
          break;

        default:
          break;
      }
    }
    if (this.CurrentModuleCode === 2948) {
      switch (this.ModuleViewTypeCode) {
        case 2:
          this.IsGridEditable = true;
          break;
        default:
          break;
      }
    }
    if (this.CurrentModuleCode === 2949) {
      switch (this.ModuleViewTypeCode) {
        case 3:
          this.IsGridEditable = false;
          this.IsEditable = false;
          this.IsDisplay = false;
          break;
        default:
          break;
      }
    }
  }


  onConfirm() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تایید درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }

    if (!this.HaveAlertToFinance || this.IsAdmin) {
      this.BtnClickedName = 'BtnConfirm';
      if (!this.IsEndFlow) {
        if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
          // if (this.ChangeDetection) {
          //   this.ShowMessageBoxWithYesNoBtn('اطلاعات درخواست انجام معامله تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
          // } else if (this.IsExpertSelected) {
          //   this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
          // } else {
          this.DOConfirm();
          //  }
        } else {
          this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
            this.InvoiceObject.InvoiceID,
            this.RegionParams.selectedObject,
            this.ModuleCode,
            0,
            this.WorkflowObjectCode,
            this.ModuleViewTypeCode,
            this.OrginalModuleCode,
            this.CartableUserID,
            this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
            .subscribe(res => {
              this.ShowMessageBoxWithOkBtn('عدم تایید درخواست انجام معامله با موفقیت انجام شد');

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

  onConfirmAndSend() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان تایید و ارسال درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if (!this.HaveAlertToFinance || this.IsAdmin) {
      this.BtnClickedName = 'ConfirmAndSend';
      // this.IsDown = false;
      // if (this.ChangeDetection) {
      //   this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
      // } else if (this.IsExpertSelected) {
      //   this.ShowMessageBoxWithYesNoBtn('اطلاعات کارشناس قرارداد تغییر کرده است، آیا می خواهید بدون ثبت اطلاعات تایید کنید؟');
      // } else {
      this.ConfirmAndSend();
      // }
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  onUnConfirmAndReturn() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان عدم تایید و بازگشت درخواست به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    if (!this.HaveAlertToFinance || this.IsAdmin) {
      // this.IsDown = false;
      // tslint:disable-next-line:no-shadowed-variable
      const promise = new Promise((resolve, reject) => {
        this.DoUnConfirm(false, resolve);
      }).then((IsDown) => {
        if (IsDown) {
          this.ObjectNo = this.InvoiceObject.RegisterInvoiceCode;
          this.ObjectID = this.InvoiceObject.InvoiceID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
            .subscribe(
              res => {

                if (res != null && res.length > 0) {
                  res.forEach(element => {
                    element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                  });
                  this.PopUpType = 'work-flow-send';
                  this.startLeftPosition = 350;
                  this.startTopPosition = 105;
                  this.HeightPercentWithMaxBtn = null;
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
          this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn('لطفا جهت تامین اعتبار به سیستم جامع مالی مراجعه نمایید');
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  DOConfirm(HasAlert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin) {
      if (this.WorkflowObjectCode === null) {
        this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
      }
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.InvoiceObject.InvoiceID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        1,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
        subscribe(res => {
          if (HasAlert) {
            this.ShowMessageBoxWithOkBtn('تایید با موفقیت انجام شد');
          }
          this.RefreshCartable.RefreshCartable();
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
          // this.IsEditable = false;
          // this.IsEditConfirm = false;
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
  // tslint:disable-next-line:no-shadowed-variable
  DoUnConfirm(alert = true, resolve = null) {
    if (!this.HaveAlertToFinance || this.IsAdmin) {
      this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
        this.InvoiceObject.InvoiceID,
        this.RegionParams.selectedObject,
        this.ModuleCode,
        0,
        this.WorkflowObjectCode,
        this.ModuleViewTypeCode,
        this.OrginalModuleCode,
        this.CartableUserID,
        this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
          if (alert) {
            this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
          }
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید';
          this.btnConfirmIcon = 'ok';
          // this.IsEditable = false;
          // this.IsEditConfirm = true;
          // if (this.ConfirmStatus.includes(21)) {
          //   this.ReadyToConfirm = 0;
          //   this.btnConfirmName = 'تایید';
          //   this.btnConfirmIcon = 'ok';
          // } else {
          //    this.HaveConfirm = false;
          // }

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
          messageStr = 'بازگشت از تایید نهایی درخواست انجام معامله با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی درخواست انجام معامله با موفقیت انجام شد';
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

  DoConfirmAndSend() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.InvoiceObject.RegisterInvoiceCode;
          this.ObjectID = this.InvoiceObject.InvoiceID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                    });
                    this.PopUpType = 'work-flow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    this.HeightPercentWithMaxBtn = null;
                    this.PopupParam = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      ModuleViewTypeCode: this.ModuleViewTypeCode,
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: Number(this.WorkflowTypeCode),
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
  OnFinalConfirm() {
    this.Cartable.UserConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      this.WorkFlowTransitionID,
      null,
      '',
      this.ObjectNo,
      this.WorkflowTypeCode,
      this.WorkflowTypeName,
      this.ObjectID,
      this.CartableUserID
    )
      .subscribe(res => {
        this.RefreshCartable.RefreshCartable();
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }
  getOutPutParam(event) {
    if (this.PopUpType === 'message-box' && this.IsEndFlow === 1 && this.BtnClickedName === 'ConfirmAndSend') {
      this.OnFinalConfirm();
    }

    if (this.PopUpType === 'message-box' && this.BtnClickedName === 'Revoke' && event === 'YES') {
      this.Revoke();
    }

    if (event && this.PopUpType === 'work-flow-send') {
      this.Close();
    }
  }

  OnClickPrintFlow() {
    let FullPersonName = { FullPersonName: '' };
    if (this.RequestedPersonItems && this.RequestedPersonParams.selectedObject) {
      FullPersonName = this.RequestedPersonItems.find(
        s => s.ActorId === this.RequestedPersonParams.selectedObject
      );
    }
    this.Report.ShowReport(null,
      null,
      this.InvoiceObject.InvoiceID,
      this.InvoiceObject.RegisterInvoiceCode,
      null,
      this.InvoiceObject.PersianRegisterInvoiceDate,
      this.InvoiceObject.Subject,
      FullPersonName ? FullPersonName.FullPersonName : '',
      null,
      null,
      this.ModuleCode,
      this.InvoiceObject.RegionCode
    );
  }

  onArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 282;
    this.startTopPosition = 11;
    this.HeightPercentWithMaxBtn = null;
    const archiveParam = {
      EntityID: this.InvoiceObject.InvoiceID,
      TypeCodeStr: 703 + '-',
      DocTypeCode: 703,
      ModuleCode: this.ModuleCode,
      HasCheck: true,
      IsReadOnly: (this.InputParam && this.InputParam.ShowSendBtn === 'YES') || (this.InputParam && this.InputParam.IsInFinishedCartable) ? true : !this.IsEditable,
      OrginalModuleCode: this.ModuleCode,
      RegionCode: this.InvoiceObject.RegionCode
    };
    this.PopupParam = archiveParam;
  }

  OnClickPrint() {
    if (this.RequestedPersonParams.selectedObject && this.RequestedPersonParams.selectedObject !== null) {
      this.Report.ShowInvoiceRep(this.InvoiceObject.InvoiceID, this.ModuleCode);
    } else {
      this.ShowMessageBoxWithOkBtn('درخواست کننده نمی تواند خالی باشد.');
    }
  }

  OnRowDataChanged(Type) {
    switch (Type) {
      case 'InvoiceItem':
        this.SetSumInvoiceItem();
        break;
      case 'InvoiceFooter':
        this.SetSumInvoiceFooter();
        break;
      default:
        break;
    }
  }

  OnRowDataUpdated(Type) {
    switch (Type) {
      case 'InvoiceItem':
        this.SetSumInvoiceItem();
        break;
      case 'InvoiceFooter':
        this.SetSumInvoiceFooter();
        break;
      default:
        break;
    }
  }

  OnFilterChanged(Type) {
    switch (Type) {
      case 'InvoiceItem':
        this.SetSumInvoiceItem();
        break;
      case 'InvoiceFooter':
        this.SetSumInvoiceFooter();
        break;
      default:
        break;
    }
  }

  SetSumInvoiceItem() {
    let SumUnitPrice = 0;
    let SumPrice = 0;
    let SumDiscount = 0;
    let SumTaxValue = 0;
    let SumFinalPrice = 0;
    let SumTotal = 0;
    let SumFooterAmount = 0;

    if (this.gridApi) {
      this.gridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.FinalPrice) {
          // tslint:disable-next-line: radix
          SumFinalPrice = SumFinalPrice + parseInt(node.data.FinalPrice.toString());
        }
        if (node.data.UnitPrice) {
          // tslint:disable-next-line: radix
          SumUnitPrice = SumUnitPrice + parseInt(node.data.UnitPrice.toString());
        }
        if (node.data.Price) {
          // tslint:disable-next-line: radix
          SumPrice = SumPrice + parseInt(node.data.Price.toString());
        }
        if (node.data.Discount) {
          // tslint:disable-next-line: radix
          SumDiscount = SumDiscount + parseInt(node.data.Discount.toString());
        }
        if (node.data.TaxValue) {
          // tslint:disable-next-line: radix
          SumTaxValue = SumTaxValue + parseInt(node.data.TaxValue.toString());
        }
      });
    }
    this.SumFinalPrice = SumFinalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumUnitPrice = SumUnitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumPrice = SumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumDiscount = SumDiscount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumTaxValue = SumTaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (this.InvoiceFootergridApi) {
      this.InvoiceFootergridApi.forEachNode(node => {
        if (node.data.Amount) {
          if (node.data.IsIncrement) {
            // tslint:disable-next-line: radix
            SumFooterAmount = SumFooterAmount + parseInt(node.data.Amount.toString());
          } else {
            // tslint:disable-next-line: radix
            SumFooterAmount = SumFooterAmount - parseInt(node.data.Amount.toString());
          }
        }
      });
    }
    // tslint:disable-next-line: max-line-length
    SumTotal = SumFinalPrice + SumFooterAmount;
    this.SumTotal = SumTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.IsForcedBankInfo = SumFinalPrice > 50000000 ? true : false;

  }

  SetSumInvoiceFooter() {
    let SumAmount = 0;
    let SumTotal = 0;

    if (this.InvoiceFootergridApi) {
      this.InvoiceFootergridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.Amount) {
          if (node.data.IsIncrement) {
            // tslint:disable-next-line: radix
            SumAmount = SumAmount + parseInt(node.data.Amount.toString());
          } else {
            // tslint:disable-next-line: radix
            SumAmount = SumAmount - parseInt(node.data.Amount.toString());
          }
        }
      });
    }

    if (SumAmount >= 0) {
      this.SumAmount = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      const Sum = Math.abs(SumAmount);
      this.SumAmount = Sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }


    // tslint:disable-next-line: max-line-length
    SumTotal = Math.round(parseFloat((this.SumFinalPrice.toString()).replace(/,/g, ''))) + SumAmount;

    this.SumTotal = SumTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  ShowUnderTakeItemClick() {
    this.contractpaydetail.GetUnderTakeItemsList(this.InvoiceObject.CostCostFactorID).subscribe(res => {
      if (res && res.length > 0) {
        this.PopUpType = 'app-show-under-take-items';
        this.isClicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = 160;
        this.startTopPosition = 50;
        this.HeightPercentWithMaxBtn = 58;
        this.PopupParam = {
          ContractPayCostFactorID: this.InvoiceObject.CostCostFactorID,
          undertakerowData: res
        };
      } else {
        this.ShowMessageBoxWithOkBtn('درخواست پرداخت انتخابی فاقد تعهد اعتبار می باشد.');
      }
    });
  }

  onAdministratorActorSelectedchanged(AdministratorActorID) {
    this.InvoiceObject.AdministratorActorID = AdministratorActorID;
  }


  onRevocationClick() {
    this.BtnClickedName = 'Revoke';
    this.ShowMessageBoxWithYesNoBtn('آیا از ابطال و غیر مجاز نمودن اطمینان دارید؟');
  }

  Revoke() {
    this.BtnClickedName ='';

    this.Invoice.InvoiceRevocation(
      this.CurrWorkFlow,
      this.WorkFlowID,
      this.InvoiceObject.InvoiceID,
      this.WorkflowTypeCode).subscribe( res => {
        if (res === 0) {
          this.InvoiceObject.IsValid = false;
          this.btnRevocationName = 'بازگشت از ابطال';
          this.btnRevocationIcon = 'ok';
          this.ShowMessageBoxWithOkBtn('ابطال درخواست انجام معامله با موفقیت انجام شد');
        } else if (res === 1) {
          this.InvoiceObject.IsValid = true;
          this.btnRevocationName = 'ابطال';
          this.btnRevocationIcon = 'revocation';
          this.ShowMessageBoxWithOkBtn('بازگشت از ابطال درخواست انجام معامله با موفقیت انجام شد');
        } else if (res === -1) {
          this.ShowMessageBoxWithOkBtn('مسیر ' + ' ' + this.btnRevocationName + ' ' + ' به درستی تعریف نشده است با راهبر تماس بگیرید');
        } else {
          this.ShowMessageBoxWithOkBtn(' امکان' + ' ' + this.btnRevocationName + ' ' + 'وجود ندارد ');
        }
      });
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  onBankSelectedchanged(ActorID) {
    this.NgSelectBranchParams.selectedObject = null;
    this.OpenBranch();
  }
  FetchMoreBank(event) {
    const ResultList = [];
    this.NgSelectBankParams.loading = true;
    this.Common.GetBankPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectActorParams.selectedObject).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.BankItems = ResultList;
        this.NgSelectBankParams.loading = false;
      }
      );
  }
  OpenBank() {
    const ResultList = [];
    this.Common.GetBankPaging('',
      '',
      1,
      30,
      this.NgSelectActorParams.selectedObject).subscribe(res => {
        this.BankItems = res.List;
        this.BankTotalItemCount = res.TotalItemCount;
        this.BankPageCount = Math.ceil(res.TotalItemCount / 30);
      });
  }
  doBankSearch(event) {
    this.NgSelectBankParams.loading = true;
    this.Common.GetBankPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectActorParams.selectedObject).subscribe(res => {
        this.BankItems = res.List,
        this.RefreshBankItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'Bank'
        });
    });
  this.NgSelectActorParams.loading = false;
  }

  FetchMoreBranch(event) {
    const ResultList = [];
    this.NgSelectBranchParams.loading = true;
    this.Common.GetBranchPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectBankParams.selectedObject,
      this.NgSelectActorParams.selectedObject
    ).subscribe(res => {
      event.CurrentItems.forEach(el => {
        ResultList.push(el);
      });
      res.List.forEach(element => {
        ResultList.push(element);
      });
      this.BranchItems = ResultList;
      this.NgSelectBranchParams.loading = false;
    }
    );
  }
  OpenBranch() {
    const ResultList = [];
    this.Common.GetBranchPaging('',
      '',
      1,
      30,
      this.NgSelectBankParams.selectedObject,
      this.NgSelectActorParams.selectedObject
    ).subscribe(res => {
      this.BranchItems = res.List;
      this.BranchTotalItemCount = res.TotalItemCount;
      this.BranchPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }
  doBranchSearch(event) {
    this.NgSelectBranchParams.loading = true;
    this.Common.GetBranchPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectBankParams.selectedObject,
      this.NgSelectActorParams.selectedObject
    ).subscribe(res => {
      this.BranchItems = res.List;
      this.BranchTotalItemCount = res.TotalItemCount;
      this.BranchPageCount = Math.ceil(res.TotalItemCount / 30);
      this.NgSelectBranchParams.loading = false;
    });
  }

  rdoIsMultiClick(IsMulti) {
    this.InvoiceObject.IsMultiInvoice = IsMulti;
    this.IsDisableRefisterField = IsMulti;
    this.SetColumnDef(IsMulti);
  }

  SetColumnDef(IsMulti = false ) {
    this.InvocieItemcolumnDef = [

      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductTypeName;

          } else {
            return '';
          }
        },
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.ProductTypeName !== params.oldValue) {
              params.data.ProductTypeName = params.newValue.ProductTypeName;
              params.data.ProductTypeCode = params.newValue.ProductTypeCode;
              params.data.ScaleName = null;
              params.data.ProductID = null;
              params.data.ProductCodeName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductCodeName = null;
            return false;
          }
        },
        width: 120,
        resizable: true,
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreProduct,
          FetchByTerm: this.FetchProductByTerm,
          RedioChangeFunc: this.RedioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductCodeName;
          } else {
            return '';
          }
        },
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductCodeName) {
            params.data.ProductCodeName = params.newValue.ProductCodeName;
            params.data.ProductID = params.newValue.ProductID;
            params.data.IsTaxValue = params.newValue.IsTaxValue;
            this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
              params.data.ScaleName = res;
            });

            return true;
          } else {
            params.data.ProductCodeName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            params.data.IsTaxValue = null;
            
            return false;
          }
        },
        width: 350,
        resizable: true
      },
      {
        headerName: 'شماره فاکتور',
        field: 'RegisterInvoiceItemCode',
        editable: () => {
          return (this.IsGridEditable && this.InvoiceObject.IsMultiInvoice) ;
        },
        hide: !IsMulti,
        HaveThousand: false,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.RegisterInvoiceItemCode = params.newValue;
            return true;
          } else {
            params.data.RegisterInvoiceItemCode = '';
            return false;
          }
        },
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ فاکتور',
        field: 'PersianRegisterInvoiceItemDate',
        editable: () => {
          return (this.IsGridEditable && this.InvoiceObject.IsMultiInvoice) ;
        },
        hide: !IsMulti,
        width: 100,
        resizable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianRegisterInvoiceItemDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.reg-inv'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortRegisterInvoiceItemDate = params.newValue.MDate;
            params.data.RegisterInvoiceItemDate = params.newValue.MDate;
            params.data.PersianRegisterInvoiceItemDate = params.newValue.SDate;
            return true;
          } else {
            params.data.RegisterInvoiceItemDate = null;
            params.data.ShortRegisterInvoiceItemDate = null;
            params.data.PersianRegisterInvoiceItemDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'مقدار',
        field: 'Qty',
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            // tslint:disable-next-line: radix
            params.data.Qty = params.newValue;
            // tslint:disable-next-line: radix
            params.data.Price = Math.round(parseFloat((!params.newValue || params.newValue == 0) ? 1 : params.newValue) * (params.data.UnitPrice));
            this.CalculateTaxValue(params);// RFC 54950
            this.CalculateFinalPrice(params);
          }
        },
        valueFormatter: function currencyFormatter(params) {
          if (params.value && !isUndefined(params.value) && params.value != null) {
            return params.value;
          } else {
            return '';
          }
        },
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'UnitPrice',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: () => {
          return this.IsGridEditable;
        },
        cellEditorFramework: NumberInputComponentComponent,
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.UnitPrice = params.newValue;
            if (((parseFloat(params.data.Qty) === null || parseFloat(params.data.Qty) === 0 || isUndefined(params.data.Qty)))) {
              params.data.Price = params.newValue;
            } else {
              params.data.Price = Math.round(parseFloat(params.data.Qty) * params.newValue);
            }
            this.CalculateTaxValue(params);
            this.CalculateFinalPrice(params);
          }
        },
      },
      {
        headerName: 'مبلغ',
        field: 'Price',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Price = params.newValue;
            if (parseFloat(params.data.Qty) === null || parseFloat(params.data.Qty) === 0 || isUndefined(params.data.Qty)) {
              params.data.UnitPrice = params.newValue;
            } else {
              params.data.UnitPrice = Math.round(parseFloat(params.newValue) / parseFloat(params.data.Qty));
            }
            this.CalculateTaxValue(params);
            this.CalculateFinalPrice(params);
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'تخفیف',
        field: 'Discount',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Discount = params.newValue;
            this.CalculateFinalPrice(params);
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'مالیات ارزش افزوده',
        field: 'TaxValue',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: () => {
          return this.IsGridEditable;
        },
        valueSetter: (params) => {
          if (!isUndefined(params.newValue)) {
            params.data.TaxValue = params.newValue;
            this.CalculateFinalPrice(params);
          }
        },
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'مبلغ نهایی',
        field: 'FinalPrice',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: false,
        cellEditorFramework: NumberInputComponentComponent,
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

}
