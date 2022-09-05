import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { UserSettingsService } from 'src/app/Services/BaseService/UserSettingsService';
import { DealsHallService } from 'src/app/Services/ContractService/DealsHall/DealsHallService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { isUndefined } from 'util';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
declare var Dastine: any;
@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PDFViewerComponent implements OnInit {
  @Input() PDFParam;
  @Output() Closed: EventEmitter<any> = new EventEmitter<any>();
  isClicked: boolean;
  PopUpType: string;
  startLeftPosition;
  startTopPosition;
  selectedFile;
  HaveHeader;
  DocTypeCode;
  DastineisNotInstalled;
  IsSaved: boolean;
  ContractorType: boolean;
  PopupParam;
  HaveMaxBtn = false;
  AssignedSignature = false;
  MinHeightPixel;
  HeightPercentWithMaxBtn;
  PercentWidth: number;
  MainMaxwidthPixel: any;
  BtnClickedName = '';
  SignerActorID: any;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HasDelBtn = false;
  constructor(private DealsHall: DealsHallService,
    private CommonService: CommonServices,
    private ProductRequest: ProductRequestService,
    private HomeServices: UserSettingsService,
    private ArchiveDetail: ArchiveDetailService,
    private ComonService: CommonService) { }
  IsDown = false;
  IsFinal = false;
  IsAutoGenerate = false;

  ngOnInit() {
    this.DastineisNotInstalled = !Dastine.isInstalled;
    this.IsDown = this.PDFParam.HaveUpload;
    this.IsFinal = this.PDFParam.IsFinal;
    this.HasDelBtn = this.PDFParam.HasDelBtn;
    if (this.PDFParam.ChequeNo) {
      this.DocTypeCode = 682;
    } else if (this.IsFinal) {
      this.DocTypeCode = 661;
    } else if (!isUndefined(this.PDFParam.IsArticle18) && this.PDFParam.IsArticle18 !== null && this.PDFParam.IsArticle18) {
      this.DocTypeCode = 1047;
    } else if (!isUndefined(this.PDFParam.IsTrafficRep) && this.PDFParam.IsTrafficRep !== null && this.PDFParam.IsTrafficRep) {
      this.DocTypeCode = 1107;
    } else if (!isUndefined(this.PDFParam.IsAdequacy) && this.PDFParam.IsAdequacy !== null && this.PDFParam.IsAdequacy) {
      this.DocTypeCode = 1167;
    } else if (!isUndefined(this.PDFParam.IsDisArticle18) && this.PDFParam.IsDisArticle18 !== null && this.PDFParam.IsDisArticle18) {
      this.DocTypeCode = 1228;
    } else {
      this.DocTypeCode = 601;
    }
    if (this.DocTypeCode && !isUndefined(this.DocTypeCode)) {
      this.ComonService.IsAutoGenerate(this.DocTypeCode).subscribe(res => {
        this.IsAutoGenerate = res;
      });
    }

  }
  ShowMessageBoxWithOkBtn(message, LeftPosition = 530) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = LeftPosition;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }
  popupclosed(inputParam) {
    if (this.PopUpType === 'message-box') {
      if (inputParam === 'YES') {
        if (this.DocTypeCode === 682) {
          this.SignCheque();
          this.isClicked = false;
          this.PopUpType = null;
          return;
        } else if (this.BtnClickedName === 'Signer') {
          this.PopUpType = 'users-organization-sign';
          this.isClicked = true;
          this.startLeftPosition = 208;
          this.startTopPosition = 5;
          this.HaveMaxBtn = true;
          this.HeightPercentWithMaxBtn = 90;
          this.PercentWidth = 75;
          this.MainMaxwidthPixel = 1200;
          this.MinHeightPixel = 600;
          this.PopupParam = {
            RegionCode: this.PDFParam.RegionCode,
            ActorID: this.SignerActorID,
            ContractorType: this.ContractorType
          };
          this.BtnClickedName = '';
          return;

        } else {
          this.SignDocument();
          this.isClicked = false;
          this.PopUpType = null;
          return;
        }
      } else if (inputParam === 'OK' && this.BtnClickedName === 'DelDoc') {
        this.PopUpType = '';
        this.BtnClickedName = '';
        this.isClicked = false;
        this.Closed.emit(true);
        return;
      }
    }
    this.BtnClickedName = '';
    this.isClicked = false;
    this.HaveMaxBtn = false;
    this.PopUpType = '';
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }
  ShowMessageBoxWithYesNoBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.startLeftPosition = 335;
    this.startTopPosition = 180;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = false;
    this.alertMessageParams.HaveYesBtn = true;
    this.alertMessageParams.HaveNoBtn = true;
    this.HeightPercentWithMaxBtn = null;
    this.PercentWidth = null;
    this.MainMaxwidthPixel = null;
    this.MinHeightPixel = null;
  }
  onDigitalSingClick() {
    if (!Dastine.isInstalled) {
      // tslint:disable-next-line:max-line-length
      this.ShowMessageBoxWithOkBtn('افزونه دستینه نصب نشده است در صورتی که قبلا این نرم افزار را نصب کرده اید صفحه را Refresh کنید');
    } else
      if (this.PDFParam.SignByFile) {
        this.ShowMessageBoxWithYesNoBtn('اینجانب فایل ' + this.selectedFile.name +
          '  را مشاهده کردم و صحت اطلاعات این فایل را جهت امضای الکترونیک تایید می نمایم. آیامورد قبول است ؟');
      } else {
        if (this.PopUpType === 'message-box' && this.DocTypeCode === 682) {
          // tslint:disable-next-line:max-line-length
          this.ShowMessageBoxWithYesNoBtn('اینجانب فایل چک را مشاهده کردم و صحت اطلاعات این فایل را جهت امضای الکترونیک تایید می نمایم. آیامورد قبول است ؟');
        } else if (this.DocTypeCode === 1047) {
          // tslint:disable-next-line: max-line-length
          this.ShowMessageBoxWithYesNoBtn('اینجانب فایل ابلاغ ماده 18 را مشاهده کردم و صحت اطلاعات این فایل را جهت امضای الکترونیک تایید می نمایم. آیامورد قبول است ؟');
        } else if (this.DocTypeCode === 1167) {
          // tslint:disable-next-line: max-line-length
          this.ShowMessageBoxWithYesNoBtn('اینجانب فایل نامه کفایت اسناد را مشاهده کردم و صحت اطلاعات این فایل را جهت امضای الکترونیک تایید می نمایم. آیامورد قبول است ؟');
        } else if (this.DocTypeCode === 1228) {
          // tslint:disable-next-line: max-line-length
          this.ShowMessageBoxWithYesNoBtn('اینجانب فایل عدم تایید ماده 18 را مشاهده کردم و صحت اطلاعات این فایل را جهت امضای الکترونیک تایید می نمایم. آیامورد قبول است ؟');
        } else {
          // tslint:disable-next-line:max-line-length
          this.ShowMessageBoxWithYesNoBtn('اینجانب فایل حاوی صورتجلسه کمیسیون را مشاهده کردم و صحت اطلاعات این فایل را جهت امضای الکترونیک تایید می نمایم. آیامورد قبول است ؟');
        }
      }
  }
  SignDocument() {
    this.IsDown = false;
    if (this.PDFParam.SignByFile) {
      Dastine.Reset((ResetRes) => {
        Dastine.SelectCertificateFromTokenByUI(null, null, (cert) => {
          Dastine.GetSelectedCertificate((SelectedCert) => {
            const SelectedCertificate = SelectedCert.data.Result;
            this.IsDown = true;
            if (SelectedCertificate === '11') {
              this.ShowMessageBoxWithOkBtn('گواهی انتخاب نشده است');
              return;
            }
            if (SelectedCertificate === '80') {
              this.ShowMessageBoxWithOkBtn('پیکر بندی دستینه با مشکل مواجه گردید با راهبر تماس حاصل فرمایید');
              return;
            }
            this.HomeServices.GetPDFDigestForDigitalSign(SelectedCertificate)
              .subscribe(digestRes => {
                Dastine.Sign(digestRes, 'SHA1', (SignResult) => {
                  const SignRes = SignResult.data.Result;
                  if (SignRes === '18') {
                    this.ShowMessageBoxWithOkBtn('عملیات لغو شد');
                    return;
                  }
                  if (SignRes === '14') {
                    this.ShowMessageBoxWithOkBtn('رمز عبور گواهی انتخاب شده صحیح نمی باشد');
                    return;
                  }
                  this.HomeServices.SignedPDFData(
                    SelectedCertificate,
                    SignRes,
                    this.selectedFile.name)
                    .subscribe((SignedPDFRes: any) => {
                      this.PDFParam.FileName = SignedPDFRes.FileName;
                      this.PDFParam.PDFSignersInfo = SignedPDFRes.PDFSignersInfo;
                      this.PDFParam.PDFSrc = SignedPDFRes.FileBase64;
                      // tslint:disable-next-line:max-line-length
                      this.ShowMessageBoxWithOkBtn('امضای الکترونیک صورتجلسه با موفقیت انجام شد', 400);
                    },
                      (err) => {
                        if (!err.error.Message.includes('|')) {
                          this.ShowMessageBoxWithOkBtn('امضای الکترونیک صورتجلسه با مشکل مواجه شد');
                        }
                      });
                });
              },
                (err) => {
                  if (!err.error.Message.includes('|')) {
                    this.ShowMessageBoxWithOkBtn('امضای الکترونیک صورتجلسه با مشکل مواجه شد');
                  }
                });
          });
        });
      });
    } else {
      Dastine.Reset((ResetRes) => {
        Dastine.SelectCertificateFromTokenByUI(null, null, (cert) => {
          Dastine.GetSelectedCertificate((SelectedCert) => {
            const SelectedCertificate = SelectedCert.data.Result;
            this.IsDown = true;
            if (SelectedCertificate === '11') {
              this.ShowMessageBoxWithOkBtn('گواهی انتخاب نشده است');
              return;
            }
            if (SelectedCertificate === '80') {
              this.ShowMessageBoxWithOkBtn('پیکر بندی دستینه با مشکل مواجه گردید با راهبر تماس حاصل فرمایید');
              return;
            }
            this.ProductRequest.GetPDFDigestMinutesReport(this.DocTypeCode === 1167 ? this.PDFParam.CostFactorID
              : this.PDFParam.OrderCommitionID,
              SelectedCertificate,
              this.DocTypeCode)
              .subscribe((Res: any) => {
                if (Res.SignerImageList && !this.AssignedSignature) {
                  this.SignerActorID = Res.SignerActorID;
                  this.ContractorType = Res.ContractorType;
                  this.BtnClickedName = 'Signer';
                  this.ShowMessageBoxWithYesNoBtn('امضا کننده دارای بیش از یک نقش امضا فعال می باشد آیا مایل به تعیین نقش امضا می باشید؟');
                  return;
                } else {
                  Dastine.Sign(Res, 'SHA1', (SignResult) => {
                    const SignRes = SignResult.data.Result;
                    if (SignRes === '18') {
                      this.ShowMessageBoxWithOkBtn('عملیات لغو شد');
                      return;
                    }
                    if (SignRes === '14') {
                      this.ShowMessageBoxWithOkBtn('رمز عبور گواهی انتخاب شده صحیح نمی باشد');
                      return;
                    }
                    this.ProductRequest.SignedPDFMinutesReport(
                      this.DocTypeCode === 1167 ? this.PDFParam.CostFactorID
                        : this.PDFParam.OrderCommitionID,
                      SelectedCertificate,
                      SignRes,
                      this.DocTypeCode)
                      .subscribe((SignedPDFRes: any) => {
                        this.PDFParam.FileName = SignedPDFRes.FileName;
                        this.PDFParam.PDFSignersInfo = SignedPDFRes.PDFSignersInfo;
                        this.PDFParam.PDFSrc = SignedPDFRes.FileBase64;
                        // tslint:disable-next-line:max-line-length
                        this.ShowMessageBoxWithOkBtn('امضای الکترونیک صورتجلسه با موفقیت انجام شد', 400);
                      },
                        (err) => {
                          if (!err.error.Message.includes('|')) {
                            this.ShowMessageBoxWithOkBtn('امضای الکترونیک صورتجلسه با مشکل مواجه شد');
                          }
                        });
                  });
                }
              },
                (err) => {
                  if (!err.error.Message.includes('|')) {
                    this.ShowMessageBoxWithOkBtn('امضای الکترونیک صورتجلسه با مشکل مواجه شد');
                  }
                });
          });
        });
      });
    }
  }
  SignCheque() {
    this.IsDown = false;
    Dastine.Reset((ResetRes) => {
      Dastine.SelectCertificateFromTokenByUI(null, null, (cert) => {
        Dastine.GetSelectedCertificate((SelectedCert) => {
          const SelectedCertificate = SelectedCert.data.Result;
          this.IsDown = true;
          if (SelectedCertificate === '11') {
            this.ShowMessageBoxWithOkBtn('گواهی انتخاب نشده است');
            return;
          }
          if (SelectedCertificate === '80') {
            this.ShowMessageBoxWithOkBtn('پیکر بندی دستینه با مشکل مواجه گردید با راهبر تماس حاصل فرمایید');
            return;
          }
          this.ProductRequest.GetPDFDigestMinutesReport(this.PDFParam.ChequeNo,
            SelectedCertificate,
            this.DocTypeCode)
            .subscribe(digestRes => {
              Dastine.Sign(digestRes, 'SHA1', (SignResult) => {
                const SignRes = SignResult.data.Result;
                if (SignRes === '18') {
                  this.ShowMessageBoxWithOkBtn('عملیات لغو شد');
                  return;
                }
                if (SignRes === '14') {
                  this.ShowMessageBoxWithOkBtn('رمز عبور گواهی انتخاب شده صحیح نمی باشد');
                  return;
                }
                this.ProductRequest.SignedPDFMinutesReport(
                  this.PDFParam.ChequeNo,
                  SelectedCertificate,
                  SignRes,
                  this.DocTypeCode)
                  .subscribe((SignedPDFRes: any) => {
                    this.PDFParam.FileName = SignedPDFRes.FileName;
                    this.PDFParam.PDFSignersInfo = SignedPDFRes.PDFSignersInfo;
                    // tslint:disable-next-line:max-line-length
                    this.ShowMessageBoxWithOkBtn('امضای الکترونیک چک با موفقیت انجام شد', 400);
                  },
                    (err) => {
                      if (!err.error.Message.includes('|')) {
                        this.ShowMessageBoxWithOkBtn('امضای الکترونیک چک با مشکل مواجه شد');
                      }
                    });
              });
            },
              (err) => {
                if (!err.error.Message.includes('|')) {
                  this.ShowMessageBoxWithOkBtn('امضای الکترونیک چک با مشکل مواجه شد');
                }
              });
        });
      });
    });
  }
  OnPDFLoaded(InParam) {
    this.IsDown = true;
  }
  Close() {
    this.Closed.emit(true);
  }
  onFileInput(Param) {
    const fileList: FileList = Param.target.files;
    this.selectedFile = null;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
      if (this.selectedFile.type.split('/')[1] !== 'pdf') {
        this.ShowMessageBoxWithOkBtn('نوع فایل معتبر نمی باشد');
        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        const ImageBase64 = reader.result.toString().split(',')[1];
        if (this.PDFParam.OrderCommitionID) {
          this.ArchiveDetail.UploadArchiveDoc(this.PDFParam.OrderCommitionID,
            this.DocTypeCode,
            this.selectedFile.name,
            ImageBase64).subscribe((PDFRes: any) => {
              this.PDFParam = {
                PDFSrc: ImageBase64,
                FileName: PDFRes.FileName,
                OrderCommitionID: this.PDFParam.OrderCommitionID,
                CostFactorID: this.PDFParam.CostFactorID,
                RegionCode: this.PDFParam.RegionCode,
                HaveEstimate: false,
                HaveSign: true,
                PDFSignersInfo: PDFRes.PDFSignersInfo,
                HaveUpload: !PDFRes || !PDFRes.PDFSignersInfo || PDFRes.PDFSignersInfo.length <= 0,
                HaveDownload: true,
                SignByFile: false
              };
            });
        } else {
          const uploadData = new FormData();
          uploadData.append('AFile', this.selectedFile, this.selectedFile.name);
          this.HomeServices.GetPDFSignerInfo(uploadData).subscribe((PDFRes: any) => {
            this.PDFParam = {
              PDFSrc: ImageBase64,
              FileName: PDFRes.FileName,
              HaveEstimate: false,
              HaveSign: true,
              PDFSignersInfo: PDFRes.PDFSignersInfo,
              HaveUpload: true,
              HaveDownload: true,
              SignByFile: true
            };
          });
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  OnDownload() {
    const byteCharacters = atob(this.PDFParam.PDFSrc);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const mimeType = '.pdf';
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const FileSaver = require('file-saver');
    const file = new File([blob], this.PDFParam.FileName, { type: mimeType });
    FileSaver.saveAs(file);
  }
  onDownloadDastineApp() {
    this.DealsHall.DownloadHelpArchiveFile(747, '.zip').subscribe(res => {
      this.CommonService.downloadFile(res);
    });
  }

  getOutPutParam(event) {
    if (this.PopUpType === 'users-organization-sign') {
      this.IsSaved = event;
      if (this.IsSaved) {
        this.isClicked = false;
        this.PopUpType = null;
        this.AssignedSignature = true;
        this.SignDocument();
      }
    }
  }

  OnDelete() {
    let ObjectID = 0;
    if (this.DocTypeCode === 1047 || this.DocTypeCode === 1228) {
      ObjectID = this.PDFParam.OrderCommitionID;
    } else {
      ObjectID = this.PDFParam.CostFactorID;
    }
    this.ComonService.DeleteArchiveDetailDocuments(ObjectID,
      this.DocTypeCode,
      2730).subscribe(res => {
        this.BtnClickedName = 'DelDoc';
        this.ShowMessageBoxWithOkBtn('حذف با موفقیت انجام شد');
      });
  }
}
