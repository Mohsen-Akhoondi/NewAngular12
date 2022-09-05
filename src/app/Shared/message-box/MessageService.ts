import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {
  @Output() MessageChange: EventEmitter<any> = new EventEmitter<any>();

  Show(Message) {
    this.MessageChange.emit({IsShow: true, Message: Message});
  }
}
