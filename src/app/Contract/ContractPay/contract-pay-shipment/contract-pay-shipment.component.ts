import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayShipmentService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayShipmentService';

@Component({
  selector: 'app-contract-pay-shipment',
  templateUrl: './contract-pay-shipment.component.html',
  styleUrls: ['./contract-pay-shipment.component.css']
})
export class ContractPayShipmentComponent implements OnInit {
  ProductSet;
  @Input() PopupParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  gridApi;
  ContractPayShipmentRows;
  btnclicked = false;
  PopupType;
  ParamObj;
  PriceListTopicCode;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader ;
  startLeftPosition ;
  startTopPosition ;
  SumFinalAmount = 0;
  ProductName;
  ProductParams = {
    bindLabelProp: 'GoodsName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  constructor(private ContractPayShipment: ContractPayShipmentService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد فهرست بها',
        field: 'PriceListNo',
        width: 120,
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
        field: 'K1',
        width: 100,
        resizable: true
      },
      {
        headerName: 'پرت',
        field: 'K2',
        width: 100,
        resizable: true
      },
      {
        headerName: 'ضریب یک',
        field: 'K3',
        width: 100,
        resizable: true
      },
      {
        headerName: 'ضریب دو',
        field: 'K4',
        width: 100,
        resizable: true
      },
      {
        headerName: 'حاصل ضرایب',
        field: 'SumOfCOEF',
        width: 100,
        resizable: true
      },
      {
        headerName: 'مقدار',
        field: 'SumDetailAmount',
        width: 100,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'جمع مصرفی',
        field: 'FinalAmount',
        width: 100,
        HaveThousand: true,
        resizable: true
      }
    ];
  }

  onChangeProduct(event) {
    this.ProductParams.selectedObject = event;
    this.GetGridList();
  }

  ngOnInit() {
    this.ProductName = this.PopupParam.ProductName;
    this.ContractPayShipmentRows = [];
    this.ContractPayShipment.GetContractPayShipmentGoods(this.PopupParam.CostFactorID,
                                                         this.PopupParam.ContractAgentCode,
                                                         this.PopupParam.ContractPayItemID
                                                         ).
      subscribe(res => {
        this.ProductSet = res;
        if (res) {
          this.ProductParams.selectedObject = res[0].ProductID;
          this.GetGridList();
        }
      });
  }

  GetGridList() {
    this.ContractPayShipment.GetContractPayShipmentDetails(this.PopupParam.CostFactorID,
                                                           this.PopupParam.ContractAgentCode,
                                                           this.ProductParams.selectedObject,
                                                           this.PopupParam.ContractPayItemID).
      subscribe(res => {
        this.ContractPayShipmentRows = res;
        res.forEach(element => {
        this.SumFinalAmount += element.FinalAmount;
        });
      });

  }

  RowClick(event) {
    this.PriceListTopicCode = event.data.PriceListNo;
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  onSave() {

    this.btnclicked = true;
    this.PopupType = 'contract-pay-distance-result';
    this.startLeftPosition = 60;
    this.startTopPosition = 21;
    this.ParamObj = {
      HeaderName: 'ورود حمل',
      ProductID: this.ProductParams.selectedObject,
      ProductName: this.ProductSet.filter(x => x.ProductID === this.ProductParams.selectedObject )[0].GoodsName,
      PriceListTopicCode : this.PopupParam.PriceListTopicCode,
      ContractAgentCode:  this.PopupParam.ContractAgentCode,
      ContractPayItemID: this.PopupParam.ContractPayItemID,
      TopicCode: this.PriceListTopicCode,
      HaveSave: this.PopupParam.HaveSave,
      FinalAmount: this.SumFinalAmount
    };
  }

  close() {
      this.Closed.emit(true);
  }

  popupclosed() {
    this.btnclicked = false;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

}
