import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
import { NgSelectCellEditorComponent } from 'src/app/Shared/NgSelectCellEditor/ng-select-cell-editor.component';
import { FinYearService } from 'src/app/Services/BaseService/FinYearService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { AutomationService } from 'src/app/Services/BaseService/AutomationService';
import { NumberInputComponentComponent } from 'src/app/Shared/CustomComponent/InputComponent/number-input-component/number-input-component.component';

@Component({
  selector: 'app-provision',
  templateUrl: './provision.component.html',
  styleUrls: ['./provision.component.css']
})
export class ProvisionComponent implements OnInit {
  @Input() PopupParam;
  @Output() PopupOutPut: EventEmitter<any> = new EventEmitter<any>();
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  ProvisionCode;
  ProvisionSubject;
  SumAmountStr = '';
  ColDef;
  IsCentralize = false;
  IsTaxValue = false;
  rowsData;
  ProductRequestCode;
  ProductRequestDate;
  Subject;
  Amount: any;
  TaxValue: any;
  FinalAmount: any;
  LetterNo;
  LetterDate;
  LetterParam = {
    CostFactorID: -1,
    RegionCode: -1,
    LetterTypeCodeList: [],
    OrganizationCode: -1,
    SaveMode : false,
  };
  GridApi: any;
  ProductRequestObject = null;
  isClicked: boolean;
  PopUpType: string;
  startLeftPosition: number;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startTopPosition: number;
  BgtExpertNote;
  EstimateNote;
  IsEditable;
  CostFactorLetter: any;
  SelectedDocument: any;
  LetterTypeCode = 17;

