import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';

@Component({
  selector: 'app-corporate-personnel-type',
  templateUrl: './corporate-personnel-type.component.html',
  styleUrls: ['./corporate-personnel-type.component.css']
})
export class CorporatePersonnelTypeComponent implements OnInit {
  private gridApi;
  MasterDocumentTypeColDef: any;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  PersonnelTypeColDef;
  constructor(private Service: CommonService,
  private route: ActivatedRoute,
  private router: Router,
  private users: UserSettingsService ) {
    this.HasSave = false;
      this.BoxDevHeight = 80;
      this.sub = this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
  }
  GridReady(event) {
    this.gridApi = event.api;
  }
  ngOnInit() {
    this.users.CheckAdmin().subscribe((res: boolean) => {
      this.HasSave = res;
      this.PersonnelTypeColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'کد نوع شخص',
        field: 'PersonnelTypeCode',
        width: 100,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نام نوع شخص ',
        field: 'PersonnelTypeName',
        width: 250,
        editable: res,
        resizable: true
      },
    ];
    });
    this.Service.GetCorporatePersonnelType().subscribe((res: any) => {
      this.rowData = res;
    });
  }
  closeModal() {
    this.Closed.emit(true);
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
        PersonnelTypeCode : res.PersonnelTypeCode,
        PersonnelTypeName : res.PersonnelTypeName,
      };
      this.Dto.push(MasterDocumentType);
    });
    this.Service.SaveCorporatePersonnelType(this.Dto, this.ModuleCode).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      this.Service.GetCorporatePersonnelType().subscribe((res2: any) => {
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
