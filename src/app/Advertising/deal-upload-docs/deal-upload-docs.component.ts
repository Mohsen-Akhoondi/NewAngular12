import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';

@Component({
  selector: 'app-deal-upload-docs',
  templateUrl: './deal-upload-docs.component.html',
  styleUrls: ['./deal-upload-docs.component.css']
})
export class DealUploadDocsComponent implements OnInit {

  @Output() DealDetailsClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParams;

  ProductRequestObject;
  Subject;
  Note;
  RegionName;
  RegionCode;
  DeliveryPlace;
  DocumentDeadline;
  ActorCondition;
  AdvertisingDetails;
  btnclicked;
  OverStartTopPosition;
  ArchiveParams;
  OverPixelWidth;
  overStartLeftPosition;
  OverPixelHeight;
  PopupType;
  ProposalID;
  IsLock;
  HaveAenvelope = false;
  HaveBenvelope = false;
  HaveCenvelope = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  IsActive = false;
  FinalConfirmBtnName = 'تایید نهایی و ارسال برای شهرداری';
  constructor(private DealsHall: DealsHallService,
    private CommonService: CommonServices,
    private ProductRequest: ProductRequestService) { }

  ngOnInit() {
    this.ProductRequest.GetProductRequestOnlyForAdvertising(this.InputParams.CostFactorID).subscribe(res => {
      this.ProductRequestObject = res;
      if (res.AdvertisingMandatoryParents) {
        this.HaveAenvelope = res.AdvertisingMandatoryParents.includes(170);
        this.HaveBenvelope = res.AdvertisingMandatoryParents.includes(171);
        this.HaveCenvelope = res.AdvertisingMandatoryParents.includes(172);
      } else {
        this.HaveAenvelope = this.HaveBenvelope = this.HaveCenvelope = false;
      }
    });
    this.RefreshData();
    this.RefreshProposal();
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
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.overStartLeftPosition = 530;
    this.OverStartTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  RefreshData() {
    if (this.InputParams) {
      this.Subject = this.InputParams.Subject;
      this.Note = this.InputParams.Note;
      this.RegionName = this.InputParams.RegionName;
      this.RegionCode = this.InputParams.RegionCode;
      this.DeliveryPlace = this.InputParams.DeliveryPlace;
      this.DocumentDeadline = this.InputParams.PersianDocumentDeadlineDate;
      this.ActorCondition = this.InputParams.ActorCondition;
      this.AdvertisingDetails = this.InputParams.AdvertisingDetails;
    }
  }
  RefreshProposal() {
    this.DealsHall.GetProposalAdvertising(this.InputParams.InquiryID).subscribe(res => {
      if (res) {
        this.ProposalID = res.ProposalID;
        this.IsLock = res.IsLock;
        this.IsActive = res.IsActive; // RFC 64234
        if (this.IsLock) {
          this.FinalConfirmBtnName = 'عدم تایید';
        } else {
          this.FinalConfirmBtnName = 'تایید نهایی و ارسال برای شهرداری';
        }
      }
    });
  }
  onbtnDocumentUpload(ParentDocType) {
    if (!this.IsLock) {
      const ParentDocList = [];
      ParentDocList.push(ParentDocType);
      this.ProductRequest.GetDocTypeMadatory(
        this.ProductRequestObject.DealMethodCode ? this.ProductRequestObject.DealMethodCode : -1,
        this.ProductRequestObject.DealTypeCode,
        this.ProductRequestObject.ContractTypeCode ? this.ProductRequestObject.ContractTypeCode : -1,
        this.ProductRequestObject.RegionCode,
        null,
        this.ProductRequestObject.Article31ID,
        null,
        null,
        null,
        ParentDocList).subscribe(res => {
          const DocTypeList = [];
          res.forEach(element => {
            DocTypeList.push(element.DocumentTypeCode);
          });
          this.PopupType = 'advertising-archive-details';
          this.btnclicked = true;
          this.overStartLeftPosition = 307;
          this.OverStartTopPosition = 10;
          const archiveParam = {
            EntityID: this.InputParams.InquiryID,
            TypeCodeStr: ParentDocType + '-',
            DocTypeCode: ParentDocType,
            ModuleCode: 2730,
            MandatoryDocTypeList: res,
            HasCheck: true,
            DocumentTypeCodeList: DocTypeList,
            PRRegionCode: this.ProductRequestObject.RegionCode
          };
          this.ArchiveParams = archiveParam;
        });
    }
  }
  popupclosed() {
    if (this.PopupType === 'advertising-archive-details') {
      this.RefreshProposal();
    }
    this.PopupType = null;
    this.btnclicked = false;
  }
  FinalConfirmClick() {
    if (this.ProposalID && this.IsActive) { // RFC 64234
      if (!this.IsLock) {
        this.DealsHall.ProposalFinalConfirmDocs(this.ProposalID, this.InputParams.CostFactorID).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('تایید نهایی مستندات با موفقیت انجام شد');
            this.RefreshProposal();
          }
        });
      } else {
        this.DealsHall.CancelReceiveElectronicDocs(this.ProposalID, false).subscribe(res => {
          if (res) {
            this.ShowMessageBoxWithOkBtn('عدم تایید با موفقیت انجام شد');
            this.RefreshProposal();
          }
        });
      }
    }
  }
  onDownloadSignApp() {
    this.DealsHall.DownloadHelpArchiveFile(761).subscribe(res => {
      this.CommonService.downloadFile(res);
    });

  }
}
