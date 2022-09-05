import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractAgentService } from 'src/app/Services/ContractService/BasemodulesService/ContractAgent/ContractAgentService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
declare var jquery: any;
declare var $: any;
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';
@Component({
  selector: 'app-contract-agent',
  templateUrl: './contract-agent.component.html',
  styleUrls: ['./contract-agent.component.css']
})
export class ContractAgentComponent implements OnInit {
  ModuleCode;
  private gridColumnApi;
  columnDef;
  private defaultColDef;
  private rowSelection;
  btnclicked = false;
  selectedRow: any;
  type: string;
  paramObj;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  ContractAgentRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;
  itemNo = 0;

  constructor(private ContractAgent: ContractAgentService,
    private router: Router,
    private route: ActivatedRoute,
    private User: UserSettingsService) {
    this.columnDef = [
      {
        headerName: 'کد عامل قرارداد',
        field: 'ContractAgentCode',
        width: 100,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 3},
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
      {
        headerName: 'نام عامل قرارداد',
        field: 'ContractAgentName',
        width: 340,
        resizable: true,
        editable: true
      }
    ];
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
  }

  ngOnInit() {
    this.getRowData();
   this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          case 6:
            this.HaveDelete = true;
            break;
          default:
            break;
        }
      });

    });
  }
  getRowData() {
    this.ContractAgentRow = this.ContractAgent.GetContractAgents();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    this.gridApi.forEachNode(function(node) {
      rowData.push(node.data);
    });
    this.ContractAgent.SaveContractAgent(rowData).subscribe(
      res => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
      },
      err => {
        this.btnclicked = true;
        this.type = 'message-box';
        this.HaveHeader = true;
        this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
      }
    );
  }
  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData != null) {
    this.gridApi.updateRowData({ remove: selectedData });

    for (const i of selectedData) {
      this.itemNo--;
    }
    this.RefreshItemNo();
    }
  }
  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApi.forEachNode(function(node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }
}
