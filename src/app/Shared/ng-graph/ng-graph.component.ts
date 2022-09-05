import { Component, Input, OnInit } from '@angular/core';
import { Edge } from '@swimlane/ngx-graph';

interface IHierarchical {
  nodes: Node[],
  links: Edge[]
}

@Component({
  selector: 'app-ng-graph',
  templateUrl: './ng-graph.component.html',
  styleUrls: ['./ng-graph.component.css']
})
export class NgGraphComponent implements OnInit {
  @Input() HeightPercent = 80;
  @Input() nodes: Node[];
  @Input() links: Edge[];
  @Input() viewsize = [1100, 500];
  @Input() autoZoom: boolean = false;
  @Input() autoCenter: boolean = true;
  @Input() HasImage: boolean = false;
  @Input() HasActorName: boolean = false;
  @Input() DimensionWidth = 0;
  hierarchical

  constructor() { }

  ngOnInit() {
    this.hierarchical = {
      nodes: this.nodes,
      links: this.links
    };
  }

  mouseleave() { }
  mouseEnter(event: MouseEvent) { }

}
