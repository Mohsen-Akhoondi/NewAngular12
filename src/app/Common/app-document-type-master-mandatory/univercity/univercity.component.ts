import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-univercity',
  templateUrl: './univercity.component.html',
  styleUrls: ['./univercity.component.css']
})
export class UnivercityComponent implements OnInit {


  private gridApi;
  ModuleCode: number;
  type: string;
  Dto: any[];
  BoxDevHeight: number;
  rowData = [];
  HasSave: boolean;
  private sub: any;
  InvestTypeColDef: any;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  btnclicked = false;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  MainwidthPC: string;
  widthPX: string;

  constructor(private UnivercityService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService ) {
      this.HasSave = false;
        this.sub = this.route.params.subscribe(params => {
          this.ModuleCode = +params['ModuleCode'];
        });
  }

  InvestTypeGridReady(event) {
    this.gridApi = event.api;
  }

  ngOnInit() {
    this.users.CheckAdmin().subscribe((res: boolean) => {
      this.HasSave = res;
      this.HaveMaxBtn = false;
      this.MainwidthPC = '200';
      this.widthPX = '500';
      this.InvestTypeColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد',
          field: 'UniversityCode',
          width: 100,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام',
          field: 'UniversityName',
          width: 250,
          editable: res,
          resizable: true
        },
    ];
    });
      this.UnivercityService.GetAllUnivercityData().subscribe((res: any) => {
          this.rowData = res;
    });
  }
  popupclosed() {
    this.btnclicked = false;
  }

  Save() {
    this.gridApi.stopEditing();
    this.Dto = [];
    this.rowData = [];
    this.gridApi.forEachNode(res => {
      this.rowData.push(res.data);
    });
    this.rowData.forEach(res => {
      const Univwercity = {
        UniversityName : res.UniversityName,
        UniversityCode : res.UniversityCode,
      };
      this.Dto.push(Univwercity);
    });
    // tslint:disable-next-line: no-shadowed-variable
      this.UnivercityService.SaveUnivercityDataList(this.Dto, this.ModuleCode).subscribe((res: any) => {
        this.rowData = res;
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = false;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
}
