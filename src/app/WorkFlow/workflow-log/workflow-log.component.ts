import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { of } from 'rxjs';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';

@Component({
  selector: 'app-workflow-log',
  templateUrl: './workflow-log.component.html',
  styleUrls: ['./workflow-log.component.css']
})
export class WorkflowLogComponent implements OnInit {
  @Input() PopupParam;
  private gridApi;
  ContractOrdercolumnDef;
  ContractPayColumnDef;
  SubjectParameter: string = "";
  LetterParameter: string = "";
  MaincolumnDef;
  RowData: any;
  NgSelectSearchTerm = '';
  NgSelectItems;
  PriceListTopicItems;
  BoxDevHeight = 60;
  selectedRow;
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  NgSelectModuleParams = {
    Items: [],
    bindLabelProp: 'ModuleName',
    bindValueProp: 'ModuleCode',
    placeholder: '',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };
  // NgSelectContractParams={
  //   Items:[],
  //   bindLabelProp:'LetterNo',
  //   bindValueProp:'FinYearCode',
  //   MinWidth: '150px',
  //   selectedObject: null,
  //   loading: false,
  //   IsVirtualScroll: false,
  //   IsDisabled: false
  // };
  // ContractListSet=["1","2"];
  ReigonListSet = [];
  ModuleNameListSet = [];
  btnclicked = false;
  type: string;
  private defaultColDef;
  private rowSelection;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  loading = false;
  HaveSave = false;
  HaveDelete = false;
  RegionCode;
  ModuleCode;
  selectedWorkflowtype;
  HasRegion;
  rowData: any;
  workflowtype;
  constructor(private router: Router,
    private Workflow: WorkflowService,
    config: NgSelectConfig,
    private route: ActivatedRoute,
    private RegionGroup: RegionListService,
    private ModuleList: ModuleService) {
    config.notFoundText = 'موردی یافت نشد';
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.ContractOrdercolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'ContractNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
    ];
    this.ContractPayColumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'نوع صورت وضعیت',
        field: 'ContractPayTypeName',
        width: 70,
        resizable: true
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'ContractNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 100,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 400,
        resizable: true
      },
      {
        headerName: 'شماره مرحله',
        field: 'OrderNo',
        width: 90,
        resizable: true
      },
      {
        headerName: 'نام پیمانکار',
        field: 'ContractorName',
        width: 300,
        resizable: true
      },
    ];
    this.defaultColDef = { resizable: true };
    this.rowSelection = 'single';
  }
  gridOptions: GridOptions = {
    onRowDoubleClicked: this.doSomething
  };
  doSomething(row) {
  }
  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  ngOnInit() {
    this.BoxDevHeight = 88;
    this.rowData = of([]);
    this.getNewData();
  }
  getNewData(): void {
    this.RegionGroup.GetRegionList(this.ModuleCode, false).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.ReigonListSet = res;
      }
    });
  }
  onChangeReigonObj(newObj) {
    this.NgSelectModuleParams.selectedObject = '';
    this.ModuleNameListSet = [];

    this.rowData = of([]);
    this.ModuleList.GetModuleListByRegionCode(this.NgSelectRegionParams.selectedObject, []).subscribe(res => {
      this.ModuleNameListSet = res;
    });
  }
  onChangeModuleObj(newObj) {
    this.MaincolumnDef = newObj === 1 ? this.ContractOrdercolumnDef : this.ContractPayColumnDef;
    this.rowData = of([]);
    this.getContractListData(this.NgSelectRegionParams.selectedObject, this.NgSelectModuleParams.selectedObject);
  }
  getContractListData(RegionCode, WorkflowTypeCode): void {
    // tslint:disable-next-line:max-line-length
    this.rowData = this.Workflow.GetContractByVWWorkLog(RegionCode, WorkflowTypeCode, null, null, this.LetterParameter, this.SubjectParameter, null, null);

  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.OverstartLeftPosition = 449;
    this.OverstartTopPosition = 150;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }
  popupclosed() {
    this.btnclicked = false;
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

}
