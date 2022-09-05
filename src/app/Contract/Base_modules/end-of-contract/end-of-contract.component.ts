import { Component, OnInit } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-end-of-contract',
  templateUrl: './end-of-contract.component.html',
  styleUrls: ['./end-of-contract.component.css']
})
export class EndOfContractComponent implements OnInit {
  //////////////////// واحد اجرایی //////////////
  ReigonListSet = [];
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
//////////////////// قرارداد /////////////
ContractTotalItemCount;
ContractPageCount;
ContractItems = [];
ContractParams = {
  bindLabelProp: 'SelectedSubject',
  bindValueProp: 'ContractId',
  placeholder: '',
  MinWidth: '144px',
  selectedObject: null,
  loading: false,
  IsVirtualScroll: true,
  IsDisabled: false,
  PageSize: 30,
  PageCount: 0,
  TotalItemCount: 0,
  Required: false,
  DropDownMinWidth: '320px',
  type: 'contract',
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
ContractorName: any;
currentContractSearchTerm;
//////////////////////////////////////////////////////
private sub: any;
ModuleCode;
btnclicked = false;
HaveMaxBtn = false;
OverstartLeftPosition: number;
OverstartTopPosition: number;
PopupType;
alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
HaveHeader = false;
ProductRequestTypeCode;
selectedContract: any;
ContractSatusCode = 6;
IsContractStatus = true;
ContractSatusName = ' تحویل موقت ';

  constructor(private ContractService: ContractListService,
              private router: Router,
              private RegionService: RegionListService,
              private Module: ModuleService,
              private route: ActivatedRoute,
              private RefreshItems: RefreshServices,) { 
                this.sub = this.route.params.subscribe(params => {
                  this.ModuleCode = +params['ModuleCode'];
               });
              }

  ngOnInit() {
    this.RegionService.GetAllRegion().subscribe(res => {
      this.ReigonListSet = res;
      this.NgSelectRegionParams.selectedObject = res[0].RegionCode;
    });
    this.ProductRequestTypeCode = this.ModuleCode == 3025 ? 3 : 
                                  this.ModuleCode == 3003 ? 1 : 4; // 63316
  }
///////////////////////////////////////////////////////////////
onChangeReigonObj(event) { // واحد اجرایی
  this.ContractParams.selectedObject = null;
}
///////////////////////////////////////////////////////////////
onChangeContractObj(newObj) { // قرارداد
  this.selectedContract = newObj;
    this.ContractService.GetContract(this.selectedContract).subscribe(res => {
      this.ContractorName = res[0].ContractorName;
     
    });
  }
//////////////////////////////////////////////////////////////
OnOpenNgSelect() {
      this.ContractParams.loading = true;
      this.ContractService.GetConcludedContractPaging(1, 30, '', '',
        this.NgSelectRegionParams.selectedObject, this.ProductRequestTypeCode).subscribe((res: any) => {
          this.ContractItems = res.List;
          this.RefreshItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'contract'
          });
          this.ContractParams.loading = false;
        });
}
////////////////////////////////////////// کمبو قرارداد
FetchMoreContract(event) {
  this.ContractParams.loading = true;
  const ResultList = [];
  const promise = new Promise((resolve, reject) => {
    this.ContractService.GetConcludedContractPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.NgSelectRegionParams.selectedObject, this.ProductRequestTypeCode)
      .subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
          this.ContractItems.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
          this.ContractItems.push(element);
        });
        resolve(res.TotalItemCount);
      });
  }).then((TotalItemCount: number) => {
    this.RefreshItems.RefreshItemsVirtualNgSelect({
      List: ResultList,
      term: event.term,
      TotalItemCount: TotalItemCount,
      PageCount: Math.ceil(TotalItemCount / 30),
      type: 'contract'
    });
  });
  this.ContractParams.loading = false;
}

doContractSearch(event) {
  this.currentContractSearchTerm = event.term;
  this.ContractParams.loading = true;
  if (event.SearchOption === 'null' || event.SearchOption == null) {
    event.SearchOption = 'ContractCode';
  }
  this.ContractService.GetConcludedContractPaging(event.PageNumber, event.PageSize, event.term,
    event.SearchOption, this.NgSelectRegionParams.selectedObject, this.ProductRequestTypeCode).subscribe((res: any) => {
      if (this.currentContractSearchTerm === event.term) {
        this.ContractItems = res.List;     
        this.RefreshItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'contract'
        });
        this.ContractParams.loading = false;
      }
    });
}
//////////////////////////////////////////////////////////
onClose() {
  this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
}
//////////////////////////////////////////
ShowMessageBoxWithYesNoBtn(message) {
  this.btnclicked = true;
  this.PopupType = 'message-box';
  this.HaveHeader = true;
  this.HaveMaxBtn = false;
  this.OverstartLeftPosition = 449;
  this.OverstartTopPosition = 87;
  this.alertMessageParams.message = message;
  this.alertMessageParams.HaveOkBtn = false;
  this.alertMessageParams.HaveYesBtn = true;
  this.alertMessageParams.HaveNoBtn = true;
}

ShowMessageBoxWithOkBtn(message) {
  this.btnclicked = true;
  this.PopupType = 'message-box';
  this.HaveHeader = true;
  this.HaveMaxBtn = false;
  this.OverstartLeftPosition = 545;
  this.OverstartLeftPosition = 207;
  this.alertMessageParams.message = message;
  this.alertMessageParams.HaveOkBtn = true;
  this.alertMessageParams.HaveNoBtn = false;
  this.alertMessageParams.HaveYesBtn = false;
}
//////////////////////////////////////////
popupclosed() {
  this.btnclicked = false;
  this.HaveMaxBtn = false;
  this.PopupType = '';
}
/////////////////////////////////////////
onSaveClick() {
  this.ShowMessageBoxWithYesNoBtn( 'آیا از تغییر وضعیت قرارداد به '+ this.ContractSatusName + 'اطمینان دارید؟');
}
/////////////////////////////////////////
MessageBoxAction(event) {
  if (event === 'YES') {
    this.ChangeContractStatus();
  }
  this.btnclicked = false;
  this.PopupType = '';
  this.HaveMaxBtn = false;
}
//////////////////////////////////////////
ChangeContractStatus() {
  this.ContractService.ChangeContractStatus(this.ContractParams.selectedObject, this.ModuleCode , this.ContractSatusCode).subscribe((res: any) => {
    if (res) {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ContractParams.selectedObject = null;
    }
  },
  err => {
    if (!err.error.Message.includes('|')) {
      this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
    }
  });
}

RedioClick(event, num: number) {
  this.IsContractStatus = event;
  this.ContractSatusCode = num;
  switch (this.ContractSatusCode) {
    case 3: 
     this.ContractSatusName = ' خاتمه یافته ';
      break;
    case 6: 
     this.ContractSatusName = ' تحویل موقت ';
      break;
    case 7: 
     this.ContractSatusName = ' تحویل قطعی ';
      break;
    default:
      break;
  }
}
  
}
