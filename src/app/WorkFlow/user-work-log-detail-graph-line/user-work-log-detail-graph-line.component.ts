import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';

interface IHierarchical {
  nodes: Node[],
  links: Edge[]
}

@Component({
  selector: 'app-user-work-log-detail-graph-line',
  templateUrl: './user-work-log-detail-graph-line.component.html',
  styleUrls: ['./user-work-log-detail-graph-line.component.css']
})

export class UserWorkLogDetailGraphLineComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupMaximized;
  nodes: Node[];
  links: Edge[];
  hierarchical: IHierarchical;
  WorkFlowInstanceIDLine;
  autoZoom: boolean = false;
  autoCenter: boolean = true;
  viewsize = [1100 ,520];
  constructor(private workFlowService: WorkflowService, private router: Router) { }

  ngOnInit() {
     this.WorkFlowInstanceIDLine = this.InputParam.WorkFlowLineInstanceIdSelected;

    this.workFlowService.GetNodesLineByInstance(this.WorkFlowInstanceIDLine).subscribe(res => {
      this.nodes = res;
    });

    this.workFlowService.GetEdgesLineByInstance(this.WorkFlowInstanceIDLine).subscribe(res => {
      this.links = res;
    });

    this.hierarchical = {
      nodes: this.nodes,
      links: this.links
    };
  }

  ngOnChanges(changes): void {

    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.viewsize = changes.PopupMaximized.currentValue ? [1300 ,550] : [1100 ,500];      
    }
 }
 closeModal() {
  this.Closed.emit(true);
}

}
