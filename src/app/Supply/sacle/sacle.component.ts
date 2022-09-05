import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sacle',
  templateUrl: './sacle.component.html',
  styleUrls: ['./sacle.component.css']
})
export class SacleComponent implements OnInit {
  ModuleCode;
  private gridColumnApi;
  columnDef;
  btnclicked = false;
  selectedRow: any;
  private gridApi;
  ScaleRow: any;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  Scale: any;

  @ViewChild('IsCostValid') IsCostValid: TemplateRef<any>;
  constructor(
    private ProductRequest: ProductRequestService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService,
  )

 
  { 
  this.columnDef = [

      {
        headerName: 'کد واحد  ',
        field: 'ScaleCode',
        width:100,
        resizable: true,
        maxlength: 3,
        editable: true,
      },
      {
        headerName: 'نام واحد  ',
        field: 'ScaleName',
        width: 300,
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
    this.getRowData();

  }
  getRowData() {
   
    this.ProductRequest.GetScale().subscribe(res => {
      this.ScaleRow = res;
    })
   
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.ProductRequest.SaveScale(rowData).subscribe(res => {
      this.btnclicked = true;
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
    },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      });
  }

  
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }
}
