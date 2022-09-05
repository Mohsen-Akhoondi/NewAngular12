import { Component, OnInit } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ModuleService } from 'src/app/Services/BaseService/ModuleService';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { isUndefined } from 'util';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';

@Component({
  selector: 'app-request-item-entity-page',
  templateUrl: './request-item-entity-page.component.html',
  styleUrls: ['./request-item-entity-page.component.css']
})
export class RequestItemEntityPageComponent implements OnInit {
  RowData: any = [];
  Dto: any;
  type: string;
//////////////////// اقلام درخواست ///////////////
  private PRIgridApi;
  PRItemcolumnDef;
  PRItemrowData: any = [];
//////////////////// موجودیت ///////////////
  private RIEgridApi;
  RIEntitycolumnDef;
  RIEntityrowData = [];
//////////////////// واحد اجرایی //////////////
  ReigonListSet = [];
  NgSelectRegionParams = {
    Items: [],
    bindLabelProp: 'RegionCodeName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    clearable: false
  };
//////////////////// درخواست /////////////
  RequestTotalItemCount;
  RequestPageCount;
  RequestItems = [];
  RequestParams = {
    Items: [],
    bindLabelProp: 'ProductRequestCodeSub',
    bindValueProp: 'CostFactorID',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    DropDownMinWidth: '300px',
    TotalItemCount: 0,
    Required: true,
    type: 'product-request',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره', HeaderName: 'ProductRequestNo', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestNo' },
        { HeaderCaption: 'کد', HeaderName: 'ProductRequestCode', width: 35, MinTermLenght: 1, SearchOption: 'ProductRequestCode' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره', width: 35, },
        { HeaderCaption: 'کد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  currentRequestSearchTerm;
////////////////////////////////////
private sub: any;
ModuleCode;
btnclicked = false;
HaveMaxBtn = false;
startLeftPosition: number;
startTopPosition: number;
PopupType;
alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
HaveHeader = false;
defaultSelectedRowIndex = 0;
SelectedPRItemRow: any;
SelectedRIEntityRow: any;
SelectedPRIEntityItem: any;
HasRegion: boolean;
///////////////////////////////////
WidthNoRegion = 40;
WidthwithRegionNg = 70;
//////////////////////////////////
EntityTypeParams = {
  bindLabelProp: 'Subject',
  bindValueProp: 'EntityTypeID',
  placeholder: '',
  MinWidth: '150px',
  selectedObject: null,
  loading: false,
  IsVirtualScroll: false,
  IsDisabled: false,
  type: 'entity-type'
};
  constructor(private RegionService: RegionListService,
              private ProductRequest: ProductRequestService,
              private Module: ModuleService,
              private route: ActivatedRoute,
              private RefreshItems: RefreshServices,
              private ContractService: ContractListService,
              private router: Router,
              private Common: CommonService
    ) {
       this.sub = this.route.params.subscribe(params => {
         this.ModuleCode = +params['ModuleCode'];
      });
//////////////////// ستون اقلام درخواست //////////////////////
      this.PRItemcolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'نوع درخواستی',
          field: 'ProductTypeName',
          width: 120,
          resizable: true,
        },
        {
          headerName: 'کالا/خدمت',
          field: 'ProductName',
          width: 350,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          width: 250,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ شروع پیشنهادی',
          field: 'PersianStartDate',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'تاریخ پایان پیشنهادی',
          field: 'PersianEndDate',
          width: 130,
          resizable: true,
        },
        {
          headerName: 'تعداد',
          field: 'QTY',
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد پیشنهادی',
          field: 'Amount',
          HaveThousand: true,
          width: 120,
          resizable: true,
        },
        {
          headerName: 'مبلغ پیشنهادی',
          field: 'FinalAmount',
          HaveThousand: true,
          width: 120,
          resizable: true,
        },
      ];

      this.RIEntitycolumnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: ' موضوع',
          field: 'Subject',
          cellEditorFramework: NgSelectVirtualScrollComponent,
          cellEditorParams: {
            Params: this.EntityTypeParams,
            Items: [],
          },
           cellRenderer: 'SeRender',
           valueFormatter: function currencyFormatter(params) {
             if (params.value) {
                return params.value.Subject;
             } else {
               return '';
             }
           },
           valueSetter: (params) => {
             if (params.newValue && params.newValue.Subject) {
               params.data.Subject = params.newValue.Subject;
               params.data.EntityTypeID = params.newValue.EntityTypeID;
                return true;
             } else {
               params.data.EntityTypeID = null;
               params.data.Subject = '';
               return false;
             }
           },
          editable: true,
          width: 400,
          resizable: true,
        },

      ];
  }
