import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { of } from 'rxjs';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-month-work-hour',
  templateUrl: './month-work-hour.component.html',
  styleUrls: ['./month-work-hour.component.css']
})
export class MonthWorkHourComponent implements OnInit {
  FinYearSet;
  MinSalary;
  MatchCoef;
  WorkHourGridApi;
  PopupType;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  MonthWorkHourList: any;
  columnDef;
  btnclicked;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '122px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  constructor(private router: Router,
    private FinYear: FinYearService) {
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد ماه',
        field: 'MonthCode',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام ماه',
        field: 'MonthName',
        width: 145,
        resizable: true
      },
      {
        headerName: 'ساعت کارکرد عادی ماه',
        field: 'WorkHour',
        width: 180,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 3 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
        resizable: true,
        editable: true
      },
    ];
  }
  onGridReady(params: { api: any; }) {
    this.WorkHourGridApi = params.api;
  }
  ngOnInit() {
    this.MonthWorkHourList = [];
    this.FinYear.GetFinYearList().subscribe(res => {
      this.FinYearSet = res;
      this.FinYearParams.selectedObject = res[0].FinYearCode;
      this.GetWorkHourRowsData();
    });
  }
  GetWorkHourRowsData() {
    if (this.FinYearParams.selectedObject) {
      this.FinYear.GetFinYearMonthWorkHourList(this.FinYearParams.selectedObject).subscribe(res => {
        this.MonthWorkHourList = res.MonthWorkHourDetails;
        this.MatchCoef = res.MatchCoef;
        this.MinSalary = res.MinSalary;
      });
    } else {
      this.MonthWorkHourList = of([]);
      this.MinSalary = null;
      this.MatchCoef = null;
    }
  }
  onFinYearChange(FinYearCode) {
    this.FinYearParams.selectedObject = FinYearCode;
    this.GetWorkHourRowsData();
  }
  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  onSave() {
    this.WorkHourGridApi.stopEditing();

    const rowData = [];
    this.WorkHourGridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    this.FinYear.SaveFinYearWorkHour(this.FinYearParams.selectedObject, this.MinSalary, this.MatchCoef, rowData).subscribe(
      res => {
        this.btnclicked = true;
        this.PopupType = 'message-box';
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      },
      err => {
        this.btnclicked = true;
        this.PopupType = 'message-box';
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      }
    );
  }
  popupclosed() {
    this.btnclicked = false;
  }
}
