import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractWorkOrderService {
    constructor(private http: BaseHttpClient) {
    }

    GetContractWorkOrderList(ContractID: number,
                             ContractWorkOrderCode: number = null,
                             IsLoad: boolean = true) {
        return this.http.get(window.location.origin + '/ContractWorkOrder/GetContractWorkOrderList', { ContractID,
                                                                                                       ContractWorkOrderCode
                                                                                                     }, IsLoad);
    }
    GetMaxContractWorkOrderCode(ContractID: any) {
        return this.http.get(window.location.origin + '/ContractWorkOrder/GetMaxContractWorkOrderCode', {ContractID});
    }

    GetContractWorkContractOrder(ContractID: number,
                                 ContractWorkOrderCode: number,
                                 Date: any,
                                 ProductIDs: any,
                                 IsLoad: boolean ) {

    return this.http.get(window.location.origin + '/ContractWorkOrder/GetContractWorkContractOrder', {ContractID,
                                                                                                      ContractWorkOrderCode,
                                                                                                      Date,
                                                                                                      ProductIDs
                                                                                                      },
                                                                                                       IsLoad);
   }

   SaveContractWorkOrder(ContractWorkOrder: any ,
                         ContractWorkOrderItemList: any) {

return this.http.post(window.location.origin + '/ContractWorkOrder/SaveContractWorkOrder', {ContractWorkOrder,
                                                                                          ContractWorkOrderItemList}
             );
   }

 DeleteContractWorkOrder(ContractWorkOrderID: any) {
    return this.http.post(window.location.origin + '/ContractWorkOrder/DeleteContractWorkOrder', {ContractWorkOrderID});
}

GetContractWorkOrder(ContractWorkOrderID: any) {
    return this.http.get(window.location.origin + '/ContractWorkOrder/GetContractWorkOrder', {ContractWorkOrderID});
}

UpdateContractWorkOrder(ContractWorkOrder: any ,
                      ContractWorkOrderItemList: any ) {

return this.http.post(window.location.origin + '/ContractWorkOrder/UpdateContractWorkOrder', {ContractWorkOrder,
                                                                                              ContractWorkOrderItemList}
                     );
}

}
