import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { PriceListService } from 'src/app/Services/BaseService/PriceListService';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { TreeSelectComponent } from 'src/app/Shared/tree-select/tree-select.component';
declare var $: any;

@Component({
  selector: 'app-product-request-person-estimate',
  templateUrl: './product-request-person-estimate.component.html',
  styleUrls: ['./product-request-person-estimate.component.css']
})
export class ProductRequestPersonEstimateComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() ProductRequestPersonClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  ProductRequestCode;
  ProductRequestDate;
  Subject;
  CostFactorID;
  ProdReqItemColDef;
  ProdReqPersonColDef;
  ProdReqItemrowData = [];
  ProdReqPersonrowData = [];
  SelectedRegionCode;
  beforeID;
  ProdReqItemApi;
  PopUpType;
  MinHeightPixel;
  RegionName;
  PriceListPatternID;
  ProductRequestObject;
  btnclicked = false;
  selectedPRItemRow;
  SelectedProductRequestItemID: any;
  ProdReqEstApi;
  isClicked = false;
  startLeftPosition;
  startTopPosition;
  HaveMaxBtn;
  IsNotFound = false;
  BtnClickedName;
  HaveHeader;
  WeightProdReqItemColDef;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  PercentWidth: number;
  MainMaxwidthPixel: number;
  HaveSave = false;
  HaveDelete = false;
  HaveUpdate = false;
  ContractCode: any;
  IsPersonEditable = false;
  ProdReqPersonApi;
  selectedItemRow;
  BeforePersonID;
  PRItemApi;
  BusinessPatternParams =
  {
    bindLable: 'BusinessPatternName',
    bindValue: 'BusinessPatternID',
    ObjectID: 'BusinessPatternID',
    ParentObjectID: 'ParentBusinessPatternID',
    SelectedValue: null,
    Disabled: false,
    AllowParentSelection: true,
    TextSpanWidth: 150,

  };

  constructor(private ProductRequest: ProductRequestService,
    private PriceList: PriceListService,
    private User: UserSettingsService, ) {
      this.WeightProdReqItemColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: 'کالا/خدمت',
          field: 'ProductName',
          editable: true,
          width: 300,
          resizable: true
        },
        {
          headerName: 'واحد',
          field: 'ScaleName',
          width: 120,
          resizable: true
        },
        {
          headerName: 'تاریخ شروع',
          field: 'PersianStartDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تاریخ پایان',
          field: 'PersianEndDate',
          width: 100,
          resizable: true,
        },
        {
          headerName: 'تعداد',
          field: 'QTY',
          editable: true,
          HaveThousand: true,
          width: 90,
          resizable: true
        },
        {
          headerName: 'مبلغ واحد',
          field: 'Amount',
          editable: true,
          HaveThousand: true,
          width: 120,
          resizable: true,
        },
        {
          headerName: 'مبلغ',
          field: 'FinalAmount',
          HaveThousand: true,
          width: 120,
          resizable: true
        },
        {
          headerName: 'موضوع',
          field: 'Subject',
          editable: true,
          width: 450,
          resizable: true
        },
        {
          headerName: 'مبلغ متره',
          field: 'Amount',
          width: 150,
          HaveThousand: true,
          resizable: true
        },
        {
          headerName: 'مبلغ متره با ضرایب ردیف',
          field: 'AmountCOEF',
          HaveThousand: true,
          width: 150,
          resizable: true
        },
        {
          headerName: 'مبلغ کل',
          field: 'AmountCOEFPact',
          HaveThousand: true,
          width: 150,
          resizable: true
        }
      ];
      this.ProdReqPersonColDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 70,
          resizable: true
        },
        {
          headerName: ' کسب وکار ',
          field: 'BusinessPatternName',
          editable: true,
          width: 300,
          resizable: true,
          cellEditorFramework: TreeSelectComponent,
          cellEditorParams: {
            Params: this.BusinessPatternParams,
            Items: [],
          },
          cellRenderer: 'SeRender',
          valueFormatter: function currencyFormatter(params) {
            if (params.value) {
              return params.value.BusinessPatternName;
            } else {
              return '';
            }
          },
        },
        {
          headerName: 'سال تحصیل',
          field: 'EducationYear',
          width: 100,
          editable: true,
          resizable: true
        },
        {
          headerName: 'سال تجربه',
          field: 'ExperienceYear',
          width: 100,
          editable: true,
          resizable: true
        },
        {
          headerName: 'حقوق ماهانه',
          field: 'Amount',
          width: 150,
          editable: true,
          resizable: true
        },
          {
            headerName: 'ضریب سرپرستی',
            field: 'ManagementCOEF',
            width: 100,
            editable: true,
            resizable: true
          },
          {
            headerName: 'ضریب فارغ التحصيل ممتاز',
            field: 'TopGraduated',
            width: 160,
            editable: true,
            resizable: true
          },
          {
            headerName: 'مدت (ماه)',
            field: 'Qty',
            width: 90,
            editable: true,
            resizable: true
          },
        {
          headerName: 'حاصلضرب ضرایب',
          field: 'MultiplyTheCoefficients',
          width: 150,
          editable: false,
          resizable: true
        },
        {
          headerName: 'حق الزحمه کل',
          field: 'S',
          width: 200,
          HaveThousand: true,
          editable: false,
          resizable: true
        }
      ];
     }

  ngOnInit() {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.Subject = this.PopupParam.Subject;
    this.ProductRequestDate = this.PopupParam.ProductRequestDate;
    this.ProductRequestCode = this.PopupParam.ProductRequestCode;
    this.SelectedRegionCode = this.PopupParam.RegionCode;
    this.CostFactorID = this.PopupParam.CostFactorID;
    this.ProdReqItemrowData = [];
    this.ProdReqItemrowData = this.ProductRequestObject.ProductRequestItemList;
    this.ProdReqPersonColDef[1].cellEditorParams.Items = this.ProductRequest.GetBusinessPattern();
    this.User.GetModulOPByUser(2516).subscribe(res => {
      res.forEach(node => {
        switch (node.OperationCode) {

          case 7:
            this.HaveSave = true;
            break;

          case 6:
            this.HaveDelete = true;
            break;

          case 16:
            this.HaveUpdate = true;
            break;

          default:
            break;
        }

      });
    });
  }

  onProdReqPersonGridReady(params: { api: any; }) {
    this.ProdReqPersonApi = params.api;
  }


  onPRItemGridready(params: { api: any; }) {
    this.PRItemApi = params.api;
  }

  oncellEditingStarted(event) {
  }

  onPRItemRowClick(event) {
    this.selectedItemRow = event;
    this.IsPersonEditable = true;

    const rowData = [];
    this.ProdReqPersonApi.forEachNode(function (node) {
      rowData.push(node.data);
    });

    this.ProdReqPersonApi.updateRowData({ remove: rowData });

    if (!this.BeforePersonID) {
      this.ProdReqPersonrowData = event.data.RequestPersonEstimateList;
    }

    if (this.BeforePersonID && this.BeforePersonID !== event.data.ProductRequestItemID) {

      this.PRItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.BeforePersonID) {
          item.data.RequestPersonEstimateList = rowData;
        }

        if (item.data.ProductRequestItemID === event.data.ProductRequestItemID) {
          this.ProdReqPersonrowData = item.data.RequestPersonEstimateList;
        }
      });
    }

    if (this.BeforePersonID && this.BeforePersonID === event.data.ProductRequestItemID) {
      this.PRItemApi.forEachNode((item) => {
        if (item.data.ProductRequestItemID === this.BeforePersonID) {
          this.ProdReqPersonApi.updateRowData({ add: rowData });
        }
      });
    }

    this.BeforePersonID = event.data.ProductRequestItemID;
  }

  onSave() {
    this.PRItemApi.stopEditing();
    this.ProdReqPersonApi.stopEditing();
    const PersonEstimateList = [];
    this.ProdReqPersonApi.forEachNode(node => {
      PersonEstimateList.push(node.data);
    });

    this.PRItemApi.forEachNode(node => {
      if (node.data.ProductRequestItemID === this.BeforePersonID) {
        node.data.RequestPersonEstimateList = PersonEstimateList;
      }
    });

    const ProdReqItemList = [];
    this.PRItemApi.forEachNode(node => {
      let ItemNo = 0;
      node.data.ProductRequestEstimateDataList = [];
      node.data.ProductRequestEstimateList.forEach(item => {
        const EstimateObj = {
          ProductRequestEstimateID: item.ProductRequestEstimateID ? item.ProductRequestEstimateID : -1,
          ProductRequestItemID: node.data.ProductRequestItemID,
          ItemNo: ++ItemNo,
          PriceListPatternID: item.PriceListPatternID,
          Qty: item.Qty,
          Amount: item.Amount,
        };
        node.data.ProductRequestEstimateDataList.push(EstimateObj);
      });
      ProdReqItemList.push(node.data);
    });
    this.PRItemApi.forEachNode(node => {
      let ItemNo = 0;
      node.data.RequestPersonEstimateDataList = [];
      node.data.RequestPersonEstimateList.forEach(item => {
        const RequestPersonEstimateObj = {
          RequestPersonEstimateID: item.RequestPersonEstimateID ? item.RequestPersonEstimateID : -1,
          ProductRequestItemID: node.data.ProductRequestItemID,
          ItemNo: ++ItemNo,
          // tslint:disable-next-line:max-line-length
          BusinessPatternID: item.BusinessPatternName.BusinessPatternID ? item.BusinessPatternName.BusinessPatternID : (item.BusinessPatternID ? item.BusinessPatternID : null),
          EducationYear: item.EducationYear,
          ExperienceYear: item.ExperienceYear,
          ManagementCOEF: item.ManagementCOEF,
          TopGraduated: item.TopGraduated,
          Qty: item.Qty,
          Amount: item.Amount,
        };
        node.data.RequestPersonEstimateDataList.push(RequestPersonEstimateObj);
      });
      // tslint:disable-next-line:max-line-length
      ProdReqItemList.filter(x => x.ProductRequestItemID === node.data.ProductRequestItemID)[0].RequestPersonEstimateDataList = node.data.RequestPersonEstimateDataList;
    });
    this.ProductRequest.SaveRequestPersonEstimate(ProdReqItemList)
.subscribe(
(res: any) => {
this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
},
err => {
this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
}
);
}

  popupclosed() {
    // this.PopUpType = '';
    this.isClicked = this.IsNotFound;
    this.IsNotFound = false;
    this.HaveMaxBtn = false;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {

    $('#div1').resizable({
      handles: 'w',
      resize: function (event, ui) {
        ui.position.left = ui.originalPosition.left;
        ui.size.width = (ui.size.width
          - ui.originalSize.width) * 2
          + ui.originalSize.width;
      }
    });
  }

    Close() {
      this.btnclicked = false;
      this.ProductRequestPersonClosed.emit(true);
    }
}
