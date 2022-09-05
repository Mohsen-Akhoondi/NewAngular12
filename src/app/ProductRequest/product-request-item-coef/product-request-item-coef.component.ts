import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-product-request-item-coef',
  templateUrl: './product-request-item-coef.component.html',
  styleUrls: ['./product-request-item-coef.component.css']
})
export class ProductRequestItemCoefComponent implements OnInit {
  @Input() InputParam;
  @Output() ProductReuestitemCoefClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ReturnedCoefLevelCode: EventEmitter<any> = new EventEmitter<any>();
  columnDef;
  rowData;
  CostFactorID;
  ProductRequestItemID;
  CoefLevelCode;
  ContractCoefLevelCode;
  CoefgridApi;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition;
  startTopPosition;
  ChangeDetection = false;
  ProductName;
  ReigonCode;
  ProductCode;
  Amount;
  ModuleViewTypeCode;
  IsVisible = true;
  IsEditable = true;
  constructor(
    private RefreshProductRequest: RefreshServices,
    private ProductRequest: ProductRequestService) {
  }

  ngOnInit() {
    this.CostFactorID = this.InputParam.CostFactorID;
    this.CoefLevelCode = this.InputParam.ProductRequestObject.CoefLevelCode ? this.InputParam.ProductRequestObject.CoefLevelCode : 1;
    this.ContractCoefLevelCode = this.InputParam.ProductRequestObject.CoefLevelCode ? this.InputParam.ProductRequestObject.CoefLevelCode : 1;
    this.ProductRequestItemID = this.InputParam.ProductRequestItemID;
    this.ProductName = this.InputParam.ProductName;
    this.ProductCode = this.InputParam.ProductCode;
    this.Amount = this.InputParam.Amount;
    this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
    this.rowData = of([]);
    this.onRedioClick(this.CoefLevelCode);

    switch (this.ModuleViewTypeCode) {
      case 500000:
        {
          this.IsVisible = false;
          this.IsEditable = false;
        }
        break;
      default:
        {
          this.IsVisible = true;
          this.IsEditable = true;
        }
        break;
    }
  }

