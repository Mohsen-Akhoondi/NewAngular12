import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class FinYearService {
    constructor(private http: BaseHttpClient) {}

    GetFinYearList(IsLoading = true , RegionCode = null , IsClosed = false) {
        return this.http.get(window.location.origin + '/Home/GetFinYearList' ,{RegionCode, IsClosed }, IsLoading);
    }
    GetFinYearMonthWorkHourList(FinYearCode: number) {
        return this.http.get(window.location.origin + '/Home/GetMonthWorkHourList' , {FinYearCode});
    }
    SaveFinYearWorkHour(FinYearCode: number,
                        MinSalary: number,
                        MatchCoef: any,
                        MonthWorkHourList: any[]) {
        return this.http.post(window.location.origin + '/Home/SaveFinYearWorkHour' , {FinYearCode,
                                                                                      MinSalary,
                                                                                      MatchCoef,
                                                                                      MonthWorkHourList});
    }
}
