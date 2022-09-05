import { Component, OnInit,Input } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
@Component({
  selector: 'app-mutual-contract-info',
  templateUrl: './mutual-contract-info.component.html',
  styleUrls: ['./mutual-contract-info.component.css']
})
export class MutualContractInfoComponent implements OnInit {
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ModuleCode: number;
  GridDevHeight = 85;
  columnDef;
  btnclicked = false;
  HaveMaxBtn = false;
  type: string;
  rowData = [];
  HaveHeader: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  IsInternal = true;
  CheckValidate = false;
  AgridApi: any;
  HaveMutualContract: any;
  ProductRequestObject;
  ContractorTotalItemCount;
  ContractorPageCount;
  FromContractDate: any;
  ToContractDate: any;
  selectedRow: any;
  paramObj;
  @Input() ModuleName;
  selectedRegion = -1;
  PixelWidth;
  PixelHeight;
  HeightPercentWithMaxBtn: number;
  MinHeightPixel: number;
  @Input() InputParam;
  MutualContract=true;
  DisabledFromContractDate = false ;
  DisabledToContractDate = false ;
  IsCost = true;
  ShowISCost = false;
  showSearch = false;
  showOnSearch = false;
  showSearchProgress = false;



  RegionItems;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };

  CostCenterItems;
  CostCenterParams = {
    Items: [],
    bindLabelProp: 'CostCenterName',
    bindValueProp: 'CostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  FinYearItems;
  FinYearParams = {
    bindLabelProp: 'FinYearCode',
    bindValueProp: 'FinYearCode',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractTypeItems;
  ContractTypeParams = {
    bindLabelProp: 'ContractTypeName',
    bindValueProp: 'ContractTypeCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    Required: true
  };
  ContractorItems;
  NgSelectContractorParams = {
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
    Required: true,
    type: 'product-request-contract-contractor',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه ملی', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        { HeaderCaption: 'نام شخص', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه ملی', width: 35, },
        { HeaderCaption: 'نام شخص', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  gridHeight: number;


  constructor(
    private Region: RegionListService,
    private ProductRequest: ProductRequestService,
    private route: ActivatedRoute,
    private router: Router,
    private RegionList: RegionListService,
    private ContractService: ContractListService,
    private Workflow: WorkflowService,
    private ContractList: ContractListService,
    private Actor: ActorService,
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      if (this.ModuleCode === 3053) {
        this.GridDevHeight = 83;
        this.showSearch = true;
        this.showOnSearch = false;
        this.showSearchProgress = false;
        this.ShowISCost= true;
      }
      if(this.ModuleCode === 3073){
        this.showSearch = false;
        this.showOnSearch = true;
        this.showSearchProgress = true;
        this.ShowISCost= false;
      }

    });


  }
  FillcolumnDef(event) {
    if (event =='MutualContract') { 
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },

        {
          headerName: 'قرارداد اصلی',

          children: [
            {
              headerName: 'موضوع',
              field: 'Subject',
              width: 250,
              resizable: true
            },
            {
              headerName: 'نوع قرارداد',
              field: 'ContractTypeName',
              width: 130,
              resizable: true
            },
            {
              headerName: 'طرف قرارداد',
              field: 'ActorName',
              width: 200,
              resizable: true,
              sortable: true,
            },
           
            {
              headerName: 'سال مالی',
              field: 'FinYearCode',
              width: 70,
              resizable: true
            },

            {
              headerName: 'شماره قرارداد',
              field: 'LetterNo',
              width: 100,
              resizable: true
            },

            {
              headerName: 'تاریخ قرارداد',
              field: 'ContractDate',
              width: 100,
              resizable: true
            },

            {
              headerName: 'تاریخ شروع قرارداد',
              field: 'FromContractDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'تاریخ پایان قرارداد',
              field: 'ToContractDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'مبلغ قرارداد',
              field: 'ContractAmount',
              HaveThousand: true,
              width: 100,
              resizable: true
            },

          ]

        },
        {
          headerName: 'قرارداد متقابل',
          children: [
            {
              headerName: 'موضوع',
              field: 'MutualSubject',
              width: 200,
              resizable: true
            },
            {
              headerName: 'نوع قرارداد',
              field: 'MutualContractTypeName',
              width: 130,
              resizable: true
            },
            {
              headerName: 'طرف قرارداد',
              field: 'MutualActorName',
              width: 200,
              resizable: true,
              sortable: true,
            },
            {
              headerName: 'سال مالی',
              field: 'MutualFinYearCode',
              width: 70,
              resizable: true
            },
            {
              headerName: 'شماره قرارداد',
              field: 'MutualLetterNo',
              width: 200,
              resizable: true
            },
            {
              headerName: 'مبلغ قرارداد',
              field: 'MutualAmount',
              HaveThousand: true,
              width: 150,
              resizable: true
            },
          ]
        },
      ];
    }
    if(event =='progressinfodetails'){
      
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'قرارداد',
          children: [
            {
              headerName: 'عنوان قرارداد',
              field: 'Subject',
              width: 250,
              resizable: true
            },
            {
              headerName: 'سال مالی',
              field: 'FinYearCode',
              width: 70,
              resizable: true
            },

            {
              headerName: 'شماره قرارداد',
              field: 'LetterNo',
              width: 100,
              resizable: true
            },
    
            {
              headerName: 'تاریخ قرارداد',
              field: 'LetterDate',
              width: 100,
              resizable: true
            },
            {
              headerName: 'تاریخ شروع قرارداد',
              field: 'FromContractDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'تاریخ پایان قرارداد',
              field: 'ToContractDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'مبلغ قرارداد',
              field: 'ContractAmount',
              HaveThousand: true,
              width: 150,
              resizable: true
            },
            // {
            //   headerName: 'پیشرفت برنامه ای',
            //   field: 'ContractSystemProgress',
            //   width: 250,
            //   resizable: true
            // },
            // {
            //   headerName: 'پیشرفت ریالی',
            //   field: 'ContractProgressAmount',
            //   width: 250,
            //   resizable: true
            // },

          ]

        },
        {
          headerName: 'محصول',
          children: [
            {
              headerName: 'نام محصول',
              field: 'ProductName',
              width: 250,
              resizable: true
            },
            {
              headerName: 'مبلغ محصول',
              field: 'Amount',
              width: 150,
              resizable: true
            },
            {
              headerName: 'پیشرفت برنامه ای',
              field: 'OrderSystemProgress',
              width: 150,
              resizable: true
            },
            {
              headerName: 'پیشرفت ریالی',
              field: 'OrderProgressAmount',
              width: 150,
              resizable: true
            },

          ]
        },
      ]
    }
    if(event=='progressinfo'){
      this.columnDef = [
        {
          headerName: 'ردیف',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: 'قرارداد',
          children: [
            {
              headerName: 'عنوان قرارداد',
              field: 'Subject',
              width: 250,
              resizable: true
            },
            {
              headerName: 'سال مالی',
              field: 'FinYearCode',
              width: 70,
              resizable: true
            },
            {
              headerName: 'شماره قرارداد',
              field: 'LetterNo',
              width: 100,
              resizable: true
            },
    
            {
              headerName: 'تاریخ قرارداد',
              field: 'LetterDate',
              width: 100,
              resizable: true
            },
            {
              headerName: 'تاریخ شروع قرارداد',
              field: 'FromContractDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'تاریخ پایان قرارداد',
              field: 'ToContractDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'مبلغ قرارداد',
              field: 'ContractAmount',
              HaveThousand: true,
              width: 150,
              resizable: true
            },
            {
              headerName: 'پیشرفت برنامه ای',
              field: 'ContractSystemProgress',
              width: 250,
              resizable: true
            },
            {
              headerName: 'پیشرفت ریالی',
              field: 'ContractProgressAmount',
              width: 250,
              resizable: true
            },

          ]

        },

      ]
      

    }
  }

  ngOnInit() {

    this.Region.GetUserRegionList().subscribe(res => {
      this.RegionItems = res;
      this.RegionParams.selectedObject = res[0].RegionCode;
    });

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 4;

    this.FillcolumnDef('MutualContract');
  }

  onCellEditingStarted(event) { }


  OnOpenNgSelect(type) {
    switch (type) {
      case 'Region':
        {
          this.Region.GetUserRegionList().subscribe(res => {
            this.RegionItems = res;
          });
          this.CostCenterParams.selectedObject = null;
        }
        break;
      case 'CostCenter':
        {
          if (this.RegionParams.selectedObject) {
            this.ProductRequest.GetCostCenterByRegion(this.RegionParams.selectedObject, null, this.ModuleCode, false).subscribe(res => {
              this.CostCenterItems = res;
            });
          }
        }
        break;
    }
  }

  onChangeRegion(ARegionCode) {

    this.RegionParams.selectedObject = ARegionCode;
    this.CostCenterParams.selectedObject = null;

  }


  ShowMessageBoxWithOkBtn(message) {

    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;

  }

  OnCheckBoxChange(event) {
    this.IsInternal = event;
  }

  Search() {
    if (!this.ToContractDate && this.FromContractDate) {
      this.ToContractDate = this.FromContractDate;
    }

    if (!this.FromContractDate && this.ToContractDate) {
      this.FromContractDate = this.ToContractDate;
    }

    this.HaveMutualContract = 1;
    this.ContractService.MutualContractInfo(this.RegionParams.selectedObject, this.CostCenterParams.selectedObject, this.HaveMutualContract,
      this.FinYearParams.selectedObject,this.ContractTypeParams.selectedObject, this.NgSelectContractorParams.selectedObject,
      this.FromContractDate , this.ToContractDate, this.IsCost).subscribe(res => {
      this.rowData = res;

    });
    this.FillcolumnDef("MutualContract");
  }

  OnSearch(){
    this.FillcolumnDef('progressinfodetails');
    this.ContractService.ContractProgressInfoDetails(this.RegionParams.selectedObject, this.CostCenterParams.selectedObject,this.FinYearParams.selectedObject,
      this.FromContractDate , this.ToContractDate, this.ContractTypeParams.selectedObject, this.NgSelectContractorParams.selectedObject).subscribe(res => {
      this.rowData = res;

    });
  
  }

  OnSearchProgressInfo(){
    this.FillcolumnDef('progressinfo');
    this.ContractService.ContractProgressInfo(this.RegionParams.selectedObject, this.CostCenterParams.selectedObject,this.FinYearParams.selectedObject,
      this.FromContractDate , this.ToContractDate,this.ContractTypeParams.selectedObject, this.NgSelectContractorParams.selectedObject).subscribe(res => {
      this.rowData = res;
    });
  }

  closeModal() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);

  }

  onGridReady(params: { api: any; }) {
    this.AgridApi = params.api;
  }

  OnOpenFinYear(){
    this.Workflow.GetFinYearList().subscribe(res => {
      this.FinYearItems = res;


    });
  }

  OnOpenContractType(){ 
    this.ContractList.GetContractTypeList().subscribe(res => {
      this.ContractTypeItems = res;

    });
  }

  OnOpenNgSelectContractor(){
    this.Actor.GetActorPaging(1, 30, '', 'IdentityNo', false, false, false, this.NgSelectContractorParams.selectedObject).subscribe(ress => {
      this.ContractorItems = ress.List;
      this.ContractorTotalItemCount = ress.TotalItemCount;
      this.ContractorPageCount = Math.ceil(ress.TotalItemCount / 30);
    });

  }

  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      false,
      false,
      false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractorItems = ResultList;
        this.NgSelectContractorParams.loading = false;
      }
      );
  }
  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      false,
      false,
      false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  OnFromContractDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
    
  }
  OnToContractDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
   
  }


  // Btnclick(){
  //   if (this.selectedRow == null) {


  //     this.type = 'message-box';
  //     this.HaveHeader = true;
  //     this.alertMessageParams.message = 'قراردادی جهت مشاهده انتخاب نشده است';
  //     this.btnclicked = true;
  //     this.startLeftPosition = 500;
  //     this.startTopPosition = 100;
  //   } else{
  //     if (this.ModuleCode === 3053){
  //       this.btnclicked = true;
  //       this.type = 'PriceList_contract_estimate';
  //       this.HaveHeader = true ;
  //       this.HaveMaxBtn = true ;
  //       this.PixelWidth = 2000 ;
  //       this.PixelHeight = 630 ;
  //       this.startLeftPosition = 2 ;
  //       this.startTopPosition = 5 ;
  //       this.HeightPercentWithMaxBtn = 90 ;
  //       this.MinHeightPixel = 645 ;


  //       this.paramObj = {
  //         HeaderName: this.ModuleName,
  //         ModuleCode: this.ModuleCode,
  //         WorkFlowID: null,
  //         ReadyToConfirm: null,
  //         selectedRow: this.selectedRow,
  //         selectedRegion: this.selectedRegion,
  //         ContractTypeCode: this.selectedRow.data.ContractTypeCode,
  //         ContractID: this.selectedRow.data.ContractId,
  //         ReceiveFactorID: this.selectedRow.data.ReceiveFactorID,
  //         OrderNo: this.selectedRow.data.OrderNo,
  //         PersianOrderDate: this.selectedRow.data.PersianOrderDate,
  //         Note: this.selectedRow.data.OrderNote,
  //         ContractOrderID: this.selectedRow.data.ContractOrderID,
  //         GridHeightInTab: 100,
  //         PanelHeightInTab: 99,
  //         RegionCode: this.selectedRow.data.RegionCode,
  //         RegionName: this.selectedRow.data.RegionName,
  //         SeasonCode: this.selectedRow.data.SeasonCode,
  //       };

  //     }

  //   }

  // }
  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }

  close(): void {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);

  }

  RedioClick(IsCost) {
    this.IsCost = IsCost;
    this.rowData = [];
    this.selectedRow = null;
  }

  
  // popupclosed() {
  //   this.btnclicked = false;
  //   this.HaveMaxBtn = false;
  //   this.HaveMaxBtn = false;
  //   // this.PercentWidth = null;
  //   // this.MainMaxwidthPixel = null;
  //   this.MinHeightPixel = null;
  //   this.type = '';
  //   this.HeightPercentWithMaxBtn = 95;
  //   // this.isClicked = false ;

  // }

}
