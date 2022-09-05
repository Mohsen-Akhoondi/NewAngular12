import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-send-letter-page',
  templateUrl: './send-letter-page.component.html',
  styleUrls: ['./send-letter-page.component.css']
})
export class SendLetterPageComponent implements OnInit {
  @Output() SendLetterClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  SendTo;
  Signer;
  Seconder;
  Transcript;
  Subject;
  Text;
  constructor() { }

  ngOnInit() {
  }
  onFileChanged(event) {}
  onSend() {}
  onClose() {
    this.SendLetterClosed.emit(true);
  }

}
