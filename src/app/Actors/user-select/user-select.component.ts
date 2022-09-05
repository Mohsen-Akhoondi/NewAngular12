import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { Router } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {
  @ViewChild('IsDefault') IsDefault: TemplateRef<any>;
  @ViewChild('AccessType') AccessType: TemplateRef<any>;
  @Output() SearchResult: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupParam;
  External: boolean;
  editable: Boolean;
  Role_rowData: any;
  UserRegion_rowData: any;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  startTopPosition: number;
  HaveHeader: any;
  SelectedUserRoles: any[];
  type: any;
  PersonItems: any;
  ActorName: string;
  IdentityNo = 0;
  LoginName = '';
  ActorID = 0;
  UserID = null;
  Isclicked: boolean;
  IsLoading = false;
  mainBodyHeight = 85;
  outerGridHeight = 84;
  UserDomain: Array<RadioBoxModel> = [];
  TypeContractor = false;

  /*--------------------------------------- */
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
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

  /*--------------------------------------- */

  NgSelectPersonParams = {
    bindLabelProp: 'ActorName',
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
    type: 'user-person-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  NgSelectCorporateParams = {
    bindLabelProp: 'ActorName',
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
    type: 'user-Corporate-search',
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
  CorporateItems: any;
  btnclicked: boolean;
  startLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  UsersRegionID = 0;
  UserObject: any;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];

  constructor(private UserDetails: UserSettingsService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private router: Router,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService
  ) {
  }

  ngOnInit() {
    this.UserDomain = [];
    this.UserDomain.push(new RadioBoxModel('IRI', false, false, 'rdoUserDomain1_Uselect'));
    this.UserDomain.push(new RadioBoxModel('IR', true, false, 'rdoUserDomain2_Uselect'));

    this.ContractorTypeRadioParam = [];
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقیقی', false, false, 'rdoContractorType1_uwlpr'));
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقوقی', true, false, 'rdoContractorType2_uwlpr'));

    this.External = false;
    this.Isclicked = false;
    this.editable = true;
  }
  Person_FetchMore(event) {
    this.UserID = null;
    this.NgSelectPersonParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        true,
        false,
        this.IsLoading).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonItems.push(element);
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

  Person_DoSearch(event) {
    this.UserID = null;
    this.NgSelectPersonParams.loading = true;
    this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false,
      this.IsLoading).subscribe(res => {
        this.PersonItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-search'
          });
      });
    this.NgSelectPersonParams.loading = false;
  }

  onSearch() {
    this.UserID = null;
    if (!this.TypeContractor) {
      if (this.NgSelectPersonParams.selectedObject) {
        this.ActorID = this.NgSelectPersonParams.selectedObject;
      } else {
        this.ActorID = 0;
      }
    } else {
      if (this.NgSelectCorporateParams.selectedObject) {
        this.ActorID = this.NgSelectCorporateParams.selectedObject;
      } else {
        this.ActorID = 0;
      }
    }
    this.Actor.GetUserWithRegionChecking(this.ActorID, this.LoginName, this.External , this.TypeContractor).subscribe((res: any) => {
      this.UserID = null;
      this.SelectedUserRoles = [];
      if (res.UserID > 0) {
        this.UserObject = res;
        this.LoginName = this.UserObject.LoginName;
        this.UserID = this.UserObject.UserID;
        this.Role_rowData = this.UserObject.UsersRolesList;
        this.ActorName = this.UserObject.ActorFullName;
        this.ActorID = res.ActorId;

        this.SetPersonToNgSelect();

        // tslint:disable-next-line: no-shadowed-variable
        this.UserObject.UsersRolesList.forEach((res: any) => {
          this.SelectedUserRoles.push(res.RoleName);
        });
        this.UserRegion_rowData = this.UserObject.UsersRegionList;
      } else {
        this.Isclicked = true;
        this.type = 'message-box';
        this.ShowMessageBoxWithOkBtn('کاربر یافت نشد و یا شما مجاز به دیدن آن نمیباشید.');
      }
    });
  }
  Corporate_FetchMore(event) {
    this.NgSelectCorporateParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        false,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.CorporateItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.CorporateItems.push(element);
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
        type: 'user-Corporate-search'
      });
    });
  }

  CorporateOpened() {
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', false, false, false).subscribe(res => {
      this.CorporateItems = res.List,
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'user-Corporate-search'
        });
    });
  }

  Corporate_DoSearch(event) {
    this.NgSelectCorporateParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      false,
      false, false).subscribe(res => {
        this.CorporateItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-Corporate-search'
          });
      });
    this.NgSelectCorporateParams.loading = false;
  }

  popupclosed(event) {
    this.btnclicked = false;
  }
  PersonOpened() {
    this.UserID = null;
    this.Actor.GetActorPagingBasedOnRegion(1, 30, '', '', true, false, this.IsLoading).subscribe(res => {
      this.PersonItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-search'
      });
    });
  }

  SetPersonToNgSelect() {
    if (!this.TypeContractor) {
      // tslint:disable-next-line: no-shadowed-variable
      this.PersonItems = [];
      const promise = new Promise((resolve) => {
        this.Actor.GetActorPagingBasedOnRegion(1, 1, '', '', true, false, this.IsLoading, this.ActorID).subscribe(res => {
          if (res.List) {
            this.PersonItems = res.List;
          }
          resolve(res);
        });
      }).then((res: any) => {
        if (res.List) {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: 1,
            PageCount: 1,
            type: 'user-person-search'
          });
          this.NgSelectPersonParams.selectedObject = this.ActorID;
        }
      });
    } else {
      this.CorporateItems = [];
      const promise = new Promise((resolve) => {
        this.Actor.GetActorPaging(1, 30, '', 'ActorID', false, false, false, this.ActorID).subscribe(res => {
          if (res.List) {
            this.CorporateItems = res.List;
          }
          resolve(res);
        });
      }).then((res: any) => {
        if (res.List) {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-Corporate-search'
          });
          this.NgSelectCorporateParams.selectedObject = this.ActorID;
        }
      });
    }
  }


  onClose() {
    this.Closed.emit(true);
  }


  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onSelect() {
    if (this.UserID && ((!this.TypeContractor && this.NgSelectPersonParams.selectedObject) || (this.TypeContractor && this.NgSelectCorporateParams.selectedObject))) {
      // tslint:disable-next-line: no-shadowed-variable
      const promise = new Promise((resolve) => {
        this.Actor.SetSelectedUserSessionForCartable(this.UserID).subscribe(res => {
          resolve(res);
        });
      }).then((userid) => {
        const UserInfo = {
          UserID: userid,
          Roles: this.SelectedUserRoles,
          ActorName: this.ActorName,
          SelectType: 1
        };
        this.SearchResult.emit(UserInfo);
        this.Closed.emit(true);
      });
    } else {
      this.ShowMessageBoxWithOkBtn('کاربری انتخاب نشده است.');
    }
  }
  onRadioClick(event) {
    this.External = event;
  }
  getOutPutParam(event) {
  }
  rdoContractorTypeClick(Type) {
    this.NgSelectPersonParams.selectedObject = null;
    this.NgSelectCorporateParams.selectedObject = null;
    this.TypeContractor = Type;
  }
  onChangeMenu() {
    if (this.UserID && ((!this.TypeContractor && this.NgSelectPersonParams.selectedObject) || (this.TypeContractor && this.NgSelectCorporateParams.selectedObject))) {
      // tslint:disable-next-line: no-shadowed-variable
      const promise = new Promise((resolve) => {
        this.Actor.SetSelectedUserSessionForMenu(this.UserID).subscribe(res => {
          resolve(res);
        });
      }).then((userid) => {
        const UserInfo = {
          UserID: userid,
          Roles: this.SelectedUserRoles,
          ActorName: this.ActorName,
          SelectType: 2
        };
        this.SearchResult.emit(UserInfo);
        this.Closed.emit(true);
      });
    } else {
      this.ShowMessageBoxWithOkBtn('کاربری انتخاب نشده است.');
    }
  }
}



