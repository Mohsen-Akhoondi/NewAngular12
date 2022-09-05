import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractCoefTypeServices {
    constructor(private http: BaseHttpClient) {
    }
    GetContractCoefType() {
        return this.http.get(window.location.origin + '/Home/GetContractCoefType', null);
    }
    SaveContractCoefType(AContractCoefTypeList: any) {
        return this.http.post(window.location.origin + '/Home/SaveContractCoefType', {AContractCoefTypeList});
    }
}
