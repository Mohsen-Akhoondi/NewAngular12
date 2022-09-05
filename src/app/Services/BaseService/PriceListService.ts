import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';

@Injectable({ providedIn: 'root' })
export class PriceListService {
  constructor(private http: BaseHttpClient) { }
  // GetAllPerson(PageNumber, PageSize, SearchTerm) {
  //   return this.http.get(window.location.origin + '/Home/GetAllPerson', { PageNumber, PageSize, SearchTerm });
  // }
  GetPriceList(PriceListPatternID , IsLoading = true, IsStar) {
    return this.http.get(window.location.origin + '/Home/GetPriceList', { 
      PriceListPatternID: PriceListPatternID ,IsStar
    } , IsLoading);
  }
  GetPriceListTopicChildren(PriceListPatternID) {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopicChildren', { PriceListPatternID });
  }
  GetPriceListTopics(isParent: boolean) {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopic', { isParent: isParent });
  }
  GetPriceListType(PriceListFinYearCode: any) {
    return this.http.get(window.location.origin + '/Home/GetPriceListType', { PriceListFinYearCode });
  }
  GetPriceListRoots(PriceListTopicID, PriceListPatternID) {
    return this.http.get(window.location.origin + '/Home/GetPriceListRoots', { PriceListTopicID, PriceListPatternID});
  }
  GetPriceListChildren(PriceListPatternID) {
    return this.http.get(window.location.origin + '/Home/GetPriceListChildren', { PriceListPatternID: PriceListPatternID });
  }

