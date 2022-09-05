import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractPersonRepService {
  constructor(private http: BaseHttpClient) {
  }

  SearchContracPerson(RegionCode: number, FromContractCode: number, ToContractCode: number,
    FromRoleID: number, ToRoleID: number,
    LetterNo: any) {
    return this.http.get(window.location.origin + '/Contract/SearchContracPerson', {
      RegionCode,
      FromContractCode,
      ToContractCode,
      FromRoleID,
      ToRoleID,
      LetterNo
    });
  }
}
