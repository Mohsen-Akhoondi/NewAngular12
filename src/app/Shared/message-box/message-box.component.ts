import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
 @Input() InputMessageBox;
 @Output() messageBoxResult: EventEmitter<any> = new EventEmitter<any>();
 @Output() messageBoxClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
 BodyHeight = 60;
  constructor() { }

  ngOnInit() {
    if (this.InputMessageBox.IsMultiLine) {
      this.BodyHeight = 90;
    }
  }

  onClick(ActionType) {
    this.messageBoxResult.emit(ActionType);
    this.close(ActionType);
  }

  onCancelClick() {
    this.messageBoxResult.emit('NO');
    this.close('NO');
  }

  close(QRes) {
    this.messageBoxClosed.emit(QRes);
  }

}
