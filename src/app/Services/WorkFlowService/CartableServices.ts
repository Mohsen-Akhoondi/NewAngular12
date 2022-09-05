import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class CartableServices {
    constructor(private http: BaseHttpClient) {
    }

    GetUserWorkFlow(WorkFlowID: number,
        OperationCode: number) {

        return this.http.get(window.location.origin + '/Home/FindUserWorkFlow', {
            WorkFlowID,
            OperationCode
        });
    }
    GetWorkFlowID(ObjectID, RegionCode, ModuleCode) {
        return this.http.get(window.location.origin + '/Home/GetWorkFlowID', {
            ObjectID,
            RegionCode,
            ModuleCode
        });
    }
    UserConfirmWorkFlow(
        VWWorkList: any,
        WorkFlowID: number,
        WorkFlowTransitonID: number,
        DesUserID: number,
        Note: string,
        ObjectNo: string,
        WorkflowTypeCode: number,
        WorkflowTypeName: string,
        ObjectID,
        CartableUserID) {

        return this.http.post(window.location.origin + '/Home/UserConfirmWorkFlow', {
            VWWorkList,
            WorkFlowID,
            WorkFlowTransitonID,
            DesUserID,
            Note,
            ObjectNo,
            WorkflowTypeCode,
            WorkflowTypeName,
            ObjectID,
            CartableUserID
        });
    }
    UserConfirmBatchWorkFlow(
        VWWorkList: any,
        WorkFlowID: number,
        ObjectNo: string,
        WorkflowTypeName: string,
        WorkflowTypeCode: number,
        ObjectID,
        DestUserList: any[],
        WorkflowObjectCode,
        OrginalModuleCode?: any,
        ModuleViewTypeCode?,
        CartableUserID?: number
    ) {

        return this.http.post(window.location.origin + '/Home/UserConfirmBatchWorkFlow', {
            VWWorkList,
            WorkFlowID,
            ObjectNo,
            WorkflowTypeName,
            WorkflowTypeCode,
            ObjectID,
            DestUserList,
            OrginalModuleCode,
            WorkflowObjectCode,
            ModuleViewTypeCode,
            CartableUserID
        });
    }
    UserReturnWorkFlow(
        VWWorkList: any,
        WorkFlowID: number,
        WorkFlowTransitonID: number,
        DesUserID: number,
        Note: string,
        ObjectNo: string,
        WorkflowTypeName: string,
        ObjectID: number,
        WorkflowTypeCode: number,
        CartableUserID: number) {

        return this.http.post(window.location.origin + '/Home/UserReturnWorkFlow', {
            VWWorkList,
            WorkFlowID,
            WorkFlowTransitonID,
            DesUserID,
            Note,
            ObjectNo,
            WorkflowTypeName,
            ObjectID,
            WorkflowTypeCode,
            CartableUserID
        });
    }
    UserReturnBatchWorkFlow(
        VWWorkList: any,
        WorkFlowID: number,
        ObjectNo: string,
        WorkflowTypeName: string,
        WorkflowTypeCode: number,
        ObjectID,
        DestUserList: any[],
        OrginalModuleCode?: any,
        CartableUserID?: number) {

        return this.http.post(window.location.origin + '/Home/UserReturnBatchWorkFlow', {
            VWWorkList,
            WorkFlowID,
            ObjectNo,
            WorkflowTypeName,
            WorkflowTypeCode,
            ObjectID,
            DestUserList,
            OrginalModuleCode,
            CartableUserID
        });
    }
    UserRejectWorkFlow(
        VWWorkList: any,
        WorkFlowID: number,
        WorkFlowTransitonID: number,
        DesUserID: number,
        Note: string,
        CartableUserID: number) {

        return this.http.post(window.location.origin + '/Home/UserRejectWorkFlow', {
            VWWorkList,
            WorkFlowID,
            WorkFlowTransitonID,
            DesUserID,
            Note,
            CartableUserID
        });
    }

    SaveContractOrderEstimate(ObjectID: number,
        ContractOrderItemIDList: any,
        ContractEstimateList: any,
        SeasonCode: number = null,
        ContractOrderItemWeightValueList: any
    ) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/Home/SaveContractOrderEstimate', {
            ObjectID,
            ContractOrderItemIDList,
            ContractEstimateList,
            SeasonCode,
            ContractOrderItemWeightValueList
        });
    }

    UserUpdateWorkFlow(WorkFlowID: number,
        ObjectID: number,
        RegionCode: number,
        ModuleCode: number,
        Flag: number,
        WorkflowObjectCode: number,
        ModuleViewTypeCode: number,
        OrginalModuleCode?: any,
        CartableUserID?: number,
        JoinWorkflowLogID?: string,
        IsFromProvider = null,
        IsEndFlow = null) {
    
        return this.http.post(window.location.origin + '/Home/UserUpdateWorkFlow', {
            WorkFlowID,
            ObjectID,
            RegionCode,
            ModuleCode,
            Flag,
            WorkflowObjectCode,
            ModuleViewTypeCode,
            OrginalModuleCode,
            CartableUserID,
            IsFromProvider,
            JoinWorkflowLogID,
            IsEndFlow
        });
    }

    UserUpdateWorkFlowStatus(WorkFlowIDs: number, CartableUserID: number) {
        return this.http.post(window.location.origin + '/Home/UserUpdateWorkFlowStatus', { WorkFlowIDs, CartableUserID });
    }

    UserFinalConfirmWorkFlow(
        VWWorkList: any,
        WorkFlowID: number,
        DesUserID: number,
        Note: string,
        ObjectNo: string,
        WorkflowTypeName: string,
        ObjectID,
        WorkFlowTypeCode: number,
        ConfirmFlag: boolean,
        WorkflowObjectCode,
        ModuleViewTypeCode: number,
        CartableUserID) {

        return this.http.post(window.location.origin + '/Home/UserFinalConfirmWorkFlow',
            {
                VWWorkList,
                WorkFlowID,
                DesUserID,
                Note,
                ObjectNo,
                WorkflowTypeName,
                ObjectID,
                WorkFlowTypeCode,
                ConfirmFlag,
                WorkflowObjectCode,
                ModuleViewTypeCode,
                CartableUserID
            });
    }

    GetWorkflowTypeModule() {
        return this.http.get(window.location.origin + '/Workflow/GetWorkflowTypeModule', null);
    }

    SaveWorkflowTypeModule(AWorkflowTypeModuleList: any) {
        return this.http.post(window.location.origin + '/Workflow/SaveWorkflowTypeModule', { AWorkflowTypeModuleList });
    }
    GetFinWorkFlowByWorkLogDetailID(WorkLogIDs: any[]) {
        return this.http.get(window.location.origin + '/Home/GetFinWorkFlowByWorkLogDetailID', { WorkLogIDs });
    }

    GetApplicationNote() {
        return this.http.get(window.location.origin + '/Home/GetApplicationNote', null);
    }
    FreeWorkFlow(WorkFlowID: number) {
        return this.http.get(window.location.origin + '/Workflow/FreeWorkFlow', {
            WorkFlowID
        });
    }
    checkQuestionLink() {
        return this.http.get(window.location.origin + '/Home/checkQuestionLink', null);
    }
    RedirectToSurveyPage() {
        return this.http.get(window.location.origin + '/Home/OpenSurveyPage', null);
    }
}
