import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize, timeoutWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/Load/loading/LoadingService';
import { MessageService } from 'src/app/Shared/message-box/MessageService';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseHttpClient {
  count = 0;
  constructor(private http: HttpClient,
    private router: Router,
    private Loading: LoadingService,
    private Message: MessageService) { }
  ErrorHandelling(err) {
    console.log(err);
    this.count = 0;
    this.Loading.Hide();
    if (!environment.IsExternalForSSO && err.status === 500 && err.error.Message.includes('unAuthorize')) {// SSO1234
       window.location.href = window.location.origin;
    } else if (err.status === 401) {
      const IndexOfOutlets = this.router.url.indexOf('(');
      let returnUrl = '';
      if (IndexOfOutlets > 0) {
        returnUrl = this.router.url.substring(0, IndexOfOutlets - 1).replace('/', '%2F');
      } else {
        returnUrl = this.router.url.replace('/', '%2F');
      }
      window.location.href = window.location.origin
        + '/Account/login?returnUrl=%2FFinance%2F'
        + returnUrl;
    } else if (err.error && err.error.Message && err.error.Message.includes('|')) {
      const str = err.error.Message.split('|');
      if (str[1]) {
        this.Message.Show(str[1]);
      }
    } else {
      this.Message.Show('خطای پیش بینی نشده');
     //this.Message.Show(err.error.Message);
    }

    console.log(err.error.Message.split('|'));
    return throwError(err);
  }
  get(url, params, IsLoading = true): Observable<any> {
    const options = new HttpHeaders({
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'withCredentials': 'true',
      'Access-Control-Allow-Origin': '*'
    });

    if (IsLoading === true) {
      this.count++;
      // console.log('get + ' + this.count +' url = ' + url);
      this.Loading.Show();
    }
    return this.http.get(url, { headers: options, withCredentials: true, params: params }).pipe(

      timeoutWith(6000000, throwError(new Error('Http Timeout exceeds'))),
      catchError((err) => {
        return this.ErrorHandelling(err);
      }),
      finalize(() => {
        this.count--;
        // console.log('get - ' + this.count +' url = ' + url);
        if (this.count <= 0) {
          this.Loading.Hide();
          this.count = 0;
        }
      }),
    );
  }

  post(url, body, IsLoading = true) {
    if (IsLoading === true) {
      this.count++;
      // console.log('post + ' + this.count +' url = ' + url);
      this.Loading.Show();
    }
    const options = new HttpHeaders({
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'withCredentials': 'true',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(url, body, { headers: options }).pipe(
      timeoutWith(6000000, throwError(new Error('Http Timeout exceeds'))),
      catchError((err) => {
        return this.ErrorHandelling(err);
      }),
      finalize(() => {
        this.count--;
        // console.log('post - ' + this.count +' url = ' + url);
        if (this.count <= 0) {
          this.Loading.Hide();
          this.count = 0;
        }
      })
    );
  }
}
