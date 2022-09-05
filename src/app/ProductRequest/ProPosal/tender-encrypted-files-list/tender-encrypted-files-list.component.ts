import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArchiveDetailService } from 'src/app/Services/BaseService/ArchiveDetailService';
import { CommonServices } from 'src/app/Services/BaseService/CommonServices';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from 'src/app/Shared/custom-checkbox/src/public_api';
declare var Dastine: any;

@Component({
  selector: 'app-tender-encrypted-files-list',
  templateUrl: './tender-encrypted-files-list.component.html',
  styleUrls: ['./tender-encrypted-files-list.component.css']
})
export class TenderEncryptedFilesListComponent implements OnInit {
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() InputParam;
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  TenderFileNames = [];
  DecryptedFileResult;
  btnclicked;
  PopupParam;
  IsWating;
  OverStartTopPosition;
  overStartLeftPosition;
  MainMaxwidthPixel;
  OverMainMinwidthPixel;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  EcryptedFileCount;
  DecryptedFileCount = 0;
  PopupType;
  public scrollbarOptions = { axis: 'y', theme: 'inset-2-dark', scrollButtons: { enable: true } };
  constructor(
    private CommonServic: CommonServices,
    private ProductRequest: ProductRequestService,
    private ArchiveDetail: ArchiveDetailService
  ) { }

  ngOnInit() {

    this.TenderFileNames = this.CommonServic.GroupBy(this.InputParam.TenderFileNames, 'DOCUMENT_TYPE_CODE');

    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    const ESFCount = this.InputParam.TenderFileNames.filter(x => x.Image_Extension === '.esf');
    if (ESFCount && ESFCount.length > 0) {
      this.EcryptedFileCount = ESFCount.length;
      this.UnlockAllFiles();
    }
  }
  UnlockAllFiles() {
    $('body').css('pointer-events', 'none');
    this.IsWating = true;
    let element = this.InputParam.TenderFileNames.filter(x => x.Image_Extension === '.esf')[0];
    const el = document.getElementById(element.ARCHIVE_DETAIL_ID.toString());
    el.scrollIntoView(false);
    this.TenderFileNames.forEach(GPItem => {
      GPItem.List.forEach(item => {
        if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
          item.StartLoaded = true;
        }
      });
    });
    this.ProductRequest.GetTenderFileCipherKey(element.ARCHIVE_DETAIL_ID).subscribe(res => {
      try {
        this.TenderFileNames.forEach(GPItem => {
          GPItem.List.forEach(item => {
            if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
              item.IsLoaded = true;
              item.StartLoaded = false;
              item.StartDecrypted = true;
            }
          });
        });
        new Promise((resolve, reject) => {
          this.DecryptedFile(res, resolve);
        }).then((DecFileRes) => {
          if (!DecFileRes) {
            this.TenderFileNames.forEach(GPItem => {
              GPItem.List.forEach(item => {
                if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
                  item.DecryptedHaseError = true;
                  $('body').css('pointer-events', 'unset');
                  this.IsWating = false;
                  item.StartDecrypted = false;
                }
              });
            });
            return;
          }
          this.TenderFileNames.forEach(GPItem => {
            GPItem.List.forEach(item => {
              if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
                item.IsDecrypted = true;
                item.StartDecrypted = false;
                item.StartUploaded = true;
              }
            });
          });
          this.ProductRequest.GetDecryptedTenderFiles(DecFileRes).subscribe((DecRes: any) => {
            this.TenderFileNames.forEach(GPItem => {
              GPItem.List.forEach(item => {
                if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
                  item.Image_Extension = '.pdf';
                  item.StartUploaded = false;
                  item.ARCHIVE_DETAIL_ID = DecRes.ArchiveDetailID;
                  this.InputParam.TenderFileNames.splice(0, 1);
                  this.DecryptedFileCount++;
                  element = this.InputParam.TenderFileNames.filter(x => x.Image_Extension === '.esf');
                  if (element && element.length > 0) {
                    this.UnlockAllFiles();
                  } else {
                    $('body').css('pointer-events', 'unset');
                    this.ShowMessageBoxWithOkBtn('بازگشایی اسناد پاکت ' + this.InputParam.EnvekopesName
                      + ' با موفقیت انجام شد جهت مشاهده فایل ها بر روی نام فایل مورد نظر کلیک کنید');
                    this.IsWating = false;
                  }
                }
              });
            });
          },
            err => {
              this.TenderFileNames.forEach(GPItem => {
                GPItem.List.forEach(item => {
                  if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
                    item.UploadedHaseError = true;
                    $('body').css('pointer-events', 'unset');
                    this.IsWating = false;
                    item.StartUploaded = false;
                  }
                });
              });
            });
        });
      } catch (error) {
        $('body').css('pointer-events', 'unset');
        this.IsWating = false;
        this.TenderFileNames.forEach(GPItem => {
          GPItem.List.forEach(item => {
            if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
              item.LoadedHaseError =
                item.UploadedHaseError =
                item.DecryptedHaseError = true;
              item.StartLoaded =
                item.StartUploaded =
                item.StartDecrypted = false;
            }
          });
        });
        console.log(error);
      }
    },
      err => {
        $('body').css('pointer-events', 'unset');
        this.IsWating = false;
        this.TenderFileNames.forEach(GPItem => {
          GPItem.List.forEach(item => {
            if (item.ARCHIVE_DETAIL_ID === element.ARCHIVE_DETAIL_ID) {
              item.LoadedHaseError = true;
              item.StartLoaded = false;
            }
          });
        });
      });
  }
  close() {
    this.Closed.emit(true);
  }
  popupclosed() {
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
  DecryptedFile(InputFile, resolve) {
    Dastine.CmsDecrypt(InputFile.CipherKey, (KeyRes) => {
      Dastine.CmsDecrypt(InputFile.IV, (IVRes) => {
        if (KeyRes.data.Result === '60' || IVRes.data.Result === '60') {
          this.ShowMessageBoxWithOkBtn('گواهی بازگشایی مهر و موم اسناد یافت نشد');
          resolve(false);
          return;
        }
        InputFile.CipherKey = KeyRes.data.Result;
        InputFile.IV = IVRes.data.Result;
        resolve(InputFile);
      });
    });
  }
  ShowFile(ADoc) {
    if (ADoc.Image_Extension === '.pdf') {
      this.ArchiveDetail.GetArchiveDetailByID(ADoc.ARCHIVE_DETAIL_ID).subscribe(res => {
        this.PopupType = 'pdf-viewer';
        this.btnclicked = true;
        this.overStartLeftPosition = 40;
        this.OverStartTopPosition = 0;
        this.MainMaxwidthPixel = 1300;
        this.OverMainMinwidthPixel = 1295;
        this.PopupParam = {
          HeaderName: 'مشاهده ' + ADoc.FILE_NAME_WITH_OUT_EXTENSION,
          PDFSrc: res.FileBase64,
          FileName: res.FileName,
          OrderCommitionID: null,
          HaveEstimate: false,
          HaveSign: false,
          CostFactorID: null,
          RegionCode: null,
          PDFSignersInfo: res.PDFSignersInfo,
          HasDelBtn: false,
          IsArticle18: false,
        };
      });
    }
  }
}
