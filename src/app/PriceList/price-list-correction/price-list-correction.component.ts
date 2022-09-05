import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';

@Component({
  selector: 'app-price-list-correction',
  templateUrl: './price-list-correction.component.html',
  styleUrls: ['./price-list-correction.component.css']
})
export class PriceListCorrectionComponent implements OnInit {
  @Input() PopupParam;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutputParam: EventEmitter<any> = new EventEmitter<any>();
  gridcolumns = [];
  rowData;
  btnclicked = false;
  OverstartLeftPosition;
  OverstartTopPosition;
  startLeftPosition;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader;
  PlsParams;
  type;
  // tslint:disable-next-line:max-line-length
  Tip = 'به دلیل مغایرت نام برخی از ردیف های اکسل بارگذاری شده با داده موجود جهت تعیین تکلیف این ردیف ها در صورتی که داده ی موجود با کد مربوطه قابل قبول نیست و نیاز به درج ردیف ستاره دار جدید با شرح وارد شده در اکسل می باشد تیک مربوط به اینگونه ردیف های در ستون انتخاب فعال گردد همچنین در صورتی که نیاز به جستجوی ردیف جدید می باشد از دکمه ی ستون انتخاب ردیف فهرست استفاده گردد و در صورتی که داده موجود با همان کد قابل قبول بود نیاز به اقدامی نمی باشد و در نهایت پس از تعیین تکلیف تمامی ردیف ها فرم تایید شود';
  CostListFinYearCode: number;
  PriceListTypeCode: number;
  gridApi;
  SelectedRow;
  DataToAddList;
  PixelHeight = 400;
  PixelWidth = 800;
  SelectedList: Array<any> = [];
  WorkItems = [{ WorkCode: 1, WorkName: 'کارکرد' }, { WorkCode: 0, WorkName: 'پایکار ' }];
  @ViewChild('IsSelected') IsSelected: TemplateRef<any>;
  @ViewChild('Upload') Upload: TemplateRef<any>;

