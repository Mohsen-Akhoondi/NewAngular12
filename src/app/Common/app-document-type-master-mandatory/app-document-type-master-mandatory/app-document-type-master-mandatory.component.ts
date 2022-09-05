import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { GridOptions } from 'ag-grid-community';
import { of, Observable, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { DealMethodServices } from 'src/app/Services/DealMethodService/DealMethodService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { DealTypeService } from 'src/app/Services/DealTypeService/DealTypeService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { data, param } from 'jquery';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-document-type-master-mandatory',
  templateUrl: './app-document-type-master-mandatory.component.html',
  styleUrls: ['./app-document-type-master-mandatory.component.css']
})
export class DocumentTypeMasterMandatoryComponent implements OnInit {
  @Output() DocumentTypeMasterMandatoryViewClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('IsDocTypeForced') IsDocTypeForced: TemplateRef<any>;
  HasSave: any;
  DocumentList: any;
  ChildDocumentList: any;
  childSelectedRow: any;
  appgridheight: number;


  FinYearList: Observable<any>;

  ContractTypeList: Observable<any>;
  MandatoryDto: any;
  gridApi_child: any;
  gridApi_mandatory: any;
  DocTypeDto: any;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  btnclicked = false;
  HaveHeader: boolean;
  type: string;
  BeforeID: any;
  private sub: any;
  DocumentTypeMandatories: any[];
  Dto: any;
  DealTypeList: Observable<any>;
  ModuleCode: number;
  IsLoading = false;
  ChildDocumentColDef: any;
  ChildDocumentMandatoryColDef: any;
  ChildDocumentMandatoryList: any;
  HaveMaxBtn;
  NgSelectMasterDocumentParams = {
    Items: [],
    bindLabelProp: 'DocumentTypeName',
    bindValueProp: 'DocumentTypeCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectRegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '190',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '250px'
  };
  NgSelectFinYearParams = {
    Items: [],
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '150',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  ChildDocumentTypeItems;
  ChildDocumentTypeParams = {
    bindLabelProp: 'DocumentTypeName',
    bindValueProp: 'DocumentTypeCode',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: 160,
    type: 'child-doc-type',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'کد مستند', HeaderName: 'DocumentTypeCode', width: 30, MinTermLenght: 1, SearchOption: 'DocumentTypeCode' },
        { HeaderCaption: 'نام مستند', HeaderName: 'DocumentTypeName', width: 63, MinTermLenght: 2, SearchOption: 'DocumentTypeName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد مستند', width: 30, },
        { HeaderCaption: 'نام مستند', width: 63, }],
      HaveItemNo: true,
      ItemNoWidth: 20
    }
  };
  RegionList: Observable<any>;
  DealMethodList: Observable<any>;
  SecondRegionList: Observable<any>;
  Article31Items;
  Article31Params = {
    bindLabelProp: 'Article31Name',
    bindValueProp: 'Article31ID',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Article31'
  };
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
  NgSelectModuleParams = {
    bindLabelProp: 'ModuleNameAndCode',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'module-type'
  };
  NgSelectPRTypeParams = {
    bindLabelProp: 'IsNewTxt',
    bindValueProp: 'IsNewCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: 1,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px'
  };
  NgSelectPRTypeItems;

  constructor(private Workflow: WorkflowService,
    private PriceList: PriceListService,
    private Region: RegionListService,
    private Doc_Type_Srv: CommonService,
    private DealmethodService: DealMethodServices,
    private ContractType: ContractListService,
    private Dealtype: DealTypeService,
    private users: UserSettingsService,
    private Route: ActivatedRoute,
    private router: Router,
    private RefreshManatoryItems: RefreshServices,
    private RefreshItems: RefreshServices) {
    this.ContractTypeList = ContractType.GetContractTypeList(false);
    this.DealTypeList = Dealtype.GetDealTypeList();
    this.DealMethodList = this.DealmethodService.GetDealMethodType();
    this.FinYearList = this.Workflow.GetFinYearList(false);
    this.SecondRegionList = this.Region.GetRegionGroupList(false);
    this.appgridheight = 100;
    this.HasSave = false;
    this.sub = this.Route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.RegionList = this.Region.GetRegionList(this.ModuleCode ,false, false);
  }
  ngOnInit() {
    this.NgSelectPRTypeItems = [
      { IsNewTxt: 'جدید', IsNewCode: 1 },
      { IsNewTxt: 'تمدید', IsNewCode: 2 }
    ];
    this.ChildDocumentList = [];
    this.ChildDocumentMandatoryList = [];
    this.users.CheckAdmin().subscribe((res: boolean) => {
      this.HasSave = res;
      this.ChildDocumentColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true,
          editable: false,
        },
        {
          headerName: 'نام نوع مستند',
          field: 'DocumentTypeName',
          width: 375,
          resizable: true,
          editable: res,
        },
        {
          headerName: 'آگهی',
          field: 'UseInAdvertising',
          width: 100,
          resizable: true,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          editable: true,
          cellEditorFramework: CheckboxFieldEditableComponent,
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsDocTypeForced
          },
        },
      ];
      this.ChildDocumentMandatoryColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true,
          editable: false,
        },
        {
          headerName: 'کد واحد اجرایی',
          field: 'RegionName',
          width: 200,
          resizable: true,
          editable: res,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            bindLabelProp: 'RegionName',
            bindValueProp: 'RegionCode',
            Items: this.RegionList
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RegionName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RegionName) {
              params.data.RegionCode = params.newValue.RegionCode;
              params.data.RegionName = params.newValue.RegionName;
            } else {
              params.data.RegionCode = null;
              params.data.RegionName = null;
            }
          }
        },
        {
          headerName: 'سال مالی',
          field: 'FinYearCode',
          width: 80,
          resizable: true,
          editable: res,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: this.FinYearList,
            bindLabelProp: 'FinYearCode',
            bindValueProp: 'FinYearCode'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.FinYearCode;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'روش انجام معامله',
          field: 'DealMethodName',
          width: 200,
          resizable: true,
          editable: res,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            bindLabelProp: 'DealMethodName',
            bindValueProp: 'DealMethodCode',
            Items: this.DealMethodList
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.DealMethodName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.DealMethodCode) {
              params.data.DealMethodCode = params.newValue.DealMethodCode;
              params.data.DealMethodName = params.newValue.DealMethodName;
              params.data.RegionGroupCode = null;
              params.data.RegionGroupName = null;
              params.data.Article31Name = null;
              params.data.Article31ID = null;
            } else {
              params.data.DealMethodCode = null;
              params.data.DealMethodName = null;
              params.data.RegionGroupCode = null;
              params.data.RegionGroupName = null;
              params.data.Article31Name = null;
              params.data.Article31ID = null;
            }
          }
        },
        {
          headerName: 'واحد اجرایی علت ترک تشریفات',
          field: 'RegionGroupName',
          width: 200,
          resizable: true,
          editable: (event) => {
            if ((event.data.DealMethodCode === 4 ||
              event.data.DealMethodCode === 7 ||
              event.data.DealMethodCode === 8 ||
              event.data.DealMethodCode === 9)) {
              return true;
            } else {
              return false;
            }
          },
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            bindLabelProp: 'RegionGroupName',
            bindValueProp: 'RegionGroupCode',
            Items: this.SecondRegionList
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RegionGroupName;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.RegionGroupName) {
              params.data.RegionGroupCode = params.newValue.RegionGroupCode;
              params.data.RegionGroupName = params.newValue.RegionGroupName;
              params.data.Article31Name = '';
              params.data.Article31ID = '';
            } else {
              params.data.RegionGroupCode = null;
              params.data.RegionGroupName = null;
              params.data.Article31Name = '';
              params.data.Article31ID = '';
            }
          }
        },
        {
          headerName: 'علت ترک تشریفات',
          field: 'Article31Name',
          width: 200,
          resizable: true,
          editable: (event) => {
            if ((event.data.DealMethodCode === 4 ||
              event.data.DealMethodCode === 7 ||
              event.data.DealMethodCode === 8 ||
              event.data.DealMethodCode === 9)) {
              return true;
            } else {
              return false;
            }
          },
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.Article31Params,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.Article31Name;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.Article31ID) {
              params.data.Article31ID = params.newValue.Article31ID;
              params.data.Article31Name = params.newValue.Article31Name;
            } else {
              params.data.Article31ID = null;
              params.data.Article31Name = null;
            }
          }
        },
        {
          headerName: 'کد فعالیت',
          field: 'ModuleNameAndCode',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectModuleParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ModuleNameAndCode;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.ModuleCode) {
              params.data.ModuleCode = params.newValue.ModuleCode;
              params.data.ModuleNameAndCode = params.newValue.ModuleNameAndCode;
              params.data.ModuleViewTypeCodeName = null;
              params.data.ModuleViewTypeCode = null;

            } else {
              params.data.ModuleNameAndCode = null;
              params.data.ModuleCode = null;
              params.data.ModuleViewTypeCodeName = null;
              params.data.ModuleViewTypeCode = null;
            }
          },
          editable: true,
          width: 170,
          resizable: true
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
          valueSetter: (params) => {
            if (params.newValue && params.newValue.ModuleViewTypeCode) {
              params.data.ModuleViewTypeCode = params.newValue.ModuleViewTypeCode;
              params.data.ModuleViewTypeCodeName = params.newValue.ModuleViewTypeCodeName;
            } else {
              params.data.ModuleViewTypeCode = null;
              params.data.ModuleViewTypeCode = null;
            }
          },
          editable: true,
          width: 170,
          resizable: true
        },
        {
          headerName: 'نوع درخواست',
          field: 'IsNewTxt',
          width: 200,
          resizable: true,
          editable: res,
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectPRTypeParams,
            Items: this.NgSelectPRTypeItems,
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.IsNewTxt;
            } else {
              return '';
            }
          },
          valueSetter: (params) => {
            if (params.newValue && params.newValue.IsNewCode) {
              params.data.IsNewCode = params.newValue.IsNewCode;
              params.data.IsNewTxt = params.newValue.IsNewTxt;
            } else {
              params.data.IsNewCode = null;
              params.data.IsNewTxt = null;
            }
          },
        },
        {
          headerName: 'نام نوع قرارداد',
          field: 'ContractTypeName',
          width: 200,
          resizable: true,
          editable: res,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: this.ContractTypeList,
            bindLabelProp: 'ContractTypeName',
            bindValueProp: 'ContractTypeCode'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ContractTypeName;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'نوع معامله',
          field: 'DealTypeName',
          width: 225,
          resizable: true,
          editable: res,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: this.DealTypeList,
            bindLabelProp: 'DealTypeName',
            bindValueProp: 'DealTypeCode'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.DealTypeName;
            } else {
              return '';
            }
          },
        }
      ];
    });
    this.Doc_Type_Srv.GetMasterDocumentList().subscribe(res => {
      this.DocumentList = res;
    });
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
  DoctypeRowRemoved() {
    this.ChildDocumentMandatoryList = [];
  }
  ChildDocReady(event) {
    this.gridApi_child = event.api;
  }
  Mandatorygridready(event) {
    this.gridApi_mandatory = event.api;
  }
  ChildRowClicked(event) {
    this.childSelectedRow = event.data;
    this.UpdateRowData(event);
    this.BeforeID = event.data.DocumentTypeCode;
  }
  UpdateRowData(event: any) {
    if (!event.data.DocumentTypeMandatories) {
      event.data.DocumentTypeMandatories = [];
      event.data.DocumentTypeMandatories.DocumentTypeCode = this.childSelectedRow.DocumentTypeCode;
    }
    const rowData = [];
    this.gridApi_mandatory.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.gridApi_mandatory.updateRowData({ remove: rowData });
    if (!this.BeforeID) {
      this.ChildDocumentMandatoryList = event.data.DocumentTypeMandatories;
    }
    if (this.BeforeID && this.BeforeID !== event.data.DocumentTypeCode) {
      this.gridApi_child.forEachNode((item) => {
        if (item.data.DocumentTypeCode === this.BeforeID) {
          item.data.DocumentTypeMandatories = rowData;
        }
        if (item.data.DocumentTypeCode === event.data.DocumentTypeCode) {
          this.ChildDocumentMandatoryList = item.data.DocumentTypeMandatories;
        }
      });
    }
    if (this.BeforeID && this.BeforeID === event.data.DocumentTypeCode) {
      this.gridApi_child.forEachNode((item) => {
        if (item.data.DocumentTypeCode === this.BeforeID) {
          this.gridApi_mandatory.updateRowData({ add: rowData });
        }
      });
    }
    this.ChildDocumentMandatoryList = event.data.DocumentTypeMandatories;
  }

  onChangeMasterDocument(event) {
    this.ChildDocumentMandatoryList = [];
    this.IsLoading = true;
    this.Doc_Type_Srv.GetDocumentTypeByParent(event, this.IsLoading).subscribe(res => {
      this.ChildDocumentList = res;
    });
    this.IsLoading = false;
  }
  SaveDocuments() {
    const DataList = [];
    this.gridApi_child.stopEditing();
    this.gridApi_mandatory.stopEditing();
    this.gridApi_mandatory.forEachNode(node => {
      DataList.push(node.data);
    });
    this.gridApi_child.forEachNode(node => {
      if (node.data.DocumentTypeCode === this.BeforeID) {
        node.data.DocumentTypeMandatories = DataList;
      }
    });
    this.Dto = [];
    this.MandatoryDto = [];
    this.gridApi_child.forEachNode(res => {
      if (!res.data.DocumentTypeMandatories) {
        res.data.DocumentTypeMandatories = [];
      }
      res.data.DocumentTypeMandatories.forEach((x: any) => {
        if (!x.DealMethodName) {
          x.DealMethodName = [];
          x.DealMethodName['DealMethodCode'] = null;
        }

        if (!x.DealTypeName) {
          x.DealTypeName = [];
          x.DealTypeName['DealTypeCode'] = null;
        }

        if (!x.ContractTypeName) {
          x.ContractTypeName = [];
          x.ContractTypeName['ContractTypeCode'] = null;
        }

        if (!x.RegionName) {
          x.RegionName = [];
          x.RegionName['RegionCode'] = null;
        }

        if (!x.FinYearCode) {
          x.FinYearCode = [];
          x.FinYearCode['FinYearCode'] = null;
        }
        const Mandatory = {
          DocumentTypeMandatoryID: res.data.FillMandatories ? x.DocumentTypeMandatoryID : 0,
          DocumentTypeCode: x.DocumentTypeCode,
          DealMethodCode: x.DealMethodName && x.DealMethodName.DealMethodCode && x.DealMethodName.DealMethodName ?
            // tslint:disable-next-line:max-line-length
            x.DealMethodName.DealMethodCode : (x.DealMethodName && x.DealMethodName.DealMethodCode === null ? null : (x.DealMethodCode ? x.DealMethodCode : null)),
          ContractTypeCode: x.ContractTypeName && x.ContractTypeName.ContractTypeCode && x.ContractTypeName.ContractTypeName ?
            x.ContractTypeName.ContractTypeCode :
            (x.ContractTypeName && x.ContractTypeName.ContractTypeCode === null ? null : (x.ContractTypeCode ? x.ContractTypeCode : null)),
          DealTypeCode: x.DealTypeName && x.DealTypeName.DealTypeCode && x.DealTypeName.DealTypeName ?
            x.DealTypeName.DealTypeCode :
            (x.DealTypeName && x.DealTypeName.DealTypeCode === null ? null : (x.DealTypeCode ? x.DealTypeCode : null)),
          DealMethodName: x.DealMethodName && x.DealMethodName.DealMethodName ?
            x.DealMethodName.DealMethodName : x.DealMethodName,
          ContractTypeName: x.ContractTypeName && x.ContractTypeName.ContractTypeName ?
            x.ContractTypeName.ContractTypeName : x.ContractTypeName,
          DealTypeName: x.DealTypeName && x.DealTypeName.DealTypeName ?
            x.DealTypeName.DealTypeName : x.DealTypeName,
          RegionCode: x.RegionName && x.RegionName.RegionCode ? x.RegionName.RegionCode : (x.RegionCode !== null ? x.RegionCode : null),
          FinYearCode: x.FinYearCode && x.FinYearCode.FinYearCode ? x.FinYearCode.FinYearCode : (x.FinYearCode ? x.FinYearCode : -1),
          Article31ID: x.Article31ID ? x.Article31ID : null,
          Article31Name: x.Article31Name ? x.Article31Name : '',
          // tslint:disable-next-line: max-line-length
          RegionGroupCode: x.RegionGroupName && x.RegionGroupName.RegionGroupCode ? x.RegionGroupName.RegionGroupCode : (x.RegionGroupCode !== null ? x.RegionGroupCode : null),
          ModuleViewTypeCode: (x.ModuleViewTypeCode) ? x.ModuleViewTypeCode : null,
          ModuleCode: (x.ModuleCode) ? x.ModuleCode : null,
          IsNewCode: x.IsNewCode ? (x.IsNewCode === 2 ? 0 : 1) : null
        };

        this.MandatoryDto.push(Mandatory);
      });
      const obj = {
        FillMandatories: false,
        DocumentTypeCode: res.data.FillMandatories ? res.data.DocumentTypeCode : -1,
        DocumentTypeName: res.data.DocumentTypeName,
        UseInAdvertising: res.data.UseInAdvertising,
        ParentDocumentTypeCode: res.data.ParentDocumentTypeCode,
        DocumentTypeMandatories_From_Client: this.MandatoryDto,
      };
      this.MandatoryDto = [];
      this.Dto.push(obj);
    });
    this.IsLoading = true;
    this.BeforeID = null;
    const promise = new Promise((resolve, reject) => {

      this.Doc_Type_Srv.SaveDocumentTypeWithMandetories(this.Dto, this.NgSelectMasterDocumentParams.selectedObject,
        this.IsLoading, this.ModuleCode).subscribe((res: any) => {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          this.RefreshItemNoGridright();
          this.RefreshItemNoGridLeft();
          resolve(true);
        },
          err => {
            if (!err.error.Message.includes('|')) {
              this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
            }
            reject(true);
          });

    }).then((res: boolean) => {

      this.Doc_Type_Srv.GetDocumentTypeByParent(this.NgSelectMasterDocumentParams.selectedObject,
        this.IsLoading).subscribe((res2: any) => {
          this.ChildDocumentList = res2;
        });

    });
    this.IsLoading = false;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed() {
    this.btnclicked = false;
  }

  MandatorycellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'Article31Name') {
      this.PriceList.GetAticle31ListByDealMethodCodeAndRegionGroup(
        event.data.DealMethodCode,
        event.data.RegionGroupCode).subscribe((res: any) => {
          if (res && res.length > 0) {
            this.RefreshManatoryItems.RefreshItemsVirtualNgSelect({
              List: res,
              type: 'Article31'
            });
          }
        });
    } else if (event.colDef && event.colDef.field === 'ModuleViewTypeCodeName') {
      this.Workflow.GetModuleViewTypeList4Transition(event.data.ModuleCode, false).subscribe(res => {
        this.RefreshManatoryItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'module-view-type'
        });
      });
    } else if (event.colDef && event.colDef.field === 'ModuleNameAndCode') {
      this.Doc_Type_Srv.GetAllModule(true).subscribe(res => {
        this.RefreshManatoryItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'module-type'
        });
      });
    }
  }

  RefreshItemNoGridright() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApi_child.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi_child.updateRowData({ update: itemsToUpdate });
  }
  RefreshItemNoGridLeft() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApi_mandatory.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi_mandatory.updateRowData({ update: itemsToUpdate });
  }
  OnOpenChildDocumentType() {
    this.Doc_Type_Srv.GetChildDocTypePaging(1, 30, '', '').subscribe(res => {
      this.ChildDocumentTypeItems = res.List;
      this.RefreshItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'child-doc-type'
      });
    });
  }
  FetchMoreChildDocumentType(event) {
    this.ChildDocumentTypeParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.Doc_Type_Srv.GetChildDocTypePaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.ChildDocumentTypeItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.ChildDocumentTypeItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'child-doc-type'
      });
    });
    this.ChildDocumentTypeParams.loading = false;
  }
  doChildDocumentTypeSearch(event) {
    this.ChildDocumentTypeParams.loading = true;
    this.Doc_Type_Srv.GetChildDocTypePaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption).subscribe(res => {
        this.ChildDocumentTypeItems = res.List,
          this.RefreshItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'child-doc-type'
          });
      });
    this.ChildDocumentTypeParams.loading = false;
  }
  onChangeChildDocumentType(event) {
    const CurrObj = this.ChildDocumentTypeItems.filter(x => x.DocumentTypeCode === event)[0];
    this.NgSelectMasterDocumentParams.selectedObject = CurrObj.ParentDocumentTypeCode;
    this.onChangeMasterDocument(this.NgSelectMasterDocumentParams.selectedObject);
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}
