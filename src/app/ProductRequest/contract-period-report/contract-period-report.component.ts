import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-contract-period-report',
  templateUrl: './contract-period-report.component.html',
  styleUrls: ['./contract-period-report.component.css']
})
export class ContractPeriodReportComponent implements OnInit {

  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  ReigonListSet = [];

  FromContractDate: any;
  ToContractDate: any;
  FromProductRequestDate: any;
  ToProductRequestDate: any;

  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  columnDef;
  rowData = [];
  NgSelectTimesParams = {
    Items: [],
    bindLabelProp: 'NoTimesName',
    bindValueProp: 'NoTimesCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: false,
    clearable: true,
    IsDisabled: false,
  };
  TimesListSet = [];
  constructor(private router: Router,
    private ProductRequest: ProductRequestService,
    private RegionGroup: RegionListService,
    private Report: ReportService,
  ) {
    this.TimesListSet = [{ NoTimesName: 'تجديد نشده', NoTimesCode: 0 }, { NoTimesName: '1', NoTimesCode: 1 },
    { NoTimesName: '2', NoTimesCode: 2 }, { NoTimesName: '3', NoTimesCode: 3 }];
    this.columnDef = [];

  }

  ngOnInit() {
    this.getNewData();
    this.ColumnsDefinition();
  }
  getNewData(): void {
    this.RegionGroup.GetAllRegion().subscribe(res => {
      this.ReigonListSet = res;

    });
  }

  onChangeReigonObj(newObj) { // ok

  }

  popupclosed() {
    this.btnclicked = false;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }


  OnFromContractDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
  }

  OnToContractDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
  }

  OnFromProductRequestDateChange(ADate) {
    this.FromProductRequestDate = ADate.MDate;
  }
  OnToProductRequestDateChange(ADate) {
    this.ToProductRequestDate = ADate.MDate;
  }

  onPrint(Type) {
    if (this.RegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
    } else {
      let StrType = 'گزارش ميانگين زمان قرارداد به ريز';

      if (Type === 'Totaly') {
        StrType = 'گزارش ميانگين زمان قرارداد به سرجمع';
      }
      if (Type === 'Average') {
        StrType = 'گزارش ميانگين زمان انتظار در هر مرحله';
      }
      this.Report.ContractPeriodReport(
        this.RegionParams.selectedObject,
        this.FromProductRequestDate,
        this.ToProductRequestDate,
        this.FromContractDate,
        this.ToContractDate,
        this.NgSelectTimesParams.selectedObject,
        2864,
        StrType);
    }
  }
  ColumnsDefinition(type = 'Totaly') {
    if (type === 'Detail') {
      this.columnDef = [
        {
          headerName: 'رديف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'واحد اجرايي',
          field: 'RegionName',
          width: 180,
          resizable: true
        },
        {
          headerName: 'شماره قرارداد',
          field: 'LetterNo',
          width: 150,
          resizable: true
        },
        {
          headerName: 'شماره درخواست',
          field: 'ProductRequestNo',
          width: 150,
          resizable: true
        },
        {
          headerName: 'تاريخ شروع درخواست', // RFC 51776
          field: 'PersianMinDate',
          width: 130,
          resizable: true
        },
        {
          headerName: 'تاريخ پايان درخواست', // RFC 51776
          field: 'PersianMaxDate',
          width: 130,
          resizable: true
        },
        {
          headerName: 'تاريخ انعقاد قرارداد', // RFC 51776
          field: 'PersianLetterDate',
          width: 130,
          resizable: true
        },
        {
          headerName: 'مدت زمان',
          field: 'TotalDay',
          width: 100,
          resizable: true
        },
      ];
    } else if (type === 'Totaly') {
      this.columnDef = [
        {
          headerName: 'رديف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'واحد اجرايي',
          field: 'RegionName',
          width: 300,
          resizable: true
        },
        {
          headerName: 'تعداد',
          field: 'Count',
          width: 100,
          resizable: true
        },
        {
          headerName: 'ميانگين زمان  (روز)',
          field: 'Avrage',
          width: 130,
          resizable: true,
        },
      ];
    } else {
      this.columnDef = [
        {
          headerName: 'رديف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'واحد اجرايي',
          field: 'RegionName',
          width: 180,
          resizable: true
        },
        {
          headerName: 'مرکز هزينه',
          field: 'CostCenterName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'نود گردش کار',
          field: 'WorkflowNodeName',
          width: 150,
          resizable: true
        },
        {
          headerName: 'تعداد کل',
          field: 'TotalCount',
          width: 130,
          resizable: true
        },
        {
          headerName: 'کل روزهاي انتظار',
          field: 'TotalWatingDay',
          width: 130,
          resizable: true
        },
        {
          headerName: 'ميانگين روز انتظار',
          field: 'AvrageWaitingDay',
          width: 130,
          resizable: true
        },
        {
          headerName: 'ميانگين ساعت انتظار',
          field: 'AvrageWaitingHour',
          width: 130,
          resizable: true
        },
        {
          headerName: 'ميانگين دقيقه انتظار',
          field: 'AvrageWaitingMinute',
          width: 100,
          resizable: true
        },
        {
          headerName: 'ميانگين ثانيه انتظار',
          field: 'AvrageWaitingSecond',
          width: 100,
          resizable: true
        },
      ];
    }
  }
  TotalySearch() {
    if (this.RegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
      return;
    }
    this.ProductRequest.GetContractPeriodTotaly(
      this.RegionParams.selectedObject,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.FromContractDate,
      this.ToContractDate,
      this.NgSelectTimesParams.selectedObject).subscribe(res => {
        res.forEach(element => {
          element.Avrage = parseFloat(element.Avrage).toFixed(2);
        });
        this.rowData = res;

      });

    this.ColumnsDefinition('Totaly');
  }
  DetailSearch() {
    if (this.RegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
      return;
    }
    this.ProductRequest.GetContractPeriodDetail(
      this.RegionParams.selectedObject,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.FromContractDate,
      this.ToContractDate,
      this.NgSelectTimesParams.selectedObject).subscribe(res => {
        res.forEach(element => {
          element.TotalDay = parseFloat(element.TotalDay).toFixed(2);
        });
        this.rowData = res;
      });

    this.ColumnsDefinition('Detail');
  }
  WFAverageSearch() {
    if (this.RegionParams.selectedObject === null) {
      this.ShowMessageBoxWithOkBtn('واحد اجرايي انتخاب نشده است');
      return;
    }
    this.ProductRequest.GetContractWorkFlowAverageWaiting(
      this.RegionParams.selectedObject,
      this.FromContractDate,
      this.ToContractDate,
      this.FromProductRequestDate,
      this.ToProductRequestDate,
      this.NgSelectTimesParams.selectedObject
    ).subscribe(res => {
      // res.forEach(element => {
      //   element.TotalDay = parseFloat(element.TotalDay).toFixed(2);
      // });
      this.rowData = res;
    });

    this.ColumnsDefinition('WFA');
  }
  onChangeTimesObj(event) { }
  onChangeRegionObj(event) { }
}
