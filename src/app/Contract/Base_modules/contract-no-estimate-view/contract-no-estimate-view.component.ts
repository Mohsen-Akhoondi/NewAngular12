import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { isUndefined } from 'util';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductService } from 'src/app/Services/BaseService/ProductService';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ActivatedRoute } from '@angular/router';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-contract-no-estimate-view',
  templateUrl: './contract-no-estimate-view.component.html',
  styleUrls: ['./contract-no-estimate-view.component.css']
})
export class ContractNoEstimateViewComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ContractNoEstimateViewClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnDef;
  IsEditTaxValue = true;
  IsCost = true;
  gridApi1: any;
  rowData1: any;
  Note: any;
  OrderNo: any;
  PersianOrderDate: any;
  ContractOrderItemList = [];
  selectedContractID: number;
  mainBodyHeight = 85;
  btnclicked;
  Subject;
  gridHeight; // 74
  IsDisable;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  gridEstimateHeight = 88;
  ModuleCode: any;
  type: string;
  startLeftPosition: number;
  startTopPosition: number;
  Amount: any;
  ProductCode: any;
  ProductName: any;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ArchiveParam: any;
  HaveSave: boolean;
  IsEditable: boolean;
  DisabledComponents = false;
  ProductTypeList = [];
  ChangeDetection: boolean;
  ContractOrderID: any;
  HasRegionGroupProduct = false;
  IsDone = false;
  ContractTypeCode = 0;
  selectedContractOrderItemID;
  ArchiveBtnTextOrder;
  RegionCode;
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
  HaveMaxBtn = false;
  OverPixelWidth: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
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
  ContractAmountStr;
  sumFinalAmountStr = '0';
  sumAmountCOEFStr = '0';
  CoefLevelCode: any;
  CoefParam;
  IsVolumetric = false;
  constructor(private ProductList: ProductService,
    private ContractList: ContractListService,
    private ArchiveList: ArchiveDetailService,
    private RefreshPersonItems: RefreshServices,
    private ProductRequest: ProductRequestService,
    private contractpaydetail: ContractPayDetailsService,
    private route: ActivatedRoute,
  ) {

    this.ProductTypeList = [{ ProductTypeCode: '1', ProductTypeName: 'کالا' },
    { ProductTypeCode: '2', ProductTypeName: 'خدمت' }];

    function numberValueParser(params) {
      if (Number(params.newValue)) {
        return Number(params.newValue);
      } else {
        return 0;
      }
    }
  }

  ngOnInit() {
    this.selectedContractID = this.PopupParam.ContractID;
    this.ModuleCode = this.PopupParam.ModuleCode;
    this.gridHeight = this.ModuleCode === 2645 ? 73 : 69;
    this.Note = this.PopupParam.Note;
    this.OrderNo = this.PopupParam.OrderNo;
    this.PersianOrderDate = this.PopupParam.PersianOrderDate;
    this.HaveSave = this.PopupParam.HaveSave;
    this.ContractOrderID = this.PopupParam.ContractOrderID;
    this.ContractTypeCode = this.PopupParam.ContractTypeCode;
    this.ContractList.GetContract(this.PopupParam.ContractID, null).subscribe(
      res => {
        this.FinYearCode = res[0].FinYearCode;
        this.ContractCode = res[0].ContractCode;
        this.ContractorName = res[0].ContractorName;
        this.LetterNo = res[0].LetterNo;
        this.ContractAmount = res[0].ContractAmount;
        this.ContractAmountStr = res[0].ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        this.Subject = res[0].Subject;
        this.RegionCode = res[0].RegionCode;
        this.CoefLevelCode = res[0].CoefLevelCode;
        this.IsVolumetric = res[0].IsVolumetric;
    if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
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
          editable: !this.HasRegionGroupProduct,
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
          editable: !this.HasRegionGroupProduct,
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
          editable: !this.HasRegionGroupProduct,
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
          headerName: 'مبلغ حق الزحمه',
          field: 'Amount',
          width: 150,
          editable: !this.HasRegionGroupProduct,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'اهمیت وزنی',
          field: 'Weight',
          width: 150,
          editable: !this.HasRegionGroupProduct,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'ارزش افزوده',
          field: 'TaxValue',
          width: 150,
          HaveThousand: true,
          resizable: true,
          editable: () => {
            if (this.IsEditTaxValue) {
              return true;
            } else {
              return false;
            }
          }
        },
        {
          headerName: 'مبلغ کل',
          field: 'AmountWithTax',
          width: 150,
          HaveThousand: true,
          resizable: false
        }
      ];
    } else {
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
          editable: this.HaveSave,
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
          editable: this.HaveSave,
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
          editable: this.HaveSave,
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
          editable: this.HaveSave,
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
  });
    let sumFinalAmount = 0;
    let sumAmountCOEF = 0;
    if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
      this.ContractList.GetContractOrderItemProductListByType(this.selectedContractID, this.ContractTypeCode, this.OrderNo)
        .subscribe(res => {
          this.HasRegionGroupProduct = res[0].HasRegionGroupProduct;
          this.rowData1 = res;
          res.forEach(element => {
            sumFinalAmount = sumFinalAmount + element.FinalAmount;
            sumAmountCOEF = sumAmountCOEF + element.AmountCOEFPact;
          });
          this.sumFinalAmountStr = sumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.sumAmountCOEFStr = sumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.HaveSave = !this.HasRegionGroupProduct;
          this.IsEditable = !this.HasRegionGroupProduct;
          this.SetEntityDataInDataRow(this.rowData1);
          this.rowData1.forEach(element => {
            this.EntityColumnDefinition(null, null, element.EntityList, false);
          });
        });
    } else {
      this.ContractList.GetContractOrderItemProductList(this.selectedContractID, this.OrderNo)
        .subscribe(res2 => {
          this.rowData1 = res2;
          res2.forEach(element => {
            sumFinalAmount = sumFinalAmount + element.FinalAmount;
            sumAmountCOEF = sumAmountCOEF + element.AmountCOEFPact;
            this.IsEditTaxValue = element.IsTaxValue;
          });
          this.sumFinalAmountStr = sumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.sumAmountCOEFStr = sumAmountCOEF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          this.SetEntityDataInDataRow(this.rowData1);
          this.rowData1.forEach(element => {
            this.EntityColumnDefinition(null, null, element.EntityList, false);
          });
        });
    }

    this.IsDone = true;
    this.IsEditable = this.HaveSave;
    if (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 2 && this.PopupParam.PrivateType === 'Cartable') {
      this.DisabledComponents = true;
      this.IsEditable = false;
      this.HaveSave = false;
    }
    this.ArchiveList.HasArchiveAccess(this.ModuleCode).
      subscribe(res => {
        this.ArchiveBtnTextOrder = res ? 'درج مستندات فنی مرحله قرارداد' : 'مشاهده مستندات فنی مرحله قرارداد';
      });

  }

  RowClick1(InputValue) {
    this.ProductName = InputValue.data.ProductName;
    this.ProductCode = InputValue.data.ProductCode;
    this.Amount = InputValue.data.Amount;
    this.selectedContractOrderItemID = InputValue.data.ContractOrderItemID;
  }

  onGridReady1(params: { api: any; }) {
    this.gridApi1 = params.api;
  }

  onClose() {
    this.ContractNoEstimateViewClosed.emit(true);
  }

  popupclosed() {
    this.btnclicked = false;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.gridHeight = changes.PopupMaximized.currentValue ? 74 : this.ModuleCode === 2645 ? 73 : 69;

      this.mainBodyHeight = changes.PopupMaximized.currentValue && this.HaveSave ? 87 :
        changes.PopupMaximized.currentValue && !this.HaveSave ? 85 :
          !changes.PopupMaximized.currentValue && this.HaveSave ? 85 :
            !changes.PopupMaximized.currentValue && !this.HaveSave ? 85 : 85;

      this.gridEstimateHeight = changes.PopupMaximized.currentValue ? 91 : 88;
    }
  }

  BtnClick(data) {
    this.btnclicked = true;
    switch (data) {
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
          ContractAmount: this.ContractAmountStr,
          Subject: this.Subject,
          ContractOrderItemID: this.selectedContractOrderItemID,
          ModuleCode: this.ModuleCode
        };
        this.type = 'contract-order-item-deduction';
        this.startLeftPosition = 74;
        this.startTopPosition = 19;
        break;
      case 'contract-case':
        this.type = 'contract-case';
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.OverPixelWidth = 1290;
        this.startLeftPosition = 50;
        this.startTopPosition = 4;
        this.HeightPercentWithMaxBtn = 98;
        this.MinHeightPixel = 690;
        this.PopupParam = {
          HeaderName: this.PopupParam.HeaderName,
          ModuleCode: this.PopupParam.ModuleCode,
          selectedRow: this.PopupParam.selectedRow,
          GridHeightInTab: 100,
          PanelHeightInTab: 99,
          HaveSave: false,
          IsViewable: true,
          IsEditable: false,
          SelectedContractID: this.PopupParam.selectedRow.data.ContractId,
          ProductRequestID: this.PopupParam.selectedRow.data.ProductRequestID,
        };
        this.btnclicked = true;
        break;
      case 'contract-coef-by-contract-order':
        if (!this.selectedContractOrderItemID) {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت مشاهده ضرایب انتخاب نشده است');
          return;
        }
        this.type = 'contract-coef';
        this.startLeftPosition = 120;
        this.startTopPosition = 20;
        this.CoefParam = {
          HeaderName: 'ضرایب فعالیت',
          ContractID: this.selectedContractID,
          CoefLevelCode: this.CoefLevelCode,
          ContractCode: this.ContractCode,
          ContractorName: this.ContractorName,
          Subject: this.Subject,
          ModuleCode: this.ModuleCode,
          ReigonCode: this.PopupParam.ReigonCode,
          ModuleViewTypeCode: this.PopupParam.ModuleViewTypeCode,
          ContractOrderItemID: this.selectedContractOrderItemID
        };
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
    // this.ContractList.CheckWritableRegionCode(this.ReigonCode).subscribe(res => {
    //  if (res) {
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
        Qty: parseFloat(node.data.Qty),
        Amount: node.data.FinalAmount, // مبلغ کل در جدول اقلام مرحله ذخیره می شود. // RFC 52712
        TaxValue: node.data.TaxValue,
        ItemNo: node.data.ItemNo,
        // tslint:disable-next-line:radix
        Weight: parseInt(node.data.Weight),
        ContractOrderItemID: node.data.ContractOrderItemID ? node.data.ContractOrderItemID : 0,
        // tslint:disable-next-line:max-line-length
        ProductID: node.data.ProductCodeName && node.data.ProductCodeName.ProductID ? node.data.ProductCodeName.ProductID : (node.data.ProductID ? node.data.ProductID : null),
        // tslint:disable-next-line:max-line-length
        StartDate: node.data.ShortStartDate,
        // tslint:disable-next-line:max-line-length
        EndDate: node.data.ShortEndDate,
        EntityTypeItemIDList: EntityTypeItemIDList,
      };

      GridItemsToSave.push(ContractOrderItemObj);
    });
    this.ContractList.SaveContractOrderItemList(this.ContractOrderID, GridItemsToSave).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ngOnInit();
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      });
    //  } else {
    //    this.ShowMessageBoxWithOkBtn('شما اجازه ثبت ندارید');
    //  }
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
    if (event.colDef && event.colDef.field === 'Amount') {
      const itemsToUpdate = [];
      this.gridApi1.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.Qty) {
            // tslint:disable-next-line:radix
            node.data.FinalAmount = parseInt(node.data.Amount) * parseFloat(node.data.Qty);
          } else {
            node.data.FinalAmount = parseInt(node.data.Amount);
          }
        }
        itemsToUpdate.push(node.data);
      });
      this.gridApi1.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'Qty') {
      const itemsToUpdate = [];
      this.gridApi1.forEachNode(node => {
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
      this.gridApi1.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'TaxValue') {
      const itemsToUpdate = [];
      this.gridApi1.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.IsTaxValue) {
            // tslint:disable-next-line:radix
            const tax = parseInt(node.data.TaxValue);
            node.data.AmountWithTax = tax + node.data.AmountCOEFPact;
          } else {
            node.data.AmountWithTax =  node.data.AmountCOEFPact;
          }
        }
        itemsToUpdate.push(node.data);
      });
      this.gridApi1.updateRowData({ update: itemsToUpdate });
    }
    if (event.colDef && event.colDef.field === 'FinalAmount') {
      const itemsToUpdate = [];
      this.gridApi1.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          if (node.data.Qty) {
            // tslint:disable-next-line:radix
            node.data.Amount =  parseInt(node.data.FinalAmount) / parseFloat(node.data.Qty);
          } else {
            node.data.Amount =  parseInt(node.data.FinalAmount);
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
              node.data.AmountCOEFPact  = res;
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
      this.gridApi1.updateRowData({ update: itemsToUpdate });
    }
  }
  FetchMoreProduct(event) {
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        event.Owner.RegionCode,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        event.Owner.IsCost,
        null).
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
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionCode,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      event.Owner.IsCost,
      null).
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
    event.Owner.columnDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      event.Owner.RegionCode,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode, event.Owner.IsCost, null).
      subscribe(res => {
        event.Owner.columnDef[2].cellEditorParams.Params.loading = false;
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
      this.columnDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(0,
        this.RegionCode,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        true,
        event.data.ProductID).
        subscribe(res => {
          this.columnDef[2].cellEditorParams.Params.loading = false;
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
    //       this.columnDef.forEach(element => {
    //         columnDef22.push(element);
    //       });
    //       this.columnDef = [];

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
    //       this.columnDef = columnDef22;
    //     });
    // }

    // if (!hasApiCall && EntityList) {

    //   var columnDef22 = [];
    //   this.columnDef.forEach(element => {
    //     columnDef22.push(element);
    //   });
    //   this.columnDef = [];

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
    //   this.columnDef = columnDef22;
    // }
  }
}
