import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
@Component({
  selector: 'app-remove-contract-from-clarification',
  templateUrl: './remove-contract-from-clarification.component.html',
  styleUrls: ['./remove-contract-from-clarification.component.css']
})
export class RemoveContractFromClarificationComponent implements OnInit {
  RegionName = '';
  PersonIdentityNo = '';
  CorporateidentityNo = '';
  ContractorName = '';
  Subject = '';
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  isClicked: boolean;
  PopUpType: string;
  HaveHeader: boolean;
  HaveMaxBtn: boolean;
  startLeftPosition: number;
  startTopPosition: number;
  columnDef;
  rowData = [];
  SelectedRow: any;
  RegionItems = [];
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
  };
  ModuleCode;
  ContractDateFrom = '';
  ContractDateTo = '';
  CurrentPriceFrom: number;
  CurrentPriceTo: number;
  CashPriceFrom: number;
  CashPriceTo: number;
  FromCashPriceFrom: any;
  ToCashPrice: any;
  FromCurrentPrice: any;
  ToCurrentPrice: any;
  ProductRequestNo = '';
  constructor(private router: Router,
    private ProductRequest: ProductRequestService,
    private RegionList: RegionListService,
    private route: ActivatedRoute,
    private Contract: ContractListService) {
      this.route.params.subscribe(params => {
        this.ModuleCode = +params['ModuleCode'];
      });
    this.columnDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 70,
        resizable: true
      },
      {
        headerName: 'واحد اجرایی',
        field: 'RegionName',
        editable: false,
        width: 120,
        resizable: true
      },
      {
        headerName: 'شماره درخواست',
        field: 'ProductRequestNo',
        editable: false,
        width: 130,
        resizable: true
      },
      {
        headerName: 'تاریخ',
        field: 'ContractDate',
        editable: false,
        width: 120,
        resizable: true
      },
      {
        headerName: 'پیمانکار',
        field: 'ContractorName',
        editable: false,
        width: 200,
        resizable: true
      },
      {
        headerName: 'موضوع',
        field: 'Subject',
        editable: false,
        width: 300,
        resizable: true
      },
    ];
  }

  ngOnInit() {
    this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(
      res => {
        this.RegionItems = res;
      }
    );
  }
  onSearch() {
    // tslint:disable-next-line: max-line-length
    this.RegionName = this.RegionParams.selectedObject ? this.RegionItems.find(x => x.RegionCode === this.RegionParams.selectedObject).RegionName : '';
    this.ProductRequest.FindContractFromClarfication(this.RegionName, this.PersonIdentityNo,
      this.CorporateidentityNo,
      this.ContractorName,
      this.Subject,
      this.ContractDateFrom,
      this.ContractDateTo ,
      this.ProductRequestNo,
      this.CurrentPriceFrom,
      this.CurrentPriceTo,
      this.CashPriceFrom,
      this.CashPriceTo).subscribe(res => {
        this.rowData = res;
      });
  }
  onDelete() {

    if (!this.SelectedRow) {
      this.ShowMessageBoxWithOkBtn('قراردادی جهت حذف انتخاب نشده است');
      return;
    }

    this.ProductRequest.RemoveContractFromClarfication(this.SelectedRow.Guid).subscribe(res => {
      if (res) {
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
      }
    });
  }

  onClose() {
    this.router.navigate([{ outlets: { primary: 'Home', PopUp: null } }]);
  }

  popupclosed(event) {
    this.isClicked = false;
    this.PopUpType = '';
  }

  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }

  getCorporateidentityNo(CorporateidentityNo) {
    this.CorporateidentityNo = CorporateidentityNo;
  }

  getPersonIdentityNo(PersonIdentityNo) {
    this.PersonIdentityNo = PersonIdentityNo;
  }

  RowClick(event) {
    this.SelectedRow = event.data;
  }

  OnFromContractDateChange(ADate) {
    this.ContractDateFrom = ADate.SDate;
  }
  OnToContractDateChange(ADate) {
    this.ContractDateTo  = ADate.SDate;
  }
  getCurrentPriceFrom(CurrentPriceFrom) {
    this.FromCurrentPrice = CurrentPriceFrom;
    this.CurrentPriceFrom = parseFloat((CurrentPriceFrom).replace(/,/g, ''));
  }
  getCurrentPriceTo(CurrentPriceTo) {
    this.ToCurrentPrice = CurrentPriceTo;
    this.CurrentPriceTo = parseFloat((CurrentPriceTo).replace(/,/g, ''));
  }
  getCashPriceFrom(CashPriceFrom) {
    this.FromCashPriceFrom = CashPriceFrom;
    this.CashPriceFrom = parseFloat((CashPriceFrom).replace(/,/g, ''));
  }
  getCashPriceTo(CashPriceTo) {
    this.ToCashPrice = CashPriceTo;
    this.CashPriceTo = parseFloat((CashPriceTo).replace(/,/g, ''));
  }
  sendSh() {
    this.Contract.RemoveNotContractIsPostedToClean().subscribe(res => {
    });
  }
}
