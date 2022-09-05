import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class ServicePatternService {
  constructor(private http: BaseHttpClient) { }

  GetServicePatternRoots(RegionGroupCode) {
    return this.http.get(window.location.origin + '/Home/GetServicePatternRoots', { RegionGroupCode });
  }

  GetServicePatternChildren(ServicePatternID) {
    return this.http.get(window.location.origin + '/Home/GetServicePatternChildren', { ServicePatternID });
  }

  GetServicePatternItemList(ServicePatternID, PricelistTopicSearch = null) {
    return this.http.get(window.location.origin + '/Home/GetServicePatternItemList', {
      ServicePatternID: ServicePatternID,
      PricelistTopicSearch
    });
  }

  GetListByServicePatternItemID(ServicePatternItemID) {
    return this.http.get(window.location.origin + '/Home/GetListByServicePatternItemID', {
      ServicePatternItemID: ServicePatternItemID
    });
  }

  SaveServicePatterItems(
    ServicePatternID: number,
    AServicePatterItems: any,
    ProductRequestEntityList: any) {
    return this.http.post(window.location.origin + '/Home/SaveServicePatterItems', {
      ServicePatternID,
      AServicePatterItems,
      ProductRequestEntityList
    });
  }
}