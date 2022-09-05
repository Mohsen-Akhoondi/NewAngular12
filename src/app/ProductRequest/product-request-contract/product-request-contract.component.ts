import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { forkJoin, of } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-product-request-contract',
  templateUrl: './product-request-contract.component.html',
  styleUrls: ['./product-request-contract.component.css']
})
export class ProductRequestContractComponent implements OnInit {
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Input() PopupParam;
  ReceiveDoccolumnDef;
  ReceiveDocrowsData = [];
  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractTypeItems;
  ContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractStatusItems;
  ContractStatusParams = {
    bindLabelProp: 'ContractStatusName',
    bindValueProp: 'ContractStatusCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
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
    IsDisabled: false
  };

  ObserverItems;
  NgSelectObserverParams = {
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
    type: 'product-request-contract-observer',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
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
  SecondObserverItems;
  NgSelectSecondObserverParams = {
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
    DropDownMinWidth: '300px',
    type: 'product-request-contract-second-observer',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
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
  NgSelectVSParams = {
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
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
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

  isClicked = false;
  PopUpType;
  HaveMaxBtn = false;
  startLeftPosition;
  startTopPosition;
  HaveHeader = false;
  PercentWidth;
  MainMaxwidthPixel;
  MinHeightPixel;
  columnDef;
  ContractsignRowsData;
  rowsData;
  StartDate;
  EndDate;
  DurationDay;
  DurationMonth;
  DurationYear;
  WorkStartDate;
  WarrantyDate;
  RegionName;
  ContractsignColDef;
  ComitionMemberColDef;
  StartType = 1;
  AmountType = true;
  IsSecret = false;
  IsTaxValue = false;
  ContractsignApi: any;
  ComitionMemberRowsData;
  ComitionMemberApi;
  ProductRequestObject;
  CheckValidate = false;
  CheckBoxStatus = false;
  RequiredComponents = [this.FinYearParams, this.ContractTypeParams, this.ContractStatusParams, this.NgSelectObserverParams];
  ReceiveDocApi: any;
  RegionCode;
  constructor(private FinYear: FinYearService,
    private ContractList: ContractListService,
    private ProductRequest: ProductRequestService,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices) {
    this.ReceiveDoccolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع سند',
        field: 'ReceiveDocTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'ReceiveDocTypeName',
          bindValueProp: 'ReceiveDocTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ReceiveDocTypeName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'شماره ضمانت نامه',
        field: 'ReferenceNo',
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ ضمانت نامه',
        field: 'PersianReferenceDate',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianReferenceDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 120,
          AppendTo: '.ag-theme-balham'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'مبلغ',
        field: 'ReceiveDocAmount',
        width: 120,
        HaveThousand: true,
        resizable: true,
        editable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: true,
        width: 440,
        resizable: true
      }
    ];
    this.ContractsignColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreContractSignPerson,
          FetchByTerm: this.FetchContractSignPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
    ];
    this.ComitionMemberColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreComitionMemberPerson,
          FetchByTerm: this.FetchComitionMemberPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.ContractsignRowsData = [];
    this.ComitionMemberRowsData = [];
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.RegionName = this.ProductRequestObject.RegionName;
    this.RegionCode = this.ProductRequestObject.ReginCode;
    this.rowsData = [];
    this.ReceiveDoccolumnDef[1].cellEditorParams.Items = this.ContractList.GetWarrantyReceiveDocType();
    forkJoin([
      this.FinYear.GetFinYearList(),
      this.ContractList.GetContractTypeList(),
      this.ContractList.GetContractStatusList(),
      this.ProductRequest.GetCostCenterByRegion(0, null, null, true),
      this.Actor.GetPersonPaging(1, 30, '', null)
    ])
      .subscribe(res => {
        this.FinYearItems = res[0];
        this.ContractTypeItems = res[1];
        this.ContractStatusItems = res[2];
        this.CostCenterItems = res[3];
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res[4].List,
          TotalItemCount: res[4].TotalItemCount,
          PageCount: Math.ceil(res[4].TotalItemCount / 30),
          type: 'product-request-contract-observer'
        });

        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res[4].List,
          TotalItemCount: res[4].TotalItemCount,
          PageCount: Math.ceil(res[4].TotalItemCount / 30),
          type: 'product-request-contract-second-observer'
        });
      });
  }
  Close() {
    this.Closed.emit(true);

  }

  onSave() {
    this.ReceiveDocApi.stopEditing();
    this.ContractsignApi.stopEditing();
    this.ComitionMemberApi.stopEditing();
    let ValidateForm = true;
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {


      if (ValidateForm) {
        const ContractObj = {
          ContractId: -1,
          CostFactorId: -1,
          RegionCode: this.ProductRequestObject.RegionCode,
          FinYearCode: this.FinYearParams.selectedObject,
          FromContractDate: this.StartDate,
          ToContractDate: this.EndDate,
          ContractTypeCode: this.ContractTypeParams.selectedObject,
          ContractSatusCode: this.ContractStatusParams.selectedObject,
          StartTypeCode: this.StartType,
          EstimationDay: this.DurationDay,
          EstimationMonth: this.DurationMonth,
          EstimationYear: this.DurationYear,
          SubCostCenterId: this.SubCostCenterParams.selectedObject,
          ActorID: this.NgSelectObserverParams.selectedObject,
          SecondObserverID: this.NgSelectSecondObserverParams.selectedObject,
          IsFindCost: this.AmountType,
          IsTaxValue: this.IsTaxValue,
          IsSecret: this.IsSecret,
          ActualStartDate: this.WorkStartDate,
          WarrantyDate: this.WarrantyDate,
          ContractorId: this.ProductRequestObject.ActorID,
          Subject: this.ProductRequestObject.Subject,
          ContractAmount: 10,
        };
        const ContractSignList = [];
        const CommiitionMemberList = [];
        this.ContractsignApi.forEachNode(node => {
          const ContractSignObj = {
            ContractSignID: node.data.ContractSignID ? node.data.ContractSignID : -1,
            ContractID: -1,
            ActorID: node.data.ActorName.ActorId ? node.data.ActorName.ActorId : (node.data.ActorID ? node.data.ActorID : null)
          };
          ContractSignList.push(ContractSignObj);
        });

        this.ComitionMemberApi.forEachNode(node => {
          const ComitionMemberObj = {
            ContractCommiitionMemberID: node.data.ContractSignID ? node.data.ContractSignID : -1,
            ContractID: -1,
            ActorID: node.data.ActorName.ActorId ? node.data.ActorName.ActorId : (node.data.ActorID ? node.data.ActorID : null),
            UnitPersonID: -1
          };
          CommiitionMemberList.push(ComitionMemberObj);
        });

        const ReceiveDocList = [];
        this.ReceiveDocApi.forEachNode(node => {
          const ReceiveDocObj = {
            ReceiveDocID: node.data.ReceiveDocID ? node.data.ReceiveDocID : -1,
            CostFactorID: -1,
            // tslint:disable-next-line:max-line-length
            ReceiveDocTypeCode: node.data.ReceiveDocTypeName.ReceiveDocTypeCode ? node.data.ReceiveDocTypeName.ReceiveDocTypeCode : (node.data.ReceiveDocTypeCode ? node.data.ReceiveDocTypeCode : null),
            // tslint:disable-next-line:max-line-length
            ReferenceDate: node.data.PersianReferenceDate && node.data.PersianReferenceDate.MDate ? node.data.PersianReferenceDate.MDate : (node.data.ShortReferenceDate ? node.data.ShortReferenceDate : null),
            ReferenceNo: node.data.ReferenceNo ? node.data.ReferenceNo : null,
            ReceiveDocAmount: node.data.ReceiveDocAmount,
            Note: node.data.Note,
            IsWarranty: 1
          };
          ReceiveDocList.push(ReceiveDocObj);
        });

        this.ContractList.SaveContract(ContractObj,
          ContractSignList,
          CommiitionMemberList,
          ReceiveDocList).subscribe(res => {
            this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          },
            err => {
              this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
            });
      }
    });
  }

  popupclosed() {
    this.isClicked = false;
    this.PopUpType = '';

  }
  getOutPutParam(event) {

  }
  MessageBoxAction(event) {

  }

  OnStartDateChange(ADate) {
    this.StartDate = ADate.MDate;

  }

  OnEndDateChange(ADate) {
    this.EndDate = ADate.MDate;

  }

  rdoAmountClick(Type) {
    this.AmountType = Type;

  }

  getDurationDay(DurationDay) {
    if (DurationDay) {
      this.DurationDay = DurationDay;
      this.DurationDay = parseFloat(this.DurationDay);
    } else {
      this.DurationDay = '';
    }
  }

  getDurationMonth(DurationMonth) {
    if (DurationMonth) {
      this.DurationMonth = DurationMonth;
      this.DurationMonth = parseFloat(this.DurationMonth);
    } else {
      this.DurationMonth = '';
    }
  }

  getDurationYear(DurationYear) {
    if (DurationYear) {
      this.DurationYear = DurationYear;
      this.DurationYear = parseFloat(this.DurationYear);
    } else {
      this.DurationYear = '';
    }
  }

  onCostCenterChange(ACostCenterID) {
    if (ACostCenterID) {
      this.ProductRequest.GetSubCostCenter(ACostCenterID, null, true).subscribe(Res => {
        this.SubCostCenterItems = Res;
        // if (this.CurrentUserSubCostCenter) {
        //   this.SubCostCenterParams.selectedObject = this.CurrentUserSubCostCenter.SubCostCenterID;
        //   this.onChangeSubCostCenter(this.CurrentUserSubCostCenter.SubCostCenterID);
        // }
      });
    } else {
      this.SubCostCenterItems = [];
    }
  }

  OnWorkStartDateChange(ADate) {
    this.WorkStartDate = ADate.MDate;

  }

  OnWarrantyDateChange(ADate) {
    this.WarrantyDate = ADate.MDate;

  }
  rdoStartTypeClick(Type) {
    this.StartType = Type;
  }

  FetchMoreObserver(event) {
    this.NgSelectObserverParams.loading = true;
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
        type: 'product-request-contract-observer'
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  doObserverSearch(event) {
    this.NgSelectObserverParams.loading = true;
    this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'product-request-contract-observer'
      });
    });
  }

  FetchMoreSecondObserver(event) {
    this.NgSelectSecondObserverParams.loading = true;
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
        type: 'product-request-contract-second-observer'
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  doSecondObserverSearch(event) {
    this.NgSelectSecondObserverParams.loading = true;
    this.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'product-request-contract-second-observer'
      });
    });
  }

  FetchMoreContractSignPerson(event) {
    event.Owner.ProdReqPersonColDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        resolve(res.TotalItemCount);
      });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchContractSignPersonByTerm(event) {
    event.Owner.ProdReqPersonColDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30)
      });
    });
  }

  onContractSigncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Actor.GetPersonPaging(1, 30, '', null).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
    }
  }

  FetchMoreComitionMemberPerson(event) {
    event.Owner.ComitiomMemberColDef[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        resolve(res.TotalItemCount);
      });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchComitionMemberPersonByTerm(event) {
    event.Owner.ComitiomMemberColDef[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30)
      });
    });
  }

  onComitionMembercellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Actor.GetPersonPaging(1, 30, '', null).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
    }
  }

  OnChSecretChange(event) {
    this.IsSecret = event;
  }

  OnChTaxvalueChange(event) {
    this.IsTaxValue = event;

  }

  onGridReadyRequestContractsign(params: { api: any; }) {
    this.ContractsignApi = params.api;
  }

  onGridReadyComitionMember(params: { api: any; }) {
    this.ComitionMemberApi = params.api;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  onGridReadyReceiveDoc(params: { api: any; }) {
    this.ReceiveDocApi = params.api;
  }
}