  WorkUnitParams = {
    bindLabelProp: 'WorkUnitName',
    bindValueProp: 'WorkUnitCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'work-unit'
  };
  constructor(private PriceList: PriceListService,
    private ContractList: ContractListService,
    private RefreshWorkUnitItems: RefreshServices) {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.gridcolumns = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true,
      },
      {
        headerName: 'انتخاب',
        field: 'IsSelected',
        width: 70,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsSelected
        },
        editable: (params) => {
          return !params.data.DisableSelect;
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.IsSelected = params.newValue;
            return true;
          } else {
            params.data.IsSelected = false;
            return false;
          }
        },
        resizable: true,
      },
      {
        headerName: 'انتخاب ردیف فهرست بها',
        field: '',
        width: 150,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.Upload,
        }
      },
      {
        headerName: 'ردیف فهرست بها',
        field: 'PriceListTopicCode',
        sortable: true,
        filter: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'WorkUnitName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.WorkUnitParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkUnitName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.WorkUnitCode) {
            params.data.WorkUnitCode = params.newValue.WorkUnitCode;
            params.data.WorkUnitName = params.newValue.WorkUnitName;
            return true;
          }
        },
        editable: true,
        width: 170,
        resizable: true
      },
      {
        headerName: 'کارکرد',
        field: 'IsWorkCodeParam',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.WorkItems,
          bindLabelProp: 'WorkName',
          bindValueProp: 'WorkCode'
        },
        cellRenderer: 'SeRender',
        editable: () => {
          return this.PopupParam.ModuleCode === 2516 ? true : false;
        },
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.WorkName;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'شرح فهرست بها',
        field: 'PriceListTopicName',
        sortable: true,
        filter: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'شرح فهرست بها اکسل',
        field: 'ExcelPriceListTopicName',
        sortable: true,
        filter: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        sortable: true,
        filter: true,
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'مبلغ اکسل',
        field: 'ExcelAmount',
        sortable: true,
        filter: true,
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'تعداد اکسل',
        field: 'Qty',
        sortable: true,
        filter: true,
        HaveThousand: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'نوع ردیف',
        field: 'IsStar',
        width: 90,
        resizable: true,
      },
    ];
  }
  ngOnInit() {
    this.rowData = this.PopupParam.PriceListCorrectionList;
    this.CostListFinYearCode = this.PopupParam.CostListFinYearCode;
    this.PriceListTypeCode = this.PopupParam.PriceListTypeCode;
  }
  GetConfirmation() {
    this.ShowMessageBoxWithYesNoBtn('برای ردیف های انتخاب شده ردیف فهرست بهای جدیدی در مرحله مربوطه ایجاد میگردد. آیا مطمئن هستید؟');
  }

  OnSave() {
    this.SelectedList = [];
    this.gridApi.forEachNode(res => {
      if (res.data.IsSelected) {
        const item = {
          Amount: res.data.Amount,
          ExcelAmount: res.data.ExcelAmount,
          ExcelPriceListTopicName: res.data.ExcelPriceListTopicName,
          ExcelPriceListTopicCode: res.data.PriceListTopicCode,
          IsWorkCode: res.data.IsWorkCodeParam.WorkCode,
          PriceListName: res.data.PriceListName,
          PriceListTopicCode: res.data.PriceListTopicCode,
          PriceListTopicName: res.data.PriceListTopicName,
          PriceListPatternID: res.data.PriceListPatternID,
          WorkUnitCode: res.data.WorkUnitCode,
          WorkUnitName: res.data.WorkUnitName,
          IsStarCodeNameEditable: res.data.IsStarCodeNameEditable,
          StarCodeName: res.data.StarCodeName,
          Qty: res.data.Qty,
        };
        this.SelectedList.push(item);
      }
    });
    if (this.SelectedList.length > 0) {
      this.GetConfirmation();
    } else {
      this.EmitData();
    }
  }

  // onConfirm() {
  //   const promise = new Promise((resolve) => {
  //     this.SelectedList = [];
  //     this.gridApi.forEachNode(res => {
  //       if (res.data.IsSelected) {
  //         const item = {
  //           Amount: res.data.Amount,
  //           ExcelAmount: res.data.ExcelAmount,
  //           ExcelPriceListTopicName: res.data.ExcelPriceListTopicName,
  //           IsWorkCode: res.data.IsWorkCodeParam.WorkCode,
  //           PriceListName: res.data.PriceListName,
  //           PriceListTopicCode: res.data.PriceListTopicCode,
  //           PriceListTopicName: res.data.PriceListTopicName,
  //           PriceListPatternID : res.data.PriceListPatternID,
  //           WorkUnitCode: res.data.WorkUnitCode,
  //           WorkUnitName : res.data.WorkUnitName,
  //           Qty: res.data.Qty,
  //         };
  //         this.SelectedList.push(item);
  //       }
  //     });
  //     const DataToRemove = [];
  //     const DataToAdd = [];
  //     if (this.SelectedList.length > 0) {
  //       this.PriceList.CorrectPriceListTopic(this.SelectedList, this.CostListFinYearCode, this.PriceListTypeCode,
  //         this.PopupParam.ModuleCode).subscribe((res: any) => {
  //         this.gridApi.forEachNode(GA => {
  //           if (GA.data.IsSelected) {
  //             DataToRemove.push(GA.data);
  //           }
  //         });
  //         this.gridApi.updateRowData({ remove: DataToRemove });
  //         res.forEach(result => {
  //           const NewItem = {
  //             IsSelected: true,
  //             PriceListTopicCode: result.PriceListTopicCode,
  //             WorkUnitName: result.WorkUnitName,
  //             PriceListTopicName: result.PriceListTopicName,
  //             ExcelPriceListTopicName: result.ExcelPriceListTopicName,
  //             Amount: result.Amount,
  //             ExcelAmount: result.ExcelAmount,
  //             IsStar: result.IsStar,
  //             ItemNo: -1,
  //           };
  //           DataToAdd.push(NewItem);
  //         });
  //         this.gridApi.updateRowData({add: DataToAdd});
  //         this.RefreshItemNo();
  //         resolve();
  //       });
  //     } else {
  //       resolve();
  //     }
  //   }).then(() => {
  //     const DataToEmit = [];
  //     this.gridApi.forEachNode( res => {
  //       const Data = {
  //         PriceListPatternID: res.data.PriceListPatternID,
  //         PriceListNo: res.data.PriceListTopicCode,
  //         PriceListName: res.data.PriceListTopicName,
  //         IsStar: res.data.IsStar,
  //         WorkUnitName: res.data.WorkUnitName,
  //         Amount: res.data.DisableSelect ? res.data.Amount : res.data.ExcelAmount,
  //         Qty: res.data.DisableSelect ? null : res.data.Qty,
  //         ItemNo: -1,
  //       };
  //       DataToEmit.push(Data);
  //     });
  //     const ObjEmit = {
  //       data: DataToEmit,
  //       command: 'clear',
  //     };
  //     this.PopupOutputParam.emit(ObjEmit);
  //     this.closeModal.emit(true);
  //   });
  // }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
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
  onClose() {
    this.closeModal.emit();
    const obj = {
      command: 'clear',
    };
    this.PopupOutputParam.emit(obj);
  }
  GridReady(event) {
    this.gridApi = event.api;
  }
  CellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'WorkUnitName') {
      this.gridcolumns[4].cellEditorParams.Params.loading = false;
      this.PriceList.GetWorkUnits().subscribe(res => {
        this.RefreshWorkUnitItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'work-unit'
        });
      });
    }
  }
  OnUploadClick(event) {
    if (event && (!event.IsSelected)) {
      this.type = 'price-list-topic-select';
      this.btnclicked = true;
      this.OverstartLeftPosition = 230;
      this.OverstartTopPosition = 100;
      this.HaveHeader = true;
      this.PlsParams = {
        HeaderName: 'اصلاح فهرست بها',
       // rowIndex: this.SelectedRow.rowIndex,
        SourcePriceListPatternID : event.PriceListPatternID,
        PriceListTopicLevel: event.PriceListTopicCode.substring(0, 4),
        CostListFinYearCode: this.CostListFinYearCode,
      };

    }
  }
  RowClick(event) {
    this.SelectedRow = event;
  }
  popupclosed(event) {
    this.btnclicked = false;
  }
  MessageBoxAction(event) {
    if (this.type === 'message-box') {
      this.btnclicked = false;
      if (event === 'YES') {
        const promise = new Promise((resolve) => {
          const DataToRemove = [];
          const DataToAdd = [];
          this.PriceList.CorrectPriceListTopic(this.SelectedList, this.CostListFinYearCode, this.PriceListTypeCode,
            this.PopupParam.ModuleCode).subscribe((res: any) => {
              this.gridApi.forEachNode(GA => {
                if (GA.data.IsSelected) {
                  DataToRemove.push(GA.data);
                }
              });
              this.gridApi.updateRowData({ remove: DataToRemove });
              res.forEach(result => {
                const NewItem = {
                  IsSelected: true,
                  PriceListTopicCode: result.PriceListTopicCode,
                  WorkUnitName: result.WorkUnitName,
                  PriceListTopicName: result.PriceListTopicName,
                  ExcelPriceListTopicCode: result.ExcelPriceListTopicCode,
                  Amount: result.Amount,
                  ExcelAmount: result.ExcelAmount,
                  IsStar: result.IsStar,
                  Qty: result.Qty,
                  ItemNo: -1,
                  FinalAmount: result.Qty * result.ExcelAmount,
                  PriceListPatternID: result.PriceListPatternID,
                  StarCodeName: result.StarCodeName,
                };
                DataToAdd.push(NewItem);
              });
              this.DataToAddList = DataToAdd;
              this.gridApi.updateRowData({ add: DataToAdd });
              this.RefreshItemNo();
              resolve(true);
            });
        }).then((res: boolean) => {
          if (res) {
            this.EmitData();
          }
        });
      }
    }
  }
  EmitData() {
    const DataToEmit = [];
    // tslint:disable-next-line:no-shadowed-variable
    this.gridApi.forEachNode(res => {
      const Data = {
        PriceListPatternID: res.data.PriceListPatternID,
        PriceListNo: res.data.PriceListTopicCode,
        PriceListName: res.data.PriceListTopicName,
        IsStar: res.data.IsStar,
        WorkUnitName: res.data.WorkUnitName,
        Amount: res.data.IsSelected ? res.data.ExcelAmount : res.data.Amount ,
        ExcelAmount: res.data.ExcelAmount,
        ExcelPriceListTopicCode: res.data.ExcelPriceListTopicCode,
        Qty: res.data.DisableSelect ? null : res.data.Qty,
        ItemNo: -1,
      };
      DataToEmit.push(Data);
    });
    const ObjEmit = {
      data: DataToEmit,
      command: 'clear',
    };
    this.PopupOutputParam.emit(ObjEmit);
    this.closeModal.emit(true);
  }
  getOutPutParam(event) {
    if (this.type === 'price-list-topic-select') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(res => {
        if (res.data.PriceListPatternID === event.SourcePriceListPatternID) {
          res.data.PriceListTopicCode = event.SelectedRow.PriceListTopicCode;
          res.data.PriceListTopicName = event.SelectedRow.PriceListTopicName;
          res.data.PriceListPatternID = event.SelectedRow.PriceListPatternID;
          res.data.WorkUnitCode = event.SelectedRow.WorkUnitCode;
          res.data.WorkUnitName = event.SelectedRow.WorkUnitName;
          res.data.Amount = event.SelectedRow.Amount;
          res.data.IsStar = event.SelectedRow.IsStar;
          res.data.ExcelPriceListTopicName = null;
          res.data.ExcelPriceListTopicCode = res.data.ExcelPriceListTopicCode;
          res.data.ExcelAmount = null;
          res.data.Qty = event.SelectedRow.Qty;
          res.data['DisableSelect'] = true;
          res.data.IsSelected = false;
          itemsToUpdate.push(res.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }
}
