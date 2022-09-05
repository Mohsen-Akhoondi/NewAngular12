import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class CustomerOrderService {
    IsValid: Object;
    constructor(private http: BaseHttpClient) { }

    DeleteCustomerOrder(CustomerOrderID, ModuleCode) {
        return this.http.get(window.location.origin + '/CustomerOrder/DeleteCustomerOrder', { CustomerOrderID, ModuleCode });
    }

    GetOrderTypeList() {
        return this.http.get(window.location.origin + '/CustomerOrder/GetOrderTypeList', false);
    }

    GetCustomerOrder(CustomerOrderID) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetCustomerOrder', { CustomerOrderID });
    }
    GetCustomerOrderList(RegionCode) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetCustomerOrderList', { RegionCode });
    }

    SaveCustomerOrder(CustomerOrder, CustomerOrderItemList, ModuleCode) {
        return this.http.post(window.location.origin + '/CustomerOrder/SaveCustomerOrder',
            {
                CustomerOrder,
                CustomerOrderItemList,
                ModuleCode
            });
    }

    GetCustomerOrders(
        FromOrderRequestCode = null,
        ToOrderRequestCode = null,
        FromOrderRequestDate = null,
        ToOrderRequestDate = null,
        CustomerID = null) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetCustomerOrders',
            {
                FromOrderRequestCode,
                ToOrderRequestCode,
                FromOrderRequestDate,
                ToOrderRequestDate,
                CustomerID
            });
    }

    RequestRevocation(VWWorkList: any, WorkFlowID: any, CustomerOrderID: any, WorkflowTypeCode: any, ModuleCode: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/CustomerOrder/RequestRevocation', {
            VWWorkList,
            WorkFlowID,
            CustomerOrderID,
            WorkflowTypeCode,
            ModuleCode,
            OrginalModuleCode
        });
    }
    GetOrderType() {
        return this.http.get(window.location.origin + '/CustomerOrder/GetOrderType', false);
    }

    GetProductRequestByCustomer(CustomerOrderID) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetProductRequestByCustomer', { CustomerOrderID });
    }

    GetAllCustomerOrderReason() {
        return this.http.get(window.location.origin + '/CustomerOrder/GetAllCustomerOrderReason', null);
    }

    GetPartialCustomerOrders(
        FromOrderRequestCode = null,
        ToOrderRequestCode = null,
        FromOrderRequestDate = null,
        ToOrderRequestDate = null,
        FromProductRequestCode = null,
        ToProductRequestCode = null,
        CustomerID = null) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetPartialCustomerOrders',
            {
                FromOrderRequestCode,
                ToOrderRequestCode,
                FromOrderRequestDate,
                ToOrderRequestDate,
                FromProductRequestCode,
                ToProductRequestCode,
                CustomerID
            });
    }

    GetCustomerDept(ActorID,LedgerAccCode, FromSubLedgerAccCode,ToSubLedgerAccCode) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetCustomerDept',
            {
                ActorID,
                LedgerAccCode,
                FromSubLedgerAccCode,
                ToSubLedgerAccCode
            });
    }

    RevokeCustomerOrder(CustomerOrderID,
        ModuleCode,
        ContractID: number = null,
        ContractSatusCode: number = null,
        WorkFlowInstanceId: number = null) {
        return this.http.get(window.location.origin + '/CustomerOrder/RevokeCustomerOrder', {
            CustomerOrderID,
            ModuleCode,
            ContractID,
            ContractSatusCode,
            WorkFlowInstanceId
        });
    }

    SaveCustomerExperts(ActorID,CustomerExpertsList, ModuleCode) {
        return this.http.post(window.location.origin + '/CustomerOrder/SaveCustomerExperts',
            {
                ActorID,
                CustomerExpertsList,
                ModuleCode
            });
    }

    GetExpertsList(ActorID) {
        return this.http.get(window.location.origin + '/CustomerOrder/GetExpertsList', {
            ActorID
        });
    }
}