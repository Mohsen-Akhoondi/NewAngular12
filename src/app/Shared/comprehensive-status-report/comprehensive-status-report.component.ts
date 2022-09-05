import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute } from '@angular/router';
import { ContractListService } from 'src/app/Services/BaseService/ContractListService';
import { ActorService } from 'src/app/Services/BaseService/ActorService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';

@Component({
  selector: 'app-comprehensive-status-report',
  templateUrl: './comprehensive-status-report.component.html',
  styleUrls: ['./comprehensive-status-report.component.css']
})
export class ComprehensiveStatusReportComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private ContractService: ContractListService,
    private ProductRequest: ProductRequestService,
    private RegionList: RegionListService,
    private route: ActivatedRoute,
    private Actor: ActorService,
    private Report: ReportService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  ModuleCode;
  CostCenterParams = {
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
  CostCenterItems;
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
  RegionItems;
  SubCostCenterParams = {
    bindLabelProp: 'SubCostCenterName',
    bindValueProp: 'SubCostCenterId',
    placeholder: '',
    MinWidth: '155px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  SubCostCenterItems;
  NgSelectContractParamsFrom = {
    Items: [],
    bindLabelProp: 'Subject',
    bindValueProp: 'LetterNo',
    MinWidth: '150px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    Required: true,
    type: 'User-Work-Log',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شماره قرارداد', HeaderName: 'LetterNo', width: 35, MinTermLenght: 1, SearchOption: 'LetterNo' },
        { HeaderCaption: 'موضوع', HeaderName: 'Subject', width: 53, SearchOption: 'Subject', MinTermLenght: 3 }],
      SearchItemHeader:
        [{ HeaderCaption: 'شماره قرارداد', width: 35, },
        { HeaderCaption: 'موضوع', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }

  };
  NgSelectPersonReqParams = {
    bindLabelProp: 'ActorName',
    bindValueProp: 'ActorId',
    placeholder: '',
    MinWidth: '130px',
    PageSize: 30,
    PageCount: 0,
    TotalItemCount: 0,
    selectedObject: null,
    loading: false,
    IsVirtualScroll: true,
    IsDisabled: false,
    Required: true,
    type: 'user-person-Req-search',
    DropDownMinWidth: '300px',
    AdvanceSearch: {
      SearchLabel: 'جستجو:',
      SearchItemDetails:
        [{ HeaderCaption: 'شناسه', HeaderName: 'ActorId', width: 35, MinTermLenght: 1, SearchOption: 'ActorID' },
        { HeaderCaption: 'کد ملي', HeaderName: 'IdentityNo', width: 35, MinTermLenght: 10, SearchOption: 'IdentityNo' },
        // tslint:disable-next-line:max-line-length
        { HeaderCaption: 'نام و نام خانوادگي', HeaderName: 'ActorName', width: 53, MinTermLenght: 3, SearchOption: 'ActorName' }],
      SearchItemHeader:
        [{ HeaderCaption: 'شناسه', width: 35, },
        { HeaderCaption: 'کد ملي', width: 35, },
        { HeaderCaption: 'نام و نام خانوادگي', width: 53, }],
      HaveItemNo: true,
      ItemNoWidth: 16
    }
  };
  ContractListSetFrom;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];
  TypeContractor = true;
  FromContractTotalItemCount;
  FromContractPageCount;
  currentContractSearchTerm;
  ContractorItems;
  ContractorTotalItemCount;
  ContractorPageCount;
  FromDate;
  ToDate;
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

  ngOnInit() {
    this.ContractorTypeRadioParam = [];
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقیقی', true, false, 'rdoContractorType1_uwlpr'));
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقوقی', false, false, 'rdoContractorType2_uwlpr'));
  }
  report() {
    this.Report.ComprehensiveStatusReport(
      this.RegionParams.selectedObject,
      this.NgSelectContractParamsFrom.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.TypeContractor,
      this.NgSelectPersonReqParams.selectedObject,
      this.FromDate,
      this.ToDate,
      2922,
      this.ContractOperationID,
      'چاپ به ریز'
    );
  }
  PrintToAggregate() {
    this.Report.ComprehensiveStatusReport(
      this.RegionParams.selectedObject,
      this.NgSelectContractParamsFrom.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.TypeContractor,
      this.NgSelectPersonReqParams.selectedObject,
      this.FromDate,
      this.ToDate,
      2922,
      this.ContractOperationID,
      'چاپ به سر جمع'
    );
  }
  closeModal() {
    this.Closed.emit(true);
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'Region':
        {
          this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => { // 62686
            this.RegionItems = res;
          });
          this.NgSelectContractParamsFrom.selectedObject = null;
          this.CostCenterParams.selectedObject = null;
          this.SubCostCenterParams.selectedObject = null;
        }
        break;
      case 'Contract':
        {
          if (this.RegionParams.selectedObject) {
            this.NgSelectContractParamsFrom.loading = true;
            this.ContractService.GetContractPaging(1, 30, '', '',
              null, this.RegionParams.selectedObject).subscribe((res: any) => {
                this.ContractListSetFrom = res.List;
                this.FromContractTotalItemCount = res.TotalItemCount;
                this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
              });
            this.NgSelectContractParamsFrom.loading = false;
          }
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
      case 'SubCostCenter':
        {
          if (this.CostCenterParams.selectedObject) {
            this.ProductRequest.GetSubCostCenter(this.CostCenterParams.selectedObject, this.ModuleCode, true).subscribe(res => {
              this.SubCostCenterItems = res;
            });
          }
        }
        break;
      case 'Person':
        const ResultList = [];
        //  this.NgSelectContractorParams.loading = true;
        this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
          this.ContractorItems = res.List;
          this.ContractorTotalItemCount = res.TotalItemCount;
          this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        });
        // this.NgSelectContractorParams.loading = false;
        break;
    }
  }
  FetchMoreContract(event) {
    if (this.RegionParams.selectedObject) {
      this.NgSelectContractParamsFrom.loading = true;
      const ResultList = [];
      this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term, event.SearchOption,
        null, this.RegionParams.selectedObject).subscribe((res: any) => {
          event.CurrentItems.forEach(el => {
            ResultList.push(el);
          });
          res.List.forEach(element => {
            ResultList.push(element);
          });
          this.ContractListSetFrom = ResultList;
        });
      this.NgSelectContractParamsFrom.loading = false;
    }
  }
  doContractSearch(event) {
    if (this.RegionParams.selectedObject) {
      this.currentContractSearchTerm = event.term;
      this.NgSelectContractParamsFrom.loading = true;
      if (event.SearchOption === 'null' || event.SearchOption == null) {
        event.SearchOption = 'ContractCode';
      }
      this.ContractService.GetContractPaging(event.PageNumber, event.PageSize, event.term,
        event.SearchOption, null, this.RegionParams.selectedObject).subscribe((res: any) => {
          if (this.currentContractSearchTerm === event.term) {
            this.ContractListSetFrom = res.List;
            this.FromContractTotalItemCount = res.TotalItemCount;
            this.FromContractPageCount = Math.ceil(res.TotalItemCount / 30);
            this.NgSelectContractParamsFrom.loading = false;
          }
        });
    }
  }
  rdoContractorTypeClick(Type) {
    this.NgSelectPersonReqParams.selectedObject = null;
    this.TypeContractor = Type;
    if (this.TypeContractor) {
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
    } else {
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectPersonReqParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
    }
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectPersonReqParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        event.CurrentItems.forEach(el => {
          ResultList.push(el);
        });
        res.List.forEach(element => {
          ResultList.push(element);
        });
        this.ContractorItems = ResultList;
        this.NgSelectPersonReqParams.loading = false;
      }
      );
  }
  doContractorSearch(event) {
    this.NgSelectPersonReqParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectPersonReqParams.loading = false;
      });
  }
  OnFromDateChange(event) {
    this.FromDate = event.MDate;
  }
  OnToDateChange(event) {
    this.ToDate = event.MDate;
  }
  OnChangeContractOperation(event) {
    this.ContractOperationID = event;
  }
}
