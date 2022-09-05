import { Component, OnInit,Output,Input ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-to-group',
  templateUrl: './add-to-group.component.html',
  styleUrls: ['./add-to-group.component.css']
})
export class AddToGroupComponent implements OnInit {
  isClicked: boolean;
  HeightPercentWithMaxBtn: number;
  PercentWidth: number;
  MinHeightPixel: number;
  btnclicked = false;
  MainMaxwidthPixel;
  GroupNumber;
  @Output() TextSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  
  constructor() { }

  ngOnInit() {

  }

  BtnOkClick()
  {
    this.TextSelected.emit(this.GroupNumber);
    this.Closed.emit(true);
  }


  Close(): void {
    this.Closed.emit(true);
  }

}
