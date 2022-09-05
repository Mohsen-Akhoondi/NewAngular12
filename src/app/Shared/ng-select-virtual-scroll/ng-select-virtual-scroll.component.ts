import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { isUndefined } from 'util';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
declare var $: any;

@Component({
  selector: 'app-ng-select-virtual-scroll',
  templateUrl: './ng-select-virtual-scroll.component.html',
  styleUrls: ['./ng-select-virtual-scroll.component.css']
})
export class NgSelectVirtualScrollComponent implements ICellEditorAngularComp, OnInit {
  @Input() NgSelectParams;
  @Input() Items;
  @Input() Disabled;
  @Input() CheckValidate;
  @Input() multiple = false;
  @Output() FetchMore: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() doSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() Open: EventEmitter<any> = new EventEmitter<any>();
  @Input() TotalItemCount = 0;
  @Input() PageCount = 0;
  CurrentGridParams;
  MoreIsCalled;
  TooltipText = '';
  OldSearchTerm = '';
  NgSelectClass;
  Owner;
  SelectedSearchOption = null;
  PageNumber = 1;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;
  @Input() MoreFunc: any;
  RedioChangeFunc: any;
  FetchByTerm: any;
  constructor(private RefreshItems: RefreshServices,
    private CommonServices: CommonService) { }

