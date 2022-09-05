import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { ContractOrderService } from 'src/app/Services/ContractService/ContractOrderServices/ContractOrderService';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';

@Component({
  selector: 'app-contract-vehicle-estimate',
  templateUrl: './contract-vehicle-estimate.component.html',
  styleUrls: ['./contract-vehicle-estimate.component.css']
})

  export class ContractVehicleEstimateComponent implements OnInit {
    @Input() PopupParam;
    @Input() PopupMaximized;
    @Output() ContractVehicleEstimateClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

    OrderNo;
    PersianOrderDate;
    Note;
    FinYearCode;
    ContractCode;
    ContractorName;
    LetterNo;
    ContractAmount;
    Subject;
    ContractOrderItemID = 0;

    btnclicked: boolean;

    columnDef_Vehicle: any;
    gridApi_Vehicle: any;
    rowData_Vehicle: any;

    outerGridHeight = 77;
    mainBodyHeight = 87;
    gridHeight_Vehicle = 50;
    SelectedRowIndex_Order: number;

    IsDisable;
    HaveSave = true;
    HaveConfirm;
    type: string;
    HaveHeader: boolean;
    alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
    startLeftPosition: number;
    startTopPosition: number;

    @ViewChild('Is4WDValid') Is4WDValid: TemplateRef<any>;
    @ViewChild('WithDriverValid') WithDriverValid: TemplateRef<any>;

    constructor(private OrderService: ContractOrderService) {
     }

      // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit(): void {
       this.columnDef_Vehicle = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'دو ديفرانسيل',
        field: 'Is4wd',
        width: 120,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
      cellRendererFramework: TemplateRendererComponent,
      cellRendererParams: {
        ngTemplate: this.Is4WDValid
      },
      },
      {
        headerName: 'با راننده',
        field: 'WithDriver',
        width: 120,
        resizable: true,
        editable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellEditorFramework: CheckboxFieldEditableComponent,
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.WithDriverValid
        },
      },
      {
        headerName: 'تعداد',
        field: 'Qty',
        width: 100,
        resizable: true,
        editable: true
      },
      {
        headerName: 'مقدار',
        field: 'Amount',
        width: 100,
        resizable: true,
        editable: true
      }
    ];
  }

    ngOnInit() {

    this.ContractOrderItemID = this.PopupParam.ContractOrderItemID;
    this.OrderNo = this.PopupParam.OrderNo;
    this.PersianOrderDate = this.PopupParam.PersianOrderDate;
    this.Note = this.PopupParam.Note;

    this.FinYearCode = this.PopupParam.FinYearCode ;
    this.ContractCode = this.PopupParam.ContractCode ;
    this.ContractorName = this.PopupParam.ContractorName ;
    this.LetterNo = this.PopupParam.LetterNo;
    this.ContractAmount = this.PopupParam.ContractAmount;
    this.Subject = this.PopupParam.Subject;


     if (this.ContractOrderItemID > 0 ) {
      this.OrderService.GetContractVehicleEstimateList(this.ContractOrderItemID)
      .subscribe(res => {
        this.rowData_Vehicle = res;
        this.SelectedRowIndex_Order = 0;
      });
    }
  }
    close() {

        this.btnclicked = false;
        this.ContractVehicleEstimateClosed.emit(true);
      }
      GridReady_Vehicle(params: { api: any; }) {
        this.gridApi_Vehicle = params.api;
      }

      RowClick_Vehicle(InputValue) {
      }

      // tslint:disable-next-line:use-life-cycle-interface
    // ngOnChanges(changes): void {
    //   if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
    //     this.outerGridHeight = changes.PopupMaximized.currentValue ? 77 : 77;
    //     this.gridHeight_Vehicle = changes.PopupMaximized.currentValue ? 91 : 90;
    //     this.mainBodyHeight = changes.PopupMaximized.currentValue ? 87.6 : 87;
    //   }
    // }


    onSave() {
      this.gridApi_Vehicle.stopEditing();

      const rowData = [];
      const ContractVehicleEstimateList = [];
      this.gridApi_Vehicle.forEachNode(function (node) {
        rowData.push(node.data);
      });

      let ItemNo = 0;
      rowData.forEach((Estimate) => {
        ItemNo++;
        if (Estimate.ContractVehicleEstimateID) {
          const obj1 = {
            ContractVehicleEstimateID: Estimate.ContractVehicleEstimateID,
            ContractOrderItemID: this.ContractOrderItemID,
            ItemNo: ItemNo,
            Is4wd: Estimate.Is4wd,
            WithDriver: Estimate.WithDriver,
            Qty: Estimate.Qty,
            Amount: Estimate.Amount
          };
          ContractVehicleEstimateList.push(obj1);
        } else {
          const obj1 = {
            ContractVehicleEstimateID: -1,
            ContractOrderItemID: this.ContractOrderItemID,
            ItemNo: ItemNo,
            Is4wd: Estimate.Is4wd,
            WithDriver: Estimate.WithDriver,
            Qty: Estimate.Qty,
            Amount: Estimate.Amount
          };
          ContractVehicleEstimateList.push(obj1);
        }
      });
      this.OrderService.SaveContractVehicleEstimate(ContractVehicleEstimateList)
      .subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.OrderService.GetContractVehicleEstimateList(this.ContractOrderItemID)
        .subscribe(res_refresh => {
          this.rowData_Vehicle = res_refresh;
          this.SelectedRowIndex_Order = 0;
        });
      },
        err => {
            this.ShowMessageBoxWithOkBtn('خطای پیش بینی نشده');
        }
      );
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

    onCellValueChanged(event) {
      let itemsToUpdate = [];
      if (event.newValue && event.columnDef_Vehicle &&
        event.columnDef_Vehicle.field === 'Is4wd') {
        itemsToUpdate = [];
        this.gridApi_Vehicle.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.Is4wd = event.newValue;
            itemsToUpdate.push(node.data);
          }
        });
        this.gridApi_Vehicle.updateRowData({ update: itemsToUpdate });
      }

      if (event.newValue && event.columnDef_Vehicle &&
        event.columnDef_Vehicle.field === 'WithDriver') {
        itemsToUpdate = [];
        this.gridApi_Vehicle.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.WithDriver = event.newValue;
            itemsToUpdate.push(node.data);
          }
        });
        this.gridApi_Vehicle.updateRowData({ update: itemsToUpdate });
      }
    }

    popupclosed() {
      this.btnclicked = false;
    }
  }

