import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ContractSupervisionService } from 'src/app/Services/ContractService/ContractSupervision/ContractSupervisionService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isNullOrUndefined, isUndefined } from 'util';
import { ServicePatternService } from 'src/app/Services/CRM/ServicePatternService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { GridOptions } from 'ag-grid-community';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-contract-supervision',
  templateUrl: './contract-supervision.component.html',
  styleUrls: ['./contract-supervision.component.css']
})
export class ContractSupervisionComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  GreenSpaceGridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.HaveEntityItemSubject) {
        return { 'background-color': '#05D7ED' };
      }
    }
  };
  GridOptionsRowStyle: GridOptions = {
    getRowStyle: function (params) {
      if (params.data.HaveEntityItemSubjectValue) {
        return { 'background-color': '#82E0F9' };
      }
    }
  };
  MessageBoxResult = false;
  columnDef1;
  defaultColDef1;
  ContractSupervisionItemList: any;
  defaultColDef2;
  selectedContractID = -1;
  btnclicked = false;
  ContractDetails;
  ContractSupervisionDate;
  ContractSubLetter;
  ContractSupervisionCode;
  Note;
  gridApi;
  ContractPayItemList = [];
  type;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  ChangeDetection = false;
  ProductIDs = [];
  SelectedProductID;
  ContractOperationId;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  Excel_Header_Param: { colDef2: any };
  ParamObj;
  HaveSave = false;
  HaveDelete = false;
  EditModeInit = false;
  IsDisable = true;
  ArchiveBtnText;
  DetailArchiveBtnText;
  beforeProductID;
  PriceListTopicName = '';
  PriceListTopicUnit = '';
  PriceListTopicUnitAmount = '';
  ContractAgent;
  ContractAgentSet = [];
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  IsEditable = true;
  dgCPHeight = 91;
  dgCPEHeight = 90;
  BtnClickedName;
  SelectedContractMinutesItemListID;
  PriceListTypeCode;
  CostListFinYearCode;
  PriceListPatternID;
  CnrtSupervisionID;
  HaveMaxBtn = false;
  ContractAgentParams = {
    bindLabelProp: 'ContractAgentName',
    bindValueProp: 'ContractAgentCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ProductTypeList = [];
  NgSelectVSParams = {
    bindLabelProp: 'ProductCodeName',
    bindValueProp: 'ProductID',
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
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, TermLenght: 3, SearchOption: 0 },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1, CanGrow: true },
        { HeaderCaption: 'مبلغ', HeaderName: 'Price', width: 53, }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, },
        { HeaderCaption: 'مبلغ', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 25
    }
  };
  IsVolumetric: any;
  IsTaxValue: any;
  ProdcutTypeCode: any;
  RegionCode: any;
  NgSelectContractEntityItemParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'EntityTypeItemID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'entity-item',
  };
  IsGreenSpaceDevAndMaint = false;
  ProdReqEntColDef;
  ProdReqEntList = [];
  PREntgridApi;
  WeightedAverage = '0';
  NgSelectProductEntityItemParams = {
    bindLabelProp: 'EntityItemSubject',
    bindValueProp: 'EntityTypeItemID',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'product-entity-item',
  };
  SelectedRow: any;
  IsAdmin;
  IsEndFlow: any;
  ReadyToConfirm: any;
  WorkFlowID: any;
  ModuleCode;
  WorkflowObjectCode: any;
  ModuleViewTypeCode = null;
  OrginalModuleCode;
  CartableUserID: any;
  CurrWorkFlow: any;
  btnConfirmName;
  btnConfirmIcon;
  WorkFlowTransitionID: any;
  ObjectNo: any;
  ObjectID: any;
  WorkflowTypeCode: any;
  WorkflowTypeName: any;
  IsDown: boolean;
  OrderCode = '';
  MinimumPosting: any;
  WorkFlowInstanceID: any;
  BTNsShow = false;
  btnConfirmAndReturnName = 'عدم تایید و بازگشت';
  HeightPercentWithMaxBtn = null;
  constructor(private router: Router,
    private ConSupervisionService: ContractSupervisionService,
    private contractpaydetail: ContractPayDetailsService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private ContractList: ContractListService,
    private ProductRequest: ProductRequestService,
    private RefreshCartable: RefreshServices,
    private SPService: ServicePatternService,
    private Cartable: CartableServices,
    private FlowService: WorkflowService,
    private CommonService: CommonServices,
    private route: ActivatedRoute
  ) {
    this.ProductTypeList = [{ ProductTypeCode: '1', ProductTypeName: 'کالا' },
    { ProductTypeCode: '2', ProductTypeName: 'خدمت' }];

    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      this.OrginalModuleCode = +params['ModuleCode'];
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {
    this.ProdReqEntColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ویژگی ',
        field: 'EntitySubject',
        width: 150,
        resizable: true,
        editable: false,

      },
      {
        headerName: 'اهمیت وزنی',
        field: 'Weight',
        width: 100,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'درصد اعمال',
        field: 'EntityItemSubject',
        width: 150,
        editable: this.PopupParam.ModuleViewTypeCode === 3 ? false :
                  this.PopupParam && !isNullOrUndefined(this.PopupParam.IsViewable) ? !this.PopupParam.IsViewable : true,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectProductEntityItemParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.EntityItemSubject;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.Subject) {
            params.data.EntityTypeItemID = params.newValue.EntityTypeItemID;
            params.data.EntityItemSubject = params.newValue.Subject;
            return true;
          } else {
            params.data.EntityTypeItemID = null;
            params.data.EntityItemSubject = '';
            return false;
          }
        },
      },
      {
        headerName: 'درصد ناظر',
        field: 'Value',
        width: 150,
        HaveThousand: true,
        resizable: true,
        editable: true,
        hide: this.PopupParam.ModuleViewTypeCode !== 3,
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

  ngOnInit() {
    this.ContractSupervisionItemList = [];
    if (this.PopupParam) {
      this.WorkFlowInstanceID = this.PopupParam.WorkFlowInstanceId ? this.PopupParam.WorkFlowInstanceId : null;
      this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
      this.IsEndFlow = this.PopupParam.IsEnd === 1;
      this.CnrtSupervisionID = this.PopupParam.SelectedCnrtSupervisionID;
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
      this.BTNsShow = this.PopupParam.BTNs;
      this.RegionCode = this.PopupParam.RegionCode;
      if (this.PopupParam.ModuleViewTypeCode === 100000) {
        this.ModuleCode = 2654;
      }

      if (this.CurrWorkFlow) {
        this.ReadyToConfirm = this.CurrWorkFlow.ReadyToConfirm;
        this.WorkflowTypeName = this.CurrWorkFlow.WorkflowTypeName;
        this.WorkflowTypeCode = this.CurrWorkFlow.WorkflowTypeCode;
        this.WorkflowObjectCode = this.CurrWorkFlow.WorkflowObjectCode;
        this.ObjectNo = this.CurrWorkFlow.ObjectNo;
        this.ObjectID = this.CurrWorkFlow.ObjectID;
        this.WorkFlowID = this.CurrWorkFlow.WorkflowID;
        this.CartableUserID = this.CurrWorkFlow.CartableUserID;
        this.MinimumPosting = this.CurrWorkFlow.MinimumPosting;
        this.ModuleCode = this.OrginalModuleCode = 2654;
        this.RegionCode = this.CurrWorkFlow.RegionCode;
      }
    }

    if (!this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید';
      this.btnConfirmIcon = 'ok';
    }

    if (!this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'عدم تایید';
      this.btnConfirmIcon = 'cancel';
    }

    if (this.IsEndFlow && this.ReadyToConfirm && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
      this.btnConfirmName = 'بازگشت از تایید نهایی';
      this.btnConfirmIcon = 'cancel';
    }

    if (this.IsEndFlow && (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
      this.btnConfirmName = 'تایید نهایی';
      this.btnConfirmIcon = 'ok';
    }

    if (this.PopupParam.IsViewable) {
      this.HaveSave = false;
      this.HaveDelete = false;
      this.dgCPHeight = 91;
      this.dgCPEHeight = 90;
      this.IsEditable = false;
      this.DetailArchiveBtnText = 'مشاهده مستندات فنی متره';
      this.ArchiveBtnText = 'مشاهده مستندات فنی صورت جلسه';
    } else {

      this.ArchiveList.HasArchiveAccess(2654).subscribe(res => {
        this.DetailArchiveBtnText = res ? 'مستندات فنی متره' : 'مشاهده مستندات فنی متره';
        this.ArchiveBtnText = res ? 'مستندات فنی متره' : 'مشاهده مستندات فنی صورت جلسه';
      });
      this.User.GetModulOPByUser(2654).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {

            case 7:
            case 16:
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
      this.HaveSave = this.ModuleViewTypeCode === 2 ? false : true;
    }
    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeNgInit();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeNgInit();
      this.ColumnDefinition();
      return;
    }
  }

  InsertModeNgInit() {
    const promise = new Promise<void>((resolve, reject) => {
      forkJoin([
        this.contractpaydetail.GetContractDetails(this.PopupParam.SelectedContractID, 2654),
        this.ConSupervisionService.GetMaxContractSupervisionCode(this.PopupParam.SelectedContractID),
        this.contractpaydetail.GetContractAgent(),
        this.ProductRequest.GetCurrentDate(),
        this.User.CheckAdmin()
      ]).subscribe(res => {
        this.ContractDetails = res[0];
        this.RegionCode = this.ContractDetails.RegionCode;
        this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
        this.Note = this.ContractSubLetter;
        this.IsGreenSpaceDevAndMaint = !isNullOrUndefined(this.ContractDetails.IsGreenSpaceDevAndMaint) &&
          this.ContractDetails.IsGreenSpaceDevAndMaint === true ? true : false;
        this.ContractSupervisionCode = res[1];
        if (res[2] && res[2][0]) {
          this.ContractAgentSet = res[2];
          this.ContractAgentParams.selectedObject = res[2][0].ContractAgentCode;
        }
        this.ContractSupervisionDate = res[3];
        this.IsAdmin = res[4];
        resolve();
      });
    }).then(() => {
      if (this.IsGreenSpaceDevAndMaint) {
        this.GreenColumnDefinition();
      } else {
        this.ColumnDefinition();
      }
    });
  }

  EditModeNgInit() {
    this.EditModeInit = true;

    forkJoin([
      this.ConSupervisionService.GetContractSupervision(this.CnrtSupervisionID),
      this.contractpaydetail.GetContractAgent(),
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[1] && res[1][0]) {
        this.ContractAgentSet = res[1];
        this.ContractAgentParams.selectedObject = res[1][0].ContractAgentCode;
      }
      this.CnrtSupervisionID = this.ContractDetails.CnrtSupervisionID;
      this.ContractSubLetter = this.ContractDetails.ParentObjectStr;
      this.Note = this.ContractDetails.Note;
      this.ContractSupervisionCode = this.ContractDetails.CnrtSupervisionCode;
      this.ContractSupervisionDate = this.ContractDetails.ShortContractSupervisionDate;
      this.ContractPayItemList = res[0].ContractSupervisionItemViewList;
      this.IsGreenSpaceDevAndMaint = !isNullOrUndefined(this.ContractDetails.IsGreenSpaceDevAndMaint) ?
        this.ContractDetails.IsGreenSpaceDevAndMaint : false;

      this.ContractPayItemList.forEach(CPItem => {
        if (CPItem.CnrtSupervisionItemEntityItemList != null && CPItem.CnrtSupervisionItemEntityItemList.length > 0) {
          CPItem.CnrtSupervisionItemEntityItemList.forEach(CSIEntityItem => {
            if (CSIEntityItem.EntityItemSubject) {
              CPItem.HaveEntityItemSubject = true;
            }
          });
        }
      });

      if (this.IsGreenSpaceDevAndMaint) {
        this.GreenColumnDefinition();
      } else {
        this.ContractPayItemList.forEach(item => {
          this.EntityColumnDefinition(null, null, item.EntityList, false);
          this.SetEntityDataInDataRow(item);
        });
      }


    });
    new Promise((StartedWFResolve, reject) => { 
      this.SetStartedWFInfo(StartedWFResolve);
    }).then(() => {
      this.ViewTypeChange();
    });
  }

  ViewTypeChange() {
    switch (this.PopupParam.ModuleViewTypeCode) {
      case 2:
        this.HaveSave = false;
        this.IsEditable = false;
        break;
      default:
        break;

    }
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات صورت وضعیت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  onChangeContractAgentObj(newObj) {
    this.ContractAgentParams.selectedObject = newObj;
  }

  OnContractMinutesDateChange(ADate) {

    if (ADate.FullDate !== '' && !this.EditModeInit) {
      this.ContractSupervisionDate = ADate.MDate;
      if (this.IsGreenSpaceDevAndMaint) {
        this.SPService.GetServicePatternItemList(482, null).subscribe(res => {
          this.ContractPayItemList = res;
        });
      } else {
        this.ConSupervisionService.GetSupervisionContractOrder(this.PopupParam.SelectedContractID,
          this.ContractSupervisionCode,
          this.ContractSupervisionDate,
          null,
          true)
          .subscribe(
            ress => {
              this.ContractPayItemList = ress;
              this.ContractPayItemList.forEach(item => {
                this.EntityColumnDefinition(null, null, item.EntityList, false);
              });
            });
      }
    }

    if (ADate.FullDate !== '') {
      this.EditModeInit = false;
    }
  }

  onSave() {
    this.gridApi.stopEditing();
    if (!this.ContractSupervisionDate || this.ContractSupervisionDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ نظارت نمی تواند خالی باشد');
      return;
    }

    if (this.PopupParam.Mode === 'InsertMode') {
      this.SaveContractSupervision();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.UpdateContractSupervision();
      return;
    }
  }

  RowClick(event) {
    this.SelectedProductID = event.data.ProductID;
    this.IsDisable = false;
    this.ProductIDs = [];

    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) {
        this.ProductIDs.push(node.data.ProductID);
      }
    });

    if (this.IsGreenSpaceDevAndMaint) {
      this.SelectedRow = event.data;
      if (this.PopupParam.Mode === 'InsertMode') {
        this.ProdReqEntList = event.data.CnrtSupervisionItemEntityItemList != null
          && event.data.CnrtSupervisionItemEntityItemList.length > 0 ?
          event.data.CnrtSupervisionItemEntityItemList : event.data.ProductRequestEntityList;
      }
      if (this.PopupParam.Mode === 'EditMode') {
        if (event.data.CnrtSupervisionItemEntityItemList != null && event.data.CnrtSupervisionItemEntityItemList.length > 0) {
          this.ProdReqEntList = event.data.CnrtSupervisionItemEntityItemList;
          this.ProdReqEntList.forEach(ProdReqEnt => {
           ProdReqEnt.Value = ProdReqEnt.Value ? ProdReqEnt.Value : ProdReqEnt.EntityItemSubject ;
            // tslint:disable-next-line: radix
            if ((parseInt(ProdReqEnt.Value) === parseInt(ProdReqEnt.EntityItemSubject)) && this.PopupParam.ModuleViewTypeCode === 3) {
              ProdReqEnt.HaveEntityItemSubjectValue = true;
            }
             });
        } else {
          this.ConSupervisionService.GetPREntityList(this.SelectedProductID).subscribe((res: any) => {
            if (res) {
              this.ProdReqEntList = res;
              this.ProdReqEntList.forEach(PREntity => {
                PREntity.Value = null;
              });
            }
          });
        }
      }
    }
  }

  onCellValueChanged(event) {
    this.ChangeDetection = true;
    const value = event.newValue;
    let itemsToUpdate = [];

    if (event.colDef && event.colDef.field === 'ProductName') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:radix
          node.data.ProductID = event.newValue.ProductID;
          node.data.ProductName = event.newValue.ProductName;
          node.data.PersianStartDate = event.newValue.PersianStartDate;
          node.data.PersianEndDate = event.newValue.PersianEndDate;
          node.data.ContractOrderEstimateList = [];
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }

  oncellEditingStarted(event) {
    this.ProductIDs = [];
    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) { this.ProductIDs.push(node.data.ProductID); }
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });


    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, event.data.ProductID, null, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });
    }

    if (event.colDef && event.colDef.field === 'ProductCodeName') {

      this.contractpaydetail.GetContractOrderByPagination(
        0,
        this.RegionCode,
        '',
        1,
        30,
        this.PopupParam.SelectedContractID,
        this.ContractSupervisionCode,
        this.ContractSupervisionDate,
        this.ProductIDs,
        this.ProdcutTypeCode,
        null, null, null).subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  onContractPayItemGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.type = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
    this.ParamObj = this.alertMessageParams;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.type = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
    this.ParamObj = this.alertMessageParams;
  }

  MessageBoxAction(ActionResult) {

    if (ActionResult === 'YES') {
      this.Closed.emit(true);
    }

    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  popupclosed() {
    this.btnclicked = false;
  }

  SaveContractSupervision() {
    this.gridApi.stopEditing();
    let ContractSupervisionItemList = [];
    let EntityTypeItemIDList = [];
    let CnrtSupervisionItemEntityList = [];
    let keepGoing = true;
    this.gridApi.forEachNode(node => {
      if (this.IsGreenSpaceDevAndMaint) {
        this.PREntgridApi.stopEditing();
        if (node.data.CnrtSupervisionItemEntityItemList) {
          node.data.CnrtSupervisionItemEntityItemList.forEach(item => {
            if (keepGoing) {
              if (!isNullOrUndefined(item.EntityTypeItemID) && item.EntityTypeItemID > 0) {
                const CnrtSupervisionItemEntityObj = {
                  EntityTypeItemID: item.EntityTypeItemID,
                  Value: item.Value,
                };
                CnrtSupervisionItemEntityList.push(CnrtSupervisionItemEntityObj);
              } else {
                // tslint:disable-next-line: max-line-length
                this.ShowMessageBoxWithOkBtn('درصد اعمال را برای تمام ردیف های خدمت' + ' ' + '"' + node.data.ProductName + '"' + ' ' + 'وارد نمایید.');
                keepGoing = false;
              }
            }
          });
        }
        const ContractSupervisionItemobj = {
          CnrtSupervisionItemID: -1,
          CnrtSupervisionID: -1,
          ProductID: node.data.ProductID,
          CnrtSupervisionItemEntityList: CnrtSupervisionItemEntityList,
        };
        ContractSupervisionItemList.push(ContractSupervisionItemobj);
        CnrtSupervisionItemEntityList = [];
      } else {
        var keys = Object.keys(node.data);
        if (node.data.EntityList) {
          node.data.EntityList.forEach(Entity => {
            let str = 'Subject' + Entity.EntityTypeID.toString();
            let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
            var key = keys.find(x => x === str);

            if (key && node.data[key]) {
              if (node.data[key].EntityTypeItemID) {
                EntityTypeItemIDList.push(node.data[key].EntityTypeItemID);
              } else {
                key = keys.find(x => x === ID);
                if (key && node.data[key]) {
                  EntityTypeItemIDList.push(node.data[key]);
                }
              }
            }

          });
        }
        const ContractSupervisionItemobj = {
          CnrtSupervisionItemID: -1,
          CnrtSupervisionID: -1,
          ProductID: node.data.ProductID,
          EntityTypeItemIDList: EntityTypeItemIDList,
        };
        ContractSupervisionItemList.push(ContractSupervisionItemobj);
      }
    });

    const ContractSupervisionObj = {
      CnrtSupervisionID: -1,
      ContractID: this.PopupParam.SelectedContractID,
      CnrtSupervisionCode: this.ContractSupervisionCode,
      CnrtSupervisionDate: this.ContractSupervisionDate,
      Note: this.Note,
    };

    if (keepGoing) {
      this.ConSupervisionService.SaveContractSupervision(ContractSupervisionObj,
        ContractSupervisionItemList, this.IsGreenSpaceDevAndMaint).subscribe(res => {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          this.ChangeDetection = false;
          this.PopupParam.Mode = 'EditMode';
          this.CnrtSupervisionID = res;
          this.EditModeNgInit();
        });
    }
  }

  UpdateContractSupervision() {
    this.gridApi.stopEditing();
    let ContractSupervisionItemList = [];
    let EntityTypeItemIDList = [];
    let CnrtSupervisionItemEntityList = [];
    let keepGoing = true;
    this.gridApi.forEachNode(node => {
      if (this.IsGreenSpaceDevAndMaint) {
        this.PREntgridApi.stopEditing();
        if (node.data.CnrtSupervisionItemEntityItemList) {
          node.data.CnrtSupervisionItemEntityItemList.forEach(item => {
            if (keepGoing) {
              if (!isNullOrUndefined(item.EntityTypeItemID) && item.EntityTypeItemID > 0) {
                const CnrtSupervisionItemEntityObj = {
                  EntityTypeItemID: item.EntityTypeItemID,
                  Value: item.Value,
                };
                CnrtSupervisionItemEntityList.push(CnrtSupervisionItemEntityObj);

              } else {
                // tslint:disable-next-line: max-line-length
                this.ShowMessageBoxWithOkBtn('درصد اعمال را برای تمام ردیف های خدمت' + ' ' + '"' + node.data.ProductName + '"' + ' ' + 'وارد نمایید.');
                keepGoing = false;
              }
            }
          });
        }
        const obj = {
          CnrtSupervisionItemID: node.data.ContractSupervisionItemID ? node.data.ContractSupervisionItemID : -1,
          CnrtSupervisionID: this.CnrtSupervisionID,
          ProductID: node.data.ProductID,
          CnrtSupervisionItemEntityList: CnrtSupervisionItemEntityList,
        };
        ContractSupervisionItemList.push(obj);
        CnrtSupervisionItemEntityList = [];
      } else {
        var keys = Object.keys(node.data);

        if (node.data.EntityList) {
          node.data.EntityList.forEach(Entity => {
            let str = 'Subject' + Entity.EntityTypeID.toString();
            let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
            var key = keys.find(x => x === str);

            if (key && node.data[key]) {
              if (node.data[key].EntityTypeItemID) {
                EntityTypeItemIDList.push(node.data[key].EntityTypeItemID);
              } else {
                key = keys.find(x => x === ID);
                if (key && node.data[key]) {
                  EntityTypeItemIDList.push(node.data[key]);
                }
              }
            }

          });
        }
        const obj = {
          CnrtSupervisionItemID: node.data.ContractSupervisionItemID ? node.data.ContractSupervisionItemID : -1,
          CnrtSupervisionID: this.CnrtSupervisionID,
          ProductID: node.data.ProductID,
          EntityTypeItemIDList: EntityTypeItemIDList,
        };
        ContractSupervisionItemList.push(obj);
      }
    });

    const ContractSupervisionObj = {
      CnrtSupervisionID: this.CnrtSupervisionID,
      ContractID: this.PopupParam.SelectedContractID,
      CnrtSupervisionCode: this.ContractSupervisionCode,
      CnrtSupervisionDate: this.ContractSupervisionDate,
      Note: this.Note,
    };

    if (keepGoing) {
      this.ConSupervisionService.UpdateContractSupervision(ContractSupervisionObj,
        ContractSupervisionItemList, this.IsGreenSpaceDevAndMaint)
        .subscribe(res => {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          this.ChangeDetection = false;
          this.beforeProductID = null;
          this.EditModeNgInit();
        },
          err => {
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
            this.ChangeDetection = true;
          }
        );
    }
  }

  BtnArchiveClick() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 245;
    this.startTopPosition = 10;
    const archiveParam = {
      EntityID: this.CnrtSupervisionID,
      TypeCodeStr: '1367-',
      DocTypeCode: 1367,
      ModuleCode: 2654,
      IsReadOnly: this.ModuleViewTypeCode === 2 ? true : this.PopupParam.IsViewable
    };
    this.ParamObj = archiveParam;
  }

  BtnDetailArchiveClick() {

    if (!this.SelectedContractMinutesItemListID) {
      this.ShowMessageBoxWithOkBtn('ردیف متره اتنخاب نشده است');
      return;
    }

    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 315;
    this.startTopPosition = 44;
    const archiveParam = {
      EntityID: this.SelectedContractMinutesItemListID,
      TypeCodeStr: '9-',
      DocTypeCode: 9,
      ModuleCode: 2654,
      IsReadOnly: this.PopupParam.IsViewable
    };
    this.ParamObj = archiveParam;
  }

  getOutPutParam(event) {

  }

  ColumnDefinition() {
    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            if (params.newValue.ProductTypeName !== params.oldValue) {
              params.data.ProductTypeName = params.newValue.ProductTypeName;
              params.data.ProductTypeCode = params.newValue.ProductTypeCode;
              params.data.ScaleName = null;
              params.data.ProductID = null;
              params.data.ProductCodeName = null;
              return true;
            }
          } else {
            params.data.ProductTypeName = null;
            params.data.ProductTypeCode = null;
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductCodeName = null;
            return false;
          }
        },
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreProduct,
          FetchByTerm: this.FetchProductByTerm,
          RedioChangeFunc: this.RedioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductCodeName;

          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductCodeName) {
            params.data.ProductCodeName = params.newValue.ProductCodeName;
            params.data.ProductID = params.newValue.ProductID;
            this.EntityColumnDefinition(params.data.ProductID, params, null, true);
            return true;
          } else {
            params.data.ProductCodeName = '';
            params.data.ProductID = null;
            params.data.ScaleName = '';
            return false;
          }
        },
        editable: true,
        resizable: true,
        width: 370,
      },
    ];
  }

  EntityColumnDefinition(ProductID, node, EntityList, hasApiCall) {
    if (ProductID && hasApiCall) {

      this.ProductRequest.GetProductRequestEntityList(null, ProductID, null).subscribe(
        res => {

          var columnDef22 = [];
          this.columnDef1.forEach(element => {
            columnDef22.push(element);
          });
          this.columnDef1 = [];

          node.data.EntityList = res;
          res.forEach(i => {
            const obItem = columnDef22.find(x => x.index && x.index === i.EntityTypeID);
            if (!obItem) {
              const obj = {
                index: i.EntityTypeID,
                headerName: i.Subject,
                field: 'Subject' + i.EntityTypeID.toString(),
                width: 200,
                editable: true,
                resizable: true,
                cellEditorFramework: NgSelectVirtualScrollComponent,
                cellEditorParams: {
                  Params: this.NgSelectContractEntityItemParams,
                  Items: [],
                  Owner: this
                },
                cellRenderer: 'SeRender',
                valueFormatter: function currencyFormatter(params) {
                  if (params.value) {
                    return params.value.Subject;
                  } else {
                    return '';
                  }
                },
              };
              columnDef22.push(obj);
            }
          });
          this.columnDef1 = columnDef22;
        });
    }

    if (!hasApiCall && EntityList) {

      var columnDef22 = [];
      this.columnDef1.forEach(element => {
        columnDef22.push(element);
      });
      this.columnDef1 = [];

      EntityList.forEach(i => {
        const obItem = columnDef22.find(x => x.index && x.index === i.EntityTypeID);
        if (!obItem) {
          const obj = {
            index: i.EntityTypeID,
            headerName: i.Subject,
            field: 'Subject' + i.EntityTypeID.toString(),
            width: 200,
            editable: true,
            resizable: true,
            cellEditorFramework: NgSelectVirtualScrollComponent,
            cellEditorParams: {
              Params: this.NgSelectContractEntityItemParams,
              Items: [],
              Owner: this
            },
            cellRenderer: 'SeRender',
            valueFormatter: function currencyFormatter(params) {
              if (params.value) {
                return params.value.Subject;
              } else {
                return '';
              }
            },
          };
          columnDef22.push(obj);
        }
      });
      this.columnDef1 = columnDef22;
    }
  }

  FetchMoreProduct(event) {
    const ResultList = [];

    const promise = new Promise((resolve, reject) => {
      event.Owner.contractpaydetail.GetContractOrderByPagination(
        event.SearchOption,
        event.Owner.RegionCode,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.PopupParam.SelectedContractID,
        event.Owner.ContractSupervisionCode,
        event.Owner.ContractSupervisionDate,
        event.Owner.ProductIDs,
        event.Owner.ProdcutTypeCode).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }

  FetchProductByTerm(event) {

    event.Owner.contractpaydetail.GetContractOrderByPagination(
      event.SearchOption,
      event.Owner.RegionCode,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.PopupParam.SelectedContractID,
      event.Owner.ContractSupervisionCode,
      event.Owner.ContractSupervisionDate,
      event.Owner.ProductIDs,
      event.Owner.ProdcutTypeCode).subscribe(res => {
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  RedioSelectedChange(event) {

    event.Owner.contractpaydetail.GetContractOrderByPagination(
      event.SearchOption,
      event.Owner.RegionCode,
      '',
      1,
      30,
      event.Owner.PopupParam.SelectedContractID,
      event.Owner.ContractSupervisionCode,
      event.Owner.ContractSupervisionDate,
      event.Owner.ProductIDs,
      event.Owner.ProdcutTypeCode).subscribe(res => {
        event.Owner.RefreshCartable.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  SetEntityDataInDataRow(element) {

    if (element.CnrtSupervisionItemEntityItemList) {
      element.CnrtSupervisionItemEntityItemList.forEach(
        EntityItem => {
          var Name = 'Subject' + EntityItem.EntityTypeID.toString();
          var ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();
          element[Name] = EntityItem.Subject;
          element[ID] = EntityItem.EntityTypeItemID;
        });
    }
  }
  onProdReqEntGridReady(params: { api: any; }) {
    this.PREntgridApi = params.api;
  }
  onProdReqEntCellValueChanged(event) {
    const items = [];
    this.PREntgridApi.forEachNode(node => {
      items.push(node.data);
    });
    this.SelectedRow.CnrtSupervisionItemEntityItemList = items;
  }
  OnFilterChanged(event) {
    this.CalculateWeightedAvg(this.PopupParam.ModuleViewTypeCode);
  }
  OnRowDataChanged(event) {
    this.CalculateWeightedAvg(this.PopupParam.ModuleViewTypeCode);
  }
  OnRowDataUpdated(event) {
    this.CalculateWeightedAvg(this.PopupParam.ModuleViewTypeCode);
  }
  GreenColumnDefinition() {
    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductTypeName;
          } else {
            return '';
          }
        },
        editable: false,
        width: 100,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductCodeName;

          } else {
            return '';
          }
        },
        editable: false,
        resizable: true,
        width: 350,
      },
    ];
  }

  onPREntcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'EntityItemSubject') {
      this.ProductRequest.GetEntityTypeItemList(event.data.EntityTypeID, this.SelectedProductID, null, null)
        .subscribe(res => {
          this.RefreshCartable.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'product-entity-item'
          });
        });
    }
  }
  CalculateWeightedAvg(ModuleViewTypeCode) {
    let SumWeightedValue = 0;
    let SumMultiple = 0;
    if (this.PREntgridApi) {
      this.PREntgridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.Value && ModuleViewTypeCode === 3) {
          SumWeightedValue = SumWeightedValue + node.data.Weight;
          SumMultiple = SumMultiple + (node.data.Value * node.data.Weight);
        } else if (node.data.EntityItemSubject) {
          SumWeightedValue = SumWeightedValue + node.data.Weight;
          // tslint:disable-next-line: radix
          SumMultiple = SumMultiple + (parseInt(node.data.EntityItemSubject) * node.data.Weight);
        }
      });
    }
    this.WeightedAverage = SumWeightedValue === 0 && SumMultiple === 0 ? '0' : (SumMultiple / SumWeightedValue).toFixed(4);
  }

  SetStartedWFInfo(Resolve) {
    this.FlowService.GetStartModuleViewTypeCode(this.RegionCode,
      this.ModuleCode,
      this.WorkflowTypeCode,
      this.CnrtSupervisionID).subscribe(res => {
        if (res) {
          this.ModuleViewTypeCode = this.ModuleViewTypeCode ? this.ModuleViewTypeCode : (res as any).ModuleViewTypeCode;
          this.WorkflowObjectCode = this.WorkflowObjectCode ? this.WorkflowObjectCode : (res as any).WorkflowObjectCode;
          this.WorkFlowID = this.WorkFlowID ? this.WorkFlowID : (res as any).WorkFlowLogID;
          this.WorkflowTypeName = this.WorkflowTypeName ? this.WorkflowTypeName : (res as any).WorkFlowTypeName;
          this.WorkflowTypeCode = this.WorkflowTypeCode ? this.WorkflowTypeCode : (res as any).WorkFlowTypeCode;
          this.CurrWorkFlow = this.CurrWorkFlow ? this.CurrWorkFlow : (res as any).CurrWorkFlowObject;
          // tslint:disable-next-line:max-line-length
          this.CartableUserID = this.CartableUserID ? this.CartableUserID : (res as any).CurrWorkFlowObject ? (res as any).CurrWorkFlowObject.CartableUserID : null;
        }
        Resolve();
      });
  }

  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (!this.ReadyToConfirm || this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات گزارش نظارت تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.CnrtSupervisionID,
          this.RegionCode,
          this.ModuleCode,
          0,
          this.WorkflowObjectCode,
          this.ModuleViewTypeCode,
          this.OrginalModuleCode,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null)
          .subscribe(res => {
            this.ShowMessageBoxWithOkBtn('عدم تایید گزارش نظارت با موفقیت انجام شد');
            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تایید';
            this.btnConfirmIcon = 'ok';
          }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }
  // tslint:disable-next-line:no-shadowed-variable
  DOConfirm(HasAlert = true, resolve = null) {
    if (this.WorkflowObjectCode === null) {
      this.ShowMessageBoxWithOkBtn('ماژول گردش کار برای این واحد اجرایی به درستی تعریف نشده است');
    }
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CnrtSupervisionID,
      this.RegionCode,
      this.ModuleCode,
      1,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.OrginalModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).
      subscribe(res => {
        if (HasAlert) {
          this.ShowMessageBoxWithOkBtn('تایید با موفقیت انجام شد');
        }
        this.RefreshCartable.RefreshCartable();
        this.ReadyToConfirm = 1;
        this.btnConfirmName = 'عدم تایید';
        this.btnConfirmIcon = 'cancel';
        this.IsEditable = false;
        resolve(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }
  // tslint:disable-next-line:no-shadowed-variable
  DoUnConfirm(alert = true, resolve = null) {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.CnrtSupervisionID,
      this.RegionCode,
      this.ModuleCode,
      0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.OrginalModuleCode,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        this.ReadyToConfirm = 0;
        this.btnConfirmName = 'تایید';
        this.btnConfirmIcon = 'ok';
        this.IsEditable = false;
        resolve(true);
      },
        err => {
          if (err.error.Message.includes('|')) {
            resolve(false);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }

  DOFinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
      this.WorkflowObjectCode,
      this.ModuleViewTypeCode,
      this.CartableUserID
    )
      .subscribe(res2 => {
        let messageStr = '';
        if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
          messageStr = 'بازگشت از تایید نهایی گزارش نظارت با موفقیت انجام شد';
          this.ReadyToConfirm = 0;
          this.btnConfirmName = 'تایید نهایی';
          this.btnConfirmIcon = 'ok';

        } else {
          messageStr = 'تایید نهایی گزارش نظارت با موفقیت انجام شد';
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'بازگشت از تایید نهایی';
          this.btnConfirmIcon = 'cancel';
        }
        this.ShowMessageBoxWithOkBtn(messageStr);
      });
  }

  ConfirmAndSend() {
    this.DoConfirmAndSend();
  }

  DoConfirmAndSend() {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DOConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        new Promise((StartedWFResolve, reject) => {
          this.SetStartedWFInfo(StartedWFResolve);
        }).then(() => {
          this.ObjectNo = this.ContractSupervisionCode;
          this.ObjectID = this.CnrtSupervisionID;
          this.Cartable.GetUserWorkFlow(this.WorkFlowID, 1)
            .subscribe(
              res => {
                this.IsDown = true;
                if (res != null && res.length > 0) {
                  if (this.IsEndFlow) {
                    this.WorkFlowTransitionID = res[0].WorkFlowTransitionID;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('باتوجه به اینکه نقش شما در این گردش آخرین فعالیت می باشدارسال شما به عنوان پایان کار در نظر گرفته می شود');
                  } else {
                    res.forEach(element => {
                      element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                    });
                    this.type = 'work-flow-send';
                    this.startLeftPosition = 350;
                    this.startTopPosition = 105;
                    // this.PercentWidth = null;
                    // this.OverMainMinwidthPixel = null;
                    // this.MainMaxwidthPixel = null;
                    // this.HeightPercentWithMaxBtn = null;
                    // this.MinHeightPixel = null;
                    this.ParamObj = {
                      Message: 'ارسال',
                      OperationCode: 1,
                      rows: res,
                      CurrWorkFlow: this.CurrWorkFlow,
                      WorkFlowID: this.WorkFlowID,
                      IsEnd: this.IsEndFlow,
                      ObjectNo: this.ObjectNo,
                      ModuleViewTypeCode: Number(this.ModuleViewTypeCode),
                      WorkflowTypeName: this.WorkflowTypeName,
                      WorkflowTypeCode: this.WorkflowTypeCode,
                      WorkflowObjectCode: this.WorkflowObjectCode,
                      ObjectID: this.ObjectID,
                      MinimumPosting: this.MinimumPosting,
                      OrginalModuleCode: this.OrginalModuleCode,
                      CartableUserID: this.CartableUserID
                    };
                    this.btnclicked = true;
                  }
                } else {
                  this.ShowMessageBoxWithOkBtn('شخصی جهت ارسال وجود ندارد');
                }
              }
            );
        });
      } else {
        this.IsDown = true;
      }
    });
  }

  OnFinalConfirm() {
    this.Cartable.UserConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      this.WorkFlowTransitionID,
      null,
      '',
      this.ObjectNo,
      this.WorkflowTypeCode,
      this.WorkflowTypeName,
      this.ObjectID,
      this.CartableUserID
    )
      .subscribe(res => {
        this.RefreshCartable.RefreshCartable();
        this.IsEditable = false;
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }

  onConfirmAndSend() {
    this.BtnClickedName = 'ConfirmAndSend';
    this.ConfirmAndSend();
  }

  onUnConfirmAndReturn() {
    this.IsDown = false;
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.DoUnConfirm(false, resolve);
    }).then((IsDown) => {
      if (IsDown) {
        this.ObjectNo = this.ContractSupervisionCode;
        this.ObjectID = this.CnrtSupervisionID;
        this.Cartable.GetUserWorkFlow(this.WorkFlowID, 2)
          .subscribe(
            res => {
              this.IsDown = true;
              if (res != null && res.length > 0) {
                // const minPostingObject = res.reduce((a, b) => Math.max(a.MinimumPosting, b.MinimumPosting));
                res.forEach(element => {
                  element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
                });
                this.type = 'work-flow-send';
                this.startLeftPosition = 350;
                this.startTopPosition = 105;
                // this.PercentWidth = undefined;
                // this.OverMainMinwidthPixel = undefined;
                // this.MainMaxwidthPixel = undefined;
                // this.HeightPercentWithMaxBtn = undefined;
                // this.MinHeightPixel = undefined;
                this.ParamObj = {
                  Message: 'بازگشت',
                  OperationCode: 2,
                  rows: res,
                  CurrWorkFlow: this.CurrWorkFlow,
                  WorkFlowID: this.WorkFlowID,
                  IsEnd: this.IsEndFlow,
                  ObjectNo: this.ObjectNo,
                  WorkflowTypeName: this.WorkflowTypeName,
                  WorkflowTypeCode: this.WorkflowTypeCode,
                  WorkflowObjectCode: this.WorkflowObjectCode,
                  MinimumPosting: this.MinimumPosting,
                  ObjectID: this.ObjectID,
                  OrginalModuleCode: this.OrginalModuleCode,
                  CartableUserID: this.CartableUserID
                };
                this.btnclicked = true;
              } else {
                this.ShowMessageBoxWithOkBtn('شخصی جهت بازگشت کار توسط موتور گردش کار یافت نشد لطفا با راهبر سیستم تماس حاصل فرمایید');
              }
            }
          );
      } else {
        this.IsDown = true;
        this.ShowMessageBoxWithOkBtn('عملیات تایید با مشکل مواجه شد');
      }
    });
  }
  OnClickPrintFlow() { }
}
