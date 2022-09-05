import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-provider-asset-type',
  templateUrl: './provider-asset-type.component.html',
  styleUrls: ['./provider-asset-type.component.css']
})
export class ProviderAssetTypeComponent implements OnInit {

  private gridApi;
  ModuleCode: number;
  type: string;
  Dto: any[];
  BoxDevHeight: number;
  rowData = [];
  HasSave: boolean;
  private sub: any;
  ColDef: any;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  btnclicked = false;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  MainwidthPC: string;
  widthPX: string;
  Results: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService,
    private Common: CommonService) {
      this.HasSave = false;
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
      this.HaveMaxBtn = false;
      this.MainwidthPC = '200';
      this.widthPX = '500';
      this.ColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد',
          field: 'ProviderAssetTypeCode',
          width: 100,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام',
          field: 'ProviderAssetTypeName',
          width: 250,
          editable: res,
          resizable: true
        },
    ];
    });
    this.Common.GetAllProviderAssetType().subscribe((res: any) => {
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
      const ProviderAssetType = {
        ProviderAssetTypeName : res.ProviderAssetTypeName,
        ProviderAssetTypeCode : res.ProviderAssetTypeCode,
      };
      this.Dto.push(ProviderAssetType);
    });
    // tslint:disable-next-line: no-shadowed-variable
      this.Common.SaveProviderAssetTypeList(this.Dto, this.ModuleCode).subscribe((res: any) => {
        this.rowData = res;
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = false;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
  }
}

