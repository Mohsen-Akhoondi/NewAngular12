import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute } from '@angular/router';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-product-request-provision',
  templateUrl: './product-request-provision.component.html',
  styleUrls: ['./product-request-provision.component.css']
})
export class ProductRequestProvisionComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  SumAmountStr = '';
  ColDef;
  IsCentralize = false;
  IsTaxValue = true;
  rowsData;
  ProductRequestCode;
  ProductRequestDate;
  Subject;
  ModuleViewTypeCode;
  Amount: any;
  TaxValue: any;
  FinalAmount: any;
  LetterNo;
  LetterDate;
  LetterParam = {
    CostFactorID: -1,
    RegionCode: -1,
    LetterTypeCodeList: null,
    OrganizationCode: -1,
    SaveMode: false,
  };
  GridApi: any;
  IsWFDisabled = false;
  ProductRequestObject: any;
  FirstContractOrderObject;
  NgSelectVSParams = {
    bindLabelProp: 'BgtTopicNameCode',
    bindValueProp: 'BgtTopicID',
    placeholder: '',
    MinWidth: '150px',
    DropDownMinWidth: '300px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد بودجه', HeaderName: 'BgtTopicCode', width: 35, MinTermLenght: 7, SearchOption: 'BgtTopicCode' },
        { HeaderCaption: 'نام بودجه', HeaderName: 'BgtTopicName', width: 53, MinTermLenght: 3, SearchOption: 'BgtTopicName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد بودجه', width: 35, },
        { HeaderCaption: 'نام بودجه', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  isClicked: boolean;
  PopUpType: string;
  startLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startTopPosition: number;
  ModuleCode;
  FinYearCode: any;
  SumAmount: number;
  CostFactorLetter: any;
  SelectedDocument: any;
  HaveSave = false;
  HaveUpdate = false;
  IsRequestProvision = false;
  ProvisionAmount: any;
  ProvisionNote: any;

  ProductRequestAmount = 0;
  CreditBalance = 0;
  CreditBalanceStr: any;
  SumProAmountCol: any;
  ProvisionID;
  IsEditable = true;
  NgSelectFinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '140px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'fin_year-type'
  };
  constructor(private FinYear: FinYearService,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private RefreshPersonItems: RefreshServices,
    private Automation: AutomationService,
    private User: UserSettingsService) {
    this.Amount = 0;
    this.TaxValue = 0;
    this.FinalAmount = 0;
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.ColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true,
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectFinYearParams,
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
        width: 100,
        resizable: true,
        editable: () => {
          return !this.IsCentralize && !this.IsWFDisabled;
        },
      },
      {
        headerName: 'کد بودجه',
        field: 'BgtTopicNameCode',
        editable: () => {
          return !this.IsCentralize && !this.IsWFDisabled;
        },
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreBgtTopic,
          FetchByTerm: this.FetchBgtTopicByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.BgtTopicNameCode;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'نقدی / غیر نقدی',
        field: 'IsCashName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ProductRequest.GetCreditTypeList(false),
          bindLabelProp: 'CreditTypeName',
          bindValueProp: 'CreditTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CreditTypeName;
          } else {
            return '';
          }
        },
        width: 120,
        resizable: true,
        editable: () => {
          return !this.IsCentralize && !this.IsWFDisabled;
        },
      },
      {
        headerName: 'مبلغ مصوب',
        HaveThousand: true,
        field: 'ApprovalAmount',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ  تخصیص (کمیسیون)',
        field: 'AllocateAmount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مبلغ تامین شده',
        field: 'ProvisionAmount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مانده مصوب نسبت به تامین',
        field: 'RemainApprovalAmount',
        width: 160,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'جمع مبلغ پیشنهاد شده',
        HaveThousand: true,
        field: 'FundAmount',
        width: 160,
        resizable: true,
      },
      {
        headerName: 'مبلغ پیشنهاد تامین اعتبار',
        field: 'Amount',
        width: 150,
        resizable: true,
        editable: () => {
          return !this.IsCentralize && !this.IsWFDisabled;
        },
        HaveThousand: true,
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
        headerName: 'مبلغ نهایی مصوب نسبت به تامین',
        field: 'FinalRemain',
        width: 190,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        width: 190,
        resizable: true,
        editable: () => {
          return !this.IsCentralize && !this.IsWFDisabled;
        },
      }
    ];
  }

  ngOnInit() {
    let SumProvisionAmountCol = 0;

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.rowsData = [];
    if (this.ModuleCode === 2730 && this.PopupParam.ShowOnly) {
      this.IsWFDisabled = true;
    }
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.ProductRequestCode = this.PopupParam.ProductRequestObject.ProductRequestCode;
    this.ProductRequestDate = this.PopupParam.ProductRequestObject.ShortProductRequestDate;
    this.Subject = this.PopupParam.ProductRequestObject.Subject;
    this.ProvisionAmount = this.PopupParam.ProductRequestObject.ProvisionAmount;
    this.ProvisionNote = this.PopupParam.ProductRequestObject.ProvisionNote;
    this.IsEditable = this.PopupParam.IsEditable;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.IsRequestProvision = this.PopupParam.IsRequestProvision;

    this.IsCentralize = this.ProductRequestObject.IsProvisionCentralized;
    this.IsTaxValue = this.ProductRequestObject.IsTaxValue;

    //  this.rowsData = this.ProductRequestObject.ProductRequestProvisionList;
    this.SetRowData();



    this.ProductRequestObject.ProductRequestItemList.forEach(element => {
      this.Amount += element.AmountCOEFPact;
      this.ProductRequestAmount += element.AmountCOEFPact;
    });

    this.ProductRequest.GetProvision(this.ProductRequestObject.CostFactorID).subscribe(ProvisionRes => {
      if (ProvisionRes) {
        this.ProvisionID = ProvisionRes.ProvisionID;
        ProvisionRes.ProvisionItemList.forEach(function (node) {
          if (node.Amount) {
            SumProvisionAmountCol = SumProvisionAmountCol + node.Amount;
          }
        });
      }
      // this.CreditBalance = Math.round(parseFloat((this.FinalAmount.toString()).replace(/,/g, '')) - SumProvisionAmountCol);
      this.SumProAmountCol = SumProvisionAmountCol.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // this.CreditBalanceStr = this.CreditBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.OnChTaxValueChange(this.IsTaxValue);
    });
    this.Amount = this.Amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // tslint:disable-next-line: radix
    if (!this.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }
    if (this.ModuleCode === 2773) {
      switch (this.ModuleViewTypeCode) {
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 60000:
          this.IsWFDisabled = true;
          break;
        default:
          break;
      }
    }

    // this.ProductRequestObject.ProductRequestProvisionList.forEach(function (node) {
    //   if (node.ApprovalAmount) {
    //     SumApprovalAmount = SumApprovalAmount + node.ApprovalAmount;
    //   }
    //   if (node.ProvisionAmount) {
    //     SumProvisionAmount = SumProvisionAmount + node.ProvisionAmount;
    //   }
    //   if (node.RemainApprovalAmount) {
    //     SumRemainApprovalAmount = SumRemainApprovalAmount + node.RemainApprovalAmount;
    //   }
    //   if (node.FinalRemain) {
    //     SumFinalRemain = SumFinalRemain + node.FinalRemain;
    //   }
    //   if (node.Amount) {
    //     SumAmount = SumAmount + node.Amount;
    //   }
    //   if (node.AllocateAmount) {
    //     SumAllocateAmount = SumAllocateAmount + node.AllocateAmount;
    //   }
    // });

    // this.SumAmountStr = '   مبلغ مصوب  :  ' + SumApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    //   '   مبلغ تامین شده  :  ' + SumProvisionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    //   '   مبلغ  تخصیص  :  ' + SumAllocateAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    //   '   مبلغ مصوب نسبت به تامین :  ' + SumRemainApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    //   '   مبلغ تامین  :  ' + SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    //   '   مبلغ نهایی مصوب  :  ' + SumFinalRemain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    this.OnChCentralizeChange(this.IsCentralize);
    // this.OnChTaxValueChange(this.IsTaxValue);


    // tslint:disable-next-line: radix

    // this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
    //   res.forEach(node => {
    //     switch (node.OperationCode) {
    //       case 7:
    //         this.HaveSave = true;
    //         break;
    //       case 16:
    //         this.HaveUpdate = true;
    //         break;
    //     }
    //   });
    // }); عدم کنترل برای گردش
  }

  OnChCentralizeChange(event) {
    const LetterTypeCodeList = [];
    LetterTypeCodeList.push(17);
    this.IsCentralize = event;
    this.LetterParam = {
      CostFactorID: this.ProductRequestObject.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      LetterTypeCodeList: LetterTypeCodeList,
      OrganizationCode: this.ProductRequestObject.OrganizationCode,
      SaveMode: false,
    };
  }

  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
  }
  OnChTaxValueChange(event) {

    this.IsTaxValue = event;
    if (this.IsTaxValue) {
      // tslint:disable-next-line: radix
      this.TaxValue = Math.round(parseFloat((this.Amount.toString()).replace(/,/g, '')) * 0.09);
      this.TaxValue = this.TaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      this.TaxValue = 0;
    }
    // tslint:disable-next-line: radix
    this.FinalAmount = Math.round(parseFloat(this.Amount.toString().replace(/,/g, ''))) +
      Math.round(parseFloat(this.TaxValue.toString().replace(/,/g, '')));
    this.FinalAmount = this.FinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // tslint:disable-next-line: max-line-length
    this.CreditBalance = Math.round(parseFloat((this.FinalAmount.toString()).replace(/,/g, '')) - parseFloat((this.SumProAmountCol.toString()).replace(/,/g, ''))); // نحوه محاسبه صحیح است. برای تغییر با آقای آخوندی و یا مهندس حسینی هماهنگ کنید.
    this.CreditBalanceStr = this.CreditBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onSave() {

    if (this.ModuleViewTypeCode !== 6) {
      this.GridApi.stopEditing();
    }

    const ProvisionList = [];
    let ItemNo = 0;
    this.ProductRequestObject.IsTaxValue = this.IsTaxValue;
    this.ProductRequestObject.IsProvisionCentralized = this.IsCentralize;
    this.ProductRequestObject.ProvisionNote = this.ProvisionNote;
    let FirstContractOrderItemsAmount = 0;
    // tslint:disable-next-line:max-line-length
    if (this.ProductRequestObject.RelatedContractID) {
      // tslint:disable-next-line:max-line-length
      if (this.ProductRequestObject.ContractObject.ContractOrderList != null && this.ProductRequestObject.ContractObject.ContractOrderList.Count > 0) {
        this.FirstContractOrderObject = this.ProductRequestObject.ContractObject.ContractOrderList[0];
        this.FirstContractOrderObject.ContractOrderItemList.forEach(element => {
          // tslint:disable-next-line:radix
          FirstContractOrderItemsAmount += element.Qty * element.Amount;
        });
        const Extended = this.ProductRequestAmount - FirstContractOrderItemsAmount;
        // tslint:disable-next-line:radix
        if (this.ModuleViewTypeCode !== 6 && (this.SumAmount > Extended)) {
          this.ShowMessageBoxWithOkBtn('جمع مبلغ پیشنهاد تامین باید کمتر از مانده مبلغ الحاقیه باشد.');
          return;
        }
        if (this.ModuleViewTypeCode === 6 && this.ProvisionAmount > Extended) {
          this.ShowMessageBoxWithOkBtn('مبلغ درخواست تامین اعتبار نمی تواند از مبلغ درخواست بیشتر باشد');
          return;
        }
      }
    } else {
      const MyAmount = parseFloat(this.FinalAmount.toString().replace(/,/g, ''));
      if (this.ModuleViewTypeCode !== 6 && this.SumAmount > MyAmount) {
        this.ShowMessageBoxWithOkBtn('جمع مبلغ پیشنهاد تامین باید کمتر از جمع کل باشد.');
        return;
      }
      if (this.ModuleViewTypeCode === 6 && this.ProvisionAmount > this.ProductRequestAmount) {
        this.ShowMessageBoxWithOkBtn('مبلغ درخواست تامین اعتبار نمی تواند از مبلغ درخواست بیشتر باشد');
        return;
      }
    }

    // this.ProvisionAmount : مبلغ تامین که در نوع نمایش 6 تامین مانده اعتبار باز است
    if (this.ProductRequestObject.ProvisionContractID) { // 64431
      if (this.ProductRequestObject.ContractObject != null && !this.ProductRequestObject.ContractObject.Adjustment) { // RFC 60991
        if (this.ProvisionAmount > this.CreditBalance) {
          this.ShowMessageBoxWithOkBtn('مبلغ درخواست تامین اعتبار نمی تواند از سقف مجاز تامین بیشتر باشد.');
          return;
        }
      }
    }

    this.ProductRequestObject.ProvisionAmount = this.ProvisionAmount;
    if (this.ModuleViewTypeCode === 114) { // RFC 55085 + هماهنگی با خ احمدی + 54498
      let Flage = 0; // RFC = 54498
      this.GridApi.forEachNode(node => {
        if (node.data.FundAmount && node.data.ApprovalAmount && (node.data.FundAmount > node.data.ApprovalAmount)) {
          Flage = 1;
        }
      });
      if (Flage === 1) {
        this.ShowMessageBoxWithOkBtn('جمع مبلغ پیشنهاد شده نمی تواند از مبلغ مصوب بیشتر باشد');
        return;
      }
    }

    if (this.ModuleViewTypeCode !== 6) {
      this.GridApi.forEachNode(node => {
        const ProvisionObj = {
          ProductRequestProvisionID: node.data.ProductRequestProvisionID ? node.data.ProductRequestProvisionID : -1,
          ItemNo: ++ItemNo,
          // tslint:disable-next-line:max-line-length
          FinYearCode: node.data.FinYearCode && node.data.FinYearCode.FinYearCode ? node.data.FinYearCode.FinYearCode : (node.data.FinYearCode ? node.data.FinYearCode : -1),
          // tslint:disable-next-line:max-line-length
          BgtTopicID: node.data.BgtTopicNameCode && node.data.BgtTopicNameCode.BgtTopicID ? node.data.BgtTopicNameCode.BgtTopicID : (node.data.BgtTopicID ? node.data.BgtTopicID : -1),
          IsCash: node.data.IsCashName && node.data.IsCashName.CreditTypeCode ? true : (node.data.IsCash ? true : false),
          Amount: node.data.Amount,
          Note: node.data.Note
        };
        ProvisionList.push(ProvisionObj);
      });
    }

    if (!this.IsTaxValue && this.PopupParam.OrginalModuleCode === 2793) { // RFC 61327
      // tslint:disable-next-line: max-line-length
      if (this.ProductRequestObject.ContractObject != null && !this.ProductRequestObject.ContractObject.Adjustment && this.CreditBalance <= 0) { // RFC 61208
        this.ShowMessageBoxWithOkBtn('مانده تامین اعتبار کوچکتر مساوی صفر است و تعدیل ندارد');
        return;
      }
    }

    this.ProductRequest.SaveProductRequestProvision(
      this.ModuleCode,
      this.ProductRequestObject,
      ProvisionList,
      this.CostFactorLetter ? this.CostFactorLetter : null,
      this.SelectedDocument ? this.SelectedDocument : null,
      this.PopupParam.OrginalModuleCode).subscribe(res => {
        this.ProductRequestObject = res;
        this.SetRowData();

        this.PopupOutPut.emit(this.ProductRequestObject);
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.isClicked = true;
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          }
        });
  }

  onGridReady(params) {
    this.GridApi = params.api;
  }

  onCellValueChanged(event) {
    let FinYearCode = -1;
    let BgtTopicID = -1;
    let IsCash = -1;
    let itemsToUpdate = [];
    if (event.newValue && event.colDef &&
      (event.colDef.field === 'FinYearCode' ||
        event.colDef.field === 'BgtTopicID' ||
        event.colDef.field === 'IsCashName')) {

      itemsToUpdate = [];
      this.GridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {

          if (node.data.FinYearCode) {
            // tslint:disable-next-line:max-line-length
            FinYearCode = node.data.FinYearCode.FinYearCode ? node.data.FinYearCode.FinYearCode : (node.data.FinYearCode ? node.data.FinYearCode : -1);
            node.data.FinYearCode = FinYearCode;
          }

          if (node.data.selectedObject) {
            BgtTopicID = node.data.selectedObject;
          } else if (node.data.BgtTopicNameCode) {
            BgtTopicID = node.data.BgtTopicNameCode && node.data.BgtTopicNameCode.BgtTopicID ? node.data.BgtTopicNameCode.BgtTopicID : -1;
          } else if (node.data.BgtTopicID) {
            BgtTopicID = node.data.BgtTopicID;
          }
          node.data.BgtTopicID = BgtTopicID;

          if (node.data.IsCashName) {
            IsCash = node.data.IsCashName.CreditTypeCode ? node.data.IsCashName.CreditTypeCode : (node.data.IsCash ? 1 : 0);
          }


          if (event.colDef.field === 'FinYearCode') {
            FinYearCode = event.newValue.FinYearCode;
            node.data.FinYearCode = FinYearCode;
          }

          if (event.colDef.field === 'IsCashName') {
            IsCash = event.newValue.CreditTypeCode;
          }

          if (FinYearCode !== -1 && BgtTopicID !== -1 && IsCash !== -1) {
            this.ProductRequest.GetApprovalAmount(this.ProductRequestObject.RegionCode,
              this.ProductRequestObject.UnitPatternID,
              FinYearCode,
              BgtTopicID,
              IsCash,
              this.ProvisionID
            ).subscribe(res => {
              node.data.ApprovalAmount = res.ApprovalAmount;
              node.data.ProvisionAmount = res.ProvisionAmount;
              node.data.RemainApprovalAmount = res.RemainApprovalAmount;
              // tslint:disable-next-line:max-line-length
              node.data.FinalRemain = node.data.Amount && node.data.Amount !== 0 ? res.RemainApprovalAmount - node.data.Amount : res.RemainApprovalAmount;
              node.data.FundAmount = res.FundAmount;
              itemsToUpdate.push(node.data);
              this.GridApi.updateRowData({ update: itemsToUpdate });
            }
            );
          }
        }
      });
    }

    if (event.newValue && event.colDef &&
      event.colDef.field === 'Amount') {
      itemsToUpdate = [];
      this.GridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.Amount = event.newValue;
          node.data.FinalRemain = node.data.RemainApprovalAmount - node.data.Amount;
          itemsToUpdate.push(node.data);
        }
      });
      this.GridApi.updateRowData({ update: itemsToUpdate });
    }

  }


  Close() {
    this.Closed.emit(true);
  }

  OnLetterDateChange(ADate) {
    this.LetterDate = ADate.MDate;
  }

  FetchMoreBgtTopic(event) {
    event.Owner.ColDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetBgtTopicPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        event.Owner.FinYearCode,
        event.Owner.ProductRequestObject.RegionCode, event.Owner.BgtTopicID).subscribe(res => {
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
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchBgtTopicByTerm(event) {
    event.Owner.ColDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetBgtTopicPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      event.Owner.FinYearCode,
      event.Owner.ProductRequestObject.RegionCode, event.Owner.BgtTopicID).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  onBgtTopiccellEditingStarted(event) {
    this.GridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.FinYearCode = node.data.FinYearCode && node.data.FinYearCode.FinYearCode
          ? node.data.FinYearCode.FinYearCode
          : node.data.FinYearCode ? node.data.FinYearCode : 0;
      }
    });

    if (event.colDef && event.colDef.field === 'BgtTopicNameCode') {
      this.ColDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetBgtTopicPaging(1,
        30,
        '',
        null,
        event.data.FinYearCode,
        this.ProductRequestObject.RegionCode,
        null).subscribe(res => {
          this.ColDef[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }

    if (event.colDef && event.colDef.field === 'FinYearCode') {
      this.FinYear.GetFinYearList(false, this.ProductRequestObject.RegionCode, true).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'fin_year-type'
        });
      });
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  SetSumFinalAmount() {
    let SumApprovalAmount = 0;
    let SumProvisionAmount = 0;
    let SumRemainApprovalAmount = 0;
    let SumFinalRemain = 0;
    let SumAmount = 0;
    if (this.GridApi) {
      this.GridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.ApprovalAmount) {
          SumApprovalAmount = SumApprovalAmount + node.data.ApprovalAmount;
        }
        if (node.data.ProvisionAmount) {
          SumProvisionAmount = SumProvisionAmount + node.data.ProvisionAmount;
        }
        if (node.data.RemainApprovalAmount) {
          SumRemainApprovalAmount = SumRemainApprovalAmount + node.data.RemainApprovalAmount;
        }
        if (node.data.FinalRemain) {
          SumFinalRemain = SumFinalRemain + node.data.FinalRemain;
        }
        if (node.data.Amount) {
          // tslint:disable-next-line:radix
          SumAmount = SumAmount + parseInt(node.data.Amount);
        }
      });

      this.SumAmountStr = '  مبلغ مصوب  : ' + SumApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ تامین شده  : ' + SumProvisionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ مصوب نسبت به تامین : ' + SumRemainApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ تامین  : ' + SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ نهایی مصوب  : ' + SumFinalRemain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    this.SumAmount = SumAmount;

  }

  OnRowDataChanged() {
    this.SetSumFinalAmount();
  }

  OnRowDataUpdated() {
    this.SetSumFinalAmount();
  }

  OnFilterChanged() {
    this.SetSumFinalAmount();
  }

  GetOutPutParam(event) {
    if (event.PopUpType && event.PopUpType === 'app-automation') {
      const cfl = {
        CostFactorID: this.ProductRequestObject.CostFactorID,
        LetterTypeCode: 17,
        OrganizationCode: this.ProductRequestObject.OrganizationCode,
        RegionCode: this.ProductRequestObject.RegionCode
      };
      this.CostFactorLetter = cfl;
      const sd = {
        DocumentId: event.DocumentId,
        DocumentLetterDate: event.DocumentLetterDate,
        DocumentSubject: event.DocumentSubject,
        FolID: event.FolID,
        OrgID: event.OrgID,
        PersonelID: event.PersonelID,
        RegisterLetterDate: event.RegisterLetterDate,
        RegisterLetterNo: event.RegisterLetterNo,
        SenID: event.SenID
      };
      this.SelectedDocument = sd;
      // this.Automation.SaveLetter(this.CostFactorLetter, this.SelectedDocument)
      // .subscribe(res => {
      //   this.ShowMessageBoxWithOkBtn('اتصال نامه با موفقیت انجام شد');
      // },
      //   err => {
      //     this.ShowMessageBoxWithOkBtn('خطا در اتصال نامه ');
      //   });
    }

  }

  SetRowData() {
    let SumApprovalAmount = 0;
    let SumProvisionAmount = 0;
    let SumRemainApprovalAmount = 0;
    let SumFinalRemain = 0;
    let SumAmount = 0;
    let SumAllocateAmount = 0;

    this.ProductRequest.GetProductRequestProvisionList(this.ProductRequestObject.CostFactorID, true).subscribe(res => {
      this.rowsData = res;
      res.forEach(function (node) {
        if (node.ApprovalAmount) {
          SumApprovalAmount = SumApprovalAmount + node.ApprovalAmount;
        }
        if (node.ProvisionAmount) {
          SumProvisionAmount = SumProvisionAmount + node.ProvisionAmount;
        }
        if (node.RemainApprovalAmount) {
          SumRemainApprovalAmount = SumRemainApprovalAmount + node.RemainApprovalAmount;
        }
        if (node.FinalRemain) {
          SumFinalRemain = SumFinalRemain + node.FinalRemain;
        }
        if (node.Amount) {
          SumAmount = SumAmount + node.Amount;
        }
        if (node.AllocateAmount) {
          SumAllocateAmount = SumAllocateAmount + node.AllocateAmount;
        }
      });

      this.SumAmountStr = '   مبلغ مصوب  :  ' + SumApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '   مبلغ تامین شده  :  ' + SumProvisionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '   مبلغ  تخصیص  :  ' + SumAllocateAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '   مبلغ مصوب نسبت به تامین :  ' + SumRemainApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '   مبلغ تامین  :  ' + SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '   مبلغ نهایی مصوب  :  ' + SumFinalRemain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    });
  }
}
