import { Component, OnInit, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { TemplateRendererComponent } from 'src/app/Shared/grid-component/template-renderer/template-renderer.component';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgSelectVirtualScrollComponent } from 'src/app/Shared/ng-select-virtual-scroll/ng-select-virtual-scroll.component';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';

@Component({
  selector: 'app-request-evaluate',
  templateUrl: './request-evaluate.component.html',
  styleUrls: ['./request-evaluate.component.css']
})
export class RequestEvaluateComponent implements OnInit {

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
  // RequestSupplierColDef: any;
  EvaluateExpertPersonColDef: any;
  EvaluateExpertPersonGridApi;
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
  //RequestSupplierRowData: any;
  EvaluateExpertPersonRowData = [];
  HaveSave = true;
  beforeItemNo = null;
  EvaluateExpertPersonDataList: any;
  RequestEvaluateID: any;
  NgSelectScaleParams = {
    bindLabelProp: 'ScaleName',
    bindValueProp: 'ScaleCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'scale-type'
  };
  NgSelectPropertyParams = {
    bindLabelProp: 'EstatePropertyTypeName',
    bindValueProp: 'EstatePropertyTypeCode',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'property-type'
  };
  NgSelectPropertyValueParams = {
    bindLabelProp: 'Value',
    bindValueProp: 'PropertyValueID',
    placeholder: '',
    MinWidth: '100px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'property-value'
  };
  RequestEvaluateDate;
  PersianRequestEvaluateDate: any;
  OnEvaluateTypeItems;
  OnEvaluateTypeParams = {
    bindLabelProp: 'EvaluateTypeName',
    bindValueProp: 'EvaluateTypeCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  OnEvaluateMethodItems;
  OnEvaluateMethodParams = {
    bindLabelProp: 'EvaluateMethodName',
    bindValueProp: 'EvaluateMethodCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  RequestEvaluateObject: any;
  Note;
  RequestEvaluateNo;
  Amount: any;
  JudgmentDate;
  ExportDate;
  ApprovalNO;
  JudgmentNO;
  RequestEvaluateMode = 0;
  CheckValidate: boolean;
  PersonTypeParams = {
    bindLabelProp: 'PersonTypeName',
    bindValueProp: 'PersonTypeCode',
    placeholder: '',
    MinWidth: '90px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    DropDownMinWidth: '100px',
    type: 'Person-Type',
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

    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.CostFactorID = this.ProductRequestObject.CostFactorID;
    this.RequestEvaluateID = this.PopupParam.RequestEvaluateID;

    if (this.PopupParam.IsReadOnly) {
      this.IsEditable = false;
    }
    forkJoin([
      this.ProductRequest.GetAssetEstateList(this.CostFactorID),
      this.ProductRequest.GetRequestEvaluate(this.RequestEvaluateID)
    ])
      .subscribe(
        res => {
          if (res) {
            this.EstateRowData = res[0];
            this.RequestEvaluateObject = res[1];
            this.RequestEvaluateDate = this.RequestEvaluateObject.ShortRequestEvaluateDate;
            this.EvaluateExpertPersonRowData = res[1].EvaluatorList;
            this.Note = this.RequestEvaluateObject.Note;
            this.RequestEvaluateNo = this.RequestEvaluateObject.RequestEvaluateNo;
            this.ApprovalNO = this.RequestEvaluateObject.ApprovalNO;
            this.JudgmentNO = this.RequestEvaluateObject.JudgmentNO;
            this.JudgmentDate = this.RequestEvaluateObject.ShortJudgmentDate;
            this.ExportDate = this.RequestEvaluateObject.ShortExportDate;
            this.Amount = this.RequestEvaluateObject.Amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            this.OnOpenNgSelect('EvaluateType', true);
            this.OnOpenNgSelect('EvaluateMethod', true);

            if (this.RequestEvaluateObject && this.RequestEvaluateObject.RequestEvaluateID > 0) {
              this.RequestEvaluateMode = this.RequestEvaluateObject.RequestEvaluateMode;
            } else if (this.PopupParam.RequestEvaluateMode) {
              this.RequestEvaluateMode = this.PopupParam.RequestEvaluateMode;
            }
          }
        }
      );

    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });

    if (!this.ModuleCode) {
      this.ModuleCode = this.PopupParam.ModuleCode;
    }

    this.ColumnDefinitions();


    // if (this.ModuleCode === 2776 && this.PopupParam.ModuleViewTypeCode) {
    //   switch (Number(this.PopupParam.ModuleViewTypeCode)) {
    //     case 2:
    //       this.HaveSave = false;
    //       this.IsEditable = false;
    //       this.HasInsertBtn = false;
    //       break;
    //     default:
    //       break;
    //   }
    // }
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
        width: 150,
        resizable: true
      },
      {
        headerName: 'واحد',
        field: 'ScaleName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectScaleParams,
          Items: [],
          Owner: this
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.ScaleName) {
            params.data.ScaleCode = params.newValue.ScaleCode;
            params.data.ScaleName = params.newValue.ScaleName;
            return true;
          } else {
            params.data.ScaleName = '';
            params.data.ScaleCode = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.StatePropertyTypeName;
          } else {
            return '';
          }
        },
        editable: true,
        width: 130,
        resizable: true
      },
      {
        headerName: 'مقدار',
        field: 'Qty',
        width: 150,
        resizable: true,
        editable: true,
      },
      {
        headerName: 'ویژگی',
        field: 'Value',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.NgSelectPropertyValueParams,
          Items: [],
          Owner: this
        },
        valueSetter: (params) => {
          if (params.newValue && params.newValue.Value) {
            params.data.PropertyValueID = params.newValue.PropertyValueID;
            params.data.Value = params.newValue.Value;
            return true;
          } else {
            params.data.Value = '';
            params.data.PropertyValueID = null;
            return false;
          }
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.Value;
          } else {
            return '';
          }
        },
        editable: true,
        width: 130,
        resizable: true
      },
      // {
      //   headerName: 'شماره رای',
      //   field: 'JudgmentNo',
      //   width: 100,
      //   resizable: true,
      //   editable: true,
      // },
      // {
      //   headerName: 'تاریخ حکم دادگاه',
      //   field: 'PersianJudgmentDate',
      //   width: 130,
      //   resizable: true,
      //   editable: true,
      //   cellEditorFramework: JalaliDatepickerComponent,
      //   cellEditorParams: {
      //     CurrShamsiDateValue: 'PersianJudgmentDate',
      //     DateFormat: 'YYYY/MM/DD',
      //     WidthPC: 100,
      //     AppendTo: '.ag-theme-balham'
      //   },
      //   cellRenderer: 'SeRender',
      //   valueFormatter: function currencyFormatter(params) {
      //     if (params.value) {
      //       return params.value.SDate;
      //     } else {
      //       return '';
      //     }
      //   },
      // },
      // {
      //   headerName: 'شماره کارشناس دادگستری',
      //   field: 'ExpertJusticeNo',
      //   width: 150,
      //   resizable: true,
      //   editable: true,
      // },
      // {
      //   headerName: 'تاریخ کارشناسی دادگستری',
      //   field: 'PersianExpertDate',
      //   width: 150,
      //   resizable: true,
      //   editable: true,
      //   cellEditorFramework: JalaliDatepickerComponent,
      //   cellEditorParams: {
      //     CurrShamsiDateValue: 'PersianExpertDate',
      //     DateFormat: 'YYYY/MM/DD',
      //     WidthPC: 100,
      //     AppendTo: '.ag-theme-balham'
      //   },
      //   cellRenderer: 'SeRender',
      //   valueFormatter: function currencyFormatter(params) {
      //     if (params.value) {
      //       return params.value.SDate;
      //     } else {
      //       return '';
      //     }
      //   },
      // },
      // {
      //   headerName: 'شماره مصوبه',
      //   field: 'ApprovalNo',
      //   width: 100,
      //   resizable: true,
      //   editable: true,
      // },
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
        editable: false
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

  onGridReadyEvaluateExpertPerson(params) {
    this.EvaluateExpertPersonGridApi = params.api;
  }

  onEstateRowClick(event) {
    this.ProductRequestEstateObj = event.data;
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
    this.EvaluateExpertPersonColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'شماره کارشناس دادگستری',
        field: 'ExpertJusticeNO',
        width: 180,
        editable: true,
        resizable: true
      },
      {
        headerName: 'حقیقی / حقوقی',
        field: 'PersonTypeName',
        cellEditorFramework: NgSelectVirtualScrollComponent,
        cellEditorParams: {
          Params: this.PersonTypeParams,
          Items: this.PersonTypeList,
          Owner: this
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
    this.startLeftPosition = 500;
    this.startTopPosition = 240;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }


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

  onEvaluateCellEditingStarted(event) {
    this.EvaluateExpertPersonGridApi.forEachNode(node => {
      if (node.rowIndex === event.rowIndex) {
        // tslint:disable-next-line:max-line-length
        this.SelectedPersonTypeCode = node.data.PersonTypeCode;
      }
    });
    if (event.colDef && event.colDef.field === 'ActorName') {
      this.EvaluateExpertPersonColDef[3].cellEditorParams.Params.loading = true;
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

  onEvaluateCellvaluechanged(event) {
    if (event.colDef && event.colDef.field === 'PersonTypeName') {
      if (event.newValue && event.newValue.PersonTypeCode) {
        const itemsToUpdate = [];
        this.EvaluateExpertPersonGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.PersonTypeCode = event.newValue.PersonTypeCode;
            node.data.ActorID = null;
            node.data.ActorName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.EvaluateExpertPersonGridApi.updateRowData({ update: itemsToUpdate });
      } else {
        const itemsToUpdate = [];
        this.EvaluateExpertPersonGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = null;
            node.data.ActorName = '';
            itemsToUpdate.push(node.data);
          }
        });
        this.EvaluateExpertPersonGridApi.updateRowData({ update: itemsToUpdate });
      }
    }
    if (event.colDef && event.colDef.field === 'ActorName') {
      if (event.newValue && event.newValue.ActorId) {
        const itemsToUpdate = [];
        this.EvaluateExpertPersonGridApi.forEachNode(node => {
          if (node.rowIndex === event.rowIndex) {
            node.data.ActorID = event.newValue.ActorId;
            itemsToUpdate.push(node.data);
          }
        });
        this.EvaluateExpertPersonGridApi.updateRowData({ update: itemsToUpdate });
      }
    }
  }

  onSave() {
    let EvaluatorList = [];
    const ProductRequestEstateList = [];

    this.EvaluateExpertPersonGridApi.stopEditing();
    this.EstateGridApi.stopEditing();

    this.EvaluateExpertPersonGridApi.forEachNode(node => {
      EvaluatorList.push(node.data);
    });

    this.CheckValidate = true;
    let ValidateForm = true;
    ValidateForm = ValidateForm &&
      this.RequestEvaluateNo &&
      this.Note &&
      this.OnEvaluateTypeParams.selectedObject &&
      this.OnEvaluateMethodParams.selectedObject &&
      this.RequestEvaluateDate &&
      this.Amount;

    if (ValidateForm) {
      this.EstateGridApi.forEachNode(node => {
        const EstateItemObj = {
          ProductRequestEstateID: node.data.ProductRequestEstateID ? node.data.ProductRequestEstateID : -1,
          CostFactorID: this.CostFactorID,
          ItemNo: node.data.ItemNo,
          // tslint:disable-next-line:max-line-length
          AssetID: node.data.AssetRefrenceNo && node.data.AssetRefrenceNo.AssetID ? node.data.AssetRefrenceNo.AssetID : (node.data.AssetID ? node.data.AssetID : null),
          EstateSpecID: node.data.EstateID ? node.data.EstateID : node.data.EstateSpecID ? node.data.EstateSpecID : null,

          // JudgmentDate: node.data.PersianJudgmentDate && node.data.PersianJudgmentDate.MDate ? node.data.PersianJudgmentDate.MDate : (node.data.ShortJudgmentDate ? node.data.ShortJudgmentDate : null),
          // ExpertDate: node.data.PersianExpertDate && node.data.PersianExpertDate.MDate ? node.data.PersianExpertDate.MDate : (node.data.ShortExpertDate ? node.data.ShortExpertDate : null),
          // JudgmentNo: node.data.JudgmentNo,
          // ExpertJusticeNo: node.data.ExpertJusticeNo,
          // ApprovalNo: node.data.ApprovalNo,

          ExpertAmount: node.data.ExpertAmount,
          Area: node.data.Area,
          Qty: node.data.Qty,
          PropertyValueID: node.data.PropertyValueID,
          ScaleCode: node.data.ScaleCode,
        };
        ProductRequestEstateList.push(EstateItemObj);
      });

      const RequestEvaluateObj = {
        RequestEvaluateID: this.RequestEvaluateObject ? this.RequestEvaluateObject.RequestEvaluateID : -1,
        CostFactorID: this.CostFactorID,
        RequestEvaluateDate: this.RequestEvaluateDate,
        IsReturn: false,
        EvaluateTypeCode: this.OnEvaluateTypeParams.selectedObject,
        EvaluateMethodCode: this.OnEvaluateMethodParams.selectedObject,
        Note: this.Note,
        RequestEvaluateNo: this.RequestEvaluateNo,
        ApprovalNO: this.ApprovalNO,
        JudgmentNO: this.JudgmentNO,
        JudgmentDate: this.JudgmentDate,
        ExportDate: this.ExportDate,
        Amount: this.Amount ? this.Amount.replace(/,/g, '') : 0,
        EvaluatorList: EvaluatorList,
        RequestEvaluateMode: this.RequestEvaluateMode
      };

      this.ProductRequest.SaveRequestEvaluate(
        RequestEvaluateObj,
        ProductRequestEstateList,
        this.ModuleCode)
        .subscribe((res: any) => {
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
          this.ngOnInit();
        });
    } else {
      this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
    }
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

  onEstateCellEditingStarted(event) {
    if (event.colDef && event.colDef.field === 'ScaleName') {
      this.ProductRequest.GetScaleList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'scale-type'
        });
      });
    }

    if (event.colDef && event.colDef.field === 'StatePropertyTypeName') {
      this.ProductRequest.GetEstatePropertyTypeList().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'property-type'
        });
      });
    }
    if (event.colDef && event.colDef.field === 'Value') {
      this.ProductRequest.GetPropertyValue().subscribe(res => {
        this.RefreshPersonItems.RefreshItemsVirtualNgSelect({
          List: res,
          type: 'property-value'
        });
      });
    }
  }

  OnRequestEvaluateDateChange(ADate) {
    this.RequestEvaluateDate = ADate.MDate;
    this.PersianRequestEvaluateDate = ADate.SDate;
  }
  OnJudgmentDateChange(ADate) {
    this.JudgmentDate = ADate.MDate;
  }
  OnExportDateChange(ADate) {
    this.ExportDate = ADate.MDate;
  }



  OnOpenNgSelect(type, IsFill = true, FillResolve = null) {
    switch (type) {
      case 'EvaluateType':
        this.ProductRequest.GetEvaluateTypeList(this.ProductRequestObject.IsCost).subscribe(res => {
          this.OnEvaluateTypeItems = res;
          if (IsFill) {
            this.OnEvaluateTypeParams.selectedObject = this.RequestEvaluateObject.EvaluateTypeCode;
          }

        });
        break;
      case 'EvaluateMethod':
        this.ProductRequest.GetEvaluateMethodList().subscribe(res => {
          this.OnEvaluateMethodItems = res;
          if (IsFill) {
            this.OnEvaluateMethodParams.selectedObject = this.RequestEvaluateObject.EvaluateMethodCode;
          }
        })
        break;
      default:
        break;
    }
  }
  getAmount(Amount) {
    this.Amount = Amount;

  }
  RequestEvaluateModeRadioClick(Type) {
    this.RequestEvaluateMode = Type;
  }
}
