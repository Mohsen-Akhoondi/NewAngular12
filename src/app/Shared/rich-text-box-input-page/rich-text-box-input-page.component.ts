import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RefreshServices } from 'src/app/Services/BaseService/RefreshServices';
import { CommonService } from 'src/app/Services/CommonService/CommonService';
import { ProductRequestService } from 'src/app/Services/ProductRequest/ProductRequestService';
import { CustomCheckBoxModel } from '../custom-checkbox/src/lib/custom-checkbox.model';

@Component({
  selector: 'app-rich-text-box-input-page',
  templateUrl: './rich-text-box-input-page.component.html',
  styleUrls: ['./rich-text-box-input-page.component.css']
})
export class RichTextBoxInputPageComponent implements OnInit {
  @Input() InputParam;
  @Output() Closed: EventEmitter<boolean> = new EventEmitter<boolean>();
  CustomCheckBoxConfig: CustomCheckBoxModel = new CustomCheckBoxModel();
  DisApprovalArticle18Note = '';
  IsDisableInput = false;
  PopUpType = '';
  HaveMaxBtn = false;
  HeightPercentWithMaxBtn = 95;
  startLeftPosition;
  startTopPosition;
  OverMainMinwidthPixel;
  PopupParam;
  alertMessageParams = { HaveOkBtn: true, message: '', HaveYesBtn: false, HaveNoBtn: false };
  HaveHeader;
  PercentWidth = null;
  MainMaxwidthPixel = null;
  MinHeightPixel = null;
  isClicked = false;
  ShowNoteInReport = false;
  OrderCommitionID: number;
  ProductrequestID: number;
  RegionCode: number;
  IsAdmin: boolean;


  constructor(private RefreshPersonItems: RefreshServices,
    private ComonService: CommonService,
    // tslint:disable-next-line: no-shadowed-variable
    private ProductRequestService: ProductRequestService) { }

  ngOnInit() {
    console.log(this.InputParam);
    this.CustomCheckBoxConfig.color = 'state p-primary';
    this.CustomCheckBoxConfig.icon = 'fa fa-check';
    this.CustomCheckBoxConfig.styleCheckBox = 'pretty p-icon p-rotate';
    this.OrderCommitionID = this.InputParam.OrderCommitionID;
    this.ProductrequestID = this.InputParam.CostFactorID;
    this.RegionCode = this.InputParam.RegionCode;
    this.IsDisableInput = this.InputParam.IsDisableInput;
    this.IsAdmin = this.InputParam.IsAdmin;
    this.ProductRequestService.GetDisApprArt18Note(this.OrderCommitionID).subscribe(res => {
      if (res) {
        this.DisApprovalArticle18Note = res;
      }
    });
  }

  Close() {
    this.Closed.emit(true);
  }

  popupclosed(event) {
    this.isClicked = false;
    this.HaveMaxBtn = false;
    this.OverMainMinwidthPixel = null;
    this.MainMaxwidthPixel = null;
    if (this.PopUpType === 'pdf-viewer') {
      this.Close();
    }
    this.PopUpType = '';
  }

  OnCheckBoxChange(event) {
    console.log(event);
    this.ShowNoteInReport = event;
    console.log(this.ShowNoteInReport);
  }

  OnPrint() {
    if (this.IsDisableInput) {
      this.ComonService.GetAllArchiveDetailList(this.OrderCommitionID, 1228, true).subscribe(res => {
        this.PopUpType = 'pdf-viewer';
        this.HaveHeader = true;
        this.isClicked = true;
        this.startLeftPosition = 40;
        this.startTopPosition = 0;
        this.HaveMaxBtn = false;
        this.OverMainMinwidthPixel = 1295;
        this.MainMaxwidthPixel = 1300;
        this.PopupParam = {
          HeaderName: 'عدم تصویب ماده 18',
          PDFSrc: res ? res.FileBase64 : undefined,
          FileName: res ? res.FileName : null,
          OrderCommitionID: this.OrderCommitionID,
          HaveEstimate: false,
          HaveSign: true,
          CostFactorID: this.ProductrequestID,
          RegionCode: this.RegionCode,
          PDFSignersInfo: res ? res.PDFSignersInfo : null,
          HasTripleReport: false,
          IsFinal: false,
          HaveUpload: !res || !res.PDFSignersInfo || res.PDFSignersInfo.length <= 0,
          SignByFile: false,
          IsArticle18: false,
          HasDelBtn: true,
          IsAdequacy: false,
          IsDisArticle18: true,
        };
      });
    } else {
      const promise = new Promise<void> ((resolve, reject) => {
        this.ProductRequestService.InsertDisApprNote(this.OrderCommitionID, this.DisApprovalArticle18Note).subscribe(
          res => {
          resolve();
          },
          err => {
            this.ShowMessageBoxWithOkBtn('ثبت با مشکل مواجه شد');
          });
      }).then(() => {
        this.ProductRequestService.GetMinutesReportPDFContent(
          this.OrderCommitionID,
          this.ProductrequestID,
          this.RegionCode,
          1228,
          false,
          true,
          null,
          null,
          this.ShowNoteInReport).subscribe(PDFRes => {
            if (PDFRes) {
              this.PopUpType = 'pdf-viewer';
              this.HaveHeader = true;
              this.isClicked = true;
              this.startLeftPosition = 40;
              this.startTopPosition = 0;
              this.HaveMaxBtn = false;
              this.OverMainMinwidthPixel = 1295;
              this.MainMaxwidthPixel = 1300;
              this.PopupParam = {
                HeaderName: 'عدم تصویب ماده 18',
                PDFSrc: PDFRes.FileBase64,
                FileName: PDFRes.FileName,
                OrderCommitionID: this.OrderCommitionID,
                HaveEstimate: false,
                HaveSign: true,
                CostFactorID: this.ProductrequestID,
                RegionCode: this.RegionCode,
                PDFSignersInfo: PDFRes.PDFSignersInfo,
                HasTripleReport: false,
                IsFinal: false,
                IsArticle18: false,
                HasDelBtn: this.IsAdmin,
                IsAdequacy: false,
                IsDisArticle18: true
              };
            } else {
              this.ShowMessageBoxWithOkBtn('فایل بارگزاری نشده است.');
            }
         });
      });
    }
  }
  ShowMessageBoxWithOkBtn(message) {
    this.isClicked = true;
    this.PopUpType = 'message-box';
    this.HaveHeader = true;
    this.HaveMaxBtn = false;
    this.HeightPercentWithMaxBtn = undefined;
    this.MainMaxwidthPixel = undefined;
    this.MinHeightPixel = undefined;
    this.startLeftPosition = 530;
    this.startTopPosition = 200;
    this.alertMessageParams.message = message;
    this.alertMessageParams.HaveOkBtn = true;
    this.alertMessageParams.HaveYesBtn = false;
    this.alertMessageParams.HaveNoBtn = false;
  }
}
