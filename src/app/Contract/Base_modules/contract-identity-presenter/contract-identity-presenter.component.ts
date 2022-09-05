import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-identity-presenter',
  templateUrl: './contract-identity-presenter.component.html',
  styleUrls: ['./contract-identity-presenter.component.css']
})
export class ContractIdentityPresenterComponent implements OnInit {

  @Input() ModuleCode;
  @Input() ModuleName;
  columnDef;
  rowData: any;
  selectedRow: any;
  btnclicked = false;
  type: string;
  paramObj;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  HeightPercentWithMaxBtn: number;
  alertMessageParams = { HaveOkBtn: true, message: '' };
  startLeftPosition: number;
  startTopPosition: number;

  constructor(private RefreshCartable: RefreshServices,
              private ContractList: ContractListService,
              private router: Router
              ) {
    this.columnDef = [
      {
        headerName: 'ردیف ',
        field: 'ItemNo',
        width: 80,
        resizable: true
      },
      {
            headerName: 'کد واحد اجرایی ',
            field: 'RegionCode',
            width: 100,
            resizable: true
      },
      {
            headerName: 'نام واحد اجرایی',
            field: 'RegionName',
            width: 100,
            resizable: true
      },
      {
        headerName: 'سال مالی ',
        field: 'FinYearCode',
        width: 90,
        resizable: true,
        sortable: true,
      },
      {
        headerName: ' کد قرارداد',
        field: 'ContractCode',
        width: 100,
        resizable: true,
        sortable: true,
      },
      {
        headerName: 'شماره نامه',
        field: 'LetterNo',
        width: 120,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorName',
        width: 120,
        resizable: true
      },
      {
        headerName: 'مبلغ',
        field: 'ContractAmount',
        HaveThousand: true,
        width: 150,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        width: 500,
        resizable: true
      }
    ];
   }

   ngOnInit() {
    this.getContractListData();
    this.RefreshCartable.CantractListChange.subscribe(IsChange => {
      this.getContractListData();
    });
  }

  getContractListData(): void {
    this.rowData = of([]);
    this.rowData = this.ContractList.GetContractList(-1, this.ModuleCode);
  }
  onShowClick() {
    if (this.selectedRow == null) {
      this.showMessageBox('قراردادی جهت مشاهده انتخاب نشده است');
  } else {
      this.type = 'contract-case';
      this.btnclicked = true;
      this.HaveHeader = true;
      this.HaveMaxBtn = true;
      this.startLeftPosition = 59;
      this.startTopPosition = 20;
      this.HeightPercentWithMaxBtn = 98;
      this.paramObj = { HeaderName: this.ModuleName ,
                        ModuleCode: this.ModuleCode,
                        selectedRow: this.selectedRow,
                        GridHeightInTab: 90,
                        PanelHeightInTab: 76,
                        ModuleViewTypeCode : 5555};
    }
  }

  RowClick(InputValue) {
    this.selectedRow = InputValue;
  }
  close(): void {
    this.btnclicked = false;
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }
  popupclosed() {
    this.btnclicked = false;
  }
  showMessageBox(message) {
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.alertMessageParams.message = message ;
    this.btnclicked = true;
    this.startLeftPosition = 500;
    this.startTopPosition = 200;
  }
}
