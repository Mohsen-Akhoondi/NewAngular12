import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { GridOptions } from 'ag-grid-community';
import { isUndefined } from 'util';
import { ExcelService } from 'src/app/Services/BaseService/ExcelService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
declare var $: any;
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  providers: [ExcelService]
})
export class GridComponent implements OnInit {
  @Input() ParentgridHeight;
  @Input() columns;
  @Input() rows;
  @Input() rowsData;
  @Input() gridHeight;
  @Input() GridMaxHeight;
  @Input() gridHeightPxel;
  @Input() gridHeader;
  @Input() NewItemTemp;
  @Input() IsEditable;
  @Input() HasInsertBtn = true;
  @Input() isPagination = false;
  @Input() paginationPageSize = 10;
  @Input() defaultCol;
  @Input() defaultSelectedRowIndex;
  @Input() GridOptionsRowStyle;
  @Input() RowHeightFunc;
  @Input() IsDisable = false;
  @Input() IsNeedGroupBtn = false;
  @Input() IsNeedImportBtn = false;
  @Input() IsNeedRowBtn = false;
  @Input() IsNeedAddPopUp = false;
  @Input() IsNeedContractPayBtn = false;
  @Input() IsNeedContractMinutesBtn = false;
  @Input() IsNeedContractAgentBtn = false;
  @Input() IsEstateSpecBtn = false;
  @Input() IsContractOrderBtn = false;
  @Input() AutoNumberField;
  @Input() HaveBorder = false;
  @Input() GenralBtnName = 'افزودن';
  @Input() IsNeedGeneralBtn = false;
  @Input() IsDisableGeneralBtn = false;
  @Input() GenralBtnIcon = 'add';
  @Input() HeaderWidth;
  @Input() HasMaximizeBtn = true;
  @Input() HaveDelete = true;
  @Input() RowHeight;
  @Output() Delete: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() RowClick: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() RowDoubleClick: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() RowDataChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() RowDataUpdated: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() CellValueChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() GridReady: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() FilterChange: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() SortChange: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() GroupBtnClick: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() ImportFromExcelClick: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() RowBtnClick: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() AddPopUp: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() cellEditingStarted: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() GeneralBtnClick: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() RowAdded: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() ChangePage: EventEmitter<any> =
    new EventEmitter<any>();
  constructor(private excelService: ExcelService,
    private PriceList: PriceListService,
    private CommonServices: CommonService) {
    // this.gridOptions.alignedGrids.push(this.bottomOptions);
    // this.bottomOptions.alignedGrids.push(this.gridOptions);
  }
  GridMaximized = false;
  OldgridHeight = 0;
  columnDefs = [];
  defaultColDef = {};
  CurrentRow;
  ImageArrowDownSrc = 'assets/Icons/ArrowDown.png';
  ImageArrowUpSrc = 'assets/Icons/ArrowUp.png';
  gridApi;
  gridColumnApi;
  SortModels;
  FilterModelList;
  // Paging
  @Input() IsServerPaging;
  FirstRowOnPage = 0;
  LastRowOnPage = 0;
  @Input() TotalRecordCount = 0;
  CurrentPageNumber = 0;
  TotalPageCount = 0;
  //
  localeText = {
    // for filter panel
    page: 'صفحه',
    more: 'بیشتر',
    to: 'تا',
    of: 'از',
    next: 'بعدی',
    last: 'آخرین',
    first: 'اولین',
    previous: 'قبلی',
    loadingOoo: 'درحال بارگذاری...',

    // for set filter
    selectAll: 'انتخاب همه',
    searchOoo: 'درحال جستجو..',
    blanks: 'daBlanc',

    // for number filter and text filter
    filterOoo: 'مقدار...',
    applyFilter: 'اعمال فیلتر...',
    equals: 'برابر',
    notEqual: 'مخالف',

    // for number filter
    lessThan: 'کوچکتر',
    greaterThan: 'بزرگتر',
    lessThanOrEqual: 'کوچکتر مساوی',
    greaterThanOrEqual: 'بزرگتر مساوی',
    inRange: 'در بازه',

    // for text filter
    contains: 'شامل باشد',
    notContains: 'شامل نباشد',
    startsWith: 'شروع شود با',
    endsWith: 'خاتمه یابد با',

    // the header of the default group column
    group: 'laGroup',

    // tool panel
    columns: 'laColumns',
    filters: 'laFilters',
    rowGroupColumns: 'laPivot Cols',
    rowGroupColumnsEmptyMessage: 'la drag cols to group',
    valueColumns: 'laValue Cols',
    pivotMode: 'laPivot-Mode',
    groups: 'laGroups',
    values: 'laValues',
    pivots: 'laPivots',
    valueColumnsEmptyMessage: 'la drag cols to aggregate',
    pivotColumnsEmptyMessage: 'la drag here to pivot',
    toolPanelButton: 'la tool panel',

    // other
    noRowsToShow: 'رکوردی برای نمایش وجود ندارد',

    // enterprise menu
    pinColumn: 'laPin Column',
    valueAggregation: 'laValue Agg',
    autosizeThiscolumn: 'laAutosize Diz',
    autosizeAllColumns: 'laAutsoie em All',
    groupBy: 'laGroup by',
    ungroupBy: 'laUnGroup by',
    resetColumns: 'laReset Those Cols',
    expandAll: 'laOpen-em-up',
    collapseAll: 'laClose-em-up',
    toolPanel: 'laTool Panelo',
    export: 'laExporto',
    csvExport: 'la CSV Exportp',
    excelExport: 'la Excel Exporto',

    // enterprise menu pinning
    pinLeft: 'laPin <<',
    pinRight: 'laPin >>',
    noPin: 'laDontPin <>',

    // enterprise menu aggregation and status bar
    sum: 'laSum',
    min: 'laMin',
    max: 'laMax',
    none: 'laNone',
    count: 'laCount',
    average: 'laAverage',

    // standard menu
    copy: 'laCopy',
    copyWithHeaders: 'laCopy Wit hHeaders',
    ctrlC: 'ctrl n C',
    paste: 'laPaste',
    ctrlV: 'ctrl n V'
  };
  rowData: any;
  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    defaultColDef: this.defaultColDef,
    rowSelection: 'multiple',
    enableRtl: true,
    suppressRowTransform: true,
    localeText: this.localeText,
    onFilterChanged: function () {
      $('.ag-filter-condition').children('label').first().text('و');
      $('.ag-filter-condition').children('label').last().text('یا');
    },
    alignedGrids: []
  };
  bottomOptions: GridOptions = {
    enableRtl: true,
    alignedGrids: []
  };
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 67) {
      const cell = this.gridApi.getFocusedCell();
      if (cell) {
        const row = this.gridApi.getDisplayedRowAtIndex(cell.rowIndex);
        this.CommonServices.copyText(row.data[cell.column.colDef.field]);
      }
    }
  }
  getChromeVersion() {
    const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    return raw ? parseInt(raw[2], 10) : false;
  }
  ngOnInit() {
    this.OldgridHeight = this.gridHeight;
    if (this.GridOptionsRowStyle && this.GridOptionsRowStyle.getRowStyle) {
      this.gridOptions.getRowStyle = this.GridOptionsRowStyle.getRowStyle;
    }
    let itemNo = 1;
    itemNo = this.FirstRowOnPage && this.FirstRowOnPage > 1 ? this.FirstRowOnPage : 1;
    if (this.rows) {
      const Sub = this.rows.subscribe(res => {
        for (const i of res) {
          if (!i.ItemNo) {
            i.ItemNo = itemNo;
          }
          itemNo++;
        }
        this.rowData = res;
        this.FilterModelList = [];
        this.SortModels = [];
      },
        () => { },
        () => { if (Sub) { Sub.unsubscribe(); } });
    } else if (this.rowsData) {
      for (const i of this.rowsData) {
        if (!i.ItemNo) {
          i.ItemNo = itemNo;
        }
        itemNo++;
      }
      this.rowData = this.rowsData;
      this.FilterModelList = [];
      this.SortModels = [];
    }
    this.columnDefs = this.columns;
    this.defaultColDef = this.defaultCol;
    this.gridOptions.defaultColDef.filter = 'agTextColumnFilter';
    this.gridOptions.defaultColDef.sortable = true;
    if (this.columnDefs) {
      this.columnDefs.forEach(element => {
        if (element.children) {
          element.children.forEach(item => {
            if (item.HaveThousand) {
              delete item.HaveThousand;
              item.valueFormatter = (params) => {
                return this.formatNumber(params.value);
              };
            }
          });
        } else
          if (element.HaveThousand) {
            delete element.HaveThousand;
            element.valueFormatter = (params) => {
              return this.formatNumber(params.value);
            };
          }
      });
    }

    $(() => {
      $.contextMenu({
        selector: '.ag-cell',
        callback: (key, options) => {
          this.CommonServices.copyText(options.$trigger[0].childNodes[0].data);
        },

        items: {
          copy: { name: 'Copy', icon: 'copy' }
        }
      });
    });
    if (this.TotalRecordCount && this.paginationPageSize) {
      this.FirstRowOnPage = 1;
      this.LastRowOnPage = this.paginationPageSize;
      this.CurrentPageNumber = 1;
      this.TotalPageCount = Math.ceil(this.TotalRecordCount / this.paginationPageSize);
    }
  }

  formatNumber(number) {
    if (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '';
    }
  }

  onPaginationChanged(event) {

  }

  onGridReady(event) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    this.GridReady.emit(event);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    let itemNo = 1;
    itemNo = this.FirstRowOnPage && this.FirstRowOnPage > 1 ? this.FirstRowOnPage : 1;
    if (changes.TotalRecordCount && changes.TotalRecordCount.currentValue) {
      this.TotalRecordCount = changes.TotalRecordCount.currentValue;
      if (this.TotalRecordCount && this.paginationPageSize) {
        this.FirstRowOnPage = 1;
        this.LastRowOnPage = this.paginationPageSize;
        this.CurrentPageNumber = 1;
        this.TotalPageCount = Math.ceil(this.TotalRecordCount / this.paginationPageSize);
      }
    }
    if (changes.paginationPageSize && changes.paginationPageSize.currentValue) {
      this.paginationPageSize = changes.paginationPageSize.currentValue;
      if (this.TotalRecordCount && this.paginationPageSize) {
        this.FirstRowOnPage = 1;
        this.LastRowOnPage = this.paginationPageSize;
        this.CurrentPageNumber = 1;
        this.TotalPageCount = Math.ceil(this.TotalRecordCount / this.paginationPageSize);
      }
    }
    if (changes.columns && changes.columns.currentValue) {
      this.columnDefs = changes.columns.currentValue;
      this.columnDefs.forEach(element => {
        if (element.children) {
          element.children.forEach(item => {
            if (item.HaveThousand) {
              delete item.HaveThousand;
              item.valueFormatter = (params) => {
                return this.formatNumber(params.value);
              };
            }
          });
        } else
          if (element.HaveThousand) {
            delete element.HaveThousand;
            element.valueFormatter = (params) => {
              return this.formatNumber(params.value);
            };
          }
      });
    }
    if (changes.rows && changes.rows.currentValue) {
      changes.rows.currentValue.subscribe(res => {
        for (const i of res) {
          if (!i.ItemNo) {
            i.ItemNo = itemNo;
          }
          itemNo++;
        }
        this.rowData = res;
        this.FilterModelList = [];
        this.SortModels = [];
      });
    } else if (changes.rowsData && changes.rowsData.currentValue) {
      for (const i of changes.rowsData.currentValue) {
        if (!i.ItemNo) {
          i.ItemNo = itemNo;
        }
        itemNo++;
      }
      this.rowData = changes.rowsData.currentValue;
      this.FilterModelList = [];
      this.SortModels = [];
    }
    if (changes.defaultCol && changes.defaultCol.currentValue) {
      this.defaultColDef = this.defaultCol.currentValue;
    }
    if (changes.IsDisable && !isUndefined(changes.IsDisable.currentValue)) {
      this.IsDisable = changes.IsDisable.currentValue;
    }
    if (changes.HaveDelete && !isUndefined(changes.HaveDelete.currentValue)) {
      this.HaveDelete = changes.HaveDelete.currentValue;
    }
  }
  onRowClicked(event: any) {
    this.CurrentRow = event;
    this.RowClick.emit(event);
  }
  onRowDoubleClicked(event: any) {
    this.RowDoubleClick.emit(event);
  }
  onAddBelowRow() {
    if (!this.IsDisable) {
      const rowData = [];
      this.gridApi.forEachNode(node => rowData.push(node.data));
      let newItem = Object.assign({}, this.NewItemTemp);
      if (!newItem) {
        newItem = {
          ItemNo: 1
        };
      }
      if (this.AutoNumberField) {
        let MaxProp = 0;
        if (rowData.length > 0) {
          const CurrAutoNumberField = this.AutoNumberField;
          MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o[CurrAutoNumberField]; }));
        }
        newItem[this.AutoNumberField] = MaxProp + 1;
      }
      if (this.CurrentRow) {
        this.gridApi.updateRowData({ add: [newItem], addIndex: this.CurrentRow.rowIndex + 1 });
      } else {
        this.gridApi.updateRowData({ add: [newItem] });
      }
      this.RefreshItemNo();
    }
  }
  onAddUpRow() {
    if (!this.IsDisable) {
      const rowData = [];
      this.gridApi.forEachNode(node => rowData.push(node.data));
      let newItem = Object.assign({}, this.NewItemTemp);
      if (!newItem) {
        newItem = {
          ItemNo: 1
        };
      }
      if (this.AutoNumberField) {
        let MaxProp = 0;
        if (rowData.length > 0) {
          const CurrAutoNumberField = this.AutoNumberField;
          MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o[CurrAutoNumberField]; }));
        }
        newItem[this.AutoNumberField] = MaxProp + 1;
      }
      if (this.CurrentRow) {
        this.gridApi.updateRowData({ add: [newItem], addIndex: this.CurrentRow.rowIndex });
        this.CurrentRow.rowIndex = this.CurrentRow.rowIndex + 1;
      } else {
        this.gridApi.updateRowData({ add: [newItem] });
      }
      this.RefreshItemNo();
    }
  }
  onAddRow() {
    if (!this.IsDisable) {
      const rowData = [];
      let MaxItemNo = 0;
      this.gridApi.forEachNode(node => rowData.push(node.data));
      if (rowData.length > 0) {
        MaxItemNo = Math.max.apply(Math, rowData.map(function (o) { return o['ItemNo']; }));
      }
      let newItem = Object.assign({}, this.NewItemTemp);
      if (!newItem) {
        newItem = {
          ItemNo: 1
        };
      }
      if (this.AutoNumberField) {
        let MaxProp = 0;
        if (rowData.length > 0) {
          const CurrAutoNumberField = this.AutoNumberField;
          MaxProp = Math.max.apply(Math, rowData.map(function (o) { return o[CurrAutoNumberField]; }));
        }
        newItem[this.AutoNumberField] = MaxProp + 1;
      }
      this.gridApi.updateRowData({ add: [newItem] });
      this.RowAdded.emit(newItem);
      this.RefreshItemNo();
    }
  }
  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData != null) {
      this.gridApi.updateRowData({ remove: selectedData });
      this.RefreshItemNo();
      this.Delete.emit(true);
    }
  }
  onAddGroupItems() {
    this.GroupBtnClick.emit(true);
  }

  onAddRowItems(Type) {

    switch (Type) {
      case 'RowItems':
        this.RowBtnClick.emit('RowItems');
        break;

      case 'ContractPay':
        this.RowBtnClick.emit('ContractPay');
        break;

      case 'ContractMinutes':
        this.RowBtnClick.emit('ContractMinutes');
        break;

      case 'ContractAgent':
        this.RowBtnClick.emit('ContractAgent');
        break;

      case 'EstateSpec':
        this.RowBtnClick.emit('EstateSpec');
        break;

      case 'ContractOrder':
        this.RowBtnClick.emit('ContractOrder');
        break;

      default:
        break;
    }
  }
  onImportFromExcel() {
    this.ImportFromExcelClick.emit(true);
  }

  onAddPopUp() {
    this.AddPopUp.emit(true);
  }
  RefreshItemNo() {
    let CurrItemNo = 0;
    CurrItemNo = this.FirstRowOnPage && this.FirstRowOnPage > 1 ? this.FirstRowOnPage : 0;
    const itemsToUpdate = [];
    this.gridApi.forEachNode(function (node) {
      // if (node.data.ItemNo) {
      CurrItemNo++;
      node.data['ItemNo'] = CurrItemNo;
      itemsToUpdate.push(node.data);
      // }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }
  onRowDataChanged() {
    this.RowDataChanged.emit(true);
    const itemsToUpdate = [];
    if (this.gridApi) {
      this.gridApi.forEachNode(element => {
        Object.keys(element.data).forEach(prop => {
          if (element.data[prop] && element.data[prop].toString().includes('ي')) {
            element.data[prop] = element.data[prop].toString().replace(/ي/g, 'ی');
            itemsToUpdate.push(element.data);
          }
        });
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
      if (this.defaultSelectedRowIndex || this.defaultSelectedRowIndex === 0) {
        this.gridApi.forEachNode(node => {
          if (node.rowIndex === this.defaultSelectedRowIndex) {
            node.setSelected(true);
            this.RowClick.emit(node);
          }
        });
      }
    }
  }
  OnAutoSizeAllCol() {
    if (this.gridColumnApi) {
      const allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.colId);
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds, true);
    }
  }
  onCellValueChanged(event: any) {
    this.CellValueChanged.emit(event);
  }
  onRowDataUpdated() {
    this.RowDataUpdated.emit(true);
    const itemsToUpdate = [];
    this.gridApi.forEachNode(element => {
      Object.keys(element.data).forEach(prop => {
        if (element.data[prop] && element.data[prop].toString().includes('ي')) {
          element.data[prop] = element.data[prop].toString().replace(/ي/g, 'ی');
          itemsToUpdate.push(element.data);
        }
      });
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }
  OnFilterChanged(param) {
    const FilterModel = param.api.getFilterModel();
    this.FilterModelList = [];
    Object.keys(FilterModel).forEach(p => {
      this.FilterModelList.push({
        FieldName: p,
        FilterType: FilterModel[p].type,
        FilterText: FilterModel[p].filter
      });
    });
    this.FilterChange.emit(this.FilterModelList);
  }
  OnSortChanged(param) {
    this.SortModels = [];
    const SortChangeResult = { SortModels: [], PageNumber: this.CurrentPageNumber, PageSize: this.paginationPageSize };
    param.api.getSortModel().forEach(p => {
      this.SortModels.push(
        {
          FieldName: p.colId,
          ISDescending: p.sort !== 'asc'
        }
      );
    });
    SortChangeResult.SortModels = this.SortModels;
    this.SortChange.emit(SortChangeResult);
  }
  onmouseover(Type) {
    if (!this.IsDisable) {
      if (Type === 'Down') {
        this.ImageArrowDownSrc = 'assets/Icons/ArrowDownBlue.png';
      } else {
        this.ImageArrowUpSrc = 'assets/Icons/ArrowUpBlue.png';
      }
    }
  }
  onmouseout(Type) {
    if (Type === 'Down') {
      this.ImageArrowDownSrc = 'assets/Icons/ArrowDown.png';
    } else {
      this.ImageArrowUpSrc = 'assets/Icons/ArrowUp.png';
    }
  }
  onCellEditingStarted(event) {
    this.cellEditingStarted.emit(event);
  }
  OnExportToExcell() {
    if (this.rowData && this.rowData.length > 0) {
      const ExportedRowData = [];
      this.rowData.forEach(element => {
        const ColValue = {};
        this.columnDefs.forEach(col => {
          if (col.children) {
            col.children.forEach(item => {
              const val = element[item.field];
              const str = item.headerName + ' ' + col.headerName;
              ColValue[str] = val;

              // if (ColValue[item.headerName]) {
              //   item.headerName = item.headerName + '_1';
              //   ColValue[item.headerName] = val;
              // } else if (ColValue[item.headerName + '_1']) {
              //   item.headerName = item.headerName + '_2';
              //   ColValue[item.headerName] = val;
              // } else {
              //   ColValue[item.headerName] = val;
              // }

            });
          } else {
            const val = element[col.field];
            ColValue[col.headerName] = val;
          }
        });
        ExportedRowData.push(ColValue);
      });
      this.excelService.exportAsExcelFile(ExportedRowData, 'exported');
    }
  }
  OnGridMaximized() {
    this.GridMaximized = !this.GridMaximized;
    this.gridHeight = this.GridMaximized ? 94 : this.OldgridHeight;
  }
  onGeneralBtnClick(event) {
    this.GeneralBtnClick.emit(event);
  }
  onChangePage() {
    this.ChangePage.emit({
      PageNumber: this.CurrentPageNumber,
      PageSize: this.paginationPageSize,
      SortModels: this.SortModels,
      FilterModelList: this.FilterModelList
    });
    this.FirstRowOnPage = ((this.CurrentPageNumber - 1) * this.paginationPageSize) + 1;
    this.LastRowOnPage = this.CurrentPageNumber === this.TotalPageCount ?
      this.TotalRecordCount : this.CurrentPageNumber * this.paginationPageSize;
  }
  onFirst() {
    if (this.CurrentPageNumber > 1) {
      this.CurrentPageNumber = 1;
      this.onChangePage();
    }
  }
  onPrevious() {
    if (this.CurrentPageNumber > 1) {
      this.CurrentPageNumber--;
      this.onChangePage();
    }
  }
  onNext() {
    if (this.CurrentPageNumber < this.TotalPageCount) {
      this.CurrentPageNumber++;
      this.onChangePage();
    }
  }
  onLast() {
    if (this.CurrentPageNumber < this.TotalPageCount) {
      this.CurrentPageNumber = this.TotalPageCount;
      this.onChangePage();
    }
  }
}
