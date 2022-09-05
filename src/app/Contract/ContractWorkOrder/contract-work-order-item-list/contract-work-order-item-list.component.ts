import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { OverPopUpCellEditorComponent } from 'src/app/Shared/OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { ContractWorkOrderService } from 'src/app/Services/ContractService/ContractWorkOrder/ContractWorkOrderService';
declare var jquery: any;
declare var $: any;
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-work-order-item-list',
  templateUrl: './contract-work-order-item-list.component.html',
  styleUrls: ['./contract-work-order-item-list.component.css']
})
export class ContractWorkOrderItemListComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  MessageBoxResult = false;
  columnDef1;
  defaultColDef1;
  ContractWorkOrderItemList: any;
  columnDef2;
  defaultColDef2;
  selectedContractID = -1;
  btnclicked = false;
  ContractDetails;
  ContractWorkOrderDate;
  ContractSubLetter;
  ContractWorkOrderCode;
  Note;
  gridApi;
  dgEstiateApi;
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
  SelectedContractWorkOrderItemListID;
  PriceListTypeCode;
  CostListFinYearCode;
  PriceListPatternID;
  ContractWorkOrderID;
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

  constructor(private router: Router,
    private contractWorkOrder: ContractWorkOrderService,
    private contractpaydetail: ContractPayDetailsService,
    private User: UserSettingsService,
    private ArchiveList: ArchiveDetailService,
    private PriceList: PriceListService,
    private ContractList: ContractListService
  ) {

    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نام فعالیت',
        field: 'ProductName',
        width: 250,
        resizable: true,
        editable: true,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: of([]),
          bindLabelProp: 'ProductName',
          bindValueProp: 'ProductID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductName;

          } else {
            return '';
          }
        },
      },
    ];
  }

  ngOnInit() {
    this.ContractWorkOrderID = this.PopupParam.ContractWorkOrderID;
    this.ContractWorkOrderItemList = [];
    if (this.PopupParam.PriceListTypeCode) {
      this.PriceListTypeCode = this.PopupParam.PriceListTypeCode;
      this.CostListFinYearCode = this.PopupParam.CostListFinYearCode;
      this.PriceListPatternID = this.PopupParam.PriceListPatternID;
    } else {
      this.ContractList.GetBalanceFactors(this.selectedContractID).subscribe(res => {
        this.PriceListTypeCode = res[0].PriceListFineYearCode;
        this.CostListFinYearCode = res[0].PriceListTypeCode;
      });
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

      this.ArchiveList.HasArchiveAccess(2647).subscribe(res => {
        this.DetailArchiveBtnText = res ? 'مستندات فنی متره' : 'مشاهده مستندات فنی متره';
        this.ArchiveBtnText = res ? 'مستندات فنی متره' : 'مشاهده مستندات فنی صورت جلسه';
      });
      this.HaveSave = true;
      this.User.GetModulOPByUser(2647).subscribe(res => {
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
    }

    this.columnDef2 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'شرح عملیات',
        field: 'OperationNote',
        width: 110,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'کد فهرست بها',
        field: 'PriceListNo',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از فهرست بها',
        cellEditorParams: {
          SearchPopupType: 'editor-select-price-list',
          PopupParam: { CostListFinYearCode: this.CostListFinYearCode, PriceListPatternID: this.PriceListPatternID }
        },
        cellRenderer: 'SeRender',
        valueFormatter: (params) => {
          if (params.value) {
            return params.value[0].PriceListTopicCode;
          } else {
            return '';
          }
        },
        editable: true,
        width: 140,
        resizable: true
      },
      {
        headerName: 'نوع ردیف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'مقدار',
        field: 'Qty',
        width: 55,
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
        headerName: 'طول',
        field: 'Length',
        width: 55,
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
        headerName: 'عرض',
        field: 'Width',
        width: 55,
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
        headerName: 'ارتفاع',
        field: 'Height',
        width: 55,
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
        headerName: 'سطح',
        field: 'Area',
        width: 55,
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
        headerName: 'وزن',
        field: 'Weight',
        width: 55,
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
        headerName: 'جمع جزیی',
        field: 'SumDetailAmount',
        width: 70,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'جمع کل',
        field: 'SumTotalAmount',
        width: 70,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'توضیحات',
        field: 'Subject',
        width: 150,
        HaveThousand: true,
        resizable: true,
        editable: true,
      }

    ];

    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeNgInit();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeNgInit();
      return;
    }

  }

  InsertModeNgInit() {

    forkJoin([
      this.contractpaydetail.GetContractDetails(this.PopupParam.SelectedContractID),
      this.contractWorkOrder.GetMaxContractWorkOrderCode(this.PopupParam.SelectedContractID),
      this.contractpaydetail.GetContractAgent()
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[2] && res[2][0]) {
        this.ContractAgentSet = res[2];
        this.ContractAgentParams.selectedObject = res[2][0].ContractAgentCode;
      }
      this.ContractSubLetter = this.ContractDetails.LetterNo + ' - ' + this.ContractDetails.Subject;
      this.Note = this.ContractSubLetter;
      this.ContractWorkOrderCode = res[1];
      this.contractWorkOrder.GetContractWorkContractOrder(this.PopupParam.SelectedContractID,
                                                          this.ContractWorkOrderCode,
                                                           '',
                                                           null,
                                                           true)
        .subscribe(
          ress => {
            if (ress && ress[0]) {
              this.ContractWorkOrderDate = ress[0].ContractWorkOrderDate;
              ress.forEach(item => {
                item.ContractOrderEstimateList = [];
              });
              this.ContractPayItemList = ress;
            }
          }
        );
    });
  }

  EditModeNgInit() {
    this.EditModeInit = true;

    forkJoin([
      this.contractWorkOrder.GetContractWorkOrder(this.ContractWorkOrderID),
      this.contractpaydetail.GetContractAgent(),
    ]).subscribe(res => {
      this.ContractDetails = res[0];
      if (res[1] && res[1][0]) {
        this.ContractAgentSet = res[1];
        this.ContractAgentParams.selectedObject = res[1][0].ContractAgentCode;
      }
      this.ContractWorkOrderID = this.ContractDetails.CnrtWorkOrderID;
      this.ContractSubLetter = this.ContractDetails.ParentObjectStr;
      this.Note = this.ContractDetails.Note;
      this.ContractWorkOrderCode = this.ContractDetails.CnrtWorkOrderCode;
      this.ContractWorkOrderDate = this.ContractDetails.ShortContractWorkOrderDate;
      this.ContractPayItemList = res[0].ContractWorkOrderItemViewList;
    });
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
      this.ContractWorkOrderDate = ADate.MDate;
      this.contractWorkOrder.GetContractWorkContractOrder(this.PopupParam.SelectedContractID,
                                                     this.ContractWorkOrderCode,
                                                     this.ContractWorkOrderDate,
                                                     null,
                                                     true)
        .subscribe(
          ress => {
            ress.forEach(item => {
              item.ContractOrderEstimateList = [];
            });
            this.ContractPayItemList = ress;
          }
        );
    }

    if (ADate.FullDate !== '') {
      this.EditModeInit = false;
    }
  }

  onSave() {
    this.gridApi.stopEditing();
    this.dgEstiateApi.stopEditing();

    if (!this.ContractWorkOrderDate || this.ContractWorkOrderDate == null) {
      this.ShowMessageBoxWithOkBtn('تاریخ صورت وضعیت نمی تواند خالی باشد');
      return;
    }

    if (this.PopupParam.Mode === 'InsertMode') {
      this.SaveContractMinutes();
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.UpdateContractMinutes();
      return;
    }
  }

  dgContractPayItemRowClick(event) {
    this.PriceListTopicName = '';
    this.PriceListTopicUnit = '';
    this.PriceListTopicUnitAmount = '';
    this.SelectedProductID = event.data.ProductID;
    this.IsDisable = false;
    this.ProductIDs = [];
    const rowData = [];

    this.dgEstiateApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.dgEstiateApi.updateRowData({ remove: rowData });

    this.gridApi.forEachNode(node => {
      if (node.data.ProductID) {
        this.ProductIDs.push(node.data.ProductID);
      }
    });

    this.columnDef1[1].cellEditorParams.Items =
      this.contractWorkOrder
        .GetContractWorkContractOrder(this.PopupParam.SelectedContractID,
                                      this.ContractWorkOrderCode,
                                      this.ContractWorkOrderDate,
                                      this.ProductIDs,
                                      false);


    if (this.PopupParam.Mode === 'InsertMode') {
      this.InsertModeRowClick(event, rowData);
      return;
    }

    if (this.PopupParam.Mode === 'EditMode') {
      this.EditModeRowClick(event, rowData);
      return;
    }

  }

  dgContractPayItemListRowClick(event) {
    this.SelectedContractWorkOrderItemListID = event.data.CnrtWorkOrderItemListID;

    if (event.data.PriceListNo) {

      this.PriceListTopicName = event.data.PriceListName;
      this.PriceListTopicUnit = event.data.WorkUnitName;
      this.PriceListTopicUnitAmount = event.data.PriceListAmount;
    } else {
      this.PriceListTopicName = '';
      this.PriceListTopicUnit = '';
      this.PriceListTopicUnitAmount = '';
    }
  }

  InsertModeRowClick(event, rowData) {

    if (!this.beforeProductID) {
      this.ContractWorkOrderItemList = event.data.ContractOrderEstimateList;
    }

    if (this.beforeProductID && this.beforeProductID !== event.data.ProductID) {

      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          item.data.ContractOrderEstimateList = rowData;
        }
        if (item.data.ProductID === event.data.ProductID) {
          this.ContractWorkOrderItemList = item.data.ContractOrderEstimateList;
        }
      });
    }

    if (this.beforeProductID && this.beforeProductID === event.data.ProductID) {
      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          this.dgEstiateApi.updateRowData({ add: rowData });
        }
      });
    }
    this.beforeProductID = event.data.ProductID;
  }

  EditModeRowClick(event, rowData) {

    if (!this.beforeProductID) {
      this.ContractWorkOrderItemList = event.data.ContractWorkOrderItemLists;
    }

    if (this.beforeProductID && this.beforeProductID !== event.data.ProductID) {

      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          item.data.ContractWorkOrderItemLists = rowData;
        }
        if (item.data.ProductID === event.data.ProductID) {
          this.ContractWorkOrderItemList = item.data.ContractWorkOrderItemLists;
        }
      });

    }

    if (this.beforeProductID && this.beforeProductID === event.data.ProductID) {

      this.gridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeProductID) {
          this.dgEstiateApi.updateRowData({ add: rowData });
        }
      });
    }
    this.beforeProductID = event.data.ProductID;

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

  onContractPayItemListCellValueChanged(event) {
    this.ChangeDetection = true;
    let itemsToUpdate = [];

    if (event.colDef && event.colDef.field === 'PriceListNo') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PriceListPatternID = '';
          node.data.PriceListNo = event.newValue;
          node.data.PriceListName = '';
          node.data.WorkUnitName = '';
          node.data.Amount = '';
          node.data.IsStar = '';
          node.data.Qty = '';
          node.data.FinalAmount = '';
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      const Values = [];
      Values.push(event.newValue);
      this.PriceList.GetPriceListTopicList(Values, this.PriceListTypeCode + this.CostListFinYearCode, null, null).subscribe(
        res => {
          if (res[0]) {
            itemsToUpdate = [];
            this.dgEstiateApi.forEachNode(node => {
              if (node.rowIndex === event.rowIndex) {
                node.data.PriceListPatternID = res[0].PriceListPatternID;
                node.data.PriceListNo = res[0].PriceListTopicCode;
                node.data.PriceListName = res[0].PriceListTopicName;
                node.data.WorkUnitName = res[0].WorkUnitName;
                node.data.WorkUnitCode = res[0].WorkUnitCode;
                node.data.Amount = res[0].Amount;
                node.data.IsStar = res[0].IsStar;
                node.data.Qty = 1;
                node.data.FinalAmount = node.data.Qty * node.data.Amount;
                itemsToUpdate.push(node.data);
              }
            });
            this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
          }
        }
      );
    }

    // tslint:disable-next-line:max-line-length
    if (event.colDef && (event.colDef.field === 'Qty' ||
      event.colDef.field === 'Length' ||
      event.colDef.field === 'Width' ||
      event.colDef.field === 'Height' ||
      event.colDef.field === 'Area' ||
      event.colDef.field === 'Weight')) {
      itemsToUpdate = [];
      this.dgEstiateApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          let Qty = 1;
          let Length = 1;
          let Width = 1;
          let Height = 1;
          let Area = 1;
          let Weight = 1;

          if (node.data.Qty && node.data.Qty !== 0) {
            Qty = node.data.Qty;
          }

          if (node.data.Length && node.data.Length !== 0) {
            Length = node.data.Length;
          }

          if (node.data.Width && node.data.Width !== 0) {
            Width = node.data.Width;
          }

          if (node.data.Height && node.data.Height !== 0) {
            Height = node.data.Height;
          }

          if (node.data.Area && node.data.Area !== 0) {
            Area = node.data.Area;
          }

          if (node.data.Weight && node.data.Weight !== 0) {
            Weight = node.data.Weight;
          }
          // tslint:disable-next-line:radix
          if (event.colDef.field === 'Qty') {
            // tslint:disable-next-line:radix
            node.data.SumDetailAmount = parseInt(event.newValue) * Length * Width * Height * Area * Weight;
          }
          if (event.colDef.field === 'Length') {
            // tslint:disable-next-line:radix
            node.data.SumDetailAmount = parseInt(event.newValue) * Qty * Width * Height * Area * Weight;
          }
          if (event.colDef.field === 'Width') {
            // tslint:disable-next-line:radix
            node.data.SumDetailAmount = parseInt(event.newValue) * Qty * Length * Height * Area * Weight;
          }
          if (event.colDef.field === 'Height') {
            // tslint:disable-next-line:radix
            node.data.SumDetailAmount = parseInt(event.newValue) * Qty * Length * Width * Area * Weight;
          }
          if (event.colDef.field === 'Area') {
            // tslint:disable-next-line:radix
            node.data.SumDetailAmount = parseInt(event.newValue) * Qty * Length * Width * Height * Weight;
          }
          if (event.colDef.field === 'Weight') {
            // tslint:disable-next-line:radix
            node.data.SumDetailAmount = parseInt(event.newValue) * Qty * Length * Width * Height * Area;
          }

          itemsToUpdate.push(node.data);
        }
      });
      this.dgEstiateApi.updateRowData({ update: itemsToUpdate });
    }
  }

  onContractPayItemGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onContractPayItemListGridReady(params: { api: any; }) {
    this.dgEstiateApi = params.api;
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

  SaveContractMinutes() {

    const ContractWorkOrderItemList = [];
    let ContractWorkOrderListDataList = [];
    const DataList = [];

    this.dgEstiateApi.forEachNode(node => {
      DataList.push(node.data);
    });

    this.gridApi.forEachNode(node => {
      if (node.data.ProductID === this.beforeProductID) {
        node.data.ContractOrderEstimateList = DataList;
      }
    });

    this.gridApi.forEachNode(node => {
      ContractWorkOrderListDataList = [];
      let ItemNo = 0;
      node.data.ContractOrderEstimateList.sort(function(obj1, obj2) {
        return obj1.PriceListNo - obj2.PriceListNo;
      });

      // tslint:disable-next-line:radix
      node.data.ContractOrderEstimateList.forEach(item => {
        ItemNo++;
        const ListItem = {
          CnrtWorkOrderItemListID: -1,
          CnrtWorkOrderItemID: -1,
          PriceListPatternID: item.PriceListPatternID,
          OperationNote: item.OperationNote,
          ItemNo: ItemNo,
          FContractWorkOrderListDetailObject: {
            CnrtWorkOrderListDetailID: -1,
            CnrtWorkOrderItemListID: -1,
            ContractAgentCode: this.ContractAgentParams.selectedObject,
            Qty: parseFloat(item.Qty),
            Length: parseFloat(item.Length),
            Width: parseFloat(item.Width),
            Height: parseFloat(item.Height),
            Area: parseFloat(item.Area),
            Weight: parseFloat(item.Weight),
            Subject: item.Subject,
          },
        };
        ContractWorkOrderListDataList.push(ListItem);
      });

      const ContractWorkOrderItemobj = {
        CnrtWorkOrderItemID: -1,
        CnrtWorkOrderID: -1,
        ProductID: node.data.ProductID,
        ContractWorkOrderItemListDataList: ContractWorkOrderListDataList,
      };
      ContractWorkOrderItemList.push(ContractWorkOrderItemobj);
    });

    const ContractWorkOrderObj = {
      CnrtWorkOrderID: -1,
      ContractID: this.PopupParam.SelectedContractID,
      CnrtWorkOrderCode: this.ContractWorkOrderCode,
      CnrtWorkOrderDate: this.ContractWorkOrderDate,
      Note: this.Note,
    };


    this.contractWorkOrder.SaveContractWorkOrder(ContractWorkOrderObj, ContractWorkOrderItemList).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
      this.PopupParam.Mode = 'EditMode';
      this.PopupParam.ContractWorkOrderID = res;
      this.beforeProductID  = null;
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        this.ChangeDetection = true;
      }
    );
  }

  UpdateContractMinutes() {
    const ContractWorkOrderItemList = [];
    let ContractWorkOrderItemLists = [];
    const DataList = [];

    this.dgEstiateApi.forEachNode(node => {
      DataList.push(node.data);
    });

    this.gridApi.forEachNode(node => {

      if (node.data.ContractWorkOrderItemLists && node.data.ProductID === this.beforeProductID) {
        node.data.ContractWorkOrderItemLists = DataList;
      }

      if (node.data.ContractOrderEstimateList && node.data.ProductID === this.beforeProductID) {
        node.data.ContractOrderEstimateList = DataList;
      }
    });

    this.gridApi.forEachNode(node => {
      ContractWorkOrderItemLists = [];
      let ContractWorkOrderItemID = -1;
      let AContractWorkOrderItemID = -1;
      let ItemNo = 0;
      // let CostFactorID = -1;

      if (node.data.ContractWorkOrderItemID) {
        ContractWorkOrderItemID = node.data.ContractWorkOrderItemID;
        AContractWorkOrderItemID = node.data.ContractWorkOrderItemID;
      }

      // if (this.ContractMinutesID && this.ContractMinutesID !== -1) {
      //   CostFactorID = this.ContractMinutesID;
      // }

      if (node.data.ContractWorkOrderItemLists) {

        node.data.ContractWorkOrderItemLists.sort(function(obj1, obj2) {
          return obj1.PriceListNo - obj2.PriceListNo;
        });

        node.data.ContractWorkOrderItemLists.forEach(item => {
          ItemNo++;
          let ContractWorkOrderItemListID = -1;
          let ContractWorkOrderListDetailID = -1;
          if (item.ContractWorkOrderListDetailID) {
            ContractWorkOrderItemID = ContractWorkOrderItemID;
            ContractWorkOrderItemListID = item.ContractWorkOrderItemListID;
            ContractWorkOrderListDetailID = item.ContractWorkOrderListDetailID;
          } else {
            ContractWorkOrderItemID = -1;
            ContractWorkOrderItemListID = -1;
            ContractWorkOrderListDetailID = -1;
          }

          const ItemObj = {
            CnrtWorkOrderItemListID: ContractWorkOrderItemListID,
            CnrtWorkOrderItemID: ContractWorkOrderItemID,
            PriceListPatternID: item.PriceListPatternID,
            OperationNote: item.OperationNote,
            ItemNo: ItemNo,
            FContractWorkOrderListDetailObject: {
              CnrtWorkOrderListDetailID: ContractWorkOrderListDetailID,
              CnrtWorkOrderItemListID: ContractWorkOrderItemListID,
              ContractAgentCode: this.ContractAgentParams.selectedObject,
              Qty: parseFloat(item.Qty),
              Length: parseFloat(item.Length),
              Width: parseFloat(item.Width),
              Height: parseFloat(item.Height),
              Area: parseFloat(item.Area),
              Weight: parseFloat(item.Weight),
              Subject: item.Subject,
            },
          };

          ContractWorkOrderItemLists.push(ItemObj);
        });
      }

      if (node.data.ContractOrderEstimateList) {

        node.data.ContractOrderEstimateList.sort(function(obj1, obj2) {
          return obj1.PriceListNo - obj2.PriceListNo;
        });

        node.data.ContractOrderEstimateList.forEach(item => {
          let ContractWorkOrderItemListID = -1;
          let ContractWorkOrderListDetailID = -1;
          ItemNo++;

          if (item.ContractWorkOrderItemListID) {
            ContractWorkOrderItemID = ContractWorkOrderItemID;
            ContractWorkOrderItemListID = item.ContractWorkOrderItemListID;
            ContractWorkOrderListDetailID = item.ContractWorkOrderListDetailID;
          } else {
            ContractWorkOrderItemID = -1;
            ContractWorkOrderItemListID = -1;
            ContractWorkOrderListDetailID = -1;
          }

          const ItemObj = {
            CnrtWorkOrderItemListID: ContractWorkOrderItemListID,
            CnrtWorkOrderItemID: ContractWorkOrderItemID,
            PriceListPatternID: item.PriceListPatternID,
            OperationNote: item.OperationNote,
            ItemNo: ItemNo,
            FContractWorkOrderListDetailObject: {
              CnrtWorkOrderListDetailID: ContractWorkOrderListDetailID,
              CnrtWorkOrderItemListID: ContractWorkOrderItemListID,
              ContractAgentCode: this.ContractAgentParams.selectedObject,
              Qty: parseFloat(item.Qty),
              Length: parseFloat(item.Length),
              Width: parseFloat(item.Width),
              Height: parseFloat(item.Height),
              Area: parseFloat(item.Area),
              Weight: parseFloat(item.Weight),
              Subject: item.Subject,
            },
          };

          ContractWorkOrderItemLists.push(ItemObj);
        });
      }

      const obj = {
        CnrtWorkOrderItemID: AContractWorkOrderItemID,
        CnrtWorkOrderID: this.ContractWorkOrderID,
        ProductID: node.data.ProductID,
        ContractWorkOrderItemListDataList: ContractWorkOrderItemLists
      };
      ContractWorkOrderItemList.push(obj);
    });

    const ContractWorkOrderObj = {
      CnrtWorkOrderID: this.ContractWorkOrderID,
      ContractID: this.PopupParam.SelectedContractID,
      CnrtWorkOrderCode: this.ContractWorkOrderCode,
      CnrtWorkOrderDate: this.ContractWorkOrderDate,
      Note: this.Note,
    };


    this.contractWorkOrder.UpdateContractWorkOrder(ContractWorkOrderObj,
                                                   ContractWorkOrderItemList
    )
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ChangeDetection = false;
        this.beforeProductID = null;
        this.ngOnInit();
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          this.ChangeDetection = true;
        }
      );
  }

  BtnArchiveClick() {
    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 315;
    this.startTopPosition = 44;
    const archiveParam = {
      EntityID: this.ContractWorkOrderID,
      TypeCodeStr: '9-',
      DocTypeCode: 9,
      ModuleCode: 2648,
      IsReadOnly: this.PopupParam.IsViewable
    };
    this.ParamObj = archiveParam;
  }

  BtnDetailArchiveClick() {

    if (!this.SelectedContractWorkOrderItemListID) {
      this.ShowMessageBoxWithOkBtn('ردیف متره اتنخاب نشده است');
      return;
    }

    this.type = 'archive-details';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 315;
    this.startTopPosition = 44;
    const archiveParam = {
      EntityID: this.SelectedContractWorkOrderItemListID,
      TypeCodeStr: '9-',
      DocTypeCode: 9,
      ModuleCode: 2648,
      IsReadOnly: this.PopupParam.IsViewable
    };
    this.ParamObj = archiveParam;
  }

  OnGroupBtnClick(event) {
    this.startLeftPosition = 60;
    this.startTopPosition = 10;
    this.ParamObj = {
      CostListFinYearCode: this.CostListFinYearCode,
      PriceListPatternID: this.PopupParam.PriceListPatternID,
      GroupSelected: true
    };
    this.type = 'editor-select-price-list';
    this.btnclicked = true;
    this.HaveMaxBtn = true;
  }

  OnRowBtnClick(event) {

    if (event === 'RowItems') {
      this.AddRowItems();
      return;
    }
  }

  AddRowItems() {

    if (!this.SelectedProductID) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت انجام این عملیات انتخاب نشده است.');
      return;
    }

    this.startLeftPosition = 93;
    this.startTopPosition = 73;
    this.type = 'selecet-contract-estimate';
    this.btnclicked = true;

    const PriceListPatternIDs = [-1];
    this.dgEstiateApi.forEachNode(node => {
      PriceListPatternIDs.push(node.data.PriceListPatternID);
    });


    this.ParamObj = {
      ContractID: this.PopupParam.SelectedContractID,
      ProductID: this.SelectedProductID,
      PriceListPatternIDs: PriceListPatternIDs,
      ContractPayNo: this.ContractWorkOrderCode
    };
  }

  getOutPutParam(event) {

    if (this.type === 'editor-select-price-list') {
      this.SetPriceListTopicList(event);
      return;
    }
    if (this.type === 'selecet-contract-estimate') {
      this.SetEstimateList(event);
      return;
    }

    if (this.type === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }
    if (this.type === 'price-list-topic-dataentry-page') {
      this.AddPopUpBtnClick(event);
      return;
    }
  }

  SetEstimateList(event) {
    this.dgEstiateApi.updateRowData({ add: event });
  }

  SetPriceListTopicList(event) {
    const rowData = [];
    this.dgEstiateApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.PriceList.GetPriceListTopicList(event, this.PriceListTypeCode + this.CostListFinYearCode, null, null).subscribe(
      res => {
        if (res) {
          const itemsToUpdate = [];
          res.forEach(element => {
            MaxProp = MaxProp + 1;
            const newItem = {
              ItemNo: MaxProp,
              PriceListPatternID: element.PriceListPatternID,
              ContractOrderItemID: element.selectedContractOrderItemID,
              PriceListNo: element.PriceListTopicCode,
              PriceListName: element.PriceListTopicName,
              WorkUnitName: element.WorkUnitName,
              PriceListAmount: element.Amount,
              IsStar: element.IsStar,
              Qty: 1,
              FinalAmount: 1 * element.Amount
            };
            itemsToUpdate.push(newItem);
          });
          this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
        }
      }
    );
  }

  OnImportFromExcelBtnClick() {
    this.btnclicked = true;
    this.type = 'app-excel-load-data';
    this.startLeftPosition = 400;
    this.startTopPosition = 200;
    this.Excel_Header_Param = {
      colDef2: this.columnDef2
    };
    this.ParamObj = this.Excel_Header_Param;
  }

  loadFromExcel(data) {

    const PriceListTopicCodes = [];
    const rowData = [];
    data.forEach((x: any) => {
      if (x.PriceListNo) {
        PriceListTopicCodes.push(x.PriceListNo);
      }
    });

    this.dgEstiateApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }

    this.PriceList.GetPriceListTopicList(PriceListTopicCodes, this.PriceListTypeCode + this.CostListFinYearCode,
      this.ContractWorkOrderDate, this.PopupParam.SelectedContractID). // تغییر متد با هماهنگی با آقای آخوندی
      subscribe(
        res => {
          if (res) {
            const itemsToUpdate = [];
            res.forEach(element => {
              MaxProp = MaxProp + 1;
              const ExcelObj = data.filter(x => x.PriceListNo === element.PriceListTopicCode)[0];
              const newItem = {
                ItemNo: MaxProp,
                PriceListPatternID: element.PriceListPatternID,
                PriceListNo: element.PriceListTopicCode,
                PriceListName: element.PriceListTopicName,
                WorkUnitName: element.WorkUnitName,
                PriceListAmount: element.Amount,
                IsStar: element.IsStar,
                OperationNote: ExcelObj && ExcelObj.OperationNote ? ExcelObj.OperationNote : '',
                Qty: ExcelObj && ExcelObj.Qty ? ExcelObj.Qty : '',
                Length: ExcelObj && ExcelObj.Length ? ExcelObj.Length : '',
                Width: ExcelObj && ExcelObj.Width ? ExcelObj.Width : '',
                Height: ExcelObj && ExcelObj.Height ? ExcelObj.Height : '',
                Area: ExcelObj && ExcelObj.Area ? ExcelObj.Area : '',
                Weight: ExcelObj && ExcelObj.Weight ? ExcelObj.Weight : '',
                Subject: ExcelObj && ExcelObj.Subject ? ExcelObj.Subject : '',
              };
              itemsToUpdate.push(newItem);
            });
            this.dgEstiateApi.updateRowData({ add: itemsToUpdate });
          }
        }
      );
  }

  onAddPopUpBtnClick() {
    this.type = 'price-list-topic-dataentry-page';
    this.btnclicked = true;
    this.startLeftPosition = 450;
    this.startTopPosition = 51;
    this.ParamObj = {
      Mode: 'AddNewPopUpMode',
      PriceListTypeCode: this.PriceListTypeCode,
      CostListFinYearCode: this.CostListFinYearCode,
    };
  }

  AddPopUpBtnClick(element) {
    const ItemList = [];
    const obj = {
      PriceListPatternID: element.PriceListPatternID,
      PriceListNo: element.PriceListTopicCode,
      PriceListName: element.PriceListTopicName,
      WorkUnitName: element.WorkUnitName,
      PriceListAmount: element.Amount,
      IsStar: element.IsStar,
    };
    ItemList.push(obj);
    this.dgEstiateApi.updateRowData({ add: ItemList });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
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
}
