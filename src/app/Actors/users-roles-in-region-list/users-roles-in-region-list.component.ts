import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { of } from 'rxjs';
@Component({
  selector: 'app-users-roles-in-region-list',
  templateUrl: './users-roles-in-region-list.component.html',
  styleUrls: ['./users-roles-in-region-list.component.css']
})
export class UsersRolesInRegionListComponent implements OnInit {
  @Output() UsersRoleRegionClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  colDef;
  userRegionRoleData;
  btnclicked;
  selectedRow: any;
  PopupType: string;
  OverstartLeftPosition;
  OverstartTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startTopPosition: number;
  startLeftPosition: number;
  selectedRole;
  selectedRegion;
  selectedCostCenter;
  selectedSubCostCenter;
  RoleListSet = [];
  CostCenterList = [];
  SubCostCenterList = [];
  RoleParams = {
    bindLabelProp: 'RoleIDName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  CostCenterParams = {
    bindLabelProp: 'CostCenterTitle',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterTitle',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  RegionItems;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  CheckBoxStatus = true;
  ModuleCode;
  constructor(private router: Router,
    private Actor: ActorService,
    private UserSetting: UserSettingsService,
    private RegionList: RegionListService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.colDef = [
      {
        headerName: 'شناسه کاربر',
        field: 'UserID',
        width: 90,
        resizable: true
      },
      {
        headerName: 'شخص',
        field: 'ActorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نام کاربری ',
        field: 'LoginName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'کد نقش',
        field: 'RoleID',
        width: 50,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'مرکز هزینه اصلی ',
        field: 'CostCenterName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'مرکز هزینه فرعی',
        field: 'SubCostCenterName',
        width: 200,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 40;
    this.CheckBoxStatus = true;
    // this.userRegionRoleData = this.UserSetting.SearchUsersRole(null); //RFC 46730
    this.userRegionRoleData = of([]);
    this.RegionList.GetRegionList(this.ModuleCode).subscribe(res => {
      this.RegionItems = res;
    });
    this.UserSetting.GetAllRole().subscribe(ress => {
      this.RoleListSet = ress;
    });
  }
  getUsersRolesListData(): void {
    // tslint:disable-next-line:max-line-length
    this.userRegionRoleData = this.UserSetting.SearchUsersRole(this.CheckBoxStatus, this.RegionParams.selectedObject, this.RoleParams.selectedObject, this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject);
  }
  popupclosed() {
    this.btnclicked = false;
  }
  closeModal() {
    this.UsersRoleRegionClosed.emit(true);
  }
  onChangeRoleObj(newObj) {
    this.selectedRole = newObj;
  }
  onChangeRegion(newObj) {
    this.selectedRegion = newObj;
    this.CostCenterParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.Actor.GetCostCenterByRegion(this.RegionParams.selectedObject).subscribe(res => {
      this.CostCenterList = res;
      this.CostCenterParams.selectedObject = res[0];
    });
  }
  onChangeCostCenterObj(newObj) {
    this.selectedCostCenter = newObj;
    this.SubCostCenterParams.selectedObject = null;
    this.Actor.GetSubCostCenterByCostCenter(this.selectedCostCenter).subscribe(res => {
      this.SubCostCenterList = res;
      this.SubCostCenterParams.selectedObject = res[0];
    });
  }
  onChangeSubCostCenterObj(newObj) {
    this.selectedSubCostCenter = newObj;
    // tslint:disable-next-line:max-line-length
    //   this.Actor.GetListByRegionCode(this.RegionParams.selectedObject, this.selectedCostCenter, this.selectedSubCostCenter).subscribe(res => {
    //     this.RoleListSet = res;
    // });
  }
  OnSearch() {
    this.userRegionRoleData = of([]);
    this.getUsersRolesListData();
  }
  OnCheckBoxChange(event) {
    this.CheckBoxStatus = event;
  }
}