//////////////////////////////////////////
  ngOnInit() {
    this.RegionService.GetRegionList(this.ModuleCode, true).subscribe(res => {
      this.HasRegion = res.length > 0;
      if (this.HasRegion) {
        this.ReigonListSet = res;
        this.NgSelectRegionParams.selectedObject = res[0].RegionCode;
      } else {
        this.WidthNoRegion = 50;
        this.WidthwithRegionNg = 70;
      }
    });
  }
//////////////////////////////////////////
  onPRItemGridReady(Param) { // اقلام درخواست
    this.PRIgridApi = Param.api;
  }
  onRIEGridReady(Param) { // موجودیت
    this.RIEgridApi = Param.api;
  }
//////////////////// change کمبوها //////////////////////
  onChangeReigonObj(event) { // واحد اجرایی
    this.RequestParams.selectedObject = null;
    this.PRItemrowData = [];
    this.RIEntityrowData = [];
  }
  onChangePRequestObj(event) { // درخواست
    if (event === null) {
      this.PRItemrowData = [];
      this.RIEntityrowData = [];
    }
    this.ProductRequest.GetProdRequestItemListWithReqItemEntityByPRID(event).subscribe(res => {
      if (res) {
        this.PRItemrowData = res;
      }
    });
    this.OnOpenNgSelect('Contract', event);
  }
//////////////////// Open کمبوها //////////////////////
  OnOpenNgSelect(type, SelectedID: number = null) {
          this.RequestParams.loading = true;
          this.ProductRequest.GetProductRequestIsInContractPaging(1, 30, '',
            '', this.NgSelectRegionParams.selectedObject, SelectedID).subscribe((res: any) => {
              res.List.forEach(element => {
                if (element.ProductRequestNo) {
                  element.ProductRequestCodeSub = element.ProductRequestNo + ' - ' + element.Subject;
                } else if (element.Subject) {
                  element.ProductRequestCodeSub = element.Subject;
                } else if (element.ProductRequestCode) {
                  element.ProductRequestCodeSub = element.ProductRequestCode;
                }
              });
              this.RequestItems = res.List;
              this.RefreshItems.RefreshItemsVirtualNgSelect({
                List: res.List,
                TotalItemCount: res.TotalItemCount,
                PageCount: Math.ceil(res.TotalItemCount / 30),
                type: 'product-request'
              });
              if (SelectedID) {
                const SelectedProdReqObj = res.List.filter(x => x.CostFactorID === SelectedID)[0];
                this.RequestParams.selectedObject = SelectedProdReqObj.CostFactorID;
                this.ProductRequest.GetProdRequestItemListWithReqItemEntityByPRID(this.RequestParams.selectedObject).subscribe(ress => {
                  if (ress) {
                    this.PRItemrowData = ress;
                  }
                });
              }
              this.RequestParams.loading = false;
            });
  }
////////////////////////////////////////// کمبو درخواست
FetchMoreRequest(event) {
  this.RequestParams.loading = true;
  const ResultList = [];
  const promise = new Promise((resolve, reject) => {
  this.ProductRequest.GetProductRequestIsInContractPaging(event.PageNumber, event.PageSize, event.term,
    event.SearchOption, this.NgSelectRegionParams.selectedObject, null).subscribe((res: any) => {
      event.CurrentItems.forEach(el => {
        ResultList.push(el);
      });
      res.List.forEach(element => {
        if (element.ProductRequestNo) {
          element.ProductRequestCodeSub = element.ProductRequestNo;
        }
        if (element.search) {
          element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
        }
        if (element.ProductRequestCode) {
          element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
        }
        ResultList.push(element);
        this.RequestItems = ResultList;
      });
        resolve(res.TotalItemCount);
    });
  }).then((TotalItemCount: number) => {
      this.RefreshItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'product-request'
      });
    });
    this.RequestParams.loading = false;
}

