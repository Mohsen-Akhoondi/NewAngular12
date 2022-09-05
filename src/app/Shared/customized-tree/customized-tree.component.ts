import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeModel } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-customized-tree',
  templateUrl: './customized-tree.component.html',
  styleUrls: ['./customized-tree.component.css']
})
export class CustomizedTreeComponent implements OnInit {
  @Input() TreeHeight;
  @Input() FirstID;
  @Input() SecondID;
  @Input() InputParam : TreeModel;
  @Input() HasFilter = false;
  @Output() selectedchange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit() {
  }

  onSelectedchange(event) {
    this.selectedchange.emit(event);
  }

}
