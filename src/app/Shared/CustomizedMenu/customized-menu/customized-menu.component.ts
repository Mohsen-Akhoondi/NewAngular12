import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customized-menu',
  templateUrl: './customized-menu.component.html',
  styleUrls: ['./customized-menu.component.css']
})
export class CustomizedMenuComponent implements OnInit {
  @Input() ModuleCode;
  @Input() ModuleName;
  private gridApiMenu: any;
  private gridApiFastMenu: any;
  colDefMenu: any;
  defaultColDef1: any;
  rowDataMenu: any;
  colDefFastMenu: any;
  defaultColDef2: any;
  rowDataFastMenu: any;
  selectedMenuID = -1;
  selectedFastMenuID = -1;
  selectedMenuItem: any;
  selectedFastMenuItem: any;
  btnclicked = false;
  type;
  HaveHeader;
  alertMessageParams = {HaveOkBtn: true , message: ''};
  Reloadable = false;
  HaveSave: boolean;
  constructor(private router: Router,
    private UserDetails: UserSettingsService,
    private User: UserSettingsService
    ) {

    this.colDefMenu = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'کد فعالیت',
        field: 'ModuleCode',
        width: 75,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'نام فعالیت',
        field: 'MenuName',
        width: 188,
        resizable: true,
        suppressSizeToFit: true
      }
    ];

    this.colDefFastMenu = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'کد فعالیت',
        field: 'ModuleCode',
        width: 80,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'نام فعالیت',
        field: 'ModuleName',
        width: 109,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'اولویت',
        field: 'OrderNo',
        width: 74,
        resizable: true,
        editable: true,
        suppressSizeToFit: true
      }
    ];
  }

  ngOnInit() {
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      res.forEach(node => {
        switch (node.OperationCode) {
          case 7:
            this.HaveSave = true;
            break;
          default:
            break;
        }
      });

    });
    this.getNewDataMenu();
    this.getNewDataFastMenu();
  }

  onGridReadyMenu(params: { api: any; }) {
    this.gridApiMenu = params.api;
  }

  onGridReadyFastMenu(params: { api: any; }) {
    this.gridApiFastMenu = params.api;
  }

  getNewDataMenu(): void {
    this.rowDataMenu = this.UserDetails.GetModuleList();
  }

  getNewDataFastMenu(): void {
    this.rowDataFastMenu = this.UserDetails.GetFastAccessUserModule();
  }

  MenuRowClick(InputValue: number) {
    this.selectedMenuID = InputValue;
  }

  FastMenuRowClick(InputValue: number) {
    this.selectedFastMenuID = InputValue;
  }

  addSelectedToFastMenu() {
    this.selectedMenuItem = this.gridApiMenu.getSelectedRows();
    if (this.selectedMenuItem != null) {
      const fastMenuCount = this.gridApiFastMenu.getDisplayedRowCount();
      this.gridApiMenu.updateRowData({ remove: this.selectedMenuItem });
      if (fastMenuCount === 0) {
        let orderNo = 1;
        this.selectedMenuItem.forEach((item) => {
          const obj = {
            ItemNo: item.ItemNo,
            ModuleName: item.MenuName,
            ModuleCode: item.ModuleCode,
            OrderNo: orderNo
          };
          this.gridApiFastMenu.updateRowData({ add: [obj] });
          orderNo++;
        });
      } else {
        const lastIndex = this.gridApiFastMenu.getLastDisplayedRow();
        const tempData = [];
        this.gridApiFastMenu.forEachNode(node => tempData.push(node.data));
        let abc: number;
        abc = lastIndex + 1 ;
        const xx = tempData.filter(x => x.ItemNo === abc)[0];
        let maxOrderNo = xx.OrderNo + 1;
        this.selectedMenuItem.forEach((item) => {
          const obj = {
            ItemNo: item.ItemNo,
            ModuleName: item.MenuName,
            ModuleCode: item.ModuleCode,
            OrderNo: maxOrderNo
          };
          this.gridApiFastMenu.updateRowData({ add: [obj] });
          maxOrderNo ++;
        });
      }
    }

    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }

  addAllToFastMenu() {
    const rowData = [];
    this.gridApiMenu.forEachNode(node => rowData.push(node.data));
    this.gridApiMenu.updateRowData({ remove: rowData });

    const fastMenuCount = this.gridApiFastMenu.getDisplayedRowCount();
      this.gridApiMenu.updateRowData({ remove: this.selectedMenuItem });
      if (fastMenuCount === 0) {
        let orderNo = 1;
        rowData.forEach((item) => {
        const obj = {
          ItemNo: item.ItemNo,
          ModuleName: item.MenuName == null ? item.ModuleName : item.MenuName,
          ModuleCode: item.ModuleCode,
          OrderNo: orderNo
      };
      this.gridApiFastMenu.updateRowData({ add: [obj] });
      orderNo++;
    });
  } else {
        const lastIndex = this.gridApiFastMenu.getLastDisplayedRow();
        const tempData = [];
        this.gridApiFastMenu.forEachNode(node => tempData.push(node.data));
        let abc: number;
        abc = lastIndex + 1 ;
        const xx = tempData.filter(x => x.ItemNo === abc)[0];
        let maxOrderNo = xx.OrderNo + 1;
        rowData.forEach((item) => {
          const obj = {
            ItemNo: item.ItemNo,
            ModuleName: item.MenuName == null ? item.ModuleName : item.MenuName,
            ModuleCode: item.ModuleCode,
            OrderNo: maxOrderNo
        };
        this.gridApiFastMenu.updateRowData({ add: [obj] });
        maxOrderNo++;
      });
    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }
}

  addSelectedToMenu() {
    this.selectedFastMenuItem = this.gridApiFastMenu.getSelectedRows();
    if (this.selectedFastMenuItem != null) {
      this.gridApiFastMenu.updateRowData({ remove: this.selectedFastMenuItem });
      this.selectedFastMenuItem.forEach((item) => {
        const obj = {
          ItemNo: item.ItemNo,
          MenuName: item.ModuleName,
          ModuleCode: item.ModuleCode
        };
        this.gridApiMenu.updateRowData({ add: [obj] });
      });
    }
    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }

  addAllToMenu() {
    const rowData = [];
    this.gridApiFastMenu.forEachNode(node => rowData.push(node.data));
    this.gridApiFastMenu.updateRowData({ remove: rowData });
    rowData.forEach((item) => {
      const obj = {
        ItemNo: item.ItemNo,
        MenuName: item.MenuName == null ? item.ModuleName : item.MenuName,
        ModuleCode: item.ModuleCode
      };
      this.gridApiMenu.updateRowData({ add: [obj] });
    });

    this.RefreshItemNoFastMenu();
    this.RefreshItemNoMenu();
  }


  RefreshItemNoMenu() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApiMenu.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApiMenu.updateRowData({ update: itemsToUpdate });
  }

  RefreshItemNoFastMenu() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.gridApiFastMenu.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.gridApiFastMenu.updateRowData({ update: itemsToUpdate });
  }

  RefreshOrderNoFastMenu() {
    let CurrItemNo = 0;
    let MaxOrderNo = 0;
    const itemsToUpdate = [];
    this.gridApiFastMenu.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    MaxOrderNo = CurrItemNo;
    this.gridApiFastMenu.updateRowData({ update: itemsToUpdate });
  }


  onSave() {
    this.gridApiFastMenu.stopEditing();
    this.gridApiMenu.stopEditing();

    const fastMenuData = [];
    this.gridApiFastMenu.forEachNode(node => fastMenuData.push(node.data));
    this.UserDetails.SaveFastMenuList(fastMenuData).subscribe(res => {
      this.Reloadable = true;
      this.showMessage('ثبت با موفقیت انجام شد');
    },
      err => {
        this.Reloadable = false;
        this.showMessage('ثبت با مشکل مواجه شد');
      }
    );
  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    if ( this.Reloadable === true ) {
    window.location.reload();
    }
  }
  popupclosed() {
    this.btnclicked = false;
  }

  showMessage(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.alertMessageParams.message = message;
  }
}
