import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { forkJoin } from 'rxjs';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import * as moment from 'jalali-moment';

declare var $: any;


@Component({
  selector: 'app-proposal-item-estimate',
  templateUrl: './proposal-item-estimate.component.html',
  styleUrls: ['./proposal-item-estimate.component.css']
})
export class ProposalItemEstimateComponent implements OnInit {
  @Input() PopupParam;
  // @Input() PopupMaximized;
  @Output() ProposalItemEstimateOutPutPram: EventEmitter<any> = new EventEmitter<any>();
  gridHeight;
  OverPopUpPixelHeight;
  gridEstimateHeight = 90;
  mainBodyHeight = 87;
  ChangeDetection = false;
  private gridApi;
  private CoefGridApi;
  columnDef1;
  defaultColDef1;
  rowData1: any;
  columnDef2;
  rowData2: any;
  btnclicked = false;
  ISShowInformation = true;

  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverPopUpParams = {}; // For All Params
  CostListFinYearCode;
  ContractPriceListPatternID;
  PriceListTypeCode;
  IsDisable = true;
  beforeID;
  ProductTypeList = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  SumEstimateAmount = 0;
  SumContractOrderItemAmount = 0;
  CoefLevelCode;
  HaveSave = false;
  HaveDelete = false;
  BtnClickedName = '';
  IsNotFound = false;
  selectedRow: any;
  OverstartLeftPosition;
  OverstartTopPosition;
  paramObj;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  HaveMaxBtn = false;
  ActorName;
  ProposalDate;
  LetterNo;
  LetterDate;
  ExpireDate;
  selectedContractOrderItemID: any;
  ProposalID: any;
  SelectedProductID: any;
  ReadOnly: any;
  IsTechnicalStatus = true;
  IsAcceptJobCategory = true;
  IsAcceptGrade = true;
  SuggestionNote;
  Note;
  ProposalGrade;
  JobCategoryVerify;
  HasWarrantyItem = false;
  editableItems = true;

