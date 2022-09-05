import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class AnalayzePriceTypeService {
    constructor(private http: BaseHttpClient) {}

    GetAnalayzePricTypeList() {
        return this.http.get(window.location.origin + '/Home/GetAnalayzePricTypeList' , null);
    }
}
