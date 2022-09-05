import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { ActivatedRoute } from '@angular/router';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { ReportService } from 'src/app/Services/ReportService/ReportService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { ActorService } from 'src/app/Services/BaseService/ActorService';

@Component({
  selector: 'app-contract-pay-work-report',
  templateUrl: './contract-pay-work-report.component.html',
  styleUrls: ['./contract-pay-work-report.component.css']
})
export class ContractPayWorkReportComponent implements OnInit {

  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
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
  FromDate;
  ToDate;
  ModuleCode;
  ContractorTypeRadioParam: Array<RadioBoxModel> = [];
  NgSelectContractorParams = {
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
    type: 'product-request-contract-contractor',
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
  TypeContractor = false;
  ContractorPageCount;
  ContractorTotalItemCount;
  ContractorItems;
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

  constructor(
    private RegionList: RegionListService,
    private route: ActivatedRoute,
    private ProductRequest: ProductRequestService,
    private Report: ReportService,
    private Actor: ActorService
  ) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
  }
  ngOnInit() {
    this.ContractorTypeRadioParam = [];
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقیقی', true, false, 'rdoContractorType1_uwlpr'));
    this.ContractorTypeRadioParam.push(new RadioBoxModel('حقوقی', false, false, 'rdoContractorType2_uwlpr'));
  }
  report() {
    this.Report.ContractPayWorkReport(
      this.RegionParams.selectedObject,
      this.CostCenterParams.selectedObject,
      this.SubCostCenterParams.selectedObject,
      this.FromDate,
      this.ToDate,
      2926,
      this.NgSelectContractorParams.selectedObject,
      this.ContractOperationID
    )
  }
  OnOpenNgSelect(type) {
    switch (type) {
      case 'Region':
        {
          this.RegionList.GetRegionList(this.ModuleCode, false).subscribe(res => { // 62686
            this.RegionItems = res;
          });
          this.CostCenterParams.selectedObject = null;
          this.SubCostCenterParams.selectedObject = null;
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
    }
  }
  OnFromDateChange(event) {
    this.FromDate = event.MDate;
  }
  OnToDateChange(event) {
    this.ToDate = event.MDate;
  }
  closeModal() {
    this.Closed.emit(true);
  }
  rdoContractorTypeClick(Type) {
    this.TypeContractor = Type;
    this.NgSelectContractorParams.selectedObject = null;
    if (this.TypeContractor) {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام و نام خانوادگي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'کد ملي';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام و نام خانوادگي';
      // this.NgSelectContractorParams.bindLabelProp = 'PersonName';
    } else {
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[2].HeaderCaption = 'نام شخص';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[0].MinTermLenght = 1;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemDetails[1].MinTermLenght = 10;
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[0].HeaderCaption = 'شناسه';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[1].HeaderCaption = 'شناسه ملي ';
      this.NgSelectContractorParams.AdvanceSearch.SearchItemHeader[2].HeaderCaption = 'نام شخص';
      // this.NgSelectContractorParams.bindLabelProp = 'CorporateName';
    }
  }
  FetchMoreContractor(event) {
    const ResultList = [];
    this.NgSelectContractorParams.loading = true;
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
        this.NgSelectContractorParams.loading = false;
      }
      );
  }
  OpenContractor(event) {
    const ResultList = [];
    //  this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(1, 30, '', 'ActorID', this.TypeContractor, false, false).subscribe(res => {
      this.ContractorItems = res.List;
      this.ContractorTotalItemCount = res.TotalItemCount;
      this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
    });
    // this.NgSelectContractorParams.loading = false;
  }
  doContractorSearch(event) {
    this.NgSelectContractorParams.loading = true;
    this.Actor.GetActorPaging(event.PageNumber,
      event.PageSize,
      event.term,
      event.SearchOption,
      this.TypeContractor,
      false, false).subscribe(res => {
        this.ContractorItems = res.List;
        this.ContractorTotalItemCount = res.TotalItemCount;
        this.ContractorPageCount = Math.ceil(res.TotalItemCount / 30);
        this.NgSelectContractorParams.loading = false;
      });
  }
  ContractorChanged(event) {
    if (!event) {
      this.NgSelectContractorParams.selectedObject = null;
    } else {
      this.NgSelectContractorParams.selectedObject = event;
    }
  }
  OnChangeContractOperation(event) {
    this.ContractOperationID = event;
  }
}
