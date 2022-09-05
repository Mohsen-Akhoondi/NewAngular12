import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class WorkflowService {
    constructor(private http: BaseHttpClient) {
    }
    GetWorkflowType4WorkflowTypeModule(RegionCode: number, ModuleViewTypeID: number, IsLoading: boolean) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowType4WorkflowTypeModule',
            { RegionCode: RegionCode, ModuleViewTypeID: ModuleViewTypeID }, IsLoading);
    }
    GetWorkflowType() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowType', null, false);
    }
    GetWorkflowActionType() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowActionType', null, false);
    }
    GetToWorkflowType() {
        return this.http.get(window.location.origin + '/Workflow/GetToWorkflowType', null, false);
    }
    SaveWorkflowType(AWorkflowTypeList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowType', { AWorkflowTypeList });
    }
    GetWorkflowStatus() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowStatus', null);
    }

    GetWorkflowObject() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowObject', null);
    }

    SaveWorkflowObject(AWorkflowObjectServiceList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowObject', { AWorkflowObjectServiceList });
    }
    SaveWorkflowStatus(AWorkflowStatusList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowStatus', { AWorkflowStatusList });
    }
    GetWorkflowOperation() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowOperation', null, false);
    }
    SaveWorkflowOperation(AWorkflowOperationList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowOperation', { AWorkflowOperationList });
    }
    GetWorkflowNode() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowNode', null);
    }
    SaveWorkflowNode(AWorkflowNodeList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowNode', { AWorkflowNodeList });
    }
    GetWorkflowList(RegionGroupCode: any) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowList', { RegionGroupCode });
    }
    GetWorkflowListByRegionCode(RegionCode: any) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowListByRegionCode', { RegionCode });
    }
    GetWorkflowListData(AWorkflowTypeCode: number) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowListData', { AWorkflowTypeCode });
    }
    GetFromWorkflowNodeList() {
        return this.http.get(window.location.origin + '/Workflow/GetFromWorkflowNodeList', null, false);
    }
    GetToWorkflowNodeList() {
        return this.http.get(window.location.origin + '/Workflow/GetToWorkflowNodeList', null);
    }
    GetWorkflowOperationList() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowOperationList', null, false);
    }
    GetWorkflowUserList(RoleID: number, HaveLoading: boolean) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowUserList', { RoleID }, HaveLoading);
    }
    SaveWorkflowTransition(WorkflowTypeCode, AWorkflowTransitionList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowTransition', { WorkflowTypeCode, AWorkflowTransitionList });
    }
    GetWorkflowLogListData(ReigonGroupCode: number, ModuleCode: number, WorkflowTypeCode: number) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowLogListData',
            { ReigonGroupCode, ModuleCode, WorkflowTypeCode });
    }
    GetWorkflowTypeModuleCode(RegionGroupCode: number, ModuleCode: number, IsLoading: boolean) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowTypeModuleCode',
            { RegionGroupCode: RegionGroupCode, ModuleCode: ModuleCode }, IsLoading);
    }
    GetContractByVWWorkLog(RegionCode: number,
        WorkflowTypeCode: number,
        FromContract: number,
        ToContract: number,
        LetterParameter: string,
        SubjectParameter: string,
        FromFinYear: number,
        ToFinYear: number) {
        return this.http.get(window.location.origin + '/Workflow/GetContractByVWWorkLog',
            { RegionCode, WorkflowTypeCode, FromContract, ToContract, LetterParameter, SubjectParameter, FromFinYear, ToFinYear });
    }
    GetWorkLogByInstance(WorkFlowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkLogByInstance', { WorkFlowInstanceID });
    }
    SaveWorkLogHistory(WorkFlowHistoryList: any, WorkFlowInstanceId: any, ParentModuleCode: number) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkLogHistory', {
            WorkflowLogList: WorkFlowHistoryList,
            WorkFlowInstanceId: WorkFlowInstanceId,
            ModuleToLog: ParentModuleCode
        });
    }

    GetModuleList() {
        return this.http.get(window.location.origin + '/Workflow/GetModuleList4Transition', null, false);
    }

    GetModuleViewTypeList4Transition(ModuleCode: number, HaveLoading: boolean) {
        return this.http.get(window.location.origin + '/Workflow/GetModuleViewTypeList4Transition', { ModuleCode: ModuleCode }, false);
    }
    GetFinYearList(IsLoading = true) {
        return this.http.get(window.location.origin + '/Home/GetFinYearList', null, IsLoading);
    }

    GetWorkflowObjectByWorkflowTypeCode(WorkFlowTypeCode: number) {
        return this.http.post(window.location.origin + '/Workflow/GetWorkflowObjectByWorkflowTypeCode',
            { WorkFlowTypeCode: WorkFlowTypeCode });
    }
    GetStartModuleViewTypeCode(RegionCode, ModuleCode, WorkflowTypeCode, ObjectID) {
        return this.http.post(window.location.origin + '/Workflow/GetStartModuleViewTypeCode',
            { RegionCode, ModuleCode, WorkflowTypeCode, ObjectID });
    }
    // GetWorkFlowType(RegionCode, ModuleCode) {
    //     return this.http.post(window.location.origin + '/Workflow/GetWorkFlowType', { RegionCode, ModuleCode });
    // }
    GetWorkflowObjectList(CartableType, IsLoading = true) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowObjectList', { CartableType }, IsLoading);
    }
    GetWorkflowObjectListByRegionCode(IsLoading = true, RegionCode: number = null) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowObjectListByRegionCode',
            {
                RegionCode
            }, IsLoading);
    }
    GetToWorkflowNodeByToWorkFlowType(ToWorkflowTypeCode: number) {
        return this.http.post(window.location.origin + '/Workflow/GetToWorkflowNodeByToWorkFlowType',
            { ToWorkflowTypeCode }, false);
    }

    ListAllTransition(WorkflowTypeCode: number = null) {
        return this.http.get(window.location.origin + '/Workflow/ListAllTransition', { WorkflowTypeCode });
    }

    ListAllWorkLog(WorkFlowInstanceId: number = null, WorkflowLogList: any = []) {
        return this.http.get(window.location.origin + '/Workflow/ListAllWorkLog', {
            WorkFlowInstanceId,
            WorkflowLogList
        });
    }

    GetWorkflowStatusListForNg() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowStatusListForNg', null, false);
    }

    GetWorkLogByInstance2(WorkFlowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkLogByInstance2', { WorkFlowInstanceID });
    }
    GetRolesWithworkFlowCode(workFlowCode: number, RegionCode: number) {
        return this.http.get(window.location.origin + '/Workflow/GetRolesWithworkFlowCode', { workFlowCode, RegionCode });
    }
    GetVWWorkListByInstanceID(WorkflowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetVWWorkListByInstanceID', { WorkflowInstanceID });
    }
    GetVWWorkCompletedByInstanceID(WorkflowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetVWWorkCompletedByInstanceID', { WorkflowInstanceID });
    }
    GetWorkflowNodeByRegionCode(RegionCode: number) {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowNodeByRegionCode', { RegionCode });
    }
    RunAfterActionMethod(WorkListDetailList: any) {
        return this.http.post(window.location.origin + '/Workflow/RunAfterActionMethod', { WorkListDetailList });
    }
    GetWfInstanceIDByObjIDAndRegionCode(ObjectID: number, RegionCode: number, CheckIsNotCancel = false) {
        return this.http.get(window.location.origin + '/Workflow/GetWfInstanceIDByObjIDAndRegionCode', { ObjectID, RegionCode, CheckIsNotCancel });
    }
    GetWfActionTypeList() {
        return this.http.get(window.location.origin + '/Workflow/GetWfActionTypeList', null, false);
    }
    ReportAverageWorkflowObjects(
        IsPerson: boolean,
        RegionCode: number = null,
        WorkflowObjectCode: number = null,
        FromDate: string = null,
        ToDate: string = null,
        WorkflowNodeID: number = null) {
        return this.http.get(window.location.origin + '/Workflow/ReportAverageWorkflowObjects',
            {
                IsPerson, RegionCode, WorkflowObjectCode, FromDate, ToDate, WorkflowNodeID
            }, true);
    }
    SaveWorkflowActionType(AWorkflowActionTypeList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowActionType', { AWorkflowActionTypeList });
    }

    SaveNewWorkflowStatus(AWorkflowStatusList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveNewWorkflowStatus', { AWorkflowStatusList });
    }
    GetNodesByInstance(WorkFlowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetNodesByInstance', { WorkFlowInstanceID });
    }
    GetNodesLineByInstance(WorkFlowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetNodesLineByInstance', { WorkFlowInstanceID });
    }
    GetEdgesByInstance(WorkFlowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetEdgesByInstance', { WorkFlowInstanceID });
    }
    GetEdgesLineByInstance(WorkFlowInstanceID: number) {
        return this.http.get(window.location.origin + '/Workflow/GetEdgesLineByInstance', { WorkFlowInstanceID });
    }
    GetFindWorkFlowUser(WorkflowTransitionID,WorkflowLogID){
        return this.http.get(window.location.origin + '/Workflow/FindWorkFlowUser' , {WorkflowTransitionID , WorkflowLogID});
    }
}
