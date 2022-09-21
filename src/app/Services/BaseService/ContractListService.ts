import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class ContractListService {
  constructor(private http: BaseHttpClient) { }

  GetContractList(
    ARegionCode: number, AModuleCode: number, HaveEstimate = false, HavePayEstimate = false,
    HavePay = false, IsCost = true, FromFinYearCode: number = null, ToFinYearCode: number = null,
    Subject = '', ContractLetterNoFrom: any = '', ContractLetterNoTo: any = '',
    FromContractDate = null, ToContractDate = null, ActorID: number = null) {
    return this.http.get(window.location.origin + '/Home/GetContractList',
      {
        ARegionCode,
        AModuleCode,
        HaveEstimate,
        HavePayEstimate,
        HavePay,
        IsCost,
        FromFinYearCode,
        ToFinYearCode,
        Subject,
        ContractLetterNoFrom,
        ContractLetterNoTo,
        FromContractDate,
        ToContractDate,
        ActorID,
      });
  }
  GetContractListPaging(pageNumber,
    pageSize,
    SortModelList,
    FilterModelList,
    ARegionCode,
    AModuleCode, HaveEstimate = false,
    HavePayEstimate = false,
    HavePay = false) {
    console.log(SortModelList);

    return this.http.post(window.location.origin + '/Home/GetContractListPaging',
      {
        pageNumber,
        pageSize,
        SortModelList,
        FilterModelList,
        ARegionCode,
        AModuleCode,
        HaveEstimate,
        HavePayEstimate,
        HavePay
      });
  }
  GetContractDataByID(AContractID: number) {
    return this.http.get(window.location.origin + '/Home/GetContractDataByID', { AContractID });
  }

  GetContractOrderItemList(ContractOrderID: number) {
    return this.http.get(window.location.origin + '/Home/GetContractOrderItemList', { ContractOrderID });
  }

  GetContractOrderItemListVW(AContractOrderID: number, ActorControl: boolean) {
    return this.http.get(window.location.origin + '/Home/GetContractOrderItemListVW', { AContractOrderID, ActorControl });
  }

  GetContractOrderList(AContractID: number) {
    return this.http.get(window.location.origin + '/Home/GetContractOrderList', { AContractID });
  }
  GetBalanceFactors(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetBalanceFactors', { ContractID });
  }
  GetContractPersonList(AContractID: number, HaveLoading: boolean) {
    return this.http.get(window.location.origin + '/Home/GetContractPersonList', { AContractID }, HaveLoading);
  }
  GetContractOrderItemProductList(AContractID: number, AOrderNo: number) {
    return this.http.get(window.location.origin + '/Home/GetContractOrderItemProductList', { AContractID, AOrderNo });
  }

  GetContractOrderItemProductListByType(AContractID: number, AContractTypeCode: number, AOrderNo: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(window.location.origin + '/Home/GetContractOrderItemProductListByType', { AContractID, AContractTypeCode, AOrderNo });
  }

  GetRolesList(IsLoading = true, ModuleCode = null) {
    return this.http.get(window.location.origin + '/Home/GetRolesList', { ModuleCode }, IsLoading);
  }

  SaveContractPerson(ContractID: number,
    CostListFinYearCode: number,
    PriceListTypeCode: number,
    SeasonCode: number,
    IsVolumetric: any,
    IsCumulative: any,
    AContractPeronList: any,
    ReigonCode: number,
    ARelatedProductList: any,
    ProductRequestID,
    ModuleCode: any,
    NotControllingPayDatePeriod: any,
    IsMultiInvoice: any,
    IsEstimate: any,
    HasExpiredSupervision: any) {
    return this.http.post(window.location.origin + '/Home/SaveContractPerson', {
      ContractID,
      CostListFinYearCode,
      PriceListTypeCode,
      SeasonCode,
      IsVolumetric,
      IsCumulative,
      AContractPeronList,
      ReigonCode,
      ARelatedProductList,
      ProductRequestID,
      ModuleCode,
      NotControllingPayDatePeriod,
      IsMultiInvoice,
      IsEstimate,
      HasExpiredSupervision
    });
  }

  GetContractOrderEstimateList(AContractOrderItemID: number) {
    return this.http.get(window.location.origin + '/Home/GetContractOrderEstimateList', { AContractOrderItemID });
  }

  GetContract(AContractID: number = null, AContractOrderID: number = null) {
    return this.http.get(window.location.origin + '/Home/GetContract', { AContractID, AContractOrderID });
  }
  GetContractCoef(ContractID: number, ContractorderItemID: number, levelCode: number) {
    return this.http.get(window.location.origin + '/Home/GetContractCoef', { ContractID, ContractorderItemID, levelCode });
  }

  GetContractCoefTypeList(ModuleCode = null) {
    return this.http.get(window.location.origin + '/Home/GetContractCoefTypeList', { ModuleCode }, false);
  }

  GetContractCoefList(ContractID: number, ContractOrderItemID = null) {
    return this.http.get(window.location.origin + '/Home/GetContractCoefList', { ContractID, ContractOrderItemID });
  }

  SaveContractCoefList(ContractID: number, ContractCoefList: any, ContractOrderItemID = null) {
    return this.http.post(window.location.origin + '/Home/SaveContractCoefList', {
      ContractID,
      ContractCoefList,
      ContractOrderItemID
    });
  }
  SetContractPriceListPattern(ContractID: number,
    PriceListTopicCode: string,
    PriceListTypeCode: string) {
    return this.http.post(window.location.origin + '/Contract/SetContractPriceListPattern', {
      ContractID,
      PriceListTopicCode,
      PriceListTypeCode
    });
  }
  SaveContractOrderItemCoefList(ContractID: number,
    ContractOrderItemID: any,
    CoefList: any,
    CoefLevelCode: number) {
    return this.http.post(window.location.origin + '/Home/SaveContractOrderItemCoefList', {
      ContractID,
      ContractOrderItemID,
      CoefList,
      CoefLevelCode
    });
  }

  SaveContractOrderItemList(AContractOrderID: any, AContractOrderItemList: any) {
    return this.http.post(window.location.origin + '/Home/SaveContractOrderItemList', {
      AContractOrderID,
      AContractOrderItemList
    });
  }
  GetContractOrderProduct(ContractID: number, IsLoading = true) {
    return this.http.get(window.location.origin + '/Contract/GetContractOrderProduct', { ContractID }, IsLoading);
  }
  GetContractOrderDeduction(AContractOrderItemID: number) {
    return this.http.get(window.location.origin + '/Contract/GetContractOrderDeduction', { AContractOrderItemID });
  }
  //  CheckWritableRegionCode(ReigonCode: number) {
  //   return this.http.get(window.location.origin + '/Contract/CheckWritableRegionCode', {ReigonCode});
  // }

  GetContractTypeList(IsLoading = true) {
    return this.http.get(window.location.origin + '/Contract/GetContractTypeList', null, IsLoading);
  }
  GetContractTypeListByIsCost(IsCost: any) {
    return this.http.get(window.location.origin + '/Contract/GetContractTypeListByIsCost', { IsCost }, null);
  }
  GetContractRelationTypeList() {
    return this.http.get(window.location.origin + '/Contract/GetContractRelationTypeList', null, false);
  }
  GetRelatedContractList(ARegionCode: number) {
    return this.http.get(window.location.origin + '/Contract/GetRelatedContractList', { ARegionCode }, false);
  }

  GetRelatedContract(ARegionCode: number) {
    return this.http.get(window.location.origin + '/Contract/GetRelatedContract', { ARegionCode }, false);
  }
  GetContractStatusList() {
    return this.http.get(window.location.origin + '/Contract/GetContractStatusList', null);
  }

  SaveContract(Acontract: any, ContractSignList: any, ContractCommitionMemberList: any, ReceiveDocList: any) {
    return this.http.post(window.location.origin + '/Contract/SaveContract', {
      Acontract,
      ContractSignList,
      ContractCommitionMemberList,
      ReceiveDocList
    });
  }
  // tslint:disable-next-line: max-line-length
  FullSaveCostContractWithOrder(
    Acontract: any,
    ContractSignList: any,
    CheckExceptions: any,
    ProductRequestCostID: number,
    OrderLetterCode,
    OrderDate,
    OrginalModuleCode?: any,
    ModuleCode?: number,
    ModuleViewTypeCode?: number) {
    return this.http.post(window.location.origin + '/Contract/FullSaveCostContractWithOrder', {
      Acontract,
      ContractSignList,
      CheckExceptions,
      ProductRequestCostID,
      OrderLetterCode,
      OrderDate,
      OrginalModuleCode,
      ModuleCode,
      ModuleViewTypeCode
    });
  }
  GetWarrantyReceiveDocType() {
    return this.http.get(window.location.origin + '/Contract/GetWarrantyReceiveDocType', null, false);
  }

  GetContractPaging(PageNumber, PageSize, SearchTerm, SearchOption, FinYear, RegionCode, IsCost: boolean = null, ToFinYear: number = null) {
    return this.http.get(window.location.origin + '/Contract/GetContractPaging',
      { PageNumber, PageSize, SearchTerm, SearchOption, FinYear, RegionCode, IsCost, ToFinYear });
  }
  GetContractTypeListByType(IsCost: number, ModuleCode, RegionCode) {
    return this.http.get(window.location.origin + '/Contract/GetContractTypeListByType', { IsCost, ModuleCode, RegionCode });
  }
  GetContract4personRepPaging(PageNumber, PageSize, SearchTerm, SearchOption, ReigonCode) {
    return this.http.get(window.location.origin + '/Contract/GetContract4personRepPaging', {
      PageNumber,
      PageSize,
      SearchTerm,
      SearchOption,
      ReigonCode
    });
  }
  GetRelatedContractpaging(PageNumber, PageSize, SearchTerm, SearchOption, RegionCode, AFinYearCode, AContractID) {
    return this.http.get(window.location.origin + '/Contract/GetRelatedContractpaging',
      { PageNumber, PageSize, SearchTerm, SearchOption, RegionCode, AFinYearCode, AContractID });
  }
  GetRelatedContractpagingForExtended(PageNumber, PageSize, SearchTerm, SearchOption, RegionCode, IsCost, IsConcluded, AContractID,
    IsProvision = null) {
    return this.http.get(window.location.origin + '/Contract/GetRelatedContractpagingForExtended',
      { PageNumber, PageSize, SearchTerm, SearchOption, RegionCode, IsCost, IsConcluded, AContractID, IsProvision });
  }
  ContractRequestSearch(RegionCode,
    UnitPatternID,
    IsCost,
    IsIncome,
    WorkFlowTypeCode,
    FromProductRequestNo,
    ToProductRequestNo,
    FromLetterNo,
    ToLetterNo,
    IsNew,
    IsExtended,
    FromProductRequestDate,
    ToProductRequestDate,
    FromLetterDate,
    ToLetterDate,
    RequestTypesItem,
    StackHolderIDs,
    SubStackHolderIDs,
    CostCenterIDs,
    SubCostCenterIDs,
    Subject,
    ModuleCode,
    ResearcherID = null,
    ContractorId,
    ContractStatusCodes = null,
    FinYearCodes = null,
    AmountTypeCode = null,
    StartDateTypeCode = null,
    ProvisionTypeCode = null,
    ProvisionCenteralCode = null,
    RequestTypeCode = null,
    CommitionTypeCode = null,
    UnderTakeTypeCode = null,
    ContractorTypeCode = null,
    ObserverActorID = null,
    CostContractID = 0,
    ContractCode = null,
    HasOpenWF = null,
    HasCloseWF = null,
    RoleID = null,
    RefRequestID = null,
    PersonReqID = null,
    ReqPay = null,
    WinnerID = null,
    ContractTypeID = null,
    FromConclusionContractDate = null,
    ToConclusionContractDate = null,
    DealMethodCode = null,
    WorkFlowNodeCodes = null,
    RequestedPerson = null,
    HaveMutualContract = null,
    MutualContractStatus = null,
    SupplierId?,
    ContractID = null,
    CostFactorID = null,
    FromStartContractDate = null,
    ToStartContractDate = null,
    FromEndContractDate = null,
    ToEndContractDate = null,
    UnderTakeTypeValue = null,
    IsCash = null,
    IsNonCash = null,
    BgtTopicCode = '',
    Renewedtender = false,
    SelectedRenewedtender = null,
    FromCommitionDate = null,
    ToCommitionDate = null,
    FromDocumentDeadlineDate = null,
    ToDocumentDeadlineDate = null,
    CommitionMembers = null,
    DealTypeCode = null,
    ProvisionCode = null,
    ProvisionFinYearCodes = null,
  ) {
    return this.http.get(window.location.origin + '/Contract/ContractRequestSearch', {
      RegionCode,
      UnitPatternID,
      IsCost,
      IsIncome,
      WorkFlowTypeCode,
      FromProductRequestNo,
      ToProductRequestNo,
      FromLetterNo,
      ToLetterNo,
      IsNew,
      IsExtended,
      FromProductRequestDate,
      ToProductRequestDate,
      FromLetterDate,
      ToLetterDate,
      RequestTypesItem,
      StackHolderIDs,
      SubStackHolderIDs,
      CostCenterIDs,
      SubCostCenterIDs,
      ContractStatusCodes,
      FinYearCodes,
      WorkFlowNodeCodes,
      Subject,
      AmountTypeCode,
      StartDateTypeCode,
      ProvisionTypeCode,
      ProvisionCenteralCode,
      RequestTypeCode,
      CommitionTypeCode,
      UnderTakeTypeCode,
      ContractorTypeCode,
      ObserverActorID,
      ModuleCode,
      ResearcherID,
      ContractorId,
      CostContractID,
      ContractCode,
      HasOpenWF,
      HasCloseWF,
      RoleID,
      RefRequestID,
      PersonReqID,
      ReqPay,
      WinnerID,
      ContractTypeID,
      FromConclusionContractDate,
      ToConclusionContractDate,
      DealMethodCode,
      RequestedPerson,
      HaveMutualContract,
      MutualContractStatus,
      SupplierId,
      ContractID,
      CostFactorID,
      FromStartContractDate,
      ToStartContractDate,
      FromEndContractDate,
      ToEndContractDate,
      UnderTakeTypeValue,
      IsCash,
      IsNonCash,
      BgtTopicCode,
      Renewedtender,
      SelectedRenewedtender,
      FromCommitionDate,
      ToCommitionDate,
      FromDocumentDeadlineDate,
      ToDocumentDeadlineDate,
      CommitionMembers,
      DealTypeCode,
      ProvisionCode,
      ProvisionFinYearCodes,
    });
  }

  ContractRequestpartialSearch(
    RegionCode,
    UnitPatternID,
    IsCost,
    IsIncome,
    WorkFlowTypeCode,
    FromProductRequestNo,
    ToProductRequestNo,
    FromLetterNo,
    ToLetterNo,
    IsNew,
    IsExtended,
    FromProductRequestDate,
    ToProductRequestDate,
    FromLetterDate,
    ToLetterDate,
    RequestTypesItem,
    StackHolderIDs,
    SubStackHolderIDs,
    CostCenterIDs,
    SubCostCenterIDs,
    Subject,
    ModuleCode,
    ResearcherID = null,
    ContractorId,
    ContractStatusCodes = null,
    FinYearCodes = null,
    AmountTypeCode = null,
    StartDateTypeCode = null,
    ProvisionTypeCode = null,
    ProvisionCenteralCode = null,
    RequestTypeCode = null,
    CommitionTypeCode = null,
    UnderTakeTypeCode = null,
    ContractorTypeCode = null,
    ObserverActorID = null,
    CostContractID = 0,
    ContractCode = null,
    HasOpenWF = null,
    HasCloseWF = null,
    RoleID = null,
    RefRequestID = null,
    PersonReqID = null,
    ReqPay = null,
    WinnerID = null,
    ContractTypeID = null,
    FromContractDate = null,
    ToContractDate = null,
    DealMethodCode = null,
    WorkFlowNodeCodes = null,
    RequestedPerson = null,
    HaveMutualContract = null,
    MutualContractStatus = null,
    SupplierId?,
    ContractID = null,
    CostFactorID = null,
    FromStartContractDate = null,
    ToStartContractDate = null,
    FromEndContractDate = null,
    ToEndContractDate = null,
    UnderTakeTypeValue = null,
    IsCash = null,
    IsNonCash = null,
    BgtTopicCode = null,
    Renewedtender = false,
    SelectedRenewedtender = null,
    FromCommitionDate = null,
    ToCommitionDate = null,
    FromDocumentDeadlineDate = null,
    ToDocumentDeadlineDate = null,
    CommitionMembers = null,
    DealTypeCode = null,
    ProvisionCode = null,
    ProvisionFinYearCodes = null,
  ) {
    return this.http.get(window.location.origin + '/Contract/ContractRequestpartialSearch', {
      RegionCode,
      UnitPatternID,
      IsCost,
      IsIncome,
      WorkFlowTypeCode,
      FromProductRequestNo,
      ToProductRequestNo,
      FromLetterNo,
      ToLetterNo,
      IsNew,
      IsExtended,
      FromProductRequestDate,
      ToProductRequestDate,
      FromLetterDate,
      ToLetterDate,
      RequestTypesItem,
      StackHolderIDs,
      SubStackHolderIDs,
      CostCenterIDs,
      SubCostCenterIDs,
      ContractStatusCodes,
      FinYearCodes,
      WorkFlowNodeCodes,
      Subject,
      AmountTypeCode,
      StartDateTypeCode,
      ProvisionTypeCode,
      ProvisionCenteralCode,
      RequestTypeCode,
      CommitionTypeCode,
      UnderTakeTypeCode,
      ContractorTypeCode,
      ObserverActorID,
      ModuleCode,
      ResearcherID,
      ContractorId,
      CostContractID,
      ContractCode,
      HasOpenWF,
      HasCloseWF,
      RoleID,
      RefRequestID,
      PersonReqID,
      ReqPay,
      WinnerID,
      ContractTypeID,
      FromContractDate,
      ToContractDate,
      DealMethodCode,
      RequestedPerson,
      HaveMutualContract,
      MutualContractStatus,
      SupplierId,
      ContractID,
      CostFactorID,
      FromStartContractDate,
      ToStartContractDate,
      FromEndContractDate,
      ToEndContractDate,
      UnderTakeTypeValue,
      IsCash,
      IsNonCash,
      BgtTopicCode,
      Renewedtender,
      SelectedRenewedtender,
      FromCommitionDate,
      ToCommitionDate,
      FromDocumentDeadlineDate,
      ToDocumentDeadlineDate,
      CommitionMembers,
      DealTypeCode,
      ProvisionCode,
      ProvisionFinYearCodes,
    });
  }

  ContractRequestSearchMoreInfo(RegionCode,
    UnitPatternID,
    IsCost,
    IsIncome,
    WorkFlowTypeCode,
    FromProductRequestNo,
    ToProductRequestNo,
    FromLetterNo,
    ToLetterNo,
    IsNew,
    IsExtended,
    FromProductRequestDate,
    ToProductRequestDate,
    FromLetterDate,
    ToLetterDate,
    RequestTypesItem,
    StackHolderIDs,
    SubStackHolderIDs,
    CostCenterIDs,
    SubCostCenterIDs,
    Subject,
    ModuleCode,
    ResearcherID = null,
    ContractorId,
    ContractStatusCodes = null,
    FinYearCodes = null,
    AmountTypeCode = null,
    StartDateTypeCode = null,
    ProvisionTypeCode = null,
    ProvisionCenteralCode = null,
    RequestTypeCode = null,
    CommitionTypeCode = null,
    UnderTakeTypeCode = null,
    ContractorTypeCode = null,
    ObserverActorID = null,
    CostContractID = 0,
    ContractCode = null,
    HasOpenWF = null,
    HasCloseWF = null,
    RoleID = null,
    RefRequestID = null,
    PersonReqID = null,
    ReqPay = null,
    WinnerID = null,
    ContractTypeID = null,
    FromContractDate = null,
    ToContractDate = null,
    DealMethodCode = null,
    WorkFlowNodeCodes = null,
    RequestedPerson = null,
    SupplierId?,
    HaveMutualContract = null,
    MutualContractStatus = null,
    ContractID = null,
    ContractIDParameter = null,
    CostFactorID = null,
    FromStartContractDate = null,
    ToStartContractDate = null,
    FromEndContractDate = null,
    ToEndContractDate = null,
    UnderTakeTypeValue = null,
    IsCash = null,
    IsNonCash = null,
    BgtTopicCode = null,
    Renewedtender = false,
    SelectedRenewedtender = null,
    FromCommitionDate = null,
    ToCommitionDate = null,
    FromDocumentDeadlineDate = null,
    ToDocumentDeadlineDate = null,
    CommitionMembers = null,
    DealTypeCode = null,
    ProvisionCode = null,
    ProvisionFinYearCodes = null,
  ) {
    return this.http.get(window.location.origin + '/Contract/ContractRequestSearchMoreInfo', {
      RegionCode,
      UnitPatternID,
      IsCost,
      IsIncome,
      WorkFlowTypeCode,
      FromProductRequestNo,
      ToProductRequestNo,
      FromLetterNo,
      ToLetterNo,
      IsNew,
      IsExtended,
      FromProductRequestDate,
      ToProductRequestDate,
      FromLetterDate,
      ToLetterDate,
      RequestTypesItem,
      StackHolderIDs,
      SubStackHolderIDs,
      CostCenterIDs,
      SubCostCenterIDs,
      ContractStatusCodes,
      FinYearCodes,
      WorkFlowNodeCodes,
      Subject,
      AmountTypeCode,
      StartDateTypeCode,
      ProvisionTypeCode,
      ProvisionCenteralCode,
      RequestTypeCode,
      CommitionTypeCode,
      UnderTakeTypeCode,
      ContractorTypeCode,
      ObserverActorID,
      ModuleCode,
      ResearcherID,
      ContractorId,
      CostContractID,
      ContractCode,
      HasOpenWF,
      HasCloseWF,
      RoleID,
      RefRequestID,
      PersonReqID,
      ReqPay,
      WinnerID,
      ContractTypeID,
      FromContractDate,
      ToContractDate,
      DealMethodCode,
      RequestedPerson,
      SupplierId,
      HaveMutualContract,
      MutualContractStatus,
      ContractID,
      ContractIDParameter,
      CostFactorID,
      FromStartContractDate,
      ToStartContractDate,
      FromEndContractDate,
      ToEndContractDate,
      UnderTakeTypeValue,
      IsCash,
      IsNonCash,
      BgtTopicCode,
      Renewedtender,
      SelectedRenewedtender,
      FromCommitionDate,
      ToCommitionDate,
      FromDocumentDeadlineDate,
      ToDocumentDeadlineDate,
      CommitionMembers,
      DealTypeCode,
      ProvisionCode,
      ProvisionFinYearCodes,
    });
  }

  productRequestwfdetailSearch(
    RegionCode, //  واحد
    UnitPatternID, // محل هزينه
    FromProductRequestNo, // از درخواست
    ToProductRequestNo, // تا درخواست
    IsNew, // درخواست جديد
    IsExtended, // درخواست تمديد
    FromProductRequestDate, // از تاريخ
    ToProductRequestDate, // تا تاريخ
    ModuleCode, // ماژول کد
    SelectedPersonRoleID = null,
    ShowContractStatus10 = true) {
    return this.http.get(window.location.origin + '/Contract/productRequestwfdetailSearch', {
      RegionCode,
      UnitPatternID,
      FromProductRequestNo,
      ToProductRequestNo,
      IsNew,
      IsExtended,
      FromProductRequestDate,
      ToProductRequestDate,
      ModuleCode,
      SelectedPersonRoleID,
      ShowContractStatus10
    });
  }
  GetContractPayPaging(PageNumber, PageSize, SearchTerm, SearchOption, CostFactorID) {
    return this.http.get(window.location.origin + '/ContractPay/GetContractPayPaging',
      { PageNumber, PageSize, SearchTerm, SearchOption, CostFactorID });
  }

  ContractPaySearch(
    RegionCode,
    FinYearCode,
    CostFactorID,
    FromTechnicalCode,
    ToTechnicalCode,
    WorkFlowTypeCode,
    FromContractPayDate,
    ToContractPayDate,
    Note: string = null,
    CostCenterID: number = null,
    SubCostCenterID: number = null,
    IsEndWF: boolean = false,
    HaveWF: boolean = false,
    FromStartEstimateDate: Date = null,
    ToStartEstimateDate: Date = null,
    FromEndEstimateDate: Date = null,
    ToEndEstimateDate: Date = null,
    ToFinYear: number = null,
    ByDetail: boolean,
    ContractorID: number = null,
    ContractOperation: number = null,
    ContractPayTechnicalCode,
    AdjustmentTypeCode: number = null

  ) {
    return this.http.get(window.location.origin + '/ContractPay/ContractPaySearch', {
      RegionCode, FinYearCode, CostFactorID,
      FromTechnicalCode, ToTechnicalCode, WorkFlowTypeCode,
      FromContractPayDate, ToContractPayDate, Note,
      CostCenterID, SubCostCenterID,
      IsEndWF, HaveWF, FromStartEstimateDate, ToStartEstimateDate,
      FromEndEstimateDate, ToEndEstimateDate,
      ToFinYear, ByDetail, ContractorID, ContractOperation, ContractPayTechnicalCode, AdjustmentTypeCode
    });
  }

  UploadContractInClarification(ContractIDs, ModuleCode: number = null) {
    return this.http.get(window.location.origin + '/Contract/UploadContractInClarification', {
      ContractIDs, ModuleCode
    });
  }

  UploadInProjectControl(IDs) {
    return this.http.get(window.location.origin + '/Contract/UploadInProjectControl', {
      IDs
    });
  }

  ContractEstimateSearch(
    RegionCode,
    WorkflowTypeCode,
    FromLetterNo,
    ToLetterNo,
    ContractStatusCodes = null,
    ContractorType = null,
    ContractorId,
    Subject,
    IsContractPay) {
    return this.http.get(window.location.origin + '/Contract/ContractEstimateSearch', {
      RegionCode,
      WorkflowTypeCode,
      FromLetterNo,
      ToLetterNo,
      ContractStatusCodes,
      ContractorType,
      ContractorId,
      Subject,
      IsContractPay
    });
  }

  UploadInRecentAllClarification(RegionCode: number,
    ModuleCode: number,
    FromAuditDate = null,
    ToAuditDate = null) {
    return this.http.get(window.location.origin + '/Contract/UploadInRecentAllClarification', {
      RegionCode,
      ModuleCode,
      FromAuditDate,
      ToAuditDate
    });
  }

  ContractRequestUrbanServiceSearch(RegionCodeList,
    IsCost,
    IsOrder,
    FromFinYearCode = null,
    ToFinYearCode = null,
    ServiceList = null,
    FromLetterNo,
    ToLetterNo,
    FromContractDate,
    ToContractDate,
    FromProductRequestDate,
    ToProductRequestDate,
    ContractStatusCode
  ) {
    return this.http.get(window.location.origin + '/Contract/ContractRequestUrbanServiceSearch', {
      RegionCodeList,
      IsCost,
      IsOrder,
      FromFinYearCode,
      ToFinYearCode,
      ServiceList,
      FromLetterNo,
      ToLetterNo,
      FromContractDate,
      ToContractDate,
      FromProductRequestDate,
      ToProductRequestDate,
      ContractStatusCode
    });
  }

  GetRolesListByRegion(RegionCode, OrginalModuleCode?: any) {
    return this.http.get(window.location.origin + '/Home/GetRolesListByRegion', { RegionCode, OrginalModuleCode }, false);
  }
  CallContractStatementService(ContractID) {
    return this.http.get(window.location.origin + '/Contract/CallContractStatementService', { ContractID });
  }
  GetConcludedContractPaging(PageNumber, PageSize, SearchTerm, SearchOption, RegionCode, ProductRequestTypeCode) {
    return this.http.get(window.location.origin + '/Contract/GetConcludedContractPaging',
      { PageNumber, PageSize, SearchTerm, SearchOption, RegionCode, ProductRequestTypeCode });
  }
  ChangeContractStatus(ContractID: number, ModuleCode: number, ContractSatusCode) {
    return this.http.get(window.location.origin + '/Contract/ChangeContractStatus', { ContractID, ModuleCode, ContractSatusCode });
  }
  GetFullSaveCostContractWithOrderExceptions(
    AContract: any,
    ProductRequestCostID: number,
    ModuleCode?: number,
    ModuleViewTypeCode?: number) {
    return this.http.post(window.location.origin + '/Contract/GetFullSaveCostContractWithOrderExceptions', {
      AContract,
      ProductRequestCostID,
      ModuleCode,
      ModuleViewTypeCode
    });
  }
  ContractRequestUrbanServicepartialSearch(RegionCodeList,
    IsCost,
    IsOrder,
    FromFinYearCode = null,
    ToFinYearCode = null,
    ServiceList = null,
    FromLetterNo,
    ToLetterNo,
    FromContractDate,
    ToContractDate,
    FromProductRequestDate,
    ToProductRequestDate,
    ContractStatusCode
  ) {
    return this.http.get(window.location.origin + '/Contract/ContractRequestUrbanServicepartialSearch', {
      RegionCodeList,
      IsCost,
      IsOrder,
      FromFinYearCode,
      ToFinYearCode,
      ServiceList,
      FromLetterNo,
      ToLetterNo,
      FromContractDate,
      ToContractDate,
      FromProductRequestDate,
      ToProductRequestDate,
      ContractStatusCode
    });
  }
  GetContractAssetIncome(ContractID: any, IsLoading = true) {
    return this.http.get(window.location.origin + '/Contract/GetContractAssetIncome', { ContractID }, IsLoading);
  }
  GetAssetLocationNameByAssetIncomeID(AssetIncomeID: any) {
    return this.http.get(window.location.origin + '/Contract/GetAssetLocationNameByAssetIncomeID', { AssetIncomeID });
  }
  GetContractAssetIncomeList(ContractID: any) {
    return this.http.get(window.location.origin + '/Contract/GetContractAssetIncomeList', { ContractID });
  }
  SaveContractAssetIncomeList(ContractAssetIncomeList: any,
    ContractID: number,
    ModuleCode: number) {
    return this.http.post(window.location.origin + '/Contract/SaveContractAssetIncomeList', {
      ContractAssetIncomeList,
      ContractID,
      ModuleCode
    });
  }
  SaveIncomeContractPerson(ContractID: number,
    CostListFinYearCode: number,
    PriceListTypeCode: number,
    SeasonCode: number,
    IsVolumetric: any,
    IsCumulative: any,
    AContractPeronList: any,
    ReigonCode: number,
    ContractAssetIncomeList: any,
    ModuleCode: number,
    ReceiveFactorID: number,
    ARelatedProductList: any,
    ProductRequestID,
    NotControllingPayDatePeriod: any,
    IsMultiInvoice: any,
    IsEstimate: any,
    HasExpiredSupervision: any) {
    return this.http.post(window.location.origin + '/Home/SaveIncomeContractPerson', {
      ContractID,
      CostListFinYearCode,
      PriceListTypeCode,
      SeasonCode,
      IsVolumetric,
      IsCumulative,
      AContractPeronList,
      ReigonCode,
      ContractAssetIncomeList,
      ModuleCode,
      ReceiveFactorID,
      ARelatedProductList,
      ProductRequestID,
      NotControllingPayDatePeriod,
      IsMultiInvoice,
      IsEstimate,
      HasExpiredSupervision
    });
  }

  GetSentToClarificationList(RegionCodeList, IsCost: boolean = true, FromFinYearCode: number = null, ToFinYearCode: number = null,
    Subject: string, FromLetterNo, ToLetterNo, FromContractDate = null, ToContractDate = null,
    FromContractAmount: number = null, ToContractAmount: number = null) {
    return this.http.get(window.location.origin + '/Contract/GetSentToClarificationList',
      {
        RegionCodeList, IsCost,
        FromFinYearCode, ToFinYearCode, Subject,
        FromLetterNo, ToLetterNo,
        FromContractDate, ToContractDate,
        FromContractAmount, ToContractAmount
      });
  }
  GetLastContractOrderList(AContractID: number) {
    return this.http.get(window.location.origin + '/Home/GetLastContractOrderList', { AContractID });
  }
  GetEndDateByDuration(StartDate, DurationDay, DurationMonth, DurationYear) {
    // tslint:disable-next-line: max-line-length
    return this.http.get(window.location.origin + '/ProductRequest/GetEndDateByDuration', { StartDate, DurationDay, DurationMonth, DurationYear });
  }
  RemoveNotContractIsPostedToClean() {
    return this.http.post(window.location.origin + '/Contract/RemoveNotContractIsPostedToClean', null);
  }
  GetOrderDate(CostFactorID) {
    return this.http.get(window.location.origin + '/Contract/GetOrderDate', { CostFactorID });
  }
  CreateContractOrderforWithoutFlow(
    Acontract: any,
    ContractSignList: any,
    ModuleCode: number,
    ProductRequestCostID: number,
    OrderLetterCode,
    OrderDate
  ) {
    return this.http.post(window.location.origin + '/Contract/CreateContractOrderforWithoutFlow', {
      Acontract,
      ContractSignList,
      ModuleCode,
      ProductRequestCostID,
      OrderLetterCode,
      OrderDate
    });
  }
  GetAllRequestRelatedProduct() {
    return this.http.get(window.location.origin + '/Home/GetAllRequestRelatedProduct', null);
  }
  GetRequestRelatedProductByID(ProductRequestID: any) {
    return this.http.get(window.location.origin + '/Home/GetRequestRelatedProductByID', {
      ProductRequestID
    });
  }
  SaveRequestRelatedProduct(ARequestRelatedProductList: any, ProductRequestID: number) {
    return this.http.post(window.location.origin + '/Home/SaveRequestRelatedProduct', {
      ARequestRelatedProductList: ARequestRelatedProductList,
      ProductRequestID
    });
  }
  ContractListReport(RegionCode, CostCenterIDList: any = null, ModuleCode, IsInternal, IsCost, IsContract, ContractOperationID, FromContractDate, ToContractDate, ContractPayDate, WorkFlowDate) {
    return this.http.get(window.location.origin + '/Contract/ContractListReport', { RegionCode, CostCenterIDList, ModuleCode, IsInternal, IsCost, IsContract, ContractOperationID, FromContractDate, ToContractDate, ContractPayDate, WorkFlowDate });
  }
  ContractWfReportLevel2(RegionCode, CostCenterIDList: any = null, ModuleCode, ActorID, IsCost, IsContract) {
    return this.http.get(window.location.origin + '/Contract/ContractWfReportLevel2', { RegionCode, CostCenterIDList, ModuleCode, ActorID, IsCost, IsContract });
  }
  ContractWfReportLevel3(RegionCode, CostCenterIDList: any = null, ContractID, IsCost) {
    return this.http.get(window.location.origin + '/Contract/ContractWfReportLevel3', { RegionCode, CostCenterIDList, ContractID, IsCost });
  }
  CheckSeniorHeadReports() {
    return this.http.get(window.location.origin + '/Contract/CheckSeniorHeadReports', null);
  }
  GetByContractID(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetByContractID', { ContractID });
  }
  GetContractPrposalCoef(ContractID) {
    return this.http.get(window.location.origin + '/Contract/GetContractPrposalCoef', { ContractID });
  }

  SearchContractStatusSummaryList(
    RegionCodeList: any = null,
    UnitPatternID: number = null,
    BusinessPatternID: number = null,
    PriceListTopicID: number = null,
    Grade: number = null,
    InDetail: boolean) {
    return this.http.get(window.location.origin + '/Contract/SearchContractStatusSummaryList',
      {
        RegionCodeList,
        UnitPatternID,
        BusinessPatternID,
        PriceListTopicID,
        Grade,
        InDetail
      });
  }

  GetContractIsMultiInvoice(ContractID) {
    return this.http.get(window.location.origin + '/Contract/GetContractIsMultiInvoice', { ContractID });
  }
  GetTotalRemained(ActorID) {
    return this.http.get(window.location.origin + '/Contract/GetTotalRemained', { ActorID });
  }

  GetProviderContractList(ActorID: number = null) {
    return this.http.get(window.location.origin + '/Home/GetProviderContractList',
      {
        ActorID
      });
  }

  GetRoleNameList(SearchOption,
    SearchTerm: string,
    PageNumber: number,
    PageSize: number,
  ) {
    return this.http.get(window.location.origin + '/Home/GetRoleNameList', {
      SearchOption,
      SearchTerm,
      PageNumber,
      PageSize,
    },
      false);
  }

  GetCostumerOrderQty(
    RegionCode: number, CustomerOrderDate = null, ProductPatternID: number,) {
    return this.http.get(window.location.origin + '/Contract/GetCostumerOrderQty',
      {
        RegionCode,
        CustomerOrderDate,
        ProductPatternID
      });
  }
  GetDeadlineContractList(
    RegionCode: number, Date: any, ProductRequestTypeCode: any = null) {
    return this.http.get(window.location.origin + '/Contract/GetDeadlineContractList',
      {
        RegionCode,
        Date,
        ProductRequestTypeCode
      });
  }
  ContractListRegion(RegionCode, workFlowCode, WorkflowObjectCode) {
    return this.http.get(window.location.origin + '/Contract/ContractListRegion', { RegionCode, workFlowCode, WorkflowObjectCode });
  }
  CostCenterList(RegionCode, workFlowCode, WorkflowObjectCode, CostCenterID, SubCostCenterID) {
    return this.http.get(window.location.origin + '/Contract/CostCenterList', { RegionCode, workFlowCode, WorkflowObjectCode, CostCenterID, SubCostCenterID });
  }
  PartialRenewRequestSearch(RegionCode,
    UnitPatternID,
    IsCost,
    IsIncome,
    FromProductRequestNo,
    ToProductRequestNo,
    FromLetterNo,
    ToLetterNo,
    IsNew,
    IsExtended,
    FromProductRequestDate,
    ToProductRequestDate,
    FromLetterDate,
    ToLetterDate,
    RequestTypesItem,
    StackHolderIDs,
    SubStackHolderIDs,
    CostCenterIDs,
    SubCostCenterIDs,
    Subject,
    ModuleCode,
    ResearcherID = null,
    ContractorId,
    ContractStatusCodes = null,
    FinYearCodes = null,
    AmountTypeCode = null,
    StartDateTypeCode = null,
    RequestTypeCode = null,
    ContractorTypeCode = null,
    ObserverActorID = null,
    CostContractID = 0,
    ContractCode = null,
    RefRequestID = null,
    PersonReqID = null,
    ReqPay = null,
    ContractTypeID = null,
    FromConclusionContractDate = null,
    ToConclusionContractDate = null,
    DealMethodCode = null,
    RequestedPerson = null,
    HaveMutualContract = null,
    MutualContractStatus = null,
    SupplierId?,
    ContractID = null,
    CostFactorID = null,
    FromStartContractDate = null,
    ToStartContractDate = null,
    FromEndContractDate = null,
    ToEndContractDate = null
  ) {
    return this.http.get(window.location.origin + '/Contract/PartialRenewRequestSearch', {
      RegionCode,
      UnitPatternID,
      IsCost,
      IsIncome,
      FromProductRequestNo,
      ToProductRequestNo,
      FromLetterNo,
      ToLetterNo,
      IsNew,
      IsExtended,
      FromProductRequestDate,
      ToProductRequestDate,
      FromLetterDate,
      ToLetterDate,
      RequestTypesItem,
      StackHolderIDs,
      SubStackHolderIDs,
      CostCenterIDs,
      SubCostCenterIDs,
      ContractStatusCodes,
      FinYearCodes,
      Subject,
      AmountTypeCode,
      StartDateTypeCode,
      RequestTypeCode,
      ContractorTypeCode,
      ObserverActorID,
      ModuleCode,
      ResearcherID,
      ContractorId,
      CostContractID,
      ContractCode,
      RefRequestID,
      PersonReqID,
      ReqPay,
      ContractTypeID,
      FromConclusionContractDate,
      ToConclusionContractDate,
      DealMethodCode,
      RequestedPerson,
      HaveMutualContract,
      MutualContractStatus,
      SupplierId,
      ContractID,
      CostFactorID,
      FromStartContractDate,
      ToStartContractDate,
      FromEndContractDate,
      ToEndContractDate
    });
  }
  RenewRequestSearch(RegionCode,
    UnitPatternID,
    IsCost,
    IsIncome,
    FromProductRequestNo,
    ToProductRequestNo,
    FromLetterNo,
    ToLetterNo,
    IsNew,
    IsExtended,
    FromProductRequestDate,
    ToProductRequestDate,
    FromLetterDate,
    ToLetterDate,
    RequestTypesItem,
    StackHolderIDs,
    SubStackHolderIDs,
    CostCenterIDs,
    SubCostCenterIDs,
    Subject,
    ModuleCode,
    ResearcherID = null,
    ContractorId,
    ContractStatusCodes = null,
    FinYearCodes = null,
    AmountTypeCode = null,
    StartDateTypeCode = null,
    RequestTypeCode = null,
    ContractorTypeCode = null,
    ObserverActorID = null,
    CostContractID = 0,
    ContractCode = null,
    RefRequestID = null,
    PersonReqID = null,
    ReqPay = null,
    ContractTypeID = null,
    FromConclusionContractDate = null,
    ToConclusionContractDate = null,
    DealMethodCode = null,
    RequestedPerson = null,
    HaveMutualContract = null,
    MutualContractStatus = null,
    SupplierId?,
    ContractID = null,
    CostFactorID = null,
    FromStartContractDate = null,
    ToStartContractDate = null,
    FromEndContractDate = null,
    ToEndContractDate = null
  ) {
    return this.http.get(window.location.origin + '/Contract/RenewRequestSearch', {
      RegionCode,
      UnitPatternID,
      IsCost,
      IsIncome,
      FromProductRequestNo,
      ToProductRequestNo,
      FromLetterNo,
      ToLetterNo,
      IsNew,
      IsExtended,
      FromProductRequestDate,
      ToProductRequestDate,
      FromLetterDate,
      ToLetterDate,
      RequestTypesItem,
      StackHolderIDs,
      SubStackHolderIDs,
      CostCenterIDs,
      SubCostCenterIDs,
      ContractStatusCodes,
      FinYearCodes,
      Subject,
      AmountTypeCode,
      StartDateTypeCode,
      RequestTypeCode,
      ContractorTypeCode,
      ObserverActorID,
      ModuleCode,
      ResearcherID,
      ContractorId,
      CostContractID,
      ContractCode,
      RefRequestID,
      PersonReqID,
      ReqPay,
      ContractTypeID,
      FromConclusionContractDate,
      ToConclusionContractDate,
      DealMethodCode,
      RequestedPerson,
      HaveMutualContract,
      MutualContractStatus,
      SupplierId,
      ContractID,
      CostFactorID,
      FromStartContractDate,
      ToStartContractDate,
      FromEndContractDate,
      ToEndContractDate
    });
  }

  GetOpenContractByRegion(RegionCodeList: any, FinYearCode: number, CostCenterCode: number, PriceListTopicID: number) {
    return this.http.get(window.location.origin + '/Contract/GetOpenContractByRegion', {
      RegionCodeList,
      FinYearCode,
      CostCenterCode,
      PriceListTopicID
    });
  }

  SaveContractOrderItemListLimited(AContractOrderID: number, AContractOrderItemList: any, Note: string) {
    return this.http.post(window.location.origin + '/Contract/SaveContractOrderItemListLimited', {
      AContractOrderID,
      AContractOrderItemList,
      Note
    });
  }
  CheckContractStatusForUpdate(ProductRequestID: number) {
    return this.http.get(window.location.origin + '/Contract/CheckContractStatusForUpdate', {
      ProductRequestID
    });
  }

  GetFirstContractOrderObj(ProductRequestID: number) {
    return this.http.get(window.location.origin + '/Contract/GetFirstContractOrderObj', {
      ProductRequestID
    });

  }
  MutualContractInfo(RegionCode: number, CostCenterID: number = null, HaveMutualContract: any,
    FinYearCode: number, ContractTypeCode, ActorID: number, FromContractDate, ToContractDate, IsCost) {
    return this.http.get(window.location.origin + '/Contract/MutualContractInfo', {
      RegionCode, CostCenterID, HaveMutualContract, FinYearCode, ContractTypeCode, ActorID, FromContractDate, ToContractDate, IsCost
    });
  }
  ContractProgressInfoDetails(RegionCode: number, CostCenterID: number = null, FinYearCode, FromContractDate, ToContractDate, ContractTypeCode, ActorID) {
    return this.http.get(window.location.origin + '/Contract/ContractProgressInfoDetails', {
      RegionCode, CostCenterID, FinYearCode, FromContractDate, ToContractDate, ContractTypeCode, ActorID
    });
  }
  GetMainContractor(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetMainContractor', {
      ContractID
    });
  }
  SetMainContractor(ContractID: number, ActorID) {
    return this.http.post(window.location.origin + '/Contract/SetMainContractor', { ContractID, ActorID });
  }
  GetContractRelationList(ContractId, CostFactorID) {
    return this.http.get(window.location.origin + '/Contract/GetContractRelationList', {
      ContractId, CostFactorID
    });
  }
  GetContractRelation(CostFactorID, IsCost) {
    return this.http.get(window.location.origin + '/Contract/GetContractRelation', {
      CostFactorID, IsCost
    }, true);
  }
  ContractProgressInfo(RegionCode: number, CostCenterID: number = null, FinYearCode, FromContractDate, ToContractDate, ContractTypeCode, ActorID) {
    return this.http.get(window.location.origin + '/Contract/ContractProgressInfo', {
      RegionCode, CostCenterID, FinYearCode, FromContractDate, ToContractDate, ContractTypeCode, ActorID
    });
  }
  ConfirmChangeCartableUser(UserID: number,
    DesUserID: number,
    RolesList: any) {
    return this.http.post(window.location.origin + '/Contract/ConfirmChangeCartableUser', {
      UserID,
      DesUserID,
      RolesList
    });
  }
  GetProgressPercent(ContractID: number, ContractPayStartDate: any, ContractPayEndDate: any, ProductIDList: any) {
    return this.http.get(window.location.origin + '/Contract/GetProgressPercent', {
      ContractID,
      ContractPayStartDate,
      ContractPayEndDate,
      ProductIDList
    });
  }
  GetInspectionReport(RegionList: any, FineyearCodeList: any) {
    return this.http.get(window.location.origin + '/Contract/GetInspectionReport', {
      RegionList,
      FineyearCodeList
    });
  }

  DeleteContractOrder(ContractOrderID: number) {
    return this.http.post(window.location.origin + '/Contract/DeleteContractOrder', {
      ContractOrderID
    });
  }

  GetContractArchiveList(
    RegionCode: number, FinYear: number, HasArchive: any) {
    return this.http.get(window.location.origin + '/Contract/GetContractArchiveList',
      {
        RegionCode,
        FinYear,
        HasArchive
      });
  }

  GetPunishmentTypeList() {
    return this.http.post(window.location.origin + '/Contract/GetPunishmentTypeList', {
    });
  }
  GetRepetitionList(){
    return this.http.get(window.location.origin + '/ContractMinutes/GetRepetitionList', {
    });
  }
  ContractRequestGeneralSearch(
    RegionCodeList: any, FromProductRequestNo = null, ToProductRequestNo = null, FinYearCode: number = null, ContractId, FromContractDate: any = null, ToContractDate: any, IsCost: boolean,) {
    return this.http.get(window.location.origin + '/Contract/ContractRequestGeneralSearch',
      {
        RegionCodeList,
        FromProductRequestNo,
        ToProductRequestNo,
        FinYearCode,
        ContractId,
        FromContractDate,
        ToContractDate,
        IsCost

      });
  }
  HasContractOrderEstimate(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/HasContractOrderEstimate', { ContractID });
  }

  GetPRRelation(ContractID) {
    return this.http.get(window.location.origin + '/Contract/GetPRRelation', {
      ContractID
    }, true);
  }
  ConfirmChangeCartableUserCopy(UserID: number,
    DesUserID: number,
    RolesList: any) {
    return this.http.post(window.location.origin + '/Contract/ConfirmChangeCartableUserCopy', {
      UserID,
      DesUserID,
      RolesList
    });
  }
}

