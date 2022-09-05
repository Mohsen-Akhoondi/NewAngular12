import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class WorkFlowGraphService {
    constructor(private http: BaseHttpClient) {
    }
    GetNodeList(AWorkFlowTypeCode: number) {
        return this.http.get(window.location.origin + '/Workflow/GetNodeList', { AWorkFlowTypeCode });
    }

    GetEdgeWorkFlow(AWorkFlowTypeCode: number) {
        return this.http.get(window.location.origin + '/Workflow/GetEdgeWorkFlow', { AWorkFlowTypeCode });
    }

    GetNoteGraph(AWorkFlowTypeCode: number , ANodeId : number) {
        return this.http.get(window.location.origin + '/Workflow/GetNoteGraph', { AWorkFlowTypeCode , ANodeId });
    }
}
 
