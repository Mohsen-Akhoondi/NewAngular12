import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class INVVoucherGroupService {
    constructor(private http: BaseHttpClient) {
    }

    GetInvVoucherGroup() {
        return this.http.get(window.location.origin + '/ProductRequest/GetInvVoucherGroup' , null);
    }
}
