import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { TemplateRendererComponent } from '../grid-component/template-renderer/template-renderer.component';
import { of } from 'rxjs';
import { CheckboxFieldEditableComponent } from '../checkbox-field-editable/checkbox-field-editable.component';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { isUndefined } from 'util';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-modal-archive',
  templateUrl: './modal-archive.component.html',
  styleUrls: ['./modal-archive.component.css']
})
export class ModalArchiveComponent implements OnInit {
  @Output() ModalArchiveClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Input() ArchiveParam: any;
  rowData;
  OverHeightPercent;
  DocumentTypeNameList = [];
  OverMainMinwidthPixel;
  selectedFile: File;
  selectedDocumentID: number;
  selectedData: { DOCUMENT_ID: number; };
  selectedDocumentTypeCode;
  selectedDocumentTypeName;
  MultiParentMode;
  SelectedDocumentTypeParent;
  selectedNote;
  columnDefs: any;
  DocTypecolumnDef;
  ShowAdvertising = false;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  UseInAdvertising = false;
  GridListApi;
  @ViewChild('fileExtCell') fileExtCell: TemplateRef<any>;
  @ViewChild('IsDocTypeForced') IsDocTypeForced: TemplateRef<any>;
  @ViewChild('IsUploadFiles') IsUploadFiles: TemplateRef<any>;
  @ViewChild('IsDocType') IsDocType: TemplateRef<any>;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  type: string;
  HaveHeader = true;
  paramObj;
  HaveMaxBtn = false;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  isClicked = false;
  startLeftPosition: number;
  startTopPosition: number;
  HasArchiveAccess = false;
  HasCheck = false;
  DocTypeData;
  ParentDocumentTypeName;
  MainMaxwidthPixel;
  RegionCode: number;
  ModuleCode;
  IsAutoGenerate = false;
  constructor(
    private router: Router,
    private ArchiveList: ArchiveDetailService,
    private Route: ActivatedRoute,
    private CommonService: CommonServices,
    private ComonService: CommonService

  ) {
    this.defaultColDef = { resizable: false };
    this.Route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.rowData = of([]);
    this.DocTypeData = of([]);
    if (!this.ArchiveParam.ModuleCode) {
      alert('کد ماژول را وارد کنید');
      this.close();
      return;
    }
    switch (this.ArchiveParam.ModuleCode) {
      case 2730:
      case 2793:
      case 2939:
      case 2951:
      case 3094:
        // tslint:disable-next-line: max-line-length
        this.ShowAdvertising = this.ArchiveParam.ModuleCode === 2730 && this.ArchiveParam.ModuleViewTypeCode && this.ArchiveParam.ModuleViewTypeCode !== null && !isUndefined(this.ArchiveParam.ModuleViewTypeCode) && this.ArchiveParam.ModuleViewTypeCode === 131 ? false : !this.ArchiveParam.IsReadOnly;
        this.HasArchiveAccess = !this.ArchiveParam.IsReadOnly;
        break;
      case 2785:
      case 2784:
      case 2918:
      case 2921:
      case 2939:
      case 2951:
      case 1646:
        this.HasArchiveAccess = true;
        break;
      case 2516:
      case 3037:
        {
          if (this.ArchiveParam.IsReadOnly) {
            this.HasArchiveAccess = false;
          } else {
            this.HasArchiveAccess = true;
          }
        }
        break;
      case 2739:
        this.ShowAdvertising = true;
        this.HasArchiveAccess = !this.ArchiveParam.IsReadOnly;
        break;
      case 2824:
        this.HasArchiveAccess = false;
        break;
      default:
        this.ArchiveList.HasArchiveAccess(this.ArchiveParam.ModuleCode).
          subscribe(res => {
            this.HasArchiveAccess = res;
            if (this.ArchiveParam.IsReadOnly) {
              this.HasArchiveAccess = false;
            }
          });
        break;
    }
    if (this.ArchiveParam.HasCheck) {
      this.HasCheck = this.ArchiveParam.HasCheck;
    }
    if (this.ArchiveParam.RegionCode) {
      this.RegionCode = this.ArchiveParam.RegionCode;
    }
    if (this.ArchiveParam.ModuleCode === 2730 && this.ArchiveParam.ModuleViewTypeCode === 38) {
      this.UseInAdvertising = true; // RFC 58102
    }

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
    if (this.ArchiveParam.MultiParentDocType) {
      this.getListDocumentType();
      this.MultiParentMode = true;
    } else {
      this.getDocumentTypeList();
      this.MultiParentMode = false;
    }
    if ((this.ArchiveParam.ModuleCode === 2730 && this.ArchiveParam.ModuleViewTypeCode === 156)
      || (this.ArchiveParam.ModuleCode === 2901 && this.ArchiveParam.ModuleViewTypeCode === 2)) {
      this.HasArchiveAccess = this.ShowAdvertising = false;
    }
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
        headerName: 'توضیحات',
        field: 'NOTE',
        width: 300,
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
        editable: false,
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsDocType
        },
      },
      {
        headerName: 'وضعیت',
        field: 'DocumentStatusName',
        width: 100,
        resizable: true
      },
    ];

    if (this.HasCheck) {
      this.DocTypecolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'کد نوع مستند',
          field: 'DocumentTypeCode',
          editable: false,
          width: 100,
          resizable: true
        }, // RFC 61994
        {
          headerName: 'نوع مستند ',
          field: 'DocumentTypeName',
          editable: false,
          width: 300,
          resizable: true
        },
        // {
        //   headerName: 'گروه',
        //   field: 'ParentDocumentTypeName',
        //   width: 150,
        //   resizable: true
        // },
        {
          headerName: ' اجباری',
          field: 'IsValid',
          width: 100,
          resizable: true,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          editable: false,
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
            ngTemplate: this.IsDocTypeForced
          },
        },
        {
          headerName: 'بارگذاری شده',
          field: 'HasFiles',
          width: 100,
          resizable: true,
          cellStyle: function (params) {
            return { 'text-align': 'center', 'font-size': '12.5px', 'color': 'green', 'font-weight': 'bold' };
          },
          editable: false,
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            if (params.value) {
              return 'بارگزاری شده';
            } else {
              return 'بارگزاری نشده';
            }
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsUploadFiles
          },
        },
        {
          headerName: 'توضیحات ',
          field: 'Note',
          editable: false,
          width: 300,
          resizable: true
        },
      ];
    } else {
      this.DocTypecolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد نوع مستند',
          field: 'DocumentTypeCode',
          editable: false,
          width: 100,
          resizable: true
        },
        {
          headerName: 'نوع مستند ',
          field: 'DocumentTypeName',
          editable: false,
          width: 350,
          resizable: true
        },
        {
          headerName: ' اجباری',
          field: 'IsValid',
          width: 100,
          resizable: true,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          editable: false,
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
            ngTemplate: this.IsDocTypeForced
          },
        },
        // {
        //   headerName: 'گروه',
        //   field: 'ParentDocumentTypeName',
        //   width: 350,
        //   resizable: true
        // },
      ];
    }
  }
  onFileChanged(event: { target: { files: File[] } }) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    if (this.selectedFile === null || this.selectedFile === undefined ||
      this.selectedDocumentTypeCode === null || this.selectedDocumentTypeCode === undefined) {
      this.type = 'message-box';
      this.OverHeightPercent = null;
      this.HaveMaxBtn = false;
      this.HaveHeader = true;
      this.MainMaxwidthPixel = null;
      this.OverMainMinwidthPixel = null;
      this.alertMessageParams.message = 'اطلاعات را کامل وارد کنید';
      this.isClicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
    } else {
      if (this.IsAutoGenerate) {
        this.alertMessageParams.message = 'مجوز بارگزاری این مستند را ندارید.';
      } else {
        const ArchiveDetailCodeStr = this.SelectedDocumentTypeParent.toString() + '-' + this.ArchiveParam.EntityID.toString();
        const uploadData = new FormData();
        uploadData.append('AFile', this.selectedFile, this.selectedFile.name);
        uploadData.append('ArchiveDetailCodeStr', ArchiveDetailCodeStr);
        uploadData.append('Note', this.selectedNote);
        uploadData.append('DocumentTypeCode', this.selectedDocumentTypeCode);
        uploadData.append('ModuleCode', this.ArchiveParam.ModuleCode);
        uploadData.append('UseInAdvertising', this.UseInAdvertising.toString());
        uploadData.append('OrginalModuleCode', this.ArchiveParam.OrginalModuleCode ? this.ArchiveParam.OrginalModuleCode :
          (this.ArchiveParam.ModuleCode ? this.ArchiveParam.ModuleCode : null));
        // برای بارگذاری اطلاعات تکمیلی حقیقی و حقوقی اضافه شد
        this.ArchiveList.UploadFileToServer(uploadData).subscribe(res => {
          if (this.ArchiveParam.MultiParentDocType) {
            this.getListDocumentType();
          } else {
            this.getDocumentTypeList();
          }
          this.rowData = this.ArchiveList.GetArchiveDetailList(ArchiveDetailCodeStr + '-' + this.selectedDocumentTypeCode);
        },
          err => {
            this.type = 'message-box';
            this.OverHeightPercent = null;
            this.HaveMaxBtn = false;
            this.HaveHeader = true;
            this.MainMaxwidthPixel = null;
            this.OverMainMinwidthPixel = null;
            this.alertMessageParams.message = 'بارگذاری با شکست مواجه شد.';
            this.isClicked = true;
            this.startLeftPosition = 449;
            this.startTopPosition = 87;
          });
      }
    }
  }
  onDisplay() {
    if (!this.selectedDocumentID || this.selectedDocumentID === 0) {
      this.type = 'message-box';
      this.OverHeightPercent = null;
      this.HaveMaxBtn = false;
      this.MainMaxwidthPixel = null;
      this.OverMainMinwidthPixel = null;
      this.HaveHeader = true;
      this.alertMessageParams.message = 'فایلی انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 544;
      this.startTopPosition = 223;
    } else {
      this.ArchiveList.DisplayFileFromServer(this.selectedData).subscribe(res => {
        if (res.FileExtension === '.pdf') {
          this.type = 'pdf-viewer';
          this.OverHeightPercent = null;
          this.HaveMaxBtn = false;
          this.HaveHeader = true;
          this.isClicked = true;
          this.startLeftPosition = 40;
          this.startTopPosition = 0;
          this.MainMaxwidthPixel = 1300;
          this.OverMainMinwidthPixel = 1295;
          this.paramObj = {
            HeaderName: 'مشاهده ' + this.selectedDocumentTypeName,
            PDFSrc: res.FileBase64,
            FileName: res.FileName,
            OrderCommitionID: null,
            HaveEstimate: false,
            HaveSign: false,
            CostFactorID: null,
            RegionCode: null,
            PDFSignersInfo: res.PDFSignersInfo,
            HasDelBtn: false,
            IsArticle18: false,
          };
        } else {
          this.ArchiveList.downloadFile(res);
        }
      });
    }
  }
  onDisplayAll() {
    let ParentsCodeList = [];
    if (this.MultiParentMode) {
      ParentsCodeList = this.ArchiveParam.DocTypeCodeList;
    } else {
      ParentsCodeList.push(this.ArchiveParam.DocTypeCode);
    }
    this.ArchiveList.GetAllFileDocNames(this.ArchiveParam.EntityID, ParentsCodeList).subscribe(res => {
      this.type = 'file-viwer-page';
      this.HaveHeader = true;
      this.isClicked = true;
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
    // this.ArchiveList.GetAllImgPDFFilesByArchiveDetailCode(this.ArchiveParam.EntityID.toString(), ParentsCodeList).subscribe(res => {
    //   this.type = 'file-viwer-page';
    //   this.HaveHeader = true;
    //   this.isClicked = true;
    //   this.startLeftPosition = 15;
    //   this.OverHeightPercent = 97;
    //   this.startTopPosition = 5;
    //   this.HaveMaxBtn = true;
    //   this.MainMaxwidthPixel = 1300;
    //   this.OverMainMinwidthPixel = 1320;
    //   this.paramObj = {
    //     HeaderName: 'مشاهده ',
    //     FileList: res
    //   };
    // });
  }
  onDelete(event: any) {
    if (!this.selectedDocumentID || this.selectedDocumentID === 0) {
      this.type = 'message-box';
      this.OverHeightPercent = null;
      this.HaveMaxBtn = false;
      this.MainMaxwidthPixel = null;
      this.HaveHeader = true;
      this.alertMessageParams.message = 'فایلی انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 544;
      this.startTopPosition = 223;
    } else {
      const ArchiveDetailCode = this.SelectedDocumentTypeParent.toString() + '-' + this.ArchiveParam.EntityID.toString();
      this.ArchiveList.DeleteFileFromDB(this.selectedData, this.ArchiveParam.ModuleCode).subscribe(res => {
        this.rowData = this.ArchiveList.GetArchiveDetailList(ArchiveDetailCode + '-' + this.selectedDocumentTypeCode);
      });
    }
  }
  onRowClicked(event: { data: { DOCUMENT_ID: number; }; }) {
    this.selectedDocumentID = event.data.DOCUMENT_ID;
    this.selectedData = event.data;
  }
  close() {
    this.ModalArchiveClosed.emit(true);
    let dataList = [];
    this.GridListApi.forEachNode(element => {
      dataList.push(element.data);
    });
    this.PopupOutPut.emit(dataList);
  }
  fileExt(event: any) {
  }
  popupclosed() {
    this.isClicked = false;
  }
  getDocumentTypeList(): void {
    const DocumentTypeCodeList = this.ArchiveParam.DocumentTypeCodeList ?
      this.ArchiveParam.DocumentTypeCodeList : null;
    this.ArchiveList.GetDocumentTypeList(
      this.ArchiveParam.DocTypeCode,
      DocumentTypeCodeList,
      this.ArchiveParam.EntityID,
      this.RegionCode).subscribe(
        res => {
          if (res[0] && res[0] !== undefined) {
            this.ParentDocumentTypeName = res[0].ParentDocumentTypeName;
          }
          this.DocTypeData = res;
          if (this.ArchiveParam.MandatoryDocTypeList) {
            this.ArchiveParam.MandatoryDocTypeList.forEach(element => {
              // tslint:disable-next-line:no-unused-expression
              this.DocTypeData.forEach(item => {
                if (item.DocumentTypeCode === element.DocumentTypeCode) {
                  item.IsValid = true;
                  // tslint:disable-next-line: max-line-length
                  item.Note = (element.DealMethodName ? element.DealMethodName + ' - ' : '') +
                    (element.DealTypeName ? element.DealTypeName + ' - ' : '') +
                    (element.ContractTypeName ? element.ContractTypeName + ' - ' : '') +
                    (element.RegionName ? element.RegionName + ' - ' : '') +
                    (element.FinYearCode ? element.FinYearCode : '');
                }
              });
            });
            this.DocTypeData.sort((a, b) => {
              if (a.IsValid && b.IsValid) {
                return a.HasFiles ? -1 : b.HasFiles ? 1 : 0;
              } else {
                return a.IsValid ? -1 : b.IsValid ? 1 : 0;
              }
            });
          }
        }
      );
  }
  getListDocumentType(): void {
    this.ArchiveList.GetListDocumentType(this.ArchiveParam.DocTypeCodeList).subscribe(
      res => {
        this.DocTypeData = res;

      }
    );
  }
  onDocTypeRowClicked(event: any) {
    this.selectedDocumentID = null;
    this.selectedDocumentTypeCode = event.data.DocumentTypeCode;
    this.selectedDocumentTypeName = event.data.DocumentTypeName;
    this.SelectedDocumentTypeParent = event.data.ParentDocumentTypeCode;
    const ArchiveDetailCodeStr = this.SelectedDocumentTypeParent.toString() + '-' + this.ArchiveParam.EntityID.toString();
    this.rowData = this.ArchiveList.GetArchiveDetailList(ArchiveDetailCodeStr + '-' + this.selectedDocumentTypeCode);
    this.ComonService.IsAutoGenerate(this.selectedDocumentTypeCode).subscribe((res: any) => {
      this.IsAutoGenerate = res;
    });
  }
  OnCheckBoxChange(event) {
    this.UseInAdvertising = event;
  }
  onSentToAdForum() {
    if (this.ArchiveParam.EntityID) {
      this.ArchiveList.SentToAdForum(this.ArchiveParam.EntityID, this.ArchiveParam.ModuleCode).subscribe(x => {
        this.type = 'message-box';
        this.OverHeightPercent = null;
        this.HaveMaxBtn = false;
        this.MainMaxwidthPixel = null;
        this.HaveHeader = true;
        this.alertMessageParams.message = 'با موفقیت به تالار آگهی ارسال شد';
        this.isClicked = true;
        this.startLeftPosition = 449;
        this.startTopPosition = 87;
      });
    } else {
      this.type = 'message-box';
      this.OverHeightPercent = null;
      this.HaveMaxBtn = false;
      this.MainMaxwidthPixel = null;
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ارسال با مشکل مواجه شده، لطفا با راهبر سیستم تماس بگیرید';
      this.isClicked = true;
      this.startLeftPosition = 349;
      this.startTopPosition = 87;
    }
  }
  onGridReady(event) {
    this.GridListApi = event.api;
  }
}
