import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-product-pattern-product-entry',
  templateUrl: './product-pattern-product-entry.component.html',
  styleUrls: ['./product-pattern-product-entry.component.css']
})
export class ProductPatternProductEntryComponent implements OnInit {
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  @Input() InputParam;
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  productItems = [{ ProductTypeCode: 1, ProductTypeName: 'کالا' },
  { ProductTypeCode: 2, ProductTypeName: 'خدمت' }];
  ProductReqItems: any;
  ProductPatternID;
  ModuleCode;
  IsInsert = false;
  isClicked: boolean;
  PopUpType: string;
  startLeftPosition: number;
  startTopPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CheckValidate = false;
  ProductParams = {
    bindLabelProp: 'ProductTypeName',
    bindValueProp: 'ProductTypeCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  NgSelectProductReqParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'ProductID',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'product',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: ' کد', HeaderName: 'ProductID', width: 35, MinTermLenght: 1, SearchOption: 0 },
        { HeaderCaption: 'نام ', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 1 }
        ],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ', width: 35, },
        { HeaderCaption: 'نام ', width: 53, }
        ],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  }
  RequiredComponents = [this.NgSelectProductReqParams];

  constructor(private ProductRequest: ProductRequestService,
    private RefreshProductItems: RefreshServices,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {

  }

  insert() {
    this.ProductPatternID = this.InputParam.ProductPatternID;
    this.CheckValidate = true;
    let ValidateForm = true;
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {
      ValidateForm = ValidateForm

      if (ValidateForm) {
        this.NgSelectProductReqParams.selectedObject
        this.ProductRequest.SaveProductPatternProduct(this.NgSelectProductReqParams.selectedObject, this.ProductPatternID, this.ModuleCode).subscribe((res: any) => {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          this.OutPutParam.emit(true);

        });
      }
      else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });
  }

  closeModal() {
    this.Closed.emit(true);
  }
  onChangeProduct(Aproduct) {
    this.ProductParams.selectedObject = Aproduct;
    this.NgSelectProductReqParams.selectedObject = null;
  }

  ProductReq_FetchMore(event) {
    this.NgSelectProductReqParams.loading = true;
    const ResultList = [];
    const promise = new Promise((resolve, reject) => {
      this.ProductRequest.GetProductList(event.SearchOption,
        null,
        event.term,
        event.PageNumber,
        event.PageSize,
        this.ProductParams.selectedObject,
        true,
        null).
        subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      this.RefreshProductItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'product'
      });
    });
  }


  ProductReqOpened() {

    this.ProductRequest.GetProductList(0,
      null,
      '',
      1,
      30,
      this.ProductParams.selectedObject,
      true,
      null).
      subscribe(res => {
        this.ProductReqItems = res.List;
        this.RefreshProductItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'product'
        });
      });

  }
  ProductDoSearch(event) {
    this.NgSelectProductReqParams.loading = true;
    this.ProductRequest.GetProductList(event.SearchOption,
      null,
      event.term,
      event.PageNumber,
      event.PageSize,
      this.ProductParams.selectedObject,
      true,
      null).
      subscribe(res => {
        this.RefreshProductItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'product'
        });
      });
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.startTopPosition = 182;
    this.startLeftPosition = 557;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed() {
    this.isClicked = false;
  }

  getOutPutParam(event) {
    
  }

}
