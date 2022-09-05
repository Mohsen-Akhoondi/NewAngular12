import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractAgentService } from 'src/app/Services/ContractService/BasemodulesService/ContractAgent/ContractAgentService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { NgSelectConfig } from 'src/app/Shared/ng-select/public-api';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contract-agent-role',
  templateUrl: './contract-agent-role.component.html',
  styleUrls: ['./contract-agent-role.component.css']
})
export class ContractAgentRoleComponent implements OnInit {
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
  ContractAgentRoleRow: any;
  HaveSave = true;
  HaveDelete = false;
  private gridApi;
  itemNo = 0;
  RoleParams = {
    bindLabelProp: 'RoleName',
    bindValueProp: 'RoleID',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Role',
  };
  ContractAgentParams = {
    bindLabelProp: 'ContractAgentName',
    bindValueProp: 'ContractAgentCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Contract-Agent',
  };

  constructor(private ContractAgent: ContractAgentService,
    private router: Router,
    private route: ActivatedRoute,
    config: NgSelectConfig,
    private ContractList: ContractListService,
    private RefreshServiceObj: RefreshServices,
    private User: UserSettingsService) {
      this.columnDef = [
        {
          headerName: ' نام عامل قرارداد',
          field: 'ContractAgentName',
            cellEditorFramework: NgSelectVirtualScrollComponent,
            cellEditorParams: {
              Params: this.ContractAgentParams,
              Items: [],
              Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ContractAgentName;

            } else {
              return '';
            }
          },
          width: 200,
          resizable: true,
          editable: true,
          sortable: true,
        },
        {
          headerName: ' نام نقش',
          field: 'RoleName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.RoleParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RoleName;

            } else {
              return '';
            }
          },
          width: 200,
          resizable: true,
          editable: true,
          sortable: true,
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
    this.ContractAgentRoleRow = this.ContractAgent.GetContractAgentRoles();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    const ContractAgentRoleList = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    rowData.forEach((item) => {
        let ContractAgentCode;
        let RoleID;
        if (item.ContractAgentName.ContractAgentCode) {
          ContractAgentCode = item.ContractAgentName.ContractAgentCode;
        } else { ContractAgentCode = item.ContractAgentCode; }
        if (item.RoleName.RoleID) {
          RoleID = item.RoleName.RoleID;
        } else { RoleID = item.RoleID; }
        const obj = {
          ContractAgentCode: ContractAgentCode,
          RoleID: RoleID,
        };
        ContractAgentRoleList.push(obj);

    });
    this.ContractAgent.SaveContractAgentRole(ContractAgentRoleList)
    .subscribe(res => {
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
      });
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
  CellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'RoleName') {
      this.ContractList.GetRolesList(false).subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Role'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'ContractAgentName') {
      this.ContractAgent.GetContractAgents().subscribe(res => {
        this.RefreshServiceObj.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'Contract-Agent'
        });
      });
    }
  }
}
