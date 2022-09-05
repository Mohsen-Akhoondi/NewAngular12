import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ProductRequestService {
    constructor(private http: BaseHttpClient) {
    }

    GetVWExeUnitByRegion(ARegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetVWExeUnitByRegion', { ARegionCode }, false);
    }
    GetVWExeUnit() {
        return this.http.get(window.location.origin + '/ProductRequest/GetVWExeUnit', {}, false);
    }
    IsNeedCallCleanSys(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/IsNeedCallCleanSys', { CostFactorID });
    }
    GetCustomerOrderByRegion(ARegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCustomerOrderByRegion', { ARegionCode });
    }
    GetValidWarehouseByRegion(ARegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetValidWarehouseByRegion', { ARegionCode });
    }
    GetContractByRegionCode(ARegionCode: number, FinYearCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractByRegionCode', {
            ARegionCode,
            FinYearCode
        });
    }
    GetContractByRegion(ARegionCode: number, IsCost: boolean, FinYearCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractByRegion', {
            ARegionCode,
            IsCost,
            FinYearCode

        });
    }

    GetOnfilterRegion() {
        return this.http.get(window.location.origin + '/ProductRequest/GetOnfilterRegion', null);
    }
    GetCostCenterByRegion(ARegionCode: number, CurrentCostCenterID, ModuleCode = null, HaveLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCostCenterByRegion',
            { ARegionCode, CurrentCostCenterID, ModuleCode }, HaveLoading);
    }
    GetByRegionCodeUserWorkLog(ARegionCode: number, CurrentCostCenterID, HaveLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetByRegionCodeUserWorkLog',
            { ARegionCode, CurrentCostCenterID }, HaveLoading);
    }
    GetSubCostCenter(ACostCenterID: number, ModuleCode = null, IsLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetSubCostCenter', { ACostCenterID, ModuleCode }, IsLoading);
    }
    GetSubCostCenterCode(ARegionCode: number, FromCostCenterCode, ToCostCenterCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetSubCostCenterCode', { ARegionCode, FromCostCenterCode, ToCostCenterCode });
    }
    GetSubCostCenterList(CostCenterIDs: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetSubCostCenterList', { CostCenterIDs });
    }
    GetSubCostCenterPriPerson(ACostCenterID, ASubCostCenterID, RequestedActorID, ModuleCode = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetSubCostCenterPriPerson',
            {
                ACostCenterID,
                ASubCostCenterID,
                RequestedActorID,
                ModuleCode
            });
    }
    GetCostProductBySubCostCenter(ASubCostCenterID, ARegionCode, PageNumber, PageSize, SearchTerm, SearchOption, HaveLoading: boolean, CostProductID = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCostProductBySubCostCenter',
            {
                ASubCostCenterID,
                ARegionCode,
                PageNumber,
                PageSize,
                SearchTerm,
                SearchOption,
                CostProductID
            }, HaveLoading);
    }

    GetProductList(SearchOption,
        ARegionCode,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        ProductTypeCode: any,
        IsCost: boolean,
        ProductId) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductsList', {
            SearchOption,
            ARegionCode,
            SearchTerm,
            PageNumber,
            PageSize,
            ProductTypeCode,
            IsCost,
            ProductId
        },
            false);
    }

    GetSubCostCenterPerson() {
        return this.http.get(window.location.origin + '/ProductRequest/GetSubCostCenterPerson', null);
    }
    GetUnitPatternByRegion(AregionCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetUnitPatternByRegion', { AregionCode });
    }

    GetProductScaleName(ProductID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductScaleName', { ProductID });
    }

    GetContractType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractType', null);
    }
    SaveContractType(AContractTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveContractType', { AContractTypeList });
    }
    SaveDealMethodType(ADealMethodTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveDealMethodType', { ADealMethodTypeList });
    }
    GetProductRequestCost(ARegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestCost', { ARegionCode });
    }

    GetUnitPatternByRegionCode(ARegionCode: number, HaveLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetUnitPatternByRegionCode', { ARegionCode }, HaveLoading);
    }

    SaveProductRequest(
        ModuleCode: any,
        ProductRequest: any,
        ProductRequestList: any,
        ContractOrder: any,
        Checkexception: any,
        IncPrecent: any,
        OrginalModuleCode?: any,
        AssetPRList?: any,
        WarrantyList?: any,
        ModuleViewTypeCode?: number,
        RelatedProductList = null,
        IsReturn: boolean = null,
        ProductRequestPerson = null,
        ContractId = null
    ) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequest', {
            ModuleCode,
            ProductRequest,
            ProductRequestList,
            ContractOrder,
            Checkexception,
            IncPrecent,
            OrginalModuleCode,
            AssetPRList,
            WarrantyList,
            ModuleViewTypeCode, // RFC 52370
            RelatedProductList,
            IsReturn,
            ProductRequestPerson,
            ContractId
        });
    }
    SavePurProductRequest(
        ModuleCode: any,
        ProductRequest: any,
        ProductRequestList: any,
        OrginalModuleCode?: any
    ) {
        return this.http.post(window.location.origin + '/ProductRequest/SavePurProductRequest', {
            ModuleCode,
            ProductRequest,
            ProductRequestList,
            OrginalModuleCode
        });
    }

    GetUnitPersonByUnitPattern(UnitPatternID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetUnitPersonByUnitPattern', { UnitPatternID });
    }
    GetAssetEstateDetailsByAssetID(AAssetID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetEstateDetailsByAssetID', { AAssetID });
    }
    GetAssetByAssetID(AssetID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetByAssetID', { AssetID });
    }
    GetEstateAssetsByRegion(ARegionCode: number, IsLoading) {
        return this.http.get(window.location.origin + '/ProductRequest/GetEstateAssetsByRegion', { ARegionCode }, IsLoading);
    }
    GetAssetsByRegion(ARegionCode: number, PageNumber, PageSize, SearchTerm, SearchOption, IsLoading) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetsByRegion', {
            ARegionCode,
            PageNumber,
            PageSize,
            SearchTerm,
            SearchOption
        }, IsLoading);
    }
    GetDocTypeMadatory(DealMethodCode: number, DealTypeCode: number, ContractTypeCode: number,
        RegionCode: number, FinYearCode: number, Article31ID: number, ModuleViewTypeCode: any = null,
        ModuleCode: any = null, IsNew: any = null, ParentDocumentTypeCodes: any[] = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetDocTypeMadatory', {
            DealMethodCode,
            DealTypeCode,
            ContractTypeCode,
            RegionCode,
            FinYearCode,
            Article31ID,
            ModuleViewTypeCode,
            ModuleCode,
            IsNew,
            ParentDocumentTypeCodes
        });
    }

    // tslint:disable-next-line: max-line-length
    GetDealMethodListByReionGroupCode(
        IsCost: boolean,
        DealTypeCode: number = null,
        RegionCode: number,
        ModuleCode: number,
        DealMethodCode: number,
        ContractTypeCode: number = null,
        CostFactorID: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetDealMethodListByReionGroupCode', {
            IsCost,
            DealTypeCode,
            RegionCode,
            ModuleCode,
            DealMethodCode,
            ContractTypeCode,
            CostFactorID
        });
    }

    GetArticle31List(RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetArticle31List', { RegionCode });
    }

    UpdateProductRequest(ProductRequest: any,
        ProductRequestItemList: any,
        RequestSupplierList: any,
        ProductRequestRelationList: any,
        BeneficiaryList: any,
        Checkexception: any,
        // IsTransferedContract: any,
        CostFactorLetter?: any,
        Document?: any,
        SaveListSetting?: any,
        ModuleCode?: any,
        OrginalModuleCode?: any,
        PriceListTypeCode: string = null) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateProductRequest', {
            ProductRequest,
            ProductRequestItemList,
            RequestSupplierList,
            ProductRequestRelationList,
            BeneficiaryList,
            Checkexception,
            CostFactorLetter,
            Document,
            SaveListSetting,
            ModuleCode,
            OrginalModuleCode,
            // IsTransferedContract,
            PriceListTypeCode
        });
    }
    GetProductRequestDealType(RegionCode: number,
        ProductRequestDate: string,
        SumFinalAmount: number
    ) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestDealType', {
            RegionCode,
            ProductRequestDate,
            SumFinalAmount
        });
    }

    GetProductRequestCoefType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestCoefType', null);
    }

    SaveProductRequestCoefType(AProductRequesCoefTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestCoefType', { AProductRequesCoefTypeList });
    }

    SaveProductRequestCost(ProductRequest: any,
        CostFactorID: number,
        ProductRequestCostList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestCost', {
            ProductRequest,
            CostFactorID,
            ProductRequestCostList
        });
    }
    SaveProductRequestPerson(ProductRequest: any,
        CostFactorID: number, ProductRequestPersonList: any, ModuleCode: any, OrginalModuleCode?: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestPerson', {
            ProductRequest,
            CostFactorID,
            ProductRequestPersonList,
            ModuleCode,
            OrginalModuleCode
        });
    }
    SaveExpertProductRequestPerson(AProductRequestPerson, IsUpdateBeforeAdevertising, ModuleCode, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveExpertProductRequestPerson', {
            AProductRequestPerson,
            IsUpdateBeforeAdevertising,
            ModuleCode,
            OrginalModuleCode
        });
    }
    GetPRBalanceFactors(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetPRBalanceFactors', { CostFactorID });
    }

    GetBusinessPattern() {
        return this.http.get(window.location.origin + '/ProductRequest/GetBusinessPattern', null, false);
    }

    GetDefaultUnitPerson() {
        return this.http.get(window.location.origin + '/ProductRequest/GetDefaultUnitPerson', null);
    }

    SaveContractOrder(ContractID: any, ContractOrder: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveContractOrder', { ContractID, ContractOrder });
    }

    UpdateProductRequestContract(ProductRequest: any,
        ProductRequestItemList: any,
        RSupplierList: any,
        ProductRequestRelationList: any,
        Acontract: any,
        ContractSignList: any,
        // ContractCommitionMemberList: any,
        ReceiveDocList: any,
        ContractOrder: any,
        Contractor: any,
        ModuleCode: any,
        CostFactorLetter?: any,
        Document?: any,
        OrginalModuleCode?: any,
        AContractPeronList?: any
    ) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateProductRequestContract', {
            ProductRequest,
            ProductRequestItemList,
            RSupplierList,
            ProductRequestRelationList,
            Acontract,
            ContractSignList,
            // ContractCommitionMemberList,
            ReceiveDocList,
            ContractOrder,
            Contractor,
            ModuleCode,
            CostFactorLetter,
            Document,
            OrginalModuleCode,
            AContractPeronList
        });
    }
    UpdateInComeProductRequestContract(ProductRequest: any,
        ProductRequestItemList: any,
        RSupplierList: any,
        ProductRequestRelationList: any,
        Acontract: any,
        ContractSignList: any,
        // ContractCommitionMemberList: any,
        ReceiveDocList: any,
        ContractOrder: any,
        Contractor: any,
        ModuleCode: any,
        CostFactorLetter?: any,
        Document?: any,
        OrginalModuleCode?: any,
        ModuleViewTypeCode: any = null

    ) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateInComeProductRequestContract', {
            ProductRequest,
            ProductRequestItemList,
            RSupplierList,
            ProductRequestRelationList,
            Acontract,
            ContractSignList,
            // ContractCommitionMemberList,
            ReceiveDocList,
            ContractOrder,
            Contractor,
            ModuleCode,
            CostFactorLetter,
            Document,
            OrginalModuleCode,
            ModuleViewTypeCode
        });
    }

    GetProductRequestList(ARegionCode: number, ModuleCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestList', { ARegionCode, ModuleCode });
    }
    GetContractWithoutFlowListData(ARegionCode: number, AModuleCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractWithoutFlowListData', { ARegionCode, AModuleCode });
    }
    GetContractWithoutFlowList(ARegionCode: number, AModuleCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractWithoutFlowList', { ARegionCode, AModuleCode }, true);
    }
    GetProductRequestOnlyForAdvertising(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestOnlyForAdvertising', { CostFactorID });
    }
    GetProductRequest(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequest', { CostFactorID });
    }
    GetProductRequestForPRPage(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestForPRPage', { CostFactorID });
    }
    GetProductRequestForItems(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestForItems', { CostFactorID });
    }

    GetProductRequestForOrders(ARegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestForOrders', { ARegionCode });
    }

    GetInquiryTypeList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetInquiryTypeList', null);
    }

    SaveInquiry(CostFactorID: any, Inquiry: any, ProposalList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveInquiry', { CostFactorID, Inquiry, ProposalList });
    }

    SetOrderAndInquiry(ProductRequestItemID: any, CostFactorID: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/SetOrderAndInquiry', {
            ProductRequestItemID,
            CostFactorID,
        });
    }
    // tslint:disable-next-line:max-line-length
    GetOrdersWithProductRequest(ProductRequestItemID: any,
        HasnotOrder: boolean = null,
        CostFactorID: number = null,
        IsChabokContractModuleViewType11: boolean = false,
        IsCompletionContractInfo: boolean = false,
        ModuleViewTypeCode: number = null,
        ModuleCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetOrdersWithProductRequest', {
            ProductRequestItemID,
            HasnotOrder,
            CostFactorID,
            IsChabokContractModuleViewType11,
            IsCompletionContractInfo,
            ModuleViewTypeCode,
            ModuleCode
        });
    }

    SavePropsalItem(ProposalItemList: any, rowDataCoefList: any, Proposal: any, ModuleCode: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SavePropsalItem', {
            ProposalItemList,
            rowDataCoefList,
            Proposal,
            ModuleCode,
            OrginalModuleCode
        });
    }
    GetPropsal(ProposalID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetPropsal', { ProposalID });
    }
    // tslint:disable-next-line:max-line-length
    RequestRevocation(VWWorkList: any, WorkFlowID: any, CostFactorID: any, WorkflowTypeCode: any, ModuleCode: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/RequestRevocation', {
            VWWorkList,
            WorkFlowID,
            CostFactorID,
            WorkflowTypeCode,
            ModuleCode,
            OrginalModuleCode
        });
    }
    GetProductRequestEstimateListWithProduct(CostFactorID: number,
        ProductID: number,
        PriceListPatternIDs: any,
        IsLeft: number) {

        return this.http.get(window.location.origin +
            '/ProductRequest/GetProductRequestEstimateListWithProduct', {
            CostFactorID,
            ProductID,
            PriceListPatternIDs,
            IsLeft
        });
    }

    SaveRequestPersonEstimate(ProductRequestItemList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveRequestPersonEstimate', { ProductRequestItemList });
    }

    SaveProductRequestEstimate(ProductRequestItemList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestEstimate', { ProductRequestItemList });
    }
    GetRegion(DistrictCode: any, AreaCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRegion', { DistrictCode, AreaCode });
    }
    SavePropsalPersonEstimate(ProposalID: any,
        ProposalItemList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SavePropsalPersonEstimate', {
            ProposalID,
            ProposalItemList
        });
    }

    GetProdReqCoef(CostFactorID: any, ProductRequestItemID = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProdReqCoef', { CostFactorID, ProductRequestItemID });
    }
    SaveProdReqCoef(CostFactorID: number,
        ProductRequestCoefList: any,
        OrginalModuleCode?: any,
        ProductRequestItemID: number = null) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProdReqCoef', {
            CostFactorID,
            ProductRequestCoefList,
            OrginalModuleCode,
            ProductRequestItemID
        });
    }

    GetBgtTopicPaging(PageNumber, PageSize, SearchTerm, SearchOption,
        FinYearCode: number,
        RegionCode: number,
        BgtTopicID: number = null) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/GetBgtTopicPaging', { PageNumber, PageSize, SearchTerm, SearchOption, FinYearCode, RegionCode, BgtTopicID }, false);
    }

    GetCreditTypeList(IsLoading = true) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCreditTypeList', null, IsLoading);
    }

    GetApprovalAmount(RegionCode: any,
        UnitPatternID: any,
        FinYearCode: any,
        BgtTopicID: any,
        IsCash: any,
        ProvisionID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetApprovalAmount', {
            RegionCode,
            UnitPatternID,
            FinYearCode,
            BgtTopicID,
            IsCash,
            ProvisionID
        });
    }

    GetProductRequestForLog(RegionCode: any, WorkflowTypeCode: any,
        FromContract: any, ToContract: any, LetterParameter: any, SubjectParameter: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestForLog', {
            RegionCode,
            WorkflowTypeCode,
            FromContract,
            ToContract,
            LetterParameter,
            SubjectParameter
        });
    }
    DeleteProductRequestWithFlow(ProductRequestID: any, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteProductRequestWithFlow', { ProductRequestID, ModuleCode });
    }
    DeleteProductRequest(CostFactorID: any, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteProductRequest', { CostFactorID, ModuleCode });
    }

    GetProductRequestPaging(pageNumber: any, pageSize: any, SearchTerm: any, SearchOption: any, RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestPaging', {
            pageNumber,
            pageSize,
            SearchTerm,
            SearchOption,
            RegionCode
        });

    }

    // tslint:disable-next-line:max-line-length
    SaveProductRequestProvision(ModuleCode, ProductRequest: any, ProductRequestProvisionList: any, CostFactorLetter?: any, Document?: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestProvision', {
            ModuleCode, ProductRequest, ProductRequestProvisionList, CostFactorLetter, Document, OrginalModuleCode
        });
    }

    GetProvision(CostFactorID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProvision', {
            CostFactorID
        });
    }

    SaveProductRequestEstimateNote(CostFactorID: any, EstimateNote: any, CostFactorLetter?: any, Document?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestEstimateNote', {
            CostFactorID, EstimateNote, CostFactorLetter, Document
        });
    }
    ChangeProductRequestLawful(CostFactorID, Lawful, OrginalModuleCode) {
        return this.http.post(window.location.origin + '/ProductRequest/ChangeProductRequestLawful', {
            CostFactorID,
            Lawful,
            OrginalModuleCode
        });
    }
    SavePRWarrantyAndValidity(CostFactorID, IsWarrantyValidity, WarrantyList, OrginalModuleCode?: any, OrderCommitionID = null) {
        return this.http.post(window.location.origin + '/ProductRequest/SavePRWarrantyAndValidity', {
            CostFactorID,
            IsWarrantyValidity,
            WarrantyList,
            OrginalModuleCode,
            OrderCommitionID
        });
    }
    UpdatePRWarrantyMoratorium(CostFactorID, IsWarrantyMoratorium) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdatePRWarrantyMoratorium', {
            CostFactorID,
            IsWarrantyMoratorium
        });
    }
    UpdatePRIsWarrantyProvided(CostFactorID, IsWarrantyProvided) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdatePRIsWarrantyProvided', {
            CostFactorID,
            IsWarrantyProvided
        });
    }
    GetPRCostWarrantyList(
        CostFactorID,
        OrderCommitionID = null,
        ModuleVIewTypeCode: number = null
    ) {
        return this.http.get(window.location.origin + '/ProductRequest/GetPRCostWarrantyList', {
            CostFactorID,
            OrderCommitionID,
            ModuleVIewTypeCode
        });
    }
    GetPRCostWarrantyListPRPage(CostFactorID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetPRCostWarrantyListPRPage', {
            CostFactorID
        });
    }
    SaveAdvertising(Advertising: any, AdvertisingInquiryList: any, IsDateRequired: boolean) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveAdvertising', {
            Advertising, AdvertisingInquiryList, IsDateRequired
        });
    }
    GetNewsPaper() {
        return this.http.get(window.location.origin + '/ProductRequest/GetNewsPaper', null);
    }

    SaveNewsPaper(NewsPaperList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveNewsPaper', { NewsPaperList });
    }

    GetNewsPaperList() {
        return this.http.post(window.location.origin + '/ProductRequest/GetNewsPaperList', null);
    }

    GetAdvertisingListByRegionCode(RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAdvertisingListByRegionCode', { RegionCode });
    }

    GetResearcherProductrequestList() {
        return this.http.post(window.location.origin + '/ProductRequest/GetResearcherProductrequestList', null);
    }
    SaveAdvertisingInquiry(CostFactorID: any,
        Inquiry: any,
        NewsPaperCodeList: any,
        CheckExceptions: any,
        AdvertisingID: any,
        ProposalList: any,
        ProposalPersonContactInfoList: any,
        RatingRequired: any,
        OrginalModuleCode?: any,
        ModuleViewTypeCode = null,
        HaveSupplers: any = null
    ) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveAdvertisingInquiry', {
            CostFactorID,
            Inquiry,
            NewsPaperCodeList,
            CheckExceptions,
            AdvertisingID,
            ProposalList,
            ProposalPersonContactInfoList,
            RatingRequired,
            OrginalModuleCode,
            ModuleViewTypeCode,
            HaveSupplers
        });
    }

    GetAdvertising(AdvertisingID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAdvertising', { AdvertisingID });
    }

    GetInquiryListByAdvertising(AdvertisingID: any, RegionCode: any, IsCost: boolean = false, DealMethodCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetInquiryListByAdvertising',
            { AdvertisingID, RegionCode, DealMethodCode, IsCost });
    }
    GetCommitionMemberList(CommitionCode: any, RegionCode: number, Codes: any = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCommitionMemberList', {
            CommitionCode, RegionCode, Codes
        });
    }
    GetByActorIDs(CommitionCode: number, RegionCode: number, ActorIDs: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetByActorIDs', {
            CommitionCode,
            RegionCode,
            ActorIDs
        });
    }


    SaveCommitionMember(OrderCommition: any, ActorIDList: any, InquiryID: any, ProposalList: any,
        // tslint:disable-next-line: max-line-length
        CkeckExceptions: any, OrginalModuleCode?: any, AProductRequestPeopleList?: any, IsMultiContract?: boolean, CostFactorMultiContract?: number,
        GradeID?: number, PRCostFactorID?: number, IsMaterialsDifference?: boolean,
        HaveMaterials?: boolean, HaveWinner: boolean = null, ModuleViewTypeCode = null, PriceListTopicID: number = null,
        ModuleCode?: number, RegionCode: number = null) { // RFC 50573
        return this.http.post(window.location.origin + '/ProductRequest/SaveCommitionMember', {
            OrderCommition,
            ActorIDList,
            InquiryID,
            ProposalList,
            CkeckExceptions,
            OrginalModuleCode,
            AProductRequestPeopleList,
            IsMultiContract,
            CostFactorMultiContract,
            GradeID,
            PRCostFactorID,
            IsMaterialsDifference,
            HaveMaterials,
            HaveWinner, // RFC 50573
            ModuleViewTypeCode,
            PriceListTopicID,
            ModuleCode,
            RegionCode
        });
    }

    GetInquiryList(CostFactorID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetInquiryList', { CostFactorID });
    }
    UpdateProductRequestOfficialExpertPrice(CostFactorID, OfficialExpertPrice, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateProductRequestOfficialExpertPrice', {
            CostFactorID,
            OfficialExpertPrice,
            OrginalModuleCode
        });
    }
    GetCurrentDate() {
        return this.http.get(window.location.origin + '/ProductRequest/GetCurrentDate', null);
    }
    GetContractByProductRequest(ProductRequestID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractByProductRequest', {
            ProductRequestID
        });
    }
    SetContractIsTaxValue(ContractID, IstaxtValue) {
        return this.http.get(window.location.origin + '/ProductRequest/SetContractIsTaxValue', {
            ContractID,
            IstaxtValue
        });
    }
    // here ok


    GetOrderCommitionByPRIID(ProductRequestItemID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetOrderCommitionByPRIID', {
            ProductRequestItemID
        });
    }
    SetPRIsNeedCreditModification(CostFactorID, IsNeedCreditModification) {
        return this.http.post(window.location.origin + '/ProductRequest/SetPRIsNeedCreditModification', {
            CostFactorID,
            IsNeedCreditModification
        });
    }
    SetPRHaveWinner(CostFactorID, HaveWinner) {
        return this.http.post(window.location.origin + '/ProductRequest/SetPRHaveWinner', {
            CostFactorID,
            HaveWinner
        });
    }
    GetProductByCode(ProductCodeList) {
        return this.http.post(window.location.origin + '/ProductRequest/GetProductByCode', {
            ProductCodeList
        });
    }
    SetPRHaveQuotaOfSuggestions(CostFactorID, HaveQuotaOfSuggestions) {
        return this.http.post(window.location.origin + '/ProductRequest/SetPRHaveQuotaOfSuggestions', {
            CostFactorID,
            HaveQuotaOfSuggestions
        });
    }
    SetWarrantyValidity(CostFactorID, IsWarrantyValidity) {
        return this.http.post(window.location.origin + '/ProductRequest/SetWarrantyValidity', {
            CostFactorID,
            IsWarrantyValidity
        });
    }
    UpdateCommitionDateByID(OrederCommitionID, CommitionDate) {
        return this.http.get(window.location.origin + '/ProductRequest/UpdateCommitionDateByID', {
            OrederCommitionID,
            CommitionDate
        });
    }
    GetContractLength(StartDate: any, EndDate: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractLength', { StartDate, EndDate });
    }

    GetProductRequestEstateList(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestEstateList', { CostFactorID });
    }

    SearchEstate(BlockNo, LandNo, ApartmentNo, BusinessNo, ZoneNo,
        RegionNo, OldRegNo, NewPostCode, DistrictNo,
        OwnerNo, FirstName, LastName, PAddress) {

        return this.http.get(window.location.origin + '/ProductRequest/SearchEstate',
            {
                BlockNo, LandNo, ApartmentNo, BusinessNo,
                ZoneNo, RegionNo, OldRegNo, NewPostCode, DistrictNo,
                OwnerNo, FirstName, LastName, PAddress
            });
    }

    // tslint:disable-next-line:max-line-length
    SaveProductRequestEstate(CostFactorID: any, EstateList: any, RequestSupplierList: any, AModuleCode: number, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestEstate', {
            CostFactorID,
            EstateList,
            RequestSupplierList,
            AModuleCode,
            OrginalModuleCode
        });
    }

    GetProductRequestWithRemainProvision(ARegionCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestWithRemainProvision', { ARegionCode });
    }
    GetInvestUsageType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetInvestUsageType', null);
    }
    SaveInvestUsageType(AInvestUsageTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveInvestUsageType', { AInvestUsageTypeList });
    }
    SetPRIsProvisionDuring(CostFactorID, IsProvisionDuring, OrginalModuleCode) {
        return this.http.post(window.location.origin + '/ProductRequest/SetPRIsProvisionDuring', {
            CostFactorID,
            IsProvisionDuring,
            OrginalModuleCode
        });
    }
    GetInvestType(IsLoading: boolean, ModuleCode = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetInvestType', { IsLoading, ModuleCode });
    }
    SaveInvestTypeList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveInvestTypeList', {
            List,
            ModuleToLog
        });
    }
    SaveConsultantSelectTypeList(List: any[], ModuleToLog: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveConsultantSelectTypeList', {
            List,
            ModuleToLog
        });
    }
    GetProductRequestInvest(CostFactorID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestInvest', { CostFactorID });
    }
    SaveProductRequestInvest(AProductRequestInvest, ARequestInvestUsageTypeList) {
        // tslint:disable-next-line: max-line-length
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestInvest', { AProductRequestInvest, ARequestInvestUsageTypeList });
    }
    GetActLocationByRegionCode(RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetActLocationByRegionCode', { RegionCode });
    }
    GetCustomerOrderByRegionPaging(
        PageNumber, PageSize, SearchTerm, SearchOption, ARegionCode,
        CustomerOrderID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCustomerOrderByRegionPaging',
            { PageNumber, PageSize, SearchTerm, SearchOption, ARegionCode, CustomerOrderID });
    }
    GetCustomerOrderByRegionPagingWithCorporateType(
        PageNumber, PageSize, SearchTerm, SearchOption, ARegionCode,
        CustomerOrderID, corporateType = null
    ) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCustomerOrderByRegionPagingWithCorporateType',
            {
                PageNumber, PageSize, SearchTerm, SearchOption,
                ARegionCode, CustomerOrderID, corporateType
            });
    }

    CanReOpen(CostFactorID: number, IsProvisionRemain) {
        return this.http.get(window.location.origin + '/ProductRequest/CanReOpen', { CostFactorID, IsProvisionRemain });
    }
    RequestWithoutFlowRevocation(VWWorkList, WorkFlowID, CostFactorID, WorkflowTypeCode) {
        return this.http.get(window.location.origin + '/ProductRequest/RequestWithoutFlowRevocation', {
            VWWorkList,
            WorkFlowID,
            CostFactorID,
            WorkflowTypeCode
        });
    }

    IsSendToProject(ContractID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/IsSendToProject', { ContractID });
    }

    ReviewMethodList() {
        return this.http.get(window.location.origin + '/ProductRequest/ReviewMethodList', null);
    }

    GetRequestSupplierList(ACostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestSupplierList', { ACostFactorID });
    }

    SaveRequestSupplier(CostFactorID: number, RequestSupplierList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveRequestSupplier', { CostFactorID, RequestSupplierList });

    }

    GetJobCategoryList(CostCenterCode: number, HaveLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetJobCategoryList', { CostCenterCode }, HaveLoading);
    }

    SaveProductRequestArticle48(RequestArticle48List: any, ProductRequest: any, ModuleCode: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestArticle48',
            {
                RequestArticle48List,
                ProductRequest,
                ModuleCode,
                OrginalModuleCode
            });
    }
    GetRequestArticle48List(CostFactorID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestArticle48List', {
            CostFactorID
        });
    }
    GetProductRequestArticle48Provision(ARegionCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestArticle48Provision', { ARegionCode });
    }
    GetProposalList(CostFactorID: number, IsLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProposalList', { CostFactorID }, IsLoading);
    }
    GetProposalWinnerList(CostFactorID: number, IsLoading: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProposalWinnerList', { CostFactorID }, IsLoading);
    }

    GetEstateTypeList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetEstateTypeList', null);
    }
    GetNewAdvertisingCode(RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetNewAdvertisingCode', { RegionCode });
    }
    RefreshProposalList(InquiryID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/RefreshProposalList', { InquiryID });
    }

    SetProductRequestRenewal(CostFactorID, IsRenewal) {
        return this.http.post(window.location.origin + '/ProductRequest/SetProductRequestRenewal', {
            CostFactorID,
            IsRenewal
        });
    }
    SetProductRequestRenewal187(CostFactorID, IsRenewal) {
        return this.http.post(window.location.origin + '/ProductRequest/SetProductRequestRenewal187', {
            CostFactorID,
            IsRenewal

        });
    }
    GetAllDealTypeMethodList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllDealTypeMethodList', null);
    }
    SaveDealTypeMethodList(List: any[]) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveDealTypeMethodList', {
            List
        });
    }
    GetCommitionList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetCommitionList', null);
    }
    DeleteAdvertising(AdvertisingID: any, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteAdvertising', { AdvertisingID, ModuleCode });
    }
    GetProposalCoefListWithProposalID(ProposalID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProposalCoefListWithProposalID', { ProposalID }, null);
    }

    SavePRMultiContract(CostFactorID, IsMultiContract) {
        return this.http.post(window.location.origin + '/ProductRequest/SavePRMultiContract', {
            CostFactorID,
            IsMultiContract
        });
    }
    GetLastContractOrderitemByProductRequest(CostFactorID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetLastContractOrderitemByProductRequest', {
            CostFactorID
        });
    }

    SaveProductRequestFromContractProvisionRemainPage(ProductRequest: any, ModuleCode: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestFromContractProvisionRemainPage', {
            ProductRequest,
            ModuleCode
        });
    }
    HasProductRequestEstimate(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/HasProductRequestEstimate', {
            CostFactorID
        });
    }
    GetNewInquiryNo(CostFactorID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetNewInquiryNo', { CostFactorID });
    }
    GetProductRequestItemListVW(ACostFactorID: number, ActorControl: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestItemListVW', { ACostFactorID, ActorControl });
    }
    UpdateIsOver25(ContractId: number, IsOver25: boolean, ModuleCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/UpdateIsOver25', { ContractId, IsOver25, ModuleCode });
    }
    UpdateIsOutsideAmendment(ContractId: number, IsOutsideAmendment: boolean, ModuleCode: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/UpdateIsOutsideAmendment', { ContractId, IsOutsideAmendment, ModuleCode });
    } // RFC 52381
    GetCapacity(ActorID: number, CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCapacity',
            {
                ActorID,
                CostFactorID
            });
    }

    SearchRecognitionEstate(ZoneNo,
        BlockNo,
        LandNo,
        ApartmentNo,
        BusinessNo,
        RegRegion,
        MajorRegNo,
        MinorRegNo,
        DivisionSeq) {

        return this.http.get(window.location.origin + '/ProductRequest/SearchRecognitionEstate',
            {
                ZoneNo,
                BlockNo,
                LandNo,
                ApartmentNo,
                BusinessNo,
                RegRegion,
                MajorRegNo,
                MinorRegNo,
                DivisionSeq
            });
    }

    GetAssetEstateList(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetEstateList', { CostFactorID });
    }
    GetTenderFileCipherKeys(ProposalID, OrderCommitionID, ParentDocumentTypeCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetTenderFileCipherKeys', {
            ProposalID,
            OrderCommitionID,
            ParentDocumentTypeCode
        });
    }
    GetTenderFileCipherKey(ArchiveDetailID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetTenderFileCipherKey', {
            ArchiveDetailID
        }, false);
    }
    GetTenderFileNames(ProposalID, OrderCommitionID, ParentDocumentTypeCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetTenderFileNames', {
            ProposalID,
            OrderCommitionID,
            ParentDocumentTypeCode
        });
    }
    CheckTenderEnvekopesIsLock(ProposalID) {
        return this.http.get(window.location.origin + '/ProductRequest/CheckTenderEnvekopesIsLock', {
            ProposalID
        });
    }
    GetBatchDecryptedTenderFiles(CipherKeyDetails) {
        return this.http.post(window.location.origin + '/ProductRequest/GetBatchDecryptedTenderFiles', { CipherKeyDetails });
    }
    GetDecryptedTenderFiles(CipherKeyDetails) {
        return this.http.post(window.location.origin + '/ProductRequest/GetDecryptedTenderFiles', { CipherKeyDetails }, false);
    }
    GetDigestFiles(Certificate, Data) {
        return this.http.post(window.location.origin + '/ProductRequest/GetDigestFiles', { Certificate, Data });
    }
    GetSignedPDF(Certificate, Data, Signature) {
        return this.http.post(window.location.origin + '/ProductRequest/GetSignedPDF', { Certificate, Data, Signature });
    }
    GetMinutesReportPDFContent(
        OrderCommitionIDs,
        CostFactorID,
        RegionCode,
        ReportVer,
        HasTripleReport,
        SaveMode: any = false,
        ModuleViewTypeCode = null,
        ModuleCode: number = null,
        ShowNoteInReport: boolean = null,
        UrbanRepType: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetMinutesReportPDFContent',
            {
                OrderCommitionIDs, CostFactorID,
                RegionCode, SaveMode,
                HasTripleReport, ReportVer,
                ModuleViewTypeCode, ModuleCode,
                ShowNoteInReport, UrbanRepType
            });
    }
    GetPDFDigestMinutesReport(OrderCommitionID, Certificate, DocTypeCode) {
        return this.http.post(window.location.origin + '/ProductRequest/GetPDFDigestMinutesReport',
            { OrderCommitionID, Certificate, DocTypeCode });
    }
    SignedPDFMinutesReport(OrderCommitionID, Certificate, Signature, DocTypeCode) {
        return this.http.post(window.location.origin + '/ProductRequest/SignedPDFMinutesReport',
            { OrderCommitionID, Certificate, Signature, DocTypeCode });
    }
    SetInquiryIsReturn(InquiryID: number, IsReturn: boolean, ModuleCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/SetInquiryIsReturn', { InquiryID, IsReturn, ModuleCode });
    }
    DeleteProductRequestWithFlowAndArchives(CostFactorID: number, ModuleCode: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.post(window.location.origin + '/ProductRequest/DeleteProductRequestWithFlowAndArchives', { CostFactorID, ModuleCode });
    }
    GetCommitionExpertPerson(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCommitionExpertPerson', { CostFactorID });
    }
    GetProductRequestCoef(CostFactorID: number, ProductRequestItemID: number, levelCode: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestCoef', { CostFactorID, ProductRequestItemID, levelCode });
    }
    SaveProductRequestItemCoefList(CostFactorID: number,
        ProductRequestItemID: any,
        CoefList: any,
        CoefLevelCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestItemCoefList', {
            CostFactorID,
            ProductRequestItemID,
            CoefList,
            CoefLevelCode
        });
    }

    SaveWFInquiry(CostFactorID: any,
        Inquiry: any,
        NewsPaperCodeList: any,
        CheckExceptions: any,
        AdvertisingID: any,
        RatingRequired: any,
        OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveWFInquiry', {
            CostFactorID,
            Inquiry,
            NewsPaperCodeList,
            CheckExceptions,
            AdvertisingID,
            RatingRequired,
            OrginalModuleCode
        });
    }
    GetUrbanServiceServices() {
        return this.http.get(window.location.origin + '/ProductRequest/GetUrbanServiceServices', false);
    }
    GetSpecialRegionListforUrbanService() {
        return this.http.get(window.location.origin + '/ProductRequest/GetSpecialRegionListforUrbanService', null);
    }
    SaveProposalItemList(ProposalItemList: any, ProposalID: any, ModuleCode: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProposalItemList', {
            ProposalItemList,
            ProposalID,
            ModuleCode,
            OrginalModuleCode,
        });
    }
    UpdateAdvertisingDates(Advertising: any, AdvertisingInquiryList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateAdvertisingDates', {
            Advertising, AdvertisingInquiryList
        });
    }
    GetArticle31DataList(RegionGroupCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetArticle31DataList', { RegionGroupCode });
    }
    GetDealMethodListforArticle31(IsCost: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetDealMethodListforArticle31', { IsCost }, false);
    }
    SaveArticle31(Article31List: any, ModuleCode: number, RegionGroupCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveArticle31', { Article31List, ModuleCode, RegionGroupCode });
    }

    SaveSupervisorPerson(SupervisorPersonList, ModuleCode) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveSupervisorPerson', {
            SupervisorPersonList,
            ModuleCode
        });
    }
    getPRByContractId(ContractId: number) {
        return this.http.get(window.location.origin + '/ProductRequest/getPRByContractId', {
            ContractId
        });
    }

    GetEvaluationList(EstateRecognitionID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetEvaluationList', { EstateRecognitionID });
    }

    CheckRelatedContract(ObjectID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/CheckRelatedContract', { ObjectID });
    }
    CallAllMethodforMVT17(ProductRequestID: number) {
        return this.http.post(window.location.origin + '/ProductRequest/CallAllMethodforMVT17', { ProductRequestID });
    }
    UpdatePRIsConfirmOrderDraft(CostFactorID, IsConfirmOrderDraft) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdatePRIsConfirmOrderDraft', {
            CostFactorID,
            IsConfirmOrderDraft
        });
    }
    GetContractSignerList(RegionCode: number, ProductRequestDate: any, ProductRequestID: number, ContractID: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractSignerList', {
            RegionCode, ProductRequestDate,
            ProductRequestID, ContractID
        }); // RFC 50573
    }
    UpdatePRIsConfirmContractor(CostFactorID, IsConfirmContractor) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdatePRIsConfirmContractor', {
            CostFactorID,
            IsConfirmContractor
        });
    }
    FindContractorGUIDBySupplierID(RequestSupplierID) {
        return this.http.get(window.location.origin + '/ProductRequest/FindContractorGUIDBySupplierID', {
            RequestSupplierID
        });
    }
    getAllPRType() {
        return this.http.get(window.location.origin + '/ProductRequest/getAllPRType', false);
    }
    FindContractorGUIDByActorID(ActorID) {
        return this.http.get(window.location.origin + '/ProductRequest/FindContractorGUIDByActorID', {
            ActorID
        });
    }
    GetDealMethodListforPRSearch() {
        return this.http.get(window.location.origin + '/ProductRequest/GetDealMethodListforPRSearch', null, false);
    }
    GetAdjustmentPriceRangeFormulaValues(CostFactorID: number,
        OrderCommitionID: number = null,
        DeadLineDate: any = null,
        CommitionDate: any = null) {
        // tslint:disable-next-line: max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/GetAdjustmentPriceRangeFormulaValues', {
            CostFactorID,
            OrderCommitionID,
            DeadLineDate,
            CommitionDate
        });
    }
    UpdateProductRequestType106(ProductRequest: any, ProductRequestItemList: any, ModuleCode: any, ModuleViewTypeCode?: number) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateProductRequestType106', {
            ProductRequest,
            ProductRequestItemList,
            ModuleCode,
            ModuleViewTypeCode // RFC 52370
        });

    }
    UpdatePRType107(CostFactorID: number, ProductRequestItemList: any, ModuleCode: any,
        HaveWinner: boolean, IsSumEditableType107: boolean) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdatePRType107', {
            CostFactorID,
            ProductRequestItemList,
            ModuleCode,
            HaveWinner,
            IsSumEditableType107
        });
    }
    GetProductRequestItemList(ACostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestItemList', { ACostFactorID });
    }

    RemoveContractFromClarfication(AGuid: String) {
        return this.http.get(window.location.origin + '/ProductRequest/RemoveContractFromClarfication',
            {
                AGuid
            });
    }
    FindContractFromClarfication(RegionName: String,
        PersonIdentityNo: String,
        CorporateidentityNo: String,
        ContractorName: String,
        Subject: String,
        ContractDateFrom: string,
        ContractDateTo: string,
        ProductRequestNo: String,
        CurrentPriceFrom: number = null,
        CurrentPriceTo: number = null,
        CashPriceFrom: number = null,
        CashPriceTo: number = null
    ) {
        return this.http.get(window.location.origin + '/ProductRequest/FindContractFromClarfication',
            {
                RegionName,
                PersonIdentityNo,
                CorporateidentityNo,
                ContractorName,
                Subject,
                ContractDateFrom,
                ContractDateTo,
                ProductRequestNo,
                CurrentPriceFrom,
                CurrentPriceTo,
                CashPriceFrom,
                CashPriceTo
            });
    }
    GetConsultantSelectTypeList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetConsultantSelectTypeList', null);
    }
    GetConsultantSelectWayList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetConsultantSelectWayList', null);
    }
    RevokeProductRequest(CostFactorID,
        ModuleCode,
        ContractID: number = null,
        ContractSatusCode: number = null,
        WorkFlowInstanceId: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/RevokeProductRequest', {
            CostFactorID,
            ModuleCode,
            ContractID,
            ContractSatusCode,
            WorkFlowInstanceId
        });
    }

    GetInvVoucherGroupList(RegionCode: number, CostProductID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetInvVoucherGroupList',
            {
                RegionCode,
                CostProductID
            }, null);
    }
    SaveProdReqIsOnline(CostFactorID: number, ProductRequestIsOnline: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/SaveProdReqIsOnline', { CostFactorID, ProductRequestIsOnline });
    }
    SaveCommitionSubject(CostFactorID, ProductRequestItemID: any) { // RFC 52131
        return this.http.post(window.location.origin + '/ProductRequest/SaveCommitionSubject', {
            CostFactorID,
            ProductRequestItemID
        });
    }
    DeleteWorkFlowInstance(WorkFlowInstanceId: any, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteWorkFlowInstance', { WorkFlowInstanceId, ModuleCode });
    }
    GetContractPeriodTotaly(
        RegionCode: number,
        FromProductRequestDate,
        ToProductRequestDate,
        FromContractDate,
        ToContractDate,
        Times: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractPeriodTotaly',
            {
                RegionCode,
                FromProductRequestDate,
                ToProductRequestDate,
                FromContractDate,
                ToContractDate,
                Times
            });
    }

    GetContractPeriodDetail(
        RegionCode: number,
        FromProductRequestDate,
        ToProductRequestDate,
        FromContractDate,
        ToContractDate,
        Times: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractPeriodDetail',
            {
                RegionCode,
                FromProductRequestDate,
                ToProductRequestDate,
                FromContractDate,
                ToContractDate,
                Times,
            });
    }
    IsValidProposalByInquiryID(InquiryID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/IsValidProposalByInquiryID',
            {
                InquiryID
            });
    }

    InsertSupplierIntoPropsal(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/InsertSupplierIntoPropsal',
            {
                CostFactorID
            });
    }
    InsertSupplierIntoPropsal222(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/InsertSupplierIntoPropsal222',
            {
                CostFactorID
            }, true);
    }

    GetProductRequestIsInContractPaging(pageNumber: any,
        pageSize: any,
        SearchTerm: any,
        SearchOption: any,
        RegionCode: number = null,
        ProductRequestID: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestIsInContractPaging', {
            pageNumber,
            pageSize,
            SearchTerm,
            SearchOption,
            RegionCode,
            ProductRequestID
        });

    }

    GetProdRequestItemListWithReqItemEntityByPRID(ProductRequestID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProdRequestItemListWithReqItemEntityByPRID',
            { ProductRequestID });
    }

    GetEntityTypeList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetEntityTypeList', null);
    }


    SaveEntityTypeList(EntityTypeListt: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveEntityTypeList', {
            EntityTypeListt
        });
    }
    GetProductRequestProvisionList(CostFactorID: number, IsSetproperty: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestProvisionList',
            { CostFactorID, IsSetproperty });
    }

    GetRequestEvaluateList(CostFactorID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestEvaluateList', { CostFactorID });
    }

    GetScaleList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetScaleList', null);
    }

    GetEstatePropertyTypeList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetEstatePropertyTypeList', null);
    }
    GetPropertyValue() {
        return this.http.get(window.location.origin + '/ProductRequest/GetPropertyValue', null);
    }
    GetProductRequestEntityByRegionList(RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestEntityByRegionList',
            { RegionCode });
    }
    GetEntityByProductIDAndRegionCode(
        RegionCode: number,
        ProductID: number,
        ProductTypeCode: number,
        ProductName: string) {
        return this.http.get(window.location.origin + '/ProductRequest/GetEntityByProductIDAndRegionCode',
            {
                RegionCode,
                ProductID,
                ProductTypeCode,
                ProductName
            });
    }
    SavePREntityList(ProductRequestEntityList: any, RegionCode: number, PEntityItemList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SavePREntityList',
            { ProductRequestEntityList, RegionCode, PEntityItemList });
    }
    GetAllEntityTypeItem(EntityTypeID, ProductID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllEntityTypeItem', {
            EntityTypeID, ProductID
        });
    }
    GetEvaluateTypeList(IsCost: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetEvaluateTypeList', { IsCost });
    }

    GetEvaluateMethodList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetEvaluateMethodList', null);
    }

    GetRequestEvaluate(RequestEvaluateID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestEvaluate', { RequestEvaluateID });
    }

    SaveRequestEvaluate(RequestEvaluate: any, ProductRequestEstateList: any, AModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveRequestEvaluate', {
            RequestEvaluate,
            ProductRequestEstateList,
            AModuleCode
        });
    }
    GetAllEstatePropertyType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllEstatePropertyType', null);
    }
    SaveEstatePropertyType(AEstatePropertyTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveEstatePropertyType', {
            AEstatePropertyTypeList: AEstatePropertyTypeList
        });
    }
    GetAllEvaluateType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllEvaluateType', null);
    }
    SaveEvaluateType(AEvaluateTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveEvaluateType', {
            AEvaluateTypeList: AEvaluateTypeList
        });
    }
    GetAllEvaluateMethod() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllEvaluateMethod', null);
    }
    SaveEvaluateMethod(AEvaluateMethodList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveEvaluateMethod', {
            AEvaluateMethodList: AEvaluateMethodList
        });
    }

    GetVWLandBuildingAsset(ARegionCode: number, PageNumber, PageSize, SearchTerm, SearchOption, IsLoading) {
        return this.http.get(window.location.origin + '/ProductRequest/GetVWLandBuildingAsset', {
            ARegionCode,
            PageNumber,
            PageSize,
            SearchTerm,
            SearchOption
        }, IsLoading);
    }

    GetProductRequestEntityList(ContractID, ProductID, ProductRequestItemID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestEntityList'
            , { ContractID, ProductID, ProductRequestItemID });
    }

    GetEntityTypeItemList(EntityTypeID, ProductID, ContractID = null, ProductRequestItemID = null, SetProperty: boolean = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetEntityTypeItemList'
            , { EntityTypeID, ProductID, ContractID, ProductRequestItemID, SetProperty });
    }

    GetSaveExceptions(type: any, ModuleCode: any, ProductRequest: any,
        ProductRequestList: any, ContractOrder?: any, RequestSupplierList?: any, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/GetSaveExceptions', {
            type,
            ModuleCode,
            ProductRequest,
            ProductRequestList,
            ContractOrder,
            RequestSupplierList,
            OrginalModuleCode
        });
    }
    GetSaveCommitionMemberExceptions(InquiryID: any, ProposalList: any,
        GradeID?: number, PRCostFactorID?: number, ModuleViewTypeCode = null, PriceListTopicID: number = null) {
        return this.http.post(window.location.origin + '/ProductRequest/GetSaveCommitionMemberExceptions', {
            InquiryID,
            ProposalList,
            GradeID,
            PRCostFactorID,
            ModuleViewTypeCode,
            PriceListTopicID,
        });
    }
    GetSaveAdvertisingInquiryExceptions(CostFactorID: any) {
        return this.http.post(window.location.origin + '/ProductRequest/GetSaveAdvertisingInquiryExceptions',
            { CostFactorID });
    }
    GetAssetIncomeByRegionCode(RegionCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetIncomeByRegionCode'
            , { RegionCode });
    }
    GetAssetIncomeType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetIncomeType'
            , null);
    }
    SaveAssetIncome(AssetIncomeObject: any, ModuleCode: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveAssetIncome', {
            AssetIncomeObject,
            ModuleCode
        });
    }
    GetAssetIncomeListByRegionCode(RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetIncomeListByRegionCode'
            , { RegionCode });
    }
    GetAssetIncome(AssetIncomeID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetIncome'
            , { AssetIncomeID });
    }
    DeleteAssetIncome(AssetIncomeID: any, ModuleCode: any) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteAssetIncome', { AssetIncomeID, ModuleCode });
    }
    GetAllEntityType() {
        return this.http.post(window.location.origin + '/ProductRequest/GetAllEntityType', {
        });
    }
    SaveProductRequestEntity(ProductRequestEntityList: any, ProductRequestID: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductRequestEntity', {
            ProductRequestEntityList,
            ProductRequestID
        });
    }

    SaveRenewalIsReturnHaveWinner(CostFactorID: number,
        IsRenewal: boolean,
        InquiryID: number,
        IsReturn: boolean,
        HaveWinner: boolean,
        ModuleCode: any,
        OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveRenewalIsReturnHaveWinner', {
            CostFactorID,
            IsRenewal,
            InquiryID,
            IsReturn,
            HaveWinner,
            ModuleCode,
            OrginalModuleCode,
        });
    }
    GetRegionCodeByPRTypeCode(ProductRequestTypeCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRegionCodeByPRTypeCode', { ProductRequestTypeCode });
    }
    GetAllVariableType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllVariableType', null);
    }
    SaveVariableType(AVariableTypeList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveVariableType', {
            AVariableTypeList: AVariableTypeList
        });
    }
    GetAllCommitionProceedVariable() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllCommitionProceedVariable', null);
    }
    SaveCommitionProceedVariable(ACommitionProceedVariableList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveCommitionProceedVariable', {
            ACommitionProceedVariableList: ACommitionProceedVariableList
        });
    }
    DeleteRequestEvaluate(RequestEvaluateID: number, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteRequestEvaluate', { RequestEvaluateID, ModuleCode });
    }

    GetIsVolumetricProductList(SearchOption: number,
        ARegionCode: number,
        SearchTerm: string,
        PageNumber: number,
        PageSize: number,
        ProductTypeCode: any,
        IsCost: boolean,
        Date,
        ProductId,
        ContractID: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetIsVolumetricProductsList', {
            SearchOption,
            ARegionCode,
            SearchTerm,
            PageNumber,
            PageSize,
            ProductTypeCode,
            IsCost,
            Date,
            ContractID,
            ProductId
        },
            false);
    }
    GetContractCommitionMemberList(ContractId: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/GetContractCommitionMemberList',
            {
                ContractId
            });
    }
    SaveCompletionContractInfo(
        CostFactorID: number, ModuleCode: any,
        ProductRequest: any, Contract: any, ContractSignList: any,
        InquiryID: any, ReviewMethodCode: any,
        FromContractDate: any, ToContractDate: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveCompletionContractInfo', {
            CostFactorID,
            ModuleCode,
            ProductRequest,
            Contract,
            ContractSignList,
            InquiryID,
            ReviewMethodCode,
            FromContractDate,
            ToContractDate
        });
    }
    GetContractForProductRequest(RelatedContractID?: any, ProvisionContractID?: any, CostFactorID?: any) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/GetContractForProductRequest',
            {
                RelatedContractID, ProvisionContractID, CostFactorID
            });
    }
    CheckFinalControl(CostFactorID: number, WorkflowObjectCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/CheckFinalControl',
            {
                CostFactorID,
                WorkflowObjectCode
            });
    }
    HasProductRequestThreeInquiries(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/HasProductRequestThreeInquiries',
            {
                CostFactorID
            });
    }
    GetOrderCompletion(CostFactorID: number, CreatAutomaticCommition: boolean = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetOrderCompletion', { CostFactorID, CreatAutomaticCommition });
    }
    GetReviewMethodBasedOnDealMethod(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetReviewMethodBasedOnDealMethod', { CostFactorID });
    }

    SvaeEquipment(Goods, ArticlePatterGoodsList, ScaleCode, PriceListTopicID) {
        return this.http.post(window.location.origin + '/ProductRequest/SvaeEquipment',
            {
                Goods,
                ArticlePatterGoodsList,
                ScaleCode,
                PriceListTopicID
            });
    }

    GetMaxGoodsCode() {
        return this.http.get(window.location.origin + '/ProductRequest/GetMaxGoodsCode', null);
    }
    UpdateIsStarOver30(CostFactorID: number, IsStarOver30: boolean, ModuleCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/UpdateIsStarOver30', { CostFactorID, IsStarOver30, ModuleCode });
    }
    GetContractWorkFlowAverageWaiting(
        RegionCode: number,
        FromContractDate,
        ToContractDate,
        FromProductRequestDate,
        ToProductRequestDate,
        NoTimesCode) {
        return this.http.get(window.location.origin + '/Contract/GetContractWorkFlowAverageWaiting',
            {
                RegionCode,
                FromContractDate,
                ToContractDate,
                FromProductRequestDate,
                ToProductRequestDate,
                NoTimesCode
            });
    }
    GetAllFinYear() {
        return this.http.get(window.location.origin + '/ProductRequest/GetAllFinYear', false);
    }

    GetDistrictDirectionList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetDistrictDirectionList', null);
    }
    GetIndexPriceList(FinYearCode: String) {
        return this.http.get(window.location.origin + '/ProductRequest/GetIndexPriceList', { FinYearCode });
    }
    UpdateProductRequestWorkPlace(ProductRequestList) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateProductRequestWorkPlace', { ProductRequestList });
    }
    GetDealMwthodByID(DealMethodCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetDealMwthodByID', { DealMethodCode });
    }
    GetSubCostCenterAdministratorActorlist(ACostCenterID, ASubCostCenterID, AdministratorActorID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetSubCostCenterAdministratorActorlist',
            {
                ACostCenterID,
                ASubCostCenterID,
                AdministratorActorID,
            });
    }
    GetRegionAreaList(RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRegionAreaList', { RegionCode });
    }

    GetRegionAreaDistrictList(RegionAreaID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRegionAreaDistrictList', { RegionAreaID });
    }
    GetCurrentYear() {
        return this.http.get(window.location.origin + '/ProductRequest/GetCurrentYear', null);
    }
    GetAdjustmentPriceRangeFormula(CostFactorID: number, OrderCommitionID: number) {
        // tslint:disable-next-line: max-line-length
        return this.http.get(window.location.origin + '/ProductRequest/GetAdjustmentPriceRangeFormula', { CostFactorID, OrderCommitionID });
    }
    GetRequestedPerson(RegionCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestedPerson',
            {
                RegionCode
            });
    }
    GetInvVoucherGroupByID(InvVoucherGroupID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetInvVoucherGroupByID', {
            InvVoucherGroupID
        }, false);
    }
    GetCostCenterByRegionAndRequestOwner(
        ARegionCode: number,
        CurrentCostCenterID,
        ModuleCode = null,
        HaveLoading: boolean
    ) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCostCenterByRegionAndRequestOwner',
            { ARegionCode, CurrentCostCenterID, ModuleCode }, HaveLoading);
    }
    GetListByCostCenterId(
        ACostCenterID: number,
        ModuleCode = null,
        IsLoading: boolean,
        RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetListByCostCenterId', {
            ACostCenterID,
            ModuleCode,
            RegionCode
        }, IsLoading);
    }
    CheckRequestOwner(RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/CheckRequestOwner', {
            RegionCode
        }, false);
    }
    CheckRegionRequestByCurrentUser() {
        return this.http.get(window.location.origin + '/ProductRequest/CheckRegionRequestByCurrentUser', false);
    }
    GetOnfilterRegionByRegionCode(RegionCode: number = null, INVVoucherGroupCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetOnfilterRegionByRegionCode', {
            RegionCode,
            INVVoucherGroupCode
        }, null);
    }
    GetContractID(ProductRequestID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetContractID', { ProductRequestID });
    }
    GetCommitionMemberListByRegionCode(Searchterm: string, SearchOption: string, RegionCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCommitionMemberListByRegionCode', {
            Searchterm,
            SearchOption,
            RegionCode
        });
    }

    GetCommitionAgentPerson(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCommitionAgentPerson', { CostFactorID });
    }
    GetWfActionTList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetWfActionTList', null);
    }
    SaveAgentProductRequestPerson(AProductRequestPerson, ModuleCode, OrginalModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveAgentProductRequestPerson', {
            AProductRequestPerson,
            ModuleCode,
            OrginalModuleCode
        });
    }

    GetScale() {
        return this.http.get(window.location.origin + '/ProductRequest/GetScale', null);
    }
    SaveScale(AScaleServiceList: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveScale', { AScaleServiceList });
    }
    GetBaseAssetGroup(SearchOption: number,
        Searchterm: string,
        PageNumber: number,
        PageSize: number,
        BaseAssetGroupId) {
        return this.http.get(window.location.origin + '/ProductRequest/GetBaseAssetGroup', {
            SearchOption,
            Searchterm,
            PageNumber,
            PageSize,
            BaseAssetGroupId
        },
            false);
    }

    GetBaseAssetsGroup(SearchOption: number,
        Searchterm: string,
        PageNumber: number,
        PageSize: number,
        BaseAssetGroupID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetBaseAssetGroup', {
            SearchOption,
            Searchterm,
            PageNumber,
            PageSize,
            BaseAssetGroupID
        },
            false);
    }
    GetDealTypeList() {
        return this.http.get(window.location.origin + '/ProductRequest/GetDealTypeList', null);
    }

    GetAssetGroupsByBase(BaseAssetGroupID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetGroupsByBase', { BaseAssetGroupID });
    }

    GetArticlePatternParentList(RegionGroupCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetArticlePatternParentList', { RegionGroupCode });
    }

    GetArticlePatterntList(ArticlePatternID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetArticlePatterntList', { ArticlePatternID });
    }

    GetRelArticlePattern(SearchOption: number,
        Searchterm: string,
        PageNumber: number,
        PageSize: number,
        RegionGroupCode) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRelArticlePattern', {
            SearchOption,
            Searchterm,
            PageNumber,
            PageSize,
            RegionGroupCode
        },
            false);
    }

    SaveProductPatternProduct(ProductID, ProductPatternID, ModuleCode) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductPatternProduct',
            {
                ProductID,
                ProductPatternID,
                ModuleCode
            });
    }

    GetProduct(ProductCode, ProductTypeCode, ProductPatternID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProduct', { ProductCode, ProductTypeCode, ProductPatternID });
    }

    getProductRequestByContractId(ContractId: any) {
        return this.http.get(window.location.origin + '/ProductRequest/getProductRequestByContractId', {
            ContractId
        });
    }

    GetApplicantOutCost(ARegionCode, RoleID, FromCostCenterCode,
        ToCostCenterCode, FromSubCostCenterCode,
        ToSubCostCenterCode, IsChecked) {
        return this.http.get(window.location.origin + '/ProductRequest/GetApplicantOutCost', {
            ARegionCode, RoleID, FromCostCenterCode,
            ToCostCenterCode, FromSubCostCenterCode,
            ToSubCostCenterCode, IsChecked
        });
    }
    SaveProductReceiveDoc(PRReceiveDocList: any, IsCost, CostFactorID: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveProductReceiveDoc',
            {
                PRReceiveDocList,
                IsCost,
                CostFactorID
            });
    }
    GetPRReceiveDocList(CostFactorID, OrderCommitionID = null, ModuleVIewTypeCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetPRReceiveDocList', {
            CostFactorID,
            OrderCommitionID,
            ModuleVIewTypeCode
        });
    }
    GetPRReceiveDoc(ReceiveDocID: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetPRReceiveDoc', { ReceiveDocID });
    }
    GetPRReceiveDocType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetPRReceiveDocType', null);
    }
    DeletePRReceiveDoc(ReceiveDocID: any) {
        return this.http.post(window.location.origin + '/ProductRequest/DeletePRReceiveDoc', {
            ReceiveDocID
        });
    }
    GetAccNoList(BranchID: any, RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAccNoList', { BranchID, RegionCode });
    }
    GetMaxReferenceNo(CostFactorID: any, IsCost: boolean) {
        return this.http.get(window.location.origin + '/ProductRequest/GetMaxReferenceNo', { CostFactorID, IsCost });
    }
    GetRelatedAsset(AssetID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRelatedAsset', { AssetID });
    }
    GetExeUnitPersonByAsset(AssetID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetExeUnitPersonByAsset', { AssetID });
    }
    GetContractWarrantyList(CostFactorID, IsCost) {
        return this.http.get(window.location.origin + '/Contract/GetContractWarrantyList', {
            CostFactorID,
            IsCost
        });
    }
    CheckPDFSignersInfo(OrderCommitionID = null, ModuleVIewTypeCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/CheckPDFSignersInfo', {
            OrderCommitionID,
            ModuleVIewTypeCode
        });
    }
    GetAssetList(AssetTag: string = null, AssetCode: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetList', { AssetTag, AssetCode });
    }
    GetProductPattern() {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductPattern', null, false);
    }
    GetProductPatternName(ProductPatternProductsID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductPatternName', {
            ProductPatternProductsID
        });
    }
    GetMaxCustomerOrderCode(RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetMaxCustomerOrderCode', { RegionCode });
    }
    GetRequestInvestUsageType(CostFactorID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestInvestUsageType', { CostFactorID });
    }
    GetArticlePattern(ProductID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetArticlePattern', { ProductID });
    }
    GetAssetHistoryDataGrid(AssetID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetHistoryDataGrid', { AssetID });
    }
    GetInvVoucherCode(ARegionCode, AssetID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetInvVoucherCode', { ARegionCode, AssetID });
    }

    GetDepreciationRate(AssetID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetDepreciationRate', { AssetID });
    }

    GetSupportNo(AssetID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetSupportNo', { AssetID });
    }
    GetActLocation() {
        return this.http.get(window.location.origin + '/ProductRequest/GetActLocation', null);
    }
    GetArticlePatternByProduct(ProductID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetArticlePatternByProduct', { ProductID });
    }

    GetDisApprArt18Note(OrderCommitionID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetDisApprArt18Note', { OrderCommitionID });
    }

    InsertDisApprNote(OrderCommitionID: number, DisApprovalArticle18Note: string) {
        return this.http.post(window.location.origin + '/ProductRequest/InsertDisApprNote', { OrderCommitionID, DisApprovalArticle18Note });
    }

    SaveCrmProductRequest(
        ModuleCode,
        ProductRequest,
        ProductRequestList,
        OrginalModuleCode
    ) {

        return this.http.post(window.location.origin + '/ProductRequest/SaveCrmProductRequest', {
            ModuleCode,
            ProductRequest,
            ProductRequestList,
            OrginalModuleCode
        });
    }


    ResearcherDisconnect(CostFactorID: number, ResearcherID: number, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/ResearcherDisconnect', { CostFactorID, ResearcherID, ModuleCode });
    }
    UpdateProductRequestInfo(ProductRequest: any, OrginalModuleCode: any, ModuleCode?: any) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateProductRequestInfo', {
            ProductRequest,
            OrginalModuleCode,
            ModuleCode
        });
    }

    SaveRelatedProductRequests(RelatedProductRequests, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveRelatedProductRequests',
            {
                RelatedProductRequests,
                ModuleCode
            });
    }

    DeleteFromRelatedGroup(RelatedProductRequests, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteFromRelatedGroup', {
            RelatedProductRequests,
            ModuleCode
        });
    }

    GetConfirmCustomerOrder(CostFactorList) {
        return this.http.post(window.location.origin + '/ProductRequest/GetConfirmCustomerOrder', { CostFactorList });
    }

    GetProductPatternByID(ProductPatternID) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductPatternByID', {
            ProductPatternID
        });
    }
    ReturnFromCancelProductRequest(CostFactorID,
        ModuleCode,
        ContractID: number = null,
        ContractSatusCode: number = null,
        WorkFlowInstanceId: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/ReturnFromCancelProductRequest', {
            CostFactorID,
            ModuleCode,
            ContractID,
            ContractSatusCode,
            WorkFlowInstanceId
        });
    }
    GetSaleType() {
        return this.http.get(window.location.origin + '/ProductRequest/GetSaleType', false);
    }

    GetCRMProductRequest(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCRMProductRequest', { CostFactorID });
    }

    SaveToCurrentGroupRequests(RelatedProductRequests, GroupNumber, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveToCurrentGroupRequests',
            {
                RelatedProductRequests,
                GroupNumber,
                ModuleCode
            });
    }

    GetCRMProductRequestPaging(pageNumber: any, pageSize: any, SearchTerm: any, SearchOption: any, RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetCRMProductRequestPaging', {
            pageNumber,
            pageSize,
            SearchTerm,
            SearchOption,
            RegionCode
        });

    }
    GetRequestDurationRep(
        RegionCode: number,
        ProductRequestNo: String = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetRequestDurationRep',
            {
                RegionCode,
                ProductRequestNo
            });
    }

    UpdateTenderDoc(CostFactorID, IsUpdateTenderDoc) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateTenderDoc', {
            CostFactorID,
            IsUpdateTenderDoc
        });
    }

    RequestCommitionMemberReport(
        Resioncode,
        FromCostFactorID,
        ToCostFactorID,
        CostCenterId,
        SubCostCenterId,
        FromCommitionDate,
        ToCommitionDate,
        CommitionMemberIDs) {
        return this.http.get(window.location.origin + '/ProductRequest/RequestCommitionMemberReport',
            {
                Resioncode,
                FromCostFactorID,
                ToCostFactorID,
                CostCenterId,
                SubCostCenterId,
                FromCommitionDate,
                ToCommitionDate,
                CommitionMemberIDs
            });
    }

    UpdateIsSaleType(CostFactorID, IsSaleType) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateIsSaleType', {
            CostFactorID,
            IsSaleType
        });
    }

    GetAssetID(AssetID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/GetAssetID', { AssetID });
    }

    SaveIncomeContract(AProductReq: any, AContract: any, ModuleCode: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveIncomeContract', {
            AProductReq,
            AContract,
            ModuleCode
        });
    }

    UpdateBgtRequest(CostFactorID: number, BgtRequest: boolean, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/UpdateBgtRequest', { CostFactorID, BgtRequest, ModuleCode });
    }

    SaveInvestProductRequest(AProductReq: any, ProductRequestList, ModuleCode: any) {
        return this.http.post(window.location.origin + '/ProductRequest/SaveInvestProductRequest', {
            AProductReq, ProductRequestList, ModuleCode
        });
    }

    InsertSupplierIntoPropsalExtension(CostFactorID: number) {
        return this.http.get(window.location.origin + '/ProductRequest/InsertSupplierIntoPropsalExtension',
            { CostFactorID }, true);
    }
    DeleteIncomeContract(CostFactorID: any, ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteIncomeContract', { CostFactorID, ModuleCode });
    }

    GetProductRequestInvestPaging(pageNumber: any, pageSize: any, SearchTerm: any, SearchOption: any, RegionCode: any) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestInvestPaging', {
            pageNumber,
            pageSize,
            SearchTerm,
            SearchOption,
            RegionCode
        });

    }

    GetProductRequestInvestList(
        ARegionCode: number, FromRequest: number = null, ToRequest: number = null) {
        return this.http.get(window.location.origin + '/ProductRequest/GetProductRequestInvestList',
            {
                ARegionCode,
                FromRequest,
                ToRequest,
            });
    }

    CallAllMethod(
        CostFactorID: number, IsOrderCommition: boolean,
        Ckeckexceptions: boolean, OrginalModuleCode: string,
        IsCompleteContractInfoForSendClarification, SetWinner,
        ModuleCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/CallAllMethod',
            {
                CostFactorID,
                IsOrderCommition,
                Ckeckexceptions,
                OrginalModuleCode,
                IsCompleteContractInfoForSendClarification,
                SetWinner,
                ModuleCode,

            });
    }
}
