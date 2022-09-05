import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-message-box',
  templateUrl: './group-message-box.component.html',
  styleUrls: ['./group-message-box.component.css']
})
export class GroupMessageBoxComponent implements OnInit {
  @Input() InputGroupMessageBox;
  @Output() groupmessageBoxResult: EventEmitter<any> = new EventEmitter<any>();
  @Output() groupmessageBoxClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  messagelist;
  constructor() { }

  ngOnInit() {
  }
  onClick(ActionType) {
    this.groupmessageBoxResult.emit(ActionType);
    this.close();
  }

  onCancelClick() {
    this.groupmessageBoxResult.emit('NO');
    this.close();
  }

  close() {
    this.groupmessageBoxResult.emit(true);
  }

}
