import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { Router } from '@angular/router';
import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';

@Component({
  selector: 'app-contractor-card-list',
  templateUrl: './contractor-card-list.component.html',
  styleUrls: ['./contractor-card-list.component.css']
})
export class ContractorCardListComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  paramObj;
  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  columnDef;
  rowData = [];
  ActorID: any;
  PriceListTopicID;
  selectedRow: any;
  PercentWidth: number;
  MainMaxwidthPixel: number;
  HaveMaxBtn: boolean;
  RegionCode: any;
  UnitPatternID;
  constructor(private router: Router,
    private ProductRequest: ProductRequestService,
    private Region: RegionListService,
    private Actor: ActorService, ) {
    this.columnDef = [];

  }

  ngOnInit() {
    this.ActorID = this.InputParam.ActorID;
    this.PriceListTopicID = this.InputParam.PriceListTopicID;
    this.RegionCode = this.InputParam.RegionCode;
    this.UnitPatternID = this.InputParam.UnitPatternID;
    this.getNewData();
    this.ColumnsDefinition();
  }
  getNewData(): void {
    this.Actor.GetContractorCardList(this.ActorID , this.PriceListTopicID , this.RegionCode , this.UnitPatternID).subscribe(res => {
      this.rowData = res;
    });
  }


  popupclosed() {
    this.btnclicked = false;
    this.HaveHeader = null;
    this.HaveMaxBtn = null;
    this.startLeftPosition = null;
    this.startTopPosition = null;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;

  }

  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 486;
    this.startTopPosition = 211;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
  }

  closeModal() {
    this.Closed.emit(true);
  }


  ColumnsDefinition() {
    this.columnDef = [
      {
        headerName: '???????? ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName: '???????? ????????????',
        field: 'RegionName',
        width: 200,
        resizable: true
      },
      {
        headerName: '???? ??????????????',
        field: 'ProductRequestCode',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ??????????????',
        field: 'ProductRequestNo',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ??????????????',
        field: 'PersianProductRequestDate',
        width: 150,
        resizable: true
      },
      {
        headerName: '???????????? ????????',
        field: 'CostCenterName',
        width: 200,
        resizable: true
      },
      {
        headerName: '????????',
        field: 'PriceListTopicName',
        width: 200,
        resizable: true
      },
      {
        headerName: '?????????? ??????????????',
        field: 'Subject',
        width: 200,
        resizable: true
      },
      {
        headerName: '?????? ???????? ????????????',
        field: 'FinYearCode',
        width: 150,
        resizable: true
      },
      {
        headerName: '???? ??????????????',
        field: 'ContractCode',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ??????????????',
        field: 'ContractStatusName',
        width: 200,
        resizable: true
      },
      {
        headerName: '?????????? ?????????? ??????????',
        field: 'PersianFinalContractEndDate',
        width: 200,
        resizable: true
      },
      {
        headerName: '???? ??????????????',
        field: 'CommitionCode',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ??????????????',
        field: 'PersianCommitioDate',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ????????????',
        field: 'CommitionNo',
        width: 150,
        resizable: true
      },
      {
        headerName: '?????????? ????????????',
        field: 'OCSubject',
        width: 200,
        resizable: true
      },
      {
        headerName: '???? ????????????',
        field: 'DealTypeName',
        width: 120,
        resizable: true
      },
      {
        headerName: '???????? ??????????????',
        field: 'ContractAmount',
        width: 200,
        resizable: true,
        HaveThousand: true, 
      },
      {
        headerName: '???????? ??????????',
        field: 'SumProposalItemPrice',
        width: 200,
        resizable: true,
        HaveThousand: true, 
      }, // 62593
      // 
      // {
      //   headerName: '?????????? ???????? ??????????????', // RFC 51776
      //   field: 'PersianMinDate',
      //   width: 130,
      //   resizable: true
      // },
      // {
      //   headerName: '?????????? ???????????? ??????????????', // RFC 51776
      //   field: 'PersianMaxDate',
      //   width: 130,
      //   resizable: true
      // },
      // {
      //   headerName: '?????? ????????',
      //   field: 'TotalDay',
      //   width: 100,
      //   resizable: true
      // },
    ];
  }


  onShowProductRequest() {

    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = '?????????? ?????? ???????????? ???????????? ???????? ??????';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }

    this.type = 'product-request-page';
    this.HaveHeader = true;
    this.btnclicked = true;
    this.HaveMaxBtn = true;
    this.startLeftPosition = 15;
    this.startTopPosition = 5;
    this.HeightPercentWithMaxBtn = 97;
    this.PercentWidth = 90;
    this.MainMaxwidthPixel = 2000;
    this.MinHeightPixel = 645;
    this.paramObj = {
      CostFactorID: this.selectedRow.data.CostFactorID,
      Mode: 'EditMode',
      WorkFlowID: null,
      ReadyToConfirm: null,
      ContractTypeCode: -1,
      SelectedRow: null,
      ModuleViewTypeCode: 222222,
      IsRegionReadOnly: false,
      ModuleCode: 2730
    };
  }


  onShowContract() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = '?????????? ?????? ???????????? ???????????? ???????? ??????';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }

    if (this.selectedRow.data.ContractID == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = '???????????????? ?????? ???????????? ???????????? ???????? ??????';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }

    this.type = 'contract-case';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.HaveMaxBtn = true;
    //this.OverPixelWidth = 1290;
    this.startLeftPosition = 50;
    this.startTopPosition = 4;
    this.HeightPercentWithMaxBtn = 98;
    this.MinHeightPixel = 690;
    this.paramObj =
      {
        HeaderName: '???????? ??????????',
        ModuleCode: 2872,
        selectedRow: this.selectedRow,
        GridHeightInTab: 100,
        PanelHeightInTab: 99,
        HaveSave: false,
        IsViewable: true,
        IsEditable: false,
        ModuleViewTypeCode: 5555,
        SelectedContractID: this.selectedRow.data.ContractID,
        ProductRequestID: this.selectedRow.data.CostFactorID,
      };
  }

  onShowInquiryList() {
    if (this.selectedRow == null) {
      this.type = 'message-box';
      this.HaveHeader = true;
      this.alertMessageParams.message = '?????????? ?????? ???????????? ???????????? ???????? ??????';
      this.btnclicked = true;
      this.startLeftPosition = 500;
      this.startTopPosition = 250;
      return;
    }
    
    this.type = 'app-inquiry-list';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 350;
    this.startTopPosition = 130;
    this.HaveMaxBtn = false;
    this.paramObj = {
      // ProductRequestObject: this.ProductRequestObject,
      Subject: this.selectedRow.data.Subject,
      RegionCode: this.selectedRow.data.RegionCode,
      ProductRequestCode: this.selectedRow.data.ProductRequestNo,
      ProductRequestDate: this.selectedRow.data.ProductRequestDate,
      CostFactorID: this.selectedRow.data.CostFactorID,
      IsReadOnly: true,
      HeaderName: '???????????? ???????? ????????????????',
      ModuleViewTypeCode: 2,
      // PRRegionObject: this.PopupParam.CurrentRegionObject,
      ShowOnly: true,
      ModuleCode: 2730
    };
  }


  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
}
