import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { isUndefined } from 'util';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { ContractOrderService } from 'src/app/Services/ContractService/ContractOrderServices/ContractOrderService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contract-person-estimate',
  templateUrl: './contract-person-estimate.component.html',
  styleUrls: ['./contract-person-estimate.component.css']
})
export class ContractPersonEstimateComponent implements OnInit {
  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() ContractPersonEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  WorkFlowID;
  btnConfirmName;
  btnConfirmIcon;
  HaveSave = false;
  HaveDelete = false;
  HaveConfirm = false;
  ReadyToConfirm;
  IsEndFlow;
  ObjectNo;
  ObjectID;
  WorkflowTypeName;
  WorkflowTypeCode;
  WorkflowObjectCode;
  ConfirmCode = -1;
  CancelCode = -1;
  FinalConfirmCode;
  FinalCancelCode;
  ModuleCode;
  FinYearCode;
  ContractCode;
  ContractorName;
  LetterNo;
  ContractAmount;
  Subject;
  RegionCode: any;
  selectedContractID: any;
  SelectedContractOrderID: any;
  btnclicked: boolean;


  ContractOrderItemList = [];
  columnDef_Order: any;
  columnDef_Person: any;

  gridApi_Order: any;
  gridApi_Person: any;

  rowData_Order: any;
  rowData_Person: any;

  selectedContractOrderItemID: any;
  IsDisable: boolean;
  beforeID: any;

  outerGridHeight = 87;
  mainBodyHeight = 87;
  gridHeight_Order = 92;
  gridHeight_Person = 92;
  SelectedRowIndex_Order: number;
  OverstartLeftPosition;
  OverstartTopPosition;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  OverPopUpParams = {}; // For All Params
  startLeftPosition: number;
  startTopPosition: number;
  BtnClickedName: string;
  paramObj;
  ChangeDetection: boolean;
  ActorControl: boolean;
  OrderNo: any;
  PersianOrderDate: any;
  Note: any;
  HeightPercentWithMaxBtn: number;
  FromContractDate: any;
  NgSelectSearchTerm = '';
  DisabledComponents = false;

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
    DropDownMinWidth: '300px',
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
  People: any;
  ModuleViewTypeCode: any;
  IsEditable = true;
  CoefParam;
  CoefLevelCode;
  HaveMaxBtn = false;
  OverPixelWidth: number;
  MinHeightPixel: number;
  CartableUserID: any;
  CurrWorkFlow: any;


