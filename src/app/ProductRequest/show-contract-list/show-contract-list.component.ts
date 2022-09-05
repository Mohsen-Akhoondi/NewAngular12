import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { isUndefined } from 'util';
import { forkJoin } from 'rxjs';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
@Component({
  selector: 'app-show-contract-list',
  templateUrl: './show-contract-list.component.html',
  styleUrls: ['./show-contract-list.component.css']
})
export class ShowContractListComponent implements OnInit {

  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Output() Output: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  btnclicked = false;
  type = '';
  HaveHeader;
  startLeftPosition;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  mainBodyHeight = 85;
  gridHeight = 97;
  columnDefPriceList: any;
  rowData: any = [];
  AgridApi;
  selectedRowContractId;
  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  constructor(
    private ProductService: ProductRequestService,
    private Workflow: WorkflowService,
  ) { }

  ngOnInit() {
    this.columnDefPriceList = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      // {
      //   headerName: 'کد واحد اجرایی',
      //   field: 'RegionCode',
      //   width: 100,
      //   resizable: true
      // },
      {
        headerName: 'نام واحد اجرایی',
        field: 'RegionName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'کد قرارداد',
        field: 'ContractCode',
        width: 80,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'تاریخ قرارداد',
        field: 'LetterDatePersian',
        width: 120,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorFullName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 400,
        resizable: true
      }
    ];

    this.rowData = [];
    if (this.InputParam &&
      (this.InputParam.RegionCode !== null && this.InputParam.RegionCode > -1 && !isUndefined(this.InputParam.RegionCode))) {
      forkJoin([
        // this.ProductService.GetContractByRegion(
        //   this.InputParam.RegionCode,
        //   this.InputParam.IsCost,
        //   null
        //   ),
        this.Workflow.GetFinYearList()
      ]).subscribe(res => {
        // this.rowData = res[0];
        this.FinYearItems = res[0];
        this.FinYearParams.selectedObject = res[0][0].FinYearCode;
        this.onChangeFinYearObj(this.FinYearParams.selectedObject)
      });
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit(): void {

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

  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  onSave() {
    if (!this.selectedRowContractId) {
      this.ShowMessageBoxWithOkBtn('هیچ رکوردی انتخاب نشده است');
    } else {
      this.Output.emit(this.selectedRowContractId);
      this.Closed.emit(true);
    }
  }

  close() {
    this.Closed.emit(true);
  }

  RowClick(event) {
    if (event && event.data && event.data.ContractId) {
      this.selectedRowContractId = event.data.ContractId;
    }
  }

  popupclosed(event) {
    this.btnclicked = false;
    this.type = '';
  }

  onChangeFinYearObj(event) {
    this.ProductService.GetContractByRegion(
      this.InputParam.RegionCode,
      this.InputParam.IsCost,
      this.FinYearParams.selectedObject
    ).subscribe(res => {
      this.rowData = res;
    });
  }
}
