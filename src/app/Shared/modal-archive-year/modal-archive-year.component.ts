import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { NgSelectConfig } from '../ng-select/public-api';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { TemplateRendererComponent } from '../grid-component/template-renderer/template-renderer.component';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-modal-archive-year',
  templateUrl: './modal-archive-year.component.html',
  styleUrls: ['./modal-archive-year.component.css']
})
export class ModalArchiveYearComponent implements OnInit {
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
  PriceListTopicParams = {
    bindLabelProp: 'PriceListTopicCodeName',
    bindValueProp: 'PriceListTopicID',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    MinWidth: '180px',
  };

  @ViewChild('fileExtCell') fileExtCell: TemplateRef<any>;
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;

  constructor(
    private router: Router,
    private ArchiveList: ArchiveDetailService,
    private PriceList: PriceListService,
    config: NgSelectConfig,
    private Users: UserSettingsService
  ) {
    config.notFoundText = 'موردی یافت نشد';
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  ngOnInit() {
    this.PriceList.GetPriceListTopics(true).subscribe(res => {
      this.rowDataYears = res;
      for (const i of res) {
        i.PriceListTopicCodeName = i.PriceListTopicCode + ' - ' + i.PriceListTopicName;
      }
      this.PriceListTopicCode =  res[0].PriceListTopicCode;
      this.PriceListTopicParams.selectedObject = res[0].PriceListTopicID;
      this.ArchiveList.GetArchiveDetailByFinYear(this.PriceListTopicParams.selectedObject).subscribe(res => {
        if (res) {
          this.rowData = res;
        }
      });
    });
    this.Users.GetActiveActorID().subscribe(res => {
      if (res) {
        this.ActorID = res.ActorID;
      }
    })
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

  onChange(event) {
    this.ArchiveList.GetArchiveDetailByFinYear(this.PriceListTopicParams.selectedObject).subscribe(res => {
      if (res) {
        this.rowData = res;
      }
    });
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
  onSave() {

  }
  onDocArchiveClick() {
    this.PopUpType = 'archive-details';
    this.HaveHeader = true;
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 307;
    this.startTopPosition = 10;
    this.PopupParam = {
      EntityID: this.ActorID,
      TypeCodeStr: '1-',
      DocTypeCode: 1,
      ModuleCode: 2651,
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
      if (!DataList.find(x => x.FileNameWithoutExtension === element.FileNameWithoutExtension)) {
        DataList.push(element);
      }
    });
    this.rowData = DataList;
  }
}
