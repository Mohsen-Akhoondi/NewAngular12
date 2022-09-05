import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';


@Component({
  selector: 'app-share-type',
  templateUrl: './share-type.component.html',
  styleUrls: ['./share-type.component.css']
})
export class ShareTypeComponent implements OnInit {

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
  Results : any[];

  constructor(private ShareTypeService: CommonService,
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
          field: 'ShareTypeCode',
          width: 100,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام',
          field: 'ShareTypeName',
          width: 250,
          editable: res,
          resizable: true
        },
    ];
    });
      this.ShareTypeService.GetAllShareTypeDataList().subscribe((res: any) => {
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
      const ShareType = {
        ShareTypeName : res.ShareTypeName,
        ShareTypeCode : res.ShareTypeCode,
      };
      this.Dto.push(ShareType);
    });
    // tslint:disable-next-line: no-shadowed-variable
      this.ShareTypeService.SaveShareTypeList(this.Dto, this.ModuleCode).subscribe((res: any) => {
        this.rowData = res;
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = false;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
  }
}
