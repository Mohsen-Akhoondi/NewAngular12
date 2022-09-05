import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { WorkflowService } from 'src/app/Services/WorkFlowService/WorkflowServices';

@Component({
  selector: 'app-complete-contract-list-report',
  templateUrl: './complete-contract-list-report.component.html',
  styleUrls: ['./complete-contract-list-report.component.css']
})
export class CompleteContractListReportComponent implements OnInit {

  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  paramObj;
  PixelHeight;
  minWidthPixel;
  PixelWidth;
  PercentWidth;
  MainMaxwidthPixel;
  btnclicked;
  type;
  startLeftPosition;
  startTopPosition;
  HaveHeader: boolean;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  columnDef;
  rowData = [];
  CostCenterIDList = [];
  DisabledContractPayDate = false ;
  DisabledFromContractDate = false;
  DisabledToContractDate = false;
  DisabledWorkFlowDate = false;
  SelectMultipleCostCenter ;


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
  ModuleCode: number;
  selectedrow: any;
  HaveMaxBtn: boolean;
  IsInternal = true;
  GridDevHeight = 85;

  SumWCPAmount = '0';
  SumWTValue = '0';
  SumWFA = '0';
  SumFinalCAmount = '0';
  SumTCPA = '0';
  SumTTV = '0';
  SumTFA = '0';
  SumDA = '0';
  SumOCA = '0';
  SumTA = '0';
  SumCAmount = '0';
  SumAPercent = '0';

  SumAmountN = '0';
  SumContractPayAmountN = '0';
  SumTaxValueN = '0';
  SumFinalAmountN = '0';
  IsCost = true;
  SumDAStr = 'خالص پرداختی :';
  SumOCAStr = 'کسورات پرداختی :';
  SumTAStr = 'جمع پرداختی :';
  SumCAmountStr = 'بستانکاری ثبت شده : ';
  IsSeniorHeadReports = false;
  CheckValidate = false;
  IsContract = true;
  InWorkFlowSumStr = 'جمع صورت وضعیت در جریان';
  TerminateSumStr = 'جمع صورت وضعیت تایید نهایی';
  FinalAmountStr = 'مبلغ کل قرارداد :';
  ContractOperationID;
  ContractOperationParams = {
    bindLabelProp: 'ContractOperationName',
    bindValueProp: 'ContractOperationID',
    placeholder: '',
    MinWidth: '130px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  ContractOperationItems = [
    {
      ContractOperationName: 'پیش پرداخت',
      ContractOperationID: 1
    },
    {
      ContractOperationName: 'علی الحساب',
      ContractOperationID: 2
    },
    {
      ContractOperationName: 'کارکرد',
      ContractOperationID: 3
    },
    {
      ContractOperationName: 'تعدیل',
      ContractOperationID: 4
    },
  ];
  ContractPayDate: any;
  PersianContractPayDate: any;
  FromContractDate: any;
  PersianFromContractDate: any;
  ToContractDate: any;
  PersianToContractDate: any;
  WorkFlowDate : any;

