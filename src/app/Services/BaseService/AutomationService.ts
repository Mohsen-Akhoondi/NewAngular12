import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class AutomationService {
    constructor(private http: BaseHttpClient) { }

    SearchAllDocument(RegionCode: any, OrganizationCode: any, RegisterLetterNo: any, DocumentLetterNo: any, DocumentLetterDate: any, IsArchive: any) {
        return this.http.get(window.location.origin + '/Automation/SearchAllDocument', {
            RegionCode,
            OrganizationCode,
            RegisterLetterNo,
            DocumentLetterNo,
            DocumentLetterDate,
            IsArchive
        });
    }
    SaveLetter(CostFactorLetter: any, Document: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/Automation/SaveLetter', {
            CostFactorLetter,
            Document,
            OrginalModuleCode
        });
    }

    DeleteLetter(CostFactorLetter: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/Automation/DeleteLetter', {
            CostFactorLetter,
            OrginalModuleCode
        });
    }

    ShowLetter(CostFactorLetter: any) {
        this.http.post(window.location.origin + '/Automation/ViewAutomation',
            { CostFactorLetter }).subscribe((res: any) => {
                if (res) {
                    window.open(res, '_blank');
                }
            });
    }
    GetAutomationLetter(CostFactorID, LetterTypeCode, OrganizationCode, ReceiveDocID: number = null, ProposalID: number = null) {
        return this.http.get(window.location.origin + '/Automation/GetAutomationLetter', {
            CostFactorID,
            LetterTypeCode,
            OrganizationCode,
            ReceiveDocID,
            ProposalID
        });
    }
    GetLetterTypeList(LetterTypeCodeList: any) {
        return this.http.get(window.location.origin + '/Automation/GetLetterTypeList', {
            LetterTypeCodeList
        });
    }
    GetCostFactorLetterList(CostFactorLetter: any) {
        return this.http.post(window.location.origin + '/Automation/GetCostFactorLetterList', {
            CostFactorLetter
        });
    }
    GetCostFactorLetterByCostFacorID(CostFactorID: any) {
        return this.http.get(window.location.origin + '/Automation/GetCostFactorLetterByCostFacorID', {
            CostFactorID
        });
    }

    ShowSendGroup(RegionCode) {
        return this.http.get(window.location.origin + '/Automation/ShowSendGroup', {
            RegionCode
        });
    }

    PersonnelSearch(RegionCode, GroupID, GroupIndex, FolName, FirstName, LastName) {
        return this.http.get(window.location.origin + '/Automation/PersonnelSearch', {
            RegionCode,
            GroupID, GroupIndex, FolName, FirstName, LastName
        });
    }

    SendLetter(RegionCode, CostFactorLetter, LetterList) {
        return this.http.post(window.location.origin + '/Automation/SendLetter', {
           RegionCode,
            CostFactorLetter,
            LetterList,
        });
    }

}
