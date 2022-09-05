import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { LoadingService } from 'src/app/Load/loading/LoadingService';

@Component({
  selector: 'app-ng-select-cell-editor',
  templateUrl: './ng-select-cell-editor.component.html',
  styleUrls: ['./ng-select-cell-editor.component.css']
})
export class NgSelectCellEditorComponent implements ICellEditorAngularComp, OnInit {
  Items = [];
  bindLabelProp;
  bindValueProp;
  multiField;
  minwidth;
  firsField;
  nextField;
  NgSelectedObj;
  @Output() SelectedChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private IsLoading: LoadingService) { }
  @ViewChild('NgSelectRef') NgSelectElement;
  ngOnInit() {
  }
  getValue() {
    if (this.Items) {
      return this.Items.filter(x => x[this.bindValueProp] === this.NgSelectedObj)[0];
    } else { return ''; }
  }
  isPopup?(): boolean {
    return false;
  }
  isCancelBeforeStart?(): boolean {
    return false;
  }
  isCancelAfterEnd?(): boolean {
    return false;
  }
  focusIn?(): void {
  }
  focusOut?(): void {
  }
  afterGuiAttached?(params?): void {
    this.NgSelectElement.filterInput.nativeElement.focus();
  }
  agInit(params) {
    if (params.Items) {
      this.IsLoading.Show();
      params.Items.subscribe(res => {
        if (!params.multiField) {
          this.Items = res;
        } else {
          for (const i of res) {
            i[params.multiField] = i[params.firsField] + ' ' + i[params.nextField];
          }
          this.Items = res;
        }
        if (params.value && params.node && params.node.data) {
          this.NgSelectedObj = params.value[params.bindValueProp] ?
            params.value[params.bindValueProp] : params.node.data[params.bindValueProp];
        }
        this.IsLoading.Hide();
      });
    } else if (params.HardCodeItems) {
      this.IsLoading.Show();
      if (!params.multiField) {
        this.Items = params.HardCodeItems;
      } else {
        for (const i of params.HardCodeItems) {
          i[params.multiField] = i[params.firsField] + ' ' + i[params.nextField];
        }
        this.Items = params.HardCodeItems;
      }
      if (params.value && params.node && params.node.data) {
        this.NgSelectedObj = params.value[params.bindValueProp] ?
          params.value[params.bindValueProp] : params.node.data[params.bindValueProp];
      }
      this.IsLoading.Hide();
    }
    this.bindLabelProp = params.bindLabelProp;
    this.bindValueProp = params.bindValueProp;
  }
  selectedchange(event) {
    this.SelectedChange.emit(event);
  }
}
