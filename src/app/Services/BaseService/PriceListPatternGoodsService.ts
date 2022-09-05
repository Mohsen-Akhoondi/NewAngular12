import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class PriceListPatternGoodsService {
    constructor(private http: BaseHttpClient) {}

    GetPriceListPatternGoods(PriceListPatternID: number) {
        return this.http.get(window.location.origin + '/PriceList/GetPriceListPatternGoods' , {PriceListPatternID: PriceListPatternID});
    }
}