  constructor(private FinYear: FinYearService,
    private ProductRequest: ProductRequestService,
    private Automation: AutomationService) {
    this.Amount = 0;
    this.TaxValue = 0;
    this.FinalAmount = 0;
    this.ColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true,
      },
      {
        headerName: 'سال مالی',
        field: 'FinYearCode',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.FinYear.GetFinYearList(false),
          bindLabelProp: 'FinYearCode',
          bindValueProp: 'FinYearCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.FinYearCode;
          } else {
            return '';
          }
        },
        width: 100,
        resizable: true,
      },
      {
        headerName: 'کد بودجه',
        field: 'BgtTopicNameCode',
        width: 150,
        resizable: true,
      },
      {
        headerName: 'نقدی / غیر نقدی',
        field: 'IsCashName',
        cellEditorFramework: NgSelectCellEditorComponent,
        cellEditorParams: {
          Items: this.ProductRequest.GetCreditTypeList(false),
          bindLabelProp: 'CreditTypeName',
          bindValueProp: 'CreditTypeCode'
        },
        cellRenderer: 'SeRender',
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value.CreditTypeName;
          } else {
            return '';
          }
        },
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ مصوب',
        field: 'ApprovalAmount',
        HaveThousand: true,
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ  تخصیص (کمیسیون)',
        field: 'AllocateAmount',
        width: 150,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مبلغ تامین شده',
        field: 'ProvisionAmount',
        width: 150,
        HaveThousand: true,
        resizable: true,
      },
      {
        headerName: 'مانده مصوب نسبت به تامین',
        field: 'RemainApprovalAmount',
        width: 160,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مبلغ تامین',
        field: 'Amount',
        width: 110,
        resizable: true,
        cellEditorFramework: NumberInputComponentComponent,
        cellRenderer: 'SeRender',
        HaveThousand: true,
        valueFormatter: function currencyFormatter(params) {
          if (params.value) {
            return params.value;
          } else {
            return '';
          }
        },
      },
      {
        headerName: 'مبلغ نهایی مصوب نسبت به تامین',
        field: 'FinalRemain',
        width: 190,
        resizable: true,
        HaveThousand: true,
      }
    ];
  }

  ngOnInit() {
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.CustomCheckBoxConfig.AriaWidth = 50;
    this.rowsData = [];
    this.IsEditable = this.PopupParam.IsEditable;
    if (this.PopupParam.ProductRequestObject) {
    this.ProductRequestObject = this.PopupParam.ProductRequestObject;
    this.SetProductRequestObject();
    this.SetLetterDetails();
    } else if (this.PopupParam.ProductRequestID) { // RFC 51561
        this.ProductRequest.GetProductRequest(this.PopupParam.ProductRequestID).subscribe(res => {
          if (res) {
            this.ProductRequestObject = res;
            this.SetProductRequestObject();
            this.SetLetterDetails();
          }
      });
  }
  }
  SetProductRequestObject() {
    let SumApprovalAmount = 0;
    let SumProvisionAmount = 0;
    let SumRemainApprovalAmount = 0;
    let SumFinalRemain = 0;
    let SumAmount = 0;
    let SumAllocateAmount = 0;

    this.ProductRequestCode = this.ProductRequestObject.ProductRequestCode;
    this.ProductRequestDate = this.ProductRequestObject.ShortProductRequestDate;
    this.Subject = this.ProductRequestObject.Subject;
    this.IsCentralize = this.ProductRequestObject.IsProvisionCentralized;
    this.IsTaxValue = this.ProductRequestObject.IsTaxValue;
    this.BgtExpertNote = this.ProductRequestObject.BgtExpertNote;
    this.EstimateNote = this.ProductRequestObject.EstimateNote;
    this.ProductRequest.HasProductRequestEstimate(this.ProductRequestObject.CostFactorID).subscribe(res => {
      if (res) {
        this.ProductRequestObject.ProductRequestItemList.forEach(element => {
          this.Amount += element.AmountCOEFPact;
          // this.OnChTaxValueChange(false); // RFC 51395 و هماهنگی با آقای آخوندی
        });
      } else {
        this.ProductRequestObject.ProductRequestItemList.forEach(element => {
          this.Amount += element.AmountCOEFPact;
          // this.OnChTaxValueChange(false); // RFC 51395 و هماهنگی با آقای آخوندی
        });
      }
      this.ProductRequest.GetProvision(this.ProductRequestObject.CostFactorID).subscribe(res => {
        if (res) {
          this.ProvisionCode = res.ProvisionCode;
          this.ProvisionSubject = res.Subject;
          this.rowsData = res.ProvisionItemList;
  
          res.ProvisionItemList.forEach(function (node) {
            if (node.ApprovalAmount) {
              SumApprovalAmount = SumApprovalAmount + node.ApprovalAmount;
            }
            if (node.ProvisionAmount) {
              SumProvisionAmount = SumProvisionAmount + node.ProvisionAmount;
            }
            if (node.RemainApprovalAmount) {
              SumRemainApprovalAmount = SumRemainApprovalAmount + node.RemainApprovalAmount;
            }
            if (node.FinalRemain) {
              SumFinalRemain = SumFinalRemain + node.FinalRemain;
            }
            if (node.Amount) {
              SumAmount = SumAmount + node.Amount;
            }
            if (node.AllocateAmount) {
              SumAllocateAmount = SumAllocateAmount + node.AllocateAmount;
            }
          });

          this.SumAmountStr = '   مبلغ مصوب  :  ' + SumApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            '   مبلغ تامین شده  :  ' + SumProvisionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            '   مبلغ  تخصیص  :  ' + SumAllocateAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            '   مبلغ مصوب نسبت به تامین :  ' + SumRemainApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            '   مبلغ تامین  :  ' + SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
            '   مبلغ نهایی مصوب  :  ' + SumFinalRemain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
      });
      this.OnChCentralizeChange(this.IsCentralize);
      this.OnChTaxValueChange(this.IsTaxValue);
      this.Amount = this.Amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
  }
  OnChCentralizeChange(event) {
    this.IsCentralize = event;
    const LetterTypeCodeList = [];
    LetterTypeCodeList.push(2);
    this.LetterParam = {
      CostFactorID: this.ProductRequestObject.CostFactorID,
      RegionCode: this.ProductRequestObject.RegionCode,
      LetterTypeCodeList: LetterTypeCodeList,
      OrganizationCode: this.ProductRequestObject.OrganizationCode,
      SaveMode: false,
    };
  }

  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
  }

  OnChTaxValueChange(event) {

    this.IsTaxValue = event;
    if (this.IsTaxValue) {
      // tslint:disable-next-line: radix
      this.TaxValue = Math.round(parseFloat((this.Amount.toString()).replace(/,/g, '')) * 0.09);
      this.TaxValue = this.TaxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      this.TaxValue = 0;
    }
    // tslint:disable-next-line: radix
    this.FinalAmount = Math.round(parseFloat(this.Amount.toString().replace(/,/g, ''))) +
     Math.round(parseFloat(this.TaxValue.toString().replace(/,/g, '')));
    this.FinalAmount = this.FinalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onSave() {
    this.ProductRequest.SaveProductRequestEstimateNote(this.ProductRequestObject.CostFactorID , this.EstimateNote,
      this.CostFactorLetter ? this.CostFactorLetter : null, this.SelectedDocument ? this.SelectedDocument : null).subscribe(res => {
      this.ProductRequestObject = res;
      this.PopupOutPut.emit(this.ProductRequestObject);
      this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
    },
      err => {
        this.ShowMessageBoxWithOkBtn('ثبت با خطا مواجه شد');
      });
  }


  onGridReady(params) {
    this.GridApi = params.api;
  }

  Close() {
    this.Closed.emit(true);
  }

  OnLetterDateChange(ADate) {
    this.LetterDate = ADate.MDate;
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  SetSumFinalAmount() {
    let SumApprovalAmount = 0;
    let SumProvisionAmount = 0;
    let SumRemainApprovalAmount = 0;
    let SumFinalRemain = 0;
    let SumAmount = 0;
    if (this.GridApi) {
      this.GridApi.forEachNodeAfterFilter(function (node) {
        if (node.data.ApprovalAmount) {
          SumApprovalAmount = SumApprovalAmount + node.data.ApprovalAmount;
        }
        if (node.data.ProvisionAmount) {
          SumProvisionAmount = SumProvisionAmount + node.data.ProvisionAmount;
        }
        if (node.data.RemainApprovalAmount) {
          SumRemainApprovalAmount = SumRemainApprovalAmount + node.data.RemainApprovalAmount;
        }
        if (node.data.FinalRemain) {
          SumFinalRemain = SumFinalRemain + node.data.FinalRemain;
        }
        if (node.data.Amount) {
          // tslint:disable-next-line:radix
          SumAmount = SumAmount + parseInt(node.data.Amount);
        }
      });

      this.SumAmountStr = '  مبلغ مصوب  : ' + SumApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ تامین شده  : ' + SumProvisionAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ مصوب نسبت به تامین : ' + SumRemainApprovalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ تامین  : ' + SumAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '  مبلغ نهایی مصوب  : ' + SumFinalRemain.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  OnRowDataChanged() {
    this.SetSumFinalAmount();
  }

  OnRowDataUpdated() {
    this.SetSumFinalAmount();
  }

  OnFilterChanged() {
    this.SetSumFinalAmount();
  }
  AutomationOutPutParam(param) {
    if (param.PopUpType === 'app-automation') {
      this.CostFactorLetter = {
        CostFactorID: this.ProductRequestObject.CostFactorID,
        LetterTypeCode: 17,
        OrganizationCode: this.ProductRequestObject.OrganizationCode,
        RegionCode : this.ProductRequestObject.RegionCode
      };
      this.SelectedDocument = {
        DocumentId : param.DocumentId,
        DocumentLetterDate : param.DocumentLetterDate,
        DocumentSubject : param.DocumentSubject,
        FolID : param.FolID,
        OrgID : param.OrgID,
        PersonelID : param.PersonelID,
        RegisterLetterDate : param.RegisterLetterDate,
        RegisterLetterNo : param.RegisterLetterNo,
        SenID : param.SenID
      };
    }
  }

  SetLetterDetails() {
    if (this.ProductRequestObject.CostFactorID && this.LetterTypeCode && this.ProductRequestObject.OrganizationCode) {
      // tslint:disable-next-line: max-line-length
      this.Automation.GetAutomationLetter(this.ProductRequestObject.CostFactorID, this.LetterTypeCode, this.ProductRequestObject.OrganizationCode)
        .subscribe(res => {
          this.LetterDate = res.RegisterLetterDate;
          this.LetterNo = res.RegisterLetterNo;
        });
    }
  }
  onShowLetterClick(InputLetterTypeCode = null) {
    if (this.ProductRequestObject.CostFactorID && (this.LetterTypeCode || InputLetterTypeCode)) {
      const CostFactorLetter = {
        CostFactorID: this.ProductRequestObject.CostFactorID,
        LetterTypeCode: InputLetterTypeCode ? InputLetterTypeCode : this.LetterTypeCode
      };
      this.Automation.ShowLetter(CostFactorLetter);
    }
  }
}
