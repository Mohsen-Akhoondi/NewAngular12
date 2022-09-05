import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Edge, Node } from '@swimlane/ngx-graph';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-work-log-detail-graph',
  templateUrl: './user-work-log-detail-graph.component.html',
  styleUrls: ['./user-work-log-detail-graph.component.css']
})
export class UserWorkLogDetailGraphComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Input() PopupMaximized;

  WorkFlowInstanceID;
  autoZoom: boolean = false;
  autoCenter: boolean = true;
  viewsize = [1100, 500];
  HaveHeader: boolean;
  type: string;
  MinHeightPixel;
  PixelHeight;
  paramObj;
  btnclicked: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition;
  startTopPosition;
  IsLine = false;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  nodes: Node[];
  links: Edge[];

  constructor(private workFlowService: WorkflowService, private router: Router,) {
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 6;

    this.WorkFlowInstanceID = this.InputParam.WorkFlowInstanceIdSelected;
    if (!this.IsLine) {

      forkJoin([
        this.workFlowService.GetNodesByInstance(this.WorkFlowInstanceID),
        this.workFlowService.GetEdgesByInstance(this.WorkFlowInstanceID)
      ]).subscribe(res => {
        this.nodes = res[0];
        this.links = res[1];
      });
    }
    else {
      forkJoin([
        this.workFlowService.GetNodesLineByInstance(this.WorkFlowInstanceID),
        this.workFlowService.GetEdgesLineByInstance(this.WorkFlowInstanceID)
      ]).subscribe(res => {
        this.nodes = res[0];
        this.links = res[1];
      });
    }
  }

  ngOnChanges(changes): void {

    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.viewsize = changes.PopupMaximized.currentValue ? [1300, 500] : [1100, 500];
    }
  }

  popupclosed(event) {
    this.btnclicked = false;
  }

  BtnVeiwclick() {
    this.type = 'user-work-log-detail-graph-line';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.startTopPosition = 29;
    this.startLeftPosition = 159;
    this.HaveMaxBtn = true;
    this.MinHeightPixel = 625;
    this.PixelHeight = 625;
    this.paramObj = {
      HeaderName: 'مشاهده گراف خطی',
      WorkFlowLineInstanceIdSelected: this.WorkFlowInstanceID
    };
  }

  closeModal() {
    this.Closed.emit(true);
  }

  OnChangeCheckBoxValue(IsLine) {
    this.IsLine = IsLine;
    this.ngOnInit();

  }
}
