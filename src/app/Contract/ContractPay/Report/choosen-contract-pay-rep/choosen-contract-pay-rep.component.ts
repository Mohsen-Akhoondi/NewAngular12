import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContractPayDetailsService } from 'src/app/Services/ContractService/Contract_Pay/ContractPayDetailsService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-choosen-contract-pay-rep',
  templateUrl: './choosen-contract-pay-rep.component.html',
  styleUrls: ['./choosen-contract-pay-rep.component.css']
})
export class ChoosenContractPayRepComponent implements OnInit {
  @Input() PopupParam;
  @Output() ChoosenContractPayClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  RepLevelCode;
  ChangeDetection = false;
  btnclicked = false;
  type: string;
  CostFactorID;
  ContractID;
  ContractPayNo;
  ContractOperationyID;
  HaveHeader: boolean;
  startLeftPosition;
  ParamObj;
  CheckContractOperation: any;
  startTopPosition;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  SelectedLevelCode = 0;
  ContractorName;
  Subject;
  PeymanItems: any[];
  SelectedPeyman = 1;
  IsPeymanClick = true;
  isCheckpeyman = false;
  FromContractDatePersian;
  ToContractDatePersian;
  selectPeyman;
  IsColorful = false;
  IsRedioClick = false;
  isClicked;
  Select = false;
  closee;
  ModuleCode;
  ShowSign = false;

