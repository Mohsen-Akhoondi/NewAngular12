import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractEstimateService {
    constructor(private http: BaseHttpClient) {
    }

    SaveRelatedContractOrderEstimate(ContractOrderEstimate: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/ContractOrderEstimate/SaveRelatedContractOrderEstimate', { ContractOrderEstimate }
        );
    }
    GetAllWithContractOrderItemID(ContractOrderId: number) {
        return this.http.get(window.location.origin + '/ContractOrderEstimate/GetAllWithContractOrderItemID', { ContractOrderId });
    }
    GetContractOrderIDByContractPay(ContractPayDate, ContractPayID) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/ContractOrderEstimate/GetContractOrderIDByContractPay', { ContractPayDate, ContractPayID }, true);
    }
}
