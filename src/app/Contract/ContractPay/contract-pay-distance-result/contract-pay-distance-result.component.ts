import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransferDistanceItemService } from 'src/app/Services/BaseService/TransferDistanceItemService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { round } from 'lodash';
import { isUndefined } from 'util';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-pay-distance-result',
  templateUrl: './contract-pay-distance-result.component.html',
  styleUrls: ['./contract-pay-distance-result.component.css']
})
export class ContractPayDistanceResultComponent implements OnInit {
  @Input() PopUpParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ModuleCode;
  columnDef2;
  columnDef1;
  btnclicked = false;
  ProductName: any;
  rowData1: any;
  rowData2: any;
  dgApi;
  DistanceItemApi;
  PopupType;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  ContractPayTransfer;
  HaveSave;
  FinalAmount;
  SelectedTransRow: any;
  SelectedTransItemRow: any;
  SelectedQty: any;
  defaultSelectedRowIndex = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private TransferDistanceItem: TransferDistanceItemService,
    private PriceList: PriceListService) {
    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true,
      },
      {
        headerName: 'از مبدا تا مقصد',
        field: 'Note',
        width: 400,
        resizable: true,
        editable: () => {
          if (this.HaveSave) {
              return true;
          } else {
              return false;
          }
        },
      },
      {
        headerName: 'فاصله',
        field: 'Distance',
        width: 200,
        resizable: true,
        editable: () => {
          if (this.HaveSave) {
              return true;
          } else {
              return false;
          }
        },
        cellEditorParams: { IsFloat: true },
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (!params.data.Qty) {
            params.data.Qty = 0;
          }
          if (params.newValue) {
            params.data.Distance = params.newValue;
            return true;
          } else {
            params.data.Distance = '';
            return false;
          }
        },
      },
      {
        headerName: 'جمع مصرفی',
        field: 'Qty',
        width: 150,
        resizable: true,
        editable: () => {
          if (this.HaveSave) {
              return true;
          } else {
              return false;
          }
        },
        cellEditorParams: { IsFloat: true },
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        valueParser: numberValueParser,
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Qty = params.newValue;
            return true;
          } else {
            params.data.Qty = '';
            return false;
          }
        },
      }
    ];
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
    this.columnDef2 = [
      {
        headerName: 'ردیف',
        field: 'Item',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'ایتم',
        field: 'PriceListTopicCode',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'شرح مختصر',
        field: 'PriceListTopicName',
        width: 250,
        resizable: true,
      },
      {
        headerName: 'حاصل',
        field: 'Result',
        width: 70,
        resizable: true,
      },
      {
        headerName: 'آسفالت 1',
        field: 'RoadType1',
        width: 70,
        resizable: true,
      },
      {
        headerName: 'خاکی 1.3',
        field: 'RoadType2',
        width: 70,
        resizable: true,
        editable: () => {
          if (this.HaveSave) {
              return true;
          } else {
              return false;
          }
        },

        valueSetter: (params) => {
          if (params.newValue) {
            params.data.RoadType2 = params.newValue;
            return true;
          } else {
            params.data.RoadType2 = '';
            return false;
          }
        },
      },
      {
        headerName: 'شنی 1.3',
        field: 'RoadType3',
        width: 70,
        resizable: true,
        editable: () => {
          if (this.HaveSave) {
              return true;
          } else {
              return false;
          }
        },

        valueSetter: (params) => {
          if (params.newValue) {
            params.data.RoadType3 = params.newValue;
            return true;
          } else {
            params.data.RoadType3 = '';
            return false;
          }
        },
      },
      {
        headerName: 'ساخته نشده 1.35',
        field: 'RoadType4',
        width: 120,
        resizable: true,
        editable: () => {
          if (this.HaveSave) {
              return true;
          } else {
              return false;
          }
        },

        valueSetter: (params) => {
          if (params.newValue) {
            params.data.RoadType4 = params.newValue;
            return true;
          } else {
            params.data.RoadType4 = '';
            return false;
          }
        },
      },
      {
        headerName: 'تا کیلومتر',
        field: 'ToDistance',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'از کیلومتر',
        field: 'FromDistance',
        width: 120,
        resizable: true,
      },
    ];

    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.FinalAmount = this.PopUpParam.FinalAmount;
    this.HaveSave = this.PopUpParam.HaveSave;
    this.rowData1 = [];
    this.rowData2 = [];
    this.TransferDistanceItem.GetContractPayTransfer(this.PopUpParam.ContractPayItemID,
      this.PopUpParam.ProductID,
      this.PopUpParam.ContractAgentCode).
      subscribe(res => {
        this.ContractPayTransfer = res;
        if (this.ContractPayTransfer) {
          this.rowData1 = this.ContractPayTransfer;
        }
      });
  }

  popupclosed() {
    this.btnclicked = false;
  }

  closeModal() {
    this.Closed.emit(true);
  }

  onGridReady(params: { api: any; }) {
    this.dgApi = params.api;
  }

  onDistanceItemGridReady(params: { api: any; }) {
    this.DistanceItemApi = params.api;
  }

  onCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'Distance') {
      this.TransferDistanceItem.CalculateTransferDistanceItem(this.PopUpParam.PriceListTopicCode,
        this.PopUpParam.ProductID,
        this.PopUpParam.TopicCode,
        event.data.Distance).
        subscribe(res => {
          res.forEach(element => {
            element.RoadType1 = element.Distance;
            element.Result = round(element.RoadType1 * parseFloat(event.data.Qty));
          });
          this.rowData2 = res;
          this.SelectedTransRow.ContractPayTransferItemViewList = res;
        });
      this.dgApi.stopEditing();
      const item = [];
      this.dgApi.forEachNode(node => {
        node.data.ContractPayTransferID = node.data.ContractPayTransferID && node.data.ContractPayTransferID > 0
          && !isUndefined(node.data.ContractPayTransferID) ? node.data.ContractPayTransferID : -1;
        item.push(node.data);
      });
      const items = [];
      this.DistanceItemApi.forEachNode(node => {
        node.data.ContractPayTransferID = node.data.ContractPayTransferID && node.data.ContractPayTransferID > 0
        && !isUndefined(node.data.ContractPayTransferID)
        ? node.data.ContractPayTransferID : this.SelectedTransRow.ContractPayTransferID;
      node.data.ContractPayTransferItemID = node.data.ContractPayTransferItemID && node.data.ContractPayTransferItemID > 0
        && !isUndefined(node.data.ContractPayTransferItemID) ? node.data.ContractPayTransferItemID
        : -1;
      items.push(node.data);
      });
      this.DistanceItemApi.updateRowData({ update: items });
      this.SelectedTransRow.ContractPayTransferItemViewList = items;
    }
    if (event.colDef && event.colDef.field === 'Qty') {
      const list = [];
      this.DistanceItemApi.stopEditing();
      this.DistanceItemApi.forEachNode(node => {
        node.data.Result = parseFloat(node.data.RoadType1) * parseFloat(event.newValue) +
          parseFloat(node.data.RoadType2) * parseFloat(event.newValue) * 1.3 +
          parseFloat(node.data.RoadType3) * parseFloat(event.newValue) * 1.3 +
          parseFloat(node.data.RoadType4) * parseFloat(event.newValue) * 1.35;

            node.data.ContractPayTransferID = node.data.ContractPayTransferID && node.data.ContractPayTransferID > 0
            && !isUndefined(node.data.ContractPayTransferID)
            ? node.data.ContractPayTransferID : this.SelectedTransRow.ContractPayTransferID;
          node.data.ContractPayTransferItemID = node.data.ContractPayTransferItemID && node.data.ContractPayTransferItemID > 0
            && !isUndefined(node.data.ContractPayTransferItemID) ? node.data.ContractPayTransferItemID
            : -1;
            list.push(node.data);
      });
      this.DistanceItemApi.updateRowData({ update: list });
      this.SelectedTransRow.ContractPayTransferItemViewList = list;
    }

    const items = [];
    this.dgApi.forEachNode(node => {
      node.data.ContractPayTransferID = node.data.ContractPayTransferID && node.data.ContractPayTransferID > 0
        && !isUndefined(node.data.ContractPayTransferID) ? node.data.ContractPayTransferID : -1;
      items.push(node.data);
    });
    this.dgApi.updateRowData({ update: items });
  }

  onDistanceItemCellValueChanged(event) {
    if (this.SelectedQty === null || isUndefined(this.SelectedQty)) {
      this.SelectedQty = 0;
    }
    if (event.colDef && event.colDef.field === 'RoadType2') {
      const itemsToUpdate = [];

      this.DistanceItemApi.forEachNode(node => {
        const RoadType3 = node.data.RoadType3 ? node.data.RoadType3 : 0;
        const RoadType4 = node.data.RoadType4 ? node.data.RoadType4 : 0;
        if (node.rowIndex === event.rowIndex) {

          if (parseFloat(node.data.Distance) - (parseFloat(event.newValue) +
            parseFloat(RoadType3) +
            parseFloat(RoadType4)) >= 0) {

            node.data.RoadType1 = parseFloat(node.data.Distance) - (parseFloat(event.newValue) +
              parseFloat(RoadType3) +
              parseFloat(RoadType4));

            node.data.Result = parseFloat(node.data.RoadType1) * parseFloat(this.SelectedQty) +
              parseFloat(event.newValue) * parseFloat(this.SelectedQty) * 1.3 +
              parseFloat(RoadType3) * parseFloat(this.SelectedQty) * 1.3 +
              parseFloat(RoadType4) * parseFloat(this.SelectedQty) * 1.35;

          } else {
            node.data.RoadType2 = event.oldValue;

          }
          itemsToUpdate.push(node.data);
        }
      });

      this.DistanceItemApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'RoadType3') {
      const itemsToUpdate = [];
      this.DistanceItemApi.forEachNode(node => {
        const RoadType2 = node.data.RoadType2 ? node.data.RoadType2 : 0;
        const RoadType4 = node.data.RoadType4 ? node.data.RoadType4 : 0;
        if (node.rowIndex === event.rowIndex) {

          if (parseFloat(node.data.Distance) - (parseFloat(event.newValue) +
            parseFloat(RoadType2) +
            parseFloat(RoadType4)) >= 0) {
            node.data.RoadType1 = parseFloat(node.data.Distance) - (parseFloat(event.newValue) +
              parseFloat(RoadType2) +
              parseFloat(RoadType4));

            node.data.Result = parseFloat(node.data.RoadType1) * parseFloat(this.SelectedQty) +
              parseFloat(event.newValue) * parseFloat(this.SelectedQty) * 1.3 +
              parseFloat(RoadType2) * parseFloat(this.SelectedQty) * 1.3 +
              parseFloat(RoadType4) * parseFloat(this.SelectedQty) * 1.35;
          } else {
            node.data.RoadType3 = event.oldValue;
          }
          itemsToUpdate.push(node.data);
        }
      });
      this.DistanceItemApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'RoadType4') {
      const itemsToUpdate = [];
      this.DistanceItemApi.forEachNode(node => {
        const RoadType2 = node.data.RoadType2 ? node.data.RoadType2 : 0;
        const RoadType3 = node.data.RoadType3 ? node.data.RoadType3 : 0;
        if (node.rowIndex === event.rowIndex) {
          if (parseFloat(node.data.Distance) - (parseFloat(event.newValue) +
            parseFloat(RoadType2) +
            parseFloat(RoadType3)) >= 0) {
            node.data.RoadType1 = parseFloat(node.data.Distance) - (parseFloat(event.newValue) +
              parseFloat(RoadType2) +
              parseFloat(RoadType3));

            node.data.Result = parseFloat(node.data.RoadType1) * parseFloat(this.SelectedQty) +
              parseFloat(event.newValue) * parseFloat(this.SelectedQty) * 1.35 +
              parseFloat(RoadType2) * parseFloat(this.SelectedQty) * 1.3 +
              parseFloat(RoadType3) * parseFloat(this.SelectedQty) * 1.3;

          } else {
            node.data.RoadType4 = event.oldValue;
          }
          itemsToUpdate.push(node.data);
        }
      });
      this.DistanceItemApi.updateRowData({ update: itemsToUpdate });
    }
    const items = [];
    this.DistanceItemApi.forEachNode(node => {
      node.data.ContractPayTransferID = node.data.ContractPayTransferID && node.data.ContractPayTransferID > 0
        && !isUndefined(node.data.ContractPayTransferID)
        ? node.data.ContractPayTransferID : this.SelectedTransRow.ContractPayTransferID;
      node.data.ContractPayTransferItemID = node.data.ContractPayTransferItemID && node.data.ContractPayTransferItemID > 0
        && !isUndefined(node.data.ContractPayTransferItemID) ? node.data.ContractPayTransferItemID
        : -1;
      items.push(node.data);
    });
    this.SelectedTransRow.ContractPayTransferItemViewList = items;
  }

  onSave() {
    this.dgApi.stopEditing();
    this.DistanceItemApi.stopEditing();

    this.SaveContractPayTransfer();
  }

  SaveContractPayTransfer() {

    let TotalQty = 0;
    let gridHasRecor = false;
    this.dgApi.forEachNode(node => {
      TotalQty = TotalQty + parseFloat((node.data.Qty).replace(/,/g, ''));
      gridHasRecor = true;

    });
    if (TotalQty !== this.FinalAmount && gridHasRecor) {
      this.ShowMessageBoxWithOkBtn('جمع ستون حجم مصرفی برابر با جمع کل مصرفی نمی باشد.'); // RFC 54337
      return;
    }
    const TransferDistanceList = [];

    this.dgApi.forEachNode(node => {
      const TransferDistanceItemList = [];
      if (node.data.ContractPayTransferItemViewList) {
        node.data.ContractPayTransferItemViewList.forEach(element => {
          if (element.RoadType1 && element.RoadType1 > 0) {
            const TransferDistanceItemObj = {
              ContractPayTransferItemID: element.ContractPayTransferItemID ? element.ContractPayTransferItemID : -1,
              ContractPayTransferID: element.ContractPayTransferID ? element.ContractPayTransferID : -1,
              TransferDistanceItemID: element.TransferDistanceItemID,
              RoadTypeCode: 1,
              Qty: parseFloat(element.RoadType1)
            };
            TransferDistanceItemList.push(TransferDistanceItemObj);
          }
          if (element.RoadType2 && element.RoadType2 > 0) {
            const TransferDistanceItemObj = {
              ContractPayTransferItemID: element.ContractPayTransferItemID ? element.ContractPayTransferItemID : -1,
              ContractPayTransferID: element.ContractPayTransferID ? element.ContractPayTransferID : -1,
              TransferDistanceItemID: element.TransferDistanceItemID,
              RoadTypeCode: 2,
              Qty: parseFloat(element.RoadType2)
            };
            TransferDistanceItemList.push(TransferDistanceItemObj);
          }
          if (element.RoadType3 && element.RoadType3 > 0) {
            const TransferDistanceItemObj = {
              ContractPayTransferItemID: element.ContractPayTransferItemID ? element.ContractPayTransferItemID : -1,
              ContractPayTransferID: element.ContractPayTransferID ? element.ContractPayTransferID : -1,
              TransferDistanceItemID: element.TransferDistanceItemID,
              RoadTypeCode: 3,
              Qty: parseFloat(element.RoadType3)
            };
            TransferDistanceItemList.push(TransferDistanceItemObj);
          }
          if (element.RoadType4 && element.RoadType4 > 0) {
            const TransferDistanceItemObj = {
              ContractPayTransferItemID: element.ContractPayTransferItemID ? element.ContractPayTransferItemID : -1,
              ContractPayTransferID: element.ContractPayTransferID ? element.ContractPayTransferID : -1,
              TransferDistanceItemID: element.TransferDistanceItemID,
              RoadTypeCode: 4,
              Qty: parseFloat(element.RoadType4)
            };
            TransferDistanceItemList.push(TransferDistanceItemObj);
          }
        });
      }
      node.data.ContractPayTransferItemList = TransferDistanceItemList;
      node.data.ContractPayTransferID = node.data.ContractPayTransferID ? node.data.ContractPayTransferID : -1;
      node.data.ItemNo = node.data.ItemNo;
      node.data.Distance = node.data.Distance;
      node.data.Note = node.data.Note;
      node.data.Qty = parseFloat((node.data.Qty).replace(/,/g, ''));
      TransferDistanceList.push(node.data);
    });

    this.TransferDistanceItem.SaveContractPayTransfer(TransferDistanceList, this.PopUpParam.ContractPayItemID,
      this.PopUpParam.ProductID, this.PopUpParam.ContractAgentCode).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          }
        });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ContPayTransRowClick(event) {
    this.DistanceItemApi.stopEditing();
    if (event.data.ContractPayTransferItemViewList) {
      event.data.ContractPayTransferItemViewList.forEach(element => {
        element.Result = parseFloat(element.RoadType1) * parseFloat(event.data.Qty) +
          parseFloat(element.RoadType2) * parseFloat(event.data.Qty) * 1.3 +
          parseFloat(element.RoadType3) * parseFloat(event.data.Qty) * 1.3 +
          parseFloat(element.RoadType4) * parseFloat(event.data.Qty) * 1.35;
      });
      this.rowData2 = event.data.ContractPayTransferItemViewList;
    } else {
      this.rowData2 = [];
    }

    this.SelectedTransRow = event.data;
    this.SelectedQty = event.data.Qty;
  }

  ContPayTransItemRowClick(event) {
    this.SelectedTransItemRow = event.data;
  }

  RowAdded(event) {
    event.Qty = 0;
    let SumQty = 0;
    let RemainQty = 0;
    this.dgApi.forEachNode(node => {
      if (!isUndefined(node.data.Qty)) {
        SumQty = SumQty + parseFloat(node.data.Qty);
      }
    });
    RemainQty = this.FinalAmount - SumQty;
    event.Qty = RemainQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  DeletedRow(event) {
    if (event) {
      this.rowData2 = [];
    }
  }
}
