import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-invest-type',
  templateUrl: './invest-type.component.html',
  styleUrls: ['./invest-type.component.css']
})
export class InvestTypeComponent implements OnInit {

  private gridApi;
  InvestTypeColDef: any;
  @Output() InvestTypeComponentClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  constructor(private InvestTypeService: ProductRequestService,
  private route: ActivatedRoute,
  private router: Router,
  private users: UserSettingsService ) {
    this.HasSave = false;
      this.BoxDevHeight = 80;
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
      this.InvestTypeColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد',
          field: 'InvestTypeCode',
          width: 100,
          resizable: true,
          editable: false,
        },
        {
          headerName: 'نام',
          field: 'InvestTypeName',
          width: 250,
          editable: res,
          resizable: true
        },
    ];
    });
      this.InvestTypeService.GetInvestType(true,null).subscribe((res: any) => {
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
      const InvestType = {
        InvestTypeName : res.InvestTypeName,
        InvestTypeCode : res.InvestTypeCode,
      };
      this.Dto.push(InvestType);
    });
    // tslint:disable-next-line: no-shadowed-variable
      this.InvestTypeService.SaveInvestTypeList(this.Dto, this.ModuleCode).subscribe(res => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      });
  }
  popupclosed() {
    this.btnclicked = false;
    this.InvestTypeService.GetInvestType(true,null).subscribe((res2: any) => {
      this.rowData = res2;
  });
  }
}
