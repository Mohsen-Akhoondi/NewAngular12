import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { isUndefined, isNumber } from 'util';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('IsDefault') IsDefault: TemplateRef<any>;
  @ViewChild('AccessType') AccessType: TemplateRef<any>;


  Role_colDef: any;
  Role_rowData: any;
  Role_gridApi: any;

  UserRegion_colDef: any;
  UserRegion_rowData: any;
  UserRegion_gridApi: any;

  UserRegionRole_colDef: any;
  UserRegionRole_rowData: any;
  UserRegionRole_gridApi: any;

  UserCostCenter_colDef: any;
  UserCostCenter_rowData: any;
  UserCostCenter_gridApi: any;

  UnitPatternUserRegion_colDef: any;
  UnitPatternUserRegion_rowData: any;
  UnitPatternUserRegion_gridApi: any;

  PersonItems: any;
  CheckValidate = false;
  IdentityNo: any;
  LoginName = '';
  ActorID = 0;
  UserID = 0;
  RegionCode = -1;
  IsLoading = false;
  mainBodyHeight = 90;
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
  btnclicked: boolean;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  UsersRegionID = 0;
  UserObject: any;
  SelectedUserRegionRow: any;
  DeclareLoginName = 0;

  // ---------------------- virtual scroll ---------------------------
  NgSelectRoleItems;
  NgSelectRoleParams = {
    bindLabelProp: 'RoleIDName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'role'
  };

  NgSelectUserRegionRoleItems;
  NgSelectUserRegionRoleParams = {
    bindLabelProp: 'RoleIDName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'user-region-role'
  };


  NgSelectUnitTopicItems;
  NgSelectUnitTopicParams = {
    bindLabelProp: 'UnitTopicName',
    bindValueProp: 'UnitTopicCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'unit-pattern'

  };

  NgSelectCostCenterItems;
  NgSelectCostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'cost-center'
  };


  NgSelectSubCostCenterItems;
  NgSelectSubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    type: 'sub-cost-center'
  };

  NgSelectUserRegionItems;
  NgSelectUserRegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    clearable: false,
    type: 'user-region'
  };
  PixelWidth: number;
  IsWFSendSms = true;
  ModuleCode;
  HaveSave = false;
  // -------------------------------------------------------------------

  constructor(private UserDetails: UserSettingsService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private router: Router,
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private ContractList: ContractListService,
    private route: ActivatedRoute,
    ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.Role_colDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleIDName',

        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectRoleParams,
          Items: [],
          Owner: this
        },

        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RoleIDName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RoleIDName) {
            params.data.RoleIDName = params.newValue.RoleIDName;
            params.data.RoleID = params.newValue.RoleID ? params.newValue.RoleID : params.newValue.RoleIDName.RoleID;
            return true;
          } else {
            params.data.RoleIDName = '';
            params.data.RoleID = null;
            return false;
          }
        },
        editable: true,
        width: 450,
        resizable: true
      }
    ];

    this.UnitPatternUserRegion_colDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: ' محل هزینه',
        field: 'UnitTopicName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectUnitTopicParams,
          Items: [],
          Owner: this
        },

        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.UnitTopicName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.UnitTopicName) {
            params.data.UnitTopicName = params.newValue.UnitTopicName;
            params.data.UnitPatternID = params.newValue.UnitPatternID;
            return true;
          } else {
            params.data.UnitTopicName = '';
            params.data.UnitPatternID = null;
            return false;
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
    ];

    this.UserCostCenter_colDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'مرکز هزینه اصلی',
        field: 'CostCenterName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectCostCenterParams,
          Items: [],
          Owner: this
        },

        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CostCenterName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.CostCenterName) {
            params.data.CostCenterName = params.newValue.CostCenterName;
            params.data.CostCenterId = params.newValue.CostCenterId;
            params.data.SubCostCenterName = '';
            params.data.SubCostCenterId = null;
            return true;
          } else {
            params.data.CostCenterName = '';
            params.data.CostCenterId = null;
            params.data.SubCostCenterName = '';
            params.data.SubCostCenterId = null;
            return false;
          }
        },
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'مرکز هزینه فرعی',
        field: 'SubCostCenterName',

        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectSubCostCenterParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SubCostCenterName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.SubCostCenterName) {
            params.data.SubCostCenterName = params.newValue.SubCostCenterName;
            params.data.SubCostCenterId = params.newValue.SubCostCenterId;
            return true;
          } else {
            params.data.SubCostCenterName = '';
            params.data.SubCostCenterId = null;
            return false;
          }
        },
        editable: true,
        width: 200,
        resizable: true
      }
    ];

    this.UserRegionRole_colDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleIDName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectUserRegionRoleParams,
          Items: [],
          Owner: this
        },

        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RoleIDName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RoleIDName) {
            params.data.RoleIDName = params.newValue.RoleIDName;
            params.data.RoleID = params.newValue.RoleID ? params.newValue.RoleID : params.newValue.RoleIDName.RoleID;
            return true;
          } else {
            params.data.RoleIDName = '';
            params.data.RoleID = null;
            return false;
          }
        },
        editable: true,
        width: 450,
        resizable: true
      }
    ];
  }

  ngOnInit() {
      this.UserDetails.GetModulOPByUser(this.ModuleCode).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
            case 16:
              this.HaveSave = true;
              break;
            default:
              break;
          }
        });

      });
    this.UnitPatternUserRegion_rowData = [];
    this.UserCostCenter_rowData = [];
    this.Role_rowData = [];
    this.UserRegionRole_rowData = [];

    this.ContractList.GetRolesList().subscribe(res => {
      this.Role_colDef[1].cellEditorParams.Items = res;
    });

  }

  ngAfterViewInit(): void {

    this.UserRegion_colDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectUserRegionParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.RegionName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.RegionName) {
            params.data.RegionName = params.newValue.RegionName;
            params.data.RegionCode = params.newValue.RegionCode;
            return true;
          } else {
            params.data.RegionName = '';
            params.data.RegionCode = null;
            return false;
          }
        },
        editable: true,
        width: 200,
        resizable: true
      },
      {
        headerName: 'دسترسی کامل',
        field: 'AccessType',
        editable: true,
        width: 100,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function currencyFormatter(params) {
          return params.value;
        },
        valueGetter: (params) => {
          if (isNumber(params.data.AccessType)) {
            return params.data.AccessType;
          }
          if (params.data.AccessType) {
            return 2;
          } else {
            return 1;
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.AccessType = 2;
            return true;
          } else {
            params.data.AccessType = 1;
            return false;
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.AccessType
        },
      },
      {
        headerName: 'واحداجرایی پیش فرض',
        field: 'IsDefault',
        editable: true,
        width: 200,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsDefault
        }
      },
    ];
    this.UserRegion_rowData = [];
    this.UnitPatternUserRegion_rowData = [];
    this.UserCostCenter_rowData = [];
    this.UserRegionRole_rowData = [];

    $('#divRight').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });
  }

  Role_onGridReady(params: { api: any; }) {
    this.Role_gridApi = params.api;
  }

  UserRegion_onGridReady(params: { api: any; }) {
    this.UserRegion_gridApi = params.api;
  }

  UserCostCenter_onGridReady(params: { api: any; }) {
    this.UserCostCenter_gridApi = params.api;
  }

  UserRegionRole_onGridReady(params: { api: any; }) {
    this.UserRegionRole_gridApi = params.api;
  }

  UnitPatternUserRegion_onGridReady(params: { api: any; }) {
    this.UnitPatternUserRegion_gridApi = params.api;
  }

  Person_FetchMore(event) {
    this.NgSelectPersonParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Actor.GetActorPaging(event.PageNumber,
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
    this.NgSelectPersonParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
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
        this.IdentityNo = res.List.find(x => x.ActorId === this.ActorID).IdentityNo;
      });
    this.NgSelectPersonParams.loading = false;
  }

  onSearch() {
    if (this.ActorID === 0 && this.LoginName === '') {
      this.ShowMessageBoxWithOkBtn('اطلاعات را کامل وارد نمایید');
      return;
    }

    if (this.NgSelectPersonParams.selectedObject) {
      this.ActorID = this.NgSelectPersonParams.selectedObject;
    }

    this.Actor.GetUser(this.ActorID, this.LoginName, null).subscribe(res => {
      if (res != null && res.ActorId > 0 && res.UserID > 0) {
        this.UserObject = res;
        this.UserID = this.UserObject.UserID;
        this.Role_rowData = this.UserObject.UsersRolesList;
        this.UserRegion_rowData = this.UserObject.UsersRegionList;
        this.UserRegionRole_rowData = this.UserObject.UsersRegionList.UserRegionRoleList;
        this.UnitPatternUserRegion_rowData = this.UserObject.UsersRegionList.UnitPatternUserRegionList;
        this.UserCostCenter_rowData = this.UserObject.UsersRegionList.UserCostCenterList;
        this.IdentityNo = res.IdentityNo;
        this.IsWFSendSms = res.IsWFSendSms;
        this.PersonOpened(res.ActorId);

        if (this.LoginName === '' || (this.LoginName !== '' &&
          res.LoginName !== '' &&
          this.LoginName !== res.LoginName)) {
          this.LoginName = res.LoginName;
        }
      } else if (res != null && res.ActorId === 0 && res.UserID === 0) {
        this.ShowMessageBoxWithOkBtn('اطلاعات کاربری این شخص در سیستم موجود نمیباشد. میتوانید با وارد کردن یک نام کاربری جدید آن را ثبت کنید');
        this.UserID = 0;
        this.UserCostCenter_rowData = [];
        this.UserRegion_rowData = [];
        this.UnitPatternUserRegion_rowData = [];
        this.UserRegionRole_rowData = [];
        this.Role_rowData = [];
        this.IdentityNo = '';
      }
    });
  }

  PersonOpened(AActorID) {
    this.Actor.GetActorPaging(1, 30, '', '', true, false, this.IsLoading, AActorID).subscribe(res => {
      this.PersonItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-search'
      });

      if (AActorID) {
        this.NgSelectPersonParams.selectedObject = AActorID;
        this.IdentityNo = res.List.find(x => x.ActorId === AActorID).IdentityNo;
      }
    });
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed(event) {
    this.btnclicked = false;
    this.type = '';
  }

  onClear() {
    this.LoginName = '';
    this.UserObject = null;
    this.ActorID = 0;
    this.UserID = 0;
    this.UserCostCenter_rowData = [];
    this.UserRegion_rowData = [];
    this.UnitPatternUserRegion_rowData = [];
    this.UserRegionRole_rowData = [];
    this.Role_rowData = [];
    this.NgSelectPersonParams.selectedObject = null;
    this.IdentityNo = '';
    this.IsWFSendSms = true;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.PixelWidth = 360;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.PixelWidth = 360;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  MessageBoxAction(ActionResult) {

    if (ActionResult === 'YES') {
      this.DeclareLoginName = 1;
    } else {
      this.DeclareLoginName = 0;
    }
  }

  Person_OnChange(data) {
    if (isUndefined(data) || data === null) {
      this.onClear();
    } else {
      this.ActorID = data;
    }
  }

  UserRegion_onCellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'RegionName') {
      this.Region.GetRegionList(this.ModuleCode, false).subscribe(res => {
        this.UserRegion_colDef[1].cellEditorParams.Items = res;
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'user-region'
        });
      });
    }
  }

  UserRegionRole_onCellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'RoleIDName') {
      const RoleList = [];
      this.Role_rowData.forEach(items => {
        const obj = {
          RoleID: items.RoleID,
          RoleIDName: items.RoleIDName
        };
        RoleList.push(obj);
      });
      this.UserRegionRole_colDef[1].cellEditorParams.Items = RoleList;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: RoleList,
        type: 'user-region-role'
      });

    }
  }

  UserCostCenter_onCellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'CostCenterName') {
      this.ProductRequest.GetCostCenterByRegion(this.RegionCode, null, null, false).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'cost-center'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'SubCostCenterName') {

      this.ProductRequest.GetSubCostCenter(event.data.CostCenterId, null, false).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'sub-cost-center'
        });
      });
    }
  }

  UnitPatternUserRegion_onCellEditingStarted(event) {

    if (event.colDef && event.colDef.field === 'UnitTopicName') {
      this.ProductRequest.GetVWExeUnitByRegion(this.RegionCode).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'unit-pattern'
        });
      });
    }
  }

  // -----------------------------------CELL VALUE CHANGED-------------------------------------

  UserRegion_onCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'IsDefault') {
      if (event.newValue) {
        const itemsToUpdate = [];
        this.UserRegion_gridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.IsDefault = event.newValue;
            itemsToUpdate.push(node.data);
          }
        });
        this.UserRegion_gridApi.updateRowData({ update: itemsToUpdate });
      }
    }
  }

  UserRegionRole_onCellValueChanged(event) {
    const items = [];
    this.UserRegionRole_gridApi.forEachNode(node => {
      node.data.UserRegionID = this.SelectedUserRegionRow.UsersRegionID;
      items.push(node.data);
    });
    this.UserRegion_gridApi.forEachNode(node => {
      if (node.data.UsersRegionID === this.SelectedUserRegionRow.UsersRegionID) {
        node.data.UserRegionRoleList = items;
      }
    });
  }

  UnitPatternUserRegion_onCellValueChanged(event: any) {
    const items = [];
    this.UnitPatternUserRegion_gridApi.forEachNode(node => {
      node.data.UserRegionID = this.SelectedUserRegionRow.UsersRegionID;
      items.push(node.data);
    });
    this.UserRegion_gridApi.forEachNode(node => {
      if (node.data.UsersRegionID === this.SelectedUserRegionRow.UsersRegionID) {
        node.data.UnitPatternUserRegionList = items;
      }
    });
  }
  UnitPatternUserRegion_onDeletedRow(event) {
    if (event) {
      const items = [];
      this.UnitPatternUserRegion_gridApi.forEachNode(node => {
        node.data.UserRegionID = this.SelectedUserRegionRow.UsersRegionID;
        items.push(node.data);
      });
      this.UserRegion_gridApi.forEachNode(node => {
        if (node.data.UsersRegionID === this.SelectedUserRegionRow.UsersRegionID) {
          node.data.UnitPatternUserRegionList = items;
        }
      });
    }
  }
 
  UserCostCenter_onCellValueChanged(event) {
    const items = [];
    this.UserCostCenter_gridApi.forEachNode(node => {
      node.data.UserRegionID = this.SelectedUserRegionRow.UsersRegionID;
      items.push(node.data);
    });
    this.UserRegion_gridApi.forEachNode(node => {
      if (node.data.UsersRegionID === this.SelectedUserRegionRow.UsersRegionID) {
        node.data.UserCostCenterList = items;
      }
    });
  }
  UserCostCenter_onDeletedRow(event) {
    if (event) {
      const items = [];
      this.UserCostCenter_gridApi.forEachNode(node => {
        node.data.UserRegionID = this.SelectedUserRegionRow.UsersRegionID;
        items.push(node.data);
      });
      this.UserRegion_gridApi.forEachNode(node => {
        if (node.data.UsersRegionID === this.SelectedUserRegionRow.UsersRegionID) {
          node.data.UserCostCenterList = items;
        }
      });
    }
  }

  // -------------------------------------SAVE-------------------------------------------

  onSave() {
    if (this.ActorID > 0 && this.UserID === 0 && (isUndefined(this.UserObject) || this.UserObject === null) && this.LoginName) {
      this.UserObject = {
        LoginName: this.LoginName,
        ActorId: this.ActorID,
        UsersRolesList: [],
        UsersRegionList: []
      };
    }
    if (this.ActorID > 0 && this.UserID === 0 && isUndefined(this.UserObject) && this.LoginName === '') {
      this.ShowMessageBoxWithOkBtn('اطلاعات را کامل وارد نمایید');
    } else if (this.ActorID === 0 && this.UserID === 0) {
      this.ShowMessageBoxWithOkBtn('اطلاعات را کامل وارد نمایید');
    } else if (isUndefined(this.UserObject)) {
      this.ShowMessageBoxWithOkBtn('اطلاعات را کامل وارد نمایید');
    } else if (this.UserID === 0 && this.LoginName === '') {
      this.ShowMessageBoxWithOkBtn('اطلاعات را کامل وارد نمایید');
    } else {
      this.Role_gridApi.stopEditing();
      this.UserRegion_gridApi.stopEditing();
      this.UserCostCenter_gridApi.stopEditing();
      this.UnitPatternUserRegion_gridApi.stopEditing();
      this.UserRegionRole_gridApi.stopEditing();

      const RoleList = [];
      const UserRegionList = [];

      if (this.Role_gridApi) {
        this.Role_gridApi.forEachNode(function (node) {
          RoleList.push(node.data);
        });
      }

      if (this.UserRegion_gridApi) {
        this.UserRegion_gridApi.forEachNode((item_1) => {
          if (item_1.data.UnitPatternUserRegionList) {
            item_1.data.UnitPatternUserRegionList.forEach(item_2 => {
              item_2.UsersRegionID = item_1.data.UsersRegionID;
            });
          }

          if (item_1.data.UserCostCenterList) {
            item_1.data.UserCostCenterList.forEach(item_3 => {
              item_3.UsersRegionID = item_1.data.UsersRegionID;
            });
          }
          if (item_1.data.UserRegionRoleList) {
            item_1.data.UserRegionRoleList.forEach(item_4 => {
              item_4.UsersRegionID = item_1.data.UsersRegionID;
            });
          }
          UserRegionList.push(item_1.data);
        });
      }

      this.UserObject.UsersRolesList = RoleList;
      this.UserObject.UsersRegionList = UserRegionList;

      this.UserDetails.SaveUserObject(this.UserObject, this.IsWFSendSms).subscribe(res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
          this.UserObject = res;
          this.UserObject.UsersRolesList = this.UserObject.UsersRolesList;
          this.UserObject.UsersRegionList = this.UserObject.UsersRegionList;
          this.onSearch();
        }
      });
    }
  }

  // ---------------------------------------ON Row Click----------------------------------------------

  UserRegion_onRowClick(event) {
    this.SelectedUserRegionRow = event.data;
    this.UnitPatternUserRegion_rowData = [];
    this.UserCostCenter_rowData = [];
    this.UserRegionRole_rowData = [];
    if (!isUndefined(event.data.RegionCode)) {

      this.UsersRegionID = event.data.UsersRegionID;
      this.RegionCode = event.data.RegionCode;

      this.UnitPatternUserRegion_rowData = event.data.UnitPatternUserRegionList;
      this.UserCostCenter_rowData = event.data.UserCostCenterList;
      this.UserRegionRole_rowData = event.data.UserRegionRoleList;

    } else {
      this.UsersRegionID = -1;
      this.RegionCode = event.data.RegionName.RegionCode;
    }
  }

  UserRegion_onDeletedRow(event) {
    this.UserRegionRole_rowData = [];
    this.UserCostCenter_rowData = [];
    this.UnitPatternUserRegion_rowData = [];
  }
  UserRegionRole_onDeletedRow(event) {
    if (event) {
      const items = [];
      this.UserRegionRole_gridApi.forEachNode(node => {
        node.data.UserRegionID = this.SelectedUserRegionRow.UsersRegionID;
        items.push(node.data);
      });
      this.UserRegion_gridApi.forEachNode(node => {
        if (node.data.UsersRegionID === this.SelectedUserRegionRow.UsersRegionID) {
          node.data.UserRegionRoleList = items;
        }
      });
    }
  }
  Role_onDeletedRow(event) {
    if (event) {
      const items = [];
      this.Role_gridApi.forEachNode(node => {
        items.push(node.data);
      });
      this.SelectedUserRegionRow.UserRoleList = items;
    }
  }

  onSearchUserWorkLog() {
    this.type = 'created-user-log';
    this.btnclicked = true;
    this.startLeftPosition = 150;
    this.startTopPosition = 50;
    this.PixelWidth = 800;
  }
  onSearchUsersRole() {
    this.type = 'user-role-in-region';
    this.btnclicked = true;
    this.startLeftPosition = 150;
    this.startTopPosition = 50;
    this.PixelWidth = 1100;
  }
  IsSmsRedioClick(IsWFSendSms) {
    this.IsWFSendSms = IsWFSendSms;
  }
}
