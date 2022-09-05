import { Component, OnInit, Output, EventEmitter, Input, ViewChild, TemplateRef } from '@angular/core';
import { CartableServices } from 'src/app/Services/WorkFlowService/CartableServices';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';

@Component({
  selector: 'app-cfm-workflow-send',
  templateUrl: './cfm-workflow-send.component.html',
  styleUrls: ['./cfm-workflow-send.component.css']
})
export class CfmWorkflowSendComponent implements OnInit {
  
  @Input() InputParam;
  @Output() workFlowSendClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ISworkFlowSend: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('UserImageCell') UserImageCell: TemplateRef<any>;
  @ViewChild('IsCheck') IsCheck: TemplateRef<any>;
  MainMinwidthPixel;
  ActorID;
  PopUptype;
  PopUpParams;
  startLeftPosition;
  startTopPosition;
  gridHeightPxel;
  gridApi;
  columnDef;
  rowData;
  defaultSelectedRowIndex;
  RoleID;
  Note;
  LegendName;
  WorkFlowNodeID;
  WorkFlowNodeName;
  OperationCode;
  btnConfirmName = 'تایید';
  WorkFlowID;
  isClicked;
  SelectedRow;
  IsEnd;
  ObjectNo;
  ObjectID;
  getRowHeight;
  WorkflowTypeName;
  WorkflowTypeCode;
  ModuleViewTypeCode;
  WorkflowObjectCode;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  IsDisable = false;
  HeightPercentWithMaxBtn: number;
  MinHeightPixel: number;
  HaveMaxBtn = false;
  CartableUserID;
  CurrWorkFlow: any;
  OverMainMinwidthPixel;
  ActorName;
  LogInName;
  IsEditable;
  WorkflowActionTypeCode;
  UserImage: string;

  NgSelectActorCSMParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorID',
    placeholder: '',
    MinWidth: '170px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'Actor-MCP',
  }

  IsEditableActorName = false;
  MainMaxwidthPixel: number;
  PercentWidth: number;
  constructor(private Cartable: CartableServices,
    private RefreshCartable: RefreshServices,
    private Workflow: WorkflowService,
    private RefreshEquipmentTypeItems: RefreshServices,
    private CommonService: CommonServices,
    private Common: CommonService,
  ) {
  }

  ngOnInit() {
    this.getRowHeight = function (params) {
      return 40;
    };
    if (!this.InputParam.IsWFShow) {
      this.LegendName = 'گیرندگان';
      this.alertMessageParams.message = 'تست';
      this.OverMainMinwidthPixel = null;
      this.rowData = this.InputParam.rows;
      if (this.rowData && this.rowData.length > 3) {
        this.gridHeightPxel = 250;
      }

      if (this.rowData && this.rowData.length == 1 && this.rowData[0].WorkflowActionTypeCode === 2
        && !this.rowData[0].ActorName && !this.rowData[0].AfterFlow) {
        this.IsEditableActorName = true;
      }

      this.SetDefaultRowIndex();
      this.defaultSelectedRowIndex = 0;
      this.OperationCode = this.InputParam.OperationCode;
      this.CurrWorkFlow = this.InputParam.CurrWorkFlow;
      this.WorkFlowID = this.InputParam.WorkFlowID;
      this.IsEnd = this.InputParam.IsEnd;
      this.ObjectNo = this.InputParam.ObjectNo;
      this.ModuleViewTypeCode = this.InputParam.ModuleViewTypeCode;
      this.WorkflowTypeName = this.InputParam.WorkflowTypeName;
      this.WorkflowTypeCode = this.InputParam.WorkflowTypeCode;
      this.WorkflowObjectCode = this.InputParam.WorkflowObjectCode;
      this.ObjectID = this.InputParam.ObjectID;
      this.CartableUserID = this.InputParam.CartableUserID;
    } else {
      this.btnConfirmName = 'مشاهده';
      this.LegendName = 'فرستندگان';
      this.PopUpParams = this.InputParam;
      this.rowData = this.InputParam.rows;
      this.OverMainMinwidthPixel = null;
      if (this.rowData && this.rowData.length > 3) {
        this.gridHeightPxel = 250;
      }
      this.SetDefaultRowIndex();
    }
  }
  close() {
    this.workFlowSendClosed.emit(true);
  }
  SetDefaultRowIndex() {
    if (this.gridApi) {
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === 0) {
          node.setSelected(true);
          this.RowClick(node);
        }
      });
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    if (this.InputParam.IsWFShow) {
      this.btnConfirmName = 'مشاهده';
    }

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: this.InputParam.IsWFShow ? 70 : 45,
        resizable: true
      },
      {
        headerName: 'انتخاب',
        width: 55,
        field: 'Check',
        autoHeight: true,
        editable: true,
        resizable: true,
        hide: this.InputParam.IsWFShow ||
          ((this.OperationCode !== 1 || !this.InputParam.MinimumPosting) &&
            (this.OperationCode !== 2 || !this.CurrWorkFlow.MinimumReturn)),
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          return params.value;
        },
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.IsCheck
        }
      },
      {
        headerName: 'عملیات',
        field: 'WorkflowOpertionName',
        hide: this.InputParam.IsWFShow,
        width: 88,
        resizable: true
      },
      {
        headerName: this.InputParam.IsWFShow ? 'نام نود مبدا' : 'نام نود مقصد',
        field: 'WorkFlowNodeName',
        width: 220,
        resizable: true
      },
      {
        headerName: 'نام نقش',
        field: 'RoleName',
        width: 195,
        resizable: true
      },
      {
        headerName: 'نام و نام خانوادگی',
        field: 'ActorName',
        width: 210,
        resizable: true,
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectActorCSMParams,
          Items: [],
          Owner: this

        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ActorName) {
            params.data.ActorID = params.newValue.ActorID;
            params.data.ActorName = params.newValue.ActorName;
            params.data.DesUserID = params.newValue.UserID;
            params.data.UserImage = params.newValue.UserImage;
            return true;
          } else {
            params.data.ActorID = null;
            params.data.ActorName = '';
            return false;
          }
        },
        editable: () => {
          return this.IsEditableActorName;
        },
      },
      {
        headerName: 'عکس کاربر',
        width: 90,
        autoHeight: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UserImageCell
        }
      }
    ];
  }
  onOkClick() {
    this.IsDisable = true;
    this.gridApi.stopEditing();
    if (!this.InputParam.IsWFShow) {
      const GridrowData = [];
      const ReturnGridrowData = [];
      this.gridApi.forEachNode((node) => {
        if (this.InputParam.MinimumPosting) {
          if (node.data.Check) {
            GridrowData.push(node.data);
          }
        } else {
          GridrowData.push(node.data);
        }
      });
      this.gridApi.forEachNode((node) => {
        if (this.CurrWorkFlow.MinimumReturn) {
          if (node.data.Check) {
            ReturnGridrowData.push(node.data);
          }
        } else {
          ReturnGridrowData.push(node.data);
        }
      });
      switch (this.OperationCode) {

        case 1:
          if (this.InputParam.MinimumPosting && this.InputParam.MinimumPosting !== GridrowData.length) {
            this.PopUptype = 'message-box';
            this.startLeftPosition = 449;
            this.startTopPosition = 87;
            this.isClicked = true;
            this.IsDisable = false;
            this.alertMessageParams.message = 'تعداد ردیف های انتخاب شده باید ' + this.InputParam.MinimumPosting + ' ردیف باشد';
            return;
          }
          this.Cartable.UserConfirmBatchWorkFlow(
            this.CurrWorkFlow,
            this.WorkFlowID,
            this.ObjectNo,
            this.WorkflowTypeName,
            this.WorkflowTypeCode,
            this.ObjectID,
            GridrowData,
            this.WorkflowObjectCode,
            this.InputParam.OrginalModuleCode,
            this.ModuleViewTypeCode,
            this.CartableUserID)
            .subscribe(res => {
              this.RefreshCartable.RefreshCartable();
              this.ISworkFlowSend.emit(true);
              this.close();
            },
              err => {
                if (!err.error.Message.includes('|')) {
                  this.IsDisable = false;
                  this.PopUptype = 'message-box';
                  this.startLeftPosition = 449;
                  this.startTopPosition = 87;
                  this.alertMessageParams.message = 'خطای پیش بینی نشده';
                  this.isClicked = true;
                }
              });
          break;
        case 2:
          if (this.CurrWorkFlow.MinimumReturn && this.CurrWorkFlow.MinimumReturn !== ReturnGridrowData.length) {
            this.PopUptype = 'message-box';
            this.startLeftPosition = 449;
            this.startTopPosition = 87;
            this.isClicked = true;
            this.IsDisable = false;
            this.alertMessageParams.message = 'تعداد ردیف های انتخاب شده باید ' + this.CurrWorkFlow.MinimumReturn + ' ردیف باشد';
            return;
          }

          this.Cartable.UserReturnBatchWorkFlow(
            this.CurrWorkFlow,
            this.WorkFlowID,
            this.ObjectNo,
            this.WorkflowTypeName,
            this.WorkflowTypeCode,
            this.ObjectID,
            ReturnGridrowData,
            this.InputParam.OrginalModuleCode,
            this.CartableUserID)
            .subscribe(res => {
              this.RefreshCartable.RefreshCartable();
              this.ISworkFlowSend.emit(true);
              this.close();
            },
              err => {
                if (!err.error.Message.includes('|')) {
                  this.IsDisable = false;
                  this.PopUptype = 'message-box';
                  this.startLeftPosition = 449;
                  this.startTopPosition = 87;
                  this.alertMessageParams.message = 'خطای پیش بینی نشده';
                  this.isClicked = true;
                }
              });
          break;
        default:
          break;
      }
    } else {
      if (!this.SelectedRow) {
        this.PopUptype = 'message-box';
        this.startLeftPosition = 449;
        this.startTopPosition = 87;
        this.isClicked = true;
        this.IsDisable = false;
        this.alertMessageParams.message = 'ردیفی انتخاب نشده است';
        return;
      }
      
      if (this.InputParam.CurrWorkFlow &&
        (this.InputParam.CurrWorkFlow.WorkflowObjectCode === 25)) {
        this.PopUptype = 'customer-order';
        this.startLeftPosition = 100;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.MainMinwidthPixel = 1100;
      }
      if (this.InputParam.CurrWorkFlow &&
        (this.InputParam.CurrWorkFlow.WorkflowObjectCode === 27)) {
        this.PopUptype = 'customer-product-request-page';
        this.startLeftPosition = 50;
        this.PercentWidth = 90;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 97;
        this.MinHeightPixel = 645;
        this.MainMinwidthPixel = 1215;
      }

      this.isClicked = true;
    }
  }
  popupclosed() {
    if (this.PopUptype !== 'message-box') {
      this.close();
    }
    this.isClicked = false;
  }
  onWFSendGridReady(params) {
    this.gridApi = params.api;
    this.SetDefaultRowIndex();
  }
  RowClick(InputValue) {
    this.SelectedRow = InputValue;
    this.Note = InputValue.data.Note;
  }
  onBlurMethod() {
    const itemsToUpdate = [];
    this.gridApi.forEachNode(node => {
      if (this.SelectedRow.rowIndex === node.rowIndex) {
        node.data.Note = this.Note;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes && changes.InputParam.currentValue) {
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: changes.InputParam.currentValue.IsWFShow ? 70 : 45,
          resizable: true
        },
        {
          headerName: 'انتخاب',
          width: 55,
          field: 'Check',
          autoHeight: true,
          editable: true,
          resizable: true,
          hide: changes.InputParam.currentValue.IsWFShow ||
            ((changes.InputParam.currentValue.OperationCode !== 1 || !changes.InputParam.currentValue.MinimumPosting) &&
              (changes.InputParam.currentValue.OperationCode !== 2 || !changes.InputParam.currentValue.MinimumReturn)),
          cellEditorFramework: CheckboxFieldEditableComponent,
          valueFormatter: function isValidFormer(params) {
            return params.value;
          },
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.IsCheck
          }
        },
        {
          headerName: 'عملیات',
          field: 'WorkflowOpertionName',
          hide: changes.InputParam.currentValue.IsWFShow,
          width: 88,
          resizable: true
        },
        {
          headerName: changes.InputParam.currentValue.IsWFShow ? 'نام نود مبدا' : 'نام نود مقصد',
          field: 'WorkFlowNodeName',
          width: 220,
          resizable: true
        },
        {
          headerName: 'نام نقش',
          field: 'RoleName',
          width: 195,
          resizable: true
        },
        {
          headerName: 'نام و نام خانوادگی',
          field: 'ActorName',
          width: 190,
          resizable: true
        },
        {
          headerName: 'عکس کاربر',
          width: 90,
          autoHeight: true,
          cellStyle: function (params) {
            return { 'text-align': 'center' };
          },
          cellRendererFramework: TemplateRendererComponent,
          cellRendererParams: {
            ngTemplate: this.UserImageCell
          }
        }
      ];
      if (!changes.InputParam.currentValue.IsWFShow) {
        this.LegendName = 'گیرندگان';
        this.alertMessageParams.message = 'تست';
        this.rowData = changes.InputParam.currentValue.rows;
        if (this.rowData && this.rowData.length > 3) {
          this.gridHeightPxel = 250;
        }
        this.SetDefaultRowIndex();
        this.defaultSelectedRowIndex = 0;
        this.OperationCode = changes.InputParam.currentValue.OperationCode;
        this.WorkFlowID = changes.InputParam.currentValue.WorkFlowID;
        this.IsEnd = changes.InputParam.currentValue.IsEnd;
        this.ObjectNo = changes.InputParam.currentValue.ObjectNo;
        this.WorkflowTypeName = changes.InputParam.currentValue.WorkflowTypeName;
        this.ObjectID = changes.InputParam.currentValue.ObjectID;
        this.CartableUserID = changes.InputParam.currentValue.CartableUserID;
      } else {
        this.LegendName = 'فرستندگان';
        this.PopUpParams = changes.InputParam.currentValue;
        this.rowData = changes.InputParam.currentValue.rows;
        if (this.rowData && this.rowData.length > 3) {
          this.gridHeightPxel = 250;
        }
      }
      this.SetDefaultRowIndex();
    }
  }
  onCellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.Workflow.GetFindWorkFlowUser(event.data.WorkFlowTransitionID, this.WorkFlowID).subscribe(res => {
        if (res != null && res.length > 0) {
          res.forEach(element => {
            element.UserImage = this.CommonService._arrayBufferToBase64(element.UserImage);
          });
        }
        this.RefreshEquipmentTypeItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Actor-MCP'
        });
      });
    }
  }
}
