import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { forkJoin } from 'rxjs';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
// tslint:disable-next-line: max-line-length
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-info-limited-change-page',
  templateUrl: './contract-info-limited-change-page.component.html',
  styleUrls: ['./contract-info-limited-change-page.component.css']
})
export class ContractInfoLimitedChangePageComponent implements OnInit {
  @Input() InputParam;
  @Output() ContractInfoLimitClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef = [];
  gridApi: any;
  rowData: any;
  Note: any;
  OrderNo: any;
  PersianOrderDate: any;
  btnclicked = false;
  Subject = '';
  ModuleCode: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  selectedContractID: number;
  PopupType = '';
  startTopPosition: number;
  startLeftPosition: number;
  HaveHeader = false;
  ContractOrderID: number;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  ContractAmountStr;
  RegionCode;
  sumFinalAmountStr = '0';
  sumAmountCOEFStr = '0';
  constructor(private ContractList: ContractListService,
    private contractpaydetail: ContractPayDetailsService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        editable: false,
        width: 80,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
        editable: false,
        width: 300,
        resizable: true
      },
      {
        headerName: 'واحد کالا',
        field: 'ScaleName',
        width: 100,
        resizable: true,
        editable: false
      },
      {
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-no-estimate-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortStartDate = params.newValue.MDate;
            params.data.PersianStartDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortStartDate = null;
            params.data.PersianStartDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-no-estimate-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.MDate) {
            params.data.ShortEndDate = params.newValue.MDate;
            params.data.PersianEndDate = params.newValue.SDate;
            return true;
          } else {
            params.data.ShortEndDate = null;
            params.data.PersianEndDate = '';
            return false;
          }
        }
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        width: 150,
        editable: true,
        HaveThousand: true,
        resizable: true,
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
        headerName: 'تعداد',
        field: 'Qty',
        width: 150,
        editable: true,
        HaveThousand: true,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { IsFloat: true, FloatMaxLength: 4 },
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
        headerName: 'مبلغ ناخالص',
        field: 'FinalAmount',
        width: 150,
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
        headerName: 'ارزش افزوده',
        field: 'TaxValue',
        width: 150,
        HaveThousand: true,
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
      {
        headerName: 'مبلغ کل',
        field: 'AmountWithTax',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ با ضرایب',
        field: 'AmountCOEFPact',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    const promise = new Promise<void>((resolve) => {
      this.ContractList.GetFirstContractOrderObj(this.InputParam.ProductrequestID).subscribe(result => {
        if (result && result !== null) {
          this.selectedContractID = result.ContractID;
          this.ModuleCode = result.ModuleCode;
          this.ContractOrderID = result.ContractOrderID;
          this.OrderNo = result.OrderNo;
          this.Note = result.Note;
          this.PersianOrderDate = result.PersianOrderDate;
          resolve();
        } else {
          this.ShowMessageBoxWithOkBtn('امکان اصلاح وجود ندارد.');
          return;
        }
      });
    }).then(() => {
      forkJoin([
        this.ContractList.GetContract(this.selectedContractID, null),
        this.ContractList.GetContractOrderItemProductList(this.selectedContractID, this.OrderNo)
      ]).subscribe(res => {
        if (res[0] !== null) {
          this.FinYearCode = res[0][0].FinYearCode;
          this.ContractCode = res[0][0].ContractCode;
          this.ContractorName = res[0][0].ContractorName;
          this.LetterNo = res[0][0].LetterNo;
          this.ContractAmount = res[0][0].ContractAmount;
          this.ContractAmountStr = res[0][0].ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.Subject = res[0][0].Subject;
          this.RegionCode = res[0][0].RegionCode;
        }
        if (res[1] !== null) {
          let sumFinalAmount = 0;
          let sumAmountCOEF = 0;
          this.rowData = res[1];
          res[1].forEach(element => {
            sumFinalAmount = sumFinalAmount + element.FinalAmount;
            sumAmountCOEF = sumAmountCOEF + element.AmountCOEFPact;
          });
          this.sumFinalAmountStr = sumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.sumAmountCOEFStr = sumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      });
    });
  }
  onGridReady1(params: { api: any; }) {
    this.gridApi = params.api;
  }

  onClose() {
    this.ContractInfoLimitClosed.emit(true);
  }

  popupclosed() {
    this.btnclicked = false;
    this.PopupType = '';
    this.HaveHeader = false;
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

  onSave() {
    this.gridApi.stopEditing();
    const ContractOrderItemList = [];
    this.gridApi.forEachNode(node => {
      const ContractOrderItemObj = {
        ContractOrderID: this.ContractOrderID,
        // tslint:disable-next-line:radix
        Qty: parseFloat(node.data.Qty),
        Amount: node.data.FinalAmount, // مبلغ کل در جدول اقلام مرحله ذخیره می شود. // RFC 52712
        TaxValue: node.data.TaxValue,
        ItemNo: node.data.ItemNo,
        ContractOrderItemID: node.data.ContractOrderItemID ? node.data.ContractOrderItemID : 0,
        // tslint:disable-next-line:max-line-length
        StartDate: node.data.ShortStartDate,
        // tslint:disable-next-line:max-line-length
        EndDate: node.data.ShortEndDate,
      };

      ContractOrderItemList.push(ContractOrderItemObj);
    });
    this.ContractList.SaveContractOrderItemListLimited(this.ContractOrderID, ContractOrderItemList, this.Note).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      });
  }

  onCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'Amount') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.Qty) {
            // tslint:disable-next-line:radix
            node.data.FinalAmount = parseInt(node.data.Amount) * parseFloat(node.data.Qty);
          } else {
            // tslint:disable-next-line: radix
            node.data.FinalAmount = parseInt(node.data.Amount);
          }
        }
        itemsToUpdate.push(node.data);
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    } else if (event.colDef && event.colDef.field === 'Qty') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          // tslint:disable-next-line:radix
          const qty = parseFloat(node.data.Qty);
          if (node.data.Amount && qty) {
            // tslint:disable-next-line:radix
            node.data.FinalAmount = parseInt(node.data.Amount) * qty;
          } else if (node.data.FinalAmount && qty) {
            // tslint:disable-next-line:radix
            node.data.Amount = parseInt(node.data.FinalAmount) / qty;
          }
        }
        itemsToUpdate.push(node.data);
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    } else if (event.colDef && event.colDef.field === 'FinalAmount') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.Qty) {
            // tslint:disable-next-line:radix
            node.data.Amount = parseInt(node.data.FinalAmount) / parseFloat(node.data.Qty);
          } else {
            // tslint:disable-next-line: radix
            node.data.Amount = parseInt(node.data.FinalAmount);
          }
          // tslint:disable-next-line:radix
          const famt = parseInt(node.data.FinalAmount);
          // tslint:disable-next-line:radix
          if (event.newValue && (event.oldValue && parseInt(event.newValue))) {
            // tslint:disable-next-line:radix
            node.data.Amount = parseInt(event.newValue) / parseFloat(node.data.Qty);
            // tslint:disable-next-line:radix
            node.data.FinalAmount = parseInt(event.newValue);
            // tslint:disable-next-line:max-line-length
            this.contractpaydetail.GetAmountOfCoef(this.selectedContractID, node.data.ContractOrderItemID, node.data.FinalAmount).subscribe(res => {
              node.data.AmountCOEFPact = res;
              if (node.data.IsTaxValue) {
                node.data.TaxValue = node.data.AmountCOEFPact * 0.09;
                node.data.AmountWithTax = node.data.TaxValue + node.data.AmountCOEFPact;
              } else {
                node.data.AmountWithTax = node.data.AmountCOEFPact;
              }
            });
          } else {
            if (node.data.Qty && famt) {
              // tslint:disable-next-line:radix
              node.data.Amount = famt / parseFloat(node.data.Qty);
            } else if (node.data.Amount && famt) {
              // tslint:disable-next-line:radix
              node.data.Qty = famt / parseInt(node.data.Amount);
            }
            this.contractpaydetail.GetAmountOfCoef(this.selectedContractID, null, famt).subscribe(res => {
              node.data.AmountCOEFPact = res;
              if (node.data.IsTaxValue) {
                node.data.TaxValue = node.data.AmountCOEFPact * 0.09;
                node.data.AmountWithTax = node.data.TaxValue + node.data.AmountCOEFPact;
              } else {
                node.data.AmountWithTax = node.data.AmountCOEFPact;
              }
            });
          }
        }
        itemsToUpdate.push(node.data);
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }
}
