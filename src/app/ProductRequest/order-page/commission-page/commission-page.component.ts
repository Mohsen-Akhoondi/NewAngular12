import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/Services/ProductRequest/OrderService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-commission-page',
  templateUrl: './commission-page.component.html',
  styleUrls: ['./commission-page.component.css']
})
export class CommissionPageComponent implements OnInit {
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
  CommissionItems;
  CommissionParams = {
    bindLabelProp: 'CommitionName',
    bindValueProp: 'CommitionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  PersonItems;
  PersonParams = {
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
    Required: true,
    DropDownMinWidth: '300px',
    type: 'commission-member-person',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
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

  UnitTopicItems;
  UnitTopicParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitTopicID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: false,
    DropDownMinWidth: '300px',
    type: 'commission-member-unit-topic',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد واحد', HeaderName: 'UnitTopicCode', width: 35, TermLenght: 10, SearchOption: 'UnitTopicCode' },
        { HeaderCaption: 'نام واحد', HeaderName: 'UnitTopicName', width: 53, MinTermLenght: 3, SearchOption: 'UnitTopicName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد واحد', width: 35, },
        { HeaderCaption: 'نام واحد', width: 53, }],
      // HaveItemNo: true,
      // ItemNoWidth: 16
    }
  };
  selectedRegion;
  selectedCommission;
  selectedPerson;
  selectedUnitTopic;
  StartDate;
  EndDate;
  AttachLetterDate;
  DetachLetterDate;
  AttachLetterCode;
  DetachLetterCode;
  SortLevel;
  CheckValidate = false;
  HaveSave = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ModuleCode: number;
  HaveDelete = false;
  btnclicked = false;
  CommissionMemberList = [];
  type;
  HaveHeader;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  CommissionMemberID;

  constructor(private router: Router,
              private Region: RegionListService,
              private RefreshPersonItems: RefreshServices,
              private RefreshUnitTopicItems: RefreshServices,
              private Actor: ActorService,
              private route: ActivatedRoute,
              private Order: OrderService,
              private User: UserSettingsService) {
                this.route.params.subscribe(params => {
                  this.ModuleCode = +params['ModuleCode'];
                });
              }

  ngOnInit() {
    forkJoin([
      this.Region.GetRegionList(this.ModuleCode, true),
      this.Order.GetCommitionList(),
      this.Actor.GetPersonPaging(1, 30, '', null),
      this.Order.GetUnitTopicPaging(1, 30, '', null)
    ]).subscribe(res => {
      this.RegionItems = res[0];
      this.CommissionItems = res[1];
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res[2].List,
        TotalItemCount: res[2].TotalItemCount,
        PageCount: Math.ceil(res[2].TotalItemCount / 30),
        type: 'commission-member-person'
      });
      this.RefreshUnitTopicItems.RefreshItemsVirtualNgSelect({
        List: res[3].List,
        TotalItemCount: res[3].TotalItemCount,
        PageCount: Math.ceil(res[3].TotalItemCount / 30),
        type: 'commission-member-unit-topic'
      });
    });

    this.User.GetModulOPByUser(2516).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
            this.HaveSave = true;
            break;

          case 6:
            this.HaveDelete = true;
            break;

          default:
            break;
        }

      });
    });

  }

  onChangeRegion(event) {
    this.RegionParams.selectedObject = event;
    this.selectedRegion = this.RegionParams.selectedObject;
  }

  onChangeCommission(event) {
    this.CommissionParams.selectedObject = event;
    this.selectedCommission = this.CommissionParams.selectedObject;
  }

  onChangePerson(event) {
    this.PersonParams.selectedObject = event;
    this.selectedPerson = this.PersonParams.selectedObject;
  }

  onChangeUnitTopic(event) {
    this.UnitTopicParams.selectedObject = event;
    this.selectedUnitTopic = this.UnitTopicParams.selectedObject;
  }

  OnStartDateChange(ADate) {
    this.StartDate = ADate.MDate;
  }

  OnEndDateChange(ADate) {
    this.EndDate = ADate.MDate;
  }

  OnAttachLetterDateChange(ADate) {
    this.AttachLetterDate = ADate.MDate;
  }

  OnDetachLetterDateChange(ADate) {
    this.DetachLetterDate = ADate.MDate;
  }

  getSortLevel(SortLevel) {
    if (SortLevel) { this.SortLevel = SortLevel;
      this.SortLevel = parseFloat(this.SortLevel);
    } else {
      this.SortLevel = '';
    }
  }

  FetchMorePerson(event) {
    this.PersonParams.loading = true;
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
        type: 'commission-member-person'
      });
    });
  }

  doPersonSearch(event) {
    this.PersonParams.loading = true;
    this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'commission-member-person'
      });
    });
  }

  FetchMoreUnitTopic(event) {
    this.UnitTopicParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Order.GetUnitTopicPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        resolve(res.TotalItemCount);
      });
    }).then((TotalItemCount: number) => {
      this.RefreshUnitTopicItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'commission-member-unit-topic'
      });
    });
  }

  doUnitTopicSearch(event) {
    this.UnitTopicParams.loading = true;
    this.Order.GetUnitTopicPaging(event.PageNumber, event.PageSize, event.term, '').subscribe(res => {
      this.RefreshUnitTopicItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'commission-member-unit-topic'
      });
    });
  }

  onSave() {
    this.CheckValidate = true;
    this.CommissionMemberList = [
      {CommitionMemberID: -1,
      RegionCode: this.selectedRegion,
      CommitionCode: this.selectedCommission,
      ActorID: this.selectedPerson,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      AttachLetterDate: this.AttachLetterDate,
      DetachLetterDate: this.DetachLetterDate,
      AttachLetterCode: this.AttachLetterCode,
      DetachLetterCode: this.DetachLetterCode,
      UnitTopicID: this.selectedUnitTopic,
      SortLevel: this.SortLevel}
    ];
    this.Order.SaveCommissionMember(this.CommissionMemberList, this.ModuleCode).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
      },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با مشکل مواجه شد.');
      }
    );
  }

  popupclosed() {
    this.btnclicked = false;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
}

}
