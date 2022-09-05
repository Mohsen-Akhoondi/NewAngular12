import { Component, OnInit, ViewChild, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { TreeNode, TreeComponent } from '@circlon/angular-tree-component';
declare var $: any;
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class MyTreeComponent implements OnInit {
  @Input() FirstID = 0;
  @Input() SecondID;
  @Input() InputParam;
  @Input() HasFilter = false;
  FilterText ;
  public scrollbarOptions = { axis: 'y', theme: 'inset-2-dark', scrollButtons: { enable: true } };
  constructor() {
   }
  nodes = [];
  FirstSelected = true;
  children = [];
  @Output() selectedchange: EventEmitter<any> =
    new EventEmitter<any>();
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  options = {
    rtl: true,
    getChildren: (node: TreeNode) => {
      this.children = this.GetChildren(node.id);
      return this.children;
    }
  };
  GetChildren(ParentID) {
    return this.InputParam.GetChildren({ Owner: this.InputParam.Owner, ParentID: ParentID });
  }
  ngOnInit() {
  }
  event(event) {
    if (event.eventName === 'toggleExpanded') {
      $('#price-list-sidebar').css('width', '-moz-max-content');
    } else if (event.eventName === 'activate') {
      if (!this.FirstSelected) {
        event.node.expand();
      } else {
        this.FirstSelected = false;
      }
      this.selectedchange.emit(event.node.data);
    }
  }
  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnChanges(changes: SimpleChanges) {
    this.FirstSelected = true;
    if (changes.SecondID && changes.SecondID.currentValue) {
      this.nodes = [];
      this.InputParam.GetRoots({ Owner: this.InputParam.Owner, FirstID: null, SecondID: changes.SecondID.currentValue })
        .then((nodes) => {
          nodes.forEach(node => {
            this.nodes.push(node);
            this.tree.treeModel.update();
            this.tree.treeModel.getFirstRoot().toggleActivated();
          });
        });
    } else {
      if (changes.FirstID && changes.FirstID.currentValue) {
        this.nodes = [];
        this.InputParam.GetRoots({ Owner: this.InputParam.Owner, FirstID: changes.FirstID.currentValue, SecondID: null })
          .then((nodes) => {
            nodes.forEach(node => {
              this.nodes.push(node);
              this.tree.treeModel.update();
              this.tree.treeModel.getFirstRoot().toggleActivated();
            });
          });
      }
    }
  }

  Filterkeyup(event) {
      this.tree.treeModel.filterNodes(this.FilterText);
  }
}
