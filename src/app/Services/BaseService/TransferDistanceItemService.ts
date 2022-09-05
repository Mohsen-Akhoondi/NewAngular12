import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class TransferDistanceItemService {
    constructor(private http: BaseHttpClient) {}
    GetTransferDistanceItem(PricelistTopicCode: any,
                            ProductID: any,
                            TopicCode: any ) {
        return this.http.get(window.location.origin + '/ContractPay/GetTransferDistanceItem', {PricelistTopicCode, ProductID , TopicCode} );
    }
    GetProductList(PricelistTopicCode: any) {
        return this.http.get(window.location.origin + '/ContractPay/GetProductList', {PricelistTopicCode} );
    }

    CalculateTransferDistanceItem(PricelistTopicCode: any,
                                  ProductID: any,
                                  TopicCode: any,
                                  Distance: number = null ) {
return this.http.get(window.location.origin + '/ContractPay/CalculateTransferDistanceItem', {PricelistTopicCode,
                                                                                             ProductID,
                                                                                             TopicCode,
                                                                                             Distance} );
}

SaveContractPayTransfer(ContractPayTransferList: any,
                        ContractPayItemID: number,
                        ProductID: number,
                        ContractAgentCode: number) {
    return this.http.post(window.location.origin + '/ContractPay/SaveContractPayTransfer', {
        ContractPayTransferList,
        ContractPayItemID,
        ProductID,
        ContractAgentCode
    });
}

GetContractPayTransfer(ContractPayItemID: number,
                       ProductID: number,
                       ContractAgentCode: number) {
    return this.http.get(window.location.origin + '/ContractPay/GetContractPayTransfer', {ContractPayItemID,
                                                                                           ProductID,
                                                                                           ContractAgentCode} );
}
}
