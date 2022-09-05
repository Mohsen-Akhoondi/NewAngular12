import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter, Input } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { Router } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { TemplateRendererComponent } from '../../Shared/grid-component/template-renderer/template-renderer.component';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-change-cartable-user',
  templateUrl: './change-cartable-user.component.html',
  styleUrls: ['./change-cartable-user.component.css']
})
export class ChangeCartableUserComponent implements OnInit {
  @ViewChild('IsDefault') IsDefault: TemplateRef<any>;
  @ViewChild('AccessType') AccessType: TemplateRef<any>;
  @Output() SearchResult: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('IsReadyToConfirm') IsReadyToConfirm: TemplateRef<any>;
  @ViewChild('IsReturn') IsReturn: TemplateRef<any>;
  @Input() PopupParam;
  External: boolean;
  External2: boolean;
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
  PersonItems2: any;
  ActorName: string;
  IdentityNo = 0;
  LoginName = '';
  LoginName2 = '';
  ActorID = 0;
  ActorID2 = 0;
  UserID = null;
  UserID2 = null;
  Isclicked: boolean;
  Isclicked2: boolean;
  IsLoading = false;
  mainBodyHeight = 85;
  outerGridHeight = 84;
  UserDomain: Array<RadioBoxModel> = [];
  UserDomain2: Array<RadioBoxModel> = [];
  TypeContractor = false;
  TypeContractor2 = false;

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
  NgSelectPersonParams2 = {
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
    type: 'user-person-search2',
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
  NgSelectCorporateParams2 = {
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
    type: 'user-Corporate-search2',
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
  CorporateItems2: any;
  btnclicked: boolean;
  startLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  UsersRegionID = 0;
  UserObject: any;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];
  ContractorTypeRadioParam2: Array<RadioBoxModel> = [];
  columnDef;
  UserWorkListrowData: any = [];
  UserWorkListData: any = [];

  RolesParams = {
    bindLabelProp: 'RoleName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  roleItems;
  FinalRoleList: any = [];
  BtnClickedName: string;
  OverPixelWidth: number;

  constructor(
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private ContractList: ContractListService,
    private router: Router,
    private Region: RegionListService,
    private UserSettings: UserSettingsService,
    private ProductRequest: ProductRequestService,
    private CommonServic: CommonServices
  ) {
  }

  ngOnInit() {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'تایید',
        width: 45,
        autoHeight: true,
        resizable: true,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsReadyToConfirm
        }
      },
      {
        headerName: '',
        width: 35,
        autoHeight: true,
        resizable: true,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsReturn
        },
      },
      {
        headerName: 'ماهیت',
        field: 'IsIncomeStr',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'ارسال کننده',
        field: 'FullReferenceUserName',
        width: 240,
        resizable: true
      },
      {
        headerName: 'عملیات جاری',
        field: 'CurrentNodeName',
        width: 240,
        resizable: true
      },
      {
        headerName: 'موضوع ',
        field: 'ObjectSubject',
        width: 160,
        resizable: true
      },
      {
        headerName: 'کد ',
        field: 'ObjectCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ObjectActorName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'تاریخ ارسال',
        field: 'WorkFlowPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره ',
        field: 'ObjectNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'ObjectPersianDate',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع شی گردش کار ',
        field: 'ObjectTypeName',
        width: 120,
        resizable: true
      }

    ];
    this.UserWorkListrowData = [];
    this.UserWorkListData = [];
    this.UserDomain = [];
    this.UserDomain.push(new RadioBoxModel('IRI', false, false, 'rdoUserDomain1_Uselect'));
    this.UserDomain.push(new RadioBoxModel('IR', true, false, 'rdoUserDomain2_Uselect'));
    this.UserDomain2 = [];
    this.UserDomain2.push(new RadioBoxModel('IRI', false, false, 'rdoUserDomain3_Uselect'));
    this.UserDomain2.push(new RadioBoxModel('IR', true, false, 'rdoUserDomain4_Uselect'));

    this.ContractorTypeRadioParam = [];
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقیقی', false, false, 'rdoContractorType1_uwlpr'));
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقوقی', true, false, 'rdoContractorType2_uwlpr'));
    this.ContractorTypeRadioParam2 = [];
    this.ContractorTypeRadioParam2.push(new RadioBoxModel('حقیقی', false, false, 'rdoContractorType3_uwlpr'));
    this.ContractorTypeRadioParam2.push(new RadioBoxModel('حقوقی', true, false, 'rdoContractorType4_uwlpr'));

    this.External = false;
    this.External2 = false;
    this.Isclicked = false;
    this.Isclicked2 = false;

  }
  ngAfterViewInit(): void {

  }
  ////////////
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
    this.Actor.GetUserWithRegionChecking(this.ActorID, this.LoginName, this.External, this.TypeContractor)
      .subscribe((res: any) => {
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

          let RoleIDList: any = [];
          this.UserSettings.GetcurrUserWorkListByUserID(res.UserID, 3).subscribe(res => {
            if (res) {
              res.forEach(element => {
                element.FullReferenceUserName = element.ReferenceRoleName ? element.ReferenceRoleName + ' - ' + element.ReferenceUserName : '';
                if (!RoleIDList.includes(element.RoleID)) {
                  RoleIDList.push(element.RoleID);
                }
              });
              this.roleItems = res[0].DicRoleList;
              this.RolesParams.selectedObject = res[0].RoleLIDList;
              this.UserWorkListrowData = res;
              this.UserWorkListData = res;
            }
          });
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
  onRadioClick(event) {
    this.External = event;
  }
  rdoContractorTypeClick(Type) {
    this.NgSelectPersonParams.selectedObject = null;
    this.NgSelectCorporateParams.selectedObject = null;
    this.TypeContractor = Type;
  }
  ////////////
  Person_FetchMore2(event) {
    this.UserID2 = null;
    this.NgSelectPersonParams2.loading = true;
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
            this.PersonItems2.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonItems2.push(element);
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
        type: 'user-person-search2'
      });
    });
  }
  Person_DoSearch2(event) {
    this.UserID2 = null;
    this.NgSelectPersonParams2.loading = true;
    this.Actor.GetActorPagingBasedOnRegion(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      true,
      false,
      this.IsLoading).subscribe(res => {
        this.PersonItems2 = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-search2'
          });
      });
    this.NgSelectPersonParams2.loading = false;
  }
  onSearch2() {
    this.UserID2 = null;
    if (!this.TypeContractor2) {
      if (this.NgSelectPersonParams2.selectedObject) {
        this.ActorID2 = this.NgSelectPersonParams2.selectedObject;
      } else {
        this.ActorID2 = 0;
      }
    } else {
      if (this.NgSelectCorporateParams2.selectedObject) {
        this.ActorID2 = this.NgSelectCorporateParams2.selectedObject;
      } else {
        this.ActorID2 = 0;
      }
    }
    this.Actor.GetUserWithRegionChecking(this.ActorID2, this.LoginName2, this.External2, this.TypeContractor2).subscribe((res: any) => {
      this.UserID2 = null;
      // this.SelectedUserRoles = [];
      if (res.UserID > 0) {
        this.UserObject = res;
        this.LoginName2 = this.UserObject.LoginName;
        this.UserID2 = this.UserObject.UserID;
        this.Role_rowData = this.UserObject.UsersRolesList;
        this.ActorName = this.UserObject.ActorFullName;
        this.ActorID2 = res.ActorId;

        this.SetPersonToNgSelect2();

        // tslint:disable-next-line: no-shadowed-variable
        // this.UserObject.UsersRolesList.forEach((res: any) => {
        //   this.SelectedUserRoles.push(res.RoleName);
        // });
        // this.UserRegion_rowData = this.UserObject.UsersRegionList;
      } else {
        this.Isclicked2 = true;
        this.type = 'message-box';
        this.ShowMessageBoxWithOkBtn('کاربر یافت نشد و یا شما مجاز به دیدن آن نمیباشید.');
      }
    });
  }
  Corporate_FetchMore2(event) {
    this.NgSelectCorporateParams2.loading = true;
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
            this.CorporateItems2.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.CorporateItems2.push(element);
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
        type: 'user-Corporate-search2'
      });
    });
  }
  CorporateOpened2() {
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', false, false, false).subscribe(res => {
      this.CorporateItems2 = res.List,
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'user-Corporate-search2'
        });
    });
  }
  Corporate_DoSearch2(event) {
    this.NgSelectCorporateParams2.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      false,
      false, false).subscribe(res => {
        this.CorporateItems2 = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-Corporate-search2'
          });
      });
    this.NgSelectCorporateParams2.loading = false;
  }
  PersonOpened2() {
    this.UserID2 = null;
    this.Actor.GetActorPagingBasedOnRegion(1, 30, '', '', true, false, this.IsLoading).subscribe(res => {
      this.PersonItems2 = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-search2'
      });
    });
  }
  SetPersonToNgSelect2() {
    if (!this.TypeContractor2) {
      // tslint:disable-next-line: no-shadowed-variable
      this.PersonItems2 = [];
      const promise = new Promise((resolve) => {
        this.Actor.GetActorPagingBasedOnRegion(1, 1, '', '', true, false, this.IsLoading, this.ActorID2).subscribe(res => {
          if (res.List) {
            this.PersonItems2 = res.List;
          }
          resolve(res);
        });
      }).then((res: any) => {
        if (res.List) {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: 1,
            PageCount: 1,
            type: 'user-person-search2'
          });
          this.NgSelectPersonParams2.selectedObject = this.ActorID2;
        }
      });
    } else {
      this.CorporateItems2 = [];
      const promise = new Promise((resolve) => {
        this.Actor.GetActorPaging(1, 30, '', 'ActorID', false, false, false, this.ActorID2).subscribe(res => {
          if (res.List) {
            this.CorporateItems2 = res.List;
          }
          resolve(res);
        });
      }).then((res: any) => {
        if (res.List) {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-Corporate-search2'
          });
          this.NgSelectCorporateParams2.selectedObject = this.ActorID2;
        }
      });
    }
  }
  onRadioClick2(event) {
    this.External2 = event;
  }
  rdoContractorTypeClick2(Type) {
    this.NgSelectPersonParams2.selectedObject = null;
    this.NgSelectCorporateParams2.selectedObject = null;
    this.TypeContractor2 = Type;
  }
  ////////////
  onClose() {
    this.Closed.emit(true);
  }
  popupclosed(event) {
    this.btnclicked = false;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 510;
    this.startTopPosition = 179;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  getOutPutParam(event) {

  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.OverPixelWidth = null;
    this.startLeftPosition = 510;
    this.startTopPosition = 179;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  onClickSelect() {
    this.ContractList.ConfirmChangeCartableUser(this.UserID, this.UserID2,
      this.RolesParams.selectedObject)
      .subscribe(
        (res: any) => {
          this.ShowMessageBoxWithOkBtn('تایید با موفقيت انجام شد');
        });
        // ,
        // err => {
        //   this.ShowMessageBoxWithOkBtn('تایید با خطا مواجه شد');
        // })
        // ;
  }

  onSelect() {
    if (this.UserID &&
      ((!this.TypeContractor && this.NgSelectPersonParams.selectedObject) ||
        (this.TypeContractor && this.NgSelectCorporateParams.selectedObject))) {
      if (this.UserID2 &&
        ((!this.TypeContractor2 && this.NgSelectPersonParams2.selectedObject) ||
          (this.TypeContractor2 && this.NgSelectCorporateParams2.selectedObject))) {
        this.ShowMessageBoxWithYesNoBtn('آیا مایل به تایید انتقال کارتابل می باشید؟');
        this.BtnClickedName = 'IsConfirmCartableChange';
      } else {
        this.ShowMessageBoxWithOkBtn('کاربر گیرنده انتخاب نشده است.');
      }
    } else {
      this.ShowMessageBoxWithOkBtn('کاربر فرستنده انتخاب نشده است.');
    }
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'IsConfirmCartableChange' && ActionResult === 'YES') {
      this.onClickSelect();
    }
  }

  onChangeRole(event) {
    this.FinalRoleList = event;
    let UserWorkListLst = [];
    let Counter = 1;
    this.UserWorkListData.forEach(element => {
      if(this.FinalRoleList.includes(element.RoleID)){
        element.ItemNo = Counter;
        UserWorkListLst.push(element);
        Counter = Counter + 1;
      }
    });
    this.UserWorkListrowData = UserWorkListLst;
  }
}
