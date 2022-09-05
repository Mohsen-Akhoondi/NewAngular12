import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OverPopUpCellEditorComponent } from 'src/app/Shared/OverPopUpcellEditor/over-pop-up-cell-editor.component';
import { forkJoin } from 'rxjs';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
declare var $: any;

@Component({
  selector: 'app-product-request-estimate',
  templateUrl: './product-request-estimate.component.html',
  styleUrls: ['./product-request-estimate.component.css']
})
export class ProductRequestEstimateComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ProductRequestCode;
  ProductRequestDate;
  Subject;
  CostFactorID;
  ProdReqItemColDef;
  ProdReqEstColDef;
  ProdReqItemrowData = [];
  ProdReqEstList = [];
  SelectedRegionCode;
  IsEstimateEditable = false;
  beforeID;
  ProdReqItemApi;
  startToptPosition: number;
  PopUpType;
  MinHeightPixel;
  RegionName;
  PriceListPatternID;
  ProductRequestObject;
  PriceListTopicItems;
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicName',
    bindValueProp: 'PriceListTopicCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    // IsDisabled: !this.CheckBoxStatus
  };
  PriceListTypeItems;
  PriceListTypeParams = {
    bindLabelProp: 'PriceListTypeName',
    bindValueProp: 'PriceListTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    // IsDisabled: !this.CheckBoxStatus
  };
  btnclicked = false;
  selectedPRItemRow;
  SelectedProductRequestItemID: any;
  ProdReqEstApi;
  isClicked = false;
  startLeftPosition;
  startTopPosition;
  HaveMaxBtn;
  selectedEstimateRow;
  IsNotFound = false;
  BtnClickedName;
  HaveHeader;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  PercentWidth: number;
  MainMaxwidthPixel: number;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  ContractCode: any;

  constructor(private ProductRequest: ProductRequestService,
    private PriceList: PriceListService,
    private User: UserSettingsService,) {
    this.ProdReqItemColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductName',
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'ScaleName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
      },
      {
        headerName: 'تعداد',
        field: 'QTY',
        editable: true,
        HaveThousand: true,
        width: 90,
        resizable: true
      },
      {
        headerName: 'مبلغ واحد',
        field: 'Amount',
        editable: true,
        HaveThousand: true,
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: true,
        width: 450,
        resizable: true
      },
      {
        headerName: 'مبلغ متره',
        field: 'Amount',
        width: 150,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'مبلغ متره با ضرایب ردیف',
        field: 'AmountCOEF',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'مبلغ کل',
        field: 'AmountCOEFPact',
        HaveThousand: true,
        width: 150,
        resizable: true
      }
    ];

    this.ProdReqEstColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ردیف فهرست بها',
        field: 'PriceListNo',
        cellEditorFramework: OverPopUpCellEditorComponent,
        tooltip: (params) => 'فراخوان از فهرست بها',
        cellEditorParams: {
          SearchPopupType: 'editor-select-price-list',
          PopupParam: { CostListFinYearCode: this.PriceListTopicParams.selectedObject, PriceListPatternID: this.PriceListPatternID }
        },
        cellRenderer: 'SeRender',
        valueFormatter: (params) => {
          if (params.value) {
            return params.value[0].PriceListTopicCode;
          } else {
            return '';
          }
        },
        editable: true,
        width: 170,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListName',
        width: 300,
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
        resizable: true
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
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
        headerName: 'مبلغ',
        field: 'FinalAmount',
        HaveThousand: true,
        width: 100,
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
      }
    ];
  }

  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.Subject = this.PopupParam.Subject;
    this.ProductRequestDate = this.PopupParam.ProductRequestDate;
    this.ProductRequestCode = this.PopupParam.ProductRequestCode;
    this.SelectedRegionCode = this.PopupParam.RegionCode;
    this.CostFactorID = this.PopupParam.CostFactorID;
    this.ProdReqItemrowData = [];
    this.ProdReqItemrowData = this.ProductRequestObject.ProductRequestItemList;
    forkJoin([
      this.PriceList.GetPriceListTopics(true),
      this.ProductRequest.GetPRBalanceFactors(this.ProductRequestObject.CostFactorID),
    ]
    ).subscribe(res => {
      this.PriceListTopicItems = res[0];
      this.PriceListTopicItems.forEach(item => {
        item.PriceListTopicName = item.PriceListTopicCode + ' - ' + item.PriceListTopicName;
      });
      if (res[1]) {
        this.PriceListTopicParams.selectedObject = res[1].PriceListFineYearCode;
        this.PriceList.GetPriceListType(this.PriceListTopicParams.selectedObject).subscribe(
          ress => {
            this.PriceListTypeItems = ress;
            this.PriceListTypeItems.forEach(item => {
              item.PriceListTypeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
            });
          }
        );
        this.PriceListTypeParams.selectedObject = res[1].PriceListTypeCode;
      }
    });
    this.User.GetModulOPByUser(2516).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
            this.HaveSave = true;
            break;

          case 6:
            this.HaveDelete = true;
            break;

          case 16:
            this.HaveUpdate = true;
            break;

          default:
            break;
        }

      });
    });
  }

  onChangePriceListTopic(event) {
    this.PriceListTypeParams.selectedObject = null;
    this.ProdReqEstList = [];
    this.PriceList.GetPriceListType(event).subscribe(
      res => {
        this.PriceListTypeItems = res;
        this.PriceListTypeItems.forEach(item => {
          item.PriceListTypeName = item.PriceListTypeCode + ' - ' + item.PriceListTypeName;
        });
      }
    );
  }

  onChangePriceListType(event) {
    this.ProdReqEstList = [];
    this.PriceList.GetPriceListPatternID(this.PriceListTopicParams.selectedObject, this.PriceListTypeParams.selectedObject).subscribe(
      res => {
        this.PriceListPatternID = res;
        if (this.ProdReqEstColDef) {
          this.ProdReqEstColDef[1].cellEditorParams.PopupParam = {
            CostListFinYearCode: this.PriceListTopicParams.selectedObject,
            PriceListPatternID: this.PriceListPatternID
          };
        }
      }
    );
  }

  ProdReqItemGridready(params: { api: any; }) {
    this.ProdReqItemApi = params.api;
  }

  onProdReqEstGridReady(params: { api: any; }) {
    this.ProdReqEstApi = params.api;
  }

  onProdReqItemRowClick(event) {
    this.selectedPRItemRow = event;
    this.SelectedProductRequestItemID = event.data.ProductRequestItemID;
    this.IsEstimateEditable = true;

    const rowData = [];
    this.ProdReqEstApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.ProdReqEstApi.updateRowData({ remove: rowData });

    if (!this.beforeID) {
      this.ProdReqEstList = event.data.ProductRequestEstimateList;
    }

    if (this.beforeID && this.beforeID !== event.data.ProductRequestItemID) {

      this.ProdReqItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.beforeID) {
          item.data.ProductRequestEstimateList = rowData;
        }

        if (item.data.ProductRequestItemID === event.data.ProductRequestItemID) {
          this.ProdReqEstList = item.data.ProductRequestEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID === event.data.ProductRequestItemID) {
      this.ProdReqItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.beforeID) {
          this.ProdReqEstApi.updateRowData({ add: rowData });
        }
      });
    }

    this.beforeID = event.data.ProductRequestItemID;
  }

  onProdReqEstRowClick(event) {
    this.selectedEstimateRow = event;
  }

  onProdReqEstCellValueChanged(event) {
    const value = event.newValue;
    let itemsToUpdate = [];
    // if (event.newValue) {value = event.newValue; } else {value = event.oldValue; }
    if (event.colDef && event.colDef.field === 'PriceListNo') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PriceListPatternID = '';
          node.data.PriceListNo = value;
          node.data.PriceListName = '';
          node.data.WorkUnitName = '';
          node.data.Amount = '';
          node.data.IsStar = '';
          node.data.Qty = '';
          node.data.FinalAmount = '';
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
      const Values = [];
      if (value != null) {
        Values.push(value);
        this.PriceList.GetPriceListTopicList(Values, '' +
          this.PriceListTypeParams.selectedObject +
          this.PriceListTopicParams.selectedObject, null, null
        ).subscribe(
          res => {
            if (res[0]) {
              itemsToUpdate = [];
              this.ProdReqEstApi.forEachNode(node => {
                if (node.rowIndex === event.rowIndex) {
                  node.data.PriceListPatternID = res[0].PriceListPatternID;
                  node.data.ProductRequestItemID = this.SelectedProductRequestItemID;
                  node.data.PriceListNo = res[0].PriceListTopicCode;
                  node.data.PriceListName = res[0].PriceListTopicName;
                  node.data.WorkUnitName = res[0].WorkUnitName;
                  node.data.WorkUnitCode = res[0].WorkUnitCode;
                  node.data.Amount = res[0].Amount;
                  node.data.IsStar = res[0].IsStar;
                  node.data.Qty = '';
                  node.data.FinalAmount = node.data.Qty * node.data.Amount;
                  itemsToUpdate.push(node.data);
                }
              });
              this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
              // tslint:disable-next-line:max-line-length
            } else {
              this.ShowMessageBoxWithYesNoBtn(' ردیف وارد شده موجود نیست. آیا مایل به افزودن اطلاعات این ردیف فهرست بها می باشید؟');
              this.BtnClickedName = 'PriceListTopicNotFound';
              this.IsNotFound = true;
            }
          }
        );
      }
    }
    if (event.colDef && event.colDef.field === 'Qty') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount) {
          node.data.FinalAmount = value * node.data.Amount;
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'FinalAmount') {
      itemsToUpdate = [];
      this.ProdReqEstApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount && node.data.Amount > 0) {
          node.data.Qty = (value / node.data.Amount).toFixed(2);
          itemsToUpdate.push(node.data);
        }
      });
      this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
    }
  }

  MessageBoxAction(ActionResult) {
    this.isClicked = false;
    this.PopUpType = '';
    if (ActionResult === 'YES') {
      if (this.BtnClickedName === 'PriceListTopicNotFound' && this.selectedEstimateRow !== null) {
        this.PopUpType = 'price-list-topic-dataentry-page';
        this.isClicked = true;
        this.HaveHeader = true;
        this.startLeftPosition = 455;
        this.startTopPosition = 165;
        this.PopupParam = {
          HeaderName: 'افزودن فهرست بها',
          Mode: 'AddBatchTopicInEstimate',
          PriceListTypeCode: this.PriceListTypeParams.selectedObject,
          CostListFinYearCode: this.PriceListTopicParams.selectedObject,
          PriceListTopicCode: this.selectedEstimateRow.data.PriceListNo
        };
      }
    }

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'NO') {
      this.IsNotFound = false;
    }
    this.BtnClickedName = '';
  }

  getOutPutParam(event) {
    if (this.PopUpType === 'price-list-topic-dataentry-page') {
      this.AddPopUpBtnClick(event);
      return;
    }

    if (this.PopUpType === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }

    if (this.PopUpType === 'editor-select-price-list') {
      this.SetPriceListTopicList(event);
      return;
    }

  }
  AddPopUpBtnClick(element) {
    const ItemList = [];
    const obj = {
      PriceListPatternID: element.PriceListPatternID,
      PriceListNo: element.PriceListTopicCode,
      PriceListName: element.PriceListTopicName,
      WorkUnitName: element.WorkUnitName,
      Amount: element.Amount,
      IsStar: element.IsStar,
    };
    ItemList.push(obj);
    this.ProdReqEstApi.updateRowData({ add: ItemList });
  }

  loadFromExcel(data) {
    const priceListIDs = [];
    data.forEach((x: any) => {
      if (x.PriceListNo !== undefined) {
        priceListIDs.push(x.PriceListNo);
      }
    });
    this.PriceList.GetPriceListTopicList(priceListIDs, this.PriceListTypeParams.selectedObject +
      this.PriceListTopicParams.selectedObject, null, null)
      .subscribe(res => {
        (res as any[]).forEach(item => {
          data.filter(x => x.PriceListNo === item.PriceListTopicCode).forEach(i => {
            i.PriceListName = item.PriceListTopicName;
            i.PriceListPatternID = item.PriceListPatternID;
            i.ProductRequestItemID = this.SelectedProductRequestItemID;
            i.ItemNo = 1;
            i.WorkUnitName = item.WorkUnitName;
            i.WorkUnitCode = item.WorkUnitCode;
            i.Amount = item.Amount;
            i.IsStar = item.IsStar;
            i.Qty = 1;
            i.FinalAmount = 1 * item.Amount;
          });
        });
        data.forEach((x: any, i) => {
          this.ProdReqEstApi.updateRowData({ add: [x] });
        });
        this.RefreshItemNo();
      });

    // this.ContractOrderItemList.forEach(item => {
    //   data.forEach(d => {
    //     if (item.ContractOrderItemID === d.ContractOrderItemID) {
    //       item.ContractOrderEstimateList.push(d);
    //     }
    //   });
    // });
  }
  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.ProdReqEstApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.ProdReqEstApi.updateRowData({ update: itemsToUpdate });
  }

  SetPriceListTopicList(Param) {
    const rowData = [];
    this.ProdReqEstApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.PriceList.GetPriceListTopicList(Param, this.PriceListTypeParams.selectedObject +
      this.PriceListTopicParams.selectedObject, null, null).subscribe(
        res => {
          if (res) {
            const itemsToUpdate = [];
            res.forEach(element => {
              MaxProp = MaxProp + 1;
              const newItem = {
                ItemNo: MaxProp,
                PriceListPatternID: element.PriceListPatternID,
                ProductRequestItemID: this.SelectedProductRequestItemID,
                PriceListNo: element.PriceListTopicCode,
                PriceListName: element.PriceListTopicName,
                WorkUnitName: element.WorkUnitName,
                WorkUnitCode: res[0].WorkUnitCode,
                Amount: element.Amount,
                IsStar: element.IsStar,
                Qty: 1,
                FinalAmount: 1 * element.Amount
              };
              itemsToUpdate.push(newItem);
            });
            this.ProdReqEstApi.updateRowData({ add: itemsToUpdate });
          }
        }
      );
  }

  popupclosed() {
    // this.PopUpType = '';
    this.isClicked = this.IsNotFound;
    this.IsNotFound = false;
    this.HaveMaxBtn = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
  }

  onSave() {
    const DataList = [];
    this.ProdReqEstApi.stopEditing();
    this.ProdReqItemApi.stopEditing();
    this.ProdReqEstApi.forEachNode(node => {
      DataList.push(node.data);
    });
    this.ProdReqItemApi.forEachNode(node => {
      if (node.data.ProductRequestItemID === this.beforeID) {
        node.data.ProductRequestEstimateList = DataList;
      }
    });

    const ProdReqItemList = [];
    this.ProdReqItemApi.forEachNode(node => {
      let ItemNo = 0;
      node.data.ProductRequestEstimateDataList = [];
      node.data.ProductRequestEstimateList.forEach(item => {
        const EstimateObj = {
          ProductRequestEstimateID: item.ProductRequestEstimateID ? item.ProductRequestEstimateID : -1,
          ProductRequestItemID: node.data.ProductRequestItemID,
          ItemNo: ++ItemNo,
          PriceListPatternID: item.PriceListPatternID,
          Qty: item.Qty,
          Amount: item.Amount,
        };
        node.data.ProductRequestEstimateDataList.push(EstimateObj);
      });
      ProdReqItemList.push(node.data);
    });

    this.ProductRequest.SaveProductRequestEstimate(ProdReqItemList).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
      }
    );
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {

    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });
  }


  Close() {
    this.btnclicked = false;
    this.ProductRequestEstimateClosed.emit(true);
  }

  onAddPopUpBtnClick() {
    this.PopUpType = 'price-list-topic-dataentry-page';
    this.isClicked = true;
    this.startLeftPosition = 450;
    this.startTopPosition = 51;
    this.PopupParam = {
      Mode: 'AddNewPopUpMode',
      PriceListTypeCode: this.PriceListTypeParams.selectedObject,
      CostListFinYearCode: this.PriceListTopicParams.selectedObject,
    };
  }

  btnClick(InputValue: any) {
    this.isClicked = true;
    switch (InputValue) {
      case 'app-excel-load-data':
        this.PopupParam = {
          colDef2: this.ProdReqEstColDef
        };
        this.PopUpType = 'app-excel-load-data';
        this.startLeftPosition = 400;
        this.startTopPosition = 200;
        break;
    }
  }

  OnGroupBtnClick(event) {
    this.startLeftPosition = 60;
    this.startTopPosition = 10;
    this.PopupParam = {
      CostListFinYearCode: this.PriceListTopicParams.selectedObject,
      PriceListPatternID: this.PriceListPatternID,
      GroupSelected: true
    };
    this.PopUpType = 'editor-select-price-list';
    this.HaveMaxBtn = true;
    this.isClicked = true;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 157;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
}
