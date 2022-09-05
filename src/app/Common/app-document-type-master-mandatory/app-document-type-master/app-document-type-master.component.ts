import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { GridOptions } from 'ag-grid-community';
import { of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
selector : 'app-document-type-master',
templateUrl: './app-document-type-master.component.html',
styleUrls: ['./app-document-type-master.component.css']
})

export class DocumentTypeMasterComponent implements OnInit {
    private gridApi;
    MasterDocumentTypeColDef: any;
    @Output() DocumentTypeComponentClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
    rowData = [];
    Dto: any[];
    ModuleCode: number;
    alertMessageParams = { HaveOkBtn: true, message: '' };
    btnclicked = false;
    HaveHeader: boolean;
    type: string;
    BoxDevHeight: number;
    HasSave: boolean;
    private sub: any;
    constructor(private Doc_Type_srv: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService ) {
      this.HasSave = false;
        this.BoxDevHeight = 80;
        this.sub = this.route.params.subscribe(params => {
          this.ModuleCode = +params['ModuleCode'];
        });
    }
    MasterDocumentGridReady(event) {
      this.gridApi = event.api;
    }
    ngOnInit() {
      this.users.CheckAdmin().subscribe((res: boolean) => {
        this.HasSave = res;
        this.MasterDocumentTypeColDef = [
          {
            headerName: 'ردیف',
            field: 'ItemNo',
            width: 100,
            resizable: true
          },
          {
            headerName: 'کد نوع مستند',
            field: 'DocumentTypeCode',
            width: 100,
            resizable: true,
            editable: false,
          },
          {
            headerName: 'نام نوع مستند ',
            field: 'DocumentTypeName',
            width: 250,
            editable: res,
            resizable: true
          },
      ];
      });
        this.Doc_Type_srv.GetMasterDocumentList().subscribe((res: any) => {
            this.rowData = res;
        });
    }
    closeModal() {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
    Save() {
      this.gridApi.stopEditing();
      this.Dto = [];
      this.rowData = [];

      this.gridApi.forEachNode(res => {
        this.rowData.push(res.data);
      });
      this.rowData.forEach(res => {
        const MasterDocumentType = {
          DocumentTypeName : res.DocumentTypeName,
          DocumentTypeCode : res.DataFetchedFromServer ? res.DocumentTypeCode : 0,
          ParentDocumentTypeCode : res.ParentDocumentTypeCode,
          FillMandatories: false,
        };
        this.Dto.push(MasterDocumentType);
      });
      this.Doc_Type_srv.SetMasterDocumentList(this.Dto, this.ModuleCode).subscribe(res => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
        this.Doc_Type_srv.GetMasterDocumentList().subscribe((res2: any) => {
          this.rowData = [];
          this.rowData = res2;
      });
      },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      });
    }
    popupclosed() {
      this.btnclicked = false;
    }
}
