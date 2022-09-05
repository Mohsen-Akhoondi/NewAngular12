import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractAgentService {
    constructor(private http: BaseHttpClient) {
    }
    GetContractAgents(ContractAgentCode: number = null) {
        return this.http.get(window.location.origin + '/Contract/GetContractAgents', {ContractAgentCode});
    }
    SaveContractAgent(AContractAgentList: any) {
        return this.http.post(window.location.origin + '/Contract/SaveContractAgent', {AContractAgentList});
    }
    GetContractAgentRoles() {
        return this.http.get(window.location.origin + '/Contract/GetContractAgentRoles', null);
      }
      SaveContractAgentRole(AContractAgentRoleList: any) {
        return this.http.post(window.location.origin + '/Contract/SaveContractAgentRole', {AContractAgentRoleList});
      }
}
