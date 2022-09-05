import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { forkJoin } from 'rxjs';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-product-receive-doc',
  templateUrl: './product-receive-doc.component.html',
  styleUrls: ['./product-receive-doc.component.css']
})

export class ProductReceiveDocComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPutParam: EventEmitter<boolean> = new EventEmitter<boolean>();
  isClicked: boolean;
  PopUpType: string;
  RegionName;
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

  ReceiveDocTypeItems;
  ReceiveDocTypeParams = {
    bindLabelProp: 'ReceiveDocTypeName',
    bindValueProp: 'ReceiveDocTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  BankAccItems: any;
  BankAccParams = {
    bindLabelProp: 'AccNo',
    bindValueProp: 'BankAccID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

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
    DropDownMinWidth: '400px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'BranchID', width: 65, MinTermLenght: 1, SearchOption: 'BranchID' },
        { HeaderCaption: 'کد شعبه', HeaderName: 'CorporateCode', width: 45, MinTermLenght: 1, SearchOption: 'CorporateCode' },
        { HeaderCaption: 'نام شعبه', HeaderName: 'BranchName', width: 83, MinTermLenght: 3, SearchOption: 'BranchName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 65, },
        { HeaderCaption: 'کد شعبه', width: 45, },
        { HeaderCaption: 'نام شعبه', width: 83, }],
      HaveItemNo: true,
      ItemNoWidth: 18
    }
  };
  BranchPageCount;
  BranchItems: any;
  BranchTotalItemCount;
  ReferenceDate;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];
  NgSelectPersonReqParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
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
    type: 'user-person-Req-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorID', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 40, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 80, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 40, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 80, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  PersonReqItems: any;
  TypeContractor = true;
  ReceiveDocTypeList: any = [];
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition: number;
  startTopPosition: number;
  HaveHeader: boolean;
  HaveMaxBtn = false;
  PRReceiveDocObj;
  ReferenceNo;
  ReceiveDocAmount;
  Note;
  DeadLine;
  PayerBankAcc;
  PayerBankName;
  IsCost = true;
  CostFactorID;
  HavePRReceiveDoc = false;
  ReceiveDocTypeName;
  BranchID;
  BankID;
  ActorID;
  ReceiveDocTypeCode;
  RegionCode;
  IsDisbale = false;
  IsDisbaleDeadLine = false;


  constructor(private ContractList: ContractListService,
    private ProductRequest: ProductRequestService,
    private RefreshPersonItems: RefreshServices,
    private Actor: ActorService,
    private Common: CommonService,
    private RefreshBankItems: RefreshServices) {
  }

  ngOnInit() {
    this.RegionName = this.InputParam.ProductRequestObject.RegionName;
    this.RegionCode = this.InputParam.ProductRequestObject.RegionCode;
    this.IsCost = this.InputParam.ProductRequestObject.IsCost;
    this.CostFactorID = this.InputParam.ProductRequestObject.CostFactorID;
    this.TypeContractor = true;
    this.IsDisbale = this.IsDisbaleDeadLine = true;
    forkJoin([
      this.ProductRequest.GetPRReceiveDoc(this.InputParam.ReceiveDocID),
      this.ProductRequest.GetPRReceiveDocType(),
      this.ProductRequest.GetCurrentDate(),
      this.ProductRequest.GetMaxReferenceNo(this.CostFactorID, this.IsCost),
    ]).subscribe((res: any) => {
      if (res[0]) {
        this.PRReceiveDocObj = res[0];
        this.ReceiveDocTypeItems = res[1];
        this.ReceiveDocTypeParams.selectedObject = this.PRReceiveDocObj.ReceiveDocTypeCode;
        this.ReferenceNo = this.PRReceiveDocObj.ReferenceNo;
        this.ReferenceDate = this.PRReceiveDocObj.ShortReferenceDate;
        this.DeadLine = this.PRReceiveDocObj.ShortDeadLine;
        this.TypeContractor = this.PRReceiveDocObj.PersonTypeCode === 1 ? true : false;
        this.ReceiveDocAmount = this.PRReceiveDocObj.ReceiveDocAmount;
        this.BankID = this.PRReceiveDocObj.BankID;
        this.BranchID = this.PRReceiveDocObj.BranchID;
        this.ActorID = this.PRReceiveDocObj.ActorID;
        this.OpenBank();
        this.NgSelectBankParams.selectedObject = this.PRReceiveDocObj.BankID;
        this.OpenBranch();
        this.NgSelectBranchParams.selectedObject = this.PRReceiveDocObj.BranchID;
        this.OpenBankAcc();
        this.BankAccParams.selectedObject = this.PRReceiveDocObj.BankAccID;
        this.PersonReqOpened();
        this.NgSelectPersonReqParams.selectedObject = this.PRReceiveDocObj.ActorID;
        this.Note = this.PRReceiveDocObj.Note;
        this.PayerBankName = this.PRReceiveDocObj.PayerBankName;
        this.PayerBankAcc = this.PRReceiveDocObj.PayerBankAcc;
        this.onChangeReceiveDocType(this.ReceiveDocTypeParams.selectedObject);
      } else {
        this.ReceiveDocTypeItems = res[1];
        this.ReferenceDate = res[2];
        this.ReferenceNo = res[3];
      }
    });
  }

  OnReferenceDateChange(ADate) {
    this.ReferenceDate = ADate.MDate;
  }

  OnDeadLineDateChange(ADate) {
    this.DeadLine = ADate.MDate;
  }

  onClose() {
    this.isClicked = false;
    this.Closed.emit(true);
  }

  popupclosed() {
    this.isClicked = false;
    this.PopUpType = '';
  }

  getOutPutParam(event) {
  }

  rdoContractorTypeClick(Type) {
    this.TypeContractor = Type;
    if (this.TypeContractor) {
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
    } else {
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
    }
  }

  PersonReq_FetchMore(event) {
    this.NgSelectPersonReqParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        this.TypeContractor,
        false, false, this.ActorID).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonReqItems.push(el);
          });
          res.List.forEach(element => {
            element.ActorID = element.ActorId;
            //   element.PersonName = element.ActorName;
            ResultList.push(element);
            this.PersonReqItems.push(element);
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
        type: 'user-person-Req-search'
      });
    });
  }

  Person_Req_DoSearch(event) {
    this.NgSelectPersonReqParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false, this.ActorID).subscribe(res => {
        res.List.forEach(el => {
          el.ActorID = el.ActorId;
          //    el.PersonName = el.ActorName;
        });
        this.PersonReqItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-Req-search'
          });
      });
    this.NgSelectPersonReqParams.loading = false;
  }

  PersonReqOpened() {
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false, this.ActorID).subscribe(res => {
      res.List.forEach(el => {
        el.ActorID = el.ActorId;
        //   el.PersonName = el.ActorName;
      });
      this.PersonReqItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 500;
    this.startTopPosition = 226;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
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
      this.NgSelectPersonReqParams.selectedObject,
      this.BankID).subscribe(res => {
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
      this.NgSelectPersonReqParams.selectedObject,
      this.BankID).subscribe(res => {
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
      this.NgSelectPersonReqParams.selectedObject,
      this.BankID).subscribe(res => {
        this.BankItems = res.List,
          this.RefreshBankItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'Bank'
          });
      });
    this.NgSelectPersonReqParams.loading = false;
  }

  FetchMoreBranch(event) {
    const ResultList = [];
    this.NgSelectBranchParams.loading = true;
    this.Common.GetBranchPaging(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.NgSelectBankParams.selectedObject,
      this.NgSelectPersonReqParams.selectedObject,
      this.BranchID
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
      this.NgSelectPersonReqParams.selectedObject,
      this.BranchID
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
      this.NgSelectPersonReqParams.selectedObject,
      this.BranchID
    ).subscribe(res => {
      this.BranchItems = res.List;
      this.BranchTotalItemCount = res.TotalItemCount;
      this.BranchPageCount = Math.ceil(res.TotalItemCount / 30);
      this.NgSelectBranchParams.loading = false;
    });
  }

  OpenBankAcc() {
    this.ProductRequest.GetAccNoList(this.NgSelectBranchParams.selectedObject, this.RegionCode).subscribe((res: any) => {
      this.BankAccItems = res;
    });
  }
  onChangeReceiveDocType(ReceiveDocTypeCode) {
    if (ReceiveDocTypeCode === 1 ||
      ReceiveDocTypeCode === 2 ||
      ReceiveDocTypeCode === 3) {
      this.IsDisbaleDeadLine = true;
      this.IsDisbale = false;
    } else if (ReceiveDocTypeCode === 5) {
      this.IsDisbaleDeadLine = false;
      this.IsDisbale = true;
    } else {
      this.IsDisbaleDeadLine = false;
      this.IsDisbale = false;
    }
  }
  onSave() {
    const PRReceiveDocList = [];
    const PRReceiveDocObj = {
      ReceiveDocID: this.PRReceiveDocObj ? this.PRReceiveDocObj.ReceiveDocID : -1,
      CostFactorID: -1,
      ReceiveDocTypeCode: this.ReceiveDocTypeParams.selectedObject ? this.ReceiveDocTypeParams.selectedObject : null,
      ReferenceNo: this.ReferenceNo,
      IsWarranty: 0,
      ReferenceDate: this.ReferenceDate,
      ReceiveDocAmount: this.ReceiveDocAmount,
      BranchID: this.NgSelectBranchParams.selectedObject ? this.NgSelectBranchParams.selectedObject : null,
      BankAccID: this.BankAccParams.selectedObject ? this.BankAccParams.selectedObject : null,
      Note: this.Note,
      PayerBankName: this.PayerBankName,
      ActorID: this.NgSelectPersonReqParams.selectedObject ? this.NgSelectPersonReqParams.selectedObject : null,
      PayerBankAcc: this.PayerBankAcc,
      DeadLine: this.DeadLine,
    };
    PRReceiveDocList.push(PRReceiveDocObj);
    this.ProductRequest.SaveProductReceiveDoc(PRReceiveDocList,
      this.IsCost, this.CostFactorID).subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      });
  }
}

