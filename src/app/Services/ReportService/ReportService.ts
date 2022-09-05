import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: BaseHttpClient) {
  }
  GetReport() {
    return this.http.get(window.location.origin + '/Report/Print',
      {
      });
  }
  CorporateRep(ModuleCode: number, ActorID: number, HeaderName: any) {
    const Str =
      'ModuleCode=' + ModuleCode + '&' +
      'ActorID=' + ActorID + '&' +
      'HeaderName=' + HeaderName;

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).subscribe((res) => {
      window.open(window.location.origin + '/Report/Print?' + res, '_blank');
    }
    );
  }
  ShowReport(
    selectedWorkflowID: number,
    WorkflowInstanceID: number,
    objectID: number,
    ContractCode: number,
    ContractNo: string,
    ContractDate: string,
    Subject: string,
    ContractorName: string,
    WorkflowTypeCode: number,
    WorkflowTypeName: string,
    ModuleCode: number,
    RegionCode: number,
    HaveSave: boolean = null // RFC 51581
  ) {
 
    const Str = 'WFID=' + selectedWorkflowID +
      '&WorkflowInstanceID=' + WorkflowInstanceID +
      '&objectID=' + objectID +
      '&ContractCode=' + ContractCode +
      '&ContractNo=' + ContractNo +
      '&ContractDate=' + ContractDate +
      '&Subject=' + Subject +
      '&ContractorName=' + ContractorName +
      '&WorkflowTypeCode=' + WorkflowTypeCode +
      '&WorkflowTypeName=' + WorkflowTypeName +
      '&WfModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&HaveSave=' + HaveSave +
      '&HeaderName=' + 'گردش کار';

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowReportPriceList(PriceListPatternID: number, ModuleCode: number) {
    const Str = 'priceListPatternID=' + PriceListPatternID +
      '&ModuleCode=' + ModuleCode;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ComprehensiveStatusReport(
    RegionCode: any,
    ContractCode: any,
    CostCenterCode: any,
    SubCostCenterCode: any,
    TypeContractor: any,
    PersonReqCode: any,
    FromDate: any,
    ToDate: any,
    ModuleCode: any,
    ContractOperationID: number = null,
    ReportType: any
  ) {
    const Str = 'RegionCode=' + RegionCode +
      '&ContractCode=' + ContractCode +
      '&CostCenterCode=' + CostCenterCode +
      '&SubCostCenterCode=' + SubCostCenterCode +
      '&TypeContractor=' + TypeContractor +
      '&PersonReqCode=' + PersonReqCode +
      '&FromDate=' + FromDate +
      '&ToDate=' + ToDate +
      '&ModuleCode=' + ModuleCode +
      '&ContractOperationID=' + ContractOperationID +
      '&ReportType=' + ReportType;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ContractPayRep(
    ContractID: number,
    CostFactorID: number,
    RegionCode: number,
    ModuleCode: number,
    ShowReportSign: boolean,
    HeaderName: string = '') {
    const Str =
      'ContractID=' + ContractID +
      '&CostFactorID=' + CostFactorID +
      '&RegionCode=' + RegionCode +
      '&ModuleCode=' + ModuleCode +
      '&ShowReportSign=' + ShowReportSign +
      '&HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ContractPayWorkReport(RegionCode: any,
    CostCenterCode: any,
    SubCostCenterCode: any,
    FromDate: any,
    ToDate: any,
    ModuleCode: any,
    ContractorID: number,
    ContractOperationID: number = null
  ) {
    const Str =
      'RegionCode=' + RegionCode +
      '&CostCenterCode=' + CostCenterCode +
      '&SubCostCenterCode=' + SubCostCenterCode +
      '&FromDate=' + FromDate +
      '&ToDate=' + ToDate +
      '&ModuleCode=' + ModuleCode +
      '&ContractorID=' + ContractorID +
      '&ContractOperationID=' + ContractOperationID;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        });
  }

  TenderProceedingsReport(
    CostFactorID: number,
    OrderCommitionID: number,
    ModuleCode: number,
    RegionCode: number,
    HeaderName: any,
    HasEstimate: any,
    UranTriplePrint: any,
    ModuleViewTypeCode: number
  ) {
    const Str =
      'CostFactorID=' + CostFactorID + '&' +
      'OrderCommitionID=' + OrderCommitionID + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'RegionCode=' + RegionCode + '&' +
      'HeaderName=' + HeaderName + '&' +
      'HasEstimate=' + HasEstimate + '&' +
      'UranTriplePrint=' + UranTriplePrint + '&' +
      'ModuleViewTypeCode=' + ModuleViewTypeCode;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?'
            + res, '_blank');
        }
      );
  }

  PRProvisionRep(RegionCode: number, CostFactorID: number, ModuleCode: number, HeaderName: any, ShowTrafficSign: boolean = null) {
    const Str = 'RegionCode=' + RegionCode + '&' + 'CostFactorID=' + CostFactorID +
      '&' + 'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName + '&'
      + 'ShowTrafficSign=' + ShowTrafficSign;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }

  ContractPeriodReport(
    RegionCode: number,
    FromProductRequestDate: string,
    ToProductRequestDate: string,
    FromContractDate: string,
    ToContractDate: string,
    Times: number,
    ModuleCode: number,
    HeaderName: any
  ) {
    const Str =
      'RegionCode=' + RegionCode + '&' +
      'FromProductRequestDate=' + FromProductRequestDate + '&' +
      'ToProductRequestDate=' + ToProductRequestDate + '&' +
      'FromContractDate=' + FromContractDate + '&' +
      'ToContractDate=' + ToContractDate + '&' +
      'Times=' + Times + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?'
            + res, '_blank');
        }
      );
  }
  ShowContractListReport(
    RegionCode: number,
    ModuleCode: number,
    HeaderName: string
  ) {
    const Str =
      'RegionCode=' + RegionCode + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  PriceListFirstLevelReport(
    ContractID: number,
    ContractOrderItemID: number,
    HasOrderItem: number,
    ModuleCode: number,
    RegionCode: number,
    HeaderName: string,
    LevelCode: number,
    AmountCOEFPact: number
  ) {
    const Str = 'ContractID=' + ContractID +
      '&ContractOrderItemID=' + ContractOrderItemID +
      '&HasOrderItem=' + HasOrderItem +
      '&ModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&LevelCode=' + LevelCode +
      '&HeaderName=' + HeaderName +
      '&AmountCOEFPact=' + AmountCOEFPact;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ProvisionRep(CostFactorID: number, ModuleCode: number, HeaderName: any, RegionCode: number) {
    const Str =
      'CostFactorID=' + CostFactorID + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName + '&' +
      'RegionCode=' + RegionCode;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  TenderInfoSummReport(CostFactorID: number, OrderCommitionID: number,
    ModuleCode: number, RegionCode: number, HeaderName: any) {
    const Str = 'CostFactorID=' + CostFactorID +
      '&' + 'OrderCommitionID=' + OrderCommitionID +
      '&' + 'ModuleCode=' + ModuleCode +
      '&' + 'RegionCode=' + RegionCode +
      '&' + 'HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?'
            + res, '_blank');
        }
      );
  }
  ContractPayDetailsFirstLevelReport(
    ModuleCode: number,
    CostFactorID: number,
    ContractID: number,
    IsColorful: boolean,
    HeaderName: string,
    ContractPayNo: Number,
    RegionCode: number,
    ShowReportSign: boolean = null) {
    const Str =
      'ModuleCode=' + ModuleCode + '&' +
      'CostFactorID=' + CostFactorID + '&' +
      'ContractID=' + ContractID + '&' +
      'IsColorful=' + IsColorful + '&' +
      'HeaderName=' + HeaderName + '&' +
      'RegionCode=' + RegionCode + '&' +
      'ContractPayNo=' + ContractPayNo + '&' +
      'ShowReportSign=' + ShowReportSign;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  PUrbanActivityListReport(
    RegionCodes: number,
    ModuleCode: number,
    HeaderName: string,
    IsCost,
    IsOrder,
    IsPartial,
    ServicesItems = null,
    FromLetterNo = null,
    ToLetterNo = null,
    FromProductRequestDate = null,
    ToProductRequestDate = null,
    FromContractDate = null,
    ToContractDate = null,
    FromFinYear = null,
    ToFinYear = null,
    SumFinalAmount = null,
    SumFinalContractAmount = null,
    SumFinalReceiptAmount = null,
    ContractStatusCode = null
  ) {
    const Str =
      'RegionCodes=' + RegionCodes +
      '&ModuleCode=' + ModuleCode +
      '&HeaderName=' + HeaderName +
      '&IsCost=' + IsCost +
      '&IsOrder=' + IsOrder +
      '&IsPartial=' + IsPartial +
      '&ServicesItems=' + ServicesItems +
      '&FromLetterNo=' + FromLetterNo +
      '&ToLetterNo=' + ToLetterNo +
      '&FromProductRequestDate=' + FromProductRequestDate +
      '&ToProductRequestDate=' + ToProductRequestDate +
      '&FromContractDate=' + FromContractDate +
      '&ToContractDate=' + ToContractDate +
      '&FromFinYear=' + FromFinYear +
      '&ToFinYear=' + ToFinYear +
      '&SumFinalAmount=' + SumFinalAmount +
      '&SumFinalContractAmount=' + SumFinalContractAmount +
      '&SumFinalReceiptAmount=' + SumFinalReceiptAmount +
      '&ContractStatusCode=' + ContractStatusCode;

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowContractRequestListReport(
    RegionCode: number,
    ModuleCode: number,
    HeaderName: string,
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
    RequestTypesParams,
    StackHolderIDs,
    SubStackHolderIDs,
    CostCenterIDs,
    SubCostCenterIDs,
    Subject,
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
    SelectedPersonRoleID = null, // کد شخض مربوط به منوي جستجوي کارتابل گردش کار
    PersonReqID = null,
    ReqPay = null,
    WinnerID = null,
    ContractTypeID = null,
    FromContractDate = null,
    ToContractDate = null,
    DealMethodCode = null,
    WorkFlowNodeCodeitems = null,
    RequestPerson = null,
    SupplierId = null,
    GridData = null,
    HaveMutualContract = null,
    MutualContractStatus = null,
    ContractID = null,
    CostFactorID = null,
    FromStartContractDate = null,
    ToStartContractDate = null,
    FromEndContractDate = null,
    ToEndContractDate = null,
    UnderTakeTypeValue = null,
    ContractorID = null,
    FromCommitionDate = null,
    ToCommitionDate = null,
    FromDocumentDeadlineDate = null,
    ToDocumentDeadlineDate = null,
    CommitionMemberItemsStr = null,
    DealTypeCode = null,
  ) {
    const Str =
      'RegionCode=' + RegionCode +
      '&ModuleCode=' + ModuleCode +
      '&HeaderName=' + HeaderName +
      '&UnitPatternID=' + UnitPatternID +
      '&IsCost=' + IsCost +
      '&IsIncome=' + IsIncome +
      '&WorkFlowTypeCode=' + WorkFlowTypeCode +
      '&FromProductRequestNo=' + FromProductRequestNo +
      '&ToProductRequestNo=' + ToProductRequestNo +
      '&FromLetterNo=' + FromLetterNo +
      '&ToLetterNo=' + ToLetterNo +
      '&IsNew=' + IsNew +
      '&IsExtended=' + IsExtended +
      '&FromProductRequestDate=' + FromProductRequestDate +
      '&ToProductRequestDate=' + ToProductRequestDate +
      '&StackHolderIDs=' + StackHolderIDs +
      '&SubStackHolderIDs=' + SubStackHolderIDs +
      '&RequestTypesItem=' + RequestTypesParams +
      '&CostCenterIDs=' + CostCenterIDs +
      '&SubCostCenterIDs=' + SubCostCenterIDs +
      '&Subject=' + Subject +
      '&ContractStatusCodes=' + ContractStatusCodes +
      '&FinYearCodes=' + FinYearCodes +
      '&AmountTypeCode=' + AmountTypeCode +
      '&StartDateTypeCode=' + StartDateTypeCode +
      '&ProvisionTypeCode=' + ProvisionTypeCode +
      '&ProvisionCenteralCode=' + ProvisionCenteralCode +
      '&RequestTypeCode=' + RequestTypeCode +
      '&CommitionTypeCode=' + CommitionTypeCode +
      '&UnderTakeTypeCode=' + UnderTakeTypeCode +
      '&ContractorTypeCode=' + ContractorTypeCode +
      '&ObserverActorID=' + ObserverActorID +
      '&CostContractID=' + CostContractID +
      '&ContractCode=' + ContractCode +
      '&HasOpenWF=' + HasOpenWF +
      '&HasCloseWF=' + HasCloseWF +
      '&RoleID=' + RoleID +
      '&RefRequestID=' + RefRequestID +
      '&SelectedPersonRoleID=' + SelectedPersonRoleID +
      '&PersonReqID=' + PersonReqID +
      '&ReqPay=' + ReqPay +
      '&WinnerID=' + WinnerID +
      '&ContractTypeID=' + ContractTypeID +
      '&FromContractDate=' + FromContractDate +
      '&ToContractDate=' + ToContractDate +
      '&DealMethodCode=' + DealMethodCode +
      '&RequestPerson=' + RequestPerson +
      '&SupplierId=' + SupplierId +
      '&WorkFlowNodeCodeitems=' + WorkFlowNodeCodeitems +
      '&HaveMutualContract=' + HaveMutualContract +
      '&MutualContractStatus=' + MutualContractStatus +
      '&ContractID=' + ContractID +
      '&CostFactorID=' + CostFactorID +
      '&FromStartContractDate=' + FromStartContractDate +
      '&ToStartContractDate=' + ToStartContractDate +
      '&FromEndContractDate=' + FromEndContractDate +
      '&ToEndContractDate=' + ToEndContractDate +
      '&UnderTakeTypeValue=' + UnderTakeTypeValue +
      '&ContractorID=' + ContractorID +
      "&FromCommitionDate=" + FromCommitionDate +
      "&ToCommitionDate=" + ToCommitionDate +
      "&FromDocumentDeadlineDate=" + FromDocumentDeadlineDate +
      "&ToDocumentDeadlineDate=" + ToDocumentDeadlineDate +
      "&CommitionMemberItemsStr=" + CommitionMemberItemsStr +
      "&DealTypeCode=" + DealTypeCode;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  GDMinutesRep(
    ContractMinutesID: number,
    ContractId: number,
    TextMinutes: any,
    ModuleCode: number,
    HeaderName: any) {
    const Str =
      'ContractMinutesID=' + ContractMinutesID + '&' +
      'ContractId=' + ContractId + '&' +
      'TextMinutes=' + TextMinutes + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowContractPersonReport(
    RegionCode: number,
    CostFactorID: Number,
    ModuleCode: number,
    HeaderName: string
  ) {
    const Str =
      'regionCode=' + RegionCode + '&' +
      'costFactorID=' + CostFactorID + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowapprpriceindexReport(finYearCode: number, attachmentNo: number, levelCode: number, PriceListTypeCode) {
    const Str =
      'fin-year=' + finYearCode + '&' +
      'attachment=' + attachmentNo + '&' +
      'level=' + levelCode + '&' +
      'PriceListTypeCode=' + PriceListTypeCode + '&' +
      'ModuleCode=2649';
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ContractPayListDetailReport(
    CPCostFactorID: number,
    ContractAgentCode: number,
    ModuleCode: number,
    RegionCode: number,
    HeaderName: string,
    ContractPayItemID: number,
    PrintCoef: boolean = null) {
    const Str =
      'ModuleCode=' + ModuleCode + '&' +
      'CPCostFactorID=' + CPCostFactorID + '&' +
      'ContractAgentCode=' + ContractAgentCode + '&' +
      'RegionCode=' + RegionCode + '&' +
      'HeaderName=' + HeaderName + '&' +
      'ContractPayItemID=' + ContractPayItemID + '&' +
      'PrintCoef=' + PrintCoef;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  GeneralTenderReport(CostFactorID, ModuleCode, HeaderName, RegionCode, InquiryID) {
    const Str = 'CostFactorID=' + CostFactorID + '&' + 'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName + '&' + 'RegionCode=' + RegionCode + '&' + 'InquiryID=' + InquiryID;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  GeneralTenderReport2(InquiryID: any, ModuleCode: any, HeaderName: any, RegionCode: number) {
    const Str = 'InquiryID=' + InquiryID + '&' + 'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + HeaderName + '&' + 'RegionCode=' + RegionCode;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  PREstimateFirstLevelReport(
    CostFactorID: number,
    ProductRequestItemID: number,
    HasOrderItem: number,
    ModuleCode: number,
    RegionCode: number,
    HeaderName: string,
    LevelCode: number
  ) {
    const Str = 'CostFactorID=' + CostFactorID +
      '&ProductRequestItemID=' + ProductRequestItemID +
      '&HasOrderItem=' + HasOrderItem +
      '&ModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&LevelCode=' + LevelCode +
      '&HeaderName=' + HeaderName;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowInvoiceRep(InvoiceID: number, ModuleCode: number) {
    const Str =
      'InvoiceID=' + InvoiceID + '&' +
      'ModuleCode=' + ModuleCode + '&' +
      'HeaderName=' + 'درخواست پرداخت موردی';
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }

  CPEstimateReport(
    ContractPayID: number,
    ContractPayItemID: number,
    GroupCode: number,
    ModuleCode: number,
    RegionCode: number,
    HeaderName: string,
    LevelCode: number,
    ContractID: number,
    CPCostfactorID: number,
    ContractAgentCode: number,
    SumFinalAmountCOEFPact: number
  ) {
    const Str = 'ContractPayID=' + ContractPayID +
      '&ContractPayItemID=' + ContractPayItemID +
      '&GroupCode=' + GroupCode +
      '&ModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&LevelCode=' + LevelCode +
      '&HeaderName=' + HeaderName +
      '&ContractID=' + ContractID +
      '&CPCostfactorID=' + CPCostfactorID +
      '&ContractAgentCode=' + ContractAgentCode +
      '&SumFinalAmountCOEFPact=' + SumFinalAmountCOEFPact;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }

  PrintContStatusSummRep(
    RegionCode: number,
    AdvertisingNo: string,
    FromProductRequestNo: string,
    ToProductRequestNo: string,
    FromAdvrtisingtDate: any = '',
    ToAdvrtisingtDate: any = '',
    ModuleCode: number // RFC 51581
  ) {
    const Str = 'RegionCode=' + RegionCode +
      '&AdvertisingNo=' + AdvertisingNo +
      '&FromProductRequestNo=' + FromProductRequestNo +
      '&ToProductRequestNo=' + ToProductRequestNo +
      '&FromAdvrtisingtDate=' + FromAdvrtisingtDate +
      '&ToAdvrtisingtDate=' + ToAdvrtisingtDate +
      '&ModuleCode=' + ModuleCode +
      '&HeaderName=' + 'خلاصه وضعیت قرارداد';

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }

  CostCenterListreport(
    RegionCode: number,
    ModuleCode: number,
    FromCostCenterID,
    ToCostCenterID,
    FromSubCostCenterID,
    ToSubCostCenterID,
  ) {
    const Str =
      'RegionCode=' + RegionCode +
      '&FromCostCenterID=' + FromCostCenterID +
      '&ToCostCenterID=' + ToCostCenterID +
      '&FromSubCostCenterID=' + FromSubCostCenterID +
      '&ToSubCostCenterID=' + ToSubCostCenterID +
      '&ModuleCode=' + ModuleCode;

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  };
  ProductRequestProvisionReport(
    CostFactorID: number,
    ModuleViewTypeCode: any,
    ModuleCode: number,
    Flag,
    RegionCode,
    HeaderName
  ) {
    const Str =
      'CostFactorID=' + CostFactorID +
      '&ModuleViewTypeCode=' + ModuleViewTypeCode +
      '&Flag=' + Flag +
      '&RegionCode=' + RegionCode +
      '&ModuleCode=' + ModuleCode +
      '&HeaderName=' + HeaderName;

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  };
  OpenContractRep(RegionCode: number, FinYearCode: number, RusteeCode: number, PriceListTopicID: number) {
    const Str =
      'RegionCodes=' + RegionCode + '&' +
      'FinYearCode=' + FinYearCode + '&' +
      'RusteeCode=' + RusteeCode + '&' +
      'ModuleCode=' + 3040 + '&' +      
      'PriceListTopicID=' + PriceListTopicID;
    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).subscribe((res) => {
      window.open(window.location.origin + '/Report/Print?' + res, '_blank');
    });
  }
  ShowReportCustomerOrder(
    objectID: number,
    ModuleCode: number,
    RegionCode: number,
    HaveSave: boolean = null // RFC 51581
  ) {
    const Str = 
      'objectID=' + objectID +
      '&WfModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&HaveSave=' + HaveSave +
      '&HeaderName=' + 'گردش کار';

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowReportCustomerProduct(
    objectID: number,
    ModuleCode: number,
    RegionCode: number = null ,
    HaveSave: boolean = null // RFC 51581
  ) {
    const Str = 
      'objectID=' + objectID +
      '&WfModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&HaveSave=' + HaveSave +
      '&HeaderName=' + 'گردش کار';

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
  ShowReportAssetPage(
    objectID: number,
    ModuleCode: number,
    RegionCode: number,
    HaveSave: boolean = null // RFC 51581
  ) {
    const Str = 
      'objectID=' + objectID +
      '&WfModuleCode=' + ModuleCode +
      '&RegionCode=' + RegionCode +
      '&HaveSave=' + HaveSave +
      '&HeaderName=' + 'گردش کار';

    this.http.get(window.location.origin + '/Report/Encrypt', { Str: Str }).
      subscribe(
        (res) => {
          window.open(window.location.origin + '/Report/Print?' + res, '_blank');
        }
      );
  }
}
