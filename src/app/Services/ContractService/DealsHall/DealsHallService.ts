import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class DealsHallService {
    constructor(private http: BaseHttpClient) {
    }
    GetCountContractTender() {
        return this.http.get(window.location.origin + '/DealsHall/GetCountContractTender', null);
    }
    GetCountContractLimitedTender() {
        return this.http.get(window.location.origin + '/DealsHall/GetCountContractLimitedTender', null);
    }
    GetCountContractAuction() {
        return this.http.get(window.location.origin + '/DealsHall/GetCountContractAuction', null);
    }
    GetCountContractInquiry() {
        return this.http.get(window.location.origin + '/DealsHall/GetCountContractInquiry', null);
    }
    GetCountContractPublicSale() {
        return this.http.get(window.location.origin + '/DealsHall/GetCountContractPublicSale', null);
    }
    GetContractTender(RegionGroupCode, RegionCodes: any[], SubCostCenterCodes: any[], CostCenterCodes: any[], IsDuring, IsExpired, pageNumber, pageSize, SortModelList, FilterModelList) {
        return this.http.post(window.location.origin + '/DealsHall/GetContractTender',
            {
                RegionGroupCode,
                RegionCodes,
                SubCostCenterCodes,
                CostCenterCodes,
                IsDuring,
                IsExpired,
                pageNumber,
                pageSize,
                SortModelList,
                FilterModelList
            });
    }
    GetContractLimitedTender(RegionGroupCode, RegionCodes: any[], SubCostCenterCodes: any[], CostCenterCodes: any[], IsDuring, IsExpired, pageNumber, pageSize, SortModelList, FilterModelList) {
        return this.http.post(window.location.origin + '/DealsHall/GetContractLimitedTender',
            {
                RegionGroupCode,
                RegionCodes,
                SubCostCenterCodes,
                CostCenterCodes,
                IsDuring,
                IsExpired,
                pageNumber,
                pageSize,
                SortModelList,
                FilterModelList
            });
    }
    GetContractAuction(RegionGroupCode, RegionCodes, SubCostCenterCodes, CostCenterCodes, IsDuring, IsExpired, pageNumber, pageSize, SortModelList, FilterModelList) {
        return this.http.post(window.location.origin + '/DealsHall/GetContractAuction',
            {
                RegionGroupCode,
                RegionCodes,
                SubCostCenterCodes,
                CostCenterCodes,
                IsDuring,
                IsExpired,
                pageNumber,
                pageSize,
                SortModelList,
                FilterModelList
            });
    }
    GetContractInquiry(RegionGroupCode, RegionCodes, SubCostCenterCodes, CostCenterCodes, IsDuring, IsExpired, pageNumber, pageSize, SortModelList, FilterModelList) {
        return this.http.post(window.location.origin + '/DealsHall/GetContractInquiry',
            {
                RegionGroupCode,
                RegionCodes,
                SubCostCenterCodes,
                CostCenterCodes,
                IsDuring,
                IsExpired,
                pageNumber,
                pageSize,
                SortModelList,
                FilterModelList
            });
    }
    GetContractPublicSale(RegionGroupCode, RegionCodes, SubCostCenterCodes, CostCenterCodes, IsDuring, IsExpired, pageNumber, pageSize, SortModelList, FilterModelList) {
        return this.http.post(window.location.origin + '/DealsHall/GetContractPublicSale',
            {
                RegionGroupCode,
                RegionCodes,
                SubCostCenterCodes,
                CostCenterCodes,
                IsDuring,
                IsExpired,
                pageNumber,
                pageSize,
                SortModelList,
                FilterModelList
            });
    }
    GetSpecialRegionList(RegionGroupCode) {
        return this.http.get(window.location.origin + '/DealsHall/GetSpecialRegionList', { RegionGroupCode });
    }
    GetCostCenterRootsForDeals(RegionGroupCode) {
        return this.http.get(window.location.origin + '/DealsHall/GetCostCenterRootsForDeals', { RegionGroupCode });
    }
    GetCostCenterChildForDeals(CostCenterID) {
        return this.http.get(window.location.origin + '/DealsHall/GetCostCenterChildForDeals', { CostCenterID });
    }
    GetRegionGroupList() {
        return this.http.get(window.location.origin + '/DealsHall/GetRegionGroupList', null);
    }
    AdvertisingCreateProposal(InquiryID) {
        return this.http.get(window.location.origin + '/DealsHall/AdvertisingCreateProposal', { InquiryID });
    }
    UploadArchiveDoc(AFile: FormData) {
        return this.http.post(window.location.origin + '/DealsHall/UploadArchiveDoc', AFile);
    }
    GetArchiveDetailList(archiveDetailCode: string) {
        return this.http.get(window.location.origin + '/DealsHall/GetArchiveDetailList', {
            archiveDetailCode
        });
    }
    GetProposalAdvertising(InquiryID) {
        return this.http.get(window.location.origin + '/DealsHall/GetProposalAdvertising', {
            InquiryID
        });
    }
    ProposalFinalConfirmDocs(ProposalID, CostFactorID) {
        return this.http.get(window.location.origin + '/DealsHall/ProposalFinalConfirmDocs', {
            ProposalID,
            CostFactorID
        });
    }
    CreateAdvertisingZipFileForAllRequest() {
        return this.http.get(window.location.origin + '/DealsHall/CreateAdvertisingZipFileForAllRequest', {});
    }
    DownloadAdvertisingFiles(CostFactorID) {
        return this.http.get(window.location.origin + '/DealsHall/DownloadAdvertisingFiles', {
            CostFactorID
        });
    }
    DownloadHelpArchiveFile(DocumnetTypeCode , Extension = null) {
        return this.http.get(window.location.origin + '/DealsHall/DownloadHelpArchiveFile', {
            DocumnetTypeCode ,
            Extension
        });
    }
    CheckAdvertisingExpireDate(InquiryID) {
        return this.http.get(window.location.origin + '/DealsHall/CheckAdvertisingExpireDate', {
            InquiryID
        });
    }
    CancelReceiveElectronicDocs(ProposalID, CheckAdmin = true) {
        return this.http.get(window.location.origin + '/DealsHall/CancelReceiveElectronicDocs', {
            ProposalID,
            CheckAdmin
        });
    }
}
