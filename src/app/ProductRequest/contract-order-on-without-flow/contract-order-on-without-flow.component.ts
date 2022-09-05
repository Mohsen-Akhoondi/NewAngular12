import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-order-on-without-flow',
  templateUrl: './contract-order-on-without-flow.component.html',
  styleUrls: ['./contract-order-on-without-flow.component.css']
})

export class ContractOrderOnWithoutFlowComponent implements OnInit {


  @Output() ProductRequestSuggestionClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupParam;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader;
  isClicked = false;
  startToptPosition: number;
  HaveMaxBtn;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  ProductRequestObject;
  PopUpType;
  startLeftPosition;
  startTopPosition;
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

  PRContractObject;
  Disabled = false;
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
    if (!this.ModuleCode) {
      if (this.PopupParam && this.PopupParam.ModuleCode) {
        this.ModuleCode = this.PopupParam.ModuleCode;
      }
    }
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.PRContractObject = this.PopupParam.ProductRequestObject.ContractObject;
    if (this.PRContractObject) {
      // if (this.ProductRequestObject.RelatedContractID === null) { 
      //   this.ContractLetterDate = this.PRContractObject.ShortLetterDate;
      //   this.StartDate = this.PRContractObject.FromContractDateString;
      //   this.EndDate = this.PRContractObject.ToContractDateString;
      //   this.ContractLetterNo = this.PRContractObject.LetterNo;
      //   this.WarrantyDate = this.PRContractObject.WarrantyDateString;

      // } else {
      this.ContractList.GetOrderDate(this.ProductRequestObject.CostFactorID).subscribe(res => {
        if (res) {
          this.ContractLetterDate = res.ShortOrderDate;
          this.ContractLetterNo = res.LetterCode;
        }
      });
      // }
    }
    this.onSignersOpen(1);
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

  popupclosed() {
    this.isClicked = false;
    this.HaveMaxBtn = false;

  }

  OnContractLetterDateChange(ADate) {
    this.ContractLetterDate = ADate.MDate;
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
        let ActorIDs = [];
        this.PRContractObject.ContractSignList.forEach(item => {
          ActorIDs.push(item.ActorID);
        });
        this.ContractSignParams.selectedObject = ActorIDs;
      }
    });
  }
  FullSaveCostContractWithOrder() {
    // tslint:disable-next-line: max-line-length
    if (this.ContractLetterDate === null || this.ContractLetterNo === null || this.ContractSignParams.selectedObject === null) {
      // کنترل خالي نبودن شماره و تاريخ انعقاد در تمامي حالات RFC 53536
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا تاريخ و شماره الحاقيه و امضا کنندگان را وارد نماييد');
      return;
    }
    const IsLeavingFormality = this.ProductRequestObject.DealMethodCode === 4 ||
      this.ProductRequestObject.DealMethodCode === 7 ||
      this.ProductRequestObject.DealMethodCode === 8 ||
      this.ProductRequestObject.DealMethodCode === 9;

    // if (IsLeavingFormality &&
    //   (!this.ProductRequestObject.RequestSupplierList ||
    //     this.ProductRequestObject.RequestSupplierList.length <= 0 ||
    //     !this.ProductRequestObject.RequestSupplierList[0].ActorID)) {
    //   this.ShowMessageBoxWithOkBtn('طرف قرارداد براي درخواست ثبت نشده است . امکان انعقاد قرارداد وجود ندارد.');
    //   return;
    // }
// rfc 65663 : .با هماهنگی لازم کنترل کامنت شد

    if (this.ProductRequestObject.RelatedContractID) {
      this.PRContractObject.FromContractDate = this.PRContractObject.FromContractDateString;
      this.PRContractObject.ToContractDate = this.PRContractObject.ToContractDateString;
      this.PRContractObject.ActualStartDate = this.PRContractObject.ActualStartDateString;
      this.PRContractObject.WarrantyDate = this.PRContractObject.WarrantyDateString;
    }
    const LetterCode = this.ContractLetterNo;
    const OrderDate = this.ContractLetterDate;
    this.ContractList.CreateContractOrderforWithoutFlow(this.PRContractObject,
      this.ContractSignParams.selectedObject,
      this.ModuleCode,
      this.ProductRequestObject.CostFactorID,
      LetterCode,
      OrderDate
    ).subscribe(res => {
      if (res) {
        this.ProductRequestObject = res;
        this.PopupOutPut.emit(this.ProductRequestObject);
        this.ShowMessageBoxWithOkBtn('ثبت مرحله با موفقيت انجام شد');
      } else {
        this.ShowMessageBoxWithOkBtn('ثبت مرحله با شکست انجام شد');
      }
    });
  }
}
