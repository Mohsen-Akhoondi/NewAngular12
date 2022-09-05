import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { of } from 'rxjs';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ContractPayService } from 'src/app/Services/ContractService/ContractPayServices/ContractPayService';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { isUndefined } from 'util';

@Component({
  selector: 'app-product-request-list',
  templateUrl: './product-request-list.component.html',
  styleUrls: ['./product-request-list.component.css']
})
export class ProductRequestListComponent implements OnInit {
  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApi;
  private gridColumnApi;
  columnDef;
  IsAdmin: boolean;
  SelectedRegionObject;
  AdmincolumnDef;
  SelectedColumnDef;
  private defaultColDef;
  private rowSelection;
  rowData: any;
  selectedRegion = 205;
  RegionListSet = [];
  btnclicked = false;
  DisableDelete = false;
  type: string;
  selectedRow: any;
  paramObj;
  HaveHeader: boolean;
  IsNotWorkFlow = true;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 84;
  private sub: any;
  HasRegion = true;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName: string;
  WorkflowObjectCode;
  NgSelectMVTParams = {
    bindLabelProp: 'ModuleViewTypeCodeName',
    bindValueProp: 'ModuleViewTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'module-view-type'
  };
  NoIsIncomplete = true;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  constructor(private router: Router,
    private RegionList: RegionListService,
    config: NgSelectConfig,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private ContPayService: ContractPayService,
    private Workflow: WorkflowService,
    private RefreshModuleViewTypeItems: RefreshServices,
    private UserSettings: UserSettingsService,
    private ContractService: ContractListService,
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });


    if (this.ModuleCode === 3094) {
      this.AdmincolumnDef = [

        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        // {
        //   headerName: 'محل هزینه ',
        //   field: 'UnitTopicName',
        //   width: 90,
        //   resizable: true,
        //   sortable: true,
        // },
        {
          headerName: 'شماره',
          field: 'ProductRequestNo',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'تاریخ',
          field: 'PersianProductRequestDates',
          width: 120,
          resizable: true
        },
        {
          headerName: 'درخواست کننده',
          field: 'PersonName',
          width: 150,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 350,
          resizable: true
        },
      ];
    }
    else {

      this.AdmincolumnDef = [
        {
          headerName: ' اطلاعات درخواست',
          children: [
            {
              headerName: 'ردیف ',
              field: 'ItemNo',
              width: 80,
              resizable: true
            },
            {
              headerName: 'شماره',
              field: 'ProductRequestNo',
              width: 100,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'تاریخ',
              field: 'PersianProductRequestDates',
              width: 120,
              resizable: true
            },
            {
              headerName: 'درخواست کننده',
              field: 'PersonName',
              width: 150,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'موضوع',
              field: 'Subject',
              width: 350,
              resizable: true
            },
          ]
        },
        {
          headerName: 'اطلاعات قرارداد پیشنهادی',
          children: [
            {
              headerName: 'سال مالی',
              field: 'FinYearCode',
              width: 100,
              resizable: true
            },
            {
              headerName: 'کد',
              field: 'ContractCodes',
              width: 100,
              resizable: true
            },
            {
              headerName: 'پیمانکار',
              field: 'ContractorName',
              width: 210,
              resizable: true
            }
          ]
        },
        {
          headerName: 'نوع نمایش فعالیت',
          field: 'ModuleViewTypeCodeName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectMVTParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ModuleViewTypeCodeName;
            } else {
              return '';
            }
          },
          editable: true,
          width: 170,
          resizable: true
        },
      ];
    }
    if (this.ModuleCode === 3094) {
      this.columnDef = [

        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        // {
        //   headerName: 'محل هزینه ',
        //   field: 'UnitTopicName',
        //   width: 90,
        //   resizable: true,
        //   sortable: true,
        // },
        {
          headerName: 'شماره',
          field: 'ProductRequestNo',
          width: 100,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'تاریخ',
          field: 'PersianProductRequestDates',
          width: 120,
          resizable: true
        },
        {
          headerName: 'درخواست کننده',
          field: 'PersonName',
          width: 150,
          resizable: true,
          sortable: true,
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 350,
          resizable: true
        },
      ];
    }
    else {
      this.columnDef = [
        {
          headerName: 'اطلاعات درخواست',
          children: [
            {
              headerName: 'ردیف ',
              field: 'ItemNo',
              width: 80,
              resizable: true
            },
            // {
            //   headerName: 'محل هزینه ',
            //   field: 'UnitTopicName',
            //   width: 90,
            //   resizable: true,
            //   sortable: true,
            // },
            {
              headerName: 'شماره',
              field: 'ProductRequestNo',
              width: 100,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'تاریخ',
              field: 'PersianProductRequestDates',
              width: 120,
              resizable: true
            },
            {
              headerName: 'درخواست کننده',
              field: 'PersonName',
              width: 150,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'موضوع',
              field: 'Subject',
              width: 350,
              resizable: true
            },
          ]
        },
        {
          headerName: 'اطلاعات قرارداد پیشنهادی',
          children: [
            {
              headerName: 'سال مالی',
              field: 'FinYearCode',
              width: 100,
              resizable: true
            },
            {
              headerName: 'کد',
              field: 'ContractCodes',
              width: 100,
              resizable: true
            }
            ,
            {
              headerName: 'پیمانکار',
              field: 'ContractorName',
              width: 210,
              resizable: true
            }
          ]
        },

      ];
    }


    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  popupclosed() {
    if (this.type === 'completion-contract-info' || this.type === 'product-request-page'
      || this.type === 'researcher-product-request-list' || this.type === 'pure-product-request-page'
      || this.type === 'product-request-invest-archive') {
      this.rowData = this.ProductRequest.GetProductRequestList(this.RegionParams.selectedObject, this.ModuleCode);
    }
    this.HaveMaxBtn = false;
    this.btnclicked = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
    this.type = '';
    this.HeightPercentWithMaxBtn = 95;
  }

  onChangeRegionObj(newObj) {
    this.RegionParams.selectedObject = newObj;
    this.getProductRequestListData(this.RegionParams.selectedObject);
    this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
    this.selectedRow = null;
  }

  ngOnInit() {
    if (this.ModuleCode === 2939 || this.ModuleCode === 2944
      || this.ModuleCode === 2951 || this.ModuleCode === 2952
      || this.ModuleCode === 3090) {
      this.NoIsIncomplete = false;
    }
    // tslint:disable-next-line: no-shadowed-variable
    new Promise((resolve, reject) => {
      this.UserSettings.CheckAdmin().subscribe(res => {
        resolve(res);
      });
    }).then((admin: boolean) => {
      this.IsAdmin = admin;
      if (this.IsAdmin) {
        this.SelectedColumnDef = this.AdmincolumnDef;
      } else {
        this.SelectedColumnDef = this.columnDef;
      }
      this.getNewData();
    });
  }

  getNewData(): void {
    this.RegionList.GetSpecialRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionListSet = res;
        this.RegionParams.selectedObject = res[0].RegionCode;
        this.getProductRequestListData(this.RegionParams.selectedObject);
        this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
      }
    });
  }

  getProductRequestListData(region): void {
    this.rowData = of([]);
    this.rowData = this.ProductRequest.GetProductRequestList(region, this.ModuleCode);
  }
  onCellValueChanged(event) {
    if (event.colDef && event.colDef.field === 'ModuleViewTypeCodeName') {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.ModuleViewTypeCodeName = event.newValue;
          node.data.ModuleViewTypeCode = (event.newValue && event.newValue.ModuleViewTypeCode) ?
            event.newValue.ModuleViewTypeCode : null;
          node.data.ModuleViewTypeName = event.newValue.ModuleViewTypeName;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }
  oncellEditingStarted(event) {
    this.ModuleCode = this.ModuleCode === 2895 || this.ModuleCode === 2910 ? 2730 : this.ModuleCode;
    if (event.colDef && event.colDef.field === 'ModuleViewTypeCodeName') {
      this.SelectedColumnDef[2].cellEditorParams.Params.loading = false;
      this.Workflow.GetModuleViewTypeList4Transition(this.ModuleCode, false).subscribe(res => {
        this.RefreshModuleViewTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'module-view-type'
        });
      });
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
    if (this.ModuleCode !== 2939 && this.ModuleCode !== 3090) {
      switch (this.ModuleCode) {
        case 2730:
          this.WorkflowObjectCode = 3;
          break;
        case 2773:
          this.WorkflowObjectCode = 5;
          break;
        case 2862:
          this.WorkflowObjectCode = 10;
          break;
        case 2951: // تکمیل اطلاعات قرارداد ملکی
        case 2952:
          this.WorkflowObjectCode = 6;
          break;
        case 2895: // قرارداد مشارکتي
          this.WorkflowObjectCode = 9;
          break;
        case 3094:
          this.WorkflowObjectCode = 30;
        case 3095:
          this.WorkflowObjectCode = 31;
          break;
        default:
          break;
      }
      // tslint:disable-next-line:max-line-length
      this.ContPayService.HaveWorkFlowInstanceForProductRequest(this.selectedRow.data.CostFactorID, this.WorkflowObjectCode).subscribe(res => {
        this.IsNotWorkFlow = !res;
        if (this.IsNotWorkFlow) {
          this.DisableDelete = this.SelectedRegionObject.IsReadOnly ? false : true;
        } else {
          this.DisableDelete = false;
        }
      });
    } else {
      this.DisableDelete = false;
    }
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  Btnclick(BtnName) {
    this.gridApi.stopEditing();
    if (BtnName === 'insert') {

      if (this.ModuleCode === 3094) {
        this.type = 'product-request-invest-archive';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.PercentWidth = 85;
        // this.MainMaxwidthPixel = 1200;
        this.MinHeightPixel = 626;
        this.startLeftPosition = 115;
        this.startTopPosition = 11;
        this.paramObj = {
          CostFactorID: -1,
          Mode: 'InsertMode',
          WorkFlowID: null,
          ReadyToConfirm: null,
          IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
        };
      }
      else {

        this.type = (this.ModuleCode === 2895) ? 'researcher-product-request-list' :
          (this.ModuleCode === 2862) ? 'pure-product-request-page' : 'product-request-page';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.startLeftPosition = (this.ModuleCode === 2895) ? 68 : 15;
        this.startTopPosition = 5;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.PercentWidth = 90;
        this.MainMaxwidthPixel = 2000;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CostFactorID: -1,
          Mode: 'InsertMode',
          WorkFlowID: null,
          ReadyToConfirm: null,
          IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
        };
      }


      return;
    }

    if (BtnName === 'update') {
      if (!this.selectedRow) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }

      if (this.ModuleCode === 2939 || this.ModuleCode === 2951) {
        if (this.selectedRow.IsConvert === true) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'قرارداد انتخاب شده مربوط به سامانه قدیم می باشد و قابل اصلاح نمی باشد';
          this.btnclicked = true;
          this.HaveMaxBtn = false;
          this.startLeftPosition = 500;
          this.startTopPosition = 250;
          return;
        }
        if (this.selectedRow.data.DealTypeCode === null) { // RFC 58546
          this.ShowMessageBoxWithOkBtn('حد معامله مشخص نشده است.');
          return;
        }
        this.type = 'completion-contract-info';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 40;
        this.MinHeightPixel = 600;
        this.startLeftPosition = 15;
        this.startTopPosition = 5;
        this.PercentWidth = 99;
        this.MainMaxwidthPixel = 2000;
        this.paramObj = {
          HeaderName: this.ModuleName,
          ModuleCode: this.selectedRow.data.ModuleCode ? this.selectedRow.data.ModuleCode : 2730,
          row: this.selectedRow.data,
          CostFactorID: this.selectedRow.data.CostFactorID,
          HaveSave: true,
          IsEditable: true,
          FirstModuleCode: this.selectedRow.data.ModuleCode,
          IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly,
          ModuleViewTypeCode: 110000,
        };
      }
      else if (this.ModuleCode === 3094) {
        this.type = 'product-request-invest-archive';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.PercentWidth = 80;
        this.MainMaxwidthPixel = 1200;
        this.MinHeightPixel = 626;
        this.startLeftPosition = 115;
        this.startTopPosition = 11;
        this.paramObj = {
          CostFactorID: this.selectedRow.data.CostFactorID,
          Mode: 'EditMode',
          WorkFlowID: null,
          ReadyToConfirm: null,
          ContractTypeCode: -1,
          SelectedRow: null,
          ModuleViewTypeCode: this.selectedRow.data.ModuleViewTypeCode, // RFC 61879
          IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
        };
      }
      else {
        // tslint:disable-next-line:max-line-length
        this.type = this.ModuleCode === 2862 ? 'pure-product-request-page' : 'product-request-page';
        this.HaveHeader = true;
        this.btnclicked = true;
        this.startLeftPosition = 15;
        this.startTopPosition = 5;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.PercentWidth = 90;
        this.MainMaxwidthPixel = 2000;
        this.MinHeightPixel = 645;
        this.paramObj = {
          CostFactorID: this.selectedRow.data.CostFactorID,
          Mode: 'EditMode',
          WorkFlowID: null,
          ReadyToConfirm: null,
          ContractTypeCode: -1,
          SelectedRow: null,
          ModuleViewTypeCode: this.selectedRow.data.ModuleViewTypeCode, // RFC 61879
          IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
        };
      }
      return;
    }
  }

  getOutPutParam(event) {
    if (event && (this.type === 'product-request-page' ||
      this.type === 'researcher-product-request-list' ||
      this.type === 'completion-contract-info' ||
      this.type === 'pure-product-request-page')) {
      this.rowData = this.ProductRequest.GetProductRequestList(this.selectedRegion, this.ModuleCode);
    }
  }
  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف درخواست معامله مطمئن هستید؟');
  }
  DoDelete() {
    this.ProductRequest.DeleteProductRequest(this.selectedRow.data.CostFactorID, 2730).subscribe(
      res => {
        if (res === true) {
          this.rowData = this.ProductRequest.GetProductRequestList(this.RegionParams.selectedObject, this.ModuleCode);
          this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
        } else {
          this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
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
  MessageBoxAction(ActionResult) {
    if (this.BtnClickedName === 'BtnDelete' && ActionResult === 'YES') {
      this.DoDelete();
    } else {
      this.Closed.emit(true);
    }
    this.type = '';
    this.BtnClickedName = '';
    this.btnclicked = false;
  }

  OnCallExternalServiceClick() {
    const selectedRows = this.gridApi.getSelectedRows();
    const ContractIDs = [];
    if (selectedRows && selectedRows.length > 0) {
      selectedRows.forEach(element => {
        if (element && element.ContractID) {
          ContractIDs.push(element.ContractID);
        }
      });
      if (ContractIDs && ContractIDs.length) {
        this.ContractService.UploadContractInClarification(ContractIDs, this.ModuleCode).subscribe(res => {
          if (res === '') {
            this.ShowMessageBoxWithOkBtn('ارسال به سامانه شفاف با موفقیت انجام شد.');
          } else {
            this.ShowMessageBoxWithOkBtn(res);
          }
        });
      }
    } else {
      this.ShowMessageBoxWithOkBtn('ابتدا قرارداد های مورد نظر را انتخاب نمایید');
    }
  }

  OnShowIncomplete() {
    if (this.selectedRow === null || isUndefined(this.selectedRow)) {
      this.ShowMessageBoxWithOkBtn('قراردادی جهت مشاهده انتخاب نشده است');
      return;
    } else {
      if (this.selectedRow.data.IsConvert === true) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'قرارداد انتخاب شده مربوط به سامانه قدیم می باشد و قابل مشاهده نمی باشد';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      }
      this.type = 'completion-contract-info';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 40;
      this.MinHeightPixel = 600;
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.PercentWidth = 99;
      this.MainMaxwidthPixel = 2000;
      this.paramObj = {
        HeaderName: this.ModuleName,
        ModuleCode: this.selectedRow.data.ModuleCode ? this.selectedRow.data.ModuleCode : 2730,
        row: this.selectedRow.data,
        CostFactorID: this.selectedRow.data.CostFactorID,
        HaveSave: false,
        IsEditable: false,
        FirstModuleCode: this.selectedRow.data.ModuleCode,
        ModuleViewTypeCode: 110000,
      };
    }

  }
  ShowProdReq() {
    this.gridApi.stopEditing();
    if (!this.selectedRow) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'درخواستی جهت مشاهده انتخاب نشده است';
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    } else {
      this.type = 'product-request-page';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 15;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.HeightPercentWithMaxBtn = 97;
      this.PercentWidth = 90;
      this.MainMaxwidthPixel = 2000;
      this.MinHeightPixel = 645;
      this.paramObj = {
        CostFactorID: this.selectedRow.data.CostFactorID,
        Mode: 'EditMode',
        WorkFlowID: null,
        ReadyToConfirm: null,
        ContractTypeCode: -1,
        SelectedRow: null,
        ModuleViewTypeCode: 900009, // به صورت نمایشی و تنها با امکان امضای الکترونیک
        IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
      };
    }
  }
}
