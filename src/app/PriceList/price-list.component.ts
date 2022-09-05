import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListService } from '../Services/BaseService/PriceListService';
import { of } from 'rxjs';
import { GridOptions } from 'ag-grid-community';
import { NgSelectConfig } from '../Shared/ng-select/public-api';
import { ArchiveDetailService } from '../Services/BaseService/ArchiveDetailService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  btnclicked = false;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  gridApi;
  NgSelectSearchTerm = '';
  NgSelectItems;
  PriceListTopicItems;
  NewChildDisable = false;
  NgSelectParams = {
    Items: [],
    bindLabelProp: 'PriceListTopicCodeName',
    bindValueProp: 'PriceListTopicID',
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
  IsStar = false;
  OverstartLeftPosition;
  OverstartTopPosition;
  selectedPriceListTopicCode;
  selectedPriceListID;
  PricelistTopicCode;
  PricelistTopicSearch;
  CostListFinYearCode;
  @Input() MainContentHeight = 98;
  @Input() treeHeight = 79.8;
  @Input() NeedSelected = false;
  @Input() PopUpParam;
  @Input() ModuleCode = -1;
  @Output() RowSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() PriceListClosed: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  gridcolumns = [
    {
      headerName: 'ردیف',
      field: 'PriceListTopicCode',
      sortable: true,
      filter: true,
      width: 85,
      resizable: true
    },
    {
      headerName: 'نام',
      field: 'PriceListTopicName',
      sortable: true,
      filter: true,
      width: 354,
      resizable: true
    },
    {
      headerName: 'واحد',
      field: 'WorkUnitName',
      sortable: true,
      filter: true,
      width: 70,
      resizable: true
    },
    {
      headerName: 'مبلغ',
      field: 'Amount',
      sortable: true,
      filter: true,
      HaveThousand: true,
      width: 100,
      resizable: true
    },
    {
      headerName: 'کارکرد/پایکار',
      field: 'IsWork',
      sortable: true,
      filter: true,
      width: 90,
      resizable: true
    },
    {
      headerName: 'نوع ردیف',
      field: 'IsStar',
      width: 70,
      resizable: true
    }
  ];
  gridrows: any = [];
  ContactPriceListPatternID;
  SelectedPriceListPatternID;
  SelectedTopicCode;
  SelectedLevelCode;
  selectedRow: any;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  paramObj;
  IsDisable = false;
  HasArchiveAccess: any;
  ArchiveBtnText = '';
  TreeInputParam = { Owner: this, GetChildren: this.GetChildren, GetRoots: this.GetRoots };
  constructor(
    private PriceList: PriceListService,
    config: NgSelectConfig,
    private ArchiveList: ArchiveDetailService,
    private Report: ReportService,
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
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.PriceList.GetPriceListTopics(true).subscribe(res => {
      this.PriceListTopicItems = res;
      this.NgSelectParams.IsDisabled = this.NeedSelected;
      for (const i of res) {
        i.PriceListTopicCodeName =
          i.PriceListTopicCode + ' - ' + i.PriceListTopicName;
      }
      if (this.PopUpParam) {
        this.ContactPriceListPatternID = this.PopUpParam.PriceListPatternID;
        this.NgSelectParams.selectedObject = res.filter(
          x =>
            x.PriceListTopicCode ===
            this.PopUpParam.CostListFinYearCode.toString()
        )[0].PriceListTopicID;
        this.CostListFinYearCode = this.PopUpParam.CostListFinYearCode;
      } else {
        this.NgSelectParams.selectedObject = res[0].PriceListTopicID;
        this.CostListFinYearCode = res[0].PriceListTopicCode;
      }
      const item = this.PriceListTopicItems.find(
        s => s.PriceListTopicID === this.NgSelectParams.selectedObject
      );
      this.selectedPriceListTopicCode = item.PriceListTopicCode;
    });
    this.gridrows = of([]);
    this.ArchiveList.HasArchiveAccess(this.ModuleCode).subscribe(res => {
      this.HasArchiveAccess = res;
      this.ArchiveBtnText = res ? 'مستندات فنی' : 'مشاهده مستندات فنی';
    });
  }
  // tslint:disable-next-line:no-shadowed-variable
  popupclosed() {
    this.btnclicked = false;
  }
  tree_selectedchange(event) {
    this.SelectedPriceListPatternID = event.id;
    this.SelectedTopicCode = event.TopicCode;
    this.SelectedLevelCode = event.levelCode;
    if (event.levelCode === 5) {
      this.IsDisable = false;
    } else {
      this.IsDisable = true;
    }
    if (event.levelCode === 5) {
      this.NewChildDisable = true;
    } else {
      this.NewChildDisable = false;
    }
    this.FillGridData(this.SelectedPriceListPatternID, true, (this.IsStar === true ? 1 : 0));
  }
  onChangePriceListTopic(event) {
    const item = this.PriceListTopicItems.find(
      s => s.PriceListTopicID === event
    );
    this.CostListFinYearCode = this.selectedPriceListTopicCode = item.PriceListTopicCode;
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

  onPrint() {
    this.Report.ShowReportPriceList(this.SelectedPriceListPatternID, this.ModuleCode);
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  OnSelectedRow() {
    const selectedRows = this.gridApi.getSelectedRows();
    const Result = [];
    if (this.PopUpParam && this.PopUpParam.GroupSelected) {
      if (selectedRows && selectedRows.length) {
        selectedRows.forEach(element => {
          Result.push(element.PriceListTopicCode);
        });
        this.RowSelected.emit(Result);
        this.PriceListClosed.emit(true);
      } else {
        if (this.SelectedPriceListPatternID) {
          this.PriceList.GetPriceListTopicChildren(
            this.SelectedPriceListPatternID
          ).subscribe(res => {
            res.forEach(element => {
              Result.push(element);
            });
            this.RowSelected.emit(Result);
            this.PriceListClosed.emit(true);
          });
        }
      }
    } else {
      if (selectedRows && selectedRows.length) {
        Result.push(selectedRows[0].PriceListTopicCode);
        this.RowSelected.emit(Result);
        this.PriceListClosed.emit(true);
      }
    }
  }
  onRowDoubleClicked(event) {
    if (this.ModuleCode === 2682) {
      this.UpdatePriceListTopic();
    } else {
      const Result = [];
      Result.push(event.data.PriceListTopicCode);
      this.RowSelected.emit(Result);
      this.PriceListClosed.emit(true);
    }
  }
  Btnclick(InputValue) {
    switch (InputValue) {
      case 'PriceListAnalayze': {
        if (this.selectedRow == null) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.OverstartLeftPosition = 500;
          this.OverstartTopPosition = 250;
        } else {
          this.HaveHeader = true;
          this.type = 'PriceListAnalayze';
          this.btnclicked = true;
          this.OverstartLeftPosition = 110;
          this.OverstartTopPosition = 105;
          this.paramObj = {
            PriceListTopicID: this.selectedRow.data.PriceListTopicID,
            HeaderName: 'آنالیز فهرست بها'
          };
        }
        break;
      }
      case 'archive-details':
        this.type = 'archive-details';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.OverstartLeftPosition = 188;
        this.OverstartTopPosition = 49;
        const archiveParam = {
          EntityID: this.SelectedPriceListPatternID,
          TypeCodeStr: '1-', // فهرست بها
          DocTypeCode: 1,
          ModuleCode: this.ModuleCode
        };
        this.paramObj = archiveParam;
        break;

      case 'Related':
        if (this.selectedRow == null) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.OverstartLeftPosition = 500;
          this.OverstartTopPosition = 250;
        } else {
          this.type = 'related-price-list';
          this.HaveHeader = true;
          this.btnclicked = true;
          this.OverstartLeftPosition = 110;
          this.OverstartTopPosition = 105;
          this.paramObj = {
            RowSelected: this.selectedRow.data,
            ModuleCode: this.ModuleCode,
            HeaderName: 'ردیف های مرتبط'
          };
        }
        break;
      case 'RelatedGoods':
        if (this.selectedRow == null) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ردیفی جهت مشاهده انتخاب نشده است';
          this.btnclicked = true;
          this.OverstartLeftPosition = 500;
          this.OverstartTopPosition = 250;
        } else {
          this.type = 'PriceListPatternGoods';
          this.btnclicked = true;
          this.OverstartLeftPosition = 59;
          this.OverstartTopPosition = 20;
          this.paramObj = {
            PriceListPatternID: this.selectedRow.data.PriceListPatternID,
            PriceListTopicCode: this.selectedPriceListTopicCode,
            TopicCode: this.selectedRow.data.PriceListTopicCode
          };
        }
        break;
      default:
        break;
    }
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  OnCreatePriceListTopic() {
    this.type = 'price-list-topic-dataentry-page';
    this.btnclicked = true;
    this.OverstartLeftPosition = 450;
    this.OverstartTopPosition = 51;
    this.paramObj = {
      Mode: 'InsertMode',
      PriceListTopicQualifier: this.selectedPriceListTopicCode,
      PriceListPatternID: this.SelectedPriceListPatternID,
      PriceListTopicCode: this.SelectedTopicCode,
      selectedRow: null,
      CostListFinYearCode: this.CostListFinYearCode,
      ParentPage: 'price-list'
    };
  }
  OnUpdatePriceListTopic() {
    if (!this.selectedRow || this.selectedRow === null) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت اصلاح انتخاب نشده است');
      return;
    }

    this.UpdatePriceListTopic();
  }
  UpdatePriceListTopic() {
    if (this.selectedRow.data.IsStarCode === '1') {
      this.type = 'price-list-topic-dataentry-page';
      this.btnclicked = true;
      this.OverstartLeftPosition = 450;
      this.OverstartTopPosition = 51;
      this.paramObj = {
        Mode: 'EditMode',
        PriceListTopicQualifier: this.selectedPriceListTopicCode,
        PriceListPatternID: this.SelectedPriceListPatternID,
        PriceListTopicCode: this.SelectedTopicCode,
        selectedRow: this.selectedRow.data,
        ParentPage: 'price-list'
      };
    } else {
      this.ShowMessageBoxWithOkBtn('امکان اصلاح ردیف جاری وجود ندارد');
    }
  }

  OnDeletePriceListTopic() {

    if (!this.selectedRow || this.selectedRow === null) {
      this.ShowMessageBoxWithOkBtn('ردیفی جهت حذف انتخاب نشده است');
      return;
    }

    if (!(this.selectedRow.data.IsStarCode === 1)) {
      this.ShowMessageBoxWithOkBtn('امکان حذف ردیف انتخاب شده وجود ندارد');
      return;
    }

    this.PriceList.DeletePriceListTopic(
      this.selectedRow.data.PriceListTopicID
    ).subscribe(ress => {
      this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
      this.FillGridData(this.SelectedPriceListPatternID, true, (this.IsStar === true ? 1 : 0));
    });
  }
  IsChangedPrcieListTopic(event) {
    if (event) {
      this.FillGridData(this.SelectedPriceListPatternID, true, (this.IsStar === true ? 1 : 0));
    }
  }
  OnCreateChildPriceListTopic() {
    this.btnclicked = true;
    this.type = 'child-price-list-topic-page';
    this.OverstartLeftPosition = 87;
    this.OverstartTopPosition = 49;
    this.paramObj = {
      PriceListTopicQualifier: this.selectedPriceListTopicCode,
      PriceListPatternID: this.SelectedPriceListPatternID,
      PriceListTopicCode: this.SelectedTopicCode,
      PriceListTopicLeveCode: this.SelectedLevelCode
    };
  }
  OnDeleteChildPriceListTopic() {
    this.PriceList.DeleteChildPriceListPattern(
      this.SelectedPriceListPatternID
    ).subscribe(
      res => {
        if (res) {
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
          return;
        }
        if (!res) {
          this.ShowMessageBoxWithOkBtn('امکان حذف ردیف وجود ندارد');
          return;
        }
      },
      err => {
        this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
      }
    );
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  OnSearchPriceListCodeClick() {
    if (this.PricelistTopicSearch !== '') {
      this.PriceList.GetListByPriceListTopicCode(this.PricelistTopicSearch, this.SelectedPriceListPatternID).subscribe(res => {
        this.gridrows = res;
      });
    }
  }
  OnCheckBoxChange(event) {
    this.IsStar = event;
    if (this.IsStar) {
      this.gridcolumns = [
        {
          headerName: 'ردیف',
          field: 'PriceListTopicCode',
          sortable: true,
          filter: true,
          width: 85,
          resizable: true
        },
        {
          headerName: 'نام',
          field: 'PriceListTopicName',
          sortable: true,
          filter: true,
          width: 354,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'WorkUnitName',
          sortable: true,
          filter: true,
          width: 70,
          resizable: true
        },
        {
          headerName: 'کارکرد/پایکار',
          field: 'IsWork',
          sortable: true,
          filter: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'تاریخ قرارداد',
          field: 'PersianContractDate',
          sortable: true,
          filter: true,
          width: 100,
          resizable: true
        },
        {
          headerName: 'مبلغ',
          field: 'EstimateAmount',
          sortable: true,
          filter: true,
          width: 100,
          resizable: true
        },
        {
          headerName: 'نوع ردیف',
          field: 'IsStar',
          width: 70,
          resizable: true
        }
      ];
    } else {
      this.gridcolumns = [
        {
          headerName: 'ردیف',
          field: 'PriceListTopicCode',
          sortable: true,
          filter: true,
          width: 85,
          resizable: true
        },
        {
          headerName: 'نام',
          field: 'PriceListTopicName',
          sortable: true,
          filter: true,
          width: 354,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'WorkUnitName',
          sortable: true,
          filter: true,
          width: 70,
          resizable: true
        },
        {
          headerName: 'مبلغ',
          field: 'Amount',
          sortable: true,
          filter: true,
          HaveThousand: true,
          width: 100,
          resizable: true
        },
        {
          headerName: 'کارکرد/پایکار',
          field: 'IsWork',
          sortable: true,
          filter: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'نوع ردیف',
          field: 'IsStar',
          width: 70,
          resizable: true
        }
      ];
    }
    this.FillGridData(this.SelectedPriceListPatternID, true, (this.IsStar === true ? 1 : 0));
  }

  FillGridData(PriceListPatternID, IsLoading = true, IsStar) {
    this.PriceList.GetPriceList(PriceListPatternID, IsLoading, IsStar).subscribe(res => {
      this.gridrows = res;
    });
  }

  GetChildren(event) {

    return new Promise((resolve, reject) => {
      event.Owner.PriceList.GetPriceListChildren(event.ParentID).subscribe(data => {
        const children = [];
        data.forEach(item => {
          children.push({
            name: item.PriceListTopiCodeName,
            id: item.PriceListPatternID.toString(),
            hasChildren: !item.IsLeaf,
            levelCode: item.PriceListLevelCode,
            TopicCode: item.PriceListTopiCode
          });
        });
        resolve(children);
      });
    });

  }

 GetRoots(event)  {
    let nodes = [];
  return new Promise((resolve, reject) => {
      event.Owner.PriceList.GetPriceListRoots(event.FirstID, event.SecondID).subscribe(res => {
       nodes = [];
        res.forEach(item => {
          nodes.push({
            name: item.PriceListTopiCodeName,
            id: item.PriceListPatternID,
            hasChildren: !item.IsLeaf,
            levelCode: item.PriceListLevelCode,
            TopicCode: item.PriceListTopiCode
          });
        });
       resolve(nodes);
      });


     // return nodes;
   });
  }
}
