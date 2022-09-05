import { Injectable } from '@angular/core';
import { BaseHttpClient } from './BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: BaseHttpClient) {}

    GetProductList(IsGoods: boolean , ARegionCode: number) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/Home/GetProductList' , {IsGoods: IsGoods , ARegionCode: ARegionCode}, false);
    }
    GetGoodList(FromGoodCode: number, ToGoodCode: number) {
        return this.http.get(window.location.origin + '/ProductRequest/ProductSearch', { FromGoodCode: FromGoodCode, ToGoodCode: ToGoodCode }, false);

    }
    DeleteGoods(ProductID: any , ModuleCode: number) {
        return this.http.post(window.location.origin + '/ProductRequest/DeleteGoods', { ProductID , ModuleCode });
    }
   
    GetProductListPaging(IsGoods: boolean , 
                         ARegionGroupCode: number,
                         PageNumber,
                         PageSize,
                         SearchTerm,
                         SearchOption) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(window.location.origin + '/Home/GetProductListPaging' , {
            IsGoods: IsGoods , 
            ARegionGroupCode: ARegionGroupCode,
            PageNumber,
            PageSize,
            SearchTerm,
            SearchOption
        }, true);
    }
}
