import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-contract-wf-report-level2',
  templateUrl: './contract-wf-report-level2.component.html',
  styleUrls: ['./contract-wf-report-level2.component.css']
})
export class ContractWfReportLevel2Component implements OnInit {
  BoxDevHeight;
  columnDef;
  rowData;
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  selectedrow: any;
  btnclicked: boolean;
  type: string;
  paramObj;
  PixelHeight: number;
  startTopPosition: number;
  startLeftPosition: number;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  PixelWidth: number;
  HeightPercentWithMaxBtn: number;
  MinHeightPixel: number;
  IsCost ; 
  IsContract;
  constructor(private ContractService: ContractListService,) { 
    this.rowData = [];
 
  }

  ngOnInit() {
    this.IsCost = this.InputParam.IsCost;
    this.IsContract = this.InputParam.IsContract;
    this.ColumnsDefinition();
    this.ContractService.ContractWfReportLevel2(this.InputParam.RegionCode, this.InputParam.CostCenterID, this.InputParam.ModuleCode , this.InputParam.ActorID , this.IsCost , this.IsContract).subscribe(res => {
      this.rowData = res;
    });

  }

  ColumnsDefinition() {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
        headerName:this.IsContract  ? 'قرارداد'
                                    : 'فاکتور',
        children: [
          {
            headerName: 'شماره',
            field: 'LetterNo',
            width: 110,
            resizable: true
          },
          {
            headerName:this.IsContract  ? 'تاریخ شروع'
                                        : 'تاریخ',
            field: 'StartDatePersian',
            width: 100,
            resizable: true
          },
          {
            headerName: 'تاریخ پایان',
            field: 'EndDatePersian',
            width: 100,
            resizable: true,
            hide : !this.IsContract 
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
        ]
      },
      {
        headerName:this.IsContract  ?  'صورت وضعیت در جریان'
                                    : 'فاکتور در جریان',
        children: [
          {
            headerName: 'تعداد',
            field: 'WorkflowContractPayCount',
            width: 50,
            resizable: true,
            hide : !this.IsContract 
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
        headerName:this.IsContract  ?  'صورت وضعیت تایید نهایی'
                                    : 'فاکتور تایید نهایی',
        children: [
          {
            headerName: 'تعداد',
            field: 'TreminateContractPayCount',
            width: 50,
            resizable: true,
            hide : !this.IsContract 
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
            hide : !this.IsCost
          },
          {
            headerName: this.IsCost ? 'جمع پرداختی'
                : 'جمع دریافتی',
              field: this.IsCost ? 'TotalAmount' : '',
            HaveThousand: true,
            width: 120,
            resizable: true,
            hide : !this.IsCost
          },
        ]
      }
    ];
  }

  RowClick(InputValue) {
    this.selectedrow = InputValue;
  }
  
  onGridReady(event) {

  }
  
  ShowDetails() {
    if (this.selectedrow && this.selectedrow.data) {
      this.btnclicked = true;
      this.type = 'contract-wf-report-level3';
      this.paramObj = {
        RegionCode: this.InputParam.RegionCode,
        CostCenterID: this.InputParam.CostCenterID,
        ContractID: this.selectedrow.data.ContractId,
        IsCost: this.IsCost,
      };
    
      this.PixelHeight = 593;
      this.startTopPosition = 10;
      this.startLeftPosition = 103;
    }
  }

  close(){
   this.Closed.emit(true);
  }

  popupclosed(event){
    this.btnclicked = false;
    this.type = '';
    this.PixelWidth = null;
    this.PixelHeight = null;
    this.startLeftPosition = null;
    this.startTopPosition = null;
    this.HeightPercentWithMaxBtn = null;
  }

  onShowContract() {
    if (!this.selectedrow) {
      return;
    }

        this.type = 'contract-case';
        this.HaveHeader = true;
        this.HaveMaxBtn = true;
        this.PixelWidth = 1290;
        this.PixelHeight = 630;
        this.startLeftPosition = 50;
        this.startTopPosition = 4;
        this.HeightPercentWithMaxBtn = 98;
        this.MinHeightPixel = 630;
        this.paramObj = {
          HeaderName:'پرونده فنی قرارداد' ,
          ModuleCode: 2965,
          selectedRow: this.selectedrow,
          GridHeightInTab: 100,
          PanelHeightInTab: 99,
          HaveSave: false,
          IsViewable: true,
          IsEditable: false,
          SelectedContractID: this.selectedrow.data.ContractId,
          ProductRequestID: this.selectedrow.data.ProductRequestID,
          ModuleViewTypeCode : 5555,
          BeforPageTypeName: 'contract-list-page'
        };
        this.btnclicked = true;
  }
}
