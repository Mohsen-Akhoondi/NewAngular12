import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { RoadTypeService } from 'src/app/Services/ContractService/BasemodulesService/RoadType/RoadTypeService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';


@Component({
  selector: 'app-road-type',
  templateUrl: './road-type.component.html',
  styleUrls: ['./road-type.component.css']
})
export class RoadTypeComponent implements OnInit {
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
  RoadTypeRow: any;
  HaveSave = false;
  HaveDelete = false;
  private gridApi;

  constructor(private route: ActivatedRoute,
    private User: UserSettingsService,
    private RoadType: RoadTypeService,
    private router: Router, ) {
    this.columnDef = [
      {
        headerName: 'کد نوع جاده ',
        field: 'RoadTypeCode',
        width: 90,
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
        headerName: 'نام نوع جاده ',
        field: 'RoadTypeName',
        width: 200,
        resizable: true,
        editable: true
      },
      {
        headerName: 'ضریب',
        field: 'Coef',
        width: 140,
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
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
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
    this.getRowData();
  }
  getRowData() {
    this.RoadTypeRow = this.RoadType.GetRoadType();
  }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  onSave() {
    this.gridApi.stopEditing();

    const rowData = [];
    this.gridApi.forEachNode(function(node) {
      node.data.Coef = parseFloat(node.data.Coef);
      rowData.push(node.data);
    });
    this.RoadType.SaveRoadType(rowData).subscribe(
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

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }

}
