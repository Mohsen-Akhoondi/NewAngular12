import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-news-paper-page',
  templateUrl: './news-paper-page.component.html',
  styleUrls: ['./news-paper-page.component.css']
})
export class NewsPaperPageComponent implements OnInit {
  columnDef;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  NewsPaperRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  ModuleCode;

  constructor(private ProducRequest: ProductRequestService,
              private router: Router,
              private route: ActivatedRoute,
              private User: UserSettingsService
              ) {
                this.columnDef = [
                  {
                    headerName: 'ردیف',
                    field: 'ItemNo',
                    width: 90,
                    resizable: true,
                  },
                  {
                    headerName: 'کد روزنامه',
                    field: 'NewsPaperCode',
                    width: 125,
                    resizable: true,
                    maxlength: 3,
                    editable: true,
                  },
                  {
                    headerName: 'نام روزنامه',
                    field: 'NewsPaperName',
                    width: 250,
                    resizable: true,
                    editable: true
                  }
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
  }
  getRowData() {
    this.NewsPaperRow = this.ProducRequest.GetNewsPaper();
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
    this.ProducRequest.SaveNewsPaper(rowData).subscribe(res => {
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
