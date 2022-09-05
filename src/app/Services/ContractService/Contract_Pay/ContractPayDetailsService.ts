import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class ContractPayDetailsService {
  constructor(private http: BaseHttpClient) {
  }
  GetContractDetails(AContractID: any, ModuleCode: number = null) {
    return this.http.get(window.location.origin + '/ContractPay/GetContractDetails', { AContractID, ModuleCode });
  }
  GetContractOperationName(AContractOperationID: any) {
    return this.http.get(window.location.origin + '/ContractPay/GetContractOperationName', { AContractOperationID });
  }
  GetMaxContractPayNo(ACostFactorID: any) {
    return this.http.get(window.location.origin + '/ContractPay/GetMaxContractPayNo', { ACostFactorID });
  }
  GetContractPayType() {
    return this.http.get(window.location.origin + '/ContractPay/GetContractPayType', null);
  }
  CheckContractOperation(CostFactorID: number) {
    return this.http.get(window.location.origin + '/ContractPay/CheckContractOperation', { CostFactorID });
  }
  GetContractOrder(ContractID: number,
    ContractPayNo: string,
    Date: any,
    ProductIDs: any,
    IsContractPayEstimate: number,
    IsLoad: boolean,
    ContractOperationID = null,
    IsGreenSpace: boolean = null,
    ContractPayStartDate: any = null,
    ContractPayEndDate: any = null
  ) {

    return this.http.get(window.location.origin + '/Contract/GetContractOrder', {
      ContractID,
      ContractPayNo,
      Date,
      ProductIDs,
      IsContractPayEstimate,
      ContractOperationID,
      IsGreenSpace,
      ContractPayStartDate,
      ContractPayEndDate
    },
      IsLoad);
  }

  GetLastContractOrder(ContractID: number, HasOpenRequest: boolean) {
    return this.http.get(window.location.origin + '/Contract/GetLastContractOrder', { ContractID, HasOpenRequest });
  }

  SaveContractPay(ContractPay: any,
    ContractPayItemList: any,
    BankList: any,
    HaveBank: any,
    HasCheck25Percent = false,
    CheckMultiInvoiceType = false,
    ModuleCode,
    ModuleViewTypeCode) {

    return this.http.post(window.location.origin + '/Contract/SaveContractPay', {
      ContractPay,
      ContractPayItemList,
      BankList,
      HaveBank,
      HasCheck25Percent,
      CheckMultiInvoiceType,
      ModuleCode,
      ModuleViewTypeCode
    });
  }

  GetContractPay(CostFactorID: any, ContractAgentCode: number) {
    return this.http.get(window.location.origin + '/ContractPay/GetContractPay', { CostFactorID, ContractAgentCode });
  }

  UpdateContractPay(ContractPay: any,
    ContractPayItemList: any,
    ContractAgentCode: number,
    ModuleCode: number,
    HasCheck25Percent = false,
    CheckMultiInvoiceType = false,
    BankList: any,
    HaveBank: any,
    ModuleViewTypeCode,
    DifferenceAmount: number = null,
    DifferenceNote: string = '') {

    return this.http.post(window.location.origin + '/Contract/UpdateContractPay', {
      ContractPay,
      ContractPayItemList,
      ContractAgentCode,
      ModuleCode,
      BankList,
      HaveBank,
      HasCheck25Percent,
      CheckMultiInvoiceType,
      ModuleViewTypeCode,
      DifferenceAmount,
      DifferenceNote
    }
    );
  }

  DeleteContractPay(CostFactorID: any, ModuleViewTypeCode: number = null) {
    return this.http.post(window.location.origin + '/Contract/DeleteContractPay', { CostFactorID, ModuleViewTypeCode });
  }
  GetContractAgent() {
    return this.http.get(window.location.origin + '/Contract/GetContractAgent', null);
  }

  GetContractPrsonEstimate(ContractID: number,
    ContractPayNo: string,
    Date: any,
    StratDate: any,
    ProductID: any,
    PersonIDs: any,
    IsLoad: boolean
  ) {
    return this.http.get(window.location.origin + '/Contract/GetContractPrsonEstimate',
      {
        ContractID,
        ContractPayNo,
        Date,
        StratDate,
        ProductID,
        PersonIDs
      },
      IsLoad);
  }

  GetContractPayCoefList(ContractPayID: number) {
    return this.http.get(window.location.origin + '/ContractPay/GetContractPayCoefList', { ContractPayID });
  }
  SaveContractPayCoefList(ContractPayID: number, ContractPayCoefList: any) {
    return this.http.post(window.location.origin + '/ContractPay/SaveContractPayCoefList', {
      ContractPayID,
      ContractPayCoefList
    });
  }
  GetSumContractCoef(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetSumContractCoef', { ContractID });
  }
  GetRegioNameByCode(RegionCode: number) {
    return this.http.get(window.location.origin + '/Contract/GetRegioNameByCode', { RegionCode });
  }
  GetFirstContractOrder(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetFirstContractOrder', { ContractID });
  }
  GetContractTimeExtension(ContractID: number, CurrProductRequestItemList: any, CostFactorID: number = null) {
    // tslint:disable-next-line: max-line-length
    return this.http.post(window.location.origin + '/Contract/GetContractTimeExtension', { ContractID, CurrProductRequestItemList, CostFactorID });
  }
  GetRequestItemEntityList(ContractID, ProductID) {
    return this.http.get(window.location.origin + '/ContractPay/GetRequestItemEntityList'
      , { ContractID, ProductID });
  }
  GetRequestItemEntityItemList(ID) {
    return this.http.get(window.location.origin + '/ContractPay/GetRequestItemEntityItemList'
      , { ID });
  }
  GetBeforeLastContractOrder(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetBeforeLastContractOrder', { ContractID });
  }
  GetSumContractPayEstimateQty(CostContractID: number, ContractPayDate: any, ContractPayID?: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(window.location.origin + '/Contract/GetSumContractPayEstimateQty', { CostContractID, ContractPayDate, ContractPayID });
  }
  GetAmountOfCoef(ContractID: number, ContractOrderItemID: number, Amount: number) {
    return this.http.get(window.location.origin + '/Contract/GetAmountOfCoef',
      { ContractID, ContractOrderItemID, Amount });
  }

  GetContractCondition(ContractID: number, ModuleCode: number = null) {
    return this.http.get(window.location.origin + '/Contract/GetContractCondition',
      { ContractID, ModuleCode });
  }
  GetContractOrderByPagination(
    SearchOption: number,
    ARegionCode: number,
    SearchTerm: string,
    PageNumber: number,
    PageSize: number,
    ContractID: number,
    ContractPayNo: string,
    Date: any,
    ProductIDs: any,
    ProductTypeCode: any,
    IsGreenSpace: boolean = null,
    ContractPayStartDate: any,
    ContractPayEndDate: any) {

    return this.http.get(window.location.origin + '/Contract/GetContractOrderByPagination', {
      SearchOption,
      ARegionCode,
      SearchTerm,
      PageNumber,
      PageSize,
      ContractID,
      ContractPayNo,
      Date,
      ProductIDs,
      ProductTypeCode,
      IsGreenSpace,
      ContractPayStartDate,
      ContractPayEndDate
    });
  }
  GetContractOrderListByPagination(
    SearchOption: number,
    ARegionCode: number,
    SearchTerm: string,
    PageNumber: number,
    PageSize: number,
    ContractID: number,
    ContractPayNo: string,
    Date: any,
    ProductIDs: any,
    ProductTypeCode: any,
    IsGreenSpace: boolean = null,
    ContractPayStartDate: any,
    ContractPayEndDate: any) {

    return this.http.get(window.location.origin + '/Contract/GetContractOrderListByPagination', {
      SearchOption,
      ARegionCode,
      SearchTerm,
      PageNumber,
      PageSize,
      ContractID,
      ContractPayNo,
      Date,
      ProductIDs,
      ProductTypeCode,
      IsGreenSpace,
      ContractPayStartDate,
      ContractPayEndDate
    });
  }
  GetContractOrderByProduct(
    SearchOption: number,
    ARegionCode: number,
    SearchTerm: string,
    PageNumber: number,
    PageSize: number,
    ContractID: number,
    ContractPayNo: string,
    Date: any,
    ProductID: any,
    ProductTypeCode: any,
    IsGreenSpace: boolean = null,
    ContractPayStartDate: any,
    ContractPayEndDate: any) {

    return this.http.get(window.location.origin + '/Contract/GetContractOrderByProduct', {
      SearchOption,
      ARegionCode,
      SearchTerm,
      PageNumber,
      PageSize,
      ContractID,
      ContractPayNo,
      Date,
      ProductID,
      ProductTypeCode,
      IsGreenSpace,
      ContractPayStartDate,
      ContractPayEndDate
    });
  }
  GetProductAmount(ProductID, PriceID) {
    return this.http.get(window.location.origin + '/Contract/GetProductAmount', {
      ProductID, PriceID,
    });
  }
  SaveContractPayAmount(ContractPay: any) {
    return this.http.post(window.location.origin + '/Contract/SaveContractPayAmount', {
      ContractPay
    });
  }
  GetUnderTakeItemsList(ContractPayCostFactorID) {
    return this.http.get(window.location.origin + '/ContractPay/GetUnderTakeItemsList', {
      ContractPayCostFactorID
    });
  }
  GetContractAgents() {
    return this.http.get(window.location.origin + '/Contract/GetContractAgents', null);
  }
  CheckIsOver25Percent(ContractID, ProductID, ContractPayNo, ContractPayDate, PriceListPatternIDs) {
    return this.http.get(window.location.origin + '/ContractPay/CheckIsOver25Percent', {
      ContractID, ProductID, ContractPayNo, ContractPayDate, PriceListPatternIDs
    });
  }
  GetcostCenterActorName(CostFactorID: number, SelectedContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetcostCenterActorName', {
      CostFactorID,
      SelectedContractID
    });
  }
  GetSubCostCenterNameBycntractCostFactorID(CostFactorID: number, SelectedContractID: number) {
    return this.http.get(window.location.origin + '/Home/GetSubCostCenterNameBycntractCostFactorID', {
      CostFactorID,
      SelectedContractID
    });
  }
  GetContractOrderByProductID(ContractID: number,
    Date: any,
    ProductID: any,
    IsLoad: boolean) {

    return this.http.get(window.location.origin + '/Contract/GetContractOrderByProductID', {
      ContractID,
      Date,
      ProductID
    },
      IsLoad);
  }

  GetAdjustmentType() {
    return this.http.get(window.location.origin + '/Contract/GetAdjustmentType', false);
  }

  GetPenaltyContractCoef(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetPenaltyContractCoef', { ContractID });
  }
  HasEndedWorkflow(ObjectID: number) {
    return this.http.get(window.location.origin + '/ContractPay/HasEndedWorkflow', { ObjectID });
  }
  GetContractOrderItemOnContractPay(
    ContractID: number,
    ContractPayNo: string,
    Date: any,
    IsLoad: boolean,
    ContractOperationID = null,
    IsGreenSpace: boolean = null,
    ContractPayStartDate: any = null,
    ContractPayEndDate: any = null
  ) {

    return this.http.get(window.location.origin + '/ContractPay/GetContractOrderItemOnContractPay', {
      ContractID,
      ContractPayNo,
      Date,
      ContractOperationID,
      IsGreenSpace,
      ContractPayStartDate,
      ContractPayEndDate
    },
      IsLoad);
  }
  GetDifferenceDeduction(CostFactorID: number) {
    return this.http.get(window.location.origin + '/ContractPay/GetDifferenceDiductionObj', { CostFactorID });
  }

  UpdateContractPayItems(ModuleCode, ContractPayItemobj) {
    return this.http.post(window.location.origin + '/Contract/UpdateContractPayItems', { ModuleCode, ContractPayItemobj });
  }

  GetAllDeductionType(Ischeck = false) {
    return this.http.get(window.location.origin + '/ContractPay/GetAllDeductionType', null, Ischeck);
  }

  SaveContractpayDeductions(CostFactorID, DeductionList, ModuleCode) {
    return this.http.post(window.location.origin + '/ContractPay/SaveContractpayDeductions',
      {
        CostFactorID,
        DeductionList,
        ModuleCode
      });
  }

  GetDeductionListByCostFactorID(CostFactorID) {
    return this.http.get(window.location.origin + '/ContractPay/GetDeductionListByCostFactorID',
      {
        CostFactorID,
      });
  }
  GetBeforeContractPay(ContractID: number,
    ContractPayNo: string,
    ContractOperationID: number,
    ProductID) {
    return this.http.get(window.location.origin + '/ContractPay/GetBeforeContractPay',
      {
        ContractID,
        ContractPayNo,
        ContractOperationID,
        ProductID
      });
  }

  GetSumOfDeductionAmount(CostFactorID) {
    return this.http.get(window.location.origin + '/ContractPay/GetSumOfDeductionAmount', 
    {
      CostFactorID,
    });
  }
}
