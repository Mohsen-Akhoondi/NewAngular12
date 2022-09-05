import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-set-invalid-contract-estimate',
  templateUrl: './set-invalid-contract-estimate.component.html',
  styleUrls: ['./set-invalid-contract-estimate.component.css']
})
export class SetInvalidContractEstimateComponent implements OnInit {
  @Input() PopupParam;
  @Output() SetInvalidContractEstimateClosed: EventEmitter<any> = new EventEmitter<any>();
  @Output() SetInvalidContractEstimateOutPutParam: EventEmitter<any> = new EventEmitter<any>();
  EstimatecolumnDef;
  AddBtnName = 'ایجاد ردیف فهرست بها';
  SetContractEstimateResultView = [];
  selectedRow;
  HaveHeader: boolean;
  RowValidation: boolean;
  gridApi;
  BtnIconPath = 'assets/Icons/add.png';
  type;
  btnclicked;
  startLeftPosition;
  OverPopUpParams;
  startTopPosition;
  EstimateRowData;
  constructor() { this.RowValidation = true; }

  ngOnInit() {
    this.EstimatecolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ردیف فهرست بها',
        field: 'PriceListNo',
        width: 140,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListName',
        width: 230,
        resizable: true
      },
      {
        headerName: 'نوع ردیف',
        field: 'IsStar',
        width: 70,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'WorkUnitName',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        HaveThousand: true,
        width: 80,
        resizable: true,
        valueParser: numberValueParser,
        editable : (params) => {
          return params.data.validated;
        }
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 100,
        resizable: true
      }
    ];
    if (this.PopupParam && this.PopupParam.InvalidEstimateRows) {
      this.EstimateRowData = this.PopupParam.InvalidEstimateRows;
      this.PopupParam.InvalidEstimateRows.forEach(element => {
        this.SetContractEstimateResultView.push(element);
      });
    }
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
    this.gridApi.forEachNode(item => {
      if (item.data.PriceListPatternID) {
        item.data.validated = true;
      } else {
        item.data.validated = false;
      }
    });
  }
  onClose() {
    this.SetInvalidContractEstimateOutPutParam.emit(this.SetContractEstimateResultView);
    this.SetInvalidContractEstimateClosed.emit(this.SetContractEstimateResultView);
  }
  onFillEstimate() {
    if (!this.selectedRow || !this.selectedRow.data.PriceListNo) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت تکمیل اطلاعات انتخاب نشده است');
      return;
    }
    this.type = 'price-list-topic-dataentry-page';
    this.btnclicked = true;
    this.startLeftPosition = 455;
    this.startTopPosition = 168;
    if (!this.selectedRow.data.PriceListPatternID) {
      this.OverPopUpParams = {
        Mode: 'AddBatchTopicInEstimate',
        ContractEstimateRow: this.selectedRow.data,
        PriceListTypeCode: this.PopupParam.PriceListTypeCode,
        CostListFinYearCode: this.PopupParam.CostListFinYearCode,
        PriceListTopicCode: this.selectedRow.data.PriceListNo,
        Amount: this.selectedRow.data.Amount
      };
    } else {
      this.OverPopUpParams = {
        Mode: 'EditBatchTopicInEstimate',
        ContractEstimateRow: this.selectedRow.data,
        PriceListTypeCode: this.PopupParam.PriceListTypeCode,
        CostListFinYearCode: this.PopupParam.CostListFinYearCode,
        PriceListTopicCode: this.selectedRow.data.PriceListNo,
        Amount: this.selectedRow.data.Amount
      };
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.OverPopUpParams = { HaveOkBtn: true, message: message, HaveYesBtn: false, HaveNoBtn: false };
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
  }
  RowClick(InputValue) {
    if (InputValue.data.validated) {
      this.RowValidation = false;
    } else {
      this.RowValidation = true;
    }
    this.selectedRow = InputValue;
  }
  popupclosed(param) {
    this.btnclicked = false;
  }
  SetEstimateParam(param) {
    if (param.PriceListPatternID && this.OverPopUpParams.Mode === 'AddBatchTopicInEstimate') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.data.ItemNo === param.ItemNo && node.data.ContractOrderItemID === param.ContractOrderItemID) {
          node.data.PriceListPatternID = param.PriceListPatternID;
          node.data.PriceListNo = param.PriceListTopicCode;
          node.data.PriceListName = param.PriceListTopicName;
          node.data.WorkUnitName = param.WorkUnitName;
          node.data.Amount = param.Amount;
          node.data.IsStar = param.IsStar;
          node.data.IsStarCode = param.IsStarCode;
          node.data.ContractTopicMapCode = param.ContractTopicMapCode,
          itemsToUpdate.push(node.data);
        }
        const CurrObj = this.SetContractEstimateResultView.filter(x => x.PriceListPatternID === node.data.PriceListPatternID)[0];
        if (CurrObj && CurrObj.PriceListPatternID) {
          const itemIndex = this.SetContractEstimateResultView.findIndex(item => item.PriceListPatternID === node.data.PriceListPatternID);
          this.SetContractEstimateResultView[itemIndex] = CurrObj;
        } else {
          this.SetContractEstimateResultView.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    } else if (param.PriceListPatternID && this.OverPopUpParams.Mode === 'EditBatchTopicInEstimate') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.data.PriceListPatternID === param.PriceListPatternID) {
          node.data.Amount = param.Amount;
          itemsToUpdate.push(node.data);
        }
        const CurrObj = this.SetContractEstimateResultView.filter(x => x.PriceListPatternID === node.data.PriceListPatternID)[0];
        const itemIndex = this.SetContractEstimateResultView.findIndex(item => item.PriceListPatternID === node.data.PriceListPatternID);
        CurrObj.Amount = param.Amount;
        this.SetContractEstimateResultView[itemIndex] = CurrObj;
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }
  onConfirm() {

  }
}
