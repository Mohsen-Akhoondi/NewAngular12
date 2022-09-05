import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ActivatedRoute } from '@angular/router';
import { JalaliDatepickerComponent } from 'src/app/Shared/jalali-datepicker/jalali-datepicker.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
@Component({
  selector: 'app-supplier-work-flow',
  templateUrl: './supplier-work-flow.component.html',
  styleUrls: ['./supplier-work-flow.component.css']
})
export class SupplierWorkFlowComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('WorkLogDetail') WorkLogDetail: TemplateRef<any>;
  @ViewChild('RevokeProcess') RevokeProcess: TemplateRef<any>;
  @ViewChild('PrintFlow') PrintFlow: TemplateRef<any>;
  @Input() InputParam;
  WorkFlowRows = [];
  WorkflowInstanceID: number;
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  HeightPercentWithMaxBtn;
  MinHeightPixel;
  PopupParam: any;
  WorkflowObjectCode = 11;
  ModuleCode;
  IdentityNo: any;
  FirstName: any;
  LastName: any;
  EconomicCode: any;
  PersianBirthDate: string;
  IsAdmin = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  WorkFlowColDef;
  ActorID;
  BtnClickedName = '';
  RegionCode;
  HasWorkFlowID;
  constructor(private Actor: ActorService,
    private FlowService: WorkflowService,
    private route: ActivatedRoute,
    private Cartable: CartableServices,
    private Report: ReportService) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  ngOnInit() {
    if (this.InputParam) {
      this.IdentityNo = this.InputParam.IdentityNo ? this.InputParam.IdentityNo : null;
      this.FirstName = this.InputParam.FirstName;
      this.LastName = this.InputParam.LastName;
      this.EconomicCode = this.InputParam.EconomicCode;
      this.PersianBirthDate = this.InputParam.PersianBirthDate;
      this.IsAdmin = this.InputParam.IsAdmin;
      this.ActorID = this.InputParam.ActorID;
      this.HasWorkFlowID = this.InputParam.HasWorkFlowID;
    }
    this.Actor.GetWorkflowInstance(this.ActorID).subscribe(res => {
      this.WorkFlowRows = res;
    });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.WorkFlowColDef = [
      {
        headerName: 'رديف ',
        field: 'ItemNo',
        width: 50,
        resizable: true,
      },
      {
        headerName: 'انصراف از درخواست',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.RevokeProcess,
        },
        hide: this.HasWorkFlowID
      },
      {
        headerName: 'جزئیات گردش',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.WorkLogDetail,
        }
      },
      {
        headerName: 'چاپ گردش',
        field: '',
        width: 120,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.PrintFlow,
        }
      },
      {
        headerName: 'تاریخ',
        field: 'PersianInstanceDate',
        width: 140,
        resizable: true,
        editable: false,
        cellEditorFramework: JalaliDatepickerComponent,
        cellEditorParams: {
          CurrShamsiDateValue: 'PersianInstanceDate',
          DateFormat: 'YYYY/MM/DD',
          WidthPC: 100,
          AppendTo: '.for-append-date'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.SDate;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'واحد اجرایی ',
        field: 'RegionName',
        width: 140,
        resizable: true,
        editable: false,
      },
      {
        headerName: 'نوع گردش کار ',
        field: 'WorkflowTypeName',
        width: 200,
        resizable: true,
        editable: false,
      },
    ];
  }
  onWorkLogDetailClick(row) {
    if (row.WorkflowInstanceID && row.WorkflowInstanceID > 0) {
      this.WorkflowInstanceID = row.WorkflowInstanceID;
      this.PopUpType = 'user-work-log-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 125;
      this.startTopPosition = 8;
      this.HeightPercentWithMaxBtn = 98;
      this.MinHeightPixel = 640;

      this.PopupParam = {
        HeaderName: 'جزئیات گردش',
        workflowtypeStatus: this.WorkflowObjectCode,
        WorkFlowInstanceId: row.WorkflowInstanceID,
        ParentModuleCode: this.ModuleCode,
        IdentityNo: this.IdentityNo,
        Name: this.FirstName + ' ' + this.LastName,
        RegisterNo: this.EconomicCode,
        Date: this.PersianBirthDate,
        IsAdmin: this.IsAdmin
      };
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onClose() {
    this.Closed.emit(true);
  }
  popupclosed(event) {
    this.ngOnInit();
    this.isClicked = false;
    this.PopUpType = '';
  }
  onPrintFlowClick(row) {
    this.Report.ShowReport(null,
      null,
      this.ActorID,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this.ModuleCode,
      row.RegionCode
    );
  }
  onRevokeProcessClick(row) {
    if (row.WorkflowInstanceID && row.WorkflowInstanceID > 0) {
      this.WorkflowInstanceID = row.WorkflowInstanceID;
    }
    if (row.RegionCode && row.RegionCode > 0) {
      this.RegionCode = row.RegionCode;
    }
    this.BtnClickedName = 'BtnDelete';
    this.ShowMessageBoxWithYesNoBtn('با انجام این عملیات گردش کار سازمان ' + row.RegionName + ' ابطال خواهد شد، آیا مطمعن هستید؟ ');
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 540;
    this.startTopPosition = 240;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  MessageBoxAction(event) {
    if (this.BtnClickedName === 'BtnDelete' && event === 'YES') { // RFC 62144
      this.Actor.RevokeProcess(this.WorkflowInstanceID, this.ModuleCode, this.ActorID, this.RegionCode).subscribe(res => {
        if (res) {
          this.BtnClickedName = '';
          this.ShowMessageBoxWithOkBtn('ابطال فرآیند با موفقیت انجام شد');
        }
      });
    }
  }
  getOutPutParam(event) {

  }
}
