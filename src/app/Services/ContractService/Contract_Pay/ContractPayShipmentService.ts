import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractPayShipmentService {
    constructor(private http: BaseHttpClient) {
    }
    GetContractPayShipmentGoods(CostFactorID: any ,
                                ContractAgentCode: number,
                                ContractPayItemID: number) {
        return this.http.get(window.location.origin + '/ContractPay/GetContractPayShipmentGoods', {CostFactorID,
                                                                                                   ContractAgentCode,
                                                                                                    ContractPayItemID});
    }
    GetContractPayShipmentDetails(CostFactorID: any ,
                                  ContractAgentCode: number,
                                  ProductID: number,
                                  ContractPayItemID: number) {
       return this.http.get(window.location.origin + '/ContractPay/GetContractPayShipmentDetails', {CostFactorID,
                                                                                                    ContractAgentCode,
                                                                                                    ProductID,
                                                                                                    ContractPayItemID});
}
}
