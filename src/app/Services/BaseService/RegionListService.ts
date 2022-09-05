import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class RegionListService {
    constructor(private http: BaseHttpClient) { }

    GetRegionList(ModuleCode, CheckWritable: boolean = false , IsLoading = true) {
        return this.http.get(window.location.origin + '/Home/GetRegionList', { ModuleCode, CheckWritable: CheckWritable }, IsLoading );
    }
    GetSpecialRegionList(ModuleCode, CheckWritable: boolean = false , IsLoading = true) {
        return this.http.get(window.location.origin + '/Home/GetSpecialRegionList', { ModuleCode, CheckWritable: CheckWritable }, IsLoading);
    }
    GetRegionGroupList(IsLoading = true) {
        return this.http.get(window.location.origin + '/Home/GetRegionGroupList', null,IsLoading);
    }
    GetRegionGroupByRegion(ARegionCode) {
        return this.http.get(window.location.origin + '/Home/GetRegionGroupByRegion', { ARegionCode });
    }
    GetRegionListforBusinessPattern() {
        return this.http.get(window.location.origin + '/Common/GetRegionListforBusinessPattern', null);
    }
    GetRegionListforBusinessPatternCorporate() {
        return this.http.get(window.location.origin + '/Common/GetRegionListforBusinessPatternCorporate', null);
    }
    GetRankingRegionList() {
        return this.http.get(window.location.origin + '/Home/GetRankingRegionList', null );
    }

    GetUserRegionList(IsLoading = true) {
        return this.http.get(window.location.origin + '/Home/GetUserRegionList', null , IsLoading );
    }
    GetAllRegion() {
        return this.http.get(window.location.origin + '/Home/GetAllRegion', null );
    }
    GetRegionByRegionGroup(ARegionGroupCode) {
        return this.http.get(window.location.origin + '/Home/GetRegionByRegionGroup', { ARegionGroupCode });
    }
}

