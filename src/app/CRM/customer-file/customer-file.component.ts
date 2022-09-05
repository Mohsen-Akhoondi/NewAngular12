import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CustomerOrderService } from 'src/app/Services/CRM/CustomerOrderService';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-file',
  templateUrl: './customer-file.component.html',
  styleUrls: ['./customer-file.component.css']
})
export class CustomerFileComponent implements OnInit {
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  @Input() InputParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  CheckValidate = false;
  PersonReqItems: any;
  columnDef;
  AgridApi: any;
  DeptAgridApi: any;
  rowData = [];
  DeptrowData = [];
  Address: any;
  ModuleCode;
  DisablePerson = false;
  NgSelectPersonReqParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
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
    type: 'user-person-Req-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'شناسه ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام شخص', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'شناسه ملي', width: 35, },
        { HeaderCaption: 'نام شخص', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  SumDebitAmount: any;
  SumCreditAmount: any;
  DeptcolumnDef: any[];

  constructor(private RefreshPersonItems: RefreshServices,
    private ActorList: ActorService,
    private CustomerOrder: CustomerOrderService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    if (this.InputParam && this.InputParam.ActorId) {
      this.DisablePerson = this.InputParam.DisablePerson;
      this.PersonReqOpened(this.InputParam.ActorId);
      this.onChangePerson(this.InputParam.ActorId);
      this.NgSelectPersonReqParams.selectedObject = this.InputParam.ActorId;
    }

    this.DeptcolumnDef =
      [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: 'شماره سند',
          field: 'VoucherCode',
          width: 100,
          resizable: true
        },
        {
          headerName: 'تاریخ سند',
          field: 'VoucherDate',
          width: 100,
          resizable: true
        },
        {
          headerName: ' ردیف سند ',
          field: 'VoucherNo',
          width: 100,
          resizable: true
        },
        {
          headerName: ' شرح ',
          field: 'Subject',
          width: 600,
          resizable: true
        },
        {
          headerName: ' درخواست وجه ',
          field: 'FeeCode',
          width: 100,
          resizable: true
        },
        {
          headerName: ' کد محصول ',
          field: 'CostProductCode',
          width: 150,
          resizable: true
        },
        {
          headerName: ' نام محصول ',
          field: 'CostProductName',
          width: 200,
          resizable: true
        },
        {
          headerName: ' بدهکار ',
          field: 'DebitAmount',
          width: 200,
          resizable: true,
          HaveThousand: true,
        },
        {
          headerName: ' بستانکار ',
          field: 'CreditAmount',
          width: 200,
          resizable: true,
          HaveThousand: true,
        },

      ];
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 50,
        resizable: true
      },
      {
        headerName: 'شماره سند',
        field: 'VoucherCode',
        width: 100,
        resizable: true
      },
      {
        headerName: 'تاریخ سند',
        field: 'VoucherDate',
        width: 100,
        resizable: true
      },
      {
        headerName: ' ردیف سند ',
        field: 'VoucherNo',
        width: 100,
        resizable: true
      },
      {
        headerName: ' شرح ',
        field: 'Subject',
        width: 600,
        resizable: true
      },
      {
        headerName: ' درخواست وجه ',
        field: 'FeeCode',
        width: 100,
        resizable: true
      },
      {
        headerName: ' کد محصول ',
        field: 'CostProductCode',
        width: 150,
        resizable: true
      },
      {
        headerName: ' نام محصول ',
        field: 'CostProductName',
        width: 200,
        resizable: true
      },
      {
        headerName: ' بدهکار ',
        field: 'DebitAmount',
        width: 200,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: ' بستانکار ',
        field: 'CreditAmount',
        width: 200,
        resizable: true,
        HaveThousand: true,
      },

    ];
  }

  PersonReq_FetchMore(event) {
    this.NgSelectPersonReqParams.loading = true;
    const ResultList = [];
    // tslint:disable-next-line: no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      this.ActorList.GetCustomerActorPaging(event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption,
        false,
        false, false).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
            this.PersonReqItems.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
            this.PersonReqItems.push(element);
          });
          resolve(res.TotalItemCount);
        }
        );
    }).then((TotalItemCount: number) => {
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }

  PersonReqOpened(ActorID = null) {
    this.ActorList.GetCustomerActorPaging(1, 30, '', '', false, false, false, ActorID).subscribe(res => {
      this.PersonReqItems = res.List;
      this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: res.List,
        TotalItemCount: res.TotalItemCount,
        PageCount: Math.ceil(res.TotalItemCount / 30),
        type: 'user-person-Req-search'
      });
    });
  }

  Person_Req_DoSearch(event) {
    this.NgSelectPersonReqParams.loading = true;
    this.ActorList.GetCustomerActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
      false, false, false).subscribe(res => {
        this.PersonReqItems = res.List,
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'user-person-Req-search'
          });
      });
    this.NgSelectPersonReqParams.loading = false;
  }

  onChangePerson(ActorID) {
    if(ActorID !== null)
    {
      this.CustomerOrder.GetCustomerDept(ActorID, '342', '051', '051').subscribe(res => {
        this.rowData = res.CustomerDeptInfoList;
        //this.SumDebitAmount = res.SumDebitAmount;
        this.SumCreditAmount = res.SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
      });
      this.CustomerOrder.GetCustomerDept(ActorID, '131', '001', '005').subscribe(res => {
        this.DeptrowData = res.CustomerDeptInfoList;
        this.SumDebitAmount = res.SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        //this.SumCreditAmount = res.SumCreditAmount;
  
      });
      this.ActorList.GetActorByActorID(ActorID, true).subscribe(res => {
        this.Address = res.Address;
      });

    }
  }
  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  onDeptGridReady(params: { api: any; }) {
    this.DeptAgridApi = params.api;
  }

  close(): void {
    if (this.ModuleCode && this.ModuleCode == 3056) {
      this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
    }
    else {
      this.Closed.emit(true);
    }
  }



}
