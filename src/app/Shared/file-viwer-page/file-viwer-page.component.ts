import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TreeComponent } from '@circlon/angular-tree-component';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';

declare var $: any;
@Component({
  selector: 'app-file-viwer-page',
  templateUrl: './file-viwer-page.component.html',
  styleUrls: ['./file-viwer-page.component.css']
})
export class FileViwerPageComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  CurrentIndex = 1;
  TotalCount = 0;
  LeafNodes = [];
  LeafIndex = 0;
  options = {
    rtl: true
  };
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  constructor(
    private ArchiveDetailServices: ArchiveDetailService
  ) { }

  ngOnInit() {
    this.InputParam.nodes.forEach(element => {
      element.children.forEach(element2 => {
        this.LeafNodes.push(element2);
      });
    });
  }
  event(event) {
    if (event.eventName === 'activate') {
      event.node.expand();
      const CurrIndex = this.LeafNodes.findIndex(x => x.id === event.node.data.id);
      if (CurrIndex >= 0 && this.LeafIndex !== CurrIndex) {
        this.LeafIndex = CurrIndex;
        this.ArchiveDetailServices.GetArchiveFileByDocID(this.LeafNodes[this.LeafIndex].id).subscribe(res => {
          const FileRes = [];
          FileRes.push(res);
          this.InputParam.FileList = FileRes;
        });
        this.tree.treeModel.getNodeById(this.LeafNodes[this.LeafIndex].ParentID).toggleActivated();
        this.tree.treeModel.getNodeById(this.LeafNodes[this.LeafIndex].id).toggleActivated();
      }
    }
  }
  onNextFile() {
    if (this.LeafIndex < this.LeafNodes.length - 1) {
      this.LeafIndex++;
    } else {
      this.LeafIndex = 0;
    }
    this.ArchiveDetailServices.GetArchiveFileByDocID(this.LeafNodes[this.LeafIndex].id).subscribe(res => {
      const FileRes = [];
      FileRes.push(res);
      this.InputParam.FileList = FileRes;
    });
    this.tree.treeModel.getNodeById(this.LeafNodes[this.LeafIndex].ParentID).toggleActivated();
    this.tree.treeModel.getNodeById(this.LeafNodes[this.LeafIndex].id).toggleActivated();
  }
  onPreviousFile() {
    if (this.LeafIndex > 0) {
      this.LeafIndex--;
    } else {
      this.LeafIndex = this.LeafNodes.length - 1;
    }
    this.ArchiveDetailServices.GetArchiveFileByDocID(this.LeafNodes[this.LeafIndex].id).subscribe(res => {
      const FileRes = [];
      FileRes.push(res);
      this.InputParam.FileList = FileRes;
    });
    this.tree.treeModel.getNodeById(this.LeafNodes[this.LeafIndex].ParentID).toggleActivated();
    this.tree.treeModel.getNodeById(this.LeafNodes[this.LeafIndex].id).toggleActivated();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.tree.treeModel.getFirstRoot().toggleActivated();
    this.tree.treeModel.getNodeById(this.LeafNodes[0].id).toggleActivated();
    $('.sidebar').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
        if (ui.size.width === 15) {
          $('.sidebar').css('min-width', '125px');
          $('.side-icon').css('background', 'url("assets/Icons/mini-right.gif") no-repeat right');
        }
      }
    });
    $('.ui-resizable-w').append('<span class="side-icon"><span>');
    $('.side-icon').on('click', function () {
      if ($('.sidebar').css('min-width') === '125px') {
        $('.sidebar').css('min-width', '5px');
        $('.sidebar').css('width', '5px');
        $('.sidebar').css('margin-right', '2px');
        $('.toggle-children-wrapper').css('display', 'none');
        $('.side-icon').css('background', 'url("assets/Icons/mini-left.gif") no-repeat right');
      } else {
        $('.sidebar').css('min-width', '125px');
        $('.sidebar').css('width', '235px');
        $('.toggle-children-wrapper').css('display', 'inline-block');

        $('.side-icon').css('background', 'url("assets/Icons/mini-right.gif") no-repeat right');
      }
    });
  }
  closeModal() {
    this.Closed.emit(true);
  }
}
