import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class BudgetService {
    constructor(private http: BaseHttpClient) {
    }

    GetCivilProjectTotalList(RegionCode, UnitTopicID, CostCenterID, BgtTopicCode, BgtTopicName, ProjectStatus, DisplayStatus) {
        return this.http.get(window.location.origin + '/Budget/GetCivilProjectTotalList',
            {
                RegionCode,
                UnitTopicID,
                CostCenterID,
                BgtTopicCode,
                BgtTopicName,
                ProjectStatus,
                DisplayStatus
            });
    }

}