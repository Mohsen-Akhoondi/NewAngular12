import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';

@Component({
  selector: 'app-show-under-take-items',
  templateUrl: './show-under-take-items.component.html',
  styleUrls: ['./show-under-take-items.component.css']
})
export class ShowUnderTakeItemsComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupParam;

  HeightPercentWithMaxBtn;
  btnclicked;
  type = '';
  HaveHeader;
  startLeftPosition;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ModuleCode;
  columnDef = [
    {
      headerName: 'ردیف',
      field: 'ItemNo',
      width: 50,
      resizable: true
    },
    {
      headerName: 'واحد اجرایی',
      field: 'RegionName',
      width: 200,
      resizable: true
    },
    {
      headerName: 'نام شخص عامل',
      field: 'ActorName',
      width: 130,
      resizable: true
    },
    {
      headerName: 'سال مالی',
      field: 'FinYearCode',
      width: 70,
      resizable: true
    },
    {
      headerName: 'شماره تعهد',
      field: 'UndertakeCode',
      width: 80,
      resizable: true
    },
    {
      headerName: 'محل هزینه',
      field: 'UnitTopicTitle',
      width: 200,
      resizable: true
    },
    {
      headerName: 'کد بودجه',
      field: 'BgtTopicTitle',
      width: 200,
      resizable: true
    },
    {
      headerName: 'موضوع',
      field: 'Subject',
      width: 300,
      resizable: true
    },
  ];
  rowData = [];
  ContractPayCostFactorID;
  undertakerowData = [];

  constructor(
    private Workflow: WorkflowService,
    private RegionService: RegionListService,
    private route: ActivatedRoute,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices,
    private ContractPayDetail: ContractPayDetailsService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (this.PopupParam && this.PopupParam.ContractPayCostFactorID) {
      this.ContractPayCostFactorID = this.PopupParam.ContractPayCostFactorID;
    }
    if (this.PopupParam && this.PopupParam.undertakerowData) {
      this.undertakerowData = this.PopupParam.undertakerowData;
    }
    this.Find();
  }

  Find() {
    if (this.undertakerowData) {
      this.rowData = this.undertakerowData;
    } else {
      this.ShowMessageBoxWithOkBtn('مشکل در نمایش اطلاعات رخ داده است، لطفا با راهبر سیستم تماس بگیرید');
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  close() {
    this.Closed.emit(true);
  }
}
