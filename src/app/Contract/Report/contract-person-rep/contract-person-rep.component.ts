import { Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { forkJoin } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ContractPersonRepService } from 'src/app/Services/ContractService/ContractReport/ContractPersonRepService';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isUndefined } from 'util';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-contract-person-rep',
  templateUrl: './contract-person-rep.component.html',
  styleUrls: ['./contract-person-rep.component.css']
})
export class ContractPersonRepComponent implements OnInit {
  @Output() ContractPersonRepClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('IsHavePersonValid') IsHavePersonValid: TemplateRef<any>;
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
    Required: true,
    clearable: false
  };
  FromContractItems;
  FromContractParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'ContractID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    DropDownMinWidth: '300px',
    type: 'from-contract-person-rep',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 10
    }
  };
  ToContractItems;
  ToContractParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'ContractID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'to-contract-person-rep',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد قرارداد', HeaderName: 'ContractCode', width: 35, MinTermLenght: 1, SearchOption: 'ContractCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 10
    }
  };
  FromRoleItems;
  FromRoleParams = {
    bindLabelProp: 'RoleName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  ToRoleItems;
  ToRoleParams = {
    bindLabelProp: 'RoleName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  ContractInfoCol;
  LetterNo;
  ContractInfoList;
  CPRepGridApi;
  IsDown = false;
  SearechClicked = false;
  ModuleCode;
  currentFromContractObject;
  currentToContractObject;
  currentRegionObject;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  btnclicked = false;
  type;
  HaveHeader;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  RegionCode;

  constructor(private router: Router,
              private RegionList: RegionListService,
              private ContractList: ContractListService,
              config: NgSelectConfig,
              private Report: ReportService,
              private RefreshContractItems: RefreshServices,
              private route: ActivatedRoute,
              private CPRep: ContractPersonRepService ) {
            config.notFoundText = 'موردی یافت نشد';
            this.route.params.subscribe(params => {
              this.ModuleCode = +params['ModuleCode'];
            });

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.ContractInfoCol = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 60,
        resizable: true
      },
      {
        headerName: ' کد قرارداد ',
        field: 'ContractTypeCode',
        width: 110,
        resizable: true
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 170,
        resizable: true
      },
      {
        headerName: 'سال مالی قرارداد',
        field: 'FinYearCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 430,
        resizable: true
      },
      {
        headerName: ' دارای عوامل اجرایی ',
        field: 'HavePerson',
        width: 120,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsHavePersonValid
        },
      },
      {
        headerName: ' تعداد عوامل اجرایی ',
        field: 'ContractPersonCount',
        width: 120,
        resizable: true
      }
    ];
  }

  ngOnInit() {
    this.CPRep.SearchContracPerson(-1, -1, -1, -1, -1, -1).subscribe(res => {
this.ContractInfoList = res; });
    forkJoin([
      this.RegionList.GetRegionList(this.ModuleCode, false),
      this.ContractList.GetRolesList()
    ]).subscribe(res => {
      this.RegionItems = res[0];
      this.RegionParams.selectedObject = res[0][0].RegionCode;
      this.RegionCode = res[0][0].RegionCode;
      this.IsDown = true;
      this.ContractList.GetRelatedContract(this.RegionParams.selectedObject).subscribe(ress => {
        this.FromContractItems = ress;
        this.ToContractItems = ress;
      });
      this.FromRoleItems = res[1];
      this.ToRoleItems = res[1];
      this.FromRoleParams.selectedObject = res[1][0].RoleID;
      this.ToRoleParams.selectedObject = res[1][0].RoleID;
    });
  }
  onGridReadyContractInfo(params: { api: any; }) {
    this.CPRepGridApi = params.api;
  }
  onChangeRegion(ARegionCode) {
    this.RegionCode = ARegionCode;
    this.RegionParams.selectedObject = ARegionCode;
    this.FromContractParams.selectedObject = ' ';
    this.ToContractParams.selectedObject = ' ';
    this.ContractList.GetRelatedContract(ARegionCode).subscribe(res => {
      this.FromContractItems = res;
      this.ToContractItems = res;
    });
  }
  onChangeFromContract(event) {
    this.FromContractParams.selectedObject = event;
    this.ToContractParams.selectedObject = event;
    this.currentFromContractObject = this.FromContractItems.find(x => x.ContractID === event);
    this.currentToContractObject = this.ToContractItems.find(x => x.ContractID === event);
    }
  onChangeToContract(event) {
    this.ToContractParams.selectedObject = event;
    this.currentToContractObject = this.ToContractItems.find(x => x.ContractID === event);
  }
  onChangeFromRole(event) {
    this.FromRoleParams.selectedObject = event;
    this.ToRoleParams.selectedObject = event;
  }
  onChangeToRole(event) {
    this.ToRoleParams.selectedObject = event;

  }
  onSearch() {
    if (isUndefined(this.currentFromContractObject)) {
      this.currentFromContractObject = -1;
    }
    if (isUndefined(this.currentToContractObject)) {
      this.currentToContractObject = -1;
    }
    this.CPRep.SearchContracPerson(this.RegionParams.selectedObject,
                                   this.currentFromContractObject.ContractCode,
                                   this.currentToContractObject.ContractCode,
                                   this.FromRoleParams.selectedObject,
                                   this.ToRoleParams.selectedObject,
                                   this.LetterNo).subscribe(res => {
        this.ContractInfoList = res;
                                   });
  }
  RowClick() {}
  onPrint() {
    if (isUndefined(this.currentFromContractObject)) {
      this.currentFromContractObject = -1;
    }
    if (isUndefined(this.currentToContractObject)) {
      this.currentToContractObject = -1;
    } 
    // این گزارش از ابتدای ایجاد هیچ اطلاعاتی را نمایش نمیداده
    // this.CPRep.ShowReport(this.RegionParams.selectedObject,
    //                       this.currentFromContractObject.ContractCode,
    //                       this.currentToContractObject.ContractCode,
    //                       this.FromRoleParams.selectedObject,
    //                       this.ToRoleParams.selectedObject,
    //                       this.LetterNo,
    //                       this.ModuleCode);
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  FetchMoreFromContract(event) {
    this.FromContractParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.ContractList.GetContract4personRepPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.RegionParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        resolve(res.TotalItemCount);
      });
    }).then((TotalItemCount: number) => {
      this.RefreshContractItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'from-contract-person-rep'
      });
    });
    this.FromContractParams.loading = false;
  }

  doFromContractSearch(event) {
    this.FromContractParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractCode';
    }
    this.FromContractParams.loading = true;
    this.ContractList.GetContract4personRepPaging(event.PageNumber, 30, event.term,
    event.SearchOption, this.RegionParams.selectedObject).subscribe((res: any) => {
      this.RefreshContractItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'from-contract-person-rep'
      });
    });
    this.FromContractParams.loading = false;
  }

  FetchMoreToContract(event) {
    this.ToContractParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.ContractList.GetContract4personRepPaging(event.PageNumber, event.PageSize, event.term,
      event.SearchOption, this.RegionParams.selectedObject).subscribe((res: any) => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        resolve(res.TotalItemCount);
      });
    }).then((TotalItemCount: number) => {
      this.RefreshContractItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'to-contract-person-rep'
      });
    });
    this.ToContractParams.loading = false;
  }

  doToContractSearch(event) {
    this.ToContractParams.loading = true;
    if (event.SearchOption === 'null' || event.SearchOption == null) {
      event.SearchOption = 'ContractCode';
    }
    this.FromContractParams.loading = true;
    this.ContractList.GetContract4personRepPaging(event.PageNumber, 30, event.term,
    event.SearchOption, this.RegionParams.selectedObject).subscribe((res: any) => {
      this.RefreshContractItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'to-contract-person-rep'
      });
    });
    this.ToContractParams.loading = false;
  }

  getLetterNo(LetterNo) {
    if (LetterNo) { this.LetterNo = LetterNo;
    } else {
      this.LetterNo = null;
    }
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

  popupclosed() {
    this.btnclicked = false;
  }
}
