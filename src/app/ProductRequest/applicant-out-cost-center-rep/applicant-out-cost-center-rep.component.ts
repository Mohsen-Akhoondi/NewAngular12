import { Component, Input, OnInit } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

@Component({
  selector: 'app-applicant-out-cost-center-rep',
  templateUrl: './applicant-out-cost-center-rep.component.html',
  styleUrls: ['./applicant-out-cost-center-rep.component.css']
})
export class ApplicantOutCostCenterRepComponent implements OnInit {

  @Input() ModuleCode;
  RoleListSet = [];
  rowData = [];
  type: string;
  columnDef;
  CurrentUserSubCostCenter;
  private sub: any;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  btnclicked = false;
  HaveMaxBtn = false;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;


  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true,
    clearable: false
  };

  RoleParams = {
    bindLabelProp: 'RoleIDName',
    bindValueProp: 'RoleID',
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
    type: 'role',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [
          { HeaderCaption: 'کد نقش', HeaderName: 'RoleID', width: 35, MinTermLenght: 1, SearchOption: 0 },
          { HeaderCaption: 'نام ', HeaderName: 'RoleIDName', width: 53, MinTermLenght: 3, SearchOption: 0 }
        ],
      SearchItemHeader:
        [
          { HeaderCaption: 'کد نقش', width: 35, },
          { HeaderCaption: 'نام ', width: 53, }
        ],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  FromCostCenterItems;
  FromCostCenterParams = {
    bindLabelProp: 'CostCenterTitle',
    bindValueProp: 'CostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ToCostCenterItems;
  ToCostCenterParams = {
    bindLabelProp: 'CostCenterTitle',
    bindValueProp: 'CostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  FromSubCostCenterItems;
  FromSubCostCenterParams = {
    bindLabelProp: 'SubCostCenterTitle',
    bindValueProp: 'SubCostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ToSubCostCenterItems;
  ToSubCostCenterParams = {
    bindLabelProp: 'SubCostCenterTitle',
    bindValueProp: 'SubCostCenterCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  CustomCheckBoxConfig1: CustomCheckBoxModel = new CustomCheckBoxModel();
  IsChecked = false;


  constructor(private RegionList: RegionListService,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private ContractList: ContractListService,
    private router: Router,
    private RefreshRoleItems: RefreshServices,) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });


    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام شخص',
        field: 'ActorName',
        width: 200,
        resizable: true
      },

      {
        headerName: ' کد ملی',
        field: 'IdentityNo',
        width: 100,
        resizable: true
      },

      {
        headerName: ' نام نقش',
        field: 'RoleName',
        width: 150,
        resizable: true
      },

      {
        headerName: 'کد مرکز',
        field: 'CostCenterCode',
        width: 80,
        resizable: true
      },
      {
        headerName: ' نام مرکز هزینه اصلی',
        field: 'CostCenterName',
        width: 200,
        resizable: true
      },

      {
        headerName: ' کد مرکز',
        field: 'SubCostCenterCode',
        width: 80,
        resizable: true
      },

      {
        headerName: ' نام مرکز هزینه فرعی ',
        field: 'SubCostCenterName',
        width: 250,
        resizable: true
      },

    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig1.color = 'state p-primary';
    this.CustomCheckBoxConfig1.icon = 'fa fa-check';
    this.CustomCheckBoxConfig1.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig1.AriaWidth = 14.5;
    this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = res[0].RegionCode;
    });

  }

  onChangeRegion(ARegionCode) {

    this.RegionParams.selectedObject = ARegionCode;
    this.RoleParams.selectedObject = null;
    this.FromSubCostCenterParams.selectedObject = null;
    this.ToSubCostCenterParams.selectedObject = null;
    this.FromCostCenterParams.selectedObject = null;
    this.ToCostCenterParams.selectedObject = null;


  }
  ShowMessageBoxWithOkBtn(message) {

    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    // this.alertMessageParams.HaveYesBtn = false;
    // this.alertMessageParams.HaveNoBtn = false;
  }


  onChangeRoleObj(event) {

  }

  RoleNameOpened() {
    this.ContractList.GetRoleNameList(0, '', 1, 30).subscribe(res => {
      this.RoleListSet = res.List;
      this.RefreshRoleItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'role'
      });

    });

  }

  RoleName_FetchMore(event) {
    this.RoleParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.ContractList.GetRoleNameList(event.SearchOption,
        event.term,
        event.PageNumber,
        event.PageSize).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.RoleListSet.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.RoleListSet.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshRoleItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'role'

      });
    });

  }

  RoleNameDoSearch(event) {
    this.RegionParams.loading = true;
    this.ContractList.GetRoleNameList(event.SearchOption,
      event.term,
      event.PageNumber,
      event.PageSize).subscribe(res => {
        this.RoleListSet = res.List,
          this.RefreshRoleItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'role'
          });
      });
    this.RegionParams.loading = false;

  }

  onChangeCostCenter(event, type) {
    switch (type) {

      case 'From':
        this.ToCostCenterParams.selectedObject = event;
        this.FromSubCostCenterParams.selectedObject = null;
        this.ToSubCostCenterParams.selectedObject = null;
        break;

      case 'To':
        this.FromSubCostCenterParams.selectedObject = null;
        this.ToSubCostCenterParams.selectedObject = null;
        break;

      default:
        break;
    }
  }

  OnOpenNgSelect(type, IsFill = true, FillResolve = null) {
    switch (type) {
      case 'CostCenter':
        this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, this.ModuleCode, false).subscribe(res => {
          this.FromCostCenterItems = res
          this.ToCostCenterItems = res
          if (IsFill) {
            this.RegionParams.selectedObject = this.CurrentUserSubCostCenter ?
              this.CurrentUserSubCostCenter.RegionCode : this.RegionItems[0].RegionCode;
          }

        });
        break;
      case 'SubCostCenter':
        this.ProductRequest.GetSubCostCenterCode(this.RegionParams.selectedObject, this.FromCostCenterParams.selectedObject, this.ToCostCenterParams.selectedObject).subscribe(res => {
          this.FromSubCostCenterItems = res
          this.ToSubCostCenterItems = res
        });
        break;
      default:
        break;

    }
  }

  onSubCostCenterSelectedChange(event) {
    this.ToSubCostCenterParams.selectedObject = event;

  }

  RowClick(InputValue) { }

  onCellEditingStarted(event) { }

  onGridReady(params: { api: any; }) {

  }

  Search() {

    if (this.RoleParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('لطفا نقش را وارد کنید');
      return;
    }
    if (this.FromCostCenterParams.selectedObject == null) {
      this.ShowMessageBoxWithOkBtn('لطفا مرکز هزینه را وارد کنید');
      return;
    }
    this.ProductRequest.GetApplicantOutCost(this.RegionParams.selectedObject, this.RoleParams.selectedObject,
      this.FromCostCenterParams.selectedObject, this.ToCostCenterParams.selectedObject,
      this.FromSubCostCenterParams.selectedObject, this.ToSubCostCenterParams.selectedObject,this.IsChecked).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.rowData = [];
          this.type = 'message-box';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.alertMessageParams.message = 'رکوردی جهت نمایش یافت نشد';
          this.startLeftPosition = 500;
          this.startTopPosition = 100;
        }
      });


  }

  OnCheckBoxChanged(event) {
    this.IsChecked = event;
  } 

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);

  }

}