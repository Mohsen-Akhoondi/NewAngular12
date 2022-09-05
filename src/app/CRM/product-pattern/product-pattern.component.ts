import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NgSelectConfig } from '../../Shared/ng-select/public-api';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductPatternService } from 'src/app/Services/CRM/ProductPatternService';
import { PriceListService } from '../../Services/BaseService/PriceListService';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-product-pattern',
  templateUrl: './product-pattern.component.html',
  styleUrls: ['./product-pattern.component.css']
})
export class ProductPatternComponent implements OnInit {
  ShowGrid = true;
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  HeightPercentWithMaxBtn: number;
  btnclicked = false;
  gridApi;
  BtnClickedName: string;
  NgSelectSearchTerm = '';
  NgSelectItems;
  RegionGroupItems;
  NewChildDisable = false;
  NgSelectParams = {
    Items: [],
    bindLabelProp: 'RegionGroupName',
    bindValueProp: 'RegionGroupCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  public scrollbarOptions = {
    axis: 'x',
    theme: 'inset-2-dark',
    scrollButtons: { enable: true }
  };
  type: string;
  OverstartLeftPosition;
  OverstartTopPosition;
  //selectedPriceListTopicCode;
  selectedPriceListID;
  PricelistTopicCode;
  PricelistTopicSearch;
  CostListFinYearCode;
  @Input() MainContentHeight = 92;
  @Input() treeHeight = 88.5;
  @Input() NeedSelected = false;
  @Input() PopUpParam;
  @Input() ModuleCode = -1;
  @Output() RowSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  gridcolumns = [
    {
      headerName: 'ردیف',
      field: 'ItemNo',
      sortable: true,
      filter: true,
      width: 85,
      resizable: true
    },
    {
      headerName: 'کد محصول',
      field: 'ProductCode',
      sortable: true,
      filter: true,
      width: 120,
      resizable: true
    },
    {
      headerName: 'نام محصول',
      field: 'ProductName',
      sortable: true,
      filter: true,
      width: 354,
      resizable: true
    },

  ];
  gridrows: any = [];
  SelectedID;
  selectedRow: any;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  paramObj;
  TreeInputParam = { Owner: this, GetChildren: this.GetChildren, GetRoots: this.GetRoots };
  IsDisable = false;
  hasChildren: any;
  hasCreate: any;
  ProductPatternID;
  ProductPatternProductsID: any;
  InputParam: any;
  ProductPatternName: any;
  ProductPatternCode: any;
  PID: any;
  ModuleViewTypeCode: any;
  SelectedProductPattern: any;
  SecondID = null;
  constructor(private router: Router,
    private PriceList: PriceListService,
    private ProductPattern: ProductPatternService,
    config: NgSelectConfig,
    private RegionList: RegionListService,
  ) {
    config.notFoundText = 'موردی یافت نشد';
  }
  gridOptions: GridOptions = {
    onRowDoubleClicked: this.doSomething
  };

