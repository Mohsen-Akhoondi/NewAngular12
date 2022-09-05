import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-product-request-coef',
  templateUrl: './product-request-coef.component.html',
  styleUrls: ['./product-request-coef.component.css']
})
export class ProductRequestCoefComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestCoefClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  rowData;
  CheckRegionWritable;
  CoefLevelCode;
  PRCoefgridApi;
  btnclicked = false;
  type: string;
  ProductRequestCode;
  ProductRequestStatusName;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  ChangeDetection = false;
  Subject;
  ReigonCode;
  IsVisible = true;
  CostFactorID;
  ProductRequestObject;
  ProductRequestID: number;
  ModuleViewTypeCode;
  ProductRequestItemID: number;
  constructor(private ContractList: ContractListService,
    private ProductRequest: ProductRequestService,
    private RefreshService: RefreshServices) {
    this.columnDef = [
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
          Items: this.ContractList.GetContractCoefTypeList(2730),
          bindLabelProp: 'ContractCoefTypeName',
          bindValueProp: 'ContractCoefTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ContractCoefTypeName;

          } else {
            return '';
          }
        },
        editable: true,
        width: 500,
        resizable: true
      },
      {
        headerName: 'ضریب ',
        field: 'Coef',
        width: 200,
        HaveThousand: true,
        resizable: true,
        editable: true,
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ ',
        field: 'Value',
        width: 200,
        resizable: true,
        editable: true,
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
    if (this.PopupParam.ProductRequestItemID) {
      this.ProductRequestItemID = this.PopupParam.ProductRequestItemID;
    }

    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.CheckRegionWritable = this.PopupParam.CheckRegionWritable;
    this.Subject = this.ProductRequestObject.Subject;
    this.ProductRequestCode = this.ProductRequestObject.ProductRequestCode;
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    this.ProductRequestStatusName = this.ProductRequestObject.ProductRequestStatusName;
    this.ProductRequest.GetProdReqCoef(this.CostFactorID, this.ProductRequestItemID).subscribe(
      res => {
        this.rowData = res;
      });
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    if (this.PopupParam.ModuleViewTypeCode === 95 && this.ProductRequestObject.RegionCode === 200) {
      this.IsVisible = false;
    }
    switch (this.PopupParam.ModuleViewTypeCode) {
      case 500000:
        {
          this.IsVisible = false;
        }
        break;
      default:
        {
          this.IsVisible = true;
        }
        break;
    }
  }

  close() {
    // if (this.ChangeDetection) {
    //   this.ShowMessageBoxWithYesNoBtn('اطلاعات ضرایب قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    // } else {
    this.btnclicked = false;
    this.ProductRequestCoefClosed.emit(true);
    // }
  }
  onPRCoefGridReady(params: { api: any; }) {
    this.PRCoefgridApi = params.api;
  }

  onConfirmClick() { }

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
    this.startLeftPosition = 490;
    this.startTopPosition = 204;
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
      this.ProductRequestCoefClosed.emit(true);
    }
  }
  onSave() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    this.PRCoefgridApi.stopEditing();
    const rowData = [];
    const ProductRequestCoefList = [];

    this.PRCoefgridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    rowData.forEach((item) => {
      if (item.ProductRequestCoefID) {
        let ContractCoefTypeCode;
        if (item.ContractCoefTypeName.ContractCoefTypeCode) {
          ContractCoefTypeCode = item.ContractCoefTypeName.ContractCoefTypeCode;
        } else { ContractCoefTypeCode = item.ContractCoefTypeCode; }
        const obj = {
          ProductRequestCoefID: item.ProductRequestCoefID,
          CostFactorID: item.CostFactorID,
          ContractCoefTypeCode: ContractCoefTypeCode,
          // tslint:disable-next-line:radix
          Value: parseInt(item.Value),
          // tslint:disable-next-line:radix
          Coef: parseFloat(item.Coef),
          ProductRequestItemID: this.ProductRequestItemID ? this.ProductRequestItemID : null,
        };
        ProductRequestCoefList.push(obj);
      } else {
        const obj = {
          ProductRequestCoefID: 0,
          CostFactorID: this.CostFactorID,
          ContractCoefTypeCode: item.ContractCoefTypeName.ContractCoefTypeCode,
          // tslint:disable-next-line:radix
          Value: parseInt(item.Value),
          // tslint:disable-next-line:radix
          Coef: parseFloat(item.Coef),
          ProductRequestItemID: this.ProductRequestItemID ? this.ProductRequestItemID : null
        };
        ProductRequestCoefList.push(obj);
      }
    });
    this.ProductRequest.SaveProdReqCoef(this.CostFactorID, ProductRequestCoefList, this.PopupParam.OrginalModuleCode,
      this.ProductRequestItemID).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.RefreshService.RefreshProductRequestItemListVW();
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        });
  }

}
