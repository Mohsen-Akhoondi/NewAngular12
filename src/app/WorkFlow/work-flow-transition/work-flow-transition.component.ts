import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkFlowGraphService } from 'src/app/Services/WorkFlowService/WorkFlowGraphService';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { forkJoin } from 'rxjs';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-work-flow-transition',
  templateUrl: './work-flow-transition.component.html',
  styleUrls: ['./work-flow-transition.component.css']
})

export class WorkFlowTransitionComponent implements OnInit {
  @Input() InputParam;
  @Input() PopupMaximized;
  viewsize = [1100, 500];
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  nodes = [];
  links = [];
  PopupParam;
  Note;
  WorkFlowTypeCode: any;
  autoZoom: boolean = false;
  autoCenter: boolean = true;
  btnclicked = false;
  type: string;
  paramObj;
  HaveHeader: boolean;
  OverstartLeftPosition: number;
  OverstartTopPosition: number;
  MinHeightPixel;
  PixelHeight;
  HaveMaxBtn = false;
  HoverNode = false;
  x;
  y;
  falg = true;
  HaveMax = true;
  constructor(private workFlowGraghService: WorkFlowGraphService,
    private router: Router) {
  }

  ngOnInit() {
    this.WorkFlowTypeCode = this.InputParam.workFlowTypeCodeSelected;

    forkJoin([
      this.workFlowGraghService.GetNodeList(this.WorkFlowTypeCode),
      this.workFlowGraghService.GetEdgeWorkFlow(this.WorkFlowTypeCode)
    ]).subscribe(res => {
      this.nodes = res[0];
      this.links = res[1];
    });

  }
  mouseEnter(event: MouseEvent) {
    // if(this.falg) {
    //   this.workFlowGraghService.GetNoteGraph(1, 2).subscribe(res => {
    //     this.Note = res;
    //   });
    //   this.x = event.clientX;
    //   this.y = event.clientY;
    //   this.HoverNode = true;
    //   this.NodeHover(this.x, this.y);
    //   this.falg = false;
    // }   


  }

  mouseleave() {
    // this.HoverNode = false;
    // this.falg = true;
  }

  NodeHover(x: any, y: any) {
    this.type = 'graph-hover';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    this.OverstartTopPosition = y;
    this.OverstartLeftPosition = x;
    this.MinHeightPixel = 100;
    this.PixelHeight = 200;
    this.paramObj = {
      HeaderName: 'مشاهده جزئیات'
    };
  }
  closeModal() {
    this.Closed.emit(true);
  }
  ngOnChanges(changes): void {

    if (changes.PopupMaximized && !isUndefined(changes.PopupMaximized.currentValue)) {
      this.viewsize = changes.PopupMaximized.currentValue ? [1320, 550] : [1100, 500];

    }
  }

  Pdfdownload() {
    //this.IsLoading.Show();
    var element = document.getElementById('table');
    var opt = {
      margin: 0,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
    //  this.IsLoading.Hide();
      window.open(pdf.output('bloburl'), '_blank');
    });
  }
}
