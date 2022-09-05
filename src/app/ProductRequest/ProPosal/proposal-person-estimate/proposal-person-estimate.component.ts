import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
declare var $: any;
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-proposal-person-estimate',
  templateUrl: './proposal-person-estimate.component.html',
  styleUrls: ['./proposal-person-estimate.component.css']
})
export class ProposalPersonEstimateComponent implements OnInit {
  @Input() PopupParam;
  // @Input() PopupMaximized;
  gridHeight;
  OverPopUpPixelHeight;
  mainBodyHeight = 87;
  ChangeDetection = false;
  private gridApi;
  private COIgridApi;
  columnDef1;
  defaultColDef1;
  rowData1: any;
  columnDef_Person: any;
  rowData2: any;
  btnclicked = false;

  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverPopUpParams = {}; // For All Params
  CostListFinYearCode;
  ContractPriceListPatternID;
  PriceListTypeCode;
  IsDisable = true;
  beforeID;

  SumFinalEstimateAmount = '0';
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
  Note;
  gridApi_Person: any;
  gridHeight_Person = 92;
  selectedContractOrderItemID: any;
  ProposalID: any;
  NgSelectVSParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'PersonName', width: 53, MinTermLenght: 3, SearchOption: 'PersonName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  SelectedProductID: any;
  ContractTypeCode: any;
  HaveToGrid: boolean;
  MaxWidth = 1000;
  Width = 350;
  ReadOnly: any;
  constructor(private router: Router,
    private PriceList: PriceListService,
    private ProductRequest: ProductRequestService,
    private Actor: ActorService,
    private User: UserSettingsService,
    private RefreshPersonItems: RefreshServices,
    private RefreshCartable: RefreshServices
  ) {
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.ReadOnly = this.PopupParam.ReadOnly;
    this.ActorName = this.PopupParam.Proposal.ActorName;
    this.ProposalDate = this.PopupParam.Proposal.PersianProposalDate;
    this.LetterNo = this.PopupParam.Proposal.LetterNo;
    this.LetterDate = this.PopupParam.Proposal.PersianLetterDate;
    this.ExpireDate = this.PopupParam.Proposal.PersianExpireDate;
    this.Note = this.PopupParam.Proposal.Note;
    this.ProposalID = this.PopupParam.Proposal.ProposalID;
    this.ContractTypeCode = this.PopupParam.ContractTypeCode;
    this.ColumnDefinition();
    forkJoin([
      this.ProductRequest.GetPropsal(this.ProposalID),
      this.ProductRequest.GetPRBalanceFactors(this.PopupParam.ProductRequestObject.CostFactorID)

    ]).subscribe(res => {
      if (res[0] && res[0].ProposalItemList && res[0].ProposalItemList.length > 0) {
        res[0].ProposalItemList.forEach(item => {
          item.ProposalPersonEstimateList = item.ProposalPersonEstimateList;
        });
        this.rowData1 = res[0].ProposalItemList;
      } else {
        this.rowData1 = this.PopupParam.ProductRequestObject.ProductRequestItemList;
        this.PopupParam.ProductRequestObject.ProductRequestItemList.forEach(item => {
          item.Qty = item.QTY;
          item.Price = item.Amount;
          item.ProposalPersonEstimateList = [];
        });
      }
    }
    );
    this.rowData2 = [];

  }

  ColumnDefinition() {
    if (this.ContractTypeCode === 26 || this.ContractTypeCode === 29) {
      this.HaveToGrid = true;
      this.MaxWidth = 1000;
      this.Width = 350;
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
          headerName: 'تعداد',
          field: 'Qty',
          editable: true,
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد',
          field: 'Price',
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
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
          editable: true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianStartDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPx: 100,
            AppendTo: '.ag-theme-balham'
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
          width: 130,
          resizable: true,
          editable: true,
          cellEditorFramework: JalaliDatepickerComponent,
          cellEditorParams: {
            CurrShamsiDateValue: 'PersianEndDate',
            DateFormat: 'YYYY/MM/DD',
            WidthPx: 100,
            AppendTo: '.ag-theme-balham'
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
      ];
    }

    if (this.ContractTypeCode === 27 || this.ContractTypeCode === 28) {
      this.HaveToGrid = false;
      this.MaxWidth = 1117;
      this.Width = 1117;
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
          headerName: 'تعداد',
          field: 'Qty',
          editable: true,
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد',
          field: 'Price',
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
          headerName: 'درصد پیشرفت',
          field: 'ProgressPercent',
          width: 150,
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

      ];
    }