  constructor(private router: Router,
    private ProductRequest: ProductRequestService,
    private Region: RegionListService,
    private ContractService: ContractListService,
    private route: ActivatedRoute,
    private WorkFlow: WorkflowService,) {
    this.columnDef = [];
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
      if (this.ModuleCode === 2964) {
        this.GridDevHeight = 83;
      }
    });

  }

  ngOnInit() {
    this.ContractService.CheckSeniorHeadReports().subscribe(res => {
      this.IsSeniorHeadReports = res;
    });

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 4;
  
    this.ColumnsDefinition();
  }

  popupclosed(param) {
    this.btnclicked = false;
    this.type = '';


  }

  onGridReady(params) {
  }

  RowClick(InputValue) {
    this.selectedrow = InputValue.data;
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
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }


  ColumnsDefinition() {

    if (this.ModuleCode === 2964) {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 80,
          resizable: true
        },
        {
          headerName: this.IsContract ? 'قرارداد' 
                                      : 'فاکتور',
          children: [
            {
              headerName: 'پیمانکار',
              field: 'ActorName',
              width: 150,
              resizable: true
            },
            {
              headerName: 'معاونت مجری',
              field: 'CostCenterName',
              width: 200,
              resizable: true
            },
            {
              headerName: 'شماره',
              field: 'LetterNo',
              width: 100,
              resizable: true
            },
            {
              headerName: 'موضوع',
              field: 'Subject',
              width: 250,
              resizable: true
            },
            {
              headerName: 'مبلغ',
              field: 'Amount',
              HaveThousand: true,
              width: 120,
              resizable: true,
              hide : !this.IsContract
            },
            {
              headerName: 'تاريخ قرارداد از',
              field: 'FromContractDatePersian',
              width: 150,
              resizable: true,
              hide : !this.IsContract
            },
            {
              headerName: 'تاريخ قرارداد تا',
              field: 'ToContractDatePersian',
              width: 150,
              resizable: true,
              hide : !this.IsContract
            },
          ]
        },
        {
          headerName: this.IsContract ? 'صورت وضعیت' 
                                      : 'فاکتور',
          children: [
            {
              headerName: 'شماره',
              field: 'ContractPayNoStr',
              width: 60,
              resizable: true,
              hide : !this.IsContract
            },
            {
              headerName: 'تاریخ صورت وضعیت',
              field: 'ContractPayDatePersian',
              width: 150,
              resizable: true,
              hide : !this.IsContract
            },
            {
              headerName: 'تاریخ ایجاد صورت وضعیت',
              field: 'WorkFlowDatePersian',
              width: 170,
              resizable: true,
              hide : !this.IsContract
            },
            {
              headerName: 'مبلغ',
              field: 'ContractPayAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'ارزش افزوده',
              field: 'TaxValue',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'مبلغ کل',
              field: 'FinalAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'نقش',
              field: 'RoleName',
              width: 150,
              resizable: true
            },
            {
              headerName: 'شخص',
              field: 'WorkFlowActorName',
              width: 150,
              resizable: true
            },
            {
              headerName: 'تاریخ',
              field: 'LongPersianWorkFlowHistoryDate',
              width: 150,
              resizable: true
            },
            {
              headerName: 'زمان انتظار (روز)',
              field: 'AvrageWaitingDay',
              width: 100,
              resizable: true
            },      
          ]
        },
      ];
    }
    if (this.ModuleCode === 2965) {
      this.columnDef = [
        {
          headerName: 'ردیف ',
          field: 'ItemNo',
          width: 50,
          resizable: true
        },
        {
          headerName: this.IsContract ?  'قرارداد' 
                                      : 'فاکتور',
          children: [
            {
              headerName: 'نوع پیمانکار',
              field: 'CorporateType',
              width: 80,
              resizable: true
            },
            {
              headerName: 'پیمانکار',
              field: 'ActorName',
              width: 150,
              resizable: true
            },
            {
              headerName: 'معاونت مجری',
              field: 'CostCenterName',
              width: 200,
              resizable: true
            },
            {
              headerName: 'تعداد',
              field: 'ContractCount',
              HaveThousand: true,
              width: 50,
              resizable: true
            },
            {
              headerName: 'مبلغ',
              field: 'Amount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
          ]
        },
        {
          headerName: this.IsContract ?  'صورت وضعیت در جریان'
                                         : 'فاکتور در جریان',
          children: [
            {
              headerName: 'تعداد',
              field: 'WorkflowContractPayCount',
              width: 50,
              resizable: true
            },
            {
              headerName: 'مبلغ',
              field: 'WorkflowContractPayAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'ارزش افزوده',
              field: 'WorkflowTaxValue',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'مبلغ کل',
              field: 'WorkflowFinalAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
          ]
        },
        {
          headerName: this.IsContract ? 'صورت وضعیت تایید نهایی' 
                                      : 'فاکتور تایید نهایی',
          children: [
            {
              headerName: 'تعداد',
              field: 'TreminateContractPayCount',
              width: 50,
              resizable: true
            },
            {
              headerName: 'مبلغ',
              field: 'TreminateContractPayAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'ارزش افزوده',
              field: 'TreminateTaxValue',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: 'مبلغ کل',
              field: 'TreminateFinalAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
          ]
        },
        {
          headerName: 'حسابداری',
          children: [
            {
              headerName: this.IsCost ? 'بستانکاری ثبت شده'
                : 'بدهکاری ثبت شده',
              field: this.IsCost ? 'CreditAmount' : 'DebitAmount',
              width: 120,
              resizable: true,
              HaveThousand: true,
            },
            {
              headerName: this.IsCost ? 'خالص پرداختی'
                : 'مبلغ دریافت شده',
              field: this.IsCost ? 'DebitAmount' : 'ReceiveDocAmount',
              HaveThousand: true,
              width: 120,
              resizable: true
            },
            {
              headerName: this.IsCost ? 'سایر کسور پرداختی'
                : 'سایر',
              field: this.IsCost ? 'OtherCreditAmount' : '',
              HaveThousand: true,
              width: 120,
              resizable: true,
              hide: !this.IsCost
            },
            {
              headerName: this.IsCost ? 'جمع پرداختی'
                : 'جمع دریافتی',
              field: this.IsCost ? 'TotalAmount' : '',
              HaveThousand: true,
              width: 120,
              resizable: true,
              hide: !this.IsCost
            },
            {
              headerName: this.IsCost ? 'درصد پرداختی به مبلغ کل'
                : 'درصد دریافتی به مبلغ کل',
              field: this.IsCost ? 'AmountPercent' : 'IncomeAmountPercent',
              width: 160,
              resizable: true
            },
          ]
        }
      ];
    }
  }

  Search() {

    if (!this.IsSeniorHeadReports && !this.CostCenterParams.selectedObject) {
      this.CheckValidate = true;
    }
    else {      
      this.ContractService.ContractListReport(this.RegionParams.selectedObject, this.CostCenterParams.selectedObject, this.ModuleCode, this.IsInternal, this.IsCost , this.IsContract, this.ContractOperationID,
         this.FromContractDate , this.ToContractDate, this.ContractPayDate , this.WorkFlowDate ).subscribe(res => {
        this.rowData = res;  
        if (this.ModuleCode === 2965) {
          this.SetSumFinalAmount(this.rowData);
        }
        if (this.ModuleCode === 2964) {
          this.SetSumAmount(this.rowData);
          
        }
      });
    }
  }

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

  ShowDetails() {
    if (this.selectedrow) {
      this.btnclicked = true;
      this.type = 'contract-wf-report-level2';
      this.paramObj = {
        RegionCode: this.RegionParams.selectedObject,
        CostCenterID: this.CostCenterParams.selectedObject,
        ActorID: this.selectedrow.ActorID,
        ModuleCode: this.ModuleCode,
        IsCost: this.IsCost,
        IsContract: this.IsContract,
      };
      this.PixelHeight = 593;
      this.startTopPosition = 10;
      this.startLeftPosition = 103;
    }
  }

  OnClickWorkFlowDetail() {
    if (this.selectedrow) {
      let WorkFlowInstanceId = -1;
      // tslint:disable-next-line:max-line-length
      this.WorkFlow.GetWfInstanceIDByObjIDAndRegionCode(this.selectedrow.CostFactorID, this.RegionParams.selectedObject).subscribe(res => {
        this.PixelWidth = null;
        WorkFlowInstanceId = res;
        this.type = 'user-work-log-details';
        this.btnclicked = true;
        this.PixelWidth = 1140;
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.startLeftPosition = 100;
        this.startTopPosition = 10;
        this.HeightPercentWithMaxBtn = 98;
        this.MinHeightPixel = 640;
        this.paramObj = {
          HeaderName: 'جزئیات گردش',
          LetterNo: this.selectedrow.LetterNo,
          Subject: this.selectedrow.Subject,
          ContractNo: this.selectedrow.LetterNo,
          ContractCode: this.selectedrow.LetterNo,
          SelectedContractID: -1,
          ContractorName: this.selectedrow.ActorName,
          ContractTypeName: '',
          ContractAmount: this.selectedrow.Amount,
          LetterDatePersian: '',
          workflowtypeStatus: 2,
          WorkFlowInstanceId: WorkFlowInstanceId,
          ContractPayNo: this.selectedrow.ContractPayNoStr,
          ParentModuleCode: this.ModuleCode,
          ContractPayTechnicalCode: '',
        }
      });
    } else {
      this.ShowMessageBoxWithOkBtn(' ردیفی جهت مشاهده انتخاب نشده است');
    }
  }

  OnCheckBoxChange(event) {
    this.IsInternal = event;
  }

  SetSumFinalAmount(event) {
    let SumWorkflowContractPayAmount = 0;
    let SumWorkflowTaxValue = 0;
    let SumWorkflowFinalAmount = 0;
    let SumFinalAmount = 0;
    let SumTreminateContractPayAmount = 0;
    let SumTreminateTaxValue = 0;
    let SumTreminateFinalAmount = 0;
    let SumDebitAmount = 0;
    let SumOtherCreditAmount = 0;
    let SumTotalAmount = 0;
    let SumCreditAmount = 0;
    let SumAmountPercent = 0;
    let SumReceiveDocAmount = 0;
    let SumIncomeAmountPercent = 0;

    if (this.rowData) {
      this.rowData.forEach(item => {
        if (item.WorkflowContractPayAmount) {
          SumWorkflowContractPayAmount = SumWorkflowContractPayAmount + item.WorkflowContractPayAmount;
        }
        if (item.WorkflowTaxValue) {
          SumWorkflowTaxValue = SumWorkflowTaxValue + item.WorkflowTaxValue;
        }
        if (item.WorkflowFinalAmount) {
          SumWorkflowFinalAmount = SumWorkflowFinalAmount + item.WorkflowFinalAmount;
        }
        if (item.Amount) {
          SumFinalAmount = SumFinalAmount + item.Amount;
        }
        if (item.TreminateContractPayAmount) {
          SumTreminateContractPayAmount = SumTreminateContractPayAmount + item.TreminateContractPayAmount;
        }
        if (item.TreminateTaxValue) {
          SumTreminateTaxValue = SumTreminateTaxValue + item.TreminateTaxValue;
        }
        if (item.TreminateFinalAmount) {
          SumTreminateFinalAmount = SumTreminateFinalAmount + item.TreminateFinalAmount;
        }
        if (item.DebitAmount) {
          SumDebitAmount = SumDebitAmount + item.DebitAmount;
        }
        if (item.OtherCreditAmount) {
          SumOtherCreditAmount = SumOtherCreditAmount + item.OtherCreditAmount;
        }
        if (item.TotalAmount) {
          SumTotalAmount = SumTotalAmount + item.TotalAmount;
        }
        if (item.CreditAmount) {
          SumCreditAmount = SumCreditAmount + item.CreditAmount;
        }
        if (SumTotalAmount && SumTreminateFinalAmount) {
          SumAmountPercent = ((SumTotalAmount / SumTreminateFinalAmount) * 100);
        }
        if (item.ReceiveDocAmount) {
          SumReceiveDocAmount = SumReceiveDocAmount + item.ReceiveDocAmount;
        }
        if (SumReceiveDocAmount && SumTreminateFinalAmount) {
          SumIncomeAmountPercent = ((SumReceiveDocAmount / SumTreminateFinalAmount) * 100);
        }
      });
    }
    this.SumWCPAmount = SumWorkflowContractPayAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumWTValue = SumWorkflowTaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumWFA = SumWorkflowFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalCAmount = SumFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumTCPA = SumTreminateContractPayAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumTTV = SumTreminateTaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumTFA = SumTreminateFinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumDA = this.IsCost ? SumDebitAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
      SumReceiveDocAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumOCA = SumOtherCreditAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumTA = SumTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumCAmount = this.IsCost ? SumCreditAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') :
      SumDebitAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumAPercent = this.IsCost ? parseFloat(SumAmountPercent.toString().replace(/,/g, '')).toFixed(2) :
      parseFloat(SumIncomeAmountPercent.toString().replace(/,/g, '')).toFixed(2);
  }
  SetSumAmount(event) {
    let SumAmount = 0;
    let SumContractPayAmount = 0;
    let SumTaxValue = 0;
    let SumFinalAmountt = 0;

    if (this.rowData) {
      this.rowData.forEach(item => {
        if (item.Amount) {
          SumAmount = SumAmount + item.Amount;
        }
        if (item.ContractPayAmount) {
          SumContractPayAmount = SumContractPayAmount + item.ContractPayAmount;
        }
        if (item.TaxValue) {
          SumTaxValue = SumTaxValue + item.TaxValue;
        }
        if (item.FinalAmount) {
          SumFinalAmountt = SumFinalAmountt + item.FinalAmount;
        }
      });
    }
    this.SumAmountN = SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumContractPayAmountN = SumContractPayAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumTaxValueN = SumTaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.SumFinalAmountN = SumFinalAmountt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  RedioClick(IsCost) {
    this.IsCost = IsCost;
    this.rowData = [];
    this.selectedrow = null;

    this.SumWCPAmount = '0';
    this.SumWTValue = '0';
    this.SumWFA = '0';
    this.SumFinalCAmount = '0';
    this.SumTCPA = '0';
    this.SumTTV = '0';
    this.SumTFA = '0';
    this.SumDA = '0';
    this.SumOCA = '0';
    this.SumTA = '0';
    this.SumCAmount = '0';
    this.SumAPercent = '0';

    this.SumAmountN = '0';
    this.SumContractPayAmountN = '0';
    this.SumTaxValueN = '0';
    this.SumFinalAmountN = '0';

    this.ColumnsDefinition();

    if (this.IsCost) {
      this.SumDAStr = 'خالص پرداختی :';
      this.SumOCAStr = ' کسورات پرداختی :';
      this.SumTAStr = 'جمع پرداختی :';
      this.SumCAmountStr = 'بستانکاری ثبت شده : ';
    } else {
      this.SumDAStr = ' مبلغ دریافت شده :';
      this.SumOCAStr = ' کسورات  :';
      this.SumTAStr = 'جمع کل  :';
      this.SumCAmountStr = 'بدهکاری ثبت شده : ';
    }
  }

  ContractRedioClick(IsContract) {
    this.IsContract = IsContract;
    this.rowData = [];
    this.selectedrow = null;
    this.ColumnsDefinition();
    this.SumWCPAmount = '0';
    this.SumWTValue = '0';
    this.SumWFA = '0';
    this.SumFinalCAmount = '0';
    this.SumTCPA = '0';
    this.SumTTV = '0';
    this.SumTFA = '0';
    this.SumDA = '0';
    this.SumOCA = '0';
    this.SumTA = '0';
    this.SumCAmount = '0';
    this.SumAPercent = '0';

    this.SumAmountN = '0';
    this.SumContractPayAmountN = '0';
    this.SumTaxValueN = '0';
    this.SumFinalAmountN = '0';

    if(this.IsContract) {
      this.InWorkFlowSumStr = 'جمع صورت وضعیت در جریان';
      this.TerminateSumStr = 'جمع صورت وضعیت تایید نهایی';
      this.FinalAmountStr = 'مبلغ کل قرارداد :';
      this.DisabledContractPayDate = false;
      this.DisabledFromContractDate = false;
      this.DisabledToContractDate = false;
      this.DisabledWorkFlowDate = false;
    } else {
      this.InWorkFlowSumStr = 'جمع فاکتور در جریان';
      this.TerminateSumStr = 'جمع فاکتور تایید نهایی';
      this.FinalAmountStr = 'مبلغ کل فاکتور :';
      this.ContractPayDate = null;
      this.FromContractDate = null;
      this.ToContractDate = null;
      this.WorkFlowDate = null ;
      this.DisabledContractPayDate = true;
      this.DisabledFromContractDate = true;
      this.DisabledToContractDate = true;
      this.DisabledWorkFlowDate = true;
    }
  }
  OnChangeContractOperation(event) {
    this.ContractOperationID = event;
  }
  OnContractPayDateChange(ADate) {
    this.ContractPayDate = ADate.MDate;

  }

  OnFromContractDateChange(ADate) {
    this.FromContractDate = ADate.MDate;
    
  }

  OnToContractDateChange(ADate) {
    this.ToContractDate = ADate.MDate;
   
  }
  OnWorkFlowDateChange(ADate) {
    this.WorkFlowDate = ADate.MDate;

  }

  OnChangeCheckBoxValue(Ischeck, type) {
    switch (type) {
      case 'SelectMultipleCostCenter':
        {

          this.SelectMultipleCostCenter = Ischeck;
          const CostCenterIdList = [];
          if (Ischeck) {
            this.CostCenterItems.forEach(item => {
              CostCenterIdList.push(item.CostCenterId);
              
            });
            this.CostCenterParams.selectedObject = CostCenterIdList;
          }
          
        }
        if (!Ischeck) {
          this.CostCenterParams.selectedObject = null;
        }
        break;
      default:
        break;
    }

  }
}