  constructor(private ContractList: ContractListService,
    private Actor: ActorService,
    private User: UserSettingsService,
    private ContractOrder: ContractOrderService,
    private RefreshPersonItems: RefreshServices,
    private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private FlowService: WorkflowService) {

    this.columnDef_Order = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد فعالیت',
        field: 'ProductCode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'نام فعالیت',
        field: 'ProductName',
        width: 250,
        resizable: true
      },
      {
        headerName: 'تاریخ شروع',
        field: 'PersianStartDate',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ پایان',
        field: 'PersianEndDate',
        width: 100,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'Amount',
        width: 150,
        HaveThousand: true,
        resizable: true
      }
    ];

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
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        width: 300,
        resizable: true
      },
      {
        headerName: 'سال تحصیل',
        field: 'EducationYear',
        width: 250,
        editable: () => {
          return this.IsEditable; // true/false based on params (or some other criteria) value
        },
        resizable: true
      },
      {
        headerName: 'سال تجربه',
        field: 'ExperienceYear',
        width: 100,
        editable: () => {
          return this.IsEditable;
        },
        resizable: true
      },
      {
        headerName: 'ضریب سرپرستی',
        field: 'ManagementCOEF',
        width: 100,
        editable: () => {
          return this.IsEditable;
        },
        resizable: true
      },
      {
        headerName: 'فارغ التحصيل ممتاز',
        field: 'TopGraduated',
        width: 150,
        editable: () => {
          return this.IsEditable;
        },
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

  }

  ngOnInit() {
    this.CurrWorkFlow = this.PopupParam.CurrWorkFlow;
    this.WorkFlowID = this.PopupParam.WorkFlowID;
    this.ReadyToConfirm = this.PopupParam.ReadyToConfirm;
    this.ModuleCode = this.PopupParam.ModuleCode;
    if (this.PopupParam.selectedRow.data.ContractOrderId) {
      this.SelectedContractOrderID = this.PopupParam.selectedRow.data.ContractOrderId;
    } else if (this.PopupParam.selectedRow.data.LastContractOrderID) {
      this.SelectedContractOrderID = this.PopupParam.selectedRow.data.LastContractOrderID;
    }
    if (this.PopupParam.selectedRow.data.WorkflowTypeName) {
      this.IsEndFlow = this.PopupParam.selectedRow.data.IsEnd === 1;
      this.WorkflowTypeName = this.PopupParam.selectedRow.data.WorkflowTypeName;
      this.WorkflowTypeCode = this.PopupParam.selectedRow.data.WorkflowTypeCode;
      this.WorkflowObjectCode = this.PopupParam.selectedRow.data.WorkflowObjectCode;
      this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
      this.ObjectNo = this.PopupParam.selectedRow.data.ObjectNo;
      this.ObjectID = this.PopupParam.selectedRow.data.ObjectID;
      this.CartableUserID = this.PopupParam.selectedRow.data.CartableUserID;
    }
    if (!this.PopupParam.selectedRow.data.ContractCode) {
      this.ContractList.GetContract(null, this.SelectedContractOrderID).subscribe(
        res => {
          this.RegionCode = res[0].RegionCode;
          this.FinYearCode = res[0].FinYearCode;
          this.ContractCode = res[0].ContractCode;
          this.ContractorName = res[0].ContractorName;
          this.LetterNo = res[0].LetterNo;
          this.ContractAmount = res[0].ContractAmount;
          this.Subject = res[0].Subject;
          this.CoefLevelCode = res[0].CoefLevelCode;
          this.selectedContractID = res[0].ContractId;
          this.FromContractDate = res[0].FromContractDate;
          if (!this.WorkFlowID) {
            this.FlowService.GetStartModuleViewTypeCode(this.RegionCode, this.ModuleCode, null, null).subscribe((rees: any) => {
              this.ModuleViewTypeCode = rees.ModuleViewTypeCode;
              this.WorkflowObjectCode = rees.WorkflowObjectCode;
              this.ViewTypeChange();
            });
          }
        }
      );
    } else {
      this.RegionCode = this.PopupParam.selectedRow.data.RegionCode;
      this.FinYearCode = this.PopupParam.selectedRow.data.FinYearCode;
      this.ContractCode = this.PopupParam.selectedRow.data.ContractCode;
      this.ContractorName = this.PopupParam.selectedRow.data.ContractorName;
      this.LetterNo = this.PopupParam.selectedRow.data.LetterNo;
      this.ContractAmount = this.PopupParam.selectedRow.data.ContractAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.Subject = this.PopupParam.selectedRow.data.Subject;
      this.selectedContractID = this.PopupParam.selectedRow.data.ContractId;
      this.FromContractDate = this.PopupParam.selectedRow.data.FromContractDate;
      this.CoefLevelCode = this.PopupParam.selectedRow.data.CoefLevelCode;
      if (!this.WorkFlowID) {
        this.FlowService.GetStartModuleViewTypeCode(this.RegionCode, this.ModuleCode, null, null).subscribe((rees: any) => {
          this.ModuleViewTypeCode = rees.ModuleViewTypeCode;
          this.WorkflowObjectCode = rees.WorkflowObjectCode;
          this.ViewTypeChange();
        });
      }
    }
    if (this.PopupParam && this.PopupParam.ModuleViewTypeCode === 2 &&  this.PopupParam.PrivateType === 'Cartable') {
      this.DisabledComponents = true;
      this.IsEditable = false;
    }
    this.ContractList.GetContractOrderItemList(this.SelectedContractOrderID)
      .subscribe(res => {
        this.rowData_Order = res;
        this.SelectedRowIndex_Order = 0;

        if (res != null && res.length > 0) {
          this.Note = res[0].Note;
          this.OrderNo = res[0].OrderNo;
          this.SelectedContractOrderID = res[0].ContractOrderID;
          this.PersianOrderDate = res[0].PersianOrderDate;
        }

        res.forEach((item) => {
          const obj = {
            ContractOrderItemID: item.ContractOrderItemID,
            ContractPersonEstimateList: item.ContractPersonEstimateList,
          };
          this.ContractOrderItemList.push(obj);
        });
      });
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          case 21:
            this.ConfirmCode = 21;
            if (!this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
              this.HaveConfirm = true;
            }
            break;
          case 22:
            this.CancelCode = 22;
            if (!this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
              this.btnConfirmName = 'عدم تایید';
              this.btnConfirmIcon = 'cancel';
              this.HaveConfirm = true;
            }
            break;
          case 28:
            this.FinalCancelCode = 28;
            if (this.IsEndFlow && this.ReadyToConfirm !== null && this.ReadyToConfirm === 1) {
              this.btnConfirmName = 'بازگشت از تایید نهایی';
              this.btnConfirmIcon = 'cancel';
              this.HaveConfirm = true;
            }
            break;
          case 27:
            this.FinalConfirmCode = 27;
            if (this.IsEndFlow && (this.ReadyToConfirm === null || this.ReadyToConfirm === 0)) {
              this.btnConfirmName = 'تایید نهایی';
              this.btnConfirmIcon = 'ok';
              this.HaveConfirm = true;
            }
            break;
          case 6:
            this.HaveDelete = true;
            break;
          default:
            break;
        }
      });
    });
  }

  close() {
    this.btnclicked = false;
    this.ContractPersonEstimateClosed.emit(true);
  }

  GridReady_Order(params: { api: any; }) {
    this.gridApi_Order = params.api;
  }

  GridReady_Person(params: { api: any; }) {
    this.gridApi_Person = params.api;
  }

  RowClick_Order(InputValue) {

    this.OrderNo = InputValue.data.OrderNo;
    this.PersianOrderDate = InputValue.data.PersianOrderDate;
    this.Note = InputValue.data.Note;

    const rowData = [];
    this.gridApi_Person.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.gridApi_Person.updateRowData({ remove: rowData });
    this.selectedContractOrderItemID = InputValue.data.ContractOrderItemID;
    this.IsDisable = false;

    if (!this.beforeID) {
      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === InputValue.data.ContractOrderItemID) {
          this.rowData_Person = item.ContractPersonEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID !== InputValue.data.ContractOrderItemID) {
      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === this.beforeID) {
          item.ContractPersonEstimateList = rowData;
        }
        if (item.ContractOrderItemID === InputValue.data.ContractOrderItemID) {
          this.rowData_Person = item.ContractPersonEstimateList;
        }
      });
    }

    if (this.beforeID && this.beforeID === InputValue.data.ContractOrderItemID) {
      this.ContractOrderItemList.forEach((item) => {
        if (item.ContractOrderItemID === this.beforeID) {
          this.gridApi_Person.updateRowData({ add: rowData });
        }
      });
    }
    this.beforeID = InputValue.data.ContractOrderItemID;
  }


  RowClick_Person(InputValue) {
  }


  onSave() {
    this.gridApi_Person.stopEditing();
    this.gridApi_Order.stopEditing();

    const rowData = [];
    const InvalidRowData = [];
    const ContractPersonEstimateList = [];
    const ContractOrderItemIDList = [];

    this.gridApi_Person.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.ContractOrderItemList.forEach((item) => {
      if (item.ContractOrderItemID === this.selectedContractOrderItemID) {
        item.ContractPersonEstimateList = rowData;
      }
    });

    this.ContractOrderItemList.forEach((item) => {

      const obj = {
        ContractOrderItemID: item.ContractOrderItemID
      };
      ContractOrderItemIDList.push(obj);
      let ItemNo = 0;

      item.ContractPersonEstimateList.forEach((Estimate) => {
        ItemNo++;
        if (Estimate.ContractPersonEstimateID) {
          const obj1 = {
            ContractPersonEstimateID: Estimate.ContractPersonEstimateID,
            ContractOrderItemID: this.selectedContractOrderItemID,
            ItemNo: ItemNo,
            PersonID: Estimate.PersonID,
            EducationYear: Estimate.EducationYear,
            ExperienceYear: Estimate.ExperienceYear,
            ManagementCOEF: Estimate.ManagementCOEF,
            TopGraduated: Estimate.TopGraduated,
            Sm: 0

          };
          ContractPersonEstimateList.push(obj1);
        } else {
          const obj1 = {
            ContractPersonEstimateID: -1,
            ContractOrderItemID: this.selectedContractOrderItemID,
            ItemNo: ItemNo,
            PersonID: Estimate.PersonName.ActorId,
            EducationYear: Estimate.EducationYear,
            ExperienceYear: Estimate.ExperienceYear,
            ManagementCOEF: Estimate.ManagementCOEF,
            TopGraduated: Estimate.TopGraduated,
            Sm: 0
          };
          ContractPersonEstimateList.push(obj1);
        }
      });
    }
    );
    this.ContractOrder.SaveContractPersonEstimate(ContractOrderItemIDList, ContractPersonEstimateList)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ChangeDetection = false;
        this.ContractList.GetContractOrderItemList(this.SelectedContractOrderID)
          .subscribe(res_refresh => {
            this.rowData_Order = res_refresh;
          });
      },
        err => {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      );
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.outerGridHeight = changes.PopupMaximized.currentValue ? 90 : 88;
      this.gridHeight_Person = changes.PopupMaximized.currentValue ? 92 : 92;
      this.mainBodyHeight = changes.PopupMaximized.currentValue ? 87.6 : 87;
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
  showVehicle() {
    this.btnclicked = true;
    this.type = 'vehicle';
    this.HaveHeader = true;
    this.startLeftPosition = 50;
    this.startTopPosition = 30;
    this.HeightPercentWithMaxBtn = 98;
    this.paramObj = {
      HeaderName: 'خودرو',
      ContractOrderItemID: this.selectedContractOrderItemID,
      OrderNo: this.OrderNo,
      PersianOrderDate: this.PersianOrderDate,
      Note: this.Note,
      FinYearCode: this.FinYearCode,
      ContractCode: this.ContractCode,
      ContractorName: this.ContractorName,
      LetterNo: this.LetterNo,
      ContractAmount: this.ContractAmount,
      Subject: this.Subject
    };
  }

  popupclosed() {
    this.btnclicked = false;
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

  // -------------------------------------------
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
  DOConfirm() {
    this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
      this.SelectedContractOrderID,
      this.RegionCode,
      this.ModuleCode,
      1,
      this.WorkflowObjectCode,
      null,null,
      this.CartableUserID,
      this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('تایید برآورد اولیه با موفقیت انجام شد');
        this.RefreshCartable.RefreshCartable();
        if (this.CancelCode === 22) {
          this.ReadyToConfirm = 1;
          this.btnConfirmName = 'عدم تایید';
          this.btnConfirmIcon = 'cancel';
        } else {
          this.HaveConfirm = false;
        }
      },
        err => {
          const str = err.error.split('|');
          if (str[1]) {
            this.ShowMessageBoxWithOkBtn(str[1]);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        }
      );
  }
  onConfirm() {
    this.BtnClickedName = 'BtnConfirm';
    if (!this.IsEndFlow) {
      if (this.ReadyToConfirm === null || this.ReadyToConfirm === 0) {
        if (this.ChangeDetection) {
          this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات تایید کنید ؟');
        } else {
          this.DOConfirm();
        }
      } else {
        this.Cartable.UserUpdateWorkFlow(this.WorkFlowID,
          this.SelectedContractOrderID,
          this.RegionCode,
          this.ModuleCode,
          0,
          this.WorkflowObjectCode,
          null,null,
          this.CartableUserID,
          this.CurrWorkFlow ? this.CurrWorkFlow.JoinWorkflowLogID : null).subscribe(res => {
            this.ShowMessageBoxWithOkBtn('عدم تایید برآورد اولیه با موفقیت انجام شد');
            if (this.ConfirmCode === 21) {
              this.ReadyToConfirm = 0;
              this.btnConfirmName = 'تایید';
              this.btnConfirmIcon = 'ok';
            } else {
              this.HaveConfirm = false;
            }
          },
            err => {
              const str = err.error.split('|');
              if (str[1]) {
                this.ShowMessageBoxWithOkBtn(str[1]);
              } else {
                this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
              }
            }
          );
      }
    } else {
      this.DOFinalConfirm();
    }
  }
  DOFinalConfirm() {
    this.Cartable.UserFinalConfirmWorkFlow(
      this.CurrWorkFlow,
      this.WorkFlowID,
      10,
      '',
      this.ObjectNo,
      this.WorkflowTypeName,
      this.ObjectID,
      this.WorkflowTypeCode,
      this.ReadyToConfirm === null || this.ReadyToConfirm === 0,
      this.WorkflowObjectCode,
      null,
      this.CartableUserID
    )
      .subscribe(res2 => {
        if (this.FinalConfirmCode || this.FinalCancelCode) {
          if (this.ReadyToConfirm && this.ReadyToConfirm === 1) {
            this.ShowMessageBoxWithOkBtn('بازگشت از تایید نهایی برآورد اولیه با موفقیت انجام شد');
            this.ReadyToConfirm = 0;
            this.btnConfirmName = 'تایید نهایی';
            this.btnConfirmIcon = 'ok';
          } else {
            this.ShowMessageBoxWithOkBtn('تایید نهایی برآورد اولیه با موفقیت انجام شد');
            this.ReadyToConfirm = 1;
            this.btnConfirmName = 'بازگشت از تایید نهایی';
            this.btnConfirmIcon = 'cancel';
          }
        } else {
          this.HaveConfirm = false;
        }
      },
        err => {
          const str = err.error.split('|');
          if (str[1]) {
            this.ShowMessageBoxWithOkBtn(str[1]);
          } else {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
          }
        });
  }

  ViewTypeChange() {
    switch (Number(this.ModuleViewTypeCode)) {
      case 1:
        this.IsEditable = true;
        break;
      case 2:
        this.IsEditable = false;
        break;
      default:
        this.IsEditable = true;
        break;
    }
  }

  onCoefClick() {
    this.paramObj = {
      HeaderName: 'ضرایب قرارداد',
      ContractID: this.selectedContractID,
      CoefLevelCode: this.CoefLevelCode,
      ContractCode: this.ContractCode,
      ContractorName: this.ContractorName,
      Subject: this.Subject,
    };
    this.btnclicked = true;
    this.type = 'contract-coef';
    this.OverstartLeftPosition = 74;
    this.OverstartTopPosition = 19;
  }
  ShowContractCase() {
    this.type = 'contract-case';
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverPixelWidth = 1290;
    this.startLeftPosition = 50;
    this.startTopPosition = 4;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 690;
    this.paramObj = {
      HeaderName: this.PopupParam.HeaderName,
      ModuleCode: this.PopupParam.ModuleCode,
      selectedRow: this.PopupParam.selectedRow,
      GridHeightInTab: 100,
      PanelHeightInTab: 99,
      HaveSave: false,
      IsViewable: true,
      IsEditable: false,
      ModuleViewTypeCode : 5555,
      SelectedContractID: this.PopupParam.selectedRow.data.ContractId,
      ProductRequestID: this.PopupParam.selectedRow.data.ProductRequestID,
     };
     this.btnclicked = true;
  }
}