  constructor(private router: Router,
    private ContractPayDetails: ContractPayDetailsService,
    private route: ActivatedRoute,
    private Report: ReportService) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }

  ngOnInit() {
    this.CostFactorID = this.PopupParam.SelectedCPCostFactorID
    this.ContractPayDetails.HasEndedWorkflow(this.CostFactorID).subscribe(res => {
      this.ShowSign = res;
    });
    this.PeymanItems = [
      {
        PeymanName: 'کارت پیمان',
        PeymanValue: 1
      },
      {
        PeymanName: 'کارت پیمان به ریز پروژه',
        PeymanValue: 2
      },
      {
        PeymanName: 'کارت پیمان دو',
        PeymanValue: 3
      },
      {
        PeymanName: 'کارت پیمان دو بدون اطلاعات چک',
        PeymanValue: 4
      },
      {
        PeymanName: 'کارت پیمان دو بدون اطلاعات چک و علی الحساب',
        PeymanValue: 5
      }
    ];
    this.selectPeyman = this.PeymanItems[0].PeymanValue;
  }
  onChangePeymanCardObj(newObj) {
    this.SelectedPeyman = newObj;
  }
  onPrintClick() {
    // tslint:disable-next-line:max-line-length
    if (this.isCheckpeyman || this.SelectedLevelCode !== 0) {
      this.ContractID = this.PopupParam.SelectedContractID;
      this.ContractPayNo = this.PopupParam.ContractPayNo;
      if (this.ContractPayNo) {
        this.btnclicked = false;
        if (this.isCheckpeyman) {
          if (this.SelectedPeyman === 1) {
            this.Report.ContractPayDetailsFirstLevelReport(
              this.ModuleCode,
              this.CostFactorID,
              this.ContractID,
              this.IsColorful,
              'چاپ لیست با شماره صورت وضعیت',
              this.ContractPayNo,
              this.PopupParam.RegionCode);
            return;
          }
          if (this.SelectedPeyman === 2) {
            this.Report.ContractPayDetailsFirstLevelReport(
              this.ModuleCode,
              this.CostFactorID,
              this.ContractID,
              this.IsColorful,
              'کارت پیمان به ریز پروژه',
              this.ContractPayNo,
              this.PopupParam.RegionCode);
            return;
          }
          if (this.SelectedPeyman === 3) {
            this.Report.ContractPayDetailsFirstLevelReport(
              this.ModuleCode,
              this.CostFactorID,
              this.ContractID,
              this.IsColorful,
              'چاپ کارت پیمان دو',
              this.ContractPayNo,
              this.PopupParam.RegionCode);
            return;
          }
          if (this.SelectedPeyman === 4) {
            this.Report.ContractPayDetailsFirstLevelReport(
              this.ModuleCode,
              this.CostFactorID,
              this.ContractID,
              this.IsColorful,
              'چاپ کارت پیمان دو بدون اطلاعات چک',
              this.ContractPayNo,
              this.PopupParam.RegionCode);
            return;
          }
          if (this.SelectedPeyman === 5) {
            this.Report.ContractPayDetailsFirstLevelReport(
              this.ModuleCode,
              this.CostFactorID,
              this.ContractID,
              this.IsColorful,
              'چاپ کارت پیمان دو بدون اطلاعات چک و علی الحساب',
              this.ContractPayNo,
              this.PopupParam.RegionCode);
            return;
          }
        }
        if (this.SelectedLevelCode === 2) {
          this.ContractID = this.PopupParam.SelectedContractID;
          this.Report.ContractPayDetailsFirstLevelReport(
            this.ModuleCode,
            this.CostFactorID,
            this.ContractID,
            this.IsColorful,
            'چاپ خالص صورت وضعیت',
            0,
            this.PopupParam.RegionCode
          );
        }
        if (this.SelectedLevelCode === 5) {
          this.ContractID = this.PopupParam.SelectedContractID;
          this.ContractPayDetails.CheckContractOperation(this.CostFactorID).subscribe(res => {
            this.CheckContractOperation = res ? 1 : 0;
            if (this.CheckContractOperation === 0) {
              this.Report.ContractPayDetailsFirstLevelReport(
                this.ModuleCode,
                this.CostFactorID,
                this.ContractID,
                this.IsColorful,
                'حواله حسابداری',
                0,
                this.PopupParam.RegionCode
              );
            } else {
              this.ShowMessageBoxWithOkBtn('ردیف انتخاب شده صورت وضعیت نمی باشد');
            }
          });
        }
      } else {
        if (this.SelectedLevelCode === 1) {
        } else {
          this.ShowMessageBoxWithOkBtn('ردیفی جهت چاپ انتخاب نکرده اید!');
        }
      }
      if (this.SelectedLevelCode === 1) {
        this.CostFactorID = this.PopupParam.SelectedCostFactorID;
        this.ContractID = this.PopupParam.SelectedContractID;
        this.Report.ContractPayDetailsFirstLevelReport(
          this.ModuleCode,
          this.CostFactorID,
          this.ContractID,
          this.IsColorful,
          'چاپ لیست بدون شماره صورت وضعیت',
          0,
          this.PopupParam.RegionCode
        );
      }
      if (this.SelectedLevelCode === 3) {
        // this.PriceList.PriceListThirdLevelReport(this.SelectedContractID);
      }
      if (this.SelectedLevelCode === 4) {
        // this.PriceList.PriceListFourthLevelReport(this.SelectedContractID);
      }
      if (this.SelectedLevelCode === 6) {
        // this.PriceList.PriceListFourthLevelReport(this.SelectedContractID);
      }
      if (this.SelectedLevelCode === 7) {
        // this.ContractPayDetails.ContractPayDetailsSeventhLevelReport(this.PopupParam.SelectedCPCostFactorID, this.ContractID,
        //   this.PopupParam.ModuleCode, this.IsColorful, 'اقدام صورت وضعیت');
      }
      if (this.SelectedLevelCode === 8) { 
        this.ContractID = this.PopupParam.SelectedContractID;
        this.Report.ContractPayRep(
          this.ContractID,
          this.CostFactorID,
          this.PopupParam.RegionCode,
          this.ModuleCode,
          this.ShowSign,
          'گزارش صورت وضعیت'
        );
      }
      if (this.SelectedLevelCode === 9) {
        this.Report.ContractPayDetailsFirstLevelReport(
          this.ModuleCode,
          this.CostFactorID,
          this.ContractID,
          this.IsColorful,
          'گزارش خلاصه مالی کل',
          this.ContractPayNo,
          this.PopupParam.RegionCode,
          this.ShowSign
        );
        return;
      }
    } else {
      this.Select = true;
      this.ShowMessageBoxWithOkBtn('لطفا یک گزینه را برای چاپ انتخاب کنید!');
    }
  }

  onRedioClick(LevelCode: number) {
    this.IsRedioClick = !this.IsRedioClick;
    if (LevelCode === 1 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 1;
    }
    if (LevelCode === 2 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 2;
    }
    if (LevelCode === 3 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 3;
    }
    if (LevelCode === 4 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 4;
    }
    if (LevelCode === 5 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 5;
    }
    if (LevelCode === 6 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 6;
    }
    if (LevelCode === 7 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 7;
    }
    if (LevelCode === 8 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 8;
    }
    if (LevelCode === 9 && (this.isCheckpeyman === false)) {
      this.SelectedLevelCode = 9;
    }
  }
  PrintPeymanCard() {
    this.isCheckpeyman = !this.isCheckpeyman;
    this.IsPeymanClick = !this.isCheckpeyman;
  }
  PrintColorfulBackground() {
    this.IsColorful = !this.IsColorful;
  }
  ShowMessageBoxWithOkBtn(message) {
    if (this.Select === true) {
      this.closee = 'message-box-select';
    } else {
      this.closee = 'message-box';
    }
    this.type = 'message-box';
    this.btnclicked = true;
    this.HaveHeader = true;
    this.startLeftPosition = 449;
    this.startTopPosition = 87;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  popupclosed() {
    this.btnclicked = false;
    this.ChoosenContractPayClosed.emit(true);
  }
  popupclosedwithoutexit() {
    this.btnclicked = false;
  }
}
