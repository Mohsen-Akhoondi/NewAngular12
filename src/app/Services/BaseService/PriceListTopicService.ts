import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class PriceListTopicService {
    constructor(private http: BaseHttpClient) { }

    GetParents() {
        return this.http.get(window.location.origin + '/Home/GetPriceListTopic', null);
    }

    GetApprovalPriceIndexList(finYearCode: number, attachmentNo: number, levelCode: number, PriceListTypeCode) {
        return this.http.get(window.location.origin + '/Home/GetApprovalPriceIndexList'
            , { finYearCode, durationNo: attachmentNo, levelCode, PriceListTypeCode });
    }

    UpdatePriceList(ApprovalPriceLst: any, selectedYear: any, selectedAttachmentNo: any, selectedLevelCode: any, PriceListTypeCode: any) {
        return this.http.post(window.location.origin + '/Home/UpdatePriceList'
            , { ApprovalPriceLst, selectedYear, selectedAttachmentNo, selectedLevelCode, PriceListTypeCode }, false);
    }
    GetPriceListPatternRasteh(levelCode: number, Year: number, PriceListTypeCode) {
        return this.http.get(window.location.origin + '/Home/GetPriceListPatternRasteh', { levelCode, Year, PriceListTypeCode }, false);
    }
    GetPriceListPatternReshteh(Level1Code: number, Year: number, selectedLevelCode: any, PriceListTypeCode: any) {
        return this.http.get(window.location.origin + '/Home/GetPriceListPatternReshteh', {
            Level1Code, Year,
            selectedLevelCode, PriceListTypeCode
        });
    }
    GetPriceListPatternFasl(Level1Code: number, Level2Code: number, Year: number, selectedLevelCode: any, PriceListTypeCode: any) {
        return this.http.get(window.location.origin + '/Home/GetPriceListPatternFasl', {
            Level1Code, Level2Code,
            Year, selectedLevelCode, PriceListTypeCode
        });
    }

    GetPriceListPatternRadif(Level1Code: number, Level2Code: number, Level3Code: number, Year: number,
         selectedLevelCode: any, PriceListTypeCode: any) {
        return this.http.get(window.location.origin + '/Home/GetPriceListPatternRadif', {
            Level1Code, Level2Code, Level3Code,
            Year, selectedLevelCode, PriceListTypeCode
        });
    }

    GetPriceListPatternRaste(PriceListTypeCode: string) {
        return this.http.get(window.location.origin + '/Home/GetPriceListPatternRaste', {
            PriceListTypeCode
        }, false);
    }
}