  ngOnInit() {

    this.NgSelectParams.clearable = isUndefined(this.NgSelectParams.clearable) ? true : this.NgSelectParams.clearable;

    this.NgSelectClass = 'ng-select-table';
    if (this.NgSelectParams.IsVirtualScroll) {
      this.RefreshItems.ItemsVirtualNgSelect.subscribe(res => {
        if ((!this.NgSelectParams.type || this.NgSelectParams.type === res.type) &&
          (this.OldSearchTerm === res.term || !res.term)) {
          if (res.TotalItemCount !== 0) {
            this.TotalItemCount = res.TotalItemCount;
            this.PageCount = res.PageCount;
          }
          this.Items = res.List;
          if (this.CurrentGridParams &&
            this.CurrentGridParams.value &&
            this.CurrentGridParams.node &&
            this.CurrentGridParams.node.data &&
            this.NgSelectParams) {
            this.NgSelectParams.selectedObject = this.CurrentGridParams.value[this.NgSelectParams.bindValueProp] ?
              this.CurrentGridParams.value[this.NgSelectParams.bindValueProp] :
              this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp] ?
                this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp] :
                this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp.replace(/Id/g, 'ID')] ?
                  this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp.replace(/Id/g, 'ID')] : null;

          }
          this.NgSelectParams.loading = false;
        }
      });
    } else {
      this.RefreshItems.ItemsVirtualNgSelect.subscribe(res => {
        if ((this.NgSelectParams.type === res.type) && Array.isArray(res.List)) {
          this.Items = res.List;
          if (this.CurrentGridParams &&
            this.CurrentGridParams.value &&
            this.CurrentGridParams.node &&
            this.CurrentGridParams.node.data &&
            this.NgSelectParams) {
            this.NgSelectParams.selectedObject = this.CurrentGridParams.value[this.NgSelectParams.bindValueProp] ?
              this.CurrentGridParams.value[this.NgSelectParams.bindValueProp] :
              this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp] ?
                this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp] :
                this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp.replace(/Id/g, 'ID')] ?
                  this.CurrentGridParams.node.data[this.NgSelectParams.bindValueProp.replace(/Id/g, 'ID')] : null;
          }
        }
      });
    }
    $(() => {
      $.contextMenu({
        selector: '.ng-select-disabled',
        callback: (key, options) => {
          this.CommonServices.copyText(options.$trigger[0].innerText);
        },

        items: {
          copy: { name: 'Copy', icon: 'copy' }
        }
      });
    });
  }
  mouseEnter() {
    if (this.Items &&
      this.Items.length > 0 &&
      this.NgSelectParams.selectedObject &&
      this.NgSelectParams.selectedObject.length &&
      this.NgSelectParams.selectedObject.length > 0) {
      let ATooltipText = '';
      this.NgSelectParams.selectedObject.forEach(element => {
        const Item = this.Items.filter((x: { [x: string]: any; }) => x[this.NgSelectParams.bindValueProp] === element)[0]
        ATooltipText += Item[this.NgSelectParams.bindLabelProp] + '\n';
      });
      this.TooltipText = ATooltipText;
    }
  }
  onScrollToEnd() {
    if (this.NgSelectParams &&
      this.NgSelectParams.IsVirtualScroll &&
      !this.NgSelectParams.loading &&
      this.TotalItemCount
      !== this.Items.length) {
      this.fetchMore();
    }
  }
  onScroll({ end }) {
    if (this.NgSelectParams && this.NgSelectParams.IsVirtualScroll) {
      if (this.NgSelectParams.loading || this.TotalItemCount === this.Items.length) {
        return;
      }
      const NeedMore = end + this.numberOfItemsFromEndBeforeFetchingMore;
      let HaveMore = true;
      if (this.MoreIsCalled) {
        HaveMore = NeedMore > (this.NgSelectParams.PageSize - this.numberOfItemsFromEndBeforeFetchingMore) + this.MoreIsCalled;
      }
      if (HaveMore && NeedMore >= this.Items.length) {
        this.MoreIsCalled = end + this.numberOfItemsFromEndBeforeFetchingMore;
        this.fetchMore();
      }
    }
  }
  private fetchMore() {
    const PageNumber = Math.round((this.Items.length / this.NgSelectParams.PageSize) + 1);

    if (PageNumber <= this.PageCount && PageNumber > 1) {
      if (this.MoreFunc) {
        // tslint:disable-next-line:max-line-length
        this.MoreFunc({ PageNumber: PageNumber, PageSize: this.NgSelectParams.PageSize, CurrentItems: this.Items, Owner: this.Owner, term: this.OldSearchTerm, SearchOption: this.SelectedSearchOption });
      } else {
        // tslint:disable-next-line:max-line-length
        this.FetchMore.emit({ PageNumber: PageNumber, PageSize: this.NgSelectParams.PageSize, CurrentItems: this.Items, term: this.OldSearchTerm, SearchOption: this.SelectedSearchOption });
      }
    }
  }
  onChangeselectedObject(event) {
    this.selectedChange.emit(event);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes && changes.Items && changes.Items.currentValue) {
      this.Items = changes.Items.currentValue;
    }
    if (changes && changes.NgSelectParams && changes.NgSelectParams.currentValue) {
      this.NgSelectParams = changes.NgSelectParams.currentValue;
    }
    if (changes && changes.CheckValidate && changes.CheckValidate.currentValue) {
      this.CheckValidate = changes.CheckValidate.currentValue;
    }
    if (changes && changes.Disabled && changes.Disabled.currentValue) {
      this.Disabled = changes.Disabled.currentValue;
    }
    if (changes && changes.TotalItemCount && changes.TotalItemCount.currentValue) {
      this.TotalItemCount = changes.TotalItemCount.currentValue;
    }
    if (changes && changes.PageCount && changes.PageCount.currentValue) {
      this.PageCount = changes.PageCount.currentValue;
    }
  }
  customSearchFn = (term, item) => {
    return true;
  }
  OnSearch(term) {
    if (this.SelectedSearchOption) {
      const CurrOption = this.NgSelectParams.AdvanceSearch.SearchItemDetails.filter(x => x.SearchOption === this.SelectedSearchOption)[0];
      if (CurrOption &&
        (CurrOption.TermLenght && term.length !== CurrOption.TermLenght) ||
        (CurrOption.MinTermLenght && term.length < CurrOption.MinTermLenght) &&
        (!this.OldSearchTerm || this.OldSearchTerm.length < term.length)
      ) {
        term = '';
        return;
      }
    }
    if (this.OldSearchTerm !== term && term !== 'null') {
      if (this.NgSelectParams && this.NgSelectParams.IsVirtualScroll) {
        this.OldSearchTerm = term;
        if (this.FetchByTerm) {
          this.FetchByTerm({
            term: term, PageNumber: 1,
            PageSize: this.NgSelectParams.PageSize,
            Owner: this.Owner,
            SearchOption: this.SelectedSearchOption
          });
        } else {
          // tslint:disable-next-line:max-line-length
          this.doSearch.emit({ term: term, PageNumber: 1, PageSize: this.NgSelectParams.PageSize, SearchOption: this.SelectedSearchOption });
        }
      } else {
        if (this.FetchByTerm) {
          this.FetchByTerm({ term: term, Owner: this.Owner });
        } else {
          this.doSearch.emit({ term: term, SearchOption: this.SelectedSearchOption });
        }
      }
    }
  }
  OnOpen() {
    this.OldSearchTerm = '';
    if (this.NgSelectParams && this.NgSelectParams.AdvanceSearch && this.NgSelectParams.AdvanceSearch.SearchItemDetails[0]) {
      this.SelectedSearchOption = this.NgSelectParams.AdvanceSearch.SearchItemDetails[0].SearchOption;
    }

    this.Open.emit();
  }
  onRedioClick(param) {
    this.SelectedSearchOption = param;
    if (this.RedioChangeFunc) {
      this.RedioChangeFunc({ SearchOption: this.SelectedSearchOption, Owner: this.Owner });
    }
  }
  // ---------------------------------------------------------

  getValue() {
    if (this.Items) {
      // tslint:disable-next-line:max-line-length
      return this.Items.filter((x: { [x: string]: any; }) => x[this.NgSelectParams.bindValueProp] === this.NgSelectParams.selectedObject)[0];
    } else { return ''; }
  }

  isPopup?(): boolean {
    return false;
  }
  isCancelBeforeStart?(): boolean {
    return false;
  }
  isCancelAfterEnd?(): boolean {
    return false;
  }
  focusIn?(): void {
  }
  focusOut?(): void {
  }
  agInit(data): void {
    this.CurrentGridParams = data;
    this.SelectedSearchOption = null;
    if (data.Params) {
      this.NgSelectParams = data.Params;
      if (data.Params.AdvanceSearch && data.Params.AdvanceSearch.SearchItemDetails) {
        this.SelectedSearchOption = data.Params.AdvanceSearch.SearchItemDetails[0].SearchOption;
      }
    }
    if (data.Items) {
      this.Items = data.Items;
      if (data.value && data.node && data.node.data && this.NgSelectParams) {
        this.NgSelectParams.selectedObject = data.value[this.NgSelectParams.bindValueProp] ?
          data.value[this.NgSelectParams.bindValueProp] :
          data.node.data[this.NgSelectParams.bindValueProp] ?
            data.node.data[this.NgSelectParams.bindValueProp] :
            data.node.data[this.NgSelectParams.bindValueProp.replace(/Id/g, 'ID')] ?
              data.node.data[this.NgSelectParams.bindValueProp.replace(/Id/g, 'ID')] : null;
      }
    }
    if (data.MoreFunc) {
      this.MoreFunc = data.MoreFunc;
    }

    if (data.FetchByTerm) {
      this.FetchByTerm = data.FetchByTerm;
    }
    if (data.multiple) {
      this.multiple = data.multiple;
    }
    if (data.Owner) {
      this.Owner = data.Owner;
    }

    if (data.RedioChangeFunc) {
      this.RedioChangeFunc = data.RedioChangeFunc;
    }
  }
  afterGuiAttached?(params): void {
  }
}
