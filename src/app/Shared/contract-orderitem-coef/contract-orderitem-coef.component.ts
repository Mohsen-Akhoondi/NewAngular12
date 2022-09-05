import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { of } from 'rxjs';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { NgSelectVirtualScrollComponent } from '../ng-select-virtual-scroll/ng-select-virtual-scroll.component';

@Component({
  selector: 'app-contract-orderitem-coef',
  templateUrl: './contract-orderitem-coef.component.html',
  styleUrls: ['./contract-orderitem-coef.component.css']
})
export class ContractOrderitemCoefComponent implements OnInit {
  @Input() InputParam;
  @Output() ContractCoefClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ReturnedCoefLevelCode: EventEmitter<any> = new EventEmitter<any>();
  columnDef;
  rowData;
  WasSaveInfo = false;
  ContractID;
  ContractOrderItemID;
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
  IsVisible = true;
  EntityList = [];
  NgSelectContractEntityItemParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'RequestItemEntityItemID',
    placeholder: '',
    MinWidth: '200px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'entity-item',
  };
  columnDef22 = [];
  ProductID: any;

  constructor(private ContractList: ContractListService,
    private RefreshContract: RefreshServices,
    private contractpaydetail: ContractPayDetailsService,) {
  }

  ngOnInit() {
    this.ContractID = this.InputParam.ContractID;
    this.ProductID = this.InputParam.ProductID;
    this.CoefLevelCode = this.InputParam.CoefLevelCode;
    this.ContractCoefLevelCode = this.InputParam.CoefLevelCode;
    this.ContractOrderItemID = this.InputParam.ContractOrderItemID;
    this.ProductName = this.InputParam.ProductName;
    this.ProductCode = this.InputParam.ProductCode;
    this.WasSaveInfo = this.InputParam.WasSaveInfo;
    this.Amount = this.InputParam.Amount;
    this.rowData = of([]);
    this.onRedioClick(this.CoefLevelCode);
    this.IsVisible = this.InputParam.ModuleCode !== 2687;
    if (this.InputParam.ModuleViewTypeCode === 5555) {
      this.IsVisible = false;
     }
  }

  onRedioClick(LevelCode) {
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
    this.ContractList.GetContractCoef(this.ContractID, this.ContractOrderItemID, LevelCode).subscribe(res => {
      this.rowData = res;
      if (OldCOEFData && OldCOEFData.length) {
        switch (OldCOEFLevelCode) {
          case 1:
            this.rowData.forEach(item => {
              item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code)[0].Coef;
              item.CoefValue = OldCOEFData.filter(x => x.Level1Code === item.Level1Code)[0].CoefValue;
            });
            break;
            case 2:
            this.rowData.forEach(item => {
              item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                                                  x.Level2Code === item.Level2Code
                                            )[0].Coef;
              item.CoefValue = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                                                  x.Level2Code === item.Level2Code
                                            )[0].CoefValue;
            });
            break;
            case 3:
            this.rowData.forEach(item => {
              item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                                                  x.Level2Code === item.Level2Code &&
                                                  x.Level3Code === item.Level3Code
                                            )[0].Coef;
              item.CoefValue = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                                                  x.Level2Code === item.Level2Code &&
                                                  x.Level3Code === item.Level3Code
                                            )[0].CoefValue;
            });
            break;
            case 4:
            this.rowData.forEach(item => {
              item.Coef = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                                                  x.Level2Code === item.Level2Code &&
                                                  x.Level3Code === item.Level3Code &&
                                                  x.Level4Code === item.Level4Code
                                            )[0].Coef;
             item.CoefValue = OldCOEFData.filter(x => x.Level1Code === item.Level1Code &&
                                                 x.Level2Code === item.Level2Code &&
                                                 x.Level3Code === item.Level3Code &&
                                                 x.Level4Code === item.Level4Code
                                            )[0].CoefValue;
            });           
            break;
          default:
            break;
        }
      } else {
      if (this.ContractCoefLevelCode !== LevelCode) {
        this.rowData.forEach(item => {
          item.Coef = '';
          item.CoefValue = '';
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
          {
            headerName: 'مبلغ',
            field: 'CoefValue',
            width: 230,
            resizable: true,
            editable: true,
            HaveThousand: true,
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
          {
            headerName: 'مبلغ',
            field: 'CoefValue',
            width: 230,
            resizable: true,
            editable: true,
            HaveThousand: true,
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
          {
            headerName: 'مبلغ',
            field: 'CoefValue',
            width: 230,
            resizable: true,
            editable: true,
            HaveThousand: true,
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
        this.rowData.forEach(item => {
          item.OrderEstimateEntityItemList.forEach(
            EntityItem => {
              var Name = 'RequestItemEntityItemSubject' + EntityItem.RequestItemEntityID.toString();
              var ID = 'RequestItemEntityItemID' + EntityItem.RequestItemEntityID.toString();
              item[Name] = EntityItem.Subject;
              item[ID] = EntityItem.RequestItemEntityItemID;
            });
        });
       this.ColDefinition();
      }
    }
    );

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
      this.ShowMessageBoxWithYesNoBtn('اطلاعات ضرایب ردیف  قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.ContractCoefClosed.emit(true);
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
    this.ContractList.SaveContractOrderItemCoefList(this.ContractID,
      this.ContractOrderItemID,
      CoefList,
      this.CoefLevelCode)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        if (this.WasSaveInfo === true) {
        this.RefreshContract.RefreshCantractList();
        this.RefreshContract.RefreshContractOrderItemListVW();
        }
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
      this.ContractCoefClosed.emit(true);
    }
  }

  ColDefinition() {
    this.columnDef22 = [
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
      {
        headerName: 'مبلغ',
        field: 'CoefValue',
        width: 230,
        resizable: true,
        editable: true,
        HaveThousand: true,
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

    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return '';
      }
    }

    if (this.EntityList.length === 0 ) {
      this.contractpaydetail.GetRequestItemEntityList(this.ContractID , null).subscribe(
        res => {
          this.EntityList = res;
          this.EntityList.forEach(i => {
            if (i.ProductID === this.ProductID) {
              const obj = {
                index: i.RequestItemEntityID,
                headerName: i.Subject,
                field: 'RequestItemEntityItemSubject' + i.RequestItemEntityID.toString(),
                width: 200,
                editable: false,
                resizable: true,
                cellEditorFramework: NgSelectVirtualScrollComponent,
                cellEditorParams: {
                  Params: this.NgSelectContractEntityItemParams,
                  Items: [],
                  Owner: this
                },
                cellRenderer: 'SeRender',
                valueFormatter: function currencyFormatter(params) {
                  if (params.value) {
                    return params.value.Subject;
                  } else {
                    return '';
                  }
                },
              };
              this.columnDef22.push(obj);
            }
          });
          this.columnDef = this.columnDef22;
        }
      );
    }

    if (this.EntityList.length > 0) {
      this.EntityList.forEach(i => {
        if (i.ProductID === this.ProductID) {
          const obj = {
            index: i.RequestItemEntityID,
            headerName: i.Subject,
            field: 'RequestItemEntityItemSubject' + i.RequestItemEntityID.toString(),
            width: 200,
            editable: true,
            resizable: true,
            cellEditorFramework: NgSelectVirtualScrollComponent,
            cellEditorParams: {
              Params: this.NgSelectContractEntityItemParams,
              Items: [],
              Owner: this
            },
            cellRenderer: 'SeRender',
            valueFormatter: function currencyFormatter(params) {
              if (params.value) {
                return params.value.Subject;
              } else {
                return '';
              }
            },
          };
          this.columnDef22.push(obj);
        }
      });
      this.columnDef = this.columnDef22;
    }
  }
}
