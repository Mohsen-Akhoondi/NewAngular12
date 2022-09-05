import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ActivatedRoute } from '@angular/router';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-product-request-person-item',
  templateUrl: './product-request-person-item.component.html',
  styleUrls: ['./product-request-person-item.component.css']
})
export class ProductRequestPersonItemComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestPersonClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ProductRequestCode;
  PRPersonHaveDelete = true;
  CheckRegionWritable;
  ProductRequestDate;
  CostFactorID;
  Subject;
  IsEditable = true;
  PRPersonItemRowData = [];
  ProductRequestPersoncolDef;
  startLeftPosition;
  startToptPosition;
  MainMaxwidthPixel;
  PercentWidth: number;
  PRPersonGridApi: any;
  selectedObject: any;
  HaveMaxBtn: boolean;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  SelectedRegionCode;
  btnclicked = false;
  PopUpType: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ProductRequestObject;
  ModuleCode: number;
  NgSelectPersonParams = {
    bindLabelProp: 'PersonName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'person'
  };
  HaveSaveEditable = true;
  startTopPosition: number;
  constructor(private ProductRequest: ProductRequestService,
    private User: UserSettingsService,
    private ContractList: ContractListService,
    private Actor: ActorService,
    private route: ActivatedRoute,
    private RefreshPersonItems: RefreshServices) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (!this.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }
    const promise = new Promise<void>((resolve, reject) => {
      this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
        res.forEach(node => {
          switch (node.OperationCode) {
            case 7:
              this.HaveSave = true;
              break;
            case 6:
              this.HaveDelete = true;
              break;
            case 16:
              this.HaveUpdate = true;
              break;
            default:
              break;
          }
        });
        resolve();
      });
    }).then(() => {
      if (this.PopupParam.ModuleViewTypeCode && this.PopupParam.ModuleViewTypeCode === 7) {
        this.IsEditable = false;
      }
      if (this.PopupParam.ModuleViewTypeCode) {
        switch (Number(this.PopupParam.ModuleViewTypeCode)) {
          case 2:
            this.HaveSaveEditable = false;
            this.IsEditable = false;
            break;
          case 95:
            if (this.PopupParam.ProductRequestObject.RegionCode === 200) {
              this.HaveSaveEditable = false;
              this.IsEditable = false;
            }
            break;
          case 100000:
            this.HaveSaveEditable = true;
            this.IsEditable = true;
            break;
          case 500000:
          case 600000:
            this.HaveSaveEditable = false;
            this.IsEditable = false;
            this.HaveUpdate = false;
            this.HaveDelete = false;
            this.PRPersonHaveDelete = false;
            this.IsEditable = false;
            break;
          default:
            break;
        }
      }

      if (this.PopupParam && this.PopupParam.PopUpType === 'product-request-person-item' && this.PopupParam.ModuleViewTypeCode === 100000) {
        this.HaveSaveEditable = false;
        this.IsEditable = false;
      }

      this.ProductRequestPersoncolDef = [// IsEditable Moteghayer
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true,
          editable: false,
        },
        {
          headerName: 'نام نقش ',
          field: 'RoleName',
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: this.ContractList.GetRolesListByRegion(this.PopupParam.RegionCode),
            bindLabelProp: 'RoleName',
            bindValueProp: 'RoleID'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.RoleName;
            } else {
              return '';
            }
          },
          editable: (params) => {
            if (this.PopupParam.ModuleViewTypeCode === 500000) {
              return false;
            } else {
              if (this.PopupParam.ModuleViewTypeCode && this.PopupParam.ModuleViewTypeCode === 7) {
                return false;
              } if (params.data.RoleID === 1156 || params.data.RoleID === 963 || params.data.RoleID === 974 || params.data.RoleID === 1301) {
                return false;
              } else {
                return this.IsEditable;
              }
            }
          },
          width: 200,
          resizable: true
        },
        {
          headerName: ' نام شخص  ',
          field: 'PersonName',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.NgSelectPersonParams,
            Items: [],
            Owner: this
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.PersonName;
            } else {
              return '';
            }
          },
          editable: this.PopupParam.ModuleViewTypeCode === 500000 ? false : this.IsEditable,
          width: 300,
          resizable: true
        },
      ];
      this.CheckRegionWritable = this.PopupParam.CheckRegionWritable;
      this.ProductRequestObject = this.PopupParam.ProductRequestObject;
      this.PRPersonItemRowData = this.ProductRequestObject.RequestPersonList;
      this.Subject = this.PopupParam.Subject;
      this.ProductRequestDate = this.PopupParam.ProductRequestObject.ShortProductRequestDate;;
      this.ProductRequestCode = this.PopupParam.ProductRequestCode;
      this.SelectedRegionCode = this.PopupParam.RegionCode;
      this.CostFactorID = this.PopupParam.CostFactorID;
    });
  }

  onPRPersonGridReady(params) {
    this.PRPersonGridApi = params.api;
    if (this.PopupParam.ModuleViewTypeCode && this.PopupParam.ModuleViewTypeCode === 7 && this.PRPersonGridApi) {
      const PRPerson = {
        ItemNo: 1,
        RoleID: 972,
        RoleName: 'کارشناس امور قراردادها'
      };
      this.PRPersonGridApi.updateRowData({ add: [PRPerson] });
    }
  }

  onPRPersonCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'RoleName') {
      const itemsToUpdate = [];
      this.PRPersonGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PersonName = '';
          node.data.RoleName = event.newValue;
          node.data.RoleID = event.newValue.RoleID;
          itemsToUpdate.push(node.data);
        }
      });
      this.PRPersonGridApi.updateRowData({ update: itemsToUpdate });
    } else if (event.colDef && event.colDef.field === 'PersonName') {
      this.ProductRequestPersoncolDef[2].cellEditorParams.Params.loading = true;
      if ((event.data.RoleID === 974 || event.data.RoleID === 975) && this.ProductRequestObject.RegionCode === 200) {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: this.PopupParam.RequestedPersonItems,
          type: 'person'
        });
      } else {
        this.Actor.GetPersonList(event.data.RoleID,null, this.ProductRequestObject.RegionCode, false).subscribe(ress => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: ress,
            type: 'person'
          });
        });
      }
      const itemsToUpdate = [];
      this.PRPersonGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PersonName = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.PRPersonGridApi.updateRowData({ update: itemsToUpdate });
      this.ProductRequestPersoncolDef[2].cellEditorParams.Params.loading = false;
    }
  }
  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
  }
  Close() {
    this.btnclicked = false;
    this.ProductRequestPersonClosed.emit(true);
  }
  onSave() {
    if (this.CheckRegionWritable) {
      this.ShowMessageBoxWithOkBtn('امکان ثبت به دلیل دسترسی فقط خواندنی کاربر در این واحد اجرایی وجود ندارد');
      return;
    }
    this.PRPersonGridApi.stopEditing();
    const ProductRequestPersonList = [];

    this.PRPersonGridApi.forEachNode(node => {
      const ProductRequestPerson = {
        ProductRequestPersonID: node.data.ProductRequestPersonID ? node.data.ProductRequestPersonID : -1,
        CostFactorID: this.CostFactorID,
        // tslint:disable-next-line:max-line-length
        ActorID: node.data.PersonName && node.data.PersonName.ActorId ? node.data.PersonName.ActorId : (node.data.ActorID ? node.data.ActorID : -1),
        RoleID: node.data.RoleName && node.data.RoleName.RoleID ? node.data.RoleName.RoleID : (node.data.RoleID ? node.data.RoleID : -1),
      };
      ProductRequestPersonList.push(ProductRequestPerson);
    });
    this.ProductRequest.SaveProductRequestPerson(this.ProductRequestObject,
      this.CostFactorID,
      ProductRequestPersonList, this.ModuleCode, this.PopupParam.OrginalModuleCode).subscribe(res => {
        this.ProductRequestObject = res;
        this.PRPersonItemRowData = this.ProductRequestObject.RequestPersonList;
        this.PopupOutPut.emit(this.ProductRequestObject);
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      },
        err => {
          if (!err.error.Message.includes('|')) {
            this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
          }
        }
      );
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 515;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  onRowClick(row) {
    if (this.PopupParam.ModuleViewTypeCode !== 200000 && this.PopupParam.ModuleViewTypeCode !== 300000) {
      if (row && (row.data.RoleID === 1156 || row.data.RoleID === 963 || row.data.RoleID === 974 || row.data.RoleID === 1301)) {
        this.PRPersonHaveDelete = false;
      } else {
        this.PRPersonHaveDelete = true;
      }
    }
  }
  oncellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'PersonName') {
      // tslint:disable-next-line:max-line-length
      if ((event.data.RoleID === 974 || event.data.RoleID === 975) && this.ProductRequestObject.RegionCode === 200) {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: this.PopupParam.RequestedPersonItems,
          type: 'person'
        });
      } else {
        this.Actor.GetPersonList(event.data.RoleID,null, this.ProductRequestObject.RegionCode, false).subscribe(ress => {
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: ress,
            type: 'person'
          });
        });
      }
      const itemsToUpdate = [];
      this.PRPersonGridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PersonName = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.PRPersonGridApi.updateRowData({ update: itemsToUpdate });
      this.ProductRequestPersoncolDef[2].cellEditorParams.Params.loading = false;
    }
  }
  // OnProductRequestDateChange(ADate) {
  //   this.ProductRequestDate = ADate.MDate;
  // }
}
