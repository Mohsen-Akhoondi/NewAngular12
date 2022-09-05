import { Component, OnInit, ViewChild, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import { TreeNode, TreeComponent } from 'angular-tree-component';
import { isUndefined } from 'util';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-tree2',
  templateUrl: './tree2.component.html',
  styleUrls: ['./tree2.component.css']
})
export class Tree2Component implements OnInit {
  @Input() RegionGroupCode = 0;
  public scrollbarOptions = { axis: 'y', theme: 'inset-2-dark', scrollButtons: { enable: true } };
  constructor(private _DealsHallService: DealsHallService) { }
  nodes = [];
  CntSelectedFire = 0;
  FirstSelected = true;
  @Output() selectedchange: EventEmitter<any> =
    new EventEmitter<any>();
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  options = {
    rtl: true,
    getChildren: (node: TreeNode) => {
      return new Promise((resolve, reject) => {
        this.GetChildren(node.id).subscribe(data => {
          const children = [];
          data.forEach(item => {
            children.push({
              name: item.SubCostCenterName,
              id: item.SubCostCenterID,
              hasChildren: false,
              SubCostCenterCode: item.SubCostCenterCode,
              children: []
            });
          });
          resolve(children);
        });
      });
    },
    useCheckbox: true
  };
  GetChildren(CostCenterID) {
    return this._DealsHallService.GetCostCenterChildForDeals(CostCenterID);
  }
  ngOnInit() {

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes: SimpleChanges) {
    this.FirstSelected = true;
    if (changes.RegionGroupCode && !isUndefined(changes.RegionGroupCode.currentValue)) {
      this.CntSelectedFire = 0;
      this.nodes = [];
      this._DealsHallService.GetCostCenterRootsForDeals(changes.RegionGroupCode.currentValue).subscribe(res => {
        res.forEach(item => {
          this.nodes.push({
            name: item.CostCenterName,
            id: item.CostCenterID,
            hasChildren: item.hasChildren,
            CostCenterCode: item.CostCenterCode
          });
          this.tree.treeModel.update();
        });
      });
    }
  }
  event(event) {
  }
  onDeselect(event) {
    if (this.CntSelectedFire > 0) {
      this.CntSelectedFire--;
    }
    const SelectedNodes = Object.entries(event.treeModel.selectedLeafNodeIds)
      .filter(([key, value]) => {
        return (value === true);
      })
      .map((id) => {
        const node = event.treeModel.getNodeById(id[0]);
        return {
          CostCenterCode: node.data.CostCenterCode ? node.data.CostCenterCode : '',
          SubCostCenterCode: node.data.SubCostCenterCode ? node.data.SubCostCenterCode : ''
        };
      });
    setTimeout(() => {
      if (this.CntSelectedFire === SelectedNodes.length) {
        this.selectedchange.emit(SelectedNodes);
      }
    }, 500);

  }
  onSelect(event) {
    this.CntSelectedFire++;
    const SelectedNodes = Object.entries(event.treeModel.selectedLeafNodeIds)
      .filter(([key, value]) => {
        return (value === true);
      })
      .map((id) => {
        const node = event.treeModel.getNodeById(id[0]);
        return {
          CostCenterCode: node.data.CostCenterCode ? node.data.CostCenterCode : '',
          SubCostCenterCode: node.data.SubCostCenterCode ? node.data.SubCostCenterCode : ''
        };
      });
    setTimeout(() => {
      if (this.CntSelectedFire === SelectedNodes.length) {
        this.selectedchange.emit(SelectedNodes);
      }
    }, 500);

  }
}
