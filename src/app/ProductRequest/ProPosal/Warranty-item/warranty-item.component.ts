import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-warranty-item',
  templateUrl: './warranty-item.component.html',
  styleUrls: ['./warranty-item.component.css']
})
export class WarrantyItemComponent implements OnInit {
  @ViewChild('IsValidity') IsValidity: TemplateRef<any>;
  @Input() PopupParam;
  @Output() WarrantyItemClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  OrderCommitionID: any;
  constructor
    (
      public ContractList: ContractListService,
      private ProductRequest: ProductRequestService,
      private User: UserSettingsService,
      private RefreshPersonItems: RefreshServices,
      private Automation: AutomationService
    ) {
  }
  gridApi;
  SelectedReceiveDocID;
  BoxDevHeight: number;
  WarrantyItemColDef;
  Type;
  rowData;
  Disable;
  HasWarrantyItem = false;
  RegisterLetterNo;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  Disabled: boolean;
  RegisterLetterDate;
  DocumentLetterNo;
  MinHeightPixel: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  btnclicked: boolean;
  CostFactorID: number;
  ModuleViewTypeCode: number;
  ProductRequestObject: any;
  IsLawful: boolean;
  LetterTypeCode: number;
  currentRegionObject;
  NgSelectEstateTypeParams = {
    bindLabelProp: 'EstateTypeName',
    bindValueProp: 'EstateTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'EstateType'
  };
  beforeID: any;
  NgSelectProposalParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ProposalID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Proposal'
  };
  NgSelectReceiveDocParams = {
    bindLabelProp: 'ReceiveDocTypeName',
    bindValueProp: 'ReceiveDocTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Receive-Doc-Type'
  };
  tabpanelWarrantyDocHeight = 50;
  ngOnInit() {
    if (this.PopupParam.HasWarrantyItem) {
      this.HasWarrantyItem = true;
    }
    this.Disabled = true;
    this.WarrantyItemColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'قبول / رد',
        field: 'IsValidity',
        width: 100,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsValidity
        },
      },
      {
        headerName: 'نام شخص پیشنهاد دهنده',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectProposalParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ActorName) {
            params.data.ProposalID = params.newValue.ProposalID;
            params.data.ActorName = params.newValue.ActorName;
            return true;
          } else {
            params.data.ProposalID = null;
            params.data.ActorName = null;
            return false;
          }
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'نوع سند',
        field: 'ReceiveDocTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectReceiveDocParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ReceiveDocTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ReceiveDocTypeName) {
            params.data.ReceiveDocTypeCode = params.newValue.ReceiveDocTypeCode;
            params.data.ReceiveDocTypeName = params.newValue.ReceiveDocTypeName;
          } else {
            params.data.ReceiveDocTypeName
              = params.data.ReceiveDocTypeCode = params.data.ReferenceNo = params.data.PersianReferenceDate
              = params.data.ReceiveDocAmount = params.data.Note = params.data.SapamNo
              = params.data.EstateTypeName = params.data.EstateTypeCode
              = params.data.EstateValue = params.data.RegRegion = params.data.Area
              = params.data.EstateAddress = null;
          }
          if (params.data.ReceiveDocTypeCode !== 11) {
            params.data.SapamNo = null;
            params.data.EstateValue = null;
            params.data.Area = null;
            params.data.EstateAddress = null;
            params.data.EstateTypeCode = null;
            params.data.EstateTypeName = null;
            params.data.RegRegion = null;
          }
          return true;
        },
        editable: true,
        width: 250,
        resizable: true
      },
      {
        headerName: 'شماره ضمانت نامه',
        field: 'ReferenceNo',
        editable: true,
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ ضمانت نامه',
        field: 'PersianReferenceDate',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianReferenceDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPx: 120,
          AppendTo: '.for-append-date-warranty-item'
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
        headerName: 'مبلغ',
        field: 'ReceiveDocAmount',
        width: 120,
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
      {
        headerName: 'توضیحات',
        field: 'Note',
        editable: true,
        width: 440,
        resizable: true
      },
      {
        headerName: 'شماره سپام',
        field: 'SapamNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نوع ملک',
        field: 'EstateTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectEstateTypeParams,
          Items: [],
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.EstateTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.EstateTypeName) {
            params.data.EstateTypeCode = params.newValue.EstateTypeCode;
            params.data.EstateTypeName = params.newValue.EstateTypeName;
            return true;
          } else {
            params.data.EstateTypeCode = null;
            params.data.EstateTypeName = null;
            return false;
          }
        },
        width: 120,
        resizable: true
      },
      {
        headerName: 'ارزش ملک',
        field: 'EstateValue',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک ثبتی',
        field: 'RegRegion',
        width: 80,
        resizable: true
      },
      {
        headerName: 'متراژ',
        field: 'Area',
        width: 80,
        resizable: true
      },
      {
        headerName: 'آدرس ملک',
        field: 'EstateAddress',
        width: 440,
        resizable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 80,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      }
    ];
    this.CostFactorID = this.PopupParam.CostFactorID;
    this.currentRegionObject = this.PopupParam.currentRegionObject;
    this.ModuleViewTypeCode = this.PopupParam.ModuleViewTypeCode;
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.OrderCommitionID = this.PopupParam.OrderCommitionID;
    this.SetPRWarrantyReciveDocList();
    this.BoxDevHeight = 70;
    this.rowData = [];
    switch (this.ModuleViewTypeCode) {
      case 68:
      case 37:
      case 47:
      case 100002:
      case 112: // rfc 50851
      case 149:
      case 166:
        this.IsLawful = this.ProductRequestObject.IsWarrantyValidity;
        this.LetterTypeCode = 7;
        break;
      case 1100000:
      case 156:
      case 163:
        this.HasWarrantyItem = true;
        break;
      default:
        this.IsLawful = null;
        this.LetterTypeCode = null;
        break;
    }
    this.SetPRWarrantyReciveDocList();
    this.BoxDevHeight = 70;
    this.rowData = [];
  }
  SetPRWarrantyReciveDocList() {
    this.ProductRequest.GetPRCostWarrantyList(this.CostFactorID, this.OrderCommitionID).subscribe(res => {
      this.rowData = res;
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetProposalList(this.CostFactorID, true).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Proposal'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ReceiveDocTypeName') {
      // this.SelectedColumnDef[2].cellEditorParams.Params.loading = false;
      this.ContractList.GetWarrantyReceiveDocType().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Receive-Doc-Type'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'EstateTypeName') {
      // tslint:disable-next-line: max-line-length
      this.ProductRequest.GetEstateTypeList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'EstateType'
        });
      });
    }
  }
  onSave() {
  }
  RowClick(event) {
    if (event.data.ReceiveDocID && this.beforeID !== event.data.ReceiveDocID) {
      this.SelectedReceiveDocID = event.data.ReceiveDocID;
      this.SetLetterDetails();
      this.Disabled = false;
      this.beforeID = event.data.ReceiveDocID;
    } else if (!event.data.ReceiveDocID) {
      this.RegisterLetterDate = null;
      this.DocumentLetterNo = null;
      this.RegisterLetterNo = null;
      this.SelectedReceiveDocID = undefined;
      this.Disabled = true;
      this.beforeID = null;
    }
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.Type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onReceiveDocArchiveClick(row) {
    if (row.ReceiveDocID) {
      this.Type = 'archive-details';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ReceiveDocID,
        TypeCodeStr: '11-',
        DocTypeCode: 11,
        ModuleCode: 2739,
        RegionCode: this.ProductRequestObject.RegionCode,
      };
    }
  }
  popupclosed() {
    this.btnclicked = false;
  }
  onSavePRWarrantyAndValidity() {
    const ReceiveDocList = [];
    this.gridApi.stopEditing();
    this.gridApi.forEachNode(node => {
      const ReceiveDocObj = {
        ReceiveDocID: node.data.ReceiveDocID ? node.data.ReceiveDocID : -1,
        CostFactorID: -1,
        // tslint:disable-next-line:max-line-length
        ReceiveDocTypeCode: (node.data.ReceiveDocTypeName && node.data.ReceiveDocTypeName.ReceiveDocTypeCode) ? node.data.ReceiveDocTypeName.ReceiveDocTypeCode : (node.data.ReceiveDocTypeCode ? node.data.ReceiveDocTypeCode : null),
        // tslint:disable-next-line:max-line-length
        ReferenceDate: node.data.PersianReferenceDate && node.data.PersianReferenceDate.MDate ? node.data.PersianReferenceDate.MDate : (node.data.ShortReferenceDate ? node.data.ShortReferenceDate : null),
        ReferenceNo: node.data.ReferenceNo ? node.data.ReferenceNo : null,
        ReceiveDocAmount: node.data.ReceiveDocAmount,
        Note: node.data.Note,
        IsWarranty: 1,
        ProposalID: node.data.ProposalID,
        IsValidity: node.data.IsValidity ? true : false,
      };
      ReceiveDocList.push(ReceiveDocObj);
    });
    // tslint:disable-next-line:max-line-length
    this.ProductRequest.SavePRWarrantyAndValidity(this.CostFactorID, this.IsLawful ? 1 : 0, ReceiveDocList, this.PopupParam.OrginalModuleCode, this.OrderCommitionID).subscribe(x => {
      this.ShowMessageBoxWithOkBtn('ثبت اطلاعات ضمانت نامه با موفقیت انجام شد');
      this.SetPRWarrantyReciveDocList();
    });
  }
  onDeleteLetterClick(InputLetterTypeCode = null) {
    if (this.SelectedReceiveDocID) {
      const CostFactorLetter = {
        CostFactorID: this.CostFactorID,
        ReceiveDocID: this.SelectedReceiveDocID,
        RegionCode: this.currentRegionObject.RegionCode,
        LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCode,
        OrganizationCode: this.currentRegionObject.OrganizationCode,
      };
      this.Automation.DeleteLetter(CostFactorLetter).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('حذف نامه با موفقیت انجام شد');
      },
        err => {
          this.ShowMessageBoxWithOkBtn('حذف نامه با خطا مواجه شد');
        });
    }
  }
  onShowLetterClick(InputLetterTypeCode = null) {
    if (this.SelectedReceiveDocID) {
      const CostFactorLetter = {
        CostFactorID: this.CostFactorID,
        ReceiveDocID: this.SelectedReceiveDocID,
        LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCode
      };
      this.Automation.ShowLetter(CostFactorLetter);
    }
  }
  OnRegiserLetterDateChange(ADate) {
    this.RegisterLetterDate = ADate.MDate;
  }
  onCreateNewLetter(InputLetterTypeCode = null) {
    if (this.SelectedReceiveDocID) {
      this.btnclicked = true;
      this.Type = 'send-letter-page';
      this.HaveHeader = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 80;
      this.MinHeightPixel = 300;
      this.PopupParam = {
        HeaderName: 'نامه جدید',
        HaveHeader: true,
        CostFactorID: this.CostFactorID,
        ReceiveDocID: this.SelectedReceiveDocID,
        RegionCode: this.currentRegionObject.RegionCode,
        LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCode,
        OrganizationCode: this.currentRegionObject.OrganizationCode,
        AutoClose: true,
      };
    }
  }

  SetLetterDetails() {
    if (this.SelectedReceiveDocID) {
      this.Automation.GetAutomationLetter(this.CostFactorID, this.LetterTypeCode,
        this.currentRegionObject.OrganizationCode, this.SelectedReceiveDocID)
        .subscribe(res => {
          this.RegisterLetterDate = res.RegisterLetterDate;
          this.DocumentLetterNo = res.DocumentLetterNo;
          this.RegisterLetterNo = res.RegisterLetterNo;
        });
    }
  }

  onAutomationClick(InputLetterTypeCode = null) {
    if (this.SelectedReceiveDocID) {
      const LetterTypeCodeList = [];
      InputLetterTypeCode ? LetterTypeCodeList.push(InputLetterTypeCode) : LetterTypeCodeList.push(this.LetterTypeCode);

      this.btnclicked = true;
      this.Type = 'app-automation';
      this.HaveHeader = true;
      this.startLeftPosition = 144;
      this.startTopPosition = 42;
      this.MinHeightPixel = 300;
      this.PopupParam = {
        HeaderName: 'اتصال نامه',
        HaveHeader: this.HaveHeader,
        CostFactorID: this.CostFactorID,
        ReceiveDocID: this.SelectedReceiveDocID,
        RegionCode: this.currentRegionObject.RegionCode,
        LetterTypeCodeList: LetterTypeCodeList,
        OrganizationCode: this.currentRegionObject.OrganizationCode,
        AutoClose: true,
        SaveMode: true,
        OrginalModuleCode: this.PopupParam.OrginalModuleCode,
      };
    }
  }
  close() {
    this.WarrantyItemClosed.emit();
  }
  getOutPutParam(event) {
    if (this.Type = 'app-automation') {
      this.RegisterLetterNo = event.RegisterLetterNo;
      this.DocumentLetterNo = event.DocumentLetterNo;
      this.RegisterLetterDate = event.RegisterLetterDate;
    }
  }
}
