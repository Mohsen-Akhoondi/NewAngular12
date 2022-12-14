import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { forkJoin, of } from 'rxjs';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { InvoiceService } from 'src/app/Services/Invoice/InvoiceService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-user-work-log-invoice',
  templateUrl: './user-work-log-invoice.component.html',
  styleUrls: ['./user-work-log-invoice.component.css']
})
export class UserWorkLogInvoiceComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  private gridApi;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  deleteClick = false;
  rowData: any;
  selectedRegion = -1;
  RegionListSet = [];
  btnclicked = false;
  type: string;
  selectedRow: any;
  @Input() InputParam;
  @Input() ModuleCode;
  @Input() ModuleName;
  paramObj;
  HaveHeader: boolean;
  Enabled: boolean;
  HaveMaxBtn = false;
  BtnClickedName: string;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition: number;
  OverPixelWidth: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 90;
  private sub: any;
  PixelWidth;
  PercentWidth;
  ContractorItems;
  ContractorPageCount;
  ContractorTotalItemCount;
  ContractorType = true;
  NgSelectContractorParams = {
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
      SearchLabel: '??????????:',
      SearchItemDetails:
        [{ HeaderCaption: '??????????', HeaderName: 'ActorId', width: 30, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: '???? ??????', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: '?????? ?? ?????? ????????????????', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: '??????????', width: 30, },
        { HeaderCaption: '???? ??????', width: 35, },
        { HeaderCaption: '?????? ?? ?????? ????????????????', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '99px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  FinYearItems = [];
  ReigonListSet = [];
  RegionParams = {
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
  RegisterInvoiceDate;
  gridHeight = 87;
  ActorID;
  RegisterInvoiceCode;
  BtnName;
  WorkflowObjectCode = 17;
  ClearedToViewFlow = true;
  WorkFlowInstanceId;
  InvoiceCode;
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
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
    Required: false
  };
  AdministratorActorItems = [];
  AdministratorActorParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: false
  };
  EndWFParams = {
    bindLabelProp: 'EndWFName',
    bindValueProp: 'EndWFCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  EndWFItems = [
    {
      EndWFName: '?????????? ??????????',
      EndWFCode: 1
    },
    {
      EndWFName: '???? ????????',
      EndWFCode: 2
    }
  ];
  RequestedPersonItems = <any>[];
  RequestedPersonParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SumFinalPrice: any;

  constructor(
    private router: Router,
    private RegionList: RegionListService,
    private ContractList: ContractListService,
    private Invoice: InvoiceService,
    private RefreshCartable: RefreshServices,
    private route: ActivatedRoute,
    config: NgSelectConfig,
    private Workflow: WorkflowService,
    private Report: ReportService,
    private Actor: ActorService,
    private ProductRequest: ProductRequestService,) {
    this.rowData = of([]);

    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.columnDef = [
      {
        headerName: '???????? ',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: '???????? ????????????',
        field: 'RegionName',
        width: 170,
        resizable: true,
        sortable: true
      },
      {
        headerName: '?????? ????????',
        field: 'FinYearCode',
        width: 90,
        resizable: true
      },
      {
        headerName: '?????????? ????????????',
        field: 'PersianRegisterInvoiceDate',
        width: 120,
        resizable: true
      },
      {
        headerName: '?????????? ????????????',
        field: 'RegisterInvoiceCode',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: '?????????? ?????? ????????????',
        field: 'InvoiceCode',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: '???????????? ????????',
        field: 'CostCenterName',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: '?????????? ????????',
        field: 'SubCostCenterName',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: '???????? ????????????',
        field: 'AdministratorActorName',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: '??????????',
        field: 'Subject',
        width: 456,
        resizable: true
      },
      {
        headerName: '????????????????',
        field: 'ActorName',
        width: 205,
        resizable: true
      },
      {
        headerName: '?????????????? ??????????',
        field: 'RequestedPersonName',
        width: 120,
        resizable: true,
        sortable: true,
      },
      {
        headerName: '???????? ??????????',
        field: 'SumFinalPrice',
        HaveThousand: true,
        width: 120,
        resizable: true,
        editable: false,
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

    ];
  }

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
  }

  onChangeRegion(newObj) {
    this.selectedRow = null;
    this.CostCenterParams.selectedObject = null;
    this.SubCostCenterParams.selectedObject = null;
    this.AdministratorActorParams.selectedObject = null;
    this.CostCenterItems = [];
    this.SubCostCenterItems = [];
    this.AdministratorActorItems = [];
    this.rowData = [];
    if (this.ModuleCode !== 2972) {
      this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, this.ModuleCode, false).subscribe(ress => {
        this.CostCenterItems = ress;
      });
    } else {
      this.ProductRequest.GetByRegionCodeUserWorkLog(this.RegionParams.selectedObject, null, true).subscribe(res =>
        this.CostCenterItems = res
      );
    }
  }
  ngOnInit() {
    if (this.ModuleCode === 2948) {
      this.deleteClick = true;
    }

    this.rowData = [];
    this.BtnName = this.ModuleCode === 2948 ? "??????????" : (this.ModuleCode === 2949 || this.ModuleCode === 2972) ? "????????????" : "";
    this.getNewData();

  }
  getNewData(): void {
    forkJoin([
      this.Workflow.GetFinYearList(),
      this.RegionList.GetRegionList(this.ModuleCode, false),
    ]).subscribe(res => {
      this.FinYearItems = res[0];
      //   this.FinYearParams.selectedObject = this.FinYearItems[0].FinYearCode;
      this.ReigonListSet = res[1];
      this.RegionParams.selectedObject = res[1][0].RegionCode;
      if (this.ModuleCode !== 2972) {
        this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, this.ModuleCode, false).subscribe(ress => {
          this.CostCenterItems = ress;
        });
      } else {
        this.ProductRequest.GetByRegionCodeUserWorkLog(this.RegionParams.selectedObject, null, true).subscribe(res =>
          this.CostCenterItems = res
        );
      }
    });
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
    this.Workflow.GetWfInstanceIDByObjIDAndRegionCode(this.selectedRow.data.InvoiceID, this.selectedRow.data.RegionCode).
      subscribe(res => {
        this.ClearedToViewFlow = res ? false : true;
        this.WorkFlowInstanceId = res;
      });
  }

  closeModal(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }


  Search() {
    this.Invoice.InvoiceSearch(
      this.RegionParams.selectedObject,
      this.FinYearParams.selectedObject,
      this.RegisterInvoiceDate,
      this.RegisterInvoiceCode,
      this.InvoiceCode,
      this.NgSelectContractorParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.AdministratorActorParams.selectedObject,
      this.EndWFParams.selectedObject,
      this.RequestedPersonParams.selectedObject,
      this.SumFinalPrice,
    ).subscribe(res => {
      if (res && res.length > 0) {
        this.rowData = res;
      } else {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = '???????????? ?????? ?????????? ???????? ??????';
        this.btnclicked = true;
        this.startLeftPosition = 500;
        this.startTopPosition = 100;
      }
    });
  }
  onChangeFinYear(event) {
    this.FinYearParams.selectedObject = event;
  }
  OnRegisterInvoiceDateChange(ADate) {
    this.RegisterInvoiceDate = ADate.MDate;
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractorItems = ResultList;
        this.NgSelectContractorParams.loading = false;
      }
      );
  }
  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.ContractorType,
      false, false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  OpenContractor(event) {
    const ResultList = [];
    //  this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.ContractorType, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
    // this.NgSelectContractorParams.loading = false;
  }
  rdoContractorTypeClick(Type) {
    this.ContractorType = Type;
    this.NgSelectContractorParams.selectedObject = null;
    if (this.ContractorType) {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = '??????????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = '???? ??????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = '?????? ?? ?????? ????????????????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = '??????????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = '???? ??????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = '?????? ?? ?????? ????????????????';
      // this.NgSelectContractorParams.bindLabelProp = 'PersonName';
    } else {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = '??????????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = '?????????? ?????? ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = '?????? ??????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = '??????????';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = '?????????? ?????? ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = '?????? ??????';
      // this.NgSelectContractorParams.bindLabelProp = 'CorporateName';
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  Btnclick() {
    this.gridApi.stopEditing();
    if (this.selectedRow === null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = '?????????????? ?????? ???????????? ???????????? ???????? ??????';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    } else {
      this.type = 'single-sale-invoice';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.MinHeightPixel = 645;
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.paramObj = {
        ModuleViewTypeCode: this.ModuleCode === 2948 ? 2 : this.ModuleCode === 2949 ? 3 : 3,
        CurrentModuleCode: this.ModuleCode,
        InvoiceID: this.selectedRow.data.InvoiceID,
      };
      return;
    }

  }
  DetailsBtnClick() {
    this.btnclicked = true;
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = '???????????????? ?????? ???????????? ???????????? ???????? ??????';
      this.startLeftPosition = 519;
      this.startTopPosition = 246;
    } else {
      this.type = 'user-work-log-details';
      this.btnclicked = true;
      this.OverPixelWidth = 1290;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 111;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 640;
      this.paramObj = {
        HeaderName: '???????????? ????????',
        workflowtypeStatus: this.WorkflowObjectCode,
        WorkFlowInstanceId: this.WorkFlowInstanceId,
        ParentModuleCode: this.ModuleCode,
        PersianRegisterInvoiceDate: this.selectedRow.data.PersianRegisterInvoiceDate,
        RegisterInvoiceCode: this.selectedRow.data.RegisterInvoiceCode,
        Subject: this.selectedRow.data.Subject,
        InvoiceID: this.selectedRow.data.InvoiceID
      };
    }
  }
  onChangeCostCenter(ACostCenterID) {
    this.SubCostCenterParams.selectedObject = null;
    this.AdministratorActorParams.selectedObject = null;
    this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, this.ModuleCode, true).subscribe(res => {
      this.SubCostCenterItems = res;
    });
  }

  onSubCostCenterSelectedChange(SubCostCenterID) {
    this.AdministratorActorParams.selectedObject = null;
  }
  onOpenAdministratorActor() {
    if (this.SubCostCenterParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('?????????? ???????? ???? ???????????? ????????.');
      return;
    } else {
      this.ProductRequest.GetSubCostCenterAdministratorActorlist(
        this.CostCenterParams.selectedObject, this.SubCostCenterParams.selectedObject, null).subscribe(res => {
          this.AdministratorActorItems = res;
        });
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onOpenRequestedPerson() {
    if (this.ModuleCode !== 2972) {
      if (this.SubCostCenterParams.selectedObject === null) {
        this.ShowMessageBoxWithOkBtn('?????????? ???????? ???? ???????????? ????????.');
        return;
      } else {
        this.ProductRequest.GetSubCostCenterPriPerson(
          this.CostCenterParams.selectedObject,
          this.SubCostCenterParams.selectedObject,
          null,
          this.ModuleCode).subscribe(res => {
            res.forEach(element => {
              element.FullPersonName = element.FirstName + ' ' + element.LastName;
            });
            this.RequestedPersonItems = res;
          }
          );
      }
    } else {
      this.ProductRequest.GetRequestedPerson(this.RegionParams.selectedObject).subscribe(
        res => {
          res.forEach(element => { element.FullPersonName = element.FirstName + ' ' + element.LastName });
          this.RequestedPersonItems = res;
        });
    }
  }

  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    if(this.selectedRow.data.WorkflowInstanceID)
    {
      this.ShowMessageBoxWithYesNoBtn('???????????? ?????????? ???????? ?????????????? ???? ?????? ?????????? ????????????');
    }
    else
    {
      this.ShowMessageBoxWithYesNoBtn('?????? ???? ?????? ???????????? ?????????? ????????????');
    }
  }

  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  DoDelete() {
    this.Invoice.DeleteInvoice(this.selectedRow.data.InvoiceID,this.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.Search();
          this.ShowMessageBoxWithOkBtn('?????? ???? ???????????? ?????????? ????');
        } else {
          this.ShowMessageBoxWithOkBtn('???????? ?????? ???????? ????????');
        }
      });
  }

  getOutPutParam(event) {

  }
}
