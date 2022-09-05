import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractMinutesService {
    constructor(private http: BaseHttpClient) {
    }

    GetContractMinutesList(ContractID: number,
        ContractMinutesCode: number = null,
        IsLoad: boolean = true) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetContractMinutesList', {
            ContractID,
            ContractMinutesCode
        }, IsLoad);
    }
    GetMaxContractMinutesCode(ContractID: any) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetMaxContractMinutesCode', { ContractID });
    }

    GetMinutesContractOrder(ContractID: number,
        ContractMinutesCode: number,
        Date: any,
        ProductIDs: any,
        IsLoad: boolean) {

        return this.http.get(window.location.origin + '/ContractMinutes/GetMinutesContractOrder', {
            ContractID,
            ContractMinutesCode,
            Date,
            ProductIDs
        },
            IsLoad);
    }

    SaveContractMinutes(ContractMinutes: any,
        ContractMinutesItemList: any) {

        return this.http.post(window.location.origin + '/ContractMinutes/SaveContractMinutes', {
            ContractMinutes,
            ContractMinutesItemList
        }
        );
    }

    DeleteContractMinutes(ContractMinutesID: any) {
        return this.http.post(window.location.origin + '/ContractMinutes/DeleteContractMinutes', { ContractMinutesID });
    }

    GetContractMinutes(ContractMinutesID: any) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetContractMinutes', { ContractMinutesID });
    }

    UpdateContractMinutes(ContractMinutes: any,
        ContractMinutesItemList: any) {

        return this.http.post(window.location.origin + '/ContractMinutes/UpdateContractMinutes', {
            ContractMinutes,
            ContractMinutesItemList
        }
        );
    }
    GetAutoEntityTypeList(AutoEntityGroupCode: number, RegionCode: number) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetAutoEntityTypeList', { AutoEntityGroupCode, RegionCode });
    }
    GetTextTemplate(RegionCode: number, AutoEntityTypeCode: number) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetTextTemplate', { RegionCode, AutoEntityTypeCode });
    }
    GetRegionCode(AutoEntityTypeCode: number, RegionCode: number) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetRegionCode', { AutoEntityTypeCode, RegionCode });
    }
    GetOtherContractDoctsList(ContractID: number,
        ContractMinutesCode: number = null,
        IsLoad: boolean = true) {
        return this.http.get(window.location.origin + '/ContractMinutes/GetOtherContractDoctsList', {
            ContractID,
            ContractMinutesCode
        }, IsLoad);
    }
}
