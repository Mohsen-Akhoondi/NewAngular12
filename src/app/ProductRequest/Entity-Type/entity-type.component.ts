import { Component, OnInit } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { isUndefined } from 'util';

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.css']
})
export class EntityTypeComponent implements OnInit {

  private ETgridApi;
  EntityTypecolumnDef;
  EntityTyperowData: any = [];

  private ETIgridApi;
  EntityTypeItemcolumnDef;
  EntityTypeItemrowData = [];

  private sub: any;
  ModuleCode;
  btnclicked = false;
  HaveMaxBtn = false;
  startLeftPosition: number;
  startTopPosition: number;
  PopupType;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader = false;
  defaultSelectedRowIndex = 0;

  SelectedEntityTypeRow: any;
  SelectedEntityTypeItem: any;
  HasRegion: boolean;
  WidthNoRegion = 40;
  WidthwithRegionNg = 70;
  constructor(private RegionService: RegionListService,
    private ProductRequest: ProductRequestService,
    private Module: ModuleService,
    private route: ActivatedRoute,
    private RefreshItems: RefreshServices,
    private ContractService: ContractListService,
    private router: Router,
    private Common: CommonService
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    this.EntityTypecolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 1000,
        resizable: true,
        editable: true,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.Subject;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Subject = params.newValue;
            const items = [];
            this.ETIgridApi.forEachNode(node => {
              node.data.EntityTypeID = node.data.EntityTypeID && node.data.EntityTypeID > 0
                && !isUndefined(node.data.EntityTypeID) ? node.data.EntityTypeID : -1;
              items.push(node.data);
            });
            this.SelectedEntityTypeRow.EntityTypeItemList = items;
            return true;
          } else {
            params.data.Subject = '';
            return false;
          }
        },
      },
    ];

    this.EntityTypeItemcolumnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 1000,
        resizable: true,
        editable: true,
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.Subject;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue) {
            params.data.Subject = params.newValue;
            const items = [];
            this.ETIgridApi.forEachNode(node => {
              node.data.EntityTypeItemID = node.data.EntityTypeItemID && node.data.EntityTypeItemID > 0
                && !isUndefined(node.data.EntityTypeItemID)
                ? node.data.EntityTypeItemID : -1;
              node.data.EntityTypeID = node.data.EntityTypeID && node.data.EntityTypeID > 0
                && !isUndefined(node.data.EntityTypeID) ? node.data.EntityTypeID
                : this.SelectedEntityTypeRow.EntityTypeID;
              items.push(node.data);
            });
            this.SelectedEntityTypeRow.EntityTypeItemList = items;
            return true;
          } else {
            params.data.Subject = '';
            return false;
          }
        },
      },
    ];
  }

  ngOnInit() {
    this.EntityTyperowData = [];
    this.ProductRequest.GetEntityTypeList().subscribe(res => {
      if (res) {
        this.EntityTyperowData = res;
      }
    });
  }
  onETGridReady(Param) {
    this.ETgridApi = Param.api;
  }
  onETIGridReady(Param) {
    this.ETIgridApi = Param.api;
  }


  EntityTypeRowClick(event) {
    this.ETIgridApi.stopEditing();
    if (event.data.EntityTypeItemList) {
      this.EntityTypeItemrowData = event.data.EntityTypeItemList;
    } else {
      this.EntityTypeItemrowData = [];
    }

    this.SelectedEntityTypeRow = event.data;
  }

  EntityTypeItemRowClick(event) {
    this.SelectedEntityTypeItem = event.data;
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  onSave() {
    this.ETIgridApi.stopEditing();
    this.ETgridApi.stopEditing();
    const EntityTypeListt = [];

    this.ETgridApi.forEachNode(function (node) {
      EntityTypeListt.push(node.data);
    });

    this.ProductRequest.SaveEntityTypeList(EntityTypeListt).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
      this.ngOnInit();
    });
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 545;
    this.startTopPosition = 207;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveNoBtn = false;
    this.alertMessageParams.HaveYesBtn = false;
  }

  popupclosed() {
    this.btnclicked = false;
    this.HaveMaxBtn = false;
    this.PopupType = '';
  }

  EntityTypeCellValueChanged(event) {
    const items = [];
    this.ETIgridApi.forEachNode(node => {
      node.data.EntityTypeID = node.data.EntityTypeID && node.data.EntityTypeID > 0
        && !isUndefined(node.data.EntityTypeID) ? node.data.EntityTypeID : -1;
      items.push(node.data);
    });
    this.SelectedEntityTypeRow.EntityTypeItemList = items;
  }

  EntityTypeItemCellValueChanged(event) {
    const items = [];
    this.ETIgridApi.forEachNode(node => {
      node.data.EntityTypeItemID = node.data.EntityTypeItemID && node.data.EntityTypeItemID > 0
        && !isUndefined(node.data.EntityTypeItemID)
        ? node.data.EntityTypeItemID : -1;
      node.data.EntityTypeID = node.data.EntityTypeID && node.data.EntityTypeID > 0
        && !isUndefined(node.data.EntityTypeID) ? node.data.EntityTypeID
        : this.SelectedEntityTypeRow.EntityTypeID;
      items.push(node.data);
    });
    this.SelectedEntityTypeRow.EntityTypeItemList = items;
  }

  EntityTypeonDeletedRow(event) {
    if (event) {
      this.EntityTypeItemrowData = [];
      const items = [];
      this.ETIgridApi.forEachNode(node => {
        items.push(node.data);
      });
      this.SelectedEntityTypeRow.EntityTypeItemList = items;
    }
  }

  EntityTypeItemonDeletedRow(event) {
    if (event) {
      const items = [];
      this.ETIgridApi.forEachNode(node => {
        items.push(node.data);
      });
      this.SelectedEntityTypeRow.EntityTypeItemList = items;
    }
  }
}
