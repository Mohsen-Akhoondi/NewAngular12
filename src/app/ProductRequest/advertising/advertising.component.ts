import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { RegionListService } from 'src/app/Services/BaseService/RegionListService';
import { RadioBoxModel } from 'src/app/Shared/Radio-Box/Radio-Box-Model/RadioBoxModel';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrls: ['./advertising.component.css']
})
export class AdvertisingComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() OutPutParam: EventEmitter<any> = new EventEmitter<any>();
  IsCostRadioTypes: Array<RadioBoxModel> = [];
  @Input() InputParam;
  CheckValidate;
  // CheckValidateRating;
  RegionItems;
  TypeItems;
  VWExeUnitParams;
  IsEditable = true;
  IsCentralize;
  VWExeUnitItems;
  ColDef;
  rowsData;
  IsRegiondisable = false;
  CurrentDate;
  AdvertisingCode;
  AdvertisingNo;
  ProposalDuration;
  TextAbove;
  TextDown;
  DeliveryPlace;
  RegisterDate;
  ExpireDate;
  btnclicked = false;
  type: string;
  HaveHeader: boolean;
  HaveMaxBtn = false;
  ActualRegisterDate;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  startLeftPosition: number;
  startTopPosition: number;
  MinHeightPixel: number;
  HeightPercentWithMaxBtn: number;
  BoxDevHeight = 84;
  BtnClickedName: string;
  RegionParams = {
    bindLabelProp: 'RegionName',
    bindValueProp: 'RegionCode',
    placeholder: '',
    MinWidth: '125px',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: this.IsRegiondisable,
    Required: true
  };
  AdvertisingObject;
  MainMinwidthPixel: number;
  ParamObj;
  gridApi: any;
  IsforHall = false;
  ModuleCode;
  DealMethodItems;
  DealMethodParams = {
    bindLabelProp: 'DealMethodName',
    bindValueProp: 'DealMethodCode',
    placeholder: '',
    selectedObject: null,
    loading: false,
    IsVirtualScroll: false,
    IsDisabled: false,
    Required: true
  };
  IsCost = true;
  DealMethodCode;
  DealMethodName;
  RequiredComponents = [this.RegionParams, this.DealMethodParams];
  IsDateRequired = true;

  constructor(private RegionList: RegionListService,
    private ProductRequest: ProductRequestService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.ModuleCode = +params['ModuleCode'];
    });
    this.ColDef = [
      {
        headerName: 'ردیف',
        field: 'ItemNo',
        width: 60,
        resizable: true,
      },
      {
        headerName: 'موضوع',
        field: 'InquiryNote',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'مبلغ برآورد',
        field: 'EstimatedAmount',
        width: 120,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مبلغ سپرده',
        field: 'DepositAmount',
        width: 120,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مبلغ پیش پرداخت',
        field: 'PrepaymentAmount',
        width: 120,
        resizable: true,
        HaveThousand: true,
      },
      {
        headerName: 'مدت انجام',
        field: 'Period',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'نوع اعتبار',
        field: 'CreditType',
        width: 120,
        resizable: true,
      },
      {
        headerName: 'شرایط متقاضی',
        field: 'ActorCondition',
        width: 300,
        resizable: true,
      },
      {
        headerName: 'شماره درخواست معامله',
        field: 'ProductRequestNo',
        width: 150,
        resizable: true,
      }
    ];
  }

  ngOnInit() {
    this.IsCostRadioTypes = [];
    this.IsCostRadioTypes.push(new RadioBoxModel('هزینه ای', this.IsCost, false, 'rdoIsCost1_uwlpr'));
    this.IsCostRadioTypes.push(new RadioBoxModel('درآمدی', !this.IsCost, false, 'rdoIsCost2_uwlpr'));
    if ((this.InputParam.ModuleCode === 2730 && this.InputParam.ModuleViewTypeCode === 40) || this.InputParam.ShowOnly) {
      this.IsEditable = false;
    }

    if (this.InputParam.ModuleCode === 2730) {
      switch (this.InputParam.ModuleViewTypeCode) { // RFC 50325 & 49015
        case 27:
        case 29:
        case 30:
        case 38:
        case 39:
        case 64:
        case 132:
        case 134:
        case 80:
        case 117:
        case 145:
        case 138:  // RFC 57761
        case 139: // RFC 58052
          this.IsforHall = true;
          this.IsEditable = false;
          break;
        default:
          break;
      }
    }
    this.rowsData = [];
    this.ModuleCode = this.InputParam && this.InputParam.ModuleCode ? this.InputParam.ModuleCode : this.ModuleCode;
    forkJoin([
      this.RegionList.GetRegionList(this.ModuleCode, true),
      this.ProductRequest.GetAdvertising(this.InputParam.AdvertisingID),
      this.ProductRequest.GetCurrentDate()
    ]).subscribe((res: any) => {
      this.RegionItems = res[0];
      if (res[1]) {
        this.AdvertisingObject = res[1];
        this.rowsData = this.AdvertisingObject.AdvertisingInquiryList;
        this.RegionParams.selectedObject = this.AdvertisingObject.RegionCode;
        this.AdvertisingNo = this.AdvertisingObject.AdvertisingNo;
        this.AdvertisingCode = this.AdvertisingObject.AdvertisingCode;
        this.ProposalDuration = this.AdvertisingObject.ProposalDuration;
        this.TextAbove = this.AdvertisingObject.TextAbove;
        this.TextDown = this.AdvertisingObject.TextDown;
        this.DeliveryPlace = this.AdvertisingObject.DeliveryPlace;
        this.ExpireDate = this.AdvertisingObject.ShortExpireDate;
        this.ActualRegisterDate = this.AdvertisingObject.ShortActualRegisterDate; // RFC 47781
        this.RegisterDate = this.AdvertisingObject.ShortRegisterDate;
        this.DealMethodCode = this.AdvertisingObject.DealMethodCode;
        this.DealMethodName = this.AdvertisingObject.DealMethodName;
        if (this.AdvertisingObject.IsCost !== null) {
          this.IsCost = this.AdvertisingObject.IsCost;
        }
        if (this.RegionParams.selectedObject !== null) {
          const promise = new Promise((resolve, reject) => {
            this.SetDealMethodItems(resolve);
          }).then(() => {
            this.DealMethodParams.selectedObject = this.AdvertisingObject.DealMethodCode;
          });
        }
      } else {
        this.RegisterDate = res[2];
      }
    });

    this.TypeItems = [
      { TypeName: 'مزایده', TypeCode: 1 },
      { TypeName: 'مناقصه', TypeCode: 0 }
    ];
  }
  onSave() {
    this.CheckValidate = true;
    let ValidateForm = true;
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {
      ValidateForm =
        ValidateForm &&
        this.AdvertisingNo &&
        this.AdvertisingCode &&
        this.TextAbove &&
        this.TextDown &&
        this.DeliveryPlace &&
        (this.IsDateRequired ? this.RegisterDate : true) &&
        (this.IsDateRequired ? this.ExpireDate : true) &&
        this.DealMethodCode;

      if (ValidateForm) {
        const AdvertisingInquiryList = [];
        let ItemNo = 0;
        this.gridApi.forEachNode(node => {
          const AdvertisingInquiryObj = {
            AdvertisingInquiryID: node.data.AdvertisingInquiryID ? node.data.AdvertisingInquiryID : -1,
            AdvertisingID: this.AdvertisingObject ? this.AdvertisingObject.AdvertisingID : -1,
            InquiryID: node.data.InquiryID,
            ItemNo: ++ItemNo
          };
          AdvertisingInquiryList.push(AdvertisingInquiryObj);
        });

        const AdvertisingObj = {
          AdvertisingID: this.AdvertisingObject ? this.AdvertisingObject.AdvertisingID : -1,
          RegionCode: this.RegionParams.selectedObject,
          AdvertisingCode: this.AdvertisingCode,
          AdvertisingNo: this.AdvertisingNo,
          ProposalDuration: this.ProposalDuration,
          TextAbove: this.TextAbove,
          TextDown: this.TextDown,
          DeliveryPlace: this.DeliveryPlace,
          RegisterDate: this.RegisterDate,
          ExpireDate: this.ExpireDate,
          DealMethodCode: this.DealMethodCode,
        };

        this.ProductRequest.SaveAdvertising(AdvertisingObj, AdvertisingInquiryList, this.IsDateRequired
        ).subscribe((res: any) => {
          this.OutPutParam.emit(true);
          this.AdvertisingObject = res;
          this.rowsData = this.AdvertisingObject.AdvertisingInquiryList;
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        });
      } else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.type = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  Close() {
    this.Closed.emit(true);
  }
  popupclosed() {
    this.HaveMaxBtn = false;
    this.btnclicked = false;
  }
  GeneralBtnClick(event) {
    if (this.DealMethodCode !== null) {
      this.type = 'inuiry-search-list';
      this.HaveHeader = true;
      this.btnclicked = true;
      this.HaveMaxBtn = false;
      this.MainMinwidthPixel = 500;
      this.startLeftPosition = 307;
      this.startTopPosition = 10;
      this.ParamObj = {
        AdvertisingID: this.AdvertisingObject ? this.AdvertisingObject.AdvertisingID : -1,
        IsCost: this.IsCost,
        RegionCode: this.RegionParams.selectedObject,
        DealMethodCode: this.DealMethodCode,
        DealMethodName: this.DealMethodName
      };
    } else {
      this.ShowMessageBoxWithOkBtn('روش انجام معامله را انتخاب نمایید');
    }
  }
  getOutPutParam(event) {

    if (this.type === 'inuiry-search-list') {
      const itemsToUpdate = [];
      itemsToUpdate.push(event);
      this.gridApi.updateRowData({ add: itemsToUpdate });
    }
  }
  onGridReady(params: { api: any; }) {
    this.gridApi = params.api;
  }
  OnRegisterDateChange(ADate) {
    this.RegisterDate = ADate.MDate;
  }
  OnExpireDateChange(ADate) {
    this.ExpireDate = ADate.MDate;
  }
  getAdvertisingCode(AdvertisingCode) {
    if (AdvertisingCode) {
      this.AdvertisingCode = AdvertisingCode;
      this.AdvertisingCode = parseFloat(this.AdvertisingCode);
    } else {
      this.AdvertisingCode = '';
    }
  }
  // getRatingRequired(RatingRequired) {
  //   if (RatingRequired) {
  //     this.RatingRequired = RatingRequired;
  //     this.RatingRequired = parseFloat(this.RatingRequired);
  //   } else {
  //     this.RatingRequired = '';
  //   }
  // }
  getProposalDuration(ProposalDuration) {
    if (ProposalDuration) {
      this.ProposalDuration = ProposalDuration;
      this.ProposalDuration = parseFloat(this.ProposalDuration);
    } else {
      this.ProposalDuration = '';
    }
  }
  onChangeRegion(RegionCode) {
    this.ProductRequest.GetNewAdvertisingCode(RegionCode).subscribe(res => {
      this.AdvertisingCode = res;
    });
    this.SetDealMethodItems();
  }
  onTypeValueChanged(event) {
    // this.CheckValidateRating = event === 0 ? true : false;
  }
  onSaveWF() {
    this.CheckValidate = true;
    let ValidateForm = true;
    const promise = new Promise<void>((resolve, reject) => {
      this.RequiredComponents.forEach((element, index, array) => {
        if (element.Required && !element.selectedObject && element.selectedObject !== 0) {
          ValidateForm = false;
        }
        if (index === (array.length - 1)) {
          resolve();
        }
      });
    }).then(() => {
      ValidateForm =
        ValidateForm &&
        this.AdvertisingNo &&
        this.AdvertisingCode &&
        this.TextAbove &&
        this.TextDown &&
        this.DeliveryPlace &&
        this.RegisterDate &&
        this.ExpireDate &&
        this.DealMethodCode;

      if (ValidateForm) {
        const AdvertisingInquiryList = [];
        let ItemNo = 0;
        this.gridApi.forEachNode(node => {
          const AdvertisingInquiryObj = {
            AdvertisingInquiryID: node.data.AdvertisingInquiryID ? node.data.AdvertisingInquiryID : -1,
            AdvertisingID: this.AdvertisingObject ? this.AdvertisingObject.AdvertisingID : -1,
            InquiryID: node.data.InquiryID,
            ItemNo: ++ItemNo
          };
          AdvertisingInquiryList.push(AdvertisingInquiryObj);
        });

        const AdvertisingObj = {
          AdvertisingID: this.AdvertisingObject ? this.AdvertisingObject.AdvertisingID : -1,
          RegionCode: this.RegionParams.selectedObject,
          AdvertisingCode: this.AdvertisingCode,
          AdvertisingNo: this.AdvertisingNo,
          ProposalDuration: this.ProposalDuration,
          TextAbove: this.TextAbove,
          TextDown: this.TextDown,
          DeliveryPlace: this.DeliveryPlace,
          RegisterDate: this.RegisterDate,
          ExpireDate: this.ExpireDate,
          DealMethodCode: this.DealMethodCode
        };

        this.ProductRequest.UpdateAdvertisingDates(AdvertisingObj, AdvertisingInquiryList
        ).subscribe((res: any) => {
          this.OutPutParam.emit(true);
          this.AdvertisingObject = res;
          this.rowsData = this.AdvertisingObject.AdvertisingInquiryList;
          this.ShowMessageBoxWithOkBtn('ثبت با موفقیت انجام شد');
        });
      } else {
        this.ShowMessageBoxWithOkBtn('خواهشمند است ابتدا فیلد های مشخص شده را تکمیل فرمایید');
      }
    });
  }
  onChangeDealMethod(event) {
    this.DealMethodCode = event;
    this.ProductRequest.GetDealMwthodByID(event).subscribe(res => {
      this.DealMethodName = res.DealMethodName;
    });
  }
  rdoIsCostClick(event) {
    this.DealMethodItems = [];
    this.IsCost = event;
    if (this.RegionParams.selectedObject !== null) {
      this.SetDealMethodItems();
    }
  }
  SetDealMethodItems(resolve = null) {
    this.DealMethodParams.selectedObject = null;
    this.DealMethodItems = [];
    this.ProductRequest.GetDealMethodListByReionGroupCode(
      this.IsCost,
      null,
      this.RegionParams.selectedObject,
      this.ModuleCode,
      this.DealMethodCode,
      null,
      null).subscribe(res => {
        if (res) {
          if (resolve !== null) {
            resolve();
          }
          this.DealMethodItems = res;
        }
      });
  }

  OnRowDataUpdated() {
    const Templist = [];
    if (this.gridApi) {
      this.gridApi.forEachNode(node => {
        Templist.push(node.data);
        if (this.RegionParams.selectedObject === 222
          && node.data.ConsultantSelectTypeCode && node.data.ConsultantSelectTypeCode === 2) { // فراخوان
          this.IsDateRequired = false;
          return;
        }
        this.IsDateRequired = true;
      });
      if (Templist.length <= 0) {
        this.IsDateRequired = true;
      }
    } else {
      this.IsDateRequired = true;
    }
    return;
  }
}
