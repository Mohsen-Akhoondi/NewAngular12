import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
declare var Dastine: any;

@Component({
  selector: 'app-reopening-tender-envekopes',
  templateUrl: './reopening-tender-envekopes.component.html',
  styleUrls: ['./reopening-tender-envekopes.component.css']
})
export class ReopeningTenderEnvekopesComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  btnclicked;
  PopupParam;
  OverStartTopPosition;
  OverPixelWidth;
  overStartLeftPosition;
  OverPixelHeight;
  PopupType;
  DecryptedFilesResult = [];
  HaveA;
  HaveB;
  HaveC;
  AIsLock;
  BIsLock;
  CIsLock;
  ContentHeightPX = 350;
  DastineisNotInstalled = false;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };

  constructor(private DealsHall: DealsHallService,
    private CommonService: CommonServices,
    private ProductRequest: ProductRequestService) { }

  ngOnInit() {
    this.RefreshEnvekope();
    if (!Dastine.isInstalled) {
      this.DastineisNotInstalled = true;
      this.ContentHeightPX = 380;
    }
  }
  RefreshEnvekope() {
    this.ProductRequest.CheckTenderEnvekopesIsLock(this.InputParam.ProposalID).subscribe(res => {
      res.forEach(element => {
        if (element.ParentDocumentTypeCode === 170) {
          this.HaveA = true;
          this.AIsLock = element.IsLock;
        } else if (element.ParentDocumentTypeCode === 171) {
          this.HaveB = true;
          this.BIsLock = element.IsLock;
        } else if (element.ParentDocumentTypeCode === 172) {
          this.HaveC = true;
          this.CIsLock = element.IsLock;
        }
      });
    });
  }
  close() {
    this.Closed.emit(true);
  }
  GetTenderCipherFiles(DocType) {
    this.ProductRequest.GetTenderFileNames(this.InputParam.ProposalID, this.InputParam.OrderCommitionID, DocType).subscribe(res => {
      this.PopupType = 'tender-encrypted-files-list';
      this.btnclicked = true;
      this.overStartLeftPosition = 307;
      this.OverStartTopPosition = 10;
      this.PopupParam = {
        HeaderName: 'ّبازگشایی پاکت ' + (DocType === 170 ? 'الف' : DocType === 171 ? 'ب' : 'ج'),
        TenderFileNames: res,
        EnvekopesName: DocType === 170 ? 'الف' : DocType === 171 ? 'ب' : 'ج'
      };
    });
  }

  onbtnlenvelopeClick(DocType, IsLock) {
    if (IsLock) {
      if (Dastine.isInstalled) {
        if (DocType === 171 && this.AIsLock) {
          this.ShowMessageBoxWithOkBtn('بازگشایی پاکت ب پیش از پاکت الف امکان پذیر نمی باشد');
          return;

        } else if (DocType === 172 && (this.AIsLock || this.BIsLock)) {
          this.ShowMessageBoxWithOkBtn('بازگشایی پاکت ج پیش از پاکت الف و ب امکان پذیر نمی باشد');
          return;
        }
        this.GetTenderCipherFiles(DocType);
      } else {
        // tslint:disable-next-line:max-line-length
        this.ShowMessageBoxWithOkBtn('افزونه دستینه نصب نشده است در صورتی که قبلا این نرم افزار را نصب کرده اید صفحه را Refresh کنید');
      }
    } else {
      this.ShowArchiveFiles(DocType);
    }
  }
  ShowArchiveFiles(DocTypeCode) {
    this.ProductRequest.GetDocTypeMadatory(
      this.InputParam.ProductRequestObject.DealMethodCode ? this.InputParam.ProductRequestObject.DealMethodCode : -1,
      this.InputParam.ProductRequestObject.DealTypeCode,
      this.InputParam.ProductRequestObject.ContractTypeCode ? this.InputParam.ProductRequestObject.ContractTypeCode : -1,
      this.InputParam.ProductRequestObject.RegionCode,
      -1,
      this.InputParam.ProductRequestObject.Article31ID,
      null,
      null,
      false,
      DocTypeCode).subscribe(res => {
        const DocTypeList = [];
        res.forEach(element => {
          DocTypeList.push(element.DocumentTypeCode);
        });
        this.PopupType = 'archive-details';
        this.btnclicked = true;
        this.overStartLeftPosition = 307;
        this.OverStartTopPosition = 10;
        this.PopupParam = {
          EntityID: this.InputParam.ProposalID,
          TypeCodeStr: DocTypeCode + '-',
          DocTypeCode: DocTypeCode,
          ModuleCode: 2730,
          MandatoryDocTypeList: res,
          DocumentTypeCodeList: DocTypeList,
          IsReadOnly: true
        };
      });
  }
  popupclosed() {
    if (this.PopupType === 'tender-encrypted-files-list') {
      this.RefreshEnvekope();
    }
    this.PopupType = null;
    this.btnclicked = false;
  }
  ShowMessageBoxWithOkBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.overStartLeftPosition = 500;
    this.OverStartTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.btnclicked = true;
    this.PopupType = 'message-box';
    this.overStartLeftPosition = 500;
    this.OverStartTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
  }
  onDownloadDastineApp() {
    this.DealsHall.DownloadHelpArchiveFile(747).subscribe(res => {
      this.CommonService.downloadFile(res);
    });
  }
}
