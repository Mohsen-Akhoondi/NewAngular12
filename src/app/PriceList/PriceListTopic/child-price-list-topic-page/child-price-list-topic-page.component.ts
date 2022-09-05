import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
@Component({
  selector: 'app-child-price-list-topic-page',
  templateUrl: './child-price-list-topic-page.component.html',
  styleUrls: ['./child-price-list-topic-page.component.css']
})
export class ChildPriceListTopicPageComponent implements OnInit {
  columnDefPriceList: any;
  rowData: any;
  gridApi: any;
  ChangeDetection = false;
  btnclicked: boolean;
  type: string;
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  itemNo = 0;
  LevelCode: number;
  ParentPriceListTopicCode;
  PriceListTopicQualifier;
  ParentPriceListPatternID;
  @Input() InputParam;
  @Output() PriceListTopicClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router, private PriceList: PriceListService) {
  }
  ngAfterViewInit(): void {
    this.columnDefPriceList = [

      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'کد عنوان فهرست بها',
        field: 'PriceListTopicCode',
        width: 120,
        resizable: true,
        editable: true,
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.PriceList.GetPriceListTopicByLevelCode(this.LevelCode, this.ParentPriceListPatternID,
            this.ParentPriceListTopicCode, false),
          bindLabelProp: 'PriceListTopicCode',
          bindValueProp: 'PriceListTopicID'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PriceListTopicCode;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'عنوان فهرست بها',
        field: 'PriceListTopicName',
        width: 730,
        resizable: true,
        editable: true
      },
      {
        headerName: 'کد سطح فهرست بها',
        field: 'PriceListLevelCode',
        width: 120,
        resizable: true,
        editable: true
      }
    ];
  }

  ngOnInit() {
    this.LevelCode = this.InputParam.PriceListTopicLeveCode + 1;
    this.ParentPriceListTopicCode = this.InputParam.PriceListTopicCode;
    this.PriceListTopicQualifier = this.InputParam.PriceListTopicQualifier;
    this.ParentPriceListPatternID = this.InputParam.PriceListPatternID;
    this.getNewData();
    this.rowData = of([]);
  }
  getNewData(): any {
    this.PriceList.GetLevelCodePriceListTopic(this.ParentPriceListPatternID, this.LevelCode).subscribe(res => {
      this.rowData = res;
    });
  }

  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  onCellValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'PriceListTopicCode') {
          this.PriceList.GetPriceListTopicName(event.newValue.PriceListTopicID).
         subscribe(res => {
            const itemsToUpdate = [];
            this.gridApi.forEachNode(node => {
              if (node.rowIndex === event.rowIndex) {
                node.data.PriceListTopicName =  res;
                node.data.PriceListLevelCode = this.LevelCode;
              }
          });
          this.gridApi.updateRowData({ update: itemsToUpdate });
      });
    }
  }

  close() {
    if (this.ChangeDetection) {
      this.ShowMessageBoxWithYesNoBtn('اطلاعات برآورد قراداد تغییر کرده است آیا می خواهید بدون ثبت اطلاعات از فرم خارج شوید ؟');
    } else {
      this.btnclicked = false;
      this.PriceListTopicClosed.emit(true);
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

 onSave() {
    this.gridApi.stopEditing();
  const PriceListTopicList = [];
  this.gridApi.forEachNode(node => {
    const PriceListTopicListItemObj = {
      ParentPriceListPatternID : this.ParentPriceListPatternID,
      PriceListTopicID: node.data.PriceListTopicCode.PriceListTopicID ? node.data.PriceListTopicCode.PriceListTopicID :
      (node.data.PriceListTopicID ? node.data.PriceListTopicID : null),
      PriceListTopicCode: node.data.PriceListTopicCode.PriceListTopicCode ? node.data.PriceListTopicCode.PriceListTopicCode :
      (node.data.PriceListTopicCode ? node.data.PriceListTopicCode : null),
     // PriceListLevelCode: node.data.PriceListLevelCode,
    };
    PriceListTopicList.push(PriceListTopicListItemObj);
  });
    // tslint:disable-next-line:max-line-length
    this.PriceList.SaveChildPriceListPattern(this.ParentPriceListPatternID,
      this.PriceListTopicQualifier, PriceListTopicList).subscribe(res => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.ChangeDetection = false;
        this.getNewData();
      },
        err => {
          this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
        }
      );
  }
  MessageBoxAction(ActionResult) {
    if (ActionResult === 'YES') {
      this.btnclicked = false;
      this.PriceListTopicClosed.emit(true);
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
  RowClick(event) {

  }
 onPriceListCodeEditingStarted(event) {
  if (event.newValue && event.colDef && event.colDef.field === 'PriceListTopicCode') {
    this.PriceList.GetPriceListTopicName(event.newValue.PriceListTopicID).
   subscribe(res => {
      const itemsToUpdate = [];
      this.gridApi.forEachNode(node => {
        if (node.rowIndex === event.rowIndex) {
          node.data.PriceListTopicName =  res;
          node.data.PriceListLevelCode = this.LevelCode;
        }
    });
    this.gridApi.updateRowData({ update: itemsToUpdate });
  });
  }
  }
}
