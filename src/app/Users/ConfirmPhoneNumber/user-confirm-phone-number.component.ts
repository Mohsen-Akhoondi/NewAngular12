import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-user-confirm-phone-number',
  templateUrl: './user-confirm-phone-number.component.html',
  styleUrls: ['./user-confirm-phone-number.component.css']
})
export class UserConfirmPhoneNumberComponent implements OnInit {
  isClicked;
  PhoneNumber;
  VerifyCode;
  alertMessageParams = {HaveOkBtn: true , message: ''};
  IsSendSMS = false;
  SuccessSaved;
  constructor(private Service: ActorService) { }

  ngOnInit() {
    $(document).ready(function ()  {
        $('.modal-user-confirm-phone').draggable({
          handle: '#header-user-confirm-phone'
        });
      }
      );
  }
  DisposableBtnSMSClicked() {
    if (!this.PhoneNumber || isNaN(Number(this.PhoneNumber)) || this.PhoneNumber.length !== 11) {
      this.alertMessageParams.message = 'لطفا شماره تلفن همراه را به صورت صحیح وارد نمایید';
    this.isClicked = true;
    } else {
      this.Service.GetPhoneNumberVerifyCode(this.PhoneNumber).subscribe(res => this.IsSendSMS = res);
    }
  }
  popupclosed(event) {
    if (this.SuccessSaved) {
         window.location.reload();
    }
    this.isClicked = false;
  }
  DoSave() {
    if (!this.VerifyCode) {
      this.alertMessageParams.message = 'لطفا رمز یکبارمصرف را به صورت صحیح وارد نمایید';
      this.isClicked = true;
      } else {
        this.Service.CheckValidatePhoneNumberVerifyCode(this.VerifyCode).subscribe(res => {
          if (res) {
            this.alertMessageParams.message = 'ثبت شماره تلفن همراه با موفقیت انجام شد';
            this.isClicked = true;
            this.SuccessSaved = true;
          } else {
            this.alertMessageParams.message = 'رمز یکبارمصرف وارد شده صحیح نمی باشد';
            this.isClicked = true;
          }
        },
        err => {
          this.alertMessageParams.message = 'ثبت شماره تلفن همراه با خطا مواجه شد لطفا مجددا اقدام به ثبت نمایید';
            this.isClicked = true;
        });
      }
  }
}