  NgSelectProposalCoefTypeParams = {
    bindLabelProp: 'ContractCoefTypeName',
    bindValueProp: 'ContractCoefTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'ProductRequestCoefType'
  };
  IsAccept = true;
  ModuleViewTypeCode;
  IsShow = true;
  gridheight;
  NgSelectVSParams = {
    bindLabelProp: 'ProductName',
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
  ProdcutTypeCode;
  IsDisplay = true;
  IsActiveDealMethodCode = true;
  BtnType = true;
  DifferenceDay = 0;
  DifferenceMonth = 0;
  DifferenceRatioDay = 0;

  constructor(
    private ContractList: ContractListService,
    private router: Router,
    private PriceList: PriceListService,
    private ProductRequest: ProductRequestService,
    private RefreshEquipmentTypeItems: RefreshServices,
    private RefreshPersonItems: RefreshServices,
  ) {
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    if (this.PopupParam.HasWarrantyItem) {
      this.HasWarrantyItem = true;
      this.editableItems = false;
    }
    if (this.PopupParam &&
      this.PopupParam.ProductRequestObject.RegionCode === 222 &&
      this.PopupParam.ModuleViewTypeCode === 149) {
      this.BtnType = this.PopupParam.BtnType;
    }
    this.ReadOnly = this.PopupParam.ReadOnly;
    this.ProposalID = this.PopupParam.Proposal.ProposalID ? this.PopupParam.Proposal.ProposalID :
      this.PopupParam.ProductRequestObject.WinnerProposalObject.ProposalID;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    // tslint:disable-next-line:max-line-length
    this.IsShow = (this.ModuleViewTypeCode === 24 || this.ModuleViewTypeCode === 123 || this.ModuleViewTypeCode === 128) ? true : false; // RFC 53953
    // tslint:disable-next-line:max-line-length
    this.gridheight = (this.ModuleViewTypeCode === 24 || this.ModuleViewTypeCode === 123 || this.ModuleViewTypeCode === 128) ? 98 : 70; // RFC 53953
    if (this.PopupParam.ModuleViewTypeCode === 90 || this.PopupParam.ModuleViewTypeCode === 141) {
      this.ISShowInformation = false;
      this.gridheight = 100;
    }
    if (this.PopupParam.ModuleViewTypeCode === 96) {
      this.IsDisplay = false; // RFC 50037
      this.BtnType = false;
    }
    if (this.PopupParam.ModuleViewTypeCode === 400000 || this.PopupParam.ModuleViewTypeCode === 500000 ||
      this.PopupParam.ModuleViewTypeCode === 156) {
      this.HasWarrantyItem = true; // RFC 52811
    }
    if (this.PopupParam.OriginModuleViewTypeCode === 500000) {
      this.IsShow = false;
      this.HasWarrantyItem = true;
      this.gridheight = 70;
    }

    if (this.ReadOnly) {
      this.HasWarrantyItem = true;
      this.IsShow = false;
    }

    this.ColumnDefinition();
    forkJoin([
      this.ProductRequest.GetPropsal(this.ProposalID),
      this.ProductRequest.GetPRBalanceFactors(this.PopupParam.ProductRequestObject.CostFactorID),
      this.ProductRequest.GetProposalCoefListWithProposalID(this.ProposalID)
    ]).subscribe(res => {
      if (res[0] && res[0].ProposalItemList && res[0].ProposalItemList.length > 0) {
        res[0].ProposalItemList.forEach(item => {
          item.EstiamteList = item.ProposalItemEstimateList;
        });
        this.rowData1 = res[0].ProposalItemList;
      } else {
        this.PopupParam.ProductRequestObject.ProductRequestItemList.forEach(item => {
          item.Price = '';
          item.EstiamteList = [];
        });
        if (this.PopupParam &&
          this.PopupParam.ProductRequestObject.ProductRequestTypeCode === 2 &&
          this.PopupParam.ProductRequestObject.PriceListTopicID === 402374) {
          this.PopupParam.ProductRequestObject.ProductRequestItemList.forEach(element => {
            element.Price = element.AmountCOEFPactWithDuration;
          });
        }

        if (this.PopupParam &&
          this.PopupParam.ProductRequestObject.ProductRequestTypeCode === 2 &&
          this.PopupParam.ProductRequestObject.PriceListTopicID === 402374) {
          var rowDataList = [];
          const PRItemObj = {
            ProductID: 344914,
            ProductName: 'کارکرد',
            ScaleName: 'واحد',
          };

          rowDataList.push(PRItemObj);
          this.rowData1 = rowDataList;
        } else {
          this.rowData1 = this.PopupParam.ProductRequestObject.ProductRequestItemList;
        }
      }

      if (res[0]) {
        this.ActorName = res[0].ActorName;
        this.ProposalDate = res[0].PersianProposalDate;
        this.LetterNo = res[0].LetterNo;
        this.LetterDate = res[0].PersianLetterDate;
        this.ExpireDate = res[0].PersianExpireDate;
        this.Note = res[0].Note;
        this.SuggestionNote = res[0].SuggestionNote;
        this.IsTechnicalStatus = res[0].TechnicalStatus;
        this.IsAcceptJobCategory = res[0].IsAcceptJobCategory;
        this.IsAcceptGrade = res[0].IsAcceptGrade;
        this.ProposalGrade = res[0].ProposalGrade;
        this.JobCategoryVerify = res[0].JobCategoryVerify;
        this.IsAccept = res[0].IsAccept;
      }

      if (res[1]) {
        this.CostListFinYearCode = res[1].PriceListFineYearCode;
        this.ContractPriceListPatternID = res[1].PriceListPatternID;
        this.PriceListTypeCode = res[1].PriceListTypeCode;
      }

      if (res[2]) {
        this.rowData2 = res[2];
      }
    }
    );

    if (this.PopupParam.ProductRequestObject.DealMethodCode === 4 || this.PopupParam.ProductRequestObject.DealMethodCode === 9) {
      this.IsActiveDealMethodCode = false;
      this.IsAcceptJobCategory = this.IsDisplay = this.BtnType = false;
      this.gridheight = 88;
    }
  }

  ColumnDefinition() {
    if (!this.IsShow) {
      this.columnDef1 = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'کالا/خدمت',
          field: 'ProductName',
          editable: false,
          width: 320,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 130,
          resizable: true
        },
        {
          headerName: 'مبلغ پیشنهادی ماهانه',
          field: 'MonthlyPrice',
          HaveThousand: true,
          width: 200,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 68,
          editable: true,
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.MonthlyPrice = params.newValue;
              if (params.data.PersianStartDate !== null || params.data.PersianEndDate !== null) {
                this.CalculateTime(params.data.PersianStartDate, params.data.PersianEndDate);
                if (this.DifferenceMonth !== 0) {
                  params.data.Price = (Math.floor(this.DifferenceMonth * params.data.MonthlyPrice));
                }
              }
            }
          },
        }, // 64176
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: this.editableItems,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.append-for-proposal-item-estimate'
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
          width: 130,
          resizable: true,
          editable: this.editableItems,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.append-for-proposal-item-estimate'
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
              this.gridApi.forEachNode(node => {
              });
              return true;
            } else {
              params.data.ShortEndDate = null;
              params.data.PersianEndDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'Price',
          HaveThousand: true,
          width: 200,
          resizable: true,
          editable: () => {
            // tslint:disable-next-line: max-line-length
            if (this.PopupParam.ModuleViewTypeCode === 149 && this.PopupParam.ProductRequestObject.RegionCode === 222 && this.PopupParam.BtnType) {
              return false;
            } else {
              return this.editableItems;
            }
          }
        },
        {
          headerName: 'ضریب پیشنهادی',
          field: 'ProposalCoef',
          HaveThousand: true,
          width: 100,
          resizable: true,
          hide: this.BtnType,
          editable: true
        }
      ];
    } else {
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
          valueSetter: (params) => {
            params.data.ScaleName = null;
            params.data.ProductID = null;
            params.data.ProductName = null;
            if (params.newValue && params.newValue.ProductTypeName) {
              params.data.ProductTypeName = params.newValue.ProductTypeName;
              params.data.ProductTypeCode = params.newValue.ProductTypeCode;
              return true;
            } else {
              params.data.ProductTypeName = null;
              params.data.ProductTypeCode = null;
              return false;
            }
          },
          editable: false,
          width: 120,
          resizable: true,
        },
        {
          headerName: 'کالا/خدمت',
          field: 'ProductName',
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
              return params.value.ProductName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.ProductName) {
              params.data.ProductName = params.newValue.ProductName;
              params.data.ProductID = params.newValue.ProductID;
              this.ProductRequest.GetProductScaleName(params.newValue.ProductID).subscribe(res => {
                params.data.ScaleName = res;
              });
              return true;
            } else {
              params.data.ProductName = '';
              params.data.ProductID = null;
              params.data.ScaleName = '';
              return false;
            }
          },
          editable: false,
          width: 350,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 130,
          resizable: true
        },
        {
          headerName: 'مبلغ پیشنهادی ماهانه',
          field: 'MonthlyPrice',
          HaveThousand: true,
          width: 200,
          resizable: true,
          hide: this.PopupParam.ModuleViewTypeCode !== 68,
          editable: true,
          valueSetter: (params) => {
            if (params.newValue) {
              params.data.MonthlyPrice = params.newValue;
              if (params.data.PersianStartDate !== null || params.data.PersianEndDate !== null) {
                this.CalculateTime(params.data.PersianStartDate, params.data.PersianEndDate);
                if (this.DifferenceMonth !== 0) {
                  params.data.Price = (Math.floor(this.DifferenceMonth * params.data.MonthlyPrice));
                }
              }
            }
          },
        }, // 64176
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: this.editableItems,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.append-for-proposal-item-estimate'
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
          width: 130,
          resizable: true,
          editable: this.editableItems,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPC: 100,
            AppendTo: '.append-for-proposal-item-estimate'
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
              this.gridApi.forEachNode(node => {
              });
              return true;
            } else {
              params.data.ShortEndDate = null;
              params.data.PersianEndDate = '';
              return false;
            }
          }
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'Price',
          HaveThousand: true,
          width: 200,
          resizable: true,
          editable: () => {
            // tslint:disable-next-line: max-line-length
            if (this.PopupParam.ModuleViewTypeCode === 149 && this.PopupParam.ProductRequestObject.RegionCode === 222 && this.PopupParam.BtnType) {
              return false;
            } else {
              return this.editableItems;
            }
          }
        },
        {
          headerName: 'ضریب پیشنهادی',
          field: 'ProposalCoef',
          HaveThousand: true,
          width: 100,
          resizable: true,
          hide: this.BtnType,
          editable: true
        }
      ];
    }
    this.columnDef2 = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'ضریب درخواست تامین',
        field: 'ContractCoefTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectProposalCoefTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ContractCoefTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ContractCoefTypeName) {
            params.data.ContractCoefTypeName = params.newValue.ContractCoefTypeName;
            params.data.ContractCoefTypeCode = params.newValue.ContractCoefTypeCode;
            return true;
          } else {
            params.data.ContractCoefTypeName = '';
            params.data.ContractCoefTypeCode = null;
            return false;
          }
        },
        editable: true,
        width: 150,
        resizable: true,
        sortable: true
      },
      {
        headerName: 'ضریب',
        field: 'Coef',
        width: 150,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'مقدار',
        field: 'Value',
        width: 150,
        resizable: true,
        editable: true,
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
  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.Closed.emit(true);
    }
  }

  popupclosed() {
    this.btnclicked = false;
    this.type = '';
    this.HaveMaxBtn = false;
  }

  onAddPopUpBtnClick() {
    this.type = 'price-list-topic-dataentry-page';
    this.btnclicked = true;
    this.OverstartLeftPosition = 450;
    this.OverstartTopPosition = 51;
    this.paramObj = {
      Mode: 'AddNewPopUpMode',
      PriceListTypeCode: this.PriceListTypeCode,
      CostListFinYearCode: this.CostListFinYearCode,
    };
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
    this.gridApi.updateRowData({ add: ItemList });
  }

  onGridReady2(params) {
    this.CoefGridApi = params.api;
  }

  onContractOrderItemGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  RowClick(InputValue) {
    this.SelectedProductID = InputValue.data.ProductID;
    this.IsDisable = false;
    const rowData = [];

    if (this.beforeID) {
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });
      this.gridApi.updateRowData({ remove: rowData });
    }

    this.beforeID = InputValue.data.ProductID;
  }

  rowClick(InputValue) {
  }

  onCellValueChanged2(event) {
    if (event.colDef && event.colDef.field === 'ContractCoefTypeName') {
      const itemsToUpdate = [];
      this.CoefGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
        }
      });
      this.CoefGridApi.updateRowData({ update: itemsToUpdate });
    }
  }
  onSave() {
    this.BtnClickedName = 'SaveBtnClicked';
    this.gridApi.stopEditing();
    const rowData = [];
    const InvalidRowData = [];

    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
      if (!node.data.ShortStartDate || !node.data.ShortEndDate) {
        InvalidRowData.push(node.data);
      }
    });

    if (InvalidRowData.length > 0 &&
      (this.IsTechnicalStatus || this.IsAccept || this.IsAcceptGrade || this.IsAcceptJobCategory)) { // RFC 51647
      if (this.PopupParam.ProductRequestObject.StartTypeCode == 3) {
        // tslint:disable-next-line: max-line-length
        this.ShowMessageBoxWithYesNoBtn('تاریخ شروع و پایان وارد نشده است . تاریخ قرارداد به عنوان تاریخ ابلاغ قرارداد در نظر گرفته خواهد شد.آیا مایل به ادامه هستید؟');
      } else {
        // tslint:disable-next-line: max-line-length
        this.ShowMessageBoxWithYesNoBtn('تاریخ شروع و پایان وارد نشده است . تاریخ قرارداد به عنوان تاریخ انعقاد قرارداد در نظر گرفته خواهد شد.آیا مایل به ادامه هستید؟');
      }
    } else {
      this.SaveProposalItem();
    }
  }

  SaveProposalItem() {
    this.BtnClickedName = '';
    const ProposaSavelItem = {
      ProposalID: this.ProposalID,
      Note: this.Note,
      SuggestionNote: this.SuggestionNote,
      TechnicalStatus: this.IsTechnicalStatus,
      ProposalGrade: this.ProposalGrade,
      JobCategoryVerify: this.JobCategoryVerify,
      IsAcceptJobCategory: this.IsAcceptJobCategory,
      IsAcceptGrade: this.IsAcceptGrade,
      IsAccept: this.IsAccept,
    };

    let AItemNo = 0;
    const ProposalItemList = [];
    this.gridApi.forEachNode((item) => {
      const ProposalItem = {
        ProposalItemID: item.data.ProposalItemID ? item.data.ProposalItemID : -1,
        ItemNo: ++AItemNo,
        ProposalID: this.ProposalID,
        ProductID: item.data.ProductID,
        Qty: item.data.Qty ? item.data.Qty : 0,
        Price: item.data.Price,
        DisCount: 0,
        StartDate: item.data.ShortStartDate ? item.data.ShortStartDate : null,
        EndDate: item.data.ShortEndDate ? item.data.ShortEndDate : null,
        ProposalCoef: item.data.ProposalCoef
      };
      ProposalItemList.push(ProposalItem);
    });

    // tslint:disable-next-line:max-line-length
    this.ProductRequest.SavePropsalItem(ProposalItemList, this.rowData2, ProposaSavelItem, this.PopupParam.ModuleCode, this.PopupParam.OrginalModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ProposalItemEstimateOutPutPram.emit(true);
      this.ChangeDetection = false;
    },
      err => {
        if (!err.error.Message.includes('|')) {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      });
  }


  IsYesRedioClick(Type) {
    this.IsTechnicalStatus = Type;
  }
  IsAcceptJobCategoryClick(Type) {
    this.IsAcceptJobCategory = Type;
  }
  IsAcceptGradeClick(Type) {
    this.IsAcceptGrade = Type;
  }

  SetPriceListTopicList(Param) {
    const rowData = [];
    this.gridApi.forEachNode(node => rowData.push(node.data));
    let MaxProp = 0;
    if (rowData.length > 0) {
      MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
    }
    this.PriceList.GetPriceListTopicList(Param, this.PriceListTypeCode + this.CostListFinYearCode, null, null).subscribe(
      res => {
        if (res) {
          const itemsToUpdate = [];
          res.forEach(element => {
            MaxProp = MaxProp + 1;
            const newItem = {
              ItemNo: MaxProp,
              PriceListPatternID: element.PriceListPatternID,
              ContractOrderItemID: element.selectedContractOrderItemID,
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
          this.gridApi.updateRowData({ add: itemsToUpdate });
        }
      }
    );
  }

  onCellValueChanged(event) {
    const value = event.newValue;
    let itemsToUpdate = [];
    this.ChangeDetection = true;
    // if (event.newValue) {value = event.newValue; } else {value = event.oldValue; }
    if (event.colDef && event.colDef.field === 'PriceListNo') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
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
      this.gridApi.updateRowData({ update: itemsToUpdate });
      const Values = [];
      if (value != null && value !== '') {
        Values.push(value);
        this.PriceList.GetPriceListTopicList(Values, this.PriceListTypeCode + this.CostListFinYearCode, null, null).subscribe(
          res => {
            if (res[0]) {
              itemsToUpdate = [];
              this.gridApi.forEachNode(node => {
                if (node.rowIndex === event.rowIndex) {
                  node.data.PriceListPatternID = res[0].PriceListPatternID;
                  // node.data.ContractOrderItemID = this.selectedContractOrderItemID;
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
              this.gridApi.updateRowData({ update: itemsToUpdate });
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
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount) {
          node.data.FinalAmount = value * node.data.Amount;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    if (event.colDef && event.colDef.field === 'FinalAmount') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex && node.data.Amount && node.data.Amount > 0) {
          node.data.Qty = (value / node.data.Amount).toFixed(2);
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }

    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    // this.ContractOrderItemList.forEach((item) => {
    //   if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
    //     item.ContractOrderEstimateList = rowData;
    //   }
    // });

  }

  onMovablecellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ContractCoefTypeName') {
      this.ContractList.GetContractCoefTypeList().subscribe(res => {
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'ProductRequestCoefType'
        });
      });
    }
  }
  MessageBoxAction(ActionResult) {
    this.btnclicked = false;
    this.type = '';
    // tslint:disable-next-line: max-line-length
    if (this.BtnClickedName !== 'BtnConfirm' && this.BtnClickedName !== 'PriceListTopicNotFound' && this.BtnClickedName !== 'SaveBtnClicked' && ActionResult === 'YES') {
      this.Closed.emit(true);
    }
    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'YES') {
      if (this.selectedRow !== null) {
        this.type = 'price-list-topic-dataentry-page';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.OverstartLeftPosition = 455;
        this.OverstartTopPosition = 165;
        this.paramObj = {
          HeaderName: 'افزودن فهرست بها',
          Mode: 'AddBatchTopicInEstimate',
          PriceListTypeCode: this.PriceListTypeCode,
          CostListFinYearCode: this.CostListFinYearCode,
          PriceListTopicCode: this.selectedRow.data.PriceListNo
        };
      }
    }

    if (this.BtnClickedName === 'PriceListTopicNotFound' && ActionResult === 'NO') {
      this.IsNotFound = false;
    }

    if (this.BtnClickedName === 'SaveBtnClicked' && ActionResult === 'YES') {
      this.SaveProposalItem();
    }

    this.BtnClickedName = '';
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 490;
    this.OverstartTopPosition = 220;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 490;
    this.OverstartTopPosition = 220;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
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

  onRowDataChanged(event) {
  }

  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }

  ReturendCoefLevelCode(CoefLevelCode) {
    if (CoefLevelCode) {
      this.CoefLevelCode = CoefLevelCode;
    }
  }

  OnGroupBtnClick(event) {
    this.OverstartLeftPosition = 60;
    this.OverstartTopPosition = 10;
    this.paramObj = {
      CostListFinYearCode: this.CostListFinYearCode,
      PriceListPatternID: this.ContractPriceListPatternID,
      GroupSelected: true
    };
    this.type = 'editor-select-price-list';
    this.btnclicked = true;
    this.HaveMaxBtn = true;
  }

  getOutPutParam(event) {
    if (this.type === 'editor-select-price-list') {
      this.SetPriceListTopicList(event);
      return;
    }

    if (this.type === 'app-excel-load-data') {
      this.loadFromExcel(event);
      return;
    }

    if (this.type === 'price-list-topic-dataentry-page') {
      this.AddPopUpBtnClick(event);
      return;
    }

    if (this.type === 'set-invalid-contract-estimate') {
      // this.SetInvalidContractEstimate(event);
      return;
    }

    if (this.type === 'select-product-request-estimate') {
      this.SetEstimateList(event);
      return;
    }
  }


  OnRowBtnClick(event) {

    if (event === 'RowItems') {
      this.AddRowItems();
      return;
    }
  }

  AddRowItems() {

    if (!this.SelectedProductID) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت انجام این عملیات انتخاب نشده است.');
      return;
    }

    this.OverstartLeftPosition = 93;
    this.OverstartTopPosition = 73;
    this.type = 'select-product-request-estimate';
    this.btnclicked = true;
    this.HaveMaxBtn = false;

    const PriceListPatternIDs = [-1];
    this.gridApi.forEachNode(node => {
      PriceListPatternIDs.push(node.data.PriceListPatternID);
    });


    this.paramObj = {
      CostFactorID: this.PopupParam.ProductRequestObject.CostFactorID,
      ProductID: this.SelectedProductID,
      PriceListPatternIDs: PriceListPatternIDs,
    };
  }

  SetEstimateList(event) {
    this.gridApi.updateRowData({ add: event });
  }

  IsAcceptRedioClick(IsAccept) {
    this.IsAccept = IsAccept;
  }
  onProposalItemSave() {
    this.gridApi.stopEditing();
    const rowData = [];
    const InvalidRowData = [];

    this.gridApi.forEachNode(node => {
      rowData.push(node.data);
    });

    if (InvalidRowData.length > 0) {
      this.type = 'set-invalid-contract-estimate';
      this.btnclicked = true;
      this.OverstartLeftPosition = 266;
      this.OverstartTopPosition = 140;
      this.OverPopUpParams = {
        // tslint:disable-next-line:max-line-length
        HeaderName: 'ردیف های زیر در فهرست بها یافت نشد یا دارای مبلغ پایه معتبر نمی باشد. خواهشمند است ابتدا نسبت به تکمیل اطلاعات ردیف های مربوطه اقدام فرمایید',
        InvalidEstimateRows: InvalidRowData,
        HaveSave: this.HaveSave,
        PriceListTypeCode: this.PriceListTypeCode,
        CostListFinYearCode: this.CostListFinYearCode
      };
    } else {
      let AItemNo = 0;
      const ProposalItemList = [];
      this.gridApi.forEachNode((item) => {

        const ProposalItem = {
          ProposalItemID: item.data.ProposalItemID ? item.data.ProposalItemID : -1,
          ItemNo: ++AItemNo,
          ProposalID: this.ProposalID,
          ProductID: item.data.ProductID,
          Qty: item.data.Qty ? item.data.Qty : 0,
          Price: item.data.Price,
          DisCount: 0,
          StartDate: item.data.ShortStartDate ? item.data.ShortStartDate : null,
          EndDate: item.data.ShortEndDate ? item.data.ShortEndDate : null,
          ProposalCoef: item.data.ProposalCoef
        };
        ProposalItemList.push(ProposalItem);
      });
      // tslint:disable-next-line:max-line-length
      this.ProductRequest.SaveProposalItemList(ProposalItemList, this.ProposalID, this.PopupParam.ModuleCode, this.PopupParam.OrginalModuleCode).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ProposalItemEstimateOutPutPram.emit(true);
        this.ChangeDetection = false;
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
        });
    }
  }
  FetchMoreProduct(event) {
    event.Owner.columnDef1[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetProductList(event.SearchOption,
        this.PopupParam.ProductRequestObject.RegionCode,
        event.term,
        event.PageNumber,
        event.PageSize,
        event.Owner.ProdcutTypeCode,
        this.PopupParam.ProductRequestObject.IsCost,
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
    event.Owner.columnDef1[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      this.PopupParam.ProductRequestObject.RegionCode,
      event.term,
      event.PageNumber,
      event.PageSize,
      event.Owner.ProdcutTypeCode,
      this.PopupParam.ProductRequestObject.IsCost,
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

  oncellEditingStarted(event) {
    this.gridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.ProdcutTypeCode = node.data.ProductTypeName && node.data.ProductTypeName.ProductTypeCode
          ? node.data.ProductTypeName.ProductTypeCode
          : node.data.ProductTypeCode ? node.data.ProductTypeCode : 0;
      }
    });
    if (event.colDef && event.colDef.field === 'ProductName') {
      this.columnDef1[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetProductList(0,
        this.PopupParam.ProductRequestObject.RegionCode,
        '',
        1,
        30,
        this.ProdcutTypeCode,
        this.PopupParam.ProductRequestObject.IsCost,
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
  }
  RedioSelectedChange(event) {
    event.Owner.columnDef1[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetProductList(event.SearchOption,
      this.PopupParam.ProductRequestObject.RegionCode,
      // tslint:disable-next-line:max-line-length
      '',
      1,
      30,
      event.Owner.ProdcutTypeCode,
      this.PopupParam.ProductRequestObject.IsCost,
      null).
      subscribe(res => {
        event.Owner.columnDef1[2].cellEditorParams.Params.loading = false;
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
  }

  OnImportFromExcelBtnClick() {
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.type = 'app-excel-load-data';
    this.OverstartLeftPosition = 400;
    this.OverstartTopPosition = 200;

    const obj =
    {
      headerName: 'کالا/خدمت',
      field: 'ProductName',
      editable: true,
      width: 320,
      resizable: true
    };

    var exeColDef = [];
    exeColDef.push(obj);

    this.columnDef1.forEach(item => {
      if (item.field !== 'ProductName') {
        exeColDef.push(item);
      }
    });

    const Excel_Header_Param = {
      colDef2: exeColDef
    };

    this.paramObj = Excel_Header_Param;
  }

  loadFromExcel(data) {
    const ProductCodeList = [];
    const rowData = [];
    data.forEach((x: any) => {
      if (x.ProductName) {
        this.rowData1.forEach(rowItem => {
          if (parseInt(x.ProductName) === rowItem.ProductCode) {
            rowItem.PersianStartDate = x && x.PersianStartDate ? x.PersianStartDate : '';
            rowItem.PersianEndDate = x && x.PersianEndDate ? x.PersianEndDate : '';
            rowItem.ShortStartDate = x && x.PersianStartDate ? moment.from(x.PersianStartDate, 'fa',
              'YYYY/MM/DD').format('YYYY/MM/DD') : '';
            rowItem.ShortEndDate = x && x.PersianEndDate ? moment.from(x.PersianEndDate, 'fa',
              'YYYY/MM/DD').format('YYYY/MM/DD') : '';
            rowItem.Price = x && x.Price ? x.Price : '';
          }
        });
      }
    });
  }
  BtnArchiveClick() {
    if (this.ProposalID) {
      const ParentDocList = [];
      ParentDocList.push(171);
      this.ProductRequest.GetDocTypeMadatory(
        this.PopupParam.ProductRequestObject.DealMethodCode ? this.PopupParam.ProductRequestObject.DealMethodCode : -1,
        this.PopupParam.ProductRequestObject.DealTypeCode,
        this.PopupParam.ProductRequestObject.ContractTypeCode ? this.PopupParam.ProductRequestObject.ContractTypeCode : -1,
        this.PopupParam.ProductRequestObject.RegionCode,
        -1,
        this.PopupParam.ProductRequestObject.Article31ID,
        null,
        null,
        false,
        ParentDocList).subscribe(res => {
          const DocTypeList = [];
          res.forEach(element => {
            DocTypeList.push(element.DocumentTypeCode);
          });
          this.type = 'archive-details';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.HaveMaxBtn = false;
          this.OverstartLeftPosition = 282;
          this.OverstartTopPosition = 11;
          const archiveParam = {
            EntityID: this.ProposalID,
            ModuleCode: this.PopupParam.ModuleCode,
            HasCheck: true,
            DocTypeCode: 171,
            IsReadOnly: false,
            DocumentTypeCodeList: DocTypeList,
            OrginalModuleCode: this.PopupParam.ModuleCode,
            RegionCode: this.PopupParam.ProductRequestObject.RegionCode
          };
          this.paramObj = archiveParam;
        });
    } else {
      this.ShowMessageBoxWithOkBtn('مقادیر به درستی وارد نشده است، لطفا با راهبر سیستم تماس بگیرید');
    }
  }
  CalculateTime(FromDate, ToDate) {
    // tslint:disable-next-line:radix
    const CurrentYearFrom = parseInt(FromDate.split('/')[0]);
    // tslint:disable-next-line:radix
    const CurrentYearTo = parseInt(ToDate.split('/')[0]);
    // tslint:disable-next-line:radix
    const CurrentMonthFrom = parseInt(FromDate.split('/')[1]);
    // tslint:disable-next-line:radix
    const CurrentMonthTo = parseInt(ToDate.split('/')[1]);
    // tslint:disable-next-line:radix
    let CurrentDayFrom = parseInt(FromDate.split('/')[2]);
    // tslint:disable-next-line:radix
    let CurrentDayTo = parseInt(ToDate.split('/')[2]);
    if (CurrentDayFrom === 31 || CurrentDayFrom === 29) {
      CurrentDayFrom = 30;
    }
    if (CurrentDayTo === 31 || CurrentDayTo === 29) {
      CurrentDayTo = 30;
    }
    // tslint:disable-next-line: prefer-const
    this.DifferenceDay = CurrentDayTo - CurrentDayFrom + 1;
    this.DifferenceRatioDay = this.DifferenceDay / 30;
    let DifferenceYear = CurrentYearTo - CurrentYearFrom;
    if (DifferenceYear === 0) {
      this.DifferenceMonth = CurrentMonthTo - CurrentMonthFrom;
    } else {
      this.DifferenceMonth = CurrentMonthTo - CurrentMonthFrom + (12 * DifferenceYear);
    }
  }
}
