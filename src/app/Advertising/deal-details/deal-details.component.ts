import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/Services/BaseService/Auth.Service';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.css']
})
export class DealDetailsComponent implements OnInit {
  @Output() DealDetailsClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParams;
  PersianProductRequestDate;
  ProductRequestNo;
  Subject;
  Note;
  RegionName;
  DeliveryPlace;
  DocumentDeadline;
  ActorCondition;
  AdvertisingDetails;
  DealsDetailParam;
  btnclicked;
  OverStartTopPosition;
  OverPixelWidth;
  overStartLeftPosition;
  OverPixelHeight;
  PopupType;
  HasUploadDoc = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };

  constructor(private AuthServices: AuthService,
    private DealsHall: DealsHallService,
    private CommonService: CommonServices,
    private ProductRequestService: ProductRequestService) { }

  ngOnInit() {
    this.RefreshData();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges(changes): void {
    if (changes && changes.InputParams && changes.InputParams.currentValue) {
      this.InputParams = changes.InputParams.currentValue;
      this.RefreshData();
    }
  }
  close() {
    this.DealDetailsClosed.emit(true);
  }
  RefreshData() {
    if (this.InputParams) {
      this.Subject = this.InputParams.Subject;
      this.Note = this.InputParams.Note;
      this.RegionName = this.InputParams.RegionName;
      this.DeliveryPlace = this.InputParams.DeliveryPlace;
      this.DocumentDeadline = this.InputParams.PersianDocumentDeadlineDate;
      this.ActorCondition = this.InputParams.ActorCondition;
      this.AdvertisingDetails = this.InputParams.AdvertisingDetails;
      this.HasUploadDoc = this.InputParams.HasUploadDoc;
    }
  }
  OnUploadArchive(event) {
    this.AuthServices.CheckAuth().subscribe(res => {
      if (!res) {
        this.DealsDetailParam = this.InputParams;
        this.DealsDetailParam.HeaderName = 'فرم ورود به سامانه';
        this.overStartLeftPosition = 420;
        this.OverStartTopPosition = 130;
        this.OverPixelWidth = 500;
        this.OverPixelHeight = null;
        this.PopupType = 'advertising-login';
        this.btnclicked = true;
      } else {
        this.DealsDetailParam = this.InputParams;
        this.DealsDetailParam.HeaderName = 'بارگذاری اسناد';
        this.OverPixelWidth = 800;
        this.OverPixelHeight = 530;
        this.overStartLeftPosition = 260;
        this.OverStartTopPosition = 30;
        this.PopupType = 'deal-upload-docs';
        this.btnclicked = true;
      }
    });
  }
  popupclosed(param) {
    if (this.PopupType === 'advertising-login' && param === 'IsLogin') {
      this.OverPixelWidth = 800;
      this.OverPixelHeight = 530;
      this.overStartLeftPosition = 260;
      this.OverStartTopPosition = 30;
      this.PopupType = 'deal-upload-docs';
    } else if (this.PopupType === 'advertising-accept-rules' && param === 'IsAccept') {
      this.btnclicked = false;
      this.PopupType = null;
      this.DealsHall.DownloadAdvertisingFiles(this.InputParams.CostFactorID).subscribe(res => {
        this.CommonService.downloadFile(res);
      });
    } else {
      this.btnclicked = false;
    }
  }
  OnArchiveDownload(row) {
    if (this.InputParams.RegionCode !== 200) {
      this.DealsDetailParam = this.InputParams;
      this.DealsDetailParam.HeaderName = 'پذیرش قوانین';
      this.DealsDetailParam.ENType = this.InputParams.ENType;
      this.overStartLeftPosition = 420;
      this.OverStartTopPosition = 130;
      this.OverPixelWidth = 500;
      this.OverPixelHeight = null;
      this.PopupType = 'advertising-accept-rules';
      this.btnclicked = true;
    } else {
      this.AuthServices.CheckAuth().subscribe(res => {
        if (res) {
          if (this.InputParams.DealMethodCode === 2) {
            this.ProductRequestService.IsValidProposalByInquiryID(this.InputParams.InquiryID).subscribe(res => {
              if (res && res !== undefined && res === true) {
                this.DealsDetailParam = this.InputParams;
                this.DealsDetailParam.HeaderName = 'پذیرش قوانین';
                this.DealsDetailParam.ENType = this.InputParams.ENType;
                this.overStartLeftPosition = 420;
                this.OverStartTopPosition = 130;
                this.OverPixelWidth = 500;
                this.OverPixelHeight = null;
                this.PopupType = 'advertising-accept-rules';
                this.btnclicked = true;
              } else {
                this.ShowMessageBoxWithOkBtn('شما مجاز به انجام این کار نیستید');
              }
            });
          } else {
            this.DealsDetailParam = this.InputParams;
            this.DealsDetailParam.HeaderName = 'پذیرش قوانین';
            this.DealsDetailParam.ENType = this.InputParams.ENType;
            this.overStartLeftPosition = 420;
            this.OverStartTopPosition = 130;
            this.OverPixelWidth = 500;
            this.OverPixelHeight = null;
            this.PopupType = 'advertising-accept-rules';
            this.btnclicked = true;
          }
        } else {
          this.ShowMessageBoxWithOkBtn('جهت دانلود فایل ابتدا وارد سایت شوید');
        }
      });
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.overStartLeftPosition = 530;
    this.OverStartTopPosition = 200;
    this.OverPixelWidth = null;
    this.OverPixelHeight = null;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}
