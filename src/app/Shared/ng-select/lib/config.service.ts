import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgSelectConfig {
    appendTo: string;
    bindValue: string;
    bindLabel: string;
    appearance = 'underline';
    clearSearchOnAdd: boolean;
    placeholder: string;
    notFoundText = 'موردی یافت نشد';
    typeToSearchText = 'برای جستجو تایپ فرمایید';
    addTagText = 'افزودن';
    loadingText = 'درحال بارگذاری...';
    clearAllText = 'پاک کردن';
    disableVirtualScroll = true;
    openOnEnter = true;
}
