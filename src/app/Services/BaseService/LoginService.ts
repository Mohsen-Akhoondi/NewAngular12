import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: BaseHttpClient) { }
  AdvertisingLogin(model: any, returnUrl: string) {
    return this.http.post(window.location.origin + '/Account/AdvertisingLogin', { model, returnUrl });
  }
  GetCaptchaImage() {
    return this.http.get(window.location.origin + '/Account/AdvertisingCaptchaImage', null);
  }
  GetFinYearList(IsLoading = true) {
    return this.http.get(window.location.origin + '/Home/GetFinYearList', null, IsLoading);
  }
}
