import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { of } from 'rxjs';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { InvoiceService } from 'src/app/Services/Invoice/InvoiceService';
import { isUndefined } from 'util';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApi;
  columnDef;
  IsAdmin: boolean;
  SelectedRegionObject;
  private rowSelection;
  rowData: any;
  RegionListSet = [];
  btnclicked = false;
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
    private Invoice: InvoiceService,
    private Workflow: WorkflowService,
    private RefreshModuleViewTypeItems: RefreshServices,
    private UserSettings: UserSettingsService,
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.columnDef = [
          {
            headerName: 'ردیف ',
            field: 'ItemNo',
            width: 80,
            resizable: true
          },
          {
            headerName: 'شماره فاکتور',
            field: 'RegisterInvoiceCode',
            width: 100,
            resizable: true,
            sortable: true,
          },
          {
            headerName: 'تاریخ فاکتور',
            field: 'PersianRegisterInvoiceDate',
            width: 120,
            resizable: true
          },
          {
            headerName: 'موضوع',
            field: 'Subject',
            width: 350,
            resizable: true
          }, ];

    this.rowSelection = 'single';
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
  }

  popupclosed() {
    if (this.type === 'single-sale-invoice') {
      this.getInvoiceListData(this.RegionParams.selectedObject);
      this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
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
    this.getInvoiceListData(this.RegionParams.selectedObject);
    this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
    this.selectedRow = null;
  }

  ngOnInit() {
    // tslint:disable-next-line: no-shadowed-variable
    new Promise((resolve, reject) => {
      this.UserSettings.CheckAdmin().subscribe(res => {
        resolve(res);
      });
    }).then((admin: boolean) => {
      this.IsAdmin = admin;
      this.getNewData();
    });
  }

  getNewData(): void {
    this.RegionList.GetSpecialRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.RegionListSet = res;
        this.RegionParams.selectedObject = res[0].RegionCode;
        this.getInvoiceListData(this.RegionParams.selectedObject);
        this.SelectedRegionObject = this.RegionListSet.find(x => x.RegionCode === this.RegionParams.selectedObject);
      }
    });
  }

  getInvoiceListData(region): void {
    this.rowData = of([]);
    this.rowData = this.Invoice.GetInvoiceList(region);
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
    if (this.ModuleCode !== 2939) {
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
        default:
          break;
      }
    }
  }

  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  Btnclick(BtnName) {
    this.gridApi.stopEditing();

    if (BtnName === 'insert') {
      this.type = 'single-sale-invoice';
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
        InvoiceID: -1,
        Mode: 'InsertMode',
        WorkFlowID: null,
        ReadyToConfirm: null,
        IsRegionReadOnly: this.SelectedRegionObject.IsReadOnly
      };
      return;
    }

    if (BtnName === 'update') {
      if (this.selectedRow === null || isUndefined(this.selectedRow)) {
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'فاکتوری جهت مشاهده انتخاب نشده است';
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.startLeftPosition = 500;
        this.startTopPosition = 250;
        return;
      } else {
        this.type = 'single-sale-invoice';
        this.btnclicked = true;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.startLeftPosition = 15;
        this.startTopPosition = 5;
        this.MainMaxwidthPixel = 2000;
        this.paramObj = {
          InvoiceID: this.selectedRow.data.InvoiceID,
        };
        return;
      }
    }
  }

  getOutPutParam(event) {
    // if (event && this.type === 'product-request-page') {
    //   this.rowData = this.ProductRequest.GetProductRequestList(this.RegionParams.selectedObject, this.ModuleCode);
    // }
    // if (event && this.type === 'researcher-product-request-list') {
    //   this.rowData = this.ProductRequest.GetProductRequestList(this.RegionParams.selectedObject, this.ModuleCode);
    // }
  }
  onDeleteclick() {
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('آیا از حذف فاکتور مطمئن هستید؟');
  }
  DoDelete() {
    this.Invoice.DeleteInvoice(this.selectedRow.data.InvoiceID,this.ModuleCode).subscribe(
      res => {
        if (res === true) {
          this.rowData = this.Invoice.GetInvoiceList(this.RegionParams.selectedObject);
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
}
