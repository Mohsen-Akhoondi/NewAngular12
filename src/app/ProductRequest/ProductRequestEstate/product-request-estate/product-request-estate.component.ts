import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ActivatedRoute } from '@angular/router';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';


@Component({
  selector: 'app-product-request-estate',
  templateUrl: './product-request-estate.component.html',
  styleUrls: ['./product-request-estate.component.css']
})
export class ProductRequestEstateComponent implements OnInit {

  @Input() PopupParam;
  @Input() PopupMaximized;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() PopupOutPutParam: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('ShowMapField') ShowMapField: TemplateRef<any>;
  @ViewChild('UploadArchive') UploadArchive: TemplateRef<any>;
  @ViewChild('EvaluationInfo') EvaluationInfo: TemplateRef<any>;
  EstateGridApi;
  EstateColDef = [];
  EstateRowData = [];
  IsEditable = true;
  HasInsertBtn = false;
  CostFactorID: number;
  ProductRequestObject: any;
  isClicked: boolean;
  HaveMaxBtn: boolean;
  PopUpType: string;
  startLeftPosition: number;
  startTopPosition: number;
  type: string;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  ModuleCode: number;
  ProductRequestEstateObj: any;
  save = false;
  PersonTypeList: any;
  RequestSupplierColDef: any;
  // EvaluateExpertPersonColDef: any;
  RequestSupplierGridApi;
  //EvaluateExpertPersonGridApi;
  RequestSupplierList = [];
  NgSelectVSParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    type: 'supplier',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد ملی', HeaderName: 'IdentityNo', width: 35, TermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام و نام خانوادگی', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد ملی', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگی', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  SelectedPersonTypeCode: number;
  RequestSupplierRowData: any;
  //EvaluateExpertPersonRowData = [];
  HaveSave = true;
  beforeItemNo = null;
  EvaluateExpertPersonDataList: any;

