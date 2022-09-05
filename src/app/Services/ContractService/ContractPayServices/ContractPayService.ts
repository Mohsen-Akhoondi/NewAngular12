import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractPayService {
    constructor(private http: BaseHttpClient) {
    }

    GetContractPayList(ACostFactorID: number, ContractPayNo: number = null, IsConfirm: number) {
        return this.http.get(window.location.origin + '/Home/GetContractPayList', {
            ACostFactorID,
            ContractPayNo,
            IsConfirm
        });
    }

    GetContractEstimateListWithProduct(ContractID: number,
        ProductID: number,
        PriceListPatternIDs: any,
        ContractPayNo: string,
        IsLeft: number) {

        return this.http.get(window.location.origin +
            '/Contract/GetContractEstimateListWithProduct', {
            ContractID,
            ProductID,
            PriceListPatternIDs,
            ContractPayNo,
            IsLeft
        });
    }

    GetSummaryQuantitySurveying(ContractPayCostFactorID: number, ContractAgentCode: any) {
        return this.http.get(window.location.origin + '/ContractPay/GetSummaryQuantitySurveying',
            { ContractPayCostFactorID, ContractAgentCode });
    }

    GetFinancialSheet(ContractPayCostFactorID: number, ContractAgentCode: any) {
        return this.http.get(window.location.origin + '/ContractPay/GetFinancialSheet',
            { ContractPayCostFactorID, ContractAgentCode });
    }
    
    HaveWorkFlowInstance(ObjectID: number,
        WorkFlowObjectCode: number) {
        return this.http.get(window.location.origin + '/ContractPay/HaveWorkFlowInstance', { ObjectID, WorkFlowObjectCode });
    }

    GetContractFeeList(ContractID: number) {
        return this.http.get(window.location.origin + '/ContractPay/GetContractFeeList', { ContractID });
    }

    GetContractPayTransportList(ContractPayItemID: number) {
        return this.http.get(window.location.origin + '/ContractPay/GetContractPayTransportList', { ContractPayItemID });
    }

    SaveContractPayTransport(ContractPayTransportList: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/ContractPay/SaveContractPayTransport', {
            ContractPayTransportList
        });
    }

    SaveRelatedContractPayEstimate(ContractPayItemList: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/ContractPay/SaveRelatedContractPayEstimate', { ContractPayItemList }
        );
    }
    HaveWorkFlowInstanceForProductRequest(ObjectID: number,
        WorkFlowObjectCode: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/ContractPay/HaveWorkFlowInstanceForProductRequest', { ObjectID, WorkFlowObjectCode });
    }

    HasPermissionToDeleteContract(ObjectID: number, WorkFlowObjectCode: number, ReadOnlyRegion: boolean, ModuleCode: number, ContractID?: number) {
        return this.http.get(window.location.origin + '/ContractPay/HasPermissionToDeleteContract'
            , { ObjectID, WorkFlowObjectCode, ReadOnlyRegion, ModuleCode, ContractID });
    }
    ComprehensiveStatusReport(
        RegionCode: number,
        ContractCode: number,
        CostCenterCode: number,
        SubCostCenterCode: number,
        TypeContractor: boolean,
        PersonReqCode: number,
        FromDate: any,
        ToDate: any
    ) {
        return this.http.get(window.location.origin + '/ContractPay/ComprehensiveStatusReport'
            , {
                RegionCode, ContractCode, CostCenterCode, SubCostCenterCode, TypeContractor, PersonReqCode, FromDate, ToDate
            });
    }
    GetSpecificContractOperation() {
        return this.http.get(window.location.origin + '/ContractPay/GetSpecificContractOperation', null);
    }

    HaveOneWorkFlowInstanceRow(ObjectID: number,
        WorkFlowObjectCode: number) {
        return this.http.get(window.location.origin + '/ContractPay/HaveOneWorkFlowInstanceRow', { ObjectID, WorkFlowObjectCode });
    }

    GetIsOnContract(ContractOperationID: number) {
        return this.http.get(window.location.origin + '/ContractPay/GetIsOnContract', { ContractOperationID });
    }
}
