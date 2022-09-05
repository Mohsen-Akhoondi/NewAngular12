import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class RefreshServices {
  @Output() WorkListChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() CantractListChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestListChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() ContractOrderItemList: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestItemList: EventEmitter<any> = new EventEmitter<any>();
  @Output() ItemsVirtualNgSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() LoginDetailsChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestObjectChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() UserMenuChange: EventEmitter<any> = new EventEmitter<any>();
  RefreshCartable() {
    this.WorkListChange.emit(true);
  }
  RefreshCantractList() {
    this.CantractListChange.emit(true);
  }
  RefreshContractOrderItemListVW() {
    this.ContractOrderItemList.emit(true);
  }
  RefreshItemsVirtualNgSelect(Items) {
    this.ItemsVirtualNgSelect.emit(Items);
  }
  RefreshLoginDetails(IsLogin) {
    this.LoginDetailsChange.emit(IsLogin);
  }
  RefreshProductRequestItemListVW() {
    this.ProductRequestItemList.emit(true);
  }
  RefreshProductRequestList() {
    this.ProductRequestListChange.emit(true);
  }
  RefreshProductRequestPage(ProductRequestObject) {
    this.ProductRequestObjectChange.emit(ProductRequestObject);
  }
  RefreshMenu() {
    this.UserMenuChange.emit(true);
  } // 64114
}
