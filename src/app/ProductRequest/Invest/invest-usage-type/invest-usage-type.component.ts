import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-invest-usage-type',
  templateUrl: './invest-usage-type.component.html',
  styleUrls: ['./invest-usage-type.component.css']
})
export class InvestUsageTypeComponent implements OnInit {
  ModuleCode;
  columnDef;
  btnclicked = false;
  type: string;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  private gridApi;
  HaveSave = false;
  HaveDelete = false;
  InvestUsageTypeRow: any;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;


  constructor(private ProductRequest: ProductRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService) {
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 60,
          resizable: true,
        },
        {
          headerName: 'کد',
          field: 'InvestUsageTypeCode',
          width: 90,
          resizable: true,
          editable: true
        },
        {
          headerName: 'نام',
          field: 'InvestUsageTypeName',
          width: 250,
          resizable: true,
          editable: true
        },
      ];
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
     }

    onGridReady(params) {
      this.gridApi = params.api;
    }

  ngOnInit() {
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          default:
            break;
        }
      });

    });
    this.getRowData();
  }

  getRowData() {
    this.InvestUsageTypeRow = this.ProductRequest.GetInvestUsageType();
  }

  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    const InvestUsageTypeList = [];
    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
    rowData.forEach((item) => {
      let InvestUsageTypeCode;
      let InvestUsageTypeName;
      InvestUsageTypeCode = item.InvestUsageTypeCode;
      InvestUsageTypeName = item.InvestUsageTypeName;

        const obj = {
          InvestUsageTypeCode: InvestUsageTypeCode,
          InvestUsageTypeName: InvestUsageTypeName,
        };
        InvestUsageTypeList.push(obj);

    });

    this.ProductRequest.SaveInvestUsageType(InvestUsageTypeList).subscribe(
      res => {

        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
        this.InvestUsageTypeRow = this.ProductRequest.GetInvestUsageType();
      },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.HaveMaxBtn = false;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      }
    );
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed() {
    this.btnclicked = false;
  }

}
