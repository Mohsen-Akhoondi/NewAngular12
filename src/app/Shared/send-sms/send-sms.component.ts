

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {
  @Input() InputParam;
  @Output() Corporate2Closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  Note;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  type;
  HaveHeader: boolean;
  btnclicked;
  startLeftPosition;
  startTopPosition;
  MinHeightPixel;
  PixelHeight;
  MainMaxwidthPixel;
  minWidthPixel;
  PixelWidth;
  HaveMaxBtn;
  constructor(private ActorService: ActorService) { }

  ngOnInit() {
  }
  onSend() {
    let Cell;
    if (this.InputParam) {
      Cell = this.InputParam.Cell;
      if (Cell) {
        if (!this.Note)
          this.Note = '';
        this.ActorService.SendSms(this.Note, Cell).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('ارسال با موفقیت انجام شد');
            this.MinHeightPixel = 150;
            this.PixelHeight = 150;
            this.MainMaxwidthPixel = 360;
            this.minWidthPixel = 360;
            this.PixelWidth = 360;
            this.btnclicked = true;
            return;
          } else {
            this.ShowMessageBoxWithOkBtn('ارسال با شکست مواجه شد');
            this.MinHeightPixel = 150;
            this.PixelHeight = 150;
            this.MainMaxwidthPixel = 360;
            this.minWidthPixel = 360;
            this.PixelWidth = 360;
            this.btnclicked = true;
            return;
          }
        });
      } else {
        this.ShowMessageBoxWithOkBtn('شماره تلفن شخص خالی می باشد');
        this.MinHeightPixel = 150;
        this.PixelHeight = 150;
        this.MainMaxwidthPixel = 360;
        this.minWidthPixel = 360;
        this.PixelWidth = 360;
        this.btnclicked = true;
        return;
      }
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 500;
    this.startTopPosition = 180;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed() {
    this.Corporate2Closed.emit(true);
  }
  messageclosed() {
    this.btnclicked = false;
  }
  closeModal() {
    this.Corporate2Closed.emit(true);
  }
}
