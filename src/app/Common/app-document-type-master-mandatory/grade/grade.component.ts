import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {

  private gridApi;
  ModuleCode: number;
  type: string;
  Dto: any[];
  BoxDevHeight: number;
  rowData = [];
  HasSave: boolean;
  private sub: any;
  GradeColDef: any;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  btnclicked = false;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  MainwidthPC: string;
  widthPX: string;

  constructor(private GradeService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService ) {
      this.HasSave = false;
        this.sub = this.route.params.subscribe(params => {
          this.ModuleCode = +params['ModuleCode'];
        });
  }

  GradeGridReady(event) {
    this.gridApi = event.api;
  }

  ngOnInit() {
    this.users.CheckAdmin().subscribe((res: boolean) => {
      this.HasSave = res;
      this.HaveMaxBtn = false;
      this.GradeColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد ',
          field: 'GradeCode',
          width: 100,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام ',
          field: 'GradeName',
          width: 250,
          editable: res,
          resizable: true
        },
    ];
    });
      this.GradeService.GetAllGradeData().subscribe((res: any) => {
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
        GradeCode : res.GradeCode,
        GradeName : res.GradeName,
      };
      this.Dto.push(FielLst);
    });
      this.GradeService.SaveGradeDataList(this.Dto, this.ModuleCode).subscribe((res: any) => {
        this.rowData = res;
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = false;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
  }
}
