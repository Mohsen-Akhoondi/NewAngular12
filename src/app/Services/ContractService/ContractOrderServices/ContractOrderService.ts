import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractOrderService {
    constructor(private http: BaseHttpClient) {
    }

    SaveContractPersonEstimate(ContractOrderItemIDList: any, ContractPersonEstimateList: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/Contract/SaveContractPersonEstimate', {
            ContractOrderItemIDList,
            ContractPersonEstimateList
        });
    }

    GetContractVehicleEstimateList(ContractOrderItemID: number) {
        return this.http.get(window.location.origin + '/Contract/GetContractVehicleEstimateList', { ContractOrderItemID });
    }

    SaveContractVehicleEstimate(ContractVehicleEstimateList: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/Contract/SaveContractVehicleEstimate', {
            ContractVehicleEstimateList
        });
    }
}
