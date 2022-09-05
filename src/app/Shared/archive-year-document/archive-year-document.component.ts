import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { NgSelectConfig } from '../ng-select/public-api';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { TemplateRendererComponent } from '../grid-component/template-renderer/template-renderer.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';

@Component({
  selector: 'app-archive-year-document',
  templateUrl: './archive-year-document.component.html',
  styleUrls: ['./archive-year-document.component.css']
})
export class ArchiveYearDocumentComponent implements OnInit {
  rowData = [];
  rowDataYears: any[];
  selectedFile: File;
  selectedDocumentID: number;
  selectedData;
  columnDefs: any;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: any;
  ArchiveListApi;
  PopUpType = '';
  HaveHeader;
  isClicked = false;
  HaveMaxBtn = true;
  startLeftPosition = 307;
  startTopPosition = 10;
  PopupParam;
  ActorID;
  PriceListTopicCode;
  HasArchiveAccess;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    MinWidth: '130px',
  };
  alertMessageParams = { HaveOkBtn: true, message: '' };
  MainMaxwidthPixel;
  OverMainMinwidthPixel;
  ModuleCode;

  @ViewChild('fileExtCell') fileExtCell: TemplateRef<any>;
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;

  constructor(
    private router: Router,
    private ArchiveList: ArchiveDetailService,
    private PriceList: PriceListService,
    config: NgSelectConfig,
    private Users: UserSettingsService,
    private route: ActivatedRoute,
    private Workflow: WorkflowService
  ) {
    config.notFoundText = 'موردی یافت نشد';
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    const promise = new Promise<void>((resolve, reject) => {
      this.Users.GetModulOPByUser(this.ModuleCode).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
            case 6:
            case 16:
              this.HasArchiveAccess = true;
              break;
            default:
              break;
          }
        });
        resolve();
      });
    }).then(() => {
        this.ArchiveList.GetSystemArchiveDetailBydDoctypeCode().subscribe(res => {
          if (res) {
            this.rowData = res;
          }
        });
      this.Users.GetActiveActorID().subscribe(res => {
        if (res) {
          this.ActorID = res.ActorID;
        }
      });
    });
  }

  onDisplay(data) {
    if (this.selectedDocumentID === undefined || this.selectedDocumentID === 0) {
      alert('ردیفی انتخاب نشده است');
    } else {
      this.ArchiveList.DisplayFileFromServer(this.selectedData).subscribe(res => {
        this.ArchiveList.downloadFile(res);
      });
    }
  }
  onDoubleDisplay(event) {
    if (this.selectedDocumentID === undefined || this.selectedDocumentID === 0) {
      alert('ردیفی انتخاب نشده است');
    } else {
      this.ArchiveList.DisplayFileFromServer(this.selectedData).subscribe(res => {
        this.ArchiveList.downloadFile(res);
      });
    }
  }

  onRowClicked(event: { data: { DOCUMENT_ID: number; }; }) {
    this.selectedDocumentID = event.data.DOCUMENT_ID;
    this.selectedData = event.data;
  }

  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDefs = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
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
        width: 400,
        resizable: true,
        editable: true
      },
    ];
  }
  onGridReady(event) {
    this.ArchiveListApi = event.api;
  }
  onRemove() {
    if (this.selectedData) {
      this.ArchiveList.DeleteFileFromDB(this.selectedData, 2918).subscribe(res => {
        this.PopUpType = 'message-box';
        this.HaveHeader = true;
        this.MainMaxwidthPixel = null;
        this.OverMainMinwidthPixel = null;
        this.alertMessageParams.message = 'حذف با موفقیت انجام شد';
        this.isClicked = true;
        this.startLeftPosition = 449;
        this.startTopPosition = 87;
        this.ArchiveList.GetSystemArchiveDetailBydDoctypeCode().subscribe(ress => {
          if (ress) {
            this.rowData = ress;
          }
        });
      });
    }
  }
  onDocArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = {
      EntityID: '2',
      TypeCodeStr: '582-',
      DocTypeCode: 582,
      ModuleCode: 2918,
      IsReadOnly: false
    };
  }
  popupclosed(event) {
    this.isClicked = false;
  }
  PopupOutPutAction(event) {
  }
  onPopupOutPutParam(event) {
    let DataList = [];
    this.ArchiveListApi.forEachNode(element => {
      DataList.push(element.data);
    });
    event.forEach(element => {
      if (!DataList.find(x => x.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID)) {
        DataList.push(element);
      }
    });
    this.rowData = DataList;
  }
}