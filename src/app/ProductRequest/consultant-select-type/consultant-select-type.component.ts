import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-consultant-select-type',
  templateUrl: './consultant-select-type.component.html',
  styleUrls: ['./consultant-select-type.component.css']
})
export class ConsultantSelectTypeComponent implements OnInit {

  private gridApi;
  ConsultantSelectTypeColDef: any;
  @Output() ConsultantSelectTypeComponentClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  constructor(private ConsultantSelectTypeService: ProductRequestService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService) {
    this.HasSave = false;
    this.BoxDevHeight = 80;
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  ConsultantSelectTypeGridReady(event) {
    this.gridApi = event.api;
  }
  ngOnInit() {
    this.users.CheckAdmin().subscribe((res: boolean) => {
      this.HasSave = res;
      this.ConsultantSelectTypeColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 100,
          resizable: true
        },
        {
          headerName: 'کد نوع انتخاب مشاور',
          field: 'ConsultantSelectTypeCode',
          width: 160,
          resizable: true,
          editable: true,
        },
        {
          headerName: 'نام نوع انتخاب مشاور',
          field: 'ConsultantSelectTypeName',
          width: 190,
          editable: res,
          resizable: true
        },
      ];
    });
    this.ConsultantSelectTypeService.GetConsultantSelectTypeList().subscribe((res: any) => {
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
      const ConsultantSelectType = {
        ConsultantSelectTypeName: res.ConsultantSelectTypeName,
        ConsultantSelectTypeCode: res.ConsultantSelectTypeCode,
      };
      this.Dto.push(ConsultantSelectType);
    });
    // tslint:disable-next-line: no-shadowed-variable
    this.ConsultantSelectTypeService.SaveConsultantSelectTypeList(this.Dto, this.ModuleCode).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    });
  }
  popupclosed() {
    this.btnclicked = false;
    this.ConsultantSelectTypeService.GetConsultantSelectTypeList().subscribe((res2: any) => {
      this.rowData = res2;
    });
  }
}