  // tslint:disable-next-line:max-line-length
  GetPriceListTopicList(APriceListTopicList: any[], AQUALIFIER: string, ContractPayDate: any, ContractID: any) {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopicList', {
      APriceListTopicList, AQUALIFIER,
      ContractPayDate, ContractID
    });
  }
  ReturnPriceListTopicsEstimate(APriceListTopicList: any[], AQUALIFIER: string, ContractPayDate: any, ContractID: any) {
    return this.http.get(window.location.origin + '/Home/ReturnPriceListTopicsEstimate', {
      APriceListTopicList, AQUALIFIER,
      ContractPayDate, ContractID
    });
  }
  GetWorkUnits() {
    return this.http.get(window.location.origin + '/Home/GetWorkUnits', null);
  }

  SavePriceListTopic(ParentPriceListPatternID: number,
    DisplayCode: string,
    PriceListTopic: any,
    PriceList: any,
    ModuleCode: number) {
    return this.http.post(window.location.origin + '/Home/SavePriceListTopic', {
      ParentPriceListPatternID,
      DisplayCode,
      PriceListTopic,
      PriceList,
      ModuleCode
    });
  }
  UpdateAmountPriceListTopic(PriceListPatternID: number,
    Amount: string) {
    return this.http.post(window.location.origin + '/PriceList/UpdateAmountPriceListTopic', {
      PriceListPatternID,
      Amount
    });
  }
  FindDisplayCode(PriceListTopicID: number,
    DisplayCode: string) {
    return this.http.get(window.location.origin + '/Home/FindDisplayCode', {
      PriceListTopicID,
      DisplayCode
    });
  }

  HasContactEstimate(PriceListTopicID: number) {
    return this.http.get(window.location.origin + '/Home/HasContactEstimate', { PriceListTopicID });
  }

  DeletePriceListTopic(PriceListTopicID: number) {
    return this.http.get(window.location.origin + '/Home/DeletePriceListTopic', { PriceListTopicID });
  }

  UpdatePriceListTopic(PriceListTopic: any,
    PriceList: any,
    DisplayCode: string,
    ModuleCode: number) {

    return this.http.post(window.location.origin + '/Home/UpdatePriceListTopic', {
      PriceListTopic,
      PriceList,
      DisplayCode,
      ModuleCode
    });
  }

  SavePriceListTopicNoLeaf(PriceListTopicList: any) {
    return this.http.post(window.location.origin + '/Home/SavePriceListTopicList', { PriceListTopicList });
  }

  GetLevelCodePriceListTopic(ParentPriceListTopicCode: string,
    LevelCode: number) {
    return this.http.get(window.location.origin + '/Home/GetLevelCodePriceListTopic', { ParentPriceListTopicCode, LevelCode });
  }

  SaveChildPriceListPattern(ParentPriceListPatternID: number,
    PriceListTopicQualifier: string,
    PriceListTopicList: any) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(window.location.origin + '/Home/SaveChildPriceListPattern', {
      ParentPriceListPatternID,
      PriceListTopicQualifier,
      PriceListTopicList
    });
  }

  DeleteChildPriceListPattern(PriceListPatternID: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(window.location.origin + '/Home/DeleteChildPriceListPattern', { PriceListPatternID });
  }

  GetRelatedPriceListPatternList(PriceListPatternID: number, ContractPayDate: number, ContractID: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(window.location.origin + '/Home/GetRelatedPriceListPatternList', { PriceListPatternID, ContractPayDate, ContractID });
  }

  GetRelatedPriceListPattern(PriceListPatternID: number, ChildPriceListPatternID: number) {
    return this.http.get(window.location.origin + '/Home/GetRelatedPriceListPattern', { PriceListPatternID, ChildPriceListPatternID });
  }

  GetPriceListPatterns(FinYearCode: string,
    PriceListTypeCode: string,
    PriceListTopicCodes: any) {
    return this.http.get(window.location.origin + '/Home/GetPriceListPatterns', {
      FinYearCode,
      PriceListTypeCode,
      PriceListTopicCodes
    });
  }
  FindPriceListPattern(FinYearCode: string,
    PriceListTypeCode: string,
    PriceListTopicCode: any) {

    return this.http.get(window.location.origin + '/Home/FindPriceListPattern', {
      FinYearCode,
      PriceListTypeCode,
      PriceListTopicCode
    });
  }
  GetContractPriceListPattern(ContractID: number) {
    return this.http.get(window.location.origin + '/Contract/GetContractPriceListPattern', {
      ContractID
    });
  }

  GetPriceListPatternID(CostListFinYearCode: string, PriceListTypeCode: string) {
    return this.http.get(window.location.origin + '/ProductRequest/GetPriceListPatternID', { CostListFinYearCode, PriceListTypeCode });
  }
  GetPriceListTopicByLevelCode(LevelCode: number, ParentPriceListPatternID: number, ParentPriceListTopicCode: number,
    HaveLoading: boolean) {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopicByLevelCode', {
      LevelCode, ParentPriceListPatternID,
      ParentPriceListTopicCode
    }, HaveLoading);
  }
  GetPriceListTopicName(PriceListTopicID: number) {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopicName', { PriceListTopicID });
  }
  GetAticle31ListByDealMethodCode(DealMethodCode: any, RegionCode: number) {
    return this.http.get(window.location.origin + '/ProductRequest/GetAticle31ListByDealMethodCode', { DealMethodCode, RegionCode });
  }
  GetAticle31ListByDealMethodCodeAndRegionGroup(DealMethodCode: any, RegionGroupCode: number) {
    return this.http.get(window.location.origin + '/ProductRequest/GetAticle31ListByDealMethodCodeAndRegionGroup', {
      DealMethodCode,
      RegionGroupCode
    });
  }


  GetLastPriceNumberbyPriceListTopicCode(PriceListTopicCode: number, CostListFinYearCode: any) {
    return this.http.get(window.location.origin + '/Home/GetLastPriceNumberbyPriceListTopicCode',
      {
        PriceListTopicCode,
        CostListFinYearCode
      });
  }
  GetListByPriceListTopicCode(PricelistTopicSearch, ParentPriceListPatternID) {
    return this.http.get(window.location.origin + '/Home/GetListByPriceListTopicCode', { PricelistTopicSearch, ParentPriceListPatternID });
  }
  CorrectPriceListTopic(PriceLists: any, CostListFinYearCode: number, PriceListTypeCode: number, ModuleCode: number) {
    return this.http.post(window.location.origin + '/Home/CorrectPriceListTopic',
      { PriceLists, CostListFinYearCode, PriceListTypeCode, ModuleCode });
  }
  GetPriceListTopicbyLevel(Level: number, CostListFinYearCode: number) {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopicbyLevel', { Level, CostListFinYearCode });
  }
  GetPriceListTopic() {
    return this.http.get(window.location.origin + '/Home/GetPriceListTopics', null);
  }
  GetPriceListChildrenSecondLevel(PriceListTopicID) {
    return this.http.get(window.location.origin + '/Home/GetPriceListChildrenSecondLevel', { PriceListTopicID: PriceListTopicID });
  }
  GetPLTListbyPRType(ProductRequestTypeCode: number) {
    return this.http.get(window.location.origin + '/Home/GetPLTListbyPRType', { ProductRequestTypeCode });
  }

  GetPasmandPriceListTopics() {
    return this.http.get(window.location.origin + '/Home/GetPasmandPriceListTopics', null);
  }
}
