import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';

@Component({
  selector: 'app-current-suppliers-contract',
  templateUrl: './current-suppliers-contract.component.html',
  styleUrls: ['./current-suppliers-contract.component.css']
})
export class CurrentSuppliersContractComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() PopupParam;
  columnDef;
  rowData: any = [];
  ActorID;
  isClicked = false;
  startLeftPosition = 200;
  startTopPosition = 100;
  PopUpType;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HeightPercentWithMaxBtn;
  HaveHeader;
  PercentWidth;
  MainMaxwidthPixel;
  MinHeightPixel;
  OverMainMinwidthPixel;

  constructor(private ContractList: ContractListService) {

    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'کد درخواست معامله',
        field: 'ProductRequestCode',
        width: 130,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ درخواست',
        field: 'PersianProductRequestDate',
        width: 130,
        resizable: true
      },
      {
        headerName: 'روش انجام معامله',
        field: 'DealMethodName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'حد معامله',
        field: 'DealTypeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'معاونت مجری',
        field: 'CostCenterName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'رسته',
        field: 'PriceListTopicName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'موضوع درخواست',
        field: 'PrSubject',
        width: 250,
        resizable: true
      },
      {
        headerName: 'سال مالی قرارداد',
        field: 'FinYearCode',
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره قرارداد',
        field: 'LetterNo',
        width: 130,
        resizable: true
      },
      {
        headerName: 'وضعیت قرارداد',
        field: 'ContractStatusName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'نوع قرارداد',
        field: 'ContractTypeName',
        width: 130,
        resizable: true
      },
      {
        headerName: 'موضوع قرارداد',
        field: 'Contractsubject',
        width: 250,
        resizable: true
      },
      {
        headerName: 'مبلغ قرارداد',
        field: 'ContractAmount',
        width: 130,
        resizable: true
      },
      {
        headerName: 'مبلغ  برنده',
        field: 'SumPrice',
        width: 130,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    if (this.PopupParam && this.PopupParam.ActorID) {
      this.ActorID = this.PopupParam.ActorID;
      this.ContractList.GetTotalRemained(this.ActorID).subscribe(res => {
        if (res && res.length > 0) {
          this.rowData = res;
        } else {
          this.rowData = [];
        }
      });
    } else {
      this.rowData = [];
      this.ShowMessageBoxWithOkBtn('اطلاعات به درستی بارگزاری نشده است');
    }
  }
  close(): void {
    this.Closed.emit(true);
  }
  onGridReady(e) {
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  popupclosed(event) {
    this.isClicked = false;
  }
}
