import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class RoadTypeService {
    constructor(private http: BaseHttpClient) {
    }
        GetRoadType() {
            return this.http.get(window.location.origin + '/ContractPay/GetRoadType', null);
        }
        SaveRoadType(ARoadTypeList: any) {
            return this.http.post(window.location.origin + '/ContractPay/SaveRoadType', {ARoadTypeList});
        }
    }

