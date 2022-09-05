import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class ModuleService {
    constructor(private http: BaseHttpClient) {
    }
    GetWebModules() {
        return this.http.get(window.location.origin + '/Common/GetWebModules', false);
    }
    SaveModule(ModuleList: any) {
        return this.http.post(window.location.origin + '/Common/SaveModule', {ModuleList});
    }

    GetAllApplication(){
        return this.http.post(window.location.origin + '/Common/GetAllApplication', null);
    }
}