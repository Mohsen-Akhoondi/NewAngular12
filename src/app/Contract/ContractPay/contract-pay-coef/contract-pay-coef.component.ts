import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-contract-pay-coef',
  templateUrl: './contract-pay-coef.component.html',
  styleUrls: ['./contract-pay-coef.component.css']
})
export class ContractPayCoefComponent implements OnInit {
  @Input() InputParam;
  @Output() ContractPayCoefClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef1;
  rowData1;
  ContractID;
  ContractPayCoefgridApi;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  ChangeDetection = false;
  ContractCode;
  ContractorName;
  ContractPayID;
  ContractAmount;
  Subject;
  SumContractPay;
  ContractPayNo;
  Note;
  IsViewable = false;
  constructor(
    private contractpaydetail: ContractPayDetailsService,
    private ContractList: ContractListService,
    private RefreshService: RefreshServices
  ) {

    this.columnDef1 = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام نوع ضریب ',
        field: 'ContractCoefTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ContractList.GetContractCoefTypeList(),
          bindLabelProp: 'ContractCoefTypeName',
          bindValueProp: 'ContractCoefTypeCode'
        },
        cellRenderer: 'SeRender',
        editable: false,
        width: 500,
        resizable: true
      },
      {
        headerName: 'ضریب ',
        field: 'Coef',
        width: 200,
        HaveThousand: true,
        resizable: true,
        editable: () => {
          return !this.IsViewable;
        },
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ ',
        field: 'Value',
        width: 200,
        resizable: true,
        editable: () => {
          return !this.IsViewable;
        },
        HaveThousand: true,
        valueParser: numberValueParser
      },
    ];

    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return '';
      }
    }
  }

  ngOnInit() {
    this.ContractID = this.InputParam.ContractID;
    this.ContractPayID = this.InputParam.ContractPayID;
    this.ContractAmount = this.InputParam.ContractAmount;
    this.ContractPayNo = this.InputParam.ContractPayNo;
    this.SumContractPay = this.InputParam.SumContractPay;
    this.IsViewable = this.InputParam.IsViewable;
    this.contractpaydetail.GetContractPayCoefList(this.ContractPayID).subscribe(res => {
      if (res.length > 0) {
        this.rowData1 = res;
      } else {
        this.ContractList.GetContractCoefList(this.ContractID).subscribe(ress => {
          if (ress.length > 0) {
            const SumContractPay = parseFloat((this.SumContractPay.toString()).replace(/,/g, ''));
            const ContractAmount = parseFloat((this.ContractAmount.toString()).replace(/,/g, ''));
            let MultiplyCoef = 1;
            ress.forEach((item) => {
              if (item.Coef != null) {
                item.Value = SumContractPay * item.Coef;
                MultiplyCoef = MultiplyCoef * item.Coef;
              } else {
                item.Value = Math.round(((MultiplyCoef * SumContractPay) * item.Value) / ContractAmount); // RFC 58383
                item.Coef = '';
              }
            });
            this.rowData1 = ress; // .filter(item => item.ContractCoefTypeCode !== 5); // ضریب پیشنهادی قرارداد
          } else {
            this.rowData1 = [];
          }
        });
      }
    });
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات ضرایب قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.ContractPayCoefClosed.emit(true);
    }
  }
  onContractPayCoefGridReady(params: { api: any; }) {
    this.ContractPayCoefgridApi = params.api;
  }

  onConfirmClick() {
    const rowData = [];
    const ContractPayCoefList = [];
    this.ContractPayCoefgridApi.stopEditing();
    this.ContractPayCoefgridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    rowData.forEach((item) => {
      if (item.ContractPayCoefID) {
        let ContractCoefTypeCode;
        if (item.ContractCoefTypeName.ContractCoefTypeCode) {
          ContractCoefTypeCode = item.ContractCoefTypeName.ContractCoefTypeCode;
        } else { ContractCoefTypeCode = item.ContractCoefTypeCode; }
        const obj = {
          ContractPayCoefID: item.ContractPayCoefID,
          ContractPayID: item.ContractPayID,
          ContractCoefTypeCode: ContractCoefTypeCode,
          // tslint:disable-next-line:radix
          Value: parseInt(item.Value),
          // tslint:disable-next-line:radix
          Coef: parseFloat(item.Coef),
        };
        ContractPayCoefList.push(obj);
      } else {
        const obj = {
          ContractPayCoefID: -1,
          ContractPayID: this.ContractPayID,
          ContractCoefTypeCode: item.ContractCoefTypeCode,
          // tslint:disable-next-line:radix
          Value: parseInt(item.Value),
          // tslint:disable-next-line:radix
          Coef: parseFloat(item.Coef),
        };
        ContractPayCoefList.push(obj);
      }
    });

    this.contractpaydetail.SaveContractPayCoefList(this.ContractPayID, ContractPayCoefList).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ngOnInit();
      this.ChangeDetection = false;
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      });
    //  } else {
    //    this.ShowMessageBoxWithOkBtn('شما اجازه ثبت ندارید');
    // }
    // });
  }
  popupclosed() {
    this.btnclicked = false;
  }
  onCellValueChanged(event) {
    this.ChangeDetection = true;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  MessageBoxAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.btnclicked = false;
      this.ContractPayCoefClosed.emit(true);
    }
  }
  onRepeatCalClick() {
    this.ContractList.GetContractCoefList(this.ContractID).subscribe(ress => {
      const SumContractPay = parseFloat((this.SumContractPay.toString()).replace(/,/g, ''));
      const ContractAmount = parseFloat((this.ContractAmount.toString()).replace(/,/g, ''));
      let MultiplyCoef = 1;
      ress.forEach((item) => {
        if (item.Coef != null) {
          item.Value = SumContractPay * item.Coef;
          MultiplyCoef = MultiplyCoef * item.Coef;
        } else {
          item.Value = Math.round(((MultiplyCoef * SumContractPay) * item.Value) / ContractAmount);
          item.Coef = '';
        }
      });
      this.rowData1 = ress;
    });
  }

}
