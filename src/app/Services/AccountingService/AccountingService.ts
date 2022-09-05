import { Injectable } from '@angular/core';
import { BaseHttpClient } from 'src/app/Services/BaseService/BaseHttpClient';
@Injectable({ providedIn: 'root' })
export class AccountingService {
    constructor(private http: BaseHttpClient) {
    }
    GetLedgerAcc(RegionCode: number, FinYearCode: number) {
        return this.http.get(window.location.origin + '/Accounting/GetLedgerAcc',
            { RegionCode, FinYearCode });
    }
    GetSubLedgerByLedger(FromLedgerId: string, ToLedgerId: string) {
        return this.http.get(window.location.origin + '/Accounting/GetSubLedgerByLedger',
            { FromLedgerId, ToLedgerId });
    }
    GetDetailAccGroupBySubLedger(FromSubLedgerId: string, ToSubLedgerId: string) {
        return this.http.get(window.location.origin + '/Accounting/GetDetailAccGroupBySubLedger',
            { FromSubLedgerId, ToSubLedgerId });
    }
    GetDetailAccByGroup(PageNumber: number, PageSize: number, SearchTerm: string,
        SearchOption: string, FromDetailAccGroupCode: string, ToDetailAccGroupCode: string, RegionCode: number) {
        return this.http.get(window.location.origin + '/Accounting/GetDetailAccByGroup',
            { PageNumber, PageSize, SearchTerm, SearchOption, FromDetailAccGroupCode, ToDetailAccGroupCode, RegionCode });
    }
    GetDetailAccByGroupSearch(DetailAccGroupID, RegionCode) {
        return this.http.get(window.location.origin + '/Accounting/GetDetailAccByGroupSearch',
            { DetailAccGroupID, RegionCode });
    }
    FlowAccountRep(RegionCode, FinYearCode, Month, LedgerAccCode, SubLedgerAccCode, DetailAccGroupCode, DetailAccCode) {
        return this.http.get(window.location.origin + '/Accounting/FlowAccountRep',
            { RegionCode, FinYearCode, Month, LedgerAccCode, SubLedgerAccCode, DetailAccGroupCode, DetailAccCode });
    }
    GetDailyBookRep(RegionCode: number, FinYearCode: number, FromDate: string,
        ToDate: string, VoucherStatus: number, FromCode: number, ToCode: number) {
        return this.http.get(window.location.origin + '/Accounting/GetDailyBookRep',
            { RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromCode, ToCode });
    }

    GetMonthlyBookRep(RegionCode: number, FinYearCode: number, FromDate: string,
        ToDate: string, VoucherStatus: number, FromCode: number, ToCode: number) {
        return this.http.get(window.location.origin + '/Accounting/GetMonthlyBookRep',
            { RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromCode, ToCode });
    }

    LedgerAccBookByMonthRep(RegionCode: number, FinYearCode: number, FromDate: any, ToDate: any, VoucherStatus: number,
        FromVoucherCode: number, ToVoucherCode: number, FromLedgerAccId: number, ToLedgerAccId: number, IsVoucherType4?: number) {
        return this.http.get(window.location.origin + '/Accounting/LedgerAccBookByMonthRep',
            {
                RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromVoucherCode, ToVoucherCode, FromLedgerAccId, ToLedgerAccId,
                IsVoucherType4
            });
    }
    LedgerAccBookRep(RegionCode: number, FinYearCode: number, FromDate: any, ToDate: any, VoucherStatus: number,
        FromVoucherCode: number, ToVoucherCode: number, FromLedgerAccId: number, ToLedgerAccId: number, IsVoucherType4?: number) {
        return this.http.get(window.location.origin + '/Accounting/LedgerAccBookRep',
            {
                RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromVoucherCode, ToVoucherCode, FromLedgerAccId, ToLedgerAccId,
                IsVoucherType4
            });
    }