  onRedioClick(LevelCode) {
    if (this.IsEditable === true) {
      const OldCOEFData = [];
      let OldCOEFLevelCode;
      if (this.CoefLevelCode !== LevelCode) {
        this.ChangeDetection = true;
        if (this.CoefLevelCode && this.rowData && this.rowData.length && this.CoefLevelCode < LevelCode) {
          this.rowData.forEach(element => {
            OldCOEFData.push(element);
          });
        }
      }
      OldCOEFLevelCode = this.CoefLevelCode;

      this.CoefLevelCode = LevelCode;

      this.ProductRequest.GetProductRequestCoef(this.CostFactorID, this.ProductRequestItemID, LevelCode).subscribe(res => {
        this.rowData = res;
        if (OldCOEFData && OldCOEFData.length) {
          switch (OldCOEFLevelCode) {
            case 1:
              this.rowData.forEach(item => {
                item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code)[0].Coef;
              });
              break;
            case 2:
              this.rowData.forEach(item => {
                item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                  x.Level2Code === item.Level2Code
                )[0].Coef;
              });
              break;
            case 3:
              this.rowData.forEach(item => {
                item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                  x.Level2Code === item.Level2Code &&
                  x.Level3Code === item.Level3Code
                )[0].Coef;
              });
              break;
            case 4:
              this.rowData.forEach(item => {
                item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                  x.Level2Code === item.Level2Code &&
                  x.Level3Code === item.Level3Code &&
                  x.Level4Code === item.Level4Code
                )[0].Coef;
              });
              break;
            default:
              break;
          }
        } else {
          if (this.ContractCoefLevelCode !== LevelCode) {
            this.rowData.forEach(item => {
              item.Coef = '';
              // item.CoefPhrase = '';
            });
          }
        }
        if (LevelCode === 1) {
          this.columnDef = [
            {
              headerName: 'ردیف',
              field: 'ItemNo',
              width: 70,
              resizable: true
            },
            {
              headerName: 'کد رسته',
              field: 'Level1Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رسته',
              field: 'Level1Name',
              width: 500,
              resizable: true
            },
            {
              headerName: 'ضریب ',
              field: 'Coef',
              width: 200,
              resizable: true,
              editable: true,
              valueParser: numberValueParser
            },
            // {
            //   headerName: 'عبارت ضریب',
            //   field: 'CoefPhrase',
            //   width: 200,
            //   resizable: true,
            //   editable: true,
            // }
          ];
        }
        if (LevelCode === 2) {
          this.columnDef = [
            {
              headerName: 'ردیف',
              field: 'ItemNo',
              width: 70,
              resizable: true
            },
            {
              headerName: 'کد رسته',
              field: 'Level1Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رسته',
              field: 'Level1Name',
              width: 150,
              resizable: true
            },
            {
              headerName: 'کد رشته',
              field: 'Level2Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رشته',
              field: 'Level2Name',
              width: 300,
              resizable: true
            },
            {
              headerName: 'ضریب ',
              field: 'Coef',
              width: 200,
              resizable: true,
              editable: true,
              valueParser: numberValueParser
            },
            // {
            //   headerName: 'عبارت ضریب',
            //   field: 'CoefPhrase',
            //   width: 200,
            //   resizable: true,
            //   editable: true,
            // }
          ];
        }
        if (LevelCode === 3) {
          this.columnDef = [
            {
              headerName: 'ردیف',
              field: 'ItemNo',
              width: 70,
              resizable: true
            },
            {
              headerName: 'کد رسته',
              field: 'Level1Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رسته',
              field: 'Level1Name',
              width: 100,
              resizable: true
            },
            {
              headerName: 'کد رشته',
              field: 'Level2Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رشته',
              field: 'Level2Name',
              width: 100,
              resizable: true
            },
            {
              headerName: 'کد فصل',
              field: 'Level3Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام فصل',
              field: 'Level3Name',
              width: 400,
              resizable: true
            },
            {
              headerName: 'ضریب ',
              field: 'Coef',
              width: 200,
              resizable: true,
              editable: true,
              valueParser: numberValueParser
            },
            // {
            //   headerName: 'عبارت ضریب',
            //   field: 'CoefPhrase',
            //   width: 200,
            //   resizable: true,
            //   editable: true,
            // }
          ];
        }
        if (LevelCode === 4) {
          this.columnDef = [
            {
              headerName: 'ردیف',
              field: 'ItemNo',
              width: 70,
              resizable: true
            },
            {
              headerName: 'کد رسته',
              field: 'Level1Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رسته',
              field: 'Level1Name',
              width: 100,
              resizable: true
            },
            {
              headerName: 'کد رشته',
              field: 'Level2Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام رشته',
              field: 'Level2Name',
              width: 100,
              resizable: true
            },
            {
              headerName: 'کد فصل',
              field: 'Level3Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام فصل',
              field: 'Level3Name',
              width: 200,
              resizable: true
            },
            {
              headerName: 'کد ردیف',
              field: 'Level4Code',
              width: 70,
              resizable: true
            },
            {
              headerName: 'نام ردیف',
              field: 'Level4Name',
              width: 400,
              resizable: true
            },
            {
              headerName: 'ضریب ',
              field: 'Coef',
              width: 200,
              resizable: true,
              editable: true,
              valueParser: numberValueParser
            },
            // {
            //   headerName: 'عبارت ضریب',
            //   field: 'CoefPhrase',
            //   width: 200,
            //   resizable: true,
            //   editable: true
            // }
          ];
        }
      }
      );
    }
    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return '';
      }
    }
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات ضرایب ردیف تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.ProductReuestitemCoefClosed.emit(true);
    }
  }
  onCoefGridReady(params: { api: any; }) {
    this.CoefgridApi = params.api;
  }

  onConfirmClick() {
    const CoefList = [];
    const ContractCoefList = [];
    this.CoefgridApi.stopEditing();
    this.CoefgridApi.forEachNode(function (node) {
      CoefList.push(node.data);
    });
    this.ProductRequest.SaveProductRequestItemCoefList(this.CostFactorID,
      this.ProductRequestItemID,
      CoefList,
      this.CoefLevelCode)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.RefreshProductRequest.RefreshProductRequestList();
        this.RefreshProductRequest.RefreshProductRequestItemListVW();
        this.ReturnedCoefLevelCode.emit(this.CoefLevelCode);
        this.ChangeDetection = false;
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        });
    //  } else {
    //   this.ShowMessageBoxWithOkBtn('شما اجازه ثبت ندارید');
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
      this.ProductReuestitemCoefClosed.emit(true);
    }
  }
}
