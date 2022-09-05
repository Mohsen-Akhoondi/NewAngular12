import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-contract-on-flow',
  templateUrl: './create-contract-on-flow.component.html',
  styleUrls: ['./create-contract-on-flow.component.css']
})

export class CreateContractOnFlowComponent implements OnInit {

  @Output() ProductRequestSuggestionClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupParam;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  HaveHeader;
  isClicked = false;
  btnclicked: boolean;
  startToptPosition: number;
  HaveMaxBtn;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  CheckValidate;
  ProductRequestObject;
  PopUpType;
  startLeftPosition;
  startTopPosition;
  WorkStartDate;
  WarrantyDate;
  StartType = 2;
  AmountType = true;
  IsSecret = false;
  IsTaxValue = false;
  ModuleCode;
  ContractLetterDate;
  ContractLetterNo = null;
  ContractSignItems;
  ContractSignParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    DropDownMinWidth: null,
    type: 'PR-contract-sign',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'PersonName', width: 53, MinTermLenght: 3, SearchOption: 'PersonName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractStyleItems;
  ContractStyleParams = {
    bindLabelProp: 'none',
    bindValueProp: 'noneID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  PRContractObject;
  SumFinalAmount: any;
  ModuleViewTypeCode: number;
  HasContractor = false;
  HasContractStyle = false;
  LetterDateStr = 'تاريخ';
  LetterNoStr = 'شماره';
  SignerStr = 'امضا کنندگان';
  SumProposalName = 'مبلغ پیشنهادی برنده';
  Disabled = false;
  StartDate;
  EndDate;
  ProductRequestTypeCode;
  disabledLetterDate = false;
  IsException = false;
  DisableDate = false;
  DisableEndDate = true;
  SumProposalItemPrice: any;
  IsNew: any;
  SumFinalAmountStr: any;
  constructor(private ProductRequest: ProductRequestService,
    private ContractList: ContractListService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.PRContractObject = this.PopupParam.ProductRequestObject.ContractObject;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.SumFinalAmount = this.PopupParam.SumFinalAmount;
    this.IsNew = this.PopupParam.IsNew;

    if (this.PopupParam.ModuleViewTypeCode === 800) {
      this.ProductRequestObject.ContractTypeCode = 15;
    }

    if (this.IsNew) {
      this.SumProposalName = 'مبلغ پیشنهادی برنده';
      this.SumFinalAmountStr = this.ProductRequestObject.WinnerProposalObject ?
        this.ProductRequestObject.WinnerProposalObject.SumProposalItemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
    } else {
      this.SumProposalName = 'مبلغ کل قرارداد';
      this.SumFinalAmountStr = this.PopupParam.SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    this.AmountType = this.ProductRequestObject.IsFindCost;
    this.StartType = this.ProductRequestObject.StartTypeCode;
    this.WorkStartDate = this.ProductRequestObject.ActualStartDateString;
    this.ProductRequestTypeCode = this.ProductRequestObject.ProductRequestTypeCode;
    if (this.PRContractObject) {
      if (this.ProductRequestObject.RelatedContractID === null) { // RFC = 54050
        this.ContractLetterDate = this.PRContractObject.ShortLetterDate;
        this.StartDate = this.PRContractObject.FromContractDateString;
        this.EndDate = this.PRContractObject.ToContractDateString;
        this.ContractLetterNo = this.PRContractObject.LetterNo;
        this.WarrantyDate = this.PRContractObject.WarrantyDateString;
        if (this.PRContractObject.ContractSatusCode === 2) {
          this.Disabled = true;
        }
      } else {

        this.DisableDate = true;
        this.ContractList.GetOrderDate(this.ProductRequestObject.CostFactorID).subscribe(res => {

          if (res) {
            this.ContractLetterDate = res.ShortOrderDate;
            this.ContractLetterNo = res.LetterCode;
            this.StartDate = res.ShortMinStartDate;
            this.EndDate = res.ShortMaxEndDate;
          }
        });
      }
      if (this.PRContractObject.ContractSatusCode === 1 && this.PopupParam.OrginalModuleCode == 2824) {
        this.DisableEndDate = false;
      }

    }
    this.onSignersOpen(1);
    if (this.ModuleViewTypeCode === 21) {
      this.HasContractor = false;
      this.HasContractStyle = false;
    }

    if (this.ModuleViewTypeCode === 44) {
      this.HasContractor = false;
      this.HasContractStyle = true;
      this.LetterDateStr = 'تاريخ انعقاد قرارداد';
      this.LetterNoStr = 'شماره قرارداد';
    }
    if (this.ModuleViewTypeCode === 52
      || this.ModuleViewTypeCode === 174) {
      this.HasContractor = false;
      this.HasContractStyle = false;
      this.LetterDateStr = 'تاريخ انعقاد قرارداد';
      this.LetterNoStr = 'شماره قرارداد';
    }

    if (this.ModuleViewTypeCode === 66) {
      this.HasContractor = false;
      this.HasContractStyle = false;
      this.LetterDateStr = 'تاريخ الحاقيه';
      this.LetterNoStr = 'شماره الحاقيه';
      this.SignerStr = 'امضا کنندگان الحاقيه';
    }
    if ((this.ModuleViewTypeCode === 21
      || this.ModuleViewTypeCode === 52
      || this.ModuleViewTypeCode === 174) // RFC 52153
      && this.ProductRequestObject.RegionCode === 200 && this.PopupParam.IsCost
      && this.PopupParam.OrginalModuleCode === 2730) {
      this.ShowMessageBoxWithOkBtn('لطفا اطلاعات قرارداد متقابل، در تب قراردادهاي مرتبط در فرم تکميل اطلاعات بررسي شود.');
      this.Disabled = false;
    }
    if ((this.ModuleViewTypeCode === 200000 || this.ModuleViewTypeCode === 300000) &&
      this.PRContractObject.ContractSatusCode !== 1) { // RFC 55024
      this.Disabled = true;
    }
    if (this.ModuleViewTypeCode === 222) {
      this.Disabled = true;
      this.disabledLetterDate = true;
    }
    if (this.ProductRequestObject.WinnerProposalObject) { // RFC 61950
      this.SumProposalItemPrice = this.ProductRequestObject.WinnerProposalObject.SumProposalItemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    if (this.ModuleViewTypeCode === 800) {
      this.DisableEndDate = false;
    }
  }

  onClose() {
    this.ProductRequestSuggestionClosed.emit(true);
  }

  onSave() {
    this.FullSaveCostContractWithOrder();
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 470;
    this.startTopPosition = 240;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 157;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }


  MessageBoxAction(ActionResult) {
    this.isClicked = false;
    this.PopUpType = '';
  }

  getOutPutParam(event) {
    if (this.PopUpType === 'product-request-coef') {
      this.ProductRequestObject = event;
    }
  }

  popupclosed() {
    this.isClicked = false;
    this.HaveMaxBtn = false;

  }

  // rdoAmountClick(Type) {
  //   this.AmountType = Type;

  // }

  // OnWorkStartDateChange(ADate) {
  //   this.WorkStartDate = ADate.MDate;

  // }

  // OnWarrantyDateChange(ADate) {
  //   this.WarrantyDate = ADate.MDate;

  // }
  // rdoStartTypeClick(Type) {
  //   this.StartType = Type;
  // }

  OnChSecretChange(event) {
    this.IsSecret = event;
  }

  OnChTaxvalueChange(event) {
    this.IsTaxValue = event;

  }

  OnContractLetterDateChange(ADate) {
    this.ContractLetterDate = ADate.MDate;
  }
  OnContractStartDateChange(ADate) {
      this.StartDate = ADate.MDate;
      if (this.StartDate && this.ProductRequestObject && this.ProductRequestObject.RelatedContractID === null && this.ModuleViewTypeCode != 800) {
        // tslint:disable-next-line: max-line-length   
        this.ContractList.GetEndDateByDuration(this.StartDate, this.ProductRequestObject.DurationDay, this.ProductRequestObject.DurationMonth, this.ProductRequestObject.DurationYear).subscribe(res => {
          this.EndDate = res;
        });     
    }
  }
  OnContractEndDateChange(ADate) {
    this.EndDate = ADate.MDate;
  }
  FetchMoreSigners(event) {
    this.ContractSignParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
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
        type: 'PR-contract-sign'
      });
    });
  }

  doSignersSearch(event) {
    this.ContractSignParams.loading = true;
    this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'PR-contract-sign'
      });
    });
  }

  onSignersOpen(type = 0) {
    const ResList = [];
    if (this.PRContractObject && this.PRContractObject.ContractSignList) {
      this.PRContractObject.ContractSignList.forEach(item => {
        const RowItem = item.ActorID;
        ResList.push(RowItem);
      });
    }
    if (this.ProductRequestObject.RegionCode === 222) { // RFC 59122
      this.ContractSignParams.bindValueProp = 'ActorID'; // RFC 59935
      this.ProductRequest.GetContractSignerList(this.ProductRequestObject.RegionCode,
        this.ContractLetterDate ? this.ContractLetterDate : this.ProductRequestObject.ShortProductRequestDate, this.ProductRequestObject.CostFactorID,
        this.ProductRequestObject.ContractID).subscribe(res => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'PR-contract-sign'
          });
          if (type === 1 &&
            this.PRContractObject &&
            this.PRContractObject.ContractSignList &&
            this.PRContractObject.ContractSignList.length > 0) {
            let ActorIDs = null;
            ActorIDs = [];
            this.PRContractObject.ContractSignList.forEach(item => {
              ActorIDs.push(item.ActorID);
            });
            this.ContractSignParams.selectedObject = ActorIDs;
          }
        });
    } else {
      this.Actor.GetPersonPagingByActorIdList(1, 30, null, null, ResList).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'PR-contract-sign'
        });
        if (type === 1 &&
          this.PRContractObject &&
          this.PRContractObject.ContractSignList &&
          this.PRContractObject.ContractSignList.length > 0) {
          let ActorIDs = null;
          ActorIDs = [];
          this.PRContractObject.ContractSignList.forEach(item => {
            ActorIDs.push(item.ActorID);
          });
          this.ContractSignParams.selectedObject = ActorIDs;
        }
      });
    }
  }

  onContractStyleOpen(type = 0) {

  }

  FullSaveCostContractWithOrder(IsCheckException = false) {
    // tslint:disable-next-line:max-line-length
    const CheckExceptions = (this.PopupParam.OrginalModuleCode === 2793 || this.PopupParam.OrginalModuleCode === 2824) && this.PopupParam.IsAdmin && !IsCheckException;
    let StrExceptions = '';
    // tslint:disable-next-line: max-line-length
    if (((!this.ProductRequestObject.RelatedContractID && this.StartDate === null) || this.ContractLetterDate === null || this.ContractLetterNo === null || this.ContractSignParams.selectedObject === null)) {
      // کنترل خالي نبودن شماره و تاريخ انعقاد در تمامي حالات RFC 53536
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا تاريخ شروع قرارداد و تاريخ و شماره قراداد/الحاقيه و امضا کنندگان را وارد نماييد');
      return;
    }
    const IsLeavingFormality = this.ProductRequestObject.DealMethodCode === 4 ||
      this.ProductRequestObject.DealMethodCode === 7 ||
      this.ProductRequestObject.DealMethodCode === 8 ||
      this.ProductRequestObject.DealMethodCode === 9;

    if ((!IsLeavingFormality && (this.ProductRequestObject.DealTypeCode !== null && this.ProductRequestObject.DealTypeCode !== 1))
      && !this.ProductRequestObject.RelatedContractID && !this.ProductRequestObject.WinnerProposalObject) {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا برنده را مشخص کنيد');
      return;
    }
    // tslint:disable-next-line: max-line-length
    if ((!this.ProductRequestObject.RelatedContractID && this.StartDate < this.ContractLetterDate) && (this.PopupParam.RegionCode > 0 && this.PopupParam.RegionCode <= 22)) { // RFC 56636 - 56876
      this.ShowMessageBoxWithOkBtn('تاريخ انعقاد قرارداد بايد کوچکتر يا مساوي تاريخ شروع قرارداد باشد');
      return;
    }
    if (!IsLeavingFormality && !this.ProductRequestObject.RelatedContractID &&
      this.ProductRequestObject.WinnerProposalObject &&
      (!this.ProductRequestObject.WinnerProposalObject.ProposalItemList ||
        this.ProductRequestObject.WinnerProposalObject.ProposalItemList.length <= 0)) {
      this.ShowMessageBoxWithOkBtn('پيشنهادي براي برنده درج نشده است');
      return;
    }

    if (IsLeavingFormality &&
      (!this.ProductRequestObject.RequestSupplierList ||
        this.ProductRequestObject.RequestSupplierList.length <= 0 ||
        !this.ProductRequestObject.RequestSupplierList[0].ActorID)) {
      this.ShowMessageBoxWithOkBtn('طرف قرارداد براي درخواست ثبت نشده است . امکان انعقاد قرارداد وجود ندارد.');
      return;
    }

    if (this.ProductRequestObject.WinnerProposalObject) {
      this.SumFinalAmount = 0;
      this.ProductRequestObject.WinnerProposalObject.ProposalItemList.forEach((node) => {
        if (node.FinalAmount) {
          this.SumFinalAmount = this.SumFinalAmount + parseFloat(node.FinalAmount);
        }
      });
    }

    if (!this.ProductRequestObject.RelatedContractID && this.PRContractObject) {
      this.PRContractObject.RegionCode = this.ProductRequestObject.RegionCode;
      this.PRContractObject.FinYearCode = -1;
      this.PRContractObject.ProductRequestID = this.ProductRequestObject.CostFactorID;
      this.PRContractObject.FromContractDate = this.StartDate;
      this.PRContractObject.ToContractDate = this.EndDate;
      this.PRContractObject.ContractTypeCode = this.ProductRequestObject.ContractTypeCode;
      this.PRContractObject.ContractSatusCode = 1;
      this.PRContractObject.EstimationDay = this.ProductRequestObject.DurationDay;
      this.PRContractObject.EstimationMonth = this.ProductRequestObject.DurationMonth;
      this.PRContractObject.EstimationYear = this.ProductRequestObject.DurationYear;
      this.PRContractObject.SubCostCenterId = this.ProductRequestObject.ContractStackHolderID;
      this.PRContractObject.IsTaxValue = false;
      // tslint:disable-next-line:max-line-length
      this.PRContractObject.ContractorId = IsLeavingFormality || (this.ProductRequestObject.DealTypeCode !== null && this.ProductRequestObject.DealTypeCode === 1) ? (this.ProductRequestObject.RequestSupplierList && this.ProductRequestObject.RequestSupplierList.length > 0 ? this.ProductRequestObject.RequestSupplierList[0].ActorID : null)
        : (this.ProductRequestObject.WinnerProposalObject ? this.ProductRequestObject.WinnerProposalObject.ActorID : null);
      this.PRContractObject.Subject = this.ProductRequestObject.Subject;
      this.PRContractObject.ContractAmount = this.SumFinalAmount;
      this.PRContractObject.LetterNo = this.ContractLetterNo;
      this.PRContractObject.LetterDate = this.ContractLetterDate;
      this.PRContractObject.StartTypeCode = this.StartType;
      this.PRContractObject.IsFindCost = this.AmountType;
      this.PRContractObject.IsSecret = this.IsSecret;
      this.PRContractObject.ActualStartDate = this.WorkStartDate;
      this.PRContractObject.WarrantyDate = this.WarrantyDate;
      this.PRContractObject.FromContractDate = this.StartDate;
      this.PRContractObject.ToContractDate = this.EndDate;
    }

    if (!this.ProductRequestObject.RelatedContractID && !this.PRContractObject) {
      if (!this.ProductRequestObject.ContractTypeCode) {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا اطلاعات قرارداد را تکميل کنيد');
        return;
      }

      if ((!IsLeavingFormality && (this.ProductRequestObject.DealTypeCode !== null && this.ProductRequestObject.DealTypeCode !== 1))
        && !this.ProductRequestObject.WinnerProposalObject) {
        this.ShowMessageBoxWithOkBtn('خواهشمند است برنده قرارداد را تعيين کنيد.');
        return;
      }

      this.PRContractObject = {
        ContractId: -1,
        CostFactorId: -1,
        ProductRequestID: this.ProductRequestObject.CostFactorID,
        RegionCode: this.ProductRequestObject.RegionCode,
        FinYearCode: -1,
        FromContractDate: this.StartDate,
        ToContractDate: this.EndDate,
        ContractTypeCode: this.ProductRequestObject.ContractTypeCode,
        ContractSatusCode: 1,
        EstimationDay: this.ProductRequestObject.DurationDay,
        EstimationMonth: this.ProductRequestObject.DurationMonth,
        EstimationYear: this.ProductRequestObject.DurationYear,
        SubCostCenterId: this.ProductRequestObject.ContractStackHolderID,
        IsTaxValue: false,
        // tslint:disable-next-line: max-line-length
        ContractorId: IsLeavingFormality || (this.ProductRequestObject.DealTypeCode !== null && this.ProductRequestObject.DealTypeCode === 1) ? (this.ProductRequestObject.RequestSupplierList && this.ProductRequestObject.RequestSupplierList.length > 0 ? this.ProductRequestObject.RequestSupplierList[0].ActorID : null)
          : (this.ProductRequestObject.WinnerProposalObject ? this.ProductRequestObject.WinnerProposalObject.ActorID : null),
        Subject: this.ProductRequestObject.Subject,
        ContractAmount: this.SumFinalAmount,
        LetterNo: this.ContractLetterNo,
        LetterDate: this.ContractLetterDate,
        StartTypeCode: this.StartType,
        IsFindCost: this.AmountType,
        IsSecret: this.IsSecret,
        ActualStartDate: this.WorkStartDate,
        WarrantyDate: this.WarrantyDate,
      };
    }
    if (this.ProductRequestObject.RelatedContractID) {
      this.PRContractObject.FromContractDate = this.PRContractObject.FromContractDateString;
      this.PRContractObject.ToContractDate = this.PRContractObject.ToContractDateString;
      this.PRContractObject.ActualStartDate = this.PRContractObject.ActualStartDateString;
      this.PRContractObject.WarrantyDate = this.PRContractObject.WarrantyDateString;
    }

    const LetterCode = this.ModuleViewTypeCode === 66 ? this.ContractLetterNo : null;
    const OrderDate = (this.ModuleViewTypeCode === 66 || this.ModuleViewTypeCode === 100000) ? this.ContractLetterDate : null;
    if (CheckExceptions) {
      this.ContractList.GetFullSaveCostContractWithOrderExceptions(this.PRContractObject,
        this.ProductRequestObject.CostFactorID,
        this.ModuleCode,
        this.ModuleViewTypeCode).subscribe((res: any) => {
          if (res !== '') {
            this.IsException = true;
            StrExceptions = res;
            StrExceptions = StrExceptions + ' ' + 'آيا مي خواهيد ادامه دهيد؟';
            this.ShowMessageBoxWithYesNoBtn(StrExceptions);
          } else {
            this.ContractList.FullSaveCostContractWithOrder(this.PRContractObject,
              this.ContractSignParams.selectedObject,
              false,
              this.ProductRequestObject.CostFactorID,
              LetterCode,
              OrderDate,
              this.PopupParam.OrginalModuleCode,
              this.ModuleCode, // RFC 51965
              this.ModuleViewTypeCode).subscribe(res => {
                this.ProductRequestObject = res;
                this.PopupOutPut.emit(this.ProductRequestObject);
                if ((this.ModuleViewTypeCode !== 66
                  && this.ModuleViewTypeCode !== 21
                  && this.ModuleViewTypeCode !== 52
                  && this.ModuleViewTypeCode !== 174
                  && this.ModuleViewTypeCode !== 75) // RFC 64711
                  && this.ModuleCode !== 2793) { // RFC 52153
                  this.Disabled = true;
                }
                this.ShowMessageBoxWithOkBtn('ثبت قراداد با موفقيت انجام شد');
              });
          }
        });
    } else {
      this.ContractList.FullSaveCostContractWithOrder(this.PRContractObject,
        this.ContractSignParams.selectedObject,
        true,
        this.ProductRequestObject.CostFactorID,
        LetterCode,
        OrderDate,
        this.PopupParam.OrginalModuleCode,
        this.ModuleCode, // RFC 51965
        this.ModuleViewTypeCode).subscribe(res => {
          this.ProductRequestObject = res;
          this.PopupOutPut.emit(this.ProductRequestObject);
          if ((this.ModuleViewTypeCode !== 66
            && this.ModuleViewTypeCode !== 21
            && this.ModuleViewTypeCode !== 52
            && this.ModuleViewTypeCode !== 174
            && this.ModuleViewTypeCode !== 75) // RFC 64711
            && this.ModuleCode !== 2793) { // RFC 52153
            this.Disabled = true;
          }
          this.ShowMessageBoxWithOkBtn('ثبت قراداد با موفقيت انجام شد');
        });
    }
  }
}