  doSomething(row) {
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();

    selectedRows.forEach(function (selectedRow, index) {
    });
  }
  ngOnInit() {
    this.ShowGrid = this.PopUpParam ? this.PopUpParam.ShowGrid : true;
    this.RegionList.GetRegionGroupList(true).subscribe(res => {
      this.RegionGroupItems = res;
      this.NgSelectParams.IsDisabled = this.NeedSelected;
      this.NgSelectParams.selectedObject = this.PopUpParam ? this.PopUpParam.RegionGroupCode : 2;
      this.PID = this.PopUpParam && this.PopUpParam.ProductPatternID ? this.PopUpParam.ProductPatternID : null;
      this.SecondID =this.PopUpParam.SearchSTR?this.PopUpParam.SearchSTR :null;
      this.PricelistTopicSearch =this.PopUpParam.SearchSTR?this.PopUpParam.SearchSTR :null;
      // this.MainContentHeight = this.PopUpParam && this.PopUpParam.MainContentHeight ? this.PopUpParam.MainContentHeight : 97;
    });
    this.gridrows = [];
  }
  // tslint:disable-next-line:no-shadowed-variable
  popupclosed(event) {
    this.btnclicked = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
  }
  tree_selectedchange(event) {
    this.SelectedProductPattern = "";
    this.hasChildren = event.hasChildren;
    this.SelectedID = event.id;
    if (!this.hasChildren) {
      this.SelectedProductPattern = this.SelectedID;
      this.FillGridData(this.SelectedID);
    } else {
      this.SelectedProductPattern = "";
      this.gridrows = [];
      this.hasCreate = false;
    }
  }
  onChangeRegionGroup(event) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    $('#price-list-sidebar').resizable({
      handles: 'w',
      resize: function (event, ui) {
        // const max = $('#container').width();
        const width =
          (ui.size.width - ui.originalSize.width) * 2 + ui.originalSize.width;
        ui.position.left = ui.originalPosition.left;
        ui.size.width = width;

        // $('#content').width(max - width)
      }
    });
  }


  onGridReady(params) {
    this.gridApi = params.api;
  }


  RowClick(InputValue) {
    this.selectedRow = InputValue;
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

  FillGridData(PriceListPatternID) {
    if (this.ShowGrid) {
      this.ProductPattern.GetProductPatternProductsList(PriceListPatternID).subscribe(res => {
        this.gridrows = res;

        if (this.gridrows && this.gridrows.length > 0) {
          this.hasCreate = true;
        } else {
          this.hasCreate = false;
        }

      });
    }

  }

  GetChildren(event) {

    return new Promise((resolve, reject) => {
      event.Owner.ProductPattern.GetProductPatternChildren(event.ParentID, event.Owner.PID , event.Owner.SecondID).subscribe(data => {
        const children = [];
        data.forEach(item => {
          children.push({
            name: item.ProductPatternName,
            id: item.ProductPatternID.toString(),
            hasChildren: !item.IsLeaf,
          });
        });
        resolve(children);
      });
    });

  }

  GetRoots(event) {
    let nodes = [];
    return new Promise((resolve, reject) => {
      event.Owner.ProductPattern.GetProductPatternRoots(
        event.Owner.NgSelectParams.selectedObject, //event.FirstID, 
        event.Owner.PID,
        event.Owner.SecondID).subscribe(res => {
          nodes = [];
          res.forEach(item => {
            nodes.push({
              name: item.ProductPatternName,
              id: item.ProductPatternID,
              hasChildren: !item.IsLeaf,
              // levelCode: item.PriceListLevelCode,
              // TopicCode: item.PriceListTopiCode
            });
          });
          resolve(nodes);
        });


      // return nodes;
    });
  }

  onRowDoubleClicked(event) {

  }
  OnCreatePriceListTopic() {

    this.type = 'product-pattern-product-entry';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 30;
    this.PercentWidth = 40;
    this.paramObj = {
      ProductPatternID: this.SelectedID,
    };
  }

  OnCreateProductPatternEntry() {

    this.type = 'product-pattern-entry';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.HaveMaxBtn = true;
    this.HeightPercentWithMaxBtn = 40;
    this.PercentWidth = 40;
    this.paramObj = {
      ProductPatternID: this.SelectedID,
      RegionGroupCode: this.NgSelectParams.selectedObject
    };
  }

  Btnclick(BtnName) {
    if (BtnName === 'update') {
      this.type = 'product-pattern-entry';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 40;
      this.PercentWidth = 40;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        ProductPatternID: this.SelectedID,
        RegionGroupCode: this.NgSelectParams.selectedObject,
        hasChildren: this.hasChildren,
        Mode: 'EditMode',

      };

      return;

    }

  }


  OnDeleteProductPatternEntry() {
    this.BtnClickedName = 'BtnDelete2';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
  }

  OnDeletePriceListTopic() {
    if (this.selectedRow && this.selectedRow.data) {
      this.ShowMessageBoxWithYesNoBtn('آیا از حذف مطمئن هستید؟');
      this.BtnClickedName = 'BtnDelete';
    } else {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت حذف انتخاب نشده است');
      return;
    }
  }


  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    }

    if (this.BtnClickedName === 'BtnDelete2' && ActionResult === 'YES') {
      this.DoDelete2();
    }

    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }
  DoDelete2() {
    this.ProductPatternID = this.SelectedID;
    this.ProductPattern.DeleteProductPatternEntry(this.ProductPatternID, this.ModuleCode).subscribe(
      res => {
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد.');
      });

  }



  DoDelete() {
    this.ProductPatternProductsID = this.selectedRow.data.ProductPatternProductsID;
    this.ProductPattern.DeleteProductPatternProductsList(this.ProductPatternProductsID, this.ModuleCode).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد.');
      this.FillGridData(this.SelectedID);
    });
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  getOutPutParam(event) {
    if (event && this.type === 'product-pattern-product-entry') {
      this.FillGridData(this.SelectedID);

    }
    if (event && this.type === 'product-pattern-entry') {
      this.ngOnInit();
      this.ngAfterViewInit();
    }
  }
  onOkClick() {

    const selectedRows = this.gridApi.getSelectedRows();

    const Result = [];
    if (this.PopUpParam && this.PopUpParam.GroupSelected) {
      if (selectedRows && selectedRows.length) {
        selectedRows.forEach(element => {
          Result.push(element);
          //Result.push(element.ProductPatternName);
        });
        this.RowSelected.emit(Result);
        this.Closed.emit(true);
      } else {
        // if (this.SelectedID) {
        //   this.PriceList.GetPriceListTopicChildren(
        //     this.SelectedID
        //   ).subscribe(res => {
        //     res.forEach(element => {
        //       Result.push(element);
        //     });
        //     this.RowSelected.emit(Result);
        //     this.Closed.emit(true);
        //   });
        // }
      }
    } else {
      if (selectedRows && selectedRows.length) {

        Result.push(selectedRows[0]);
        this.RowSelected.emit(Result);
        this.Closed.emit(true);
      }
    }
  }
  OnSearchPriceListCodeClick() {

    if (this.ShowGrid && this.PricelistTopicSearch !== '') {
      this.ProductPattern.GetProductPatternProductsListSearch(this.PricelistTopicSearch).subscribe(res => {
        this.gridrows = res;
      });
    }

    if (!this.ShowGrid && this.PricelistTopicSearch !== '') {
      this.SecondID = this.PricelistTopicSearch;
    }
  }

  Close() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  TreeOkClick() {
    this.RowSelected.emit(this.SelectedProductPattern);
    this.Closed.emit(true);
  }
}