doRequestSearch(event) {
  this.currentRequestSearchTerm = event.term;

    this.RequestParams.loading = true;

  if (event.SearchOption === 'null' || event.SearchOption == null) {
    event.SearchOption = 'ProductRequestNo';
  }
  this.ProductRequest.GetProductRequestIsInContractPaging(event.PageNumber, event.PageSize, event.term,
    event.SearchOption, this.NgSelectRegionParams.selectedObject, null).subscribe((res: any) => {
      if (this.currentRequestSearchTerm === event.term) {
        res.List.forEach(element => {
          if (element.ProductRequestNo) {
            element.ProductRequestCodeSub = element.ProductRequestNo;
          }
          if (element.search) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.Subject;
          }
          if (element.ProductRequestCode) {
            element.ProductRequestCodeSub = element.ProductRequestCodeSub + ' - ' + element.ProductRequestCode;
          }
        });

          this.RequestItems = res.List;
          this.RefreshItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'product-request'
          });
      }
    });
}
//////////////////// RowClick //////////////////////
PRItemRowClick(event) { // اقلام درخواست
  this.RIEgridApi.stopEditing();
  if (event.data.ProductRequestEntityList) {
    this.RIEntityrowData = event.data.ProductRequestEntityList;
  } else {
    this.RIEntityrowData = [];
  }
  this.SelectedPRItemRow = event.data;
}

RIEntityRowClick(event) { // موجودیت
  this.SelectedRIEntityRow = event.data;
}
//////////////////////////////////////////
closeModal() {
  this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
}
//////////////////// Save //////////////////////
onSave() {
   this.RIEgridApi.stopEditing();
   this.PRIgridApi.stopEditing();
   const ProductRequestEntityList = [];
   this.PRIgridApi.forEachNode(function (node) {
    ProductRequestEntityList.push(node.data);
   });
   this.ProductRequest.SaveProductRequestEntity(ProductRequestEntityList, this.RequestParams.selectedObject).subscribe(res => {
  if (res && res != null) {
       this.PRItemrowData = res;
       this.ShowMessageBoxWithOkBtn('ثبت اطلاعات با موفقیت انجام شد');
     }
   },
     err => {
       if (!err.error.Message.includes('|')) {
         this.ShowMessageBoxWithOkBtn('ثبت با شکست مواجه شد');
       }
     }
   );
 }
//////////////////////////////////////////
ShowMessageBoxWithYesNoBtn(message) {
  this.btnclicked = true;
  this.PopupType = 'message-box';
  this.HaveHeader = true;
  this.HaveMaxBtn = false;
  this.startLeftPosition = 449;
  this.startTopPosition = 87;
  this.alertMessageParams.message = message;
  this.alertMessageParams.HaveOkBtn = false;
  this.alertMessageParams.HaveYesBtn = true;
  this.alertMessageParams.HaveNoBtn = true;
}

ShowMessageBoxWithOkBtn(message) {
  this.btnclicked = true;
  this.PopupType = 'message-box';
  this.HaveHeader = true;
  this.HaveMaxBtn = false;
  this.startLeftPosition = 545;
  this.startTopPosition = 207;
  this.alertMessageParams.message = message;
  this.alertMessageParams.HaveOkBtn = true;
  this.alertMessageParams.HaveNoBtn = false;
  this.alertMessageParams.HaveYesBtn = false;
}
//////////////////////////////////////////
popupclosed() {
  this.btnclicked = false;
  this.HaveMaxBtn = false;
  this.PopupType = '';
}
RIEntityCellValueChanged(event) { // موجودیت
  const items = [];
  this.RIEgridApi.forEachNode(node => {
    node.data.ProductRequestEntityID = node.data.ProductRequestEntityID && node.data.ProductRequestEntityID > 0
                                      && !isUndefined(node.data.ProductRequestEntityID) ? node.data.ProductRequestEntityID : -1;

    node.data.ProductRequestItemID = node.data.ProductRequestItemID && node.data.ProductRequestItemID > 0
                                     && !isUndefined(node.data.ProductRequestItemID) ? node.data.ProductRequestItemID
                                     : this.SelectedPRItemRow.ProductRequestItemID;
    items.push(node.data);
  });
  this.SelectedPRItemRow.ProductRequestEntityList = items;
}

RIEntityonDeletedRow(event) { // موجودیت
  if (event) {
    const items = [];
    this.RIEgridApi.forEachNode(node => {
      items.push(node.data);
    });
    this.SelectedPRItemRow.ProductRequestEntityList = items;
  }
}
oncellEditingStarted(event) {
  if (event.colDef && event.colDef.field === 'Subject') {
     this.ProductRequest.GetAllEntityType().subscribe(res => {
     this.RefreshItems.RefreshItemsVirtualNgSelect({
       List: res,
       type: 'entity-type'
     });
   });
 }
}
}
