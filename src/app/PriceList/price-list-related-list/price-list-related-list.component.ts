import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ContractEstimateService } from 'src/app/Services/ContractService/ContractEstimates/ContractEstimateService';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';

@Component({
  selector: 'app-price-list-related-list',
  templateUrl: './price-list-related-list.component.html',
  styleUrls: ['./price-list-related-list.component.css']
})
export class PriceListRelatedListComponent implements OnInit {
  @Input() PopupParam;
  @Output() RelatedListClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  data;
  PriceListTopicCode;
  PriceListTopicName;
  Amount;
  Qty;
  VariableName;
  VariableDescription;
  InputCode;
  IsShow = false;
  CalcFunction;
  IsEfectToPrice;
  SelectedPriceListPatternID;
  SelectedRowData;
  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  ContractOrderEstimateobj;
  ContractPayEstimateobj;
  gridcolumns = [
    {
      headerName: 'ردیف',
      field: 'PriceListTopicCode',
      sortable: true,
      filter: true,
      width: 100,
      resizable: true
    },
    {
      headerName: 'نام',
      field: 'PriceListTopicName',
      sortable: true,
      filter: true,
      width: 390,
      resizable: true
    },
    {
      headerName: 'واحد',
      field: 'WorkUnitName',
      sortable: true,
      filter: true,
      width: 90,
      resizable: true
    },
    {
      headerName: 'مبلغ',
      field: 'Amount',
      sortable: true,
      filter: true,
      HaveThousand: true,
      width: 100,
      resizable: true
    },
    {
      headerName: 'کارکرد/پایکار',
      field: 'IsWork',
      sortable: true,
      filter: true,
      width: 80,
      resizable: true
    },
    {
      headerName: 'نوع ردیف',
      field: 'IsStar',
      width: 70,
      resizable: true
    }
  ];
  gridApi: any;
  rowData: any;
  SelectedRowAmount: any;
  ProductRequestEstimateobj;


  constructor(private PriceList: PriceListService,
    private ContractEstimate: ContractEstimateService,
    private ContractPay: ContractPayService
  ) {
  }

  ngOnInit() {
    this.data = this.PopupParam.RowSelected;
    // tslint:disable-next-line:max-line-length
    this.PriceList.GetRelatedPriceListPatternList(this.data.PriceListPatternID, this.PopupParam.ContractPayDate, this.PopupParam.ContractID )
      .subscribe(res => {
        this.rowData = res;
      });
    if (this.PopupParam.ModuleCode !== 2627) {
      this.PriceListTopicCode = this.data.PriceListNo;
      this.PriceListTopicName = this.data.PriceListName;
      this.Amount = this.data.Amount;
    } else {
      this.PriceListTopicCode = this.data.PriceListTopicCode;
      this.PriceListTopicName = this.data.PriceListTopicName;
      this.Amount = this.data.Amount;
    }
    this.Qty = this.data.Qty;
  }

  onClose() {
    if (this.PopupParam.Mode === 'ContractOrderEstimateMode' && this.ContractOrderEstimateobj) {
      this.OutPutParam.emit(this.ContractOrderEstimateobj);
    } else if (this.ContractPayEstimateobj) {
      this.OutPutParam.emit(this.ContractPayEstimateobj);
    } else if (this.ProductRequestEstimateobj) {
      this.OutPutParam.emit(this.ProductRequestEstimateobj);
    }
    this.RelatedListClosed.emit(true);
  }

