import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.css']
})
export class TreeSelectComponent implements ICellEditorAngularComp, OnInit {
  @Input() TreeSelectParams;
  @Input() Items;
  @Input() CheckValidate;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private CommonService: CommonServices) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes && changes.Items && changes.Items.currentValue) {
      this.Items = changes.Items.currentValue;
    }
    if (changes && changes.TreeSelectParams && changes.TreeSelectParams.currentValue) {
      this.TreeSelectParams = changes.TreeSelectParams.currentValue;
    }
    if (changes && changes.CheckValidate && changes.CheckValidate.currentValue) {
      this.CheckValidate = changes.CheckValidate.currentValue;
    }
  }
  onChangeselectedObject(event) {
    this.selectedChange.emit(this.TreeSelectParams.selectedObject);
  }


  getValue() {
    if (this.Items) {
      return this.TreeSelectParams.selectedObject;
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
  agInit(data): void {
    if (data.Params) {
      this.TreeSelectParams = data.Params;
    }
    if (data.node && data.node.data && (data.node.data[data.Params.bindValue] || data.node.data[data.Params.bindLable])) {
      this.TreeSelectParams.selectedObject = data.node.data[data.Params.bindValue] ?
        data.node.data[data.Params.bindValue] : data.node.data[data.Params.bindLable];
    }
    if (data.Items) {
      data.Items.subscribe(res => {
        this.Items = this.CommonService.FlatlistToTree(res, this.TreeSelectParams.ObjectID, this.TreeSelectParams.ParentObjectID);
      });
    }
  }
  afterGuiAttached?(params): void {
  }

}