    SubLedgerAccBookRep(RegionCode: number, FinYearCode: number, FromDate: any, ToDate: any, VoucherStatus: number,
        FromVoucherCode: number, ToVoucherCode: number, FromLedgerAccId: number, ToLedgerAccId: number,
        FromSubLedgerAccId: number, ToSubLedgerAccId: number, Sort: number, IsVoucherType4?: number,) {
        return this.http.get(window.location.origin + '/Accounting/SubLedgerAccBookRep',
            {
                RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromSubLedgerAccId,
                FromVoucherCode, ToVoucherCode, FromLedgerAccId, ToLedgerAccId,
                ToSubLedgerAccId, Sort, IsVoucherType4
            });
    }
    SubLedgerAccBookDetailRep(RegionCode: number, FinYearCode: number, FromDate: any, ToDate: any, VoucherStatus: number,
        FromVoucherCode: number, ToVoucherCode: number, FromLedgerAccId: number, ToLedgerAccId: number,
        FromSubLedgerAccId: number, ToSubLedgerAccId: number, Sort: number, IsVoucherType4?: number,) {
        return this.http.get(window.location.origin + '/Accounting/SubLedgerAccBookDetailRep',
            {
                RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromSubLedgerAccId,
                FromVoucherCode, ToVoucherCode, FromLedgerAccId, ToLedgerAccId,
                ToSubLedgerAccId, Sort, IsVoucherType4
            });
    }
    DetailAccBookRep(RegionCode: number, FinYearCode: number, FromLedgerAccId: number, FromSubLedgerAccId: number,
        FromDetailAccGroupCode: number, FromDetailAccId: number, ToLedgerAccId: number, ToSubLedgerAccId: number,
        ToDetailAccGroupCode: number, ToDetailAccId: number, FromDate: any, ToDate: any, VoucherStatus: number,
        FromVoucherCode: number, ToVoucherCode: number, FromDebitAmount: number, ToDebitAmount: number,
        FromCreditAmount: number, ToCreditAmount: number, check1: number, check2: number, SortStatus: number,
        RegisterCheck: number, Check2031: number, iscash: number) {
        return this.http.get(window.location.origin + '/Accounting/DetailAccBookRep',
            {
                RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromSubLedgerAccId,
                FromVoucherCode, ToVoucherCode, FromLedgerAccId, ToLedgerAccId,
                ToSubLedgerAccId, ToDetailAccGroupCode, FromDetailAccId, FromDetailAccGroupCode,
                ToDetailAccId, FromDebitAmount, ToDebitAmount, FromCreditAmount, ToCreditAmount,
                check1, check2, SortStatus, RegisterCheck, Check2031, iscash
            });
    }
    DetailAccBookRepTotal(RegionCode: number, FinYearCode: number, FromLedgerAccId: number, FromSubLedgerAccId: number,
        FromDetailAccGroupCode: number, FromDetailAccId: number, ToLedgerAccId: number, ToSubLedgerAccId: number,
        ToDetailAccGroupCode: number, ToDetailAccId: number, FromDate: any, ToDate: any, VoucherStatus: number,
        FromVoucherCode: number, ToVoucherCode: number, FromDebitAmount: number, ToDebitAmount: number,
        FromCreditAmount: number, ToCreditAmount: number, check1: number, check2: number, SortStatus: number,
        RegisterCheck: number, Check2031: number, iscash: number) {
        return this.http.get(window.location.origin + '/Accounting/DetailAccBookRepTotal',
            {
                RegionCode, FinYearCode, FromDate, ToDate, VoucherStatus, FromSubLedgerAccId,
                FromVoucherCode, ToVoucherCode, FromLedgerAccId, ToLedgerAccId,
                ToSubLedgerAccId, FromDetailAccGroupCode, FromDetailAccId, ToDetailAccGroupCode,
                ToDetailAccId, FromDebitAmount, ToDebitAmount, FromCreditAmount, ToCreditAmount,
                check1, check2, SortStatus, RegisterCheck, Check2031, iscash
            });
    }
    GetFeePaymentByFee(FeeId: number) {
        return this.http.get(window.location.origin + '/Accounting/GetFeePaymentByFee',
            { FeeId });
    }
    GetFeeDeductionByFee(FeeId: number) {
        return this.http.get(window.location.origin + '/Accounting/GetFeeDeductionByFee',
            { FeeId });
    }
    GetFeeByFeeId(FeeId: number) {
        return this.http.get(window.location.origin + '/Accounting/GetFeeByFeeId',
            { FeeId });
    }
    GetElChequeInfo(FeeId: number, ChequeNo: any) {
        return this.http.get(window.location.origin + '/Accounting/GetElChequeInfo',
            {
                FeeId, ChequeNo
            });
    }
}
