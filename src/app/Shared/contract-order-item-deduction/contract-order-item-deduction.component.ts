import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-contract-order-item-deduction',
  templateUrl: './contract-order-item-deduction.component.html',
  styleUrls: ['./contract-order-item-deduction.component.css']
})
export class ContractOrderItemDeductionComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ContractOrderClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef1;
  gridApi1: any;
  rowData1: any;
  Note: any;
  OrderNo: any;
  PersianOrderDate: any;
  ContractOrderItemList = [];
  selectedContractID: number;
  ContractOrderID: number;
  ContractOrderItemID: any;
  btnclicked;
  Subject;
  IsDisable;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  ModuleCode: any;
  type: string;
  startLeftPosition: number;
  startTopPosition: number;
  Amount: any;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor(private ContractDeductionItem: ContractListService) {
  this.columnDef1 = [
    {
      headerName: 'ردیف',
      field: 'ItemNo',
      width: 50,
      resizable: true
    },
    {
      headerName: 'کد کسر',
      field: 'DeductionTypeName',
      width: 450,
      resizable: true
    },
    {
      headerName: 'کاهشی/افزایشی',
      field: 'IncreaseDecrease',
      width: 250,
      resizable: true
    },
    {
      headerName: 'نقدی/غیرنقدی',
      field: 'IsCashstr',
      width: 250,
      resizable: true
    },
    {
      headerName: 'درصد',
      field: 'Percent',
      width: 150,
      resizable: true
    }
  ];
  }

  ngOnInit() {
    this.rowData1 = of([]);
    this.FinYearCode = this.PopupParam.FinYearCode ;
    this.ModuleCode = this.PopupParam.ModuleCode;
    this.ContractCode = this.PopupParam.ContractCode;
    this.ContractorName = this.PopupParam.ContractorName;
    this.LetterNo = this.PopupParam.LetterNo;
    this.ContractAmount = this.PopupParam.ContractAmount;
    this.Subject = this.PopupParam.Subject;
    this.ContractOrderItemID = this.PopupParam.ContractOrderItemID;
    this.ContractDeductionItem.GetContractOrderDeduction(this.ContractOrderItemID)
    .subscribe(res => {
        this.rowData1 = res;
    });
  }
  onClose() {
    this.ContractOrderClosed.emit(true);
  }

}
