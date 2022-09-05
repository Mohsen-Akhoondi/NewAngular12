import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { of } from 'rxjs';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { CheckboxFieldEditableComponent } from 'src/app/Shared/checkbox-field-editable/checkbox-field-editable.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-price-list-topic',
  templateUrl: './price-list-topic.component.html',
  styleUrls: ['./price-list-topic.component.css']
})
export class PriceListTopicComponent implements OnInit {
  ModuleCode;
  columnDefPriceList: any;
  rowData: any;
  gridApi: any;
  gridHeight = 97;
  mainBodyHeight = 95;
  ChangeDetection = false;
  btnclicked: boolean;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  itemNo = 0;
  @ViewChild('PriceListTopicIsValid') PriceListTopicIsValid: TemplateRef<any>;

  constructor(private router: Router, private PriceList: PriceListService,
    private User: UserSettingsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.columnDefPriceList = [

      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      // {
      //   headerName: 'شناسه فهرست بها',
      //   field: 'PriceListTopicID',
      //   width: 120,
      //   resizable: true,
      //   editable: true
      // },
      {
        headerName: 'کد عنوان فهرست بها',
        field: 'PriceListTopicCode',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 16 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'عنوان فهرست بها',
        field: 'PriceListTopicName',
        width: 600,
        resizable: true,
        editable: true
      },
      {
        headerName: 'کد سطح فهرست بها',
        field: 'PriceListLevelCode',
        width: 130,
        resizable: true,
        editable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellEditorParams: { MaxLength: 1 },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'نشانگر اعتبار',
        field: 'IsValid',
        width: 100,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        editable: true,
        cellEditorFramework: CheckboxFieldEditableComponent,
        valueFormatter: function isValidFormer(params) {
          if (params.value) {
            return 'معتبر';
          } else {
            return 'نامعتبر';
          }
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.PriceListTopicIsValid
        },
      }
    ];
  }

  ngOnInit() {
    this.getNewData();
    this.rowData = of([]);
    this.User.GetModulOPByUser(this.ModuleCode).subscribe(res => {
      this.HaveSave = false;
      this.HaveDelete = false;
      this.HaveUpdate = false;
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
  getNewData(): any {
    this.PriceList.GetPriceListTopics(false).subscribe(res => {
      this.rowData = res;
    });
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
  }

  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }

  onCellValueChanged(event) {

    let itemsToUpdate = [];
    this.ChangeDetection = true;
    if (event.newValue && event.columnDefPriceList &&
      event.columnDefPriceList.field === 'IsValid') {
      itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.IsValid = event.newValue;
          itemsToUpdate.push(node.data);
        }
      });
      this.gridApi.updateRowData({ update: itemsToUpdate });
    }
  }
  onSave() {
    this.gridApi.stopEditing();

    const PriceListTopicSet = [];
    this.gridApi.forEachNode(function (node) {
      if (!node.data.IsValid) {
        node.data.IsValid = false;
      }
      PriceListTopicSet.push(node.data);
    });
    this.PriceList.SavePriceListTopicNoLeaf(PriceListTopicSet).subscribe(res => {
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
      this.ChangeDetection = false;
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
      }
    );
  }
  MessageBoxAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.btnclicked = false;
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
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

  popupclosed() {
    this.btnclicked = false;
  }
}
