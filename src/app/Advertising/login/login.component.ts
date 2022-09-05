import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from 'src/app/Services/BaseService/LoginService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() LoginClosed: EventEmitter<any> = new EventEmitter<any>();
  // @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @Input() InputParams;
  CaptchaImage;
  UserName;
  Password;
  RememberMe = false;
  Captcha;
  ShowMessage = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  constructor(private LoginServices: LoginService,
    private CommonService: CommonServices,
    private RefreshService: RefreshServices) { }

  ngOnInit() {
    this.ReloadCaptcha();
  }
  OnLogin() {
    const LoginModleObject = {
      UserName: this.UserName,
      Password: this.Password,
      RememberMe: this.RememberMe,
      Captcha: this.Captcha
    };
    this.LoginServices.AdvertisingLogin(LoginModleObject, '').subscribe(res => {
      if (res) {
        this.RefreshService.RefreshLoginDetails(true);
        this.LoginClosed.emit('IsLogin');
      } else {
        this.ShowMessage = true;
        this.alertMessageParams.message = 'ورود کاربر با مشکل مواجه شد';
      }
    });
  }
  ReloadCaptcha() {
    this.LoginServices.GetCaptchaImage().subscribe(res => {
      this.CaptchaImage = this.CommonService._arrayBufferToBase64(res);
    });
  }
  popupclosed(event) {
    this.ShowMessage = false;
  }
}
