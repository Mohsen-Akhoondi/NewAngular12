import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { of } from 'rxjs';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-advertising-archive',
  templateUrl: './advertising-archive.component.html',
  styleUrls: ['./advertising-archive.component.css']
})
export class AdvertisingArchiveComponent implements OnInit {
  @Output() AdvertisingArchiveClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() ArchiveParam: any;
  rowData;
  DocumentTypeNameList = [];
  selectedFile: File;
  selectedDocumentID: number;
  selectedData: { DOCUMENT_ID: number; };
  selectedDocumentTypeCode;
  selectedNote;
  columnDefs: any;
  DocTypecolumnDef;
  ShowAdvertising = false;
  gridApi: any;
  IsDown = false;
  gridColumnApi: any;
  defaultColDef: any;
  UseInAdvertising = false;
  @ViewChild('fileExtCell') fileExtCell: TemplateRef<any>;
  @ViewChild('IsDocTypeForced') IsDocTypeForced: TemplateRef<any>;
  @ViewChild('IsDocType') IsDocType: TemplateRef<any>;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  type: string;
  HaveHeader = true;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  isClicked = false;
  startLeftPosition: number;
  startTopPosition: number;
  HasArchiveAccess = true;
  HasCheck = false;
  DocTypeData;
  IsAutoGenerate = false;
  constructor(
    private router: Router,
    private ArchiveList: ArchiveDetailService,
    private DealsHall: DealsHallService,
    private ComonService: CommonService

  ) {
    this.defaultColDef = { resizable: false };

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
    if (this.ArchiveParam.HasCheck) {
      this.HasCheck = this.ArchiveParam.HasCheck;
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
        headerName: 'توضیحات',
        field: 'NOTE',
        width: 300,
        resizable: true
      }
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
          headerName: 'نوع مستند ',
          field: 'DocumentTypeName',
          editable: false,
          width: 300,
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
        }
      ];
    } else {
      this.DocTypecolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'نوع مستند ',
          field: 'DocumentTypeName',
          editable: false,
          width: 300,
          resizable: true
        },
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
      this.HaveHeader = true;
      this.alertMessageParams.message = 'اطلاعات را کامل وارد کنید';
      this.isClicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
    } else {
      this.DealsHall.CheckAdvertisingExpireDate(this.ArchiveParam.EntityID).subscribe(CheckRes => {
        if (!CheckRes) {
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'زمان بارگذاری و ارسال اسناد با توجه به مهلت ارائه اسناد پایان یافته است ';
          this.isClicked = true;
          this.startLeftPosition = 449;
          this.startTopPosition = 87;
        } else {
          this.IsDown = false;
          const ArchiveDetailCodeStr = this.ArchiveParam.TypeCodeStr + this.ArchiveParam.EntityID.toString();
          const uploadData = new FormData();
          uploadData.append('AFile', this.selectedFile, this.selectedFile.name);
          uploadData.append('ArchiveDetailCodeStr', ArchiveDetailCodeStr);
          uploadData.append('Note', this.selectedNote);
          uploadData.append('DocumentTypeCode', this.selectedDocumentTypeCode);
          uploadData.append('ModuleCode', this.ArchiveParam.ModuleCode);
          uploadData.append('UseInAdvertising', this.UseInAdvertising.toString());
          uploadData.append('PRRegionCode', this.ArchiveParam.PRRegionCode);
          this.DealsHall.UploadArchiveDoc(uploadData).subscribe(res => {
            this.IsDown = true;
            this.rowData = this.DealsHall.GetArchiveDetailList(ArchiveDetailCodeStr + '-' + this.selectedDocumentTypeCode);
          },
            err => {
              this.IsDown = true;
            });
        }
      });
    }
  }

  onDisplay() {
    if (this.selectedDocumentID === undefined || this.selectedDocumentID === 0) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'فایلی انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
    } else {
      this.ArchiveList.DisplayFileFromServer(this.selectedData).subscribe(res => {
        this.ArchiveList.downloadFile(res);
      });
    }
  }


  onDelete(event: any) {
    if (this.selectedDocumentID === undefined || this.selectedDocumentID === 0) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'فایلی انتخاب نشده است';
      this.isClicked = true;
      this.startLeftPosition = 449;
      this.startTopPosition = 87;
    } else {
      this.IsDown = false;
      const ArchiveDetailCode = this.ArchiveParam.TypeCodeStr + this.ArchiveParam.EntityID.toString();
      this.ArchiveList.DeleteFileFromDB(this.selectedData, this.ArchiveParam.ModuleCode).subscribe(res => {
        this.IsDown = true;
        this.rowData = this.DealsHall.GetArchiveDetailList(ArchiveDetailCode + '-' + this.selectedDocumentTypeCode);
      },
        err => {
          this.IsDown = true;
        });
    }
  }
  onRowClicked(event: { data: { DOCUMENT_ID: number; }; }) {
    this.selectedDocumentID = event.data.DOCUMENT_ID;
    this.selectedData = event.data;
  }
  close() {
    this.AdvertisingArchiveClosed.emit(true);
  }

  fileExt(event: any) {
  }
  popupclosed() {
    this.isClicked = false;
  }
  getDocumentTypeList(): void {
    this.IsDown = false;
    const DocumentTypeCodeList = this.ArchiveParam.DocumentTypeCodeList ?
      this.ArchiveParam.DocumentTypeCodeList : null;
    this.ArchiveList.GetDocumentTypeList(
      this.ArchiveParam.DocTypeCode,
      DocumentTypeCodeList,
      this.ArchiveParam.ArchiveDetailCode).subscribe(
        res => {
          this.IsDown = true;
          this.DocTypeData = res;
          if (this.ArchiveParam.MandatoryDocTypeList) {
            this.ArchiveParam.MandatoryDocTypeList.forEach(element => {
              // tslint:disable-next-line:no-unused-expression
              this.DocTypeData.forEach(item => {
                if (item.DocumentTypeCode === element.DocumentTypeCode) {
                  item.IsValid = true;
                  // tslint:disable-next-line: max-line-length
                  item.Note = element.DealMethodName + ' - ' + element.DealTypeName + ' - ' + element.ContractTypeName + ' - ' + element.RegionName + ' - ' + element.FinYearCode;
                }
              });
            });
          }
        },
        err => {
          this.IsDown = true;
        }
      );
  }

  onDocTypeRowClicked(event: any) {
    this.selectedDocumentTypeCode = event.data.DocumentTypeCode;
    const ArchiveDetailCodeStr = this.ArchiveParam.TypeCodeStr + this.ArchiveParam.EntityID.toString();
    this.rowData = this.DealsHall.GetArchiveDetailList(ArchiveDetailCodeStr + '-' + this.selectedDocumentTypeCode);
    this.UseInAdvertising = event.data.UseInAdvertising;
    this.ComonService.IsAutoGenerate(this.selectedDocumentTypeCode).subscribe(res => {
      this.IsAutoGenerate = res;
    });
  }
  OnCheckBoxChange(event) {
    this.UseInAdvertising = event;
  }
}
