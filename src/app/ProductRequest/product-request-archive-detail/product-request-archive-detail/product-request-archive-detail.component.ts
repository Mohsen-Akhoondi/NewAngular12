import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { of, forkJoin } from 'rxjs';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { isDefined } from 'src/app/Shared/ng-select/lib/value-utils';

declare var $: any;


@Component({
  selector: 'app-product-request-archive-detail',
  templateUrl: './product-request-archive-detail.component.html',
  styleUrls: ['./product-request-archive-detail.component.css']
})
export class ProductRequestArchiveDetailComponent implements OnInit {
  @Output() ProductArchiveDetailClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ArchiveParam: any;
  rowData;
  ModuleCode;
  DocumentTypeNameList = [];
  btnclicked = false;
  paramObj;
  selectedFile: File;
  gridHeightPxel: number;
  HaveSaveArchive = true;
  PRArchiveWithOutAdvertising;
  selectedDocumentID: number;
  selectedData: { DOCUMENT_ID: number; };
  selectedDocumentTypeCode;
  selectedNote;
  columnDefs: any;
  DocTypecolumnDef;
  ShowAdvertising = false;
  private gridApi;
  gridColumnApi: any;
  defaultColDef: any;
  UseInAdvertising = false;
  HasDeleteAccess = false;
  @ViewChild('fileExtCell') fileExtCell: TemplateRef<any>;
  @ViewChild('IsDocTypeForced') IsDocTypeForced: TemplateRef<any>;
  @ViewChild('IsDocType') IsDocType: TemplateRef<any>;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  type: string;
  HaveHeader = true;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isClicked = false;
  startLeftPosition: number;
  startTopPosition: number;
  HasCheck = false;
  HaveSave = false;
  ReloadDocuments = true;
  HaveDelete = false;
  HaveOnlineCommition = false;
  DocTypeData;
  OverHeightPercent;
  HaveMaxBtn;
  QuestionLabel = '';
  DocTypeItems;
  ParentDocumentTypeParam = {
    bindLabelProp: 'DocumentTypeName',
    bindValueProp: 'DocumentTypeCode',
    placeholder: '',
    MinWidth: '155px',
    loading: false,
    IsVirtualScroll: false,
    Required: true,
    selectedObject: null,
  };
  ProductRequestIsOnline: boolean = null;
  PercentWidth;
  MainMaxwidthPixel;
  PixelWidth: number;
  PixelHeight: number;
  OverMainMinwidthPixel;
  constructor(
    private router: Router,
    private ArchiveList: ArchiveDetailService,
    private User: UserSettingsService,
    private Route: ActivatedRoute,
  ) {
    this.Route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.defaultColDef = { resizable: false };

  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.gridHeightPxel = 400;
    this.ProductRequestIsOnline = this.ArchiveParam.IsOnline;
    this.HaveSaveArchive = this.ArchiveParam.HaveSaveArchive;
    this.HasDeleteAccess = this.ArchiveParam.HasDeleteAccess;
    this.PRArchiveWithOutAdvertising = this.ArchiveParam.PRArchiveWithOutAdvertising;
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.rowData = of([]);
    this.DocTypeData = of([]);

    $(document).ready(function () {
      $('.custom-file-input').on('change', function () {
        const fileName = $(this)
          .val()
          .split('\\')
          .pop();
        $(this)
          .next('.custom-file-label')
          .addClass('selected')
          .html(fileName);
      });
    });
    // const ArchiveDetailCodeStr = this.ArchiveParam.TypeCodeStr + this.ArchiveParam.EntityID.toString();
    // this.rowData = this.ArchiveList.GetArchiveDetailList(ArchiveDetailCodeStr);
    this.getDocumentTypeList();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDefs = [
      {
        headerName: '',
        width: 40,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.fileExtCell
        }
      },
      {
        headerName: 'نام فایل',
        field: 'FileNameWithoutExtension',
        width: 200,
        resizable: true
      },
      {
        headerName: 'نوع',
        field: 'DOCUMENT_TYPE_NAME',
        width: 120,
        resizable: true
      },
      {
        headerName: 'گروه',
        field: 'ParentDocumentTypeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'آگهی',
        field: 'USE_IN_ADVERTISING',
        width: 100,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        editable: () => {
          return this.HaveSaveArchive && !this.PRArchiveWithOutAdvertising;
        },

        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsDocType
        },
      },
      {
        headerName: 'توضیحات',
        field: 'NOTE',
        width: 300,
        resizable: true
      },
    ];
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  onDisplay() {
    if (this.selectedDocumentID === undefined || this.selectedDocumentID === 0) {
      this.type = 'message-box';
      this.OverMainMinwidthPixel = null;
      this.HaveMaxBtn = false;
      this.OverHeightPercent = null;
      this.HaveHeader = true;
      this.alertMessageParams.message = 'فایلی انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 200;
      this.startTopPosition = 50;
    } else {
      this.ArchiveList.DisplayFileFromServer(this.selectedData).subscribe(res => {
        this.ArchiveList.downloadFile(res);
      });
    }
  }
  onDisplayAllDoc() {
    this.ArchiveList.GetRequestAllFileDocNames(this.ArchiveParam.CostFactorID).subscribe(res => {
      this.type = 'file-viwer-page';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.startLeftPosition = 15;
      this.OverHeightPercent = 97;
      this.startTopPosition = 5;
      this.HaveMaxBtn = true;
      this.MainMaxwidthPixel = 1300;
      this.OverMainMinwidthPixel = 1320;
      this.paramObj = {
        HeaderName: 'مشاهده پرونده اسناد',
        FileList: res[0].FirstFilesBase64,
        nodes: res
      };

    });
  }

  onRowClicked(event: { data: { DOCUMENT_ID: number; }; }) {
    this.selectedDocumentID = event.data.DOCUMENT_ID;
    this.selectedData = event.data;
  }
  close() {
    this.ProductArchiveDetailClosed.emit(true);
  }

  fileExt(event: any) {
  }
  popupclosed() {
    this.btnclicked = false;
    this.getDocumentTypeList();
  }

  RedioClick(param) {
    this.ProductRequestIsOnline = param;
    this.ArchiveParam.IsOnline = this.ProductRequestIsOnline;
  }
  getDocumentTypeList(): void {
    const DocTypeList = [38, 59, 58, 47, 46, 45, 44, 39, 40, 11, 1387]; // RFC 52800
    forkJoin([
      this.ArchiveList.GetPRoductRequestArchiveDetailList(this.ArchiveParam.CostFactorID),
      this.ArchiveList.GetADocTypeList(DocTypeList)
    ]).subscribe(res => {
      this.rowData = res[0];
      this.DocTypeItems = res[1];
    });

    if (this.ArchiveParam.RegionCode || this.ArchiveParam.RegionCode === 0) {
      this.User.RegionHasOnlineCommition(this.ArchiveParam.RegionCode).subscribe(res => {
        this.HaveOnlineCommition = res && !this.PRArchiveWithOutAdvertising;
        if (this.HaveOnlineCommition) {
          this.gridHeightPxel = 350;
          this.QuestionLabel = 'آیا مناقصه / مزائده به صورت برخط برگذار میشود؟';
        } else {
          this.gridHeightPxel = 400;
          this.QuestionLabel = '';
        }
      },
        err => {
          this.HaveOnlineCommition = false;
        });
    }
  }

  onSave() {
    this.gridApi.stopEditing();
    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    const prdreqonline = this.HaveOnlineCommition ? this.ProductRequestIsOnline : null;
    if (!this.PRArchiveWithOutAdvertising) {
      // tslint:disable-next-line:max-line-length
      this.ArchiveList.UpdateArchiveDetailAdvertising(rowData, this.ArchiveParam.OrginalModuleCode, prdreqonline, this.ArchiveParam.CostFactorID).subscribe(res => {
        this.startLeftPosition = 535;
        this.startTopPosition = 210;
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.OverHeightPercent = null;
        this.type = 'message-box';
        this.OverMainMinwidthPixel = null;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
    } else {
      this.ArchiveList.UpdatePRAllArchiveDetail(rowData, this.ArchiveParam.CostFactorID).subscribe(res => {
        this.startLeftPosition = 535;
        this.startTopPosition = 210;
        this.btnclicked = true;
        this.HaveMaxBtn = false;
        this.OverHeightPercent = null;
        this.OverMainMinwidthPixel = null;
        this.type = 'message-box';
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
    }
  }

  // onDelete() {
  //   if (this.selectedData) {
  //     this.ArchiveList.DeleteFileFromDB(this.selectedData).subscribe(res => {
  //       this.startLeftPosition = 500;
  //       this.startTopPosition = 100;
  //       this.btnclicked = true;
  //       this.type = 'message-box';
  //       this.alertMessageParams.message = 'حذف با موفقیت انجام شد';
  //     },
  //     err => {
  //       this.startLeftPosition = 500;
  //       this.startTopPosition = 100;
  //       this.btnclicked = true;
  //       this.type = 'message-box';
  //       this.alertMessageParams.message = 'حذف با خطا مواجه شد';
  //     });
  //   }
  // }
  onUpload() {
    if (this.ParentDocumentTypeParam.selectedObject) {
      const promise = new Promise((resolve) => {
        switch (this.ParentDocumentTypeParam.selectedObject) {
          case 38:
          case 45:
          case 46:
          case 47:
          case 58:
          case 59:
          case 139:
          case 149:
            resolve(this.ArchiveParam.CostFactorID ? this.ArchiveParam.CostFactorID : 0); // CostFactorID
            break;
          case 44:
            resolve(this.ArchiveParam.OrderCommitionID ? this.ArchiveParam.OrderCommitionID : 0); // OrderCommitionID
            break;
          case 39:
          case 40:
            resolve(this.ArchiveParam.LastInquiryID ? this.ArchiveParam.LastInquiryID : 0); // InquiryObject.InquiryID
            break;
          case 11: // RFC 53322
          case 155:
            this.WarantyItemClick();
            break;
          case 1387:
            resolve(this.ArchiveParam.ContractID ? this.ArchiveParam.ContractID : 0); // ContractID
            break;
          default:
            resolve(0);
            break;
        }
      }).then((EntityID: number) => {
        if (EntityID > 0) {
          this.type = 'archive-details';
          this.OverMainMinwidthPixel = null;
          this.HaveMaxBtn = false;
          this.OverHeightPercent = null;
          this.HaveHeader = true;
          this.btnclicked = true;
          this.startLeftPosition = 400;
          this.startTopPosition = 40;
          const archiveParam = {
            EntityID: EntityID,
            DocTypeCode: this.ParentDocumentTypeParam.selectedObject,
            ModuleCode: 2730,
            OrginalModuleCode: this.ArchiveParam.OrginalModuleCode,
            // tslint:disable-next-line: max-line-length
            ModuleViewTypeCode: this.ArchiveParam.ModuleViewTypeCode && isDefined(this.ArchiveParam.ModuleViewTypeCode) && this.ArchiveParam.ModuleViewTypeCode !== null ? this.ArchiveParam.ModuleViewTypeCode : null,
            IsReadOnly: (this.ArchiveParam.OrginalModuleCode == 2824 && this.ArchiveParam.ModuleViewTypeCode == 300000 && this.ParentDocumentTypeParam.selectedObject == 44) ? true : false, // 65337
          };
          this.paramObj = archiveParam;
        } else if (EntityID === 0) {
          this.ShowMessageBoxWithOkBtn('شناسه این گروه مستندات مشخص نشده است، خواهشمند است با پشتیبانی تماس بگیرید.');
        }
      });
    } else {
      this.startLeftPosition = 535;
      this.startTopPosition = 210;
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.OverHeightPercent = null;
      this.OverMainMinwidthPixel = null;
      this.type = 'message-box';
      this.alertMessageParams.message = 'لطفا گروه مستند را انتخاب نمایید.';
    }
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.HaveMaxBtn = false;
    this.OverHeightPercent = null;
    this.OverMainMinwidthPixel = null;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  WarantyItemClick() {
    this.type = 'warranty-item';
    this.HaveMaxBtn = false;
    this.OverHeightPercent = null;
    this.HaveHeader = true;
    this.btnclicked = true;
    this.startLeftPosition = 108;
    this.startTopPosition = 45;
    this.PixelWidth = 1140;
    this.OverMainMinwidthPixel = null;
    this.MainMaxwidthPixel = 2000;
    this.PixelHeight = 590;
    this.paramObj = {
      HeaderName: 'اقلام تضمین',
      CostFactorID: this.ArchiveParam.ProductRequestObject.CostFactorID,
      OrderCommitionID: this.ArchiveParam.OrderCommitionID,
      ProductRequestObject: this.ArchiveParam.ProductRequestObject,
      ModuleViewTypeCode: 1100000,
      ModuleCode: 2730,
      currentRegionObject: this.ArchiveParam.currentRegionObject,
      OrginalModuleCode: this.ArchiveParam.OrginalModuleCode,
    };
  }
  onSentToAdForum() {
    if (this.ArchiveParam.CostFactorID) {
      this.ArchiveList.SentToAdForum(this.ArchiveParam.CostFactorID, 2730).subscribe(x => {
        this.type = 'message-box';
        this.OverMainMinwidthPixel = null;
        this.HaveMaxBtn = false;
        this.OverHeightPercent = null;
        this.MainMaxwidthPixel = null;
        this.HaveHeader = true;
        this.alertMessageParams.message = 'با موفقیت به تالار آگهی ارسال شد';
        this.btnclicked = true;
        this.startLeftPosition = 449;
        this.startTopPosition = 87;
      });
    } else {
      this.type = 'message-box';
      this.OverMainMinwidthPixel = null;
      this.HaveMaxBtn = false;
      this.OverHeightPercent = null;
      this.MainMaxwidthPixel = null;
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ارسال با مشکل مواجه شده، لطفا با راهبر سیستم تماس بگیرید';
      this.btnclicked = true;
      this.startLeftPosition = 349;
      this.startTopPosition = 87;
    }
  }
}
