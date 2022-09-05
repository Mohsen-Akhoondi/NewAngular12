import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: BaseHttpClient) {
  }
  GetOrdersRegionBuyerRequest(ARegionCode) {
    return this.http.get(window.location.origin + '/ProductRequest/GetOrdersRegionBuyerRequest', { ARegionCode });
  }
  GetPersonInOrders(ARegionCode, AOrderDate) {
    return this.http.get(window.location.origin + '/ProductRequest/GetPersonInOrders', { ARegionCode, AOrderDate });
  }
  GetCommitionList() {
    return this.http.get(window.location.origin + '/Commission/GetCommitionList', {});
  }

  GetUnitTopicforCommissionMember() {
    return this.http.get(window.location.origin + '/Commission/GetUnitTopicforCommissionMember', {});
  }

  GetUnitTopicPaging(PageNumber, PageSize, SearchTerm, SearchOption) {
    return this.http.get(window.location.origin + '/Commission/GetUnitTopicPaging', {
      PageNumber,
      PageSize,
      SearchTerm,
      SearchOption
    },
      false);
  }

  SaveCommissionMember(CommissionMemberList: any, ModuleCode: number) {
    return this.http.post(window.location.origin + '/Commission/SaveCommissionMember', { CommissionMemberList, ModuleCode });
  }
  SaveCommission(CommissionList: any, ModuleCode: number) {
    return this.http.post(window.location.origin + '/Commission/SaveCommission', { CommissionList, ModuleCode });
  }
  SaveCommissionMemberFilterd(CommissionMemberList: any, RegionCode: number, CommitionCode: number, ModuleCode: number) {
    return this.http.post(window.location.origin + '/Commission/SaveCommissionMemberFilterd', {
      CommissionMemberList, RegionCode,
      CommitionCode, ModuleCode
    });
  }
}