    this.columnDef_Person = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'PersonName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMorePerson,
          FetchByTerm: this.FetchPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'سال تحصیل',
        field: 'EducationYear',
        width: 250,
        editable: true,
        resizable: true
      },
      {
        headerName: 'سال تجربه',
        field: 'ExperienceYear',
        width: 100,
        editable: true,
        resizable: true
      },
      {
        headerName: 'ضریب سرپرستی',
        field: 'ManagementCoef',
        width: 100,
        editable: true,
        resizable: true
      },
      {
        headerName: 'فارغ التحصيل ممتاز',
        field: 'TopGraduated',
        width: 150,
        editable: true,
        resizable: true
      },
      {
        headerName: 'حاصلضرب ضرایب',
        field: 'CoefficientsProduct',
        width: 150,
        editable: false,
        resizable: true
      },
      {
        headerName: 'حق الزحمه ساعتی',
        field: 'Sm',
        width: 150,
        HaveThousand: true,
        editable: false,
        resizable: true
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

  onItemGridReady(params: { api: any; }) {
    this.COIgridApi = params.api;
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

    if (!this.beforeID) {
      this.rowData2 = InputValue.data.ProposalPersonEstimateList;
    }

    if (this.beforeID && this.beforeID !== InputValue.data.ProductID) {
      this.COIgridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeID) {
          item.data.ProposalPersonEstimateList = rowData;
        }
        if (item.data.ProductID === InputValue.data.ProductID) {
          this.rowData2 = item.data.ProposalPersonEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID === InputValue.data.ProductID) {
      this.COIgridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeID) {
          this.gridApi.updateRowData({ add: rowData });
        }
      });
    }

    this.beforeID = InputValue.data.ProductID;
  }

  onSave() {
    this.COIgridApi.stopEditing();

    const rowData = [];

    if (this.HaveToGrid) {
      this.gridApi.stopEditing();
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });

      this.COIgridApi.forEachNode((item) => {
        if (item.data.ProductID === this.beforeID) {
          item.data.ProposalPersonEstimateList = rowData;
        }
      });
    }

    let AItemNo = 0;
    const ProposalItemList = [];
    this.COIgridApi.forEachNode((item) => {
      let ItemNo = 0;
      const ProposalPersonEstimateList = [];

      item.data.ProposalPersonEstimateList.forEach((node) => {

        const PersonObj = {
          ProposalPersonEstimateID: node.ProposalPersonEstimateID ? node.ProposalPersonEstimateID : -1,
          ProposalItemID: -1,
          ItemNo: ++ItemNo,
          // tslint:disable-next-line:max-line-length
          PersonID: node.PersonName && node.PersonName.ActorId ? node.PersonName.ActorId : (node.PersonID ? node.PersonID : -1),
          EducationYear: node.EducationYear,
          ExperienceYear: node.ExperienceYear,
          ManagementCoef: node.ManagementCoef,
          TopGraduated: node.TopGraduated,
        };
        ProposalPersonEstimateList.push(PersonObj);
      });

      const ProposalItem = {
        ProposalItemID: item.data.ProposalItemID ? item.data.ProposalItemID : -1,
        ItemNo: ++AItemNo,
        ProposalID: this.ProposalID,
        ProductID: item.data.ProductID,
        Qty: item.data.Qty,
        Price: item.data.Price,
        DisCount: 0,
        ProgressPercent: item.data.ProgressPercent,
        ProposalPersonEstimateDataList: ProposalPersonEstimateList,
        StartDate: item.data.PersianStartDate && item.data.PersianStartDate.MDate ? item.data.PersianStartDate.MDate
          : (item.data.ShortStartDate ? item.data.ShortStartDate : null),
        EndDate: item.data.PersianEndDate && item.data.PersianEndDate.MDate ? item.data.PersianEndDate.MDate
          : (item.data.ShortEndDate ? item.data.ShortEndDate : null),
      };
      ProposalItemList.push(ProposalItem);
    });

    this.ProductRequest.SavePropsalPersonEstimate(this.ProposalID, ProposalItemList).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
      });
  }

  MessageBoxAction(ActionResult) {
    this.btnclicked = false;
    this.type = '';
    this.BtnClickedName = '';
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 157;
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

  getOutPutParam(event) {
  }

  FetchMorePerson(event) {
    event.Owner.columnDef_Person[1].cellEditorParams.Params.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
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
      // event.Owner.columnDef_Person[1].cellEditorParams.Items  = ResultList;
    });
  }

  FetchPersonByTerm(event) {
    event.Owner.columnDef_Person[1].cellEditorParams.Params.loading = true;
    event.Owner.Actor.GetPersonPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption).subscribe(res => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        term: event.term,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30)
      });
    });
  }

  GridReady_Person(params: { api: any; }) {
    this.gridApi = params.api;
  }

  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'PersonName') {
      this.Actor.GetPersonPaging(1, 30, '', null).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
      });
    }
  }

  RowClick_Person(row) {
  }

}
