import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { isUndefined } from 'util';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ProductService } from 'src/app/Services/BaseService/ProductService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
declare var jquery: any;
declare var $: any;
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-estimate-view',
  templateUrl: './contract-estimate-view.component.html',
  styleUrls: ['./contract-estimate-view.component.css']
})
export class ContractEstimateViewComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ContractEstimateViewClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef1;
  columnDef2;
  gridApi1: any;
  gridApi2: any;
  rowData1: any;
  rowData2: any;
  Note: any;
  OrderNo: any;
  PersianOrderDate: any;
  ContractOrderItemList = [];
  selectedContractID: number;
  ContractOrderID: number;
  selectedContractOrderItemID: any;
  mainBodyHeight = 83;
  btnclicked;
  Subject;
  ReigonCode;
  bothGridHeight = 74;
  IsDisable;
  FinYearCode;
  TotalSum = 0;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  gridEstimateHeight = 88;
  ModuleCode: any;
  type: string;
  startLeftPosition: number;
  startTopPosition: number;
  CoefLevelCode: any;
  Amount: any;
  ProductCode: any;
  ProductName: any;
  SelectedProductID: any;
  CoefParam;
  OrederParam;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ReportParam: any;
  ArchiveParam: any;
  HaveSave = true;
  ProductTypeList = [];
  Region: any;
  DivHeight1 = 92;
  DivHeight2 = 92;
  ActorControl = false;
  ArchiveBtnTextOrder;

  NgSelectVSParams = {
    bindLabelProp: 'ProductCodeName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد', HeaderName: 'ProductCode', width: 40, TermLenght: 3, SearchOption: 0 },
        { HeaderCaption: 'نام', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1 }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد', width: 40, },
        { HeaderCaption: 'نام', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ProdcutTypeCode: any;
  EntityList = [];
  NgSelectContractEntityItemParams = {
    bindLabelProp: 'Subject',
    bindValueProp: 'EntityTypeItemID',
    placeholder: '',
    MinWidth: '200px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'entity-item',
  };
  constructor(private ProductList: ProductService,
    private ContractList: ContractListService,
    private ArchiveList: ArchiveDetailService,
    private RefreshPersonItems: RefreshServices,
    private ProductRequest: ProductRequestService) {

    this.ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
    { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];

    this.columnDef1 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'نوع درخواستی',
        field: 'ProductTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.ProductTypeList,
          bindLabelProp: 'ProductTypeName',
          bindValueProp: 'ProductTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductTypeName;

          } else {
            return '';
          }
        },
        editable: this.HaveSave,
        width: 80,
        resizable: true
      },
      {
        headerName: 'کالا/خدمت',
        field: 'ProductCodeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreProduct,
          FetchByTerm: this.FetchProductByTerm,
          RedioChangeFunc: this.RedioSelectedChange,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductCodeName;
          } else {
            return '';
          }
        },
        editable: () => {
          return this.HaveSave;
        },
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
        editable: this.HaveSave,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianStartDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true,
        editable: this.HaveSave,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianEndDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'ضریب اول',
        field: 'COEF1',
        width: 100,
        editable: this.HaveSave,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'ضریب دوم',
        field: 'COEF2',
        width: 100,
        editable: this.HaveSave,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'ضریب سوم',
        field: 'COEF3',
        width: 100,
        editable: this.HaveSave,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'ارزش افزوده',
        field: 'TaxValue',
        width: 150,
        HaveThousand: true,
        resizable: true,
        editable: this.HaveSave,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        }
      },
      {
        headerName: 'مبلغ متره',
        field: 'Amount',
        width: 150,
        resizable: true,
        HaveThousand: true
      },
      {
        headerName: 'مبلغ متره با ضرایب ردیف',
        field: 'AmountCOEF',
        width: 150,
        resizable: true,
        HaveThousand: true
      },
      {
        headerName: 'مبلغ کل',
        field: 'AmountCOEFPact',
        width: 150,
        resizable: true,
        HaveThousand: true
      }
    ];

    this.columnDef2 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ردیف فهرست بها',
        field: 'PriceListNo',
        tooltip: (params) => 'فراخوان از فهرست بها',
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
        width: 80,
        HaveThousand: true,
        resizable: true
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 80,
        resizable: true,
        editable: this.HaveSave,
        HaveThousand: true,
        valueParser: numberValueParser
      },
      {
        headerName: 'مبلغ',
        field: 'FinalAmount',
        width: 100,
        resizable: true,
        editable: this.HaveSave,
        HaveThousand: true,
        valueParser: numberValueParser
      }
    ];

    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
  }

  ngOnInit() {
    this.rowData2 = of([]);


    this.selectedContractID = this.PopupParam.ContractID;
    this.ModuleCode = this.PopupParam.ModuleCode;
    this.Note = this.PopupParam.Note;
    this.OrderNo = this.PopupParam.OrderNo;
    this.ContractOrderID = this.PopupParam.ContractOrderID;
    this.PersianOrderDate = this.PopupParam.PersianOrderDate;
    this.Region = this.PopupParam.selectedRegion;
    this.HaveSave = this.PopupParam.HaveSave;
    this.ActorControl = false;

    this.DivHeight1 = this.HaveSave ? 94 : 94;
    this.DivHeight2 = this.HaveSave ? 94 : 94;

    this.ContractList.GetContractOrderItemListVW(this.ContractOrderID, this.ActorControl)
      .subscribe(res => {
        this.rowData1 = res;
        this.SetEntityDataInDataRow(this.rowData1);
        this.rowData1.forEach(element => {
          this.EntityColumnDefinition(null, null, element.EntityList, false);
        });
      });

    this.ContractList.GetContract(this.selectedContractID, null).subscribe(
      res => {
        this.FinYearCode = res[0].FinYearCode;
        this.ContractCode = res[0].ContractCode;
        this.ContractorName = res[0].ContractorName;
        this.LetterNo = res[0].LetterNo;
        this.ContractAmount = res[0].ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.Subject = res[0].Subject;
        this.CoefLevelCode = res[0].CoefLevelCode;
      });

    this.ArchiveList.HasArchiveAccess(this.ModuleCode).
      subscribe(res => {
        this.ArchiveBtnTextOrder = res ? 'درج مستندات فنی مرحله قرارداد' : 'مشاهده مستندات فنی مرحله قرارداد';
      });
      this.RefreshPersonItems.ContractOrderItemList.subscribe(res => {
        this.SetVWOrderItemData();
      });
  }
  SetVWOrderItemData() {
    this.ActorControl = true;
    this.ContractList.GetContractOrderItemListVW(this.ContractOrderID, this.ActorControl)
      .subscribe(res => {
        this.rowData1 = res;
        if (res != null && res.length > 0) {
          this.Note = res[0].Note;
          this.OrderNo = res[0].OrderNo;
          this.ContractOrderID = res[0].ContractOrderID;
          this.PersianOrderDate = res[0].PersianOrderDate;
        }
        this.SetEntityDataInDataRow(this.rowData1);
        this.rowData1.forEach(element => {
          this.EntityColumnDefinition(null, null, element.EntityList, false);
        });
        if (this.selectedContractOrderItemID) {
          this.ContractOrderItemList.forEach((item) => {
            if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
              this.rowData2 = item.ContractOrderEstimateList;
            }
          });
        }
      });
  }

  RowClick1(InputValue) {
    this.TotalSum = 0;
    this.ProductName = InputValue.data.ProductName;
    this.ProductCode = InputValue.data.ProductCode;
    this.SelectedProductID = InputValue.data.ProductID;
    this.Amount = InputValue.data.Amount;
    this.selectedContractOrderItemID = InputValue.data.ContractOrderItemID;
    this.rowData2 = InputValue.data.ContractOrderEstimateList;
    this.rowData2.forEach(item => {
      if (item.FinalAmount === null) {
        item.FinalAmount = 0;
      }
      this.TotalSum = this.TotalSum + item.FinalAmount;
    });
  }

  onGridReady2(params: { api: any; }) {
    this.gridApi2 = params.api;
  }
  onGridReady1(params: { api: any; }) {
    this.gridApi1 = params.api;
  }

  popupclosed() {
    this.btnclicked = false;
  }

  onClose() {
    this.ContractEstimateViewClosed.emit(true);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.bothGridHeight = changes.PopupMaximized.currentValue ? 74.5 : 74;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 87.6 : 83;
      this.gridEstimateHeight = changes.PopupMaximized.currentValue ? 91 : 88;

      this.DivHeight1 = changes.PopupMaximized.currentValue && this.HaveSave ? 95 :
        changes.PopupMaximized.currentValue && !this.HaveSave ? 100 :
          !changes.PopupMaximized.currentValue && this.HaveSave ? 84 :
            !changes.PopupMaximized.currentValue && !this.HaveSave ? 93 : 100;

      this.DivHeight2 = changes.PopupMaximized.currentValue && this.HaveSave ? 100 :
        changes.PopupMaximized.currentValue && !this.HaveSave ? 100 :
          !changes.PopupMaximized.currentValue && this.HaveSave ? 93 :
            !changes.PopupMaximized.currentValue && !this.HaveSave ? 93 : 100;

    }
  }

  BtnClick(data) {
    this.btnclicked = true;
    switch (data) {
      case 'contract-coef':
        if (!this.selectedContractOrderItemID) {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
          return;
        }
        this.CoefParam = {
          HeaderName: 'ضرایب قرارداد',
          ContractID: this.selectedContractID,
          CoefLevelCode: this.CoefLevelCode,
          ContractCode: this.ContractCode,
          ContractorName: this.ContractorName,
          Subject: this.Subject,
          ModuleCode: this.ModuleCode,
          ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
          ReigonCode: this.PopupParam.ReigonCode
        };
        this.type = 'contract-coef';
        this.startLeftPosition = 74;
        this.startTopPosition = 19;
        break;
        case 'contract-coef-by-contract-order':
        if (!this.selectedContractOrderItemID) {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
          return;
        }
        this.type = 'contract-coef';
        this.startLeftPosition = 74;
        this.startTopPosition = 19;
        this.CoefParam = {
          HeaderName: 'ضرایب فعالیت',
          ContractID: this.selectedContractID,
          CoefLevelCode: this.CoefLevelCode,
          ContractCode: this.ContractCode,
          ContractorName: this.ContractorName,
          Subject: this.Subject,
          ModuleCode: this.ModuleCode,
          ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
          ReigonCode: this.PopupParam.ReigonCode,
          ContractOrderItemID: this.selectedContractOrderItemID
        };
        break;
      case 'contract-orderitem-coef':
        if (!this.selectedContractOrderItemID) {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
          return;
        }
        this.CoefParam = {
          HeaderName: 'ضرایب ردیف قرارداد',
          ContractID: this.selectedContractID,
          ContractOrderItemID: this.selectedContractOrderItemID,
          CoefLevelCode: this.CoefLevelCode,
          ProductName: this.ProductName,
          ProductCode: this.ProductCode,
          Amount: this.Amount,
          ModuleCode: this.ModuleCode,
          ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
          ReigonCode: this.PopupParam.ReigonCode
        };
        this.type = 'contract-orderitem-coef';
        this.startLeftPosition = 74;
        this.startTopPosition = 19;
        break;

      case 'choose-report':
        this.type = 'choose-report';
        this.startLeftPosition = 400;
        this.startTopPosition = 200;
        this.ReportParam = {
          SelectedContractID: this.selectedContractID,
          SelectedContractOrderItemID: this.selectedContractOrderItemID,
          RegionCode: this.PopupParam.RegionCode,
        };
        break;
      case 'archive-details':
        this.type = 'archive-details';
        this.HaveHeader = true;
        this.startLeftPosition = 420;
        this.startTopPosition = 150;
        const archiveParam = {
          EntityID: this.selectedContractID,
          TypeCodeStr: '2-', //  برآورد اولیه
          DocTypeCode: 2,
          ModuleCode: this.ModuleCode,
          IsReadOnly: true
        };
        this.ArchiveParam = archiveParam;
        break;
      case 'contract-order-item-deduction':
        if (!this.selectedContractOrderItemID) {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده کسورات انتخاب نشده است');
          return;
        }
        this.PopupParam = {
          HeaderName: 'کسورات قرارداد',
          FinYearCode: this.FinYearCode,
          ContractCode: this.ContractCode,
          ContractorName: this.ContractorName,
          LetterNo: this.LetterNo,
          ContractAmount: this.ContractAmount,
          Subject: this.Subject,
          ContractOrderItemID: this.selectedContractOrderItemID,
          ModuleCode: this.ModuleCode
        };
        this.type = 'contract-order-item-deduction';
        this.startLeftPosition = 120;
        this.startTopPosition = 60;
        break;
      default:
        break;
    }
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

  onSave() {
    this.ReigonCode = this.PopupParam.ReigonCode;
    this.gridApi1.stopEditing();
    const GridItemsToSave = [];
    this.gridApi1.forEachNode(node => {

      var keys = Object.keys(node.data);
      const EntityTypeItemIDList = [];
      if (node.data.EntityList) {
        node.data.EntityList.forEach(Entity => {
          let str = 'Subject' + Entity.EntityTypeID.toString()
          let ID = 'EntityTypeItemID' + Entity.EntityTypeID.toString();
          var key = keys.find(x => x === str);

          if (key && node.data[key]) {
            if (node.data[key].EntityTypeItemID) {
              EntityTypeItemIDList.push(node.data[key].EntityTypeItemID);
            } else {
              key = keys.find(x => x === ID);
              if (key && node.data[key]) {
                EntityTypeItemIDList.push(node.data[key]);
              }
            }
          }

        });
      }

      const ContractOrderItemObj = {
        ContractOrderID: this.ContractOrderID,
        // tslint:disable-next-line:radix
        Qty: node.data.Qty ? parseInt(node.data.Qty) : 0,
        COEF1: node.data.COEF1,
        COEF2: node.data.COEF2,
        COEF3: node.data.COEF3,
        TaxValue: node.data.TaxValue ? node.data.TaxValue : 0,
        ItemNo: node.data.ItemNo,
        ContractOrderItemID: node.data.ContractOrderItemID ? node.data.ContractOrderItemID : 0,
        // tslint:disable-next-line:max-line-length
        ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
        // tslint:disable-next-line:max-line-length
        StartDate: node.data.PersianStartDate && node.data.PersianStartDate.SDate ? node.data.PersianStartDate.SDate : node.data.PersianStartDate,
        // tslint:disable-next-line:max-line-length
        EndDate: node.data.PersianEndDate && node.data.PersianEndDate.SDate ? node.data.PersianEndDate.SDate : node.data.PersianEndDate,
        EntityTypeItemIDList: EntityTypeItemIDList,
      };

      GridItemsToSave.push(ContractOrderItemObj);
    });


    this.ContractList.SaveContractOrderItemList(this.ContractOrderID, GridItemsToSave).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      });
    // } else {
    // this.ShowMessageBoxWithOkBtn('شما اجازه ثبت ندارید');
    // }
    // });
  }

  onCellValueChanged(event) {

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      if (event.newValue && event.newValue.ProductID) {
        this.ProductRequest.GetProductScaleName(event.newValue.ProductID).subscribe(res => {
          const itemsToUpdate = [];
          this.gridApi1.forEachNode(node => {
            if (node.rowIndex === event.rowIndex) {
              node.data.ScaleName = res;
              node.data.ProductID = event.newValue.ProductID;
              this.EntityColumnDefinition(node.data.ProductID, node, null, true);
              itemsToUpdate.push(node.data);
            }
          });
          this.gridApi1.updateRowData({ update: itemsToUpdate });
        });
      }
    }

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

  FetchMoreProduct(event) {
    event.Owner.columnDef1[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.Region,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode, null).
        subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }

  FetchProductByTerm(event) {
    event.Owner.columnDef1[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.Region,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode, null).
      subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  RedioSelectedChange(event) {
    event.Owner.columnDef1[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.Region,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode, null).
      subscribe(res => {
        event.Owner.columnDef1[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  oncellEditingStarted(event) {
    this.gridApi1.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });

    if (event.colDef && event.colDef.field === 'ProductCodeName') {
      this.columnDef1[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(0,
        this.Region,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        true,
        event.data.ProductID).
        subscribe(res => {
          this.columnDef1[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }

    if (event.colDef && event.colDef.index && event.colDef.field === 'Subject' + event.colDef.index.toString()) {
      this.ProductRequest.GetEntityTypeItemList(event.colDef.index, event.data.ProductID, null, null)
        .subscribe(res => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res,
            type: 'entity-item'
          });
        });

    }
  }

  SetEntityDataInDataRow(rowsData) {
    rowsData.forEach(element => {
      if (element.OrderEstimateEntityItemList) {
        element.OrderEstimateEntityItemList.forEach(
          EntityItem => {
            var Name = 'Subject' + EntityItem.EntityTypeID.toString();
            var ID = 'EntityTypeItemID' + EntityItem.EntityTypeID.toString();
            element[Name] = EntityItem.Subject;
            element[ID] = EntityItem.EntityTypeItemID;
          });
      }
    });
  }

  EntityColumnDefinition(ProductID, node, EntityList, hasApiCall) {

    // if (ProductID && hasApiCall) {

    //   this.ProductRequest.GetProductRequestEntityList(null, ProductID, null).subscribe(
    //     res => {

    //       var columnDef22 = [];
    //       this.columnDef1.forEach(element => {
    //         columnDef22.push(element);
    //       });
    //       this.columnDef1 = [];

    //       node.data.EntityList = res;
    //       res.forEach(i => {
    //         const obItem = columnDef22.find(x => x.index && x.index === i.EntityTypeID);
    //         if (!obItem) {
    //           const obj = {
    //             index: i.EntityTypeID,
    //             headerName: i.Subject,
    //             field: 'Subject' + i.EntityTypeID.toString(),
    //             width: 200,
    //             editable: true,
    //             resizable: true,
    //             cellEditorFramework: NgSelectVirtualScrollComponent,
    //             cellEditorParams: {
    //               Params: this.NgSelectContractEntityItemParams,
    //               Items: [],
    //               Owner: this
    //             },
    //             cellRenderer: 'SeRender',
    //             valueFormatter: function currencyFormatter(params) {
    //               if (params.value) {
    //                 return params.value.Subject;
    //               } else {
    //                 return '';
    //               }
    //             },
    //           };
    //           columnDef22.push(obj);
    //         }
    //       });
    //       this.columnDef1 = columnDef22;
    //     });
    // }

    // if (!hasApiCall && EntityList) {

    //   var columnDef22 = [];
    //   this.columnDef1.forEach(element => {
    //     columnDef22.push(element);
    //   });
    //   this.columnDef1 = [];

    //   EntityList.forEach(i => {
    //     const obItem = columnDef22.find(x => x.index && x.index === i.EntityTypeID);
    //     if (!obItem) {
    //       const obj = {
    //         index: i.EntityTypeID,
    //         headerName: i.Subject,
    //         field: 'Subject' + i.EntityTypeID.toString(),
    //         width: 200,
    //         editable: true,
    //         resizable: true,
    //         cellEditorFramework: NgSelectVirtualScrollComponent,
    //         cellEditorParams: {
    //           Params: this.NgSelectContractEntityItemParams,
    //           Items: [],
    //           Owner: this
    //         },
    //         cellRenderer: 'SeRender',
    //         valueFormatter: function currencyFormatter(params) {
    //           if (params.value) {
    //             return params.value.Subject;
    //           } else {
    //             return '';
    //           }
    //         },
    //       };
    //       columnDef22.push(obj);
    //     }
    //   });
    //   this.columnDef1 = columnDef22;
    // }
  }

}
