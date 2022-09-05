import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { Observable } from 'rxjs';
import { resolve } from 'path';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { sequence } from '@angular/animations';
import { reject } from 'q';

@Component({
  selector: 'app-module-view-type',
  templateUrl: './module-view-type.component.html',
  styleUrls: ['./module-view-type.component.css']
})
export class ModuleViewTypeComponent implements OnInit {
  rowData = [];
  Dto: any[];
  ModuleCode: number;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  btnclicked = false;
  HaveHeader: boolean;
  type: string;
  private GridApi;
  NextModuleViewTypeCodeSequence: number;
  ModuleList: Observable<any>;
  BoxDevHeight: number;
  HasSave: boolean;
  ModuleViewTypeColDef: any;
  PreviousSelectedModuleCode: number;
  MaxSequenceModuleViewTypeCodeFromGrid: number;
  MaxModuleViewTypeCode: number;
  private sub: any;
  constructor(private ModuleViewTypeServices: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private users: UserSettingsService,
    private Modules: ModuleService) {
    this.MaxModuleViewTypeCode = 0;
    this.PreviousSelectedModuleCode = 0;
    this.MaxSequenceModuleViewTypeCodeFromGrid = 0;
    this.sub = this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve) => {
      this.users.CheckAdmin().subscribe((res: boolean) => {
        this.HasSave = res;
        resolve(res);
      });
    }).then((save: boolean) => {
      this.ModuleViewTypeColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 75,
          resizable: true
        },
        {
          headerName: 'نام نوع فعالیت',
          field: 'ModuleName',
          width: 200,
          resizable: true,
          editable: save,
          cellEditorFramework: NgSelectCellEditorComponent,
          cellEditorParams: {
            Items: this.ModuleList,
            bindLabelProp: 'ModuleName',
            bindValueProp: 'ModuleCode'
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.ModuleName;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'کد نوع نمایش فعالیت ',
          field: 'ModuleViewTypeCode',
          width: 125,
          editable: save,
          resizable: true
        },
        {
          headerName: 'نام نوع نمایش فعالیت ',
          field: 'ModuleViewTypeName',
          width: 550,
          editable: save,
          resizable: true
        },
      ];
    });
    this.ModuleList = this.Modules.GetWebModules();
    this.GetallModuleViewTypes();
  }
  GetallModuleViewTypes() {
    this.rowData = [];
    this.Modules.GetModuleViewTypeList().subscribe(res => {
      this.rowData = res;
    });
  }
  ModuleViewTypeGridReady(event) {
    this.GridApi = event.api;
  }
  ModuleViewTypeCellValueChanged(event) {
    const itemsToUpdate = [];
    if (event.colDef && event.colDef.field === 'ModuleName') {
      if (!(event.data.ModuleName.ModuleCode === event.data.ModuleCode)) {
        const ChangedModuleCode = event.data.ModuleName.ModuleCode ? event.data.ModuleName.ModuleCode :
          event.data.ModuleCode ? event.data.ModuleCode : null;
        this.PreviousSelectedModuleCode = ChangedModuleCode;
        // tslint:disable-next-line: no-shadowed-variable
        const promise = new Promise((resolve, reject) => {
          this.Modules.GetModuleViewTypeCodeSequence(ChangedModuleCode).subscribe((res: number) => {
            resolve(res);
          });
        }).then((ModuleViewTypeCodeSequence: number) => {
          if (!event.data.ModuleViewTypeID) {
            ModuleViewTypeCodeSequence = this.GetNextSequence(ChangedModuleCode, ModuleViewTypeCodeSequence, event.rowIndex, false);
          } else {
            ModuleViewTypeCodeSequence = this.GetNextSequence(ChangedModuleCode, ModuleViewTypeCodeSequence, event.rowIndex, true);
          }
          this.GridApi.forEachNode(res => {
            if (res.rowIndex === event.rowIndex) {
              res.data.ModuleViewTypeCode = ModuleViewTypeCodeSequence;
              res.data.ModuleCode = res.data.ModuleName.ModuleCode;
              itemsToUpdate.push(res.data);
            }
          });
          this.GridApi.updateRowData({ update: itemsToUpdate });
        });
      }
    }
  }
  GetNextSequence(ModuleCode: number, Sequence: number, RowIndex: number, IsExists: boolean): number {
    this.MaxModuleViewTypeCode = 0;
    const max = 0;
    this.GridApi.stopEditing();
    const Records = [];
    this.GridApi.forEachNode(res => {
      if (!res.data.ModuleCode) {
        res.data['ModuleCode'] = 0;
      }
      if (!res.data.ModuleName) {
        res.data['ModuleName'] = [];
        res.data.ModuleName.ModuleName = '';
        res.data.ModuleName.ModuleCode = 0;
      }
      Records.push(res);
    });
    Records.filter(x => x.data.ModuleCode === ModuleCode ||
      x.data.ModuleName.ModuleCode === ModuleCode &&
      (x.rowIndex !== RowIndex)).forEach(res => {
        if (res.data.ModuleViewTypeCode > this.MaxModuleViewTypeCode) {
          this.MaxModuleViewTypeCode = res.data.ModuleViewTypeCode;
        }
      });
    if (!IsExists) {
      const Offset = (Records.filter(x => (!x.data.ModuleViewTypeID) &&
        (x.data.ModuleCode === ModuleCode || x.data.ModuleName.ModuleCode === ModuleCode)).length)
        + Sequence;
      if (this.MaxModuleViewTypeCode >= Offset) {
        return ++this.MaxModuleViewTypeCode;
      } else {
        return Offset;
      }
    } else {
      if (this.MaxModuleViewTypeCode >= Sequence) {
        return ++this.MaxModuleViewTypeCode;
      } else {
        return ++Sequence;
      }
    }
  }
  Save() {
    this.Dto = [];
    this.GridApi.forEachNode(res => {
      if (!res.data.ModuleName) {
        res.data['ModuleName'] = [];
        res.data.ModuleName.ModuleName = '';
        res.data.ModuleName.ModuleCode = 0;
      }
      if (!res.data.ModuleCode) {
        res.data['ModuleCode'] = 0;
      }
      if (!res.data.ModuleViewTypeCode) {
        res.data['ModuleViewTypeCode'] = 0;
      }
      const temp = {
        ModuleCode: res.data.ModuleName.ModuleCode ? res.data.ModuleName.ModuleCode : res.data.ModuleCode ? res.data.ModuleCode : 0,
        ModuleViewTypeCode: res.data.ModuleViewTypeCode ? res.data.ModuleViewTypeCode : 0,
        ModuleViewTypeName: res.data.ModuleViewTypeName,
        ModuleViewTypeID: res.data.ModuleViewTypeID ? res.data.ModuleViewTypeID : 0,
      };
      this.Dto.push(temp);
    });

    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise<void>((resolve) => {
      this.Modules.SaveModuleViewType(this.Dto, this.ModuleCode).subscribe(
        res => {
          this.btnclicked = true;
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ثبت با موفقیت انجام شد';
          resolve();
        },
        err => {
          this.btnclicked = true;
          this.type = 'message-box';
          this.HaveHeader = true;
          this.alertMessageParams.message = 'ثبت با مشکل مواجه شد';
        });
    }).then(() => {
      this.GetallModuleViewTypes();
    });

  }
  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }
}
