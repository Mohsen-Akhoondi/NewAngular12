import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class CommonService {
    constructor(private http: BaseHttpClient) {
    }
    GetMasterDocumentList() {
        return this.http.get(window.location.origin + '/Common/GetMasterDocumentList', null);
    }

    SetMasterDocumentList(List: any, ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveMasterDocumentList',
            {
                List: List,
                ModuleToLog: ModuleToLog,
            });
    }
    GetDocumentTypeByParent(DocumentTypeCode: any, Isloading: boolean) {
        return this.http.get(window.location.origin + '/Common/GetDocumentTypeByParent', { DocumentTypeCode }, Isloading);
    }
    SaveDocumentTypeWithMandetories(List: any, ParentDocumentCode: number, Isloading: boolean, ModuleToLog) {
        return this.http.post(window.location.origin +
            '/Common/SaveDocumentTypeWithMandetories', { List, ParentDocumentCode, ModuleToLog }, Isloading);
    }
    GetAllLetterTypes() {
        return this.http.get(window.location.origin + '/Common/GetAllLetterTypes', null);
    }
    SaveLetterTypeList(LetterTypeList: any, ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveLetterTypes', {
            LetterTypeList: LetterTypeList,
            ModuleToLog: ModuleToLog
        });
    }
    GetAllShareTypeDataList() {
        return this.http.get(window.location.origin + '/Common/GetAllShareTypeDataList', null);
    }

    SaveShareTypeList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveShareTypeList', {
            List,
            ModuleToLog
        });
    }

    GetAllUnivercityData() {
        return this.http.get(window.location.origin + '/Common/GetAllUnivercityDataList', null);
    }

    SaveUnivercityDataList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveUnivercityDataList', {
            List,
            ModuleToLog
        });
    }

    GetAllFieldData() {
        return this.http.get(window.location.origin + '/Common/GetAllFieldDataList', null);
    }

    SaveFieldDataList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveFieldDataList', {
            List,
            ModuleToLog
        });
    }
    GetAllGradeData() {
        return this.http.get(window.location.origin + '/Common/GetAllGradeDataList', null);
    }

    SaveGradeDataList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveGradeDataList', {
            List,
            ModuleToLog
        });
    }
    GetAllBank() {
        return this.http.get(window.location.origin + '/Common/GetAllBank', null, false);
    }
    GetBankPaging(SearchOption: string,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        ActorID: number = null,
        BankID: number = null) {
        return this.http.get(window.location.origin + '/Common/GetBankPaging', {
            SearchOption,
            SearchTerm,
            PageNumber,
            PageSize,
            ActorID,
            BankID
        },
            false);
    }
    GetBranchPaging(SearchOption: string,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        BankID: number = null,
        ActorID: number = null,
        BranchID: number = null
    ) {
        return this.http.get(window.location.origin + '/Common/GetBranchPaging', {
            SearchOption,
            SearchTerm,
            PageNumber,
            PageSize,
            BankID,
            ActorID,
            BranchID
        },
            false);
    }
    GetActorBankAccList(ActorID: number) {
        return this.http.get(window.location.origin + '/Common/GetActorBankAccList', {
            ActorID
        });
    }
    GetAllState() {
        return this.http.get(window.location.origin + '/Common/GetAllState', null, false);
    }

    GetAllBranchByBankId(BankID: number) {
        return this.http.get(window.location.origin + '/Common/GetAllBranchByBankId', {
            BankID
        });
    }
    GetAllcityByStateId(StateID: number) {
        return this.http.get(window.location.origin + '/Common/GetAllcityByStateId', {
            StateID
        });
    }

    GetStateList() {
        return this.http.get(window.location.origin + '/Common/GetStateList', null);
    }

    GetCityByStateCode(StateCode: number) {
        return this.http.post(window.location.origin + '/Common/GetCityByStateCode', { StateCode: StateCode });
    }

    GetAllEstateType() {
        return this.http.get(window.location.origin + '/Common/GetAllEstateType', null);
    }
    GetEducationGradeList() {
        return this.http.get(window.location.origin + '/Common/GetEducationGradeList', null);
    }
    GetFieldList(SearchOption: string,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        FieldCode: number) {
        return this.http.get(window.location.origin + '/Common/GetFieldList', {
            SearchOption,
            SearchTerm,
            PageNumber,
            PageSize,
            FieldCode
        },
            false);
    }
    GetBusinessPatternPaging(SearchOption: string,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        UnitPatternID: number = null,
        BusinessPatternID: number = null) {
        return this.http.get(window.location.origin + '/Common/GetBusinessPatternPaging', {
            SearchOption,
            SearchTerm,
            PageNumber,
            PageSize,
            UnitPatternID,
            BusinessPatternID,
        }, false);
    }
    GetUniversityList(SearchOption: string,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        UniversityCode: number) {
        return this.http.get(window.location.origin + '/Common/GetUniversityList', {
            SearchOption,
            SearchTerm,
            PageNumber,
            PageSize,
            UniversityCode
        },
            false);
    }
    PriceListTopicListLevel3() {
        return this.http.get(window.location.origin + '/Common/PriceListTopicListLevel3', false);
    }
    GetPriceListBusinessPatternList() {
        return this.http.get(window.location.origin + '/Common/GetPriceListBusinessPatternList', null);
    }
    SavePriceListBusinessPattern(PriceListBusinessPatternList: any) {
        return this.http.post(window.location.origin + '/Common/SavePriceListBusinessPattern', { PriceListBusinessPatternList });
    }
    GetAllShareTypes() {
        return this.http.get(window.location.origin + '/Common/GetAllShareTypeDataList', null);
    }
    GetAdvertisingTypeList() {
        return this.http.get(window.location.origin + '/Common/GetAdvertisingTypeList', null);
    }

    GetAllRegionGroup(IsLoading = true) {
        return this.http.get(window.location.origin + '/Common/GetAllRegionGroup', null, IsLoading);
    }
    GetChildDocTypePaging(PageNumber,
        PageSize,
        SearchTerm,
        SearchOption,
        DocumentTypeCode = null) {
        return this.http.get(window.location.origin + '/Common/GetChildDocTypePaging', {
            PageNumber,
            PageSize,
            SearchTerm,
            SearchOption,
            DocumentTypeCode
        }, false);
    }
    SaveFilterDocType(FilterDocTypeList: any, ModuleCode: number, RegionCode: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.post(window.location.origin + '/Common/SaveFilterDocType', { FilterDocTypeList, ModuleCode, RegionCode });
    }
    GetFilterDocTypeList(RegionCode) {
        return this.http.get(window.location.origin + '/Common/GetFilterDocTypeList', { RegionCode });
    }
    copyText(CopyText: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = CopyText;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
    GetCorporatePersonnelType() {
        return this.http.get(window.location.origin + '/Common/GetCorporatePersonnelType', {});
    }
    SaveCorporatePersonnelType(CorporatePersonnelList: any, ModuleCode: number) {
        return this.http.post(window.location.origin + '/Common/SaveCorporatePersonnelType', { CorporatePersonnelList, ModuleCode });
    }
    GetAllCity() {
        return this.http.get(window.location.origin + '/Common/GetAllCity', {});
    }
    GetAllCorporateRegistertype() {
        return this.http.get(window.location.origin + '/Common/GetAllCorporateRegistertype', {});
    }
    GetAllCorporateActivity() {
        return this.http.get(window.location.origin + '/Common/GetAllCorporateActivity', {});
    }
    GetAllACountType() {
        return this.http.post(window.location.origin + '/Common/GetAllACountType', {});
    }
    GetAllownerShipType() {
        return this.http.get(window.location.origin + '/Common/GetAllownerShipType', {});
    }
    GetAllProviderAssetType() {
        return this.http.get(window.location.origin + '/Common/GetAllProviderAssetType', {});
    }
    ISExternalUser(IsCorporateOrPerson) {
        return this.http.get(window.location.origin + '/Common/ISExternalUser', { IsCorporateOrPerson });
    }
    CurrentUser() {
        return this.http.get(window.location.origin + '/Common/CurrentUser', {});
    }
    SaveProviderAssetTypeList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveProviderAssetTypeList', {
            List,
            ModuleToLog
        });
    }
    GetAllManagementTypeForManagementTab() {
        return this.http.get(window.location.origin + '/Common/GetAllManagementTypeForManagementTab', {});
    }
    GetAllResponsibilityTypeByManagementTypeCode(ManagementTypeCode) {
        return this.http.get(window.location.origin + '/Common/GetAllResponsibilityTypeByManagementTypeCode', {
            ManagementTypeCode
        });
    }
    GetAllCompanyGrade() {
        return this.http.get(window.location.origin + '/Common/GetAllCompanyGrade', {});
    }
    GetAllCriterionScore() {
        return this.http.get(window.location.origin + '/Common/GetAllCriterionScore', {});
    }
    GetAllDegreeScore() {
        return this.http.get(window.location.origin + '/Common/GetAllDegreeScore', {});
    }
    GetAllHaveApprovalCertificate() {
        return this.http.get(window.location.origin + '/Common/GetAllHaveApprovalCertificate', {});
    }
    GetAllNativenessOfCompany() {
        return this.http.get(window.location.origin + '/Common/GetAllNativenessOfCompany', {});
    }
    GetAllWorkExperienceScore() {
        return this.http.get(window.location.origin + '/Common/GetAllWorkExperienceScore', {});
    }
    GetAllCooperationHistory() {
        return this.http.get(window.location.origin + '/Common/GetAllCooperationHistory', {});
    }
    GetAllSimilarWorkExperience() {
        return this.http.get(window.location.origin + '/Common/GetAllSimilarWorkExperience', {});
    }
    GetAllPreviousEmployerReceipt() {
        return this.http.get(window.location.origin + '/Common/GetAllPreviousEmployerReceipt', {});
    }
    GetAllTechnicalCommitionView() {
        return this.http.get(window.location.origin + '/Common/GetAllTechnicalCommitionView', {});
    }
    GetAllProposalQuality() {
        return this.http.get(window.location.origin + '/Common/GetAllProposalQuality', {});
    }
    GetPersonByActorID(ActorId: number) {
        return this.http.get(window.location.origin + '/Common/GetPersonByActorID', { ActorId });
    }
    GetAllCertification(CertificationEvaluatorID: number) {
        return this.http.get(window.location.origin + '/Common/GetAllCertification', {
            CertificationEvaluatorID
        });
    }
    GetCityPaging(PageNumber, PageSize, SearchTerm, SearchOption, CityID: number = null) {
        return this.http.get(window.location.origin + '/Common/GetCityPaging',
            { PageNumber, PageSize, SearchTerm, SearchOption, CityID });
    }
    GetAllManagementType() {
        return this.http.get(window.location.origin + '/Common/GetAllManagementType', null);
    }
    SaveManagementType(AManagementTypeList: any, ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveManagementType', {
            AManagementTypeList: AManagementTypeList,
            ModuleToLog: ModuleToLog
        });
    }
    GetAllACountTypeByActivityField(CorporateActivityCodes: any) {
        return this.http.get(window.location.origin + '/Common/GetAllACountTypeByActivityField', { CorporateActivityCodes });
    }
    GetAllResponsibilityType() {
        return this.http.get(window.location.origin + '/Common/GetAllResponsibilityType', null);
    }
    SaveResponsibilityType(AResponsibilityTypeList: any) {
        return this.http.post(window.location.origin + '/Common/SaveResponsibilityType', {
            AResponsibilityTypeList: AResponsibilityTypeList
        });
    }
    GetAllModule(IsWeb: any, loading: boolean = false) {
        return this.http.get(window.location.origin + '/Common/GetAllModule', { IsWeb }, loading);
    }
    GetGoodsList(ActorID: number) {
        return this.http.get(window.location.origin + '/Common/GetGoodsList', { ActorID });
    }
    GetAllArchiveDetailList(ObjectID: number, TypeCodeList: any, checkSign: any, checkExist: boolean = true) {
        return this.http.get(window.location.origin + '/Common/GetAllArchiveDetailList', {
            ObjectID,
            TypeCodeList,
            checkSign,
            checkExist
        });
    }
    GetRankCalcListByPriceListTopicID(PriceListTopicID: number, RankParameterCode, RegionCode = null) {
        return this.http.get(window.location.origin + '/Common/GetRankCalcListByPriceListTopicID', {
            PriceListTopicID,
            RankParameterCode,
            RegionCode
        });
    }
    GetGoodsListRankCalc(PriceListTopicID: number) {
        return this.http.get(window.location.origin + '/Common/GetGoodsListRankCalc', { PriceListTopicID });
    }
    GetAllRankParameterList() {
        return this.http.get(window.location.origin + '/Common/GetAllRankParameterList', null);
    }
    SaveRankCalc(PriceListTopicID, RankParameterCode, RegionCode, RankCalcList: any) {
        // tslint:disable-next-line: max-line-length
        return this.http.post(window.location.origin + '/Common/SaveRankCalc', { PriceListTopicID, RankParameterCode, RegionCode, RankCalcList });
    }
    GetRankParameterList(ModuleCode = null) {
        return this.http.get(window.location.origin + '/Common/GetRankParameterList', { ModuleCode });
    }

    SaveRankParameter(ARankParameterList: any, ModuleToLog: number) {
        return this.http.post(window.location.origin + '/Common/SaveRankParameter', {
            ARankParameterList: ARankParameterList,
            ModuleToLog: ModuleToLog
        });
    }
    GetCorporateObject(ActorID) {
        return this.http.get(window.location.origin + '/Common/GetCorporateObject', { ActorID });
    }


    GetDataDictionary() {
        return this.http.get(window.location.origin + '/Common/GetDataDictionary', null);
    }

    SaveDataDictionary(ADataDictionaryList: any) {
        return this.http.post(window.location.origin + '/Common/SaveDataDictionary', { ADataDictionaryList });
    }
    GetExperienceCoefList() {
        return this.http.get(window.location.origin + '/Common/GetExperienceCoefList', null, false);
    }
    DeleteArchiveDetailDocuments(ObjectID: number, DTypeCode: any, ModuleCode) {
        return this.http
            .post(window.location.origin + '/Common/DeleteArchiveDetailDocuments',
                { ObjectID, DTypeCode, ModuleCode });
    }
    SaveModuleViewTypeDocument(DataObj: any) {
        return this.http.post(window.location.origin + '/Common/SaveModuleViewTypeDocument', {
            DataObj
        }, true);
    }
    GetModuleViewTypeDocumentList() {
        return this.http.get(window.location.origin + '/Common/GetModuleViewTypeDocumentList', null, false);
    }
    GetRelationTypeList() {
        return this.http.get(window.location.origin + '/Common/GetRelationTypeList', null);
    }
    SaveRelationTypeList(ARelationTypeList: any) {
        return this.http.post(window.location.origin + '/Common/SaveRelationTypeList', { ARelationTypeList });
    }
    GetAllResponsibilityTypeByCorporateType(ModuleCode) {
        return this.http.get(window.location.origin + '/Common/GetAllResponsibilityTypeByCorporateType', {
            ModuleCode
        });
    }
    GetAllAssetType() {
        return this.http.get(window.location.origin + '/Common/GetAllAssetType', {});
    }
    CheckPDFHasSigned(ObjectID: number, DocTypeCode: number) {
        return this.http.get(window.location.origin + '/Common/CheckPDFHasSigned',
            { ObjectID, DocTypeCode });
    }
    GetAllNotifList() {
        return this.http.get(window.location.origin + '/Home/GetAllNotifList', null);
    }
    GetAllByObjectID(ObjectID: number, ModuleCode: number) {
        return this.http.get(window.location.origin + '/Home/GetAllByObjectID', {
            ObjectID,
            ModuleCode
        });
    }
    GetAllAuditHistoryBySessionID(SessionID: number, ObjectID: number, ModuleCode: number) {
        return this.http.get(window.location.origin + '/Home/GetAllAuditHistoryBySessionID', {
            SessionID,
            ObjectID,
            ModuleCode
        });
    }
    GetLastAuditByObjectID(ObjectID: number) {
        return this.http.get(window.location.origin + '/Home/GetLastAuditByObjectID', {
            ObjectID
        }, true);
    }
    IsAutoGenerate(DocumentTypeCode: number) {
        return this.http.get(window.location.origin + '/Common/IsAutoGenerate', { DocumentTypeCode });
    }
    CheckAllowState(ActorID: number) {
        return this.http.get(window.location.origin + '/Home/CheckAllowState', { ActorID });
    }
    GetAllTable(OperationCode: number) {
        return this.http.get(window.location.origin + '/Common/GetAllTable', { OperationCode });
}
}
