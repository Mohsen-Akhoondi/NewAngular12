import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../BaseService/BaseHttpClient';


@Injectable({ providedIn: 'root' })
export class ArticlePatternService {
  constructor(private http: BaseHttpClient) { }

  GetArticlePatternRoots(RegionGroupCode) {
    return this.http.get(window.location.origin + '/Home/GetArticlePatternRoots', { RegionGroupCode });
  }

  GetArticlePatternChildren(ArticlePatternID) {
    return this.http.get(window.location.origin + '/Home/GetArticlePatternChildren', { ArticlePatternID: ArticlePatternID });
  }

  GetArticlePatternGoodsList(ArticlePatternID, PricelistTopicSearch = null) {
    return this.http.get(window.location.origin + '/Home/GetArticlePatternGoodsList', {
      ArticlePatternID: ArticlePatternID,
      PricelistTopicSearch
    });
  }

  GetListByArticlePatternGoodsID(ArticlePatternGoodsID) {
    return this.http.get(window.location.origin + '/Home/GetListByArticlePatternGoodsID', {
      ArticlePatternGoodsID: ArticlePatternGoodsID
    });
  }
  SaveArticlePatterGoods(
    ArticlePatternID: number,
    AArticlePatterGoods: any,
    ProductRequestEntityList: any
    ) {
    return this.http.post(window.location.origin + '/Home/SaveArticlePatterGoods', {
      ArticlePatternID,
      AArticlePatterGoods,
      ProductRequestEntityList
    }, true);
  }

}