  popupclosed(event) {
    this.btnclicked = false;
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onGridRowClick(event) {
    this.InputCode = '';
    this.VariableDescription = event.data.VariableDescription;
    this.VariableName = event.data.VariableName;
    this.CalcFunction = event.data.CalcFunction;
    this.IsEfectToPrice = event.data.IsEfectToPrice;
    this.SelectedPriceListPatternID = event.data.PriceListPatternID;
    this.SelectedRowAmount = event.data.Amount;
    this.SelectedRowData = event.data;
    if (this.VariableName) {
      this.IsShow = true;
    } else {
      this.IsShow = false;
    }
  }

  getInputCodeCode(Code) {
    this.InputCode = Code;
  }
  onOkClick() {
    if (!this.SelectedPriceListPatternID) {
      this.ShowMessageBoxWithOkBtn('ردیفی انتخاب نشده است.');
      return;
    }

    let ObjAmount = 0;
    let ObjQty = 0;
    if (this.CalcFunction) {
      const index = this.CalcFunction.indexOf('x');
      if (index && index !== -1) {
        this.CalcFunction = this.CalcFunction.replace('x', this.InputCode);
        if (this.IsEfectToPrice) {
          this.CalcFunction = this.CalcFunction.replace('pos', this.SelectedRowAmount + '*'); // RFC 54338
          // tslint:disable-next-line:no-eval
          ObjAmount = eval(this.CalcFunction);
          ObjQty = this.Qty;
        } else {
          this.CalcFunction = this.CalcFunction.replace('pos', this.Qty + '*');
          // tslint:disable-next-line:no-eval
          ObjQty = eval(this.CalcFunction);
          ObjAmount = this.SelectedRowAmount;
        }
      } else {
        if (this.IsEfectToPrice) {
          // tslint:disable-next-line:radix
          ObjAmount = parseFloat(this.CalcFunction) * parseInt(this.SelectedRowAmount);
          ObjQty = this.Qty;
        } else {
          // tslint:disable-next-line:radix
          ObjQty = parseFloat(this.CalcFunction) * parseFloat(this.Qty);
          ObjAmount = this.SelectedRowAmount;
        }
      }
      if (this.PopupParam.Mode === 'ContractOrderEstimateMode') {
        this.ContractOrderEstimateobj = {
          ContractOrderEstimateID: -1,
          PriceListNo: this.SelectedRowData.PriceListTopicCode,
          PriceListName: this.SelectedRowData.PriceListTopicName,
          WorkUnitName: this.SelectedRowData.WorkUnitName,
          PriceListAmount: this.SelectedRowData.Amount,
          PriceListPatternID: this.SelectedPriceListPatternID,
          ContractOrderItemID: this.data.ContractOrderItemID,
          Amount: ObjAmount,
          Qty: ObjQty,
          XValue: this.InputCode,
          RelatedPriceListPatternID: this.data.PriceListPatternID,
          ItemNo: 1
        };
        this.OutPutParam.emit(this.ContractOrderEstimateobj);
        this.RelatedListClosed.emit(true);
        // this.ContractEstimate.SaveRelatedContractOrderEstimate(ContractOrderEstimateobj).subscribe(
        //   res => {
        //     this.OutPutParam.emit(ContractOrderEstimateobj);
        //   },
        //   err => {
        //     this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده ');
        //   }
        // );
        return;
      }
      if (this.PopupParam.Mode === 'ContractPayMode') {
        this.ContractPayEstimateobj = {
          ContractPayItemListID: -1,
          PriceListNo: this.SelectedRowData.PriceListTopicCode,
          PriceListName: this.SelectedRowData.PriceListTopicName,
          WorkUnitName: this.SelectedRowData.WorkUnitName,
          PriceListAmount: this.SelectedRowData.Amount,
          PriceListPatternID: this.SelectedPriceListPatternID,
          ContractPayItemID: this.data.ContractPayItemID,
          IsTransfer: 0,
          IsStarCodeNameEditable: this.SelectedRowData.IsStarCodeNameEditable,
          IsStar: this.SelectedRowData.IsStar,
          ContractAgentCode: this.data.ContractAgentCode,
          Amount: ObjAmount,
          ItemNo: 1,
          Qty: ObjQty,
          XValue: this.InputCode,
          RelatedPriceListPatternID: this.data.PriceListPatternID,
          CalcFunction: this.CalcFunction,
          FContractPayListDetailObject: {
            ContractPayListDetailID: -1,
            ContractPayItemListID: -1,
            ContractAgentCode: this.data.ContractAgentCode,
            Qty: ObjQty,
          }
        };
        this.OutPutParam.emit(this.ContractPayEstimateobj);
        this.RelatedListClosed.emit(true);
        // this.ContractPay.SaveRelatedContractPayEstimate(ContractPayEstimateobj).subscribe(
        //   res => {
        //     this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد.');
        //   },
        //   err => {
        //     this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده ');
        //   }
        // );
        return;
      }

      if (this.PopupParam.Mode === 'ProductRequestEstimateMode') {
        this.ProductRequestEstimateobj = {
          ProductRequestEstimateID: -1,
          PriceListNo: this.SelectedRowData.PriceListTopicCode,
          PriceListName: this.SelectedRowData.PriceListTopicName,
          WorkUnitName: this.SelectedRowData.WorkUnitName,
          PriceListAmount: this.SelectedRowData.Amount,
          PriceListPatternID: this.SelectedPriceListPatternID,
          ProductRequestItemID: this.data.ProductRequestItemID,
          Amount: ObjAmount,
          Qty: ObjQty,
          Note: this.data.Note,
          XValue: this.InputCode,
          RelatedPriceListPatternID: this.data.PriceListPatternID,
          ItemNo: 1
        };
        this.OutPutParam.emit(this.ProductRequestEstimateobj);
        this.RelatedListClosed.emit(true);
        return;
      }

    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

}
