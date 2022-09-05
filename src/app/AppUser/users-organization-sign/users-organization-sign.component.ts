import { Component, Input, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { isUndefined } from 'util';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { event } from 'jquery';
declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-users-organization-sign',
  templateUrl: './users-organization-sign.component.html',
  styleUrls: ['./users-organization-sign.component.css']
})
export class UsersOrganizationSignComponent implements OnInit {
  @ViewChild('SignImageValid') SignImageValid: TemplateRef<any>;
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  private sub: any;
  private gridApi;
  type: any;
  UserRegion_rowData: any;
  Isclicked: boolean;
  ActorName: string;
  Role_rowData: any;
  UserObject: any;
  SelectedUserRoles: any[];
  LoginName = '';
  ReigonListSet = [];
  AutomationOrganizationList = [];
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'AutomationOrganizationTitle',
    bindValueProp: 'AutomationOrganizationCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  rowData = [];
  columnDef;
  UserSignColDef;
  UserSignList = [];
  btnclicked = false;
  PopupType: string;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '' };
  startLeftPosition: number;
  startTopPosition: number;
  ModuleCode;
  HaveHeader: boolean;
  IsLoading = false;
  UserSignGridApi: any;
  SelectedItemRow: any;

  NgSelectModuleParams = {
    bindLabelProp: 'ModuleName',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'module'
  };

  UserOrganizationTypeParams =
    {
      bindLabelProp: 'UserOrganizationTypeName',
      bindValueProp: 'UserOrganizationTypeCode',
      selectedObject: null,
      IsDisabled: false,
      loading: false,
      AllowParentSelection: true,
      MinWidth: '90px',
      DropDownMinWidth: '200px',
      type: 'UserOrganizationType'
    };

  UserOrganizationTypeList = [
    { UserOrganizationTypeCode: 1, UserOrganizationTypeName: 'صورت وضعیت' },
    { UserOrganizationTypeCode: 2, UserOrganizationTypeName: 'درخواست معامله' }
  ];

  NgAutomationOrganizationParams = {
    Items: [],
    bindLabelProp: 'AutomationOrganizationTitle',
    bindValueProp: 'AutomationOrganizationCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    type: 'AutomationOrganization'

  };

  RegionCode;
  UserName;
  ActorID;
  disabled = false;
  ContractorType = true;
  ActorPageCount;
  ActorTotalItemCount;
  ActorItems;
  NgSelectActorParams = {
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
    type: 'product-request-contract-contractor',
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

  constructor(private ContractService: ContractListService,
    private route: ActivatedRoute,
    private RefreshPersonItems: RefreshServices,
    private router: Router,
    private Region: RegionListService,
    private Modules: ModuleService,
    private Actor: ActorService) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {

    this.columnDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'عنوان',
        field: 'SignTitle',
        width: 300,
        resizable: true
      },
      {
        headerName: 'امضاء',
        field: 'SignImageBase64String',
        width: 250,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.SignImageValid
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.SignImage = true;
            return true;
          } else {
            params.data.SignImage = false;
            params.data.SignImageBase64String = null;
            return false;
          }
        },
        resizable: true
      },
    ];

    this.UserSignColDef = [
      {
        headerName: 'رديف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },

      {
        headerName: 'نام واحد اتوماسیون',
        field: 'AutomationOrganizationName',
        width: 300,
        resizable: true,
        editable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgAutomationOrganizationParams,
          Items: [],
          Owner: this
        },

        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.AutomationOrganizationName;
          } else {
            return '';
          }
        },

        valueSetter: (params) => {
          if (params.newValue && params.newValue.AutomationOrganizationCode) {
            params.data.AutomationOrganizationName = params.newValue.AutomationOrganizationName;
            params.data.AutomationOrganizationCode = params.newValue.AutomationOrganizationCode;
            const items = [];
            this.UserSignGridApi.forEachNode(node => {
              node.data.UserOrganizationSignID = node.data.UserOrganizationSignID && node.data.UserOrganizationSignID > 0
                && !isUndefined(node.data.UserOrganizationSignID)
                ? node.data.UserOrganizationSignID : -1;
              node.data.OrganizationSignID = node.data.OrganizationSignID && node.data.OrganizationSignID > 0
                && !isUndefined(node.data.OrganizationSignID) ? node.data.OrganizationSignID
                : this.SelectedItemRow.OrganizationSignID;
              node.data.UserID = node.data.UserID && node.data.UserID > 0
                && !isUndefined(node.data.UserID) ? node.data.UserID
                : this.SelectedItemRow.UserID;
              items.push(node.data);
            });
            this.SelectedItemRow.UsersOrganizationSignList = items;
            return true;
          } else {
            params.data.AutomationOrganizationCode = null;
            params.data.AutomationOrganizationName = null;
            return false;
          }

        }
      },





      {
        headerName: 'نام نوع امضا',
        field: 'UserOrganizationTypeName',
        width: 200,
        resizable: true,
        editable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.UserOrganizationTypeParams,
          Items: this.UserOrganizationTypeList,
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.UserOrganizationTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.UserOrganizationTypeCode) {
            params.data.UserOrganizationTypeName = params.newValue.UserOrganizationTypeName;
            params.data.UserOrganizationTypeCode = params.newValue.UserOrganizationTypeCode;
            const items = [];
            this.UserSignGridApi.forEachNode(node => {
              node.data.UserOrganizationSignID = node.data.UserOrganizationSignID && node.data.UserOrganizationSignID > 0
                && !isUndefined(node.data.UserOrganizationSignID)
                ? node.data.UserOrganizationSignID : -1;
              node.data.OrganizationSignID = node.data.OrganizationSignID && node.data.OrganizationSignID > 0
                && !isUndefined(node.data.OrganizationSignID) ? node.data.OrganizationSignID
                : this.SelectedItemRow.OrganizationSignID;
              node.data.UserID = node.data.UserID && node.data.UserID > 0
                && !isUndefined(node.data.UserID) ? node.data.UserID
                : this.SelectedItemRow.UserID;
              items.push(node.data);
            });
            this.SelectedItemRow.UsersOrganizationSignList = items;
            return true;
          } else {
            params.data.UserOrganizationTypeName = '';
            params.data.UserOrganizationTypeCode = null;
            return false;
          }
        },
      },

      {
        headerName: 'نام ماژول',
        field: 'ModuleName',
        width: 200,
        resizable: true,
        editable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectModuleParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ModuleName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ModuleCode) {
            params.data.ModuleCode = params.newValue.ModuleCode;
            params.data.ModuleName = params.newValue.ModuleName;
            const items = [];
            this.UserSignGridApi.forEachNode(node => {
              node.data.UserOrganizationSignID = node.data.UserOrganizationSignID && node.data.UserOrganizationSignID > 0
                && !isUndefined(node.data.UserOrganizationSignID)
                ? node.data.UserOrganizationSignID : -1;
              node.data.OrganizationSignID = node.data.OrganizationSignID && node.data.OrganizationSignID > 0
                && !isUndefined(node.data.OrganizationSignID) ? node.data.OrganizationSignID
                : this.SelectedItemRow.OrganizationSignID;
              node.data.UserID = node.data.UserID && node.data.UserID > 0
                && !isUndefined(node.data.UserID) ? node.data.UserID
                : this.SelectedItemRow.UserID;
              items.push(node.data);
            });
            this.SelectedItemRow.UsersOrganizationSignList = items;
            return true;
          } else {
            params.data.ModuleCode = null;
            params.data.ModuleName = null;
            return false;
          }
        },
      }
    ];

    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });
  }

  ngOnInit() {
    this.getNewData();
    if (this.InputParam) {
      this.NgSelectRegionParams.selectedObject = this.InputParam.RegionCode;
      this.NgSelectActorParams.selectedObject = this.InputParam.ActorID;

      this.NgAutomationOrganizationParams.selectedObject = this.InputParam.AutomationOrganizationCode;
      this.OpenActor(event);
      this.ContractorType = this.InputParam.ContractorType;
      this.disabled = true;
      this.onSearch();
    }
  }

  getNewData(): void {
    forkJoin([
      this.Modules.GetAutomationOrganizationList(),
    ]).subscribe(res => {
      this.ReigonListSet = res[0];
    });
  }

  onChangeReigonObj(newObj) {
    this.rowData = [];
  }

  onGridReady(Param) {
    this.gridApi = Param.api;
  }

  onUserSignGridReady(Param) {
    this.UserSignGridApi = Param.api;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 545;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }
  popupclosed() {
    this.btnclicked = false;
  }
  closeModal() {
    if (this.InputParam) {
      this.Closed.emit(true);
    } else {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }

  onSearch() {
    this.UserSignList = [];
    this.rowData = [];
    this.RegionCode = this.NgSelectRegionParams.selectedObject;
    this.UserName = this.LoginName;
    this.ActorID = this.NgSelectActorParams.selectedObject;
    this.Actor.GetPersonnelSignList(this.RegionCode, this.UserName, this.ActorID).subscribe((res: any) => {
      this.rowData = res;
    });
  }

  onRowClick(event) {
    this.UserSignGridApi.stopEditing();

    if (event.data.UsersOrganizationSignList) {
      this.UserSignList = event.data.UsersOrganizationSignList;
    } else {
      this.UserSignList = [];
    }
    this.SelectedItemRow = event.data;
  }

  onellEditingStarted(event) {
    const Modulelist = [2932, 2730, 2829];
    if (event.colDef && event.colDef.field === 'ModuleName') {
      this.Modules.GetWebModules(Modulelist).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'module'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'AutomationOrganizationName') {
      this.Modules.GetAutomationOrganizationList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'AutomationOrganization'
        });
      });
    }


  }

  onCellValueChanged(event) {
    const items = [];
    this.UserSignGridApi.forEachNode(node => {
      node.data.UserOrganizationSignID = node.data.UserOrganizationSignID && node.data.UserOrganizationSignID > 0
        && !isUndefined(node.data.UserOrganizationSignID)
        ? node.data.UserOrganizationSignID : -1;
      node.data.OrganizationSignID = node.data.OrganizationSignID && node.data.OrganizationSignID > 0
        && !isUndefined(node.data.OrganizationSignID) ? node.data.OrganizationSignID
        : this.SelectedItemRow.OrganizationSignID;
      node.data.UserID = node.data.UserID && node.data.UserID > 0
        && !isUndefined(node.data.UserID) ? node.data.UserID
        : this.SelectedItemRow.UserID;
      items.push(node.data);
    });
    this.SelectedItemRow.UsersOrganizationSignList = items;
  }

  onDeletedRow(event) {
    if (event) {
      const items = [];
      this.UserSignGridApi.forEachNode(node => {
        items.push(node.data);
      });
      this.SelectedItemRow.UsersOrganizationSignList = items;
    }
  }

  onRowAdd(event) {
    const items = [];
    this.UserSignGridApi.forEachNode(node => {
      node.data.UserOrganizationSignID = node.data.UserOrganizationSignID && node.data.UserOrganizationSignID > 0
        && !isUndefined(node.data.UserOrganizationSignID)
        ? node.data.UserOrganizationSignID : -1;
      node.data.OrganizationSignID = node.data.OrganizationSignID && node.data.OrganizationSignID > 0
        && !isUndefined(node.data.OrganizationSignID) ? node.data.OrganizationSignID
        : this.SelectedItemRow.OrganizationSignID;
      node.data.UserID = node.data.UserID && node.data.UserID > 0
        && !isUndefined(node.data.UserID) ? node.data.UserID
        : this.SelectedItemRow.UserID;
      items.push(node.data);
    });
    this.SelectedItemRow.UsersOrganizationSignList = items;
  }

  onSave() {
    const items = [];
    this.gridApi.forEachNode(element => {
      let ItemNo = 0;
      element.data.UsersOrganizationSignList.forEach(SignItem => {
        ItemNo++;
        SignItem.SignTitle = element.data.SignTitle;
        SignItem.ItemNo = ItemNo;
        items.push(SignItem);
      });
    });

    this.Actor.SaveUsersOrganizationSignList(this.RegionCode, this.UserName, this.ActorID, items).subscribe(
      res => {
        if (this.InputParam) {
          this.Output.emit(true);
        } else {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
        }
      },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با مشکل مواجه شد.');
        this.Output.emit(false);
      }
    );
  }
  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.ActorItems = [];
    this.NgSelectActorParams.selectedObject = null;
    if (this.ContractorType) {
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
    } else {
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectActorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectActorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      // this.NgSelectActorParams.bindLabelProp = 'CorporateName';
    }

    this.Actor.GetActorPaging(1, 30, '', 'IdentityNo', this.ContractorType, false, false).subscribe(res => {
      this.ActorItems = res.List;
      this.ActorTotalItemCount = res.TotalItemCount;
      this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
  }

  FetchMoreActor(event) {
    const ResultList = [];
    this.NgSelectActorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false, null, null, false, null, false, true).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ActorItems = ResultList;
        this.NgSelectActorParams.loading = false;
      }
      );
  }

  OpenActor(event) {
    const ResultList = [];
    //  this.NgSelectActorParams.loading = true;
    // tslint:disable-next-line: max-line-length
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false, this.NgSelectActorParams.selectedObject,
      null, null, false, null, false, true).subscribe(res => {
        this.ActorItems = res.List;
        this.ActorTotalItemCount = res.TotalItemCount;
        this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
      });
    // this.NgSelectActorParams.loading = false;
  }

  doActorSearch(event) {
    this.NgSelectActorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false, null, null, false, null, false, true).subscribe(res => {
        this.ActorItems = res.List;
        this.ActorTotalItemCount = res.TotalItemCount;
        this.ActorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectActorParams.loading = false;
      });
  }
}
