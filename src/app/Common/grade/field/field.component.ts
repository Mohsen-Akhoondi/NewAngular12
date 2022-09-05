import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  private gridApi;
  ModuleCode: number;
  type: string;
  Dto: any[];
  BoxDevHeight: number;
  rowData = [];
  HasSave: boolean;
  private sub: any;
  FieldColDef: any;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  btnclicked = false;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  MainwidthPC: string;
  widthPX: string;

  constructor(private FieldService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService ) {
      this.HasSave = false;
        this.sub = this.route.params.subscribe(params => {
          this.ModuleCode = +params['ModuleCode'];
        });
  }

  FieldGridReady(event) {
    this.gridApi = event.api;
  }

  ngOnInit() {
    this.users.CheckAdmin().subscribe((res: boolean) => {
      this.HasSave = res;
      this.HaveMaxBtn = false;
      this.FieldColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد رشته',
          field: 'FieldCode',
          width: 100,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام رشته',
          field: 'FieldName',
          width: 250,
          editable: res,
          resizable: true
        },
    ];
    });
      this.FieldService.GetAllFieldData().subscribe((res: any) => {
          this.rowData = res;
    });
  }
  popupclosed() {
    this.btnclicked = false;
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
      const FielLst = {
        FieldCode : res.FieldCode,
        FieldName : res.FieldName,
      };
      this.Dto.push(FielLst);
    });
      this.FieldService.SaveFieldDataList(this.Dto, this.ModuleCode).subscribe((res: any) => {
        this.rowData = res;
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = false;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
  }
}
