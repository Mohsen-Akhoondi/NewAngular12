import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Input, Component, OnInit, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-report-average-workflow-objects',
  templateUrl: './report-average-workflow-objects.component.html',
  styleUrls: ['./report-average-workflow-objects.component.css']
})
export class ReportAverageWorkflowObjectsComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ShowPersons') ShowPersonsBtn: TemplateRef<any>;
  alertMessageParams = { HaveOkBtn: true, HaveYesBtn: false, HaveNoBtn: false, message: '', IsMultiLine: false };
  btnclicked = false;
  HaveMaxBtn = false;
  startLeftPosition;
  startTopPosition;
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  paramObj;
  HaveHeader = true;
  OverPixelWidth;
  type = '';
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
  ReigonListSet = [];
  ModuleCode;
  WorkflowObjectItems = [];
  WorkflowObjectParams = {
    bindLabelProp: 'WorkflowObjectName',
    bindValueProp: 'WorkflowObjectCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
  };
  FromDate = '';
  ToDate = '';
  MaincolumnDef = [];
  rowData = [];
  GridApi;
  DisplayObjects = true;
  HeightGrid = 71;

  constructor(private Region: RegionListService,
    private route: ActivatedRoute,
    private ModuleList: ModuleService,
    private Workflow: WorkflowService) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'Module':
        this.Workflow.GetWorkflowObjectListByRegionCode(true, this.NgSelectRegionParams.selectedObject).subscribe(res =>
          this.WorkflowObjectItems = res
        );
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    forkJoin([
      this.Region.GetUserRegionList(false)
    ]).subscribe(res => {
      this.ReigonListSet = res[0];
      this.NgSelectRegionParams.selectedObject = res[0][0].RegionCode;
    });
    if (this.InputParam) {
      this.HeightGrid = 92;
      this.DisplayObjects = false;
      this.SetColumnDef();
      this.Workflow.ReportAverageWorkflowObjects(
        this.InputParam.IsPerson,
        this.InputParam.RegionCode,
        this.InputParam.WorkflowObjectCode,
        this.InputParam.FromDate,
        this.InputParam.Todate,
        this.InputParam.WorkflowNodeID
      ).subscribe(res => {
        this.rowData = res;
      });
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.SetColumnDef();
  }
  SetColumnDef() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نود',
        field: 'WorkflowNodeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleName',
        width: 160,
        resizable: true
      },
      {
        headerName: 'نام کاربری',
        field: 'LoginName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام و نام خانوادگی کاربر',
        field: 'ActorName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تعداد',
        children: [
          {
            headerName: 'کار',  
            field: 'TotalCount',
            width: 85,
            resizable: true
          },
          {
            headerName: 'فرآیند',
            field: 'TotalWorkLog',
            width: 85,
            resizable: true
          }
        ]
      },
      {
        headerName: 'میانگین زمان ماندگاری(ساعت)',
        children: [
          {
            headerName: 'کار', 
            field: 'AvrageWaitingHour',
            width: 85,
            resizable: true
          },
          {
            headerName: 'فرآیند',
            field: 'AvrageWorkLogHour',
            width: 85,
            resizable: true
          }
        ]
      }
    ];
  }
  onChangeWorkflowObject(event) {
    this.WorkflowObjectParams.selectedObject = event;
  }
  OnFromDateChange(event) {
    this.FromDate = event.MDate;
  }
  OnToDateChange(event) {
    this.ToDate = event.MDate;
  }
  SearchActor() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'نود',
        field: 'WorkflowNodeName',
        width: 150,
        resizable: true
      },
      {
        headerName: 'نقش',
        field: 'RoleName',
        width: 160,
        resizable: true
      },
      {
        headerName: 'نام کاربری',
        field: 'LoginName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نام و نام خانوادگی کاربر',
        field: 'ActorName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'تعداد',
        children: [
          {
            headerName: 'کار',
            field: 'TotalCount',
            width: 85,
            resizable: true
          },
          {
            headerName: 'فرآیند',
            field: 'TotalWorkLog',
            width: 85,
            resizable: true
          }
        ]
      },
      {
        headerName: 'میانگین زمان ماندگاری(ساعت)',
        children: [
          {
            headerName: 'کار',
            field: 'AvrageWaitingHour',
            width: 85,
            resizable: true
          },
          {
            headerName: 'فرآیند',
            field: 'AvrageWorkLogHour',
            width: 85,
            resizable: true
          }
        ]
      }
    ];
    this.Workflow.ReportAverageWorkflowObjects(
      true,
      this.NgSelectRegionParams.selectedObject,
      this.WorkflowObjectParams.selectedObject,
      this.FromDate,
      this.ToDate).subscribe(res => {
        this.rowData = res;
      });
  }
  SearchNode() {
    this.MaincolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'جزییات کاربران',
        field: '',
        width: 110,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowPersonsBtn,
        }
      },
      {
        headerName: 'نام نود گردش کار',
        field: 'WorkflowNodeName',
        width: 280,
        resizable: true,
      },
      {
        headerName: 'تعداد',
        children: [
          {
            headerName: 'کار',
            field: 'TotalCount',
            width: 85,
            resizable: true
          },
          {
            headerName: 'فرآیند',
            field: 'TotalWorkLog',
            width: 85,
            resizable: true
          }
        ]
      },
      {
        headerName: 'میانگین زمان ماندگاری(ساعت)',
        children: [
          {
            headerName: 'کار',
            field: 'AvrageWaitingHour',
            width: 85,
            resizable: true
          },
          {
            headerName: 'فرآیند',      
            field: 'AvrageWorkLogHour',
            width: 85,
            resizable: true
          }
        ]
      }
    ];
    this.Workflow.ReportAverageWorkflowObjects(
      false,
      this.NgSelectRegionParams.selectedObject,
      this.WorkflowObjectParams.selectedObject,
      this.FromDate,
      this.ToDate).subscribe(res => {
        this.rowData = res;
      });
  }
  onGridReady(params) {
    this.GridApi = params.api;
  }
  closeModal() {
    this.Closed.emit(true);
  }
  ShowPersonsBtnClick(row) {
    if (row) {
      this.type = 'ShowPersons';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.OverPixelWidth = 1140;
      this.startLeftPosition = 115;
      this.startTopPosition = 11;
      this.HeightPercentWithMaxBtn = 70;
      this.MinHeightPixel = 590;
      this.paramObj = {
        WorkflowNodeID: row.WorkflowNodeID,
        IsPerson: true,
        RegionCode: this.NgSelectRegionParams.selectedObject,
        WorkflowObjectCode: this.WorkflowObjectParams.selectedObject,
        FromDate: this.FromDate,
        Todate: this.ToDate
      };
    } else {
      this.ShowMessageBoxWithOkBtn('اطلاعات به درستی بارگزاری نشده است، با راهبر سیستم تماس بگیرید');
    }
  }
  popupclosed(event) {
    if (this.type === 'ShowPersons') {
      this.btnclicked = false;
      this.type = '';
      this.OverPixelWidth = '';
      this.startLeftPosition = '';
      this.startTopPosition = '';
      this.HeightPercentWithMaxBtn = '';
      this.MinHeightPixel = '';
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 300;
    this.OverPixelWidth = null;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }
}