  AssetNgSelectVSParams = {
    bindLabelProp: 'ProductName',
    bindValueProp: 'AssetID',
    placeholder: '',
    MinWidth: '150px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو براساس :',
      SearchItemDetails:
        [{ HeaderCaption: 'کد کالا', HeaderName: 'AssetCode', width: 35, MinTermLenght: 3, SearchOption: 'AssetCode' },
        { HeaderCaption: 'نام کالا', HeaderName: 'ProductName', width: 53, MinTermLenght: 3, SearchOption: 'ProductName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'کد کالا', width: 35, },
        { HeaderCaption: 'نام کالا', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };

  constructor(private ProductRequest: ProductRequestService,
    private CommonService: CommonServices,
    private route: ActivatedRoute,
    private Actor: ActorService,
    private RefreshPersonItems: RefreshServices) {
    this.PersonTypeList = [{ PersonTypeName: 'حقیقی', PersonTypeCode: 1 },
    { PersonTypeName: 'حقوقی', PersonTypeCode: 2 }];
  }

  ngOnInit() {
    const RequestSupplierObj = {
      ActorName: this.PopupParam.ActorObject ? this.PopupParam.ActorObject.ActorName : null,
      ActorID: this.PopupParam.ActorObject ? this.PopupParam.ActorObject.ActorId : null,
      Percent: 100,
      PersonTypeName: 'حقوقی',
      PersonTypeCode: 2
    };
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    this.ProductRequest.GetAssetEstateList(this.CostFactorID).subscribe(
      res => {
        this.EstateRowData = res;
      }
    );
    this.ProductRequest.GetRequestSupplierList(this.CostFactorID).subscribe(res => {
      this.RequestSupplierRowData = res;
      if (this.RequestSupplierRowData.length === 0 && this.PopupParam.ActorObject) {
        this.RequestSupplierRowData.push(RequestSupplierObj);
      }
    });
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    if (!this.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }

    this.ColumnDefinitions();


    if ((this.ModuleCode === 2776 || this.ModuleCode === 2901) && this.PopupParam.ModuleViewTypeCode) {
      switch (Number(this.PopupParam.ModuleViewTypeCode)) {
        case 2:
          this.HaveSave = false;
          this.IsEditable = false;
          this.HasInsertBtn = false;
          break;
        default:
          break;
      }
    }
  }

  ColumnDefinitions() {
    this.EstateColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره شناسایی',
        field: 'EstateSpecID',
        width: 150,
        resizable: true
      },
      {
        headerName: 'اموال',
        field: 'ProductName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.AssetNgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreAsset,
          FetchByTerm: this.FetchAssetByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ProductName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ProductName) {
            params.data.AssetID = params.newValue.AssetID;
            params.data.ProductName = params.newValue.ProductName;
            params.data.ProductID = params.newValue.ProductID;
            params.data.BlockNo = params.newValue.BlockNo;
            params.data.LandNo = params.newValue.LandNo;
            params.data.ApartmentNo = params.newValue.ApartmentNo;
            params.data.BusinessNo = params.newValue.BusinessNo;
            params.data.Address = params.newValue.Address;
            return true;
          } else {
            params.data.AssetID = params.newValue.AssetID;
            params.data.ProductName = '';
            params.data.ProductID = null;
            params.data.BlockNo = null;
            params.data.LandNo = null;
            params.data.ApartmentNo = null;
            params.data.BusinessNo = null;
            params.data.Address = null;
            return false;
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'بلوک',
        field: 'BlockNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ملک',
        field: 'LandNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'آپارتمان',
        field: 'ApartmentNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پیشه ور',
        field: 'BusinessNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'منطقه',
        field: 'ZoneNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'محله',
        field: 'RegionNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک ثبتی ترکیبی',
        field: 'OldRegNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'منطقه ثبتی',
        field: 'RegRegion',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک اصلی',
        field: 'MajorRegNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'پلاک فرعی',
        field: 'MinorRegNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'قطعه',
        field: 'DivisionSeq',
        width: 80,
        resizable: true
      },
      {
        headerName: 'کد پستی',
        field: 'NewPostCode',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ناحیه',
        field: 'DistrictNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'ردیف مالک',
        field: 'OwnerNo',
        width: 80,
        resizable: true
      },
      {
        headerName: 'مالک',
        field: 'OwnerFullName',
        width: 200,
        resizable: true
      },
      {
        headerName: 'آدرس',
        field: 'PAddress',
        width: 400,
        resizable: true
      },
      {
        headerName: 'مساحت',
        field: 'Area',
        width: 100,
        resizable: true,
        editable: true
      },
      {
        headerName: 'مبلغ اجاره ماهیانه',
        field: 'MonthlyRentAmount',
        width: 150,
        resizable: true,
        editable: true
      },
      {
        headerName: 'مستندات',
        field: '',
        width: 80,
        sortable: false,
        resizable: false,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.UploadArchive,
        }
      },
      {
        headerName: 'جانمایی',
        width: 80,
        resizable: true,
        cellStyle: function (params) {
          return { 'text-align': 'center' };
        },
        cellRendererFramework: TemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.ShowMapField
        }
      }
    ];
  }

  onEstateGridReady(params) {
    this.EstateGridApi = params.api;
  }

  onGridReadyRequestSupplier(params) {
    this.RequestSupplierGridApi = params.api;
  }

  onEstateRowClick(event) {
    this.ProductRequestEstateObj = event.data;
    this.beforeItemNo = event.data.ItemNo;
  }

  OnShowMapClick(row) {
    if (row.BlockNo && row.LandNo) {
      const MapUrl = 'http://detailplan.tehran.iri/mapview/view.asp?w=1350&h=600&p='
        + this.CommonService.PadLeft(row.BlockNo, 5)
        + this.CommonService.PadLeft(row.LandNo, 3)
        + '&mode=view';
      window.open(MapUrl);
    }
  }

  onEstateValueChanged(event) {
    if (event.newValue && event.colDef && event.colDef.field === 'AssetID') {
      this.ProductRequest.GetAssetEstateDetailsByAssetID(event.newValue.AssetID).subscribe(
        res => {
          const itemsToUpdate = [];
          this.EstateGridApi.forEachNode(node => {
            if (node.rowIndex === event.rowIndex) {
              node.data.AssetID = event.newValue;
              node.data.BlockNo = res[0].BlockNo;
              node.data.LandNo = res[0].LandNo;
              node.data.ApartmentNo = res[0].ApartmentNo;
              node.data.BusinessNo = res[0].BusinessNo;
              node.data.Address = res[0].Address;
              itemsToUpdate.push(node.data);
            }
          });
          this.EstateGridApi.updateRowData({ update: itemsToUpdate });
        });
    }
  }

  onClose() {
    this.isClicked = false;
    this.Closed.emit(true);
  }

  popupclosed() {
    this.isClicked = false;
    this.PopUpType = '';
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.RequestSupplierColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'حقیقی / حقوقی',
        field: 'PersonTypeName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          HardCodeItems: this.PersonTypeList,
          bindLabelProp: 'PersonTypeName',
          bindValueProp: 'PersonTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.PersonTypeName;
          } else {
            return '';
          }
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.PersonTypeName) {
            params.data.PersonTypeName = params.newValue.PersonTypeName;
            params.data.PersonTypeCode = params.newValue.PersonTypeCode;

            if (params.data.PersonTypeCode === 1) {
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'کد ملي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام و نام خانوادگي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'کد ملي';
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام و نام خانوادگي';
            } else {
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'نام شخص';
              this.NgSelectVSParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 10;
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه ملي ';
              this.NgSelectVSParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'نام شخص';
            }

            return true;
          } else {
            params.data.PersonTypeName = null;
            params.data.PersonTypeCode = null;
            return false;
          }
        },
        editable: true,
        width: 110,
        resizable: true
      },
      {
        headerName: ' نام شخص  ',
        field: 'ActorName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectVSParams,
          Items: [],
          MoreFunc: this.FetchMoreSupplerPerson,
          FetchByTerm: this.FetchSupplerPersonByTerm,
          Owner: this
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.ActorName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 300,
        resizable: true
      },
      {
        headerName: 'سهم',
        field: 'Percent',
        width: 70,
        editable: true,
        resizable: true
      },
    ];
  }

  OnChooseEstateSpecClick(event) {

    if (event === 'EstateSpec') {
      this.save = false;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 152;
      this.startTopPosition = 40;
      this.PopUpType = 'estate-search';

      // if (this.ProductRequestObject.IsCost) {
      //   this.PopUpType = 'estate-search';
      // } else {
      //   this.PopUpType = 'estate-recognition-search';
      // }

      this.PopupParam = {
        ProductRequestObject: this.ProductRequestObject,
        CostFactorID: this.CostFactorID
      };
    }

  }

  getOutPutParam(event) {
    this.ProductRequestEstateObj = [event];
    if (this.ProductRequestEstateObj) {
      this.EstateGridApi.updateRowData({ add: this.ProductRequestEstateObj });
      this.RefreshItemNo();
    }
  }

  RefreshItemNo() {
    let CurrItemNo = 0;
    const itemsToUpdate = [];
    this.EstateGridApi.forEachNode(function (node) {
      if (node.data.ItemNo) {
        CurrItemNo++;
        node.data.ItemNo = CurrItemNo;
        itemsToUpdate.push(node.data);
      }
    });
    this.EstateGridApi.updateRowData({ update: itemsToUpdate });
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  // --------------------------فروشندگان--------------------------------


  FetchMoreSupplerPerson(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      const ResultList = [];
      const promise = new Promise((resolve, reject) => {
        event.Owner.Actor.GetActorPaging(event.PageNumber,
          event.PageSize,
          event.term,
          event.SearchOption,
          event.Owner.SelectedPersonTypeCode === 1,
          false,
          true).subscribe(res => {
            event.CurrentItems.forEach(el => {
              ResultList.push(el);
            });
            res.List.forEach(element => {
              ResultList.push(element);
            });
            resolve(res.TotalItemCount);
          });
      }).then((TotalItemCount: number) => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: ResultList,
          term: event.term,
          TotalItemCount: TotalItemCount,
          PageCount: Math.ceil(TotalItemCount / 30),
          type: 'supplier'
        });
      });
    }

  }

  FetchSupplerPersonByTerm(event) {
    if (event.Owner && event.Owner.SelectedPersonTypeCode) {
      event.Owner.Actor.GetActorPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        event.Owner.SelectedPersonTypeCode === 1, false, true).subscribe(res => {
          event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            term: event.term,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30),
            type: 'supplier'
          });
        });
    }

  }

  onSupplierCellEditingStarted(event) {
    this.RequestSupplierGridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.SelectedPersonTypeCode = node.data.PersonTypeCode;
      }
    });
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.RequestSupplierColDef[2].cellEditorParams.Params.loading = true;
      this.Actor.GetActorPaging(1, 30, '', '', event.data.PersonTypeCode === 1, false, true, event.data.ActorID).subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30),
          type: 'supplier'
        });
      });
    }
  }

  onSupplierCellvaluechanged(event) {
    if (event.colDef && event.colDef.field === 'PersonTypeName') {
      if (event.newValue && event.newValue.PersonTypeCode) {
        const itemsToUpdate = [];
        this.RequestSupplierGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.PersonTypeCode = event.newValue.PersonTypeCode;
            node.data.ActorID = null;
            node.data.ActorName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierGridApi.updateRowData({ update: itemsToUpdate });
      } else {
        const itemsToUpdate = [];
        this.RequestSupplierGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = null;
            node.data.ActorName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierGridApi.updateRowData({ update: itemsToUpdate });
      }
    }
    if (event.colDef && event.colDef.field === 'ActorName') {
      if (event.newValue && event.newValue.ActorId) {
        const itemsToUpdate = [];
        this.RequestSupplierGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = event.newValue.ActorId;
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierGridApi.updateRowData({ update: itemsToUpdate });
      }
    }

    if (event.colDef && event.colDef.field === 'Percent') {
      if (event.newValue) {
        const itemsToUpdate = [];
        this.RequestSupplierGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.Percent = event.newValue;
            itemsToUpdate.push(node.data);
          }
        });
        this.RequestSupplierGridApi.updateRowData({ update: itemsToUpdate });
      }
    }
  }

  onSave() {
    const RequestSupplierList = [];
    this.RequestSupplierGridApi.stopEditing();


    this.RequestSupplierGridApi.forEachNode(node => {
      const RequestSupplierObj = {
        CostFactorID: this.CostFactorID,
        ActorID: node.data.ActorID,
        Percent: node.data.Percent,
        RequestSupplierID: node.data.RequestSupplierID ? node.data.RequestSupplierID : -1
      };

      RequestSupplierList.push(RequestSupplierObj);

    });
    const EstateList = [];
    let ItemNo = 0;
    let ItemNo2 = 0;
    this.EstateGridApi.stopEditing();
    this.EstateGridApi.forEachNode(node => {
      const EstateItemObj = {
        ProductRequestEstateID: node.data.ProductRequestEstateID ? node.data.ProductRequestEstateID : -1,
        CostFactorID: this.CostFactorID,
        ItemNo: ++ItemNo,
        // tslint:disable-next-line:max-line-length
        AssetID: node.data.AssetRefrenceNo && node.data.AssetRefrenceNo.AssetID ? node.data.AssetRefrenceNo.AssetID : (node.data.AssetID ? node.data.AssetID : null),
        EstateSpecID: node.data.EstateID ? node.data.EstateID : node.data.EstateSpecID ? node.data.EstateSpecID : null,
        EstateRecognitionID: node.data.EstateRecognitionID ? node.data.EstateRecognitionID : null,
        // tslint:disable-next-line:max-line-length
        JudgmentDate: node.data.PersianJudgmentDate && node.data.PersianJudgmentDate.MDate ? node.data.PersianJudgmentDate.MDate : (node.data.ShortJudgmentDate ? node.data.ShortJudgmentDate : null),
        // tslint:disable-next-line:max-line-length
        ExpertDate: node.data.PersianExpertDate && node.data.PersianExpertDate.MDate ? node.data.PersianExpertDate.MDate : (node.data.ShortExpertDate ? node.data.ShortExpertDate : null),
        JudgmentNo: node.data.JudgmentNo,
        ExpertJusticeNo: node.data.ExpertJusticeNo,
        ExpertAmount: node.data.ExpertAmount,
        ApprovalNo: node.data.ApprovalNo,
        Area: node.data.Area,
        MonthlyRentAmount: node.data.MonthlyRentAmount
      };
      EstateList.push(EstateItemObj);
    });
    this.ProductRequest.SaveProductRequestEstate(this.CostFactorID, EstateList,
      RequestSupplierList, this.ModuleCode, this.PopupParam.OrginalModuleCode)
      .subscribe((res: any) => {
        this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        this.EstateRowData = res;
        this.ngOnInit();
      }
      );
  }

  onDocArchiveClick(row) {
    if (row.ProductRequestEstateID) {
      this.PopUpType = 'archive-details';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.PopupParam = {
        EntityID: row.ProductRequestEstateID,
        TypeCodeStr: '241-',
        DocTypeCode: 241,
        ModuleCode: 2776,
        RegionCode: this.ProductRequestObject.RegionCode,
      };
    }
  }
  onEvaluationInfoClick(row) {

    if (row.EstateRecognitionID) {
      this.PopUpType = 'estate-recognition-evaluation';
      this.HaveHeader = true;
      this.isClicked = true;
      this.HaveMaxBtn = false;
      this.startLeftPosition = 89;
      this.startTopPosition = 14;
      this.PopupParam = {
        EstateRecognitionID: row.EstateRecognitionID,
      };
    }
  }

  FetchMoreAsset(event) {
    event.Owner.EstateColDef[2].cellEditorParams.Params.loading = true;
    const ResultList = [];
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      event.Owner.ProductRequest.GetVWLandBuildingAsset(event.Owner.ProductRequestObject.RegionCode,
        event.PageNumber,
        event.PageSize,
        event.term,
        event.SearchOption).subscribe(res => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          resolve(res.TotalItemCount);
        });
    }).then((TotalItemCount: number) => {
      event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
        List: ResultList,
        term: event.term,
        TotalItemCount: TotalItemCount,
        PageCount: Math.ceil(TotalItemCount / 30)
      });
    });
  }
  FetchAssetByTerm(event) {
    event.Owner.EstateColDef[2].cellEditorParams.Params.loading = true;
    event.Owner.ProductRequest.GetVWLandBuildingAsset(event.Owner.ProductRequestObject.RegionCode,
      event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption).subscribe(res => {
        event.Owner.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res.List,
          term: event.term,
          TotalItemCount: res.TotalItemCount,
          PageCount: Math.ceil(res.TotalItemCount / 30)
        });
        event.Owner.EstateColDef[2].cellEditorParams.Params.loading = false;
      });
  }

  onAssetcellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ProductName') {
      this.EstateColDef[2].cellEditorParams.Params.loading = true;
      this.ProductRequest.GetVWLandBuildingAsset(this.ProductRequestObject.RegionCode, 1, 30, '', null, true).
        subscribe(res => {
          this.EstateColDef[2].cellEditorParams.Params.loading = false;
          this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
            List: res.List,
            TotalItemCount: res.TotalItemCount,
            PageCount: Math.ceil(res.TotalItemCount / 30)
          });
        });
    }
  }

  onRequestEvaluateClick() {
    this.isClicked = true;
    this.HaveMaxBtn = false;
    this.PopUpType = 'request-evaluate-list';
    this.HaveHeader = true;
    this.startLeftPosition = 160;
    this.startTopPosition = 40;
    this.PopupParam = {
      ProductRequestObject: this.ProductRequestObject,
      ModuleCode: this.ModuleCode,
      ShowOnly: !this.IsEditable,
    };
  }

}
