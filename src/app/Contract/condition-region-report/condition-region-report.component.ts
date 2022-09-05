import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductPatternService } from 'src/app/Services/CRM/ProductPatternService';

@Component({
  selector: 'app-condition-region-report',
  templateUrl: './condition-region-report.component.html',
  styleUrls: ['./condition-region-report.component.css']
})
export class ConditionRegionReportComponent implements OnInit {
  WorkflowObject = false;
  IsEditable;
  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  selectedWorkflowObject;
  WorkflowParams = {
    bindLabelProp: 'WorkflowName',
    bindValueProp: 'WorkflowCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  WorkflowItems = [
    {
      WorkflowName: 'درخواست معامله',
      WorkflowCode: 1
    },
    {
      WorkflowName: 'صورت وضعیت',
      WorkflowCode: 2


    },
    {
      WorkflowName: 'تامین کنندگان',
      WorkflowCode: 3
    },
  ];

  WorkflowObjectParams = {
    bindLabelProp: 'WorkflowObjectName',
    bindValueProp: 'WorkflowObjectCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  WorkflowObjectItems = [
    {

      WorkflowObjectName: 'قرارداد مشارکتي',
      WorkflowObjectCode: 9
    },
    {
      WorkflowObjectName: 'درخواست معامله',
      WorkflowObjectCode: 3
    },
    {
      WorkflowObjectName: 'قرارداد چابک',
      WorkflowObjectCode: 4
    },
    {
      WorkflowObjectName: 'درخواست معامله ملکي',
      WorkflowObjectCode: 6
    },
  ];

  selectedCostCenter;
  CostCenterItems;
  CostCenterParams = {
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false
  };

  alertMessageParams = { HaveOkBtn: true, message: '' };
  SubCostCenterItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  columnDef;
  rowData = [];
  selectedrow: any;
  count: any;
  WorkflowCode: any;

  HaveHeader: boolean;
  startTopPosition;
  MainMaxwidthPixel;
  btnclicked;
  type;
  startLeftPosition;

  constructor(private router: Router,
    private Region: RegionListService,
    private ProductPattern: ProductPatternService,
    private ContractService: ContractListService,

  ) { }

  ngOnInit() {
    this.ColumnsDefinition();

  }

  OnOpenNgSelect(type) {
    switch (type) {
      case 'Region':
        {
          this.Region.GetUserRegionList().subscribe(res => {
            this.RegionItems = res;
          });
        }
        break;
      case 'CostCenter':
        {
          if (this.RegionParams.selectedObject) {
            this.ProductPattern.GetCostCenterByRegion(this.RegionParams.selectedObject).subscribe(res => {
              this.CostCenterItems = res;
            });
          }
        }
        break;
    }
  }

  onChangeCostCenterObj(newObj) {
    this.selectedCostCenter = newObj;
    this.SubCostCenterParams.selectedObject = null;
    this.ProductPattern.GetSubCostCenterByCostCenter(this.selectedCostCenter).subscribe(res => {
      this.SubCostCenterItems = res;
    });

  }
  onChangeWorkflowItems(newObj) {
    if (newObj === 1) {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'کد واحد ',
          field: 'RegionCode',
          width: 80,
          resizable: true
        },
        {
          headerName: 'نام واحد ',
          field: 'RegionName',
          width: 170,
          resizable: true
        },
        {
          headerName: 'نوع درخواست ',
          field: 'WorkflowObjectName',
          width: 170,
          resizable: true,
        },
        {
          headerName: 'معاونت',
          field: 'CostCenterName',
          width: 170,
          resizable: true
        },
        {
          headerName: 'اداره',
          field: 'SubCostCenterName',
          width: 170,
          resizable: true
        },
        {
          headerName: 'تعداد ',
          field: 'Count',
          width: 80,
          resizable: true
        },
      ];
    } else {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'کد واحد ',
          field: 'RegionCode',
          width: 80,
          resizable: true
        },
        {
          headerName: 'نام واحد ',
          field: 'RegionName',
          width: 170,
          resizable: true
        },
        {
          headerName: 'معاونت',
          field: 'CostCenterName',
          width: 170,
          resizable: true
        },
        {
          headerName: 'اداره',
          field: 'SubCostCenterName',
          width: 170,
          resizable: true
        },
        {
          headerName: 'تعداد ',
          field: 'Count',
          width: 80,
          resizable: true
        },

      ];
    }
  }


  onGridReady(params) {

  }
  popupclosed(param) {
    this.btnclicked = false;
    this.type = '';
  
  
  }
  RowClick(InputValue) {
    this.selectedrow = InputValue.data;
  }

  ColumnsDefinition() {

    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد واحد ',
        field: 'RegionCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام واحد ',
        field: 'RegionName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'نوع درخواست ',
        field: 'WorkflowObjectName',
        width: 170,
        resizable: true,
      },
      {
        headerName: 'معاونت',
        field: 'CostCenterName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'اداره',
        field: 'SubCostCenterName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'تعداد ',
        field: 'Count',
        width: 80,
        resizable: true
      },

    ];
  }
  SearchRegion() {
    if(!this.RegionParams.selectedObject){
      this.ShowMessageBoxWithOkBtn('لطفا واحد اجرایی انتخاب شود');
    }
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد واحد ',
        field: 'RegionCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام واحد ',
        field: 'RegionName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'تعداد ',
        field: 'Count',
        width: 80,
        resizable: true
      },

    ];
    this.ContractService.ContractListRegion(
      this.RegionParams.selectedObject,
      this.WorkflowParams.selectedObject,
      this.WorkflowObjectParams.selectedObject,
    ).subscribe(res => {
      this.rowData = res;
    });

  }
  SearchCostCenter() {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد واحد ',
        field: 'RegionCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نام واحد ',
        field: 'RegionName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'معاونت',
        field: 'CostCenterName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'اداره',
        field: 'SubCostCenterName',
        width: 170,
        resizable: true
      },
      {
        headerName: 'تعداد ',
        field: 'Count',
        width: 80,
        resizable: true
      },

    ];
    this.ContractService.CostCenterList(
      this.RegionParams.selectedObject,
      this.WorkflowParams.selectedObject,
      this.WorkflowObjectParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
    ).subscribe(res => {
      this.rowData = res;
    });

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
}

  // onChangeWorkflowObj(newObj) {
  //   this.selectedWorkflowObject = newObj;
  //   this.WorkflowObjectParams.selectedObject = null;
  //   this.Workflow.GetWorkflowObjectByWorkflowTypeCode(4).subscribe(res => {
  //     this.WorkflowObjectItems = res;
  //   });

  // }



